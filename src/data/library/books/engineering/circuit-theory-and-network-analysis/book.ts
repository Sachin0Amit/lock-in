import type { Book, Chapter } from '../../../types'

/**
 * Circuit Theory and Network Analysis — the thirteenth book of the Engineering shelf (Electrical branch — absorbs the backlog’s ’Circuit Theory’ and ’Network Analysis’ lines, one arc honestly merged).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 137 planned lessons, zero written. Lesson ids will use the `ckt-` prefix
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
      'Obtaining Linear Amplification by 8.2 IC Biasing: Current Sources and Current',
      'Simulation Circuit 1034 15.4.3 Triggering the Bistable Circuit',
      'Two-Integrator Loop 1040 15.4.6 Generating Square Waveforms',
      'Circuit Implementation 1042 Waveforms',
      'An Alternative Two-Integrator-Loop 15.4.8 Generation of Sine Waves',
      'Biquad Circuit 1044 Summary',
      'The Two-Input NOR Gate',
      'The Two-Input NAND Gate',
      'Two important details',
      'And RC Circuits 220 Practical Perspective: A Household Distribution',
      'Practical Perspective: Artificial Pacemaker 221 Circuit',
      'Timing 308 Circuits',
      'Adding a Resistive Load to a Voltage 4.19 Finding the Thévenin Equivalent of a Circuit',
      'Divider 65 with Dependent Sources and Resistors',
      'Using a d’Arsonval Voltmeter 72 Dependent Sources',
      'Determining Average Power Delivered to a 13.1 Transforming a Circuit into the s Domain',
      '13.14 A Circuit with Both Internally Generated',
      'Analyzing a Wye-Wye Circuit 420 and Externally Applied Impulses',
      'Circuit 276 15.1 Normalized (so that ω c = 1 rad s)',
      'Charging and discharging currents 110 8.1 Inductive and non-inductive circuits',
      'Summary of important formulae 163 10.1 Basic a.c. circuits',
      'Terms and concepts 163 10.2 Alternating current in a resistive circuit',
      'Networks 400 20.19 Stabilizing voltages supplies',
      'Distortion 415 20.28 Integrated circuits'
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
      'Stuck-node tracer',
      'Choosing a battery',
      'Choosing a DAC',
      'Summary 19 4.5 Introduction to the Mesh-Current',
      'Using Essential Nodes and Essential Branches',
      'A Special Case in the Mesh-Current',
      'Mesh-Current Method 135 12.3 Four Useful Transform Pairs',
      'Permeability of free space or magnetic 9.11 Alternating system frequencies in practice'
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
      'Finding a Thévenin Equivalent in the Frequency of Finite Duration',
      'Inductor and Capacitor Duality 198 13.1 Summary of the s-Domain Equivalent',
      'Admittance, conductance and susceptance 269 15 Network Theorems Applied to',
      'Log scales 368 20.4 Bridge rectifier network'
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
      'Determining R. and R 30 General Impedances',
      'Practical Perspective: Capacitive Touch 9.3 The Phasor',
      'And Capacitance 194 9.6 Series, Parallel, and Delta-to-Wye',
      'Problems 715 Complex Poles',
      'Applying a Delta-to-Wye Transform',
      'Applying Series-Parallel Simplification 62 4.17 Finding the Thévenin Equivalent Resistance',
      'Determining the Step Response of a Circuit with 9.5 Adding Cosines Using Phasors',
      'Designing a Fourth-Order Low-Pass Active Sinusoidal Steady-State Response',
      'Summary of important formulae 149 9.6 Average and r.m.s. values of sinusoidal',
      'Addition and subtraction of sinusoidal',
      'Polar admittances 259 14.9 Series resonance using complex notation',
      'Addition and subtraction of phasors',
      'Parallel admittance 271 15.1 One stage further'
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
    
      'Basic Electrical Engineering — DC circuits: Ohm\'s and Kirchhoff\'s laws, mesh and nodal analysis, circuit theorems; electromagnetism, Faraday\'s and Lenz\'s laws, induced EMF and its uses; single-phase AC circuits; transformers, efficiency; basics of DC machines, induction machines and synchronous',
      'Graphical Analysis Using the MOSFET',
      'Iterative Analysis Using the 5.4 Technology Scaling (Moore’s Law) and',
      'The Need for Rapid Analysis 193 5.4.1 Technology Scaling',
      'The Role of the Substrate—The Body Analysis',
      'Bandwidth Extension',
      'Mutual Inductance 199 Simplifications',
      'Finding the Unbounded Response in an RC',
      'Finding Finding v, p, and w Induced by a 8.6 Finding the Overdamped Step Response of a',
      'Finding the Equivalent Inductance 196 8.7 Finding the Underdamped Step Response of a',
      'Calculating the Coupling Coefficient and Stored 8.9 Comparing the Three-Step Response',
      'PSpice Sensitivity Analysis Results 133 12.2 An Abbreviated List of Operational',
      'Network Theorems Applied to AC Networks 325 39 Motor Selection and Efficiency',
      'Analysis of growth and decay 113 8.3 Inductance in terms of flux-linkages',
      'Summary of important formulae 130 8.11 Mutual inductance',
      'Summary of important formulae 244 14 Resonance in AC Circuits',
      'Analysis of the resultant flux due to'
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
      'Darlington connection',
      '"Two out of three isn\'t bad": creating a perfect op-amp',
      'Interboard connections',
      'Using the General Solution Method to Find an 9.2 Finding the Characteristics of a Sinusoidal'
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
    
      'Engineering Mathematics — matrix theory, eigen values and eigen vectors; numerical methods for solution of non-linear algebraic equations and differential equations; Fourier series; linear, non-linear and partial differential equations; complex variables; probability and statistics fundamentals,',
      'The Resonator Poles 1029 15.2.5 A Final Remark',
      'A final remark',
      'Sequential Switching',
      'Practical Perspective: Transmission and Practical Perspective: Pushbutton Telephone',
      'Transform 444 Practical Perspective: Bass Volume',
      'Practical Perspective: Surge Suppressors 483 16.1 Fourier Series Analysis: An Overview',
      'Using the General Solution Method to Find an 9.4 Calculating the rms Value of a Triangular'
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
      'Summary 561 10 Frequency Response',
      'Increasing /^ by Eliminating the Miller Poles',
      'Introduction 888 13.2.4 Frequency Response',
      'Issues in Deep-Submicron Design 1179 D. Some Useful Network Theorems',
      'The Inductor 184 Domain',
      'Poles and Zeros of F(s) 470 Practical Perspective: Bass Volume',
      'Load Restrictions 395 13.9 Deriving the Transfer Function of a Circuit',
      'Logarithms 365 20.3 Full-wave rectifier network',
      'Frequency response 407 20.23 IGFET'
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
    
      'Communication networks — principles/practices/technologies/uses; OSI model/security; basic packet multiplexed streams/scheduling; cellular networks: types, analysis; protocols (TCP/TCPIP)',
      'Types 1037 15.4.5 A Bistable Circuit with Noninverting',
      'ADC Technologies',
      'Delta-to-Wye (Pi-to-Tee) Equivalent 5.7 A More Realistic Model for the Operational',
      'Analyzing Two Cascaded Integrating Amplifiers',
      'Designing a High-Q Bandpass Filter 602 18.1 Finding the z Parameters of a Two-Port',
      'Stopband (or bandstop) filters 382 20.9 Common-base and common-emitter circuits',
      '2-port Networks 388 20.11 Static characteristics for a common-emitter circuit',
      'The need for conversion 499 sequential circuits'
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
      'Driving Cables'
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
