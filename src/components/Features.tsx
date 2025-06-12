
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, Workflow, FileJson, Code2, Brain, Shield, Database, Trophy,
  Sparkles, Zap, Target, BookOpen, Users, Award
} from 'lucide-react';

const Features = () => {
  const programmingFeatures = [
    {
      icon: FileJson,
      title: "JSON Mastery",
      description: "Leer JSON structuren begrijpen en maken met real-time validatie en interactieve oefeningen.",
      badge: "Live Editor",
      color: "text-blue-600"
    },
    {
      icon: Code2,
      title: "Python Programming",
      description: "Master Python basics tot advanced concepten met in-browser code execution en stap-voor-stap begeleiding.",
      badge: "Hands-on",
      color: "text-green-600"
    },
    {
      icon: Workflow,
      title: "Workflow Designer",
      description: "Verstaan en ontwerpen van workflows met drag-and-drop interface en terminology guide.",
      badge: "Visueel",
      color: "text-purple-600"
    }
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "Prompt Engineering",
      description: "Leer effectieve prompts schrijven voor AI-systemen met interactieve oefeningen en best practices.",
      badge: "AI Training",
      color: "text-indigo-600"
    },
    {
      icon: Shield,
      title: "AI Veiligheid",
      description: "Leer over veilig en verantwoord gebruik van AI-systemen met praktische richtlijnen.",
      badge: "Veiligheid",
      color: "text-red-600"
    },
    {
      icon: Database,
      title: "AI Frameworks & Database",
      description: "Ontdek bewezen frameworks en doorzoek 500+ geteste prompts en templates.",
      badge: "500+ Prompts",
      color: "text-teal-600"
    }
  ];

  const quizFeatures = [
    {
      icon: Trophy,
      title: "AI-termen Quiz",
      description: "Test je kennis van AI-begrippen met een interactieve drag-and-drop quiz in 3 niveaus.",
      badge: "3 Levels",
      color: "text-orange-600"
    }
  ];

  const renderFeatureGrid = (features: any[], title: string) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                <Badge variant="secondary">{feature.badge}</Badge>
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Alles wat je nodig hebt om te leren
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Van programmeerconcepten tot AI-training en knowledge testing - 
            alles in één interactief platform.
          </p>
        </div>

        {/* Programming Features */}
        {renderFeatureGrid(programmingFeatures, "🚀 Programmeer Training")}

        {/* AI Features */}
        {renderFeatureGrid(aiFeatures, "🤖 AI Training & Veiligheid")}

        {/* Quiz Features */}
        {renderFeatureGrid(quizFeatures, "🎯 Knowledge Testing")}

        {/* Platform Features */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ⚡ Platform Features
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Real-time Feedback</h4>
              <p className="text-sm text-gray-600">Instant validatie en resultaten</p>
            </Card>
            <Card className="text-center p-6">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Multiple Levels</h4>
              <p className="text-sm text-gray-600">Beginner tot expert niveau</p>
            </Card>
            <Card className="text-center p-6">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Embeddable</h4>
              <p className="text-sm text-gray-600">Integreer in je eigen website</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Geen Registratie</h4>
              <p className="text-sm text-gray-600">Direct aan de slag</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
