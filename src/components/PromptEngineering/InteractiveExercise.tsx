
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Target, Clock, Info } from 'lucide-react';
import PromptHighlighter from './PromptHighlighter';
import { evaluateExercise, EvaluationSummary } from './utils/exerciseEvaluator';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  prompt: string;
  solution?: string;
  criteria?: string[];
  evaluationCriteria?: string[];
  hints: string[];
  tips?: string[];
  timeLimit?: number;
  estimatedTime?: string;
}

interface InteractiveExerciseProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({ exercise, onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [currentHint, setCurrentHint] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [evaluationSummary, setEvaluationSummary] = useState<EvaluationSummary | null>(null);
  const [timeLeft, setTimeLeft] = useState(exercise.timeLimit || 600);

  const evaluateResponse = () => {
    const summary = evaluateExercise(exercise, userInput);
    setEvaluationSummary(summary);
    onComplete(summary.overallScore);
  };

  const resetExercise = () => {
    setUserInput('');
    setEvaluationSummary(null);
    setCurrentHint(0);
    setShowHints(false);
  };

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>{exercise.title}</span>
              </CardTitle>
              <p className="text-gray-600 mt-2">{exercise.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={difficultyColor[exercise.difficulty]}>
                {exercise.difficulty}
              </Badge>
              <Badge variant="outline">{exercise.category}</Badge>
              {exercise.timeLimit && (
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Exercise Prompt:</h4>
            <PromptHighlighter text={exercise.prompt} className="text-blue-800" />
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card>
        <CardHeader>
          <CardTitle>Your Solution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your prompt here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="min-h-[200px] font-mono"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button onClick={evaluateResponse} disabled={!userInput.trim()}>
                Evaluate Solution
              </Button>
              <Button variant="outline" onClick={resetExercise}>
                Reset
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowHints(!showHints)}
              className="flex items-center space-x-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span>{showHints ? 'Hide' : 'Show'} Hints</span>
            </Button>
          </div>

          {showHints && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-yellow-900">
                    Hint {currentHint + 1} of {exercise.hints.length}
                  </h4>
                  <div className="flex space-x-1">
                    {currentHint > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentHint(currentHint - 1)}
                      >
                        Previous
                      </Button>
                    )}
                    {currentHint < exercise.hints.length - 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentHint(currentHint + 1)}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-yellow-800">{exercise.hints[currentHint]}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Results */}
      {evaluationSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Evaluation Results</span>
              <Badge variant="outline" className={
                evaluationSummary.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                evaluationSummary.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }>
                {Math.round(evaluationSummary.overallScore)}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {Object.entries(evaluationSummary.results).map(([criterion, result], index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-start space-x-3">
                    {result.passed ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className={`font-medium ${result.passed ? 'text-green-800' : 'text-red-800'}`}>
                        {criterion}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {result.feedback}
                      </div>
                      {result.matchedKeywords.length > 0 && (
                        <div className="text-xs text-blue-600 mt-1">
                          Gevonden: {result.matchedKeywords.join(', ')}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(result.score)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-sm text-gray-600">
                  {evaluationSummary.passedCriteria} / {evaluationSummary.totalCriteria} criteria passed
                </span>
              </div>
              <Progress value={evaluationSummary.overallScore} className="h-3" />
            </div>

            {evaluationSummary.suggestions.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Verbeteringsuggesties:</h4>
                </div>
                <ul className="text-sm text-blue-800 space-y-1">
                  {evaluationSummary.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span>•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exercise.solution && (
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold mb-2">Sample Solution:</h4>
                <PromptHighlighter text={exercise.solution} />
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveExercise;
