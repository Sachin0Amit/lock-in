import type { Book, Chapter } from '../../../types'

/**
 * Renewable Energy — the twentieth book of the Engineering shelf (Electrical branch, shared by every branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `ren-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Renewable Energy owns the sustainable-generation engineering. Power Systems owns the grid and stability; Power Electronics owns the converter/inverter machinery; Electrical Machines owns the generator families; Hydraulics and Water Resources own the hydraulic and irrigation works; Environmental Engineering owns the environmental and waste side; the resource-climate science routes to the future Physics shelf (cross-reference when planned).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Boyle, Renewable Energy: Physics, Engineering, Environmental Impacts,
 *   Economics & Planning (the open front-matter TOC and Google Books structure
 *   web-checked this pass — Part I basic scientific principles, the solar/wind/
 *   bioenergy/hydro chapters, the integration and planning parts); the 4e sample-
 *   chapter front matter read for the part structure.
 * - GATE context: no dedicated GATE renewable paper; the EE/IN registers price
 *   renewables within Power Systems' generation concepts — this book serves the
 *   university elective and the professional pole honestly.
 * - Tiwari's Renewable Energy named as the Indian pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-energy-landscape',
    title: 'The Energy Landscape',
    summary:
      'The global energy ledger (resources, reserves, demand growth and the honest arithmetic of energy units); the carbon honest note and climate framing stated without preaching; the renewable census on one map (solar, wind, hydro, bio, geothermal, marine); energy accounting — capacity factor and the honest difference between watts and watt-hours; and the grid-integration problem stated as the book\u2019s honest climax.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Global Ledger Read',
      'Capacity Factor and Honest Units',
      'The Census on One Map',
      'The Integration Problem Stated',
    ],
  },
  {
    number: 2,
    slug: 'solar-thermal',
    title: 'Solar Thermal',
    summary:
      'The solar resource — radiation geometry (declination, hour angle, the tilt craft), measurement (pyranometers cross-referenced to Measurements); flat-plate collectors analysed (the Hottel-Whillier honest note); concentrating families (parabolic trough, dish, central receiver) priced by concentration and temperature; thermal storage; and the solar-thermal power plant census (the Rankine cross-referenced to Thermodynamics).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Radiation Geometry Earned',
      'Flat-Plate Collectors Analysed',
      'Concentrating Families Priced',
      'Storage and the Power Census',
    ],
  },
  {
    number: 3,
    slug: 'solar-photovoltaics',
    title: 'Solar Photovoltaics',
    summary:
      'The PV cell physics cross-referenced to Electronic Devices and Circuits (the diode equation cashed into the I-V curve); module and array arithmetic (series/parallel, mismatch, temperature honest notes); the load matching problem and MPPT (the power-electronics engines cross-referenced); systems — stand-alone (batteries, charge controllers) and grid-tied (the inverter census); and the sizing craft worked on a real load.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The I-V Curve Earned',
      'Module Arithmetic and Mismatch',
      'MPPT and the Matching Engine',
      'Systems Sized Honestly',
      'Diodes 174 5.1.4 Applying a Small vDS'
    ],
  },
  {
    number: 4,
    slug: 'wind-energy',
    title: 'Wind Energy',
    summary:
      'The wind resource (the power equation with the cube honest note, the statistics of wind — Weibull cross-referenced to Statistics); turbine aerodynamics (lift-driven blades, the Betz limit earned, the power curve read); the electrical census — fixed-speed (induction) and variable-speed (DFIG and full-converter) machines cross-referenced; the turbine\u2019s control craft (pitch, yaw, cut-in to cut-out); and wind farm siting priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cube and the Weibull',
      'The Betz Limit Earned',
      'The Electrical Census',
      'Control from Cut-In to Cut-Out',
    ],
  },
  {
    number: 5,
    slug: 'hydro-bio-and-emerging',
    title: 'Hydro, Bioenergy and the Emerging Census',
    summary:
      'Hydropower — the resource arithmetic, small hydro priced (the turbine families cross-referenced to Hydraulics), the civil works cross-referenced to Water Resources; bioenergy — biomass combustion, biogas digesters, biofuels priced by their land honest note; geothermal (the resource and plant census); marine (tidal barrage, tidal stream, wave devices priced by maturity); and hydrogen and fuel cells named honestly (the storage-and-carrier discussion).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Small Hydro Priced',
      'Bioenergy and Its Land Note',
      'Geothermal and Marine Census',
      'Hydrogen Named Honestly',
    ],
  },
  {
    number: 6,
    slug: 'storage-and-grid-integration',
    title: 'Storage and Grid Integration',
    summary:
      'Why variability is the honest problem (the duck curve named); balancing — reserves, curtailment, forecasting (cross-referenced to Industrial Engineering\u2019s forecasting); storage census — batteries (their chemistry priced), pumped hydro (the round-trip honest note), other routes glanced; grid integration — inverters\u2019 grid-support craft (Power Electronics cross-referenced), microgrids and islanding, the smart-grid honest note; and the power-quality consequences priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Duck Curve Named',
      'The Storage Census Priced',
      'Inverters\u2019 Grid-Support Craft',
      'Microgrids and Power Quality',
    ],
  },
  {
    number: 7,
    slug: 'economics-policy-and-synthesis',
    title: 'Economics, Policy and the Synthesis',
    summary:
      'The economics honest note — LCOE earned and compared across the census; subsidy and policy mechanisms glanced (the intent, not the politics); the environmental accounting (Hydraulics\u2019 and Environmental Engineering\u2019s cross-references); the synthesis map — one page from resource to grid; and the doorsteps — Power Systems\u2019 stability, the future energy-policy homes, the Mechanical branch\u2019s turbomachinery.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'LCOE Earned and Compared',
      'Policy Glanced by Intent',
      'The Synthesis: Resource to Grid',
      'The Doorsteps Named',
    ],
  },
]

export const renewableEnergy: Book = {
  id: 'renewable-energy',
  title: 'Renewable Energy',
  subtitle: 'Sun, wind, water and the grid — the engineering of sustainable generation',
  discipline: 'engineering',
  level: 'First renewable-energy course → grid-integration readiness',
  description: 'The generation future: the energy landscape (resources, demand growth, the carbon honest note, energy accounting); solar thermal (radiation geometry, collectors flat-plate and concentrating, storage); solar photovoltaics (the cell physics cross-referenced to Electronic Devices and Circuits, modules and arrays, MPPT and power electronics cross-referenced, systems on and off grid); wind (the resource, turbine aerodynamics cross-referenced to Fluid Mechanics, the electrical families — fixed and variable speed, generator cross-referenced to Electrical Machines, the wind statistics craft); hydro (small hydro priced, turbines cross-referenced to Hydraulics and Water Resources); bioenergy (biomass, biogas, biofuels); geothermal and the emerging census (tidal, wave, hydrogen and fuel cells named); energy storage priced honestly; and grid integration — variability, balancing, inverters, microgrids and the smart-grid honest note — closing with policy and economics glanced. Cross-references Thermodynamics, Fluid Mechanics, Electrical Machines, Power Electronics, Power Systems and hands off to Environmental Engineering\u2019s sustainability chapters.',
  status: 'planned',
  accent: ['#15803d', '#166534'],
  chapters,
}
