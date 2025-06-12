
import { Exercise } from '../types/Exercise';

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
    criteria: [
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
  }
];
