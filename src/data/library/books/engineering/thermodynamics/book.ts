import type { Book, Chapter } from '../../../types'

/**
 * Thermodynamics — the fifth book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 39 planned lessons, zero written. Lesson ids will use the `therm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Thermodynamics owns the state-and-cycle science. Heat Transfer owns the rate science (its conduction/convection/radiation engines presuppose this book’s property census); Fluid Mechanics owns the flow science (compressible-flow basics live here for the nozzle arcs, cross-referenced both ways); Renewable Energy prices its cycles here; the Mathematics shelf’s Mathematical Methods for Engineering owns the partial-derivative machinery of property relations.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 3 (ME_2026_Syllabus.pdf, extracted this pass): the
 *   Thermodynamics line (systems and processes; pure substances; ideal and real gases;
 *   zeroth/first/second laws; work and heat in processes; property charts and tables;
 *   availability and irreversibility; thermodynamic relations) + the Applications line
 *   (compressors; vapour and gas power cycles with regeneration and reheat; Otto/Diesel/
 *   dual; vapour and gas refrigeration and heat pumps; moist air and the psychrometric
 *   chart; IC engines' air-standard cycles) — both lines are this book's register.
 * - Cengel & Boles, Thermodynamics: An Engineering Approach 10e — the FULL 18-chapter
 *   TOC read this pass from the McGraw-Hill feature page (Introduction; Energy; Pure
 *   Substances; Closed Systems; Control Volumes; Second Law; Entropy; Entropy Analysis;
 *   Exergy; Gas Power Cycles; Vapour and Combined Power Cycles; Refrigeration; Property
 *   Relations; Gas Mixtures; Gas-Vapour Mixtures and Air-Conditioning; Chemical
 *   Reactions; Chemical and Phase Equilibrium; Compressible Flow).
 * - Sonntag & Borgnakke named as the second pole; the compressible-flow chapter hands
 *   its gas-dynamics depth to Fluid Mechanics.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-energy-worldview',
    title: 'The Energy Worldview',
    summary:
      'Systems and their boundaries (closed, open, isolated); state, process and cycle; extensive versus intensive properties; the zeroth law and temperature scales; pressure, specific volume and the honest unit census; and the continuum idea priced for engineering work.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Systems, Boundaries, Properties',
      'The Zeroth Law and Temperature',
      'Processes and Cycles',
    ],
  },
  {
    number: 2,
    slug: 'first-law-closed-systems',
    title: 'The First Law for Closed Systems',
    summary:
      'Work and heat as path functions with their sign conventions; kinetic and potential energy bookkeeping; internal energy and the closed-system energy balance; enthalpy defined honestly; specific heats and their relations; and cyclic processes reading back to the energy-conservation law.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Work and Heat as Path Functions',
      'The Closed-System Energy Balance',
      'Specific Heats and Enthalpy',
    ],
  },
  {
    number: 3,
    slug: 'pure-substances',
    title: 'Properties of Pure Substances',
    summary:
      'Phase change at constant pressure; the T-v and P-v diagrams with the saturation dome; quality and compressed/liquid-vapour mixtures; the steam tables read fluently (the craft every numerical needs); the ideal-gas equation and when it lies; and compressibility charts for the honest real-gas middle.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Saturation Dome Read Honestly',
      'Quality and the Steam Tables',
      'The Ideal Gas and Its Honest Limits',
    ],
  },
  {
    number: 4,
    slug: 'control-volumes',
    title: 'Control Volumes',
    summary:
      'The steady-flow engineering devices priced one by one — nozzles and diffusers, turbines and compressors, pumps, heat exchangers, mixing chambers, throttles — with the mass and energy balances set honestly; then unsteady control-volume work: filling and emptying tanks; air and gas compressors with multistage intercooling.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Steady-Flow Device Census',
      'Throttles and Mixing Chambers',
      'Unsteady Flows: Filling and Emptying',
      'Compressors and Intercooling',
    ],
  },
  {
    number: 5,
    slug: 'the-second-law',
    title: 'The Second Law',
    summary:
      'Direction as a physical law: Kelvin-Planck and Clausius statements shown equivalent; thermal reservoirs; reversible and irreversible processes with the honest census of irreversibilities; the Carnot cycle and the Carnot principles; the thermodynamic temperature scale earned; and the quality of energy named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Kelvin-Planck and Clausius, Equivalent',
      'Reversibility and Its Honest Census',
      'The Carnot Ceiling',
    ],
  },
  {
    number: 6,
    slug: 'entropy',
    title: 'Entropy',
    summary:
      'The Clausius inequality; entropy as a property earned from the cycle integral; the TdS relations; entropy change of ideal gases and pure substances; isentropic processes as the honest ideal; entropy generation priced on real devices; and the entropy balance for control volumes with the steady-state entropy accounting.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Entropy Earned from the Inequality',
      'The TdS Relations',
      'Isentropic Processes and Efficiency',
      'Entropy Generation Priced',
    ],
  },
  {
    number: 7,
    slug: 'exergy-and-irreversibility',
    title: 'Exergy and Irreversibility',
    summary:
      'Availability (exergy) as the work potential relative to the dead state; exergy destroyed = entropy generated x ambient temperature; second-law efficiency as the honest efficiency; exergy accounting for closed systems and control volumes; and the availability and irreversibility vocabulary the GATE register prices.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Exergy: the Work Potential',
      'Exergy Destroyed and Entropy Generated',
      'Second-Law Efficiency',
    ],
  },
  {
    number: 8,
    slug: 'gas-power-cycles',
    title: 'Gas Power Cycles',
    summary:
      'The air-standard craft and its honest assumptions; Otto, Diesel and dual cycles compared at fixed compression and heat input; the Brayton cycle with regeneration, intercooling and reheat priced against the simple cycle; gas turbines and jet-engine glimpses; and the engine parameters (mean effective pressure, specific fuel consumption named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Air-Standard Craft: Otto, Diesel, Dual',
      'The Brayton Cycle',
      'Regeneration, Reheat, Intercooling',
      'The Cycle Comparison Census',
    ],
  },
  {
    number: 9,
    slug: 'vapour-power-and-refrigeration',
    title: 'Vapour Power and Refrigeration Cycles',
    summary:
      'The Rankine cycle on the T-s diagram with the steam-table craft; reheat and regenerative feedwater heating priced; the reversed cycles — vapour-compression refrigeration with its P-h diagram and COP arithmetic, absorption refrigeration glanced, the heat pump as a reversed cycle with its honest COP; and gas refrigeration (reversed Brayton).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rankine Cycle and Its Craft',
      'Reheat and Regeneration',
      'Vapour-Compression Refrigeration',
      'Heat Pumps and Gas Refrigeration',
    ],
  },
  {
    number: 10,
    slug: 'mixtures-and-psychrometry',
    title: 'Mixtures and Psychrometry',
    summary:
      'Gas mixtures by mass and mole; partial pressures and the mixture\u2019s apparent gas constant; gas-vapour mixtures — dry air and water vapour; the psychrometric properties (wet- and dry-bulb, humidity ratio, relative humidity, dew point, enthalpy) all on the one chart; the process census — sensible heating/cooling, humidification, adiabatic saturation and evaporative cooling, mixing of streams; and air-conditioning priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Gas Mixtures Bookkept',
      'The Psychrometric Chart, Read Fluently',
      'The Process Census',
      'Air-Conditioning Priced',
    ],
  },
  {
    number: 11,
    slug: 'relations-and-compressible-flow',
    title: 'Property Relations, Compressible Flow and the Doorstep',
    summary:
      'The Maxwell relations and the Clapeyron equation as the thermodynamic property-relations core; the general relations for du, dh, ds; then compressible flow — the speed of sound, isentropic flow through nozzles and diffusers with the critical-pressure ratio and normal shocks named (its full gas-dynamics depth handed to Fluid Mechanics); the synthesis map; and the doorsteps: Heat Transfer (rate science), Fluid Mechanics (flow science), Renewable Energy (the cycles\u2019 future).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Maxwell Relations',
      'Nozzles, Diffusers, Choking',
      'The Synthesis: States to Cycles',
      'The Doorstep: Rates and Flows',
    ],
  },
]

export const thermodynamics: Book = {
  id: 'thermodynamics',
  title: 'Thermodynamics',
  subtitle: 'Energy, entropy and the cycles that run the world — the Cengel arc at engineering depth',
  discipline: 'engineering',
  level: 'First thermodynamics course → power, refrigeration and IC-engine readiness',
  description: 'The energy discipline: systems, processes and the zeroth law; the first law for closed systems with work and heat as path functions; properties of pure substances read from tables and charts (the T-v and P-v census, quality, the ideal-gas honest limits); control volumes at steady state — nozzles, turbines, compressors, pumps, heat exchangers, throttles — and unsteady fills; the second law as the direction law (Kelvin-Planck and Clausius, reversibility, the Carnot ceiling); entropy with the Clausius inequality, the TdS relations and isentropic processes; exergy and irreversibility; gas power cycles — Otto, Diesel, dual and Brayton with regeneration and reheat; vapour power and refrigeration cycles (Rankine and its improvements, vapour-compression refrigeration and heat pumps); gas mixtures and psychrometry with the psychrometric chart\u2019s honest processes; air-standard engines and compressors; compressible flow through nozzles; and the thermodynamic property relations that close the science. Cross-references Mathematical Methods for Engineering, Heat Transfer (the rate science to this book\u2019s state science) and hands off to Fluid Mechanics and Renewable Energy.',
  status: 'planned',
  accent: ['#dc2626', '#7f1d1d'],
  chapters,
}
