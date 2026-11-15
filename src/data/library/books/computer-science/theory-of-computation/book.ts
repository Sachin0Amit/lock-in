import type { Book, Chapter } from '../../../types'

/**
 * Theory of Computation — the seventh book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 10 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `toc-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): this book absorbs the backlog's
 * 'Automata' and 'Formal Languages & Grammars' lines — one Sipser arc,
 * honestly merged (recorded in SUBJECT_BACKLOG.md); the grammar/parsing
 * APPLICATION belongs to Compiler Design (cross-reference). Discrete
 * Mathematics (Rosen) owns the mathematical toolkit as coursework —
 * Sipser ch. 0 recapitulates it; Cryptography's one-way functions ride
 * the hardness census here.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Sipser, 'Introduction to the
 *   Theory of Computation' 3e (cs-23) — the ONLY scanned CS source: front
 *   pages rendered at 120 dpi and vision-transcribed in TWO batches
 *   (cs-23 + cs-23b) because the first six pages ended at chapter 0; the
 *   complete TOC (chapters 0-10 with all sections) is recorded in the
 *   survey.
 * - Web-checked 2026-11-15: GATE CSE Section 6 (regular expressions,
 *   CFLs, PDAs, TMs, decidability, NP-completeness) — the chapters 2-9
 *   roster exactly.
 * - Exam types: GATE MCQ (closure properties, pumping lemma
 *   applications, TM/decidability, NP reductions) + Sipser problem sets.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 8 + IOI syllabus lines
 *   audited against this plan — three planned lessons added (BNF notation,
 *   Post\u2019s Correspondence + Rice, the diagonal argument). Routing/verdict
 *   record: docs/research/CS_EXAM_TOPIC_LEDGER.md; standing gate:
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-three-questions',
    title: 'The Three Questions',
    summary:
      'The book\u2019s own map — automata, computability and complexity as three answers to what machines can do, when they can never, and what they can only do slowly; Sipser\u2019s chapter-0 toolkit recapitulated honestly (sets, functions and relations, graphs, strings and languages, Boolean logic — cross-referenced to Discrete Mathematics), and the proof census: construction, contradiction, induction.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Automata, Computability, Complexity: the Map',
      'The Toolkit: Sets, Languages, Logic',
      'The Proof Census: Construction, Contradiction, Induction',
    ],
  },
  {
    number: 2,
    slug: 'finite-automata',
    title: 'Finite Automata',
    summary:
      'The memoryless reader: finite automata from a diagram to the formal definition (states, alphabet, transition function — the 5-tuple priced on examples), the designing craft, and computation defined formally; the regular operations (union, concatenation, star) with the closure theorem stated and its proof architecture shown.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Memoryless Reader: Formal Definition',
      'The Designing Craft',
      'The Regular Operations and Closure',
    ],
  },
  {
    number: 3,
    slug: 'nondeterminism-and-regular-expressions',
    title: 'Nondeterminism and Regular Expressions',
    summary:
      'Nondeterminism as a genuine design tool (the NFA\u2019s parallel lives priced on examples), the formal definition, the equivalence theorem — every NFA converts to an equivalent DFA (the subset construction PROVED with its exponential honesty), and regular expressions with the Kleene theorem: RE ≡ FA.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Nondeterminism: the Parallel Lives',
      'NFA to DFA: the Subset Construction',
      'Regular Expressions and the Kleene Theorem',
    ],
  },
  {
    number: 4,
    slug: 'the-regular-boundary',
    title: 'The Regular Boundary',
    summary:
      'Where regularity ends: the pumping lemma for regular languages PROVED and weaponized (the nonregularity census — a^n b^n and friends), closure properties as a non-provability tool, Myhill-Nerode named as the deeper boundary, and the honest engineering echo — these limits are exactly what lexers respect.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pumping Lemma, Proved and Weaponised',
      'The Nonregularity Census',
      'Myhill-Nerode, Named: the Deeper Boundary',
    ],
  },
  {
    number: 5,
    slug: 'context-free-languages',
    title: 'Context-Free Languages',
    summary:
      'The structure-bearing family: context-free grammars from the formal definition to the designing craft, ambiguity as an honest disease with Chomsky normal form as its discipline, pushdown automata (the stack earns its keep — definition, examples, the CFG equivalence theorem), and the CFL pumping lemma with its boundary.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Context-Free Grammars: Definition and Craft',
      'Grammars in Backus-Naur Form (BNF)',
      'Ambiguity and Chomsky Normal Form',
      'Pushdown Automata and the Equivalence',
      'The CFL Pumping Lemma and Its Boundary',
    ],
  },
  {
    number: 6,
    slug: 'the-church-turing-thesis',
    title: 'The Church-Turing Thesis',
    summary:
      'The definition of algorithm made precise: Turing machines from the diagram to the formal definition (the state diagram read as a program), variants (multitape, nondeterministic, the multi-dimensional census — every variant PROVED equivalent), the thesis itself stated with its honest philosophical standing, and decidability\u2019s first census of decidable languages.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Turing Machines: Definition as Program',
      'The Variants and Their Equivalences',
      'The Thesis Stated Honestly',
      'Decidable Languages: the First Census',
    ],
  },
  {
    number: 7,
    slug: 'the-undecidable',
    title: 'The Undecidable',
    summary:
      'The halting problem PROVED undecidable (diagonalization as the engine — the book\u2019s most-earned theorem), reducibility as the propagation discipline (one undecidable problem birthing the census — from language theory\u2019s emptiness question to the simple undecidable problem), mapping reducibility defined with its honest usage rules, and the named companions of every course — the Post Correspondence Problem traced undecidable and Rice\u2019s theorem (what syntax can never say about semantics), with the tractable-versus-intractable boundary named for the complexity chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Halting Problem, Proved',
      'Reducibility: the Propagation Discipline',
      'Post\u2019s Correspondence Problem and Rice\u2019s Theorem',
      'Mapping Reducibility Defined',
    ],
  },
  {
    number: 8,
    slug: 'advanced-computability',
    title: 'Advanced Computability',
    summary:
      'The strange deeps: the diagonal argument in its own right (Cantor\u2019s cardinality cage — the uncountable reals priced, Russell\u2019s paradox named as Set Theory\u2019s own wound — cross-referenced), the recursion theorem (a program that knows itself — stated with its astonishing content priced honestly), Turing reducibility versus mapping reducibility, and a definition of information (Kolmogorov complexity named with its own undecidability) — the frontier census of what computation cannot see about itself.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Diagonal Argument: Cantor\u2019s Cage and Russell\u2019s Wound',
      'The Recursion Theorem: Programs That Know Themselves',
      'Turing Reducibility',
      'A Definition of Information',
    ],
  },
  {
    number: 9,
    slug: 'complexity-classes',
    title: 'Complexity Classes',
    summary:
      'Time complexity measured on TMs (the class P), NP defined the honest two ways (verification and nondeterminism — the equivalence shown), NP-completeness from the Cook-Levin theorem to the census (SAT, 3-SAT, clique, Hamiltonian — the reduction craft), space complexity (Savitch\u2019s theorem, PSPACE, L and NL with NL = coNL), and the hierarchy theorems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'P: Measuring Time on Machines',
      'NP: the Two Definitions and Their Equality',
      'NP-Completeness: Cook-Levin and the Census',
      'Space Complexity: Savitch, PSPACE, L and NL',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The three answers on one page (regular/context-free/decidable/in-P as the nested boundary map), the craft census (closure and pumping questions, reduction diagrams at gate-exam level), and the doorsteps — P versus NP as the standing open question (the capstone\u2019s register), Cryptography\u2019s hardness assumptions, and Compiler Design\u2019s parsing application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nested Boundary Map',
      'The Craft Census',
      'The Doorsteps: the Open Question and the Applications',
    ],
  },
]

export const theoryOfComputation: Book = {
  id: 'theory-of-computation',
  title: 'Theory of Computation',
  subtitle: 'What machines can do, what they can never do, and what they can only do slowly',
  discipline: 'computer-science',
  level: 'First theory-of-computation course → the P versus NP doorstep',
  description:
    'The CS shelf\u2019s limits-keeper (the Sipser arc, vision-transcribed from the Drive). The three questions mapped with the chapter-0 toolkit; finite automata from the 5-tuple to the designing craft with regular-operations closure; nondeterminism as a design tool and the subset construction PROVED; the regular boundary — pumping lemma weaponized, Myhill-Nerode named; context-free languages — grammars, ambiguity, Chomsky normal form, pushdown automata and the CFL boundary; Turing machines with the variants\u2019 equivalences and the Church-Turing thesis stated honestly; the halting problem PROVED by diagonalization and reducibility as propagation; the advanced deeps — the recursion theorem and Kolmogorov information; complexity — P, NP\u2019s two definitions, Cook-Levin and the NP-complete census, Savitch, PSPACE, L/NL; and the nested boundary map with P versus NP as the standing open question. Cross-references Discrete Mathematics (the toolkit), Compiler Design (parsing) and Cryptography (hardness assumptions); hands off to the Advanced Computer Science capstone.',
  status: 'planned',
  accent: ['#4d7c0f', '#3f6212'],
  chapters,
}
