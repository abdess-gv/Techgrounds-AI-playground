
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Brain, Target, BookOpen, Lightbulb, Award } from "lucide-react";
import EnhancedInteractiveExercise from './EnhancedInteractiveExercise';
import { exerciseDatabase, Exercise } from './ExerciseData';

interface ExercisePlayerProps {
  level: "beginner" | "intermediate" | "advanced";
}

const ExercisePlayer = ({ level }: ExercisePlayerProps) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [exerciseScores, setExerciseScores] = useState<{ [key: string]: number }>({});

  const exercises = exerciseDatabase[level] || [];
  const completionRate = exercises.length > 0 ? (completedExercises.size / exercises.length) * 100 : 0;
  const averageScore = Object.keys(exerciseScores).length > 0 
    ? Object.values(exerciseScores).reduce((sum, score) => sum + score, 0) / Object.values(exerciseScores).length
    : 0;

  const handleExerciseComplete = (exerciseId: string, score: number) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]));
    setExerciseScores(prev => ({ ...prev, [exerciseId]: score }));
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300'
  };

  if (selectedExercise) {
    return (
      <EnhancedInteractiveExercise
        exercise={selectedExercise}
        onComplete={(score) => handleExerciseComplete(selectedExercise.id, score)}
        onBack={() => setSelectedExercise(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Exercise Hub Header */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <span className="text-purple-900">
              {level.charAt(0).toUpperCase() + level.slice(1)} Exercise Hub
            </span>
          </CardTitle>
          <CardDescription className="text-purple-700">
            Complete {exercises.length} interactive exercises to master prompt engineering skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">{exercises.length}</div>
              <div className="text-sm text-purple-700">Total Exercises</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{completedExercises.size}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{Math.round(averageScore)}%</div>
              <div className="text-sm text-blue-700">Avg Score</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-purple-800">Overall Progress</span>
            <span className="text-sm text-purple-600">
              {completedExercises.size} / {exercises.length} completed
            </span>
          </div>
          <Progress value={completionRate} className="h-3 bg-purple-100" />
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise, index) => {
          const isCompleted = completedExercises.has(exercise.id);
          const score = exerciseScores[exercise.id];
          
          return (
            <Card 
              key={exercise.id}
              className={`hover:shadow-lg transition-all duration-200 border-2 ${
                isCompleted 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">
                      {exercise.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {exercise.description}
                    </CardDescription>
                  </div>
                  <div className="ml-3">
                    <Badge className={`${difficultyColors[exercise.difficulty]} text-xs`}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Exercise Details */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {exercise.category}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {exercise.estimatedTime}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      <Lightbulb className="h-2 w-2 mr-1" />
                      {exercise.hints.length} hints
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Award className="h-2 w-2 mr-1" />
                      {exercise.tips.length} tips
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      📚 {exercise.resources.length} resources
                    </Badge>
                  </div>

                  {/* Score Display */}
                  {isCompleted && score !== undefined && (
                    <div className="bg-green-100 p-2 rounded border border-green-300">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Completed</span>
                        <span className="text-sm font-bold text-green-900">{Math.round(score)}%</span>
                      </div>
                      <Progress value={score} className="h-1 mt-1 bg-green-200" />
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    onClick={() => setSelectedExercise(exercise)}
                    className={`w-full ${
                      isCompleted 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isCompleted ? 'Review Exercise' : 'Start Exercise'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Celebration */}
      {completionRate === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              Congratulations! Level Complete!
            </h3>
            <p className="text-green-700 mb-4">
              You've completed all {exercises.length} exercises in the {level} track with an average score of {Math.round(averageScore)}%!
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Continue to Next Level
              </Button>
              <Button variant="outline" size="lg">
                Review All Exercises
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started Guide */}
      {completedExercises.size === 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-blue-900 mb-3">🚀 Getting Started</h3>
            <div className="space-y-2 text-blue-800">
              <p>• Each exercise includes hints, tips, and learning resources</p>
              <p>• Practice with real-world scenarios and get instant feedback</p>
              <p>• Build your skills progressively from basic to advanced concepts</p>
              <p>• Track your progress and review completed exercises anytime</p>
            </div>
            <Button 
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => exercises[0] && setSelectedExercise(exercises[0])}
            >
              Start Your First Exercise
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExercisePlayer;
