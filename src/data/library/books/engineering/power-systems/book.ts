import type { Book, Chapter } from '../../../types'

/**
 * Power Systems — the fifteenth book of the Engineering shelf (Electrical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 39 planned lessons, zero written. Lesson ids will use the `ps-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Power Systems owns the grid as a system. Electrical Machines owns the generator and transformer depth; High Voltage Engineering owns insulation and testing depth; Power Electronics owns the converter stations (HVDC/FACTS); Renewable Energy owns the variable-source integration problem; Protection’s relay theory is shared honestly with Measurements’ instrument-transformer census.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 6 'Power Systems' (EE_2026_Syllabus.pdf, extracted this
 *   pass): 'Basic concepts of electrical power generation, AC and DC transmission
 *   concepts, Models and performance of transmission lines and cables, Economic Load
 *   Dispatch (with and without considering transmission losses), Series and shunt
 *   compensation, Electric field distribution and insulators, Distribution systems,
 *   Per-unit quantities, Bus admittance matrix, Gauss-Seidel and Newton-Raphson load
 *   flow methods, Voltage and Frequency control, Power factor correction, Symmetrical
 *   components, Symmetrical and unsymmetrical fault analysis, Principles of
 *   over-current, differential, directional and distance protection; Circuit breakers,
 *   System stability concepts, Equal area criterion' — the entire section is this
 *   book's register.
 * - Stevenson & Grainger, Power System Analysis — the FULL 16-chapter TOC read this
 *   pass from the Library of Congress catdir record (Basic Concepts; Transformers; The
 *   Synchronous Machine; Series Impedance and Capacitance of Transmission Lines;
 *   Current and Voltage Relations; The Admittance Model; The Impedance Model; Power
 *   Flow Solutions; Symmetrical Faults; Symmetrical Components; Unsymmetrical Faults;
 *   Economic Operation; Zbus Methods; State Estimation; Stability) — the chapter spine
 *   this book follows.
 * - Wadhwa's Electrical Power Systems named as the Indian pole; Glover & Sarma named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-grid-worldview',
    title: 'The Power System Worldview',
    summary:
      'The grid as one machine (the honest note that every generator spins together); the generation census (thermal, hydro, nuclear, the renewables routed to their own book); transmission versus distribution by voltage class; why AC won and where DC returns (HVDC priced honestly with Power Electronics cross-referenced); the frequency discipline; and the one-line diagram as the system\u2019s native language.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grid as One Machine',
      'The Generation Census',
      'AC, DC and the HVDC Honest Note',
      'The One-Line Diagram as Language',
    ],
  },
  {
    number: 2,
    slug: 'per-unit-quantities',
    title: 'Per-Unit Quantities',
    summary:
      'The per-unit idea as the system\u2019s honest arithmetic (why percentages of chosen bases tame every transformer ratio in sight); base conversion and the per-unit selection craft; per-unit networks built; the per-unit impedance of transformers and machines; and the change-of-base arithmetic worked until fluent.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Idea and Its Bases',
      'Base Conversion Worked',
      'The Per-Unit Network Built',
    ],
  },
  {
    number: 3,
    slug: 'transmission-line-modelling',
    title: 'Transmission Line Modelling',
    summary:
      'Line resistance with skin and temperature honesty; inductance from conductor geometry (internal and external flux linkages, the GMR/GMD craft, bundling); capacitance of single and bundled configurations; the nominal pi and T models; and the classification census (short, medium, long) that picks the honest model.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Inductance from Geometry',
      'Capacitance and Bundling',
      'The Nominal Models and Classes',
    ],
  },
  {
    number: 4,
    slug: 'line-performance-and-compensation',
    title: 'Line Performance and Compensation',
    summary:
      'Voltage regulation and efficiency; the long line and its surge-impedance loading (Ferranti priced); power transfer and the power-angle honest note; travelling waves glanced; series and shunt compensation with their purposes priced (GATE\u2019s line); power-factor correction from the system\u2019s side; and the line\u2019s reactive bookkeeping drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Regulation and Efficiency',
      'Ferranti and SIL',
      'Series and Shunt Compensation',
      'The Reactive Bookkeeping',
    ],
  },
  {
    number: 5,
    slug: 'insulators-cables-and-fields',
    title: 'Insulators, Cables and Fields',
    summary:
      'The electric-field distribution around conductors priced; insulator strings (pin, suspension, strain) with string efficiency and grading; corona and its losses (advantages named honestly); underground cables — construction, capacitance and thermal limits; and the insulation doorstep to High Voltage Engineering.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field Around a Conductor',
      'String Efficiency and Grading',
      'Corona Priced Honestly',
      'Cables and Their Thermal Limits',
    ],
  },
  {
    number: 6,
    slug: 'load-flow',
    title: 'The Bus Model and Load Flow',
    summary:
      'The bus-admittance matrix built (with the inspection craft); bus classification (slack, PQ, PV); the Gauss-Seidel iteration read honestly (its slow convergence named); the Newton-Raphson method with the Jacobian structure priced; fast-decoupled named as the industry\u2019s compromise; convergence and the honest handling of reactive limits; and distribution-system load flow glanced (backward/ forward sweep named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Y-Bus Built',
      'Gauss-Seidel, Honestly Slow',
      'Newton-Raphson and the Jacobian',
      'Fast-Decoupled and Distribution Glances',
    ],
  },
  {
    number: 7,
    slug: 'symmetrical-faults-and-breakers',
    title: 'Symmetrical Faults and Circuit Breakers',
    summary:
      'The three-phase fault priced on the Thevenin honest note (fault MVA, the Z-bus route); current-limiting reactors; the circuit breaker\u2019s duty — breaking capacity, RRRV and the arc\u2019s honest physics glanced; breaker ratings and testing cross-referenced to High Voltage Engineering; fuses glanced; and the fault\u2019s duration discipline that protection answers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Fault MVA by Thevenin',
      'The Breaker\u2019s Duty Priced',
      'Arc Physics Glanced Honestly',
      'The Duration Discipline',
    ],
  },
  {
    number: 8,
    slug: 'symmetrical-components-and-faults',
    title: 'Symmetrical Components and Unsymmetrical Faults',
    summary:
      'Fortescue\u2019s symmetrical components earned (the a-operator arithmetic); sequence impedances of the system\u2019s pieces (machines cross-referenced, lines, transformers with their connection honesty); sequence networks assembled; and the unsymmetrical fault census — LG, LL, LLG — each priced on the interconnected sequence networks with the boundary conditions stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Fortescue\u2019s Components Earned',
      'Sequence Impedances Assembled',
      'The LG Fault Priced',
      'The LL and LLG Faults Priced',
    ],
  },
  {
    number: 9,
    slug: 'protection',
    title: 'Protection',
    summary:
      'Why protection exists (the fault\u2019s damage census); the relay idea with its operating characteristic; overcurrent protection (plug setting, time-multiplier, IDMT curves); directional protection; differential protection (the circulating craft that prices transformers and buses); distance protection with the R-X plane and zone settings; instrument transformers (CT/PT) with their honest burden (cross-referenced to Electrical Measurements); and the modern numerical-relay glance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Relay Idea and Its Curves',
      'Directional and Differential Craft',
      'Distance Protection in the R-X Plane',
      'CTs, PTs and Their Honest Burden',
    ],
  },
  {
    number: 10,
    slug: 'stability-and-economics',
    title: 'Stability, Control and Economic Operation',
    summary:
      'The swing equation earned from the machine\u2019s dynamics; the equal-area criterion worked on faults cleared at time t; the critical clearing time priced; steady-state and transient stability distinguished; voltage and frequency control (the governor and excitation honest notes, primary/secondary/tertiary); economic load dispatch — the lambda-iteration craft with losses (the penalty factor honest note); unit commitment glanced; and the power-system synthesis with the doorsteps — High Voltage Engineering, Renewable Energy\u2019s integration, the future smart-grid books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Swing Equation Earned',
      'Equal-Area Worked',
      'Voltage and Frequency Control',
      'Economic Dispatch with Losses',
      'The Synthesis and Doorsteps',
    ],
  },
]

export const powerSystems: Book = {
  id: 'power-systems',
  title: 'Power Systems',
  subtitle: 'Generation to the wall socket — line modelling, load flow, faults, protection and stability',
  discipline: 'engineering',
  level: 'First power systems course → grid-engineering readiness',
  description: 'The grid as one machine: the power-system worldview (generation, transmission, distribution, AC and DC transmission concepts); per-unit quantities as the system\u2019s honest arithmetic; transmission-line modelling — resistance, inductance and capacitance from conductor geometry (bundled conductors), and line performance with series and shunt compensation and power-factor correction; corona, insulators and electric-field distribution, and cables; the bus-admittance matrix and load-flow solutions by Gauss-Seidel and Newton-Raphson (with fast-decoupled named); symmetrical faults and circuit-breaker duty; symmetrical components and unsymmetrical faults (LG, LL, LLG) by sequence networks; the protection census — overcurrent, differential, directional and distance relays with instrument transformers cross-referenced; circuit breakers (arc physics glanced, ratings) and insulation coordination cross-referenced to High Voltage Engineering; voltage and frequency control; economic load dispatch with and without transmission losses; and stability — the swing equation and equal-area criterion with power-system stabilisers named. Cross-references Electrical Machines, Power Electronics (HVDC and FACTS glanced), High Voltage Engineering and hands off to Renewable Energy\u2019s grid integration.',
  status: 'planned',
  accent: ['#0c4a6e', '#082f49'],
  chapters,
}
