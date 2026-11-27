import type { Book, Chapter } from '../../../types'
import { chapter1 } from './ch-01'
import { chapter2 } from './ch-02'
import { chapter3 } from './ch-03'
import { chapter4 } from './ch-04'

/**
 * Geometry — the fifth book of the Mathematics shelf.
 *
 * STATUS: IN-PROGRESS (run 130, 2026-11-27 — chapters 1, 2, 3 AND 4 CLOSED
 * COMPLETE: ch.4 'Similarity: the Geometry of Proportion' shipped all four
 * lessons by the run-130 swarm — 4.1 'Similar Figures', 4.2 'Thales', 4.3
 * 'The Similarity Criteria', 4.4 'Pythagoras Proved' — every seat landed
 * engine-green on the run-130 master pin set; ch.5 'Transformations and
 * Symmetry' rides the next fire).
 */
const chapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  {
    number: 5,
    slug: 'transformations-and-symmetry',
    title: 'Transformations and Symmetry: the Rigid-Motion Idea',
    summary:
      'Congruence and similarity earn their machine definitions: translations, reflections and rotations written as functions of the plane \u2014 the rigid motions \u2014 their compositions read as the isometry idea, line and rotational symmetry found as the fixed sets of those motions, and dilations as the scale engines that re-derive similarity. The Common Core\u2019s transformation-first route and NCERT\u2019s symmetry chapters are both honoured: SAS/ASA/SSS are re-read as invariances under motion, and the ground is laid for the homothety reading of centres of similitude in the circle chapter and for the shifting of axes in Coordinate Geometry.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rigid Motions: Slides, Flips and Turns',
      'Composing Transformations and the Isometry Idea',
      'Line and Rotational Symmetry',
      'Dilations, Scale Factors and Similarity Re-Read',
    ],
  },
  {
    number: 6,
    slug: 'quadrilaterals-and-polygons',
    title: 'Quadrilaterals and Polygons',
    summary:
      'The parallelogram family — parallelogram, rectangle, rhombus, square, trapezium — with its diagnoses proved from triangle congruence. The midpoint theorem (and its converse) as the classic consequence, and polygons in general: interior/exterior angle sums, regular polygons, diagonals. The trapezium midsegment closes the chapter as similarity\u2019s first application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Parallelograms and Their Family Tree',
      'The Midpoint Theorem and the Trapezium',
      'Polygons: Vertex, Side, Angle Sums, Convexity',
    ],
  },
  {
    number: 7,
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
      'Power of a Point',
      'Ptolemy\u2019s Theorem',
      'Common Tangents and Centres of Similitude',
      'The Nine-Point Circle and Euler\u2019s Line',
    ],
  },
  {
    number: 8,
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
      'Inscribed, Circumscribed and the Regular Polygons',
    ],
  },
  {
    number: 9,
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
    number: 10,
    slug: 'solids-and-volumes',
    title: 'Surface Areas and Volumes',
    summary:
      'The third dimension: prisms and cylinders, pyramids and cones, spheres and hemispheres — each formula either proved by dissection (Cavalieri\u2019s principle stated honestly) or flagged as a fact whose proof belongs to calculus. Frustums and combinations of solids complete the aptitude and board scope; the cone/sphere limit arguments open the door Integral Calculus will walk through.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Cross-Sections and Solids of Revolution',
      'Prisms and Cylinders',
      'Pyramids, Cones and Frustums',
      'Spheres, Hemispheres and Combinations of Solids',
      'Relation in Half Angle of Cone and Solid Angle at Vertex',
    ],
  },
  {
    number: 11,
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
    number: 12,
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
  status: 'in-progress',
  accent: ['#d97706', '#b45309'],
  chapters,
}
