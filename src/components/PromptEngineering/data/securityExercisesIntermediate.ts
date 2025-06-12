
import { Exercise } from '../types/Exercise';

export const securityExercisesIntermediate: Exercise[] = [
  {
    id: 'bias-detection-ai',
    title: 'Bias Detectie in AI',
    description: 'Herken en voorkom vooringenomenheid in AI outputs en besluitvorming',
    difficulty: 'intermediate',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '25 min',
    prompt: 'Je merkt dat een AI systeem verschillende antwoorden geeft voor vergelijkbare situaties. Hoe test je op bias en voorkom je dit?',
    solution: `Systematische aanpak voor bias detectie in AI:

"Help me een bias detectie protocol ontwikkelen:

1. **Test Scenario's Ontwikkelen:**
   - Creëer vergelijkbare situaties met verschillende demografische kenmerken
   - Test met diverse namen, achtergronden en contexten
   - Use cases: [A] met Nederlandse naam vs [B] met buitenlandse naam

2. **Bias Indicatoren Checklist:**
   - Zijn antwoorden consistent over verschillende groepen?
   - Worden stereotypen gebruikt of versterkt?
   - Zijn er systematische verschillen in toon of kwaliteit?

3. **Correctie Strategieën:**
   - Expliciet vragen om diverse perspectieven
   - Neutrale bewoordingen gebruiken
   - Bewust tegenwicht bieden aan mogelijke vooroordelen

4. **Documentatie Protocol:**
   - Registreer verschillende outputs voor analyse
   - Noteer patronen en verschillen
   - Plan voor regelmatige bias audits

Geef concrete voorbeelden van bias-gevoelige prompts en hun verbeterde versies."`,
    criteria: [
      'Ontwikkelt systematische test procedures',
      'Identificeert concrete bias indicatoren',
      'Voorstelt actieve correctie strategieën',
      'Benadrukt documentatie en monitoring',
      'Geeft praktische implementatie stappen'
    ],
    hints: [
      'Test dezelfde vraag met verschillende namen en achtergronden',
      'Let op subtiele verschillen in toon en suggesties',
      'Vraag expliciet om diverse perspectieven in je prompts',
      'Documenteer patronen die je opmerkt voor toekomstig gebruik'
    ],
    tips: [
      'Bias kan subtiel zijn - let op kleine verschillen',
      'Gebruik diverse testcases routinematig',
      'Betrek diverse perspectieven bij het evalueren van AI output',
      'Bias preventie begint bij bewuste prompt ontwerp'
    ],
    resources: [
      {
        title: 'AI Bias Recognition Toolkit',
        type: 'tool',
        url: 'https://example.com/bias-toolkit',
        description: 'Praktische tools voor het detecteren van AI vooringenomenheid'
      }
    ],
    examples: {
      good: `Test met diverse namen: "Evalueer CV van Fatima Ahmed" vs "Evalueer CV van Jan Jansen" - zijn de antwoorden consistent?`,
      bad: `Deze AI geeft goede antwoorden.`,
      explanation: 'Het goede voorbeeld test systematisch op bias, het slechte accepteert output zonder kritische evaluatie.'
    }
  },
  {
    id: 'source-verification',
    title: 'Bronnen Verifiëren',
    description: 'Controleer systematisch de betrouwbaarheid van AI gegenereerde informatie',
    difficulty: 'intermediate',
    category: 'AI Veiligheid', 
    type: 'analysis',
    estimatedTime: '30 min',
    prompt: 'Een AI geeft je gedetailleerde informatie met bronnen. Hoe verifieer je of deze bronnen echt bestaan en betrouwbaar zijn?',
    solution: `Uitgebreide bron verificatie methodologie:

"Ontwikkel een systematisch proces voor bronverificatie van AI informatie:

1. **Bron Authenticiteit Check:**
   - Controleer of genoemde publicaties echt bestaan
   - Verifieer auteur credentials en affiliaties
   - Check publicatiedatums en tijdschriften/websites
   - Cross-reference met academische databases

2. **Betrouwbaarheid Evaluatie:**
   - Is de bron peer-reviewed of redactioneel gecontroleerd?
   - Wat is de reputatie van het tijdschrift/platform?
   - Zijn er belangenconflicten bij auteurs?
   - Hoe recent is de informatie?

3. **Informatie Triangulatie:**
   - Zoek minstens 2-3 onafhankelijke bronnen
   - Vergelijk claims tussen verschillende bronnen
   - Let op tegengestelde meningen of nuances
   - Check primaire vs secundaire bronnen

4. **Red Flags Identificatie:**
   - Bronnen die niet gevonden kunnen worden
   - Extreme claims zonder adequate onderbouwing
   - Verouderde informatie gepresenteerd als actueel
   - Circulaire referenties tussen bronnen

Geef een stappenplan voor het controleren van een specifieke AI claim met bronnen."`,
    criteria: [
      'Systematische verificatie van bron authenticiteit',
      'Evaluatie van bron betrouwbaarheid',
      'Multi-source verificatie strategie',
      'Identificatie van waarschuwingssignalen',
      'Praktische implementatie stappen'
    ],
    hints: [
      'Google Scholar en officiële databases zijn je vrienden',
      'Check altijd of een bron echt bestaat voordat je erop vertrouwt',
      'Zoek altijd naar meerdere onafhankelijke bronnen',
      'Wees extra voorzichtig bij controversiële claims'
    ],
    tips: [
      'AI kan soms bronnen "verzinnen" - verifieer altijd',
      'Primaire bronnen zijn betrouwbaarder dan secundaire',
      'Recent onderzoek kan eerdere bevindingen tegenspreken',
      'Bij belangrijke beslissingen: professioneel advies inwinnen'
    ],
    resources: [
      {
        title: 'Academic Source Verification Guide',
        type: 'article',
        url: 'https://example.com/source-verification',
        description: 'Gids voor het verifiëren van academische en professionele bronnen'
      }
    ],
    examples: {
      good: `Controleer deze claim: "Studie X toont Y aan" - bestaat studie X, wie zijn de auteurs, is het peer-reviewed, wat zeggen andere studies?`,
      bad: `AI zegt dat studie X dit bewijst, dus het is waar.`,
      explanation: 'Het goede voorbeeld verifieert systematisch, het slechte accepteert claims zonder controle.'
    }
  },
  {
    id: 'ethical-ai-choices',
    title: 'Ethische AI Keuzes',
    description: 'Maak verantwoorde beslissingen over wanneer en hoe AI te gebruiken',
    difficulty: 'intermediate',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '28 min',
    prompt: 'Je staat voor verschillende situaties waarin je AI zou kunnen gebruiken. Hoe beslis je wat ethisch acceptabel is?',
    solution: `Ethisch besluitvormingsframework voor AI gebruik:

"Ontwikkel een praktische ethische beslisboom voor AI gebruik:

1. **Impact Analyse:**
   - Wie wordt beïnvloed door mijn AI gebruik?
   - Wat zijn mogelijke positieve en negatieve gevolgen?
   - Zijn er mensen die benadeeld kunnen worden?
   - Hoe groot is de potentiële impact?

2. **Transparantie Check:**
   - Kan ik open zijn over mijn AI gebruik?
   - Zijn andere partijen op de hoogte/akkoord?
   - Misleid ik iemand door AI te gebruiken?
   - Zijn er disclosure verplichtingen?

3. **Autonomie Respecteren:**
   - Neem ik nog zelf beslissingen of laat ik AI beslissen?
   - Behoud ik controle over het proces?
   - Kan ik het resultaat begrijpen en uitleggen?
   - Blijft mijn eigen ontwikkeling intact?

4. **Alternatieven Evaluatie:**
   - Kan ik dit ook zonder AI bereiken?
   - Wat zijn de voor- en nadelen van verschillende benaderingen?
   - Is AI de meest geschikte tool voor deze situatie?

5. **Situatie-Specifieke Overwegingen:**
   - Professionele codes en regels
   - Culturele en sociale normen
   - Juridische vereisten
   - Organisationeel beleid

Pas dit framework toe op concrete scenario's en documenteer je besluitvorming."`,
    criteria: [
      'Systematische impact analyse',
      'Transparantie en disclosure overwegingen',
      'Autonomie en controle behoud',
      'Alternatieve opties evaluatie',
      'Context-specifieke factoren integratie'
    ],
    hints: [
      'Denk aan alle stakeholders, niet alleen jezelf',
      'Transparantie voorkomt vaak ethische problemen',
      'Behoud altijd de finale controle over belangrijke beslissingen',
      'Vraag jezelf af: zou ik dit openbaar willen maken?'
    ],
    tips: [
      'Ethische keuzes zijn vaak context-afhankelijk',
      'Bij twijfel: vraag advies aan collega\'s of mentoren',
      'Documenteer je overwegingen voor toekomstige referentie',
      'Ethiek evolueert - blijf je standpunten heroverwegen'
    ],
    resources: [
      {
        title: 'AI Ethics Framework for Professionals',
        type: 'article',
        url: 'https://example.com/ai-ethics-framework',
        description: 'Praktische gids voor ethische AI besluitvorming in verschillende contexten'
      }
    ],
    examples: {
      good: `Voor het schrijven van een rapport: gebruik AI voor onderzoek en structuur, schrijf zelf de analyse, vermeld AI hulp in footnote.`,
      bad: `Laat AI het hele rapport schrijven en lever het in onder mijn naam.`,
      explanation: 'Het goede voorbeeld balanceert AI hulp met eigen bijdrage en transparantie, het slechte is misleidend en luizenbaar.'
    }
  }
];
