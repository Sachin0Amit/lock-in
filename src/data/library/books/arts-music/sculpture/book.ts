import type { Book, Chapter } from '../../../types'

/**
 * Sculpture — the seventeenth book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 23 planned lessons, zero written. Lesson ids will use the `sculp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Sculpture owns the solid register. The drawing’s foundation to drawing; the material’s chemistry to the chemistry shelf (cross-referenced); the engineering’s-structure to the engineering shelf’s structural books (cross-referenced — the load honesty); the public’s-commission law to the humanities shelf’s law book; the graded-and-atelier registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Simonds Technique of Sculpture named as the pole.
 * - The Lanteri named as the classic co-pole (the modeling register).
 * - The chemistry shelf cross-referenced for the clay-and-glaze registers.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'volume-thinking',
    title: 'The Volume-Thinking Craft',
    summary:
      'The solid\u2019s mind: the two-methods honesty (the additive-and-subtractive division — the risk receipt named: the subtractive\u2019s-consequence priced straight); the mass-and-space register (the void honesty — the hole receipt named with the Moore named at survey depth); the viewpoint craft (the walk-around honesty — the three-view receipt fixed by drill); and the light register named (the surface\u2019s-craft — the finish honesty cross-referenced from drawing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Risk Receipt Priced Straight',
      'The Hole Receipt Named',
      'The Three-View Receipt Fixed by Drill',
      'The Finish Honesty Cross-Referenced',
    
      'Elective V: Sculpture'
    ],
  },
  {
    number: 2,
    slug: 'clay-modeling',
    title: 'The Clay-Modeling Craft',
    summary:
      'The additive\u2019s-discipline: the armature\u2019s honesty (the core receipt — the stand\u2019s-craft named, the support consequence named); the modeling\u2019s crafts (the add-and-subtract division — the build-and-cut register, the surface\u2019s-craft with the tool-mark honesty named); the terra named at survey depth (the solid\u2019s-receipt); the dryness honesty (the shrink register named — the cracking consequence); and the hollow craft (the fire\u2019s-consequence — the venting honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Core Receipt Held',
      'The Tool-Mark Honesty Named',
      'The Shrink Register Named',
      'The Venting Honesty Named',
    
      'Sculpture practical Class XI-XII: Modeling in Relief (clay or plaster of Paris); Modeling in Round; Portfolio Assessment (folk-art sculpture pieces included)'
    ],
  },
  {
    number: 3,
    slug: 'carving-construction',
    title: 'The Carving-and-Construction Registers',
    summary:
      'The taking-away crafts: the carving\u2019s discipline (the wood-and-stone division — the grain honesty named with the knot register, the tools census — the chisel-and-gouge division, the direct\u2019s-against-pointing division named — the measuring receipt: the caliper craft fixed by drill); the construction\u2019s register (the fabrication craft — the weld honesty named with the tack named, the found register named at survey depth with the honesty priced straight — the transformation receipt); and the assembly register named (the mechanical joint named at survey depth).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grain Honesty Named',
      'The Caliper Craft Fixed by Drill',
      'The Tack Named',
      'The Transformation Receipt Priced Straight',
    
      'Unit III: Traditional medium, materials and techniques and their application in all disciplines of visual expression (carving and casting processes; impasto, glazing; intaglio/relief print; fresco; preparation of ground for murals, wasli for miniatures)'
    ],
  },
  {
    number: 4,
    slug: 'molding-casting',
    title: 'The Molding-and-Casting Craft',
    summary:
      'The multiplied\u2019s-discipline: the mold\u2019s census (the waste-and-reusable division — the plaster-and-silicone division named, the parting craft — the seam honesty named, the keys register named); the casting\u2019s register (the plaster\u2019s-craft — the consistency receipt fixed by drill, the resin named — the two-part honesty, the lost-wax arc named at survey depth — the bronze receipt priced straight); the safety register named (the silica honesty — the respirator receipt); and the edition\u2019s-honesty (the numbered register named — the limited division).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Seam Honesty Named',
      'The Consistency Receipt Fixed by Drill',
      'The Bronze Receipt Priced Straight',
      'The Numbered Register Named',
    ],
  },
  {
    number: 5,
    slug: 'ceramics-scale-public',
    title: 'The Ceramics, Scale-and-Public Registers',
    summary:
      'The fire\u2019s city crafts: the ceramics\u2019 arc (the clay-and-fire division — the bisque-and-glaze arc cross-referenced from the chemistry shelf-and-materials register, the kiln honesty — the cone receipt fixed by drill, the glaze\u2019s-craft with the ash register named); the scale\u2019s register (the monumental honesty — the engineering cross-reference: the load honesty named with the armature\u2019s-consequence); the installation named at survey depth (the site\u2019s-honesty); and the public\u2019s register (the commission craft — the 1-percent named at survey depth, the fabrication\u2019s-division with the bid honesty named, the permanent honesty — the material\u2019s-choice receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Cone Receipt Fixed by Drill',
      'The Load Honesty Cross-Referenced',
      'The Site Honesty Named',
      'The Material\u2019s-Choice Receipt Named',
    ],
  },
]

export const sculpture: Book = {
  id: 'sculpture',
  title: 'Sculpture',
  subtitle: 'The solid\u2019s craft — clay, carving, construction and the cast\u2019s discipline',
  discipline: 'arts-music',
  level: 'Beginner → advanced practice (the studio register)',
  description: 'The sculpture\u2019s discipline: the volume\u2019s-thinking craft (the additive-and-subtractive division — the two-methods honesty fixed once, the mass-and-space register with the void honesty named); the clay-modeling craft (the armature\u2019s honesty — the core receipt, the solid\u2019s-against-hollow division, the slab-and-coil crafts named with the pinch receipt); the carving register (the subtractive discipline — the wood-and-stone division with the grain honesty named, the tools census — the chisel\u2019s register, the direct\u2019s-against-pointing division named); the construction-and-welding register (the metal craft — the fabrication\u2019s register with the weld honesty named, the found named at survey depth with the honesty priced straight); the molding-and-casting craft (the waste-and-reusable division — the mold census: the plaster-and-silicone division, the resin-and-register named, the lost-wax arc named at survey depth with the bronze receipt); the ceramics register (the clay-and-fire division — the bisque-and-glaze arc cross-referenced from the chemistry shelf-and-materials registers, the kiln honesty named); the scale-and-site register (the monumental honesty — the engineering cross-reference named, the installation register named at survey depth); and the public\u2019s register (the commission craft — the 1-percent named at survey depth, the fabrication\u2019s-division named with the bid honesty).',
  status: 'planned',
  accent: ['#57534e', '#292524'],
  chapters,
}
