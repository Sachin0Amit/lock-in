import type { Book, Chapter } from '../../../types'

/**
 * Inorganic Chemistry — the fourth book of the Chemistry shelf.
 *
 * STATUS: PLANNED (Chemistry full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 40 planned lessons, zero written. Lesson ids will use the `inorg-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Inorganic Chemistry owns the non-carbon register (the JEE/NEET units: classification-and-periodicity, chemical bonding, s-block, p-block, d-and-f-block, coordination compounds, general principles of metallurgy; the GATE CY inorganic-and-bioinorganic section read this pass). The physics shelf’s solid-state book owns the band-and-lattice physics; the environmental book owns the pollutant chemistry; the bioinorganic register is priced here per the GATE section.
 *
 * RESEARCH PHASE (2026-11-16):
 * - J.D. Lee's Concise Inorganic Chemistry (the contents read this pass — Part One theoretical concepts and hydrogen: atomic structure and the periodic table, the bonding chapters; the later parts' s/p/d/f family census) as the classic arc.
 * - The GATE CY 2026 syllabus PDF (read this pass — the inorganic section incl. bioinorganic: ion transport, oxygen binding, metalloenzymes) as the university register.
 * - The JEE Main + NEET 2026 syllabi (read this pass) as the school-competitive spine; Vogel's qualitative arc named for the salt analysis chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'periodicity-deep',
    title: 'Periodicity at Depth',
    summary:
      'The periodic law\u2019s modern form with the effective-nuclear-charge engine; the trend census computed honestly — atomic-and-ionic radii, ionisation enthalpy, electron gain enthalpy, electronegativity with the second-and-anomaly registers; and the diagonal relationship told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Effective Engine',
      'The Trend Census',
      'The Anomaly Registers',
      'The Diagonal Relation',
      'The Classification of Elements and the Periodic Law',
    ],
  },
  {
    number: 2,
    slug: 'bonding-inorganic',
    title: 'Bonding\u2019s Inorganic Dress',
    summary:
      'The valence-bond frame with hybridisation as the geometry engine; VSEPR worked through the shapes census — from linear to square planar; the molecular-orbital taster for the diatomics with the bond-order arithmetic; and the dipole-and-polarity register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hybridisation Engine',
      'The VSEPR Census',
      'The MO Taster',
      'The Polarity Register',
      'Orbital Overlap and the Covalent Bond',
      'The Molecular-Structure Register',
      'Lewis Pairs: Electron-Pair Sharing',
      'The MO Diagrams: Homonuclear Diatomics to Ne2',
      'The Bonding Models: Ionic, Covalent and Metallic',
      'From Bonding Models to Materials',
      'Ionic Solids, Ionic Radii and the Born-Haber Cycle',
    ],
  },
  {
    number: 3,
    slug: 'hydrogen-and-s-block',
    title: 'Hydrogen and the s-Block',
    summary:
      'Hydrogen\u2019s positional honesty with its three isotopes and the hydride census; the alkali metals\u2019 family register — reactivity ladder, oxides, the flame census; the alkaline earths\u2019 register with the solubility-and-thermal trends; and the industrial preparations told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Positional Honesty',
      'The Alkali Register',
      'The Alkaline Register',
      'The Industrial Craft',
      'The s-Block Oxides, Hydroxides and Halides',
      'The Sodium and Calcium Compound Industries',
      'The Hydride Register: Ionic, Covalent and Interstitial',
      'Water, Heavy Water and Hydrogen Peroxide',
      'Hydrogen: Isotopes and the Position Question',
    ],
  },
  {
    number: 4,
    slug: 'p-block-first-families',
    title: 'The p-Block: First Families',
    summary:
      'The boron-and-carbon family register with the inertness-craft honestly told; the aluminium register with the amphoterism craft; the nitrogen family\u2019s oxoacids with the Ostwald register; and the anomalous-first-member honesty carried throughout.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Boron Family',
      'The Carbon Family',
      'The Nitrogen Family',
      'The First-Member Honesty',
      'The Boron Compounds: Borax, Boric Acid and Diborane',
      'The Carbon Compounds: Monoxide, Dioxide, Silicones and Zeolites',
      'The Nitrogen Compounds: Ammonia, Nitric Acid and the Phosphines',
      'The Main-Group Element Census',
      'The Phosphorus Register: Allotropes and Halides',
    ],
  },
  {
    number: 5,
    slug: 'p-block-later-families',
    title: 'The p-Block: Later Families',
    summary:
      'The oxygen family\u2019s register with the acid ladder and the ozone honesty; the halogen family\u2019s oxidising register with the interhalogen census; the noble gases\u2019 compound honesty — the xenon register; and the family-ladder consolidation told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Oxygen Family',
      'The Halogen Register',
      'The Noble Honesty',
      'The Ladder Consolidated',
      'The Oxygen and Sulphur Compounds: Ozone and Sulphuric Acid',
      'The Halogen Compounds and the Interhalogens',
      'The Xenon Compounds',
      'Sulfur and Its Oxides: The School Register',
    ],
  },
  {
    number: 6,
    slug: 'd-and-f-block',
    title: 'The d- and f-Block',
    summary:
      'The transition register: the electronic honesty with the variable-valency engine; the trend census — colour, magnetism, the catalytic register told with the why; the lanthanide contraction named; the actinide register told briefly; and the oxidation-state census across the row.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transition Register',
      'The Colour Craft',
      'The Lanthanide Contraction',
      'The Oxidation Census',
      'The d-Block Electrode-Potential and Alloy Registers',
      'The Oxoanions of Chromium and Manganese',
      'The Lanthanoid and Actinoid Registers',
    ],
  },
  {
    number: 7,
    slug: 'coordination-chemistry',
    title: 'Coordination Chemistry',
    summary:
      'Werner\u2019s cobalt craft to the modern nomenclature discipline; the isomerism census — ionisation, hydrate, linkage, the stereo registers; the valence-bond dress and its limits told honestly; the crystal-field craft — the splitting registers with the colour-and-magnetic arithmetic; and the stability ledger.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Werner to Nomenclature',
      'The Isomerism Census',
      'The CFT Craft',
      'The Stability Ledger',
      'VBT against CFT: The Coordination Bond',
      'The Spin-Only Magnetic and Colour Registers',
      'Metal Carbonyls and the Application Census',
      'The Organometallic Register',
      'The Ligand Field: Spectrochemical Series and Splitting',
    ],
  },
  {
    number: 8,
    slug: 'bioinorganic-register',
    title: 'The Bioinorganic Register',
    summary:
      'The GATE section priced honestly: the ion-transport registers — the Na-K pump named; oxygen binding and transport — the haemoglobin craft; the electron-transfer chain\u2019s metal register; the metalloenzyme census — the Mg/Fe/Zn/Cu/Mo roles; and the toxicity-and-therapy registers told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ion-Transport Register',
      'The Oxygen Craft',
      'The Metalloenzyme Census',
      'The Toxicity Register',
      'The Supramolecular Doorway',
    ],
  },
  {
    number: 9,
    slug: 'metallurgy',
    title: 'The Metallurgical Register',
    summary:
      'The general principles: concentration census — the froth-and-magnetic crafts; the conversion registers — calcination, roasting, smelting; the reduction census across the thermodynamic ladder — the Ellingham honesty; the refining census — zone refining, electrolysis; and the alloy register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Concentration Census',
      'The Conversion Registers',
      'The Ellingham Honesty',
      'The Refining Census',
      'The Metallurgical Principles: Thermodynamic and Electrochemical',
      'The Cyanide Process and the Refining Crafts',
      'Extraction of Aluminium, Zinc and Iron',
      'Extraction of Gold, Silver and Copper',
      'Froth Flotation and Ore Concentration',
    ],
  },
  {
    number: 10,
    slug: 'qualitative-and-nuclear',
    title: 'The Qualitative and Nuclear Crafts',
    summary:
      'The salt-analysis register — the systematic cation-and-anion scheme with the confirmatory tests; the nuclear register told at the chemistry depth — radioactivity\u2019s laws with the fission-fusion preview (the physics shelf\u2019s nuclear book cross-referenced); and the branch\u2019s doorway map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Systematic Scheme',
      'The Confirmatory Craft',
      'The Nuclear Register',
      'The Doorway Map',
      'The Cation Groups and the Anion Tests',
    ],
  },
]

export const inorganicChemistry: Book = {
  id: 'inorganic-chemistry',
  title: 'Inorganic Chemistry',
  subtitle: 'The non-carbon branch in full: the periodic deep, the families census, coordination chemistry and the metallurgical register',
  discipline: 'chemistry',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The non-carbon register: the periodic table read at depth with its trends and exceptions, bonding\u2019s inorganic dress with VSEPR and hybridisation, the s-and-p-block family censuses, the d-and-f register with coordination chemistry\u2019s CFT craft, metallurgy\u2019s principle register, and the qualitative-and-nuclear closing crafts.',
  status: 'planned',
  accent: ['#a855f7', '#581c87'],
  chapters,
}
