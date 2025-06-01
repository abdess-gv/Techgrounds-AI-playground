
export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  pricingModel: PricingModel;
  sourceType: SourceType;
  website: string;
  features: string[];
  tags: string[];
  popularity: number;
  rating: number;
  verified: boolean;
  logoUrl?: string;
  screenshots?: string[];
  lastUpdated: string;
}

export type ToolCategory = 
  | 'automation'
  | 'development'
  | 'analysis'
  | 'content-creation'
  | 'productivity'
  | 'frameworks'
  | 'chatbots'
  | 'image-generation'
  | 'audio'
  | 'video'
  | 'data-analysis'
  | 'code-assistance'
  | 'workflow';

export type PricingModel = 
  | 'free'
  | 'paid'
  | 'freemium'
  | 'subscription'
  | 'one-time';

export type SourceType = 
  | 'open-source'
  | 'closed-source';

export interface ToolFilters {
  search: string;
  categories: ToolCategory[];
  pricingModels: PricingModel[];
  sourceTypes: SourceType[];
  verified: boolean | null;
}
