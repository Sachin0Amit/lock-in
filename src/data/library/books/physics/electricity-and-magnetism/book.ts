import type { Book, Chapter } from '../../../types'

/**
 * Electricity and Magnetism — the sixth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 44 planned lessons, zero written. Lesson ids will use the `emag-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Electricity and Magnetism owns the school-competitive E&M register (the JEE/NEET units: electrostatics, current electricity, magnetic effects, EMI, alternating currents). The electromagnetic-theory book owns the Maxwell-level university mathematics (boundary-value problems, matter’s fields, waveguides); the engineering shelf’s circuit-theory book owns the network-analysis engineering side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The JEE Main 2026 and NEET 2026 syllabi (read this pass — Current Electricity, Electrostatics, Magnetic Effects, EMI and AC units) as the school-competitive spine.
 * - Halliday, Resnick & Walker (contents read this pass — the electricity and magnetism parts) as the university arc.
 * - The boards' practical register (meter bridge, potentiometer, galvanometer conversion — the experiments the experimental-physics book consolidates) priced as the closing chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'charge-and-coulomb',
    title: 'Electric Charge and Coulomb\u2019s Law',
    summary:
      'Charge as the ledger\u2019s origin: friction, conduction and induction charging; the quantised e and the conservation law; Coulomb\u2019s law in vector form with the superposition arithmetic; and the additive-charge craft for discrete arrangements.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Charging Craft',
      'Quantisation and Conservation',
      'Coulomb in Vector Form',
      'Superposition Arithmetic',
    ],
  },
  {
    number: 2,
    slug: 'electric-field-and-gauss',
    title: 'Electric Field and Gauss\u2019s Law',
    summary:
      'The field defined by the test charge; field lines read as a language; Gauss\u2019s law stated and chosen for the symmetric trio — point, line and plane; the shell theorems derived; and the field\u2019s dipole arithmetic added.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Test-Charge Definition',
      'Gauss Chosen Symmetrically',
      'The Shell Theorems',
      'Dipole Arithmetic',
    ],
  },
  {
    number: 3,
    slug: 'potential-and-conductors',
    title: 'Electric Potential and Conductors',
    summary:
      'Potential as energy per charge with its superposition; the field-potential gradient link; equipotentials and the conductor\u2019s interior story — screening, induction and the Faraday cage; and corona and lightning named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Potential as Energy',
      'The Gradient Link',
      'Conductors and Screening',
      'Lightning and Corona',
    ],
  },
  {
    number: 4,
    slug: 'capacitors-and-dielectrics',
    title: 'Capacitors and Dielectrics',
    summary:
      'The capacitor\u2019s geometry arithmetic — parallel plate, spherical, cylindrical; series-parallel networks; the stored energy; dielectrics by constant and by polarisation told gently; and the RC charging-discharging register previewed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Geometry Arithmetic',
      'Networks of Capacitors',
      'Stored Energy',
      'Dielectrics Introduced',
    ],
  },
  {
    number: 5,
    slug: 'current-and-resistance',
    title: 'Current and Resistance',
    summary:
      'Drift velocity and mobility as the microscopic story under Ohm\u2019s macroscopic law; resistivity with its temperature dress; the colour-code and Wheatstone\u2019s bridge craft; and the fuse-and-household honesty of the everyday register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Drift and Mobility',
      'Resistivity and Temperature',
      'Wheatstone\u2019s Bridge',
      'The Everyday Register',
    ],
  },
  {
    number: 6,
    slug: 'dc-circuits',
    title: 'DC Circuit Craft',
    summary:
      'Kirchhoff\u2019s junction and loop laws as the conservation pair; cells in combination with their mixed arithmetic; the maximum-power-transfer theorem named; the potentiometer as the null-method instrument; and transients previewed for the AC book ahead.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Kirchhoff Pair',
      'Cells in Combination',
      'Maximum Power Transfer',
      'The Potentiometer',
      'Joule Heating and the Power Ledger',
    ],
  },
  {
    number: 7,
    slug: 'magnetic-force-and-field',
    title: 'Magnetic Force and the Field',
    summary:
      'The moving charge\u2019s cross-product force; the motion of a charged particle in uniform and crossed fields — the cyclotron register; the force on conductors and the torque on loops as the motor\u2019s seed; Biot-Savart for wire geometries; and Ampere\u2019s law chosen for solenoids and toroids.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cross-Product Force',
      'Charged Particles in Fields',
      'Biot-Savart Geometries',
      'Ampere\u2019s Choices',
    ],
  },
  {
    number: 8,
    slug: 'magnetic-materials-and-earth',
    title: 'Magnetic Materials and the Earth',
    summary:
      'The magnetic dipole moment of current loops; diamagnetic, paramagnetic and ferromagnetic behaviours classified by the susceptibility story told at school depth; the Earth\u2019s field — dip, declination and the elements\u2019 craft; and the hard-soft-hysteresis register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Dipole Moments',
      'The Three Behaviours',
      'The Earth\u2019s Elements',
      'Hysteresis Named',
    ],
  },
  {
    number: 9,
    slug: 'electromagnetic-induction',
    title: 'Electromagnetic Induction',
    summary:
      'Faraday\u2019s flux law and Lenz\u2019s direction as the conservation debt; motional EMF for rods, discs and the rotating frame; eddy currents with their brakes-and-losses honesty; mutual and self-inductance with the solenoid\u2019s arithmetic; and the LR transients read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Flux and Lenz',
      'Motional EMF',
      'Eddy Currents',
      'Inductance and LR Transients',
    ],
  },
  {
    number: 10,
    slug: 'alternating-currents',
    title: 'Alternating Currents',
    summary:
      'The rms arithmetic of the sinusoid; phasors as the AC book\u2019s rotating ledger; the LCR series circuit with its resonance and Q; power factor and the wattless-current honesty; and transformers with their losses told and the transmission register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'rms and Phasors',
      'LCR Resonance',
      'Power Factor',
      'Transformers and Transmission',
    ],
  },
  {
    number: 11,
    slug: 'electrical-instruments',
    title: 'Electrical Instruments',
    summary:
      'The moving-coil galvanometer as the meter family\u2019s seed — conversion to ammeter and voltmeter with shunt and multiplier arithmetic; the voltmeter-ammeter measurement of resistance and its honest two arrangements; the ohmmeter named; and the registers the boards\u2019 practicals demand.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Moving Coil Seed',
      'Shunt and Multiplier',
      'Two Arrangements, Two Errors',
      'The Boards\u2019 Register',
    ],
  },
]

export const electricityAndMagnetism: Book = {
  id: 'electricity-and-magnetism',
  title: 'Electricity and Magnetism',
  subtitle: 'The class 11-12 electromagnetic arc: electrostatics, circuits, magnetism, induction and alternating currents',
  discipline: 'physics',
  level: 'Class 11-12 + competitive',
  description: 'The school-competitive electromagnetism course in full: charge and Coulomb\u2019s law, the field and Gauss\u2019s law, potential and capacitance, current and the DC circuit craft, the magnetic field\u2019s Biot-Savart and Ampere laws, induction, and the AC circuit register with its instruments.',
  status: 'planned',
  accent: ['#3b82f6', '#1e3a8a'],
  chapters,
}
