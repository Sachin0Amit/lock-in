import type { Book, Chapter } from '../../../types'

/**
 * Animal Anatomy — the eighteenth book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `zanat-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Animal Anatomy owns the general-and-comparative register. The human’s regional anatomy belongs to the medical shelf’s anatomy (the sibling clinical view — the general architecture here, the human clinic there); the mechanisms belong to animal-physiology; the plant’s anatomy to plant-anatomy; the NCERT-and-NEET lines are priced here at the general level.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Hickman’s Integrated Principles of Zoology — Part IV Activity of Life (read this pass) as the spine.
 * - Hyman’s Comparative Vertebrate Anatomy named as the depth pole (the comparative register).
 * - The NCERT class 11 structural-organisation chapter as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'tissue-register',
    title: 'The Tissue Register',
    summary:
      'The four-tissue census: the epithelium\u2019s craft (the squamous\u2019s cuboidal-and-columnal census priced by their surface arithmetic, the glandular\u2019s ciliated variants, the junctional census — the tight, adherent and gap crafts as the tissue\u2019s three holds); the connective register (the matrix\u2019s collagen-and-elastin craft, the fibroblast\u2019s versatility, the loose-and-dense-and-specialised census — the adipose, cartilage, bone and blood registers); the muscle census (the skeletal\u2019s voluntary-and-striated craft, the cardiac\u2019s intercalated honesty, the smooth-and-involuntary register); the nervous register (the neuron\u2019s soma-dendrite-axon craft, the glial census); and the origin mapping fixed once (the ectoderm-mesoderm-endoderm fate register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Epithelium\u2019s Crafts and Junctions',
      'The Matrix\u2019s Collagen Versatility',
      'The Muscle Census Held',
      'The Origin Mapping Fixed',
      'Morphology of the Frog and the Insect',
    ],
  },
  {
    number: 2,
    slug: 'integument-skeleton',
    title: 'The Integument and the Skeleton',
    summary:
      'The body\u2019s armour-and-frame: the integument register (the epidermis\u2019s dermis\u2019s craft, the keratin arithmetic priced as the terrestrial receipt, the derivative census — the scale, feather, hair and gland registers, the moulting register shared with the arthropods); the skeleton census (the three answers — the hydrostatic\u2019s exoskeleton\u2019s endoskeleton crafts each priced by their scale-and-motion arithmetic); the vertebrate endoskeleton (the axial-and-appendicular craft, the skull-and-vertebral register, the homology receipt — the same-bone\u2019s-different-arc held as the evolution book\u2019s cross-reference); the bone craft (the compact-and-spongy honesty, the osteoblast-and-clast turnover, the marrow-and-haemopoietic register); and the joint census (the fibrous, cartilaginous and synovial crafts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Keratin Receipt and Derivative Census',
      'The Three Skeleton Answers Priced',
      'The Homology Receipt Held',
      'The Bone Turnover Craft',
      'Joints and the Musculoskeletal Disorders Register',
      'The Musculoskeletal Disorders: Myasthenia Gravis to Gout',
    ],
  },
  {
    number: 3,
    slug: 'digestive-register',
    title: 'The Digestive Register',
    summary:
      'The fuel architecture: the complete-gut receipt (the mouth-to-anus honesty with the regional specialisation arithmetic); the foregut adaptations (the ruminant\u2019s four-chamber craft — the cellulose-and-microbial symbiosis priced as the cross-reference to microbiology, the caecal register of the horse-and-rabbit); the mechanical alternatives (the gizzard\u2019s crop crafts of the birds-and-insects); the gland register (the salivary, liver-and-pancreas crafts — the enzyme\u2019s-chemistry owned at the physiology book\u2019s depth, the anatomy\u2019s-ducts here); the absorption craft (the villi\u2019s microvilli surface multiplier receipt); and the comparative register (the length-and-diet arithmetic — the herbivore\u2019s long honesty priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Complete-Gut Receipt Held',
      'The Ruminant Symbiosis Cross-Referenced',
      'The Gland\u2019s-Duct Register',
      'The Surface Multiplier Receipt',
    ],
  },
  {
    number: 4,
    slug: 'respiratory-circulatory',
    title: 'The Respiratory and Circulatory Registers',
    summary:
      'The gas\u2019s two engines: the respiratory census (the gill-and-lamellar craft with the countercurrent receipt priced as the most-efficient exchange in the sea, the tracheal\u2019s direct-delivery honesty of the insects, the lung\u2019s alveolar arithmetic — the bird\u2019s air-sac register as the flow-through crown); the circulatory census (the open-and-haemocoel honesty against the closed-and-pressure arithmetic; the heart\u2019s arc — the two-chamber fish, the three-chamber amphibian with the mixed-flow honesty, the four-chamber crocodile-and-bird-and-mammal crown; the double-circuit craft); the vessel census (the artery\u2019s vein\u2019s capillary crafts — the exchange register); and the blood register (the haemoglobin\u2019s cooperative honesty named with the physiology book owning the depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Countercurrent Gill Receipt',
      'The Tracheal-and-Alveolar Crafts',
      'The Heart\u2019s Arc and Double Circuit',
      'The Exchange Register Named',
    ],
  },
  {
    number: 5,
    slug: 'excretory-nervous',
    title: 'The Excretory and Nervous Registers',
    summary:
      'The waste-and-wire crafts: the excretory arc (the flame-cell\u2019s protonephridial beginning, the metanephridial register, the Malpighian tubule-and-hindgut craft of the insects, the vertebrate nephron — the Bowman\u2019s glomerular architecture with the physiology book owning the mechanism); the nervous arc (the nerve-net\u2019s diffuse honesty of the cnidarian, the ladder register of the flatworm, the cephalisation arc — the brain\u2019s front-end receipt priced straight as the directed-life consequence, the vertebrate brain\u2019s hindbrain-midbrain-forebrain census named at the anatomical level); and the sense register (the chemo, mechano and photo crafts — the statocyst-and-gravity receipt, the vertebrate\u2019s camera eye against the insect\u2019s compound honesty held as the two answers).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Flame-Cell-to-Nephron Arc',
      'The Cephalisation Arc Priced Straight',
      'The Brain\u2019s Census Named',
      'The Two-Eyes Honesty Held',
    ],
  },
  {
    number: 6,
    slug: 'endocrine-reproductive-anatomy',
    title: 'The Endocrine-and-Reproductive Anatomy',
    summary:
      'The chemical-and-generational registers: the endocrine register (the ductless census — the pituitary, thyroid, adrenal and gonadal glands named at the anatomical level with the physiology book owning the hormonal arithmetic); the reproductive anatomy (the ovary-and-follicular register, the testis-and-seminiferous craft, the duct-and-accessory census, the cloaca\u2019s specialised honesty); the reproductive strategies (the external-against-internal register — the aquatic\u2019s terrestrial receipts, the amniote egg cross-referenced from the diversity book); the hermaphroditic honesty (the simultaneous-and-sequential registers — the wrasse-and-protogynous receipt priced); and the gamete craft (the sperm\u2019s ovum-and-architecture named at the anatomical level).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ductless Census Named',
      'The Gonad\u2019s Duct Crafts',
      'The Two Fertilisation Registers',
      'The Sequential Honesty Priced',
    ],
  },
  {
    number: 7,
    slug: 'comparative-method-doorway',
    title: 'The Comparative Register and the Doorway',
    summary:
      'The discipline-and-own craft: the comparative method (the homology-against-analogy distinction fixed once — the structure\u2019s ancestry against the function\u2019s convergence; the serial-repetition register named); the vertebrate\u2019s comparative arc (the fish-to-mammal systems walked once — each system\u2019s changing receipts priced by the evidence); the anatomical method (the dissection\u2019s craft and its ethics — the respect\u2019s honesty priced straight; the section-and-imaging crafts named, the skeletal clearing register); and the doorway — to the physiology book for the mechanism\u2019s register, to the medical shelf\u2019s anatomy for the human clinic, to the evolution book for the tree\u2019s logic that makes the comparison meaningful; the body held as the adaptation\u2019s record.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Homology-Analogy Distinction Fixed',
      'The Systems\u2019 Arc Walked Once',
      'The Dissection Ethics Priced Straight',
      'The Adaptation\u2019s Record Held',
    ],
  },
]

export const animalAnatomy: Book = {
  id: 'animal-anatomy',
  title: 'Animal Anatomy',
  subtitle: 'The animal body opened — tissues, systems and the comparative register',
  discipline: 'biology',
  level: 'Undergraduate zoology core (the Hickman activity arc)',
  description: 'The anatomical discipline for the whole kingdom: the tissue register first (the epithelium\u2019s covering-and-glandular crafts, the connective matrix\u2019s collagen versatility, the three-muscle census, the neuron-and-glial architecture — the four-tissue census each priced by its variant arithmetic); the integumentary-and-skeletal register (the keratin-and-terrestrial receipt, the hydrostatic-and-exoskeleton-and-endoskeleton three answers, the vertebrate\u2019s axial-and-appendicular craft with the bone\u2019s turnover arithmetic and the homology receipt held); the systems\u2019 comparative register (the complete-gut\u2019s ruminant\u2019s symbiosis crafts, the gill\u2019s lung-and-tracheal census with the countercurrent receipt, the open-against-closed-and-two-against-four-chamber honesty, the flame-cell-to-nephron arc, the nerve-net-to-brain cephalisation register with the two-eyes honesty); the reproductive anatomy (the gonad-and-duct crafts, the two fertilisation registers); and the comparative-and-method register (the dissection craft and its ethics priced straight, the homology\u2019s-against-analogy distinction fixed once).',
  status: 'planned',
  accent: ['#9333ea', '#581c87'],
  chapters,
}
