import type { Book, Chapter } from '../../../types'

/**
 * Evolution — the fifth book of the Biology shelf (the honest fold: the core line Evolutionary and the zoology line Evolution share this one register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 37 planned lessons, zero written. Lesson ids will use the `evo-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Evolution owns the full evolutionary register for the whole library — the single honest fold of the core line and the zoology line into one book (the animal-side examples live in its chapters, the plant-side cross-references plant-genetics). Population-genetics arithmetic is shared with genetics (the Hardy-Weinberg engine owned there, its evolutionary consequences owned here); the NEET evolution unit is priced here; the origins-of-life register is cross-referenced from the chemistry shelf’s foundation book.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — Unit 4 Mechanisms of Evolution and the evolution chapters of Unit 1 (read this pass: the descent-with-modification, the evolution-of-populations, the origin-of-species, the history-of-life chapters) as the spine.
 * - The NCERT class 12 evolution chapter as the school ladder (the NEET register).
 * - Freeman and Herron’s Evolutionary Analysis named as the university pole (the selection and phylogenetics registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-evidence',
    title: 'The Evidence Register',
    summary:
      'The case built from four independent lines: the fossil record with its absolute (radiometric) and relative dating, its gaps honestly stated and its transitional forms (the whale\u2019s land-to-sea arc, the feathered dinosaurs); homology — the same bones in the human arm, the bat wing and the whale flipper, the molecular homologies (the same genes across the tree, the cytochrome-c ladder), the developmental homologies (the pharyngeal arches and the Hox names); biogeography — the island registers (Darwin\u2019s Galapagos, Wallace\u2019s line), the continental-drift receipt; and direct observation — the resistance era as evolution watched in real time.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fossil Arc and Its Dating',
      'The Homology Census',
      'The Island Logic',
      'Evolution Watched Live',
    ],
  },
  {
    number: 2,
    slug: 'variation-selection',
    title: 'Variation and Selection',
    summary:
      'The mechanism\u2019s engine room: variation\u2019s sources (mutation\u2019s trickle, the sexual recombination\u2019s shuffle — why sex is evolution\u2019s accelerator); selection\u2019s three modes (directional, stabilising, disruptive with their curve arithmetic); fitness honestly defined as reproductive success, not strength; the selection\u2019s receipts — industrial melanism\u2019s peppered moth, the sickle-cell\u2019s malaria balance, the antibiotic resistance story priced as evolution\u2019s fastest case; sexual selection (the peacock\u2019s tail, the intrasexual combat, the runaway honesty); and the microevolution arithmetic connecting to the population engine of the genetics book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sources of Variation',
      'The Three Modes\u2019 Curves',
      'The Receipts of Selection',
      'Sexual Selection\u2019s Honest Tail',
      'Natural Selection and Its Types',
      'Darwin\'s Contribution and the Modern Synthetic Theory',
    
      'Chemotherapy/Antibiotics'
    ],
  },
  {
    number: 3,
    slug: 'drift-and-flow',
    title: 'Drift, Flow and the Neutral Register',
    summary:
      'The non-selective forces: drift as sampling error (the small-population honesty — the bottleneck\u2019s northern elephant seal, the founder\u2019s Amish polydactyly register, the fixation of alleles by coin-flip not merit); gene flow\u2019s homogenising current (the migration arithmetic); the neutral theory of molecular evolution (Kimura\u2019s claim — most fixation at the molecular level is drift, the nearly-neutral refinement) priced as the theory it is; and the relative-rates honesty — which force dominates at which population size, with the conservation consequences named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bottleneck and Founder Registers',
      'The Gene Flow Current',
      'The Neutral Theory Priced',
      'The Relative-Rates Honesty',
    ],
  },
  {
    number: 4,
    slug: 'speciation',
    title: 'The Origin of Species',
    summary:
      'The multiplication of lineages: the species concept census (biological, morphological, phylogenetic, ecological — each honest about its failures); the barrier census — prezygotic (temporal, habitat, behavioural, mechanical, gametic) against postzygotic (the reduced-viability-fertility registers); allopatric speciation as the mainstream (the geographic barrier, the divergence, the secondary contact\u2019s outcomes — fusion, reinforcement, the stable hybrid zone); sympatric speciation-and-honest registers (the polyploid plants as the instant species, the cichlid lakes, the host-shift insects); and the rate debate (gradualism against punctuated equilibrium, both kept as pattern claims).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Species Concepts\u2019 Census',
      'The Barrier Census',
      'The Allopatric Mainstream',
      'The Sympatric Honest Registers',
    ],
  },
  {
    number: 5,
    slug: 'phylogenetics',
    title: 'The Tree-Building Craft',
    summary:
      'Systematics as the discipline that reads ancestry: the character honesty (shared ancestral against shared derived — the homoplasy trap: convergence, reversal); the clade\u2019s logic (monophyletic only, the paraphyletic and polyphyletic traps named); the tree-reading craft (nodes, sister taxa, the rooting); the methods at survey depth (maximum parsimony, maximum likelihood, the Bayesian register named); the molecular clock (its assumptions, its calibration, its error bars honestly stated); and the three-domain tree as the current consensus map, with the LGT honesty that complicates the deep tree.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Character Honesty',
      'The Clade\u2019s Logic',
      'The Methods Named',
      'The Clock and Its Error Bars',
    ],
  },
  {
    number: 6,
    slug: 'macroevolution',
    title: 'The Grand Pattern',
    summary:
      'Above the species line: the trends\u2019 honesty (complexity\u2019s passive drift claim, the Cope\u2019s-size and the Dollo\u2019s-irreversibility claims each priced as the debated propositions they are); extinction\u2019s register — the background rate and the five (arguably six) mass extinctions with their causes (the end-Permian, the K-Pg asteroid) and their recoveries; adaptive radiation\u2019s engine (the post-extinction emptiness, the island arrivals — the cichlids and the honeycreepers as receipts); the Cambrian explosion\u2019s honesty (the fossil reality, the older-soft-body explanation, the eye-and-predation hypotheses); and the macroevolution-microevolution linkage kept honest.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Trends Priced as Claims',
      'The Mass Extinctions\u2019 Register',
      'Adaptive Radiation\u2019s Engine',
      'The Cambrian Honesty',
    ],
  },
  {
    number: 7,
    slug: 'origin-of-life',
    title: 'The Origin of Life',
    summary:
      'The chemical register at survey depth (the chemistry shelf owns the depth): the Miller-Urey experiment and what it did and did not show; the RNA world\u2019s logic (the molecule that is both information and machine — the ribosome\u2019s RNA core as the receipt); the protocell idea (the fatty-acid vesicles, the first heredity); the metabolic-first against replicator-first debate priced as the live one it is; and the history-of-life timeline fixed (the ~3.5-billion-year microbes, the oxygen revolution, the eukaryotic engulfment, the multicellular explosions) — each register told honestly as what the evidence supports.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Miller-Urey Honesty',
      'The RNA World\u2019s Logic',
      'The Protocell Idea',
      'The Timeline Fixed',
    ],
  },
  {
    number: 8,
    slug: 'human-evolution',
    title: 'The Human Story',
    summary:
      'The lineage told straight from the fossils: the hominin frame (bipedalism first — the Australopithecus receipt, the brain later); the genus Homo\u2019s census (the erectus\u2019 global reach, the habilis\u2019 tools, the Neanderthal\u2019s own story — the DNA receipt of interbreeding, the Denisovans); the Out-of-Africa replacement against multiregional debate settled to the mostly-replacement-with-gene-flow honesty; the culture engine (the tool kits\u2019 three ages, fire, language, the symbolic explosion); and the race honesty — the genetic variation within against between populations, the one-species register that undercuts the old race science.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bipedalism Receipt',
      'The Homo Census',
      'The Out-of-Africa Honesty',
      'The Culture Engine and the Race Honesty',
    ],
  },
  {
    number: 9,
    slug: 'coevolution-webs',
    title: 'Coevolution and the Webs',
    summary:
      'The entangled registers: the coevolution census (mutualism\u2019s reciprocal crafts, the arms races of predator-prey and parasite-host, the mimicry registers — Batesian and Mullerian with their arithmetic); the plant-pollinator web (the orchid-and-deceptive craft, the pollinator\u2019s reward economics — the plant books\u2019 cross-reference); the Red Queen\u2019s logic (the never-ending race that explains sex); the geographic mosaic idea (the patchy coevolution) named at survey depth; and the evolutionary ecology bridge — the ecological book\u2019s communities read as the coevolution\u2019s arena.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Arms Races',
      'The Mimicry Registers',
      'The Red Queen\u2019s Logic',
      'The Geographic Mosaic Named',
    ],
  },
]

export const evolution: Book = {
  id: 'evolution',
  title: 'Evolution',
  subtitle: 'Descent with modification — the evidence, the mechanisms, the speciation and the history of life',
  discipline: 'biology',
  level: 'Secondary → undergraduate → research doorway (NEET evolution priced; the phylogenetics register at university depth)',
  description: 'The unifying theory as a working discipline: the evidence register — fossils and their dating, the homology census (anatomical, molecular, developmental with the Hox depth), biogeography\u2019s island logic, direct observation in the resistance era; the mechanism at population depth (variation\u2019s sources, selection\u2019s three modes, drift and its registers, the fitness arithmetic honestly defined); speciation\u2019s craft — the barrier concept (prezygotic and postzygotic census), allopatric against sympatric with the polyploid plant register, the rate and pattern debate (gradualism against punctuated equilibrium priced fairly); phylogenetics and systematics — the tree-building craft (shared derived characters, the clade\u2019s logic, the molecular clock at survey depth); macroevolution\u2019s trends; the origin of life-and-chemical register at survey depth; human evolution honestly told; and coevolution\u2019s webs.',
  status: 'planned',
  accent: ['#78716c', '#44403c'],
  chapters,
}
