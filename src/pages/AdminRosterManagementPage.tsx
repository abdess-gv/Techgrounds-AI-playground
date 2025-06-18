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

// Define Supabase row types (or import them if already defined elsewhere)
type ProgramRow = Database['public']['Tables']['programs']['Row'];
type CycleDetailRow = Database['public']['Tables']['program_cycle_details']['Row'];
type DateOverrideRow = Database['public']['Tables']['program_date_overrides']['Row'];

// For form data, which might not have an ID yet if it's a new entry
type CycleDetailFormData = Omit<CycleDetailRow, 'id' | 'created_at' | 'updated_at' | 'program_id'> & { id?: string };
type DateOverrideFormData = Omit<DateOverrideRow, 'id' | 'created_at' | 'updated_at' | 'program_id'> & { id?: string };


const AdminRosterManagementPage: React.FC = () => {
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [cycleDetails, setCycleDetails] = useState<CycleDetailRow[]>([]);
  const [dateOverrides, setDateOverrides] = useState<DateOverrideRow[]>([]);
  const [loading, setLoading] = useState(false); // General loading for page sections
  const [formLoading, setFormLoading] = useState(false); // Specific loading for form submissions
  const [error, setError] = useState<string | null>(null);

  const [editingCycleDetail, setEditingCycleDetail] = useState<Partial<CycleDetailFormData> & { program_id?: string, week_in_cycle?: number, day_of_week?: number } | null>(null);
  const daysOfWeekDutch = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

  const [editingDateOverride, setEditingDateOverride] = useState<Partial<DateOverrideFormData> & { program_id?: string } | null>(null);

  // Fetch Programs for Selector
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const { data, error: dbError } = await supabase.from('programs').select('id, name').order('name');
      if (dbError) {
        setError('Kon programma\'s niet laden: ' + dbError.message); // Dutch
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
        setError('Kon details niet laden: ' + e.message); // Dutch
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
    // For a new detail, only week_in_cycle and day_of_week are pre-filled. Others are empty.
    // For an existing detail, all fields are from the detail.
    setEditingCycleDetail(detail ?
      { ...detail } : // Existing detail
      { week_in_cycle: week, day_of_week: day, time_info: '', location_info: '', general_info: '', link_url: '' } // New detail
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
      id: editingCycleDetail.id || undefined, // Include ID if it exists (for upsert to potentially update)
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

  const handleSaveCycleDetail = async (detailInput: Partial<CycleDetailRow>) => {
    // This function is now effectively handleCycleFormSubmit after refactor
    // The form submit handler will call this or directly contain the logic
    if (!selectedProgramId || detailInput.week_in_cycle === undefined || detailInput.day_of_week === undefined) return;

    const detailToSave: Database['public']['Tables']['program_cycle_details']['Insert'] = {
        id: detailInput.id,
        program_id: selectedProgramId,
        week_in_cycle: detailInput.week_in_cycle,
        day_of_week: detailInput.day_of_week,
        time_info: detailInput.time_info || "",
        location_info: detailInput.location_info || "",
        general_info: detailInput.general_info || "",
        link_url: detailInput.link_url || null,
    };


    setFormLoading(true);
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
        setEditingCycleDetail(null); // Close form after save
    } catch (e: any) {
        setError('Fout bij opslaan cyclus detail: ' + e.message);
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


  // --- Date Override Handlers ---
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

  const handleSaveDateOverride = async (overrideInput: Partial<DateOverrideRow>) => {
    // This function is now effectively handleDateOverrideFormSubmit after refactor
     if (!selectedProgramId || !overrideInput.override_date) return;

    const overrideToSave: Database['public']['Tables']['program_date_overrides']['Insert'] = {
        id: overrideInput.id,
        program_id: selectedProgramId,
        override_date: overrideInput.override_date,
        time_info: overrideInput.time_info || "",
        location_info: overrideInput.location_info || "",
        general_info: overrideInput.general_info || "",
        link_url: overrideInput.link_url || null,
    };
    setFormLoading(true);
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
    } catch (e: any) {
        setError('Fout bij opslaan uitzondering: ' + e.message);
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
  // --- End Date Override Handlers ---

  const generateEmbedCode = () => {
    if (!selectedProgramId) return '';
    const programName = programs.find(p => p.id === selectedProgramId)?.name || 'Programma'; // Dutch fallback
    const baseUrl = window.location.origin;
    const embedUrl = `${baseUrl}/roster/${selectedProgramId}?embed=true`;
    return `<iframe src="${embedUrl}" width="100%" height="800px" frameborder="0" title="${programName} Rooster"></iframe>`;
  };


  if (loading && programs.length === 0) return <p>Loading programs...</p>;

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rooster Beheer</h1>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Programma Selectie</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="program-select" className="mb-1 block">Selecteer Programma:</Label>
          <Select value={selectedProgramId || undefined} onValueChange={(value) => setSelectedProgramId(value || null) }>
            <SelectTrigger id="program-select">
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
          {error && <p className="text-red-500 bg-red-100 p-3 rounded-md">Error: {error}</p>}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Standaard 4-Weken Cyclus</CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                Definieer het standaard weekschema voor <span className="font-semibold">{programs.find(p => p.id === selectedProgramId)?.name || 'geselecteerd programma'}</span>.
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(week => (
                  <div key={`week-${week}`}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Week {week}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                      {daysOfWeekDutch.map((dayName, dayIndex) => {
                        const detail = cycleDetails.find(cd => cd.week_in_cycle === week && cd.day_of_week === dayIndex);
                        return (
                          <Card key={`w${week}-d${dayIndex}`} className="min-h-[120px] flex flex-col">
                            <CardHeader className="p-2 pb-1">
                              <CardTitle className="text-sm font-medium text-muted-foreground">{dayName}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 text-xs flex-grow flex flex-col justify-between">
                              {detail ? (
                                <>
                                  <div>
                                    <p className="truncate" title={detail.general_info || undefined}><strong>Info:</strong> {detail.general_info}</p>
                                    <p><strong>Tijd:</strong> {detail.time_info}</p>
                                    <p className="truncate" title={detail.location_info || undefined}><strong>Locatie:</strong> {detail.location_info}</p>
                                    {detail.link_url && <p className="truncate"><strong>Link:</strong> <a href={detail.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a></p>}
                                  </div>
                                  <div className="mt-2 space-x-1">
                                    <Button variant="link" size="xs" onClick={() => openCycleDetailForm(week, dayIndex, detail)} className="p-0 h-auto">Bewerken</Button>
                                    <Button variant="link" size="xs" onClick={() => detail.id && handleDeleteCycleDetail(detail.id)} disabled={!detail.id || formLoading} className="p-0 h-auto text-red-600 hover:text-red-800">Verwijder</Button>
                                  </div>
                                </>
                              ) : (
                                <Button variant="link" size="xs" onClick={() => openCycleDetailForm(week, dayIndex)} className="p-0 h-auto self-start text-green-600 hover:text-green-800">Toevoegen</Button>
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
                    <Label htmlFor="general_info_cycle_form" className="text-right">Info/Onderwerp</Label>
                    <Input id="general_info_cycle_form" name="general_info" value={editingCycleDetail?.general_info || ''} onChange={handleCycleFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time_info_cycle_form" className="text-right">Tijd</Label>
                    <Input id="time_info_cycle_form" name="time_info" value={editingCycleDetail?.time_info || ''} onChange={handleCycleFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location_info_cycle_form" className="text-right">Locatie</Label>
                    <Input id="location_info_cycle_form" name="location_info" value={editingCycleDetail?.location_info || ''} onChange={handleCycleFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link_url_cycle_form" className="text-right">Link (opt.)</Label>
                    <Input id="link_url_cycle_form" name="link_url" type="url" value={editingCycleDetail?.link_url || ''} onChange={handleCycleFormChange} className="col-span-3" />
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
               <p className="text-sm text-muted-foreground pt-1">
                Beheer specifieke datumuitzonderingen voor <span className="font-semibold">{programs.find(p => p.id === selectedProgramId)?.name || 'geselecteerd programma'}</span> (bijv. feestdagen, speciale evenementen).
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {dateOverrides.length > 0 ? dateOverrides.map((override) => (
                  <Card key={override.id || override.override_date} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{override.override_date}</p>
                        <p className="text-sm"><strong>Info:</strong> {override.general_info}</p>
                        <p className="text-xs"><strong>Tijd:</strong> {override.time_info}</p>
                        <p className="text-xs"><strong>Locatie:</strong> {override.location_info}</p>
                        {override.link_url && <p className="text-xs"><strong>Link:</strong> <a href={override.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Link</a></p>}
                      </div>
                      <div className="space-x-2 flex-shrink-0">
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
                )) : <p className="text-sm text-muted-foreground">Geen datum uitzonderingen gedefinieerd.</p>}
              </div>
              <Button onClick={() => openDateOverrideForm()}>
                Uitzondering Toevoegen
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
                    <Label htmlFor="general_info_override_form" className="text-right">Info/Onderwerp</Label>
                    <Input id="general_info_override_form" name="general_info" value={editingDateOverride?.general_info || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time_info_override_form" className="text-right">Tijd</Label>
                    <Input id="time_info_override_form" name="time_info" value={editingDateOverride?.time_info || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location_info_override_form" className="text-right">Locatie</Label>
                    <Input id="location_info_override_form" name="location_info" value={editingDateOverride?.location_info || ''} onChange={handleDateOverrideFormChange} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="link_url_override_form" className="text-right">Link (opt.)</Label>
                    <Input id="link_url_override_form" name="link_url" type="url" value={editingDateOverride?.link_url || ''} onChange={handleDateOverrideFormChange} className="col-span-3" />
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
              <p className="text-sm text-muted-foreground mb-2">Gebruik de volgende code om het rooster van dit programma in te sluiten:</p>
              <Textarea
                readOnly
                value={generateEmbedCode()}
                className="h-24 font-mono text-sm"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
              <p className="text-xs text-muted-foreground mt-1">
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
