
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Code, Eye, Database } from 'lucide-react';
import { exerciseDatabase } from './ExerciseData';
import { toast } from "sonner";

const ExerciseEmbedGenerator = () => {
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [compact, setCompact] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [showSelector, setShowSelector] = useState(true);

  // Database embed options
  const [dbCategory, setDbCategory] = useState("all");
  const [dbDifficulty, setDbDifficulty] = useState("all");
  const [showSearch, setShowSearch] = useState(true);

  const exercises = exerciseDatabase[selectedLevel] || [];
  const currentExercise = exercises.find(ex => ex.id === selectedExercise) || exercises[0];

  const generateExerciseEmbedUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      level: selectedLevel,
      exercise: selectedExercise || exercises[0]?.id || '',
      compact: compact.toString(),
      header: showHeader.toString(),
      legend: showLegend.toString(),
      selector: showSelector.toString()
    });
    
    return `${baseUrl}/exercise-embed?${params.toString()}`;
  };

  const generateDatabaseEmbedUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      compact: compact.toString(),
      header: showHeader.toString(),
      legend: showLegend.toString(),
      search: showSearch.toString(),
      category: dbCategory,
      difficulty: dbDifficulty
    });
    
    return `${baseUrl}/database-embed?${params.toString()}`;
  };

  const generateIframeCode = (url: string, type: string) => {
    const height = compact ? '600' : type === 'database' ? '900' : '800';
    const width = compact ? '800' : '1200';
    
    return `<iframe 
  src="${url}"
  width="${width}" 
  height="${height}"
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
  allowfullscreen>
</iframe>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-blue-600" />
            <span>Embed Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="exercises" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="exercises" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Exercise Embed</span>
              </TabsTrigger>
              <TabsTrigger value="database" className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Database Embed</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="exercises" className="space-y-6">
              {/* Exercise Configuration */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="level">Difficulty Level</Label>
                    <Select value={selectedLevel} onValueChange={(value: any) => setSelectedLevel(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="exercise">Default Exercise (Optional)</Label>
                    <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                      <SelectTrigger>
                        <SelectValue placeholder="Auto-select first exercise" />
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
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="compact"
                      checked={compact}
                      onCheckedChange={setCompact}
                    />
                    <Label htmlFor="compact">Compact Mode</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="header"
                      checked={showHeader}
                      onCheckedChange={setShowHeader}
                    />
                    <Label htmlFor="header">Show Header</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="legend"
                      checked={showLegend}
                      onCheckedChange={setShowLegend}
                    />
                    <Label htmlFor="legend">Show Color Legend</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="selector"
                      checked={showSelector}
                      onCheckedChange={setShowSelector}
                    />
                    <Label htmlFor="selector">Show Exercise Selector</Label>
                  </div>
                </div>
              </div>

              {/* Exercise Info */}
              {currentExercise && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-900">{currentExercise.title}</h4>
                    <div className="flex space-x-2">
                      <Badge className="bg-blue-100 text-blue-800">{currentExercise.category}</Badge>
                      <Badge className={`${
                        currentExercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        currentExercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {currentExercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-blue-800 text-sm">{currentExercise.description}</p>
                </div>
              )}

              {/* Generated Code */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Direct URL</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generateExerciseEmbedUrl(), "URL")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
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
                    className="font-mono text-sm"
                    rows={2}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Iframe Embed Code</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateIframeCode(generateExerciseEmbedUrl(), 'exercise'), "Iframe code")}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={generateIframeCode(generateExerciseEmbedUrl(), 'exercise')}
                    readOnly
                    className="font-mono text-sm"
                    rows={8}
                  />
                </div>
              </div>

              {/* Exercise Preview */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="h-4 w-4 text-gray-600" />
                  <Label>Live Preview</Label>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    src={generateExerciseEmbedUrl()}
                    width="100%"
                    height={compact ? "600" : "800"}
                    className="border-0"
                    title="Exercise Embed Preview"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database" className="space-y-6">
              {/* Database Configuration */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="db-category">Default Category</Label>
                    <Select value={dbCategory} onValueChange={setDbCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="content">Content Creation</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="ai-systems">AI Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="db-difficulty">Default Difficulty</Label>
                    <Select value={dbDifficulty} onValueChange={setDbDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="db-compact"
                      checked={compact}
                      onCheckedChange={setCompact}
                    />
                    <Label htmlFor="db-compact">Compact Mode</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="db-header"
                      checked={showHeader}
                      onCheckedChange={setShowHeader}
                    />
                    <Label htmlFor="db-header">Show Header</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="db-legend"
                      checked={showLegend}
                      onCheckedChange={setShowLegend}
                    />
                    <Label htmlFor="db-legend">Show Color Legend</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="db-search"
                      checked={showSearch}
                      onCheckedChange={setShowSearch}
                    />
                    <Label htmlFor="db-search">Show Search & Filters</Label>
                  </div>
                </div>
              </div>

              {/* Generated Code for Database */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Direct URL</Label>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generateDatabaseEmbedUrl(), "Database URL")}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
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
                    className="font-mono text-sm"
                    rows={2}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Iframe Embed Code</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateIframeCode(generateDatabaseEmbedUrl(), 'database'), "Database iframe code")}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={generateIframeCode(generateDatabaseEmbedUrl(), 'database')}
                    readOnly
                    className="font-mono text-sm"
                    rows={8}
                  />
                </div>
              </div>

              {/* Database Preview */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Eye className="h-4 w-4 text-gray-600" />
                  <Label>Live Preview</Label>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <iframe
                    src={generateDatabaseEmbedUrl()}
                    width="100%"
                    height={compact ? "600" : "900"}
                    className="border-0"
                    title="Database Embed Preview"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📚 Embedding Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Exercise Embeds:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Users can select difficulty levels and exercises</li>
                <li>• Track completion progress across exercises</li>
                <li>• Interactive learning with hints and feedback</li>
                <li>• Compact mode for smaller spaces</li>
                <li>• Customizable UI components</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Database Embeds:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Browse and search professional prompts</li>
                <li>• Filter by category and difficulty</li>
                <li>• Copy prompts with one click</li>
                <li>• Color-coded prompt highlighting</li>
                <li>• Responsive design for all devices</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseEmbedGenerator;
