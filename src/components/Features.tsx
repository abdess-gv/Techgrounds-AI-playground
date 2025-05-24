
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, Brain, Search, FolderOpen, Tags, Settings, 
  Upload, Languages, Zap, MessageSquare, FileText, Lock 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Multi-Provider Transcription",
      description: "Choose between OpenAI Whisper, Deepgram, and AssemblyAI for the best transcription quality.",
      badges: ["AI-Powered", "Multi-Language"]
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Knowledge Chat",
      description: "Converse with your notes using ChatGPT, Grok, or Gemini. Ask questions and get insights from your knowledge base.",
      badges: ["GPT-4", "Gemini", "Grok"]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Advanced Markdown Editor",
      description: "Rich text editing with syntax highlighting, live preview, and seamless markdown support.",
      badges: ["Syntax Highlighting", "Live Preview"]
    },
    {
      icon: <FolderOpen className="h-6 w-6" />,
      title: "Smart Organization",
      description: "Organize notes with folders, tags, and smart categorization. Never lose a thought again.",
      badges: ["Folders", "Tags", "Categories"]
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Powerful Search",
      description: "Find any note instantly with full-text search, tag filtering, and AI-powered semantic search.",
      badges: ["Full-Text", "Semantic Search"]
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Audio Upload & Processing",
      description: "Upload audio files in multiple formats for automatic transcription and note generation.",
      badges: ["Multiple Formats", "Auto-Processing"]
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Transcribe and work with notes in multiple languages with customizable language detection.",
      badges: ["100+ Languages", "Auto-Detect"]
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Customizable Transcription",
      description: "Fine-tune transcription settings including tone analysis, formatting options, and output styles.",
      badges: ["Tone Analysis", "Custom Formatting"]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your notes are encrypted and stored securely. Complete privacy with enterprise-grade security.",
      badges: ["Encrypted", "Private", "Secure"]
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Smart Note-Taking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to enhance your productivity and transform how you capture, organize, and interact with information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-blue-100 rounded-lg p-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
