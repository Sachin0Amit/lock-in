import type { Book, Chapter } from '../../../types'

/**
 * 3D Modelling — the twenty-third book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `mesh-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): 3D Modelling owns the mesh register. The animation’s-craft to animation; the art’s-foundation to drawing (the form cross-reference); the lighting to photography; the PBR’s-physics to the physics shelf (cross-referenced at the light level); the game’s-pipeline to the CS shelf’s game books (cross-referenced); the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Blender-and-honest register named as the accessible pole with the software-agnostic honesty held.
 * - The Vaughan named as the topology co-pole.
 * - The CS shelf cross-referenced for the game-pipeline depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'space-coordinates',
    title: 'The Space-and-Coordinates Craft',
    summary:
      'The 3D\u2019s-mind: the three-axis honesty (the four-view receipt fixed by drill — the front\u2019s top-and-side division, the perspective named); the transform\u2019s census (the move\u2019s rotate-and-scale division with the pivot register named — the origin honesty); the coordinate\u2019s-craft (the local\u2019s-against-world division held straight — the parent register named); and the snap-and-register named (the grid honesty — the precision receipt).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four-View Receipt Fixed by Drill',
      'The Origin Honesty Named',
      'The Local-World Division Held Straight',
      'The Precision Receipt Named',
    ],
  },
  {
    number: 2,
    slug: 'topology-mesh',
    title: 'The Topology-and-Mesh Craft',
    summary:
      'The surface\u2019s-arithmetic: the vert-edge-face division fixed by drill (the tri census named); the quad\u2019s honesty (the against-tri division priced straight — the subdivision consequence named: the smooth named, the pole register named — the avoidance craft: the edge\u2019s-flow honesty); the wireframe register (the density craft — the budget honesty named); and the NGON named at survey depth (the avoid receipt — the render\u2019s-consequence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Subdivision Consequence Named',
      'The Edge\u2019s-Flow Honesty Held',
      'The Budget Honesty Named',
      'The Avoid Receipt Named',
    ],
  },
  {
    number: 3,
    slug: 'polygon-methods',
    title: 'The Polygon-Modelling Methods',
    summary:
      'The building\u2019s-crafts: the box\u2019s-method (the blockout division — the proportion named: the silhouette cross-reference from illustration); the extrude\u2019s craft (the inset named with the combine named); the bevel\u2019s honesty (the why named — the highlight receipt: the catch named, the bevel\u2019s-against-softedge division held); the loop named (the ring craft — the support honesty named: the edge\u2019s-weight receipt); and the boolean named at survey depth (the honesty — the cleanup consequence named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Silhouette Cross-Reference Named',
      'The Highlight Receipt Named',
      'The Edge\u2019s-Weight Receipt Named',
      'The Cleanup Consequence Named',
    ],
  },
  {
    number: 4,
    slug: 'sculpting-retopology',
    title: 'The Sculpting-and-Retopology Arc',
    summary:
      'The clay\u2019s-3D craft: the sculpting\u2019s register (the digital-clay — the Dynamesh named at survey depth, the brush census with the crease named, the mask named); the retopology\u2019s arc (the why named: the animation consequence cross-referenced from animation — the deform\u2019s-honesty, the flow\u2019s-craft — the muscle register named); and the bake named at survey depth (the transfer craft — the normal named with the why held: the cheat honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crease Named',
      'The Deform Honesty Cross-Referenced',
      'The Muscle Register Named',
      'The Cheat Honesty Held Straight',
    ],
  },
  {
    number: 5,
    slug: 'materials-lighting-pipeline',
    title: 'The Materials, Lighting-and-Pipeline Registers',
    summary:
      'The surface-and-light crafts: the materials\u2019 craft (the PBR honesty — the albedo-and-roughness division named, the mapping census — the UV register with the unwrap craft named, the seam honesty named); the lighting\u2019s craft (the three-point cross-reference from photography — the key-and-fill division, the render\u2019s-arc: the triangle honesty — the speed\u2019s-against-quality division with the noise named, the sample named at survey depth); and the pipeline\u2019s register (the game-and-film division with the budget honesty — the poly named: the count receipt, the 3D-print named at survey depth with the water-tight honesty, the export census with the format honesty named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Albedo-Roughness Division Named',
      'The Seam Honesty Named',
      'The Count Receipt Named',
      'The Water-Tight Honesty Named',
    ],
  },
]

export const threeDModelling: Book = {
  id: '3d-modelling',
  title: '3D Modelling',
  subtitle: 'The mesh\u2019s craft — topology, modelling methods, materials and the render pipeline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the polygon register)',
  description: 'The 3D\u2019s discipline: the space-and-coordinate craft (the three-axis honesty with the viewport\u2019s-census — the four-view receipt fixed by drill, the pivot register named, the transform census — the move\u2019s rotate-and-scale division); the mesh\u2019s-topology craft (the vert\u2019s edge-and-face division fixed by drill, the quad\u2019s-against-tri honesty priced straight — the subdivision consequence named, the pole register named — the avoidance craft); the polygon\u2019s-modelling methods (the box\u2019s-against-blockout division, the extrude\u2019s-craft with the inset named, the bevel honesty — the why named: the highlight receipt, the loop named — the ring craft); the sculpting\u2019s craft (the digital-clay register — the Dynamesh named at survey depth, the brush census with the crease named, the retopology arc — the why named: the animation consequence cross-referenced from animation); the materials-and-shading craft (the PBR honesty — the albedo-and-roughness division named, the mapping\u2019s-census — the UV register with the unwrap craft named, the normal named at survey depth — the why named: the cheat honesty); the lighting-and-rendering craft (the three-point cross-reference from photography — the key named, the render\u2019s-arc: the triangle honesty — the speed\u2019s-against-quality division, the noise named); the hard-surface\u2019s-against-organic division (the two-crafts honesty — the each-receipt named); and the pipeline\u2019s register (the game-and-film division with the each-consequence — the budget honesty named, the 3D-print named at survey depth, the export census with the format honesty named).',
  status: 'planned',
  accent: ['#14b8a6', '#134e4a'],
  chapters,
}
