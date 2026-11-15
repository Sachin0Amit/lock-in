import type { Book, Chapter } from '../../../types'

/**
 * Artificial Intelligence — the twenty-eighth book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `ai-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the probabilistic mathematics
 * belongs to the Mathematics shelf\u2019s Probability Theory (cross-referenced
 * and used fluently); Machine Learning owns the learning algorithms;
 * NLP/Computer Vision/GenAI own their perception and generation arcs —
 * this book owns AIMA\u2019s classic spine: search, knowledge, planning, the
 * agent discipline that organizes the family.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no AIMA on the Drive (honest
 *   note — Goodfellow DL is the Drive\u2019s AI-family resident).
 * - Web-checked 2026-11-15: Russell & Norvig, 'AI: A Modern Approach'
 *   4e US — the full TOC at aima.cs.berkeley.edu (Part I AI; II
 *   Problem-solving; III Knowledge, reasoning and planning; IV Uncertain
 *   knowledge and reasoning; V Learning; VI Communicating, perceiving
 *   and acting; VII Conclusions).
 * - Syllabus audit: the standard university AI course registers (GATE\u2019s
 *   AI section rides the ML book more).
 * - Exam types: search-tracing questions (A-star/minimax tables) +
 *   logic/inference problems + university AI problem sets.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 10 classic-GOFAI census
 *   audited against this plan — seven planned lessons added (the Turing
 *   test, the multi-agent question, the GA cycle named with its operators,
 *   the GOFAI representation census, expert systems, the planning zoo,
 *   fuzzy sets) and the formulation lesson renamed to name the state
 *   space. The routing/verdict record is docs/research/
 *   CS_EXAM_TOPIC_LEDGER.md; the standing gate is scripts/
 *   verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-agent-discipline',
    title: 'The Agent Discipline',
    summary:
      'The field\u2019s organizing idea: rationality defined honestly (the Turing test priced against the rational-agent view — what each actually measures; the environment\u2019s census — fully/partially observable, deterministic/stochastic, the PEAS discipline), agent architectures as programs, the multi-agent question named (agent communication languages, the semantic-web echo, knowledge sharing through ontologies — Distributed Systems takes the deep treatment), and AI\u2019s history priced as the two rivers (logic and learning) that later reunite — the book\u2019s map stated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rationality and the Environment Census',
      'The Turing Test, Priced Honestly',
      'Agent Architectures as Programs',
      'Many Agents: Communication and the Semantic Web',
      'The Two Rivers of AI History',
    ],
  },
  {
    number: 2,
    slug: 'search-the-solving-machine',
    title: 'Search: the Solving Machine',
    summary:
      'Problem-solving as search: the problem formulation discipline (the state space and its states, actions, the goal test — priced on real puzzles), uninformed search traced (BFS, DFS, uniform-cost with their completeness/optimality/cost census), and informed search — A* derived with its admissibility PROVED (the heuristic\u2019s honesty contract).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Problem Formulation: the State Space',
      'The Uninformed Census',
      'A* Derived, Admissibility Proved',
    ],
  },
  {
    number: 3,
    slug: 'searching-in-complex-worlds',
    title: 'Searching in Complex Worlds',
    summary:
      'The harder search world: local search and the heuristic landscape (hill-climbing\u2019s local-maximum disease, simulated annealing named with its schedule), evolutionary search — the genetic algorithm cycle priced (encoding strategies, the genetic operators of selection, crossover and mutation, fitness functions), adversarial search (game playing with minimax traced, alpha-beta pruning PROVED sound, the evaluation-function craft), and constraint satisfaction (backtracking, the arc-consistency discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Heuristic Landscape',
      'Evolutionary Search: the Genetic Algorithm Cycle',
      'Minimax and Alpha-Beta, Proved Sound',
      'Constraint Satisfaction\u2019s Discipline',
    ],
  },
  {
    number: 4,
    slug: 'logic-and-representation',
    title: 'Logic and Representation',
    summary:
      'Knowledge as the agent\u2019s content: propositional logic\u2019s inference engine (the resolution discipline traced — Mathematical Logic cross-referenced), first-order logic\u2019s expressiveness priced on the representation craft, the classic GOFAI representation census (semantic networks, frames, scripts, conceptual dependency graphs and ontologies — what each buys and what it costs), and the inference census (forward versus backward chaining traced through real rule systems; expert systems priced as the production-machine discipline with uncertainty handled honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Resolution Traced',
      'First-Order Expressiveness Priced',
      'The GOFAI Census: Semantic Networks, Frames, Scripts',
      'Expert Systems and Forward versus Backward Chaining',
    ],
  },
  {
    number: 5,
    slug: 'planning-the-acting-agent',
    title: 'Planning: the Acting Agent',
    summary:
      'From knowledge to action: classical planning\u2019s representation (STRIPS\u2019 states and actions), the planning-as-search discipline, the planning zoo beyond the classical strip (goal-stack planning, hierarchical task networks, partial-order planning with its linear and non-linear honest trade), the plans\u2019 quality question, and the execution honesty — monitoring and replanning named as the bridge to real robots.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Classical Representation',
      'Planning as Search',
      'The Planning Zoo: Goal Stack, Hierarchical, Partial Order',
      'Monitoring and Replanning',
    ],
  },
  {
    number: 6,
    slug: 'uncertain-knowledge-and-reasoning',
    title: 'Uncertain Knowledge and Reasoning',
    summary:
      'Acting under uncertainty two ways: probability as the rational agent\u2019s language (Probability Theory cross-referenced — Bayes\u2019 rule priced on real diagnosis; Bayesian networks\u2019 inference discipline — the independence craft made structural) and fuzziness as the degree-based alternative (fuzzy sets with their membership functions, fuzzification and defuzzification, fuzzy rules and fuzzy inference, the fuzzy-control systems census), plus the utility discipline — the rational agent composed into decision theory\u2019s shape.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bayes Priced on Real Diagnosis',
      'Bayesian Networks\u2019 Inference',
      'Fuzzy Sets: Membership, Rules and Inference',
      'Utility: the Rational Composition',
    ],
  },
  {
    number: 7,
    slug: 'making-decisions-over-time',
    title: 'Making Decisions over Time',
    summary:
      'The sequential world: Markov decision processes defined (states, actions, the reward contract), the value/policy discipline (value iteration traced on a small grid), reinforcement learning\u2019s doorway (the exploration question named — the Reinforcement Learning book\u2019s doorstep), and game-theoretic agents named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The MDP Defined',
      'Value Iteration Traced',
      'The RL Doorway',
    ],
  },
  {
    number: 8,
    slug: 'perception-and-communication-named',
    title: 'Perception and Communication, Named',
    summary:
      'The sensory rivers\u2019 doorsteps: the perception census (the vision and language worlds named honestly with their books\u2019 doorsteps — Computer Vision, NLP, the Deep Learning engine beneath them), robotics\u2019 discipline (the sense-plan-act loop priced on real machines), and the philosophy chapter\u2019s honest questions (the alignment echo named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Perception Doorsteps',
      'The Robotics Loop',
      'The Philosophical Questions',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The field on one page (agent → search → knowledge → uncertainty → decision with the disciplines beside), the craft census (A* tables, minimax trees, inference traces at exam level), and the doorsteps — Machine Learning\u2019s data engines, the perception family\u2019s books, and the modern agent era (the LLM agents named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field on One Page',
      'The Craft Census',
      'The Doorsteps: Learning, Perception, Agents',
    ],
  },
]

export const artificialIntelligence: Book = {
  id: 'artificial-intelligence',
  title: 'Artificial Intelligence',
  subtitle: 'The classic spine — rational agents from search to uncertainty',
  discipline: 'computer-science',
  level: 'First AI course → the perception and learning doorsteps',
  description:
    'The AIMA 4e arc on the shelf. The agent discipline (rationality, the environment census, the two-river history); search — problem formulation, the uninformed census, A* derived with admissibility PROVED; complex-world search — the heuristic landscape, minimax with alpha-beta PROVED sound, constraint satisfaction; logic and representation — resolution traced, first-order expressiveness, forward/backward chaining; planning — STRIPS, planning as search, monitoring and replanning; uncertain knowledge — Bayes priced on real diagnosis, Bayesian networks, the utility composition into decision theory; decisions over time — MDPs, value iteration traced, the RL doorway; perception and communication named with their books\u2019 doorsteps; and the field map. Cross-references Mathematical Logic, Probability Theory and the ML/perception family; hands off to Machine Learning, Computer Vision, NLP and the LLM-agent era.',
  status: 'planned',
  accent: ['#831843', '#500724'],
  chapters,
}
