import type { Book, Chapter } from '../../../types'

/**
 * Machine Design — the fourth book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `md-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Machine Design owns the sizing of machine elements under static and fatigue loading. Strength of Materials owns the underlying stress machinery; Materials Science owns microstructure and heat treatment; Theory of Machines owns the kinematic catalogue; the bolted/riveted/welded joint craft is shared honestly with Structural Engineering (civil), which routes its steel-connection design through IS codes while this book prices the machine idiom.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 2, the 'Machine Design' line (ME_2026_Syllabus.pdf,
 *   extracted this pass): 'Design for static and dynamic loading; failure theories;
 *   fatigue strength and the S-N diagram; principles of the design of machine elements
 *   such as bolted, riveted and welded joints; shafts, gears, rolling and sliding contact
 *   bearings, brakes and clutches, springs' — the whole line is this book's chapter
 *   register.
 * - Shigley's Mechanical Engineering Design (Budynas & Nisbett) — the Parts I-IV
 *   chapter arc web-checked this pass (Introduction/Materials/Load and Stress Analysis/
 *   Deflection and Stiffness; Failures from Static and Variable Loading; then the
 *   elements: shafts, fasteners, welding, springs, bearings, gears, clutches/brakes).
 * - Khurmi & Gupta, Machine Design (the Indian canonical arc, 30+ element chapters
 *   confirmed via the open PDF TOC read this pass).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-design-discipline',
    title: 'The Design Discipline',
    summary:
      'Design versus analysis; the design process from specification to drawing; standards and codes as the profession\u2019s memory; the factor of safety priced honestly against uncertainty in material, load and manufacture; allowable stresses and the design equation; and the economic and manufacturing considerations that make a sized part a real part.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Design Process and Its Codes',
      'Factor of Safety Priced Honestly',
      'From Stress to Dimension',
    ],
  },
  {
    number: 2,
    slug: 'static-loading-and-failure-theories',
    title: 'Static Loading and the Failure Theories',
    summary:
      'Stress states under combined loading; ductile versus brittle failure read from the material census; the maximum-principal-stress, maximum-shear (Tresca) and distortion-energy (von Mises) theories priced on worked stress states; stress concentration factors in design; and the honest choice between theories by material class.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ductile versus Brittle Failure',
      'Tresca and von Mises Priced',
      'Stress Concentration in Design',
    ],
  },
  {
    number: 3,
    slug: 'fatigue-and-the-s-n-diagram',
    title: 'Fatigue and the S-N Diagram',
    summary:
      'Fatigue as a named mechanism (crack initiation and growth); the S-N diagram and the endurance limit; the modifying factors — surface, size, load, temperature; fluctuating stress vocabulary (mean and amplitude); the Goodman line, Soderberg and Gerber designs; stress concentration under fatigue; and cumulative damage by Miner\u2019s rule priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Endurance Limit and Its Modifiers',
      'Goodman, Soderberg, Gerber',
      'Cumulative Damage by Miner\u2019s Rule',
    ],
  },
  {
    number: 4,
    slug: 'joints-bolted-riveted-welded',
    title: 'Joints: Bolted, Riveted and Welded',
    summary:
      'Threaded fasteners and the bolt as a preloaded spring — the joint diagram under external load; bolt strength grades and preloading discipline; riveted joints (butt and lap, efficiency); welded joints — butt and fillet welds priced by the throat, treated under combined loading; eccentric loaded welds and the honest inspection census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bolt as a Preloaded Spring',
      'Riveted Joints and Their Efficiency',
      'Fillet and Butt Welds Priced',
      'Eccentric Loads on Weld Groups',
    ],
  },
  {
    number: 5,
    slug: 'shafts-keys-couplings',
    title: 'Shafts, Keys and Couplings',
    summary:
      'Shafts under combined bending and torsion — the design equation from the distortion-energy theory with shock and fatigue factors; stepped shafts, keyways and stress concentrations; keys (square, flat, splines) priced in shear and bearing; rigid and flexible couplings; and shaft deflection and critical-speed cross-reference to Theory of Machines\u2019 whirling arc.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Shaft Design Equation',
      'Keys and Splines Priced',
      'Couplings and Their Honest Flexibility',
    ],
  },
  {
    number: 6,
    slug: 'bearings',
    title: 'Bearings',
    summary:
      'The two worlds: sliding-contact (journal) bearings — Petroff\u2019s equation, the bearing characteristic number, Sommerfeld\u2019s glimpse, bearing materials and lubrication regimes; and rolling-contact bearings — the life-load arithmetic (L10), equivalent dynamic load with radial/thrust factors, static capacity, and mounting/preload practice.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Journal Bearings: Petroff and Beyond',
      'Rolling Bearings: the L10 Arithmetic',
      'Selection, Mounting, Preload',
    ],
  },
  {
    number: 7,
    slug: 'gears-in-design',
    title: 'Gears in Design',
    summary:
      'The gear tooth as a loaded member — the Lewis bending equation with the form factor, the Barth velocity modification; wear and dynamic loads (the Buckingham glimpse); spur, helical, bevel and worm gearing each priced by their own force components; gear materials and heat treatment cross-referenced; back to Machine Theory\u2019s kinematics for the geometry.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lewis Form Factor',
      'Wear and Dynamic Loads',
      'Helical, Bevel and Worm Forces',
      'Gear Materials and Lubrication',
    ],
  },
  {
    number: 8,
    slug: 'springs-brakes-clutches',
    title: 'Springs, Brakes and Clutches',
    summary:
      'Helical springs — stress, deflection, Wahl\u2019s correction, surge and design arithmetic; torsion and leaf springs glanced; plate and disc clutches with uniform wear versus uniform pressure; drum brakes with the self-energising geometry priced honestly; band brakes; and the energy dissipation question every friction device must answer.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Helical Springs: Wahl\u2019s Correction',
      'Plate Clutches: Wear versus Pressure',
      'Brakes and Self-Energising Geometry',
    ],
  },
  {
    number: 9,
    slug: 'design-synthesis-and-the-doorstep',
    title: 'The Design Synthesis and the Doorstep',
    summary:
      'The synthesis map — one page from specification through failure theory to sized elements; the design-project census (a gearbox, a bracket, a coupling priced end-to-end); the codes-and-standards census (IS/ISO/DIN families named); and the doorsteps: Manufacturing Processes (the parts must be makeable), CAD/CAM (the parts must be modelled) and the professional design review.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map: Specification to Element',
      'A Gearbox Priced End-to-End',
      'The Standards Census',
      'The Doorstep: Makeable and Modelled',
    
      'Databases and languages — data bases: different types, characteristics and design; transactions and concurrency control; elements of programming languages, typical examples'
    ],
  },
]

export const machineDesign: Book = {
  id: 'machine-design',
  title: 'Machine Design',
  subtitle: 'Design as a discipline — safety, fatigue and the honest sizing of machine elements',
  discipline: 'engineering',
  level: 'First design course → professional element-design readiness',
  description: 'The design discipline itself: the design process, codes and standards, factor of safety and its honest choice; design for static loading with the failure theories (maximum principal stress, shear, distortion energy); stress concentration factors; then fatigue — the S-N diagram, endurance limit and its modifying factors, fluctuating stresses by Goodman and Gerber/Soderberg, cumulative damage named; and the element catalogue priced by GATE — bolted, riveted and welded joints; shafts under combined bending and torsion with keys and couplings; spur, helical, bevel and worm gearing as loaded members (the Lewis form factor and wear loads); sliding and rolling-contact bearings with the Petroff/Sommerfeld glimpse and bearing-life arithmetic; springs (tension/compression, torsion); brakes and clutches; and the design synthesis that closes the mechanical branch\u2019s core. Cross-references Strength of Materials (the stress engines), Materials Science (material selection) and Theory of Machines (the kinematics behind every element).',
  status: 'planned',
  accent: ['#be123c', '#881337'],
  chapters,
}
