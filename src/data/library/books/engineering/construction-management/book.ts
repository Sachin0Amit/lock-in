import type { Book, Chapter } from '../../../types'

/**
 * Construction Management — the thirty-eighth book of the Engineering shelf (Civil branch — the branch’s capstone).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 32 planned lessons, zero written. Lesson ids will use the `cm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Construction Management owns the construction-delivery craft (GATE CE S2’s Construction Management line: ’Types of construction projects; Project planning and network analysis — PERT and CPM; Cost estimation’). The OR THEORY of networks is owned by the Mathematics shelf’s Optimization and Operations Research (cross-referenced; no duplication — this book owns the construction idiom); Industrial Engineering owns the production-floor idiom; the future Economics-Commerce shelf owns the market side; CAD/CAM owns the BIM-adjacent digital tools.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 2's Construction Management line
 *   (CE_2026_Syllabus.pdf, extracted this pass): 'Types of construction
 *   projects; Project planning and network analysis — PERT and CPM; Cost
 *   estimation' — this book's register (the solid-mechanics lines of S2 route
 *   to Structural Engineering).
 * - Chitkara's Construction Project Management — the Indian canonical arc
 *   web-checked this pass; Punmia's Project Planning and Control with PERT and
 *   CPM named as the network pole (the GATE-arithmetic classic); Peurifoy's
 *   Construction Planning, Equipment and Methods named as the international
 *   pole; Harris named. The IS and contract-document census noted for
 *   authoring time.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-project-frame',
    title: 'The Project Frame',
    summary:
      'The construction-project census (by type, size and delivery route — the DBB-and-EPC honest families); the stakeholder map (the owner, consultant, contractor triangle priced); the project phases (initiation to handover) with the gate honest notes; the project manager\u2019s craft stated; and the Indian industry honest note (the sector\u2019s scale and its informality, priced without romance).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Delivery Census',
      'The Stakeholder Triangle',
      'The Phases and Their Gates',
      'The Industry Honest Note',
    ],
  },
  {
    number: 2,
    slug: 'planning-and-networks',
    title: 'Construction Planning and Network Analysis',
    summary:
      'The planning craft (the WBS and the activity census); the network drawn (the activity-on-node discipline, the dependencies honest census); CPM earned — the critical path computed, the float census priced (total, free, independent — their honest differences); PERT earned — the three-time estimate and the probability craft (Statistics cross-referenced); time-cost trade-offs and crashing worked; resource levelling and the resource-histogram craft; and the software census glanced (the modern tools named, the Mathematics shelf\u2019s OR theory cross-referenced for the general engine).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Network Drawn Honestly',
      'CPM and the Float Census',
      'PERT and Its Probability',
      'Crashing and Levelling Worked',
    ],
  },
  {
    number: 3,
    slug: 'site-organisation',
    title: 'Site Organisation and Resources',
    summary:
      'The site-layout craft (the honest principles — the proximity, safety and expansion notes); temporary utilities priced (water, power, the welfare census); the labour census (the trades, the productivity honest arithmetic, the statutory notes); materials management (the procurement chain, the store craft, the waste honest note); and the site-communication honest map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Layout Craft\u2019s Principles',
      'Labour and Its Productivity',
      'Materials Managed Honestly',
      'The Communication Map',
    ],
  },
  {
    number: 4,
    slug: 'equipment-and-productivity',
    title: 'Construction Equipment and Productivity',
    summary:
      'The equipment census priced by earthmoving families (dozers, scrapers, excavators, loaders — their cycle-and-output arithmetic); hauling (the truck-and-dumper match craft); cranes (their types and the load-radius honest chart); compaction and concreting plant glanced; the owning-and-operating cost arithmetic earned (the depreciation, interest, tyre-and-repair census — the Economic-wise honest note); and the buy-versus-rent honest verdict.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Earthmoving Arithmetic',
      'Cranes and Their Charts',
      'Owning versus Operating Cost',
      'The Buy-versus-Rent Verdict',
    ],
  },
  {
    number: 5,
    slug: 'cost-estimation-and-contracts',
    title: 'Cost Estimation and Contracts',
    summary:
      'The quantity-surveying craft (the measurement rules honestly priced); rate analysis earned (the labour-material-plant build-up); the estimate census (the preliminary through the detailed honest families); the tendering process (the notice, the bid honest discipline, the evaluation craft); the contract families priced (lump-sum, item-rate, cost-plus — their risk honest notes); the contract document read as a genre (the conditions of contract, the IS-and-FIDIC census); and variations-and-claims glanced honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rates Built Up Honestly',
      'The Estimate Census',
      'Tendering and Its Discipline',
      'The Contract Families Priced',
    ],
  },
  {
    number: 6,
    slug: 'quality-and-safety',
    title: 'Quality and Safety Management',
    summary:
      'The site-QC census (the inspection-and-test plan, the materials\u2019 cross-reference to Building Materials, the documentation craft); quality systems glanced (the ISO family named); safety — the hazard census priced (the excavation, scaffold, lifting and electrical honest families), the safety regulations read as law, the accident ledger and its honest arithmetic; and the welfare-and-environment site notes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The ITP Craft',
      'The Hazard Families Priced',
      'The Accident Ledger Read',
      'The Welfare Notes',
    ],
  },
  {
    number: 7,
    slug: 'modern-construction-management',
    title: 'Modern Construction Management',
    summary:
      'The digital census — ERP and the planning software families, BIM glanced honestly (its dimensions named, CAD/CAM\u2019s digital-chain cross-referenced, the Indian adoption honest note); lean construction (the waste census cross-referenced to Industrial Engineering\u2019s lean); the claim-and-dispute honest machinery (the arbitration glance); and the project-controls craft (the earned-value arithmetic earned — the honest triangle of scope-time-cost).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'BIM Glanced Honestly',
      'Lean on Site',
      'Disputes\u2019 Machinery',
      'The Earned-Value Craft Earned',
    ],
  },
  {
    number: 8,
    slug: 'closeout-synthesis-and-doorstep',
    title: 'Closeout, Synthesis and the Doorstep',
    summary:
      'The closeout census (the commissioning craft, the as-built honest note, the defects-liability period, the final account); the maintenance glance; the synthesis — one page from the project frame to the handover key; the civil branch\u2019s map (the nine books\u2019 honest census); and the doorsteps — the future management and economics homes, the digital thread, the engineering profession\u2019s honest responsibilities.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Closeout Census',
      'The Synthesis Page',
      'The Civil Branch\u2019s Map',
      'The Doorsteps Named',
    ],
  },
]

export const constructionManagement: Book = {
  id: 'construction-management',
  title: 'Construction Management',
  subtitle: 'Projects delivered — planning, networks, costs, contracts and the site itself',
  discipline: 'engineering',
  level: 'First construction-management course → project-engineering readiness',
  description: 'The delivery discipline (the civil branch\u2019s capstone): the project frame (the construction-project census — types, stakeholders, phases and the project-life honest cycle); construction planning and network analysis — activities and their dependencies, PERT and CPM earned at construction depth (the event-and-activity craft, the critical path, the float census, time-cost trade-offs and crashing, resource levelling — with the Mathematics shelf\u2019s OR book owning the general theory and Industrial Engineering the production idiom, cross-referenced); site organisation (the layout craft, temporary utilities, the resources census — labour, materials, plant); the equipment and productivity chapter (the earthmoving census — dozers, scrapers, excavators, cranes — with the owning-versus-operating cost arithmetic); cost estimation and contracts — quantity surveying basics (the measurement craft), rate analysis and the estimate census, the tendering process and the contract families (the lump-sum, item-rate and the modern honest notes); quality and safety management (the QC census on site, the safety regulations and the accident honest ledger); modern construction management (ERP and the planning software census, BIM glanced — CAD/CAM cross-referenced — lean construction, the claim-and-dispute honest note); and the project closeout synthesis. Cross-references Structural Engineering (the technical partner), Industrial Engineering (the OR layer), Surveying (the setting-out truth) and hands off to the future management homes.',
  status: 'planned',
  accent: ['#d97706', '#b45309'],
  chapters,
}
