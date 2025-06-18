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

  // Specific evaluation criteria per exercise
  const getEvaluationCriteria = (exerciseId: string) => {
    const criteriaMap: { [key: string]: string[] } = {
      'pe2-l1-e1': [
        'Bevat een duidelijke structuur',
        'Specificeert de gewenste lengte (50 woorden)', 
        'Noemt het onderwerp (verhaal over kat en ruimteschip)',
        'Definieert de hoofdpersoon (kat)'
      ],
      'pe2-l1-e2': [
        'Geeft duidelijke context (voor huiseigenaren)',
        'Specificeert de doelgroep',
        'Vraagt naar concrete voordelen',
        'Is specifiek over de situatie (zonnepanelen installeren)'
      ],
      'pe2-l1-e3': [
        'Wijst een specifieke rol toe (ervaren reisgids)',
        'Vraagt om gedetailleerde informatie',
        'Specificeert de focus (historische bezienswaardigheden)',
        'Vraagt om praktische details (openingstijden, bezoektijd)'
      ],
      'pe2-l2-e1': [
        'Bevat concrete voorbeelden (few-shot)',
        'Toont het patroon input-output',
        'Geeft duidelijke instructies',
        'Specificeert het gewenste format'
      ],
      'pe2-l2-e2': [
        'Specificeert het gewenste output format (JSON)',
        'Definieert de structuur van de output',
        'Vraagt om specifieke velden',
        'Is precies in de formattering eisen'
      ],
      'pe2-l2-e3': [
        'Specificeert wat NIET moet worden gebruikt',
        'Definieert duidelijke beperkingen',
        'Stimuleert creativiteit binnen grenzen',
        'Biedt een alternatieve focus'
      ],
      'pe2-l3-e1': [
        'Vraagt om stapsgewijze uitleg',
        'Stimuleert het tonen van denkproces',
        'Heeft een duidelijke logische structuur',
        'Vraagt om expliciet redeneren'
      ],
      'pe2-l3-e2': [
        'Definieert creatieve constraints',
        'Specificeert de woordlimiet (maximaal 5 woorden)',
        'Vereist het gebruik van een specifiek woord (energie)',
        'Vraagt om meerdere varianten'
      ],
      'pe2-l3-e3': [
        'Toont iteratief denken',
        'Analyseert de vorige output',
        'Specificeert verbeteringen per iteratie',
        'Wordt steeds specifieker en gerichter'
      ]
    };
    
    return criteriaMap[exerciseId] || [
      'Bevat duidelijke instructies',
      'Heeft specifieke context', 
      'Gebruikt goede structuur',
      'Geeft concrete voorbeelden'
    ];
  };

  const evaluatePrompt = () => {
    const criteria = getEvaluationCriteria(exercise.id);
    const newEvaluation: { [key: string]: boolean } = {};
    const userText = userPrompt.toLowerCase();
    
    // Exercise-specific evaluation logic
    criteria.forEach(criterion => {
      let passes = false;
      
      switch (exercise.id) {
        case 'pe2-l1-e1':
          if (criterion.includes('structuur')) {
            passes = userPrompt.includes('\n') || userPrompt.includes(':') || userPrompt.includes('-') || userPrompt.length > 30;
          } else if (criterion.includes('lengte')) {
            passes = userText.includes('50') || userText.includes('vijftig');
          } else if (criterion.includes('onderwerp')) {
            passes = (userText.includes('kat') || userText.includes('cat')) && (userText.includes('ruimteschip') || userText.includes('ruimte'));
          } else if (criterion.includes('hoofdpersoon')) {
            passes = userText.includes('kat') || userText.includes('cat') || userText.includes('hoofdpersoon');
          }
          break;
          
        case 'pe2-l1-e2':
          if (criterion.includes('context')) {
            passes = userText.includes('huiseigenaar') || userText.includes('eigenaar') || userText.includes('woning');
          } else if (criterion.includes('doelgroep')) {
            passes = userText.includes('voor') || userText.includes('aan') || userText.includes('huiseigenaar');
          } else if (criterion.includes('voordelen')) {
            passes = userText.includes('voordeel') || userText.includes('benefit') || userText.includes('waarom');
          } else if (criterion.includes('zonnepanelen')) {
            passes = userText.includes('zonnepaneel') || userText.includes('installeren') || userText.includes('dak');
          }
          break;
          
        case 'pe2-l1-e3':
          if (criterion.includes('rol')) {
            passes = userText.includes('je bent') || userText.includes('als') || userText.includes('reisgids');
          } else if (criterion.includes('gedetailleerd')) {
            passes = userText.includes('gedetailleerd') || userText.includes('uitgebreid') || userText.includes('schema');
          } else if (criterion.includes('historisch')) {
            passes = userText.includes('historisch') || userText.includes('geschiedenis') || userText.includes('cultuur');
          } else if (criterion.includes('praktisch')) {
            passes = userText.includes('openingstijd') || userText.includes('tijd') || userText.includes('duur');
          }
          break;
          
        case 'pe2-l2-e1':
          if (criterion.includes('voorbeelden')) {
            passes = userText.includes('voorbeeld') || userText.includes('input') || userText.includes('output');
          } else if (criterion.includes('patroon')) {
            passes = userText.includes('input:') || userText.includes('output:') || userText.includes('-');
          } else if (criterion.includes('instructies')) {
            passes = userText.includes('genereer') || userText.includes('maak') || userText.includes('schrijf');
          } else if (criterion.includes('format')) {
            passes = userPrompt.includes(':') || userPrompt.includes('\n') || userPrompt.length > 50;
          }
          break;
          
        case 'pe2-l2-e2':
          if (criterion.includes('JSON')) {
            passes = userText.includes('json') || userText.includes('array') || userText.includes('object');
          } else if (criterion.includes('structuur')) {
            passes = userText.includes('structuur') || userText.includes('formaat') || userText.includes('format');
          } else if (criterion.includes('velden')) {
            passes = userText.includes('veld') || userText.includes('sleutel') || userText.includes('key');
          } else if (criterion.includes('formattering')) {
            passes = userText.includes('formatteer') || userText.includes('als een') || userText.includes('output');
          }
          break;
          
        case 'pe2-l2-e3':
          if (criterion.includes('NIET')) {
            passes = userText.includes('niet') || userText.includes('vermijd') || userText.includes('zonder');
          } else if (criterion.includes('beperkingen')) {
            passes = userText.includes('geen') || userText.includes('mag niet') || userText.includes('beperking');
          } else if (criterion.includes('creativiteit')) {
            passes = userText.includes('origineel') || userText.includes('creatief') || userText.includes('anders');
          } else if (criterion.includes('alternatieve')) {
            passes = userText.includes('focus') || userText.includes('alternatief') || userText.includes('anders');
          }
          break;
          
        case 'pe2-l3-e1':
          if (criterion.includes('stapsgewijs')) {
            passes = userText.includes('stap') || userText.includes('stappen') || userText.includes('voor stap');
          } else if (criterion.includes('denkproces')) {
            passes = userText.includes('denk') || userText.includes('redeneer') || userText.includes('proces');
          } else if (criterion.includes('logisch')) {
            passes = userText.includes('logisch') || userText.includes('order') || userText.includes('volgorde');
          } else if (criterion.includes('redeneren')) {
            passes = userText.includes('laat zien') || userText.includes('toon') || userText.includes('uitleg');
          }
          break;
          
        case 'pe2-l3-e2':
          if (criterion.includes('constraints')) {
            passes = userText.includes('maximaal') || userText.includes('beperkt') || userText.includes('constraint');
          } else if (criterion.includes('woordlimiet')) {
            passes = userText.includes('5 woorden') || userText.includes('vijf woorden') || userText.includes('maximaal');
          } else if (criterion.includes('energie')) {
            passes = userText.includes('energie');
          } else if (criterion.includes('varianten')) {
            passes = userText.includes('drie') || userText.includes('meerdere') || userText.includes('varianten');
          }
          break;
          
        case 'pe2-l3-e3':
          if (criterion.includes('iteratief')) {
            passes = userText.includes('iteratie') || userText.includes('verfijn') || userText.includes('verbeter');
          } else if (criterion.includes('analyseert')) {
            passes = userText.includes('analyseer') || userText.includes('bekijk') || userText.includes('evalueer');
          } else if (criterion.includes('verbeteringen')) {
            passes = userText.includes('verbetering') || userText.includes('beter') || userText.includes('aanpassing');
          } else if (criterion.includes('specifieker')) {
            passes = userText.includes('specifiek') || userText.includes('gedetailleerd') || userText.includes('precies');
          }
          break;
          
        default:
          // Fallback evaluation
          const keywords = criterion.toLowerCase().split(/[^\w]+/).filter(word => word.length > 2);
          passes = keywords.some(keyword => userText.includes(keyword));
      }
      
      newEvaluation[criterion] = passes;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
    
    const score = Object.values(newEvaluation).filter(Boolean).length / criteria.length * 100;
    onComplete?.(score);
  };

  const resetExercise = () => {
    setUserPrompt("");
    setEvaluation({});
    setIsEvaluated(false);
    setShowHints(false);
  };

  const criteria = getEvaluationCriteria(exercise.id);
  const completedCriteria = Object.values(evaluation).filter(Boolean).length;
  const totalCriteria = criteria.length;

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
                  <div className="text-lg font-bold text-gray-700 mb-1">
                    {completedCriteria} van {totalCriteria} criteria behaald
                  </div>
                  <div className={`text-sm ${
                    completedCriteria >= Math.ceil(totalCriteria * 0.75) ? 'text-green-600' : 
                    completedCriteria >= Math.ceil(totalCriteria * 0.5) ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {completedCriteria >= Math.ceil(totalCriteria * 0.75) ? 'Uitstekend!' : 
                     completedCriteria >= Math.ceil(totalCriteria * 0.5) ? 'Goed bezig!' : 'Probeer nog eens!'}
                  </div>
                  <Progress value={(completedCriteria / totalCriteria) * 100} className="h-2 mt-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Evaluatiecriteria:</h4>
                  {criteria.map((criterion, index) => (
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
