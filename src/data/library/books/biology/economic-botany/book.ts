import type { Book, Chapter } from '../../../types'

/**
 * Economic Botany — the sixteenth book of the Biology shelf (the botany register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `ebot-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Economic Botany owns the plant-products register. The breeding machinery belongs to plant-genetics; the cultivation-and-protection to plant-pathology and entomology (cross-referenced); the pharmacognosy-and-clinical exploitation to the medical shelf’s pharmacy book (the sibling views); the fermentation crafts to microbiology; the policy-and-sustainability registers to the environmental-studies book; the NCERT-and-agricultural lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Wickens’ Economic Botany named as the university pole (the plant-utility census).
 * - Simpson’s Plants in our World named as the readable co-pole (the underutilised-crop register).
 * - The NCERT class 11-12 biology-and-agricultural lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'gift-census',
    title: 'The Plant-Gift Census',
    summary:
      'The economic register opened: the gift census by register — the food, the fibre, the medicine, the fuel, the timber and the spice lines priced by their civilisational weight; the domestication craft (the syndrome honestly described — the loss of shattering, dormancy and toxicity as the first genetic engineering, cross-referenced to plant-genetics); the Vavilov centres (the crops\u2019 geographic origins — the near-Eastern cereals, the Andean potatoes, the Mesoamerican maize-and-beans register priced as the diversity\u2019s geography); and the agrobiodiversity honesty (the landrace against the modern variety — the narrowing diversity priced as the breeding cost, the conservation cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Registers Opened by Their Weight',
      'The Domestication Syndrome Priced',
      'The Vavilov Centres Mapped',
      'The Narrowing Honesty Named',
    ],
  },
  {
    number: 2,
    slug: 'cereals-pulses',
    title: 'The Cereals and the Pulses',
    summary:
      'The food engine: the wheat craft (the AABBDD hexaploid receipt cross-referenced to plant-genetics, the gluten-and-biscuit arithmetic, the semi-dwarf Green Revolution priced straight with its water-and-capital cost); the rice craft (the aquatic discipline, the IR8 arc, the hybrid-and-BT registers, the Asia-civilisation receipt); the maize-and-millet register (the C4 engine cross-referenced to plant-physiology, the Americas\u2019 grain; the millets\u2019 hardness-and-nutrition honesty priced as the climate-ready register); the pulses\u2019 craft (the nitrogen-fixing receipt cross-referenced, the protein complementarity with the cereals — the dal-and-roti arithmetic); and the oilseed register (the mustard, groundnut, soybean and palm crafts with their oil-and-cake division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Wheat-and-Rice Crafts Priced Straight',
      'The Maize-and-Millets Register',
      'The Pulses\u2019 Complementarity Arithmetic',
      'The Oilseed Crafts',
    ],
  },
  {
    number: 3,
    slug: 'beverages-stimulants-spices',
    title: 'The Beverages, Stimulants and Spices',
    summary:
      'The cup-and-flavour register: the tea craft (the two-and-a-leaf flush, the wither-roll-ferment-fire arc that separates black from green, the terroir honesty); the coffee craft (the arabica-and-robusta species register, the cherry-to-bean processing, the caffeine pharmacology priced straight and cross-referenced to pharmacy); the cocoa craft (the pod-to-ferment arithmetic — the flavour-and-microbial receipt); the spice census (the pepper-and-cardamom of the Western Ghats, the clove-and-nutmeg of the islands, the turmeric-and-ginger rhizomes — India\u2019s monsoon-gift register priced with the trade\u2019s historical honesty); and the social register told straight (the plantation labour arc — the cup\u2019s colonial cost priced without either erasure or romance).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tea-and-Coffee Crafts',
      'The Cocoa Fermentation Receipt',
      'The Spice Census as the Monsoon Gift',
      'The Cup\u2019s Cost Told Straight',
    ],
  },
  {
    number: 4,
    slug: 'fibres-woods',
    title: 'The Fibres and the Woods',
    summary:
      'The material register: the fibre craft census (the cotton tetraploid\u2019s long-and-short fibre receipt cross-referenced to plant-genetics, the jute\u2019s retting-and-bast honesty, the flax-to-linen register, the coir-and-sisal hardness); the wood craft (the growth-ring-and-density arithmetic cross-referenced to plant-anatomy, the heartwood durability register, the teak-and-sal Indian receipts, the plywood-and-composite crafts); the bamboo-and-cane register (the grass-that-woody honesty — the fast-growth-and-strength arithmetic priced as the climate\u2019s material); and the NWFP census (the resin, gum, tannin and latex registers with the rubber tree\u2019s Hevea arc priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fibre Census by Their Crafts',
      'The Wood Quality Arithmetic',
      'The Bamboo Climate Register',
      'The NWFP Census',
    ],
  },
  {
    number: 5,
    slug: 'medicinal-register',
    title: 'The Medicinal Register',
    summary:
      'The pharmacy\u2019s plant side: the secondary-metabolite honesty (the alkaloid, glycoside, terpenoid and phenolic families priced as the plant\u2019s own defence chemistry borrowed as our medicine — the cross-reference to plant-pathology-and-defence register); the classic receipts (the willow-to-aspirin arc, the cinchona bark\u2019s quinine, the foxglove\u2019s digitalis, the opium poppy-and-dual register — each priced as the ethnobotany-to-pharmacology route); the AYUSH-and-ethnobotany honesty (the turmeric, neem and ashwagandha registers priced by the evidence hierarchy — neither dismissal nor advocacy, the standardisation-and-clinical craft named); and the conservation register (the Taxol-and-Pacific-yew arc priced as the synthesis lesson — the harvest\u2019s end and the laboratory\u2019s answer).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Secondary-Metabolite Honesty',
      'The Classic Receipts Priced by Their Routes',
      'The AYUSH Honesty Held Straight',
      'The Taxol Lesson Priced',
    ],
  },
  {
    number: 6,
    slug: 'horticulture-register',
    title: 'The Horticulture Register',
    summary:
      'The garden craft: the fruit-and-vegetable census (the pomology-and-olericulture registers — the grafting-and-budding crafts priced as the clonal arithmetic, the dwarfing rootstock\u2019s M9 apple receipt); the floriculture register (the rose-and-orchid crafts with the tissue-culture clonal receipt cross-referenced to plant-genetics); the post-harvest craft (the respiration-and-ethylene arithmetic — the cold chain\u2019s register priced as the loss honesty: the third-that-never-reaches); the seed craft (the hybrid-and-variety registers with the truthful-labelling honesty); and the urban register named (the terrace-and-community crafts as the modern receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grafting Clonal Arithmetic',
      'The Floriculture Crafts',
      'The Ethylene-and-Cold-Chain Honesty',
      'The Seed-and-Label Craft',
    ],
  },
  {
    number: 7,
    slug: 'future-register',
    title: 'The Future Register',
    summary:
      'The agriculture of tomorrow held straight: the climate challenge (the heat-and-water arithmetic — the C4-rice and drought-tolerance frontiers named as research, not receipts); the underutilised register (the millets\u2019 and the wider-plate honesty — the diversity\u2019s insurance priced); the sustainable register (the organic, IPM-and-precision crafts each priced by its evidence without the advocacy, the soil-health register); the GM-and-edited register (the Bt-and-Golden-Rice arcs cross-referenced to biotechnology — the regulatory honesty held straight); and the 2050 arithmetic (the population, climate and waste registers priced together — the plant\u2019s gift held as the civilisation\u2019s foundation and the next-green-revolution as the choice it remains).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Climate Arithmetic Priced',
      'The Wider-Plate Honesty',
      'The Registers Priced by Evidence',
      'The 2050 Challenge Held',
    ],
  },
]

export const economicBotany: Book = {
  id: 'economic-botany',
  title: 'Economic Botany',
  subtitle: 'The plants we live by — the crop census, the product register and the agriculture of the future',
  discipline: 'biology',
  level: 'Undergraduate botany (the applied register)',
  description: 'The plant-utility discipline: the gift census opened honestly (the food, fibre, medicine, fuel, timber and spice registers — agriculture\u2019s birth as history\u2019s largest event priced straight); the food crops in full (the cereals\u2019 craft — wheat\u2019s polymorphic genome, rice\u2019s water discipline, maize\u2019s C4 engine and the millets\u2019 hardness; the pulses\u2019 nitrogen arithmetic and protein complementarity; the oilseeds\u2019 and potato\u2019s registers; the horticultural craft of fruits and vegetables); the beverage-and-stimulant register (tea\u2019s flush-and-fermentation craft, coffee\u2019s two species and the caffeine honesty, cocoa\u2019s fermentation, the spice census — pepper, cardamom, turmeric — as India\u2019s monsoon gift); the fibre register (cotton-and-tetraploid receipt, jute\u2019s retting, flax and coir); the medicinal register (the secondary-metabolite honesty — the plant\u2019s defence chemistry borrowed as our medicine, the classic receipts from quinine to aspirin, the AYUSH-and-ethnobotany registers priced by evidence); the timber-and-forest register (the wood quality arithmetic, the bamboo-and-cane crafts, the NWFP census); and the future register — the underutilised crops, the climate-ready arithmetic and the food-security challenge of 2050 held straight.',
  status: 'planned',
  accent: ['#ca8a04', '#713f12'],
  chapters,
}
