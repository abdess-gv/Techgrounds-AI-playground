
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Globe, ArrowRight } from "lucide-react";
import ModulePlayer from "@/components/PromptEngineering/ModulePlayer";
import PromptDatabase from "@/components/PromptEngineering/PromptDatabase";
import FrameworkLibrary from "@/components/PromptEngineering/FrameworkLibrary";
import PromptLegend from "@/components/PromptEngineering/PromptLegend";
import ExerciseEmbedGenerator from "@/components/PromptEngineering/ExerciseEmbedGenerator";
import LanguageSwitch from "@/components/LanguageSwitch";
import SEO from "@/components/SEO";

const PromptEngineering = () => {
  return (
    <>
      <SEO 
        title="Prompt Engineering Learning Platform"
        description="Master AI prompt engineering with interactive exercises, comprehensive modules, and practical frameworks. Learn to write effective prompts for ChatGPT, GPT-4, and other AI systems."
        canonical="https://noteai.com/prompt-engineering"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Language Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                <Globe className="h-3 w-3 mr-1" />
                English Version
              </Badge>
              <Link to="/prompt-engineering/nl">
                <Button variant="outline" size="sm">
                  Nederlandse Versie
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <LanguageSwitch />
          </div>
          
          {/* Welcome Section */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-blue-900 mb-3">
                🚀 Prompt Engineering Learning Platform
              </h1>
              <p className="text-blue-800 mb-4">
                Master the art of AI prompt engineering through interactive exercises, comprehensive learning modules, 
                and practical frameworks. Learn to write effective prompts for ChatGPT, GPT-4, Claude, and other AI systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800">🎯 8 Interactive Exercises per Level</Badge>
                <Badge className="bg-blue-100 text-blue-800">📚 3 Complete Learning Modules</Badge>
                <Badge className="bg-purple-100 text-purple-800">🧠 Practical Frameworks & Templates</Badge>
                <Badge className="bg-orange-100 text-orange-800">🔗 Embeddable Exercises</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Color Legend */}
          <PromptLegend />
          
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="modules" className="text-sm font-medium">
                📚 Learning Modules
              </TabsTrigger>
              <TabsTrigger value="database" className="text-sm font-medium">
                🗄️ Prompt Database
              </TabsTrigger>
              <TabsTrigger value="frameworks" className="text-sm font-medium">
                🧠 Frameworks
              </TabsTrigger>
              <TabsTrigger value="embed" className="text-sm font-medium">
                🔗 Embed Exercises
              </TabsTrigger>
            </TabsList>

            <TabsContent value="modules">
              <ModulePlayer />
            </TabsContent>

            <TabsContent value="database">
              <PromptDatabase />
            </TabsContent>

            <TabsContent value="frameworks">
              <FrameworkLibrary />
            </TabsContent>

            <TabsContent value="embed">
              <ExerciseEmbedGenerator />
            </TabsContent>
          </Tabs>

          {/* Optimization Tips */}
          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-indigo-900 mb-3">💡 Platform Features & Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4 text-indigo-800">
                <div>
                  <h4 className="font-semibold mb-2">Current Features:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Progressive learning with structured modules</li>
                    <li>• Color-coded prompt components for clarity</li>
                    <li>• Interactive exercises with instant feedback</li>
                    <li>• Multiple exercise types (hands-on, analysis, creative)</li>
                    <li>• Embeddable exercises for external platforms</li>
                    <li>• Comprehensive prompt database with examples</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Perfect For:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• AI enthusiasts and professionals</li>
                    <li>• Content creators and marketers</li>
                    <li>• Developers working with AI APIs</li>
                    <li>• Students learning AI applications</li>
                    <li>• Teams implementing AI workflows</li>
                    <li>• Educators teaching AI concepts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PromptEngineering;
