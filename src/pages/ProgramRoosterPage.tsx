
// src/pages/ProgramRoosterPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Calendar, Clock, MapPin, Link as LinkIcon, AlertCircle } from 'lucide-react';

type ProgramRow = Database['public']['Tables']['programs']['Row'];
type CycleDetailRow = Database['public']['Tables']['program_cycle_details']['Row'];
type DateOverrideRow = Database['public']['Tables']['program_date_overrides']['Row'];

interface DisplayProgram {
  id: string;
  name: string;
  description?: string | null;
  start_date: string | null;
}

interface RosterEntry {
  date: string;
  dateString: string;
  time_info?: string;
  location_info?: string;
  general_info?: string;
  link_url?: string;
  isOverride: boolean;
  isEmpty: boolean;
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
      setError('Programma ID ontbreekt.');
      setLoading(false);
      return;
    }

    const fetchRosterData = async () => {
      setLoading(true);
      setError(null);
      setProgram(null);
      setRoster([]);

      try {
        // 1. Fetch program details
        const { data: programData, error: programError } = await supabase
          .from('programs')
          .select('*')
          .eq('id', programId)
          .single();

        if (programError) throw new Error(`Kon programma niet laden: ${programError.message}`);
        if (!programData) {
          setError(`Programma met ID "${programId}" niet gevonden.`);
          setLoading(false);
          return;
        }

        const currentProgram: DisplayProgram = {
            id: programData.id,
            name: programData.name,
            description: programData.description,
            start_date: programData.start_date
        };
        setProgram(currentProgram);

        // 2. Fetch Cycle Details
        const { data: cycleDetailsData, error: cycleError } = await supabase
          .from('program_cycle_details')
          .select('*')
          .eq('program_id', programData.id);

        if (cycleError) throw new Error(`Kon cyclusdetails niet laden: ${cycleError.message}`);

        // 3. Fetch Date Overrides for the next 8 weeks
        const todayDt = new Date();
        todayDt.setUTCHours(0, 0, 0, 0);
        const startDateRange = todayDt.toISOString().split('T')[0];

        const endDateDt = new Date(todayDt);
        endDateDt.setUTCDate(todayDt.getUTCDate() + 55); // ~8 weeks
        const endDateRange = endDateDt.toISOString().split('T')[0];

        const { data: dateOverridesData, error: overrideError } = await supabase
          .from('program_date_overrides')
          .select('*')
          .eq('program_id', programData.id)
          .gte('override_date', startDateRange)
          .lte('override_date', endDateRange);

        if (overrideError) throw new Error(`Kon datumuitzonderingen niet laden: ${overrideError.message}`);

        // 4. Calculate the 8-week roster
        const anchorDate = currentProgram.start_date 
          ? new Date(currentProgram.start_date + 'T00:00:00Z')
          : new Date(todayDt);

        const newRoster: RosterEntry[] = [];
        for (let i = 0; i < 56; i++) { // 8 weeks
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
            const dayOfWeek = currentDate.getUTCDay();

            const cycleEntry = cycleDetailsData?.find(
              ce => ce.week_in_cycle === weekInCycle && ce.day_of_week === dayOfWeek
            );
            if (cycleEntry) {
              sourceInfo = cycleEntry;
            }
          }

          const isEmpty = !sourceInfo.time_info && !sourceInfo.general_info && !isOverride;

          newRoster.push({
            date: currentDateStr,
            dateString: currentDate.toLocaleDateString('nl-NL', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              timeZone: 'UTC' 
            }),
            time_info: sourceInfo.time_info || undefined,
            location_info: sourceInfo.location_info || undefined,
            general_info: sourceInfo.general_info || undefined,
            link_url: sourceInfo.link_url || undefined,
            isOverride: isOverride,
            isEmpty: isEmpty,
          });
        }
        setRoster(newRoster);

      } catch (e: any) {
        setError(e.message || 'Er is een fout opgetreden bij het laden van het rooster.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchRosterData();
  }, [programId]);

  const pageContent = (
    <div className="container mx-auto p-6 max-w-4xl">
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Rooster laden...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 text-lg font-medium">Fout bij laden rooster</p>
          <p className="text-red-600 mt-2">{error}</p>
        </div>
      )}

      {program && !error && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{program.name}</h1>
            <p className="text-xl text-gray-600">Programma Rooster</p>
            {program.description && (
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{program.description}</p>
            )}
          </div>

          <div className="space-y-4">
            {roster.filter(entry => {
              if (entry.isEmpty) return false;
              // Parse date string as UTC to avoid timezone issues with getDay()
              const dateObj = new Date(entry.date + 'T00:00:00Z');
              const dayOfWeek = dateObj.getUTCDay(); // 0 for Sunday, 6 for Saturday
              return dayOfWeek !== 0 && dayOfWeek !== 6;
            }).map((entry, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  entry.isOverride 
                    ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50' 
                    : 'border-gray-200 bg-white hover:border-blue-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <h2 className="text-xl font-semibold text-gray-900 capitalize">
                        {entry.dateString}
                      </h2>
                      {entry.isOverride && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Uitzondering
                        </span>
                      )}
                    </div>
                    
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700 font-medium">
                          {entry.time_info || 'Tijd niet opgegeven'}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">
                          {entry.location_info || 'Locatie niet opgegeven'}
                        </span>
                      </div>
                      
                      {entry.link_url && (
                        <div className="flex items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-gray-500" />
                          <a 
                            href={entry.link_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline font-medium"
                          >
                            Deelnemen
                          </a>
                        </div>
                      )}
                    </div>
                    
                    {entry.general_info && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-1">Onderwerp:</h3>
                        <p className="text-gray-700">{entry.general_info}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {roster.filter(entry => {
              if (entry.isEmpty) return false;
              const dateObj = new Date(entry.date + 'T00:00:00Z');
              const dayOfWeek = dateObj.getUTCDay();
              return dayOfWeek !== 0 && dayOfWeek !== 6;
            }).length === 0 && !loading && (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-500 mb-2">Geen activiteiten gepland (op weekdagen)</h3>
                <p className="text-gray-400">Er zijn momenteel geen roosteractiviteiten beschikbaar op maandag t/m vrijdag voor dit programma.</p>
              </div>
            )}
          </div>
        </>
      )}
      
      {!program && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Selecteer een programma om het rooster te bekijken.</p>
        </div>
      )}
    </div>
  );

  if (isEmbed) {
    return (
      <div className="min-h-screen bg-gray-50">
        {pageContent}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isEmbed && (
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Programma Roosters</h1>
          </div>
        </header>
      )}
      {pageContent}
      {!isEmbed && (
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500">
              &copy; {new Date().getFullYear()} Techgrounds. Alle rechten voorbehouden.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ProgramRoosterPage;
