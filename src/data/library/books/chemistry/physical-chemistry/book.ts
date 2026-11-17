import type { Book, Chapter } from '../../../types'

/**
 * Physical Chemistry — the second book of the Chemistry shelf (the folds: Electrochemistry, Chemical Kinetics and Advanced Chemical Thermodynamics folded in).
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 12 chapters /
 * 252 planned lessons, zero written. Lesson ids will use the `pchem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Physical Chemistry owns the physical register — the THREE folds live here as full chapter sets: Electrochemistry (the Nernst-and-conductance arc), Chemical Kinetics (the rate-law arc) and Advanced Chemical Thermodynamics (the activity-and-partial-molar graduate register). The physics shelf’s heat-and-thermodynamics owns the pure-physics side; quantum-chemistry owns the quantum register; the mathematics shelf’s OR book owns the pure kinetics mathematics — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Atkins' Physical Chemistry (the OUP contents read this pass — the Focus structure: the properties of gases, the First Law, the Second and Third Laws, physical transformations, simple mixtures, equilibrium, electrochemistry, chemical kinetics, spectroscopy) as the spine the folds honour.
 * - The GATE CY 2026 syllabus PDF (gate2026.iitg.ac.in, read this pass — Section 1 Physical Chemistry: thermodynamics, electrochemistry, kinetics, quantum chemistry registers) as the university spine.
 * - The JEE Main + NEET 2026 syllabi (read this pass — Equilibrium, Thermodynamics, Solutions, Electrochemistry, Chemical Kinetics, States of Matter, Solid State units) as the school-competitive registers.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'thermochemical',
    title: 'Chemical Thermodynamics',
    summary:
      'The first law\u2019s chemistry dress — internal energy, enthalpy and the reaction ledger; Hess\u2019s law as the path independence of state functions; entropy introduced with the second law\u2019s direction; Gibbs energy as the spontaneity engine — the free-energy arithmetic worked through.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Enthalpy Ledger',
      'Hess\u2019s Craft',
      'Entropy\u2019s Direction',
      'The Gibbs Engine',
      'Thermochemistry: Heat Capacities and Reaction Enthalpies',
      'Thermodynamics',
      'Reactivity 1.1 Measuring Enthalpy Change',
    ],
  },
  {
    number: 2,
    slug: 'thermodynamics-advanced',
    title: 'Thermodynamics Advanced (the fold)',
    summary:
      'The folded Advanced Chemical Thermodynamics line at the graduate register: partial molar quantities; the chemical potential as the transfer engine; activity and activity coefficients; the third law with absolute entropies; and the phase rule told honestly for one-component systems.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Partial Molar Quantities',
      'The Chemical Potential',
      'Activity Coefficients',
      'The Phase Rule',
      'Fields of advanced difficulty releasable only via the annual',
    ],
  },
  {
    number: 3,
    slug: 'chemical-equilibrium',
    title: 'Chemical Equilibrium',
    summary:
      'The equilibrium constant\u2019s arithmetic — Kc and Kp with the relation; the reaction quotient as the direction teller; Le Chatelier\u2019s principle priced honestly through the industrial registers; and the temperature dependence with van\u2019t Hoff named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Constant Arithmetic',
      'The Quotient Teller',
      'Le Chatelier Priced',
      'van\u2019t Hoff Named',
      'The Extent of Reaction: Equilibrium Constants',
      'Calculations with the Equilibrium Constan',
      'Chemical Equilibria',
    ],
  },
  {
    number: 4,
    slug: 'ionic-equilibria',
    title: 'Ionic Equilibria',
    summary:
      'The acid-base register deepened — the Ostwald dilution law for weak electrolytes; pH computed across the families; buffers solved with the Henderson craft; solubility product with common-ion arithmetic; and salt hydrolysis with the titration-curve preview.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Ostwald\u2019s Dilution Law',
      'The pH Families',
      'Buffers and Henderson',
      'Solubility Product',
      'Calculation of pH of Extremely Dilute (<10\u207b\u2076 M) Solution of Strong Acids and Strong Bases',
      'DI- and Polybasic Acids and DI- and Polyacidic Bases',
      'Change in pH of an Acidic Buffer (When an Acid or a Base is Added)',
      'Calculation of Degree of Hydrolysis (h), Hydrolysis Constant (Kh), and pH of a Salt (ZnCl\u2082) of Weak Diacidic Base (Zn(OH)\u2082 and Monobasic Acid (HCl)',
      'Titration Curves Reveal the pKa of Weak Acids',
      'Strength of Binary Acids and Oxyacids',
    ],
  },
  {
    number: 5,
    slug: 'electrochemistry',
    title: 'Electrochemistry (the fold)',
    summary:
      'The folded line in full: the galvanic cell\u2019s architecture with the electrode registers; the standard-potential ledger and the EMF arithmetic; the Nernst equation applied across the registers; conductance — Kohlrausch\u2019s law with molar conductivity; electrolysis with Faraday\u2019s laws; and the corrosion register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cell Architecture',
      'The EMF Ledger',
      'Nernst Applied',
      'Kohlrausch and Faraday',
      'Batteries, Fuel Cells and Corrosion',
    ],
  },
  {
    number: 6,
    slug: 'chemical-kinetics',
    title: 'Chemical Kinetics (the fold)',
    summary:
      'The folded line in full: rate laws with the order census — zero, first, pseudo-first; the integrated equations with the half-life arithmetic; collision theory against the Arrhenius activation picture; the temperature dependence worked; and the catalysis register with the enzyme preview (the biochemistry book\u2019s cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rate-Law Census',
      'Integrated Equations',
      'Arrhenius\u2019s Activation',
      'Catalysis Register',
      'Catalysis: Homogeneous, Heterogeneous and Enzymatic',
      'The Steady-State Approximation and Chain Reactions',
      'Analysis of Zero Group (NH4+)',
      'Reverse Problems',
      'Inversion of Cane Sugar (C\u2081\u2082H\u2082\u2082O\u2081\u2081)',
      'Use Of Simple First-order And Zeroth-order Kinetic Rate Laws, Exponential',
    ],
  },
  {
    number: 7,
    slug: 'solid-state-chemistry',
    title: 'The Solid State',
    summary:
      'The crystalline register: unit cells with the seven systems; the cubic families computed — packing efficiency and density arithmetic; point defects with Schottky-and-Frenkel named; the ionic solids census; and the semiconductor doping preview cross-referenced to the physics shelf\u2019s solid-state book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Unit Cell Grammar',
      'The Cubic Arithmetic',
      'The Defect Census',
      'The Doping Preview',
      'Ionic Radii, Radius Ratio and Nearest Neighbours',
      'The Crystal Systems and Close Packing: fcc, bcc and hcp',
      'F centres',
      'Calculation of the Density of a Metal by Using Unit Cell Dimensions',
      'Nanoscience and the Nanostructured Solids',
      'Ionic Solids, Ionic Radii and the Born-Haber Cycle',
      'Polymorphism and Allotropy',
    ],
  },
  {
    number: 8,
    slug: 'solutions-and-colligatives',
    title: 'Solutions and Colligative Properties',
    summary:
      'The solution ledger: Raoult\u2019s law with the ideal honesty; the two-liquid registers; colligative properties computed — elevation, depression, osmotic pressure with the van\u2019t Hoff factor; and the abnormal-molar-mass register priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Raoult\u2019s Ledger',
      'Elevation and Depression',
      'Osmotic Pressure',
      'The Abnormal Register',
    ],
  },
  {
    number: 9,
    slug: 'gaseous-and-surface',
    title: 'The Gaseous and Surface Registers',
    summary:
      'The real-gas story — van der Waals\u2019 corrections with the critical register (the physics shelf\u2019s heat book cross-referenced for the pure side); and surface chemistry — adsorption with the Freundlich-and-Langmuir crafts, colloids classified with the coagulation register, catalysis\u2019s heterogeneous surface told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Real Gases Again',
      'Adsorption Crafts',
      'The Colloid Census',
      'The Kinetic Theory and the Molecular Speeds',
      'Physisorption against Chemisorption: The Isotherm Crafts',
      'Emulsions, Surfactants and Micelles',
      'Intermolecular Forces and the Liquid State',
      'Vapour Pressure, Surface Tension and Viscosity of Liquids',
      'Surfaces and Interfaces',
      'Maxwell\'s Distribution of Speeds',
    ],
  },
  {
    number: 10,
    slug: 'spectroscopy-foundations',
    title: 'Spectroscopy Foundations',
    summary:
      'The light-matter ledger for the chemist: the electromagnetic register read by energy; Beer-Lambert\u2019s law computed for the analytical book; rotational and vibrational tasters — the selection-rule idea told gently; and the electronic register previewed for the quantum-chemistry book\u2019s doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The EM Register Read',
      'Beer-Lambert Computed',
      'Rotational and Vibrational Tasters',
      'The Electronic Preview',
      'Characterisation of inorganic compounds by IR, Raman, NMR, EPR, Mossbauer, UV-vis, NQR, MS, electron spectroscopy and microscopic techniques',
      'Basic Concepts Of Light And Color, Wavelength, Frequency, Wave Numbers,',
    ],
  },
  {
    number: 11,
    slug: 'photochemistry-taster',
    title: 'Photochemistry and the Photophysical Register',
    summary:
      'The light-driven register: the Grotthuss-Draper and Stark-Einstein laws; quantum yield as the efficiency ledger; fluorescence-and-phosphorescence named with the Jablonski diagram read; and the photochemical reaction census with the atmospheric registers previewed for the environmental book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Laws',
      'Quantum Yield',
      'Jablonski Read',
      'The Atmospheric Preview',
      'Vision',
    ],
  },
  {
    number: 12,
    slug: 'the-physical-doorway',
    title: 'The Physical Doorway',
    summary:
      'The branch\u2019s consolidation: the measurement craft\u2019s honesty across the whole register; the data-analysis register with the mathematics shelf\u2019s statistics book cross-referenced; the research doorway named through the GATE-and-CSIR registers; and the map of the sibling books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Measurement Honesty',
      'The Data Register',
      'The Research Doorway',
      'The Sibling Map',
    ],
  },
]

export const physicalChemistry: Book = {
  id: 'physical-chemistry',
  title: 'Physical Chemistry',
  subtitle: 'The physics of chemistry in full: thermodynamics to kinetics, equilibrium to spectroscopy (three backlog lines folded)',
  discipline: 'chemistry',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The branch\u2019s full register: chemical thermodynamics with the laws\u2019 chemistry dress, chemical and ionic equilibrium with the pH machinery, the folded electrochemistry and chemical-kinetics arcs at full depth, the solid state and solutions registers, gaseous and surface chemistry, and the spectroscopy-and-advanced-thermodynamics doorway to the research register.',
  status: 'planned',
  accent: ['#4ade80', '#166534'],
  chapters,
}
