import type { Book, Chapter } from '../../../types'

/**
 * Marketing — the twentieth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `mktg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Marketing owns the market-facing register (the UGC NET Commerce-and-Management marketing units read this pass). Business-studies owns the school first-pass; consumer-behaviour’s psychology side is cross-referenced to the humanities shelf’s psychology book; the entrepreneurship book’s growth register borrows here — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kotler & Armstrong's Principles of Marketing (the canonical arc named) as the spine; the Indian practice register (the FMCG cases) priced honestly.
 * - The UGC NET Commerce syllabus (read this pass — the marketing unit) and the Management (code 17) syllabus cross-referenced as the registers served.
 * - The NCERT class 12 marketing first pass priced as the school ladder beneath.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'foundations-and-value',
    title: 'Foundations: The Value Craft',
    summary:
      'Marketing defined against selling-and-production; the needs-wants-demands grammar; the value-and-satisfaction ledger; the orientations evolution — production, product, selling, marketing, societal told; the mix previewed as the four-P map; and the marketing-process cycle drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Definition Craft',
      'The Value Ledger',
      'The Orientations Told',
      'The Process Drawn',
    ],
  },
  {
    number: 2,
    slug: 'segmentation-targeting-positioning',
    title: 'Segmentation, Targeting and Positioning',
    summary:
      'The segmentation census — the demographic, geographic, psychographic-and-behavioural registers read; the targeting craft — the evaluation-and-strategy registers priced; the positioning discipline — the map-and-perception craft worked; and the differentiation honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census Read',
      'The Targeting Craft',
      'The Map Worked',
      'The Differentiation Honesty',
    ],
  },
  {
    number: 3,
    slug: 'product-and-brand',
    title: 'Product and Brand',
    summary:
      'The product\u2019s levels read; the classification census — convenience, shopping, specialty; the life-cycle arithmetic with the stage-strategy map; the new-product craft — the development funnel priced; the brand ledger — equity-and-architecture told with the Indian cases named; and the packaging register priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Levels Read',
      'The Life-Cycle Arithmetic',
      'The Brand Ledger',
      'The Indian Cases Named',
    ],
  },
  {
    number: 4,
    slug: 'pricing-strategies',
    title: 'Pricing Strategy',
    summary:
      'The price craft as the three-C arithmetic — cost, customer, competition read; the method census — cost-plus, value, competition priced; the new-product pricing pair — skimming-and-penetration told; the psychology register (the behavioural book\u2019s doorway marked); and the discount-and-geography registers told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-C Arithmetic',
      'The Method Census',
      'The Skim-Penetrate Pair',
      'The Psychology Register',
    ],
  },
  {
    number: 5,
    slug: 'distribution-and-channels',
    title: 'Distribution and Channels',
    summary:
      'The channel census — the direct-and-indirect registers with the levels told; the intermediary ledger — wholesaler, retailer, the modern-format register priced; the logistics-and-SCM craft told briefly (the operations book\u2019s deep side cross-referenced); and the e-commerce channel register priced with the Indian case named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Channel Census',
      'The Intermediary Ledger',
      'The Logistics Craft',
      'The E-Commerce Channel',
    ],
  },
  {
    number: 6,
    slug: 'promotion-and-imc',
    title: 'Promotion and the IMC Register',
    summary:
      'The promotion census — the five registers read; the communication-model craft told; the advertising machinery — the copy-and-media registers priced; the personal-selling-and-SQL craft told briefly; the PR-and-publicity register; and the integrated honesty — the one-voice discipline told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Five Registers',
      'The Model Craft',
      'The Advertising Machinery',
      'The One-Voice Discipline',
    ],
  },
  {
    number: 7,
    slug: 'services-and-relationship',
    title: 'Services and Relationship Marketing',
    summary:
      'The service\u2019s honesty — intangibility, inseparability, variability, perishability told; the service-quality register — the gap-and-SERVQUAL craft priced; the extended-mix ledger read; and the relationship register — the CRM machinery with the loyalty-and-retention arithmetic told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Honesty Terms',
      'The SERVQUAL Craft',
      'The Extended Mix',
      'The CRM Machinery',
    ],
  },
  {
    number: 8,
    slug: 'digital-and-consumer-doorway',
    title: 'Digital and the Consumer Doorway',
    summary:
      'The digital register — the search, social-and-content crafts priced; the funnel-and-analytics arithmetic told; the consumer-behaviour first pass — the buying-process map with the psychology book\u2019s cross-reference; the ethics register — the privacy-and-claim honesty told; and the professional doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Digital Register',
      'The Analytics Arithmetic',
      'The Buying Map',
      'The Privacy Honesty',
    ],
  },
]

export const marketing: Book = {
  id: 'marketing',
  title: 'Marketing',
  subtitle: 'The market-facing discipline: STP, the mix, services and the digital-and-consumer registers',
  discipline: 'economics-commerce',
  level: 'University/MBA + UGC NET Commerce & Management + professional',
  description: 'The marketing register: the foundations-and-value craft, the segmentation-targeting-positioning discipline, the product-and-brand registers with the life-cycle craft, pricing\u2019s strategy arithmetic, the distribution-and-channel machinery, the promotion-and-IMC register, the services-and-relationship side, and the digital-and-consumer-behaviour doorways.',
  status: 'planned',
  accent: ['#e11d48', '#881337'],
  chapters,
}
