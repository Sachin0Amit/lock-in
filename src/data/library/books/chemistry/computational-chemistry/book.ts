import type { Book, Chapter } from '../../../types'

/**
 * Computational Chemistry — the ninth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `cchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Computational Chemistry owns the applied simulation register (the CSIR NET interdisciplinary-and-computational registers read this pass). The CS shelf’s books own the computing crafts; the mathematics shelf’s numerical-and-statistics books own the pure side; the quantum-chemistry book owns the theory — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Jensen's Introduction to Computational Chemistry (the canonical arc, named) as the spine; Cramer named as the sibling pole.
 * - The CSIR NET Chemical Sciences syllabus PDF (read this pass — the interdisciplinary registers incl. computational) as the research register.
 * - The quantum-chemistry book's chapters cross-referenced as the theory side of every scale-ladder rung.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'idea-and-toolchain',
    title: 'The Idea and the Toolchain',
    summary:
      'What the branch does honestly — the simulation as the third register beside experiment-and-theory; the toolchain census with the ecosystems named; the coordinate-and-format discipline; and the unit-and-precision honesty the craft demands.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Third Register',
      'The Toolchain Census',
      'The Format Discipline',
      'The Precision Honesty',
    
      'Structure and bonding in homo- and heteronuclear molecules, including shapes of molecules (VSEPR theory)'
    ],
  },
  {
    number: 2,
    slug: 'force-fields',
    title: 'The Force-Field Craft',
    summary:
      'The molecular-mechanics register: the potential-energy function\u2019s term census — bonds, angles, torsions, the non-bonded pair; the parameter honesty — where the numbers come from; the minimisation craft with the steepest-and-conjugate registers; and the force-field families named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Term Census',
      'The Parameter Honesty',
      'The Minimisation Craft',
      'The Field Families',
    ],
  },
  {
    number: 3,
    slug: 'electronic-structure-ladder',
    title: 'The Electronic-Structure Ladder',
    summary:
      'The scale ladder climbed: the semiempirical register told briefly; the Hartree-Fock craft with the basis-set census; the post-HF correction register — MP2-and-CC named; the DFT register with the functional families; and the ladder\u2019s cost-accuracy honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Semiempirical Register',
      'The Hartree-Fock Craft',
      'The Post-HF Register',
      'The DFT Families',
    ],
  },
  {
    number: 4,
    slug: 'molecular-dynamics',
    title: 'The Molecular-Dynamics Craft',
    summary:
      'The simulation of motion: the integrator arithmetic — Verlet\u2019s craft; the ensemble-and-thermostat registers; the time-step honesty with the constraint registers; and the trajectory-analysis census — the RMSD-and-fluctuation registers priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Integrator Arithmetic',
      'The Thermostat Registers',
      'The Time Honesty',
      'The Trajectory Census',
    ],
  },
  {
    number: 5,
    slug: 'conformation-and-docking',
    title: 'The Conformational and Docking Registers',
    summary:
      'The search crafts: the conformational-space honesty with the search census; the docking register priced for the pharma doorway — the scoring-function honesty; the QSAR first pass with the descriptor idea; and the virtual-screening register told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Search Census',
      'The Docking Register',
      'The QSAR First Pass',
      'The Screening Register',
    ],
  },
  {
    number: 6,
    slug: 'cheminformatics-and-ml',
    title: 'The Cheminformatics-and-ML Doorway',
    summary:
      'The data register: the representation crafts — SMILES named with the descriptor census; the ML register priced honestly — the model families told for the property-prediction craft; the data-leakage honesty; and the AI-chemistry frontier named without romance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Representation Crafts',
      'The Model Families',
      'The Leakage Honesty',
      'The Frontier Named',
    ],
  },
  {
    number: 7,
    slug: 'the-computational-doorway',
    title: 'The Computational Doorway',
    summary:
      'The craft\u2019s ethics: the reproducibility register with the openness census; the HPC-and-workflow crafts named (the engineering shelf\u2019s IE book cross-referenced); the benchmark honesty; and the research map marked with the reading register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reproducibility Register',
      'The HPC Craft',
      'The Benchmark Honesty',
      'The Research Map',
    ],
  },
]

export const computationalChemistry: Book = {
  id: 'computational-chemistry',
  title: 'Computational Chemistry',
  subtitle: 'The simulation branch: force fields, electronic-structure scale ladders and the molecular-dynamics craft',
  discipline: 'chemistry',
  level: 'University + research register',
  description: 'The computational register: the toolchain-and-filesystem discipline, the force-field craft of molecular mechanics, the electronic-structure scale ladder — the semiempirical-to-ab-initio-to-DFT registers, the molecular-dynamics-and-simulation crafts, the conformational-and-docking registers, and the cheminformatics-and-ML doorway.',
  status: 'planned',
  accent: ['#38bdf8', '#0c4a6e'],
  chapters,
}
