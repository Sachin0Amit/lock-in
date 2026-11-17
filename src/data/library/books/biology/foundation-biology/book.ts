import type { Book, Chapter } from '../../../types'

/**
 * Foundation Biology — the first book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 93 planned lessons, zero written. Lesson ids will use the `fbio-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Foundation Biology owns the beginner register: the themes-and-method tour that no specialist book repeats. The cell machinery belongs to cell-biology; the chemistry preview defers to the chemistry shelf’s biochemistry book (cross-referenced, not duplicated); evolution’s treatment here is the preview — the evolution book owns the full register; the NCERT/NEET school lines are this book’s exam spine.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition (Pearson) — the unit arc read this pass: Evolution the Themes of Biology and Scientific Inquiry; The Chemistry of Life; The Cell; Genetics; Mechanisms of Evolution; The Evolutionary History of Biological Diversity; Plant Form and Function; Animal Form and Function; Ecology — as the spine of the whole shelf.
 * - The NCERT school register (the class 11–12 biology syllabus arc) priced as the school ladder beneath every chapter.
 * - The NEET UG register (the NTA’s biology half — the highest-weighting exam section) named as this shelf’s exam spine.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-life-is',
    title: 'What Life Is',
    summary:
      'The register\u2019s opening: order, reproduction, growth, responsiveness, metabolism and homeostasis as the properties shared by every living thing; the levels-of-organisation ladder from molecules and organelles through cells, tissues, organs and organisms to populations, communities, ecosystems and the biosphere; emergence honestly priced — each level shows properties its parts alone do not; and the tree-of-life preview with the three domains (Bacteria, Archaea, Eukarya) as the map the whole shelf will travel.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Properties of Life',
      'The Organisation Ladder',
      'Emergence at Each Level',
      'The Three-Domain Preview',
      'The Living World',
    
      'S, p and d Block Elements',
      'Thermodynamics',
      'Organization of life',
      'Microbial Metabolism',
      'B4 Organelles and compartmentalisation',
      'D10 Homeostasis',
      'Ethology',
      'Ryan Steed, University of North',
      'Carolina-Asheville',
      'Angela K. Stoeckman, Bethel University',
      'Evelyn Swain, Presbyterian College Preface viii',
      'Jeremy Thorner, University of',
      'Candace Timpte, Georgia Gwinnett College',
      'Michael Trakselis, Baylor University',
      'Didem Vardar-Ulu, Boston University',
      'Thomas Vida, University of Houston',
      'Yu Wang, The University of Alabama',
      'James D. West, The College of Wooster',
      'Chuan Xiao, University of Texas-El Paso',
      'We hope our readers will continue to provide input for 21 Lipid Biosynthesis',
      'David L. Nelson',
      'Aaron A. Hoskins',
      'Madison, Wisconsin',
      'Glossary G-1',
      'Organisms Differ Widely in Their Sources the First Genes and Catalysts',
      'Cytoskeleton and Is Highly Dynamic 6 Functional Genomics Shows the Allocations',
      'Attractions',
      'Physical Foundations 19 Weak Interactions Are Crucial to',
      'Their Surroundings',
      'Concentrations',
      'Tendency to Proceed Spontaneously',
      'Metabolism Is Regulated to Achieve',
      '125,337,357 (valid %PDF header, no trailer dictionary, no %%EOF; Google',
      'An Introduction to Metabolism'
    ],
  },
  {
    number: 2,
    slug: 'how-biologists-know',
    title: 'How Biologists Know',
    summary:
      'The discipline\u2019s engine: observation, question, hypothesis, prediction, experiment and revision — the cycle as actually practised, not the textbook cartoon; the controlled experiment\u2019s craft (variables, controls, replication and the sample-size honesty); the theory\u2019s weight in science — a theory as the best-supported explanation there is, not a guess, with evolution named as biology\u2019s unifying theory; correlation against causation; and the model organism\u2019s idea — why flies, mice and E. coli carry biology\u2019s Nobel prizes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cycle of Enquiry',
      'The Controlled Experiment\u2019s Craft',
      'What a Theory Really Is',
      'The Model Organism Idea',
    
      'Inquiry 1: Exploring and designing in biology',
      'Inquiry 2: Collecting and processing data in biology',
      'Inquiry 3: Concluding and evaluating in biology',
      'CAMPBELL BIOLOGY — ELEVENTH EDITION — Urry / Cain / Wasserman / Minorsky / Reece',
      '(https://archive.org/stream/campbell-biology_202502/Campbell%20Biology_djvu.txt)'
    ],
  },
  {
    number: 3,
    slug: 'the-chemistry-preview',
    title: 'The Chemistry Preview',
    summary:
      'Life\u2019s chemistry introduced at survey depth only — the depth belongs to the chemistry shelf\u2019s biochemistry book, cross-referenced: water as the living solvent with its hydrogen-bond anomalies; carbon as the backbone atom with its four-bond versatility; the four biomolecule families — carbohydrates (energy and structure), lipids (membranes and stores), proteins (work and regulation) and nucleic acids (information) — each named by function and handed off to its owning book; and the first look at why shape determines function at the molecular scale.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Water and Carbon\u2019s Craft',
      'The Four Biomolecule Families',
      'Shape Is Function',
      'The Handoff Map',
      'Robert J. Warburton, Shepherd University 7 Carbohydrates and Glycobiology',
      'Alexander G. Zestos, American University 10 Lipids',
      'In the Department of Biochemistry at the University Production of Urea',
      'Michael M. Cox Ill INFORMATION PATHWAYS',
      'Energy Coupling Links Reactions in Biology 22 The pH Scale Designates the H+ and OH',
      'Weak Acids and Bases Have Characteristic'
    ],
  },
  {
    number: 4,
    slug: 'the-cell-preview',
    title: 'The Cell Preview',
    summary:
      'The fundamental unit introduced: the cell theory\u2019s three claims (all living things are made of cells, the cell is life\u2019s basic unit, cells come only from cells) with its historical arc from Hooke and Leeuwenhoek to Virchow; prokaryote against eukaryote as biology\u2019s deepest structural divide; the microscope\u2019s craft from light through electron; the surface-area-to-volume arithmetic that sets cell size; and the full machinery deferred to the cell-biology book — this chapter draws the map, that book takes the journey.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cell Theory\u2019s Arc',
      'Prokaryote against Eukaryote',
      'The Microscope\u2019s Craft',
      'The Size Arithmetic',
    
      'Historical Perspective',
      'Finally, we express our deepest appreciation to our',
      '(Don\'t Try This at Home!)',
      'With HTTP 416). This transcription is the sanctioned WEB FALLBACK: the',
      'Publisher\'s Brief Contents from the Internet Archive full-text scan'
    ],
  },
  {
    number: 5,
    slug: 'energy-and-heredity-previews',
    title: 'The Two Engines Previewed',
    summary:
      'Life\u2019s two great engines introduced side by side: energy\u2019s flow — photosynthesis captures, respiration releases, and every ecosystem runs on that ledger; and heredity\u2019s code — DNA as the instructions, genes as the units, and the passing-on that makes offspring resemble parents; each engine priced at preview depth with its full book named downstream (photosynthesis deepened in plant-physiology, the metabolism arc owned by the chemistry shelf\u2019s biochemistry book, the genetic machinery by molecular-biology and genetics).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Energy Ledger Preview',
      'The Genetic Code Preview',
      'The Two Engines Meet',
      'The Deep Books Named',
      'Assume full responsibility for errors of fact or emphasis. 13 Introduction to Metabolism',
      'Book writing. Mammalian Metabolism'
    ],
  },
  {
    number: 6,
    slug: 'unity-and-diversity',
    title: 'Unity and Diversity',
    summary:
      'Biology\u2019s central tension: the deep unity (the same DNA code, the same cell machinery, homologous structures across wildly different bodies) against the explosive diversity (millions of species, each solved to its own niche); the classification craft from Linnaeus\u2019s binomial nomenclature to the modern phylogenetic tree read from shared ancestry; the kingdoms survey at map depth; and the divergence logic — descent with modification as the single explanation for both the unity and the diversity.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Deep Unity',
      'The Exploding Diversity',
      'The Binomial Craft',
      'Descent with Modification',
      'The Monera, Protista and Fungi: Salient Features and Classification',
      'Lichens, Viruses and Viroids: The Edge of the Five Kingdoms',
      'Biological Classification',
      'Features but Differ in Important Ways 5 The First Cell Probably Used Inorganic Fuels'
    ],
  },
  {
    number: 7,
    slug: 'the-ecological-frame',
    title: 'The Ecological Frame',
    summary:
      'The biosphere\u2019s architecture introduced: the individual in its environment (biotic and abiotic factors); the population and its growth logic; the community as the interacting cast; the ecosystem as the flow of energy and the cycling of matter; and the biosphere as one system — with the honest warning that ecology-and-full register belongs to the ecology book and plant-ecology owns the botanical lines, this chapter sets the frame every later book hangs from.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ecological Ladder',
      'The Population\u2019s Growth Logic',
      'Energy Flows, Matter Cycles',
      'The Biosphere as One System',
      'Individuals whose special efforts went into this book. We'
    ],
  },
  {
    number: 8,
    slug: 'the-biologists-craft',
    title: 'The Biologist\u2019s Craft',
    summary:
      'The working skills: the field notebook and the observation\u2019s discipline; the dissection and microscopy lab register with the safety craft; the data table, the graph and the statistical mean as the honest tools of a school-level biologist; the specimen\u2019s collection and the herbarium\u2019s idea (the plant-taxonomy book owns the full register); and the career map — the researcher, the doctor, the ecologist, the biotechnologist and the teacher as the shelf\u2019s downstream doors.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field Notebook\u2019s Discipline',
      'The Lab Register and Safety',
      'Tables, Graphs and Means',
      'The Career Map',
    
      'Tool 3: Mathematics',
      'Practical skills'
    ],
  },
  {
    number: 9,
    slug: 'the-doorstep',
    title: 'The Doorstep',
    summary:
      'The ground floor\u2019s close: the shelf\u2019s map drawn one final time — the core books (cell, molecular, genetics, evolution, ecology, biotechnology, microbiology, immunology) each previewed in a paragraph; the botany and zoology shelves named as the two great organism traditions; the NEET register\u2019s weight honestly stated (biology as the exam\u2019s heaviest half) with the NCERT lines named as the school spine; and the promise that the next book — cell biology — opens the machinery that everything else in biology hangs from.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Shelf\u2019s Map',
      'The Two Organism Traditions',
      'The NEET Register Named',
      'The Promise of the Next Book',
      'Adolescence, Drug and Alcohol Abuse: The Health Register',
    ],
  },
]

export const foundationBiology: Book = {
  id: 'foundation-biology',
  title: 'Foundation Biology',
  subtitle: 'The themes of life — from the scientific method to the tree of life, the first complete tour',
  discipline: 'biology',
  level: 'Absolute beginner → secondary school (NEET foundation priced)',
  description: 'The biology ladder\u2019s ground floor: what life is and how biologists know it — the characteristics that separate the living from the non-living; the levels of organisation from molecule to biosphere; the scientific method as it is actually practised in biology, with the theory of evolution as the field\u2019s one grand unifying theme; the chemistry preview (water, carbon and the biomolecule families as life\u2019s building blocks); the cell as the fundamental unit; energy\u2019s flow and heredity\u2019s code introduced as the two engines of every living thing; the diversity survey from the three domains to the kingdoms; the ecological frame of populations, communities and ecosystems; and the biologist\u2019s craft — observation, microscope, field notebook and the honest experimental register.',
  status: 'planned',
  accent: ['#16a34a', '#14532d'],
  chapters,
}
