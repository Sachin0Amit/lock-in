import type { Book, Chapter } from '../../../types'

/**
 * Engineering Mechanics — the first book of the Engineering shelf (Mechanical branch, the shelf’s foundation).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 136 planned lessons, zero written. Lesson ids will use the `mech-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Engineering Mechanics owns the pure mechanics of rigid bodies — equilibrium and plane motion. Strength of Materials grows the deformable body from its statics; Theory of Machines applies its dynamics to links and gears; Lagrange’s equation hands off to the mathematics shelf’s variational arc (Mathematical Methods for Engineering). Physics mechanics belongs to the future Physics shelf (cross-reference when planned).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 2 (ME_2026_Syllabus.pdf, downloaded + extracted this pass):
 *   'Engineering Mechanics: Free-body diagrams and equilibrium; friction and its
 *   applications including rolling friction, belt-pulley, brakes, clutches, screw jack,
 *   wedge, vehicles; trusses and frames; virtual work; kinematics and dynamics of rigid
 *   bodies in plane motion; impulse and momentum (linear and angular) and energy
 *   formulations; Lagrange's equation' — the whole line is this book's register.
 * - Hibbeler, Engineering Mechanics: Statics + Dynamics (the Pearson SI-edition TOC read
 *   this pass — force vectors, particle/rigid-body equilibrium, structural analysis,
 *   friction, centroids, virtual work, then the kinematics/kinetics arc).
 * - Beer & Johnston's Vector Mechanics for Engineers (both halves) web-checked as the
 *   second pole; the plane-mechanism dynamics wording follows the GATE register.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-statics-frame',
    title: 'The Statics Frame',
    summary:
      'The engineer\u2019s first discipline: units and the Newton (the honest SI census), force vectors in the plane and in space, the dot and cross products as working tools, resultants, and the free-body diagram — the single drawing habit that separates the engineer from the guesser. Equilibrium of a particle in two and three dimensions closes the frame.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Free-Body Diagram: the Engineer\u2019s First Instrument',
      'Force Vectors and Their Resultants',
      'Equilibrium of a Particle: 2D and 3D',
      'Appendices A-L',
      'Viii Contents',
      'X Contents',
      'Reduction in Nonlinear',
      'Splitting 860 (PSRR)',
      'Summary 927 Realization',
      'Xii Contents',
      '(VTC) 1136 18.2.1 The Latch',
      'Appendices',
      'Summary 1183 Prefixes J-1',
      '* Available online at www.oup.com/he/sedra-smith8e',
      'From Indication to Illumination',
      '(ISSCC)',
      'Fundamentalist',
      'The Creator of the pA741: David Fullagar',
      'CAMBRIDGE',
      'Avenue of the Americas, New York, NY 10013-2473, USA',
      'Www.cambridge.org',
      'Third edition',
      'A catalog record for this publication is available from the British Library',
      'ISBN 978-0-521-80926-9 Hardback',
      'Preface to the Third Edition — xxix',
      'Connectors',
      'Transconductance',
      'Bootstrapping',
      'The challenge: 10 mV, 1%, 10 MΩ, 1.8 V single supply',
      'It\'s impossible!',
      'Wrong – it is possible!',
      'The 34401A 6.5-digit front end',
      'The 34420A 7.5-digit frontend',
      'In defense of the beleaguered',
      'Switchers: looking more closely',
      'Three-terminal precision references',
      'Synchronizer',
      'The basic PAL',
      'The FPGA',
      'Advice',
      'Photomultipliers',
      'TOSLINK',
      'Versatile Link',
      'RS-232',
      'Wrapup',
      'Some preliminaries',
      'Idle tones',
      'AD7873 touchscreen digitizer',
      'More on Deriving the Thévenin',
      'Radiators',
      'Summary 49 Resistors',
      'Summary 435 Summary',
      'Simultaneous Appendix F An Abbreviated',
      'Identities',
      'B.4 Useful Identities',
      'Flashlight',
      'Fig. 1.5',
      'Fig. 1.7',
      'Frequencies',
      'Fibreoptics',
      'Contents ix',
      'Summary of important formulae 361 19.7 Construction and static characteristics of',
      'Logarithmic units 404 20.22 JUGFET',
      'Contents xi',
      'Contents xiii',
      'Xiv Contents',
      'Introductory',
      'Contents xv',
      'WEBSITE',
      'Www.pearsoned.co.uk/hughes'
    ],
  },
  {
    number: 2,
    slug: 'moments-and-rigid-equilibrium',
    title: 'Moments and Rigid-Body Equilibrium',
    summary:
      'Moment of a force about a point and about an axis, couples and moment couples, moving a force along its line of action, distributed loads reduced to their resultants, and equilibrium of the rigid body in two and three dimensions — including two- and three-force members and the bearing reactions that real machines impose.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Moments, Couples and Their Algebra',
      'Equilibrium of the Rigid Body',
      'Distributed Loads and Their Resultants',
      'What about MOSFETs?'
    ],
  },
  {
    number: 3,
    slug: 'structural-analysis',
    title: 'Structural Analysis',
    summary:
      'The classic determinate structures: plane trusses by the method of joints and the method of sections (zero-force members read honestly), space trusses, frames and machines analysed member-by-member — every member a two-force member or not, said out loud. The chapter the civil shelf\u2019s Structural Engineering book leans on for its determinate catalogue.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Trusses: the Method of Joints',
      'Trusses: the Method of Sections',
      'Frames and Machines: Multi-force Members',
    
      'Engineering Aptitude covering Logical reasoning and Analytical ability',
      'Degeneration 741 Method',
      'Effects of Fan-In and Fan-Out on Problems',
      'Cambridge University Press has no responsibility for the persistence or accuracy of URLs for external or third-party Internet websites referred to in this publication and does not guarantee that any content on such websites is, or will remain, accurate or appropriate',
      'Not quite perfect',
      'Additional Exercises for Chapter',
      'Review of Chapter',
      'Electrical Engineering: An Overview 4 Realistic Resistors',
      'Appliances 382 Chapter'
    ],
  },
  {
    number: 4,
    slug: 'friction-and-its-applications',
    title: 'Friction and Its Applications',
    summary:
      'Dry friction from the Coulomb law with its honest limits; angles of friction and tipping-versus-sliding; then the application census the GATE register prices — wedges, the screw jack and self-locking threads, flat and V-belts over pulleys, journal and disc friction, brakes and clutches at mechanism level, and rolling resistance priced against sliding.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Dry Friction: Tipping versus Sliding',
      'Wedges and the Screw Jack',
      'Belt-Pulley Systems and Brake/Clutch Friction',
      'Rolling Resistance Priced',
      '(Emitter) Resistance',
      'The Common-Gate (CG) and the',
      'An Emitter Resistance Re',
      'Effect of the Output Resistance of the 9.4 DC Offset',
      'Gates 1167 Summary',
      'Catalog of common gates',
      'Shift registers',
      'Simplification 63 4.18 Finding the Thévenin Equivalent Resistance',
      'Gate standardization',
      'Of rotor resistance'
    ],
  },
  {
    number: 5,
    slug: 'centroids-and-inertia',
    title: 'Centroids, Centre of Gravity and Moments of Inertia',
    summary:
      'Centroids of lines, areas and volumes by integration and by composite parts; centres of gravity and mass; the theorems of Pappus-Guldinus; then area moments of inertia — rectangular and polar, parallel-axis and radius of gyration, products of inertia and Mohr-style principal axes — the geometric treasury every later beam, column and rotation analysis draws from.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Centroids by Composite Parts',
      'Theorems of Pappus-Guldinus',
      'Moments of Inertia and the Parallel-Axis Theorem',
      'Products of Inertia and Principal Axes',
      'Area 1149 Cells',
      'Thévenin\'s theorem generalized',
      'Parallel buses and data links',
      'Thévenin’s theorem'
    ],
  },
  {
    number: 6,
    slug: 'virtual-work',
    title: 'Virtual Work',
    summary:
      'Statics without solving for reactions: the principle of virtual work stated honestly (a virtual displacement does no net work on an equilibrium system), applied to mechanisms, linked bodies and beams under moving loads, and the potential-energy stationarity reading — the elegant close of the statics half and the doorstep of analytical mechanics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Principle Stated and First Applied',
      'Machines and Linked Bodies by Virtual Work',
      'The Potential-Energy Reading',
    ],
  },
  {
    number: 7,
    slug: 'kinematics-of-motion',
    title: 'Kinematics of Particles and Rigid Bodies',
    summary:
      'Rectilinear and curvilinear motion in the plane, the n-t and r-theta components, relative motion, and then rigid-body plane motion decomposed into translation, rotation about a fixed axis and general plane motion — the absolute/relative-velocity construction. The mathematics shelf\u2019s calculus and vectors are presupposed and cross-referenced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Curvilinear Motion and Its Components',
      'Rotation About a Fixed Axis',
      'General Plane Motion: the Velocity Construction',
      'PLL components',
      'Relative permittivity',
      'Transformers 646 30.9 Rotary motion'
    ],
  },
  {
    number: 8,
    slug: 'kinetics-force-and-acceleration',
    title: 'Kinetics: Force and Acceleration',
    summary:
      'Newton\u2019s second law for particles and for rigid bodies in plane motion (translation, fixed-axis rotation, general plane motion with the kinetic diagram drawn beside the free-body diagram), angular momentum of a rigid body, and the gyroscopic effect named here and priced fully in Theory of Machines.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Kinetic Diagram Beside the Free-Body',
      'Plane Motion of Rigid Bodies',
      'Angular Momentum and the Gyroscopic Glimpse',
      'Second edition',
      'Preface to the Second Edition — xxvii',
      'The Effect of Resistor Tolerance on the 4.20 Using a Thévenin Equivalent to Analyze the'
    ],
  },
  {
    number: 9,
    slug: 'work-energy-and-impulse',
    title: 'Work, Energy and Impulse-Momentum',
    summary:
      'The energy formulation — work of a force and a couple, kinetic energy of bodies in plane motion, conservative forces and potential energy, conservation of energy and the work-energy relation — and the impulse-momentum formulation, linear and angular, impact of rigid bodies included. The formulation census the GATE register names: when each engine is the honest tool.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Work-Energy Engine',
      'Conservative Forces and Energy Bookkeeping',
      'Linear and Angular Impulse-Momentum',
      'Impact of Rigid Bodies',
    ],
  },
  {
    number: 10,
    slug: 'lagrange-and-the-doorstep',
    title: 'Lagrange\u2019s Equations and the Doorstep',
    summary:
      'Generalised coordinates, degrees of freedom and constraints; Lagrange\u2019s equations of motion for holonomic systems derived from the virtual-work principle and worked on particles, pendulums and simple linkages — the analytical-mechanics doorway the register requires. The synthesis maps the whole book and the doorsteps: Strength of Materials (deformable statics), Theory of Machines (mechanism dynamics), Vibrations in Theory of Machines, and the mathematics shelf\u2019s variational arc.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Generalised Coordinates and Constraints',
      'Lagrange\u2019s Equations, Derived and Worked',
      'The Synthesis: Four Formulations, One Mechanics',
      'The Doorstep: from Rigid to Deformable',
      'Minimization and Karnaugh maps',
      'A simple SAR example',
      'To Write Simultaneous Equations',
      'Karnaugh maps for simplifying'
    ],
  },
]

export const engineeringMechanics: Book = {
  id: 'engineering-mechanics',
  title: 'Engineering Mechanics',
  subtitle: 'Statics to Lagrange — the equilibrium and motion of engineered bodies, honestly priced',
  discipline: 'engineering',
  level: 'First-year engineering mechanics → second-year strength of materials readiness',
  description: 'The shelf\u2019s foundation stone: everything mechanical, electrical and civil that follows assumes this book\u2019s discipline. Force vectors and the free-body diagram as the engineer\u2019s first instrument; equilibrium of particles and rigid bodies; moments, couples and force system resultants; structural analysis by trusses (joints and sections), frames and machines; friction with its honest applications — rolling resistance, belt-pulley, brakes, clutches, the screw jack and wedges; centroids, centres of gravity and area moments of inertia; virtual work as the elegant end of statics; then the dynamics arc — plane kinematics of particles and rigid bodies, force and acceleration, work-energy and impulse-momentum (linear and angular), and Lagrange\u2019s equations as the gateway to analytical mechanics. Cross-references Mathematical Methods for Engineering (the vector calculus) and hands off to Strength of Materials (Statics earns its stress) and Theory of Machines (the dynamics of engineered links).',
  status: 'planned',
  accent: ['#b45309', '#7c2d12'],
  chapters,
}
