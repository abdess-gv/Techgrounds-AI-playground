
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Code, Database, Target, Trophy, Users, Zap } from "lucide-react";

interface LearningPathProps {
  selectedLevel: "beginner" | "intermediate" | "advanced";
  onLevelChange: (level: "beginner" | "intermediate" | "advanced") => void;
}

const LearningPath = ({ selectedLevel, onLevelChange }: LearningPathProps) => {
  const learningPaths = {
    beginner: {
      title: "Beginner Track",
      description: "Start your journey into prompt engineering",
      icon: Users,
      color: "text-green-600",
      modules: [
        {
          title: "Introduction to AI & LLMs",
          description: "Understanding how language models work",
          duration: "2 hours",
          progress: 0,
          topics: ["What are LLMs?", "How do they generate text?", "Basic concepts"]
        },
        {
          title: "Basic Prompting Techniques",
          description: "Learn fundamental prompting strategies",
          duration: "3 hours",
          progress: 0,
          topics: ["Clear instructions", "Context setting", "Output formatting"]
        },
        {
          title: "Prompt Structure & Best Practices",
          description: "How to structure effective prompts",
          duration: "2 hours",
          progress: 0,
          topics: ["Prompt anatomy", "Common mistakes", "Testing strategies"]
        },
        {
          title: "Hands-on Practice",
          description: "Apply what you've learned with exercises",
          duration: "4 hours",
          progress: 0,
          topics: ["Writing assistant", "Content generation", "Q&A systems"]
        }
      ]
    },
    intermediate: {
      title: "Intermediate Track",
      description: "Advanced techniques and frameworks",
      icon: Brain,
      color: "text-blue-600",
      modules: [
        {
          title: "Chain-of-Thought Prompting",
          description: "Enhance reasoning with step-by-step thinking",
          duration: "3 hours",
          progress: 0,
          topics: ["CoT principles", "Zero-shot CoT", "Few-shot examples"]
        },
        {
          title: "Prompt Frameworks",
          description: "Learn popular prompting frameworks",
          duration: "4 hours",
          progress: 0,
          topics: ["STAR method", "CRISP framework", "ReAct prompting"]
        },
        {
          title: "Context Management",
          description: "Working with long contexts and memory",
          duration: "3 hours",
          progress: 0,
          topics: ["Context windows", "Summarization", "Memory techniques"]
        },
        {
          title: "Multi-modal Prompting",
          description: "Text, image, and audio prompting",
          duration: "4 hours",
          progress: 0,
          topics: ["Vision models", "Audio processing", "Cross-modal tasks"]
        }
      ]
    },
    advanced: {
      title: "Advanced Track",
      description: "Expert-level techniques and system design",
      icon: Trophy,
      color: "text-purple-600",
      modules: [
        {
          title: "RAG Systems Design",
          description: "Build retrieval-augmented generation systems",
          duration: "6 hours",
          progress: 0,
          topics: ["Vector databases", "Embedding strategies", "Retrieval optimization"]
        },
        {
          title: "LLM Fine-tuning",
          description: "Customize models for specific tasks",
          duration: "8 hours",
          progress: 0,
          topics: ["LoRA", "QLoRA", "Dataset preparation", "Evaluation metrics"]
        },
        {
          title: "Agent Systems",
          description: "Build autonomous AI agents",
          duration: "10 hours",
          progress: 0,
          topics: ["Tool use", "Planning", "Multi-agent systems", "Safety"]
        },
        {
          title: "Production Deployment",
          description: "Scale and deploy prompt-based systems",
          duration: "6 hours",
          progress: 0,
          topics: ["API design", "Monitoring", "A/B testing", "Cost optimization"]
        }
      ]
    }
  };

  const currentPath = learningPaths[selectedLevel];
  const IconComponent = currentPath.icon;

  return (
    <div className="space-y-6">
      {/* Level Selection */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(learningPaths).map(([level, path]) => {
          const PathIcon = path.icon;
          return (
            <Button
              key={level}
              variant={selectedLevel === level ? "default" : "outline"}
              onClick={() => onLevelChange(level as any)}
              className="flex items-center space-x-2"
            >
              <PathIcon className="h-4 w-4" />
              <span>{path.title}</span>
            </Button>
          );
        })}
      </div>

      {/* Current Path Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <IconComponent className={`h-8 w-8 ${currentPath.color}`} />
            <div>
              <h2 className="text-2xl">{currentPath.title}</h2>
              <p className="text-gray-600 text-base">{currentPath.description}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">{currentPath.modules.length}</div>
              <div className="text-sm text-gray-600">Modules</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Zap className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <div className="font-semibold">
                {currentPath.modules.reduce((acc, module) => acc + parseInt(module.duration), 0)}h
              </div>
              <div className="text-sm text-gray-600">Total Time</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="font-semibold">0%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Database className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <div className="font-semibold">
                {currentPath.modules.reduce((acc, module) => acc + module.topics.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Topics</div>
            </div>
          </div>

          <Progress value={0} className="w-full" />
        </CardContent>
      </Card>

      {/* Modules */}
      <div className="grid gap-6">
        {currentPath.modules.map((module, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    <span>{module.title}</span>
                  </CardTitle>
                  <CardDescription className="mt-2">{module.description}</CardDescription>
                </div>
                <Badge variant="secondary">{module.duration}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {module.topics.map((topic, topicIndex) => (
                    <Badge key={topicIndex} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Progress value={module.progress} className="w-32" />
                    <span className="text-sm text-gray-600">{module.progress}%</span>
                  </div>
                  <Button variant="outline" size="sm">
                    {module.progress === 0 ? "Start Module" : "Continue"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to start your journey?</h3>
          <p className="text-gray-600 mb-4">
            Begin with interactive exercises and build your prompt engineering skills step by step.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Start Learning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPath;
