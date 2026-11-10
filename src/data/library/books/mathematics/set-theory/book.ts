import type { Book, Chapter } from '../../../types'

/**
 * Set Theory — the fifteenth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 27 planned lessons, zero written. Lesson ids will use the `st-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): every book on the shelf has USED
 * sets since Foundation Mathematics, and Advanced Algebra chapter 1 made
 * relations and functions sets of ordered pairs. THIS book takes the
 * language itself as the subject: the axioms read naively (Halmos's way
 * — informal language, formal discipline), the algebra of sets proved,
 * cardinality and the infinite priced honestly (Cantor's diagonal proof,
 * the uncountability of the continuum), well-ordering, ordinals and
 * transfinite arithmetic, the axiom of choice with its equivalents, and
 * the paradoxes that forced the axiomatic ZFC response — with the
 * continuum hypothesis presented as the honest open question it remains.
 * The M2 module's chapter 01 carries only the naive school ground
 * (cross-referenced, never re-taught). It hands off to Topology (the
 * next abstraction over sets) and Mathematical Logic (the formalization
 * of the reasoning that builds them).
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M2
 *   module's ch. 01 'Set Theory and the Real Number System' (TOC
 *   extracted this pass — sets, representation, types, subsets, power
 *   set, operations, Venn diagrams, cardinal number, intervals,
 *   inequalities, sign scheme, modulus) is the naive school ground this
 *   book's chapter 1 recalls in two lessons, then climbs from. No
 *   dedicated axiomatic reference on the Drive (honest note).
 * - Web-checked classics (2026-11-10): Halmos's 'Naive Set Theory'
 *   (25-section arc: the axioms of extension and specification, unordered
 *   pairs, unions and intersections, complements and powers, ordered
 *   pairs, relations, functions, families, numbers and the Peano
 *   postulates, the axiom of choice, Zorn's lemma, well ordering,
 *   transfinite recursion, ordinal numbers, sets of ordinal numbers,
 *   cardinal numbers, the Schroeder–Bernstein theorem) — maps to
 *   chapters 1–7; the ZFC axiom list and the continuum hypothesis's
 *   independence (Gödel 1940 / Cohen 1963 — verified facts) frame
 *   chapter 7.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 11 ch. 1 Sets
 *   (the naive ground) + JEE Main unit 1's sets scope (representation,
 *   union, intersection, complement, power set, Cartesian product) — the
 *   school/competitive scope is chapter 1–2 ground, banked quickly and
 *   cross-referenced; the university scope owns chapters 3–8.
 * - Exam types: university-course problems (L5); the craft census for
 *   the school scope cross-referenced to the module typology.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-membership-idea',
    title: 'The Membership Idea',
    summary:
      'The language every book spoke, now examined: membership as the primitive, the axiom of extension (a set is determined by its members), the axiom of specification (the honest repair of naive comprehension), subsets and power sets, and the empty set\u2019s peculiar career. The naive school ground (types, representation, Venn diagrams) recalled in one lesson — then left behind.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Membership: the Primitive',
      'Extension and Specification',
      'The Naive Ground, Recalled Once',
    ],
  },
  {
    number: 2,
    slug: 'the-algebra-of-sets',
    title: 'The Algebra of Sets',
    summary:
      'Operations built with proofs: unordered pairs, unions and intersections (families indexed by sets), complements and powers, the distributive and De Morgan laws PROVED from the axioms (both the element-chasing and the algebraic routes), symmetric difference as the ring structure, Cartesian products, and the counting identities (the binomial-inclusion census Advanced Algebra chapter 6 owns, read set-theoretically).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Unions, Intersections, Complements',
      'The Laws, Proved',
      'Symmetric Difference and the Ring Structure',
      'Products and the Counting Identities',
    ],
  },
  {
    number: 3,
    slug: 'relations-and-functions-formally',
    title: 'Relations and Functions, Formally',
    summary:
      'Advanced Algebra chapter 1\u2019s working definitions, rebuilt on ordered pairs (the Kuratowski construction shown): relations as sets of pairs, the domain/range discipline, functions as single-valued relations (the exact conditions the Advanced Algebra book priced informally), families and indexing, inverses and images — plus equivalence relations at the depth Discrete Mathematics\u2019s chapter named forward.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ordered Pairs, Constructed',
      'Relations as Sets of Pairs',
      'Functions, Defined Exactly',
      'Equivalence Relations and Partitions, Deepened',
    ],
  },
  {
    number: 4,
    slug: 'counting-the-infinite',
    title: 'Counting the Infinite: Cardinality',
    summary:
      'The chapter that made mathematics modern: finite cardinality, the countable infinite (the integers, the rationals — the zig-zag proof), Cantor\u2019s diagonal argument (the reals are uncountable — derived in full), the Schroeder\u2013Bernstein theorem stated with its proof\u2019s honest scope, |P(A)| > |A| (Cantor\u2019s theorem), and the arithmetic of cardinals (addition and multiplication that the infinite flattens).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Countability: the Integers and the Rationals',
      'Cantor\u2019s Diagonal Argument',
      'Power Sets and Cantor\u2019s Theorem',
      'The Arithmetic of Cardinals',
    ],
  },
  {
    number: 5,
    slug: 'well-ordering-and-ordinals',
    title: 'Well-Ordering and the Ordinals',
    summary:
      'Order carried into the transfinite: well-ordering, transfinite induction and recursion (the domino principle grown past the finite — Advanced Algebra chapter 7\u2019s engine, generalized), ordinal numbers as order-types, ordinal arithmetic (addition and multiplication that lose commutativity — priced on ω and ω+1), the first uncountable ordinal, and the hierarchy ω, ω\u2081, \u2026 honestly drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Well-Ordering and Transfinite Induction',
      'Ordinals as Order-Types',
      'Ordinal Arithmetic',
    ],
  },
  {
    number: 6,
    slug: 'the-axiom-of-choice',
    title: 'The Axiom of Choice',
    summary:
      'The most argued-about axiom: the choice function and why it is needed (infinitely many socks), the equivalence chain — choice, the well-ordering theorem, Zorn\u2019s lemma — presented with proof sketches at honest depth, and the consequences the shelf will later use (a basis for every vector space, named forward to Linear Algebra; maximal ideals, named forward to Abstract Algebra).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Choice Is Needed',
      'Zorn\u2019s Lemma and the Well-Ordering Theorem',
      'Consequences Named Forward',
    ],
  },
  {
    number: 7,
    slug: 'paradoxes-and-the-axiomatic-response',
    title: 'Paradoxes and the Axiomatic Response',
    summary:
      'The crisis and the repair: Russell\u2019s paradox derived in full (the set of all sets that are not members of themselves), the response hierarchy — type theory named, ZFC\u2019s axioms listed and read — and the continuum hypothesis presented exactly as history left it: independent of ZFC (Gödel\u2019s consistency proof 1940, Cohen\u2019s independence 1963 — verified dates, honestly attributed).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Russell\u2019s Paradox',
      'ZFC: the Rulebook Read',
      'The Continuum Hypothesis: the Honest Open Door',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: sets as the substrate of the whole shelf (one page mapping every book\u2019s objects to set constructions — numbers as sets, functions as sets, the graph of Coordinate Geometry, the sample space of Probability), the craft census for cardinality problems at university-exam level, and the doorstep: the NEXT abstraction over sets — which sets deserve to be called \u2018open\u2019 — handing off to Topology, with Mathematical Logic named as the other road.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sets as the Substrate: the Whole Shelf',
      'The Craft Census',
      'The Doorstep: which Sets are Open',
    ],
  },
]

export const setTheory: Book = {
  id: 'set-theory',
  title: 'Set Theory',
  subtitle: 'The language itself, examined — from membership to the infinite',
  discipline: 'mathematics',
  level: 'Class 11 naive sets \u2192 university foundations',
  description:
    'The book that takes the language every other book speaks and makes it the subject. Membership as the primitive with the axioms of extension and specification; the algebra of sets with every law proved; relations and functions rebuilt formally on ordered pairs; the infinite counted honestly — countability, Cantor\u2019s diagonal argument, the power-set theorem and the arithmetic of cardinals; well-ordering, transfinite induction and the ordinals; the axiom of choice with Zorn\u2019s lemma and its consequences named forward; and the crisis chapter — Russell\u2019s paradox derived, ZFC read, the continuum hypothesis presented as the verified open question it remains. Cross-references Advanced Algebra, Discrete Mathematics and the school ground; hands off to Topology and Mathematical Logic.',
  status: 'planned',
  accent: ['#0e7490', '#155e75'],
  chapters,
}
