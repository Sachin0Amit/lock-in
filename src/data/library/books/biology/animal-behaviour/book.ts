import type { Book, Chapter } from '../../../types'

/**
 * Animal Behaviour — the twenty-first book of the Biology shelf (the zoology register).
 *
 * STATUS: PLANNED (Biology full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 21 planned lessons, zero written. Lesson ids will use the `etho-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Animal Behaviour owns the behaviour register for the whole library. The human psychological register belongs to the humanities shelf’s psychology (cross-referenced at the shared learning level — the sibling views); the insect’s depth to entomology; the neural machinery to animal-physiology; the evolutionary logic to evolution; the NCERT-and-NEET lines are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Alcock’s Animal Behaviour named as the university pole (the four-questions register).
 * - Tinbergen’s The Study of Instinct named as the founding pole (the four-questions arc as the discipline’s own frame).
 * - The NCERT class 11-12 lines as the school ladder.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'mechanism-register',
    title: 'The Mechanism Register',
    summary:
      'The how of the four: the fixed-action craft (the sign stimulus\u2019s honesty — the goose-and-egg receipt priced straight, the releaser register named); the neural-and-hormonal machinery (the command-centre register named at survey depth, the hormonal modulation — the seasonal\u2019s honesty); the learning census (the habituation\u2019s first honesty, the Lorenz-and-imprinting receipt — the goose\u2019s-critical-window arc, the associative crafts — the Pavlov\u2019s classical and the Skinner-and-operant registers cross-referenced to the psychology book for the human depth); and the memory register (the foraging bee-and-dance receipt — the von Frisch\u2019s arc priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sign-Stimulus Craft Held',
      'The Hormonal Modulation Named',
      'The Learning Census with the Lorenz Receipt',
      'The Dance Receipt Priced Straight',
      'That they helped guide to completion. We, of course, II BIOENERGETICS AND METABOLISM'
    ],
  },
  {
    number: 2,
    slug: 'development-register',
    title: 'The Development Register',
    summary:
      'The ontogeny of behaviour: the critical-window register (the imprinting\u2019s irreversibility priced straight — the window\u2019s honesty); the bird-song craft (the tutor-and-template honesty — the isolate\u2019s receipt, the sensory period register); the social development register (the play-as-practice honesty, the social facilitation named); the genotype-environment register (the innate-against-learned honesty held straight — the interaction-and-own register); and the canalisation named at survey depth (the buffering\u2019s honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Imprinting\u2019s Window Honesty',
      'The Tutor-and-Template Craft',
      'The Play-as-Practice Honesty',
      'The Interaction Register Held Straight',
    ],
  },
  {
    number: 3,
    slug: 'function-register',
    title: 'The Function Register',
    summary:
      'The adaptive why: the foraging arithmetic (the optimal register — the marginal-value craft: the leave\u2019s stay honesty priced by the gain curve); the predator register (the vigilance\u2019s many-eyes receipt, the dilution register, the selfish-herd honesty priced straight); the habitat selection named (the marginal honesty); the mating systems register (the parental-investment arithmetic — the Trivers receipt, the polygyny\u2019s polyandry-and-monogamy census priced by the PI dial); and the conflict registers named (the parent-offspring and the sexual-conflict crafts at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Marginal-Value Arithmetic Held',
      'The Many-Eyes and Dilution Receipts',
      'The PI Dial and Mating Census',
      'The Conflict Registers Named',
      'Courtship, Mating and Territoriality',
    ],
  },
  {
    number: 4,
    slug: 'evolution-register',
    title: 'The Evolution Register',
    summary:
      'The phylogeny of behaviour: the kin arithmetic (the Hamilton\u2019s rule — the rB-C honesty priced by the inclusive-fitness register, the ground-squirrel\u2019s alarm-call kin-bias receipt priced straight); the eusociality register (the haplodiploid receipt — the three-quarters honesty priced, the termites\u2019 multiple-route honesty held); the reciprocal register (the vampire\u2019s blood-sharing receipt — the Prisoner\u2019s-Dilemma arithmetic named); the honest-signalling register (the handicap\u2019s principle — the gazelle\u2019s stott priced as the honest-cost register, the deception register named); and the culture register named (the whale\u2019s song and the chimp\u2019s tool crafts at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hamilton Rule Priced by Inclusive Fitness',
      'The Haplodiploid Receipt Held with Its Routes',
      'The Dilemma Arithmetic Named',
      'The Honest-Cost Register Held',
      'Communication and Pheromones',
    ],
  },
  {
    number: 5,
    slug: 'methods-ethics-doorway',
    title: 'The Methods, Ethics and Doorway',
    summary:
      'The discipline-and-own craft: the ethogram (the behaviour-and-census register — the defined-category honesty); the methods register (the observation\u2019s ad-libitum against the focal-and-scan crafts, the experiment\u2019s control honesty priced straight, the comparative method — the phylogeny-and-own register); the welfare-and-ethics register (the Three-R receipt priced straight — the replacement, reduction and refinement crafts); and the doorway — to the psychology book for the human register, to entomology for the insect depth, to ecology for the population consequence; the four questions held as the honest frame: mechanism, development, function, evolution — each a separate answer, together the complete one.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ethogram\u2019s Census Craft',
      'The Control Honesty Priced Straight',
      'The Three-R Receipt Held',
      'The Four Questions Held as the Frame',
    ],
  },
]

export const animalBehaviour: Book = {
  id: 'animal-behaviour',
  title: 'Animal Behaviour',
  subtitle: 'Why animals do what they do — mechanisms, ecology, evolution and the four questions',
  discipline: 'biology',
  level: 'Undergraduate zoology (the Tinbergen register)',
  description: 'The behaviour discipline by its own four questions: the mechanism register (the fixed-action\u2019s sign-stimulus receipt, the neural-and-hormonal machinery, the learning census — the habituation, the Lorenz-and-imprinting receipt, the associative\u2019s classical-and-operant crafts cross-referenced to the psychology book for the human depth, the bee\u2019s dance-and-memory receipts priced straight); the development register (the critical-window honesty, the bird-song\u2019s tutor-and-template craft, the play-as-practice register, the innate-against-learned interaction held straight); the function register (the foraging\u2019s optimal arithmetic — the marginal-value register, the vigilance\u2019s dilution group crafts, the mating systems\u2019 parental-investment arithmetic — the Trivers receipt); the evolution register (the Hamilton\u2019s kin arithmetic with the haplodiploid eusociality receipt, the reciprocal\u2019s Prisoner\u2019s-Dilemma honesty, the honest-signalling-and-handicap craft); and the methods-and-ethics register (the ethogram\u2019s craft, the control\u2019s honesty, the comparative method, the Three-R welfare receipt priced straight).',
  status: 'planned',
  accent: ['#f59e0b', '#78350f'],
  chapters,
}
