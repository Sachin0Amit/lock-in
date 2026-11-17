import type { Book, Chapter } from '../../../types'

/**
 * CAD/CAM — the eleventh book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 39 planned lessons, zero written. Lesson ids will use the `cad-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): CAD/CAM owns the digital product chain and additive manufacturing. Manufacturing Processes owns the subtractive/joining process physics (CNC machines appear there; part programs live here); Robotics and Automation owns the robot cell; Industrial Engineering owns the production planning; the mathematical machinery of geometric transformations and spline mathematics routes to the Mathematics shelf’s coordinate geometry and linear-algebra books (cross-referenced).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 4, the 'Computer Integrated Manufacturing' line
 *   (ME_2026_Syllabus.pdf, extracted this pass): 'Basic concepts of CAD/CAM and their
 *   integration tools; additive manufacturing' — the register this book owns.
 * - Groover, Automation, Production Systems, and CIM — the Pearson TOC tab read this
 *   pass (the CAD/CAM chapters inside the automation-technologies part, numerical
 *   control, industrial robotics chapters boundary-checked against Robotics).
 * - Zeid's CAD/CAM Handbook named as the depth pole; the NURBS arc cross-checked
 *   against the Mathematics shelf's coordinate-geometry spline lessons.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-digital-chain',
    title: 'The Digital Product Chain',
    summary:
      'CAD, CAM and CIM located honestly in the product-realisation cycle (design analysis, process planning, production); the integration-tools census the GATE register names; the data ladder — geometry, features, process, resource; and a history honest note (from drafting boards to parametric feature-based CAD).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'CAD, CAM, CIM Located',
      'The Integration-Tools Census',
      'The Data Ladder',
      'The Oscillation Criterion 1068 16.2 Digital Logic Inverters',
      'Multiplexed LED digital display',
      'On-board interconnections',
      'R–2R ladder DACs',
      'The AND function 533 25.9 Digital or analogue?',
      'Digital oscilloscope 950 Index'
    ],
  },
  {
    number: 2,
    slug: 'geometric-modelling',
    title: 'Geometric Modelling',
    summary:
      'Wireframe, surface and solid modelling distinguished by what they know; constructive solid geometry by primitives and booleans; boundary representation (euler operators glanced); modelling transformations (translation, rotation, scaling, mirroring) with the homogeneous-matrix craft cross-referenced to Linear Algebra and Coordinate Geometry; and feature-based parametric modelling as the modern practice.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Wireframe, Surface, Solid',
      'CSG and B-rep',
      'Transformations by Matrices',
      'Feature-Based Parametric Practice',
    ],
  },
  {
    number: 3,
    slug: 'curves-and-surfaces-for-design',
    title: 'Curves and Surfaces for Design',
    summary:
      'Why designed curves need control (the interpolation-versus-approximation honesty); Bezier curves — Bernstein blends, control points and their properties; B-splines — the knot vector and local control earned; NURBS as the industry\u2019s one curve; tensor-product surfaces and trimmed surfaces glanced; and the surface- quality vocabulary (curvature, continuity) priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bezier: Bernstein Blends',
      'B-splines and Local Control',
      'NURBS: the Industry\u2019s One Curve',
      'Surfaces and Their Continuity',
    ],
  },
  {
    number: 4,
    slug: 'cad-data-and-standards',
    title: 'CAD Data, Standards and PDM',
    summary:
      'Native versus neutral formats; IGES and STEP priced honestly (what survives translation); drawing standards and model-based definition glanced; product-data management and engineering-change control; and the versioning honesty software engineering would recognise (the CS shelf cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'IGES and STEP Priced',
      'Model-Based Definition Glanced',
      'PDM and Change Control',
      'Step 3: getting to e_n',
      'A.1 Preliminary Steps'
    ],
  },
  {
    number: 5,
    slug: 'nc-and-cnc-programming',
    title: 'NC, CNC and Part Programming',
    summary:
      'Numerical control located (from punch tape to modern controllers); the coordinate systems and codes — G and M vocabulary learned as a language; part programs written for turning and milling (straight-cut, circular interpolation, canned cycles, tool offsets, cutter compensation); APT named; manual versus CAM-generated programs priced; and DNC and adaptive control glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The G/M Vocabulary as a Language',
      'A Turning Program Written',
      'A Milling Program Written',
      'CAM-Generated and Adaptive',
    ],
  },
  {
    number: 6,
    slug: 'additive-manufacturing',
    title: 'Additive Manufacturing',
    summary:
      'The layer-wise idea and its honest economics; the process census by the ASTM families — vat photopolymerisation, material extrusion (FDM), powder-bed fusion (SLS/DMLS/SLM), binder jetting, material jetting, directed-energy deposition, sheet lamination; process selection by material and geometry; design for additive (support strategy, orientation, lattice structures); post-processing; and the AM applications census (prototyping, tooling, end-use parts, bioprinting named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Layer-Wise Idea',
      'The Seven Process Families',
      'Design for Additive',
      'The Applications Census',
    ],
  },
  {
    number: 7,
    slug: 'cim-and-the-factory-ladder',
    title: 'CIM and the Factory Ladder',
    summary:
      'Computer-integrated manufacturing as the honest integration claim (and its honest difficulty); computer-aided process planning (variant versus generative); flexible manufacturing systems and cells; cell control and SCADA glanced; machine-data collection and OEE; and the standards census that lets the ladder\u2019s levels speak.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'CIM: the Honest Integration',
      'CAPP: Variant and Generative',
      'FMS and Cell Control',
      'Machine Data and OEE',
      'Stand-alone versus integrated'
    ],
  },
  {
    number: 8,
    slug: 'industry-4-synthesis',
    title: 'Industry 4.0 and the Synthesis',
    summary:
      'The digital thread drawn end-to-end (a part modelled, simulated, programmed, printed or cut, measured and traced); the digital twin named honestly; industrial IoT and cloud manufacturing routed to the CS shelf\u2019s Internet of Things and Cloud Computing (cross-referenced); cybersecurity\u2019s OT honest note (the CS shelf\u2019s Cybersecurity book cross-referenced); and the mechanical branch\u2019s synthesis — the eleven books\u2019 map on one page.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Digital Thread Drawn',
      'The Digital Twin Named Honestly',
      'OT Security Named',
      'The Mechanical Branch\u2019s Map',
    ],
  },
]

export const cadCam: Book = {
  id: 'cad-cam',
  title: 'CAD/CAM',
  subtitle: 'The digital product chain — geometric modelling, CNC programming and additive manufacturing',
  discipline: 'engineering',
  level: 'First CAD/CAM course → CIM and digital-manufacturing readiness',
  description: 'The digital chain from concept to part: CAD/CAM/CIM located in the product realisation cycle; geometric modelling — wireframe, surface and solid (CSG and B-rep) with transformations cross-referenced to the Mathematics shelf\u2019s coordinate geometry and linear algebra; curves and surfaces for design (Bezier, B-spline and NURBS arcs priced at engineering depth); CAD data exchange and standards (IGES, STEP) with PDM glanced; computer-aided part programming — NC and CNC with G/M-code part programs written honestly, APT named, and the CNC machine cross-referenced to Manufacturing Processes; additive manufacturing — the process census (VAT photopolymerisation, material extrusion, powder-bed fusion, binder jetting, directed-energy deposition, sheet lamination), design for AM and its honest economics; computer-integrated manufacturing — CAPP, FMS, cell control and the factory data ladder; and the Industry 4.0 synthesis (the digital thread, digital twin named). Cross-references Manufacturing Processes (the processes being digitised), Robotics and Automation (the cells), Industrial Engineering (the production layer) and hands off to the Computer Science shelf\u2019s Internet of Things.',
  status: 'planned',
  accent: ['#7c3aed', '#5b21b6'],
  chapters,
}
