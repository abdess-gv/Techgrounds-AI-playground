
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useRosterData } from '@/hooks/useRosterData';
import { calculateGroupWeek } from '@/utils/rosterUtils';
import RosterControls from '@/components/Roster/RosterControls';
import WeeklyRosterView from '@/components/Roster/WeeklyRosterView';
import type { Program } from '@/types/RosterTypes';

const EnhancedRosterPage: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const [searchParams] = useSearchParams();
  const isEmbed = searchParams.get('embed') === 'true';

  const { programs, rosterEntries, loading, error } = useRosterData(programId);
  
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(programId || null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<number>(1);
  const [groupNumber, setGroupNumber] = useState<number>(1);

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  useEffect(() => {
    if (selectedProgram?.anchor_date) {
      const anchorDate = new Date(selectedProgram.anchor_date + 'T00:00:00');
      const calculation = calculateGroupWeek(anchorDate, selectedDate, selectedProgram.cycle_weeks);
      setCurrentWeek(calculation.currentWeek);
      setGroupNumber(calculation.groupNumber);
    }
  }, [selectedProgram, selectedDate]);

  const handleProgramChange = (newProgramId: string) => {
    setSelectedProgramId(newProgramId);
  };

  const handleWeekChange = (direction: 'prev' | 'next') => {
    const newWeek = direction === 'next' ? currentWeek + 1 : currentWeek - 1;
    if (newWeek >= 1 && newWeek <= 4) {
      const weekDiff = newWeek - currentWeek;
      const newDate = new Date(selectedDate);
      newDate.setDate(selectedDate.getDate() + (weekDiff * 7));
      setSelectedDate(newDate);
    }
  };

  const getWeekStartDate = () => {
    if (!selectedProgram?.anchor_date) return selectedDate;
    
    const anchorDate = new Date(selectedProgram.anchor_date + 'T00:00:00');
    const calculation = calculateGroupWeek(anchorDate, selectedDate, selectedProgram.cycle_weeks);
    return calculation.weekStartDate;
  };

  const pageContent = (
    <div className="container mx-auto p-6 max-w-7xl">
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

      {!loading && !error && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {selectedProgram ? selectedProgram.name : 'Programma Rooster'}
            </h1>
            <p className="text-xl text-gray-600">Overzicht van alle activiteiten</p>
            {selectedProgram?.description && (
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{selectedProgram.description}</p>
            )}
          </div>

          {!isEmbed && (
            <RosterControls
              programs={programs}
              selectedProgramId={selectedProgramId}
              onProgramChange={handleProgramChange}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              groupNumber={groupNumber}
              currentWeek={currentWeek}
              onWeekChange={handleWeekChange}
            />
          )}

          {selectedProgramId && rosterEntries.length > 0 ? (
            <WeeklyRosterView
              entries={rosterEntries}
              weekNumber={currentWeek}
              groupNumber={groupNumber}
              weekStartDate={getWeekStartDate()}
            />
          ) : selectedProgramId ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nog geen rooster entries beschikbaar voor dit programma.</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Selecteer een programma om het rooster te bekijken.</p>
            </div>
          )}
        </>
      )}
    </div>
  );

  if (isEmbed) {
    return <div className="min-h-screen bg-gray-50">{pageContent}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Programma Roosters</h1>
        </div>
      </header>
      {pageContent}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} Techgrounds. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedRosterPage;
