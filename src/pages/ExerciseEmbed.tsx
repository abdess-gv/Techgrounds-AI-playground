
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Play, RotateCcw, Lightbulb, Target, CheckCircle, XCircle } from "lucide-react";
import PromptHighlighter from "@/components/PromptEngineering/PromptHighlighter";
import PromptLegend from "@/components/PromptEngineering/PromptLegend";

const ExerciseEmbed = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level') as "beginner" | "intermediate" | "advanced" || "beginner";
  const exerciseIndex = parseInt(searchParams.get('exercise') || "0");
  
  const [userPrompt, setUserPrompt] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [evaluation, setEvaluation] = useState<{ [key: string]: boolean }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);

  const exercises = {
    beginner: [
      {
        title: "Basic Instruction Following",
        type: "prompting",
        difficulty: "Easy",
        description: "Write a prompt that asks the AI to summarize a text in exactly 3 sentences.",
        context: "You have a long article about climate change and need a concise summary.",
        hints: [
          "Be specific about the length requirement (exactly 3 sentences)",
          "Mention what type of content to focus on (main points, key findings)",
          "Consider providing a structure or template for the response"
        ],
        solution: `Act as a professional summarizer specializing in climate science.

Context: You need to create executive summaries for busy policymakers.

Task: Summarize the following climate change article in exactly 3 sentences.

Format:
1. First sentence: Main topic and primary finding
2. Second sentence: Key evidence or supporting data  
3. Third sentence: Implications or recommended actions

Article: [ARTICLE_TEXT]

Example: "This study examines rising global temperatures over the past decade. Research data shows a 1.2°C increase with accelerating ice sheet melting. Immediate policy intervention is required to limit further warming."`,
        evaluation: [
          "Specifies exact length requirement (3 sentences)",
          "Provides clear structure/format for response", 
          "Includes role definition for the AI",
          "Gives concrete example or template"
        ]
      }
    ],
    intermediate: [
      {
        title: "Chain-of-Thought Reasoning",
        type: "reasoning",
        difficulty: "Medium",
        description: "Design a prompt for solving multi-step problems using structured reasoning.",
        context: "The AI needs to show its work step-by-step for complex analytical tasks.",
        hints: [
          "Include examples of step-by-step reasoning patterns",
          "Ask the AI to think through each step explicitly",
          "Provide a verification or checking mechanism"
        ],
        solution: `You are an analytical problem-solver who thinks systematically through complex challenges.

Context: Breaking down complex problems requires structured thinking and clear reasoning.

For this problem: [PROBLEM_STATEMENT]

Use this reasoning framework:

**Step 1: Understand & Define**
- What exactly is being asked?
- What information do I have?
- What am I trying to determine?

**Step 2: Break Down & Plan**  
- What are the key components or sub-problems?
- What approach or method should I use?
- What steps are needed to reach the solution?

**Step 3: Execute & Reason**
- Work through each step systematically
- Show calculations, logic, or reasoning at each stage
- Explain why each step follows from the previous

**Step 4: Verify & Conclude**
- Does the answer make logical sense?
- Can I verify this through an alternative approach?
- What are the implications or next steps?

Think through this problem step-by-step, showing your reasoning at each stage.`,
        evaluation: [
          "Provides clear step-by-step framework",
          "Asks for explicit reasoning at each step",
          "Includes verification/checking mechanism",
          "Structures the problem-solving approach"
        ]
      }
    ],
    advanced: [
      {
        title: "RAG System Design",
        type: "system-design",
        difficulty: "Hard",
        description: "Design a comprehensive RAG system with optimization strategies.",
        context: "You need to architect a production-ready retrieval system for a specific domain.",
        hints: [
          "Consider the entire pipeline from ingestion to response",
          "Think about different types of optimization (speed, accuracy, cost)",
          "Address real-world constraints and failure modes"
        ],
        solution: `You are a senior ML systems architect designing enterprise RAG implementations.

Context: Building a production RAG system for [DOMAIN] with [SCALE] requirements and [PERFORMANCE] targets.

System Architecture Design:

**1. Data Ingestion Pipeline**
- Document Processing: [PARSERS, CLEANING, CHUNKING_STRATEGY]
- Embedding Generation: [MODEL_CHOICE, BATCH_PROCESSING, VERSIONING]
- Quality Control: [VALIDATION_RULES, ERROR_HANDLING]

**2. Vector Database Design**  
- Storage Strategy: [DATABASE_CHOICE, INDEXING, PARTITIONING]
- Search Optimization: [SIMILARITY_METRICS, FILTERING, PERFORMANCE_TUNING]
- Scalability: [SHARDING, REPLICATION, BACKUP_STRATEGY]

**3. Retrieval Engine**
- Query Processing: [INTENT_CLASSIFICATION, QUERY_EXPANSION, MULTI_VECTOR_SEARCH]
- Ranking & Fusion: [RELEVANCE_SCORING, RESULT_FUSION, DIVERSITY_PROMOTION] 
- Context Selection: [WINDOW_SIZING, OVERLAP_HANDLING, SOURCE_ATTRIBUTION]

**4. Generation Pipeline**
- Prompt Engineering: [SYSTEM_PROMPTS, CONTEXT_INTEGRATION, OUTPUT_FORMATTING]
- LLM Integration: [MODEL_SELECTION, PARAMETER_TUNING, FALLBACK_STRATEGIES]
- Quality Assurance: [EVALUATION_METRICS, MONITORING, HUMAN_FEEDBACK]

Design this system for: [SPECIFIC_USE_CASE]
Requirements: [TECHNICAL_REQUIREMENTS]
Constraints: [BUSINESS_CONSTRAINTS]`,
        evaluation: [
          "Addresses complete system architecture",
          "Includes specific technical implementation details",
          "Considers scalability and production requirements",
          "Incorporates quality and monitoring strategies",
          "Handles real-world constraints and optimization"
        ]
      }
    ]
  };

  const currentExercises = exercises[level];
  const exercise = currentExercises[exerciseIndex] || currentExercises[0];

  const evaluatePrompt = () => {
    const newEvaluation: { [key: string]: boolean } = {};
    
    exercise.evaluation.forEach(criterion => {
      // Simple keyword-based evaluation
      const keywords = criterion.toLowerCase().split(/[^\w]+/);
      const hasKeywords = keywords.some(keyword => 
        keyword.length > 2 && userPrompt.toLowerCase().includes(keyword)
      );
      newEvaluation[criterion] = hasKeywords;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
  };

  const resetExercise = () => {
    setUserPrompt("");
    setEvaluation({});
    setIsEvaluated(false);
    setShowHint(false);
    setCurrentHint(0);
  };

  const completedCriteria = Object.values(evaluation).filter(Boolean).length;
  const totalCriteria = exercise.evaluation.length;
  const score = isEvaluated ? (completedCriteria / totalCriteria) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Color Legend */}
        <PromptLegend />

        {/* Exercise Header */}
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-purple-600" />
                  <span className="text-purple-900">{exercise.title}</span>
                </CardTitle>
                <CardDescription className="mt-2 text-purple-700">{exercise.description}</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-purple-100 text-purple-800">{exercise.type}</Badge>
                <Badge variant={exercise.difficulty === "Easy" ? "default" : exercise.difficulty === "Medium" ? "secondary" : "destructive"}>
                  {exercise.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">📋 Context:</h4>
              <p className="text-blue-800">{exercise.context}</p>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Workspace */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Area */}
          <Card className="border border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-900">🚀 Your Solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Textarea
                placeholder="Write your prompt here... Use the color legend above to structure your prompt effectively!"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="min-h-[250px] font-mono text-sm border-2 border-gray-200 focus:border-green-400"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button 
                    onClick={evaluatePrompt} 
                    disabled={!userPrompt.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Evaluate Prompt
                  </Button>
                  <Button variant="outline" onClick={resetExercise}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {showHint ? "Hide" : "Show"} Hints
                </Button>
              </div>

              {showHint && (
                <Card className="bg-yellow-50 border-2 border-yellow-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-yellow-900">
                        💡 Hint {currentHint + 1} of {exercise.hints.length}
                      </h4>
                      <div className="flex space-x-1">
                        {currentHint > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentHint(currentHint - 1)}
                          >
                            ← Previous
                          </Button>
                        )}
                        {currentHint < exercise.hints.length - 1 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentHint(currentHint + 1)}
                          >
                            Next →
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-yellow-800">{exercise.hints[currentHint]}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Evaluation Area */}
          <Card className="border border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-orange-900">📊 Evaluation & Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {isEvaluated && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Overall Score</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {Math.round(score)}%
                    </span>
                  </div>
                  <Progress value={score} className="h-3 bg-gray-200">
                    <div 
                      className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </Progress>
                </div>
              )}

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">📋 Evaluation Criteria:</h4>
                {exercise.evaluation.map((criterion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border">
                    {isEvaluated ? (
                      evaluation[criterion] ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5"></div>
                    )}
                    <span className={`text-sm ${
                      isEvaluated 
                        ? evaluation[criterion] 
                          ? 'text-green-800 font-medium' 
                          : 'text-red-800'
                        : 'text-gray-700'
                    }`}>
                      {criterion}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 mt-6">
                <h4 className="font-semibold mb-3 text-gray-800">✨ Sample Solution (Color-Coded):</h4>
                <div className="bg-white p-4 rounded border">
                  <PromptHighlighter text={exercise.solution} className="text-sm leading-relaxed" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Feedback */}
        {isEvaluated && (
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-blue-900 mb-3">🎯 Performance Feedback</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedCriteria}/{totalCriteria}</div>
                  <div className="text-sm text-blue-700">Criteria Met</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{Math.round(score)}%</div>
                  <div className="text-sm text-purple-700">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work"}
                  </div>
                  <div className="text-sm text-green-700">Performance Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExerciseEmbed;
