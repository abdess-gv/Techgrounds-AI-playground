
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, BookOpen, Brain, Database, Zap } from 'lucide-react';
import InteractiveExercise from './InteractiveExercise';

interface ComprehensiveExercisePlayerProps {
  level: "beginner" | "intermediate" | "advanced";
}

const ComprehensiveExercisePlayer: React.FC<ComprehensiveExercisePlayerProps> = ({ level }) => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [scores, setScores] = useState<{ [key: string]: number }>({});

  const exercises = {
    beginner: {
      prompting: [
        {
          id: 'basic-instruction',
          title: 'Basic Instruction Following',
          description: 'Write clear, specific instructions for AI responses',
          difficulty: 'beginner' as const,
          category: 'prompting',
          prompt: 'Create a prompt that asks the AI to summarize a text in exactly 3 sentences, focusing on main points.',
          solution: `Act as a professional summarizer.

Context: You need to create concise summaries for busy executives.

Task: Summarize the following text in exactly 3 sentences.

Format:
1. First sentence: Main topic and primary argument
2. Second sentence: Key supporting evidence or details  
3. Third sentence: Conclusion or implications

Text to summarize: [TEXT]

Example: "The article discusses climate change impacts. It presents evidence from recent studies showing rising temperatures. The conclusion emphasizes urgent need for policy action."`,
          criteria: [
            'Specifies exact length requirement (3 sentences)',
            'Provides clear structure or format',
            'Includes role definition',
            'Gives example or template'
          ],
          hints: [
            'Be specific about the number of sentences',
            'Define what should go in each sentence',
            'Give the AI a clear role to play'
          ]
        }
      ],
      'chain-of-thought': [
        {
          id: 'basic-reasoning',
          title: 'Simple Problem Breakdown',
          description: 'Learn to guide AI through step-by-step reasoning',
          difficulty: 'beginner' as const,
          category: 'chain-of-thought',
          prompt: 'Design a prompt for solving basic word problems with clear steps.',
          solution: `You are a patient math tutor helping students learn problem-solving.

For this word problem: [PROBLEM]

Think through this step by step:

Step 1: **Read and Understand**
- What information do we have?
- What are we trying to find?

Step 2: **Identify the Operation**  
- What math operation do we need? (add, subtract, multiply, divide)
- Why is this the right operation?

Step 3: **Set up the Problem**
- Write the mathematical expression
- Show your work clearly

Step 4: **Solve and Check**
- Calculate the answer
- Does this answer make sense?

Show each step clearly and explain your thinking.`,
          criteria: [
            'Breaks down into clear steps',
            'Asks for explanation of reasoning',
            'Includes verification step',
            'Uses teaching/tutoring tone'
          ],
          hints: [
            'Structure the steps clearly',
            'Ask "why" questions to encourage reasoning',
            'Include a checking mechanism'
          ]
        }
      ]
    },
    intermediate: {
      prompting: [
        {
          id: 'role-context',
          title: 'Advanced Role & Context Setting',
          description: 'Master complex role definitions with detailed context',
          difficulty: 'intermediate' as const,
          category: 'prompting',
          prompt: 'Create a prompt for a legal contract analyzer that identifies key terms and potential risks.',
          solution: `Act as a senior legal analyst with 15+ years experience in contract review, specializing in commercial agreements and risk assessment.

Context: You are reviewing a [CONTRACT_TYPE] for a [COMPANY_SIZE] company. The stakes are high as this contract involves [DOLLAR_AMOUNT] and spans [TIME_PERIOD].

Your expertise includes:
- Contract law and regulatory compliance  
- Risk identification and mitigation strategies
- Commercial terms negotiation
- Industry-specific legal requirements

Analysis Framework:
1. **Contract Structure Review**
   - Parties involved and their obligations
   - Key terms and conditions
   - Payment and delivery schedules

2. **Risk Assessment** 
   - Legal risks (compliance, liability, disputes)
   - Financial risks (payment terms, penalties)
   - Operational risks (performance, delivery)

3. **Red Flags Identification**
   - Unusual or problematic clauses
   - Missing standard protections  
   - Ambiguous language

4. **Recommendations**
   - Priority issues to address
   - Suggested modifications
   - Deal-breaker concerns

Format: Structured report with risk ratings (High/Medium/Low) and specific recommendations.

Contract to analyze: [CONTRACT_TEXT]`,
          criteria: [
            'Establishes detailed professional expertise',
            'Provides comprehensive analysis framework',
            'Includes context about stakes/importance', 
            'Specifies output format and structure',
            'Addresses multiple risk categories'
          ],
          hints: [
            'Think about what expertise a real legal analyst would have',
            'Consider different types of risks in contracts',
            'Structure the analysis systematically'
          ]
        }
      ],
      'rag-systems': [
        {
          id: 'query-optimization',
          title: 'RAG Query Optimization',
          description: 'Optimize retrieval queries for better RAG performance',
          difficulty: 'intermediate' as const,
          category: 'rag-systems',
          prompt: 'Design a system for optimizing user queries to retrieve relevant documents from a knowledge base.',
          solution: `You are a RAG system optimization specialist designing query enhancement strategies.

Context: User queries are often ambiguous or lack context needed for effective document retrieval.

For user query: "[USER_QUERY]"

Query Enhancement Process:

1. **Query Analysis**
   - Intent: [QUESTION_TYPE] (factual, procedural, comparative, etc.)
   - Entities: [KEY_ENTITIES] (people, places, concepts)
   - Domain: [DOMAIN_AREA] (technical, business, academic)

2. **Multi-Strategy Retrieval**
   
   Primary Query (Exact Match):
   - Original terms: [ORIGINAL_TERMS]
   - Key phrases: [KEY_PHRASES]
   
   Expanded Query (Semantic Similarity):
   - Synonyms: [SYNONYM_LIST]
   - Related concepts: [RELATED_TERMS]
   - Alternative phrasings: [ALT_PHRASES]
   
   Contextual Query (Domain-Specific):
   - Technical terms: [TECH_VOCABULARY] 
   - Domain context: [DOMAIN_CONTEXT]
   
   Fallback Query (Broad Retrieval):
   - General categories: [CATEGORIES]
   - Topic areas: [BROAD_TOPICS]

3. **Retrieval Scoring**
   - Semantic relevance: [SCORE_1]
   - Keyword overlap: [SCORE_2] 
   - Recency/authority: [SCORE_3]

4. **Response Synthesis**
   - Combine information from top 3-5 documents
   - Cite specific sources
   - Note confidence levels
   - Flag conflicting information

Execute this enhancement for: [USER_QUERY]`,
          criteria: [
            'Analyzes query intent and structure',
            'Implements multiple retrieval strategies',
            'Includes scoring/ranking mechanism',
            'Addresses source attribution and confidence',
            'Handles conflicting information'
          ],
          hints: [
            'Think about different ways to phrase the same question',
            'Consider how search engines handle ambiguous queries',
            'Plan for when initial searches don\'t work well'
          ]
        }
      ]
    },
    advanced: {
      'fine-tuning': [
        {
          id: 'dataset-creation',
          title: 'Fine-tuning Dataset Generation',
          description: 'Create comprehensive training datasets for model fine-tuning',
          difficulty: 'advanced' as const,
          category: 'fine-tuning',
          prompt: 'Design a system for generating high-quality fine-tuning datasets for domain-specific tasks.',
          solution: `You are a machine learning engineer specializing in LLM fine-tuning and dataset curation.

Context: Creating a fine-tuning dataset for [TASK_TYPE] requires systematic approach to ensure quality, diversity, and effectiveness.

Dataset Generation Framework:

1. **Task Definition & Requirements**
   - Primary task: [SPECIFIC_TASK]
   - Secondary capabilities: [ADDITIONAL_SKILLS]
   - Target performance: [SUCCESS_METRICS]
   - Domain constraints: [DOMAIN_RULES]

2. **Data Architecture**
   ```json
   {
     "input": "[INSTRUCTION_OR_CONTEXT]",
     "output": "[DESIRED_RESPONSE]", 
     "metadata": {
       "difficulty": "[BEGINNER|INTERMEDIATE|ADVANCED]",
       "category": "[SUBCATEGORY]",
       "quality_score": "[1-10]",
       "validation_notes": "[QUALITY_CHECKS]"
     }
   }
   ```

3. **Diversity Strategy**
   
   Input Variation:
   - Format diversity: [LIST_FORMATS]
   - Length variation: [SHORT|MEDIUM|LONG ratios]
   - Complexity levels: [DIFFICULTY_DISTRIBUTION]
   - Edge cases: [UNUSUAL_SCENARIOS]
   
   Output Consistency:
   - Response format: [STANDARDIZED_FORMAT]
   - Quality markers: [QUALITY_INDICATORS]
   - Style guidelines: [TONE_AND_STYLE]

4. **Quality Assurance Pipeline**
   
   Automated Checks:
   - Format validation: [FORMAT_RULES]
   - Content filtering: [FILTER_CRITERIA]
   - Duplicate detection: [SIMILARITY_THRESHOLD]
   
   Human Review:
   - Expert validation: [DOMAIN_EXPERT_CRITERIA]
   - Bias detection: [BIAS_CHECKPOINTS]
   - Performance testing: [VALIDATION_METRICS]

5. **Dataset Composition** (Generate [N] examples)
   - Training set (80%): [TRAINING_EXAMPLES]
   - Validation set (15%): [VALIDATION_EXAMPLES]  
   - Test set (5%): [TEST_EXAMPLES]

Generate dataset for task: [SPECIFIC_TASK_DESCRIPTION]
Target size: [NUMBER_OF_EXAMPLES]
Quality threshold: [MINIMUM_QUALITY_SCORE]`,
          criteria: [
            'Defines comprehensive data architecture',
            'Includes diversity and quality strategies',
            'Specifies validation and review processes',
            'Addresses dataset splitting and composition',
            'Considers domain-specific requirements',
            'Includes automated and human quality checks'
          ],
          hints: [
            'Think about what makes training data effective',
            'Consider how to balance diversity with consistency',
            'Plan for quality control at multiple stages'
          ]
        }
      ],
      'system-design': [
        {
          id: 'rag-architecture',
          title: 'Complete RAG System Architecture',
          description: 'Design end-to-end RAG systems with optimization strategies',
          difficulty: 'advanced' as const,
          category: 'system-design',
          prompt: 'Architect a production-ready RAG system with performance optimization and error handling.',
          solution: `You are a senior ML systems architect designing enterprise-grade RAG implementations.

Context: Building a production RAG system for [USE_CASE] with requirements for [SCALE], [LATENCY], and [ACCURACY] targets.

RAG System Architecture:

1. **Data Ingestion Pipeline**
   
   Document Processing:
   - Parsers: [PDF, DOCX, HTML, etc.]
   - Cleaning: [NOISE_REMOVAL, FORMATTING]
   - Chunking strategy: [CHUNK_SIZE, OVERLAP, BOUNDARIES]
   - Metadata extraction: [TITLE, DATE, SOURCE, TAGS]
   
   Embedding Generation:
   - Model selection: [EMBEDDING_MODEL]
   - Batch processing: [BATCH_SIZE, PARALLELIZATION] 
   - Normalization: [L2_NORM, STANDARDIZATION]
   - Versioning: [EMBEDDING_VERSION_CONTROL]

2. **Vector Database Design**
   
   Storage Strategy:
   - Database choice: [PINECONE|WEAVIATE|CHROMA]
   - Indexing: [HNSW, IVF, PRODUCT_QUANTIZATION]
   - Partitioning: [BY_DOMAIN, BY_DATE, BY_TYPE]
   - Backup/Recovery: [BACKUP_STRATEGY]
   
   Search Optimization:
   - Similarity metrics: [COSINE, DOT_PRODUCT, EUCLIDEAN]
   - Filtering: [METADATA_FILTERS, HYBRID_SEARCH]
   - Performance tuning: [INDEX_PARAMS, CACHE_STRATEGY]

3. **Retrieval Engine**
   
   Query Processing:
   - Intent classification: [QUERY_TYPES]
   - Query expansion: [SYNONYMS, RELATED_TERMS]
   - Multi-vector search: [DENSE, SPARSE, HYBRID]
   
   Ranking & Fusion:
   - Relevance scoring: [SEMANTIC, KEYWORD, RECENCY]
   - Result fusion: [RRF, WEIGHTED_AVERAGE]
   - Diversity promotion: [MMR, CLUSTERING]
   
   Context Selection:
   - Window sizing: [CONTEXT_LENGTH_OPTIMIZATION]
   - Overlap handling: [DEDUPLICATION, MERGING]
   - Source attribution: [CITATION_TRACKING]

4. **Generation Pipeline**
   
   Prompt Engineering:
   - System prompts: [ROLE_DEFINITION, CONSTRAINTS]
   - Context integration: [CONTEXT_FORMATTING]
   - Output formatting: [STRUCTURE_REQUIREMENTS]
   
   LLM Integration:
   - Model selection: [GPT4, CLAUDE, LLAMA]
   - Parameter tuning: [TEMPERATURE, TOP_P, MAX_TOKENS]
   - Fallback strategies: [MODEL_CASCADING]

5. **Quality & Monitoring**
   
   Evaluation Metrics:
   - Retrieval: [RECALL@K, MRR, NDCG]
   - Generation: [FAITHFULNESS, RELEVANCE, COMPLETENESS]
   - End-to-end: [ANSWER_ACCURACY, USER_SATISFACTION]
   
   Monitoring Dashboard:
   - Performance: [LATENCY, THROUGHPUT, ERROR_RATES]
   - Quality: [CONFIDENCE_SCORES, HUMAN_FEEDBACK]
   - Usage: [QUERY_PATTERNS, POPULAR_TOPICS]

6. **Production Considerations**
   
   Scalability:
   - Load balancing: [GEOGRAPHIC, LOAD_BASED]
   - Caching: [QUERY_CACHE, EMBEDDING_CACHE]
   - Auto-scaling: [HORIZONTAL, VERTICAL]
   
   Security & Compliance:
   - Access control: [RBAC, API_KEYS]
   - Data privacy: [PII_DETECTION, ANONYMIZATION]
   - Audit logging: [QUERY_LOGS, ACCESS_LOGS]

Implement this architecture for: [SPECIFIC_USE_CASE]
Scale requirements: [USERS, QPS, DATA_SIZE]
Performance targets: [LATENCY_SLA, ACCURACY_TARGET]`,
          criteria: [
            'Comprehensive system architecture covering all components',
            'Specific technical choices with rationale',
            'Performance optimization strategies',
            'Quality monitoring and evaluation framework',
            'Production readiness considerations',
            'Scalability and security planning'
          ],
          hints: [
            'Consider the entire data flow from ingestion to response',
            'Think about real-world constraints and requirements',
            'Plan for monitoring and continuous improvement'
          ]
        }
      ]
    }
  };

  const currentExercises = exercises[level];
  const allExercises = Object.values(currentExercises).flat();
  const completionRate = (completedExercises.size / allExercises.length) * 100;

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
    setScores(prev => ({ ...prev, [exerciseId]: score }));
  };

  if (selectedExercise) {
    const exercise = allExercises.find(ex => ex.id === selectedExercise);
    if (exercise) {
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedExercise(null)}
            >
              ← Back to Exercises
            </Button>
            <div className="flex-1">
              <div className="text-sm text-gray-600">Progress: {completedExercises.size} / {allExercises.length} completed</div>
              <Progress value={completionRate} className="h-2 mt-1" />
            </div>
          </div>
          
          <InteractiveExercise 
            exercise={exercise}
            onComplete={(score) => handleExerciseComplete(exercise.id, score)}
          />
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-600" />
            <span>{level.charAt(0).toUpperCase() + level.slice(1)} Exercise Hub</span>
          </CardTitle>
          <CardDescription>
            Complete interactive exercises to master prompt engineering skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-gray-600">
              {completedExercises.size} / {allExercises.length} completed
            </span>
          </div>
          <Progress value={completionRate} className="h-3" />
        </CardContent>
      </Card>

      {/* Exercise Categories */}
      <Tabs defaultValue={Object.keys(currentExercises)[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          {Object.entries(currentExercises).map(([category, exercises]) => (
            <TabsTrigger key={category} value={category} className="flex items-center space-x-2">
              {category === 'prompting' && <Play className="h-4 w-4" />}
              {category === 'chain-of-thought' && <Brain className="h-4 w-4" />}
              {category === 'rag-systems' && <Database className="h-4 w-4" />}
              {category === 'fine-tuning' && <Zap className="h-4 w-4" />}
              {category === 'system-design' && <BookOpen className="h-4 w-4" />}
              <span className="capitalize">{category.replace('-', ' ')}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(currentExercises).map(([category, categoryExercises]) => (
          <TabsContent key={category} value={category}>
            <div className="grid md:grid-cols-2 gap-6">
              {categoryExercises.map((exercise) => (
                <Card 
                  key={exercise.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    completedExercises.has(exercise.id) ? 'bg-green-50 border-green-200' : ''
                  }`}
                  onClick={() => setSelectedExercise(exercise.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{exercise.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {completedExercises.has(exercise.id) && (
                          <Badge variant="default" className="bg-green-600">
                            Completed
                          </Badge>
                        )}
                        <Badge variant="outline">{exercise.difficulty}</Badge>
                      </div>
                    </div>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Category: {exercise.category}
                      </div>
                      {scores[exercise.id] && (
                        <div className="text-sm font-medium text-green-600">
                          Score: {Math.round(scores[exercise.id])}%
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ComprehensiveExercisePlayer;
