import type { Book, Chapter } from '../../../types'

/**
 * Organic Chemistry — the third book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 44 planned lessons, zero written. Lesson ids will use the `org-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Organic Chemistry owns the carbon register (the JEE/NEET units: the basic principles-and-techniques, hydrocarbons, halogen derivatives, oxygen-containing families, nitrogen-containing families, biomolecules, polymers). The biochemistry book owns the molecular-biology deep side; the environmental book owns the pollutant registers; polymer science’s deep register belongs to the industrial book’s cross-reference.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Clayden, Greeves & Warren's Organic Chemistry (the contents read this pass via the LoC catalog — What is organic chemistry → Organic structures → Determining organic structures → Structure of molecules → Organic reactions → the mechanism-first movement) as the university arc.
 * - The JEE Main + NEET 2026 syllabi (read this pass — the organic units listed above) as the school-competitive spine; Morrison & Boyd and Solomons named as the classic arcs.
 * - The boards' practical register (detection of functional groups, the Lassaigne test) priced as the closing chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'structure-and-nomenclature',
    title: 'Structure and Nomenclature',
    summary:
      'The tetravalent frame with the hybridisation dress; the IUPAC nomenclature discipline worked through the families; structural and stereo-isomerism introduced — the geometrical cis-trans register; and the effect census — inductive, resonance, hyperconjugation read as the branch\u2019s grammar.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tetravalent Frame',
      'The IUPAC Discipline',
      'Isomerism Introduced',
      'The Effect Census',
    ],
  },
  {
    number: 2,
    slug: 'alkanes',
    title: 'The Alkanes',
    summary:
      'The saturated family: preparation registers — the Kolbe, decarboxylation and Wurtt crafts; free-radical halogenation with the mechanism read as the branch\u2019s first; the selectivity honesty with tertiary\u2019s stability; and the conformation register — the Newman craft for ethane\u2019s sawhorse.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Preparation Registers',
      'The First Mechanism',
      'The Stability Honesty',
      'The Conformation Register',
    ],
  },
  {
    number: 3,
    slug: 'alkenes-alkynes',
    title: 'The Alkenes and Alkynes',
    summary:
      'The unsaturated families: the addition census with Markovnikov\u2019s rule and its peroxide anti-register; the oxidation ledger with Baeyer-and-ozonolysis; the alkyne\u2019s acidity craft with the terminal-anion register; and the polymerisation preview for the industrial book\u2019s doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Addition Census',
      'Markovnikov Read',
      'The Oxidation Ledger',
      'The Polymerisation Preview',
    ],
  },
  {
    number: 4,
    slug: 'aromatic-chemistry',
    title: 'The Aromatic Register',
    summary:
      'Benzene\u2019s structure honesty — the resonance frame with Huckel\u2019s rule as the aromatic test; the electrophilic substitution census — nitration, sulfonation, halogenation, Friedel-Crafts with their mechanisms; the orientation register — o/p directors against meta; and the polynuclear taster with the carcinogenic honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aromatic Test',
      'The EAS Census',
      'The Orientation Register',
      'The Polynuclear Taster',
    ],
  },
  {
    number: 5,
    slug: 'halides-and-substitution',
    title: 'The Halides and the SN Craft',
    summary:
      'The halogen derivatives: the SN1-and-SN2 pair read as competing mechanisms with the stereochemical honesty; the elimination register — E1/E2 against Saytzeff\u2019s rule; the Grignard reagent\u2019s synthesis power; and the aryl-halide distinction honestly told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The SN Pair',
      'The Elimination Register',
      'The Grignard Power',
      'Aryl against Alkyl',
    ],
  },
  {
    number: 6,
    slug: 'alcohols-phenols-ethers',
    title: 'Alcohols, Phenols and Ethers',
    summary:
      'The oxygen families\u2019 first tier: the alcohol census — preparation, the oxidation ladder, the Lucas test; the phenol\u2019s acidity craft with the Kolbe-and-Reimer-Tiemann registers; the ether families with the Williamson synthesis; and the identification register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Alcohol Census',
      'The Phenol Craft',
      'The Williamson Synthesis',
      'The Identification Register',
    ],
  },
  {
    number: 7,
    slug: 'carbonyl-chemistry',
    title: 'The Carbonyl Register',
    summary:
      'The aldehyde-and-ketone arc: the nucleophilic-addition grammar; the named-reaction ledger — aldol, Cannizzaro, Clemmensen, Wolff-Kishner with their reduction craft; the Tollens-and-Fehling distinction registers; and the carboxylic-acid preview as the family ladder\u2019s next rung.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Addition Grammar',
      'The Named-Reaction Ledger',
      'The Distinction Registers',
      'The Acid Preview',
    ],
  },
  {
    number: 8,
    slug: 'acids-and-derivatives',
    title: 'The Acids and Their Derivatives',
    summary:
      'The carboxyl register: the acid\u2019s strength arithmetic with the substituent effects; the derivative ladder — esters, amides, anhydrides, acid chlorides with their interconversion craft; the ester saponification with the mechanism read; and the reduction-to-alcohol register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Strength Arithmetic',
      'The Derivative Ladder',
      'Saponification Read',
      'The Reduction Register',
    ],
  },
  {
    number: 9,
    slug: 'amines-and-nitrogen',
    title: 'The Amines and the Nitrogen Register',
    summary:
      'The nitrogen families: the amine ladder with the preparation census — Hofmann-and-Gabriel named; the basicity register with the alkyl-vs-aryl honesty; the diazonium craft — the azo dye register; and the nitro compounds with their reduction story.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Amine Ladder',
      'The Basicity Register',
      'The Diazonium Craft',
      'The Nitro Story',
    ],
  },
  {
    number: 10,
    slug: 'biomolecules-register',
    title: 'The Biomolecules Register',
    summary:
      'The school arc read honestly: the carbohydrate census — mono to poly with the glucose structure register; the protein first pass — the amino-acid ledger with the peptide bond; the nucleic-acid preview cross-referenced to the biochemistry book\u2019s deep side; and the vitamins-and-lipid register told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Carbohydrate Census',
      'The Protein First Pass',
      'The Nucleic Preview',
      'Vitamins and Lipids',
    ],
  },
  {
    number: 11,
    slug: 'synthetic-and-practical',
    title: 'The Synthetic and Practical Doorway',
    summary:
      'The synthesis craft — the multi-step register with the protecting-group idea named; the polymers school register cross-referenced to the industrial book; the boards\u2019 practical — the functional-group detection with the Lassaigne craft; and the research doorway named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Multi-Step Register',
      'The Polymer Cross-Reference',
      'The Detection Craft',
      'The Research Doorway',
    ],
  },
]

export const organicChemistry: Book = {
  id: 'organic-chemistry',
  title: 'Organic Chemistry',
  subtitle: 'The carbon branch in full: structure, mechanism and synthesis from the alkanes to the biomolecules register',
  discipline: 'chemistry',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The carbon register: the structure craft with nomenclature and the effect census, the hydrocarbon families with their mechanisms, the aromatic register with its electrophilic craft, the functional-family ladder from halides to amines with the named reactions, the biomolecules school register, and the synthetic doorway.',
  status: 'planned',
  accent: ['#fb923c', '#7c2d12'],
  chapters,
}
