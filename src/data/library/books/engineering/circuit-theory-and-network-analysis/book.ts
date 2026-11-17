import type { Book, Chapter } from '../../../types'

/**
 * Circuit Theory and Network Analysis — the thirteenth book of the Engineering shelf (Electrical branch — absorbs the backlog’s ’Circuit Theory’ and ’Network Analysis’ lines, one arc honestly merged).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 43 planned lessons, zero written. Lesson ids will use the `ckt-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Circuit Theory and Network Analysis owns the lumped-circuit discipline (the backlog’s two lines merged — one Van Valkenburg arc, recorded in SUBJECT_BACKLOG.md). Electrical Machines owns the power-transformer and winding depth; Electromagnetic Fields and Waves owns the field truth beneath the lumped approximation; Signals and Systems owns the general transform theory; the Mathematics shelf’s Laplace chapters own the pure mathematics.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EE Section 2 'Electric circuits' + the EC Section 2 circuit half
 *   (both syllabus PDFs downloaded + extracted this pass): network elements and
 *   dependent sources; KCL/KVL, node and mesh analysis; Thevenin, Norton,
 *   superposition, maximum power transfer, reciprocity; transient response of DC and
 *   AC networks; sinusoidal steady-state analysis, resonance, two-port networks,
 *   balanced three phase, star-delta, complex power and power factor; linear 2-port
 *   parameters; wye-delta transformation — both registers are this book's own.
 * - Van Valkenburg, Network Analysis — the classic chapter arc web-checked this pass
 *   (Development of the Circuit Concept; Conventions for Describing Networks; network
 *   theorems; the Laplace/K-transform chapters; two-ports; the synthesis chapters
 *   noted as the deeper tail); Chakrabarti's Circuit Theory named as the Indian
 *   canonical pole.
 * - A. Chakrabarti's 'Circuits and Systems' TOC named; Hayt's Engineering Circuit
 *   Analysis named as the third pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-circuit-idea',
    title: 'The Circuit Idea',
    summary:
      'Charge, current, voltage and power with the passive sign convention learned as law; ideal voltage and current sources with their honest limits; the dependent- source family (VCVS through CCCS) that models real devices; R, L and C as energy elements (dissipator, and two storers) with their v-i relations; and the lumped approximation stated with its field-truth doorstep.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Passive Sign Convention as Law',
      'Sources, Ideal and Dependent',
      'R, L, C: One Dissipator, Two Storers',
      'The Lumped Approximation and Its Doorstep',
    ],
  },
  {
    number: 2,
    slug: 'kirchhoff-and-systematic-methods',
    title: 'Kirchhoff\u2019s Laws and the Systematic Methods',
    summary:
      'KCL and KVL as conservation statements; the complete node-voltage method (with supernodes) and the mesh-current method (with supermeshes) worked as engines; source transformation as the shuttle between the two; and the honest craft of choosing the smaller system to solve.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'KCL and KVL as Conservation',
      'The Node-Voltage Engine',
      'The Mesh-Current Engine',
      'Supernodes, Supermeshes, Choice',
    ],
  },
  {
    number: 3,
    slug: 'the-theorem-census',
    title: 'The Theorem Census',
    summary:
      'Linearity and superposition; Thevenin\u2019s and Norton\u2019s equivalents earned and priced on real bridges; maximum power transfer with its matched honest note; reciprocity; and Tellegen\u2019s theorem glanced as the audit that all the others obey.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Superposition Earned',
      'Thevenin and Norton Priced',
      'Maximum Power and Its Match',
      'Reciprocity and Tellegen\u2019s Audit',
    ],
  },
  {
    number: 4,
    slug: 'sinusoidal-steady-state',
    title: 'Sinusoidal Steady State',
    summary:
      'The sinusoid\u2019s vocabulary (RMS, phase, frequency); the phasor transform as a change of coordinates; impedance and admittance; series-parallel AC circuits solved; complex power S = P + jQ with power factor and its correction; and the measurement census (the wattmeter cross-referenced to Electrical Measurements).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Phasors: the Coordinate Change',
      'Impedance Arithmetic',
      'Complex Power and Power Factor',
      'The AC Wattmeter Census',
    ],
  },
  {
    number: 5,
    slug: 'resonance-and-coupled-circuits',
    title: 'Resonance and Coupled Circuits',
    summary:
      'Series and parallel resonance with the quality factor Q, bandwidth and selectivity priced; the tuned-circuit applications census; mutual inductance and the dot convention; the coupled-coil arithmetic (coefficients of coupling, reflected impedance); the ideal transformer at circuit level; and the honest handoff — power-transformer engineering lives in Electrical Machines.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Resonance and Q Priced',
      'Selectivity and Tuned Circuits',
      'Mutual Inductance and the Dot Convention',
      'The Ideal Transformer at Circuit Level',
      'RLC Circuits and Natural, Forced and Complete Responses',
      'Damped Oscillation and the Quality Factor',
      'Series and Parallel Resonance',
      'Magnetically Coupled Circuits and Ideal Transformers',
    
      'Basic Electrical Engineering — DC circuits: Ohm\'s and Kirchhoff\'s laws, mesh and nodal analysis, circuit theorems; electromagnetism, Faraday\'s and Lenz\'s laws, induced EMF and its uses; single-phase AC circuits; transformers, efficiency; basics of DC machines, induction machines and synchronous'
    ],
  },
  {
    number: 6,
    slug: 'three-phase-circuits',
    title: 'Balanced Three-Phase Circuits',
    summary:
      'Why three phase won (the rotating-field and constant-power honest notes); star and delta connections with line-versus-quantity arithmetic; balanced three- phase solution methods; power measurement by the two-wattmeter method; the star-delta transformation; and unbalanced glimpses routed honestly to Power Systems\u2019 symmetrical components.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Three Phase Won',
      'Line-versus-Phase Arithmetic',
      'The Two-Wattmeter Method',
      'Unbalanced Glances Routed',
    ],
  },
  {
    number: 7,
    slug: 'transients',
    title: 'Transients',
    summary:
      'First-order RL and RC transients with the time constant and the initial- and final-value craft; second-order RLC transients with the three regimes (over, critical, under); transients under AC excitation named; switching dynamics on practical devices glanced; and the classical method\u2019s honest limits pointing to the Laplace route (cross-referenced to the Mathematics shelf\u2019s transform chapters and Signals and Systems).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'First-Order: the Time Constant',
      'Second-Order: the Three Regimes',
      'The Initial- and Final-Value Craft',
      'The Laplace Route Named',
    
      'Engineering Mathematics — matrix theory, eigen values and eigen vectors; numerical methods for solution of non-linear algebraic equations and differential equations; Fourier series; linear, non-linear and partial differential equations; complex variables; probability and statistics fundamentals,'
    ],
  },
  {
    number: 8,
    slug: 'network-functions-and-frequency-response',
    title: 'Network Functions and Frequency Response',
    summary:
      'The network function from the Laplace domain; poles and zeros read as the circuit\u2019s character; the frequency response from the pole-zero map (Bode\u2019s craft introduced, Control Systems owns the design depth); resonance re-read from the poles; stability of the circuit glance; and the damped-natural vocabulary priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Poles and Zeros as Character',
      'The Frequency Response Read',
      'Bode\u2019s Craft Introduced',
      'Resonance Re-Read from the Poles',
    ],
  },
  {
    number: 9,
    slug: 'two-port-networks',
    title: 'Two-Port Networks',
    summary:
      'The two-port idea (and its honest conditions); the z, y, h, g and ABCD parameter families defined, measured and converted; the equivalent circuits each family draws; cascaded two-ports by ABCD arithmetic; terminated two-ports with image and iterative impedances glanced; and the applications census (transistor models, transmission lines, filters) that makes the abstraction worth carrying.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Parameter Families Defined',
      'Conversions and Equivalent Circuits',
      'Cascades by ABCD',
      'The Applications Census',
    
      'Communication networks — principles/practices/technologies/uses; OSI model/security; basic packet multiplexed streams/scheduling; cellular networks: types, analysis; protocols (TCP/TCPIP)'
    ],
  },
  {
    number: 10,
    slug: 'topology-state-and-doorstep',
    title: 'Topology, State Variables and the Doorstep',
    summary:
      'Network topology — the graph beneath the circuit (trees, links, cut sets and loops) grown into loop and cut-set systematisations; the incidence matrices glanced; state-variable formulation as the modern description; the synthesis doorway named (driving-point functions, Hurwitz, positive-real — the deeper tail recorded); and the doorsteps — Electrical Machines (the energised circuit), Control Systems (the feedback circuit), Power Electronics (the switched circuit).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Graph Beneath the Circuit',
      'Cut Sets and Loop Systematics',
      'State Variables as Description',
      'The Doorsteps: Energised, Feedback, Switched',
    ],
  },
]

export const circuitTheoryAndNetworkAnalysis: Book = {
  id: 'circuit-theory-and-network-analysis',
  title: 'Circuit Theory and Network Analysis',
  subtitle: 'From Kirchhoff\u2019s laws to two-port networks — the electrical circuit as an engineered system',
  discipline: 'engineering',
  level: 'First circuits course → machines, control and power readiness',
  description: 'The circuit discipline every electrical and electronic chapter assumes: charge, current, voltage and the passive sign convention; R, L, C and M as network elements with ideal and dependent sources; Kirchhoff\u2019s laws grown into the systematic node and mesh analyses; the theorem census — superposition, Thevenin, Norton, reciprocity and maximum power transfer; sinusoidal steady state with phasors, impedance, complex power and power factor, and resonance (series and parallel, with Q and bandwidth); coupled circuits and the ideal transformer at circuit level (the power transformer lives in Electrical Machines); balanced three-phase circuits with star-delta and power measurement; transients in RL, RC and RLC circuits solved classically and by Laplace (the transform machinery cross-referenced to the Mathematics shelf); network functions, poles and zeros with the frequency-response reading; two-port networks by the z, y, h and ABCD parameter families; and network topology (graph theory, cut sets, loop analysis) closing into state variables. Cross-references Electromagnetic Fields and Waves (the field truth beneath the lumped honest note), Signals and Systems (the transform machinery) and hands off to Electrical Machines and Control Systems.',
  status: 'planned',
  accent: ['#ca8a04', '#854d0e'],
  chapters,
}
