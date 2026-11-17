import type { Book, Chapter } from '../../../types'

/**
 * Digital Art — the twenty-first book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 26 planned lessons, zero written. Lesson ids will use the `dart-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Digital Art owns the screen-canvas register. The colour’s-theory to colour-theory; the composition to drawing; the 3D’s-integration to 3d-modelling; the animation to animation; the production’s-nondestructive craft cross-referenced from music-production; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The 3DTotal named as the pole with the Huang named as the co-pole (the concept register).
 * - The colour-theory cross-reference held for the RGB depth.
 * - The software honesty named — the agnostic register held (the techniques over the buttons).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'canvas-fundamentals',
    title: 'The Canvas Fundamentals',
    summary:
      'The pixel\u2019s-mind: the raster-vector division held straight (the pixel\u2019s-against-math honesty — the each-use named: the paint\u2019s-against-logo division); the resolution\u2019s craft (the DPI-and-PPI division with the web\u2019s-against-print register — the 72-and-300 receipts fixed by drill); the document\u2019s-craft (the canvas named — the size\u2019s-against-later honesty: the upsampling consequence named — the big named); and the tablet\u2019s-census named (the screen\u2019s-against-non division — the hand-eye receipt named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Each-Use Division Held Straight',
      'The 72-and-300 Receipts Fixed by Drill',
      'The Upsampling Consequence Named',
      'The Hand-Eye Receipt Named',
      'Sl (150 Hours) And Hl (240 Hours) Follow The Same Three Assessed',
    ],
  },
  {
    number: 2,
    slug: 'brush-mark',
    title: 'The Brush-and-Mark Craft',
    summary:
      'The mark\u2019s-engine: the brush\u2019s honesty (the pressure\u2019s-register named with the taper named, the dynamics craft — the velocity named); the texture\u2019s census (the noise register named — the grain\u2019s-honesty, the scatter named); the stroke\u2019s-register (the stabiliser named at survey depth — the smooth honesty); the blending division (the smudge\u2019s-against-layer honesty — the two crafts priced straight); and the custom register named (the own-brush craft — the capture named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Velocity Named',
      'The Grain Honesty Named',
      'The Two Blending Crafts Priced Straight',
      'The Capture Named',
    ],
  },
  {
    number: 3,
    slug: 'layers-nondestructive',
    title: 'The Layers-and-Nondestructive Discipline',
    summary:
      'The stack\u2019s-craft: the layer\u2019s honesty (the stack craft — the order\u2019s-consequence named, the group register named); the mask\u2019s craft (the hide\u2019s-against-erase division priced straight — the reversible receipt: the come-back honesty); the adjustment\u2019s division (the layer named — the clip\u2019s-receipt: the affect named); the blend\u2019s-register named at survey depth (the mode census — the multiply named); and the smart\u2019s-register named (the object honesty — the resize receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reversible Receipt Priced Straight',
      'The Affect Named',
      'The Multiply Named',
      'The Resize Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'digital-colour-techniques',
    title: 'The Digital-Colour-and-Painting Techniques',
    summary:
      'The screen\u2019s-paint: the digital\u2019s-colour craft (the RGB\u2019s-register — the picker\u2019s craft with the gamut honesty, the HSB named — the saturation\u2019s-trap named: the clip receipt, the blending named at survey depth — the two-screen caution); the painting\u2019s-simulation register (the mix named at survey depth — the true-mix honesty, the impasto named); the photobash honesty (the ethics register named — the disclosure craft priced straight, the fundament\u2019s-against-shortcut division held); and the palette\u2019s-craft (the limited cross-reference — the swatches register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clip Receipt Named',
      'The Two-Screen Caution Named',
      'The Disclosure Craft Priced Straight',
      'The Swatches Register Named',
      'Applied Art (Commercial Art) Practical Class Xii: Illustration (techniques',
    ],
  },
  {
    number: 5,
    slug: 'concept-workflow-output',
    title: 'The Concept Workflow-and-Output Register',
    summary:
      'The speed\u2019s final crafts: the speedpaint\u2019s discipline (the timed\u2019s-receipt — the thirty-minute named: the decision\u2019s-speed honesty cross-referenced from painting, the iteration\u2019s-craft — the thumbnail cross-reference from drawing); the concept\u2019s-workflow (the 3D-integration named — the mesh cross-reference held: the block\u2019s-against-paint division, the photobash cross-reference); the output\u2019s register (the print\u2019s-craft — the CMY cross-reference with the calibration honesty named, the web\u2019s-output with the optimise named); and the portfolio register cross-referenced from illustration (the platform named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thirty-Minute Receipt Named',
      'The Block-Paint Division Named',
      'The Calibration Honesty Named',
      'The Platform Named at Survey Depth',
      'Applied Art (Commercial Art) Practical Class Xi: Drawing (still-life And',
    ],
  },
]

export const digitalArt: Book = {
  id: 'digital-art',
  title: 'Digital Art',
  subtitle: 'The screen\u2019s canvas — raster craft, layers, digital colour and the concept workflow',
  discipline: 'arts-music',
  level: 'Beginner → professional (the tablet register)',
  description: 'The digital\u2019s discipline: the canvas\u2019s-fundamentals (the raster\u2019s-against-vector division held straight — the pixel\u2019s-against-math honesty with the each-use named, the resolution craft — the DPI-and-PPI division with the web\u2019s-against-print register); the brush-and-mark craft (the brush\u2019s-engine honesty — the pressure\u2019s-register named with the taper named, the texture\u2019s census — the noise register named, the blending division: the smudge\u2019s-against-layer honesty); the layer\u2019s nondestructive discipline (the layer\u2019s-honesty — the stack craft with the group register, the mask\u2019s-craft — the hide\u2019s-against-erase division priced straight, the adjustment\u2019s-division named with the clip named); the digital\u2019s-colour craft (the cross-reference from colour-theory — the RGB\u2019s-register: the picker\u2019s craft with the gamut honesty, the HSB named — the blending named at survey depth); the digital-painting\u2019s-techniques (the paint\u2019s-simulation register — the mix named at survey depth, the impasto named at survey depth, the photobash honesty priced straight — the ethics register named); the speedpaint\u2019s concept workflow (the timed\u2019s-discipline — the thirty-minute receipt named, the iteration\u2019s-craft — the thumbnail cross-reference, the 3D\u2019s-integration named — the mesh cross-reference held); and the output-and-portfolio register (the print\u2019s-craft — the CMY cross-reference, the calibration honesty named, the web\u2019s-output with the optimise named, the portfolio register cross-referenced from illustration).',
  status: 'planned',
  accent: ['#8b5cf6', '#4c1d95'],
  chapters,
}
