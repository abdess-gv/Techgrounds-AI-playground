
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workflow, Play, Square, Circle, ArrowRight, Download } from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end';
  label: string;
  x: number;
  y: number;
}

const WorkflowEmbedNL = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: '1', type: 'start', label: 'Start', x: 100, y: 50 },
    { id: '2', type: 'process', label: 'Proces', x: 100, y: 150 },
    { id: '3', type: 'end', label: 'Einde', x: 100, y: 250 }
  ]);
  const [level, setLevel] = useState<'basic' | 'intermediate' | 'expert'>('basic');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = {
    basic: [
      {
        name: 'Eenvoudig Proces',
        description: 'Een basis workflow met start, proces en einde',
        nodes: [
          { id: '1', type: 'start', label: 'Start', x: 100, y: 50 },
          { id: '2', type: 'process', label: 'Taak Uitvoeren', x: 100, y: 150 },
          { id: '3', type: 'end', label: 'Einde', x: 100, y: 250 }
        ]
      },
      {
        name: 'Met Beslissing',
        description: 'Workflow met een beslissingspunt',
        nodes: [
          { id: '1', type: 'start', label: 'Start', x: 100, y: 50 },
          { id: '2', type: 'decision', label: 'Goedgekeurd?', x: 100, y: 150 },
          { id: '3', type: 'process', label: 'Verwerken', x: 50, y: 250 },
          { id: '4', type: 'process', label: 'Afwijzen', x: 150, y: 250 },
          { id: '5', type: 'end', label: 'Einde', x: 100, y: 350 }
        ]
      }
    ],
    intermediate: [
      {
        name: 'Orderverwerking',
        description: 'Complete orderverwerking workflow',
        nodes: [
          { id: '1', type: 'start', label: 'Order Ontvangen', x: 100, y: 50 },
          { id: '2', type: 'decision', label: 'Voorraad Check', x: 100, y: 150 },
          { id: '3', type: 'process', label: 'Bestellen', x: 50, y: 250 },
          { id: '4', type: 'process', label: 'Verzenden', x: 150, y: 250 },
          { id: '5', type: 'end', label: 'Order Afgerond', x: 100, y: 350 }
        ]
      }
    ],
    expert: [
      {
        name: 'HR Proces',
        description: 'Complexe HR workflow met meerdere beslissingspunten',
        nodes: [
          { id: '1', type: 'start', label: 'Sollicitatie', x: 100, y: 50 },
          { id: '2', type: 'decision', label: 'CV Review', x: 100, y: 150 },
          { id: '3', type: 'process', label: 'Interview 1', x: 150, y: 250 },
          { id: '4', type: 'decision', label: 'Geschikt?', x: 150, y: 350 },
          { id: '5', type: 'process', label: 'Interview 2', x: 200, y: 450 },
          { id: '6', type: 'process', label: 'Afwijzen', x: 50, y: 250 },
          { id: '7', type: 'end', label: 'Aannemen/Afwijzen', x: 100, y: 550 }
        ]
      }
    ]
  };

  const loadTemplate = (template: any) => {
    setNodes(template.nodes);
    setSelectedTemplate(template.name);
  };

  const addNode = (type: WorkflowNode['type']) => {
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type,
      label: type === 'start' ? 'Start' : type === 'end' ? 'Einde' : type === 'decision' ? 'Beslissing' : 'Proces',
      x: Math.random() * 300 + 50,
      y: Math.random() * 300 + 50
    };
    setNodes([...nodes, newNode]);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'start':
      case 'end':
        return <Circle className="h-6 w-6" />;
      case 'process':
        return <Square className="h-6 w-6" />;
      case 'decision':
        return <div className="w-6 h-6 border-2 border-current transform rotate-45"></div>;
      default:
        return <Square className="h-6 w-6" />;
    }
  };

  const exportWorkflow = () => {
    const dataStr = JSON.stringify(nodes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workflow.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Workflow className="h-8 w-8 text-purple-600" />
              <div>
                <CardTitle className="text-2xl">Workflow Designer - Nederlands</CardTitle>
                <p className="text-gray-600">Ontwerp en verstaan van workflows met visuele interface</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Templates Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Templates</CardTitle>
              <Tabs value={level} onValueChange={(v) => setLevel(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basis</TabsTrigger>
                  <TabsTrigger value="intermediate">Tussenliggend</TabsTrigger>
                  <TabsTrigger value="expert">Expert</TabsTrigger>
                </TabsList>
                
                {(['basic', 'intermediate', 'expert'] as const).map((lvl) => (
                  <TabsContent key={lvl} value={lvl} className="space-y-4">
                    {templates[lvl].map((template, index) => (
                      <Card key={index} className="p-4">
                        <h4 className="font-semibold mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <Button 
                          size="sm" 
                          onClick={() => loadTemplate(template)}
                          className="w-full"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Laad Template
                        </Button>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </CardHeader>
          </Card>

          {/* Workflow Canvas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Workflow Canvas</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" onClick={() => addNode('start')} className="bg-green-600">
                    <Circle className="h-4 w-4 mr-1" />
                    Start
                  </Button>
                  <Button size="sm" onClick={() => addNode('process')} className="bg-blue-600">
                    <Square className="h-4 w-4 mr-1" />
                    Proces
                  </Button>
                  <Button size="sm" onClick={() => addNode('decision')} className="bg-yellow-600">
                    <div className="w-4 h-4 border border-white transform rotate-45 mr-1"></div>
                    Beslissing
                  </Button>
                  <Button size="sm" onClick={() => addNode('end')} className="bg-red-600">
                    <Circle className="h-4 w-4 mr-1" />
                    Einde
                  </Button>
                  <Button size="sm" onClick={exportWorkflow} variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              {selectedTemplate && (
                <Badge className="w-fit">
                  Actieve Template: {selectedTemplate}
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative bg-white border-2 border-dashed border-gray-300 rounded-lg h-96 overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Render connections between nodes */}
                  {nodes.map((node, index) => {
                    if (index < nodes.length - 1) {
                      const nextNode = nodes[index + 1];
                      return (
                        <line
                          key={`connection-${node.id}`}
                          x1={node.x + 25}
                          y1={node.y + 25}
                          x2={nextNode.x + 25}
                          y2={nextNode.y + 25}
                          stroke="#6B7280"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    }
                    return null;
                  })}
                  
                  {/* Arrow marker definition */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#6B7280"
                      />
                    </marker>
                  </defs>
                </svg>
                
                {/* Render nodes */}
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`absolute w-12 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold cursor-move shadow-lg ${
                      node.type === 'start' ? 'bg-green-500' :
                      node.type === 'end' ? 'bg-red-500' :
                      node.type === 'decision' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}
                    style={{ left: node.x, top: node.y }}
                    title={node.label}
                  >
                    {getNodeIcon(node.type)}
                  </div>
                ))}
                
                {nodes.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Selecteer een template of voeg nodes toe om te beginnen
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Terminologie Uitleg */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Workflow Terminologie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Circle className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-semibold">Start Node</h4>
                  <p className="text-sm text-gray-600">Begin van de workflow</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Square className="h-6 w-6 text-blue-500" />
                <div>
                  <h4 className="font-semibold">Proces Node</h4>
                  <p className="text-sm text-gray-600">Actie of taak</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-yellow-500 transform rotate-45"></div>
                <div>
                  <h4 className="font-semibold">Beslissing Node</h4>
                  <p className="text-sm text-gray-600">Keuze of conditie</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Circle className="h-6 w-6 text-red-500" />
                <div>
                  <h4 className="font-semibold">Eind Node</h4>
                  <p className="text-sm text-gray-600">Einde van de workflow</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 border-purple-200">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-purple-600">
              Aangedreven door <strong>Techgrounds AI-Playground</strong>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowEmbedNL;
