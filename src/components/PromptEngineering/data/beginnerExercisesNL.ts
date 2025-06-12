
import { Exercise } from '../types/Exercise';

export const beginnerExercisesNL: Exercise[] = [
  {
    id: 'basic-prompting',
    title: 'Basis Prompt Structuur',
    description: 'Leer de fundamentele componenten van effectieve prompts',
    difficulty: 'beginner',
    category: 'Fundamenten',
    type: 'hands-on',
    estimatedTime: '15 min',
    prompt: 'Maak een duidelijke, specifieke prompt voor een creatieve schrijftaak.',
    solution: `**Taak**: Schrijf een prompt voor een AI om een kort verhaal te maken over een mysterieus bos.

**Goede Prompt Structuur**:
"Schrijf een kort verhaal van 300 woorden over een wandelaar die iets onverwachts ontdekt in een oud bos. Voeg toe:
- Een specifieke ontdekking (niet alleen 'iets magisch')
- De emotionele reactie van de wandelaar
- Zintuiglijke details over het bos
- Een duidelijk begin, midden en einde
Stijl: Mysterieus maar geen horror
Toon: Verwondering en nieuwsgierigheid"

**Waarom dit werkt**:
- Specifieke lengte (300 woorden)
- Duidelijk onderwerp (wandelaar, bos, ontdekking)
- Gedetailleerde vereisten (emotionele reactie, zintuiglijke details)
- Structuur begeleiding (begin, midden, einde)
- Stijl en toon specificaties`,
    criteria: [
      'Prompt is specifiek en duidelijk',
      'Bevat lengte/bereik parameters',
      'Definieert stijl en toon',
      'Geeft structurele begeleiding',
      'Vermijdt dubbelzinnige taal'
    ],
    hints: [
      'Wees specifiek over wat je wilt',
      'Voeg lengte of bereik vereisten toe',
      'Specificeer de stijl en toon',
      'Verdeel complexe verzoeken in onderdelen'
    ],
    tips: [
      'Goede prompts elimineren giswerk',
      'Specifieke beperkingen leiden vaak tot betere resultaten',
      'Voeg altijd context toe wanneer nodig',
      'Test je prompts en verfijn ze'
    ],
    resources: [
      {
        title: 'Prompt Engineering Gids',
        type: 'article',
        url: 'https://example.com/prompt-guide',
        description: 'Uitgebreide gids voor het schrijven van effectieve prompts'
      }
    ],
    examples: {
      good: 'Schrijf een productbeschrijving van 200 woorden voor milieuvriendelijke yogamatten gericht op drukbezette professionals.',
      bad: 'Schrijf iets over yogamatten.',
      explanation: 'Het goede voorbeeld is specifiek over lengte, product, doelgroep en context.'
    }
  },
  {
    id: 'role-definition',
    title: 'Rol Definitie',
    description: 'Beheers de kunst van het definiëren van AI-rollen voor betere antwoorden',
    difficulty: 'beginner',
    category: 'Fundamenten',
    type: 'hands-on',
    estimatedTime: '20 min',
    prompt: 'Maak een rol-gebaseerde prompt voor het krijgen van marketing advies.',
    solution: `**Rol-Gebaseerde Prompt**:
"Je bent een senior marketing strateeg met 10+ jaar ervaring in digitale marketing voor kleine bedrijven. Je specialiseert je in social media marketing en hebt meer dan 100 bedrijven geholpen hun online aanwezigheid te laten groeien.

Jouw taak: Geef een uitgebreide social media strategie voor een lokale bakkerij die meer voetverkeer en online bestellingen wil.

Voeg toe:
- Platform aanbevelingen met redenen
- Content strategie voor elk platform
- Suggesties voor posting frequentie
- Budget overwegingen voor een klein bedrijf
- Meetbare doelen en KPI's

Gebruik je ervaring om praktisch, uitvoerbaar advies te geven dat een drukbezette bakker realistisch kan implementeren."

**Waarom dit werkt**:
- Specifiek expertise niveau (10+ jaar)
- Relevante specialisatie (kleine bedrijven, social media)
- Geloofwaardigheid indicatoren (100+ bedrijven geholpen)
- Duidelijke taak definitie  
- Gedetailleerde leverbaar vereisten
- Context over de klant (lokale bakkerij)`,
    criteria: [
      'Definieert specifiek expertise niveau',
      'Bevat relevante ervaring details',
      'Stelt duidelijke verwachtingen voor het antwoord',
      'Geeft context over de situatie',
      'Specificeert gewenst uitvoer formaat'
    ],
    hints: [
      'Wees specifiek over de expertise van de rol',
      'Voeg jaren ervaring of kwalificaties toe',
      'Vermeld relevante specialisaties',
      'Stel context voor het benodigde advies'
    ],
    tips: [
      'Rollen helpen AI de juiste toon en expertise aan te nemen',
      'Specifieke rollen leiden tot meer gericht advies',
      'Voeg context toe over wie de hulp nodig heeft',
      'Definieer het bereik van de rol duidelijk'
    ],
    resources: [
      {
        title: 'Rol-Gebaseerde Prompting',
        type: 'article',
        url: 'https://example.com/role-prompting',
        description: 'Hoe effectieve rol definities voor AI te maken'
      }
    ],
    examples: {
      good: 'Je bent een gecertificeerde voedingsdeskundige met expertise in maaltijdplanning voor drukke gezinnen.',
      bad: 'Je bent een expert.',
      explanation: 'Het goede voorbeeld specificeert het type expert, kwalificaties en specialisatiegebied.'
    }
  }
];
