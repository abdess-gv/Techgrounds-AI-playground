
import { Exercise } from '../types/Exercise';

export const intermediateExercises: Exercise[] = [
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
];
