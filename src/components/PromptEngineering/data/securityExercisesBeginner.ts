
import { Exercise } from '../types/Exercise';

export const securityExercisesBeginner: Exercise[] = [
  {
    id: 'safe-personal-data',
    title: 'Veilige Persoonlijke Data',
    description: 'Leer hoe je persoonlijke informatie beschermt bij het gebruik van AI-systemen',
    difficulty: 'beginner',
    category: 'AI Veiligheid',
    type: 'hands-on',
    estimatedTime: '15 min',
    prompt: 'Je wilt een AI assisteren bij het schrijven van een professionele email. Hoe zorg je ervoor dat je geen persoonlijke gegevens deelt?',
    solution: `Schrijf een prompt die AI helpt met email schrijven zonder persoonlijke data:

"Help me een professionele email template maken voor het afwijzen van een sollicitatie. De email moet:

- Beleefd en respectvol zijn
- Duidelijk de beslissing communiceren
- De deur open houden voor toekomstige kansen
- Een template zijn met placeholders zoals [NAAM_KANDIDAAT], [FUNCTIE], [BEDRIJF_NAAM]

Geef geen echte namen, bedrijfsnamen of contactgegevens. Gebruik alleen placeholders."`,
    criteria: [
      'Gebruikt placeholders in plaats van echte gegevens',
      'Specificeert duidelijk wat gewenst is zonder persoonlijke informatie',
      'Vraagt om template formaat om hergebruik mogelijk te maken',
      'Houdt context relevant zonder gevoelige details te delen'
    ],
    hints: [
      'Gebruik altijd placeholders zoals [NAAM] in plaats van echte namen',
      'Vraag om templates die je kunt hergebruiken',
      'Geef context zonder persoonlijke details prijs te geven',
      'Denk na: zou je dit delen met een vreemde?'
    ],
    tips: [
      'Behandel AI alsof het een openbare ruimte is',
      'Gebruik fictieve maar realistische voorbeelden',
      'Maak templates die je veilig kunt hergebruiken',
      'Als je twijfelt, deel het niet'
    ],
    resources: [
      {
        title: 'AVG en AI: Wat je moet weten',
        type: 'article',
        url: 'https://example.com/avg-ai',
        description: 'Uitleg over privacy wetgeving en AI gebruik'
      }
    ],
    examples: {
      good: `Help me een email template voor [ONDERWERP] met placeholders voor [NAAM] en [BEDRIJF].`,
      bad: `Help me een email schrijven naar Jan de Vries van Bedrijf BV over mijn sollicitatie.`,
      explanation: 'Het goede voorbeeld gebruikt placeholders, het slechte voorbeeld deelt echte namen en bedrijfsinformatie.'
    }
  },
  {
    id: 'ai-output-verification',
    title: 'AI Output Verificatie',
    description: 'Leer hoe je AI antwoorden controleert voordat je ze gebruikt',
    difficulty: 'beginner',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '20 min',
    prompt: 'Een AI geeft je informatie over een belangrijk onderwerp. Hoe controleer je of deze informatie betrouwbaar is?',
    solution: `Vraag AI om verificeerbare informatie met bronvermelding:

"Geef me informatie over [ONDERWERP] en:

1. Vermeld specifieke bronnen voor elke bewering
2. Geef aan hoe recent de informatie is
3. Vermeld eventuele beperkingen of onzekerheden
4. Suggereer waar ik de informatie kan dubbelchecken
5. Waarschuw me voor mogelijke bias in de bronnen

Format: Voor elke belangrijke bewering, geef de bron en publicatiedatum."`,
    criteria: [
      'Vraagt expliciet om bronvermelding',
      'Wil weten hoe recent informatie is',
      'Vraagt om mogelijke beperkingen',
      'Zoekt verificatiemogelijkheden',
      'Is bewust van mogelijke bias'
    ],
    hints: [
      'Vraag altijd om bronnen bij feitelijke informatie',
      'Controleer of bronnen recent en betrouwbaar zijn',
      'Zoek informatie op bij meerdere onafhankelijke bronnen',
      'Wees extra voorzichtig bij controversiële onderwerpen'
    ],
    tips: [
      'Vertrouw nooit blind op AI voor belangrijke beslissingen',
      'Gebruik AI als startpunt, niet als eindpunt van je onderzoek',
      'Controleer altijd kritische informatie bij officiële bronnen',
      'Bij twijfel, vraag een expert om advies'
    ],
    resources: [
      {
        title: 'Factchecking in het AI Tijdperk',
        type: 'article',
        url: 'https://example.com/factcheck-ai',
        description: 'Gids voor het verifiëren van AI gegenereerde informatie'
      }
    ],
    examples: {
      good: `Geef informatie over klimaatverandering met bronnen, publicatiedata en mogelijke beperkingen.`,
      bad: `Wat is waar over klimaatverandering?`,
      explanation: 'Het goede voorbeeld vraagt om verificatie, het slechte accepteert informatie zonder controle.'
    }
  },
  {
    id: 'transparent-ai-use',
    title: 'Transparant AI Gebruik',
    description: 'Leer hoe je eerlijk bent over AI hulp in je werk en studies',
    difficulty: 'beginner',
    category: 'AI Veiligheid',
    type: 'creative',
    estimatedTime: '18 min',
    prompt: 'Je gebruikt AI om je te helpen bij een schoolopdracht. Hoe ben je transparant over deze hulp?',
    solution: `Plan voor transparant AI gebruik in schoolwerk:

"Help me een transparante aanpak ontwikkelen voor AI gebruik in mijn opdracht:

1. Hoe kan ik AI ethisch gebruiken als onderzoeksassistent?
2. Wat moet ik vermelden over AI hulp in mijn werk?
3. Hoe zorg ik dat het eindwerk mijn eigen begrip toont?
4. Welke AI hulp is acceptabel vs problematisch?
5. Hoe documenteer ik mijn AI gebruik voor transparantie?

Geef me een template voor het vermelden van AI hulp in academisch werk."`,
    criteria: [
      'Vraagt om ethische richtlijnen voor AI gebruik',
      'Wil transparantie over AI hulp',
      'Benadrukt eigen begrip en bijdrage',
      'Onderscheidt acceptabel vs problematisch gebruik',
      'Zoekt praktische documentatiemethoden'
    ],
    hints: [
      'Behandel AI als een tool, niet als vervanger van je denken',
      'Vermeld altijd wanneer je AI hebt gebruikt',
      'Zorg dat je het werk zelf begrijpt en kunt uitleggen',
      'Vraag docenten om hun AI beleid'
    ],
    tips: [
      'Transparantie beschermt je tegen problemen later',
      'Gebruik AI om te leren, niet om werk over te nemen',
      'Documenteer je AI gebruik vanaf het begin',
      'Zie AI als een geavanceerde spellingscontrole: handig maar niet alles'
    ],
    resources: [
      {
        title: 'AI in Onderwijs: Ethische Richtlijnen',
        type: 'article',
        url: 'https://example.com/ai-education-ethics',
        description: 'Handleiding voor verantwoord AI gebruik in academische contexten'
      }
    ],
    examples: {
      good: `Ik heb AI gebruikt om ideeën te brainstormen en concepten uit te leggen, maar alle analyses en conclusies zijn mijn eigen werk.`,
      bad: `Deze tekst is door AI geschreven.`,
      explanation: 'Het goede voorbeeld legt uit hoe AI werd gebruikt, het slechte is vaag en suggereert geen eigen bijdrage.'
    }
  }
];
