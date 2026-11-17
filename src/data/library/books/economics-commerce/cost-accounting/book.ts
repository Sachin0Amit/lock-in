import type { Book, Chapter } from '../../../types'

/**
 * Cost Accounting — the thirteenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 37 planned lessons, zero written. Lesson ids will use the `cost-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Cost Accounting owns the cost-and-management register (the CA-CMA costing arc named). Financial-management-and-corporate-finance owns the financing-and-investment side; accounting owns the financial-statement side; the mathematics shelf’s optimization book owns the pure OR side — cross-referenced at the inventory-and-decision lessons.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Horngren's Cost Accounting (the canonical arc named) as the teaching spine; the ICAI's CA register named as the Indian professional pole this book serves.
 * - The mathematics shelf's optimization-and-operations-research book cross-referenced at the EOQ and linear-programming registers it owns purely.
 * - The UGC NET Commerce syllabus (read this pass — the costing registers in the accounting-and-business-economics units) cross-referenced.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'cost-concepts-and-cost-sheet',
    title: 'Cost Concepts and the Cost Sheet',
    summary:
      'Cost classified — the element census (material, labour, overhead) against the function-and-behaviour registers; fixed, variable and semi-variable told; the cost sheet assembled as the book\u2019s first document; and cost-centre-and-cost-unit distinguished.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Element Census',
      'The Behaviour Register',
      'The Cost Sheet Assembled',
      'Centre versus Unit',
      'Spilt Milk and Other Sunk Costs',
    ],
  },
  {
    number: 2,
    slug: 'material-costing',
    title: 'Material Costing',
    summary:
      'The purchase-and-store cycle told as the material ledger; the EOQ arithmetic worked with the ordering-and-carrying trade (the mathematics OR book cross-referenced for the pure side); stock levels — minimum, maximum, reorder told; and pricing methods — FIFO, LIFO, weighted average priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Material Ledger',
      'The EOQ Arithmetic',
      'The Stock Levels',
      'The Pricing Methods',
    ],
  },
  {
    number: 3,
    slug: 'labour-costing',
    title: 'Labour Costing',
    summary:
      'The labour-cost census — direct against indirect; the wage-systems register — time, piece, and the incentive pair (Taylor-and-Gantt registers named); idle-time-and-overtime priced with their treatment honesty; and the labour-turnover arithmetic told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Labour Census',
      'The Wage Register',
      'Idle and Overtime Treated',
      'The Turnover Arithmetic',
    ],
  },
  {
    number: 4,
    slug: 'overheads',
    title: 'Overhead Machinery',
    summary:
      'The overhead classified — factory, administration, selling; allocation-against-apportionment told as the grammar; the absorption craft — machine-hour-and-labour rates computed; the over-and-under-absorption honesty told; and the service-department reapportionment registers priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Overhead Census',
      'Allocation Grammar',
      'The Absorption Craft',
      'The Reapportionment Registers',
    ],
  },
  {
    number: 5,
    slug: 'costing-methods',
    title: 'The Costing Methods Census',
    summary:
      'The method census by production shape — job costing\u2019s craft; batch with the batch-cost arithmetic; contract costing with the escalation-and-certified registers; the process register — normal-and-abnormal loss computed; and the joint-and-by-product ledger priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Job Craft',
      'The Batch Arithmetic',
      'The Contract Registers',
      'The Process-and-Joint Ledger',
    ],
  },
  {
    number: 6,
    slug: 'standard-costing',
    title: 'Standard Costing and Variances',
    summary:
      'The standard set as the benchmark ledger; the material-variance family computed — cost, price and quantity; the labour variances the same way; the overhead-variance register priced briefly; the variance-accountability map drawn; and the standard-vs-actual honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Benchmark Ledger',
      'The Material Variance Family',
      'The Labour Variances',
      'The Accountability Map',
    ],
  },
  {
    number: 7,
    slug: 'marginal-costing',
    title: 'Marginal Costing and Decisions',
    summary:
      'The contribution ledger as the marginal grammar — CVP arithmetic solved; the break-even computed and drawn; the margin-of-safety read; the P/V ratio register; the decision cases — make-or-buy, drop-or-continue, pricing told; and the absorption-vs-marginal honesty carried.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Contribution Grammar',
      'The Break-Even Ledger',
      'The P/V Register',
      'The Decision Cases',
    ],
  },
  {
    number: 8,
    slug: 'budgets-and-doorway',
    title: 'Budgets and the Doorway',
    summary:
      'The budget census — functional and the master; the flexible-budget craft against the fixed honesty; the cash budget\u2019s ledger told; the performance-budgeting-and-ZBB registers named; the activity-based costing doorway priced honestly; and the book\u2019s research-and-professional doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Budget Census',
      'The Flexible Craft',
      'The Cash Ledger',
      'The ABC Doorway',
    ],
  },
]

export const costAccounting: Book = {
  id: 'cost-accounting',
  title: 'Cost Accounting',
  subtitle: 'The cost engine: materials, labour, overheads, the costing methods and the variance-and-marginal decision registers',
  discipline: 'economics-commerce',
  level: 'University + CA register + professional',
  description: 'The cost-and-management register: cost\u2019s concepts and classifications, the material-costing craft with its inventory arithmetic, labour costing with wage systems, the overhead machinery with its absorption craft, the costing-methods census — job, batch, contract and process, standard costing\u2019s variance arithmetic, and the marginal-costing-and-budget registers that close the course.',
  status: 'planned',
  accent: ['#64748b', '#1f2937'],
  chapters,
}
