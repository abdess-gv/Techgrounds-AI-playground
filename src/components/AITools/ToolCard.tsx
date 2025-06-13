import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Shield } from "lucide-react";
import { Tool } from "@/types/Tool";

interface ToolCardProps {
  tool: Tool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'freemium': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-orange-100 text-orange-800';
      case 'subscription': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    return source === 'open-source' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-slate-100 text-slate-800';
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'automation': 'Automatisering',
      'development': 'Ontwikkeling',
      'analysis': 'Analyse',
      'content-creation': 'Content Creatie',
      'productivity': 'Productiviteit',
      'frameworks': 'Frameworks',
      'chatbots': 'Chatbots',
      'image-generation': 'Image Generatie',
      'audio': 'Audio',
      'video': 'Video',
      'data-analysis': 'Data Analyse',
      'code-assistance': 'Code Assistentie',
      'workflow': 'Workflow'
    };
    return categoryMap[category] || category;
  };

  const getPricingLabel = (pricing: string) => {
    const pricingMap: { [key: string]: string } = {
      'free': 'Gratis',
      'freemium': 'Freemium',
      'paid': 'Betaald',
      'subscription': 'Abonnement',
      'one-time': 'Eenmalig'
    };
    return pricingMap[pricing] || pricing;
  };

  const getSourceLabel = (source: string) => {
    return source === 'open-source' ? 'Open Source' : 'Closed Source';
  };

  const handleVisitWebsite = () => {
    if (tool.website && tool.website.trim() !== '') {
      window.open(tool.website, '_blank');
    } else {
      // Optional: Provide user feedback or log a warning
      console.warn(`Attempted to open website for tool "${tool.name}", but URL is missing or empty.`);
      // alert("Website URL is not available for this tool."); // Example user feedback
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
              {tool.name}
            </CardTitle>
            {tool.verified && (
              <Shield className="h-4 w-4 text-blue-600" />
            )}
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm text-gray-600">{tool.rating}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {tool.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {getCategoryLabel(tool.category)}
          </Badge>
          <Badge className={`text-xs ${getPricingColor(tool.pricingModel)}`}>
            {getPricingLabel(tool.pricingModel)}
          </Badge>
          <Badge className={`text-xs ${getSourceColor(tool.sourceType)}`}>
            {getSourceLabel(tool.sourceType)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-gray-900 mb-2">Hoofdfeatures:</h4>
          <ul className="space-y-1">
            {(tool.features || []).slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {(tool.tags || []).slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-300"
            onClick={handleVisitWebsite}
            disabled={!tool.website || tool.website.trim() === ''} // Optionally disable
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Bezoek Website
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
