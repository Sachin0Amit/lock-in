import type { Book, Chapter } from '../../../types'

/**
 * Analog Electronics — the twenty-third book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 109 planned lessons, zero written. Lesson ids will use the `ae-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Analog Electronics owns the analog signal chain. Electronic Devices and Circuits owns the device physics and single-stage fundamentals; Digital Signal Processing owns the sampled-domain filtering; Digital Logic Design owns the combinational/sequential census; the GATE EE S9 ’Analog and Digital Electronics’ and EC S4 ’Analog Circuits’ registers route here for the analog lines.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 9 (analog half) + EC Section 4 'Analog Circuits'
 *   (both syllabus PDFs downloaded + extracted this pass): 'Simple diode circuits:
 *   clipping, clamping, rectifiers; Amplifiers: biasing, equivalent circuit and
 *   frequency response; oscillators and feedback amplifiers; operational amplifiers:
 *   characteristics and applications; single stage active filters, Active Filters:
 *   Sallen Key, Butterworth, VCOs and timers, combinatorial and sequential logic
 *   circuits, multiplexers, demultiplexers, Schmitt triggers, sample and hold
 *   circuits, A/D and D/A converters' + 'Diode Circuits; BJT and MOSFET Amplifiers:
 *   biasing, AC coupling, small signal analysis, frequency response. Current mirrors
 *   and differential amplifiers. Op-amp Circuits: amplifiers, summers,
 *   differentiators, integrators, active filters, Schmitt triggers and oscillators'
 *   — the analog halves are this book's register (the digital lines route to
 *   digital-logic-design).
 * - Millman & Halkias, Integrated Electronics; Sedha's Analog electronics arc
 *   web-checked as the Indian poles; Boylestad's op-amp chapters noted (read in the
 *   open TOC this pass); Razavi's Design of Analog CMOS named as the depth pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-analog-chain',
    title: 'The Analog Signal Chain',
    summary:
      'What \u2019analog\u2019 honestly means (the continuous honest note, noise\u2019s vote); the chain drawn on one page — sensor, amplification, filtering, conversion; the decibel family and the dBm census; distortion and noise priced as the chain\u2019s honest taxes; and the instrumentation story that motivates the whole book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chain Drawn on One Page',
      'The Decibel Family',
      'Distortion and Noise Priced',
      'Crossover distortion and output impedance',
      'Wrapup: choosing a low-noise op-amp',
      'BJT voltage noise, revisited',
      'EIGHT: Low-Noise Techniques',
      'Finding e_n from noise-figure specifications',
      'Selecting low-noise JFETs',
      'Charting comparative noise',
      'Calculating the integrated noise',
    ],
  },
  {
    number: 2,
    slug: 'differential-and-multistage',
    title: 'Differential and Multistage Amplifiers',
    summary:
      'The differential amplifier earned (the long-tailed pair, its CMRR engine); current mirrors as the bias craft; the active-load honest note; cascade and cascode multistage configurations with their gain bookkeeping; the level-shifting craft; and the differential pair as the op-amp\u2019s input stage named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Long-Tailed Pair Earned',
      'Current Mirrors as Bias',
      'Cascade, Cascode, Bookkeeping',
      'The Op-Amp\u2019s Input Stage Named',
      'Output Resistance of a CS Amplifier 9.4.4 A Concluding Remark',
      'The common-emitter amplifier revisited',
      'Active clamp',
      'RRIO op-amps: the good, the bad, and the ugly',
      'CMRR and PSRR',
      'Composite transimpedance amplifiers',
      'Isolating input capacitance: cascoding the transimpedance amplifier',
      'Calculating the CMRR',
      'Scanning tunneling microscope preamplifier',
    ],
  },
  {
    number: 3,
    slug: 'feedback-amplifiers',
    title: 'Feedback Amplifiers',
    summary:
      'Feedback\u2019s four topologies mapped to the circuits they serve; the gain sensitivity, bandwidth and distortion honest notes priced; the loop-gain craft; stability — the phase-margin honest note (Control Systems cross-referenced for the criterion depth); and the positive-feedback honest edge that oscillators live on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Topologies Mapped',
      'The Honest Notes Priced',
      'Stability and the Phase Margin',
      'The Edge Oscillators Live On',
    ],
  },
  {
    number: 4,
    slug: 'the-operational-amplifier',
    title: 'The Operational Amplifier',
    summary:
      'The op-amp\u2019s real characteristics (offset, bias currents, CMRR, slew rate, GBP) and the ideal model\u2019s honest limits; the linear circuit census — inverting, non-inverting, the follower, summers, difference amplifiers, integrators and differentiators (each with its saturation honest note); the instrumentation amplifier earned; and the comparator introduced (its positive-feedback Schmitt craft in the next chapter).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Real Characteristics, Ideal Model',
      'The Linear Census Worked',
      'The Instrumentation Amplifier',
      'The Comparator Introduced',
      'Negative Feedback and the Op-Amp Smorgasbord',
      'Auto-Zeroing and Chopper-Stabilised Amplifiers',
      'Precision Amplifiers, Error Budgets and the Null Offset',
      'From Zener to the Series-Pass Linear Regulator',
      'The Bipolar-FET Shootout and Active Loads',
      'Putting It Together: The AM Radio',
      'A "roll-your-own" instrumentation amplifier',
      'Analyzing a Noninverting-Amplifier Circuit Using',
      'Precision coil driver',
      'Introduction to op-amps \u2013 the "perfect component"',
      'Nanoamp wide-compliance bipolarity current source',
      'Designing a Summing Amplifier',
      'Designing a Noninverting Amplifier',
      'GBW, f_T, slew rate and "m," and settling time',
    ],
  },
  {
    number: 5,
    slug: 'active-filters',
    title: 'Active Filters',
    summary:
      'Filter vocabulary (pass, band, the dB honest note); the first-order stages; Sallen-Key topology worked; the Butterworth approximation with its table craft; the higher-order honest note; notch and band-pass configurations; and the filter-design craft cross-referenced to Digital Signal Processing\u2019s sampled sibling.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sallen-Key Worked',
      'The Butterworth Craft',
      'Notches and Band-Pass',
      'The Sampled Sibling Named',
      'Early Filter Pioneers: Cauer and Darlington',
      'VCVS filter design using our simplified table',
      'Designing a Fourth-Order Low-Pass Bandpass Filter',
      'Practical Perspective: Active High-Q',
    ],
  },
  {
    number: 6,
    slug: 'comparators-and-schmitt',
    title: 'Comparators and Schmitt Triggers',
    summary:
      'The open-loop comparator and its speed honest note; the Schmitt trigger earned (the hysteresis craft with its threshold arithmetic); the inverting and non-inverting forms; the regenerative honest note; and the applications census (zero crossing, squaring, the ADC\u2019s doorstep).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Comparator\u2019s Speed Note',
      'Hysteresis Earned',
      'The Threshold Arithmetic',
      'The ADC Doorstep',
      'Common Emitter Amplifier',
    ],
  },
  {
    number: 7,
    slug: 'oscillators',
    title: 'Oscillators',
    summary:
      'The Barkhausen criterion earned (the loop-gain honest note); the RC family — Wien-bridge analysed, phase-shift priced; the LC family — Colpitts and Hartley by the same engine; frequency stability priced and the crystal oscillator\u2019s piezo honest note; the relaxation honest note; and the oscillator census table read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Barkhausen Earned',
      'The RC Family',
      'The LC Family',
      'Crystals and Stability',
      'Realization of the Bandpass Oscillator',
    ],
  },
  {
    number: 8,
    slug: 'timers-and-function-circuits',
    title: 'Timers and Function Circuits',
    summary:
      'The 555 census — monostable, astable and bistable crafts with its duty arithmetic; voltage-controlled oscillators; the phase-locked loop — its lock and capture craft priced at system level; function generators glanced; and the sample-and-hold circuit earned (its aperture honest note) as the converter\u2019s front door.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 555 Census',
      'VCOs and the PLL',
      'Monostable multivibrator',
    ],
  },
  {
    number: 9,
    slug: 'converters-and-doorstep',
    title: 'Data Conversion and the Doorstep',
    summary:
      'Why conversion is the mixed-signal hinge; the DAC architectures priced (R-2R, weighted) with their resolution honest notes; the ADC census — flash, successive-approximation, integrating and sigma-delta with their speed-versus-resolution honest map; the sampling and quantisation notes (Signals and Systems cross-referenced); and the analog synthesis map with the doorsteps — Digital Signal Processing, Digital Logic Design, the instrumentation story of Electrical Measurements.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The DAC Architectures Priced',
      'The ADC Census Mapped',
      'Sampling Notes Cross-Referenced',
      'The Doorsteps Named',
      'Blinding Flash',
      'Multiplying DACs',
      'Driving flash, folding, and RF ADCs',
      'Converter linearity \u2013 a closer look',
      'Undersampling flash-converter example',
      'Pros and Cons of \u0394\u03a3 oversampling converters',
      'Some unusual A/D and D/A converters',
      'AD7927 ADC with sequencer',
      'Sample-and-Hold Earned',
    ],
  },
]

export const analogElectronics: Book = {
  id: 'analog-electronics',
  title: 'Analog Electronics',
  subtitle: 'Amplifiers, op-amps, filters and oscillators — the analog signal chain engineered',
  discipline: 'engineering',
  level: 'First analog-circuits course → mixed-signal and instrumentation readiness',
  description: 'The analog signal chain: the chain\u2019s worldview (amplification, the decibel family, the distortion honest note); differential and multistage amplifiers with current mirrors; feedback amplifier theory — the four topologies with their benefits and the stability honest note; the operational amplifier — characteristics, the ideal model, and the circuit census (inverting, non-inverting, summers, integrators, differentiators, instrumentation); active filters — Sallen-Key and the Butterworth craft; comparators and Schmitt triggers; oscillators — the RC family (Wien-bridge, phase-shift) and the LC family (Colpitts, Hartley) with crystal oscillators; timers and function circuits — the 555 census, voltage-controlled oscillators and the PLL; sample-and-hold and the analog-to-digital doorway (converter architectures priced at system level); and the analog synthesis with the mixed-signal doorstep. Cross-references Electronic Devices and Circuits (the devices), Circuit Theory (the frequency craft), Signals and Systems (the transform view), Digital Logic Design (the digital side) and hands off to Digital Signal Processing.',
  status: 'planned',
  accent: ['#be185d', '#831843'],
  chapters,
}
