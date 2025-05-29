
import { Exercise } from '../types/Exercise';

export const securityExercises: Exercise[] = [
  {
    id: "sec-1",
    title: "Privacy-Safe Prompt Design",
    description: "Learn to write prompts that protect sensitive information while getting useful results.",
    prompt: "I need help writing a professional email to decline a job offer. Can you help me create a template?",
    difficulty: "beginner",
    hints: [
      "Never include real names, companies, or personal details in your prompts",
      "Use placeholders like [COMPANY_NAME] and [YOUR_NAME]",
      "Focus on the structure and tone rather than specific details"
    ],
    tips: [
      "Always use generic examples instead of real data",
      "Think about what information the AI actually needs to help you",
      "Use brackets [ ] to indicate where personal information would go"
    ],
    solution: `Help me write a professional email template to decline a job offer. The email should:

- Be polite and grateful
- Clearly state the decision
- Keep the door open for future opportunities
- Be concise and professional

Format: Professional email template with placeholders for [COMPANY_NAME], [POSITION_TITLE], and [YOUR_NAME].`,
    evaluationCriteria: [
      "Uses placeholders instead of real information",
      "Clearly specifies the desired outcome",
      "Includes relevant context without personal details",
      "Maintains professional tone"
    ]
  },
  {
    id: "sec-2", 
    title: "Fact-Checking Prompts",
    description: "Design prompts that encourage AI to provide verifiable information and cite sources.",
    prompt: "Tell me about the benefits of meditation.",
    difficulty: "intermediate",
    hints: [
      "Ask for sources and citations",
      "Request specific studies or research",
      "Ask the AI to indicate confidence levels",
      "Request both benefits and limitations"
    ],
    tips: [
      "Always ask for sources when requesting factual information",
      "Ask for both pros and cons to get balanced information",
      "Request confidence levels or uncertainty indicators"
    ],
    solution: `Please provide information about the scientifically-proven benefits of meditation. For each benefit mentioned:

1. Cite specific research studies or meta-analyses
2. Include publication dates and sample sizes when available
3. Indicate the strength of evidence (strong/moderate/limited)
4. Mention any limitations or conflicting findings

Also include:
- Any potential risks or side effects
- Different types of meditation studied
- Recommended duration/frequency based on research

Format the response with clear citations and confidence indicators.`,
    evaluationCriteria: [
      "Requests specific citations and sources",
      "Asks for evidence quality indicators",
      "Seeks balanced perspective including limitations",
      "Specifies desired format for verification"
    ]
  },
  {
    id: "sec-3",
    title: "Bias-Aware Prompt Writing",
    description: "Create prompts that acknowledge and minimize potential AI bias in responses.",
    prompt: "What's the best programming language to learn?",
    difficulty: "intermediate",
    hints: [
      "Acknowledge that 'best' depends on context",
      "Ask for multiple perspectives",
      "Request consideration of different use cases",
      "Ask about potential biases in the response"
    ],
    tips: [
      "Avoid absolute terms like 'best' or 'worst'",
      "Ask for context-dependent recommendations",
      "Request acknowledgment of different viewpoints"
    ],
    solution: `I'm interested in learning programming. Please provide a balanced analysis of programming languages for beginners, considering:

1. Different career paths (web development, data science, mobile apps, etc.)
2. Learning difficulty and time investment
3. Job market demand in different regions
4. Community support and resources

For each language mentioned:
- Explain the specific contexts where it excels
- Note any limitations or challenges
- Acknowledge that recommendations may vary based on individual goals

Please avoid declaring any single language as "the best" and instead focus on helping me understand which might be most suitable for different scenarios. Also mention any potential biases in your recommendations.`,
    evaluationCriteria: [
      "Avoids absolute claims about 'best' options",
      "Requests context-dependent analysis",
      "Asks for acknowledgment of limitations and biases",
      "Seeks multiple perspectives and use cases"
    ]
  },
  {
    id: "sec-4",
    title: "Transparent AI Collaboration",
    description: "Learn to be transparent about AI assistance in your work while maintaining quality.",
    prompt: "Write a report about renewable energy for my university assignment.",
    difficulty: "advanced",
    hints: [
      "Clarify your role vs. AI's role in the work",
      "Ask for guidance on proper attribution",
      "Request help with structure, not content generation",
      "Focus on learning rather than task completion"
    ],
    tips: [
      "Be honest about what parts you want help with",
      "Ask for guidance on how to properly cite AI assistance",
      "Focus on learning and understanding, not just getting answers"
    ],
    solution: `I'm working on a university report about renewable energy and want to use AI assistance ethically. Please help me with:

1. Creating a comprehensive outline and structure
2. Suggesting reliable academic sources to research
3. Identifying key topics I should cover
4. Providing guidance on how to properly cite AI assistance in my work

I want to write the content myself after doing my own research, but I'd like help organizing my approach and ensuring I don't miss important aspects of the topic.

Please also advise on:
- How to transparently acknowledge AI assistance in my report
- Best practices for using AI as a research and writing aid in academic work
- Ways to ensure my final work represents my own understanding and analysis`,
    evaluationCriteria: [
      "Clearly defines the scope of AI assistance requested",
      "Focuses on learning support rather than content generation",
      "Asks for guidance on proper attribution and transparency",
      "Maintains academic integrity while leveraging AI effectively"
    ]
  },
  {
    id: "sec-5",
    title: "Critical Evaluation Prompts",
    description: "Design prompts that help you critically evaluate and verify AI-generated content.",
    prompt: "Explain how blockchain technology works.",
    difficulty: "advanced", 
    hints: [
      "Ask for potential weaknesses in the explanation",
      "Request alternative viewpoints",
      "Ask about common misconceptions",
      "Request ways to verify the information"
    ],
    tips: [
      "Always ask AI to help you verify its own responses",
      "Request counterarguments and alternative perspectives",
      "Ask about common misconceptions in the topic area"
    ],
    solution: `Please explain how blockchain technology works, and then help me critically evaluate your explanation by:

1. Identifying any oversimplifications in your explanation
2. Pointing out common misconceptions about blockchain you may have inadvertently included
3. Suggesting 3-5 authoritative sources where I can verify your explanation
4. Providing counterarguments or criticisms of blockchain technology
5. Explaining what aspects of blockchain are still debated or uncertain

After your explanation, please also:
- List questions I should ask to test my understanding
- Suggest practical ways to verify blockchain concepts (demos, visualizations, etc.)
- Warn me about any potential biases in how blockchain is typically presented

This will help me develop a more nuanced and verified understanding of the technology.`,
    evaluationCriteria: [
      "Requests critical analysis of the AI's own response",
      "Asks for verification methods and sources",
      "Seeks counterarguments and alternative perspectives", 
      "Includes metacognitive elements for learning verification"
    ]
  }
];
