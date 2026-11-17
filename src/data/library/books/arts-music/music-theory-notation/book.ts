import type { Book, Chapter } from '../../../types'

/**
 * Music Theory & Notation — the first book of the Arts-Music shelf (the music register; the honest fold — the backlog line Notation lives here as the theory’s written grammar).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `mth-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Music Theory & Notation owns the written-grammar register for the whole shelf. The rhythmic depth (the polyrhythm-and-groove craft) belongs to rhythm-meter; the harmonic depth to harmony; the counterpoint’s craft to counterpoint; the ear’s register to ear-training; the Indian rhythmic-and-melodic registers belong to the classical-dance-and-music-history books (cross-referenced, not duplicated); the ABRSM-and-Grade registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Kostka and Payne’s Tonal Harmony — Part I Fundamentals read this pass (the retrieved TOC: Elements of Pitch / Elements of Rhythm / Introduction to Triads and Seventh Chords / Diatonic Chords in Major and Minor Keys) as the spine.
 * - The Clement-and-Holth names the AB Guide to Music Theory as the graded co-pole.
 * - The NCERT line named as the school register with the Western-and-Indian staff notation honesty priced straight.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'pitch-staff',
    title: 'The Pitch and the Staff',
    summary:
      'The written sound: the pitch\u2019s craft (the frequency\u2019s arithmetic with the octave\u2019s 2:1 honesty, the A440 receipt priced straight, the equal-temperament\u2019s-arithmetic named at survey depth); the staff\u2019s architecture (the five-line honesty with the ledger-and-extension craft — the middle-C position fixed by drill); the clefs\u2019 census (the treble\u2019s-G and the bass\u2019s-F crafts with the C-clef\u2019s movable honesty named — the alto-and-tenor registers); and the accidentals\u2019 register (the sharp\u2019s flat\u2019s natural crafts with the key\u2019s-spelling honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Octave\u2019s 2:1 Honesty',
      'The Ledger Craft Fixed by Drill',
      'The C Clef\u2019s Movable Honesty Named',
      'The Accidentals\u2019 Register',
    
      'Applied Theory (musical scales; suddha and vikrita svaras; sruti; raga-lakshana and classification; talas; notation and staff notation)',
      'Prominent Banis, music training, education and propagation (gurukula sampradaya, institutional training)',
      'Part-A: Analytical and logical reasoning — ability to analyse qualitative and quantitative information'
    ],
  },
  {
    number: 2,
    slug: 'rhythm-notation',
    title: 'The Rhythm Notation',
    summary:
      'The time\u2019s writing: the durational census (the whole\u2019s half\u2019s quarter\u2019s eighth families with the beaming craft); the dot\u2019s tie honesty (the dot\u2019s half extension with the tie\u2019s same-pitch receipt — the two held apart); the rest\u2019s census (the each value\u2019s silence); the meter\u2019s craft (the time-signature\u2019s reading — the top\u2019s bottom honesty fixed by drill, the simple-and-compound division previewed with the dotted-beat receipt); and the syncopation-and-preview named (the off-beat\u2019s honesty for the rhythm book\u2019s-own depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Durational Census by Drill',
      'The Dot-and-Tie Held Apart',
      'The Two Meters Previewed',
      'The Off-Beat Honesty Named',
    
      'Unit I (common to all in music): Technical Terms (sangeet, nada, shruti, swaras, raga, thata, tala, laya, gamaka, notation systems, etc.)',
      'Hindustani (Vocal, Instrumental & Musicology) Unit V: Applied Theory (sangeet utpatti; musical scales Indian and western; gram, murchchhana; raga classification; time theory of ragas; notation systems of Hindustani, Karnataka and western music; layakari)',
      'Core musical activities across components: listening, composing and performing, working with Western notation and connecting a wide variety of music'
    ],
  },
  {
    number: 3,
    slug: 'keys-scales',
    title: 'The Keys and the Scales',
    summary:
      'The tonal architecture: the major scale\u2019s craft (the WWHWWWH receipt — the pattern fixed by drill, the tetrachord-and-division named); the minor\u2019s three crafts (the natural\u2019s harmonic-and-melodic division — the raised seventh honesty priced straight); the key signature\u2019s reading (the sharp\u2019s flat order fixed by drill with the circle-of-fifths\u2019 receipt — the clockwise honesty named); the mode census (the Ionian\u2019s-through-Locrian division named at survey depth with the jazz-and-folk registers previewed); and the pentatonic-and-blues scales named (the gapped honesty with the cross-cultural register held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pattern Fixed by Drill',
      'The Three Minors Held Apart',
      'The Circle Receipt Priced Straight',
      'The Gapped Honesty Held Straight',
    ],
  },
  {
    number: 4,
    slug: 'intervals',
    title: 'The Interval Craft',
    summary:
      'The distance\u2019s arithmetic: the number-and-quality division (the counting honesty — the inclusive receipt fixed by drill); the quality\u2019s census (the major\u2019s minor\u2019s perfect\u2019s augmented-and-diminished registers with the half-step arithmetic); the inversion\u2019s honesty (the summing receipt — the interval\u2019s its-inversion octave arithmetic); the consonance-and-dissonance division (the sensory honesty with the historical-and-register named); and the compound register named (the octave-and-beyond craft).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Inclusive Receipt Fixed by Drill',
      'The Quality Census by Its Arithmetic',
      'The Summing Receipt Priced Straight',
      'The Consonance Division Held',
    
      'Historical perspective of music — contributions of scholars, musicologists, musical concepts in treatises',
      'Prelims typical areas (mirror): basic arithmetic — seating arrangement, Venn diagrams and simple number questions'
    ],
  },
  {
    number: 5,
    slug: 'chords-census',
    title: 'The Chord Census',
    summary:
      'The harmony\u2019s building blocks: the triad\u2019s craft (the root\u2019s third\u2019s fifth stack with the quality\u2019s census — the major\u2019s minor\u2019s diminished-and-augmented registers); the seventh\u2019s census (the five families with the dominant seventh\u2019s special honesty — the voice-leading preview named); the inversion\u2019s craft (the figured-bass honesty — the 6-and-6-4 registers fixed by drill with the lead-sheet-and-symbol register); the diatonic census (the Roman-numeral craft with the scale-degree\u2019s-quality map — the I-IV-V-and-vii honesty); and the pop\u2019s-symbol register named (the Nashville honesty at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Quality Census Fixed by Drill',
      'The Figured-Bass Honesty Named',
      'The Roman Craft with the Quality Map',
      'The Nashville Honesty Named',
    ],
  },
  {
    number: 6,
    slug: 'score-expression',
    title: 'The Score and the Expression Crafts',
    summary:
      'The page-and-performing craft: the score\u2019s architecture (the grand-staff\u2019s craft with the part-and-score division — the orchestral score reading named at survey depth with the transposing honesty previewed); the dynamics\u2019 census (the p-to-f arithmetic with the crescendo\u2019s craft); the articulation\u2019s census (the staccato-and-legato division with the accent\u2019s register); the tempo\u2019s register (the metronome\u2019s craft with the Italian honesty named); and the expression\u2019s marks (the slur\u2019s phrase honesty — the two held apart for the counterpoint book\u2019s-own depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grand-Staff Craft Held',
      'The Dynamics by Their Arithmetic',
      'The Articulation Census Named',
      'The Slur-and-Phrase Held Apart',
    
      'Component 2 Practical Music — performing (6-10 minute performance)'
    ],
  },
]

export const musicTheoryNotation: Book = {
  id: 'music-theory-notation',
  title: 'Music Theory & Notation',
  subtitle: 'The written grammar of music — pitch, rhythm, keys, intervals and the score itself',
  discipline: 'arts-music',
  level: 'Absolute beginner → undergraduate theory (ABRSM-and-Trinity registers named)',
  description: 'The theory ground floor with the notation folded in (the honest fold — the backlog line Notation lives here as the theory\u2019s own written grammar, the sibling views cross-referenced): the sound-and-pitch craft (the frequency\u2019s octave honesty with the equal-temperament arithmetic named); the staff\u2019s clef architecture (the treble\u2019s bass crafts with the octave\u2019s middle-C honesty, the C clefs named); the rhythm\u2019s notation (the durational census — the whole\u2019s half\u2019s quarter families with the dot\u2019s tie honesty); the meter\u2019s craft (the simple-and-compound division with the time-signature\u2019s reading); the key\u2019s scale architecture (the major\u2019s minor crafts with the circle-of-fifths receipt and the key-signature\u2019s-reading drill, the mode census named); the interval\u2019s craft (the quality\u2019s number arithmetic with the inversion\u2019s honesty); the triad\u2019s seventh-chord census (the figured-bass-and-lead-sheet registers named); and the score\u2019s expression crafts (the dynamics\u2019-and-articulation census with the score\u2019s clef reading, the transposition-and-honesty named for the instrument register).',
  status: 'planned',
  accent: ['#7c3aed', '#4c1d95'],
  chapters,
}
