import type { Book, Chapter } from '../../../types'

/**
 * Foundation Chemistry — the first book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `fchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Foundation Chemistry owns the school first-pass (the NCERT 9-11 register; the General Chemistry backlog line is FOLDED here — the survey register is the school ladder’s own name). Physical-chemistry owns the physical deepening; organic- and inorganic-chemistry own the branch arcs; every deep book’s register is previewed here honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The NEET (UG) 2026 syllabus PDF (nta.ac.in, read this pass — the chemistry register: Some Basic Concepts, Structure of Atom, Classification of Elements and Periodicity, Chemical Bonding, States of Matter, Thermodynamics, Equilibrium, Redox) as the school-competitive spine; the JEE Main 2026 syllabus PDF read the same pass.
 * - Atkins & Jones, Chemical Principles (the LoC catalog TOC read this pass — The Quantum World → Atoms → Chemical Bonds with the spectroscopy technique inserts) as the general-chemistry arc priced for the door ahead.
 * - The boards' practical register (purification craft, flame tests) priced as the closing chapters.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'matter-and-purity',
    title: 'Matter and Its Purity',
    summary:
      'Matter classified — solid, liquid, gas with the particle picture; mixtures against pure substances with the separation census — filtration, crystallisation, distillation, chromatography — each priced as a first craft; and the properties that chemistry reads.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classification',
      'The Separation Census',
      'Pure against Mixed',
      'Properties Read',
      'The Particulate Nature of Matter',
    ],
  },
  {
    number: 2,
    slug: 'measurement-and-mole',
    title: 'The Measurement Craft and the Mole',
    summary:
      'Chemistry\u2019s arithmetic engine: significant figures and unit discipline; laws of chemical combination — conservation, definite proportions, multiple proportions told; the mole as the counting ledger with Avogadro\u2019s number; and stoichiometry\u2019s first ledger — reacting masses and limiting reagents.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Unit Discipline',
      'The Combination Laws',
      'The Mole Ledger',
      'First Stoichiometry',
      'Molarity, Molality, Mole Fraction and Normality',
      'The Reaction Census: Types and Balancing',
      'The Amount of Chemical Change: Reaction Stoichiometry',
    ],
  },
  {
    number: 3,
    slug: 'atomic-structure-first-pass',
    title: 'Atomic Structure at First Pass',
    summary:
      'From Dalton\u2019s indivisible atom to Thomson\u2019s plum pudding and Rutherford\u2019s nuclear rescue; Bohr\u2019s quantised orbits with the hydrogen spectrum explained at school depth; shells, subshells and the electron\u2019s address; and isotopes with their honest arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Model Ladder',
      'Bohr and the Spectrum',
      'The Electron\u2019s Address',
      'Isotopes Counted',
      'The Nuclear Atom and Electronic Configurations',
      'The Bohr Model Worked and Its Limits',
    ],
  },
  {
    number: 4,
    slug: 'periodic-table-first-pass',
    title: 'The Periodic Table at First Pass',
    summary:
      'Mendeleev\u2019s courage and the modern long form; groups and periods as the map\u2019s grammar; the periodic law\u2019s first trends — atomic radius, valency told simply; and the family census the inorganic book later deepens.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map\u2019s History',
      'Groups and Periods',
      'The First Trends',
      'The Family Census',
    ],
  },
  {
    number: 5,
    slug: 'bonding-first-pass',
    title: 'Chemical Bonding at First Pass',
    summary:
      'Why atoms bond — the octet as the working rule with its honest exceptions; the ionic dress — electron transfer with lattice arithmetic; the covalent dress — sharing with Lewis structures drawn; metallic bonding taster; and hydrogen bonding with the water anomaly previewed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Octet Rule',
      'The Ionic Dress',
      'The Covalent Ledger',
      'Hydrogen\u2019s Weak Glue',
    ],
  },
  {
    number: 6,
    slug: 'acids-bases-and-salts',
    title: 'Acids, Bases and Salts',
    summary:
      'The classical definitions — Arrhenius\u2019s ions and the litmus discipline; the pH idea with the scale read at first pass; neutralisation with the salt census — the families from common salt to baking soda; and the everyday registers — the antacid to the toothpaste honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Definitions',
      'The pH Idea',
      'The Salt Census',
      'Everyday Registers',
    ],
  },
  {
    number: 7,
    slug: 'gas-laws-first-pass',
    title: 'The Gas Laws at First Pass',
    summary:
      'Boyle\u2019s and Charles\u2019s laws with the combined form; the ideal-gas equation as the summary ledger; Dalton\u2019s law of partial pressures for mixtures; and Graham\u2019s diffusion law — the kinetic picture previewed honestly for the physical book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Boyle and Charles',
      'The Combined Ledger',
      'Partial Pressures',
      'Diffusion Craft',
    ],
  },
  {
    number: 8,
    slug: 'water-and-solutions',
    title: 'Water and Solutions',
    summary:
      'Water\u2019s anomaly and its solvent honesty; the concentration terms — the mole-per-litre family with the ppm register; hard and soft water with the treatment census; and the solubility first pass with the temperature effect told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anomalous Solvent',
      'The Concentration Family',
      'Hardness Treated',
      'Solubility First Pass',
    ],
  },
  {
    number: 9,
    slug: 'carbon-first-pass',
    title: 'Carbon\u2019s First Pass',
    summary:
      'The carbon frame: allotropes — diamond, graphite with their honesty; the catenation craft and the bonding versatility; hydrocarbons classified — saturated against unsaturated with the everyday registers named; and the organic book\u2019s doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Allotrope Census',
      'Catenation Craft',
      'Hydrocarbon Families',
      'The Organic Doorway',
    ],
  },
  {
    number: 10,
    slug: 'the-lab-register',
    title: 'The Laboratory Register',
    summary:
      'The boards\u2019 practical craft consolidated: purification methods done properly; the flame-test census; the indicator and titration first pass with the burette discipline; and the safety register carried honestly through every procedure.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Purification Practicals',
      'The Flame Census',
      'The First Titration',
      'The Safety Register',
    ],
  },
]

export const foundationChemistry: Book = {
  id: 'foundation-chemistry',
  title: 'Foundation Chemistry',
  subtitle: 'Chemistry from its first principles: matter, the mole, atoms and bonds at first pass (the General Chemistry line folded)',
  discipline: 'chemistry',
  level: 'Absolute beginner → Class 12 first pass',
  description: 'The school-ladder opening of chemistry: matter and its purification, the measurement craft with the mole as the subject\u2019s arithmetic engine, atomic structure from Dalton to Bohr, the periodic table read at first-pass depth, bonding in its three classical dresses, acids and bases with water\u2019s chemistry, and the laboratory register the boards demand.',
  status: 'planned',
  accent: ['#facc15', '#713f12'],
  chapters,
}
