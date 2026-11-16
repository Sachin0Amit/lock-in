import type { Book, Chapter } from '../../../types'

/**
 * Entomology — the twenty-second book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `ento-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Entomology owns the insect register. The general arthropod survey belongs to animal-diversity; the parasite-and-vector medical depth to the medical shelf’s books (the sibling clinical views); the behaviour’s general theory to animal-behaviour; the agricultural economics to economic-botany’s-IPM register (cross-referenced); the NCERT-and-NEET lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Gullan and Cranston’s The Insects named as the university pole (the anatomy-and-orders registers).
 * - Chapman’s The Insects: Structure and Function named as the physiology co-pole (the tracheal-and-Malpighian registers).
 * - The NCERT class 11-12 lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'success-anatomy',
    title: 'The Success and the Anatomy',
    summary:
      'The insect craft: the tagmosis register (the head\u2019s antenna-and-compound-eye sensory craft — the ommatidium\u2019s arithmetic at survey depth; the thorax\u2019s wing-and-halter locomotor register; the abdomen-and-visceral register); the mouthpart census (the generalised biting-and-chewing plan walked first — the mandible, maxilla and labium crafts; then the modifications: the mosquito\u2019s piercing-sucking, the butterfly\u2019s siphoning, the fly\u2019s sponging, the thrips\u2019 rasping — each priced by the feeding register it serves); the leg census (the cursorial, raptorial, saltatorial and natatorial registers by their locomotion arithmetic); and the success receipts (the small-size surface arithmetic, the metamorphosis, the flight and the angiosperm coevolution — cross-referenced from animal-diversity, owned here at the insect depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tagmosis Register Held',
      'The Mouthpart Census by Feeding Register',
      'The Leg Census by Locomotion',
      'The Success Receipts Priced',
    ],
  },
  {
    number: 2,
    slug: 'physiology',
    title: 'The Insect Physiology',
    summary:
      'The working insect: the tracheal system (the spiracle-and-tracheole craft — the direct-delivery honesty priced by the diffusion arithmetic, the air-sac ventilation register named); the Malpighian register (the hindgut\u2019s water arithmetic — the uric-and-dry honesty cross-referenced from animal-physiology); the open circulation (the haemocoel\u2019s low-pressure honesty priced straight); the moult engine (the ecdysone\u2019s apolysis trigger, the JH\u2019s status-quo honesty — the larval-keep register priced by the juvenile-hormone arithmetic); and the diapause register (the seasonal\u2019s honesty — the photoperiod-and-trigger named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tracheal Direct-Delivery Honesty',
      'The Malpighian Water Arithmetic',
      'The Moult Engine and the JH Dial',
      'The Diapause Honesty Named',
    ],
  },
  {
    number: 3,
    slug: 'orders-register',
    title: 'The Orders Register',
    summary:
      'The thirty-plus census: the dominant registers (the Coleoptera\u2019s crown — the elytra\u2019s shield honesty priced as the most-speciose register; the Lepidoptera\u2019s scale-and-coiling crafts; the Hymenoptera-and-hymen census — the bee, wasp and ant-and-social register; the Diptera-and-halter receipt; the Hemiptera\u2019s Orthoptera\u2019s registers); the diagnostic craft (the wing\u2019s venation key, the coupling register named); the larval census (the caterpillar, grub and maggot — the complete metamorphosis register priced); the Blattodea-and-Isoptera registers (the cockroach\u2019s termite\u2019s crafts — the social-and-cryptic honesty); and the human register per order held straight (the pollinator, pest, vector and beneficial census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dominant Registers Priced by Their Crafts',
      'The Diagnostic Wing Key Held',
      'The Larval Census Priced',
      'The Human Register per Order Held Straight',
    ],
  },
  {
    number: 4,
    slug: 'social-insects',
    title: 'The Social Insects',
    summary:
      'The eusociality crown: the honey bee\u2019s register (the caste census — the queen\u2019s, worker\u2019s and drone\u2019s crafts; the dance language — the waggle\u2019s figure-eight with the direction-and-distance arithmetic priced straight, the round dance\u2019s near-register named; the pheromone\u2019s queen-substance honesty); the ant register (the trail-and-pheromone craft, the caste polyethism named, the leaf-cutter\u2019s fungus agriculture receipt, the slave-making register named); the termite register (the cryptic honesty — the gut\u2019s microbial cross-reference to microbiology, the caste census, the mound\u2019s climate architecture priced as the receipt); and the eusociality\u2019s evolution (the haplodiploid receipt cross-referenced to animal-behaviour — the kin arithmetic owned at the general level, the insect\u2019s particular receipts here).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dance Language Priced Straight',
      'The Trail and Agriculture Receipts',
      'The Mound\u2019s Climate Receipt',
      'The Kin Arithmetic Owned at Its Level',
    ],
  },
  {
    number: 5,
    slug: 'medical-veterinary',
    title: 'The Medical-and-Veterinary Register',
    summary:
      'The insect\u2019s medical side: the vector craft (the Anopheles\u2019 malaria register — the Plasmodium cross-reference to the parasitology book; the Aedes\u2019 dengue-and-yellow-fever registers; the Culex-and-filarial register; the tsetse-and-trypanosome receipt; the flea\u2019s historical Yersinia register priced straight; the tick-and-Lyme register named); the mechanical register (the housefly\u2019s pathogen-carriage craft priced by the habit\u2019s arithmetic); the myiasis register named (the fly\u2019s-in-tissue crafts); the direct register (the louse\u2019s, bug\u2019s and flea\u2019s irritation crafts); and the control cross-reference (the insecticide-resistance honesty named — the IPM register owned at the economic chapter, the medical control cross-referenced to the medical shelf).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vector Crafts by Their Agents',
      'The Mechanical Carriage Register',
      'The Myiasis Register Named',
      'The Control Cross-Reference Named',
    ],
  },
  {
    number: 6,
    slug: 'economic-beneficial',
    title: 'The Economic-and-Beneficial Register',
    summary:
      'The human arithmetic: the pest register (the locust-and-historical register priced straight, the bollworm-and-cotton register, the stem-borer-and-cereal register, the storage-and-Khapra crafts named); the IPM craft (the economic-threshold arithmetic — the cost-and-benefit register priced straight; the biological control — the Trichogramma\u2019s egg-parasitoid receipt, the baculovirus register named; the pheromone-trap craft; the resistant-variety cross-reference to plant-genetics); the beneficial census (the silkworm-and-sericulture register — the Bombyx\u2019s fibre arithmetic priced straight; the honey bee-and-apiculture register — the pollination\u2019s service arithmetic priced honestly as the ecosystem-and-own register; the lac, cochineal and shellac registers named); and the conservation register (the pollinator decline — the pesticide debate priced straight by the evidence).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pest Register Priced Straight',
      'The IPM Threshold Arithmetic',
      'The Sericulture-and-Apiculture Registers',
      'The Pollinator Decline Priced by Evidence',
    ],
  },
]

export const entomology: Book = {
  id: 'entomology',
  title: 'Entomology',
  subtitle: 'The insects — the most successful animals: their craft, their orders and their human register',
  discipline: 'biology',
  level: 'Undergraduate zoology (the Gullan-and-Cranston register)',
  description: 'The insect discipline in one arc: the anatomy register (the tagmosis craft — the head\u2019s sensory-and-feeding, the thorax\u2019s locomotor and the abdomen-and-visceral registers; the mouthpart census from the generalised biting plan through the piercing, siphoning and sponging crafts; the wing-and-venation craft with the halter receipt; the leg census); the physiology register (the tracheal direct-delivery honesty, the Malpighian water arithmetic, the ecdysone-and-JH moult engine, the diapause honesty); the metamorphosis register (the hemi-against-holo honesty priced by the larva\u2019s pupa arithmetic); the orders register (the thirty-plus census with the dominant five — the Coleoptera, Lepidoptera, Hymenoptera, Diptera and Hemiptera — each priced by its diagnostic craft and human register); the social insects (the honey bee\u2019s dance language priced straight, the ant\u2019s termite\u2019s crafts, the kin arithmetic owned at its level); the medical-and-veterinary register (the vector crafts by their agents, the mechanical carriage, the myiasis register); the economic register (the pest\u2019s IPM arithmetic with the biological control crafts, the sericulture-and-apiculture registers, the pollinator service priced honestly); and the conservation register (the pollinator decline priced straight by the evidence).',
  status: 'planned',
  accent: ['#a16207', '#422006'],
  chapters,
}
