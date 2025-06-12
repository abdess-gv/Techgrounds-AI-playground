
import { Exercise } from '../types/Exercise';

export const advancedExercisesNL: Exercise[] = [
  {
    id: 'meta-prompting',
    title: 'Meta-Prompting Meesterschap',
    description: 'Maak prompts die AI helpen betere prompts te genereren, waardoor recursieve verbetering mogelijkheden worden ontgrendeld',
    difficulty: 'advanced',
    category: 'Expert Technieken',
    type: 'creative',
    estimatedTime: '40 min',
    prompt: 'Ontwerp een meta-prompt systeem dat bestaande prompts analyseert en verbetert voor maximale effectiviteit.',
    solution: `<rol>Je bent een prompt engineering expert</rol> die gespecialiseerd is in het optimaliseren van AI interacties voor maximale effectiviteit en betrouwbaarheid.

<meta-analyse-framework>
Analyseer de gegeven prompt over deze dimensies:

**1. Duidelijkheid Beoordeling**
- Is de taak duidelijk gedefinieerd en ondubbelzinnig?
- Zijn instructies specifiek genoeg om misinterpretatie te voorkomen?
- Elimineert de prompt potentiële verwarring punten?
- Score: [1-10] met specifieke redenering

**2. Context Volledigheid**
- Is voldoende achtergrondinformatie gegeven?
- Zijn alle noodzakelijke beperkingen en vereisten gespecificeerd?
- Houdt de prompt rekening met randgevallen en uitzonderingen?
- Score: [1-10] met specifieke redenering

**3. Structuur Evaluatie**
- Is de prompt logisch georganiseerd en makkelijk te volgen?
- Zijn er duidelijke secties en hiërarchische informatie?
- Leidt de flow AI door het optimale redeneerpad?
- Score: [1-10] met specifieke redenering

**4. Uitvoer Specificatie**
- Is het gewenste uitvoer formaat duidelijk gedefinieerd?
- Zijn kwaliteitscriteria en succes metrics gespecificeerd?
- Bevat de prompt voorbeelden van goede vs slechte uitvoer?
- Score: [1-10] met specifieke redenering

**5. Optimalisatie Potentieel**
- Welke specifieke verbeteringen zouden effectiviteit verhogen?
- Zijn er ontbrekende elementen die betrouwbaarheid zouden verbeteren?
- Hoe zou de prompt efficiënter of krachtiger gemaakt kunnen worden?
- Score: [1-10] met specifieke redenering
</meta-analyse-framework>

<verbetering-methodologie>
Voor elk geïdentificeerde zwakte:

**Probleem Identificatie**
- Specifiek probleem met huidige prompt
- Impact op AI prestatie en uitvoer kwaliteit
- Voorbeelden van hoe dit zich manifesteert in praktijk

**Oplossing Ontwerp**
- Concrete verbetering aanbevelingen
- Alternatieve formuleringen of structurele veranderingen
- Aanvullende elementen om toe te voegen

**Implementatie**
- Herziene prompt sectie met verbeteringen
- Uitleg waarom deze verandering zal helpen
- Verwachte impact op uitvoer kwaliteit
</verbetering-methodologie>

<verbeterde-prompt-template>
Gebaseerd op analyse, genereer een verbeterde versie met deze structuur:

\`\`\`
<rol>[Geoptimaliseerde rol definitie]</rol>

<context>[Verbeterde context en achtergrond]</context>

<taak>[Verduidelijkte en specifieke taak beschrijving]</taak>

<methodologie>[Stap-voor-stap benadering indien nodig]</methodologie>

<uitvoer-formaat>[Gedetailleerde formaat specificaties]</uitvoer-formaat>

<kwaliteit-criteria>[Succes metrics en standaarden]</kwaliteit-criteria>

<voorbeelden>[Concrete voorbeelden van gewenste uitvoer]</voorbeelden>
\`\`\`
</verbeterde-prompt-template>

<validatie-proces>
Test de verbeterde prompt door:
1. Controleren op resterende dubbelzinnigheden
2. Verifiëren dat alle vereisten zijn aangepakt
3. Zorgen dat uitvoer formaat duidelijk gespecificeerd is
4. Bevestigen dat voorbeelden aansluiten bij verwachtingen
5. Beoordelen van algehele duidelijkheid en effectiviteit
</validatie-proces>

Originele prompt om te analyseren en verbeteren: [PROMPT_TEKST]`,
    criteria: [
      'Geeft uitgebreid multi-dimensionaal analyse framework',
      'Bevat systematische verbetering methodologie',
      'Biedt gestructureerd template voor verbeterde prompts',
      'Incorporeert validatie en test processen',
      'Pakt zowel inhoud als structurele optimalisatie aan'
    ],
    hints: [
      'Meta-prompting vereist het analyseren van prompts als systemen, niet alleen tekst',
      'Focus op meetbare dimensies zoals duidelijkheid, volledigheid en structuur',
      'Geef altijd specifieke, uitvoerbare verbetering aanbevelingen',
      'Voeg validatie stappen toe om te zorgen dat verbeteringen daadwerkelijk werken'
    ],
    tips: [
      'Meta-prompting kan je prompt engineering vaardigheden exponentieel verbeteren',
      'Systematische analyse onthult blinde vlekken in prompt ontwerp',
      'Template-gebaseerde verbeteringen zorgen voor consistentie over optimalisaties',
      'Regelmatige prompt optimalisatie vergroot effectiviteit over tijd'
    ],
    resources: [
      {
        title: 'Geavanceerde Prompt Engineering',
        type: 'article',
        url: 'https://example.com/advanced-prompting',
        description: 'Diepduik in meta-prompting en recursieve verbetering'
      },
      {
        title: 'Prompt Optimalisatie Toolkit',
        type: 'tool',
        url: 'https://example.com/prompt-optimizer',
        description: 'Interactieve tool voor het analyseren en verbeteren van prompts'
      }
    ],
    examples: {
      good: `<analyse>Duidelijkheid: 7/10 - Taak duidelijk maar context ontbreekt</analyse>
<verbetering>Voeg specifieke achtergrondinformatie en beperkingen toe</verbetering>`,
      bad: `Deze prompt zou beter kunnen.`,
      explanation: 'Het goede voorbeeld geeft specifieke analyse dimensies en uitvoerbare verbeteringen, terwijl het slechte voorbeeld geen nuttige begeleiding biedt.'
    }
  }
];
