import type { Book, Chapter } from '../../../types'

/**
 * Film Studies — the twenty-ninth book of the Arts-Music shelf (the performing register; the Bordwell arc).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `film-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Film Studies owns the analysis register. The cinematography’s-craft to cinematography (cross-referenced — the analysis here, the camera there); the screenwriting to screenwriting; the sound’s-technique to production; the editing’s-craft shared with screenwriting at the story level; the history to the humanities shelf (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Bordwell and Thompson’s Film Art — the TOC read this pass (the retrieved arc: Film as Art / Film Form / Narrative Form / The Shot: Mise-en-Scene / The Shot: Cinematography / The Cut / Sound / the type chapter arc) as the spine.
 * - The Mastroianni’s Film History cross-referenced for the survey.
 * - The NCERT line named as the school register with the seeing honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'film-as-art',
    title: 'The Film-as-Art Craft',
    summary:
      'The form\u2019s-honesty: the creative receipt (the three-craft named — the technology-and-business division with the art craft held: the why named, the machine\u2019s-honesty — the recorded named: the liveness cross-reference from theatre held straight); the form\u2019s-function honesty (the expectation receipt — the pattern named: the viewer\u2019s-craft, the System named: the everything honesty — the Form named: the craft\u2019s-own named); and the experience\u2019s-register (the two named: the see\u2019s see-again division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three-Craft Division Named',
      'The Liveness Cross-Reference Held Straight',
      'The Everything Honesty Held',
      'The See-Again Division Named',
      'Comparative Study (cs) \u2014 Analytical Comparison Of Artworks By Different',
    ],
  },
  {
    number: 2,
    slug: 'narrative-form',
    title: 'The Narrative Form',
    summary:
      'The story\u2019s-craft: the story-plot division held straight (the two named — the fabula-and-syuzhet named at survey depth: the Russian named, the construct honesty: the plot\u2019s-arc — the open named: the two named); the narrative\u2019s-census (the time\u2019s-register — the two named: the order-and-duration division, the space named: the two named, the narration named — the range honesty: the omniscient\u2019s-against-restricted division); the characters\u2019 craft cross-referenced from screenwriting (the arc receipt); and the genre\u2019s-convention (the repeat\u2019s-against-invention division — the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Held Straight',
      'The Order-Duration Division Named',
      'The Range Honesty Held',
      'The Repeat-Invention Division Held Straight',
    ],
  },
  {
    number: 3,
    slug: 'style-craft',
    title: 'The Style Craft',
    summary:
      'The image\u2019s sound discipline: the shot\u2019s-census (the mise named — the staging craft: the two named with the framing cross-referenced from cinematography, the image register — the value named cross-referenced from drawing, the movement named: the two named); the cut craft (the editing named cross-referenced — the continuity craft: the two named, the rhythm named); the sound\u2019s-craft (the census named — the two named: the diegetic-and-non division, the offscreen named: the craft receipt); and the style\u2019s-honesty (the consistency receipt — the two named: the function named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Craft Honesty Held',
      'The Continuity Craft Held',
      'The Diegetic-Non Division Fixed by Drill',
      'The Function Named',
    ],
  },
  {
    number: 4,
    slug: 'genre-auteur-industry',
    title: 'The Genre, Auteur-and-Industry Registers',
    summary:
      'The convention\u2019s authorship crafts: the genre\u2019s-register (the convention honesty — the six census named at survey depth: the western-and-noir division, the two named: the repeat\u2019s-against-invention division); the auteur\u2019s-craft (the theory\u2019s honesty — the critic named: the three named, the craft\u2019s-against-theory division held straight — the evidence receipt: the three named); the industry craft (the three-craft division — the production\u2019s distribution-and-exhibition registers, the star named at survey depth: the economics receipt); and the India register named (the three division — the masala honesty named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Six Census Named',
      'The Three Named',
      'The Economics Receipt Named',
      'The Masala Honesty Named',
    ],
  },
  {
    number: 5,
    slug: 'history-analysis',
    title: 'The History-and-Analysis Registers',
    summary:
      'The tradition\u2019s paper crafts: the history\u2019s-survey (the two named: the silent-and-sound division — the craft\u2019s-consequence named: the image named, the new-waves named — the French honesty: the craft named, the third named at survey depth); the analysis craft (the sequence\u2019s-anatomy — the paper honesty: the two named — the craft\u2019s division held straight: the description\u2019s-against-argument division, the two named: the evidence receipt); and the writing\u2019s-craft named (the see named: the two named — the see-and-name division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Image Named',
      'The Craft Named',
      'The Description-Argument Division Held Straight',
      'The See-Name Division Named',
    ],
  },
]

export const filmStudies: Book = {
  id: 'film-studies',
  title: 'Film Studies',
  subtitle: 'The film form\u2019s discipline — the shot, the cut, the sound and the meaning\u2019s craft',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the analysis register)',
  description: 'The film\u2019s discipline by the Bordwell arc: the film-as-art craft (the form honesty — the creative receipt: the three-craft named — the technology-and-business division, the machine\u2019s-honesty: the recorded named — the Bordwell named: the arc priced straight); the film-form register (the form\u2019s-function honesty — the expectation receipt: the pattern named, the system named: the everything honesty); the narrative\u2019s craft (the story\u2019s-against-plot division held straight — the two named: the fabula-and-syuzhet named at survey depth, the craft named — the time\u2019s register: the two named, the omniscient named); the style\u2019s-craft (the shot\u2019s-census — the mise named: the staging named cross-referenced from cinematography, the cut craft cross-referenced — the editing named, the sound named cross-referenced from production); the genre register (the convention honesty — the two named: the repeat\u2019s-against-invention division, the six census named at survey depth); the auteur register (the theory\u2019s honesty — the critic named: the three named, the craft\u2019s-against-theory division held straight); the industry craft (the business named — the three-craft division: the production\u2019s distribution-and-exhibition registers); the history\u2019s-survey (the two named: the silent-and-sound division, the new-waves named — the two named: the French honesty); and the analysis\u2019s-craft (the paper honesty — the sequence named: the anatomy named, the two named — the craft division held straight).',
  status: 'planned',
  accent: ['#1e40af', '#1e3a8a'],
  chapters,
}
