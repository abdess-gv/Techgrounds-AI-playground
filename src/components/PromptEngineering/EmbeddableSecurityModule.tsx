
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Lightbulb, Shield, AlertTriangle, Lock } from 'lucide-react';

interface SecurityExercise {
  id: string;
  title: string;
  description: string;
  scenario: string;
  riskLevel: 'low' | 'medium' | 'high';
  category: string;
  guidelines: string[];
  commonMistakes: string[];
  bestPractices: string[];
  evaluationCriteria: string[];
}

interface EmbeddableSecurityModuleProps {
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  language?: 'en' | 'nl';
}

const securityExercises: SecurityExercise[] = [
  {
    id: 'data-privacy',
    title: 'Data Privacy Bescherming',
    description: 'Leer hoe je persoonlijke gegevens beschermt bij AI-interacties',
    scenario: 'Je werkt met een AI-systeem en moet klantgegevens verwerken. Hoe ga je veilig om met deze informatie?',
    riskLevel: 'high',
    category: 'Privacy',
    guidelines: [
      'Deel nooit persoonlijke identificeerbare informatie',
      'Gebruik altijd geanonimiseerde voorbeelden',
      'Controleer data minimalisatie principes'
    ],
    commonMistakes: [
      'Echte namen en adressen gebruiken',
      'Gevoelige data niet maskeren',
      'Geen toestemming vragen voor data gebruik'
    ],
    bestPractices: [
      'Gebruik fictieve maar realistische voorbeelden',
      'Implementeer data masking technieken',
      'Volg GDPR en AVG richtlijnen'
    ],
    evaluationCriteria: [
      'Geen echte persoonlijke gegevens gebruikt',
      'Juiste anonimisering toegepast',
      'Privacy principes gevolgd'
    ]
  },
  {
    id: 'bias-detection',
    title: 'Bias Herkenning en Voorkoming',
    description: 'Identificeer en voorkom vooringenomenheid in AI-outputs',
    scenario: 'Een AI-systeem geeft inconsistente resultaten voor verschillende groepen mensen. Hoe detecteer en los je dit op?',
    riskLevel: 'medium',
    category: 'Fairness',
    guidelines: [
      'Test met diverse voorbeelden',
      'Controleer op stereotype patronen',
      'Gebruik inclusieve taal'
    ],
    commonMistakes: [
      'Eenzijdige testcases gebruiken',
      'Stereotypen versterken',
      'Diversiteit negeren'
    ],
    bestPractices: [
      'Diverse datasets gebruiken',
      'Regelmatige bias audits uitvoeren',
      'Inclusieve design principes toepassen'
    ],
    evaluationCriteria: [
      'Diverse voorbeelden gebruikt',
      'Bias risicos geïdentificeerd',
      'Inclusieve aanpak toegepast'
    ]
  }
];

