import type { Book, Chapter } from '../../../types'

/**
 * Industrial Chemistry — the tenth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `indchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Industrial Chemistry owns the chemical plant register. The engineering shelf’s core books own the unit-operations side (the process engineering register — honestly cross-referenced: chemical engineering is on the engineering pass’s investigate-later list); the organic book owns the reaction chemistry; the environmental book owns the effluent side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Shreve's Chemical Process Industries (the canonical arc, named) as the spine; the NCERT class 12 chemistry-in-everyday-life and surface-chemistry registers (read this pass in the syllabus registers) as the school ladder beneath.
 * - The CSIR NET interdisciplinary registers (read this pass — catalysis and green chemistry named) priced for the process side.
 * - The engineering shelf's planning note (chemical engineering on the investigate-later list) recorded honestly as the boundary.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'water-and-utilities',
    title: 'Water and the Industrial Utilities',
    summary:
      'The plant\u2019s first chemistry: the water-quality registers — hardness treated by the softening census; boiler-feed honesty with the corrosion register (the physical book\u2019s electrochemistry cross-referenced); steam-and-compressed utilities told briefly; and the effluent\u2019s first look.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hardness Census',
      'The Boiler Honesty',
      'The Utilities Register',
      'The Effluent First Look',
    ],
  },
  {
    number: 2,
    slug: 'acid-and-alkali',
    title: 'The Acid-and-Alkali Industries',
    summary:
      'The heavy-chemical register: the contact process read properly — the equilibrium-and-catalyst craft priced; the nitric-acid register with the Ostwald turn; the Solvay craft with its ammoniacal honesty; and the chlor-alkali register — the mercury-and-membrane cells told honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Contact Process',
      'The Ostwald Register',
      'The Solvay Craft',
      'The Chlor-Alkali Register',
    ],
  },
  {
    number: 3,
    slug: 'fertilizers',
    title: 'The Fertilizer Industries',
    summary:
      'The nitrogen register\u2019s industrial side: ammonia synthesis — Haber\u2019s craft with the Le Chatelier honesty priced; the urea register with the prilling craft; the phosphatic census — the SSP-and-TSP registers; the NPK blending register; and the green-revolution ledger told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Haber\u2019s Craft',
      'The Urea Register',
      'The Phosphatic Census',
      'The NPK Register',
    ],
  },
  {
    number: 4,
    slug: 'petroleum-and-petrochemicals',
    title: 'Petroleum and the Petrochemicals',
    summary:
      'The refinery register: crude\u2019s fractionation with the distillation craft; the conversion processes — cracking-and-reforming told chemically; the octane-and-cetane honesty; the petrochemical census — the three starter families with the downstream ladder; and the refinery\u2019s environmental ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fractionation Register',
      'The Conversion Processes',
      'The Octane Honesty',
      'The Starter Families',
    ],
  },
  {
    number: 5,
    slug: 'polymers-and-elastomers',
    title: 'The Polymer-and-Elastomer Register',
    summary:
      'The macromolecular industry: the addition-and-condensation census with the mechanism honesty (the organic book\u2019s preview cross-referenced); the plastics census — the six commodity families with their properties-and-processing told; the elastomer register with vulcanisation\u2019s craft; and the polymer-environment honesty carried.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Censuses',
      'The Commodity Families',
      'Vulcanisation\u2019s Craft',
      'The Environment Honesty',
    ],
  },
  {
    number: 6,
    slug: 'fine-chemicals',
    title: 'The Fine-Chemicals Register',
    summary:
      'The value side: the drug register — the pharmacology families told chemically with the structure-activity idea named; the dye census — the azo-and-anthraquinone registers; the food-additive ledger — the preservative-and-antioxidant registers; and the cosmetics-and-cleaning chemistry told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Drug Register',
      'The Dye Census',
      'The Food Ledger',
      'The Cleaning Chemistry',
    ],
  },
  {
    number: 7,
    slug: 'fuels-and-energy',
    title: 'The Fuels-and-Energy Register',
    summary:
      'The energy chemistry: the fuel census — solid, liquid, gaseous with the calorific ledger; the hydrogen-and-fuel-cell registers told honestly; the battery chemistry cross-referenced to the physical book\u2019s electrochemistry; the nuclear fuel register priced briefly; and the renewable-chemistry preview.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Calorific Ledger',
      'The Fuel-Cell Register',
      'The Battery Cross-Reference',
      'The Renewable Preview',
    ],
  },
  {
    number: 8,
    slug: 'process-economics-and-safety',
    title: 'The Process Doorway',
    summary:
      'The plant\u2019s honesty: the economics register — yield-and-throughput priced; the safety-and-hazard census — the case registers told honestly; the environmental-compliance register (the environmental book\u2019s cross-reference); the quality-and-ISI registers named; and the career doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Economics Register',
      'The Hazard Census',
      'The Compliance Register',
      'The Career Doorway',
    ],
  },
]

export const industrialChemistry: Book = {
  id: 'industrial-chemistry',
  title: 'Industrial Chemistry',
  subtitle: 'The plant register: acids, alkalis, fertilizers, fuels and polymers — the chemistry of industry',
  discipline: 'chemistry',
  level: 'University + professional register',
  description: 'The industrial register: the water-and-utilities craft, the acid-alkali industries with the contact-and-Solvay registers, the fertilizer industries, petroleum refining with the petrochemical register, the polymer-and-elastomer census, the fine-chemicals register — drugs, dyes, food — and the process-economics-and-safety doorway.',
  status: 'planned',
  accent: ['#94a3b8', '#334155'],
  chapters,
}
