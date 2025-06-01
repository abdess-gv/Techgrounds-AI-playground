
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Clock, TrendingUp } from "lucide-react";
import { useMoodleIntegration } from "@/hooks/useMoodleIntegration";
import CourseCard from "./CourseCard";

const sampleCourses = [
  {
    id: 1,
    name: "AI Fundamentals",
    description: "Learn the basics of Artificial Intelligence and Machine Learning",
    category: 'free' as const,
    estimatedHours: 8
  },
  {
    id: 2,
    name: "Advanced Prompt Engineering",
    description: "Master advanced techniques for creating effective AI prompts",
    category: 'premium' as const,
    estimatedHours: 12
  },
  {
    id: 3,
    name: "Enterprise AI Strategy",
    description: "Implement AI solutions at enterprise scale",
    category: 'enterprise' as const,
    estimatedHours: 20
  }
];

const MoodleDashboard = () => {
  const { courseProgress, premiumAccess, loading } = useMoodleIntegration();
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificatesEarned: 0
  });

  useEffect(() => {
    if (courseProgress.length > 0) {
      const completedCourses = courseProgress.filter(p => p.completion_percentage === 100).length;
      const certificatesEarned = courseProgress.filter(p => p.certificate_earned).length;
      const totalHours = courseProgress.reduce((sum, p) => sum + (p.total_lessons * 0.5), 0); // Estimate 30min per lesson

      setStats({
        totalCourses: courseProgress.length,
        completedCourses,
        totalHours: Math.round(totalHours),
        certificatesEarned
      });
    }
  }, [courseProgress]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Actieve Cursussen</p>
                <p className="text-2xl font-bold">{stats.totalCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Certificaten</p>
                <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Studietijd</p>
                <p className="text-2xl font-bold">{stats.totalHours}u</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Voltooid</p>
                <p className="text-2xl font-bold">{stats.completedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Cursussen</TabsTrigger>
          <TabsTrigger value="progress">Voortgang</TabsTrigger>
          <TabsTrigger value="premium">Premium Status</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {courseProgress.length > 0 ? (
            <div className="space-y-4">
              {courseProgress.map((progress) => (
                <Card key={progress.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{progress.course_name}</CardTitle>
                        <CardDescription>
                          Laatst geopend: {new Date(progress.last_accessed).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      {progress.certificate_earned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Award className="h-3 w-3 mr-1" />
                          Certificaat behaald
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Voortgang</span>
                        <span>{progress.completion_percentage}%</span>
                      </div>
                      <Progress value={progress.completion_percentage} className="h-2" />
                      <div className="text-xs text-gray-500">
                        {progress.completed_lessons} van {progress.total_lessons} lessen voltooid
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nog geen cursussen gestart</h3>
                <p className="text-gray-600">Begin met een cursus om je voortgang te volgen</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="premium" className="space-y-4">
          {premiumAccess.length > 0 ? (
            <div className="space-y-4">
              {premiumAccess.map((access) => (
                <Card key={access.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg capitalize">
                          {access.course_type} Access
                        </CardTitle>
                        <CardDescription>
                          {access.access_level} plan
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={access.payment_status === 'completed' ? 'default' : 'secondary'}
                        className={access.payment_status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {access.payment_status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Verloopt op: {new Date(access.expires_at).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Geen premium toegang</h3>
                <p className="text-gray-600">Upgrade naar premium voor toegang tot geavanceerde cursussen</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MoodleDashboard;
