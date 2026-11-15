import type { Book, Chapter } from '../../../types'

/**
 * Human-Computer Interaction — the forty-second book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `hci-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): this book owns the interaction
 * DESIGN theory; Frontend Engineering and Mobile App Development own the
 * implementation crafts that apply it (cross-referenced both ways); Data
 * Science\u2019s visualization chapter borrows its distortion census here.
 * The cognitive-science grounding is stated, not re-taught.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Shneiderman on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Shneiderman, Plaisant, Cohen, Jacobs,
 *   'Designing the User Interface' 6e (the Pearson TOC — Part 1
 *   Introduction: usability of interactive systems, universal
 *   usability, guidelines/principles/theories; then design processes,
 *   evaluation, the interaction-style census, and the emerging
 *   frontiers) + Norman\u2019s cognitive design echoes named.
 * - Exam types: heuristic-evaluation sets + design-critique questions.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-human-side-of-the-machine',
    title: 'The Human Side of the Machine',
    summary:
      'The discipline\u2019s honest ground: usability defined and measured (the learnability/efficiency/memorability/error census priced on real interfaces), the human\u2019s information-processing echo stated (perception, memory\u2019s magic numbers, attention\u2019s limits — the cognitive contract every design signs), and Norman\u2019s vocabulary adopted (affordances, signifiers, the gulfs of execution and evaluation).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Usability Defined and Measured',
      'The Cognitive Contract',
      'The Gulfs Adopted',
    ],
  },
  {
    number: 2,
    slug: 'guidelines-and-theories',
    title: 'Guidelines and Theories',
    summary:
      'The craft\u2019s collected law: the guidelines census (Shneiderman\u2019s golden rules priced on real violations), the principles\u2019 families (consistency, feedback, error-handling\u2019s forgiveness), the theories\u2019 ladder (action-cycle to distributed cognition named), and universal usability as the inclusive mandate (accessibility\u2019s census — the Frontend chapter cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Golden Rules Priced on Violations',
      'The Principles\u2019 Families',
      'Universal Usability as Mandate',
    ],
  },
  {
    number: 3,
    slug: 'the-design-process',
    title: 'The Design Process',
    summary:
      'Designing honestly rather than decorating: the user-centered discipline (personas and scenarios priced as instruments with their limits), the requirements\u2019 interaction half (the task-analysis craft), the ideation-and-prototyping ladder (fidelity as an honest budget), and the design-decision record named (Software Engineering\u2019s echo).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Personas Priced as Instruments',
      'The Fidelity Budget',
      'Design Decisions Recorded',
    ],
  },
  {
    number: 4,
    slug: 'evaluation-discipline',
    title: 'The Evaluation Discipline',
    summary:
      'Testing the interface\u2019s honesty: the inspection methods (the heuristic-evaluation craft traced on a worked interface — the findings\u2019 severity census), the usability-testing discipline (the think-aloud protocol, the small-N honesty), the controlled-experiment echo priced on real comparisons, and the analytics\u2019 observational census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Heuristic Evaluation Traced',
      'The Small-N Honesty',
      'The Observational Census',
    ],
  },
  {
    number: 5,
    slug: 'interaction-styles',
    title: 'The Interaction-Style Census',
    summary:
      'The interface\u2019s genres: the direct-manipulation legacy (its strengths and its limits priced), the form-and-menu families (the choice discipline), the command language\u2019s echo (the power-user\u2019s contract), the voice/conversational turn priced honestly, and the multimodal question named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Direct Manipulation Priced',
      'The Command Language\u2019s Contract',
      'The Conversational Turn',
    ],
  },
  {
    number: 6,
    slug: 'collaboration-and-communication',
    title: 'Collaboration and Communication',
    summary:
      'The interface\u2019s social layer: the collaboration census (the awareness discipline — synchronous and asynchronous families priced), the documentation\u2019s craft (the minimal-manual echo named), the notification question (the interruption economy priced on real telemetry), and the trust/automation question for the AI era (the Generative book\u2019s doorstep named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Awareness Discipline',
      'The Interruption Economy',
      'Trust and Automation',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The discipline on one page (human → guidelines → process → evaluation → styles → collaboration with the gulfs beneath), the craft census (heuristic evaluations and design critiques at exam level), and the doorsteps — Frontend and Mobile\u2019s implementation crafts, the AI-era interaction questions (the agent\u2019s interface), the frontier named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Discipline on One Page',
      'The Craft Census',
      'The Doorsteps: the Implementation Crafts',
    ],
  },
]

export const humanComputerInteraction: Book = {
  id: 'human-computer-interaction',
  title: 'Human-Computer Interaction',
  subtitle: 'The human side of the machine — usability, evaluation and the gulf\u2019s bridge',
  discipline: 'computer-science',
  level: 'First HCI course → the AI-era interaction doorstep',
  description:
    'The interaction-design home on the Shneiderman 6e arc. The human side — usability measured, the cognitive contract stated, Norman\u2019s gulfs adopted; the guidelines census with the golden rules priced on real violations and universal usability as mandate; the design process — personas priced as instruments, the fidelity budget, design decisions recorded; the evaluation discipline — heuristic evaluation traced, the small-N honesty, the observational census; the interaction-style census — direct manipulation priced, the conversational turn; collaboration — the awareness discipline and the interruption economy with the trust/automation question; and the discipline map. Cross-references Frontend Engineering and Mobile App Development (the implementation crafts) and Data Science\u2019s visualization distortion census; hands off to the AI-era interaction questions.',
  status: 'planned',
  accent: ['#d946ef', '#86198f'],
  chapters,
}
