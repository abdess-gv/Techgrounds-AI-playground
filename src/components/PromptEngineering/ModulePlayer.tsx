
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, CheckCircle, Clock, BookOpen, Target, Lightbulb, ExternalLink } from "lucide-react";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  topics: string[];
  objectives: string[];
  exercises: string[];
  resources: Array<{
    title: string;
    type: 'video' | 'article' | 'tool' | 'example';
    url: string;
    description: string;
  }>;
}

interface ModulePlayerProps {
  module: Module;
  onComplete: () => void;
  onExerciseStart: (exerciseId: string) => void;
}

const ModulePlayer: React.FC<ModulePlayerProps> = ({ module, onComplete, onExerciseStart }) => {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<Set<number>>(new Set());

  const markTopicComplete = (topicIndex: number) => {
    setCompletedTopics(prev => new Set([...prev, topicIndex]));
    if (topicIndex < module.topics.length - 1) {
      setCurrentTopic(topicIndex + 1);
    }
  };

  const progressPercentage = (completedTopics.size / module.topics.length) * 100;

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-blue-900">{module.title}</CardTitle>
              <CardDescription className="text-blue-700 text-lg mt-2">
                {module.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <Badge className="bg-blue-100 text-blue-800 mb-2">
                <Clock className="h-3 w-3 mr-1" />
                {module.duration}
              </Badge>
              <div className="text-sm text-blue-600">
                {completedTopics.size} / {module.topics.length} topics completed
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="h-3 bg-blue-100" />
        </CardContent>
      </Card>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Learning Content</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="exercises">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Topics to Master</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {module.topics.map((topic, index) => (
                  <div 
                    key={index}
                    className={`p-4 border rounded-lg transition-all ${
                      index === currentTopic 
                        ? 'border-blue-400 bg-blue-50' 
                        : completedTopics.has(index)
                        ? 'border-green-400 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          completedTopics.has(index)
                            ? 'bg-green-500 text-white'
                            : index === currentTopic
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {completedTopics.has(index) ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        <span className={`font-medium ${
                          index === currentTopic ? 'text-blue-900' : 
                          completedTopics.has(index) ? 'text-green-900' : 'text-gray-700'
                        }`}>
                          {topic}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {index === currentTopic && !completedTopics.has(index) && (
                          <Button onClick={() => markTopicComplete(index)}>
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Study This Topic
                          </Button>
                        )}
                        {index > currentTopic && !completedTopics.has(currentTopic) && (
                          <Badge variant="outline">Locked</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Learning Objectives</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {module.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Target className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-green-900">{objective}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Practice Exercises</span>
              </CardTitle>
              <CardDescription>
                Apply what you've learned with hands-on exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {module.exercises.map((exerciseId, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <h4 className="font-medium">Exercise {index + 1}</h4>
                      <p className="text-sm text-gray-600">Practice exercise: {exerciseId}</p>
                    </div>
                    <Button 
                      onClick={() => onExerciseStart(exerciseId)}
                      disabled={completedTopics.size < module.topics.length}
                    >
                      Start Exercise
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5" />
                <span>Additional Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {module.resources.map((resource, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <Badge variant="outline" className="mt-1">
                        {resource.type}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-medium">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            View Resource →
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {progressPercentage === 100 && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-green-900 mb-2">Module Complete!</h3>
            <p className="text-green-700 mb-4">
              Congratulations on completing {module.title}. You're ready to move on to the next module!
            </p>
            <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
              Continue to Next Module
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModulePlayer;
