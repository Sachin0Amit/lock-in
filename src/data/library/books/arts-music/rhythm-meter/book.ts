import type { Book, Chapter } from '../../../types'

/**
 * Rhythm & Meter — the second book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `rhy-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Rhythm & Meter owns the time craft. The notation’s basics belong to music-theory-notation (cross-referenced — the writing there, the time here); the harmonic rhythm belongs to harmony; the tala’s-Indian depth to classical-dance (cross-referenced); the pop’s-groove register named for the production book; the ABRSM-and-graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kostka’s Tonal Harmony — Chapter 2 Elements of Rhythm read this pass (the retrieved TOC: Rhythm / Durational Symbols / Beat and Tempo / Meter / Division of the Beat / Simple-and-Compound Time Signatures) as the spine.
 * - The West-African and Indian register names priced straight as the two other great traditions.
 * - The graded register named with the school ladder held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'beat-subdivision',
    title: 'The Beat and the Subdivision',
    summary:
      'The pulse\u2019s craft: the tactus honesty (the beat\u2019s-felt register with the tempo\u2019s bpm arithmetic); the subdivision census (the dupe-and-triple division — the two-against-three preview held straight); the accent\u2019s honesty (the metric\u2019s-against-dynamic division — the two held apart); the anacrusis register named (the upbeat\u2019s craft with the bar\u2019s honesty); and the tempo\u2019s register (the metronome\u2019s craft with the Italian census named for the theory book\u2019s-own register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tactus Honesty Held',
      'The Two-against-Three Preview Held Straight',
      'The Metric-Dynamic Division Held Apart',
      'The Upbeat Craft Named',
    ],
  },
  {
    number: 2,
    slug: 'simple-compound',
    title: 'The Simple-and-Compound Meters',
    summary:
      'The meter\u2019s two families: the simple\u2019s craft (the 2-4-and-3-4-and-4-4 census with the beat\u2019s-division honesty — the quarter\u2019s-receipt fixed by drill); the compound\u2019s craft (the 6-8-and-9-8-and-12-8 census with the dotted-beat\u2019s honesty — the three-division receipt fixed by drill); the reading\u2019s craft (the 6-8-against-3-4 confusion honestly resolved — the grouping receipt priced straight); the alternating register named (the meter\u2019s-change craft with the El-Garrote honesty at survey depth); and the famous receipts named (the waltz\u2019s 3-4 with the march\u2019s 2-4 register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quarter Receipt Fixed by Drill',
      'The Dotted-Beat Honesty Held',
      'The Grouping Receipt Priced Straight',
      'The Famous Receipts Named',
    ],
  },
  {
    number: 3,
    slug: 'asymmetric-syncopation',
    title: 'The Asymmetric-and-Syncopation Registers',
    summary:
      'The off-grid crafts: the asymmetric\u2019s register (the 5-8-and-7-8 crafts with the Balkan honesty — the aksak division named, the two-plus-three grouping arithmetic fixed by drill); the syncopation\u2019s craft (the anticipated honesty — the off-beat receipt with the backbeat-and-register named, the tied-over craft with the bar\u2019s-spanning honesty); the swing\u2019s craft (the triplet honesty with the notation-limit priced straight — the straight-and-swung division); and the groove-and-preview named (the pocket honesty for the production book\u2019s-own depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aksak Division Named',
      'The Anticipated Honesty Priced Straight',
      'The Notation-Limit Honesty Held',
      'The Pocket Preview Named',
    ],
  },
  {
    number: 4,
    slug: 'tuplets-polyrhythm',
    title: 'The Tuplets and the Polyrhythm',
    summary:
      'The layered time: the tuplet\u2019s census (the triplet\u2019s dupe crafts with the fractional honesty — the time\u2019s-division arithmetic); the polyrhythm\u2019s craft (the 3-against-4 receipt walked slowly — the Herta named at survey depth, the phrase-length honesty with the cycle\u2019s-arithmetic, the 4-against-3-and-5-against-4 registers named); the cross-rhythm\u2019s honesty (the African register named — the bell pattern\u2019s craft with the twelve-pulse cycle priced straight); and the notation\u2019s honesty (the two-staves named — the bracket craft for the true simultaneous division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fractional Honesty Held',
      'The 3-against-4 Walked Slowly',
      'The Bell Pattern Priced Straight',
      'The Two-Staves Craft Named',
    ],
  },
  {
    number: 5,
    slug: 'phrase-hypermeter',
    title: 'The Phrase and the Hypermeter',
    summary:
      'The larger time: the phrase\u2019s craft (the four-bar register with the eight-bar honesty — the period\u2019s preview cross-referenced from the harmony book); the hypermeter\u2019s honesty (the bar\u2019s-grouping craft — the strong-bar-and-register named); the phrase\u2019s-types census (the parallel\u2019s-against-contrast division with the period\u2019s sentence crafts cross-referenced); and the extended-and-register named (the elision\u2019s honesty — the phrase\u2019s-overlap craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four-Bar Register Named',
      'The Grouping Craft Held',
      'The Period Preview Cross-Referenced',
      'The Elision Honesty Named',
    ],
  },
  {
    number: 6,
    slug: 'world-rhythms',
    title: 'The World\u2019s Rhythmic Register',
    summary:
      'The other great traditions held straight: the Indian tala\u2019s arc (the tal register with the bols honesty cross-referenced to the classical-dance book — the Adi register fixed by drill, the jati census named); the West-African register (the bell\u2019s drum crafts with the polyrhythm\u2019s-centre honesty — the Gankogui named at survey depth); the Latin register named (the clave\u2019s craft with the 3-2-against-2-3 honesty); the Middle-Eastern register named (the maqam\u2019s-rhythmic brother with the samai register); and the honesty held straight (the notational limit — the two traditions\u2019 oral register named with the respect priced straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bols Honesty Cross-Referenced',
      'The Centre Honesty Named',
      'The Clave Craft Held',
      'The Oral Register Named with Respect',
    ],
  },
]

export const rhythmMeter: Book = {
  id: 'rhythm-meter',
  title: 'Rhythm & Meter',
  subtitle: 'The time craft — beat, subdivision, syncopation and the meters of the world',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the groove register)',
  description: 'The rhythm\u2019s discipline in its own depth: the beat-and-subdivision craft (the pulse\u2019s honesty with the tactus register, the subdivision\u2019s arithmetic — the duple-and-triple division); the simple meters\u2019 depth (the 2-4-and-3-4 crafts with the accent\u2019s honesty); the compound meters\u2019 craft (the 6-8-and-9-8-and-12-8 census with the dotted-beat\u2019s honesty — the two-against-three division held straight); the asymmetric\u2019s register (the 5-8-and-7-8 crafts with the Balkan honesty named); the syncopation-and-swing craft (the off-beat\u2019s honesty with the triplet-swing arithmetic — the notation-limit honesty priced straight); the tuplet-and-polyrhythm register (the 3-against-4 craft with the cross-rhythm honesty — the West-African register named); the phrase-and-hypermeter craft (the bar\u2019s-grouping honesty with the four-bar-and-phrase register); and the world-and-rhythmic register (the tala\u2019s Indian arc cross-referenced to the classical-dance book\u2019s-own depth with the West-African register named — the two traditions held straight).',
  status: 'planned',
  accent: ['#0891b2', '#155e75'],
  chapters,
}
