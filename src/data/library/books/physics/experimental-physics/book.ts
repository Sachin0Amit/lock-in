import type { Book, Chapter } from '../../../types'

/**
 * Experimental Physics — the nineteenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 55 planned lessons, zero written. Lesson ids will use the `exp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Experimental Physics owns the laboratory register — the boards’ and university practicals plus the GATE PH electronics-and-instrumentation pricing. Each sibling book’s closing practical chapter cross-references here as the consolidated home; the mathematics shelf’s statistics book owns the inference-theory side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The boards' practical registers priced from the school syllabi read this pass (JEE/NEET experimental-skills units; the class 11-12 practical lists the sibling books carry).
 * - The GATE PH 2026 syllabus (read this pass — the electronics-and-instrumentation pricing in the PH register) as the university pole.
 * - Squires, Practical Physics (the canonical experimental craft arc, named) as the teaching spine; Melissinos named as the advanced-lab pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'measurement-and-uncertainty',
    title: 'Measurement and Uncertainty',
    summary:
      'The uncertainty discipline stated honestly: systematic against random; propagation arithmetic worked for the standard instrument chain; significant-figure honesty; the mean-and-deviation register with the standard-error craft; and the graph-paper craft with least-squares introduced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Uncertainties',
      'Propagation Arithmetic',
      'The Standard Error',
      'Least Squares Introduced',
    
      'Experimental Skills'
    ],
  },
  {
    number: 2,
    slug: 'instruments-of-the-lab',
    title: 'The Instruments of the Lab',
    summary:
      'The length-and-angle census — vernier, screw gauge, spherometer, travelling microscope — each with its least-count arithmetic; the balance register with the double-weighing honesty; the barometer-and-thermometer craft; and the zero-error discipline told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Length Census',
      'The Balance Register',
      'The Pressure-and-Temperature Craft',
      'Zero-Error Discipline',
      'The Apparatus Census and the Measurement Techniques',
      'The Medical-Imaging Instruments: Ultrasound to MRI',
      'Experimental Skills: Vernier calipers \u2014 its use to measure the internal and external diameter and depth of a vessel',
      'Experimental Skills: Screw gauge \u2014 its use to determine the thickness/diameter of thin sheet/wire',
      'Reading a Vernier Callipers',
    ],
  },
  {
    number: 3,
    slug: 'mechanics-and-properties-practicals',
    title: 'Mechanics and Properties Practicals',
    summary:
      'g by simple and Kater\u2019s pendulum with the correction honesty; Young\u2019s modulus by Searle; surface tension by capillary rise; viscosity by Stokes\u2019 and Poiseuille\u2019s registers — each procedure told as an experiment with its error arithmetic priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'g by Pendulum',
      'Searle\u2019s Modulus',
      'Surface-Tension Practicals',
      'Viscosity Registers',
      'The Resonance-Column Measurement of Sound Speed',
      'Surface-Tension Measurement of Water by Capillary Rise',
      'Experimental Skills: Co-efficient of viscosity of a given viscous liquid by measuring the terminal velocity of a given spherical body',
      'Experimental Skills: Metre scale \u2014 the mass of a given object by the principle of moments',
      'Experimental Skills: Young\'s modulus of elasticity of the material of a metallic wire',
      'Experimental Skills: Simple pendulum \u2014 dissipation of energy by plotting a graph between the square of amplitude and time',
    ],
  },
  {
    number: 4,
    slug: 'heat-and-optics-practicals',
    title: 'Heat and Optics Practicals',
    summary:
      'Specific heat by the calorimeter craft with the cooling correction; the focal-length registers — UV method, displacement method; refractive index by prism minimum-deviation and travelling microscope; and the grating\u2019s wavelength measurement with its geometry honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Calorimeter Craft',
      'Focal Registers',
      'The u-v Method for Concave Mirrors and Convex Lenses',
      'Experimental Skills: The plot of the angle of deviation vs angle of incidence for a triangular prism',
      'Experimental Skills: The refractive index of a glass slab using a travelling microscope',
    ],
  },
  {
    number: 5,
    slug: 'electricity-and-magnetism-practicals',
    title: 'Electricity and Magnetism Practicals',
    summary:
      'The meter bridge and potentiometer with their null-method honesty; galvanometer conversion to ammeter and voltmeter; the resistance-by- Carey-Foster register named; and the Earth\u2019s-field measurement craft told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Null Methods',
      'Galvanometer Conversion',
      'Carey-Foster Named',
      'The Earth\u2019s Field',
      'The Ohm\'s-Law Verification with Voltmeter and Ammeter',
      'Experimental Skills: The resistivity of the material of a given wire using a metre bridge',
      'Experimental Skills: Resistance and figure of merit of a galvanometer by half deflection method',
      'Deflection Magnetometer',
      'Vibration Magnetometer',
    ],
  },
  {
    number: 6,
    slug: 'electronics-for-physicists',
    title: 'Electronics for Physicists',
    summary:
      'The instrument-side electronics: the diode and rectifier register inherited from modern-physics; the transistor\u2019s characteristic curves measured; the op-amp as the amplifier-and-comparator craft; the digital-logic taster with the CS shelf\u2019s digital-logic book cross-referenced as the deep side.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Diode Register Inherited',
      'The Transistor Measured',
      'The Op-Amp Craft',
      'The Digital Taster',
      'Experimental Skills: Identification of diode, LED, resistor, a capacitor from a mixed collection of such items',
    ],
  },
  {
    number: 7,
    slug: 'signal-and-data-analysis',
    title: 'Signal and Data Analysis',
    summary:
      'The oscilloscope as the physicist\u2019s eye; the transducer census — thermocouple, LDR, strain gauge; the noise-and-filter register told honestly; curve-fitting craft with the chi-squared honesty; and the safety discipline carried through every register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Oscilloscope\u2019s Eye',
      'The Transducer Census',
      'Noise and Filters',
      'The Chi-Squared Honesty',
    ],
  },
  {
    number: 8,
    slug: 'research-lab-doorway',
    title: 'The Research-Lab Doorway',
    summary:
      'The advanced-lab registers previewed: interferometry, spectrometry, vacuum craft; the lab-notebook ethics told as the profession\u2019s constitution; the reproducibility register priced honestly; and the map of where each sibling book\u2019s practical demands consolidate here.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Advanced Registers',
      'The Notebook Constitution',
      'Reproducibility Priced',
      'The Consolidation Map',
    ],
  },
]

export const experimentalPhysics: Book = {
  id: 'experimental-physics',
  title: 'Experimental Physics',
  subtitle: 'The laboratory as its own subject: measurement, instruments, error arithmetic and the research-lab craft',
  discipline: 'physics',
  level: 'UG honours + competitive practicals → research doorstep',
  description: 'The experimental register: the measurement-and-uncertainty discipline, the instruments of the school-and-early-university lab, the practical registers of mechanics, heat, optics and electricity, the electronics-and-instrumentation register, the signal-and-data-analysis craft, and the research-lab doorstep with its ethics.',
  status: 'planned',
  accent: ['#fdba74', '#7c2d12'],
  chapters,
}
