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

// Keyword groups for Dutch criteria evaluation
const KEYWORD_GROUPS = {
  'doelgroep': ['doelgroep', 'target', 'voor', 'kinderen', 'kind', 'jaar', 'oud', 'leeftijd', 'niveau'],
  'eenvoudig': ['eenvoudig', 'simpel', 'begrijpelijk', 'duidelijk', 'makkelijk', 'simpele woorden', 'eenvoudige taal'],
  'lengte': ['lengte', 'woorden', 'kort', 'lang', 'ongeveer', 'maximaal', 'minimaal', 'beperkt'],
  'voorbeelden': ['voorbeeld', 'voorbeelden', 'praktisch', 'toepassing', 'illustratie', 'concreet'],
  'structuur': ['structuur', 'lijst', 'stappen', 'punten', 'georganiseerd', 'indeling'],
  'context': ['context', 'achtergrond', 'situatie', 'omgeving', 'scenario'],
  'specificiteit': ['specifiek', 'precies', 'exact', 'gedetailleerd', 'uitgebreid'],
  'toon': ['toon', 'stijl', 'formeel', 'informeel', 'vriendelijk', 'professioneel']
};

// Enhanced keyword extraction and matching
function extractKeywords(text: string): string[] {
  return text.toLowerCase()
    .split(/[^\w\s]+/)
    .map(word => word.trim())
    .filter(word => word.length > 2);
}

function findMatchingConcepts(criterion: string, userInput: string): {
  matchedKeywords: string[];
  conceptScore: number;
} {
  const criterionWords = extractKeywords(criterion);
  const inputWords = extractKeywords(userInput);
  const inputText = userInput.toLowerCase();
  
  let matchedKeywords: string[] = [];
  let conceptMatches = 0;
  
  // Check each keyword group for matches
  Object.entries(KEYWORD_GROUPS).forEach(([concept, keywords]) => {
    const criterionHasConcept = criterionWords.some(word => 
      keywords.some(keyword => word.includes(keyword) || keyword.includes(word))
    );
    
    if (criterionHasConcept) {
      const inputHasConcept = keywords.some(keyword => {
        if (inputText.includes(keyword)) {
          matchedKeywords.push(keyword);
          return true;
        }
        return false;
      });
      
      if (inputHasConcept) {
        conceptMatches++;
      }
    }
  });
  
  // Also check for direct keyword matches
  criterionWords.forEach(criterionWord => {
    if (inputWords.some(inputWord => 
      inputWord.includes(criterionWord) || 
      criterionWord.includes(inputWord) ||
      Math.abs(inputWord.length - criterionWord.length) <= 2 && 
      inputWord.substring(0, Math.min(3, criterionWord.length)) === criterionWord.substring(0, Math.min(3, criterionWord.length))
    )) {
      matchedKeywords.push(criterionWord);
      conceptMatches++;
    }
  });
  
  const conceptScore = Math.min(100, (conceptMatches / Math.max(1, criterionWords.length)) * 100);
  
  return {
    matchedKeywords: [...new Set(matchedKeywords)],
    conceptScore
  };
}

function calculateSimilarity(text1: string, text2: string): number {
  const words1 = extractKeywords(text1);
  const words2 = extractKeywords(text2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  const intersection = words1.filter(word => 
    words2.some(w2 => w2.includes(word) || word.includes(w2))
  );
  
  return (intersection.length * 2) / (words1.length + words2.length) * 100;
}

export function evaluateExercise(
  exercise: Exercise, 
  userInput: string
): EvaluationSummary {
  const criteria = exercise.evaluationCriteria || exercise.criteria || [];
  const results: EvaluationResult = {};
  let totalScore = 0;
  let passedCount = 0;
  const suggestions: string[] = [];
  
  // Check if user input is very similar to the solution
  const solutionSimilarity = exercise.solution ? 
    calculateSimilarity(userInput, exercise.solution) : 0;
  
  const isNearSolution = solutionSimilarity > 70;
  
  criteria.forEach((criterion, index) => {
    const { matchedKeywords, conceptScore } = findMatchingConcepts(criterion, userInput);
    
    // Adjust scoring based on solution similarity
    let finalScore = conceptScore;
    if (isNearSolution && conceptScore > 50) {
      finalScore = Math.min(100, conceptScore + 20); // Boost score for near-solutions
    }
    
    const passed = finalScore >= 60; // Lower threshold for more achievable scoring
    
    if (passed) passedCount++;
    totalScore += finalScore;
    
    let feedback = '';
    if (passed) {
      feedback = `✓ Criterium voldaan (${Math.round(finalScore)}%)`;
    } else {
      feedback = `Kan worden verbeterd (${Math.round(finalScore)}%)`;
      
      // Add specific suggestions
      if (matchedKeywords.length === 0) {
        suggestions.push(`Probeer termen gerelateerd aan: "${criterion}" toe te voegen`);
      } else if (finalScore < 40) {
        suggestions.push(`Uitbreiding nodig voor: "${criterion}"`);
      }
    }
    
    results[criterion] = {
      passed,
      score: finalScore,
      feedback,
      matchedKeywords,
      missingKeywords: [] // Could be enhanced further
    };
  });
  
  const overallScore = criteria.length > 0 ? totalScore / criteria.length : 0;
  
  // Add general suggestions
  if (userInput.length < 30) {
    suggestions.push('Probeer een meer gedetailleerde prompt te schrijven');
  }
  
  if (overallScore < 50 && exercise.solution) {
    suggestions.push('Vergelijk je antwoord met de voorbeeldoplossing voor inspiratie');
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
  const isValid = evaluation.overallScore >= 90; // Solutions should score very high
  
  const issues: string[] = [];
  if (!isValid) {
    issues.push(`Solution only scores ${Math.round(evaluation.overallScore)}%, should be >90%`);
    Object.entries(evaluation.results).forEach(([criterion, result]) => {
      if (!result.passed) {
        issues.push(`Criterion "${criterion}" not met by solution`);
      }
    });
  }
  
  return {
    isValid,
    score: evaluation.overallScore,
    issues
  };
}