import type { Book, Chapter } from '../../../types'

/**
 * Mechanics — the second book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 12 chapters /
 * 127 planned lessons, zero written. Lesson ids will use the `pmech-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Mechanics owns the calculus-based classical register (the JEE units Kinematics, Laws of Motion, Work Power Energy, Rotational Motion, Gravitation; the GATE PH Classical Mechanics section incl. the Lagrangian/Hamiltonian formulations read this pass). The fluid-mechanics backlog line is FOLDED here (fluid statics + dynamics chapters) with the engineering shelf’s fluid-mechanics book cross-referenced for the thermo-fluids applied side; properties-of-matter owns the matter-side (viscosity and surface tension deep).
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus PDF (gate2026.iitg.ac.in, read this pass — Classical Mechanics: Newton's laws, variational principle, Lagrangian and Hamiltonian formulations, central-force problem, rotating frames, scattering) as the university spine for the closing chapters.
 * - Halliday, Resnick & Walker (contents read this pass — Parts 1-3: motion, force, energy, momentum, rotation, gravitation, fluids) as the shelf's main arc.
 * - The JEE Main 2026 syllabus (read this pass) and Taylor, Classical Mechanics (the canonical analytical arc, named for the closing chapters) as the competitive and university poles.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'kinematics-one-dimension',
    title: 'Kinematics in One Dimension',
    summary:
      'Position, velocity and acceleration as derivatives with the calculus vocabulary made honest; the v-t and a-t graphs read by slope and area; and uniformly accelerated motion derived from the derivative definitions instead of quoted.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Derivative Definitions',
      'Graphs by Slope and Area',
      'Deriving the Equations',
      'Variable-Acceleration Problems',
      'Position of a Point',
      'Tangential and Radial Acceleration',
      'Total Acceleration',
      'Combined Rotation and Translation',
      'Acceleration Due to Gravity',
      'Liquid in a Vessel Rotating with Constant Angular Velocity',
      'Some Definitions',
      'Some Techniques of the Calculus of Variations',
      'Finite Rotations',
      'Infinitesimal Rotations',
      'The Eigenvalue Equation and the Principal Axis Transformation',
      '"Ordinary" Derivatives',
      'Another Look at Constant Acceleration',
      'Angular Velocity and Acceleration 272 13.6 Spherical Mass Distributions',
      'Rotation with Constant Angular Acceleration 277 13.7 Apparent Weight and the Earth’s Rotation',
      'Relating Linear and Angular Kinematics 279 13.8 Black Holes'
    ],
  },
  {
    number: 2,
    slug: 'kinematics-two-dimensions',
    title: 'Kinematics in Two Dimensions',
    summary:
      'The vector resolution of motion: projectiles as the composite of two independent one-dimensional motions, the trajectory equation derived and read; relative velocity with the river-boat and rain-man registers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Projectile Composite',
      'The Trajectory Equation',
      'Relative Velocity Craft',
      'River-Boat and Rain-Man Registers',
      'Horizontal Projectile',
      'Vibrations of Composite Strings',
      'Relative intensity and Dynamic Range',
      'Acrobats in Equilibrium 223 Relative Velocity and Reference Frames'
    ],
  },
  {
    number: 3,
    slug: 'newtons-laws-deep',
    title: 'Newton\u2019s Laws in Full',
    summary:
      'The full free-body discipline: constraint relations, pulleys and wedges, friction\u2019s angle of repose and banking of roads; pseudo-forces previewed for the circular chapter; the assertion-reason registers of the competitive papers priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Constraint Relations',
      'Pulleys and Wedges',
      'Friction\u2019s Full Dress',
      'Banking and Turning',
      'Trigonometrical Ratios of General Angles (Reduction Formulae)',
      '[cover/title page] (duplicate — Chapter opener / contents page, same as page 1)',
      '[cover/title page] (duplicate of chapter contents page)',
      'Constraints Due to Ropes and Pulleys',
      'Pages 3–12 are body content (chapter text, illustrations, sections), not table of contents',
      'Appendix A ■ Euler Angles in Alternate Conventions and Cayley–Klein Parameters',
      'The Moons of Jupiter 82 CHAPTER 19 Circular Polarization and 3-D Movies',
      'Walking and Running on the Moon 400 for Cancer Therapy 941 CHAPTER',
      'VOLUME 1: Chapters 1–20 • VOLUME 2: Chapters 21–37 • VOLUME 3: Chapters 37–44',
      'Pulleys Connected with a Belt'
    ],
  },
  {
    number: 4,
    slug: 'circular-and-noninertial',
    title: 'Circular Motion and Non-Inertial Frames',
    summary:
      'Uniform and non-uniform circular motion with the centripetal ledger resolved; vertical circles and the conical pendulum; rotating frames with centrifugal and Coriolis pseudo-forces — the GATE register that geophysics later borrows.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Centripetal Ledger',
      'Vertical Circles',
      'Rotating Frames',
      'Coriolis in the Large',
      'Condition of Completing Vertical Circle'
    ],
  },
  {
    number: 5,
    slug: 'work-energy-deep',
    title: 'Work and Energy in Full',
    summary:
      'The work-energy theorem for variable forces; potential-energy curves read as landscapes; conservative against non-conservative forces; and the energy method as the shortcut the competitive register rewards.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Work-Energy Theorem',
      'Potential Landscapes',
      'Conservative Forces',
      'The Energy Shortcut',
      'Power: The Rate of Doing Work',
      'Binomial Expression and Theorem',
      'Lami\'s Theorem',
      'Dependence of Rate of Cooling',
      'Carnot Theorem',
      'Alternative Method',
      'Conditions for Closed Orbits (Bertrand\'s Theorem)',
      'The Helmholtz Theorem',
      'B The Helmholtz Theorem'
    ],
  },
  {
    number: 6,
    slug: 'momentum-and-collisions',
    title: 'Momentum and Collisions',
    summary:
      'Impulse and the second law restated; conservation of momentum in one and two dimensions; elastic, inelastic and super-elastic collisions classified by the coefficient of restitution; centre of mass and its motion as the system\u2019s diplomat.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Impulse and Restatement',
      'Collision Taxonomy',
      'Two-Dimensional Collisions',
      'Centre of Mass Craft',
      'Methods to Find Dimensions of Physical Constant or Coefficients',
      'Centre of Mass of a Semicircular Disc',
      'Collision or Impact',
      'Oblique Collision of Two Discs',
      'Elastic Hysteresis',
      'Second Approach',
      'Center of Mass and Linear Momentum',
      'A New Look at Momentum',
      'Momentum and Impulse 235 11.2 Center of Gravity',
      'Momentum Conservation and Collisions 245 11.4 Stress, Strain, and Elastic Moduli'
    ],
  },
  {
    number: 7,
    slug: 'rotational-dynamics',
    title: 'Rotational Dynamics',
    summary:
      'Torque and moment of inertia with the parallel and perpendicular axis theorems; the rolling register with slipping and rolling friction honestly told; angular momentum conserved — the ice-skater ledger — and the gyroscope named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Torque and Inertia',
      'The Axis Theorems',
      'Rolling Craft',
      'Angular Momentum',
      'Rigid-Body Equilibrium and the Torque Balance',
      'Rolling without Slipping: Rings, Cylinders and Spheres',
      'Finding Instantaneous Axis of Rotation in Different Situations',
      'Rolling as Pure Rotation About Point of Contact',
      'Calculation of Torque',
      'Dynamics of Combination of Translation and Rotation',
      'Growth of Ice on Lake',
      'Charged Conducting Sphere',
      'Outside the Sphere',
      'Radioactive Equilibrium',
      'Conditions for Equilibrium',
      'Parallel-Axis Theorem 287 Guided Practice',
      'Angular Momentum 316 Guided Practice',
      '9–3 Dynamics of Rotation about a Fixed Axis 221 16–3 Moving Sources and Observers',
      '9–5 Angular Momentum 226 16–4 Power and Intensity; the Decibel Scale'
    ],
  },
  {
    number: 8,
    slug: 'gravitation-and-orbits',
    title: 'Gravitation and Orbits',
    summary:
      'The gravitational field and potential built for shells and spheres; Kepler\u2019s laws derived from the inverse-square law; escape and orbital velocities; geo-stationary and polar satellite registers; and the two-body reduction to the central-force form.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Field and Potential',
      'Kepler Derived',
      'Escape and Orbit',
      'Satellite Registers',
      'Integration as Inverse of Differentiation',
      'MI of a Square Lamina About Its Diagonal',
      'Expression for Gravitational Potential at a Point',
      'Artificial Satellite',
      'Precession of the Equinoxes and of Satellite Orbits',
      'Alignment of Polar Molecules',
      'BIO Converting Gravitational Potential Why Lightning Bolts Are Vertical  736 CHAPTER',
      'D.2 Squares and Square Roots'
    ],
  },
  {
    number: 9,
    slug: 'fluid-statics',
    title: 'Fluid Statics (the folded line)',
    summary:
      'The folded fluid-mechanics line, static side: pressure\u2019s depth law, Pascal\u2019s law and hydraulic machines, Archimedes\u2019 principle with floating and immersed bodies, the metacentre named gently, and barometers and manometers read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Pressure at Depth',
      'Pascal\u2019s Machines',
      'Buoyancy Craft',
      'Barometers and Manometers',
      'BIO Pollen and Fluid Resistance 147 BIO The Telephoto Eyes of Chameleons',
      'Compound Machines',
      'Fluids 257 17–1 Electric Charge'
    ],
  },
  {
    number: 10,
    slug: 'fluid-dynamics',
    title: 'Fluid Dynamics',
    summary:
      'The folded line, moving side: streamline against turbulent flow, the continuity equation, Bernoulli\u2019s principle derived and applied — Torricelli, Venturi, aircraft lift told honestly — with viscosity\u2019s first meeting and Stokes\u2019 terminal register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Streamlines and Continuity',
      'Bernoulli Derived and Applied',
      'Torricelli and Venturi',
      'Terminal Velocity Taster',
      'Visualization of Flow'
    ],
  },
  {
    number: 11,
    slug: 'lagrangian-mechanics',
    title: 'The Lagrangian Doorstep',
    summary:
      'The analytical doorway: d\u2019Alembert\u2019s principle to the Euler-Lagrange equations, generalised coordinates chosen well, constraints honest; the simplest solved cases the GATE register names — the pendulum and the Atwood machine re-derived free of constraint forces.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Generalised Coordinates',
      'The Euler-Lagrange Equations',
      'Pendulum Re-derived',
      'Atwood Again',
    
      'Lagrangian Formulation',
      'Simple Applications of the Lagrangian Formulation',
      'Cartesian Coordinates'
    ],
  },
  {
    number: 12,
    slug: 'hamiltonian-and-central-forces',
    title: 'The Hamiltonian and Central Forces',
    summary:
      'Legendre transforms to the Hamiltonian and Hamilton\u2019s equations; conserved quantities read off symmetries — Noether named gently; the central-force problem reduced to the effective potential with scattering angles previewed for the particle book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Legendre to Hamilton',
      'Symmetries and Conserved Quantities',
      'The Effective Potential',
      'Scattering Previewed',
      'Variational Principles and the Calculus of Constraints',
      'Central Force Motion and Kepler\'s Problem',
      'Scattering Cross-Sections and Rutherford',
      'Oscillations about Equilibrium and Normal Coordinates',
      'MI of a Triangular Lamina About Its Base',
      'The Cayley–Klein Parameters and Related Quantities'
    ],
  },
]

export const mechanics: Book = {
  id: 'mechanics',
  title: 'Mechanics',
  subtitle: 'The calculus-based mechanics course: kinematics to Hamiltonian, with the fluid-mechanics line folded in',
  discipline: 'physics',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The heart of the shelf: motion described with calculus, forces resolved with the full free-body craft, energy and momentum as the solvers\u2019 twin engines, rotation and gravitation at orbit depth, the folded fluid register, and the Lagrangian-Hamiltonian doorstep.',
  status: 'planned',
  accent: ['#6366f1', '#312e81'],
  chapters,
}
