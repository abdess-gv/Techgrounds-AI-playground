
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Lightbulb, Target, Zap, Users, Brain, Database } from "lucide-react";

const FrameworkLibrary = () => {
  const frameworks = {
    basic: [
      {
        name: "CLEAR Framework",
        description: "A simple structure for writing effective prompts",
        acronym: {
          C: "Context - Provide relevant background information",
          L: "Length - Specify desired output length",
          E: "Examples - Include sample inputs/outputs",
          A: "Audience - Define target audience",
          R: "Role - Assign a specific role to the AI"
        },
        example: `Role: Act as a professional email writer
Context: Writing a follow-up email after a job interview
Audience: Hiring manager at a tech company
Length: Keep it under 150 words
Examples: Thank them for their time, reiterate interest, mention specific discussion points`,
        useCase: "General prompting, content creation, business communication",
        difficulty: "Beginner"
      },
      {
        name: "STAR Method",
        description: "Structure responses using Situation, Task, Action, Result",
        acronym: {
          S: "Situation - Set the context and background",
          T: "Task - Describe what needed to be accomplished",
          A: "Action - Explain the specific actions taken",
          R: "Result - Share the outcomes and lessons learned"
        },
        example: `Please analyze this business case using the STAR method:

Situation: [Describe the business context]
Task: [What needed to be achieved]
Action: [Steps taken to address the challenge]
Result: [Outcomes and metrics]`,
        useCase: "Business analysis, case studies, project evaluation",
        difficulty: "Beginner"
      }
    ],
    intermediate: [
      {
        name: "Chain-of-Thought (CoT)",
        description: "Enable step-by-step reasoning for complex problems",
        structure: "Problem → Reasoning Steps → Conclusion",
        example: `Solve this step-by-step:

Problem: A company's revenue grew from $100k to $150k in one year. What was the percentage increase?

Let me think through this step by step:
1. Initial revenue: $100,000
2. Final revenue: $150,000
3. Increase amount: $150,000 - $100,000 = $50,000
4. Percentage increase: ($50,000 ÷ $100,000) × 100% = 50%

Therefore, the revenue increased by 50%.`,
        useCase: "Mathematical problems, logical reasoning, complex analysis",
        difficulty: "Intermediate"
      },
      {
        name: "ReAct Framework",
        description: "Combine Reasoning and Acting for dynamic problem-solving",
        structure: "Thought → Action → Observation → Thought → Action...",
        example: `Task: Find the current population of Tokyo

Thought 1: I need to search for the most recent population data for Tokyo
Action 1: Search for "Tokyo population 2024"
Observation 1: Found data showing Tokyo metropolitan area has about 37.4 million people

Thought 2: I should verify this is the most current data and clarify if this is city proper or metropolitan area
Action 2: Search for "Tokyo city proper vs metropolitan area population"
Observation 2: Tokyo city proper has about 14 million, metropolitan area has 37.4 million

Answer: Tokyo city proper has approximately 14 million people, while the Greater Tokyo Area (metropolitan area) has about 37.4 million people as of 2024.`,
        useCase: "Research tasks, fact-finding, multi-step processes",
        difficulty: "Intermediate"
      }
    ],
    advanced: [
      {
        name: "Constitutional AI",
        description: "Self-correcting prompts with built-in safety and quality checks",
        structure: "Initial Response → Self-Critique → Revision → Final Output",
        example: `Generate a marketing strategy, then review and improve it:

Initial Strategy: [Generate marketing plan]

Self-Critique:
- Is this strategy ethical and honest?
- Does it consider diverse audiences?
- Are the tactics realistic and measurable?
- What potential negative consequences could arise?

Revised Strategy: [Improve based on critique]

Final Review: [Confirm the strategy meets quality and ethical standards]`,
        useCase: "Content review, ethical AI applications, quality assurance",
        difficulty: "Advanced"
      },
      {
        name: "Tree of Thoughts",
        description: "Explore multiple reasoning paths before converging on solution",
        structure: "Problem → Multiple Paths → Evaluation → Best Solution",
        example: `Problem: Design a sustainable transportation system for a city

Path 1: Electric public transit focus
- Pros: Reduces emissions, cost-effective for users
- Cons: High infrastructure investment, charging needs

Path 2: Bike-sharing and walkability
- Pros: Healthy, minimal infrastructure, flexible
- Cons: Weather dependent, limited range

Path 3: Mixed modal approach
- Pros: Flexibility, gradual transition, diverse needs
- Cons: Complex coordination, higher planning costs

Evaluation: Consider cost, environmental impact, user adoption, scalability

Best Solution: Mixed modal approach with phased implementation starting with bike infrastructure and electric buses, then expanding to rail systems.`,
        useCase: "Strategic planning, complex decision-making, system design",
        difficulty: "Advanced"
      }
    ]
  };

  const promptPatterns = [
    {
      name: "Few-Shot Learning",
      description: "Provide examples to guide AI behavior",
      template: `Here are some examples of [TASK]:

Example 1:
Input: [EXAMPLE_INPUT_1]
Output: [EXAMPLE_OUTPUT_1]

Example 2:
Input: [EXAMPLE_INPUT_2]
Output: [EXAMPLE_OUTPUT_2]

Now, please do the same for:
Input: [YOUR_INPUT]
Output:`,
      icon: Lightbulb
    },
    {
      name: "Role-Based Prompting",
      description: "Assign specific expertise and perspective",
      template: `You are a [ROLE] with [YEARS] years of experience in [FIELD]. 

Your expertise includes:
- [SKILL_1]
- [SKILL_2]
- [SKILL_3]

Please [TASK] while maintaining your professional perspective and using industry-standard practices.`,
      icon: Users
    },
    {
      name: "Constraint-Based",
      description: "Set clear boundaries and requirements",
      template: `Please [TASK] with the following constraints:

Requirements:
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

Limitations:
- Do not [LIMITATION_1]
- Avoid [LIMITATION_2]
- Must stay within [BOUNDARY]

Format your response as: [FORMAT_SPECIFICATION]`,
      icon: Target
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Framework Library</h2>
        <p className="text-gray-600">
          Master proven frameworks and patterns for effective prompt engineering
        </p>
      </div>

      <Tabs defaultValue="frameworks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
          <TabsTrigger value="patterns">Prompt Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-8">
          {/* Beginner Frameworks */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-6 w-6 text-green-600" />
              <h3 className="text-2xl font-bold">Beginner Frameworks</h3>
              <Badge variant="default">Easy to Learn</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {frameworks.basic.map((framework, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{framework.name}</span>
                      <Badge variant="default">{framework.difficulty}</Badge>
                    </CardTitle>
                    <CardDescription>{framework.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {'acronym' in framework && (
                      <div>
                        <h4 className="font-semibold mb-2">Structure:</h4>
                        <div className="space-y-2">
                          {Object.entries(framework.acronym).map(([letter, meaning]) => (
                            <div key={letter} className="flex">
                              <span className="font-bold text-blue-600 w-6">{letter}:</span>
                              <span className="text-sm">{meaning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                        {framework.example}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">Best for:</h4>
                      <p className="text-sm text-gray-600">{framework.useCase}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Intermediate Frameworks */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold">Intermediate Frameworks</h3>
              <Badge variant="secondary">Moderate Complexity</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {frameworks.intermediate.map((framework, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{framework.name}</span>
                      <Badge variant="secondary">{framework.difficulty}</Badge>
                    </CardTitle>
                    <CardDescription>{framework.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Structure:</h4>
                      <p className="text-sm bg-blue-50 p-2 rounded">{framework.structure}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                        {framework.example}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">Best for:</h4>
                      <p className="text-sm text-gray-600">{framework.useCase}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advanced Frameworks */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold">Advanced Frameworks</h3>
              <Badge variant="destructive">Expert Level</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {frameworks.advanced.map((framework, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{framework.name}</span>
                      <Badge variant="destructive">{framework.difficulty}</Badge>
                    </CardTitle>
                    <CardDescription>{framework.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Structure:</h4>
                      <p className="text-sm bg-purple-50 p-2 rounded">{framework.structure}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Example:</h4>
                      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                        {framework.example}
                      </pre>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">Best for:</h4>
                      <p className="text-sm text-gray-600">{framework.useCase}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {promptPatterns.map((pattern, index) => {
              const IconComponent = pattern.icon;
              return (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                      <span>{pattern.name}</span>
                    </CardTitle>
                    <CardDescription>{pattern.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold mb-2">Template:</h4>
                      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                        {pattern.template}
                      </pre>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Code className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Quick Reference Guide</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">When to Use Each Pattern:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Few-Shot:</strong> When you need consistent formatting or style</li>
                    <li><strong>Role-Based:</strong> For domain-specific expertise and perspective</li>
                    <li><strong>Constraint-Based:</strong> When output must meet specific requirements</li>
                    <li><strong>Chain-of-Thought:</strong> For complex reasoning and problem-solving</li>
                    <li><strong>ReAct:</strong> For research and multi-step tasks</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Combining Patterns:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Role + Few-Shot:</strong> Expert with consistent examples</li>
                    <li><strong>CoT + Constraints:</strong> Structured reasoning with boundaries</li>
                    <li><strong>ReAct + Role:</strong> Expert research with verification</li>
                    <li><strong>Constitutional + Any:</strong> Add self-correction to any pattern</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrameworkLibrary;
