import type { Book, Chapter } from '../../../types'

/**
 * Waves and Oscillations — the fourth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `wav-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Waves and Oscillations owns the oscillation and wave register (JEE units Oscillations and Waves; GATE PH oscillations). The optics book owns the light-wave side (interference, diffraction, polarisation); the electromagnetic-theory book owns the Maxwell-wave mathematics; heat-and-thermodynamics owns kinetic-theory sound speed’s kinetic side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The JEE Main 2026 and NEET 2026 syllabi (read this pass — Oscillations and Waves units incl. Doppler) as the competitive spine.
 * - French, Vibrations and Waves and Crawford, Waves (the canonical university arcs, named as the closing chapters' poles) for coupled modes and the analysis craft.
 * - Halliday, Resnick & Walker (contents read this pass) for the wave chapters' central arc.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'shm-foundations',
    title: 'Simple Harmonic Motion: Foundations',
    summary:
      'The restoring-proportional-to-displacement idea on spring-mass and pendulum systems; amplitude, period and frequency; the energy exchange between kinetic and potential read on the cycle\u2019s clock; and the time-period formulas derived, not quoted.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Restoring Idea',
      'Spring-Mass and Pendulum',
      'The Energy Clock',
      'Periods Derived',
    ],
  },
  {
    number: 2,
    slug: 'shm-mathematics',
    title: 'Simple Harmonic Motion: Mathematics',
    summary:
      'The differential equation solved with the rotating-reference trick; phasors as the circle that draws the line; superposition of two SHMs — same direction and perpendicular with Lissajous named; and the reference-circle method the competitive register rewards.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equation Solved',
      'Phasors',
      'Superposition of SHMs',
      'Lissajous Curves',
    ],
  },
  {
    number: 3,
    slug: 'damped-and-forced',
    title: 'Damped and Forced Oscillations',
    summary:
      'Real oscillations decay: the damping term and the three regimes — under, critical and over; forced oscillations with the frequency response curve read; resonance and sharpness with Q named gently; and the everyday registers — swings, bridges, tuned circuits ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Damping Term',
      'Three Regimes',
      'Resonance Curves',
      'Everyday Resonance',
    ],
  },
  {
    number: 4,
    slug: 'coupled-and-modes',
    title: 'Coupled Oscillations and Normal Modes',
    summary:
      'The university doorway: two coupled pendulums and the normal-mode decomposition — the symmetric and antisymmetric beats; energy exchange between coupled oscillators; and the continuum limit that hands the wave its definition.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Coupled Pendulums',
      'Normal Modes',
      'Energy Exchange',
      'The Continuum Limit',
    ],
  },
  {
    number: 5,
    slug: 'wave-motion-fundamentals',
    title: 'Wave Motion Fundamentals',
    summary:
      'The travelling disturbance: transverse against longitudinal; wavelength, frequency and the wave equation v = f-lambda; the speed of a transverse wave on a string derived from the tension-mass ledger; and the progressive wave\u2019s full equation read honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Travelling Disturbance',
      'The Wave Equation',
      'Speed on a String',
      'The Progressive Wave',
    ],
  },
  {
    number: 6,
    slug: 'superposition-and-standing',
    title: 'Superposition and Standing Waves',
    summary:
      'Superposition as the linear algebra of displacement: two-wave interference at first pass; standing waves on strings and in pipes with nodes and antinodes; harmonics and overtones for the stretched string; and the reflection-and-transmission ledger at boundaries.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Superposition Principle',
      'Standing Waves Built',
      'Harmonics on Strings',
      'Reflection at Boundaries',
    ],
  },
  {
    number: 7,
    slug: 'sound-and-beats',
    title: 'Sound and Beats',
    summary:
      'The longitudinal nature of sound with its speed in gases derived from the Newton-Laplace correction; loudness, intensity and the decibel scale; organ pipes — open and closed — with their mode registers; and beats as the alternating loudness ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sound\u2019s Longitudinal Nature',
      'The Decibel Scale',
      'Organ Pipes',
      'Beats as Ledger',
    ],
  },
  {
    number: 8,
    slug: 'doppler-effect',
    title: 'The Doppler Effect',
    summary:
      'The apparent-frequency craft for the moving source, moving observer and moving medium registers; the wind\u2019s honest asymmetry; light\u2019s Doppler previewed for the astrophysics book (redshift named); and the classic train-and-platform problems worked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Source and Observer Registers',
      'The Wind Asymmetry',
      'Light\u2019s Doppler Preview',
      'Train Problems',
    ],
  },
  {
    number: 9,
    slug: 'fourier-doorway',
    title: 'The Fourier Doorway',
    summary:
      'The closing idea: any periodic wave as a sum of harmonics — Fourier\u2019s series read first for the square and sawtooth classics; the spectrum idea as the wave\u2019s fingerprint; and the transform named as the door the mathematical-physics book later opens.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Harmonics as Building Blocks',
      'Square and Sawtooth',
      'The Spectrum Idea',
      'The Transform Named',
    ],
  },
]

export const wavesAndOscillations: Book = {
  id: 'waves-and-oscillations',
  title: 'Waves and Oscillations',
  subtitle: 'From the swinging pendulum to the standing wave: oscillation theory and wave motion in full',
  discipline: 'physics',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The motion that repeats: simple harmonic motion built from its differential equation, damped and forced motion with resonance, coupled systems and normal modes at the university doorstep; then wave motion, superposition, standing waves, sound\u2019s musical register and the Doppler effect.',
  status: 'planned',
  accent: ['#a78bfa', '#4c1d95'],
  chapters,
}
