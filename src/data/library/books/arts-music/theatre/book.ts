import type { Book, Chapter } from '../../../types'

/**
 * Theatre — the twenty-seventh book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 4 chapters /
 * 16 planned lessons, zero written. Lesson ids will use the `thea-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Theatre owns the stage register. The acting’s-craft to acting (cross-referenced); the script’s-craft to screenwriting (the shared story cross-reference); the stage’s-technical craft to stage-production; the Indian classical forms to classical-dance (cross-referenced); the history to the humanities shelf (cross-referenced at the periods level); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Brockett History of the Theatre named as the pole.
 * - The Aristotle’s Poetics cross-referenced with the Natyashastra named as the two founding texts.
 * - The Bordwell arc cross-referenced from film-studies for the narratological registers.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'liveness-history',
    title: 'The Liveness-and-History Register',
    summary:
      'The live\u2019s-honesty: the presence receipt (the same-room named — the live\u2019s-against-recorded division priced straight: the actor-audience craft named); the Greek arc (the two receipt — the festival named: the City honesty, the mask named with the chorus named: the craft — the two named, the orchestra named: the dancing honesty); the Aristotle craft (the six named — the catharsis receipt with the hamartia named); and the Sanskrit arc named (the Natyashastra honesty — the eight named cross-referenced from classical-dance).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Same-Room Named',
      'The Chorus Named',
      'The Catharsis Receipt Named',
      'The Natyashastra Cross-Reference Named',
    ],
  },
  {
    number: 2,
    slug: 'drama-structure',
    title: 'The Drama-Structure Craft',
    summary:
      'The play\u2019s-architecture: the plot\u2019s-craft (the arc cross-referenced from screenwriting — the well named: the exposition-and-climax division with the arc fixed by drill, the well-made honesty — the craft\u2019s-consequence named: the formula receipt); the genre census (the two named — the tragedy-and-comedy division with the tragicomedy named, the burlesque named at survey depth); the dialogue\u2019s-craft cross-referenced (the monologue\u2019s division — the two named: the alone receipt); and the subplot named at survey depth (the two\u2019s-honesty — the braid register).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Arc Fixed by Drill',
      'The Two Named',
      'The Alone Receipt Named',
      'The Braid Register Named',
    ],
  },
  {
    number: 3,
    slug: 'production-team',
    title: 'The Production-Team Census',
    summary:
      'The team\u2019s-honesty: the roles\u2019 census (the director\u2019s-craft — the interpretation\u2019s-register named: the keeper named, the designer\u2019s division — the three named: the set\u2019s light-and-costume registers cross-referenced from stage-production, the SM named — the Stage-Manager craft: the show\u2019s-keeper receipt); the craft\u2019s-division named (the administrative register — the producer named: the two honesty); and the collaboration\u2019s-craft (the table named — the read receipt: the first named, the week\u2019s-arc — the two named: the tech-and-dress division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Keeper Named',
      'The Three Named',
      'The Show\u2019s-Keeper Receipt Held',
      'The Tech-Dress Division Fixed by Drill',
    ],
  },
  {
    number: 4,
    slug: 'script-analysis-world',
    title: 'The Script-Analysis-and-World Registers',
    summary:
      'The text\u2019s globe crafts: the playscript\u2019s-analysis (the beats register — the objective\u2019s-craft cross-referenced from acting, the given honesty — the Stanhislavski named: the list named, the analysis arc — the three named: the what-and-why division); the world\u2019s-register (the kathakali cross-reference — the craft held: the two named, the noh named — the two named: the japanese division with the mask named, the Brecht craft — the epic honesty: the alienation named, the Boal named at survey depth — the oppressed honesty); and the spectatorship\u2019s-register (the criticism craft — the review\u2019s-honesty: the two-crafts division held straight, the craft named: the see named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Given Honesty Held',
      'The Alienation Named',
      'The Oppressed Honesty Named',
      'The See Named',
    ],
  },
]

export const theatre: Book = {
  id: 'theatre',
  title: 'Theatre',
  subtitle: 'The live craft — the play\u2019s architecture, the production team and the world\u2019s stages',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the stage register)',
  description: 'The theatre\u2019s discipline: the liveness\u2019s honesty (the presence receipt — the audience\u2019s-division: the same-room named, the live\u2019s-against-recorded division priced straight — the Brecht named at survey depth); the history\u2019s-survey (the Greek\u2019s-arc — the two receipt named: the festival-and-mask division, the Aristotle\u2019s-Poetics craft — the six named with the catharsis receipt, the Sanskrit\u2019s-arc named — the Natyashastra honesty cross-referenced, the modern\u2019s-arc — the realism-and-anti division named); the drama\u2019s-structure craft (the plot\u2019s-arc cross-referenced from screenwriting — the well-made honesty with the well named: the exposition-and-climax division, the genre census — the two named: the tragedy-and-comedy division with the tragicomedy named); the production\u2019s-team census (the roles honesty — the director-and-designer division, the Stage-Manager named — the craft cross-referenced from stage-production); the playscript\u2019s-analysis (the beats register — the objective\u2019s-craft cross-referenced from acting, the analysis arc — the given honesty: the Stanhislavski named); the world\u2019s-theatre register (the kathakali\u2019s-craft cross-referenced from classical-dance, the noh named — the two named: the japanese division, the Brecht named — the epic honesty); and the spectatorship\u2019s-register (the criticism craft — the review\u2019s-honesty named: the two-crafts division held straight).',
  status: 'planned',
  accent: ['#7c2d12', '#451a03'],
  chapters,
}
