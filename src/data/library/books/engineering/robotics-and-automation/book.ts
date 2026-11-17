import type { Book, Chapter } from '../../../types'

/**
 * Robotics and Automation — the tenth book of the Engineering shelf (Mechanical branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 37 planned lessons, zero written. Lesson ids will use the `robot-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Robotics owns the manipulator machinery (kinematics, Jacobians, dynamics, control) and the automation-system frame. Theory of Machines owns mechanism kinematics generally; Control Systems owns the servo theory; the CS shelf’s Internet of Things owns the sensor-network and connectivity layers; CAD/CAM owns the CIM integration; Assembly and Microprocessors owns the compute beneath.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Craig, Introduction to Robotics: Mechanics and Control 4e — the Pearson TOC
 *   read this pass (Introduction; Spatial Transformations; Forward Kinematics;
 *   Inverse Kinematics; Velocities, Static Forces, and Manipulator Jacobians;
 *   Dynamics; Trajectory Generation; and the control chapters).
 * - Groover, Automation, Production Systems, and Computer-Integrated Manufacturing —
 *   the Pearson TOC tab read this pass (Production Systems; Automation and Control
 *   Technologies; Industrial Control Systems; Hardware Components; the
 *   manufacturing-systems parts incl. automated flow lines and assembly) — the
 *   automation-frame chapters.
 * - Spong's Robot Modeling and Control named as the second pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-robot-idea',
    title: 'The Robot Idea',
    summary:
      'What a robot is, honestly (a manipulator plus control plus programming); the anatomy census — links, joints (prismatic/revolute), degrees of freedom, end effectors; the workspace (reachable versus dexterous); industrial classifications by configuration (articulated, SCARA, polar, cartesian, gantry) priced by their honest niches; and the robot-safety frame stated early.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Configuration Census',
      'Workspaces and Safety Stated Early',
      'Mechatronics and Robotics',
    ],
  },
  {
    number: 2,
    slug: 'spatial-transformations',
    title: 'Spatial Descriptions and Transformations',
    summary:
      'Frames and position vectors; rotation matrices and their properties (orthogonality, composition, the fixed-versus-current-frame honest distinction); Euler angles and fixed angles with their singularity honesty; the homogeneous transform as the bookkeeping engine; and the DH convention earned as the manipulator\u2019s native notation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rotation Matrices Composed',
      'The Homogeneous Transform',
      'The DH Convention Earned',
    ],
  },
  {
    number: 3,
    slug: 'forward-kinematics',
    title: 'Forward Kinematics',
    summary:
      'Link frames assigned by DH through a serial chain; the forward-kinematics solution as the chain product of transforms; worked honestly on the planar two-link and a PUMA-style arm; and the workspace mapped from the kinematics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'DH Frames Through the Chain',
      'The Chain Product Worked',
      'Workspace Mapped from Kinematics',
    ],
  },
  {
    number: 4,
    slug: 'inverse-kinematics',
    title: 'Inverse Kinematics',
    summary:
      'The inverse problem stated with its honest difficulties (multiple solutions, no closed form, infeasibility); closed-form solutions for the planar arm and the wrist-partitioned industrial arm; the geometric-versus-algebraic routes; and numerical iteration glanced with the initial-guess honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Multiple Solutions Priced',
      'Closed Form: the Planar Arm',
      'Wrist Partitioning for Real Arms',
      'Numerical Routes Glanced',
    ],
  },
  {
    number: 5,
    slug: 'jacobians-velocities-and-statics',
    title: 'Velocities, Static Forces and Jacobians',
    summary:
      'The manipulator Jacobian derived and read (linear and angular rows); singular configurations — where the Jacobian loses rank and the arm loses a degree of freedom, priced on real postures; static forces through the Jacobian transpose (the duality); and the velocity-propagation route as the alternative engine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Jacobian Derived and Read',
      'Singularities Priced on Real Postures',
      'Static Forces: the Transpose Duality',
    ],
  },
  {
    number: 6,
    slug: 'dynamics-and-trajectories',
    title: 'Dynamics and Trajectory Generation',
    summary:
      'Lagrangian dynamics of manipulators (Engineering Mechanics\u2019 Lagrange chapter cross-referenced, the mass-matrix structure read); joint-space and cartesian trajectory generation (cubic and quintic polynomials, linear-with-parabolic blends); path versus trajectory distinguished honestly; and the dynamics\u2019 use for simulation and control named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lagrangian Route for Arms',
      'Cubic and Quintic Trajectories',
      'Blends and the Time-Scaling Craft',
    ],
  },
  {
    number: 7,
    slug: 'control-and-sensing',
    title: 'Motion Control, Sensors and End Effectors',
    summary:
      'Position control of joints (PD and PID at the servo level, Control Systems cross-referenced); independent-joint versus computed-torque control glanced; the sensor census — encoders, resolvers, force/torque sensors, machine vision named; grippers and tool changers; and robot programming languages and the teach-pendant craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Joint Servos: PD and PID',
      'The Sensor Census',
      'Grippers and Programming',
    ],
  },
  {
    number: 8,
    slug: 'industrial-automation',
    title: 'Industrial Automation and the Doorstep',
    summary:
      'The automation frame from Groover\u2019s arc: automated flow lines and transfer machines; assembly systems and line balancing cross-referenced to Industrial Engineering; AGVs, robots-in-cells and the control hierarchy (devices, cells, lines, plant); industrial control systems (PLC named, the CS shelf\u2019s Digital Logic Design and Assembly cross-referenced); Industry 4.0 and the IIoT doorstep to Internet of Things; and the honest economics — when automation pays.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Flow Lines and Transfer Machines',
      'Cells, AGVs and the Control Hierarchy',
      'The IIoT Doorstep',
      'The Honest Economics of Automation',
    ],
  },
]

export const roboticsAndAutomation: Book = {
  id: 'robotics-and-automation',
  title: 'Robotics and Automation',
  subtitle: 'From spatial transformations to factory automation — the robot as an engineered machine',
  discipline: 'engineering',
  level: 'First robotics course → industrial-automation readiness',
  description: 'The robot idea: history and anatomy (links, joints, degrees of freedom, the workspace); industrial-robot classifications; spatial descriptions and transformations (frames, rotations, homogeneous transforms, the DH convention); forward kinematics of serial manipulators; inverse kinematics solved honestly (closed-form where it exists, numerical otherwise); velocities and static forces through the Jacobian with singularities priced; manipulator dynamics (Lagrangian route cross-referenced to Engineering Mechanics) and trajectory generation; motion control and end-effectors/sensors; robot programming; and the automation frame — automated flow lines, assembly systems, AGVs, industrial control and robot safety — with Industry 4.0 named. Cross-references Theory of Machines (mechanism kinematics), Control Systems (the servo loop), CAD/CAM (the digital factory) and hands off to the Computer Science shelf\u2019s Internet of Things.',
  status: 'planned',
  accent: ['#0f766e', '#134e4a'],
  chapters,
}
