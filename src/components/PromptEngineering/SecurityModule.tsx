
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, CheckCircle, AlertTriangle, Lightbulb, Users, Lock, Eye } from 'lucide-react';
import InteractiveExercise from './InteractiveExercise';
import { useLanguage } from '@/contexts/LanguageContext';

// Define the exercise type that matches InteractiveExercise expectations
interface SecurityExercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  prompt: string;
  solution: string;
  criteria: string[];
  hints: string[];
  timeLimit?: number;
}

const securityExercises: SecurityExercise[] = [
  {
    id: "sec-1",
    title: "Privacy-Safe Prompt Design",
    description: "Learn to write prompts that protect sensitive information while getting useful results.",
    difficulty: 'beginner',
    category: 'security',
    prompt: "I need help writing a professional email to decline a job offer. Can you help me create a template?",
    solution: `Help me write a professional email template to decline a job offer. The email should:

- Be polite and grateful
- Clearly state the decision
- Keep the door open for future opportunities
- Be concise and professional

Format: Professional email template with placeholders for [COMPANY_NAME], [POSITION_TITLE], and [YOUR_NAME].`,
    criteria: [
      "Uses placeholders instead of real information",
      "Clearly specifies the desired outcome",
      "Includes relevant context without personal details",
      "Maintains professional tone"
    ],
    hints: [
      "Never include real names, companies, or personal details in your prompts",
      "Use placeholders like [COMPANY_NAME] and [YOUR_NAME]",
      "Focus on the structure and tone rather than specific details"
    ],
    timeLimit: 600
  },
  {
    id: "sec-2", 
    title: "Fact-Checking Prompts",
    description: "Design prompts that encourage AI to provide verifiable information and cite sources.",
    difficulty: 'intermediate',
    category: 'security',
    prompt: "Tell me about the benefits of meditation.",
    solution: `Please provide information about the scientifically-proven benefits of meditation. For each benefit mentioned:

1. Cite specific research studies or meta-analyses
2. Include publication dates and sample sizes when available
3. Indicate the strength of evidence (strong/moderate/limited)
4. Mention any limitations or conflicting findings

Also include:
- Any potential risks or side effects
- Different types of meditation studied
- Recommended duration/frequency based on research

Format the response with clear citations and confidence indicators.`,
    criteria: [
      "Requests specific citations and sources",
      "Asks for evidence quality indicators",
      "Seeks balanced perspective including limitations",
      "Specifies desired format for verification"
    ],
    hints: [
      "Ask for sources and citations",
      "Request specific studies or research",
      "Ask the AI to indicate confidence levels",
      "Request both benefits and limitations"
    ],
    timeLimit: 900
  },
  {
    id: "sec-3",
    title: "Bias-Aware Prompt Writing",
    description: "Create prompts that acknowledge and minimize potential AI bias in responses.",
    difficulty: 'intermediate',
    category: 'security',
    prompt: "What's the best programming language to learn?",
    solution: `I'm interested in learning programming. Please provide a balanced analysis of programming languages for beginners, considering:

1. Different career paths (web development, data science, mobile apps, etc.)
2. Learning difficulty and time investment
3. Job market demand in different regions
4. Community support and resources

For each language mentioned:
- Explain the specific contexts where it excels
- Note any limitations or challenges
- Acknowledge that recommendations may vary based on individual goals

Please avoid declaring any single language as "the best" and instead focus on helping me understand which might be most suitable for different scenarios. Also mention any potential biases in your recommendations.`,
    criteria: [
      "Avoids absolute claims about 'best' options",
      "Requests context-dependent analysis",
      "Asks for acknowledgment of limitations and biases",
      "Seeks multiple perspectives and use cases"
    ],
    hints: [
      "Acknowledge that 'best' depends on context",
      "Ask for multiple perspectives",
      "Request consideration of different use cases",
      "Ask about potential biases in the response"
    ],
    timeLimit: 900
  },
  {
    id: "sec-4",
    title: "Transparent AI Collaboration",
    description: "Learn to be transparent about AI assistance in your work while maintaining quality.",
    difficulty: 'advanced',
    category: 'security',
    prompt: "Write a report about renewable energy for my university assignment.",
    solution: `I'm working on a university report about renewable energy and want to use AI assistance ethically. Please help me with:

1. Creating a comprehensive outline and structure
2. Suggesting reliable academic sources to research
3. Identifying key topics I should cover
4. Providing guidance on how to properly cite AI assistance in my work

I want to write the content myself after doing my own research, but I'd like help organizing my approach and ensuring I don't miss important aspects of the topic.

Please also advise on:
- How to transparently acknowledge AI assistance in my report
- Best practices for using AI as a research and writing aid in academic work
- Ways to ensure my final work represents my own understanding and analysis`,
    criteria: [
      "Clearly defines the scope of AI assistance requested",
      "Focuses on learning support rather than content generation",
      "Asks for guidance on proper attribution and transparency",
      "Maintains academic integrity while leveraging AI effectively"
    ],
    hints: [
      "Clarify your role vs. AI's role in the work",
      "Ask for guidance on proper attribution",
      "Request help with structure, not content generation",
      "Focus on learning rather than task completion"
    ],
    timeLimit: 1200
  },
  {
    id: "sec-5",
    title: "Critical Evaluation Prompts",
    description: "Design prompts that help you critically evaluate and verify AI-generated content.",
    difficulty: 'advanced',
    category: 'security',
    prompt: "Explain how blockchain technology works.",
    solution: `Please explain how blockchain technology works, and then help me critically evaluate your explanation by:

1. Identifying any oversimplifications in your explanation
2. Pointing out common misconceptions about blockchain you may have inadvertently included
3. Suggesting 3-5 authoritative sources where I can verify your explanation
4. Providing counterarguments or criticisms of blockchain technology
5. Explaining what aspects of blockchain are still debated or uncertain

After your explanation, please also:
- List questions I should ask to test my understanding
- Suggest practical ways to verify blockchain concepts (demos, visualizations, etc.)
- Warn me about any potential biases in how blockchain is typically presented

This will help me develop a more nuanced and verified understanding of the technology.`,
    criteria: [
      "Requests critical analysis of the AI's own response",
      "Asks for verification methods and sources",
      "Seeks counterarguments and alternative perspectives", 
      "Includes metacognitive elements for learning verification"
    ],
    hints: [
      "Ask for potential weaknesses in the explanation",
      "Request alternative viewpoints",
      "Ask about common misconceptions",
      "Request ways to verify the information"
    ],
    timeLimit: 1500
  }
];

