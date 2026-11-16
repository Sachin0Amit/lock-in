import type { Book, Chapter } from '../../../types'

/**
 * Cinematography — the thirtieth book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `cine-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Cinematography owns the camera register. The photography’s-foundation to photography (cross-referenced); the film’s-analysis to film-studies; the lighting’s-studio craft shared with photography; the production’s-technique to stage-production (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Barsam named as the pole with the Blain Brown co-pole (the craft register).
 * - The photography cross-reference held for the exposure depth.
 * - The NCERT line named as the school register with the set honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'camera-format',
    title: 'The Camera-and-Format Craft',
    summary:
      'The image\u2019s-machine: the sensor-and-film division (the two named — the chemical\u2019s-against-electronic honesty: the look\u2019s-named-at-survey-depth named, the size receipt — the two named: the full named with the Super named); the aspect\u2019s-census (the two named — the 1.85 named with the anamorphic named: the squeeze receipt, the creative\u2019s-consequence: the two named); and the frame\u2019s-rate named (the two named: the 24 receipt — the craft\u2019s-consequence: the shutter named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Held Straight',
      'The Squeeze Receipt Named',
      'The 24 Receipt Named',
      'The Shutter Named',
    ],
  },
  {
    number: 2,
    slug: 'lens-exposure',
    title: 'The Lens-and-Exposure Craft',
    summary:
      'The optic\u2019s-discipline: the lens\u2019s-register (the focal cross-reference from photography — the three named: the wide\u2019s normal-and-telephoto division with the perspective consequence named — the two named, the fast\u2019s-against-sharp honesty held — the craft\u2019s-choice named, the zoom\u2019s-against-prime division named — the cinema\u2019s-choice honesty); the exposure\u2019s craft (the t-stop named — the cinema\u2019s-honesty: the transmission receipt, the filters named — the two named: the ND-and-polariser division, the IR named at survey depth); and the dynamic\u2019s-range register (the two named — the ND-and-LUT division: the grade\u2019s-consequence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transmission Receipt Named',
      'The Craft\u2019s-Choice Honesty Held',
      'The Range Honesty Held',
      'The Grade Consequence Named',
    ],
  },
  {
    number: 3,
    slug: 'lighting-craft',
    title: 'The Lighting Craft',
    summary:
      'The light\u2019s-cinema discipline: the three-point\u2019s-cross-reference (the two named: the key-and-fill division — the ratio named); the hard-and-soft division (the size receipt — the two named: the bigger\u2019s closer honesty, the source named: the motivated honesty — the window receipt); the style\u2019s-census (the two named: the naturalistic\u2019s-against-expressionist division — the noir named: the craft receipt, the day named — the craft\u2019s-principle named: the two named); the colour\u2019s craft (the temperature cross-reference — the CTO named: the correction named, the contrast named — the colour\u2019s-craft: the gel census); and the gaffer\u2019s-division named (the department cross-reference: the key\u2019s-craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ratio Named',
      'The Motivated Honesty Named',
      'The Noir Named',
      'The Gel Census Named',
    ],
  },
  {
    number: 4,
    slug: 'movement-colour-grading',
    title: 'The Movement, Colour-and-Grading Registers',
    summary:
      'The move\u2019s look crafts: the movement\u2019s-census (the two named: the fixed\u2019s-against-movement division — the craft\u2019s-why named, the dolly-and-track named, the handheld named: the honesty receipt — the two named: the document\u2019s-against-fiction division, the stabilised named — the two named, the crane-and-drone division named); the colour-and-grading register (the two named: the camera\u2019s-against-grade division — the look craft: the LUT cross-reference named, the shot\u2019s-named: the consistency receipt); and the language\u2019s cross-reference (the film-studies sibling — the two named: the craft\u2019s-against-analysis division held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Craft\u2019s-Why Named',
      'The Document-Fiction Division Named',
      'The Consistency Receipt Held',
      'The Sibling Division Held Straight',
    ],
  },
  {
    number: 5,
    slug: 'set-collaboration',
    title: 'The Set-Collaboration Craft',
    summary:
      'The department\u2019s-discipline: the department\u2019s-census (the DP\u2019s-craft — the keeper named: the look\u2019s-keeper receipt, the gaffer named — the light\u2019s-keeper: the two honesty, the grip named — the two named: the support division); the floor\u2019s-craft (the block named — the coverage receipt: the two named, the storyboard cross-reference from animation, the slate named — the two named); and the continuity\u2019s-register named (the script named — the supervisor named at survey depth: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Look\u2019s-Keeper Receipt Held',
      'The Support Division Named',
      'The Coverage Receipt Named',
      'The Coverage Honesty Held',
    ],
  },
]

export const cinematography: Book = {
  id: 'cinematography',
  title: 'Cinematography',
  subtitle: 'The camera\u2019s craft — light, lens, movement and the department\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the camera register)',
  description: 'The camera\u2019s discipline: the camera-and-format craft (the sensor-and-film division — the two named: the chemical\u2019s-against-electronic honesty, the size receipt — the two named: the full named, the aspect\u2019s-census — the two named with the anamorphic named); the lens\u2019s-register (the focal cross-reference from photography — the three named: the wide\u2019s normal-and-telephoto division with the perspective consequence named, the fast\u2019s-against-sharp honesty held, the zoom\u2019s-against-prime division named); the exposure-and-metering craft (the triangle cross-reference from photography — the t-stop named: the cinema\u2019s-honesty with the filters named, the dynamic\u2019s-range named — the two named: the ND-and-LUT division); the lighting\u2019s-foundation (the three-point cross-reference — the two named: the hard-and-soft division: the size receipt, the style\u2019s-census — the two named: the naturalistic\u2019s-against-expressionist division, the colour\u2019s-craft — the temperature cross-reference: the CTO named); the movement\u2019s-craft (the census named — the two named: the fixed\u2019s-against-movement division, the dolly-and-track named, the stabilised named — the craft\u2019s-consequence: the two named, the crane-and-drone division named); the colour-and-grading register (the two named: the camera\u2019s-against-grade division — the look craft: the LUT cross-reference, the LUT named); the set\u2019s-collaboration (the department named — the DP-and-gaffer division, the floor named: the block named); and the language\u2019s cross-reference (the film-studies sibling — the two named: the craft\u2019s-against-analysis division held straight).',
  status: 'planned',
  accent: ['#0369a1', '#082f49'],
  chapters,
}
