import { calculateWordSimilarity } from './stringUtils';

// Enhanced keyword groups for comprehensive Dutch criteria evaluation
export const KEYWORD_GROUPS = {
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
export function extractKeywords(text: string): string[] {
  return text.toLowerCase()
    .split(/[^\w\s]+/)
    .map(word => word.trim())
    .filter(word => word.length > 2);
}

export function findMatchingConcepts(criterion: string, userInput: string): {
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

export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = extractKeywords(text1);
  const words2 = extractKeywords(text2);
  
  if (words1.length === 0 || words2.length === 0) return 0;
  
  const intersection = words1.filter(word => 
    words2.some(w2 => w2.includes(word) || word.includes(w2))
  );
  
  return (intersection.length * 2) / (words1.length + words2.length) * 100;
}