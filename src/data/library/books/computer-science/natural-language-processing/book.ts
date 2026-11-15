import type { Book, Chapter } from '../../../types'

/**
 * Natural Language Processing — the thirty-first book of the CS shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `nlp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the probability and the linear
 * algebra belong to the Mathematics shelf (used fluently); Deep Learning
 * owns the neural engine; Machine Learning owns the evaluation
 * methodology — this book owns language as the data and the discipline.
 * Generative AI owns the modern LLM-centered arc (the transformer\u2019s
 * training story lives there).
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Jurafsky on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Jurafsky & Martin, 'Speech and Language
 *   Processing' 3e draft (the Aug 2026 release at web.stanford.edu/
 *   ~jurafsky/slp3 — vol I\u2019s LLM-first arc: words and tokens, n-gram
 *   language models, logistic regression, naive Bayes, embeddings,
 *   neural nets, transformers; vol II\u2019s applications).
 * - Syllabus audit: the standard university NLP course registers.
 * - Exam types: worked computations (edit distance, smoothing
 *   arithmetic, attention weights) + pipeline design questions.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'language-as-data',
    title: 'Language as Data',
    summary:
      'The field\u2019s honest problem: why language resists tabulation (ambiguity, the long tail, the creative Speakers), the NLP pipeline\u2019s classic anatomy (tokenization → morphology → syntax → semantics → application), and the modern era\u2019s reorganisation stated — the pipeline collapsing into end-to-end models.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Language Resists Tabulation',
      'The Classic Pipeline\u2019s Anatomy',
      'The End-to-End Reorganisation',
    ],
  },
  {
    number: 2,
    slug: 'words-and-tokens',
    title: 'Words and Tokens',
    summary:
      'The atomic craft: tokenization\u2019s census (word, character, the subword discipline — BPE traced through a worked merge sequence), normalization\u2019s toolbox (the casing/stemming/lemmatization census — Porter\u2019s algorithm priced), edit distance computed (the dynamic-programming table traced — Algorithms cross-referenced), and the corpus statistics discipline (Zipf\u2019s law priced on real counts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'BPE Traced Through Merges',
      'Edit Distance Computed',
      'Zipf\u2019s Law Priced on Real Counts',
    ],
  },
  {
    number: 3,
    slug: 'the-statistical-era-language-models',
    title: 'The Statistical Era: Language Models',
    summary:
      'The classic foundation: the n-gram language model defined (the chain rule\u2019s Markov approximation), smoothing\u2019s discipline (add-one\u2019s bias priced, backoff and interpolation traced), perplexity derived as the evaluation contract (the entropy connection — Probability Theory cross-referenced), and the classic applications census (spell correction, autocomplete).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chain Rule\u2019s Approximation',
      'Smoothing\u2019s Discipline',
      'Perplexity Derived',
    ],
  },
  {
    number: 4,
    slug: 'text-classification-and-its-classics',
    title: 'Text Classification and Its Classics',
    summary:
      'The classification craft on text: the bag-of-words representation priced (what it loses stated honestly), naive Bayes derived (its independence naivety priced against its surprising sturdiness — the error analysis), logistic regression\u2019s text form (the features craft, the regularized weight reading), and evaluation\u2019s text census (precision/recall/F, the confusion discipline).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Naive Bayes Derived and Priced',
      'The Regularized Weight Reading',
      'The Evaluation Census',
    ],
  },
  {
    number: 5,
    slug: 'embeddings-and-the-vector-world',
    title: 'Embeddings and the Vector World',
    summary:
      'Meaning as geometry: the distributional hypothesis stated (the co-occurrence contract), word2vec\u2019s family traced (skip-gram\u2019s objective computed honestly at small scale, the negative-sampling shortcut priced), the vector-space reading craft (cosine similarity, the analogy arithmetic priced with its honest limits), and the census\u2019s completion — GloVe named and the contextual revolution\u2019s doorway opened.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Distributional Hypothesis',
      'Skip-Gram Computed Honestly',
      'The Analogy Arithmetic\u2019s Limits',
    ],
  },
  {
    number: 6,
    slug: 'from-rnn-to-transformer',
    title: 'From RNN to Transformer',
    summary:
      'The neural era\u2019s arc: recurrent networks in language clothing (the seq2seq discipline traced — Deep Learning cross-referenced for the engine), attention\u2019s derivation (the query/key/value contract computed through a worked example), the transformer\u2019s anatomy traced whole (the multi-head discipline, the positional encoding\u2019s honesty), and BERT/GPT\u2019s two training bets priced (fill-in versus next-token).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Attention Computed Through a Worked Example',
      'The Transformer\u2019s Anatomy',
      'BERT versus GPT: the Two Bets',
    ],
  },
  {
    number: 7,
    slug: 'the-application-census',
    title: 'The Application Census',
    summary:
      'The tasks that organize the field: the sequence-labeling craft (NER traced — the BIO discipline), parsing\u2019s two eras (the constituency/dependency census named, the neural parser\u2019s honesty), machine translation\u2019s arc (the alignment story to the modern evaluation question — BLEU priced with its limits), the dialogue question, and the summarization/extraction census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'NER and the BIO Discipline',
      'Machine Translation\u2019s Arc',
      'Dialogue and Summarisation, Named',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The field on one page (tokens → models → classification → embeddings → transformers → applications with the eras\u2019 strata visible), the craft census (smoothing and attention computations at exam level), and the doorsteps — Generative AI\u2019s LLM-centered era takes the transformer into production, the multilingual and speech worlds named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field on One Page with Its Strata',
      'The Craft Census',
      'The Doorsteps: the LLM Era',
    ],
  },
]

export const naturalLanguageProcessing: Book = {
  id: 'natural-language-processing',
  title: 'Natural Language Processing',
  subtitle: 'Language as data — from the n-gram era to the transformer\u2019s two bets',
  discipline: 'computer-science',
  level: 'First NLP course → the LLM-era doorstep',
  description:
    'The language-data home on the Jurafsky-Martin 3e arc (Aug 2026 release, web-checked). Language as data with the pipeline\u2019s classic anatomy and the end-to-end reorganisation; words and tokens — BPE traced through worked merges, edit distance computed, Zipf priced on real counts; the statistical era — n-grams, smoothing\u2019s discipline, perplexity derived; text classification — naive Bayes derived and priced, the regularized weight reading; embeddings — the distributional hypothesis, skip-gram computed honestly, the analogy arithmetic\u2019s limits; from RNN to transformer — attention computed through a worked example, the transformer\u2019s anatomy, BERT/GPT\u2019s two bets; the application census (NER\u2019s BIO discipline, MT\u2019s arc, BLEU\u2019s limits); and the strata map. Cross-references Probability Theory, Algorithms, Machine Learning and Deep Learning; hands off to Generative AI and LLMs.',
  status: 'planned',
  accent: ['#0f766e', '#134e4a'],
  chapters,
}
