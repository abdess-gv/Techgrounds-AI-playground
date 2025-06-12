
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Target, RotateCcw } from 'lucide-react';
import PromptHighlighter from './PromptHighlighter';
import PromptLegend from './PromptLegend';
import { Exercise } from './ExerciseData';

interface EmbeddableExerciseProps {
  exercise: Exercise;
  showHeader?: boolean;
  showLegend?: boolean;
  compact?: boolean;
  onComplete?: (score: number) => void;
  className?: string;
  language?: 'en' | 'nl';
}

const EmbeddableExercise = ({ 
  exercise, 
  showHeader = true,
  showLegend = true,
  compact = false,
  onComplete,
  className = "",
  language = 'en'
}: EmbeddableExerciseProps) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [evaluation, setEvaluation] = useState<{ [key: string]: boolean }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);

  // Dutch translations
  const t = (key: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      en: {
        'exercise.prompt': 'Exercise Prompt:',
        'your.solution': 'Your Solution',
        'evaluate': 'Evaluate',
        'reset': 'Reset',
        'show.hints': 'Show Hints',
        'hide.hints': 'Hide Hints',
        'hints': 'Hints',
        'results': 'Results',
        'criteria.evaluation': 'Evaluation Criteria:',
        'sample.solution': 'Sample Solution:',
        'prompt.placeholder': 'Write your prompt here...',
        'criteria.met': 'criteria met',
        'hint.of': 'of',
        'powered.by': 'Powered by Techgrounds AI-Playground'
      },
      nl: {
        'exercise.prompt': 'Oefening Opdracht:',
        'your.solution': 'Jouw Oplossing',
        'evaluate': 'Evalueren',
        'reset': 'Reset',
        'show.hints': 'Toon Hints',
        'hide.hints': 'Verberg Hints',
        'hints': 'Hints',
        'results': 'Resultaten',
        'criteria.evaluation': 'Evaluatiecriteria:',
        'sample.solution': 'Voorbeeldoplossing:',
        'prompt.placeholder': 'Schrijf hier je prompt...',
        'criteria.met': 'criteria behaald',
        'hint.of': 'van',
        'powered.by': 'Aangedreven door Techgrounds AI-Playground'
      }
    };
    
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const evaluatePrompt = () => {
    const newEvaluation: { [key: string]: boolean } = {};
    
    exercise.criteria.forEach(criterion => {
      const keywords = criterion.toLowerCase().split(/[^\w]+/).filter(word => word.length > 2);
      const userText = userPrompt.toLowerCase();
      
      const hasKeywords = keywords.some(keyword => userText.includes(keyword));
      const hasContext = userPrompt.length > 50;
      const hasStructure = userPrompt.includes('\n') || userPrompt.includes(':') || userPrompt.includes('-');
      
      newEvaluation[criterion] = hasKeywords && hasContext && hasStructure;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
    
    const score = Object.values(newEvaluation).filter(Boolean).length / exercise.criteria.length * 100;
    onComplete?.(score);
  };

  const resetExercise = () => {
    setUserPrompt("");
    setEvaluation({});
    setIsEvaluated(false);
    setShowHints(false);
    setCurrentHint(0);
  };

  const completedCriteria = Object.values(evaluation).filter(Boolean).length;
  const totalCriteria = exercise.criteria?.length || 0;
  const score = isEvaluated ? (completedCriteria / totalCriteria) * 100 : 0;

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const difficultyLabels = {
    en: {
      beginner: 'beginner',
      intermediate: 'intermediate', 
      advanced: 'advanced'
    },
    nl: {
      beginner: 'beginner',
      intermediate: 'gemiddeld',
      advanced: 'gevorderd'
    }
  };

  return (
    <div className={`embeddable-exercise space-y-4 ${className}`}>
      {showLegend && !compact && <PromptLegend />}
      
      {showHeader && (
        <Card className="border-2 border-purple-200">
          <CardHeader className={compact ? "p-4" : "bg-gradient-to-r from-purple-50 to-blue-50"}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`flex items-center space-x-2 ${compact ? 'text-lg' : ''}`}>
                  <Target className={`${compact ? 'h-4 w-4' : 'h-6 w-6'} text-purple-600`} />
                  <span className="text-purple-900">{exercise.title}</span>
                </CardTitle>
                {!compact && (
                  <p className="text-purple-700 mt-2">{exercise.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={difficultyColor[exercise.difficulty]}>
                  {difficultyLabels[language][exercise.difficulty]}
                </Badge>
                <Badge variant="outline">{exercise.category}</Badge>
              </div>
            </div>
          </CardHeader>
          {!compact && (
            <CardContent className="pt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">📋 {t('exercise.prompt')}</h4>
                <p className="text-blue-800">{exercise.prompt}</p>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      <div className={`grid ${compact ? 'gap-4' : 'lg:grid-cols-2 gap-6'}`}>
        {/* Input Area */}
        <Card className="border border-green-200">
          <CardHeader className={`bg-green-50 ${compact ? 'p-4' : ''}`}>
            <CardTitle className={`text-green-900 ${compact ? 'text-base' : ''}`}>
              🚀 {t('your.solution')}
            </CardTitle>
          </CardHeader>
          <CardContent className={`space-y-4 ${compact ? 'p-4' : 'pt-6'}`}>
            <Textarea
              placeholder={t('prompt.placeholder')}
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className={`font-mono text-sm border-2 border-gray-200 focus:border-green-400 ${
                compact ? 'min-h-[150px]' : 'min-h-[200px]'
              }`}
            />
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex space-x-2">
                <Button 
                  onClick={evaluatePrompt} 
                  disabled={!userPrompt.trim()}
                  className="bg-green-600 hover:bg-green-700"
                  size={compact ? "sm" : "default"}
                >
                  {t('evaluate')}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetExercise}
                  size={compact ? "sm" : "default"}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  {t('reset')}
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowHints(!showHints)}
                className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                size={compact ? "sm" : "default"}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {showHints ? t('hide.hints') : t('show.hints')}
              </Button>
            </div>

            {showHints && exercise.hints && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-yellow-900 text-sm">
                      💡 {t('hints')} {currentHint + 1} {t('hint.of')} {exercise.hints.length}
                    </h4>
                    <div className="flex space-x-1">
                      {currentHint > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentHint(currentHint - 1)}
                        >
                          ←
                        </Button>
                      )}
                      {currentHint < exercise.hints.length - 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentHint(currentHint + 1)}
                        >
                          →
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-yellow-800 text-sm">{exercise.hints[currentHint]}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Results Area */}
        <Card className="border border-orange-200">
          <CardHeader className={`bg-orange-50 ${compact ? 'p-4' : ''}`}>
            <CardTitle className={`text-orange-900 ${compact ? 'text-base' : ''}`}>
              📊 {t('results')}
            </CardTitle>
          </CardHeader>
          <CardContent className={`space-y-4 ${compact ? 'p-4' : 'pt-6'}`}>
            {isEvaluated && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${
                  score >= 80 ? 'text-green-600' : 
                  score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {Math.round(score)}%
                </div>
                <div className="text-sm text-gray-600">
                  {completedCriteria} {t('hint.of')} {totalCriteria} {t('criteria.met')}
                </div>
                <Progress value={score} className="h-2 mt-2" />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">{t('criteria.evaluation')}</h4>
              {exercise.criteria?.map((criterion, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 rounded border text-sm">
                  {isEvaluated ? (
                    evaluation[criterion] ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    )
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                  )}
                  <span className={
                    isEvaluated 
                      ? evaluation[criterion] 
                        ? 'text-green-800 font-medium' 
                        : 'text-red-800'
                      : 'text-gray-700'
                  }>
                    {criterion}
                  </span>
                </div>
              )) || []}
            </div>

            {isEvaluated && !compact && exercise.solution && (
              <div className="bg-gray-50 p-3 rounded border mt-4">
                <h4 className="font-semibold mb-2 text-sm">✨ {t('sample.solution')}</h4>
                <div className="bg-white p-3 rounded border max-h-40 overflow-y-auto">
                  <PromptHighlighter text={exercise.solution} className="text-xs leading-relaxed" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Branding Footer */}
      <div className="text-center text-xs text-gray-500 border-t pt-2">
        <span>{t('powered.by')}</span>
      </div>
    </div>
  );
};

export default EmbeddableExercise;
