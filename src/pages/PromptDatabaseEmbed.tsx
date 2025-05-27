
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Heart, Star, Filter, Tag, ExternalLink, Download } from "lucide-react";
import { toast } from "sonner";
import PromptHighlighter from "@/components/PromptEngineering/PromptHighlighter";
import PromptLegend from "@/components/PromptEngineering/PromptLegend";
import SEO from "@/components/SEO";

const PromptDatabaseEmbed = () => {
  const [searchParams] = useSearchParams();
  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showLegend = searchParams.get('legend') !== 'false';
  const showSearch = searchParams.get('search') !== 'false';
  const category = searchParams.get('category') || 'all';
  const difficulty = searchParams.get('difficulty') || 'all';

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);

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

Topic: [TOPIC]
Target audience: [AUDIENCE]
Tone: [TONE]
Word count: [WORD_COUNT]`,
      category: "content",
      difficulty: "beginner",
      tags: ["blogging", "seo", "marketing"],
      likes: 245,
      rating: 4.8
    },
    {
      id: 2,
      title: "Code Review Assistant",
      description: "Comprehensive code analysis and improvement suggestions",
      prompt: `As an experienced software engineer, review this code:

\`\`\`[LANGUAGE]
[CODE]
\`\`\`

Provide feedback on:
1. Code quality and readability
2. Performance optimizations
3. Security considerations
4. Best practices adherence
5. Potential bugs or issues
6. Suggested improvements with examples

Be constructive and educational in your feedback.`,
      category: "development",
      difficulty: "intermediate",
      tags: ["code-review", "programming", "debugging"],
      likes: 189,
      rating: 4.9
    },
    {
      id: 3,
      title: "Chain-of-Thought Math Solver",
      description: "Step-by-step mathematical problem solving",
      prompt: `Solve this mathematical problem using chain-of-thought reasoning:

[PROBLEM]

Approach:
1. **Understand**: Identify what's given and what needs to be found
2. **Plan**: Determine the mathematical concepts and formulas needed
3. **Execute**: Work through the solution step-by-step
4. **Verify**: Check the answer makes sense

Show your work clearly at each step and explain your reasoning.`,
      category: "education",
      difficulty: "intermediate",
      tags: ["math", "chain-of-thought", "problem-solving"],
      likes: 156,
      rating: 4.7
    },
    {
      id: 4,
      title: "RAG Query Optimizer",
      description: "Optimize queries for retrieval-augmented generation",
      prompt: `Given the user query: '[USER_QUERY]'

Generate optimized search queries for RAG retrieval:

1. **Primary Query**: Direct semantic match
2. **Expanded Query**: Include synonyms and related terms
3. **Contextual Query**: Add domain-specific context
4. **Fallback Query**: Broader terms if specific search fails

For each retrieved document, synthesize information while:
- Maintaining factual accuracy
- Citing sources
- Indicating confidence levels
- Noting any conflicting information`,
      category: "ai-systems",
      difficulty: "advanced",
      tags: ["rag", "retrieval", "query-optimization"],
      likes: 203,
      rating: 4.9
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
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <>
      <SEO 
        title="Prompt Database - Interactive Collection"
        description="Browse and copy professional AI prompts for various use cases. Color-coded and optimized for different scenarios."
        noindex={true}
      />
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 ${
        compact ? 'p-2' : 'p-4'
      }`}>
        <div className={`${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto space-y-4`}>
          
          {/* Header */}
          {showHeader && (
            <Card className="border-2 border-purple-200">
              <CardHeader className={`bg-gradient-to-r from-purple-50 to-blue-50 ${compact ? 'p-4' : ''}`}>
                <CardTitle className={`text-purple-900 ${compact ? 'text-lg' : 'text-2xl'}`}>
                  🗄️ Prompt Database
                </CardTitle>
                {!compact && (
                  <CardDescription className="text-purple-700">
                    Discover, customize, and use professional AI prompts for every scenario
                  </CardDescription>
                )}
              </CardHeader>
            </Card>
          )}

          {/* Legend */}
          {showLegend && !compact && <PromptLegend />}

          {/* Search and Filters */}
          {showSearch && (
            <Card>
              <CardContent className={compact ? "p-4" : "p-6"}>
                <div className={`grid gap-4 ${compact ? 'grid-cols-1 md:grid-cols-3' : 'md:grid-cols-4'}`}>
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

                  {!compact && (
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <div className={`grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-xl font-bold text-blue-600">{filteredPrompts.length}</div>
              <div className="text-xs text-gray-600">Prompts</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-xl font-bold text-green-600">{categories.length - 1}</div>
              <div className="text-xs text-gray-600">Categories</div>
            </div>
            {!compact && (
              <>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-purple-600">4.8</div>
                  <div className="text-xs text-gray-600">Avg Rating</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-xl font-bold text-orange-600">993</div>
                  <div className="text-xs text-gray-600">Total Likes</div>
                </div>
              </>
            )}
          </div>

          {/* Prompts Grid */}
          <div className="space-y-4">
            {filteredPrompts.map(prompt => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className={compact ? "p-4" : ""}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className={`flex items-center space-x-2 ${compact ? 'text-base' : ''}`}>
                        <span>{prompt.title}</span>
                        <Badge 
                          variant={prompt.difficulty === "beginner" ? "default" : prompt.difficulty === "intermediate" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {prompt.difficulty}
                        </Badge>
                      </CardTitle>
                      <CardDescription className={`mt-2 ${compact ? 'text-sm' : ''}`}>
                        {prompt.description}
                      </CardDescription>
                    </div>
                    
                    {!compact && (
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{prompt.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{prompt.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className={`space-y-4 ${compact ? 'p-4 pt-0' : ''}`}>
                  <div className="bg-gray-50 p-3 rounded-lg border max-h-48 overflow-y-auto">
                    <PromptHighlighter text={prompt.prompt} className={compact ? "text-xs" : "text-sm"} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.slice(0, compact ? 2 : 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
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
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                      {!compact && (
                        <Button variant="outline" size="sm">
                          <Heart className="h-3 w-3 mr-1" />
                          Like
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Embed Info */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <span>Powered by Prompt Engineering Learning Platform</span>
            <Button variant="link" className="p-0 h-auto ml-2 text-xs" asChild>
              <a href="/prompt-engineering" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Full Platform
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptDatabaseEmbed;
