import type { Book, Chapter } from '../../../types'

/**
 * Relativity — the fifteenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `rel-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Relativity owns the relativity register (GATE PH’s relativity pricing; the CSIR NET register). Modern-physics owns the school-level mention; astrophysics owns the compact-object application side; electromagnetism-theory owns the field-tensor preview — cross-referenced honestly both ways.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — relativity priced in the classical and modern registers) and the CSIR NET syllabus (read this pass).
 * - Taylor & Wheeler, Spacetime Physics (the canonical SR arc, named) and Carroll, Spacetime and Geometry (the GR pole named honestly as the further door) as the two courses this plan prices.
 * - The Michelson-Morley experiment's historical register told with the 1887 honesty this book keeps.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'ether-crisis',
    title: 'The Ether Crisis',
    summary:
      'The Galilean relativity that Newton trusted; the ether hypothesis and the Michelson-Morley null result read honestly as the crisis instrument; the Lorentz-FitzGerald contraction named as the ad-hoc rescue; and the 1905 postulates stated plainly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Galilean Relativity',
      'The Null Result',
      'The Ad-Hoc Rescue',
      'The Two Postulates',
    ],
  },
  {
    number: 2,
    slug: 'lorentz-and-kinematics',
    title: 'The Lorentz Transformations',
    summary:
      'The transformations derived from the postulates; simultaneity lost as the first honest casualty; time dilation and length contraction with the muon register priced; the relativistic velocity-addition worked; and the paradox-craft — twins and poles told without mystery.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transformations Derived',
      'Simultaneity Lost',
      'Dilation and Contraction',
      'The Paradox Craft',
    ],
  },
  {
    number: 3,
    slug: 'relativistic-dynamics',
    title: 'Relativistic Dynamics',
    summary:
      'The redefined momentum with its velocity-limit honesty; the E = mc squared arithmetic derived from the work-energy ledger; the energy-momentum relation and its four-vector form; collision and decay problems worked; and the mass-energy register priced with nuclear honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Redefined Momentum',
      'E = mc Squared Derived',
      'The Four-Vector',
      'Collision Registers',
    ],
  },
  {
    number: 4,
    slug: 'spacetime-geometry',
    title: 'The Geometry of Spacetime',
    summary:
      'The interval as the invariant; Minkowski\u2019s geometry read with the light-cone discipline; worldlines and proper time; the spacetime-diagram craft with the twin register re-worked geometrically; and the causal-order honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Invariant Interval',
      'Light Cones and Worldlines',
      'Diagram Craft',
      'Causal Order',
    ],
  },
  {
    number: 5,
    slug: 'equivalence-and-gravity',
    title: 'The Equivalence Principle',
    summary:
      'The elevator experiments as the equivalence craft; the gravitational and inertial mass ledger; tidal forces as the honest difference; the gravitational redshift previewed; and the path to curved spacetime told as geometry\u2019s promotion.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Elevator Craft',
      'Two Masses, One Ledger',
      'Tidal Honesty',
      'The Geometry Promotion',
    ],
  },
  {
    number: 6,
    slug: 'schwarzschild-and-tests',
    title: 'The Schwarzschild Solution and Its Tests',
    summary:
      'The field equations stated as the grammar without full derivation honesty; the Schwarzschild metric and its horizons read; the classical tests — perihelion advance, light bending, gravitational redshift — worked; and the GPS register priced as the everyday application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equations Stated',
      'The Metric Read',
      'The Classical Tests',
      'The GPS Register',
    ],
  },
  {
    number: 7,
    slug: 'gravitational-waves-and-compact',
    title: 'Gravitational Waves and the Compact Register',
    summary:
      'The wave solutions named; the binary-pulsar and LIGO registers told as the detection history; black holes honestly introduced with the horizon and the no-hair name; and the compact-objects cross-reference to the astrophysics book — the register\u2019s division told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wave Solutions',
      'Binary Pulsars and LIGO',
      'Black Holes Named',
      'The Cross-Reference',
    ],
  },
  {
    number: 8,
    slug: 'cosmological-doorway',
    title: 'The Cosmological Doorway',
    summary:
      'The FRW metric named as the homogeneous register; the expanding-universe arithmetic with the redshift-distance ledger; the big-bang honesty; and the doorway to the astrophysics book\u2019s cosmology chapter — where this book hands the register over.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The FRW Named',
      'The Expansion Arithmetic',
      'The Big Bang Honesty',
      'The Handover',
    
      'Astronomy and cosmology'
    ],
  },
]

export const relativity: Book = {
  id: 'relativity',
  title: 'Relativity',
  subtitle: 'Special relativity in full and general relativity honestly begun: from the ether crisis to the Schwarzschild metric',
  discipline: 'physics',
  level: 'University (UG → PG) + GATE PH / CSIR NET',
  description: 'The relativity register: the ether crisis and its null experiments, the two postulates with the Lorentz transformations and their kinematic consequences, relativistic dynamics with the energy-momentum four-vector, the spacetime geometry, and the general theory honestly begun — the equivalence principle to the Schwarzschild solution with its classical tests.',
  status: 'planned',
  accent: ['#c084fc', '#581c87'],
  chapters,
}
