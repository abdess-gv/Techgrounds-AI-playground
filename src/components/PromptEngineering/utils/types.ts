export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  prompt: string;
  solution?: string;
  sampleSolution?: string;
  criteria?: string[];
  evaluationCriteria?: string[];
  hints: string[];
  tips?: string[];
  timeLimit?: number;
  estimatedTime?: string;
  resources?: Array<{
    title: string;
    type: 'article' | 'video' | 'tool' | 'example';
    url: string;
    description: string;
  }>;
}

export interface EvaluationResult {
  [criterion: string]: {
    passed: boolean;
    score: number;
    feedback: string;
    matchedKeywords: string[];
    missingKeywords: string[];
  };
}

export interface EvaluationSummary {
  overallScore: number;
  totalCriteria: number;
  passedCriteria: number;
  results: EvaluationResult;
  suggestions: string[];
}