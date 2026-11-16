import type { Book, Chapter } from '../../../types'

/**
 * Graphic Design — the eighteenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `gdes-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Graphic Design owns the communication register. The type’s-depth to typography (cross-referenced — the use here, the craft there); the colour to colour-theory; the HCI’s-depth to the CS shelf’s HCI book (cross-referenced); the production’s-print craft named with the chemistry shelf’s ink cross-reference; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Lupton Thinking with Type cross-referenced with the Meggs named as the history pole.
 * - The Müller-Brockmann named as the grid pole.
 * - The CS shelf’s HCI book cross-referenced for the interface depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'definition-hierarchy',
    title: 'The Definition-and-Hierarchy Craft',
    summary:
      'The communication\u2019s frame: the definition\u2019s honesty (the problem receipt — the message\u2019s-serve named, the art\u2019s-against-design division held straight — the two crafts priced by their purposes); the hierarchy\u2019s craft (the contrast\u2019s register — the three-craft named: the size\u2019s weight-and-colour division, the scanning receipt — the three-seconds honesty priced straight); the gestalt census (the proximity-and-similarity division with the closure named — the brain\u2019s-craft); and the white-and-honesty named (the space register — the breathing receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two-Crafts Division Held Straight',
      'The Three-Seconds Honesty Priced Straight',
      'The Closure Named',
      'The Breathing Receipt Named',
    ],
  },
  {
    number: 2,
    slug: 'grid-layout',
    title: 'The Grid-and-Layout Craft',
    summary:
      'The page\u2019s architecture: the grid\u2019s honesty (the Müller receipt named — the module register with the column craft fixed by drill, the breaking honesty — the earned exception named); the layout\u2019s census (the symmetry\u2019s-against-dynamic division — the asymmetry receipt named, the flow\u2019s-craft — the entry\u2019s path honesty cross-referenced from drawing); the scale\u2019s register (the contrast\u2019s craft — the huge named at survey depth); and the critique\u2019s-craft (the why register — the defend honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Module Register Fixed by Drill',
      'The Entry\u2019s Path Honesty Cross-Referenced',
      'The Huge Named',
      'The Defend Honesty Named',
    ],
  },
  {
    number: 3,
    slug: 'identity-system',
    title: 'The Identity-and-System Craft',
    summary:
      'The mark\u2019s discipline: the logo\u2019s honesty (the simplicity receipt priced straight — the reduction craft, the wordmark-and-logotype division named, the fencepost test named at survey depth — the reproducibility register); the identity\u2019s-craft (the system register — the guideline named: the clearspace honesty with the minimum-size receipt named); the extension\u2019s-census (the stationery-and-signage division with the digital\u2019s-register named); the rebrand-and-honesty named at survey depth (the legacy craft — the two-logo receipt named); and the craft\u2019s-consequence (the consistency honesty — the recognition register named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reduction Craft Priced Straight',
      'The Clearspace Honesty Named',
      'The Two-Logo Receipt Named',
      'The Recognition Register Named',
    ],
  },
  {
    number: 4,
    slug: 'editorial-digital',
    title: 'The Editorial-and-Digital Registers',
    summary:
      'The page\u2019s screen crafts: the editorial\u2019s-craft (the publication register — the flow honesty with the spread-and-craft named, the grid\u2019s cross-reference, the cover-and-craft named — the newsstand receipt); the digital\u2019s-craft (the UI register — the interface honesty named with the usability cross-reference from the CS shelf\u2019s HCI book, the responsive honesty — the breakpoint named, the accessibility register named — the contrast\u2019s-ratio named); and the motion named at survey depth (the UI animation cross-reference from animation).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Newsstand Receipt Named',
      'The Usability Cross-Reference Held',
      'The Responsive Honesty Named',
      'The Motion Cross-Reference Named',
    ],
  },
  {
    number: 5,
    slug: 'process-portfolio',
    title: 'The Process-and-Portfolio Register',
    summary:
      'The working\u2019s-discipline: the process\u2019s craft (the research register — the brief honesty with the strategy named, the sketch\u2019s-arc — the thumbnail cross-reference from drawing, the iteration\u2019s-craft — the three-round receipt named); the critique\u2019s-register (the feedback honesty — the thick-skin receipt named); the portfolio\u2019s-craft (the case\u2019s-honesty — the process named: the problem-and-solution division, the ten-projects register named); and the ethics named (the manipulation caution — the persuasion\u2019s honesty held straight).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Strategy Named',
      'The Three-Round Receipt Named',
      'The Case Honesty Held',
      'The Persuasion Honesty Held Straight',
    ],
  },
]

export const graphicDesign: Book = {
  id: 'graphic-design',
  title: 'Graphic Design',
  subtitle: 'The communication\u2019s craft — typography, grid, identity and the systems design',
  discipline: 'arts-music',
  level: 'Beginner → professional (the studio register)',
  description: 'The design\u2019s discipline: the definition\u2019s honesty (the communication craft — the problem receipt: the message\u2019s-serve named, the art\u2019s-against-design division held straight — the two crafts priced by their purposes); the typography\u2019s foundation (the cross-reference from typography — the designer\u2019s-use: the hierarchy craft with the contrast-and-register named); the layout-and-grid craft (the grid honesty — the Müller receipt named with the module register, the gestalt census — the proximity-and-similarity division with the closure named); the colour in design (the cross-reference from colour-theory — the function\u2019s register: the corporate honesty named); the logo-and-identity craft (the mark\u2019s honesty — the simplicity receipt priced straight, the wordmark-and-logotype division, the system\u2019s register — the identity\u2019s-craft with the guideline named); the editorial\u2019s-design (the publication craft — the hierarchy-and-flow register with the Modulor named at survey depth); the digital-product craft (the UI register — the interface honesty named with the usability cross-reference from the CS shelf\u2019s HCI book); the branding\u2019s-system craft (the extension register — the application census: the stationery-and-signage division); and the portfolio-and-process register (the research\u2019s-craft — the brief honesty with the critique-and-register named).',
  status: 'planned',
  accent: ['#2563eb', '#1e3a8a'],
  chapters,
}
