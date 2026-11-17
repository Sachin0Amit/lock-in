import type { Book, Chapter } from '../../../types'

/**
 * Foundation Economics — the first book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 93 planned lessons, zero written. Lesson ids will use the `fecon-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Foundation Economics owns the school first-pass (the NCERT class 9-12 introduction register and Mankiw’s principles arc). Microeconomics and macroeconomics own the intermediate deepening; business-studies owns the enterprise-side first pass; every deep book’s register is previewed here, never re-derived.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Mankiw, Principles of Economics (the chapter list read this pass via the World Education Association mirror — Thinking Like an Economist through the markets, the macro arc and the international register) as the spine the first-pass follows.
 * - The NCERT economics register (class 9-12 intro arc — development, sectors, money, the introductory micro and macro books) priced as the school ladder this book opens.
 * - The UGC NET Economics syllabus page (ugcnetonline.in, read this pass) cross-referenced as the university register the shelf climbs toward.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-economic-problem',
    title: 'The Economic Problem',
    summary:
      'Scarcity as the founding condition; choice and its opportunity-cost arithmetic; the economic-agent register — households, firms, government; positive against normative statements told honestly; and the factors-of-production census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Scarcity and Choice',
      'Opportunity Cost Arithmetic',
      'The Agent Register',
      'Positive versus Normative',
      '1-4 Conclusion',
      'Organize Economic Activity',
      'FYI: Adam Smith and the Invisible Hand',
      'Farmers?',
      'Drug-Related Crime?',
      '5-4 Conclusion',
      '8-4 Conclusion',
      '9-4 Conclusion 182 Problems and Applications',
      'PART IV The Economics of the Key Concepts',
      '10-4 Conclusion 206 Problems and Applications',
      'Miniature Golf',
      'CASE STUDY: Monopoly Drugs versus Generic Drugs',
      'IN THE NEWS: Europe versus Google',
      'Key Concepts 313 Problems and Applications',
      'Society',
      '16-4 Conclusion',
      'Key Concepts 334 The Markets for the Factors'
    ],
  },
  {
    number: 2,
    slug: 'thinking-like-an-economist',
    title: 'Thinking Like an Economist',
    summary:
      'The model craft: assumptions as simplifications told honestly; the production-possibility frontier read as scarcity\u2019s geometry — points within, on and beyond; marginal analysis as the economist\u2019s method; and the circular-flow map\u2019s first pass.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Model Craft',
      'The Frontier Geometry',
      'Marginal Analysis',
      'The Circular Flow',
      '2-1b The Role of Assumptions',
      '5-1c The Midpoint Method: A Better Way to Calculate'
    ],
  },
  {
    number: 3,
    slug: 'demand-and-supply',
    title: 'Demand and Supply: First Equilibrium',
    summary:
      'The demand curve\u2019s law with its movement-against-shift discipline; the supply curve the same way; equilibrium as the price that clears the market; surplus and shortage arithmetic; and the everyday market registers — the vegetable stall to the housing ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Demand Law',
      'The Supply Law',
      'The Clearing Price',
      'Everyday Registers',
      'Elasticity and Its Applications',
      'Supply, Demand and Government Policies',
      'Monopoly, Oligopoly and Price Discrimination First Pass',
      'Externalities, Public Goods and Common Resources',
      'Earnings and Discrimination',
      'Demand 65 Key Concepts',
      'CASE STUDY: Two Ways to Reduce the Quantity of Smoking 6-1a How Price Ceilings Affect Market Outcomes',
      '6-1b How Price Floors Affect Market Outcomes 116 7-3b Evaluating the Market Equilibrium',
      '6-2a How Taxes on Sellers Affect Market Outcomes 121 Key Concepts',
      'ASK THE EXPERTS: The Laffer Curve',
      'Surplus 135 9-3a The Jobs Argument',
      '11-1 The Different Kinds of Goods',
      '11-3a The Tragedy of the Commons',
      '15-5a Increasing Competition with Antitrust Laws',
      '18-1 The Demand for Labor',
      'Oligopoly 337 Labor',
      '17-1 Markets with Only a Few Sellers 338 Labor',
      '17-1a A Duopoly Example 338 18-1d What Causes the Labor-Demand Curve to Shift?',
      '17-1d How the Size of an Oligopoly Affects the Market'
    ],
  },
  {
    number: 4,
    slug: 'elasticities',
    title: 'Elasticities at First Pass',
    summary:
      'Price elasticity of demand computed and classified; the total-revenue test read honestly; income and cross elasticities naming necessity, luxury and the complements-substitutes census; and the short-vs-long-run elasticity honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Computing Elasticity',
      'The Revenue Test',
      'Income and Cross Registers',
      'The Time Honesty',
      'Percentage Changes and Elasticities',
      'Run 115 7-3a The Benevolent Social Planner',
      '13-4a The Relationship between Short-Run and Long-Run 15-1b Government-Created Monopolies'
    ],
  },
  {
    number: 5,
    slug: 'welfare-and-failure',
    title: 'Welfare and Market Failure: First Pass',
    summary:
      'Consumer and producer surplus as the market\u2019s gain ledger; the deadweight arithmetic of price control and tax; externalities, public goods and information asymmetry named as the failure register; and the government\u2019s first-pass remedies priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Surplus Ledger',
      'The Deadweight Arithmetic',
      'The Failure Census',
      'The Remedy Register',
      'Interdependence and the Gains',
      'ASK THE EXPERTS: Rent Control 116 IN THE NEWS: The Invisible Hand Can Park Your Car',
      'Of a Payroll Tax?',
      'Questions for Review 128 8-1a How a Tax Affects Market Participants',
      '8-2 The Determinants of the Deadweight Loss'
    ],
  },
  {
    number: 6,
    slug: 'firm-and-market-structures',
    title: 'The Firm and Market Structures: First Pass',
    summary:
      'Production and cost arithmetic — fixed, variable, marginal — with the shutdown logic told simply; the market-structure census — perfect competition, monopoly, oligopoly, monopolistic competition — read by examples; and profit as revenue minus cost kept honest.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cost Arithmetic',
      'The Shutdown Logic',
      'The Structure Census',
      'Profit Kept Honest',
      '4-1b What Is Competition?',
      '14-2a A Simple Example of Profit Maximization',
      'Summary 263 15-2b A Monopoly’s Revenue'
    ],
  },
  {
    number: 7,
    slug: 'gdp-and-macro-first-pass',
    title: 'GDP and the Macro Economy: First Pass',
    summary:
      'The GDP idea with the expenditure map — C, I, G and the external ledger; inflation and unemployment named as the twin worries; the central bank\u2019s rate register previewed; and the growth register told as the long-run question.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The GDP Idea',
      'The Expenditure Map',
      'The Twin Worries',
      'The Long-Run Question',
      'Questions for Review',
      '3-4 Conclusion 58 Questions for Review',
      'Summary 313 Questions for Review'
    ],
  },
  {
    number: 8,
    slug: 'money-and-banking-first-pass',
    title: 'Money and Banking: First Pass',
    summary:
      'Money\u2019s functions and forms; the bank as the intermediary\u2019s first pass with the credit-creation seed; the RBI named as the institution\u2019s head; and inflation\u2019s first arithmetic — too much money chasing too few goods told honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Money\u2019s Functions',
      'The Bank\u2019s First Pass',
      'The RBI Named',
      'Inflation\u2019s First Arithmetic',
    ],
  },
  {
    number: 9,
    slug: 'government-and-policy-first-pass',
    title: 'Government and Policy: First Pass',
    summary:
      'The budget as the government\u2019s ledger — revenue and expenditure sides; deficit named with the debt honesty; taxes classified direct and indirect with the GST\u2019s Indian register previewed; and the redistribution question told as the fairness register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Budget Ledger',
      'Deficit Honesty',
      'Direct and Indirect',
      'The Fairness Register',
      '6-2 Taxes 120 Summary',
      '6-2b How Taxes on Buyers Affect Market Outcomes 122 Questions for Review',
      '10-2b Market-Based Policy 1: Corrective Taxes and 12-2b Administrative Burden',
      'ASK THE EXPERTS: Vaccines 196 12-2d Lump-Sum Taxes'
    ],
  },
  {
    number: 10,
    slug: 'trade-and-the-doorway',
    title: 'Trade and the Doorway',
    summary:
      'Comparative advantage as the trade logic\u2019s first pass — the baker-and-brewer arithmetic; the exchange-rate idea named; globalisation\u2019s register told with its gains and its discontents priced honestly; and the doorway map of the shelf\u2019s deep books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Comparative Logic',
      'The Exchange-Rate Idea',
      'Globalisation\u2019s Register',
      'The Shelf\u2019s Doorway Map',
    ],
  },
]

export const foundationEconomics: Book = {
  id: 'foundation-economics',
  title: 'Foundation Economics',
  subtitle: 'The economic way of thinking from scarcity to markets: the first pass of every core idea',
  discipline: 'economics-commerce',
  level: 'Absolute beginner → Class 12 first pass',
  description: 'The ladder\u2019s opening: the economic problem and its cost vocabulary, the economist\u2019s model craft with production possibilities, demand and supply\u2019s first equilibrium, elasticities and their everyday registers, welfare and market failure at first pass, and the macro economy\u2019s first map. Cross-references microeconomics and macroeconomics (the two deepening poles); hands off to each honestly.',
  status: 'planned',
  accent: ['#34d399', '#064e3b'],
  chapters,
}
