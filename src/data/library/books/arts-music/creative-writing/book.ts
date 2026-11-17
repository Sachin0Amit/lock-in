import type { Book, Chapter } from '../../../types'

/**
 * Creative Writing — the thirty-sixth book of the Arts-Music shelf (the design register; the honest fold — the backlog line Literature lives here as the writer-and-reading register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `cwrit-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Creative Writing owns the writing craft with the Literature line folded in as the writer-and-reading register (the humanities shelf owns the academic literary-studies — the sibling views held straight). The screenwriting’s-structure to screenwriting; the poetry’s-sound to music-theory at the rhythm level (cross-referenced); the workshop’s-craft priced here; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The King’s On Writing named as the pole (the craft register) with the Gardner co-pole.
 * - The humanities shelf cross-referenced for the literary-studies depth.
 * - The NCERT line named as the school register with the workshop honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'story-structure',
    title: 'The Story-Structure Craft',
    summary:
      'The tale\u2019s-architecture: the arc cross-reference from screenwriting (the structure\u2019s-against-meaning division — the two named: the craft\u2019s-choice honesty: the two named); the character\u2019s-craft (the want cross-reference — the verb named: the two named, the flaw named, the change named: the two named); the conflict receipt (the two named — the craft\u2019s-why: the two named); and the scene\u2019s-craft cross-referenced (the beat named — the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Craft\u2019s-Choice Honesty Held Straight',
      'The Verb Named',
      'The Two Named',
      'The Beat Named',
    ],
  },
  {
    number: 2,
    slug: 'point-of-view',
    title: 'The Point-of-View Register',
    summary:
      'The eye\u2019s-craft: the census (the two named: the first\u2019s-against-third division — the close named: the two named, the second named at survey depth, the omniscient named: the two named); the choice\u2019s-honesty (the two named: the distance receipt — the craft\u2019s-consequence named: the two named); the tense named (the two named — the craft\u2019s-consequence: the two named); and the unreliable register named at survey depth (the craft\u2019s-honesty: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Close Named',
      'The Distance Receipt Held',
      'The Craft\u2019s-Choice Honesty Held',
      'The Two Held',
    ],
  },
  {
    number: 3,
    slug: 'prose-style',
    title: 'The Prose-Style Craft',
    summary:
      'The sentence\u2019s-discipline: the style\u2019s-honesty (the voice — the two named: the natural\u2019s-against-styled division: the craft\u2019s-why named, the sentence\u2019s-register — the two named: the short\u2019s-against-long honesty: the rhythm named cross-referenced from music-composition, the variation receipt: the two named); the syntax\u2019s-craft (the two named — the craft\u2019s-consequence: the two named); the clarity\u2019s-honesty (the Bonnie cross-reference — the two named: the clear\u2019s-against-clever division: the craft named); and the sound\u2019s register (the two named — the aloud receipt: the craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rhythm Cross-Reference Named',
      'The Variation Receipt Held',
      'The Clear-Clever Division Named',
      'The Aloud Receipt Named',
    ],
  },
  {
    number: 4,
    slug: 'dialogue-scene',
    title: 'The Dialogue-and-Scene Craft',
    summary:
      'The talk\u2019s unit crafts: the dialogue\u2019s-craft (the subtext register cross-referenced from screenwriting — the say-and-mean division: the two named, the voice census — the two named: the distinct honesty, the tag named — the said honesty: the two named: the craft\u2019s-minimalism named); the scene\u2019s-craft (the beat cross-reference — the two named, the enter-and-leave receipt cross-referenced: the two named); and the description\u2019s-register (the two named: the image\u2019s-against-inventory division — the detail\u2019s-honesty: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Distinct Honesty Held',
      'The Minimalism Named',
      'The Enter-Leave Receipt Held',
      'The Detail\u2019s-Honesty Named',
    ],
  },
  {
    number: 5,
    slug: 'poetry-revision',
    title: 'The Poetry-and-Revision Registers',
    summary:
      'The line\u2019s polish crafts: the poetry\u2019s-craft (the line named — the two named: the verse\u2019s-against-free division, the image\u2019s-against-statement division — the two named, the sound named: the two named, the form census — the two named: the fixed\u2019s-against-open division); the revision\u2019s-discipline (the draft\u2019s-arc — the two named: the rewrite\u2019s-against-write honesty: the two named, the workshop\u2019s-craft — the two named: the critique\u2019s-against-craft division, the thick named — the receipt: the two named); and the reading register (the writer\u2019s-reading — the two named: the read-and-read named: the two named, the craft\u2019s-why named: the three named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Verse-Free Division Named',
      'The Rewrite-Write Honesty Held',
      'The Critique-Craft Division Named',
      'The Three Named',
    ],
  },
]

export const creativeWriting: Book = {
  id: 'creative-writing',
  title: 'Creative Writing',
  subtitle: 'The writing craft — story, prose, poetry and the revision discipline',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the workshop register)',
  description: 'The writing\u2019s discipline with the literature fold held straight (the writer-and-reading register — the book named: the craft\u2019s-source receipt: the two named, the humanities shelf\u2019s literary-studies cross-reference named): the story\u2019s-craft (the arc cross-reference from screenwriting — the structure\u2019s-against-meaning division: the two named, the character named — the want cross-reference: the verb named, the conflict receipt: the two named); the point-of-view register (the census — the two named: the first\u2019s-against-third division with the close named, the choice named: the two named: the distance receipt, the unreliable named at survey depth); the prose\u2019s-style craft (the sentence\u2019s register — the two named: the short\u2019s-against-long honesty: the rhythm named cross-referenced from music-composition, the syntax\u2019s-craft named, the voice\u2019s honesty — the two named: the natural\u2019s-against-styled division); the dialogue-and-scene craft (the cross-reference from screenwriting — the subtext register: the say-and-mean division, the tag named: the said honesty: the two named); the poetry\u2019s-craft (the line named — the two named: the verse\u2019s-against-free division, the craft named: the two named: the image\u2019s-against-statement division — the two named, the sound named: the two named, the form census — the two named: the fixed\u2019s-against-open division); the revision\u2019s-discipline (the draft\u2019s-arc — the two named: the rewrite\u2019s-against-write honesty: the two named, the workshop\u2019s-craft — the two named: the critique\u2019s-against-craft division, the thick named: the receipt); the genre\u2019s-census named (the two named: the craft\u2019s-division — the scene named at survey depth); and the reading register (the writer\u2019s-reading — the two named: the read-and-read named: the two named, the reading named: the craft\u2019s-why named: the three named).',
  status: 'planned',
  accent: ['#7c2d12', '#431407'],
  chapters,
}
