
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, ExternalLink, Code, Eye } from 'lucide-react';
import { exerciseDatabase } from './ExerciseData';
import { toast } from "sonner";

const ExerciseEmbedGenerator = () => {
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [compact, setCompact] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showLegend, setShowLegend] = useState(true);

  const exercises = exerciseDatabase[selectedLevel] || [];
  const currentExercise = exercises.find(ex => ex.id === selectedExercise) || exercises[0];

  const generateEmbedUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      level: selectedLevel,
      exercise: selectedExercise || exercises[0]?.id || '',
      compact: compact.toString(),
      header: showHeader.toString(),
      legend: showLegend.toString()
    });
    
    return `${baseUrl}/exercise-embed?${params.toString()}`;
  };

  const generateIframeCode = () => {
    const url = generateEmbedUrl();
    const height = compact ? '600' : '800';
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
            <span>Exercise Embed Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration */}
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
                <Label htmlFor="exercise">Exercise</Label>
                <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise" />
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
            </div>
          </div>

          {/* Selected Exercise Info */}
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
                    onClick={() => copyToClipboard(generateEmbedUrl(), "URL")}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(generateEmbedUrl(), '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Open
                  </Button>
                </div>
              </div>
              <Textarea
                value={generateEmbedUrl()}
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
                  onClick={() => copyToClipboard(generateIframeCode(), "Iframe code")}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={generateIframeCode()}
                readOnly
                className="font-mono text-sm"
                rows={8}
              />
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Eye className="h-4 w-4 text-gray-600" />
              <Label>Live Preview</Label>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={generateEmbedUrl()}
                width="100%"
                height={compact ? "600" : "800"}
                className="border-0"
                title="Exercise Embed Preview"
              />
            </div>
          </div>
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
              <h4 className="font-semibold mb-2">For Websites & Blogs:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Copy the iframe code and paste it into your HTML</li>
                <li>• Adjust width and height as needed</li>
                <li>• Use compact mode for sidebars or smaller spaces</li>
                <li>• The exercise will work independently</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Learning Platforms:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Listen for completion events via postMessage</li>
                <li>• Track student progress and scores</li>
                <li>• Customize appearance with URL parameters</li>
                <li>• Integrate with your existing systems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseEmbedGenerator;
