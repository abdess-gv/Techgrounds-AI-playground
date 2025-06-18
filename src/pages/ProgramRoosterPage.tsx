// src/pages/ProgramRoosterPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
// import { Layout } from '@/components/Layout'; // Assuming a Layout component exists

type ProgramRow = Database['public']['Tables']['programs']['Row'];
type CycleDetailRow = Database['public']['Tables']['program_cycle_details']['Row'];
type DateOverrideRow = Database['public']['Tables']['program_date_overrides']['Row'];

// Using ProgramRow directly for program state, but defining a DisplayProgram for clarity if needed for transformation
interface DisplayProgram {
  id: string;
  name: string;
  description?: string | null;
  anchor_start_date: string; // ISO string from Supabase
}

interface RosterEntry {
  date: string; // Formatted date string for display
  time_info?: string;
  location_info?: string;
  general_info?: string;
  link_url?: string;
  isOverride: boolean;
}

const ProgramRoosterPage: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  const [program, setProgram] = useState<DisplayProgram | null>(null);
  const [roster, setRoster] = useState<RosterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programId) {
      setError('Programma ID ontbreekt.'); // Dutch
      setLoading(false);
      return;
    }

    const fetchRosterData = async () => {
      setLoading(true);
      setError(null);
      setProgram(null); // Clear previous program state
      setRoster([]);    // Clear previous roster state

      try {
        // 1. Fetch program details
        const { data: programData, error: programError } = await supabase
          .from('programs')
          .select('*')
          .eq('id', programId)
          .single();

        if (programError) throw new Error(`Kon programma niet laden: ${programError.message}`); // Dutch
        if (!programData) {
          setError(`Programma met ID "${programId}" niet gevonden.`); // Dutch
          setLoading(false);
          return;
        }

        const currentProgram: DisplayProgram = {
            id: programData.id,
            name: programData.name,
            description: programData.description,
            anchor_start_date: programData.anchor_start_date // Is already string from Supabase
        };
        setProgram(currentProgram);

        // 2. Fetch Cycle Details
        const { data: cycleDetailsData, error: cycleError } = await supabase
          .from('program_cycle_details')
          .select('*')
          .eq('program_id', programData.id);

        if (cycleError) throw new Error(`Kon cyclusdetails niet laden: ${cycleError.message}`); // Dutch

        // 3. Fetch Date Overrides for the next 6 weeks
        const todayDt = new Date();
        todayDt.setUTCHours(0, 0, 0, 0);
        const startDateRange = todayDt.toISOString().split('T')[0];

        const endDateDt = new Date(todayDt);
        endDateDt.setUTCDate(todayDt.getUTCDate() + 41);
        const endDateRange = endDateDt.toISOString().split('T')[0];

        const { data: dateOverridesData, error: overrideError } = await supabase
          .from('program_date_overrides')
          .select('*')
          .eq('program_id', programData.id)
          .gte('override_date', startDateRange)
          .lte('override_date', endDateRange);

        if (overrideError) throw new Error(`Kon datumuitzonderingen niet laden: ${overrideError.message}`); // Dutch

        // 4. Calculate the 6-week roster
        // Ensure anchor_start_date (which is just YYYY-MM-DD) is parsed as UTC
        const anchorDate = new Date(currentProgram.anchor_start_date + 'T00:00:00Z');

        const newRoster: RosterEntry[] = [];
        for (let i = 0; i < 42; i++) {
          const currentDate = new Date(todayDt);
          currentDate.setUTCDate(todayDt.getUTCDate() + i);
          const currentDateStr = currentDate.toISOString().split('T')[0];

          const diffTime = currentDate.getTime() - anchorDate.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          let sourceInfo: Partial<CycleDetailRow | DateOverrideRow> = {};
          let isOverride = false;

          const override = dateOverridesData?.find(ov => ov.override_date === currentDateStr);
          if (override) {
            sourceInfo = override;
            isOverride = true;
          } else if (diffDays >= 0) {
            const currentProgramWeekNumber = Math.floor(diffDays / 7);
            const weekInCycle = (currentProgramWeekNumber % 4) + 1;
            const dayOfWeek = currentDate.getUTCDay(); // 0 (Sun) - 6 (Sat)

            const cycleEntry = cycleDetailsData?.find(
              ce => ce.week_in_cycle === weekInCycle && ce.day_of_week === dayOfWeek
            );
            if (cycleEntry) {
              sourceInfo = cycleEntry;
            }
          }

          newRoster.push({
            date: currentDate.toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
            time_info: sourceInfo.time_info || undefined,
            location_info: sourceInfo.location_info || undefined,
            general_info: sourceInfo.general_info || (isOverride ? 'Overridden Sessie' : 'Geen geplande activiteit'), // Dutch
            link_url: sourceInfo.link_url || undefined,
            isOverride: isOverride,
          });
        }
        setRoster(newRoster);

      } catch (e: any) {
        setError(e.message || 'Er is een fout opgetreden bij het laden van het rooster.'); // Dutch
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRosterData();
  }, [programId]);

  const pageContent = (
    <div className="container mx-auto p-4">
      {loading && <p>Loading roster...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {program && !error && (
        <>
          <h1 className="text-3xl font-bold mb-2">{program.name} Roster</h1>
          {program.description && <p className="text-gray-600 mb-6">{program.description}</p>}

          <div className="space-y-6">
            {roster.map((entry, index) => (
              <div key={index} className={`p-4 border rounded-lg shadow ${entry.isOverride ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                <h2 className="text-xl font-semibold mb-1">{entry.date}</h2>
                <p><strong>Time:</strong> {entry.time_info || 'N/A'}</p>
                <p><strong>Location:</strong> {entry.location_info || 'N/A'}</p>
                <p><strong>Info:</strong> {entry.general_info || 'N/A'}</p>
                {entry.link_url && (
                  <p><strong>Link:</strong> <a href={entry.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{entry.link_url}</a></p>
                )}
                {entry.isOverride && <p className="text-sm text-orange-700 font-semibold mt-1">This is an overridden session.</p>}
              </div>
            ))}
          </div>
        </>
      )}
      {!program && !loading && !error && <p>Select a program to view its roster.</p>}
    </div>
  );

  if (isEmbed) {
    return pageContent; // Render content directly without global layout
  }

  // Assuming Layout handles global header/footer
  // If Layout is not available or you want a simpler structure for now:
  // return ( <div> <Header/> {pageContent} <Footer/> </div>)
  // For now, let's assume Layout might not exist yet, or keep it simple:
  return (
    <div>
      {!isEmbed && (
        <header className="bg-gray-800 text-white p-4 text-center">
          <p className="text-xl">Program Rosters</p>
        </header>
      )}
      {pageContent}
      {!isEmbed && (
        <footer className="bg-gray-200 text-gray-700 p-4 text-center mt-8">
          <p>&copy; {new Date().getFullYear()} Your Company</p>
        </footer>
      )}
    </div>
  );
};

export default ProgramRoosterPage;
