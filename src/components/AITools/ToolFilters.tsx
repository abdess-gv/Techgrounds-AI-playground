
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, X } from "lucide-react";
import { ToolFilters, ToolCategory, PricingModel, SourceType } from "@/types/Tool";
import { toolCategories, pricingOptions, sourceOptions } from "@/data/aiTools";

interface ToolFiltersProps {
  filters: ToolFilters;
  onFiltersChange: (filters: ToolFilters) => void;
  totalTools: number;
  filteredCount: number;
}

const ToolFiltersComponent = ({ filters, onFiltersChange, totalTools, filteredCount }: ToolFiltersProps) => {
  const updateFilters = (updates: Partial<ToolFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: ToolCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const togglePricing = (pricing: PricingModel) => {
    const newPricing = filters.pricingModels.includes(pricing)
      ? filters.pricingModels.filter(p => p !== pricing)
      : [...filters.pricingModels, pricing];
    updateFilters({ pricingModels: newPricing });
  };

  const toggleSource = (source: SourceType) => {
    const newSources = filters.sourceTypes.includes(source)
      ? filters.sourceTypes.filter(s => s !== source)
      : [...filters.sourceTypes, source];
    updateFilters({ sourceTypes: newSources });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      categories: [],
      pricingModels: [],
      sourceTypes: [],
      verified: null
    });
  };

  const hasActiveFilters = filters.search || 
    filters.categories.length > 0 || 
    filters.pricingModels.length > 0 || 
    filters.sourceTypes.length > 0 || 
    filters.verified !== null;

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
        <div className="text-sm text-gray-600">
          {filteredCount} van {totalTools} tools
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Zoeken</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Zoek tools..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Categorieën</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {toolCategories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={filters.categories.includes(category.value as ToolCategory)}
                  onCheckedChange={() => toggleCategory(category.value as ToolCategory)}
                />
                <label
                  htmlFor={category.value}
                  className="text-sm flex-1 cursor-pointer hover:text-blue-600"
                >
                  {category.label}
                </label>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Pricing Model</label>
          <div className="space-y-2">
            {pricingOptions.map((pricing) => (
              <div key={pricing.value} className="flex items-center space-x-2">
                <Checkbox
                  id={pricing.value}
                  checked={filters.pricingModels.includes(pricing.value as PricingModel)}
                  onCheckedChange={() => togglePricing(pricing.value as PricingModel)}
                />
                <label
                  htmlFor={pricing.value}
                  className="text-sm flex-1 cursor-pointer hover:text-blue-600"
                >
                  {pricing.label}
                </label>
                <Badge variant="secondary" className="text-xs">
                  {pricing.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Source Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Bron Type</label>
          <div className="space-y-2">
            {sourceOptions.map((source) => (
              <div key={source.value} className="flex items-center space-x-2">
                <Checkbox
                  id={source.value}
                  checked={filters.sourceTypes.includes(source.value as SourceType)}
                  onCheckedChange={() => toggleSource(source.value as SourceType)}
                />
                <label
                  htmlFor={source.value}
                  className="text-sm flex-1 cursor-pointer hover:text-blue-600"
                >
                  {source.label}
                </label>
                <Badge variant="secondary" className="text-xs">
                  {source.count}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Only */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified === true}
              onCheckedChange={(checked) => updateFilters({ verified: checked ? true : null })}
            />
            <label htmlFor="verified" className="text-sm cursor-pointer hover:text-blue-600">
              Alleen geverifieerde tools
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolFiltersComponent;
