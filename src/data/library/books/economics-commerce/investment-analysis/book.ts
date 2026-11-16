import type { Book, Chapter } from '../../../types'

/**
 * Investment Analysis — the sixteenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `invest-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Investment Analysis owns the practitioner’s security-analysis register. Financial-economics owns the pricing theory (CAPM, Black-Scholes) — the cross-reference is told honestly at each borrowing; accounting owns the statement craft the equity analysis reads; the CFA register is named as the professional doorway this book serves first.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Bodie, Kane & Marcus, Investments (the canonical arc named) as the spine; Reilly & Brown named as the analysis-heavier pole.
 * - The CFA Program's curriculum register named honestly as the professional doorway served (not opened this pass — the theory side is priced from the shelf's own books).
 * - The SEBI-and-AMFI registers (the Indian market structure) priced with the Zerodha-education register named for the investor-education side.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-investment-landscape',
    title: 'The Investment Landscape',
    summary:
      'The asset census — equity, fixed income, alternatives, cash with the risk-return ladder told; the market machinery — primary-and-secondary, the exchange craft with SEBI named; the index register — the Nifty-and-Sensex construction priced; and the investor\u2019s census — retail against institutional.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Asset Census',
      'The Market Machinery',
      'The Index Register',
      'The Investor Census',
    ],
  },
  {
    number: 2,
    slug: 'risk-return-measurement',
    title: 'Risk-Return Measurement',
    summary:
      'The return arithmetic — arithmetic against geometric with the honesty trap told; the volatility ledger — variance-and-standard-deviation computed; the Sharpe-and-Sortino registers derived and read; the drawdown craft priced; and the historical-risk-return ledger of the asset classes told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Return Arithmetic',
      'The Volatility Ledger',
      'The Sharpe Register',
      'The Drawdown Craft',
    ],
  },
  {
    number: 3,
    slug: 'portfolio-construction',
    title: 'Portfolio Construction Practice',
    summary:
      'The asset-allocation craft told as the return\u2019s driver register; the Markowitz practice — the covariance arithmetic carried (the financial-economics book\u2019s theory cross-referenced); the core-and-satellite idea named; the rebalancing discipline priced; and the investor-policy-statement craft told as the professional document.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Allocation Craft',
      'The Markowitz Practice',
      'The Core-Satellite Idea',
      'The Policy Statement',
    ],
  },
  {
    number: 4,
    slug: 'equity-analysis',
    title: 'Equity Analysis',
    summary:
      'The statement craft read (the accounting book cross-referenced as the grammar\u2019s home); the ratio ledger — profitability, liquidity, efficiency computed and read; the DDM-and-DCF crafts worked as the intrinsic register; the relative-multiple craft — P/E, P/B and the EV register; and the sector craft told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ratio Ledger',
      'The DDM Craft',
      'The DCF Craft',
      'The Multiple Register',
    ],
  },
  {
    number: 5,
    slug: 'fixed-income-analysis',
    title: 'Fixed-Income Analysis',
    summary:
      'The bond arithmetic — price-and-yield told with the inverse honesty; the YTM computed properly; duration-and-convexity priced as the sensitivity register (the financial-economics book\u2019s theory cross-referenced); the curve register read; and the credit-census told with the rating register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bond Arithmetic',
      'The YTM Computed',
      'Duration and Convexity',
      'The Rating Register',
    ],
  },
  {
    number: 6,
    slug: 'derivatives-practice',
    title: 'Derivatives Practice',
    summary:
      'The futures register — margining-and-marking told; the option-strategy census — the covered-and-protective pair, the spread-and-combination registers drawn; the Greek-management craft priced (the financial-economics book\u2019s pricing machinery cross-referenced); and the hedging-vs-speculation honesty carried.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Futures Register',
      'The Strategy Census',
      'The Greek Management',
      'The Use Honesty',
    ],
  },
  {
    number: 7,
    slug: 'mutual-funds-and-etfs',
    title: 'Mutual Funds and ETFs',
    summary:
      'The fund census — open-and-closed with the scheme register (the Indian market\u2019s own); the NAV arithmetic computed with the expense honesty told; the SIP craft priced with the compounding register; the ETF-and-index machinery told; and the passive-vs-active debate priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fund Census',
      'The NAV Arithmetic',
      'The SIP Register',
      'The Active-Passive Debate',
    ],
  },
  {
    number: 8,
    slug: 'performance-and-ethics',
    title: 'Performance and the Ethics Doorway',
    summary:
      'The performance-evaluation craft — Jensen-and-Treynor registers computed (the theory cross-referenced); the attribution register told briefly; the behavioural-trap census priced (the behavioural book cross-referenced); the ethics register — the fiduciary idea told; and the professional doorway — the CFA-and-adviser registers named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Evaluation Registers',
      'The Attribution Craft',
      'The Behavioural Traps',
      'The Professional Doorway',
    ],
  },
]

export const investmentAnalysis: Book = {
  id: 'investment-analysis',
  title: 'Investment Analysis',
  subtitle: 'The practitioner\u2019s register: securities, analytics and the portfolio craft from the risk-return ledger to performance evaluation',
  discipline: 'economics-commerce',
  level: 'University + professional (CFA first pass) + investor education',
  description: 'The practitioner\u2019s register: the investment landscape\u2019s census, the risk-return measurement craft, portfolio construction\u2019s practice side, the equity-and-fixed-income analysis crafts, the derivatives-market practice, the mutual-fund-and-ETF registers, and the performance-evaluation-and-ethics doorway.',
  status: 'planned',
  accent: ['#eab308', '#713f12'],
  chapters,
}
