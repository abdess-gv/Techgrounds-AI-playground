import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Brain, Code, Database, Target, Trophy, Users, Zap, Clock, Award, Star, Play } from "lucide-react";

interface LearningPathProps {
  selectedLevel: "beginner" | "intermediate" | "advanced";
  onLevelChange: (level: "beginner" | "intermediate" | "advanced") => void;
}

const LearningPath = ({ selectedLevel, onLevelChange }: LearningPathProps) => {
  const learningPaths = {
    beginner: {
      title: "Foundation Track",
      description: "Start your journey into AI prompting and learn the fundamentals",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      modules: [
        {
          title: "Introduction to AI & LLMs",
          description: "Understanding how language models work and think",
          duration: "2 hours",
          progress: 0,
          topics: [
            "What are Large Language Models?", 
            "How do they generate text?", 
            "Understanding AI limitations",
            "Common AI behaviors and patterns",
            "Setting realistic expectations"
          ],
          objectives: [
            "Understand basic AI concepts",
            "Recognize AI capabilities and limitations",
            "Prepare for effective prompting"
          ]
        },
        {
          title: "Basic Prompting Fundamentals",
          description: "Learn essential prompting strategies and techniques",
          duration: "3 hours",
          progress: 0,
          topics: [
            "Writing clear instructions", 
            "Setting proper context", 
            "Output formatting basics",
            "Simple role assignments",
            "Basic prompt structure"
          ],
          objectives: [
            "Write clear, specific prompts",
            "Structure basic instructions effectively",
            "Get consistent AI responses"
          ]
        },
        {
          title: "Prompt Structure & Best Practices",
          description: "Master the anatomy of effective prompts",
          duration: "2.5 hours",
          progress: 0,
          topics: [
            "Prompt anatomy breakdown", 
            "Common prompting mistakes", 
            "Testing and iteration strategies",
            "Length and clarity balance",
            "Error handling basics"
          ],
          objectives: [
            "Understand prompt components",
            "Avoid common pitfalls",
            "Test and improve prompts systematically"
          ]
        },
        {
          title: "Hands-on Practice Workshop",
          description: "Apply your knowledge with guided exercises",
          duration: "4 hours",
          progress: 0,
          topics: [
            "Writing assistant prompts", 
            "Content generation tasks", 
            "Q&A system design",
            "Creative writing prompts",
            "Data formatting exercises"
          ],
          objectives: [
            "Build practical prompting skills",
            "Complete real-world exercises",
            "Gain confidence in prompt writing"
          ]
        }
      ]
    },
    intermediate: {
      title: "Advanced Techniques Track",
      description: "Master sophisticated prompting frameworks and methodologies",
      icon: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      modules: [
        {
          title: "Chain-of-Thought Prompting",
          description: "Enhance AI reasoning with structured thinking patterns",
          duration: "3.5 hours",
          progress: 0,
          topics: [
            "CoT principles and theory", 
            "Zero-shot chain-of-thought", 
            "Few-shot CoT examples",
            "Complex reasoning patterns",
            "Mathematical problem solving",
            "Logical deduction techniques"
          ],
          objectives: [
            "Implement CoT reasoning effectively",
            "Design multi-step problem solving",
            "Improve AI logical thinking"
          ]
        },
        {
          title: "Advanced Prompt Frameworks",
          description: "Learn and apply proven prompting methodologies",
          duration: "4 hours",
          progress: 0,
          topics: [
            "STAR method implementation", 
            "CRISP framework mastery", 
            "ReAct prompting patterns",
            "Tree-of-thought approaches",
            "Self-consistency techniques",
            "Prompt chaining strategies"
          ],
          objectives: [
            "Master multiple frameworks",
            "Choose appropriate methods for tasks",
            "Combine techniques effectively"
          ]
        },
        {
          title: "Context Management & Memory",
          description: "Handle long contexts and maintain conversation state",
          duration: "3 hours",
          progress: 0,
          topics: [
            "Context window optimization", 
            "Dynamic summarization", 
            "Memory management techniques",
            "Information prioritization",
            "Context compression methods",
            "State maintenance strategies"
          ],
          objectives: [
            "Manage long conversations effectively",
            "Optimize context usage",
            "Maintain relevant information"
          ]
        },
        {
          title: "Multi-modal Prompting",
          description: "Work with text, images, and other media types",
          duration: "4.5 hours",
          progress: 0,
          topics: [
            "Vision model prompting", 
            "Image analysis techniques", 
            "Cross-modal reasoning",
            "Document understanding",
            "Chart and graph interpretation",
            "Multi-media content creation"
          ],
          objectives: [
            "Master image-text interactions",
            "Analyze visual content effectively",
            "Create multi-modal applications"
          ]
        }
      ]
    },
    advanced: {
      title: "Expert Systems Track",
      description: "Build production-ready AI systems and architectures",
      icon: Trophy,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      modules: [
        {
          title: "RAG Systems Architecture",
          description: "Design and implement retrieval-augmented generation systems",
          duration: "6 hours",
          progress: 0,
          topics: [
            "Vector database design", 
            "Embedding strategies", 
            "Retrieval optimization",
            "Query enhancement techniques",
            "Context ranking algorithms",
            "Performance monitoring",
            "Scalability considerations"
          ],
          objectives: [
            "Build complete RAG systems",
            "Optimize retrieval performance",
            "Handle enterprise-scale deployments"
          ]
        },
        {
          title: "LLM Fine-tuning & Customization",
          description: "Customize models for specific domains and tasks",
          duration: "8 hours",
          progress: 0,
          topics: [
            "Fine-tuning methodologies", 
            "LoRA and QLoRA techniques", 
            "Dataset preparation strategies",
            "Training optimization",
            "Evaluation metrics design",
            "Model deployment patterns",
            "Performance benchmarking"
          ],
          objectives: [
            "Fine-tune models effectively",
            "Create domain-specific models",
            "Optimize training processes"
          ]
        },
        {
          title: "Autonomous Agent Systems",
          description: "Build sophisticated AI agents with tool use capabilities",
          duration: "10 hours",
          progress: 0,
          topics: [
            "Agent architecture design", 
            "Tool integration patterns", 
            "Multi-agent coordination",
            "Planning and execution loops",
            "Safety and control mechanisms",
            "Agent communication protocols",
            "Error handling and recovery"
          ],
          objectives: [
            "Design autonomous agent systems",
            "Implement tool-using agents",
            "Build multi-agent applications"
          ]
        },
        {
          title: "Production Deployment & Scale",
          description: "Deploy and scale prompt-based systems in production",
          duration: "6 hours",
          progress: 0,
          topics: [
            "API design and architecture", 
            "Performance monitoring", 
            "A/B testing frameworks",
            "Cost optimization strategies",
            "Security considerations",
            "Compliance and governance",
            "MLOps for LLM applications"
          ],
          objectives: [
            "Deploy production-ready systems",
            "Monitor and optimize performance",
            "Implement enterprise governance"
          ]
        }
      ]
    }
  };

  const currentPath = learningPaths[selectedLevel];
  const IconComponent = currentPath.icon;
  const totalHours = currentPath.modules.reduce((acc, module) => acc + parseFloat(module.duration), 0);
  const totalTopics = currentPath.modules.reduce((acc, module) => acc + module.topics.length, 0);

  return (
    <div className="space-y-8">
      {/* Level Selection with Enhanced Design */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {Object.entries(learningPaths).map(([level, path]) => {
          const PathIcon = path.icon;
          const isSelected = selectedLevel === level;
          return (
            <Card 
              key={level} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? `${path.borderColor} bg-gradient-to-br ${path.bgColor} to-white border-2` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onLevelChange(level as any)}
            >
              <CardContent className="p-6 text-center">
                <PathIcon className={`h-12 w-12 mx-auto mb-3 ${isSelected ? path.color : 'text-gray-400'}`} />
                <h3 className={`font-bold text-lg mb-2 ${isSelected ? path.color : 'text-gray-700'}`}>
                  {path.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{path.description}</p>
                <div className="flex justify-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {path.modules.length} modules
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {Math.round(path.modules.reduce((acc, m) => acc + parseFloat(m.duration), 0))}h
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Path Overview with Enhanced Stats */}
      <Card className={`${currentPath.borderColor} border-2`}>
        <CardHeader className={`${currentPath.bgColor}`}>
          <CardTitle className="flex items-center space-x-4">
            <IconComponent className={`h-10 w-10 ${currentPath.color}`} />
            <div className="flex-1">
              <h2 className="text-3xl font-bold">{currentPath.title}</h2>
              <p className="text-gray-700 text-lg mt-1">{currentPath.description}</p>
            </div>
            <Badge className={`${currentPath.color} bg-white px-4 py-2 text-sm`}>
              {selectedLevel.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <div className="text-2xl font-bold text-blue-800">{currentPath.modules.length}</div>
              <div className="text-sm text-blue-600 font-medium">Learning Modules</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
              <Clock className="h-8 w-8 mx-auto mb-3 text-yellow-600" />
              <div className="text-2xl font-bold text-yellow-800">{totalHours}h</div>
              <div className="text-sm text-yellow-600 font-medium">Total Duration</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
              <Target className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <div className="text-2xl font-bold text-green-800">0%</div>
              <div className="text-sm text-green-600 font-medium">Progress</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
              <Database className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <div className="text-2xl font-bold text-purple-800">{totalTopics}</div>
              <div className="text-sm text-purple-600 font-medium">Topics Covered</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Learning Progress</span>
              <span className="text-sm text-gray-500">0 of {currentPath.modules.length} modules completed</span>
            </div>
            <Progress value={0} className="h-3 bg-gray-200" />
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Modules Display */}
      <div className="grid gap-8">
        {currentPath.modules.map((module, index) => (
          <Card 
            key={index} 
            className="hover:shadow-xl transition-all duration-300 border-l-4 hover:border-l-6"
            style={{ borderLeftColor: currentPath.color.replace('text-', '') === 'green-600' ? '#059669' : 
                     currentPath.color.replace('text-', '') === 'blue-600' ? '#2563eb' : '#7c3aed' }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-4 mb-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentPath.bgColor} ${currentPath.color} font-bold text-lg border-2 ${currentPath.borderColor}`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{module.title}</h3>
                      <p className="text-gray-600 mt-1">{module.description}</p>
                    </div>
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="px-3 py-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {module.duration}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    {module.topics.length} topics
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Learning Objectives */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Learning Objectives
                  </h4>
                  <ul className="space-y-1">
                    {module.objectives.map((objective, objIndex) => (
                      <li key={objIndex} className="text-sm text-green-800 flex items-start">
                        <Star className="h-3 w-3 mr-2 mt-0.5 text-green-600" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topics Covered */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Topics Covered
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {module.topics.map((topic, topicIndex) => (
                      <Badge 
                        key={topicIndex} 
                        variant="outline" 
                        className="text-xs py-2 px-3 justify-start bg-white hover:bg-gray-50"
                      >
                        <Code className="h-3 w-3 mr-2 text-blue-500" />
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Progress and Action */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600">Module Progress</span>
                        <span className="text-sm text-gray-500">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  </div>
                  <Button 
                    variant={module.progress === 0 ? "default" : "outline"} 
                    size="sm"
                    className="ml-4"
                  >
                    {module.progress === 0 ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Module
                      </>
                    ) : module.progress === 100 ? (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Review
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Continue
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Call to Action */}
      <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-purple-200 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white rounded-full shadow-lg">
                <Brain className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Ready to Master Prompt Engineering?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              Join thousands of learners building advanced AI applications. Start with interactive exercises 
              and progress through real-world projects that will make you a prompt engineering expert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
              >
                <Zap className="h-5 w-5 mr-2" />
                Start Learning Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Exercises
              </Button>
            </div>
            <div className="flex justify-center items-center space-x-6 mt-6 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                10,000+ learners
              </span>
              <span className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                Industry recognized
              </span>
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1" />
                4.9/5 rating
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningPath;
