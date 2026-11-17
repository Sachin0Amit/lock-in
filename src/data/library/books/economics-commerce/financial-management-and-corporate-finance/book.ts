import type { Book, Chapter } from '../../../types'

/**
 * Financial Management & Corporate Finance — the fourteenth book of the Economics, Commerce & Finance shelf (the fold: the Financial Management and Corporate Finance backlog lines merged).
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 48 planned lessons, zero written. Lesson ids will use the `corpfin-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): The FOLD book: Financial Management (the Indian MBA-and-BCom register, Khan & Jain named) and Corporate Finance (the canonical Brealey-Myers-Allen arc, contents read this pass via the LoC catalog and McGraw-Hill’s evergreen 2025 PDF) merge into ONE book — the Circuit-Theory precedent of the engineering pass. Accounting owns the statement side; financial-economics owns the market-side theory; investment-analysis owns the security-analysis side — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Brealey, Myers, Allen & Edmans, Principles of Corporate Finance (the evergreen 2025 PDF's apparatus read this pass at mhe.com; the LoC catalog's contents read for the 9e spine) as the canonical arc.
 * - Khan & Jain, Financial Management (the Indian MBA register named) priced as the folded sibling line's own spine.
 * - The UGC NET Management (code 17) and Commerce (code 08) syllabi (ugcnetonline.in read this pass) cross-referenced as the registers served.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-manager-and-the-goal',
    title: 'The Manager and the Goal',
    summary:
      'The financial manager\u2019s three decisions mapped — investment, financing, dividend; the goal honesty — profit-maximisation\u2019s failings and shareholder-value\u2019s grammar; the agency problem and its governance remedies priced; and the CFO\u2019s craft told as the book\u2019s persona.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Decisions',
      'The Goal Honesty',
      'The Agency Ledger',
      'The CFO Persona',
    ],
  },
  {
    number: 2,
    slug: 'time-value-practice',
    title: 'The Time-Value Practice',
    summary:
      'The NPV machinery worked at the professional depth — multiple-and-uneven cash flows; IRR solved with its multiple-root honesty; the payback register with the discounted variant; the profitability-index ledger; and the mutually-exclusive-and-scale traps told plainly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The NPV Machinery',
      'IRR and Its Roots',
      'The Payback Register',
      'The Scale Traps',
    ],
  },
  {
    number: 3,
    slug: 'capital-budgeting',
    title: 'Capital Budgeting in Full',
    summary:
      'The project-cash-flow craft — incremental-and-sunk distinguished, the tax-shield arithmetic; the salvage-and-working-capital registers; replacement decisions solved; sensitivity-and-scenario analysis priced; and the Indian regulatory-and-tax honesty told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Incremental Craft',
      'The Tax-Shield Arithmetic',
      'Replacement Solved',
      'Sensitivity Priced',
    ],
  },
  {
    number: 4,
    slug: 'cost-of-capital',
    title: 'The Cost of Capital',
    summary:
      'The component costs computed — equity by the CAPM-and-dividend registers (the financial-economics book cross-referenced for the theory), debt after tax, preference told; the WACC assembled and weighted honestly; the marginal-cost-of-capital ladder; and the flotation-cost register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Component Ledger',
      'The WACC Assembled',
      'The Marginal Ladder',
      'The Flotation Register',
    ],
  },
  {
    number: 5,
    slug: 'capital-structure',
    title: 'Capital Structure and Leverage',
    summary:
      'The leverage census — operating, financial, combined computed; the EBIT-EPS arithmetic drawn; the indifference-point craft; the theory ladder — NI, NOI, the MM propositions told with their assumptions honest; the trade-off-and-pecking-order registers named; and the Indian capital-structure honesty priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Leverage Census',
      'The EBIT-EPS Ledger',
      'The MM Ladder',
      'The Trade-Off Registers',
    ],
  },
  {
    number: 6,
    slug: 'dividend-policy',
    title: 'Dividend Policy',
    summary:
      'The dividend-craft census — the Walter-and-Gordon models solved with their growth honesty; Modigliani-Miller\u2019s dividend irrelevance told; the stability register; the bonus-and-split arithmetic priced with the Indian case; the buyback register told briefly; and the clientele name explained.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Walter and Gordon Solved',
      'The Irrelevance Told',
      'The Stability Register',
      'Bonus, Split and Buyback',
    ],
  },
  {
    number: 7,
    slug: 'working-capital',
    title: 'Working Capital Management',
    summary:
      'The operating-and-cash cycles computed; the gross-vs-net distinction kept honest; the cash-management craft — Baumol\u2019s model named with the Miller-Orr complement; the receivables-and-credit-policy ledger with the collection register; and the inventory-and-payables management priced briefly (the cost book\u2019s cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cycle Arithmetic',
      'The Cash Craft',
      'The Receivables Ledger',
      'Inventory and Payables',
    ],
  },
  {
    number: 8,
    slug: 'sources-of-finance',
    title: 'The Sources of Finance',
    summary:
      'The short-term register — trade credit, the commercial-paper-and-banking craft; the long-term census — equity, debentures, term loans; the lease-vs-buy arithmetic solved; the venture-and-international registers named; and the Indian instruments told with the SME-and-startup register priced (the entrepreneurship book cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Short-Term Register',
      'The Long-Term Census',
      'The Lease-vs-Buy Arithmetic',
      'The Indian Instruments',
    ],
  },
  {
    number: 9,
    slug: 'valuation-and-corporate-actions',
    title: 'Business Valuation and Corporate Actions',
    summary:
      'The valuation census — the asset, market and income registers; the DCF valuation worked as the capstone (the financial-economics book\u2019s theory cross-referenced); the relative-multiple craft priced; the merger-and-acquisition register told with the Indian M&A cases named; and the restructuring honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Valuation Census',
      'The DCF Capstone',
      'The Multiple Craft',
      'The M&A Register',
      'ASK THE EXPERTS: Airline Mergers'
    ],
  },
  {
    number: 10,
    slug: 'derivatives-for-managers',
    title: 'Derivatives for the Manager',
    summary:
      'The hedging craft for the firm — forwards-and-futures priced for currency-and-interest honesty; the option-hedging registers told briefly; the swap idea named with the currency-and-interest pairs; and the speculation-vs-hedging distinction kept honest (the financial-economics book\u2019s pricing machinery cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Forward Ledger',
      'The Option Registers',
      'The Swap Idea',
      'Hedge versus Speculation',
      'Reconstitution Of A Partnership Firm',
      'Reconstitution And Dissolution Of Partnership Firms',
    ],
  },
  {
    number: 11,
    slug: 'integrated-capstone',
    title: 'The Integrated Capstone',
    summary:
      'The book\u2019s closing craft: the CFO dashboard assembled — the budgeting, financing and dividend registers tied; the corporate-governance register told with the SEBI honesty priced; the case-craft registers named; and the professional doorway — the CFA-and-CA registers marked with the research door.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CFO Dashboard',
      'The Governance Register',
      'The Case Craft',
      'The Professional Doorway',
    ],
  },
]

export const financialManagementAndCorporateFinance: Book = {
  id: 'financial-management-and-corporate-finance',
  title: 'Financial Management & Corporate Finance',
  subtitle: 'The firm-side finance course: investment, financing and dividend decisions from NPV to WACC (the Khan & Jain register folded with the Brealey-Myers-Allen arc)',
  discipline: 'economics-commerce',
  level: 'University/MBA + UGC NET Management & Commerce + professional',
  description: 'The merged firm-side finance register — the fold of the backlog\u2019s two sibling lines: the financial manager\u2019s goal and agency craft, the capital-budgeting machinery with NPV-IRR arithmetic, the cost-of-capital-and-WACC register, the capital-structure theory ladder with leverage, dividend policy\u2019s models, working-capital management, the sources-and-valuation registers and the integrated capstone.',
  status: 'planned',
  accent: ['#b45309', '#451a03'],
  chapters,
}
