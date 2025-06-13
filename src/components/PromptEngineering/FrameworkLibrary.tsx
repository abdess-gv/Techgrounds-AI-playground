import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Target, Play, Users, Code, Lightbulb, ArrowRight } from 'lucide-react';
import FrameworkExercisePlayer from './FrameworkExercisePlayer';
import { frameworkExercisesNL } from './data/frameworkExercisesNL';

const FrameworkLibrary = () => {
  const [selectedFrameworkExercise, setSelectedFrameworkExercise] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const frameworks = [
    {
      name: 'STAR Framework',
      description: 'Een methode om gestructureerd ervaringsverhalen te vertellen in sollicitatiegesprekken.',
      components: [
        { letter: 'S', name: 'Situation', description: 'De context en achtergrond van de situatie' },
        { letter: 'T', name: 'Task', description: 'De specifieke taak of uitdaging' },
        { letter: 'A', name: 'Action', description: 'De concrete acties die je ondernam' },
        { letter: 'R', name: 'Result', description: 'Het resultaat en de impact van je acties' }
      ],
      link: 'https://www.thebalancecareers.com/what-is-the-star-interview-method-2061629'
    },
    {
      name: 'RACE Framework',
      description: 'Een digitale marketing framework voor customer lifecycle management.',
      components: [
        { letter: 'R', name: 'Reach', description: 'Nieuwe prospects bereiken en merkbekendheid creëren' },
        { letter: 'A', name: 'Act', description: 'Prospects stimuleren tot interactie met je merk' },
        { letter: 'C', name: 'Convert', description: 'Prospects omzetten naar betalende klanten' },
        { letter: 'E', name: 'Engage', description: 'Klanten behouden en loyaliteit opbouwen' }
      ],
      link: 'https://www.smartinsights.com/digital-marketing-strategy/race-a-practical-framework-to-improve-your-digital-marketing/'
    },
    {
      name: 'AIDA Model',
      description: 'Een marketingmodel dat de stappen beschrijft die een klant doorloopt tijdens het koopproces.',
      components: [
        { letter: 'A', name: 'Awareness', description: 'Aandacht trekken van de doelgroep' },
        { letter: 'I', name: 'Interest', description: 'Interesse wekken voor het product of de dienst' },
        { letter: 'D', name: 'Desire', description: 'Verlangen creëren om het product of de dienst te bezitten' },
        { letter: 'A', name: 'Action', description: 'De klant aanzetten tot actie (aankoop)' }
      ],
      link: 'https://www.investopedia.com/terms/a/aida.asp'
    },
    {
      name: '5W2H Methode',
      description: 'Een techniek om een probleem of project volledig te analyseren door zeven vragen te beantwoorden.',
      components: [
        { letter: 'W', name: 'Who', description: 'Wie is betrokken bij het probleem of project?' },
        { letter: 'W', name: 'What', description: 'Wat is het probleem of project?' },
        { letter: 'W', name: 'When', description: 'Wanneer vindt het plaats of moet het voltooid zijn?' },
        { letter: 'W', name: 'Where', description: 'Waar vindt het plaats?' },
        { letter: 'W', name: 'Why', description: 'Waarom is het nodig of belangrijk?' },
        { letter: 'H', name: 'How', description: 'Hoe wordt het uitgevoerd?' },
        { letter: 'H', name: 'How much', description: 'Hoeveel kost het?' }
      ],
      link: 'https://www.mindtools.com/aupjdc1/the-5ws-and-1h'
    },
    {
      name: 'Situation-Complication-Question-Answer (SCQA)',
      description: 'Een storytelling framework om een boodschap helder en overtuigend over te brengen.',
      components: [
        { letter: 'S', name: 'Situation', description: 'Beschrijf de huidige situatie' },
        { letter: 'C', name: 'Complication', description: 'Introduceer een probleem of uitdaging' },
        { letter: 'Q', name: 'Question', description: 'Formuleer een vraag die om een oplossing vraagt' },
        { letter: 'A', name: 'Answer', description: 'Geef het antwoord of de oplossing' }
      ],
      link: 'https://www.mckinsey.com/featured-insights/storytelling/scqa-the-one-secret-to-persuasive-communication'
    },
    {
      name: 'Problem-Agitation-Solution (PAS)',
      description: 'Een copywriting formule om een probleem te identificeren, de impact te vergroten en een oplossing aan te bieden.',
      components: [
        { letter: 'P', name: 'Problem', description: 'Identificeer het probleem van de doelgroep' },
        { letter: 'A', name: 'Agitation', description: 'Vergroot de pijn en frustratie rond het probleem' },
        { letter: 'S', name: 'Solution', description: 'Bied de oplossing aan (jouw product of dienst)' }
      ],
      link: 'https://optinmonster.com/problem-agitate-solution-copywriting-formula/'
    },
    {
      name: 'Before-After-Bridge (BAB)',
      description: 'Een copywriting techniek die contrasteert hoe het leven er nu uitziet met hoe het eruit zou kunnen zien na het gebruik van een product.',
      components: [
        { letter: 'B', name: 'Before', description: 'Beschrijf de huidige situatie (het probleem)' },
        { letter: 'A', name: 'After', description: 'Beschrijf de gewenste situatie (de oplossing)' },
        { letter: 'B', name: 'Bridge', description: 'Leg uit hoe je van de huidige naar de gewenste situatie komt' }
      ],
      link: 'https://copyblogger.com/before-after-bridge/'
    },
    {
      name: '4P’s Marketing Mix',
      description: 'Een framework dat de belangrijkste elementen van een marketingstrategie omvat.',
      components: [
        { letter: 'P', name: 'Product', description: 'Wat wordt er verkocht?' },
        { letter: 'P', name: 'Price', description: 'Hoeveel kost het?' },
        { letter: 'P', name: 'Place', description: 'Waar wordt het verkocht?' },
        { letter: 'P', name: 'Promotion', description: 'Hoe wordt het gepromoot?' }
      ],
      link: 'https://www.smartinsights.com/marketing-mix/what-is-the-marketing-mix/'
    },
    {
      name: 'REAN Model',
      description: 'Een framework voor het analyseren en optimaliseren van de customer journey.',
      components: [
        { letter: 'R', name: 'Reach', description: 'Hoe trek je bezoekers aan?' },
        { letter: 'E', name: 'Engage', description: 'Hoe zorg je ervoor dat bezoekers betrokken raken?' },
        { letter: 'A', name: 'Activate', description: 'Hoe zet je bezoekers om in klanten?' },
        { letter: 'N', name: 'Nurture', description: 'Hoe behoud je klanten en stimuleer je herhaalaankopen?' }
      ],
      link: 'https://www.smartinsights.com/customer-relationship-management/customer-engagement/rean-model/'
    }
  ];

  if (selectedFrameworkExercise) {
    return (
      <FrameworkExercisePlayer
        exercise={selectedFrameworkExercise}
        onBack={() => setSelectedFrameworkExercise(null)}
        showHeader={true}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Target className="h-6 w-6" />
            <span>AI Prompt Frameworks Bibliotheek</span>
          </CardTitle>
          <p className="text-blue-700">
            Ontdek bewezen frameworks voor effectieve prompt constructie, inclusief interactieve oefeningen
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Framework Overzicht</TabsTrigger>
          <TabsTrigger value="exercises">Interactieve Oefeningen</TabsTrigger>
          <TabsTrigger value="examples">Voorbeelden</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">
                    {framework.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {framework.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">
                        Componenten
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {framework.components.map((component, idx) => (
                          <span key={idx} className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded">
                            {component.letter}: {component.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Veel gebruikt in Marketing
                      </span>
                      <a href={framework.link} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-500">
                        Meer info
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Framework-gebaseerde Oefeningen
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oefen met echte frameworks en krijg percentage-gebaseerde feedback op de compleetheid van je prompts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworkExercisesNL.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-lg transition-all duration-200 border-2 border-purple-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-purple-100 text-purple-800">
                      {exercise.framework.acronym} Framework
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {exercise.difficulty === 'beginner' ? 'Beginner' : 
                       exercise.difficulty === 'intermediate' ? 'Gemiddeld' : 'Gevorderd'}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {exercise.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {exercise.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 text-sm mb-2">
                        {exercise.framework.name}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {exercise.framework.components.map((component, idx) => (
                          <span key={idx} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                            {component.letter}: {component.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        Framework Oefening
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {exercise.estimatedTime}
                      </span>
                    </div>

                    <Button 
                      onClick={() => setSelectedFrameworkExercise(exercise)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Framework Oefening
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Voorbeelden
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Binnenkort meer voorbeelden...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrameworkLibrary;
