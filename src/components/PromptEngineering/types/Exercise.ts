
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  type?: 'hands-on' | 'analysis' | 'creative';
  prompt: string;
  solution?: string;
  sampleSolution?: string;
  criteria?: string[];
  evaluationCriteria?: string[];
  hints: string[];
  tips: string[];
  timeLimit?: number;
  estimatedTime?: string;
  resources?: Array<{
    title: string;
    type: 'article' | 'video' | 'tool' | 'example';
    url: string;
    description: string;
  }>;
  examples?: {
    good: string;
    bad: string;
    explanation: string;
  };
}
