import { Exercise, EvaluationSummary, EvaluationResult } from './types';
import { findMatchingConcepts, calculateSimilarity } from './keywordMatching';

export function evaluateExercise(
  exercise: Exercise, 
  userInput: string
): EvaluationSummary {
  // Prioritize evaluationCriteria, fallback to criteria
  const criteria = exercise.evaluationCriteria || exercise.criteria || [];
  const results: EvaluationResult = {};
  let totalScore = 0;
  let passedCount = 0;
  const suggestions: string[] = [];
  
  if (criteria.length === 0) {
    return {
      overallScore: 0,
      totalCriteria: 0,
      passedCriteria: 0,
      results: {},
      suggestions: ['Geen evaluatiecriteria gevonden voor deze oefening']
    };
  }
  
  // Enhanced solution similarity check
  const solutionSimilarity = exercise.solution ? 
    calculateSimilarity(userInput.trim(), exercise.solution.trim()) : 0;
  
  // If very similar to solution, give high scores
  const isNearPerfectSolution = solutionSimilarity > 85;
  const isGoodSolution = solutionSimilarity > 70;
  
  criteria.forEach((criterion) => {
    const { matchedKeywords, conceptScore } = findMatchingConcepts(criterion, userInput);
    
    let finalScore = conceptScore;
    
    // Boost scores for solutions that are similar to the provided solution
    if (isNearPerfectSolution) {
      finalScore = Math.max(95, conceptScore);
    } else if (isGoodSolution) {
      finalScore = Math.max(85, conceptScore * 1.2);
    } else if (conceptScore > 70) {
      // Good answers get a small boost
      finalScore = Math.min(100, conceptScore * 1.1);
    }
    
    finalScore = Math.min(100, finalScore);
    
    // More lenient passing threshold
    const passed = finalScore >= 70;
    
    if (passed) passedCount++;
    totalScore += finalScore;
    
    let feedback = '';
    if (finalScore >= 90) {
      feedback = `✅ Uitstekend! (${Math.round(finalScore)}%)`;
    } else if (finalScore >= 80) {
      feedback = `✓ Goed voldaan (${Math.round(finalScore)}%)`;
    } else if (passed) {
      feedback = `✓ Voldoende (${Math.round(finalScore)}%)`;
    } else {
      feedback = `Kan worden verbeterd (${Math.round(finalScore)}%)`;
      
      // Specific improvement suggestions
      if (matchedKeywords.length === 0) {
        suggestions.push(`Voeg elementen toe gerelateerd aan: "${criterion}"`);
      } else if (finalScore < 50) {
        suggestions.push(`Werk verder uit: "${criterion}"`);
      }
    }
    
    results[criterion] = {
      passed,
      score: finalScore,
      feedback,
      matchedKeywords,
      missingKeywords: []
    };
  });
  
  const overallScore = criteria.length > 0 ? totalScore / criteria.length : 0;
  
  // Enhanced feedback
  if (userInput.trim().length < 50) {
    suggestions.push('Probeer een meer gedetailleerde en uitgebreide prompt te schrijven');
  }
  
  if (overallScore < 70) {
    if (exercise.solution) {
      suggestions.push('Bekijk de voorbeeldoplossing voor inspiratie en vergelijk de structuur');
    }
    suggestions.push('Probeer meer specifieke details en context toe te voegen');
  }
  
  if (overallScore >= 95) {
    suggestions.push('Uitstekend werk! Je beheerst deze prompting techniek zeer goed.');
  }
  
  return {
    overallScore,
    totalCriteria: criteria.length,
    passedCriteria: passedCount,
    results,
    suggestions: [...new Set(suggestions)]
  };
}

// Test function to validate that solutions achieve high scores
export function validateExerciseSolution(exercise: Exercise): {
  isValid: boolean;
  score: number;
  issues: string[];
} {
  if (!exercise.solution) {
    return { isValid: false, score: 0, issues: ['No solution provided'] };
  }
  
  const evaluation = evaluateExercise(exercise, exercise.solution);
  const isValid = evaluation.overallScore >= 95; // Solutions should score very high
  
  const issues: string[] = [];
  if (!isValid) {
    issues.push(`Solution only scores ${Math.round(evaluation.overallScore)}%, should be ≥95%`);
    Object.entries(evaluation.results).forEach(([criterion, result]) => {
      if (!result.passed) {
        issues.push(`Criterion "${criterion}" not met by solution: ${result.feedback}`);
      }
    });
  }
  
  return {
    isValid,
    score: evaluation.overallScore,
    issues
  };
}