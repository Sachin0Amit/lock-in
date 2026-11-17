import type { Book, Chapter } from '../../../types'

/**
 * Biochemistry — the seventh book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 73 planned lessons, zero written. Lesson ids will use the `biochem-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Biochemistry owns the chemistry-side register (the biomolecules-chemistry view). The organic book owns the biomolecules school register; the future Medical-and-Biology shelves’ biochemistry registers are cross-referenced as sibling views (the chemistry-side: structure-and-mechanism first); NEET’s biomolecules unit is priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Lehninger's Principles of Biochemistry (the canonical arc, named) as the spine; the NCERT biomolecules chapter (read this pass in the syllabus registers) as the school ladder beneath.
 * - The NEET 2026 syllabus PDF (read this pass — the biomolecules unit) priced as the medical register.
 * - The physical book's kinetics-and-thermo chapters cross-referenced at the enzyme-and-metabolism borrowings.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'water-and-buffers',
    title: 'Water, pH and the Living Buffer',
    summary:
      'The living solvent\u2019s honesty — the hydrogen-bond structure with its anomalies; the pH discipline applied to the cell\u2019s registers; the buffer systems computed — the phosphate-and-carbonate pairs with the Henderson craft carried from the physical book; and the water\u2019s transport registers told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Living Solvent',
      'The Cellular pH',
      'The Buffer Systems',
      'The Transport Registers',
      'Significance of H-Bonding in Biological Systems',
      'To life in each Focus, and a suite of self-check questions. These try as an evolving subject',
    ],
  },
  {
    number: 2,
    slug: 'amino-acids-and-protein-structure',
    title: 'Amino Acids and Protein Structure',
    summary:
      'The amino-acid census — the twenty with their side-chain grammar; the peptide bond\u2019s chemistry; the structure ladder — primary to quaternary with the folding honesty; the fibrous-and-globular distinction; and the denaturation register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Twenty Census',
      'The Peptide Chemistry',
      'The Structure Ladder',
      'The Denaturation Register',
      'Protein Folding, Misfolding and the Named Proteins: Myoglobin to Chymotrypsin',
      'Food Proteins and Post-Mortem Muscle Changes',
      'BIO Using Crystals to Determine Protein',
    ],
  },
  {
    number: 3,
    slug: 'protein-function',
    title: 'Protein Function',
    summary:
      'The function register: the myoglobin-and-haemoglobin oxygen craft with the cooperative honesty; the antibody\u2019s recognition register told briefly; the motor-protein taster; the ligand-binding arithmetic computed; and the protein-purification census — the chromatographic-and-electrophoretic registers borrowed from the analytical book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Oxygen Craft',
      'The Recognition Register',
      'The Binding Arithmetic',
      'The Purification Census',
      'The Biochemical Separation Techniques: Chromatography, Centrifugation and Electrophoresis',
    ],
  },
  {
    number: 4,
    slug: 'enzyme-chemistry',
    title: 'The Enzyme Machinery',
    summary:
      'The catalysis craft read chemically: the active-site idea with the transition-state honesty; the Michaelis-Menten arithmetic computed properly with the Lineweaver-Burk craft; the inhibition census — competitive against non-competitive; the regulation register — the allosteric craft; and the enzyme classes\u2019 census named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Active-Site Craft',
      'Michaelis-Menten Computed',
      'The Inhibition Census',
      'The Allosteric Craft',
      'Enzyme Types, Nomenclature and Properties',
      'Vitamins, Coenzymes and Minerals',
      'Enzymes as Drug Targets',
      'Catalytic Action of Enzymes',
      'Chemical Connections Enzymes: Nature\u2019s Catalysts',
    ],
  },
  {
    number: 5,
    slug: 'carbohydrates-and-lipids',
    title: 'The Carbohydrate and Lipid Registers',
    summary:
      'The sugar census — the mono-to-poly ladder with the glycosidic bond; the storage-and-structural polysaccharides; the lipid census — the fatty-acid grammar, the membrane lipid families with the aggregate behaviour; and the eicosanoid-and-terpene tasters named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sugar Ladder',
      'The Polysaccharide Register',
      'The Lipid Census',
      'The Aggregate Behaviour',
    ],
  },
  {
    number: 6,
    slug: 'membranes-and-transport',
    title: 'Membranes and Transport',
    summary:
      'The membrane\u2019s fluid-mosaic honesty; the transport census — passive, facilitated, the active registers with the Na-K engine named (the bioinorganic cross-reference); the vesicular registers told briefly; and the signal-transduction preview with the receptor idea.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mosaic Honesty',
      'The Transport Census',
      'The Na-K Engine',
      'The Signal Preview',
    ],
  },
  {
    number: 7,
    slug: 'nucleic-acids',
    title: 'The Nucleic-Acid Register',
    summary:
      'The nucleotide\u2019s chemistry with the phosphodiester bond; the DNA structure register — the double helix\u2019s honesty with the base-pairing arithmetic; the RNA census — the messenger-transfer-ribosomal families; and the DNA-technology preview with the replication-repair registers named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nucleotide Chemistry',
      'The Double Helix',
      'The RNA Census',
      'The Technology Preview',
      'Molecular Biology and the Biomolecules',
    ],
  },
  {
    number: 8,
    slug: 'metabolism-carbohydrates',
    title: 'The Carbohydrate Metabolism',
    summary:
      'The metabolic engine\u2019s first register: glycolysis read as the ten-step chemistry with the ATP ledger; the pyruvate junction\u2019s honesty — the aerobic-anaerobic fork; the citric-acid cycle\u2019s turnarounds computed; and the oxidative-phosphorylation craft — the electron-transport chain with the chemiosmotic engine named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Glycolysis Read',
      'The Pyruvate Fork',
      'The Citric Turn',
      'The Oxidative Craft',
      'The Pentose Phosphate Pathway and Gluconeogenesis',
      'Energy and Respiration',
    ],
  },
  {
    number: 9,
    slug: 'metabolism-lipids-and-nitrogen',
    title: 'The Lipid and Nitrogen Metabolism',
    summary:
      'The beta-oxidation register with the acyl arithmetic; the fatty-acid synthesis preview; the nitrogen metabolism — the urea cycle read with the transamination craft; the amino-acid catabolism told briefly; and the nucleotide metabolism preview priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Beta-Oxidation Register',
      'The Synthesis Preview',
      'The Urea Cycle',
      'The Nucleotide Preview',
      'Nitrogen Metabolism: Fixation, Amino Acids and Nucleotides',
      'Metabolism of Nitrogen containing compounds',
    ],
  },
  {
    number: 10,
    slug: 'bioenergetics-and-doorway',
    title: 'The Bioenergetics Doorway',
    summary:
      'The free-energy-of-the-cell register — the ATP ledger computed; the metabolic regulation craft — the allosteric-and-hormonal registers; the hormone first pass with the insulin story told briefly; the nutrition-and-clinical registers priced honestly; and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ATP Ledger',
      'The Regulation Craft',
      'The Hormone First Pass',
      'The Research Doorway',
      'The Balanced Diet and Nutrients',
    ],
  },
]

export const biochemistry: Book = {
  id: 'biochemistry',
  title: 'Biochemistry',
  subtitle: 'The chemistry of life: water, proteins, enzymes, metabolism and the biomolecular registers',
  discipline: 'chemistry',
  level: 'University + professional register (NEET deepening)',
  description: 'The life-chemistry register: water-and-pH foundations, the amino-acid-and-protein structure craft, the enzyme machinery with its kinetics, the carbohydrate-and-lipid registers, the nucleic-acid preview, the metabolic engine — glycolysis to oxidative phosphorylation — and the bioenergetics doorway.',
  status: 'planned',
  accent: ['#f43f5e', '#881337'],
  chapters,
}
