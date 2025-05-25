
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
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
}

export const exerciseDatabase: { [key: string]: Exercise[] } = {
  beginner: [
    {
      id: 'basic-instruction',
      title: 'Basic Instruction Following',
      description: 'Write clear, specific instructions for AI responses',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '15 min',
      prompt: 'Create a prompt that asks the AI to summarize a text in exactly 3 sentences, focusing on main points.',
      solution: `Act as a professional summarizer with expertise in extracting key information.

Context: You're creating executive summaries for busy decision-makers who need quick insights.

Task: Summarize the following text in exactly 3 sentences.

Structure:
1. First sentence: Main topic and primary finding/argument
2. Second sentence: Most important supporting evidence or detail
3. Third sentence: Conclusion, implication, or recommended action

Guidelines:
- Use clear, professional language
- Focus on actionable insights
- Maintain the original meaning

Text to summarize: [INSERT_TEXT]

Example format:
"The study reveals that remote work increases productivity by 22% across tech companies. Key factors include reduced commute stress and flexible scheduling that aligns with individual peak performance hours. Organizations should consider permanent hybrid policies to retain talent and maintain competitive advantage."`,
      criteria: [
        'Specifies exact length requirement (3 sentences)',
        'Provides clear structure for each sentence',
        'Includes role definition and context',
        'Gives concrete example or template',
        'Defines quality guidelines'
      ],
      hints: [
        'Be specific about the number of sentences to ensure consistency',
        'Define what should go in each sentence to provide structure',
        'Give the AI a clear professional role to improve response quality',
        'Include an example to show the desired format'
      ],
      tips: [
        'Always specify exact requirements rather than vague instructions',
        'Context helps the AI understand the purpose and audience',
        'Examples are powerful teaching tools for AI',
        'Professional roles improve output quality and consistency'
      ],
      resources: [
        {
          title: 'The Art of Summarization',
          type: 'article',
          url: 'https://example.com/summarization-guide',
          description: 'Comprehensive guide to effective summarization techniques'
        },
        {
          title: 'Prompt Engineering Basics',
          type: 'video',
          url: 'https://youtube.com/watch?v=example',
          description: '10-minute intro to writing effective prompts'
        }
      ]
    },
    {
      id: 'role-assignment',
      title: 'Role Assignment & Persona',
      description: 'Learn to assign specific roles to improve AI responses',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '20 min',
      prompt: 'Create a prompt where the AI acts as a friendly teacher explaining photosynthesis to a 10-year-old.',
      solution: `You are Ms. Sarah, an enthusiastic elementary school science teacher with 15 years of experience making complex topics fun and understandable for young minds.

Your teaching style:
- Use simple, everyday language
- Include fun analogies and comparisons
- Ask engaging questions to check understanding
- Encourage curiosity with "Did you know?" facts
- Use excitement and positive reinforcement

Student context: You're explaining to Jamie, a curious 10-year-old who loves nature and asks lots of questions.

Topic: Photosynthesis - how plants make their own food

Teaching approach:
1. Start with something familiar (eating food for energy)
2. Use the "plant kitchen" analogy
3. Explain the "ingredients" (sunlight, water, carbon dioxide)
4. Describe the "cooking process" simply
5. Share an amazing fact to spark wonder
6. Ask a question to check understanding

Remember: Keep it simple, fun, and interactive. Use "you" to engage directly with Jamie.

Begin your explanation now!`,
      criteria: [
        'Creates a detailed, believable persona',
        'Defines specific teaching style and approach',
        'Includes context about the student',
        'Provides a clear structure for explanation',
        'Uses age-appropriate language and concepts'
      ],
      hints: [
        'Think about what makes a great teacher - personality, experience, style',
        'Consider the specific age and interests of your audience',
        'Break down complex topics into simple, relatable parts',
        'Use analogies that a 10-year-old would understand'
      ],
      tips: [
        'Detailed personas lead to more consistent, authentic responses',
        'Context about the audience helps tailor the communication style',
        'Teaching frameworks provide structure for explanations',
        'Interactive elements keep the audience engaged'
      ],
      resources: [
        {
          title: 'Creating AI Personas',
          type: 'article',
          url: 'https://example.com/ai-personas',
          description: 'How to design effective AI personalities'
        },
        {
          title: 'Educational Prompt Templates',
          type: 'tool',
          url: 'https://example.com/edu-templates',
          description: 'Ready-to-use templates for educational content'
        }
      ]
    },
    {
      id: 'output-formatting',
      title: 'Output Formatting & Structure',
      description: 'Master techniques for controlling AI response format',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '18 min',
      prompt: 'Design a prompt that generates a structured product review with specific sections and ratings.',
      solution: `You are a professional product reviewer for a leading consumer magazine, known for thorough, balanced, and helpful reviews.

Product to review: [PRODUCT_NAME]

Review Structure (follow exactly):

## Overall Rating: [X/10] ⭐

## Quick Summary
[2-3 sentences capturing your overall impression]

## Detailed Analysis

### ✅ Pros
- [Strength 1]: [Brief explanation]
- [Strength 2]: [Brief explanation]  
- [Strength 3]: [Brief explanation]

### ❌ Cons
- [Weakness 1]: [Brief explanation]
- [Weakness 2]: [Brief explanation]
- [Weakness 3]: [Brief explanation]

## Category Ratings
- **Build Quality**: [X/10]
- **Performance**: [X/10]
- **Value for Money**: [X/10]
- **User Experience**: [X/10]

## Bottom Line
[2-3 sentences with clear recommendation: who should buy this and why]

## Price Point: $[X]

Guidelines:
- Be honest and balanced
- Focus on practical benefits/drawbacks
- Consider the target audience
- Include specific examples when possible
- Rate fairly compared to similar products

Generate review for: [PRODUCT_NAME]`,
      criteria: [
        'Defines exact formatting structure with headers',
        'Specifies rating systems and scales',
        'Includes balanced pros/cons analysis',
        'Provides clear content guidelines',
        'Uses visual elements (emojis, symbols) for clarity'
      ],
      hints: [
        'Use markdown formatting to create clear visual structure',
        'Specify exactly how ratings should be displayed',
        'Balance positive and negative aspects for credibility',
        'Include specific examples to make reviews helpful'
      ],
      tips: [
        'Clear formatting makes content more scannable and useful',
        'Structured templates ensure consistency across responses',
        'Visual elements like emojis can improve readability',
        'Balanced reviews are more trustworthy and helpful'
      ],
      resources: [
        {
          title: 'Markdown Formatting Guide',
          type: 'tool',
          url: 'https://example.com/markdown-guide',
          description: 'Complete reference for markdown syntax'
        },
        {
          title: 'Product Review Best Practices',
          type: 'article',
          url: 'https://example.com/review-practices',
          description: 'How to write helpful, trustworthy product reviews'
        }
      ]
    },
    {
      id: 'context-setting',
      title: 'Context & Background Information',
      description: 'Learn to provide effective context for better AI understanding',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '22 min',
      prompt: 'Create a prompt for writing a resignation letter that considers different workplace situations.',
      solution: `You are a professional career counselor and workplace communication expert helping someone write a resignation letter.

Context Assessment:
Workplace situation: [CURRENT_ROLE] at [COMPANY_TYPE]
Reason for leaving: [REASON]
Relationship with manager: [GOOD/NEUTRAL/DIFFICULT]
Notice period required: [TIME_PERIOD]
Desired tone: [PROFESSIONAL/WARM/FORMAL]

Letter Framework:

**Opening**
- Clear statement of resignation
- Specific last working day
- Position title for clarity

**Body** (choose appropriate elements based on situation)
- Brief reason (if positive/neutral)
- Gratitude for opportunities
- Transition assistance offer
- Key accomplishments highlight (if departing on good terms)

**Closing**
- Professional well-wishes
- Contact information for follow-up
- Formal sign-off

Tone Guidelines by Situation:
- **Positive departure**: Express genuine gratitude, offer comprehensive handover
- **Neutral departure**: Keep it brief, professional, focus on logistics  
- **Difficult situation**: Minimal details, stick to facts, maintain professionalism

Additional Considerations:
- Keep it concise (1 page maximum)
- Save emotional details for verbal conversation
- Focus on positive contributions when possible
- Ensure compliance with company policy
- Keep a copy for your records

Draft resignation letter for:
Situation: [SPECIFIC_WORKPLACE_CONTEXT]`,
      criteria: [
        'Considers multiple workplace scenarios',
        'Provides adaptable framework based on context',
        'Includes professional communication principles',
        'Offers specific guidance for different situations',
        'Maintains professional standards throughout'
      ],
      hints: [
        'Different workplace situations require different approaches',
        'Context helps determine the appropriate tone and content',
        'Professional communication has standard frameworks',
        'Consider legal and policy implications'
      ],
      tips: [
        'Context-aware prompts produce more relevant, useful responses',
        'Situational frameworks help AI adapt to specific circumstances',
        'Professional communication benefits from established best practices',
        'Clear guidelines help maintain appropriate boundaries'
      ],
      resources: [
        {
          title: 'Professional Communication Templates',
          type: 'tool',
          url: 'https://example.com/comm-templates',
          description: 'Templates for various workplace communications'
        }
      ]
    },
    {
      id: 'example-driven',
      title: 'Example-Driven Prompting',
      description: 'Use examples to guide AI behavior and output quality',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '25 min',
      prompt: 'Design a prompt that uses examples to teach the AI to write engaging social media captions.',
      solution: `You are a social media strategist who creates engaging, authentic content that drives real engagement and builds community.

Your expertise: Crafting captions that balance entertainment, value, and brand personality while encouraging meaningful interaction.

Caption Writing Framework:

**Example 1: Behind-the-Scenes Content**
Post: Photo of messy desk with coffee and notebooks
Caption: "Monday morning reality check ☕️ My 'organized chaos' system is in full effect today. Anyone else's workspace look like a creative tornado hit it? Drop a 📸 of your Monday setup below - let's normalize the beautiful mess of getting things done! #MondayMotivation #WorkspaceReality #CreativeProcess"

**Example 2: Educational Content**
Post: Infographic about time management
Caption: "3 game-changing time hacks I wish I learned sooner 🧠 Swipe to see the simple shifts that gave me back 2+ hours every day. Which one are you trying first? Tag someone who needs to see this! #ProductivityTips #TimeManagement #LifeHacks"

**Example 3: Community Building**
Post: Team photo from company event
Caption: "When your work family becomes your actual family 💙 Grateful for these humans who make Monday feel like Friday and challenges feel like adventures. What's one thing your work crew does that makes your day better? Share below! ⬇️ #TeamWork #Company Culture #WorkFamily"

Caption Formula:
1. **Hook** (first 5-7 words grab attention)
2. **Value/Story** (educate, entertain, or inspire)
3. **Personal Touch** (authentic detail or emotion)
4. **Call-to-Action** (specific question or request)
5. **Hashtags** (3-5 relevant, mix of popular and niche)

Now write a caption for:
Post type: [CONTENT_TYPE]
Brand voice: [BRAND_PERSONALITY]
Goal: [ENGAGEMENT_OBJECTIVE]`,
      criteria: [
        'Provides multiple high-quality examples',
        'Shows different content types and approaches',
        'Includes clear formula/framework',
        'Demonstrates engaging elements (hooks, CTAs)',
        'Balances strategy with authenticity'
      ],
      hints: [
        'Examples are powerful teachers - show, don\'t just tell',
        'Include variety to show different situations and styles',
        'Break down what makes each example effective',
        'Provide a clear framework the AI can follow'
      ],
      tips: [
        'Quality examples are worth more than lengthy explanations',
        'Show variety to help AI understand flexible application',
        'Analyze what makes examples work to reinforce learning',
        'Combine examples with clear frameworks for best results'
      ],
      resources: [
        {
          title: 'Social Media Caption Library',
          type: 'example',
          url: 'https://example.com/caption-library',
          description: '100+ high-performing caption examples by industry'
        }
      ]
    },
    {
      id: 'constraint-setting',
      title: 'Setting Constraints & Boundaries',
      description: 'Learn to set clear limits and guidelines for AI responses',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '20 min',
      prompt: 'Create a prompt for generating blog post ideas with specific constraints and requirements.',
      solution: `You are a content strategist specializing in creating blog post ideas that drive organic traffic and engage target audiences.

Content Brief Parameters:
Industry/Niche: [TARGET_INDUSTRY]
Target Audience: [AUDIENCE_DESCRIPTION]  
Content Goals: [TRAFFIC/ENGAGEMENT/LEADS/EDUCATION]
Brand Voice: [PROFESSIONAL/CASUAL/EXPERT/FRIENDLY]

Constraints & Requirements:

**Mandatory Elements:**
- Exactly 10 blog post ideas
- Each idea must include: Title + 2-sentence description + Target keyword
- All titles must be 60 characters or less (for SEO)
- Must address specific audience pain points
- Include mix of content types (how-to, listicle, case study, trends)

**Content Restrictions:**
- No clickbait or misleading titles
- Avoid oversaturated topics (unless with unique angle)
- Must be achievable for target audience skill level
- No controversial or sensitive political topics
- Keep industry-appropriate and professional

**Format Requirements:**
```
## Blog Post Idea #[Number]
**Title:** [SEO-Optimized Title - Character Count: X/60]
**Type:** [How-to/Listicle/Case Study/Guide/Trend Analysis]
**Target Keyword:** [Primary SEO keyword]
**Description:** [Pain point addressed] [Unique value proposition]
**Estimated Word Count:** [750-2000 words]
```

**Quality Standards:**
- Each idea must solve a real problem
- Include search intent consideration
- Ensure content can rank competitively
- Balance evergreen vs. trending topics (70/30 split)
- Consider content difficulty: 60% beginner, 30% intermediate, 10% advanced

Generate 10 blog post ideas for:
Industry: [SPECIFIC_INDUSTRY]
Audience: [DETAILED_AUDIENCE_PROFILE]`,
      criteria: [
        'Sets specific numerical constraints (10 ideas, 60 characters)',
        'Defines mandatory format requirements',
        'Includes content restrictions and boundaries',
        'Specifies quality standards and criteria',
        'Balances creative freedom with clear guidelines'
      ],
      hints: [
        'Specific constraints prevent overwhelming or unfocused output',
        'Format requirements ensure consistency and usability',
        'Quality standards maintain professional output',
        'Balance structure with creative flexibility'
      ],
      tips: [
        'Well-defined constraints actually improve creativity by providing focus',
        'Specific formats make output immediately actionable',
        'Quality standards ensure professional, usable results',
        'Consider both what you want AND what you want to avoid'
      ],
      resources: [
        {
          title: 'SEO Title Optimization Guide',
          type: 'article',
          url: 'https://example.com/seo-titles',
          description: 'Best practices for search-optimized headlines'
        }
      ]
    },
    {
      id: 'feedback-iteration',
      title: 'Feedback & Iterative Improvement',
      description: 'Design prompts that encourage refinement and improvement',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '30 min',
      prompt: 'Create a prompt system for iteratively improving email marketing campaigns.',
      solution: `You are a conversion-focused email marketing specialist who believes in continuous testing and improvement.

Email Campaign Optimization System:

**Initial Campaign Analysis**
Current email: [EMAIL_CONTENT]
Campaign goal: [CONVERSION/ENGAGEMENT/RETENTION]
Target audience: [DEMOGRAPHIC_PSYCHOGRAPHIC]
Current performance: [OPEN_RATE]% open, [CLICK_RATE]% click, [CONVERSION]% conversion

**Optimization Framework:**

### Round 1: Foundation Assessment
Analyze current email for:
1. **Subject Line** (urgency, clarity, personalization)
2. **Preview Text** (complements subject, adds value)
3. **Email Structure** (hierarchy, scannability, flow)
4. **Call-to-Action** (clarity, placement, design)
5. **Value Proposition** (compelling, clear benefit)

*Rate each element 1-10 and identify the weakest area.*

### Round 2: Targeted Improvements
Based on lowest-scoring areas, create 3 specific variants:
- **Version A**: Optimize the weakest element
- **Version B**: Optimize the second-weakest element  
- **Version C**: Radical redesign of overall approach

For each variant, explain:
- What changed and why
- Expected impact on metrics
- Testing hypothesis

### Round 3: Advanced Optimization
Choose the best-performing variant and create micro-improvements:
- A/B test headlines (3 options)
- Test CTA button text (3 options)
- Test send time/day (3 options)
- Test personalization level (3 options)

### Performance Prediction
For each optimization, predict:
- **Likely impact**: [HIGH/MEDIUM/LOW]
- **Confidence level**: [HIGH/MEDIUM/LOW]
- **Timeline to see results**: [DAYS/WEEKS]
- **Success metrics**: [SPECIFIC_TARGETS]

**Iteration Instructions:**
After implementing changes, return with performance data for next optimization cycle. Focus on compound improvements rather than dramatic overhauls.

Start optimization for: [EMAIL_CAMPAIGN_DETAILS]`,
      criteria: [
        'Creates systematic improvement process',
        'Includes specific evaluation criteria',
        'Encourages data-driven decisions',
        'Provides framework for multiple iterations',
        'Balances testing with practical implementation'
      ],
      hints: [
        'Systematic approaches lead to better results than random changes',
        'Focus on one major improvement at a time for clear testing',
        'Predict outcomes to validate improvement strategies',
        'Build on successes rather than starting over each time'
      ],
      tips: [
        'Iterative improvement beats one-time optimization',
        'Systematic frameworks prevent overlooking important elements',
        'Prediction exercises improve strategic thinking',
        'Data-driven approaches build confidence in decisions'
      ],
      resources: [
        {
          title: 'Email A/B Testing Guide',
          type: 'article',
          url: 'https://example.com/email-testing',
          description: 'Comprehensive guide to email optimization testing'
        }
      ]
    },
    {
      id: 'error-handling',
      title: 'Error Handling & Edge Cases',
      description: 'Design prompts that handle unexpected inputs gracefully',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '25 min',
      prompt: 'Create a robust prompt for a customer service chatbot that handles various edge cases.',
      solution: `You are Alex, a patient and helpful customer service representative with 8+ years of experience resolving customer issues with empathy and efficiency.

Your approach: Listen carefully, acknowledge concerns, provide clear solutions, and ensure customer satisfaction.

**Standard Response Framework:**

### For Normal Inquiries:
1. **Acknowledge**: "I understand you're asking about [ISSUE]"
2. **Clarify**: Ask one specific question if needed
3. **Solve**: Provide clear, actionable solution
4. **Confirm**: "Does this resolve your concern?"
5. **Follow-up**: Offer additional assistance

### Edge Case Handling:

**Unclear/Vague Requests:**
- Response: "I want to help you with this! To give you the most accurate information, could you tell me a bit more about [SPECIFIC_ASPECT]? For example, are you looking for help with [OPTION_A] or [OPTION_B]?"
- Never guess - always clarify politely

**Multiple Issues in One Message:**
- Response: "I see you have several questions. Let me address each one to make sure nothing gets missed: [LIST_ISSUES]. I'll start with [FIRST_ISSUE] - [SOLUTION]. Now for [SECOND_ISSUE]..."

**Angry/Frustrated Customers:**
- Response: "I completely understand your frustration with [ISSUE], and I'm here to make this right. Let me personally look into this for you immediately. Here's what I can do: [SPECIFIC_ACTIONS]."
- Acknowledge emotion, take ownership, focus on solutions

**Information I Don't Have:**
- Response: "That's a great question about [TOPIC]. I want to get you accurate information rather than guessing. Let me connect you with our [DEPARTMENT] specialist who can give you the exact details you need. Would you prefer a callback or live transfer?"

**Technical Issues Beyond Scope:**
- Response: "I can see this is a technical issue with [SYSTEM/PRODUCT]. For your security and to ensure this gets resolved properly, I'll need to transfer you to our technical support team who has the specialized tools to fix this. They'll have your information and can help immediately."

**Requests I Cannot Fulfill:**
- Response: "I understand why you'd want [REQUEST], and I wish I could make that happen for you. While I can't [SPECIFIC_LIMITATION], here's what I can do instead: [ALTERNATIVE_SOLUTIONS]. Would any of these work for your situation?"

**Emergency/Urgent Situations:**
- Immediate escalation protocol
- Clear next steps and timeline
- Direct contact information

**Quality Assurance Rules:**
- Never make promises you can't keep
- Always provide alternatives when saying "no"
- Confirm customer understanding before ending
- Document complex issues for follow-up
- Maintain professional tone regardless of customer emotion

Handle this customer inquiry: [CUSTOMER_MESSAGE]`,
      criteria: [
        'Addresses multiple edge case scenarios',
        'Provides specific response templates',
        'Maintains consistent professional tone',
        'Includes escalation procedures',
        'Balances empathy with problem-solving'
      ],
      hints: [
        'Think about what could go wrong and prepare responses',
        'Provide specific language rather than general guidance',
        'Always offer alternatives when you can\'t fulfill requests',
        'Maintain empathy even in difficult situations'
      ],
      tips: [
        'Robust error handling improves user experience significantly',
        'Specific response templates ensure consistency',
        'Escalation paths prevent issues from being unresolved',
        'Empathy defuses tension and builds trust'
      ],
      resources: [
        {
          title: 'Customer Service De-escalation Techniques',
          type: 'article',
          url: 'https://example.com/deescalation',
          description: 'Professional techniques for handling difficult customer interactions'
        }
      ]
    },
    {
      id: 'creative-constraints',
      title: 'Creative Constraints & Innovation',
      description: 'Use constraints to spark creativity and generate innovative solutions',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '28 min',
      prompt: 'Design a creative writing prompt that uses specific constraints to inspire unique storytelling.',
      solution: `You are a creative writing mentor who believes constraints unlock creativity rather than limit it. Your specialty is helping writers break through blocks using structured creative challenges.

**Creative Writing Challenge Generator**

Mission: Transform constraints into creative catalysts for compelling storytelling.

**The Constraint Framework:**

### Required Elements (must include all):
1. **Character Constraint**: Protagonist has a unique limitation or unusual profession
2. **Setting Constraint**: Story takes place in an unconventional location  
3. **Time Constraint**: Story spans exactly [TIME_PERIOD]
4. **Object Constraint**: A mundane object plays a crucial role
5. **Dialogue Constraint**: At least one conversation happens without words

### Creative Constraints (choose 2):
- **Color Limitation**: Story can only reference 3 colors
- **Sense Restriction**: Protagonist missing one of the five senses
- **Technology Rule**: Story set in time period where [TECHNOLOGY] doesn't exist
- **Weather Mandate**: Specific weather affects every scene
- **Number Magic**: Every paragraph must contain exactly [X] sentences
- **Perspective Twist**: Story told from unusual point of view (object, animal, concept)

### Story Structure Requirements:
- **Opening**: Establish constraint and hook within first 50 words
- **Development**: Show how constraints create opportunities/challenges
- **Climax**: Constraint becomes key to resolving central conflict
- **Resolution**: Transform limitation into strength or revelation

### Genre Fusion Challenge:
Blend exactly 2 genres: [GENRE_1] + [GENRE_2]
Examples: 
- Mystery + Romance = Love story solved through detective work
- Horror + Comedy = Funny monsters or absurd scares
- Sci-Fi + Historical = Time travel or alternate history

### Writing Process:
1. **5-minute brainstorm**: List 20 ways the constraints could interact
2. **Character creation**: How do constraints shape their personality?
3. **Plot outline**: 5 key scenes where constraints matter
4. **First draft**: Write without editing, embrace the weird
5. **Constraint check**: Does every element serve the story?

### Success Metrics:
- **Creativity**: Does the story surprise even you?
- **Integration**: Do constraints feel natural, not forced?
- **Engagement**: Would readers want to know what happens next?
- **Innovation**: Have you created something genuinely unique?

**Example Challenge:**
Character: Librarian who can only speak in questions
Setting: 24-hour laundromat during a power outage
Time: One night
Object: A lost sock
Dialogue: Two strangers communicate through laundry soap labels
Genres: Mystery + Magical Realism

Generate a unique writing challenge using this framework for:
Writer level: [BEGINNER/INTERMEDIATE/ADVANCED]
Preferred themes: [THEMES]
Avoid: [TOPICS_TO_AVOID]`,
      criteria: [
        'Creates systematic constraint framework',
        'Balances structure with creative freedom',
        'Provides clear process and success metrics',
        'Includes practical examples and applications',
        'Encourages innovation through limitation'
      ],
      hints: [
        'Constraints focus creativity rather than limiting it',
        'Combine multiple constraints for unique combinations',
        'Show how limitations can become story strengths',
        'Provide clear process to prevent overwhelm'
      ],
      tips: [
        'Creative constraints often produce more original work than complete freedom',
        'Multiple smaller constraints are better than one large restriction',
        'Examples help writers see possibilities rather than problems',
        'Clear process reduces creative paralysis'
      ],
      resources: [
        {
          title: 'Creative Writing Constraint Techniques',
          type: 'article',
          url: 'https://example.com/creative-constraints',
          description: 'How limitations enhance rather than restrict creativity'
        },
        {
          title: 'Story Structure Templates',
          type: 'tool',
          url: 'https://example.com/story-templates',
          description: 'Frameworks for organizing creative writing projects'
        }
      ]
    },
    {
      id: 'multi-step-processes',
      title: 'Multi-Step Process Design',
      description: 'Create prompts that guide AI through complex, sequential tasks',
      difficulty: 'beginner',
      category: 'Foundation',
      estimatedTime: '35 min',
      prompt: 'Design a comprehensive prompt for planning and launching a small business.',
      solution: `You are a business consultant who has helped 500+ entrepreneurs successfully launch profitable small businesses. Your expertise covers everything from initial concept to first-year operations.

**Business Launch Blueprint: Complete 90-Day Process**

Client Profile: [ENTREPRENEUR_BACKGROUND]
Business Concept: [INITIAL_IDEA]
Budget Range: [AVAILABLE_CAPITAL]
Timeline: [DESIRED_LAUNCH_DATE]

## Phase 1: Foundation & Planning (Days 1-30)

### Week 1: Concept Validation
**Day 1-2: Market Research**
- Primary research: Survey 50+ potential customers
- Secondary research: Industry reports, competitor analysis
- Questions to answer: Who exactly needs this? How much will they pay? Who else offers this?

**Day 3-4: Business Model Design**
- Revenue streams: How will money come in?
- Cost structure: What are your main expenses?
- Value proposition: Why choose you over alternatives?
- Customer segments: Who are your ideal customers?

**Day 5-7: Financial Projections**
- Startup costs breakdown
- Monthly operating expenses
- Revenue projections (conservative, realistic, optimistic)
- Break-even analysis
- Cash flow projections for first 12 months

### Week 2: Legal & Administrative Setup
**Day 8-10: Business Structure**
- Entity type selection (LLC, Corporation, Partnership)
- State registration and licensing requirements
- Federal EIN application
- Business bank account setup

**Day 11-14: Compliance & Protection**
- Industry-specific licenses and permits
- Insurance requirements (liability, property, professional)
- Trademark/copyright considerations
- Basic contract templates (service agreements, terms of service)

### Week 3-4: Brand & Market Positioning
**Day 15-21: Brand Development**
- Business name and domain registration
- Logo and visual identity design
- Brand voice and messaging framework
- Website wireframes and content strategy

**Day 22-30: Marketing Foundation**
- Target customer personas (detailed profiles)
- Competitive positioning strategy
- Core marketing messages
- Marketing channel selection and budget allocation

## Phase 2: Building & Testing (Days 31-60)

### Week 5-6: Product/Service Development
**Day 31-35: MVP Creation**
- Minimum viable product/service definition
- Quality standards and delivery processes
- Pricing strategy and testing
- Customer feedback collection system

**Day 36-42: Operations Setup**
- Supplier relationships and agreements
- Inventory management systems (if applicable)
- Customer service processes
- Quality control procedures

### Week 7-8: Marketing Assets & Systems
**Day 43-49: Digital Presence**
- Website launch with booking/payment systems
- Social media profile setup and content calendar
- Email marketing system and welcome sequences
- SEO foundation and local listings

**Day 50-60: Sales Process**
- Sales funnel design and testing
- Customer onboarding process
- Follow-up and retention systems
- Referral program design

## Phase 3: Launch & Optimization (Days 61-90)

### Week 9-10: Soft Launch
**Day 61-65: Beta Testing**
- Launch to small group of early customers
- Collect detailed feedback and testimonials
- Refine processes based on real customer experience
- Document lessons learned and improvements

**Day 66-70: System Refinement**
- Update operations based on beta feedback
- Optimize marketing messages and materials
- Streamline customer experience
- Prepare for full public launch

### Week 11-12: Full Launch
**Day 71-77: Public Launch**
- Execute comprehensive marketing campaign
- Activate all marketing channels simultaneously
- Monitor systems for any issues
- Respond quickly to customer inquiries

**Day 78-84: Performance Monitoring**
- Track key metrics (sales, traffic, conversion rates)
- Monitor cash flow and expenses
- Collect customer feedback continuously
- Adjust pricing or positioning if needed

### Week 13: Review & Plan Next Phase
**Day 85-90: Analysis & Planning**
- Comprehensive performance review
- Financial analysis vs. projections
- Customer satisfaction assessment
- Plan for months 4-6: scaling strategies

## Success Checkpoints

**Weekly Reviews:**
- Financial status vs. budget
- Task completion rate
- Customer feedback themes
- Adjustment needs

**Monthly Milestones:**
- Month 1: Foundation complete, ready to build
- Month 2: Systems operational, ready to test
- Month 3: Launched and actively serving customers

## Risk Management

**Common Pitfalls & Solutions:**
- Budget overruns → Weekly expense tracking
- Timeline delays → Buffer time in each phase
- Market changes → Monthly market pulse checks
- Quality issues → Customer feedback loops

**Emergency Protocols:**
- Cash flow problems → Expense reduction plan
- Low customer response → Pivot strategy
- Competition threats → Differentiation reinforcement

Create detailed 90-day plan for:
Business type: [SPECIFIC_BUSINESS]
Target market: [CUSTOMER_DESCRIPTION]
Budget: [AVAILABLE_RESOURCES]`,
      criteria: [
        'Breaks complex process into manageable phases',
        'Provides specific timelines and daily tasks',
        'Includes checkpoints and success metrics',
        'Addresses common pitfalls and solutions',
        'Balances thoroughness with actionability'
      ],
      hints: [
        'Complex projects need clear phases and milestones',
        'Daily tasks prevent overwhelm and ensure progress',
        'Regular checkpoints allow for course corrections',
        'Anticipate common problems and prepare solutions'
      ],
      tips: [
        'Sequential processes are easier to follow than overwhelming lists',
        'Specific timelines create accountability and momentum',
        'Success metrics help track progress and identify issues early',
        'Risk management prevents small problems from becoming big ones'
      ],
      resources: [
        {
          title: 'Small Business Launch Checklist',
          type: 'tool',
          url: 'https://example.com/launch-checklist',
          description: 'Comprehensive checklist for business launch tasks'
        },
        {
          title: 'Business Plan Templates',
          type: 'tool',
          url: 'https://example.com/business-templates',
          description: 'Professional business plan and financial projection templates'
        }
      ]
    }
  ],
  intermediate: [
    // ... (continuing with intermediate exercises)
  ],
  advanced: [
    // ... (continuing with advanced exercises)
  ]
};
