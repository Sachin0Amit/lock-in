import type { Book, Chapter } from '../../../types'

/**
 * Architecture — the thirty-third book of the Arts-Music shelf (the design register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 21 planned lessons, zero written. Lesson ids will use the `archt-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Architecture owns the built register. The structures’-depth to the engineering shelf’s structural books (cross-referenced — the sibling views); the history’s-depth to the humanities shelf’s art-history book (cross-referenced); the drawing’s-foundation to drawing; the interior’s-craft to interior-design; the model’s rendering to 3d-modelling; the graded-and-ARE registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Roth’s Understanding Architecture named as the pole.
 * - The engineering shelf cross-referenced for the structures depth.
 * - The NCERT line named as the school register with the studio honesty held.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-vitruvius',
    title: 'The What-and-Vitruvius Craft',
    summary:
      'The discipline\u2019s-frame: the third honesty (the Vitruvius receipt — the three named fixed by drill: the firmness named: the commodity-and-delight division named, the third named: the craft\u2019s-division held straight); the scale\u2019s-honesty (the two named: the building\u2019s-against-room division — the craft\u2019s-consequence named); the architect\u2019s-register (the two named: the designer-and-builder division — the ancient named: the master named); and the India receipt named (the stepwell named — the climate\u2019s-craft named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Fixed by Drill',
      'The Building-Room Division Named',
      'The Master Named',
      'The Stepwell Named',
    ],
  },
  {
    number: 2,
    slug: 'history-survey',
    title: 'The History Survey',
    summary:
      'The tradition\u2019s-arc: the first division (the ancient\u2019s-through-gothic — the Greek\u2019s receipt: the order named — the three named fixed by drill, the Roman named — the two named: the arch-and-concrete division, the Gothic named — the load\u2019s-consequence: the two named); the second division (the renaissance\u2019s modern — the two named: the craft\u2019s-revival named, the Industrial named: the two named, the Modern named — the two named: the form\u2019s-against-function division: the Loos named at survey depth); and the India register named (the stepwell cross-reference — the climate\u2019s-craft named, the modern\u2019s-India named at survey depth: the Chandigarh named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Concrete Craft Named',
      'The Arch-Concrete Division Named',
      'The Load Consequence Named',
      'The Chandigarh Named',
    ],
  },
  {
    number: 3,
    slug: 'drawing-craft',
    title: 'The Drawing Craft',
    summary:
      'The drafting\u2019s-discipline: the three\u2019s-division (the plan\u2019s section-and-elevation fixed by drill — the convention\u2019s-honesty: the cut named, the projected named); the scale craft (the two named — the drawing\u2019s-against-paper division: the two named: the scale named); the model register (the two named: the study\u2019s-against-presentation division, the material named); the CAD cross-reference named (the engineering shelf — the two named: the tool honesty); and the sketch\u2019s-craft cross-referenced from drawing (the concept named: the two named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cut Convention Held Straight',
      'The Scale Named',
      'The Study-Presentation Division Named',
      'The Tool Honesty Held',
      'Prelims Typical Areas (mirror): Drawing And Design \u2014 Drawing A Scene From',
    ],
  },
  {
    number: 4,
    slug: 'structure-basics',
    title: 'The Structure Basics',
    summary:
      'The force\u2019s-discipline: the load\u2019s-honesty (the two named: the compression-and-tension division — the two named, the dead-and-live division named); the beam\u2019s craft (the bending receipt — the two named: the top-and-bottom division named); the arch craft (the thrust named — the two named: the buttress named, the Gothic cross-reference held); the truss named (the craft — the void named: the two named); and the structural cross-reference held (the engineering shelf — the technical named: the division named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dead-Live Division Named',
      'The Thrust Named',
      'The Buttress Named',
      'The Division Named',
    ],
  },
  {
    number: 5,
    slug: 'materials-space-climate',
    title: 'The Materials, Space-and-Climate Registers',
    summary:
      'The build\u2019s place crafts: the materials\u2019-register (the three named: the wood\u2019s steel-and-concrete division — the each named: the fire\u2019s-steel honesty named: the two named, the concrete named — the two named: the form\u2019s-against-pour division); the space\u2019s craft (the room named — the proportion\u2019s-craft: the golden named at survey depth, the path\u2019s-honesty — the circulation named: the two named, the light named — the two named); the climate\u2019s register (the sun\u2019s-craft — the orientation receipt: the two named, the passive named — the two named, the cross named at survey depth); and the profession\u2019s-craft (the craft\u2019s-arc — the school-and-office division, the ARE named at survey depth: the licence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Fire-Steel Honesty Named',
      'The Golden Named at Survey Depth',
      'The Orientation Receipt Named',
      'The Licence Named',
    ],
  },
]

export const architecture: Book = {
  id: 'architecture',
  title: 'Architecture',
  subtitle: 'The built craft — history, drawing, structure and the design\u2019s own discipline',
  discipline: 'arts-music',
  level: 'Beginner → undergraduate (the studio register)',
  description: 'The architecture\u2019s discipline: the what-and-shelter craft (the third honesty — the commodity-and-delight division named: the Vitruvius receipt, the firmness named — the three named fixed by drill); the history\u2019s-survey arc (the two named: the ancient\u2019s-through-gothic division — the Greek\u2019s Gothic receipts named with the load\u2019s-consequence named, the renaissance-and-modern division — the two named: the craft\u2019s-against-machine honesty, the Modern named — the two named: the form\u2019s-against-function division, the India register named — the stepwell named at survey depth); the drawing\u2019s-craft (the plan\u2019s section-and-elevation division fixed by drill — the three named, the scale craft — the two named, the drawing\u2019s-techniques cross-referenced from drawing — the model named: the two named, the CAD cross-reference from the engineering shelf); the structure\u2019s-basics (the load\u2019s-honesty — the two named: the compression-and-tension division, the beam named — the bending receipt, the arch craft — the two named, the truss named, the structural cross-reference from the engineering shelf: the technical named); the materials\u2019-and-construction register (the craft named — the three named: the wood\u2019s steel-and-concrete division with the each register: the fire\u2019s-steel honesty named, the concrete named — the two named); the space-and-circulation craft (the room named — the two named: the proportion\u2019s-craft: the golden named at survey depth, the path\u2019s-honesty — the circulation named: the two named, the light named — the two named: the natural\u2019s-against-artificial division); the site-and-climate register (the sun\u2019s-craft — the two named: the orientation receipt, the passive named — the two named, the climate\u2019s-census — the two named: the hot-and-cold division); and the profession-and-process register (the NCARB named at survey depth — the ARE receipt, the craft\u2019s-arc — the two named: the school-and-office division, the licence named).',
  status: 'planned',
  accent: ['#0f766e', '#042f2e'],
  chapters,
}
