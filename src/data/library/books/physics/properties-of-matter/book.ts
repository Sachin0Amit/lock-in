import type { Book, Chapter } from '../../../types'

/**
 * Properties of Matter — the third book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 105 planned lessons, zero written. Lesson ids will use the `prop-` prefix
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
      'Some Important Properties of Integration',
      'Properties of Definite Integral',
      'Some Properties of Vector Addition',
      'Properties of Bar Magnet',
      'Formal Properties of the Transformation Matrix',
      'String Waves and Matter Waves 1187 The Electrical Properties of Solids',
      'Some Properties of Atoms',
      'BIO Molecular Zipper',
      '1Types of Mechanical Waves',
      'Molecular Properties of Matter 585 20.8 Microscopic Interpretation of Entropy',
      'Molecular Speeds 597 Questions/Exercises/Problems',
      'Types of Molecular Bonds 1408 44.1 Fundamental Particles—A History',
      'Properties of Nuclei 1442 A The International System of Units A-1'
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
      'Deformation of Solids: Elastic and Plastic',
      'Dependence of Resistance on Various Factors',
      '*25–5 Factors Limiting Visual Acuity'
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
      'Young\'s Modulus: The Stiffness of a Wire',
    
      'Experimental Skills: Young\'s modulus of elasticity of the material of a metallic wire',
      'Important Facts About Elasticity',
      'Reynolds Number',
      'Avogadro\'s Number',
      'Case 1: Spring–Mass System Oscillating on a Smooth Horizontal Surface',
      'Vibration in Rods',
      'Poisson Brackets and Other Canonical Invariants',
      'Equilibrium and Elasticity 337 36 Diffraction',
      'Elastic Collisions 249 11.5 Elasticity and Plasticity',
      'A.1 Signed Numbers',
      'Rotation 214 16 Mechanical Waves; Sound'
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
    
      'Experimental Skills: Co-efficient of viscosity of a given viscous liquid by measuring the terminal velocity of a given spherical body',
      'Polynomial, Linear, and Quadratic Equations',
      'Similarities and Differences Between Viscosity and Sliding Friction',
      'Poiseuille\'s Formula for Flow of Liquid Through a Capillary Tube',
      'Opposite Phase SHMs',
      'Refraction at a Spherical Surface Convex Towards the Rarer Medium',
      'Lateral Magnification for Refracting Spherical Surface',
      'Measuring Things',
      'Interference 1047 Measuring an Event',
      'BIO Measuring Body Fat by Bioelectric'
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
      'Friction Acting on Multiple Surfaces',
      'Condition for Leaving the Circle: Tension Becomes Zero Before Speed',
      'Some Observed Phenomena Based on Surface Tension',
      'Selection of Gaussian Surface',
      'Solid Angle of a Surface Not Normal to Axis of Cone',
      'BIO Muscle Power 187 BIO Seeing Below the Surface with',
      'Equipotential Surfaces 764 Guided Practice'
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
      'Chain Rule or "Outside Inside" Rule',
      'Rise of a Liquid in a Capillary Tube (Ascent Formula)',
      'Melde\'s Experiment'
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
      'Concept Application Exercise 2.4',
      'Concept Application Exercise 2.5',
      'Concept Application Exercise 2.6',
      'Concept Application Exercise 2.7',
      'Concept Application Exercise 5.4',
      'Concept Application Exercise 5.5',
      'Concept Application Exercise 6.6',
      'Concept Application Exercise 6.7',
      'Concept Application Exercise 9.4',
      'Concept Application Exercise 4.5',
      'Concept Application Exercise 4.6',
      'Concept Application Exercise 4.7',
      'Concept Application Execise 5.1',
      'Concept Application Exercise 7.3',
      'Concept Application Exercise 7.4',
      'Concept Application Exercise 7.5',
      'Concept Application Exercise 8.3',
      'Concept Application Exercise 8.4',
      'Concept Application Exercise 8.5',
      'Concept Application Exercise 1.4',
      'Concept Application Exercise 1.5',
      'Concept Application Exercise 1.6',
      'Some Applications',
      'Linear and Nonlinear Media',
      'Propagation in Linear Media',
      'Strikes992 BIO Deuterium and Heavy Water Toxicity',
      'Table 17 Coefficient of Volume Expansion'
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
  description: 'The matter-side of mechanics: what solids and liquids do under load and at surfaces — stress and strain, the moduli and their engineering arithmetic, viscous flow with Poiseuille and Stokes, surface tension with capillarity and excess pressure, and thermal expansion. Cross-references mechanics (the elasticity ground) and heat-and-thermodynamics (the thermal-expansion register); hands off to both honestly.',
  status: 'planned',
  accent: ['#14b8a6', '#134e4a'],
  chapters,
}
