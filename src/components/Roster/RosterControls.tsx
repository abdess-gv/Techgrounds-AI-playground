
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Program } from '@/types/RosterTypes';

interface RosterControlsProps {
  programs: Program[];
  selectedProgramId: string | null;
  onProgramChange: (programId: string) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  groupNumber: number;
  currentWeek: number;
  onWeekChange: (direction: 'prev' | 'next') => void;
}

const RosterControls: React.FC<RosterControlsProps> = ({
  programs,
  selectedProgramId,
  onProgramChange,
  selectedDate,
  onDateChange,
  groupNumber,
  currentWeek,
  onWeekChange
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="program-select">Programma</Label>
            <Select value={selectedProgramId || ''} onValueChange={onProgramChange}>
              <SelectTrigger id="program-select">
                <SelectValue placeholder="Selecteer programma" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((program) => (
                  <SelectItem key={program.id} value={program.id}>
                    {program.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-input">Startdatum</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                id="date-input"
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => onDateChange(new Date(e.target.value + 'T00:00:00'))}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Groep Info</Label>
            <div className="flex items-center gap-2 py-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Groep {groupNumber}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Week Navigatie</Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onWeekChange('prev')}
                disabled={currentWeek <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                Week {currentWeek}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onWeekChange('next')}
                disabled={currentWeek >= 4}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RosterControls;
