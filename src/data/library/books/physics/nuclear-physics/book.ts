import type { Book, Chapter } from '../../../types'

/**
 * Nuclear Physics — the twelfth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `nuc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Nuclear Physics owns the nuclear register (GATE PH Nuclear Physics section read this pass; the JEE/NEET nuclei unit’s deepening). Modern-physics owns the first pass; particle-physics owns the sub-nuclear story; astrophysics owns the stellar-burning register — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — the Nuclear Physics register: nuclear radii, masses, stability, decay, reactions, fission and fusion) as the university spine.
 * - Krane, Introductory Nuclear Physics (the canonical arc named) as the course structure this plan follows.
 * - The NEET/JEE registers (read this pass) for the medical-competitive deepening the decay and energy chapters serve.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'nuclear-properties',
    title: 'The Nuclear Properties Register',
    summary:
      'The measured facts: radii from the charge distribution with the R-nought-A-third arithmetic; masses and the atomic-mass-unit ledger; spin, magnetic moments and the isospin name; and the stability valley read from the N-Z census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Radii Measured',
      'The Mass Ledger',
      'Spin and Moments',
      'The Stability Valley',
    ],
  },
  {
    number: 2,
    slug: 'nuclear-force-and-shell-model',
    title: 'The Nuclear Force and the Shell Model',
    summary:
      'The force\u2019s character — short-range, saturating, charge-independent — with the Yukawa potential as the meson-preview; the liquid-drop picture; the shell model\u2019s magic numbers and the spin-orbit rescue; and the collective-model complement named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Force\u2019s Character',
      'The Liquid Drop',
      'Magic Numbers Rescued',
      'The Collective Complement',
    ],
  },
  {
    number: 3,
    slug: 'binding-and-semf',
    title: 'Binding Energy and the Semi-Empirical Mass Formula',
    summary:
      'The binding-energy curve read as the stability ledger; the Weizsacker terms — volume, surface, Coulomb, asymmetry, pairing — derived in the liquid-drop spirit; stability predictions worked; and the formula\u2019s honest limits told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Binding Curve',
      'The Weizsacker Terms',
      'Stability Worked',
      'The Formula\u2019s Limits',
    ],
  },
  {
    number: 4,
    slug: 'decay-laws',
    title: 'The Decay Laws',
    summary:
      'Alpha decay with the Geiger-Nuttall relation and tunnelling honesty; beta decay\u2019s continuous spectrum and the neutrino story; gamma decay\u2019s multipole register briefly; the decay law with half-life, mean life and the dating craft — the medical register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Alpha Tunnelling',
      'Beta and the Neutrino',
      'Gamma Registers',
      'The Dating Craft',
    
      'E.3 Radioactive decay'
    ],
  },
  {
    number: 5,
    slug: 'reactions-and-kinematics',
    title: 'Reactions and Kinematics',
    summary:
      'The reaction Q-value arithmetic with the threshold ledger; conservation laws applied; cross-sections introduced as the reaction\u2019s measure; and the compound-nucleus picture with the resonance register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Q-Value Arithmetic',
      'Thresholds and Conservation',
      'Cross-Sections Introduced',
      'Compound Nucleus',
    ],
  },
  {
    number: 6,
    slug: 'fission-and-reactors',
    title: 'Fission and the Reactor',
    summary:
      'The fission energy ledger with the chain-reaction craft; the multiplication factor; moderators and control as the reactor\u2019s engineering honesty; the Indian reactor register named; and the breeding and waste stories told without romance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fission Ledger',
      'The Chain and Its Factor',
      'Moderators and Control',
      'Breeding and Waste',
    ],
  },
  {
    number: 7,
    slug: 'fusion-and-stellar-burning',
    title: 'Fusion and Stellar Burning',
    summary:
      'The fusion barrier arithmetic with the tunneling rescue; the pp-chain and CNO cycle named as the stellar register — the astrophysics book\u2019s cross-reference; magnetic and inertial confinement told as the engineering register; and the deuterium-tritium arithmetic priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Barrier Arithmetic',
      'pp and CNO Named',
      'Confinement Registers',
      'DT Arithmetic',
    
      'E.5 Fusion and stars'
    ],
  },
  {
    number: 8,
    slug: 'accelerators-and-detectors',
    title: 'Accelerators and Detectors',
    summary:
      'The accelerator census — Van de Graaff, cyclotron with the relativistic limit\u2019s honesty, synchrotron, LINAC; the detector census — ionisation, scintillation, semiconductor; and the electronics register with the coincidence craft named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Accelerator Census',
      'Cyclotron\u2019s Limit',
      'The Detector Census',
      'Coincidence Craft',
    ],
  },
  {
    number: 9,
    slug: 'radiation-and-safety',
    title: 'Radiation and Safety',
    summary:
      'The interaction of radiation with matter — ionising and the stopping ledger; units — becquerel, gray, sievert — with the biological register; dosimetry and shielding arithmetic; and the ALARA discipline told as the professional\u2019s ethics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stopping Ledger',
      'The Three Units',
      'Shielding Arithmetic',
      'The ALARA Ethics',
    ],
  },
]

export const nuclearPhysics: Book = {
  id: 'nuclear-physics',
  title: 'Nuclear Physics',
  subtitle: 'The nucleus in full: structure, stability, decay, reactions, fission, fusion and the radiation-safety register',
  discipline: 'physics',
  level: 'University (UG → PG) + GATE PH / CSIR NET + NEET deepening',
  description: 'The nuclear register: the nucleus\u2019s measured properties and the semi-empirical mass formula\u2019s stability ledger, the force and the shell model\u2019s magic numbers, the decay laws with their nuclear arithmetic, reactions and kinematics, fission and fusion with the reactor register, and the accelerator-detector-laboratory.',
  status: 'planned',
  accent: ['#fbbf24', '#78350f'],
  chapters,
}
