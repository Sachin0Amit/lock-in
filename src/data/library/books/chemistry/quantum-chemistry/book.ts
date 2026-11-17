import type { Book, Chapter } from '../../../types'

/**
 * Quantum Chemistry — the eighth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 66 planned lessons, zero written. Lesson ids will use the `qchem-` prefix
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
    
      'Electrophilic addition: addition to double and triple bonds, regioselectivity (Markovnikoff/Kharasch rule), stereochemistry',
      'RLi Compounds Add to the Olefinic Double Bond (C=C), whereas G.R. Do Not',
      'Degree of Unsaturation (D.U.) or Index of Hydrogen Deficiency (I.H.D.) or Double Bond Equivalent (D.B.E.)',
      'Experimental Facts in Favour of Bohr\'s Theory',
      'Accessible by using the access code included in the book. The chemist’s toolkits are reminders of the key mathematical',
      'Further reading 78 Molecules with more than one C=C double bond',
      'Diastereoselective even without rings 858 Polarization of C–C bonds helps fragmentation'
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
      'Particle Nature of Electromagnetic Radiations: Planck\'s Quantum Theory'
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
      'Emission and Absorption Spectra',
      'FOCUS 8 Atomic structure and spectra 305 1 Mathematical resources',
      'Delocalization and conjugation',
      'A guided tour of the 13C NMR spectra of some hydrate formation',
      'Mass spectra, NMR, and IR combined make quick'
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
      'Examples of Formation of Compounds by Orbital Overlap Concepts and the Failure of Orbital Overlap Concept',
      'Summary of the Component Atomic Orbitals Involved in Hybrid Orbital Formation',
      'Summary of Possible Shapes of Molecules/Ions and f-Orbitals',
      'Conditions for the Combination of Atomic Orbitals',
      'Gerade and Ungerade s, p and d Orbitals',
      'Some Examples of Inner Orbital Complexes',
      'CFSE of d-Orbitals in Tetrahedral Complexes',
      'Pages 3–12: These are chapter content pages (chapter opener, Overview, and body text of Sections 3.1–3.4), not table-of-contents pages — no further contents entries are printed on them',
      'Plots of Total Probability Density: Shapes of Atomic Orbitals',
      'Orbital descriptions of [3,3]-sigmatropic',
      'The frontier orbital description of cycloadditions 886 Radicals contain unpaired electrons'
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
    
      'Approximate methods of quantum mechanics',
      'Hund\'s Rule of Maximum Multiplicity',
      'Build-up of the elements, Hund\'s rule'
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
      '| Covalent Bonding: Orbitals 344 11.1 Solution Composition',
      'What do chemists really call compounds? 36 Molecular orbitals explain the reactivity of the',
      'Examples of molecular orbital treatment involving delocalized π bonding'
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
      'Plane of Symmetry or Mirror Plane or σ-plane',
      'Centre of Symmetry (or Centre of Inversion)',
      'Alternating Axis of Symmetry',
      'Quences of changing parameters, video interviews with prac- ‘Impact on…’ sections Group theory tables'
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
