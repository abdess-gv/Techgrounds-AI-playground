// Re-export types and functions from modularized files
export type { Exercise, EvaluationResult, EvaluationSummary } from './types';
export { evaluateExercise, validateExerciseSolution } from './evaluator';