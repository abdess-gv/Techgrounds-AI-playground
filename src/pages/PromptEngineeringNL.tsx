
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ModulePlayer from "@/components/PromptEngineering/ModulePlayer";
import PromptDatabase from "@/components/PromptEngineering/PromptDatabase";
import FrameworkLibrary from "@/components/PromptEngineering/FrameworkLibrary";
import PromptLegend from "@/components/PromptEngineering/PromptLegend";
import ExerciseEmbedGenerator from "@/components/PromptEngineering/ExerciseEmbedGenerator";
import LanguageSwitch from "@/components/LanguageSwitch";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Globe, ArrowLeft } from "lucide-react";

const PromptEngineeringNL = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title="Prompt Engineering Leerplatform - Nederlands"
        description="Leer de kunst van AI prompt engineering door middel van interactieve oefeningen, uitgebreide modules en praktische frameworks. Word expert in het schrijven van effectieve prompts voor ChatGPT, GPT-4 en andere AI-systemen."
        canonical="https://noteai.com/prompt-engineering/nl"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/prompt-engineering">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  English Version
                </Button>
              </Link>
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                <Globe className="h-3 w-3 mr-1" />
                Nederlandse Versie
              </Badge>
            </div>
            <LanguageSwitch />
          </div>

          {/* Welcome Section */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-blue-900 mb-3">
                🚀 {t('pe.title')}
              </h1>
              <p className="text-blue-800 mb-4">
                Welkom bij het meest uitgebreide Nederlandse leerplatform voor prompt engineering. 
                Leer hoe je effectieve prompts schrijft voor AI-systemen door middel van interactieve 
                oefeningen, praktische voorbeelden en stap-voor-stap begeleiding. Perfect voor zowel 
                beginners als gevorderde gebruikers.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800">🎯 8 Interactieve Oefeningen per Niveau</Badge>
                <Badge className="bg-blue-100 text-blue-800">📚 3 Complete Leermodules</Badge>
                <Badge className="bg-purple-100 text-purple-800">🧠 Praktische Frameworks & Sjablonen</Badge>
                <Badge className="bg-orange-100 text-orange-800">🔗 Insluitbare Oefeningen</Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* Color Legend */}
          <PromptLegend />
          
          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="modules" className="text-sm font-medium">
                📚 {t('pe.modules')}
              </TabsTrigger>
              <TabsTrigger value="database" className="text-sm font-medium">
                🗄️ {t('pe.database')}
              </TabsTrigger>
              <TabsTrigger value="frameworks" className="text-sm font-medium">
                🧠 {t('pe.frameworks')}
              </TabsTrigger>
              <TabsTrigger value="embed" className="text-sm font-medium">
                🔗 {t('pe.embed')}
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

          {/* Dutch-specific Learning Tips */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-green-900 mb-3">🇳🇱 Nederlandse Leer Tips & Voordelen</h3>
              <div className="grid md:grid-cols-2 gap-4 text-green-800">
                <div>
                  <h4 className="font-semibold mb-2">Huidige Functies:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Progressieve leerstructuur met duidelijke modules</li>
                    <li>• Kleurgecodeerde prompt componenten voor begrip</li>
                    <li>• Interactieve oefeningen met directe feedback</li>
                    <li>• Verschillende oefeningstypes (praktisch, analyse, creatief)</li>
                    <li>• Insluitbare oefeningen voor externe platforms</li>
                    <li>• Uitgebreide prompt database met Nederlandse voorbeelden</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Perfect Voor:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Nederlandse AI-enthousiastelingen en professionals</li>
                    <li>• Content creators en marketeers</li>
                    <li>• Ontwikkelaars die werken met AI APIs</li>
                    <li>• Studenten die AI-toepassingen leren</li>
                    <li>• Teams die AI-workflows implementeren</li>
                    <li>• Docenten die AI-concepten onderwijzen</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Integration Info */}
          <Card className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-indigo-900 mb-3">💡 Nederlandse AI Context & Toepassingen</h3>
              <div className="grid md:grid-cols-2 gap-4 text-indigo-800">
                <div>
                  <h4 className="font-semibold mb-2">Nederlandse AI Overwegingen:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Optimaliseer prompts voor Nederlandse content</li>
                    <li>• Gebruik culturele context in je prompts</li>
                    <li>• Test prompts met Nederlandse voorbeelden</li>
                    <li>• Overweeg meertalige prompt strategieën</li>
                    <li>• Begrijp AI-gedrag met Nederlandse tekst</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Toekomstige Uitbreidingen:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Gebruikersvoortgang tracking tussen sessies</li>
                    <li>• Gepersonaliseerde leeraanbevelingen</li>
                    <li>• Nederlandse AI community functies</li>
                    <li>• Geavanceerde analytics en leerinzichten</li>
                    <li>• Certificering en Nederlandse voortgangsbadges</li>
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

export default PromptEngineeringNL;
