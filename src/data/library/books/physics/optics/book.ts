import type { Book, Chapter } from '../../../types'

/**
 * Optics — the eighth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 70 planned lessons, zero written. Lesson ids will use the `opt-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Optics owns the light register (JEE/NEET Ray and Wave Optics units; GATE PH wave optics register). The electromagnetic-theory book owns the Maxwell-wave mathematics (Fresnel coefficients derived field-side); modern-physics owns the photon’s particle-side; the atomic-physics book owns laser physics at population-depth; this book prices each honestly with cross-references.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The JEE Main 2026 and NEET 2026 syllabi (read this pass — the Ray Optics and Wave Optics units) as the school-competitive spine.
 * - Hecht, Optics (the canonical arc named — ray, wave and modern optics' standard course structure) as the university pole.
 * - The boards' practical register (focal lengths by UV method, refractive index by the prism minimum-deviation and the travelling-microscope craft) priced as the closing chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'ray-foundations',
    title: 'Ray Optics: Foundations',
    summary:
      'Reflection at plane and spherical mirrors with the sign-convention discipline made honest; mirror formulas derived by the small-angle craft; refraction with Snell\u2019s law and the critical-angle register; and total internal reflection\u2019s honest applications.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Sign Conventions',
      'Mirror Formulas Derived',
      'Snell and the Critical Angle',
      'TIR Applications',
    
      'Geometric Optics',
      'Image Formation from Plain Mirror',
      'Photon Counts Emitted by a Source per Second',
      'Production of X-Rays (Coolidge\'s Tube)',
      'Photons Have Momentum',
      'X Rays and the Ordering of the Elements',
      'BIO Horses on a Curved Path 70 BIO Transparency and Index of Refraction',
      'BIO Jet Propulsion in Squids 257 Smartphones, Capacitors, and Dielectrics 800 BIO X-Ray Absorption and Medical Imaging',
      'Rotation of Rigid Bodies 272 34 Geometric Optics',
      'Summary 942 OPTICS',
      'Light Emitted as Photons: X-Ray Production 1259 Dimensions',
      'Geometrical Optics 662 In Perspective: Marie Curie',
      '24–2 Spherical Mirrors 665 Appendix A Review of Mathematics'
    ],
  },
  {
    number: 2,
    slug: 'lenses-and-systems',
    title: 'Lenses and Optical Systems',
    summary:
      'Thin-lens formulas and the lens-maker\u2019s equation; power and dioptres; combination arithmetic with the equivalent-lens craft; thick lenses and principal planes named gently; and the two-lens systems the competitive register rewards.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lens-Maker\u2019s Equation',
      'Combination Arithmetic',
      'Principal Planes',
      'Two-Lens Systems',
      'Linear Magnification Produced by a Lens',
      'Lenses with Different Media on Either Side',
      'Mutual Inductance 988 34.4 Thin Lenses',
      '24–3 Lenses 676 A–1 Basic Operations'
    ],
  },
  {
    number: 3,
    slug: 'prisms-and-dispersion',
    title: 'Prisms and Dispersion',
    summary:
      'The prism\u2019s geometry with minimum deviation derived; refraction through the prism read by the angle craft; dispersion — angular dispersion and dispersive power; the rainbow\u2019s honest physics; and chromatic aberration named for the instrument chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Minimum Deviation Derived',
      'The Prism\u2019s Geometry',
      'Dispersive Power',
      'The Rainbow\u2019s Physics',
    ],
  },
  {
    number: 4,
    slug: 'optical-instruments',
    title: 'Optical Instruments',
    summary:
      'The compound microscope and astronomical telescope with their magnification arithmetic; the human eye\u2019s accommodation and defects corrected by lenses; resolving-power previews for the diffraction chapter; and the modern instrument register — the camera and the spectrometer named honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Microscope and Telescope',
      'The Eye Corrected',
      'Resolving Previewed',
      'Camera and Spectrometer',
      'Photometry: The Luminous Intensity Ledger',
      'Fresnel and Fraunhofer Diffractions',
      'DIFFRACTION 1185 DNA',
      'Fresnel and Fraunhofer Diffraction',
      '25–3 The Microscope 713 A–6 Trigonometry',
      '26–3 Diffraction 741 Appendix D Selected Isotopes'
    ],
  },
  {
    number: 5,
    slug: 'wave-nature-foundations',
    title: 'The Wave Nature of Light',
    summary:
      'Huygens\u2019 construction as the wave\u2019s geometry engine; the wavefront craft — plane, spherical; coherence introduced honestly as the experiment\u2019s permitting condition; and the wave model\u2019s account of rectilinear propagation read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Huygens\u2019 Construction',
      'Wavefronts Read',
      'Coherence Introduced',
      'The Wave\u2019s Honesty',
      '38-3 PHOTONS, MOMENTUM, COMPTON SCATTERING, LIGHT'
    ],
  },
  {
    number: 6,
    slug: 'interference',
    title: 'Interference',
    summary:
      'Young\u2019s double-slit with fringe geometry derived — bright and dark conditions, fringe width; intensity distribution read; thin-film interference with the phase-change-on-reflection discipline; Newton\u2019s rings as the classic; and the Lloyd\u2019s-mirror register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Young\u2019s Geometry Derived',
      'The Intensity Ledger',
      'Thin Films and Newton\u2019s Rings',
      'Lloyd\u2019s Mirror',
      'Double Differentiation',
      'Maximum Order of Interference Fringes',
      'Shape of Interference Fringes in YDSE',
      '35-3 INTERFERENCE AND DOUBLE-SLIT INTENSITY 1059 Some Consequences of the Lorentz Equations',
      'Multiple Slits'
    ],
  },
  {
    number: 7,
    slug: 'diffraction',
    title: 'Diffraction',
    summary:
      'The single-slit minimum derived with the intensity curve read; the double-slit\u2019s interference-diffraction marriage; the grating with its resolving power derived; and Rayleigh\u2019s criterion applied to the eye, telescope and grating — the instrument chapter\u2019s promise kept.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Single-Slit Derived',
      'The Marriage Read',
      'Gratings and Resolving Power',
      'Rayleigh\u2019s Criterion',
    ],
  },
  {
    number: 8,
    slug: 'polarisation',
    title: 'Polarisation',
    summary:
      'The transverse proof in polarisation; Malus\u2019s law derived and applied; Brewster\u2019s angle from the reflection side; double refraction with the ordinary-extraordinary story and Nicol-named devices; and optical activity as sugar\u2019s honest physics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Malus Derived',
      'Brewster Again',
      'Double Refraction',
      'Optical Activity',
      'Polaroids and the Plane of Polarisation',
    ],
  },
  {
    number: 9,
    slug: 'laser-and-fibre',
    title: 'Laser and Fibre Optics',
    summary:
      'The stimulated-emission idea previewed honestly from the atomic book; the laser\u2019s coherence and directionality registers; holography named as the interference archive; and the optical fibre\u2019s TIR core-and-clad arithmetic with the numerical-aperture craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Stimulated Emission Previewed',
      'Laser Registers',
      'Holography Named',
      'Fibre Arithmetic',
    ],
  },
  {
    number: 10,
    slug: 'optics-practicals',
    title: 'The Optics Laboratory',
    summary:
      'The boards\u2019 practical register consolidated: focal length by UV-method and displacement-method; refractive index of the prism and of the liquid by the travelling microscope; the grating\u2019s wavelength measurement; and the error arithmetic each demands — the experimental book\u2019s cross-reference.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Focal-Length Practicals',
      'Refractive-Index Craft',
      'The Grating Measurement',
      'Error Arithmetic',
      'Graphical Method for Determining Focal Length of a Convex Lens',
      'Author Index'
    ],
  },
]

export const optics: Book = {
  id: 'optics',
  title: 'Optics',
  subtitle: 'Rays, waves and the photon: the full optics course from mirrors and lenses to diffraction and polarisation',
  discipline: 'physics',
  level: 'Class 11-12 + competitive → university doorway',
  description: 'The light book in full: the ray register — reflection, refraction, lenses, prisms and instruments; the wave register — Huygens, interference, thin films, diffraction and resolving power; polarisation; the laser-and-fibre modern register; and the practical craft the boards demand.',
  status: 'planned',
  accent: ['#e879f9', '#701a75'],
  chapters,
}
