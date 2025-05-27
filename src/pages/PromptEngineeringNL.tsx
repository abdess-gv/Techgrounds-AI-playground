
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Database, Code, Play, Users, Globe, ChevronRight } from 'lucide-react';
import LearningPath from '@/components/PromptEngineering/LearningPath';
import EnhancedPromptDatabase from '@/components/PromptEngineering/EnhancedPromptDatabase';
import FrameworkLibrary from '@/components/PromptEngineering/FrameworkLibrary';
import DutchExerciseEmbedGenerator from '@/components/PromptEngineering/DutchExerciseEmbedGenerator';
import ComprehensiveExercisePlayer from '@/components/PromptEngineering/ComprehensiveExercisePlayer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const PromptEngineeringNL = () => {
  const [activeTab, setActiveTab] = useState('modules');

  return (
    <>
      <SEO 
        title="Nederlandse Prompt Engineering Leerplatform"
        description="Leer prompt engineering in het Nederlands met interactieve oefeningen, frameworks en een uitgebreide prompt database. Voor beginners tot gevorderden."
        keywords="prompt engineering, Nederlands, AI prompts, machine learning, ChatGPT, leren, oefeningen"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Globe className="h-8 w-8 text-white" />
                <Badge className="bg-orange-500 text-white px-3 py-1">Nederlandse Versie</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Nederlandse Prompt Engineering
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Leerplatform
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Beheers de kunst van prompt engineering met onze uitgebreide Nederlandse cursus. 
                Van basis concepten tot geavanceerde technieken - alles in je eigen taal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                  <Play className="h-5 w-5 mr-2" />
                  Start Leren
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Users className="h-5 w-5 mr-2" />
                  Bekijk Oefeningen
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/prompt-engineering" className="text-sm text-gray-600 hover:text-purple-600 transition-colors">
                  🇺🇸 English Version
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-sm font-medium text-purple-600">🇳🇱 Nederlandse Versie</span>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Gratis Toegang
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  Interactief Leren
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm border p-2">
              <TabsList className="grid w-full grid-cols-5 h-12">
                <TabsTrigger value="modules" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Leermodules</span>
                  <span className="sm:hidden">Modules</span>
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Oefeningen</span>
                  <span className="sm:hidden">Oefenen</span>
                </TabsTrigger>
                <TabsTrigger value="database" className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span className="hidden sm:inline">Prompt Database</span>
                  <span className="sm:hidden">Database</span>
                </TabsTrigger>
                <TabsTrigger value="frameworks" className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span className="hidden sm:inline">Frameworks</span>
                  <span className="sm:hidden">Frames</span>
                </TabsTrigger>
                <TabsTrigger value="embed" className="flex items-center space-x-2">
                  <Code className="h-4 w-4" />
                  <span className="hidden sm:inline">Insluiten</span>
                  <span className="sm:hidden">Embed</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="modules" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nederlandse Leermodules
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Volg onze gestructureerde leerpad om prompt engineering te beheersen. 
                  Elke module bouwt voort op de vorige en bevat praktische oefeningen.
                </p>
              </div>
              <LearningPath />
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interactieve Nederlandse Oefeningen
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Oefen je prompt engineering vaardigheden met onze interactieve oefeningen. 
                  Krijg directe feedback en verbeter je technieken stap voor stap.
                </p>
              </div>
              <ComprehensiveExercisePlayer />
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
                  Nederlandse Prompt Frameworks
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Leer bewezen frameworks en methodologieën voor effectieve prompt constructie. 
                  Van STAR tot RACE - alle technieken uitgelegd in het Nederlands.
                </p>
              </div>
              <FrameworkLibrary />
            </TabsContent>

            <TabsContent value="embed" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Nederlandse Embed Generator
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Sluit onze Nederlandse prompt engineering oefeningen en database in op je eigen website. 
                  Volledig aanpasbaar en eenvoudig te implementeren.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <Link to="/exercise-embed-nl">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>Bekijk Oefening Embed</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/database-embed?lang=nl">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <span>Bekijk Database Embed</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <DutchExerciseEmbedGenerator />
            </TabsContent>
          </Tabs>
        </div>

        {/* Stats Section */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-gray-600">Nederlandse Oefeningen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-gray-600">Professionele Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
                <div className="text-gray-600">Bewezen Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
                <div className="text-gray-600">Moeilijkheidsniveaus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptEngineeringNL;
