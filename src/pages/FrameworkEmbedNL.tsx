
import { useSearchParams } from 'react-router-dom';
import EmbeddableFrameworkLibrary from '@/components/PromptEngineering/EmbeddableFrameworkLibrary';
import { Card, CardContent } from '@/components/ui/card';

const FrameworkEmbedNL = () => {
  const [searchParams] = useSearchParams();
  
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const category = searchParams.get('category') || 'all';

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <EmbeddableFrameworkLibrary
          compact={compact}
          showHeader={showHeader}
          showLegend={showLegend}
          category={category}
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

export default FrameworkEmbedNL;
