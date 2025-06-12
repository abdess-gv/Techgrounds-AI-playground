
import { Exercise } from '../types/Exercise';
import { securityExercisesBeginner } from './securityExercisesBeginner';
import { securityExercisesIntermediate } from './securityExercisesIntermediate';
import { securityExercisesAdvanced } from './securityExercisesAdvanced';

// Combine all Dutch security exercises
export const securityExercisesNL: Exercise[] = [
  ...securityExercisesBeginner,
  ...securityExercisesIntermediate,
  ...securityExercisesAdvanced
];

// Export by level for easier access
export { securityExercisesBeginner, securityExercisesIntermediate, securityExercisesAdvanced };

// Security exercises organized by level
export const securityExercisesByLevel = {
  beginner: securityExercisesBeginner,
  intermediate: securityExercisesIntermediate,
  advanced: securityExercisesAdvanced
};
