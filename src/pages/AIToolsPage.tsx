
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
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

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI Tools Platform</CardTitle>
              <CardDescription>
                Deze pagina wordt momenteel ontwikkeld om een uitgebreide collectie AI-tools te bieden.
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
