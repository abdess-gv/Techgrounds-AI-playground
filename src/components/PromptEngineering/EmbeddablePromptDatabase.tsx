import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Search, Filter } from 'lucide-react';
import { toast } from "sonner";
import PromptHighlighter from './PromptHighlighter';

interface EmbeddablePromptDatabaseProps {
  compact?: boolean;
  showHeader?: boolean;
  showLegend?: boolean;
  showSearch?: boolean;
  category?: string;
  difficulty?: string;
}

const prompts = [
  {
    id: '1',
    title: 'Blog Post Schrijver',
    category: 'Content',
    difficulty: 'beginner',
    description: 'Schrijf SEO-geoptimaliseerde blog posts',
    prompt: `Je bent een ervaren content schrijver gespecialiseerd in SEO-vriendelijke blog posts.

**Taak**: Schrijf een informatieve blog post van 1500 woorden over [ONDERWERP].

**Vereisten**:
- Gebruik een boeiende titel met het hoofdzoekwoord
- Structureer met H2 en H3 koppen
- Voeg praktische tips en voorbeelden toe
- Eindig met een duidelijke call-to-action
- Schrijf in een toegankelijke, vriendelijke toon

**SEO Focus**: 
- Zoekwoorddichtheid: 1-2%
- Voeg gerelateerde zoekwoorden toe
- Gebruik bullet points en genummerde lijsten`,
    tags: ['SEO', 'Content', 'Blog', 'Marketing']
  },
  {
    id: '2',
    title: 'Social Media Strategie',
    category: 'Marketing',
    difficulty: 'intermediate',
    description: 'Ontwikkel een complete social media strategie',
    prompt: `Je bent een social media strategist met 5+ jaar ervaring in het opbouwen van online communities.

**Situatie**: [BESCHRIJF BEDRIJF/PRODUCT]
**Doelgroep**: [BESCHRIJF DOELGROEP]
**Budget**: [GEEF BUDGET RANGE]

**Lever op**:
1. **Platform analyse**: Welke platforms passen het best?
2. **Content strategie**: Types content per platform
3. **Posting schema**: Frequentie en timing
4. **KPI's**: Meetbare doelen en metrics
5. **Actieplan**: 90-dagen implementatie roadmap

**Format**: Gebruik tabellen en bullet points voor duidelijkheid.`,
    tags: ['Social Media', 'Strategie', 'Marketing', 'KPI']
  },
  {
    id: '3',
    title: 'Code Review Assistant',
    category: 'Ontwikkeling',
    difficulty: 'advanced',
    description: 'Gedetailleerde code review en verbetervoorstellen',
    prompt: `Je bent een senior software engineer met expertise in code quality en best practices.

**Code Review Checklist**:
- **Functionaliteit**: Doet de code wat het moet doen?
- **Leesbaarheid**: Is de code goed te begrijpen?
- **Performance**: Zijn er optimalisaties mogelijk?
- **Security**: Zijn er beveiligingsrisico's?
- **Testing**: Is de code testbaar en getest?

**Voor elke bevinding**:
1. Beschrijf het probleem
2. Leg uit waarom het belangrijk is
3. Geef concrete verbetervoorstellen
4. Toon code voorbeelden waar relevant

**Toon**: Constructief en leerzaam, niet kritisch.`,
    tags: ['Code Review', 'Software', 'Quality', 'Best Practices']
  },
  {
    id: '4',
    title: 'Educatieve Cursus Creator',
    category: 'Onderwijs',
    difficulty: 'intermediate',
    description: 'Ontwerp complete online cursussen',
    prompt: `Je bent een instructional designer gespecialiseerd in online leren en cursus ontwikkeling.

**Cursus Onderwerp**: [VELD IN ONDERWERP]
**Doelgroep**: [BESCHRIJF LEERLING NIVEAU]
**Tijdsduur**: [GEWENSTE CURSUSLENGTE]

**Creëer een cursusstructuur met**:
1. **Leerdoelen**: SMART geformuleerde doelen
2. **Module overzicht**: 6-8 modules met inhoud
3. **Leeractiviteiten**: Variatie in content types
4. **Beoordelingen**: Quizzes, opdrachten, projecten
5. **Bronnen**: Aanvullende materialen en tools

**Leerprincipes**: Gebruik actief leren, microlearning en praktische toepassingen.`,
    tags: ['Onderwijs', 'Cursus', 'E-learning', 'Instructional Design']
  },
  {
    id: '5',
    title: 'Zero-Shot Prompting',
    category: 'Prompt Engineering',
    difficulty: 'beginner',
    description: 'Basale vorm van prompting zonder voorbeelden',
    prompt: `**Zero-Shot Prompting Techniek**

Dit is de meest basale vorm van prompt engineering. Je geeft de AI een taak zonder expliciete voorbeelden van hoe de output eruit moet zien.

**Wanneer te gebruiken**:
- Voor relatief eenvoudige taken
- Gangbare opdrachten waar het model al veel kennis van heeft
- Als je een directe, duidelijke instructie kunt geven

**Voorbeeld**:
Vertaal '[TEKST]' naar [DOELTAAL].

**Instructie**: [GEEF DUIDELIJKE TAAK]

**Tips voor succes**:
- Wees specifiek en duidelijk in je instructie
- Vermijd dubbelzinnigheden
- Test eerst met eenvoudige taken
- Moderne LLM's zijn vaak al heel goed in zero-shot taken`,
    tags: ['Zero-Shot', 'Basis Technieken', 'Prompt Engineering', 'Eenvoudig']
  },
  {
    id: '6',
    title: 'Few-Shot Prompting (In-Context Learning)',
    category: 'Prompt Engineering',
    difficulty: 'intermediate',
    description: 'Leer de AI met voorbeelden van input en output',
    prompt: `**Few-Shot Prompting Techniek**

Geef de AI een paar voorbeelden van de input en gewenste output voordat je de daadwerkelijke vraag stelt.

**Wanneer te gebruiken**:
- Voor taken die een specifiek format vereisen
- Als je een bepaalde stijl wilt aanleren
- Voor complexere patronen die moeilijk uit te leggen zijn

**Template**:
Voorbeelden:
Input: [VOORBEELD 1 INPUT]
Output: [VOORBEELD 1 OUTPUT]

Input: [VOORBEELD 2 INPUT]  
Output: [VOORBEELD 2 OUTPUT]

Input: [VOORBEELD 3 INPUT]
Output: [VOORBEELD 3 OUTPUT]

Nu jouw beurt:
Input: [JOUW INPUT]
Output:

**Tips**:
- Gebruik 2-5 voorbeelden voor beste resultaten
- Zorg dat voorbeelden representatief zijn
- Varieer de voorbeelden om het patroon duidelijk te maken`,
    tags: ['Few-Shot', 'In-Context Learning', 'Voorbeelden', 'Patroon Herkenning']
  },
  {
    id: '7',
    title: 'Chain-of-Thought (CoT) Prompting',
    category: 'Prompt Engineering',
    difficulty: 'intermediate',
    description: 'Laat de AI stap voor stap redeneren voor complexe taken',
    prompt: `**Chain-of-Thought Prompting Techniek**

Voor complexere taken die redeneren of meerdere stappen vereisen, vraag je de AI om het denkproces stap voor stap te laten zien.

**Wanneer te gebruiken**:
- Voor complexe problemen die meerdere stappen vereisen
- Wanneer je transparantie wilt in het redeneerproces
- Voor wiskundige of logische vraagstukken

**Template**:
**Probleem**: [BESCHRIJF COMPLEX PROBLEEM]

**Instructie**: Los dit op door stap voor stap na te denken. Leg je redenering uit bij elke stap.

**Stappen**:
1. **Analyse**: Wat is er gegeven en wat moet ik vinden?
2. **Planning**: Welke methode ga ik gebruiken?
3. **Uitvoering**: Werk de oplossing stap voor stap uit
4. **Verificatie**: Controleer of het antwoord logisch is

**Magische zinnen**:
- "Denk stap voor stap na"
- "Leg je redenering uit"
- "Laat je denkproces zien"

**Voordelen**: Verhoogt betrouwbaarheid en geeft inzicht in de oplossingsmethode.`,
    tags: ['Chain-of-Thought', 'Redeneren', 'Stap-voor-stap', 'Complexe Problemen']
  },
  {
    id: '8',
    title: 'Persona Prompting',
    category: 'Prompt Engineering',
    difficulty: 'beginner',
    description: 'Geef de AI een specifieke rol of expertise',
    prompt: `**Persona Prompting Techniek**

Geef de AI een specifieke rol, persona of expertise om de output te sturen qua toon, stijl en kennisniveau.

**Wanneer te gebruiken**:
- Voor domeinspecifieke expertise
- Om een bepaalde toon of stijl te bereiken
- Voor doelgroepspecifieke communicatie

**Template**:
**Rol**: Je bent een [SPECIFIEKE EXPERT/ROL] met [AANTAL] jaar ervaring in [VAKGEBIED].

**Expertise**: Je specialiseert in [SPECIALISATIE] en bent bekend om [KARAKTERISTIEKE EIGENSCHAP].

**Taak**: [BESCHRIJF OPDRACHT]

**Doelgroep**: [BESCHRIJF DOELGROEP EN NIVEAU]

**Toon**: [GEWENSTE COMMUNICATIESTIJL]

**Voorbeelden van persona's**:
- "Je bent een cyberveiligheidsexpert..."
- "Je bent een vriendelijke leraar voor kinderen..."  
- "Je bent een senior marketingstrateeg..."
- "Je bent een ervaren data scientist..."

**Voordelen**: Verrijkt antwoorden met domeinkennis en passende communicatiestijl.`,
    tags: ['Persona', 'Rol', 'Expertise', 'Doelgroep', 'Communicatiestijl']
  }
];

