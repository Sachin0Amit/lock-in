import type { Book, Chapter } from '../../../types'

/**
 * Advanced Mathematical Foundations — the twenty-seventh and closing
 * book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 7 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `af-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the shelf\u2019s capstone, in the
 * house manner of Foundation Mathematics 11.2, Arithmetic and Number
 * Systems 10.3 and Elementary Algebra 11.2 \u2014 but for the WHOLE
 * shelf. No new subject matter: the 26 earlier books\u2019 maps drawn as
 * one ladder, the proof standard at research level, the problem-solving
 * craft at its graded peak, the unifying lenses named honestly (structure,
 * symmetry, mapping \u2014 category theory described accurately as the
 * mathematician\u2019s second-order language, never mystified), the great
 * open problems presented as doors with their status verified, and the
 * reading-writing-entering craft for research mathematics. It hands off
 * to the graduate frontier and to the other ten disciplines\u2019 shelves.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): no single reference
   (the capstone draws on the whole shelf) \u2014 the verified-facts list
   is web-researched: the Clay Millennium Problems (the Riemann
   hypothesis, P versus NP, Navier\u2013Stokes existence and smoothness \u2014
   status checked 2026-11-10: all three remain open; P versus NP
   unsolved; the Riemann hypothesis unproven), the classic open
   questions (Goldbach\u2019s conjecture and the twin-prime conjecture
   unproven, with Zhang\u2019s 2013 bounded-gaps breakthrough verified;
   Collatz unproven; the abc conjecture\u2019s Mochizuki controversy noted
   honestly), and the prize landscape (Fields Medal, Abel Prize) named
   accurately.
 * - Syllabus audit (web-checked 2026-11-10): no exam scope \u2014 this is
   the transition book (the shelf\u2019s L6 levels); the reading list
   follows the standard graduate-entry recommendations (Rudin\u2019s
   Real and Complex Analysis, Munkres, Lang\u2019s Algebra named as the
   next steps with the Drive\u2019s and the library\u2019s own holdings
   noted).
 * - Exam types: none \u2014 the Putnam/olympiad capstone craft (L6) and
   research-entry problems; the book\u2019s own synthesis typology
   (ladder-map exercises, proof critiques, paper-reading protocols).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-ladder-in-one-view',
    title: 'The Ladder in One View',
    summary:
      'The whole mathematics shelf as one climb: counting and place value (Foundation Mathematics) through the number systems (ANS), the algebra arc (Elementary and Advanced), geometry\u2019s proof discipline and the analytic lines (Coordinate Geometry, Trigonometry), the calculus sequence (Differential, Integral, Multivariable, Differential Equations), the structural books (Linear and Abstract Algebra, Discrete Mathematics, Number Theory, Set Theory, Logic, Combinatorics), the probabilistic pair (Probability, Statistics), and the depth rungs (Real and Complex Analysis, Topology, Numerical Analysis, Methods, Operations Research) \u2014 each book\u2019s doorstep-to-doorstep chain drawn as the single map it became.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Shelf as One Climb',
      'The Doorstep Chain, Traced End to End',
      'Where Every Reader Stands',
    ],
  },
  {
    number: 2,
    slug: 'the-research-standard-of-proof',
    title: 'The Standard of Proof at Research Level',
    summary:
      'The craft\u2019s highest register: the proof genres across the shelf compared (the Euclidean two-column, the \u03b5-\u03b4 template, the diagram-chase, the counting argument, the structural proof), the writing discipline of papers (theorem\u2013proof\u2013remark anatomy, the hypothesis\u2019s honest load), proof critique PRACTISED (classic subtle errors analyzed \u2014 induction\u2019s off-by-one, the divergent-series trap, the overlooked boundary case), and the referee\u2019s eye as the final standard.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Proof Genres, Compared',
      'The Anatomy of a Paper',
      'Proof Critique, Practised',
    ],
  },
  {
    number: 3,
    slug: 'problem-solving-at-the-frontier',
    title: 'Problem-Solving at the Frontier',
    summary:
      'The six levels\u2019 capstone: the olympiad craft\u2019s full arsenal (the invariants, extremal principle, clever bijections, the generating-function reflex \u2014 Combinatorics\u2019 engines at competition speed), the Putnam-style integration (problems that cross book boundaries \u2014 algebra wearing analysis\u2019s coat, geometry speaking number theory), Polya\u2019s heuristics at the frontier, and the research problem\u2019s anatomy (how a question becomes a conjecture becomes a theorem).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Polya\u2019s Method: Understand, Plan, Execute, Look Back',
      'The Olympiad Arsenal',
      'The Putnam-Style Integration',
      'How a Question Becomes a Theorem',
    ],
  },
  {
    number: 4,
    slug: 'structure-symmetry-mapping',
    title: 'Structure, Symmetry, Mapping',
    summary:
      'The unifying lenses named honestly: structure (the algebraic census \u2014 group, ring, field, vector space, topological space \u2014 as ONE idea: axioms priced on examples), symmetry (the group action reading \u2014 Geometry\u2019s figures, the polynomial\u2019s Galois group, physics\u2019s conservation laws named ahead), and mapping (the structure-preserving function as mathematics\u2019s true verb), closing with category theory described accurately \u2014 objects and morphisms, the functor\u2019s career \u2014 as the mathematician\u2019s second-order language, its power and its limits both stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Structure: the Axioms as One Idea',
      'Symmetry: the Group Action Reading',
      'Mapping and the Categorical Language',
    ],
  },
  {
    number: 5,
    slug: 'the-great-open-problems',
    title: 'The Great Open Problems',
    summary:
      'The doors presented with verified status: the Riemann hypothesis (unproven \u2014 the zeta function\u2019s zeros and the primes\u2019 music, Complex Analysis\u2019s doorstep cashed), P versus NP (unsolved \u2014 the counting and computation books\u2019 shared question), Navier\u2013Stokes (open \u2014 the equation the Methods book solves in special cases), Goldbach and the twin primes (unproven, with Zhang\u2019s 2013 bounded-gaps breakthrough and the Maynard\u2013Tao refinements noted accurately), Collatz (unproven), and the honest lesson: the shelf\u2019s reader now stands where the map ends and the territory begins.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Riemann Hypothesis',
      'P versus NP',
      'The Primes\u2019 Open Questions',
      'Where the Map Ends',
    ],
  },
  {
    number: 6,
    slug: 'reading-and-writing-research',
    title: 'Reading and Writing Research Mathematics',
    summary:
      'The literature\u2019s craft: how a paper is actually read (the three-pass protocol \u2014 abstract\u2013structure\u2013details), the literature\u2019s anatomy (journals, the arXiv named honestly, monographs, the survey as the newcomer\u2019s friend), mathematical writing\u2019s standards (LaTeX named as the medium, the notation\u2019s discipline), and the collaboration-and-seminar culture described for the entering student \u2014 with the shelf\u2019s books mapped to the standard first graduate texts they lead into.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Pass Read',
      'The Literature\u2019s Anatomy',
      'Typesetting Mathematics: TeX and the Written Look',
      'Writing Mathematics',
      'The Culture of the Seminar',
    ],
  },
  {
    number: 7,
    slug: 'the-doorstep-beyond',
    title: 'The Doorstep Beyond',
    summary:
      'The final chapter of the mathematics shelf: the graduate landscape\u2019s honest map (pure \u2014 analysis, algebra, geometry/topology, logic; applied \u2014 numerics, OR, probability/statistics; the interdisciplinary bridges), the other ten disciplines\u2019 mathematical needs mapped to the shelf\u2019s books (physics\u2019s Methods, computer science\u2019s Discrete Mathematics and Logic, economics\u2019s Optimization \u2014 the cross-shelf handoffs made explicit), and the closing page \u2014 the reader who started at counting now owns the language; what remains is to speak something new in it.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Graduate Landscape',
      'The Other Shelves\u2019 Mathematics',
      'The Closing Page',
    ],
  },
]

export const advancedMathematicalFoundations: Book = {
  id: 'advanced-mathematical-foundations',
  title: 'Advanced Mathematical Foundations',
  subtitle: 'The capstone — the whole ladder, the open doors, the frontier',
  discipline: 'mathematics',
  level: 'The shelf\u2019s capstone \u2192 the graduate frontier',
  description:
    'The closing book of the mathematics shelf \u2014 the capstone in the house manner. The whole ladder in one view: the twenty-six earlier books\u2019 doorstep chains drawn as a single map from counting to the Lebesgue theory. The research standard of proof: the proof genres compared, the paper\u2019s anatomy, proof critique practised on classic subtle errors. Problem-solving at the frontier: the olympiad arsenal at speed, the Putnam-style cross-boundary problems, and how a question becomes a theorem. The unifying lenses \u2014 structure, symmetry, mapping \u2014 with category theory described accurately and never mystified. The great open problems presented as doors with their verified status (Riemann, P versus NP, Navier\u2013Stokes, Goldbach, twin primes, Collatz). And the reading-writing-entering craft for research mathematics, closing with the other disciplines\u2019 mathematical needs mapped back to the shelf. Cross-references every book on the shelf; hands off to the graduate frontier.',
  status: 'planned',
  accent: ['#44403c', '#292524'],
  chapters,
}
