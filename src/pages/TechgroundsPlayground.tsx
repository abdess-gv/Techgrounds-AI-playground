
import React, { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Code, Workflow, FileJson, Code2, Brain, Shield, Database, 
  Sparkles, Zap, Target, BookOpen, HelpCircle, Trophy
} from 'lucide-react';
import SEO from '@/components/SEO';
import AppErrorBoundary from '@/components/ErrorBoundary/AppErrorBoundary';
import { useSystemMonitoring } from '@/hooks/useSystemMonitoring';

const TechgroundsPlayground = () => {
  const navigate = useNavigate();
  const { status, isHealthy } = useSystemMonitoring();

  const programmingModules = [
    {
      id: 'json',
      title: 'JSON Mastery',
      description: 'Leer JSON van basis tot geavanceerd niveau met interactieve oefeningen',
      icon: FileJson,
      color: 'bg-blue-500',
      levels: ['Beginner', 'Intermediate', 'Advanced'],
      features: ['Live Code Editor', 'Real-time Validation', 'Interactive Examples'],
      available: true,
      path: '/embed/json'
    },
    {
      id: 'python',
      title: 'Python Programming',
      description: 'Master Python programming met hands-on coding exercises',
      icon: Code2,
      color: 'bg-green-500',
      levels: ['Beginner', 'Intermediate', 'Advanced'],
      features: ['In-browser Execution', 'Step-by-step Guidance', 'Project-based Learning'],
      available: true,
      path: '/embed/python'
    },
    {
      id: 'workflow',
      title: 'Workflow Designer',
      description: 'Ontwerp en verstaan van workflows met drag-and-drop interface',
      icon: Workflow,
      color: 'bg-purple-500',
      levels: ['Basic', 'Intermediate', 'Expert'],
      features: ['Visual Builder', 'Terminology Guide', 'Export Options'],
      available: true,
      path: '/embed/workflow'
    }
  ];

  const aiTrainingModules = [
    {
      id: 'prompt-engineering',
      title: 'Prompt Engineering',
      description: 'Leer effectieve prompts schrijven voor AI-systemen',
      icon: Brain,
      color: 'bg-indigo-500',
      levels: ['Beginner', 'Intermediate', 'Advanced'],
      features: ['Interactive Exercises', 'Real Examples', 'Best Practices'],
      available: true,
      path: '/embed/prompt-engineering'
    },
    {
      id: 'ai-safety',
      title: 'AI Veiligheid',
      description: 'Leer over veilig en verantwoord gebruik van AI-systemen',
      icon: Shield,
      color: 'bg-red-500',
      levels: ['Basic', 'Intermediate', 'Advanced'],
      features: ['Security Guidelines', 'Risk Assessment', 'Best Practices'],
      available: true,
      path: '/embed/ai-safety'
    },
    {
      id: 'frameworks',
      title: 'AI Frameworks',
      description: 'Ontdek bewezen frameworks voor effectieve prompt constructie',
      icon: Database,
      color: 'bg-teal-500',
      levels: ['STAR', 'RACE', 'SMART'],
      features: ['Framework Templates', 'Use Cases', 'Examples'],
      available: true,
      path: '/embed/frameworks'
    },
    {
      id: 'database',
      title: 'Prompt Database',
      description: 'Doorzoekbare database met geteste prompts en templates',
      icon: Database,
      color: 'bg-cyan-500',
      levels: ['Search', 'Filter', 'Categories'],
      features: ['500+ Prompts', 'Copy Templates', 'Category Filter'],
      available: true,
      path: '/embed/database'
    }
  ];

  const quizModules = [
    {
      id: 'ai-terms-quiz',
      title: 'AI-termen Quiz',
      description: 'Test je kennis van AI-begrippen met drag-and-drop quiz',
      icon: Trophy,
      color: 'bg-orange-500',
      levels: ['Makkelijk', 'Gemiddeld', 'Moeilijk'],
      features: ['Drag & Drop', '3 Levels', 'Instant Feedback'],
      available: true,
      path: '/embed/quiz'
    }
  ];

  const renderModuleGrid = (modules: any[], title: string) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{title}</h2>
      <div className="grid lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 ${module.color} rounded-lg`}>
                  <module.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  {module.available && (
                    <Badge className="mt-1 bg-green-100 text-green-800">Beschikbaar</Badge>
                  )}
                </div>
              </div>
              <CardDescription className="text-base">
                {module.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Skill Levels */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Niveaus/Opties:</h4>
                <div className="flex flex-wrap gap-2">
                  {module.levels.map((level: string, index: number) => (
                    <Badge 
                      key={level} 
                      variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {module.features.map((feature: string) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="w-full mt-6" 
                onClick={() => {
                  if (module.available && module.path) {
                    navigate(module.path);
                  }
                }}
              >
                <Code className="h-4 w-4 mr-2" />
                Start Learning
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <AppErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <>
          <SEO 
            title="Techgrounds AI-Playground - Interactive Learning Platform"
            description="Leer programmeren en workflows met interactieve oefeningen voor JSON, Python, Workflow Design, AI Training en Quiz"
            keywords="techgrounds, AI, playground, JSON, Python, workflow, programming, prompt engineering, AI safety, quiz"
          />
          
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <Link to="/" className="flex items-center space-x-2">
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <ArrowLeft className="h-4 w-4" />
                      <span>Terug naar Home</span>
                    </Button>
                  </Link>
                  
                  <div className="flex items-center space-x-4">
                    {/* System Status Indicator */}
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                      <span className="text-sm text-gray-600">
                        {isHealthy ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Techgrounds AI-Playground
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Interactief leerplatform voor programmeren, AI training en knowledge testing. 
                  Leer door te doen met hands-on oefeningen en real-time feedback.
                </p>

                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Real-time Execution</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Target className="h-4 w-4 text-green-500" />
                    <span>Multiple Skill Levels</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span>Embeddable Components</span>
                  </div>
                </div>
              </div>

              {/* Programming Modules */}
              {renderModuleGrid(programmingModules, "🚀 Programmeer Training")}

              {/* AI Training Modules */}
              {renderModuleGrid(aiTrainingModules, "🤖 AI Training & Veiligheid")}

              {/* Quiz Modules */}
              {renderModuleGrid(quizModules, "🎯 Knowledge Testing")}

              {/* System Status */}
              {!isHealthy && (
                <Card className="border-red-200 bg-red-50 mb-8">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 text-red-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">System Status:</span>
                      <span>Experiencing issues - Auto-recovery in progress</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Embed Info */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Embed deze Modules!</h3>
                  <p className="text-blue-100 mb-6">
                    Alle leermodules zijn embeddable en kunnen eenvoudig in je eigen website worden geïntegreerd.
                  </p>
                  <div className="flex justify-center space-x-4 flex-wrap gap-2">
                    <Badge variant="secondary" className="text-blue-800">
                      iframe-ready
                    </Badge>
                    <Badge variant="secondary" className="text-blue-800">
                      Responsive Design
                    </Badge>
                    <Badge variant="secondary" className="text-blue-800">
                      No Registration Required
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      </Suspense>
    </AppErrorBoundary>
  );
};

export default TechgroundsPlayground;
