
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, Users, ExternalLink, Lightbulb, Info } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">AI veiligheid wordt geladen...</p>
    </div>
  </div>
);

const AISafetyEmbedNL = () => {
  const safetyPrinciples = [
    {
      icon: Lock,
      title: "Privacy Beschermen",
      description: "Deel nooit persoonlijke of gevoelige informatie met AI-systemen",
      tips: [
        "Geen wachtwoorden, burgerservicenummers of bankgegevens",
        "Geen vertrouwelijke bedrijfsinformatie",
        "Gebruik algemene voorbeelden in plaats van echte data"
      ],
      level: "kritiek"
    },
    {
      icon: Eye,
      title: "Verificatie van Output",
      description: "Controleer altijd de output van AI voordat je het gebruikt",
      tips: [
        "Dubbelcheck feiten en cijfers",
        "Vraag om bronnen bij claims",
        "Test code voordat je het implementeert",
        "Laat belangrijke teksten door anderen nakijken"
      ],
      level: "belangrijk"
    },
    {
      icon: Users,
      title: "Transparantie",
      description: "Wees eerlijk over het gebruik van AI in je werk",
      tips: [
        "Vermeld wanneer je AI hebt gebruikt",
        "Leg uit welke delen AI-gegenereerd zijn",
        "Respecteer auteursrecht en intellectueel eigendom"
      ],
      level: "ethisch"
    }
  ];

  const commonRisks = [
    {
      risk: "Hallucinations",
      description: "AI kan overtuigend onjuiste informatie genereren",
      prevention: "Verifieer feiten via betrouwbare bronnen"
    },
    {
      risk: "Bias",
      description: "AI kan vooroordelen bevatten uit trainingsdata",
      prevention: "Wees bewust van mogelijke vooringenomenheid"
    },
    {
      risk: "Privacy Lekken",
      description: "Invoer kan opgeslagen worden door AI-providers",
      prevention: "Deel geen gevoelige persoonlijke informatie"
    },
    {
      risk: "Over-afhankelijkheid",
      description: "Te veel vertrouwen op AI zonder eigen denken",
      prevention: "Gebruik AI als hulpmiddel, niet als vervanger"
    }
  ];

  const levelColors = {
    kritiek: "bg-red-100 text-red-800 border-red-200",
    belangrijk: "bg-yellow-100 text-yellow-800 border-yellow-200",
    ethisch: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          <Suspense fallback={<LoadingFallback />}>
            
            {/* Header */}
            <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="h-16 w-16 text-blue-600" />
                </div>
                <CardTitle className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                  Veilig AI Gebruik
                </CardTitle>
                <p className="text-lg text-blue-700 max-w-3xl mx-auto">
                  Leer hoe je AI-tools zoals ChatGPT, Gemini en Claude veilig en verantwoord kunt gebruiken. 
                  Bescherm je privacy en krijg betrouwbare resultaten.
                </p>
                <div className="flex justify-center space-x-2 mt-4">
                  <Badge className="bg-green-100 text-green-800">Gratis Gids</Badge>
                  <Badge className="bg-blue-100 text-blue-800">Nederlands</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Praktisch</Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Safety Principles */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
                Veiligheidsprincipes
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {safetyPrinciples.map((principle, index) => (
                  <Card key={index} className={`border-2 ${levelColors[principle.level]}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <principle.icon className="h-8 w-8 text-current" />
                        <div>
                          <CardTitle className="text-lg">{principle.title}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {principle.level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4 text-gray-700">{principle.description}</p>
                      <ul className="space-y-2">
                        {principle.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Common Risks */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                Veelvoorkomende Risico's
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {commonRisks.map((item, index) => (
                  <Card key={index} className="border border-orange-200 hover:border-orange-300 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <AlertTriangle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-orange-900 mb-2">{item.risk}</h3>
                          <p className="text-gray-700 mb-3 text-sm">{item.description}</p>
                          <div className="bg-green-50 p-3 rounded border border-green-200">
                            <p className="text-green-800 text-sm font-medium">
                              💡 Preventie: {item.prevention}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Best Practices */}
            <Card className="mb-8 border border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-900 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Beste Praktijken voor AI Gebruik
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-green-900 mb-4">✅ Wel Doen</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                        <span className="text-sm">Duidelijke en specifieke prompts schrijven</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                        <span className="text-sm">Output controleren en verifiëren</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                        <span className="text-sm">AI gebruiken als hulpmiddel, niet vervanger</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                        <span className="text-sm">Regelmatig nieuwe vaardigheden leren</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-red-900 mb-4">❌ Niet Doen</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                        <span className="text-sm">Persoonlijke gegevens delen</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                        <span className="text-sm">Blind vertrouwen op AI-output</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                        <span className="text-sm">AI-gebruik verzwijgen bij belangrijk werk</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                        <span className="text-sm">Kritisch denken uitschakelen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="mb-8 border border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center">
                  <Info className="h-6 w-6 mr-2" />
                  Snelle Veiligheidstips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-blue-900 mb-2">Voor Prompt Writing</h4>
                    <p className="text-sm text-gray-700">Gebruik "[VOORBEELD]" placeholders in plaats van echte data</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-blue-900 mb-2">Voor Code</h4>
                    <p className="text-sm text-gray-700">Test altijd code in een veilige omgeving eerst</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-blue-900 mb-2">Voor Content</h4>
                    <p className="text-sm text-gray-700">Controleer feiten via onafhankelijke bronnen</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Branding */}
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-blue-600 mb-2">
                  Aangedreven door <strong>AI Leren</strong> - Nederlands AI Educatieplatform
                </p>
                <Button variant="link" className="p-0 h-auto text-sm" asChild>
                  <a href="/ai-leren/nl" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Bekijk Volledig Platform
                  </a>
                </Button>
              </CardContent>
            </Card>
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AISafetyEmbedNL;
