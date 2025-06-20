
// src/pages/AdminRosterManagementPage.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

// Define Supabase row types
type ProgramRow = Database['public']['Tables']['programs']['Row'];
type CycleDetailRow = Database['public']['Tables']['program_cycle_details']['Row'];
type DateOverrideRow = Database['public']['Tables']['program_date_overrides']['Row'];

// Simplified interface for program list
interface ProgramListItem {
  id: string;
  name: string;
}

// For form data, which might not have an ID yet if it's a new entry
type CycleDetailFormData = Omit<CycleDetailRow, 'id' | 'created_at' | 'updated_at' | 'program_id'> & { id?: string };
type DateOverrideFormData = Omit<DateOverrideRow, 'id' | 'created_at' | 'updated_at' | 'program_id'> & { id?: string };

const AdminRosterManagementPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramListItem[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [cycleDetails, setCycleDetails] = useState<CycleDetailRow[]>([]);
  const [dateOverrides, setDateOverrides] = useState<DateOverrideRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editingCycleDetail, setEditingCycleDetail] = useState<Partial<CycleDetailFormData> & { program_id?: string, week_in_cycle?: number, day_of_week?: number } | null>(null);
  const daysOfWeekDutch = ["", "Ma", "Di", "Wo", "Do", "Vr", ""];

  const [editingDateOverride, setEditingDateOverride] = useState<Partial<DateOverrideFormData> & { program_id?: string } | null>(null);

  // Fetch Programs for Selector
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const { data, error: dbError } = await supabase.from('programs').select('id, name').order('name');
      if (dbError) {
        setError('Kon programma\'s niet laden: ' + dbError.message);
        setPrograms([]);
      } else {
        setPrograms(data || []);
      }
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  // Fetch Program-Specific Details (Cycle & Overrides)
  useEffect(() => {
    if (!selectedProgramId) {
      setCycleDetails([]);
      setDateOverrides([]);
      return;
    }
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: cycleData, error: cycleError } = await supabase
          .from('program_cycle_details')
          .select('*')
          .eq('program_id', selectedProgramId)
          .order('week_in_cycle')
          .order('day_of_week');
        if (cycleError) throw cycleError;
        setCycleDetails(cycleData || []);

        const { data: overrideData, error: overrideError } = await supabase
          .from('program_date_overrides')
          .select('*')
          .eq('program_id', selectedProgramId)
          .order('override_date');
        if (overrideError) throw overrideError;
        setDateOverrides(overrideData || []);
      } catch (e: any) {
        setError('Kon details niet laden: ' + e.message);
        setCycleDetails([]);
        setDateOverrides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [selectedProgramId]);

  const openCycleDetailForm = (week: number, day: number, detail?: CycleDetailRow) => {
    if (!selectedProgramId) return;
    setEditingCycleDetail(detail ?
      { ...detail } :
      { week_in_cycle: week, day_of_week: day, time_info: '', location_info: '', general_info: '', link_url: '' }
    );
  };

  const handleCycleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingCycleDetail) return;
    setEditingCycleDetail({ ...editingCycleDetail, [e.target.name]: e.target.value });
  };

  const handleCycleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCycleDetail || !selectedProgramId || editingCycleDetail.week_in_cycle === undefined || editingCycleDetail.day_of_week === undefined) {
        setError("Kan cyclusitem niet opslaan: selecteer een programma en zorg dat week/dag correct zijn.");
        return;
    }
    setFormLoading(true);

    const detailToSave: Database['public']['Tables']['program_cycle_details']['Insert'] = {
      id: editingCycleDetail.id || undefined,
      program_id: selectedProgramId,
      week_in_cycle: editingCycleDetail.week_in_cycle,
      day_of_week: editingCycleDetail.day_of_week,
      time_info: editingCycleDetail.time_info || "",
      location_info: editingCycleDetail.location_info || "",
      general_info: editingCycleDetail.general_info || "",
      link_url: editingCycleDetail.link_url || null,
    };

    try {
      const { data, error: dbError } = await supabase
        .from('program_cycle_details')
        .upsert(detailToSave, { onConflict: 'program_id,week_in_cycle,day_of_week' })
        .select()
        .single();

      if (dbError) throw dbError;

      if (data) {
        setCycleDetails(prev => {
          const existingIndex = prev.findIndex(cd => cd.id === data.id);
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex] = data;
            return updated;
          }
          return [...prev, data].sort((a,b) => (a.week_in_cycle*7 + a.day_of_week) - (b.week_in_cycle*7 + b.day_of_week) );
        });
      }
      setEditingCycleDetail(null);
    } catch (err: any) {
      setError('Fout bij opslaan cyclus detail: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteCycleDetail = async (cycleDetailId: string) => {
    if (!confirm('Weet u zeker dat u dit cyclus item wilt verwijderen?')) return;
    setFormLoading(true);
    try {
        const { error: dbError } = await supabase
            .from('program_cycle_details')
            .delete()
            .eq('id', cycleDetailId);
        if (dbError) throw dbError;
        setCycleDetails(prev => prev.filter(cd => cd.id !== cycleDetailId));
    } catch (e: any) {
        setError('Fout bij verwijderen cyclus detail: ' + e.message);
    } finally {
        setFormLoading(false);
    }
  };

  const openDateOverrideForm = (override?: DateOverrideRow) => {
    if (!selectedProgramId) return;
    setEditingDateOverride(override ?
      { ...override } :
      { override_date: '', time_info: '', location_info: '', general_info: '', link_url: '' }
    );
  };

  const handleDateOverrideFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingDateOverride) return;
    setEditingDateOverride({ ...editingDateOverride, [e.target.name]: e.target.value });
  };

  const handleDateOverrideFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDateOverride || !selectedProgramId || !editingDateOverride.override_date) {
        setError("Kan datum uitzondering niet opslaan: selecteer een programma en zorg dat de datum correct is.");
        return;
    }
    setFormLoading(true);

    const overrideToSave: Database['public']['Tables']['program_date_overrides']['Insert'] = {
      id: editingDateOverride.id || undefined,
      program_id: selectedProgramId,
      override_date: editingDateOverride.override_date,
      time_info: editingDateOverride.time_info || "",
      location_info: editingDateOverride.location_info || "",
      general_info: editingDateOverride.general_info || "",
      link_url: editingDateOverride.link_url || null,
    };

    try {
      const { data, error: dbError } = await supabase
        .from('program_date_overrides')
        .upsert(overrideToSave, { onConflict: 'program_id,override_date' })
        .select()
        .single();

      if (dbError) throw dbError;

      if (data) {
        setDateOverrides(prev => {
          const existingIndex = prev.findIndex(ov => ov.id === data.id);
          if (existingIndex > -1) {
            const updated = [...prev];
            updated[existingIndex] = data;
            return updated;
          }
          return [...prev, data].sort((a,b) => new Date(a.override_date).getTime() - new Date(b.override_date).getTime());
        });
      }
      setEditingDateOverride(null);
    } catch (err: any) {
      setError('Fout bij opslaan uitzondering: ' + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteDateOverride = async (overrideId: string) => {
    if (!confirm('Weet u zeker dat u deze uitzondering wilt verwijderen?')) return;
    setFormLoading(true);
    try {
        const { error: dbError } = await supabase
            .from('program_date_overrides')
            .delete()
            .eq('id', overrideId);
        if (dbError) throw dbError;
        setDateOverrides(prev => prev.filter(ov => ov.id !== overrideId));
    } catch (e: any) {
        setError('Fout bij verwijderen uitzondering: ' + e.message);
    } finally {
        setFormLoading(false);
    }
  };

  const generateEmbedCode = () => {
    if (!selectedProgramId) return '';
    const programName = programs.find(p => p.id === selectedProgramId)?.name || 'Programma';
    const baseUrl = window.location.origin;
    const embedUrl = `${baseUrl}/roster/${selectedProgramId}?embed=true`;
    return `<iframe src="${embedUrl}" width="100%" height="800px" frameborder="0" title="${programName} Rooster"></iframe>`;
  };

  if (loading && programs.length === 0) return <p>Programma's laden...</p>;

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rooster Beheer</h1>
        <p className="text-gray-600 mt-2">Beheer roosters voor alle programma's</p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Programma Selectie</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="program-select" className="mb-2 block font-medium">Selecteer Programma:</Label>
          <Select value={selectedProgramId || undefined} onValueChange={(value) => setSelectedProgramId(value || null) }>
            <SelectTrigger id="program-select" className="w-full">
              <SelectValue placeholder="-- Selecteer een Programma --" />
            </SelectTrigger>
            <SelectContent>
              {programs.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedProgramId && (
        <>
          {loading && <p className="text-center py-4">Programma details laden...</p>}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Standaard 4-Weken Cyclus</CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Definieer het standaard weekschema voor <span className="font-semibold">{programs.find(p => p.id === selectedProgramId)?.name || 'geselecteerd programma'}</span>.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4].map(week => (
                  <div key={`week-${week}`} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Week {week}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                      {daysOfWeekDutch.map((dayName, dayIndex) => {
                        if (dayIndex === 0 || dayIndex === 6) return null;
                        const detail = cycleDetails.find(cd => cd.week_in_cycle === week && cd.day_of_week === dayIndex);
                        return (
                          <Card key={`w${week}-d${dayIndex}`} className="min-h-[140px] flex flex-col">
                            <CardHeader className="p-3 pb-2">
                              <CardTitle className="text-sm font-medium text-gray-600">{dayName}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-xs flex-grow flex flex-col justify-between">
                              {detail ? (
                                <>
                                  <div className="space-y-1">
                                    <p className="font-medium text-gray-800" title={detail.general_info}>{detail.general_info}</p>
                                    <p className="text-gray-600"><strong>Tijd:</strong> {detail.time_info}</p>
                                    <p className="text-gray-600" title={detail.location_info}><strong>Locatie:</strong> {detail.location_info}</p>
                                    {detail.link_url && <p><a href={detail.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">Link</a></p>}
                                  </div>
                                  <div className="mt-3 flex gap-1">
                                    <Button variant="link" size="sm" onClick={() => openCycleDetailForm(week, dayIndex, detail)} className="p-0 h-auto text-xs">Bewerken</Button>
                                    <Button variant="link" size="sm" onClick={() => detail.id && handleDeleteCycleDetail(detail.id)} disabled={!detail.id || formLoading} className="p-0 h-auto text-xs text-red-600 hover:text-red-800">Verwijder</Button>
                                  </div>
                                </>
                              ) : (
                                <Button variant="link" size="sm" onClick={() => openCycleDetailForm(week, dayIndex)} className="p-0 h-auto self-start text-green-600 hover:text-green-800 text-xs">+ Toevoegen</Button>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Dialog open={!!editingCycleDetail} onOpenChange={(isOpen) => { if (!isOpen) setEditingCycleDetail(null); }}>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleCycleFormSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingCycleDetail?.id ? 'Cyclus Item Bewerken' : 'Nieuw Cyclus Item'}</DialogTitle>
                  {editingCycleDetail && editingCycleDetail.week_in_cycle !== undefined && editingCycleDetail.day_of_week !== undefined &&
                    <DialogDescription>Week {editingCycleDetail.week_in_cycle}, {daysOfWeekDutch[editingCycleDetail.day_of_week]}</DialogDescription>
                  }
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="general_info_cycle_form" className="text-right">Onderwerp</Label>
                    <Input id="general_info_cycle_form" name="general_info" value={editingCycleDetail?.general_info || ''} onChange={handleCycleFormChange} required className="col-span-3" placeholder="Bijv. Python Basics" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time_info_cycle_form" className="text-right">Tijd</Label>
                    <Input id="time_info_cycle_form" name="time_info" value={editingCycleDetail?.time_info || ''} onChange={handleCycleFormChange} required className="col-span-3" placeholder="Bijv. 09:00-17:00" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location_info_cycle_form" className="text-right">Locatie</Label>
                    <Input id="location_info_cycle_form" name="location_info" value={editingCycleDetail?.location_info || ''} onChange={handleCycleFormChange} required className="col-span-3" placeholder="Bijv. Online of Amsterdam" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link_url_cycle_form" className="text-right">Link (opt.)</Label>
                    <Input id="link_url_cycle_form" name="link_url" type="url" value={editingCycleDetail?.link_url || ''} onChange={handleCycleFormChange} className="col-span-3" placeholder="https://..." />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Annuleren</Button>
                  </DialogClose>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? 'Opslaan...' : 'Opslaan'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Datum Uitzonderingen</CardTitle>
               <p className="text-sm text-gray-600 mt-2">
                Beheer specifieke datumuitzonderingen voor <span className="font-semibold">{programs.find(p => p.id === selectedProgramId)?.name || 'geselecteerd programma'}</span> (bijv. feestdagen, speciale evenementen).
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {dateOverrides.length > 0 ? dateOverrides
                  .filter(override => {
                    const overrideDate = new Date(override.override_date);
                    // Adjust for timezone differences if `override_date` is just a date string e.g. "YYYY-MM-DD"
                    // Supabase typically stores DATE type as YYYY-MM-DD UTC.
                    // When new Date("YYYY-MM-DD") is created, it might be interpreted as UTC or local time depending on the browser.
                    // To be safe, and assuming override_date is meant to be a specific calendar day regardless of timezone:
                    const userTimezoneOffset = overrideDate.getTimezoneOffset() * 60000;
                    const dateInUserTimezone = new Date(overrideDate.getTime() + userTimezoneOffset);
                    const dayOfWeek = dateInUserTimezone.getDay();
                    return dayOfWeek !== 0 && dayOfWeek !== 6; // Exclude Sunday (0) and Saturday (6)
                  })
                  .map((override) => (
                  <Card key={override.id || override.override_date} className="p-4 border-l-4 border-l-orange-400">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-lg text-gray-800">{new Date(override.override_date).toLocaleDateString('nl-NL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p className="text-gray-700 mt-1"><strong>Onderwerp:</strong> {override.general_info}</p>
                        <p className="text-sm text-gray-600"><strong>Tijd:</strong> {override.time_info}</p>
                        <p className="text-sm text-gray-600"><strong>Locatie:</strong> {override.location_info}</p>
                        {override.link_url && <p className="text-sm"><strong>Link:</strong> <a href={override.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link openen</a></p>}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => openDateOverrideForm(override)}>Bewerken</Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => override.id && handleDeleteDateOverride(override.id)}
                          disabled={!override.id || formLoading}
                        >
                          Verwijderen
                        </Button>
                      </div>
                    </div>
                  </Card>
                )) : <p className="text-gray-500 text-center py-8">Geen datum uitzonderingen gedefinieerd (of alleen in het weekend).</p>}
              </div>
              <Button onClick={() => openDateOverrideForm()} className="w-full">
                + Nieuwe Uitzondering Toevoegen
              </Button>
            </CardContent>
          </Card>

          <Dialog open={!!editingDateOverride} onOpenChange={(isOpen) => { if(!isOpen) setEditingDateOverride(null); }}>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleDateOverrideFormSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingDateOverride?.id ? 'Uitzondering Bewerken' : 'Nieuwe Uitzondering'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="override_date_form" className="text-right">Datum</Label>
                    <Input id="override_date_form" name="override_date" type="date" value={editingDateOverride?.override_date || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="general_info_override_form" className="text-right">Onderwerp</Label>
                    <Input id="general_info_override_form" name="general_info" value={editingDateOverride?.general_info || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" placeholder="Bijv. Kerstvakantie" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time_info_override_form" className="text-right">Tijd</Label>
                    <Input id="time_info_override_form" name="time_info" value={editingDateOverride?.time_info || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" placeholder="Bijv. Geen lessen" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location_info_override_form" className="text-right">Locatie</Label>
                    <Input id="location_info_override_form" name="location_info" value={editingDateOverride?.location_info || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" placeholder="Bijv. N.v.t." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link_url_override_form" className="text-right">Link (opt.)</Label>
                    <Input id="link_url_override_form" name="link_url" type="url" value={editingDateOverride?.link_url || ''} onChange={handleDateOverrideFormChange} className="col-span-3" placeholder="https://..." />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Annuleren</Button>
                  </DialogClose>
                  <Button type="submit" disabled={formLoading}>
                    {formLoading ? 'Opslaan...' : 'Opslaan'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Embed Code Section */}
          <Card>
            <CardHeader>
              <CardTitle>Rooster Insluiten</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Gebruik de volgende code om het rooster van dit programma in te sluiten op een andere website:</p>
              <Textarea
                readOnly
                value={generateEmbedCode()}
                className="h-24 font-mono text-sm bg-gray-50"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <p className="text-xs text-gray-500 mt-2">
                Directe Link: <a href={`/roster/${selectedProgramId}?embed=true`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{`/roster/${selectedProgramId}?embed=true`}</a>
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdminRosterManagementPage;
