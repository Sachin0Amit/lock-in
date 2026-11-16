import type { Book, Chapter } from '../../../types'

/**
 * Colour Theory — the fourteenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `colour-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Colour Theory owns the colour register for the whole shelf. The light’s-physics to the physics shelf (cross-referenced); the eye’s physiology to the biology shelf (cross-referenced); the mixing’s-practice to painting; the digital’s-register to digital-art; the art-history receipts to the humanities shelf’s art-history book; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Albers Interaction of Color named as the pole (the context register).
 * - The Itten’s Art of Color named as the co-pole (the harmony register).
 * - The physics shelf cross-referenced for the spectrum-and-light depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'light-perception',
    title: 'The Light-and-Perception Foundation',
    summary:
      'The seeing\u2019s-craft: the spectrum\u2019s honesty (the visible\u2019s-slice — the physics cross-reference with the frequency register named); the eye\u2019s receipt (the cone-and-rod division cross-referenced from the biology shelf — the three-cone craft with the opponent named); the metamerism register (the context honesty — the same-looks-different receipt priced straight); the constancy-and-craft named (the brain\u2019s-correction honesty); and the adaptation register named (the after\u2019s-image receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Cone Craft Cross-Referenced',
      'The Metamerism Honesty Priced Straight',
      'The Constancy Honesty Named',
      'The After Receipt Named',
    ],
  },
  {
    number: 2,
    slug: 'systems-honesty',
    title: 'The Systems Honesty',
    summary:
      'The three-systems craft: the RGB\u2019s receipt (the additive\u2019s-honesty — the screen\u2019s register with the three-lamp receipt named); the CMY\u2019s craft (the subtractive\u2019s-honesty — the ink\u2019s register with the K-why named — the plate\u2019s-receipt); the RYB\u2019s honesty (the painter\u2019s-practical — the wheel\u2019s-historical receipt with the limit named: the Itten\u2019s-own caveat priced straight); the HSB register (the three-dimension\u2019s-craft — the cylinder honesty named); and the Munsell cross-reference (the perceptual\u2019s register — the three-dimension\u2019s craft fixed by drill).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Lamp Receipt Named',
      'The K-Why Named',
      'The Wheel\u2019s-Limit Priced Straight',
      'The Cylinder Honesty Named',
    ],
  },
  {
    number: 3,
    slug: 'relationships-harmony',
    title: 'The Relationships-and-Harmony Registers',
    summary:
      'The together\u2019s craft: the relationships\u2019 census (the complementary\u2019s receipt — the vibration honesty with the mixing\u2019s-consequence named, the analogous\u2019s craft — the family register, the split-and-triadic division named); the harmony\u2019s-strategies (the dominant\u2019s honesty — the one-colour receipt priced straight, the scheme census with the Itten register named); the temperature\u2019s register (the warm-and-cool division cross-referenced from painting — the bias honesty); and the proportion-and-craft named (the more-and-less receipt — the balance\u2019s register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vibration Honesty Named',
      'The One-Colour Receipt Priced Straight',
      'The Bias Honesty Cross-Referenced',
      'The More-and-Less Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'context-contrast',
    title: 'The Context-and-Contrast Craft',
    summary:
      'The Albers\u2019s discipline: the simultaneous\u2019s honesty (the same-looks-different receipt — the two-contexts craft priced straight); the contrast\u2019s census (the Itten-and-seven division named at survey depth — the value\u2019s-first register with the hue\u2019s saturation crafts); the optical\u2019s craft (the vibration register — the border honesty named); and the application\u2019s register (the each craft — the painting\u2019s-cross-reference with the design\u2019s-preview named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Contexts Craft Priced Straight',
      'The Value\u2019s-First Register Held',
      'The Border Honesty Named',
      'The Each-Craft Cross-Reference Held',
    ],
  },
  {
    number: 5,
    slug: 'practical-palettes',
    title: 'The Practical Palette Register',
    summary:
      'The working\u2019s-craft: the limited\u2019s-palette discipline (the few-pigment receipt cross-referenced from painting — the forced-mixing consequence named); the mixing\u2019s craft (the destination\u2019s-honesty — the mix-to-register with the avoid named, the tint-and-shade division — the white\u2019s black consequence priced straight); the digital\u2019s palette (the hex honesty named — the picker\u2019s craft with the gamut register named); and the brand\u2019s-preview named (the design\u2019s-craft cross-referenced from graphic-design — the corporate register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Forced-Mixing Consequence Named',
      'The White-and-Black Consequence Priced Straight',
      'The Gamut Register Named',
      'The Corporate Preview Named',
    ],
  },
]

export const colourTheory: Book = {
  id: 'colour-theory',
  title: 'Colour Theory',
  subtitle: 'The colour\u2019s discipline — perception, systems, relationships and the practical palettes',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the perception register)',
  description: 'The colour\u2019s discipline: the light\u2019s perception foundation (the physics cross-reference — the spectrum\u2019s honesty with the eye\u2019s receipt cross-referenced from the biology shelf, the metamerism register named); the systems\u2019 honesty (the RGB\u2019s CMY-and-RYB division held straight — the each receipt: the light\u2019s-additive against the ink\u2019s-subtractive against the painter\u2019s-practical, the HSB register named); the three\u2019s-dimensions craft (the hue\u2019s value-and-chroma division fixed by drill — the Munsell register named); the relationships\u2019 census (the complementary-and-analogous division — the wheel\u2019s-honesty with the temperature\u2019s register, the split\u2019s triadic crafts named); the harmony\u2019s-strategies (the dominant\u2019s honesty — the one-colour receipt priced straight, the scheme census with the Itten register named); the context\u2019s craft (the simultaneous honesty — the Albers receipt priced straight, the contrast\u2019s census with the value\u2019s-first register); the art-history\u2019s receipts cross-referenced (the humanities shelf\u2019s art-history book owns the register — the Impressionist\u2019s Fauve previews named); and the practical\u2019s-palette register (the limited\u2019s-craft cross-referenced from painting, the digital\u2019s palette — the hex honesty named).',
  status: 'planned',
  accent: ['#e11d48', '#4c0519'],
  chapters,
}
