
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Link as LinkIcon } from 'lucide-react';
import type { RosterEntry } from '@/types/RosterTypes';
import { formatTime, getDayName, getLocationIcon } from '@/utils/rosterUtils';

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
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 0]; // Monday to Sunday

  const getEntriesForDay = (dayOfWeek: number) => {
    return entries
      .filter(entry => entry.day_of_week === dayOfWeek && entry.week_number === weekNumber)
      .sort((a, b) => a.start_time.localeCompare(b.start_time));
  };

  const getDateForDay = (dayOfWeek: number) => {
    const date = new Date(weekStartDate);
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust for Sunday
    date.setDate(weekStartDate.getDate() + diff);
    return date;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Week {weekNumber} - Groep {groupNumber}
        </h2>
        <p className="text-gray-600">
          {weekStartDate.toLocaleDateString('nl-NL', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('nl-NL', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {daysOfWeek.map((dayOfWeek) => {
          const dayEntries = getEntriesForDay(dayOfWeek);
          const dayDate = getDateForDay(dayOfWeek);
          
          return (
            <Card key={dayOfWeek} className="min-h-[200px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  {getDayName(dayOfWeek)}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {dayDate.toLocaleDateString('nl-NL', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {dayEntries.length > 0 ? (
                  dayEntries.map((entry) => (
                    <div key={entry.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{getLocationIcon(entry.location_type)}</span>
                        <h4 className="font-medium text-gray-900 text-sm">{entry.title}</h4>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span>{formatTime(entry.start_time)} - {formatTime(entry.end_time)}</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500" />
                          <Badge variant="outline" className="text-xs">
                            {entry.location_type}
                          </Badge>
                        </div>
                        
                        {entry.location_details && (
                          <p className="text-gray-600 text-xs">{entry.location_details}</p>
                        )}
                        
                        {entry.meeting_url && (
                          <a 
                            href={entry.meeting_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                          >
                            <LinkIcon className="h-3 w-3" />
                            Deelnemen
                          </a>
                        )}
                        
                        {entry.description && (
                          <p className="text-gray-600 text-xs mt-2">{entry.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center py-4">Geen activiteiten</p>
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
