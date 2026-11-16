import type { Book, Chapter } from '../../../types'

/**
 * Plant Ecology — the thirteenth book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `peco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Plant Ecology owns the botanical lines of the ecological register. The general community-and-ecosystem machinery belongs to ecology (cross-referenced — the sibling views: the general theory there, the botanical reality here); the ecophysiological mechanisms belong to plant physiology; the plant-animal interaction’s evolutionary logic is shared with evolution; the applied-policy register belongs to the environmental-studies book on the humanities shelf; the NCERT-and-NEET organism-and-environment lines are priced at the general level.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kedmon Nachisaka… no — the honest spine: Mauseth’s Botany — the Ecology section (the four-part arc read this pass) as the botanical spine with Odum’s Fundamentals of Ecology (the general register, cross-referenced).
 * - Barbour’s Terrestrial Plant Ecology named as the university pole (the gradient-and-ordination register).
 * - The NCERT class 12 organisms-and-populations chapter as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'autecology',
    title: 'The Plant in Its World',
    summary:
      'The individual\u2019s ecological arithmetic: the niche as the multidimensional tolerance (the Liebig\u2019s-law minimum against the Shelford\u2019s-tolerance-range — the two laws priced by their arithmetic and their limits, the tolerance-curve census per factor: the light\u2019s shade-and-sun plants, the water\u2019s hydrophyte-and-xerophyte register cross-referenced from anatomy, the temperature\u2019s nutrient\u2019s curves); the ecophysiological bridge (the water-use-efficiency-and-C3-C4-CAM economics cross-referenced to plant-physiology — the ecology setting the prices, the physiology computing them); the acclimation-against-adaptation honesty; and the niche\u2019s realised-against-fundamental distinction held once for the whole register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Laws and Their Limits',
      'The Tolerance-Curve Census',
      'The Ecophysiological Bridge',
      'The Two Niches Held',
    ],
  },
  {
    number: 2,
    slug: 'plant-populations',
    title: 'The Plant Populations',
    summary:
      'The plant\u2019s demography — different from the animal\u2019s: the modular honesty (the plant\u2019s growth by iteration rather than by size — the genet-and-ramet distinction, the clonal-and-herb-against-woody censuses); the life-cycle register (the seed\u2019s bank-and-dispersal crafts, the recruitment\u2019s bottleneck honesty, the size-dependent-fecundity arithmetic); the population\u2019s models (the matrix model\u2019s stage-against-age classification honesty — the plant\u2019s size-as-the state register priced as the discipline\u2019s own arithmetic); the metapopulation register (the patch-colonisation-and-extinction ledger); the mating\u2019s demographic (the density-and-pollen-limitation honesty); and the population-and-genetic register cross-referenced to plant-genetics (the local-adaptation receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Modular Honesty',
      'The Seed\u2019s Bank-and-Recruitment',
      'The Stage-Classified Arithmetic',
      'The Metapopulation Ledger',
    ],
  },
  {
    number: 3,
    slug: 'succession',
    title: 'The Succession Register',
    summary:
      'The community\u2019s botanical change: the primary succession\u2019s arc (the bare-rock-and-lava-and-sand-dune beginnings — the pioneer\u2019s nitrogen-and-substrate crafts, the crust\u2019s herb\u2019s stages, the habitat\u2019s tolerance\u2019s engines honestly weighed); the secondary succession\u2019s receipts (the old-field\u2019s glacial-chronosequence arcs, the fire\u2019s flood\u2019s returns with their species\u2019 tricks — the fire\u2019s seed-and-cone craft priced); the Clements-against-Gleason debate told straight (the superorganism\u2019s organism against the individualistic\u2019s association — the modern synthesis honestly priced toward the gradient-and-stochastic registers); the facilitation-tolerance-and-inhibition models walked on the dune\u2019s face; and the climax-and-equilibrium honesty (the patch-dynamics-and-nonequilibrium registers as the current view).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Primary Arc on the Dune\u2019s Face',
      'The Secondary Receipts',
      'The Debate Told Straight',
      'The Nonequilibrium Honesty',
    ],
  },
  {
    number: 4,
    slug: 'vegetation-census',
    title: 'The Vegetation Census',
    summary:
      'The community\u2019s measurement: the phytosociological craft (the quadrat\u2019s minimal-area honesty, the frequency-dominant-and-cover measures — the Braun-Blanquet\u2019s ordinal honesty against the precision\u2019s arithmetic); the gradient-and-community debate (the continuity against the discrete — the ordination\u2019s ordinate-and-classify crafts priced as complementary); the Raunkiaer life-form census (the phanerophyte-chamaephyte-hemicryptophyte-geophyte-therophyte register as the climate\u2019s receipt — the biological-spectrum arithmetic priced on a real flora); the biome-and-botanical register (the tundra\u2019s taiga\u2019s grassland\u2019s rainforest-and-structural census cross-referenced to ecology); and the world\u2019s vegetation mapped (the Whittaker\u2019s India\u2019s registers — the Himalayan-and-Western-Ghats arcs named with their endemism honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quadrat and Its Minimal Area',
      'The Ordination-and-Classification Crafts',
      'The Raunkiaer Receipt',
      'The World Mapped with Its Endemism',
    ],
  },
  {
    number: 5,
    slug: 'mutualisms',
    title: 'The Mutualism Register',
    summary:
      'The partnership\u2019s census: the pollination register (the syndrome census — the bee\u2019s beetle\u2019s fly\u2019s bird\u2019s bat\u2019s syndromes priced by their floral matches, the deception\u2019s orchid\u2019s craft, the generalisation-against-specialisation debate honestly held); the dispersal register (the fruit-and-syndrome census — the bird\u2019s mammal\u2019s ant\u2019s-elaiosome crafts, the seed\u2019s shadow arithmetic); the protection markets (the ant-plant\u2019s domatium-and-Beltian-body crafts, the extraflactal-nectar register); the mycorrhiza\u2019s network (the common-mycelium-and-the wood-wide-web honesty priced — the carbon\u2019s-sharing receipts and their controversies told straight); the nitrogen\u2019s symbioses cross-referenced to plant-physiology; and the mutualism\u2019s instability honesty (the cheater\u2019s register, the mutualism-antagonism\u2019s continuum) — the partnerships priced by their arithmetic, not by their sentiment.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pollination Syndromes and Deceptions',
      'The Dispersal Syndromes',
      'The Protection Markets',
      'The Network Honesty and Its Controversies',
    ],
  },
  {
    number: 6,
    slug: 'global-change',
    title: 'The Global Register',
    summary:
      'The plant cover\u2019s planetary engine: the plant\u2019s biogeochemical crown (the carbon\u2019s primary-production engine cross-referenced to ecology — the vegetation as the carbon\u2019s pump-and-store arithmetic); the nitrogen\u2019s phosphorus\u2019 plant registers (the root\u2019s-foraging-and-mycorrhiza crafts, the leaf\u2019s-economics spectrum named at survey depth); the global-change register (the CO2\u2019s-fertilisation-and-its-limit honesty, the warming\u2019s phenological-and-range receipts — the fingerprint register, the drought\u2019s fire\u2019s regimes, the nitrogen\u2019s-deposition, the land\u2019s-cover change); the invasion register (the Enemy-release-and-novel-weapons-and-EICA hypotheses priced as hypotheses, the invader-and-traits census, the management\u2019s removal-and-restoration crafts); and the palaeovegetation honesty (the pollen\u2019s-core-and-CO2\u2019s-history registers) — the global register priced as the planet\u2019s governing cover.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Plant\u2019s Biogeochemical Crown',
      'The Global-Change Receipts',
      'The Invasion\u2019s Hypotheses Held',
      'The Palaeo Honesty',
      'Vegetation Types of the World and the Indian Biogeographical Zones',
      'Ecology and the Environment',
    ],
  },
  {
    number: 7,
    slug: 'methods-analysis',
    title: 'The Methods and the Analysis Craft',
    summary:
      'The working tools: the census craft (the quadrat\u2019s transect\u2019s point-intercept registers with their arithmetic, the vegetation\u2019s remote-sensing idea — the NDVI\u2019s green index named); the experiment\u2019s craft (the removal-and-addition experiments, the transplant-and-reciprocal-garden receipts — the local-adaptation proof, the rain\u2019s-manipulation-and-warming experiments named); the analysis craft (the ordination\u2019s PCA-and-DCA-and-CCA registers named at survey depth, the diversity\u2019s-index arithmetic cross-referenced to ecology, the population\u2019s-matrix-and-transition census); the model register (the gap-and-IBMs named as the forest\u2019s population\u2019s simulators); and the statistical honesty (the pseudoreplication-and-scale traps priced — the plant\u2019s ecology held as an experimental discipline, not as storytelling).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census and Its Arithmetic',
      'The Removal-and-Transplant Receipts',
      'The Ordination Register Named',
      'The Statistical Honesty Held',
    ],
  },
  {
    number: 8,
    slug: 'conservation-restoration-doorway',
    title: 'The Conservation and the Doorway',
    summary:
      'The applied botanical duty: the threat\u2019s register (the habitat\u2019s loss-and-overharvest-and-invasion crafts, the extinction\u2019s debt honesty); the plant-and-conservation census (the IUCN\u2019s-red-list craft priced on real Indian-and-global cases, the in-situ\u2019s ex-situ\u2019s registers — the protected-area-and-seed-bank crafts, the CWR-and-landraces registers named at survey depth); the restoration\u2019s craft (the reference\u2019s-community honesty, the successional-and-assisted registers, the invasive\u2019s-control arithmetic, the restoration-and-monitoring craft); the rewilding-and-assisted-migration debates priced honestly; and the doorway — to the ecology book for the general theory, to the environmental-studies book for the policy register, to plant-taxonomy for the names, to plant-genetics for the diversity\u2019s arithmetic; the botanical world held as the biosphere\u2019s quiet foundation: the cover that holds the soil, feeds the animals, and sets the carbon\u2019s dial.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Threat and the Debt Honesty',
      'The Two Sitsu Registers Priced',
      'The Restoration\u2019s Craft',
      'The Quiet Foundation Held',
    ],
  },
]

export const plantEcology: Book = {
  id: 'plant-ecology',
  title: 'Plant Ecology',
  subtitle: 'The plant in its world — populations, vegetation, mutualisms and the global plant cover',
  discipline: 'biology',
  level: 'Undergraduate ecology (the botanical lines of the general ecology register)',
  description: 'The ecological discipline-and-botanical register: the autecology frame (the plant\u2019s niche as the multidimensional tolerance craft — the Liebig-and-Shelford laws priced by their arithmetic, the ecophysiological registers of the photosynthetic-and-water economics cross-referenced to plant physiology); the population register (the modular-and-clonal growth honesty — the genet-and-ramet distinction, the demography\u2019s seed-and-adult crafts, the seed bank\u2019s soil memory, the metapopulation\u2019s patch dynamics); the community register (the succession\u2019s botanical arc — the Clements-against-Gleason debate honestly told, the facilitation-tolerance-inhibition models, the old-field-and-glacial chronosequences as the receipts); the vegetation census (the phytosociological craft of the quadrat-and-frequency-dominant measures, the gradients\u2019 ordination honesty against the discrete-community claim, the biome register cross-referenced to ecology with the plant\u2019s structural forms — the Raunkiaer life-form census as the climate\u2019s receipt); the mutualism register (the pollination\u2019s syndrome-and-deception census, the dispersal-and-syndrome craft, the ant-plant-and-protection markets, the mycorrhiza\u2019s networks-and-wood-wide-web honesty priced); the global register (the world\u2019s India\u2019s vegetation mapped, the invasion\u2019s Enemy-release-and-novel-weapons hypotheses, the carbon-and-nitrogen cycles\u2019 plant engines cross-referenced); the methods-and-analysis craft (the quadrat-and-transect-and-removal-experiment registers, the ordination-and-classification tools named); and the conservation-and-restoration registers priced as the applied botanical duty.',
  status: 'planned',
  accent: ['#059669', '#022c22'],
  chapters,
}
