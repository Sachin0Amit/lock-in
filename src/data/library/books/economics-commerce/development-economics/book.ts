import type { Book, Chapter } from '../../../types'

/**
 * Development Economics — the fifth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `deveco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Development Economics owns the transformation register (the UGC NET Economics development unit read this pass). Macroeconomics owns the growth-theory formal side; environmental-studies (humanities shelf) owns the sustainability science side — cross-referenced honestly; the Indian development register is priced throughout as the standing case.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — the Development Economics unit) as the spine.
 * - Todaro & Smith, Economic Development (the canonical arc named — the problems-policies structure this plan follows) and Thirlwall named as the pole; Sen's Development as Freedom named for the capability frame.
 * - The NCERT class 10 development register (the school ladder read this pass) priced as the first-pass beneath.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'meaning-and-measurement',
    title: 'The Meaning and the Measure',
    summary:
      'Development against growth told as the first distinction; the income ladder and its purchasing-power honesty; the HDI arithmetic computed and criticised; Sen\u2019s capability frame read as the alternative; and the happiness register named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The First Distinction',
      'The Income Ladder',
      'The HDI Computed and Criticised',
      'The Capability Frame',
      'Indian Economy on the Eve of Independence',
      'Indian Economic Development: Current Challenges facing the Indian Economy',
      'Comparative Development Experiences: India and Its Neighbours',
    ],
  },
  {
    number: 2,
    slug: 'growth-and-traps',
    title: 'Growth Theory and Poverty Traps',
    summary:
      'The Solow inheritance told for the developing register; the poverty-trap arithmetic — the coordination-failure and big-push registers; the multiple-equilibria geometry; and the take-off history honestly told with the Indian planning case priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Solow Inheritance',
      'The Big-Push Register',
      'Multiple Equilibria',
      'The Take-Off History',
      'Liberalisation, Privatisation and Globalisation: The 1991 Appraisal',
    ],
  },
  {
    number: 3,
    slug: 'poverty-and-inequality',
    title: 'Poverty and Inequality',
    summary:
      'The poverty line\u2019s craft — absolute against relative with the Indian register priced; headcount, gap and severity indices computed; the Lorenz curve and Gini arithmetic; the growth-inequality-poverty triangle read; and the redistributive register told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Poverty Craft',
      'The Index Arithmetic',
      'Lorenz and Gini',
      'The Triangle Read',
    ],
  },
  {
    number: 4,
    slug: 'population-and-migration',
    title: 'Population and Migration',
    summary:
      'The demographic transition read as the census map; the Malthusian honesty told against the Boserup complement; the Todaro migration model solved; remittances priced as the development ledger; and the urbanisation register with the Indian city census told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Demographic Map',
      'The Malthus Honesty',
      'The Todaro Model',
      'The Urbanisation Register',
      'Employment: Growth, Informalisation and Issues',
    ],
  },
  {
    number: 5,
    slug: 'human-capital',
    title: 'Human Capital',
    summary:
      'Education and health as investment — the returns arithmetic; gender\u2019s development register priced honestly; the child-labour and schooling trade told; the Indian mission registers — midday-meals to enrolment drives — named as the policy case; and the learning-crisis honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Investment Frame',
      'The Gender Register',
      'The Mission Registers',
      'The Learning Honesty',
      'Human Capital Formation in India',
    ],
  },
  {
    number: 6,
    slug: 'agriculture-and-rural',
    title: 'Agriculture and Rural Transformation',
    summary:
      'The agricultural transformation read — the dual-economy models with the Lewis arithmetic; the Green Revolution priced honestly with its regional ledger; land-reform registers told; rural credit and the microfinance craft previewed; and the MSP-subsidy debate priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lewis Arithmetic',
      'The Green Revolution Ledger',
      'The Land Registers',
      'The MSP Debate',
    ],
  },
  {
    number: 7,
    slug: 'finance-trade-and-aid',
    title: 'Finance, Trade and Aid',
    summary:
      'Foreign aid\u2019s arithmetic — the effectiveness debate priced honestly; the debt register with the HIPC cases named; FDI\u2019s development ledger told (the international-business book\u2019s deep side cross-referenced); microfinance solved as the Grameen case; and the capital-flight register told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aid Debate',
      'The Debt Register',
      'The FDI Ledger',
      'The Grameen Case',
    ],
  },
  {
    number: 8,
    slug: 'sustainable-doorway',
    title: 'The Sustainable Doorway',
    summary:
      'The environment-development trade read honestly; the SDG register as the global frame; climate\u2019s development ledger — the mitigation-adaptation balance told for the developing side (the environmental-studies book cross-referenced); and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Trade Read',
      'The SDG Frame',
      'The Climate Ledger',
      'The Research Doorway',
    ],
  },
]

export const developmentEconomics: Book = {
  id: 'development-economics',
  title: 'Development Economics',
  subtitle: 'The economics of transformation: poverty, growth and the capability register of the developing world',
  discipline: 'economics-commerce',
  level: 'University + UGC NET unit + policy register',
  description: 'The development register: the meaning-and-measurement question with Sen\u2019s capability frame, the growth-and-poverty-trap machinery, the poverty-inequality measurement craft with the Lorenz geometry, population-and-migration registers, the human-capital and agriculture transformation arcs, and the sustainable-development doorway.',
  status: 'planned',
  accent: ['#22c55e', '#14532d'],
  chapters,
}
