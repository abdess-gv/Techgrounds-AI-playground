
import { Exercise } from '../types/Exercise';

export const additionalBeginnerExercisesNL: Exercise[] = [
  {
    id: 'pe-nl-b05',
    title: 'Creatief Verhaal Schrijven',
    description: 'Leer hoe je AI kunt gebruiken om creatieve verhalen te schrijven met specifieke elementen.',
    difficulty: 'beginner',
    category: 'Creativiteit',
    estimatedTime: '10 minuten',
    prompt: 'Schrijf een prompt om een kort verhaal te laten maken over een robot die emoties leert begrijpen.',
    solution: `Je bent een creatieve schrijver gespecialiseerd in science fiction verhalen.

**Context**: Schrijf een kort verhaal van ongeveer 300 woorden.

**Hoofdkarakter**: Een robot genaamd ARIA die net bewustzijn heeft ontwikkeld
**Setting**: Een moderne stad in het jaar 2035
**Thema**: Het leren begrijpen van menselijke emoties
**Toon**: Emotioneel en hoopvol

**Verhaalstructuur**:
- Begin: ARIA ontdekt voor het eerst een emotie
- Midden: Uitdagingen bij het begrijpen van emoties
- Eind: Een moment van echte emotionele verbinding

Zorg ervoor dat het verhaal zowel technisch interessant als emotioneel aangrijpend is.`,
    hints: [
      'Geef de AI een duidelijke rol als creatieve schrijver',
      'Specificeer de lengte van het verhaal',
      'Geef concrete details over karakter, setting en thema',
      'Vraag om een specifieke verhaalstructuur'
    ],
    tips: [
      'Concrete details maken het verhaal levendiger',
      'Een duidelijke structuur helpt de AI gefocust te blijven',
      'Emotionele toon specificeren geeft betere resultaten'
    ],
    evaluationCriteria: [
      'Duidelijke roldefinitie voor de AI',
      'Specifieke parameters (lengte, karakter, setting)',
      'Verhaalstructuur elementen',
      'Toon en stijl instructies'
    ],
    resources: [
      {
        title: 'Creative Writing Prompts',
        type: 'article',
        url: 'https://example.com/creative-writing',
        description: 'Inspiratie en technieken voor creatief schrijven'
      },
      {
        title: 'Storytelling Frameworks',
        type: 'article',
        url: 'https://example.com/storytelling',
        description: 'Gestructureerde benaderingen voor verhalen vertellen'
      }
    ]
  },
  {
    id: 'pe-nl-b06',
    title: 'E-mail Zakelijke Communicatie',
    description: 'Leer professionele zakelijke e-mails schrijven met AI ondersteuning.',
    difficulty: 'beginner',
    category: 'Zakelijke Communicatie',
    estimatedTime: '8 minuten',
    prompt: 'Maak een prompt om een professionele e-mail te schrijven naar een klant over een vertraagde levering.',
    solution: `Je bent een professionele klantenservice manager met 10 jaar ervaring.

**Situatie**: Een belangrijke levering is 5 dagen vertraagd door logistieke problemen

**Taak**: Schrijf een professionele excuus-e-mail naar de klant

**Toon**: Professioneel, verontschuldigend maar oplossingsgerichteerd
**Lengte**: 150-200 woorden

**Include**:
- Oprechte verontschuldiging
- Korte uitleg van de vertraging (zonder technische details)
- Concrete compensatie (10% korting op volgende bestelling)
- Nieuwe verwachte leveringsdatum
- Directe contactinformatie voor vragen

**Format**: Standaard zakelijke e-mail met onderwerp, aanhef en afsluiting

Zorg ervoor dat de e-mail het vertrouwen van de klant behoudt en een positieve klantrelatie onderhoudt.`,
    hints: [
      'Definieer de expertise van de AI (klantenservice ervaring)',
      'Geef concrete situationele context',
      'Specificeer de gewenste toon en lengte',
      'Maak een checklist van elementen die meegenomen moeten worden'
    ],
    tips: [
      'Zakelijke communicatie vereist professionele toon',
      'Concrete compensatie maakt de excuses geloofwaardiger',
      'Structuur helpt bij duidelijke communicatie'
    ],
    evaluationCriteria: [
      'Professionele roldefinitie',
      'Duidelijke situatie context',
      'Specifieke toon instructies',
      'Checklist van verplichte elementen'
    ],
    resources: [
      {
        title: 'Business Email Writing',
        type: 'article',
        url: 'https://example.com/business-email',
        description: 'Gids voor professionele e-mail communicatie'
      },
      {
        title: 'Customer Service Communication',
        type: 'article',
        url: 'https://example.com/customer-service',
        description: 'Best practices voor klantenservice communicatie'
      }
    ]
  },
  {
    id: 'pe-nl-b07',
    title: 'Sociale Media Content Planning',
    description: 'Leer hoe je AI gebruikt voor het plannen en maken van sociale media content.',
    difficulty: 'beginner',
    category: 'Marketing',
    estimatedTime: '12 minuten',
    prompt: 'Schrijf een prompt om een week sociale media content te plannen voor een lokaal restaurant.',
    solution: `Je bent een sociale media specialist gespecialiseerd in lokale bedrijven en restaurant marketing.

**Bedrijf**: Lokaal Italiaans restaurant "Bella Vista"
**Doelgroep**: Families en jonge professionals (25-45 jaar) in de buurt
**Platformen**: Instagram en Facebook

**Taak**: Maak een 7-dagen content planning

**Content Types**:
- 2 gerecht highlights (met beschrijving)
- 2 behind-the-scenes momenten
- 1 klant testimonial/review
- 1 speciale aanbieding
- 1 restaurant sfeer/interieur post

**Voor elke post include**:
- Caption (50-100 woorden)
- 3-5 relevante hashtags
- Beste posting tijd
- Type foto/video suggestie

**Toon**: Warm, uitnodigend, lokaal en authentiek

Zorg ervoor dat de content de lokale gemeenschap aanspreekt en engagement stimuleert.`,
    hints: [
      'Geef de AI expertise in sociale media en restaurant marketing',
      'Specificeer het type bedrijf en doelgroep',
      'Vraag om gevarieerde content types',
      'Include praktische details zoals hashtags en timing'
    ],
    tips: [
      'Variatie in content houdt followers geïnteresseerd',
      'Lokale focus verhoogt relevantie',
      'Praktische details maken de planning bruikbaar'
    ],
    evaluationCriteria: [
      'Specialist roldefinitie',
      'Duidelijke bedrijfs- en doelgroep informatie',
      'Gevarieerde content types',
      'Praktische implementatie details'
    ],
    resources: [
      {
        title: 'Social Media Marketing',
        type: 'article',
        url: 'https://example.com/social-media-marketing',
        description: 'Strategieën voor effectieve sociale media marketing'
      },
      {
        title: 'Restaurant Marketing Strategies',
        type: 'article',
        url: 'https://example.com/restaurant-marketing',
        description: 'Marketing technieken specifiek voor restaurants'
      }
    ]
  }
];

