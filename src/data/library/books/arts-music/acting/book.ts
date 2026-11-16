import type { Book, Chapter } from '../../../types'

/**
 * Acting — the twenty-eighth book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `act-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Acting owns the performer-and-craft register. The voice’s-technique to vocal-music (cross-referenced); the movement to dance-fundamentals; the text’s-analysis to theatre; the film’s-language to film-studies (cross-referenced); the Stanislavski-and-graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Stanhislavski’s An Actor Prepares named as the pole (the system register).
 * - The Hagen’s Respect for Acting named as the co-pole (the objective register).
 * - The Mamet-and-Meisner named at survey depth with the two honesty held straight.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'instrument-craft',
    title: 'The Instrument Craft',
    summary:
      'The tool\u2019s-discipline: the voice\u2019s craft (the breath cross-reference from vocal-music — the support named, the projection register — the fill named: the back honesty, the diction cross-reference: the IPA named); the body\u2019s craft (the Laban cross-reference — the character register: the two named, the neutral named — the blank receipt: the ready honesty); the relaxation\u2019s honesty (the tension named — the two named: the release craft); and the presence-and-receipt named (the see named — the room honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Back Honesty Named',
      'The Blank Receipt Held',
      'The Release Craft Held',
      'The Room Honesty Named',
    ],
  },
  {
    number: 2,
    slug: 'stanislavski-foundations',
    title: 'The Stanislavski Foundations',
    summary:
      'The system\u2019s-honesty: the given receipt (the what named — the list craft: the facts honesty); the objective craft (the want named — the verb register priced straight: the active honesty, the obstacle named — the two\u2019s-honesty: the against named); the action\u2019s division (the playing named — the doing receipt: the verb named, the tactic census — the test named); the emotion\u2019s honesty (the two named — the outside\u2019s-against-inside division: the craft\u2019s-consequence named, the memory named at survey depth — the sense receipt); and the truth honesty (the belief named — the if craft: the magic named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Verb Register Priced Straight',
      'The Against Named',
      'The Sense Receipt Named',
      'The Magic If Named',
    ],
  },
  {
    number: 3,
    slug: 'scene-study',
    title: 'The Scene Study Arc',
    summary:
      'The two-hander\u2019s-craft: the partner\u2019s-honesty (the listen receipt priced straight — the react named: the here named, the generosity named — the give register); the scoring\u2019s-register (the beat named — the division craft: the change receipt named); the subtext craft (the under named — the two\u2019s-honesty: the say\u2019s-against-mean division); the choice\u2019s-craft (the risk receipt — the obvious named: the avoid honesty); and the rehearsal arc (the off-book named — the two named: the learned honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Listen Receipt Priced Straight',
      'The Change Receipt Named',
      'The Say-Mean Division Held Straight',
      'The Avoid Honesty Named',
    ],
  },
  {
    number: 4,
    slug: 'classical-screen',
    title: 'The Classical-and-Screen Registers',
    summary:
      'The two\u2019s-crafts honesty: the classical\u2019s-study (the verse craft — the blank honesty cross-referenced from theatre, the speech register — the text named: the thought named, the breath\u2019s-craft: the line named — the thought\u2019s-against-line division); the screen\u2019s-against-stage division (the camera craft — the size receipt: the two named — the closeup\u2019s-consequence: the eyes named, the economy honesty — the smaller named: the craft\u2019s-reduction named, the continuity named — the two named: the take honesty, the mark named); and the technical register named (the frame craft — the cross-reference from cinematography: the eyeline named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Thought\u2019s-against-Line Division Held Straight',
      'The Eyes Named',
      'The Take Honesty Held',
      'The Eyeline Named',
    ],
  },
  {
    number: 5,
    slug: 'audition-ethics',
    title: 'The Audition-and-Ethics Registers',
    summary:
      'The door\u2019s room crafts: the audition\u2019s craft (the two-minutes receipt fixed by drill — the craft named: the prepared named — the fit named: the casting honesty, the cold honesty — the two named: the fast craft, the callback named — the same named: the consistency receipt); the profession\u2019s-register (the rejection named — the not-personal receipt priced straight, the craft\u2019s-keeps named); and the ethics\u2019s-register (the ensemble receipt — the generous named, the safety named — the intimacy register named at survey depth: the coordinator named, the consent named — the craft\u2019s-consequence: the boundary honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Casting Honesty Named',
      'The Not-Personal Receipt Priced Straight',
      'The Coordinator Named',
      'The Boundary Honesty Held',
    ],
  },
]

export const acting: Book = {
  id: 'acting',
  title: 'Acting',
  subtitle: 'The performer\u2019s craft — Stanislavski, the scene study and the audition\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the studio register)',
  description: 'The acting\u2019s discipline: the instrument\u2019s craft (the voice register — the breath cross-reference from vocal-music, the body\u2019s-craft — the Laban cross-reference from dance-fundamentals: the character register, the relaxation honesty — the tension named); the Stanislavski\u2019s foundations (the system\u2019s-honesty — the given receipt: the what named, the objective craft — the want named: the verb register priced straight, the action\u2019s division — the playing named, the emotion\u2019s-honesty — the two named: the outside\u2019s-against-inside division, the memory\u2019s-craft named at survey depth); the scene\u2019s-study arc (the two-hander craft — the partner named: the listen receipt, the scoring\u2019s-register — the beat named, the subtext craft — the under named); the classical\u2019s-study (the verse craft — the blank honesty cross-referenced from theatre, the speech register — the text named, the breath craft named); the screen\u2019s-against-stage division (the camera\u2019s-craft — the size receipt: the two named, the economy honesty — the smaller named, the continuity named — the two named: the take honesty); the audition\u2019s craft (the two-minutes receipt fixed by drill — the craft named: the prepared named, the cold honesty — the two named, the callback named); and the ethics\u2019s-register (the craft honesty — the ensemble receipt: the generous named, the safety named — the intimacy register named at survey depth).',
  status: 'planned',
  accent: ['#c2410c', '#7c2d12'],
  chapters,
}
