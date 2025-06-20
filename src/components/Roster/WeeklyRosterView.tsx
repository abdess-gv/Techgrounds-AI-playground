
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { generateWeekDates, formatTime, getDayName, getLocationIcon } from '@/utils/rosterUtils';
import type { RosterEntry } from '@/types/RosterTypes';

interface WeeklyRosterViewProps {
  entries: RosterEntry[];
  weekNumber: number;
  groupNumber: number;
  weekStartDate: Date;
}

const WeeklyRosterView: React.FC<WeeklyRosterViewProps> = ({
  entries,
  weekNumber,
  groupNumber,
  weekStartDate
}) => {
  const weekDates = generateWeekDates(weekStartDate);
  const weekEntries = entries.filter(entry => entry.week_number === weekNumber);

  if (weekEntries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Week {weekNumber} - Groep {groupNumber}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Geen activiteiten gepland voor deze week</p>
            <p className="text-sm text-gray-400 mt-2">
              Voeg rooster entries toe via het admin panel
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Week {weekNumber} - Groep {groupNumber}
        </h2>
        <p className="text-gray-600">
          {weekStartDate.toLocaleDateString('nl-NL', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} - {weekDates[4].toLocaleDateString('nl-NL', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      <div className="grid gap-4">
        {weekDates.map((date, dayIndex) => {
          // Convert array index (0-4) to database day index (1-5)
          const dbDayIndex = dayIndex + 1;
          const dayEntries = weekEntries.filter(entry => entry.day_of_week === dbDayIndex);
          
          return (
            <Card key={dayIndex} className="overflow-hidden">
              <CardHeader className="bg-blue-50 py-3">
                <CardTitle className="text-lg">
                  {getDayName(dbDayIndex)} - {date.toLocaleDateString('nl-NL')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {dayEntries.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Geen activiteiten</p>
                ) : (
                  <div className="space-y-3">
                    {dayEntries.map((entry, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{entry.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {formatTime(entry.start_time)} - {formatTime(entry.end_time)}
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{getLocationIcon(entry.location_type)}</span>
                                {entry.location_type}
                              </div>
                            </div>
                            {entry.description && (
                              <p className="text-gray-700 text-sm mb-2">{entry.description}</p>
                            )}
                            {entry.location_details && (
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {entry.location_details}
                              </div>
                            )}
                          </div>
                          {entry.meeting_url && (
                            <a
                              href={entry.meeting_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <ExternalLink className="h-4 w-4" />
                              Deelnemen
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyRosterView;
