import type { Book, Chapter } from '../../../types'

/**
 * Music Production — the eleventh book of the Arts-Music shelf (the music register; the honest fold — the backlog line DAWs lives here as the studio’s software centre).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 21 planned lessons, zero written. Lesson ids will use the `prod-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Music Production owns the studio register with the DAW folded in as its software centre. The room’s monitoring acoustics to acoustics (cross-referenced); the theory-and-harmony to the theory books; the live’s-craft to stage-production (the PA cross-reference); the industry-and-copyright registers to the humanities shelf’s law-and-legal-studies book (cross-referenced); the graded-and-DSA registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Huber Modern Recording Music Handbook read this pass as the spine (the retrieved TOC).
 * - The Bobby O Modern Mixing named as the mix co-pole.
 * - The DAW’s registers priced straight with the software census named (the agnostic honesty — the techniques over the buttons).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'signal-capture',
    title: 'The Signal-and-Capture Craft',
    summary:
      'The chain\u2019s room crafts: the signal\u2019s-flow honesty (the source-to-speaker arc with the gain-staging register — the noise-and-clip division fixed by drill); the microphone\u2019s census (the dynamic-and-condenser division with the polar honesty — the cardioid\u2019s omni-and-figure-eight registers fixed by drill, the ribbon named); the placement\u2019s-craft (the distance honesty — the proximity\u2019s-consequence with the three-to-one receipt named); the stereo\u2019s-census (the AB\u2019s XY-and-MS division — the two-channel honesty); and the interface\u2019s honesty (the AD arc with the clock named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gain-Staging Fixed by Drill',
      'The Polar Registers Fixed by Drill',
      'The Proximity\u2019s-Consequence Named',
      'The MS Division Held',
    ],
  },
  {
    number: 2,
    slug: 'daw-register',
    title: 'The DAW Register — the Studio\u2019s Software Centre',
    summary:
      'The fold\u2019s-own craft: the session\u2019s architecture (the track-and-region division with the nondestructive honesty — the edit\u2019s-without-end craft priced straight); the edit\u2019s registers (the comping\u2019s-honesty with the take register, the timing\u2019s-craft — the warp honesty with the grid named, the pitch\u2019s craft with the forest honesty named); the arrangement\u2019s arc (the section craft cross-referenced from composition — the loop-and-register named); the plugin\u2019s census (the instrument-and-effect division with the latency honesty named); and the agnostic honesty held (the techniques over the buttons — the software census named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nondestructive Honesty Priced Straight',
      'The Grid Named',
      'The Loop Register Named',
      'The Agnostic Honesty Held',
      'Dat Mains, Part 1: Studio Sensitivity Test',
    ],
  },
  {
    number: 3,
    slug: 'mix-craft',
    title: 'The Mix Craft',
    summary:
      'The balance\u2019s discipline: the balance-and-pan register (the level\u2019s-craft — the fader\u2019s honesty with the reference register named, the pan\u2019s census with the mono-check honesty); the EQ\u2019s craft (the subtractive honesty priced straight — the cut-first receipt, the shelf-and-pass division fixed by drill, the resonance hunt named); the dynamics register (the compressor\u2019s census — the attack-and-release division with the AR honesty fixed by drill, the ratio-and-knee registers, the parallel named); the space\u2019s craft (the reverb-and-delay division cross-referenced from acoustics — the send\u2019s honesty with the pre-delay named); and the bus\u2019s-register (the group craft with the glue honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mono-Check Honesty Held',
      'The Cut-First Receipt Priced Straight',
      'The AR Honesty Fixed by Drill',
      'The Glue Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'mastering-synthesis',
    title: 'The Mastering-and-Synthesis Registers',
    summary:
      'The end\u2019s source crafts: the mastering\u2019s craft (the loudness\u2019s honesty — the LUFS register named with the streaming\u2019s-target census, the chain\u2019s division — the EQ-and-competitor register, the limit\u2019s honesty — the ceiling receipt priced straight, the reference craft named); the synthesis\u2019s craft (the oscillator-and-subtractive division — the filter\u2019s-centre honesty, the modulation\u2019s register — the LFO-and-env division cross-referenced from acoustics, the oscillator\u2019s-craft named at survey depth); and the sampling\u2019s register (the DAW\u2019s sibling — the sampler\u2019s-arc with the loop\u2019s-cross-reference named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The LUFS Register Named',
      'The Ceiling Receipt Priced Straight',
      'The Filter\u2019s-Centre Honesty Held',
      'The Sampler\u2019s Arc Named',
    ],
  },
  {
    number: 5,
    slug: 'industry-doorway',
    title: 'The Industry Register and the Doorway',
    summary:
      'The release\u2019s craft: the release\u2019s census (the single\u2019s EP-and-album division with the distribution\u2019s-register — the aggregator honesty named); the royalty\u2019s honesty (the mechanical-and-performance division — the two-register craft named, the streaming\u2019s-division named at survey depth); the copyright\u2019s cross-reference (the humanities shelf\u2019s law book owns the register — the ownership honesty named); the monitoring\u2019s craft (the room\u2019s cross-reference from acoustics — the mix\u2019s translation honesty); and the doorway — the studio craft held honestly as the modern musician\u2019s-own literacy: the bedroom\u2019s-era receipt cross-referenced from music-history — the tools named, the craft still the person\u2019s.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aggregator Honesty Named',
      'The Two-Register Craft Named',
      'The Ownership Cross-Reference Held',
      'The Craft Still the Person\u2019s Held',
    ],
  },
]

export const musicProduction: Book = {
  id: 'music-production',
  title: 'Music Production',
  subtitle: 'The studio craft — capture, edit, mix, master and the DAW as the centre',
  discipline: 'arts-music',
  level: 'Beginner → professional (the studio register)',
  description: 'The studio\u2019s discipline: the signal\u2019s-flow craft (the chain\u2019s honesty — the source-to-speaker arc with the gain-staging register); the capture\u2019s-craft (the microphone\u2019s-census — the dynamic-and-condenser division with the polar honesty — the cardioid\u2019s omni-and-figure-eight registers, the placement\u2019s-craft — the three-to-one receipt named, the stereo\u2019s-census — the AB-and-XY-and-MS division, the interface\u2019s honesty with the AD arc named); the DAW\u2019s-register (the software centre — the honest fold\u2019s-own craft: the session\u2019s architecture with the edit-and-arrangement registers, the nondestructive honesty, the plugin\u2019s-census — the instrument-and-effect division); the edit-and-arrangement craft (the comping\u2019s-honesty with the take register, the timing\u2019s pitch crafts — the warp honesty priced straight, the arrangement\u2019s arc — the section craft cross-referenced from composition); the mix\u2019s craft in two parts (the balance-and-pan register with the EQ craft — the subtractive honesty priced straight, the dynamics register — the compressor\u2019s census with the attack-and-release honesty, the space\u2019s craft — the reverb-and-delay division cross-referenced from acoustics, the bus-and-send registers); the mastering\u2019s craft (the loudness\u2019s honesty with the LUFS register named, the chain\u2019s census — the limit honesty); the synthesis\u2019s craft (the oscillator-and-subtractive division with the modulation register named — the ADSR cross-referenced from acoustics); and the industry\u2019s register (the release-and-distribution census with the royalty honesty named — the streaming era cross-referenced from music-history).',
  status: 'planned',
  accent: ['#f97316', '#7c2d12'],
  chapters,
}
