
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Play, RotateCcw, Lightbulb, Target } from "lucide-react";

const ExerciseEmbed = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level') as "beginner" | "intermediate" | "advanced" || "beginner";
  const exerciseIndex = parseInt(searchParams.get('exercise') || "0");
  
  const [userPrompt, setUserPrompt] = useState("");
  const [showHint, setShowHint] = useState(false);

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
      }
    ]
  };

  const currentExercises = exercises[level];
  const exercise = currentExercises[exerciseIndex] || currentExercises[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
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
              <CardTitle>Your Solution</CardTitle>
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
              <CardTitle>Evaluation</CardTitle>
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
      </div>
    </div>
  );
};

export default ExerciseEmbed;
