
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench, Sparkles, Code, Workflow } from "lucide-react";
import SEO from '@/components/SEO';

const AIToolsPage = () => {
  return (
    <>
      <SEO 
        title="AI Tools - AI Leren"
        description="Discover powerful AI tools and applications for productivity and learning"
        keywords="AI tools, artificial intelligence, productivity, automation"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <Button variant="ghost" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Terug naar Home</span>
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <Wrench className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Tools</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ontdek krachtige AI-tools en applicaties voor productiviteit en leren
            </p>
          </div>

          {/* Techgrounds AI-Playground - Featured */}
          <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Techgrounds AI-Playground</CardTitle>
                  <CardDescription className="text-lg">
                    Nieuw! Interactief leerplatform voor programmeren en workflows
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded-lg">
                  <Code className="h-8 w-8 text-blue-600 mb-2" />
                  <h4 className="font-semibold">JSON & Python</h4>
                  <p className="text-sm text-gray-600">Hands-on coding met real-time feedback</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Workflow className="h-8 w-8 text-purple-600 mb-2" />
                  <h4 className="font-semibold">Workflow Designer</h4>
                  <p className="text-sm text-gray-600">Visual workflow creation tool</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Sparkles className="h-8 w-8 text-green-600 mb-2" />
                  <h4 className="font-semibold">3 Skill Levels</h4>
                  <p className="text-sm text-gray-600">Beginner tot gevorderd niveau</p>
                </div>
              </div>
              <Link to="/playground">
                <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Launch AI-Playground
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI Learning Platform</CardTitle>
              <CardDescription>
                Bestaande leermodules en frameworks voor AI prompt engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Prompt Engineering</h3>
                  <p className="text-blue-700 text-sm mb-4">
                    Leer effectieve prompts schrijven voor AI-systemen
                  </p>
                  <Link to="/ai-leren/nl">
                    <Button size="sm">Start Leren</Button>
                  </Link>
                </div>
                
                <div className="p-6 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">AI Frameworks</h3>
                  <p className="text-green-700 text-sm mb-4">
                    Gebruik bewezen frameworks voor betere AI-resultaten
                  </p>
                  <Link to="/prompt-engineering">
                    <Button size="sm" variant="outline">Bekijk Frameworks</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button variant="outline">
                Terug naar Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIToolsPage;
