import type { Book, Chapter } from '../../../types'

/**
 * Banking — the fifteenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `bank-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Banking owns the institutional-and-operational register (the UGC NET Commerce banking unit read this pass). Monetary-economics owns the policy-and-transmission theory side; accounting owns the double-entry craft the bank’s books use; the risk chapters price the same Basel register the corporate-finance book meets from the firm side — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Commerce syllabus (read this pass — the Banking unit incl. the insurance-and-technology registers) as the spine.
 * - The Indian banking system's published register (RBI's master-direction apparatus, the IBA texts) priced honestly as the case base; Bessis's risk framework named for the risk chapters' pole.
 * - Mishkin's banking chapters (the monetary-economics book's spine) cross-referenced as the economics side.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'origins-and-landscape',
    title: 'The Origins and the Landscape',
    summary:
      'The banking story told honestly — from goldsmith to the modern intermediary; the Indian banking census — scheduled, commercial, cooperative, regional rural classified; the Payments Bank-and-SFB registers named; and the structure map drawn with the RBI at the head.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Goldsmith Story',
      'The Indian Census',
      'The New Registers',
      'The Structure Map',
      'The Financial Markets Register',
    ],
  },
  {
    number: 2,
    slug: 'the-bank-balance-sheet',
    title: 'The Bank\u2019s Balance Sheet',
    summary:
      'The bank\u2019s books read as the working ledger — the asset side\u2019s loans-and-investments, the liability side\u2019s deposits-and-borrowings; the NPA register read with the provisioning arithmetic; the capital-and-reserve ledger told; and the margin honesty priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ledger Read',
      'The NPA Register',
      'The Provisioning Arithmetic',
      'The Margin Honesty',
    ],
  },
  {
    number: 3,
    slug: 'operations-and-credit',
    title: 'Operations and Credit',
    summary:
      'The deposit-and-clearing machinery told; the credit-appraisal craft — the five-C register with the working-capital assessment arithmetic; the KYC-and-AML discipline told as the compliance honesty; and the priority-sector register priced as the Indian mandate.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clearing Machinery',
      'The Five-C Craft',
      'The KYC Discipline',
      'The Priority Sector',
    ],
  },
  {
    number: 4,
    slug: 'payments-and-technology',
    title: 'Payments and Technology',
    summary:
      'The payment-system census — cheque to NEFT-RTGS-IMPS told as the settlement ladder; the UPI case priced properly — the two-tier architecture-and-adoption arithmetic; core-banking named; the digital-lending register told with its honesty; and the cybersecurity register priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Settlement Ladder',
      'The UPI Case',
      'The Core Register',
      'The Digital-Lending Honesty',
    ],
  },
  {
    number: 5,
    slug: 'risk-and-basel',
    title: 'Risk and the Basel Craft',
    summary:
      'The bank-risk census — credit, market, operational, liquidity read as the register\u2019s four pillars; the capital-adequacy arithmetic — CAR computed; Basel-I-to-III told as the regulatory history; the stress-testing craft priced; and the Indian adaptation register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Pillars',
      'The CAR Arithmetic',
      'The Basel History',
      'The Stress Craft',
    ],
  },
  {
    number: 6,
    slug: 'insurance-craft',
    title: 'The Insurance Craft',
    summary:
      'Insurance\u2019s principles told — utmost good faith, insurable interest, indemnity; the life-and-general census; the premium-and-claim registers priced briefly; the IRDAI named as the regulator; and the bancassurance register told as the distribution honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Principles Told',
      'The Census',
      'The Premium Registers',
      'The Distribution Honesty',
    ],
  },
  {
    number: 7,
    slug: 'regulation-and-ethics',
    title: 'Regulation and the Banking Ethics',
    summary:
      'The regulatory craft — the RBI\u2019s supervision registers told; the resolution-and-insolvency honesty with the 2019 case priced; the consumer-protection register told; the banking-ethics ledger (the humanities shelf\u2019s ethics book cross-referenced for the deep side); and the professional doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Supervision Registers',
      'The Resolution Honesty',
      'The Consumer Register',
      'The Professional Doorway',
    ],
  },
  {
    number: 8,
    slug: 'doorway',
    title: 'The Banking Doorway',
    summary:
      'The NBFC-and-DFI registers told (the monetary-economics book\u2019s crisis chapters cross-referenced); the development-banking history told briefly; the fintech-and-digital-asset register priced honestly with its regulatory honesty; and the professional doorway — the JAIIB-CAIIB registers named with the career map drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The NBFC Registers',
      'The DFI History',
      'The Fintech Register',
      'The Career Map',
    ],
  },
]

export const banking: Book = {
  id: 'banking',
  title: 'Banking',
  subtitle: 'The banking register: balance sheets, operations, regulation and the payment-and-insurance crafts of the Indian system',
  discipline: 'economics-commerce',
  level: 'University + UGC NET Commerce + professional',
  description: 'The banking register: the system\u2019s structure mapped, the bank balance sheet read as the working document, the operations-and-credit craft with the NPA honesty, the payments-and-technology register with the UPI case, the risk-and-Basel machinery, the insurance-and-allied crafts, and the doorway to the professional registers.',
  status: 'planned',
  accent: ['#0284c7', '#075985'],
  chapters,
}
