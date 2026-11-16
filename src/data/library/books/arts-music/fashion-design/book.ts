import type { Book, Chapter } from '../../../types'

/**
 * Fashion Design — the thirty-fifth book of the Arts-Music shelf (the design register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 4 chapters /
 * 16 planned lessons, zero written. Lesson ids will use the `fash-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Fashion Design owns the garment register. The fibre’s-census to the biology shelf’s economic-botany (cross-referenced); the colour to colour-theory; the drawing’s-foundation to drawing; the history to the humanities shelf (cross-referenced); the business’s-register to the economics-commerce shelf’s marketing book (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Armstrong-and-Patternmaking named as the technical pole.
 * - The Stecker named as the draping co-pole with the Abling drawing co-pole.
 * - The NCERT line named as the school register with the atelier honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'figure-drawing-fashion',
    title: 'The Figure-and-Fashion-Drawing Craft',
    summary:
      'The nine-head\u2019s-discipline: the croquis honesty (the nine named fixed by drill — the two named: the stylised\u2019s-against-real division: the two named, the weight named — the two named: the craft\u2019s-why named); the gesture cross-reference from drawing (the craft named — the two named); the flats register (the two named: the technical\u2019s-against-illustrative division — the craft named: the spec named); and the media census named (the two named: the marker-and-digital division — the digital cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nine Fixed by Drill',
      'The Spec Named',
      'The Technical-Illustrative Division Named',
      'The Digital Cross-Reference Named',
    ],
  },
  {
    number: 2,
    slug: 'textiles-construction',
    title: 'The Textiles-and-Construction Register',
    summary:
      'The cloth\u2019s seam crafts: the textiles\u2019 register (the fibre census cross-referenced from the biology shelf — the two named: the natural-and-man division, the weave cross-reference: the two named, the knit named — the two named: the stretch\u2019s-honesty named, the behaviour named: the two named: the drape\u2019s-against-body division); the construction\u2019s-craft (the two named: the cut named: the two named, the seam census — the two named: the finish named, the ease named — the two named: the craft\u2019s-consequence named); and the notion census named (the two named — the craft\u2019s-consequence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stretch Honesty Named',
      'The Drape-Body Division Named',
      'The Finish Named',
      'The Notion Census Named',
    ],
  },
  {
    number: 3,
    slug: 'pattern-draping',
    title: 'The Pattern-and-Draping Craft',
    summary:
      'The flat\u2019s form crafts: the pattern\u2019s-making (the block-and-draft division — the sloper named: the two named, the draft-and-true division named: the two named, the marking named: the two named); the draping craft (the muslin named — the toile receipt: the two named: the fit named, the form named — the two named: the body\u2019s honesty); the grading register (the two named — the craft\u2019s-why: the two named); and the tech\u2019s-pack named (the craft named — the communication honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Toile Receipt Held',
      'The Body\u2019s Honesty Held',
      'The Grading Named',
      'The Communication Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'history-collection',
    title: 'The History-and-Collection Registers',
    summary:
      'The tradition\u2019s maker crafts: the history\u2019s-register (the cross-reference from the humanities shelf — the two named: the 1900 named: the silhouette\u2019s-arc: the two named, the couture named — the two named: the craft\u2019s-division, the craft named — the two named); the collection\u2019s process (the mood named — the craft\u2019s-why: the two named, the look named — the craft named: the two named, the line named — the two named: the story named); and the industry\u2019s register (the tech named — the two named: the craft\u2019s-division, the portfolio receipt — the craft named: the look named, the ethics named at survey depth — the sustainable named: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Silhouette Arc Named',
      'The Two Named',
      'The Story Named',
      'The Sustainable Named',
    ],
  },
]

export const fashionDesign: Book = {
  id: 'fashion-design',
  title: 'Fashion Design',
  subtitle: 'The garment\u2019s craft — figure, textiles, pattern and the collection\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the atelier register)',
  description: 'The fashion\u2019s discipline: the fashion\u2019s-as-system craft (the two named: the industry\u2019s-against-craft division — the craft named, the collection named: the why named: the two named); the figure\u2019s fashion-drawing craft (the nine named — the croquis honesty fixed by drill: the two named, the drape named: the two named, the flat named — the two named: the technical\u2019s-against-illustrative division); the textiles\u2019-and-fabrics register (the cross-reference from the biology shelf\u2019s economic-botany — the fibre census: the two named: the natural-and-man division, the weave craft cross-referenced from interior-design: the two named, the knit named — the two named: the stretch\u2019s-honesty: the craft\u2019s-consequence, the behaviour named: the two named); the garment\u2019s-construction craft (the two named: the pattern named: the block-and-draft division, the sloper named — the two named, the draping craft — the cross-reference: the muslin named: the two named, the toile receipt, the seam census — the two named, the ease named: the two named: the craft\u2019s-consequence); the pattern\u2019s-making craft (the draft-and-true division — the two named, the grading named — the two named: the craft\u2019s-why: the two named); the history-and-movements register (the cross-reference from the humanities shelf — the two named: the 1900 named: the two named, the craft named — the two named: the androgyny named at survey depth); the collection\u2019s-design process (the craft named — the two named: the mood named: the craft\u2019s-why, the look named — the craft named: the two named, the line named — the two named); and the industry-and-portfolio register (the craft named — the tech named: the two named, the portfolio receipt — the craft named: the look named, the ethics named at survey depth — the sustainable named: the two named).',
  status: 'planned',
  accent: ['#be185d', '#831843'],
  chapters,
}
