import type { Book, Chapter } from '../../../types'

/**
 * Reinforcement Learning — the thirty-fourth book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `rl-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Artificial Intelligence owns the
 * MDP-as-decision-theory ground (this book is the learning half — the
 * environment\u2019s model unknown); the probability belongs to the
 * Mathematics shelf; the deep function approximation belongs to Deep
 * Learning (cross-referenced for the engine).
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Sutton-Barto on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Sutton & Barto, 'Reinforcement Learning: An
 *   Introduction' 2e (incompleteideas.net — Part I tabular solution
 *   methods: evaluative feedback, finite MDPs, DP, Monte Carlo, TD;
 *   Part II approximate solutions: on-policy prediction, control,
 *   planning and learning; Part III the psychology/neuroscience and
 *   case-study chapters).
 * - Syllabus audit: the standard graduate RL course registers.
 * - Exam types: value/policy-iteration traces + small-bandit arithmetic.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-learning-agent-recalled',
    title: 'The Learning Agent, Recalled',
    summary:
      'The problem framed: the MDP recalled from Artificial Intelligence (cross-referenced) and the reinforcement-learning question stated as its learning half — the agent that must act while it still does not know the environment, the exploration/exploitation trade priced on a real bandit.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Acting While Still Not Knowing',
      'The Exploration Trade Priced',
      'The Vocabulary: Policy, Return and Discount',
    ],
  },
  {
    number: 2,
    slug: 'evaluative-feedback-and-bandits',
    title: 'Evaluative Feedback and Bandits',
    summary:
      'The k-armed bandit as the minimal world: the greedy agent\u2019s disease priced on a real run, the action-value methods computed (the sample-average trace), the optimistic initialization trick priced, and the exploration census (epsilon-greedy compared with the UCB discipline derived — the confidence arithmetic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Greedy Disease',
      'UCB Derived',
      'The Bandit Census',
    ],
  },
  {
    number: 3,
    slug: 'tabular-solutions-dp-and-monte-carlo',
    title: 'Tabular Solutions: DP and Monte Carlo',
    summary:
      'The model\u2019s two regimes: dynamic programming recalled as the known-model pole (policy and value iteration traced — AI\u2019s chapter cross-referenced), Monte Carlo\u2019s model-free discipline (the first-visit estimator traced on a small episode set, the policy-evaluation craft), and the two-regime honesty — what knowing the model is worth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Known-Model Pole',
      'Monte Carlo\u2019s First-Visit Trace',
      'What Knowing the Model Is Worth',
    ],
  },
  {
    number: 4,
    slug: 'temporal-difference',
    title: 'Temporal-Difference Learning',
    summary:
      'The field\u2019s core idea: TD prediction traced (the bootstrap update computed on a worked walk — why it learns before the episode ends), the SARSA/Q-learning pair derived and compared (the on-policy/off-policy distinction priced on the cliff), and the n-step/architecture-census echo (eligibility traces named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bootstrap Update Computed',
      'SARSA versus Q-Learning, Priced on the Cliff',
      'Eligibility Traces, Named',
    ],
  },
  {
    number: 5,
    slug: 'approximate-solutions',
    title: 'Approximate Solutions',
    summary:
      'Scaling beyond tables: the function-approximation contract (the semi-gradient honesty — why it can diverge, stated plainly), the on-policy prediction/control craft at scale, the policy-gradient family derived (the likelihood-ratio trick computed, REINFORCE traced through a worked step — the Actor echo named), and the Q-family\u2019s deep echo priced (the replay/target tricks — Deep Learning cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Semi-Gradient Honesty',
      'REINFORCE Traced',
      'The Deep Q Echo Priced',
    ],
  },
  {
    number: 6,
    slug: 'planning-learning-and-the-modern-rl-census',
    title: 'Planning, Learning and the Modern Census',
    summary:
      'The wider discipline: planning and learning combined (the model-based pole — Dyna traced, the simulation census), the RLHF echo recalled from Generative AI (the modern application that made the field famous — the reward model\u2019s proxy disease cross-referenced), and the modern census named honestly (the PPO/TRPO discipline\u2019s clipping logic, the offline question).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Dyna Traced',
      'The RLHF Echo Recalled',
      'The PPO Clipping Logic',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The field on one page (bandit → tabular → TD → approximate → planning with the two-regime spine through them), the craft census (value/policy traces and bandit arithmetic at exam level), and the doorsteps — the modern alignment application\u2019s craft, the research frontier (the general-agent question) named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field on One Page',
      'The Craft Census',
      'The Doorsteps: Alignment and the General Agent',
    ],
  },
]

export const reinforcementLearning: Book = {
  id: 'reinforcement-learning',
  title: 'Reinforcement Learning',
  subtitle: 'Learning to act — from the bandit\u2019s trade to the bootstrap discipline',
  discipline: 'computer-science',
  level: 'First RL course → the modern-RL census doorstep',
  description:
    'The RL home on the Sutton-Barto 2e arc. The learning agent recalled with the exploration trade priced on a real bandit; evaluative feedback — the greedy disease, sample-average traces, UCB derived; tabular solutions — the known-model DP pole with Monte Carlo\u2019s first-visit discipline traced; temporal difference — the bootstrap update computed on a worked walk, SARSA/Q-learning priced on the cliff, eligibility traces named; approximate solutions — the semi-gradient honesty, REINFORCE traced through a worked step, the deep Q echo; planning and learning combined (Dyna traced) with the RLHF echo recalled and the PPO clipping logic named; and the two-regime map. Cross-references Artificial Intelligence (the MDP ground) and Deep Learning (the engine); hands off to Generative AI\u2019s alignment application and the general-agent frontier.',
  status: 'planned',
  accent: ['#065f46', '#064e3b'],
  chapters,
}
