import type { Book, Chapter } from '../../../types'

/**
 * Public Economics — the sixth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 48 planned lessons, zero written. Lesson ids will use the `pubeco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Public Economics owns the state register (the UGC NET Economics public-finance/public-economics unit read this pass). Macroeconomics owns the stabilisation side; public-administration (humanities shelf) owns the administration side — cross-referenced as the sibling discipline; the Indian budget register is priced throughout.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — the Public Economics / Public Finance unit) as the spine.
 * - Rosen & Gayer, Public Finance (the canonical arc named — the expenditure-taxation-federalism structure this plan follows) and Musgrave's classic named for the allocation-distribution-stabilisation frame.
 * - The Indian budget register (the union budget documents' structure) priced honestly as the standing case.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'why-government',
    title: 'Why Government',
    summary:
      'The welfare theorems revisited as the market\u2019s boundary conditions; Musgrave\u2019s allocation-distribution-stabilisation frame read; the government-failure register told with equal honesty — the public-choice grammar; and the state\u2019s census in the Indian constitution\u2019s schedule register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boundary Conditions',
      'The Musgrave Frame',
      'The Government-Failure Honesty',
      'The Schedule Register',
      'CASE STUDY: Why the Cow Is Not Extinct',
      '10-1b Negative Externalities 192 12-1a Taxes Collected by the Federal Government',
      'CASE STUDY: Why Is Gasoline Taxed So Heavily? 197 12-3 Taxes and Equity',
      '15-1 Why Monopolies Arise',
      '15-5c Public Ownership 310 17-4 Conclusion'
    ],
  },
  {
    number: 2,
    slug: 'public-goods-deep',
    title: 'Public Goods at Depth',
    summary:
      'The non-rival-non-excludable grammar with the pure-impure census; the Samuelson condition read as the efficient provision arithmetic; the free-rider problem solved with the Lindahl honesty and its limits; club goods told; and the commons register — Elinor Ostrom\u2019s governance name priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grammar and Census',
      'The Samuelson Condition',
      'The Lindahl Honesty',
      'The Ostrom Commons',
    ],
  },
  {
    number: 3,
    slug: 'externalities-deep',
    title: 'Externalities at Depth',
    summary:
      'The Pigouvian arithmetic solved at depth — the tax-and-subsidy registers; the Coase theorem read with its transaction-cost honesty; the cap-and-trade register with the carbon case priced; and the Indian environment-law register named briefly for the law book\u2019s cross-reference.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pigouvian Arithmetic',
      'The Coase Honesty',
      'The Cap-and-Trade Register',
      'The Carbon Case',
      'CASE STUDY: Who Pays the Luxury Tax? 126 CHAPTER',
      '6-3 Conclusion 127 Application: The Costs of Taxation',
      '10-2 Public Policies toward Externalities 195 CASE STUDY: Should Income or Consumption',
      'ASK THE EXPERTS: Carbon Taxes 200 IN THE NEWS: Tax Expenditures'
    ],
  },
  {
    number: 4,
    slug: 'public-expenditure',
    title: 'Public Expenditure',
    summary:
      'The Wagner law and the expenditure-growth honesty told; the merit-and-demerit good register; cost-benefit analysis solved — the shadow-price craft with the discount-rate debate; and the Indian expenditure census with its subsidy register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wagner Honesty',
      'The Merit Register',
      'The Shadow-Price Craft',
      'The Subsidy Register',
    ],
  },
  {
    number: 5,
    slug: 'taxation-theory',
    title: 'Taxation Theory',
    summary:
      'The canonical equity frame — benefit against ability-to-pay; the optimal-taxation register told with the Ramsey and Mirrlees names; tax incidence solved by the elasticity geometry; the deadweight ledger computed; and the distortion-vs-revenue honesty of the tax mix.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equity Frame',
      'The Ramsey and Mirrlees Names',
      'Incidence Geometry',
      'The Tax-Mix Honesty',
      'Key Concepts 128 8-1 The Deadweight Loss of Taxation'
    ],
  },
  {
    number: 6,
    slug: 'indian-tax-system',
    title: 'The Indian Tax System',
    summary:
      'The direct-side register — the income-tax structure with the slab arithmetic priced honestly; the GST case solved properly — the destination principle, the council craft, the compensation honesty; the VAT logic read; the GST-network named as the technology register; and the tax-to-GDP debate told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Direct Register',
      'The GST Case',
      'The Council Craft',
      'The Tax-to-GDP Debate',
    ],
  },
  {
    number: 7,
    slug: 'public-debt',
    title: 'Public Debt and Deficits',
    summary:
      'The deficit census — revenue, fiscal, primary with the Indian budget\u2019s arithmetic; the debt-sustainability condition solved — the r-g register; the Ricardian honesty told; the crowding-out ledger revisited from the macro side; and the FRBM register priced as the Indian discipline case.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Deficit Census',
      'The r-g Register',
      'The Ricardian Honesty',
      'The FRBM Case',
    ],
  },
  {
    number: 8,
    slug: 'fiscal-federalism',
    title: 'Fiscal Federalism',
    summary:
      'The assignment problem read — which level does what; the vertical-and-horizontal imbalance census with the transfer arithmetic; the Finance Commission\u2019s craft priced as the Indian case; the common-pool honesty of local borrowing; and the Panchayati-Raj register told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Assignment Problem',
      'The Imbalance Census',
      'The Finance Commission Case',
      'The Local Register',
      'Is What You Give Up to Get It',
      '5-3c Does Drug Interdiction Increase or Decrease'
    ],
  },
  {
    number: 9,
    slug: 'budget-and-doorway',
    title: 'The Budget Craft and the Doorway',
    summary:
      'The budget document read as a craft — the annual financial statement\u2019s anatomy; the gender-budgeting register named; the performance-and-outcome budget honesty; the parliamentary approval register told briefly (the public-administration book cross-referenced); and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Document\u2019s Anatomy',
      'The Gender Register',
      'The Outcome Honesty',
      'The Research Doorway',
    ],
  },
]

export const publicEconomics: Book = {
  id: 'public-economics',
  title: 'Public Economics',
  subtitle: 'The economics of the state: expenditure, taxation, debt and the federal craft',
  discipline: 'economics-commerce',
  level: 'University + UGC NET unit + policy register',
  description: 'The public register: the government\u2019s economic rationale from the welfare theorems\u2019 conditions, the public-goods-and-externalities pricing at depth, the expenditure craft with cost-benefit arithmetic, the taxation theory ladder and the Indian tax system\u2019s GST case, the debt-and-deficit sustainability register, and the fiscal-federalism craft.',
  status: 'planned',
  accent: ['#0d9488', '#042f2e'],
  chapters,
}
