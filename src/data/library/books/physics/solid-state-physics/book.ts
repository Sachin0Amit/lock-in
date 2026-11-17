import type { Book, Chapter } from '../../../types'

/**
 * Solid-State Physics — the thirteenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 50 planned lessons, zero written. Lesson ids will use the `ssp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Solid-State Physics owns the condensed-matter register (GATE PH Condensed Matter Physics section read this pass). Modern-physics owns the device first-pass; the engineering shelf’s materials-science and vlsi books own the applied materials and device-engineering registers; the chemistry shelf’s physical-chemistry register is cross-referenced as the sibling view.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The GATE PH 2026 syllabus (read this pass — the Condensed Matter Physics register: crystals, phonons, free electrons, band theory, superconductivity) as the university spine.
 * - Kittel, Introduction to Solid State Physics (the canonical arc named — the shelf's movement from the lattice to the electrons) and Ashcroft & Mermin named as the deeper pole.
 * - The CSIR NET syllabus (read this pass) for the research-side expectation.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'crystal-structure',
    title: 'Crystal Structure',
    summary:
      'The lattice-plus-basis idea; the seven systems and fourteen Bravais lattices; the cubic-family census — simple, bcc, fcc, diamond — with packing fractions computed; Miller indices as the plane\u2019s address; and the symmetry-register told with the point-group idea named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lattice Plus Basis',
      'The Bravais Census',
      'Miller\u2019s Address',
      'Symmetry Named',
      'The Structure of Matter: From Atoms to Solids',
    ],
  },
  {
    number: 2,
    slug: 'reciprocal-and-diffraction',
    title: 'The Reciprocal Lattice and Diffraction',
    summary:
      'The reciprocal lattice built as the Fourier idea; Bragg\u2019s law derived and the Laue method\u2019s honesty; the structure factor with the extinction register; and the powder and single-crystal determination craft — the experimental book\u2019s cross-reference.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Reciprocal Built',
      'Bragg and Laue',
      'Structure Factors',
      'Determination Craft',
    ],
  },
  {
    number: 3,
    slug: 'phonons',
    title: 'Lattice Vibrations and Phonons',
    summary:
      'The monatomic and diatomic chains with the dispersion curves read; acoustic against optical branches; the phonon census; the Einstein and Debye specific-heat models with their low-temperature honesty; and thermal conductivity told as the phonon transport register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chain Dispersion',
      'Branches Census',
      'Einstein and Debye',
      'Phonon Transport',
    ],
  },
  {
    number: 4,
    slug: 'free-electron-model',
    title: 'The Free-Electron Model',
    summary:
      'Drude\u2019s classical gas with its successes and failures told honestly; the Sommerfeld correction — the Fermi-Dirac occupation; the Fermi energy and surface arithmetic; the Hall effect as the carrier census; and the specific-heat honesty that classical theory could not give.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Drude\u2019s Ledger',
      'Sommerfeld\u2019s Correction',
      'Fermi Arithmetic',
      'The Hall Census',
    ],
  },
  {
    number: 5,
    slug: 'band-theory',
    title: 'The Band Theory of Solids',
    summary:
      'The Bloch theorem as the periodic-grammar; the Kronig-Penney model solved as the band-gap seed; conductors, semiconductors and insulators classified by the band picture; effective mass introduced; and the Fermi-surface register named for the metals.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Bloch Theorem',
      'Kronig-Penney Solved',
      'The Classification',
      'Effective Mass',
    ],
  },
  {
    number: 6,
    slug: 'semiconductors-deep',
    title: 'Semiconductors at Carrier Depth',
    summary:
      'Intrinsic and extrinsic carriers with the mass-action law; the Fermi level\u2019s doping arithmetic; drift and diffusion with the Einstein relation; the p-n junction re-read from the band side; and the optical-absorption edge named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mass-Action Law',
      'Fermi-Level Arithmetic',
      'Drift and Diffusion',
      'The Band-Side Junction',
    ],
  },
  {
    number: 7,
    slug: 'dielectrics-and-ferroelectrics',
    title: 'Dielectrics and Ferroelectrics',
    summary:
      'The dielectric function and the polarisation register; the local field and the Clausius-Mossotti relation named; ferroelectricity with the BaTiO3 register told; and the piezoelectricity engineering cross-reference priced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Dielectric Function',
      'Clausius-Mossotti',
      'Ferroelectric Register',
      'Piezo Cross-Reference',
    ],
  },
  {
    number: 8,
    slug: 'magnetism-and-superconductivity',
    title: 'Magnetism and Superconductivity',
    summary:
      'The magnetic-susceptibility census of solids — dia, para, ferro, antiferro; domains and the Curie-Weiss law; superconductivity — the Meissner effect, the critical-field ledger, the BCS pairing picture named, flux quantisation and the Josephson register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Susceptibility Census',
      'Domains and Curie-Weiss',
      'Meissner and BCS Named',
      'Josephson Registers',
    ],
  },
  {
    number: 9,
    slug: 'low-dimensional-register',
    title: 'The Low-Dimensional Register',
    summary:
      'The modern doorway: surfaces and the STM idea; the two-dimensional materials register — graphene named with its band honesty; quantum dots and wells as the engineered gap; the nanomaterials characterisation craft; and the research doorstep honestly marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Surfaces and STM',
      'The 2D Register',
      'Wells, Wires and Dots',
      'The Research Doorstep',
    ],
  },
]

export const solidStatePhysics: Book = {
  id: 'solid-state-physics',
  title: 'Solid-State Physics',
  subtitle: 'Crystals, phonons, electrons and bands: the condensed-matter register from lattice diffraction to superconductivity',
  discipline: 'physics',
  level: 'University (UG → PG) + GATE PH / CSIR NET',
  description: 'The condensed-matter register: crystal structure with the reciprocal lattice and diffraction determination, lattice vibrations and the phonon census with the specific-heat models, the free-electron gas and band theory of solids, semiconductors at carrier depth, dielectrics and magnetism, superconductivity, and the low-dimensional modern register.',
  status: 'planned',
  accent: ['#94a3b8', '#334155'],
  chapters,
}
