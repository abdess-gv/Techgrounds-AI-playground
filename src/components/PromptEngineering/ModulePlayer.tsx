
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, BookOpen, Users, Trophy, CheckCircle, ArrowLeft, Home, Target } from "lucide-react";
import { Link } from "react-router-dom";
import ExercisePlayer from './ExercisePlayer';
import LessonViewer from './LessonViewer';
import BreadcrumbNavigation from '@/components/ui/breadcrumb-navigation';

const ModulePlayer = () => {
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [showExercises, setShowExercises] = useState(false);
  const [showLessons, setShowLessons] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const modules = {
    beginner: [
      {
        title: "Introduction to AI & LLMs",
        description: "Master the basics of AI and language models",
        lessons: [
          "Wat zijn Large Language Models?",
          "AI Gedrag en Beperkingen", 
          "Praktische AI Toepassingen",
          "Ethische Overwegingen",
          "Voorbereiden op Prompting"
        ],
        exercises: 8,
        duration: "2-3 hours"
      },
      {
        title: "Basic Prompting Fundamentals", 
        description: "Learn essential prompting strategies",
        lessons: [
          "Duidelijke Instructies Schrijven",
          "Context en Achtergrond Geven", 
          "Output Formatting Basics",
          "Eenvoudige Rol Toewijzingen",
          "Basis Prompt Structuur"
        ],
        exercises: 8,
        duration: "2-3 hours"
      },
      {
        title: "Prompt Structure & Best Practices",
        description: "Master the anatomy of effective prompts", 
        lessons: [
          "Prompt Anatomie Breakdown",
          "Veelgemaakte Fouten Vermijden",
          "Test en Iteratie Strategieën",
          "Lengte en Helderheid Balans",
          "Basis Foutafhandeling"
        ],
        exercises: 8,
        duration: "2.5 hours"
      },
      {
        title: "Hands-on Practice Workshop",
        description: "Apply your knowledge with guided exercises",
        lessons: [
          "Schrijfassistent Prompts",
          "Content Generatie Taken",
          "Q&A Systeem Design", 
          "Creatieve Schrijf Prompts",
          "Data Formattering Oefeningen"
        ],
        exercises: 8,
        duration: "4 hours"
      }
    ],
    intermediate: {
      title: "Advanced Techniques",
      description: "Learn sophisticated prompting strategies",
      lessons: [
        "Multi-step Reasoning",
        "Chain-of-Thought Prompting",
        "Few-shot Learning",
        "Prompt Chaining",
        "Error Handling"
      ],
      exercises: 8,
      duration: "3-4 hours"
    },
    advanced: {
      title: "Expert Mastery",
      description: "Master complex prompting scenarios",
      lessons: [
        "Meta-prompting",
        "System Integration",
        "Custom Frameworks",
        "Performance Optimization",
        "Advanced Applications"
      ],
      exercises: 8,
      duration: "4-5 hours"
    }
  };

  const currentModules = modules[selectedLevel];
  const currentModule = Array.isArray(currentModules) ? currentModules[currentModuleIndex] : currentModules;

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300'
  };

  const handleLessonComplete = (lessonId: string) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const handleStartLessons = () => {
    setCurrentModuleIndex(0);
    setCurrentLessonIndex(0);
    setShowLessons(true);
  };

  const handleStartExercises = () => {
    setShowExercises(true);
  };

  if (showLessons) {
    return (
      <div className="space-y-4">
        <BreadcrumbNavigation 
          customItems={[
            { label: 'AI Leren', href: '/ai-leren/nl' },
            { label: 'Modules' },
            { label: currentModule.title },
            { label: 'Lessons' }
          ]}
        />
        <LessonViewer
          level={selectedLevel}
          moduleIndex={currentModuleIndex}
          lessonIndex={currentLessonIndex}
          onBack={() => setShowLessons(false)}
          onNext={() => {
            if (currentLessonIndex < currentModule.lessons.length - 1) {
              setCurrentLessonIndex(prev => prev + 1);
            } else if (Array.isArray(currentModules) && currentModuleIndex < currentModules.length - 1) {
              setCurrentModuleIndex(prev => prev + 1);
              setCurrentLessonIndex(0);
            } else {
              setShowLessons(false);
            }
          }}
          onComplete={handleLessonComplete}
        />
      </div>
    );
  }

  if (showExercises) {
    return (
      <div className="space-y-4">
        <BreadcrumbNavigation 
          customItems={[
            { label: 'AI Leren', href: '/ai-leren/nl' },
            { label: 'Modules' },
            { label: currentModule.title },
            { label: 'Exercises' }
          ]}
        />
        <Button 
          variant="outline" 
          onClick={() => setShowExercises(false)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Modules
        </Button>
        <ExercisePlayer level={selectedLevel} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BreadcrumbNavigation 
        customItems={[
          { label: 'AI Leren', href: '/ai-leren/nl' },
          { label: 'Learning Modules' }
        ]}
      />

      {/* Level Selection */}
      <Card className="border-2 border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <span className="text-purple-900">Learning Modules</span>
          </CardTitle>
          <CardDescription className="text-purple-700">
            Choose your learning path and progress through structured modules
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(modules) as Array<keyof typeof modules>).map((level) => {
              const levelModules = modules[level];
              const moduleCount = Array.isArray(levelModules) ? levelModules.length : 1;
              const isSelected = selectedLevel === level;
              
              return (
                <Card 
                  key={level}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? `border-2 ${difficultyColors[level]} shadow-lg` 
                      : 'border hover:border-purple-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedLevel(level)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={difficultyColors[level]}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Badge>
                      {isSelected && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>
                    <CardTitle className="text-lg">
                      {Array.isArray(levelModules) ? `${level.charAt(0).toUpperCase() + level.slice(1)} Track` : levelModules.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {Array.isArray(levelModules) ? `${moduleCount} modules available` : levelModules.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {moduleCount} modules
                      </span>
                      <span className="flex items-center">
                        <Trophy className="h-3 w-3 mr-1" />
                        {Array.isArray(levelModules) ? levelModules.reduce((acc, mod) => acc + mod.exercises, 0) : levelModules.exercises} exercises
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Module Overview for Selected Level */}
      {Array.isArray(currentModules) ? (
        <div className="grid md:grid-cols-2 gap-6">
          {currentModules.map((module, index) => (
            <Card key={index} className="border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <span className="text-blue-900">{module.title}</span>
                  </span>
                  <Badge className={difficultyColors[selectedLevel]}>
                    {selectedLevel}
                  </Badge>
                </CardTitle>
                <CardDescription className="text-blue-700">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {/* Module Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-blue-600">{module.lessons.length}</div>
                    <div className="text-xs text-blue-700">Lessons</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-green-600">{module.exercises}</div>
                    <div className="text-xs text-green-700">Exercises</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-lg font-bold text-purple-600">{module.duration}</div>
                    <div className="text-xs text-purple-700">Duration</div>
                  </div>
                </div>

                {/* Lessons Preview */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Lessons:</h4>
                  <div className="space-y-1">
                    {module.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                          {lessonIndex + 1}
                        </div>
                        <span className="text-gray-700">{lesson}</span>
                      </div>
                    ))}
                    {module.lessons.length > 3 && (
                      <div className="text-xs text-gray-500 ml-6">
                        +{module.lessons.length - 3} more lessons
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setCurrentModuleIndex(index);
                      handleStartLessons();
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Lessons
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setCurrentModuleIndex(index);
                      handleStartExercises();
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Exercises
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Single module view for intermediate/advanced
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="text-blue-900">{currentModule.title}</span>
              </span>
              <Badge className={difficultyColors[selectedLevel]}>
                {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
              </Badge>
            </CardTitle>
            <CardDescription className="text-blue-700">
              {currentModule.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Module Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{currentModule.lessons.length}</div>
                <div className="text-sm text-blue-700">Lessons</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{currentModule.exercises}</div>
                <div className="text-sm text-green-700">Exercises</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">{currentModule.duration}</div>
                <div className="text-sm text-purple-700">Est. Time</div>
              </div>
            </div>

            {/* Lessons List */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Module Content</h4>
              <div className="space-y-2">
                {currentModule.lessons.map((lesson, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-gray-800">{lesson}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress and Actions */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">Your Progress</span>
                  <span className="text-sm text-gray-600">0% Complete</span>
                </div>
                <Progress value={0} className="h-3 bg-gray-200" />
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={handleStartLessons}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Lessons
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleStartExercises}
                >
                  <Play className="h-5 w-5 mr-2" />
                  Practice Exercises
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-green-900 mb-3 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            💡 Learning Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-green-800">
            <div>
              <h4 className="font-semibold mb-2">For Best Results:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Complete lessons before exercises</li>
                <li>• Practice with real examples</li>
                <li>• Take notes on what works</li>
                <li>• Experiment with variations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Remember:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Prompt engineering is iterative</li>
                <li>• Practice makes perfect</li>
                <li>• Every AI model is different</li>
                <li>• Context matters most</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModulePlayer;
