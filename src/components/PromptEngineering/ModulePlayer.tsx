
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, BookOpen, Users, Trophy, CheckCircle } from "lucide-react";
import ExercisePlayer from './ExercisePlayer';

const ModulePlayer = () => {
  const [selectedLevel, setSelectedLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [showExercises, setShowExercises] = useState(false);

  const modules = {
    beginner: {
      title: "Foundation Module",
      description: "Master the basics of prompt engineering",
      lessons: [
        "Understanding AI Communication",
        "Basic Prompt Structure",
        "Role Definition Techniques",
        "Context Setting",
        "Output Formatting"
      ],
      exercises: 8,
      duration: "2-3 hours"
    },
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

  const currentModule = modules[selectedLevel];

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300'
  };

  if (showExercises) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowExercises(false)}
          className="mb-4"
        >
          ← Back to Modules
        </Button>
        <ExercisePlayer level={selectedLevel} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
              const module = modules[level];
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
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {module.lessons.length} lessons
                      </span>
                      <span className="flex items-center">
                        <Trophy className="h-3 w-3 mr-1" />
                        {module.exercises} exercises
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Duration: {module.duration}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Module Details */}
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
                onClick={() => setShowExercises(true)}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Exercises
              </Button>
              <Button variant="outline" size="lg">
                <BookOpen className="h-5 w-5 mr-2" />
                View Lessons
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-green-900 mb-3">💡 Learning Tips</h3>
          <div className="grid md:grid-cols-2 gap-4 text-green-800">
            <div>
              <h4 className="font-semibold mb-2">For Best Results:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Complete exercises in order</li>
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