const EmbeddableSecurityModule = ({ 
  compact = false, 
  showHeader = true, 
  showLegend = true,
  language = 'nl'
}: EmbeddableSecurityModuleProps) => {
  const [selectedExercise, setSelectedExercise] = useState<SecurityExercise>(securityExercises[0]);
  const [userResponse, setUserResponse] = useState("");
  const [evaluation, setEvaluation] = useState<{ [key: string]: boolean }>({});
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const evaluateResponse = () => {
    const newEvaluation: { [key: string]: boolean } = {};
    
    selectedExercise.evaluationCriteria.forEach(criterion => {
      const keywords = criterion.toLowerCase().split(/[^\w]+/).filter(word => word.length > 2);
      const userText = userResponse.toLowerCase();
      
      const hasKeywords = keywords.some(keyword => userText.includes(keyword));
      const hasLength = userResponse.length > 100;
      const hasStructure = userResponse.includes('\n') || userResponse.includes('.');
      
      newEvaluation[criterion] = hasKeywords && hasLength && hasStructure;
    });
    
    setEvaluation(newEvaluation);
    setIsEvaluated(true);
  };

  const resetExercise = () => {
    setUserResponse("");
    setEvaluation({});
    setIsEvaluated(false);
    setShowGuidelines(false);
  };

  const completedCriteria = Object.values(evaluation).filter(Boolean).length;
  const totalCriteria = selectedExercise.evaluationCriteria.length;
  const score = isEvaluated ? (completedCriteria / totalCriteria) * 100 : 0;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <Shield className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <Lock className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className={`space-y-4 ${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto`}>
      {showHeader && (
        <Card className="border-2 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2 text-red-900">
                  <Shield className="h-6 w-6" />
                  <span>AI Veiligheid Training</span>
                </CardTitle>
                <p className="text-red-700 mt-2">Leer veilig en verantwoord omgaan met AI-systemen</p>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Exercise Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kies een Veiligheidsoefening</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {securityExercises.map((exercise) => (
              <div
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedExercise.id === exercise.id 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{exercise.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRiskColor(exercise.riskLevel)}>
                      {getRiskIcon(exercise.riskLevel)}
                      <span className="ml-1">
                        {exercise.riskLevel === 'low' ? 'Laag' : 
                         exercise.riskLevel === 'medium' ? 'Gemiddeld' : 'Hoog'} Risico
                      </span>
                    </Badge>
                    <Badge variant="outline">{exercise.category}</Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className={`grid ${compact ? 'gap-4' : 'lg:grid-cols-2 gap-6'}`}>
        {/* Scenario & Response */}
        <Card className="border border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">🎯 Scenario & Jouw Antwoord</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Scenario:</h4>
              <p className="text-blue-800">{selectedExercise.scenario}</p>
            </div>
            
            <Textarea
              placeholder="Beschrijf hoe je veilig en verantwoord zou handelen in dit scenario..."
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              className={`font-mono text-sm border-2 border-gray-200 focus:border-blue-400 ${
                compact ? 'min-h-[150px]' : 'min-h-[200px]'
              }`}
            />
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex space-x-2">
                <Button 
                  onClick={evaluateResponse} 
                  disabled={!userResponse.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                  size={compact ? "sm" : "default"}
                >
                  Evalueren
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetExercise}
                  size={compact ? "sm" : "default"}
                >
                  Reset
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowGuidelines(!showGuidelines)}
                className="bg-yellow-50 border-yellow-300 hover:bg-yellow-100"
                size={compact ? "sm" : "default"}
              >
                <Lightbulb className="h-4 w-4 mr-1" />
                {showGuidelines ? 'Verberg' : 'Toon'} Richtlijnen
              </Button>
            </div>

            {showGuidelines && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-yellow-900 text-sm mb-2">📋 Richtlijnen:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {selectedExercise.guidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span>•</span>
                          <span>{guideline}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-yellow-900 text-sm mb-2">⚠️ Veelgemaakte Fouten:</h4>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {selectedExercise.commonMistakes.map((mistake, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span>•</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Evaluation & Best Practices */}
        <Card className="border border-green-200">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-900">📊 Evaluatie & Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {isEvaluated && (
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${
                  score >= 80 ? 'text-green-600' : 
                  score >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {Math.round(score)}%
                </div>
                <div className="text-sm text-gray-600">
                  {completedCriteria} van {totalCriteria} criteria behaald
                </div>
                <Progress value={score} className="h-2 mt-2" />
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Evaluatiecriteria:</h4>
              {selectedExercise.evaluationCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 rounded border text-sm">
                  {isEvaluated ? (
                    evaluation[criterion] ? (
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    )
                  ) : (
                    <div className="w-4 h-4 border border-gray-300 rounded-full mt-0.5 flex-shrink-0"></div>
                  )}
                  <span className={
                    isEvaluated 
                      ? evaluation[criterion] 
                        ? 'text-green-800 font-medium' 
                        : 'text-red-800'
                      : 'text-gray-700'
                  }>
                    {criterion}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-3 rounded border">
              <h4 className="font-semibold mb-2 text-sm text-green-900">✨ Best Practices:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                {selectedExercise.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span>•</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmbeddableSecurityModule;
