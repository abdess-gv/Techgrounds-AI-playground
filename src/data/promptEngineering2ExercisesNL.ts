import { PromptEngineering2Exercise } from '../types/PromptEngineering2';

export const promptEngineering2ExercisesNL: PromptEngineering2Exercise[] = [
  // Niveau 1
  {
    id: 'pe2-l1-e1',
    level: 1,
    exerciseNumber: 1,
    title: 'Basis Prompt Structuur',
    description: 'Leer de basiscomponenten van een effectieve prompt voor een AI-chatbot.',
    instructions: 'Maak een prompt die een AI vraagt om een kort verhaal van 50 woorden te schrijven over een kat die een ruimteschip ontdekt. Zorg ervoor dat je duidelijk het onderwerp, de gewenste lengte en de hoofdpersoon specificeert.',
    examplePrompt: 'Schrijf een kort verhaal van exact 50 woorden over een nieuwsgierige kat genaamd Miko die een klein, glimmend ruimteschip in haar achtertuin vindt.',
    expectedOutput: 'Miko, de gestreepte kat, sloop door het hoge gras. Plotseling zag ze het: een klein, zilveren ruimteschip, niet groter dan een voetbal! Ze tikte er voorzichtig tegen met haar pootje. Het ruimteschip zoemde zachtjes. Miko’s snorharen trilden van opwinding. Wat een avontuur zou dit worden, dacht ze, spinnend van plezier.'
  },
  {
    id: 'pe2-l1-e2',
    level: 1,
    exerciseNumber: 2,
    title: 'Context Geven in Prompts',
    description: 'Begrijp hoe het toevoegen van context de AI-respons kan verbeteren.',
    instructions: 'Formuleer een prompt om een AI te vragen naar de voordelen van zonne-energie. Geef context door te specificeren dat het antwoord bedoeld is voor huiseigenaren die overwegen zonnepanelen te installeren.',
    examplePrompt: 'Wat zijn de belangrijkste voordelen van zonne-energie voor huiseigenaren die overwegen om zonnepanelen op hun dak te installeren?',
    expectedOutput: 'Voor huiseigenaren biedt zonne-energie lagere energierekeningen, een kleinere ecologische voetafdruk, en verhoogde woningwaarde. Ook zijn er vaak subsidies beschikbaar en draagt men bij aan een duurzamere toekomst.'
  },
  {
    id: 'pe2-l1-e3',
    level: 1,
    exerciseNumber: 3,
    title: 'Roltoewijzing aan AI',
    description: 'Experimenteer met het toewijzen van een rol aan de AI voor specifiekere antwoorden.',
    instructions: 'Schrijf een prompt waarin je de AI vraagt om als een ervaren reisgids aanbevelingen te doen voor een driedaagse stedentrip naar Rome, gericht op historische bezienswaardigheden.',
    examplePrompt: 'Je bent een ervaren reisgids gespecialiseerd in Rome. Geef mij een gedetailleerd reisschema voor een driedaagse stedentrip naar Rome, met de focus op historische bezienswaardigheden. Vermeld openingstijden en geschatte bezoektijd per locatie.',
    expectedOutput: 'Dag 1: Colosseum (ochtend, 3 uur), Forum Romanum & Palatijn (middag, 4 uur). Dag 2: Vaticaanstad - Sint-Pietersbasiliek & Vaticaanse Musea (hele dag). Dag 3: Pantheon (ochtend, 1 uur), Trevifontein & Spaanse Trappen (middag, 2 uur). Controleer actuele openingstijden online.'
  },
  // Niveau 2
  {
    id: 'pe2-l2-e1',
    level: 2,
    exerciseNumber: 1,
    title: 'Zero-shot vs. Few-shot Prompts',
    description: 'Leer het verschil tussen zero-shot en few-shot prompting en pas few-shot toe.',
    instructions: 'Stel een few-shot prompt op om een AI te leren e-mailonderwerpen te genereren voor marketingcampagnes. Geef twee voorbeelden van input (campagne type) en output (onderwerp) in je prompt.',
    examplePrompt: 'Genereer een pakkend e-mailonderwerp. Voorbeeld 1: Input: Productlancering, Output: Mis het niet: Onze Nieuwe [Productnaam] Is Hier! Voorbeeld 2: Input: Kortingsactie, Output: Jouw Exclusieve Korting: Tot 50% Op Alles! Input: Webinar aankondiging',
    expectedOutput: 'Nog maar een paar dagen: Schrijf je nu in voor ons [Webinar Onderwerp] Webinar!'
  },
  {
    id: 'pe2-l2-e2',
    level: 2,
    exerciseNumber: 2,
    title: 'Output Formaat Specificeren',
    description: 'Leer hoe je de AI kunt instrueren om output in een specifiek formaat te leveren (bijv. JSON, lijst, tabel).',
    instructions: 'Maak een prompt die de AI vraagt om een lijst van drie programmeertalen te geven die geschikt zijn voor webontwikkeling, samen met hun belangrijkste voordeel. De output moet een JSON-array van objecten zijn.',
    examplePrompt: 'Geef een lijst van drie programmeertalen geschikt voor webontwikkeling, inclusief hun belangrijkste voordeel. Formatteer de output als een JSON-array, waarbij elk object een "taal" en "voordeel" sleutel heeft.',
    expectedOutput: '[\n  {\n    "taal": "JavaScript",\n    "voordeel": "Essentieel voor front-end interactiviteit, werkt ook op de back-end met Node.js."\n  },\n  {\n    "taal": "Python",\n    "voordeel": "Veelzijdig met frameworks zoals Django en Flask, leesbare syntax."\n  },\n  {\n    "taal": "PHP",\n    "voordeel": "Specifiek ontworpen voor webontwikkeling, brede hostingondersteuning."\n  }\n]'
  },
  {
    id: 'pe2-l2-e3',
    level: 2,
    exerciseNumber: 3,
    title: 'Negatieve Prompts en Beperkingen',
    description: 'Oefen met het specificeren wat de AI *niet* moet doen of welke onderwerpen te vermijden.',
    instructions: 'Schrijf een prompt voor een AI om een gedicht over de lente te schrijven, maar specificeer dat het gedicht geen clichés zoals "bloemen bloeien" of "vogels zingen" mag bevatten.',
    examplePrompt: 'Schrijf een origineel gedicht over het gevoel van de lente. Vermijd expliciet het noemen van bloeiende bloemen of zingende vogels. Focus op de verandering in licht en de energie in de lucht.',
    expectedOutput: 'Het ijle licht rekt dagen langer uit,\nEen kriebel danst waar kilte eerder schuilde.\nDe wind fluistert een nieuw, ontwakend geluid,\nTerwijl de aarde zucht, diep ingehouden.\nEen frisse adem, scherp en toch zo zacht,\nBelofte van wat komen gaat, onverwacht.'
  },
  // Niveau 3
  {
    id: 'pe2-l3-e1',
    level: 3,
    exerciseNumber: 1,
    title: 'Chain-of-Thought Prompting',
    description: 'Stimuleer de AI om "na te denken" in stappen voor complexere problemen.',
    instructions: 'Maak een prompt die een AI vraagt een wiskundig vraagstuk (bijv. een tekstueel probleem) stap voor stap op te lossen, waarbij elke denkstap wordt getoond.',
    examplePrompt: 'Los het volgende vraagstuk stap voor stap op en laat je denkproces zien: Jan heeft 5 appels. Hij eet er 2 op en geeft er 1 aan zijn zus. Hoeveel appels heeft Jan nog over?',
    expectedOutput: "Stap 1: Beginhoeveelheid appels is 5.\nStap 2: Jan eet 2 appels op. Dus, 5 - 2 = 3 appels over.\nStap 3: Jan geeft 1 appel aan zijn zus. Dus, 3 - 1 = 2 appels over.\nAntwoord: Jan heeft 2 appels over."
  },
  {
    id: 'pe2-l3-e2',
    level: 3,
    exerciseNumber: 2,
    title: 'Creatieve Content Generatie met Constraints',
    description: 'Genereer creatieve tekst (bijv. een slogan) onder specifieke beperkingen.',
    instructions: 'Vraag een AI om drie slogans te bedenken voor een nieuw merk biologische koffie. De slogans moeten maximaal 5 woorden lang zijn en het woord "energie" bevatten.',
    examplePrompt: 'Bedenk drie slogans voor een nieuw merk biologische koffie. Elke slogan mag maximaal 5 woorden bevatten en moet het woord "energie" bevatten.',
    expectedOutput: "1. Pure energie, eerlijke boon.\n2. Jouw natuurlijke energie start hier.\n3. Biologische energie, elke slok waard."
  },
  {
    id: 'pe2-l3-e3',
    level: 3,
    exerciseNumber: 3,
    title: 'Prompt Iteratie en Verfijning',
    description: 'Leer hoe je een initiële prompt kunt analyseren en iteratief kunt verbeteren voor betere resultaten.',
    instructions: 'Begin met een simpele prompt: "Vertel me over honden." Analyseer de output. Verfijn vervolgens de prompt in minimaal twee iteraties om specifiekere informatie te krijgen over de trainingsbehoeften van Labradors. Beschrijf je iteraties.',
    examplePrompt: 'Initiële prompt: "Vertel me over honden."\nIteratie 1: "Wat zijn de typische trainingsbehoeften van een Labrador Retriever?"\nIteratie 2: "Geef een gedetailleerd overzicht van de trainingsbehoeften van een Labrador Retriever pup vanaf 8 weken tot 1 jaar, inclusief socialisatie en gehoorzaamheid."',
    expectedOutput: 'De output zou een gedetailleerd trainingsplan moeten zijn voor Labradors, veel specifieker dan de algemene informatie van de initiële prompt. De AI zou moeten ingaan op socialisatieperiodes, basiscommando\'s, zindelijkheidstraining, en het belang van consistente training voor dit ras.'
  }
];
