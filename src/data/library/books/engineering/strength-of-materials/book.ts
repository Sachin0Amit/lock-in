import type { Book, Chapter } from '../../../types'

/**
 * Strength of Materials — the second book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 64 planned lessons, zero written. Lesson ids will use the `som-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Strength of Materials owns the deformable body of simple members. Machine Design consumes it for element design; Structural Engineering (civil) consumes it for determinate beams and grows its own indeterminate machinery; Materials Science owns the microstructure story; thin-vessel and thick-cylinder extremes route here; testing cross-references Materials Science’s testing chapters.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 2, the 'Mechanics of Materials' line (ME_2026_Syllabus.pdf,
 *   extracted this pass): 'Stress and strain, elastic constants, Poisson's ratio; Mohr's
 *   circle for plane stress and plane strain; thin cylinders; shear force and bending
 *   moment diagrams; bending and shear stresses; concept of shear centre; deflection of
 *   beams; torsion of circular shafts; Euler's theory of columns; energy methods; thermal
 *   stresses; strain gauges and rosettes; testing of materials with universal testing
 *   machine; testing of hardness and impact strength' — every phrase is a planned lesson.
 * - GATE 2026 CE Section 2 'Solid Mechanics' line cross-checked (the civil register's
 *   subset — determinate beams, simple bending, uniform torsion, buckling).
 * - Beer, Johnston, DeWolf & Mazurek, Mechanics of Materials (the full Library of Congress
 *   catdir TOC read this pass: concept of stress; stress and strain under axial loading;
 *   torsion; pure bending; analysis and design of beams for bending; shearing stresses;
 *   transformations; principal stresses; deflection; columns; energy methods).
 * - Gere & Goodno web-checked as the second pole; Timoshenko's classic arc named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'stress-the-concept',
    title: 'Stress: the Concept',
    summary:
      'Internal forces revealed by sectioning; normal, shear and bearing stress with their units and sign conventions; stress on an oblique plane under axial loading; the components of stress under general loading; analysis versus design as two honest postures; and the design considerations that turn a stress into a dimension.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sectioning a Body: the Method of Internal Forces',
      'Normal, Shear and Bearing Stress',
      'Stress on the Oblique Plane',
      'When and How to Include the Output',
      'How to make pseudorandom bytes',
      'Appendix H Common Standard Component Values',
      'B.1 Notation 729 Component Values'
    ],
  },
  {
    number: 2,
    slug: 'strain-and-the-elastic-constants',
    title: 'Strain and the Elastic Constants',
    summary:
      'Normal strain under axial loading; the stress-strain diagram for ductile and brittle materials read on a real test — proportional limit, yield, strain hardening, necking, true stress and true strain; Hooke\u2019s law, the modulus E, Poisson\u2019s ratio and the shear modulus with the relation among them; the universal testing machine, hardness and impact testing as the laboratory census; elastic versus plastic behaviour and fatigue named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stress-Strain Diagram, Read Honestly',
      'Hooke, Poisson and the Shear Relation',
      'The Testing Laboratory: UTM, Hardness, Impact',
      'Resistors in Parallel 61 Practical Perspective: Strain Gages',
      'Practical Perspective: Strain Gages 171 Chapter 9 Sinusoidal Steady-State',
      'Semiconductor Materials 419 20.34 Common-mode rejection ratio'
    ],
  },
  {
    number: 3,
    slug: 'axial-members',
    title: 'Axial Members',
    summary:
      'Deformations under axial loading; statically indeterminate assemblies solved by compatibility; problems with temperature changes; Saint-Venant\u2019s principle, stress concentrations at discontinuities, and multiaxial loading with the generalised Hooke\u2019s law and bulk modulus; pressure-vessel and composite-member problems priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Indeterminate Assemblies by Compatibility',
      'Thermal Stresses and Their Bookkeeping',
      'Saint-Venant, Stress Concentrations, Multiaxial Loading',
      'Problems 355 Problems',
      'Problems 562 Introduction',
      'Final Remarks 1046 Problems',
      'Problems 50 Summary',
      'Problems 436 Problems',
      'Summary 476 Problems',
      'Introduction to Problems'
    ],
  },
  {
    number: 4,
    slug: 'torsion-of-circular-shafts',
    title: 'Torsion of Circular Shafts',
    summary:
      'The torsion formula earned from the geometry of a twisted circular shaft; angle of twist and power transmission; statically indeterminate shafts; design of transmission shafts; stress concentrations; and the honest limits — noncircular members and thin-walled hollow shafts named, not hidden.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Torsion Formula Earned',
      'Angle of Twist and Power Transmission',
      'Indeterminate Shafts and Design',
      'The Honest Limits: Noncircular and Thin-Walled',
    ],
  },
  {
    number: 5,
    slug: 'shear-force-and-bending-moment',
    title: 'Shear Force and Bending Moment Diagrams',
    summary:
      'The beam vocabulary (support and load types); internal forces in beams; shear and bending-moment diagrams drawn fluently with the load-shear-moment differential relations; singularity functions as the compact notation; design of prismatic beams for bending introduced — the craft every later structural and machine chapter assumes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Diagrams as a Fluent Craft',
      'Load, Shear and Moment: the Differential Relations',
      'Singularity Functions for Beam Bookkeeping',
      'The Depletion-Type MOSFET 291 7.2.1 The MOSFET Case',
      'Current-Source Loads 518 9.3.1 The MOS Case',
      'Input Common-Mode Range and Functions',
      'FET types',
      'Generating a differential output',
      'Complex Notation',
      'The NAND function',
      'Support the use of this textbook in teaching, please visit'
    ],
  },
  {
    number: 6,
    slug: 'bending-stresses',
    title: 'Bending Stresses in Beams',
    summary:
      'Pure bending of a symmetric member; the flexure formula derived from the strain geometry; section modulus and design; bending of members of several materials; eccentric axial loading and unsymmetric bending; and the flexural-shear formula with shear flow, shear in common cross-sections and the shear centre concept priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Flexure Formula Earned',
      'Section Modulus and Beam Design',
      'Shearing Stresses and Shear Flow',
      'The Shear Centre',
      '(BJTs) 304 7.3.3 The Common-Source (CS) and',
      'The Common-Source (Common',
      'A Common-Source (CS)',
      'A Common-Base (CB)',
      'Wiring: The Interconnect 1181 H. Filter Design Material',
      'Common-mode rejection',
      'With Symmetry 630 and Symmetric'
    ],
  },
  {
    number: 7,
    slug: 'transformations-mohr',
    title: 'Transformation of Stress and Strain',
    summary:
      'Plane stress transformation by the equations and by Mohr\u2019s circle — constructed honestly, read for principal stresses and maximum shear; plane strain transformation with Mohr\u2019s circle again; strain measurement by gauges and rosettes resolved into principal strains and stresses; thin cylinders under pressure as the first transformation application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Mohr\u2019s Circle for Plane Stress',
      'Mohr\u2019s Circle for Plane Strain',
      'Strain Gauges and Rosettes',
      'Thin Cylinders Under Pressure',
    ],
  },
  {
    number: 8,
    slug: 'deflection-of-beams',
    title: 'Deflection of Beams',
    summary:
      'The elastic curve; deflection and slope by the double-integration method with boundary and continuity conditions; Macaulay\u2019s method for discontinuous loads; the moment-area theorems; statically indeterminate beams by superposition; and non-prismatic beams named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Elastic Curve and Double Integration',
      'Macaulay\u2019s Method',
      'The Moment-Area Theorems',
      'Indeterminate Beams by Superposition',
    ],
  },
  {
    number: 9,
    slug: 'columns-and-energy-methods',
    title: 'Columns, Buckling and Energy Methods',
    summary:
      'Euler\u2019s theory of columns for the pin-ended case and every end condition census; slenderness ratio and the design implications; eccentric loading and secant formula named; then the energy close — strain energy of members, Castigliano\u2019s theorem applied to deflections, and impact loading priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Euler\u2019s Column and the End-Condition Census',
      'Slenderness: Buckling versus Crushing',
      'Castigliano\u2019s Theorem',
      'Strain Energy and Impact Loading',
      'Summary 292 7.2.2 The BJT Case',
      'The MOSFET Case',
      'The BJT Case'
    ],
  },
]

export const strengthOfMaterials: Book = {
  id: 'strength-of-materials',
  title: 'Strength of Materials',
  subtitle: 'How bodies carry load — stress, strain, torsion, bending, buckling and their honest crafts',
  discipline: 'engineering',
  level: 'First mechanics of materials course → machine and structural design readiness',
  description: 'The deformable body earned from Engineering Mechanics\u2019 statics: stress and strain with the elastic constants and Poisson\u2019s ratio; the stress-strain diagram read honestly on real materials with universal-testing-machine and hardness/impact testing; axial members with statically indeterminate assemblies, thermal effects and stress concentrations; torsion of circular shafts with power transmission; shear-force and bending-moment diagrams as a fluent craft; the flexure formula and bending of beams; shearing stresses in beams and the shear centre; transformation of stress and strain with Mohr\u2019s circle for both planes and strain-gauge rosettes; deflection of beams by double integration, Macaulay\u2019s method and moment-area; thin cylinders; Euler\u2019s theory of columns; and the energy methods (Castigliano) that close the mechanics. Cross-references Engineering Mechanics (the equilibrium engine), Materials Science (the microstructure beneath), Machine Design (the factors of safety this book prices) and hands off to Structural Engineering on the civil shelf for indeterminate analysis and design codes.',
  status: 'planned',
  accent: ['#a16207', '#78350f'],
  chapters,
}
