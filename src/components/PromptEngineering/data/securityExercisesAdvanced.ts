
import { Exercise } from '../types/Exercise';

export const securityExercisesAdvanced: Exercise[] = [
  {
    id: 'ai-misuse-prevention',
    title: 'AI Misbruik Voorkomen',
    description: 'Bescherm tegen kwaadaardig gebruik van AI en manipulatieve technieken',
    difficulty: 'advanced',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '35 min',
    prompt: 'Je bent verantwoordelijk voor AI veiligheid in een organisatie. Hoe voorkom je misbruik en manipulatie?',
    solution: `Uitgebreid AI misbruik preventie protocol:

"Ontwikkel een veellagige verdediging tegen AI misbruik:

1. **Threat Modeling & Risk Assessment:**
   - Identificeer potentiële aanvalsvectoren (prompt injection, data poisoning, model manipulation)
   - Evalueer kwetsbaarheiten in AI systemen en processen
   - Analyse van misbruik scenario's: deepfakes, misinformatie, bias amplificatie
   - Impact assessment per type bedreiging

2. **Technische Beveiligingsmaatregelen:**
   - Input validatie en sanitization protocols
   - Output filtering en content moderation
   - Access controls en authenticatie mechanismen
   - Audit logs en monitoring systemen
   - Rate limiting en usage anomaly detection

3. **Proces & Governance Controls:**
   - AI gebruik policies en training voor gebruikers
   - Approval workflows voor kritische AI toepassingen
   - Regular security audits en penetration testing
   - Incident response procedures voor AI misbruik
   - Vendor assessment en third-party AI service security

4. **Human-in-the-Loop Safeguards:**
   - Critical decision points requiring human oversight
   - Quality assurance en bias checking procedures  
   - Escalation paths voor verdachte AI gedrag
   - Training voor herkenning van AI gegenereerde content

5. **Compliance & Legal Framework:**
   - GDPR, AI Act en andere relevante wetgeving
   - Industry-specific regelgeving (healthcare, finance, etc.)
   - Contractuele verplichtingen en liability management
   - Documentation en reporting requirements

Implementeer een multi-fase rollout met piloting, monitoring en iteratieve verbetering."`,
    criteria: [
      'Comprehensieve bedreiging identificatie',
      'Multi-layered technische beveiligingsmaatregelen',
      'Robuuste governance en proces controles',
      'Effectieve human oversight mechanismen',
      'Compliance met relevante wetgeving'
    ],
    hints: [
      'Denk als een aanvaller: hoe zou je het systeem proberen te misbruiken?',
      'Defense in depth: meerdere beveiligingslagen zijn effectiever',
      'Menselijke controle blijft essentieel bij kritische beslissingen',
      'Regelmatige updates van beveiligingsmaatregelen zijn noodzakelijk'
    ],
    tips: [
      'AI beveiliging evolueert snel - blijf bijleren',
      'Test je verdedigingen regelmatig met ethische hackers',
      'Combineer technische en procedurele maatregelen',
      'Documenteer alle incidenten voor toekomstige lering'
    ],
    resources: [
      {
        title: 'AI Security Best Practices Guide',
        type: 'article',
        url: 'https://example.com/ai-security-guide',
        description: 'Uitgebreide gids voor het beveiligen van AI systemen tegen misbruik'
      }
    ],
    examples: {
      good: `Implementeer input filtering, human review voor kritische outputs, audit logging, en reguliere security assessments.`,
      bad: `Vertrouw op de AI om zichzelf te beveiligen.`,
      explanation: 'Het goede voorbeeld gebruikt defensie-in-diepte principes, het slechte is naïef over AI kwetsbaarheiten.'
    }
  },
  {
    id: 'complex-privacy-scenarios',
    title: 'Complexe Privacy Scenario\'s',
    description: 'Handel geavanceerde privacy uitdagingen af in AI contexten',
    difficulty: 'advanced',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '40 min',
    prompt: 'Je organisatie gebruikt AI voor HR, customer service en product development. Hoe manage je privacy in deze complexe omgeving?',
    solution: `Geavanceerd privacy management framework voor multi-domain AI gebruik:

"Ontwikkel een holistische privacy strategie voor enterprise AI:

1. **Privacy by Design Integration:**
   - Data minimization principes in AI model development
   - Purpose limitation en use case restrictions
   - Consent management systemen voor verschillende AI toepassingen
   - Privacy impact assessments (PIA) voor nieuwe AI implementaties

2. **Cross-Domain Privacy Challenges:**
   - HR AI: CV screening, performance evaluation, workforce analytics
     * Bias prevention, consent voor analyse, recht op uitleg
   - Customer Service AI: Chatbots, sentiment analysis, personalization
     * Data retention policies, consent voor profiling, anonymization
   - Product Development AI: User behavior analysis, predictive modeling
     * Aggregate vs individual data gebruik, opt-out mechanismen

3. **Technical Privacy Safeguards:**
   - Differential privacy implementation voor data analytics
   - Federated learning voor gedistribueerde model training
   - Homomorphic encryption voor privacy-preserving computations
   - Synthetic data generation voor training zonder real data exposure
   - Data masking en tokenization technieken

4. **Governance & Compliance Framework:**
   - Privacy officer involvement in AI project lifecycle
   - Cross-functional teams (Legal, IT, Business, Privacy)
   - Regular privacy audits en monitoring programma's
   - Incident response voor privacy breaches involving AI
   - Vendor management en data processor agreements

5. **Individual Rights Management:**
   - Right to explanation voor automated decision making
   - Data portability voor AI-processed personal data
   - Right to rectification in AI model predictions
   - Right to erasure ('right to be forgotten') implementation
   - Automated systems voor handling privacy requests

6. **International Compliance Considerations:**
   - GDPR (EU), CCPA (California), LGPD (Brazil) compliance
   - Cross-border data transfer restrictions
   - Localization requirements per jurisdiction
   - Emerging AI-specific regulations (EU AI Act, etc.)

Implementeer een risk-based approach met regelmatige evaluatie en aanpassing."`,
    criteria: [
      'Privacy by design integratie in AI ontwikkeling',
      'Domain-specifieke privacy uitdagingen geadresseerd',
      'Geavanceerde technische privacy beschermingen',
      'Robuust governance en compliance framework',
      'Effectief beheer van individuele privacy rechten'
    ],
    hints: [
      'Privacy is niet één-size-fits-all - pas aan per use case',
      'Technische en juridische maatregelen moeten samen werken',
      'Documenteer alle privacy beslissingen voor audit doeleinden',
      'Houd internationale regelgeving in de gaten'
    ],
    tips: [
      'Privacy compliance is ongoing, niet eenmalig',
      'Betrek privacy experts vanaf het begin van AI projecten',
      'Investeer in privacy-enhancing technologies',
      'Train alle stakeholders in privacy best practices'
    ],
    resources: [
      {
        title: 'Enterprise AI Privacy Implementation Guide',
        type: 'article',
        url: 'https://example.com/enterprise-ai-privacy',
        description: 'Praktische gids voor privacy management in complexe AI omgevingen'
      }
    ],
    examples: {
      good: `HR AI implementatie: anonimiseer CV data, implementeer bias detection, geef recht op uitleg, documenteer alle beslissingen.`,
      bad: `Gebruik alle beschikbare data om AI zo accuraat mogelijk te maken.`,
      explanation: 'Het goede voorbeeld balanceert functionaliteit met privacy bescherming, het slechte negeert privacy rechten.'
    }
  },
  {
    id: 'ai-governance-policy',
    title: 'AI Governance & Beleid',
    description: 'Ontwikkel uitgebreide AI richtlijnen en governance structuren',
    difficulty: 'advanced',
    category: 'AI Veiligheid',
    type: 'creative',
    estimatedTime: '45 min',
    prompt: 'Als Chief AI Officer moet je een enterprise AI governance framework ontwikkelen. Hoe zorg je voor verantwoord AI gebruik op organisatie niveau?',
    solution: `Comprehensive Enterprise AI Governance Framework:

"Ontwikkel een strategisch AI governance systeem:

1. **AI Strategy & Vision Alignment:**
   - AI roadmap afstemming met business doelstellingen
   - Risk appetite definitie voor AI implementaties
   - Success metrics en KPI's voor AI governance
   - Stakeholder alignment (Board, C-level, business units)

2. **Organizational Structure & Roles:**
   - AI Governance Committee (multi-disciplinair)
   - AI Ethics Board voor moeilijke beslissingen
   - AI Center of Excellence voor best practices
   - Champion netwerk voor AI governance embedding
   - Clear escalation paths en decision rights

3. **AI Lifecycle Governance:**
   - Idea to Production governance gates
   - AI project intake en prioritization proces
   - Model development standards en review checkpoints
   - Deployment approval workflows
   - Post-deployment monitoring en maintenance

4. **Risk Management Framework:**
   - AI risk taxonomy (technical, ethical, legal, reputational)
   - Risk assessment methodologies per AI type
   - Risk mitigation strategies en contingency planning
   - Regular risk monitoring en reporting
   - Crisis management procedures voor AI failures

5. **Policy Framework Development:**
   - AI Ethics Principles (fairness, transparency, accountability)
   - Technical standards (model quality, security, performance)
   - Data governance policies (quality, access, retention)
   - Vendor management policies voor AI services
   - Employee AI usage guidelines

6. **Compliance & Audit Framework:**
   - Regulatory mapping (AI Act, sector-specific rules)
   - Internal audit programs voor AI systems
   - External audit requirements en vendor assessments
   - Documentation standards voor compliance
   - Incident reporting en investigation procedures

7. **Training & Change Management:**
   - AI literacy programs voor alle werknemers
   - Specialized training voor AI practitioners
   - Leadership education on AI governance
   - Change management voor AI adoption
   - Continuous learning en best practice sharing

8. **Performance Monitoring & Improvement:**
   - AI governance maturity assessment
   - Regular policy effectiveness reviews
   - Benchmark studies tegen industry peers
   - Continuous improvement cycles
   - Innovation labs voor emerging governance challenges

Implementeer gefaseerd met quick wins, pilot programs, en organisatie-brede rollout."`,
    criteria: [
      'Strategische afstemming van AI governance met business doelen',
      'Duidelijke organisatorische structuur en verantwoordelijkheden',
      'End-to-end AI lifecycle governance',
      'Comprehensive risk management aanpak',
      'Effectieve compliance en monitoring mechanismen'
    ],
    hints: [
      'Begin met pilot programma\'s voordat je organisatie-breed uitrolt',
      'Zorg voor C-level commitment en sponsorship',
      'Maak governance praktisch en toepasbaar, niet bureaucratisch',
      'Investeer zwaar in training en change management'
    ],
    tips: [
      'AI governance is een marathons, geen sprint',
      'Leer van early failures en itereer snel',
      'Balanceer innovatie met risk management',
      'Benchmark regelmatig tegen industry best practices'
    ],
    resources: [
      {
        title: 'Enterprise AI Governance Playbook',
        type: 'article',
        url: 'https://example.com/ai-governance-playbook',
        description: 'Stap-voor-stap gids voor het implementeren van AI governance in grote organisaties'
      }
    ],
    examples: {
      good: `Etabliss AI Governance Committee, implementeer stage-gate proces, ontwikkel risk assessment tools, train alle stakeholders.`,
      bad: `Laat elk team hun eigen AI regels maken.`,
      explanation: 'Het goede voorbeeld creëert consistente governance, het slechte leidt tot chaos en compliance risico\'s.'
    }
  },
  {
    id: 'enterprise-ai-governance',
    title: 'Enterprise AI Governance',
    description: 'Implementeer veelomvattende AI governance voor grote organisaties',
    difficulty: 'advanced',
    category: 'AI Veiligheid',
    type: 'creative',
    estimatedTime: '50 min',
    prompt: 'Als Chief Technology Officer van een multinational moet je AI governance implementeren over 50+ landen met verschillende wetgevingen. Hoe creëer je een framework dat globally schaalt?',
    solution: `Multinational Enterprise AI Governance Architecture:

"Ontwikkel een geschaald global AI governance systeem:

**1. MULTI-TIER GOVERNANCE ARCHITECTUUR:**

**Global Level (Corporate HQ):**
- Universal AI Ethics Principles (non-negotiable baseline)
- Global risk assessment methodologies
- Cross-border data governance protocols  
- Universal compliance monitoring systems
- Global AI talent governance (hiring, training, certification)

**Regional Level (Geographic Clusters):**
- Regional regulatory compliance frameworks (EU AI Act, California AI laws, etc.)
- Cultural adaptation of ethics principles
- Regional data sovereignty requirements
- Cross-border collaboration protocols within region
- Regional incident response coordination

**Local Level (Country/Business Unit):**
- Local law compliance implementation
- Cultural context implementation  
- Local language AI governance training
- Country-specific risk mitigation
- Local stakeholder engagement

**2. REGULATORY COMPLEXITY MANAGEMENT:**

**EU Compliance Track:**
- AI Act compliance procedures
- GDPR integration for AI processing
- Risk classification per EU standards
- Conformity assessment processes
- CE marking procedures for high-risk AI

**US Compliance Track:**
- State-level AI law compliance (CA, NY, etc.)
- Federal requirements (FTC, SEC, industry-specific)
- Algorithm auditing requirements
- Discrimination law compliance for AI
- Procurement compliance for government contracts

**Asia-Pacific Track:**
- Data localization requirements (China, India, etc.)
- AI development restrictions and approvals
- Cross-border data transfer protocols
- Local AI ethics board requirements

**3. SCALABLE GOVERNANCE MECHANISMS:**

**Technology Infrastructure:**
- Global AI governance platform (single source of truth)
- Automated compliance monitoring across regions
- Universal model inventory and tracking
- Cross-regional incident reporting system
- Global AI risk dashboard for C-level oversight

**Process Standardization:**
- Universal AI project intake process
- Standardized risk assessment tools
- Global AI ethics review procedures
- Cross-regional audit protocols
- Unified incident response procedures

**4. CHANGE MANAGEMENT & ADOPTION:**

**Executive Sponsorship:**
- C-level AI governance council
- Regional governance champions
- Clear accountability structure top-to-bottom
- Regular governance effectiveness reviews

**Training & Capability Building:**
- Global AI governance certification programs
- Local language training materials
- Cultural competency in AI ethics
- Regional best practice sharing networks
- Continuous learning and adaptation mechanisms

**5. PERFORMANCE MONITORING & OPTIMIZATION:**

**Global KPIs:**
- Compliance rate per region/business unit
- AI incident frequency and severity
- Governance process efficiency metrics
- Stakeholder satisfaction with governance
- Cultural adaptation effectiveness

**Continuous Improvement:**
- Quarterly global governance reviews
- Regional best practice extraction and sharing
- Regulatory landscape monitoring and adaptation
- Emerging risk identification and mitigation
- Cross-regional collaboration effectiveness

**6. CRISIS MANAGEMENT & ESCALATION:**

**Global Crisis Response:**
- 24/7 AI incident response capability
- Cross-timezone crisis management protocols
- Regulatory notification procedures by region
- Media and stakeholder communication protocols
- Post-incident learning and system improvement

**IMPLEMENTATION ROADMAP:**
Phase 1 (Months 1-6): Global framework design, pilot in 3 regions
Phase 2 (Months 7-18): Regional rollout with local adaptation
Phase 3 (Months 19-24): Full deployment and optimization
Phase 4 (Ongoing): Continuous monitoring and improvement"`,
    criteria: [
      'Ontwikkelt multi-tier governance architectuur voor scale',
      'Adresseert complexe internationale regulatory landscape',
      'Balanceert globale consistentie met lokale aanpassing',
      'Implementeert technology en process standardization',
      'Plant comprehensive change management en monitoring'
    ],
    hints: [
      'Begin met een kleine groep landen voor piloting voordat je globally schaalt',
      'Investeer zwaar in technology infrastructure - handmatige processen schalen niet',
      'Culturele verschillen in ethics zijn significant - one-size-fits-all werkt niet',
      'Zorg voor duidelijke escalation paths wanneer local en global requirements conflicteren'
    ],
    tips: [
      'Global governance is meer kunst dan wetenschap - flexibiliteit is cruciaal',
      'Bouw sterke relationships met local legal en compliance teams',
      'Monitor regulatory developments proactief - wacht niet tot new laws gepubliceerd zijn',
      'Invest in people én technology - governance is ultimately about culture'
    ],
    resources: [
      {
        title: 'Multinational AI Governance Best Practices',
        type: 'article',
        url: 'https://example.com/multinational-ai-governance',
        description: 'Case studies en frameworks voor global AI governance implementatie'
      }
    ],
    examples: {
      good: `Multi-tier framework met global baselines, regional adaptation, local implementation, unified technology platform, cultural sensitivity.`,
      bad: `Eén global AI policy die iedereen moet volgen.`,
      explanation: 'Het goede voorbeeld erkent complexiteit en noodzaak van aanpassing, het slechte negeert regulatory en culturele verschillen.'
    }
  },
  {
    id: 'ai-crisis-management',
    title: 'AI Crisis Management',
    description: 'Manage crisis situaties wanneer AI systemen falen of misbruikt worden',
    difficulty: 'advanced',
    category: 'AI Veiligheid',
    type: 'analysis',
    estimatedTime: '45 min',
    prompt: 'Je organisatie\'s AI systeem heeft een ernstige fout gemaakt die publieke aandacht trekt en mogelijk schade veroorzaakt. Hoe manage je deze crisis effectief?',
    solution: `Comprehensive AI Crisis Management Protocol:

"Ontwikkel een volledig crisis response framework voor AI failures:

**FASE 1: IMMEDIATE RESPONSE (0-4 uur)**

**Crisis Assessment:**
- Severity classification (Low/Medium/High/Critical)
- Impact scope (Internal/Customer/Public/Regulatory)  
- Root cause hypothesis (Technical failure/Misuse/Sabotage/Design flaw)
- Legal and compliance implications assessment
- Media and social media monitoring activation

**Immediate Actions:**
- AI system containment (shutdown, isolation, input filtering)
- Affected party notification (customers, partners, employees)
- Crisis team activation (Legal, PR, Technical, Executive)
- Evidence preservation for investigation
- Regulatory notification per legal requirements

**Communication Strategy:**
- Internal crisis communication (employees, board)
- Customer communication (direct notification, service updates)
- Public statement preparation (transparency, accountability, action plan)
- Regulatory communication (compliance officers, legal departments)
- Media strategy (proactive vs reactive engagement)

**FASE 2: STABILIZATION (4-24 uur)**

**Technical Investigation:**
- Detailed failure analysis and timeline reconstruction
- Impact assessment (who affected, how, to what extent)
- Technical solution development (patches, fixes, workarounds)
- System security review (prevent further exploitation)
- Data integrity verification and backup restoration if needed

**Stakeholder Management:**
- Customer support capacity scaling
- Partner and vendor communication  
- Employee support (stress management, clear communication)
- Board and investor briefings
- Regulatory cooperation and compliance demonstration

**Legal and Compliance Actions:**
- Legal liability assessment
- Insurance claim initiation  
- Regulatory compliance verification
- Documentation and record preservation
- External legal counsel engagement if needed

**FASE 3: RECOVERY (1-7 dagen)**

**System Restoration:**
- Phased system re-enabling with enhanced monitoring
- Additional safeguards implementation
- User confidence rebuilding measures
- Performance monitoring and anomaly detection
- Backup system validation and stress testing

**Reputation Management:**
- Transparent progress reporting to stakeholders
- Demonstrable improvements and safeguards
- Proactive media engagement with solutions focus
- Customer retention programs and compensation where appropriate
- Industry collaboration on lessons learned

**FASE 4: LONG-TERM IMPROVEMENT (1-6 maanden)**

**Systemic Improvements:**
- Comprehensive post-incident review (technical, process, cultural)
- Governance and oversight enhancement
- Training and awareness program updates
- Technology and process improvements based on lessons learned
- Third-party audit and validation of improvements

**Organizational Learning:**
- Crisis response effectiveness evaluation
- Process and procedure updates based on experience
- Team training and capability building
- Industry best practice sharing and collaboration
- Regulatory engagement for industry standards improvement

**CRISIS COMMUNICATION FRAMEWORK:**

**Key Messages (Adapt per audience):**
1. Acknowledgment: 'We acknowledge the serious nature of this incident'
2. Responsibility: 'We take full responsibility for our system's performance'
3. Action: 'Here's what we're doing immediately to address this'
4. Prevention: 'Here's how we're preventing this from happening again'
5. Values: 'This incident does not reflect our values and commitment to [safety/privacy/fairness]'

**Communication Channels:**
- Direct customer communication (email, in-app notifications)
- Public website statement and FAQ
- Social media response strategy
- Media interviews and press releases
- Regulatory reporting and cooperation
- Industry forum participation and transparency

**PREPAREDNESS COMPONENTS:**

**Crisis Team Structure:**
- Crisis Commander (CEO/CTO level)
- Technical Lead (debugging and fixes)
- Communication Lead (internal and external messaging)
- Legal Lead (compliance and liability)
- Customer Experience Lead (support and retention)

**Pre-Incident Preparation:**
- Crisis simulation exercises (quarterly)
- Response plan testing and refinement
- Communication template preparation
- Technical runbook maintenance and testing
- Stakeholder contact list maintenance and verification"`,
    criteria: [
      'Ontwikkelt phased crisis response met clear timelines',
      'Balanceert technical response met stakeholder management',
      'Adresseert legal, compliance, en reputational aspecten',
      'Implementeert both immediate actions en long-term improvements',
      'Plant comprehensive communication strategy voor multiple audiences'
    ],
    hints: [
      'Speed van initial response is cruciaal - stakeholders haten information vacuum',
      'Transparantie bouwt vertrouwen op, maar coordinate met legal team over wat te delen',
      'Document alles during crisis - je zult details vergeten en may need voor legal purposes',
      'Prepare voor crisis vóór je een hebt - tijdens crisis is te laat om te plannen'
    ],
    tips: [
      'Crisis management is team sport - nobody kan het alleen',
      'Oefen je crisis response regularly - onder stress maak je fouten',
      'Leer van andere organisaties\' crises - niet alle lessen hoeven painful self-learned te zijn',
      'Investeer in relationships voordat je ze nodig hebt - crisis is niet de tijd om partnerships te bouwen'
    ],
    resources: [
      {
        title: 'AI Crisis Management Case Studies',
        type: 'article',
        url: 'https://example.com/ai-crisis-case-studies',
        description: 'Real-world examples van AI crisis management met lessons learned'
      }
    ],
    examples: {
      good: `Immediate containment, transparent communication, systematic investigation, stakeholder management, long-term systemic improvements.`,
      bad: `Hoop dat het probleem vanzelf weggaat en minimaal communicate.`,
      explanation: 'Het goede voorbeeld gebruikt systematic crisis management principles, het slechte verergert de crisis door inaction en secrecy.'
    }
  }
];
