import type { Book, Chapter } from '../../../types'

/**
 * Particle Physics — the seventeenth book of the Physics shelf.
 *
 * STATUS: PLANNED (Physics full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 39 planned lessons, zero written. Lesson ids will use the `part-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Particle Physics owns the subnuclear register. Nuclear-physics owns the nuclear scale; quantum-mechanics owns the formalism; relativity owns the kinematics — the cross-references told honestly. The mathematics shelf’s abstract-algebra book is cross-referenced for the group-theory grammar.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Griffiths, Introduction to Elementary Particles (the canonical arc named) as the shelf's spine; Martin & Shaw, Particle Physics named as the leaner pole.
 * - The CSIR NET Physical Sciences syllabus (read this pass — the nuclear-and-particle section pricing the research expectation).
 * - The GATE PH register's nuclear section (read this pass) cross-referenced as the neighbour scale.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'standard-model-census',
    title: 'The Standard Model Census',
    summary:
      'The particle families inventoried: the quark generations with their flavours; the leptons and the neutrino register; the force carriers and the Higgs name; the quantum-number ledger — charge, spin, colour; and the model\u2019s honesty about what it does not say.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Families Inventoried',
      'The Neutrino Register',
      'The Carrier Census',
      'The Model\u2019s Honesty',
      'Four Quadrants and Sign Conventions',
      'Displacement of a Particle in nth Second of its',
      'Note: The remaining pages supplied are chapter body pages (p. 1.1 System of Particles and Centre of Mass; p. 1.2 Illustrations 1.1–1.2; p. 1.3 Centre of Mass of a Uniform Rod / Semicircular Ring / Semicircular Disc; p. 1.4 Illustrations 1.3–1.4; p. 1.5 Illustrations 1.5–1.6 and Concept Application',
      'Structural Model For Electrical Conductor',
      'De-Broglie Wavelength Associated with Different Charged Particles',
      'BIO Young’s Modulus of a Tendon 346 BIO Spiny Lobsters and Magnetic Particles in a Polymer “Box” '
    ],
  },
  {
    number: 2,
    slug: 'symmetries-and-conservation',
    title: 'Symmetries and Conservation Laws',
    summary:
      'The symmetry-conservation grammar told with Noether inherited from the mechanics register; the discrete symmetries — parity, charge conjugation, time reversal; the CPT theorem named; and the isospin and flavour names that classify the families.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Grammar Told',
      'The Discrete Trio',
      'CPT Named',
      'Isospin and Flavour',
    ],
  },
  {
    number: 3,
    slug: 'feynman-and-interactions',
    title: 'The Interactions by Diagram',
    summary:
      'The Feynman diagram as the interaction\u2019s ledger read; QED as the precision benchmark — the g-factor honesty; QCD with colour confinement named; the weak interaction\u2019s Fermi theory and its V-A dress; and cross-section arithmetic worked at the pole register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Diagram Ledger',
      'QED\u2019s Benchmark',
      'QCD and Confinement',
      'The Weak V-A Dress',
    ],
  },
  {
    number: 4,
    slug: 'hadrons-and-quark-model',
    title: 'Hadrons and the Quark Model',
    summary:
      'The meson and baryon census by the quark composition arithmetic; the Eightfold Way named as the classification\u2019s history; the colour charge as the statistics rescue; asymptotic freedom and the confinement complement told; and the heavy-quarkonium register priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Composition Census',
      'The Eightfold Way',
      'Colour as Rescue',
      'Quarkonium Register',
    ],
  },
  {
    number: 5,
    slug: 'weak-and-unification',
    title: 'The Weak Interaction and Unification',
    summary:
      'The parity violation told as the Wu experiment\u2019s register; the CP violation named with the kaon honesty; the electroweak unification with the SU-two-U-one) name and the Higgs mechanism as the mass-giver; and the GUT register told as the honest doorway.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Parity Violated',
      'CP and the Kaon',
      'The Higgs Mass-Giver',
      'The GUT Doorway',
    ],
  },
  {
    number: 6,
    slug: 'accelerator-laboratory',
    title: 'The Accelerator Laboratory',
    summary:
      'The collider craft with the luminosity ledger; the detector\u2019s layered census — vertex, tracking, calorimetry, muon; the trigger discipline told; CERN\u2019s LHC named as the register\u2019s flagship; and the data-analysis inheritance from the experimental book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Collider Craft',
      'The Layered Census',
      'The Trigger Discipline',
      'The Flagship Named',
    ],
  },
  {
    number: 7,
    slug: 'beyond-the-model',
    title: 'Beyond the Model',
    summary:
      'The neutrino-mass register as the model\u2019s first honest crack; the dark-matter and dark-energy inventory told as the cosmology book\u2019s shared debts; the flavour anomalies named carefully as open; and the candidate theories — supersymmetry, string theory — told as named doorways, honestly not as established physics.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Neutrino Crack',
      'The Shared Debts',
      'The Named Anomalies',
      'The Candidate Doorways',
      '(Note: this is a physics text, not a mathematics reference. Only the first four scanned pages contain the table of contents; the remaining pages are chapter content, not TOC entries.)'
    ],
  },
  {
    number: 8,
    slug: 'particle-doorway',
    title: 'The Particle Doorway',
    summary:
      'The book\u2019s consolidation: the quantum-field-theory name explained as the language the research register demands; the renormalisation idea told gently; the calculation register previewed; and the open-questions map honestly drawn for the reader heading to the literature.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The QFT Language',
      'Renormalisation Told Gently',
      'The Calculation Register',
      'The Open-Questions Map',
    ],
  },
]

export const particlePhysics: Book = {
  id: 'particle-physics',
  title: 'Particle Physics',
  subtitle: 'The subnuclear census: quarks, leptons and the four interactions — the Standard Model honestly read',
  discipline: 'physics',
  level: 'University (PG register) + CSIR NET / research doorway',
  description: 'The particle register: the Standard Model\u2019s census of quarks, leptons and bosons; the symmetries and conservation laws as the grammar; the four interactions read by Feynman diagrams; the hadron classification by the quark model; the weak interaction\u2019s parity story and unification with the Higgs name; the accelerator-laboratory; and the beyond-the-model registers. Cross-references nuclear-physics (the sub-nuclear ground) and modern-physics; hands off honestly.',
  status: 'planned',
  accent: ['#f59e0b', '#713f12'],
  chapters,
}
