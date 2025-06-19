
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
        anchor_date: program.start_date, // Use start_date as anchor_date for now
        cycle_weeks: 4, // Default to 4 weeks
        is_active: true, // Default to active
        created_at: program.created_at,
        updated_at: program.updated_at
      }));
      
      setPrograms(mappedPrograms);
    } catch (e: any) {
      setError(`Kon programma's niet laden: ${e.message}`);
    }
  };

  const fetchRosterEntries = async (targetProgramId: string) => {
    try {
      // For now, return empty array since roster_entries table doesn't exist yet
      // This will be populated once the database migration is complete
      setRosterEntries([]);
    } catch (e: any) {
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
