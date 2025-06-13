
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Lightbulb, Target, RotateCcw, Bug, BookOpen } from 'lucide-react';
import PromptHighlighter from './PromptHighlighter';
import PromptLegend from './PromptLegend';
import ExerciseNavigator from './ExerciseNavigator';
import { Exercise, getExerciseDatabase } from './ExerciseData';

interface EmbeddableExerciseProps {
  exercise: Exercise;
  showHeader?: boolean;
  showLegend?: boolean;
  compact?: boolean;
  onComplete?: (score: number) => void;
  className?: string;
  language?: 'en' | 'nl';
}

interface CriterionEvaluation {
  met: boolean;
  feedback: string;
  keywordsFound: string[];
}

const EmbeddableExercise = ({ 
  exercise, 
  showHeader = true,
  showLegend = true,
  compact = false,
  onComplete,
  className = "",
  language = 'nl'
}: EmbeddableExerciseProps) => {
  const [userPrompt, setUserPrompt] = useState("");
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [evaluation, setEvaluation] = useState<{ [key: string]: CriterionEvaluation }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(exercise);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(exercise.difficulty);
  const [allExercises, setAllExercises] = useState<Exercise[]>([]);
  const [showDebug, setShowDebug] = useState(false);
  const [activeTab, setActiveTab] = useState('hints');

  // Load exercises when level changes
  useEffect(() => {
    const exerciseDatabase = getExerciseDatabase(language);
    const exercises = exerciseDatabase[currentLevel] || [];
    setAllExercises(exercises);
    
    // If current exercise is not in the new level, switch to first exercise
    if (!exercises.find(ex => ex.id === currentExercise.id)) {
      if (exercises.length > 0) {
        setCurrentExercise(exercises[0]);
        resetExercise();
      }
    }
  }, [currentLevel, language]);

  // Initialize exercises on component mount
  useEffect(() => {
    const exerciseDatabase = getExerciseDatabase(language);
    const exercises = exerciseDatabase[currentLevel] || [];
    setAllExercises(exercises);
  }, []);

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
        'tips': 'Tips',
        'solution': 'Solution',
        'debug': 'Debug',
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
        'tips': 'Tips',
        'solution': 'Oplossing',
        'debug': 'Debug',
        'results': 'Resultaten',
        'criteria.evaluation': 'Evaluatiecriteria:',
        'sample.solution': 'Voorbeeldoplossing:',
        'prompt.placeholder': 'Schrijf hier je prompt...',
        'criteria.met': 'criteria behaald',
        'hint.of': 'van',
        'powered.by': 'Aangedreven door Techgrounds AI-Playground'
      }
    };
    
    return translations[language]?.[key] || translations.nl[key] || key;
  };

  // Simple Dutch keyword matching
  const evaluatePrompt = () => {
    const criteria = currentExercise.criteria || currentExercise.evaluationCriteria || [];
    const newEvaluation: { [key: string]: CriterionEvaluation } = {};
    
    criteria.forEach(criterion => {
      const result = evaluateCriterionSimple(criterion, userPrompt);
      newEvaluation[criterion] = result;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
    
    const completedCount = Object.values(newEvaluation).filter(evalResult => evalResult.met).length;
    const score = (completedCount / criteria.length) * 100;
    onComplete?.(score);
  };

  // Simple keyword matching for Dutch
  const evaluateCriterionSimple = (criterion: string, userText: string): CriterionEvaluation => {
    const lowerCriterion = criterion.toLowerCase();
    const lowerUserText = userText.toLowerCase();
    
    // Define Dutch keywords for common prompt engineering concepts
    const dutchKeywords: { [key: string]: string[] } = {
      'rol': ['rol', 'persona', 'expert', 'specialist', 'je bent', 'gedraag je als', 'act als'],
      'context': ['context', 'achtergrond', 'situatie', 'omgeving', 'scenario', 'omstandigheden'],
      'taak': ['taak', 'opdracht', 'doel', 'vraag', 'help', 'maak', 'schrijf', 'creëer'],
      'format': ['format', 'opmaak', 'structuur', 'indeling', 'vorm', 'stijl'],
      'voorbeeld': ['voorbeeld', 'zoals', 'bijvoorbeeld', 'illustratie', 'demo'],
      'specificatie': ['specificeer', 'detail', 'precies', 'exact', 'concreet', 'duidelijk'],
      'output': ['output', 'uitvoer', 'resultaat', 'antwoord', 'response'],
      'instructie': ['instructie', 'regel', 'voorwaarde', 'constraint', 'beperk', 'let op']
    };
    
    // Find relevant keywords based on criterion content
    let relevantKeywords: string[] = [];
    
    // Check which category this criterion belongs to
    for (const [category, keywords] of Object.entries(dutchKeywords)) {
      if (keywords.some(keyword => lowerCriterion.includes(keyword))) {
        relevantKeywords = keywords;
        break;
      }
    }
    
    // If no category match, extract key words from the criterion itself
    if (relevantKeywords.length === 0) {
      const words = lowerCriterion.split(/\s+/).filter(word => 
        word.length > 3 && 
        !['moet', 'heeft', 'zijn', 'wordt', 'kunnen', 'zouden', 'waar', 'deze', 'voor', 'een', 'het', 'de'].includes(word)
      );
      relevantKeywords = words.slice(0, 3); // Take max 3 key words
    }
    
    // Find matching keywords in user text
    const foundKeywords: string[] = [];
    relevantKeywords.forEach(keyword => {
      if (lowerUserText.includes(keyword)) {
        foundKeywords.push(keyword);
      }
    });
    
    // Simple pass/fail logic
    const hasBasicLength = userText.length >= 20;
    const hasKeywords = foundKeywords.length > 0;
    const hasMinimumContent = userText.trim().split(/\s+/).length >= 5;
    
    const met = hasBasicLength && (hasKeywords || hasMinimumContent);
    
    // Generate simple feedback
    let feedback = '';
    if (met) {
      if (foundKeywords.length > 0) {
        feedback = `✓ Criterium behaald! Gevonden: ${foundKeywords.join(', ')}`;
      } else {
        feedback = `✓ Criterium behaald! Voldoende inhoud aanwezig.`;
      }
    } else {
      if (!hasBasicLength) {
        feedback = '✗ Te kort. Schrijf een uitgebreidere prompt.';
      } else if (!hasKeywords && !hasMinimumContent) {
        feedback = '✗ Relevante inhoud ontbreekt. Probeer meer details toe te voegen.';
      } else {
        feedback = '✗ Criterium niet behaald. Controleer de vereisten.';
      }
    }
    
    return {
      met,
      feedback,
      keywordsFound: foundKeywords
    };
  };

  const resetExercise = () => {
    setUserPrompt("");
    setEvaluation({});
    setIsEvaluated(false);
    setShowHints(false);
    setCurrentHint(0);
    setShowDebug(false);
    setActiveTab('hints');
  };

  const handleExerciseChange = (newExercise: Exercise) => {
    setCurrentExercise(newExercise);
    resetExercise();
  };

  const handleLevelChange = (newLevel: 'beginner' | 'intermediate' | 'advanced') => {
    setCurrentLevel(newLevel);
  };

  const criteria = currentExercise.criteria || currentExercise.evaluationCriteria || [];
  const evaluationEntries = Object.entries(evaluation);
  const completedCriteria = evaluationEntries.filter(([_, evalResult]) => evalResult.met).length;
  const totalCriteria = criteria.length;
  const progressPercentage = totalCriteria > 0 ? (completedCriteria / totalCriteria) * 100 : 0;

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
      
      {/* Exercise Navigator */}
      {!compact && allExercises.length > 1 && (
        <ExerciseNavigator
          exercises={allExercises}
          currentExercise={currentExercise}
          onExerciseChange={handleExerciseChange}
          level={currentLevel}
          onLevelChange={handleLevelChange}
          compact={compact}
          language={language}
        />
      )}
      
      {showHeader && (
        <Card className="border-2 border-purple-200">
          <CardHeader className={compact ? "p-4" : "bg-gradient-to-r from-purple-50 to-blue-50"}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`flex items-center space-x-2 ${compact ? 'text-lg' : ''}`}>
                  <Target className={`${compact ? 'h-4 w-4' : 'h-6 w-6'} text-purple-600`} />
                  <span className="text-purple-900">{currentExercise.title}</span>
                </CardTitle>
                {!compact && (
                  <p className="text-purple-700 mt-2">{currentExercise.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={difficultyColor[currentExercise.difficulty]}>
                  {difficultyLabels[language][currentExercise.difficulty]}
                </Badge>
                <Badge variant="outline">{currentExercise.category}</Badge>
              </div>
            </div>
          </CardHeader>
          {!compact && (
            <CardContent className="pt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">📋 {t('exercise.prompt')}</h4>
                <p className="text-blue-800">{currentExercise.prompt}</p>
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
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowHints(!showHints)}
                  className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                  size={compact ? "sm" : "default"}
                >
                  <Lightbulb className="h-4 w-4 mr-1" />
                  {showHints ? t('hide.hints') : t('show.hints')}
                </Button>
                
                {isEvaluated && (
                  <Button
                    variant="outline"
                    onClick={() => setShowDebug(!showDebug)}
                    className="bg-blue-50 border-blue-300 hover:bg-blue-100"
                    size={compact ? "sm" : "default"}
                  >
                    <Bug className="h-4 w-4 mr-1" />
                    {t('debug')}
                  </Button>
                )}
              </div>
            </div>

            {showHints && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="p-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="hints">
                        <Lightbulb className="h-4 w-4 mr-1" />
                        {t('hints')}
                      </TabsTrigger>
                      <TabsTrigger value="tips">💡 {t('tips')}</TabsTrigger>
                      <TabsTrigger value="solution">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {t('solution')}
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="hints" className="space-y-4 mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-yellow-900 text-sm">
                          💡 {t('hints')} {currentHint + 1} {t('hint.of')} {currentExercise.hints.length}
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
                          {currentHint < currentExercise.hints.length - 1 && (
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
                      <p className="text-yellow-800 text-sm">{currentExercise.hints[currentHint]}</p>
                    </TabsContent>
                    
                    <TabsContent value="tips" className="mt-4">
                      <div className="space-y-2">
                        <h5 className="font-semibold text-yellow-900 text-sm">💡 Algemene Tips:</h5>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          <li>• Begin met een duidelijke rol of persona definitie</li>
                          <li>• Geef specifieke context en achtergrond informatie</li>
                          <li>• Gebruik concrete voorbeelden om je bedoeling te verduidelijken</li>
                          <li>• Specificeer het gewenste uitvoerformaat en structuur</li>
                          <li>• Test en verfijn je prompt stap voor stap</li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="solution" className="mt-4">
                      {currentExercise.solution ? (
                        <div className="space-y-3">
                          <h5 className="font-semibold text-yellow-900 text-sm">✨ {t('sample.solution')}</h5>
                          <div className="bg-white p-4 rounded border border-yellow-200 max-h-60 overflow-y-auto">
                            <PromptHighlighter text={currentExercise.solution} className="text-sm leading-relaxed" />
                          </div>
                        </div>
                      ) : (
                        <p className="text-yellow-800 text-sm">Geen voorbeeldoplossing beschikbaar voor deze oefening.</p>
                      )}
                    </TabsContent>
                  </Tabs>
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
                <div className="text-lg font-bold text-gray-800">
                  {completedCriteria} {t('hint.of')} {totalCriteria} {t('criteria.met')}
                </div>
                <Progress value={progressPercentage} className="h-2 mt-2" />
                <div className="text-sm text-gray-600 mt-1">
                  {completedCriteria === totalCriteria ? 'Alle criteria behaald! 🎉' : 
                   completedCriteria > totalCriteria / 2 ? 'Goed bezig! 👍' : 
                   'Nog werk te doen 💪'}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">{t('criteria.evaluation')}</h4>
              {criteria.map((criterion, index) => {
                const evalResult = evaluation[criterion];
                return (
                  <div key={index} className="p-3 rounded border text-sm">
                    <div className="flex items-start space-x-2 mb-2">
                      {isEvaluated ? (
                        evalResult?.met ? (
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        )
                      ) : (
                        <div className="w-4 h-4 border border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                      )}
                      <div className="flex-1">
                        <span className={
                          isEvaluated 
                            ? evalResult?.met 
                              ? 'text-green-800 font-medium' 
                              : 'text-red-800'
                            : 'text-gray-700'
                        }>
                          {criterion}
                        </span>
                        {isEvaluated && evalResult && (
                          <div className="mt-1">
                            <div className="text-xs text-gray-700">
                              {evalResult.feedback}
                            </div>
                            {showDebug && evalResult.keywordsFound.length > 0 && (
                              <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                                <strong>Gevonden termen:</strong> {evalResult.keywordsFound.join(', ')}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
