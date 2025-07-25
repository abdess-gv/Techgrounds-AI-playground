
import { useSearchParams } from 'react-router-dom';
import { Suspense } from 'react';
import EmbeddablePromptDatabase from '@/components/PromptEngineering/EmbeddablePromptDatabase';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Database wordt geladen...</p>
    </div>
  </div>
);

const DatabaseEmbedNL = () => {
  const [searchParams] = useSearchParams();
  
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const showSearch = searchParams.get('search') !== 'false';
  const category = searchParams.get('category') || 'all';
  const difficulty = searchParams.get('difficulty') || 'all';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingFallback />}>
            <EmbeddablePromptDatabase
              compact={compact}
              showHeader={showHeader}
              showLegend={showLegend}
              showSearch={showSearch}
              category={category}
              difficulty={difficulty}
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

export default DatabaseEmbedNL;
