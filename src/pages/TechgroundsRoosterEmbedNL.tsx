import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, MapPin, Copy, Settings, Users, Code, ExternalLink, Edit3, Info, Globe } from 'lucide-react';
import { format, addDays, getDay, startOfWeek, addWeeks } from 'date-fns';
import { nl } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { programTemplates, type ProgramTemplate, type AgendaEntry, type LocationType } from '@/data/techgroundsRooster';
import { isExcludedDate } from '@/data/holidays';
import SessionEditor from '@/components/SessionEditor';

const TechgroundsRoosterEmbedNL = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProgram, setSelectedProgram] = useState<string>(searchParams.get('program') || 'pathways');
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const startParam = searchParams.get('startDate');
    if (startParam) {
      const date = new Date(startParam);
      return isNaN(date.getTime()) ? undefined : date;
    }
    return undefined;
  });
  const [compact, setCompact] = useState(searchParams.get('compact') === 'true');
  const [showHeader, setShowHeader] = useState(searchParams.get('header') !== 'false');
  const [standalone, setStandalone] = useState(searchParams.get('standalone') === 'true');
  const [editMode, setEditMode] = useState(searchParams.get('editable') === 'true');
  const [showInfo, setShowInfo] = useState(searchParams.get('showInfo') !== 'false');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [editingSession, setEditingSession] = useState<AgendaEntry | null>(null);
  const [sessionOverrides, setSessionOverrides] = useState<Record<string, Partial<AgendaEntry>>>({});
  const { toast } = useToast();

  const currentProgram = programTemplates.find(p => p.id === selectedProgram) || programTemplates[0];

  // Determine if we're in standalone mode (not embedded)
  const isStandalone = standalone || window.location.pathname === '/rooster';

  // Calculate the actual start date (default to current Monday if not set)
  const actualStartDate = startDate || startOfWeek(new Date(), { weekStartsOn: 1 });

  // Load session overrides from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`rooster-overrides-${selectedProgram}`);
    if (saved) {
      try {
        setSessionOverrides(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load session overrides:', e);
      }
    }
  }, [selectedProgram]);

  // Save session overrides to localStorage
  const saveSessionOverrides = (overrides: Record<string, Partial<AgendaEntry>>) => {
    setSessionOverrides(overrides);
    localStorage.setItem(`rooster-overrides-${selectedProgram}`, JSON.stringify(overrides));
  };

  // Generate agenda entries with calculated dates
  const generateAgendaEntries = (): AgendaEntry[] => {
    const entries: AgendaEntry[] = [];
    
    currentProgram.weeks.forEach((week, weekIndex) => {
      week.days.forEach((day) => {
        day.sessions.forEach((session, sessionIndex) => {
          const sessionId = `${weekIndex}-${session.dayOfWeek}-${sessionIndex}`;
          
          // Calculate the actual date
          const weekStart = addWeeks(actualStartDate, weekIndex);
          let sessionDate = addDays(weekStart, session.dayOfWeek);
          
          // Use custom date if available
          if (session.customDate) {
            sessionDate = new Date(session.customDate);
          }
          
          // Apply session overrides
          const override = sessionOverrides[sessionId];
          const finalSession = {
            id: sessionId,
            sessionId,
            title: override?.title || session.title,
            time: override?.time || `${session.startTime}-${session.endTime}`,
            date: override?.date || sessionDate,
            dateString: override?.dateString || format(sessionDate, 'EEEE d MMMM', { locale: nl }),
            description: override?.description || session.description,
            location: override?.location || session.location,
            address: override?.address || session.address,
            trainer: override?.trainer || session.trainer,
            week: weekIndex + 1,
            dayOfWeek: session.dayOfWeek
          };
          
          entries.push(finalSession);
        });
      });
    });

    return entries.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const agendaEntries = generateAgendaEntries();

  // Update URL when parameters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set('program', selectedProgram);
    if (startDate) {
      newParams.set('startDate', startDate.toISOString().split('T')[0]);
    }
    if (compact) newParams.set('compact', 'true');
    if (!showHeader) newParams.set('header', 'false');
    if (standalone) newParams.set('standalone', 'true');
    if (editMode) newParams.set('editable', 'true');
    if (!showInfo) newParams.set('showInfo', 'false');
    setSearchParams(newParams);
  }, [selectedProgram, startDate, compact, showHeader, standalone, editMode, showInfo, setSearchParams]);

  const getLocationColor = (location: LocationType) => {
    switch (location) {
      case 'Online': return 'bg-blue-100 text-blue-800';
      case 'Op locatie': return 'bg-green-100 text-green-800';
      case 'Hybride': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationIcon = (location: LocationType) => {
    switch (location) {
      case 'Online': return <Code className="h-3 w-3" />;
      case 'Op locatie': return <MapPin className="h-3 w-3" />;
      case 'Hybride': return <Users className="h-3 w-3" />;
      default: return null;
    }
  };

  const generateEmbedCode = () => {
    const currentUrl = new URL(window.location.href);
    const embedUrl = `${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`;
    
    return `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="${compact ? '600' : '800'}" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>`;
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    toast({
      title: "Gekopieerd!",
      description: "Embed code is gekopieerd naar het klembord.",
    });
  };

  const openPreview = () => {
    const currentUrl = new URL(window.location.href);
    const previewUrl = `${currentUrl.origin}${currentUrl.pathname}?${searchParams.toString()}`;
    window.open(previewUrl, '_blank');
  };

  const handleSessionSave = (sessionId: string, updates: Partial<AgendaEntry>) => {
    const newOverrides = { ...sessionOverrides, [sessionId]: { ...sessionOverrides[sessionId], ...updates } };
    saveSessionOverrides(newOverrides);
    toast({
      title: "Sessie bijgewerkt",
      description: "De sessie is succesvol bijgewerkt.",
    });
  };

  const resetCustomizations = () => {
    setSessionOverrides({});
    localStorage.removeItem(`rooster-overrides-${selectedProgram}`);
    toast({
      title: "Aanpassingen gereset",
      description: "Alle aangepaste sessies zijn teruggezet naar de standaard waarden.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Helmet>
        <title>Techgrounds Rooster - {currentProgram.name}</title>
        <meta name="description" content={`Techgrounds ${currentProgram.name} programma rooster - bekijk alle lessen, workshops en activiteiten.`} />
      </Helmet>

      <div className="container mx-auto p-4 max-w-6xl">
        {showHeader && (
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Techgrounds Rooster</h1>
                <p className="text-gray-600">{currentProgram.name} Programma</p>
              </div>
            </div>

            {/* Program Info - only in standalone mode */}
            {isStandalone && showInfo && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 max-w-4xl mx-auto">
                <div className="flex items-start space-x-4">
                  <Info className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentProgram.name}</h3>
                    <p className="text-gray-700 mb-3">{currentProgram.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Duur: {currentProgram.duration}</span>
                      </div>
                      {currentProgram.websiteUrl && (
                        <a 
                          href={currentProgram.websiteUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          <Globe className="h-4 w-4 mr-1" />
                          <span>Meer informatie</span>
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                    {currentProgram.additionalInfo && (
                      <p className="text-gray-600 text-sm mt-3 italic">{currentProgram.additionalInfo}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* Program Selection */}
          <div className="flex flex-wrap gap-2 justify-center">
            {programTemplates.map((program) => (
              <Button
                key={program.id}
                variant={selectedProgram === program.id ? "default" : "outline"}
                onClick={() => setSelectedProgram(program.id)}
                className="min-w-[120px]"
              >
                {program.name}
              </Button>
            ))}
          </div>

          {/* Date Selection and Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Startdatum:</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'dd MMM yyyy', { locale: nl }) : 'Selecteer datum'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => getDay(date) !== 1 || isExcludedDate(date)} // Only allow Mondays that are not holidays/weekends
                    className={cn("rounded-md border p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Edit Mode Toggle - only in standalone */}
            {isStandalone && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-mode"
                  checked={editMode}
                  onCheckedChange={setEditMode}
                />
                <Label htmlFor="edit-mode" className="text-sm font-medium">
                  Bewerk Mode
                </Label>
              </div>
            )}

            {/* Reset Button - only in edit mode */}
            {editMode && Object.keys(sessionOverrides).length > 0 && (
              <Button variant="outline" size="sm" onClick={resetCustomizations}>
                Reset Aanpassingen
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Embed
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Embed Rooster</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Preview URL</label>
                    <div className="flex mt-1">
                      <input
                        type="text"
                        value={`${window.location.origin}${window.location.pathname}?${searchParams.toString()}`}
                        readOnly
                        className="flex-1 px-3 py-2 text-xs bg-gray-50 border rounded-l-md"
                      />
                      <Button size="sm" variant="outline" onClick={openPreview} className="rounded-l-none">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Embed Code</label>
                    <Textarea
                      value={generateEmbedCode()}
                      readOnly
                      className="mt-1 font-mono text-xs"
                      rows={6}
                    />
                    <Button onClick={copyEmbedCode} className="mt-2 w-full">
                      <Copy className="h-4 w-4 mr-2" />
                      Kopieer Embed Code
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Agenda - Fixed Layout */}
        <div className="space-y-4">
          {agendaEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-2">{entry.title}</CardTitle>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{entry.dateString}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>{entry.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Badge className={cn("flex items-center gap-1 text-xs", getLocationColor(entry.location))}>
                        {getLocationIcon(entry.location)}
                        <span>{entry.location}</span>
                      </Badge>
                      {editMode && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSession(entry)}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs whitespace-nowrap">
                        Week {entry.week}
                      </Badge>
                      {sessionOverrides[entry.sessionId] && (
                        <Badge variant="secondary" className="text-xs">
                          Aangepast
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {(entry.description || entry.trainer || entry.address) && (
                <CardContent className="pt-0">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                  >
                    <div className="text-sm text-gray-600 mb-2">
                      {expandedEntry === entry.id ? 'Klik om in te klappen' : 'Klik voor details'}
                    </div>
                    
                    {expandedEntry === entry.id && (
                      <div className="space-y-2 text-sm">
                        {entry.description && (
                          <p className="text-gray-700">{entry.description}</p>
                        )}
                        {entry.trainer && (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                            <span className="font-medium">Trainer: {entry.trainer}</span>
                          </div>
                        )}
                        {entry.address && entry.location === 'Op locatie' && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                            <span>{entry.address}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {agendaEntries.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Geen agenda items</h3>
            <p className="text-gray-600">Er zijn geen agenda items beschikbaar voor het geselecteerde programma.</p>
          </div>
        )}
      </div>

      {/* Session Editor Dialog */}
      <SessionEditor
        session={editingSession}
        isOpen={!!editingSession}
        onClose={() => setEditingSession(null)}
        onSave={handleSessionSave}
      />
    </div>
  );
};

export default TechgroundsRoosterEmbedNL;
