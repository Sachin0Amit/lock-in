import type { Book, Chapter } from '../../../types'

/**
 * Real Analysis — the twentieth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 9 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `ra-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the shelf's honesty debt
 * collector. Every calculus book stated theorems with proofs deferred;
 * every algebra book used limits informally. THIS book pays: the real
 * numbers CONSTRUCTED (the completeness axiom earning Arithmetic and
 * Number Systems ch. 8's cut-and-approximate story), sequences and
 * series PROVED (Advanced Algebra ch. 5's infinite tail made rigorous),
 * the topology of the line (Topology's doorstep), limits and continuity
 * at ε-δ depth (Differential Calculus's promise), differentiation
 * (Rolle/LMVT/l'Hospital earned), the Riemann integral (Integral
 * Calculus's FTC proved), and sequences of functions (the uniform/
 * pointwise distinction that justifies Mathematical Methods' term-by-
 * term moves). It hands off to Topology, Complex Analysis, Measure
 * theory named, and the research frontier.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): Walter Rudin's
 *   'Principles of Mathematical Analysis' 3e (Drive copy, scanned — TOC
 *   vision-extracted this pass; chapter list verified: 1 The Real and
 *   Complex Number Systems, 2 Basic Topology, 3 Numerical Sequences and
 *   Series, 4 Continuity, 5 Differentiation, 6 The Riemann-Stieltjes
 *   Integral, 7 Sequences and Series of Functions, 8 Some Special
 *   Functions [the gamma function et al.], 9 Functions of Several
 *   Variables, 10 Integration of Differential Forms, 11 The Lebesgue
 *   Theory of Integration) — maps to this book's chapters 1–9 with ch.
   9–11 named as the doorstep and continuation.
 * - Syllabus audit (web-checked 2026-11-10): no school/competitive
 *   scope (JEE/NCERT stop at calculus) — this is the standard
 *   first-course-in-analysis university scope; the OpenStax/standard
 *   university syllabi cross-checked; the shelf's own Differential and
 *   Integral Calculus books carry the computational ground this book
 *   re-derives with proofs (cross-referenced lesson-by-lesson).
 * - Exam types: university-course problems (L5) — Rudin's own exercise
 *   arc; the IIT-JAM / GATE mathematics analysis scope as the Indian
 *   competitive-university anchor; olympiad-to-research transition (L6)
 *   in the closing craft.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-real-numbers-at-last',
    title: 'The Real Numbers at Last',
    summary:
      'Arithmetic and Number Systems\u2019 cut-and-approximate story (ch. 8\u2019s \u221a2) made structural: ordered fields, why \u211a cannot complete (the gap theorem), the completeness axiom in its forms (least upper bound, monotone convergence, nested intervals, Bolzano\u2013Weierstrass — the equivalence chain proved), the Archimedean property and the density of \u211a in \u211d. Dedekind cuts named honestly as one construction; the axiom as the subject\u2019s true subject.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ordered Fields and the Rational Gap',
      'The Completeness Axiom and Its Equivalent Forms',
      'The Archimedean Property and Density',
    ],
  },
  {
    number: 2,
    slug: 'sequences',
    title: 'Sequences',
    summary:
      'Advanced Algebra\u2019s infinite tail (ch. 5\u2019s |r| < 1) made rigorous: the ε-definition of convergence with the template proofs mastered, the algebra of limits, monotone sequences (the convergence criterion proved), subsequences and Bolzano\u2013Weierstrass, the Cauchy criterion (completeness cashed a second time), limsup and liminf as the honest bounds of oscillation, and the special-sequence census (e met by definition and by limit).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The \u03b5-Definition and Template Proofs',
      'Monotone Sequences and Subsequences',
      'The Cauchy Criterion',
      'Limsup and Liminf',
    ],
  },
  {
    number: 3,
    slug: 'series',
    title: 'Series',
    summary:
      'The sum of infinitely many things, earned: partial sums and convergence, the non-negative series tests (comparison, ratio, root — each proved from the Cauchy machinery), the alternating-series test with its error bound, absolute versus conditional convergence (Riemann\u2019s rearrangement theorem stated and sketched — the honest shock), and power series (the radius of convergence, term-by-term operations promised their justification in chapter 8). Summation by parts — Abel’s discipline — priced as the alternating-series engine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Partial Sums and the First Tests',
      'Ratio, Root and the Alternating Discipline',
      'Absolute versus Conditional: Riemann\u2019s Rearrangement',
      'Power Series and the Radius',
    ],
  },
  {
    number: 4,
    slug: 'topology-of-the-line',
    title: 'The Topology of the Real Line',
    summary:
      'The language the theorems need: open and closed sets (complements and unions proved), limit points and closure, the closure\u2013interior algebra, compactness via open covers with the Heine\u2013Borel theorem PROVED for the line (closed and bounded \u21d4 compact), the extreme-value consequence, and connected sets (the interval characterization) — the doorstep Topology walks through, with the metric-space generalization named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Open and Closed Sets',
      'Limit Points and Closure',
      'Compactness and Heine\u2013Borel',
      'Connectedness: the Interval Theorem',
    ],
  },
  {
    number: 5,
    slug: 'limits-and-continuity',
    title: 'Limits and Continuity at Depth',
    summary:
      'Differential Calculus\u2019s promises paid: the ε-δ limit (both one-sided and at infinity, with the sequence characterization), continuity defined and the discontinuity census re-derived structurally, the theorems calculus used — the intermediate value theorem PROVED (bisection), the extreme value theorem PROVED (Heine\u2013Borel cashed), uniform continuity and the Heine\u2013Cantor theorem, monotone functions and their inverse-continuity (why arcsin exists as a function — Trigonometry\u2019s implicit promise).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The \u03b5-\u03b4 Limit, Earned',
      'The Intermediate Value Theorem, Proved',
      'The Extreme Value Theorem, Proved',
      'Uniform Continuity and Monotone Inverses',
    ],
  },
  {
    number: 6,
    slug: 'differentiation',
    title: 'Differentiation',
    summary:
      'The derivative\u2019s theorems earned: the definition and its algebra (the chain rule PROVED — the composition limit handled honestly), the mean value family (Rolle, Lagrange, the generalized form), monotonicity and the first-derivative test as corollaries, l\u2019Hospital\u2019s rule PROVED (the 0/0 case in full), Taylor\u2019s theorem with the remainder forms (Lagrange and Cauchy) and the exponential\u2019s series earned — the calculator\u2019s secrets opened.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chain Rule, Proved',
      'The Mean Value Family, Earned',
      'L\u2019Hospital\u2019s Rule, Proved',
      'Taylor\u2019s Theorem and the Remainder',
    ],
  },
  {
    number: 7,
    slug: 'the-riemann-integral',
    title: 'The Riemann Integral',
    summary:
      'Integral Calculus\u2019s fundamental theorem PROVED: partitions, upper and lower Darboux sums, the definition via refinement, the integrability census (continuous \u21d2 integrable, monotone \u21d2 integrable, with the Riemann-function counterexample), the FTC both parts proved (the integral function\u2019s derivative and the evaluation theorem), the substitution theorem stated honestly, and improper integrals — the convergence discipline chapter 3 built, applied to areas. Rectifiable curves and arc length earned in the integral’s own currency.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Partitions and Darboux Sums',
      'The Integrability Census',
      'The Fundamental Theorem, Proved',
      'Improper Integrals',
    ],
  },
  {
    number: 8,
    slug: 'sequences-of-functions',
    title: 'Sequences and Series of Functions',
    summary:
      'The chapter that justifies the shelf\u2019s later books: pointwise versus uniform convergence (the failure examples drawn — the running limit that loses continuity), the uniform-convergence theorems (continuity, integration, differentiation — each PROVED, each showing what pointwise cannot do), the Weierstrass M-test, uniform convergence and power series (term-by-term earned — Advanced Algebra\u2019s binomial series and Mathematical Methods\u2019 Fourier moves justified here), the Stone\u2013Weierstrass theorem named, and the special functions (the gamma function\u2019s honest construction).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Pointwise versus Uniform: the Failures',
      'The Uniform Theorems, Proved',
      'Power Series Earned Term by Term',
      'The Gamma Function and the Named Theorems',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the proof-craft census (the ε-δ templates, the compactness argument, the bisection technique — worked at exam level), the book in one page (the map from the completeness axiom to the uniform theorems), and the doorsteps named honestly: several variables and differential forms (Rudin\u2019s ch. 9–10 \u2192 Multivariable Calculus\u2019s theory), the Lebesgue theory (why the Riemann integral was not enough — the measure doorway), and metric-space topology \u2192 the Topology book. Lebesgue\u2019s measurable functions named at the measure doorway, partitions of unity named as the several-variable toolkit, and the contraction principle — the fixed-point engine Picard iteration runs on — named as the bridge Differential Equations crosses.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Proof-Craft Census',
      'The Book in One Page: Completeness to Uniformity',
      'The Doorsteps: Forms, Measure and Topology',
    ],
  },
]

export const realAnalysis: Book = {
  id: 'real-analysis',
  title: 'Real Analysis',
  subtitle: 'The honesty debt collected — the theorems behind the calculus',
  discipline: 'mathematics',
  level: 'First-course university analysis \u2192 the measure-theory doorstep',
  description:
    'The book that pays the shelf\u2019s honesty debts. The real numbers built on the completeness axiom with the equivalence chain proved; sequences at ε-depth with Bolzano\u2013Weierstrass and the Cauchy criterion; series with every test proved and Riemann\u2019s rearrangement theorem as the honest shock; the topology of the line with Heine\u2013Borel proved; limits and continuity with the intermediate-value and extreme-value theorems earned; differentiation with the chain rule, l\u2019Hospital and Taylor proved; the Riemann integral with the fundamental theorem PROVED both parts; and sequences of functions — the uniform theorems that justify every term-by-term move the later books make, closing with the gamma function and the named doorsteps: differential forms, Lebesgue measure, metric-space topology. Cross-references Arithmetic and Number Systems, Advanced Algebra, Differential Calculus and Integral Calculus; hands off to Topology and the research frontier.',
  status: 'planned',
  accent: ['#881337', '#4c0519'],
  chapters,
}
