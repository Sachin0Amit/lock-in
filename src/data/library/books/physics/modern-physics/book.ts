import type { Book, Chapter } from '../../../types'

/**
 * Modern Physics — the ninth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 42 planned lessons, zero written. Lesson ids will use the `mod-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Modern Physics owns the modern survey register (JEE/NEET Dual Nature, Atoms and Nuclei, Electronic Devices units). The quantum-mechanics book owns the formalism; atomic-physics owns the spectra craft deep; nuclear-physics owns the nucleus deep; solid-state-physics owns the band theory — each cross-referenced as the next rung the survey names.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The JEE Main 2026 and NEET 2026 syllabi (read this pass — the Dual Nature, Atoms and Nuclei, and Electronic Devices units) as the school-competitive spine.
 * - Beiser, Concepts of Modern Physics (the canonical survey arc named) and Krane's Modern Physics as the university first-pass poles.
 * - The CSIR NET syllabus (read this pass) pricing where the deep registers begin and this survey honestly stops.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-quantum-crisis',
    title: 'The Quantum Crisis',
    summary:
      'The classical failure register: the ultraviolet catastrophe told honestly from the Rayleigh-Jeans side; Planck\u2019s quantisation postulate as the rescue; and the historical arithmetic — the radiation laws and the curves read before the photon\u2019s formal arrival.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classical Failure',
      'Planck\u2019s Postulate',
      'The Radiation Laws',
      'The Curves Read',
    ],
  },
  {
    number: 2,
    slug: 'photons-and-photoelectric',
    title: 'Photons and the Photoelectric Effect',
    summary:
      'Einstein\u2019s photon hypothesis and the photoelectric equation; the stopping-potential and threshold-frequency registers; work function as the metal\u2019s fingerprint; the Compton shift named; and the dual-nature evidence the exam register demands.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Einstein\u2019s Equation',
      'Stopping Potential',
      'Work Functions',
      'Compton Named',
      'Dual Behaviour of Matter',
      'Photons Have Momentum',
      'Photon Counts Emitted by a Source per Second',
    ],
  },
  {
    number: 3,
    slug: 'atomic-models-and-spectra',
    title: 'Atomic Models and Hydrogen\u2019s Spectra',
    summary:
      'The Rutherford failure and Bohr\u2019s quantised rescue; the energy-level arithmetic with the series — Lyman to Brackett; the correspondence principle named gently; the Franck-Hertz register; and the spectra\u2019s honesty about the model\u2019s limits.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bohr\u2019s Rescue',
      'Energy-Level Arithmetic',
      'The Series Census',
      'The Model\u2019s Limits',
    ],
  },
  {
    number: 4,
    slug: 'x-rays-and-compton',
    title: 'X-Rays and the Compton Craft',
    summary:
      'X-ray production by electron deceleration; the continuous spectrum\u2019s Duane-Hunt limit derived from the photon energy ledger; characteristic lines named from the shell register; and the Compton effect\u2019s kinematics worked as the photon\u2019s particle-side proof.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Production Register',
      'The Continuous Limit',
      'Characteristic Lines',
      'Compton Kinematics',
      'Production of X-Rays (Coolidge\'s Tube)',
      'X Rays and the Ordering of the Elements',
    ],
  },
  {
    number: 5,
    slug: 'matter-waves-and-uncertainty',
    title: 'Matter Waves and Uncertainty',
    summary:
      'de Broglie\u2019s hypothesis and the wavelength arithmetic; Davisson-Germer as the electron-diffraction vindication; the Heisenberg pair of uncertainty relations read honestly — not as measurement noise but as nature\u2019s grammar; and the thought-experiments priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Davisson-Germer',
      'The Uncertainty Pair',
      'Thought Experiments',
      'Butterfly Hunting with Heisenberg\u0008',
    ],
  },
  {
    number: 6,
    slug: 'nucleus-first-pass',
    title: 'The Nucleus at First Pass',
    summary:
      'The nuclear size, density and binding-energy arithmetic; the mass defect ledger; radioactivity\u2019s law with the half-life craft and the dating register; and fission and fusion previewed with their energy honesty — the nuclear book\u2019s doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Nuclear Arithmetic',
      'The Mass Defect',
      'Radioactivity\u2019s Law',
      'Fission and Fusion Previewed',
      'Size of Nuclei',
    ],
  },
  {
    number: 7,
    slug: 'semiconductor-devices',
    title: 'Semiconductor Devices',
    summary:
      'Intrinsic and extrinsic semiconductors by doping; the p-n junction\u2019s barrier and bias arithmetic; the diode as rectifier; the transistor\u2019s action and characteristic curves at school depth; and the logic-gate register previewed for the CS shelf\u2019s digital-logic book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Doping and Carriers',
      'The p-n Junction',
      'Rectifiers and Transistors',
      'Logic Gates Previewed',
      'Three Configurations of a Transistor',
      'Current Gains in a Transistor',
      'Special Purpose Diodes',
    ],
  },
  {
    number: 8,
    slug: 'the-modern-synthesis',
    title: 'The Modern Synthesis',
    summary:
      'The survey\u2019s consolidation chapter: the wave-particle duality ledger read as the double experiment register — photoelectric beside interference; the complementarity reading; and the map of the deep books — quantum mechanics, atomic, nuclear, solid-state — with their registers named as doors ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Duality Ledger',
      'Complementarity Read',
      'The Deep Map',
      'The Doors Named',
    ],
  },
]

export const modernPhysics: Book = {
  id: 'modern-physics',
  title: 'Modern Physics',
  subtitle: 'The quantum doorway: blackbody to the nucleus, matter waves to the semiconductor — the survey before the deep books',
  discipline: 'physics',
  level: 'Class 12 + competitive → university first pass',
  description: 'The survey book of the modern register: the classical crisis from blackbody radiation, the photon and photoelectric craft, atomic models and hydrogen\u2019s spectra, X-rays, matter waves and the uncertainty discipline, the nucleus at first pass, and the semiconductor device register. Cross-references quantum-mechanics (the duality register), atomic-physics and nuclear-physics — this book hands off to each honestly.',
  status: 'planned',
  accent: ['#fb7185', '#881337'],
  chapters,
}
