
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Lock, CheckCircle, Clock } from "lucide-react";
import { useMoodleIntegration } from "@/hooks/useMoodleIntegration";
import { toast } from "sonner";

interface Course {
  id: number;
  name: string;
  description: string;
  category: 'free' | 'premium' | 'enterprise';
  estimatedHours: number;
  thumbnail?: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { courseProgress, generateSSOUrl, checkPremiumAccess } = useMoodleIntegration();
  
  const progress = courseProgress.find(p => p.moodle_course_id === course.id);
  const hasAccess = course.category === 'free' || checkPremiumAccess(course.category);

  const handleCourseAccess = async () => {
    if (!hasAccess) {
      toast.error('Premium access required for this course');
      return;
    }

    try {
      const ssoUrl = await generateSSOUrl(course.id);
      window.open(ssoUrl, '_blank');
    } catch (error) {
      toast.error('Failed to access course');
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'free': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'free': return 'Gratis';
      case 'premium': return 'Premium';
      case 'enterprise': return 'Enterprise';
      default: return category;
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{course.name}</CardTitle>
              {progress?.certificate_earned && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
            </div>
            <Badge className={`text-xs ${getCategoryColor(course.category)}`}>
              {getCategoryLabel(course.category)}
            </Badge>
          </div>
          {!hasAccess && (
            <Lock className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {progress && (
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
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{course.estimatedHours} uren geschat</span>
        </div>

        <Button 
          onClick={handleCourseAccess}
          disabled={!hasAccess}
          className="w-full"
          variant={hasAccess ? "default" : "secondary"}
        >
          {hasAccess ? (
            <>
              <ExternalLink className="h-4 w-4 mr-2" />
              {progress ? 'Verder gaan' : 'Start cursus'}
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Premium toegang vereist
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
