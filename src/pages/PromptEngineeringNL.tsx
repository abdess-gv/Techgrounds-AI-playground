import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Database, Code, Play, Users, ChevronRight, Shield, Brain, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearningPath from '@/components/PromptEngineering/LearningPath';
import EnhancedPromptDatabase from '@/components/PromptEngineering/EnhancedPromptDatabase';
import FrameworkLibrary from '@/components/PromptEngineering/FrameworkLibrary';
import DutchExerciseEmbedGenerator from '@/components/PromptEngineering/DutchExerciseEmbedGenerator';
import ComprehensiveExercisePlayer from '@/components/PromptEngineering/ComprehensiveExercisePlayer';
import SecurityModule from '@/components/PromptEngineering/SecurityModule';
import AdminPromptManager from '@/components/PromptEngineering/AdminPromptManager';
import SEO from '@/components/SEO';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';

const PromptEngineeringNL = () => {
  const [activeTab, setActiveTab] = useState('modules');
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">('beginner');

  const handleLevelChange = (level: "beginner" | "intermediate" | "advanced") => {
    setSelectedLevel(level);
  };

  return (
    <>
      <SEO 
        title="AI Leren - Nederlands AI en Prompt Engineering Platform"
        description="Leer AI gebruiken en prompt engineering in het Nederlands met interactieve oefeningen, frameworks en een uitgebreide prompt database. Voor beginners tot gevorderden."
        keywords="AI leren, prompt engineering, Nederlands, kunstmatige intelligentie, ChatGPT, Gemini, Claude, AI training"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-100">
                  <Brain className="h-8 w-8" />
                  <span className="text-xl font-bold">AI Leren</span>
                </Link>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Leer AI Gebruiken in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Het Nederlands
                </span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
                Beheers prompt engineering en leer AI-tools veilig en effectief te gebruiken. 
                Van basis concepten tot geavanceerde technieken - alles gratis toegankelijk.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  onClick={() => setActiveTab('modules')}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Leren
                </Button>
                <Link to="/ai-veiligheid-embed-nl" target="_blank">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                    <Shield className="h-5 w-5 mr-2" />
                    AI Veiligheid
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation />

        {/* Navigation Bar */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-16">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  100% Gratis
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Geen Registratie
                </Badge>
                <Badge variant="outline" className="text-purple-600 border-purple-600">
                  Nederlandse Interface
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
              <TabsTrigger value="safety">Veiligheid</TabsTrigger>
              <TabsTrigger value="embed">Embed</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  AI Leermodules
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Volg onze gestructureerde leerpad om AI en prompt engineering te beheersen. 
                  Elke module bouwt voort op de vorige en bevat praktische oefeningen.
                </p>
              </div>
              <LearningPath 
                selectedLevel={selectedLevel}
                onLevelChange={handleLevelChange}
              />
            </TabsContent>

            <TabsContent value="database" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nederlandse Prompt Database
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Ontdek onze uitgebreide collectie van professionele prompts in het Nederlands. 
                  Vind inspiratie en leer van bewezen technieken uit verschillende vakgebieden.
                </p>
              </div>
              <EnhancedPromptDatabase />
            </TabsContent>

            <TabsContent value="frameworks" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  AI Prompt Frameworks
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Leer bewezen frameworks en methodologieën voor effectieve prompt constructie. 
                  Van STAR tot RACE - alle technieken uitgelegd in het Nederlands.
                </p>
              </div>
              <FrameworkLibrary />
            </TabsContent>

            <TabsContent value="safety">
              <SecurityModule />
            </TabsContent>

            <TabsContent value="embed" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nederlands Embed Generator
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Sluit onze Nederlandse AI leer content in op je eigen website. 
                  Volledig aanpasbaar en eenvoudig te implementeren.
                </p>
                <div className="flex justify-center space-x-4 mt-6 flex-wrap gap-2">
                  <a href="/oefening-embed-nl" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>Bekijk Oefening Embed</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="/database-embed-nl" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>Bekijk Database Embed</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="/framework-embed-nl" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>Bekijk Framework Embed</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="/ai-veiligheid-embed-nl" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>Bekijk Veiligheid Embed</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
              <DutchExerciseEmbedGenerator />
            </TabsContent>

            <TabsContent value="admin">
              <AdminPromptManager />
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">Nederlandse AI Oefeningen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-600">Professionele Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-gray-600">Bewezen Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-gray-600">Gratis Toegang</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptEngineeringNL;
