import type { Book, Chapter } from '../../../types'

/**
 * Illustration — the sixteenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 27 planned lessons, zero written. Lesson ids will use the `illus-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Illustration owns the commissioned-image register. The drawing’s foundation to drawing; the colour to colour-theory; the raster-and-vector crafts to digital-art; the narrative craft to screenwriting (the story cross-reference); the copyright to the humanities shelf’s law book; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Hall How to be an Illustrator named as the co-pole (the market register).
 * - The Loomis cross-referenced from drawing as the figure co-pole.
 * - The repitition named with the Editorial Design cross-reference held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'brief-concept',
    title: 'The Brief-and-Concept Craft',
    summary:
      'The communication\u2019s discipline: the brief\u2019s honesty (the problem receipt priced straight — the image\u2019s-role: the text-and-image division with the three-craft named — the repeat, extend and counterpoint registers); the editorial-and-book division named (the each receipt: the timeliness against the permanence); the concept\u2019s craft (the visual-metaphor — the wit receipt named, the two-idea rule named at survey depth — the better idea honesty); and the research register (the reference\u2019s craft — the honest named: the invention\u2019s-against-reference division held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Repeat-Extend-Counterpoint Registers Named',
      'The Two-Craft Named',
      'The Two-Idea Rule Named',
      'The Invention\u2019s-against-Reference Division Held Straight',
    
      'Unit VIII: Contemporary practices in Indian art during the 20th and 21st centuries; modern concept of advertising, designing and visual communication; experimental modes in contemporary visual expression; development of art education in India from colonial art schools to the present',
      'Part B — Aptitude & Mathematics (120 marks, CBT, MCQ and NCQ): logical reasoning, visual reasoning, design sensitivity, numerical ability',
      'Part B — aptitude core areas: logical reasoning (series, coding-decoding), visual reasoning (2D-3D transformation), architectural awareness, general awareness (environment, culture), design sensitivity, language interpretation',
      'Part-A: Creativity — grasp of verbal and non-verbal analogies, metaphors, signs and symbols',
      'Stage 1 — DAT Prelims: paper-and-pencil/pen test; questions may involve text and visuals; question paper in English only (official handbook statement)',
      'Prelims typical areas (mirror): reasoning and visual ability — cube folding, mirror images, pattern series, counting figures, coding-decoding, directions'
    ],
  },
  {
    number: 2,
    slug: 'character-design',
    title: 'The Character-Design Craft',
    summary:
      'The casting\u2019s discipline: the silhouette\u2019s honesty (the shape\u2019s-reading craft — the two-seconds receipt named); the consistency register (the turnaround craft — the three-view receipt fixed by drill, the model sheet named); the expression census (the face\u2019s-arithmetic — the eyes-and-mouth register with the animation cross-reference named); the casting craft (the archetype\u2019s-honesty — the contrast register named); and the style\u2019s register (the consistent honesty — the hand-named receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Seconds Receipt Named',
      'The Three-View Receipt Fixed by Drill',
      'The Eyes-and-Mouth Register Held',
      'The Contrast Register Named',
    ],
  },
  {
    number: 3,
    slug: 'environment-sequential',
    title: 'The Environment-and-Sequential Registers',
    summary:
      'The scene\u2019s page crafts: the environment\u2019s craft (the set-dressing register — the world\u2019s-honesty with the perspective cross-reference, the prop census named); the sequential\u2019s register (the spot-and-corner division — the page\u2019s-craft named, the narrative honesty cross-referenced — the beat receipt: the image\u2019s-per-beat craft); the children\u2019s-book register (the 32-page receipt named — the spread\u2019s-craft with the arc named, the read-aloud honesty priced straight); and the editorial register (the timeliness honesty — the idea\u2019s-speed receipt with the two-day named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Prop Census Named',
      'The Beat Receipt Held',
      'The 32-Page Receipt Named',
      'The Two-Day Register Named',
    ],
  },
  {
    number: 4,
    slug: 'craft-style',
    title: 'The Craft-and-Style Registers',
    summary:
      'The medium\u2019s identity crafts: the vector-vs-raster craft (the cross-reference from digital-art — the two-division named with the style\u2019s-consequence: the clean\u2019s-against-painterly division); the materials census (the ink-and-watercolour division cross-referenced from painting, the digital\u2019s-register named); the style\u2019s-honesty (the consistent register — the voice\u2019s-own receipt priced straight, the appropriation caution named); and the process\u2019s-craft (the thumbnail-to-final arc — the approval\u2019s-cycle honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Clean-Painterly Division Held Straight',
      'The Voice\u2019s-Own Receipt Priced Straight',
      'The Appropriation Caution Named',
      'The Approval Cycle Honesty Named',
    
      'Process Portfolio (PP) — documentation of experimentation, skill-building, critical reflection and range of media across the course'
    ],
  },
  {
    number: 5,
    slug: 'business-portfolio',
    title: 'The Business-and-Portfolio Register',
    summary:
      'The working\u2019s-craft: the portfolio\u2019s craft (the eight-to-twelve receipt named — the best\u2019s honesty, the voice\u2019s-show named, the dummy register named for the book market); the client\u2019s-workflow (the brief-and-revision cycle — the two-round honesty named, the kill-fee register named at survey depth); the rights honesty (the copyright cross-reference from the humanities shelf\u2019s law book — the first-rights division named); and the rates register named at survey depth (the usage honesty — the licence craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Best\u2019s Honesty Held',
      'The Two-Round Honesty Named',
      'The First-Rights Division Named',
      'The Licence Craft Named',
    ],
  },
]

export const illustration: Book = {
  id: 'illustration',
  title: 'Illustration',
  subtitle: 'The communication craft — visual metaphor, character and the commissioned image',
  discipline: 'arts-music',
  level: 'Beginner → professional (the market register)',
  description: 'The illustration\u2019s discipline: the brief\u2019s-craft first (the communication honesty — the problem receipt priced straight: the image serves the text, the editorial-and-book division named); the visual-metaphor\u2019s craft (the concept\u2019s honesty — the two-idea rule named at survey depth, the visual\u2019s-register with the wit receipt named); the character-design\u2019s craft (the silhouette\u2019s honesty — the shape\u2019s-reading craft, the consistency register with the turnaround craft, the expression census named); the environment-and-world register (the scene\u2019s craft — the set-dressing register named with the perspective cross-reference); the sequential\u2019s register (the spot-and-corner division — the page\u2019s-craft named with the narrative honesty cross-referenced from the design books); the children\u2019s-book register (the spread craft — the 32-page receipt named, the character\u2019s-arc across pages); the editorial\u2019s register (the timeliness honesty — the idea\u2019s-speed receipt); the vector-vs-raster craft (the cross-reference from digital-art — the two-division named with the style\u2019s-consequence); and the business\u2019s-register (the portfolio craft with the client\u2019s-workflow — the brief-and-revision cycle named, the rights honesty cross-referenced from the humanities shelf\u2019s law book).',
  status: 'planned',
  accent: ['#7c3aed', '#4c1d95'],
  chapters,
}
