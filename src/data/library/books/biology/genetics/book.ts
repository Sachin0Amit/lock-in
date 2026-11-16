import type { Book, Chapter } from '../../../types'

/**
 * Genetics — the fourth book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `gen-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Genetics owns the transmission-and-population register above the molecule. The molecular machinery (replication-to-translation, regulation) belongs to molecular-biology; the plant-breeding exploitation belongs to plant-genetics; the clinical counselling and diagnostic register belongs to the medical shelf’s books (cross-referenced); the statistical engine (chi-square, the probability craft) is owned here as the discipline’s own mathematics.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — Unit 3 Genetics (read this pass: Mendel and the chromosome theory chapters, the linkage-map chapters, the epigenetics chapter) as the spine.
 * - The NCERT class 12 principles-of-inheritance-and-variation and evolution chapters as the school ladder (NEET’s heaviest units).
 * - Griffiths’ Introduction to Genetic Analysis named as the university pole (the probability-and-map register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'mendels-logic',
    title: 'Mendel\u2019s Logic',
    summary:
      'The monastery\u2019s arithmetic: the pea\u2019s seven traits and the true-breeding start; the monohybrid cross — P to F1 to F2 with the 3:1 ratio and its hidden 1:2:1 genotypic spine; the dihybrid 9:3:3:1 as the independent-assortment receipt; the vocabulary fixed (gene, allele, homozygous, heterozygous, genotype, phenotype) because every later chapter leans on it; the test cross as the detective\u2019s tool (the unknown genotype exposed by the recessive cross); the probability craft (the product and sum rules, the Punnett arithmetic from one square to two); and why Mendel counted — quantification as biology\u2019s then-new move.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Seven Traits and True Breeding',
      'The 3:1 and Its Hidden 1:2:1',
      'The Test-Cross Detective',
      'The Probability Craft',
      'Heredity and Variation',
      'Variation: The Raw Material',
    ],
  },
  {
    number: 2,
    slug: 'extensions',
    title: 'The Extensions\u2019 Census',
    summary:
      'Mendel\u2019s clean ratios, complicated honestly: dominance hierarchies (complete, incomplete with the snapdragon\u2019s pink, codominance with the ABO blood craft and its transfusion arithmetic); multiple alleles as the population-level truth (three alleles, six genotypes, four phenotypes of the ABO system); pleiotropy (the sickle allele\u2019s many effects — the clinical honesty deferred); epistasis (the 9:3:4 and 12:3:1 modifications); polygenic inheritance with the bell curve (skin colour and height as the continuous register); and the environment\u2019s fingerprint (the hydrangea\u2019s soil-pH colour, the Siamese cat\u2019s temperature-darkened points) — the norm-of-reaction idea.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Dominance\u2019s Hierarchy',
      'The ABO Craft',
      'Epistasis\u2019s Modified Ratios',
      'Polygenic Curves and the Norm of Reaction',
      'Meiosis and Genetic Diversity',
    ],
  },
  {
    number: 3,
    slug: 'chromosome-theory',
    title: 'The Chromosome Theory',
    summary:
      'The fly room\u2019s evidence: Sutton\u2019s parallel (the alleles\u2019 behaviour mirrors the chromosomes\u2019 behaviour); Morgan\u2019s white-eyed fly as the first sex-linked proof (the X-chromosome logic); the linkage honesty — the genes that ride the same chromosome and the crossing over that sometimes separates them; the recombination frequency as the map distance (the 1-percent-equals-one-map-unit arithmetic) with a two-point and three-point cross walked; the map\u2019s construction as the cumulative receipt; sex determination\u2019s census (the XY and WZ systems, the haplodiploid bees, the temperature reptiles); and the Barr body with the dosage-compensation idea.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sutton\u2019s Parallel and Morgan\u2019s Fly',
      'Linkage and Its Breaking',
      'The Map-Distance Arithmetic',
      'The Sex-Determination Census',
    ],
  },
  {
    number: 4,
    slug: 'chromosome-errors',
    title: 'The Chromosome Errors',
    summary:
      'The karyotype\u2019s craft and its failures: the chromosome census fixed (the human 46, the banding craft); non-disjunction\u2019s consequences — Down (trisomy 21), Klinefelter (XXY), Turner (XO) with their phenotype honesty; the structural errors (deletion, duplication, inversion, translocation with the Robertsonian craft and the familial-Down translocation carrier); the polyploid register (fatal in animals, the plant breeder\u2019s friend — cross-referenced to plant-genetics); and the ethics register priced once — the counselling, the screening, the decisions, with the medical-shelf cross-reference named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Karyotype Fixed',
      'The Aneuploid Census',
      'The Structural Errors',
      'The Polyploid Split and the Ethics',
      'The Mendelian and Chromosomal Disorders: Thalassemia to Klinefelter',
    ],
  },
  {
    number: 5,
    slug: 'extranuclear',
    title: 'The Extranuclear Inheritance',
    summary:
      'Beyond the nucleus: the cytoplasmic maternal lines — chloroplast variegation (the four-o\u2019clock-leaf\u2019s branches) and the mitochondrial pedigrees (the maternal-only transmission, the heteroplasmy honesty, the LHON register as the clinical example); the infectious heredity of the kappa particle in Paramecium named at survey depth; and the modern receipt — the endosymbiotic explanation (why the organelle keeps its own tiny circle) with the mitochondrial-DNA applications (the Eve register, the forensic identity craft cross-referenced to forensic-medicine).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Variegated Leaf\u2019s Line',
      'The Mitochondrial Pedigrees',
      'The Endosymbiotic Receipt',
      'The Applications Named',
    ],
  },
  {
    number: 6,
    slug: 'pedigree-counselling',
    title: 'The Pedigree and the Counselling Craft',
    summary:
      'The family tree as instrument: the pedigree\u2019s symbols and the autosomal-dominant, autosomal-recessive and X-linked patterns read from the tree itself (the vertical against the horizontal transmission, the male-only and the criss-cross registers); the probability counselling craft (the carrier arithmetic, the Bayesian updating at survey depth); consanguinity\u2019s honesty; the Mendelian errors of the pedigree (the reduced penetrance and variable expressivity named); and the diagnosis register deferred to the medical shelf (the amniocentesis, the CVS, the newborn screening named without duplication).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Symbols and the Three Patterns',
      'The Carrier Arithmetic',
      'The Pedigree\u2019s Honest Complications',
      'The Screening Register Deferred',
    ],
  },
  {
    number: 7,
    slug: 'population-genetics',
    title: 'The Population Register',
    summary:
      'The allele\u2019s fate in the crowd: the Hardy-Weinberg engine (the p²-2pq-q² equilibrium, the five conditions of its stillness) with the allele-frequency arithmetic drilled on real numbers; the five forces — mutation\u2019s trickle, migration\u2019s gene flow, drift\u2019s sampling error (the bottleneck and founder registers with their real-world examples), selection\u2019s directional-stabilising-disruptive census, and non-random mating; the fitness arithmetic; and the honesty — why the equilibrium is a null model: the biologist\u2019s way of asking, what is moving this population?',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Equilibrium Engine',
      'The Five Forces Named',
      'Drift\u2019s Sampling Honesty',
      'Selection\u2019s Three Modes',
    ],
  },
  {
    number: 8,
    slug: 'quantitative-epigenetic',
    title: 'The Quantitative and the Epigenetic',
    summary:
      'The continuous traits and the marks above the sequence: quantitative genetics\u2019 craft — the normal distribution, heritability\u2019s two meanings (broad and narrow) with the selection-response arithmetic (R = h²S) priced at survey depth, the twin studies\u2019 logic and their honesty (the equal-environment caveat); epigenetics\u2019 register — DNA methylation and histone marks as the switches above the code, the genomic imprinting (the Igf2 case), the agouti mouse\u2019s dietary demonstration, the transgenerational honesty still contested; and the modern synthesis\u2019 frame — genes and environment meeting in the statistic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Heritability\u2019s Two Meanings',
      'The Twin Studies\u2019 Logic and Limits',
      'The Epigenetic Switches',
      'The Modern Synthesis Frame',
    ],
  },
  {
    number: 9,
    slug: 'genomics-doorway',
    title: 'The Genomic Doorway',
    summary:
      'The transmission register\u2019s close: the association craft (GWAS at headline depth — the SNP chips, the hits and their small effects honesty); the pharmacogenomic idea named; the gene drive\u2019s logic and its ethics (the mosquito registers); the genome editing deferred to biotechnology (the CRISPR craft owned there); and the shelf\u2019s map drawn — molecular-biology beneath (the machinery), plant-genetics beside (the breeding exploitation), the medical shelf above (the clinical registers), the evolution book ahead (the population forces at species scale). The genetics register holds: heredity is arithmetic plus evidence, and both have been earned.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Association Craft',
      'The Pharmacogenomic Idea',
      'The Gene Drive\u2019s Ethics',
      'The Shelf\u2019s Map Drawn',
    ],
  },
]

export const genetics: Book = {
  id: 'genetics',
  title: 'Genetics',
  subtitle: 'Heredity from Mendel to the genome — transmission, extension, population and the quantitative register',
  discipline: 'biology',
  level: 'Secondary → undergraduate (NEET genetics priced; the population register at university depth)',
  description: 'The heredity discipline in one arc: Mendel\u2019s logic — the garden-pea experiments with their meticulous ratio arithmetic (segregation 3:1, independent assortment 9:3:3:1), the test-cross detective craft and the probability laws that carry every prediction; the extensions\u2019 census — dominance hierarchies, incomplete dominance and codominance, multiple alleles (the ABO craft), pleiotropy and epistasis, polygenic inheritance and the environment\u2019s fingerprint; the chromosome theory — Morgan\u2019s fly room, linkage and the recombination arithmetic that builds genetic maps, sex linkage and the Barr body; extranuclear inheritance (the mitochondrial and chloroplast registers); the pedigree and the probability counselling craft; population genetics (the Hardy-Weinberg engine, the five forces that move allele frequencies); and the quantitative and epigenetic registers named honestly.',
  status: 'planned',
  accent: ['#dc2626', '#7f1d1d'],
  chapters,
}
