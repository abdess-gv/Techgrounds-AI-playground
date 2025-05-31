
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Database, Shield, BookOpen, Play, ArrowRight, Lightbulb, Users, Award, ChevronRight, Zap, Globe, MessageSquare, Code, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Target,
      title: "AI Prompt Engineering",
      description: "Leer effectieve prompts schrijven voor alle AI-tools",
      color: "from-blue-500 to-cyan-500",
      stats: "50+ Oefeningen"
    },
    {
      icon: Database,
      title: "Nederlandse Prompt Database",
      description: "Uitgebreide collectie van professionele prompts",
      color: "from-purple-500 to-pink-500",
      stats: "200+ Prompts"
    },
    {
      icon: Shield,
      title: "AI Veiligheid & Ethiek",
      description: "Leer AI veilig en verantwoord te gebruiken",
      color: "from-green-500 to-emerald-500",
      stats: "15+ Frameworks"
    }
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Marketing Professional", text: "Dankzij AI Leren kan ik nu veel effectievere prompts schrijven voor mijn werk." },
    { name: "Tom K.", role: "Student", text: "De Nederlandse uitleg maakt AI leren veel toegankelijker voor mij." },
    { name: "Lisa R.", role: "Ondernemer", text: "De veiligheidstips hebben me geholpen AI verantwoord in te zetten." }
  ];

  return (
    <>
      <SEO 
        title="AI Leren - Nederlandse AI en Prompt Engineering Platform"
        description="Leer AI gebruiken en prompt engineering in het Nederlands. Gratis toegang tot oefeningen, frameworks en veiligheidsrichtlijnen voor verantwoord AI-gebruik."
        keywords="AI leren, prompt engineering, Nederlands, kunstmatige intelligentie, AI veiligheid, ChatGPT, AI training"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        </div>

        {/* Navigation */}
        <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Brain className="h-8 w-8 text-blue-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Leren
                </span>
                <Badge className="bg-green-100 text-green-800 text-xs animate-pulse">LIVE</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/admin">
                  <Button variant="outline" size="sm" className="text-gray-600 hover:text-blue-600">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                <Link to="/ai-leren/nl">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Start Leren
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-200 shadow-lg">
                    <Brain className="h-6 w-6 text-blue-600 animate-pulse" />
                    <span className="text-gray-700 font-medium">Powered by AI</span>
                    <Globe className="h-6 w-6 text-green-600 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Beheers AI in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                  Het Nederlands
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Van beginner tot expert - leer prompt engineering, ontdek AI-tools en gebruik kunstmatige intelligentie 
                <span className="font-semibold text-blue-600"> veilig en effectief</span> voor werk, studie en creativiteit.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/ai-leren/nl">
                  <Button size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                    <Play className="h-6 w-6 mr-3" />
                    Begin Gratis Leren
                    <ArrowRight className="h-6 w-6 ml-3" />
                  </Button>
                </Link>
                <Link to="/ai-veiligheid-embed-nl">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-4 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200">
                    <Shield className="h-6 w-6 mr-3" />
                    AI Veiligheid
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>100% Gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Geen Registratie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Nederlandse Interface</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Features Showcase */}
        <div className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Interactieve AI Leerervaring
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ontdek onze dynamische leermodules die je stap voor stap begeleiden van AI-beginner tot expert
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      activeFeature === index 
                        ? 'ring-2 ring-blue-400 shadow-2xl bg-gradient-to-r ' + feature.color + ' text-white' 
                        : 'hover:shadow-lg bg-white'
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                      <div className={`p-3 rounded-lg mr-4 ${
                        activeFeature === index ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        <feature.icon className={`h-8 w-8 ${
                          activeFeature === index ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                        <CardDescription className={activeFeature === index ? 'text-white/90' : 'text-gray-600'}>
                          {feature.description}
                        </CardDescription>
                      </div>
                      <Badge variant={activeFeature === index ? 'secondary' : 'outline'} className="ml-4">
                        {feature.stats}
                      </Badge>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400 ml-4 text-sm">ai-leren.nl</span>
                  </div>
                  
                  <div className="space-y-4 text-gray-300">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                      <span className="text-sm">Interactieve AI Chat Interface</span>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-400">
                      <p className="text-green-400 text-sm">
                        {activeFeature === 0 && "Schrijf een professionele email naar een klant..."}
                        {activeFeature === 1 && "Genereer creatieve marketingideeën voor..."}
                        {activeFeature === 2 && "Controleer deze AI-gegenereerde content op..."}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Code className="h-4 w-4" />
                      <span>Real-time feedback & suggesties</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter */}
        <div className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="transform hover:scale-110 transition-transform duration-200">
                <div className="text-5xl font-bold mb-2 animate-pulse">50+</div>
                <div className="text-blue-100">AI Oefeningen</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <div className="text-5xl font-bold mb-2 animate-pulse">200+</div>
                <div className="text-purple-100">Nederlandse Prompts</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <div className="text-5xl font-bold mb-2 animate-pulse">15+</div>
                <div className="text-pink-100">Proven Frameworks</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <div className="text-5xl font-bold mb-2 animate-pulse">100%</div>
                <div className="text-yellow-100">Gratis Toegang</div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Modules Preview */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Jouw AI Leertraject
              </h2>
              <p className="text-xl text-gray-600">
                Volg onze gestructureerde modules van absolute beginner tot AI-expert
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  level: "Beginner",
                  icon: BookOpen,
                  title: "AI Fundamenten",
                  description: "Start je AI-reis met de basics",
                  topics: ["Wat is AI?", "Eerste prompts", "AI-tools verkennen"],
                  color: "from-green-500 to-emerald-600",
                  badge: "bg-green-100 text-green-800"
                },
                {
                  level: "Gemiddeld",
                  icon: Lightbulb,
                  title: "Geavanceerde Technieken",
                  description: "Beheers krachtige prompt strategieën",
                  topics: ["Chain-of-thought", "Few-shot learning", "Persona technieken"],
                  color: "from-yellow-500 to-orange-600",
                  badge: "bg-yellow-100 text-yellow-800"
                },
                {
                  level: "Expert",
                  icon: Award,
                  title: "Praktische Toepassingen",
                  description: "Implementeer AI in echte scenario's",
                  topics: ["Zakelijke use cases", "Automatisering", "AI ethiek"],
                  color: "from-red-500 to-pink-600",
                  badge: "bg-red-100 text-red-800"
                }
              ].map((module, index) => (
                <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="absolute top-4 right-4">
                    <Badge className={module.badge}>{module.level}</Badge>
                  </div>
                  <CardHeader className="relative">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color} w-fit mb-4`}>
                      <module.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full group-hover:bg-blue-600 transition-colors duration-200">
                      Start Module
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Wat Zeggen Onze Gebruikers?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-8">
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.text}"</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Klaar om AI te Beheersen?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Begin vandaag je AI-leertraject. Geen registratie, geen kosten - gewoon leren!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/ai-leren/nl">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-10 py-4 transform hover:scale-105 transition-all duration-200">
                  <Zap className="h-6 w-6 mr-3" />
                  Start Nu Gratis
                </Button>
              </Link>
              <Link to="/ai-veiligheid-embed-nl">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-10 py-4 transform hover:scale-105 transition-all duration-200">
                  <Shield className="h-6 w-6 mr-3" />
                  Leer Veilig AI Gebruiken
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Brain className="h-8 w-8 text-blue-400" />
                  <span className="text-xl font-bold">AI Leren</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Het meest complete Nederlandse platform voor AI en prompt engineering educatie.
                </p>
                <div className="flex space-x-4">
                  <Badge className="bg-blue-600">100% Nederlands</Badge>
                  <Badge className="bg-green-600">Gratis</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Leren</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/ai-leren/nl" className="hover:text-white transition-colors">Prompt Engineering</Link></li>
                  <li><Link to="/database-embed-nl" className="hover:text-white transition-colors">Prompt Database</Link></li>
                  <li><Link to="/framework-embed-nl" className="hover:text-white transition-colors">AI Frameworks</Link></li>
                  <li><Link to="/oefening-embed-nl" className="hover:text-white transition-colors">Oefeningen</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Veiligheid</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><Link to="/ai-veiligheid-embed-nl" className="hover:text-white transition-colors">AI Veiligheid</Link></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Gids</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Ethische AI</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Beste Praktijken</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-lg">Platform</h3>
                <ul className="space-y-3 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Over AI Leren</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Nieuws</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; 2024 AI Leren. Het gratis Nederlandse AI educatie platform voor iedereen.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
