import type { Book, Chapter } from '../../../types'

/**
 * Environmental Studies — the second book of the Earth branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `evs-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Environmental Studies owns the environment-SOCIETY curriculum (the AEERS/AECC register). The Engineering shelf’s environmental-engineering owns the treatment-plant engineering (the water and wastewater quality and treatment, the air-pollution control equipment — the contract mirrors the engineering pass’s own note); Geography owns the physical geography frame (the climate, the landforms — this book applies them to the human question); the future Biology shelf will own the organismal ecology; the future Economics shelf will own the environmental-economics instruments this book only names.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Erach Bharucha, Textbook of Environmental Studies for Undergraduate Courses (the UGC/AICTE AEERS textbook — the unit structure read this pass: Unit 1 The Multidisciplinary Nature of Environmental Studies; Unit 2 Natural Resources — forest, water, mineral, food, land, energy; Unit 3 Ecosystems; Unit 4 Biodiversity; Unit 5 Pollution; Unit 6 Social Issues and the Environment; Unit 7 Human Population and the Environment; Unit 8 Field Work — the eight-unit / 50-lecture design read via the bgc.ac.in PDF + the books.google record; the 2025 universitiespress.com edition listing also read this pass).
 * - UGC NET Environmental Sciences (code 89 — the updated-syllabus list read this pass at ugcnetonline.in).
 * - The UPSC GS register's environment lines (the GS1 geophysical phenomena line and the preliminary-mains ecology register) as the applied spine; the NCERT environment chapters named as the school bridge.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-multidisciplinary-nature',
    title: 'The Multidisciplinary Nature',
    summary:
      'The discipline\u2019s own introduction: the definition and scope (the environmental studies as the human-environment system\u2019s study — the science and the civics both); the importance (the existential register priced honestly without the doom porn); the multidisciplinary map (the natural sciences\u2019 contributions, the social sciences\u2019, the engineering\u2019s, the law\u2019s — each with its honest slice); the segments\u2019 census (the atmosphere, hydrosphere, lithosphere, biosphere as the four rooms of the house); and the field work\u2019s announcement as the course\u2019s own method (the AEERS\u2019s design).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Definition and the Scope',
      'The Multidisciplinary Map',
      'The Segments\u2019 Census',
      'The Field Work\u2019s Announcement',
    ],
  },
  {
    number: 2,
    slug: 'natural-resources',
    title: 'The Natural Resources',
    summary:
      'The resources\u2019 full ledger: the renewable against the exhaustible (the classification\u2019s honest census); the forest resources (the world\u2019s and India\u2019s, the deforestation\u2019s causes and the case studies\u2019 ledger, the Chipko to the FRA arc priced); the water resources (the fresh 3-percent arithmetic, the dams\u2019 debate priced honestly, the rainwater harvesting\u2019s craft); the mineral and energy resources (the conventional and the non-conventional — the renewables\u2019 Physics shelf cross-reference); the food resources (the world\u2019s hunger\u2019s geography, the green revolution\u2019s cost ledger); the land resources (the degradation\u2019s census, the conservation\u2019s measure); and the sustainable development\u2019s frame (the Brundtland definition as the course\u2019s ethic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Renewable-Exhaustible Census',
      'The Forest and the Water Ledgers',
      'The Energy and the Food Registers',
      'The Sustainable Frame',
    ],
  },
  {
    number: 3,
    slug: 'ecosystems',
    title: 'Ecosystems',
    summary:
      'The living machine\u2019s core: the ecosystem\u2019s concept and structure (the biotic and abiotic; the species, population, community, ecosystem\u2019s ladder); the energy\u2019s flow (the trophic levels\u2019 ladder, the 10-percent law, the ecological pyramid\u2019s three kinds); the food chain and web\u2019s craft (the grazing and detritus chains); the biogeochemical cycles (the carbon, nitrogen, phosphorus, water — each with its human acceleration); the ecosystem types\u2019 census (the terrestrial and aquatic register — the pond, the ocean, the grassland, the forest); and the ecological succession\u2019s arc (the primary and secondary, the climax\u2019s debate).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structure\u2019s Ladder',
      'The Energy\u2019s Flow and the Pyramids',
      'The Biogeochemical Cycles',
      'The Ecosystem Census and the Succession',
    ],
  },
  {
    number: 4,
    slug: 'biodiversity',
    title: 'Biodiversity',
    summary:
      'The variety of life: the concept\u2019s three levels (the genetic, species, ecosystem); the world\u2019s census (the hotspots\u2019 register, the megadiversity countries); India as the megadiverse (the four hotspots, the endemic register, the flagship species\u2019 census — the tiger, elephant, rhino, the Gangetic dolphin); the values (the instrumental against the intrinsic — the ethical register priced); the threats (the HIPPO frame — the habitat, invasive, population, pollution, overharvesting); the conservation\u2019s craft (the in-situ — the protected area network\u2019s tiger reserve-to-biosphere ladder; the ex-situ — the zoo, the gene bank, the cryobank; the acts — the Wildlife Act and the Forest Act\u2019s register; the conventions — the CBD\u2019s trio).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Levels and the Census',
      'India\u2019s Megadiversity',
      'The HIPPO Threats',
      'The Conservation\u2019s Craft and the Acts',
    ],
  },
  {
    number: 5,
    slug: 'pollution',
    title: 'The Pollution Census',
    summary:
      'The effluents\u2019 full register: the air pollution (the pollutants\u2019 census — the criteria six, the smog\u2019s London and Los Angeles types, the indoor\u2019s biomass question, the AQI\u2019s arithmetic with the Indian cities\u2019 honest ledger); the water pollution (the BOD and COD\u2019s craft, the eutrophication\u2019s arc, the Ganga\u2019s case priced honestly); the soil pollution (the pesticides\u2019 Carson register, the fertilisers\u2019 subsidy question); the marine pollution (the plastic\u2019s gyres — the ocean\u2019s own ledger); the noise pollution (the decibel\u2019s arithmetic, the Indian cities\u2019 census); the nuclear hazards and the waste\u2019s census (the solid — the segregation\u2019s craft; the e-waste\u2019s India register; the hazardous — the Bhopal lesson priced); and the control measures\u2019 engineering pointer (the treatment\u2019s machinery cross-referenced to the Engineering shelf\u2019s environmental-engineering book).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Air and the AQI\u2019s Arithmetic',
      'The Water and the Eutrophication',
      'The Soil, Marine and Noise Registers',
      'The Waste\u2019s Census and the Bhopal Lesson',
    ],
  },
  {
    number: 6,
    slug: 'social-issues-and-environment',
    title: 'Social Issues and the Environment',
    summary:
      'The society\u2019s side of the ledger: the population\u2019s equation (the IPAT frame — the impact\u2019s arithmetic); the urbanisation\u2019s environment (the slum\u2019s sanitation, the transport\u2019s emission, the smart city\u2019s promise priced); the equity\u2019s question (the North-South register — the common but differentiated responsibility\u2019s arc, the Kyoto-to-Paris spine with the depth cross-referenced to International Relations); the environmental ethics (the anthropocentric against the ecocentric — the Philosophy book\u2019s cross-reference); the environmental legislation\u2019s India (the EPA\u2019s 1986 frame, the Water and Air Acts, the EIA\u2019s notification and the craft — the public hearing\u2019s role); and the environmental justice\u2019s register (the Bhopal to the Thoothukudi arc priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The IPAT Equation',
      'The Equity\u2019s Question',
      'The Ethics and the Legislation',
      'The Environmental Justice\u2019s Register',
    ],
  },
  {
    number: 7,
    slug: 'human-population-and-health',
    title: 'Human Population and the Environment',
    summary:
      'The human register\u2019s own chapter: the population\u2019s growth curves (the exponential against the logistic — the carrying capacity\u2019s arithmetic); the demographic transition\u2019s environment reading (the consumption\u2019s per-capita as the rich world\u2019s honest problem); the population\u2019s India (the peak\u2019s projection, the stabilisation\u2019s Tamil Nadu against the Bihar register); the health and the environment (the sanitation\u2019s disease ladder, the vector borne\u2019s climate sensitivity, the pandemic\u2019s lessons priced); the HIV/AIDS register (the awareness without the stigma — the craft); and the human rights\u2019 environment (the UGC\u2019s own line — the right to a clean environment priced as the third generation\u2019s right).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Growth Curves and the Capacity',
      'The India\u2019s Population Register',
      'The Health and the Disease Ladder',
      'The Rights\u2019 Environment',
    ],
  },
  {
    number: 8,
    slug: 'field-work-and-doorstep',
    title: 'The Field Work and the Doorstep',
    summary:
      'The course\u2019s own craft and the close: the field work\u2019s method (the AEERS\u2019s eighth unit — the local ecosystem study\u2019s design: the pond or the park or the campus\u2019s own transect; the pollution\u2019s local audit; the visit\u2019s craft — the sewage plant, the landfill, the sanctuary); the project\u2019s writing (the report\u2019s structure with the observation\u2019s honesty); the climate-change agenda\u2019s synthesis (the mitigation-adaptation\u2019s twin register, the net-zero\u2019s arithmetic, the Indian missions\u2019 NAPCC census); the whole course\u2019s synthesis map (the segments to the issues to the acts); and the doorstep — to Geography\u2019s physical frame, to the Engineering shelf\u2019s treatment machinery, to the future Biology shelf\u2019s ecology depth, and to the reader\u2019s own consumption as the environment\u2019s frontier.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field Work\u2019s Method',
      'The Project\u2019s Writing',
      'The Climate Synthesis',
      'The Doorstep: The Reader\u2019s Own Consumption',
    ],
  },
]

export const environmentalStudies: Book = {
  id: 'environmental-studies',
  title: 'Environmental Studies',
  subtitle: 'The environment as curriculum — resources, ecosystems, biodiversity, pollution and the social question',
  discipline: 'humanities',
  level: 'School environmental education → undergraduate AEERS/AECC + UGC-NET Environmental Sciences readiness',
  description: 'The environment\u2019s own curriculum (the UGC\u2019s AEERS design): the multidisciplinary nature first (the definition, scope and importance; the segments\u2019 census — the atmosphere, hydrosphere, lithosphere, biosphere); the natural resources register (the renewable and exhaustible — the forest, water, mineral, food, land and energy resources with the use and over-exploitation\u2019s honest ledger; the conservation\u2019s principles and the sustainable development\u2019s Brundtland frame); the ecosystems\u2019 core (the structure and function, the energy flow\u2019s 10-percent law, the food web\u2019s census, the biogeochemical cycles, the ecosystem types\u2019 register); the biodiversity register (the three levels, India\u2019s megadiversity, the threats and the conservation — in-situ and ex-situ with the acts and conventions); the pollution census (air, water, soil, marine, noise, the nuclear hazards, the solid and e-waste, the hazardous waste; the control measures and the acts); the social issues and the environment (the population\u2019s equation, the urbanisation\u2019s question, the equity\u2019s North-South, the environmental ethics, the legislation and the EIA\u2019s craft); the human population and environment (the growth\u2019s curves, the health register, the rights); the field work\u2019s craft; and the climate-change agenda. Cross-references Geography (the physical frame), the Engineering shelf\u2019s environmental-engineering (the treatment engineering) and hands off to the future Biology shelf\u2019s ecology depth.',
  status: 'planned',
  accent: ['#65a30d', '#166534'],
  chapters,
}
