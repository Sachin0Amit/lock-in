import type { Book, Chapter } from '../../../types'

/**
 * Dance Fundamentals — the twenty-fourth book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `dfnd-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Dance Fundamentals owns the beginner register for the whole performing side. The classical-and-contemporary depth to classical-dance and contemporary-dance; the Laban’s full system to contemporary-dance; the rhythm to rhythm-meter; the anatomy to the biology shelf and the medical shelf’s physiotherapy (cross-referenced); the graded-and-exam registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Eric Franklin named as the conditioning pole.
 * - The Laban cross-referenced for the effort register.
 * - The NCERT line named as the school register with the studio honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'body-alignment',
    title: 'The Body-and-Alignment Craft',
    summary:
      'The standing\u2019s honesty: the alignment\u2019s craft (the pelvis named — the neutral receipt, the ear-and-shoulder register named); the plie\u2019s register (the two division — the demi\u2019s-against-grand honesty fixed by drill, the turnout\u2019s honesty priced straight — the hip\u2019s-external craft with the knee\u2019s-alignment receipt: the track named); the core\u2019s craft (the cross-reference from physiotherapy — the stability named: the pelvis\u2019s-quiet receipt); and the foot\u2019s-census named (the three-points honesty — the tripod receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Neutral Receipt Held',
      'The Track Receipt Named',
      'The Pelvis\u2019s-Quiet Receipt Held',
      'The Tripod Receipt Named',
    ],
  },
  {
    number: 2,
    slug: 'locomotor-jumps-turns',
    title: 'The Locomotor, Jumps-and-Turns',
    summary:
      'The travel\u2019s-discipline: the locomotor\u2019s census (the walk\u2019s run-and-skip division — the weight\u2019s-craft named, the gallops named at survey depth); the jump\u2019s craft (the two-foot division — the spring\u2019s-against-land honesty, the landing craft: the soft receipt — the roll through named); the turn\u2019s craft (the spot named — the eyes\u2019 receipt: the fix named, the four named at survey depth fixed by drill); and the fall-and-recovery register named (the Graham cross-reference — the floor craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Weight\u2019s Craft Named',
      'The Roll-Through Receipt Named',
      'The Fix Receipt Held',
      'The Four Fixed by Drill',
    ],
  },
  {
    number: 3,
    slug: 'musicality-space',
    title: 'The Musicality-and-Space Registers',
    summary:
      'The count\u2019s room crafts: the musicality\u2019s craft (the cross-reference from rhythm-meter — the count receipt with the phrase register, the accent honesty — the move\u2019s-on named, the breath register named); the space\u2019s-craft (the levels named — the high\u2019s middle-and-low division, the pathway\u2019s register — the line named, the facing named with the stagecraft cross-reference); and the dynamics register (the Laban\u2019s-honesty — the effort\u2019s division: the weight\u2019s space crafts named at survey depth with the flow named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Move\u2019s-On Honesty Named',
      'The Pathway Register Named',
      'The Stagecraft Cross-Reference Named',
      'The Flow Named',
    ],
  },
  {
    number: 4,
    slug: 'improvisation-composition',
    title: 'The Improvisation-and-Composition Basics',
    summary:
      'The made\u2019s-craft: the improvisation\u2019s honesty (the yes receipt priced straight — the offer named, the score register — the task craft named, the pause\u2019s honesty: the silence receipt); the composition\u2019s basics (the motif\u2019s-honesty — the repeat-and-vary division cross-referenced from music-composition, the craft named at survey depth — the canon register); and the craft\u2019s-consequence (the observer honesty — the show named: the what named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Offer Named',
      'The Silence Receipt Held',
      'The Repeat-Vary Division Cross-Referenced',
      'The What Named',
    ],
  },
  {
    number: 5,
    slug: 'rehearsal-wellness',
    title: 'The Rehearsal-and-Wellness Register',
    summary:
      'The working\u2019s-discipline: the rehearsal\u2019s craft (the etiquette honesty — the room register, the learn named — the watch receipt, the notes named); the performance\u2019s craft (the anxiety cross-reference from vocal-music — the craft named, the eyes honesty — the audience receipt); the wellness\u2019s register (the injury-prevention cross-reference from physiotherapy — the warm-up craft with the cool named, the overuse honesty: the shin receipt named, the foot-and-care named); and the fuel register named at survey depth (the dancer\u2019s-fuel honesty — the Red-Suspicion named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Watch Receipt Named',
      'The Audience Receipt Named',
      'The Shin Receipt Named',
      'The Fuel Honesty Named',
    ],
  },
]

export const danceFundamentals: Book = {
  id: 'dance-fundamentals',
  title: 'Dance Fundamentals',
  subtitle: 'The dancing body — alignment, locomotion, musicality and the improviser\u2019s craft',
  discipline: 'arts-music',
  level: 'Absolute beginner → intermediate (the studio register)',
  description: 'The dance\u2019s ground floor: the body\u2019s craft (the alignment honesty — the standing receipt with the pelvis named, the plie\u2019s register — the two division with the turnout honesty priced straight, the core\u2019s cross-reference from physiotherapy — the stability craft); the locomotor\u2019s census (the walk\u2019s run-and-skip division — the travel register, the jump census — the two-foot division with the landing craft: the soft receipt, the turn\u2019s craft — the spot named); the musicality\u2019s craft (the cross-reference from rhythm-meter — the count receipt with the phrase register, the accent\u2019s honesty — the move\u2019s-on named); the space-and-dynamics register (the Laban\u2019s-honesty — the effort\u2019s division: the weight\u2019s space crafts named at survey depth, the levels named — the high\u2019s middle-and-low division); the improvisation\u2019s craft (the yes receipt priced straight — the offer named, the score register — the task craft named); the composition\u2019s basics (the motif\u2019s-honesty cross-referenced from music-composition — the repeat-and-vary division, the craft named at survey depth); the rehearsal-and-performance craft (the etiquette honesty — the room register, the performance\u2019s-anxiety cross-reference from vocal-music); and the wellness\u2019s register (the injury prevention cross-referenced from physiotherapy — the warm-up craft with the cool named, the foot care named).',
  status: 'planned',
  accent: ['#db2777', '#831843'],
  chapters,
}
