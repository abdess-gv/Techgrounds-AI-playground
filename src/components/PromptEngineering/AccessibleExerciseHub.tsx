
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, BookOpen, Brain, Database, Zap, Target, CheckCircle, 
  Clock, Users, Trophy, Star, ArrowRight, Filter, Search
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InteractiveExercise from './InteractiveExercise';

interface AccessibleExerciseHubProps {
  level: "beginner" | "intermediate" | "advanced";
}

const AccessibleExerciseHub: React.FC<AccessibleExerciseHubProps> = ({ level }) => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const exerciseCategories = {
    'basic-prompting': { name: 'Basic Prompting', icon: Users, color: 'text-green-600' },
    'advanced-prompting': { name: 'Advanced Prompting', icon: Brain, color: 'text-blue-600' },
    'chain-of-thought': { name: 'Chain of Thought', icon: Target, color: 'text-purple-600' },
    'rag-systems': { name: 'RAG Systems', icon: Database, color: 'text-orange-600' },
    'fine-tuning': { name: 'Fine-tuning', icon: Zap, color: 'text-red-600' },
    'system-design': { name: 'System Design', icon: Trophy, color: 'text-indigo-600' }
  };

  const exercises = {
    beginner: [
      {
        id: 'basic-instruction-1',
        title: 'Clear Instruction Writing',
        description: 'Learn to write specific, actionable instructions for AI',
        difficulty: 'beginner' as const,
        category: 'basic-prompting',
        estimatedTime: '15 min',
        prompt: 'Create a prompt that asks the AI to write a professional email declining a meeting invitation.',
        solution: `You are a professional communication assistant.

Context: You need to decline a meeting invitation politely while maintaining good relationships.

Task: Write a professional email declining the meeting invitation below.

Requirements:
- Be polite and appreciative of the invitation
- Provide a brief, honest reason for declining
- Suggest an alternative if possible
- Keep the tone warm and professional
- End with a positive note

Meeting invitation: [MEETING_DETAILS]

Example format:
"Dear [Name],
Thank you for inviting me to [meeting]. Unfortunately, I won't be able to attend due to [brief reason].
[Alternative suggestion if applicable]
I hope the meeting goes well and look forward to [future collaboration].
Best regards, [Your name]"`,
        criteria: [
          'Clearly defines the task and context',
          'Provides specific formatting requirements',
          'Includes tone and style guidelines',
          'Offers a concrete example or template'
        ],
        hints: [
          'Think about what makes a good decline email',
          'Consider the key elements that should be included',
          'Provide a clear structure for the AI to follow'
        ]
      },
      {
        id: 'basic-instruction-2',
        title: 'Output Format Control',
        description: 'Master controlling AI output format and structure',
        difficulty: 'beginner' as const,
        category: 'basic-prompting',
        estimatedTime: '20 min',
        prompt: 'Design a prompt to generate a structured product review with specific sections.',
        solution: `You are a product review expert writing detailed, helpful reviews.

Context: Online shoppers need comprehensive, well-structured reviews to make informed decisions.

Task: Write a detailed product review for the item below.

Required Structure:
## Product Overview
- [Brief 2-sentence summary]
- Rating: [X/5 stars with brief justification]

## Key Features
- [List 3-5 main features with brief explanations]

## Pros
- [List 3-4 positive aspects]

## Cons  
- [List 2-3 negative aspects or limitations]

## Who Should Buy This
- [Target audience description]

## Bottom Line
- [Final recommendation in 1-2 sentences]

Writing Guidelines:
- Be honest and balanced
- Use specific details and examples
- Write for a general audience
- Keep each section concise but informative

Product to review: [PRODUCT_NAME_AND_DETAILS]`,
        criteria: [
          'Defines clear output structure with headers',
          'Specifies content requirements for each section',
          'Includes writing style guidelines',
          'Balances detail with readability'
        ],
        hints: [
          'Think about what information buyers need most',
          'Create a template that\'s easy to follow',
          'Consider both positive and negative aspects'
        ]
      }
    ],
    intermediate: [
      {
        id: 'cot-reasoning-1',
        title: 'Step-by-Step Problem Solving',
        description: 'Guide AI through complex reasoning processes',
        difficulty: 'intermediate' as const,
        category: 'chain-of-thought',
        estimatedTime: '25 min',
        prompt: 'Create a prompt for analyzing business case studies with systematic reasoning.',
        solution: `You are a senior business analyst with expertise in strategic analysis and problem-solving.

Context: You're analyzing a business case study to identify key issues and recommend solutions.

For the case study: [CASE_STUDY_TEXT]

Use this systematic analysis framework:

## Step 1: Situation Analysis
**Question:** What is the current situation?
- Key facts: [List main facts from the case]
- Context: [Industry, company size, timeframe]
- Stakeholders: [Who is involved and their interests]

## Step 2: Problem Identification  
**Question:** What are the core problems?
- Primary issue: [Main problem to solve]
- Secondary issues: [Supporting or related problems]
- Root causes: [Why these problems exist]

## Step 3: Strategic Options
**Question:** What could we do?
- Option A: [Describe approach, pros, cons, risks]
- Option B: [Describe approach, pros, cons, risks]  
- Option C: [Describe approach, pros, cons, risks]

## Step 4: Evaluation Criteria
**Question:** How should we judge these options?
- Financial impact: [Cost/revenue considerations]
- Feasibility: [Resource and timeline requirements]
- Risk assessment: [Potential downsides]
- Strategic fit: [Alignment with goals]

## Step 5: Recommendation
**Question:** What's the best path forward?
- Recommended solution: [Chosen option with reasoning]
- Implementation plan: [Key steps and timeline]
- Success metrics: [How to measure results]
- Risk mitigation: [How to handle potential issues]

Think through each step systematically, showing your reasoning process.`,
        criteria: [
          'Provides systematic analysis framework',
          'Asks guiding questions for each step',
          'Encourages explicit reasoning',
          'Covers multiple analytical dimensions',
          'Connects analysis to actionable recommendations'
        ],
        hints: [
          'Break complex analysis into manageable steps',
          'Use questions to guide the AI\'s thinking',
          'Ensure each step builds on the previous one'
        ]
      },
      {
        id: 'rag-design-1',
        title: 'RAG Query Optimization',
        description: 'Design effective retrieval strategies for knowledge systems',
        difficulty: 'intermediate' as const,
        category: 'rag-systems',
        estimatedTime: '30 min',
        prompt: 'Create a comprehensive RAG query enhancement system for customer support.',
        solution: `You are a RAG system architect designing query optimization for customer support knowledge retrieval.

Context: Customer queries are often vague or use different terminology than your knowledge base. You need to enhance queries for better document retrieval.

For customer query: "[CUSTOMER_QUERY]"

## Query Analysis Framework:

### 1. Intent Classification
- Query type: [FACTUAL|PROCEDURAL|TROUBLESHOOTING|POLICY|OTHER]
- Urgency level: [HIGH|MEDIUM|LOW]
- Product/service area: [CATEGORY]
- Customer context: [NEW_USER|EXISTING|ENTERPRISE]

### 2. Entity Extraction
- Products mentioned: [PRODUCT_NAMES]
- Features/components: [SPECIFIC_FEATURES]
- Error codes/messages: [TECHNICAL_DETAILS]
- Actions attempted: [USER_ACTIONS]

### 3. Query Enhancement Strategy

**Primary Query (Exact Terms):**
- Original terms: [EXACT_CUSTOMER_WORDS]
- Key phrases: [IMPORTANT_PHRASES]
- Technical terms: [SPECIFIC_TERMINOLOGY]

**Expanded Query (Semantic):**
- Synonyms: [ALTERNATIVE_TERMS]
- Related concepts: [BROADER_TOPICS]
- Common misspellings: [VARIANT_SPELLINGS]

**Domain-Specific Query:**
- Technical documentation terms: [TECHNICAL_VOCAB]
- Internal product names: [INTERNAL_TERMINOLOGY]
- Process-specific language: [PROCEDURE_TERMS]

**Fallback Query (Broad):**
- General categories: [BROAD_TOPICS]
- Related help areas: [ADJACENT_TOPICS]

### 4. Retrieval Strategy
- Search vector 1: [SEMANTIC_EMBEDDING_FOCUS]
- Search vector 2: [KEYWORD_MATCHING_FOCUS]  
- Search vector 3: [METADATA_FILTERING]
- Combination weight: [VECTOR_WEIGHTS]

### 5. Response Synthesis Plan
- Primary sources needed: [DOC_TYPES]
- Context combination strategy: [SYNTHESIS_APPROACH]
- Confidence threshold: [MINIMUM_SCORE]
- Escalation triggers: [WHEN_TO_ESCALATE]

Execute this enhancement for: [SPECIFIC_CUSTOMER_QUERY]`,
        criteria: [
          'Systematically analyzes query components',
          'Implements multiple retrieval strategies',
          'Includes semantic and keyword approaches',
          'Plans for response synthesis',
          'Addresses edge cases and fallbacks',
          'Considers domain-specific terminology'
        ],
        hints: [
          'Think about how search engines handle ambiguous queries',
          'Consider the gap between customer language and documentation',
          'Plan for when initial searches fail'
        ]
      }
    ],
    advanced: [
      {
        id: 'system-architecture-1',
        title: 'Production RAG System Design',
        description: 'Architect enterprise-scale RAG systems with full optimization',
        difficulty: 'advanced' as const,
        category: 'system-design',
        estimatedTime: '45 min',
        prompt: 'Design a complete production RAG system architecture for a large enterprise.',
        solution: `You are a senior ML systems architect designing enterprise RAG implementations.

Context: Building a production RAG system for [ENTERPRISE_DOMAIN] serving [USER_SCALE] users with [LATENCY_REQUIREMENT] response times and [ACCURACY_TARGET] accuracy targets.

## Complete RAG Architecture Design:

### 1. Data Ingestion & Processing Pipeline

**Document Processing Layer:**
- Input sources: [PDF, DOCX, HTML, APIs, databases]
- Parsing strategy: [MULTI_FORMAT_HANDLING]
- Content extraction: [TEXT, TABLES, IMAGES, METADATA]
- Quality validation: [CONTENT_QUALITY_CHECKS]

**Chunking Strategy:**
- Primary method: [SEMANTIC_CHUNKING with 512-token windows]
- Overlap handling: [20% overlap with boundary detection]
- Hierarchy preservation: [SECTION_HEADERS, DOCUMENT_STRUCTURE]
- Metadata enrichment: [SOURCE, DATE, AUTHORITY, TOPIC_TAGS]

**Embedding Generation:**
- Model selection: [SENTENCE_TRANSFORMERS_BGE_LARGE]
- Batch processing: [GPU_OPTIMIZED with 256 batch size]
- Normalization: [L2_NORMALIZATION]
- Version control: [EMBEDDING_VERSIONING_STRATEGY]

### 2. Vector Database Architecture

**Storage Design:**
- Primary DB: [PINECONE with 1536-dim vectors]
- Indexing: [HNSW with M=16, efConstruction=200]
- Partitioning: [BY_DOMAIN, BY_RECENCY, BY_AUTHORITY]
- Replication: [MULTI_REGION with read replicas]

**Search Optimization:**
- Similarity metrics: [COSINE_SIMILARITY primary, DOT_PRODUCT fallback]
- Filtering strategy: [METADATA_PREFILTERING]
- Performance tuning: [CUSTOM_INDEX_PARAMS]
- Caching layer: [REDIS for frequent queries]

### 3. Advanced Retrieval Engine

**Query Processing Pipeline:**
- Intent classification: [QUESTION_ANSWERING|SUMMARIZATION|COMPARISON]
- Entity extraction: [NER with domain-specific models]
- Query expansion: [SYNONYM_EXPANSION, ACRONYM_HANDLING]
- Multi-vector generation: [DENSE, SPARSE, COLBERT_STYLE]

**Retrieval Strategies:**
- Hybrid search: [70% dense, 30% sparse with RRF fusion]
- Re-ranking: [CROSS_ENCODER second-stage ranking]
- Diversity promotion: [MMR with lambda=0.3]
- Context optimization: [DYNAMIC_CONTEXT_WINDOWING]

**Quality Assurance:**
- Relevance scoring: [SEMANTIC + KEYWORD + RECENCY weights]
- Confidence thresholds: [QUERY_SPECIFIC_THRESHOLDS]
- Fallback strategies: [BROADER_SEARCH, CATEGORY_EXPANSION]

### 4. Generation & Response Pipeline

**Prompt Engineering:**
- System role: [DOMAIN_EXPERT with specific expertise]
- Context integration: [STRUCTURED_CONTEXT_FORMATTING]
- Output formatting: [JSON_SCHEMA for structured responses]
- Citation handling: [AUTOMATIC_SOURCE_ATTRIBUTION]

**LLM Integration:**
- Primary model: [GPT_4_TURBO with 128k context]
- Parameter optimization: [temperature=0.1, top_p=0.95]
- Fallback cascade: [GPT_3.5_TURBO for simpler queries]
- Cost optimization: [QUERY_COMPLEXITY_ROUTING]

### 5. Production Infrastructure

**Scalability Design:**
- Load balancing: [GEOGRAPHIC + LOAD_BASED routing]
- Auto-scaling: [KUBERNETES with HPA on CPU/memory]
- Resource allocation: [GPU_POOLS for embedding, CPU for search]
- Performance targets: [<2s p95 latency, 99.9% uptime]

**Monitoring & Observability:**
- Performance metrics: [LATENCY, THROUGHPUT, ERROR_RATES]
- Quality metrics: [RELEVANCE_SCORES, USER_SATISFACTION]
- Business metrics: [QUERY_SUCCESS_RATE, RESOLUTION_TIME]
- Alerting: [PERFORMANCE_DEGRADATION, QUALITY_DROPS]

### 6. Security & Compliance

**Access Control:**
- Authentication: [OAUTH_2.0 with enterprise SSO]
- Authorization: [RBAC with document-level permissions]
- Data security: [ENCRYPTION_AT_REST_AND_TRANSIT]
- Audit logging: [COMPREHENSIVE_QUERY_AUDIT_TRAIL]

**Compliance Framework:**
- Data governance: [GDPR, CCPA compliance]
- Retention policies: [AUTOMATED_DATA_LIFECYCLE]
- Privacy protection: [PII_DETECTION_AND_MASKING]

### 7. Continuous Improvement

**Evaluation Framework:**
- Automated evaluation: [RAGAS metrics, custom benchmarks]
- Human feedback: [THUMBS_UP_DOWN, detailed ratings]
- A/B testing: [RETRIEVAL_STRATEGY_EXPERIMENTS]
- Performance regression: [AUTOMATED_QUALITY_MONITORING]

**MLOps Integration:**
- Model versioning: [EXPERIMENT_TRACKING with MLflow]
- Deployment pipeline: [CI_CD with quality gates]
- Rollback capabilities: [BLUE_GREEN_DEPLOYMENTS]

Implement this architecture for:
- Domain: [SPECIFIC_ENTERPRISE_DOMAIN]
- Scale: [USER_COUNT, QUERY_VOLUME, DATA_SIZE]
- Requirements: [SPECIFIC_BUSINESS_REQUIREMENTS]`,
        criteria: [
          'Comprehensive end-to-end architecture',
          'Specific technical implementation details',
          'Performance optimization strategies',
          'Production readiness considerations',
          'Scalability and reliability planning',
          'Security and compliance integration',
          'Monitoring and continuous improvement',
          'Cost optimization strategies'
        ],
        hints: [
          'Consider the complete data flow from ingestion to response',
          'Think about real-world enterprise constraints',
          'Plan for scale, monitoring, and maintenance',
          'Address security and compliance requirements'
        ]
      }
    ]
  };

  const allExercises = exercises[level] || [];
  const filteredExercises = allExercises.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || exercise.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const completionRate = allExercises.length > 0 ? (completedExercises.size / allExercises.length) * 100 : 0;

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
              className="flex items-center space-x-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span>Back to Exercise Hub</span>
            </Button>
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                Progress: {completedExercises.size} / {allExercises.length} completed
              </div>
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
    <div className="space-y-8">
      {/* Enhanced Progress Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="text-2xl">
              {level.charAt(0).toUpperCase() + level.slice(1)} Exercise Hub
            </span>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              {allExercises.length} exercises
            </Badge>
          </CardTitle>
          <CardDescription className="text-lg">
            Master prompt engineering through hands-on practice with real-world scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg border">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="font-bold text-xl">{allExercises.length}</div>
              <div className="text-sm text-gray-600">Total Exercises</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="font-bold text-xl">{completedExercises.size}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold text-xl">
                {completedExercises.size > 0 ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / completedExercises.size) : 0}%
              </div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <Star className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className="font-bold text-xl">{Math.round(completionRate)}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Learning Progress</span>
              <span className="text-sm text-gray-600">
                {completedExercises.size} of {allExercises.length} exercises completed
              </span>
            </div>
            <Progress value={completionRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(exerciseCategories).map(([key, category]) => (
              <SelectItem key={key} value={key}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exercise Grid */}
      <div className="grid gap-6">
        {filteredExercises.map((exercise) => {
          const isCompleted = completedExercises.has(exercise.id);
          const score = scores[exercise.id] || 0;
          const categoryInfo = exerciseCategories[exercise.category as keyof typeof exerciseCategories];
          const CategoryIcon = categoryInfo?.icon || BookOpen;

          return (
            <Card 
              key={exercise.id} 
              className={`hover:shadow-lg transition-all duration-200 border-l-4 ${
                isCompleted ? 'border-l-green-500 bg-green-50/30' : 'border-l-blue-500'
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        isCompleted ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <CategoryIcon className={`h-5 w-5 ${
                          isCompleted ? 'text-green-600' : categoryInfo?.color || 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{exercise.title}</h3>
                        <p className="text-gray-600 text-sm font-normal">
                          {exercise.description}
                        </p>
                      </div>
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {score}%
                      </Badge>
                    )}
                    <Badge variant="outline" className="capitalize">
                      {exercise.difficulty}
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      {exercise.estimatedTime}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-xs">
                      {categoryInfo?.name || exercise.category}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {exercise.criteria.length} evaluation criteria
                    </span>
                  </div>
                  <Button 
                    onClick={() => setSelectedExercise(exercise.id)}
                    variant={isCompleted ? "outline" : "default"}
                  >
                    {isCompleted ? (
                      <>
                        <Trophy className="h-4 w-4 mr-2" />
                        Review
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Exercise
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold mb-2">No exercises found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AccessibleExerciseHub;
