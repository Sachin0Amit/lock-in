import type { Book, Chapter } from '../../../types'

/**
 * Business Studies — the eleventh book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `bus-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Business Studies owns the school commerce register (the NCERT class 11-12 business-studies arc). Marketing and human-resource-management own the deep functional registers; financial-management-and-corporate-finance owns the finance deep side; law-and-legal-studies (humanities shelf) owns the company-law register — all cross-referenced as the deep homes.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NCERT class 11-12 Business Studies register (nature and forms of business, principles of management, business environment, the management functions ladder, marketing-and-financial first passes, consumer protection) priced as the school spine.
 * - Fayol's and Taylor's names carried from the school arc itself; Koontz's management text named as the university pole.
 * - The UGC NET Management and Commerce syllabi (read this pass) cross-referenced as the registers the deep books serve.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'nature-and-forms',
    title: 'The Nature and Forms of Business',
    summary:
      'Business classified — industry, commerce, trade with the auxiliaries census; risk as the defining honesty; the forms register — sole proprietorship, partnership, company, cooperative with their merits ledger; and the choice-of-form craft told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classification',
      'The Auxiliaries Census',
      'The Forms Ledger',
      'The Choice Craft',
      'Private, Public and Global Enterprises',
      'Formation of a Company',
      'Internal Trade: Wholesale and Retail',
    ],
  },
  {
    number: 2,
    slug: 'business-services',
    title: 'Business Services',
    summary:
      'The services census — banking, insurance, warehousing, transport and communication told as commerce\u2019s arteries; e-business and outsourcing named as the emerging registers; and the BPO-and-B2C registers priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Services Census',
      'The Emerging Registers',
      'The BPO Register',
      'The B2C Register',
    ],
  },
  {
    number: 3,
    slug: 'social-responsibility-and-ethics',
    title: 'Social Responsibility and Ethics',
    summary:
      'The responsibility register — environment, employees, the community ledger; the Carroll pyramid named gently; business ethics told as the register the humanities shelf\u2019s ethics book deepens; and the environment-first-pass cross-reference to environmental-studies.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Community Ledger',
      'The Carroll Pyramid',
      'The Ethics Cross-Reference',
      'The Environment First Pass',
    ],
  },
  {
    number: 4,
    slug: 'management-principles',
    title: 'Management Principles',
    summary:
      'Management\u2019s nature and significance told; the levels-and-skill census; Fayol\u2019s fourteen told at first-pass depth; Taylor\u2019s scientific register with its honest limits; and the POLC ladder previewed as the next chapters\u2019 map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nature and Significance',
      'The Level Census',
      'Fayol\u2019s Fourteen',
      'Taylor\u2019s Register',
      'Fayol\'s and Taylor\'s Principles of Management',
    ],
  },
  {
    number: 5,
    slug: 'planning-and-organising',
    title: 'Planning and Organising',
    summary:
      'The planning craft — objectives, policies, procedures told as the forward register; decision-making first pass; the organising craft — departmentation, authority-responsibility and delegation-vs-decentralisation told; and the formal-vs-informal organisation distinction.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Planning Craft',
      'The Decision First Pass',
      'The Organising Craft',
      'Delegation versus Decentralisation',
    ],
  },
  {
    number: 6,
    slug: 'staffing-and-directing',
    title: 'Staffing and Directing',
    summary:
      'The staffing register — recruitment-and-selection told briefly with the HRM book\u2019s deep doorway marked; the directing craft — motivation\u2019s Maslow-and-Herzberg first pass; leadership styles classified; communication as the manager\u2019s artery; and the supervision register told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Staffing First Pass',
      'The Motivation First Pass',
      'Leadership Classified',
      'Communication as Artery',
    ],
  },
  {
    number: 7,
    slug: 'controlling-and-environment',
    title: 'Controlling and the Business Environment',
    summary:
      'The controlling craft — the standard-measure-compare-action cycle told; the economic-and-non-economic environment census with the PESTEL frame named; the Indian environment register priced with the liberalisation case told briefly; and the environmental-scanning craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Control Cycle',
      'The PESTEL Frame',
      'The Indian Register',
      'The Scanning Craft',
    ],
  },
  {
    number: 8,
    slug: 'consumer-protection-and-projects',
    title: 'Consumer Protection and the Projects Doorway',
    summary:
      'The consumer register — rights and the Consumer Protection Act\u2019s three-tier craft priced as the Indian case; the redress machinery told; the project craft — the business-plan and case-study registers as the boards\u2019 demand; and the doorway map to the shelf\u2019s deep books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rights Census',
      'The Three-Tier Craft',
      'The Project Registers',
      'The Doorway Map',
    ],
  },
]

export const businessStudies: Book = {
  id: 'business-studies',
  title: 'Business Studies',
  subtitle: 'The business register first pass: forms, management principles and the POLC ladder of the school arc',
  discipline: 'economics-commerce',
  level: 'Class 11-12 (school register) + first university pass',
  description: 'The commerce-side school ladder: business\u2019s nature and forms, the management-principles register with Fayol and Taylor, the planning-organising-staffing-directing-controlling ladder, the business-environment craft, the first-pass registers of finance and marketing with their cross-references, and the consumer-protection and projects doorway.',
  status: 'planned',
  accent: ['#0891b2', '#164e63'],
  chapters,
}
