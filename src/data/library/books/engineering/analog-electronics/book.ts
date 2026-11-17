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
      'Large-Signal Operation of Op Amps 111 4.3.5 The Constant-Voltage-Drop',
      'Mirrors 516 9.2.3 Large-Signal Operation',
      'Large-Signal Operation 583 Amplifier When Rsig Is Low',
      'Small-Signal Operation 587 10.2.4 The Common-Emitter Amplifier',
      'Note: The scanned pages are not a JEE mathematics book — they are the front matter and Contents of *The Art of Electronics, Third Edition* (Horowitz & Hill, Cambridge University Press). Transcribing them exactly as printed',
      'Crossover distortion and output impedance',
      'Wrapup: choosing a low-noise op-amp',
      'IV: Analog-oriented optocouplers',
      'Appendix D The Decibel',
      'Signals 569 Answers to Exercises',
      'Terms and concepts 513 24 Signals'
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
      'Classification of Amplifiers Based on 2.7.1 Frequency Dependence of the',
      'Common-Emitter (CE) Amplifiers',
      'Emitter) Amplifier with a Source',
      'Common-Base (CB) Amplifiers',
      'A Common-Emitter Amplifier',
      'A Common-Emitter Amplifier with',
      'Small-Signal Operation of Current 9.2.2 Input Common-Mode Range',
      'The CS and CE Amplifiers with 9.3 Common-Mode Rejection',
      'Output Resistance of a CS Amplifier 9.4.4 A Concluding Remark',
      'Amplifier 535 9.5.1 Differential-to-Single-Ended',
      'The BJT Cascode 547 9.5.5 Common-Mode Gain and CMRR',
      'The Cascode MOS Mirror 552 Summary',
      'Introduction 576 Amplifiers',
      'Amplifiers 731 11.4.2 The Practical Case',
      'Other Wideband Amplifier Amplifier (Shunt-Shunt)',
      'The CS Amplifier 752 11.8.5 Amplifiers with Three or More',
      'Amplifiers 887 13.2.3 VoltageGain',
      'Class B Output Stage 897 13.3 BJT Op-Amp Techniques',
      'Use of Input Emitter Followers',
      'Class D Power Amplifiers 921 14.1.2 Filter Types',
      'The Two-Stage CMOS Op Amp 938 14.2.5 Factoring T(s) into the Product',
      'Determining the Equivalent Load 18.4.1 Ring Oscillators and Other Pulse',
      'The common-emitter amplifier revisited',
      'Biasing the common-emitter amplifier',
      'Introduction to op-amps – the "perfect component"',
      'Active clamp',
      'RRIO op-amps: the good, the bad, and the ugly',
      'CMRR and PSRR',
      'Composite transimpedance amplifiers',
      'Reducing input capacitance: bootstrapping the transimpedance amplifier',
      'Isolating input capacitance: cascoding the transimpedance amplifier',
      'The Integrating Amplifier 252 10.1 Instantaneous Power',
      'Functional Transforms 452 15.3 Op Amp Bandpass and Bandreject Filters',
      'Designing a Summing Amplifier',
      'Designing a Noninverting Amplifier',
      'Calculating the CMRR',
      'Designing a Broadband Bandreject Op Amp Transient Response'
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
      'The Chebyshev Filter 1026 15.2.3 The Quadrature Oscillator',
      'The LCR Resonator 1029 Oscillator',
      'Realization of the Bandpass Oscillator',
      'Oscillators 1066 16.1.6 A Complex Gate',
      'Determining the Propagation Delay 18.4 Ring Oscillators and Special-Purpose',
      'Output bandwidth limiting in the transimpedance amplifier'
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
      'A Detailed Look at Op-Amp Behavior and Selected Circuits',
      'Auto-Zeroing and Chopper-Stabilised Amplifiers',
      'Impedance and Reactance in Real Circuits',
      'Inductors and Transformers',
      'Precision Amplifiers, Error Budgets and the Null Offset',
      'From Zener to the Series-Pass Linear Regulator',
      'The Bipolar-FET Shootout and Active Loads',
      'Ebers-Moll Applied to Basic Transistor Circuits',
      'Putting It Together: The AM Radio',
      'The Emitter-Follower Case 730 Amplifiers',
      'A "roll-your-own" instrumentation amplifier',
      'Designing a Series RLC Bandreject Filter 562 Series',
      'Designing a Broadband Bandpass Op Amp 17.3 Deriving an Operational Fourier Transform',
      'Summary of important formulae 416 20.29 Operational amplifiers'
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
      'CMOS Output Stages 915 14 Filters',
      'Early Filter Pioneers: Cauer and Darlington',
      'VCVS filter design using our simplified table',
      'Inverse Transforms 460 and Bandreject Filters',
      'Designing a Fourth-Order Low-Pass Bandpass Filter',
      'Butterworth Filter 594 17.8 Applying Parseval’s Theorem to a Low-Pass'
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
      'Zeros 1031 15.3.1 The Colpitts and Hartely',
      'AD7927 ADC with sequencer'
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
      'Sample-and-Hold Earned',
      'Monostable multivibrators',
      'Monostable multivibrator',
      'Designing a Bandpass Filter 555 Periodic Voltage Source'
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
      'Fundamental bus signals: data, address, strobe',
      'Prefaces xvii 25 Data Transmission and Signals'
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
