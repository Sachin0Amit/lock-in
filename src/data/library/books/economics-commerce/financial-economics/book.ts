import type { Book, Chapter } from '../../../types'

/**
 * Financial Economics — the tenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `fineco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Financial Economics owns the theory register of asset pricing (the economics-side discipline). Investment-analysis (commerce side) owns the practitioner’s security-analysis register; corporate-finance owns the firm-side financing-and-budgeting register; the mathematics shelf’s probability book owns the pure-theory side — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The shelf's economics-side arc priced here as the theory pole, with Bodie, Kane & Marcus's Investments named as the practitioner register the investment-analysis book carries.
 * - Hull's derivatives register named for the pricing chapters' further door; Black and Scholes named honestly as the canonical result this book derives at the binomial depth.
 * - The mathematics shelf's probability-theory book cross-referenced as the expectation machinery's pure side.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'time-value-engine',
    title: 'The Time-Value Engine',
    summary:
      'The compounding-and-discounting arithmetic from first principles; present and future values with the multiple-cash-flow ledger; annuities and perpetuities solved; the APR-vs-EAR honesty told; and the net-present-value rule stated as the founding decision grammar.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Compounding Arithmetic',
      'The Cash-Flow Ledger',
      'Annuities Solved',
      'The NPV Grammar',
    ],
  },
  {
    number: 2,
    slug: 'risk-and-return-foundations',
    title: 'Risk and Return Foundations',
    summary:
      'Return measurement — holding-period against annualised; the mean-variance grammar; utility-of-wealth told with the risk-aversion register; the diversification intuition priced first with the two-asset arithmetic; and the risk-free-and-risky census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Return Measurement',
      'The Mean-Variance Grammar',
      'The Risk-Aversion Register',
      'The Diversification Intuition',
    ],
  },
  {
    number: 3,
    slug: 'portfolio-theory',
    title: 'Portfolio Theory',
    summary:
      'Markowitz solved — the covariance arithmetic and the frontier derived; the two-fund separation told; the efficient-frontier geometry read; the optimal portfolio with the risk-free asset — the capital-allocation line; and the portfolio mathematics carried honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Markowitz Solved',
      'The Two-Fund Separation',
      'The Frontier Geometry',
      'The Allocation Line',
    ],
  },
  {
    number: 4,
    slug: 'capm-and-asset-pricing',
    title: 'The CAPM and Its Register',
    summary:
      'The capital-market line to the security-market line; beta computed and read as the systematic-risk census; the CAPM equation derived and priced; the unsystematic-risk non-payment told; and the honest tests — the size-and-value anomalies named with their meaning debated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Lines',
      'Beta Read',
      'The Equation Priced',
    ],
  },
  {
    number: 5,
    slug: 'market-efficiency',
    title: 'Market Efficiency',
    summary:
      'The three forms of the EMH told — weak, semi-strong, strong; the anomaly census priced — momentum, reversal, the calendar registers named; the joint-hypothesis honesty told as the test\u2019s trap; the behavioural critique cross-referenced; and the event-study craft named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Forms',
      'The Anomaly Census',
      'The Joint-Hypothesis Trap',
      'The Event-Study Craft',
      'The Anomaly Debate',
    ],
  },
  {
    number: 6,
    slug: 'derivatives-foundations',
    title: 'Derivatives Foundations',
    summary:
      'The payoff geometry — forwards, futures and the option payoffs drawn; the put-call parity derived as the no-arbitriage ledger\u2019s first theorem; trading mechanics told briefly with the margin register; and the hedging-and-speculation census priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Payoff Geometry',
      'Put-Call Parity Derived',
      'The Margin Register',
      'The Two Uses Census',
    ],
  },
  {
    number: 7,
    slug: 'option-pricing',
    title: 'Option Pricing Foundations',
    summary:
      'The binomial model solved — the risk-neutral idea derived honestly as a trick of no-arbitrage; the Black-Scholes-Merton result stated with its assumptions told; the Greeks named — delta, gamma, theta, vega; and the implied-volatility register read as the market\u2019s thermometer.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Binomial Solved',
      'The BSM Result Stated',
      'The Greeks Named',
      'The Volatility Thermometer',
    ],
  },
  {
    number: 8,
    slug: 'no-arbitrage-doorway',
    title: 'The No-Arbitrage Doorway',
    summary:
      'Fixed-income arithmetic — the yield-to-maturity craft, duration as the sensitivity register; the term-structure idea told with the expectations hypothesis named; the no-arbitrage grammar consolidated as the discipline\u2019s constitution; and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The YTM Craft',
      'The Duration Register',
      'The Grammar Consolidated',
      'The Research Doorway',
    ],
  },
]

export const financialEconomics: Book = {
  id: 'financial-economics',
  title: 'Financial Economics',
  subtitle: 'The theory of asset prices: risk, portfolios, efficiency and the no-arbitrage grammar',
  discipline: 'economics-commerce',
  level: 'University + professional register (theory side)',
  description: 'The financial-theory register: the time-value arithmetic as the founding engine, the risk-and-return foundations, Markowitz\u2019s portfolio machinery, the CAPM\u2019s pricing arithmetic with its honest tests, the market-efficiency debate and its anomalies, the derivatives payoff geometry and the binomial-and-Black-Scholes pricing crafts, and the no-arbitrage doorway.',
  status: 'planned',
  accent: ['#d97706', '#7c2d12'],
  chapters,
}
