import type { Book, Chapter } from '../../../types'

/**
 * Probability Theory — the eighteenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `pr-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Advanced Algebra chapter 6
 * built the counting ground and chapter 10 named the doorstep ('for the
 * counting ground — Probability'); Combinatorics deepened the counts.
 * THIS book weights the counted universe: sample spaces and the
 * axiomatic definition, conditional probability and Bayes, random
 * variables with expectation and variance, the great distributions,
 * continuous variables with the normal family, and the limit theorems
 * stated honestly (LLN, CLT — proofs deferred to Real Analysis). The
 * M2 module's chapters 09 (Probability I) and 14 (Probability II) are
 * the JEE core; Kreyszig's chapters 24–25 and OpenStax's arc own the
 * university depth. It hands off to Statistics (the sample speaks) and
 * to Operations Research's stochastic models.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M2
 *   'Algebra' module ch. 09 'Probability I' (TOC extracted —
 *   experiments and types, sample spaces, events and their types, the
 *   axiomatic approach, the classical definition, odds for and against,
 *   the addition theorem) and ch. 14 'Probability II' (TOC extracted —
 *   conditional probability and properties, the multiplication theorem,
 *   independence, the partition of a sample space, the total probability
 *   theorem, Bayes' theorem, Bernoulli trials and the binomial
 *   distribution) map to chapters 1–5; Kreyszig's engineering-math
 *   volume ch. 24 (data analysis, probability theory) and ch. 25
 *   (mathematical statistics) cross-check the applied pole.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 11 ch. 14
 *   (rationalized) Probability + class 12 ch. 13 Probability (the
 *   conditional/Bayes/binomial arc); JEE Main 2026 unit 6 (Statistics
 *   and Probability — the mean/median/mode and dispersion half belongs
 *   to the Statistics book, cross-referenced; the probability half:
 *   probability of an event, addition and multiplication theorems,
 *   Bayes' theorem, probability distribution of a random variate,
 *   Bernoulli trials and binomial distribution); OpenStax Introductory
 *   Statistics ch. 3–5 as the open cross-check.
 * - Exam types: the M2 module typology (Concept Application Exercises;
 *   Single/Multiple Correct, Linked Comprehension, Matrix Match,
 *   Numerical Value; JEE Archives) for the JEE chapters; university
 *   problems (L5) for the limit-theorem chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-sample-space',
    title: 'The Sample Space: Probability\u2019s Universe',
    summary:
      'The subject built from zero: experiments random and otherwise, sample spaces written out honestly, events as subsets (Set Theory\u2019s language cashed immediately), the event types (simple, compound, mutually exclusive, exhaustive, complementary), the axiomatic definition alongside the classical ratio — with the paradoxes that forced the axioms priced on small cases — and odds in favour and against.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Experiments, Sample Spaces, Events',
      'The Axioms and the Classical Ratio',
      'Odds and the First Computations',
    ],
  },
  {
    number: 2,
    slug: 'conditional-probability-and-independence',
    title: 'Conditional Probability and Independence',
    summary:
      'The universe revised by knowledge: conditional probability and its properties, the multiplication theorem (one event and then another), independence — pairwise and mutual, with the distinction priced on the classic three-event counterexample — and the addition theorem\u2019s general form completed by the conditional term. Every rule derived from the axiom, none memorized.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Probability after Knowledge: the Conditional',
      'The Multiplication Theorem',
      'Independence, Pairwise and Mutual',
    ],
  },
  {
    number: 3,
    slug: 'total-probability-and-bayes',
    title: 'Total Probability and Bayes',
    summary:
      'The engine the module reserves for its deepest chapter: partitions of a sample space, the total probability theorem, and Bayes\u2019 theorem — cause and evidence, prior and posterior, worked on the classic cascades (the urn chain, the factory machines, the test accuracy problem with its honest base-rate lesson), with the false-positive paradox unpacked carefully because the real world misreads it constantly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Partitions and Total Probability',
      'Bayes\u2019 Theorem',
      'The Base-Rate Cascade',
    ],
  },
  {
    number: 4,
    slug: 'random-variables',
    title: 'Random Variables',
    summary:
      'Numbers assigned to chance: the discrete random variable, its probability distribution and cumulative function, expectation (the fair-price intuition made law), variance and standard deviation, the expectation algebra (linearity proved, the additivity for independent sums), and Chebyshev\u2019s inequality — the first honest bound on straying, proved from nothing but variance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Distribution and Cumulative Function',
      'Expectation and Variance',
      'The Expectation Algebra and Chebyshev',
    ],
  },
  {
    number: 5,
    slug: 'the-great-distributions',
    title: 'The Great Distributions',
    summary:
      'The named families, each derived: Bernoulli trials and the binomial distribution (the module\u2019s arc — with its mean and variance computed), the geometric (waiting times and the memoryless property priced honestly), the Poisson (the law of rare events, derived as the binomial\u2019s limit), the hypergeometric (sampling without replacement — Combinatorics cashed), and the uniform discrete. The recognition census: which family answers which story.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bernoulli and the Binomial',
      'Geometric and the Memoryless Property',
      'Poisson: the Law of Rare Events',
      'Hypergeometric and the Recognition Census',
    ],
  },
  {
    number: 6,
    slug: 'continuous-random-variables',
    title: 'Continuous Random Variables',
    summary:
      'The interval universes: density and distribution functions, computing probabilities as areas (Integral Calculus cashed at last — the book\u2019s biggest structural debt paid), expectation for densities, the uniform continuous, the exponential (the Poisson\u2019s twin), and the normal family — the density met, its symmetry and standardization worked, the 68\u201395\u201399.7 census derived from tables at honest precision.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Densities: Probability as Area',
      'Uniform and Exponential',
      'The Normal Family and Standardization',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: competition probability at speed (conditional cascades, the complement craft, the \u2018at least one\u2019 inversion, distribution recognition under time), the limit theorems stated honestly — the weak law of large numbers and the central limit theorem, with their proofs deferred to Real Analysis as an explicit promise — and the doorstep: the sample arrives and must SPEAK — estimation and testing — handing off to Statistics, with Operations Research\u2019s stochastic models named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Probability: the Craft',
      'The Limit Theorems, Stated Honestly',
      'The Doorstep: the Sample Speaks',
    ],
  },
]

export const probabilityTheory: Book = {
  id: 'probability-theory',
  title: 'Probability Theory',
  subtitle: 'The counted universe, weighted — from axioms to the central limit',
  discipline: 'mathematics',
  level: 'Class 11\u201312 probability \u2192 the statistics doorstep',
  description:
    'The book that weights the counted universe Advanced Algebra and Combinatorics built. Sample spaces and the axioms beside the classical ratio; conditional probability, the multiplication theorem, and independence with its pairwise/mutual trap; the total probability theorem and Bayes\u2019 engine with the base-rate cascade; random variables with expectation, variance, the expectation algebra and Chebyshev\u2019s bound; the great distributions derived — binomial, geometric, Poisson, hypergeometric — with a recognition census; continuous variables with probability as area (Integral Calculus\u2019s structural debt paid), the exponential and the normal family; and the limit theorems stated honestly with their proofs promised to Real Analysis. Cross-references Advanced Algebra, Combinatorics, Set Theory and Integral Calculus; hands off to Statistics and Operations Research.',
  status: 'planned',
  accent: ['#ca8a04', '#a16207'],
  chapters,
}
