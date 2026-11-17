import type { Book, Chapter } from '../../../types'

/**
 * Contemporary Dance — the twenty-sixth book of the Arts-Music shelf (the performing register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 21 planned lessons, zero written. Lesson ids will use the `ctd-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Contemporary Dance owns the modern register. The fundamentals to dance-fundamentals; the classical to classical-dance; the Laban’s-effort full system owned here; the composition’s-craft cross-referenced from music-composition; the screen’s-craft to film-studies (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Smith named as the release pole (the Lester craft) with the Brown named as the postmodern co-pole.
 * - The Laban’s effort system owned here in full.
 * - The NCERT line named as the school register with the company honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'modern-roots',
    title: 'The Modern Roots',
    summary:
      'The history\u2019s-honesty: the Duncan receipt (the barefoot named — the two-craft\u2019s-division named: the ballet\u2019s-rejection honesty priced straight, the Greek named); the Graham craft (the contraction\u2019s-against-release division — the technique\u2019s-arc: the floor named, the breath register named); the Cunningham craft (the chance honesty — the Williams cross-reference: the coin receipt named, the decorative\u2019s-against-autonomous division held); and the two-denial named at survey depth (the postmodern register — the Judson named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Barefoot Named',
      'The Contraction Division Held Straight',
      'The Coin Receipt Named',
      'The Judson Named',
    
      'Unit IV (common): Research Methodology and Pedagogy, Avenues, Interdisciplinary aspects and Modern Technology'
    ],
  },
  {
    number: 2,
    slug: 'release-floorwork',
    title: 'The Release-and-Floorwork Craft',
    summary:
      'The weight\u2019s-discipline: the release\u2019s honesty (the give receipt — the weight named: the under honesty, the spiral register named with the fall\u2019s recovery cross-reference from dance-fundamentals); the floorwork\u2019s-craft (the surface receipt — the slide named, the travel named: the low register); the breath\u2019s-craft named (the sound honesty — the audible receipt); and the efficiency\u2019s honesty (the minimal named — the path receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Under Honesty Named',
      'The Low Register Held',
      'The Audible Receipt Named',
      'The Path Receipt Named',
    ],
  },
  {
    number: 3,
    slug: 'contact-improvisation',
    title: 'The Contact-Improvisation Craft',
    summary:
      'The partner\u2019s-discipline: the contact\u2019s honesty (the weight-sharing receipt — the lift craft: the counter named, the point named — the touch census: the physical honesty priced straight, the rolling named); the improvisation\u2019s-craft (the yes receipt cross-referenced — the offer named, the score register — the task craft); the jam named at survey depth (the practice honesty — the open receipt); and the safety-and-register named (the consent named — the two honesty held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Counter Named',
      'The Open Receipt Named',
      'The Consent Named',
      'The Two Honesty Held Straight',
    ],
  },
  {
    number: 4,
    slug: 'composition-choreography',
    title: 'The Composition-and-Choreography Register',
    summary:
      'The maker\u2019s-craft: the composition\u2019s-honesty (the craft named — the score register: the task craft, the motif cross-reference from music-composition — the repeat-and-vary division); the structure census (the AB-and-ABA division cross-referenced, the canon named at survey depth); the choreography\u2019s-arc (the craft named — the material named: the sourcing honesty, the editing\u2019s-craft — the cut receipt); and the collaboration-and-register named (the dramaturg named at survey depth — the outside honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Task Craft Held',
      'The Canon Named',
      'The Sourcing Honesty Held',
      'The Outside Honesty Named',
    ],
  },
  {
    number: 5,
    slug: 'site-screen-scene',
    title: 'The Site, Screen-and-Scene Registers',
    summary:
      'The place\u2019s now crafts: the site\u2019s-honesty (the place receipt — the context named: the found register, the audience\u2019s-division — the around named); the screen\u2019s-craft (the cinema cross-reference: the two named — the camera\u2019s-consequence: the frame receipt, the editing named cross-referenced from film-studies); the sustainability named (the green receipt — the touring\u2019s-honesty priced straight at survey depth: the local named); and the scene\u2019s register (the festival named at survey depth — the platform receipt with the showcase named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Found Register Named',
      'The Frame Receipt Held',
      'The Local Named',
      'The Platform Receipt Named',
    ],
  },
]

export const contemporaryDance: Book = {
  id: 'contemporary-dance',
  title: 'Contemporary Dance',
  subtitle: 'The modern-and-now craft — release, improvisation, the site and the screen',
  discipline: 'arts-music',
  level: 'Intermediate → advanced (the company register)',
  description: 'The contemporary\u2019s discipline: the history\u2019s-arc (the modern\u2019s-roots honesty — the Duncan receipt named with the Isadora craft, the two-denial named at survey depth, the Graham-and-Cunningham division — the contraction\u2019s-against-chance honesty priced straight: the two crafts); the release\u2019s-technique (the floor craft — the spiral register named with the fall\u2019s recovery cross-reference, the weight honesty — the give receipt: the partner named); the cunningham-and-Limon registers (the chance craft — the craft\u2019s-consequence named: the Williams cross-reference from music-history, the fall\u2019s-arc — the breath register named); the improvisation-and-contact craft (the yes receipt cross-referenced from dance-fundamentals, the contact\u2019s-craft — the weight-sharing honesty: the lift receipt, the point named — the touch census); the composition-and-choreography register (the craft named — the score register: the task craft, the structure census — the AB-and-ABA division cross-referenced from music-composition); the site-and-screen craft (the site\u2019s-honesty — the place receipt, the screen\u2019s-craft — the cinema cross-reference: the two named); the sustainability named (the green receipt — the touring\u2019s-honesty priced straight at survey depth); and the scene\u2019s register (the festival named at survey depth — the platform receipt).',
  status: 'planned',
  accent: ['#f43f5e', '#881337'],
  chapters,
}
