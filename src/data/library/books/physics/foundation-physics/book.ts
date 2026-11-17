import type { Book, Chapter } from '../../../types'

/**
 * Foundation Physics — the first book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 45 planned lessons, zero written. Lesson ids will use the `pf-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Foundation Physics owns the school first-pass (the class 9-10 register: motion, force, gravitation, work, sound, light, heat, electricity at the descriptive level). The mechanics book owns the calculus-based deepening; heat-and-thermodynamics, optics and electricity-and-magnetism own the class 11-12 arcs; foundation-physics never re-derives them, it previews them honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NCERT class 9-10 physics register (the syllabus pages read this pass alongside the NEET 2026 syllabus PDF at nta.ac.in — the school units: physics and measurement, motion, force and laws of motion, gravitation, work and energy, sound, light, electricity) as the first-pass spine.
 * - The JEE Main 2026 syllabus (jeemain.nta.nic.in + the s3waas syllabus PDF, read this pass — Physics and Measurement as Unit 1) as the competitive ladder this first pass feeds.
 * - Halliday, Resnick & Walker, Fundamentals of Physics (contents read this pass — Measurement as the opening chapter) as the canonical university arc priced for the door ahead.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-physics-measures',
    title: 'What Physics Measures',
    summary:
      'The subject defined by what it measures: length, time, mass and the SI system built on them; the order-of-magnitude craft of estimation; and how a physical law differs from a guess. The reader leaves able to describe any quantity by unit, symbol and size.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Scope of Physics',
      'The SI System',
      'Estimation and Order of Magnitude',
      'Laws, Theories and Guesses',
    
      'Inquiry 1: Exploring and designing',
      'Inquiry 3: Concluding and evaluating',
      'Theoretical skills',
      'Hydrodynamics'
    ],
  },
  {
    number: 2,
    slug: 'dimensions-and-errors',
    title: 'Dimensions and Errors',
    summary:
      'Dimensional analysis as the physicist\u2019s type-checking: the [M L T] census of every quantity, the homogeneity test, and the conversion of units between systems; then the honest arithmetic of measurement — least count, significant figures, absolute and relative error.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dimensional Census',
      'Homogeneity and Conversions',
      'Significant Figures',
      'Absolute and Relative Error',
    ],
  },
  {
    number: 3,
    slug: 'motion-in-one-dimension',
    title: 'Motion in One Dimension',
    summary:
      'Distance against displacement, speed against velocity, uniform and non-uniform motion read off graphs; average and instantaneous values; and the three equations of uniformly accelerated motion derived graphically and used on the classic trains-and-braking register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Scalars and Vectors Introduced',
      'Motion Graphs Read Honestly',
      'The Three Equations',
      'Classic One-Dimensional Problems',
    ],
  },
  {
    number: 4,
    slug: 'force-and-newtons-laws',
    title: 'Force and Newton\u2019s Laws',
    summary:
      'The first pass on the cause of motion: inertia, F = ma and action-reaction; the free-body diagram as the physicist\u2019s ledger; common forces — tension, normal reaction, friction in its static and kinetic dress — solved on inclined planes at school depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Inertia and the First Law',
      'The Free-Body Ledger',
      'Friction at First Pass',
      'Inclined-Plane Problems',
    ],
  },
  {
    number: 5,
    slug: 'gravitation-first-pass',
    title: 'Gravitation at First Pass',
    summary:
      'Newton\u2019s law of gravitation at school depth: mass against weight, g and its variation with height and depth loosely described, the weightlessness taster, and thrust, pressure and Archimedes\u2019 principle as the fluid doorway the mechanics book later deepens.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Universal Law',
      'Mass, Weight and g',
      'Thrust and Pressure',
      'Archimedes at First Pass',
    
      'Experimental Skills: Metre scale — the mass of a given object by the principle of moments'
    ],
  },
  {
    number: 6,
    slug: 'work-energy-power',
    title: 'Work, Energy and Power',
    summary:
      'Work as force-times-displacement read by angle; kinetic and potential energy with the conservation law used on falling bodies and springs at school depth; and power with the commercial kilowatt-hour register tied honestly to the physics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Work and Its Angle',
      'Energy Forms and Conservation',
      'Power and the Kilowatt-Hour',
      'Numerical Practice',
    ],
  },
  {
    number: 7,
    slug: 'heat-first-pass',
    title: 'Heat at First Pass',
    summary:
      'Temperature against heat; the thermometer\u2019s mercury and clinical registers; expansion of solids, liquids and gases at first pass; specific and latent heat with calorimetry\u2019s simplest ledger; and the transfer modes named before the deep book takes over.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Temperature versus Heat',
      'Thermometers',
      'Expansion at First Pass',
      'Calorimetry\u2019s Simple Ledger',
    ],
  },
  {
    number: 8,
    slug: 'waves-and-sound-first-pass',
    title: 'Waves and Sound at First Pass',
    summary:
      'The wave idea built from a rope: transverse against longitudinal, amplitude, wavelength and frequency; the echo and reverberation register; ultrasound\u2019s medical uses named; and the characteristics of sound — loudness, pitch, timbre — read honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wave Picture',
      'Echo and Reverberation',
      'Ultrasound and SONAR',
      'Loudness, Pitch and Timbre',
    ],
  },
  {
    number: 9,
    slug: 'light-first-pass',
    title: 'Light at First Pass',
    summary:
      'Light\u2019s rectilinear travel and shadows; reflection in plane and spherical mirrors with the mirror formula used at school depth; refraction and the lens formula; the prism\u2019s dispersion; and the human eye\u2019s defects as the classic closing register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Reflection and Mirrors',
      'Refraction and Lenses',
      'Dispersion by Prisms',
      'The Human Eye and Its Defects',
      'Images Formed by Concave and Convex Mirrors',
      'Images Formed by Converging and Diverging Lenses',
      'The Color of Light and Spectra',
    ],
  },
  {
    number: 10,
    slug: 'electricity-first-pass',
    title: 'Electricity at First Pass',
    summary:
      'The circuit\u2019s first map: charge, current, potential difference and Ohm\u2019s law; resistance with its series-parallel arithmetic; heating effects and the household\u2019s power arithmetic; and the magnetic-effects taster that the deep book inherits.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Charge, Current and Voltage',
      'Resistance Arithmetic',
      'Heating and Power in Circuits',
      'The Magnetic Taster',
      'Induced Magnetism, Electromagnets and Induced Current',
    ],
  },
]

export const foundationPhysics: Book = {
  id: 'foundation-physics',
  title: 'Foundation Physics',
  subtitle: 'Physics from its first principles: measurement, motion, force, energy, heat, light and electricity at first pass',
  discipline: 'physics',
  level: 'Absolute beginner → Class 10 (first pass)',
  description: 'The school-ladder opening of the physics course: what physics is, how anything is measured, and the first-pass form of every major pillar of the subject, so that the deep books of the shelf can be climbed with confidence later. Cross-references the whole physics shelf: mechanics owns the motion register, electricity-and-magnetism the field register — this book hands off to each honestly.',
  status: 'planned',
  accent: ['#38bdf8', '#075985'],
  chapters,
}
