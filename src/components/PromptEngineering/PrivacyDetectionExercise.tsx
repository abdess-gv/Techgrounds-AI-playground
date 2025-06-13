
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle, Eye, Shield, User, MapPin, Calendar } from 'lucide-react';

interface PrivacyIssue {
  type: 'personal' | 'address' | 'metadata' | 'identifier';
  text: string;
  start: number;
  end: number;
  severity: 'low' | 'medium' | 'high';
}

interface PrivacyExercise {
  id: string;
  title: string;
  prompt: string;
  issues: PrivacyIssue[];
  solution: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const privacyExercises: PrivacyExercise[] = [
  {
    id: 'email-draft',
    title: 'Email Concept',
    prompt: 'Help me een professionele email opstellen naar Jan de Vries van Bedrijf ABC B.V. op Hoofdstraat 123, 1234 AB Amsterdam. Hij heeft op 15 maart 2024 gesolliciteerd naar de functie van Marketing Manager. Zijn telefoonnummer is 06-12345678 en email jan.devries@email.com.',
    issues: [
      { type: 'personal', text: 'Jan de Vries', start: 50, end: 62, severity: 'high' },
      { type: 'identifier', text: 'Bedrijf ABC B.V.', start: 67, end: 83, severity: 'medium' },
      { type: 'address', text: 'Hoofdstraat 123, 1234 AB Amsterdam', start: 87, end: 122, severity: 'high' },
      { type: 'metadata', text: '15 maart 2024', start: 131, end: 144, severity: 'medium' },
      { type: 'identifier', text: '06-12345678', start: 222, end: 233, severity: 'high' },
      { type: 'identifier', text: 'jan.devries@email.com', start: 244, end: 265, severity: 'high' }
    ],
    solution: 'Help me een professionele email opstellen naar [NAAM_KANDIDAAT] van [BEDRIJF_NAAM] op [ADRES]. Hij heeft op [DATUM] gesolliciteerd naar de functie van [FUNCTIE]. Zijn contactgegevens zijn [TELEFOON] en [EMAIL].',
    difficulty: 'beginner'
  },
  {
    id: 'customer-analysis',
    title: 'Klantanalyse',
    prompt: 'Analyseer het koopgedrag van Maria Jansen (BSN: 123456789) die woont op de Kerkstraat 45 in Rotterdam. Zij heeft de laatste 6 maanden €2.500 uitgegeven bij onze webshop. Haar IP adres 192.168.1.100 toont dat ze vaak winkelt tussen 20:00-22:00. Credit card nummer 1234-5678-9012-3456.',
    issues: [
      { type: 'personal', text: 'Maria Jansen', start: 33, end: 45, severity: 'high' },
      { type: 'identifier', text: 'BSN: 123456789', start: 47, end: 62, severity: 'high' },
      { type: 'address', text: 'Kerkstraat 45 in Rotterdam', start: 81, end: 107, severity: 'high' },
      { type: 'metadata', text: 'IP adres 192.168.1.100', start: 170, end: 193, severity: 'high' },
      { type: 'identifier', text: '1234-5678-9012-3456', start: 269, end: 288, severity: 'high' }
    ],
    solution: 'Analyseer het koopgedrag van [KLANT_ID] die in [STAD/REGIO] woont. Deze klant heeft de laatste 6 maanden [BEDRAG] uitgegeven. Gebruikspatronen tonen activiteit tussen [TIJDRANGE]. Betaalmethode: [PAYMENT_METHOD_TYPE].',
    difficulty: 'intermediate'
  },
  {
    id: 'hr-assessment',
    title: 'HR Evaluatie',
    prompt: 'Evalueer sollicitant Ahmed Hassan, geboren 12-08-1995, wonend Tulpenstraat 67, Den Haag. LinkedIn: linkedin.com/in/ahmed-hassan-nl. Salaris verwachting €45.000. Vorige werkgever TechCorp BV waar hij 3 jaar werkte als Senior Developer. Referentie contact: Sarah Miller (s.miller@techcorp.nl, 070-1234567).',
    issues: [
      { type: 'personal', text: 'Ahmed Hassan', start: 19, end: 31, severity: 'high' },
      { type: 'metadata', text: '12-08-1995', start: 42, end: 52, severity: 'high' },
      { type: 'address', text: 'Tulpenstraat 67, Den Haag', start: 62, end: 87, severity: 'high' },
      { type: 'identifier', text: 'linkedin.com/in/ahmed-hassan-nl', start: 99, end: 130, severity: 'medium' },
      { type: 'identifier', text: 'TechCorp BV', start: 182, end: 193, severity: 'medium' },
      { type: 'personal', text: 'Sarah Miller', start: 260, end: 272, severity: 'high' },
      { type: 'identifier', text: 's.miller@techcorp.nl', start: 274, end: 295, severity: 'high' },
      { type: 'identifier', text: '070-1234567', start: 297, end: 308, severity: 'high' }
    ],
    solution: 'Evalueer sollicitant [KANDIDAAT_ID], geboren [GEBOORTEJAAR], wonend in [STAD]. LinkedIn: [LINKEDIN_PROFIEL]. Salaris verwachting [SALARIS_RANGE]. Vorige werkgever [BEDRIJF_TYPE] waar hij [JAREN] werkte als [FUNCTIE]. Referentie contact: [REFERENTIE_CONTACT].',
    difficulty: 'advanced'
  }
];

const PrivacyDetectionExercise = ({ level }: { level: 'beginner' | 'intermediate' | 'advanced' }) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userPrompt, setUserPrompt] = useState('');
  const [detectedIssues, setDetectedIssues] = useState<PrivacyIssue[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const exercises = privacyExercises.filter(ex => ex.difficulty === level);
  const exercise = exercises[currentExercise];

  const analyzePrompt = () => {
    if (!exercise) return;
    
    const found: PrivacyIssue[] = [];
    const text = userPrompt.toLowerCase();
    
    // Simple pattern matching voor demo doeleinden
    const patterns = {
      personal: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      phone: /\b0[0-9]{1,2}[-\s]?[0-9]{7,8}\b/g,
      address: /\b[A-Z][a-z]+straat \d+/g,
      bsn: /\bBSN:?\s*\d{9}\b/g,
      creditcard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g
    };

    // Bereken accuracy score
    const totalIssues = exercise.issues.length;
    const foundCount = Math.min(found.length, totalIssues);
    const accuracy = (foundCount / totalIssues) * 100;
    
    setDetectedIssues(found);
    setScore(Math.round(accuracy));
    setShowResults(true);
  };

  const resetExercise = () => {
    setUserPrompt(exercise?.prompt || '');
    setDetectedIssues([]);
    setShowResults(false);
    setScore(0);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      resetExercise();
    }
  };

  if (!exercise) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Geen oefeningen beschikbaar</h3>
          <p className="text-gray-600">Er zijn geen privacy detectie oefeningen voor dit niveau.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-red-600" />
              <span>Privacy Detectie - {exercise.title}</span>
            </CardTitle>
            <Badge className="bg-red-100 text-red-800">
              {currentExercise + 1} van {exercises.length}
            </Badge>
          </div>
          <p className="text-gray-600">
            Identificeer alle privacy gevoelige gegevens in de onderstaande prompt en maak een veilige versie.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Originele Prompt:</label>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm">{exercise.prompt}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Jouw Veilige Versie:
            </label>
            <Textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="Herschrijf de prompt door gevoelige gegevens te vervangen door placeholders..."
              className="min-h-32"
            />
          </div>

          <div className="flex space-x-4">
            <Button onClick={resetExercise} variant="outline">
              Reset
            </Button>
            <Button onClick={analyzePrompt} className="bg-red-600 hover:bg-red-700">
              <Shield className="h-4 w-4 mr-2" />
              Controleer Privacy
            </Button>
          </div>

          {showResults && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Privacy Analyse Resultaat</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Privacy Score:</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={score} className="w-24" />
                    <span className="font-bold text-green-600">{score}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Gedetecteerde Privacy Issues:</h4>
                  <div className="space-y-2">
                    {exercise.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        {issue.type === 'personal' && <User className="h-4 w-4 text-red-500" />}
                        {issue.type === 'address' && <MapPin className="h-4 w-4 text-orange-500" />}
                        {issue.type === 'metadata' && <Calendar className="h-4 w-4 text-yellow-500" />}
                        {issue.type === 'identifier' && <AlertTriangle className="h-4 w-4 text-purple-500" />}
                        <Badge variant="outline" className={
                          issue.severity === 'high' ? 'border-red-300 text-red-700' :
                          issue.severity === 'medium' ? 'border-orange-300 text-orange-700' :
                          'border-yellow-300 text-yellow-700'
                        }>
                          {issue.severity}
                        </Badge>
                        <span>"{issue.text}"</span>
                        <span className="text-gray-500">({issue.type})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Aanbevolen Oplossing:</h4>
                  <div className="p-3 bg-white rounded border">
                    <p className="text-sm">{exercise.solution}</p>
                  </div>
                </div>

                {currentExercise < exercises.length - 1 && (
                  <Button onClick={nextExercise} className="w-full">
                    Volgende Oefening
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyDetectionExercise;
