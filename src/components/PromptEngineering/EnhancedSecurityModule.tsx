
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Eye, Users, Brain, Target, Award, TrendingUp, BookOpen } from 'lucide-react';
import PrivacyDetectionExercise from './PrivacyDetectionExercise';
import EthicsScenarioPlayer from './EthicsScenarioPlayer';
import SecurityExercisePlayer from './SecurityExercisePlayer';

interface EnhancedSecurityModuleProps {
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  language?: 'en' | 'nl';
}

const EnhancedSecurityModule = ({ 
  compact = false, 
  showHeader = true, 
  showLegend = true,
  language = 'nl'
}: EnhancedSecurityModuleProps) => {
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [activeExerciseType, setActiveExerciseType] = useState<"traditional" | "privacy" | "ethics">("traditional");

  const levelInfo = {
    beginner: {
      title: "Beginner Niveau",
      description: "Leer de basisprincipes van veilig en ethisch AI gebruik",
      color: "bg-green-100 text-green-800",
      exercises: 6
    },
    intermediate: {
      title: "Gemiddeld Niveau", 
      description: "Ontwikkel geavanceerde AI veiligheids- en ethiekvaardigheden",
      color: "bg-yellow-100 text-yellow-800",
      exercises: 8
    },
    advanced: {
      title: "Gevorderd Niveau",
      description: "Beheers complexe AI governance, privacy en ethische vraagstukken",
      color: "bg-red-100 text-red-800",
      exercises: 10
    }
  };

  const exerciseTypes = [
    {
      id: "traditional",
      title: "AI Veiligheid Basis",
      description: "Fundamentele veiligheidsprincipes",
      icon: Shield,
      color: "text-red-600"
    },
    {
      id: "privacy",
      title: "Privacy Detectie",
      description: "Herken en bescherm gevoelige gegevens",
      icon: Eye,
      color: "text-purple-600"
    },
    {
      id: "ethics",
      title: "Ethische Scenario's",
      description: "Navigeer complexe ethische situaties",
      icon: Users,
      color: "text-blue-600"
    }
  ];

  const securityPrinciples = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Bescherm altijd persoonlijke en gevoelige informatie bij AI gebruik",
      level: "kritiek",
      tips: ["Gebruik placeholders", "Controleer data minimalisatie", "Vraag toestemming"]
    },
    {
      icon: Eye,
      title: "Transparantie & Verificatie", 
      description: "Wees open over AI gebruik en controleer altijd de output",
      level: "belangrijk",
      tips: ["Vermeld AI hulp", "Dubbelcheck feiten", "Gebruik bronvermelding"]
    },
    {
      icon: Users,
      title: "Ethische Overwegingen",
      description: "Denk na over impact op verschillende stakeholders",
      level: "ethisch",
      tips: ["Overweeg alle betrokkenen", "Voorkom discriminatie", "Respecteer autonomie"]
    },
    {
      icon: Brain,
      title: "Verantwoord Beslissen",
      description: "Maak weloverwogen keuzes over wanneer en hoe AI te gebruiken",
      level: "strategisch",
      tips: ["Evalueer alternatieven", "Documenteer overwegingen", "Plan voor risico's"]
    }
  ];

  const levelColors = {
    kritiek: "bg-red-100 text-red-800 border-red-200",
    belangrijk: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    ethisch: "bg-blue-100 text-blue-800 border-blue-200",
    strategisch: "bg-purple-100 text-purple-800 border-purple-200"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {showHeader && (
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            AI Veiligheid & Ethische Overwegingen
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Leer hoe je AI-tools veilig, verantwoord en ethisch kunt gebruiken. Van privacybescherming tot complexe ethische besluitvorming.
          </p>
        </div>
      )}

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className={`grid w-full ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
          <TabsTrigger value="exercises">Oefeningen</TabsTrigger>
          <TabsTrigger value="principles">Principes</TabsTrigger>
          {!compact && <TabsTrigger value="scenarios">Scenario's</TabsTrigger>}
          {!compact && <TabsTrigger value="progress">Voortgang</TabsTrigger>}
        </TabsList>

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Interactieve AI Veiligheid & Ethiek Oefeningen</span>
              </CardTitle>
              <CardDescription>
                Kies je niveau en type oefening om praktijkervaring op te doen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Level Selection */}
              <div>
                <h4 className="font-semibold mb-3">Kies je niveau:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(levelInfo).map(([level, info]) => (
                    <Card 
                      key={level}
                      className={`cursor-pointer transition-all ${
                        selectedLevel === level 
                          ? 'border-red-500 bg-red-50' 
                          : 'hover:border-red-300'
                      }`}
                      onClick={() => setSelectedLevel(level as "beginner" | "intermediate" | "advanced")}
                    >
                      <CardContent className="p-4 text-center">
                        <Badge className={`${info.color} mb-2`}>
                          {info.title}
                        </Badge>
                        <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                          <BookOpen className="h-3 w-3" />
                          <span>{info.exercises} oefeningen</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Exercise Type Selection */}
              <div>
                <h4 className="font-semibold mb-3">Kies oefening type:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {exerciseTypes.map((type) => (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        activeExerciseType === type.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'hover:border-blue-300'
                      }`}
                      onClick={() => setActiveExerciseType(type.id as "traditional" | "privacy" | "ethics")}
                    >
                      <CardContent className="p-4 text-center">
                        <type.icon className={`h-8 w-8 ${type.color} mx-auto mb-2`} />
                        <h5 className="font-semibold mb-1">{type.title}</h5>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Exercise Content */}
              <div className="border-t pt-6">
                {activeExerciseType === "traditional" && (
                  <SecurityExercisePlayer level={selectedLevel} language={language} />
                )}
                {activeExerciseType === "privacy" && (
                  <PrivacyDetectionExercise level={selectedLevel} />
                )}
                {activeExerciseType === "ethics" && (
                  <EthicsScenarioPlayer level={selectedLevel} />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {securityPrinciples.map((principle, index) => (
              <Card key={index} className={`border-2 ${levelColors[principle.level]}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <principle.icon className="h-8 w-8 text-current" />
                    <div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {principle.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{principle.description}</p>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Praktische Tips:</h5>
                    <ul className="space-y-1">
                      {principle.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-current rounded-full" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {!compact && (
          <>
            <TabsContent value="scenarios" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Realistische AI Scenario's</CardTitle>
                  <CardDescription>
                    Oefen met echte situaties die je in je werk kunt tegenkomen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EthicsScenarioPlayer level={selectedLevel} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      <span>Voltooide Oefeningen</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">12/24</div>
                    <p className="text-sm text-gray-600">50% voltooid</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Gemiddelde Score</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                    <p className="text-sm text-gray-600">Uitstekend niveau</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      <span>Sterke Punten</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Privacy Bescherming</span>
                        <span className="font-semibold text-green-600">95%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ethische Overwegingen</span>
                        <span className="font-semibold text-green-600">90%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bias Herkenning</span>
                        <span className="font-semibold text-yellow-600">75%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Legend */}
      {showLegend && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span>Veiligheid</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-purple-600" />
                <span>Privacy</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-600" />
                <span>Ethiek</span>
              </div>
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-green-600" />
                <span>Verantwoordelijkheid</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedSecurityModule;
