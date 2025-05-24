
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Mic, Brain, FileText } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200">
              <Mic className="h-5 w-5 text-blue-600" />
              <Brain className="h-5 w-5 text-purple-600" />
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered Note Taking
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              With Smart Transcription
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your thoughts into organized, searchable notes. Record audio, transcribe with AI, 
            and chat with your knowledge base using cutting-edge language models.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                Start Taking Notes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mic className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Provider Transcription</h3>
              <p className="text-gray-600">OpenAI Whisper, Deepgram & AssemblyAI</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Chat Integration</h3>
              <p className="text-gray-600">ChatGPT, Grok & Gemini support</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Organization</h3>
              <p className="text-gray-600">Folders, tags & powerful search</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
