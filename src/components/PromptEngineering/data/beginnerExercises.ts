
import { Exercise } from '../types/Exercise';

export const beginnerExercises: Exercise[] = [
  {
    id: 'basic-prompting',
    title: 'Basic Prompt Structure',
    description: 'Learn the fundamental components of effective prompts',
    difficulty: 'beginner',
    category: 'Fundamentals',
    type: 'hands-on',
    estimatedTime: '15 min',
    prompt: 'Create a clear, specific prompt for a creative writing task.',
    solution: `**Task**: Write a prompt for an AI to create a short story about a mysterious forest.

**Good Prompt Structure**:
"Write a 300-word short story about a hiker who discovers something unexpected in an ancient forest. Include:
- A specific discovery (not just 'something magical')
- The hiker's emotional reaction
- Sensory details about the forest
- A clear beginning, middle, and end
Style: Mysterious but not horror
Tone: Wonder and curiosity"

**Why this works**:
- Specific length (300 words)
- Clear subject (hiker, forest, discovery)
- Detailed requirements (emotional reaction, sensory details)
- Structure guidance (beginning, middle, end)
- Style and tone specifications`,
    criteria: [
      'Prompt is specific and clear',
      'Includes length/scope parameters',
      'Defines style and tone',
      'Provides structural guidance',
      'Avoids ambiguous language'
    ],
    hints: [
      'Be specific about what you want',
      'Include length or scope requirements',
      'Specify the style and tone',
      'Break down complex requests into parts'
    ],
    tips: [
      'Good prompts eliminate guesswork',
      'Specific constraints often lead to better results',
      'Always include context when needed',
      'Test your prompts and refine them'
    ],
    resources: [
      {
        title: 'Prompt Engineering Guide',
        type: 'article',
        url: 'https://example.com/prompt-guide',
        description: 'Comprehensive guide to writing effective prompts'
      }
    ],
    examples: {
      good: 'Write a 200-word product description for eco-friendly yoga mats targeting busy professionals.',
      bad: 'Write something about yoga mats.',
      explanation: 'The good example is specific about length, product, target audience, and context.'
    }
  },
  {
    id: 'role-definition',
    title: 'Role Definition',
    description: 'Master the art of defining AI roles for better responses',
    difficulty: 'beginner',
    category: 'Fundamentals',
    type: 'hands-on',
    estimatedTime: '20 min',
    prompt: 'Create a role-based prompt for getting marketing advice.',
    solution: `**Role-Based Prompt**:
"You are a senior marketing strategist with 10+ years of experience in digital marketing for small businesses. You specialize in social media marketing and have helped over 100 businesses grow their online presence.

Your task: Provide a comprehensive social media strategy for a local bakery that wants to increase foot traffic and online orders.

Please include:
- Platform recommendations with reasons
- Content strategy for each platform
- Posting frequency suggestions
- Budget considerations for a small business
- Measurable goals and KPIs

Use your experience to provide practical, actionable advice that a busy bakery owner can realistically implement."

**Why this works**:
- Specific expertise level (10+ years)
- Relevant specialization (small businesses, social media)
- Credibility indicators (helped 100+ businesses)
- Clear task definition
- Detailed deliverable requirements
- Context about the client (local bakery)`,
    criteria: [
      'Defines specific expertise level',
      'Includes relevant experience details',
      'Sets clear expectations for the response',
      'Provides context about the situation',
      'Specifies desired output format'
    ],
    hints: [
      'Be specific about the role\'s expertise',
      'Include years of experience or credentials',
      'Mention relevant specializations',
      'Set context for the advice needed'
    ],
    tips: [
      'Roles help AI adopt appropriate tone and expertise',
      'Specific roles lead to more targeted advice',
      'Include context about who needs the help',
      'Define the scope of the role clearly'
    ],
    resources: [
      {
        title: 'Role-Based Prompting',
        type: 'article',
        url: 'https://example.com/role-prompting',
        description: 'How to create effective role definitions for AI'
      }
    ],
    examples: {
      good: 'You are a certified nutritionist with expertise in meal planning for busy families.',
      bad: 'You are an expert.',
      explanation: 'The good example specifies the type of expert, credentials, and area of specialization.'
    }
  }
];
