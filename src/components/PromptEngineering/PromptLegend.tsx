
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PromptLegend = () => {
  const legendItems = [
    { color: 'bg-purple-100 text-purple-800', label: 'Roldefinitie', description: 'Definieert de expertise of persona van de AI' },
    { color: 'bg-green-100 text-green-800', label: 'Context', description: 'Achtergrondinformatie en scenario' },
    { color: 'bg-blue-100 text-blue-800', label: 'Variabelen', description: 'Plaatshouderwaarden die vervangen worden' },
    { color: 'bg-orange-100 text-orange-800', label: 'Formaat Instructies', description: 'Hoe de uitvoer gestructureerd moet worden' },
    { color: 'bg-yellow-100 text-yellow-800', label: 'Voorbeelden', description: 'Voorbeeld invoer of uitvoer' },
    { color: 'bg-indigo-100 text-indigo-800', label: 'Instructies', description: 'Stap-voor-stap begeleiding' },
    { color: 'bg-pink-100 text-pink-800', label: 'Toon/Stijl', description: 'Communicatiestijl voorkeuren' }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Prompt Componenten Legenda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {legendItems.map((item, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <Badge className={`${item.color} justify-center py-1`}>
                {item.label}
              </Badge>
              <p className="text-xs text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptLegend;
