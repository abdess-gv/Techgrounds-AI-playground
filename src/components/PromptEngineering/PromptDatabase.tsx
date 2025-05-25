
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Heart, Star, Filter, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PromptDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const { toast } = useToast();

  const prompts = [
    {
      id: 1,
      title: "Content Creation Assistant",
      description: "Generate engaging blog posts with SEO optimization",
      prompt: "Act as an expert content creator and SEO specialist. Write a compelling blog post about [TOPIC] that:\n\n1. Hooks readers with an engaging introduction\n2. Provides valuable, actionable insights\n3. Includes relevant keywords naturally\n4. Has clear headings and structure\n5. Ends with a strong call-to-action\n\nTarget audience: [AUDIENCE]\nTone: [TONE]\nWord count: [WORD_COUNT]",
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
      prompt: "As an experienced software engineer, review this code:\n\n```[LANGUAGE]\n[CODE]\n```\n\nProvide feedback on:\n1. Code quality and readability\n2. Performance optimizations\n3. Security considerations\n4. Best practices adherence\n5. Potential bugs or issues\n6. Suggested improvements with examples\n\nBe constructive and educational in your feedback.",
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
      prompt: "Solve this mathematical problem using chain-of-thought reasoning:\n\n[PROBLEM]\n\nApproach:\n1. **Understand**: Identify what's given and what needs to be found\n2. **Plan**: Determine the mathematical concepts and formulas needed\n3. **Execute**: Work through the solution step-by-step\n4. **Verify**: Check the answer makes sense\n\nShow your work clearly at each step and explain your reasoning.",
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
      prompt: "Given the user query: '[USER_QUERY]'\n\nGenerate optimized search queries for RAG retrieval:\n\n1. **Primary Query**: Direct semantic match\n2. **Expanded Query**: Include synonyms and related terms\n3. **Contextual Query**: Add domain-specific context\n4. **Fallback Query**: Broader terms if specific search fails\n\nFor each retrieved document, synthesize information while:\n- Maintaining factual accuracy\n- Citing sources\n- Indicating confidence levels\n- Noting any conflicting information",
      category: "ai-systems",
      difficulty: "advanced",
      tags: ["rag", "retrieval", "query-optimization"],
      likes: 203,
      rating: 4.9
    },
    {
      id: 5,
      title: "Meeting Summary Generator",
      description: "Convert meeting transcripts into actionable summaries",
      prompt: "Transform this meeting transcript into a structured summary:\n\n[TRANSCRIPT]\n\nFormat:\n## Meeting Summary\n**Date**: [DATE]\n**Attendees**: [PARTICIPANTS]\n\n### Key Decisions\n- [List major decisions made]\n\n### Action Items\n- [Task] - Assigned to: [Person] - Due: [Date]\n\n### Discussion Points\n- [Main topics discussed]\n\n### Next Steps\n- [What happens next]\n\nKeep it concise but comprehensive.",
      category: "business",
      difficulty: "beginner",
      tags: ["meetings", "summarization", "productivity"],
      likes: 178,
      rating: 4.6
    },
    {
      id: 6,
      title: "Fine-tuning Dataset Creator",
      description: "Generate training data for LLM fine-tuning",
      prompt: "Create a high-quality training dataset for fine-tuning a model on [TASK_TYPE].\n\nGenerate [NUMBER] examples with this structure:\n```json\n{\n  \"input\": \"[CONTEXT/INSTRUCTION]\",\n  \"output\": \"[DESIRED_RESPONSE]\"\n}\n```\n\nEnsure:\n1. Diverse input patterns and edge cases\n2. Consistent output format and quality\n3. Balanced complexity levels\n4. Domain-specific terminology\n5. Clear input-output relationships\n\nValidation criteria: [QUALITY_METRICS]",
      category: "ai-systems",
      difficulty: "advanced",
      tags: ["fine-tuning", "dataset", "training"],
      likes: 134,
      rating: 4.8
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Prompt Database</h2>
        <p className="text-gray-600">
          Discover, customize, and share high-quality prompts for every use case
        </p>
      </div>

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
          <div className="text-2xl font-bold text-orange-600">1.2k</div>
          <div className="text-sm text-gray-600">Total Likes</div>
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
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{prompt.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{prompt.rating}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap overflow-x-auto">
                  {prompt.prompt}
                </pre>
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

export default PromptDatabase;
