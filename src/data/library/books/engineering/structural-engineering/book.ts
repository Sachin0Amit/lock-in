import type { Book, Chapter } from '../../../types'

/**
 * Structural Engineering — the thirtieth book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `str-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Structural Engineering owns structural analysis and the IS-code design craft (GATE CE S2’s Structural Engineering register). Strength of Materials (mechanical) owns the underlying mechanics of simple members; Building Materials owns the material science of concrete and steel; Geotechnical Engineering owns the soil the structure stands on (the interface chapter cross-referenced); Machine Design owns the machine idiom of joints and fatigue; the seismic and bridge depth are future books (honestly named).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 2 'Structural Engineering' (CE_2026_Syllabus.pdf,
 *   extracted this pass): 'Engineering Mechanics: System of forces, free-body
 *   diagrams, equilibrium equations; Internal forces in structures; Frictions and
 *   its applications; Centre of mass; Free Vibrations of undamped SDOF system.
 *   Solid Mechanics: Bending moment and shear force in statically determinate
 *   beams; Simple stress and strain relationships; Simple bending theory, flexural
 *   and shear stresses, shear centre; Uniform torsion, Transformation of stress;
 *   buckling of column, combined and direct bending stresses. Structural Analysis:
 *   Statically determinate and indeterminate structures by force/energy methods;
 *   Method of superposition; Analysis of trusses, arches, beams, cables and frames;
 *   Displacement methods: Slope deflection and moment distribution methods;
 *   Influence lines; Stiffness and flexibility methods of structural analysis.
 *   Construction Materials and Management ... Concrete Structures: Working stress
 *   and Limit state design concepts; Design of beams, slabs, columns; Bond and
 *   development length; Prestressed concrete beams. Steel Structures: Working
 *   stress and Limit state design concepts; Design of tension and compression
 *   members, beams and beam-columns, column bases; Connections — simple and
 *   eccentric, beam-column connections, plate girders and trusses; Concept of
 *   plastic analysis — beams and frames' — the solid-mechanics lines route to
 *   Strength of Materials (cross-referenced) and the analysis/design lines are
 *   this book's register.
 * - R.C. Hibbeler, Structural Analysis — the TOC web-checked this pass from the
 *   Pearson page and search records (types of structures and loads; determinacy;
 *   analysis of statically determinate structures; deflections; influence lines;
 *   the force and displacement methods; the stiffness-matrix chapters); Vazirani &
 *   Ratwani and Ramamrutham named as the Indian poles; Punmia's RCC Design and
 *   the IS 456/800 arcs named for the design half.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-structural-frame',
    title: 'The Structural Frame',
    summary:
      'The structure census (beams, columns, trusses, arches, slabs, walls) with their honest load paths; the load census (dead, live, wind, seismic named); determinacy and stability judged (the degree-of-static-indeterminacy craft); modelling judgment as the analyst\u2019s first honesty; and the mechanics inheritance from Engineering Mechanics and Strength of Materials cross-referenced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structure and Load Censuses',
      'Determinacy Judged',
      'Modeling Judgment as Honesty',
    ],
  },
  {
    number: 2,
    slug: 'determinate-beams-and-frames',
    title: 'Statically Determinate Beams and Frames',
    summary:
      'Internal forces (axial, shear, moment) and their diagrams drawn fluently for beams and simple frames (the differential relations cross-referenced from Strength of Materials); the cable and three-hinged arch analysed (the thrust craft); moving-load introduction; and the determinate census solved end-to-end.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Diagrams Drawn Fluently',
      'Cables and Three-Hinged Arches',
      'The Determinate Census Solved',
    ],
  },
  {
    number: 3,
    slug: 'trusses',
    title: 'Trusses',
    summary:
      'The truss idea (the two-force-member honesty); the method of joints and the method of sections worked at structural scale; zero-force members read honestly; compound and complex trusses glanced; space trusses named; and the truss as the bridge and roof vocabulary it actually is.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Joints and Sections at Scale',
      'Zero-Force Members Read Honestly',
      'The Truss as Vocabulary',
    ],
  },
  {
    number: 4,
    slug: 'deflections-and-influence-lines',
    title: 'Deflections and Influence Lines',
    summary:
      'Deflection by the energy methods (Castigliano\u2019s theorem cashed at structural scale, the unit-load method) and the moment-area craft; influence lines — earned for determinate beams (the moving-load engine), used for absolute-maximum moment and the bridge census; the qualitative influence honesty for the indeterminate case named ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Castigliano Cashed at Scale',
      'Influence Lines Earned',
      'Absolute Maximum Moment Worked',
    ],
  },
  {
    number: 5,
    slug: 'force-methods',
    title: 'The Force Methods',
    summary:
      'The indeterminate idea priced (redundants as the bookkeeping); the classical force method — compatibility equations with the flexibility craft; the method of superposition GATE names; Maxwell\u2019s reciprocal theorem earned; and the honest verdict on which structures suit the force route.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Redundants as Bookkeeping',
      'Compatibility Earned',
      'Reciprocity and the Honest Verdict',
    ],
  },
  {
    number: 6,
    slug: 'displacement-methods',
    title: 'The Displacement Methods',
    summary:
      'The slope-deflection method earned (its equations and the end-moment bookkeeping); moment distribution learned as a fluent craft (the fixed-end-moment census, distribution and carry-over, the sway honesty); analysis of continuous beams and jointed frames worked end-to-end; and the two methods priced against each other honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Slope-Deflection Earned',
      'Moment Distribution, Fluent',
      'Frames Worked End-to-End',
      'The Two Methods Priced',
    ],
  },
  {
    number: 7,
    slug: 'matrix-stiffness',
    title: 'The Matrix Stiffness Method',
    summary:
      'The stiffness idea at matrix scale (the displacement route the computer speaks); beam and truss elements derived; transformation to global axes; the direct-stiffness assembly craft; boundary conditions and the solve; and the computer-adjacent honesty (what the software hides, what the engineer must still judge) with the CAD/CAM cross-reference.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Elements Derived',
      'Direct Stiffness Assembled',
      'The Solve and Its Judgment',
    ],
  },
  {
    number: 8,
    slug: 'concrete-design',
    title: 'Concrete Structures',
    summary:
      'Concrete\u2019s design philosophies — working stress versus limit state (IS 456\u2019s honest evolution); the limit-state craft — characteristic strength, partial safety factors, the design constants; beams (singly and doubly reinforced, the T-beam honesty), slabs (one-way and two-way), columns (short and the slender honesty) with the interaction craft; bond, development length and detailing; shear and torsion reinforcement; and prestressed concrete — the concept and losses priced (the GATE line).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Limit State Earned',
      'Beams and Slabs Designed',
      'Columns and Bond',
      'Prestressing and Its Losses',
    ],
  },
  {
    number: 9,
    slug: 'steel-design',
    title: 'Steel Structures',
    summary:
      'Steel\u2019s design philosophies to IS 800 (working stress and limit state); tension members designed (the net-section craft); compression members (the buckling routes from Strength of Materials cashed, the slenderness census); beams and beam-columns (the lateral-torsional honest note); connections — bolted and welded, simple and eccentric, the beam-column connection census; plate girders and trusses priced; and the plastic-analysis concept (the collapse-mechanism craft for beams and frames).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Tension and Compression Designed',
      'Beams and Beam-Columns',
      'Connections, Simple and Eccentric',
      'Plate Girders and Plastic Analysis',
    ],
  },
  {
    number: 10,
    slug: 'professional-synthesis-and-doorstep',
    title: 'The Professional Synthesis and the Doorstep',
    summary:
      'The synthesis — one page from determinacy to the codes; the codes census (IS 456, IS 800, IS 1893 named honestly as future doors); the modeling-judgment craft priced on a real building; the soil interface (the foundation demand handed to Geotechnical Engineering, cross-referenced); the seismic and bridge depth named as future books; and the construction-phase doorstep to Construction Management.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Synthesis Page',
      'A Building Priced on Judgment',
      'The Soil Interface Named',
      'The Future Doors Named Honestly',
    ],
  },
]

export const structuralEngineering: Book = {
  id: 'structural-engineering',
  title: 'Structural Engineering',
  subtitle: 'Determinacy to design codes — the analysis and design of load-bearing structures',
  discipline: 'engineering',
  level: 'First structures course → professional design-office readiness',
  description: 'The load-bearing discipline: the structural frame (structure types, load paths, determinacy — with Engineering Mechanics\u2019 equilibrium craft and Strength of Materials\u2019 stress machinery cross-referenced); statically determinate beams and internal-force diagrams; trusses, arches, cables and frames analysed; deflection of structures by energy methods (Castigliano cross-referenced) and the moment-area craft; influence lines for moving loads; the indeterminate world — the force (compatibility) methods; the displacement methods — slope-deflection and moment distribution learned as fluent crafts; the matrix stiffness method (beam and truss elements, direct stiffness, the computer-adjacent craft GATE names); and the design half — concrete design to IS 456 (working stress versus limit state, beams, slabs and columns, bond and development length, prestressed beams) and steel design to IS 800 (tension and compression members, beams and beam-columns, connections simple and eccentric, plate girders and trusses, the plastic-analysis concept); closing with the professional synthesis (the codes census, modeling judgment, the seismic glance). Cross-references Strength of Materials, Building Materials (the concrete and steel themselves), Construction Management and hands off to Geotechnical Engineering\u2019s foundation interface.',
  status: 'planned',
  accent: ['#374151', '#111827'],
  chapters,
}
