export interface PromptEngineering2Exercise {
  id: string;
  level: 1 | 2 | 3; // Constrain level to 1, 2, or 3
  exerciseNumber: number; // Typically 1, 2, or 3 within each level
  title: string; // In Dutch
  description: string; // In Dutch, a brief overview
  instructions: string; // In Dutch, can be a longer text, possibly with markdown
  examplePrompt?: string; // In Dutch, optional
  expectedOutput?: string; // In Dutch, optional
}
