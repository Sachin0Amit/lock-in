import type { Book, Chapter } from '../../../types'

/**
 * Computer Organization and Architecture — the third book of the
 * Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 11 chapters /
 * 37 planned lessons, zero written. Lesson ids will use the `coa-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Digital Logic Design hands off at
 * register-level design; this book builds the processor and the memory
 * hierarchy. The OS-side of the machine (processes, scheduling, virtual
 * memory policy) belongs to Operating Systems (cross-reference); the
 * machine-level programming craft belongs to Assembly and
 * Microprocessors. Cybersecurity and Cryptography take the attacks.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Stallings, 'Computer
 *   Organization and Architecture' 11e (cs-08 — performance laws, bus/PCIe,
 *   memory hierarchy, cache design, internal/external memory, I/O incl.
 *   DMA, ISAs, control, parallel organizations) + Bryant & O'Hallaron,
 *   'Computer Systems: A Programmer's Perspective' 3e (cs-09 — the
 *   programmer's view: representations, machine-level programming,
 *   optimization, the memory hierarchy, linking, exceptional flow,
 *   networking, concurrency).
 * - Web-checked 2026-11-15: the GATE CSE Section 3 register (instruction
 *   sets and addressing modes, ALU design, control design, memory and I/O).
 * - Exam types: GATE-style numerical MCQs (cache hit rates, pipeline
 *   speedups, CPI arithmetic) + CS:APP-style labs.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-architects-view',
    title: 'The Architect\u2019s View',
    summary:
      'Organization versus architecture (what a programmer may rely on versus what an engineer builds), structure and function as the two reading lenses, the IAS machine and the stored-program idea inherited from real history, the generation census, and the tour CS:APP gives — a program\u2019s journey from bits to process.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Organization versus Architecture',
      'The IAS Machine: the Stored-Program Ancestor',
      'The Tour: from Bits to a Running Program',
      'The Generations and the Census',
    ],
  },
  {
    number: 2,
    slug: 'performance-and-its-laws',
    title: 'Performance and Its Laws',
    summary:
      'Measuring performance honestly (clock, CPI, MIPS — and why MIPS lies), Amdahl\u2019s law and Little\u2019s law derived and priced on engineered examples, the mean question (arithmetic/weighted/geometric/harmonic), benchmarks and the SPEC discipline, and multicore/GPGPU as the modern performance escape.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Measuring Performance Honestly',
      'Amdahl\u2019s Law and Little\u2019s Law, Derived',
      'Benchmarks and the SPEC Discipline',
    ],
  },
  {
    number: 3,
    slug: 'instruction-set-architectures',
    title: 'Instruction Set Architectures',
    summary:
      'The ISA as the contract: instruction types (data movement, arithmetic, control), operand and addressing modes priced on examples, the register file, RISC versus CISC as an honest census with the reasoning, and the two live stories — the x86 evolution and ARM\u2019s rise — with compiler cooperation named (the Compiler Design cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ISA as a Contract',
      'Addressing Modes Priced on Examples',
      'RISC versus CISC: the Honest Census',
      'The x86 and ARM Stories',
    ],
  },
  {
    number: 4,
    slug: 'datapath-and-control',
    title: 'Datapath and Control',
    summary:
      'Building the machine Digital Logic Design handed over: the single-cycle datapath from the ISA, the control unit hardwired (the logic that commands the datapath), microprogramming as the alternative control discipline, and the ALU\u2019s own design (the arithmetic circuits from DLD re-aimed at word-level operations).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Single-Cycle Datapath',
      'The Hardwired Control Unit',
      'Microprogramming: the Alternative Discipline',
      'The ALU Designed',
    ],
  },
  {
    number: 5,
    slug: 'pipelining',
    title: 'Pipelining',
    summary:
      'The assembly-line idea and its speedup arithmetic, the classic five-stage pipeline, hazards (structural, data, control) and their cures (forwarding, stalls, branch prediction), the honest performance accounting, and the doorstep — superscalar and out-of-order execution named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Assembly Line and Its Arithmetic',
      'Hazards and Their Cures',
      'Branch Prediction',
      'The Doorstep: Superscalar and Out-of-Order',
    ],
  },
  {
    number: 6,
    slug: 'the-memory-hierarchy',
    title: 'The Memory Hierarchy',
    summary:
      'Why memory is a ladder and not a floor: the principle of locality derived from real program behaviour, the multilevel hierarchy and its performance model (the average-access arithmetic priced on worked examples), and the architectural census of the levels from registers to tape.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Locality: the Program\u2019s Habit, Measured',
      'The Multilevel Hierarchy and Its Arithmetic',
      'The Census of Levels',
    ],
  },
  {
    number: 7,
    slug: 'cache-memory',
    title: 'Cache Memory',
    summary:
      'The craft chapter: cache principles and the mapping methods (direct, associative, set-associative — the replacement policies priced on traces), elements of cache design (line size, write policy, multilevel), the honest performance models, and real organizations (Intel x86 and IBM z13 named from the source census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Cache Principles and the Mapping Craft',
      'Replacement Policies Priced on Traces',
      'Elements of Cache Design',
      'Real Organizations: the Intel and IBM Censuses',
    ],
  },
  {
    number: 8,
    slug: 'internal-and-external-memory',
    title: 'Internal and External Memory',
    summary:
      'The semiconductor family (DRAM generations, DDR, eDRAM), error correction (Hamming codes — the parity craft from DLD grown up), flash and the newer nonvolatile solid-state technologies, magnetic disk and RAID (the levels as an honest census), SSDs, optical memory and tape — the storage ladder completed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Semiconductor Memory and Error Correction',
      'Flash and the New Nonvolatile Family',
      'Magnetic Disk and RAID: the Levels Census',
      'SSDs, Optical and Tape',
    ],
  },
  {
    number: 9,
    slug: 'input-output',
    title: 'Input/Output',
    summary:
      'The machine\u2019s hands: external devices and I/O modules, programmed I/O and its polling cost, interrupt-driven I/O (the vectored discipline), direct memory access and its controller, direct cache access named, I/O channels and processors, and the interconnection census — buses, point-to-point, PCIe.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Programmed I/O and the Polling Cost',
      'Interrupt-Driven I/O: the Vectored Discipline',
      'Direct Memory Access',
      'The Interconnection Census: Buses to PCIe',
    ],
  },
  {
    number: 10,
    slug: 'parallel-organizations',
    title: 'Parallel Organizations',
    summary:
      'The architectural endgame: instruction-level parallelism recapped from its doorstep, symmetric multiprocessors and cache coherence, clusters and the warehouse-scale census, GPGPUs and the data-parallel machine, and the honest cross-reference — the algorithm side of parallelism is Parallel Computing\u2019s book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Symmetric Multiprocessors and Coherence',
      'Clusters and the Warehouse-Scale Census',
      'GPGPUs: the Data-Parallel Machine',
    ],
  },
  {
    number: 11,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The whole machine on one page (ISA → datapath → pipeline → hierarchy → I/O → parallel), the craft census (CPI and cache arithmetic, pipeline speedups, hazard analysis at gate-exam level), and the doorsteps: Operating Systems takes the machine as its resource to manage; Compiler Design targets it; Distributed Systems networks many of it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Whole Machine on One Page',
      'The Craft Census',
      'The Doorsteps: the OS, the Compiler, the Network',
    ],
  },
]

export const computerOrganizationArchitecture: Book = {
  id: 'computer-organization-architecture',
  title: 'Computer Organization and Architecture',
  subtitle: 'The machine an engineer builds and a programmer relies on',
  discipline: 'computer-science',
  level: 'First serious computer-organization course → multicore/GPGPU doorstep',
  description:
    'The CS shelf\u2019s machine-theory home, grounded in the Stallings and CS:APP arcs. Organization versus architecture; performance and its laws (Amdahl, Little, the honest means, SPEC); the ISA contract with its addressing modes and the RISC/CISC census; the single-cycle datapath with hardwired control, microprogramming and the ALU designed; pipelining with hazards, forwarding and branch prediction; the memory hierarchy from the locality derivation to the cache-mapping craft (direct/associative/set-associative, replacement policies, real Intel/IBM organizations); internal and external memory — DRAM generations, Hamming error correction, flash, RAID levels, SSDs; the I/O family from polling to interrupts, DMA and PCIe; and parallel organizations — SMP with coherence, clusters, GPGPUs. Hands off from Digital Logic Design at register-level design; hands off to Operating Systems, Compiler Design and Parallel Computing at the machine\u2019s edges.',
  status: 'planned',
  accent: ['#1d4ed8', '#1e3a8a'],
  chapters,
}
