import type { Book, Chapter } from '../../../types'

/**
 * Ear Training — the fifth book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 21 planned lessons, zero written. Lesson ids will use the `ear-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Ear Training owns the aural register. The theory beneath to music-theory-notation-and-harmony (cross-referenced — the ear’s-here, the paper’s-there); the Indian’s-sargam register cross-referenced to the classical-dance book; the ABRSM-and-graded aural registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Kostka-and-Payne arc cross-referenced as the theory spine.
 * - The graded register named with the school ladder held.
 * - The Berklee ear-training register named as the modern co-pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'interval-recognition',
    title: 'The Interval Recognition',
    summary:
      'The distance\u2019s ear: the reference-song honesty (the mnemonic register priced straight — the each-interval\u2019s folk-song receipt with its cultural limits named); the distance\u2019s habit (the octave\u2019s-anchoring craft — the small-against-large division); the quality\u2019s census (the major\u2019s-against-minor division with the perfect\u2019s-anchoring honesty — the P4-and-P5 receipts fixed by drill); the tritone register named (the awkward honesty); and the compound register named (the octave-plus honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mnemonic Register Priced Straight with Limits',
      'The Anchoring Craft Held',
      'The Fixed-by-Drill Receipts',
      'The Awkward Honesty Named',
    ],
  },
  {
    number: 2,
    slug: 'melody-rhythm-dictation',
    title: 'The Melody-and-Rhythm Dictation',
    summary:
      'The writing ear: the melody\u2019s craft (the scale-degree register — the movable-do solfege honesty with the tonic\u2019s-anchoring receipt, the C-and-G clefs honesty cross-referenced); the rhythm\u2019s dictation (the subdivision\u2019s-quiet craft — the internal-counting receipt priced straight, the rest-and-honesty named); the two-handed register named (the tap-back craft); and the error\u2019s craft (the checking honesty — the sing-back receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tonic\u2019s Anchoring Receipt Held',
      'The Internal-Counting Receipt Priced Straight',
      'The Tap-Back Craft Named',
      'The Sing-Back Honesty Held',
    ],
  },
  {
    number: 3,
    slug: 'chord-progression-recognition',
    title: 'The Chord-and-Progression Recognition',
    summary:
      'The vertical ear: the chord-quality\u2019s craft (the colour\u2019s census — the major\u2019s minor\u2019s brightness honesty with the dominant\u2019s-restless register, the diminished\u2019s augmented-and-tensions named); the inversion\u2019s trick (the voice-leading\u2019s-aural craft — the soprano\u2019s bass honesty); the progression\u2019s craft (the I-IV-V-and-V7 honesty fixed by drill, the cadence\u2019s-aural census — the authentic-and-plagal division, the circle\u2019s-sequential honesty named); and the extended register named (the jazz\u2019s-chord craft at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Colour Census by Its Honesty',
      'The Soprano-and-Bass Honesty Held',
      'The Cadence\u2019s Aural Census Fixed by Drill',
      'The Jazz Register Named',
    ],
  },
  {
    number: 4,
    slug: 'sight-singing',
    title: 'The Sight-Singing Craft',
    summary:
      'The eye-to-voice arc: the movable-do\u2019s honesty (the solfege register with the minor\u2019s-craft — the raised-seventh named); the do-to-don\u2019t honesty (the la-based-minor named at survey depth — the two systems held straight); the C-clef reading (the alto\u2019s tenor crafts cross-referenced from theory); the interval\u2019s-from-tonic drill (the degree\u2019s-anchoring receipt); and the Indian register cross-referenced (the sargam honesty with the classical-dance book\u2019s-own depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Solfege Register Held Straight',
      'The Two Systems Held Straight',
      'The C-Clef Reading Cross-Referenced',
      'The Sargam Honesty Cross-Referenced',
    ],
  },
  {
    number: 5,
    slug: 'transposition-aural-analysis',
    title: 'The Transposition-and-Aural-Analysis Registers',
    summary:
      'The real-world crafts: the transposition\u2019s craft (the interval\u2019s-shift honesty with the clef\u2019s-alternative named); the transcription\u2019s craft (the real-recording register — the melody\u2019s bass honesty, the chord\u2019s-identification with the pop\u2019s-symbol register named, the software\u2019s honesty — the slow-down craft priced straight); the aural-analysis\u2019s craft (the form\u2019s-listening honesty — the section\u2019s-hearing receipt with the sonata\u2019s blues-and-registers named); and the exam register named (the graded aural\u2019s census with the mock\u2019s-cycle craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clef\u2019s Alternative Named',
      'The Slow-Down Craft Priced Straight',
      'The Section\u2019s Hearing Receipt Held',
      'The Mock\u2019s-Cycle Craft Named',
    ],
  },
]

export const earTraining: Book = {
  id: 'ear-training',
  title: 'Ear Training',
  subtitle: 'The listening discipline — intervals, dictation, chord quality and the sight-singing craft',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the aural-skills register)',
  description: 'The aural\u2019s discipline: the interval\u2019s-recognition craft (the reference-song honesty — the mnemonic register priced straight with its limits named, the distance\u2019s habit — the octave\u2019s-anchoring craft); the melody\u2019s-dictation arc (the C-and-G clefs honesty with the scale-degree\u2019s-solfege register — the movable-do honesty held straight, the rhythm-and-dictation craft with the subdivision\u2019s-quiet counting); the chord-quality\u2019s craft (the triad-and-seventh census by their colour — the major\u2019s minor\u2019s-against-dominant honesty, the inversion\u2019s-voice-leading trick named); the progression\u2019s-recognition register (the I-IV-V-and-V7 honesty with the cadence\u2019s-aural craft, the phrase\u2019s-level dictation named); the sight-singing craft (the movable-do solfege drill with the minor\u2019s honesty, the C-clef reading named); the transcription\u2019s register (the real-recording craft — the melody\u2019s bass honesty with the chord\u2019s-identification, the pop\u2019s-chord register named); and the aural-analysis\u2019s craft (the form\u2019s-listening honesty with the sonata\u2019s blues-and-registers named at survey depth).',
  status: 'planned',
  accent: ['#f59e0b', '#92400e'],
  chapters,
}
