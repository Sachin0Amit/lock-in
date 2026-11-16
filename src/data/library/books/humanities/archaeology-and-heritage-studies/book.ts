import type { Book, Chapter } from '../../../types'

/**
 * Archaeology and Heritage Studies — the first book of the Culture & Past branch (absorbs the backlog’s Heritage Studies line).
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `arch-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Archaeology and Heritage Studies owns the material past’s craft and its keeping. Indian History owns the narrative register (the two cross-reference — this book supplies the evidence’s discipline, that book the story it tells); Art History owns the object’s aesthetic and stylistic register (the two cross-reference at the sculpture and architecture lessons); the UGC NET Archaeology (code 67) and Museology and Conservation (code 66) registers are the exam spine; the Anthropology book owns the deep human past’s biological frame (the two share the Palaeolithic, the archaeology side owning the stone’s typology).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Renfrew & Bahn, Archaeology: Theories, Methods and Practice (the chapter arc read this pass via the discovered.ed.ac.uk library record: The Searches — the history of archaeology; What Is Left? — the variety of the evidence; Where? — survey and excavation of sites and features; When? — dating methods and chronology; the social/environmental/cognitive reconstruction chapters; the explanation-of-change arc) — the Thames & Hudson editions register (the amazon/jstor records read this pass).
 * - UGC NET Archaeology (code 67) and Museology & Conservation (code 66) — the updated-syllabus list read this pass at ugcnetonline.in.
 * - The Indian register: the ASI's own founding arc (the Cunningham century) and the Indian archaeology's standard university registers named as the poles; the Epigraphia Indica and the ancient inscriptions' decipherment craft named.
 * - The UPSC History optional's sources line (the archaeological sources — exploration, excavation, epigraphy, numismatics, monuments — read this pass in the register) as the applied spine.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-searches',
    title: 'The Searches',
    summary:
      'The discipline\u2019s own history: the antiquarian\u2019s cabinet (the treasure hunt\u2019s age priced honestly); the antiquity\u2019s three ages (the C.J. Thomsen\u2019s Copenhagen triad as the method\u2019s first act); the scientific turn (the Pitt Rivers\u2019 typology, the Petrie\u2019s sequence dating, the Wheeler\u2019s grid at Maiden Castle and Arikamedu); the Indian story\u2019s full arc (the Asiatic Society\u2019s 1784 founding, Jones\u2019s Sanskrit discovery, Cunningham\u2019s 1861 ASI and the Bharhut-Sanchi-Bodh Gaya pilgrimages, Marshall\u2019s Mohenjo-daro moment, Wheeler\u2019s partition of the register, the Independent ASI\u2019s marine and exploration wings); and the archaeology\u2019s identity question — a humanity, a science, or the two\u2019s bridge.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'From the Cabinet to the Method',
      'The Indian Story\u2019s Full Arc',
      'The Identity Question',
    ],
  },
  {
    number: 2,
    slug: 'the-evidence',
    title: 'The Evidence',
    summary:
      'What the past actually leaves: the formation processes (the cultural against the natural — Schiffer\u2019s register; the taphonomy of the organic); the survival\u2019s bias priced honestly (the stone\u2019s luck against the textile\u2019s ruin — what the record can and cannot say); the evidence\u2019s census (the artefact — the portable made thing; the ecofact — the seed and bone; the feature — the hearth and wall; the site and the landscape as the scales of evidence); the context\u2019s sanctity (the provenience against the provenance — the looted object\u2019s information death priced); and the typology\u2019s craft (the type\u2019s definition, the seriation\u2019s curve).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Formation Processes',
      'The Survival\u2019s Bias',
      'The Evidence\u2019s Census',
      'The Context\u2019s Sanctity and the Typology',
    ],
  },
  {
    number: 3,
    slug: 'survey-and-excavation',
    title: 'Survey and Excavation',
    summary:
      'The finding and the digging: the site\u2019s discovery (the surface survey\u2019s walking register, the fieldwalking\u2019s grid; the aerial and satellite photography\u2019s marks — the cropmarks and soilmarks; the remote sensing\u2019s instruments — the LiDAR\u2019s forest-penetrating census); the geophysical prospecting (the magnetometer, resistivity and ground-penetrating radar\u2019s non-invasive craft); the excavation\u2019s discipline (the site grid, the Harris matrix as the stratigraphy\u2019s logic, the context\u2019s recording sheets, the section and plan drawing\u2019s craft, the sieving and flotation\u2019s recovery); the underwater archaeology\u2019s own craft (the marine\u2019s ethics — the cargo against the grave); and the excavation\u2019s ethics (the destructive question — to dig is to destroy, priced as the discipline\u2019s own conscience).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Site\u2019s Discovery',
      'The Geophysical Craft',
      'The Excavation\u2019s Discipline',
      'The Underwater Register and the Ethics',
    ],
  },
  {
    number: 4,
    slug: 'when-dating',
    title: 'When? The Dating Engine',
    summary:
      'The time\u2019s measurement: the relative methods\u2019 census (the stratigraphy\u2019s superposition law; the typology\u2019s cross-dating; the sequence\u2019s seriation); the absolute\u2019s radiometric family (the radiocarbon\u2019s 14C arithmetic — the half-life\u2019s craft, the calibration\u2019s tree-ring correction, the AMS\u2019s small-sample revolution; the potassium-argon and the uranium series\u2019 older registers); the trapped-charge family (the thermoluminescence — the pottery\u2019s own clock; the optically stimulated luminescence — the sediment\u2019s; the electron spin resonance); the dendrochronology\u2019s master curve; and the calendar\u2019s assembly (the Bayesian modelling of the radiocarbon\u2019s plateaus priced at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Relative Census',
      'The Radiocarbon\u2019s Arithmetic',
      'The Trapped-Charge Family',
      'The Calendar\u2019s Assembly',
    ],
  },
  {
    number: 5,
    slug: 'reading-the-record',
    title: 'Reading the Record',
    summary:
      'The reconstruction\u2019s craft: the social archaeology (the rank and status from the burial\u2019s goods — the cemetery\u2019s statistics; the household\u2019s archaeology; the gender\u2019s archaeology register); the environmental archaeology (the palaeoethnobotany — the flotation\u2019s seeds and the agriculture\u2019s arrival; the zooarchaeology — the kill site and the herd\u2019s census; the palynology\u2019s core; the seasonality\u2019s reading); the diet and subsistence\u2019s craft (the isotope\u2019s bone chemistry — the weaning\u2019s weaning read in the enamel; the calculus\u2019s microfossils named); the trade and exchange (the sourcing\u2019s methods — the XRF\u2019s obsidian and the clay\u2019s fingerprint, the distribution map\u2019s argument); and the experimental and ethnoarchaeology\u2019s registers (the flintknapping\u2019s lesson, the Binford\u2019s Nunamiut frame).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Social Archaeology',
      'The Environmental Craft',
      'The Diet and the Trade',
      'The Experimental and Ethno Registers',
    ],
  },
  {
    number: 6,
    slug: 'the-theory-register',
    title: 'The Theory Register',
    summary:
      'The explanation\u2019s own debate: the culture-historical archaeology (the Childe\u2019s epochs — the neolithic and urban revolutions priced as the theory\u2019s first achievement; the culture\u2019s normative concept); the processual archaeology (the Binford\u2019s New Archaeology — the law-seeking claim, the systemic frame, the hypothesis-testing\u2019s method; the middle-range theory\u2019s honest census); the post-processual answer (the Hodder\u2019s reading — the meaning\u2019s return, the agency and the structure, the cognitive archaeology\u2019s register); the explanation of change (the external diffusion against the internal innovation — the migration\u2019s ghost honestly retired); and the archaeological theory\u2019s present state (the plurality priced as the discipline\u2019s own honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Culture-Historical Age',
      'The Processual Claim',
      'The Post-Processual Answer',
      'The Change\u2019s Explanation',
    ],
  },
  {
    number: 7,
    slug: 'the-indian-record',
    title: 'The Indian Record',
    summary:
      'The subcontinent\u2019s own material past: the Palaeolithic\u2019s stations (the Soan and the Attirampakkam\u2019s ages — the handaxe\u2019s census); the Mesolithic\u2019s microlithic and the Bhimbetka\u2019s painted shelters; the Neolithic-Chalcolithic\u2019s villages (the Mehrgarh\u2019s long sequence — the agriculture\u2019s arrival in the subcontinent); the Harappan\u2019s excavation story in full (the Marshall\u2019s 1924 announcement, the Dales\u2019s vs the Wheeler\u2019s readings, the post-Independence\u2019s Bagasra-to-Rakhigarhi expansion, the scripting question\u2019s honest state); the megalithic south (the iron\u2019s arrival and the burial types); the early-historical cities (the NBPW\u2019s strata at Arikamedu and Hastinapura\u2019s debate — the S.P. Gupta and B.B. Lal\u2019s Purana Quila arc); and the epigraphy and numismatics\u2019 craft (the Ashokan decipherment\u2019s story — Prinsep\u2019s 1837 moment; the script\u2019s census — Brahmi and Kharoshthi; the coin\u2019s register from the punch-marked to the Gupta dinar).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Palaeolithic to the Neolithic Arc',
      'The Harappan\u2019s Excavation Story',
      'The Megalithic and the Early-Historical Cities',
      'The Epigraphy and Numismatics Craft',
    ],
  },
  {
    number: 8,
    slug: 'the-heritage-keeping',
    title: 'The Heritage Keeping',
    summary:
      'The past\u2019s care as its own discipline: the heritage\u2019s definition (the tangible — the monument, site, object; the intangible — the practice, knowledge, performance; the natural against the cultural; the authenticity and integrity\u2019s criteria); the museology\u2019s craft (the museum\u2019s history from the cabinet to the public trust; the collection\u2019s ethics — the acquisition\u2019s proof; the curation\u2019s craft — the interpretation and the display\u2019s design; the conservation\u2019s science — the stone, metal, textile and paper\u2019s own chemistry; the IPM\u2019s pest register); the site management (the visitors\u2019 carrying capacity, the buffer zones, the risk preparedness); and the legal frame (the AMASR Act\u2019s monument\u2019s definition, the UNESCO\u2019s 1972 convention and the world heritage\u2019s inscription — the Indian list\u2019s forty-plus register; the 2003 intangible convention\u2019s Indian inventory).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Heritage\u2019s Definition',
      'The Museology\u2019s Craft',
      'The Site\u2019s Management',
      'The Legal Frame and the World Heritage',
    ],
  },
  {
    number: 9,
    slug: 'ethics-public-doorstep',
    title: 'The Ethics, the Public and the Doorstep',
    summary:
      'The discipline\u2019s conscience and the close: the archaeological ethics (the antiquities\u2019 trade and the loot\u2019s links to the record\u2019s destruction priced honestly; the repatriation\u2019s debate — the Kohinoor and the Amaravati marbles\u2019 questions priced as the living arguments; the excavator\u2019s ethics — the publication\u2019s duty); the public archaeology (the community\u2019s stake — the displaced villages of the dam and the site\u2019s claims; the school\u2019s visit and the museum\u2019s education register; the digital archaeology\u2019s craft — the photogrammetry, the crowd\u2019s catalogue); the synthesis map (the evidence to the theory to the keeping); and the doorstep — to Indian History\u2019s narrative (this book\u2019s evidence serving that book\u2019s story), to Art History\u2019s aesthetic register, and to the reader\u2019s own museum visit as the assignment.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Antiquities\u2019 Ethics',
      'The Public Archaeology',
      'The Synthesis Map',
      'The Doorstep: The Museum Visit',
    ],
  },
]

export const archaeologyAndHeritageStudies: Book = {
  id: 'archaeology-and-heritage-studies',
  title: 'Archaeology and Heritage Studies',
  subtitle: 'The material past and its keeping — excavation, dating, conservation and the museum\u2019s craft',
  discipline: 'humanities',
  level: 'Senior secondary history → university archaeology/museology + UGC-NET (Archaeology, Museology) readiness',
  description: 'The past\u2019s material evidence and its care in one arc. The searches\u2019 history (the antiquarian to the scientific archaeology; the Indian story — the Asiatic Society, Cunningham\u2019s ASI, Wheeler\u2019s method, the Independent era); the evidence\u2019s nature (what survives and why — the formation processes; the artefact, ecofact and feature census); the survey and excavation\u2019s craft (the site discovery, the remote sensing and geophysical prospecting, the grid and the stratigraphy\u2019s recording discipline); the dating\u2019s engine (the relative\u2019s stratigraphy and typology; the absolute\u2019s radiocarbon family, dendrochronology, the trapped-charge methods); the reconstruction\u2019s craft (the social, environmental and cognitive archaeologies; the provenience\u2019s trade); the theory census (the culture-historical, processual and post-processual registers); the Indian record\u2019s own tour (the Palaeolithic stations, the Harappan\u2019s excavation story, the megaliths, the early-historical cities, the epigraphy and numismatics\u2019 craft); the heritage\u2019s keeping (the tangible and intangible registers, the museology, the conservation science, the site management and the legal frame); and the ethics and public archaeology\u2019s register. Cross-references Indian History (the literary narrative) and hands off to Art History (the object\u2019s aesthetic).',
  status: 'planned',
  accent: ['#92400e', '#78350f'],
  chapters,
}
