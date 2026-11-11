import type { Book, Chapter } from '../../../types'

/**
 * Discrete Mathematics — the thirteenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 10 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `dm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the book of finite structures,
 * taught the Rosen way but split honestly against its neighbours —
 * propositional logic's deep treatment belongs to Mathematical Logic
 * (this book carries only the working toolkit, cross-referenced); set
 * theory's axiomatic depth belongs to Set Theory; number theory belongs
 * to Number Theory; Advanced Algebra chapter 6 banked the counting
 * fundamentals and chapter 7 the binomial ground — this book's counting
 * chapters open from there (recurrence relations, inclusion-exclusion at
 * depth, generating functions named forward to Combinatorics). The
 * algorithmic ground (growth of functions, complexity, correctness) is
 * genuinely new — the computer-science doorstep. It hands off to
 * Combinatorics, Probability, the CS shelf, and (for Boolean algebra)
 * circuit design.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): Rosen's 'Discrete
 *   Mathematics and Its Applications' 8e (Drive copy — TOC extracted this
 *   pass: ch. 1 The Foundations: Logic and Proofs; ch. 2 Basic
 *   Structures: Sets, Functions, Sequences, Sums, Cardinality, Matrices;
 *   ch. 3 Algorithms incl. growth of functions and complexity; ch. 4
 *   Number Theory and Cryptography [→ the Number Theory book];
 *   ch. 5 Induction and Recursion incl. strong induction and structural
 *   induction, recursive algorithms, program correctness; ch. 6 Counting
 *   incl. the pigeonhole principle, generalized permutations and
 *   combinations; ch. 7 Discrete Probability [→ the Probability book];
 *   ch. 8 Advanced Counting incl. linear recurrences, divide-and-conquer
 *   relations, generating functions, inclusion-exclusion applications;
 *   ch. 9 Relations incl. closures, equivalence, partial orderings;
 *   ch. 10 Graphs incl. isomorphism, connectivity, Euler and Hamilton
 *   paths, shortest paths; ch. 11 Trees; ch. 12 Boolean Algebra;
 *   ch. 13 Modeling Computation) — maps to this book's chapters 2–9 with
 *   the overlaps cross-referenced above.
 * - Syllabus audit (web-checked 2026-11-10): no NCERT ground beyond the
 *   banked algebra/counting arcs (cross-referenced); the scope is the
 *   standard university discrete course (OpenStax Discrete Mathematics
 *   listings as the open cross-check) + GATE CS discrete mathematics
 *   (the competitive university scope).
 * - Exam types: university-course problems (L5) + GATE-CS style items;
 *   Rosen's own exercise typology (regular, computer projects,
 *   computations and explorations) noted in the survey.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-discrete-viewpoint',
    title: 'The Discrete Viewpoint',
    summary:
      'What changes when the universe is finite or countable: the contrast with the continuous shelf (Foundation Mathematics through Calculus), the logic toolkit assembled in working form (truth tables, quantifiers, basic inference — cross-referenced to Mathematical Logic for the formal theory), sets and functions as WORKING objects (cross-referenced to Set Theory for the axiomatics), sequences and summations (Advanced Algebra\u2019s series ground recalled), and the book\u2019s map: structures, algorithms, proofs.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Continuous versus Discrete',
      'The Logic Toolkit, Assembled',
      'Sets, Functions and Sequences at Work',
    ],
  },
  {
    number: 2,
    slug: 'algorithms-and-their-growth',
    title: 'Algorithms and Their Growth',
    summary:
      'The computer-science doorstep: algorithms as discrete objects written in pseudocode, the growth of functions (big-O, big-Ω, big-Θ), the complexity census (constant through factorial), and the craft of counting an algorithm\u2019s steps — the ground every later algorithmic chapter (graph traversals, dynamic programming, network flows in Operations Research) stands on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Algorithms as Objects',
      'The Growth of Functions: Big-O and Its Kin',
      'The Complexity Census',
    ],
  },
  {
    number: 3,
    slug: 'recursion-and-induction',
    title: 'Recursion and Induction at Work',
    summary:
      'Advanced Algebra\u2019s domino principle, industrialized: recursive definitions (including structural induction on recursively-defined sets), strong induction and the well-ordering connection, recursive algorithms with their correctness proofs (program verification named), and the divide-and-conquer pattern met early. The proof method and the computation method revealed as the same idea read twice.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Recursive Definitions',
      'Strong Induction and Well-Ordering',
      'Recursive Algorithms and Their Correctness',
    ],
  },
  {
    number: 4,
    slug: 'advanced-counting',
    title: 'Advanced Counting',
    summary:
      'Beyond Advanced Algebra\u2019s two principles: the pigeonhole principle at depth (the classic theorems priced on small cases), generalized permutations and combinations (with repetition and indistinguishable items), inclusion-exclusion fully derived with its applications (surjections, derangements), and linear recurrence relations solved by the characteristic-equation method — with generating functions named as the deeper machine Combinatorics owns.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pigeonhole Principle at Depth',
      'Permutations and Combinations with Repetition',
      'Inclusion\u2013Exclusion and Derangements',
      'Linear Recurrence Relations',
    ],
  },
  {
    number: 5,
    slug: 'relations-order-and-equivalence',
    title: 'Relations: Order and Equivalence',
    summary:
      'Advanced Algebra chapter 1\u2019s set-of-pairs view, deepened: properties of relations (reflexive, symmetric, antisymmetric, transitive), closures, equivalence relations and partitions (the residue classes of Arithmetic and Number Systems revealed as THE canonical example), partial orderings, Hasse diagrams, maximal/minimal elements, and lattices named. The structure that reappears in topology, algebra and computer science alike. Representing relations — zero-one matrices and digraphs — the storage craft every database and graph algorithm runs on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Properties and Closures',
      'Equivalence Relations and Partitions',
      'Partial Orderings and Hasse Diagrams',
      'Topological Sorting: Order for the Algorithm',
    ],
  },
  {
    number: 6,
    slug: 'graphs',
    title: 'Graphs: the Mathematics of Connections',
    summary:
      'Vertices, edges and the models they carry: graph terminology and types, representation (adjacency matrices — Linear Algebra cross-referenced), isomorphism, connectivity, Euler and Hamilton paths (the K\u00f6nigsberg story verified), and shortest paths (Dijkstra\u2019s algorithm met here, owned formally by Operations Research\u2019s network chapter — cross-referenced both ways). Planar graphs (Euler\u2019s formula and the non-planarity pair) and graph coloring (the chromatic number, the map-coloring story) — the two classic gates.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Graphs and Their Vocabulary',
      'Representation and Isomorphism',
      'Bipartite Graphs, Matchings and Hall\u2019s Theorem',
      'Connectivity, Euler and Hamilton',
      'Planarity and Coloring: Euler\u2019s Formula at Work',
      'Shortest Paths: Dijkstra Met',
    ],
  },
  {
    number: 7,
    slug: 'trees',
    title: 'Trees',
    summary:
      'The connected acyclic structure: rooted trees and their vocabulary, binary trees and their counting, tree traversals, spanning trees and minimum spanning trees (Prim and Kruskal — the greedy algorithm\u2019s first triumph, owned jointly with Operations Research), and the applications census (search trees, decision trees, prefix codes).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rooted and Binary Trees',
      'Traversals and Applications',
      'Spanning Trees: Prim and Kruskal',
    ],
  },
  {
    number: 8,
    slug: 'boolean-algebra-and-circuits',
    title: 'Boolean Algebra and Logic Circuits',
    summary:
      'The two-valued world: Boolean expressions and their algebra, truth-functional completeness, logic gates and combinational circuits, minimization (Karnaugh maps), and the honest note that this is Mathematical Logic\u2019s propositional calculus wearing silicon — the computer-science doorstep in its most concrete form.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Boolean Expressions and Their Algebra',
      'Gates and Combinational Circuits',
      'Minimization: Karnaugh Maps',
    ],
  },
  {
    number: 9,
    slug: 'models-of-computation',
    title: 'Models of Computation',
    summary:
      'Rosen\u2019s closing arc given its own room: languages and grammars (phrase-structure grammars, the hierarchy of language types), finite-state machines with output (Mealy machines and their state diagrams), and finite-state machines without output with language recognition (Kleene\u2019s theorem named, regular languages and their limits) — the discrete bridge to the computer-science shelf\u2019s Theory of Computation, with the Turing machine named forward to Mathematical Logic\u2019s computability chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Languages and Grammars',
      'Finite-State Machines with Output',
      'Finite-State Machines without Output and Language Recognition',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the craft census (which structure, which proof — induction, pigeonhole, or counting), the book in one page (the map from toolkit to circuits and machines), and the doorsteps named honestly: the theory of computation the CS shelf owns (Turing machines, decidability — Mathematical Logic\u2019s computability chapter carries them) and the deeper counting machines (generating functions, P\u00f3lya) that Combinatorics owns.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Craft Census',
      'The Book in One Page: from Toolkit to Circuits',
      'The Doorsteps: Computation and Deeper Counting',
    ],
  },
]

export const discreteMathematics: Book = {
  id: 'discrete-mathematics',
  title: 'Discrete Mathematics',
  subtitle: 'Finite structures, algorithms, proofs — the CS doorstep',
  discipline: 'mathematics',
  level: 'First-year university discrete mathematics \u2192 the CS doorstep',
  description:
    'The book of finite structures. The discrete viewpoint against the continuous shelf; algorithms with their growth and complexity (big-O and the census); recursion and induction industrialized (strong induction, structural induction, program correctness); advanced counting — pigeonhole at depth, combinations with repetition, inclusion-exclusion with derangements, linear recurrences; relations deepened into order and equivalence (partitions, Hasse diagrams, lattices); graphs with isomorphism, connectivity, Euler and Hamilton paths and shortest paths; trees with traversals and spanning trees; and Boolean algebra wearing silicon — gates, circuits, Karnaugh maps. The overlaps with its neighbours are cross-referenced, never duplicated: logic to Mathematical Logic, sets to Set Theory, number theory to Number Theory, counting fundamentals to Advanced Algebra. Hands off to Combinatorics, Probability and the computer-science shelf.',
  status: 'planned',
  accent: ['#57534e', '#44403c'],
  chapters,
}
