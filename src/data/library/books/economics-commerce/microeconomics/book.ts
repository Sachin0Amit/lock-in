import type { Book, Chapter } from '../../../types'

/**
 * Microeconomics — the second book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 44 planned lessons, zero written. Lesson ids will use the `micro-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Microeconomics owns the intermediate theory register (UGC NET Economics unit 1 read this pass: consumer and producer behaviour, demand analysis, elasticity, market structures, general equilibrium, factor pricing, market failure). Foundation-economics owns the first pass; behavioural-economics owns the bounded-rationality critique; business-economics belongs to the commerce shelf’s business-studies register — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (ugcnetonline.in + the unit lists read this pass — Unit 1 Micro Economics: General Equilibrium Analysis, Theory of Production and Costs, Factor Pricing) as the register spine.
 * - Varian, Intermediate Microeconomics (the canonical arc named — the consumer-to-general-equilibrium movement) and Nicholson & Snyder named as the mathematics-heavier pole.
 * - Mankiw's Principles (contents read this pass) cross-referenced as the first-pass ladder beneath this book.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'preferences-and-utility',
    title: 'Preferences and Utility',
    summary:
      'The preference axioms — completeness, transitivity, more-is-better — read as the consumer\u2019s grammar; utility as an ordinal honesty, not a measuring stick; the indifference-curve geometry with its slope\u2019s meaning; and the budget line\u2019s arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Axioms Read',
      'Utility\u2019s Ordinal Honesty',
      'Indifference Geometry',
      'The Budget Line',
    ],
  },
  {
    number: 2,
    slug: 'optimal-choice-and-demand',
    title: 'Optimal Choice and Demand',
    summary:
      'The tangency condition as the consumer\u2019s optimum derived; the demand curve extracted from the geometry; corner solutions told honestly; and the Engel curve\u2019s normal-inferior classification with the demand-function arithmetic carried forward.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tangency Derived',
      'Demand Extracted',
      'Corner Honesty',
      'The Engel Classification',
    ],
  },
  {
    number: 3,
    slug: 'slutsky-and-elasticity-deep',
    title: 'Slutsky Decomposition and Elasticity Deepened',
    summary:
      'Income and substitution effects separated by the Slutsky-and-Hicks crafts; the Giffen honesty told; elasticity arithmetic deepened — partial elasticity, the revenue registers; and the consumer-surplus-again measurement with its integral honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Effects Separated',
      'The Giffen Honesty',
      'Elasticity Registers',
      'Surplus Measured Again',
    ],
  },
  {
    number: 4,
    slug: 'production-and-costs',
    title: 'Production and Costs',
    summary:
      'The production function read — total, average, marginal products with the law of diminishing returns; isoquants and the returns-to-scale census; short-run cost arithmetic — the seven curves; long-run cost with the envelope honesty and the economies register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Product Curves',
      'Isoquants and Scale',
      'The Seven Cost Curves',
      'The Envelope Honesty',
    ],
  },
  {
    number: 5,
    slug: 'perfect-competition',
    title: 'Perfect Competition',
    summary:
      'The market\u2019s benchmark solved: the price-taking firm\u2019s P = MC condition; the short-run shutdown and long-run entry-exit arithmetic; the industry supply curve assembled; and the benchmark\u2019s efficiency honesty with its real-world distance told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Price-Taker\u2019s Condition',
      'Shutdown and Exit',
      'Industry Supply',
      'The Benchmark\u2019s Distance',
    ],
  },
  {
    number: 6,
    slug: 'monopoly',
    title: 'Monopoly',
    summary:
      'The price-maker\u2019s arithmetic: MR = MC with the markup rule; the deadweight ledger of monopoly told and drawn; price discrimination\u2019s degrees classified; the natural-monopoly register with the regulation remedies priced; and the monopoly\u2019s sources census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mark-Up Arithmetic',
      'The Deadweight Ledger',
      'Discrimination Degrees',
      'Regulation Remedies',
    ],
  },
  {
    number: 7,
    slug: 'oligopoly-and-game-theory',
    title: 'Oligopoly and Game Theory',
    summary:
      'The few-firm register: the kinked-demand honesty told; Cournot and Bertrand solved as the classic duopoly pair; the Stackelberg leader; the prisoner\u2019s dilemma as the repeated-game register; and the Nash equilibrium grammar introduced (the mathematics shelf\u2019s OR book cross-referenced for the formal side).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Kinked Honesty',
      'Cournot and Bertrand',
      'The Stackelberg Leader',
      'Nash Introduced',
    ],
  },
  {
    number: 8,
    slug: 'factor-markets',
    title: 'Factor Markets and Factor Pricing',
    summary:
      'The derived-demand logic for labour; the marginal-product arithmetic — VMP and MRP; the labour supply curve\u2019s income-substitution honesty; the wage differentials register; land and capital priced by the same grammar; and the monopsony register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Derived Demand',
      'VMP and MRP',
      'The Labour-Supply Honesty',
      'The Monopsony Named',
    ],
  },
  {
    number: 9,
    slug: 'general-equilibrium-and-welfare',
    title: 'General Equilibrium and Welfare',
    summary:
      'The Edgeworth box as the exchange economy\u2019s geometry; the contract curve and the core; the welfare theorems stated with their conditions told honestly; the efficiency-equity register; and the competitive equilibrium\u2019s existence named without the proof burden.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Edgeworth Box',
      'The Contract Curve',
      'The Welfare Theorems',
      'Efficiency versus Equity',
    ],
  },
  {
    number: 10,
    slug: 'market-failure-and-information',
    title: 'Market Failure and Information',
    summary:
      'Externalities priced — Pigouvian taxes and Coase\u2019s bargaining; public goods with the free-rider honesty; the information register — adverse selection and moral hazard with Akerlof\u2019s lemons named; and the failure remedies\u2019 government register priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Externalities Priced',
      'Public Goods and Riders',
      'The Lemons Named',
      'The Remedy Register',
    ],
  },
  {
    number: 11,
    slug: 'applications-and-doorway',
    title: 'Applications and the Doorway',
    summary:
      'The theory applied: the labour-market and the minimum-wage register priced honestly by both the classical and monopsony readings; agriculture\u2019s price-support arithmetic; the modern auction registers named; and the doorway to the behavioural book\u2019s critique of this whole arc.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Minimum-Wage Registers',
      'Price Supports',
      'The Auction Registers',
      'The Behavioural Doorway',
    ],
  },
]

export const microeconomics: Book = {
  id: 'microeconomics',
  title: 'Microeconomics',
  subtitle: 'The intermediate theory course: consumers, producers and markets read through the marginal lens',
  discipline: 'economics-commerce',
  level: 'University intermediate + UGC NET unit 1 + competitive',
  description: 'The intermediate micro course: consumer theory from preferences to demand\u2019s Slutsky decomposition, production and cost theory, the four market structures solved to the shut-down and markup registers, factor markets and general equilibrium, and the market-failure-and-information register that ends the standard arc.',
  status: 'planned',
  accent: ['#10b981', '#065f46'],
  chapters,
}
