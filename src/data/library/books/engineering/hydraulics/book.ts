import type { Book, Chapter } from '../../../types'

/**
 * Hydraulics — the thirty-sixth book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 41 planned lessons, zero written. Lesson ids will use the `hyd-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Hydraulics owns the applied water craft for the civil shelf — measurement, similitude at civil scale, open-channel flow and the hydraulic machines (GATE CE S4’s Hydraulics line + GATE ME S3’s Turbomachinery line’s hydraulic half). Fluid Mechanics (mechanical) owns the fundamentals (statics through compressible flow, the boundary layer, the external-flow drag); Water Resources owns the irrigation-and-structures consumer story; Thermodynamics owns steam-and-gas turbines; Renewable Energy’s small-hydro routes here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 4's 'Hydraulics' line (CE_2026_Syllabus.pdf,
 *   extracted this pass): 'Forces on immersed bodies; Flow measurement in
 *   channels and pipes; Dimensional analysis and hydraulic similitude; Channel
 *   Hydraulics — Energy-depth relationships, specific energy, critical flow,
 *   hydraulic jump, uniform flow, gradually varied flow and water surface
 *   profiles' — the entire line is this book's register, with GATE ME S3's
 *   'Turbomachinery: Impulse and reaction principles, velocity diagrams,
 *   Pelton-wheel, Francis and Kaplan turbines' served by the machines chapters.
 * - Modi & Sethi's Hydraulics and Fluid Mechanics (including Hydraulic Machines)
 *   — the Indian canonical arc web-checked this pass (the 21st-edition contents
 *   confirmed: Properties of Fluids, Fluid Pressure and Its Measurement, the
 *   29-chapter organisation across Fluid Mechanics, Hydraulics and Hydraulic
 *   Machines — the machine chapters routed here, the fundamentals to Fluid
 *   Mechanics); Bansal's Fluid Mechanics and Hydraulic Machines named as the
 *   second pole; Chow's Open-Channel Hydraulics named as the depth pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-hydraulics-viewpoint',
    title: 'The Hydraulics Viewpoint',
    summary:
      'What changes when water is the working fluid (the civil honest note — the craft\u2019s applied census); the contract stated plainly — the fundamentals (fluid statics, the control-volume engine, viscous flow, the boundary layer) live on the mechanical shelf\u2019s Fluid Mechanics, cross-referenced; this book owns measurement, similitude, channels and machines; and the water-cycle map drawn with Water Resources.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Applied Census Named',
      'The Contract Stated Plainly',
      'The Water-Cycle Map',
    
      'Hydraulic Machines and Hydro Power — various pumps, air vessels, hydraulic turbines: types, classifications and performance parameters; power house: classification and layout, storage, pondage, control of supply',
      'The Ideal Diode 175 5.1.6 Operation for vDS > Channel Pinch',
      'The Rectifier 177 5.1.7 The p-Channel MOSFET',
      'Unregulated split supply – on the bench!',
      'Summary of important formulae 27 5.2 Hydraulic analogy'
    ],
  },
  {
    number: 2,
    slug: 'flow-measurement',
    title: 'Flow Measurement',
    summary:
      'The measurement census on one page; orifices and mouthpieces (Cc, Cv, Cd earned and priced — the jet honest notes); the Venturi and nozzle meters with the flow-coefficient honest note; notches and weirs — rectangular and triangular (the Francis and King honest formulas), the V-notch craft; the channel-gauging census (the current-meter craft, the stage-discharge honest relation); and the measurement-selection craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Cd Earned on the Orifice',
      'Venturi and Nozzle Priced',
      'Weirs and the V-Notch Craft',
      'Channel Gauging and Rating',
    ],
  },
  {
    number: 3,
    slug: 'forces-on-immersed-bodies',
    title: 'Forces on Immersed Bodies and the Jet Craft',
    summary:
      'The momentum engine cashed (Fluid Mechanics cross-referenced); forces on flat and curved plates — the jet craft worked (stationary and moving, the series honesty); forces on bends and pipe-junctions priced; drag and lift at civil scale (the immersed-body census GATE CE names — the boundary-layer cross-reference); and the impact honest notes priced on real hydraulic structures.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Jet Craft Worked',
      'Bends and Junctions Priced',
      'Drag at Civil Scale',
      'The Structure-Impact Notes',
    ],
  },
  {
    number: 4,
    slug: 'similitude-at-civil-scale',
    title: 'Dimensional Analysis and Hydraulic Similitude',
    summary:
      'Dimensional analysis at the model-testing scale (Buckingham\u2019s craft cross-referenced; the civil group census — Froude\u2019s reign on free- surface models); the model laws priced (Reynolds for the closed conduits, Froude for the channels and weirs, the Weber-and-Mach honest notes); the distorted-and-warped honest note for rivers; and the model-census priced on real civil works (the spillway model told honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Model Laws Priced',
      'Froude\u2019s Reign Named',
      'Distortion for Rivers',
      'The Spillway Model Told',
    ],
  },
  {
    number: 5,
    slug: 'open-channel-flow-i',
    title: 'Open-Channel Flow I: Uniform Flow',
    summary:
      'The open-channel idea (the free-surface honest note); uniform flow — Chezy and Manning earned (the roughness census priced honestly); conveyance and the section factor; the most-economical section craft (the rectangular, trapezoidal and circular-honest censuses); the computation census (the normal-depth craft worked both ways); and the prismatic-and- nonprismatic honest notes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Chezy and Manning Earned',
      'The Most-Economical Craft',
      'Normal Depth Computed',
      'The Geometry Honest Notes',
      'Fn 704 11.1.4 The Ideal Case of Infinite Open'
    ],
  },
  {
    number: 6,
    slug: 'open-channel-flow-ii',
    title: 'Open-Channel Flow II: Specific Energy and Critical Flow',
    summary:
      'The specific-energy idea earned (the diagram drawn and read); critical depth and critical flow (the rectangular craft and the general honest method); the Froude number as the regime compass; the control-section craft (where the flow decides); channel transitions priced (the hump and the width-constriction honest classics); and the choked-flow honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Diagram Drawn and Read',
      'Critical Depth Earned',
      'Controls and Transitions Worked',
      'The Choked-Flow Note',
    ],
  },
  {
    number: 7,
    slug: 'jump-and-gvf',
    title: 'The Hydraulic Jump and Gradually-Varied Flow',
    summary:
      'The hydraulic jump earned (the momentum equation\u2019s honest engine); its types classified (the Froude census) and its location determined (the pre-and-post-jump craft); the energy-loss arithmetic worked; the jump\u2019s uses priced (the stilling-basin census); gradually-varied flow — the differential equation read, the water-surface profiles classified (M, S, C, H, A — the families drawn), the GVF-integration craft (the direct-step method worked); and the profile-plotting honest craft on real channels.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Jump Earned by Momentum',
      'Types, Location, Losses',
      'Stilling Basins Priced',
      'The Profile Families Drawn',
    ],
  },
  {
    number: 8,
    slug: 'hydraulic-turbines',
    title: 'Hydraulic Turbines',
    summary:
      'The turbomachinery principle cashed (the impulse-versus-reaction honest split, the Euler engine cross-referenced from Fluid Mechanics); Pelton — the velocity triangles and the bucket craft (the jet ratio honest note); Francis and Kaplan — their triangles and the draft-tube craft (its honest cavette note); specific speed as the selection compass; the turbine census table priced (the GATE ME line served); the governing craft glanced; and the cavitation and Thoma honest notes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Impulse versus Reaction Cashed',
      'Pelton, Francis, Kaplan Worked',
      'The Specific-Speed Compass',
      'Cavitation Priced Honestly',
    ],
  },
  {
    number: 9,
    slug: 'pumps-and-synthesis',
    title: 'Pumps and the Engineering Synthesis',
    summary:
      'The centrifugal pump earned (the head-and-efficiency craft, the velocity triangle at the impeller); NPSH and cavitation priced; priming and the starting craft; the pump\u2019s characteristic and the system curve — the operating point worked (series-and-parallel honest notes); the reciprocating census (the slip-and-indicator craft); the water-resources doorstep (the lift-irrigation and pumping stations priced); and the synthesis — one page from the measuring weir to the pumped main.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Centrifugal Earned',
      'NPSH and the Operating Point',
      'The Reciprocating Census',
      'The Synthesis and Doorstep',
    ],
  },
]

export const hydraulics: Book = {
  id: 'hydraulics',
  title: 'Hydraulics',
  subtitle: 'Water at work — measurement, similitude, open channels and the hydraulic machines',
  discipline: 'engineering',
  level: 'First applied-hydraulics course → water-resources and turbomachinery readiness',
  description: 'Water as the working fluid (the applied civil craft, with the fundamentals owned by the mechanical shelf\u2019s Fluid Mechanics, cross-referenced): flow measurement in pipes and channels — orifices, mouthpieces, notches and weirs, the Venturi and nozzle meters, each earned and priced; forces on immersed bodies and the momentum analysis of fluid jets (the vanes craft); dimensional analysis and hydraulic similitude at the model-testing scale (Buckingham and the model laws — Fluid Mechanics\u2019 chapter cross-referenced, the civil model-census priced); open-channel flow I — uniform flow (Chezy and Manning earned, the most-economical section craft, the conveyance reading); open-channel flow II — specific energy and critical flow (the Froude honest engine, the control-section craft); the hydraulic jump earned (its types and location, the energy-loss arithmetic) and gradually-varied flow (the water-surface profiles classified and drawn, the GVF-integration craft); the machines — hydraulic turbines (Impulse and reaction principles, Pelton, Francis and Kaplan with velocity triangles, specific speed and the cavitation honest note — the GATE ME turbomachinery line served) and pumps (the centrifugal craft — heads, efficiency, NPSH and priming; the reciprocating census; the system-and- operating-point arithmetic); and the engineering synthesis with the Water Resources doorstep. Cross-references Fluid Mechanics (the fundamentals), Water Resources (the irrigation-and-structures consumer), Thermodynamics (the steam-turbine partner) and hands off to Renewable Energy\u2019s small-hydro.',
  status: 'planned',
  accent: ['#0e7490', '#164e63'],
  chapters,
}
