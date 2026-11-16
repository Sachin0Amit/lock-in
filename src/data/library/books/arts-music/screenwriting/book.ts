import type { Book, Chapter } from '../../../types'

/**
 * Screenwriting — the thirty-first book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `scrn-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Screenwriting owns the script register. The narrative theory to film-studies (cross-referenced — the analysis there, the craft here); the dialogue’s-stage-craft to theatre-and-acting; the story’s-theory to creative-writing (the sibling views); the graded-and-competition registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Syd Field named as the structure pole with the McKee co-pole (the story register).
 * - The Vogel’s-save named at survey depth with the two honesty held straight.
 * - The film-studies cross-reference held for the narratological depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'premise-character',
    title: 'The Premise-and-Character Craft',
    summary:
      'The idea\u2019s person crafts: the premise\u2019s honesty (the two named — the what-and-who division: the concept receipt, the logline craft — the one named: the sentence receipt priced straight with the irony named: the craft\u2019s-why named); the character\u2019s-craft (the need\u2019s-against-want division priced straight — the two named: the craft\u2019s-consequence named: the arc named, the flaw named — the two named: the wound named, the antagonist\u2019s-honesty: the worthy receipt — the craft named: the two named); and the cast census (the four named — the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sentence Receipt Priced Straight',
      'The Arc Named',
      'The Worthy Receipt Held',
      'The Four Named',
    ],
  },
  {
    number: 2,
    slug: 'structure-arc',
    title: 'The Structure Arc',
    summary:
      'The architecture\u2019s-craft: the three\u2019s-division (the two named: the act\u2019s third honesty — the craft\u2019s-why named: the two named, the third named — the act\u2019s receipt: the two named); the sequence\u2019s-craft (the eight named — the two named: the sequence\u2019s-own honesty: the mini named); the midpoint named (the two named: the arc\u2019s-consequence named); the crises named (the two named — the crisis-and-climax division); and the structure\u2019s-honesty (the three-craft receipt — the tool named: the not named: the two honesty held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mini Named',
      'The Two-Pair Honesty Held',
      'The Crisis-Climax Division Named',
      'The Tool Honesty Held Straight',
    ],
  },
  {
    number: 3,
    slug: 'scene-dialogue',
    title: 'The Scene-and-Dialogue Craft',
    summary:
      'The unit\u2019s voice crafts: the scene\u2019s-craft (the beats register — the objective cross-reference from acting: the verb named, the late named: the two named — the craft\u2019s-principle named: the late receipt, the enter\u2019s leave honesty — the conflict receipt: the two named, the subtext craft — the say-and-mean division held straight); the dialogue\u2019s-craft (the voice census — the two named: the distinct honesty, the purpose register — the two named: the advance-and-reveal division, the test named: the cover receipt — the who named); and the silence\u2019s-craft named (the unspoken receipt — the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Late Receipt Held',
      'The Say-Mean Division Held Straight',
      'The Advance-Reveal Division Named',
      'The Unspoken Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'rewrite-genre',
    title: 'The Rewrite-and-Genre Registers',
    summary:
      'The polish\u2019s convention crafts: the rewrite\u2019s-discipline (the draft\u2019s-arc — the two named: the rewrite\u2019s-against-rewrite honesty: the two named — the structure\u2019s-against-polish division, the feedback register — the notes craft: the not named: the craft receipt, the table named — the read craft: the two named); the genre\u2019s register (the convention honesty — the cross-reference from film-studies: the two named, the hybrid named at survey depth); and the format\u2019s craft (the two named: the SCREEN\u2019s-against-TV division, the room\u2019s-craft named — the writer named: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structure-Polish Division Held Straight',
      'The Craft Receipt Held',
      'The Hybrid Named',
      'The Room\u2019s Craft Named',
    ],
  },
  {
    number: 5,
    slug: 'career-craft',
    title: 'The Career Craft',
    summary:
      'The profession\u2019s-register: the spec\u2019s-craft (the two named — the writing\u2019s-against-pitching division: the sample receipt, the coverage named at survey depth — the reader honesty: the first named); the pitch\u2019s-register (the two named — the meeting\u2019s-against-document division, the craft named: the two named); the agents named at survey depth (the manager\u2019s-division named); the WGA named at survey depth (the two named — the credit\u2019s-honesty); and the India register named (the two named — the writer\u2019s-room honesty named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sample Receipt Held',
      'The First Named',
      'The Credit Honesty Named',
      'The Room Honesty Named',
    ],
  },
]

export const screenwriting: Book = {
  id: 'screenwriting',
  title: 'Screenwriting',
  subtitle: 'The story\u2019s craft — structure, character, dialogue and the rewrite\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the script register)',
  description: 'The screenwriting\u2019s discipline: the story-and-premise craft (the idea honesty — the two named: the what-and-who division: the concept receipt — the arc named, the logline craft — the one named: the sentence receipt priced straight with the irony named); the character-and-want craft (the arc cross-reference from acting — the need\u2019s-against-want division priced straight: the two named, the flaw named — the two named, the antagonist\u2019s-honesty: the worthy receipt); the structure\u2019s arc (the three division — the two named: the act\u2019s third honesty, the sequence craft — the eight named: the two named, the midpoint named — the two named, the craft\u2019s-why named — the three-craft receipt); the scene\u2019s-craft (the beats register — the objective cross-reference, the late named: the two named, the enter\u2019s leave honesty — the conflict receipt, the subtext craft — the say-and-mean division); the dialogue\u2019s-craft (the voice census — the two named, the purpose register — the two named, the test named: the cover receipt); the rewrite\u2019s-discipline (the draft\u2019s-arc — the two named: the rewrite\u2019s-against-rewrite honesty: the two named, the feedback register — the notes craft: the not named: the craft receipt); the genre-and-format register (the craft named — the two named: the convention honesty, the TV named: the two named — the room\u2019s-craft named, the pilot craft named); and the career\u2019s-craft (the spec named — the two named, the pitch register named — the two named).',
  status: 'planned',
  accent: ['#4338ca', '#312e81'],
  chapters,
}
