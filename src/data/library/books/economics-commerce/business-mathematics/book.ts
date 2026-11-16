import type { Book, Chapter } from '../../../types'

/**
 * Business Mathematics — the eighteenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `busmath-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Business Mathematics owns the commercial register (the CA Foundation’s quantitative register and the BCom mathematics arc). The mathematics shelf owns the pure side — quantitative-aptitude owns the speed arithmetic, differential-and-integral-calculus own the pure calculus, linear-algebra owns the matrix theory; the cross-references are told at each borrowing.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The CA Foundation's quantitative-aptitude register named as the professional spine served (ratio, equations, time value, sets, calculus, probability registers).
 * - The mathematics shelf's own books (quantitative-aptitude, elementary-and-advanced-algebra, differential-and-integral-calculus, linear-algebra) cross-referenced as the pure-side owners.
 * - The UGC NET Commerce syllabus (read this pass) cross-referenced for the business-economics registers this book's craft serves.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'ratio-proportion-index',
    title: 'Ratio, Proportion and the Index Craft',
    summary:
      'The ratio-and-proportion arithmetic told at commercial speed; the index-and-percentage registers computed; the partnership-and-profit-sharing ledger priced; and the chain-and-average-percentage crafts worked (the mathematics shelf\u2019s aptitude book cross-referenced for the speed side).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ratio Arithmetic',
      'The Percentage Register',
      'The Partnership Ledger',
      'The Chain Craft',
    ],
  },
  {
    number: 2,
    slug: 'equations-and-inequalities',
    title: 'Equations and Inequalities',
    summary:
      'Linear-and-quadratic equations solved for the business word-problem register; simultaneous equations for the market-and-cost cases; inequalities read with the linear-programming preview (the mathematics OR book\u2019s doorway marked); and the absolute-value craft priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Word-Problem Register',
      'The Simultaneous Cases',
      'The Inequality Reading',
      'The LP Preview',
    ],
  },
  {
    number: 3,
    slug: 'commercial-and-emi-arithmetic',
    title: 'The Commercial and EMI Arithmetic',
    summary:
      'The interest registers — simple-and-compounded with the effective rate honesty; the EMI register solved properly — the annuity formula applied with the amortisation ledger read; the sinking-fund craft priced; and the discount honesty — the bill-discounting register told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Interest Registers',
      'The EMI Solved',
      'The Amortisation Ledger',
      'The Discount Register',
    ],
  },
  {
    number: 4,
    slug: 'progressions-and-functions',
    title: 'Progressions and Functions for Finance',
    summary:
      'The AP-and-GP registers with the finance cases — the annuity-and-growth ladder; the sum registers computed; the function craft — domain, range and graphing for the economist\u2019s curves; the exponential-and-logarithm pair as the growth-and-decay engine; and the limit honesty told at the first-pass depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The AP Register',
      'The GP and Growth Ladder',
      'The Function Craft',
      'The Growth Engine',
    ],
  },
  {
    number: 5,
    slug: 'matrices-and-input-output',
    title: 'Matrices and the Input-Output Taster',
    summary:
      'The matrix arithmetic — addition, multiplication, transpose told; the determinant-and-inverse craft computed for the 2x2-and-3x3 registers; the system-solving by the inverse; and the Leontief input-output taster priced (the mathematics shelf\u2019s linear-algebra book cross-referenced as the pure side).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Matrix Arithmetic',
      'The Inverse Craft',
      'The System Solving',
      'The Leontief Taster',
    ],
  },
  {
    number: 6,
    slug: 'marginal-calculus',
    title: 'The Marginal Calculus',
    summary:
      'The differentiation craft for the business writer — the power-and-chain registers applied; the marginal-revenue-and-marginal-cost arithmetic read; the maxima-minima craft applied to the profit-and-price cases; and the second-derivative test priced (the mathematics differential-calculus book cross-referenced as the pure side).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Differentiation Register',
      'The MR-MC Arithmetic',
      'The Profit-Maximising Craft',
      'The Second Test',
    ],
  },
  {
    number: 7,
    slug: 'probability-and-expected-value',
    title: 'Probability and Expected Value',
    summary:
      'The probability register for the business writer — the addition-and-multiplication rules applied to the commerce cases; the expected-value arithmetic solved for the payoff-and-insurance registers; the decision-tree craft priced; and the mathematics shelf\u2019s probability book cross-referenced as the theory side.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rule Register',
      'The Expected-Value Arithmetic',
      'The Decision Tree',
      'The Theory Cross-Reference',
    ],
  },
  {
    number: 8,
    slug: 'integration-and-doorway',
    title: 'Integration and the Doorway',
    summary:
      'The integration craft as the accumulation engine — the consumer-and-producer surplus registers computed as the economics dividend; the area application priced; the business-statistics registers previewed; and the doorway map — the mathematics shelf\u2019s deep books and the econometrics book marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Accumulation Engine',
      'The Surplus Registers',
      'The Statistics Preview',
      'The Doorway Map',
    ],
  },
]

export const businessMathematics: Book = {
  id: 'business-mathematics',
  title: 'Business Mathematics',
  subtitle: 'The commercial mathematics register: ratios, equations, annuities, matrices and the marginal calculus of commerce',
  discipline: 'economics-commerce',
  level: 'Class 11-12 commerce + CA Foundation first pass + university BCom',
  description: 'The commercial mathematics register: the ratio-and-index arithmetic, equations-and-inequalities for the business writer, the commercial-and-percentage craft with the EMI register, progressions-and-functions for finance, matrices with the input-output taster, the marginal calculus of revenue-and-cost, probability-and-expected-value for decisions, and the integration doorway to surplus registers.',
  status: 'planned',
  accent: ['#7c3aed', '#4c1d95'],
  chapters,
}
