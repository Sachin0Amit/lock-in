import type { Book, Chapter } from '../../../types'

/**
 * Mechanics — the second book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 12 chapters /
 * 48 planned lessons, zero written. Lesson ids will use the `pmech-` prefix
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
