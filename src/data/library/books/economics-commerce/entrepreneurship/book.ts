import type { Book, Chapter } from '../../../types'

/**
 * Entrepreneurship — the nineteenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `entrep-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Entrepreneurship owns the venture register (the NCERT class 11-12 entrepreneurship arc named). Business-studies owns the school first-pass of forms; financial-management-and-corporate-finance owns the valuation-and-deal machinery; marketing owns the growth craft’s deep side — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NCERT class 11-12 Entrepreneurship register (the school arc: entrepreneurial opportunity, planning, funding, the market-facing and enterprise-operation registers) priced as the school spine.
 * - Hisrich, Peters & Shepherd's Entrepreneurship named as the university pole; the lean-startup register named honestly as the modern practice pole.
 * - The Startup-India policy register priced as the Indian case this book's ecosystem chapter carries.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-mindset',
    title: 'The Entrepreneurial Mindset',
    summary:
      'The entrepreneur defined honestly — against the manager-and-intrapreneur census; the trait-and-behaviour registers told with their limits priced; the failure-and-risk honesty carried; the Indian entrepreneurship register named; and the types census — small, scalable, social told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Definition Honesty',
      'The Trait Limits',
      'The Failure Register',
      'The Types Census',
    ],
  },
  {
    number: 2,
    slug: 'opportunity-and-ideation',
    title: 'Opportunity and Ideation',
    summary:
      'The opportunity craft — the idea-and-opportunity distinction told; the scan-and-sense register; the ideation tools — SCAMPER and the canvas family priced briefly; the validation craft — the problem-solution fit; and the honesty gate — the bad-idea filters.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Distinction Told',
      'The Scan Register',
      'The Ideation Tools',
      'The Honesty Gate',
    ],
  },
  {
    number: 3,
    slug: 'the-business-plan',
    title: 'The Business-Plan Discipline',
    summary:
      'The plan\u2019s anatomy read as the document craft — the summary, model and market chapters; the business-model canvas worked properly; the lean-canvas variant named; the plan-vs-pivot honesty told; and the presentation register — the pitch craft priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anatomy Read',
      'The Canvas Worked',
      'The Pivot Honesty',
      'The Pitch Craft',
    ],
  },
  {
    number: 4,
    slug: 'funding-the-venture',
    title: 'Funding the Venture',
    summary:
      'The funding ladder walked — bootstrapping, friends-and-family, angel, the VC-and-PE registers told honestly; the equity-vs-debt trade priced; the valuation first pass (the corporate-finance book\u2019s deep side cross-referenced); the grant-and-subsidy registers named; and the dilution arithmetic told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ladder Walked',
      'The Equity-Debt Trade',
      'The Valuation First Pass',
      'The Dilution Arithmetic',
    ],
  },
  {
    number: 5,
    slug: 'launch-and-operations',
    title: 'Launch and the Lean Register',
    summary:
      'The MVP craft told as the build-measure-learn loop; the launch registers — the pilot and the soft-open priced; the legal-and-compliance first pass (the law book\u2019s deep side cross-referenced); the team register — the co-founder-and-first-hire craft; and the founder\u2019s operating honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The MVP Loop',
      'The Launch Registers',
      'The Compliance First Pass',
      'The Team Craft',
    ],
  },
  {
    number: 6,
    slug: 'scaling-and-metrics',
    title: 'Scaling and the Metric Register',
    summary:
      'The growth craft — the funnel arithmetic and the retention ledger; the unit-economics register — CAC, LTV and the contribution margin priced; the scale-hiring-and-process honesty; the pivot-and-exit registers told briefly; and the failures census priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Funnel Arithmetic',
      'The Unit Register',
      'The Process Honesty',
      'The Exit Registers',
    ],
  },
  {
    number: 7,
    slug: 'marketing-for-startups',
    title: 'Marketing for the Startup',
    summary:
      'The growth-marketing first pass — the channel census and the content register (the marketing book\u2019s deep side cross-referenced); the brand-on-a-budget craft told; the pricing first pass; and the customer-development honesty told as the marketing book\u2019s sibling idea.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Channel Census',
      'The Budget Brand Craft',
      'The Pricing First Pass',
      'The Customer Honesty',
    ],
  },
  {
    number: 8,
    slug: 'ecosystem-and-doorway',
    title: 'The Ecosystem and the Doorway',
    summary:
      'The ecosystem map drawn — incubators, accelerators, the mentor register told; the Startup-India policy register priced as the Indian case; the social-and-rural venture registers told; the family-business succession register named briefly; and the doorway — the founder\u2019s reading map marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ecosystem Map',
      'The Policy Case',
      'The Social Registers',
      'The Reading Map',
    ],
  },
]

export const entrepreneurship: Book = {
  id: 'entrepreneurship',
  title: 'Entrepreneurship',
  subtitle: 'The venture craft: mindset, opportunity, plan, funding and the scaling register',
  discipline: 'economics-commerce',
  level: 'School NCERT + university/MBA + founder register',
  description: 'The entrepreneurship register: the entrepreneur\u2019s mindset told honestly, the opportunity-and-ideation craft, the business-plan discipline with the canvas registers, the funding ladder from bootstrapping to the VC register, the launch-and-scaling craft with its metrics, and the ecosystem-and-policy doorway with the Indian case.',
  status: 'planned',
  accent: ['#f97316', '#7c2d12'],
  chapters,
}
