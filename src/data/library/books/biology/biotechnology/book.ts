import type { Book, Chapter } from '../../../types'

/**
 * Biotechnology — the seventh book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 43 planned lessons, zero written. Lesson ids will use the `biotech-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Biotechnology owns the applied-molecular toolbox for the whole library. The central-dogma machinery belongs to molecular-biology (this book needs its facts, not its repetition); the plant-breeding exploitation belongs to plant-genetics (cross-referenced); the clinical exploitation of the same tools belongs to the medical shelf’s books (the diagnostics and therapy registers); the bioethics register is owned here once for the library; the bioinformatics registers are cross-referenced to the CS shelf’s books.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — the biotechnology chapter (read this pass: the DNA-cloning and the CRISPR-Gene-Editing chapters) as the spine.
 * - The NCERT class 12 biotechnology-principles-and-processes and biotechnology-and-its-applications chapters as the school ladder (the NEET register).
 * - Lewin’s Genes and the industry registers named as the university pole (the expression-systems register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'natural-toolbox',
    title: 'The Natural Toolbox',
    summary:
      'The enzymes that made the field: the restriction endonucleases — their bacterial origin (the modification-and-restriction defence pair), the palindrome recognition with the sticky-end craft of the type-II class; the naming register (EcoRI honestly decoded); the ligase\u2019s weld; the modification methylases that protect the host; the polymerases census (the Klenow fragment, the heat-proof Taq earned from Thermus aquaticus — the Yellowstone receipt); the reverse transcriptase (the RNA-to-DNA craft the retroviruses lent the field); and the phosphatase and exonuclease registers named — the toolbox catalogued before it is used.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Restriction Pair\u2019s Defence Origin',
      'The Palindrome and the Sticky Ends',
      'The Toolbox Catalogued',
      'The Principles and Processes of Biotechnology',
      'The Tools of rDNA Technology',
    ],
  },
  {
    number: 2,
    slug: 'vectors-cloning',
    title: 'Vectors and Cloning',
    summary:
      'The carrying craft: the plasmid vector\u2019s anatomy (the origin of replication, the selection marker, the multiple-cloning-site register, the promoter\u2019s expression cassette); the transformants\u2019 selection arithmetic (the antibiotic plate and the blue-white screen — the lacZ alpha-complementation craft); the transformation itself (the chemical competence and the electroporation, the calcium-chloride register); the phage and cosmid vectors named; the Ti-plasmid of Agrobacterium as the plant kingdom\u2019s natural genetic engineer (the crown-gall story, the disarmament craft); the shuttle vectors\u2019 two-host register; and a clone walked from insert to verified colony once slowly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Plasmid\u2019s Anatomy',
      'The Selection Screens',
      'The Ti Plasmid\u2019s Craft',
      'A Clone Walked Slowly',
    ],
  },
  {
    number: 3,
    slug: 'pcr-amplification',
    title: 'PCR — the Exponential Copier',
    summary:
      'The amplification engine: the three steps\u2019 thermal cycle (denaturation\u2019s 94, the annealing\u2019s primer-dependent temperature, the extension\u2019s 72) and the arithmetic (n cycles → 2-to-the n copies — the thirty-cycle billion-fold priced); the primer design craft (the 18-25 base register, the GC arithmetic, the Tm craft, the dimer-and-hairpin honesty); the enzymes\u2019 census (the classic Taq against the proof-reading polymerases); the variants\u2019 register (the RT-PCR for RNA, the real-time quantitative craft with its Ct arithmetic, the multiplex idea); the contamination honesty (the carryover\u2019s aerosol trap and the UNG defence); and the applications\u2019 preview — the forensic, the diagnostic and the cloning registers downstream.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Step Cycle and Its Arithmetic',
      'The Primer Design Craft',
      'The Variants\u2019 Register',
      'The Contamination Honesty',
    ],
  },
  {
    number: 4,
    slug: 'libraries-screening',
    title: 'Libraries and Screening',
    summary:
      'The collective registers: the library craft — the genomic library (the restriction partial-digest fragments into vectors, the coverage arithmetic honestly priced) against the cDNA library (the mRNA-to-double-strand craft, the tissue-specific honesty of what it captures); the probe craft (the colony hybridisation, the radioactive and fluorescent registers, the degenerate-oligo idea for the protein-first case); the expression library\u2019s screen (the antibody probe for the protein you can detect); the PCR-as-library idea (the modern shortcut); and the clone verification craft (the restriction map, the Sanger check) — the finding of one gene among a genome told as the detective work it is.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Libraries and Their Honesty',
      'The Probe Craft',
      'The Expression Screen',
      'The Clone Verified',
    ],
  },
  {
    number: 5,
    slug: 'sequencing',
    title: 'Sequencing — Reading the Whole',
    summary:
      'The reading arc: the Sanger method earned (the chain-termination craft — the dideoxy nucleotides as the unextendable stops, the four-lane and the capillary fluorescent registers, the read-length honesty); the assembly craft (the overlap arithmetic, the contig, the coverage depth and the closure); the next-generation idea at survey depth (the massively-parallel sequencing-by-synthesis, the bridge amplification and the nanopore-and-electrical craft named); the human genome project\u2019s arc (the public-private race honestly told, the draft in 2000 and the finish in 2003); the cost curve\u2019s collapse (the thousand-dollar register priced); and the sequence-to-function honesty — the read is the start, not the understanding.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sanger Craft Earned',
      'The Assembly Arithmetic',
      'The Next-Generation Idea',
      'The Cost Curve and the Honesty',
    ],
  },
  {
    number: 6,
    slug: 'genome-editing',
    title: 'The Editing Era',
    summary:
      'The targeted change: the nuclease lineage (the meganucleases, the ZFN and TALEN craft named as the programmable cutters they were); CRISPR-Cas9 earned — the bacterial adaptive-immune origin (the spacer memory, the repeat array, the Cas genes), the re-engineering (the guide RNA\u2019s twenty addressing bases, the cut-and-the cell\u2019s-repair); the repair\u2019s two doors (the error-prone NHEJ as the knockout engine, the HDR as the precise-edit door with its templated honesty); the refinements (the dead-Cas9 as the traffic-light regulator, the base and prime editors named); the off-target honesty (the mistargeted cuts, the guide-design mitigation, the screens); and the delivery craft (the viral and non-viral registers) — the ethics deliberately deferred to the book\u2019s close.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nuclease Lineage Named',
      'CRISPR Earned from the Bacteria',
      'The Two Repair Doors',
      'The Off-Target Honesty',
    ],
  },
  {
    number: 7,
    slug: 'expression-industrial',
    title: 'Expression and the Industrial Register',
    summary:
      'Making the protein: the expression arithmetic (the promoter\u2019s strength, the copy number, the codon-optimisation craft, the inclusion-body honesty and the refolding); the hosts\u2019 census (E. coli as the workhorse with its endotoxin and non-glycosylation limits, yeast as the eukaryotic middle, the insect-and-mammalian cell registers for the folding-critical proteins); the purification ladder (the affinity tag craft, the chromatography cross-reference to the chemistry shelf); the scale-up register (the fermenter\u2019s batch and fed-batch arithmetic, the GMP frame named); and the products\u2019 census (the insulin and growth-hormone receipts, the industrial enzymes — the detergents\u2019 proteases, the cheese\u2019s rennet, the biofuels and bioplastics registers).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Expression Arithmetic',
      'The Hosts\u2019 Census',
      'The Purification Ladder',
      'The Products\u2019 Census',
    ],
  },
  {
    number: 8,
    slug: 'medical-agri-applications',
    title: 'The Medical and Agricultural Registers',
    summary:
      'The two great application fields: the medical (the recombinant insulin arc as the 1982 receipt, the vaccines\u2019 two kinds — the subunit and the mRNA registers priced honestly, the gene-therapy arc with its first-generation tragedy and its current receipts, the diagnostics — the PCR and the microarray in the clinic cross-referenced to the medical shelf); the agricultural (the Bt craft — the toxin\u2019s specificity honesty, the herbicide-tolerance register, the Golden Rice arc with its regulatory twenty-year honesty, the monarch-pollen debate told straight); the environmental registers (the bioremediation, the biosensors); and each application priced by its evidence, not its advocacy.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Insulin Receipt',
      'The Vaccines and the Therapy Arc',
      'The Agricultural Registers Told Straight',
      'The Environmental Register',
      'Transgenic Animals, Biosafety, Biopiracy and Patents',
    ],
  },
  {
    number: 9,
    slug: 'ethics-safety-doorway',
    title: 'The Ethics, the Safety and the Doorway',
    summary:
      'The constraint register told as the real one it is: the bioethics census (the somatic against the germline line — why the line was drawn and where the current debates sit, the enhancement against therapy honesty, the consent and justice registers); the biosafety craft (the risk-level containment census, the escape-and-release honesty, the gene-drive\u2019s reversibility problem); the regulation register (the Cartagena and the national frames named at survey depth, the Asilomar arc as the field\u2019s own self-restraint story); the IP and seed-sovereignty debates priced honestly as politics the scientist must understand; and the doorway — the CRISPR generation\u2019s own promise held honestly: the tools are real, the decisions are ours.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bioethics Census and the Germline Line',
      'The Biosafety Craft',
      'The Asilomar Arc',
      'The Doorway Held Honestly',
    ],
  },
]

export const biotechnology: Book = {
  id: 'biotechnology',
  title: 'Biotechnology',
  subtitle: 'The applied register — recombinant DNA, PCR, sequencing, genome editing and the biotechnology industry',
  discipline: 'biology',
  level: 'Undergraduate core → professional (the biotech industry register priced)',
  description: 'The toolbox taken down from the theory: the natural toolbox\u2019s discovery — restriction enzymes with their palindrome craft and the ligase that welds; the vectors\u2019 census (plasmids, phages, the Ti plasmid for plants) with the marker-and-selection arithmetic; the library and the probe craft; PCR as the exponential copier (the three-step thermal cycle, the primer design, the polymerase from the hot springs); sequencing\u2019s arc from Sanger\u2019s chain-termination to the next-generation registers (the sequencing-by-synthesis idea at survey depth) with the assembly craft named; the genome editing era — ZFNs and TALENs named, CRISPR-Cas9 earned (the guide RNA\u2019s address, the cut-and-the cell\u2019s-repair, the base and prime editing registers); expression systems (bacteria, yeast, the cell cultures); the applications census — medical (insulin, the vaccines, the gene-therapy honesty), agricultural (the Bt and Golden Rice registers with the pollen-monarch honesty), forensic (cross-referenced), environmental and industrial; and the bioethics register told as the real constraint it is.',
  status: 'planned',
  accent: ['#0891b2', '#164e63'],
  chapters,
}
