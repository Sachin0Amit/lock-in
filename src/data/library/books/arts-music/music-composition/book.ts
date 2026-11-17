import type { Book, Chapter } from '../../../types'

/**
 * Music Composition — the sixth book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `mcomp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Music Composition owns the making register. The theory beneath to theory-and-harmony-and-counterpoint (cross-referenced); the orchestration’s depth to instrument-studies; the form’s-analytical reading to music-history (the receipts shared, the craft’s-here); the production’s-register to music-production; the graded-and-conservatory registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Kostka arc cross-referenced as the theory spine with the Schoenberg Fundamentals named as the motive’s-co-pole.
 * - The Caplin’s Classical Form named as the form’s-depth pole.
 * - The Rimsky-Korsakov orchestration named as the classic register with the conservatory ladder held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'motive-theme',
    title: 'The Motive and the Theme',
    summary:
      'The small\u2019s craft: the motive\u2019s honesty (the three-note register — the cell\u2019s craft with the intervallic fingerprint receipt); the Beethoven\u2019s-fifth receipt priced straight (the three-g-note cell\u2019s arc — the whole-symphony honesty); the contrast-and-continuation division (the phrase\u2019s-craft cross-referenced from harmony); the theme\u2019s-types census (the melodic\u2019s-against-motivic honesty with the compound division named); and the working\u2019s-craft (the cell\u2019s-rotation register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Intervallic Fingerprint Receipt Held',
      'The Fifth\u2019s Receipt Priced Straight',
      'The Division Cross-Referenced',
      'The Rotation Register Named',
    ],
  },
  {
    number: 2,
    slug: 'small-forms',
    title: 'The Small Forms',
    summary:
      'The phrase\u2019s architecture: the binary\u2019s craft (the two-part honesty with the rounded register — the B\u2019s-return craft); the ternary\u2019s craft (the three-part honesty with the ABA receipt — the contrast\u2019s-middle register); the variation\u2019s arc (the fixed-bass honesty with the chaconne receipt named, the ornamental-and-character division); the rondo\u2019s register (the recurring-refrain honesty — the ABACA craft); and the ternary\u2019s-vs-rounded honesty held straight (the two-confusable receipts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rounded Register Held',
      'The Chaconne Receipt Named',
      'The ABACA Craft Fixed by Drill',
      'The Confusable Receipts Held Straight',
      'Compositional forms and their evolution (prabandh, dhrupad, dhamaar, kheyaal, tarana, thumri, tappa etc.)',
      'Compositional forms and their evolution (prabandha, gitam, svarajati, varnam, padavarnam, kriti, ragamalika etc.)',
      'Rabindra Sangeet Units V-x: Applied Theory (ragas, Talas, Kirtana, Baul);',
    ],
  },
  {
    number: 3,
    slug: 'sonata-craft',
    title: 'The Sonata Craft',
    summary:
      'The large form\u2019s discipline: the exposition\u2019s architecture (the two-theme honesty — the transition\u2019s craft with the medial-caesura named, the secondary\u2019s-key convention); the development\u2019s craft (the fragmentation-and-liquidation registers — the motive\u2019s transformations with the inversion-and-retrograde division, the retransitional honesty named); the recapitulation\u2019s craft (the double-return honesty priced straight — the thematic-and-tonal return receipt); the coda\u2019s register (the after-the end honesty named); and the sonata\u2019s-honesty held (the procrustean caution — the form as the heard convention, never the filled template).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Medial Caesura Named',
      'The Transformations Division Held',
      'The Double-Return Receipt Priced Straight',
      'The Procrustean Caution Named',
    ],
  },
  {
    number: 4,
    slug: 'orchestration-first-pass',
    title: 'The Orchestration First Pass',
    summary:
      'The colour-and-first craft: the orchestra\u2019s census (the string\u2019s-core honesty with the woodwind\u2019s brass-and-percussion divisions cross-referenced from instrument-studies); the string\u2019s-writing craft (the bow honesty with the articulation census — the legato\u2019s staccato-and-spiccato registers, the divisi named); the woodwind\u2019s brass crafts (the range\u2019s transposition honesty — the Bb-and-Eb receipts fixed by drill, the doubling named); the texture\u2019s craft (the homophonic\u2019s-against-polyphonic division with the register\u2019s-spacing honesty); and the MIDI\u2019s-honesty named (the mockup craft — the production book\u2019s-own cross-reference).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Core Honesty Held',
      'The Transposition Receipts Fixed by Drill',
      'The Register-Spacing Honesty Held',
      'The Mockup Cross-Reference Named',
      'Composition And Colour Application; Sketching Of Scenes And Environments',
    ],
  },
  {
    number: 5,
    slug: 'text-setting-revision',
    title: 'The Text Setting and the Revision Discipline',
    summary:
      'The word\u2019s work\u2019s crafts: the text-setting\u2019s craft (the stress\u2019s-alignment receipt — the syllable\u2019s-counting honesty, the strophic\u2019s through-composed division, the word-painting register named); the writer\u2019s honesty (the commission named at survey depth); the revision\u2019s discipline (the portfolio honesty — the multiple-draft craft with the time-away receipt, the workshop\u2019s-register named — the player\u2019s-feedback honesty held straight); and the starting\u2019s craft (the copyist named — the parts\u2019-and-score honesty with the rehearsal\u2019s-craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Syllable\u2019s Counting Honesty Held',
      'The Word-Painting Register Named',
      'The Time-Away Receipt Held Straight',
      'The Parts\u2019-and-Score Honesty Named',
      'Component 4 Extended Composition \u2014 6-8 Minute Composition Plus',
      'Component 5 Investigating Music \u2014 2500-3000-word Essay Plus Up To 500-word',
    ],
  },
]

export const musicComposition: Book = {
  id: 'music-composition',
  title: 'Music Composition',
  subtitle: 'The making craft — motive, form, orchestration\u2019s first pass and the revision discipline',
  discipline: 'arts-music',
  level: 'Intermediate → advanced (the maker\u2019s register)',
  description: 'The composer\u2019s discipline: the motive-and-theme craft (the small-cell honesty — the three-note register, the contrast-and-continuation division with the Beethoven\u2019s-fifth receipt priced straight); the phrase\u2019s period architecture (the sentence\u2019s period forms cross-referenced from harmony with the expansion\u2019s-register); the form\u2019s census (the binary\u2019s ternary crafts with the rounded honesty, the variation\u2019s-arc — the ornamental-and-character division, the rondo\u2019s register, the sonata\u2019s craft — the exposition\u2019s development-and-recapitulation architecture with the double-return honesty named); the development\u2019s craft (the fragmentation-and-liquidation registers with the motive\u2019s-transformations — the inversion-and-retrograde division); the orchestration\u2019s first pass (the instrument\u2019s-orchestra census with the range\u2019s transposition honesty cross-referenced from instrument-studies, the string\u2019s-writing craft with the bow honesty); the text-setting\u2019s craft (the song\u2019s-honesty — the stress\u2019s-alignment receipt with the strophic\u2019s through-composed division); and the revision\u2019s discipline (the portfolio honesty with the workshop-and-craft named).',
  status: 'planned',
  accent: ['#7c3aed', '#4338ca'],
  chapters,
}
