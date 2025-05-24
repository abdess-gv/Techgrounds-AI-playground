
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { 
  Upload, Mic, Play, Square, Settings, 
  Globe, Volume2, FileType, Loader2, Users, Brain 
} from "lucide-react";
import { useTranscription } from "@/hooks/useTranscription";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface EnhancedTranscriptionPanelProps {
  onCreateNote: (content: string) => void;
}

const EnhancedTranscriptionPanel = ({ onCreateNote }: EnhancedTranscriptionPanelProps) => {
  const { t } = useLanguage();
  const { transcribeAudio, isTranscribing } = useTranscription();
  
  const [selectedProvider, setSelectedProvider] = useState<'openai' | 'deepgram' | 'assemblyai'>('openai');
  const [selectedLanguage, setSelectedLanguage] = useState('auto');
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState('');
  const [toneAnalysis, setToneAnalysis] = useState(true);
  const [autoFormat, setAutoFormat] = useState(true);
  const [speakerDiarization, setSpeakerDiarization] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState([0.8]);
  const [customVocabulary, setCustomVocabulary] = useState('');

  const providers = [
    {
      id: 'openai' as const,
      name: 'OpenAI Whisper',
      description: t('transcription.providers.openai.desc'),
      badge: t('transcription.providers.recommended'),
      features: ['99+ languages', 'High accuracy', 'Fast processing']
    },
    {
      id: 'deepgram' as const,
      name: 'Deepgram',
      description: t('transcription.providers.deepgram.desc'),
      badge: t('transcription.providers.fastest'),
      features: ['Real-time', 'Ultra-fast', 'Live streaming']
    },
    {
      id: 'assemblyai' as const,
      name: 'AssemblyAI',
      description: t('transcription.providers.assemblyai.desc'),
      badge: t('transcription.providers.advanced'),
      features: ['Speaker detection', 'Topic detection', 'Content moderation']
    }
  ];

  const languages = [
    { code: 'auto', name: t('lang.auto') },
    { code: 'en', name: t('lang.en') },
    { code: 'nl', name: t('lang.nl') },
    { code: 'es', name: t('lang.es') },
    { code: 'fr', name: t('lang.fr') },
    { code: 'de', name: t('lang.de') },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' },
    { code: 'hi', name: 'हिन्दी' }
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const options = {
        provider: selectedProvider,
        language: selectedLanguage,
        toneAnalysis,
        autoFormat,
        speakerDiarization,
        customVocabulary: customVocabulary.split(',').map(s => s.trim()).filter(Boolean),
        confidenceThreshold: confidenceThreshold[0]
      };

      const result = await transcribeAudio(file, options);
      setTranscriptionResult(result);
      toast.success(t('transcription.success'));
    } catch (error) {
      console.error('Transcription failed:', error);
    }
  };

  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // In a real implementation, this would stop recording and process the audio
      toast.info(t('transcription.recording.stopped'));
    } else {
      setIsRecording(true);
      toast.info(t('transcription.recording.started'));
    }
  };

  const saveAsNote = () => {
    if (transcriptionResult) {
      onCreateNote(transcriptionResult);
      setTranscriptionResult('');
      toast.success(t('transcription.note.saved'));
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Provider Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Card 
              key={provider.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
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
                <div className="flex flex-wrap gap-1 mt-2">
                  {provider.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Enhanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>{t('transcription.settings.title')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{t('transcription.language')}</span>
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
              
              {/* Confidence Threshold */}
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Brain className="h-4 w-4" />
                  <span>Confidence: {confidenceThreshold[0]}</span>
                </Label>
                <Slider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  max={1}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
              </div>
              
              {/* Tone Analysis */}
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <span>{t('transcription.tone')}</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={toneAnalysis} 
                    onCheckedChange={setToneAnalysis} 
                  />
                  <span className="text-sm text-gray-600">
                    {toneAnalysis ? t('common.enabled') : t('common.disabled')}
                  </span>
                </div>
              </div>
              
              {/* Auto Format */}
              <div className="space-y-3">
                <Label className="flex items-center space-x-2">
                  <FileType className="h-4 w-4" />
                  <span>{t('transcription.format')}</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={autoFormat} 
                    onCheckedChange={setAutoFormat} 
                  />
                  <span className="text-sm text-gray-600">
                    {autoFormat ? t('common.enabled') : t('common.disabled')}
                  </span>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            {(selectedProvider === 'assemblyai' || selectedProvider === 'deepgram') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-3">
                  <Label className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Speaker Diarization</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={speakerDiarization} 
                      onCheckedChange={setSpeakerDiarization} 
                    />
                    <span className="text-sm text-gray-600">
                      Detect different speakers
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Custom Vocabulary</Label>
                  <Input
                    placeholder="word1, word2, phrase"
                    value={customVocabulary}
                    onChange={(e) => setCustomVocabulary(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Comma-separated words for better recognition
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload and Recording */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>{t('transcription.upload')}</span>
              </CardTitle>
              <CardDescription>
                Upload MP3, WAV, M4A, FLAC, or other audio formats (max 25MB)
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
                  <p className="text-sm text-gray-400">Supports all major audio formats</p>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <span>{t('transcription.record')}</span>
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

        {/* Processing State */}
        {isTranscribing && (
          <Card>
            <CardContent className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('transcription.processing')}</h3>
              <p className="text-gray-600">
                Processing your audio with {providers.find(p => p.id === selectedProvider)?.name}...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {transcriptionResult && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('transcription.result')}</CardTitle>
                <Button onClick={saveAsNote} className="bg-blue-600 hover:bg-blue-700">
                  {t('transcription.save')}
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

export default EnhancedTranscriptionPanel;
