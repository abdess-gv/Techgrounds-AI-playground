
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EmbeddableExercise from "@/components/PromptEngineering/EmbeddableExercise";
import { exerciseDatabase } from "@/components/PromptEngineering/ExerciseData";
import SEO from "@/components/SEO";
import { ArrowLeft, Target, BookOpen } from "lucide-react";

const ExerciseEmbed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level') as "beginner" | "intermediate" | "advanced" || "beginner";
  const exerciseId = searchParams.get('exercise') || "";
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const showSelector = searchParams.get('selector') !== 'false';
  const language = searchParams.get('lang') || 'en';

  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">(level);
  const [selectedExerciseId, setSelectedExerciseId] = useState(exerciseId);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  // Check if accessed from Dutch page or has Dutch language parameter
  const isDutch = language === 'nl' || window.location.pathname.includes('/nl');

  const exercises = exerciseDatabase[selectedLevel] || [];
  const currentExercise = exercises.find(ex => ex.id === selectedExerciseId) || exercises[0];

  // Dutch translations
  const t = (key: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      en: {
        'exercise.selection': 'Exercise Selection',
        'difficulty.level': 'Difficulty Level',
        'exercise.count': 'Exercise',
        'exercise.available': 'available',
        'progress': 'Progress',
        'completed': 'completed',
        'difficulty.beginner': 'Beginner',
        'difficulty.intermediate': 'Intermediate', 
        'difficulty.advanced': 'Advanced',
        'concepts.basic': 'Basic concepts',
        'techniques.advanced': 'Advanced techniques',
        'level.expert': 'Expert level',
        'exercise.notfound': 'Exercise Not Found',
        'exercise.notfound.desc': 'The requested prompt engineering exercise could not be found.',
        'no.exercises': 'No Exercises Available',
        'no.exercises.desc': 'No exercises found for the selected level.'
      },
      nl: {
        'exercise.selection': 'Oefening Selectie',
        'difficulty.level': 'Moeilijkheidsgraad',
        'exercise.count': 'Oefening',
        'exercise.available': 'beschikbaar',
        'progress': 'Voortgang',
        'completed': 'voltooid',
        'difficulty.beginner': 'Beginner',
        'difficulty.intermediate': 'Gemiddeld',
        'difficulty.advanced': 'Gevorderd',
        'concepts.basic': 'Basis concepten',
        'techniques.advanced': 'Geavanceerde technieken',
        'level.expert': 'Expert niveau',
        'exercise.notfound': 'Oefening Niet Gevonden',
        'exercise.notfound.desc': 'De gevraagde prompt engineering oefening kon niet worden gevonden.',
        'no.exercises': 'Geen Oefeningen Beschikbaar',
        'no.exercises.desc': 'Geen oefeningen gevonden voor het geselecteerde niveau.'
      }
    };
    
    const lang = isDutch ? 'nl' : 'en';
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  useEffect(() => {
    if (!selectedExerciseId && exercises.length > 0) {
      setSelectedExerciseId(exercises[0].id);
    }
  }, [selectedLevel, exercises, selectedExerciseId]);

  const handleLevelChange = (newLevel: "beginner" | "intermediate" | "advanced") => {
    setSelectedLevel(newLevel);
    const newExercises = exerciseDatabase[newLevel] || [];
    if (newExercises.length > 0) {
      setSelectedExerciseId(newExercises[0].id);
    }
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set('level', newLevel);
    newParams.set('exercise', newExercises[0]?.id || '');
    setSearchParams(newParams);
  };

  const handleExerciseChange = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set('exercise', exerciseId);
    setSearchParams(newParams);
  };

  const handleComplete = (score: number) => {
    if (currentExercise) {
      setCompletedExercises(prev => new Set([...prev, currentExercise.id]));
    }
    
    // Post message to parent window if embedded in iframe
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'exercise-complete',
        exerciseId: currentExercise?.id,
        level: selectedLevel,
        score,
        timestamp: new Date().toISOString()
      }, '*');
    }
    
    console.log(`Exercise ${currentExercise?.id} completed with score: ${score}%`);
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  if (!currentExercise) {
    return (
      <>
        <SEO 
          title={t('exercise.notfound')}
          description={t('exercise.notfound.desc')}
          noindex={true}
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('no.exercises')}</h2>
            <p className="text-gray-600">{t('no.exercises.desc')}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${currentExercise.title} - Prompt Engineering ${t('exercise.count')}`}
        description={`Interactieve prompt engineering oefening: ${currentExercise.title}. ${currentExercise.description}`}
        noindex={true}
      />
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 ${
        compact ? 'p-2' : 'p-4'
      }`}>
        <div className={`${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto space-y-4`}>
          
          {/* Exercise Selector */}
          {showSelector && (
            <Card className="border-2 border-purple-200">
              <CardHeader className={`bg-gradient-to-r from-purple-50 to-blue-50 ${compact ? 'p-4' : ''}`}>
                <CardTitle className={`flex items-center space-x-2 ${compact ? 'text-lg' : ''}`}>
                  <Target className={`${compact ? 'h-4 w-4' : 'h-6 w-6'} text-purple-600`} />
                  <span className="text-purple-900">{t('exercise.selection')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className={`space-y-4 ${compact ? 'p-4' : 'pt-6'}`}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('difficulty.level')}
                    </label>
                    <Select value={selectedLevel} onValueChange={handleLevelChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800 text-xs">{t('difficulty.beginner')}</Badge>
                            <span>{t('concepts.basic')}</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="intermediate">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">{t('difficulty.intermediate')}</Badge>
                            <span>{t('techniques.advanced')}</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="advanced">
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800 text-xs">{t('difficulty.advanced')}</Badge>
                            <span>{t('level.expert')}</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('exercise.count')} ({exercises.length} {t('exercise.available')})
                    </label>
                    <Select value={selectedExerciseId} onValueChange={handleExerciseChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {exercises.map((exercise) => (
                          <SelectItem key={exercise.id} value={exercise.id}>
                            <div className="flex items-center justify-between w-full">
                              <span className="truncate">{exercise.title}</span>
                              {completedExercises.has(exercise.id) && (
                                <Badge className="bg-green-100 text-green-800 text-xs ml-2">✓</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-800">
                      {t('progress')}: {completedExercises.size} / {exercises.length} {t('completed')}
                    </span>
                    <Badge className={difficultyColors[selectedLevel]}>
                      {t(`difficulty.${selectedLevel}`)}
                    </Badge>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${exercises.length > 0 ? (completedExercises.size / exercises.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Exercise Component */}
          <EmbeddableExercise
            exercise={currentExercise}
            showHeader={showHeader}
            showLegend={showLegend}
            compact={compact}
            onComplete={handleComplete}
            language={isDutch ? 'nl' : 'en'}
          />
        </div>
      </div>
    </>
  );
};

export default ExerciseEmbed;
