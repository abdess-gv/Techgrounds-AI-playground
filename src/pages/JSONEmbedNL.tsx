
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileJson, Play, CheckCircle, AlertCircle } from 'lucide-react';

const JSONEmbedNL = () => {
  const [jsonInput, setJsonInput] = useState('{\n  "naam": "Jan",\n  "leeftijd": 25,\n  "stad": "Amsterdam"\n}');
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const exercises = {
    beginner: [
      {
        title: 'Basis JSON Object',
        description: 'Maak een JSON object met persoonlijke gegevens',
        template: '{\n  "naam": "",\n  "leeftijd": 0,\n  "stad": ""\n}'
      },
      {
        title: 'JSON Array',
        description: 'Maak een JSON array met hobby\'s',
        template: '{\n  "hobbys": []\n}'
      }
    ],
    intermediate: [
      {
        title: 'Geneste Objecten',
        description: 'Maak JSON met geneste objecten',
        template: '{\n  "persoon": {\n    "adres": {\n      "straat": "",\n      "nummer": 0\n    }\n  }\n}'
      }
    ],
    advanced: [
      {
        title: 'Complexe Datastructuur',
        description: 'Maak een complex JSON schema',
        template: '{\n  "bedrijf": {\n    "werknemers": [],\n    "afdelingen": {}\n  }\n}'
      }
    ]
  };

  const validateJSON = () => {
    try {
      JSON.parse(jsonInput);
      setIsValid(true);
      setError('');
    } catch (err) {
      setIsValid(false);
      setError(err.message);
    }
  };

  const loadExercise = (template: string) => {
    setJsonInput(template);
    setIsValid(true);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <FileJson className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">JSON Mastery - Nederlands</CardTitle>
                <p className="text-gray-600">Leer JSON van basis tot geavanceerd niveau</p>
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
                          <Play className="h-4 w-4 mr-2" />
                          Start Oefening
                        </Button>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardHeader>
          </Card>

          {/* JSON Editor Panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>JSON Editor</CardTitle>
                <div className="flex items-center space-x-2">
                  {isValid ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Geldig
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Ongeldig
                    </Badge>
                  )}
                  <Button onClick={validateJSON} size="sm">
                    Valideer JSON
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                placeholder="Voer je JSON hier in..."
              />
              {error && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>
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
  );
};

export default JSONEmbedNL;
