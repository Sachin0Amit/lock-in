import type { Book, Chapter } from '../../../types'

/**
 * Quantum Mechanics — the tenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 49 planned lessons, zero written. Lesson ids will use the `qm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Quantum Mechanics owns the formalism register (GATE PH Quantum Mechanics section read this pass: Schrodinger equation, operators, eigenvalue problems, angular momentum, perturbation theory). Modern-physics owns the historical survey; atomic-physics owns the atomic application side; the mathematics shelf’s differential-equations and linear-algebra books are cross-referenced as the pure side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — the Quantum Mechanics section's register) and the CSIR NET syllabus (read this pass) as the university-research spines.
 * - Griffiths, Introduction to Quantum Mechanics (the canonical arc named — the shelf's chapter sequence follows its postulate-to-perturbation movement) and Zettili named as the exercise-rich pole.
 * - The JAM and JEST registers priced as the entrance poles the problem sets must serve.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'birth-and-postulates',
    title: 'The Birth and the Postulates',
    summary:
      'The operator-algebra review — Hermitian operators, eigenbases and the expectation grammar; the state vector and the superposition principle; the postulates stated plainly with the measurement rule\u2019s honesty about collapse; and the two-slit state arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Operator Review',
      'States and Superposition',
      'The Postulates Plain',
      'Two-Slit Arithmetic',
      'Sine and Cosine Rule for Triangles',
      'Quotient Rule',
      'Rule of Substitution'
    ],
  },
  {
    number: 2,
    slug: 'wave-function-craft',
    title: 'The Wave-Function Craft',
    summary:
      'Normalisation, expectation values and the variance-ledger; position and momentum representations with the Fourier bridge; Dirac notation adopted for the rest of the book; and the uncertainty relation re-derived from the operator grammar.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Normalisation and Expectation',
      'Two Representations',
      'Dirac Notation',
      'Uncertainty Re-derived',
      'The Time-Dependent Schrodinger Equation and Wave Packets',
      'Finite Potential Wells and Barrier Tunnelling Depths',
      'The Linear Harmonic Oscillator by Ladder Operators',
      'Scattering in One Dimension and the Reflection Coefficient',
      'Identical Particles and Exchange Symmetry',
      'Shifted Symmetry',
      '37-1 SIMULTANEITY AND TIME DILATION 1116 38-9 TUNNELING THROUGH A POTENTIAL BARRIER',
      'D.1 Scientific Notation'
    ],
  },
  {
    number: 3,
    slug: 'time-independent-schrodinger',
    title: 'The Time-Independent Schrodinger Equation',
    summary:
      'The stationary-state separation; the infinite and finite wells solved with their level arithmetic; the harmonic oscillator by the series method; the free particle and the wave-packet honesty; and tunnelling with the barrier-transmission ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Separation Craft',
      'Wells and Levels',
      'The Oscillator Solved',
      'Tunnelling',
    ],
  },
  {
    number: 4,
    slug: 'ladder-and-angular-momentum',
    title: 'Ladder Operators and Angular Momentum',
    summary:
      'The oscillator re-solved by the ladder-operator craft as the algebra-first demonstration; angular momentum operators with the commutator grammar; the spherical harmonics census; and the addition of angular momenta previewed with Clebsch-Gordan named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ladder Craft',
      'Commutator Grammar',
      'Spherical Harmonics',
      'Addition Previewed',
    ],
  },
  {
    number: 5,
    slug: 'hydrogen-atom',
    title: 'The Hydrogen Atom',
    summary:
      'The central potential separated; the radial equation\u2019s Laguerre solutions with the quantum-number census; the degeneracy ledger; the Bohr radii re-derived as eigenstates; and the level diagram the atomic book inherits and splits.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Central Separation',
      'Radial Solutions',
      'The Degeneracy Ledger',
      'The Level Diagram',
      'Decimal and Binary Number System'
    ],
  },
  {
    number: 6,
    slug: 'spin-and-identical',
    title: 'Spin and Identical Particles',
    summary:
      'Spin as the postulate-measured fact with the two-component language; the Stern-Gerlach inheritance told honestly; identical particles and the symmetrisation discipline — bosons and fermions; the Pauli exclusion principle as the periodic table\u2019s constitutional law.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Spin Postulated',
      'Stern-Gerlach Inherited',
      'Symmetrisation Discipline',
      'Pauli as Constitution',
      'Page 1: [table of contents page 1]',
      'Page 2: [table of contents page 2]',
      'Activities and Half-Lives 1459 D Periodic Table of the Elements A-5',
      'Table 22 The Greek Alphabet'
    ],
  },
  {
    number: 7,
    slug: 'perturbation-theory',
    title: 'Perturbation Theory',
    summary:
      'Time-independent perturbation for the non-degenerate case with the second-order ledger; the degenerate case and the diagonalisation rescue; the fine-structure application previewed for the atomic book; and the variational principle as the bound-giver.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Non-Degenerate Perturbation',
      'The Degenerate Rescue',
      'Fine Structure Previewed',
      'The Variational Bound',
      'Perturbations and the Kolmogorov–Arnold–Moser Theorem'
    ],
  },
  {
    number: 8,
    slug: 'time-dependent-and-transitions',
    title: 'Time-Dependent Transitions',
    summary:
      'The time-dependent equation and the two-state system; Rabi oscillation as the driven-state register; Fermi\u2019s golden rule stated with its derivation priced gently; and spontaneous emission named as the field\u2019s debt — the QED door marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Two-State Systems',
      'Rabi Oscillations',
      'The Golden Rule',
      'Spontaneous Emission Named',
      'The Transition from a Discrete to a Continuous System'
    ],
  },
  {
    number: 9,
    slug: 'scattering-and-approximations',
    title: 'Scattering and the Approximation Crafts',
    summary:
      'Scattering theory in the Born approximation with the cross-section grammar; partial waves named for the low-energy register; the WKB approximation with its connection formulas; and the book\u2019s consolidation toward the research doorstep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Born Approximation',
      'Partial Waves',
      'WKB Craft',
      'The Research Doorstep',
    ],
  },
]

export const quantumMechanics: Book = {
  id: 'quantum-mechanics',
  title: 'Quantum Mechanics',
  subtitle: 'The formalism course: postulates to perturbation theory — the working physicist\u2019s quantum machinery',
  discipline: 'physics',
  level: 'University (UG honours → PG) + GATE PH / CSIR NET / JAM',
  description: 'The formal quantum course: the state vector and its probability grammar, the time-independent Schrodinger equation solved for the well, oscillator and barrier, angular momentum and the hydrogen atom, spin and identical particles, and the approximation machinery — perturbation theory to scattering.',
  status: 'planned',
  accent: ['#818cf8', '#1e1b4b'],
  chapters,
}
