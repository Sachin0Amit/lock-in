import type { Book, Chapter } from '../../../types'

/**
 * Developmental Biology — the twentieth book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `devb-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Developmental Biology owns the ontogeny register for the whole library. The human clinical embryology belongs to the medical shelf’s anatomy-and-obstetrics books; the plant’s development to plant-physiology; the genetic machinery to molecular-biology-and-genetics (cross-referenced at the shared levels); the NCERT-and-NEET lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Gilbert’s Developmental Biology named as the university pole (the fertilisation-through-evo-devo arc).
 * - Wolpert’s Principles of Development named as the readable co-pole (the pattern-formation register).
 * - The NCERT class 12 human-reproduction chapter as the school ladder (the NEET register).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'fertilisation-cleavage',
    title: 'The Fertilisation and the Cleavage',
    summary:
      'The beginning\u2019s two crafts: the sperm\u2019s journey (the capacitation named, the acrosomal reaction\u2019s bindin-and-lock receipt); the blocks\u2019 register (the fast electrical and the slow enzymatic crafts — the polyspermy\u2019s one-sperm arithmetic priced straight); the cleavage register (the holoblastic-and-meroblastic census — the sea urchin\u2019s equal honesty against the bird-and-discoblastic register, the yolk\u2019s constraint priced by the cleavage-plane arithmetic); and the determinant-against-indeterminate register (the tunicate-and-mosaic receipt priced straight against the regulative honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Acrosome\u2019s Lock-and-Key Receipt',
      'The Two Blocks\u2019 One-Sperm Arithmetic',
      'The Yolk\u2019s Constraint Honesty',
      'The Mosaic-and-Regulative Registers Held',
      'The Human Reproductive Systems and Gametogenesis',
      'The Menstrual Cycle, Pregnancy, Parturition and Lactation',
      'Reproductive Health: Contraception, MTP and Assisted Reproduction',
      'Gametogenesis: Spermatogenesis and Oogenesis',
      'From Zygote to Blastocyst: Implantation',
      'Reproductive Health: STDs, Contraception, MTP and Amniocentesis',
      'Infertility and the Assisted Reproductive Technologies: IVF, ZIFT, GIFT',
      'Birth Control and Its Methods',
      'Reproduction: The Modes and Strategies',
      'Pregnancy and the Placenta',
      'Sexually Transmitted Diseases and Their Prevention',
    ],
  },
  {
    number: 2,
    slug: 'gastrulation-germ-layers',
    title: 'The Gastrulation and the Germ Layers',
    summary:
      'The body\u2019s three-floor architecture: the movement census (the invagination, involution, ingression, delamination and epiboly registers each priced by its receipt); the germ-floor register (the ectoderm\u2019s epidermal-and-neural fate, the mesoderm\u2019s notochordal-and-coelomic crafts, the endoderm-and-gut register); the amphibian-and-blastopore register named; the organizer\u2019s receipt (the Spemann-and-induction craft priced as the secondary-body receipt — the dorsal lip\u2019s own honesty); and the neurulation register (the plate\u2019s fold-and-tube crafts, the crest-and-fourth craft named — the vertebrate head\u2019s receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Movement Census by Receipt',
      'The Three Floors Named by Fate',
      'The Organizer\u2019s Induction Receipt',
      'The Crest\u2019s Fourth Craft Named',
    ],
  },
  {
    number: 3,
    slug: 'pattern-formation',
    title: 'The Pattern Formation Register',
    summary:
      'The body\u2019s coordinates: the morphogen gradient honesty (the Bicoid receipt — the French-flag arithmetic priced by the thresholds-and-one-gradient honesty); the Turing register named (the reaction-diffusion pattern arithmetic at survey depth — the zebra\u2019s stripe as the hypothesis-and-own register); the segmentation register (the Drosophila\u2019s gap, pair-rule and segment-polarity hierarchy priced as the clock-and-wave craft); the limb\u2019s register (the AER-and-outgrowth receipt, the ZPA\u2019s mirror honesty — the SHH-and-TBX registers named at survey depth); and the apoptosis register (the sculpting honesty — the interdigital receipt priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The French-Flag Arithmetic Priced',
      'The Turing Register Named',
      'The Hierarchy as Clock-and-Wave',
      'The Sculpting Receipt Held',
    ],
  },
  {
    number: 4,
    slug: 'organogenesis-induction',
    title: 'The Organogenesis and Induction Register',
    summary:
      'The organs\u2019 making: the induction craft (the competence\u2019s responder-window honesty — the one-signal\u2019s-two-answers register named); the eye\u2019s receipt (the optic vesicle\u2019s lens induction arc — the lens fibre-and-crystallin register); the kidney\u2019s register (the metanephric induction\u2019s branching crafts named); the gonadal register (the SRY\u2019s one-gene honesty priced straight — the testis\u2019s ovary fork); and the environment\u2019s register (the temperature-dependent reptile craft and the aromatase\u2019s pollutant honesty named as the environment\u2019s own developmental register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Competence Window Register',
      'The Lens Induction Arc Held',
      'The Branching Crafts Named',
      'The One-Gene Honesty Priced Straight',
    ],
  },
  {
    number: 5,
    slug: 'stem-regeneration',
    title: 'The Stem Cells and the Regeneration Register',
    summary:
      'The potency-and-repair registers: the stem craft census (the totipotent\u2019s pluripotent\u2019s multi-and-oligo registers — the niche-and-own craft priced as the stemness-and-own register); the iPS receipt (the Yamanaka\u2019s four-factor honesty — the reprogramming-and-Nobel receipt priced straight); the regeneration register (the hydra\u2019s constitutive foot-and-head craft, the planarian-and-neoblast receipt — the one-cell\u2019s honesty priced by the irradiation experiment, the salamander\u2019s limb-and-blastema register); and the medical doorway named (the therapy\u2019s promise-and-ethics cross-referenced to biotechnology\u2019s own chapter).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Potency Census Priced',
      'The Niche\u2019s Own Register',
      'The Four-Factor Nobel Receipt',
      'The Blastema Register Named',
    ],
  },
  {
    number: 6,
    slug: 'metamorphosis-life-histories',
    title: 'The Metamorphosis and Life Histories',
    summary:
      'The two-body strategy: the metamorphosis register (the amphibian\u2019s thyroid commitment receipt — the go-and-no-go honesty priced by the thyroxine threshold, the insect\u2019s ecdysone-and-JH registers cross-referenced to entomology — the status-quo-and-keep craft); the life-history register (the direct-against-indirect honesty — the larva\u2019s dispersal-and-ecological receipt); the heterochrony register (the paedogenesis\u2019s progenesis\u2019s neoteny-and-registers named — the axolotl\u2019s honesty priced straight); and the complex life-cycle register (the alternation\u2019s honesty priced straight with the parasitology book\u2019s own cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thyroid\u2019s Commitment Receipt',
      'The Ecdysone-and-JH Registers',
      'The Heterochrony Registers Named',
      'The Alternation Honesty Held',
    ],
  },
  {
    number: 7,
    slug: 'evo-devo-crown',
    title: 'The Evo-Devo Crown',
    summary:
      'The discipline-and-unifying register: the Hox code (the colinearity receipt — the gene order\u2019s body order\u2019s honesty priced as the genome-and-own register); the deep homology register (the Pax6\u2019s universal-eye receipt — the mouse\u2019s-gene-in-the fly honesty priced straight); the modularity-and-co-option register (the feather\u2019s arc priced as the new-structure\u2019s-old-gene honesty); and the doorway (the evo-devo\u2019s promise held honestly — the form\u2019s evolution integrated with the gene\u2019s regulation, the discipline\u2019s own crown).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Colinearity Receipt Priced',
      'The Pax6 Universal Eye Receipt',
      'The New-Old-Gene Honesty',
      'The Integration Named as the Crown',
    ],
  },
]

export const developmentalBiology: Book = {
  id: 'developmental-biology',
  title: 'Developmental Biology',
  subtitle: 'How a single cell becomes a body — fertilisation, pattern formation, stem cells and evo-devo',
  discipline: 'biology',
  level: 'Undergraduate → research doorway (the Gilbert register)',
  description: 'The ontogeny discipline: the beginning (the fertilisation-and-acrosomal receipt with the two-blocks\u2019 one-sperm arithmetic, the cleavage\u2019s yolk\u2019s constraint honesty with the mosaic-against-regulative registers); the body\u2019s architecture (the gastrulation-and-movement census, the three germ floors, the organizer-and-induction receipt, the neural-and-crest crafts); the pattern formation register (the morphogen gradient honesty — the Bicoid\u2019s French-flag arithmetic, the gap\u2019s pair-rule hierarchy priced as the clock-and-wave craft, the Turing reaction-diffusion register named, the limb\u2019s AER-and-ZPA receipts); the organogenesis (the eye\u2019s lens induction arc, the competence window register); the stem-and-regeneration register (the potency census, the niche-and-own register, the Yamanaka\u2019s four-factor receipt priced straight, the hydra\u2019s planarian\u2019s salamander\u2019s constitutive-and-blastema registers); the metamorphosis-and-life-history register (the thyroid-and-commitment receipt, the heterochrony-and-registers named); and the evo-devo crown (the Hox colinearity receipt, the Pax6\u2019s universal-eye honesty, the deep homology priced straight).',
  status: 'planned',
  accent: ['#e11d48', '#4c0519'],
  chapters,
}
