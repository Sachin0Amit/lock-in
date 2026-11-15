import type { Book, Chapter } from '../../../types'

/**
 * Computer Vision — the thirty-second book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 8 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `vis-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Computer Graphics owns the
 * forward problem (descriptions → images); this book owns the inverse
 * (images → understanding) — the two books cross-reference the shared
 * geometry. Deep Learning owns the neural engine; the Linear Algebra
 * (transforms, projections) belongs to the Mathematics shelf.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Szeliski on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Szeliski, 'Computer Vision: Algorithms and
 *   Applications' 2e (the Springer/books.google TOC — 1 Introduction;
 *   2 Image formation; 3 Image processing; 4 Feature detection and
 *   matching; 5 Segmentation; then the 3D/stitching/recognition/deep
 *   chapters).
 * - Syllabus audit: the standard university CV course registers.
 * - Exam types: geometry computations (calibration arithmetic, stereo
 *   disparity) + pipeline design questions.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-inverse-problem',
    title: 'The Inverse Problem',
    summary:
      'What vision actually is: images as measurements (the sensor\u2019s physics — exposure, noise, the dynamic-range honesty), image formation\u2019s geometry recalled as the forward model (the pinhole/priced camera — Computer Graphics\u2019 chapter cross-referenced), and the inverse problem stated honestly: why seeing is inference under loss.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Images as Measurements',
      'The Forward Model Recalled',
      'Seeing as Inference Under Loss',
    ],
  },
  {
    number: 2,
    slug: 'the-processing-foundations',
    title: 'The Processing Foundations',
    summary:
      'The signal craft before the learning era: the linear-filter census (correlation and convolution on images — the edge-detection family traced: Sobel to the Canny discipline), the scale-space question (Gaussian pyramids priced), the frequency view\u2019s echo (the Fourier cross-reference), and color\u2019s spaces census priced on real cameras.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Filter Census and Edges',
      'Scale-Space Priced',
      'Color\u2019s Spaces Census',
    ],
  },
  {
    number: 3,
    slug: 'features-and-matching',
    title: 'Features and Matching',
    summary:
      'The interest-point craft: the detector census (Harris\u2019s corner measure derived and computed, the scale-invariant idea priced), descriptors\u2019 discipline (the patch census — SIFT traced to its gradient-histogram contract), matching as correspondence (RANSAC\u2019s random discipline priced on a worked fit), and the feature-based applications census (panorama stitching traced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Harris Derived and Computed',
      'SIFT\u2019s Gradient Contract',
      'RANSAC Priced on a Worked Fit',
    ],
  },
  {
    number: 4,
    slug: 'segmentation',
    title: 'Segmentation',
    summary:
      'Grouping pixels: the threshold discipline (Otsu\u2019s method computed honestly on a histogram), the energy-based craft (the graph-cut discipline priced — min-cut\u2019s Algorithms cross-reference), the region/family census (k-means and watersheds recalled), and the semantic question\u2019s modern turn named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Otsu Computed on a Histogram',
      'The Graph-Cut Discipline',
      'From Grouping to Semantics',
    ],
  },
  {
    number: 5,
    slug: 'geometry-and-calibration',
    title: 'Geometry and Calibration',
    summary:
      'The 3D contract: the camera matrix calibrated (the intrinsics/extrinsics split computed through a worked calibration), the epipolar geometry of two views derived (the fundamental matrix\u2019s contract priced on stereo), the stereo census (disparity\u2019s arithmetic computed), and structure-from-motion named with its modern registration reading.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Camera Matrix Computed',
      'Epipolar Geometry Derived',
      'Disparity\u2019s Arithmetic',
    ],
  },
  {
    number: 6,
    slug: 'recognition-and-detection',
    title: 'Recognition and Detection',
    summary:
      'Naming what is seen: the classical recognition census (the sliding-window era, HOG\u2019s craft priced — the pedestrian detector traced), the detection problem formalized (IoU defined, the mAP evaluation discipline), the deep revolution (the convnets\u2019 takeover — Deep Learning cross-referenced, the R-CNN/Faster lineage priced), and the modern segmentation families named (mask/semantic).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sliding-Window Era',
      'IoU and the mAP Discipline',
      'The Convnets\u2019 Takeover',
    ],
  },
  {
    number: 7,
    slug: 'the-modern-era',
    title: 'The Modern Era',
    summary:
      'The contemporary census: detection\u2019s one-stage families priced (YOLO\u2019s single-shot bet), the transformer\u2019s arrival in vision (the ViT bet priced on the patch discipline), the self-supervised question named honestly (the pretraining census), and the generative cross-echo (the diffusion family named — Generative AI\u2019s doorstep).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'YOLO\u2019s Single-Shot Bet',
      'The ViT Bet',
      'Self-Supervision, Named Honestly',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The field on one page (formation → processing → features → grouping → geometry → recognition with the eras\u2019 strata visible), the craft census (calibration and disparity arithmetic, RANSAC fits at exam level), and the doorsteps — Computer Graphics\u2019 forward problem, Deep Learning\u2019s engine, the generative era\u2019s visual synthesis.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field on One Page with Its Strata',
      'The Craft Census',
      'The Doorsteps: the Forward Problem and Generation',
    ],
  },
]

export const computerVision: Book = {
  id: 'computer-vision',
  title: 'Computer Vision',
  subtitle: 'The inverse problem — images as measurements, seeing as inference',
  discipline: 'computer-science',
  level: 'First computer-vision course → the ViT-era doorstep',
  description:
    'The vision home on the Szeliski 2e arc. The inverse problem stated honestly — images as measurements and seeing as inference under loss; the processing foundations — the filter census with the edge family traced and scale-space priced; features and matching — Harris derived and computed, SIFT\u2019s contract, RANSAC priced on a worked fit; segmentation — Otsu computed, the graph-cut discipline; geometry and calibration — the camera matrix computed, epipolar geometry derived, disparity\u2019s arithmetic; recognition and detection — the sliding-window era, IoU/mAP discipline, the convnets\u2019 takeover; the modern era — YOLO\u2019s bet, the ViT bet, self-supervision named; and the strata map. Cross-references Computer Graphics (the forward problem), Deep Learning (the engine), Linear Algebra and Algorithms; hands off to the generative era\u2019s visual synthesis.',
  status: 'planned',
  accent: ['#be185d', '#831843'],
  chapters,
}
