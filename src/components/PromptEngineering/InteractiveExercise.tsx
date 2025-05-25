
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Target, Clock } from 'lucide-react';
import PromptHighlighter from './PromptHighlighter';

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  prompt: string;
  solution: string;
  criteria: string[];
  hints: string[];
  timeLimit?: number;
}

interface InteractiveExerciseProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
}

const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({ exercise, onComplete }) => {
  const [userInput, setUserInput] = useState('');
  const [currentHint, setCurrentHint] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [evaluation, setEvaluation] = useState<{ [key: string]: boolean }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercise.timeLimit || 600);

  const evaluateResponse = () => {
    const newEvaluation: { [key: string]: boolean } = {};
    
    exercise.criteria.forEach(criterion => {
      // Simple keyword-based evaluation (in real app, use AI evaluation)
      const keywords = criterion.toLowerCase().split(' ');
      const hasKeywords = keywords.some(keyword => 
        userInput.toLowerCase().includes(keyword)
      );
      newEvaluation[criterion] = hasKeywords;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
    
    const score = Object.values(newEvaluation).filter(Boolean).length / exercise.criteria.length * 100;
    onComplete(score);
  };

  const resetExercise = () => {
    setUserInput('');
    setEvaluation({});
    setIsEvaluated(false);
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
      {isEvaluated && (
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {exercise.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {evaluation[criterion] ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className={evaluation[criterion] ? 'text-green-800' : 'text-red-800'}>
                    {criterion}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-sm text-gray-600">
                  {Object.values(evaluation).filter(Boolean).length} / {exercise.criteria.length}
                </span>
              </div>
              <Progress 
                value={Object.values(evaluation).filter(Boolean).length / exercise.criteria.length * 100} 
                className="h-2"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h4 className="font-semibold mb-2">Sample Solution:</h4>
              <PromptHighlighter text={exercise.solution} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveExercise;
