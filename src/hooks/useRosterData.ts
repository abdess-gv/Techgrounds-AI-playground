
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
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setPrograms(data || []);
    } catch (e: any) {
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
      setRosterEntries(data || []);
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
