
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { toast } from "sonner";
import PromptHighlighter from './PromptHighlighter';

interface EmbeddableFrameworkLibraryProps {
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  category?: string;
}

const frameworks = [
  {
    id: 'star',
    name: 'STAR Framework',
    category: 'Zakelijk',
    description: 'Situatie, Taak, Actie, Resultaat - perfect voor gestructureerde responses',
    template: `**Situatie**: [Beschrijf de context en achtergrond]
**Taak**: [Wat moet er worden bereikt?]
**Actie**: [Welke specifieke stappen moeten worden genomen?]
**Resultaat**: [Wat is het gewenste eindresultaat?]

Voorbeeld:
**Situatie**: Ik ben marketingmanager bij een startup
**Taak**: Ontwikkel een social media strategie voor Q1
**Actie**: Analyseer doelgroep, kies platforms, creëer contentkalender
**Resultaat**: 50% meer volgers en 25% meer engagement`,
    difficulty: 'beginner' as const,
    useCases: ['Bedrijfscommunicatie', 'Projectplanning', 'Presentaties']
  },
  {
    id: 'race',
    name: 'RACE Framework',
    category: 'Content',
    description: 'Reach, Act, Convert, Engage - marketing en content strategie',
    template: `**Reach**: [Hoe bereik je je doelgroep?]
**Act**: [Welke actie moet de gebruiker ondernemen?]
**Convert**: [Hoe converteer je interesse naar resultaat?]
**Engage**: [Hoe behoud je betrokkenheid?]

Voor content creatie:
**Reach**: SEO-geoptimaliseerde blog posts
**Act**: Newsletter aanmelding
**Convert**: Free trial aanbieden
**Engage**: Wekelijkse tips en tutorials`,
    difficulty: 'intermediate' as const,
    useCases: ['Marketing', 'Content strategie', 'Lead generatie']
  },
  {
    id: 'smart',
    name: 'SMART Doelen',
    category: 'Planning',
    description: 'Specifiek, Meetbaar, Acceptabel, Realistisch, Tijdgebonden',
    template: `**Specifiek**: [Wat precies?]
**Meetbaar**: [Hoe meet je succes?]
**Acceptabel**: [Is het haalbaar?]
**Realistisch**: [Past het bij de middelen?]
**Tijdgebonden**: [Wanneer moet het klaar zijn?]

Voorbeeld:
**Specifiek**: Website verkeer verhogen
**Meetbaar**: 40% meer organisch verkeer
**Acceptabel**: Team heeft SEO kennis
**Realistisch**: Budget voor tools beschikbaar
**Tijdgebonden**: Binnen 6 maanden`,
    difficulty: 'beginner' as const,
    useCases: ['Doelstelling', 'Projectmanagement', 'KPI definitie']
  }
];

const EmbeddableFrameworkLibrary = ({ 
  compact = false, 
  showHeader = true, 
  showLegend = true,
  category = 'all'
}: EmbeddableFrameworkLibraryProps) => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [expandedFrameworks, setExpandedFrameworks] = useState<Set<string>>(new Set());

  const filteredFrameworks = category === 'all' 
    ? frameworks 
    : frameworks.filter(f => f.category === category);

  const copyTemplate = (template: string, name: string) => {
    navigator.clipboard.writeText(template);
    toast.success(`${name} template gekopieerd!`);
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedFrameworks);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFrameworks(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-4 ${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto`}>
      {showHeader && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Nederlandse Prompt Frameworks
          </h2>
          <p className="text-gray-600">
            Bewezen methodologieën voor effectieve prompt constructie
          </p>
        </div>
      )}

      {showLegend && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Framework Componenten:</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge className="bg-purple-100 text-purple-800">Structuur</Badge>
              <Badge className="bg-green-100 text-green-800">Template</Badge>
              <Badge className="bg-orange-100 text-orange-800">Voorbeeld</Badge>
              <Badge className="bg-blue-100 text-blue-800">Toepassingen</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {filteredFrameworks.map((framework) => {
          const isExpanded = expandedFrameworks.has(framework.id);
          
          return (
            <Card key={framework.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(framework.id)}
                      className="p-1"
                    >
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                    <div>
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={getDifficultyColor(framework.difficulty)}>
                      {framework.difficulty === 'beginner' ? 'Beginner' :
                       framework.difficulty === 'intermediate' ? 'Gemiddeld' : 'Gevorderd'}
                    </Badge>
                    <Badge variant="outline">{framework.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">Framework Template</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyTemplate(framework.template, framework.name)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Kopieer
                      </Button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <PromptHighlighter text={framework.template} />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Toepassingen</h4>
                    <div className="flex flex-wrap gap-2">
                      {framework.useCases.map((useCase, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmbeddableFrameworkLibrary;
