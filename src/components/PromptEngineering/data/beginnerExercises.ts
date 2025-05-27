
import { Exercise } from '../types/Exercise';

export const beginnerExercises: Exercise[] = [
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
];
