import type { Book, Chapter } from '../../../types'

/**
 * Painting — the thirteenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `paint-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Painting owns the paint register. The colour’s theory to colour-theory (cross-referenced — the mixing here, the theory there); the drawing’s foundation to drawing; the art-history receipts to the humanities shelf’s art-history book; the atelier-and-graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Schmid Alla Prima named as the pole (the direct register).
 * - The Hawley and the watercolour co-poles named.
 * - The NCERT line named as the school register with the atelier honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'materials-surfaces',
    title: 'The Materials-and-Surfaces Census',
    summary:
      'The physical\u2019s craft: the medium\u2019s division (the oil\u2019s acrylic-and-watercolour honesty — the each receipt: the drying-and-vehicle register, the acrylic\u2019s-honesty — the water-and-miscegenation named at survey depth); the support\u2019s-census (the canvas-and-panel division with the gesso\u2019s-craft — the Size-and-honesty named); the palette\u2019s craft (the arrangement\u2019s register — the limited\u2019s-palette honesty priced straight with the Zorn receipt named); and the safety register named (the ventilation\u2019s skin crafts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Each-Receipt Register Held',
      'The Size Honesty Named',
      'The Zorn Receipt Named',
      'The Safety Register Named',
    ],
  },
  {
    number: 2,
    slug: 'colour-value-practice',
    title: 'The Colour-and-Value Practice',
    summary:
      'The mixing\u2019s craft: the limited\u2019s-palette honesty (the few-pigment receipt — the mixture\u2019s-memory consequence named); the temperature\u2019s register (the bias honesty — the warm-and-cool division cross-referenced from colour-theory, the temperature\u2019s-shift craft named); the value\u2019s-structure (the Notan register — the squint cross-reference, the grisaille craft named — the under painting honesty with the verdict named); and the colour\u2019s-light honesty (the Hawkins named at survey depth — the local\u2019s-against-observed division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mixture\u2019s-Memory Consequence Named',
      'The Temperature\u2019s-Shift Craft Named',
      'The Grisaille Craft Held',
      'The Local-Observed Division Held Straight',
    ],
  },
  {
    number: 3,
    slug: 'direct-layered',
    title: 'The Direct-and-Layered Crafts',
    summary:
      'The two-methods honesty: the alla-prima\u2019s arc (the wet-in-wet honesty — the decision\u2019s-speed receipt priced straight, the one-sitting register named); the layered\u2019s-approach (the fat-over-lean receipt priced straight — the technical craft with the crack consequence named, the glazing craft — the veil register with the scumble named); the and-brushwork\u2019s register (the mark\u2019s-craft — the impasto named with the load honesty); and the edges\u2019 census (the hard\u2019s soft-and-lost division — the lost-and-found receipt priced straight as the craft\u2019s-own poetry).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Decision\u2019s-Speed Receipt Priced Straight',
      'The Fat-over-Lean Receipt Priced Straight',
      'The Load Honesty Named',
      'The Lost-and-Found Receipt Priced Straight',
    ],
  },
  {
    number: 4,
    slug: 'genres-craft',
    title: 'The Genres\u2019 Census',
    summary:
      'The each-subject crafts: the still\u2019s-craft (the arrangement\u2019s honesty — the set-up register with the light\u2019s-single receipt); the landscape\u2019s-craft (the plein register — the flemish honesty with the light\u2019s-fifteen-minute receipt named, the distance\u2019s crafts — the atmospheric cross-reference); the portrait\u2019s-craft (the likeness\u2019s honesty — the structure over-feature register named, the flesh\u2019s palette with the temperature named); and the figure-and-register named (the cast cross-reference from drawing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Light\u2019s-Single Receipt Named',
      'The Fifteen-Minute Receipt Named',
      'The Likeness Honesty Held',
      'The Flesh\u2019s Temperature Named',
    ],
  },
  {
    number: 5,
    slug: 'watercolour-finishing',
    title: 'The Watercolour-and-Finishing Registers',
    summary:
      'The transparent\u2019s discipline: the watercolour\u2019s craft (the transparent honesty — the white\u2019s-reserve receipt priced straight with the paper\u2019s-craft named, the wash-and-graded division, the bloom honesty named — the uncontrolled\u2019s-beauty receipt); the gouache named at survey depth (the opaque sibling); the finishing\u2019s register (the varnish\u2019s-census with the archival honesty named — the removable\u2019s-receipt); the framing craft named; and the studio\u2019s-discipline (the practice register cross-referenced from drawing — the mileage honesty held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The White\u2019s-Reserve Receipt Priced Straight',
      'The Graded Division Fixed by Drill',
      'The Removable\u2019s-Receipt Named',
      'The Mileage Honesty Held Straight',
    ],
  },
]

export const painting: Book = {
  id: 'painting',
  title: 'Painting',
  subtitle: 'The colour-and-light craft — materials, direct painting, layering and the genres',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the studio register)',
  description: 'The painting\u2019s discipline: the materials\u2019-and-surfaces census (the oil\u2019s acrylic-and-watercolour division with the support\u2019s register — the canvas\u2019s gesso crafts); the colour\u2019s practice (the mixing craft — the limited\u2019s-palette honesty priced straight, the temperature\u2019s register with the bias honesty named — cross-referenced from colour-theory); the value\u2019s-structure in paint (the Notan register with the grisaille craft named — the under painting honesty); the direct\u2019s-painting craft (the alla-prima arc — the wet-in-wet honesty with the decision\u2019s-speed receipt named); the layered\u2019s-approach (the fat-over-lean honesty priced straight — the technical receipt, the glazing craft with the veil register named); the brushwork-and-edges register (the mark\u2019s-craft — the impasto named, the edge census — the hard\u2019s soft-and-lost division); the genres\u2019 census (the still\u2019s landscape-and-portrait division with the each-craft register); the watercolour discipline (the transparent honesty — the white\u2019s-reserve receipt priced straight, the wash\u2019s bloom crafts); and the studio register (the finishing\u2019s varnish crafts with the archival honesty named).',
  status: 'planned',
  accent: ['#dc2626', '#450a0a'],
  chapters,
}
