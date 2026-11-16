import type { Book, Chapter } from '../../../types'

/**
 * Animation — the twenty-second book of the Arts-Music shelf (the visual register).
 *
 * STATUS: PLANNED (Arts-Music full-shelf planning pass, 2026-11-16) — 5 chapters /
 * 20 planned lessons, zero written. Lesson ids will use the `anim-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Animation owns the motion register. The drawing’s-foundation to drawing; the 3D’s-crafts to 3d-modelling; the timing’s-easing to the CS shelf’s HCI book (cross-referenced); the sound’s-craft to music-production; the film’s-language to film-studies; the graded registers are priced here.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The Williams Animator’s Survival Kit named as the pole (the timing register).
 * - The Thomas-and-Johnston’s Illusion of Life named as the principles co-pole.
 * - The CS shelf cross-referenced for the easing depth.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'principles-foundation',
    title: 'The Principles Foundation',
    summary:
      'The twelve\u2019s-census: the squash-and-stretch craft (the volume\u2019s-honesty — the conservation named, the arc register named — the natural\u2019s-path honesty); the anticipation-and-follow craft (the prepare-and-recover division — the throw receipt named); the slow-in-and-out division (the easing honesty cross-referenced from the CS shelf — the two named: the in-and-out register); the secondary\u2019s register (the overlap named with the drag named — the Williams cross-reference); and the appeal honesty named (the design receipt cross-referenced from illustration).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Conservation Named',
      'The Throw Receipt Named',
      'The Two Named',
      'The Overlap Named',
    ],
  },
  {
    number: 2,
    slug: 'timing-spacing',
    title: 'The Timing-and-Spacing Craft',
    summary:
      'The frame\u2019s arithmetic: the two\u2019s honesty (the spacing\u2019s-against-timing division held straight — the distance\u2019s craft: the between named, the chart\u2019s register with the in-and-out division named); the drawing\u2019s-timing register (the 24-and-12 named — the on-twos honesty priced straight, the ones named for the fast named); the weight\u2019s craft (the heavy receipt — the fewer named: the slow\u2019s-consequence named); and the moving\u2019s-hold named at survey depth (the alive honesty).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Distance\u2019s Craft Named',
      'The On-Twos Honesty Priced Straight',
      'The Heavy Receipt Named',
      'The Alive Honesty Named',
    ],
  },
  {
    number: 3,
    slug: 'keyframe-workflow',
    title: 'The Keyframe-and-Workflow Craft',
    summary:
      'The software-agnostic discipline: the keyframe\u2019s-craft (the key-and-breakdown division — the Williams structure: the pose named, the extreme named, the breakdown\u2019s-bridge honesty); the two-methods honesty (the pose-to-pose\u2019s-against-straight division priced straight — the planning\u2019s-consequence named: the planned\u2019s-economics receipt); the graph\u2019s-editor named at survey depth (the curve\u2019s-craft — the shape honesty named); and the camera\u2019s-craft named (the virtual register — the cross-reference from cinematography).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bridge Honesty Held',
      'The Planned\u2019s-Economics Receipt Held',
      'The Shape Honesty Named',
      'The Virtual Cross-Reference Named',
    ],
  },
  {
    number: 4,
    slug: 'twod-cutout-motion-graphics',
    title: 'The 2D, Cutout-and-Motion-Graphics Registers',
    summary:
      'The hand\u2019s puppet crafts: the frame-by-frame craft (the onion register — the sheet honesty with the exposure named, the loop craft — the eight-frame receipt named, the cleanup register named); the cutout\u2019s craft (the rig\u2019s-2D honesty — the puppet craft with the pin named, the replacement named — the mouth\u2019s-census); the motion-graphics register (the graphic\u2019s cross-reference from graphic-design — the title named: the craft\u2019s-cinema sibling); and the web named at survey depth (the UI animation cross-reference — the 60-receipt named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Eight-Frame Receipt Named',
      'The Mouth\u2019s Census Named',
      'The Cinema Sibling Named',
      'The 60-Receipt Named at Survey Depth',
    ],
  },
  {
    number: 5,
    slug: 'stopmotion-threed-production',
    title: 'The Stop-Motion, 3D-and-Production Pipeline',
    summary:
      'The other\u2019s-methods honesty: the stop-motion register (the replacement named with the clay craft cross-referenced from sculpture, the puppet named, the set named at survey depth — the miniature receipt); the 3D\u2019s animation (the mesh cross-reference — the rig\u2019s-3D craft with the bone-and-skin division named, the inverse\u2019s-against-forward division named, the facial named at survey depth); and the production\u2019s pipeline (the pre-and-production division — the storyboard\u2019s-craft with the animatic register named: the timing\u2019s-test receipt, the render\u2019s-arc cross-referenced from 3d-modelling, the post named — the sound\u2019s-cross-reference from production with the lip\u2019s-sync named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Miniature Receipt Named',
      'The Bone-and-Skin Division Named',
      'The Timing\u2019s-Test Receipt Held',
      'The Lip\u2019s Sync Named',
    ],
  },
]

export const animation: Book = {
  id: 'animation',
  title: 'Animation',
  subtitle: 'The motion\u2019s craft — the twelve principles, timing and the production pipeline',
  discipline: 'arts-music',
  level: 'Beginner → professional (the frame register)',
  description: 'The animation\u2019s discipline: the principles\u2019 foundation (the twelve\u2019s-census — the squash-and-stretch division with the arc register named, the anticipation-and-follow named, the slow\u2019s-against-fast division — the easing honesty cross-referenced from the CS shelf\u2019s HCI book, the secondary\u2019s register with the overlap named); the timing-and-spacing craft (the two\u2019s honesty — the spacing\u2019s-against-timing division held straight: the distance named, the chart\u2019s register with the in-and-out division named); the keyframe\u2019s software-agnostic workflow (the key-and-breakdown division — the pose-to-pose\u2019s-against-straight honesty priced straight with the planning\u2019s-consequence named, the graph\u2019s-editor named at survey depth); the 2D frame-by-frame craft (the onion register — the sheet honesty with the exposure named, the loop craft — the eight-frame receipt named); the cutout\u2019s motion-graphics register (the rig\u2019s-2D honesty — the puppet craft with the pin named, the motion\u2019s-design cross-reference from graphic-design); the stop-motion register (the replacement named with the clay craft cross-referenced from sculpture, the puppet named, the frame\u2019s-against-one honesty — the twelve named at survey depth); the 3D\u2019s animation (the mesh cross-reference — the rig\u2019s-3D craft with the bone-and-skin division named, the inverse\u2019s-against-forward division named); and the production\u2019s pipeline (the pre-and-production division — the storyboard\u2019s-craft with the animatic register named, the render\u2019s-arc cross-referenced from 3d-modelling, the post named — the sound\u2019s-cross-reference from production).',
  status: 'planned',
  accent: ['#f59e0b', '#78350f'],
  chapters,
}
