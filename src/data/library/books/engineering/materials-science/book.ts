import type { Book, Chapter } from '../../../types'

/**
 * Materials Science — the twelfth book of the Engineering shelf (Mechanical branch, shared by every branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `mats-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Materials Science owns the structure-property story for engineering materials. Strength of Materials owns the stress machinery (testing shared, honestly); Machine Design consumes its fatigue and heat-treatment census; Building Materials (civil) owns the construction-materials census (stone, brick, cement, timber) with the contract stated there; the future Chemistry shelf’s Materials line will route here (cross-reference when planned); the future Physics shelf’s Solid-State line owns the physics depth.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 ME Section 4, the 'Engineering Materials' line (ME_2026_Syllabus.pdf,
 *   extracted this pass): 'Structure and properties of engineering materials, phase
 *   diagrams, heat treatment, stress-strain diagrams for engineering materials' —
 *   the register this book owns for engineering.
 * - Callister & Rethwisch, Materials Science and Engineering: An Introduction 10e —
 *   the chapter arc web-checked this pass via the publisher TOC (Introduction; Atomic
 *   Structure and Interatomic Bonding; Structure of Crystalline Solids; Imperfections;
 *   Diffusion; Mechanical Properties; Dislocations and Strengthening; Failure; Phase
 *   Diagrams; Phase Transformations; Applications and Properties of Iron-Carbon
 *   alloys; Corrosion; materials families).
 * - Raghavan's Materials Science named as the Indian canonical pole; the future
 *   Chemistry shelf's 'Materials' backlog line recorded as a cross-reference.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-materials-worldview',
    title: 'The Materials Worldview',
    summary:
      'The structure-processing-property triangle as the discipline\u2019s one diagram; the classification census (metals, ceramics, polymers, composites) by bonding and behaviour; a historical honest note (Liberty Ship failures named as the fracture cautionary tale); and the material-selection vocabulary this book will cash at its close.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The One Triangle',
      'The Family Census by Bonding',
      'Selection Vocabulary Promised',
    
      'Materials Science — electrical engineering materials; crystal structure and defects; ceramic materials: structures, composites, processing and uses; insulating laminates for electronics; magnetic materials: basics, classification, ferrites, ferro/para-magnetic materials and components; nano'
    ],
  },
  {
    number: 2,
    slug: 'atomic-structure-and-bonding',
    title: 'Atomic Structure and Interatomic Bonding',
    summary:
      'The quantum honest note kept short (the future Physics shelf owns it); electronic structure and the periodic logic for bonding; ionic, covalent, metallic and secondary bonds priced for what they make the material do (stiffness, ductility, melting point); bond energy versus separation curves read as the modulus\u2019 origin; and the density arithmetic from atomic radii.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Bond Families Priced',
      'Bond Curves: the Modulus Earned',
      'Density Arithmetic',
    ],
  },
  {
    number: 3,
    slug: 'crystal-structures',
    title: 'Crystal Structures',
    summary:
      'Lattice, basis and unit cells; the simple, BCC, FCC and HCP structures with their packing factors and coordination numbers; single crystals versus polycrystalline materials and anisotropy; polymorphism (allotropy) priced on iron; X-ray diffraction and Bragg\u2019s law at engineering depth; and ceramic and polymer structural honesty (ionic ceramics, chain polymers) glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Structure Census and Packing',
      'Anisotropy and Allotropy',
      'Bragg\u2019s Law at Engineering Depth',
    
      'Electrical Materials — electrical engineering materials, crystal structures and defects, ceramic materials, insulating materials; magnetic materials: basics, properties and applications; ferrites, ferro-magnetic materials and components; basics of solid state physics, conductors;'
    ],
  },
  {
    number: 4,
    slug: 'imperfections',
    title: 'Imperfections in Solids',
    summary:
      'The honest actors: point defects (vacancies, interstitials, impurities — solid solutions by substitution and interstitial); dislocations (edge and screw, the Burgers vector) as the ductility engine; interfacial defects (grain boundaries, twin boundaries); bulk defects glanced; and the speciation arithmetic (composition conversions) the numerical census needs.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Point Defects and Solid Solutions',
      'Dislocations: the Ductility Engine',
      'Grain Boundaries and Faces',
    ],
  },
  {
    number: 5,
    slug: 'diffusion',
    title: 'Diffusion',
    summary:
      'The diffusion mechanism (vacancy and interstitial); steady-state Fick\u2019s first law; the non-steady second law solved for the semi-infinite solid; temperature dependence (the Arrhenius craft) and the activation-energy arithmetic; the engineering census — carburising, dopant profiles named for the ECE shelf, decarburising priced; and diffusion in polymers and ceramics glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Fick\u2019s Two Laws',
      'Arrhenius and Activation Energy',
      'Carburising Priced',
    ],
  },
  {
    number: 6,
    slug: 'mechanical-properties-and-testing',
    title: 'Mechanical Properties and Testing',
    summary:
      'Tensile testing read as the shared laboratory (Strength of Materials cross-referenced for the stress machinery): the true-versus-engineering census; elastic and anelastic behaviour; hardness — Rockwell, Brinell, Vickers and microhardness with conversions priced; impact toughness (Charpy/Izod) and the ductile-brittle transition; and the property census table every later chapter consults.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'True versus Engineering',
      'The Hardness Census',
      'Impact and the Ductile-Brittle Transition',
    ],
  },
  {
    number: 7,
    slug: 'strengthening-and-fracture',
    title: 'Strengthening Mechanisms and Fracture',
    summary:
      'Why barriers strengthen — grain refinement (Hall-Petch), strain hardening (work hardening with the cold-work/recrystallisation craft), precipitation and solid-solution strengthening, and heat-treatment hardening for steels; then fracture — ductile versus brittle read honestly, fatigue as a named mechanism (routed to Machine Design for the S-N design craft), creep at high temperature with its stages; and the inspection census (NDT glanced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Grain Refinement and Hall-Petch',
      'Work Hardening and Recrystallisation',
      'Fatigue and Creep Named and Routed',
      'Brittleness and the NDT Glance',
    ],
  },
  {
    number: 8,
    slug: 'phase-diagrams-and-transformations',
    title: 'Phase Diagrams and Phase Transformations',
    summary:
      'The phase rule priced; binary diagrams read fluently (isomorphous, eutectic, peritectic) with lever-rule and tie-line arithmetic; the Fe-Fe3C system read as the metallurgist\u2019s map (ferrite, austenite, cementite, pearlite, eutectoid craft); phase transformations — TTT and CCT curves; heat treatment practised (annealing, normalising, hardening, tempering, austempering named); hardenability and the Jominy craft; and surface treatments glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Lever Rules and Tie Lines',
      'The Fe-C Map Read Fluently',
      'TTT Curves and Heat Treatment',
      'Hardenability: the Jominy Craft',
    ],
  },
  {
    number: 9,
    slug: 'the-materials-families',
    title: 'The Materials Families',
    summary:
      'Steels (plain-carbon and alloy by purpose) and cast irons (grey, white, malleable, nodular); non-ferrous alloys — aluminium, copper, titanium, nickel priced by their honest niches; polymers (thermoplastic/thermoset, Tg and Tm, viscoelasticity named); ceramics (traditional versus engineering, their brittleness honestly); composites (particle, fibre and laminar — rule-of-mixtures arithmetic); and the selection census that closes the family tour.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Steels and Cast Irons',
      'The Non-Ferrous Niches',
      'Polymers and Ceramics Honestly',
      'Composites and Rule of Mixtures',
    ],
  },
  {
    number: 10,
    slug: 'corrosion-and-selection',
    title: 'Corrosion, Degradation and Selection',
    summary:
      'Electrochemical corrosion priced (the galvanic couple, the corrosion cell\u2019s anatomy, EMF and galvanic series); corrosion forms (uniform, galvanic, pitting, crevice, intergranular, stress corrosion) with their honest prevention (material selection, coatings, cathodic protection); oxidation at high temperature; polymer and ceramic degradation glanced; and the material-selection doorstep — Ashby\u2019s method named, the selection criteria the design books (Shigley\u2019s cross-reference) and the civil shelf\u2019s Building Materials book route to.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Galvanic Couple Priced',
      'Corrosion Forms and Prevention',
      'Degradation Beyond Metals',
      'The Selection Doorstep: Ashby Named',
    ],
  },
]

export const materialsScience: Book = {
  id: 'materials-science',
  title: 'Materials Science',
  subtitle: 'Structure makes properties — from atomic bonds to phase diagrams and corrosion',
  discipline: 'engineering',
  level: 'First materials science course → material-selection readiness across engineering',
  description: 'The structure-property discipline every branch shares: the materials worldview (classification and the structure-property triangle); atomic structure and interatomic bonding priced for engineering (why metals bend, ceramics shatter, polymers creep); crystal structures (SC, BCC, FCC, HCP) with X-ray diffraction named and density arithmetic; imperfections — vacancies, dislocations, grain boundaries — as the honest actors; diffusion by Fick\u2019s laws with its engineering (carburising) census; mechanical properties read from the testing laboratory (stress-strain, hardness, impact — cross-referenced to Strength of Materials); strengthening mechanisms and fracture (grain refinement, strain hardening, precipitation; ductile/brittle, fatigue and creep named and routed); phase diagrams (binary, the Fe-C system, the eutectoid craft) and phase transformations (TTT curves, heat treatment — annealing, normalising, hardening, tempering); the materials-family census — steels and cast irons, non-ferrous alloys, polymers, ceramics and composites; and corrosion with degradation and the materials-selection doorstep. Cross-references Strength of Materials, Machine Design (selection), Building Materials (civil\u2019s construction census) and hands off to the future Chemistry shelf.',
  status: 'planned',
  accent: ['#b7791f', '#713f12'],
  chapters,
}
