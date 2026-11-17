import type { Book, Chapter } from '../../../types'

/**
 * Building Materials — the thirty-second book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `bmat-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Building Materials owns the construction-materials census (GATE CE S2’s ’Construction Materials’ line: ’Structural Steel — Composition, material properties and behaviour; Concrete — Constituents, mix design, short-term and long-term properties’). Materials Science (mechanical) owns the underlying microstructure science (the contract stated in both headers); Structural Engineering owns the design craft these materials serve; Transportation owns highway materials’ pavement story; Environmental Engineering owns the sustainability and waste side.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 2's Construction Materials line (CE_2026_Syllabus.pdf,
 *   extracted this pass): 'Structural Steel — Composition, material properties and
 *   behaviour; Concrete — Constituents, mix design, short-term and long-term
 *   properties' — this book's register.
 * - B.C. Punmia's Building Construction materials arc and S.K. Duggal's Building
 *   Materials — the Indian canonical arcs web-checked this pass (the stones/
 *   bricks/cement/timber/paint organisation confirmed through the open listings);
 *   P.C. Varghese's Building Materials named; MS Shetty's Concrete Technology
 *   named as the concrete pole; the IS 456/IS 383/IS 269 census noted for
 *   authoring time.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-building-worldview',
    title: 'The Building Worldview',
    summary:
      'The requirements census (strength, durability, the service honest notes); selection priced by function, cost and the site\u2019s honest conditions; the specification craft (reading and writing the IS-anchored spec); and the material census drawn on one page — the book\u2019s map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Requirements Priced Honestly',
      'Selection by Function and Site',
      'The Specification Craft',
    ],
  },
  {
    number: 2,
    slug: 'stones-and-bricks',
    title: 'Stones, Bricks and Blocks',
    summary:
      'The rock census and its engineering reading; quarrying and dressing (the season-and-dress honest note); stone testing and the deterioration census; bricks — manufacture (moulding, drying, burning), classification and the IS testing census (compressive strength, water absorption, efflorescence); hollow blocks and AAC priced by their niches.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rock Census Read',
      'Bricks Manufactured and Tested',
      'Blocks Priced by Niche',
    ],
  },
  {
    number: 3,
    slug: 'cement',
    title: 'Cement',
    summary:
      'Portland cement\u2019s composition (Bogue\u2019s equations priced); the types census (OPC grades, PPC, PSC, rapid-setting — by honest niche); hydration — the compounds\u2019 chemistry and the heat honest note; the testing census (fineness, consistency, setting times, soundness, strength); storage and the freshness honest note; and alternative cements glanced (geopolymers named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bogue\u2019s Composition Priced',
      'Hydration\u2019s Chemistry and Heat',
      'The Testing Census',
      'The Alternative Glance',
      'Cement',
    ],
  },
  {
    number: 4,
    slug: 'aggregates-and-admixtures',
    title: 'Aggregates, Water and Admixtures',
    summary:
      'The aggregate census by size and source (the shape-and-texture honest note); grading and the sieve analysis craft (the curve read); the specific-gravity and bulk-density arithmetic; deleterious substances priced; water\u2019s quality census; and admixtures — chemical (plasticisers, retarders, accelerators) and mineral (fly ash, GGBS, silica fume) priced by their honest niches.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sieve Craft Read',
      'Density Arithmetic',
      'Water Quality Priced',
      'Admixtures by Niche',
    ],
  },
  {
    number: 5,
    slug: 'concrete-and-mix-design',
    title: 'Concrete and Mix Design',
    summary:
      'Fresh concrete — workability and its tests (slump, compaction factor, Vee-Bee priced); the IS mix-design method worked honestly (target strength, water-cement, the trial-batch craft); batching, mixing, transport, placing and compaction (the segregation-and-bleeding honest notes); curing as the neglected law; hardened properties — compressive and flexural strength, the grade census; and long-term behaviour — shrinkage, creep and durability (the permeability honest note, Materials Science cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Workability Tested',
      'The IS Mix Design Worked',
      'Compaction and Curing as Law',
      'Shrinkage, Creep, Durability',
    ],
  },
  {
    number: 6,
    slug: 'timber-and-metals',
    title: 'Timber and Metals in Construction',
    summary:
      'Timber — its structure and the anisotropic honest note, seasoning (the methods priced), defects and preservation, plywood and engineered wood priced; structural steel — its composition and properties (the GATE line served; Materials Science\u2019s Fe-C arc cross-referenced), the section census (rails, joists, plates); aluminium and its alloys priced by niche; and the metals\u2019 corrosion doorway (Materials Science\u2019s chapter cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Timber Seasoned and Preserved',
      'Structural Steel\u2019s Composition Served',
      'Aluminium Priced by Niche',
    ],
  },
  {
    number: 7,
    slug: 'bituminous-and-modern-materials',
    title: 'Bituminous, Finishing and Modern Materials',
    summary:
      'Bituminous materials — the bitumen-versus-tar honest split, the cutback and emulsion census (Transportation\u2019s pavement chapter cross-referenced); paints and varnishes (their constitution and the drying craft); glass, ceramics and the service census; the modern families — polymers and composites in construction, geosynthetics priced honestly, the sustainability census (recycled materials, the embodied-carbon honest note).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bitumen Served Honestly',
      'Paints and Finishes',
      'Geosynthetics Priced',
      'The Sustainability Census',
      'Ceramics',
    ],
  },
  {
    number: 8,
    slug: 'durability-and-selection-synthesis',
    title: 'Durability, Selection and the Synthesis',
    summary:
      'The durability engine — what makes materials fail in service (the moisture-thermal-chemical census); the selection craft priced on real elements (a wall, a slab, a roof — from census to specification); the quality-control census on site; the synthesis map; and the doorsteps — Structural Engineering (the design consumer), Environmental Engineering (the sustainability partner), the future Materials-Science homes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'What Fails Materials in Service',
      'Three Elements Specified',
      'The Synthesis and Doorsteps',
    ],
  },
]

export const buildingMaterials: Book = {
  id: 'building-materials',
  title: 'Building Materials',
  subtitle: 'Stones, bricks, cement, concrete, timber and steel — the material census of construction',
  discipline: 'engineering',
  level: 'First construction-materials course → specification-and-QC readiness',
  description: 'The construction-materials census: the building worldview (requirements, selection and the specification craft); stones — the rock census (igneous, sedimentary, metamorphic), quarrying and dressing, the testing honest note; bricks and blocks — clay brick manufacture and testing (IS standards), hollow and AAC blocks priced; cement — Portland\u2019s composition (Bogue\u2019s honest equations), types, hydration chemistry and tests (fineness, soundness, setting times, strength); concrete and its constituents — aggregates (grading and the sieve craft, the shape honest note), water, admixtures, mix design (the IS method worked) and fresh-and-hardened properties with short-term and long-term behaviour (Materials Science cross-referenced); timber — structure, seasoning, defects and preservation; metals in construction — structural steel\u2019s composition and behaviour (the GATE CE line), aluminium priced; bituminous materials, paints, varnishes, glass and the modern census (polymers, composites, geopolymers glanced); and the durability-and-selection synthesis. Cross-references Materials Science (the structure-property truth), Structural Engineering (the design consumer) and hands off to Transportation\u2019s pavement materials and Environmental\u2019s sustainability chapters.',
  status: 'planned',
  accent: ['#a16207', '#713f12'],
  chapters,
}