export const additionalIntermediateExercisesNL: Exercise[] = [
  {
    id: 'pe-nl-i04',
    title: 'Technische Documentatie',
    description: 'Leer hoe je AI gebruikt om duidelijke technische documentatie te schrijven.',
    difficulty: 'intermediate',
    category: 'Technische Communicatie',
    estimatedTime: '15 minuten',
    prompt: 'Maak een prompt om gebruikersdocumentatie te schrijven voor een nieuwe app feature.',
    solution: `Je bent een senior technical writer met 8 jaar ervaring in het schrijven van gebruikersvriendelijke documentatie voor software producten.

**Context**: Een nieuwe "Smart Notifications" feature in een projectmanagement app
**Doelgroep**: Zakelijke gebruikers met basis tot gemiddelde technische kennis
**Doel**: Gebruikers leren de feature effectief te gebruiken

**Documentatie Structure**:
1. **Feature Overzicht** (50 woorden)
2. **Voordelen voor de gebruiker** (3-4 bullets)
3. **Stap-voor-stap setup guide** (5-7 stappen)
4. **Gebruik scenarios** (2 praktische voorbeelden)
5. **Troubleshooting** (3 veelvoorkomende problemen + oplossingen)
6. **Best practices** (3-4 tips)

**Schrijfstijl**:
- Actieve zinnen
- Duidelijke, korte instructies
- Geen jargon zonder uitleg
- Logische volgorde van eenvoudig naar complex

**Format**: Gebruik headers, bullets en genummerde lijsten voor scanbaarheid

Zorg ervoor dat een nieuwe gebruiker binnen 10 minuten de feature kan begrijpen en gebruiken.`,
    hints: [
      'Positioneer de AI als ervaren technical writer',
      'Geef concrete context over de feature en gebruikers',
      'Vraag om een duidelijke documentatie structuur',
      'Specificeer schrijfstijl en formattering eisen'
    ],
    tips: [
      'Goede documentatie is gebruikersgericht, niet feature-gericht',
      'Structuur maakt complexe informatie toegankelijk',
      'Concrete voorbeelden verduidelijken abstracte concepten'
    ],
    evaluationCriteria: [
      'Ervaren technical writer persona',
      'Duidelijke context en doelgroep definitie',
      'Gestructureerde documentatie opbouw',
      'Specifieke schrijfstijl instructies'
    ],
    resources: [
      {
        title: 'Technical Writing Best Practices',
        type: 'article',
        url: 'https://example.com/technical-writing',
        description: 'Best practices voor effectieve technische documentatie'
      },
      {
        title: 'User Documentation Guidelines',
        type: 'article',
        url: 'https://example.com/user-documentation',
        description: 'Richtlijnen voor gebruikersvriendelijke documentatie'
      }
    ]
  },
  {
    id: 'pe-nl-i05',
    title: 'Data Analyse Rapportage',
    description: 'Leer hoe je AI gebruikt om inzichtelijke data analyse rapporten te maken.',
    difficulty: 'intermediate',
    category: 'Data Analyse',
    estimatedTime: '18 minuten',
    prompt: 'Schrijf een prompt om een maandelijks verkoop analyse rapport te genereren uit data.',
    solution: `Je bent een senior business analyst gespecialiseerd in retail verkoop analyse met 6 jaar ervaring.

**Data Context**: 
- Maandelijkse verkoop data van een elektronicawinkel
- Productcategorieën: Smartphones, Laptops, Accessoires, Gaming
- Vergelijkingsperiode: Deze maand vs vorige maand vs zelfde maand vorig jaar

**Rapport Structuur**:

**1. Executive Summary** (100 woorden)
- Belangrijkste bevindingen en trends
- Impact op business doelen

**2. Key Metrics Dashboard**
- Totale omzet (met % verandering)
- Aantal verkopen (met % verandering)  
- Gemiddelde order waarde
- Top 5 best verkopende producten

**3. Categorie Analyse**
Voor elke productcategorie:
- Performance vs targets
- Seizoensgebonden trends
- Groeikansen identificatie

**4. Actionable Insights**
- 3 concrete aanbevelingen voor volgende maand
- Risico's en mogelijkheden
- Voorgestelde acties met prioriteit (Hoog/Gemiddeld/Laag)

**Schrijfstijl**: Professioneel, data-gedreven, actionable
**Format**: Gebruik tabellen, bullets en duidelijke headers

Maak het rapport geschikt voor zowel management (executive summary) als operationeel team (details).`,
    hints: [
      'Positioneer de AI als ervaren business analyst',
      'Geef specifieke context over de data en business',
      'Vraag om een gelaagde rapport structuur',
      'Focus op actionable insights, niet alleen cijfers'
    ],
    tips: [
      'Goede rapporten beginnen met de conclusie (executive summary)',
      'Visualisatie suggessies maken data toegankelijker',
      'Concrete aanbevelingen maken rapporten waardevol'
    ],
    evaluationCriteria: [
      'Business analyst expertise definitie',
      'Specifieke data context',
      'Gestructureerde rapport opbouw',
      'Focus op actionable insights'
    ],
    resources: [
      {
        title: 'Business Intelligence Reporting',
        type: 'article',
        url: 'https://example.com/business-intelligence',
        description: 'Strategieën voor effectieve business intelligence rapportage'
      },
      {
        title: 'Data Storytelling Techniques',
        type: 'article',
        url: 'https://example.com/data-storytelling',
        description: 'Technieken voor het vertellen van verhalen met data'
      }
    ]
  }
];

