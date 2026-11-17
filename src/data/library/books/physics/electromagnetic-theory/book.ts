import type { Book, Chapter } from '../../../types'

/**
 * Electromagnetic Theory — the seventh book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 101 planned lessons, zero written. Lesson ids will use the `emt-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Electromagnetic Theory owns the Maxwell-level register (GATE PH Electromagnetic Theory section read this pass: vector calculus, electrostatics and magnetostatics including boundary-value problems, Maxwell’s equations, plane waves and waveguides). Electricity-and-magnetism owns the school side; optics owns the light-wave phenomena; the engineering shelf’s electromagnetic-fields-and-waves book owns the applied ECE register — honest cross-references both ways.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — the Electromagnetic Theory section's register) as the university spine.
 * - Griffiths, Introduction to Electrodynamics (the canonical arc named — the shelf's structure follows its movement from the static fields to the waves) with Jackson named as the further door.
 * - The CSIR NET Physical Sciences syllabus (read this pass — the electromagnetic theory section) pricing the research-side expectation.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'vector-grammar',
    title: 'The Vector Grammar of Fields',
    summary:
      'Gradient, divergence and curl read as the field\u2019s grammar with the directional-derivative and flux mathematics made honest; the divergence and Stokes theorems as the book\u2019s ledger pair; curvilinear coordinates named for the symmetric problems ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Gradient, Divergence, Curl',
      'The Theorem Pair',
      'Curvilinear Coordinates',
      'Line and Surface Integrals',
      'Finding Rectangular (x and y) Components of a Vector',
    ],
  },
  {
    number: 2,
    slug: 'electrostatics-deep',
    title: 'Electrostatics in Vacuum',
    summary:
      'Coulomb\u2019s law to the potential; Poisson and Laplace equations; uniqueness theorems told as the solver\u2019s guarantee; the method of images for the plane and sphere; and separation of variables in the standard coordinate frames.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Poisson and Laplace',
      'Uniqueness Told',
      'The Image Method',
      'Separation of Variables',
      'Electric Field Due to a Charged Isolated Conducting Plate',
      'Electric Field Due to a Long Uniformly Charged Cylinder',
      'Electric Field Near Uniformly Volume Charged Plane',
      'Charged Conducting Sphere',
      'Field of Uniformly Charged Disk',
      'Problems Involving Plates',
      'Charged Disk',
    ],
  },
  {
    number: 3,
    slug: 'multipoles-and-dielectrics',
    title: 'Multipoles and Dielectric Matter',
    summary:
      'The multipole expansion of a charge distribution; polarisation and the bound charge story; the displacement field D and the linear-dielectric craft; boundary conditions on the fields at a dielectric interface; and the capacitor\u2019s energy re-read in matter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Multipole Expansion',
      'Polarisation and Bound Charge',
      'The D Field',
      'Boundaries in Matter',
      'Condition of No Emergence',
      'Condition of Grazing Emergence',
      'Intensity Distribution on Screen in YDSE',
      'Electric Field Intensity Due to a Short Dipole at Some General Point',
      'Induced Dipoles',
      'Polarization Vector',
      'Approximate Potentials at Large Distances',
    ],
  },
  {
    number: 4,
    slug: 'magnetostatics-deep',
    title: 'Magnetostatics',
    summary:
      'The magnetic force\u2019s consistent formulation; Biot-Savart to Ampere\u2019s law with the vector potential introduced honestly; the dipole field and torque; magnetisation and the H field with the boundary conditions in magnetic matter; and the paramagnet-diamagnet-ferromagnet story told at field depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Vector Potential',
      'Ampere Deepened',
      'Magnetisation and H',
      'Boundaries in Magnetic Matter',
      'Magnetic Field Due to a Semi-Infinite Straight Wire',
      'Finding Magnetic Field Inside a Long Solenoid',
      'Physical Interpretation of Bound Currents',
    ],
  },
  {
    number: 5,
    slug: 'faraday-to-maxwell',
    title: 'Faraday to Maxwell',
    summary:
      'Faraday\u2019s law made tensor-honest; the magnetic-energy and inductance ledger; the displacement current as Maxwell\u2019s completing insight; the full equation set in vacuum and matter; and the boundary conditions the full wave machinery will inherit.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Faraday Tensor-Honest',
      'Magnetic Energy',
      'Displacement Current',
      'The Full Set',
    ],
  },
  {
    number: 6,
    slug: 'electromagnetic-waves',
    title: 'Electromagnetic Plane Waves',
    summary:
      'The wave equation derived from the vacuum set; plane-wave solutions with polarisation read as geometry; energy transport — the Poynting vector and intensity; momentum and radiation pressure; and the spectrum register from radio to gamma named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wave Equation Derived',
      'Polarisation as Geometry',
      'Poynting and Intensity',
      'Radiation Pressure and Spectrum',
      'Propagation in Linear Media',
    ],
  },
  {
    number: 7,
    slug: 'waves-at-boundaries',
    title: 'Waves at Boundaries',
    summary:
      'Reflection and refraction of plane waves at dielectric interfaces — the Fresnel coefficients derived and read; Brewster\u2019s angle and total internal reflection as the coefficient\u2019s two honest extremes; and the conductor\u2019s skin-depth story previewed for the guide chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fresnel Coefficients',
      'Brewster\u2019s Angle',
      'Total Internal Reflection',
      'The Conductor\u2019s Skin',
      'Skin Effect',
      'Reflection and Transmission at Oblique Incidence',
    ],
  },
  {
    number: 8,
    slug: 'waveguides-and-resonators',
    title: 'Waveguides and Resonators',
    summary:
      'Guided waves: the rectangular guide\u2019s TE and TM mode census with cutoff arithmetic; the energy velocity register; cavity resonators as the frequency-keeper; and optical fibres named gently as the dielectric guide (the optics book\u2019s taster cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rectangular Guide',
      'TE and TM Census',
      'Cavity Resonators',
      'Fibres as Guides',
      'Optical Communication'
    ],
  },
  {
    number: 9,
    slug: 'radiating-systems',
    title: 'Radiating Systems',
    summary:
      'Retarded potentials and the wave-zone idea; the oscillating dipole\u2019s radiation pattern and power; antennas as aperture-reading devices with the engineering shelf\u2019s antennas book cross-referenced for the applied register; and the half-wave dipole named as the classic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Retarded Potentials',
      'The Dipole\u2019s Pattern',
      'Antenna Apertures',
      'The Half-Wave Classic',
      'Jefimenko\'s Equations',
      'Li\u00e9nard-Wiechert Potentials',
    ],
  },
  {
    number: 10,
    slug: 'potentials-and-gauge',
    title: 'Potentials, Gauge and the Door',
    summary:
      'The gauge freedom read honestly — Coulomb and Lorenz gauges as the two working dresses; the magnetic monopole question told as an open register; relativity\u2019s preview of the field tensor; and the doorstep to quantum electrodynamics named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Gauge Freedom',
      'The Two Gauges',
      'The Field Tensor Previewed',
      'The QED Doorstep',
      'Relativistic Electrodynamics',
    ],
  },
]

export const electromagneticTheory: Book = {
  id: 'electromagnetic-theory',
  title: 'Electromagnetic Theory',
  subtitle: 'The Maxwell-level course: fields in matter and in space, boundary-value problems, waves, guides and the gauge doorway',
  discipline: 'physics',
  level: 'University (UG honours → PG) + GATE PH / CSIR NET',
  description: 'The university electromagnetism course: vector calculus as the field\u2019s grammar, electrostatics and magnetostatics solved in matter and in vacuum with the boundary-value craft, Maxwell\u2019s equations assembled with displacement current, plane waves and their boundary behaviour, waveguides and the gauge-theory doorstep.',
  status: 'planned',
  accent: ['#0891b2', '#164e63'],
  chapters,
}
