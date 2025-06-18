
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
import { CalendarIcon, Clock, MapPin, Copy, Settings, Users, Code, ExternalLink } from 'lucide-react';
import { format, addDays, getDay, startOfWeek, addWeeks } from 'date-fns';
import { nl } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { programTemplates, type ProgramTemplate, type AgendaEntry, type LocationType } from '@/data/techgroundsRooster';

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
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const { toast } = useToast();

  const currentProgram = programTemplates.find(p => p.id === selectedProgram) || programTemplates[0];

  // Calculate the actual start date (default to current Monday if not set)
  const actualStartDate = startDate || startOfWeek(new Date(), { weekStartsOn: 1 });

  // Generate agenda entries with calculated dates
  const generateAgendaEntries = (): AgendaEntry[] => {
    const entries: AgendaEntry[] = [];
    
    currentProgram.weeks.forEach((week, weekIndex) => {
      week.days.forEach((day) => {
        day.sessions.forEach((session) => {
          // Calculate the actual date
          const weekStart = addWeeks(actualStartDate, weekIndex);
          const sessionDate = addDays(weekStart, session.dayOfWeek);
          
          entries.push({
            id: `${weekIndex}-${session.dayOfWeek}-${session.startTime}`,
            title: session.title,
            time: `${session.startTime}-${session.endTime}`,
            date: sessionDate,
            dateString: format(sessionDate, 'EEEE d MMMM', { locale: nl }),
            description: session.description,
            location: session.location,
            address: session.address,
            trainer: session.trainer,
            week: weekIndex + 1,
            dayOfWeek: session.dayOfWeek
          });
        });
      });
    });

    return entries.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const agendaEntries = generateAgendaEntries();

  // Update URL when program or start date changes
  useEffect(() => {
    const newParams = new URLSearchParams();
    newParams.set('program', selectedProgram);
    if (startDate) {
      newParams.set('startDate', startDate.toISOString().split('T')[0]);
    }
    if (compact) newParams.set('compact', 'true');
    if (!showHeader) newParams.set('header', 'false');
    setSearchParams(newParams);
  }, [selectedProgram, startDate, compact, showHeader, setSearchParams]);

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
                    disabled={(date) => getDay(date) !== 1} // Only allow Mondays
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>

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

        {/* Agenda */}
        <div className="space-y-4">
          {agendaEntries.map((entry) => (
            <Card key={entry.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {entry.dateString}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {entry.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={cn("flex items-center space-x-1", getLocationColor(entry.location))}>
                      {getLocationIcon(entry.location)}
                      <span>{entry.location}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Week {entry.week}
                    </Badge>
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
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">Trainer: {entry.trainer}</span>
                          </div>
                        )}
                        {entry.address && entry.location === 'Op locatie' && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
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
    </div>
  );
};

export default TechgroundsRoosterEmbedNL;
