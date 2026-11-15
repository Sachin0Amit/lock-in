import type { Book, Chapter } from '../../../types'

/**
 * Computer Graphics — the twelfth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `gfx-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the linear algebra (matrices,
 * transformations) belongs to the Mathematics shelf's Linear Algebra
 * (cross-referenced, used not re-taught); Computer Vision takes the
 * inverse problem (pixels → world). Parallel Computing owns the GPU as
 * hardware; this book owns it as a rendering engine.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no graphics reference on
 *   the Drive (honest note).
 * - Web-checked 2026-11-15: Hearn & Baker, 'Computer Graphics (C
 *   Version)' 2e (the classic output-primitives/transformations/viewing
 *   arc) + Marschner & Shirley, 'Fundamentals of Computer Graphics' 4e
 *   (O'Reilly contents: ray tracing before raster — the modern
 *   pedagogy; the pipeline, sampling theory, spatial structures,
 *   splines). Two poles.
 * - Syllabus audit: the standard university graphics course arcs.
 * - Exam types: university problem sets (matrix compositions, clipping,
 *   visibility) + pipeline tracing.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-graphics-promises',
    title: 'What Graphics Promises',
    summary:
      'The field\u2019s honest contract: synthesizing images from descriptions (the applications census — design, games, film, visualization), the APIs\u2019 story (the immediate/retained-mode split), the model of image formation (the camera as equations — the pinhole priced), and the book\u2019s two-method map: ray tracing and rasterization.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Contract: Descriptions to Images',
      'The Camera as Equations',
      'The Two-Method Map',
    ],
  },
  {
    number: 2,
    slug: 'the-mathematical-camera-bag',
    title: 'The Mathematical Camera Bag',
    summary:
      'The graphics toolkit owned honestly (Linear Algebra cross-referenced, used fluently): vectors\u2019 dot/cross products as the lighting and orientation tools, the transformation matrices (translation, rotation, scaling, the homogeneous trick that unifies them), and the composition discipline — building the model/view/projection stack.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Vectors as Lighting and Orientation Tools',
      'The Homogeneous Trick',
      'The Transformation Stack Composed',
    ],
  },
  {
    number: 3,
    slug: 'ray-tracing-first',
    title: 'Ray Tracing First',
    summary:
      'The modern pedagogy\u2019s entry (Shirley\u2019s): the ray model of light, ray-scene intersections computed (sphere, plane, triangle — each derived), the recursive Whitted discipline (reflection and refraction recursed with its cost honesty), and shading\u2019s first model (the Lambertian and Blinn-Phong census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ray Model and Intersections Derived',
      'Recursion: Whitted Tracing',
      'The First Shading Census',
    ],
  },
  {
    number: 4,
    slug: 'the-raster-pipeline',
    title: 'The Raster Pipeline',
    summary:
      'The industry\u2019s engine: vertex processing and the viewport/clipping discipline, triangle rasterization (edge functions and the coverage question), the depth buffer as visibility\u2019s honest answer, and the fragment stage — shading interpolated by the barycentric discipline.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Viewport and Clipping Discipline',
      'Rasterizing Triangles',
      'The Depth Buffer\u2019s Honest Visibility',
    ],
  },
  {
    number: 5,
    slug: 'light-and-material',
    title: 'Light and Material',
    summary:
      'The appearance question: the BRDF as the honest material contract, direct lighting\u2019s census (ambient, diffuse, specular composed), shadows as the visibility of lights (the shadow-map discipline), and textures as the detail multiplier — sampling theory\u2019s aliasing disease named with its cures.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The BRDF as Contract',
      'Shadows and Their Maps',
      'Textures and the Aliasing Disease',
    ],
  },
  {
    number: 6,
    slug: 'curves-and-surfaces',
    title: 'Curves and Surfaces',
    summary:
      'The geometry of smoothness: Bezier curves and the de Casteljau construction (each derived and drawn), the spline census (B-splines named with their local control), subdivision surfaces named, and the mesh census — how real objects are stored (the half-edge echo).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bezier and de Casteljau, Derived',
      'The Spline Census',
      'Subdivision and the Mesh Census',
    ],
  },
  {
    number: 7,
    slug: 'acceleration-structures',
    title: 'Acceleration Structures',
    summary:
      'Why speed is structure: the ray\u2019s cost problem priced (the naive count), the spatial census (grids, octrees, BVH with the traversal discipline), and the culling echo — frustum and occlusion as visibility\u2019s accelerations.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ray\u2019s Cost Problem',
      'The BVH Traversal Discipline',
      'Culling as Acceleration',
    ],
  },
  {
    number: 8,
    slug: 'the-modern-gpu',
    title: 'The Modern GPU',
    summary:
      'The rendering engine as machine: the graphics pipeline mapped onto the GPU\u2019s reality (the SIMT census — Parallel Computing cross-referenced for the hardware), the shader family\u2019s stages written honestly, and the modern real-time census — deferred shading and the ray-tracing hybrid echo.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Pipeline on the GPU',
      'The Shader Family',
      'Deferred and Hybrid: the Modern Census',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The image on one page (description → geometry → raster/light → pixels with the contracts beside), the craft census (matrix compositions, intersection arithmetic, sampling questions at exam level), and the doorsteps — Computer Vision takes the inverse problem, Parallel Computing the machine\u2019s core.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Image on One Page',
      'The Craft Census',
      'The Doorsteps: the Inverse Problem and the Machine',
    ],
  },
]

export const computerGraphics: Book = {
  id: 'computer-graphics',
  title: 'Computer Graphics',
  subtitle: 'Descriptions to images — the rendering craft from ray to raster',
  discipline: 'computer-science',
  level: 'First graphics course → the real-time rendering doorstep',
  description:
    'The two-pole graphics home (Hearn-Baker\u2019s classical arc, Shirley-Marschner\u2019s ray-tracing-first modern pedagogy). The field\u2019s contract and the camera as equations; the mathematical camera bag — transformation matrices and the homogeneous trick with the model/view/projection stack (Linear Algebra cross-referenced); ray tracing first — intersections derived, Whitted recursion, the first shading census; the raster pipeline — clipping, triangle rasterization, the depth buffer\u2019s honest visibility; light and material — the BRDF contract, shadows, textures with the aliasing disease; curves and surfaces — Bezier derived, the spline census; acceleration structures — the BVH discipline; and the modern GPU with its shader family and the deferred/hybrid census. Hands off to Computer Vision (the inverse problem) and Parallel Computing (the machine\u2019s core).',
  status: 'planned',
  accent: ['#db2777', '#9d174d'],
  chapters,
}
