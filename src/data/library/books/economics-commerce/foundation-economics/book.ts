import type { Book, Chapter } from '../../../types'

/**
 * Foundation Economics — the first book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `fecon-` prefix
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
  description: 'The ladder\u2019s opening: the economic problem and its cost vocabulary, the economist\u2019s model craft with production possibilities, demand and supply\u2019s first equilibrium, elasticities and their everyday registers, welfare and market failure at first pass, and the macro economy\u2019s first map.',
  status: 'planned',
  accent: ['#34d399', '#064e3b'],
  chapters,
}
