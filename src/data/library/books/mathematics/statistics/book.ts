import type { Book, Chapter } from '../../../types'

/**
 * Statistics — the nineteenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `stat-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Foundation Mathematics ch. 10
 * 'Data and Graphs' banked the first census; Probability Theory hands
 * over the sampled universe. THIS book makes the sample speak: the JEE
 * ground (central tendency and dispersion — the M2 module's ch. 11) as
 * the opening chapters, then correlation and regression (least squares
 * DERIVED here from Linear Algebra's projection ground,
 * cross-referenced both ways), sampling distributions and the
 * central-limit engine applied, estimation with confidence intervals,
 * and the hypothesis-testing family (z, t, chi-square, F) with its
 * honest logic (p-values read correctly, significance ≠ truth). It
 * hands off to the data-science doorstep and the economics shelf.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M2
 *   'Algebra' module ch. 11 'Statistics' (TOC extracted — mean, median,
 *   mode and their relation; range, mean deviation, variance, standard
 *   deviation) maps to chapters 2–3; Kreyszig ch. 25 (mathematical
 *   statistics) cross-checks the university pole; Khattar QA ch. 39–40
 *   (data interpretation and data sufficiency, TOC extracted) own the
 *   aptitude-exam scope.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 11 ch. 13
 *   Statistics (rationalized) + class 12 ch. 13's statistics half; JEE
 *   Main 2026 unit 6's statistics scope (calculation of mean, median,
 *   mode of grouped and ungrouped data; standard deviation, variance and
 *   mean deviation for grouped and ungrouped data); OpenStax
 *   Introductory Statistics (ch. 1 Sampling and Data, 2 Descriptive
 *   Statistics, 3 Probability Topics, 4 Discrete Random Variables, 5
 *   Continuous Random Variables, 6 The Normal Distribution, 7 The
 *   Central Limit Theorem, 8 Confidence Intervals, 9–10 Hypothesis
 *   Testing, 11 The Chi-Square Distribution, 12 Linear Regression and
 *   Correlation, 13 F Distribution and One-Way ANOVA — chapter list
 *   web-checked) maps the whole university arc.
 * - Exam types: the M2 typology (Single Correct Answer type only —
 *   a compact module chapter, honestly noted) for the JEE ground;
 *   aptitude data-interpretation sets (Khattar) for the DI craft;
 *   university-problem style (L5) for chapters 4–8.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'data-and-its-shapes',
    title: 'Data and Its Shapes',
    summary:
      'The subject introduced from its raw material: populations and samples (the distinction that disciplines everything after), types of data (categorical, ordinal, quantitative), frequency distributions and their tables, the visual census (histograms, frequency polygons, ogives — Foundation Mathematics\u2019s graphs grown up), and the shape vocabulary (symmetric, skewed, bimodal) read before any number is computed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Populations, Samples and Data Types',
      'Frequency Distributions and Their Graphs',
      'Reading Shape before Numbers',
    ],
  },
  {
    number: 2,
    slug: 'central-tendency',
    title: 'Central Tendency',
    summary:
      'The centre priced three ways: the mean (ungrouped and grouped, with the assumed-mean craft), the median (its class-interval interpolation for grouped data), the mode (grouped and the relation the module banks — the empirical mean\u2013median\u2013mode tie), the weighted mean, and the combined-means algebra. Every measure\u2019s failure mode shown on data built to break it — the honest census the house style demands.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mean, Ungrouped and Grouped',
      'Median and Mode',
      'The Empirical Relation and Combined Means',
    ],
  },
  {
    number: 3,
    slug: 'dispersion',
    title: 'Dispersion',
    summary:
      'The spread priced: range and quartiles (the interquartile range and box plots), mean deviation (its mean-centring minimality proved), variance and standard deviation (the grouped-data engine, the computational formula DERIVED from the definitional one — per house discipline), the coefficient of variation for honest comparison across scales, and the outlier sensitivity census of every measure.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Range, Quartiles and Box Plots',
      'Mean Deviation',
      'Variance and Standard Deviation, Derived',
      'The Coefficient of Variation',
    ],
  },
  {
    number: 4,
    slug: 'correlation-and-regression',
    title: 'Bivariate Data: Correlation and Regression',
    summary:
      'Two variables at last: scatter diagrams read honestly (the Anscombe discipline — same numbers, different stories, the four plots priced), Karl Pearson\u2019s correlation coefficient derived and bounded (\u22121 \u2264 r \u2264 1 proved), Spearman\u2019s rank correlation, and the two regression lines — least squares DERIVED from the calculus of Differential Calculus and re-derived as Linear Algebra\u2019s projection (the cross-reference both books asked for), with the regression-to-the-mean phenomenon named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Scatter Diagrams and the Anscombe Discipline',
      'Pearson\u2019s r, Derived and Bounded',
      'Spearman\u2019s Rank Correlation',
      'Least Squares: the Two Regression Lines',
    ],
  },
  {
    number: 5,
    slug: 'probability-meets-data',
    title: 'Probability Meets Data: Sampling Distributions',
    summary:
      'The bridge from Probability Theory: random sampling done honestly, the sample mean as a random variable, the standard error, the sampling distribution of the mean for large samples (the central limit theorem APPLIED — its proof remaining Probability Theory\u2019s promise), the finite-population correction, Student\u2019s t introduced for small samples with its story verified (Gosset, 1908), and the chi-square and F distributions introduced as the tables the testing chapters will spend.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sample Mean as a Random Variable',
      'The Central Limit Engine, Applied',
      'Student\u2019s t',
      'Chi-Square and F Introduced',
    ],
  },
  {
    number: 6,
    slug: 'estimation-and-confidence',
    title: 'Estimation and Confidence',
    summary:
      'Speaking about the unknown: point estimates and their properties (unbiasedness, efficiency — the sample variance\u2019s n\u22121 explained by derivation, not folklore), confidence intervals for means (known and unknown \u03c3, the t cases), for proportions (with the Wald interval\u2019s honest weakness named), sample-size determination (the margin\u2013confidence\u2013size tradeoff priced exactly), and the reading discipline: what a confidence interval does and does not promise.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Point Estimates and Their Properties',
      'Confidence Intervals for Means',
      'Proportions and Sample Size',
      'What Confidence Does and Does Not Mean',
    ],
  },
  {
    number: 7,
    slug: 'hypothesis-testing',
    title: 'Hypothesis Testing',
    summary:
      'The decision engine: null and alternative hypotheses, test statistics and rejection regions, Type I and II errors with the tradeoff priced, the p-value READ CORRECTLY (the discipline the century misapplies), the z and t tests (one and two samples, paired), the chi-square family (goodness of fit, independence, homogeneity), one-way ANOVA, and the craft census — which test answers which question, with the multiple-comparisons hazard named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Logic of the Test',
      'z, t and the Two-Sample Craft',
      'The Chi-Square Family',
      'One-Way ANOVA and the Craft Census',
      'Nonparametric Tests: Sign, Wilcoxon and Rank-Sum',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the data-interpretation craft aptitude exams run (Khattar\u2019s tables, graphs and caselets — cross-referenced), the descriptive-to-inferential map in one page, the honest-limits chapter — correlation \u2260 causation priced on real examples, the regression-to-the-mean traps, significance versus importance — and the doorstep: Bayesian inference named (Statistics\u2019s other philosophy), data science and machine learning named (the Linear Algebra + Statistics junction), handing off to the computer-science and economics shelves.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Data-Interpretation Craft',
      'The Book in One Page: Descriptive to Inferential',
      'The Honest Limits',
      'The Doorstep: Bayes, Data Science and Beyond',
    ],
  },
]

export const statistics: Book = {
  id: 'statistics',
  title: 'Statistics',
  subtitle: 'The sample speaks — from the first census to the tested hypothesis',
  discipline: 'mathematics',
  level: 'Class 11\u201312 statistics \u2192 first-year university inference',
  description:
    'The book that makes the sample speak. Data and its shapes; central tendency with every measure\u2019s failure mode shown; dispersion with the computational formula derived; bivariate data — Pearson\u2019s r bounded by derivation, Spearman\u2019s ranks, and the two regression lines with least squares derived twice (Differential Calculus\u2019s minimization and Linear Algebra\u2019s projection — the cross-references both books asked for); sampling distributions with the central-limit engine applied and Student\u2019s t introduced with its verified story; estimation with confidence intervals and the honest reading discipline; and the hypothesis-testing family — z, t, chi-square, ANOVA — with p-values read correctly and the multiple-comparisons hazard named. Cross-references Foundation Mathematics, Probability Theory, Differential Calculus and Linear Algebra; hands off to the data-science doorstep and the economics shelf.',
  status: 'planned',
  accent: ['#059669', '#047857'],
  chapters,
}
