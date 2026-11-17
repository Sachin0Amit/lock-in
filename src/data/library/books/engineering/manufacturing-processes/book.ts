import type { Book, Chapter } from '../../../types'

/**
 * Manufacturing Processes — the eighth book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 55 planned lessons, zero written. Lesson ids will use the `mfg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Manufacturing Processes owns the making science. CAD/CAM owns the digital chain — CNC programming at part-program level and additive manufacturing live there, cross-referenced from here; Materials Science owns microstructure and heat treatment; Machine Design consumes this book’s process constraints as design-for-manufacture; Metrology is hosted here as the GATE register routes it, with the quality-system census handed to Industrial Engineering.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 4 (ME_2026_Syllabus.pdf, extracted this pass): the
 *   'Casting, Forming and Joining Processes' line (castings, pattern/mould/core design,
 *   solidification, riser and gating design; plastic deformation and yield criteria;
 *   hot and cold working; bulk and sheet processes' load estimation; powder
 *   metallurgy; welding, brazing, soldering and adhesive bonding) + the 'Machining and
 *   Machine Tool Operations' line (mechanics of machining; basic machine tools; tool
 *   geometry and materials, tool life and wear; economics of machining; non-traditional
 *   machining; work holding, jigs and fixtures; abrasive machining; NC/CNC machines
 *   and programming) + the 'Metrology and Inspection' line (limits, fits and
 *   tolerances; linear and angular measurements; comparators; interferometry; form and
 *   finish measurement; alignment and testing; tolerance analysis; CMM) — all three
 *   lines are this book's register (CNC programming hands its deeper arc to CAD/CAM).
 * - Kalpakjian & Schmid, Manufacturing Engineering and Technology 7e — the Pearson
 *   TOC tab read this pass (Structure of Metals; Mechanical Behaviour and Testing;
 *   Fundamentals of Metal Casting; casting technology; the forming family; machining
 *   and machine tools; abrasive; non-traditional; joining).
 * - Groover, Fundamentals of Modern Manufacturing named as the second pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'materials-for-manufacturing',
    title: 'Materials for Manufacturing',
    summary:
      'The structure-property recap priced for making: metal alloys and their phase-diagram logic (cross-referenced to Materials Science); the stress-strain behaviour that forming processes exploit; hot versus cold working defined at the recrystallisation honest line; and the manufacturing-property census — castability, formability, machinability, weldability.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Alloy Census for Making',
      'Hot versus Cold: the Recrystallisation Line',
      'Castability, Formability, Machinability',
    ],
  },
  {
    number: 2,
    slug: 'casting',
    title: 'Casting',
    summary:
      'The casting idea and its economics; pattern types and allowances; moulding sand and moulds, cores and core prints; solidification theory (Chvorinov\u2019s rule); riser and gating design arithmetic; sand casting defects priced with the honest census; and the casting-process census — shell, investment, permanent mould, die casting, centrifugal.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Patterns, Moulds and Cores',
      'Solidification and Chvorinov\u2019s Rule',
      'Riser and Gating Arithmetic',
      'The Casting Census and Its Defects',
    ],
  },
  {
    number: 3,
    slug: 'bulk-forming',
    title: 'Bulk Forming',
    summary:
      'Plastic deformation mechanics with the yield criteria (Tresca and von Mises cross-referenced to Machine Design\u2019s failure-theory chapter); forging — open and impression die with load estimation; rolling mechanics and its geometry; extrusion and drawing with die angles and load arithmetic; and the friction and temperature bookkeeping that separates honest load estimates from guesses.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Deformation Mechanics and Yield Criteria',
      'Forging and Its Loads',
      'Rolling: Mechanics and Geometry',
      'Extrusion and Drawing',
    ],
  },
  {
    number: 4,
    slug: 'sheet-forming-and-powder',
    title: 'Sheet Forming and Powder Metallurgy',
    summary:
      'Sheet-metal behaviour and its anisotropic honesty; shearing and blanking with the clearance craft; bending (springback priced); deep drawing with its limiting draw ratio; other sheet ops glanced; then powder metallurgy — the powder-making census, compaction, sintering and its honest niche economics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Shearing and Blanking',
      'Bending and Springback',
      'Deep Drawing',
      'Powder Metallurgy\u2019s Honest Niche',
    ],
  },
  {
    number: 5,
    slug: 'machining-mechanics',
    title: 'Machining Mechanics',
    summary:
      'Chip formation and its types; the orthogonal cutting model with Merchant\u2019s analysis; cutting forces and specific energy; tool geometry by the ASA and ISO systems; tool materials (HSS through carbide to ceramic/cermets/CBN); tool life — Taylor\u2019s equation and the wear mechanisms; surface finish bookkept; and the economics of machining (the optimum cutting-speed craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Merchant\u2019s Orthogonal Craft',
      'Tool Geometry by Two Systems',
      'Taylor\u2019s Tool Life',
      'The Economics of Machining',
    ],
  },
  {
    number: 6,
    slug: 'machine-tools-and-operations',
    title: 'Machine Tools and Operations',
    summary:
      'The lathe and turning; drilling and the drill press; milling (up versus down, the cutter census); shaping, planing and slotting glanced; grinding — the wheel census, wheel specification and grinding mechanics; abrasive finishing (honing, lapping, superfinishing); and the machine-tool accuracy and rigidity honesty that bounds everything.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Turning and the Lathe',
      'Drilling and Milling',
      'Grinding and the Wheel Census',
      'The Finishing Census',
    ],
  },
  {
    number: 7,
    slug: 'non-traditional-machining',
    title: 'Non-Traditional Machining',
    summary:
      'Why the traditional list runs out (hard, brittle, complex, tiny); EDM — spark erosion and its polarity craft; wire-cut EDM; ECM\u2019s electrochemical removal; USM\u2019s abrasive slurry engine; laser-beam, electron-beam, plasma and water-jet machining priced against each other; and the selection census by material and geometry.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Spark Engine: EDM',
      'ECM and USM',
      'The Selection Census',
    ],
  },
  {
    number: 8,
    slug: 'joining',
    title: 'Joining',
    summary:
      'Welding physics — the arc, the pool and the heat-affected zone priced; weld metallurgy and the defects census (porosity, undercut, residual stresses and distortion with their control); the arc-welding census (SMAW, GMAW, GTAW, SAW); resistance welding; brazing and soldering distinguished honestly; adhesive bonding; and the joint-design craft shared with Machine Design\u2019s welded-joint chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Arc, the Pool, the HAZ',
      'The Arc-Welding Census',
      'Brazing, Soldering, Adhesives',
      'Defects, Distortion and Their Control',
    ],
  },
  {
    number: 9,
    slug: 'work-holding-and-metrology',
    title: 'Work Holding, Jigs and Fixtures',
    summary:
      'Locating by the 3-2-1 principle; clamping forces without distortion; jigs versus fixtures and their design elements (bushings, set blocks); the economics of jig versus fixture; and assembly-line work-holding glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 3-2-1 Principle',
      'Jigs versus Fixtures',
      'Design Elements of the Jig',
    ],
  },
  {
    number: 10,
    slug: 'metrology-and-inspection',
    title: 'Metrology and Inspection',
    summary:
      'The measurement discipline (standards, error, calibration cross-referenced to Electrical Measurements\u2019 error census); limits, fits and tolerances with the hole-basis craft; gauges and gauge design (Taylor\u2019s principles); linear and angular measurement instruments; comparators (mechanical, optical, electrical, pneumatic); interferometry as the wavelength ruler; form and finish measurement (flatness, roundness, surface roughness parameters); alignment and machine-tool testing; and the coordinate measuring machine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Limits, Fits and Tolerances',
      'The Comparator Census',
      'Interferometry: the Wavelength Ruler',
      'Form, Finish and Alignment',
      'The Coordinate Measuring Machine',
    ],
  },
  {
    number: 11,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The process-selection map — one page from casting through machining to joining, priced by volume, material and geometry; the NC/CNC doorway stated (the part-program craft lives in CAD/CAM, cross-referenced); the additive doorway stated (CAD/CAM owns the process census); and the production-system doorstep to Industrial Engineering.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Process-Selection Map',
      'The CNC Doorway',
      'The Doorstep: Production Systems',
    ],
  },
]

export const manufacturingProcesses: Book = {
  id: 'manufacturing-processes',
  title: 'Manufacturing Processes',
  subtitle: 'Casting, forming, machining and joining — how parts are actually made, priced honestly',
  discipline: 'engineering',
  level: 'First manufacturing course → CNC, metrology and production readiness',
  description: 'The making science: engineering materials for manufacturing (structure-property recap cross-referenced to Materials Science); metal casting from pattern and mould design through solidification to riser and gating arithmetic; bulk forming — plastic deformation, yield criteria, and forging, rolling, extrusion and drawing with hot and cold working priced; sheet forming (shearing, deep drawing, bending); powder metallurgy\u2019s honest niche; machining mechanics — chip formation, cutting forces, tool geometry, tool life and wear with the economics of machining; the machine-tool census (lathe, milling, drilling, grinding and abrasive processes); non-traditional processes (EDM, ECM, USM, laser and water-jet); joining — welding physics and metallurgy, brazing, soldering, adhesive bonding and weld defects; work-holding by jigs and fixtures; and the metrology chapter GATE prices — limits, fits and tolerances, linear/angular measurement, comparators, interferometry, form and finish, alignment testing and the CMM. Cross-references Machine Design (the parts to be made), CAD/CAM (the CNC and additive chain) and hands off to Industrial Engineering.',
  status: 'planned',
  accent: ['#57534e', '#292524'],
  chapters,
}
