
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
  },
  {
    id: 'ai-transparency-basics',
    title: 'AI Transparantie Basis',
    description: 'Leer hoe je open en eerlijk bent over AI gebruik in dagelijkse situaties',
    difficulty: 'beginner',
    category: 'AI Veiligheid',
    type: 'creative',
    estimatedTime: '15 min',
    prompt: 'Je gebruikt AI om een professionele email te schrijven aan een klant. Hoe ben je transparant over deze hulp?',
    solution: `Transparant AI gebruik voor professionele communicatie:

"Help me een transparante aanpak voor AI-geassisteerde communicatie:

1. **Wanneer vermelden:**
   - Bij belangrijke formele communicatie
   - Wanneer AI meer dan spellingscontrole doet
   - Als de ontvanger er mogelijk waarde aan hecht
   - Bij creatieve content zoals voorstellen

2. **Hoe vermelden:**
   - Eenvoudige disclaimer: 'Met behulp van AI tools'
   - In email footer: 'Deze email is geoptimaliseerd met AI assistentie'
   - Direct in tekst: 'Ik heb AI gebruikt om deze tekst te structureren'

3. **Praktische Template:**
   'Beste [Naam], 
   
   [Hoofdinhoud van je email]
   
   Met vriendelijke groet,
   [Jouw naam]
   
   P.S. Deze email is gestructureerd met behulp van AI tools om duidelijkheid te verbeteren.'

4. **Waarom belangrijk:**
   - Bouwt vertrouwen op
   - Voorkomt verrassingen
   - Toont professionele integriteit
   - Helpt anderen leren van je aanpak"`,
    criteria: [
      'Geeft concrete momenten wanneer transparantie nodig is',
      'Biedt praktische manieren om AI gebruik te vermelden',
      'Toont begrip van waarom transparantie belangrijk is',
      'Balanceert eerlijkheid met praktische toepasbaarheid'
    ],
    hints: [
      'Niet elke AI hulp hoeft vermeld - focus op significante bijdragen',
      'Houd het simpel en niet aflelend van de hoofdboodschap',
      'Een korte vermelding is vaak genoeg',
      'Denk na: zou jij het willen weten als ontvanger?'
    ],
    tips: [
      'Transparantie bouwt vertrouwen op lange termijn',
      'Begin met transparantie - het wordt dan een natuurlijke gewoonte',
      'Verschillende situaties vragen verschillende niveaus van disclosure',
      'Je integriteit is waardevoller dan perfecte teksten'
    ],
    resources: [
      {
        title: 'AI Transparantie in Bedrijfscommunicatie',
        type: 'article',
        url: 'https://example.com/ai-transparency-business',
        description: 'Praktische gids voor eerlijke AI communicatie in professionele settings'
      }
    ],
    examples: {
      good: `Email footer: "Deze bericht is gestructureerd met AI assistentie voor duidelijkheid"`,
      bad: `[Geen vermelding van substantiële AI hulp bij belangrijke zakelijke communicatie]`,
      explanation: 'Het goede voorbeeld is transparant zonder afleidend te zijn, het slechte kan vertrouwen schaden als het later ontdekt wordt.'
    }
  },
  {
    id: 'safe-data-sharing',
    title: 'Veilige Data Deling',
    description: 'Leer welke informatie wel en niet veilig is om met AI te delen',
    difficulty: 'beginner',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '20 min',
    prompt: 'Je wilt AI hulp bij verschillende taken. Hoe bepaal je welke informatie veilig is om te delen en welke niet?',
    solution: `Systematische aanpak voor veilige data deling met AI:

"Ontwikkel een beslisboom voor veilige AI data deling:

**NIVEAU 1 - NOOIT DELEN:**
- Wachtwoorden, inloggegevens, API keys
- Volledige bankrekeningnummers, creditcard info
- Burgerservicenummers, paspoort nummers
- Medische dossiers van echte personen
- Vertrouwelijke bedrijfsdata (klantlijsten, financiële cijfers)

**NIVEAU 2 - ALLEEN GEANONIMISEERD:**
- Namen → [NAAM] of fictieve namen
- Adressen → [ADRES] of fictieve locaties
- Bedrijfsnamen → [BEDRIJF] of algemene beschrijvingen
- Email adressen → [EMAIL] of voorbeeld@bedrijf.nl

**NIVEAU 3 - VEILIG OM TE DELEN:**
- Algemene werkprocessen en procedures
- Theoretische vragen en concepten
- Fictieve scenario's die je zelf maakt
- Openbare informatie en algemene kennis

**PRAKTISCHE CHECKLIST:**
1. Is dit persoonlijk identificeerbare informatie (PII)?
2. Zou ik dit in een openbare ruimte bespreken?
3. Zijn er contractuele of wettelijke beperkingen?
4. Kan ik het anonimiseren zonder context te verliezen?
5. Heb ik toestemming van alle betrokkenen?

**VEILIG ALTERNATIEF MAKEN:**
- Gebruik realistische maar fictieve voorbeelden
- Verander specifieke details maar behoud de structuur
- Vraag om templates die je zelf kunt invullen
- Focus op de methodologie, niet de specifieke data"`,
    criteria: [
      'Onderscheidt duidelijk tussen veilige en onveilige data types',
      'Biedt praktische anonimisering strategieën',
      'Geeft concrete besliscriteria voor data sharing',
      'Toont begrip van privacy en veiligheidsrisicos'
    ],
    hints: [
      'Bij twijfel: deel het niet - vraag om een algemene aanpak',
      'Echte namen kunnen vaak vervangen worden door rollen of functies',
      'Test je anonimisering: zou iemand de persoon nog kunnen identificeren?',
      'Denk aan indirecte identificatie via combinatie van gegevens'
    ],
    tips: [
      'Beter te voorzichtig dan spijt hebben later',
      'Ontwikkel standaard masking templates voor veelgebruikte data types',
      'Train jezelf in het herkennen van PII in verschillende contexten',
      'Houd je organisatie\'s data classificatie richtlijnen in gedachten'
    ],
    resources: [
      {
        title: 'GDPR en AI: Data Protection Best Practices',
        type: 'article',
        url: 'https://example.com/gdpr-ai-data-protection',
        description: 'Uitleg over privacy wetgeving en veilige data praktijken voor AI gebruik'
      }
    ],
    examples: {
      good: `"Help me een email template maken voor klant feedback, gebruik [KLANTNAAM] en [PRODUCT] als placeholders"`,
      bad: `"Help me een email schrijven aan Jan de Vries over zijn klacht over Product X van ons bedrijf ABC"`,
      explanation: 'Het goede voorbeeld gebruikt placeholders, het slechte deelt echte naam- en bedrijfsinformatie.'
    }
  }
];
