import type { Book, Chapter } from '../../../types'

/**
 * Plant Taxonomy — the twelfth book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `ptax-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Plant Taxonomy owns the naming-and-ordering register for the whole library. The evolutionary logic of the trees belongs to evolution (cross-referenced); the genetics-and-molecular methods belong to plant-genetics and biotechnology; the economic census of the families is shared with economic-botany (this book owns the diagnostic value, that one the products); the NCERT-and-NEET diversity register is priced here (the plant-kingdom-and-living-world units).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Mauseth’s Botany — the diversity-and-genetics sections (read this pass: the four-part arc) as the spine with Raven’s Biology of Plants named as the co-pole.
 * - The NCERT class 11 plant-kingdom and morphology-and-anatomy chapters as the school ladder (the NEET register).
 * - Simpson’s Plant Systematics named as the university pole (the APG-and-phylogenetics registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'three-crafts',
    title: 'The Three Crafts',
    summary:
      'The discipline\u2019s holding apart: the identification craft (the specimen\u2019s route to a name — the flora-and-key craft walked twice, the couplet\u2019s honesty, the ruling-out arithmetic); the nomenclature craft (the binomial\u2019s grammar — the genus-and-epithet, the authority\u2019s citation, the type specimen as the anchor, the priority\u2019s date-and-its-conservation exceptions, the ICN\u2019s governance honestly priced); the classification craft (the ranks\u2019 hierarchy — the species-and-genus-and-family-and-order-and-class-and-division census, the alpha-and-omega taxonomy honesty); and the three held together by one specimen\u2019s full journey — the field\u2019s collection to the herbarium\u2019s cabinet to the flora\u2019s key to the published name.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Key Craft Walked',
      'The Binomial\u2019s Grammar and the Type\u2019s Anchor',
      'The Ranks\u2019 Hierarchy',
      'One Specimen\u2019s Full Journey',
    ],
  },
  {
    number: 2,
    slug: 'classification-history',
    title: 'The Classification\u2019s History',
    summary:
      'The idea\u2019s arc: the artificial register (Linnaeus\u2019s sexual system — the stamens\u2019 arithmetic as the honest first key, praised for use and criticised for kinship); the natural register (the Bentham-and-Hooker-and-the Cronquist-and-Takhtajan arcs — the pre-molecular kinship crafts priced for their insight); the phylogenetic register (the cladistics craft — the shared-derived logic cross-referenced to evolution, the APG\u2019s molecular tree as the current consensus with its ordinal register at survey depth); the honest comparison (why the artificial keys still work for identification while the phylogenetic tree rules the classification); and the naming honesty (the names follow the evidence — the reclassification-and-synonym register priced as the science\u2019s living, not its failure).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sexual System Priced',
      'The Natural Arcs',
      'The APG Consensus',
      'The Names Follow the Evidence',
    ],
  },
  {
    number: 3,
    slug: 'herbarium-field-craft',
    title: 'The Herbarium and the Field Craft',
    summary:
      'The discipline\u2019s workshop: the collection\u2019s discipline (the field notebook\u2019s data honesty — the place-and-date-and-habitat-and-collector register, the pressing-and-poisoning craft, the label\u2019s grammar); the herbarium\u2019s architecture (the sheet\u2019s mounting, the genus folder-and-family cabinet logic, the type\u2019s separate vault); the flora\u2019s craft (the dichotomous key\u2019s writing — the couplet\u2019s two-sided honesty, the indented-and-bracketed formats); the field census (the vegetation\u2019s quadrat-and-transect cross-reference to plant-ecology); the botanical survey\u2019s registers (the survey-of-India arc named, the red-data-and-conservation lists cross-referenced); and the digitisation register (the virtual herbarium, the DNA-barcoding craft named at survey depth) — the workshop priced as the science\u2019s memory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Collection\u2019s Discipline',
      'The Cabinet\u2019s Architecture',
      'The Key\u2019s Writing Craft',
      'The Workshop as Memory',
    ],
  },
  {
    number: 4,
    slug: 'algae-line',
    title: 'The Algal Line',
    summary:
      'The kingdom\u2019s older half: the algal census (the chlorophyte\u2019s green — the Chlamydomonas-and-Volvox-and-Spirogyra-and-Ulothrix-and-chara register priced by their diagnostic craft, the phaeophyte\u2019s brown — the Laminaria-and-Fucus-and-Sargassum craft, the rhodophyte\u2019s red — the Polysiphonia-and-its-life-cycle honesty, the diatom\u2019s silica engine named); the cyanobacteria\u2019s placement honesty (the blue-green as the bacterial register — the Nostoc-and-Anabaena-and-Oscillatoria crafts cross-referenced to microbiology); the algal life-cycle census (the haplontic-and-diplontic-and-haplodiplontic patterns fixed once — the isogamous-anisogamous-and-oogamous register); the economic register (the agar-and-algin-and-carrageenan extracts, the diatomaceous earth, the beta-carotina honesty); and the algal consequences (the oxygen\u2019s ancient gift, the blooms\u2019 modern honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Coloured Census',
      'The Life-Cycle Patterns Fixed',
      'The Economic Extracts',
      'The Consequences Priced',
      'The Salient-Features Register: Algae, Bryophytes, Pteridophytes and Gymnosperms',
    ],
  },
  {
    number: 5,
    slug: 'bryophyte-pteridophyte',
    title: 'The Bryophyte-and-Pteridophyte Register',
    summary:
      'The land\u2019s first steps: the bryophyte craft (the Marchantlia-and-Funaria-and-Sphagnum register — the gametophyte\u2019s dominance honesty, the antheridium-and-archegonium architecture, the sporophyte\u2019s dependent capsule, the peat-moss\u2019s water arithmetic); the pteridophyte register (the Lycopodium-and-Selaginella-and-Equisetum-and-Pteris-and-Marsilea crafts — the vascular-xylem-and-phloem receipt, the independent-sporophyte honesty, the prothallus\u2019s free-living gametophyte, the heterosporous Selaginella door); the alternation-of-generations arithmetic owned here at the plant register (the cross-reference to genetics for the chromosomal logic); the fossil fuel honesty (the Carboniferous forests\u2019 coal gift); and the seed\u2019s absence honestly priced — why these plants still need the film of water for the sperm\u2019s swim.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bryophyte Craft and Its Capsule',
      'The Vascular Receipt',
      'The Generations\u2019 Arithmetic',
      'The Water\u2019s Constraint Held',
      'Growth, Development and Reproduction in Ferns and Mosses',
    ],
  },
  {
    number: 6,
    slug: 'gymnosperm-angiosperm',
    title: 'The Gymnosperm-and-Angiosperm Arc',
    summary:
      'The seed\u2019s two answers: the gymnosperm register (the cycad-and-Ginkgo-and-conifer-and-Gnetum census — the seed\u2019s exposed honesty, the pollen-and-wind craft, the conifer\u2019s cone-and-embryo architecture, the Gnetum\u2019s vessel- curiosity priced); the angiosperm crown (the carpel-and-enclosure craft — the double-fertilisation receipt cross-referenced from genetics, the fruit\u2019s dispersal engine, the flower-pollinator coevolution cross-referenced to evolution); the monocot-eudicot honesty (the one-against-two-cotyledon and the scattered-against-ringed-vascular crafts — the anatomy cross-reference); the fossil arc (the Archaeopteris-and-the first-seed honesty, the Amborella\u2019s-branch receipt, the Cretaceous-and-later radiation); and the dominance receipts (the cone-bearing\u2019s cold-and-dry ranges against the flowering\u2019s coevolutionary breadth — each priced by its mechanism, never as advocacy).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gymnosperm Census and Its Exposed Seed',
      'The Carpel\u2019s Craft',
      'The Fossil Arc Honesty',
      'The Two Dominance Receipts',
    ],
  },
  {
    number: 7,
    slug: 'key-families',
    title: 'The Key Families Register',
    summary:
      'The working botanist\u2019s cabinet: the diagnostic craft per family (the floral formula-and-diagram register — the K-C-A-G engine by which every family is read); the families fixed — the Fabaceae (the papilionaceous-and-keel craft, the root-nodule cross-reference), the Solanaceae (the berry-and-capsule register), the Asteraceae (the head\u2019s floret arithmetic — the ray-and-disc crafts), the Poaceae (the grass\u2019s reduced-and-wind-flower honesty, the caryopsis craft, the world\u2019s-cereal receipt), the Brassicaceae (the silique craft), the Rosaceae (the perigynous honesty), the Lamiaceae (the verticillaster craft), the Euphorbiaceae-and-Liliaceae named; each with its economic register cross-referenced to economic-botany; and the keying drill — ten specimens walked to their families as the craft-and-own receipt.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Floral Formula Engine',
      'The Families Fixed by Their Crafts',
      'The Economic Cross-References',
      'The Keying Drill\u2019s Ten Specimens',
      'The Five Exam Families: Malvaceae, Cruciferae, Leguminoceae, Compositae and Graminae',
    ],
  },
  {
    number: 8,
    slug: 'modern-tools-doorway',
    title: 'The Modern Tools and the Doorway',
    summary:
      'The modern register: the cytotaxonomy craft (the chromosome\u2019s number-and-structure honesty — the polyploid complexes priced as the fern-and-angiosperm registers); the numerical taxonomy (the character\u2019s scoring-and-cluster arithmetic — the phenetic honesty against the phylogenetic); the molecular craft (the DNA-barcoding-and-phylogenomics registers — the rbcL-and-matK-and-ITS markers named, the APG\u2019s tree receipts); the biosystematics register (the population-and-reproductive honesty — the breeding-system-and-pollen-craft studies); the conservation register (the red-list craft, the hotspot logic cross-referenced to ecology); and the doorway — the taxonomy held honestly as the library\u2019s index and the field\u2019s grammar: without the name, no experiment repeats; without the tree, no kinship reads; the discipline priced as the quiet foundation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cyto-and-Numerical Crafts',
      'The Molecular Markers',
      'The Biosystematics Honesty',
      'The Quiet Foundation Held',
    ],
  },
]

export const plantTaxonomy: Book = {
  id: 'plant-taxonomy',
  title: 'Plant Taxonomy',
  subtitle: 'The naming and ordering of the plant kingdom — from the algal ancestors to the angiosperm families',
  discipline: 'biology',
  level: 'Undergraduate botany core (the identification-and-systematics register)',
  description: 'The classification discipline: the three crafts held apart and together — the identification (the specimen-to-name craft), the nomenclature (the binomial engine, the type specimen, the priority-and-authority rules, the ICN\u2019s honest governance), the classification itself (the hierarchy\u2019s ranks, the artificial-against-natural-against-phylogenetic history honestly told from Linnaeus\u2019s sexual system through the Engler-Prantl-and-Cronquist arcs to the APG\u2019s molecular tree); the herbarium-and-field craft (the collection-and-pressing discipline, the label\u2019s data honesty, the flora\u2019s use, the botanical survey\u2019s register); the plant kingdom\u2019s survey (the algal line with its divisions\u2019 honesty — the green-and-red-and-brown crafts, the bryophyte\u2019s pteridophyte\u2019s generations\u2019 alternation cross-referenced to genetics, the gymnosperm\u2019s seed-without-fruit-and-cone register, the angiosperm\u2019s flower-and-fruit crown); the angiosperm families register (the magnoliid-and-monocot-and-eudicot arcs, the key families fixed — the Solanaceae-and-Fabaceae-and-Poaceae-and-Brassicaceae-and-Rosaceae-and-Asteraceae-and-Lamiaceae crafts with their diagnostic-and-economic registers); the phylogenetic craft (the clade\u2019s logic cross-referenced to evolution, the molecular markers\u2019 use, the APG-and-ordinal register at survey depth); and the numerical-and-cytotaxonomic tools named with the conservation-and-biosystematics registers priced.',
  status: 'planned',
  accent: ['#0d9488', '#134e4a'],
  chapters,
}
