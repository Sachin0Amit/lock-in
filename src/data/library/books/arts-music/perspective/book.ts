import type { Book, Chapter } from '../../../types'

/**
 * Perspective — the fifteenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `persp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Perspective owns the depth register. The drawing’s application to drawing; the atmospheric-and-colour registers to colour-theory; the optics’ physics to the physics shelf (cross-referenced); the history’s receipts to the humanities shelf’s art-history book; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Norling named as the school pole (the one-and-two registers).
 * - The Robertson’s How to Draw named as the university co-pole (the construction register).
 * - The art-history cross-reference named with the Brunelleschi receipt priced straight.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'why-window',
    title: 'The Why-and-Window Register',
    summary:
      'The depth\u2019s-own history: the picture-window honesty (the flat-canvas craft — the projection-and-register named); the Brunelleschi receipt priced straight (the mirror\u2019s-demonstration craft with the dome-and-experiment named); the Alberti\u2019s craft (the veil honesty — the intersection named); the pre-perspective register cross-referenced (the medieval honesty — the hierarchical space named); and the post register named (the Cezanne\u2019s-craft — the two-point honesty priced straight at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mirror\u2019s-Demonstration Craft Held',
      'The Veil Honesty Named',
      'The Hierarchical Space Named',
      'The Post Register Named',
    ],
  },
  {
    number: 2,
    slug: 'one-two-point',
    title: 'The One-and-Two-Point Crafts',
    summary:
      'The central\u2019s-discipline: the one-point\u2019s craft (the box walkthrough fixed by drill — the central-vanishing receipt with the interior register named); the two-point\u2019s craft (the two-vanishing division — the corner box receipt fixed by drill, the horizon\u2019s honesty — the eye-level receipt named with the ground named); the craft\u2019s-receipts (the station-point honesty named at survey depth — the viewer\u2019s-position register); and the freehand\u2019s preview (the estimation craft cross-referenced from drawing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Box Walkthrough Fixed by Drill',
      'The Corner Receipt Fixed by Drill',
      'The Eye-Level Receipt Named',
      'The Estimation Cross-Reference Named',
    ],
  },
  {
    number: 3,
    slug: 'measuring-depth',
    title: 'The Measuring-Depth Systems',
    summary:
      'The distance\u2019s arithmetic: the diagonal\u2019s receipt (the depth craft — the checking method fixed by drill with the half\u2019s-again honesty named); the measuring-line division (the true-and-scaled register — the fencepost receipt named); the ellipse\u2019s-craft (the circle\u2019s-honesty — the 12-o\u2019clock receipt named with the axis craft — the two-crafts division held straight); and the stairs-and-register named (the repeat\u2019s-craft at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Checking Method Fixed by Drill',
      'The Fencepost Receipt Named',
      'The 12-O\u2019clock Receipt Named',
      'The Repeat Craft Named',
    ],
  },
  {
    number: 4,
    slug: 'shadows-reflections-atmosphere',
    title: 'The Shadows, Reflections-and-Atmosphere',
    summary:
      'The light\u2019s-arts: the shadows\u2019 craft (the projected register — the shadow\u2019s-vanishing receipt named with the source honesty — the two-source division held straight); the reflections\u2019 craft (the mirror\u2019s-honesty — the angled receipt with the water\u2019s-craft named — the ripple consequence); the atmospheric\u2019s register (the aerial perspective — the value\u2019s saturation crafts cross-referenced from colour-theory, the edge-and-softening receipt named); and the haze-and-register named (the colour\u2019s-shift craft — the blue distance receipt priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Source Division Held Straight',
      'The Angled Receipt Held',
      'The Edge\u2019s Softening Receipt Named',
      'The Blue Distance Receipt Priced Straight',
    ],
  },
  {
    number: 5,
    slug: 'curvilinear-axonometric',
    title: 'The Curvilinear-and-Axonometric Registers',
    summary:
      'The other\u2019s-systems: the curvilinear\u2019s honesty (the fisheye register — the five-point craft named at survey depth with the honest distortion receipt — the choice\u2019s honesty priced straight); the isometric\u2019s-craft (the 30-degree receipt fixed by drill — the game register with the no-vanishing honesty named); the axonometric\u2019s-census (the 45-and-30 division named — the exploded register); the technical-and-register named (the drawing\u2019s-sibling — the plan-and-elevation cross-reference named for the architecture book); and the choice\u2019s register (the each-system honesty — the why named per system).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Honest Distortion Receipt Priced Straight',
      'The 30-Degree Receipt Fixed by Drill',
      'The Plan-and-Elevation Cross-Reference Named',
      'The Why Named per System',
    ],
  },
]

export const perspective: Book = {
  id: 'perspective',
  title: 'Perspective',
  subtitle: 'The depth\u2019s craft — the picture window, the measuring systems and the honest distortions',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the construction register)',
  description: 'The depth\u2019s discipline: the why\u2019s history (the picture-window honesty — the Brunelleschi receipt priced straight with the Alberti craft named, the pre-and-post registers cross-referenced to the humanities shelf\u2019s art-history book); the one-point\u2019s craft (the central-vanishing receipt — the box walkthrough fixed by drill); the two-point\u2019s craft (the two-vanishing division with the horizon\u2019s honesty — the eye-level receipt named); the three-point-and-distortion register (the vertical convergence honesty with the fisheye\u2019s-caution named); the measuring\u2019s-systems (the diagonal\u2019s receipt — the depth craft with the checking method fixed by drill, the measuring-line division named); the shadows\u2019-and-reflections craft (the projected register — the shadow\u2019s-vanishing receipt named, the mirror\u2019s-craft with the water honesty); the atmospheric\u2019s register (the distance\u2019s-craft — the aerial perspective with the value-and-saturation registers cross-referenced from colour-theory); the curvilinear\u2019s honesty (the fisheye register named at survey depth — the honest distortion); the isometric-and-axonometric craft (the design register — the game-and-technical division named); and the practice\u2019s register (the freehand honesty with the constructive cross-reference from drawing).',
  status: 'planned',
  accent: ['#0f766e', '#042f2e'],
  chapters,
}
