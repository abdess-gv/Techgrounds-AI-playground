
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Prompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  difficulty: string;
  tags: string[];
  likes: number;
  rating: number;
  downloads: number;
}

const AdminPromptManager = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([
    {
      id: "1",
      title: "Advanced Data Analysis",
      description: "Comprehensive data analysis with statistical insights",
      prompt: `Analyze this dataset and provide:

1. **Statistical Summary**
   - Key metrics and distributions
   - Outliers and anomalies
   - Missing data assessment

2. **Correlation Analysis**
   - Identify relationships between variables
   - Highlight significant correlations
   - Suggest potential causation hypotheses

3. **Visualization Recommendations**
   - Most effective chart types for this data
   - Key insights to highlight visually

Data: [DATASET]
Focus areas: [ANALYSIS_FOCUS]`,
      category: "analytics",
      difficulty: "advanced",
      tags: ["data-analysis", "statistics", "visualization"],
      likes: 234,
      rating: 4.8,
      downloads: 890
    },
    {
      id: "2", 
      title: "Creative Writing Coach",
      description: "Develop compelling narratives with structured guidance",
      prompt: `Act as a creative writing coach. Help me develop a story with:

**Story Foundation**
- Genre: [GENRE]
- Target audience: [AUDIENCE]
- Length: [WORD_COUNT]

**Character Development**
- Create 3-5 main characters with distinct personalities
- Define character motivations and conflicts
- Establish character arcs

**Plot Structure**
- Three-act structure with clear turning points
- Build tension and conflict progressively
- Create satisfying resolution

**Writing Style**
- Match tone to genre and audience
- Use vivid descriptions and dialogue
- Maintain consistent point of view

Theme: [THEME]
Setting: [SETTING]`,
      category: "creative",
      difficulty: "intermediate", 
      tags: ["creative-writing", "storytelling", "narrative"],
      likes: 156,
      rating: 4.6,
      downloads: 445
    },
    {
      id: "3",
      title: "Technical Documentation Generator",
      description: "Create clear, comprehensive technical documentation",
      prompt: `Create professional technical documentation for:

**Project Overview**
- Purpose and scope
- Target users
- Key features and benefits

**Technical Specifications**
- System requirements
- Architecture overview
- Dependencies and integrations

**Implementation Guide**
- Step-by-step setup instructions
- Configuration examples
- Troubleshooting common issues

**API Documentation** (if applicable)
- Endpoint descriptions
- Request/response examples
- Error codes and handling

**User Guide**
- Getting started tutorial
- Feature explanations with examples
- Best practices and tips

Project: [PROJECT_NAME]
Technology stack: [TECH_STACK]
Audience: [TECHNICAL_LEVEL]`,
      category: "technical",
      difficulty: "intermediate",
      tags: ["documentation", "technical-writing", "api"],
      likes: 198,
      rating: 4.7,
      downloads: 720
    },
    {
      id: "4",
      title: "Strategic Business Analyzer",
      description: "Comprehensive business strategy analysis and recommendations",
      prompt: `Provide strategic business analysis for:

**Market Analysis**
- Industry trends and growth potential
- Competitive landscape assessment
- Market opportunities and threats

**SWOT Analysis**
- Internal strengths and weaknesses
- External opportunities and threats
- Strategic implications

**Financial Projections**
- Revenue model analysis
- Cost structure optimization
- Profitability scenarios

**Strategic Recommendations**
- Short-term tactical actions (0-6 months)
- Medium-term strategic initiatives (6-18 months)
- Long-term vision and goals (1-3 years)

**Risk Assessment**
- Identify key business risks
- Mitigation strategies
- Contingency planning

Business/Project: [BUSINESS_NAME]
Industry: [INDUSTRY]
Current stage: [BUSINESS_STAGE]`,
      category: "business",
      difficulty: "advanced",
      tags: ["strategy", "business-analysis", "planning"],
      likes: 267,
      rating: 4.9,
      downloads: 580
    },
    {
      id: "5",
      title: "Learning Path Designer",
      description: "Create personalized learning curricula for any skill",
      prompt: `Design a comprehensive learning path for:

**Learning Assessment**
- Current skill level: [CURRENT_LEVEL]
- Learning goals: [GOALS]
- Available time: [TIME_COMMITMENT]
- Preferred learning style: [LEARNING_STYLE]

**Curriculum Structure**
- Break down into progressive modules
- Define learning objectives for each module
- Estimate time requirements

**Resource Recommendations**
- Books, courses, and tutorials
- Practical projects and exercises
- Community resources and forums

**Progress Tracking**
- Milestones and checkpoints
- Assessment methods
- Portfolio project ideas

**Advanced Development**
- Specialization paths
- Industry certifications
- Professional development opportunities

Skill/Subject: [SKILL]
Target proficiency: [TARGET_LEVEL]
Timeline: [TIMELINE]`,
      category: "education",
      difficulty: "intermediate",
      tags: ["learning", "curriculum", "skill-development"],
      likes: 189,
      rating: 4.5,
      downloads: 390
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Prompt>>({});
  const { toast } = useToast();

  const categories = [
    { value: "content", label: "Content Creation" },
    { value: "development", label: "Development" },
    { value: "education", label: "Education" },
    { value: "business", label: "Business" },
    { value: "ai-systems", label: "AI Systems" },
    { value: "analytics", label: "Analytics" },
    { value: "creative", label: "Creative" },
    { value: "technical", label: "Technical" }
  ];

  const difficulties = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      prompt: '',
      category: 'content',
      difficulty: 'beginner',
      tags: [],
      likes: 0,
      rating: 0,
      downloads: 0
    });
  };

  const handleEdit = (prompt: Prompt) => {
    setIsEditing(prompt.id);
    setFormData(prompt);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.prompt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (isCreating) {
      const newPrompt: Prompt = {
        ...formData as Prompt,
        id: Date.now().toString(),
        tags: formData.tags || [],
        likes: 0,
        rating: 0,
        downloads: 0
      };
      setPrompts([...prompts, newPrompt]);
      toast({
        title: "Success",
        description: "Prompt created successfully"
      });
    } else if (isEditing) {
      setPrompts(prompts.map(p => 
        p.id === isEditing ? { ...formData as Prompt } : p
      ));
      toast({
        title: "Success", 
        description: "Prompt updated successfully"
      });
    }

    setIsCreating(false);
    setIsEditing(null);
    setFormData({});
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Prompt deleted successfully"
    });
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Prompt Management</h2>
        <Button onClick={handleCreate} disabled={isCreating || isEditing}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Prompt
        </Button>
      </div>

      {(isCreating || isEditing) && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Prompt' : 'Edit Prompt'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter prompt title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map(diff => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what this prompt does"
                rows={2}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Prompt Content *</label>
              <Textarea
                value={formData.prompt || ''}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                placeholder="Enter the full prompt content..."
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {prompts.map(prompt => (
          <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{prompt.title}</h3>
                    <Badge variant={prompt.difficulty === "beginner" ? "default" : prompt.difficulty === "intermediate" ? "secondary" : "destructive"}>
                      {prompt.difficulty}
                    </Badge>
                    <Badge variant="outline">{prompt.category}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm">{prompt.description}</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(prompt)}
                    disabled={isCreating || isEditing}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(prompt.id)}
                    disabled={isCreating || isEditing}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap overflow-x-auto text-gray-800">
                  {prompt.prompt}
                </pre>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>👍 {prompt.likes}</span>
                  <span>⭐ {prompt.rating}</span>
                  <span>📥 {prompt.downloads}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPromptManager;
