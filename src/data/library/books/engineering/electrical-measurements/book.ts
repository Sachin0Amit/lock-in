import type { Book, Chapter } from '../../../types'

/**
 * Electrical Measurements — the eighteenth book of the Engineering shelf (Electrical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `meas-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Electrical Measurements owns electrical quantification. Power Systems’ protection chapters consume the CT/PT census; Electrical Machines’ testing chapters consume the wattmeter and energy-meter craft; the error statistics route to the Mathematics shelf’s Statistics book; transducers and DAQ hand their deeper systems story to Embedded Systems and the CS shelf’s Internet of Things.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 8 'Electrical and Electronic Measurements'
 *   (EE_2026_Syllabus.pdf, extracted this pass): 'Bridges and Potentiometers,
 *   Measurement of voltage, current, power, energy and power factor; Instrument
 *   transformers, Digital voltmeters and multi-meters, Phase, Time and Frequency
 *   measurement; Oscilloscopes, Error analysis' — the entire section is this book's
 *   register.
 * - A.K. Sawhney, A Course in Electrical and Electronic Measurements and
 *   Instrumentation — the Indian canonical arc web-checked this pass (the
 *   measurement-systems/bridges/potentiometers/CRO organisation confirmed through the
 *   open contents listings); S.K. Bhattacharya's Measurements edition TOC
 *   web-checked as the second pole.
 * - Golding & Widdis named as the classic pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-measurement-discipline',
    title: 'The Measurement Discipline',
    summary:
      'Why measurement is engineering\u2019s honest instrument; units and standards (absolute and working); the generalised measurement system (detector, transducer, signal conditioning, display); errors — systematic and random, statistics of errors and the probable-error craft (Statistics cross-referenced); calibration as the discipline\u2019s conscience; and the accuracy/precision/sensitivity vocabulary priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Standards and the SI Honest Note',
      'Errors Priced and Stated',
      'Calibration as Conscience',
    
      'Electronic Measurements and Instrumentation — principles of measurement, accuracy, precision and standards; analog and digital systems for measurement; static/dynamic characteristics of measurement systems, errors, statistical analysis and curve fitting; measurement systems for non-electrical'
    ],
  },
  {
    number: 2,
    slug: 'indicating-instruments',
    title: 'Indicating Instruments',
    summary:
      'The PMMC movement earned (the D\u2019Arsonval craft, its torque equation and control damping); moving-iron instruments (attraction and repulsion) with their AC honesty; rectifier and thermocouple instruments for the high-frequency honest note; ammeters and voltmeters with shunts and multipliers (the range-extension arithmetic); electrodynamic instruments; and the calibration of the indicating census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The PMMC Earned',
      'Moving Iron\u2019s AC Honesty',
      'Shunts and Multipliers',
      'Electrodynamic Instruments',
    ],
  },
  {
    number: 3,
    slug: 'power-and-energy-measurement',
    title: 'Power and Energy Measurement',
    summary:
      'The electrodynamometer wattmeter (its connections with the compensating honest note); polyphase power by the two-wattmeter method (worked on balanced and the unbalanced honest note); power factor and reactive measurement glanced; the induction energy meter (its driving and braking craft, creep and its adjustment); maximum-demand and trivector meters glanced; and the metering of the consumer priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wattmeter Craft',
      'Two-Wattmeter Worked',
      'The Energy Meter\u2019s Craft',
      'Maximum-Demand Glanced',
    ],
  },
  {
    number: 4,
    slug: 'instrument-transformers',
    title: 'Instrument Transformers',
    summary:
      'Why instrument transformers (isolation and range); the current transformer — ratio and phase-angle errors, the burden honest note, the never-open-circuit safety law; the potential transformer with its errors; the capacitor-voltage transformer glanced; and the measurement-grade versus protection-grade census (Power Systems\u2019 protection cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CT and Its Errors',
      'The Never-Open-Circuit Law',
      'PTs and CVTs',
      'Measurement versus Protection Grades',
    ],
  },
  {
    number: 5,
    slug: 'bridges',
    title: 'Bridges',
    summary:
      'The bridge idea (the null craft — why nulling earns accuracy); Wheatstone\u2019s bridge and its sensitivity; Kelvin\u2019s double bridge for low resistance; insulation resistance (the megger craft); then the AC family — Maxwell, Hay and Anderson for inductance, Schering and Wien for capacitance and frequency, each with its balance equations worked; detectors and guard circuits; and the bridge census table that examiners read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Null Craft Earned',
      'Wheatstone and Kelvin Double',
      'The AC Family Worked',
      'Detectors and Guards',
    ],
  },
  {
    number: 6,
    slug: 'potentiometers-and-magnetic-measurements',
    title: 'Potentiometers and Magnetic Measurements',
    summary:
      'The DC potentiometer as the calibration engine (the standard-cell honest note); the AC potentiometer glanced; calibration of ammeters, voltmeters and wattmeters by potentiometer priced; then magnetic measurements — the hysteresis loop traced (the epstein frame and fluxmeter craft), ballistic galvanometer glanced, and the magnetic census closed honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Potentiometer as Calibration',
      'Calibration Priced End-to-End',
      'Hysteresis Loops Traced',
    ],
  },
  {
    number: 7,
    slug: 'digital-instruments',
    title: 'Digital Instruments',
    summary:
      'Why digital won (the resolution and drift honest notes); DVM architectures — ramp, dual-slope, successive-approximation and integrating, each priced; digital multimeters; frequency and time-interval measurement (the counter craft, the time-base honesty, reciprocal counting); phase measurement; and the specification sheet read as a first language (resolution, accuracy, input impedance).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'DVM Architectures Priced',
      'Counters and the Time Base',
      'Phase Measured',
      'Specification Sheets Read',
    ],
  },
  {
    number: 8,
    slug: 'oscilloscopes',
    title: 'The Oscilloscope',
    summary:
      'The CRT craft (its gun, deflection and phosphor census); triggering earned (the stable-display honest note); the Lissajous figures for frequency and phase; the DSO (sampling, aliasing honesty cross-referenced to Signals and Systems, memory and math channels); probes and their compensation; and the measurement census the scope actually serves.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CRT Craft',
      'Triggering Earned',
      'Lissajous for Frequency and Phase',
      'The DSO and Its Aliasing Honesty',
    ],
  },
  {
    number: 9,
    slug: 'transducers-and-doorstep',
    title: 'Transducers, Telemetry and the Doorstep',
    summary:
      'The transducer census (resistive, inductive, capacitive, piezoelectric — each family priced by what it senses); signal conditioning and the bridge revisited; telemetry glanced (the remote measurement honest note); data acquisition (sampling, the DAQ chain) routed to Embedded Systems; and the synthesis — the honest quantification of the electrical world, one instrument census on a page.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transducer Census',
      'Signal Conditioning Revisited',
      'Telemetry and DAQ Routed',
      'The Synthesis Census',
    ],
  },
]

export const electricalMeasurements: Book = {
  id: 'electrical-measurements',
  title: 'Electrical Measurements',
  subtitle: 'Instruments, bridges and the honest quantification of electrical quantities',
  discipline: 'engineering',
  level: 'First measurements course → instrumentation and DAQ readiness',
  description: 'The measurement discipline: units, standards and the error-and-calibration craft (statistics of errors cross-referenced to the Mathematics shelf\u2019s Statistics); the indicating instrument family — PMMC and moving iron, their torque craft, ammeters and voltmeters with shunts and multipliers, rectifier and electrodynamic instruments; power and energy measurement — the electrodynamometer wattmeter, polyphase measurement (the two-wattmeter craft cross-referenced to Circuit Theory), induction energy meters, maximum-demand meters; instrument transformers (CT and PT) with their burdens, errors and the safety honest note; bridges — DC (Wheatstone with Kelvin\u2019s double for low resistance) and AC (Maxwell, Hay, Schering, Wien, Anderson for inductance and capacitance) with detectors and guard circuits; potentiometers (DC and AC; the calibration engine); magnetic measurements glanced (hysteresis and flux); digital instruments — DVM architectures, multimeters, phase/time/frequency counters; the oscilloscope (CRT craft and the modern DSO, Lissajous figures); transducers and signal conditioning with telemetry glanced; and the data-acquisition doorstep. Cross-references Power Systems\u2019 protection (the CT/PT consumer), Electrical Machines (testing) and hands off to the ECE shelf\u2019s Embedded Systems.',
  status: 'planned',
  accent: ['#0f766e', '#134e4a'],
  chapters,
}
