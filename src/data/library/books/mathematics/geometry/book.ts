import type { Book, Chapter } from '../../../types'

/**
 * Geometry — the fifth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 11 chapters /
 * 38 planned lessons, zero written. The research phase for this book was
 * web-audit based (the Drive's mathematics collection is JEE-centric: its
 * geometry lives inside the M3 Coordinate Geometry module and Khattar's
 * aptitude chapters — no dedicated classical-geometry reference; see
 * docs/research/DRIVE_TOC_SURVEY.md). Lesson ids will use the `geo-`
 * prefix (verified unused across all existing lesson ids). The book flips
 * to 'in-progress' with its first written lesson; the one-book-at-a-time
 * authoring order is unchanged (Advanced Algebra opens first).
 *
 * POSITIONING (the no-duplication contract, MASTER_PLAN rule 7): Foundation
 * Mathematics chapter 8 'Geometry Foundations' banked the shape vocabulary
 * — the point/line/plane words, the basic figures, the first measurement
 * instincts — and FM 9 'Measurement' banked perimeter, area and volume
 * formulas as facts. THIS book rebuilds geometry as a PROOF-DRIVEN subject:
 * Euclid's axiomatic method, the congruence criteria as theorems with
 * proofs, similarity as FM 6's ratio ground made geometric, Pythagoras
 * PROVED (not quoted), the circle theorems, and the classical
 * ruler-and-compass discipline that the rationalized NCERT dropped from
 * the textbook (an honest note this book records while restoring it — the
 * classic canon keeps it). It hands off to Coordinate Geometry (figures
 * meet algebra), Trigonometry (the triangle measured), and — for the proof
 * craft at the frontier — the olympiad ladder.
 *
 * RESEARCH PHASE (2026-11-10, web-checked):
 * - School canon: NCERT class 9 (rationalized) — Introduction to Euclid's
 *   Geometry, Lines and Angles, Triangles, Quadrilaterals, Circles, Heron's
 *   Formula, Surface Areas and Volumes (chapter list web-checked
 *   2026-11-10; the NEP-transition class 9 book 'Ganita Manjari' rolls out
 *   2025-26 with reorganised chapters — noted, the rationalized list
 *   remains the mapping reference); NCERT class 10 (rationalized) —
 *   Triangles, Circles, Areas Related to Circles, Surface Areas and
 *   Volumes (Constructions dropped in rationalization, restored here per
 *   the classic canon).
 * - Competitive scope: JEE Main folds school geometry into Coordinate
 *   Geometry (unit 4) and Trigonometry (unit 7) — the pure-geometry
 *   anchors are the olympiad ladder (RMO/IMO geometry is proof-driven) and
 *   aptitude geometry (SSC/banking mensuration, Khattar QA's geometry
 *   chapters, Drive id recorded in the survey).
 * - Classic arc: Euclid's Elements Book I (triangles, parallels,
 *   Pythagoras I.47) and Hilbert's Grundlagen der Geometrie (1899) — the
 *   rigour repair — frame chapters 1 and 10.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'points-lines-and-planes',
    title: 'Points, Lines and Planes: the Axiomatic Idea',
    summary:
      'Geometry restarts from zero — not from shapes but from RULES. The undefined words (point, line, plane), the definitions that ride on them, and Euclid\u2019s five postulates as the rules of the game. The reader meets the axiomatic method itself: a statement is believed only when proved, and everything before the first proof is either an agreement or a promise. Foundation Mathematics 8\u2019s shape vocabulary is recalled as the intuition this structure formalises.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Undefined Words and the Defined Ones',
      'Euclid\u2019s Five Postulates: the Rules of the Game',
      'Axioms, Theorems and the Shape of a Proof',
      'Incidence: how Points, Lines and Planes Interlock',
    ],
  },
  {
    number: 2,
    slug: 'angles-and-parallel-lines',
    title: 'Angles, Parallel Lines and the Transversal',
    summary:
      'Angles measured, named and paired; then the parallel line and the transversal — the eight-angle census (corresponding, alternate, co-interior) that powers half of school geometry. The angle-sum of a triangle is DERIVED from the parallel postulate, and the exterior-angle inequality follows — the first classic theorems proved the honest way.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Angles: Types, Pairs and Measures',
      'Parallel Lines and the Fifth Postulate',
      'The Transversal: the Eight-Angle Census',
      'Angle Sum of a Triangle and Its Consequences',
    ],
  },
  {
    number: 3,
    slug: 'triangles-congruence-and-proof',
    title: 'Triangles: Congruence and the Craft of Proof',
    summary:
      'The chapter that makes geometers: congruence as exact coincidence, the five criteria (SAS, ASA, AAS, SSS, RHS) stated as postulates-of-method and used with discipline, and the classic consequences PROVED — isosceles triangles, the equilateral case, and the side/angle inequalities. Every proof is written the Euclidean way: statement, construction, argument, conclusion.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Congruence: the Idea of Same Shape and Size',
      'The Congruence Criteria: SAS, ASA, AAS, SSS, RHS',
      'Isosceles Triangles: the Classic Consequences',
      'Inequalities in a Triangle: Sides and Angles',
    ],
  },
  {
    number: 4,
    slug: 'similarity-and-proportion',
    title: 'Similarity: the Geometry of Proportion',
    summary:
      'Foundation Mathematics 6\u2019s ratio and proportion return as geometry\u2019s scaling law. The Basic Proportionality (Thales) theorem proved, the similarity criteria (AA, SAS, SSS) built on it, and Pythagoras\u2019s theorem PROVED by similarity and again by areas — the theorem the reader has used since Foundation Mathematics is finally earned. Areas scale as the square of the ratio; volumes as the cube.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Similar Figures: Same Shape at Any Scale',
      'The Basic Proportionality Theorem (Thales)',
      'The Similarity Criteria: AA, SAS, SSS',
      'Pythagoras Proved: the Theorem Earned',
    ],
  },
  {
    number: 5,
    slug: 'quadrilaterals-and-polygons',
    title: 'Quadrilaterals and Polygons',
    summary:
      'The parallelogram family — parallelogram, rectangle, rhombus, square, trapezium — with its diagnoses proved from triangle congruence. The midpoint theorem (and its converse) as the classic consequence, and polygons in general: interior/exterior angle sums, regular polygons, diagonals. The trapezium midsegment closes the chapter as similarity\u2019s first application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Parallelograms and Their Family Tree',
      'The Midpoint Theorem and the Trapezium',
      'Polygons: Angle Sums, Regularity, Diagonals',
    ],
  },
  {
    number: 6,
    slug: 'the-circle',
    title: 'The Circle: Chords, Angles and Tangents',
    summary:
      'The circle read the classical way: chords and arcs, the angle-at-the-centre theorem, angles in the same segment, the cyclic quadrilateral and its opposite angles, tangents and the alternate-segment theorem. Every result proved from congruence and the angle census — the theorems that olympiad geometry actually runs on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Chords and Arcs: the First Circle Theorems',
      'Angles in a Circle: Centre, Circumference, Segment',
      'Tangents and the Alternate Segment Theorem',
      'Cyclic Quadrilaterals',
    ],
  },
  {
    number: 7,
    slug: 'ruler-and-compass-constructions',
    title: 'Ruler-and-Compass Constructions',
    summary:
      'The discipline the rationalized textbook dropped and the classic canon keeps: constructions with unmarked straightedge and collapsing compass — bisectors, perpendiculars, triangles from given parts, tangents to circles, similar figures. Each construction ends with its PROOF that the figure has the required property; the impossible constructions (trisecting a general angle) are named honestly and deferred to the algebra that explains them.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Compass-and-Straightedge Discipline',
      'Bisectors, Perpendiculars and Standard Triangles',
      'Tangents and Similar Figures by Construction',
    ],
  },
  {
    number: 8,
    slug: 'areas-in-geometry',
    title: 'Areas: Heron\u2019s Formula and the Plane Region',
    summary:
      'Area as a proved quantity: rectangles and parallelograms from the axioms, triangles, and Heron\u2019s formula derived (the algebra of AL and the surd craft it banked doing the work). Then the circle\u2019s regions — sector, segment — with the area and circumference limits met honestly (the first limit in the shelf since Advanced Algebra\u2019s infinite tail, and a doorstep Calculus will formalise). Combinations of plane figures complete the aptitude-exam scope.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Areas of Rectangles, Parallelograms and Triangles',
      'Heron\u2019s Formula, Derived',
      'Sectors, Segments and Combinations of Figures',
    ],
  },
  {
    number: 9,
    slug: 'solids-and-volumes',
    title: 'Surface Areas and Volumes',
    summary:
      'The third dimension: prisms and cylinders, pyramids and cones, spheres and hemispheres — each formula either proved by dissection (Cavalieri\u2019s principle stated honestly) or flagged as a fact whose proof belongs to calculus. Frustums and combinations of solids complete the aptitude and board scope; the cone/sphere limit arguments open the door Integral Calculus will walk through.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Prisms and Cylinders',
      'Pyramids, Cones and Frustums',
      'Spheres, Hemispheres and Combinations of Solids',
    ],
  },
  {
    number: 10,
    slug: 'proof-and-the-postulates',
    title: 'Proof, the Postulates and the Non-Euclidean Door',
    summary:
      'The chapter the shelf owes its most curious readers: equivalents of the parallel postulate (Playfair\u2019s form, the angle-sum statement), Hilbert\u2019s repair of Euclid\u2019s gaps, the discovery that the fifth postulate cannot be proved — and that denying it builds honest geometries (spherical/elliptic and hyperbolic, with Gauss, Lobachevsky and B\u00f3lyai named). History verified, not folklore; the door to differential geometry named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Equivalent Forms of the Parallel Postulate',
      'Hilbert\u2019s Axioms: the Full Rulebook',
      'The Non-Euclidean Door: when Parallel Lines Misbehave',
    ],
  },
  {
    number: 11,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis in the house manner: competition geometry craft (the auxiliary line, the construction you add, the diagram census — olympiad-style worked problems at graded levels), the book in one page (the theorem map from postulates to volumes), and the doorstep itself: figures acquire addresses — Descartes\u2019s idea — handing off to Coordinate Geometry, with Trigonometry named as the triangle\u2019s measuring instrument.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Geometry: the Craft',
      'The Book in One Page: the Theorem Map',
      'The Doorstep: Figures Acquire Addresses',
    ],
  },
]

export const geometry: Book = {
  id: 'geometry',
  title: 'Geometry',
  subtitle: 'Shapes with reasons — the proof-driven classical course',
  discipline: 'mathematics',
  level: 'Class 6\u201310 geometry \u2192 the olympiad doorstep',
  description:
    'The book where mathematics becomes proof. Foundation Mathematics banked the shapes and their measures; this book rebuilds geometry the way Euclid did — undefined words, postulates, and theorems earned one argument at a time. Congruence and the triangle criteria, similarity and a Pythagoras that is finally proved, the parallelogram family, the circle theorems olympiad problems run on, the ruler-and-compass discipline the rationalized syllabus dropped, Heron\u2019s formula and the solids — every formula either proved or honestly flagged. The book closes on the ideas that broke and rebuilt the subject: equivalents of the parallel postulate, Hilbert\u2019s rigour repair, and the non-Euclidean geometries born from denying Euclid\u2019s fifth. Cross-references Foundation Mathematics throughout; hands off to Coordinate Geometry, Trigonometry and the olympiad ladder.',
  status: 'planned',
  accent: ['#d97706', '#b45309'],
  chapters,
}
