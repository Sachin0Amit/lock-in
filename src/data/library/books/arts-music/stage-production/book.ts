import type { Book, Chapter } from '../../../types'

/**
 * Stage Production — the thirty-second book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `stage-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Stage Production owns the technical register. The design’s-concept to theatre (cross-referenced); the lighting’s-optics to cinematography-and-photography; the sound’s-craft to music-production; the costume’s-craft to fashion-design; the safety’s-structure to the engineering shelf (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Gillette named as the design-and-production pole.
 * - The Photometrics named at survey depth with the DMX register held.
 * - The NCERT line named as the school register with the crew honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'theatre-spaces-set',
    title: 'The Theatre-Spaces-and-Set Craft',
    summary:
      'The room\u2019s scenery crafts: the spaces\u2019 census (the four named — the proscenium\u2019s thrust-and-arena-and-black division with the each-consequence named: the craft\u2019s-choice receipt — the audience\u2019s-division named: the two named); the set\u2019s-craft (the designer\u2019s-cross-reference — the concept named: the two named, the construction register — the flats named: the two named: the hard-and-soft division, the platform named, the fly named — the load honesty cross-referenced); and the property\u2019s-census (the two named: the hand-and-set division — the craft named: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Fixed by Drill',
      'The Hard-Soft Division Named',
      'The Load Honesty Cross-Referenced',
      'The Hard-Soft Honesty Held',
    ],
  },
  {
    number: 2,
    slug: 'lighting-design',
    title: 'The Lighting-Design Craft',
    summary:
      'The stage-light discipline: the instrument census (the two named: the ellipsoidal-and-Fresnel division — the two named: the controlled\u2019s wash honesty, the LED named — the two named: the colour\u2019s-division named); the plot\u2019s-craft (the two named: the design\u2019s-against-paper division, the hang named — the two named: the focus named — the craft named: the two named, the gel cross-reference from cinematography — the correction named); the DMX register (the control named — the universe named: the craft named); and the cue\u2019s-craft (the craft\u2019s-why named — the two named: the look-and-see division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Controlled-Wash Honesty Named',
      'The Focus Craft Named',
      'The Universe Named',
      'The Look-See Division Named',
    ],
  },
  {
    number: 3,
    slug: 'sound-design',
    title: 'The Sound-Design Craft',
    summary:
      'The audible\u2019s-stage discipline: the two\u2019s-division (the reinforcement\u2019s-against-design honesty — the two named: the utility\u2019s-against-art division); the plot\u2019s-craft (the two named — the speaker\u2019s-craft named: the coverage receipt, the instrument cross-reference from acoustics); the SFX register (the two named — the trigger named: the craft\u2019s-why named); the mic census (the two named — the lav-and-handheld division: the two named); and the level\u2019s-craft named (the mix named — the craft\u2019s-principle: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Utility-Art Division Held Straight',
      'The Coverage Receipt Named',
      'The Trigger Named',
      'The Level Honesty Held',
    ],
  },
  {
    number: 4,
    slug: 'costume-sm-book',
    title: 'The Costume-and-SM Book',
    summary:
      'The wardrobe\u2019s script crafts: the costume\u2019s register (the cross-reference from fashion-design — the two named: the built\u2019s-against-pulled division, the craft named — the two named: the silhouette honesty, the quick\u2019s-craft named — the two named: the off named: the eight named at survey depth); the SM book craft (the book named — the two named: the blocking-and-cue division, the calling receipt priced straight — the craft named: the two named, the tape named — the replacement craft); and the week\u2019s-craft named (the six named — the crew\u2019s-honesty: the craft\u2019s-division named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Silhouette Honesty Held',
      'The Eight Named at Survey Depth',
      'The Calling Receipt Priced Straight',
      'The Crew Honesty Named',
    ],
  },
  {
    number: 5,
    slug: 'tech-safety-process',
    title: 'The Tech, Safety-and-Process Registers',
    summary:
      'The build\u2019s show crafts: the technical direction (the TD named — the load\u2019s-honesty cross-referenced from sculpture: the technical named: the two named, the budget receipt — the two named); the safety census (the OSHA named at survey depth — the two named: the hazard\u2019s-against-process division, the fire\u2019s-honesty — the craft named: the two named, the blackout named — the craft\u2019s-caution); the production\u2019s-process (the page-to-stage arc — the two named: the tech-and-dress division — the craft\u2019s-receipt named: the ten named at survey depth: the out named); and the strike named (the craft\u2019s-end named — the two named: the clean\u2019s-against-broken division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Craft\u2019s-End Honesty Held',
      'The Fire Honesty Named',
      'The Ten Named',
      'The Clean-Broken Division Named',
    ],
  },
]

export const stageProduction: Book = {
  id: 'stage-production',
  title: 'Stage Production',
  subtitle: 'The backstage craft — the set, light, sound and the stage manager\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the crew register)',
  description: 'The stage\u2019s-technical discipline: the theatre\u2019s-spaces census (the four named — the proscenium\u2019s thrust-and-arena-and-black division with the each-consequence named: the craft\u2019s-choice receipt); the set\u2019s-design craft (the designer\u2019s-cross-reference from theatre — the concept named, the construction register — the flats division named with the platform named, the property\u2019s-census — the two named: the hand-and-set division, the fly\u2019s-named — the LOD receipt); the lighting\u2019s-design craft (the instrument census — the two named: the ellipsoidal-and-Fresnel division, the plot\u2019s-craft — the two named: the design\u2019s-against-paper division, the hang named — the two named: the focus named, the gel cross-reference from cinematography, the DMX named — the control register); the sound\u2019s-design craft (the two named: the reinforcement\u2019s-against-design division, the plot\u2019s-craft — the two named, the SFX register — the two named, the mic census — the two named); the costume-and-prop register (the cross-reference from fashion-design — the two named: the built\u2019s-against-pulled division, the quick\u2019s-craft named — the two named); the stage manager\u2019s discipline (the book craft — the two named: the blocking-and-cue division, the calling receipt priced straight — the craft named, the tape named — the replacement named); the technical-direction-and-safety register (the load\u2019s-honesty cross-referenced from sculpture — the technical named: the two named, the OSHA named at survey depth — the safety census: the two named); and the production\u2019s-process (the page-to-stage arc — the craft\u2019s-divisions named: the two named: the tech-and-dress division — the craft\u2019s-receipt named).',
  status: 'planned',
  accent: ['#57534e', '#1c1917'],
  chapters,
}
