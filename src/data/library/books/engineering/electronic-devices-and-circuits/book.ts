import type { Book, Chapter } from '../../../types'

/**
 * Electronic Devices and Circuits — the twenty-second book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `edc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Electronic Devices and Circuits owns the device physics and first circuits. Analog Electronics owns the amplifier/op-amp systems story; VLSI Design owns the transistor-level digital craft; Power Electronics owns the high-power device applications; Renewable Energy owns the solar-cell system story; the band-theory physics depth belongs to the future Physics shelf (cross-reference when planned).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EC Section 3 'Electronic Devices' (EC_2026_Syllabus.pdf, extracted
 *   this pass): 'Energy bands in intrinsic and extrinsic semiconductors, equilibrium
 *   carrier concentration, direct and indirect band-gap semiconductors. Carrier
 *   Transport: Diffusion current, drift current, mobility and resistivity,
 *   generation and recombination of carriers, Poisson and continuity equations.
 *   P-N junction, Zener diode, BJT, MOS capacitor, MOSFET, LED, photo diode and
 *   solar cell' — the whole section is this book's register (the GATE EE S9 diode
 *   lines cross-referenced).
 * - Boylestad & Nashelsky, Electronic Devices and Circuit Theory 11e — the TOC read
 *   this pass from the open-PDF contents (Semiconductor Diodes; Diode Applications;
 *   Bipolar Junction Transistors; DC Biasing; Field-Effect Transistors; FET Biasing;
 *   BJT and FET Amplifiers; the op-amp chapters noted as Analog Electronics's route);
 *   Millman & Halkias named as the classic pole; Sedha and Salivahanan named as the
 *   Indian poles.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-semiconductor-substrate',
    title: 'The Semiconductor Substrate',
    summary:
      'The materials census (Ge, Si, GaAs and their honest niches); intrinsic semiconductors and thermal generation; the energy-band picture at engineering depth (the future Physics shelf\u2019s deeper quantum story cross-referenced); doping — donors and acceptors, n and p; equilibrium carrier concentration by the mass- action law; direct versus indirect band-gap and why LEDs are direct (the optoelectronic honest note); and Fermi levels under doping.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Materials Census',
      'Doping and Mass Action',
      'Direct versus Indirect: the LED Note',
      'Fermi Levels Under Doping',
    ],
  },
  {
    number: 2,
    slug: 'carrier-transport',
    title: 'Carrier Transport',
    summary:
      'Drift (mobility, resistivity, the temperature honest notes); diffusion from the concentration gradient; the total-current equation; generation and recombination (the lifetime craft); the continuity equation earned; Poisson\u2019s equation in the semiconductor; and the two equations that junction theory will cash.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Drift: Mobility and Resistivity',
      'Diffusion and the Total Current',
      'Generation, Recombination, Lifetime',
      'Continuity and Poisson, Earned',
    ],
  },
  {
    number: 3,
    slug: 'the-pn-junction',
    title: 'The PN Junction',
    summary:
      'The junction built — the depletion region, contact potential and the energy-band diagram; the diode equation earned from the minority-carrier craft; the forward and reverse honest notes; breakdown — Zener and avalanche distinguished; junction capacitance and its varactor use; the diode\u2019s switching and storage honest note; and the small-signal model priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Depletion Region Earned',
      'The Diode Equation from Carriers',
      'Zener versus Avalanche',
      'Capacitance and the Storage Note',
    ],
  },
  {
    number: 4,
    slug: 'diode-circuits',
    title: 'Diode Circuits',
    summary:
      'The diode\u2019s circuit models (the piecewise-linear craft); half and full- wave rectifiers with filters, ripple and PIV arithmetic; bridge rectifiers; clipping and clamping circuits (the GATE phrasing learned); the Zener regulator priced; and the small-signal diode applications glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rectifiers with Ripple and PIV',
      'Clipping and Clamping',
      'The Zener Regulator Priced',
    ],
  },
  {
    number: 5,
    slug: 'the-bjt',
    title: 'The Bipolar Junction Transistor',
    summary:
      'The BJT\u2019s construction and operating regions (the four honest notes); characteristics in CE, CB and CC; DC biasing — the fixed, self and voltage-divider circuits with the stability craft; the load line and Q-point located; and the bias-stability arithmetic examiners price.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Regions, Honestly',
      'Characteristics and Configurations',
      'Biasing and the Q-Point',
      'The Stability Craft',
    ],
  },
  {
    number: 6,
    slug: 'bjt-amplifiers',
    title: 'BJT Amplifiers',
    summary:
      'The small-signal models (re and hybrid-pi); the three configurations analysed (CE, CB, CC with their gains and impedances priced); the multistage glance routed to Analog Electronics; the frequency response (the coupling and bypass capacitor honest notes, Miller\u2019s effect priced); and the Bode honest note cross-referenced to Circuit Theory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Small-Signal Models Earned',
      'The Three Configurations Priced',
      'Frequency Response and Miller',
    ],
  },
  {
    number: 7,
    slug: 'fets-and-mosfets',
    title: 'Field-Effect Devices: JFET and MOSFET',
    summary:
      'The JFET\u2019s construction and pinch-off craft; its biasing and small-signal model glanced; the MOS capacitor (accumulation, depletion, inversion — the GATE line earned); the MOSFET I-V characteristics (enhancement and depletion; the threshold, linear and saturation regions); the CMOS pair named as the doorway to VLSI Design; and the FET-versus-BJT census priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The JFET\u2019s Pinch-Off Craft',
      'The MOS Capacitor Earned',
      'MOSFET I-V: Three Regions',
      'The CMOS Doorway Named',
    ],
  },
  {
    number: 8,
    slug: 'optoelectronic-and-special-devices',
    title: 'Optoelectronic and Special Devices',
    summary:
      'The LED (its direct-bandgap physics cashed); the photodiode and phototransistor; the solar cell — its I-V curve and fill factor (Renewable Energy\u2019s system story cross-referenced); the tunnel diode\u2019s negative-resistance honest note; the varactor; the thyristor family named (Power Electronics owns their power story); and the display and laser device census glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'LEDs: the Direct Bandgap Cashed',
      'Photodiodes and Solar Cells',
      'Tunnel and Varactor Notes',
      'The Thyristar Family Named',
    ],
  },
  {
    number: 9,
    slug: 'power-supplies-and-doorstep',
    title: 'Power Supplies and the Doorstep',
    summary:
      'The regulated supply built honestly — rectification (cross-referenced), filtering, the linear regulator craft (the dissipation honest note, routing the switched story to Power Electronics\u2019s SMPS chapter); the regulated supply\u2019s figures of merit; the book\u2019s synthesis map; and the doorsteps — Analog Electronics (op-amp systems), VLSI Design (the transistor as a switch), Power Electronics (the device at high power).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Linear Regulator Craft',
      'Figures of Merit Priced',
      'The Synthesis Map',
      'The Doorsteps Named',
    ],
  },
]

export const electronicDevicesAndCircuits: Book = {
  id: 'electronic-devices-and-circuits',
  title: 'Electronic Devices and Circuits',
  subtitle: 'The semiconductor\u2019s devices — bands, junctions, transistors and their first circuits',
  discipline: 'engineering',
  level: 'First devices course → analog-electronics and VLSI readiness',
  description: 'The device discipline: the semiconductor substrate — intrinsic and extrinsic materials, energy bands, equilibrium carrier concentration, direct versus indirect band-gaps; carrier transport — drift and diffusion currents, mobility and resistivity, generation and recombination, the Poisson and continuity equations; the PN junction earned (contact potential, depletion region, bias behaviour, the diode equation, Zener and breakdown); diode circuits — rectifiers, clipping and clamping (the GATE registers\u2019 phrasing); the BJT — construction and characteristics under biasing with DC analysis; BJT amplifiers — the small-signal models, configurations and frequency response (routed to Analog Electronics for the systems story); field-effect devices — the JFET, the MOS capacitor, and the MOSFET I-V characteristics (the VLSI doorway); optoelectronics — the LED, photodiode and solar cell (Renewable Energy cross-referenced); special devices — tunnel, varactor and the thyristor family (Power Electronics cross-referenced); and the power-supply craft (filtered and regulated) closing the book. Cross-references Electromagnetic Fields and Waves (the band-theory physics honestly routed), Analog Electronics, VLSI Design, Power Electronics and the future Physics shelf.',
  status: 'planned',
  accent: ['#1d4ed8', '#1e3a8a'],
  chapters,
}
