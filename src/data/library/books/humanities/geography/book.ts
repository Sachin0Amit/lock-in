import type { Book, Chapter } from '../../../types'

/**
 * Geography — the first book of the Earth branch (absorbs the backlog’s Physical Geography and Human Geography lines — the Certificate pair).
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 12 chapters /
 * 54 planned lessons, zero written. Lesson ids will use the `geog-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Geography owns the earth’s whole survey — physical and human in one volume (the backlog’s two folded lines, the Goh Cheng Leong design). Environmental Studies owns the ecological-curriculum register (the pollution and conservation’s human dimension — this book teaches the physical frame, that book the environment-society curriculum); the Engineering shelf’s water-resources-engineering owns the applied water census (dams, irrigation, hydrology’s engineering); the Mathematics shelf owns the projection and survey mathematics (cross-referenced); the UPSC Geography optional and the AP Human Geography register are the two exam spines; Indian History and Sociology cross-reference for the India register’s human content.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Goh Cheng Leong, Certificate Physical and Human Geography (the FULL OUP India contents read this pass: PART 1 PHYSICAL GEOGRAPHY — The Earth and the Universe; The Earth's Crust; Volcanism and Earthquakes; Weathering, Mass Movement and Erosion; the climatology, oceanography and biogeography chapters; PART 2 WEATHER CLIMATE AND VEGETATION; PART 3 HUMAN GEOGRAPHY — population, settlements and the economic register; the 25-chapter / 7-part structure) — india.oup.com/product/certificate-physical-and-human-geography-9789354975660.
 * - NCERT Fundamentals of Physical Geography class 11 (the chapter list read this pass — Geography as a Discipline; The Origin and Evolution of the Earth; Interior of the Earth; Distribution of Oceans and Continents; Geomorphic Processes; Landforms and their Evolution; Composition and Structure of the Atmosphere; Water in the Atmosphere; World Climate and Climate Change; Water Oceans; Movements of Ocean Water — kegy2ps.pdf at ncert.nic.in + the jagranjosh chapter list) + India Physical Environment class 11 (kegy1ps.pdf opened this pass) + Fundamentals of Human Geography class 12 (legy101.pdf — Human Geography: Nature and Scope; The World Population; Human Development; the Primary/Secondary/Tertiary activities; Transport and Communication; International Trade — the hitbullseye chapter list read this pass).
 * - The UPSC Geography optional register (read this pass — drishtiias.com/upsc-optional-subjects/geography: Paper I Principles — Geomorphology (factors controlling landform development; endogenetic and exogenetic forces), Climatology, Oceanography, Biogeography, the human-geography perspectives, Economic Geography, Regional Planning; Paper II the Geography of India).
 * - AP Human Geography (the seven-unit register read this pass — apstudents.collegeboard.org: Thinking Geographically; Population and Migration; Cultural Patterns; Political Patterns; Agriculture and Rural Land-Use; Cities and Urban Land-Use; Industrial and Economic Development) as the world-exam spine.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-geographic-eye',
    title: 'The Geographic Eye',
    summary:
      'The discipline\u2019s own craft: geography as the earth\u2019s description and explanation (the systematic against the regional approach, the physical-human-technicist triad); the map\u2019s craft (the scale, the projection\u2019s honest census — the Mercator\u2019s distortion priced, the equal-area alternatives; the symbols and the toponyms); the globe\u2019s grid (the latitude and longitude, the time\u2019s arithmetic — the IST\u2019s own +5:30 explained); the map reading\u2019s exercise register; and the geographic tools\u2019 modern census (the GIS and the remote sensing named with the surveyor\u2019s cross-reference to the Engineering shelf\u2019s geomatics book).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Discipline\u2019s Craft',
      'The Map and Its Projections',
      'The Grid and the Time\u2019s Arithmetic',
      'The Modern Tools\u2019 Census',
      'Emerging Areas',
      'Unit 1: Thinking Geographically',
    ],
  },
  {
    number: 2,
    slug: 'earth-and-its-structure',
    title: 'The Earth and Its Structure',
    summary:
      'The planet\u2019s anatomy: the origin and evolution (the nebular hypothesis to the plate frame); the interior\u2019s evidence (the seismic waves\u2019 honest inference — the crust, mantle, core); the distribution of the oceans and the continents (the continental drift\u2019s Wegener story to the seafloor spreading\u2019s confirmation); the plate-tectonic engine (the boundaries\u2019 census — the divergent, convergent, transform; the hotspots); the rocks\u2019 cycle (the igneous, sedimentary, metamorphic); the earthquakes and volcanism\u2019s world register (the Ring of Fire; the Indian seismic zones); and the geologic time\u2019s honest calendar.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Interior\u2019s Inference',
      'The Plate Engine',
      'The Rocks\u2019 Cycle',
      'The Shakes and the Fires\u2019 Register',
      'Geomorphology, Climatology, Oceanography and Biogeography',
    ],
  },
  {
    number: 3,
    slug: 'landforms',
    title: 'The Landforms',
    summary:
      'The surface\u2019s sculpture: the weathering and mass movement\u2019s register (the physical, chemical, biological; the landslides\u2019 Indian census); the fluvial landforms\u2019 full arc (the drainage\u2019s patterns, the valleys\u2019 stages, the deltas and the meanders); the glacial and periglacial register (the cirques and the moraines); the aeolian (the dunes\u2019 census, the loess); the karst (the limestone\u2019s dissolution — the Indian caves); and the coastal (the waves\u2019 work — the stacks, the bars, the coral).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Weathering Register',
      'The Fluvial Arc',
      'The Glacial and the Aeolian Registers',
      'The Karst and the Coastal Registers',
    ],
  },
  {
    number: 4,
    slug: 'climate',
    title: 'The Climate',
    summary:
      'The atmosphere\u2019s engine: the composition and structure (the layers\u2019 census); the radiation and heat budget (the net balance\u2019s arithmetic); the pressure and wind belts\u2019 system (the Hadley-Ferrel-Polar cells, the monsoon\u2019s own engine priced at depth — the Indian monsoon\u2019s onset, burst, break and withdrawal); the humidity and precipitation\u2019s forms; the world climate\u2019s classification (the Koppen census); the climate change\u2019s honest register (the anthropogenic evidence, the IPCC arc, the Indian vulnerability and missions); and the El Nino-Southern Oscillation\u2019s global wire.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Atmosphere\u2019s Engine',
      'The Wind Belts and the Monsoon',
      'The World Climate Census',
      'The Change\u2019s Honest Register',
    ],
  },
  {
    number: 5,
    slug: 'oceans',
    title: 'The Oceans',
    summary:
      'The water world: the ocean floor\u2019s anatomy (the shelf, slope, abyss, trench; the seafloor spreading\u2019s written record); the temperature and salinity\u2019s world maps (the thermocline\u2019s layer); the waves, tides and currents\u2019 register (the spring-neap arithmetic; the gyres and the conveyor — the Gulf Stream\u2019s western margin effect); the ocean\u2019s resources (the fisheries, the minerals, the energy); and the ocean\u2019s role in the climate\u2019s regulation with the sea-level\u2019s change question priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Floor\u2019s Anatomy',
      'The Temperature and Salinity Maps',
      'The Waves, Tides and Currents',
      'The Resources and the Regulation',
    ],
  },
  {
    number: 6,
    slug: 'soils-and-biomes',
    title: 'The Soils and the Biomes',
    summary:
      'The earth\u2019s living skin: the soil\u2019s genesis (the factors\u2019 Jenny frame; the horizons\u2019 profile); the soil\u2019s world census (the zonal, intrazonal, azonal — the laterite, the podzol, the chernozem; the Indian soils\u2019 twelve-register with the alluvial, black, red, laterite and the desert); the vegetation\u2019s world biomes (the equatorial to the tundra\u2019s transect); the wildlife and the conservation\u2019s register (the Indian parks and the Project Tiger\u2019s arc — with the ecological depth handed to Environmental Studies).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Soil\u2019s Genesis and Profile',
      'The Indian Soils\u2019 Register',
      'The Biomes\u2019 Transect',
      'The Conservation Register',
    ],
  },
  {
    number: 7,
    slug: 'population-and-migration',
    title: 'Population and Migration',
    summary:
      'The human half begins: the human geography\u2019s nature and scope (the environmental determinism against the possibilism debate priced); the world population\u2019s distribution and density (the why of the empty quarters and the teeming plains); the population\u2019s growth and the demographic transition\u2019s model (the demographic dividend\u2019s window priced — the GS1 line); the migration\u2019s register (the push-pull frame, the world\u2019s corridors, the Indian internal migration\u2019s census); and the human development\u2019s index (the UNDP\u2019s register — the Economics shelf\u2019s future cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Human Geography\u2019s Scope',
      'The Distribution\u2019s Why',
      'The Transition and the Dividend',
      'The Migration Register',
      'I 3. Economic Organization (formalist-substantivist Debate; Principles Of',
    ],
  },
  {
    number: 8,
    slug: 'settlements-and-landscapes',
    title: 'Settlements and the Landscapes',
    summary:
      'The human earth\u2019s patterns: the settlements\u2019 census (the rural — the patterns and types; the urban — the morphology, the urbanisation\u2019s world curve with the GS1 problems-and-remedies line cross-referenced to Sociology); the cultural landscapes (the language and religion\u2019s geographies, the folk and popular cultures\u2019 register — the AP Human Geography units priced); the political geography (the state\u2019s shape and boundaries, the electoral geography named, the geopolitics\u2019 honest glance); and the cities\u2019 land-use models (the concentric, sector, multiple-nuclei census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Settlements\u2019 Census',
      'The Cultural Landscapes',
      'The Political Geography',
      'The Cities\u2019 Models',
    
      'Geographical Techniques'
    ],
  },
  {
    number: 9,
    slug: 'economic-geography',
    title: 'The Economic Geography',
    summary:
      'The world\u2019s work: the primary activities (the agriculture\u2019s world patterns — the shifting, plantation, dairy, grain\u2019s registers; the fishing and the mining); the secondary (the industry\u2019s location theories — the Weber\u2019s least-cost and the footloose\u2019s counter-census; the world\u2019s industrial regions); the tertiary and beyond (the transport\u2019s modes and corridors, the communication\u2019s shrinking, the international trade\u2019s blocs); the resources\u2019 distribution (the GS1 line — the minerals, energy, forests, water across the world with the South Asian depth); and the development\u2019s geography (the north-south question priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Primary Activities',
      'The Industry\u2019s Location Theories',
      'The Transport and the Trade',
    ],
  },
  {
    number: 10,
    slug: 'india-physical',
    title: 'India: The Physical Environment',
    summary:
      'The Indian frame: the location and the neighbours\u2019 arithmetic; the physiographic divisions\u2019 full register (the Himalayan system\u2019s three, the Indus-Ganga-Brahmaputra plain, the peninsula\u2019s provinces, the coastal strips, the islands); the drainage\u2019s census (the Himalayan and peninsular rivers\u2019 contrasting regimes; the river disputes priced honestly as geography); the climate\u2019s Indian register (the monsoon\u2019s mechanics from chapter four applied; the cyclones\u2019 coasts); the natural vegetation and the soils\u2019 Indian register; and the hazards\u2019 census (the seismic, the flood, the drought, the landslide — the GS1 geophysical phenomena line carried in full).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Physiographic Divisions',
      'The Drainage\u2019s Contrasting Regimes',
      'The Indian Monsoon Applied',
      'The Hazards\u2019 Census',
    ],
  },
  {
    number: 11,
    slug: 'india-human-and-economic',
    title: 'India: The Human and Economic Register',
    summary:
      'The Indian human geography: the population\u2019s census (the density and distribution, the growth\u2019s curve, the urbanisation\u2019s 31-percent story); the resources\u2019 Indian register (the land, the water, the energy, the minerals\u2019 maps); the agriculture\u2019s Indian register (the cropping seasons and patterns, the Green Revolution\u2019s geography, the food security question); the industries\u2019 census (the old and the new — the software\u2019s southward tilt priced); the transport\u2019s Indian network (the railways\u2019 gauge story, the golden quadrilateral); and the regional development\u2019s question (the planning\u2019s arc and the disparities\u2019 honest map).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Population\u2019s Census',
      'The Resources\u2019 Indian Register',
      'The Agriculture and the Industries',
      'The Transport and the Regional Question',
      'Indian Economy and Economic Development - issues relating to planning, mobilisation of resources, growth, development and employment; inclusive growth; government budgeting; effects of liberalisation on the economy; infrastructure (energy, ports, roads, airports, railways); investment models',
      'Planning And Economic Development - Nehruvian And Gandhian Perspectives;',
      'Ii 6. Tribal Situation In India (bio-genetic Variability And',
    ],
  },
  {
    number: 12,
    slug: 'synthesis-and-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The whole volume\u2019s close: the map sense\u2019s synthesis (the world and India\u2019s mental maps — the reader\u2019s own atlas habit as the assignment); the current geography\u2019s thread (the places in the news as the living text); the geography\u2019s contribution to the general studies register (the GS1 lines\u2019 whole map); and the doorstep — to Environmental Studies for the ecological register, to the Engineering shelf\u2019s water-resources book for the applied water census, to Anthropology for the human register\u2019s comparative depth, and to the reader\u2019s own journeys as the field work.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map Sense\u2019s Synthesis',
      'The Current Geography\u2019s Thread',
      'The GS Register\u2019s Whole Map',
      'The Doorstep: The Reader\u2019s Own Atlas',
    ],
  },
]

export const geography: Book = {
  id: 'geography',
  title: 'Geography',
  subtitle: 'The whole earth in one volume — landforms, climate, oceans, people and the economic world',
  discipline: 'humanities',
  level: 'Secondary school geography → university survey + UPSC (Geography optional, GS-I lines)/AP Human Geography readiness',
  description: 'The earth\u2019s full survey with the human half in the same volume (the Certificate arc\u2019s own design). The geographic eye first (geography as a discipline, the map\u2019s craft, the grid); the physical core — the earth\u2019s structure and the plate-tectonic engine, the geomorphic processes and the landforms\u2019 census, the atmosphere and the climate\u2019s world with its change honestly priced, the oceans\u2019 register, the soils and the biomes; then the human half — the population and migration\u2019s register, the settlements and the cultural-political landscapes, the economic geography (agriculture, industry, transport and trade, the resources\u2019 distribution); then the Indian spine (the physical environment, the drainage, the population, the resources, the agriculture-industry-transport register); and the synthesis with the doorstep. Cross-references Environmental Studies (the ecological register), Anthropology (the human register) and hands off to the Engineering shelf\u2019s water-resources book for the applied water census and to the reader\u2019s own map sense.',
  status: 'planned',
  accent: ['#059669', '#047857'],
  chapters,
}
