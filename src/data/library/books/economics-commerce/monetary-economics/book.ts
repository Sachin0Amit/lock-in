import type { Book, Chapter } from '../../../types'

/**
 * Monetary Economics — the seventh book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `moneco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Monetary Economics owns the money register (the UGC NET Economics monetary unit read this pass). Banking (commerce side) owns the institutional-and-operational banking register; macroeconomics owns the IS-LM machinery; the RBI case is priced here at the policy depth, with the banking book carrying the operations side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — the Monetary Economics unit: money supply, central banking, monetary policy, inflation) as the spine.
 * - Mishkin, The Economics of Money, Banking and Financial Markets (the canonical arc named) as the teaching spine; the RBI's published register priced as the Indian case.
 * - The NCERT class 10 money-and-credit register priced as the school ladder beneath.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'money-nature-and-measures',
    title: 'Money\u2019s Nature and Its Measures',
    summary:
      'The barter-to-money story told with the functions census; the evolution register — metallic to fiat to the digital-taster; measures M0-M3 with the Indian register computed; liquidity\u2019s ladder read; and the money-vs-wealth-vs-income distinction kept honest.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Functions Census',
      'The Evolution Register',
      'The M-Ladder Computed',
      'The Three-Way Distinction',
    ],
  },
  {
    number: 2,
    slug: 'financial-system-map',
    title: 'The Financial System\u2019s Map',
    summary:
      'The system\u2019s census — banks, NBFCs, mutual funds, insurance and the markets; direct against intermediated finance told; the balance-sheet craft of a commercial bank read; the repo and call markets named; and the IL&FS-type cases told honestly as the NBFC register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The System\u2019s Census',
      'Direct versus Intermediated',
      'The Bank\u2019s Ledger Read',
      'The NBFC Register',
      '10-2c Market-Based Policy 2: Tradable Pollution CASE STUDY: How the Tax Burden Is Distributed',
      'CASE STUDY: An Illegal Phone Call'
    ],
  },
  {
    number: 3,
    slug: 'central-banking-and-rbi',
    title: 'The Central Bank and the RBI',
    summary:
      'The central bank\u2019s functions census — issuer, banker to banks and government, lender of last resort, supervisor; the RBI\u2019s organisational register told briefly; the MPC craft with the repo-ladder named; and the autonomy debate priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Central Bank\u2019s Census',
      'The RBI Register',
      'The MPC Craft',
      'The Autonomy Debate',
    ],
  },
  {
    number: 4,
    slug: 'money-supply-machinery',
    title: 'The Money-Supply Machinery',
    summary:
      'The monetary base and the multiplier arithmetic derived from the bank balance sheet; the high-powered-money ledger; the money-creation mechanics told with the loan-deposit cycle honestly; the money multiplier\u2019s limits named; and the Indian money-supply arithmetic worked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Multiplier Derived',
      'The High-Powered Ledger',
      'The Creation Mechanics',
      'The Indian Arithmetic',
    ],
  },
  {
    number: 5,
    slug: 'monetary-transmission',
    title: 'Monetary Transmission',
    summary:
      'The channel census — the interest-rate, credit, asset-price and expectation channels read; the transmission lags told honestly; the Taylor rule derived and read as the policy benchmark; the flexible-inflation-targeting register with the Indian framework priced; and the liquidity-trap honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Channel Census',
      'The Lag Honesty',
      'The Taylor Benchmark',
      'The Targeting Register',
    ],
  },
  {
    number: 6,
    slug: 'inflation-theory-deep',
    title: 'Inflation Theory Deepened',
    summary:
      'The quantity theory re-derived at depth — the MV-PQ ledger and its monetarist reading; the inflation-tax arithmetic; the expectations-augmented Phillips inheritance told; disinflation and the credibility register; and the Indian inflation cases priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quantity Ledger',
      'The Inflation Tax',
      'The Credibility Register',
      'The Indian Cases',
    ],
  },
  {
    number: 7,
    slug: 'instability-and-crisis',
    title: 'Instability and Crisis',
    summary:
      'The financial-friction register told — asymmetric information as the crisis grammar; Minsky\u2019s instability name priced; the 2008 case read honestly — the subprime chain and the policy responses; the moral-hazard-of-rescue honesty; and the Indian NPA register cross-referenced to the banking book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Friction Grammar',
      'The Minsky Name',
      'The 2008 Chain',
      'The NPA Cross-Reference',
    ],
  },
  {
    number: 8,
    slug: 'modern-money-and-doorway',
    title: 'Modern Money and the Doorway',
    summary:
      'The digital register told honestly — the UPI payment-stack case with its adoption arithmetic; CBDC\u2019s e-rupee register named without romance; the crypto-assets debate priced briefly; and the research doorway marked with the open questions.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The UPI Case',
      'The CBDC Register',
      'The Crypto Debate',
      'The Research Doorway',
    ],
  },
]

export const monetaryEconomics: Book = {
  id: 'monetary-economics',
  title: 'Monetary Economics',
  subtitle: 'Money, banks and the central bank: the monetary transmission register from the multiplier to the policy rate',
  discipline: 'economics-commerce',
  level: 'University + UGC NET unit + professional register',
  description: 'The monetary register: money\u2019s nature and measures, the financial system\u2019s map with the bank balance-sheet craft, the central bank\u2019s toolkit with the RBI case, the money-supply machinery with its multiplier arithmetic, the transmission channels and the Taylor-rule register, the inflation-theory deep side and the instability-and-crisis cases.',
  status: 'planned',
  accent: ['#99f6e4', '#115e59'],
  chapters,
}
