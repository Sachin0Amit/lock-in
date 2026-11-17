import type { Book, Chapter } from '../../../types'

/**
 * Harmony — the third book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 25 planned lessons, zero written. Lesson ids will use the `harm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Harmony owns the vertical register. The counterpoint-and-linear craft to counterpoint (cross-referenced — the two disciplines held apart by their focus); the voice-leading’s notation basics to music-theory-notation; the form’s-depth to music-composition (the phrase’s-level here); the pop-and-harmony register named for the production book; the Kostka-and-ABRSM registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kostka and Payne’s Tonal Harmony — the full arc read this pass (the retrieved TOC: Part I Fundamentals / Part II Diatonic Triads / Part III Diatonic Seventh Chords / Part IV Chromaticism 1 / Part V Chromaticism 2 with the voice-leading through-modulation chapter list) as the spine.
 * - The Piston harmony named as the university co-pole.
 * - The graded register named with the school ladder held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'diatonic-progression',
    title: 'The Diatonic Progression',
    summary:
      'The diatonic craft: the Roman-numeral\u2019s architecture (the scale-degree quality map fixed by drill with the tonic\u2019s-supremacy honesty); the progression\u2019s census (the T-S-D-T receipt — the strong-and-weak division with the root motion\u2019s arithmetic, the circle-of-fifths\u2019 sequence register with the sequence-and-honesty named); the voice-leading craft (the part-writing\u2019s basics with the range\u2019s spacing honesty — the parallel-fifth\u2019s octave forbidden honesty priced straight as the style\u2019s-own grammar, the direct-fifth named); and the figured-bass\u2019s review cross-referenced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quality Map Fixed by Drill',
      'The Root Motion\u2019s Arithmetic Held',
      'The Forbidden Honesty Priced Straight as Grammar',
      'The Figured-Bass Review Cross-Referenced',
    ],
  },
  {
    number: 2,
    slug: 'inversions-six-four',
    title: 'The Inversions-and-Six-Four Register',
    summary:
      'The bass\u2019s craft: the inversion\u2019s census (the six\u2019s six-four registers with the figured honesty cross-referenced); the six-four\u2019s three honest uses (the cadential\u2019s passing-and-pedal division — the each receipt fixed by drill with the arpeggiation-and-alternative named); the bass\u2019s-arpeggiation craft (the melodic-bass honesty with the instrumental consequence named); and the voice-leading\u2019s-consequence (the doubled-bass honesty with the resolution\u2019s craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Honest Uses Fixed by Drill',
      'The Melodic-Bass Honesty Named',
      'The Doubled-Bass Honesty Held',
      'The Resolution Craft Named',
    ],
  },
  {
    number: 3,
    slug: 'cadences-phrases',
    title: 'The Cadences-and-Phrases Register',
    summary:
      'The punctuation\u2019s craft: the cadence\u2019s census (the authentic-and-perfect division with the plagal\u2019s half-and-Phrygian registers — the PAC\u2019s IAC honesty fixed by drill); the harmonic-rhythm\u2019s honesty (the rate\u2019s-craft with the degrees-and-register named); the phrase\u2019s craft (the motive-and-phrase division with the period\u2019s sentence forms — the parallel\u2019s contrast honesty cross-referenced from the rhythm book-and-hypermeter register); and the phrase\u2019s-expansion registers named (the extension\u2019s elision crafts at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The PAC-IAC Honesty Fixed by Drill',
      'The Rate\u2019s Craft Held',
      'The Period-and-Sentence Forms Named',
      'The Expansion Registers Named',
    ],
  },
  {
    number: 4,
    slug: 'nonchord-tones',
    title: 'The Non-Chord Tones',
    summary:
      'The linear\u2019s ornament: the census in full (the passing\u2019s neighbour crafts — the escape named, the suspension\u2019s-craft with the retardation honesty, the anticipation-and-appoggiatura division, the pedal-point register named); the suspension\u2019s arithmetic (the preparation-and-tongue honesty — the 9-8-and-7-6-and-4-3 census fixed by drill); the analysis craft (the figured honesty with the labeling register — the NCT\u2019s-identification drill); and the figured-bass-and-realisation named (the harmonisation craft at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census in Full by Its Crafts',
      'The Preparation Honesty Fixed by Drill',
      'The Identification Drill Held',
      'The Realisation Craft Named',
    ],
  },
  {
    number: 5,
    slug: 'seventh-chords',
    title: 'The Seventh-Chord Register',
    summary:
      'The dissonant\u2019s stack: the V7\u2019s craft in full (the resolutions honesty — the seventh\u2019s-downward receipt priced straight, the inverted\u2019s census with the V65-and-V43-and-V42 registers fixed by drill); the II7-and-VII7 registers named; the other-diatonic\u2019s register (the IV7-and-VI7-and-I7 crafts with the circle-of-fifths\u2019-sequence honesty); the approach-to-the seventh craft (the preparation\u2019s honesty — the same-direction receipt); and the dominant\u2019s-extended register named (the ninth\u2019s thirteenth crafts at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Seventh\u2019s Downward Receipt Priced Straight',
      'The Inverted Census Fixed by Drill',
      'The Preparation Honesty Held',
      'The Extended Register Named',
    ],
  },
  {
    number: 6,
    slug: 'chromatic-modulation',
    title: 'The Chromatic-and-Modulation Register',
    summary:
      'The colour\u2019s craft: the secondary-dominant\u2019s arc (the V/V craft with the spelling\u2019s honesty — the applied leading-tone receipt, the tonicisation\u2019s-against-modulation division held straight); the secondary-leading-tone register named; the modulation\u2019s census (the common-chord\u2019s craft with the pivot\u2019s honesty — the analysis\u2019s receipt, the sequential\u2019s common-tone-and-direct registers named); the mixture register named (the borrowed honesty — the iv\u2019s-craft with the Neapolitan named); and the twentieth-century\u2019s honesty (the mode-and-set registers named at survey depth — the tonal\u2019s-own end held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Applied Leading-Tone Receipt Priced Straight',
      'The Tonicisation-Modulation Division Held Straight',
      'The Pivot Honesty Named',
      'The Tonal\u2019s End Held Straight',
    ],
  },
]

export const harmony: Book = {
  id: 'harmony',
  title: 'Harmony',
  subtitle: 'The vertical craft — diatonic harmony, chromaticism and the modulation register',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the Kostka arc in full)',
  description: 'The harmonic discipline by the Kostka arc: the diatonic\u2019s foundation (the Roman-numeral\u2019s craft with the progression\u2019s census — the T-S-D-T honesty and the circle-of-fifths\u2019 sequence register, the voice-leading\u2019s craft with the parallel\u2019s-forbidden honesty — the rules priced straight as the style\u2019s-own grammar); the inversions\u2019 register (the bass\u2019s-arpeggiation craft with the six-four\u2019s three honest uses — the cadential\u2019s passing-and-pedal division); the cadence-and-phrase craft (the census — the authentic\u2019s plagal-and-half registers with the phrase\u2019s-period arc); the non-chord tones\u2019 census (the passing\u2019s neighbour\u2019s suspension crafts with the anticipation named); the seventh\u2019s-chord register (the V7\u2019s-craft in full with the approach-to-the seventh honesty); the chromaticism\u2019s arc (the secondary-dominant craft with the spelling\u2019s-honesty, the modulation\u2019s census — the common-chord-and-sequential division); the form-and-register named (the binary\u2019s ternary crafts with the blues\u2019s-twelve-bar named); and the twentieth-century honesty (the mode-and-set register named at survey depth — the tonal\u2019s-own end held straight).',
  status: 'planned',
  accent: ['#2563eb', '#1e3a8a'],
  chapters,
}
