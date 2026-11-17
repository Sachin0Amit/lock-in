import type { Book, Chapter } from '../../../types'

/**
 * Power Electronics — the seventeenth book of the Engineering shelf (Electrical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `pe-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Power Electronics owns the switched-processing of power. Electrical Machines owns the machines the drives feed; Renewable Energy owns the generation-integration problem (its inverters route here); Power Systems owns the grid the converters connect to (HVDC/FACTS cross-referenced); Electronic Devices and Circuits owns the device physics; the CS shelf owns nothing here — the boundary is clean.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 10 'Power Electronics' (EE_2026_Syllabus.pdf, extracted
 *   this pass): 'Static V-I characteristics and firing/gating circuits for Thyristor,
 *   MOSFET, IGBT; DC to DC conversion: Buck, Boost and Buck-Boost Converters; Single
 *   and three-phase configuration of uncontrolled rectifiers; Voltage and Current
 *   commutated Thyristor based converters; Bidirectional ac to dc voltage source
 *   converters; Magnitude and Phase of line current harmonics for uncontrolled and
 *   thyristor based converters; Power factor and Distortion Factor of AC to DC
 *   converters; Single-phase and three-phase voltage and current source inverters,
 *   sinusoidal pulse width modulation' — the entire section is this book's register.
 * - Rashid, Power Electronics: Circuits, Devices and Applications — the chapter arc
 *   web-checked this pass (the device chapters, rectifiers, choppers, inverters,
 *   application chapters); Bimbhra's Power Electronics named as the Indian pole.
 * - Mohan, Undeland & Robbins named as the depth pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-switched-idea',
    title: 'The Power-Electronics Idea',
    summary:
      'Why power is processed by switches (the linear-regulator honest note: efficiency priced); the converter census — AC-DC, DC-AC, DC-DC, AC-AC located on one map; the switching-frequency trade-off stated; and the control-vs-power honest split that defines the field.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Switching Priced Against Linear',
      'The Converter Census on One Map',
      'The Frequency Trade-Off',
    
      'Drives — basic concepts of adjustable speed DC and AC drives; DC-DC switched mode converters; DC-AC switched mode converters; resonant converters; high frequency inductors and transformers; power supplies',
      'Advanced Electronics Topics'
    ],
  },
  {
    number: 2,
    slug: 'power-semiconductor-devices',
    title: 'Power Semiconductor Devices',
    summary:
      'The power diode (fast and slow recovery); the thyristor — static V-I characteristics, latching and holding, turn-on craft and firing/gating circuits, turn-off honest note (the commutation problem stated); the power MOSFET and the IGBT with their niches priced by voltage and frequency; device ratings and SOA glanced; and the wide-bandgap future named (SiC, GaN).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thyristor: Latching and Firing',
      'MOSFET and IGBT Niches Priced',
      'Ratings and the Wide-Bandgap Future',
    ],
  },
  {
    number: 3,
    slug: 'line-frequency-rectifiers',
    title: 'Line-Frequency Diode Rectifiers',
    summary:
      'Single-phase half and full bridges with their PIV and ripple honest notes; three-phase rectifiers (half, full six-pulse) with the six-pulse ripple arithmetic; performance parameters (form factor, ripple factor, TUF, efficiency); capacitor-filter consequences priced; and the harmonic injection honest note that Power Systems\u2019 grid side inherits.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Single-Phase Bridges',
      'The Six-Pulse Arithmetic',
      'Performance Parameters',
      'Filters and the Harmonic Note',
    ],
  },
  {
    number: 4,
    slug: 'thyristor-converters',
    title: 'Thyristor Converters',
    summary:
      'Single-phase fully controlled rectifiers with firing-angle control (the RLE load with motoring and inversion honest notes); three-phase fully controlled converters; half-controlled bridges glanced; commutation — voltage and current commutated thyristor circuits priced (GATE\u2019s exact register); line-current harmonics — magnitude and phase for uncontrolled and thyristor converters; and the power-factor and distortion-factor arithmetic that prices every AC-DC converter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Firing-Angle Control and Inversion',
      'Three-Phase Controlled Bridges',
      'Voltage and Current Commutation',
      'Harmonics, Power Factor, Distortion Factor',
    ],
  },
  {
    number: 5,
    slug: 'dc-dc-converters',
    title: 'DC-DC Converters',
    summary:
      'The chopper idea; buck converter analysed in continuous conduction (the volt-second balance engine), its discontinuous honesty noted; boost and buck-boost by the same engine; the Cuk and SEPIC glanced; non-isolated versus isolated (the flyback/forward honest notes); and the modern SMPS census priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Volt-Second Engine',
      'Buck, Boost, Buck-Boost',
      'Discontinuous Conduction Honesty',
      'Isolated Census and SMPS',
    ],
  },
  {
    number: 6,
    slug: 'inverters',
    title: 'Inverters',
    summary:
      'Single-phase voltage-source inverters (square, quasi-square, the harmonic census); three-phase VSIs (180 and 120-degree modes); sinusoidal PWM — the triangulation craft with modulation index and the harmonic suppression arithmetic; current-source inverters priced against VSI; resonant inverters glanced; and the drive and UPS applications cross-referenced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Single-Phase VSIs',
      'Three-Phase Modes',
      'Sinusoidal PWM Earned',
      'CSI and Applications',
    ],
  },
  {
    number: 7,
    slug: 'ac-controllers-and-drives',
    title: 'AC Controllers, Drives and Applications',
    summary:
      'AC voltage controllers (phase control with the load honesty); cycloconverters glanced; then the drives census — DC motor drives (single and dual converters with the four-quadrant map); induction motor control (V/f with the flux honest note, slip-energy recovery named, vector control glanced and routed); synchronous and BLDC drive glimpses; and UPS topologies priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'AC Voltage Controllers',
      'Four-Quadrant DC Drives',
      'V/f and the Flux Honesty',
      'UPS Topologies Priced',
    ],
  },
  {
    number: 8,
    slug: 'protection-and-synthesis',
    title: 'Device Protection, Gate Drives and the Synthesis',
    summary:
      'Snubber circuits priced (the dv/dt and di/dt honest notes); gate-drive craft (isolation, the MOSFET/IGBT drive census); thermal design (the junction arithmetic cross-referenced to Heat Transfer); series and parallel device operation glanced; and the synthesis map with the doorsteps — Renewable Energy\u2019s inverters and MPPT, Power Systems\u2019 HVDC/FACTS, the motor-drive future.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Snubbers Priced',
      'Gate Drives and Isolation',
      'The Thermal Arithmetic',
      'The Doorsteps: Solar, Grid, Drives',
    
      'Computer Fundamentals — number systems, Boolean algebra, arithmetic functions; basic architecture, central processing unit, I/O and memory organisation; peripheral devices; data representation and programming; basics of operating system and networking; virtual memory, file systems; elements of'
    ],
  },
]

export const powerElectronics: Book = {
  id: 'power-electronics',
  title: 'Power Electronics',
  subtitle: 'Power processed by switches — devices, converters, drives and their honest arithmetic',
  discipline: 'engineering',
  level: 'First power electronics course → converter and drives readiness',
  description: 'Power as a switched quantity: the power-electronics idea (efficiency through switching, the converter census); power semiconductor devices — the power diode, thyristor (static V-I and firing circuits), power MOSFET and IGBT, each with its honest niche; line-frequency diode rectifiers (single and three-phase, uncontrolled) with performance parameters and their harmonic honest note; thyristor converters — the controlled rectifier family with voltage and current commutation, the magnitude and phase of line-current harmonics and the power-factor and distortion-factor arithmetic GATE prices; bidirectional AC-DC voltage-source converters named; DC-DC conversion — buck, boost and buck-boost converters analysed in continuous conduction with their discontinuous honesty; inverters — single and three-phase voltage and current source, with sinusoidal PWM; AC voltage controllers and cycloconverters glanced; the application census — DC and AC drives (cross-referenced to Electrical Machines), UPS and switched-mode supplies; device protection and gate-drive craft; and the synthesis with the modern doorstep (wide-bandgap devices named). Cross-references Circuit Theory, Electrical Machines, Control Systems and hands off to Renewable Energy\u2019s inverters.',
  status: 'planned',
  accent: ['#c2410c', '#7c2d12'],
  chapters,
}
