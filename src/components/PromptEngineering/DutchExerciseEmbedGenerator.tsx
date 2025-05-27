
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Code, Eye, Database, AlertCircle } from 'lucide-react';
import { exerciseDatabase } from './ExerciseData';
import { toast } from "sonner";

interface EmbedConfig {
  level: "beginner" | "intermediate" | "advanced";
  exercise: string;
  compact: boolean;
  showHeader: boolean;
  showLegend: boolean;
  showSelector: boolean;
  language: 'nl';
}

interface DatabaseEmbedConfig {
  category: string;
  difficulty: string;
  compact: boolean;
  showHeader: boolean;
  showLegend: boolean;
  showSearch: boolean;
  language: 'nl';
}

const DutchExerciseEmbedGenerator = () => {
  const [exerciseConfig, setExerciseConfig] = useState<EmbedConfig>({
    level: "beginner",
    exercise: "",
    compact: false,
    showHeader: true,
    showLegend: true,
    showSelector: true,
    language: 'nl'
  });

  const [databaseConfig, setDatabaseConfig] = useState<DatabaseEmbedConfig>({
    category: "all",
    difficulty: "all",
    compact: false,
    showHeader: true,
    showLegend: true,
    showSearch: true,
    language: 'nl'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const exercises = exerciseDatabase[exerciseConfig.level] || [];
  const currentExercise = exercises.find(ex => ex.id === exerciseConfig.exercise) || exercises[0];

  // Auto-select first exercise when level changes
  useEffect(() => {
    if (exercises.length > 0 && !exerciseConfig.exercise) {
      setExerciseConfig(prev => ({ ...prev, exercise: exercises[0].id }));
    }
  }, [exerciseConfig.level, exercises, exerciseConfig.exercise]);

  const generateExerciseEmbedUrl = (): string => {
    try {
      const baseUrl = window.location.origin;
      const params = new URLSearchParams({
        level: exerciseConfig.level,
        exercise: exerciseConfig.exercise || exercises[0]?.id || '',
        compact: exerciseConfig.compact.toString(),
        header: exerciseConfig.showHeader.toString(),
        legend: exerciseConfig.showLegend.toString(),
        selector: exerciseConfig.showSelector.toString(),
        lang: 'nl'
      });
      
      return `${baseUrl}/exercise-embed-nl?${params.toString()}`;
    } catch (error) {
      console.error('Error generating exercise embed URL:', error);
      return '';
    }
  };

  const generateDatabaseEmbedUrl = (): string => {
    try {
      const baseUrl = window.location.origin;
      const params = new URLSearchParams({
        compact: databaseConfig.compact.toString(),
        header: databaseConfig.showHeader.toString(),
        legend: databaseConfig.showLegend.toString(),
        search: databaseConfig.showSearch.toString(),
        category: databaseConfig.category,
        difficulty: databaseConfig.difficulty,
        lang: 'nl'
      });
      
      return `${baseUrl}/database-embed?${params.toString()}`;
    } catch (error) {
      console.error('Error generating database embed URL:', error);
      return '';
    }
  };

  const generateIframeCode = (url: string, type: 'exercise' | 'database'): string => {
    const height = exerciseConfig.compact || databaseConfig.compact ? '600' : 
                  type === 'database' ? '900' : '800';
    const width = exerciseConfig.compact || databaseConfig.compact ? '800' : '1200';
    
    return `<iframe 
  src="${url}"
  width="${width}" 
  height="${height}"
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 100%;"
  allowfullscreen
  title="Nederlandse Prompt Engineering ${type === 'exercise' ? 'Oefening' : 'Database'}">
</iframe>`;
  };

  const copyToClipboard = async (text: string, type: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} gekopieerd naar klembord!`);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Kopiëren mislukt. Probeer het opnieuw.');
    }
  };

  const handlePreviewError = (error: any) => {
    console.error('Preview error:', error);
    setPreviewError('Voorbeeld kon niet worden geladen. Controleer de instellingen.');
  };

  const updateExerciseConfig = (updates: Partial<EmbedConfig>) => {
    setExerciseConfig(prev => ({ ...prev, ...updates }));
    setPreviewError(null);
  };

  const updateDatabaseConfig = (updates: Partial<DatabaseEmbedConfig>) => {
    setDatabaseConfig(prev => ({ ...prev, ...updates }));
    setPreviewError(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-blue-600" />
            <span>Nederlandse Embed Generator</span>
          </CardTitle>
          <p className="text-blue-700 text-sm mt-2">
            Genereer insluitcodes voor Nederlandse prompt engineering oefeningen en databases
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="exercises" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="exercises" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Oefeningen Insluiten</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Database Insluiten</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="exercises" className="space-y-6 mt-6">
              {/* Exercise Configuration */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-green-200">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="text-green-900 text-lg">Oefening Configuratie</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="level">Moeilijkheidsgraad</Label>
                      <Select 
                        value={exerciseConfig.level} 
                        onValueChange={(value: any) => updateExerciseConfig({ level: value, exercise: "" })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Gemiddeld</SelectItem>
                          <SelectItem value="advanced">Gevorderd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="exercise">Standaard Oefening</Label>
                      <Select 
                        value={exerciseConfig.exercise} 
                        onValueChange={(value) => updateExerciseConfig({ exercise: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer oefening" />
                        </SelectTrigger>
                        <SelectContent>
                          {exercises.map((exercise) => (
                            <SelectItem key={exercise.id} value={exercise.id}>
                              {exercise.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-200">
                  <CardHeader className="bg-purple-50">
                    <CardTitle className="text-purple-900 text-lg">Weergave Opties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="compact"
                        checked={exerciseConfig.compact}
                        onCheckedChange={(checked) => updateExerciseConfig({ compact: checked })}
                      />
                      <Label htmlFor="compact">Compacte Weergave</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="header"
                        checked={exerciseConfig.showHeader}
                        onCheckedChange={(checked) => updateExerciseConfig({ showHeader: checked })}
                      />
                      <Label htmlFor="header">Toon Koptekst</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="legend"
                        checked={exerciseConfig.showLegend}
                        onCheckedChange={(checked) => updateExerciseConfig({ showLegend: checked })}
                      />
                      <Label htmlFor="legend">Toon Kleur Legenda</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="selector"
                        checked={exerciseConfig.showSelector}
                        onCheckedChange={(checked) => updateExerciseConfig({ showSelector: checked })}
                      />
                      <Label htmlFor="selector">Toon Oefening Selector</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Current Exercise Info */}
              {currentExercise && (
                <Card className="bg-blue-50 border-2 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-blue-900">{currentExercise.title}</h4>
                      <div className="flex space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">{currentExercise.category}</Badge>
                        <Badge className={`${
                          currentExercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          currentExercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {currentExercise.difficulty === 'beginner' ? 'Beginner' :
                           currentExercise.difficulty === 'intermediate' ? 'Gemiddeld' : 'Gevorderd'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-blue-800 text-sm">{currentExercise.description}</p>
                  </CardContent>
                </Card>
              )}

              {/* Exercise Embed Codes */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Directe URL</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generateExerciseEmbedUrl(), "URL")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Kopieer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(generateExerciseEmbedUrl(), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={generateExerciseEmbedUrl()}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                    rows={2}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Iframe Insluitcode</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateIframeCode(generateExerciseEmbedUrl(), 'exercise'), "Iframe code")}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Kopieer
                    </Button>
                  </div>
                  <Textarea
                    value={generateIframeCode(generateExerciseEmbedUrl(), 'exercise')}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                    rows={8}
                  />
                </div>
              </div>

              {/* Exercise Preview */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="h-4 w-4 text-gray-600" />
                  <Label className="text-base font-semibold">Live Voorbeeld</Label>
                </div>
                {previewError ? (
                  <div className="border rounded-lg p-8 bg-red-50 border-red-200">
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>{previewError}</span>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden shadow-sm">
                    <iframe
                      src={generateExerciseEmbedUrl()}
                      width="100%"
                      height={exerciseConfig.compact ? "600" : "800"}
                      className="border-0"
                      title="Oefening Voorbeeld"
                      onError={handlePreviewError}
                    />
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="database" className="space-y-6 mt-6">
              {/* Database Configuration */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-orange-200">
                  <CardHeader className="bg-orange-50">
                    <CardTitle className="text-orange-900 text-lg">Database Configuratie</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="db-category">Standaard Categorie</Label>
                      <Select 
                        value={databaseConfig.category} 
                        onValueChange={(value) => updateDatabaseConfig({ category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer categorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle Categorieën</SelectItem>
                          <SelectItem value="content">Content Creatie</SelectItem>
                          <SelectItem value="development">Ontwikkeling</SelectItem>
                          <SelectItem value="education">Onderwijs</SelectItem>
                          <SelectItem value="business">Zakelijk</SelectItem>
                          <SelectItem value="ai-systems">AI Systemen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="db-difficulty">Standaard Moeilijkheidsgraad</Label>
                      <Select 
                        value={databaseConfig.difficulty} 
                        onValueChange={(value) => updateDatabaseConfig({ difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecteer niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle Niveaus</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Gemiddeld</SelectItem>
                          <SelectItem value="advanced">Gevorderd</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-indigo-200">
                  <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-indigo-900 text-lg">Weergave Opties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="db-compact"
                        checked={databaseConfig.compact}
                        onCheckedChange={(checked) => updateDatabaseConfig({ compact: checked })}
                      />
                      <Label htmlFor="db-compact">Compacte Weergave</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="db-header"
                        checked={databaseConfig.showHeader}
                        onCheckedChange={(checked) => updateDatabaseConfig({ showHeader: checked })}
                      />
                      <Label htmlFor="db-header">Toon Koptekst</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="db-legend"
                        checked={databaseConfig.showLegend}
                        onCheckedChange={(checked) => updateDatabaseConfig({ showLegend: checked })}
                      />
                      <Label htmlFor="db-legend">Toon Kleur Legenda</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="db-search"
                        checked={databaseConfig.showSearch}
                        onCheckedChange={(checked) => updateDatabaseConfig({ showSearch: checked })}
                      />
                      <Label htmlFor="db-search">Toon Zoeken & Filters</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Database Embed Codes */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Directe URL</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generateDatabaseEmbedUrl(), "Database URL")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Kopieer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(generateDatabaseEmbedUrl(), '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={generateDatabaseEmbedUrl()}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                    rows={2}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-base font-semibold">Iframe Insluitcode</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateIframeCode(generateDatabaseEmbedUrl(), 'database'), "Database iframe code")}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Kopieer
                    </Button>
                  </div>
                  <Textarea
                    value={generateIframeCode(generateDatabaseEmbedUrl(), 'database')}
                    readOnly
                    className="font-mono text-sm bg-gray-50"
                    rows={8}
                  />
                </div>
              </div>

              {/* Database Preview */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="h-4 w-4 text-gray-600" />
                  <Label className="text-base font-semibold">Live Voorbeeld</Label>
                </div>
                {previewError ? (
                  <div className="border rounded-lg p-8 bg-red-50 border-red-200">
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>{previewError}</span>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg overflow-hidden shadow-sm">
                    <iframe
                      src={generateDatabaseEmbedUrl()}
                      width="100%"
                      height={databaseConfig.compact ? "600" : "900"}
                      className="border-0"
                      title="Database Voorbeeld"
                      onError={handlePreviewError}
                    />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <span>📚</span>
            <span>Gebruiksinstructies</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-900">Oefening Insluiting:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Gebruikers kunnen moeilijkheidsniveaus en oefeningen selecteren</li>
                <li>• Voortgang bijhouden voor alle oefeningen</li>
                <li>• Interactief leren met uitgebreide hints en feedback</li>
                <li>• Compacte modus voor kleinere ruimtes</li>
                <li>• Aanpasbare UI-componenten</li>
                <li>• Volledig Nederlandse interface</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-900">Database Insluiting:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Bladeren en zoeken door professionele prompts</li>
                <li>• Filteren op categorie en moeilijkheidsgraad</li>
                <li>• Prompts kopiëren met één klik</li>
                <li>• Kleurgecodeerde prompt highlighting</li>
                <li>• Responsief ontwerp voor alle apparaten</li>
                <li>• Nederlandse lokalisatie</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DutchExerciseEmbedGenerator;
