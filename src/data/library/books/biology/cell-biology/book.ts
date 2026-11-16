import type { Book, Chapter } from '../../../types'

/**
 * Cell Biology — the second book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `cell-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Cell Biology owns the general register of cell structure and division. The metabolism itself (glycolysis through oxidative phosphorylation) belongs to the chemistry shelf’s biochemistry book; the central dogma machinery (replication, transcription, translation) belongs to molecular-biology; the bacterial cell’s deep physiology belongs to microbiology; cytokinesis specifics of plants are cross-referenced from plant-anatomy; NEET’s cell-division unit is priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — Unit 2 The Cell (read this pass: the membrane structure and transport chapters, the cell communication chapter, the cell cycle chapters) as the spine.
 * - The NCERT class 11 cell-the basis-of-life and cell-cycle-and-cell-division chapters priced as the school ladder.
 * - Alberts’ Molecular Biology of the Cell named as the university pole (the endomembrane and cytoskeleton registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'theory-and-tools',
    title: 'The Theory and the Tools',
    summary:
      'The cell doctrine and its evidence: Hooke\u2019s cork, Leeuwenhoek\u2019s animalcules, Schleiden and Schwann\u2019s generalisation and Virchow\u2019s omnis cellula e cellula; why the theory needed the microscope — resolution against magnification as the two separate limits; the light microscope\u2019s craft and its staining register; the electron microscope\u2019s two kinds (transmission for ultrastructure, scanning for surfaces); and cell fractionation — how the centrifuge assigns each organelle its own layer and each layer its own job.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Doctrine\u2019s Arc',
      'Resolution against Magnification',
      'The Two Electron Microscopes',
      'The Centrifuge\u2019s Layers',
    ],
  },
  {
    number: 2,
    slug: 'prokaryote-architecture',
    title: 'The Prokaryotic Architecture',
    summary:
      'The small cell\u2019s honest completeness: the nucleoid as the gene region without a membrane; the ribosomes as the protein factories in their 70S size; the cell wall-and-peptidoglycan craft with the Gram stain as the physician\u2019s oldest quick test; the capsule, the fimbriae and the flagellum as the attachment-and-motion register; the plasmid as the small extra circle that carries resistance — the clinical and biotechnological consequences deferred to their owning books; and the endospore as survival\u2019s hardest form.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nucleoid and the Ribosomes',
      'The Wall and the Gram Craft',
      'Attachment and Motion',
      'The Plasmid and the Endospore',
    ],
  },
  {
    number: 3,
    slug: 'membranes-and-transport',
    title: 'Membranes and Transport',
    summary:
      'The boundary\u2019s craft: the fluid-mosaic model — phospholipid bilayer as the sea, proteins as the icebergs with their two orientations, cholesterol as the temperature\u2019s moderator; the selective permeability logic; passive transport\u2019s census (simple diffusion, osmosis with its tonicity arithmetic — hypotonic, isotonic, hypertonic in plant and animal cells; facilitated diffusion through channels and carriers); active transport\u2019s engine (the sodium-potassium pump as the nerve\u2019s battery charger, electrochemical gradients); and bulk transport — endocytosis and exocytosis as the cell\u2019s swallowing and shipping.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fluid Mosaic\u2019s Sea',
      'The Tonicity Arithmetic',
      'The Pumps and the Gradient',
      'Endocytosis and Exocytosis',
    ],
  },
  {
    number: 4,
    slug: 'endomembrane-system',
    title: 'The Endomembrane System',
    summary:
      'The manufacturing network: the nuclear envelope with its pores as the information gate; the endoplasmic reticulum\u2019s two faces (rough with ribosomes as the protein factory, smooth as the lipid-and-detox line); the Golgi apparatus as the postal sorting centre with its cis and trans faces; lysosomes as the recycling stomach with the Tay-Sachs register priced honestly; vacuoles — the plant cell\u2019s water tower; and vesicular traffic as the whole system\u2019s bloodstream, with the secretion path traced from ribosome to plasma membrane.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Envelope and Its Pores',
      'The Two Faces of the ER',
      'The Golgi\u2019s Sorting Craft',
      'Lysosomes and Vacuoles',
    ],
  },
  {
    number: 5,
    slug: 'energy-organelles',
    title: 'The Energy Organelles',
    summary:
      'The power plants and their origin: mitochondria as the respiration site (double membrane, cristae, matrix, its own circular DNA); chloroplasts as the photosynthesis site (thylakoids, grana, stroma) with the plastid family beyond; the endosymbiosis theory\u2019s evidence — double membranes, own DNA, own ribosomes, binary fission, and the divide-and-conquer logic of an ancient engulfment; and the inheritance honesty: mitochondrial DNA passed mother-to-child, the register the genetics book prices at its chapter on extranuclear inheritance.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Power Plants',
      'The Endosymbiotic Evidence',
      'The Plastid Family',
      'The Maternal Lineage',
    ],
  },
  {
    number: 6,
    slug: 'cytoskeleton-and-matrix',
    title: 'The Cytoskeleton and the Matrix',
    summary:
      'The cell\u2019s bones and its yard: the three fibre systems — microtubules (the mitotic spindle\u2019s rails and the flagellum\u2019s core), microfilaments (actin\u2019s muscle-and-motion engine) and intermediate filaments (the tensile rope); motor proteins as the fibre-walkers (kinesin and dynein, myosin\u2019s walk); the extracellular matrix as the collar — collagen, the integrin connections and the tissue\u2019s informational yard; cell junctions (tight, desmosomes, gap) as the tissue\u2019s three ways of holding and talking; and the walls of plant cells and the bacterial peptidoglycan cross-referenced to their owning books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Fibre Systems',
      'The Motor Walk',
      'The Matrix as Information',
      'The Three Junctions',
    ],
  },
  {
    number: 7,
    slug: 'cell-cycle-mitosis',
    title: 'The Cell Cycle and Mitosis',
    summary:
      'Growth by copying: the cycle\u2019s phases (G1, S, G2, M) with the checkpoints as the quality gates and cyclin-CDK as the clock\u2019s molecular engine; DNA replication deferred to molecular-biology (this chapter needs only its fact); mitosis as the equal division — prophase\u2019s chromosome condensation (chromatids, centromeres, the kinetochore), prometaphase\u2019s capture, metaphase\u2019s one-cell-equator alignment, anaphase\u2019s sister separation, telophase\u2019s two nuclei; cytokinesis\u2019s two crafts (the animal cleavage furrow against the plant cell plate); and the significance: two genetically identical cells.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cycle and Its Clock',
      'Prophase through Metaphase',
      'Anaphase and Telophase',
      'The Two Cytokinesis Crafts',
    ],
  },
  {
    number: 8,
    slug: 'meiosis',
    title: 'Meiosis — the Division for Sex',
    summary:
      'The reduction division: why sex demands a halving (fertilisation restores — the alternation of generations logic); meiosis I as the homologue\u2019s separation — synapsis, the tetrad, crossing over as the swap that makes every chromosome a mosaic, independent assortment as the second shuffle with its 2-to-the n arithmetic; meiosis II as the sister\u2019s separation; the outcomes — four genetically distinct gametes; the errors (non-disjunction) priced honestly with Down syndrome as the register the genetics book inherits; and the comparison table against mitosis set straight once.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Sex Demands a Halving',
      'Crossing Over and Assortment',
      'The Four Distinct Gametes',
      'The Non-Disjunction Register',
    ],
  },
  {
    number: 9,
    slug: 'cell-communication',
    title: 'Cell Communication',
    summary:
      'The signal register: the three stages — reception, transduction, response — as the universal architecture; the receptors (G-protein-coupled as the largest family, receptor tyrosine kinases, ion-channel and intracellular for the hormones that pass membranes); transduction as the phosphorylation cascade (the relay runner metaphor priced honestly — one activated enzyme amplifying to thousands); the second messengers (cAMP, calcium) as the cascade\u2019s fuel; and response — from enzyme activation to gene expression, with apoptosis as the programmed exit that development needs.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Reception, Transduction, Response',
      'The Receptor Census',
      'The Phosphorylation Cascade',
      'The Apoptosis Exit',
    ],
  },
]

export const cellBiology: Book = {
  id: 'cell-biology',
  title: 'Cell Biology',
  subtitle: 'The fundamental unit of life, fully told — structure, membranes, communication and division',
  discipline: 'biology',
  level: 'Secondary → undergraduate core (Cell and Molecular Biology registers)',
  description: 'The cell as biology\u2019s atom: the theory and the tools that established it (light and electron microscopy, cell fractionation); the prokaryotic architecture against the eukaryotic; the plasma membrane\u2019s fluid-mosaic structure and its transport census — diffusion, osmosis, facilitated diffusion and the active pumps; the endomembrane system (nuclear envelope, ER, Golgi, lysosomes) as the eukaryote\u2019s manufacturing and shipping network; mitochondria and chloroplasts as the energy organelles with their own DNA and the endosymbiotic explanation; the cytoskeleton\u2019s three fibres and the extracellular matrix; the cell cycle with mitosis as division of the nucleus, meiosis as division for sex; and cell signalling — how cells receive, transduce and respond to messages.',
  status: 'planned',
  accent: ['#16a34a', '#166534'],
  chapters,
}
