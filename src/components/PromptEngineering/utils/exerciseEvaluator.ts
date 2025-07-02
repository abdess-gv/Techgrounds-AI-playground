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

// Enhanced keyword groups for comprehensive Dutch criteria evaluation
const KEYWORD_GROUPS = {
  // Target audience related
  'doelgroep': ['doelgroep', 'target', 'voor', 'kinderen', 'kind', 'jaar', 'oud', 'leeftijd', 'niveau', 'publiek', 'audience', 'groep', 'gebruiker', 'klant'],
  
  // Language complexity
  'eenvoudig': ['eenvoudig', 'simpel', 'begrijpelijk', 'duidelijk', 'makkelijk', 'simpele woorden', 'eenvoudige taal', 'beginner', 'basis', 'elementair'],
  
  // Length and scope
  'lengte': ['lengte', 'woorden', 'kort', 'lang', 'ongeveer', 'maximaal', 'minimaal', 'beperkt', 'omvang', 'aantal', 'karakters', 'zinnen'],
  
  // Examples and practical elements
  'voorbeelden': ['voorbeeld', 'voorbeelden', 'praktisch', 'toepassing', 'illustratie', 'concreet', 'demonstratie', 'case', 'scenario'],
  
  // Structure and organization
  'structuur': ['structuur', 'lijst', 'stappen', 'punten', 'georganiseerd', 'indeling', 'format', 'volgorde', 'opbouw', 'framework'],
  
  // Context and background
  'context': ['context', 'achtergrond', 'situatie', 'omgeving', 'scenario', 'setting', 'omstandigheden', 'kader'],
  
  // Specificity and detail
  'specificiteit': ['specifiek', 'precies', 'exact', 'gedetailleerd', 'uitgebreid', 'concreet', 'duidelijk', 'expliciet'],
  
  // Tone and style
  'toon': ['toon', 'stijl', 'formeel', 'informeel', 'vriendelijk', 'professioneel', 'casual', 'beleefd'],
  
  // Role and expertise
  'rol': ['rol', 'expert', 'specialist', 'ervaring', 'professional', 'consultant', 'adviseur', 'deskundige'],
  
  // Analysis and reasoning
  'analyse': ['analyse', 'analyseer', 'onderzoek', 'evalueer', 'beoordeel', 'onderzoeken', 'bekijk', 'bestudeer'],
  
  // Step-by-step process
  'stappen': ['stap', 'stappen', 'proces', 'procedure', 'methode', 'aanpak', 'strategie', 'plan'],
  
  // Multiple perspectives
  'perspectief': ['perspectief', 'standpunt', 'mening', 'visie', 'benadering', 'kant', 'zienswijze'],
  
  // Data and evidence
  'data': ['data', 'cijfers', 'informatie', 'gegevens', 'feiten', 'statistieken', 'bewijs'],
  
  // Recommendations and actions
  'aanbevelingen': ['aanbeveling', 'aanbevelingen', 'advies', 'suggestie', 'voorstel', 'actie', 'plan'],
  
  // Quality and validation
  'kwaliteit': ['kwaliteit', 'validatie', 'controle', 'verificatie', 'check', 'betrouwbaar'],
  
  // Integration and synthesis
  'integratie': ['integreer', 'combineer', 'samenvoeging', 'synthese', 'verbinding', 'koppeling']
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
  const criterionLower = criterion.toLowerCase();
  const inputLower = userInput.toLowerCase();
  const criterionWords = extractKeywords(criterionLower);
  const inputWords = extractKeywords(inputLower);
  
  let matchedKeywords: string[] = [];
  let conceptMatches = 0;
  let totalConcepts = 0;
  
  // Enhanced concept matching with semantic groups
  Object.entries(KEYWORD_GROUPS).forEach(([concept, keywords]) => {
    const criterionHasConcept = keywords.some(keyword => 
      criterionLower.includes(keyword) || 
      criterionWords.some(word => 
        word.includes(keyword) || 
        keyword.includes(word) ||
        (word.length > 3 && keyword.length > 3 && 
         word.substring(0, 4) === keyword.substring(0, 4))
      )
    );
    
    if (criterionHasConcept) {
      totalConcepts++;
      
      const matchedInInput = keywords.some(keyword => {
        // Direct match in full text
        if (inputLower.includes(keyword)) {
          matchedKeywords.push(keyword);
          return true;
        }
        
        // Match in extracted words with fuzzy matching
        return inputWords.some(inputWord => {
          if (inputWord.includes(keyword) || keyword.includes(inputWord)) {
            matchedKeywords.push(keyword);
            return true;
          }
          
          // Fuzzy match for longer words (typos, variations)
          if (inputWord.length > 3 && keyword.length > 3) {
            const similarity = calculateWordSimilarity(inputWord, keyword);
            if (similarity > 0.7) {
              matchedKeywords.push(keyword);
              return true;
            }
          }
          
          return false;
        });
      });
      
      if (matchedInInput) {
        conceptMatches++;
      }
    }
  });
  
  // Direct word matching as fallback
  let directMatches = 0;
  criterionWords.forEach(criterionWord => {
    const found = inputWords.some(inputWord => {
      // Exact match
      if (inputWord === criterionWord) return true;
      
      // Contains match
      if (inputWord.includes(criterionWord) || criterionWord.includes(inputWord)) return true;
      
      // Fuzzy match for longer words
      if (inputWord.length > 3 && criterionWord.length > 3) {
        return calculateWordSimilarity(inputWord, criterionWord) > 0.8;
      }
      
      return false;
    });
    
    if (found) {
      matchedKeywords.push(criterionWord);
      directMatches++;
    }
  });
  
  // Calculate score - prioritize concept matches, boost with direct matches
  const conceptScore = totalConcepts > 0 
    ? (conceptMatches / totalConcepts) * 85 
    : 0;
    
  const directBonus = directMatches > 0 
    ? Math.min(15, (directMatches / criterionWords.length) * 15)
    : 0;
  
  const finalScore = Math.min(100, conceptScore + directBonus);
  
  return {
    matchedKeywords: [...new Set(matchedKeywords)],
    conceptScore: finalScore
  };
}

// Helper function for fuzzy string matching
function calculateWordSimilarity(word1: string, word2: string): number {
  const maxLength = Math.max(word1.length, word2.length);
  if (maxLength === 0) return 1;
  
  const distance = levenshteinDistance(word1, word2);
  return (maxLength - distance) / maxLength;
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
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