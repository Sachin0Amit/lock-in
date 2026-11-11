import type { Book, Chapter } from '../../../types'

/**
 * Abstract Algebra — the twenty-second book of the Mathematics shelf.
 *
 * STATUS: PLANNED (full-shelf planning pass, 2026-11-10) — 8 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `ab-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the shelf has computed inside
 * structures since the beginning — the integers (ANS), the rationals and
 * reals (ANS), the polynomials (AL ch. 3, AA ch. 8), the complex numbers
 * (AA ch. 3), matrices (Linear Algebra), residue classes (ANS ch. 5,
 * Number Theory). THIS book takes the STRUCTURE as the subject: what all
 * those systems share, proved once, applied everywhere — groups, then
 * rings and ideals (with F[x] and \u2124 as the lead examples the shelf
 * already owns), the polynomial-ring ground that gives Advanced Algebra
 * ch. 8's theory of equations its true home, and fields with the Galois
 * door (the quintic's insolubility honestly stated). It hands off to the
 * research frontier and every algebra-using book backwards.
 *
 * RESEARCH PHASE (2026-11-10):
 * - Drive (see docs/research/DRIVE_TOC_SURVEY.md): no dedicated abstract
 *   algebra reference on the Drive (honest note) — Hall & Knight's
 *   Higher Algebra (banked run 66) carries the classical equation
 *   theory AA ch. 8 already mined. The classic arcs are web-researched:
 *   Gallian's 'Contemporary Abstract Algebra' (Part 1 Integers and
 *   Equivalence Relations incl. preliminaries, then the group arc
 *   [Introduction to Groups, Finite Groups and Subgroups, Cyclic
 *   Groups, Permutation Groups, Isomorphisms, Cosets and Lagrange,
 *   External Direct Products, Normal Subgroups and Factor Groups, Group
 *   Homomorphisms, Fundamental Theorem of Finite Abelian Groups], the
 *   ring arc [Introduction to Rings, Ideals and Factor Rings, Ring
 *   Homomorphisms, Polynomial Rings, Factorization of Polynomials,
 *   Divisibility in Integral Domains], and the fields/extensions arc
 *   [Vector Spaces, Extension Fields, Finite Fields, Sylow and beyond])
 *   — chapter structure web-checked 2026-11-10; Rudin/Strang/Axler own
 *   the linear ground cross-referenced in the extensions chapter.
 * - Syllabus audit (web-checked 2026-11-10): no school/competitive
 *   scope — this is the standard first-course university arc; the GATE
 *   mathematics algebra scope (groups, rings, fields) as the Indian
 *   competitive-university anchor.
 * - Exam types: university-course problems (L5) in Gallian's exercise
 *   style; the shelf's own banked structures used as the worked example
 *   census (\u2124\u2099, F[x], the symmetries of Geometry's figures).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-abstract-viewpoint',
    title: 'The Abstract Viewpoint',
    summary:
      'Why abstraction: the shelf\u2019s own history re-read — the integers\u2019 laws (ANS), the rationals\u2019 field laws, the polynomials\u2019 division algorithm (AL), the complex field (AA), matrices\u2019 algebra (Linear Algebra), the residue classes (ANS ch. 5) — and the discovery that the SAME axioms price them all. Binary operations and their properties, isomorphism as \u2018same structure, different dress\u2019, and the structural reading discipline the whole book runs on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structures the Shelf Already Owns',
      'Binary Operations and Their Laws',
      'Isomorphism: Same Structure, Different Dress',
    ],
  },
  {
    number: 2,
    slug: 'groups',
    title: 'Groups',
    summary:
      'The first structure: the group axioms priced on the shelf\u2019s census (\u2124\u2099 from Number Theory, the symmetries of Geometry\u2019s triangle and square, the matrices Linear Algebra banked, the permutations), subgroups and their tests, cyclic groups (the order arithmetic Number Theory chapter 5 built — every generator fact cross-referenced), the symmetric groups and cycle notation, and the group-table reading discipline with Cayley\u2019s theorem named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Axioms and the Census',
      'Subgroups and Cyclic Groups',
      'Permutations and the Symmetric Groups',
      'Conjugacy Classes and the Class Equation',
    ],
  },
  {
    number: 3,
    slug: 'lagrange-and-cosets',
    title: 'Cosets and Lagrange',
    summary:
      'The counting theorem: cosets defined and computed, Lagrange\u2019s theorem PROVED (the group partitioned into equal cosets), and the consequence cascade — the order of an element divides the group\u2019s order, Fermat\u2019s little theorem RE-PROVED as a corollary (Number Theory\u2019s result shown to be group theory wearing a number-theoretic dress — the cross-reference both books demanded), the classification of small groups begun.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Cosets and the Partition',
      'Lagrange\u2019s Theorem, Proved',
      'Fermat Re-Proved: the Corollary Cascade',
      'The Sylow Theorems',
    ],
  },
  {
    number: 4,
    slug: 'normality-and-homomorphisms',
    title: 'Normality and Homomorphisms',
    summary:
      'Structure-preserving maps: group homomorphisms with kernel and image, normal subgroups (why normality is exactly what quotients demand — the multiplication-table test), factor groups built and computed on engineered examples, the isomorphism theorems stated with the first PROVED, and direct products. The chapter where \u2018same structure\u2019 becomes a theorem instead of an intuition.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Homomorphisms, Kernel and Image',
      'Normal Subgroups and Factor Groups',
      'The Isomorphism Theorems',
      'Direct Products and the Finite Abelian Classification',
    ],
  },
  {
    number: 5,
    slug: 'rings-and-ideals',
    title: 'Rings and Ideals',
    summary:
      'The second structure: ring axioms priced on the shelf\u2019s census (\u2124, the fields ANS built, the polynomials, the matrices — the last\u2019s non-commutativity and zero divisors as the honest counterexample bank), integral domains and units, ideals and quotient rings (\u2124\u2099 as \u2124/\u2018n\u2019 — ANS\u2019s congruence classes unmasked), ring homomorphisms, and the prime/maximal ideal census with the field-quotient correspondence.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ring Axioms and the Census',
      'Domains, Units and Zero Divisors',
      'Ideals and Quotient Rings',
      'Prime and Maximal Ideals',
    ],
  },
  {
    number: 6,
    slug: 'polynomial-rings-and-factorization',
    title: 'Polynomial Rings and Factorization',
    summary:
      'The shelf\u2019s oldest friend, finalized: F[x] as a Euclidean domain (the division algorithm AL used, PROVED at ring level), irreducibility and the unique-factorization theorem (ANS\u2019s fundamental theorem of arithmetic re-proved for polynomials — the parallel drawn explicitly), the irreducibility tests (rational-root, mod-p reduction, Eisenstein\u2019s criterion PROVED), quotient rings F[x]/\u27e8p(x)\u27e9, and root fields — Advanced Algebra ch. 8\u2019s equation theory finding its structural home.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'F[x] as a Euclidean Domain',
      'Unique Factorization, Re-Proofed',
      'Eisenstein and the Irreducibility Tests',
      'Quotient Rings and Root Fields',
      'The Hierarchy: Euclidean, Principal, Unique',
    ],
  },
  {
    number: 7,
    slug: 'fields-and-the-galois-door',
    title: 'Fields and the Galois Door',
    summary:
      'The classical endgame: fields and their prime subfields, extension fields and degrees (Linear Algebra\u2019s dimension doing the counting), finite fields classified (the order census with existence named honestly), the constructibility question ANSWERED (Geometry\u2019s impossible constructions — angle trisection, cube doubling — proved impossible by degree arguments, the promise Geometry\u2019s chapter 7 made), and the Galois door: solvable groups and the insolubility of the quintic stated with its history verified (Abel and Galois, dated accurately).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Extension Fields and Degrees',
      'Finite Fields, Classified',
      'The Impossible Constructions, Proved',
      'The Quintic and the Galois Door',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: the structure map (one page from the axioms to the Galois correspondence — the whole book as a single diagram), the craft census (the subgroup/ideal recognition drill at course-exam level), and the doorsteps named honestly: algebraic number theory (Number Theory\u2019s algebraic road completed), algebraic topology (Topology\u2019s fundamental group as algebra reading shape — the cross-reference chapter 7 of that book asks for), representation theory named, and category theory named as the mathematician\u2019s second-order language (the Foundations book\u2019s doorway).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structure Map: Axioms to Galois',
      'The Craft Census',
      'The Doorsteps: Number Theory, Topology and Beyond',
    ],
  },
]

export const abstractAlgebra: Book = {
  id: 'abstract-algebra',
  title: 'Abstract Algebra',
  subtitle: 'The structures themselves — groups, rings, fields, the Galois door',
  discipline: 'mathematics',
  level: 'First-course university algebra \u2192 the research doorstep',
  description:
    'The book that takes structure as the subject. The abstract viewpoint earned from the shelf\u2019s own history (the integers, rationals, polynomials, complex numbers, matrices and residue classes as the example census); groups with cyclic groups, permutations and the symmetric groups; cosets and Lagrange PROVED with Fermat\u2019s little theorem re-proved as a corollary; homomorphisms, normal subgroups and factor groups with the isomorphism theorems; rings and ideals with \u2124\u2099 unmasked as \u2124/\u27e8n\u27e9; polynomial rings with unique factorization re-proved, Eisenstein\u2019s criterion and root fields — Advanced Algebra\u2019s equation theory finding its structural home; and the classical endgame — finite fields classified, Geometry\u2019s impossible constructions PROVED impossible, and the quintic\u2019s insolubility stated with verified history. Cross-references Arithmetic and Number Systems, Elementary and Advanced Algebra, Geometry and Linear Algebra; hands off to the research frontier.',
  status: 'planned',
  accent: ['#9d174d', '#831843'],
  chapters,
}
