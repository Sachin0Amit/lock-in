import type { Book, Chapter } from '../../../types'

/**
 * Information Retrieval — the thirty-eighth book of the Computer Science
 * shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `ir-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the Mathematics shelf\u2019s
 * Linear Algebra and Probability own the vector/likelihood mathematics;
 * NLP owns the tokenization/language foundations; Data Mining owns the
 * clustering craft\u2019s general theory — this book owns retrieval: the
 * inverted index to the web\u2019s link analysis.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Manning IR book on the
 *   Drive (honest note).
 * - Web-checked 2026-11-15: Manning, Raghavan, Schütze, 'Introduction
 *   to Information Retrieval' (the 21-chapter arc — boolean retrieval
 *   and the inverted index, the term-document matrix, tokenization and
 *   normalization, term weighting and tf-idf, evaluation, indexing,
 *   compression, vector-space scoring, language models, classification,
 *   clustering, latent semantic, web search — crawling and link
 *   analysis).
 * - Exam types: index-trace sets + tf-idf computations + ranking
 *   questions.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'boolean-retrieval-and-the-inverted-index',
    title: 'Boolean Retrieval and the Inverted Index',
    summary:
      'The field\u2019s founding machinery: the information-need-versus-query distinction priced, the inverted index constructed by hand on a small corpus (the dictionary and postings discipline), the boolean query\u2019s evaluation traced, and the first honesty — the boolean model\u2019s ranked blindness named as the problem the field grows to fix.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Inverted Index Constructed by Hand',
      'Boolean Evaluation Traced',
      'The Ranked Blindness Named',
    ],
  },
  {
    number: 2,
    slug: 'the-term-vocabulary',
    title: 'The Term Vocabulary',
    summary:
      'Building the dictionary: tokenization\u2019s retrieval discipline (NLP\u2019s chapter cross-referenced — the retrieval-specific choices priced), normalization and the equivalence classes (the casing and punctuation census), stopwords\u2019 honest trade, and stemming/lemmatization as the dictionary\u2019s compression.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Tokenization\u2019s Retrieval Discipline',
      'Stopwords\u2019 Honest Trade',
      'Stemming as Compression',
    ],
  },
  {
    number: 3,
    slug: 'term-weighting-and-scoring',
    title: 'Term Weighting and Scoring',
    summary:
      'The ranked epoch\u2019s arithmetic: the term frequency discipline (the log-frequency damping priced on real counts), the document frequency inversion (idf derived — the rare-word\u2019s surprise made arithmetic), the tf-idf vector composed, and the cosine similarity\u2019s computation traced on a two-document worked example (Linear Algebra cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'idf Derived',
      'The tf-idf Vector Composed',
      'Cosine Computed on a Worked Pair',
    ],
  },
  {
    number: 4,
    slug: 'evaluation-of-retrieval',
    title: 'Evaluation of Retrieval',
    summary:
      'Measuring the search engine honestly: the test-collection discipline (the relevance-judgment census), the precision/recall pair recalled and composed (the F echo), the ranked-evaluation metrics traced (precision@k, MAP and the discounted cumulative gain — each priced on a worked ranking), and the user-level honesty (interleaving named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Test-Collection Discipline',
      'MAP Traced on a Worked Ranking',
      'The Discounted Cumulative Gain',
    ],
  },
  {
    number: 5,
    slug: 'index-construction-and-compression',
    title: 'Index Construction and Compression',
    summary:
      'The industrial scale: the index-construction census (the blocked sort discipline, the dynamic/one-pass alternatives priced), the postings\u2019 compression craft (the gap encoding\u2019s arithmetic priced — variable-byte and gamma named), and the index\u2019s capacity arithmetic (how big the web\u2019s index really is).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Blocked Sort Discipline',
      'Gap Encoding\u2019s Arithmetic',
      'The Capacity Arithmetic',
    ],
  },
  {
    number: 6,
    slug: 'the-web-and-the-link-analysis',
    title: 'The Web and the Link Analysis',
    summary:
      'Retrieval at web scale: the crawling discipline (the robots\u2019 politeness contract, the freshness question), the anchor-text echo priced (the web\u2019s own annotation), PageRank derived honestly (the random-surfer model traced to its fixed point on a small graph — the Linear Algebra\u2019s eigenvector connection made explicit), and the learning-to-rank doorway named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crawling Discipline',
      'PageRank Traced to Its Fixed Point',
      'The Learning-to-Rank Doorway',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The engine on one page (index → weight → score → evaluate → compress → rank with the web\u2019s layer above), the craft census (index traces, tf-idf computations, MAP questions at exam level), and the doorsteps — Generative AI\u2019s retrieval-augmentation contract (the modern reader of the index), the recommender and the RAG echo named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Engine on One Page',
      'The Craft Census',
      'The Doorsteps: Retrieval-Augmentation',
    ],
  },
]

export const informationRetrieval: Book = {
  id: 'information-retrieval',
  title: 'Information Retrieval',
  subtitle: 'Finding the needed — the inverted index, the ranked scoring, the linked web',
  discipline: 'computer-science',
  level: 'First IR course → the retrieval-augmentation doorstep',
  description:
    'The retrieval home on the Manning-Raghavan-Schütze arc. Boolean retrieval with the inverted index constructed by hand and the ranked blindness named; the term vocabulary — tokenization\u2019s retrieval discipline, stopwords\u2019 trade, stemming as compression; term weighting — idf derived, the tf-idf vector composed, cosine computed on a worked pair; evaluation — the test-collection discipline with MAP and the discounted gain traced on worked rankings; index construction and compression — the blocked sort, gap encoding\u2019s arithmetic; the web layer — the crawling discipline and PageRank traced to its fixed point; and the engine map. Cross-references NLP, Linear Algebra and Data Mining; hands off to Generative AI\u2019s retrieval-augmentation contract.',
  status: 'planned',
  accent: ['#4a044e', '#581c87'],
  chapters,
}
