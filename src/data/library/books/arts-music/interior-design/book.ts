import type { Book, Chapter } from '../../../types'

/**
 * Interior Design — the thirty-fourth book of the Arts-Music shelf (the design register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 4 chapters /
 * 16 planned lessons, zero written. Lesson ids will use the `ides-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Interior Design owns the inside register. The colour’s-theory to colour-theory; the lighting’s-technique to cinematography (cross-referenced); the furniture’s-history to the humanities shelf (cross-referenced); the ergonomics to physiotherapy; the architecture’s-macro to architecture; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Ching named as the pole (the interior register).
 * - The Niesewand named at survey depth with the two honesty held.
 * - The NCERT line named as the school register with the studio honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'principles-human-factors',
    title: 'The Principles-and-Human-Factors Craft',
    summary:
      'The inside\u2019s-frame: the principles\u2019 register (the cross-reference from graphic-design — the two named: the unity-and-contrast division, the scale-and-proportion named: the two named); the human factors (the anthropometry honesty — the measure named: the 95th named: the craft\u2019s-consequence named: the two named, the ergonomics cross-reference held — the fit named: the two named); the accessible register (the universal named — the craft\u2019s-consequence: the two named); and the barrier named at survey depth (the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 95th Named',
      'The Fit Named',
      'The Universal Named',
      'The Fit-for-All Honesty Held',
    ],
  },
  {
    number: 2,
    slug: 'lighting-materials',
    title: 'The Lighting-and-Materials Registers',
    summary:
      'The light\u2019s surface crafts: the lighting\u2019s-craft (the cross-reference from cinematography — the three named: the ambient\u2019s task-and-accent division fixed by drill, the colour\u2019s-honesty — the temperature named: the two named, the layer receipt — the dimmer named); the materials\u2019-register (the floor\u2019s wall-and-ceiling division — the two named: the durability\u2019s-against-aesthetics division named, the sustainable named at survey depth — the VOC named); and the finish\u2019s-craft (the two named — the sample receipt: the craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ambient-Task-Accent Fixed by Drill',
      'The Layer Receipt Held',
      'The VOC Named',
      'The Sample Receipt Named',
    ],
  },
  {
    number: 3,
    slug: 'furniture-styles',
    title: 'The Furniture-and-Styles Census',
    summary:
      'The piece\u2019s tradition crafts: the furniture\u2019s-craft (the two named: the built\u2019s-against-sourced division — the craft named: the two named, the joint named at survey depth — the two named); the styles\u2019 census (the history cross-reference from the humanities shelf — the two named: the period-and-modern division: the two named, the craft named — the mix named: the two named); and the scale\u2019s-craft (the room named — the two named: the piece\u2019s-against-division honesty: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Built-Sourced Division Named',
      'The Two Named',
      'The Mix Named',
      'The Piece-Division Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'colour-textiles-planning',
    title: 'The Colour, Textiles-and-Planning Registers',
    summary:
      'The soft\u2019s plan crafts: the colour\u2019s craft (the cross-reference from colour-theory — the scheme receipt: the two named, the flow named — the two named); the textiles\u2019 census (the two named — the weave named: the craft named, the durability\u2019s-named: the two named); the space planning\u2019s-workflow (the two named: the bubble-and-final division — the craft named: the two named, the zoning named: the two named, the traffic named — the path named); and the professional\u2019s-register (the project named — the craft\u2019s-arc: the design\u2019s-against-build division named, the IDPC named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Scheme Receipt Held',
      'The Weave Named',
      'The Zoning Named',
      'The IDPC Named at Survey Depth',
    ],
  },
]

export const interiorDesign: Book = {
  id: 'interior-design',
  title: 'Interior Design',
  subtitle: 'The inside craft — human factors, lighting, materials and the space planning\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the studio register)',
  description: 'The interior\u2019s discipline: the principles\u2019 register (the cross-reference from graphic-design — the two named: the unity-and-contrast division, the scale-and-proportion craft named: the two named); the human factors craft (the anthropometry honesty — the measure named: the two named: the 95th named — the craft\u2019s-consequence: the two named, the ergonomics cross-reference from physiotherapy, the accessible register named — the two named: the universal named: the craft\u2019s-consequence named); the lighting\u2019s-craft (the cross-reference from cinematography — the three named: the ambient\u2019s task-and-accent division fixed by drill, the colour\u2019s-honesty — the temperature named: the two named, the dimmer named: the layer receipt); the materials\u2019-and-finishes register (the floor\u2019s wall-and-ceiling division — the craft named: the two named: the durability\u2019s-against-aesthetics division, the sustainable named at survey depth — the VOC named); the furniture-and-styles census (the history cross-reference from the humanities shelf — the two named: the period named, the craft named — the two named: the built\u2019s-against-sourced division); the colour-and-textiles craft (the cross-reference from colour-theory — the scheme receipt: the two named, the textile census — the two named: the weave named); the space planning\u2019s-workflow (the two named: the bubble-and-final division — the craft named: the two named, the zoning named: the two named, the traffic named — the path named); and the professional\u2019s-register (the project named — the craft\u2019s-arc: the two named: the design\u2019s-against-build division, the IDPC named at survey depth).',
  status: 'planned',
  accent: ['#0891b2', '#155e75'],
  chapters,
}
