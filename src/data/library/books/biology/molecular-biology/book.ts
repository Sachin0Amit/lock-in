import type { Book, Chapter } from '../../../types'

/**
 * Molecular Biology — the third book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 49 planned lessons, zero written. Lesson ids will use the `molb-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Molecular Biology owns the central-dogma machinery. The applied tools (restriction enzymes, PCR, CRISPR) belong to biotechnology; the heredity patterns above the molecule belong to genetics; the chemical detail of nucleotides belongs to the chemistry shelf’s biochemistry book (cross-referenced); the clinical exploitation (diagnostics, gene therapy) is cross-referenced to medical-biochemistry; NEET’s molecular-basis-of-inheritance unit is priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — Unit 3 Genetics (read this pass: the molecular basis of inheritance chapters, gene expression from gene to protein, the regulation chapters, the viruses-and-genomes chapters) as the spine.
 * - Watson’s The Molecular Biology of the Gene named as the university pole.
 * - The NCERT class 12 molecular-basis-of-inheritance chapter priced as the school ladder and the NEET register.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'dna-structure',
    title: 'The DNA Structure',
    summary:
      'The double helix earned: the nucleotide\u2019s anatomy (deoxyribose, phosphate, the four nitrogenous bases — purines against pyrimidines); Chargaff\u2019s two rules as the arithmetic clue; the Watson-Crick model as the deduction that fit everything — antiparallel strands, the sugar-phosphate backbone outside, the A-T and G-C pairs inside with their hydrogen-bond counts; the semiconservative prediction and the Meselson-Stahl density-gradient proof; and the packing craft — from naked duplex to nucleosomes (the histone octamer) to the chromosome\u2019s coiled heights, with the bacterial circle contrasted.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nucleotide\u2019s Anatomy',
      'Chargaff\u2019s Clues and the Model',
      'The Meselson-Stahl Proof',
      'The Packing Ladder',
      'Nucleic Acids: DNA and RNA',
      'The Molecular Basis of Inheritance',
      'Vishwa D. Trivedi, Bethune Cookman University 3 Amino Acids, Peptides, and Proteins',
      'Todd M. Weaver, University of Wisconsin La Crosse 8 Nucleotides and Nucleic Acids',
      'University of Wisconsin-Madison for their numerous the Pentose Phosphate Pathway',
      'The Cytoplasm Is Organized by the Molecular Anatomy Reveals Evolutionary Relationships',
      'From Their Surroundings 20 and Weak Bases',
      '•=M:jf1 Entropy: Things Fall Apart 22 an Equilibrium Constant'
    ],
  },
  {
    number: 2,
    slug: 'replication',
    title: 'The Replication Factory',
    summary:
      'The copying machine: the origin as the starting bubble; helicase as the unzipper and single-strand-binding as the stabiliser; DNA polymerase\u2019s chemistry (the 5-to-3 direction only, the need for a primer); the leading strand\u2019s continuous run against the lagging strand\u2019s Okazaki fragments with ligase as the final welder; the telomere honesty — eukaryotic ends that shorten each division, telomerase as the germ-and-cancer exception; the proofreading and mismatch-repair register with the error rate\u2019s astonishing arithmetic; and the enzymes-as-census table fixed once and drilled.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Origin and the Bubble',
      'The Two Strands\u2019 Two Crafts',
      'The Telomere Honesty',
      'The Fidelity Arithmetic',
    ],
  },
  {
    number: 3,
    slug: 'transcription',
    title: 'Transcription — from Gene to RNA',
    summary:
      'The first reading: RNA polymerase\u2019s binding at the promoter (the TATA register) with the transcription factors\u2019 assembly in eukaryotes; the elongation craft (the template strand read 3-to-5, the new RNA built 5-to-3); termination\u2019s signals; the three products — mRNA as the courier, tRNA as the adapter, rRNA as the ribosome\u2019s own scaffold-and-catalyst; and the eukaryotic processing register (the 5 cap, the poly-A tail, the intron splicing with the spliceosome) — the prokaryote-eukaryote contrast that makes the comparison table worth fixing.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Promoter\u2019s Assembly',
      'The Three RNA Products',
      'The Eukaryotic Processing',
      'The Two-Kingdom Contrast',
      'Https://www.poly-ed.com/text-book-resources/campbell-biology-11th-edition'
    ],
  },
  {
    number: 4,
    slug: 'translation',
    title: 'Translation — the Code Read',
    summary:
      'The protein factory: the genetic code\u2019s properties (triplet, read in frames, degenerate — the wobble honesty, universal with its near-universality exceptions honestly stated); the codon table fixed by drill (the AUG start, the three stops, the table\u2019s use and abuse in exam questions); the tRNA\u2019s craft (the anticodon, the aminoacyl-tRNA-synthetase charging — the enzyme that actually knows the code); the ribosome\u2019s three sites (A, P, E) with initiation-elongation-termination walked once slowly; and the post-translational register — folding, modification, targeting to organelles.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Code\u2019s Properties',
      'The Codon Table by Drill',
      'The Charging Enzyme\u2019s Knowledge',
      'The Three Sites Walked Slowly',
      'Protein Synthesis: Transcription to Translation',
      'Lori Wallrath, University of Iowa-Iowa City of Proteins',
      'Chris Wang, Ambrose University 5 Protein Function'
    ],
  },
  {
    number: 5,
    slug: 'prokaryotic-regulation',
    title: 'The Prokaryotic Regulation',
    summary:
      'The operon\u2019s economy: Jacob and Monod\u2019s lac operon as the classic — the promoter, the operator, the repressor\u2019s shape change on lactose, the positive cAMP-CAP register when glucose is scarce; the trp operon as the repressible mirror; the regulatory logic\u2019s two families (inducible against repressible) with the exams\u2019 both-ways questions priced; the finer control — attenuation and riboswitches named; and the significance: the bacterium\u2019s budget — making only what the environment demands.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The lac Operon Earned',
      'The trp Mirror',
      'The Two Families\u2019 Logic',
      'The Budget\u2019s Significance',
    
      'D12 Stability and change'
    ],
  },
  {
    number: 6,
    slug: 'eukaryotic-regulation',
    title: 'The Eukaryotic Regulation',
    summary:
      'The orchestrated genome: chromatin\u2019s states (acetylation opening, methylation\u2019s two meanings, the histone code named at survey depth); the transcription factors\u2019 census (the general assembly at the promoter, the specific ones binding enhancers up to a million bases away with the DNA-looping craft); the RNA-level register (alternative splicing as one gene-many proteins, miRNA\u2019s silencing, mRNA breakdown control); protein-level control named; and the differential-expression honesty — why a liver cell and a neuron carry the same genome yet differ entirely.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chromatin\u2019s States',
      'The Enhancer\u2019s Reach',
      'The RNA-Level Register',
      'Differential Expression\u2019s Honesty',
      'Koni Stone, California State University Stanislaus',
      'Neurons, Synapses, and Signaling'
    ],
  },
  {
    number: 7,
    slug: 'mutation-and-repair',
    title: 'Mutation and Repair',
    summary:
      'The error economy: the mutation census (point — silent, missense, nonsense; frameshift by insertion-deletion; the chromosomal scale deferred to genetics); the causes (base analogs, radiation\u2019s thymine dimers, the chemical mutagens) with the Ames test as the carcinogen screen; the repair census (proofreading, mismatch, excision repair with the xeroderma-pigmentosum honesty, the SOS response in bacteria); the mutation\u2019s double face — mostly neutral, occasionally terrible, rarely the raw material of evolution; and the rate\u2019s arithmetic priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mutation Census',
      'The Causes and the Ames Screen',
      'The Repair Census',
      'Evolution\u2019s Raw Material',
    
      'Chemical Equilibria'
    ],
  },
  {
    number: 8,
    slug: 'mobile-elements-viruses',
    title: 'Mobile Elements and Viruses',
    summary:
      'The genome\u2019s restless fraction: transposons — the cut-and-paste DNA kind and the copy-and-paste retrotransposons (LINEs and SINEs as nearly half the human genome-and-honest census); the viral life\u2019s chemistry-only edge (the capsid, the envelope, the genome\u2019s DNA-or-RNA and double-or-single register); the bacteriophage\u2019s lytic against lysogenic cycles; retroviruses with HIV as the reverse transcriptase\u2019s carrier (the clinical register deferred to the medical shelf); and the horizontal-gene-transfer idea — conjugation, transformation, transduction — as the bacterial world\u2019s promiscuity, the biotechnology book\u2019s opening door.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Restless Genome\u2019s Census',
      'The Viral Edge',
      'The Two Phage Cycles',
      'Horizontal Transfer\u2019s Promiscuity',
    ],
  },
  {
    number: 9,
    slug: 'genomes-doorstep',
    title: 'Genomes and the Doorstep',
    summary:
      'The book\u2019s close at survey depth: the genome sizes\u2019 census (from viruses through bacteria to the eukaryotic C-value surprise); the human genome\u2019s map at headline depth (the ~20,000 genes against the 98-percent non-coding honesty and what that fraction is now known to do); the model genomes named (E. coli, yeast, Arabidopsis, the fly, the worm, the mouse); genomics\u2019 methods deferred to biotechnology (sequencing, the databases, the comparison register); and the doorstep — to genetics for the patterns above the molecule, to biotechnology for the tools, to the medical shelf for the clinical registers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Genome Sizes\u2019 Census',
      'The Human Map at Headline Depth',
      'The Model Genomes Named',
      'The Doorstep Drawn',
    ],
  },
]

export const molecularBiology: Book = {
  id: 'molecular-biology',
  title: 'Molecular Biology',
  subtitle: 'The central dogma fully told — DNA, RNA and the protein-making machinery of every living thing',
  discipline: 'biology',
  level: 'Undergraduate core → research doorway (molecular genetics register)',
  description: 'The information system at full depth: DNA as the double helix — the Watson-Crick structure with its base-pairing arithmetic, the semi-conservative replication the Meselson-Stahl experiment proved, the replication factory (helicase, polymerase, the leading and lagging strand-and-Okazaki craft, the proofreading that keeps fidelity near-perfect); transcription from gene to RNA (the promoter, RNA polymerase, the three RNA products); translation as the genetic code\u2019s reading (the codon table\u2019s 64 entries, the tRNA adapter, the ribosome\u2019s three sites, initiation through termination); the regulation register — operons in prokaryotes, transcription factors and enhancers in eukaryotes, the chromatin\u2019s open-and-closed states; mutation and repair as the error economy; and the mobile elements with retrotransposons as the genome\u2019s restless fraction; the applied tools (restriction enzymes, PCR, CRISPR) are cross-referenced to biotechnology, and the heredity patterns above the molecule belong to genetics.',
  status: 'planned',
  accent: ['#2563eb', '#1e3a8a'],
  chapters,
}
