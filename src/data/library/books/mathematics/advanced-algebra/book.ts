import type { Book, Chapter } from '../../../types'

/**
 * Advanced Algebra — the fourth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (promoted 2026-11-10, run 89; enriched by the topic-inclusion
 * guarantee pass, same day) — 10 chapters / 57 planned
 * lessons, zero lessons written yet. Authoring opens at run 90 with chapter 1
 * (lessons 1.1 + 1.2, the two-lessons-per-run cadence); the book flips to
 * 'in-progress' with its first written lesson and to 'complete' only when all
 * 10 chapters and their unit reviews are fully gated. Lesson ids will use the
 * `aa-` prefix (verified unused across all 120 existing lesson ids at
 * promotion time; globally unique, stable forever).
 *
 * POSITIONING (the no-duplication contract, MASTER_PLAN rule 7): Elementary
 * Algebra ended at the function doorstep — the input-output machine, its
 * notation f(x), the domain's two filters, the vertical-probe test, the range
 * read off the fold, and the composition doorstep named as the next book's
 * opening territory. THIS book opens exactly there: functions become objects
 * — a set of ordered pairs first (the relation view), then a transformation
 * classified one-one/onto, then combined (composition, with the honest domain
 * of a composite) and undone (the inverse machine). The quadratic returns as
 * a working object — optimized through vertex form, settled as inequalities
 * on the sign diagram, mined for symmetric reads, interrogated about where
 * its roots live. The extension ladder that Arithmetic and Number Systems
 * proved gets its most famous new rung: the complex numbers, built from the
 * closure failure of x² + 1 = 0 and handed back to the quadratic formula so
 * every discriminant is finally kept. Inequalities grow from the linear cases
 * AL settled into the classical engine — AM–GM, Cauchy–Schwarz, the triangle
 * inequality. Sequences and series (AP, GP, the infinite tail, harmonic and
 * arithmetico-geometric cousins, the special sums), counting (permutations
 * and combinations as derived counts, not memorized formulas), mathematical
 * induction as the domino principle, the binomial theorem proved (not
 * recited) for a positive integral index, the theory of equations (how many
 * roots, symmetric functions for cubics and quartics, transformation of
 * roots), and the exponential/logarithmic family defined once and for all as
 * inverse machines close the course. Every AL-banked skill is cross-
 * referenced, never re-taught; every FM/ANS anchor is cited where the ground
 * was proved. It hands off to Coordinate Geometry (graphs reunite with
 * equations), Trigonometry (the next great function family), Calculus (how
 * the output changes), and — for the counting ground — Probability.
 *
 * RESEARCH PHASE (done 2026-11-10, run 89):
 * - Reference survey: the Drive collection's MATHS subfolder carries the
 *   Cengage JEE **M2 Algebra module** (14 chapter PDFs, machine-listed this
 *   run): 01 Set Theory and the Real Number System, 02 Theory of Equations,
 *   03 Complex Numbers, 04 Principle of Mathematical Induction, 05
 *   Progression and Series, 06 Inequalities Involving Means, 07 Permutation
 *   and Combination, 08 Binomial Theorem, 09–14 Probability/Reasoning/
 *   Statistics/Determinants/Matrices (the last six belong to other shelf
 *   books — Probability, Mathematical Logic, Statistics, Linear Algebra).
 *   The module's algebra chapters map to this book's chapters 2–8. Hall &
 *   Knight's *Higher Algebra* (two Drive copies, banked run 66 as the
 *   classic stretch — 35 chapters: the progressions, quadratic theory,
 *   simultaneous equations, permutations and combinations (ch. XI),
 *   mathematical induction (ch. XII), the binomial theorem (ch. XIII), the
 *   logarithms, the theory of equations, determinants) owns the depth
 *   stretch mapped to the ends of chapters 2, 7, 8 and 9. Khattar QA 4e owns
 *   the aptitude-exam scope (logs, surds, series speed work). No downloads
 *   were needed for the research phase itself; per-unit downloads follow at
 *   authoring time.
 * - Syllabus audit (sanctioned internet fallback, web-checked 2026-11-10):
 *   (a) the NCERT school canon's senior algebra arc — class 11 (rationalized
 *   14-chapter book, 2026-27 listings) ch. 2 "Relations and Functions" (with
 *   composition, per the CBSE 2025-26 syllabus), ch. 4 "Complex Numbers and
 *   Quadratic Equations", ch. 5 "Linear Inequalities", ch. 6 "Permutations
 *   and Combinations", ch. 7 "Binomial Theorem", ch. 8 "Sequences and
 *   Series" — Principle of Mathematical Induction and Mathematical Reasoning
 *   were dropped from the rationalized textbook, an honest note this book
 *   records while keeping induction (the JEE syllabus, the classic and the
 *   module arcs all retain it) — and class 12 ch. 1 "Relations and
 *   Functions" (types of relations, one-one/onto, composition, invertible
 *   functions) — maps to chapters 1, 3, 4, 5, 6, 7;
 *   (b) the modern open-textbook structure (OpenStax College Algebra 2e:
 *   functions → polynomial and rational functions → exponential and
 *   logarithmic functions → sequences, probability and counting) — the
 *   sequencing cross-check for chapters 1, 8, 9, 10;
 *   (c) the competitive-exam scope (JEE Main 2026 mathematics syllabus,
 *   web-checked again 2026-11-10 during the full-shelf planning pass —
 *   a correction to this file's run-89 record: mathematical induction,
 *   mathematical reasoning and linear programming were REMOVED from the
 *   JEE Main syllabus in the 2024 revision (verified against multiple
 *   sources), so induction is kept via the module arc (M2 ch. 04), the
 *   classic arc (Hall & Knight ch. XII) and the school-canon history,
 *   not via the current JEE list): unit 1 sets/relations/functions with
 *   composition of functions and one-one/onto, unit 2 algebra — complex
 *   numbers and quadratic equations with modulus, Argand diagram,
 *   triangle inequality and roots-coefficients, permutations and
 *   combinations, binomial theorem for positive integral index with
 *   general and middle term and coefficient properties, sequences and
 *   series with AM/GM insertion, Sn/Sn²/Sn³ and the arithmetico-
 *   geometric progression; Khattar QA for the aptitude side) — maps to
 *   chapters 1–9 and 10;
 *   (d) the classic stretch (Hall & Knight Higher Algebra) — quadratic
 *   theory at depth, induction, permutations and combinations, the binomial
 *   theorem at any index (the positive-index case is this book's chapter 7;
 *   the any-index series belongs to the calculus doorstep), logarithms, the
 *   theory of equations — maps to the ends of chapters 2, 7, 8, 9;
 *   (e) the handoff discipline (AL 11.3's composition doorstep) — chapter 1
 *   opens exactly on composites, inverses and the domains of composites.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'functions-as-objects',
    title: 'Functions as Objects',
    summary:
      'The book opens exactly where Elementary Algebra ended: the input-output machine becomes an object in its own right. First the set-of-pairs view — a relation as a subset of a product, a function as the special relation that is total and single-valued, the ground NCERT class 11–12 calls Relations and Functions and AL 11.3 never needed. Then the machine is classified: one-one, onto, the horizontal probe read at depth and the finite-set pigeonhole verdict. Then machines are wired in series — composition, its honest domain, its associativity, the identity — and finally undone: the inverse machine, when it exists, why existence is exactly one-one plus onto, and how the domain and range swap places. Piecewise-defined functions read honestly as machines with a switch; the transformation grammar — shifts, reflections, and the vertical and the horizontal stretch or squeeze — priced on the parent curves; and the craft of finding a function from a graph or a data table (the module’s problems based on finding function). This is the grammar every later chapter speaks.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Relations: the Set-of-Pairs View',
      'One-One and Onto: Classifying the Machines',
      'Composition: Machines in Series',
      'Inverse Functions: the Machine Undone',
      'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog',
      'Even and Odd Functions and Their Extensions',
      'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph',
      'The Period Census: Periods of Transformed and Composite Functions',
    ],
  },
  {
    number: 2,
    slug: 'the-quadratic-at-depth',
    title: 'The Quadratic at Depth',
    summary:
      'Elementary Algebra settled the quadratic equation four ways; this chapter treats the quadratic as a working object. The vertex form becomes an optimization tool — maxima and minima priced without calculus, the range read off the fold and then used on real constraints. The equation grows into the inequality: the sign diagram, the discriminant trichotomy (two sign changes, one touch, constant sign), and the solution sets that AL 7.1–7.3’s linear work promised. Viète returns at competitive depth — symmetric expressions in the roots, common roots, forming equations with given roots — and the chapter closes with the JEE classic: conditions that pin both roots, or exactly one, inside a chosen interval. Every door metaphor AL coined for a root is now located on the line.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Vertex Form at Work: Maxima and Minima',
      'Quadratic Inequalities and the Sign Diagram',
      'Symmetric Reads and Common Roots',
      'Location of Roots: Doors in Intervals',
    ],
  },
  {
    number: 3,
    slug: 'complex-numbers',
    title: 'Complex Numbers: the New Rung',
    summary:
      'Arithmetic and Number Systems proved the extension-ladder discipline — every new number family born from a closure failure, repaired on purpose. This chapter climbs the most famous rung: x² + 1 = 0 has no real door, so a number i is forced with i² = −1, and the algebra of a + bi is built so the whole field-law family survives (the honest sanity ANS 7.2 banked). The conjugate and modulus arrive as bookkeeping — z z̄ = |z|², division by conjugating, |z| as a distance with the triangle inequality — and the Argand plane is read algebraically (addition as the parallelogram, multiplication as rotation-and-scaling) with the deep geometry left to later books. The payoff: the quadratic formula keeps its promise for every discriminant, and real coefficients are shown to force complex doors in conjugate pairs. De Moivre’s theorem and the nth roots of unity — the unit circle’s equal spokes — with their properties (primitive roots, the cyclotomic equations) banked as the module’s depth engine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Closure Failure That Forces i',
      'Conjugate and Modulus',
      'Negative Discriminants: the Doors Turn Complex',
      'The Argand Plane: Polar Form and the Argument',
      'De Moivre, Roots of Unity and the Complex Loci',
    ],
  },
  {
    number: 4,
    slug: 'classical-inequalities',
    title: 'Inequalities: the Classical Engine',
    summary:
      'AL chapter 7 settled order on the line for linear expressions; this chapter builds the classical machinery that competitive exams actually test — maxima and minima without calculus. The arithmetic–geometric mean inequality is proved for two numbers from the square that is never negative, stated honestly beyond, and worked under constraints (the fixed-sum, fixed-product discipline). Cauchy–Schwarz arrives with its Engel (Titu) form, the speed tool for fraction sums. And the absolute value FM priced as distance becomes a bound machine: |f| < g and |f| > g verdicts, the triangle inequality proved, and the |x| + |y| ≥ |x + y| reads that finish the engine. Every result is derived before it is used — the AM–GM equality condition is a theorem about when two numbers coincide, not a memorized footnote.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Arithmetic-Geometric Mean Inequality',
      'The Weighted AM-GM and Its Consequences',
      'Cauchy-Schwarz and Engel’s Form',
      'The Rearrangement and Chebyshev Inequalities',
      'Jensen\u2019s Inequality and Convexity',
      'Absolute Value at Depth: the Triangle Inequality',
    ],
  },
  {
    number: 5,
    slug: 'sequences-and-series',
    title: 'Sequences and Series',
    summary:
      'Lists with structure become algebra: the arithmetic progression as a constant climb (its nth term, its sum, the means inserted between numbers), the geometric progression as a constant ratio (its sum, and the infinite tail |r| < 1 — the book’s first honest limit, the doorstep Calculus will formalize), then the cousins: the harmonic progression read as reciprocals of a climb, and the arithmetico-geometric progression the JEE syllabus names explicitly. The chapter closes with the special sums Σk, Σk², Σk³ — proved the honest way first (the pairing trick FM 11.2 would recognize), with the method of differences and telescoping as the general craft for series whose terms surrender their middles. The induction certificate for these sums is deliberately deferred to chapter 7, exactly where the classics put it. Sigma notation for dependent and for independent index variables — the compression every later series argument writes with — named and priced here.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Arithmetic Progressions: the Constant Climb',
      'Geometric Progressions and the Infinite Tail',
      'Harmonic and Arithmetico-Geometric Progressions',
      'Special Series and the Method of Differences',
      'Sigma Notation and the Classical Power Sums',
      'Recurring Series and the Scale of Relation',
    ],
  },
  {
    number: 6,
    slug: 'counting-permutations-combinations',
    title: 'Counting: Permutations and Combinations',
    summary:
      'Algebra’s discrete half: counting as an exact science, the way both the JEE module and Hall & Knight teach it — the fundamental principle first (multiply along a chain of independent choices, add across mutually exclusive alternatives), then the two great counts derived rather than memorized: the permutation as an arrangement (nPr from the chain itself, factorials, arrangements of alike things, the circle), and the combination as a selection (nCr, its symmetry and complement reads, choosing from groups). The chapter closes with the distribution puzzles — words into boxes, people into rooms, at-least and at-most selections — where the two principles interlock and a wrong model is caught by the small-case census. Circular permutations — the round table and the necklace — with the clockwise and anticlockwise arrangements priced exactly; the distribution of identical objects and of distinct objects into groups, with and without empty groups allowed; and the properties of nCr (symmetry, absorption, Pascal’s identity) derived, not quoted. This is the ground Probability inherits, and it is built to be inherited honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Factorials and the Counting Toolkit',
      'Circular and Restricted Permutations',
      'The Fundamental Principle of Counting',
      'Permutations: the Arrangement Count',
      'Combinations: the Selection Count',
      'Distributions and the Classic Counting Puzzles',
    ],
  },
  {
    number: 7,
    slug: 'induction-and-binomial-theorem',
    title: 'Induction and the Binomial Theorem',
    summary:
      'The book’s proof engine and its most-used consequence, in the order the classics teach them. Mathematical induction first — the domino principle: base case, inductive step, and the honest scope note (what induction proves and what it never can), applied to the sum formulas chapter 5 left uncertified, to divisibility statements, and to inequality statements the AM–GM engine guessed. Then the binomial theorem for a positive integral index — Pascal’s triangle read as a counting statement about chapter 6’s selections, the theorem PROVED by induction, the general and middle terms priced exactly. The coefficients become objects of study (their sum, their alternating sum, the term independent of x), and the chapter closes with the applications: (1 + x)ⁿ ≈ 1 + nx for small x, divisibility reads, and coefficient-hunting at exam speed. The frequently used expansions — (a ± b)², (a ± b)³ and the kin every exam expects by reflex — banked as the chapter’s opening toolkit.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Mathematical Induction: the Domino Principle',
      'The Binomial Theorem, Proved',
      'The Binomial Theorem for Any Index',
      'The Multinomial Theorem',
      'Binomial Coefficients at Work',
      'Binomial Applications and Approximations',
    ],
  },
  {
    number: 8,
    slug: 'theory-of-equations',
    title: 'The Theory of Equations',
    summary:
      'The polynomial’s deepest algebra — Hall & Knight’s heartland, entered honestly. How many roots a degree-n equation truly has: n over the complex numbers (the fundamental theorem stated, not proved — with the honesty the platform owes its readers), multiplicities counted, and the conjugate-pair law for real coefficients derived from chapter 3’s algebra rather than asserted. Viète generalizes: the symmetric functions of a cubic’s and a quartic’s roots, the sum–sum-of-products–product staircase, and what symmetric reads survive when the roots are not nice. The chapter closes with the transformation craft: build the equation whose roots are the old roots shifted, scaled or inverted — the classic technique that turns hard cubics into transparent ones and reciprocal equations into quadratics in disguise.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'How Many Roots: Degree n, n Roots',
      'Descartes\u2019 Rule of Signs',
      'Cubics and Quartics: the Symmetric Functions',
      'Cardan and Ferrari: the Cubic and Quartic, Solved',
      'Transformation of Equations',
      'Reciprocal Equations',
    ],
  },
  {
    number: 9,
    slug: 'exponentials-and-logarithms',
    title: 'Exponentials and Logarithms',
    summary:
      'The first great non-polynomial family inside algebra. The exponent laws AL banked on integer and rational indices are extended to every real index — the exponential function aˣ as a machine with a constant percent climb, its shape family, and the growth stories it prices. The logarithm is then defined once and for all as the inverse machine — chapter 1’s theory cashing its first big cheque: domain and range swap, log_a(aˣ) = x, and every log law DERIVED from the exponent law it mirrors instead of memorized. Change of base, the common and natural logarithms, and the chapter closes on equations: same-base discipline, exponent equations that hide quadratics, log equations with their domain discipline enforced (extraneous roots caught, not mourned), and the growth and decay problems that make the family famous.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Exponential Family: Every Real Index',
      'Logarithms: the Inverse Machine',
      'The Laws of Logarithms and the Change of Base',
      'Logarithmic and Exponential Equations',
      'Exponential and Logarithmic Series',
      'Logarithm Tables: Characteristic, Mantissa and Antilogarithm',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis, in the house manner. First the competition craft across all the new families — the substitution game on quadratics and symmetric reads, AM–GM maxima under constraints, series sums priced by difference and telescoping, binomial term hunts, log speed reads — the advanced sequel to AL 11.2. Then the book in one page: the honest map of what was built and what was only opened, the cross-references made good, the formula family gathered. And then the doorstep itself: the infinite tail’s limit met again, the changing output measured discretely along the new families (slopes of aˣ and log taken the honest, finite way AL 10.2 priced for lines), continuity named as a promise — the handoff to Calculus, with Coordinate Geometry (graphs reunited) and Trigonometry (the next family) named as the neighbouring doors.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Algebra: the Advanced Craft',
      'Functional Equations: Building Functions from Rules',
      'The Book in One Page: Synthesis',
      'The Doorstep: Limits and the Changing Output',
    ],
  },
]

export const advancedAlgebra: Book = {
  id: 'advanced-algebra',
  title: 'Advanced Algebra',
  subtitle: 'Functions as objects — the second course',
  discipline: 'mathematics',
  level: 'Class 11–12 algebra → the doorstep of calculus',
  description:
    'The book where algebra grows up a second time. Foundation Mathematics opened the doorstep and Arithmetic and Number Systems proved the ground; Elementary Algebra opened the door and ended at the function idea. This book walks through: functions become objects — relations as sets of pairs, machines classified one-one and onto, composed in series with their honest domains, and undone by inverses. The quadratic returns as a working object — optimized, settled as inequalities on the sign diagram, mined for symmetric reads, its roots located in intervals. The extension ladder climbs its most famous rung: complex numbers built from a closure failure, carried by the field laws, and handed back to the quadratic formula so every discriminant is kept. Inequalities become the classical engine (AM–GM, Cauchy–Schwarz, the triangle inequality — proved, not recited). Sequences and series run from the constant climb to the infinite tail; counting becomes the exact science of permutations and combinations; mathematical induction certifies statements for every n at once; the binomial theorem is proved for a positive integral index and worked to its approximation power; the theory of equations counts roots, prices symmetric functions and transforms old roots into new equations; and the exponential and logarithmic family is defined once and for all as inverse machines. Cross-references Foundation Mathematics, Arithmetic and Number Systems and Elementary Algebra throughout; hands off to Coordinate Geometry, Trigonometry, Calculus and Probability.',
  status: 'planned',
  accent: ['#be123c', '#881337'],
  chapters,
}
