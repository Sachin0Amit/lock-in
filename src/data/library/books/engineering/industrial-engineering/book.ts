import type { Book, Chapter } from '../../../types'

/**
 * Industrial Engineering — the ninth book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 54 planned lessons, zero written. Lesson ids will use the `ie-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Industrial Engineering owns the production-application layer. The operations-research THEORY lives on the Mathematics shelf (optimization-and- operations-research — simplex, transportation, assignment, queuing, game theory, decision analysis; cross-referenced, no duplication); PERT/CPM at construction depth lives in Construction Management (civil); work study and quality systems live here; the economics of production routes honestly to the future Economics shelf.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 4 (ME_2026_Syllabus.pdf, extracted this pass): the
 *   'Production Planning and Control' line (forecasting models, aggregate production
 *   planning, scheduling, materials requirement planning; lean manufacturing) + the
 *   'Inventory Control' line (deterministic models; safety stock inventory control
 *   systems) + the 'Operations Research' line (linear programming, simplex method,
 *   transportation, assignment, network flow models, simple queuing models, PERT and
 *   CPM) — the register this book serves at application level, with the theory
 *   cross-referenced to the Mathematics shelf's OR book.
 * - Kanishka Bedi, Production and Operations Management (the second-edition TOC
 *   web-checked this pass) and Martand Telsang's Industrial Engineering and Production
 *   Management named as the Indian canonical pair; O.P. Khanna named.
 * - Hillier & Lieberman / Taha cross-referenced through the Mathematics shelf's
 *   optimization-and-operations-research (the no-duplication contract).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-production-system',
    title: 'The Production System',
    summary:
      'Production as a system with inputs, conversion and outputs; the production census — job, batch, mass and continuous; plant layout families (product, process, fixed, cellular) priced by volume-variety; productivity and its honest measurement; and the industrial-engineering function located in the organisation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Production Census',
      'Layout Families by Volume-Variety',
      'Productivity Measured Honestly',
    
      'Refrigeration and Air conditioning — vapour compression refrigeration, refrigerants and working cycles, compressors, condensers, evaporators and expansion devices; other refrigeration systems (vapour absorption, vapour jet, thermo-electric, vortex tube); psychrometric properties and processes,',
      'Current issues of national and international importance relating to social, economic and industrial development',
      'Output Current Limits 112 4.3.6 The Ideal-Diode Model',
      'Output Resistance of the Emitter- 9.5.2 The Current-Mirror-Loaded MOS',
      'Class A Output Stage 890 13.2.6 Increasing the Input Common',
      'Class AB Output Stage 902 of the Input Stage',
      'It furthers the University\'s mission by disseminating knowledge in the pursuit of education, learning, and research at the highest international levels of excellence',
      'A monostable application: limiting pulse width and duty cycle',
      'I: Phototransistor output optocouplers',
      'Production of rotating magnetic flux by',
      'Generating plant',
      'RPC system requirements 873 Sensing and Actuation',
      'Deflecting systems of a cathode-ray tube 948 and Diagrammatic Symbols'
    ],
  },
  {
    number: 2,
    slug: 'work-study',
    title: 'Work Study',
    summary:
      'Method study — the SREDACT flow of record-examine-develop; flow diagrams and charts (outline, flow, travel); motion study and the principles of motion economy; then time study — stopwatch procedure, rating, allowances, and standard time earned; PMTS glanced; ergonomics priced as the human honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Method Study: the SREDACT Craft',
      'Motion Study and Motion Economy',
      'Time Study: Standard Time Earned',
    ],
  },
  {
    number: 3,
    slug: 'forecasting-and-aggregate-planning',
    title: 'Forecasting and Aggregate Planning',
    summary:
      'The demand-forecasting census — qualitative (Delphi) and quantitative (moving averages, exponential smoothing, trend and simple regression cross-referenced to Statistics); forecast-error measures; then aggregate planning strategies (chase, level, mixed) priced by their inventory and workforce costs; and the master production schedule introduced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Forecasting Census',
      'Forecast Error Measured',
      'Aggregate Strategies Priced',
      'A simple delta-sigma for our suntan monitor',
      'The decibel (dB) 369 20.5 Smoothing'
    ],
  },
  {
    number: 4,
    slug: 'scheduling-and-mrp',
    title: 'Scheduling, MRP and Lean',
    summary:
      'Sequencing on machines (Johnson\u2019s rule and the dispatching-rule census); the MRP engine — BOM explosion, lead-time offsetting and lot sizing; capacity requirements planning glanced; then lean manufacturing — the Toyota vocabulary (just-in-time, kanban, 5S, poka-yoke), push versus pull priced, and the waste census (muda).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sequencing: Johnson and the Rules',
      'The MRP Engine',
      'Lean: the Pull Discipline',
      'The Waste Census',
    ],
  },
  {
    number: 5,
    slug: 'inventory-control',
    title: 'Inventory Control',
    summary:
      'Why inventory exists and what it costs; the EOQ model earned with its quantity-discount and production-run variants; safety stock and reorder-point systems with the service-level craft; periodic-review systems; ABC analysis; and the modern honesty — inventory as the mirror of process problems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'EOQ Earned and Extended',
      'Safety Stock and Service Level',
      'ABC and the Census',
      'Inventory as the Mirror',
      'The Wilson BJT Current Mirror 553 Problems'
    ],
  },
  {
    number: 6,
    slug: 'or-application-layer',
    title: 'The Operations-Research Application Layer',
    summary:
      'The OR toolkit used at production speed, theory cross-referenced to the Mathematics shelf: linear programming formulated from production problems and read through the simplex lens; transportation and assignment formulated and solved; network-flow models (maximal flow, shortest path) at application depth; and simple queuing models priced on real service systems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'LP Formulated from the Floor',
      'Transportation and Assignment',
      'Network Flows at Production Speed',
      'Queues Priced on Service Systems',
    
      'Computer organization — basic architecture, CPU, I/O organisation, memory organisation, peripheral devices, trends; hardware/software issues; data representation and programming; operating systems: basics, processes, characteristics, applications; memory management, virtual memory, file systems,',
      'Relationship between D and // 150 4.7 Other Diode Applications',
      'Graphical Representation of',
      '317-style regulator: application hints',
      'Some DAC application examples',
      'Parallel multichannel delta-sigma data-acquisition system',
      'A.4 Applications 725 Integrals'
    ],
  },
  {
    number: 7,
    slug: 'quality-control',
    title: 'Quality Control',
    summary:
      'The quality vocabulary (quality of design versus conformance); statistical process control — the control-chart family for variables and attributes with the control-limit craft; process capability indices; acceptance sampling by OC curves and the lot-tolerance honest note; and six sigma and TQM named as the management census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Control-Chart Family',
      'Process Capability',
      'Acceptance Sampling and OC Curves',
      'Six Sigma Named Honestly',
      'FETs as variable resistors',
      'Six DACs',
      'Light acceptance 617 29.13 Simplification of the approximate'
    ],
  },
  {
    number: 8,
    slug: 'synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The production-system map — one page from layout to delivery; a make-or-buy and line-balancing census priced end-to-end; the project-management doorstep (PERT/CPM at construction depth routed to Construction Management); the digital-factory doorstep (CAD/CAM\u2019s CIM arc); and the honest handoff to the future Economics shelf for the market side of the same decisions.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map: Layout to Delivery',
      'Line Balancing Priced',
      'The Doorsteps: Projects, CIM, Markets',
    ],
  },
]

export const industrialEngineering: Book = {
  id: 'industrial-engineering',
  title: 'Industrial Engineering',
  subtitle: 'Production systems engineered — work study, planning, inventory and the OR application layer',
  discipline: 'engineering',
  level: 'First industrial engineering course → production-management readiness',
  description: 'The production system as an engineered object: plant layout and the production census; work study — method study and time study with the rating and allowance craft; forecasting models and aggregate production planning; scheduling and materials requirement planning with lean manufacturing priced; inventory control — deterministic EOQ models and safety-stock systems; the operations-research application layer at production speed (linear programming, simplex, transportation and assignment, network-flow models and simple queuing, each cross-referenced to the Mathematics shelf\u2019s Optimization and Operations Research which owns the theory); PERT and CPM cross-referenced to Construction Management\u2019s construction home; quality control — control charts, acceptance sampling and the six-sigma census; and the synthesis that closes the mechanical branch. Cross-references Manufacturing Processes (the processes being managed), CAD/CAM (the digital factory) and hands off to Construction Management (civil) and Economics, Commerce and Finance\u2019s future shelf.',
  status: 'planned',
  accent: ['#4d7c0f', '#3f6212'],
  chapters,
}
