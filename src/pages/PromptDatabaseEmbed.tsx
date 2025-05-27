
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Heart, Star, Filter, Tag, Eye, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PromptHighlighter from "@/components/PromptEngineering/PromptHighlighter";
import PromptLegend from "@/components/PromptEngineering/PromptLegend";
import SEO from "@/components/SEO";

const PromptDatabaseEmbed = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showLegend, setShowLegend] = useState(true);
  const { toast } = useToast();

  const compact = searchParams.get('compact') === 'true';
  const showHeader = searchParams.get('header') !== 'false';
  const showFilters = searchParams.get('filters') !== 'false';
  const language = searchParams.get('lang') || 'en';

  // Check if accessed from Dutch page or has Dutch language parameter
  const isDutch = language === 'nl' || window.location.pathname.includes('/nl');

  // Dutch translations
  const t = (key: string) => {
    const translations: { [key: string]: { [key: string]: string } } = {
      en: {
        'database.title': 'Enhanced Prompt Database',
        'database.subtitle': 'Discover color-coded, professional prompts with visual highlighting',
        'show.legend': 'Show Color Legend',
        'hide.legend': 'Hide Color Legend',
        'search.prompts': 'Search prompts...',
        'category': 'Category',
        'difficulty': 'Difficulty',
        'more.filters': 'More Filters',
        'prompts.found': 'Prompts Found',
        'categories': 'Categories',
        'avg.rating': 'Avg Rating',
        'total.downloads': 'Total Downloads',
        'copy': 'Copy',
        'download': 'Download',
        'like': 'Like',
        'load.more': 'Load More Prompts',
        'copied.clipboard': 'Copied to clipboard',
        'prompt.copied': 'The prompt has been copied to your clipboard.',
        'powered.by': 'Powered by Prompt Engineering Learning Platform',
        'view.full': 'View Full Platform',
        'all.categories': 'All Categories',
        'all.levels': 'All Levels',
        'content.creation': 'Content Creation',
        'development': 'Development',
        'education': 'Education',
        'business': 'Business',
        'ai.systems': 'AI Systems',
        'beginner': 'Beginner',
        'intermediate': 'Intermediate',
        'advanced': 'Advanced'
      },
      nl: {
        'database.title': 'Uitgebreide Prompt Database',
        'database.subtitle': 'Ontdek kleurgecodeerde, professionele prompts met visuele markering',
        'show.legend': 'Toon Kleur Legenda',
        'hide.legend': 'Verberg Kleur Legenda',
        'search.prompts': 'Zoek prompts...',
        'category': 'Categorie',
        'difficulty': 'Moeilijkheidsgraad',
        'more.filters': 'Meer Filters',
        'prompts.found': 'Prompts Gevonden',
        'categories': 'Categorieën',
        'avg.rating': 'Gem. Beoordeling',
        'total.downloads': 'Totaal Downloads',
        'copy': 'Kopiëren',
        'download': 'Downloaden',
        'like': 'Vind ik leuk',
        'load.more': 'Meer Prompts Laden',
        'copied.clipboard': 'Gekopieerd naar klembord',
        'prompt.copied': 'De prompt is gekopieerd naar uw klembord.',
        'powered.by': 'Aangedreven door Prompt Engineering Leerplatform',
        'view.full': 'Bekijk Volledig Platform',
        'all.categories': 'Alle Categorieën',
        'all.levels': 'Alle Niveaus',
        'content.creation': 'Content Creatie',
        'development': 'Ontwikkeling',
        'education': 'Onderwijs',
        'business': 'Zakelijk',
        'ai.systems': 'AI Systemen',
        'beginner': 'Beginner',
        'intermediate': 'Gemiddeld',
        'advanced': 'Gevorderd'
      }
    };
    
    const lang = isDutch ? 'nl' : 'en';
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  const prompts = [
    {
      id: 1,
      title: isDutch ? "Content Creatie Assistent" : "Content Creation Assistant",
      description: isDutch ? "Genereer boeiende blogposts met SEO optimalisatie" : "Generate engaging blog posts with SEO optimization",
      prompt: isDutch ? `Fungeer als expert content creator en SEO specialist.

Context: Je moet overtuigende content schrijven die goed rankt in zoekmachines.

Jouw taak:
1. Trek lezers met een boeiende introductie
2. Geef waardevolle, uitvoerbare inzichten
3. Gebruik relevante zoekwoorden natuurlijk
4. Gebruik duidelijke koppen en structuur
5. Eindig met een sterke call-to-action

Formaat: Blogpost met H2/H3 koppen, bullet points en boeiende paragrafen.

Onderwerp: [ONDERWERP]
Doelgroep: [DOELGROEP]
Toon: [TOON]
Woordaantal: [WOORDAANTAL]

Voorbeeld: Voor een onderwerp over "duurzaam tuinieren," focus op praktische tips, milieu voordelen, en uitvoerbare stappen voor beginners.` : `Act as an expert content creator and SEO specialist.

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
      tags: isDutch ? ["bloggen", "seo", "marketing"] : ["blogging", "seo", "marketing"],
      likes: 245,
      rating: 4.8,
      downloads: 1200
    },
    {
      id: 2,
      title: isDutch ? "Stap-voor-Stap Wiskundige Problemen" : "Chain-of-Thought Math Solver",
      description: isDutch ? "Stap-voor-stap wiskundige probleemoplossing met redenering" : "Step-by-step mathematical problem solving with reasoning",
      prompt: isDutch ? `Je bent een wiskundetuteur gespecialiseerd in duidelijke, stap-voor-stap probleemoplossing.

Context: Studenten moeten niet alleen het antwoord begrijpen, maar ook het redeneringsproces.

Aanpak voor het oplossen van: [PROBLEEM]

1. **Begrijpen**: Identificeer wat gegeven is en wat gevonden moet worden
   - Gegeven informatie: [LIJST_GEGEVEN]
   - Onbekende variabelen: [LIJST_ONBEKENDEN]

2. **Plannen**: Bepaal benodigde wiskundige concepten en formules
   - Relevante formules: [FORMULES]
   - Oplossingsstrategie: [STRATEGIE]

3. **Uitvoeren**: Werk door de oplossing stap-voor-stap
   Stap 1: [EERSTE_STAP]
   Stap 2: [TWEEDE_STAP]
   Ga door tot oplossing...

4. **Verifiëren**: Controleer of het antwoord logisch is
   - Eenhedenanalyse: [EENHEDEN_CHECK]
   - Redelijkheid: [LOGICA_CHECK]

Toon je werk duidelijk bij elke stap en leg je redenering uit.` : `You are a mathematics tutor specializing in clear, step-by-step problem solving.

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
      tags: isDutch ? ["wiskunde", "stap-voor-stap", "tutoring"] : ["math", "chain-of-thought", "tutoring"],
      likes: 189,
      rating: 4.9,
      downloads: 850
    }
  ];

  const categories = [
    { value: "all", label: t('all.categories') },
    { value: "content", label: t('content.creation') },
    { value: "development", label: t('development') },
    { value: "education", label: t('education') },
    { value: "business", label: t('business') },
    { value: "ai-systems", label: t('ai.systems') }
  ];

  const difficulties = [
    { value: "all", label: t('all.levels') },
    { value: "beginner", label: t('beginner') },
    { value: "intermediate", label: t('intermediate') },
    { value: "advanced", label: t('advanced') }
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
      title: t('copied.clipboard'),
      description: t('prompt.copied'),
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
    <>
      <SEO 
        title={t('database.title')}
        description={t('database.subtitle')}
        noindex={true}
      />
      <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 ${
        compact ? 'p-2' : 'p-4'
      }`}>
        <div className={`${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto space-y-4`}>
          
          {/* Header */}
          {showHeader && (
            <div className="text-center">
              <h2 className={`${compact ? 'text-xl' : 'text-3xl'} font-bold mb-2`}>{t('database.title')}</h2>
              <p className="text-gray-600 mb-4">
                {t('database.subtitle')}
              </p>
              <Button
                variant="outline"
                onClick={() => setShowLegend(!showLegend)}
                size={compact ? "sm" : "default"}
              >
                <Eye className="h-4 w-4 mr-2" />
                {showLegend ? t('hide.legend') : t('show.legend')}
              </Button>
            </div>
          )}

          {/* Legend */}
          {showLegend && <PromptLegend />}

          {/* Filters */}
          {showFilters && (
            <Card>
              <CardContent className={compact ? "p-4" : "p-6"}>
                <div className={`grid ${compact ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={t('search.prompts')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                      size={compact ? "sm" : "default"}
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger size={compact ? "sm" : "default"}>
                      <SelectValue placeholder={t('category')} />
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
                    <SelectTrigger size={compact ? "sm" : "default"}>
                      <SelectValue placeholder={t('difficulty')} />
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
                      {t('more.filters')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          {!compact && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">{filteredPrompts.length}</div>
                <div className="text-sm text-gray-600">{t('prompts.found')}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
                <div className="text-sm text-gray-600">{t('categories')}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-sm text-gray-600">{t('avg.rating')}</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg border">
                <div className="text-2xl font-bold text-orange-600">3.1k</div>
                <div className="text-sm text-gray-600">{t('total.downloads')}</div>
              </div>
            </div>
          )}

          {/* Prompts Grid */}
          <div className="grid gap-6">
            {filteredPrompts.map(prompt => (
              <Card key={prompt.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className={compact ? "p-4" : ""}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className={`flex items-center space-x-2 ${compact ? 'text-lg' : ''}`}>
                        <span>{prompt.title}</span>
                        <Badge 
                          variant={prompt.difficulty === "beginner" ? "default" : prompt.difficulty === "intermediate" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {t(prompt.difficulty)}
                        </Badge>
                      </CardTitle>
                      <p className={`text-gray-600 mt-2 ${compact ? 'text-sm' : ''}`}>{prompt.description}</p>
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
                        <div className="flex items-center space-x-1">
                          <Download className="h-4 w-4" />
                          <span>{prompt.downloads}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className={`space-y-4 ${compact ? 'p-4 pt-0' : ''}`}>
                  <div className={`bg-gray-50 p-4 rounded-lg border ${compact ? 'max-h-40 overflow-y-auto' : ''}`}>
                    <PromptHighlighter text={prompt.prompt} className={compact ? "text-xs" : "text-sm"} />
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
                        size={compact ? "sm" : "sm"}
                        onClick={() => copyPrompt(prompt.prompt)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        {t('copy')}
                      </Button>
                      {!compact && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadPrompt(prompt)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            {t('download')}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4 mr-2" />
                            {t('like')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {!compact && (
            <div className="text-center">
              <Button variant="outline" size="lg">
                {t('load.more')}
              </Button>
            </div>
          )}

          {/* Embed Info */}
          <div className="text-center text-xs text-gray-500 border-t pt-2">
            <span>{t('powered.by')}</span>
            <Button variant="link" className="p-0 h-auto ml-2 text-xs" asChild>
              <a href={isDutch ? "/prompt-engineering/nl" : "/prompt-engineering"} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                {t('view.full')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptDatabaseEmbed;
