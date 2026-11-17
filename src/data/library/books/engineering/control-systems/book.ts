import type { Book, Chapter } from '../../../types'

/**
 * Control Systems — the sixteenth book of the Engineering shelf (Electrical branch, shared by every branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 56 planned lessons, zero written. Lesson ids will use the `ctrl-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Control Systems owns feedback theory for the whole shelf (GATE EE S7 and EC S6 name identical registers — one book, both papers). Signals and Systems owns the signal-transform machinery; the Mathematics shelf owns the pure Laplace/z theory; Power Electronics and Robotics consume the servo designs; the CS shelf’s Operating Systems owns scheduler feedback (a different beast, honestly noted).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 7 'Control Systems' and EC Section 6 (both syllabus PDFs
 *   downloaded + extracted this pass): 'Mathematical modelling and representation of
 *   systems, Feedback principle, transfer function, Block diagrams and Signal flow
 *   graphs, Transient and Steady-state analysis of linear time invariant systems,
 *   Stability analysis using Routh-Hurwitz and Nyquist criteria, Bode plots, Root
 *   loci, Lag, Lead and Lead-Lag compensators; P, PI and PID controllers; State space
 *   model, Solution of state equations of LTI systems' — the identical registers are
 *   this book's chapter spine.
 * - Ogata, Modern Control Engineering — the chapter arc web-checked this pass from
 *   the Pearson TOC and the open preface PDFs (Introduction; Mathematical Modelling;
 *   Modelling in the frequency and time domains; Transient-Response Analysis;
 *   Root-Locus Analysis; Frequency-Response Analysis; Control Systems Design; PID
 *   controllers; Control Systems Analysis in State Space) — the standard spine.
 * - Nagrath & Gopal's Control Systems Engineering named as the Indian pole; Nise
 *   named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-feedback-idea',
    title: 'The Feedback Idea',
    summary:
      'Open-loop versus closed-loop priced honestly (the sensitivity and disturbance-rejection gains, the instability cost named early); Watt\u2019s governor and Black\u2019s amplifier as the two historical engines; the component census (sensor, controller, actuator, plant); and the positive-feedback honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Open versus Closed, Priced',
      'Two Historical Engines',
      'The Component Census',
      'Gain Desensitivity',
      'Gain nonlinearity',
      'Regulators and servomechanisms',
      'Mechatronics',
    ],
  },
  {
    number: 2,
    slug: 'modelling',
    title: 'Mathematical Modelling',
    summary:
      'Modelling electrical networks (the impedance honest note), mechanical translational and rotational systems, thermal and liquid-level systems — the analogous-structure craft that lets one theory serve every branch; linearisation named with its honest limits; transfer functions from the differential equations; and the initial-vs-zero-state honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Analogous Structures',
      'Linearisation and Its Limits',
      'Transfer Functions Earned',
    ],
  },
  {
    number: 3,
    slug: 'block-diagrams-and-signal-flow',
    title: 'Block Diagrams and Signal Flow Graphs',
    summary:
      'Block-diagram algebra as a craft (series, parallel, feedback moves); the signal-flow graph as the compressed form; Mason\u2019s gain rule earned and worked on real graphs; and the honest equivalence of the two representations.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Block-Diagram Algebra',
      'Signal-Flow Graphs Drawn',
      'Mason\u2019s Gain Rule Earned',
    ],
  },
  {
    number: 4,
    slug: 'time-response',
    title: 'Transient and Steady-State Analysis',
    summary:
      'Standard test signals (step, ramp, impulse); first-order response with its time constant; second-order response with the damping ratio and natural frequency, the specs (overshoot, settling, rise, peak time) priced; the dominant- pole honesty; steady-state errors by system type and the error constants (position, velocity, acceleration); and disturbance rejection priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Second-Order Specs Priced',
      'The Dominant-Pole Honesty',
      'System Types and Error Constants',
      'Disturbance Rejection Priced',
      'Microwave And Satellite Communication \u2014 Terrestrial/space Type Los',
    ],
  },
  {
    number: 5,
    slug: 'stability-routh',
    title: 'Stability and Routh-Hurwitz',
    summary:
      'Stability as the bounded-input honest note (its exact statement cross-referenced to Signals and Systems); the pole-location criterion; the Routh-Hurwitz test worked (with the zero-row and auxiliary-equation moves); the relative-stability honest note; and the special cases that examiners love, solved honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Stability Stated Honestly',
      'Routh-Hurwitz Worked',
      'The Special Cases Solved',
      'Routh\'s Procedure',
    ],
  },
  {
    number: 6,
    slug: 'the-root-locus',
    title: 'The Root Locus',
    summary:
      'The root-locus idea (gain as the pencil that moves the poles); the construction rules earned one by one (real-axis segments, asymptotes, departure and arrival angles, the jomega crossings by Routh); the locus used for design — gain selection to meet damping; the effect of added poles and zeros priced; and the two-locus systems (the positive-feedback honest note).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rules Earned One by One',
      'Design by Locus',
      'The jomega Crossings',
    ],
  },
  {
    number: 7,
    slug: 'frequency-response-nyquist',
    title: 'Frequency Response and Nyquist',
    summary:
      'The frequency response as the system\u2019s signature; Bode plots drawn fluently (the straight-line craft, the corrections); gain and phase margins read from Bode and from the polar plot; Nyquist\u2019s criterion earned (the encirclement counting with N = Z - P); the delay honest note; and closed-loop resonance (Mr, bandwidth) priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bode Drawn Fluently',
      'Margins Read Honestly',
      'Nyquist\u2019s Criterion Earned',
      'Mr and Bandwidth Priced',
    ],
  },
  {
    number: 8,
    slug: 'compensation-design',
    title: 'Compensators and the Design Craft',
    summary:
      'Design as the honest posture (specifications into dynamics): lag compensation (the steady-state gain engine), lead compensation (the transient/phase-margin engine), lag-lead priced; the design worked in the frequency domain and on the locus; and the trade-off census every design must sign.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lag: the Steady-State Engine',
      'Lead: the Phase-Margin Engine',
      'Lag-Lead and the Trade-Off Census',
    ],
  },
  {
    number: 9,
    slug: 'pid-controllers',
    title: 'P, PI and PID Controllers',
    summary:
      'The industrial controller census priced (P — fast but biased, I — the bias killer, D — the anticipator with its noise honest note); the Ziegler-Nichols tuning routes (ultimate-gain and reaction-curve); anti-windup named; and the PID\u2019s honest limits pointing to state-space and modern design.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Controller Census Priced',
      'Ziegler-Nichols Tuning',
      'Anti-Windup and the Honest Limits',
    ],
  },
  {
    number: 10,
    slug: 'state-space-and-doorstep',
    title: 'State Space, Digital Glimpse and the Doorstep',
    summary:
      'The state-space model (state variables chosen, the honest non-uniqueness); the solution of state equations (the matrix exponential, the Laplace route); transfer function from the model and back; controllability and observability priced (the rank tests); the digital-control glance (sampling, the z-plane cross-referenced to Signals and Systems and DSP); and the doorsteps — Power Electronics\u2019 drives, Robotics\u2019 servos, the process industries, the CS shelf\u2019s feedback-named systems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Model and Its Solutions',
      'Controllability and Observability',
      'The Digital Glance',
      'The Doorsteps: Drives, Servos, Processes',
    ],
  },
]

export const controlSystems: Book = {
  id: 'control-systems',
  title: 'Control Systems',
  subtitle: 'Feedback as an engineering principle — modelling, stability and design of dynamic systems',
  discipline: 'engineering',
  level: 'First control course → servomechanism and process-control readiness',
  description: 'Feedback as a principle every branch speaks: the control idea and its history (Watt\u2019s governor to the electronics of today); mathematical modelling of electrical, mechanical, thermal and fluid systems (the analogous-structure craft cross-referenced to Circuit Theory and Engineering Mechanics); transfer functions, block diagrams and signal-flow graphs with Mason\u2019s gain rule; transient and steady-state analysis of linear systems (first/second-order specs, system types, error constants); stability by Routh-Hurwitz; the root locus — drawn by the rules and used for design; frequency-domain design — Bode plots, Nyquist\u2019s criterion, gain and phase margins; lag, lead and lag-lead compensation designed honestly; the industrial controller census — P, PI and PID with tuning; state-space models and the solution of state equations (controllability and observability priced); the digital-control glance (sampling, z-domain cross-referenced to Signals and Systems); and the synthesis with applications across every branch. Cross-references Signals and Systems, the Mathematics shelf\u2019s Laplace chapters, Power Electronics (drives), Robotics (servos) and hands off to the CS shelf\u2019s machines.',
  status: 'planned',
  accent: ['#4338ca', '#312e81'],
  chapters,
}
