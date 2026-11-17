import type { Book, Chapter } from '../../../types'

/**
 * International Business — the twenty-third book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `intbus-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): International Business owns the firm-side global register (UGC NET Commerce unit 1’s international register read this pass). International-economics owns the trade-and-payments theory side; marketing-and-HRM own the functional deep sides; the anthropology book (humanities shelf) owns the culture-science deep side — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Hill's International Business: Competing in the Global Marketplace (the canonical arc named) as the spine.
 * - The UGC NET Commerce syllabus (read this pass — Unit 1's Business Environment and International Business register) as the served register.
 * - Hofstede's dimensions named in the culture chapter with the anthropology book's deep side cross-referenced.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'globalisation-and-foundations',
    title: 'Globalisation and the Foundations',
    summary:
      'The globalisation register read — the drivers-and-waves told with the sceptics\u2019 honesty priced; the IB-against-domestic distinction carried; the institution map — WTO-and-IMF named (the international-economics book\u2019s deep side cross-referenced); and the emerging-market story told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Register Read',
      'The Skeptics\u2019 Honesty',
      'The Institution Map',
      'The Emerging Story',
      '14-3c Why Do Competitive Firms Stay in Business'
    ],
  },
  {
    number: 2,
    slug: 'country-differences',
    title: 'Country Differences: The Craft',
    summary:
      'The political-economy census — the systems-and-risk registers read; the economic-development ladder priced; the culture craft — Hofstede\u2019s dimensions worked with the anthropology book\u2019s cross-reference; the PESTEL discipline applied to the country case; and the ethics-in-country register told honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Systems Census',
      'The Risk Registers',
      'Hofstede Worked',
      'The Ethics Register',
      '9-2b The Gains and Losses of an Importing Country'
    ],
  },
  {
    number: 3,
    slug: 'market-entry',
    title: 'The Market-Entry Ladder',
    summary:
      'The entry census read — the indirect-and-direct exporting registers; the licensing-and-franchising pair; the joint-venture-and-wholly-owned registers priced; the make-or-buy trade carried to the FDI craft; the entry-decision arithmetic worked; and the exit honesty told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census Read',
      'The Licensing Pair',
      'The FDI Craft',
      'The Exit Honesty',
    ],
  },
  {
    number: 4,
    slug: 'global-production',
    title: 'Global Production and the World Chain',
    summary:
      'The production-craft trade told — where-and-how; the offshoring-and-outsourcing registers priced with their honesty; the supply-chain craft (the operations book\u2019s deep side cross-referenced); the sourcing registers read; and the reshoring story told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Trade Told',
      'The Offshoring Registers',
      'The Chain Cross-Reference',
      'The Reshoring Story',
    ],
  },
  {
    number: 5,
    slug: 'global-functions',
    title: 'The Global Functions',
    summary:
      'The global-marketing first pass — the standardisation-adaptation trade priced (the marketing book cross-referenced); the global-HR register — the expatriate craft and the staffing census (the HRM book cross-referenced); the global-R&D register named briefly; and the global-organisation craft told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Standardisation Trade',
      'The Expatriate Craft',
      'The R&D Register',
      'The Organisation Craft',
    ],
  },
  {
    number: 6,
    slug: 'multinational-finance',
    title: 'The Multinational Finance Register',
    summary:
      'The MNE finance census — the capital-budgeting-with-country-risk craft (the corporate-finance book\u2019s deep side cross-referenced); the currency-and-transaction exposure registers priced; the transfer-pricing craft told with its regulation honesty; the international-tax register named briefly; and the global-capital-market story told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Country-Risk Craft',
      'The Exposure Registers',
      'The Transfer-Pricing Craft',
      'The Global-Market Story',
    ],
  },
  {
    number: 7,
    slug: 'ethics-and-regional-doorway',
    title: 'Ethics, Regions and the Doorway',
    summary:
      'The ethics register told properly — the sweatshop-and-labour debates priced honestly; the sustainability-and-CSR registers in the global frame; the regional census — the EU-and-ASEAN-and-RCEP registers read briefly; and the professional doorway with the research map marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Labour Debates',
      'The Global CSR Frame',
      'The Regional Census',
      'The Research Map',
    ],
  },
  {
    number: 8,
    slug: 'india-and-doorway',
    title: 'The India Case and the Doorway',
    summary:
      'The Indian IB register — the outward-FDI story with the cases named; the export-craft policy registers told briefly (the international-economics book\u2019s trade-policy deep side cross-referenced); the free-trade-and-zone registers priced; and the career-and-research doorway marked honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Outward Story',
      'The Export Registers',
      'The Zone Craft',
      'The Career Doorway',
    ],
  },
]

export const internationalBusiness: Book = {
  id: 'international-business',
  title: 'International Business',
  subtitle: 'The global firm: country craft, entry strategies, the world chain and the ethics register',
  discipline: 'economics-commerce',
  level: 'University/MBA + UGC NET Commerce unit 1 + professional',
  description: 'The international-business register: the globalisation-and-country craft with the PESTEL and culture registers, the political-economy-and-risk craft, the market-entry ladder from exporting to FDI, the global-production-and-supply-chain side, the global-marketing-and-HR first passes, the multinational-finance register, and the ethics-and-regional doorway.',
  status: 'planned',
  accent: ['#334155', '#0f172a'],
  chapters,
}
