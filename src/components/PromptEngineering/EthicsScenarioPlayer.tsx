import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Play, CheckCircle, Target, BookOpen, Award } from 'lucide-react';

interface EthicsScenario {
  id: string;
  title: string;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

interface EthicsScenarioPlayerProps {
  level: "beginner" | "intermediate" | "advanced";
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  language?: 'en' | 'nl';
}

const ethicsScenarios: { [key: string]: EthicsScenario[] } = {
  beginner: [
    {
      id: 'eth-001',
      title: 'AI Transparantie in Werk',
      scenario: 'Je gebruikt ChatGPT om een rapport te schrijven voor je baas. Moet je dit melden?',
      options: [
        'Nee, het is mijn geheim',
        'Ja, ik vertel het eerlijk',
        'Alleen als ze het vragen',
        'Ik doe alsof ik het zelf schreef'
      ],
      correctAnswer: 1,
      explanation: 'Transparantie over AI-gebruik is cruciaal voor vertrouwen en ethische werkomgeving.',
      category: 'Transparantie',
      difficulty: 'beginner',
      estimatedTime: '3 min'
    },
    {
      id: 'eth-002',
      title: 'Privacy bij AI Gebruik',
      scenario: 'Je wilt AI gebruiken om feedback te krijgen op een e-mail met klantgegevens. Wat doe je?',
      options: [
        'De echte e-mail kopiëren naar AI',
        'Eerst alle namen en gegevens verwijderen',
        'Een fictief voorbeeld maken',
        'Gewoon niet doen'
      ],
      correctAnswer: 2,
      explanation: 'Maak altijd fictieve maar realistische voorbeelden om privacy te beschermen.',
      category: 'Privacy',
      difficulty: 'beginner',
      estimatedTime: '4 min'
    },
    {
      id: 'eth-003',
      title: 'AI Hulp bij Huiswerk',
      scenario: 'Je kind vraagt om hulp met wiskundeproblemen. Je overweegt AI te gebruiken om de antwoorden te geven.',
      options: [
        'AI geeft de antwoorden, dat is efficiënt',
        'AI gebruiken om de stappen uit te leggen',
        'Helemaal geen AI gebruiken',
        'AI gebruiken maar dat niet vertellen'
      ],
      correctAnswer: 1,
      explanation: 'AI kan waardevol zijn voor het leren van methoden en begrip, niet voor kant-en-klare antwoorden.',
      category: 'Onderwijs',
      difficulty: 'beginner',
      estimatedTime: '3 min'
    },
    {
      id: 'eth-004',
      title: 'Social Media Content',
      scenario: 'Je gebruikt AI om posts voor je bedrijf te maken. Moet je dit vermelden in je posts?',
      options: [
        'Nee, niemand hoeft dat te weten',
        'Ja, altijd duidelijk vermelden',
        'Alleen bij belangrijke posts',
        'Alleen als klanten ernaar vragen'
      ],
      correctAnswer: 1,
      explanation: 'Transparantie over AI-gegenereerde content bouwt vertrouwen en toont verantwoordelijk gebruik.',
      category: 'Marketing',
      difficulty: 'beginner',
      estimatedTime: '3 min'
    }
  ],
  intermediate: [
    {
      id: 'eth-101',
      title: 'Bias in AI Recruitering',
      scenario: 'Je AI-tool beveelt voornamelijk mannelijke kandidaten aan voor technische functies. Hoe reageer je?',
      options: [
        'Vertrouwen op de AI, het zal wel kloppen',
        'De AI-instellingen controleren en aanpassen',
        'Handmatig meer vrouwelijke kandidaten toevoegen',
        'Een andere AI-tool proberen'
      ],
      correctAnswer: 1,
      explanation: 'Actief bias identificeren en corrigeren is essentieel voor eerlijke AI-systemen.',
      category: 'Fairness',
      difficulty: 'intermediate',
      estimatedTime: '6 min'
    },
    {
      id: 'eth-102',
      title: 'AI in Medische Diagnose',
      scenario: 'Een AI-systeem suggereert een diagnose die verschilt van je medische oordeel. Wat doe je?',
      options: [
        'De AI-diagnose volgen, technologie is betrouwbaarder',
        'Je eigen oordeel combineren met AI-inzichten',
        'De AI-suggestie negeren, ervaring is belangrijker',
        'Een tweede AI-systeem raadplegen'
      ],
      correctAnswer: 1,
      explanation: 'Menselijke expertise en AI moeten samen werken, waarbij de professional eindverantwoordelijk blijft.',
      category: 'Gezondheidszorg',
      difficulty: 'intermediate',
      estimatedTime: '7 min'
    },
    {
      id: 'eth-103',
      title: 'Automated Customer Service',
      scenario: 'Je AI-chatbot geeft incorrect advies aan een klant met een complexe vraag. Wat is je prioriteit?',
      options: [
        'De AI-training verbeteren voor volgende keer',
        'Direct contact opnemen met de klant om te corrigeren',
        'Wachten tot de klant opnieuw contact opneemt',
        'Het incident intern rapporteren'
      ],
      correctAnswer: 1,
      explanation: 'Directe klantschade heeft prioriteit en vereist onmiddellijke correctie en transparantie.',
      category: 'Klantenservice',
      difficulty: 'intermediate',
      estimatedTime: '5 min'
    }
  ],
  advanced: [
    {
      id: 'eth-201',
      title: 'AI Governance Beleid',
      scenario: 'Je bedrijf wil een AI-governance beleid implementeren. Wat is de eerste prioriteit?',
      options: [
        'Kosten besparen door AI',
        'Risico-assessment van AI-gebruik',
        'Training voor alle werknemers',
        'Nieuwe AI-tools aanschaffen'
      ],
      correctAnswer: 1,
      explanation: 'Risico-assessment vormt de basis voor effectieve AI-governance.',
      category: 'Governance',
      difficulty: 'advanced',
      estimatedTime: '8 min'
    },
    {
      id: 'eth-202',
      title: 'AI en Intellectueel Eigendom',
      scenario: 'Je AI genereert code die lijkt op bestaande open-source projecten. Hoe ga je om met mogelijke IP-conflicten?',
      options: [
        'De code gebruiken, AI kan geen auteursrecht schenden',
        'Uitgebreide IP-audit uitvoeren voor gebruik',
        'Alleen eigen training data gebruiken',
        'Juridisch advies inwinnen per geval'
      ],
      correctAnswer: 1,
      explanation: 'IP-rechten zijn complex bij AI; een grondige audit beschermt tegen juridische risicos.',
      category: 'Intellectueel Eigendom',
      difficulty: 'advanced',
      estimatedTime: '10 min'
    },
    {
      id: 'eth-203',
      title: 'AI Algoritme Transparantie',
      scenario: 'Klanten vragen hoe je AI-systeem beslissingen neemt die hun leningen beïnvloeden. Wat deel je?',
      options: [
        'Niets, algoritmes zijn bedrijfsgeheimen',
        'Uitgebreide technische documentatie',
        'Begrijpelijke uitleg van de belangrijkste factoren',
        'Alleen wettelijk vereiste informatie'
      ],
      correctAnswer: 2,
      explanation: 'Transparantie moet begrijpelijk zijn voor gebruikers terwijl bedrijfsbelangen beschermd blijven.',
      category: 'Transparantie',
      difficulty: 'advanced',
      estimatedTime: '9 min'
    }
  ]
};

const EthicsScenarioPlayer = ({ 
  level, 
  compact = false, 
  showHeader = true, 
  showLegend = true, 
  language = 'nl' 
}: EthicsScenarioPlayerProps) => {
  const [selectedScenario, setSelectedScenario] = useState<EthicsScenario | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(new Set());
  const [scenarioScores, setScenarioScores] = useState<{ [key: string]: number }>({});

  const scenarios = ethicsScenarios[level] || [];
  const completionRate = scenarios.length > 0 ? (completedScenarios.size / scenarios.length) * 100 : 0;
  const averageScore = Object.keys(scenarioScores).length > 0 
    ? Object.values(scenarioScores).reduce((sum, score) => sum + score, 0) / Object.values(scenarioScores).length
    : 0;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && selectedScenario) {
      setIsAnswered(true);
      const isCorrect = selectedAnswer === selectedScenario.correctAnswer;
      const score = isCorrect ? 100 : 0;
      
      setCompletedScenarios(prev => new Set([...prev, selectedScenario.id]));
      setScenarioScores(prev => ({ ...prev, [selectedScenario.id]: score }));
    }
  };

  const resetScenario = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const goBackToOverview = () => {
    setSelectedScenario(null);
    resetScenario();
  };

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 border-green-300',
    intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    advanced: 'bg-red-100 text-red-800 border-red-300'
  };

  const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Gemiddeld', 
    advanced: 'Gevorderd'
  };

  if (selectedScenario) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span>Ethisch Scenario</span>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={goBackToOverview}
                size="sm"
              >
                ← Terug naar overzicht
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-blue-900">{selectedScenario.title}</CardTitle>
            <div className="flex space-x-2">
              <Badge className={difficultyColors[selectedScenario.difficulty]}>
                {difficultyLabels[selectedScenario.difficulty]}
              </Badge>
              <Badge variant="outline">{selectedScenario.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🎭 Scenario:</h4>
              <p className="text-blue-800">{selectedScenario.scenario}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Wat is jouw antwoord?</h4>
              {selectedScenario.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => !isAnswered && handleAnswerSelect(index)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedAnswer === index
                      ? isAnswered
                        ? index === selectedScenario.correctAnswer
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : isAnswered && index === selectedScenario.correctAnswer
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-blue-300'
                  } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                      selectedAnswer === index
                        ? isAnswered
                          ? index === selectedScenario.correctAnswer
                            ? 'border-green-500 bg-green-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                          : 'border-blue-500 bg-blue-500 text-white'
                        : isAnswered && index === selectedScenario.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={
                      selectedAnswer === index && isAnswered
                        ? index === selectedScenario.correctAnswer
                          ? 'text-green-800 font-medium'
                          : 'text-red-800'
                        : isAnswered && index === selectedScenario.correctAnswer
                          ? 'text-green-800 font-medium'
                          : 'text-gray-700'
                    }>
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!isAnswered ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Antwoord Controleren
              </Button>
            ) : (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${
                  selectedAnswer === selectedScenario.correctAnswer
                    ? 'border-green-300 bg-green-50'
                    : 'border-red-300 bg-red-50'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {selectedAnswer === selectedScenario.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                    )}
                    <span className={`font-semibold ${
                      selectedAnswer === selectedScenario.correctAnswer
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}>
                      {selectedAnswer === selectedScenario.correctAnswer ? 'Correct!' : 'Niet helemaal juist'}
                    </span>
                  </div>
                  <p className={
                    selectedAnswer === selectedScenario.correctAnswer
                      ? 'text-green-700 text-sm'
                      : 'text-red-700 text-sm'
                  }>
                    {selectedScenario.explanation}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={resetScenario}
                    variant="outline"
                    className="flex-1"
                  >
                    Opnieuw Proberen
                  </Button>
                  <Button 
                    onClick={goBackToOverview}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Volgende Scenario
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${compact ? 'max-w-5xl' : 'max-w-7xl'} mx-auto`}>
      {showHeader && (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <Users className="h-6 w-6" />
              <span>Ethische AI Scenario's - {difficultyLabels[level]} Niveau</span>
            </CardTitle>
            <p className="text-blue-700">
              Ontwikkel ethisch bewustzijn door realistische AI-scenario's
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{scenarios.length}</div>
                <div className="text-sm text-blue-700">Totaal Scenario's</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{completedScenarios.size}</div>
                <div className="text-sm text-green-700">Voltooid</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">{Math.round(averageScore)}%</div>
                <div className="text-sm text-purple-700">Gem. Score</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-blue-800">Voortgang</span>
              <span className="text-sm text-blue-600">
                {completedScenarios.size} / {scenarios.length} voltooid
              </span>
            </div>
            <Progress value={completionRate} className="h-3 bg-blue-100" />
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => {
          const isCompleted = completedScenarios.has(scenario.id);
          const score = scenarioScores[scenario.id];
          
          return (
            <Card 
              key={scenario.id}
              className={`hover:shadow-lg transition-all duration-200 border-2 ${
                isCompleted 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">
                      {scenario.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {scenario.scenario.length > 100 
                        ? scenario.scenario.substring(0, 100) + '...' 
                        : scenario.scenario}
                    </p>
                  </div>
                  <div className="ml-3">
                    <Badge className={`${difficultyColors[scenario.difficulty]} text-xs`}>
                      {difficultyLabels[scenario.difficulty]}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Target className="h-3 w-3 mr-1" />
                      {scenario.category}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {scenario.estimatedTime}
                    </span>
                  </div>

                  {isCompleted && score !== undefined && (
                    <div className="bg-green-100 p-2 rounded border border-green-300">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800">Voltooid</span>
                        <span className="text-sm font-bold text-green-900">{Math.round(score)}%</span>
                      </div>
                      <Progress value={score} className="h-1 mt-1 bg-green-200" />
                    </div>
                  )}

                  <Button 
                    onClick={() => setSelectedScenario(scenario)}
                    className={`w-full ${
                      isCompleted 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isCompleted ? 'Bekijk Scenario' : 'Start Scenario'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completionRate === 100 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              Geweldig! Alle Scenario's Voltooid!
            </h3>
            <p className="text-green-700 mb-4">
              Je hebt alle {scenarios.length} ethische scenario's voltooid met een gemiddelde score van {Math.round(averageScore)}%!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EthicsScenarioPlayer;
