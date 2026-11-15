import type { Book, Chapter } from '../../../types'

/**
 * Digital Logic Design — the second book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `dld-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): this book absorbs the backlog's
 * 'Digital Electronics' and 'Boolean Algebra and Logic Gates' lines — one
 * Mano arc, honestly merged (recorded in SUBJECT_BACKLOG.md). The
 * proof-theory side of logic belongs to Mathematical Logic on the
 * Mathematics shelf (cross-reference); number systems theory to Arithmetic
 * and Number Systems. It hands off to Computer Organization and
 * Architecture at register-level design.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): M. Morris Mano, 'Digital
 *   Logic and Computer Design' (cs-14, full chapter-level TOC extracted —
 *   binary systems, Boolean algebra and logic gates, simplification incl.
 *   the map and tabulation methods, combinational design, MSI/LSI blocks,
 *   sequential logic, registers/counters/memory). A second identical Mano
 *   copy on the Drive was skipped as a same-arc duplicate (honest note).
 * - Web-checked 2026-11-15: the standard university DLD course arcs
 *   (asynchronous circuits, HDL/FPGA modern chapters).
 * - Syllabus audit: GATE CSE Section 2 'Digital Logic' — number
 *   representation, combinational and sequential circuits, minimization,
 *   the exact topics of chapters 2-7 here.
 * - Exam types: gate-style numerical MCQs (K-map groupings, counters,
 *   timing) + university problem sets.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the GATE S2 + UGC NET Unit 2 lines audited — three planned lessons added (floating-point representation, error detection with parity/Hamming, the multiplication-and-division shift discipline). The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'binary-systems',
    title: 'Binary Systems',
    summary:
      'The digital idea: why two levels price better than ten. Binary numbers and base conversions (the honest craft, cross-referenced to Arithmetic and Number Systems), octal and hexadecimal as compression of binary, complements and signed representation with fixed-point pricing, floating-point representation (the fraction and the exponent — the IEEE 754 guard bits cross-referenced to Computer Organization and Architecture\u2019s arithmetic chapter), binary codes (BCD, Gray, excess-3), error detection and correction codes (parity and the Hamming distance priced — COA grows it onto memory), and storage registers — the medium the whole shelf is written in.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Digital Idea: Why Two Levels',
      'Number Base Conversions: the Honest Craft',
      'Complements and Signed Representation',
      'Floating-Point: the Fraction and the Exponent',
      'Error Detection and Correction: Parity, Hamming',
      'Binary Codes and Storage Registers',
    ],
  },
  {
    number: 2,
    slug: 'boolean-algebra-and-logic-gates',
    title: 'Boolean Algebra and Logic Gates',
    summary:
      'Switching algebra from the axioms (Huntington\u2019s postulates priced on example circuits), the basic theorems and the duality craft, Boolean functions and their truth tables, canonical and standard forms (minterms and maxterms — the exact vocabulary the Minimization chapter weaponizes), the gate census from AND/OR/NOT to XOR, and the IC families\u2019 real-world behaviour.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Axioms of Boolean Algebra',
      'Theorems and the Duality Craft',
      'Canonical and Standard Forms',
      'The Gate Census and the IC Families',
    ],
  },
  {
    number: 3,
    slug: 'simplification',
    title: 'Simplification of Boolean Functions',
    summary:
      'The map method (Karnaugh maps) from two variables to six, groupings and the prime-implicant reading, product-of-sums simplification, two-level NAND and NOR implementations, don\u2019t-care conditions as honest engineering freedom, and the tabulation (Quine-McCluskey) method — the algorithm K-maps visualize.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map Method: Two and Three Variables',
      'Four-Variable Maps and Beyond',
      'NAND and NOR Implementation',
      'Don\u2019t-Cares and the Tabulation Method',
    ],
  },
  {
    number: 4,
    slug: 'combinational-design',
    title: 'Combinational Design',
    summary:
      'The design procedure as a discipline (specification → truth table → simplification → circuit), the arithmetic engine: half and full adders, subtractors and the borrow cascade, the multiplication and division algorithms at gate level (the shift-and-add discipline, Booth\u2019s signed reading — COA prices the architectural view), code converters, multilevel NAND/NOR circuits, and exclusive-OR and equivalence functions — the first circuits that genuinely compute.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Design Procedure as a Discipline',
      'Adders and Subtractors',
      'Multiplication and Division: the Shift-and-Add Discipline',
      'Code Converters and Multilevel Circuits',
      'Exclusive-OR and Equivalence Functions',
    ],
  },
  {
    number: 5,
    slug: 'msi-and-lsi-blocks',
    title: 'Combinational MSI and LSI Blocks',
    summary:
      'The medium-scale blocks real machines are built from: decoders and encoders (and the demux reading), multiplexers as data selectors (plus the Mux-realizes-any-function trick), magnitude comparators, binary parallel and decimal adders, and the programmable read-only memories — ROM and PLA as logic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Decoders and Encoders',
      'Multiplexers: the Data Selector',
      'Magnitude Comparators and Decimal Adders',
      'ROM and PLA: Logic as Memory',
    ],
  },
  {
    number: 6,
    slug: 'sequential-logic',
    title: 'Sequential Logic',
    summary:
      'Circuits that remember: flip-flops (SR, JK, D, T) and their triggering (edge versus level, the race problem), analysis of clocked sequential circuits (state tables and diagrams), state reduction and assignment, excitation tables, and the design procedure for counters — the craft that lifts machines from calculators to state-keepers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Flip-Flops and Their Triggering',
      'Analysis of Clocked Sequential Circuits',
      'State Reduction and Assignment',
      'The Counter Design Procedure',
    ],
  },
  {
    number: 7,
    slug: 'registers-counters-memory',
    title: 'Registers, Counters and the Memory Unit',
    summary:
      'The register family (shift registers, universal registers, the ripple-versus-synchronous counter census and their timing), the memory unit at logic level (RAM cells, memory arrays, read/write cycles), and the register-transfer language that describes machines moving data — the doorstep to Computer Organization and Architecture.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Register Family and Shift Registers',
      'Counters: Ripple versus Synchronous',
      'The Memory Unit at Logic Level',
      'Register-Transfer: the Machine Language of Design',
    ],
  },
  {
    number: 8,
    slug: 'asynchronous-circuits',
    title: 'Asynchronous and Pulse-Mode Circuits',
    summary:
      'Designing without the clock: asynchronous circuits and their timing hazards (races and the essential hazard census), analysis of asynchronous fundamental-mode circuits, pulse-mode design, and the honest engineering trade — why the synchronous discipline won, and where asynchronous still earns its keep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Designing Without the Clock',
      'Races and the Essential Hazards',
      'Analysis of Fundamental-Mode Circuits',
    ],
  },
  {
    number: 9,
    slug: 'programmable-and-modern-logic',
    title: 'Programmable and Modern Logic',
    summary:
      'The modern arc the classic chapters door into: hardware description languages (Verilog/VHDL structure and the RTL idea), the programmable ladder from PLA/PAL to CPLD and FPGA (the look-up-table idea), the synthesis flow, and a census of how real digital products are built today — with the logic-verification craft named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Hardware Description Languages: the RTL Idea',
      'From PLA to FPGA: the Programmable Ladder',
      'The Synthesis Flow and Verification Craft',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the whole map from axiom to register-transfer (one page from Huntington\u2019s postulates to a data path), the craft census (K-map groupings, counter design, timing analysis at gate-exam level), and the doorstep — Computer Organization and Architecture takes the register-level machine and builds the processor; Theory of Computation asks what such machines can never do.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map: from Axioms to Data Paths',
      'The Craft Census',
      'The Doorstep: Register-Level Machines',
    ],
  },
]

export const digitalLogicDesign: Book = {
  id: 'digital-logic-design',
  title: 'Digital Logic Design',
  subtitle: 'From switching algebra to machines that remember — the gates under everything',
  discipline: 'computer-science',
  level: 'First serious digital-electronics course → register-level design readiness',
  description:
    'The book that absorbs the Digital Electronics and Boolean Algebra/Logic Gates arcs into one Mano-grounded shelf home. Binary systems and codes; Boolean algebra from the axioms through duality to canonical forms; simplification as a craft — Karnaugh maps to six variables, NAND/NOR implementation, don\u2019t-cares, and the Quine-McCluskey tabulation method; combinational design with adders, subtractors, converters, XOR and equivalence; the MSI/LSI block census — decoders, multiplexers, comparators, ROM and PLA as logic; sequential logic — flip-flops, state analysis and reduction, counter design; registers, the memory unit and register-transfer; asynchronous circuits with their races and hazards honestly priced; the modern programmable ladder to HDLs and FPGAs. Cross-references Arithmetic and Number Systems (number theory), Mathematical Logic (proof theory) and hands off to Computer Organization and Architecture at register-level design.',
  status: 'planned',
  accent: ['#b91c1c', '#7f1d1d'],
  chapters,
}
