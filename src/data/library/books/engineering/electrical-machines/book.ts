import type { Book, Chapter } from '../../../types'

/**
 * Electrical Machines — the fourteenth book of the Engineering shelf (Electrical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `emach-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Electrical Machines owns the machine families and the power-transformer depth. Power Electronics owns the converter-fed drive control; Power Systems owns the system’s machines-in-network view; Circuit Theory owns the winding’s circuit model; Electromagnetic Fields and Waves owns the field machinery of torque production (cross-referenced).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 5 'Electrical Machines' (EE_2026_Syllabus.pdf, extracted
 *   this pass): single phase transformer (equivalent circuit, phasor diagram, OC and
 *   SC tests, regulation and efficiency); three-phase transformers (connections,
 *   vector groups, parallel operation); auto-transformer; electromechanical energy
 *   conversion principles; DC machines (separately excited, series and shunt; motoring
 *   and generating; characteristics; speed control); three-phase induction machines
 *   (principle, types, performance, torque-speed, no-load and blocked-rotor tests,
 *   equivalent circuit, starting and speed control); single-phase induction motors;
 *   synchronous machines (cylindrical and salient pole; performance; regulation and
 *   parallel operation of generators; starting of synchronous motors); losses and
 *   efficiency — the entire section is this book's register.
 * - P.S. Bimbhra, Electrical Machinery — the Indian canonical arc web-checked this
 *   pass (the transformers + DC + synchronous + induction organisation confirmed);
 *   Nagrath & Kothari, Electric Machines named as the second pole.
 * - Fitzgerald, Kingsley & Umans named as the depth pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'electromechanical-conversion',
    title: 'Electromechanical Energy Conversion',
    summary:
      'Why electricity moves iron (the field-energy route to force and torque); singly and multiply excited systems; co-energy and the force from it; the energy conversion cycle drawn on the field-energy plane; and the machine census located (translational and rotating, AC and DC) as different solutions to the same energy problem.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Force from Field Energy',
      'Co-Energy and Torque',
      'The Conversion Cycle Drawn',
      'The Machine Census Located',
    ],
  },
  {
    number: 2,
    slug: 'the-single-phase-transformer',
    title: 'The Single-Phase Transformer',
    summary:
      'Construction and the induction principle (Circuit Theory\u2019s mutual- inductance craft cashed); the ideal transformer then the real one — equivalent circuit parameters, phasor diagram; the open-circuit and short-circuit tests as the honest identification engine; voltage regulation and efficiency (all-day efficiency priced); and autotransformers with their apparent-power honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equivalent Circuit Earned',
      'OC and SC Tests as Identification',
      'Regulation and All-Day Efficiency',
      'The Autotransformer\u2019s Honest Note',
    ],
  },
  {
    number: 3,
    slug: 'three-phase-transformers',
    title: 'Three-Phase Transformers',
    summary:
      'Bank versus core construction; the connection census (star, delta, zigzag) with vector groups read honestly (the clock notation learned); parallel operation and its conditions; tap changers and the cooling census glanced; and the three- phase transformer\u2019s role priced in Power Systems\u2019 per-unit world.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Connection Census',
      'Vector Groups by the Clock',
      'Parallel Operation\u2019s Conditions',
      'Tap Changers and Cooling Glanced',
    ],
  },
  {
    number: 4,
    slug: 'dc-machines',
    title: 'DC Machines',
    summary:
      'Construction and the EMF equation; armature winding glimpses; armature reaction and commutation (interpoles and compensating windings as the honest fixes); the separately excited, shunt, series and compound families in motoring and generating with their characteristics; speed control (armature, field, Ward-Leonard named); starters and their necessity; losses and efficiency; and the DC machine\u2019s honest decline named without hiding it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'EMF, Armature Reaction, Commutation',
      'The Family Characteristics',
      'Speed Control and Ward-Leonard',
      'Starters, Losses, the Honest Decline',
    ],
  },
  {
    number: 5,
    slug: 'induction-machines',
    title: 'Three-Phase Induction Machines',
    summary:
      'The rotating magnetic field earned (the winding\u2019s gift); construction (squirrel cage versus slip ring); slip and the frequency honest note; the torque- speed characteristic and torque-slip arithmetic; the equivalent circuit and its parameter identification by the no-load and blocked-rotor tests; power flow and efficiency; starting methods; speed control (pole changing, V/f named and routed to Power Electronics); the double-cage and deep-bar honesty; and the induction machine\u2019s modern dominance named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rotating Field Earned',
      'Slip and Torque Arithmetic',
      'The Equivalent Circuit Identified',
      'Power Flow and Losses',
      'Starting and Speed Control',
    ],
  },
  {
    number: 6,
    slug: 'single-phase-and-special-machines',
    title: 'Single-Phase Induction and Special Machines',
    summary:
      'Why the single-phase motor has no starting torque (the double-revolving- field honest note) and its fixes — split-phase, capacitor start/run, shaded pole; universal motors glanced; and the special census — BLDC, stepper and servo machines with their drives cross-referenced to Power Electronics and Robotics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Double-Revolving-Field Honesty',
      'The Starting Fixes',
      'BLDC, Stepper, Servo Glanced',
    ],
  },
  {
    number: 7,
    slug: 'synchronous-machines',
    title: 'Synchronous Machines',
    summary:
      'Construction (cylindrical versus salient pole); the EMF equation with winding factors; the equivalent circuit and phasors for the round-rotor machine; voltage regulation by the EMF and MMF methods; the synchronous generator on the bus — the power-angle relation and parallel operation (the synchronising craft); the salient-pole two-reaction honest note; synchronous motors — starting and V-curves; and the condenser glance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'EMF and Winding Factors',
      'Regulation by Two Methods',
      'Power-Angle and Parallel Operation',
      'Salient-Pole: the Two-Reaction Note',
      'Synchronous Motors and V-Curves',
    ],
  },
  {
    number: 8,
    slug: 'losses-efficiency-and-doorstep',
    title: 'Losses, Efficiency and the Doorstep',
    summary:
      'The loss census across every family (copper, iron, mechanical, stray); efficiency and its honest testing (indirect routes); the machine-selection compass; and the doorsteps — Power Systems (the generator on the grid), Power Electronics (the converter-fed drive: DC drives and V/f induction control named), Renewable Energy (the generator families the wind and small-hydro chapters route to).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Loss Census Across Families',
      'Efficiency Tested Indirectly',
      'The Doorsteps: Grid, Drive, Renewables',
    ],
  },
]

export const electricalMachines: Book = {
  id: 'electrical-machines',
  title: 'Electrical Machines',
  subtitle: 'Transformers, DC, induction and synchronous machines — electromechanical conversion engineered',
  discipline: 'engineering',
  level: 'First machines course → power systems and drives readiness',
  description: 'The rotating world: electromechanical energy conversion principles (force and torque from fields, singly and multiply excited systems, the field-energy craft); the single-phase transformer — equivalent circuit, phasor diagram, open-circuit and short-circuit tests, regulation and efficiency, all-day efficiency priced; three-phase transformers (connections and vector groups, parallel operation); autotransformers and special transformers; DC machines — construction and EMF, armature reaction and commutation, separately excited, shunt, series and compound machines in motoring and generating with their characteristics, speed control and starters; three-phase induction machines — the rotating field, slip, torque-speed characteristics, the equivalent circuit, no-load and blocked-rotor tests, starting and speed control; single-phase induction motors; synchronous machines — cylindrical and salient-pole, EMF and regulation, parallel operation of generators, synchronous motor starting and V-curves; losses and efficiency across the census; and the special-machines glimpse (BLDC, stepper) closing to the drives doorstep. Cross-references Circuit Theory and Network Analysis (the circuit craft), Power Electronics (the drives) and hands off to Power Systems.',
  status: 'planned',
  accent: ['#b45309', '#92400e'],
  chapters,
}
