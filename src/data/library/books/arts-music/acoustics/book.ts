import type { Book, Chapter } from '../../../types'

/**
 * Acoustics — the eighth book of the Arts-Music shelf (the music register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 6 chapters /
 * 24 planned lessons, zero written. Lesson ids will use the `acou-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Acoustics owns the sound-science register. The deeper wave-physics belongs to the physics shelf (cross-referenced — the sibling views: the physics there, the musician’s-craft here); the instrument’s catalogue to instrument-studies; the vocal’s craft to vocal-music; the recording chain to music-production; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Rossing Science of Sound named as the pole with the Backus acoustics named as the co-pole.
 * - The physics shelf cross-referenced for the wave-and-oscillation depth.
 * - The Everest Master Handbook of Acoustics named as the room’s-co-pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'wave-fundamentals',
    title: 'The Wave Fundamentals',
    summary:
      'The vibration\u2019s craft: the SHM register (the sine\u2019s-honesty — the amplitude-and-frequency division with the phase named); the speed receipt (the 343-at-20 honesty priced straight — the medium\u2019s-consequence with the temperature\u2019s-craft named); the frequency-and-wavelength arithmetic (the inverse relation receipt fixed by drill — the f-equals-v-over-lambda craft); the waveform census (the simple\u2019s-against-complex division — the harmonic preview named); and the envelope\u2019s craft (the ADSR register named — the four-stage honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sine\u2019s Honesty Held',
      'The 343 Receipt Priced Straight',
      'The Inverse Relation Fixed by Drill',
      'The ADSR Register Named',
    ],
  },
  {
    number: 2,
    slug: 'pitch-temperament',
    title: 'The Pitch\u2019s Arithmetic',
    summary:
      'The scale\u2019s science: the octave\u2019s-receipt (the 2:1 honesty cross-referenced from theory); the pythagorean\u2019s-craft (the fifths\u2019-stack honesty with the comma receipt named — the error priced straight); the just\u2019s-intonation register (the ratio\u2019s-arithmetics — the simple-fraction honesty with the beating\u2019s-consequence); the equal\u2019s-temperament craft (the twelfth-root receipt priced straight — the piano\u2019s compromise honesty with the cent\u2019s-arithmetic named); and the historical honesty held (the meantone-and-well registers named — the keyboard\u2019s-era crafts).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Comma Receipt Priced Straight',
      'The Beating\u2019s-Consequence Named',
      'The Twelfth-Root Receipt Priced Straight',
      'The Keyboard\u2019s Compromise Honesty Held',
    ],
  },
  {
    number: 3,
    slug: 'amplitude-timbre',
    title: 'The Amplitude-and-Timbre Registers',
    summary:
      'The loud-and-colour crafts: the decibel\u2019s honesty (the logarithm\u2019s arithmetic — the tenfold receipt fixed by drill, the dB-SPL register with the threshold honesty); the timbre\u2019s craft (the harmonic-series receipt — the fundamental-and-overtones division with the amplitude\u2019s-map register, the formant-and-honesty named for the vocal book\u2019s-own depth); the attack\u2019s-consequence (the ADSR cross-referenced — the identification receipt: the same-spectrum-different-envelope craft priced straight); and the inharmonicity register named (the bell\u2019s piano honesty at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tenfold Receipt Fixed by Drill',
      'The Harmonic-Series Receipt Held',
      'The Identification Receipt Priced Straight',
      'The Bell\u2019s Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'instruments-vibrators',
    title: 'The Instruments as Vibrators',
    summary:
      'The physical\u2019s-craft: the string\u2019s register (the Mersenne\u2019s-laws receipt — the tension\u2019s length\u2019s mass arithmetic with the piano\u2019s-range consequence named, the harmonic\u2019s-touch receipt — the node craft for the string player); the tube\u2019s census (the open-and-closed division — the odd-harmonic honesty of the closed tube, the register\u2019s-overblow craft, the end-correction named); the membrane-and-bar registers (the drum\u2019s-inharmonic honesty with the Kettle named at survey depth, the bar\u2019s-xylophone craft); and the player\u2019s honesty held (the excitation\u2019s-craft — the bow\u2019s-stick-slip receipt named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mersenne Receipt Fixed by Drill',
      'The Odd-Harmonic Honesty Held',
      'The Kettle Named',
      'The Stick-Slip Receipt Named',
    ],
  },
  {
    number: 5,
    slug: 'rooms-reverb',
    title: 'The Rooms-and-Reverb Craft',
    summary:
      'The space\u2019s-science: the room\u2019s modes (the standing\u2019s-wave honesty — the resonance\u2019s arithmetic with the mode\u2019s-spicing craft — the parallel-wall consequence named); the reverb\u2019s-arc (the early-and-late division — the intimacy\u2019s-register with the 20ms honesty named, the RT60 receipt fixed by drill with the Sabine register named); the absorption\u2019s census (the material\u2019s-coefficient honesty — the bass-trap craft); the diffusion\u2019s craft (the schroeder register named at survey depth); and the studio\u2019s-consequence (the dead-room craft — the booth honesty cross-referenced to production).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mode\u2019s Arithmetic Held',
      'The RT60 Fixed by Drill',
      'The Bass-Trap Craft Named',
      'The Booth Honesty Cross-Referenced',
    ],
  },
  {
    number: 6,
    slug: 'psychoacoustics',
    title: 'The Psychoacoustics Register',
    summary:
      'The hearing\u2019s craft: the ear\u2019s arc (the canal-to-cochlea division — the basilar\u2019s-map honesty cross-referenced from the biology shelf, the place\u2019s-against-time theories held straight); the critical-band\u2019s honesty (the loudness\u2019s-consequence — the masking craft with the MP3\u2019s-consequence named — the perceptual coder honesty priced straight); the localisation craft (the ITD-and-ILD division — the two-ear receipt, the HRTF named); the missing-fundamental register named (the virtual pitch honesty); and the musical\u2019s-consequence register (the consonance\u2019s-perceptual debate held straight — the two-theories named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Basilar\u2019s Map Honesty Cross-Referenced',
      'The Perceptual Coder Honesty Priced Straight',
      'The Two-Ear Receipt Held',
      'The Consonance Debate Held Straight',
    ],
  },
]

export const acoustics: Book = {
  id: 'acoustics',
  title: 'Acoustics',
  subtitle: 'The physics of sound — waves, spectra, rooms and the hearing craft',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the science register)',
  description: 'The sound\u2019s science: the wave\u2019s craft (the vibration honesty — the SHM register with the frequency\u2019s wavelength arithmetic, the speed-of-sound receipt with the medium\u2019s-consequence named); the pitch\u2019s arithmetic (the equal-temperament\u2019s-consequence — the 2-to-the twelfth receipt priced straight, the just\u2019s-against-tempered honesty with the beating register named); the amplitude-and-loudness craft (the decibel\u2019s honesty with the logarithm arithmetic, the phon\u2019s loudness-curve register named at survey depth); the timbre-and-spectrum register (the harmonic series receipt — the fundamental-and-overtones division, the formant-and-craft named for the vocal register); the instrument\u2019s-as-vibrator census (the string\u2019s-craft — the Mersenne\u2019s-laws receipt with the tension\u2019s arithmetic, the tube\u2019s-census — the open-and-closed division with the node honesty, the membrane-and-bar registers cross-referenced from instrument-studies); the room\u2019s-craft (the reverb\u2019s-arc — the early-and-late division with the RT60 receipt fixed by drill, the standing\u2019s-wave honesty — the mode register, the diffusion\u2019s absorption crafts); the psychoacoustics\u2019 register (the critical-band honesty with the masking craft — the MP3\u2019s-consequence named, the localisation\u2019s-ear craft — the HRTF named); and the recording-chain\u2019s acoustics (the microphone-and-speaker registers cross-referenced to production).',
  status: 'planned',
  accent: ['#0891b2', '#164e63'],
  chapters,
}
