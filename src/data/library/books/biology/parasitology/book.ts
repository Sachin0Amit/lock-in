import type { Book, Chapter } from '../../../types'

/**
 * Parasitology — the twenty-third book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `para-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Parasitology owns the general parasite register. The clinical disease-and-management depth belongs to the medical shelf’s medical-microbiology-and-pathology books (the sibling clinical views); the vector’s craft to entomology; the immunology to immunology; the drug register to pharmacology; the NCERT-and-NEET lines are priced here at the general level.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Roberts and Janovy’s Foundations of Parasitology named as the university pole (the life-cycle-and-adaptation registers).
 * - Muller and Baker’s Medical Parasitology cross-referenced as the clinical pole (owned by the medical shelf).
 * - The NCERT class 12 human-health-and-disease chapter as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'concepts-adaptations',
    title: 'The Concepts and the Adaptation Register',
    summary:
      'The discipline\u2019s frame: the parasitism definition (the ecological honesty — the symbiosis census: the mutualism\u2019s, commensalism\u2019s and parasitism\u2019s registers priced by the benefit-and-cost arithmetic); the type census (the obligate\u2019s facultative, the permanent\u2019s temporary, the monoxenous-and-heteroxenous registers — the one-host against the many honesty); the adaptation register (the lost-and-gained census — the locomotor\u2019s digestive losses priced by the host-provided honesty, the attachment\u2019s reproductive gains with the egg\u2019s-millions receipt priced straight, the host-specificity register); and the aggregation honesty named (the 20-80 distribution register — the few-carriers\u2019 own consequence).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Symbiosis Census by Cost and Benefit',
      'The Type Census with the Host Honesty',
      'The Lost-and-Gained Arithmetic Held',
      'The Aggregation Honesty Named',
      'The Nature of Parasites and Host-Parasite Relations',
    ],
  },
  {
    number: 2,
    slug: 'protistan-register',
    title: 'The Protistan Parasites',
    summary:
      'The single-celled register: the Plasmodium craft (the Anopheles vector cross-referenced to entomology, the liver-and-erythrocytic cycles — the merozoite\u2019s ring-stage craft priced by the fever\u2019s paroxysm arithmetic — the 48-and-72-hour register, the gametocyte\u2019s vector-door receipt); the Entamoeba register (the trophozoite\u2019s cyst crafts — the four-nuclei receipt); the Trypanosoma register (the tsetse-and-vector receipt, the antigenic-variation craft priced as the evasion-and-own register — the VSG\u2019s cloak); the Leishmania register (the sandfly-and-vector receipt, the Kala-azar register named); and the Giardia register (the trophozoite\u2019s heart cyst crafts named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Plasmodium Cycles by the Fever Arithmetic',
      'The Cyst Crafts by Their Receipts',
      'The Antigenic Variation as the Evasion Craft',
      'The Flagellate Registers Named',
      'The Protozoan and Helminthic Parasites',
    ],
  },
  {
    number: 3,
    slug: 'trematodes-cestodes',
    title: 'The Trematodes and the Cestodes',
    summary:
      'The flat parasites: the digenetic craft (the miracidium-to-cercaria census — the snail\u2019s intermediate-host amplification priced by its arithmetic, the Fasciola-and-watercraft receipt); the Schistosoma register (the cercaria\u2019s skin entry, the egg-and-granuloma register named — the clinical depth cross-referenced to the medical shelf); the cestode craft (the scolex\u2019s hook-and-sucker register, the proglottid\u2019s selfing honesty, the Taenia-and-cysticercus receipt — the bovine-and-porcine registers, the hydatid-and-Echinococcus craft named); and the zoonotic register named (the human\u2019s dead-end honesty priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Digenetic Craft by the Amplification Arithmetic',
      'The Schistosoma Register with the Granuloma Named',
      'The Proglottid Census Held',
      'The Zoonotic Honesty Priced Straight',
    ],
  },
  {
    number: 4,
    slug: 'nematode-register',
    title: 'The Nematode Register',
    summary:
      'The round parasites: the direct-cycle craft (the Ascaris\u2019s egg-and-larval-migration receipt priced straight, the Enterobius\u2019s pinworm-and-night register); the hookworm register (the Ancylostoma\u2019s filariform skin-penetration receipt, the iron-and-anaemia arithmetic named); the filarial register (the Wuchereria-and-lymphatic craft — the elephantiasis honesty priced straight, the Culex vector receipt, the Onchocerca\u2019s river-blindness register with the Simulium vector named); the Dracunculus register (the guinea worm-and-eradication receipt priced straight — the copepod-filter craft as the public health-and-own receipt); and the Trichinella register named (the muscle\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Direct Cycle\u2019s Migration Receipt',
      'The Filarial Registers by Their Vectors',
      'The Eradication Receipt Priced Straight',
      'The Muscle Craft Named',
    ],
  },
  {
    number: 5,
    slug: 'host-answers',
    title: 'The Host\u2019s Answers',
    summary:
      'The defence against the parasite: the immune register (the Th2-and-gut-arm honesty — the eosinophil-and-IgE register cross-referenced to immunology, the granuloma\u2019s egg-cage craft); the evasion register (the antigenic variation — the VSG-and-trypanosome craft; the molecular mimicry named; the cyst-wall craft; the immunosuppression register); the manipulation register (the snail\u2019s eye-tentacle receipt priced straight as the behaviour\u2019s-own modification — the parasite\u2019s extended phenotype honesty); and the ecology register (the parasite\u2019s r-and-K selection, the virulence trade-off cross-referenced to evolution — the transmission\u2019s-arithmetic consequence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Th2 Arm and the Egg Cage',
      'The Evasion Crafts by Their Receipts',
      'The Manipulation Receipt Priced Straight',
      'The Virulence Trade-Off Cross-Referenced',
    ],
  },
  {
    number: 6,
    slug: 'control-doorway',
    title: 'The Control and the Doorway',
    summary:
      'The applied close: the diagnostic craft (the egg\u2019s cyst arithmetic — the floatation\u2019s sedimentation crafts, the Kato-Katz quantitative register named, the serology-and-PCR registers); the drug register (the antihelminthic census — the albendazole\u2019s praziquantel crafts named at survey depth with the pharmacology book owning the mechanism); the public-health register (the sanitation\u2019s latrine crafts, the mass-drug-administration arithmetic — the deworming receipt priced straight, the guinea-worm eradication arc as the craft-and-own receipt, the One Health register named); and the doorway — to the medical shelf for the clinical depth, to entomology for the vector craft, to immunology for the host machinery; the parasite held honestly as life\u2019s other strategy: neither monster nor oddity — the ecology-and-evolution register priced straight.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Egg-and-Cyst Arithmetic',
      'The Drug Census Named at Survey Depth',
      'The Eradication Arc as the Receipt',
      'The Other Strategy Held Straight',
    ],
  },
]

export const parasitology: Book = {
  id: 'parasitology',
  title: 'Parasitology',
  subtitle: 'Life at another\u2019s expense — the parasite census, the host\u2019s answers and the control craft',
  discipline: 'biology',
  level: 'Undergraduate zoology (the general register; the clinical owned by the medical shelf)',
  description: 'The parasite discipline: the concept register (the symbiosis census priced by the cost-and-benefit arithmetic, the type census — the obligate\u2019s facultative and the monoxenous\u2019s heteroxenous honesty, the adaptation\u2019s lost-and-gained arithmetic with the egg\u2019s-millions receipt, the aggregation honesty named); the protistan register (the Plasmodium\u2019s liver-and-erythrocytic cycles priced by the fever arithmetic — the 48-and-72-hour paroxysm register, the Entamoeba\u2019s Giardia\u2019s crafts, the Trypanosoma\u2019s antigenic variation priced as the evasion-and-own craft, the Leishmania-and-sandfly register); the helminth craft (the trematode\u2019s digenetic cycle — the snail\u2019s amplification honesty with the Schistosoma register; the cestode-and-proglottid census with the Taenia-and-cysticercus receipt; the nematode register — the Ascaris\u2019s direct honesty, the hookworm\u2019s skin-penetration receipt, the filarial registers by their vectors, the Dracunculus eradication receipt priced straight); the host-and-answer register (the Th2-and-eosinophil arm cross-referenced to immunology, the evasion crafts — the antigenic cloak and the cyst wall, the manipulation receipt priced straight); the ecology-and-evolution register (the virulence trade-off cross-referenced to evolution); and the control register (the egg-and-cyst diagnostic arithmetic, the drug census named at survey depth, the sanitation-and-MDA public-health crafts, the guinea-worm eradication arc as the receipt, the One Health register named).',
  status: 'planned',
  accent: ['#be123c', '#4c0519'],
  chapters,
}
