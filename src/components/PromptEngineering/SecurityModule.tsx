
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, AlertTriangle, Lightbulb, Users, Lock, Eye } from 'lucide-react';
import InteractiveExercise from './InteractiveExercise';
import { securityExercises } from './data/securityExercises';
import { useLanguage } from '@/contexts/LanguageContext';

const SecurityModule = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { t } = useLanguage();

  const safetyPrinciples = [
    {
      icon: Lock,
      title: "Privacy Beschermen",
      description: "Deel nooit persoonlijke of gevoelige informatie met AI-systemen",
      level: "kritiek"
    },
    {
      icon: Eye,
      title: "Verificatie van Output", 
      description: "Controleer altijd de output van AI voordat je het gebruikt",
      level: "belangrijk"
    },
    {
      icon: Users,
      title: "Transparantie",
      description: "Wees eerlijk over het gebruik van AI in je werk",
      level: "ethisch"
    }
  ];

  const levelColors = {
    kritiek: "bg-red-100 text-red-800 border-red-200",
    belangrijk: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    ethisch: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Veilig AI Gebruik</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Leer hoe je AI-tools veilig en verantwoord kunt gebruiken door praktische oefeningen en principes.
        </p>
      </div>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercises">Oefeningen</TabsTrigger>
          <TabsTrigger value="principles">Principes</TabsTrigger>
          <TabsTrigger value="tips">Snelle Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>AI Veiligheid Oefeningen</span>
              </CardTitle>
              <CardDescription>
                Oefen met echte scenario's om veilig AI gebruik te leren
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                {securityExercises.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentExerciseIndex ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentExerciseIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <InteractiveExercise
                exercise={securityExercises[currentExerciseIndex]}
              />
              
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentExerciseIndex > 0) {
                      setCurrentExerciseIndex(currentExerciseIndex - 1);
                    }
                  }}
                  disabled={currentExerciseIndex === 0}
                >
                  Vorige
                </Button>
                <Button
                  onClick={() => {
                    if (currentExerciseIndex < securityExercises.length - 1) {
                      setCurrentExerciseIndex(currentExerciseIndex + 1);
                    }
                  }}
                  disabled={currentExerciseIndex === securityExercises.length - 1}
                >
                  Volgende
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {safetyPrinciples.map((principle, index) => (
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
                  <p className="text-sm text-gray-700">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Wel Doen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Gebruik placeholders voor gevoelige data</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Vraag om bronnen bij feiten</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Wees transparant over AI-gebruik</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Niet Doen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span className="text-sm">Persoonlijke gegevens delen</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span className="text-sm">Blind vertrouwen op AI-output</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span className="text-sm">AI-gebruik verzwijgen</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityModule;
