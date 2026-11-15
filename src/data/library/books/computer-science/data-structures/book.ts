import type { Book, Chapter } from '../../../types'

/**
 * Data Structures — the fifth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `ds-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the Mathematics shelf's
 * Discrete Mathematics (Rosen 8e) owns sets/relations/graph theory as
 * mathematics — cross-referenced, never duplicated; this book is the
 * engineering of structures in memory. Algorithms owns the algorithm
 * families that ride these structures (red-black trees live there);
 * Database Management Systems owns the disk-scale structures (B+ trees).
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): CLRS ch. 10-14 (elementary
 *   structures, hash tables, BSTs, red-black, augmenting) + Sedgewick &
 *   Wayne (bags/queues/stacks, union-find, symbol tables, tries) +
 *   Skiena ch. 3 (contiguous vs linked, containers, dictionaries,
 *   priority queues, hashing, specialized structures) — all extracted.
 * - Web-checked 2026-11-15: the standard standalone DS course arcs
 *   (linked-list craft, AVL balance, sparse matrices).
 * - Syllabus audit: GATE CSE Section 4 'Programming and Data Structures'
 *   — arrays, stacks, queues, linked lists, trees, BSTs, heaps — the
 *   exact roster of chapters 2-6 here.
 * - Exam types: GATE-style tracing MCQs (postfix, rotations) +
 *   university implementation sets.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the CUET 308 B1 + UGC NET Unit 7 + Cambridge
 *   9618 lines audited against this plan — two planned lessons added
 *   (threaded binary trees, external B/B+/B* balance) and the stack/queue
 *   lessons renamed to carry LIFO/PUSH/POP, FIFO/deque and the
 *   infix/prefix/postfix vocabulary by name. Routing/verdict record:
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; standing gate:
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-organisation-of-data',
    title: 'The Organisation of Data',
    summary:
      'Why organisation beats brute force priced on a search\u2019s cost, the abstract data type as the honest contract (what a structure promises, never how), and the complexity vocabulary borrowed briefly from Algorithms — the book\u2019s own spine for every later claim.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Organisation Beats Brute Force',
      'The Abstract Data Type Idea',
      'The Complexity Contract, Borrowed',
    ],
  },
  {
    number: 2,
    slug: 'arrays-and-strings',
    title: 'Arrays and Strings',
    summary:
      'The contiguous contract (O(1) indexing priced against the shifting cost), one- and two-dimensional arrays with the address arithmetic, the row-major and column-major census, and strings as structures (the classic null-terminated and length-prefixed designs with their trade-offs).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Arrays: the Contiguous Contract',
      'The Address Arithmetic',
      'Strings as Structures',
    ],
  },
  {
    number: 3,
    slug: 'linked-lists',
    title: 'Linked Lists',
    summary:
      'The linked idea versus the array contract (insertion at the price of access), singly and doubly linked lists with their pointer craft (the header node, the traversal discipline, the reversal), and the application census — polynomial arithmetic and sparse matrices as the classic pair.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Linked Idea',
      'The Pointer Craft: Headers, Traversals, Reversal',
      'The Application Census: Polynomials and Sparse Matrices',
    ],
  },
  {
    number: 4,
    slug: 'stacks-and-queues',
    title: 'Stacks and Queues',
    summary:
      'The last-in-first-out discipline (LIFO — push, pop, the peek) and the first-in-first-out family (FIFO — the linear queue, the circular ring, the deque, the priority queue), each priced on its honest cost table, and the application census — infix, prefix and postfix expressions converted and evaluated on a stack, function calls, parsing, and BFS\u2019s frontier.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stack: LIFO, PUSH and POP',
      'The Queue Family: FIFO, the Deque, the Priority Queue',
      'Expressions: Infix, Prefix, Postfix — Stacks at Work',
    ],
  },
  {
    number: 5,
    slug: 'trees',
    title: 'Trees',
    summary:
      'The tree idea and its vocabulary (root, height, depth, the traversal census pre/in/post/level), binary trees and their properties (the threaded variant named — threads replacing null pointers for predecessor/successor walks), the binary search tree — search organised as structure with the deletion craft, the balance problem that AVL answers (red-black hands off to Algorithms), and the external balance the disk demands — B, B+ and B* trees (Database Management Systems grows them onto disk).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tree Idea and the Traversal Census',
      'Binary Trees and Their Properties',
      'BST: Search Organised as Structure',
      'The Balance Problem: AVL',
      'The Threaded Binary Tree, Named',
      'External Balance: B, B+ and B* Trees',
    ],
  },
  {
    number: 6,
    slug: 'heaps-and-priority-queues',
    title: 'Heaps and Priority Queues',
    summary:
      'The heap property and its array encoding (the parent-child index arithmetic), insertion and extraction with their sift discipline, build-heap\u2019s honest linear cost, heapsort cross-referenced to Algorithms, and the priority queue as the structure every scheduler and Dijkstra ride.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Heap Property and Array Encoding',
      'Sift Up, Sift Down, Build-Heap',
      'The Priority Queue in Practice',
    ],
  },
  {
    number: 7,
    slug: 'hash-tables',
    title: 'Hash Tables',
    summary:
      'Direct addressing grown up: hash functions and the division/multiplication practice, collision resolution (separate chaining versus open addressing — linear and quadratic probing, double hashing), the load-factor arithmetic with the probe-cost formulas, and rehashing as honest growth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Hash Functions: the Direct-Address Growth',
      'Collision Resolution: Chaining versus Probing',
      'The Load-Factor Arithmetic and Rehashing',
    ],
  },
  {
    number: 8,
    slug: 'graphs-and-sets',
    title: 'Graphs and Sets',
    summary:
      'The graph idea with its vocabulary (cross-referenced to Discrete Mathematics\u2019 theory), the representation census (adjacency matrix versus list priced on space and degree queries), depth-first and breadth-first traversals as structure discipline, and the disjoint-set/union-find structure with its near-constant craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Graph Idea and Its Vocabulary',
      'Representations: Matrix versus List',
      'Traversals as Structure Discipline',
      'Disjoint Sets: Union-Find',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The structure map (one page from array to union-find with the costs beside), the craft census (tracing questions at gate-exam level — infix-to-postfix conversions, rotations, probing, searching and sorting traced on the structures), and the doorstep — Algorithms rides these structures into its families, and Database Management Systems grows them onto disk.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structure Map with Costs',
      'The Craft Census',
      'The Doorstep: Algorithms Rides the Structures',
    ],
  },
]

export const dataStructures: Book = {
  id: 'data-structures',
  title: 'Data Structures',
  subtitle: 'Organisation as an engineering discipline — the structures algorithms ride',
  discipline: 'computer-science',
  level: 'First data-structures course → structure-choice fluency',
  description:
    'The engineering home for organising data in memory. The ADT contract; arrays and their address arithmetic; the linked idea with its pointer craft and the polynomial/sparse application census; the stack and queue families with expression/call/frontier applications; trees — traversals, BSTs, the deletion craft and AVL\u2019s balance; heaps and priority queues with sift and build-heap; hash tables — functions, chaining versus probing, load-factor arithmetic; graphs\u2019 representation census with DFS/BFS and union-find; and the synthesis map with costs. Cross-references Discrete Mathematics (the graph/set theory) and Algorithms (the families that ride these structures — red-black trees live there); hands off to Database Management Systems for the disk-scale structures.',
  status: 'planned',
  accent: ['#7c3aed', '#5b21b6'],
  chapters,
}
