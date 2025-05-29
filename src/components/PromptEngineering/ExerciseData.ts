
import { Exercise } from './types/Exercise';
import { beginnerExercises } from './data/beginnerExercises';
import { intermediateExercises } from './data/intermediateExercises';
import { advancedExercises } from './data/advancedExercises';
import { securityExercises } from './data/securityExercises';

export type { Exercise } from './types/Exercise';

export const exerciseDatabase: { [key: string]: Exercise[] } = {
  beginner: beginnerExercises,
  intermediate: intermediateExercises,
  advanced: advancedExercises,
  security: securityExercises
};
