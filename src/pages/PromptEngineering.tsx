
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

const PromptEngineering = () => {
  return (
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
            <h3 className="font-bold text-indigo-900 mb-3">💡 Platform Optimization Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-indigo-800">
              <div>
                <h4 className="font-semibold mb-2">For Better User Experience:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Progressive learning with clear module structure</li>
                  <li>• Color-coded prompt components for easy understanding</li>
                  <li>• Interactive exercises with immediate feedback</li>
                  <li>• Multiple learning formats (hands-on, analysis, creative)</li>
                  <li>• Embeddable exercises for external integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Consider Supabase Integration For:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• User progress tracking across sessions</li>
                  <li>• Personalized learning recommendations</li>
                  <li>• Community features and shared prompts</li>
                  <li>• Advanced analytics and learning insights</li>
                  <li>• Exercise completion tracking</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptEngineering;
