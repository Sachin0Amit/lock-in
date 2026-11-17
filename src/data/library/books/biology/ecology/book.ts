import type { Book, Chapter } from '../../../types'

/**
 * Ecology — the sixth book of the Biology shelf.
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 34 planned lessons, zero written. Lesson ids will use the `eco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Ecology owns the general environmental register. The botanical lines are cross-referenced to plant-ecology (the vegetation and ecophysiology registers); the human-population and climate-policy registers are priced here as the honest science (the environmental-studies book on the humanities shelf owns the applied-policy register); NEET’s organism-and-population and ecosystem-and-biodiversity units are priced here; the field methods (mark-recapture, quadrats) are owned here as the discipline-and-own craft.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Campbell Biology 12th edition — Unit 8 Ecology (read this pass: the introduction-to-ecology-and-the biosphere, population-ecology, community-ecology, ecosystems-and-restoration chapters) as the spine.
 * - The NCERT class 12 organisms-and-populations, ecosystem and biodiversity-and-conservation chapters as the school ladder.
 * - Odum’s Fundamentals of Ecology named as the university pole (the ecosystem-energy register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'organism-environment',
    title: 'The Organism and Its Environment',
    summary:
      'The individual\u2019s filters: the abiotic register (temperature, water and its availability, light, soil and its chemistry, the fire and wind factors) with each factor\u2019s tolerance curve and its upper-lower limits; the adaptation census (physiological — the kangaroo rat\u2019s water economy, morphological, behavioural); the acclimatisation against adaptation honesty; the biome census at map depth (the tropical forest, savanna, desert with its plant-and-animal receipts, temperate forest, taiga, tundra, the two great water realms — with the aquatic zones from littoral to abyssal); and the climate engine (the latitudinal solar arithmetic, the rain-shadow craft) as the biome maker.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Abiotic Filters',
      'The Adaptation Census',
      'The Biome Map',
      'The Climate Engine as Maker',
      'Ecology and the Environment',
    ],
  },
  {
    number: 2,
    slug: 'population-growth',
    title: 'The Population\u2019s Arithmetic',
    summary:
      'The counting discipline: the census craft (the quadrat and mark-recapture with their arithmetic, the transect); the distribution patterns (clumped — the reality, random and uniform priced); the growth models — exponential (the J-curve\u2019s premise) against logistic (the S-curve with its carrying capacity and the density-dependent honesty); the density-independent shocks (the weather and fire registers); the life-history census (r-strategy against K-strategy with the honest continuum caveat, the survivorship curves\u2019 three shapes); the metapopulation idea (the source-and-sink patchiness); and the human population told straight — the demographic transition, the age-structure pyramids, the carrying-capacity debate.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census Craft and Its Arithmetic',
      'The J against the S',
      'The Life-History Census',
      'The Human Population Told Straight',
      'Population Attributes: Growth, Birth and Death Rates',
    ],
  },
  {
    number: 3,
    slug: 'interactions',
    title: 'The Interaction Census',
    summary:
      'The community\u2019s relationships: competition — the niche concept (the fundamental against the realised), Gause\u2019s principle earned by the Paramecium experiments, the character displacement receipt (Darwin\u2019s finches\u2019 beaks); predation and its defences (the cryptic and warning colour, the mimicry cross-reference, the hunting strategies); herbivory\u2019s plant-defence register (the chemical and the thorn-and-spine, cross-referenced to the plant books); the mutualism census (the pollination, the mycorrhiza, the coral-zooxanthella, the gut flora); and the parasitism register deferred to the parasitology book\u2019s own depth; each interaction priced by its ecological arithmetic, not as storytelling.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Niche and Gause\u2019s Principle',
      'The Predation Defences',
      'The Mutualism Census',
      'The Interaction Arithmetic',
      'Interaction and Interdependence',
    ],
  },
  {
    number: 4,
    slug: 'communities-succession',
    title: 'Communities and Succession',
    summary:
      'The cast and its changes: the community\u2019s measurable properties (species richness, the diversity indices\u2019 craft — Simpson and Shannon at survey depth); the succession register — primary (the bare rock\u2019s lichen beginning) against secondary (the field-to-forest return), the seres\u2019 stages with their tolerance-facilitation-inhibition explanations honestly weighed; the trophic-structure preview (the food chains and webs as the community\u2019s economics — the full energy arithmetic owned two chapters ahead); the island-biogeography theory (the species-area and the equilibrium of arrivals against extinctions, the reserve-design consequence); and the latitudinal diversity gradient named as ecology\u2019s oldest unsolved pattern.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Richness and the Diversity Indices',
      'The Two Successions and Their Stages',
      'The Food Web Preview',
      'The Island Arithmetic and the Reserve Consequence',
    ],
  },
  {
    number: 5,
    slug: 'ecosystem-energy',
    title: 'The Ecosystem\u2019s Energy',
    summary:
      'The one-way flow: the trophic-level architecture (the producers, the consumers\u2019 census, the decomposers as the unsung majority); the 10-percent honesty — why big fierce animals are rare, why food chains stop at four or five links, the pyramid of energy against the inverted pyramids of numbers and biomass; the primary productivity register (the gross against net, the global map — the tropical ocean\u2019s paradox and the land\u2019s tropics-first arithmetic); the ecological efficiency arithmetic; the secondary production and its assimilation craft; and the human appropriation honestly sized (the nearly-third-of-net-production register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Trophic Architecture',
      'The 10-Percent Honesty',
      'The Productivity Map',
      'The Human Appropriation Sized',
    ],
  },
  {
    number: 6,
    slug: 'biogeochemical-cycles',
    title: 'The Matter Cycles',
    summary:
      'The chemistry that keeps returning: the water cycle\u2019s craft (the evaporation-precipitation ledger, the groundwater register and its mining honesty); the carbon cycle (the photosynthesis-respiration balance, the reservoir census — the atmosphere, the ocean\u2019s sink, the rock\u2019s long loop, the fossil fuel\u2019s one-way tap and the Keeling curve\u2019s receipt); the nitrogen cycle (the fixation craft — the nitrogenase engine, the ammonification-nitrification-denitrification ladder, the human Haber doubling priced honestly); the phosphorus sediment trap (the no-atmospheric-phase honesty, the eutrophication receipt); and the acid-rain and ozone-depletion registers told as the chemistry\u2019s applied consequences.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Water Ledger',
      'The Carbon Reservoir Census',
      'The Nitrogen Ladder and the Haber Doubling',
      'The Phosphorus Trap and the Applied Registers',
    ],
  },
  {
    number: 7,
    slug: 'biodiversity-conservation',
    title: 'The Biodiversity and Conservation Register',
    summary:
      'The crisis and the craft: the biodiversity\u2019s three levels (genetic, species, ecosystem) and its value registers (the instrumental, the existence, the ecosystem-service arithmetic); the extinction crisis sized (the current rates against the background, the IUCN red-list craft, the amphibian and pollinator registers); the threats\u2019 census (the HIPPO frame — habitat, invasives, pollution, population, overharvesting); the protected-area craft (the hotspot strategy, the corridor logic, the SLOSS debate named); the restoration register (the mine-to-forest returns, the rewilding idea); and the sustainability honesty — the discipline\u2019s advice against the politics it must not pretend to settle.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Levels and the Value Registers',
      'The Crisis Sized',
      'The HIPPO Census and the Hotspot Craft',
      'The Restoration Register and the Sustainability Honesty',
      'Biosphere Reserves, National Parks, Sanctuaries and Sacred Groves',
    ],
  },
  {
    number: 8,
    slug: 'applied-methods-doorway',
    title: 'The Applied Craft and the Doorway',
    summary:
      'The working register: the field methods census (the quadrat, transect, mark-recapture, the camera-trap and acoustic registers, the remote-sensing idea); the monitoring craft (the time-series honesty, the citizen-science registers — the bird counts as ecology\u2019s oldest crowd); the applied branches (the fisheries\u2019 quotas, the invasive management, the urban ecology register, the climate-adaptation craft — the assisted-migration debate priced); and the doorway — to plant-ecology for the botanical lines, to the environmental-studies book for the policy register, to the microbiology book for the microbial loops; the ecological frame holds: the biosphere as one arithmetic that the next generation must keep honest.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field Methods Census',
      'The Monitoring Craft',
      'The Applied Branches',
      'The Doorway Drawn',
    ],
  },
]

export const ecology: Book = {
  id: 'ecology',
  title: 'Ecology',
  subtitle: 'The biosphere\u2019s architecture — organisms, populations, communities, ecosystems and their conservation',
  discipline: 'biology',
  level: 'Secondary → undergraduate (NEET ecology priced; the ecosystem register at university depth)',
  description: 'The environmental discipline in full: the organism in its habitat (the abiotic filters — temperature, water, light, the tolerance curves); biomes as the climate\u2019s great formations; population ecology — the growth models (exponential and logistic with their carrying-capacity arithmetic), the life-history strategies (r and K), the metapopulation idea, the human population\u2019s demographic transition honestly told; community ecology — the interaction census (competition with the niche and Gause\u2019s principle, predation and its defences, the mutualisms), the succession register, the diversity patterns (island biogeography\u2019s arithmetic, the latitudinal gradient); ecosystem ecology — energy\u2019s one-way flow through trophic levels with the 10-percent honesty, matter\u2019s cycles (carbon, nitrogen, the phosphorus sediment trap), the climate-change register; and conservation — the biodiversity crisis, the protected-area craft, the restoration registers.',
  status: 'planned',
  accent: ['#059669', '#064e3b'],
  chapters,
}
