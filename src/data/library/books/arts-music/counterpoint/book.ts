import type { Book, Chapter } from '../../../types'

/**
 * Counterpoint — the fourth book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `cpnt-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Counterpoint owns the linear register. The harmonic’s-vertical craft to harmony (cross-referenced — the two disciplines held apart by their focus); the notation to music-theory-notation; the form’s-larger architecture to music-composition (the fugue’s-craft here as the linear discipline’s-own crown); the ABRSM-and-graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Fux’s Gradus ad Parnassum named as the founding pole (the species arc as the discipline’s own method).
 * - Kennan-and-Counterpoint named as the university co-pole with the Jeppesen’s-Palestrina register named.
 * - The Bach Invention-and-Fugue registers priced straight as the practice receipts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'first-species',
    title: 'The First Species',
    summary:
      'The note-against-note craft: the consonance\u2019s requirement (the perfect-and-imperfect division — the three-to-one rule of thumb named with the beginning-and-ending honesty); the motion\u2019s census (the contrary\u2019s-craft — the safest honesty, the similar-and-oblique registers with the direct-fifth\u2019s-forbidden craft cross-referenced from harmony); the perfect\u2019s caution (the avoided honesty — the repetition named); and the figurae-and-crafts named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Beginning-and-Ending Honesty Held',
      'The Motion Census by Its Crafts',
      'The Perfect\u2019s Caution Named',
      'The Figurae Named',
    ],
  },
  {
    number: 2,
    slug: 'second-third-species',
    title: 'The Second-and-Third Species',
    summary:
      'The ornamented lines: the second species\u2019 craft (the two-against-one honesty with the downbeat-consonance requirement — the passing-tone permission priced straight, the neighbor-and-leaping division named); the third species\u2019 craft (the four-against-one honesty with the quarter\u2019s-cascade register, the changing-note named, the nota-cambiata honesty); and the drill register held (the cantus firmus craft — the given-line honesty with the species\u2019s-own practice receipts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Downbeat Requirement Priced Straight',
      'The Cascading Register Held',
      'The Cambiata Honesty Named',
      'The Given-Line Practice Held',
    ],
  },
  {
    number: 3,
    slug: 'fourth-fifth-species',
    title: 'The Fourth-and-Fifth Species',
    summary:
      'The tied-and-flourished crafts: the fourth species\u2019 craft (the tie\u2019s honesty — the suspension-and-origin receipt priced straight, the preparation-and-resolution requirement cross-referenced from harmony, the 4-3-and-7-6 registers fixed by drill); the fifth species\u2019 craft (the florid honesty — the all-species\u2019 mixture register); and the combination register named (the two-florid-lines craft at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Suspension\u2019s Origin Receipt Priced Straight',
      'The Requirement Cross-Referenced',
      'The Florid Honesty Held',
      'The Combination Named',
    ],
  },
  {
    number: 4,
    slug: 'canon-invertible',
    title: 'The Canon-and-Invertible Craft',
    summary:
      'The strict\u2019s imitation: the canon\u2019s craft (the strict division — the perfect honesty with the interval\u2019s register, the round\u2019s-craft — the row receipt priced straight, the crab-and-mirror registers named); the invertible-counterpoint\u2019s honesty (the double-at-the octave craft with the exchange\u2019s arithmetic — the two-lines-switching receipt); and the canonic register named at survey depth (the strict\u2019s-own repertoire receipts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Exchange\u2019s Arithmetic Held',
      'The Crab Register Named',
      'The Repertoire Receipts Named',
    ],
  },
  {
    number: 5,
    slug: 'fugue-craft',
    title: 'The Fugue Craft',
    summary:
      'The linear discipline\u2019s crown: the subject-and-answer craft (the real-and-tonal division — the modified honesty priced straight with the dominant-key convention); the exposition\u2019s architecture (the subject-answer-countersubject craft with the voice\u2019s-entry arithmetic fixed by drill); the episode\u2019s census (the sequential\u2019s-modulating honesty with the link register named); the middle-and-end registers (the stretto\u2019s-craft — the overlapping receipt, the pedal-point\u2019s-cadence division, the episode\u2019s-return honesty); and the Bach receipt priced straight (the WTC register named as the discipline\u2019s-own treasury).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tonal-Answer Honesty Priced Straight',
      'The Entry Arithmetic Fixed by Drill',
      'The Overlapping Receipt Held',
      'The WTC Treasury Named',
    ],
  },
  {
    number: 6,
    slug: 'modal-modern',
    title: 'The Modal-and-Modern Registers',
    summary:
      'The other styles held straight: the Palestrina register (the modal\u2019s-strict-vocal craft with the dissonance\u2019s-treatment honesty — the tied-over-the beat named, the range\u2019s-voice honesty); the modern register named (the linear honesty in the jazz-and-pop crafts — the guide-tone register named at survey depth, the Bach-and-Bebop receipts held straight); and the discipline\u2019s honesty held (the two-lines-always-independent craft — the counterpoint as the composition\u2019s-own gymnasium named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tied-Over Craft Named',
      'The Guide-Tone Register Named',
      'The Receipts Held Straight',
      'The Gymnasium Honesty Named',
    ],
  },
]

export const counterpoint: Book = {
  id: 'counterpoint',
  title: 'Counterpoint',
  subtitle: 'The linear craft — species counterpoint, canon and the fugue\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the Fux-and-Jeppesen arc)',
  description: 'The linear\u2019s discipline: the species arc (the first-species\u2019 craft — the note-against-note honesty with the consonance\u2019s requirement and the motion\u2019s census — the contrary\u2019s similar-and-oblique registers; the second\u2019s third-species crafts with the half-and-quarter honesty and the passing-tone\u2019s permission; the fourth-species\u2019 craft with the tie\u2019s honesty — the suspension\u2019s origin; the fifth-species\u2019 flourished register); the two-part-invention\u2019s craft (the motive-and-episode division with the Bach register priced straight); the canon\u2019s craft (the strict division with the round-and-crab registers named); the invertible-counterpoint\u2019s honesty (the double-counterpoint\u2019s-at-the octave craft); the fugue\u2019s discipline in full (the subject-and-answer craft — the real-and-tonal division, the countersubject-and-episode census, the exposition\u2019s division structure, the stretto\u2019s pedal-point registers); the modal\u2019s register (the Palestrina style named with the strict-vocal honesty); and the modern-and-register named (the linear honesty in the jazz-and-pop crafts at survey depth).',
  status: 'planned',
  accent: ['#0891b2', '#0e7490'],
  chapters,
}
