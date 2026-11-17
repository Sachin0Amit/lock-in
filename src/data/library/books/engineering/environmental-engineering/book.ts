import type { Book, Chapter } from '../../../types'

/**
 * Environmental Engineering — the thirty-fifth book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `env-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Environmental Engineering owns the water-air-waste stewardship (GATE CE S5). Water Resources owns the source-and-irrigation story; Building Materials owns the material science it consumes; Fluid Mechanics owns the hydraulics its channels price; Renewable Energy owns the energy-transition partner; the future Chemistry shelf owns the underlying chemistry (cross-reference when planned).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 5 'Environmental Engineering' (CE_2026_Syllabus.pdf,
 *   extracted this pass): 'Water and Waste Water Quality and Treatment: Basics
 *   of water quality standards — Physical, chemical and biological parameters;
 *   Water quality index; Unit processes and operations; Water requirement;
 *   Water distribution system; Drinking water treatment. Sewerage system design,
 *   quantity of domestic wastewater, primary and secondary treatment. Effluent
 *   discharge standards; Sludge disposal; Reuse of treated sewage for different
 *   applications. Air Pollution: Types of pollutants, their sources and impacts,
 *   air pollution control, air quality standards, Air quality Index and limits.
 *   Municipal Solid Wastes: Characteristics, generation, collection and
 *   transportation of solid wastes, engineered systems for solid waste
 *   management (reuse/recycle, energy recovery, treatment and disposal)' — the
 *   entire section is this book's register.
 * - S.K. Garg's Water Supply Engineering and Sewage Disposal and Air Pollution
 *   Engineering — the Indian canonical arcs web-checked this pass (the volume
 *   organisation and topic lines confirmed through the open listings); Davis &
 *   Cornwell's Introduction to Environmental Engineering named as the standard
 *   pole; Peavy named. Metcalf & Eddy named as the depth pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-environmental-frame',
    title: 'The Environmental Frame',
    summary:
      'The triad drawn (water, wastewater, air, waste — the cycle\u2019s honest map); the water-quality vocabulary — physical, chemical and biological parameters (each defined and priced for what it honestly measures); the water quality index earned (the weighted arithmetic); the standards census (IS 10500, the effluent standards) read as law; and the public-health honest note that prices the whole discipline.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Parameters Priced Honestly',
      'The WQI Earned',
      'The Standards Read as Law',
    
      'Environmental Engineering — Air, Noise pollution and Ecology: concepts and general methodology'
    ],
  },
  {
    number: 2,
    slug: 'water-demand-and-sources',
    title: 'Water Demand and Sources',
    summary:
      'The per-capita demand and its variation census (the peak-day and peak-hour honest factors); the population-forecasting craft (arithmetic, geometric and the incremental-increase methods priced — the Mathematics shelf\u2019s statistics cross-referenced); the fire demand glanced; the source census — surface (intakes priced) and ground (Water Resources\u2019 well craft cross-referenced); and the source-versus-demand balance drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Demand and Its Variations',
      'Population Forecasted by Three Crafts',
      'The Source Census',
    ],
  },
  {
    number: 3,
    slug: 'water-treatment',
    title: 'Water Treatment',
    summary:
      'The treatment train drawn (the unit-operations-and-processes idea GATE names); aeration and mixing; coagulation-flocculation earned (the colloid honest note, the jar test as law); sedimentation designed (the overflow-rate craft, the basin census); filtration — the slow-and-rapid sand census (the filter\u2019s own honest story), the pressure variants; disinfection (the chlorine chemistry and its residual arithmetic, the alternatives priced); and the distribution system (the layouts, the pressure-and-storage craft, the appurtenance census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Train Drawn',
      'The Jar Test as Law',
      'Sedimentation and Filtration Designed',
      'Disinfection and Distribution',
    ],
  },
  {
    number: 4,
    slug: 'sewerage',
    title: 'Sewerage',
    summary:
      'The sewerage idea (the separate-versus-combined honest choice); the quantity of domestic wastewater (the per-capita and infiltration census); sewer design — the self-cleansing velocity earned (the tractive-craft note), the sewer\u2019s hydraulic design (Fluid Mechanics cross-referenced), the sewage pumping census; the ventilation-and-manhole honest notes; and the storm-water glance (the rational method priced, Water Resources cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Separate versus Combined, Honestly',
      'Self-Cleansing Earned',
      'Sewers Designed',
      'Storm-Water Glanced',
    ],
  },
  {
    number: 5,
    slug: 'wastewater-treatment',
    title: 'Wastewater Treatment',
    summary:
      'The treatment stages priced in order — preliminary (screens, grit), primary (the settling craft); secondary — the activated-sludge process earned (F/M, MLSS, the SRT honest arithmetic), trickling filters, oxidation ponds and the rotating-contact glance; the secondary settling craft; tertiary and advanced glanced (nutrient removal named); sludge — digestion (the anaerobic craft), drying and disposal; the effluent standards and disposal routes (stream-assimilation honest note); and reuse priced for its honest applications.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stages Priced in Order',
      'Activated Sludge Earned',
      'Digestion and Sludge Disposal',
      'Standards, Disposal, Reuse',
    ],
  },
  {
    number: 6,
    slug: 'air-pollution',
    title: 'Air Pollution',
    summary:
      'The pollutant census (the criteria pollutants, each priced by source-and-impact); the source census (stationary and mobile); the meteorological honest note (the dispersion story glanced); the control-device census — the particulate family (gravitational, cyclone, ESP, the fabric filter) and the gaseous family (absorption, adsorption, incineration) priced; the air-quality standards and the AQI earned (the sub-index craft); the sampling census glanced; and the indoor honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Criteria Pollutants Priced',
      'The Control-Device Census',
      'The AQI Earned',
      'The Indoor Honest Note',
    
      'Basics of Energy and Environment: conservation, environmental pollution and degradation, climate change, environmental impact assessment'
    ],
  },
  {
    number: 7,
    slug: 'municipal-solid-waste',
    title: 'Municipal Solid Waste',
    summary:
      'The MSW census — characteristics (the physical-chemical honest notes), generation (the per-capita arithmetic and its drivers), the composition census; collection and transport (the route craft priced); the engineered systems GATE names — reuse and recycling (the material- recovery honest note), energy recovery (the incineration and the biogas-thermal routes priced), treatment (composting earned) and disposal (the sanitary-landfill craft — the site, liner and leachate story); and the plastic-and-e-waste honest notes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The MSW Census Read',
      'Collection Routes Priced',
      'Recovery and Composting Earned',
      'The Sanitary Landfill Craft',
    ],
  },
  {
    number: 8,
    slug: 'regulatory-synthesis-and-doorstep',
    title: 'The Regulatory Synthesis and the Doorstep',
    summary:
      'The regulatory frame (the CPCB-and-SPCB census, the Water and Air Acts named); EIA glanced honestly (the process census); the sustainability doorstep — Renewable Energy\u2019s transition cross-referenced, the circular-economy honest note; the synthesis — one page from parameter to engineered system; and the future doors named (the public-health and chemical-engineering homes).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Regulatory Frame Read',
      'EIA Glanced Honestly',
      'The Synthesis Page',
      'The Future Doors Named',
    ],
  },
]

export const environmentalEngineering: Book = {
  id: 'environmental-engineering',
  title: 'Environmental Engineering',
  subtitle: 'Water, wastewater, air and solid waste — the engineered stewardship of the environment',
  discipline: 'engineering',
  level: 'First environmental course → water-treatment and AQI readiness',
  description: 'The stewardship discipline: the environmental frame (the water-air-waste triad, the standards-and-quality vocabulary, water-quality parameters and the water quality index); water demand and sources (per-capita demand and its variations, population forecasting, the surface-and-ground source census); water treatment — the unit-operations-and-processes idea, mixing, coagulation-flocculation, sedimentation, filtration (sand and the rapid-census), disinfection and the distribution craft; sewerage — the quantity of domestic wastewater, sewer design with the self-cleansing velocity craft; wastewater treatment — primary (screens, grit, primary settling), secondary (the activated-sludge craft, trickling filters, ponds), sludge disposal and effluent standards with reuse priced; air pollution — the pollutant census, sources and impacts, the control-device census, air quality standards and the AQI; municipal solid waste — characteristics, generation, collection and transport, the engineered systems (reuse, recycle, energy recovery, disposal); and the regulatory synthesis (the CPCB frame, EIA glanced, the sustainability doorstep to Renewable Energy). Cross-references Building Materials, Water Resources (the source partner), Fluid Mechanics (the flow craft) and hands off to the future chemical and public-health homes.',
  status: 'planned',
  accent: ['#0d9488', '#134e4a'],
  chapters,
}
