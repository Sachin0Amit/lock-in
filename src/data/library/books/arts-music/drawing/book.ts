import type { Book, Chapter } from '../../../types'

/**
 * Drawing — the twelfth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `draw-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Drawing owns the seeing register. The perspective’s-depth to the perspective book; the colour to colour-theory; the figure’s anatomy to the biology shelf’s animal-anatomy (the sibling views cross-referenced); the art-history receipts to the humanities shelf’s art-history book; the atelier-and-graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Dodson-and-Keys named as the pole (the seeing register) with the Robert Beverly craft co-pole.
 * - The Bridgman and Hogarth figure books named as the anatomy co-poles.
 * - The NCERT line named as the school register with the atelier honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'seeing-contour',
    title: 'The Seeing-and-Contour Craft',
    summary:
      'The eye\u2019s fix: the contour\u2019s honesty (the line\u2019s-against-outline division — the edge\u2019s-variety register named); the blind receipt priced straight (the pure seeing — the five-minute craft with the observation\u2019s-own consequence named); the negative-space register (the shape\u2019s-reading craft — the ground\u2019s honesty with the Chinese trope named); the picture-plane craft (the window honesty — the measuring receipt named); and the gesture preview (the two-crafts division — the seeing\u2019s-against-the feeling honesty held).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Edge\u2019s Variety Register Named',
      'The Five-Minute Craft Held',
      'The Ground Honesty Named',
      'The Two-Crafts Division Held',
    ],
  },
  {
    number: 2,
    slug: 'gesture-movement',
    title: 'The Gesture-and-Movement Craft',
    summary:
      'The quick\u2019s discipline: the gesture\u2019s honesty (the action-line craft — the sweep receipt with the three-second named, the thirty-second register fixed by drill); the weight\u2019s register (the balance honesty — the craft with the cross receipt named); the mannequin craft (the simplified figure — the box-and-ball division); and the drapery register named (the fold-and-seven named at survey depth — the diaper receipt named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sweep Receipt Held',
      'The Thirty-Second Register Fixed by Drill',
      'The Box-and-Ball Division Held',
      'The Seven Folds Named',
    ],
  },
  {
    number: 3,
    slug: 'value-form',
    title: 'The Value-and-Form Craft',
    summary:
      'The light\u2019s writing: the value\u2019s craft (the scale\u2019s register — the five-step honesty fixed by drill with the squint\u2019s receipt priced straight, the notan named at survey depth); the form\u2019s-reading (the sphere\u2019s arc — the highlight\u2019s core-shadow division with the reflected register named, the cast\u2019s-honesty — the two-shadows held apart); the material\u2019s-honesty (the surface register — the rough-and-smooth division); and the rendering crafts (the hatching census — the cross receipt with the stipple named, the blending division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Five-Step Honesty Fixed by Drill',
      'The Two Shadows Held Apart',
      'The Surface Register Named',
      'The Cross Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'construction-anatomy',
    title: 'The Construction-and-Anatomy Craft',
    summary:
      'The solid\u2019s-discipline: the construction\u2019s craft (the box-and-cylinder division — the perspective cross-reference with the eyeball honesty named); the form\u2019s-intersection register (the nose\u2019s jaw crafts — the two-forms\u2019-meet honesty); the figure\u2019s-craft (the eight-heads honesty with the landmark register — the pelvis\u2019s rib receipts, the Bridgman cross-reference named); the hand\u2019s head crafts (the mitten\u2019s honesty for the hand, the egg-and-planes division for the head); and the memory-vs-observation honesty (the constructive receipt — the Hale craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Forms\u2019-Meet Honesty Held',
      'The Landmark Register Fixed by Drill',
      'The Mitten Honesty Named',
      'The Constructive Receipt Named',
    ],
  },
  {
    number: 5,
    slug: 'composition-materials-practice',
    title: 'The Composition, Materials-and-Practice Registers',
    summary:
      'The page-and-craft registers: the composition\u2019s foundation (the focal register — the entry\u2019s path honesty with the thumbnail craft named, the value\u2019s-composition cross-reference); the materials\u2019 census (the graphite\u2019s charcoal-and-ink division with the eraser\u2019s craft — the kneaded honesty); the ink register named (the wash\u2019s cross-hatch crafts); and the practice\u2019s discipline (the regimen honesty — the daily receipt priced straight, the sketchbook-and-register named with the mileage honesty held).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Entry-and-Path Honesty Held',
      'The Kneaded Honesty Named',
      'The Wash Craft Named',
      'The Mileage Honesty Held',
    ],
  },
]

export const drawing: Book = {
  id: 'drawing',
  title: 'Drawing',
  subtitle: 'The seeing craft — line, gesture, value and the practiced eye',
  discipline: 'arts-music',
  level: 'Absolute beginner → advanced practice (the atelier register)',
  description: 'The drawing\u2019s discipline: the seeing\u2019s craft first (the contour\u2019s honesty — the blind receipt priced straight as the seeing\u2019s-own fix, the negative-space register with the shape\u2019s-reading craft); the gesture-and-movement craft (the quick\u2019s honesty — the thirty-second receipt, the action-line register); the perspective\u2019s foundation (the one-and-two-point crafts cross-referenced to the perspective book\u2019s-own depth); the value\u2019s craft (the five-step honesty — the scale\u2019s register with the squint\u2019s receipt, the form\u2019s-reading — the sphere\u2019s egg arc); the construction\u2019s craft (the box-and-cylinder division with the form\u2019s-intersection register); the anatomy-for-artists (the figure\u2019s-craft — the eight-heads honesty with the landmark register, the hand\u2019s head crafts); the composition\u2019s foundation (the focal register — the entry\u2019s path honesty, the thumbnail craft); the materials census (the graphite\u2019s charcoal-and-ink division with the eraser\u2019s-craft named); and the practice\u2019s discipline (the regimen honesty — the daily receipt with the sketchbook\u2019s-register named).',
  status: 'planned',
  accent: ['#334155', '#0f172a'],
  chapters,
}
