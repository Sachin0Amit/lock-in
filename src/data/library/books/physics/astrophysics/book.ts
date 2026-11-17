import type { Book, Chapter } from '../../../types'

/**
 * Astrophysics — the sixteenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 38 planned lessons, zero written. Lesson ids will use the `astro-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Astrophysics owns the astronomical register. The mechanics book owns gravitation-theory; relativity owns the cosmological-metric side; nuclear-physics owns the fusion microphysics; statistical-mechanics owns the degeneracy arithmetic — the cross-references are told honestly at each borrowing.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Carroll & Ostlie, An Introduction to Modern Astrophysics (the canonical arc named — the two-part stellar-then-galactic structure this plan follows) as the shelf's spine.
 * - The GATE PH syllabus's absence of a dedicated astrophysics section priced honestly: the book serves the university-and-research register instead.
 * - The JEE/NEET registers' gravitation and optics units (read this pass) cross-referenced as the school-side doors into this book.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'celestial-sphere-and-observation',
    title: 'The Celestial Sphere and the Observation Craft',
    summary:
      'The sky\u2019s coordinate ledger — altitude-azimuth and equatorial with the hour-angle arithmetic; magnitudes and the distance-modulus; telescopes\u2019 resolving and collecting arithmetic with the optics book cross-referenced; and the atmosphere\u2019s window register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Coordinate Ledger',
      'Magnitudes and Modulus',
      'Telescope Arithmetic',
      'The Window Register',
    
      'Inquiry 2: Collecting and processing data',
      'Fractional Change in the Radius of Sphere',
      'BIO Exhaling Adiabatically  630 the Sky'
    ],
  },
  {
    number: 2,
    slug: 'stellar-radiation-and-hr',
    title: 'Stellar Radiation and the HR Diagram',
    summary:
      'Blackbody radiation as the stellar approximation with the deviations told; luminosity, radius and effective temperature tied by Stefan\u2019s law; the spectral-classification census OBAFGKM; and the HR diagram read as the book\u2019s master map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Blackbodies Approximated',
      'The L-R-T Tie',
      'The OBAFGKM Census',
      'The Master Map',
      'Radius of Curvature',
      'Radius of Gyration'
    ],
  },
  {
    number: 3,
    slug: 'stellar-structure',
    title: 'Stellar Structure',
    summary:
      'Hydrostatic equilibrium as the stellar constitution; the virial theorem worked as the ledger; energy transport by radiation, convection and conduction told; the Standard Solar Model named; and the solar-neutrino story told with its honesty.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Hydrostatic Constitution',
      'The Virial Ledger',
      'Transport Told',
      'Neutrino Honesty',
    ],
  },
  {
    number: 4,
    slug: 'stellar-evolution',
    title: 'Stellar Evolution',
    summary:
      'The protostar-to-main-sequence path by the Hayashi honesty; the main-sequence lifetime arithmetic by the mass-luminosity relation; the giant branch with degenerate-helium honesty; heavy-mass burning to iron as the limit; and the remnant census — white dwarf, neutron star, black hole.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Protostar Path',
      'Main-Sequence Arithmetic',
      'Giants and Degeneracy',
      'The Remnant Census',
    ],
  },
  {
    number: 5,
    slug: 'milky-way-and-galaxies',
    title: 'The Milky Way and the Galaxy Census',
    summary:
      'The Galaxy\u2019s structure mapped — disk, bulge, halo with the globular register; rotation curves read as the dark-matter evidence, told honestly as the open inventory; the galaxy census — spiral, elliptical, irregular; and active galaxies with the quasar register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Galactic Map',
      'Rotation and Dark Matter',
      'The Galaxy Census',
      'Active Registers',
    ],
  },
  {
    number: 6,
    slug: 'cosmology-foundations',
    title: 'Cosmology Foundations',
    summary:
      'The distance ladder built honestly rung by rung; Hubble\u2019s law with the redshift arithmetic; the FRW metric inherited from the relativity book; the thermal history with the CMB register; and the concordance model named with its inventory told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Distance Ladder',
      'Hubble\u2019s Ledger',
      'The FRW Inherited',
      'The Thermal History',
    ],
  },
  {
    number: 7,
    slug: 'planetary-and-exoplanets',
    title: 'The Planetary Register',
    summary:
      'The solar system\u2019s formation by the nebular hypothesis; the planets\u2019 comparative census with the atmosphere stories; Kepler\u2019s laws inherited from the mechanics register; and the exoplanet-detection craft — transit, radial velocity, microlensing named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nebular Hypothesis',
      'The Comparative Census',
      'Kepler Inherited',
      'The Detection Craft',
      'Celestial Mechanics: Two-Body Orbits',
    ],
  },
  {
    number: 8,
    slug: 'astrophysical-tools-and-doorway',
    title: 'The Tools and the Doorway',
    summary:
      'The multi-messenger register — radio, X-ray, gamma and the gravitational-wave inheritance; the satellite-and-ground observatory census; the data-analysis craft with the statistics cross-reference; and the research doorway honestly marked with its open questions.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Multi-Messenger Register',
      'The Observatory Census',
      'The Data Craft',
      'The Open Questions',
    
      'Tool 2: Technology'
    ],
  },
]

export const astrophysics: Book = {
  id: 'astrophysics',
  title: 'Astrophysics',
  subtitle: 'Stars, galaxies and the universe: the astrophysical register from the HR diagram to the expanding cosmos',
  discipline: 'physics',
  level: 'University (UG → PG) + research doorway',
  description: 'The astrophysical register: the observation craft and the celestial sphere, stars observed and classified on the HR diagram, stellar structure and the nuclear burning ledger, evolution from protostar to remnant, the Milky Way and the galaxy census, cosmology foundations, and the planetary register with exoplanets.',
  status: 'planned',
  accent: ['#7dd3fc', '#0c4a6e'],
  chapters,
}
