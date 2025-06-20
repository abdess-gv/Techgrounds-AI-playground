
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RosterEntry, Program } from '@/types/RosterTypes';

export const useRosterData = (programId?: string) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [rosterEntries, setRosterEntries] = useState<RosterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('name');

      if (error) throw error;
      
      // Map the database response to our Program type
      const mappedPrograms: Program[] = (data || []).map(program => ({
        id: program.id,
        name: program.name,
        description: program.description,
        start_date: program.start_date,
        end_date: program.end_date,
        anchor_date: program.anchor_date || program.start_date, // Use anchor_date or fallback to start_date
        cycle_weeks: program.cycle_weeks || 4, // Use cycle_weeks or default to 4
        is_active: true, // Default to active
        created_at: program.created_at,
        updated_at: program.updated_at
      }));
      
      setPrograms(mappedPrograms);
    } catch (e: any) {
      console.error('Error fetching programs:', e);
      setError(`Kon programma's niet laden: ${e.message}`);
    }
  };

  const fetchRosterEntries = async (targetProgramId: string) => {
    try {
      const { data, error } = await supabase
        .from('roster_entries')
        .select('*')
        .eq('program_id', targetProgramId)
        .order('week_number')
        .order('day_of_week')
        .order('start_time');

      if (error) throw error;
      
      console.log('Fetched roster entries:', data);
      
      // Map the database response to our RosterEntry type with proper type casting
      const mappedEntries: RosterEntry[] = (data || []).map(entry => ({
        id: entry.id,
        program_id: entry.program_id,
        week_number: entry.week_number,
        day_of_week: entry.day_of_week,
        start_time: entry.start_time,
        end_time: entry.end_time,
        title: entry.title,
        description: entry.description,
        location_type: entry.location_type as 'Online' | 'Fysiek' | 'Zelfstudie',
        location_details: entry.location_details,
        meeting_url: entry.meeting_url,
        created_at: entry.created_at,
        updated_at: entry.updated_at
      }));
      
      setRosterEntries(mappedEntries);
    } catch (e: any) {
      console.error('Error fetching roster entries:', e);
      setError(`Kon rooster entries niet laden: ${e.message}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      await fetchPrograms();
      
      if (programId) {
        await fetchRosterEntries(programId);
      }
      
      setLoading(false);
    };

    loadData();
  }, [programId]);

  return {
    programs,
    rosterEntries,
    loading,
    error,
    refetch: () => {
      if (programId) {
        fetchRosterEntries(programId);
      }
      fetchPrograms();
    }
  };
};
