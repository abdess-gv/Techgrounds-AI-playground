
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Lightbulb, Target, Clock, Award, ExternalLink, BookOpen } from 'lucide-react';
import PromptHighlighter from './PromptHighlighter';
import { Exercise } from './ExerciseData';

interface EnhancedInteractiveExerciseProps {
  exercise: Exercise;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const EnhancedInteractiveExercise: React.FC<EnhancedInteractiveExerciseProps> = ({ 
  exercise, 
  onComplete, 
  onBack 
}) => {
  const [userInput, setUserInput] = useState('');
  const [currentHint, setCurrentHint] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [evaluation, setEvaluation] = useState<{ [key: string]: boolean }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const evaluateResponse = () => {
    const newEvaluation: { [key: string]: boolean } = {};
    
    exercise.criteria.forEach(criterion => {
      // Enhanced evaluation logic
      const keywords = criterion.toLowerCase().split(/[^\w]+/).filter(word => word.length > 2);
      const userText = userInput.toLowerCase();
      
      // Check for keyword presence and context
      const hasKeywords = keywords.some(keyword => userText.includes(keyword));
      const hasContext = userText.length > 50; // Minimum length for meaningful content
      const hasStructure = userText.includes('\n') || userText.includes(':') || userText.includes('-');
      
      newEvaluation[criterion] = hasKeywords && hasContext && hasStructure;
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
    setCurrentTip(0);
    setShowHints(false);
    setShowTips(false);
    setTimeElapsed(0);
  };

  const completedCriteria = Object.values(evaluation).filter(Boolean).length;
  const totalCriteria = exercise.criteria.length;
  const score = isEvaluated ? (completedCriteria / totalCriteria) * 100 : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Exercises
        </Button>
        <div className="flex items-center space-x-4">
          <Badge variant="outline">{exercise.estimatedTime}</Badge>
          <Badge className={`${
            exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            exercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {exercise.difficulty}
          </Badge>
        </div>
      </div>

      {/* Exercise Header */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-600" />
            <span className="text-purple-900">{exercise.title}</span>
          </CardTitle>
          <p className="text-purple-700 mt-2">{exercise.description}</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📋 Exercise Prompt:</h4>
            <p className="text-blue-800">{exercise.prompt}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="workspace" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="hints">Hints ({exercise.hints.length})</TabsTrigger>
          <TabsTrigger value="tips">Tips ({exercise.tips.length})</TabsTrigger>
          <TabsTrigger value="resources">Resources ({exercise.resources.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="workspace" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Area */}
            <Card className="border border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-900">🚀 Your Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <Textarea
                  placeholder="Write your prompt here... Use clear structure, specific instructions, and examples!"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[300px] font-mono text-sm border-2 border-gray-200 focus:border-green-400"
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Characters: {userInput.length} | Words: {userInput.split(/\s+/).filter(Boolean).length}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={evaluateResponse} 
                      disabled={!userInput.trim() || userInput.length < 50}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Evaluate Prompt
                    </Button>
                    <Button variant="outline" onClick={resetExercise}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Area */}
            <Card className="border border-orange-200">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-orange-900">📊 Evaluation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {isEvaluated && (
                  <>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                        {Math.round(score)}%
                      </div>
                      <div className="text-lg font-medium">{getScoreLabel(score)}</div>
                      <div className="text-sm text-gray-600">
                        {completedCriteria} of {totalCriteria} criteria met
                      </div>
                    </div>
                    
                    <Progress value={score} className="h-3" />
                  </>
                )}

                <div className="space-y-3">
                  <h4 className="font-semibold">Evaluation Criteria:</h4>
                  {exercise.criteria.map((criterion, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                      {isEvaluated ? (
                        evaluation[criterion] ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        )
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5"></div>
                      )}
                      <span className={`text-sm ${
                        isEvaluated 
                          ? evaluation[criterion] 
                            ? 'text-green-800 font-medium' 
                            : 'text-red-800'
                          : 'text-gray-700'
                      }`}>
                        {criterion}
                      </span>
                    </div>
                  ))}
                </div>

                {isEvaluated && (
                  <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 mt-6">
                    <h4 className="font-semibold mb-3">✨ Sample Solution:</h4>
                    <div className="bg-white p-4 rounded border max-h-60 overflow-y-auto">
                      <PromptHighlighter text={exercise.solution} className="text-sm leading-relaxed" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hints">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Helpful Hints</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Hint {currentHint + 1} of {exercise.hints.length}</span>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentHint(Math.max(0, currentHint - 1))}
                      disabled={currentHint === 0}
                    >
                      ← Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentHint(Math.min(exercise.hints.length - 1, currentHint + 1))}
                      disabled={currentHint === exercise.hints.length - 1}
                    >
                      Next →
                    </Button>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">{exercise.hints[currentHint]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span>Pro Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Tip {currentTip + 1} of {exercise.tips.length}</span>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentTip(Math.max(0, currentTip - 1))}
                      disabled={currentTip === 0}
                    >
                      ← Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentTip(Math.min(exercise.tips.length - 1, currentTip + 1))}
                      disabled={currentTip === exercise.tips.length - 1}
                    >
                      Next →
                    </Button>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-800">{exercise.tips[currentTip]}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                <span>Learning Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {exercise.resources.map((resource, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1">
                        {resource.type}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Resource
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Feedback */}
      {isEvaluated && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-blue-900 mb-4">🎯 Performance Analysis</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(score)}%</div>
                <div className="text-sm text-blue-700">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedCriteria}</div>
                <div className="text-sm text-green-700">Criteria Met</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{getScoreLabel(score)}</div>
                <div className="text-sm text-purple-700">Performance Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{exercise.estimatedTime}</div>
                <div className="text-sm text-orange-700">Time Estimate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedInteractiveExercise;
