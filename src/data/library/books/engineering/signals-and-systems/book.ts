import type { Book, Chapter } from '../../../types'

/**
 * Signals and Systems — the twenty-fourth book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `sig-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Signals and Systems owns the signal-and-LTI discipline for the shelf (GATE EE S4 + EC S2’s signal half — one book, both papers). Circuit Theory owns their circuit applications; Control Systems owns the design craft they feed; Analog and Digital Communication owns the modulation story; Digital Signal Processing owns the discrete filtering craft; the Mathematics shelf’s real/complex analysis books own the pure convergence depth.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 4 'Signals and Systems' + EC Section 2's signal half
 *   (both syllabus PDFs downloaded + extracted this pass): 'Representation of
 *   continuous and discrete time signals, shifting and scaling properties, linear
 *   time invariant and causal systems, Fourier series representation of continuous
 *   and discrete time periodic signals, sampling theorem, Applications of Fourier
 *   Transform for continuous and discrete time signals, Laplace Transform and Z
 *   transform. R.M.S. value, average value calculation for any general periodic
 *   waveform' + 'Continuous-time Signals: Fourier series and Fourier transform,
 *   sampling theorem and applications. Discrete-time Signals: DTFT, DFT, z-transform,
 *   discrete-time processing of continuous-time signals. LTI systems: definition and
 *   properties, causality, stability, impulse response, convolution, poles and
 *   zeroes, frequency response, group delay, phase delay' — the two registers merge
 *   into this book (the DFT's algorithmic depth routes to DSP).
 * - Oppenheim, Willsky & Nawab, Signals and Systems 2e — the TOC read this pass
 *   from the Pearson page (Signals and Systems; LTI Systems; Fourier Series; the
 *   CT and DT Fourier transforms; Sampling; the Laplace and z transforms;
 *   communication and control applications chapters noted); Haykin's Signals and
 *   Systems named as the second pole; Lathi named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-signal-idea',
    title: 'The Signal Idea',
    summary:
      'What a signal is (the function-as-carrier honest note); continuous versus discrete time and amplitude (the four-way census); the signal census — exponentials, sinusoids, impulses and steps (each defined honestly in both domains); energy and power signals; and the transformation census — shifting, scaling and reversal with the order-of-operations honest note examiners price.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four-Way Census',
      'Impulses and Steps, Honestly',
      'Energy versus Power',
      'Shift, Scale, Reverse — Order Matters',
    ],
  },
  {
    number: 2,
    slug: 'system-properties',
    title: 'System Properties',
    summary:
      'The property census — linearity, time-invariance, memory, causality, stability (BIBO stated and priced) — each tested on worked examples with the verdicts argued honestly; LTI as the tractable intersection; and the property arithmetic (the stability-of-cascade honest notes) that the rest of the book assumes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census Tested Honestly',
      'BIBO Stated and Priced',
      'LTI as the Tractable Intersection',
    ],
  },
  {
    number: 3,
    slug: 'convolution',
    title: 'The LTI Core: Convolution',
    summary:
      'The impulse response as the system\u2019s complete signature; convolution earned in continuous time (the graphical craft practised until fluent) and discrete time; the convolution properties (commutative, associative, the distributive honest note); the step response from the impulse response; and causality and stability read from h.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Impulse Response as Signature',
      'The Graphical Craft Practised',
      'Properties of the Convolution',
      'Causality and Stability Read',
    ],
  },
  {
    number: 4,
    slug: 'fourier-series',
    title: 'The Fourier Series',
    summary:
      'The idea (periodic signals as harmonic sums) earned from the orthogonality craft; coefficients computed for the standard census (square, triangle, rectified sinusoids); the symmetry honest notes that halve work; Parseval priced; the Gibbs honest note named; and the discrete-time Fourier series learned in parallel.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Orthogonality Earned',
      'The Standard Census Computed',
      'Parseval and the Gibbs Note',
      'The Discrete Sibling Learned',
    ],
  },
  {
    number: 5,
    slug: 'the-fourier-transform',
    title: 'The Fourier Transform',
    summary:
      'The transform earned as the aperiodic limit; the transform census computed (the pair table built honestly); the properties as working engines (time/frequency duality, convolution-as-multiplication priced); the frequency response from the transform; the DTFT for discrete signals; and the DFT named as the computable census (its algorithmic story routed to DSP).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aperiodic Limit Earned',
      'The Pair Table Built',
      'Convolution-as-Multiplication Priced',
      'DTFT and the DFT Named',
    ],
  },
  {
    number: 6,
    slug: 'the-laplace-transform',
    title: 'The Laplace Transform',
    summary:
      'The transform with its region of convergence (why the ROC matters, honestly); the pair census with ROCs; the properties as engines; poles and zeros of the system function read for character; stability and causality from the ROC; the unilateral honest note for circuits with initial conditions (Circuit Theory cross-referenced); and inversion by partial fractions practised.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ROC, Honestly',
      'Poles and Zeros as Character',
      'Stability from the ROC',
      'Inversion Practised',
    ],
  },
  {
    number: 7,
    slug: 'the-z-transform',
    title: 'The z-Transform',
    summary:
      'The discrete sibling with its ROC craft; the pair census and properties; the discrete system function H(z) — poles, zeros, stability (the unit-circle criterion earned); inversion by partial fractions and long division; the bilateral honest note; and the s-to-z mappings glanced (the design story lives in DSP).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Discrete Sibling\u2019s ROC',
      'The Unit-Circle Criterion Earned',
      'Inversion by Two Routes',
      'The s-to-z Glance',
    ],
  },
  {
    number: 8,
    slug: 'sampling-and-reconstruction',
    title: 'Sampling and Reconstruction',
    summary:
      'The sampling theorem earned (not recited) — from the spectrum\u2019s periodic honest note; aliasing priced with the fold honest note; reconstruction by the ideal filter and its real honest limits; the discrete-time processing of continuous-time signals as the standard chain; decimation and interpolation named (DSP owns the multirate craft); and the practical sampling census (sample-and-hold cross-referenced to Analog Electronics).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Theorem Earned',
      'Aliasing and the Fold',
      'The Standard Chain Drawn',
      'The Practical Census',
    ],
  },
  {
    number: 9,
    slug: 'waveform-census-and-doorstep',
    title: 'The Waveform Census and the Doorstep',
    summary:
      'The RMS and average value computed for the general periodic waveform (the GATE EE line, worked on the odd and composite census); the waveform census table; the book\u2019s synthesis map — one page from signals to the transform families; and the doorsteps — Analog and Digital Communication (the modulation story), Control Systems (the design craft), Digital Signal Processing (the filtering craft), Circuit Theory\u2019s network functions.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'RMS for the General Waveform',
      'The Census Table',
      'The Synthesis Map',
      'The Doorsteps Named',
    ],
  },
]

export const signalsAndSystems: Book = {
  id: 'signals-and-systems',
  title: 'Signals and Systems',
  subtitle: 'Continuous and discrete signals through LTI machinery — Fourier, Laplace, z and sampling',
  discipline: 'engineering',
  level: 'First signals course → communication, control and DSP readiness',
  description: 'The transform discipline: the signal idea — continuous and discrete time, energy and power signals, the transformation census (shifting, scaling, reversal); system properties — linearity, time-invariance, causality, stability and memory, honestly classified; the LTI core — the impulse response and convolution (continuous and discrete) with its graphical craft; the Fourier series for periodic signals (continuous and discrete) earned; the Fourier transform (continuous and discrete-time DTFT) with properties and the frequency response; the Laplace transform with its ROC and the system function\u2019s poles and zeros; the z-transform with its ROC and the discrete system function; sampling and reconstruction — the sampling theorem earned, aliasing priced honestly, the discrete-time processing of continuous-time signals; and the closing census — RMS and average values for general periodic waveforms (the GATE EE line) and the doorsteps to every consumer book. Cross-references Circuit Theory (transients and network functions), Control Systems, Analog and Digital Communication, Digital Signal Processing and the Mathematics shelf\u2019s transform chapters.',
  status: 'planned',
  accent: ['#0891b2', '#155e75'],
  chapters,
}