const SecurityModule = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const { t } = useLanguage();

  const safetyPrinciples = [
    {
      icon: Lock,
      title: "Privacy Beschermen",
      description: "Deel nooit persoonlijke of gevoelige informatie met AI-systemen",
      level: "kritiek"
    },
    {
      icon: Eye,
      title: "Verificatie van Output", 
      description: "Controleer altijd de output van AI voordat je het gebruikt",
      level: "belangrijk"
    },
    {
      icon: Users,
      title: "Transparantie",
      description: "Wees eerlijk over het gebruik van AI in je werk",
      level: "ethisch"
    }
  ];

  const levelColors = {
    kritiek: "bg-red-100 text-red-800 border-red-200",
    belangrijk: "bg-yellow-100 text-yellow-800 border-yellow-200", 
    ethisch: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Veilig AI Gebruik</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Leer hoe je AI-tools veilig en verantwoord kunt gebruiken door praktische oefeningen en principes.
        </p>
      </div>

      <Tabs defaultValue="exercises" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exercises">Oefeningen</TabsTrigger>
          <TabsTrigger value="principles">Principes</TabsTrigger>
          <TabsTrigger value="tips">Snelle Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>AI Veiligheid Oefeningen</span>
              </CardTitle>
              <CardDescription>
                Oefen met echte scenario's om veilig AI gebruik te leren
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                {securityExercises.map((_, index) => (
                  <Button
                    key={index}
                    variant={index === currentExerciseIndex ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentExerciseIndex(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              
              <InteractiveExercise
                exercise={securityExercises[currentExerciseIndex]}
                onComplete={(score) => console.log('Exercise completed with score:', score)}
              />
              
              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (currentExerciseIndex > 0) {
                      setCurrentExerciseIndex(currentExerciseIndex - 1);
                    }
                  }}
                  disabled={currentExerciseIndex === 0}
                >
                  Vorige
                </Button>
                <Button
                  onClick={() => {
                    if (currentExerciseIndex < securityExercises.length - 1) {
                      setCurrentExerciseIndex(currentExerciseIndex + 1);
                    }
                  }}
                  disabled={currentExerciseIndex === securityExercises.length - 1}
                >
                  Volgende
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {safetyPrinciples.map((principle, index) => (
              <Card key={index} className={`border-2 ${levelColors[principle.level]}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <principle.icon className="h-8 w-8 text-current" />
                    <div>
                      <CardTitle className="text-lg">{principle.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {principle.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Wel Doen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Gebruik placeholders voor gevoelige data</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Vraag om bronnen bij feiten</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span className="text-sm">Wees transparant over AI-gebruik</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Niet Doen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span className="text-sm">Persoonlijke gegevens delen</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span className="text-sm">Blind vertrouwen op AI-output</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span className="text-sm">AI-gebruik verzwijgen</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityModule;
