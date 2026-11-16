import type { Book, Chapter } from '../../../types'

/**
 * Properties of Matter — the third book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `prop-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Properties of Matter owns the matter-side register (elasticity, viscosity, surface tension, thermal expansion — the NCERT class 11 mechanical-properties units and the JEE register). The mechanics book owns the fluid kinematics side (flow, Bernoulli); the engineering fluid-mechanics book owns the thermo-fluids applied side; heat-and-thermodynamics owns temperature’s deep theory.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NEET 2026 syllabus PDF (nta.ac.in, read this pass — the mechanical-properties units) and the JEE Main 2026 syllabus (read this pass) as the school-competitive registers.
 * - Halliday, Resnick & Walker (contents read this pass) for the matter chapters' university arc.
 * - The boards' practical register (Young's modulus by Searle's apparatus, surface tension by capillary rise — the experiment craft that the experimental-physics book later consolidates) priced here as the closing chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'molecular-picture',
    title: 'The Molecular Picture',
    summary:
      'Intermolecular forces and the spacing they imply; the three states mapped on the potential-energy curve; the distinction between a solid\u2019s lattice discipline and a liquid\u2019s loose society — the frame every later property hangs on.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Intermolecular Forces',
      'The Potential Curve',
      'States Mapped',
      'Why Matter Has Properties',
    ],
  },
  {
    number: 2,
    slug: 'stress-and-strain',
    title: 'Stress and Strain',
    summary:
      'The load-response ledger: stress and strain defined with their types — tensile, compressive, shear; Hooke\u2019s law and the elastic limit read on the stress-strain curve; breaking stress, working stress and the factor of safety named for the engineer ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Load-Response Ledger',
      'Hooke and the Elastic Limit',
      'The Stress-Strain Curve',
      'Factors of Safety',
    ],
  },
  {
    number: 3,
    slug: 'moduli-and-elastic-energy',
    title: 'The Moduli and Elastic Energy',
    summary:
      'Young\u2019s, bulk and shear moduli with the Poisson ratio joining them; the energy stored in a stretched wire; springs in series and parallel; thermal stress in a clamped rod; and the torsion of a cylinder as the rotation-side of elasticity.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Moduli',
      'Energy in a Wire',
      'Springs in Numbers',
      'Torsion of a Cylinder',
    ],
  },
  {
    number: 4,
    slug: 'viscosity-and-flow',
    title: 'Viscosity and Streamline Flow',
    summary:
      'Newton\u2019s viscosity law with the temperature dependence told for liquids and gases honestly opposite; Poiseuille\u2019s equation derived by dimensional confidence and used; Stokes\u2019 law and terminal velocity as the falling-sphere craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Newton\u2019s Viscosity Law',
      'Poiseuille\u2019s Register',
      'Stokes\u2019 Law',
      'Terminal Velocity Worked',
    ],
  },
  {
    number: 5,
    slug: 'surface-tension-energy',
    title: 'Surface Tension and Surface Energy',
    summary:
      'The surface defined as energy: surface tension as force per length and energy per area told as one idea; the angle of contact as the three-surface treaty; and the temperature dependence with the boiling\u2019s and the cleansing\u2019s everyday registers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Surface as Energy',
      'The Contact Angle Treaty',
      'Temperature Effects',
      'Everyday Registers',
    ],
  },
  {
    number: 6,
    slug: 'capillarity-and-excess-pressure',
    title: 'Capillarity and Excess Pressure',
    summary:
      'The curved-surface arithmetic: Jurin\u2019s capillary rise derived; the excess pressure inside a drop, a bubble and a soap film; the coalescing-drops experiment; and liquid drops and bubbles read together as the closing classic register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Jurin\u2019s Rise',
      'Excess Pressure Census',
      'Drops and Bubbles',
      'Coalescence Problems',
    ],
  },
  {
    number: 7,
    slug: 'thermal-expansion',
    title: 'Thermal Expansion',
    summary:
      'Linear, areal and volumetric expansion with the relations among the three coefficients; the anomalous expansion of water and its ecological consequence told; bimetallic strips, pendulum clocks and expansion gaps as the honest applications.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Expansions',
      'Water\u2019s Anomaly',
      'Applications Register',
      'Numerical Practice',
    ],
  },
  {
    number: 8,
    slug: 'property-laboratory',
    title: 'The Property Laboratory',
    summary:
      'The boards\u2019 practical register consolidated: Young\u2019s modulus by Searle\u2019s apparatus, surface tension by capillary rise and by the frame-and-slate balance, viscosity by Stokes\u2019 and by Poiseuille\u2019s capillary flow — each with its error arithmetic carried honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Searle\u2019s Apparatus',
      'Capillary and Frame Methods',
      'Viscosity Practicals',
      'Error Arithmetic',
    ],
  },
]

export const propertiesOfMatter: Book = {
  id: 'properties-of-matter',
  title: 'Properties of Matter',
  subtitle: 'Elasticity, viscosity and surface tension: the mechanical behaviour of matter told from the molecular picture up',
  discipline: 'physics',
  level: 'Class 11-12 + competitive',
  description: 'The matter-side of mechanics: what solids and liquids do under load and at surfaces — stress and strain, the moduli and their engineering arithmetic, viscous flow with Poiseuille and Stokes, surface tension with capillarity and excess pressure, and thermal expansion.',
  status: 'planned',
  accent: ['#14b8a6', '#134e4a'],
  chapters,
}
