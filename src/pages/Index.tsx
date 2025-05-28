
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Database, Shield, BookOpen, Play, ArrowRight, Lightbulb, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Index = () => {
  return (
    <>
      <SEO 
        title="AI Leren - Nederlandse AI en Prompt Engineering Platform"
        description="Leer AI gebruiken en prompt engineering in het Nederlands. Gratis toegang tot oefeningen, frameworks en veiligheidsrichtlijnen voor verantwoord AI-gebruik."
        keywords="AI leren, prompt engineering, Nederlands, kunstmatige intelligentie, AI veiligheid, ChatGPT, AI training"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AI Leren</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/ai-leren/nl">
                  <Button variant="outline">Ga naar Platform</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Leer AI Gebruiken in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Het Nederlands
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Ontdek de kracht van AI en prompt engineering. Leer hoe je veilig en effectief 
                kunstmatige intelligentie kunt gebruiken voor werk, studie en creativiteit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/ai-leren/nl">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
                    <Play className="h-5 w-5 mr-2" />
                    Start Gratis Leren
                  </Button>
                </Link>
                <Link to="/ai-veiligheid-embed-nl">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                    <Shield className="h-5 w-5 mr-2" />
                    AI Veiligheid
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Waarom AI Leren?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                AI wordt steeds belangrijker in onze dagelijkse leven. Leer hoe je het veilig en effectief kunt gebruiken.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-blue-900">Prompt Engineering</CardTitle>
                  <CardDescription>
                    Leer hoe je effectieve prompts schrijft voor ChatGPT, Gemini en andere AI-tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 50+ Nederlandse oefeningen</li>
                    <li>• Stap-voor-stap uitleg</li>
                    <li>• Directe feedback</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all">
                <CardHeader>
                  <Database className="h-12 w-12 text-purple-600 mb-4" />
                  <CardTitle className="text-purple-900">Prompt Database</CardTitle>
                  <CardDescription>
                    Ontdek bewezen prompts voor verschillende doeleinden en vakgebieden
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 200+ professionele prompts</li>
                    <li>• Alle categorieën</li>
                    <li>• Nederlandse uitleg</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100 hover:border-green-300 transition-all">
                <CardHeader>
                  <Shield className="h-12 w-12 text-green-600 mb-4" />
                  <CardTitle className="text-green-900">AI Veiligheid</CardTitle>
                  <CardDescription>
                    Leer hoe je AI veilig en verantwoord kunt gebruiken zonder risico's
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Privacy beschermen</li>
                    <li>• Ethische richtlijnen</li>
                    <li>• Beste praktijken</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">AI Oefeningen</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">200+</div>
                <div className="text-gray-600">Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-gray-600">Frameworks</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-gray-600">Gratis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Modules Preview */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Leermodules
              </h2>
              <p className="text-xl text-gray-600">
                Volg onze gestructureerde leerpad van beginner tot expert
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-100 text-green-800">Beginner</Badge>
                </div>
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Module 1: AI Fundamenten</CardTitle>
                  <CardDescription>
                    Leer de basics van AI en hoe je het kunt gebruiken
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li>• Wat is AI?</li>
                    <li>• Verschillende AI-tools</li>
                    <li>• Eerste prompts schrijven</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-100 text-yellow-800">Gemiddeld</Badge>
                </div>
                <CardHeader>
                  <Lightbulb className="h-10 w-10 text-yellow-600 mb-2" />
                  <CardTitle>Module 2: Geavanceerde Technieken</CardTitle>
                  <CardDescription>
                    Ontdek krachtige prompt engineering methoden
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li>• Chain-of-thought prompting</li>
                    <li>• Few-shot learning</li>
                    <li>• Persona technieken</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-100 text-red-800">Gevorderd</Badge>
                </div>
                <CardHeader>
                  <Award className="h-10 w-10 text-red-600 mb-2" />
                  <CardTitle>Module 3: Praktische Toepassingen</CardTitle>
                  <CardDescription>
                    Pas je kennis toe in echte scenario's
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 mb-4">
                    <li>• Zakelijke toepassingen</li>
                    <li>• Creatieve projecten</li>
                    <li>• Automatisering</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Link to="/ai-leren/nl">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Start met Leren
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Begin Vandaag met AI Leren
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Gratis toegang tot alle content. Geen registratie vereist. Start direct!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ai-leren/nl">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Play className="h-5 w-5 mr-2" />
                  Ga naar Platform
                </Button>
              </Link>
              <Link to="/ai-veiligheid-embed-nl">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  <Shield className="h-5 w-5 mr-2" />
                  Leer AI Veiligheid
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Brain className="h-6 w-6 text-blue-400" />
                  <span className="text-lg font-bold">AI Leren</span>
                </div>
                <p className="text-gray-400">
                  Het Nederlandse platform voor AI en prompt engineering educatie.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Leren</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/ai-leren/nl" className="hover:text-white">Prompt Engineering</Link></li>
                  <li><Link to="/database-embed-nl" className="hover:text-white">Prompt Database</Link></li>
                  <li><Link to="/framework-embed-nl" className="hover:text-white">Frameworks</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Veiligheid</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/ai-veiligheid-embed-nl" className="hover:text-white">AI Veiligheid</Link></li>
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Ethiek</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Over Ons</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Ondersteuning</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 AI Leren. Gratis Nederlands AI educatieplatform.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
