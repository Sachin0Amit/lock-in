import type { Book, Chapter } from '../../../types'

/**
 * Transportation Engineering — the thirty-fourth book of the Engineering shelf (Civil branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `trans-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Transportation Engineering owns the movement infrastructure (GATE CE S6). Surveying owns the ground truth its alignments consume; Building Materials owns the material science of its aggregates and bitumens; Geotechnical owns the subgrade and embankment story; the Mathematics shelf’s Statistics owns the accident-analysis mathematics; the urban-transport-planning depth is a future book (honestly named).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 CE Section 6 'Transportation Engineering' (CE_2026_Syllabus.pdf,
 *   extracted this pass): Transportation Infrastructure (geometric design of
 *   highways — cross-sectional elements, sight distances, horizontal and
 *   vertical alignments; geometric design of railway track — speed and cant;
 *   concept of airport runway length, calculations and corrections; taxiway and
 *   exit taxiway design) + Highway Pavements (highway materials — desirable
 *   properties and tests; desirable properties of bituminous paving mixes;
 *   design factors for flexible and rigid pavements; design of flexible and
 *   rigid pavement using IRC codes) + Traffic Engineering (traffic studies on
 *   flow and speed, peak hour factor, accident study, statistical analysis of
 *   traffic data; microscopic and macroscopic parameters of traffic flow,
 *   fundamental relationships; traffic signs; signal design by Webster's
 *   method; types of intersections; highway capacity) — the entire three-part
 *   section is this book's register.
 * - S.K. Khanna & C.E.G. Justo, Highway Engineering — the Indian canonical arc
 *   web-checked this pass (the organisation confirmed through the open
 *   listings); L.R. Kadiyali named as the second pole; the IRC census (IRC 37,
 *   IRC 58, IRC 73 named) noted for authoring time; the railway and airport
 *   chapters served by their standard Indian arcs ( Saxena & Arora named).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-transportation-system',
    title: 'The Transportation System',
    summary:
      'The mode census (road, rail, air, water — priced by their honest niches); the planning hierarchy named honestly (this book owns the infrastructure and traffic crafts; the network-planning depth is a future door); the highway classification census (the Indian systems named); and the road-user-and-vehicle honest notes that every design chapter consults.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mode Census Priced',
      'The Planning Hierarchy Named',
      'The Classification Census',
    ],
  },
  {
    number: 2,
    slug: 'geometric-design-i',
    title: 'Geometric Design I: Alignment and Sight Distance',
    summary:
      'The alignment craft (the obliging-and-rejecting honest notes, Surverying\u2019s ground truth cross-referenced); cross-sectional elements (the camber craft and its census, the width arithmetic, the right-of-way); the sight-distance engine — stopping sight distance earned (the perception-braking craft) and overtaking sight distance worked (the two-component honest note); the intermediate and headlight cases glanced; and the design-speed census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Alignment Chosen Honestly',
      'Cambers and Widths Priced',
      'SSD and OSD Earned',
      'The Design-Speed Census',
    ],
  },
  {
    number: 3,
    slug: 'geometric-design-ii',
    title: 'Geometric Design II: The Curves and Gradients',
    summary:
      'The horizontal curve — superelevation earned (the friction honest note and the 75% law\u2019s honest reading), its rate and the attainment craft, extra widening worked; the transition curve\u2019s purpose (the spiral, the shift arithmetic cross-referenced from Surveying); vertical alignment — the gradient census, the compensations named, the vertical curve designed by the K-value craft; and the coordination honest note (the 3D alignment).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Superelevation Earned',
      'Widening and Transition',
      'The Vertical Curve Crafted',
      'The 3D Coordination Note',
    ],
  },
  {
    number: 4,
    slug: 'railway-and-airport-engineering',
    title: 'Railway Track and Airport Engineering',
    summary:
      'The railway track — its gauge census, the speed-and-cant craft (the equilibrium-and-cant-deficiency arithmetic), rails, sleepers and ballast priced (the coning, creep and wear honest notes), points and crossings glanced; airports — the runway length concept and its corrections (elevation, temperature, gradient — the combined arithmetic worked), the taxiway and exit design craft, and the airport-layout honest census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Gauge, Cant and Deficiency',
      'Track\u2019s Census and Its Honest Notes',
      'Runway Length Corrected',
      'Taxiways and the Layout Census',
    ],
  },
  {
    number: 5,
    slug: 'highway-materials',
    title: 'Highway Materials',
    summary:
      'The aggregate census and its tests (crushing, impact, abrasion, flakiness and elongation — the desirable-properties honest reading); bituminous materials — the test census (penetration, ductility, softening, flash — the bitumen-versus-tar split cross-referenced from Building Materials); the bituminous mix craft — gradation read, the Marshall method priced (the stability-flow honest reading); and the subgrade story (Geotechnical\u2019s CBR cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Aggregate Test Census',
      'Bitumen\u2019s Tests Priced',
      'The Marshall Craft',
      'The Subgrade Cross-Reference',
    ],
  },
  {
    number: 6,
    slug: 'pavement-design',
    title: 'Flexible and Rigid Pavements',
    summary:
      'The pavement families priced honestly (the load-distribution stories); design factors — traffic (the VDF and cumulative axles arithmetic), subgrade strength (CBR), the environment and drainage; flexible design by the IRC method worked (the CBR-and-traffic honest craft); rigid design by the IRC method (the Westergaard craft, the edge-and-corner honest notes); the joints census (contraction, expansion, dowels and tie bars); and the pavement-performance honest note (the failure census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Families\u2019 Load Stories',
      'The Traffic Arithmetic',
      'IRC Flexible Worked',
      'IRC Rigid and Its Joints',
    ],
  },
  {
    number: 7,
    slug: 'traffic-engineering',
    title: 'Traffic Engineering',
    summary:
      'The traffic-study census — volume studies (the PHF earned), speed studies (the percentile honest craft), the origin-and-destination glance; accident studies and their statistical analysis (the Mathematics shelf\u2019s Statistics cross-referenced); the microscopic-versus-macroscopic distinction priced; the fundamental relations earned (flow-density-speed, the shock-wave craft); capacity and the level-of-service census (the highway\u2019s honest grading); and parking glanced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Study Census Worked',
      'The Fundamental Relations Earned',
      'Shock Waves Priced',
      'Capacity and LOS Graded',
    ],
  },
  {
    number: 8,
    slug: 'traffic-control-and-synthesis',
    title: 'Traffic Control and the Synthesis',
    summary:
      'The control census — road markings and the sign census (the regulatory-warning-guide families); signal design by Webster\u2019s method earned (the cycle-and-splits arithmetic worked); the intersection census (the channelisation craft, the rotary honest note, the interchange glance); intelligent-transport systems named honestly; and the synthesis — one page from the mode census to the signal; the doorsteps — the urban-planning future, Geomatics\u2019 mapping engine, the materials partners.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Sign Census Read',
      'Webster Earned and Worked',
      'Intersections Channelised',
      'The Synthesis and Doorsteps',
    ],
  },
]

export const transportationEngineering: Book = {
  id: 'transportation-engineering',
  title: 'Transportation Engineering',
  subtitle: 'Highways, railways and airports — the geometry, materials and traffic of movement',
  discipline: 'engineering',
  level: 'First transportation course → highway-and-airport design readiness',
  description: 'The movement infrastructure: the transportation system census (modes, planning\u2019s honest hierarchy); highway geometric design I — the alignment craft, cross-sectional elements and the sight-distance engine (SSD and OSD earned); geometric design II — horizontal alignment (superelevation and its friction honest note, extra widening) and vertical alignment (gradients, the vertical-curve craft with K-values); railway track engineering (gauge, the speed-and-cant craft, rails, sleepers and ballast — the coning and creep honest notes); airport engineering (runway length and its corrections — the elevation, temperature and gradient arithmetic — taxiway and exit design); highway materials (the aggregate and bitumen test census, desirable properties, the bituminous-mix craft — Building Materials cross-referenced); flexible and rigid pavements (the design factors, the IRC methods for both, the joints census for concrete); traffic engineering — the study census (flow, speed, the peak-hour factor, accidents and the statistical analysis craft), the macroscopic parameters and fundamental relations, capacity and the level-of-service idea; traffic control — the sign census, signal design by Webster\u2019s method earned, the intersection census; and the systems synthesis. Cross-references Building Materials, Surveying (the alignment ground truth), Statistics (the traffic mathematics) and hands off to the future transport-planning homes.',
  status: 'planned',
  accent: ['#4b5563', '#1f2937'],
  chapters,
}
