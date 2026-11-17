import type { Book, Chapter } from '../../../types'

/**
 * VLSI Design — the twenty-sixth book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 58 planned lessons, zero written. Lesson ids will use the `vlsi-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): VLSI Design owns transistor-level digital IC design. Digital Logic Design (CS shelf) owns the gate-level and HDL abstraction below; Electronic Devices and Circuits owns the device physics; the CS shelf’s Computer Organization owns the architecture above; Heat Transfer owns the thermal-removal physics; the GATE EC S5 digital-circuits lines route to Digital Logic Design with this book growing the silicon depth.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Weste & Harris, CMOS VLSI Design: A Circuits and Systems Perspective 4e —
 *   the chapter arc web-checked this pass from the publisher page and the open
 *   front-matter PDF (Introduction; MOS Transistor Theory; CMOS Processing
 *   Technology; the four NEW chapters Delay, Power, Interconnect, Robustness
 *   confirmed as chapters 4-7; then the combinational/sequential design chapters,
 *   Datapath Subsystems, Array Subsystems, Design Methodology and Tools confirmed).
 * - Kang & Leblebici named as the Indian-course pole; Rabaey's Digital Integrated
 *   Circuits named as the second pole.
 * - GATE EC Section 5's 'logic gates and their static CMOS implementations' line
 *   noted — the static-CMOS chapter serves it at silicon depth (Digital Logic
 *   Design serves the abstraction).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-vlsi-worldview',
    title: 'The VLSI Worldview',
    summary:
      'Design abstraction as the discipline\u2019s survival craft (the levels named and priced); Moore\u2019s law stated with its honest economics and its end honestly noted; why CMOS won (the static-power honest note and the leakage\u2019s revenge); the design-flow census (specification to tapeout); and the foundry-fabless industry map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Abstraction as Survival',
      'Moore\u2019s Law, Priced and Ended Honestly',
      'The Design-Flow Census',
      'The Industry Map',
    
      'VLSI design — principles, MUX/ROM/PLA-based design, Moore and Mealy circuit design; pipeline concepts and functions; design for testability, examples',
      'Limiting and Protection Circuits 180 5.1.8 Complementary MOS or CMOS',
      'Problems 865 13.2 The Folded-Cascode CMOS OpAmp',
      'Final Remarks 1057 16.1.2 The CMOS Inverter',
      'Not Matched 1139 18.2.3 CMOS Implementation of SR Flip',
      'Problems 1145 18.2.4 A Simpler CMOS Implementation',
      'Frank Marion Wanless: The Inventor of CMOS',
      'Combinational functions available as ICs',
      'Modulo-n counter: a timing example',
      'Congenital weaknesses of TTL and CMOS',
      'Terms and concepts 622 29.17 Open-circuit and short-circuit tests on a'
    ],
  },
  {
    number: 2,
    slug: 'mos-transistor-theory',
    title: 'MOS Transistor Theory at Design Depth',
    summary:
      'The long-channel I-V earned as the design equation; the C-V characteristics and the MOS capacitances priced; threshold and body effect; the velocity-saturation and short-channel honest notes; leakage mechanisms named (subthreshold, gate); the SPICE-model census glanced; and the design-tool relationship stated honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Long-Channel Design Equation',
      'Capacitances and Body Effect',
      'Short-Channel Honesty',
      'Leakage Named and Priced',
    ],
  },
  {
    number: 3,
    slug: 'cmos-processing',
    title: 'CMOS Processing Technology',
    summary:
      'The fabrication flow learned step by step (wafer, oxidation, implantation and diffusion, deposition, the photolithography engine, etching, metallisation — the twin-tub CMOS story); the layout design rules as the foundry\u2019s grammar (lambda-based); sticks and standard cells; fabrication yield priced honestly; and the process-variation doorstep that the robustness chapter answers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fabrication Flow, Step by Step',
      'Layout Rules as Grammar',
      'Yield Priced Honestly',
      'The Variation Doorstep',
    ],
  },
  {
    number: 4,
    slug: 'delay',
    title: 'Delay',
    summary:
      'The RC delay model earned (the linear-delay craft and Elmore\u2019s method); the logical-effort theory priced as the designer\u2019s compass (the path optimisation arithmetic worked); transient-energy and the step-response census; gate sizing practised until fluent; and the delay-wire honest note that routes into the interconnect chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Elmore\u2019s Method Earned',
      'Logical Effort as Compass',
      'Gate Sizing Practised',
      'The Wire Honest Note',
      'Determining the Step Response of an RC 9.1 Finding the Characteristics of a Sinusoidal'
    ],
  },
  {
    number: 5,
    slug: 'power',
    title: 'Power',
    summary:
      'The power census — dynamic (the activity-factor arithmetic), short-circuit and leakage (the mechanism prices summed); the clock as the biggest consumer (its tree and gating craft); voltage scaling and the energy-versus-delay trade priced; the dark-silicon honest note; and the low-power design census (DVFS, power gating, multi-Vt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Powers Priced',
      'The Clock Tree and Gating',
      'Voltage Scaling\u2019s Trade',
      'The Low-Power Census',
      'Shockley and Silicon Valley'
    ],
  },
  {
    number: 6,
    slug: 'interconnect-and-robustness',
    title: 'Interconnect and Robustness',
    summary:
      'Wire models (the resistance-and-capacitance craft, the inductance honest note); the repeater craft for long wires; crosstalk and the noise bookkeeping; then robustness — noise margins read from the transfer curve, supply and temperature variation, the design-corner census, variability and matching, and the reliability census (electromigration, NBTI named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Wire Models and Repeaters',
      'Crosstalk Bookkept',
      'Design Corners and Matching',
      'The Reliability Census',
      'Output Resistance 904 13.3.5 Output-Stage Design for Near Rail'
    ],
  },
  {
    number: 7,
    slug: 'combinational-design',
    title: 'Combinational Circuit Design',
    summary:
      'Static CMOS gates sized and priced; the skewing craft; alternative logic families priced honestly (pseudo-NMOS, DCVS, pass-transistor) against static CMOS; dynamic logic with its charge-sharing and precharge-evaluate honest risks; domino logic; and the circuit-family census table read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Static CMOS Sized and Priced',
      'Alternatives Priced Honestly',
      'Dynamic Logic\u2019s Honest Risks',
      'The Family Census Table',
    
      'Digital circuits — Boolean algebra and uses; logic gates, digital IC families; combinational and sequential circuits; basics of multiplexers, counters/registers/memories/microprocessors: design and applications',
      'Analyzing an RL Circuit That Has Sequential Techniques'
    ],
  },
  {
    number: 8,
    slug: 'sequential-design',
    title: 'Sequential Circuit Design',
    summary:
      'Latches and flip-flops at transistor level (the transmission-gate and sense-amplifier forms); the clocking-discipline census (two-phase, the no-race honest rules); metastability earned (the MTBF arithmetic) and the synchroniser craft; clock skew priced; and the sequencing-element census table (Digital Logic Design\u2019s flip-flop abstraction cross-referenced below).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Latches and Flip-Flops in Silicon',
      'The Clocking Discipline',
      'Metastability and MTBF',
      'Skew Priced',
      'The Situation When QN and QP Are 18.2.2 The SR Flip-Flop',
      'Summary 1144 Flops'
    ],
  },
  {
    number: 9,
    slug: 'datapath-and-arrays',
    title: 'Datapath and Array Subsystems',
    summary:
      'The datapath census — adders (ripple through carry-lookahead and the prefix families, each priced), multipliers (array and Booth glanced), shifters; the array subsystems — SRAM cells and sense amplifiers, DRAM\u2019s one-transistor honesty, ROM and PLA; the memory-periphery census (decoders, the bitline honest note); and the datapath floorplanning craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Adder Census Priced',
      'Multipliers and Shifters',
      'SRAM, DRAM, ROM Earned',
      'The Periphery Census',
    ],
  },
  {
    number: 10,
    slug: 'methodology-testing-and-doorstep',
    title: 'Design Methodology, Testing and the Doorstep',
    summary:
      'The methodology census — design flows, synthesis, place-and-route, standard-cell and full-custom crafts priced; verification\u2019s honest claim (the levels of the craft); design for testability (scan chains, the ATPG glance, BIST named); the IP and reuse census; and the doorsteps — the CS shelf\u2019s Computer Organization (the architecture above), the silicon specialisations (analog/mixed-signal, RF — the future\u2019s door), Heat Transfer\u2019s thermal wall.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Flows and Crafts Priced',
      'Verification\u2019s Honest Claim',
      'Scan, ATPG, BIST',
      'The Doorsteps: Architecture, Mixed-Signal, Heat',
    ],
  },
]

export const vlsiDesign: Book = {
  id: 'vlsi-design',
  title: 'VLSI Design',
  subtitle: 'CMOS at scale — transistors, wires, circuits and the design methodology of silicon',
  discipline: 'engineering',
  level: 'First VLSI course → digital-IC design readiness',
  description: 'Silicon at scale: the VLSI worldview (design abstraction, Moore\u2019s law honestly priced, why CMOS); MOS transistor theory at design depth — the long-channel I-V, C-V nonidealities, the velocity-saturation and short-channel honest notes (Electronic Devices and Circuits cross-referenced); CMOS processing technology — the fabrication flow (wafer, oxidation, diffusion/implantation, deposition, lithography, metallisation) with layout design rules learned as the foundry\u2019s grammar; the performance core — delay (the RC Elmore craft), power (dynamic, short-circuit, leakage — the clock-tree honesty), interconnect (wire models, the repeater craft) and robustness (noise margins, variability and the design-corner census); combinational circuit design — static CMOS gates, alternative logic families priced, dynamic logic with its honest risks; sequential design — latches and flip-flops at transistor level with the clocking-discipline census (metastability and synchronisers priced); datapath and array subsystems — adders, multipliers, shifters and the memory arrays (SRAM, DRAM, ROM); and design methodology, testing and verification (DFT and the ATPG glance) closing to the specialisation doorstep. Cross-references Digital Logic Design (the gate-level abstraction below), Electronic Devices and Circuits, Heat Transfer (the thermal wall) and hands off to the CS shelf.',
  status: 'planned',
  accent: ['#475569', '#1e293b'],
  chapters,
}
