
import { useSearchParams } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import EmbeddableExercise from '@/components/PromptEngineering/EmbeddableExercise';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { getExerciseDatabase } from '@/components/PromptEngineering/ExerciseData';

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Prompt Engineering oefening wordt geladen...</p>
    </div>
  </div>
);

const PromptEngineeringEmbedNL = () => {
  const [searchParams] = useSearchParams();
  
  const exerciseId = searchParams.get('exercise') || '';
  const level = (searchParams.get('level') as 'beginner' | 'intermediate' | 'advanced') || 'beginner';
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const showNavigator = searchParams.get('navigator') !== 'false';

  const exercise = useMemo(() => {
    const exerciseDatabase = getExerciseDatabase('nl');
    
    // Get exercises for the specified level
    const levelExercises = exerciseDatabase[level] || [];
    
    // If specific exercise ID is provided, find it across all levels
    if (exerciseId) {
      const allExercises = [
        ...exerciseDatabase.beginner,
        ...exerciseDatabase.intermediate,
        ...exerciseDatabase.advanced
      ];
      const foundExercise = allExercises.find(ex => ex.id === exerciseId);
      if (foundExercise) {
        return foundExercise;
      }
    }
    
    // Return first exercise of the level
    return levelExercises[0];
  }, [level, exerciseId]);

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Geen prompt engineering oefening gevonden</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingFallback />}>
            <EmbeddableExercise
              exercise={exercise}
              compact={compact}
              showHeader={showHeader}
              showLegend={showLegend}
              language="nl"
            />
          </Suspense>
          
          <Card className="mt-8 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-blue-600">
                Aangedreven door <strong>Techgrounds AI-Playground</strong> - Nederlands AI Educatieplatform
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PromptEngineeringEmbedNL;
