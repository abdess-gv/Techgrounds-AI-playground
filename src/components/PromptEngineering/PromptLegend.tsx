
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PromptLegend = () => {
  const legendItems = [
    { color: 'bg-purple-100 text-purple-800', label: 'Role Definition', description: 'Defines the AI\'s persona or expertise' },
    { color: 'bg-green-100 text-green-800', label: 'Context', description: 'Background information and scenario' },
    { color: 'bg-blue-100 text-blue-800', label: 'Variables', description: 'Placeholder values to be replaced' },
    { color: 'bg-orange-100 text-orange-800', label: 'Format Instructions', description: 'How to structure the output' },
    { color: 'bg-yellow-100 text-yellow-800', label: 'Examples', description: 'Sample inputs or outputs' },
    { color: 'bg-indigo-100 text-indigo-800', label: 'Instructions', description: 'Step-by-step guidance' },
    { color: 'bg-pink-100 text-pink-800', label: 'Tone/Style', description: 'Communication style preferences' }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Prompt Component Legend</CardTitle>
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
