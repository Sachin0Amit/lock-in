import type { Book, Chapter } from '../../../types'

/**
 * Analytical Chemistry — the fifth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `anal-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Analytical Chemistry owns the measurement register. The physics shelf’s experimental book owns the instrument-side physics; the mathematics shelf’s statistics book owns the pure inference side; the environmental book’s monitoring chapters borrow here; the CSIR-and-GATE registers price the research side — all cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Vogel's Quantitative Chemical Analysis (the canonical classical arc, named) and Skoog's Fundamentals of Analytical Chemistry (the instrumental arc, named) as the two poles priced.
 * - The CSIR NET Chemical Sciences syllabus PDF (csirhrdg.res.in, read this pass — the analytical register within the physical-and-interdisciplinary sections) as the research register.
 * - The mathematics shelf's statistics book cross-referenced for the pure error-and-inference machinery.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'accuracy-and-precision',
    title: 'Accuracy and Precision',
    summary:
      'The measurement honesty: error census — systematic against random; the statistics of the mean — the standard deviation-and-confidence registers; the significance-test craft — t-and-F applied; calibration\u2019s linear craft with the least-squares ledger; and the outlier register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Error Census',
      'The Mean Statistics',
      'The Significance Craft',
      'The Calibration Ledger',
    ],
  },
  {
    number: 2,
    slug: 'classical-quantitative',
    title: 'The Classical Quantitative Crafts',
    summary:
      'The gravimetric discipline — precipitation, digestion, the ignition craft with the stoichiometric ledger; the volumetric architecture — the primary-standard honesty, the standardisation craft; and the burette-and-pipette discipline told as the branch\u2019s craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gravimetric Discipline',
      'The Volumetric Architecture',
      'The Standard Honesty',
      'The Glassware Craft',
    ],
  },
  {
    number: 3,
    slug: 'titrimetric-families',
    title: 'The Titrimetric Families',
    summary:
      'The titration census: acid-base with the curve-and-indicator selection; redox with the permanganate-and-dichromate registers and the iodometric craft; complexometric with EDTA and the masking registers; precipitation with the silver craft; and the back-titration honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Acid-Base Curves',
      'The Redox Registers',
      'EDTA Craft',
      'The Back-Titration Honesty',
    ],
  },
  {
    number: 4,
    slug: 'spectroscopic-methods',
    title: 'The Spectroscopic Methods',
    summary:
      'The optical register: UV-Vis with Beer-Lambert\u2019s law properly applied — the deviation honesty; the IR register with the functional-group fingerprint told; the flame-and-AAS census with the atomisation craft; and the fluorescence register priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'UV-Vis Applied',
      'The IR Fingerprint',
      'The AAS Census',
      'The Fluorescence Register',
    ],
  },
  {
    number: 5,
    slug: 'electroanalytical',
    title: 'The Electroanalytical Register',
    summary:
      'The potential-reading crafts: the potentiometric register — the ion-selective electrode census with the glass electrode\u2019s pH craft; the voltammetric register told gently — polarography named; coulometry named briefly; and the conductometric taster cross-referenced to the physical book\u2019s Kohlrausch chapters.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ion-Selective Census',
      'The Voltammetric Register',
      'Coulometry Named',
      'The Conductance Taster',
    ],
  },
  {
    number: 6,
    slug: 'chromatography',
    title: 'The Chromatographic Register',
    summary:
      'The separation engine: the partition principle told; planar crafts — the TLC discipline with the Rf arithmetic; column chromatography\u2019s elution craft; the GC register with the retention discipline; the HPLC register with the normal-vs-reversed honesty; and the ion-exchange-and-size crafts priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Partition Principle',
      'TLC Discipline',
      'The GC Register',
      'The HPLC Register',
    ],
  },
  {
    number: 7,
    slug: 'sample-and-validation',
    title: 'The Sample and the Validation Crafts',
    summary:
      'The professional register: sampling\u2019s honesty — the representative craft; the sample-preparation census — digestion, extraction; the validation parameters — accuracy, precision, LOD-LOQ, linearity, robustness; and the GLP-and-accreditation registers named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sampling Honesty',
      'The Preparation Census',
      'The Validation Parameters',
      'The GLP Register',
    ],
  },
  {
    number: 8,
    slug: 'the-analytical-doorway',
    title: 'The Analytical Doorway',
    summary:
      'The modern machinery priced: the hyphenated census — GC-MS, LC-MS, ICP-MS named; the NMR quantitative register previewed; the XRD-and-SEM craft named for the solid register; the data-analysis register with the chemometrics name told gently; and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hyphenated Census',
      'The NMR Preview',
      'The Solid Characterisation',
      'The Chemometrics Name',
    ],
  },
]

export const analyticalChemistry: Book = {
  id: 'analytical-chemistry',
  title: 'Analytical Chemistry',
  subtitle: 'The measurement branch: from the classical titration craft to the chromatographic-and-spectroscopic machinery',
  discipline: 'chemistry',
  level: 'University + professional register',
  description: 'The measurement register: the accuracy-and-precision discipline with the statistics of measurement, the classical quantitative crafts — gravimetric and volumetric, the titrimetric families with their curves, the instrumental census — the spectroscopic, electroanalytical and chromatographic registers, and the validation-and-QA doorway.',
  status: 'planned',
  accent: ['#06b6d4', '#155e75'],
  chapters,
}
