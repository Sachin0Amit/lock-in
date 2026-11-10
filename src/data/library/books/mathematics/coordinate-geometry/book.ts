import type { Book, Chapter } from '../../../types'

/**
 * Coordinate Geometry — the sixth book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 13 chapters /
 * 44 planned lessons, zero written. Lesson ids will use the `cg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Elementary Algebra chapter 10
 * 'Graphs of Equations' banked the plotting instinct — the meeting of
 * algebra and pictures — and Geometry's closing doorstep handed over
 * 'figures acquire addresses'. THIS book is the algebra of those
 * addresses: the coordinate system, the line, the pair of lines, the
 * circle, the three conics, and then the third dimension — points,
 * directions, vector algebra and its products, lines and planes in space.
 * Advanced Algebra chapter 2's quadratic work is cross-referenced (the
 * second-degree family becomes the conics), Geometry's circle theorems
 * are cited wherever a coordinate proof leans on them, and Trigonometry's
 * ratios power the parametric forms. It hands off to Differential
 * Calculus (tangents and slopes of curves — the derivative's first home),
 * while vector CALCULUS (divergence, curl, line and surface integrals) is
 * deliberately left to Multivariable Calculus.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the MATHS subfolder's
 *   Cengage M3 'Coordinate Goemetry' module — 7 chapter PDFs, TOCs
 *   vision-extracted this pass (Coordinate System with centres of a
 *   triangle and polar coordinates; Straight Lines; Pair of Straight
 *   Lines incl. homogenization; Circle incl. radical axis and director
 *   circle; Parabola incl. focal chord and conormal points; Ellipse;
 *   Hyperbola incl. asymptotes) — maps to chapters 1–8; the M5 '3D
 *   Geometry' module — 4 chapter PDFs (Introduction to 3D Geometry incl.
 *   the sphere; Introduction to Vectors incl. linear dependence; Different
 *   Products of Vectors incl. scalar/vector triple products and Lagrange's
 *   identity; Line and Plane incl. skew lines) — maps to chapters 9–12.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 9 ch. 3
 *   Coordinate Geometry + class 10 ch. 7 (distance, section, area of
 *   triangle), class 11 ch. 9 Straight Lines, ch. 10 Conic Sections, ch.
 *   11 Introduction to Three-Dimensional Geometry, class 12 ch. 10 Vector
 *   Algebra + ch. 11 Three-Dimensional Geometry; JEE Main 2026 unit 4
 *   (Straight Lines and Conic Sections) + unit 5 (3D Geometry and
 *   Vectors); OpenStax Precalculus 2e ch. 12 (analytic geometry/conics)
 *   as the sequencing cross-check.
 * - Exam types (the module's own typology, extracted from every M3/M5
 *   chapter): Concept Application Exercises inline; end-of-chapter
 *   Single Correct Answer, Multiple Correct Answers, Linked Comprehension,
 *   Matrix Match, Numerical Value Type; JEE Main/Advanced Archives.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-coordinate-system',
    title: 'The Coordinate System and the Locus Idea',
    summary:
      'Elementary Algebra\u2019s graphs become a precise instrument: the rectangular axes, transformation of axes, the distance formula and the area of a polygon, the section formula (internal and external), the centres of a triangle (centroid, circumcentre, orthocentre, incentre, excentres), slope, polar coordinates, and the locus — the curve as the set of points that satisfy a condition, its equation found by elimination. Every formula proved, not quoted; Geometry\u2019s figures now carry addresses.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Axes, Quadrants and the Address of a Point',
      'Distance, Section and the Area of a Polygon',
      'The Centres of a Triangle in Coordinates',
      'Polar Coordinates',
      'Locus and Its Equation',
    ],
  },
  {
    number: 2,
    slug: 'straight-lines',
    title: 'Straight Lines',
    summary:
      'The line algebraically owned: slope and its readings, every standard form of the equation (slope-intercept, point-slope, two-point, intercept, normal), the angle between two lines, concurrency conditions, the distance of a point from a line, the family of lines through an intersection, and the shifting of axes. The JEE workhorse chapter — built with every formula derived from the two foundations: slope and the distance formula.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Slope and the Forms of a Line\u2019s Equation',
      'Angles, Distances and Concurrency',
      'The Family of Lines',
      'Shifting the Axes: Transformation to Origin',
    ],
  },
  {
    number: 3,
    slug: 'pair-of-straight-lines',
    title: 'Pair of Straight Lines',
    summary:
      'Two lines in one equation: the general second-degree equation that factors, the homogeneous second-degree equation through the origin, the angle between the pair, the combined equation of the angle bisectors, and homogenization — the craft of pairing a curve with a pair of lines through the origin. A short, sharp chapter that arms the conic chapters ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'One Equation, Two Lines',
      'Angle Bisectors of a Pair',
      'Homogenization: Curves through the Origin',
    ],
  },
  {
    number: 4,
    slug: 'the-circle',
    title: 'The Circle',
    summary:
      'Geometry\u2019s most symmetric figure, now computed: centre-radius and general forms, circles touching the axes, three-point circles, the parametric form, position of a point, line\u2013circle intersections, the tangent and normal in all their forms, the pair of tangents, chord of contact, director circle, and the two-circle theory — radical axis, radical centre, and every contact case priced. Geometry\u2019s chapter-6 theorems cross-referenced wherever the algebra leans on them.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equation of a Circle in All Its Forms',
      'Position, Intersection and the Length of a Tangent',
      'Tangents, Normals, Chord of Contact',
      'Two Circles: the Radical Axis and Contact Cases',
    ],
  },
  {
    number: 5,
    slug: 'the-parabola',
    title: 'The Parabola',
    summary:
      'The first conic, met as the locus of a point equidistant from focus and directrix: the standard equation and its four forms, shifted axes, focus\u2013directrix constructions, the focal chord and its properties, position of a point, the parametric form, tangents (all forms), the pair of tangents, properties of tangents, normals from an external point, and conormal points. Advanced Algebra\u2019s vertex-form optimization cross-referenced — the parabola is the same object both books claim.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Focus, Directrix and the Standard Parabola',
      'Focal Chords and the Parametric Form',
      'Tangents and Normals to the Parabola',
    ],
  },
  {
    number: 6,
    slug: 'the-ellipse',
    title: 'The Ellipse',
    summary:
      'The stretched circle: standard equations in every orientation, axes-parallel forms, eccentricity, the focal property, auxiliary and director circles, the parametric form, position of a point, chords bisected at a point, tangents and normals (all forms), and the reflection property that makes the ellipse famous in physics. Areas by the elliptical formula meet Integral Calculus\u2019s doorstep honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Standard Ellipse and Its Anatomy',
      'Parametric Form, Chords and Position',
      'Tangents, Normals and the Reflection Property',
    ],
  },
  {
    number: 7,
    slug: 'the-hyperbola',
    title: 'The Hyperbola',
    summary:
      'The conic with two branches: standard and shifted equations, eccentricity, focal chords, the auxiliary circle, the parametric form, tangents and normals, the asymptotes — tangents at infinity — with their properties, and the rectangular hyperbola referred to its asymptotes as axes. The chapter the calculus doorstep borrows for curve sketching.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Standard Hyperbola and Its Branches',
      'Tangents, Normals and the Asymptotes',
      'The Rectangular Hyperbola',
    ],
  },
  {
    number: 8,
    slug: 'the-conic-family-unified',
    title: 'The Conic Family Unified',
    summary:
      'The synthesis chapter the module\u2019s arc earns: one focus\u2013directrix definition with eccentricity as the dial (0 circle \u2192 <1 ellipse \u2192 1 parabola \u2192 >1 hyperbola), the general second-degree equation identified (the discriminant census, cross-referenced with chapter 3\u2019s pair-of-lines case), tangents/normals/chord of contact written once for all conics, and the polar equation preview named. The family portrait before dimension three.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'One Definition, Four Curves: Eccentricity',
      'Identifying the General Second-Degree Equation',
      'Tangents and Chords of Contact, Unified',
    ],
  },
  {
    number: 9,
    slug: 'the-third-dimension',
    title: 'The Third Dimension: Points, Spheres and Directions',
    summary:
      'Space acquires coordinates: the three mutually perpendicular planes, coordinates of a point, direction angles and direction cosines, planes perpendicular to axes and lines parallel to them, the distance formula, the section formula, and the sphere\u2019s equation. The M5 module\u2019s opening ground — built carefully, because everything in chapters 10\u201312 stands on it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Points and Planes in Space',
      'Direction Cosines and Direction Ratios',
      'Distance, Section and the Sphere',
    ],
  },
  {
    number: 10,
    slug: 'vector-algebra',
    title: 'Vector Algebra: Arrows with Rules',
    summary:
      'The vector as a quantity with magnitude and direction: position vectors, types, addition (the parallelogram law), components, scalar multiplication, the vector joining two points, the section formula in vectors, the bisector vector, linear combinations, and the honest ground of linear dependence and independence — the idea Linear Algebra will generalize. Drawn as arrows, computed as triples.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Vectors: Position, Components, Types',
      'Addition, Scalar Multiplication and the Section Formula',
      'Linear Combination, Dependence and Independence',
    ],
  },
  {
    number: 11,
    slug: 'the-products-of-vectors',
    title: 'The Products of Vectors',
    summary:
      'The three products that make vectors an instrument: the dot product (physical and geometric meaning, properties, angle work and projections), the cross product (area meaning, the moment of force, properties), the scalar triple product (coplanarity and the volume of a tetrahedron) and the vector triple product with Lagrange\u2019s identity. The module\u2019s deepest chapter — and the shelf\u2019s cleanest bridge into physics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dot Product: Angles and Projections',
      'The Cross Product: Areas and Moments',
      'Triple Products and Lagrange\u2019s Identity',
    ],
  },
  {
    number: 12,
    slug: 'lines-and-planes-in-space',
    title: 'Lines and Planes in Space',
    summary:
      'The JEE unit-5 heartland: equations of a line (through a point along a vector; through two points), the angle between two lines, points on lines, the shortest distance between lines — skew lines included — and every form of the plane\u2019s equation (normal, three-point, through a point parallel to two vectors, intercept), line\u2013plane and plane\u2013plane angles, distances of points from planes, and the family of planes. Chapter 9\u2019s direction cosines and chapter 11\u2019s products doing all the work.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Line in Space',
      'The Plane in All Its Forms',
      'Angles and Distances: Lines, Planes, Skew Lines',
      'Families of Planes',
    ],
  },
  {
    number: 13,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: competition craft (locus problems, parametric conics, the 3D short-distance hunt — worked at graded levels with the module\u2019s exam typology), the book in one page (the coordinate map from locus to plane), and the doorstep itself: curves acquire tangent slopes and enclosed areas — the questions only calculus can answer — handing off to Differential Calculus, with Multivariable Calculus named as the dimension-climbing sequel.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Coordinate Geometry: the Craft',
      'The Book in One Page: the Coordinate Map',
      'The Doorstep: Curves Acquire Slopes and Areas',
    ],
  },
]

export const coordinateGeometry: Book = {
  id: 'coordinate-geometry',
  title: 'Coordinate Geometry',
  subtitle: 'Figures with addresses — algebra owns the plane and space',
  discipline: 'mathematics',
  level: 'Class 9\u201312 analytic geometry \u2192 the calculus doorstep',
  description:
    'The book where geometry and algebra fuse completely. The coordinate system and the locus idea; straight lines in every form; the pair of lines; the circle with its radical-axis theory; the three conics — parabola, ellipse, hyperbola — each with tangents, normals, parametric forms and famous properties; then the unified conic family with eccentricity as the dial. The third dimension follows: points, spheres and direction cosines, vector algebra with its three products, and lines and planes in space including skew lines. Every formula derived; Geometry\u2019s theorems cross-referenced where the algebra leans on them; Advanced Algebra\u2019s quadratic work cashed as the second-degree family. Cross-references Elementary Algebra, Geometry, Advanced Algebra and Trigonometry; hands off to Differential Calculus, with Multivariable Calculus named as the sequel.',
  status: 'planned',
  accent: ['#0f766e', '#115e59'],
  chapters,
}
