
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
        good: `<role>Act as a research analyst</role>\n<task>Summarize in exactly 3 sentences</task>\n<structure>1. Main finding 2. Evidence 3. Implications</structure>`,
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
        good: `<persona>You are Dr. Martinez, a pediatrician with 15 years experience</persona>\n<personality>Warm, patient, uses simple analogies</personality>\n<style>Always reassure parents first, then educate</style>`,
        bad: `You are a helpful doctor who gives medical advice.`,
        explanation: 'The good example creates a specific, credible character with defined traits, while the bad example is generic and forgettable.'
      }
    },
    {
      id: 'output-formatting',
      title: 'Advanced Output Formatting',
      description: 'Master the techniques for getting perfectly structured, visually appealing responses',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'hands-on',
      estimatedTime: '18 min',
      prompt: 'Create a prompt that generates a comprehensive product comparison in a structured, easy-to-scan format for busy shoppers.',
      solution: `<role>You are a professional product reviewer</role> for Consumer Reports, known for thorough, unbiased comparisons that help people make informed decisions quickly.

<task>Compare these products and present the analysis in the exact format below</task>

<output-format>
# 🏆 Winner: [PRODUCT_NAME] - [BRIEF_REASON]

## 📊 Quick Comparison

| Feature | [Product A] | [Product B] | [Product C] |
|---------|-------------|-------------|-------------|
| **Price** | $X | $Y | $Z |
| **Rating** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Best For** | [Use case] | [Use case] | [Use case] |

## 🔍 Detailed Analysis

### [Product A Name]
**✅ Pros:**
- [Strength 1]: [Brief explanation]
- [Strength 2]: [Brief explanation]
- [Strength 3]: [Brief explanation]

**❌ Cons:**
- [Weakness 1]: [Brief explanation]
- [Weakness 2]: [Brief explanation]

**💰 Value Score: [X/10]**
**🎯 Best For:** [Specific user type/scenario]

### [Product B Name]
[Same format as above]

### [Product C Name]
[Same format as above]

## 🛒 Purchase Recommendations

**🥇 Best Overall:** [Product] - [Why]
**💸 Best Value:** [Product] - [Why] 
**🚀 Best Premium:** [Product] - [Why]

## ❓ Decision Helper
Choose [Product A] if: [Specific criteria]
Choose [Product B] if: [Specific criteria]
Choose [Product C] if: [Specific criteria]
</output-format>

<quality-guidelines>
- Keep pros/cons to 3 items max for scannability
- Use specific numbers and data when possible
- Focus on practical benefits that matter to users
- Maintain consistent rating criteria across all products
- Include price-performance analysis in recommendations
</quality-guidelines>

Products to compare: [PRODUCT_LIST]`,
      criteria: [
        'Uses clear visual formatting with headers and emojis',
        'Includes structured comparison table for quick scanning',
        'Provides consistent format for each product analysis',
        'Offers specific purchase recommendations for different needs',
        'Includes decision-making framework for users'
      ],
      hints: [
        'Use emojis and visual elements to make content more scannable',
        'Create tables for quick comparison of key features',
        'Keep pros/cons lists short - 3 items maximum for readability',
        'Always include specific recommendations for different user types'
      ],
      tips: [
        'Visual formatting dramatically improves content usability',
        'Consistent structure helps users find information quickly',
        'Decision frameworks reduce choice paralysis',
        'Specific recommendations are more helpful than generic advice'
      ],
      resources: [
        {
          title: 'Markdown Mastery Guide',
          type: 'tool',
          url: 'https://example.com/markdown-guide',
          description: 'Complete reference for formatting text beautifully'
        },
        {
          title: 'UX Writing for AI',
          type: 'article',
          url: 'https://example.com/ux-ai-writing',
          description: 'How to structure AI outputs for maximum usability'
        }
      ],
      examples: {
        good: `<format># Winner: Product A\n## Comparison Table\n| Feature | A | B |\n**Best For:** [specific use]</format>`,
        bad: `Compare these products and tell me which is better.`,
        explanation: 'The good example provides exact formatting structure with visual elements, while the bad example gives no guidance on presentation.'
      }
    },
    {
      id: 'context-setting',
      title: 'Strategic Context Setting',
      description: 'Learn to provide rich context that dramatically improves AI understanding and output quality',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'analysis',
      estimatedTime: '22 min',
      prompt: 'Create a context-rich prompt for generating a professional email that addresses a complex workplace situation.',
      solution: `<scenario-analysis>
Workplace situation: [DESCRIBE_SITUATION]
Stakeholders involved: [LIST_KEY_PEOPLE_AND_ROLES]
Desired outcome: [SPECIFIC_GOAL]
Potential sensitivities: [ISSUES_TO_NAVIGATE]
Company culture: [FORMAL/CASUAL/COLLABORATIVE/HIERARCHICAL]
</scenario-analysis>

<role>You are an experienced corporate communications specialist</role> who has successfully navigated similar workplace challenges for Fortune 500 companies.

<context>
This email is critical for:
- Maintaining professional relationships
- Achieving a specific business outcome
- Navigating organizational politics diplomatically
- Setting precedent for future similar situations
</context>

<email-framework>
**Subject Line Strategy:**
- Clear, specific, and action-oriented
- Avoid inflammatory or accusatory language
- Include timeline if urgent

**Opening:**
- Acknowledge the recipient's perspective/constraints
- Reference shared goals or previous positive interactions
- Set collaborative tone from the start

**Body Structure:**
1. **Situation Summary:** Neutral, fact-based description
2. **Impact Analysis:** How this affects shared objectives
3. **Proposed Solution:** Specific, actionable steps
4. **Mutual Benefits:** What's in it for all parties
5. **Next Steps:** Clear timeline and expectations

**Closing:**
- Reaffirm commitment to shared success
- Offer to discuss further if needed
- Professional but warm sign-off
</email-framework>

<tone-guidelines>
- Professional yet approachable
- Solution-focused rather than problem-focused
- Collaborative language ("we," "our," "together")
- Acknowledge constraints and challenges
- Emphasize shared objectives and mutual benefits
</tone-guidelines>

<red-flags-to-avoid>
- Blame language or accusatory tone
- Ultimatums or threats
- Overwhelming detail in first communication
- Emotional language or personal comments
- One-sided demands without considering other perspectives
</red-flags-to-avoid>

Generate email for this situation:
Situation details: [SPECIFIC_WORKPLACE_SCENARIO]
Recipient: [PERSON_AND_RELATIONSHIP]
Objective: [DESIRED_OUTCOME]`,
      criteria: [
        'Provides comprehensive situational analysis framework',
        'Includes specific guidance for email structure and tone',
        'Addresses potential sensitivities and workplace dynamics',
        'Offers clear guidelines for what to avoid',
        'Considers multiple stakeholder perspectives'
      ],
      hints: [
        'Always analyze the full situation before writing - who\'s involved, what\'s at stake?',
        'Professional emails need structure - opening, body, closing with specific purposes',
        'Consider workplace culture and hierarchy in your tone and approach',
        'Focus on solutions and mutual benefits rather than problems and blame'
      ],
      tips: [
        'Comprehensive context leads to much more appropriate responses',
        'Email frameworks prevent important elements from being missed',
        'Stakeholder analysis helps navigate complex workplace dynamics',
        'Solution-focused language builds bridges rather than walls'
      ],
      resources: [
        {
          title: 'Corporate Communication Strategies',
          type: 'article',
          url: 'https://example.com/corp-communication',
          description: 'Best practices for professional workplace communication'
        },
        {
          title: 'Difficult Conversations Toolkit',
          type: 'tool',
          url: 'https://example.com/difficult-conversations',
          description: 'Templates and strategies for challenging workplace discussions'
        }
      ],
      examples: {
        good: `<context>Situation: Budget dispute\nStakeholders: Manager, Finance, Team\nGoal: Secure resources\nSensitivities: Company layoffs</context>`,
        bad: `Write an email about the budget problem.`,
        explanation: 'The good example provides rich context about situation, people, and dynamics, while the bad example lacks any situational awareness.'
      }
    },
    {
      id: 'example-driven',
      title: 'Example-Powered Prompting',
      description: 'Harness the power of examples to train AI exactly how you want it to respond',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'creative',
      estimatedTime: '25 min',
      prompt: 'Design a prompt system that uses multiple examples to teach AI how to write engaging social media content for different platforms.',
      solution: `<role>You are a viral content strategist</role> who has generated millions of views across social platforms and understands the unique requirements of each platform.

<platform-analysis>
Platform: [INSTAGRAM/LINKEDIN/TWITTER/TIKTOK]
Content type: [POST_TYPE]
Target audience: [DEMOGRAPHIC_DESCRIPTION]
Goal: [ENGAGEMENT/AWARENESS/CONVERSION]
</platform-analysis>

<example-library>

**Example 1: Behind-the-Scenes Content (Instagram)**
📸 Post: Messy desk with coffee and planning notes
📝 Caption: "Monday morning reality check ☕️ 

My 'organized chaos' productivity system is in full swing today. Some people have pristine desks... I have creative tornadoes 🌪️

What does YOUR workspace look like right now? Drop a 📸 below - let's normalize the beautiful mess of getting things done! 

No judgment zone here 👇

#MondayMotivation #WorkspaceReality #CreativeProcess #ProductivityTips"

**Analysis:** Hook (reality check), relatability (messy desk), community building (photo request), hashtag strategy

**Example 2: Educational Content (LinkedIn)**
📊 Post: Industry insights infographic
📝 Caption: "3 data-driven insights that changed how I approach client retention:

→ 89% of customers leave due to poor communication, not product issues
→ A 5% increase in retention can boost profits by 25-95%
→ Existing customers spend 67% more than new acquisitions

The takeaway? Invest in relationships, not just acquisition.

What's your most effective retention strategy? Share below 👇

#CustomerRetention #BusinessGrowth #DataDriven"

**Analysis:** Numbered insights, specific data, professional tone, networking question

**Example 3: Trend Commentary (Twitter)**
🐦 Tweet: "That moment when AI writes better code comments than most senior developers... 

We're living in interesting times 🤖

What's the weirdest thing AI has done better than you expected?"

**Analysis:** Relatable observation, emoji for personality, engaging question, trending topic

</example-library>

<content-formula>
1. **Hook** (first 5-7 words that stop the scroll)
2. **Value/Story** (educate, entertain, or inspire)
3. **Personal Touch** (authentic detail or vulnerability)
4. **Community Element** (question or call-to-action)
5. **Platform Optimization** (hashtags, mentions, format)
</content-formula>

<voice-guidelines>
- Authentic and conversational (write like you talk)
- Value-first approach (what's in it for them?)
- Emotionally intelligent (acknowledge feelings/struggles)
- Action-oriented (give people something to do)
- Platform-native (respect each platform's culture)
</voice-guidelines>

Now create content for:
Platform: [SPECIFIC_PLATFORM]
Topic: [CONTENT_TOPIC]
Audience: [TARGET_AUDIENCE]
Goal: [SPECIFIC_OBJECTIVE]`,
      criteria: [
        'Provides multiple high-quality examples across different platforms',
        'Analyzes what makes each example effective',
        'Includes a clear formula that can be applied consistently',
        'Addresses platform-specific requirements and culture',
        'Balances strategy with authenticity and engagement'
      ],
      hints: [
        'Examples are worth more than explanations - show exactly what good looks like',
        'Break down why each example works to reinforce learning patterns',
        'Include variety to show how principles adapt to different situations',
        'Provide formulas that can be repeatedly applied for consistency'
      ],
      tips: [
        'Multiple examples teach patterns better than single instances',
        'Platform-specific examples show cultural awareness',
        'Analysis helps AI understand underlying principles',
        'Formulas provide structure while maintaining creativity'
      ],
      resources: [
        {
          title: 'Platform-Specific Content Guide',
          type: 'article',
          url: 'https://example.com/platform-content',
          description: 'Best practices for content creation across all major platforms'
        },
        {
          title: 'Viral Content Formula Database',
          type: 'example',
          url: 'https://example.com/viral-formulas',
          description: '50+ proven content templates that drive engagement'
        }
      ],
      examples: {
        good: `**Example 1:** [specific post]\n**Analysis:** Hook + value + CTA\n**Example 2:** [different approach]\n**Formula:** 1. Hook 2. Value 3. Action`,
        bad: `Write engaging social media posts that get likes and shares.`,
        explanation: 'The good example provides specific templates with analysis, while the bad example is vague and gives no concrete guidance.'
      }
    },
    {
      id: 'constraint-mastery',
      title: 'Creative Constraint Design',
      description: 'Learn how smart constraints unlock creativity and produce consistently excellent results',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'hands-on',
      estimatedTime: '20 min',
      prompt: 'Create a constraint-based prompt for generating innovative business ideas within specific parameters.',
      solution: `<creative-constraints-framework>
You are an innovation consultant who specializes in breakthrough thinking within real-world limitations.
</creative-constraints-framework>

<constraint-categories>

**Resource Constraints:**
- Budget limit: [SPECIFIC_AMOUNT]
- Time to launch: [TIMEFRAME]
- Team size: [NUMBER_OF_PEOPLE]
- Required skills: [EXPERTISE_AVAILABLE]

**Market Constraints:**
- Target market: [SPECIFIC_DEMOGRAPHIC]
- Geographic focus: [LOCATION_LIMITS]
- Competition level: [HIGH/MEDIUM/LOW]
- Regulatory requirements: [COMPLIANCE_NEEDS]

**Innovation Constraints:**
- Technology requirements: [MUST_USE/CANNOT_USE]
- Sustainability requirements: [ENVIRONMENTAL_GOALS]
- Social impact goals: [COMMUNITY_BENEFITS]
- Scalability needs: [GROWTH_EXPECTATIONS]

</constraint-categories>

<ideation-process>

**Phase 1: Constraint Analysis (5 minutes)**
- List all constraints as creative opportunities
- Identify which constraints are flexible vs. fixed
- Find unexpected connections between different constraints

**Phase 2: Focused Brainstorming (15 minutes)**
Generate exactly 10 business ideas that:
✅ Work within ALL specified constraints
✅ Turn at least one constraint into a competitive advantage
✅ Address a real problem for the target market
✅ Can be validated within 30 days

**Phase 3: Constraint Optimization (10 minutes)**
For the top 3 ideas, show how constraints actually:
- Reduce competition by creating unique positioning
- Lower costs through focused approach  
- Accelerate development by limiting scope
- Increase customer appeal through specialization

</ideation-process>

<output-format>
## 🎯 Constraint-Driven Business Ideas

**Constraints Summary:**
[Bullet list of key limitations]

**Top 10 Ideas:**

### 1. [Business Idea Name]
**Problem Solved:** [Specific customer pain point]
**Constraint Advantage:** [How limitation becomes strength]
**30-Day Validation:** [Specific test you can run]
**Revenue Model:** [How money flows in]

[Repeat for ideas 2-10]

**🏆 Top 3 Deep Dive:**
[Detailed analysis of how constraints create advantages]

**🚀 Next Steps:**
[Specific actions to validate top idea within constraints]
</output-format>

<quality-standards>
- Each idea must be immediately actionable
- Show clear path from constraint to competitive advantage
- Include specific validation methods
- Focus on problems people will pay to solve
- Demonstrate understanding of target market
</quality-standards>

Generate ideas for:
Industry: [SPECIFIC_INDUSTRY]
Constraints: [DETAILED_LIMITATIONS]
Market: [TARGET_CUSTOMER_PROFILE]`,
      criteria: [
        'Transforms constraints into creative opportunities',
        'Provides systematic ideation process with time limits',
        'Requires specific number of ideas for comprehensive exploration',
        'Shows how constraints become competitive advantages',
        'Includes validation framework for practical next steps'
      ],
      hints: [
        'Constraints focus creativity rather than limiting it - embrace them as features',
        'Set specific numbers (10 ideas) to push beyond obvious solutions',
        'Show how limitations can become your unique selling proposition',
        'Always include validation steps to test ideas quickly and cheaply'
      ],
      tips: [
        'Creative constraints often produce more innovative solutions than complete freedom',
        'Specific limitations force unique approaches that competitors can\'t easily copy',
        'Time-boxed brainstorming prevents overthinking and encourages rapid ideation',
        'Constraint-advantage thinking reveals hidden opportunities in apparent limitations'
      ],
      resources: [
        {
          title: 'Creative Constraints in Innovation',
          type: 'article',
          url: 'https://example.com/creative-constraints',
          description: 'How limitations drive breakthrough thinking in business'
        },
        {
          title: 'Rapid Business Validation Toolkit',
          type: 'tool',
          url: 'https://example.com/validation-toolkit',
          description: 'Methods for testing business ideas quickly and affordably'
        }
      ],
      examples: {
        good: `<constraints>Budget: $5K, Time: 3 months, Must be digital</constraints>\n<process>10 ideas in 15 min, show advantage</process>\n<validation>30-day test plan</validation>`,
        bad: `Come up with some good business ideas.`,
        explanation: 'The good example provides specific limitations and structured process, while the bad example has no boundaries or framework.'
      }
    },
    {
      id: 'feedback-systems',
      title: 'Feedback-Driven Improvement',
      description: 'Design prompts that create continuous improvement loops for iterative excellence',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'analysis',
      estimatedTime: '28 min',
      prompt: 'Create a comprehensive feedback and iteration system for improving marketing campaigns.',
      solution: `<role>You are a data-driven marketing strategist</role> who believes in continuous testing and optimization based on real customer feedback and performance metrics.

<campaign-analysis-framework>

**Current Campaign Assessment:**
Campaign: [CAMPAIGN_NAME]
Objective: [PRIMARY_GOAL]
Target audience: [DEMOGRAPHIC_PROFILE]
Budget: [TOTAL_SPEND]
Duration: [TIME_PERIOD]
Channels: [MARKETING_CHANNELS]

**Performance Metrics:**
- Reach: [IMPRESSIONS/VIEWS]
- Engagement: [CLICKS/INTERACTIONS]
- Conversion: [SALES/SIGNUPS]
- Cost efficiency: [CPA/ROAS]
- Audience feedback: [COMMENTS/REVIEWS]

</campaign-analysis-framework>

<systematic-improvement-process>

**Phase 1: Data Collection & Analysis**
Gather feedback from 5 sources:
1. **Quantitative Metrics:** CTR, conversion rates, engagement rates
2. **Customer Surveys:** Direct feedback from target audience (min 100 responses)
3. **Social Listening:** Comments, mentions, sentiment analysis
4. **Competitor Analysis:** What's working in your space
5. **Team Insights:** Internal observations and ideas

**Phase 2: Problem Identification**
Rank issues by impact and difficulty:
- 🔴 High Impact, Easy Fix (do immediately)
- 🟡 High Impact, Hard Fix (plan carefully)
- 🟢 Low Impact, Easy Fix (quick wins)
- ⚫ Low Impact, Hard Fix (ignore for now)

**Phase 3: Hypothesis-Driven Testing**
For each improvement, create:
- **Hypothesis:** "If we change [X], then [Y] will improve because [Z]"
- **Test Design:** A/B test with clear variables
- **Success Metrics:** Specific numbers that indicate improvement
- **Timeline:** Duration needed to gather significant data

**Phase 4: Implementation & Monitoring**
- Test one variable at a time for clear results
- Monitor daily for first week, then weekly
- Set automatic alerts for significant changes
- Document everything for future reference

</systematic-improvement-process>

<optimization-framework>

**Creative Optimization:**
- Headlines: Test 3 variations focusing on different benefits
- Visuals: Test 3 different styles (lifestyle, product, data)
- Copy: Test 3 emotional approaches (fear, desire, logic)
- CTA: Test 3 action words and 3 colors

**Targeting Optimization:**
- Audience segments: Test broader vs. narrower targeting
- Demographics: Test different age ranges and interests
- Behaviors: Test different purchase behavior patterns
- Custom audiences: Test lookalikes vs. retargeting

**Channel Optimization:**
- Platform performance: Reallocate budget to best performers
- Content format: Test video vs. image vs. text
- Posting times: Test different days and hours
- Frequency: Test different exposure levels

</optimization-framework>

<feedback-integration-system>

**Weekly Review Process:**
1. **Performance Dashboard:** Review all key metrics
2. **Feedback Analysis:** Categorize and prioritize customer input
3. **Test Results:** Analyze completed A/B tests
4. **Strategic Adjustments:** Update campaign based on learnings
5. **Next Week Planning:** Set new tests and improvements

**Monthly Strategic Review:**
- Overall campaign effectiveness vs. goals
- Budget reallocation recommendations
- Long-term trend analysis
- Competitive positioning updates
- Next month's innovation priorities

**Quarterly Campaign Evolution:**
- Complete campaign refresh based on learnings
- New creative concepts incorporating feedback
- Audience strategy refinement
- Channel mix optimization
- Goal setting for next quarter

</feedback-integration-system>

Analyze and optimize this campaign:
Campaign details: [SPECIFIC_CAMPAIGN_INFO]
Current performance: [METRICS_DATA]
Available budget for testing: [OPTIMIZATION_BUDGET]`,
      criteria: [
        'Creates systematic data collection from multiple sources',
        'Provides framework for prioritizing improvements by impact',
        'Includes hypothesis-driven testing methodology',
        'Establishes regular review and optimization cycles',
        'Integrates feedback into strategic decision-making'
      ],
      hints: [
        'Collect feedback from multiple sources - data alone isn\'t enough',
        'Prioritize improvements by impact vs. effort to maximize results',
        'Test one variable at a time to get clear, actionable insights',
        'Create regular review cycles to ensure continuous improvement'
      ],
      tips: [
        'Systematic feedback collection reveals insights missed by data alone',
        'Hypothesis-driven testing produces faster, more reliable improvements',
        'Regular optimization cycles prevent campaigns from becoming stale',
        'Multiple feedback sources provide comprehensive understanding'
      ],
      resources: [
        {
          title: 'Marketing Analytics Mastery',
          type: 'article',
          url: 'https://example.com/marketing-analytics',
          description: 'Complete guide to data-driven marketing optimization'
        },
        {
          title: 'A/B Testing Toolkit',
          type: 'tool',
          url: 'https://example.com/ab-testing',
          description: 'Templates and calculators for marketing experiments'
        }
      ],
      examples: {
        good: `**Hypothesis:** If we change headline to benefit-focused, CTR will increase 15% because audience wants outcomes\n**Test:** A/B test 3 headlines\n**Metrics:** CTR, conversion, cost per lead`,
        bad: `Look at the data and make the campaign better.`,
        explanation: 'The good example provides specific hypothesis, test design, and success metrics, while the bad example offers no structure or methodology.'
      }
    },
    {
      id: 'advanced-structuring',
      title: 'Advanced Response Structuring',
      description: 'Master complex prompt architectures that handle multi-faceted tasks with precision',
      difficulty: 'beginner',
      category: 'Foundation',
      type: 'hands-on',
      estimatedTime: '30 min',
      prompt: 'Design a comprehensive prompt system for creating a complete business plan that adapts to different industries and business models.',
      solution: `<role>You are a senior business consultant</role> with 20+ years of experience helping entrepreneurs and corporations develop successful business strategies across diverse industries.

<business-plan-architecture>

**Phase 1: Business Foundation Analysis**
<foundation>
Industry: [SPECIFIC_INDUSTRY]
Business model: [B2B/B2C/MARKETPLACE/SAAS/PRODUCT/SERVICE]
Stage: [STARTUP/GROWTH/EXPANSION/PIVOT]
Target market: [DEMOGRAPHIC_GEOGRAPHIC_PSYCHOGRAPHIC]
Unique value proposition: [CORE_DIFFERENTIATOR]
</foundation>

**Phase 2: Market & Competitive Intelligence**
<market-analysis>
Market size: [TAM/SAM/SOM analysis]
Growth trends: [5-year market trajectory]
Customer segments: [3-5 distinct user groups]
Competitive landscape: [Direct/indirect competitors]
Market gaps: [Unmet needs and opportunities]
</market-analysis>

**Phase 3: Strategic Framework Development**
<strategy>
Vision: [Long-term aspirational goal]
Mission: [Purpose and core function]
Values: [Operating principles]
Objectives: [3-year measurable goals]
Key strategies: [How objectives will be achieved]
</strategy>

</business-plan-architecture>

<adaptive-sections>

**For Product-Based Businesses:**
- Product development roadmap
- Manufacturing and supply chain
- Inventory management strategy
- Quality control processes

**For Service-Based Businesses:**
- Service delivery methodology
- Client onboarding process
- Quality assurance framework
- Scalability planning

**For Technology Businesses:**
- Technical architecture overview
- Development timeline and milestones
- Data security and privacy measures
- Intellectual property strategy

**For Marketplace Businesses:**
- Two-sided market development
- Network effects strategy
- Platform governance model
- Revenue sharing framework

</adaptive-sections>

<comprehensive-business-plan-structure>

## Executive Summary (2 pages)
- Business concept and opportunity
- Market analysis highlight
- Competitive advantage
- Financial projections summary
- Funding requirements

## Company Description (3 pages)
- Mission, vision, and values
- Company history and ownership
- Legal structure and location
- Products/services overview

## Market Analysis (5 pages)
- Industry overview and trends
- Target market definition
- Customer analysis and personas
- Competitive analysis
- Market size and growth projections

## Organization & Management (2 pages)
- Organizational structure
- Management team profiles
- Personnel plan and hiring strategy
- Advisory board and key partnerships

## Products/Services (4 pages)
- Detailed product/service descriptions
- Development status and roadmap
- Intellectual property and legal considerations
- Quality control and customer service

## Marketing & Sales Strategy (4 pages)
- Market positioning and branding
- Pricing strategy and revenue model
- Sales process and customer acquisition
- Marketing channels and tactics
- Customer retention strategy

## Operations Plan (3 pages)
- Production/service delivery process
- Technology and equipment requirements
- Supplier relationships and partnerships
- Quality control measures

## Financial Projections (5 pages)
- Revenue and expense forecasts (3-5 years)
- Cash flow projections
- Break-even analysis
- Funding requirements and use of funds
- Financial controls and reporting

## Risk Analysis (2 pages)
- Market and competitive risks
- Operational and financial risks
- Mitigation strategies
- Contingency planning

## Implementation Timeline (1 page)
- Key milestones and deadlines
- Critical path activities
- Resource allocation schedule
- Success metrics and KPIs

</comprehensive-business-plan-structure>

<quality-standards>

**Content Requirements:**
- All financial projections must include assumptions
- Market data must be from credible sources (last 2 years)
- Competitive analysis must cover at least 5 competitors
- Customer personas must be based on research, not assumptions
- Implementation timeline must be realistic and detailed

**Presentation Standards:**
- Professional formatting with consistent headers
- Charts and graphs for all numerical data
- Executive summary must stand alone as complete overview
- Each section must have clear takeaways and next steps
- Document must be 25-35 pages total length

</quality-standards>

<customization-prompts>

**Industry-Specific Deep Dives:**
- Manufacturing: Include detailed production costs and supply chain analysis
- Retail: Focus on inventory management and customer experience
- Technology: Emphasize scalability and technical requirements
- Service: Highlight human capital and delivery methodology
- Healthcare: Address regulatory compliance and patient outcomes

**Business Model Adaptations:**
- Subscription: Lifetime value calculations and churn analysis
- Marketplace: Network effects and user acquisition costs
- Franchise: Territory analysis and franchisee support
- E-commerce: Digital marketing and fulfillment strategy

</customization-prompts>

Create a comprehensive business plan for:
Business concept: [DETAILED_DESCRIPTION]
Industry: [SPECIFIC_INDUSTRY]
Target market: [CUSTOMER_PROFILE]
Business model: [REVENUE_APPROACH]
Funding needs: [CAPITAL_REQUIREMENTS]`,
      criteria: [
        'Provides comprehensive business plan structure with specific page counts',
        'Adapts content based on industry and business model type',
        'Includes quality standards and content requirements',
        'Covers all essential business plan components',
        'Balances thoroughness with practical usability'
      ],
      hints: [
        'Complex prompts need clear phases to prevent overwhelm',
        'Industry-specific adaptations show you understand different business needs',
        'Specific requirements (page counts, data sources) ensure professional quality',
        'Quality standards prevent generic or superficial output'
      ],
      tips: [
        'Structured architecture handles complex multi-part tasks effectively',
        'Adaptive sections customize output for specific business types',
        'Quality standards ensure professional-grade deliverables',
        'Comprehensive frameworks reduce the need for multiple revisions'
      ],
      resources: [
        {
          title: 'Business Plan Template Library',
          type: 'tool',
          url: 'https://example.com/business-plan-templates',
          description: 'Industry-specific business plan templates and examples'
        },
        {
          title: 'Financial Modeling for Startups',
          type: 'article',
          url: 'https://example.com/financial-modeling',
          description: 'How to create realistic financial projections and assumptions'
        }
      ],
      examples: {
        good: `<architecture>Phase 1: Foundation\nPhase 2: Market Analysis\nPhase 3: Strategy</architecture>\n<adaptive>For SaaS: technical architecture\nFor retail: inventory management</adaptive>`,
        bad: `Write a business plan with all the important sections.`,
        explanation: 'The good example provides clear structure and industry adaptations, while the bad example lacks specificity and guidance.'
      }
    }
  ],
  intermediate: [
    {
      id: 'chain-of-thought',
      title: 'Chain-of-Thought Reasoning',
      description: 'Master systematic thinking processes for complex analytical tasks',
      difficulty: 'intermediate',
      category: 'Advanced Techniques',
      type: 'analysis',
      estimatedTime: '25 min',
      prompt: 'Design a prompt that guides AI through complex problem-solving using structured reasoning chains.',
      solution: `<role>You are a strategic problem-solving consultant</role> who specializes in breaking down complex challenges into manageable, logical steps.

<reasoning-framework>
For this problem: [PROBLEM_STATEMENT]

Use this systematic reasoning approach:

**Step 1: Problem Decomposition**
- What exactly is being asked?
- What are the key components or sub-problems?
- What information do I have, and what's missing?
- What assumptions might I need to make?

**Step 2: Analysis Framework**
- What analytical approach is most appropriate? (cause-effect, cost-benefit, risk-reward, etc.)
- What factors should I consider and prioritize?
- How do these factors interact with each other?
- What are the potential consequences of different approaches?

**Step 3: Solution Development**
- Generate 3-5 potential solutions
- For each solution, consider: feasibility, resources needed, timeline, risks
- What are the pros and cons of each approach?
- How would I test or validate each solution?

**Step 4: Decision Logic**
- What criteria should guide the final decision?
- How do the solutions perform against these criteria?
- What are the implementation steps for the chosen solution?
- What could go wrong, and how would I mitigate those risks?

**Step 5: Validation & Refinement**
- Does this solution address the original problem completely?
- Have I considered all stakeholders and their perspectives?
- What would need to happen for this solution to succeed?
- How would I measure success and adjust if needed?
</reasoning-framework>

Show your reasoning process step-by-step, making your thinking transparent at each stage.`,
      criteria: [
        'Provides systematic step-by-step reasoning framework',
        'Requires explicit thinking at each stage',
        'Includes validation and verification steps',
        'Addresses complex multi-faceted problems',
        'Demonstrates transparent logical progression'
      ],
      hints: [
        'Break complex problems into smaller, manageable components',
        'Make your reasoning process explicit and transparent',
        'Consider multiple solutions before settling on one',
        'Always validate your conclusion against the original problem'
      ],
      tips: [
        'Structured reasoning prevents overlooking important factors',
        'Step-by-step thinking improves solution quality',
        'Transparent processes allow for better verification',
        'Multiple solution consideration leads to better outcomes'
      ],
      resources: [
        {
          title: 'Systems Thinking Guide',
          type: 'article',
          url: 'https://example.com/systems-thinking',
          description: 'Framework for analyzing complex, interconnected problems'
        }
      ]
    }
  ],
  advanced: [
    {
      id: 'rag-system-design',
      title: 'RAG System Architecture',
      description: 'Design comprehensive retrieval-augmented generation systems for production use',
      difficulty: 'advanced',
      category: 'System Design',
      type: 'hands-on',
      estimatedTime: '45 min',
      prompt: 'Architect a complete RAG system with optimization strategies for a specific domain.',
      solution: `<role>You are a senior ML systems architect</role> with expertise in designing enterprise-scale RAG implementations for production environments.

<system-requirements>
Domain: [SPECIFIC_DOMAIN]
Scale: [DOCUMENT_COUNT/USER_COUNT]
Performance targets: [LATENCY/ACCURACY_REQUIREMENTS]
Budget constraints: [INFRASTRUCTURE_BUDGET]
</system-requirements>

<comprehensive-architecture>

**1. Data Ingestion Pipeline**
- Document processing: [PARSERS, CLEANING, CHUNKING_STRATEGY]
- Embedding generation: [MODEL_CHOICE, BATCH_PROCESSING, VERSIONING]
- Quality control: [VALIDATION_RULES, ERROR_HANDLING, MONITORING]

**2. Vector Database Design**
- Storage strategy: [DATABASE_CHOICE, INDEXING, PARTITIONING]
- Search optimization: [SIMILARITY_METRICS, FILTERING, PERFORMANCE_TUNING]
- Scalability: [SHARDING, REPLICATION, BACKUP_STRATEGY]

**3. Retrieval Engine**
- Query processing: [INTENT_CLASSIFICATION, QUERY_EXPANSION, MULTI_VECTOR_SEARCH]
- Ranking & fusion: [RELEVANCE_SCORING, RESULT_FUSION, DIVERSITY_PROMOTION]
- Context selection: [WINDOW_SIZING, OVERLAP_HANDLING, SOURCE_ATTRIBUTION]

**4. Generation Pipeline**
- Prompt engineering: [SYSTEM_PROMPTS, CONTEXT_INTEGRATION, OUTPUT_FORMATTING]
- LLM integration: [MODEL_SELECTION, PARAMETER_TUNING, FALLBACK_STRATEGIES]
- Quality assurance: [EVALUATION_METRICS, MONITORING, HUMAN_FEEDBACK]

</comprehensive-architecture>

Design this system for: [SPECIFIC_USE_CASE]
Requirements: [TECHNICAL_REQUIREMENTS]
Constraints: [BUSINESS_CONSTRAINTS]`,
      criteria: [
        'Addresses complete system architecture end-to-end',
        'Includes specific technical implementation details',
        'Considers scalability and production requirements',
        'Incorporates quality assurance and monitoring',
        'Handles real-world constraints and optimization'
      ],
      hints: [
        'Consider the entire pipeline from data ingestion to user response',
        'Think about scalability and performance optimization',
        'Include monitoring and quality assurance at every stage',
        'Address real-world constraints like budget and latency'
      ],
      tips: [
        'Production RAG systems require comprehensive architecture',
        'Quality monitoring is essential for maintaining performance',
        'Scalability planning prevents future bottlenecks',
        'Cost optimization balances performance with budget constraints'
      ],
      resources: [
        {
          title: 'RAG System Design Patterns',
          type: 'article',
          url: 'https://example.com/rag-patterns',
          description: 'Proven architectures for production RAG systems'
        }
      ]
    }
  ]
};
