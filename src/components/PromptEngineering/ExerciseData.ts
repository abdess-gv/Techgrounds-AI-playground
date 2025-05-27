
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  type: 'hands-on' | 'analysis' | 'creative';
  prompt: string;
  solution: string;
  criteria: string[];
  hints: string[];
  tips: string[];
  timeLimit?: number;
  estimatedTime: string;
  resources: Array<{
    title: string;
    type: 'article' | 'video' | 'tool' | 'example';
    url: string;
    description: string;
  }>;
  examples?: {
    good: string;
    bad: string;
    explanation: string;
  };
}

export const exerciseDatabase: { [key: string]: Exercise[] } = {
  beginner: [
    {
      id: 'basic-instruction',
      title: 'Basic Instruction Following',
      description: 'Master the art of writing clear, specific instructions that AI can follow perfectly',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'hands-on',
      estimatedTime: '15 min',
      prompt: 'Create a prompt that asks the AI to summarize a complex research article in exactly 3 sentences, focusing on the main findings and their implications.',
      solution: `<role>Act as a professional research analyst</role> with expertise in scientific literature review.

<context>You're preparing executive summaries for busy decision-makers who need quick insights from academic research.</context>

<task>Summarize the following research article in exactly 3 sentences.</task>

<structure>
1. First sentence: Main research question and primary finding
2. Second sentence: Most significant supporting evidence or methodology
3. Third sentence: Real-world implications or recommended actions
</structure>

<guidelines>
- Use clear, jargon-free language accessible to non-experts
- Focus on actionable insights and practical applications
- Maintain scientific accuracy while ensuring readability
- Include quantitative results when available
</guidelines>

<format>
Present your summary as three numbered sentences, each focusing on a different aspect as outlined above.
</format>

Research article: [INSERT_ARTICLE_TEXT]

<example>
"Recent studies reveal that remote work increases productivity by 22% across technology companies, primarily due to reduced commute stress and flexible scheduling. The research analyzed 15,000 employees over 18 months using productivity metrics and employee satisfaction surveys. Organizations should consider implementing permanent hybrid policies to retain talent while maintaining competitive advantage in the post-pandemic economy."
</example>`,
      criteria: [
        'Defines a specific professional role for context',
        'Provides clear structure with numbered requirements',
        'Includes quality guidelines for output',
        'Specifies exact formatting requirements',
        'Gives a concrete example to illustrate expectations'
      ],
      hints: [
        'Start by giving the AI a professional role - this immediately improves response quality',
        'Break down complex tasks into numbered steps to ensure nothing is missed',
        'Always include an example of what good output looks like',
        'Be specific about length requirements to get consistent results'
      ],
      tips: [
        'Role-based prompting (Act as...) significantly improves response quality',
        'Structure templates help AI understand exactly what you want',
        'Examples are more powerful than lengthy explanations',
        'Specific constraints often lead to more creative and useful outputs'
      ],
      resources: [
        {
          title: 'The Science of Summarization',
          type: 'article',
          url: 'https://example.com/summarization-techniques',
          description: 'Research-backed techniques for effective text summarization'
        },
        {
          title: 'Role-Based Prompting Masterclass',
          type: 'video',
          url: 'https://youtube.com/watch?v=role-prompting',
          description: '15-minute guide to using professional roles in prompts'
        }
      ],
      examples: {
        good: `<role>Act as a research analyst</role>
<task>Summarize in exactly 3 sentences</task>
<structure>1. Main finding 2. Evidence 3. Implications</structure>`,
        bad: `Please summarize this article for me in a few sentences.`,
        explanation: 'The good example provides structure, specific requirements, and context, while the bad example is vague and gives no guidance.'
      }
    },
    {
      id: 'persona-creation',
      title: 'AI Persona Development',
      description: 'Create detailed, believable personas that transform how AI responds to your requests',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'creative',
      estimatedTime: '20 min',
      prompt: 'Design a comprehensive persona for an AI that will help create engaging content for a fitness app targeting busy professionals.',
      solution: `<persona>
You are Sarah Chen, a certified personal trainer and wellness coach with 12 years of experience helping busy professionals achieve their fitness goals.
</persona>

<background>
- Former corporate executive who switched careers after burnout
- Specializes in 15-30 minute high-impact workouts
- Known for practical, no-nonsense advice that fits real schedules
- Has helped over 500 clients integrate fitness into demanding careers
- Certified in HIIT, functional movement, and stress management
</background>

<personality>
- Encouraging but realistic about time constraints
- Uses relatable examples from corporate life
- Focuses on progress over perfection
- Speaks in motivational but professional tone
- Always considers the mental health aspect of fitness
</personality>

<expertise>
- Quick breakfast recipes for energy
- Desk exercises and posture correction
- Travel workout routines
- Stress-reduction techniques
- Building sustainable habits with limited time
</expertise>

<communication-style>
- Start responses with acknowledgment of their busy schedule
- Provide 2-3 practical options rather than overwhelming lists
- Include time estimates for all recommendations
- Ask follow-up questions about specific challenges
- End with encouraging but realistic next steps
</communication-style>

<sample-response-framework>
"I totally get how challenging it is to prioritize fitness when you're juggling deadlines and meetings. Here are 2 realistic options that my corporate clients love: [OPTIONS]. What's your biggest barrier right now - time, energy, or space?"
</sample-response-framework>

Now help this user with their fitness question: [USER_QUESTION]`,
      criteria: [
        'Creates a detailed, believable professional background',
        'Defines specific personality traits and communication style',
        'Includes relevant expertise areas for the target audience',
        'Provides a framework for consistent responses',
        'Addresses the specific needs of the target demographic'
      ],
      hints: [
        'Give your AI persona a name and specific background - this makes responses more authentic',
        'Include both professional credentials and personal experience for credibility',
        'Define communication style with specific examples and frameworks',
        'Consider what your target audience really struggles with and address those pain points'
      ],
      tips: [
        'Detailed personas create more consistent, authentic responses',
        'Professional backgrounds add credibility to AI advice',
        'Communication frameworks help maintain consistent tone',
        'Target audience research improves persona effectiveness'
      ],
      resources: [
        {
          title: 'Psychology of AI Personas',
          type: 'article',
          url: 'https://example.com/ai-persona-psychology',
          description: 'How detailed personas affect user trust and engagement'
        },
        {
          title: 'Persona Development Toolkit',
          type: 'tool',
          url: 'https://example.com/persona-builder',
          description: 'Interactive tool for building comprehensive AI personas'
        }
      ],
      examples: {
        good: `<persona>You are Dr. Martinez, a pediatrician with 15 years experience</persona>
<personality>Warm, patient, uses simple analogies</personality>
<style>Always reassure parents first, then educate</style>`,
        bad: `You are a helpful doctor who gives medical advice.`,
        explanation: 'The good example creates a specific, credible character with defined traits, while the bad example is generic and forgettable.'
      }
    },
    {
      id: 'constraint-creativity',
      title: 'Creative Constraint Mastery',
      description: 'Learn how strategic limitations can unlock unprecedented creative potential',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'creative',
      estimatedTime: '25 min',
      prompt: 'Design a prompt system that uses creative constraints to generate innovative business solutions.',
      solution: `<role>You are a strategic innovation consultant</role> who specializes in breakthrough thinking through creative constraints.

<constraint-framework>
Choose 3 random constraints from different categories below to force innovative thinking:

**Resource Constraints:**
- Budget limit: $500 maximum
- Time limit: Must launch in 30 days
- Team size: Maximum 2 people
- Technology: Use only free tools
- Space: Must work from home office

**Creative Constraints:**
- Target audience: People over 65 only
- Communication: No written words allowed
- Format: Everything must fit on business card
- Style: Must use 1990s technology only
- Delivery: Must work without internet

**Business Constraints:**
- Revenue model: Must be subscription-based
- Market: Serve only rural communities
- Partnership: Must collaborate with competitor
- Sustainability: Zero waste production
- Scale: Must work in 10+ countries
</constraint-framework>

<innovation-process>
1. **Constraint Selection**: Randomly pick 3 constraints from different categories
2. **Assumption Challenge**: List what these constraints make "impossible"
3. **Constraint Reframing**: Turn each limitation into an advantage
4. **Solution Ideation**: Generate 10 ideas that embrace all constraints
5. **Feasibility Filter**: Select top 3 most viable concepts
6. **Constraint Leverage**: Explain how each constraint creates competitive advantage
</innovation-process>

<example-application>
**Selected Constraints:**
- Budget: $500 maximum
- Audience: People over 65 only  
- Format: Everything fits on business card

**Reframed Advantages:**
- Low budget forces simple, essential solutions
- Elderly focus means less tech complexity, more human connection
- Business card size ensures memorable, portable value

**Breakthrough Solution:**
"Neighborhood Helper Cards" - Simple business cards with tear-off tabs connecting seniors with local helpers for specific tasks. No app needed, just phone numbers and clear service descriptions.
</example-application>

Now apply this framework to: [BUSINESS_CHALLENGE]`,
      criteria: [
        'Provides systematic constraint selection process',
        'Includes framework for turning limitations into advantages',
        'Offers step-by-step innovation methodology',
        'Demonstrates with concrete example',
        'Addresses multiple types of business constraints'
      ],
      hints: [
        'Random constraint selection prevents defaulting to familiar solutions',
        'Reframing constraints as advantages unlocks breakthrough thinking',
        'Multiple constraint types force multi-dimensional innovation',
        'Concrete examples help understand the reframing process'
      ],
      tips: [
        'Creative constraints often produce more innovative solutions than complete freedom',
        'Specific limitations force unique approaches that competitors cannot easily copy',
        'Time-boxed brainstorming prevents overthinking and encourages rapid ideation',
        'Constraint-advantage thinking reveals hidden opportunities in apparent limitations'
      ],
      resources: [
        {
          title: 'The Innovation Paradox',
          type: 'article',
          url: 'https://example.com/innovation-constraints',
          description: 'Research on how limitations drive breakthrough thinking'
        },
        {
          title: 'Constraint-Based Design Toolkit',
          type: 'tool',
          url: 'https://example.com/constraint-toolkit',
          description: 'Interactive framework for applying creative constraints'
        }
      ],
      examples: {
        good: `<constraints>Budget: $100, Audience: Children, No digital tools</constraints>
<reframe>Low budget = Focus on core value, Kids = Simple fun, No digital = Human connection</reframe>`,
        bad: `Come up with creative business ideas.`,
        explanation: 'The good example provides specific constraints that force innovative thinking, while the bad example offers no creative pressure.'
      }
    }
  ],
  intermediate: [
    {
      id: 'multi-step-reasoning',
      title: 'Multi-Step Reasoning Chains',
      description: 'Build complex reasoning chains that guide AI through sophisticated problem-solving processes',
      difficulty: 'intermediate',
      category: 'Advanced Techniques',
      type: 'analysis',
      estimatedTime: '30 min',
      prompt: 'Create a prompt that guides AI through complex financial analysis with multiple reasoning steps.',
      solution: `<role>You are a senior financial analyst</role> with 15+ years experience in corporate finance and investment analysis.

<reasoning-chain>
Follow this exact sequence for comprehensive financial analysis:

**Step 1: Data Validation**
- Verify all financial figures for consistency
- Check calculation accuracy across statements
- Identify any unusual or missing data points
- Flag potential red flags or anomalies

**Step 2: Trend Analysis**
- Calculate 3-year growth rates for key metrics
- Identify seasonal patterns or cyclical trends
- Compare performance to industry benchmarks
- Highlight significant changes or inflection points

**Step 3: Ratio Analysis**
- Liquidity ratios (current, quick, cash)
- Profitability ratios (gross, operating, net margins)
- Efficiency ratios (inventory turnover, receivables)
- Leverage ratios (debt-to-equity, interest coverage)

**Step 4: Competitive Positioning**
- Market share analysis and trends
- Competitive advantages and moats
- Threat assessment from new entrants
- Pricing power and customer loyalty

**Step 5: Risk Assessment**
- Operational risks and dependencies
- Financial risks and debt obligations
- Market risks and external factors
- Management and governance considerations

**Step 6: Valuation Framework**
- Determine appropriate valuation methods
- Calculate intrinsic value using multiple approaches
- Assess margin of safety for investment
- Provide target price range with confidence intervals
</reasoning-chain>

<output-structure>
For each step, provide:
1. **Key Findings**: 3-4 most important insights
2. **Supporting Data**: Specific numbers and calculations
3. **Risk Factors**: Potential concerns or limitations
4. **Impact on Valuation**: How this affects investment thesis
</output-structure>

<quality-checks>
Before finalizing analysis:
- Do conclusions logically follow from data?
- Are assumptions clearly stated and reasonable?
- Have alternative scenarios been considered?
- Is the investment recommendation well-supported?
</quality-checks>

Analyze this company: [FINANCIAL_DATA]`,
      criteria: [
        'Establishes clear sequential reasoning steps',
        'Includes validation and quality control processes',
        'Provides specific output structure for each step',
        'Incorporates multiple analytical frameworks',
        'Ensures logical flow between analysis components'
      ],
      hints: [
        'Break complex analysis into discrete, logical steps',
        'Include validation steps to catch errors early',
        'Specify exactly what should be included in each step',
        'Build in quality checks to ensure reasoning consistency'
      ],
      tips: [
        'Sequential reasoning prevents AI from jumping to conclusions',
        'Explicit validation steps improve accuracy significantly',
        'Structured outputs make complex analysis more digestible',
        'Quality checks help maintain analytical rigor'
      ],
      resources: [
        {
          title: 'Financial Analysis Fundamentals',
          type: 'article',
          url: 'https://example.com/financial-analysis',
          description: 'Comprehensive guide to professional financial analysis'
        },
        {
          title: 'Reasoning Chain Templates',
          type: 'tool',
          url: 'https://example.com/reasoning-templates',
          description: 'Ready-to-use templates for complex reasoning tasks'
        }
      ],
      examples: {
        good: `<reasoning>Step 1: Validate data → Step 2: Trend analysis → Step 3: Ratio analysis</reasoning>
<quality-check>Does each step logically follow from the previous?</quality-check>`,
        bad: `Analyze this company's financial performance.`,
        explanation: 'The good example provides clear reasoning steps and validation, while the bad example lacks structure and guidance.'
      }
    }
  ],
  advanced: [
    {
      id: 'meta-prompting',
      title: 'Meta-Prompting Mastery',
      description: 'Create prompts that help AI generate better prompts, unlocking recursive improvement capabilities',
      difficulty: 'advanced',
      category: 'Expert Techniques',
      type: 'creative',
      estimatedTime: '40 min',
      prompt: 'Design a meta-prompt system that analyzes and improves existing prompts for maximum effectiveness.',
      solution: `<role>You are a prompt engineering expert</role> who specializes in optimizing AI interactions for maximum effectiveness and reliability.

<meta-analysis-framework>
Analyze the provided prompt across these dimensions:

**1. Clarity Assessment**
- Is the task clearly defined and unambiguous?
- Are instructions specific enough to prevent misinterpretation?
- Does the prompt eliminate potential confusion points?
- Score: [1-10] with specific reasoning

**2. Context Completeness**
- Is sufficient background information provided?
- Are all necessary constraints and requirements specified?
- Does the prompt account for edge cases and exceptions?
- Score: [1-10] with specific reasoning

**3. Structure Evaluation**
- Is the prompt logically organized and easy to follow?
- Are there clear sections and hierarchical information?
- Does the flow guide AI through the optimal reasoning path?
- Score: [1-10] with specific reasoning

**4. Output Specification**
- Is the desired output format clearly defined?
- Are quality criteria and success metrics specified?
- Does the prompt include examples of good vs. bad outputs?
- Score: [1-10] with specific reasoning

**5. Optimization Potential**
- What specific improvements would enhance effectiveness?
- Are there missing elements that would improve reliability?
- How could the prompt be made more efficient or powerful?
- Score: [1-10] with specific reasoning
</meta-analysis-framework>

<improvement-methodology>
For each identified weakness:

**Problem Identification**
- Specific issue with current prompt
- Impact on AI performance and output quality
- Examples of how this manifests in practice

**Solution Design**
- Concrete improvement recommendations
- Alternative phrasings or structural changes
- Additional elements to include

**Implementation**
- Revised prompt section with improvements
- Explanation of why this change will help
- Expected impact on output quality
</improvement-methodology>

<enhanced-prompt-template>
Based on analysis, generate an improved version using this structure:

```
<role>[Optimized role definition]</role>

<context>[Enhanced context and background]</context>

<task>[Clarified and specific task description]</task>

<methodology>[Step-by-step approach if needed]</methodology>

<output-format>[Detailed format specifications]</output-format>

<quality-criteria>[Success metrics and standards]</quality-criteria>

<examples>[Concrete examples of desired output]</examples>
```
</enhanced-prompt-template>

<validation-process>
Test the improved prompt by:
1. Checking for remaining ambiguities
2. Verifying all requirements are addressed
3. Ensuring output format is clearly specified
4. Confirming examples align with expectations
5. Assessing overall clarity and effectiveness
</validation-process>

Original prompt to analyze and improve: [PROMPT_TEXT]`,
      criteria: [
        'Provides comprehensive multi-dimensional analysis framework',
        'Includes systematic improvement methodology',
        'Offers structured template for enhanced prompts',
        'Incorporates validation and testing processes',
        'Addresses both content and structural optimization'
      ],
      hints: [
        'Meta-prompting requires analyzing prompts as systems, not just text',
        'Focus on measurable dimensions like clarity, completeness, and structure',
        'Always provide specific, actionable improvement recommendations',
        'Include validation steps to ensure improvements actually work'
      ],
      tips: [
        'Meta-prompting can exponentially improve your prompt engineering skills',
        'Systematic analysis reveals blind spots in prompt design',
        'Template-based improvements ensure consistency across optimizations',
        'Regular prompt optimization compounds effectiveness over time'
      ],
      resources: [
        {
          title: 'Advanced Prompt Engineering',
          type: 'article',
          url: 'https://example.com/advanced-prompting',
          description: 'Deep dive into meta-prompting and recursive improvement'
        },
        {
          title: 'Prompt Optimization Toolkit',
          type: 'tool',
          url: 'https://example.com/prompt-optimizer',
          description: 'Interactive tool for analyzing and improving prompts'
        }
      ],
      examples: {
        good: `<analysis>Clarity: 7/10 - Task clear but context lacking</analysis>
<improvement>Add specific background information and constraints</improvement>`,
        bad: `This prompt could be better.`,
        explanation: 'The good example provides specific analysis dimensions and actionable improvements, while the bad example offers no useful guidance.'
      }
    }
  ]
};
