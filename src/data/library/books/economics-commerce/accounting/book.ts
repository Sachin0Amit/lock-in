import type { Book, Chapter } from '../../../types'

/**
 * Accounting — the twelfth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `acct-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Accounting owns the financial-accounting register (the NCERT class 11-12 accountancy arc and the CA Foundation first-pass). Cost-accounting owns the cost-and-management side; financial-management-and-corporate-finance owns the ratio-and-decision side; financial-economics owns the valuation theory — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NCERT class 11-12 accountancy register (journal-to-final-accounts, partnership, company first pass, analysis and cash-flow registers) priced as the school spine; T.S. Grewal named as the classic school-side practice arc.
 * - The CA Foundation's accounting paper named as the professional first-pass register this book serves.
 * - The UGC NET Commerce syllabus (read this pass — the Accounting and Auditing unit) cross-referenced as the university register.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'foundations-and-equation',
    title: 'The Foundations and the Equation',
    summary:
      'The concept census — accrual against cash, the matching-and-consistency grammar told; the accounting equation as the double-entry constitution; capital-and-revenue receipts classified; and the GAAP-and-Ind-AS register named briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Concept Census',
      'The Equation Constitution',
      'The Receipts Classified',
      'The Standards Register',
      'The Theory Base of Accounting: Concepts and Standards',
    ],
  },
  {
    number: 2,
    slug: 'book-keeping-cycle',
    title: 'The Book-Keeping Cycle',
    summary:
      'The journal as the first ledger; the subsidiary-books register for the large business; the ledger\u2019s craft with the balancing arithmetic; the trial balance read as the honesty check; and the errors-register — the ones the trial balance catches and the ones it cannot.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Journal Ledger',
      'The Subsidiary Register',
      'The Balancing Arithmetic',
      'The Errors Census',
      'Recording of Transactions: Journal to Ledger',
    ],
  },
  {
    number: 3,
    slug: 'final-accounts',
    title: 'Final Accounts',
    summary:
      'The trading account\u2019s gross ledger; the profit-and-loss account\u2019s net craft; the balance sheet read as the position statement; adjustments — closing stock, outstanding-and-prepaid, depreciation — posted honestly; and the manufacturing account told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gross Ledger',
      'The Net Craft',
      'The Position Statement',
      'The Adjustments Posted',
    ],
  },
  {
    number: 4,
    slug: 'depreciation-and-reserves',
    title: 'Depreciation, Provisions and Reserves',
    summary:
      'Depreciation\u2019s causes told — wear, tear, obsolescence; the methods register — straight-line against diminishing balance with the arithmetic; provision-and-reserve distinguished; the secret-reserve honesty told; and the disposal-of-asset register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Causes Told',
      'The Methods Arithmetic',
      'Provisions versus Reserves',
      'The Disposal Register',
    ],
  },
  {
    number: 5,
    slug: 'bills-and-errors',
    title: 'Bills of Exchange and Rectification',
    summary:
      'The bill register — drawing, acceptance, discounting, dishonour told as the credit instrument\u2019s life; the notary-and-renewal registers priced briefly; and the rectification craft — the suspense account\u2019s honest role told with the one-sided-and-two-sided errors census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bill\u2019s Life',
      'The Notary Register',
      'The Rectification Craft',
      'The Suspense Role',
      'The Bank Reconciliation Statement',
    ],
  },
  {
    number: 6,
    slug: 'partnership-accounts',
    title: 'Partnership Accounts',
    summary:
      'The fundamental register — the profit-and-loss appropriation account with the interest-and-salary arithmetic; the admission case — the goodwill ledger and the revaluation account; retirement-and-death told at first-pass depth with the executors\u2019 ledger; and the dissolution register with the Garner-vs-Murray honesty named briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Appropriation Ledger',
      'The Admission Case',
      'Retirement and Death',
      'The Dissolution Register',
      'Admission of a Partner',
      'Retirement and Death of a Partner',
    ],
  },
  {
    number: 7,
    slug: 'company-accounts-first-pass',
    title: 'Company Accounts First Pass',
    summary:
      'The share register — equity and preference told with the issue-and-forfeiture arithmetic; the debenture register at first pass; the company\u2019s final accounts read briefly with the schedule-III craft named; and the issue-at-premium-and-discount honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Share Register',
      'The Debenture Register',
      'The Schedule-III Craft',
      'The Premium-Discount Honesty',
    ],
  },
  {
    number: 8,
    slug: 'analysis-and-cash-flow',
    title: 'The Analysis and Cash-Flow Doorway',
    summary:
      'The not-for-profit register told briefly; the ratio analysis first pass — the liquidity-and-solvency census read as the doorway to the corporate-finance book; the comparative-and-common-size registers; and the cash-flow statement as the closing craft with its operating-investing-financing ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The NPO Register',
      'The Ratio First Pass',
      'The Common-Size Registers',
      'The Cash-Flow Ledger',
      'Computerised Accounting and Spreadsheets',
    ],
  },
]

export const accounting: Book = {
  id: 'accounting',
  title: 'Accounting',
  subtitle: 'The language of business recorded: from the journal to the cash-flow statement',
  discipline: 'economics-commerce',
  level: 'Class 11-12 + CA Foundation first pass + university',
  description: 'The accounting register: the concept-and-equation foundations, the book-keeping cycle from journal to trial balance, the final accounts craft with adjustments, depreciation-and-reserve registers, the partnership and company first-pass accounts, the not-for-profit and analysis registers, and the cash-flow doorway.',
  status: 'planned',
  accent: ['#2563eb', '#1e3a8a'],
  chapters,
}
