import type { Book, Chapter } from '../../../types'

/**
 * Typography — the nineteenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 21 planned lessons, zero written. Lesson ids will use the `typo-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Typography owns the letter register. The design’s-application to graphic-design (cross-referenced); the grid’s-depth to graphic-design; the printing’s-history to the humanities shelf’s art-history book; the web-font’s craft to the CS shelf’s front-end books (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Lupton Thinking with Type named as the pole.
 * - The Bringhurst named as the classic co-pole (the detail register).
 * - The CS shelf cross-referenced for the web-font depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'anatomy-letterform',
    title: 'The Anatomy-of-Letterform',
    summary:
      'The letter\u2019s-body: the anatomy\u2019s census (the baseline\u2019s x-height division fixed by drill with the ascender-and-descender registers, the optical named at survey depth — the overshoot honesty); the counter honesty (the void receipt — the enclosed register named); the contrast\u2019s register (the thin-and-thick division — the stress honesty named); and the craft\u2019s receipt (the each letter\u2019s-check — the g named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Overshoot Honesty Named',
      'The Void Receipt Held',
      'The Stress Honesty Named',
      'The Each-Letter Check Named',
    ],
  },
  {
    number: 2,
    slug: 'classification-history',
    title: 'The Classification-and-History Arc',
    summary:
      'The style\u2019s-lineage: the humanist\u2019s craft (the Garamond receipt — the calligraphic honesty named); the transitional\u2019s-register (the Baskerville receipt — the Enlightenment\u2019s-consequence named); the didone\u2019s-craft (the Bodoni receipt — the contrast\u2019s-extreme honesty with the display consequence named); the slab register named (the industrial receipt — the advertising consequence); the sans arc (the grotesque-and-geometric division — the Helvetica honesty priced straight, the humanist\u2019s-return named); and the digital register named (the screen\u2019s-arc — the dyslexic craft named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Garamond Receipt Named',
      'The Bodoni Receipt Priced Straight',
      'The Helvetica Honesty Priced Straight',
      'The Screen\u2019s Arc Named',
      'Observation And Design Sensitivity \u2014 Capacity To Detect Concealed',
    ],
  },
  {
    number: 3,
    slug: 'selection-detail',
    title: 'The Selection-and-Detail Craft',
    summary:
      'The choosing\u2019s setting crafts: the family\u2019s-selection (the two-family\u2019s honesty — the complement register: the serif-and-sans division, the casting craft — the role receipt named); the detail\u2019s-craft (the kerning-and-tracking division — the two held apart: the pair\u2019s-against-the range honesty, the leading honesty with the auto named — the adjust receipt); the hierarchy\u2019s craft (the scale register — the modular named with the two-step receipt); and the small\u2019s-craft named (the caption register — the fine print honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pair\u2019s-against-the Range Honesty Held',
      'The Adjust Receipt Named',
      'The Modular Named',
      'The Fine-Print Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'page-composition',
    title: 'The Page-Composition Craft',
    summary:
      'The text\u2019s-architecture: the measure\u2019s honesty (the 45-to-75 receipt fixed by drill — the CPL register named, the too-long consequence named — the eye\u2019s-lost honesty); the justification\u2019s-register (the ragged named — the two crafts held straight: the flush\u2019s-against-justified division with the river named); the hyphenation\u2019s-craft named; the vertical\u2019s-register (the space\u2019s-between honesty — the paragraph division named: the indented\u2019s-against-blocked); and the grids cross-reference (the Brody named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The 45-to-75 Receipt Fixed by Drill',
      'The River Named',
      'The Indented-Blocked Division Named',
      'The Cross-Reference Held',
    ],
  },
  {
    number: 5,
    slug: 'screen-expressive-technology',
    title: 'The Screen, Expressive-and-Technology Registers',
    summary:
      'The new\u2019s-crafts: the screen\u2019s-typography (the responsive honesty — the fluid named: the fixed\u2019s-against-fluid division, the rendering\u2019s-craft — the hint named, the fout named at survey depth); the web-font\u2019s arc (the format census — the woffe division named, the loading\u2019s-craft with the subset register named — the CS cross-reference held); the type-as-image register (the expressive craft — the letter\u2019s-own honesty priced straight: the illegibility caution named); and the technology register (the OTF-and-variable division — the axis craft named with the licence honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fluid Division Held Straight',
      'The Subset Register Named',
      'The Illegibility Caution Named',
      'The Axis Craft Named',
    ],
  },
]

export const typography: Book = {
  id: 'typography',
  title: 'Typography',
  subtitle: 'The letter\u2019s craft — anatomy, classification, detail and the page\u2019s typographic architecture',
  discipline: 'arts-music',
  level: 'Beginner → professional (the letter register)',
  description: 'The type\u2019s discipline: the letterform\u2019s-anatomy (the baseline\u2019s x-height division with the ascender-and-descender registers fixed by drill, the counter honesty — the void receipt named, the typographic\u2019s-craft with the bowl-and-stroke registers named); the classification\u2019s history arc (the humanist-and-transitional division — the Garamond\u2019s Baskerville receipts named, the didone register with the Bodoni receipt, the slab register named — the history cross-referenced to the humanities shelf\u2019s art-history book for the periods); the family\u2019s-selection craft (the two-family\u2019s honesty — the complement register, the font-and-typeface division held straight — the design\u2019s-against-the file honesty); the typographic\u2019s-detail craft (the kerning-and-tracking division — the two held apart, the leading honesty with the auto named, the hierarchy\u2019s-craft — the scale register: the modular named); the page\u2019s-composition (the measure\u2019s honesty — the 45-to-75 receipt fixed by drill, the justification register — the ragged named, the hyphenation named); the screen\u2019s typography (the responsive honesty — the fluid named, the rendering\u2019s-craft — the hint named, the web-font\u2019s-arc named); the type\u2019s-as-image register (the expressive craft — the letter\u2019s-own honesty priced straight); and the font\u2019s-technology (the OTF-and-variable division named — the format honesty with the licence\u2019s-register named).',
  status: 'planned',
  accent: ['#0f172a', '#020617'],
  chapters,
}
