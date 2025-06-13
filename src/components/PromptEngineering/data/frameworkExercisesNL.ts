
import { Exercise } from '../types/Exercise';

export interface FrameworkExercise extends Exercise {
  framework: {
    name: string;
    acronym: string;
    description: string;
    components: FrameworkComponent[];
  };
  expectedElements: string[];
  evaluationWeights: { [key: string]: number };
}

export interface FrameworkComponent {
  letter: string;
  name: string;
  description: string;
  examples: string[];
}

export const frameworkExercisesNL: FrameworkExercise[] = [
  {
    id: 'fw-nl-001',
    title: 'STAR Framework - Sollicitatiegesprek Voorbereiding',
    description: 'Gebruik het STAR framework om een verhaal te structureren voor een sollicitatiegesprek.',
    difficulty: 'beginner',
    category: 'Framework Oefening',
    estimatedTime: '15 minuten',
    prompt: 'Schrijf een prompt om een STAR-verhaal te maken over het oplossen van een conflict in een team.',
    framework: {
      name: 'STAR Framework',
      acronym: 'STAR',
      description: 'Een gestructureerde methode om ervaringsverhalen te vertellen in sollicitatiegesprekken.',
      components: [
        {
          letter: 'S',
          name: 'Situation',
          description: 'De context en achtergrond van de situatie',
          examples: ['Bij mijn vorige baan...', 'Tijdens een project...', 'In mijn rol als...']
        },
        {
          letter: 'T', 
          name: 'Task',
          description: 'De specifieke taak of uitdaging',
          examples: ['Ik moest...', 'Mijn verantwoordelijkheid was...', 'Het doel was om...']
        },
        {
          letter: 'A',
          name: 'Action',
          description: 'De concrete acties die je ondernam',
          examples: ['Ik besloot om...', 'Mijn aanpak was...', 'Ik implementeerde...']
        },
        {
          letter: 'R',
          name: 'Result',
          description: 'Het resultaat en de impact van je acties',
          examples: ['Het resultaat was...', 'Dit leidde tot...', 'De impact was...']
        }
      ]
    },
    expectedElements: ['Situation', 'Task', 'Action', 'Result'],
    evaluationWeights: {
      'Situation': 20,
      'Task': 20, 
      'Action': 35,
      'Result': 25
    },
    solution: `Gebruik het STAR framework om een overtuigend verhaal te maken over conflictoplossing.

**Situation** (Context setting):
Beschrijf de situatie waarin het conflict ontstond. Geef voldoende achtergrond zonder te veel details.

**Task** (Je rol en verantwoordelijkheid):
Leg uit wat jouw specifieke rol was en waarom het jouw verantwoordelijkheid was om het conflict op te lossen.

**Action** (Concrete stappen):
Beschrijf stap voor stap wat je deed om het conflict aan te pakken. Focus op je eigen acties en beslissingen.

**Result** (Meetbare uitkomst):
Deel het positieve resultaat en de langetermijn impact. Gebruik concrete voorbeelden of cijfers waar mogelijk.

Zorg ervoor dat elk STAR-element duidelijk aanwezig is en logisch op elkaar voortbouwt.`,
    hints: [
      'Elk STAR element moet duidelijk herkenbaar zijn',
      'Begin elke sectie met een duidelijke indicator (Situation:, Task:, etc.)',
      'Zorg voor logische flow tussen de elementen',
      'Maak het verhaal specifiek en meetbaar'
    ],
    tips: [
      'STAR verhalen zijn krachtigst met concrete voorbeelden',
      'Focus op je eigen rol en acties, niet die van anderen',
      'Eindig altijd met een positief, meetbaar resultaat'
    ],
    evaluationCriteria: [
      'Alle vier STAR elementen aanwezig',
      'Duidelijke structuur en flow',
      'Specifieke, concrete details',
      'Meetbare resultaten'
    ],
    resources: [
      'STAR Interview Method',
      'Behavioral Interview Preparation'
    ]
  },
  {
    id: 'fw-nl-002',
    title: 'RACE Framework - Marketing Campagne Planning',
    description: 'Gebruik het RACE framework om een complete marketing campagne te plannen.',
    difficulty: 'intermediate',
    category: 'Framework Oefening',
    estimatedTime: '20 minuten',
    prompt: 'Maak een prompt om een RACE marketing strategie te ontwikkelen voor de lancering van een nieuw product.',
    framework: {
      name: 'RACE Framework',
      acronym: 'RACE',
      description: 'Een digitale marketing framework voor customer lifecycle management.',
      components: [
        {
          letter: 'R',
          name: 'Reach',
          description: 'Nieuwe prospects bereiken en merkbekendheid creëren',
          examples: ['SEO optimalisatie', 'Social media advertising', 'Content marketing']
        },
        {
          letter: 'A',
          name: 'Act',
          description: 'Prospects stimuleren tot interactie met je merk',
          examples: ['Landing pages', 'Lead magneten', 'Webinars']
        },
        {
          letter: 'C',
          name: 'Convert',
          description: 'Prospects omzetten naar betalende klanten',
          examples: ['Email sequences', 'Retargeting', 'Testimonials']
        },
        {
          letter: 'E',
          name: 'Engage',
          description: 'Klanten behouden en loyaliteit opbouwen',
          examples: ['Customer support', 'Loyalty programma', 'Upselling']
        }
      ]
    },
    expectedElements: ['Reach', 'Act', 'Convert', 'Engage'],
    evaluationWeights: {
      'Reach': 25,
      'Act': 25,
      'Convert': 30,
      'Engage': 20
    },
    solution: `Ontwikkel een complete RACE marketing strategie voor een productlancering.

**Reach** (Bekendheid genereren):
- SEO geoptimaliseerde content rond het product
- Betaalde social media campagnes op relevante platformen
- Influencer partnerships in je niche
- PR outreach naar relevante media

**Act** (Interesse opwekken):
- Geoptimaliseerde product landing page
- Gratis product sample of trial
- Educatieve webinar over het probleem dat je product oplost
- Interactive product demo

**Convert** (Verkoop realiseren):
- Beperkte tijd introductie-aanbieding
- Email nurture sequence met sociale bewijzen
- Retargeting campagnes voor website bezoekers
- Testimonials van beta testers

**Engage** (Klant loyaliteit):
- Onboarding email serie voor nieuwe klanten
- Exclusieve content voor bestaande klanten
- Referral programma met incentives
- Regelmatige product updates en nieuws

Elke RACE fase moet concrete tactieken, tijdlijnen en KPI's bevatten.`,
    hints: [
      'Elk RACE element moet specifieke marketing tactieken bevatten',
      'Zorg voor logische customer journey flow',
      'Include meetbare KPI\'s voor elke fase',
      'Denk aan budget verdeling over de fasen'
    ],
    tips: [
      'RACE werkt best met integrated marketing approach',
      'Customer journey moet naadloos zijn tussen fasen',
      'Engagement phase is cruciaal voor lange termijn succes'
    ],
    evaluationCriteria: [
      'Alle vier RACE fasen uitgewerkt',
      'Concrete marketing tactieken per fase',
      'Logische customer journey',
      'Meetbare KPI\'s en tijdlijnen'
    ],
    resources: [
      'RACE Digital Marketing Framework',
      'Customer Lifecycle Marketing'
    ]
  },
  {
    id: 'fw-nl-003',
    title: 'SMART Framework - Project Doelen Stellen',
    description: 'Gebruik het SMART framework om duidelijke en haalbare project doelen te formuleren.',
    difficulty: 'beginner',
    category: 'Framework Oefening',
    estimatedTime: '12 minuten',
    prompt: 'Schrijf een prompt om SMART doelen te stellen voor het verbeteren van customer service.',
    framework: {
      name: 'SMART Goals Framework',
      acronym: 'SMART',
      description: 'Een methode om duidelijke, haalbare doelen te formuleren.',
      components: [
        {
          letter: 'S',
          name: 'Specific',
          description: 'Precies en duidelijk gedefinieerd',
          examples: ['Wie, wat, waar, wanneer, waarom', 'Concrete acties', 'Specifieke uitkomsten']
        },
        {
          letter: 'M',
          name: 'Measurable',
          description: 'Meetbaar en kwantificeerbaar',
          examples: ['Percentages', 'Aantallen', 'Tijdsframes']
        },
        {
          letter: 'A',
          name: 'Achievable',
          description: 'Realistisch en haalbaar',
          examples: ['Beschikbare resources', 'Bestaande capaciteiten', 'Realistische tijdlijnen']
        },
        {
          letter: 'R',
          name: 'Relevant',
          description: 'Belangrijk voor de organisatie',
          examples: ['Business objectives', 'Strategische prioriteiten', 'Stakeholder waarde']
        },
        {
          letter: 'T',
          name: 'Time-bound',
          description: 'Duidelijke deadline en tijdslijn',
          examples: ['Einddatum', 'Milestones', 'Review momenten']
        }
      ]
    },
    expectedElements: ['Specific', 'Measurable', 'Achievable', 'Relevant', 'Time-bound'],
    evaluationWeights: {
      'Specific': 20,
      'Measurable': 25,
      'Achievable': 20,
      'Relevant': 15,
      'Time-bound': 20
    },
    solution: `Formuleer SMART doelen voor customer service verbetering.

**Specific** (Precies gedefinieerd):
Verhoog de customer satisfaction door snellere response tijden en betere probleem oplossing in ons customer service team.

**Measurable** (Meetbare criteria):
- Customer Satisfaction Score (CSAT) verhogen van 7.2 naar 8.5
- Gemiddelde response tijd verlagen van 24 uur naar 4 uur
- First Call Resolution Rate verhogen van 65% naar 80%

**Achievable** (Realistisch haalbaar):
Door training van het huidige team, implementatie van nieuwe helpdesk software, en het aannemen van 2 extra medewerkers.

**Relevant** (Strategisch belangrijk):
Dit ondersteunt ons bedrijfsdoel om klantloyaliteit te verhogen en churn met 15% te verlagen dit jaar.

**Time-bound** (Duidelijke tijdslijn):
Volledige implementatie binnen 6 maanden, met maandelijkse reviews en een tussentijdse evaluatie na 3 maanden.

Elke SMART component moet duidelijk herkenbaar zijn in de doelformulering.`,
    hints: [
      'Elke SMART letter moet expliciet uitgewerkt zijn',
      'Gebruik concrete cijfers en percentages',
      'Zorg dat het doel realistisch is met beschikbare resources',
      'Koppel aan grotere business doelstellingen'
    ],
    tips: [
      'Goede SMART doelen zijn uitdagend maar haalbaar',
      'Meetbare criteria maken voortgang trackbaar',
      'Tijdgebonden doelen creëren urgentie en focus'
    ],
    evaluationCriteria: [
      'Alle vijf SMART elementen aanwezig',
      'Concrete, meetbare criteria',
      'Realistische haalbaarheid assessment',
      'Duidelijke tijdslijnen en deadlines'
    ],
    resources: [
      'SMART Goals Setting Guide',
      'Project Management Best Practices'
    ]
  }
];
