
import { Exercise } from '../types/Exercise';

export const advancedExercises: Exercise[] = [
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

\`\`\`
<role>[Optimized role definition]</role>

<context>[Enhanced context and background]</context>

<task>[Clarified and specific task description]</task>

<methodology>[Step-by-step approach if needed]</methodology>

<output-format>[Detailed format specifications]</output-format>

<quality-criteria>[Success metrics and standards]</quality-criteria>

<examples>[Concrete examples of desired output]</examples>
\`\`\`
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
];
