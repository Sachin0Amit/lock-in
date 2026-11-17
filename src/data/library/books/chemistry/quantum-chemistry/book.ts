import type { Book, Chapter } from '../../../types'

/**
 * Quantum Chemistry — the eighth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `qchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Quantum Chemistry owns the chemist’s quantum register (the GATE CY Physical Chemistry section’s structure-and-quantum half, read this pass — postulates, operators, the Schrodinger equations). The physics shelf’s quantum-mechanics book owns the formalism deep side; the computational book owns the applied machinery — cross-referenced honestly both ways.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Levine's Quantum Chemistry (the canonical arc, named) and Atkins' Molecular Quantum Mechanics as the two poles priced.
 * - The GATE CY 2026 syllabus PDF (read this pass — the quantum register within Section 1: postulates, operators, time-dependent-and-independent equations, group theory) as the university spine.
 * - The CSIR NET Chemical Sciences syllabus PDF (read this pass — the quantum-and-computational registers) as the research expectation.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'origins-chemical',
    title: 'The Chemical Origins of Quantum',
    summary:
      'The crisis registers told from the chemist\u2019s bench — the blackbody-and-photoelectric inheritances (the physics shelf\u2019s modern book cross-referenced); the Bohr atom\u2019s spectral arithmetic as the chemical seed; and the de Broglie wave read for the electron\u2019s double honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crisis Registers',
      'Bohr\u2019s Chemical Seed',
      'The Wave Honesty',
      'The Dual Register',
    
      'Electrophilic addition: addition to double and triple bonds, regioselectivity (Markovnikoff/Kharasch rule), stereochemistry'
    ],
  },
  {
    number: 2,
    slug: 'postulates-and-operators',
    title: 'Postulates and Operators',
    summary:
      'The quantum grammar stated for the chemist: the operator craft with the eigenvalue ledger; the postulates read honestly; the uncertainty register applied to the measurement craft; and the commutator arithmetic told through the position-momentum pair.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Operator Craft',
      'The Postulates Read',
      'The Uncertainty Applied',
      'The Commutator Pair',
      'Wave-Particle Duality and the Uncertainty Principle',
    ],
  },
  {
    number: 3,
    slug: 'schrodinger-and-models',
    title: 'The Schrodinger Craft and the Model Systems',
    summary:
      'The time-independent equation solved for the model census: the particle-in-a-box with the conjugation application — the dye spectra\u2019s honesty; the harmonic oscillator\u2019s level arithmetic; the rigid rotor\u2019s rotational register; and the tunnelling craft with the alpha-honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Box Solved',
      'The Conjugation Application',
      'The Oscillator-and-Rotor',
      'The Tunnelling Craft',
    ],
  },
  {
    number: 4,
    slug: 'hydrogen-orbitals',
    title: 'The Hydrogen Atom\u2019s Orbitals',
    summary:
      'The spherical separation solved for the atom; the radial-and-angular parts read as the orbital census — the shapes, the nodes computed; the orbital-energy register with the degeneracy ledger; and the spin register added honestly for the many-electron chapter ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Spherical Separation',
      'The Orbital Census',
      'The Node Arithmetic',
      'The Spin Added',
    ],
  },
  {
    number: 5,
    slug: 'many-electron-register',
    title: 'The Many-Electron Register',
    summary:
      'The approximation honesty: the orbital-and-spin quantum-number census with the aufbau-and-exclusion rules; the term-symbol craft read gently — the Russell-Saunders coupling; the Hund\u2019s rules applied to the ground states; and the selection-rule preview for the spectroscopy chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Approximation Honesty',
      'The Term Craft',
      'Hund Applied',
      'The Selection Preview',
      'Electronic Structure Methods: The Approximation Ladder',
    
      'Approximate methods of quantum mechanics'
    ],
  },
  {
    number: 6,
    slug: 'molecular-orbital-theory',
    title: 'The Molecular-Orbital Machinery',
    summary:
      'The LCAO craft for the diatomic census — the bonding-antibonding pair with the bond-order arithmetic; the homonuclear-and-heteronuclear registers; the polyatomic extension — the delocalised register for the conjugated honesty; and the MO-vs-VB honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The LCAO Craft',
      'The Diatomic Census',
      'The Delocalised Register',
      'MO against VB',
    ],
  },
  {
    number: 7,
    slug: 'group-theory-taster',
    title: 'The Group-Theory Taster',
    summary:
      'The symmetry register read gently: the point-group census with the character-table craft; the symmetry-adapted idea named; the application registers — the IR-and-Raman activity told by selection rules; and the GATE register\u2019s demand priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Point-Group Census',
      'The Character Craft',
      'The Activity Registers',
      'The GATE Demand',
    ],
  },
  {
    number: 8,
    slug: 'spectroscopy-and-dft-doorway',
    title: 'The Spectroscopy-and-DFT Doorway',
    summary:
      'The chemical spectroscopy register consolidated — the rotational-vibrational-and-electronic families with the Frank-Condon idea named; the photoelectron register told briefly; the DFT doorway named honestly — the functional idea without the full mathematics; and the research map marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Spectral Families',
      'The Frank-Condon Idea',
      'The DFT Doorway',
      'The Research Map',
    ],
  },
]

export const quantumChemistry: Book = {
  id: 'quantum-chemistry',
  title: 'Quantum Chemistry',
  subtitle: 'The quantum register for the chemist: orbitals, bonds and spectra from the Schrodinger craft to the DFT doorway',
  discipline: 'chemistry',
  level: 'University + GATE CY / CSIR NET register',
  description: 'The quantum register priced for chemistry: the postulates-and-operators craft, the model systems solved — the box applied to conjugation and the rotor to rotation, the hydrogen atom\u2019s orbital census, the many-electron approximation register, the molecular-orbital machinery with the LCAO craft, and the spectroscopy-and-DFT doorway.',
  status: 'planned',
  accent: ['#818cf8', '#1e1b4b'],
  chapters,
}
