import type { Book, Chapter } from '../../../types'

/**
 * Algorithms — the sixth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 10 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `alg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Data Structures owns the
 * structures (this book rides them — red-black trees, heaps and hash
 * tables' engineering live there; here they appear as algorithmic
 * machinery); Theory of Computation owns the limits (NP-completeness as
 * proof theory); Discrete Mathematics owns the graph/set mathematics.
 * Quantitative Aptitude owns the non-mathematical reasoning census.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): CLRS 4e (cs-22 — the full
 *   chapter arc incl. recurrences, sorting, order statistics, DP, greedy,
 *   amortized analysis, the graph block, NP-completeness), Skiena 3e
 *   (cs-27 — design principles, war stories, the catalog), Sedgewick &
 *   Wayne 4e (cs-04 — the implementation-first pole), Grokking (cs-19 —
 *   the beginner on-ramp). Four poles, one book.
 * - Web-checked 2026-11-15: GATE CSE Section 5 (asymptotic analysis,
 *   sorting, hashing, graphs, DP, greedy — the exact chapters 2-8).
 * - Exam types: GATE numerical-answer + MCQ (recurrences, complexity
 *   identification, DP tables) and CLRS-style problem sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-algorithm-idea',
    title: 'The Algorithm Idea',
    summary:
      'What an algorithm owes its user — a finite, definite, effective procedure priced on a first example, correctness reasoning as a first-class skill (induction, contradiction, the loop invariant — cross-referenced to Discrete Mathematics\u2019 proof chapters), and modeling: turning a story problem into structure (Skiena\u2019s own discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'What an Algorithm Owes',
      'Correctness Reasoning: Induction and Invariants',
      'Modeling: from Story to Structure',
    ],
  },
  {
    number: 2,
    slug: 'analysis',
    title: 'Analysis',
    summary:
      'The RAM model of computation (what we count and why it is honest), Big-Oh/Theta/Omega defined and priced, growth rates and the census table (log through factorial), working with the notation (sums, the log rules), logarithms as the slow miracle, and estimation as an engineer\u2019s craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The RAM Model and What We Count',
      'Big-Oh Honestly: Definitions Priced',
      'Growth Rates: the Census Table',
      'Logarithms: the Slow Miracle',
    ],
  },
  {
    number: 3,
    slug: 'divide-and-conquer',
    title: 'Divide and Conquer',
    summary:
      'The divide idea and its three-question checklist, recurrences solved three ways (substitution, the recursion tree, the master method — each derived, each priced), binary search as the minimal divide-and-conquer, Strassen\u2019s matrix multiplication, and the census: maximum subarray and closest pair.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Divide Idea and Its Checklist',
      'Recurrences: Substitution, Tree, Master',
      'Binary Search: the Minimal Case',
      'The Census: Subarray, Strassen, Closest Pair',
    ],
  },
  {
    number: 4,
    slug: 'sorting-and-selection',
    title: 'Sorting and Selection',
    summary:
      'The sorting census (comparison model named), insertion sort as the analysis warm-up, mergesort and quicksort with their honest costs and worst cases, heapsort cross-referenced to the heap structure, the linear-time families (counting, radix, bucket) and the decision-tree lower bound that bounds them all, plus selection in expected linear time.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sorting Census and Its Bound',
      'Mergesort and Quicksort Honestly',
      'Linear-Time Sorting: Counting, Radix, Bucket',
      'Selection: the Median in Linear Time',
    ],
  },
  {
    number: 5,
    slug: 'searching-structures-as-machinery',
    title: 'Searching: Structures as Machinery',
    summary:
      'Symbol tables as the search abstraction, binary search trees with red-black trees\u2019 guarantees (the structure craft cross-referenced to Data Structures — here the algorithmic claims PROVED), augmented structures (order statistics and interval trees), hashing\u2019s randomized analysis, and tries with substring search (KMP previewed).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Symbol Tables and the BST Claims',
      'Red-Black Trees: the Guarantees Proved',
      'Augmenting Structures: Order Statistics and Intervals',
      'Hashing as a Randomized Analysis',
    ],
  },
  {
    number: 6,
    slug: 'graph-algorithms',
    title: 'Graph Algorithms',
    summary:
      'The graph block on its structures: BFS and DFS with their discovery discipline (topological sort, connectivity, cycles as applications), minimum spanning trees (Prim and Kruskal with the cut property PROVED), shortest paths (Dijkstra derived, Bellman-Ford\u2019s negative-edge honesty, Floyd-Warshall for all pairs) and maximum flow named with its census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'BFS and DFS: the Discovery Discipline',
      'Minimum Spanning Trees: Prim and Kruskal',
      'Shortest Paths: Dijkstra Derived',
      'Maximum Flow, Named',
    ],
  },
  {
    number: 7,
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    summary:
      'The DP idea from overlapping subproblems and optimal substructure (each priced on a first example where recursion\u2019s tree is the disease), the memo-to-table discipline, the canonical census — rod cutting, LCS, matrix-chain, knapsack — and the honest craft of recognizing a DP problem in the wild.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Overlapping Subproblems: the Disease',
      'From Recursion to Tables',
      'The Canonical Census: LCS, Matrix-Chain, Knapsack',
      'Recognising DP in the Wild',
    ],
  },
  {
    number: 8,
    slug: 'greedy-and-randomized',
    title: 'Greedy and Randomized',
    summary:
      'The greedy idea and its proof duty (the exchange argument — when local choice is globally right), Huffman coding derived, the randomized family (the hiring analysis, randomized quicksort, Bloom filters, the birthday paradox priced) and Monte Carlo versus Las Vegas as the honest census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greedy Idea and Its Proof Duty',
      'Huffman Coding Derived',
      'Randomized Algorithms: the Hiring Analysis',
      'Bloom Filters and the Birthday Paradox',
    ],
  },
  {
    number: 9,
    slug: 'the-limits-and-the-frontier',
    title: 'The Limits and the Frontier',
    summary:
      'Amortized analysis (the aggregate/accounting/potential trio priced on dynamic tables), string matching done honestly (KMP and its automaton, Rabin-Karp as randomized), number-theoretic and geometric families named, approximation algorithms as the NP-coping craft, and the doorstep to Theory of Computation\u2019s proof theory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Amortized Analysis: the Three Methods',
      'String Matching: KMP and Rabin-Karp',
      'Approximation: Coping with NP',
      'The Doorstep: the Proof Theory',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The algorithm map — one page from divide-and-conquer to flow with the costs beside it, the catalog craft (Skiena\u2019s war stories as reading discipline: recognizing which family a problem belongs to), and the doorsteps: Theory of Computation takes the limits, Machine Learning takes the data-bearing cousins.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Algorithm Map with Costs',
      'The Catalog Craft: Recognising the Family',
      'The Doorsteps: Limits and Learning',
    ],
  },
]

export const algorithms: Book = {
  id: 'algorithms',
  title: 'Algorithms',
  subtitle: 'Correct, fast and honest — the design discipline from first recurrence to flow',
  discipline: 'computer-science',
  level: 'First algorithms course → reference-shelf doorstep',
  description:
    'The four-pole algorithms home (CLRS theory, Skiena\u2019s catalog craft, Sedgewick\u2019s implementations, Grokking\u2019s on-ramp). What an algorithm owes plus induction/invariant correctness reasoning and modeling; analysis from the RAM model through Big-Oh to the growth-rate census; divide-and-conquer with recurrences solved three ways (substitution, tree, master) and binary search, Strassen, closest pair; the sorting census to the decision-tree lower bound with linear-time families and selection; searching — BST claims proved, red-black guarantees, augmented structures, randomized hashing; the graph block (BFS/DFS applications, MST with the cut property, Dijkstra derived, flow named); dynamic programming from overlapping subproblems to the canonical census and recognition craft; greedy with its exchange-argument proof duty plus randomized algorithms, Bloom filters and the birthday paradox; amortized analysis and KMP; approximation as NP-coping. Cross-references Data Structures (the engineering), Theory of Computation (the limits); hands off to Machine Learning\u2019s data-bearing cousins.',
  status: 'planned',
  accent: ['#c2410c', '#9a3412'],
  chapters,
}
