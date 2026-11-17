import type { Book, Chapter } from '../../../types'

/**
 * Water Resources Engineering — the thirty-seventh book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `wr-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Water Resources Engineering owns the hydrology-and-irrigation story (GATE CE S4’s Hydrology + Irrigation lines). Hydraulics owns the channel flow and machinery craft; Environmental Engineering owns the quality side; Geotechnical owns the soil-and-seepage machinery; Surveying owns the catchment truth; Renewable Energy owns the small-hydro generation view; the river-engineering depth is a future book (honestly named).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 4's 'Hydrology' + 'Irrigation' lines
 *   (CE_2026_Syllabus.pdf, extracted this pass): 'Hydrologic cycle, precipitation,
 *   evaporation, evapo-transpiration, watershed, infiltration, unit hydrographs,
 *   hydrograph analysis, reservoir capacity, flood estimation and routing,
 *   surface run-off models, ground water hydrology — steady state well
 *   hydraulics and aquifers; Application of Darcy's Law. Irrigation: Types of
 *   irrigation systems and methods; Crop water requirements — Duty, delta,
 *   evapo-transpiration; Gravity Dams and Spillways; Lined and unlined canals,
 *   Design of weirs on permeable foundation; cross drainage structures' — both
 *   lines are this book's register.
 * - K. Subramanya's Engineering Hydrology — the Indian canonical arc
 *   web-checked this pass; S.K. Garg's Irrigation Engineering and Hydraulics
 *   Structures named as the structures pole (the volume organisation confirmed
 *   through the open listings); Linsley's Hydrology named as the standard pole;
 *   Punmia's Irrigation named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-water-cycle-ledger',
    title: 'The Water Cycle as Ledger',
    summary:
      'The hydrologic cycle drawn as an engineered ledger (the storage-and-flux honest census); the water-demand map (the sectors priced, the Indian honest note); the planning worldview (the single-purpose versus multipurpose honest history); and the book\u2019s map — precipitation to works.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ledger Drawn',
      'The Demand Map Priced',
      'The Multipurpose Honest Note',
    ],
  },
  {
    number: 2,
    slug: 'precipitation',
    title: 'Precipitation',
    summary:
      'The precipitation physics glanced honestly; measurement — the gauge census (the recording families priced), the network design craft (the density honest note); the areal arithmetic (the arithmetic-mean, Theissen and the isohyetal crafts priced against each other); the intensity census (the IDH honest note) and its design use; and the double-mass honest check.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gauge Census',
      'The Areal Crafts Priced',
      'Intensity and the IDH',
      'The Double-Mass Check',
    ],
  },
  {
    number: 3,
    slug: 'abstractions-and-runoff',
    title: 'Abstractions and Runoff',
    summary:
      'The abstraction census on one page; evaporation and evapo-transpiration — the measurement and estimation censuses (the pan craft and the Penman-Monteith honest note); infiltration (Horton\u2019s craft, the indices priced); the watershed idea (its delineation, Surveying cross-referenced); the runoff-generation honest story (the infiltration-versus-saturation views); and the runoff coefficients and rational craft priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Evapo-Transpiration Estimated',
      'Infiltration and Its Indices',
      'The Watershed Delineated',
      'Runoff\u2019s Honest Story',
    ],
  },
  {
    number: 4,
    slug: 'hydrographs',
    title: 'Hydrographs',
    summary:
      'The hydrograph read (its components named honestly); base-flow separation by the standard crafts; the unit hydrograph earned (its assumptions priced honestly); the derivation worked; the S-curve and the duration-conversion craft; the synthetic families (Snyder glanced); and the discrete-convolution honest note (the Mathematics shelf\u2019s linear-systems cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hydrograph Read',
      'The UH Earned and Derived',
      'The S-Curve Conversion',
      'The Convolution Honest Note',
    ],
  },
  {
    number: 5,
    slug: 'floods-and-reservoirs',
    title: 'Floods and Reservoirs',
    summary:
      'The flood-estimation census — the empirical formulas priced with their honest caution, the frequency analysis earned (the return-period-and-probability craft, Statistics cross-referenced); flood routing — the hydrologic craft (the Muskingum method worked); the reservoir-capacity arithmetic (the mass-curve craft); the sediment and the dead-storage honest note; and the flood-control census (the structural and non-structural families priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Frequency Craft Earned',
      'Muskingum Worked',
      'The Mass Curve Drawn',
      'The Flood-Control Census',
    
      'Hydrology — hydrological cycle, ground water hydrology, well hydrology and related data analysis; streams and their gauging; river morphology; flood, drought and their management; capacity of reservoirs'
    ],
  },
  {
    number: 6,
    slug: 'groundwater',
    title: 'Groundwater',
    summary:
      'The aquifer census (confined, unconfined — the storage honest notes); its properties (porosity, specific yield, the permeability cross-reference to Geotechnical); Darcy\u2019s law cashed (its validity honest note); steady well hydraulics — the equilibrium craft worked for the confined and unconfined cases (the drawdown arithmetic); the Theis honest note named (the transient story glanced); the well census (their construction and safe-yield honest notes); and the recharge and over-extraction honest notes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aquifer Census',
      'Darcy Cashed',
      'Steady Wells Worked',
      'Theis Named, Honestly',
    ],
  },
  {
    number: 7,
    slug: 'irrigation',
    title: 'Irrigation',
    summary:
      'The irrigation census — systems (flow, lift, sprinkler, drip — priced by their honest efficiencies) and methods (the surface families); the crop-water requirement craft — duty, delta and their relation earned, the consumptive-use estimation priced; the soil-moisture honest note (Geotechnical cross-referenced); the canal craft — the lined-and-unlined design (Kennedy\u2019s and Lacey\u2019s regime theories priced honestly against the tractive-honest modern view, Hydraulics\u2019 Manning cross-referenced); and the cross-drainage census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Systems and Methods Priced',
      'Duty and Delta Earned',
      'Canals by Kennedy and Lacey',
      'The Cross-Drainage Census',
    ],
  },
  {
    number: 8,
    slug: 'hydraulic-structures',
    title: 'The Hydraulic Structures',
    summary:
      'The gravity dam — its forces census and the stability craft (the elementary profile, the drainage-and-uplift honest notes), the spillway census (the ogee craft, the energy-dissipation cross-reference to Hydraulics\u2019 stilling basins); the weir-on-permeable-foundation craft — Khosla\u2019s theory earned (the exit-gradient honest law, Geotechnical\u2019s piping cross-referenced); barrages and canal-head works glanced; and the dam-safety honest note stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gravity Dam\u2019s Stability',
      'The Spillway Census',
      'Khosla Earned',
      'The Dam-Safety Note',
    ],
  },
  {
    number: 9,
    slug: 'management-synthesis-and-doorstep',
    title: 'The Management Synthesis and the Doorstep',
    summary:
      'The water-resources systems view (the multipurpose operation priced); the waterlogging-and-drainage honest note; the quality partner (Environmental Engineering cross-referenced); the policy census glanced (the inter-state and treaty honest notes, without politics); the synthesis — one page from the gauge to the gated dam; and the doorsteps — Renewable Energy\u2019s small hydro, the river-engineering future, Hydraulics\u2019 machines beneath the works.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Systems View Priced',
      'The Waterlogging Note',
      'The Synthesis Page',
      'The Doorsteps Named',
    ],
  },
]

export const waterResourcesEngineering: Book = {
  id: 'water-resources-engineering',
  title: 'Water Resources Engineering',
  subtitle: 'The water cycle engineered — hydrology, irrigation and the hydraulic works that manage it',
  discipline: 'engineering',
  level: 'First water-resources course → reservoir-and-irrigation design readiness',
  description: 'The water cycle as an engineered ledger: the worldview (the hydrologic cycle as the book\u2019s map, the water-demand honest census); precipitation — its measurement (the gauge census and network design), the areal-arithmetic crafts and the intensity-honest reading; abstractions and runoff — evaporation and evapo-transpiration (the measurement and estimation censuses), infiltration (the indices priced), the watershed and the runoff-generation story; hydrographs — the unit hydrograph earned (the convolution honest note), base-flow separation, the S-curve craft and the hydrograph-analysis census; floods and reservoirs — the flood-estimation census (the frequency craft cross-referenced to Statistics), routing (the Muskingum craft), the reservoir-capacity arithmetic and the sediment honest note; groundwater — aquifers and their properties, the steady well-hydraulics craft (the Theis honest note named) and Darcy\u2019s law cashed (Geotechnical\u2019s permeability cross-referenced); irrigation — the systems-and-methods census, crop water requirements (duty, delta, the consumptive-use honest note), canals (the lined-and-unlined craft, the Kennedy-and-Lacey regimes priced) and the cross-drainage census; the hydraulic structures — gravity dams and spillways (the stability craft and the spillway census), weirs on permeable foundations (Khosla\u2019s theory earned with Geotechnical\u2019s piping cross-referenced), barrages and canal-head works glanced; and the management synthesis. Cross-references Hydraulics (the channel-and-machine craft), Environmental Engineering (the quality partner), Geotechnical (the foundation-and-seepage truth) and hands off to Renewable Energy\u2019s hydro.',
  status: 'planned',
  accent: ['#2563eb', '#1e40af'],
  chapters,
}
