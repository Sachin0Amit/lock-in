import type { Book, Chapter } from '../../../types'

/**
 * Topology — the twenty-third book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `top-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Real Analysis chapter 4 built
 * the topology of the line and named this book at its doorstep; Set
 * Theory built the sets themselves. THIS book generalizes: the metric-
 * space idea first (the distance abstraction Multivariable Calculus and
 * Real Analysis already used implicitly), then the open-set axioms that
 * free continuity from distance entirely, connectedness and compactness
 * as the two great separable virtues, the separation/countability
 * hierarchy, and the fundamental group — algebra reading shape (the
 * Abstract Algebra cross-reference). It hands off to the research
 * frontier and the geometry-at-depth continuation (differential
 * geometry, named).
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): no dedicated topology
 *   reference on the Drive (honest note) — the classic arc is
 *   web-researched: Munkres's 'Topology' 2e (chapter structure
 *   web-checked 2026-11-10 — Part I General Topology: Set Theory and
 *   Logic; Topological Spaces and Continuous Functions [basis, order
 *   topology, product topology, metric topologies, quotient]; Connectedness
 *   and Compactness; Countability and Separation Axioms; The Tychonoff
 *   Theorem; Metrization Theorems and Paracompactness; Complete Metric
 *   Spaces and Function Spaces; Part II Algebraic Topology: The
 *   Fundamental Group; Separation of the Plane; The Seifert–van Kampen
 *   Theorem; Classification of Surfaces; Classification of Covering
 *   Spaces) — maps to this book's chapters 1–8 with the classification
 *   chapters named as the doorstep.
 * - Syllabus audit (web-checked 2026-11-10): no school/competitive
 *   scope — the standard first-course university arc; GATE/JAM
 *   topology scope as the competitive-university anchor.
 * - Exam types: university-course problems (L5); the craft census
 *   (basis verification, compactness proofs, the fundamental-group
 *   computation census) in Munkres's exercise style.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'metric-spaces',
    title: 'Metric Spaces: the Distance Idea',
    summary:
      'The abstraction Real Analysis and Multivariable Calculus already used implicitly, made explicit: the metric axioms priced on engineered examples (the usual metrics on \u211d\u207f, the discrete metric, the taxicab and supremum metrics), open and closed balls, convergent sequences and completeness in metric spaces, continuous maps between metric spaces (the ε-\u03b4 and sequential readings), and the honest question: which theorems needed only the balls — not the algebra of \u211d\u207f?',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Metric Axioms and the Example Census',
      'Balls, Convergence and Completeness',
      'Continuity in Metric Spaces',
    ],
  },
  {
    number: 2,
    slug: 'topological-spaces',
    title: 'Topological Spaces: the Open-Set Idea',
    summary:
      'Distance abandoned: the open-set axioms, bases and subbases (the verification craft mastered on the standard topologies — order, product, subspace, quotient), closed sets and closure, interior and boundary, the neighborhood discipline, Hausdorff\u2019s separation demand introduced early (the honest note: sequences lie without it), and the census of first examples (the line\u2019s topology from Real Analysis, the cofinite, the Sorgenfrey line named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Open-Set Axioms',
      'Bases and the Standard Topologies',
      'Closure, Interior, Boundary',
    ],
  },
  {
    number: 3,
    slug: 'continuity-redefined',
    title: 'Continuity Redefined',
    summary:
      'Advanced Algebra\u2019s machine idea at its highest abstraction: continuity as the preimage of open being open (PROVED equivalent to the metric definition when a metric exists), homeomorphism as \u2018same topology\u2019 (the coffee-and-doughnut discipline priced on honest examples), topological properties (what homeomorphisms must preserve), and the product and quotient constructions with their universal properties stated — the categorical language named gently, saving its full story for the Foundations book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Preimages: the Definition that Frees',
      'Homeomorphism and Topological Properties',
      'Products and Quotients',
    ],
  },
  {
    number: 4,
    slug: 'connectedness',
    title: 'Connectedness',
    summary:
      'The interval\u2019s virtue abstracted: connectedness defined (the separation that cannot happen), the interval characterization proved (Real Analysis\u2019s theorem generalized), path connectedness and its relation to connectedness, components, connectedness preserved by continuity (the intermediate-value theorem revealed as a topology theorem), and the pathological census (the topologist\u2019s sine curve drawn and analyzed — connected but not path connected).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Separations and the Interval Theorem',
      'Path Connectedness and Components',
      'The Topologist\u2019s Sine Curve',
    ],
  },
  {
    number: 5,
    slug: 'compactness',
    title: 'Compactness',
    summary:
      'The most-paying virtue: open covers and finite subcovers, compactness proved for closed bounded intervals (Heine\u2013Borel generalized and localized — in \u211d\u207f it is EXACTLY closed-and-bounded, elsewhere neither), compactness preserved by continuity (the extreme-value theorem unmasked as topology), the tube lemma and product compactness with Tychonoff\u2019s theorem stated for finite products and NAMED in general (its equivalence to choice cross-referenced to Set Theory), sequential compactness and its equivalence in metric spaces, and local compactness named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Open Covers and Finite Subcovers',
      'Compactness Preserved: the Theorems Unmasked',
      'Products and Tychonoff, Named',
      'Sequential Compactness in Metric Spaces',
    ],
  },
  {
    number: 6,
    slug: 'separation-and-countability',
    title: 'Separation and Countability',
    summary:
      'The honesty hierarchy: the separation axioms T\u2081 through normality (each separation demand priced on the example that needs it — the Moore plane drawn, the Sorgenfrey plane named), Urysohn\u2019s lemma stated with its astonishing content (disjoint closed sets separated by a continuous function), the countability axioms (first and second, separability), the Urysohn metrization theorem stated (when a topology comes from a metric — the question chapter 2 left open, answered), and paracompactness named with its manifolds career.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Separation Hierarchy',
      'Urysohn\u2019s Lemma, Stated Honestly',
      'Countability and Metrization',
    ],
  },
  {
    number: 7,
    slug: 'the-fundamental-group',
    title: 'The Fundamental Group: a Door',
    summary:
      'Algebra reads shape: paths and homotopy, the fundamental group CONSTRUCTED (loop composition, the group laws proved), \u03c0\u2081(\u00b9\u00d7\u00b9) computed trivially, \u03c0\u2081(the circle) = \u2124 stated with the winding-number engine sketched honestly (the covering-space proof named), the homotopy invariance of \u03c0\u2081, retractions and the no-retraction theorem (Brouwer\u2019s fixed-point theorem in dimension 2 PROVED from it — a famous theorem earned honestly), the Seifert\u2013van Kampen theorem stated with computed examples, and the classification of surfaces named as the doorstep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Paths, Homotopy and the Group Constructed',
      'The Circle\u2019s Group',
      'Brouwer\u2019s Fixed-Point Theorem in Dimension 2',
      'Van Kampen and the Surfaces Door',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the property map (one page from metric to fundamental group — the whole book as the census of what survives generalization), the craft census (compactness arguments, separation disproofs, \u03c0\u2081 computations at course-exam level), and the doorsteps named honestly: covering-space theory and the higher homotopy groups (the sphere\u2019s \u03c0\u2083 and the field\u2019s hardest questions named accurately), homology theory named as the computable sibling, differential geometry named (the manifold\u2019s calculus — Geometry\u2019s non-Euclidean door returning at research level), and category theory named gently.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Property Map: what Survives',
      'The Craft Census',
      'The Doorsteps: Coverings, Homology, Manifolds',
    ],
  },
]

export const topology: Book = {
  id: 'topology',
  title: 'Topology',
  subtitle: 'The mathematics of closeness without distance — shape itself',
  discipline: 'mathematics',
  level: 'First-course university topology \u2192 the research doorstep',
  description:
    'The book that frees continuity from distance. Metric spaces with the example census and completeness; the open-set axioms with bases and the standard topologies; continuity redefined as preimage magic with homeomorphism as same-topology; connectedness — the interval\u2019s virtue abstracted with the topologist\u2019s sine curve as the honest pathology; compactness — the most-paying virtue, Heine\u2013Borel localized, Tychonoff named with its choice equivalence cross-referenced to Set Theory; the separation and countability hierarchy with Urysohn\u2019s lemma and the metrization answer; and the fundamental group — algebra reading shape, with the circle\u2019s group and Brouwer\u2019s fixed-point theorem earned honestly. Cross-references Real Analysis, Set Theory, Advanced Algebra and Multivariable Calculus; hands off to the research frontier and differential geometry.',
  status: 'planned',
  accent: ['#be123c', '#9f1239'],
  chapters,
}
