
import { Exercise } from './types/Exercise';
import { beginnerExercises } from './data/beginnerExercises';
import { intermediateExercises } from './data/intermediateExercises';
import { advancedExercises } from './data/advancedExercises';
import { securityExercises } from './data/securityExercises';
import { beginnerExercisesNL } from './data/beginnerExercisesNL';
import { intermediateExercisesNL } from './data/intermediateExercisesNL';
import { advancedExercisesNL } from './data/advancedExercisesNL';
import { securityExercisesNL } from './data/securityExercisesNL';

export type { Exercise } from './types/Exercise';

// English exercises
export const exerciseDatabase: { [key: string]: Exercise[] } = {
  beginner: beginnerExercises,
  intermediate: intermediateExercises,
  advanced: advancedExercises,
  security: securityExercises
};

// Dutch exercises
export const exerciseDatabaseNL: { [key: string]: Exercise[] } = {
  beginner: beginnerExercisesNL,
  intermediate: intermediateExercisesNL,
  advanced: advancedExercisesNL,
  security: securityExercisesNL
};

// Function to get exercises based on language
export const getExerciseDatabase = (language: 'en' | 'nl' = 'en') => {
  return language === 'nl' ? exerciseDatabaseNL : exerciseDatabase;
};

// Function to get security exercises by level and language
export const getSecurityExercisesByLevel = (level: 'beginner' | 'intermediate' | 'advanced', language: 'en' | 'nl' = 'en') => {
  const db = getExerciseDatabase(language);
  const securityExercises = db.security || [];
  return securityExercises.filter(exercise => exercise.difficulty === level);
};
