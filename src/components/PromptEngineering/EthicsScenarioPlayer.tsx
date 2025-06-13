
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Brain, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface EthicsChoice {
  id: string;
  text: string;
  score: number;
  feedback: string;
  consequences: string;
}

interface EthicsScenario {
  id: string;
  title: string;
  context: string;
  scenario: string;
  stakeholders: string[];
  choices: EthicsChoice[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningObjectives: string[];
}

const ethicsScenarios: EthicsScenario[] = [
  {
    id: 'hiring-bias',
    title: 'AI Rekrutering Bias',
    context: 'Je werkt als HR manager en gebruikt een AI systeem om CV\'s te screenen.',
    scenario: 'Het AI systeem lijkt consistent kandidaten met buitenlandse namen lager te scoren, ondanks vergelijkbare kwalificaties. Een collega merkt dit patroon op tijdens een meeting.',
    stakeholders: ['Sollicitanten', 'HR team', 'Management', 'Bestaande werknemers'],
    choices: [
      {
        id: 'ignore',
        text: 'Het patroon negeren - het AI systeem is objectief getraind',
        score: 0,
        feedback: 'Deze keuze toont gebrek aan begrip van AI bias en kan leiden tot discriminatie.',
        consequences: 'Mogelijk rechtszaken, reputatieschade, en gemiste talent acquisitie.'
      },
      {
        id: 'investigate',
        text: 'Het patroon onderzoeken en het AI systeem tijdelijk pauzeren',
        score: 80,
        feedback: 'Goede voorzorgsmaatregelen, maar meer structurele aanpak nodig.',
        consequences: 'Korte vertraging in recruitment, maar bescherming tegen discriminatie.'
      },
      {
        id: 'comprehensive',
        text: 'Volledige bias audit uitvoeren en transparant communiceren over maatregelen',
        score: 100,
        feedback: 'Excellente ethische aanpak die vertrouwen opbouwt en discriminatie voorkomt.',
        consequences: 'Verbeterd recruitmentproces en verhoogd vertrouwen van stakeholders.'
      }
    ],
    difficulty: 'beginner',
    learningObjectives: [
      'Herkenning van AI bias patronen',
      'Belang van diverse stakeholder overwegingen',
      'Transparantie in AI besluitvorming'
    ]
  },
  {
    id: 'customer-privacy',
    title: 'Klantgegevens voor AI Training',
    context: 'Je bedrijf wil klantgegevens gebruiken om een personalisatie AI te verbeteren.',
    scenario: 'Marketing wil alle klantinteracties, emails, en koopgedrag gebruiken om een geavanceerd AI systeem te trainen dat gepersonaliseerde aanbevelingen doet. De juridische afdeling waarschuwt voor privacy risico\'s, maar marketing beweert dat het concurrentievoordeel cruciaal is.',
    stakeholders: ['Klanten', 'Marketing team', 'Juridische afdeling', 'IT beveiliging', 'Concurrenten'],
    choices: [
      {
        id: 'full-data',
        text: 'Alle klantgegevens gebruiken zonder expliciete toestemming',
        score: 0,
        feedback: 'Dit schendt privacy wetten en klantvertrouwen ernstig.',
        consequences: 'Mogelijk GDPR boetes, reputatieschade, en verlies van klantvertrouwen.'
      },
      {
        id: 'anonymized',
        text: 'Alleen geanonimiseerde data gebruiken met opt-out mogelijkheid',
        score: 70,
        feedback: 'Betere privacy bescherming, maar anonymisatie kan incomplete zijn.',
        consequences: 'Gereduceerd privacy risico, maar mogelijk minder effectieve personalisatie.'
      },
      {
        id: 'consent-based',
        text: 'Expliciete opt-in toestemming vragen met transparante uitleg',
        score: 100,
        feedback: 'Ethisch ideaal dat klantautonomie respecteert en vertrouwen opbouwt.',
        consequences: 'Lagere deelname maar hoger vertrouwen en compliance met privacy wetten.'
      }
    ],
    difficulty: 'intermediate',
    learningObjectives: [
      'Privacy by design principes',
      'Balans tussen business voordelen en ethiek',
      'Informed consent implementatie'
    ]
  },
  {
    id: 'ai-decision-transparency',
    title: 'Transparantie in AI Besluitvorming',
    context: 'Jouw organisatie gebruikt AI voor belangrijke beslissingen in de zorgsector.',
    scenario: 'Een AI systeem helpt artsen bij het prioriteren van patiënten voor spoedbehandelingen. Een familie klaagt dat hun familielid onterecht een lagere prioriteit kreeg. Ze eisen uitleg over hoe de AI tot deze beslissing kwam, maar het systeem is een complexe black box die zelfs experts nauwelijks kunnen uitleggen.',
    stakeholders: ['Patiënten', 'Families', 'Artsen', 'Ziekenhuis management', 'Toezichthouders', 'AI ontwikkelaars'],
    choices: [
      {
        id: 'deny-explanation',
        text: 'Uitleg weigeren - het systeem is te complex om uit te leggen',
        score: 10,
        feedback: 'Dit ondermijnt patiëntenrechten en medische transparantie.',
        consequences: 'Mogelijk rechtszaken, verlies van vertrouwen, en regulatoire problemen.'
      },
      {
        id: 'simplified-explanation',
        text: 'Een vereenvoudigde uitleg geven van de belangrijkste factoren',
        score: 60,
        feedback: 'Poging tot transparantie, maar mogelijk onvolledig of misleidend.',
        consequences: 'Gedeeltelijke tevredenheid maar mogelijk nog steeds rechtsvragen.'
      },
      {
        id: 'full-transparency',
        text: 'Volledig transparant systeem implementeren met explainable AI',
        score: 100,
        feedback: 'Ideale aanpak die patiëntenrechten en medische ethiek respecteert.',
        consequences: 'Hogere ontwikkelkosten maar verhoogd vertrouwen en betere zorgkwaliteit.'
      },
      {
        id: 'human-oversight',
        text: 'AI aanbevelingen altijd laten reviewen door menselijke experts',
        score: 90,
        feedback: 'Sterke human-in-the-loop aanpak die AI voordelen behoudt.',
        consequences: 'Verhoogde kosten maar betere accountability en patiëntenzorg.'
      }
    ],
    difficulty: 'advanced',
    learningObjectives: [
      'Right to explanation in kritieke toepassingen',
      'Balans tussen AI efficiency en transparantie',
      'Human oversight in geautomatiseerde systemen',
      'Stakeholder management in complexe ethische situaties'
    ]
  }
];

const EthicsScenarioPlayer = ({ level }: { level: 'beginner' | 'intermediate' | 'advanced' }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [scenarioScores, setScenarioScores] = useState<number[]>([]);

  const scenarios = ethicsScenarios.filter(scenario => scenario.difficulty === level);
  const scenario = scenarios[currentScenario];

  const handleChoiceSelect = (choiceId: string) => {
    if (showResults) return;
    setSelectedChoice(choiceId);
  };

  const submitChoice = () => {
    if (!selectedChoice || !scenario) return;
    
    const choice = scenario.choices.find(c => c.id === selectedChoice);
    if (!choice) return;

    const newScores = [...scenarioScores];
    newScores[currentScenario] = choice.score;
    setScenarioScores(newScores);
    setTotalScore(newScores.reduce((sum, score) => sum + score, 0));
    setShowResults(true);
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
      setShowResults(false);
    }
  };

