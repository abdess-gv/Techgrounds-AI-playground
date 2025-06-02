
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb,
  Code,
  Target,
  Users
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  examples: Array<{
    title: string;
    prompt: string;
    explanation: string;
  }>;
  keyPoints: string[];
  practiceExercise?: {
    title: string;
    instruction: string;
    expectedOutput: string;
  };
}

interface LessonViewerProps {
  level: "beginner" | "intermediate" | "advanced";
  moduleIndex: number;
  lessonIndex: number;
  onBack: () => void;
  onNext?: () => void;
  onComplete: (lessonId: string) => void;
}

const LessonViewer = ({ level, moduleIndex, lessonIndex, onBack, onNext, onComplete }: LessonViewerProps) => {
  const [activeTab, setActiveTab] = useState('content');
  const [userPrompt, setUserPrompt] = useState('');
  
  const lessonContent = {
    beginner: [
      // Module 1: Introduction to AI & LLMs
      [
        {
          id: 'intro-1',
          title: 'Wat zijn Large Language Models?',
          description: 'Begrijp de fundamenten van AI taalmodellen',
          content: `
Large Language Models (LLMs) zijn AI-systemen die getraind zijn op enorme hoeveelheden tekst om menselijke taal te begrijpen en te genereren.

## Hoe werken LLMs?
LLMs werken door patronen in taal te leren van miljarden voorbeelden. Ze voorspellen wat het meest waarschijnlijke volgende woord is in een zin, gebaseerd op de context.

## Belangrijke concepten:
- **Tokens**: De bouwstenen van tekst (woorden, delen van woorden)
- **Context Window**: Hoeveel tekst het model tegelijk kan "onthouden"
- **Parameters**: De "hersencellen" van het model (meer = slimmer, meestal)
- **Training Data**: De teksten waarop het model geleerd heeft

## Populaire LLMs:
- GPT-4 (OpenAI)
- Claude (Anthropic)
- Gemini (Google)
- LLaMA (Meta)
          `,
          examples: [
            {
              title: 'Basis Vraag',
              prompt: 'Wat is de hoofdstad van Nederland?',
              explanation: 'Een simpele feitelijke vraag waar het model direct kan antwoorden.'
            },
            {
              title: 'Context Afhankelijke Vraag',
              prompt: 'Leg uit waarom Amsterdam belangrijk is voor de Nederlandse economie.',
              explanation: 'Hier moet het model kennis combineren en redenen geven.'
            }
          ],
          keyPoints: [
            'LLMs begrijpen geen taal zoals mensen, maar herkennen patronen',
            'Ze hebben geen toegang tot real-time informatie (tenzij specifiek gegeven)',
            'Kwaliteit van output hangt af van kwaliteit van input (prompt)',
            'Ze kunnen creatief zijn, maar ook fouten maken'
          ]
        },
        {
          id: 'intro-2',
          title: 'AI Gedrag en Beperkingen',
          description: 'Leer wat AI wel en niet kan',
          content: `
Het is cruciaal om te begrijpen wat AI wel en niet kan voordat je effectieve prompts schrijft.

## Wat AI Goed Kan:
- Tekst genereren en bewerken
- Patronen herkennen
- Creatieve taken
- Samenvatten en uitleggen
- Verschillende schrijfstijlen imiteren
- Code schrijven en debuggen

## AI Beperkingen:
- Geen toegang tot real-time informatie
- Kan "hallucineren" (verkeerde info verzinnen)
- Begrijpt context niet zoals mensen
- Geen geheugen tussen gesprekken
- Kan vooroordelen hebben uit trainingsdata

## Praktische Implicaties:
- Controleer altijd belangrijke feiten
- Geef duidelijke context in je prompts
- Verwacht geen perfecte output bij de eerste poging
- Test verschillende benaderingen
          `,
          examples: [
            {
              title: 'Goede Taak voor AI',
              prompt: 'Schrijf een vriendelijke email om een meeting uit te stellen.',
              explanation: 'AI is excellent in het genereren van standaard business communicatie.'
            },
            {
              title: 'Problematische Taak',
              prompt: 'Wat is de huidige koers van Bitcoin?',
              explanation: 'AI heeft geen real-time data en kan verouderde informatie geven.'
            }
          ],
          keyPoints: [
            'AI is een tool, geen vervanger voor menselijk denken',
            'Altijd kritisch blijven over AI output',
            'Beste resultaten komen van goede samenwerking mens-AI',
            'Iteratie en verbetering zijn essentieel'
          ]
        }
      ],
      // Module 2: Basic Prompting Fundamentals
      [
        {
          id: 'basic-1',
          title: 'Duidelijke Instructies Schrijven',
          description: 'De basis van effectieve prompt engineering',
          content: `
De kwaliteit van je AI output begint met duidelijke, specifieke instructies.

## Principes van Duidelijke Instructies:

### 1. Specificiteit
Vage instructies leiden tot vage resultaten. Wees zo specifiek mogelijk over wat je wilt.

**Slecht:** "Schrijf iets over marketing"
**Goed:** "Schrijf een 300-woord artikel over social media marketing voor kleine bedrijven"

### 2. Context Geven
Help de AI begrijpen de situatie en het doel.

**Zonder context:** "Maak een email"
**Met context:** "Maak een professionele email aan een klant om een projectdeadline uit te stellen"

### 3. Format Specificeren
Vertel de AI precies hoe je de output wilt hebben.

**Voorbeelden van formattering:**
- "Maak een lijst met bullet points"
- "Schrijf in de vorm van een gesprek"
- "Gebruik een formele, zakelijke toon"
- "Geef het antwoord in 3 paragrafen"

### 4. Voorbeelden Geven
Als je een specifieke stijl wilt, geef een voorbeeld.
          `,
          examples: [
            {
              title: 'Vage Prompt',
              prompt: 'Help me met mijn presentatie',
              explanation: 'Te vaag - AI weet niet wat voor hulp je nodig hebt.'
            },
            {
              title: 'Specifieke Prompt',
              prompt: 'Maak 5 bullet points voor een 10-minuten presentatie over duurzame energie voor middelbare scholieren. Focus op praktische tips die zij kunnen toepassen.',
              explanation: 'Duidelijk doel, doelgroep, format en focus.'
            }
          ],
          keyPoints: [
            'Specificiteit voorkomt verwarring',
            'Context helpt de AI betere keuzes maken',
            'Format instructies zorgen voor bruikbare output',
            'Voorbeelden zijn krachtiger dan uitleg'
          ],
          practiceExercise: {
            title: 'Oefening: Verbeter deze Prompt',
            instruction: 'Verbeter deze vage prompt: "Schrijf iets over gezond eten"',
            expectedOutput: 'Een specifieke prompt met duidelijk doel, doelgroep, format en context'
          }
        }
      ]
    ],
    // Add more levels and modules here...
  };

  const currentLessons = lessonContent[level]?.[moduleIndex] || [];
  const currentLesson = currentLessons[lessonIndex];

  if (!currentLesson) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Lesson content not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const handleComplete = () => {
    onComplete(currentLesson.id);
    if (onNext) {
      onNext();
    } else {
      onBack();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Module
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
          <p className="text-gray-600">{currentLesson.description}</p>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Lesson Progress</span>
            <span className="text-sm text-gray-600">
              {lessonIndex + 1} of {currentLessons.length}
            </span>
          </div>
          <Progress value={((lessonIndex + 1) / currentLessons.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">
            <BookOpen className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="examples">
            <Code className="h-4 w-4 mr-2" />
            Examples
          </TabsTrigger>
          <TabsTrigger value="keypoints">
            <Target className="h-4 w-4 mr-2" />
            Key Points
          </TabsTrigger>
          {currentLesson.practiceExercise && (
            <TabsTrigger value="practice">
              <Play className="h-4 w-4 mr-2" />
              Practice
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                {currentLesson.content.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="font-semibold mt-2">{line.slice(2, -2)}</p>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4">{line.slice(2)}</li>;
                  }
                  if (line.trim() === '') {
                    return <br key={index} />;
                  }
                  return <p key={index} className="mb-2">{line}</p>;
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <div className="space-y-4">
            {currentLesson.examples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>{example.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Prompt:</h4>
                    <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                      {example.prompt}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Explanation:</h4>
                    <p className="text-gray-700">{example.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="keypoints">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Key Takeaways</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {currentLesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {currentLesson.practiceExercise && (
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-purple-600" />
                  <span>{currentLesson.practiceExercise.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <p className="text-gray-700">{currentLesson.practiceExercise.instruction}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Your Prompt:</h4>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Write your improved prompt here..."
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-800">Expected Result:</h4>
                  <p className="text-blue-700">{currentLesson.practiceExercise.expectedOutput}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div>
          {lessonIndex > 0 && (
            <Button variant="outline" onClick={() => onNext?.()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous Lesson
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete Lesson
          </Button>
          {lessonIndex < currentLessons.length - 1 && (
            <Button onClick={() => onNext?.()}>
              Next Lesson
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
