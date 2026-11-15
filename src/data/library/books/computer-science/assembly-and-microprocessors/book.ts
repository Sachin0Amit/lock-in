import type { Book, Chapter } from '../../../types'

/**
 * Assembly and Microprocessors — the fourth book of the Computer Science
 * shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `asm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Computer Organization and
 * Architecture owns the machine theory; this book is the programmer's
 * interface to it (cross-reference both ways). Compiler Design owns the
 * high-level→machine translation story. The embedded census hands off to
 * Internet of Things.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): CS:APP 3e ch. 3
 *   (machine-level programming — registers, instruction formats, operand
 *   specifiers, control flow, procedures and the stack, arrays/structs/
 *   alignment) is the machine-level spine.
 * - Web-checked 2026-11-15: the classic 8085/8086 university arcs
 *   (architecture, instruction sets, timing and interfacing — the
 *   BCA/BTech register-interfacing canon).
 * - Syllabus audit: the standard Indian university microprocessor course
 *   register (8085/8086 + interfacing) and the embedded census.
 * - Exam types: university programming/timing questions (T-states, machine
 *   cycles) + tracing exercises.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-machine-below',
    title: 'The Machine Below',
    summary:
      'Why a language beneath the high-level one exists at all: machine language, assembly and the translation ladder, registers as the machine\u2019s hands and the instruction window, the assembler\u2019s job, and the honest census — when writing assembly is the right tool (CS:APP\u2019s own answer priced on examples).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Translation Ladder',
      'Registers: the Machine\u2019s Hands',
      'When Assembly Is the Right Tool',
    ],
  },
  {
    number: 2,
    slug: 'the-8085-generation',
    title: 'The 8085 Generation',
    summary:
      'The classic 8-bit machine studied whole: the 8085 architecture (bus organization, register set, flags), its instruction set by family (data transfer, arithmetic, logic, branching, stack), timing and machine cycles (T-states priced on traces), and the simple interfacing it supported — the teaching machine of a generation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 8085 Architecture',
      'The 8085 Instruction Set by Family',
      'Timing and Machine Cycles: T-States',
    ],
  },
  {
    number: 3,
    slug: 'the-8086-family',
    title: 'The 8086 Family',
    summary:
      'The 16-bit machine the PC era rode: the 8086 architecture and register set, segmentation as the 16-bit trick that addressed a megabyte (the honest story of its costs), the instruction encoding census, and the beginning of the x86 legacy that Computer Organization and Architecture narrates at the architectural level.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 8086 Architecture',
      'Segmentation: the 16-bit Trick',
      'Instruction Encoding and the x86 Legacy Begins',
    ],
  },
  {
    number: 4,
    slug: 'assembly-language-programming',
    title: 'Assembly Language Programming',
    summary:
      'The craft of writing it: assemblers and their two passes (forward references resolved — the symbol table\u2019s honest mechanics), the addressing modes in living practice (immediate, register, direct, indirect, indexed), directives versus instructions, and macros as the programmer\u2019s lever.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Assemblers and the Two Passes',
      'Addressing Modes in Living Practice',
      'Directives, Macros and the Lever They Give',
    ],
  },
  {
    number: 5,
    slug: 'the-art-of-assembly',
    title: 'The Art of Assembly',
    summary:
      'Real programs at machine level: arithmetic and logic instruction families, control flow and the stack discipline, procedures and calling conventions (the register-respect contract — CS:APP\u2019s x86-64 craft cross-referenced), arrays, structs and memory alignment seen from below, and the machine-level reading of a compiled loop.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Arithmetic and Logic at Machine Level',
      'Control Flow and the Stack Discipline',
      'Procedures and Calling Conventions',
      'Arrays, Structs and Alignment from Below',
    ],
  },
  {
    number: 6,
    slug: 'interrupts-and-the-vector-table',
    title: 'Interrupts and the Vector Table',
    summary:
      'The machine\u2019s attention system: interrupts and the vector table (hardware and software interrupts, the priority discipline), the interrupt cycle traced honestly through the registers, and the service routine as a genre of programming — the mechanism Operating Systems builds its whole world on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Interrupt Cycle Traced',
      'The Vector Table and Priority',
      'Service Routines: a Genre of Programming',
    ],
  },
  {
    number: 7,
    slug: 'interfacing',
    title: 'Interfacing',
    summary:
      'Connecting the world to the chip: memory and I/O interfacing (address decoding — the DLD census re-aimed), interrupt controllers (the 8259 discipline), the peripheral family (the 8255 programmable peripheral interface as the classic; keyboard, display and timer interfacing), and the handshaking question — how two different clocks agree.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Memory and I/O Interfacing: Address Decoding',
      'Interrupt Controllers and the 8259',
      'The 8255 and the Peripheral Family',
      'Handshaking: How Two Clocks Agree',
    ],
  },
  {
    number: 8,
    slug: 'the-microcontroller-era',
    title: 'The Microcontroller Era',
    summary:
      'From microprocessors to microcontrollers — the machine on a chip: the microcontroller census (the 8051 classic and the modern families), peripherals grown inward (ADCs, timers, serial ports), and the embedded programming discipline (bare-metal, no OS beneath) — handing off to Internet of Things as its hardware platform.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Microcontroller Census',
      'Peripherals Grown Inward',
      'Bare-Metal: Programming with No OS Beneath',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The machine-level map (from translation ladder to bare metal on one page), the craft census (traces, T-state arithmetic, addressing-mode identification at exam level), and the doorsteps: Operating Systems above the interrupt system, Compiler Design targeting the machine, Internet of Things on the microcontroller.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Machine-Level Map',
      'The Craft Census',
      'The Doorsteps: the OS Above, the Compiler Beside',
    ],
  },
]

export const assemblyAndMicroprocessors: Book = {
  id: 'assembly-and-microprocessors',
  title: 'Assembly and Microprocessors',
  subtitle: 'The machine from the programmer\u2019s side — registers, instructions, interfacing',
  discipline: 'computer-science',
  level: 'First microprocessor/machine-level course → bare-metal readiness',
  description:
    'The programmer\u2019s interface to the machine the architecture book builds. The translation ladder and when assembly is the right tool; the 8085 generation studied whole (architecture, instruction families, T-state timing); the 8086 family and segmentation — the honest story of the 16-bit trick and the x86 legacy; the craft of assembly programming (two-pass assemblers, addressing modes in practice, macros); the art itself — arithmetic, control flow, calling conventions, arrays/structs/alignment from below (CS:APP\u2019s x86-64 craft cross-referenced); interrupts and the vector table; interfacing — address decoding, the 8259/8255 classic peripherals, handshaking; and the microcontroller era with bare-metal discipline. Cross-references Computer Organization and Architecture (the theory) and hands off to Operating Systems, Compiler Design and Internet of Things.',
  status: 'planned',
  accent: ['#a16207', '#854d0e'],
  chapters,
}
