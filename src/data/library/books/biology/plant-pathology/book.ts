import type { Book, Chapter } from '../../../types'

/**
 * Plant Pathology — the fifteenth book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `ppath-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Plant Pathology owns the plant-disease register. The pathogens’ own biology belongs to microbiology (the sibling views — the organism there, the disease here); the resistance breeding belongs to plant-genetics; the pesticide-and-IPM economics is shared with economic-botany and entomology; the clinical-and-veterinary analogues belong to the medical shelf; the NEET-and-agriculture lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Agrios’ Plant Pathology named as the university pole (the pathogen-and-epidemiology registers).
 * - The NCERT class 11-12 biology-and-agricultural lines as the school ladder.
 * - Lucas’ Plant Pathology named as the readable co-pole (the diagnostic-and-management registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'founding-concepts',
    title: 'The Founding Concepts',
    summary:
      'The discipline\u2019s frame: what a plant disease is (a process, not an event — the abnormal physiology register held apart from mechanical injury); Koch\u2019s postulates adapted (isolate, culture, reinoculate, re-isolate — with the unculturable honesty and the molecular fifth postulate); the parasite-against-pathogen distinction (the living-together balance against the damage register, virulence and aggressiveness separated); the biotroph-necrotroph-hemibiotroph census (the living host\u2019s dinner, the dead host\u2019s dinner, the late blight\u2019s switch); and the Ireland receipt — the million-and-a-half lost to one water mould, priced as the discipline\u2019s founding catastrophe and the food-security honesty that never left.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Disease Definition and the Adapted Postulates',
      'The Balance Distinction',
      'The Three Dinner Registers',
      'The Ireland Receipt Priced',
    ],
  },
  {
    number: 2,
    slug: 'fungal-diseases',
    title: 'The Fungal and Oomycete Diseases',
    summary:
      'The classical register: the rusts and smuts (the cereal stem rust\u2019s five-stage heteroecious cycle on wheat and barberry — the uredinial and telial stages priced by their epidemiology; the smuts\u2019 and bunts\u2019 floral attack); the powdery and downy mildews (the surface miner and the internal plunderer held apart by their hyphae); the vascular wilts (the Fusarium and Verticillium crafts — the tylose response and the wilt arithmetic); the blights, rots, anthracnoses and leaf spots (the late blight\u2019s foliar explosion, the Sclerotinia\u2019s white mould, the Phytophthora root rots); the ergot and scab registers (the Claviceps alkaloid receipt priced as the historical poison it was); and the diagnostic craft — the signs against the symptoms distinction as the field\u2019s own detective work.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Heteroecious Cycle Walked',
      'The Two Mildews Held Apart',
      'The Wilts and Rots Census',
      'The Signs-against-Symptoms Craft',
    ],
  },
  {
    number: 3,
    slug: 'bacterial-viral-nematode',
    title: 'The Bacterial, Viral and Nematode Registers',
    summary:
      'The other pathogens: the bacterial diseases (the soft rot-and-pectolytic craft, the fire blight and the citrus canker, the crown gall\u2019s Ti plasmid — Agrobacterium as the natural genetic engineer biotechnology borrowed, priced straight); the phytoplasmas (the aster yellows and the witches\u2019 brooms, unculturable and diagnosed by molecular means); the viral and viroid diseases (the TMV rod as the classic, the leaf-curl and bunchy-top vector crafts, the potato spindle viroid as the naked-RNA claim); the nematode diseases (the root-knot\u2019s giant-cell craft, the cyst nematodes\u2019 egg arithmetic, the stem and bulb types); and the parasitic plants (the dodder\u2019s and Striga\u2019s haustorial drain — the witchweed receipt as the African food-security register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bacterial Crafts and the Borrowed Plasmid',
      'The Phytoplasma Honesty',
      'The Viral and Viroid Classics',
      'The Root-Knot and Cyst Arithmetic',
    ],
  },
  {
    number: 4,
    slug: 'epidemiology',
    title: 'The Epidemiology Craft',
    summary:
      'The outbreak arithmetic: the disease triangle and tetrahedron (host, pathogen, environment — time and human added — each corner\u2019s lever priced by a real intervention); the two cycle kinds (the apple scab\u2019s monocyclic arithmetic against the late blight\u2019s polyetic explosion — the rate against the carry-over); the Vanderplank register (the apparent-infection rate and the Sanitation Ratio named at survey depth); the forecasting craft (the Mills tables for apple scab, the late-blight weather rules — the humidity-and-temperature triggers read as arithmetic); the genetic-uniformity receipt (the Irish potato and the Bengal maize — the clone\u2019s vulnerability priced straight); and the assessment craft (the severity keys and the crop-loss registers honestly measured).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Triangle\u2019s Levers Priced',
      'The Two Cycle Kinds by Their Arithmetic',
      'The Forecasting Triggers Read',
      'The Uniformity Receipt Held Straight',
    ],
  },
  {
    number: 5,
    slug: 'plant-defences',
    title: 'The Plant\u2019s Defence Answer',
    summary:
      'The host\u2019s side: the preformed barriers (the cuticle and wax, the suberised bark, the silica deposits, the performed saponins and glucosinolates); the induced responses (the hypersensitive response\u2019s localised death as the containment firebreak, the oxidative burst, the phytoalexins\u2019 antibiotic rush, the cell-wall fortification by callose and lignin); the two systemic arcs (the SAR\u2019s salicylate signal and the ISR\u2019s jasmonate-ethylene path — the two circuits and their cross-talk named); the PTI-ETI register at survey depth (the pattern-recognition outer gate and the effector-triggered inner gate — the gene-for-gene\u2019s R-Avr lock cross-referenced to plant-genetics); and the RNA-silencing answer (the plant\u2019s antiviral siRNA craft, the cross-protection exploitation named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Preformed Census',
      'The Hypersensitive Firebreak',
      'The Two Systemic Arcs',
      'The Silencing Answer Priced',
    ],
  },
  {
    number: 6,
    slug: 'management',
    title: 'The Management Craft',
    summary:
      'The control register held as one arithmetic: the legislated leg (the quarantine and certification crafts — the clean-seed and mother-block registers); the cultural leg (the rotation that starves the carry-over, the sanitation of the debris, the drainage and spacing that change the microclimate — each priced by its epidemiological lever); the biological leg (the Trichoderma and Pseudomonas crafts, the mycoparasitism and induced-resistance registers); the chemical leg (the multisite protectants against the single-site systemics — the resistance-management arithmetic priced by the FRAC codes, the timing and threshold crafts); and the integrated register (the IPM decision frame — the calendar spray against the forecast spray, the threshold arithmetic, the whole held honestly as management, never as victory).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Legislated Leg\u2019s Crafts',
      'The Cultural Levers Priced',
      'The Chemical Honesty by Mode of Action',
      'The Integrated Frame Held',
    ],
  },
  {
    number: 7,
    slug: 'host-resistance',
    title: 'The Host-Resistance Register',
    summary:
      'The resistance craft: the two kinds (the vertical R-gene resistance\u2019s complete-but-fragile shield against the horizontal polygenic resistance\u2019s partial-but-durable field — the two priced by their epidemiology); the gene-for-gene receipt (Flor\u2019s flax-and-rust arc — the R-Avr lock-and-key and its consequence: the new virulence race that unlocks it); the boom-and-bust honesty (the resistance gene deployed, the race selected, the resistance defeated — the wheat and rice arcs told straight); the durability craft (the gene pyramiding, the multiline mixtures, the spatial deployment registers); and the engineered register (the transgenic R-gene and the silencing exploits cross-referenced to biotechnology, with the regulatory honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Kinds Priced by Their Epidemiology',
      'The Flor Lock-and-Key Receipt',
      'The Boom-and-Bust Told Straight',
      'The Durability Crafts Named',
    ],
  },
  {
    number: 8,
    slug: 'diagnosis-doorway',
    title: 'The Diagnosis and the Doorway',
    summary:
      'The working register: the diagnostic craft (the symptoms-and-signs evidence walked — the isolation and the pure culture, the humidity-chamber trick, the completed postulates; the molecular era\u2019s PCR and LAMP registers named); the clinic register (the extension service\u2019s plant clinic as the farmer\u2019s door — the sample\u2019s craft and the recommendation\u2019s honesty); the loss arithmetic (the global and Indian registers — the twenty-to-forty-percent honesty priced straight against the food-security question); and the doorway — to economic-botany for the crop arithmetic this discipline protects, to plant-genetics for the resistance breeding, to biotechnology for the tools; the discipline held honestly as the food supply\u2019s quiet insurance: the pathogen\u2019s craft, the host\u2019s answer, the grower\u2019s arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Diagnostic Evidence Walked',
      'The Clinic as the Farmer\u2019s Door',
      'The Loss Arithmetic Priced Straight',
      'The Quiet Insurance Held',
    ],
  },
]

export const plantPathology: Book = {
  id: 'plant-pathology',
  title: 'Plant Pathology',
  subtitle: 'The plant in disease — pathogen census, epidemiology, the defence answer and the management craft',
  discipline: 'biology',
  level: 'Undergraduate botany (the disease-and-management register)',
  description: 'The sick-plant discipline: the concepts that separate disease from injury, Koch\u2019s postulates adapted to plants, and the biotroph-against-necrotroph census of how pathogens eat; the pathogen census in full — the late blight of Ireland as the founding catastrophe, the rusts and smuts with their heteroecious cycles, the mildews, wilts, blights and rots of the fungi and water moulds; the bacterial, phytoplasma, viral, viroid and nematode diseases with the crown-gall plasmid as biotechnology\u2019s borrowed tool; the epidemiology craft (the disease triangle, the monocyclic-against-polyetic cycles, the forecasting registers, the genetic-uniformity receipt); the plant\u2019s defence answer (the preformed barriers, the hypersensitive death, the phytoalexins, the systemic-acquired resistance, the gene-for-gene lock); and the management craft — quarantine, culture, biology, chemistry and resistance held as one integrated arithmetic with the boom-and-bust honesty priced straight.',
  status: 'planned',
  accent: ['#b91c1c', '#450a0a'],
  chapters,
}
