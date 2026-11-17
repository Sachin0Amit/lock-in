import type { Book, Chapter } from '../../../types'

/**
 * Atomic Physics — the eleventh book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `atom-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Atomic Physics owns the atomic-and-molecular register (GATE PH Atomic and Molecular Physics section read this pass: spectra of one- and many-electron atoms, LS coupling, Zeeman, X-ray spectra, diatomic molecules’ rotational-vibrational spectra). Quantum-mechanics owns the formalism; modern-physics owns the first pass; optics owns the light-side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — the Atomic and Molecular Physics register) as the university spine.
 * - Eisberg & Resnick, Quantum Physics of Atoms, Molecules, Solids, Nuclei and Particles (the canonical survey-deep arc, named) and Foot, Atomic Physics (the laser-and-coherence register pole) as the two courses this plan prices.
 * - The CSIR NET syllabus (read this pass) for the research-side expectation.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'hydrogen-fine-structure',
    title: 'Hydrogen\u2019s Fine Structure',
    summary:
      'The Dirac-previewed corrections: spin-orbit coupling and its energy arithmetic; the fine-structure formula read; the Lamb shift told honestly as the QED correction beyond Dirac; and the hyperfine 21-cm line named for the astrophysics book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Spin-Orbit Arithmetic',
      'The Fine-Structure Formula',
      'The Lamb Shift Told',
      'Hyperfine and 21 cm',
    ],
  },
  {
    number: 2,
    slug: 'many-electron-atoms',
    title: 'The Many-Electron Atom',
    summary:
      'The central-field approximation; the shell and subshell census with the aufbau discipline; Hund\u2019s rules as the ground-state selector; the periodic table read as the quantum book\u2019s application chapter; and the Thomas precession named gently.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Central Field',
      'Aufbau Discipline',
      'Hund\u2019s Selector',
      'The Periodic Table Read',
      'The Structure of Matter: From Atoms to Solids',
    
      'Atoms and Nuclei'
    ],
  },
  {
    number: 3,
    slug: 'zeeman-and-stark',
    title: 'Zeeman and Stark Effects',
    summary:
      'The normal Zeeman effect derived from the Larmor arithmetic; the anomalous case resolved by g-factors and the Lande formula; Paschen-Back in the strong field; and the Stark effect named for the electric-side splitting with the hydrogen honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Larmor Arithmetic',
      'Anomalous Resolved by g',
      'Paschen-Back',
      'Stark Named',
    ],
  },
  {
    number: 4,
    slug: 'alkali-and-helium',
    title: 'Alkali Spectra and Helium\u2019s Two-Electron Problem',
    summary:
      'The alkali atoms\u2019 quantum defect read as the penetrating-electron story; helium\u2019s singlet-triplet register with the exchange interaction as the honest new physics; the level scheme named; and scattering-experiment preview told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quantum Defect',
      'Singlet and Triplet',
      'The Exchange Interaction',
      'Helium\u2019s Ledger',
    ],
  },
  {
    number: 5,
    slug: 'x-ray-spectra',
    title: 'X-Ray Spectra',
    summary:
      'The inner-shell register: continuous and characteristic spectra; Moseley\u2019s law as the atomic-number ledger; the fine-structure of X-ray terms told by screening; and absorption edges read as the shell census — the solid-state book\u2019s diffraction cross-reference.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Continuous and Characteristic Pair',
      'Moseley\u2019s Ledger',
      'Screening Told',
      'Absorption Edges',
    ],
  },
  {
    number: 6,
    slug: 'molecular-spectra',
    title: 'Molecular Spectra',
    summary:
      'The diatomic molecule\u2019s registers: rotational spectra\u2019s level arithmetic; vibrational spectra with the anharmonic correction; the combined ro-vibrational bands read; electronic spectra with the Franck-Condon principle named; and the dissociation-limit honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rotational Arithmetic',
      'Vibrational Corrections',
      'Ro-Vibrational Bands',
      'Franck-Condon Named',
    ],
  },
  {
    number: 7,
    slug: 'resonance-and-clocks',
    title: 'Resonance and Atomic Clocks',
    summary:
      'Magnetic resonance as the spin-register craft; NMR and ESR named with their energy arithmetic; the maser-laser idea; the atomic-clock discipline — the cesium transition as the second\u2019s definition; and the trapped-ion register previewed honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Magnetic Resonance Craft',
      'NMR and ESR Named',
      'The Cesium Second',
      'Trapped Ions Previewed',
    ],
  },
  {
    number: 8,
    slug: 'lasers-and-coherence',
    title: 'Lasers and the Light Amplifier',
    summary:
      'Population inversion as the amplifier\u2019s condition; three- and four-level pumping schemes; the cavity\u2019s mode selection; laser families named — gas, solid-state, semiconductor; and coherence craft — the book\u2019s doorway to the optics side\u2019s applications.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Population Inversion',
      'Pumping Schemes',
      'The Cavity\u2019s Modes',
      'Laser Families',
    ],
  },
]

export const atomicPhysics: Book = {
  id: 'atomic-physics',
  title: 'Atomic Physics',
  subtitle: 'The atom beyond Bohr: fine structure, many-electron structure, Zeeman splitting, molecular spectra and the laser',
  discipline: 'physics',
  level: 'University (UG → PG) + GATE PH / CSIR NET',
  description: 'The atomic register deep: hydrogen\u2019s fine structure and the Lamb-shift honesty, the many-electron atom\u2019s shell craft with Hund\u2019s rules and the periodic table\u2019s physics, the Zeeman and Stark effects, the diatomic molecule\u2019s rotational-vibrational spectra, resonance and the laser.',
  status: 'planned',
  accent: ['#22d3ee', '#155e75'],
  chapters,
}
