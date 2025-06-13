
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Target, RotateCcw, BookOpen } from 'lucide-react';
import PromptLegend from '@/components/PromptEngineering/PromptLegend';
import { promptEngineering2ExercisesNL } from '@/data/promptEngineering2ExercisesNL';
import { PromptEngineering2Exercise } from '@/types/PromptEngineering2';

interface InteractiveExerciseProps {
  exercise: PromptEngineering2Exercise;
  onComplete?: (score: number) => void;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({ exercise, onComplete }) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [evaluation, setEvaluation] = useState<{ [key: string]: boolean }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);

  // Simple evaluation criteria based on exercise content
  const evaluationCriteria = [
    "Bevat duidelijke instructies",
    "Heeft specifieke context",
    "Gebruikt goede structuur",
    "Geeft concrete voorbeelden"
  ];

  const evaluatePrompt = () => {
    const newEvaluation: { [key: string]: boolean } = {};
    const userText = userPrompt.toLowerCase();
    
    // Simple heuristic evaluation
    newEvaluation["Bevat duidelijke instructies"] = userText.length > 50 && (userText.includes('schrijf') || userText.includes('maak') || userText.includes('genereer'));
    newEvaluation["Heeft specifieke context"] = userText.includes('context') || userText.includes('voor') || userText.includes('als');
    newEvaluation["Gebruikt goede structuur"] = userPrompt.includes('\n') || userPrompt.includes(':') || userPrompt.includes('-');
    newEvaluation["Geeft concrete voorbeelden"] = userText.includes('bijvoorbeeld') || userText.includes('zoals') || userPrompt.length > 100;
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
    
    const score = Object.values(newEvaluation).filter(Boolean).length / evaluationCriteria.length * 100;
    onComplete?.(score);
  };

  const resetExercise = () => {
    setUserPrompt("");
    setEvaluation({});
    setIsEvaluated(false);
    setShowHints(false);
  };

  const completedCriteria = Object.values(evaluation).filter(Boolean).length;
  const totalCriteria = evaluationCriteria.length;
  const score = isEvaluated ? (completedCriteria / totalCriteria) * 100 : 0;

  return (
    <Card className="mb-8 border-2 border-purple-200">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-purple-600" />
          <span className="text-purple-900">{exercise.title}</span>
        </CardTitle>
        <p className="text-purple-700 mt-2">{exercise.description}</p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Instructies */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Opdracht:
              </h4>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{exercise.instructions}</ReactMarkdown>
              </div>
            </div>

            {exercise.examplePrompt && (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-700 mb-2">💡 Voorbeeld Prompt:</h4>
                <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono">
                  {exercise.examplePrompt}
                </pre>
              </div>
            )}

            <Button
              variant="outline"
              onClick={() => setShowHints(!showHints)}
              className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHints ? 'Verberg Tips' : 'Toon Tips'}
            </Button>

            {showHints && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                <h4 className="font-medium text-yellow-900 mb-2">💡 Tips:</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Begin met duidelijke context en achtergrond</li>
                  <li>• Gebruik specifieke instructies in plaats van vage termen</li>
                  <li>• Voeg voorbeelden toe om je bedoeling te verduidelijken</li>
                  <li>• Specificeer het gewenste uitvoerformaat</li>
                </ul>
              </div>
            )}
          </div>

          {/* Input en Evaluatie */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jouw Prompt:
              </label>
              <Textarea
                placeholder="Schrijf hier je prompt..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={evaluatePrompt} 
                disabled={!userPrompt.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                Evalueer
              </Button>
              <Button variant="outline" onClick={resetExercise}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {isEvaluated && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-3xl font-bold ${
                    score >= 80 ? 'text-green-600' : 
                    score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {Math.round(score)}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {completedCriteria} van {totalCriteria} criteria behaald
                  </div>
                  <Progress value={score} className="h-2 mt-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Evaluatiecriteria:</h4>
                  {evaluationCriteria.map((criterion, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 rounded border text-sm">
                      {evaluation[criterion] ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={
                        evaluation[criterion] 
                          ? 'text-green-800 font-medium' 
                          : 'text-red-800'
                      }>
                        {criterion}
                      </span>
                    </div>
                  ))}
                </div>

                {exercise.expectedOutput && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Verwachte Output:</h4>
                    <pre className="text-sm text-green-800 whitespace-pre-wrap">
                      {exercise.expectedOutput}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PromptEngineering2EmbedNL: React.FC = () => {
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  // Check for embed parameters
  const urlParams = new URLSearchParams(window.location.search);
  const isCompact = urlParams.get('compact') === 'true';
  const showHeader = urlParams.get('header') !== 'false';
  const showLegend = urlParams.get('legend') !== 'false';
  const levelFilter = urlParams.get('level');

  // Group exercises by level
  const exercisesByLevel: { [level: number]: PromptEngineering2Exercise[] } =
    promptEngineering2ExercisesNL.reduce((acc, exercise) => {
      if (!acc[exercise.level]) {
        acc[exercise.level] = [];
      }
      acc[exercise.level].push(exercise);
      return acc;
    }, {} as { [level: number]: PromptEngineering2Exercise[] });

  // Filter by level if specified
  const filteredLevels = levelFilter 
    ? [parseInt(levelFilter)] 
    : Object.keys(exercisesByLevel).map(Number);

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises(prev => [...prev, exerciseId]);
    }
    setScores(prev => ({ ...prev, [exerciseId]: score }));
  };

  const totalExercises = promptEngineering2ExercisesNL.length;
  const overallScore = Object.values(scores).length > 0 
    ? Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length 
    : 0;

  return (
    <div className={`${isCompact ? 'p-2' : 'p-4 md:p-8'} bg-slate-50 min-h-screen`}>
      {showHeader && (
        <header className="mb-8 text-center">
          <h1 className={`${isCompact ? 'text-2xl' : 'text-4xl'} font-bold text-slate-800`}>
            Prompt Engineering 2.0 Interactieve Oefeningen
          </h1>
          <p className="text-md text-slate-600 mt-2">Techgrounds AI-Playground</p>
          
          {completedExercises.length > 0 && (
            <div className="mt-4 flex justify-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                {completedExercises.length}/{totalExercises} Voltooid
              </Badge>
              <Badge 
                variant="outline" 
                className={`px-3 py-1 ${
                  overallScore >= 80 ? 'bg-green-100 text-green-800' : 
                  overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}
              >
                Gemiddelde: {Math.round(overallScore)}%
              </Badge>
            </div>
          )}
        </header>
      )}

      <div className={`${isCompact ? 'max-w-full' : 'max-w-6xl'} mx-auto bg-white rounded-lg shadow-lg`}>
        <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
          {showLegend && !isCompact && (
            <div className="mb-10">
              <PromptLegend />
            </div>
          )}

          {filteredLevels.map((level) => {
            const exercises = exercisesByLevel[level];
            if (!exercises) return null;
            
            const sortedExercises = exercises.sort((a, b) => a.exerciseNumber - b.exerciseNumber);

            return (
              <section key={level} className="mb-12">
                <h2 className={`${isCompact ? 'text-xl' : 'text-3xl'} font-semibold text-slate-700 mb-6 pb-2 border-b-2 border-blue-500`}>
                  Level {level}
                </h2>
                {sortedExercises.map((exercise) => (
                  <InteractiveExercise
                    key={exercise.id}
                    exercise={exercise}
                    onComplete={(score) => handleExerciseComplete(exercise.id, score)}
                  />
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PromptEngineering2EmbedNL;
