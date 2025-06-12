
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface EmbedOption {
  key: string;
  label: string;
  type: 'boolean' | 'select' | 'string';
  default: any;
  options?: { value: string; label: string; }[];
}

interface EmbedGeneratorProps {
  moduleId: string;
  moduleName: string;
  basePath: string;
  options: EmbedOption[];
  description: string;
}

const EmbedCodeGenerator: React.FC<EmbedGeneratorProps> = ({
  moduleId,
  moduleName,
  basePath,
  options,
  description
}) => {
  const [config, setConfig] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    options.forEach(option => {
      initial[option.key] = option.default;
    });
    return initial;
  });
  
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateUrl = () => {
    const params = new URLSearchParams();
    
    options.forEach(option => {
      const value = config[option.key];
      if (value !== option.default) {
        params.append(option.key, String(value));
      }
    });

    const queryString = params.toString();
    const baseUrl = window.location.origin;
    return `${baseUrl}${basePath}${queryString ? `?${queryString}` : ''}`;
  };

  const generateEmbedCode = () => {
    const url = generateUrl();
    return `<iframe 
  src="${url}" 
  width="100%" 
  height="600" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
</iframe>`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode());
      setCopied(true);
      toast({
        title: "Gekopieerd!",
        description: "Embed code is gekopieerd naar het klembord.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Fout",
        description: "Kon niet kopiëren naar klembord.",
        variant: "destructive",
      });
    }
  };

  const handleConfigChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Embed Generator - {moduleName}</span>
          <Badge variant="secondary">{moduleId}</Badge>
        </CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Configuration Options */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Configuratie Opties</h4>
          <div className="grid gap-4">
            {options.map((option) => (
              <div key={option.key} className="flex items-center justify-between">
                <Label htmlFor={option.key} className="text-sm font-medium">
                  {option.label}
                </Label>
                
                {option.type === 'boolean' && (
                  <Switch
                    id={option.key}
                    checked={config[option.key]}
                    onCheckedChange={(checked) => handleConfigChange(option.key, checked)}
                  />
                )}
                
                {option.type === 'select' && option.options && (
                  <Select
                    value={config[option.key]}
                    onValueChange={(value) => handleConfigChange(option.key, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {option.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Preview URL */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Preview URL</Label>
          <div className="flex items-center space-x-2">
            <code className="flex-1 p-2 bg-gray-100 rounded text-xs break-all">
              {generateUrl()}
            </code>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => window.open(generateUrl(), '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Embed Code */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Embed Code</Label>
          <Textarea
            value={generateEmbedCode()}
            readOnly
            className="font-mono text-xs"
            rows={6}
          />
          <Button onClick={handleCopy} className="w-full">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'Gekopieerd!' : 'Kopieer Embed Code'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbedCodeGenerator;
