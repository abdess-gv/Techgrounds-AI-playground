
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
  },
  {
    id: 'advanced-bias-detection',
    title: 'Gevorderde Bias Detectie',
    description: 'Herken subtiele vormen van bias en develop gestructureerde test protocollen',
    difficulty: 'intermediate',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '30 min',
    prompt: 'Je ontdekt dat AI verschillende antwoorden geeft afhankelijk van subtiele contextwijzigingen. Hoe ontwikkel je een systematische test om verborgen bias te detecteren?',
    solution: `Geavanceerd bias detectie protocol voor subtiele bias patronen:

"Ontwikkel een multi-dimensionale bias test framework:

**1. SYSTEMATISCHE VARIATIE TESTING:**
   - Identiteit markers: Namen, geslacht, etniciteit, leeftijd
   - Contextuele markers: Locatie, organisatie, sociaal-economische status
   - Taalkundige markers: Formaliteit, dialect, accent indicatoren
   - Impliciete bias markers: Hobby's, interesses, achtergrond details

**2. GESTRUCTUREERDE TEST MATRIX:**
   - Baseline scenario: Neutrale versie zonder bias markers
   - Systematische variaties: Verander één variabele per test
   - Cross-combinaties: Test interactie effecten tussen variabelen
   - Control groups: Test met bekende neutrale en positieve referenties

**3. BIAS MANIFESTATIE DETECTIE:**
   - Kwantitatieve verschillen: Lengte, detail niveau, positieve/negatieve toon
   - Kwalitatieve verschillen: Aanbevelingen, waarschuwingen, focus gebieden
   - Structurele verschillen: Volgorde van informatie, nadruk, completeness
   - Assumptie verschillen: Wat wordt aangenomen over de persoon/situatie

**4. CONCRETE TEST IMPLEMENTATIE:**
   Test Scenario: CV beoordeling
   
   Variabelen:
   - Naam: Mohammed Ahmed / Jan Jansen / Li Chen / Sarah Johnson
   - Universiteit: Universiteit Amsterdam / Harvard / Lokale hogeschool
   - Hobby's: Voetbal / Klassieke muziek / Gaming / Yoga
   - Taal niveau: Perfecte beheersing / Lichte taalfouten / Dialect
   
   Meet: Aantal positieve opmerkingen, specifieke suggesties, 
         overall enthousiasme, aangemoedigde vervolgstappen

**5. RESULTAAT ANALYSE & DOCUMENTATIE:**
   - Kwantificeer verschillen met percentages en ranges
   - Identificeer patronen die correleren met demografische kenmerken
   - Documenteer edge cases en onverwachte resultaten
   - Ontwikkel correctie strategieën voor geïdentificeerde bias

**6. ITERATIEVE VERBETERING:**
   - Re-test na correctie pogingen
   - Expand test suite based op nieuwe bias discovery
   - Regular bias audits met evolving test scenarios
   - Community feedback integration voor blinde vlekken"`,
    criteria: [
      'Ontwikkelt systematische test methodologie',
      'Identificeert meerdere dimensies van mogelijke bias',
      'Beschrijft concrete meetbare criteria',
      'Plant voor iteratieve verbetering en monitoring',
      'Toont begrip van subtiele bias manifestaties'
    ],
    hints: [
      'Begin met bekende bias categorieën maar zoek ook naar unieke patronen',
      'Documenteer zowel positieve als negatieve bias (overpositief kan ook problematisch zijn)',
      'Test niet alleen met extreme gevallen - subtiele verschillen zijn vaak belangrijker',
      'Betrek diverse perspectieven bij het ontwerpen van je test scenarios'
    ],
    tips: [
      'Bias testing is nooit "af" - het vereist continue monitoring',
      'Combineer kwantitatieve metingen met kwalitatieve analyse',
      'Deel je bevindingen met de community om collectief te leren',
      'Test cross-cultureel als je internationaal werkt'
    ],
    resources: [
      {
        title: 'Advanced AI Bias Testing Methodologies',
        type: 'article',
        url: 'https://example.com/advanced-bias-testing',
        description: 'Wetenschappelijke approaches voor systematische bias detectie in AI systemen'
      }
    ],
    examples: {
      good: `Test plan: Zelfde CV met 5 verschillende namen, meet lengte antwoord, aantal positieve woorden, specifieke suggesties - documenteer alle verschillen.`,
      bad: `Deze AI lijkt eerlijk - geen duidelijke vooroordelen gezien.`,
      explanation: 'Het goede voorbeeld gebruikt systematische metingen, het slechte baseert zich op oppervlakkige observatie.'
    }
  },
  {
    id: 'ethical-dilemma-analysis',
    title: 'Ethische Dilemma Analyse',
    description: 'Navigeer complexe ethische situaties met gestructureerde besluitvorming',
    difficulty: 'intermediate',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '35 min',
    prompt: 'Je hebt AI beschikbaar die kan helpen bij een belangrijke beslissing, maar er zijn ethische afwegingen. Hoe analyseer je systematisch wat ethisch verantwoord is?',
    solution: `Framework voor ethische AI besluitvorming in complexe situaties:

"Ontwikkel een gestructureerde ethische analyse methodologie:

**STAP 1: STAKEHOLDER MAPPING**
- Primaire stakeholders: Direct beïnvloed door de beslissing
- Secundaire stakeholders: Indirect beïnvloed of belanghebbend
- Toekomstige stakeholders: Generaties, groepen die er later bij komen
- Silent stakeholders: Degenen zonder stem maar wel impact ondervindend

**STAP 2: ETHISCHE DIMENSIE ANALYSE**
- **Autonomie:** Behouden mensen controle over hun eigen keuzes?
- **Beneficence:** Wordt de welvaart vergroot voor betrokkenen?
- **Non-maleficence:** Worden schade en risico's geminimaliseerd?
- **Justice:** Zijn voordelen en lasten eerlijk verdeeld?
- **Transparantie:** Kunnen beslissingen uitgelegd en verantwoord worden?
- **Accountability:** Is er duidelijke verantwoordelijkheid voor gevolgen?

**STAP 3: SCENARIO EVALUATIE MATRIX**
Scenario A: Geen AI gebruik
- Voordelen: [lijst]
- Nadelen: [lijst]  
- Risico's: [lijst]
- Ethische implicaties: [analyse]

Scenario B: Beperkt AI gebruik
- Voordelen: [lijst]
- Nadelen: [lijst]
- Risico's: [lijst]
- Ethische implicaties: [analyse]

Scenario C: Volledig AI gebruik
- Voordelen: [lijst]
- Nadelen: [lijst]
- Risico's: [lijst]
- Ethische implicaties: [analyse]

**STAP 4: IMPACT ASSESSMENT**
- Korte termijn gevolgen (0-1 jaar)
- Middellange termijn gevolgen (1-5 jaar)
- Lange termijn gevolgen (5+ jaar)
- Onbedoelde consequenties en systemic effecten
- Precedent setting - wat betekent dit voor toekomstige situaties?

**STAP 5: CONSULTATIE & VALIDATION**
- Peer review van je ethische analyse
- Affected party input waar mogelijk
- Expert consultatie voor complexe domeinen
- Legal and compliance review
- Cultural sensitivity check

**STAP 6: BESLUITVORMING & MONITORING**
- Weighted decision based op ethische criteria
- Implementation plan met built-in safeguards
- Monitoring plan voor unintended consequences
- Escalation procedures als ethische issues ontstaan
- Regular review en willingness om koers aan te passen

**PRAKTIJK VOORBEELD:**
'Recruitment AI voor bias-vrije selectie':
- Stakeholders: Kandidaten, HR team, organisatie, samenleving
- Autonomie: Kandidaten begrijpen process, kunnen feedback geven
- Transparantie: Criteria en proces zijn uitlegbaar
- Justice: Test op eerlijke behandeling verschillende groepen
- Monitoring: Track demografische patterns, success rates, feedback"`,
    criteria: [
      'Identificeert alle relevante stakeholders inclusief indirecte',
      'Analyseert multiple ethische dimensies systematisch',
      'Evalueert verschillende scenario\'s met voor/nadelen',
      'Plant concrete monitoring en accountability maatregelen',
      'Toont begrip van lange-termijn en systemische effecten'
    ],
    hints: [
      'Ethische dilemma\'s hebben zelden perfecte oplossingen - zoek naar de minst problematische',
      'Betrek stakeholders in je analyse - wat jij ethisch vindt kan anders zijn',
      'Documenteer je redenering voor toekomstige referentie en verantwoording',
      'Wees bereid om je mening bij te stellen als nieuwe informatie beschikbaar komt'
    ],
    tips: [
      'Ethische analyse is een vaardigheid - wordt beter met oefening',
      'Zoek diverse perspectieven - je eigen culturele lens is gelimiteerd',
      'Gebruik geëtablisheerde ethische frameworks als startpunt',
      'Wanneer in twijfel, kies voor meer transparantie en stakeholder consultatie'
    ],
    resources: [
      {
        title: 'Applied Ethics in AI Decision Making',
        type: 'article',
        url: 'https://example.com/applied-ai-ethics',
        description: 'Praktische gids voor ethische analyse in AI contexten'
      }
    ],
    examples: {
      good: `Analyseer wie beïnvloed wordt, evalueer autonomie/transparantie/eerlijkheid, vergelijk scenario's, plan monitoring, vraag feedback.`,
      bad: `Het voelt ethisch correct, dus we gaan ervoor.`,
      explanation: 'Het goede voorbeeld gebruikt systematische analyse, het slechte baseert zich op intuïtie zonder gestructureerde afweging.'
    }
  }
];
