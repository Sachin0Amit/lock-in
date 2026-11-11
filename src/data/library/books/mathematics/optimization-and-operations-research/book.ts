import type { Book, Chapter } from '../../../types'

/**
 * Optimization and Operations Research — the twenty-sixth book of the
 * Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `or-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Advanced Algebra chapter 4's
 * constrained maxima (AM-GM craft) and Multivariable Calculus's Lagrange
 * multipliers built the classical optimization instinct; Discrete
 * Mathematics owns the graph algorithms\u2019 fundamentals (BFS/DFS,
 * spanning trees — cross-referenced); Probability Theory owns the
 * stochastic models\u2019 foundations. THIS book is the DECISION
 * discipline: the modeling craft, linear programming with the simplex
 * method and duality (the LPP chapter NCERT class 12 carries and the
 * current JEE Main list dropped — restored at university depth, the
 * honest note recorded), transportation and assignment, network
 * optimization, dynamic programming, integer and nonlinear programming,
 * and the stochastic OR models. It hands off to the economics shelf and
 * the industrial-engineering ground.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): Kreyszig's
   engineering-math volume ch. 22 (unconstrained optimization and linear
   programming) and ch. 23 (graphs and combinatorial optimization — the
   shortest route, spanning trees, flow algorithms at the applied pole)
   carry the compact arc — TOC extracted; the full pole is web-researched:
   Hillier and Lieberman's 'Introduction to Operations Research' (the
   standard arc web-checked 2026-11-10: introduction and the OR modeling
   approach; linear programming and the simplex method; the theory of
   the simplex method; duality theory and sensitivity analysis;
   transportation and assignment problems; network optimization models;
   dynamic programming; integer programming; nonlinear programming;
   metaheuristics; the probabilistic models — queueing, inventory,
   Markov decision processes, simulation). Khattar QA\u2019s aptitude
   chapters (time and work, pipes and cisterns — TOC extracted) own the
   aptitude-exam cousin of OR\u2019s allocation problems (cross-
   referenced).
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 12 ch. 12
   Linear Programming (the graphical ground — banked as chapter 1\u2019s
   doorstep); the current JEE Main list dropped LPP in the 2024 revision
   (verified — the honest note above); the university scope owns
   chapters 2–8; GATE\u2019s operations-research scope for the
   competitive anchor.
 * - Exam types: university-course problems (L5) with the aptitude
   cousin (L4) cross-referenced to Khattar; case-style modeling problems
   as the book\u2019s own typology.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-modeling-discipline',
    title: 'The Modeling Discipline',
    summary:
      'OR introduced as the science of the decision: the modeling approach (objective, constraints, decision variables, parameters — the discipline that separates an OR problem from a word problem), the NCERT class 12 graphical-method ground banked as the doorstep (feasible regions, corner-point reading — Linear Inequalities\u2019 craft from Elementary Algebra recalled), and the modeling census: allocation, covering, blending, scheduling, routing — each family modeled honestly from its story.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Science of the Decision',
      'The Graphical Doorstep',
      'The Modeling Census',
      'Decision Analysis: Trees, Payoffs and the Value of Information',
    ],
  },
  {
    number: 2,
    slug: 'linear-programming',
    title: 'Linear Programming and the Simplex Method',
    summary:
      'The discipline\u2019s engine: standard form and the geometry of feasible corners, the simplex method built honestly (pivot algebra, entering and leaving variables — every tableau\u2019s arithmetic recomputed per house discipline), degeneracy and unboundedness met, the Big-M and two-phase methods for the awkward constraints, and the duality theorem with its economic reading (shadow prices — the dual variable as the constraint\u2019s worth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Standard Form and Corner Geometry',
      'The Simplex Method, Built Honestly',
      'Big-M and Two-Phase',
      'Duality and Shadow Prices',
    ],
  },
  {
    number: 3,
    slug: 'sensitivity-and-allocation',
    title: 'Sensitivity, Transportation and Assignment',
    summary:
      'The decision\u2019s robustness and the allocation engines: sensitivity analysis (which numbers the answer believes in — ranging the objective and the right-hand sides), the transportation problem with its northwest-corner, least-cost and Vogel starts and the MODI optimality test (a genuine network simplex), and the assignment problem with the Hungarian method derived and worked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sensitivity: which Numbers the Answer Believes In',
      'Transportation: MODI and the Starts',
      'Assignment: the Hungarian Method',
    ],
  },
  {
    number: 4,
    slug: 'network-optimization',
    title: 'Network Optimization',
    summary:
      'Graphs with objectives: shortest routes (Dijkstra owned at full depth — Discrete Mathematics\u2019s preview cashed), minimum spanning trees (Prim and Kruskal with the greedy-choice proof), the maximum-flow problem with the Ford\u2013Fulkerson method and the max-flow/min-cut theorem PROVED, the transportation network reading, and project scheduling — CPM and PERT (the critical path as the project\u2019s longest chain, with crash analysis priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Shortest Routes: Dijkstra Owned',
      'Maximum Flow and Min-Cut, Proved',
      'CPM and PERT: the Critical Path',
    ],
  },
  {
    number: 5,
    slug: 'dynamic-programming',
    title: 'Dynamic Programming',
    summary:
      'The recursive optimizer: Bellman\u2019s principle of optimality stated and priced (the stage-state-recursion discipline), the shortest-route problem solved recursively, the knapsack family worked end-to-end (the discrete case as the canonical engine), resource allocation and equipment-replacement models, and the correspondence with Discrete Mathematics\u2019s divide-and-conquer drawn explicitly (the memoization idea named — where computation and optimization meet).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bellman\u2019s Principle',
      'The Knapsack Family',
      'Allocation and Replacement Models',
    ],
  },
  {
    number: 6,
    slug: 'integer-and-nonlinear-programming',
    title: 'Integer and Nonlinear Programming',
    summary:
      'The harder optimizations: integer programming with branch-and-bound built and worked (the LP relaxation\u2019s honest bounds), the modeling power of binaries (the yes/no decisions — facility location, scheduling constraints), nonlinear programming\u2019s ground (convexity as the virtue that makes optimization tractable — Multivariable Calculus\u2019s extrema discipline extended), the KKT conditions stated with their meaning, and gradient methods named (the unconstrained engine Numerical Analysis\u2019s Kreyszig chapter carries — cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Branch-and-Bound',
      'The Binary Modeling Power',
      'Convexity: the Tractable Virtue',
      'KKT, Stated with Meaning',
    ],
  },
  {
    number: 7,
    slug: 'stochastic-models',
    title: 'Stochastic Models',
    summary:
      'Probability\u2019s decisions: Markov chains at OR depth (steady states computed — the transition matrix as Linear Algebra\u2019s eigen-engine cashed again), queueing theory\u2019s birth (the Poisson-exponential discipline meeting Little\u2019s law — L = \u03bbW derived at course depth), inventory theory\u2019s classic models (the EOQ formula derived, the newsvendor problem priced on its honest tradeoff), and simulation named (Monte Carlo as the model too complex to solve — the numerical philosophy returning).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Markov Chains at OR Depth',
      'Queueing: Little\u2019s Law',
      'Inventory: EOQ and the Newsvendor',
      'Simulation, Named',
      'Game Theory: the Two-Person Zero-Sum Duel',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the decision map (one page from the graphical doorstep to simulation — the modeling discipline as the single thread), the OR-exam craft census (simplex tableaux at speed, network algorithms recognized on sight, the modeling census under time), and the doorsteps named honestly: the economics shelf (microeconomics\u2019s optimization core, game theory named as the strategic sibling), industrial engineering, and the data-driven decision frontier (OR + statistics = analytics, the modern marriage).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Decision Map',
      'The OR-Exam Craft Census',
      'The Doorsteps: Economics, Industry, Analytics',
    ],
  },
]

export const optimizationAndOperationsResearch: Book = {
  id: 'optimization-and-operations-research',
  title: 'Optimization and Operations Research',
  subtitle: 'The science of the decision — from corner points to queues',
  discipline: 'mathematics',
  level: 'Class 12 LPP doorstep \u2192 university operations research',
  description:
    'The book of the best decision. The modeling discipline with the graphical doorstep and the model-family census; linear programming with the simplex method built honestly, Big-M and two-phase, and duality with its shadow-price economics; sensitivity analysis, the transportation engines with MODI, and the Hungarian assignment; network optimization — Dijkstra at full depth, max-flow with the min-cut theorem proved, CPM and PERT; dynamic programming with Bellman\u2019s principle and the knapsack family; integer programming\u2019s branch-and-bound, the binary modeling power, convexity as the tractable virtue and the KKT conditions; and the stochastic models — Markov chains, queueing with Little\u2019s law derived, inventory\u2019s EOQ and newsvendor, simulation named. The LPP chapter the current JEE list dropped is restored at university depth, the honest note recorded. Cross-references Advanced Algebra, Multivariable Calculus, Discrete Mathematics, Probability Theory and Linear Algebra; hands off to the economics shelf and analytics.',
  status: 'planned',
  accent: ['#e11d48', '#be123c'],
  chapters,
}