const categories = ['all', ...Array.from(new Set(prompts.map(p => p.category)))];
const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

const EmbeddablePromptDatabase = ({
  compact = false,
  showHeader = true,
  showLegend = true,
  showSearch = true,
  category = 'all',
  difficulty = 'all'
}: EmbeddablePromptDatabaseProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
  const [expandedPrompts, setExpandedPrompts] = useState<Set<string>>(new Set());

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || prompt.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const copyPrompt = (prompt: string, title: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success(`"${title}" prompt gekopieerd!`);
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedPrompts);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedPrompts(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Gemiddeld';
      case 'advanced': return 'Gevorderd';
      default: return difficulty;
    }
  };

  return (
    <div className={`space-y-4 ${compact ? 'max-w-4xl' : 'max-w-6xl'} mx-auto`}>
      {showHeader && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Nederlandse Prompt Database
          </h2>
          <p className="text-gray-600">
            Professionele prompts voor verschillende vakgebieden
          </p>
        </div>
      )}

      {showLegend && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Prompt Componenten:</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Badge className="bg-purple-100 text-purple-800">Context</Badge>
              <Badge className="bg-green-100 text-green-800">Taak</Badge>
              <Badge className="bg-orange-100 text-orange-800">Vereisten</Badge>
              <Badge className="bg-blue-100 text-blue-800">Format</Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {showSearch && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Zoek prompts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'Alle Categorieën' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff === 'all' ? 'Alle Niveaus' : getDifficultyLabel(diff)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {filteredPrompts.map((prompt) => {
          const isExpanded = expandedPrompts.has(prompt.id);
          
          return (
            <Card key={prompt.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{prompt.title}</CardTitle>
                    <p className="text-sm text-gray-600">{prompt.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {prompt.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <Badge className={getDifficultyColor(prompt.difficulty)}>
                      {getDifficultyLabel(prompt.difficulty)}
                    </Badge>
                    <Badge variant="outline">{prompt.category}</Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleExpanded(prompt.id)}
                      >
                        {isExpanded ? 'Verberg' : 'Bekijk'}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => copyPrompt(prompt.prompt, prompt.title)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Kopieer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <PromptHighlighter text={prompt.prompt} />
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {filteredPrompts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geen prompts gevonden</h3>
            <p className="text-gray-600">Probeer je zoekterm of filters aan te passen.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmbeddablePromptDatabase;
