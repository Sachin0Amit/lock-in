import type { Book, Chapter } from '../../../types'

/**
 * Generative AI and LLMs — the thirty-third book of the Computer Science
 * shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `genai-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): NLP owns the linguistic
 * foundations (the classic pipeline + the transformer\u2019s anatomy —
 * cross-referenced); Deep Learning owns the training engine; this book
 * owns the LLM-centered modern arc itself: training the giants,
 * aligning them, serving them, and the applications/agents built on
 * them.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no LLM-era reference on the
 *   Drive (honest note — the field moves faster than books).
 * - Web-checked 2026-11-15: Stanford CS336, 'Language Modeling from
 *   Scratch' (the course arc — overview and tokenization, resource
 *   accounting, architectures and hyperparameters, mixture of experts,
 *   through training, scaling laws, data, alignment, inference and
 *   agents) + the canonical-paper trail (the Attention paper\u2019s arc
 *   named).
 * - Syllabus audit: the modern university LLM course registers.
 * - Exam types: scaling-law arithmetic, tokenization computations +
 *   design-decision questions (serving, safety).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-llm-idea',
    title: 'The LLM Idea',
    summary:
      'The scaling bet stated plainly: next-token prediction as the universal pretraining task (why compression becomes competence — the honest reading), the transformer recalled as the substrate (NLP\u2019s anatomy chapter cross-referenced), the modern stack\u2019s census (the foundation-model era named), and the resource accounting reality (what training actually costs — the compute arithmetic made real).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Compression Becomes Competence',
      'The Modern Stack\u2019s Census',
      'The Resource Accounting Reality',
    ],
  },
  {
    number: 2,
    slug: 'tokenization-and-data',
    title: 'Tokenization and Data',
    summary:
      'The substrate\u2019s craft: tokenization\u2019s modern census (byte-level BPE traced — the quirks priced honestly: why the models cannot spell), the pretraining-data discipline (the web-scale corpus census — deduplication, filtering, the mixture craft), the data-quality question priced on real ablations, and the synthetic-data turn named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Byte-Level BPE and Its Quirks',
      'The Web-Scale Corpus Census',
      'The Synthetic Turn, Named',
    ],
  },
  {
    number: 3,
    slug: 'architectures-and-scaling-laws',
    title: 'Architectures and Scaling Laws',
    summary:
      'The engineering frontier: the architecture census\u2019s honest evolution (the layer-norm and rotary moves priced; the mixture-of-experts discipline traced — sparse routing computed), scaling laws derived as the era\u2019s physics (the Chinchilla arithmetic computed honestly — compute-optimal training sized), and the inference-time compute turn named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mixture-of-Experts Discipline',
      'Chinchilla Arithmetic Computed',
      'The Inference-Compute Turn',
    ],
  },
  {
    number: 4,
    slug: 'training-the-giants',
    title: 'Training the Giants',
    summary:
      'The pretraining craft: the optimization at scale (the distributed discipline — data/tensor/pipeline parallelism priced on real clusters), the stability question named honestly (loss spikes and the interventions census), the evaluation of raw models (the benchmark census with its contamination disease priced), and the recipe\u2019s honesty — what is science, what is folklore.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Parallelism Priced on Real Clusters',
      'Loss Spikes and Interventions',
      'The Benchmark Contamination Disease',
    ],
  },
  {
    number: 5,
    slug: 'alignment-and-instruction-following',
    title: 'Alignment and Instruction Following',
    summary:
      'The post-training story: supervised fine-tuning\u2019s discipline (the instruction-data craft), RLHF traced honestly (the reward model\u2019s proxy disease priced — the alignment-tax honesty), the DPO family named as the lighter alternative, and the safety layer\u2019s census (red-teaming, the refusals\u2019 calibration question, the constitutional echo named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Instruction-Data Craft',
      'RLHF and the Proxy Disease',
      'The Safety Layer\u2019s Census',
    ],
  },
  {
    number: 6,
    slug: 'serving-and-efficiency',
    title: 'Serving and Efficiency',
    summary:
      'The production reality: the KV-cache discipline traced (why memory, not compute, prices the service), the quantization census priced (the bit-width honesty — what breaks and when), the decoding discipline (the sampling census — temperature\u2019s role priced honestly), and the serving stack\u2019s census (batching, speculative decoding named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The KV-Cache Discipline',
      'Quantization\u2019s Bit-Width Honesty',
      'The Decoding Census',
    ],
  },
  {
    number: 7,
    slug: 'the-application-era',
    title: 'The Application Era',
    summary:
      'What is built on the giants: prompting as an interface discipline (the few-shot craft priced — its limits stated), retrieval-augmentation\u2019s contract (the context-window economy — Information Retrieval cross-referenced), the fine-tuning decision priced honestly, and the agent question (tools, the reasoning-trace era, the evaluation-of-agents honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Prompting as an Interface Discipline',
      'The Retrieval-Augmentation Contract',
      'The Agent Question',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-frontier',
    title: 'The Synthesis and the Frontier',
    summary:
      'The era on one page (data → architecture → training → alignment → serving → applications with the costs beside), the craft census (scaling and Chinchilla arithmetic, tokenization computations at exam level), and the frontier named honestly — multimodality, the evaluation crisis, the interpretability question, and the open research doors the capstone\u2019s register keeps.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Era on One Page with Its Costs',
      'The Craft Census',
      'The Frontier, Named Honestly',
    ],
  },
]

export const generativeAiAndLlms: Book = {
  id: 'generative-ai-and-llms',
  title: 'Generative AI and LLMs',
  subtitle: 'The scaling era — training the giants, aligning them, building on them',
  discipline: 'computer-science',
  level: 'First serious LLM-era course → the frontier doorstep',
  description:
    'The LLM-era home on the Stanford CS336 arc. The scaling bet stated — compression becomes competence with the resource accounting made real; tokenization\u2019s modern census with byte-level BPE\u2019s quirks priced; architectures and scaling laws — the mixture-of-experts discipline, Chinchilla arithmetic computed honestly; training the giants — parallelism priced on real clusters, loss spikes, the benchmark-contamination disease; alignment — the instruction-data craft, RLHF\u2019s proxy disease, the safety census; serving — the KV-cache discipline, quantization\u2019s bit-width honesty, the decoding census; the application era — prompting as interface discipline, retrieval augmentation, the agent question; and the era map with its frontier named honestly. Cross-references NLP (the foundations) and Deep Learning (the engine); hands off to the Advanced Computer Science frontier register.',
  status: 'planned',
  accent: ['#a21caf', '#701a75'],
  chapters,
}
