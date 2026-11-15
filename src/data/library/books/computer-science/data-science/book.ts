import type { Book, Chapter } from '../../../types'

/**
 * Data Science — the thirty-fifth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `dsci-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the statistical mathematics
 * belongs to the Mathematics shelf\u2019s Statistics and Probability Theory
 * (cross-referenced, used fluently); Machine Learning owns the algorithm
 * theory; Big Data Engineering owns the distributed scale — this book
 * owns the analyst\u2019s craft: the question → data → analysis →
 * communication arc.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no data-science reference on
 *   the Drive (honest note).
 * - Web-checked 2026-11-15: Grus, 'Data Science from Scratch' 2e (the
 *   O'Reilly TOC — 1 Introduction; 2 A Crash Course in Python; 3
 *   Visualizing Data; then linear algebra, statistics, probability,
 *   hypothesis testing, regression, logistic regression, recommendation,
 *   k-means, NLP, network analysis, ML, databases/SQL, ethics) — the
 *   first-principles pole.
 * - Syllabus audit: the standard university/bootcamp DS registers.
 * - Exam types: analysis case studies + interpretation questions on
 *   given outputs.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-analysts-contract',
    title: 'The Analyst\u2019s Contract',
    summary:
      'What data science actually is (the Venn reading priced honestly — the statistics, the computing and the domain), the question-first discipline (analysis as a service to a decision, not a tour of a dataset), the workflow\u2019s map stated, and the ethics chapter\u2019s questions named first — the book keeps them in view throughout.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Question-First Discipline',
      'The Workflow\u2019s Map',
      'The Ethics Questions Named First',
    ],
  },
  {
    number: 2,
    slug: 'the-data-itself',
    title: 'The Data Itself',
    summary:
      'The raw material handled honestly: the formats census (flat files, JSON, the database echo with SQL\u2019s analyst subset — DBMS cross-referenced), the cleaning discipline (the messy-data census priced on real defects — the missing-value and outlier decisions), and exploration as a first-class phase (the distribution-first reading).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Formats Census',
      'The Cleaning Discipline',
      'Exploration as a Phase',
    ],
  },
  {
    number: 3,
    slug: 'the-visualization-craft',
    title: 'The Visualization Craft',
    summary:
      'Seeing before claiming: the grammar of graphics idea (the aesthetic/geometry discipline), the chart census priced (what each shape honestly encodes — the bar/line/scatter contracts), the distortion census (the truncated axis and dual-axis diseases demonstrated), and the design honesty (Tufte\u2019s principles named — Human-Computer Interaction cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grammar of Graphics',
      'The Chart Census Priced',
      'The Distortion Diseases Demonstrated',
    ],
  },
  {
    number: 4,
    slug: 'the-statistical-craft-recalled',
    title: 'The Statistical Craft, Recalled',
    summary:
      'The probability/statistics tools used fluently (the Mathematics shelf\u2019s books cross-referenced): the sampling discipline (the bootstrap named as the modern resampler), the hypothesis-testing craft priced (the p-value read honestly — the NHST honesty chapter), the correlation/association reading (the confounding disease priced on a real spurious pair), and the A/B discipline (the experiment as the gold standard).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bootstrap Named',
      'The p-Value Read Honestly',
      'The Confounding Disease Priced',
      'The A/B Discipline',
    ],
  },
  {
    number: 5,
    slug: 'the-modeling-craft',
    title: 'The Modeling Craft',
    summary:
      'The applied modeling arc (Machine Learning cross-referenced for theory): the regression craft applied (the coefficient reading — what a fit claims and what it never may), the classification census applied (the confusion-matrix discipline, the threshold decision), the clustering/unsupervised echo priced on real segmentation, and the feature-craft discipline (the honest leakage questions recalled).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Coefficient Reading',
      'The Threshold Decision',
      'The Segmentation Echo',
    ],
  },
  {
    number: 6,
    slug: 'communication-and-reproducibility',
    title: 'Communication and Reproducibility',
    summary:
      'The last mile priced: the narrative discipline (the audience\u2019s decision shaping the analysis story), the notebook craft (the reproducible document census — the notebook\u2019s honesty rules), the reporting census (dashboards named with their attention questions), and the reproducibility law (the environment, the seed, the pipeline as code).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Narrative Discipline',
      'The Notebook\u2019s Honesty Rules',
      'Reproducibility as Law',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The craft on one page (question → data → explore → model → communicate with the ethics spine through it), the craft census (interpretation questions on given outputs — the mis-leadership chart and the confounded table at exam level), and the doorsteps — Machine Learning\u2019s depth, Big Data\u2019s scale, Data Mining\u2019s pattern census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Craft on One Page',
      'The Craft Census',
      'The Doorsteps: Depth, Scale, Patterns',
    ],
  },
]

export const dataScience: Book = {
  id: 'data-science',
  title: 'Data Science',
  subtitle: 'The analyst\u2019s craft — question-first, honest numbers, told well',
  discipline: 'computer-science',
  level: 'First data-science course → the full analyst\u2019s craft',
  description:
    'The analyst-craft home on the Grus first-principles arc. The analyst\u2019s contract — the question-first discipline with the ethics questions named first; the data itself — the formats census, the cleaning discipline priced on real defects, exploration as a phase; the visualization craft — the grammar of graphics, the chart census priced, the distortion diseases demonstrated; the statistical craft recalled — the bootstrap named, the p-value read honestly, the confounding disease priced on a real spurious pair, the A/B discipline; the modeling craft applied with the coefficient reading and the threshold decision; communication and reproducibility — the narrative discipline, the notebook\u2019s honesty rules; and the craft map. Cross-references the Mathematics shelf\u2019s statistics, Machine Learning, DBMS and HCI; hands off to Big Data Engineering\u2019s scale and Data Mining\u2019s patterns.',
  status: 'planned',
  accent: ['#088f7f', '#0f766e'],
  chapters,
}
