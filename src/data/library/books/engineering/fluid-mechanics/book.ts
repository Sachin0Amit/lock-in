import type { Book, Chapter } from '../../../types'

/**
 * Fluid Mechanics — the sixth book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 57 planned lessons, zero written. Lesson ids will use the `fluid-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Fluid Mechanics owns the fundamentals of fluid behaviour for every branch. Hydraulics (civil) owns the applied water craft — open-channel flow, flow measurement and hydraulic machines — with the contract stated there; Thermodynamics owns the cycle science and steam/gas turbines; Heat Transfer owns convective machinery; Renewable Energy’s hydro and wind chapters route their flows through here; the CE register’s boundary-layer and lift/drag lines cross-reference this book.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 3, the 'Fluid Mechanics' line (ME_2026_Syllabus.pdf,
 *   extracted this pass): 'Fluid properties; fluid statics, forces on submerged bodies,
 *   stability of floating bodies; control-volume analysis of mass, momentum and energy;
 *   fluid acceleration; differential equations of continuity and momentum; Bernoulli's
 *   equation; dimensional analysis; viscous flow of incompressible fluids, boundary
 *   layer, elementary turbulent flow, flow through pipes, head losses in pipes, bends
 *   and fittings; basics of compressible fluid flow' — the whole line is this book's
 *   register.
 * - GATE 2026 CE Section 4 'Fluid Mechanics' line cross-checked (the civil subset —
 *   properties, statics, continuity/momentum/energy, potential/laminar/turbulent flow,
 *   pipe networks, boundary-layer concept, lift and drag concept) and routed honestly:
 *   fundamentals here, channel craft to Hydraulics.
 * - Cengel & Cimbala, Fluid Mechanics: Fundamentals and Applications — the chapter arc
 *   read this pass from the open TOC (Introduction and Basic Concepts; Properties of
 *   Fluids; Pressure and Fluid Statics; Fluid Kinematics; Bernoulli and Energy
 *   Equations; Momentum Analysis; Dimensional Analysis; Internal Flow; Differential
 *   Analysis; Approximate Solutions; External Flow; Compressible Flow; Open-Channel
 *   Flow noted as the civil handoff).
 * - Modi & Sethi's classic Indian arc named as the second pole (its machine chapters
 *   route to Hydraulics); Munson and White named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-fluid-idea',
    title: 'The Fluid Idea',
    summary:
      'What makes a fluid a fluid (the no-shape answer); the continuum hypothesis and its honest limits; fluid properties priced — density, specific weight, viscosity (Newton\u2019s law of viscosity and the Newtonian census), compressibility and bulk modulus, surface tension with its capillary engines, vapour pressure and cavitation named early.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The No-Shape Answer and the Continuum',
      'Viscosity: Newton\u2019s Law and Its Census',
      'Surface Tension and Capillarity',
      'Vapour Pressure and Cavitation Named',
      'Introduction 175 5.1.5 Operation as vDS Is Increased',
      'Introduction 1067 16.1.7 Obtaining the PUN from the PDN',
      'Introduction 1192 Index IN-1',
      'Surface-mount technology: the joy and the pain',
      'Cathode-ray tube 947 Appendix: Symbols, Abbreviations, Deﬁnitions'
    ],
  },
  {
    number: 2,
    slug: 'fluid-statics',
    title: 'Fluid Statics',
    summary:
      'Pressure at a point and its measurement (barometers, manometers — differential and inclined — bourdon gauges); hydrostatic force on plane surfaces (the centre of pressure craft) and on curved surfaces; buoyancy and Archimedes; stability of floating and submerged bodies with metacentric height — the GATE numerical heart of the chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Manometers: the Measurement Craft',
      'Hydrostatic Forces on Plane Surfaces',
      'Curved Surfaces and Buoyancy',
      'Stability and the Metacentre',
      'Force determination 142 9.3 Waveform terms and definitions'
    ],
  },
  {
    number: 3,
    slug: 'fluid-kinematics',
    title: 'Fluid Kinematics',
    summary:
      'Eulerian versus Lagrangian descriptions; streamlines, pathlines and streak lines distinguished honestly; flow classification (steady/unsteady, uniform/non- uniform, laminar/turbulent, compressible/incompressible); acceleration of a fluid particle (local and convective); the stream function and velocity potential named; vorticity and rotation priced; and the Reynolds transport theorem as the bridge to control-volume thinking.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Descriptions and Lines of Flow',
      'The Material Derivative: Local + Convective',
      'Stream Function and Velocity Potential',
      'The Reynolds Transport Theorem',
      'Summary of important formulae 281 15.5 Thévenin’s theorem'
    ],
  },
  {
    number: 4,
    slug: 'control-volume-analysis',
    title: 'Control-Volume Analysis',
    summary:
      'The continuity equation for fixed and moving control volumes; the linear momentum equation priced on bends, vanes and nozzles (the force engine); the moment-of-momentum equation glanced for machines; the energy equation with Bernoulli as its frictionless limit — its restrictions stated honestly; and the energy and piezometric grade lines drawn on real systems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Continuity for Control Volumes',
      'The Momentum Engine: Bends, Vanes, Nozzles',
      'Bernoulli and Its Honest Limits',
      'The Grade Lines Drawn',
    ],
  },
  {
    number: 5,
    slug: 'differential-analysis',
    title: 'Differential Analysis',
    summary:
      'The differential continuity equation in cartesian and cylindrical forms; the stream-function route to incompressibility; the Navier-Stokes equations introduced and read term-by-term (not hidden, not over-claimed); exact solutions glanced (Couette and Poiseuille flows); the Euler equations as the inviscid limit; and the honest verdict on when differential analysis earns its keep in engineering practice.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Differential Continuity',
      'Navier-Stokes Read Term-by-Term',
      'Couette and Poiseuille Earned',
      'The Honest Verdict on Differential Routes',
      'Electrostatic terms',
      'Terms and concepts 261 14.11 Selectivity',
      'The j operator 264 Terms and concepts',
      'Signed binary subtraction 525 Terms and concepts'
    ],
  },
  {
    number: 6,
    slug: 'dimensional-analysis-and-similitude',
    title: 'Dimensional Analysis and Similitude',
    summary:
      'Dimensional homogeneity; the Buckingham Pi theorem worked to the drag and pipe-flow groups (Reynolds, Froude, Weber, Mach, Euler — the group census); the Reynolds and Froude similarity laws with model-testing practice; distorted models named; and the dimensionless-number treasury every later chapter draws from.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Buckingham Pi Theorem Worked',
      'The Group Census',
      'Similitude and Model Testing',
    ],
  },
  {
    number: 7,
    slug: 'viscous-internal-flow',
    title: 'Viscous Internal Flow',
    summary:
      'Laminar fully developed pipe flow earned from the differential route (the Hagen-Poiseuille craft); the entrance region; turbulence and the Reynolds experiment; the friction factor (Moody chart read fluently, Colebrook and the explicit formulae); major losses by the Darcy-Weisbach engine; minor losses in bends, valves and fittings; and pipe systems — series, parallel and branching with pump/system curve matching introduced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Hagen-Poiseuille Earned',
      'The Moody Chart and Friction Factor',
      'Minor Losses in Fittings',
      'Pipe Systems and the System Curve',
      'Summary 117 Region',
      'Summary of important formulae',
      'Summary of important formulae 261 14.10 Bandwidth',
      'Signed binary addition 524 Summary of important formulae',
      'Summary of important formulae 713 34.4 Demand for electricity and the'
    ],
  },
  {
    number: 8,
    slug: 'boundary-layers-and-external-flow',
    title: 'Boundary Layers and External Flow',
    summary:
      'The boundary-layer idea (Prandtl\u2019s gift); growth on a flat plate (laminar, transition, turbulent — the blended craft); separation and its control; the drag census — pressure versus friction drag on cylinders, spheres and aerofoils with the Reynolds-number reading; the lift concept priced honestly; and the terminal-velocity numericals students actually meet.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Prandtl\u2019s Boundary Layer',
      'Growth, Transition, Separation',
      'The Drag Census',
      'Lift and the Aerofoil Glimpse',
      'Terminals 151 4.7.3 Varactors'
    ],
  },
  {
    number: 9,
    slug: 'compressible-flow-basics',
    title: 'Compressible Flow Basics',
    summary:
      'When density earns a vote — the Mach number and flow regimes; the speed of sound; isentropic flow relations; flow through converging and converging-diverging nozzles with choking; normal shock waves introduced; and the honest handoff: the full gas-dynamics arc stays in this book\u2019s scope at GATE depth, its deeper machinery named for future study.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mach Number and Flow Regimes',
      'Isentropic Relations',
      'Nozzles and Choking',
      'The Normal Shock Introduced',
    ],
  },
  {
    number: 10,
    slug: 'turbomachinery-and-the-doorstep',
    title: 'The Turbomachinery Principle and the Doorstep',
    summary:
      'The impulse versus reaction principle with velocity triangles drawn honestly; the Euler turbomachine equation earned; specific speed introduced as the selection compass; and the doorsteps stated plainly — Hydraulic Machines (turbines and pumps) live in Hydraulics on the civil shelf with this book\u2019s velocity-triangle craft cross-referenced; steam and gas turbines live in Thermodynamics\u2019 applications; the convective machinery of Heat Transfer presupposes this book; Renewable Energy\u2019s wind and hydro chapters route their flows through here.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Impulse versus Reaction',
      'The Euler Equation Earned',
      'Specific Speed: the Compass',
      'The Doorsteps: Machines Elsewhere, Rates Above',
      'VCO implementation: through-hole versus surface-mount'
    ],
  },
]

export const fluidMechanics: Book = {
  id: 'fluid-mechanics',
  title: 'Fluid Mechanics',
  subtitle: 'Fluids at rest, in motion and against surfaces — from hydrostatics to boundary layers',
  discipline: 'engineering',
  level: 'First fluid mechanics course → thermal/turbomachinery/hydraulics readiness',
  description: 'The flow science: fluid properties (viscosity, surface tension, vapour pressure, compressibility) with the continuum honest note; fluid statics — pressure and its measurement, hydrostatic forces on plane and curved surfaces, buoyancy and the stability of floating bodies; fluid kinematics (flow descriptions, streamlines and stream tubes, the material derivative, Reynolds transport theorem); control-volume analysis of mass, momentum and energy with Bernoulli\u2019s equation and its honest limits and the energy/piezometric grade lines; differential analysis — the continuity and Navier-Stokes equations at an engineering introduction, with exact solutions glanced; dimensional analysis and similitude (Buckingham Pi, model testing); viscous internal flow — laminar pipe flow, turbulence, major and minor losses; boundary layers (growth, separation, the drag and lift concepts); elementary compressible flow; and the turbomachinery principle chapter that hands its machines to Hydraulics (civil) and Thermodynamics (steam and gas turbines). Cross-references Mathematical Methods for Engineering, Thermodynamics (property census), Hydraulics (the applied water craft) and hands off to Heat Transfer (convective machinery).',
  status: 'planned',
  accent: ['#0e7490', '#155e75'],
  chapters,
}
