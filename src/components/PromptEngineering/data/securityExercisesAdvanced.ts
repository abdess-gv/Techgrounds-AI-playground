
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
  }
];
