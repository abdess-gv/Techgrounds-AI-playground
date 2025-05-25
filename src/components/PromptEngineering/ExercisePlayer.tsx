
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, CheckCircle, XCircle, Lightbulb, Target, Code, Database } from "lucide-react";

interface ExercisePlayerProps {
  level: "beginner" | "intermediate" | "advanced";
}

const ExercisePlayer = ({ level }: ExercisePlayerProps) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  const exercises = {
    beginner: [
      {
        title: "Basic Instruction Following",
        type: "prompting",
        difficulty: "Easy",
        description: "Write a prompt that asks the AI to summarize a text in exactly 3 sentences.",
        context: "You have a long article about climate change and need a concise summary.",
        hint: "Be specific about the length requirement and mention what type of content to focus on.",
        solution: "Please summarize the following article about climate change in exactly 3 sentences, focusing on the main causes, effects, and potential solutions:",
        evaluation: ["Clear length specification", "Mentions the topic", "Asks for structured content"]
      },
      {
        title: "Role-based Prompting",
        type: "prompting",
        difficulty: "Easy",
        description: "Create a prompt that makes the AI act as a helpful teacher explaining photosynthesis to a 10-year-old.",
        context: "You need to explain a complex scientific concept to a young student.",
        hint: "Define the role clearly and specify the audience age and explanation style.",
        solution: "Act as a patient and encouraging elementary school teacher. Explain photosynthesis to a 10-year-old student using simple words, fun analogies, and an enthusiastic tone:",
        evaluation: ["Defines clear role", "Specifies audience age", "Mentions communication style"]
      }
    ],
    intermediate: [
      {
        title: "Chain-of-Thought Reasoning",
        type: "prompting",
        difficulty: "Medium",
        description: "Design a prompt for solving multi-step math word problems using chain-of-thought reasoning.",
        context: "The AI needs to show its work step-by-step for complex problems.",
        hint: "Include examples of step-by-step reasoning and ask the AI to think through each step.",
        solution: "Solve this step-by-step, showing your reasoning at each stage:\n\n1. First, identify what information is given\n2. Determine what you need to find\n3. Break down the problem into smaller steps\n4. Solve each step and explain your reasoning\n5. Check your final answer\n\nProblem:",
        evaluation: ["Provides clear structure", "Asks for step-by-step reasoning", "Includes verification step"]
      },
      {
        title: "RAG System Query Design",
        type: "rag",
        difficulty: "Medium",
        description: "Create a query strategy for a RAG system that retrieves relevant documents about renewable energy policies.",
        context: "You're building a system to answer policy questions using a database of government documents.",
        hint: "Consider different types of queries, synonyms, and how to structure the retrieval prompt.",
        solution: "Query: 'renewable energy policy incentives tax credits subsidies legislation'\nRetrieval prompt: 'Given these retrieved documents about renewable energy policies, provide a comprehensive answer about available incentives, including tax credits, subsidies, and regulatory frameworks. Cite specific document sections when possible.'",
        evaluation: ["Uses relevant keywords", "Includes synonyms", "Structures retrieval prompt clearly"]
      }
    ],
    advanced: [
      {
        title: "Fine-tuning Data Preparation",
        type: "fine-tuning",
        difficulty: "Hard",
        description: "Design a training dataset for fine-tuning a model to generate legal contract summaries.",
        context: "You need to prepare data that will teach the model to identify key contract terms and obligations.",
        hint: "Consider input-output pairs, data diversity, and quality control measures.",
        solution: "Dataset structure:\n{\n  'input': 'Contract text with key sections marked',\n  'output': 'Structured summary with: Parties, Terms, Obligations, Deadlines, Penalties'\n}\n\nQuality measures: Legal review, consistent formatting, edge case coverage",
        evaluation: ["Defines clear input-output structure", "Considers data quality", "Addresses domain specificity"]
      },
      {
        title: "Multi-Agent System Design",
        type: "agent-system",
        difficulty: "Hard",
        description: "Design a prompt system for coordinating multiple AI agents in a research task.",
        context: "You need agents to research, fact-check, and synthesize information collaboratively.",
        hint: "Define agent roles, communication protocols, and coordination mechanisms.",
        solution: "Agent Roles:\n- Researcher: Gather information from sources\n- Fact-checker: Verify claims and sources\n- Synthesizer: Combine verified information\n\nCoordination: Central coordinator assigns tasks, agents report findings with confidence scores, synthesis occurs after fact-checking approval.",
        evaluation: ["Defines clear agent roles", "Establishes communication protocol", "Includes quality control"]
      }
    ]
  };

  const currentExercises = exercises[level];
  const exercise = currentExercises[currentExercise];

  const generateEmbedCode = () => {
    const embedUrl = `${window.location.origin}/prompt-engineering/exercise-embed?level=${level}&exercise=${currentExercise}`;
    return `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0"></iframe>`;
  };

  return (
    <div className="space-y-6">
      {/* Exercise Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">Interactive Exercises</h2>
          <Badge variant="outline">{level.charAt(0).toUpperCase() + level.slice(1)}</Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
            disabled={currentExercise === 0}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            {currentExercise + 1} of {currentExercises.length}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentExercise(Math.min(currentExercises.length - 1, currentExercise + 1))}
            disabled={currentExercise === currentExercises.length - 1}
          >
            Next
          </Button>
        </div>
      </div>

      <Tabs defaultValue="exercise" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercise">Exercise</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="embed">Embed</TabsTrigger>
        </TabsList>

        <TabsContent value="exercise" className="space-y-6">
          {/* Exercise Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>{exercise.title}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">{exercise.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{exercise.type}</Badge>
                  <Badge variant={exercise.difficulty === "Easy" ? "default" : exercise.difficulty === "Medium" ? "secondary" : "destructive"}>
                    {exercise.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Context:</h4>
                <p className="text-blue-800">{exercise.context}</p>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Workspace */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>Your Solution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Write your prompt here..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  className="min-h-[200px] font-mono"
                />
                
                <div className="flex items-center space-x-2">
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Test Prompt
                  </Button>
                  <Button variant="outline" onClick={() => setUserPrompt("")}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {showHint ? "Hide" : "Show"} Hint
                  </Button>
                </div>

                {showHint && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900">Hint:</h4>
                        <p className="text-yellow-800">{exercise.hint}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Evaluation Area */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Evaluation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Evaluation Criteria:</h4>
                  {exercise.evaluation.map((criterion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                      <span className="text-sm">{criterion}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Sample Solution:</h4>
                  <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
                    {exercise.solution}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Related Examples</CardTitle>
              <CardDescription>See how similar problems are solved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Example 1: Good Prompt</h4>
                  <pre className="bg-gray-50 p-3 rounded mt-2 text-sm overflow-x-auto">
                    {exercise.solution}
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">
                    ✅ Clear, specific, and follows best practices
                  </p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold">Example 2: Poor Prompt</h4>
                  <pre className="bg-gray-50 p-3 rounded mt-2 text-sm overflow-x-auto">
                    Summarize this text.
                  </pre>
                  <p className="text-sm text-gray-600 mt-2">
                    ❌ Too vague, no specific requirements
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="embed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Embed This Exercise</CardTitle>
              <CardDescription>Use this exercise on your own website or learning platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Embed Code:</h4>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                  {generateEmbedCode()}
                </pre>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Direct Link:</h4>
                <code className="bg-gray-100 p-2 rounded text-sm">
                  {window.location.origin}/prompt-engineering/exercise-embed?level={level}&exercise={currentExercise}
                </code>
              </div>

              <Button onClick={() => {
                navigator.clipboard.writeText(generateEmbedCode());
              }}>
                Copy Embed Code
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExercisePlayer;
