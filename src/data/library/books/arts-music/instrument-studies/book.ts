import type { Book, Chapter } from '../../../types'

/**
 * Instrument Studies — the ninth book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `inst-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Instrument Studies owns the instrument’s map. The acoustics beneath to acoustics (cross-referenced — the sibling views: the physics there, the player’s craft here); the vocal’s depth to vocal-music; the orchestration’s craft to music-composition; the electronic’s register to music-production; the ABRSM-and-graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Adler’s-Orchestration named as the pole with the Rimsky-Korsakov cross-referenced.
 * - The Blue-Barrell Instrument Studies named as the school register.
 * - The Indian-instrument register priced straight with the classical-dance book cross-referenced.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'families-overview',
    title: 'The Families Overview',
    summary:
      'The map\u2019s-craft: the orchestra\u2019s architecture (the string\u2019s-core honesty — the five-section census with the choral effect named, the sitting\u2019s-plan honesty); the woodwind\u2019s division (the two-to-a-part convention with the pairing named); the brass\u2019s-census (the three-to-five division with the chorale effect); the percussion\u2019s division (the tuned\u2019s-against-untuned honesty — the 16ft rule named at survey depth); and the orchestra\u2019s-orchestration honesty cross-referenced (the range-and-transposition registers for the composition book\u2019s-own use).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Core Honesty Held',
      'The Pairing Named',
      'The Chorale Effect Named',
      'The Cross-Reference Held for the Use',
    ],
  },
  {
    number: 2,
    slug: 'strings-guitars',
    title: 'The Strings-and-Guitars Register',
    summary:
      'The bowed\u2019s plucked crafts: the violin\u2019s-craft (the bow\u2019s-honesty — the articulation census with the détaché-and-legato-and-spiccato division, the position\u2019s shift honesty with the FB receipt named); the family\u2019s-census (the viola\u2019s cello-and-bass registers — the clef\u2019s range honesty); the guitar\u2019s-family division (the nylon\u2019s steel crafts with the strum-and-fingerpick registers, the electric\u2019s-craft — the pickup honesty cross-referenced to production); and the luthier honesty named (the setup craft with the string\u2019s-business named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Articulation Census by Its Crafts',
      'The Family Census by Its Ranges',
      'The Pickup Honesty Cross-Referenced',
      'The Setup Craft Named',
    
      'Music Instruments of India (classification, structure and playing techniques; veena, violin, flute, nadaswaram, mridangam etc.)'
    ],
  },
  {
    number: 3,
    slug: 'keyboards-woodwinds',
    title: 'The Keyboards-and-Woodwinds Registers',
    summary:
      'The key-and-reed crafts: the piano\u2019s-craft (the hammer\u2019s-action honesty — the touch\u2019s-register with the weight honesty named, the pedal\u2019s-census — the sustain-and-una division); the organ-and-harpsichord division named (the breeze honesty — the air\u2019s-craft); the synth\u2019s-register cross-referenced (the oscillator honesty with the subtractive preview named); the woodwind\u2019s-craft (the flute-and-family division with the embouchure\u2019s honesty, the reed\u2019s-census — the single\u2019s-against-double division with the oboe\u2019s-triple register named, the saxophone\u2019s-Brussels receipt named); and the bleed\u2019s-honesty named at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Touch\u2019s Register Held',
      'The Una Division Named',
      'The Reed\u2019s Census Fixed by Drill',
      'The Brussels Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'brass-percussion',
    title: 'The Brass-and-Percussion Registers',
    summary:
      'The lip\u2019s strike crafts: the brass\u2019s-craft (the lip\u2019s harmonic honesty cross-referenced from acoustics — the pedal register named, the valve\u2019s-census with the transposition honesty — the Bb-and-Eb receipts fixed by drill, the mute\u2019s-census — the straight-and-cup division); the percussion\u2019s-census (the tuned\u2019s-craft — the timpani\u2019s-pedal honesty with the sine receipt, the keyboard-percussion — the xylophone-and-marimba division cross-referenced from acoustics, the untuned\u2019s-register — the snare\u2019s-craft with the rudiment census, the triangle honesty); and the kit\u2019s-register cross-referenced (the drum\u2019s-craft for the production book\u2019s-own register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Valve Census Fixed by Drill',
      'The Timpani\u2019s Pedal Honesty Held',
      'The Rudiment Census Named',
      'The Kit Cross-Reference Held',
    ],
  },
  {
    number: 5,
    slug: 'world-instruments',
    title: 'The World\u2019s Instruments',
    summary:
      'The other traditions\u2019 map: the Indian register (the sitar\u2019s-craft — the- sympathetic honesty with the jawari named, the tabla\u2019s baya crafts — the bol register cross-referenced from rhythm-meter, the bansuri-and-sarangi registers named); the East-Asian register (the erhu\u2019s-bow honesty — the two-string craft, the dizi-and-pipa registers); the Middle-Eastern register (the oud\u2019s ney crafts with the maqam cross-reference); the African register (the kora\u2019s balafon crafts named); the Andean register named (the charango); and the honesty held straight (the family-migration register — the lute\u2019s vihuela arc named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sympathetic Honesty Named',
      'The Bol Cross-Reference Held',
      'The Two-String Craft Held',
      'The Migration Register Named',
    
      'Musical Instruments and their Classification'
    ],
  },
]

export const instrumentStudies: Book = {
  id: 'instrument-studies',
  title: 'Instrument Studies',
  subtitle: 'The orchestra and beyond — the instrument families, their playing crafts and the world\u2019s registers',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the player\u2019s arranger\u2019s map)',
  description: 'The instrument\u2019s discipline: the families\u2019 overview (the orchestra\u2019s-architecture — the string\u2019s-core honesty with the four-section census, the woodwind\u2019s brass-and-percussion divisions); the string\u2019s register (the violin-family craft — the bow\u2019s honesty with the articulation census, the position\u2019s shift honesty named, the cello\u2019s viola-and-bass registers, the guitar\u2019s-family division — the nylon\u2019s steel-and-electric crafts with the strum register); the keyboard census (the piano\u2019s-craft — the hammer\u2019s-action honesty with the pedal\u2019s register, the organ-and-harpsichord division named, the synth\u2019s register cross-referenced to production); the woodwind register (the flute\u2019s clarinet-and-saxophone crafts — the embouchure\u2019s-division with the reed honesty, the register\u2019s-key craft); the brass register (the lip\u2019s harmonic honesty — the pedal register named, the mute\u2019s census); the percussion census (the tuned-and-untuned division — the timpani\u2019s-craft with the pedal honesty, the snare\u2019s-register, the keyboard-percussion crafts); the voice\u2019s register cross-referenced (the instrument\u2019s-own book named); the world\u2019s census (the sitar\u2019s tabla crafts with the Indian classical cross-reference, the erhu-and-dizi registers named, the bagpipes\u2019-and-hurdy division); and the care-and-maintenance register named with the luthier honesty.',
  status: 'planned',
  accent: ['#65a30d', '#3f6212'],
  chapters,
}
