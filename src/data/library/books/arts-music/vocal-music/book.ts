import type { Book, Chapter } from '../../../types'

/**
 * Vocal Music — the tenth book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `vocal-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Vocal Music owns the singing register. The breathing’s phonation physiology to the medical shelf’s medical-physiology (cross-referenced — the sibling views); the acoustics beneath to acoustics; the Indian classical’s-own depth to classical-dance (the music register shared); the graded-and-conservatory registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Vacc book named as the pole (the pedagogy register) with the Miller’s-craft co-pole.
 * - The biology shelf cross-referenced for the respiration-and-larynx depth.
 * - The Indian register priced straight with the classical-dance book cross-referenced.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'instrument-anatomy',
    title: 'The Instrument\u2019s Own Anatomy',
    summary:
      'The singer\u2019s-body craft: the breath\u2019s arc (the appoggio honesty — the muscular craft priced straight, the diaphragm\u2019s register cross-referenced from the biology shelf, the rib-and-abdominal division with the support honesty); the larynx\u2019s craft (the vocal-fold\u2019s-honesty — the mucosal register with the Adduction division, the overtone\u2019s-craft named cross-referenced from acoustics); the resonator\u2019s census (the throat\u2019s mouth-and-nose division — the tuning register); and the care\u2019s honesty (the hygiene census with the rest honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Appoggio Honesty Priced Straight',
      'The Adduction Division Held',
      'The Tuning Register Named',
      'The Hygiene Census Named',
    ],
  },
  {
    number: 2,
    slug: 'technique-register',
    title: 'The Technique Register',
    summary:
      'The coordination\u2019s craft: the registration honesty (the chest-and-head division with the passaggio craft — the bridge receipt priced straight); the onset\u2019s census (the attack\u2019s division — the liquid\u2019s glottal crafts with the balanced receipt); the vowel\u2019s craft (the formant tuning honesty cross-referenced from acoustics — the forward\u2019s-register named); the vibrato register (the rate\u2019s honesty — the six-per-second receipt named); the dynamics\u2019s craft (the messa\u2019s di voce register named at survey depth); and the practice\u2019s craft (the warm-up census with the half-voice honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bridge Receipt Priced Straight',
      'The Balanced Onset Held',
      'The Forward Register Named',
      'The Half-Voice Honesty Named',
      'Paper 1 Listening \u2014 Section A: Compositional Techniques And Performance',
      'Paper 1 Listening \u2014 Section B: Understanding Music (musical Understanding,',
    ],
  },
  {
    number: 3,
    slug: 'diction-craft',
    title: 'The Diction Craft',
    summary:
      'The word\u2019s craft: the IPA honesty (the symbol census — the vowel-and-consonant division with the each-language register); the Italian\u2019s craft (the pure-vowel honesty — the open-and-division named); the German\u2019s register (the umlaut census with the consonant cluster honesty); the French\u2019s register (the nasal census with the Elision named); the English\u2019s-honesty (the diphthong\u2019s-craft — the modification register named); and the word\u2019s-arc (the phrase\u2019s-legato craft — the vowel\u2019s-linking receipt named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Symbol Census Fixed by Drill',
      'The Pure-Vowel Honesty Held',
      'The Nasal Census Named',
      'The Linking Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'indian-classical-voice',
    title: 'The Indian Classical Voice',
    summary:
      'The tradition\u2019s-own craft: the riyaz\u2019s-arc (the practice discipline — the tanpura\u2019s honesty with the drone\u2019s register, the paltas craft named); the voice\u2019s-craft (the throaty-and-Open division — the placement honesty, the gamaka register — the ornament\u2019s craft with the slide receipt named); the Hindustani-and-Carnatic division (the two-voice registers held straight — the khyal-and-pallavi division named); and the bandish honesty named at survey depth (the fixed-and-improvised division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Drone\u2019s Register Held',
      'The Gamaka Craft Named',
      'The Two-Tradition Division Held Straight',
      'The Bandish Honesty Named',
    ],
  },
  {
    number: 5,
    slug: 'repertoire-choir',
    title: 'The Repertoire-and-Choir Registers',
    summary:
      'The literature\u2019s ensemble crafts: the classical\u2019s-Italian arc (the early-Italian receipt with the twenty-four named at survey depth, the German-Lied craft with the poetry honesty); the English register named (the lute\u2019s British crafts); the musical-and-pop registers (the belt honesty held straight — the mix craft named, the acting honesty cross-referenced to the acting book); the choir\u2019s-craft (the parts\u2019-blending honesty — the choral balance register with the vowel\u2019s-match craft, the ensemble\u2019s ear honesty — the intonation\u2019s-listen receipt named); and the stagecraft-and-register named (the performance anxiety honesty with the craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Poetry Honesty Held',
      'The Mix Craft Named',
      'The Vowel\u2019s-Match Craft Held',
      'The Performance Anxiety Honesty Named',
    ],
  },
]

export const vocalMusic: Book = {
  id: 'vocal-music',
  title: 'Vocal Music',
  subtitle: 'The singing craft — breath, resonance, diction and the repertoire registers',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the singer\u2019s register)',
  description: 'The voice\u2019s discipline: the instrument\u2019s-own anatomy (the breath\u2019s-craft — the appoggio honesty with the diaphragm\u2019s register cross-referenced from the biology shelf, the larynx\u2019s-craft — the vocal-fold honesty with the overtone-and-craft named, the resonator\u2019s-census — the throat-and-mouth division); the technique\u2019s arc (the registration honesty — the chest-and-head division with the passaggio craft, the onset\u2019s-census — the attack\u2019s division, the vowel\u2019s-craft — the formant tuning honesty cross-referenced from acoustics, the vibrato register named); the diction\u2019s-craft (the IPA honesty — the symbol census with the language division: the Italian\u2019s German-and-French registers named, the English\u2019s-diphthong honesty); the Indian register (the classical voice — the riyaz craft with the tanpura honesty, the throat-and-Open division cross-referenced to the classical-dance book\u2019s-own tradition); the repertoire\u2019s registers (the classical-Italian\u2019s German-Lied division, the musical-and-pop registers named — the belt honesty held straight); the choir\u2019s-craft (the parts\u2019-blending honesty with the choral balance register); and the ensemble-and-stagecraft registers named (the ensemble\u2019s craft with the ear honesty).',
  status: 'planned',
  accent: ['#e11d48', '#881337'],
  chapters,
}
