import type { Book, Chapter } from '../../../types'

/**
 * Electromagnetic Fields and Waves — the twenty-first book of the Engineering shelf (Electronics & Communication branch — ADDED by the 2026-11-16 GATE syllabus audit: the EE Section 3 and EC Section 8 registers had no home on the backlog’s ECE list; the QA-creation precedent honoured).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `emf-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Electromagnetic Fields and Waves owns the field-and-wave truth for the whole shelf (GATE EE S3 ’Electromagnetic Fields’ + EC S8 ’Electromagnetics’ — one book, both papers). Circuit Theory owns the lumped approximation it explains; Electrical Machines and Power Systems consume its magnetic-circuit and field machinery; Antennas and Wave Propagation owns the radiation and propagation census; the Mathematics shelf owns the pure vector calculus.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 3 'Electromagnetic Fields' + EC Section 8
 *   'Electromagnetics' (both syllabus PDFs downloaded + extracted this pass):
 *   Coulomb's Law, Electric Field Intensity, Electric Flux Density, Gauss's Law,
 *   Divergence; field and potential from point, line, plane and spherical charges;
 *   dielectric medium; capacitance of simple configurations; Biot-Savart, Ampere,
 *   Curl, Faraday, Lorentz force; Inductance, Magnetomotive force, Reluctance,
 *   Magnetic circuits, Self and Mutual inductance; then Maxwell's Equations (both
 *   forms, boundary conditions, wave equation, Poynting vector); Plane Waves
 *   (reflection, refraction, polarisation, phase and group velocity, propagation
 *   through media, skin depth); Transmission Lines (equations, characteristic
 *   impedance, matching, transformation, S-parameters, Smith chart); waveguides;
 *   optical fibres — the two registers merge into this one book.
 * - Hayt & Buck, Engineering Electromagnetics — the chapter arc web-checked this
 *   pass (Vector Analysis; Coulomb's law and field intensity; Gauss's law and the
 *   divergence; energy and potential; conductors and dielectrics; capacitance; the
 *   steady magnetic field; magnetic forces and materials; time-varying fields and
 *   Maxwell's equations; the transmission-line chapters; the plane-wave chapters;
 *   waveguides and antennas chapters noted); Sadiku named as the second pole and
 *   Jordan & Balmain named for waves.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-vector-engine',
    title: 'The Vector Engine',
    summary:
      'The field idea (a value at every point); scalars and vectors with their algebra; the three coordinate systems (cartesian, cylindrical, spherical) with their transformation honest notes; gradient, divergence and curl — each read physically before it is computed; and the line, surface and volume integrals with the Stokes and divergence theorems as the book\u2019s engine (the Mathematics shelf\u2019s vector calculus cross-referenced for the pure craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Three Coordinate Systems, Honestly',
      'Gradient, Divergence, Curl — Read Physically',
      'The Integral Theorems as Engine',
    ],
  },
  {
    number: 2,
    slug: 'electrostatics-i',
    title: 'Electrostatics I: Coulomb and Gauss',
    summary:
      'Coulomb\u2019s law and electric field intensity; field from the charge census (point, line, plane, spherical distributions — each worked); electric flux density and Gauss\u2019s law with the symmetry craft (which surface to choose and why); divergence and the point form of Gauss\u2019s law; and the field sketches that keep intuition honest.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Charge Census Worked',
      'Flux Density and Gauss\u2019s Craft',
      'The Point Form of Gauss\u2019s Law',
    ],
  },
  {
    number: 3,
    slug: 'electrostatics-ii',
    title: 'Electrostatics II: Potential, Capacitance, Dielectrics',
    summary:
      'Potential and potential difference (the work route); the potential field from the charge census; Poisson\u2019s and Laplace\u2019s equations (with the uniqueness honest note and one boundary-value craft); conductor behaviour; the dielectric polarisation and boundary conditions at dielectric interfaces; capacitance of the simple configurations (parallel plate, coaxial, spherical, the two-wire line); and the electrostatic energy stored.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Potential Earned from Work',
      'Poisson, Laplace and Uniqueness',
      'Dielectrics and Boundary Conditions',
      'Capacitance Census and Energy',
    ],
  },
  {
    number: 4,
    slug: 'magnetostatics',
    title: 'Magnetostatics',
    summary:
      'Biot-Savart\u2019s law and the magnetic field census (line, sheet, ring currents); Ampere\u2019s circuital law with its symmetry craft and curl\u2019s point form; the vector magnetic potential; the magnetic force on charges and currents (the Lorentz engine); magnetic materials at engineering depth (the B-H story, permeability); and the boundary conditions on H and B.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Biot-Savart\u2019s Census',
      'Ampere\u2019s Craft and Curl',
      'The Lorentz Engine',
      'Materials and Boundary Conditions',
    ],
  },
  {
    number: 5,
    slug: 'magnetic-circuits-and-inductance',
    title: 'Magnetic Circuits and Inductance',
    summary:
      'The magnetic-circuit analogy (MMF, reluctance, flux — its honest limits against the true field); series and parallel magnetic circuits worked; the air-gap craft; self and mutual inductance of the simple configurations (solenoid, toroid, coax, two-wire); the inductance route that Circuit Theory presupposes; and the electromagnetic force and torque machinery Electrical Machines consumes (cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'MMF, Reluctance and Their Honest Limits',
      'Air-Gap Craft Worked',
      'Inductance of Simple Configurations',
      'The Machinery Machines Presuppose',
    ],
  },
  {
    number: 6,
    slug: 'maxwells-equations',
    title: 'Time-Varying Fields and Maxwell\u2019s Equations',
    summary:
      'Faraday\u2019s law (the flux rule and the transformer vs motional EMF honest split); the displacement current and Ampere\u2019s law repaired; Maxwell\u2019s four equations in integral and differential form, read and interpreted (the field\u2019s own census); boundary conditions at material interfaces derived; and the retarded-potential honest note that closes into radiation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Faraday: Transformer versus Motional',
      'Displacement Current Earned',
      'The Four Equations, Read and Interpreted',
      'Boundary Conditions Derived',
    ],
  },
  {
    number: 7,
    slug: 'plane-waves',
    title: 'Plane Waves',
    summary:
      'The wave equation from Maxwell (in lossless and lossy media); the uniform plane wave — propagation, wavelength, intrinsic impedance; phase and group velocity distinguished honestly; polarisation (linear, circular, elliptical); reflection and refraction at normal and oblique incidence with the Brewster and critical honest notes; skin depth and the good-conductor craft; and the Poynting vector\u2019s power bookkeeping.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wave Equation Earned',
      'Phase and Group Velocity, Honestly',
      'Polarisation and Reflection',
      'Skin Depth and the Poynting Vector',
    ],
  },
  {
    number: 8,
    slug: 'transmission-lines',
    title: 'Transmission Lines',
    summary:
      'The distributed-parameter honest note (when the lumped model dies); the telegrapher\u2019s equations and their phasor solutions; characteristic impedance and propagation constant; the lossless and low-loss cases; the finite line — reflection, standing waves and VSWR; impedance transformation along the line; the Smith chart learned as a first language; impedance matching (single and double stub, quarter-wave); and S-parameters introduced for the microwave doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Telegrapher\u2019s Equations Earned',
      'Reflection and VSWR',
      'The Smith Chart as a First Language',
      'Matching and S-Parameters',
    ],
  },
  {
    number: 9,
    slug: 'waveguides-and-fibers',
    title: 'Waveguides and Optical Fibres',
    summary:
      'Why guide a wave (the radiation-loss honest note); the rectangular waveguide — TE and TM modes, cutoff arithmetic, dominant mode, mode field patterns; the circular guide glanced; waveguide impedance and the guide\u2019s dispersion honesty; cavity resonators glanced; and optical fibres — the ray and mode views, acceptance angle and numerical aperture, the dispersion census that limits bandwidth, and the fibre-link honest arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rectangular Guide: TE and TM',
      'Cutoff and the Dominant Mode',
      'Resonators Glanced',
      'Fibres: NA and the Dispersion Census',
    ],
  },
  {
    number: 10,
    slug: 'the-radiation-doorway',
    title: 'The Radiation Doorway',
    summary:
      'Radiation from the elementary dipole (the honest derivation at engineering depth) with the near-and-far field census; the antenna as a circuit element (its impedance); the radiation resistance idea; the reciprocity note; and the doorway itself — Antennas and Wave Propagation owns the antenna census and the propagation story (cross-referenced), with the synthesis map of the whole field-and-wave discipline drawn on one page.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Elementary Dipole, Honestly',
      'Radiation Resistance and Antenna Impedance',
      'The Synthesis Map',
      'The Doorway: the Antenna Census',
    ],
  },
]

export const electromagneticFieldsAndWaves: Book = {
  id: 'electromagnetic-fields-and-waves',
  title: 'Electromagnetic Fields and Waves',
  subtitle: 'From Coulomb\u2019s law to waveguides — the field truth beneath every circuit and wave',
  discipline: 'engineering',
  level: 'First fields course → waveguides, antennas and power-apparatus readiness',
  description: 'The field discipline: the vector-calculus engine (gradient, divergence, curl and the integral theorems — cross-referenced to the Mathematics shelf) in the three coordinate systems; electrostatics I — Coulomb\u2019s law, electric field intensity, flux density, Gauss\u2019s law and divergence with the charge-distribution census; electrostatics II — potential, Poisson and Laplace equations, boundary conditions, dielectrics and capacitance of simple configurations; magnetostatics — Biot-Savart, Ampere\u2019s circuital law and curl, the vector magnetic potential, and Stokes\u2019 theorem; magnetic circuits and inductance (MMF, reluctance, self and mutual inductance of simple configurations — the machinery Circuit Theory and Electrical Machines presuppose); time-varying fields — Faraday\u2019s law, the Lorentz force, displacement current and Maxwell\u2019s equations in integral and differential form with boundary conditions; the wave solution — plane waves, their propagation through media, polarisation, phase and group velocity, reflection and refraction, skin depth and the Poynting vector; transmission lines — the equations, characteristic impedance, impedance matching and transformation, S-parameters and the Smith chart; waveguides (rectangular and circular) and optical fibres; and the radiation doorway to Antennas and Wave Propagation. Cross-references every circuit and machine book on the shelf and hands off to the ECE family.',
  status: 'planned',
  accent: ['#9333ea', '#581c87'],
  chapters,
}
