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
  score: number;
  matchedKeywords: string[];
  feedback: string;
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

  const evaluatePrompt = () => {
    const criteria = currentExercise.criteria || currentExercise.evaluationCriteria || [];
    const newEvaluation: { [key: string]: CriterionEvaluation } = {};
    
    criteria.forEach(criterion => {
      const result = evaluateCriterion(criterion, userPrompt);
      newEvaluation[criterion] = result;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
    
    const totalScore = Object.values(newEvaluation).reduce((sum, evalResult) => sum + evalResult.score, 0);
    const averageScore = criteria.length > 0 ? (totalScore / criteria.length) * 100 : 0;
    onComplete?.(averageScore);
  };

  const evaluateCriterion = (criterion: string, userText: string): CriterionEvaluation => {
    const lowerCriterion = criterion.toLowerCase();
    const lowerUserText = userText.toLowerCase();
    
    // Extract key concepts and required elements from the criterion
    const requiredElements = extractRequiredElements(lowerCriterion);
    const keyPhrases = extractKeyPhrases(lowerCriterion);
    const matchedKeywords: string[] = [];
    let contentScore = 0;
    
    // Content relevance evaluation (60% weight)
    let relevantMatches = 0;
    const totalRequiredElements = Math.max(requiredElements.length, keyPhrases.length, 3);
    
    // Check for required elements
    requiredElements.forEach(element => {
      if (lowerUserText.includes(element.toLowerCase())) {
        matchedKeywords.push(element);
        relevantMatches += 1;
      }
    });
    
    // Check for key phrases with context
    keyPhrases.forEach(phrase => {
      if (lowerUserText.includes(phrase) && hasContextAroundPhrase(lowerUserText, phrase)) {
        if (!matchedKeywords.includes(phrase)) {
          matchedKeywords.push(phrase);
          relevantMatches += 1;
        }
      }
    });
    
    // Content score based on percentage of required elements found
    contentScore = Math.min(relevantMatches / totalRequiredElements, 1.0) * 0.6;
    
    // Structure and clarity evaluation (20% weight)
    let structureScore = 0;
    const hasGoodStructure = userText.includes(':') || userText.includes('\n') || 
                           userText.includes('1.') || userText.includes('•') || 
                           userText.includes('-');
    const hasClearSections = (userText.match(/\n/g) || []).length >= 2;
    const hasProperFormatting = userText.includes(':') && userText.length > 100;
    
    if (hasGoodStructure) structureScore += 0.1;
    if (hasClearSections) structureScore += 0.05;
    if (hasProperFormatting) structureScore += 0.05;
    
    // Length and completeness evaluation (10% weight)
    let lengthScore = 0;
    if (userText.length > 50) lengthScore += 0.03;
    if (userText.length > 150) lengthScore += 0.04;
    if (userText.length > 300) lengthScore += 0.03;
    
    // Creativity and originality evaluation (10% weight)
    let creativityScore = 0;
    const hasExamples = userText.toLowerCase().includes('voorbeeld') || 
                       userText.toLowerCase().includes('bijvoorbeeld') ||
                       userText.toLowerCase().includes('zoals');
    const hasPersona = userText.toLowerCase().includes('rol') || 
                      userText.toLowerCase().includes('persona') ||
                      userText.toLowerCase().includes('expert');
    const hasSpecificInstructions = userText.split('.').length > 3;
    
    if (hasExamples) creativityScore += 0.03;
    if (hasPersona) creativityScore += 0.04;
    if (hasSpecificInstructions) creativityScore += 0.03;
    
    const finalScore = contentScore + structureScore + lengthScore + creativityScore;
    const met = finalScore >= 0.6; // 60% threshold for success
    
    // Generate detailed feedback
    let feedback = generateDetailedFeedback(
      contentScore, structureScore, lengthScore, creativityScore,
      matchedKeywords, userText.length, totalRequiredElements
    );
    
    return {
      met,
      score: finalScore,
      matchedKeywords,
      feedback: feedback.trim()
    };
  };

  const extractRequiredElements = (criterion: string): string[] => {
    const elements: string[] = [];
    
    // Look for specific requirements in the criterion
    const requirementPatterns = [
      /moet\s+(\w+)/g,
      /bevat\s+(\w+)/g,
      /gebruik\s+(\w+)/g,
      /specificeer\s+(\w+)/g,
      /definieer\s+(\w+)/g,
      /beschrijf\s+(\w+)/g
    ];
    
    requirementPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(criterion)) !== null) {
        elements.push(match[1]);
      }
    });
    
    return elements;
  };

  const hasContextAroundPhrase = (text: string, phrase: string): boolean => {
    const index = text.indexOf(phrase);
    if (index === -1) return false;
    
    const before = text.substring(Math.max(0, index - 20), index);
    const after = text.substring(index + phrase.length, Math.min(text.length, index + phrase.length + 20));
    
    // Check if there's meaningful context around the phrase
    const contextWords = (before + after).split(/\s+/).filter(word => word.length > 3);
    return contextWords.length >= 3;
  };

  const generateDetailedFeedback = (
    contentScore: number, 
    structureScore: number, 
    lengthScore: number, 
    creativityScore: number,
    matchedKeywords: string[],
    textLength: number,
    totalRequired: number
  ): string => {
    let feedback = "";
    
    // Content feedback (most important)
    if (contentScore >= 0.4) {
      feedback += `✓ Goede inhoudelijke relevantie (${matchedKeywords.length}/${totalRequired} elementen gevonden). `;
    } else if (contentScore >= 0.2) {
      feedback += `◐ Gedeeltelijk relevante inhoud (${matchedKeywords.length}/${totalRequired} elementen). Meer specifieke details nodig. `;
    } else {
      feedback += `✗ Onvoldoende relevante inhoud (${matchedKeywords.length}/${totalRequired} elementen). Focus op de kernelementen. `;
    }
    
    // Structure feedback
    if (structureScore >= 0.15) {
      feedback += `✓ Uitstekende structuur en opmaak. `;
    } else if (structureScore >= 0.1) {
      feedback += `◐ Redelijke structuur, kan verbeterd worden. `;
    } else {
      feedback += `✗ Betere structuur nodig (gebruik : - nummering). `;
    }
    
    // Length feedback
    if (lengthScore >= 0.08) {
      feedback += `✓ Uitgebreide en complete prompt. `;
    } else if (lengthScore >= 0.05) {
      feedback += `◐ Redelijke lengte (${textLength} karakters). `;
    } else {
      feedback += `✗ Te beknopt (${textLength} karakters), meer detail nodig. `;
    }
    
    // Creativity feedback
    if (creativityScore >= 0.08) {
      feedback += `✓ Creatief en specifiek uitgewerkt. `;
    } else if (creativityScore >= 0.05) {
      feedback += `◐ Redelijk uitgewerkt, meer voorbeelden helpen. `;
    } else {
      feedback += `✗ Meer specificiteit en voorbeelden nodig. `;
    }
    
    return feedback;
  };

  const extractKeyPhrases = (text: string): string[] => {
    // Extract meaningful phrases and keywords from criteria
    const phrases: string[] = [];
    
    // Common Dutch prompt engineering terms and their synonyms
    const termMappings: { [key: string]: string[] } = {
      'rol': ['rol', 'persona', 'karakter', 'expert', 'specialist'],
      'context': ['context', 'achtergrond', 'situatie', 'omgeving'],
      'taak': ['taak', 'opdracht', 'doel', 'assignment', 'instructie'],
      'structuur': ['structuur', 'opbouw', 'format', 'indeling', 'organisatie'],
      'voorbeeld': ['voorbeeld', 'sample', 'illustratie', 'demo'],
      'specificeer': ['specificeer', 'detail', 'precies', 'exact', 'concreet'],
      'uitvoer': ['uitvoer', 'output', 'resultaat', 'antwoord'],
      'format': ['format', 'structuur', 'opmaak', 'vorm'],
      'redenering': ['redenering', 'logica', 'stappen', 'proces']
    };
    
    // Extract base terms from the criterion
    Object.keys(termMappings).forEach(baseterm => {
      termMappings[baseterm].forEach(synonym => {
        if (text.includes(synonym)) {
          phrases.push(synonym);
          // Also add the base term if not already included
          if (!phrases.includes(baseterm)) {
            phrases.push(baseterm);
          }
        }
      });
    });
    
    // Extract quoted terms
    const quotedTerms = text.match(/"([^"]+)"/g);
    if (quotedTerms) {
      quotedTerms.forEach(term => phrases.push(term.replace(/"/g, '')));
    }
    
    // Extract capitalized terms (likely to be important)
    const capitalizedWords = text.match(/\b[A-Z][a-z]+\b/g);
    if (capitalizedWords) {
      phrases.push(...capitalizedWords.map(w => w.toLowerCase()));
    }
    
    // Split criterion into meaningful chunks and extract key terms
    const words = text.split(/\s+/);
    const importantWords = words.filter(word => 
      word.length > 4 && 
      !['heeft', 'moet', 'zijn', 'wordt', 'kunnen', 'zouden', 'wanneer', 'omdat'].includes(word)
    );
    
    phrases.push(...importantWords);
    
    return [...new Set(phrases)]; // Remove duplicates
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
  const averageScore = evaluationEntries.length > 0 
    ? (evaluationEntries.reduce((sum, [_, evalResult]) => sum + evalResult.score, 0) / evaluationEntries.length) * 100
    : 0;

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
                <div className={`text-2xl font-bold ${
                  averageScore >= 80 ? 'text-green-600' : 
                  averageScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {Math.round(averageScore)}%
                </div>
                <div className="text-sm text-gray-600">
                  {completedCriteria} {t('hint.of')} {totalCriteria} {t('criteria.met')}
                </div>
                <Progress value={averageScore} className="h-2 mt-2" />
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
                            <div className="text-xs text-gray-600">
                              Score: {Math.round(evalResult.score * 100)}%
                            </div>
                            {showDebug && (
                              <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                                <strong>Debug info:</strong><br />
                                {evalResult.feedback}<br />
                                {evalResult.matchedKeywords.length > 0 && (
                                  <>Gevonden termen: {evalResult.matchedKeywords.join(', ')}</>
                                )}
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
