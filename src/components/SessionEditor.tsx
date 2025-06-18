
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { type AgendaEntry, type LocationType } from '@/data/techgroundsRooster';
import { isExcludedDate } from '@/data/holidays';

interface SessionEditorProps {
  session: AgendaEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (sessionId: string, updates: Partial<AgendaEntry>) => void;
}

const SessionEditor: React.FC<SessionEditorProps> = ({ session, isOpen, onClose, onSave }) => {
  const [editedSession, setEditedSession] = React.useState<Partial<AgendaEntry>>({});

  React.useEffect(() => {
    if (session) {
      setEditedSession({
        title: session.title,
        description: session.description,
        location: session.location,
        address: session.address,
        trainer: session.trainer,
        date: session.date,
        time: session.time,
      });
    }
  }, [session]);

  const handleSave = () => {
    if (session && editedSession) {
      const updates: Partial<AgendaEntry> = {};
      
      if (editedSession.title !== session.title) updates.title = editedSession.title;
      if (editedSession.description !== session.description) updates.description = editedSession.description;
      if (editedSession.location !== session.location) updates.location = editedSession.location;
      if (editedSession.address !== session.address) updates.address = editedSession.address;
      if (editedSession.trainer !== session.trainer) updates.trainer = editedSession.trainer;
      if (editedSession.date && editedSession.date.getTime() !== session.date.getTime()) {
        updates.date = editedSession.date;
        updates.dateString = format(editedSession.date, 'EEEE d MMMM', { locale: nl });
      }
      if (editedSession.time !== session.time) updates.time = editedSession.time;

      onSave(session.sessionId, updates);
      onClose();
    }
  };

  const parseTime = (timeString: string) => {
    const [start, end] = timeString.split('-');
    return { start: start || '09:00', end: end || '17:00' };
  };

  const formatTime = (start: string, end: string) => {
    return `${start}-${end}`;
  };

  const handleTimeChange = (field: 'start' | 'end', value: string) => {
    const currentTime = parseTime(editedSession.time || '09:00-17:00');
    const newTime = formatTime(
      field === 'start' ? value : currentTime.start,
      field === 'end' ? value : currentTime.end
    );
    setEditedSession(prev => ({ ...prev, time: newTime }));
  };

  if (!session) return null;

  const currentTime = parseTime(editedSession.time || session.time);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sessie Bewerken</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Titel */}
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={editedSession.title || ''}
              onChange={(e) => setEditedSession(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1"
            />
          </div>

          {/* Beschrijving */}
          <div>
            <Label htmlFor="description">Beschrijving</Label>
            <Textarea
              id="description"
              value={editedSession.description || ''}
              onChange={(e) => setEditedSession(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1"
              rows={3}
            />
          </div>

          {/* Datum */}
          <div>
            <Label>Datum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {editedSession.date ? format(editedSession.date, 'dd MMM yyyy', { locale: nl }) : 'Selecteer datum'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={editedSession.date}
                  onSelect={(date) => setEditedSession(prev => ({ ...prev, date }))}
                  disabled={isExcludedDate}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tijd */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-time">Starttijd</Label>
              <Input
                id="start-time"
                type="time"
                value={currentTime.start}
                onChange={(e) => handleTimeChange('start', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="end-time">Eindtijd</Label>
              <Input
                id="end-time"
                type="time"
                value={currentTime.end}
                onChange={(e) => handleTimeChange('end', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Locatie */}
          <div>
            <Label>Locatie Type</Label>
            <Select
              value={editedSession.location || ''}
              onValueChange={(value: LocationType) => setEditedSession(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecteer locatie type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Op locatie">Op locatie</SelectItem>
                <SelectItem value="Hybride">Hybride</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Adres (alleen voor Op locatie) */}
          {editedSession.location === 'Op locatie' && (
            <div>
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={editedSession.address || ''}
                onChange={(e) => setEditedSession(prev => ({ ...prev, address: e.target.value }))}
                className="mt-1"
                placeholder="Adres voor op locatie sessie"
              />
            </div>
          )}

          {/* Trainer */}
          <div>
            <Label htmlFor="trainer">Trainer</Label>
            <Input
              id="trainer"
              value={editedSession.trainer || ''}
              onChange={(e) => setEditedSession(prev => ({ ...prev, trainer: e.target.value }))}
              className="mt-1"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuleren
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Opslaan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SessionEditor;