  const resetScenarios = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setShowResults(false);
    setTotalScore(0);
    setScenarioScores([]);
  };

  if (!scenario) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Geen scenario's beschikbaar</h3>
          <p className="text-gray-600">Er zijn geen ethische scenario's voor dit niveau.</p>
        </CardContent>
      </Card>
    );
  }

  const selectedChoiceObj = selectedChoice ? scenario.choices.find(c => c.id === selectedChoice) : null;
  const avgScore = scenarioScores.length > 0 ? totalScore / scenarioScores.length : 0;

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Ethisch Scenario - {scenario.title}</span>
            </CardTitle>
            <Badge className="bg-blue-100 text-blue-800">
              {currentScenario + 1} van {scenarios.length}
            </Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Niveau: {scenario.difficulty}</span>
            {scenarioScores.length > 0 && (
              <span>Gemiddelde Score: {Math.round(avgScore)}%</span>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Context:</h4>
            <p className="text-gray-700 bg-blue-50 p-3 rounded">{scenario.context}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Scenario:</h4>
            <p className="text-gray-700">{scenario.scenario}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Betrokken Partijen:</h4>
            <div className="flex flex-wrap gap-2">
              {scenario.stakeholders.map((stakeholder, index) => (
                <Badge key={index} variant="outline" className="text-blue-700 border-blue-300">
                  {stakeholder}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Wat zou je doen?</h4>
            <div className="space-y-3">
              {scenario.choices.map((choice) => (
                <Card 
                  key={choice.id}
                  className={`cursor-pointer transition-all ${
                    selectedChoice === choice.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:border-blue-300'
                  } ${showResults ? 'cursor-default' : ''}`}
                  onClick={() => handleChoiceSelect(choice.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                        selectedChoice === choice.id 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{choice.text}</p>
                        {showResults && selectedChoice === choice.id && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center space-x-2">
                              {choice.score >= 80 ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : choice.score >= 50 ? (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className="font-semibold">Score: {choice.score}/100</span>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <p className="text-sm text-gray-700 mb-2">
                                <strong>Feedback:</strong> {choice.feedback}
                              </p>
                              <p className="text-sm text-gray-700">
                                <strong>Mogelijke Gevolgen:</strong> {choice.consequences}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            {!showResults ? (
              <Button 
                onClick={submitChoice}
                disabled={!selectedChoice}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Bevestig Keuze
              </Button>
            ) : (
              <div className="flex space-x-4">
                {currentScenario < scenarios.length - 1 ? (
                  <Button onClick={nextScenario}>
                    Volgende Scenario
                  </Button>
                ) : (
                  <Button onClick={resetScenarios} variant="outline">
                    Opnieuw Starten
                  </Button>
                )}
              </div>
            )}
          </div>

          {showResults && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900">Leeruitkomsten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scenario.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">{objective}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EthicsScenarioPlayer;
