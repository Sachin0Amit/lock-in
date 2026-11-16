import type { Book, Chapter } from '../../../types'

/**
 * Theory of Machines — the third book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `tom-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Theory of Machines owns mechanism kinematics, gearing, governors, balancing, gyroscopics and vibrations. Machine Design grows the element design (gear tooth as a loaded member, brake capacity); Engineering Mechanics owns the bare kinetics theorems; Robotics and Automation inherits the kinematic machinery for manipulators; the vibrations arc serves every branch that spins or oscillates.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 2, the 'Theory of Machines' + 'Vibrations' lines
 *   (ME_2026_Syllabus.pdf, extracted this pass): displacement, velocity and acceleration
 *   analysis of plane mechanisms; dynamic analysis of linkages; cams; gears and gear
 *   trains; flywheels and governors; balancing of reciprocating and rotating masses;
 *   gyroscope; then free and forced vibration of SDOF systems, damping, vibration
 *   isolation, resonance, critical speeds of shafts — both lines are this book's
 *   register, vibrations hosted as its own chapter-pair.
 * - Khurmi & Gupta, Theory of Machines (Google Books contents read this pass:
 *   kinematics/kinesis of motion, SHM, simple mechanisms, velocity in mechanisms by
 *   instantaneous centres, cams, toothed gearing, gear trains, gyroscopic couple,
 *   inertia forces, turning moment diagrams, flywheels, governors, brakes) — the Indian
 *   canonical arc; Rattan's Theory of Machines named as the second pole.
 * - CE Section 2's 'Free Vibrations of undamped SDOF system' line cross-referenced (the
 *   civil register leans on the same chapter-pair).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'mechanisms-and-inversion',
    title: 'Mechanisms and Inversion',
    summary:
      'Links, kinematic pairs and chains; the four-bar chain and its inversions (crank-rocker, double-crank, double-rocker read from Grashof\u2019s law); the slider-crank chain and its inversions; degrees of freedom by Gruebler\u2019s criterion; mechanical advantage and transmission angle — the vocabulary every machine analysis speaks.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Kinematic Pairs and Chains',
      'The Four-Bar Family and Grashof\u2019s Law',
      'The Slider-Crank and Its Inversions',
      'Degrees of Freedom by Gruebler',
    ],
  },
  {
    number: 2,
    slug: 'velocity-analysis',
    title: 'Velocity Analysis',
    summary:
      'Velocity of mechanism points by the instantaneous-centre method (the Kennedy-Arnhold theorem locating the centres) and by the relative-velocity method (velocity polygons); the velocity-image principle; and worked engines and quick-return mechanisms as the honest test beds.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Instantaneous-Centre Method',
      'The Relative-Velocity Method',
      'Velocity Images and Worked Mechanisms',
    ],
  },
  {
    number: 3,
    slug: 'acceleration-analysis',
    title: 'Acceleration Analysis',
    summary:
      'Acceleration polygons with the total, tangential and centripetal components; the Coriolis engine — when it appears, how it is priced, worked on slotted-link and quick-return mechanisms; Klein\u2019s construction for the slider-crank; and dynamic analysis of linkages by inertia forces (D\u2019Alembert) leading into balancing.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Acceleration Polygons',
      'The Coriolis Engine',
      'Klein\u2019s Construction',
      'Inertia Forces in Linkages: D\u2019Alembert',
    ],
  },
  {
    number: 4,
    slug: 'cams-and-followers',
    title: 'Cams and Followers',
    summary:
      'Cam nomenclature and follower types; displacement diagrams (uniform, SHM, uniform acceleration-retardation, cycloidal) with their velocity/acceleration prices; cam profiles constructed graphically for translating and oscillating followers; pressure angle and undercutting named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Displacement Diagrams and Their Prices',
      'Constructing the Cam Profile',
      'Pressure Angle and Undercutting',
    ],
  },
  {
    number: 5,
    slug: 'toothed-gearing',
    title: 'Toothed Gearing',
    summary:
      'The law of gearing; gear tooth terminology (module, circular pitch, addendum circle); involute versus cycloidal profiles with the involute\u2019s honest victory; velocity ratio and slip; tooth interference and undercutting; arc of contact; and the efficiency-and-friction glance GATE prices.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Law of Gearing and the Involute',
      'Tooth Terminology and Interference',
      'Velocity Ratio Bookkeeping',
    ],
  },
  {
    number: 6,
    slug: 'gear-trains',
    title: 'Gear Trains',
    summary:
      'Simple, compound and reverted trains with train-value arithmetic; the epicyclic craft — tabular and algebraic methods worked on planetary drives; torque relations in epicyclic trains; and the applications census (automotive gearboxes, differentials) that makes the arithmetic worth learning.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Simple and Compound Trains',
      'The Epicyclic Craft',
      'Torque in Planetary Drives',
    ],
  },
  {
    number: 7,
    slug: 'flywheels-and-governers',
    title: 'Flywheels, Turning Moments and Governors',
    summary:
      'Turning-moment diagrams against crank angle; coefficient of fluctuation of speed and energy; flywheel rim and spoke sizing for engines and presses; then the governor family — Porter, Proell, Hartnell and Wilson-Hartnell with sensitiveness, stability, isochronism and hunting priced; governor effort and power.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Turning-Moment Diagrams and the Flywheel',
      'The Governor Family',
      'Sensitiveness, Stability, Hunting',
    ],
  },
  {
    number: 8,
    slug: 'balancing',
    title: 'Balancing of Rotating and Reciprocating Masses',
    summary:
      'Static and dynamic unbalance; balancing of several masses in different planes by the two-plane correction craft; balancing of a single cylinder and multi-cylinder inline engines — primary and secondary forces and couples; V-engines and radial configurations glanced; partial balancing with its honest residue.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Two-Plane Correction of Rotating Masses',
      'Reciprocating Engines: Primary and Secondary',
      'Partial Balancing and the Honest Residue',
    ],
  },
  {
    number: 9,
    slug: 'gyroscopic-couple',
    title: 'The Gyroscopic Couple',
    summary:
      'Angular momentum of a spinning body; the gyroscopic couple and precessional motion derived; priced on ships (pitching and rolling), aircraft (turning) and motorcycles and cars in a turn — the effects students meet in GATE numericals; and the stability of four-wheel versus two-wheel vehicles under gyroscopic action.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Couple Derived',
      'Ships, Aircraft and Turning Vehicles',
      'Gyroscopic Stability Priced',
    ],
  },
  {
    number: 10,
    slug: 'vibrations',
    title: 'Vibrations',
    summary:
      'Free vibration of the single-degree-of-freedom system (natural frequency by three engines: stiffness, energy, Rayleigh); damped free vibration with the damping factor and the three regimes; forced vibration under harmonic excitation with the dynamic magnifier; resonance and transmissibility — vibration isolation as the honest engineering answer; whirling and critical speed of shafts; and the multi-degree glimpse named for later books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Natural Frequency by Three Engines',
      'Damping: the Three Regimes',
      'Forced Vibration and the Magnifier',
      'Isolation and Transmissibility',
      'Critical Speed and Whirling of Shafts',
    ],
  },
]

export const theoryOfMachines: Book = {
  id: 'theory-of-machines',
  title: 'Theory of Machines',
  subtitle: 'Machines as mechanisms — velocity, acceleration, gears, governors, balance and vibration',
  discipline: 'engineering',
  level: 'Second-year theory of machines and vibrations → machine design readiness',
  description: 'The dynamics of engineered links: kinematic pairs, chains and inversions with degrees of freedom; velocity analysis by the instantaneous-centre and relative-velocity methods; acceleration analysis including the Coriolis engine; cams and followers designed against displacement diagrams; toothed gearing from the law of gearing to tooth interference; gear trains — simple, compound and the epicyclic craft; flywheels against turning-moment diagrams and the governor family; balancing of rotating and reciprocating masses; the gyroscopic couple priced on vehicles; and the vibrations arc — free and forced vibration of single-degree-of-freedom systems, damping and resonance, vibration isolation, whirling and critical speeds of shafts. Cross-references Engineering Mechanics (the kinetics engine), Machine Design (gears and brakes at design level) and hands off to Machine Design and Robotics and Automation.',
  status: 'planned',
  accent: ['#d97706', '#92400e'],
  chapters,
}
