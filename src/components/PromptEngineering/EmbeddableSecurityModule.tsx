
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Shield, AlertTriangle, Lock } from 'lucide-react';
import { evaluateExercise } from './utils/exerciseEvaluator';
import { securityExercisesByLevel } from './data/securityExercisesNL';
import { Exercise } from './types/Exercise';

type Level = 'beginner' | 'intermediate' | 'advanced';

interface EmbeddableSecurityModuleProps {
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  language?: 'en' | 'nl';
  level?: Level;
}


const EmbeddableSecurityModule = ({ 
  compact = false, 
  showHeader = true, 
  showLegend = true,
  language = 'nl',
  level = 'beginner'
}: EmbeddableSecurityModuleProps) => {
  const exercises = securityExercisesByLevel[level] || securityExercisesByLevel.beginner;
  const [selectedExercise, setSelectedExercise] = useState<Exercise>(exercises[0]);
  const [userResponse, setUserResponse] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const evaluateResponse = async () => {
    if (!userResponse.trim()) return;
    
    try {
      const result = await evaluateExercise(selectedExercise, userResponse);
      setEvaluation(result);
      setIsEvaluated(true);
    } catch (error) {
      console.error('Evaluation error:', error);
      // Fallback evaluation
      setEvaluation({
        score: 0,
        feedback: 'Er is een fout opgetreden bij het evalueren. Probeer het opnieuw.',
        criteriaResults: [],
        suggestions: ['Probeer je antwoord opnieuw in te dienen.']
      });
      setIsEvaluated(true);
    }
  };

  const resetExercise = () => {
    setUserResponse("");
    setEvaluation(null);
    setIsEvaluated(false);
    setShowGuidelines(false);
  };

  const score = evaluation?.score || 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <Shield className="h-4 w-4" />;
      case 'intermediate': return <AlertTriangle className="h-4 w-4" />;
      case 'advanced': return <Lock className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className={`space-y-4 ${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto`}>
      {showHeader && (
        <Card className="border-2 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2 text-red-900">
                  <Shield className="h-6 w-6" />
                  <span>AI Veiligheid Training</span>
                </CardTitle>
                <p className="text-red-700 mt-2">Leer veilig en verantwoord omgaan met AI-systemen</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Exercise Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kies een Veiligheidsoefening</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedExercise.id === exercise.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{exercise.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {getDifficultyIcon(exercise.difficulty)}
                      <span className="ml-1">
                        {exercise.difficulty === 'beginner' ? 'Beginner' : 
                         exercise.difficulty === 'intermediate' ? 'Gemiddeld' : 'Gevorderd'}
                      </span>
                    </Badge>
                    <Badge variant="outline">{exercise.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className={`grid ${compact ? 'gap-4' : 'lg:grid-cols-2 gap-6'}`}>
        {/* Scenario & Response */}
        <Card className="border border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">🎯 Scenario & Jouw Antwoord</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Scenario:</h4>
              <p className="text-blue-800">{selectedExercise.prompt}</p>
            </div>
            
            <Textarea
              placeholder="Beschrijf hoe je veilig en verantwoord zou handelen in dit scenario..."
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              className={`font-mono text-sm border-2 border-gray-200 focus:border-blue-400 ${
                compact ? 'min-h-[150px]' : 'min-h-[200px]'
              }`}
            />
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex space-x-2">
              <Button 
                onClick={evaluateResponse} 
                disabled={!userResponse.trim()}
                className="bg-blue-600 hover:bg-blue-700"
                size={compact ? "sm" : "default"}
              >
                Evalueren
              </Button>
                <Button 
                  variant="outline" 
                  onClick={resetExercise}
                  size={compact ? "sm" : "default"}
                >
                  Reset
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowGuidelines(!showGuidelines)}
                className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                size={compact ? "sm" : "default"}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {showGuidelines ? 'Verberg' : 'Toon'} Richtlijnen
              </Button>
            </div>

            {showGuidelines && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="p-4 space-y-3">
                  {selectedExercise.hints && (
                    <div>
                      <h4 className="font-semibold text-yellow-900 text-sm mb-2">💡 Hints:</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {selectedExercise.hints.map((hint, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span>•</span>
                            <span>{hint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedExercise.tips && (
                    <div>
                      <h4 className="font-semibold text-yellow-900 text-sm mb-2">📝 Tips:</h4>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        {selectedExercise.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span>•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Evaluation & Best Practices */}
        <Card className="border border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-900">📊 Evaluatie & Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {isEvaluated && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${
                  score >= 80 ? 'text-green-600' : 
                  score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {Math.round(score)}%
                </div>
                <div className="text-sm text-gray-600">
                  {evaluation?.feedback || 'Evaluatie voltooid'}
                </div>
                <Progress value={score} className="h-2 mt-2" />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Evaluatiecriteria:</h4>
              {(selectedExercise.criteria || []).map((criterion, index) => {
                const criteriaResult = evaluation?.criteriaResults?.[index];
                const isComplete = criteriaResult?.met || false;
                
                return (
                  <div key={index} className="flex items-start space-x-2 p-2 rounded border text-sm">
                    {isEvaluated ? (
                      isComplete ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      )
                    ) : (
                      <div className="w-4 h-4 border border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                    )}
                    <span className={
                      isEvaluated 
                        ? isComplete 
                          ? 'text-green-800 font-medium' 
                          : 'text-red-800'
                        : 'text-gray-700'
                    }>
                      {criterion}
                    </span>
                  </div>
                );
              })}
              
              {evaluation?.suggestions && evaluation.suggestions.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded border">
                  <h5 className="font-semibold text-blue-900 text-sm mb-2">💡 Suggesties:</h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {evaluation.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span>•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedExercise.examples && (
              <div className="bg-green-50 p-3 rounded border">
                <h4 className="font-semibold mb-2 text-sm text-green-900">✨ Voorbeelden:</h4>
                <div className="space-y-2 text-sm">
                  {selectedExercise.examples.good && (
                    <div>
                      <span className="font-medium text-green-700">✅ Goed: </span>
                      <span className="text-green-800">{selectedExercise.examples.good}</span>
                    </div>
                  )}
                  {selectedExercise.examples.bad && (
                    <div>
                      <span className="font-medium text-red-700">❌ Slecht: </span>
                      <span className="text-red-800">{selectedExercise.examples.bad}</span>
                    </div>
                  )}
                  {selectedExercise.examples.explanation && (
                    <div className="mt-2 text-gray-700 italic">
                      {selectedExercise.examples.explanation}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmbeddableSecurityModule;
