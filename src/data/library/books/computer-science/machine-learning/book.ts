import type { Book, Chapter } from '../../../types'

/**
 * Machine Learning — the twenty-ninth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `mln-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the probability/statistics
 * mathematics belongs to the Mathematics shelf\u2019s Probability Theory and
 * Statistics (cross-referenced, used fluently — Bishop\u2019s Part-I math is
 * those books\u2019 material); Deep Learning owns the depth revolution; Data
 * Science owns the analyst\u2019s craft; this book owns the classical
 * learning spine.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Goodfellow\u2019s Part I (cs-12
 *   — the applied-math and ML-basics chapters extracted: learning
 *   algorithms, capacity/overfitting, hyperparameters, bias-variance,
 *   MLE, Bayesian statistics, supervised/unsupervised, SGD) is the
 *   mathematical on-ramp.
 * - Web-checked 2026-11-15: Bishop, 'Pattern Recognition and Machine
 *   Learning' (the 14-chapter TOC — probability distributions, linear
 *   models for regression and classification, neural networks, kernel
 *   methods, sparse kernel machines, graphical models, mixture models
 *   and EM, approximate inference, sampling, continuous latent
 *   variables, sequential data, combining models) + the standard
 *   introductory ML course arcs (ISLR\u2019s applied pole named).
 * - Exam types: bias-variance computations, model-tracing questions +
 *   worked derivations at university level.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 10 ANN line audited
 *   against this plan — one planned lesson added (the classical-networks
 *   census: Hopfield and SOM). Routing/verdict record: docs/research/
 *   CS_EXAM_TOPIC_LEDGER.md; standing gate: scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-learning-means',
    title: 'What Learning Means',
    summary:
      'The field defined honestly: the learning taxonomy (supervised, unsupervised, reinforcement\u2019s doorway — the AI book\u2019s MDP cross-reference), the data\u2019s contract (features, labels, the train/validation/test discipline), capacity and the overfitting disease priced on a real curve, and the bias-variance decomposition derived (the trade that explains every later model choice).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Learning Taxonomy',
      'The Data\u2019s Contract',
      'Bias-Variance Derived',
    ],
  },
  {
    number: 2,
    slug: 'linear-models-regression',
    title: 'Linear Models: Regression',
    summary:
      'The first learner: least squares derived (the normal equations\u2019 geometry — Linear Algebra cross-referenced), regularization as the shrinkage discipline (ridge and lasso priced on their selection geometry), the MLE connection derived (Gaussian noise\u2019s least-squares equivalence PROVED), and the polynomial\u2019s overfitting demonstration computed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Least Squares Derived',
      'Ridge and Lasso Priced',
      'The MLE Connection Proved',
    ],
  },
  {
    number: 3,
    slug: 'linear-models-classification',
    title: 'Linear Models: Classification',
    summary:
      'The decision-boundary family: logistic regression traced (the sigmoid\u2019s probability contract, cross-entropy derived from MLE), the perceptron\u2019s honest history, support vector machines\u2019 margin discipline (the primal geometry priced, kernels\u2019 trick named with its mathematical census), and the multi-class census (softmax derived).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Logistic Regression Traced',
      'The Margin Discipline',
      'The Kernel Trick, Named',
    ],
  },
  {
    number: 4,
    slug: 'trees-and-ensembles',
    title: 'Trees and Ensembles',
    summary:
      'The non-linear families: decision trees\u2019 craft (the split discipline — entropy and Gini derived as impurity measures, the pruning honesty), random forests as the variance cure (bagging\u2019s arithmetic priced), and gradient boosting as the sequence discipline (each tree fitting the previous\u2019s residuals — the modern workhorse traced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Entropy and Gini Derived',
      'Bagging\u2019s Variance Cure',
      'Boosting the Residuals',
    ],
  },
  {
    number: 5,
    slug: 'neural-networks-first-depth',
    title: 'Neural Networks: a First Depth',
    summary:
      'The differentiable learner: the multilayer perceptron\u2019s architecture (the activation census — sigmoid\u2019s saturation disease priced, ReLU\u2019s answer), backpropagation derived (the chain rule composed through layers — Calculus cross-referenced), the training craft (SGD\u2019s discipline, the learning-rate question, the initialization honesty), and the classical-networks census the older syllabi still name (the Hopfield network\u2019s energy discipline, the self-organizing map\u2019s Kohonen topology — supervised, unsupervised and reinforcement\u2019s taxonomy recalled as the wiring).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Activation Census',
      'Backprop Derived',
      'The Training Craft',
      'The Classical Census: Hopfield Networks and SOMs',
    ],
  },
  {
    number: 6,
    slug: 'unsupervised-structure',
    title: 'Unsupervised Structure',
    summary:
      'Learning without labels: clustering\u2019s census (K-means traced with its objective\u2019s descent honesty, hierarchical\u2019s dendrogram discipline), the expectation-maximization idea (the mixture-of-Gaussians traced — the E and M steps priced on a worked iteration), and dimensionality reduction (PCA derived from the covariance\u2019s eigendirections — the Linear Algebra cross-reference made explicit).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'K-Means Traced',
      'EM\u2019s E and M Steps Priced',
      'PCA Derived',
    ],
  },
  {
    number: 7,
    slug: 'graphical-models-and-inference',
    title: 'Graphical Models and Inference',
    summary:
      'Structure in uncertainty: Bayesian networks\u2019 craft (the independence d-separation discipline — the AI book\u2019s networks deepened), Markov models\u2019 sequence discipline (the hidden variant\u2019s forward algorithm traced), and the inference census (exact\u2019s junction-tree echo named, approximate\u2019s sampling families named with the MCMC discipline priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'D-Separation\u2019s Discipline',
      'The Forward Algorithm Traced',
      'The Inference Census',
    ],
  },
  {
    number: 8,
    slug: 'evaluating-honest-learners',
    title: 'Evaluating Honest Learners',
    summary:
      'The measurement discipline: the metric census (accuracy\u2019s lie on imbalanced data — precision/recall/F derived, ROC\u2019s curve read honestly), cross-validation as the variance medicine, leakage as the silent disease (priced on a real preprocessing mistake), and the hyper-parameter discipline (the search craft, the honest test-set law).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Accuracy\u2019s Lie and the F Family',
      'Leakage: the Silent Disease',
      'The Honest Test-Set Law',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The field on one page (the supervised/unsupervised families with the bias-variance spine through them all), the craft census (bias-variance computations, model-tracing questions at exam level), and the doorsteps — Deep Learning\u2019s depth revolution, Data Science\u2019s applied craft, and the Generative family\u2019s modern era.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field on One Page',
      'The Craft Census',
      'The Doorsteps: Depth, Craft, Generation',
    ],
  },
]

export const machineLearning: Book = {
  id: 'machine-learning',
  title: 'Machine Learning',
  subtitle: 'The classical spine — from least squares\u2019 geometry to the honest test set',
  discipline: 'computer-science',
  level: 'First ML course → the depth revolution doorstep',
  description:
    'The classical learning home on the Bishop pole (with Goodfellow\u2019s Part-I on-ramp from the Drive). What learning means — the taxonomy, the data contract, bias-variance derived; linear regression — least squares derived, ridge/lasso priced, the MLE connection PROVED; classification — logistic regression traced, the SVM margin discipline with the kernel trick named, softmax derived; trees and ensembles — entropy/Gini derived, bagging\u2019s variance cure, boosting the residuals; neural networks\u2019 first depth — the activation census, backprop derived, the training craft; unsupervised structure — K-means traced, EM\u2019s steps priced, PCA derived; graphical models — d-separation, the forward algorithm, the inference census; evaluation — accuracy\u2019s lie, leakage\u2019s silent disease, the honest test-set law. Cross-references the Mathematics shelf\u2019s probability/statistics; hands off to Deep Learning, Data Science and the Generative family.',
  status: 'planned',
  accent: ['#5b21b6', '#4c1d95'],
  chapters,
}
