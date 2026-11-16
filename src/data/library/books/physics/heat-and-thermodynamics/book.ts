import type { Book, Chapter } from '../../../types'

/**
 * Heat and Thermodynamics — the fifth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `heat-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Heat and Thermodynamics owns the physics thermal register (JEE/NEET units Kinetic Theory, Thermodynamics; GATE PH Thermodynamics and Statistical Physics section’s thermodynamic half). The engineering thermodynamics book owns the applied engineering side (Cengel’s cycles and plant applications); statistical-mechanics owns the postulate-and-ensemble mathematics; the chemistry shelf’s physical-chemistry register is cross-referenced as a sibling view.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — Thermodynamics: laws, Maxwell's relations, ensembles previewed) and the JEE/NEET syllabi (read this pass — Kinetic Theory and Thermodynamics units) as the registers.
 * - Halliday, Resnick & Walker (contents read this pass) and Zemansky's Heat and Thermodynamics (the canonical physics-side arc, named) as the poles.
 * - The CSIR NET Physical Sciences syllabus (read this pass) which prices the thermodynamics-and-statistical-physics section the deep chapters serve.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'temperature-and-zeroth',
    title: 'Temperature and the Zeroth Law',
    summary:
      'Thermal equilibrium and the zeroth law that founds the thermometer; scales — Celsius, Fahrenheit, Kelvin — and the fixed-point craft; gas thermometers and the absolute zero idea; and constant-volume and resistance thermometry named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Zeroth Law',
      'Scales and Fixed Points',
      'Gas Thermometers',
      'Absolute Zero Idea',
    ],
  },
  {
    number: 2,
    slug: 'calorimetry',
    title: 'Calorimetry',
    summary:
      'Heat as energy in transfer: specific and latent heat with the mixing ledger; the water equivalent craft; phase changes read on the temperature-time curve; and the principle\u2019s honesty about measurement loss and radiation correction.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mixing Ledger',
      'Latent Heat Read',
      'The Cooling Curve',
      'Corrections Craft',
    ],
  },
  {
    number: 3,
    slug: 'kinetic-theory',
    title: 'The Kinetic Theory of Gases',
    summary:
      'The molecular hypothesis made quantitative: pressure derived from momentum transfer; the rms speed and its kinetic interpretation; degrees of freedom and the equipartition name; mean free path and Brownian motion as the visible evidence.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Pressure from Molecules',
      'rms Interpretation',
      'Equipartition and DOF',
      'Mean Free Path',
    ],
  },
  {
    number: 4,
    slug: 'gas-laws-and-maxwell',
    title: 'Gas Laws and Maxwell\u2019s Distribution',
    summary:
      'Boyle, Charles and the ideal-gas equation with the molar form; the Maxwell-Boltzmann speed distribution read honestly — rms, mean and most-probable speeds compared; and the distribution\u2019s experimental vindication named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ideal Gas Ledger',
      'Maxwell\u2019s Distribution',
      'The Three Speeds',
      'Vindication',
    ],
  },
  {
    number: 5,
    slug: 'specific-heats',
    title: 'Specific Heats of Gases',
    summary:
      'The two heat capacities of a gas and the cp-cv = R relation derived; the ratio gamma and its degrees-of-freedom reading; Mayer\u2019s and Clausius\u2019s names tied to the arithmetic; and the adiabatic equation built from gamma.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'cp and cv Defined',
      'The Relation Derived',
      'Gamma and DOF',
      'The Adiabatic Equation',
    ],
  },
  {
    number: 6,
    slug: 'first-law-and-processes',
    title: 'The First Law and Its Processes',
    summary:
      'The first law stated as the energy ledger of the system; isothermal, adiabatic, isobaric and isochoric processes on the P-V diagram with their work integrals computed; cyclic processes and the net-work-as-area reading.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Energy Ledger',
      'Processes on the P-V Plane',
      'Work Integrals',
      'Cycles as Area',
    ],
  },
  {
    number: 7,
    slug: 'second-law-and-engines',
    title: 'The Second Law and Heat Engines',
    summary:
      'The direction of nature: Kelvin and Clausius statements proved equivalent; Carnot\u2019s engine and its efficiency derived for the ideal gas; refrigerators and heat pumps with their COP arithmetic; and entropy introduced as the state function that only grows.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Two Statements, One Law',
      'Carnot Derived',
      'Refrigerators and COP',
      'Entropy Introduced',
    ],
  },
  {
    number: 8,
    slug: 'real-gases-and-liquefaction',
    title: 'Real Gases and Liquefaction',
    summary:
      'The ideal gas\u2019s failures mapped; van der Waals\u2019 equation with its constants read as volume and pressure corrections; the isotherm family and the critical point; and liquefaction by compression and by Joule-Thomson expansion named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ideal Failures',
      'van der Waals Read',
      'The Critical Point',
      'Liquefaction Routes',
    ],
  },
  {
    number: 9,
    slug: 'heat-transfer',
    title: 'Heat Transfer',
    summary:
      'The three transfer modes: conduction with Fourier\u2019s law, series and parallel slabs, and the thermal-resistance analogy; convection named with its empirical dress; radiation — Stefan\u2019s law, Kirchhoff\u2019s law, Wien\u2019s law and Newton\u2019s cooling as the honest approximation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Conduction Ledger',
      'Thermal Resistance',
      'Convection Named',
      'The Radiation Register',
    ],
  },
  {
    number: 10,
    slug: 'potentials-and-maxwell-relations',
    title: 'Potentials and Maxwell\u2019s Relations',
    summary:
      'The university doorstep: internal energy and the Helmholtz and Gibbs free energies as the natural-potential pair; the Maxwell relations derived by the differential-craft; the third law named; and the door opened to statistical-mechanics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Potential Pair',
      'Maxwell\u2019s Relations',
      'The Third Law',
      'The Doorway',
    ],
  },
]

export const heatAndThermodynamics: Book = {
  id: 'heat-and-thermodynamics',
  title: 'Heat and Thermodynamics',
  subtitle: 'From the thermometer to the Maxwell relations: thermal physics as the physics-side arc',
  discipline: 'physics',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The physics-side thermal arc: temperature\u2019s laws, the kinetic theory of gases with Maxwell\u2019s distribution, the first and second laws with engines and entropy, real gases and liquefaction, heat transfer\u2019s radiation register, and the thermodynamic-potential doorstep.',
  status: 'planned',
  accent: ['#f87171', '#7f1d1d'],
  chapters,
}
