import type { Book, Chapter } from '../../../types'

/**
 * Data Mining — the thirty-seventh book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `mine-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Machine Learning owns the
 * algorithm theory (the models shared here — cross-referenced, never
 * re-derived); Data Science owns the analyst\u2019s craft; Big Data
 * Engineering owns the scale-out platform — this book owns the pattern
 * families themselves: classification, association, clustering,
 * anomaly.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Tan-Kumar on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Tan, Steinbach, Karpatne, Kumar,
 *   'Introduction to Data Mining' 2e (umn.edu/dmbook + the LoC TOC —
 *   1 Introduction; 2 Data; 3 Exploring Data; 4 Classification: Basic
 *   Concepts; 5 Classification: Alternative Techniques; 6 Association
 *   Analysis; 7 Cluster Analysis; 8 Anomaly Detection + the appendices
 *   on PCA/SVD, regression, optimization).
 * - Exam types: Apriori computation sets + silhouette/entropy traces.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-pattern-families',
    title: 'The Pattern Families',
    summary:
      'The field\u2019s honest map: data mining\u2019s tasks as the four families (classification, association, clustering, anomaly — the book\u2019s own census), the data\u2019s preparation echo recalled (quality\u2019s questions from Data Science), and the exploration discipline — summarization and visualization as the first mining act.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Families',
      'The Preparation Echo',
      'Exploration as the First Act',
    ],
  },
  {
    number: 2,
    slug: 'classification-basics',
    title: 'Classification: the Basics',
    summary:
      'The decision-tree craft as the field\u2019s opening discipline: entropy derived as the split\u2019s measure (computed on a worked table), the tree\u2019s growth discipline (the overfitting disease priced — the pruning craft), and the alternative techniques census priced (nearest neighbors, naive Bayes recalled, the ensembles\u2019 echo from Machine Learning).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Entropy Computed on a Worked Table',
      'The Pruning Craft',
      'The Alternatives Census',
    ],
  },
  {
    number: 3,
    slug: 'association-analysis',
    title: 'Association Analysis',
    summary:
      'The market-basket family: the support/confidence/lift triple defined precisely, Apriori\u2019s principle derived (the anti-monotone law PROVED — the pruning that makes the search feasible), the frequent-itemset machinery traced on a worked basket set, and the rule-evaluation honesty (lift\u2019s reading discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Support/Confidence/Lift Triple',
      'Apriori\u2019s Anti-Monotone Law, Proved',
      'The Machinery Traced on Baskets',
    ],
  },
  {
    number: 4,
    slug: 'cluster-analysis',
    title: 'Cluster Analysis',
    summary:
      'Grouping without labels: the proximity census (the distance families priced on real attribute types — the mixed-data honesty), the K-means discipline traced (the objective\u2019s descent and its initialization disease — the ++ fix priced), the hierarchical discipline (the dendrogram\u2019s link census), and the DBSCAN echo (the density\u2019s honest shapes).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Proximity Census',
      'K-Means and the Initialization Disease',
      'The Dendrogram\u2019s Link Census',
    ],
  },
  {
    number: 5,
    slug: 'anomaly-detection',
    title: 'Anomaly Detection',
    summary:
      'The rare and the strange: the anomaly\u2019s definition priced honestly (statistical, proximity, density — the model families), the statistical discipline\u2019s craft (the grader\u2019s error costs priced on the class-imbalance reality), and the census\u2019s honest difficulty (the masked-anomaly question).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anomaly\u2019s Definition Priced',
      'The Error-Cost Reality',
      'The Masked-Anomaly Question',
    ],
  },
  {
    number: 6,
    slug: 'avoiding-false-discoveries',
    title: 'Avoiding False Discoveries',
    summary:
      'The 2e\u2019s own closing discipline: the multiple-comparison disease (why testing many hypotheses inflates the false-win census — the arithmetic computed), the holdout discipline\u2019s echo (Data Science\u2019s leakage recall), the statistical-significance craft applied to mining results, and the honest report\u2019s rules.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Multiple-Comparison Arithmetic',
      'The Significance Craft Applied',
      'The Honest Report\u2019s Rules',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The families on one page (the data → the four families → the honest report with the false-discovery guardrail), the craft census (Apriori computations, entropy traces, silhouette readings at exam level), and the doorsteps — Big Data\u2019s platform, Machine Learning\u2019s depth, the recommender and the graph applications named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Families on One Page',
      'The Craft Census',
      'The Doorsteps: Platform, Depth, Applications',
    ],
  },
]

export const dataMining: Book = {
  id: 'data-mining',
  title: 'Data Mining',
  subtitle: 'The pattern families — classification, association, clustering, anomaly',
  discipline: 'computer-science',
  level: 'First data-mining course → the false-discovery discipline',
  description:
    'The pattern-family home on the Tan-Steinbach-Karpatne-Kumar 2e arc. The four families mapped with the preparation echo and exploration as the first act; classification\u2019s basics — entropy computed on a worked table, the pruning craft, the alternatives census; association analysis — the support/confidence/lift triple with Apriori\u2019s anti-monotone law PROVED and the machinery traced on baskets; cluster analysis — the proximity census, K-means\u2019 initialization disease, the dendrogram\u2019s links; anomaly detection with the error-cost reality and the masked-anomaly question; the 2e\u2019s own closing discipline — avoiding false discoveries (the multiple-comparison arithmetic computed); and the families\u2019 map. Cross-references Machine Learning (the algorithm theory), Data Science and Big Data Engineering; hands off to the recommender and graph applications.',
  status: 'planned',
  accent: ['#c2410c', '#7c2d12'],
  chapters,
}
