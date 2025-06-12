
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, ArrowLeft, Trophy } from 'lucide-react';
import SEO from '@/components/SEO';

interface QuizItem {
  id: string;
  term: string;
  description: string;
}

const AITermsQuizNL = () => {
  const [selectedLevel, setSelectedLevel] = useState<'easy' | 'medium' | 'hard' | null>(null);
  const [currentData, setCurrentData] = useState<QuizItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [correctMatches, setCorrectMatches] = useState<Set<string>>(new Set());
  const [incorrectShake, setIncorrectShake] = useState<string | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const easyData: QuizItem[] = [
    { id: 'data', term: 'Data', description: 'De informatie (tekst, beelden, etc.) waarmee AI leert.' },
    { id: 'algoritme', term: 'Algoritme', description: 'De set regels of het recept dat AI gebruikt om te leren.' },
    { id: 'model', term: 'Model', description: "De 'getrainde hersenen' die een taak kunnen uitvoeren." },
    { id: 'trainen', term: 'Trainen', description: 'Het proces waarbij een AI leert van data.' },
    { id: 'prompt', term: 'Prompt', description: 'De instructie die je aan een AI geeft.' },
    { id: 'output', term: 'Output', description: 'Het resultaat dat een AI produceert.' },
    { id: 'hallucinatie', term: 'Hallucinatie', description: 'Wanneer AI feitelijk onjuiste informatie presenteert als waar.' },
    { id: 'bias', term: 'Bias', description: 'Ingebakken vooringenomenheid, vaak uit trainingsdata.' }
  ];

  const mediumData: QuizItem[] = [
    ...easyData,
    { id: 'generative', term: 'Generatieve AI', description: 'Een type AI dat in staat is om volledig nieuwe content te creëren.' },
    { id: 'llm', term: 'LLM', description: 'Een zeer groot taalmodel dat getraind is op enorme hoeveelheden tekstdata.' },
    { id: 'fine-tuning', term: 'Fine-tuning', description: 'Een vooraf getraind model aanpassen voor een nieuwe, specifieke taak.' },
    { id: 'api', term: 'API', description: 'Een manier voor verschillende computerprogramma\'s om met elkaar te communiceren.' }
  ];

  const hardData: QuizItem[] = [
    ...mediumData,
    { id: 'overfitting', term: 'Overfitting', description: 'Een model leert de trainingsdata te goed, maar presteert slecht op nieuwe data.' },
    { id: 'rlhf', term: 'RLHF', description: 'Modellen verbeteren door menselijke feedback te gebruiken als beloning.' },
    { id: 'transformer', term: 'Transformer', description: 'De modelarchitectuur die de basis vormt voor moderne taalmodellen zoals GPT.' },
    { id: 'token', term: 'Token', description: 'Een stukje tekst (een woord of deel van een woord) dat een AI-model verwerkt.' }
  ];

  const startGame = (level: 'easy' | 'medium' | 'hard') => {
    const data = level === 'easy' ? easyData : level === 'medium' ? mediumData : hardData;
    setSelectedLevel(level);
    setCurrentData(data);
    setCorrectMatches(new Set());
    setGameCompleted(false);
  };

  const resetGame = () => {
    if (selectedLevel) {
      startGame(selectedLevel);
    }
  };

  const backToLevels = () => {
    setSelectedLevel(null);
    setCurrentData([]);
    setCorrectMatches(new Set());
    setGameCompleted(false);
  };

  const handleDragStart = (e: React.DragEvent, termId: string) => {
    setDraggedItem(termId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || correctMatches.has(targetId)) return;

    if (draggedItem === targetId) {
      const newCorrectMatches = new Set(correctMatches);
      newCorrectMatches.add(targetId);
      setCorrectMatches(newCorrectMatches);
      
      if (newCorrectMatches.size === currentData.length) {
        setGameCompleted(true);
      }
    } else {
      setIncorrectShake(draggedItem);
      setTimeout(() => setIncorrectShake(null), 500);
    }
    
    setDraggedItem(null);
  };

  const shuffledTerms = currentData.slice().sort(() => Math.random() - 0.5);
  const shuffledDescriptions = currentData.slice().sort(() => Math.random() - 0.5);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-sky-500 hover:bg-sky-600';
      case 'medium': return 'bg-purple-500 hover:bg-purple-600';
      case 'hard': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getLevelName = (level: string) => {
    switch (level) {
      case 'easy': return 'Makkelijk';
      case 'medium': return 'Gemiddeld';
      case 'hard': return 'Moeilijk';
      default: return '';
    }
  };

  if (!selectedLevel) {
    return (
      <>
        <SEO 
          title="AI-termen Quiz - Nederlands"
          description="Test je kennis van AI-begrippen met onze interactieve drag-and-drop quiz"
          keywords="AI quiz, AI begrippen, drag and drop, Nederlands, artificial intelligence"
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Kies een Niveau
              </CardTitle>
              <p className="text-gray-600">Test je kennis van AI-begrippen.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                {['easy', 'medium', 'hard'].map((level) => (
                  <Button
                    key={level}
                    onClick={() => startGame(level as any)}
                    className={`${getLevelColor(level)} text-white font-bold py-4 text-lg`}
                    size="lg"
                  >
                    {getLevelName(level)}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`AI-termen Quiz - ${getLevelName(selectedLevel)} Niveau`}
        description="Test je kennis van AI-begrippen met onze interactieve drag-and-drop quiz"
        keywords="AI quiz, AI begrippen, drag and drop, Nederlands"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                AI Begrippen Spel
              </CardTitle>
              <p className="text-gray-600">Sleep de term naar de juiste beschrijving.</p>
              <Badge className={`${getLevelColor(selectedLevel)} text-white`}>
                {getLevelName(selectedLevel)} Niveau
              </Badge>
            </CardHeader>
          </Card>

          {gameCompleted && (
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  🎉 Fantastisch! Alles is correct! 🎉
                </h3>
                <p className="text-green-700">Je hebt alle begrippen correct gekoppeld!</p>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Termen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Kolom A (Term)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shuffledTerms.map((item) => (
                  <div
                    key={`term-${item.id}`}
                    draggable={!correctMatches.has(item.id)}
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className={`
                      p-3 rounded-lg text-center font-medium shadow cursor-grab select-none
                      ${correctMatches.has(item.id) 
                        ? 'bg-green-500 text-white cursor-not-allowed' 
                        : 'bg-sky-100 text-sky-800 hover:bg-sky-200'
                      }
                      ${incorrectShake === item.id ? 'animate-pulse' : ''}
                      transition-all duration-200
                    `}
                  >
                    {item.term}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Beschrijvingen */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Kolom B (Beschrijving)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shuffledDescriptions.map((item) => (
                  <div
                    key={`desc-${item.id}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={`
                      border-2 border-dashed rounded-lg p-3 min-h-[60px] flex items-center
                      ${correctMatches.has(item.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-sky-400 hover:bg-sky-50'
                      }
                      transition-all duration-200
                    `}
                  >
                    <div className="w-full">
                      {correctMatches.has(item.id) && (
                        <div className="bg-green-500 text-white p-2 rounded mb-2 text-center font-medium">
                          {item.term}
                        </div>
                      )}
                      <p className="text-gray-700 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              onClick={backToLevels}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Terug naar Levels</span>
            </Button>
            <Button
              onClick={resetGame}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Opnieuw</span>
            </Button>
          </div>

          <Card className="mt-6 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-blue-600">
                Aangedreven door <strong>Techgrounds AI-Playground</strong>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AITermsQuizNL;
