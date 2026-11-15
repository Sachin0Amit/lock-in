import type { Book, Chapter } from '../../../types'

/**
 * Advanced Computer Science — the forty-fourth book of the CS shelf (the
 * shelf's capstone — the role Advanced Mathematical Foundations plays for
 * the Mathematics shelf).
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `acs-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): every door this book names was
 * built by a shelf sibling (cross-referenced at each step); the capstone
 * owns the synthesis, the craft of reading research honestly, and the
 * register of open doors. It assumes the shelf\u2019s core and builds the
 * research doorstep on it.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): P vs NP named from the
 *   Sipser/CLRS extractions; the frontier census web-checked.
 * - Web-checked 2026-11-15: the standing open-question registers (the
 *   Clay millennium list — P versus NP and the cryptography/quantum
 *   echoes), the flagship-conference arcs (the systems/theory/ML
 *   families named), and the research-craft canon (reading papers,
 *   replication, the literature discipline).
 * - Exam types: the capstone\u2019s own census — synthesis essays and
 *   paper-reading exercises.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-fields-map',
    title: 'The Field\u2019s Map',
    summary:
      'The whole discipline on one page: the abstraction stack priced honestly (physics → devices → architecture → systems → languages → theory → applications — every shelf book placed on the ladder it serves), the two cultures\u2019 census (theory and engineering named as one field\u2019s two hands), and the map\u2019s use — finding your own position and its doors.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Abstraction Stack Priced',
      'The Two Cultures, One Field',
      'The Map\u2019s Use',
    ],
  },
  {
    number: 2,
    slug: 'the-open-questions-register',
    title: 'The Open Questions Register',
    summary:
      'The standing doors priced one by one: P versus NP (the question stated with its two-directional honesty — Theory of Computation\u2019s doorstep), the memory-model question (the sequential-consistency door named from Operating Systems\u2019 chapters), the one-way-function existence (Cryptography\u2019s ground), and the learning-theory doors (the generalization question from Machine Learning\u2019s frontier).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'P versus NP, Stated Honestly',
      'The Memory-Model Door',
      'The One-Way Ground',
    ],
  },
  {
    number: 3,
    slug: 'reading-research-honestly',
    title: 'Reading Research Honestly',
    summary:
      'The research-craft discipline: the paper\u2019s anatomy (the claims-evidence-contribution reading traced on one real paper), the literature\u2019s craft (the survey-first discipline, the citation graph as a map), the replication crisis\u2019s echo priced on the ML benchmark census (Generative AI\u2019s contamination disease recalled), and the systematic-reading practice specified.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Claims-Evidence-Contribution Reading',
      'The Citation Graph as Map',
      'The Replication Echo',
    ],
  },
  {
    number: 4,
    slug: 'the-frontier-census',
    title: 'The Frontier Census',
    summary:
      'Where the field\u2019s work happens: the flagship families\u2019 census (the theory, systems and ML conference arcs named with what each values), the paper\u2019s life (submission to artifact evaluation — the reproducibility era\u2019s honest movement), the research-team\u2019s sociology stated plainly, and the open-source research echo priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Flagship Census',
      'The Artifact-Evaluation Movement',
      'The Open-Source Research Echo',
    ],
  },
  {
    number: 5,
    slug: 'the-crossing-doors',
    title: 'The Crossing Doors',
    summary:
      'The interdisciplinary doors priced: quantum computing\u2019s census (the qubit\u2019s contract stated honestly — the post-quantum echo from Cryptography), the bioinformatics echo (the sequence-alignment discipline named — the DP cross-reference), the security-and-society question (the policy echo), and the AI-safety door (Generative AI\u2019s frontier recalled — the alignment register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Qubit\u2019s Contract',
      'The Sequence Door',
      'The AI-Safety Register',
    ],
  },
  {
    number: 6,
    slug: 'the-craft-of-contributing',
    title: 'The Craft of Contributing',
    summary:
      'The first contribution\u2019s discipline: the problem-selection craft (the tractable-door question — small honest doors over grand ones), the first paper\u2019s writing census (the structure\u2019s honesty — writing as thinking), the tool-and-artifact craft (the benchmark\u2019s construction discipline), and the review service\u2019s craft (the review\u2019s own honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tractable-Door Question',
      'Writing as Thinking',
      'The Review\u2019s Own Honesty',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-life',
    title: 'The Synthesis and the Life',
    summary:
      'The capstone\u2019s close: the shelf\u2019s whole map recalled with its doors (every sibling\u2019s doorstep visited once in order — the capstone\u2019s own synthesis census), the learning-life\u2019s craft (the deliberate-practice discipline applied to a field that reinvents itself), and the standing honesty — the field\u2019s questions outlive its answers, and the reader\u2019s door is now the field\u2019s own.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Whole Shelf Recalled',
      'The Learning-Life\u2019s Craft',
      'The Standing Honesty',
    ],
  },
]

export const advancedComputerScience: Book = {
  id: 'advanced-computer-science',
  title: 'Advanced Computer Science',
  subtitle: 'The capstone — the field\u2019s map, its open doors, and the craft of entering them',
  discipline: 'computer-science',
  level: 'The CS shelf\u2019s capstone — the research doorstep',
  description:
    'The CS shelf\u2019s capstone book (the Advanced Mathematical Foundations role). The field\u2019s map with every shelf book placed on the abstraction stack it serves; the open questions register — P versus NP stated with its two-directional honesty, the memory-model door, the one-way ground and the learning-theory doors; reading research honestly — the claims-evidence-contribution reading traced on a real paper, the citation graph as map, the replication echo priced on the ML benchmark census; the frontier census — the flagship conference families, the artifact-evaluation movement, the open-source research echo; the crossing doors — the qubit\u2019s contract, the sequence door, the AI-safety register; and the craft of contributing — the tractable-door question, writing as thinking, the review\u2019s own honesty; closing with the whole shelf recalled and the learning-life\u2019s craft. Cross-references every sibling\u2019s doorstep; hands off to the field\u2019s own frontier.',
  status: 'planned',
  accent: ['#111827', '#1f2937'],
  chapters,
}
