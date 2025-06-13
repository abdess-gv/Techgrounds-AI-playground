import { Exercise } from '../types/Exercise';
import { additionalBeginnerExercisesNL } from './additionalExercisesNL';

export const beginnerExercisesNL: Exercise[] = [
  {
    id: 'pe-nl-001',
    title: 'Eenvoudige Vraag Stellen',
    description: 'Leer de basis van het stellen van duidelijke en specifieke vragen aan AI.',
    difficulty: 'beginner',
    category: 'Basis Prompting',
    estimatedTime: '5 minuten',
    prompt: 'Stel een vraag aan AI om een eenvoudige uitleg te krijgen over fotosynthese voor een 10-jarig kind.',
    solution: `Kun je fotosynthese uitleggen voor een 10-jarig kind? 

Gebruik eenvoudige woorden en geef een praktisch voorbeeld dat kinderen kunnen begrijpen. Houd de uitleg kort (ongeveer 100 woorden) en maak het interessant.`,
    hints: [
      'Specificeer de doelgroep (10-jarig kind)',
      'Vraag om eenvoudige taal',
      'Geef een gewenste lengte aan',
      'Vraag om praktische voorbeelden'
    ],
    tips: [
      'Specifieke doelgroepen leiden tot betere antwoorden',
      'Lengte specificaties helpen bij gestructureerde antwoorden',
      'Voorbeelden maken complexe onderwerpen toegankelijker'
    ],
    evaluationCriteria: [
      'Duidelijke doelgroep specificatie',
      'Verzoek om eenvoudige taal',
      'Lengte indicator',
      'Vraag om voorbeelden of praktische toepassingen'
    ],
    resources: [
      'Basics of AI Communication',
      'Age-appropriate Content Creation'
    ]
  },
  {
    id: 'pe-nl-002',
    title: 'Context Toevoegen',
    description: 'Leer hoe je context geeft aan AI voor betere, meer relevante antwoorden.',
    difficulty: 'beginner',
    category: 'Context Setting',
    estimatedTime: '8 minuten',
    prompt: 'Vraag AI om advies voor een presentatie, waarbij je relevante context geeft over je situatie.',
    solution: `Ik ben een marketing manager bij een technologie startup met 50 medewerkers. Volgende week moet ik een 15-minuten presentatie geven aan onze investeerders over onze groei in het laatste kwartaal.

Kun je me helpen met:
1. Een duidelijke structuur voor de presentatie
2. Welke key metrics ik moet highlighten
3. Hoe ik de presentatie kan afsluiten met een sterke call-to-action

De investeerders zijn vooral geïnteresseerd in user growth en revenue ontwikkeling.`,
    hints: [
      'Geef je rol en bedrijfscontext',
      'Specificeer de presentatie details (tijd, publiek)',
      'Deel specifieke vragen of behoeften',
      'Vermeld wat belangrijk is voor je publiek'
    ],
    tips: [
      'Context helpt AI relevante en praktische adviezen te geven',
      'Specifieke vragen leiden tot gestructureerde antwoorden',
      'Publiek-specifieke informatie verbetert de kwaliteit van adviezen'
    ],
    evaluationCriteria: [
      'Duidelijke rol en bedrijfscontext',
      'Specifieke presentatie parameters',
      'Concrete vragen of behoeften',
      'Publiek-specifieke informatie'
    ],
    resources: [
      'Context Setting in AI Prompts',
      'Business Communication Best Practices'
    ]
  },
  {
    id: 'pe-nl-003',
    title: 'Rolgebaseerde Prompts',
    description: 'Leer hoe je AI een specifieke rol geeft voor expertise-gerichte antwoorden.',
    difficulty: 'beginner',
    category: 'Role Playing',
    estimatedTime: '10 minuten',
    prompt: 'Laat AI de rol van een expert aannemen om advies te geven over een specifiek onderwerp.',
    solution: `Je bent een ervaren voedingsdeskundige met 15 jaar ervaring in het helpen van mensen met het ontwikkelen van gezonde eetgewoonten.

Een 35-jarige kantoorwerker vraagt om advies voor gezonde lunch opties die:
- Makkelijk zijn om mee te nemen naar kantoor
- Binnen 10 minuten te bereiden zijn
- Energie geven voor de middag
- Budget-vriendelijk zijn (max €5 per lunch)

Geef 5 concrete lunch ideeën met een korte uitleg waarom elke optie gezond en praktisch is.`,
    hints: [
      'Definieer een specifieke expert rol',
      'Geef de expert relevante ervaring',
      'Stel een duidelijke situatie voor',
      'Specificeer concrete criteria en beperkingen'
    ],
    tips: [
      'Specifieke expertise rollen geven gerichtere antwoorden',
      'Ervaring toevoegen verhoogt de geloofwaardigheid',
      'Concrete criteria helpen bij praktische antwoorden'
    ],
    evaluationCriteria: [
      'Duidelijke expert rol definitie',
      'Relevante ervaring/credentials',
      'Specifieke situatie context',
      'Concrete criteria en beperkingen'
    ],
    resources: [
      'Role-based AI Interactions',
      'Expert Persona Development'
    ]
  },
  {
    id: 'pe-nl-004',
    title: 'Stap-voor-Stap Instructies',
    description: 'Leer hoe je AI vraagt om gestructureerde, stap-voor-stap uitleg te geven.',
    difficulty: 'beginner',
    category: 'Structured Output',
    estimatedTime: '12 minuten',
    prompt: 'Vraag AI om een stap-voor-stap gids te maken voor een praktische taak.',
    solution: `Maak een beginner-vriendelijke, stap-voor-stap gids voor het opzetten van een Instagram business account.

**Format:**
- Gebruik genummerde stappen
- Elke stap max 2 zinnen
- Voeg praktische tips toe waar relevant
- Eindig met een checklist voor verificatie

**Doelgroep:** Kleine ondernemers zonder social media ervaring
**Doel:** Een professioneel Instagram business profiel dat klaar is voor marketing

Begin met wat ze nodig hebben (telefoon, email adres, etc.) en eindig met de eerste post suggestie.`,
    hints: [
      'Specificeer het gewenste format (genummerde stappen)',
      'Geef lengte richtlijnen per stap',
      'Definieer de doelgroep duidelijk',
      'Vraag om een duidelijk begin en einde'
    ],
    tips: [
      'Gestructureerde output is gemakkelijker te volgen',
      'Doelgroep specificatie verbetert de toon en detail niveau',
      'Begin en einde punten maken gidsen completer'
    ],
    evaluationCriteria: [
      'Duidelijk format verzoek',
      'Specifieke lengte/structuur richtlijnen',
      'Doelgroep definitie',
      'Begin en einde specificaties'
    ],
    resources: [
      'Structured Content Creation',
      'Step-by-step Guide Writing'
    ]
  },
  ...additionalBeginnerExercisesNL
];
