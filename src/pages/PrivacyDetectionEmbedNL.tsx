
import { useSearchParams } from 'react-router-dom';
import { Suspense } from 'react';
import PrivacyDetectionExercise from '@/components/PromptEngineering/PrivacyDetectionExercise';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Privacy detectie oefening wordt geladen...</p>
    </div>
  </div>
);

const PrivacyDetectionEmbedNL = () => {
  const [searchParams] = useSearchParams();
  
  const level = (searchParams.get('level') as "beginner" | "intermediate" | "advanced") || "beginner";
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyDetectionExercise
              level={level}
              compact={compact}
              showHeader={showHeader}
              showLegend={showLegend}
              language="nl"
            />
          </Suspense>
          
          <Card className="mt-8 border-red-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-red-600">
                Aangedreven door <strong>Techgrounds AI-Playground</strong> - Nederlands AI Veiligheid & Privacy Platform
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PrivacyDetectionEmbedNL;
