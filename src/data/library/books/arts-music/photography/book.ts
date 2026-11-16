import type { Book, Chapter } from '../../../types'

/**
 * Photography — the twentieth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `photo-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Photography owns the still-image register. The optics’-physics to the physics shelf (cross-referenced — the lens-and-light sibling views); the composition to drawing; the colour to colour-theory; the digital’s workflow to digital-art (cross-referenced); the history-and-criticism to the humanities shelf’s art-history book; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Peterson Understanding Exposure named as the pole (the exposure register).
 * - The Freeman Photographer-and-Eye named as the composition co-pole.
 * - The physics shelf cross-referenced for the optics depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'exposure-triangle',
    title: 'The Exposure-Triangle Craft',
    summary:
      'The light\u2019s arithmetic: the triangle\u2019s honesty (the aperture\u2019s shutter-and-ISO division — the three-ways receipt fixed by drill with the each-consequence register); the stop\u2019s craft (the halving receipt — the two-times named, the equal trade named: the constant named at survey depth); the ISO\u2019s honesty (the sensitivity\u2019s-register — the noise consequence named); the manual\u2019s-against-priority division held straight (the M named with the why named); and the histogram\u2019s craft (the clip honesty — the two-ends named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Ways Receipt Fixed by Drill',
      'The Halving Receipt Priced Straight',
      'The Noise Consequence Named',
      'The Two-Ends Named',
    ],
  },
  {
    number: 2,
    slug: 'light-metering',
    title: 'The Light-and-Metering Craft',
    summary:
      'The reading\u2019s-craft: the meter\u2019s honesty (the 18 receipt named — the grey card named, the meter\u2019s-against-scene division: the incident\u2019s-against-reflected division held straight); the exposure\u2019s-division (the high-key\u2019s low-key registers with the intention honesty named); the natural-light craft (the window\u2019s receipt — the soft\u2019s-against-hard division, the golden named with the blue named, the weather register named); and the harsh\u2019s-craft named (the noon\u2019s-honesty — the shade receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Incident-Reflected Division Held Straight',
      'The Intention Honesty Named',
      'The Golden Named',
      'The Shade Receipt Named',
    ],
  },
  {
    number: 3,
    slug: 'composition-lens',
    title: 'The Composition-and-Lens Registers',
    summary:
      'The frame\u2019s optics crafts: the composition\u2019s craft (the third\u2019s named with the why named — the break honesty priced straight, the frame-and-line registers — the lead\u2019s-craft named, the balance named); the lens\u2019s register (the focal census — the wide\u2019s normal-and-telephoto division with the perspective consequence named: the compression\u2019s-against-expansion division, the aperture\u2019s-craft — the f-number named with the sharp\u2019s-against-fast honesty held); and the prime\u2019s-against-zoom division named (the craft\u2019s-choice honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Break Honesty Priced Straight',
      'The Compression Division Held Straight',
      'The Sharp-Fast Honesty Held',
      'The Craft\u2019s-Choice Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'studio-flash',
    title: 'The Studio-and-Flash Craft',
    summary:
      'The made-light\u2019s discipline: the strobe\u2019s register (the key-and-fill division fixed by drill — the ratio\u2019s-arithmetic named, the hair-and-rim registers named); the modifier\u2019s census (the softbox-and-grid division — the size\u2019s-honesty: the bigger named with the closer receipt, the beauty named at survey depth); the flash\u2019s-arithmetic (the power\u2019s-division — the guide receipt named); and the speedlight-and-craft named (the TTL honesty — the manual named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ratio Arithmetic Named',
      'The Bigger-Closer Receipt Held',
      'The Guide Receipt Named',
      'The TTL Honesty Named',
    ],
  },
  {
    number: 5,
    slug: 'post-genres',
    title: 'The Post-and-Genres Registers',
    summary:
      'The file\u2019s field crafts: the post-processing discipline (the RAW\u2019s honesty — the negative receipt named: the Non destructive cross-reference from production, the workflow craft — the catalog register, the edit\u2019s-arc: the select named — the take honesty, the histogram cross-reference); the genres census (the portrait\u2019s street-and-landscape division with the each-craft register — the wait receipt named for the street, the golden-hour for the landscape); the document\u2019s-register (the ethics honesty priced straight — the alter named: the trust receipt); and the criticism register cross-referenced (the art-history sibling — the Kertesz named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Negative Receipt Named',
      'The Take Honesty Held',
      'The Trust Receipt Priced Straight',
      'The Sibling Cross-Reference Held',
    ],
  },
]

export const photography: Book = {
  id: 'photography',
  title: 'Photography',
  subtitle: 'The light\u2019s craft — exposure, composition, the genres and the post-processing discipline',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the darkroom-and-digital register)',
  description: 'The photography\u2019s discipline: the camera-and-exposure craft (the triangle\u2019s honesty — the aperture\u2019s shutter-and-ISO division fixed by drill with the each-consequence register: the depth\u2019s-against-motion division, the stop-and-arithmetic named — the halving receipt); the light-and-metering craft (the metre\u2019s honesty — the 18 receipt named, the exposure\u2019s-division: the high-key\u2019s low-key registers, the natural-light craft — the window\u2019s receipt with the golden named); the composition\u2019s craft (the cross-reference from drawing — the rule\u2019s-against-break honesty priced straight: the third\u2019s named with the why named, the frame-and-line registers); the lens-and-optics register (the focal-length census — the wide\u2019s normal-and-telephoto division with the perspective consequence named, the aperture\u2019s craft — the f-number named, the bokeh honesty named — the physics cross-reference held); the studio-and-flash craft (the strobe\u2019s register — the key-and-fill division fixed by drill, the modifier census: the softbox-and-grid division); the post-processing\u2019s discipline (the RAW\u2019s honesty — the negative receipt named, the workflow craft — the catalog register, the nondestructive cross-reference from production — the layer\u2019s-division named, the histogram craft with the clip named); the genres\u2019 census (the portrait\u2019s street-and-landscape division with the each-craft register, the document named — the ethics honesty priced straight); and the history-and-criticism register cross-referenced (the humanities shelf\u2019s art-history book owns the art-history register — the Kertesz named at survey depth).',
  status: 'planned',
  accent: ['#0369a1', '#0c4a6e'],
  chapters,
}
