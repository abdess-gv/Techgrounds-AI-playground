
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Play, Terminal, BookOpen } from 'lucide-react';

const PythonEmbedNL = () => {
  const [code, setCode] = useState('print("Hallo Wereld!")');
  const [output, setOutput] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const exercises = {
    beginner: [
      {
        title: 'Hallo Wereld',
        description: 'Print je eerste bericht naar de console',
        template: 'print("Hallo Wereld!")',
        expected: 'Hallo Wereld!'
      },
      {
        title: 'Variabelen',
        description: 'Maak variabelen en print ze',
        template: 'naam = "Jan"\nleeftijd = 25\nprint(f"Mijn naam is {naam} en ik ben {leeftijd} jaar oud")',
        expected: 'Mijn naam is Jan en ik ben 25 jaar oud'
      },
      {
        title: 'Rekenen',
        description: 'Doe eenvoudige berekeningen',
        template: 'a = 10\nb = 5\nresultaat = a + b\nprint(f"Het resultaat is: {resultaat}")',
        expected: 'Het resultaat is: 15'
      }
    ],
    intermediate: [
      {
        title: 'Functies',
        description: 'Maak en gebruik functies',
        template: 'def groet(naam):\n    return f"Hallo {naam}!"\n\nprint(groet("Python"))',
        expected: 'Hallo Python!'
      },
      {
        title: 'Lists en Loops',
        description: 'Werk met lijsten en loops',
        template: 'getallen = [1, 2, 3, 4, 5]\nfor getal in getallen:\n    print(f"Getal: {getal}")',
        expected: 'Getal: 1\nGetal: 2\nGetal: 3\nGetal: 4\nGetal: 5'
      }
    ],
    advanced: [
      {
        title: 'Classes',
        description: 'Maak en gebruik classes',
        template: 'class Persoon:\n    def __init__(self, naam, leeftijd):\n        self.naam = naam\n        self.leeftijd = leeftijd\n    \n    def groet(self):\n        return f"Ik ben {self.naam}, {self.leeftijd} jaar oud"\n\np = Persoon("Alice", 30)\nprint(p.groet())',
        expected: 'Ik ben Alice, 30 jaar oud'
      }
    ]
  };

  const runCode = () => {
    // Simulatie van Python code uitvoering (in werkelijkheid zou je een Python interpreter nodig hebben)
    try {
      // Voor deze demo simuleren we enkele simpele outputs
      if (code.includes('print("Hallo Wereld!")')) {
        setOutput('Hallo Wereld!');
      } else if (code.includes('naam = "Jan"')) {
        setOutput('Mijn naam is Jan en ik ben 25 jaar oud');
      } else if (code.includes('a = 10')) {
        setOutput('Het resultaat is: 15');
      } else if (code.includes('def groet')) {
        setOutput('Hallo Python!');
      } else if (code.includes('getallen = [1, 2, 3, 4, 5]')) {
        setOutput('Getal: 1\nGetal: 2\nGetal: 3\nGetal: 4\nGetal: 5');
      } else if (code.includes('class Persoon')) {
        setOutput('Ik ben Alice, 30 jaar oud');
      } else {
        setOutput('Code uitgevoerd - resultaat kan variëren');
      }
    } catch (error) {
      setOutput(`Fout: ${error.message}`);
    }
  };

  const loadExercise = (template: string) => {
    setCode(template);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Code2 className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-2xl">Python Programming - Nederlands</CardTitle>
                <p className="text-gray-600">Master Python programming met hands-on coding exercises</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Oefeningen Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Oefeningen</CardTitle>
              <Tabs value={level} onValueChange={(v) => setLevel(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Tussenliggend</TabsTrigger>
                  <TabsTrigger value="advanced">Geavanceerd</TabsTrigger>
                </TabsList>
                
                {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <TabsContent key={lvl} value={lvl} className="space-y-4">
                    {exercises[lvl].map((exercise, index) => (
                      <Card key={index} className="p-4">
                        <h4 className="font-semibold mb-2">{exercise.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                        <Button 
                          size="sm" 
                          onClick={() => loadExercise(exercise.template)}
                          className="w-full"
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Laad Oefening
                        </Button>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardHeader>
          </Card>

          {/* Code Editor en Output Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Python Code Editor</CardTitle>
                  <Button onClick={runCode} className="bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Voer Uit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-40 p-3 border rounded-md font-mono text-sm bg-gray-900 text-green-400"
                  placeholder="Voer je Python code hier in..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5" />
                  <span>Output</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-3 rounded-md font-mono text-sm h-32 overflow-y-auto">
                  <pre>{output || 'Klik op "Voer Uit" om je code te testen...'}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-6 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-green-600">
              Aangedreven door <strong>Techgrounds AI-Playground</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PythonEmbedNL;
