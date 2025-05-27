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
    },
    {
      id: 3,
      title: isDutch ? "SMART Doelen Framework" : "SMART Goals Framework",
      description: isDutch ? "Formuleer specifieke, meetbare en haalbare doelstellingen" : "Formulate specific, measurable and achievable objectives",
      prompt: isDutch ? `Gebruik het SMART framework om effectieve doelen te formuleren.

Context: Je helpt bij het opstellen van heldere, haalbare doelstellingen.

SMART CRITERIA:

S - SPECIFIEK:
Wat precies wil je bereiken? Wees zo concreet mogelijk.
- Wie is erbij betrokken?
- Wat wil je bereiken?
- Waar gaat het plaatsvinden?
- Wanneer moet het af zijn?
- Waarom is dit doel belangrijk?

M - MEETBAAR:
Hoe ga je vooruitgang meten? Definieer concrete metrics.
- Kwantitatieve indicatoren: [AANTAL, PERCENTAGE, BEDRAG]
- Kwalitative indicatoren: [TEVREDENHEID, KWALITEIT]
- Mijlpalen en checkpoints: [PLANNING]

A - ACCEPTABEL/HAALBAAR:
Is dit doel realistisch en haalbaar?
- Beschikbare resources: [TIJD, BUDGET, MENSEN]
- Benodigde vaardigheden: [COMPETENTIES]
- Externe factoren: [AFHANKELIJKHEDEN]

R - RELEVANT:
Past dit doel bij je grotere doelstellingen?
- Strategische alignment: [BEDRIJFSDOELEN]
- Prioriteit niveau: [HOOG/MEDIUM/LAAG]
- Impact op andere doelen: [SYNERGIE/CONFLICT]

T - TIJDGEBONDEN:
Wanneer moet dit doel bereikt zijn?
- Einddatum: [DATUM]
- Tussentijdse deadlines: [MIJLPALEN]
- Review momenten: [EVALUATIE PLANNING]

Formuleer je SMART doel: [DOEL BESCHRIJVING]

Voorbeeld: "Binnen 6 maanden (T) het aantal maandelijkse website bezoekers verhogen (S) van 10.000 naar 15.000 bezoekers (M) door SEO optimalisatie en content marketing (A), om de online zichtbaarheid te verbeteren (R)."` : `Use the SMART framework to formulate effective goals.

Context: You help create clear, achievable objectives.

SMART CRITERIA:

S - SPECIFIC:
What exactly do you want to achieve? Be as concrete as possible.
- Who is involved?
- What do you want to achieve?
- Where will it take place?
- When should it be completed?
- Why is this goal important?

M - MEASURABLE:
How will you measure progress? Define concrete metrics.
- Quantitative indicators: [NUMBER, PERCENTAGE, AMOUNT]
- Qualitative indicators: [SATISFACTION, QUALITY]
- Milestones and checkpoints: [SCHEDULE]

A - ACHIEVABLE:
Is this goal realistic and attainable?
- Available resources: [TIME, BUDGET, PEOPLE]
- Required skills: [COMPETENCIES]
- External factors: [DEPENDENCIES]

R - RELEVANT:
Does this goal align with your larger objectives?
- Strategic alignment: [BUSINESS GOALS]
- Priority level: [HIGH/MEDIUM/LOW]
- Impact on other goals: [SYNERGY/CONFLICT]

T - TIME-BOUND:
When should this goal be achieved?
- End date: [DATE]
- Interim deadlines: [MILESTONES]
- Review moments: [EVALUATION SCHEDULE]

Formulate your SMART goal: [GOAL DESCRIPTION]

Example: "Within 6 months (T) increase monthly website visitors (S) from 10,000 to 15,000 visitors (M) through SEO optimization and content marketing (A), to improve online visibility (R)."`,
      category: "business",
      difficulty: "beginner",
      tags: isDutch ? ["doelen", "planning", "smart", "projectmanagement"] : ["goals", "planning", "smart", "project management"],
      likes: 156,
      rating: 4.7,
      downloads: 720
    },
    {
      id: 4,
      title: isDutch ? "5W1H Analyse Framework" : "5W1H Analysis Framework",
      description: isDutch ? "Systematische probleemanalyse met de 5W1H methode" : "Systematic problem analysis using the 5W1H method",
      prompt: isDutch ? `Gebruik de 5W1H methode voor systematische analyse en probleemoplossing.

Context: Je voert een grondige analyse uit van [SITUATIE/PROBLEEM].

5W1H FRAMEWORK:

WHO (WIE):
- Wie zijn de betrokken partijen?
- Wie heeft invloed op de situatie?
- Wie wordt beïnvloed door het probleem?
- Wie kan bijdragen aan de oplossing?
- Wie is verantwoordelijk voor actie?

WHAT (WAT):
- Wat is het exacte probleem?
- Wat zijn de symptomen?
- Wat zijn de gevolgen?
- Wat is de gewenste uitkomst?
- Wat zijn mogelijke oplossingen?

WHERE (WAAR):
- Waar doet het probleem zich voor?
- Waar heeft het impact?
- Waar kunnen we ingrijpen?
- Waar zijn de resources beschikbaar?
- Waar liggen de kansen?

WHEN (WANNEER):
- Wanneer is het probleem ontstaan?
- Wanneer is het het ergst?
- Wanneer moet het opgelost zijn?
- Wanneer kunnen we actie ondernemen?
- Wanneer evalueren we de voortgang?

WHY (WAAROM):
- Waarom is dit probleem ontstaan?
- Waarom is het belangrijk om op te lossen?
- Waarom zijn eerdere oplossingen mislukt?
- Waarom is de timing belangrijk?
- Waarom deze aanpak kiezen?

HOW (HOE):
- Hoe gaan we het probleem aanpakken?
- Hoe meten we succes?
- Hoe vermijden we herhaling?
- Hoe communiceren we over de oplossing?
- Hoe zorgen we voor implementatie?

Synthetiseer de antwoorden tot een actieplan met prioriteiten en verantwoordelijkheden.` : `Use the 5W1H method for systematic analysis and problem solving.

Context: You conduct a thorough analysis of [SITUATION/PROBLEM].

5W1H FRAMEWORK:

WHO:
- Who are the involved parties?
- Who influences the situation?
- Who is affected by the problem?
- Who can contribute to the solution?
- Who is responsible for action?

WHAT:
- What is the exact problem?
- What are the symptoms?
- What are the consequences?
- What is the desired outcome?
- What are possible solutions?

WHERE:
- Where does the problem occur?
- Where does it have impact?
- Where can we intervene?
- Where are resources available?
- Where are the opportunities?

WHEN:
- When did the problem arise?
- When is it worst?
- When must it be solved?
- When can we take action?
- When do we evaluate progress?

WHY:
- Why did this problem arise?
- Why is it important to solve?
- Why have previous solutions failed?
- Why is timing important?
- Why choose this approach?

HOW:
- How will we address the problem?
- How do we measure success?
- How do we prevent recurrence?
- How do we communicate about the solution?
- How do we ensure implementation?

Synthesize the answers into an action plan with priorities and responsibilities.`,
      category: "business",
      difficulty: "beginner",
      tags: isDutch ? ["analyse", "probleemoplossing", "5w1h", "planning"] : ["analysis", "problem solving", "5w1h", "planning"],
      likes: 203,
      rating: 4.8,
      downloads: 890
    },
    {
      id: 5,
      title: isDutch ? "SCAMPER Innovatie Methode" : "SCAMPER Innovation Method",
      description: isDutch ? "Creatieve ideegeneratie met de SCAMPER checklist" : "Creative idea generation using the SCAMPER checklist",
      prompt: isDutch ? `Gebruik SCAMPER voor systematische innovatie en creatieve probleemoplossing.

Context: Verbeter of innoveer [PRODUCT/SERVICE/PROCES] met creatieve technieken.

SCAMPER METHODE:

S - SUBSTITUTE (VERVANGEN):
Wat kunnen we vervangen?
- Materialen: [ALTERNATIEVEN]
- Processen: [ANDERE METHODEN]
- Personen: [VERSCHILLENDE ROLLEN]
- Locaties: [ANDERE PLEKKEN]
- Tijdstippen: [ANDERE MOMENTEN]

C - COMBINE (COMBINEREN):
Wat kunnen we samenvoegen?
- Functies combineren: [INTEGRATIE]
- Verschillende markten: [CROSS-INDUSTRY]
- Competenties bundelen: [SAMENWERKING]
- Technologieën mixen: [HYBRID OPLOSSINGEN]

A - ADAPT (AANPASSEN):
Wat kunnen we aanpassen of kopiëren?
- Andere industrieën: [BEST PRACTICES]
- Natuurlijke processen: [BIOMIMICRY]
- Historische oplossingen: [TRADITIE]
- Culturele verschillen: [LOKALISATIE]

M - MODIFY/MAGNIFY (WIJZIGEN/VERGROTEN):
Wat kunnen we wijzigen of versterken?
- Grootte veranderen: [SCHAAL]
- Vorm aanpassen: [DESIGN]
- Eigenschappen versterken: [INTENSIVEREN]
- Functies uitbreiden: [TOEVOEGEN]

P - PUT TO OTHER USES (ANDERE TOEPASSINGEN):
Hoe kunnen we het anders gebruiken?
- Nieuwe doelgroepen: [MARKTEN]
- Andere contexten: [SITUATIES]
- Verschillende problemen: [TOEPASSINGEN]
- Onverwachte gebruikers: [INNOVATIEVE USES]

E - ELIMINATE (ELIMINEREN):
Wat kunnen we weglaten?
- Onnodige stappen: [VEREENVOUDIGEN]
- Overbodige features: [MINIMALISEREN]
- Kostbare elementen: [BESPAREN]
- Complexiteit reduceren: [SIMPLIFICEREN]

R - REVERSE/REARRANGE (OMKEREN/HERRANGSCHIKKEN):
Wat kunnen we omdraaien of herordenen?
- Volgorde wijzigen: [PROCES]
- Rollen omdraaien: [PERSPECTIEF]
- Oorzaak-gevolg: [LOGICA]
- Structuur herindelen: [ORGANISATIE]

Genereer minimaal 3 innovatieve ideeën per SCAMPER element.` : `Use SCAMPER for systematic innovation and creative problem solving.

Context: Improve or innovate [PRODUCT/SERVICE/PROCESS] with creative techniques.

SCAMPER METHOD:

S - SUBSTITUTE:
What can we substitute?
- Materials: [ALTERNATIVES]
- Processes: [OTHER METHODS]
- People: [DIFFERENT ROLES]
- Locations: [OTHER PLACES]
- Times: [OTHER MOMENTS]

C - COMBINE:
What can we combine?
- Combine functions: [INTEGRATION]
- Different markets: [CROSS-INDUSTRY]
- Bundle competencies: [COLLABORATION]
- Mix technologies: [HYBRID SOLUTIONS]

A - ADAPT:
What can we adapt or copy?
- Other industries: [BEST PRACTICES]
- Natural processes: [BIOMIMICRY]
- Historical solutions: [TRADITION]
- Cultural differences: [LOCALIZATION]

M - MODIFY/MAGNIFY:
What can we modify or enhance?
- Change size: [SCALE]
- Adjust form: [DESIGN]
- Strengthen properties: [INTENSIFY]
- Expand functions: [ADD]

P - PUT TO OTHER USES:
How can we use it differently?
- New target groups: [MARKETS]
- Other contexts: [SITUATIONS]
- Different problems: [APPLICATIONS]
- Unexpected users: [INNOVATIVE USES]

E - ELIMINATE:
What can we eliminate?
- Unnecessary steps: [VEREENVOUDIGEN]
- Redundant features: [MINIMIZE]
- Costly elements: [BESPAREN]
- Complexity reduceren: [SIMPLIFICEREN]

R - REVERSE/REARRANGE:
What can we reverse or rearrange?
- Change sequence: [PROCESS]
- Reverse roles: [PERSPECTIVE]
- Cause-effect: [LOGIC]
- Restructure: [ORGANIZATION]

Generate at least 3 innovative ideas per SCAMPER element.`,
      category: "ai-systems",
      difficulty: "intermediate",
      tags: isDutch ? ["innovatie", "creativiteit", "scamper", "ideegeneratie"] : ["innovation", "creativity", "scamper", "idea generation"],
      likes: 287,
      rating: 4.9,
      downloads: 1150
    },
    {
      id: 6,
      title: isDutch ? "SWOT Analyse Framework" : "SWOT Analysis Framework",
      description: isDutch ? "Strategische analyse van sterke punten, zwaktes, kansen en bedreigingen" : "Strategic analysis of strengths, weaknesses, opportunities and threats",
      prompt: isDutch ? `Voer een grondige SWOT analyse uit voor strategische planning.

Context: Analyseer [ORGANISATIE/PROJECT/PRODUCT] voor strategische besluitvorming.

SWOT ANALYSE FRAMEWORK:

STRENGTHS (STERKE PUNTEN):
Interne positieve factoren
- Unieke competenties: [CORE CAPABILITIES]
- Concurrentievoordelen: [USP's]
- Sterke merken/reputatie: [BRAND EQUITY]
- Financiële positie: [RESOURCES]
- Getalenteerd personeel: [HUMAN CAPITAL]
- Innovatiecapaciteit: [R&D]
- Operationele efficiëntie: [PROCESSEN]

WEAKNESSES (ZWAKKE PUNTEN):
Interne beperkende factoren
- Tekortkomingen in vaardigheden: [SKILL GAPS]
- Beperkte resources: [CONSTRAINTS]
- Zwakke processen: [INEFFICIENCIES]
- Negatieve reputatie aspecten: [BRAND ISSUES]
- Geografische beperkingen: [COVERAGE]
- Technologische achterstanden: [TECH DEBT]
- Organisatorische problemen: [STRUCTURE]

OPPORTUNITIES (KANSEN):
Externe positieve trends
- Marktgroeimogelijkheden: [EXPANSION]
- Nieuwe technologieën: [INNOVATION]
- Regelgevingsveranderingen: [REGULATORY]
- Demografische trends: [SOCIAL CHANGES]
- Economische ontwikkelingen: [ECONOMIC]
- Partnerschapsmogelijkheden: [ALLIANCES]
- Nieuwe distributiekanalen: [CHANNELS]

THREATS (BEDREIGINGEN):
Externe negatieve factoren
- Nieuwe concurrenten: [COMPETITION]
- Veranderende klantwensen: [MARKET SHIFTS]
- Technologische disruptie: [DISRUPTION]
- Economische neergang: [RECESSION]
- Regelgevingsrisico's: [COMPLIANCE]
- Natuurlijke/politieke events: [EXTERNAL SHOCKS]
- Reputatierisico's: [BRAND THREATS]

STRATEGISCHE IMPLICATIES:

SO Strategieën (Strengths-Opportunities):
Hoe kunnen we sterke punten gebruiken om kansen te benutten?

WO Strategieën (Weaknesses-Opportunities):
Hoe kunnen we zwaktes wegwerken om kansen te grijpen?

ST Strategieën (Strengths-Threats):
Hoe kunnen we sterke punten gebruiken om bedreigingen te pareren?

WT Strategieën (Weaknesses-Threats):
Hoe minimaliseren we zwaktes en bedreigingen?

Prioriteer strategieën op basis van impact en haalbaarheid.` : `Conduct a thorough SWOT analysis for strategic planning.

Context: Analyze [ORGANIZATION/PROJECT/PRODUCT] for strategic decision making.

SWOT ANALYSIS FRAMEWORK:

STRENGTHS:
Internal positive factors
- Unique competencies: [CORE CAPABILITIES]
- Competitive advantages: [USPs]
- Strong brands/reputation: [BRAND EQUITY]
- Financial position: [RESOURCES]
- Talented personnel: [HUMAN CAPITAL]
- Innovation capacity: [R&D]
- Operational efficiency: [PROCESSES]

WEAKNESSES:
Internal limiting factors
- Skill deficiencies: [SKILL GAPS]
- Limited resources: [CONSTRAINTS]
- Weak processes: [INEFFICIENCIES]
- Negative reputation aspects: [BRAND ISSUES]
- Geographic limitations: [COVERAGE]
- Technology lag: [TECH DEBT]
- Organizational problems: [STRUCTURE]

OPPORTUNITIES:
External positive trends
- Market growth possibilities: [EXPANSION]
- New technologies: [INNOVATION]
- Regulatory changes: [REGULATORY]
- Demographic trends: [SOCIAL CHANGES]
- Economic developments: [ECONOMIC]
- Partnership opportunities: [ALLIANCES]
- New distribution channels: [CHANNELS]

THREATS:
External negative factors
- New competitors: [COMPETITION]
- Changing customer preferences: [MARKET SHIFTS]
- Technological disruption: [DISRUPTION]
- Economic downturn: [RECESSION]
- Regulatory risks: [COMPLIANCE]
- Natural/political events: [EXTERNAL SHOCKS]
- Reputation risks: [BRAND THREATS]

STRATEGIC IMPLICATIONS:

SO Strategies (Strengths-Opportunities):
How can we use strengths to capitalize on opportunities?

WO Strategies (Weaknesses-Opportunities):
How can we address weaknesses to seize opportunities?

ST Strategies (Strengths-Threats):
How can we use strengths to counter threats?

WT Strategies (Weaknesses-Threats):
How do we minimize weaknesses and threats?

Prioritize strategies based on impact and feasibility.`,
      category: "business",
      difficulty: "intermediate",
      tags: isDutch ? ["swot", "strategie", "analyse", "planning"] : ["swot", "strategy", "analysis", "planning"],
      likes: 234,
      rating: 4.6,
      downloads: 980
    },
    {
      id: 7,
      title: isDutch ? "Design Thinking Framework" : "Design Thinking Framework",
      description: isDutch ? "Gebruikersgerichte innovatie met de Design Thinking methodiek" : "User-centered innovation using Design Thinking methodology",
      prompt: isDutch ? `Gebruik Design Thinking voor gebruikersgerichte probleemoplossing en innovatie.

Context: Ontwikkel oplossingen voor [PROBLEEM/UITDAGING] met focus op gebruikerservaring.

DESIGN THINKING PROCES:

1. EMPATHIZE (EMPATHISEREN):
Begrijp je gebruikers diepgaand
- Gebruikersinterviews: [INSIGHTS]
- Observatiestudies: [GEDRAG]
- Personas ontwikkelen: [PROFIELEN]
- Customer journey mapping: [TOUCHPOINTS]
- Pain points identificeren: [FRUSTRATIES]
- Behoeften en motivaties: [DRIVERS]

Empathy Map:
- Wat denken en voelen ze? [THOUGHTS/FEELINGS]
- Wat horen ze? [INFLUENCES]
- Wat zien ze? [ENVIRONMENT]
- Wat zeggen en doen ze? [ACTIONS]
- Pains: [CHALLENGES]
- Gains: [BENEFITS]

2. DEFINE (DEFINIËREN):
Formuleer het kernprobleem
- Point of View statement: [USER] needs [NEED] because [INSIGHT]
- "Hoe kunnen we..." vragen formuleren
- Probleem framing: [PERSPECTIVE]
- Success criteria: [MEETBARE DOELEN]
- Constraints identificeren: [BEPERKINGEN]

3. IDEATE (IDEEËN GENEREREN):
Genereer creatieve oplossingen
- Brainstorm technieken: [DIVERGENT THINKING]
- "Yes, and..." mentaliteit
- Quantity over quality eerst
- Geen kritiek tijdens ideation
- Build on ideas of others
- Wilde ideeën aanmoedigen

Ideation methoden:
- Brainstorming: [KLASSIEK]
- Mind mapping: [VISUEEL]
- SCAMPER: [SYSTEMATISCH]
- Worst possible idea: [REVERSE]
- Bodystorming: [FYSIEK]

4. PROTOTYPE (PROTOTYPEN):
Maak tastbare concepten
- Low-fidelity prototypes: [SNEL/GOEDKOOP]
- Paper prototypes: [SCHETS]
- Digital wireframes: [STRUCTUUR]
- Role-playing: [SERVICE]
- Storyboards: [VERHAAL]

Prototype principes:
- Fail fast, learn fast
- Start with lowest fidelity
- Focus op één aspect per prototype
- Maak het interactief
- Think with your hands

5. TEST (TESTEN):
Valideer met gebruikers
- Usability testing: [GEBRUIKSGEMAK]
- A/B testing: [VERGELIJKEN]
- User feedback: [INSIGHTS]
- Iteration planning: [VERBETERING]
- Assumption validation: [AANNAMES]

Test strategie:
- Wie ga je testen? [TARGET USERS]
- Wat ga je testen? [HYPOTHESES]
- Hoe ga je testen? [METHODEN]
- Wat ga je meten? [METRICS]
- Hoe implementeer je learnings? [ITERATION]

DESIGN THINKING MINDSET:
- Human-centered
- Collaborative
- Experimental
- Optimistic
- Iterative

Documenteer elke fase en itereer op basis van learnings.` : `Use Design Thinking for user-centered problem solving and innovation.

Context: Develop solutions for [PROBLEM/CHALLENGE] with focus on user experience.

DESIGN THINKING PROCESS:

1. EMPATHIZE:
Understand your users deeply
- User interviews: [INSIGHTS]
- Observation studies: [BEHAVIOR]
- Develop personas: [PROFILES]
- Customer journey mapping: [TOUCHPOINTS]
- Identify pain points: [FRUSTRATIONS]
- Needs and motivations: [DRIVERS]

Empathy Map:
- What do they think and feel? [THOUGHTS/FEELINGS]
- What do they hear? [INFLUENCES]
- What do they see? [ENVIRONMENT]
- What do they say and do? [ACTIONS]
- Pains: [CHALLENGES]
- Gains: [BENEFITS]

2. DEFINE:
Formulate the core problem
- Point of View statement: [USER] needs [NEED] because [INSIGHT]
- Formulate "How might we..." questions
- Problem framing: [PERSPECTIVE]
- Success criteria: [MEASURABLE GOALS]
- Identify constraints: [LIMITATIONS]

3. IDEATE:
Generate creative solutions
- Brainstorm techniques: [DIVERGENT THINKING]
- "Yes, and..." mentality
- Quantity over quality first
- No criticism during ideation
- Build on others' ideas
- Encourage wild ideas

Ideation methods:
- Brainstorming: [CLASSIC]
- Mind mapping: [VISUAL]
- SCAMPER: [SYSTEMATIC]
- Worst possible idea: [REVERSE]
- Bodystorming: [PHYSICAL]

4. PROTOTYPE:
Create tangible concepts
- Low-fidelity prototypes: [FAST/CHEAP]
- Paper prototypes: [SKETCH]
- Digital wireframes: [STRUCTURE]
- Role-playing: [SERVICE]
- Storyboards: [STORY]

Prototype principles:
- Fail fast, learn fast
- Start with lowest fidelity
- Focus on one aspect per prototype
- Make it interactive
- Think with your hands

5. TEST:
Validate with users
- Usability testing: [EASE OF USE]
- A/B testing: [COMPARE]
- User feedback: [INSIGHTS]
- Iteration planning: [IMPROVEMENT]
- Assumption validation: [ASSUMPTIONS]

Test strategy:
- Who will you test? [TARGET USERS]
- What will you test? [HYPOTHESES]
- How will you test? [METHODS]
- What will you measure? [METRICS]
- How will you implement learnings? [ITERATION]

DESIGN THINKING MINDSET:
- Human-centered
- Collaborative
- Experimental
- Optimistic
- Iterative

Document each phase and iterate based on learnings.`,
      category: "development",
      difficulty: "intermediate",
      tags: isDutch ? ["design thinking", "innovatie", "gebruikerservaring", "prototyping"] : ["design thinking", "innovation", "user experience", "prototyping"],
      likes: 342,
      rating: 4.9,
      downloads: 1340
    },
    {
      id: 8,
      title: isDutch ? "OKR Doelen Framework" : "OKR Goals Framework",
      description: isDutch ? "Objectives and Key Results voor strategische doelstellingen" : "Objectives and Key Results for strategic goal setting",
      prompt: isDutch ? `Implementeer OKRs voor effectieve doelstelling en uitvoering.

Context: Stel OKRs op voor [ORGANISATIE/TEAM/PROJECT] voor [TIJDSPERIODE].

OKR FRAMEWORK:

OBJECTIVES (DOELSTELLINGEN):
Kwalitatieve, inspirerende en haalbare doelen

Criteria voor goede Objectives:
- Inspirerend en motiverend
- Kwalitatief geformuleerd
- Tijdgebonden (meestal quarterly)
- Herinnert aan het "waarom"
- Actionable door het team

Voorbeeld Objectives:
- "Klantloyaliteit drastisch verbeteren"
- "Marktleider worden in [SEGMENT]"
- "Operationele excellentie bereiken"
- "Innovatie cultuur opbouwen"

KEY RESULTS (KERNRESULTATEN):
Kwantitatieve, meetbare uitkomsten

Criteria voor goede Key Results:
- Specifiek en meetbaar
- Ambitieus maar haalbaar
- Tijdgebonden
- Verified (objectief meetbaar)
- Onder controle van het team

Key Results Types:
- Baseline metrics: [HUIDIGE STAAT VERBETEREN]
- Milestone metrics: [NIEUWE PRESTATIES]
- Positive metrics: [GEWENSTE TOENAME]
- Negative metrics: [ONGEWENSTE AFNAME]

OKR STRUCTUUR PER NIVEAU:

COMPANY LEVEL:
Objective 1: [COMPANY OBJECTIVE]
- Key Result 1.1: [METRIC + TARGET]
- Key Result 1.2: [METRIC + TARGET]
- Key Result 1.3: [METRIC + TARGET]

TEAM LEVEL:
Objective 2: [TEAM OBJECTIVE - ALIGNED WITH COMPANY]
- Key Result 2.1: [TEAM METRIC + TARGET]
- Key Result 2.2: [TEAM METRIC + TARGET]
- Key Result 2.3: [TEAM METRIC + TARGET]

INDIVIDUAL LEVEL:
Objective 3: [PERSONAL OBJECTIVE - SUPPORTS TEAM]
- Key Result 3.1: [INDIVIDUAL METRIC + TARGET]
- Key Result 3.2: [INDIVIDUAL METRIC + TARGET]

OKR BEST PRACTICES:

PLANNING:
- Maximum 3-5 Objectives per niveau
- 2-4 Key Results per Objective
- 70% ambitious (stretch goals)
- Alignment tussen niveaus
- Transparant voor hele organisatie

EXECUTION:
- Weekly check-ins
- Monthly reviews
- Quarterly retrospectives
- Continuous adjustment
- Focus op leerproces

SCORING:
- 0.0-0.3: Failed to make progress
- 0.4-0.6: Made progress but fell short
- 0.7-1.0: Delivered

OKR TIJDLIJN:

Week 1-2: OKR Planning
- Draft objectives
- Define key results
- Alignment sessions
- Finalize OKRs

Week 3-11: Execution
- Weekly progress updates
- Monthly reviews
- Course corrections
- Support identification

Week 12-13: Review & Retrospective
- Final scoring
- Lessons learned
- Process improvements
- Next quarter planning

Zorg voor transparantie, alignment en continue verbetering.` : `Implement OKRs for effective goal setting and execution.

Context: Set up OKRs for [ORGANIZATION/TEAM/PROJECT] for [TIME PERIOD].

OKR FRAMEWORK:

OBJECTIVES:
Qualitative, inspiring and achievable goals

Criteria for good Objectives:
- Inspiring and motivating
- Qualitatively formulated
- Time-bound (usually quarterly)
- Reminds of the "why"
- Actionable by the team

Example Objectives:
- "Dramatically improve customer loyalty"
- "Become market leader in [SEGMENT]"
- "Achieve operational excellence"
- "Build innovation culture"

KEY RESULTS:
Quantitative, measurable outcomes

Criteria for good Key Results:
- Specific and measurable
- Ambitious but achievable
- Time-bound
- Verified (objectively measurable)
- Under team control

Key Results Types:
- Baseline metrics: [IMPROVE CURRENT STATE]
- Milestone metrics: [NEW ACHIEVEMENTS]
- Positive metrics: [DESIRED INCREASE]
- Negative metrics: [UNWANTED DECREASE]

OKR STRUCTURE PER LEVEL:

COMPANY LEVEL:
Objective 1: [COMPANY OBJECTIVE]
- Key Result 1.1: [METRIC + TARGET]
- Key Result 1.2: [METRIC + TARGET]
- Key Result 1.3: [METRIC + TARGET]

TEAM LEVEL:
Objective 2: [TEAM OBJECTIVE - ALIGNED WITH COMPANY]
- Key Result 2.1: [TEAM METRIC + TARGET]
- Key Result 2.2: [TEAM METRIC + TARGET]
- Key Result 2.3: [TEAM METRIC + TARGET]

INDIVIDUAL LEVEL:
Objective 3: [PERSONAL OBJECTIVE - SUPPORTS TEAM]
- Key Result 3.1: [INDIVIDUAL METRIC + TARGET]
- Key Result 3.2: [INDIVIDUAL METRIC + TARGET]

OKR BEST PRACTICES:

PLANNING:
- Maximum 3-5 Objectives per level
- 2-4 Key Results per Objective
- 70% ambitious (stretch goals)
- Alignment between levels
- Transparent for entire organization

EXECUTION:
- Weekly check-ins
- Monthly reviews
- Quarterly retrospectives
- Continuous adjustment
- Focus on learning process

SCORING:
- 0.0-0.3: Failed to make progress
- 0.4-0.6: Made progress but fell short
- 0.7-1.0: Delivered

OKR TIMELINE:

Week 1-2: OKR Planning
- Draft objectives
- Define key results
- Alignment sessions
- Finalize OKRs

Week 3-11: Execution
- Weekly progress updates
- Monthly reviews
- Course corrections
- Support identification

Week 12-13: Review & Retrospective
- Final scoring
- Lessons learned
- Process improvements
- Next quarter planning

Ensure transparency, alignment and continuous improvement.`,
      category: "business",
      difficulty: "advanced",
      tags: isDutch ? ["okr", "doelen", "strategie", "prestatie"] : ["okr", "goals", "strategy", "performance"],
      likes: 198,
      rating: 4.8,
      downloads: 760
    },
    {
      id: 9,
      title: isDutch ? "Agile Retrospective Framework" : "Agile Retrospective Framework",
      description: isDutch ? "Structureer effectieve team retrospectives voor continue verbetering" : "Structure effective team retrospectives for continuous improvement",
      prompt: isDutch ? `Faciliteer een effectieve Agile retrospective voor team verbetering.

Context: Retrospective voor [TEAM] na [SPRINT/PROJECT/PERIODE].

RETROSPECTIVE STRUCTUUR:

1. SET THE STAGE (5-10 min):
Maak een veilige en open sfeer
- Welkom en doel uitleggen
- Retrospective prime directive benoemen
- Check-in ronde: [STEMMING PEILEN]
- Ground rules bevestigen
- Tijdsindeling delen

Prime Directive:
"Ongeacht wat we ontdekken, begrijpen en geloven we oprecht dat iedereen het beste deed wat hij kon, gegeven wat hij wist op dat moment, zijn vaardigheden en capaciteiten, de beschikbare resources en de situatie."

2. GATHER DATA (15-25 min):
Verzamel feiten en gevoelens
- Timeline creëren: [BELANGRIJKE EVENTS]
- Metrics reviewen: [VELOCITY, BURNDOWN, QUALITY]
- Team sentiment: [MAD/SAD/GLAD]
- 360-degree feedback: [ALLE PERSPECTIEVEN]

Data Gathering Technieken:
- Mad/Sad/Glad: [EMOTIES CATEGORISEREN]
- Sailboat: [WIND = HELPS, ANCHOR = HINDERS]
- Timeline: [CHRONOLOGISCHE EVENTS]
- Happiness metric: [TEAM SATISFACTION]

3. GENERATE INSIGHTS (20-30 min):
Analyseer patronen en root causes
- Groepeer gerelateerde items
- Identificeer trends en patronen
- Prioriteer belangrijkste issues
- Root cause analysis: [5 WHYS TECHNIQUE]

Insight Technieken:
- Affinity mapping: [GROEPEER THEMA'S]
- Dot voting: [PRIORITEER ISSUES]
- Fishbone diagram: [CAUSE ANALYSIS]
- Force field analysis: [DRIVING/RESTRAINING FORCES]

4. DECIDE WHAT TO DO (15-20 min):
Bepaal concrete acties
- Select top 2-3 improvement areas
- SMART action items formuleren
- Owner per actie toewijzen
- Timeline en criteria bepalen

Action Planning:
- What exactly will we do? [SPECIFIEKE ACTIE]
- Who will do it? [OWNER]
- When will it be done? [DEADLINE]
- How will we know it's done? [CRITERIA]
- What support is needed? [RESOURCES]

5. CLOSE THE RETROSPECTIVE (5-10 min):
Afsluiting en commitment
- Action items samenvatten
- Commitment van team krijgen
- Feedback op retrospective zelf
- Appreciatie uitspreken
- Next steps communiceren

RETROSPECTIVE VARIATIES:

STARFISH RETROSPECTIVE:
- Start doing: [NIEUWE ACTIVITEITEN]
- Stop doing: [STOP ACTIVITEITEN]
- Continue doing: [BEHOUDEN]
- Do more of: [UITBREIDEN]
- Do less of: [VERMINDEREN]

4 L'S RETROSPECTIVE:
- Liked: [WAT GING GOED]
- Learned: [WAT LEERDEN WE]
- Lacked: [WAT MISTEN WE]
- Longed for: [WAAR VERLANGDEN WE NAAR]

KEEP/PROBLEM/TRY:
- Keep: [BEHOUDEN EN VERSTERKEN]
- Problem: [PROBLEMEN EN PIJNPUNTEN]
- Try: [EXPERIMENTEN EN VERBETERINGEN]

FACILITATIE TIPS:
- Blijf neutraal als facilitator
- Moedig iedereen aan deel te nemen
- Timeboxing handhaven
- Focus op systeem, niet personen
- Documenteer alles visueel
- Follow-up op vorige acties

POST-RETROSPECTIVE:
- Action items tracken
- Voortgang monitoren
- Impediments escaleren
- Geleerde lessen delen
- Proces continue verbeteren

Zorg voor psychologische veiligheid en echte verbetering.` : `Facilitate an effective Agile retrospective for team improvement.

Context: Retrospective for [TEAM] after [SPRINT/PROJECT/PERIOD].

RETROSPECTIVE STRUCTURE:

1. SET THE STAGE (5-10 min):
Create a safe and open atmosphere
- Welcome and explain purpose
- State retrospective prime directive
- Check-in round: [GAUGE MOOD]
- Confirm ground rules
- Share timing

Prime Directive:
"Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand."

2. GATHER DATA (15-25 min):
Collect facts and feelings
- Create timeline: [IMPORTANT EVENTS]
- Review metrics: [VELOCITY, BURNDOWN, QUALITY]
- Team sentiment: [MAD/SAD/GLAD]
- 360-degree feedback: [ALL PERSPECTIVES]

Data Gathering Techniques:
- Mad/Sad/Glad: [CATEGORIZE EMOTIONS]
- Sailboat: [WIND = HELPS, ANCHOR = HINDERS]
- Timeline: [CHRONOLOGICAL EVENTS]
- Happiness metric: [TEAM SATISFACTION]

3. GENERATE INSIGHTS (20-30 min):
Analyze patterns and root causes
- Group related items
- Identify trends and patterns
- Prioritize most important issues
- Root cause analysis: [5 WHYS TECHNIQUE]

Insight Techniques:
- Affinity mapping: [GROUP THEMES]
- Dot voting: [PRIORITIZE ISSUES]
- Fishbone diagram: [CAUSE ANALYSIS]
- Force field analysis: [DRIVING/RESTRAINING FORCES]

4. DECIDE WHAT TO DO (15-20 min):
Determine concrete actions
- Select top 2-3 improvement areas
- Formulate SMART action items
- Assign owner per action
- Determine timeline and criteria

Action Planning:
- What exactly will we do? [SPECIFIC ACTION]
- Who will do it? [OWNER]
- When will it be done? [DEADLINE]
- How will we know it's done? [CRITERIA]
- What support is needed? [RESOURCES]

5. CLOSE THE RETROSPECTIVE (5-10 min):
Closure and commitment
- Summarize action items
- Get team commitment
- Feedback on retrospective itself
- Express appreciation
- Communicate next steps

RETROSPECTIVE VARIATIONS:

STARFISH RETROSPECTIVE:
- Start doing: [NEW ACTIVITIES]
- Stop doing: [STOP ACTIVITIES]
- Continue doing: [MAINTAIN]
- Do more of: [EXPAND]
- Do less of: [REDUCE]

4 L'S RETROSPECTIVE:
- Liked: [WHAT WENT WELL]
- Learned: [WHAT WE LEARNED]
- Lacked: [WHAT WE MISSED]
- Longed for: [WHAT WE YEARNED FOR]

KEEP/PROBLEM/TRY:
- Keep: [MAINTAIN AND STRENGTHEN]
- Problem: [PROBLEMS AND PAIN POINTS]
- Try: [EXPERIMENTS AND IMPROVEMENTS]

FACILITATION TIPS:
- Stay neutral as facilitator
- Encourage everyone to participate
- Maintain timeboxing
- Focus on system, not people
- Document everything visually
- Follow up on previous actions

POST-RETROSPECTIVE:
- Track action items
- Monitor progress
- Escalate impediments
- Share lessons learned
- Continuously improve process

Ensure psychological safety and real improvement.`,
      category: "development",
      difficulty: "intermediate",
      tags: isDutch ? ["agile", "retrospective", "teamverbetering", "facilitatie"] : ["agile", "retrospective", "team improvement", "facilitation"],
      likes: 267,
      rating: 4.8,
      downloads: 940
    },
    {
      id: 10,
      title: isDutch ? "RICE Prioritering Framework" : "RICE Prioritization Framework",
      description: isDutch ? "Prioriteer features en projecten met RICE scoring" : "Prioritize features and projects using RICE scoring",
      prompt: isDutch ? `Gebruik RICE voor data-gedreven prioritering van features en projecten.

Context: Prioriteer [FEATURES/PROJECTEN/INITIATIEVEN] voor [TEAM/PRODUCT].

RICE FRAMEWORK:

R - REACH (BEREIK):
Hoeveel mensen worden beïnvloed?
- Aantal gebruikers per tijdsperiode: [METRIC]
- Percentage van gebruikersbasis: [%]
- Marktgrootte impact: [SEGMENTS]
- Geographic reach: [MARKETS]

Reach Metrics:
- DAU/MAU affected: [DAILY/MONTHLY ACTIVE USERS]
- Customer segments: [ENTERPRISE/SMB/CONSUMER]
- Revenue impact: [CUSTOMER VALUE TIERS]
- Geographic markets: [REGIONS/COUNTRIES]

I - IMPACT (IMPACT):
Hoeveel verbetert het de ervaring?
- Minimal impact: 0.25
- Low impact: 0.5
- Medium impact: 1.0
- High impact: 2.0
- Massive impact: 3.0

Impact Dimensies:
- User experience: [UX IMPROVEMENT LEVEL]
- Business metrics: [REVENUE/CONVERSION IMPACT]
- Strategic value: [COMPETITIVE ADVANTAGE]
- Risk mitigation: [PROBLEM SEVERITY]

C - CONFIDENCE (VERTROUWEN):
Hoe zeker ben je van Reach en Impact?
- High confidence: 100% (strong evidence)
- Medium confidence: 80% (some evidence)
- Low confidence: 50% (weak evidence)

Confidence Basis:
- Data quality: [RESEARCH/ANALYTICS]
- User feedback: [SURVEYS/INTERVIEWS]
- Market research: [COMPETITIVE ANALYSIS]
- Technical feasibility: [PROOF OF CONCEPT]
- Expert opinions: [STAKEHOLDER INPUT]

E - EFFORT (INSPANNING):
Hoeveel werk is het?
- Person-months voor implementation
- Include: Design, Development, Testing, Launch
- Consider: Dependencies, Complexity, Risk

Effort Estimation:
- Development time: [PERSON-MONTHS]
- Design requirements: [UX/UI EFFORT]
- Testing effort: [QA/VALIDATION]
- Infrastructure needs: [DEVOPS/SCALING]
- Integration complexity: [API/SYSTEM DEPENDENCIES]

RICE SCORE CALCULATION:
RICE Score = (Reach × Impact × Confidence) / Effort

PRIORITERING PROCES:

1. LIJST MAKEN:
Feature/Project: [NAAM]
Description: [BESCHRIJVING]
Business goal: [DOELSTELLING]

2. RICE SCORING:
Voor elk item:
- Reach: [NUMBER PER TIME PERIOD]
- Impact: [0.25, 0.5, 1.0, 2.0, 3.0]
- Confidence: [%]
- Effort: [PERSON-MONTHS]
- RICE Score: [BEREKENING]

3. RANKING:
Sort by RICE score (highest first)
Review voor sanity check
Adjust voor strategische overwegingen

RICE SCORECARD TEMPLATE:

| Item | Reach | Impact | Confidence | Effort | RICE Score |
|------|-------|--------|------------|--------|------------|
| Feature A | 1000/mo | 2.0 | 80% | 2 | 800 |
| Feature B | 500/mo | 3.0 | 60% | 1 | 900 |
| Feature C | 2000/mo | 1.0 | 90% | 3 | 600 |

RICE BEST PRACTICES:

ESTIMATION TIPS:
- Use relative sizing voor consistency
- Include all stakeholders in scoring
- Document assumptions
- Regular re-evaluation
- Consider opportunity cost

COMMON PITFALLS:
- Effort underestimation
- Impact wishful thinking
- Confidence overestimation
- Missing dependencies
- Ignoring maintenance costs

COMPLEMENTARY FACTORS:
- Strategic alignment: [FIT WITH VISION]
- Technical debt: [ARCHITECTURAL IMPACT]
- Learning opportunities: [KNOWLEDGE GAIN]
- Risk assessment: [FAILURE PROBABILITY]
- Competitive pressure: [MARKET TIMING]

Documenteer alle aannames en review regelmatig.` : `Use RICE for data-driven prioritization of features and projects.

Context: Prioritize [FEATURES/PROJECTS/INITIATIVES] for [TEAM/PRODUCT].

RICE FRAMEWORK:

R - REACH:
How many people are affected?
- Number of users per time period: [METRIC]
- Percentage of user base: [%]
- Market size impact: [SEGMENTS]
- Geographic reach: [MARKETS]

Reach Metrics:
- DAU/MAU affected: [DAILY/MONTHLY ACTIVE USERS]
- Customer segments: [ENTERPRISE/SMB/CONSUMER]
- Revenue impact: [CUSTOMER VALUE TIERS]
- Geographic markets: [REGIONS/COUNTRIES]

I - IMPACT:
How much does it improve the experience?
- Minimal impact: 0.25
- Low impact: 0.5
- Medium impact: 1.0
- High impact: 2.0
- Massive impact: 3.0

Impact Dimensions:
- User experience: [UX IMPROVEMENT LEVEL]
- Business metrics: [REVENUE/CONVERSION IMPACT]
- Strategic value: [COMPETITIVE ADVANTAGE]
- Risk mitigation: [PROBLEM SEVERITY]

C - CONFIDENCE:
How confident are you in Reach and Impact?
- High confidence: 100% (strong evidence)
- Medium confidence: 80% (some evidence)
- Low confidence: 50% (weak evidence)

Confidence Basis:
- Data quality: [RESEARCH/ANALYTICS]
- User feedback: [SURVEYS/INTERVIEWS]
- Market research: [COMPETITIVE ANALYSIS]
- Technical feasibility: [PROOF OF CONCEPT]
- Expert opinions: [STAKEHOLDER INPUT]

E - EFFORT:
How much work is it?
- Person-months for implementation
- Include: Design, Development, Testing, Launch
- Consider: Dependencies, Complexity, Risk

Effort Estimation:
- Development time: [PERSON-MONTHS]
- Design requirements: [UX/UI EFFORT]
- Testing effort: [QA/VALIDATION]
- Infrastructure needs: [DEVOPS/SCALING]
- Integration complexity: [API/SYSTEM DEPENDENCIES]

RICE SCORE CALCULATION:
RICE Score = (Reach × Impact × Confidence) / Effort

PRIORITIZATION PROCESS:

1. CREATE LIST:
Feature/Project: [NAME]
Description: [DESCRIPTION]
Business goal: [OBJECTIVE]

2. RICE SCORING:
For each item:
- Reach: [NUMBER PER TIME PERIOD]
- Impact: [0.25, 0.5, 1.0, 2.0, 3.0]
- Confidence: [%]
- Effort: [PERSON-MONTHS]
- RICE Score: [CALCULATION]

3. RANKING:
Sort by RICE score (highest first)
Review for sanity check
Adjust for strategic considerations

RICE SCORECARD TEMPLATE:

| Item | Reach | Impact | Confidence | Effort | RICE Score |
|------|-------|--------|------------|--------|------------|
| Feature A | 1000/mo | 2.0 | 80% | 2 | 800 |
| Feature B | 500/mo | 3.0 | 60% | 1 | 900 |
| Feature C | 2000/mo | 1.0 | 90% | 3 | 600 |

RICE BEST PRACTICES:

ESTIMATION TIPS:
- Use relative sizing for consistency
- Include all stakeholders in scoring
- Document assumptions
- Regular re-evaluation
- Consider opportunity cost

COMMON PITFALLS:
- Effort underestimation
- Impact wishful thinking
- Confidence overestimation
- Missing dependencies
- Ignoring maintenance costs

COMPLEMENTARY FACTORS:
- Strategic alignment: [FIT WITH VISION]
- Technical debt: [ARCHITECTURAL IMPACT]
- Learning opportunities: [KNOWLEDGE GAIN]
- Risk assessment: [FAILURE PROBABILITY]
- Competitive pressure: [MARKET TIMING]

Document all assumptions and review regularly.`,
      category: "business",
      difficulty: "advanced",
      tags: isDutch ? ["rice", "prioritering", "product management", "besluitvorming"] : ["rice", "prioritization", "product management", "decision making"],
      likes: 189,
      rating: 4.7,
      downloads: 650
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
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
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
                    <SelectTrigger>
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
                        size="sm"
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
