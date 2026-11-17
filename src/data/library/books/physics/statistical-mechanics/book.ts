import type { Book, Chapter } from '../../../types'

/**
 * Statistical Mechanics — the fourteenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 56 planned lessons, zero written. Lesson ids will use the `statm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Statistical Mechanics owns the ensemble register (GATE PH Thermodynamics and Statistical Physics section’s statistical half, read this pass; CSIR NET’s statistical mechanics). Heat-and-thermodynamics owns the macroscopic laws; solid-state-physics owns the electron-application side; astrophysics owns the degenerate-matter application.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 and CSIR NET syllabi (read this pass — the thermodynamics-and-statistical-physics sections) as the university-research spines.
 * - Schroeder, An Introduction to Thermal Physics (the canonical counting-first arc, named) as the book's teaching spine; Pathria named as the further door.
 * - The JEST register priced as the research-entrance pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'counting-and-entropy',
    title: 'Counting and Entropy',
    summary:
      'Multiplicity as the macrostate\u2019s weight; the two-state Einstein solid counted; the entropy definition S = k ln W derived by the counting honesty; the temperature defined from the multiplicity exchange; and the second law re-read as the overwhelming arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Multiplicity Counted',
      'S = k ln W',
      'Temperature from Exchange',
      'The Overwhelming Arithmetic',
      'Kepler\'s Third Law: The Law of Periods',
      'Gay-Lussac\'s Law or Pressure Law',
      'Dalton\'s Law of Partial Pressure',
      'Validity and Failure of Ohm\'s Law',
      'Guidelines for Applying Kirchhoff\'s Law',
      'Guidelines for Applying Ampere\'s Law',
      '3-2 UNIT VECTORS, ADDING VECTORS BY COMPONENTS 46 Applying Newton’s Laws',
      '23-5 APPLYING GAUSS’ LAW: PLANAR SYMMETRY',
      'Applying Gauss’ Law: Planar Symmetry',
      'Blame Newton’s Second Law 116 BIO Biological Efficiency  645 Satellite Television Dishes',
      'Average and Instantaneous Acceleration 40 5.2 Using Newton’s Second Law',
      'Gauss’s Law 725 Summary',
      'Lenz’s Law 962 33.4 Dispersion',
      'A.6 Law of Sines and Law of Cosines'
    ],
  },
  {
    number: 2,
    slug: 'canonical-ensemble',
    title: 'The Canonical Ensemble',
    summary:
      'The Boltzmann factor as the reservoir\u2019s arithmetic; the partition function introduced as the solver of everything thermodynamic; the connection formulas to U, F and S worked; the Maxwell-Boltzmann distribution re-derived; and the equipartition honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boltzmann Factor',
      'The Partition Solver',
      'Connection Formulas',
      'Equipartition Honesty',
      '■ Canonical Transformations',
      'Examples of Canonical Transformations',
      'The Symplectic Approach to Canonical Transformations'
    ],
  },
  {
    number: 3,
    slug: 'grand-canonical',
    title: 'The Grand Canonical Register',
    summary:
      'The chemical potential as the particle-ledger\u2019s price; the grand partition function and its connection craft; the fluctuation arithmetic told honestly; and the two ensembles\u2019 equivalence named — with the gas register re-read from the grand side.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Particle Price',
      'The Grand Partition',
      'Fluctuations Told',
      'The Equivalence Named',
    ],
  },
  {
    number: 4,
    slug: 'quantum-statistics-foundations',
    title: 'Quantum Statistics Foundations',
    summary:
      'Indistinguishability re-entered from the thermal side; the counting difference of bosons and fermions worked as the exchange ledger; the FD and BE distributions derived and read; and the classical limit\u2019s honesty — the dilute-high-temperature register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Indistinguishability Again',
      'The Exchange Ledger',
      'FD and BE Derived',
      'The Classical Limit',
    ],
  },
  {
    number: 5,
    slug: 'fermi-applications',
    title: 'The Fermi Gas Applications',
    summary:
      'The degenerate Fermi gas at zero temperature with the T-quadratic corrections; the electronic specific heat as the FD proof; white dwarfs and neutron stars named as the astrophysical degeneracy register — the astrophysics book\u2019s cross-reference; and the Pauli paramagnetism ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Degenerate Gas',
      'The Specific Heat Proof',
      'Degeneracy in Stars',
      'Pauli Paramagnetism',
      'Neutron Leakage',
      'Neutron Capture'
    ],
  },
  {
    number: 6,
    slug: 'bose-applications',
    title: 'The Bose Gas Applications',
    summary:
      'The photon gas and the Planck distribution as the Bose register\u2019s crown — the blackbody law re-derived; the Debye model re-read from the phonon-Bose side; the Bose-Einstein condensation arithmetic with the critical temperature; and the superfluid helium register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Photon Gas Crown',
      'Debye Re-read',
      'The Condensation Arithmetic',
      'Superfluid Named',
      'Kinetic-Molecular Model of an Ideal Gas 588 Summary',
      'Applications of Gauss’s Law 729 Guided Practice',
      'Molecular Model of Induced Charge 799 Conductor'
    ],
  },
  {
    number: 7,
    slug: 'phase-transitions',
    title: 'Phase Transitions and Criticality',
    summary:
      'The order-parameter idea; the Ising model worked in the mean-field approximation; the critical exponents and the universality name; the renormalisation-group idea told as a doorway, honestly without the full mathematics; and the Landau theory register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Order Parameter',
      'Ising in Mean Field',
      'Exponents and Universality',
      'Landau and RG Named',
      'Impact Parameter',
      'Chaotic Trajectories and Liapunov Exponents'
    ],
  },
  {
    number: 8,
    slug: 'nonequilibrium-doorway',
    title: 'The Non-Equilibrium Doorway',
    summary:
      'The Boltzmann equation named as the transport grammar; the fluctuation-dissipation idea told with the Brownian cross-reference; Onsager\u2019s reciprocity named; and the book\u2019s consolidation — where the equilibrium course ends and the research register begins.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transport Grammar',
      'Fluctuation and Dissipation',
      'Onsager Named',
      'The Course\u2019s End',
    ],
  },
]

export const statisticalMechanics: Book = {
  id: 'statistical-mechanics',
  title: 'Statistical Mechanics',
  subtitle: 'From counting to the ensembles: the bridge from molecular chaos to thermodynamic law',
  discipline: 'physics',
  level: 'University (PG register) + GATE PH / CSIR NET / JEST',
  description: 'The statistical bridge: multiplicity and entropy\u2019s counting definition, the canonical and grand-canonical ensembles with the partition function as the solver, the three quantum statistics and their applications — the Fermi gas, the photon gas and Bose condensation — phase transitions at criticality depth, and the non-equilibrium doorway.',
  status: 'planned',
  accent: ['#4ade80', '#14532d'],
  chapters,
}
