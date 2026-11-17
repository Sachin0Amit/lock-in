import type { Book, Chapter } from '../../../types'

/**
 * Embedded Systems — the twenty-seventh book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `emb-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Embedded Systems owns the systems view of compute-in-product. Assembly and Microprocessors (CS shelf) owns the machine-level and microcontroller-fundamental arc (the no-duplication contract stated in both headers); Operating Systems owns the general scheduling and IPC theory; Internet of Things owns the network-of things story; Robotics and Automation owns the robot cell; Control Systems owns the plant-side theory.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Raj Kamal, Embedded Systems: Architecture, Programming and Design — the arc
 *   web-checked this pass (the 8051 and processor chapters; the RTOS chapters 8-12
 *   confirmed via the open-PDF contents and Google Books; the design chapters 6/13/14
 *   confirmed); Barr's Programming Embedded Systems named as the practice pole.
 * - GATE context: no dedicated GATE embedded paper; the EC/EE registers price its
 *   pieces (microcontrollers in the machine lines, the RTOS glance) — this book
 *   serves the university elective and professional pole honestly, cross-referenced
 *   rather than duplicating the CS shelf's homes.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-embedded-idea',
    title: 'The Embedded Idea',
    summary:
      'What \u2019embedded\u2019 honestly means (compute with a product wrapped around it); the constraint census — cost, power, size, timeliness — priced against the desktop\u2019s honest contrast; the category census (small, medium, large, SoC); the development-lab honest note (cross-toolchains, the target-versus-host distinction); and the safety-critical honest note stated early.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Product Wrapped Around Compute',
      'The Constraint Census Priced',
      'Categories and the Lab\u2019s Honest Note',
    ],
  },
  {
    number: 2,
    slug: 'embedded-hardware-design',
    title: 'Embedded Hardware Design',
    summary:
      'Processor selection priced (MCU versus MPU versus DSP — the decision census); the memory map read fluently (flash, SRAM, the peripherals\u2019 registers); the peripheral census — GPIO, timers/PWM, ADC (Analog Electronics\u2019 converter chapters cross-referenced), DMA named; clocking and reset honestly; and the schematic-to-board craft glanced (the EE honest note: decoupling and grounding).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Processor Selection Priced',
      'The Memory Map Read Fluently',
      'The Peripheral Census',
      'Clocking and Reset Honestly',
      'Communication Satellites \u2014 Orbits, Characteristics, Systems, Uses;',
    ],
  },
  {
    number: 3,
    slug: 'real-time-systems',
    title: 'Real-Time Systems',
    summary:
      'Deadline vocabulary (hard, soft, firm — with the honest consequences of each); task models and WCET\u2019s honest difficulty; the schedulability craft — rate-monotonic scheduling with its optimality honest note, EDF priced, priority inversion and the inheritance fix; the CS shelf\u2019s Operating Systems cross-referenced for the general theory (this book owns the embedded idiom).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Deadlines and Their Consequences',
      'RMS and EDF Priced',
      'Priority Inversion Fixed Honestly',
    ],
  },
  {
    number: 4,
    slug: 'the-rtos',
    title: 'The RTOS',
    summary:
      'Why bare-metal gives way (the census of when each is honest); tasks and their states; the kernel services — semaphores and mutexes, queues and mailboxes, event flags; ISR discipline (the deferred-work craft); tick and timing services; and the RTOS census table (the open-source and commercial families priced by their honest niches).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bare-Metal versus RTOS, Honestly',
      'Kernel Services Earned',
      'ISR Discipline',
      'The RTOS Census Table',
    ],
  },
  {
    number: 5,
    slug: 'drivers-and-io',
    title: 'Device Drivers and I/O',
    summary:
      'The driver idea (the hardware\u2019s honest interpreter); interrupt handling practised (the nesting and reentrancy honest notes); timers and their modes; the serial-bus census — UART, SPI and I2C each priced by their wires, speeds and niches; analog I/O routed to the ADC cross-references; and the driver-layering craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Driver as Honest Interpreter',
      'Timers and Their Modes',
      'UART, SPI, I2C Priced',
      'The Layering Craft',
    ],
  },
  {
    number: 6,
    slug: 'embedded-networking',
    title: 'Embedded Networking',
    summary:
      'Why networks live inside products; the field-bus census with CAN priced honestly (its arbitration craft, frames and errors); LIN, Modbus and industrial Ethernet glanced; wireless glanced (BLE, LoRa, the IIoT doorstep); and the gateway pattern (the edge-node and cloud honest map, Internet of Things cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'CAN Priced Honestly',
      'The Field-Bus Census',
      'Wireless and the IIoT Doorstep',
    ],
  },
  {
    number: 7,
    slug: 'low-power-and-reliability',
    title: 'Low-Power and Reliability Design',
    summary:
      'The power budget earned (the sleep-state census, wake sources, the duty-cycle arithmetic); dynamic voltage and frequency in the small (the honest constraints of MCUs); reliability — watchdogs earned, brown-out and reset honesty, the EMC honest note; security glanced (the secure-boot honest note, Cybersecurity cross-referenced); and the product-lifetime census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Power Budget Earned',
      'Watchdogs and Brown-Out Honesty',
      'Security Glanced Honestly',
      'The Product-Lifetime Census',
    ],
  },
  {
    number: 8,
    slug: 'methodology-and-case-studies',
    title: 'Design Methodology and Case Studies',
    summary:
      'Hardware/software co-design priced (the partition craft); simulation and the debugging census (JTAG/SWD, emulators, trace); the build-and-test flow; and the case-study census priced end-to-end — a data logger, a motor controller (Control Systems and Power Electronics cross-referenced), a sensor node — with the doorsteps: Internet of Things, Robotics and Automation, the product-engineering profession.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Co-Design Priced',
      'The Debugging Census',
      'Three Cases Priced End-to-End',
      'The Doorsteps Named',
    ],
  },
]

export const embeddedSystems: Book = {
  id: 'embedded-systems',
  title: 'Embedded Systems',
  subtitle: 'Compute inside the product — real-time systems, drivers and design methodology',
  discipline: 'engineering',
  level: 'First embedded course → IIoT and product-engineering readiness',
  description: 'Compute when the product is the computer: the embedded idea (characteristics, categories and the honest constraints — cost, power, timing); embedded hardware design (processor selection — MCU, MPU, DSP; the memory map; peripheral sets and their configuration; the CS shelf\u2019s Assembly and Microprocessors owns the 8051/8085 and bare-metal foundations, cross-referenced); real-time systems — hard versus soft deadlines, the schedulability craft (RMS and EDF priced) and the CS shelf\u2019s Operating Systems owns the general scheduling theory (cross-referenced); the RTOS — tasks, semaphores, mutexes and priority inversion priced honestly, queues and inter-task communication, ISR discipline; device drivers and I/O — interrupt handling, timers, the serial-bus census (UART, SPI, I2C); embedded networking (CAN and the field-bus census, wireless glanced — the IIoT doorstep); low-power and reliability design (sleep states, watchdogs, brown-out); the design methodology — hardware/software co-design, simulation, debugging and emulation; and case studies priced honestly. Cross-references Assembly and Microprocessors, Operating Systems, Internet of Things and hands off to Robotics and Automation.',
  status: 'planned',
  accent: ['#065f46', '#022c22'],
  chapters,
}
