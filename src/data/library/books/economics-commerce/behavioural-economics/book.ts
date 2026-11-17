import type { Book, Chapter } from '../../../types'

/**
 * Behavioural Economics — the ninth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `behav-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Behavioural Economics owns the frontier register (the newest shelf line — not a classical UGC NET unit; priced honestly as the frontier). Microeconomics owns the rational baseline it critiques; financial-economics and investment-analysis own the finance-side applications; public-economics owns the policy side of the nudge register — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kahneman, Thinking, Fast and Slow (the canonical arc named) and Thaler's Misbehaving named as the two founding registers.
 * - The experimental-methods register told with the replication-crisis honesty the book carries openly.
 * - The shelf's microeconomics book cross-referenced as the baseline this book critiques.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-baseline-and-critique',
    title: 'The Rational Baseline and Its Critique',
    summary:
      'The homo-economicus baseline stated fairly before critique; the revealed-preference inheritance told; the systematic-versus-random error distinction as the critique\u2019s crux; and the dual-system frame introduced — the fast and slow engines.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Baseline Stated Fairly',
      'The Revealed Inheritance',
      'The Systematic Error Crux',
      'The Two Engines',
    ],
  },
  {
    number: 2,
    slug: 'heuristics-and-biases',
    title: 'Heuristics and Biases',
    summary:
      'The anchoring register with its arithmetic; availability\u2019s memory bias; representativeness and the base-rate neglect told; the conjunction fallacy worked; and the bias census consolidated with its honest limits — biases-about-biases priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anchoring Register',
      'The Availability Bias',
      'The Base-Rate Neglect',
      'The Census Limits',
    ],
  },
  {
    number: 3,
    slug: 'prospect-theory',
    title: 'Prospect Theory',
    summary:
      'The reference-dependence idea as the frame\u2019s revolution; loss aversion\u2019s arithmetic — the kinked value function; the diminishing-sensitivity register; the fourfold pattern told; and prospect against expected utility priced as the descriptive-and-normative distinction.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reference Revolution',
      'The Kinked Arithmetic',
      'The Fourfold Pattern',
      'Descriptive versus Normative',
    ],
  },
  {
    number: 4,
    slug: 'time-and-self-control',
    title: 'Time and Self-Control',
    summary:
      'The hyperbolic-discounting register against the exponential baseline; present bias told with the snack-and-savings cases; the commitment-device census; the planning-and-hot-cold empathy gaps; and the welfare question honestly opened — is present bias a mistake?',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hyperbolic Register',
      'The Commitment Census',
      'The Empathy Gaps',
      'The Welfare Question',
    ],
  },
  {
    number: 5,
    slug: 'social-preferences',
    title: 'Social Preferences',
    summary:
      'The ultimatum-and-dictator experiments read; fairness\u2019s inequality-aversion arithmetic told; trust-and-reciprocity registers priced; the public-goods contribution honesty; and the social-norm register told as the policy side\u2019s quiet engine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ultimatum Read',
      'The Inequality Arithmetic',
      'The Trust Registers',
      'The Norm Engine',
    ],
  },
  {
    number: 6,
    slug: 'nudge-and-choice-architecture',
    title: 'Nudge and Choice Architecture',
    summary:
      'The choice-architecture craft told — defaults, friction and the feedback register; the libertarian-paternalism framing priced honestly with its critics; the nudge-unit cases named; the ethics register told fairly — autonomy against welfare; and the public-economics book\u2019s policy doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Architecture Craft',
      'The Framing and Its Critics',
      'The Unit Cases',
      'The Ethics Register',
    ],
  },
  {
    number: 7,
    slug: 'experimental-doorway',
    title: 'The Experimental Doorway',
    summary:
      'The lab-and-field experiment craft told — design, treatment and the honesty of randomisation; the replication crisis told openly as the discipline\u2019s self-audit; the behavioural-finance application register previewed; and the research doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Experimental Craft',
      'The Replication Honesty',
      'The Finance Preview',
      'The Research Doorway',
    ],
  },
]

export const behaviouralEconomics: Book = {
  id: 'behavioural-economics',
  title: 'Behavioural Economics',
  subtitle: 'The human agent: heuristics, biases and the nudge register — the frontier critique of the rational actor',
  discipline: 'economics-commerce',
  level: 'University frontier register + general reader',
  description: 'The behavioural register: the rational-agent baseline and its honest critique, the heuristics-and-biases census, prospect theory\u2019s loss-aversion arithmetic, the time-and-self-control register with present bias, social preferences\u2019 fairness-and-trust experiments, the nudge-and-choice-architecture policy craft, and the experimental-methods doorway. Cross-references microeconomics (the rational-agent base it departs from) and psychology (the humanities shelf); hands off honestly.',
  status: 'planned',
  accent: ['#fbbf24', '#78350f'],
  chapters,
}
