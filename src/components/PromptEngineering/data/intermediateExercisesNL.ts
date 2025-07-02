
import { Exercise } from '../types/Exercise';
import { additionalIntermediateExercisesNL } from './additionalExercisesNL';

export const intermediateExercisesNL: Exercise[] = [
  {
    id: 'multi-step-reasoning',
    title: 'Multi-Stap Redeneer Ketens',
    description: 'Bouw complexe redeneerketeens die AI door geavanceerde probleemoplossing processen leiden',
    difficulty: 'intermediate',
    category: 'Geavanceerde Technieken',
    type: 'analysis',
    estimatedTime: '30 min',
    prompt: 'Maak een prompt die AI door complexe financiële analyse leidt met meerdere redeneer stappen.',
    solution: `<rol>Je bent een senior financieel analist</rol> met 15+ jaar ervaring in bedrijfsfinanciering en investeringsanalyse.

<redeneer-keten>
Volg deze exacte volgorde voor uitgebreide financiële analyse:

**Stap 1: Data Validatie**
- Verifieer alle financiële cijfers op consistentie
- Controleer berekening nauwkeurigheid over overzichten
- Identificeer ongebruikelijke of ontbrekende datapunten
- Markeer potentiële rode vlaggen of anomalieën

**Stap 2: Trend Analyse**
- Bereken 3-jaar groeipercentages voor belangrijke metrics
- Identificeer seizoenspatronen of cyclische trends
- Vergelijk prestaties met industrie benchmarks
- Markeer significante veranderingen of keerpunten

**Stap 3: Ratio Analyse**
- Liquiditeit ratio's (huidig, snel, cash)
- Winstgevendheid ratio's (bruto, operationeel, netto marges)
- Efficiëntie ratio's (voorraad omloop, vorderingen)
- Hefboom ratio's (debt-to-equity, rente dekking)

**Stap 4: Concurrentie Positionering**
- Marktaandeel analyse en trends
- Concurrentie voordelen en vestinggrachten
- Bedreiging beoordeling van nieuwe toetreders
- Prijsmacht en klantloyaliteit

**Stap 5: Risico Beoordeling**
- Operationele risico's en afhankelijkheden
- Financiële risico's en schuld verplichtingen
- Markt risico's en externe factoren
- Management en governance overwegingen

**Stap 6: Waardering Framework**
- Bepaal juiste waardering methoden
- Bereken intrinsieke waarde met meerdere benaderingen
- Beoordeel veiligheidsmarge voor investering
- Geef doel prijsrange met betrouwbaarheidsintervallen
</redeneer-keten>

<uitvoer-structuur>
Voor elke stap, geef:
1. **Belangrijkste Bevindingen**: 3-4 meest belangrijke inzichten
2. **Ondersteunende Data**: Specifieke nummers en berekeningen
3. **Risico Factoren**: Potentiële zorgen of beperkingen
4. **Impact op Waardering**: Hoe dit de investering these beïnvloedt
</uitvoer-structuur>

<kwaliteit-controles>
Voor het afronden van analyse:
- Volgen conclusies logisch uit data?
- Zijn aannames duidelijk vermeld en redelijk?
- Zijn alternatieve scenario's overwogen?
- Is de investeringsaanbeveling goed onderbouwd?
</kwaliteit-controles>

Analyseer dit bedrijf: [FINANCIËLE_DATA]`,
    evaluationCriteria: [
      'Stelt duidelijke sequentiële redeneer stappen vast',
      'Bevat validatie en kwaliteitscontrole processen',
      'Geeft specifieke uitvoer structuur voor elke stap',
      'Incorporeert meerdere analytische frameworks',
      'Zorgt voor logische flow tussen analyse componenten'
    ],
    hints: [
      'Verdeel complexe analyse in discrete, logische stappen',
      'Voeg validatie stappen toe om vroeg fouten te vangen',
      'Specificeer precies wat in elke stap moet worden opgenomen',
      'Bouw kwaliteitscontroles in om redeneer consistentie te waarborgen'
    ],
    tips: [
      'Sequentiële redenering voorkomt dat AI naar conclusies springt',
      'Expliciete validatie stappen verbeteren nauwkeurigheid aanzienlijk',
      'Gestructureerde uitvoer maken complexe analyse meer verteerbaar',
      'Kwaliteitscontroles helpen analytische strengheid te behouden'
    ],
    resources: [
      {
        title: 'Financiële Analyse Fundamenten',
        type: 'article',
        url: 'https://example.com/financial-analysis',
        description: 'Uitgebreide gids voor professionele financiële analyse'
      },
      {
        title: 'Redeneer Keten Templates',
        type: 'tool',
        url: 'https://example.com/reasoning-templates',
        description: 'Kant-en-klare templates voor complexe redeneer taken'
      }
    ],
    examples: {
      good: `<redenering>Stap 1: Valideer data → Stap 2: Trend analyse → Stap 3: Ratio analyse</redenering>
<kwaliteit-controle>Volgt elke stap logisch uit de vorige?</kwaliteit-controle>`,
      bad: `Analyseer de financiële prestaties van dit bedrijf.`,
      explanation: 'Het goede voorbeeld geeft duidelijke redeneer stappen en validatie, terwijl het slechte voorbeeld structuur en begeleiding mist.'
    }
  },
  {
    id: 'pe-nl-101',
    title: 'Multi-stap Redenering',
    description: 'Leer AI te vragen om complexe problemen stap voor stap op te lossen.',
    difficulty: 'intermediate',
    category: 'Advanced Reasoning',
    estimatedTime: '15 minuten',
    prompt: 'Vraag AI om een complex business probleem op te lossen met duidelijke redenering.',
    solution: `Je bent een senior business consultant. Een restaurant eigenaar komt naar je toe met dit probleem:

"Mijn restaurant draait al 3 jaar, maar de laatste 6 maanden dalen de winsten terwijl de kosten stijgen. De huur is 30% van mijn omzet, personeel 35%, en inkoop 25%. Ik heb 40 zitplaatsen, gemiddeld 60% bezetting bij lunch en 80% bij diner. Wat moet ik doen?"

**Analyseer dit stap-voor-stap:**

1. **Financiële analyse**: Bereken de huidige winstmarge en identificeer de hoofdproblemen
2. **Koststructuur evaluatie**: Beoordeel of de kostenverdeling optimaal is  
3. **Operationele efficiëntie**: Analyseer bezettingsgraden en omzet per zitplaats
4. **Actieplan**: Geef 3 concrete, prioriteit-gerangschikte aanbevelingen met verwachte impact

Gebruik cijfers en redenering bij elke stap. Leg uit waarom elke aanbeveling logisch volgt uit je analyse.`,
    evaluationCriteria: [
      'Stap-voor-stap analyse structuur',
      'Concrete cijfers en data',
      'Logische redenering per stap',
      'Geprioriteerde actionable aanbevelingen'
    ],
    hints: [
      'Vraag om stap-voor-stap analyse',
      'Geef concrete cijfers om mee te werken',
      'Vraag om redenering achter elke conclusie',
      'Vraag om geprioriteerde, concrete aanbevelingen'
    ],
    tips: [
      'Complexe problemen vereisen gestructureerde benadering',
      'Concrete data maakt analyse mogelijk',
      'Prioritering helpt bij implementatie'
    ],
    resources: [
      {
        title: 'Business Problem Solving',
        type: 'article',
        url: 'https://example.com/business-problem-solving',
        description: 'Methodieken voor effectieve business probleemoplossing'
      },
      {
        title: 'Financial Analysis Techniques',
        type: 'article',
        url: 'https://example.com/financial-analysis-techniques',
        description: 'Technieken voor financiële analyse en evaluatie'
      }
    ]
  },
  {
    id: 'pe-nl-102',
    title: 'Perspectief Vergelijking',
    description: 'Leer AI te vragen om verschillende standpunten te analyseren en vergelijken.',
    difficulty: 'intermediate',
    category: 'Critical Analysis', 
    estimatedTime: '18 minuten',
    prompt: 'Vraag AI om een controversieel onderwerp vanuit meerdere perspectieven te bekijken.',
    solution: `Analyseer het onderwerp "Thuiswerken vs. Kantoorwerk" vanuit verschillende stakeholder perspectieven.

**Geef voor elk perspectief:**
- De belangrijkste argumenten en zorgen
- Ondersteunende data of trends
- Praktische implicaties
- Mogelijke compromissen

**Perspectieven:**

1. **Werknemer perspectief:**
   - Voor- en nadelen voor work-life balance
   - Impact op carrièreontwikkeling
   - Financiële overwegingen (reiskosten vs. thuiswerkkosten)

2. **Management perspectief:**
   - Productiviteit en prestatie monitoring
   - Team cohesie en bedrijfscultuur
   - Operationele kosten en efficiëntie

3. **HR perspectief:**
   - Recruitment en talent behoud
   - Training en ontwikkeling uitdagingen
   - Beleid ontwikkeling en implementatie

**Sluit af met:**
Een uitgebalanceerde synthese die een hybride model voorstelt met concrete implementatie richtlijnen die alle perspectieven respecteert.`,
    evaluationCriteria: [
      'Meerdere duidelijk gedefinieerde perspectieven',
      'Onderbouwing met data/trends',
      'Praktische implicaties per perspectief',
      'Uitgebalanceerde synthese/conclusie'
    ],
    hints: [
      'Vraag om meerdere, specifieke perspectieven',
      'Vraag om onderbouwing met data/trends',
      'Vraag om praktische implicaties per perspectief',
      'Vraag om een uitgebalanceerde synthese'
    ],
    tips: [
      'Multiple perspectieven geven genuanceerde analyses',
      'Data onderbouwing maakt argumenten sterker', 
      'Synthese toont begrip van complexiteit'
    ],
    resources: [
      {
        title: 'Multi-perspective Analysis',
        type: 'article',
        url: 'https://example.com/multi-perspective-analysis',
        description: 'Technieken voor multi-perspectief analyse'
      },
      {
        title: 'Critical Thinking Frameworks',
        type: 'article',
        url: 'https://example.com/critical-thinking',
        description: 'Frameworks voor kritisch denken en analyse'
      }
    ]
  },
  {
    id: 'pe-nl-103',
    title: 'Scenario Planning',
    description: 'Leer AI te gebruiken voor het ontwikkelen van toekomstscenario\'s en strategieën.',
    difficulty: 'intermediate',
    category: 'Strategic Planning',
    estimatedTime: '20 minuten',
    prompt: 'Vraag AI om verschillende toekomstscenario\'s te ontwikkelen voor een business situatie.',
    solution: `Je bent een strategisch planningsexpert. Ontwikkel 3 scenario's voor de toekomst van e-commerce in de komende 5 jaar, en hoe een mid-size online retailer zich zou moeten voorbereiden.

**Voor elk scenario, include:**

**Scenario 1: "Hyper-Personalisatie" (Kans: 40%)**
- **Trends**: AI-gedreven personalisatie, voice commerce, predictive shopping
- **Implicaties**: Klanten verwachten ultra-persoonlijke ervaringen
- **Strategie**: Investeren in AI/ML capabilities, data analytics team, personalisatie platforms
- **Risico's**: Privacy regelgeving, hoge tech investeringen
- **Vroege signalen**: Groei van AI-shopping assistants, voice commerce adoptie

**Scenario 2: "Sustainability First" (Kans: 35%)**  
- **Trends**: Milieubewuste consumenten, circulaire economie, lokale sourcing
- **Implicaties**: Sustainability wordt primary purchase driver
- **Strategie**: Green supply chain, sustainable packaging, transparantie initiatives
- **Risico's**: Hogere kosten, supply chain complexity
- **Vroege signalen**: Gen Z koopgedrag, ESG investering groei

**Scenario 3: "Platform Consolidatie" (Kans: 25%)**
- **Trends**: Amazon/Google dominantie, marketplace concentratie
- **Implicaties**: Moeilijker om direct-to-consumer te blijven
- **Strategie**: Niche specialisatie, unique value proposition, community building  
- **Risico's**: Afhankelijkheid van platforms, margereductie
- **Vroege signalen**: Platform fee increases, marketplace policy changes

**Actieplan**: Ontwikkel een adaptieve strategie die elementen van alle scenario's integreert, met mijlpalen om strategy aan te passen based on emerging trends.`,
    evaluationCriteria: [
      'Meerdere concrete scenario\'s met waarschijnlijkheden',
      'Trends, implicaties en strategieën per scenario',
      'Risico analyse en vroege signalen',
      'Adaptieve overall strategie'
    ],
    hints: [
      'Vraag om meerdere concrete scenario\'s met waarschijnlijkheden',
      'Include trends, implicaties en strategieën per scenario',
      'Vraag om risico\'s en vroege signalen',
      'Vraag om een adaptieve overall strategie'
    ],
    tips: [
      'Scenario planning helpt bij strategische flexibiliteit',
      'Waarschijnlijkheden maken scenario\'s praktischer',
      'Vroege signalen helpen bij tijdige aanpassingen'
    ],
    resources: [
      {
        title: 'Scenario Planning Methodology',
        type: 'article',
        url: 'https://example.com/scenario-planning',
        description: 'Methoden voor effectieve scenario planning'
      },
      {
        title: 'Strategic Foresight Techniques',
        type: 'article',
        url: 'https://example.com/strategic-foresight',
        description: 'Technieken voor strategische toekomstverkenning'
      }
    ]
  },
  ...additionalIntermediateExercisesNL
];
