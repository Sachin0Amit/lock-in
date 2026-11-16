import type { Book, Chapter } from '../../../types'

/**
 * Plant Genetics — the fourteenth book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `pgen-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Plant Genetics owns the plant-side genetic exploitation register. The transmission-and-population machinery belongs to genetics (the general register, cross-referenced — the sibling views); the molecular toolbox belongs to biotechnology; the plant-breeding-for-products economics belongs to economic-botany (the varieties-and-products register); the transgenic regulation belongs to the ethics chapter of biotechnology; the NCERT-and-NEET lines are priced at the general level with the breeding depth owned here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Mauseth’s Botany — the Genetics-and-Evolution section (read this pass) as the spine with Griffiths’ Introduction to Genetic Analysis named as the co-pole (cross-referenced).
 * - The NCERT class 12 principles-of-inheritance chapter as the school ladder.
 * - Acquaah’s Principles of Plant Genetics and Breeding named as the breeding pole (the selection-and-heterosis registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'plant-classics',
    title: 'The Plant\u2019s Classical Classics',
    summary:
      'The model register: the pea\u2019s contribution (the garden\u2019s craft — the selfing\u2019s emasculation-and-bagging engine, the seven traits\u2019 honesty, the F1-F2 arithmetic owned here as the plant\u2019s receipt with the genetics book owning the law\u2019s logic); the maize\u2019s contribution (the McClintock\u2019s transposon arc — the jumping-gene-and-maize receipt priced as the plant\u2019s second Nobel gift, the heterozygous\u2019s vigour-and-monoecious craft); the Arabidopsis\u2019s contribution (the weed\u2019s lab-and-model register — the small-genome-and-fast-generation-and-mutant-census crafts, the reference-organism receipt); and the plant\u2019s why (the selfing\u2019s clear-phenotypes\u2019 crafts, the generation\u2019s speed, the polytene\u2019s absence-and-gene-family\u2019s smallness honestly priced) — the plants priced as genetics\u2019 oldest-and-newest models.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pea\u2019s Craft and Receipt',
      'The Maize\u2019s Transposon Gift',
      'The Arabidopsis Register',
      'The Plants as the Oldest-and-Newest Models',
    ],
  },
  {
    number: 2,
    slug: 'linkage-mapping-plants',
    title: 'The Linkage-and-Mapping Register',
    summary:
      'The plant\u2019s maps: the mapping\u2019s arithmetic at the plant\u2019s depth (the testcross\u2019s recombination\u2019s crafts cross-referenced to genetics, owned here by the crop\u2019s receipt — the maize\u2019s tomato\u2019s rice-and-maps named); the cytological markers (the chromosome\u2019s knobs-and-deficiency registers — the maize-and-pachytene craft); the isozyme era (the allozyme\u2019s-breeding receipt); the RFLP-and-SSR-and-SNP eras walked (the marker\u2019s evolution priced — the density-and-automation arithmetic); the QTL craft (the polygene\u2019s mapping — the interval-mapping honesty, the LOD threshold, the epistasis\u2019s-QTL register named); and the map\u2019s uses (the gene\u2019s cloning-and-MAS-and-comparative-maps crafts — the synteny\u2019s rice-and-wheat honesty priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crop\u2019s Maps Named',
      'The Marker\u2019s Evolution Walked',
      'The QTL Craft\u2019s Honesty',
      'The Map\u2019s Uses and the Synteny Honesty',
    ],
  },
  {
    number: 3,
    slug: 'cytoplasmic-epigenetic',
    title: 'The Cytoplasmic and the Epigenetic Registers',
    summary:
      'The non-nuclear plant inheritance: the chloroplast\u2019s mitochondrial\u2019s maternal honesty (the variegation\u2019s four-o\u2019clock receipt cross-referenced to genetics — owned here for the plant\u2019s breeding exploitation); the cytoplasmic-male-sterility craft (the CMS\u2019s mitochondrial honesty — the petunia\u2019s rice\u2019s sorghum-and-CMS registers, the restorer\u2019s-Rf gene as the hybrid-seed\u2019s lock-and-key arithmetic priced); the epigenetic register (the vernalisation\u2019s chromatin\u2019s honesty cross-referenced from plant-physiology — the winter-wheat\u2019s cold licence owned as the epigenetic receipt, the paramutation\u2019s-maize arc named, the epigenetic-and-biotech crops\u2019 regulatory registers named); and the cytoplasm\u2019s breeding arithmetic (the three-line system\u2019s CMS-A-Rf-and-B lines walked — the hybrid-seed engine priced by its real economics).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Maternal Honesty and Its Exploitation',
      'The CMS-and-Restorer Lock-and-Key',
      'The Vernalisation as the Epigenetic Receipt',
      'The Three-Line System Walked',
    ],
  },
  {
    number: 4,
    slug: 'polyploid-crown',
    title: 'The Polyploid\u2019s Crown',
    summary:
      'The plant\u2019s chromosome arithmetic: the polyploid\u2019s abundance honesty (the fern\u2019s angiosperm\u2019s registers — why the plants tolerate what the animals rarely do, the multiple-origins-of-the same-polyploid receipt); the autoployploid\u2019s craft (the colchicine\u2019s doubling engine — the triploid\u2019s seedless-watermelon-and-banana exploitation priced, the autotetraploid-and-alfalfa registers); the allopolyploid\u2019s craft (the genome\u2019s-doubling-and-hybridisation engine — the wheat\u2019s brassica\u2019s cotton\u2019s tobacco\u2019s arcs told as the receipts they are: the AABBDD\u2019s the Triangle-of-U\u2019s honest diagrams); the aneuploid\u2019s breeding gift (the wheat\u2019s tobacco\u2019s oat\u2019s aneuploid-and-monosomic crafts — the alien\u2019s chromosome\u2019s addition-and-substitution registers); and the genome\u2019s-evolution register (the fractionation-and-downsizing honesty — the paleopolyploidy\u2019s evidence priced as the angiosperm\u2019s deep history).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Abundance Honesty and Its Why',
      'The Colchicine Engine and the Seedless Exploitation',
      'The Wheat\u2019s Brassica\u2019s Receipts',
      'The Paleopolyploidy\u2019s Deep History',
    ],
  },
  {
    number: 5,
    slug: 'breeding-self-cross',
    title: 'The Breeding Register — the Self-and-Cross Crafts',
    summary:
      'The variety\u2019s making: the two crop-registers held apart (the self-pollinated\u2019s cross-pollinated\u2019s different arithmetic — the homozygosity\u2019s heterozygosity\u2019s consequences priced); the selfed-crops\u2019 crafts (the pure-line-and-pedigree selections, the bulk-and-backcross registers, the multiline\u2019s blend honesty); the crossed-crops\u2019 crafts (the mass-and-family selections, the recurrent-selection register, the synthetic variety\u2019s arithmetic); the heterosis craft (the dominance-and-overdominance hypotheses priced as the two, the inbreeding\u2019s-depression receipt, the hybrid\u2019s yield arithmetic — the maize\u2019s rice\u2019s pearl-millet\u2019s arcs priced honestly by their economics); the wide-cross-and-introgression craft (the species\u2019 barrier\u2019s embryo-rescue registers, the alien\u2019s-gene\u2019s CWR\u2019s introgression — the rice\u2019s wheat\u2019s tomato\u2019s receipts); and the breeding\u2019s-objective register (the yield\u2019s quality-and-resistance dial — the Green-Revolution\u2019s honest pricing told with its cost register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Crop-Registers Held Apart',
      'The Heterosis\u2019s Hypotheses and Economics',
      'The Wide-Cross Craft',
      'The Objective Dial and the Green Revolution\u2019s Honesty',
    ],
  },
  {
    number: 6,
    slug: 'mutation-tissue-culture',
    title: 'The Mutation-and-Tissue-Culture Registers',
    summary:
      'The accelerating crafts: the mutation-breeding craft (the physical-and-chemical mutagens\u2019 crop registers, the mutant\u2019s-screening arithmetic, the variety\u2019s-receipts — the barley\u2019s rice\u2019s pearl-millet\u2019s mutational varieties named); the tissue-culture engine (the totipotency\u2019s Haberlandt\u2019s honesty, the micropropagation\u2019s clonal arithmetic, the somatic-embryogenesis register, the synthetic-seed craft); the doubled-haploid craft (the anther\u2019s ovary\u2019s culture — the DH\u2019s mapping-and-breeding registers, the instant-inbred\u2019s arithmetic priced); the somaclonal-and-gametoclonal variation honesty (the tissue\u2019s culture\u2019s surprise priced as the source it is); the embryo-rescue-and-somatic-hybridisation crafts (the protoplast\u2019s fusion-and-CMS\u2019s-transfer registers); and the virus\u2019s-free craft (the meristem\u2019s culture — the potato\u2019s citrus\u2019s receipts) — the laboratory-and-accelerating registers priced by their uses.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mutation\u2019s Variety Receipts',
      'The Totipotency Engine and the Clonal Arithmetic',
      'The Doubled-Haploid Instant-Inbred',
      'The Rescue-and-Fusion Crafts',
      'Gene Silencing: miRNA, siRNA and Transgene Silencing',
    ],
  },
  {
    number: 7,
    slug: 'molecular-marker',
    title: 'The Marker-and-Molecular Register',
    summary:
      'The modern dial: the marker\u2019s-craft census (the morphological-and-protein-and-DNA eras walked — the SSR\u2019s SNP\u2019s dominance honesty priced by their automation); the marker-assisted selection (the gene\u2019s QTL\u2019s-tag arithmetic — the indirect selection\u2019s young-plant\u2019s receipts, the foreground-and-background selection crafts); the genomic-selection register (the GBLUP-and-prediction arithmetic named at survey depth — the cycle\u2019s-speed honesty); the gene\u2019s-editing exploitation (the CRISPR\u2019s GM\u2019s crops cross-referenced to biotechnology — the transgenic\u2019s edited\u2019s different regulatory honesty priced); the variety\u2019s-protection craft (the DUS-and-VCU registers, the DNA\u2019s-fingerprinting-and-PVP register); and the molecular\u2019s-plant genetics frontier named (the gene\u2019s-cloning\u2019s map-based registers — the range\u2019s honesty held).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Marker\u2019s Craft Census',
      'The MAS\u2019s Tag Arithmetic',
      'The Genomic-Selection Register',
      'The Regulatory and Protection Crafts',
    ],
  },
  {
    number: 8,
    slug: 'genetic-resources-doorway',
    title: 'The Genetic Resources and the Doorway',
    summary:
      'The diversity\u2019s stewardship: the centre\u2019s-of-diversity register (the Vavilov\u2019s Zeven\u2019s Zhukovsky\u2019s arcs priced — the eight-plus centres, the crop\u2019s CWR\u2019s geography honesty); the gene bank\u2019s craft (the seed\u2019s field-and-cryo registers, the ex-situ\u2019s in-situ\u2019s complementarity honesty, the Svalbard\u2019s India\u2019s-NBPGR arcs named); the landrace\u2019s farmer\u2019s-rights registers (the GURT\u2019s IP honesty priced — the seed\u2019s-sovereignty debate held straight); the gene\u2019s-erosion and the conservation arithmetic (the effective population\u2019s-size craft cross-referenced to genetics); and the doorway — to economic-botany for the products this diversity feeds, to biotechnology for the tools that read-and-edit it, to the ecology-and-conservation register for the wild\u2019s complement; the plant-and-hereditary register held honestly as the agriculture\u2019s biodiversity\u2019s foundation: every variety a lineage, every gene bank a promise kept.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vavilov\u2019s Centres Priced',
      'The Gene Bank\u2019s Craft',
      'The Seed\u2019s Sovereignty Held Straight',
      'The Foundation Held',
    ],
  },
]

export const plantGenetics: Book = {
  id: 'plant-genetics',
  title: 'Plant Genetics',
  subtitle: 'The hereditary craft of plants — from Mendel\u2019s garden to the breeder\u2019s field and the marker dial',
  discipline: 'biology',
  level: 'Undergraduate botany (the genetics register; the breeding-and-molecular exploitation)',
  description: 'The plant-and-hereditary register in full: the classical foundations priced by the plant\u2019s own classics (Mendel\u2019s garden pea as the discipline-and-founding receipt — cross-referenced to genetics for the law\u2019s logic, owned here for the plant\u2019s contribution: the flower\u2019s pod\u2019s traits, the selfing-and-crossing crafts, the pea\u2019s maize\u2019s Arabidopsis-and-model register); the linkage-and-mapping register at the plant\u2019s depth (the maize\u2019s tomato\u2019s maps, the quantitative\u2019s marker arithmetic); the cytoplasmic-and-epigenetic registers (the chloroplast\u2019s mitochondrial\u2019s maternal honesty — the variegation\u2019s cytoplasmic-male-sterility\u2019s crafts, the CMS\u2019s hybrid-seed exploitation); the polyploid\u2019s crown (the plant\u2019s chromosome arithmetic — the autopolyploid\u2019s allopolyploid\u2019s crafts, the wheat\u2019s brassica\u2019s cotton\u2019s tobacco\u2019s evolutionary receipts, the triploid\u2019s sterility exploitation — the seedless-fruit register); the breeding register owned for the library (the self-and-cross-pollinated crops\u2019 different breeding craft, the pure-line-and-mass-and-family selection registers, the heterosis\u2019s hybrid\u2019s arithmetic with the CMS-and-restorer system, the diallel-and-Combining-Ability named at survey depth, the synthetic-and-multiline varieties, the mutation-breeding-and-tissue-culture exploitation — the doubled-haploid craft, the somaclonal honesty); the molecular register (the markers\u2019 craft from the isozyme-through-RFLP-to-SSR-and-SNP arcs, the QTL\u2019s mapping arithmetic, the marker-assisted selection\u2019s genomic-selection\u2019s registers, the transgenic\u2019s gene-editing exploitation cross-referenced to biotechnology with the regulatory-and-seed-sovereignty honesty); and the genetic-resources register (the centre-of-diversity\u2019s CWR\u2019s landrace\u2019s crafts, the seed\u2019s field\u2019s gene banks).',
  status: 'planned',
  accent: ['#ea580c', '#7c2d12'],
  chapters,
}
