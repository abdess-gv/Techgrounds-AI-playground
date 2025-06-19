
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Copy, Calendar, Check } from 'lucide-react';
import { useRosterData } from '@/hooks/useRosterData';

const RosterEmbedGenerator: React.FC = () => {
  const { programs, loading } = useRosterData();
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    if (!selectedProgramId) return '';
    
    const program = programs.find(p => p.id === selectedProgramId);
    const programName = program?.name || 'Programma';
    const baseUrl = window.location.origin;
    const embedUrl = `${baseUrl}/enhanced-roster/${selectedProgramId}?embed=true`;
    
    return `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="800px" 
  frameborder="0" 
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
  title="${programName} Rooster">
</iframe>`;
  };

  const copyToClipboard = async () => {
    const embedCode = generateEmbedCode();
    if (embedCode) {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">Programma's laden...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Rooster Embed Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="program-select">Selecteer Programma</Label>
          <Select value={selectedProgramId} onValueChange={setSelectedProgramId}>
            <SelectTrigger id="program-select">
              <SelectValue placeholder="Kies een programma..." />
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

        {selectedProgramId && (
          <>
            <div className="space-y-2">
              <Label>Embed Code</Label>
              <Textarea
                value={generateEmbedCode()}
                readOnly
                className="h-32 font-mono text-sm bg-gray-50"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={copyToClipboard} className="flex-1">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Gekopieerd!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Kopieer Code
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open(`/enhanced-roster/${selectedProgramId}?embed=true`, '_blank')}
              >
                Preview
              </Button>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Gebruiksinstructies:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Plak de embed code in je website of CMS</li>
                <li>• Het rooster toont automatisch de juiste week voor elke groep</li>
                <li>• De embed is responsive en werkt op alle apparaten</li>
                <li>• Updates aan het rooster zijn direct zichtbaar</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RosterEmbedGenerator;
