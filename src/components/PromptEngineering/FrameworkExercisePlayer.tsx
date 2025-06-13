
import {useState, useEffect} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Target, BookOpen, Lightbulb, Award, ArrowLeft } from 'lucide-react';
import { FrameworkExercise } from './data/frameworkExercisesNL';

interface FrameworkExercisePlayerProps {
  exercise: FrameworkExercise;
  onBack?: () => void;
  compact?: boolean;
  showHeader?: boolean;
}

const FrameworkExercisePlayer = ({ 
  exercise, 
  onBack, 
  compact = false, 
  showHeader = true 
}: FrameworkExercisePlayerProps) => {
  const [userSolution, setUserSolution] = useState('');
  const [evaluation, setEvaluation] = useState<{[key: string]: boolean} | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [isEvaluated, setIsEvaluated] = useState(false);

  const evaluateFrameworkCompliance = (solution: string) => {
    const lowerSolution = solution.toLowerCase();
    const results: {[key: string]: boolean} = {};
    
    exercise.framework.components.forEach(component => {
      const hasComponent = 
        lowerSolution.includes(component.letter.toLowerCase() + ':') ||
        lowerSolution.includes(component.name.toLowerCase()) ||
        component.examples.some(example => 
          lowerSolution.includes(example.toLowerCase().substring(0, 10))
        );
      results[component.name] = hasComponent;
    });
    
    return results;
  };

  const calculateScore = (evaluationResults: {[key: string]: boolean}) => {
    let totalScore = 0;
    
    Object.entries(evaluationResults).forEach(([component, found]) => {
      if (found) {
        const weight = exercise.evaluationWeights[component] || 25;
        totalScore += weight;
      }
    });
    
    return Math.min(totalScore, 100);
  };

  const handleEvaluate = () => {
    if (!userSolution.trim()) return;
    
    const results = evaluateFrameworkCompliance(userSolution);
    const score = calculateScore(results);
    
    setEvaluation(results);
    setOverallScore(score);
    setIsEvaluated(true);
  };

  const handleReset = () => {
    setUserSolution('');
    setEvaluation(null);
    setOverallScore(0);
    setIsEvaluated(false);
    setShowHints(false);
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300'
  };

  const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Gemiddeld',
    advanced: 'Gevorderd'
  };

  return (
    <div className={`space-y-6 ${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto`}>
      {showHeader && (
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6 text-purple-600" />
                <div>
                  <CardTitle className="text-purple-900">{exercise.framework.name} Oefening</CardTitle>
                  <p className="text-purple-700 text-sm mt-1">{exercise.framework.description}</p>
                </div>
              </div>
              {onBack && (
                <Button variant="outline" onClick={onBack} size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Terug
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Framework Explanation */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <BookOpen className="h-5 w-5" />
            <span>{exercise.framework.acronym} Framework Uitleg</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exercise.framework.components.map((component, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {component.letter}
                  </div>
                  <h4 className="font-semibold text-blue-900">{component.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-700">Voorbeelden:</p>
                  {component.examples.slice(0, 2).map((example, idx) => (
                    <p key={idx} className="text-xs text-gray-500 italic">• {example}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exercise */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-green-50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-900">{exercise.title}</CardTitle>
            <div className="flex space-x-2">
              <Badge className={difficultyColors[exercise.difficulty]}>
                {difficultyLabels[exercise.difficulty]}
              </Badge>
              <Badge variant="outline">{exercise.category}</Badge>
            </div>
          </div>
          <p className="text-green-700">{exercise.description}</p>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">📝 Opdracht:</h4>
            <p className="text-green-800">{exercise.prompt}</p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Jouw Framework-gebaseerde Prompt:
            </label>
            <Textarea
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              placeholder={`Schrijf hier je prompt volgens het ${exercise.framework.acronym} framework...

Zorg ervoor dat je alle framework componenten duidelijk includeert:
${exercise.framework.components.map(c => `${c.letter}: ${c.name}`).join('\n')}`}
              className="min-h-[200px] text-sm"
              disabled={isEvaluated}
            />
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleEvaluate}
              disabled={!userSolution.trim() || isEvaluated}
              className="bg-green-600 hover:bg-green-700"
            >
              <Award className="h-4 w-4 mr-2" />
              Evalueer Framework Compleetheid
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowHints(!showHints)}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHints ? 'Verberg' : 'Toon'} Hints
            </Button>
            {isEvaluated && (
              <Button variant="outline" onClick={handleReset}>
                Opnieuw Proberen
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hints */}
      {showHints && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Framework Hints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {exercise.hints.map((hint, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span className="text-yellow-800 text-sm">{hint}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Evaluation Results */}
      {isEvaluated && evaluation && (
        <Card className={`border-2 ${overallScore >= 80 ? 'border-green-300 bg-green-50' : overallScore >= 60 ? 'border-yellow-300 bg-yellow-50' : 'border-red-300 bg-red-50'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center space-x-2 ${overallScore >= 80 ? 'text-green-800' : overallScore >= 60 ? 'text-yellow-800' : 'text-red-800'}`}>
              <Award className="h-5 w-5" />
              <span>Framework Compleetheid Analyse</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {overallScore}%
              </div>
              <Progress value={overallScore} className="h-3 mb-4" />
              <p className={`font-semibold ${overallScore >= 80 ? 'text-green-800' : overallScore >= 60 ? 'text-yellow-800' : 'text-red-800'}`}>
                {overallScore >= 80 ? 'Uitstekend! Alle framework elementen correct toegepast.' :
                 overallScore >= 60 ? 'Goed! Meeste framework elementen aanwezig.' :
                 'Nog werk te doen. Meerdere framework elementen ontbreken.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {exercise.framework.components.map((component, index) => {
                const found = evaluation[component.name];
                const weight = exercise.evaluationWeights[component.name] || 25;
                
                return (
                  <div key={index} className={`p-3 rounded-lg border ${found ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className={`h-4 w-4 ${found ? 'text-green-600' : 'text-red-400'}`} />
                        <span className={`font-medium ${found ? 'text-green-800' : 'text-red-800'}`}>
                          {component.letter}: {component.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">{weight}%</span>
                    </div>
                    <p className={`text-sm ${found ? 'text-green-700' : 'text-red-700'}`}>
                      {found ? 'Element gedetecteerd in je prompt' : 'Element niet duidelijk aanwezig'}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Sample Solution */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Voorbeeldoplossing:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 whitespace-pre-line">
                {exercise.solution}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FrameworkExercisePlayer;
