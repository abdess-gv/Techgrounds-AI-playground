
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EmbeddableExercise from "@/components/PromptEngineering/EmbeddableExercise";
import { exerciseDatabase } from "@/components/PromptEngineering/ExerciseData";
import SEO from "@/components/SEO";
import { ArrowLeft, Target, BookOpen, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const ExerciseEmbedNL = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get('level') as "beginner" | "intermediate" | "advanced" || "beginner";
  const exerciseId = searchParams.get('exercise') || "";
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const showSelector = searchParams.get('selector') !== 'false';

  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">(level);
  const [selectedExerciseId, setSelectedExerciseId] = useState(exerciseId);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const exercises = exerciseDatabase[selectedLevel] || [];
  const currentExercise = exercises.find(ex => ex.id === selectedExerciseId) || exercises[0];

  // Nederlandse vertalingen
  const t = (key: string) => {
    const translations: { [key: string]: string } = {
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
      'no.exercises.desc': 'Geen oefeningen gevonden voor het geselecteerde niveau.',
      'back.to.english': 'Terug naar Engelse Versie',
      'dutch.version': 'Nederlandse Versie',
      'embed.code': 'Insluitcode',
      'copy.embed': 'Kopieer Insluitcode',
      'embed.copied': 'Insluitcode gekopieerd!',
      'generate.embed': 'Genereer Insluitcode',
      'embed.preview': 'Voorbeeld Insluiting',
      'embed.title': 'Insluiting Configuratie',
      'embed.description': 'Pas de instellingen aan en kopieer de code om deze oefening in je eigen website in te sluiten.'
    };
    
    return translations[key] || key;
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
    
    console.log(`Oefening ${currentExercise?.id} voltooid met score: ${score}%`);
  };

  const generateEmbedCode = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      level: selectedLevel,
      exercise: selectedExerciseId,
      lang: 'nl',
      ...(compact && { compact: 'true' }),
      ...(!showHeader && { header: 'false' }),
      ...(!showLegend && { legend: 'false' }),
      ...(!showSelector && { selector: 'false' })
    });

    return `<iframe src="${baseUrl}/exercise-embed-nl?${params.toString()}" width="100%" height="800" frameborder="0"></iframe>`;
  };

  const copyEmbedCode = () => {
    const embedCode = generateEmbedCode();
    navigator.clipboard.writeText(embedCode);
    
    // Simple notification (you could use a toast here)
    const button = document.getElementById('copy-embed-btn');
    if (button) {
      const originalText = button.textContent;
      button.textContent = t('embed.copied');
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
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
        title={`${currentExercise.title} - Nederlandse Prompt Engineering ${t('exercise.count')}`}
        description={`Interactieve Nederlandse prompt engineering oefening: ${currentExercise.title}. ${currentExercise.description}`}
        noindex={true}
      />
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 ${
        compact ? 'p-2' : 'p-4'
      }`}>
        <div className={`${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto space-y-4`}>
          
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link to="/exercise-embed">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('back.to.english')}
                </Button>
              </Link>
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                <Globe className="h-3 w-3 mr-1" />
                {t('dutch.version')}
              </Badge>
            </div>
          </div>

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

          {/* Embed Code Generator */}
          {!compact && (
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6 text-green-600" />
                  <span className="text-green-900">{t('embed.title')}</span>
                </CardTitle>
                <p className="text-green-700 text-sm mt-2">
                  {t('embed.description')}
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{t('embed.code')}</span>
                    <Button 
                      id="copy-embed-btn"
                      variant="outline" 
                      size="sm"
                      onClick={copyEmbedCode}
                    >
                      {t('copy.embed')}
                    </Button>
                  </div>
                  <code className="text-xs bg-white p-2 rounded border block overflow-x-auto">
                    {generateEmbedCode()}
                  </code>
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
            language="nl"
          />
        </div>
      </div>
    </>
  );
};

export default ExerciseEmbedNL;
