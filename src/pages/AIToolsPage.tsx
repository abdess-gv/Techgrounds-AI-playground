
import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, ArrowLeft, Grid, List, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import ToolCard from '@/components/AITools/ToolCard';
import ToolFiltersComponent from '@/components/AITools/ToolFilters';
import { ToolFilters } from '@/types/Tool';
import { aiTools } from '@/data/aiTools';

const AIToolsPage = () => {
  const [filters, setFilters] = useState<ToolFilters>({
    search: '',
    categories: [],
    pricingModels: [],
    sourceTypes: [],
    verified: null
  });
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'name' | 'recent'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredTools = useMemo(() => {
    let filtered = aiTools.filter(tool => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(tool.category)) {
        return false;
      }

      // Pricing filter
      if (filters.pricingModels.length > 0 && !filters.pricingModels.includes(tool.pricingModel)) {
        return false;
      }

      // Source type filter
      if (filters.sourceTypes.length > 0 && !filters.sourceTypes.includes(tool.sourceType)) {
        return false;
      }

      // Verified filter
      if (filters.verified === true && !tool.verified) {
        return false;
      }

      return true;
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  return (
    <>
      <SEO 
        title="AI Tools Database - Ontdek de Beste AI Tools"
        description="Uitgebreide database van AI tools voor automatisering, ontwikkeling, content creatie en meer. Vind de perfecte AI tool voor jouw behoeften."
        keywords="AI tools, automation tools, development tools, AI database, prompt engineering tools, machine learning tools"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center space-x-4 mb-6">
              <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Terug naar Home</span>
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                  <Brain className="h-6 w-6" />
                  <span className="font-medium">AI Tools Database</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Ontdek de Beste
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  AI Tools
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Van automatisering tot ontwikkeling - vind de perfecte AI tools voor jouw workflow. 
                Gratis en betaalde opties, open source en proprietary oplossingen.
              </p>
              
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold">{aiTools.length}+</div>
                  <div className="text-blue-200">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">13</div>
                  <div className="text-blue-200">Categorieën</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">Gratis</div>
                  <div className="text-blue-200">Te gebruiken</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ToolFiltersComponent
                filters={filters}
                onFiltersChange={setFilters}
                totalTools={aiTools.length}
                filteredCount={filteredTools.length}
              />
            </div>

            {/* Tools Grid */}
            <div className="lg:col-span-3">
              {/* Toolbar */}
              <div className="bg-white rounded-lg border p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-sm">
                    {filteredTools.length} tools gevonden
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sorteer op:</span>
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>Populariteit</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="rating">Beoordeling</SelectItem>
                      <SelectItem value="name">Naam</SelectItem>
                      <SelectItem value="recent">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Recent bijgewerkt</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tools Display */}
              {filteredTools.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Geen tools gevonden
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Probeer je filters aan te passen om meer resultaten te vinden.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      search: '',
                      categories: [],
                      pricingModels: [],
                      sourceTypes: [],
                      verified: null
                    })}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIToolsPage;
