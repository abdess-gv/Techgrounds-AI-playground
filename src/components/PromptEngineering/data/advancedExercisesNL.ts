import { Exercise } from '../types/Exercise';
import { additionalAdvancedExercisesNL } from './additionalExercisesNL';

export const advancedExercisesNL: Exercise[] = [
  {
    id: 'pe-nl-201',
    title: 'Multi-Modal Prompting',
    description: 'Leer complexe prompts te maken die meerdere input types en output formaten combineren.',
    difficulty: 'advanced',
    category: 'Complex Integration',
    estimatedTime: '25 minuten',
    prompt: 'Maak een complex prompt dat meerdere data bronnen integreert voor een comprehensive business analysis.',
    solution: `Je bent een senior data strategist voor een Fortune 500 consultancy firm. Een klant heeft je data van meerdere bronnen gegeven voor een complete marktanalyse.

**Data Bronnen:**
- Kwartaal financiële cijfers (Excel)
- Customer feedback survey results (CSV) 
- Social media sentiment data (JSON)
- Competitor pricing analysis (PDF)
- Market research report highlights (Text)

**Multi-Modal Analysis Framework:**

**1. Data Integration Protocol:**
- Normaliseer alle data naar dezelfde tijdsperiode (Q3 2024)
- Identificeer overlappende metrics tussen bronnen
- Flag inconsistenties en data quality issues
- Create unified data model voor cross-analysis

**2. Synthesized Analysis:**
- **Financial Performance**: Integreer revenue data met customer satisfaction scores
- **Market Position**: Combineer competitor pricing met sentiment analysis  
- **Growth Opportunities**: Cross-reference market research insights met customer feedback gaps
- **Risk Assessment**: Correleer financial trends met market sentiment shifts

**3. Multi-Format Output:**
- **Executive Dashboard**: Visual KPI overview (beschrijf layout en key metrics)
- **Technical Report**: Detailed methodology en statistical analysis (8-10 pagina's)
- **Presentation Deck**: Stakeholder-ready slides met key insights (12-15 slides)
- **Action Plan**: Prioritized recommendations matrix met timelines

**4. Validation Framework:**
- Cross-validate findings tussen verschillende data bronnen
- Identify confidence levels voor elke conclusie
- Document assumptions en limitations
- Suggest additional data needs voor follow-up analysis

**Delivery Specificaties:**
Alle outputs moeten consistent messaging hebben maar aangepast zijn voor verschillende audiences (C-suite, analytics team, operations).`,
    hints: [
      'Integreer meerdere data bronnen in één coherent framework',
      'Vraag om cross-validatie tussen bronnen',
      'Specificeer verschillende output formaten voor verschillende audiences',
      'Include data quality en validation protocols'
    ],
    tips: [
      'Multi-modal prompts vereisen duidelijke integration protocols',
      'Cross-validation verhoogt betrouwbaarheid van analyses',
      'Verschillende outputs voor verschillende stakeholders verhogen bruikbaarheid'
    ],
    evaluationCriteria: [
      'Integration van meerdere data bronnen',
      'Cross-validatie en quality control',
      'Multi-format output specificaties',
      'Audience-specific aanpassingen'
    ],
    resources: [
      {
        title: 'Multi-Modal Data Analysis',
        type: 'article',
        url: 'https://example.com/multi-modal-analysis',
        description: 'Gids voor het integreren van meerdere data bronnen'
      },
      {
        title: 'Enterprise Business Intelligence',
        type: 'article',
        url: 'https://example.com/enterprise-bi',
        description: 'Best practices voor enterprise-level business intelligence'
      },
      {
        title: 'Cross-Source Data Validation',
        type: 'tool',
        url: 'https://example.com/data-validation',
        description: 'Tools en technieken voor data validatie'
      }
    ]
  },
  {
    id: 'pe-nl-202',
    title: 'Adaptive Conversation Design',
    description: 'Ontwerp AI conversaties die zich aanpassen aan gebruikersgedrag en context.',
    difficulty: 'advanced',
    category: 'Conversational AI',
    estimatedTime: '30 minuten',
    prompt: 'Ontwerp een adaptieve AI conversation flow voor customer service die zich aanpast aan verschillende customer types.',
    solution: `Ontwerp een intelligente customer service conversation flow die zich real-time aanpast aan customer persona en emotionele staat.

**Adaptive Conversation Architecture:**

**1. Initial Assessment Protocol:**
Welkom! Ik ga je helpen op de meest effectieve manier.

[Persona Detection Vragen - max 2]:
- Wat is je ervaring met ons product? (Nieuw/Ervaren/Expert)
- Hoe urgent is je vraag? (Direct/Deze week/Algemene info)

[Sentiment Analysis Triggers]:
- Frustatie woorden → Empathische route
- Technische termen → Expert route  
- Tijdsdruk signalen → Efficiency route

**2. Dynamic Response Pathways:**

**A. Novice + Frustratie Route:**
- Extra empathie en geduld
- Stap-voor-stap uitleg met confirmatie checks
- Proactieve expectation setting
- Escalation triggers bij herhaalde verwarring

**B. Expert + Efficiency Route:**
- Direct naar technische oplossingen
- Assume knowledge, skip basics
- Provide advanced troubleshooting options
- Quick escalation naar specialist

**C. Standard + Informational Route:**
- Balanced technical detail
- Options-based interaction design
- Educational opportunities
- Community resource suggestions

**3. Context Adaptation Rules:**
IF (Previous interaction < 24hrs AND unresolved) 
   THEN Skip intro, reference previous case

IF (Customer value tier = Premium)
   THEN Unlock advanced options, priority routing

IF (Problem category = Billing AND emotion = angry)
   THEN Immediate compensation protocol, supervisor alert

IF (Multiple failed self-service attempts detected)
   THEN Skip self-service suggestions, direct human routing

**4. Conversation Evolution Tracking:**
- Monitor comprehension signals (questions, confirmations)
- Adjust complexity level mid-conversation
- Track satisfaction micro-signals 
- Adapt future interactions based on customer history

**5. Fallback & Escalation Design:**
- Smart routing gebaseerd op conversation analysis
- Context preservation bij escalation
- Seamless handoff protocols
- Post-interaction learning integration

**Implementation Notes:**
System moet 3 conversation branches simultaan kunnen tracken en naadloos kunnen switchen gebaseerd op nieuwe signalen zonder conversation reset.`,
    hints: [
      'Ontwerp adaptieve logic gebaseerd op real-time user signals',
      'Include multiple branching pathways voor verschillende user types',
      'Specificeer concrete trigger conditions voor path switching',
      'Design seamless transitions tussen verschillende conversation modes'
    ],
    tips: [
      'Adaptive conversations vereisen sophisticated logic trees',
      'Real-time sentiment analysis is cruciaal voor effectieve adaptatie',
      'Context preservation bij transitions verhoogt user experience'
    ],
    evaluationCriteria: [
      'Intelligente persona detection protocol',
      'Multiple adaptive conversation pathways',
      'Dynamic switching logic met concrete triggers',
      'Seamless transition en context preservation design'
    ],
    resources: [
      'Conversational AI Design',
      'Adaptive User Interface Patterns',
      'Customer Service Automation'
    ]
  },
  {
    id: 'pe-nl-203',
    title: 'Ethical AI Decision Framework',
    description: 'Ontwikkel prompts die AI helpen ethische overwegingen mee te nemen in complexe beslissingen.',
    difficulty: 'advanced',
    category: 'AI Ethics',
    estimatedTime: '35 minuten',
    prompt: 'Maak een prompt framework dat AI helpt bij ethische besluitvorming in bedrijfscontexten.',
    solution: `Ontwikkel een Ethical AI Decision Framework voor complexe business beslissingen waarbij multiple stakeholders en waarden conflicteren.

**Ethical Decision Architecture:**

**1. Stakeholder Impact Mapping:**
Voor elke business beslissing, analyseer systematisch:

PRIMARY STAKEHOLDERS:
- Werknemers: Impact op banen, working conditions, development
- Klanten: Privacy, service kwaliteit, pricing fairness  
- Aandeelhouders: Financial returns, risk exposure, reputation
- Leveranciers: Partnership continuity, payment terms, capacity

SECONDARY STAKEHOLDERS:  
- Lokale gemeenschap: Environmental impact, local economy
- Industrie: Competitive effects, standard setting
- Toekomstige generaties: Sustainability, long-term consequences
- Regulatory bodies: Compliance, precedent setting

**2. Ethical Principles Framework:**
Evalueer elke beslissing tegen core principles:

AUTONOMY: Respecteert individual choice en self-determination?
- Employee autonomy in work arrangements
- Customer choice en transparency
- Supplier relationship fairness

BENEFICENCE: Maximizes positive impact?
- Quantify benefits per stakeholder group
- Consider short vs long-term benefits
- Identify potential positive spillover effects

NON-MALEFICENCE: Minimizes harm?
- Direct harm assessment (financial, physical, emotional)
- Indirect harm potential (system effects, precedents)
- Unintended consequence analysis

JUSTICE: Distributes impacts fairly?
- Benefit distribution across stakeholder groups
- Burden sharing assessment
- Procedural fairness in decision making

**3. Ethical Decision Matrix:**
Create weighted analysis:

FOR EACH OPTION:
Score 1-10 per stakeholder group:
- Stakeholder A impact: [Score] x [Weight] = Weighted Score
- Stakeholder B impact: [Score] x [Weight] = Weighted Score
- etc.

ETHICAL PRINCIPLES ASSESSMENT:
- Autonomy preservation: [Score/10]
- Beneficence maximization: [Score/10]  
- Harm minimization: [Score/10]
- Justice/Fairness: [Score/10]

IMPLEMENTATION CONSIDERATIONS:
- Feasibility (technical, financial, legal): [Score/10]
- Timeline for full implementation: [Months]
- Reversibility if negative consequences emerge: [Y/N]

**4. Ethical Safeguards Protocol:**
MANDATORY CHECKS:
- Is deze beslissing legal in alle relevant jurisdictions?
- Kunnen we publically defend deze beslissing?
- Past het bij onze stated corporate values?
- Zouden we comfortable zijn als competitors deze approach namen?

RED FLAGS (automatic escalation triggers):
- Disproportionate impact op vulnerable groups
- Irreversible consequences with high uncertainty
- Conflicts with international human rights standards
- Creates systemic risks for industry/society

**5. Implementation & Monitoring Framework:**
PHASED ROLLOUT DESIGN:
- Pilot testing met limited scope
- Stakeholder feedback integration points  
- Impact measurement protocols
- Course correction mechanisms

ONGOING ETHICAL MONITORING:
- Regular stakeholder impact assessment
- Ethical principles compliance checking
- Unintended consequence detection
- Third-party ethical audit integration

**Decision Output Format:**
Provide structured recommendation met ethical justification, implementation roadmap, en monitoring plan die transparent accountability mogelijk maakt.`,
    hints: [
      'Integreer multiple ethical frameworks (deontological, utilitarian, virtue ethics)',
      'Creëer systematic stakeholder impact assessment',  
      'Design concrete scoring en weighting mechanisms',
      'Include safeguards en monitoring protocols'
    ],
    tips: [
      'Ethical AI frameworks moeten actionable zijn, niet alleen filosofisch',
      'Stakeholder mapping voorkomt blind spots in ethical analysis',
      'Monitoring en adjustment mechanisms zijn essentieel voor ethical sustainability'
    ],
    evaluationCriteria: [
      'Comprehensive stakeholder impact mapping',
      'Integration van multiple ethical principles',
      'Concrete scoring en decision matrix design',
      'Practical implementation en monitoring protocols'
    ],
    resources: [
      'Business Ethics Frameworks',
      'AI Ethics in Practice',
      'Stakeholder Theory Applications',
      'Ethical Decision Making Models'
    ]
  },
  ...additionalAdvancedExercisesNL
];
