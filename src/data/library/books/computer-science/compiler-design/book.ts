import type { Book, Chapter } from '../../../types'

/**
 * Compiler Design — the eighth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `cd-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Theory of Computation owns the
 * grammar/automata mathematics (this book is the engineering application —
 * the LL/LR machinery rides the theory, cross-referenced); Programming
 * Languages and Paradigms owns the language concepts compilers serve.
 * Run-time environments hand off to Operating Systems.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Aho, Lam, Sethi, Ullman,
 *   'Compilers: Principles, Techniques and Tools' 2e (cs-03, the dragon
 *   book — full chapter-level TOC extracted: the simple translator,
 *   lexical analysis incl. Lex and finite automata, syntax analysis incl.
 *   the LR family, syntax-directed translation, intermediate code
 *   generation, run-time environments, code generation and the
 *   optimization chapters).
 * - Web-checked 2026-11-15: GATE CSE Section 7 'Compiler Design' —
 *   lexical analysis, parsing, SDT, runtime environments, optimization —
 *   the chapters 2-8 roster exactly.
 * - Exam types: GATE MCQ (FIRST/FOLLOW, LR items, register allocation,
 *   liveness) + dragon-book problem sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-compilers-job',
    title: 'The Compiler\u2019s Job',
    summary:
      'The structure of a compiler as a pipeline of honest phases (lexical, syntax, semantic, intermediate, optimization, code generation — each named with its contract), language processors as the census (compilers, interpreters, the hybrid), why the science of building one is real (the analysis/synthesis split), and the applications echo beyond compilers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pipeline: Phases and Their Contracts',
      'The Processor Census: Compile versus Interpret (the language-translator family — assembler, compiler, interpreter)',
      'The Science of Building One',
    ],
  },
  {
    number: 2,
    slug: 'lexical-analysis',
    title: 'Lexical Analysis',
    summary:
      'The reader of words: tokens specified as regular expressions (the Theory of Computation cross-reference made explicit), input buffering, recognition via finite automata (RE to automata to DFA — the optimization that makes lexers fast), and the scanner-generator discipline (Lex\u2019s pattern-action craft generalized).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Tokens Specified as Regular Expressions',
      'Recognition: from Regexes to DFAs',
      'The Scanner-Generator Discipline',
    ],
  },
  {
    number: 3,
    slug: 'syntax-analysis',
    title: 'Syntax Analysis',
    summary:
      'The reader of sentences: context-free grammars and parse trees, top-down parsing (recursive descent, LL(1) with FIRST/FOLLOW computed), bottom-up parsing (shift-reduce, the LR family — SLR, canonical LR, LALR with the item-set craft), ambiguous grammars\u2019 honest uses, and parser generators.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Context-Free Grammars and Parse Trees',
      'Top-Down: LL with FIRST and FOLLOW',
      'Bottom-Up: the LR Family and Item Sets',
      'Parser Generators',
    ],
  },
  {
    number: 4,
    slug: 'syntax-directed-translation',
    title: 'Syntax-Directed Translation',
    summary:
      'The compiler\u2019s middle voice: syntax-directed definitions (attributes on grammar symbols), evaluation orders (the dependency graph\u2019s discipline — S-attributed and L-attributed), translation schemes, and the simple translator itself — from expressions to three-address code, the chapter-2 arc done whole.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Syntax-Directed Definitions and Attributes',
      'Evaluation Orders and the Dependency Graph',
      'The Simple Translator, Done Whole',
    ],
  },
  {
    number: 5,
    slug: 'semantic-analysis',
    title: 'Semantic Analysis',
    summary:
      'The meaning-keeper: symbol tables and scopes (the block discipline), type checking as the honest contract (type expressions, equivalences, conversions/coercion priced), intermediate representations (three-address code, syntax trees, quadruples and triples), and backpatching for the control flow of short-circuit languages.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Symbol Tables and the Scope Discipline',
      'Type Checking: the Honest Contract',
      'Intermediate Representations',
      'Backpatching Control Flow',
    ],
  },
  {
    number: 6,
    slug: 'run-time-environments',
    title: 'Run-Time Environments',
    summary:
      'The program\u2019s world at execution: activation records and the call/return discipline (the stack of frames traced), storage organization (static, stack, heap — the ownership census), parameter-passing mechanisms priced, and garbage collection\u2019s family census (mark-and-sweep, copying, generational — named honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Activation Records Traced',
      'The Storage Census: Static, Stack, Heap',
      'Parameter Passing Priced',
      'Garbage Collection: the Family Census',
    ],
  },
  {
    number: 7,
    slug: 'code-generation',
    title: 'Code Generation',
    summary:
      'The final translation: instruction selection and the target-machine contract (the RISC/CISC census from Computer Organization cross-referenced), register allocation as the classical craft (the interference graph, graph coloring and spilling — the honest NP echo), instruction scheduling named, and the basic-block/profiling discipline.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Instruction Selection',
      'Register Allocation and Graph Coloring',
      'Scheduling and the Basic Block',
    ],
  },
  {
    number: 8,
    slug: 'optimization',
    title: 'Optimization',
    summary:
      'Making it faster without lying: the flow graph and data-flow analysis frameworks (reaching definitions, liveness — the lattice craft), local optimization and DAGs, loop optimization (code motion, induction variables, strength reduction), the machine-independent/machine-dependent boundary, and instruction-level parallelism named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Data-Flow Analysis: the Framework',
      'Local Optimization and DAGs',
      'Loop Optimization',
      'Instruction-Level Parallelism, Named',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The compiler on one page (source → tokens → tree → IR → flow → target, with the phases\u2019 contracts beside), the craft census (FIRST/FOLLOW computations, LR item sets, liveness at gate-exam level), and the doorsteps — Programming Languages\u2019 concepts on one side, Operating Systems\u2019 run-time partnership on the other.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Compiler on One Page',
      'The Craft Census',
      'The Doorsteps: Languages and Runtimes',
    ],
  },
]

export const compilerDesign: Book = {
  id: 'compiler-design',
  title: 'Compiler Design',
  subtitle: 'From characters to target code — the translation pipeline done honestly',
  discipline: 'computer-science',
  level: 'First compiler course → the optimization doorstep',
  description:
    'The dragon-book arc on the shelf. The compiler pipeline and its phase contracts; lexical analysis — tokens as regular expressions with the regex→automaton→DFA machinery that Theory of Computation theorizes; syntax analysis — LL with FIRST/FOLLOW and the LR family\u2019s item-set craft; syntax-directed translation with attribute grammars and evaluation orders; semantic analysis — symbol tables, type checking, three-address representations, backpatching; run-time environments — activation records traced, the storage census, parameter passing and garbage collection\u2019s family; code generation — instruction selection and register allocation as graph coloring with its honest NP echo; optimization — data-flow frameworks, DAGs and loop optimization. Cross-references Theory of Computation (the grammar/automata theory) and Programming Languages (the concepts served); hands off to Operating Systems at the run-time partnership.',
  status: 'planned',
  accent: ['#9333ea', '#6b21a8'],
  chapters,
}