export const additionalAdvancedExercisesNL: Exercise[] = [
  {
    id: 'pe-nl-a04',
    title: 'Multi-Stakeholder Strategisch Plan',
    description: 'Leer complexe strategische documenten maken die verschillende stakeholders aanspreken.',
    difficulty: 'advanced', 
    category: 'Strategische Planning',
    estimatedTime: '25 minuten',
    prompt: 'Maak een prompt voor een strategisch plan voor digitale transformatie dat zowel technisch personeel als management aanspreekt.',
    solution: `Je bent een senior strategisch consultant gespecialiseerd in digitale transformatie met 12 jaar ervaring bij Fortune 500 bedrijven.

**Organisatie Context**:
- Traditioneel productie bedrijf (500 medewerkers)
- Huidige IT maturity: Basis niveau
- Budget: €2M over 3 jaar
- Stakeholders: CEO, CTO, Operations Director, IT Manager, Department Heads

**Strategic Plan Structure**:

**1. Executive Brief** (voor C-level)
- Business case in financiële termen (ROI, cost savings)
- Competitieve voordelen en risico's van niet-handelen
- High-level timeline en investment roadmap

**2. Technical Architecture** (voor IT/CTO)
- Huidige state assessment
- Target architecture design  
- Technology stack aanbevelingen
- Integration challenges and solutions
- Security and compliance considerations

**3. Implementation Roadmap** (voor Operations)
- Fase-gebaseerd implementatie plan (3 fases over 3 jaar)
- Resource requirements per fase
- Training and change management plan
- Key milestones and success metrics
- Risk mitigation strategies

**4. Department Impact Analysis** (voor Department Heads)
- Per department: huidige processen vs toekomstige
- Voordelen voor elke afdeling
- Verwachte veranderingen in workflows
- Support and training that will be available

**Schrijfregels**:
- Elke sectie moet standalone leesbaar zijn
- Gebruik verschillende detail niveaus per stakeholder
- Include concrete ROI calculations and implementation timelines
- Balance technical accuracy with business clarity

**Deliverables**: 8-12 pagina document met executive summary, detailed plans, and appendices

Zorg ervoor dat elke stakeholder hun specifieke vragen beantwoord krijgt terwijl het geheel coherent blijft.`,
    hints: [
      'Positioneer de AI als senior consultant met bewezen track record',
      'Geef rijke organisatie context en stakeholder mapping',
      'Vraag om gelaagde content voor verschillende audiences',
      'Specificeer concrete deliverables and business metrics'
    ],
    tips: [
      'Strategische documenten moeten multiple perspectives bedienen',
      'Concrete financiële cijfers maken plannen geloofwaardig',
      'Implementation details are just as important as vision'
    ],
    evaluationCriteria: [
      'Senior consultant expertise and experience',
      'Rijke organisationele context',
      'Multi-stakeholder layered approach',
      'Concrete business metrics and ROI'
    ],
    resources: [
      {
        title: 'Digital Transformation Frameworks',
        type: 'article',
        url: 'https://example.com/digital-transformation',
        description: 'Frameworks voor effectieve digitale transformatie'
      },
      {
        title: 'Multi-Stakeholder Communication',
        type: 'article',
        url: 'https://example.com/multi-stakeholder',
        description: 'Strategieën voor communicatie met meerdere stakeholders'
      },
      {
        title: 'Change Management Strategies',
        type: 'article',
        url: 'https://example.com/change-management',
        description: 'Best practices voor change management'
      }
    ]
  }
];
