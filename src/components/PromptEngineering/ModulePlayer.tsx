
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  CheckCircle, 
  Lock, 
  BookOpen, 
  Target, 
  Clock, 
  Star,
  Trophy,
  ArrowRight,
  RotateCcw
} from "lucide-react";
import ExercisePlayer from './ExercisePlayer';

interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  concepts: string[];
  exercises: number;
  prerequisites?: string[];
}

interface ModulePlayerProps {
  initialModule?: string;
}

const modules: Module[] = [
  {
    id: 'foundations',
    title: 'Prompt Engineering Foundations',
    description: 'Master the core principles of effective prompt design and AI communication',
    difficulty: 'beginner',
    estimatedTime: '3-4 hours',
    concepts: [
      'Clear instruction writing',
      'Role assignment and personas',
      'Output formatting and structure',
      'Context setting and background',
      'Example-driven prompting',
      'Creative constraints',
      'Feedback systems',
      'Advanced structuring'
    ],
    exercises: 8
  },
  {
    id: 'advanced-techniques',
    title: 'Advanced Prompting Techniques',
    description: 'Learn sophisticated methods for complex reasoning and analysis tasks',
    difficulty: 'intermediate',
    estimatedTime: '4-5 hours',
    concepts: [
      'Chain-of-thought reasoning',
      'Multi-step problem solving',
      'Conditional logic prompts',
      'Error handling and validation',
      'Performance optimization',
      'Domain adaptation'
    ],
    exercises: 8,
    prerequisites: ['foundations']
  },
  {
    id: 'system-design',
    title: 'AI System Design & Architecture',
    description: 'Architect production-ready AI systems with advanced prompt engineering',
    difficulty: 'advanced',
    estimatedTime: '5-6 hours',
    concepts: [
      'RAG system design',
      'Multi-agent architectures',
      'Production optimization',
      'Evaluation frameworks',
      'Scalability planning',
      'Quality assurance'
    ],
    exercises: 8,
    prerequisites: ['foundations', 'advanced-techniques']
  }
];

const ModulePlayer = ({ initialModule }: ModulePlayerProps) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(initialModule || null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [moduleProgress, setModuleProgress] = useState<{ [key: string]: number }>({});
  const [showExercises, setShowExercises] = useState(false);

  const isModuleUnlocked = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module?.prerequisites) return true;
    return module.prerequisites.every(prereq => completedModules.has(prereq));
  };

  const getModuleProgress = (moduleId: string) => {
    return moduleProgress[moduleId] || 0;
  };

  const handleModuleSelect = (moduleId: string) => {
    if (isModuleUnlocked(moduleId)) {
      setSelectedModule(moduleId);
      setShowExercises(false);
    }
  };

  const handleStartExercises = () => {
    setShowExercises(true);
  };

  const handleBackToModule = () => {
    setShowExercises(false);
  };

  const selectedModuleData = modules.find(m => m.id === selectedModule);

  if (showExercises && selectedModuleData) {
    return (
      <ExercisePlayer 
        level={selectedModuleData.difficulty}
      />
    );
  }

  if (selectedModule && selectedModuleData) {
    return (
      <div className="space-y-6">
        {/* Module Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedModule(null)}>
            ← Back to Modules
          </Button>
          <Badge className={`${
            selectedModuleData.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
            selectedModuleData.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {selectedModuleData.difficulty}
          </Badge>
        </div>

        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="text-purple-900">{selectedModuleData.title}</span>
            </CardTitle>
            <p className="text-purple-700 mt-2">{selectedModuleData.description}</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-900">{selectedModuleData.estimatedTime}</div>
                <div className="text-sm text-blue-700">Estimated Time</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-900">{selectedModuleData.exercises}</div>
                <div className="text-sm text-green-700">Hands-on Exercises</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <Star className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                <div className="font-semibold text-orange-900">{selectedModuleData.concepts.length}</div>
                <div className="text-sm text-orange-700">Core Concepts</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Module Progress</span>
              <span className="text-sm text-gray-600">
                {Math.round(getModuleProgress(selectedModule))}% Complete
              </span>
            </div>
            <Progress value={getModuleProgress(selectedModule)} className="mb-6" />
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="concepts">Learning Path</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Core Concepts</h4>
                    <ul className="space-y-2">
                      {selectedModuleData.concepts.map((concept, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{concept}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Learning Approach</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span>Hands-on exercises with real-world scenarios</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-green-600" />
                        <span>Step-by-step guidance and examples</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-orange-600" />
                        <span>Immediate feedback and progress tracking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concepts">
            <Card>
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedModuleData.concepts.map((concept, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{concept}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Interactive exercises and examples to master this concept
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exercises">
            <Card>
              <CardHeader>
                <CardTitle>Practice Exercises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Practice?</h3>
                  <p className="text-gray-600 mb-6">
                    Complete {selectedModuleData.exercises} hands-on exercises to master {selectedModuleData.title.toLowerCase()}
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleStartExercises}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Exercises
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-purple-900 mb-2">
            Prompt Engineering Learning Modules
          </h1>
          <p className="text-purple-700">
            Master AI communication through structured, hands-on learning paths
          </p>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const isUnlocked = isModuleUnlocked(module.id);
          const isCompleted = completedModules.has(module.id);
          const progress = getModuleProgress(module.id);

          return (
            <Card 
              key={module.id}
              className={`hover:shadow-lg transition-all duration-200 ${
                isUnlocked 
                  ? 'cursor-pointer border-2 hover:border-purple-300' 
                  : 'opacity-60 cursor-not-allowed border-gray-200'
              } ${isCompleted ? 'bg-green-50 border-green-300' : ''}`}
              onClick={() => handleModuleSelect(module.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center space-x-2 mb-2">
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : isUnlocked ? (
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      ) : (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                      <span className={isUnlocked ? 'text-gray-900' : 'text-gray-500'}>
                        {module.title}
                      </span>
                    </CardTitle>
                    <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                      {module.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Module Details */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {module.estimatedTime}
                    </span>
                    <Badge className={`${
                      module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {module.difficulty}
                    </Badge>
                  </div>

                  {/* Progress */}
                  {isUnlocked && progress > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Progress</span>
                        <span className="text-xs text-gray-600">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-1" />
                    </div>
                  )}

                  {/* Prerequisites */}
                  {module.prerequisites && module.prerequisites.length > 0 && (
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Prerequisites:</span>
                      <div className="mt-1">
                        {module.prerequisites.map((prereq, index) => {
                          const isPrereqComplete = completedModules.has(prereq);
                          const prereqModule = modules.find(m => m.id === prereq);
                          return (
                            <div key={index} className="flex items-center space-x-1">
                              {isPrereqComplete ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <div className="w-3 h-3 border border-gray-300 rounded-full" />
                              )}
                              <span>{prereqModule?.title || prereq}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${
                      isCompleted 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : isUnlocked
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isUnlocked}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Review Module
                      </>
                    ) : isUnlocked ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Locked
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Getting Started Guide */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-blue-900 mb-3">🚀 How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-blue-800">
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Learn Concepts</h4>
              <p className="text-sm">Master core principles through guided lessons</p>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Practice Skills</h4>
              <p className="text-sm">Apply knowledge with hands-on exercises</p>
            </div>
            <div className="text-center">
              <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Track Progress</h4>
              <p className="text-sm">Monitor your learning and unlock new modules</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulePlayer;
