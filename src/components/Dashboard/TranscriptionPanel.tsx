
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, Mic, Play, Square, Settings, 
  Globe, Volume2, FileType, Loader2 
} from "lucide-react";

interface TranscriptionPanelProps {
  onCreateNote: (content: string) => void;
}

const TranscriptionPanel = ({ onCreateNote }: TranscriptionPanelProps) => {
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState('');
  const [toneAnalysis, setToneAnalysis] = useState(true);
  const [autoFormat, setAutoFormat] = useState(true);

  const providers = [
    {
      id: 'openai',
      name: 'OpenAI Whisper',
      description: 'Best overall accuracy, supports 99+ languages',
      badge: 'Recommended'
    },
    {
      id: 'deepgram',
      name: 'Deepgram',
      description: 'Fastest processing, real-time transcription',
      badge: 'Fastest'
    },
    {
      id: 'assemblyai',
      name: 'AssemblyAI',
      description: 'Advanced AI features, speaker diarization',
      badge: 'Advanced'
    }
  ];

  const languages = [
    { code: 'auto', name: 'Auto-detect' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'nl', name: 'Dutch' },
    { code: 'sv', name: 'Swedish' }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsTranscribing(true);
    
    // Simulate transcription process
    setTimeout(() => {
      const mockTranscription = `# Transcribed Audio - ${file.name}

**Provider:** ${providers.find(p => p.id === selectedProvider)?.name}
**Language:** ${languages.find(l => l.code === selectedLanguage)?.name}
**Date:** ${new Date().toLocaleDateString()}

## Transcription Result

This is a sample transcription result. In a real implementation, this would be the actual transcribed text from your audio file using the selected AI provider.

${toneAnalysis ? '\n**Tone Analysis:** Professional, informative, confident' : ''}
${autoFormat ? '\n*Note: This transcription has been automatically formatted for better readability.*' : ''}
`;
      
      setTranscriptionResult(mockTranscription);
      setIsTranscribing(false);
    }, 3000);
  };

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording and process
      setIsTranscribing(true);
      setTimeout(() => {
        const mockTranscription = `# Voice Recording Transcription

**Provider:** ${providers.find(p => p.id === selectedProvider)?.name}
**Language:** ${languages.find(l => l.code === selectedLanguage)?.name}
**Date:** ${new Date().toLocaleDateString()}

## Transcription Result

This is a sample transcription from your voice recording. The actual implementation would capture audio from your microphone and transcribe it using the selected AI provider.

${toneAnalysis ? '\n**Tone Analysis:** Casual, enthusiastic, clear' : ''}
${autoFormat ? '\n*Note: This transcription has been automatically formatted for better readability.*' : ''}
`;
        
        setTranscriptionResult(mockTranscription);
        setIsTranscribing(false);
      }, 2000);
    } else {
      setIsRecording(true);
    }
  };

  const saveAsNote = () => {
    if (transcriptionResult) {
      onCreateNote(transcriptionResult);
      setTranscriptionResult('');
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card 
              key={provider.id}
              className={`cursor-pointer transition-all ${
                selectedProvider === provider.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <Badge variant={selectedProvider === provider.id ? 'default' : 'secondary'}>
                    {provider.badge}
                  </Badge>
                </div>
                <CardDescription>{provider.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Transcription Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Language</span>
                </Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <span>Tone Analysis</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={toneAnalysis} 
                    onCheckedChange={setToneAnalysis} 
                  />
                  <span className="text-sm text-gray-600">
                    {toneAnalysis ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <FileType className="h-4 w-4" />
                  <span>Auto Format</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={autoFormat} 
                    onCheckedChange={setAutoFormat} 
                  />
                  <span className="text-sm text-gray-600">
                    {autoFormat ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Audio File</span>
              </CardTitle>
              <CardDescription>
                Upload MP3, WAV, M4A, or other audio formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="audio-upload"
                  disabled={isTranscribing}
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload audio file</p>
                  <p className="text-sm text-gray-400">Supports MP3, WAV, M4A, etc.</p>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <span>Voice Recording</span>
              </CardTitle>
              <CardDescription>
                Record audio directly from your microphone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-colors ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
                }`}>
                  {isRecording ? (
                    <Square className="h-8 w-8 text-white" />
                  ) : (
                    <Mic className="h-8 w-8 text-white" />
                  )}
                </div>
                <Button
                  onClick={handleRecording}
                  disabled={isTranscribing}
                  variant={isRecording ? 'destructive' : 'default'}
                  size="lg"
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Button>
                {isRecording && (
                  <p className="text-sm text-gray-600">
                    Recording in progress... Click stop when finished.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {isTranscribing && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Transcribing Audio</h3>
              <p className="text-gray-600">
                Processing your audio with {providers.find(p => p.id === selectedProvider)?.name}...
              </p>
            </CardContent>
          </Card>
        )}

        {transcriptionResult && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transcription Result</CardTitle>
                <Button onClick={saveAsNote} className="bg-blue-600 hover:bg-blue-700">
                  Save as Note
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={transcriptionResult}
                onChange={(e) => setTranscriptionResult(e.target.value)}
                className="min-h-64 font-mono text-sm"
                placeholder="Transcription will appear here..."
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TranscriptionPanel;
