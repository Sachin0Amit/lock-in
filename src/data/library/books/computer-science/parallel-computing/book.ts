import type { Book, Chapter } from '../../../types'

/**
 * Parallel Computing — the forty-third book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `par-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): COA owns the hardware (multicore,
 * GPGPU — cross-referenced); Distributed Systems owns the networked
 * machines; Algorithms owns the sequential families that this book
 * parallelizes — this book owns the parallel discipline itself: the
 * programming models, the communication arithmetic, the algorithm
 * families in parallel.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Grama on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Grama, Gupta, Karypis, Kumar, 'Introduction
 *   to Parallel Computing' 2e (the Purdue-hosted PDF\u2019s TOC — Part I
 *   basic concepts: introduction, parallel programming platforms,
 *   principles of parallel algorithm design, basic communication
 *   operations, analytical modeling; Part II the programming poles —
 *   MPI, Pthreads, OpenMP; Part III the algorithm families — sorting,
 *   graphs, dynamic programming, search).
 * - Exam types: speedup/arithmetic questions + communication-cost
 *   computations.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-parallel-idea',
    title: 'The Parallel Idea',
    summary:
      'The promise and its honesty: concurrency\u2019s cost census (the overheads that eat speedup — communication, synchronization, imbalance priced on a worked example), Amdahl\u2019s law recalled and composed with Gustafson\u2019s reframe (the two readings of the same equation), and the platforms census (shared-memory, message-passing, the hybrid era).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Overheads That Eat Speedup',
      'Amdahl and Gustafson, Composed',
      'The Platforms Census',
    ],
  },
  {
    number: 2,
    slug: 'parallel-algorithm-design',
    title: 'Parallel Algorithm Design',
    summary:
      'The methodology made explicit: the decomposition discipline (task and data parallelism priced on a worked problem), the granularity question (the trade\u2019s arithmetic computed), the mapping/assignment/scheduling steps, and the design\u2019s documentation craft (the task-dependency graph as the design\u2019s drawing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Decomposition Priced on a Worked Problem',
      'The Granularity Arithmetic',
      'The Dependency Graph as Drawing',
    ],
  },
  {
    number: 3,
    slug: 'communication-operations',
    title: 'The Communication Operations',
    summary:
      'The machinery\u2019s grammar: the one-to-all and all-to-one families (broadcast/reduction traced with their cost formulas computed), the all-to-all census (the transpose\u2019s question priced), the collective\u2019s cost model derived, and the communication\u2019s lower-bound honesty (bisection width as the physical limit named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Broadcast and Reduction, Costed',
      'The All-to-All Census',
      'The Bisection Limit',
    ],
  },
  {
    number: 4,
    slug: 'analytical-modeling',
    title: 'Analytical Modeling',
    summary:
      'Predicting before building: the performance-model discipline (the cost\u2019s formula census — computation plus communication\u2019s alpha-beta model derived and applied), the scalability question (the isoefficiency function computed on a worked family), and the model\u2019s honesty — where prediction diverges from measurement.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Alpha-Beta Model Derived',
      'Isoefficiency Computed',
      'Where Prediction Diverges',
    ],
  },
  {
    number: 5,
    slug: 'the-programming-poles',
    title: 'The Programming Poles',
    summary:
      'The three programming models priced on real code: MPI\u2019s message-passing discipline (the SPMD census, the send/recv contract, the collective interface), OpenMP\u2019s shared-memory craft (the pragma discipline — the loop\u2019s parallel contract priced on a worked schedule), and Pthreads\u2019 low-level honesty (the OS book\u2019s synchronization recalled), with the GPU echo named (COA cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'MPI\u2019s Message Discipline',
      'OpenMP\u2019s Loop Contract',
      'The GPU Echo, Named',
    ],
  },
  {
    number: 6,
    slug: 'parallel-algorithm-families',
    title: 'Parallel Algorithm Families',
    summary:
      'The classics parallelized: the sorting family (the parallel merge and bitonic censuses traced), the graph family (BFS\u2019s level-synchronous discipline priced on the load-imbalance disease), the dense linear algebra echo (the matrix families\u2019 data-parallelism — the Mathematics shelf\u2019s Linear Algebra cross-referenced), and the search family named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bitonic Sorting Traced',
      'BFS\u2019s Level Discipline',
      'The Dense-Matrix Echo',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The discipline on one page (idea → design → communication → modeling → the poles → the families with the overheads\u2019 spine), the craft census (speedup arithmetic and communication-cost computations at exam level), and the doorsteps — the GPU/warehouse-scale eras (COA and Cloud cross-referenced), the frontier (the heterogeneous question) named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Discipline on One Page',
      'The Craft Census',
      'The Doorsteps: the Heterogeneous Era',
    ],
  },
]

export const parallelComputing: Book = {
  id: 'parallel-computing',
  title: 'Parallel Computing',
  subtitle: 'The discipline of doing it at once — decomposition, communication, speedup honestly',
  discipline: 'computer-science',
  level: 'First parallel-computing course → the heterogeneous-era doorstep',
  description:
    'The parallel home on the Grama 2e arc. The parallel idea — the overheads that eat speedup and Amdahl composed with Gustafson; parallel algorithm design — decomposition priced on a worked problem, the granularity arithmetic, the dependency graph as drawing; the communication operations — broadcast/reduction costed, the bisection limit; analytical modeling — the alpha-beta model derived, isoefficiency computed; the programming poles — MPI\u2019s message discipline, OpenMP\u2019s loop contract, the GPU echo named; the algorithm families — bitonic sorting traced, BFS\u2019s level discipline with the load-imbalance disease; and the discipline map. Cross-references Algorithms (the sequential families), Computer Organization (the hardware) and Distributed Systems (the networked cousin); hands off to the heterogeneous era.',
  status: 'planned',
  accent: ['#155e75', '#083344'],
  chapters,
}
