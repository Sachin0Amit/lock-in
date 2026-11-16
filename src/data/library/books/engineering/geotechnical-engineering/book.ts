import type { Book, Chapter } from '../../../types'

/**
 * Geotechnical Engineering — the thirty-third book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 39 planned lessons, zero written. Lesson ids will use the `soil-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Geotechnical Engineering owns soil mechanics and foundation engineering (GATE CE S3 — the whole section is its register). Structural Engineering owns the structure the foundation carries (the interface cross-referenced); Fluid Mechanics owns the general flow science its seepage chapters lean on; Water Resources owns the groundwater-and-well resource story (the aquifer cross- reference stated); Transportation’s embankment and subgrade lines route here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 3 'Geotechnical Engineering' (CE_2026_Syllabus.pdf,
 *   extracted this pass): Soil Mechanics (Three-phase system and phase
 *   relationships, index properties; classification systems; permeability,
 *   seepage, flow nets, uplift pressure, piping, capillarity, seepage force;
 *   effective stress and quicksand; compaction; one-dimensional consolidation
 *   and time rate; shear strength, Mohr's circle, effective and total shear
 *   strength parameters, stress-strain characteristics of clays and sand; stress
 *   paths) + Foundation Engineering (sub-surface investigations — drilling,
 *   sampling, plate load test, SPT and CPT; earth pressure theories — Rankine
 *   and Coulomb; slope stability — finite and infinite slopes, Bishop's method;
 *   stress distribution — Boussinesq; pressure bulbs; shallow foundations —
 *   Terzaghi's and Meyerhoff's bearing capacity, effect of water table; combined
 *   footing and raft; contact pressure; settlement analysis; deep foundations —
 *   dynamic and static formulae, axial load capacity of piles, pile load test,
 *   lateral loading, pile group efficiency, negative skin friction) — the
 *   entire two-part section is this book's register.
 * - V.N.S. Murthy's Geotechnical Engineering and Gopal Ranjan & A.S.R. Rao's
 *   Basic and Applied Soil Mechanics — the Indian canonical arcs web-checked
 *   this pass; B.M. Das' Principles of Geotechnical Engineering named as the
 *   standard pole; Terzaghi, Peck & Mesri named as the classic.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-soil-idea',
    title: 'The Soil Idea',
    summary:
      'Why soil breaks the engineering honest note (a particulate, three-phase, stress-history-carrying material); the three-phase diagram and its relationships (void ratio, porosity, degree of saturation, unit weights — the arithmetic census practised); index properties — grain-size distribution (the curve craft) and consistency (Atterberg limits, the plasticity chart); and classification by USCS and the IS family (the plasticity honest note).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Phase Arithmetic',
      'Atterberg and the Plasticity Chart',
      'Classification by Two Families',
    ],
  },
  {
    number: 2,
    slug: 'soil-water-and-seepage',
    title: 'Soil Water, Permeability and Seepage',
    summary:
      'Permeability — Darcy\u2019s law earned (the valid-flow honest note) and the coefficient\u2019s lab census (constant and falling head); field permeability glanced; two-dimensional seepage — flow nets drawn and read (the equipotential craft), uplift pressure and exit gradient; piping and the quicksand condition earned (the critical-gradient arithmetic); capillarity and the seepage-force craft; and the flow-science inheritance from Fluid Mechanics cross-referenced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Darcy Earned, Both Heads',
      'Flow Nets Drawn and Read',
      'Piping and Quicksand Priced',
      'Capillarity and Seepage Force',
    ],
  },
  {
    number: 3,
    slug: 'effective-stress-and-compaction',
    title: 'Effective Stress and Compaction',
    summary:
      'Terzaghi\u2019s effective-stress principle earned (the physics read honestly — the stress the grains carry); the capillary and artesian honest notes; quicksand revisited through the principle; compaction — Proctor\u2019s laboratory craft (the OMC-maximum-density curve read), field compaction and its control (the specification census, the field-density tests); and the compaction-versus-consolidation distinction priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Terzaghi\u2019s Principle Earned',
      'Proctor\u2019s Curve Read',
      'Field Control Priced',
      'Compaction versus Consolidation',
    ],
  },
  {
    number: 4,
    slug: 'stress-distribution',
    title: 'Stress Distribution in Soils',
    summary:
      'Why the ground answers to Boussinesq (the elastic half-space honest note); the point-load solution and its extension census (circular and rectangular areas, the 2:1 approximation priced); the pressure-bulb reading (the isobar craft); Newmark\u2019s influence chart worked; Westergaard\u2019s honest comparison glanced; and the stress-history note that predicts the consolidation chapter\u2019s behaviour.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Boussinesq Earned',
      'The Bulb Read by Isobars',
      'Newmark Worked',
      'The Uniform-Approximation Census',
    ],
  },
  {
    number: 5,
    slug: 'consolidation',
    title: 'Consolidation',
    summary:
      'The consolidation idea (the spring analogy honestly told); the oedometer test and the e-log-p curve read (the preconsolidation honest note — the stress history in one plot); the settlement craft (normally consolidated versus overconsolidated); Terzaghi\u2019s one-dimensional theory (the governing equation and the coefficient of consolidation); the time-rate craft (the square-root and log fittings, the U-T census); secondary consolidation named; and the settlement arithmetic worked on real clays.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Spring Honestly Told',
      'The e-log-p Story Read',
      'Terzaghi\u2019s 1D Theory',
      'Time-Rate and Settlement Worked',
    ],
  },
  {
    number: 6,
    slug: 'shear-strength',
    title: 'Shear Strength',
    summary:
      'Mohr-Coulomb earned (the failure criterion priced on the stress plane); the test census — direct shear, triaxial (UU, CU, CD with their honest purposes) and unconfined compression; the vane glanced; effective versus total parameters (the drained-versus-undrained honest split examiners price); stress paths drawn; the stress-strain characteristics of clays and sands (the dilatancy honest note); and the strength-selection craft for real problems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Mohr-Coulomb Earned',
      'The Triaxial Census',
      'Effective versus Total, Honestly',
      'Clays versus Sands in Strain',
    ],
  },
  {
    number: 7,
    slug: 'site-investigation',
    title: 'Site Investigation',
    summary:
      'Why investigate (the ground\u2019s honest price of ignorance); the boring census (auger, wash, rotary — with sampling by split-spoon and Shelby); the SPT earned (the N-value and its corrections); the CPT priced (the cone\u2019s honest continuous story); the plate load test; geophysical methods glanced (the seismic and electrical honest notes); the borelog read as a genre; and the investigation planning craft (stages and depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boring Census',
      'SPT Earned and Corrected',
      'CPT\u2019s Continuous Story',
      'The Borelog as Genre',
    ],
  },
  {
    number: 8,
    slug: 'earth-pressure-and-slope-stability',
    title: 'Earth Pressure and Slope Stability',
    summary:
      'The retaining-wall problem stated; Rankine\u2019s theory earned (the active-and-passive honest split); Coulomb\u2019s wedge craft and the wall-friction honest note; surcharge, water and the layered honest notes; the stability census for slopes — infinite slopes (the seepage-parallel honest note) and finite slopes by the method of slices (Bishop\u2019s simplified method earned, the FOS arithmetic); and the stabilisation census glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rankine Earned',
      'Coulomb\u2019s Wedge Craft',
      'Slices and Bishop\u2019s Method',
      'The Stabilisation Census',
    ],
  },
  {
    number: 9,
    slug: 'shallow-foundations',
    title: 'Shallow Foundations',
    summary:
      'The foundation choice census (the depth-and-load honest map); Terzaghi\u2019s bearing-capacity theory earned (the failure-mechanism story and the N-factors); Meyerhof\u2019s extensions and shape/depth/inclination factors priced; the water-table honest note; local shear and the sands\u2019 settlement limit; combined footings and rafts designed honestly; contact pressure (the rigidity honest note); and the settlement analysis (immediate and consolidation, the tolerance census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Terzaghi Earned',
      'Meyerhof and the Factors',
      'Rafts and Contact Pressure',
      'Settlement Analysis Worked',
    ],
  },
  {
    number: 10,
    slug: 'deep-foundations-and-synthesis',
    title: 'Deep Foundations and the Synthesis',
    summary:
      'Why piles (the shallow route\u2019s honest limits); the pile census (displacement versus non-displacement); the static formulae (the end-bearing-and-shaft arithmetic) and the dynamic formulae priced with their honest caution; the load test earned; the group craft (efficiency, the block honest note) and negative skin friction priced; lateral loading glanced (the subgrade-reaction craft named); the synthesis — one page from phase relations to foundations; and the doorsteps — Structural Engineering\u2019s interface, Water Resources\u2019 groundwater, the geoenvironmental future.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pile Census',
      'Static Formulae, Dynamic Caution',
      'Groups and Negative Friction',
      'The Synthesis and Doorsteps',
    ],
  },
]

export const geotechnicalEngineering: Book = {
  id: 'geotechnical-engineering',
  title: 'Geotechnical Engineering',
  subtitle: 'Soil as an engineering material — phase relations, seepage, consolidation, strength and foundations',
  discipline: 'engineering',
  level: 'First soil-mechanics course → foundation-design readiness',
  description: 'The ground as the engineer\u2019s most honest material: the soil idea — the three-phase system and phase relationships, index properties and Atterberg limits, classification (USCS and the IS family); soil water — permeability (one-dimensional flow and Darcy\u2019s law), seepage through soils (two-dimensional flow nets, uplift pressure, piping and the quicksand condition), capillarity and the seepage-force craft; the effective-stress principle earned (Terzaghi\u2019s law); compaction (Proctor and field control); stress distribution in soils (Boussinesq\u2019s theory, the pressure-bulb reading, Newmark glanced); consolidation — one-dimensional theory, the time rate and the e-log-p settlement craft; shear strength — Mohr-Coulomb, the triaxial/direct/UCS test census, effective versus total parameters, stress paths and the stress-strain characteristics of clays and sands; site investigation (boreholes, sampling, SPT, CPT and the plate load test — the GATE register); earth pressure (Rankine and Coulomb) and slope stability (infinite and finite slopes, Bishop\u2019s method); shallow foundations — Terzaghi\u2019s and Meyerhof\u2019s bearing capacity, the water-table and combined-footing/raft crafts, contact pressure and settlement analysis; deep foundations — pile statics and dynamics, group efficiency, negative skin friction and the load-test craft; and the professional synthesis. Cross-references Structural Engineering (the structure above), Fluid Mechanics (the flow science), Surveying (the site truth) and hands off to Water Resources\u2019 groundwater.',
  status: 'planned',
  accent: ['#92400e', '#78350f'],
  chapters,
}
