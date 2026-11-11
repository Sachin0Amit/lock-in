import type { Book, Chapter } from '../../../types'

/**
 * Trigonometry — the seventh book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10; enriched by the
 * topic-inclusion guarantee pass, same day) — 8 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `tr-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Geometry measured the triangle
 * with congruence and similarity; Elementary and Advanced Algebra banked
 * the function idea and the inverse machine. THIS book introduces the
 * great periodic family: the trigonometric functions defined on the unit
 * circle (not merely on the acute right triangle), their graphs and
 * behaviour, the transformation formulas, the equations they solve, their
 * inverses with principal values, and the triangle fully measured — sine
 * and cosine rules, half-angle formulas, the centres and circles of a
 * triangle, and solutions of triangles. One Drive note recorded honestly:
 * the M1 module opens with 'Logarithm and Its Properties' as a tool
 * chapter — that ground belongs to Advanced Algebra chapter 9
 * (Exponentials and Logarithms) and is cross-referenced there, never
 * re-taught here. It hands off to Differential Calculus (the periodic
 * family meets the derivative) and to Coordinate Geometry's parametric
 * forms (mutual cross-references).
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): the Cengage M1
 *   'Trigonometry' module — 7 chapter PDFs, TOCs vision-extracted this
 *   pass (Logarithm and Its Properties [→ AA ch 9, cross-referenced];
 *   Trigonometric Functions incl. radian measure and allied angles;
 *   Trigonometric Ratios and Transformation Formulas incl. compound
 *   angles, multiple angles, conditional identities and range-finding by
 *   substitution; Trigonometric Equations incl. the sin x = sin α family
 *   and max/min methods; Properties and Solutions of Triangle incl. sine
 *   rule, Napier's formula, the m–n theorem, circumcircle/incircle/
 *   orthocentre/centroid and the excentral triangle; Height and Distance;
 *   Inverse Trigonometric Functions incl. principal values and identities)
 *   — maps to chapters 1–7. The classic S. L. Loney 'Trigonometry'
 *   (Drive copy, scanned) owns the depth stretch for chapters 3, 6 and 7
 *   in the Hall & Knight tradition.
 * - Syllabus audit (web-checked 2026-11-10): NCERT class 10 ch. 8
 *   Introduction to Trigonometry + ch. 9 Some Applications of Trigonometry;
 *   class 11 ch. 3 Trigonometric Functions; class 12 ch. 2 Inverse
 *   Trigonometric Functions; JEE Main 2026 unit 7 (Trigonometry:
 *   identities and equations, functions, inverse trigonometric functions
 *   and their properties) — heights and distances is no longer named in
 *   the current JEE Main list (removed in the 2024 revision) — an honest
 *   note this plan records while keeping chapter 7 for fundamentals and
 *   aptitude exams (Khattar QA chapters 35–36 carry the aptitude side);
 *   OpenStax Precalculus 2e chapters 5–8 as the sequencing cross-check.
 * - Exam types (the module's own typology): Concept Application Exercises
 *   inline; Single Correct Answer, Multiple Correct Answers, Linked
 *   Comprehension, Matrix Match, Numerical Value Type; JEE Archives.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'angles-and-their-measure',
    title: 'Angles and Their Measures',
    summary:
      'The chapter that generalizes the angle: from the acute triangle angle to rotation, measured in degrees and in radians — the arc-length definition that makes π the natural unit — with conversions, the relation between radians and real numbers, arc length and sector area. The reason radians win: the derivative formulas of calculus demand them, said now and cashed in Differential Calculus.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'From Triangles to Rotation: the Generalized Angle',
      'Radian Measure and the Arc',
      'Arc Length and Sector Area',
    ],
  },
  {
    number: 2,
    slug: 'trigonometric-functions',
    title: 'Trigonometric Functions and Their Graphs',
    summary:
      'The six functions built twice — first as right-triangle ratios (with the standard-angle table), then honestly as circular functions of any angle: signs by quadrant, the unit-circle definitions, periodicity read off the graph of each family, and the allied-angle machinery (n × 90° ± θ, even and odd cases). The fundamental identities (sin² + cos² = 1 and kin) proved from the circle, not memorized.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ratios of Acute Angles and the Standard Table',
      'The Unit Circle: Functions of Any Angle',
      'Graphs, Periodicity and Behaviour',
      'Allied Angles: the n × 90° ± θ Machine',
    ],
  },
  {
    number: 3,
    slug: 'transformation-formulas',
    title: 'The Transformation Formulas',
    summary:
      'The algebra of the family: compound-angle formulas for sine and cosine derived geometrically, then tangent; the expression a cos x + b sin x as a single shifted wave; product-to-sum and sum-to-product transformations; multiple and submultiple angles; the typical-angle value techniques; sums of sines/cosines in arithmetic progression; conditional identities; and range-hunting by trigonometric substitution — the JEE heartland, all derived before use.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Compound Angles: the Sum and Difference Formulas',
      'a cos x + b sin x: the Shifted Wave',
      'Product\u2013Sum Transformations',
      'Multiple Angles and Typical Values',
      'Conditional Identities and Range Hunting',
      'Summation of Trigonometric Series',
    ],
  },
  {
    number: 4,
    slug: 'trigonometric-equations',
    title: 'Trigonometric Equations',
    summary:
      'Solving in a family that repeats: the general solutions of sin x = sin α, cos x = cos α, tan x = tan α; squared-function equations; the a cos x + b sin x = c type with its existence condition; equations solved by exploiting maxima and minima; graphical solutions; and trigonometric inequalities — the module\u2019s full arc, with the lost-solutions discipline (squaring and dividing hazards) taught explicitly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'General Solutions: the sin/cos/tan Families',
      'Squared and Mixed Forms, and the Existence Condition',
      'Max\u2013Min, Graphical and Inequality Methods',
    ],
  },
  {
    number: 5,
    slug: 'inverse-trigonometric-functions',
    title: 'Inverse Trigonometric Functions',
    summary:
      'Advanced Algebra\u2019s inverse-machine theory cashed on the periodic family: why no trig function is invertible as-is, the principal-value restrictions, the graphs of all six inverses, the f(f⁻¹(x)) and f⁻¹(f(x)) principal-value discipline, relations among the inverses (negatives, reciprocals, complementary angles), sums and differences expressed as a single inverse, multiple angles, and substitution techniques — the NCERT class 12 arc at JEE depth. The principal values of sec⁻¹(sec x), cosec⁻¹(cosec x) and cot⁻¹(cot x) — the classic exam discipline the module’s chapter drills — named explicitly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why the inverses need principal values',
      'The Principal-Value Discipline: f\u207b\u00b9(f(x)) and f(f\u207b\u00b9(x))',
      'Relating the Inverses',
      'Sums, Differences and Multiple Angles as One Inverse',
    ],
  },
  {
    number: 6,
    slug: 'properties-of-triangles',
    title: 'Properties of Triangles',
    summary:
      'The triangle fully measured: the sine rule with its radius-of-circumcircle form, Napier\u2019s formula and the m\u2013n theorem, the cosine and projection rules, half-angle formulas, the area in its many forms, the complete solution-of-triangles census (SSS, SAS, ASA, AAS, the ambiguous SSA, AAA), and the triangle\u2019s centres and circles — circumcircle, incircle, excentral, orthocentre and centroid, pedal and orthic triangles — the classic Loney heartland, every formula derived. The centres named with their radii — the circumcentre with the circumcircle’s R, the incentre with the incircle’s r, the exradii of the excircles — and the centroid with its medians, the medians’ 2:1 division priced exactly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sine Rule and Its Consequences',
      'The Cosine and Projection Rules',
      'Half-Angle Formulas and the Area of a Triangle',
      'Solutions of Triangles: the Six Cases',
      'Centres and Circles of a Triangle',
      'The Orthocentre, Centroid and the Pedal Triangle',
      'The Excircles: Excentres, Exradii and Their Distances',
      'Quadrilaterals and Regular Polygons',
    ],
  },
  {
    number: 7,
    slug: 'heights-and-distances',
    title: 'Heights and Distances',
    summary:
      'The classic application: angles of elevation and depression, towers and objects, two-observation stations, the ambiguous cases, and the craft problems aptitude exams love. Kept honestly with the note that the current JEE Main list no longer names heights and distances — the chapter stands on its fundamentals value and its aptitude-exam reach (Khattar QA ch. 36 owns the speed-work side). Loney’s dip of the horizon — the radius-and-height model that ties small angles to the sphere you stand on — banked as the classic closing application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Elevation, Depression and the Right Setup',
      'Two Stations and the Ambiguous Cases',
      'The Craft Problems',
      'Ratios of Small Angles and the Dip of the Horizon',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: competition trigonometry at speed (identity cascades, inverse-value equations, the maxima/minima of trigonometric expressions, triangle problems with the centres), the book in one page (the formula map from radians to solutions of triangles), and the doorstep itself: the periodic family is calculus\u2019s next customer — sin x\u2019s slope puzzle named as the question Differential Calculus answers first.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Competition Trigonometry: the Craft',
      'The Book in One Page: the Formula Map',
      'The Doorstep: the Periodic Family Meets the Slope',
    ],
  },
]

export const trigonometry: Book = {
  id: 'trigonometry',
  title: 'Trigonometry',
  subtitle: 'The triangle measured, the circle\u2019s functions — the periodic family',
  discipline: 'mathematics',
  level: 'Class 9\u201312 trigonometry \u2192 the calculus doorstep',
  description:
    'The book of the great periodic family. Angles generalized from triangles to rotation and measured in radians; the six trigonometric functions built on the unit circle with their graphs, periodicity and allied-angle machinery; the transformation formulas (compound angles, products and sums, multiple angles, conditional identities) all derived before use; general solutions of trigonometric equations with the lost-solutions discipline; the inverse functions with their principal values; the triangle fully measured — sine and cosine rules, half-angle formulas, solutions of triangles and every centre and circle; and the heights-and-distances applications. One honest note recorded: the Drive module\u2019s logarithm chapter belongs to Advanced Algebra\u2019s exponential book and is cross-referenced, never duplicated. Cross-references Geometry, Advanced Algebra and Coordinate Geometry; hands off to Differential Calculus.',
  status: 'planned',
  accent: ['#be185d', '#9f1239'],
  chapters,
}
