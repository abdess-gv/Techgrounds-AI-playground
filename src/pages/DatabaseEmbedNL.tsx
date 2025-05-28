
import { useSearchParams } from 'react-router-dom';
import EmbeddablePromptDatabase from '@/components/PromptEngineering/EmbeddablePromptDatabase';
import { Card, CardContent } from '@/components/ui/card';

const DatabaseEmbedNL = () => {
  const [searchParams] = useSearchParams();
  
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const showSearch = searchParams.get('search') !== 'false';
  const category = searchParams.get('category') || 'all';
  const difficulty = searchParams.get('difficulty') || 'all';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <EmbeddablePromptDatabase
          compact={compact}
          showHeader={showHeader}
          showLegend={showLegend}
          showSearch={showSearch}
          category={category}
          difficulty={difficulty}
        />
        
        {/* Branding */}
        <Card className="mt-8 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-blue-600">
              Aangedreven door <strong>NoteAI</strong> Nederlandse Prompt Engineering Platform
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseEmbedNL;
