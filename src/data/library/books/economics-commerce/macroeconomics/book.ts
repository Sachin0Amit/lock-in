import type { Book, Chapter } from '../../../types'

/**
 * Macroeconomics — the third book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `macro-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Macroeconomics owns the aggregate register (UGC NET Economics unit 2 read this pass). Monetary-economics owns the money-and-banking deep side; public-economics owns the government-budget deep side; international-economics owns the open-economy deep side; each is previewed here, never duplicated.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — Unit 2 Macro Economics: national income, inflation, monetary and fiscal policy, growth registers) as the spine.
 * - Mankiw's Principles macro arc (contents read this pass) and Blanchard's Macroeconomics (the canonical intermediate arc named) as the teaching poles.
 * - The NCERT introductory macro register priced as the school ladder beneath.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'national-income-accounting',
    title: 'National Income Accounting',
    summary:
      'GDP defined by the three lenses — expenditure, income, value added; the circular flow re-read at depth; nominal against real with the deflator arithmetic; GDP\u2019s honest limits — the home ledger, the informal register, the wellbeing question; and the Indian accounting register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Lenses',
      'The Deflator Arithmetic',
      'GDP\u2019s Honest Limits',
      'The Indian Register',
    ],
  },
  {
    number: 2,
    slug: 'money-and-the-economy-first',
    title: 'Money and the Economy: The Macro View',
    summary:
      'Money\u2019s measures M1-M3 with the multiplier seed; the money-demand register — the transactions-precautionary-speculative trio; the IS-LM book\u2019s groundwork told; and the central bank\u2019s rate ladder previewed for the monetary-economics book\u2019s deep side.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Measures Census',
      'The Money-Demand Trio',
      'The LM Groundwork',
      'The Rate Ladder Previewed',
    ],
  },
  {
    number: 3,
    slug: 'keynesian-cross',
    title: 'The Keynesian Cross',
    summary:
      'The consumption function\u2019s arithmetic — the MPC ledger and the multiplier; the aggregate-expenditure geometry solved for equilibrium; the paradox-of-thrift register told; savings-investment balance; and the Indian multiplier debates named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The MPC Ledger',
      'The Multiplier Geometry',
      'The Thrift Paradox',
      'S and I Balance',
    ],
  },
  {
    number: 4,
    slug: 'is-lm-model',
    title: 'The IS-LM Machinery',
    summary:
      'The IS curve derived from the investment register; the LM curve from the money-market arithmetic; the joint equilibrium solved with the comparative statics — fiscal and monetary shifts read; crowding-out priced; and the model\u2019s limitations told honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'IS Derived',
      'LM Derived',
      'Comparative Statics',
      'Crowding-Out Priced',
    ],
  },
  {
    number: 5,
    slug: 'aggregate-demand-and-supply',
    title: 'Aggregate Demand and Supply',
    summary:
      'The AD curve assembled from IS-LM; the AS register — the classical vertical, the Keynesian horizontal and the modern expectations-graded curve; the Phillips-curve arithmetic with the NAIRU name; disinflation\u2019s sacrifice ratio priced; and the two-regime honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'AD Assembled',
      'The AS Register',
      'The Phillips Arithmetic',
      'The Sacrifice Ratio',
    ],
  },
  {
    number: 6,
    slug: 'inflation-and-unemployment',
    title: 'Inflation and Unemployment',
    summary:
      'Inflation\u2019s taxonomy — demand-pull, cost-push, the expectations-augmented register; the welfare cost of inflation told honestly with the hyperinflation cases named; unemployment\u2019s census — frictional, structural, cyclical with the natural-rate honesty; and the Okun register previewed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Inflation\u2019s Taxonomy',
      'The Welfare Cost',
      'Unemployment\u2019s Census',
      'The Okun Preview',
    ],
  },
  {
    number: 7,
    slug: 'fiscal-policy-and-debt',
    title: 'Fiscal Policy and Debt',
    summary:
      'The government-budget arithmetic at macro depth — the deficit registers; the balanced-budget multiplier and the debt-sustainability honesty; automatic against discretionary stabilisers; crowding-out revisited; and the public-economics book\u2019s deep doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Deficit Registers',
      'The Sustainability Honesty',
      'Stabilisers Classified',
      'The Deep Doorway Marked',
    ],
  },
  {
    number: 8,
    slug: 'growth-theory',
    title: 'Growth Theory',
    summary:
      'The Solow model solved — the steady-state arithmetic and the capital-accumulation diagram; the conditional convergence honesty; human capital\u2019s extension; endogenous-growth registers named; and the growth-accounting arithmetic with the Indian growth register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Solow Steady State',
      'The Convergence Honesty',
      'Human Capital Extended',
      'The Growth-Indian Register',
    ],
  },
  {
    number: 9,
    slug: 'business-cycles-and-expectations',
    title: 'Business Cycles and Expectations',
    summary:
      'The cycle\u2019s census — the classical and the new-classical readings; the rational-expectations register told honestly; the real-business-cycle name priced without romance; the new-Keynesian wage-price frictions told; and the policy-debate map drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cycle\u2019s Census',
      'The Rational Register',
      'The RBC Name',
      'The Friction Story',
    ],
  },
  {
    number: 10,
    slug: 'open-economy-and-doorway',
    title: 'The Open Economy and the Doorway',
    summary:
      'The Mundell-Fleming register previewed with the fixed-and-floating honesty; the exchange-rate pass-through told briefly; the capital-flow register priced for the international-economics book\u2019s deep side; and the modern DSGE apparatus named as the research doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Mundell-Fleming Previewed',
      'The Pass-Through',
      'The Capital Register',
      'The DSGE Doorway',
    ],
  },
]

export const macroeconomics: Book = {
  id: 'macroeconomics',
  title: 'Macroeconomics',
  subtitle: 'The aggregate economy: output, money and growth read from the Keynesian cross to the modern policy register',
  discipline: 'economics-commerce',
  level: 'University intermediate + UGC NET unit 2 + competitive',
  description: 'The intermediate macro course: national-income accounting\u2019s measurement craft, the IS-LM aggregate-demand machinery, the Phillips-curve and expectations register, fiscal and monetary policy\u2019s transmission, growth theory\u2019s Solow engine, and the open-economy preview with the doorway to the modern research register.',
  status: 'planned',
  accent: ['#059669', '#064e3b'],
  chapters,
}
