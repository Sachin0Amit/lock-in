import type { Book, Chapter } from '../../../types'

/**
 * Heat Transfer — the seventh book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `ht-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Heat Transfer owns the thermal-rate science. Thermodynamics owns the state and cycle science; Fluid Mechanics owns the flow machinery its convection chapters lean on; Renewable Energy’s solar-thermal chapter routes its collector physics through here; Power Systems’ thermal-current and insulation design cross-references the conduction and radiation chapters; diffusion mass transfer is named and handed to future chemical-engineering homes.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 3, the 'Heat Transfer' line (ME_2026_Syllabus.pdf, extracted
 *   this pass): 'Modes of heat transfer; one dimensional heat conduction, resistance
 *   concept and electrical analogy, heat transfer through fins; unsteady heat
 *   conduction, lumped parameter system, Heisler's charts; thermal boundary layer,
 *   dimensionless parameters in free and forced convective heat transfer, heat transfer
 *   correlations for flow over flat plates and through pipes, effect of turbulence;
 *   heat exchanger performance, LMTD and NTU methods; radiative heat transfer,
 *   Stefan-Boltzmann law, Wien's displacement law, black and grey surfaces, view
 *   factors, radiation network analysis' — every phrase is a planned lesson.
 * - Incropera, DeWitt, Bergman & Lavine, Fundamentals of Heat and Mass Transfer 8e —
 *   the chapter arc read this pass from the Wiley TOC page and the open-PDF contents
 *   (conduction chapters 2-5, convection 6-8, the boiling/condensation and
 *   heat-exchanger chapters, radiation exchange, diffusion mass transfer).
 * - Cengel's Heat and Mass Transfer named as the second pole; Holman named.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-three-modes',
    title: 'The Three Modes',
    summary:
      'Conduction, convection and radiation with their physical origins and rate equations (Fourier, the convective coefficient, Stefan-Boltzmann); the thermal conductivity census across materials; the convective coefficient\u2019s honest range of magnitude; and the multimode problems where the modes conspire — the first thermal circuits drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rate Equations and Their Origins',
      'The Conductivity Census',
      'Thermal Circuits: the Modes Conspire',
    ],
  },
  {
    number: 2,
    slug: 'one-dimensional-conduction',
    title: 'One-Dimensional Steady Conduction',
    summary:
      'The plane wall, the composite wall and the contact-resistance honesty; cylindrical and spherical shells with the logarithmic means; the thermal-resistance network as the unifying craft; and the critical insulation radius — the counter-intuitive result that pricing an insulation can first increase the loss.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wall and the Resistance Network',
      'Cylinders, Spheres, Logarithmic Means',
      'The Critical Radius Priced',
    ],
  },
  {
    number: 3,
    slug: 'fins',
    title: 'Extended Surfaces: Fins',
    summary:
      'Why fins exist (the area argument); the fin equation derived for the uniform cross-section; infinitely long, adiabatic-tip and corrected-length solutions; fin effectiveness and efficiency priced; non-uniform fins glanced; and the application census from engine fins to heat sinks.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fin Equation Derived',
      'Effectiveness and Efficiency',
      'The Fin Census in Practice',
    ],
  },
  {
    number: 4,
    slug: 'unsteady-conduction',
    title: 'Unsteady Conduction',
    summary:
      'The lumped-capacitance method and when it is honest (the Biot-number verdict); transient charts for the slab, cylinder and sphere (Heisler charts read fluently); semi-infinite solids glanced; and the periodic-thermal-storage honesty that building physics will someday price.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lumped Capacitance and the Biot Verdict',
      'The Heisler Charts Read Fluently',
      'Semi-Infinite Solids Glanced',
    ],
  },
  {
    number: 5,
    slug: 'convection-fundamentals',
    title: 'Convection Fundamentals',
    summary:
      'The thermal boundary layer beside the velocity boundary layer (Fluid Mechanics cross-referenced); local versus average coefficients; the dimensionless census — Nusselt, Reynolds, Prandtl, Grashof — earned, not recited; forced convection correlations for flat plates and pipe flows with their turbulent enhancements; free convection from vertical plates and horizontal cylinders; mixed convection named; and the correlation-selection craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thermal Boundary Layer',
      'The Dimensionless Census Earned',
      'Forced Convection: Plates and Pipes',
      'Free Convection and Its Regimes',
    ],
  },
  {
    number: 6,
    slug: 'boiling-and-condensation',
    title: 'Boiling and Condensation',
    summary:
      'The boiling regimes read from the boiling curve (nucleate, critical heat flux, film); pool-boiling correlations at engineering level; flow boiling glanced; condensation — film-wise on vertical and horizontal surfaces with Nusselt\u2019s craft; drop-wise condensation named; and the phase-change heat-transfer coefficient\u2019s honest magnitudes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boiling Curve Read',
      'Nucleate Boiling Priced',
      'Nusselt\u2019s Film Condensation Craft',
    ],
  },
  {
    number: 7,
    slug: 'heat-exchangers',
    title: 'Heat Exchangers',
    summary:
      'The exchanger census (double-pipe, shell-and-tube, cross-flow, plate); the LMTD method with correction factors; the NTU-effectiveness method and when it beats LMTD; the design-versus-rating postures; fouling priced; and pressure-drop/heat-duty trade-offs named — the chapter the thermal design profession actually lives in.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Exchanger Census',
      'LMTD with Correction Factors',
      'NTU and Effectiveness',
      'Design versus Rating',
    ],
  },
  {
    number: 8,
    slug: 'radiation',
    title: 'Radiation',
    summary:
      'Thermal radiation and the electromagnetic honest note; blackbody behaviour — Stefan-Boltzmann, Planck\u2019s law named, Wien\u2019s displacement; emissivity and the grey- surface idealisation; irradiation, radiosity and absorptivity/reflectivity/ transmissivity; view factors by chart, algebra and the reciprocity engine; radiation exchange between black and grey surfaces with the network analysis; radiation shielding priced; and the combined-convection-and-radiation problems that close the book\u2019s practical census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Blackbody Behaviour and Its Laws',
      'Grey Surfaces and Radiosity',
      'The View-Factor Craft',
      'Radiation Networks and Shields',
      'Combined-Mode Problems Priced',
    ],
  },
  {
    number: 9,
    slug: 'synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The synthesis map — one page from Fourier to the network analysis; the multimode design census (insulated pipe, finned heat sink, exchanger retrofit priced end-to-end); mass transfer named honestly as diffusion\u2019s sibling with its future chemical-engineering home recorded; and the doorsteps — Renewable Energy\u2019s solar collectors, Power Systems\u2019 thermal current ratings, the electronics shelf\u2019s cooling chapters (VLSI Design\u2019s power chapter cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map: Fourier to Networks',
      'Three Designs Priced End-to-End',
      'The Doorsteps: Solar, Grids, Silicon',
    ],
  },
]

export const heatTransfer: Book = {
  id: 'heat-transfer',
  title: 'Heat Transfer',
  subtitle: 'Conduction, convection and radiation — the rate science of thermal engineering',
  discipline: 'engineering',
  level: 'First heat transfer course → thermal design and heat-exchanger readiness',
  description: 'The rate science to Thermodynamics\u2019 state science: the three modes and their rate equations; the thermal-resistance concept and its electrical analogy; one-dimensional steady conduction through walls, cylinders and spheres with the critical-radius honesty; extended surfaces — fins analysed and priced; transient conduction by the lumped-capacitance method with Heisler charts for the honest middle; the convective machinery — thermal boundary layers, the dimensionless-number census (Nusselt, Reynolds, Prandtl, Grashof) and the correlations for forced and free convection over flat plates and through pipes; boiling and condensation at regime level; heat exchangers priced by both LMTD and NTU-effectiveness with the design craft; radiation — the Stefan-Boltzmann law, Wien\u2019s displacement, black and grey surfaces, view factors and the radiation-network analysis; and a closing synthesis with the mass-transfer doorway named. Cross-references Thermodynamics (the property census), Fluid Mechanics (the convective boundary layer) and hands off to Power Systems\u2019 insulation and Renewable Energy\u2019s solar collectors.',
  status: 'planned',
  accent: ['#ea580c', '#9a3412'],
  chapters,
}
