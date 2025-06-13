
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Users, AlertTriangle, BookOpen } from 'lucide-react';
import PrivacyDetectionExercise from './PrivacyDetectionExercise';
import EthicsScenarioPlayer from './EthicsScenarioPlayer';

interface EnhancedSecurityModuleProps {
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  language?: 'en' | 'nl';
}

type ExerciseType = 'privacy' | 'ethics' | 'overview';
type Level = 'beginner' | 'intermediate' | 'advanced';

const EnhancedSecurityModule = ({ 
  compact = false, 
  showHeader = true, 
  showLegend = true,
  language = 'nl'
}: EnhancedSecurityModuleProps) => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>('overview');
  const [selectedLevel, setSelectedLevel] = useState<Level>('beginner');

  const exercises = [
    {
      type: 'privacy' as ExerciseType,
      title: 'Privacy Detectie',
      description: 'Herken en verwijder persoonsgegevens uit prompts',
      icon: <Eye className="h-6 w-6" />,
      color: 'bg-red-100 text-red-800 border-red-300',
      levels: 3
    },
    {
      type: 'ethics' as ExerciseType,
      title: 'Ethische Scenario\'s',
      description: 'Navigeer door complexe ethische AI situaties',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      levels: 3
    }
  ];

  const levelLabels = {
    beginner: 'Beginner',
    intermediate: 'Gemiddeld',
    advanced: 'Gevorderd'
  };

  if (selectedExercise === 'privacy') {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-red-600" />
                <span>Privacy Detectie Training</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setSelectedExercise('overview')}
                size="sm"
              >
                ← Terug naar overzicht
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <PrivacyDetectionExercise
          level={selectedLevel}
          compact={compact}
          showHeader={false}
          showLegend={showLegend}
          language={language}
        />
      </div>
    );
  }

  if (selectedExercise === 'ethics') {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Ethische Scenario Training</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setSelectedExercise('overview')}
                size="sm"
              >
                ← Terug naar overzicht
              </Button>
            </div>
          </CardHeader>
        </Card>
        
        <EthicsScenarioPlayer
          level={selectedLevel}
          compact={compact}
          showHeader={false}
          showLegend={showLegend}
          language={language}
        />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${compact ? 'max-w-5xl' : 'max-w-7xl'} mx-auto`}>
      {showHeader && (
        <Card className="border-2 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2 text-red-900">
                  <Shield className="h-6 w-6" />
                  <span>AI Veiligheid & Ethische Overwegingen</span>
                </CardTitle>
                <p className="text-red-700 mt-2">Leer veilig en verantwoord omgaan met AI-systemen</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Level Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kies je Niveau</CardTitle>
          <p className="text-gray-600">Selecteer het niveau dat bij jouw ervaring past</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(levelLabels) as Level[]).map((level) => (
              <Card
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`cursor-pointer transition-all ${
                  selectedLevel === level 
                    ? 'border-red-500 bg-red-50 shadow-md' 
                    : 'border-gray-200 hover:border-red-300 hover:shadow-sm'
                }`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl mb-2 ${
                    level === 'beginner' ? '🌱' :
                    level === 'intermediate' ? '🌿' : '🌳'
                  }`}>
                    {level === 'beginner' ? '🌱' :
                     level === 'intermediate' ? '🌿' : '🌳'}
                  </div>
                  <h3 className="font-semibold">{levelLabels[level]}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {level === 'beginner' && 'Basis concepten en eenvoudige oefeningen'}
                    {level === 'intermediate' && 'Praktijkscenario\'s en toepassingen'}
                    {level === 'advanced' && 'Complexe situaties en expertkennis'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exercise Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        {exercises.map((exercise) => (
          <Card 
            key={exercise.type}
            className={`hover:shadow-lg transition-all duration-200 border-2 ${exercise.color}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white">
                    {exercise.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{exercise.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Exercise Details */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {exercise.levels} Levels
                  </span>
                  <Badge variant="outline" className="text-xs">
                    Interactief
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Huidige level: {levelLabels[selectedLevel]}</div>
                  {exercise.type === 'privacy' && selectedLevel === 'beginner' && (
                    <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                      💡 Inclusief afkortingen legenda voor beginners
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => setSelectedExercise(exercise.type)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Start {exercise.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Getting Started Guide */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-blue-900 mb-3">🚀 Aan de Slag</h3>
          <div className="space-y-2 text-blue-800">
            <p>• <strong>Privacy Detectie:</strong> Leer persoonsgegevens herkennen en anonimiseren</p>
            <p>• <strong>Ethische Scenario's:</strong> Oefen met complexe ethische AI-beslissingen</p>
            <p>• Voor beginners: Extra hulp met afkortingen en uitgebreide uitleg</p>
            <p>• Interactieve oefeningen met directe feedback en scores</p>
          </div>
        </CardContent>
      </Card>

      {/* Branding footer for embeddable version */}
      {compact && (
        <div className="text-center text-xs text-gray-500 border-t pt-2">
          <span>Aangedreven door Techgrounds AI-Playground - Nederlands AI Veiligheid Platform</span>
        </div>
      )}
    </div>
  );
};

export default EnhancedSecurityModule;
