
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Heart, Star, Filter, Tag, Eye, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PromptHighlighter from './PromptHighlighter';
import PromptLegend from './PromptLegend';

const EnhancedPromptDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showLegend, setShowLegend] = useState(true);
  const { toast } = useToast();

  const prompts = [
    {
      id: 1,
      title: "Content Creation Assistant",
      description: "Generate engaging blog posts with SEO optimization",
      prompt: `Act as an expert content creator and SEO specialist.

Context: You need to write compelling content that ranks well in search engines.

Your task:
1. Hook readers with an engaging introduction
2. Provide valuable, actionable insights
3. Include relevant keywords naturally
4. Use clear headings and structure
5. End with a strong call-to-action

Format: Blog post with H2/H3 headings, bullet points, and engaging paragraphs.

Topic: [TOPIC]
Target audience: [AUDIENCE]
Tone: [TONE]
Word count: [WORD_COUNT]

Example: For a topic about "sustainable gardening," focus on practical tips, environmental benefits, and actionable steps beginners can take.`,
      category: "content",
      difficulty: "beginner",
      tags: ["blogging", "seo", "marketing"],
      likes: 245,
      rating: 4.8,
      downloads: 1200
    },
    {
      id: 2,
      title: "Chain-of-Thought Math Solver",
      description: "Step-by-step mathematical problem solving with reasoning",
      prompt: `You are a mathematics tutor specializing in clear, step-by-step problem solving.

Context: Students need to understand not just the answer, but the reasoning process.

Approach for solving: [PROBLEM]

1. **Understand**: Identify what's given and what needs to be found
   - Given information: [LIST_GIVEN]
   - Unknown variables: [LIST_UNKNOWNS]

2. **Plan**: Determine mathematical concepts and formulas needed
   - Relevant formulas: [FORMULAS]
   - Solution strategy: [STRATEGY]

3. **Execute**: Work through the solution step-by-step
   Step 1: [FIRST_STEP]
   Step 2: [SECOND_STEP]
   Continue until solution...

4. **Verify**: Check if the answer makes sense
   - Unit analysis: [UNITS_CHECK]
   - Reasonableness: [LOGIC_CHECK]

Show your work clearly at each step and explain your reasoning.`,
      category: "education",
      difficulty: "intermediate",
      tags: ["math", "chain-of-thought", "tutoring"],
      likes: 189,
      rating: 4.9,
      downloads: 850
    },
    {
      id: 3,
      title: "RAG Query Optimizer",
      description: "Optimize queries for retrieval-augmented generation systems",
      prompt: `Act as a RAG system optimization specialist.

Context: You're designing queries to retrieve the most relevant information from a knowledge base.

Given user query: '[USER_QUERY]'

Generate optimized retrieval strategies:

1. **Primary Query**: Direct semantic match
   - Keywords: [MAIN_KEYWORDS]
   - Semantic embedding target: [SEMANTIC_TARGET]

2. **Expanded Query**: Include synonyms and related terms
   - Synonyms: [SYNONYM_LIST]
   - Related concepts: [RELATED_CONCEPTS]
   - Alternative phrasings: [ALTERNATIVE_PHRASES]

3. **Contextual Query**: Add domain-specific context
   - Domain: [DOMAIN]
   - Technical terms: [TECH_TERMS]
   - Context clues: [CONTEXT_CLUES]

4. **Fallback Query**: Broader terms if specific search fails
   - General terms: [GENERAL_TERMS]
   - Category-level search: [CATEGORIES]

For each retrieved document, synthesize information while:
- Maintaining factual accuracy with source citations
- Indicating confidence levels (High/Medium/Low)
- Noting conflicting information from different sources
- Highlighting gaps in available information`,
      category: "ai-systems",
      difficulty: "advanced",
      tags: ["rag", "retrieval", "ai-systems"],
      likes: 203,
      rating: 4.9,
      downloads: 650
    },
    {
      id: 4,
      title: "Fine-tuning Dataset Creator",
      description: "Generate high-quality training data for LLM fine-tuning",
      prompt: `You are a machine learning engineer specializing in LLM fine-tuning datasets.

Context: Creating high-quality training data for fine-tuning a model on [TASK_TYPE].

Dataset Requirements:
- Task type: [TASK_TYPE]
- Target model: [MODEL_NAME]
- Training examples needed: [NUMBER]
- Quality standards: [QUALITY_METRICS]

Generate training examples with this structure:
\`\`\`json
{
  "input": "[CONTEXT/INSTRUCTION]",
  "output": "[DESIRED_RESPONSE]",
  "metadata": {
    "difficulty": "[LEVEL]",
    "category": "[CATEGORY]",
    "quality_score": "[SCORE]"
  }
}
\`\`\`

Ensure dataset quality through:
1. **Diversity**: Varied input patterns and edge cases
   - Common scenarios: [COMMON_CASES]
   - Edge cases: [EDGE_CASES]
   - Error conditions: [ERROR_CASES]

2. **Consistency**: Uniform output format and quality
   - Response format: [FORMAT_SPEC]
   - Quality checklist: [QUALITY_CHECKS]

3. **Complexity Balance**: Mix of difficulty levels
   - Beginner (30%): [SIMPLE_EXAMPLES]
   - Intermediate (50%): [MEDIUM_EXAMPLES]
   - Advanced (20%): [COMPLEX_EXAMPLES]

4. **Domain Coverage**: Comprehensive topic coverage
   - Core topics: [CORE_TOPICS]
   - Specialized areas: [SPECIALIZED_AREAS]

Validation criteria: [VALIDATION_RULES]`,
      category: "ai-systems",
      difficulty: "advanced",
      tags: ["fine-tuning", "dataset", "training"],
      likes: 134,
      rating: 4.8,
      downloads: 420
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "content", label: "Content Creation" },
    { value: "development", label: "Development" },
    { value: "education", label: "Education" },
    { value: "business", label: "Business" },
    { value: "ai-systems", label: "AI Systems" }
  ];

  const difficulties = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || prompt.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  const downloadPrompt = (prompt: any) => {
    const content = `# ${prompt.title}\n\n${prompt.description}\n\n## Prompt\n\n${prompt.prompt}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prompt.title.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Enhanced Prompt Database</h2>
        <p className="text-gray-600">
          Discover color-coded, professional prompts with visual highlighting
        </p>
        <Button
          variant="outline"
          onClick={() => setShowLegend(!showLegend)}
          className="mt-4"
        >
          <Eye className="h-4 w-4 mr-2" />
          {showLegend ? 'Hide' : 'Show'} Color Legend
        </Button>
      </div>

      {/* Legend */}
      {showLegend && <PromptLegend />}

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prompts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{filteredPrompts.length}</div>
          <div className="text-sm text-gray-600">Prompts Found</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">4.8</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </div>
        <div className="text-center p-4 bg-white rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">3.1k</div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid gap-6">
        {filteredPrompts.map(prompt => (
          <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{prompt.title}</span>
                    <Badge 
                      variant={prompt.difficulty === "beginner" ? "default" : prompt.difficulty === "intermediate" ? "secondary" : "destructive"}
                    >
                      {prompt.difficulty}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">{prompt.description}</CardDescription>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{prompt.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{prompt.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="h-4 w-4" />
                    <span>{prompt.downloads}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <PromptHighlighter text={prompt.prompt} className="text-sm" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyPrompt(prompt.prompt)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadPrompt(prompt)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Prompts
        </Button>
      </div>
    </div>
  );
};

export default EnhancedPromptDatabase;
