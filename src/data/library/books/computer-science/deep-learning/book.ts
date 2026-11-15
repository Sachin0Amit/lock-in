import type { Book, Chapter } from '../../../types'

/**
 * Deep Learning — the thirtieth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `dl-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Machine Learning owns the
 * classical families (this book begins where its neural chapter ends —
 * the math assumed and cited); the Mathematics shelf owns the linear
 * algebra/probability; NLP, Computer Vision and GenAI own their
 * application worlds — this book owns the depth engine itself.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Goodfellow, Bengio,
 *   Courville, 'Deep Learning' (cs-12 — the FULL chapter-level TOC
 *   extracted: Part I applied math/ML basics; Part II modern practices —
 *   feedforward networks, regularization, optimization, CNNs, sequence
 *   modeling, methodology, applications; Part III the perspective
 *   chapters — linear factor models, autoencoders, representation
 *   learning, structured probabilistic models, Monte Carlo, partition
 *   functions, inference, generative models).
 * - Syllabus audit: the standard university deep-learning course arcs.
 * - Exam types: architecture-tracing questions + worked training
 *   arithmetic (parameter counts, receptive fields).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-depth-idea',
    title: 'The Depth Idea',
    summary:
      'Why depth pays: composition as the hypothesis (the functions depth can represent that shallow cannot — the depth-decay results named honestly), the history\u2019s honest census (the winters priced on what actually failed), and the modern stack\u2019s census (the hardware-data-algorithm trio that made 2012 happen).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Composition as the Hypothesis',
      'The Winters Priced Honestly',
      'The Trio That Made 2012',
    ],
  },
  {
    number: 2,
    slug: 'deep-feedforward-networks',
    title: 'Deep Feedforward Networks',
    summary:
      'The engine\u2019s core: the XOR lesson learned honestly (Goodfellow\u2019s own opener — why one hidden layer is the threshold), the hidden-unit census (ReLU\u2019s family with its variants priced), architecture design\u2019s discipline (universal approximation stated honestly with its limits), and backpropagation grown into the industrial craft (the computational graph\u2019s discipline, the autodiff census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The XOR Lesson',
      'The Hidden-Unit Census',
      'Autodiff: the Graph Discipline',
    ],
  },
  {
    number: 3,
    slug: 'the-training-discipline',
    title: 'The Training Discipline',
    summary:
      'Making depth converge: the optimization reality (SGD\u2019s momentum family priced, the adaptive census — Adam traced), regularization\u2019s toolbox (weight decay, dropout PROVED harmless to expectation — its noise reading stated, batch normalization traced with its honest history), and the methodology chapter\u2019s craft (the debugging discipline: how to read loss curves like an engineer).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Optimizer Census, Adam Traced',
      'Dropout and Batch Normalisation',
      'Reading Loss Curves Like an Engineer',
    ],
  },
  {
    number: 4,
    slug: 'convolutional-networks',
    title: 'Convolutional Networks',
    summary:
      'The vision engine: the convolution\u2019s contract (locality and weight sharing priced on the parameter arithmetic), the architecture\u2019s anatomy (the conv/pool/FC census — receptive fields computed), the classic lineage traced (LeNet to AlexNet\u2019s bet to the residual revolution — skip connections PROVED as gradient highways), and transfer learning\u2019s honest discipline.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Convolution\u2019s Contract',
      'Receptive Fields Computed',
      'The Residual Revolution',
      'Transfer Learning\u2019s Discipline',
    ],
  },
  {
    number: 5,
    slug: 'sequence-modeling',
    title: 'Sequence Modeling',
    summary:
      'The temporal engine: recurrent networks traced (the BPTT discipline, the vanishing-gradient disease priced on a real trace), the LSTM\u2019s gates traced (the cell\u2019s memory contract — the engineering that fixed the vanishing), the seq2seq discipline with attention\u2019s origin named (the alignment fix priced), and the doorstep — the transformer family handed to Generative AI\u2019s book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'BPTT and the Vanishing Disease',
      'The LSTM\u2019s Memory Contract',
      'Attention\u2019s Origin',
      'The Doorstep: the Transformer',
    ],
  },
  {
    number: 6,
    slug: 'representation-and-structure',
    title: 'Representation and Structure',
    summary:
      'Learning\u2019s deeper questions: representation learning\u2019s discipline (features learned not hand-made — the disentangling question named honestly), the autoencoder family (the deep variant\u2019s and denoising\u2019s census priced on the manifold intuition), embeddings everywhere (the word2vec echo priced as the representation triumph), and the linear-factor-models\u2019 ground (PCA\u2019s probabilistic reading recalled).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Features Learned, Not Hand-Made',
      'The Autoencoder Family',
      'Embeddings as the Triumph',
    ],
  },
  {
    number: 7,
    slug: 'generative-models-in-deep-learning',
    title: 'Generative Models in Deep Learning',
    summary:
      'The generation engines\u2019 classical era: the family map drawn honestly (explicit versus implicit density — the tractability trade stated), variational autoencoders traced (the ELBO derived and read as the bound it is), generative adversarial networks traced (the minimax game PROVED unstable by its own gradient analysis — the mode-collapse honesty), and the autoregressive family named (the pixel/char-RNN census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Generative Family Map',
      'The ELBO Derived',
      'The GAN Game, Proved Unstable',
      'The Autoregressive Family, Named',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The engine on one page (feedforward → training → convolutions → sequences → representations → generation with the disciplines beside), the craft census (parameter counts, receptive-field arithmetic, gradient-tracing questions at exam level), and the doorsteps — NLP and Vision take the engine into their worlds, Generative AI\u2019s transformers take the field\u2019s centre, the frontier (scaling, the safety echo) named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Engine on One Page',
      'The Craft Census',
      'The Doorsteps: the Application Worlds',
    ],
  },
]

export const deepLearning: Book = {
  id: 'deep-learning',
  title: 'Deep Learning',
  subtitle: 'The depth engine — composition, convolution, recurrence and generation',
  discipline: 'computer-science',
  level: 'First deep-learning course → the transformer doorstep',
  description:
    'The Goodfellow arc on the shelf (Drive-extracted in full). The depth idea — composition as hypothesis with the winters priced honestly; deep feedforward networks — the XOR lesson, the hidden-unit census, autodiff\u2019s graph discipline; the training discipline — the optimizer census with Adam traced, dropout and batch normalization, loss curves read like an engineer; convolutional networks — the parameter arithmetic, receptive fields computed, the residual revolution PROVED as gradient highways; sequence modeling — BPTT\u2019s vanishing disease, the LSTM\u2019s memory contract, attention\u2019s origin and the transformer doorstep; representation learning — the autoencoder family and embeddings as the triumph; generative models — the family map, the ELBO derived, the GAN game proved unstable; and the engine map. Cross-references Machine Learning (the classical ground) and the Mathematics shelf; hands off to NLP, Computer Vision and Generative AI.',
  status: 'planned',
  accent: ['#1e1b4b', '#312e81'],
  chapters,
}
