
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, BookOpen, Target } from 'lucide-react';
import { Exercise } from './types/Exercise';

interface ExerciseNavigatorProps {
  exercises: Exercise[];
  currentExercise: Exercise;
  onExerciseChange: (exercise: Exercise) => void;
  level: 'beginner' | 'intermediate' | 'advanced';
  onLevelChange: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  compact?: boolean;
  language?: 'en' | 'nl';
}

const ExerciseNavigator = ({
  exercises,
  currentExercise,
  onExerciseChange,
  level,
  onLevelChange,
  compact = false,
  language = 'nl'
}: ExerciseNavigatorProps) => {
  const currentIndex = exercises.findIndex(ex => ex.id === currentExercise.id);
  
  const t = (key: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      nl: {
        'exercise.navigator': 'Oefening Navigator',
        'difficulty.level': 'Moeilijkheidsgraad',
        'exercise.selection': 'Oefening Selectie',
        'exercise.count': 'Oefening',
        'of': 'van',
        'previous': 'Vorige',
        'next': 'Volgende',
        'difficulty.beginner': 'Beginner',
        'difficulty.intermediate': 'Gemiddeld',
        'difficulty.advanced': 'Gevorderd'
      },
      en: {
        'exercise.navigator': 'Exercise Navigator',
        'difficulty.level': 'Difficulty Level',
        'exercise.selection': 'Exercise Selection',
        'exercise.count': 'Exercise',
        'of': 'of',
        'previous': 'Previous',
        'next': 'Next',
        'difficulty.beginner': 'Beginner',
        'difficulty.intermediate': 'Intermediate',
        'difficulty.advanced': 'Advanced'
      }
    };
    return translations[language]?.[key] || translations.nl[key] || key;
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < exercises.length - 1;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onExerciseChange(exercises[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onExerciseChange(exercises[currentIndex + 1]);
    }
  };

  return (
    <Card className="border-2 border-blue-200 mb-4">
      <CardHeader className={`bg-gradient-to-r from-blue-50 to-purple-50 ${compact ? 'p-4' : ''}`}>
        <CardTitle className={`flex items-center space-x-2 ${compact ? 'text-lg' : ''}`}>
          <BookOpen className={`${compact ? 'h-4 w-4' : 'h-5 w-5'} text-blue-600`} />
          <span className="text-blue-900">{t('exercise.navigator')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={`space-y-4 ${compact ? 'p-4' : 'pt-6'}`}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('difficulty.level')}
            </label>
            <Select value={level} onValueChange={onLevelChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">{t('difficulty.beginner')}</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="intermediate">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">{t('difficulty.intermediate')}</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="advanced">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-100 text-red-800 text-xs">{t('difficulty.advanced')}</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('exercise.selection')}
            </label>
            <Select value={currentExercise.id} onValueChange={(id) => {
              const exercise = exercises.find(ex => ex.id === id);
              if (exercise) onExerciseChange(exercise);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((exercise) => (
                  <SelectItem key={exercise.id} value={exercise.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="truncate">{exercise.title}</span>
                      <Badge className={difficultyColors[exercise.difficulty]} variant="outline">
                        {exercise.category}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t('previous')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!canGoNext}
            >
              {t('next')}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {t('exercise.count')} {currentIndex + 1} {t('of')} {exercises.length}
            </span>
            <Badge className={difficultyColors[currentExercise.difficulty]}>
              {t(`difficulty.${currentExercise.difficulty}`)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseNavigator;
