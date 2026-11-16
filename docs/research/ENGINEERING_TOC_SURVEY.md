# ENGINEERING TOC SURVEY — the Engineering shelf's reference evidence base

> Built by the **Engineering full-shelf planning pass** of 2026-11-16 (owner
> directive: "creat all things how like other subjects like maths and cs create
> it for engineering with books topic same way as like other subject"). Same
> machinery as the Mathematics shelf's 2026-11-10 pass and the Computer
> Science shelf's 2026-11-15 pass: the syllabus anchors downloaded and
> extracted, every book web-researched against its canonical sources, each
> subject promoted to a complete researched plan (`status: 'planned'` in
> `src/data/library/books/engineering/<slug>/book.ts`). This file is the
> durable record. **Zero lessons were written — planning only.** The
> book-plans themselves are authored in and emitted by
> `scripts/gen_engineering_shelf.py` (the pass's durable generator).

## Method

The Drive holds **no engineering collection** — its subject subfolders are
MATHS, PHYSICS, CHEMISTRY and _DPPs, and the root-level files were fully
censused by the CS pass (27 CS sources + one duplicate Mano; the maths pass
censused the MATHS subfolder and the root classics — 53 sources). Honest
census: **0 engineering sources on the Drive**; the PHYSICS subfolder is
banked for the future Physics shelf's own pass (engineering books were NOT
mined from it — the engineering canon lives on the open web). Therefore every
engineering book in this pass is **web-researched** (the internet-research
method of the 2026-11-11 math gap pass): every source below was searched and
its TOC/structure actually read during this pass; no TOC line was taken from
memory. URLs recorded below and in `docs/project/SOURCE_LOG.md`.

**The exam anchors — the four GATE 2026 branch syllabi were downloaded and
extracted in full** (the same anchoring the CS pass did for GATE CSE):
`ME_2026_Syllabus.pdf`, `CE_2026_Syllabus.pdf`, `EE_2026_Syllabus.pdf`,
`EC_2026_Syllabus.pdf` from gate2026.iitg.ac.in, `pdftotext`-extracted this
pass (downloaded into `temporary-references/gate2026/`, deleted after the
topic registers below were recorded — the storage law). Their complete
section/topic registers are transcribed in the per-book records below and
drive the whole shelf's coverage map: every GATE line routes to an owning
book.

Recording discipline: the records below carry each source's **complete
chapter-level arc** as read (publisher TOC tabs, Library of Congress catdir
records, Google Books contents, open PDFs, the McGraw-Hill feature pages),
plus the syllabus-audit verdicts. The plans authored from them are original
syntheses in the house manner (positioning + no-duplication contract +
chapters with substantial summaries + plannedLessons); no publisher text was
reproduced.

## The shelf this evidence base planned

**38 books promoted** to `src/data/library/books/engineering/<slug>/book.ts`,
status 'planned', zero lessons written. The census (pinned by
`scripts/verify-engineering-shelf-planning.ts`): **342 chapters / 1,268
planned lessons** across four branches — Mechanical (12 books), Electrical
(8), Electronics & Communication (9), Civil (9).

**Three backlog lines fold honestly onto existing shelf homes** (recorded in
SUBJECT_BACKLOG.md, the CS pass's precedent):
- *Digital Electronics* (ECE) → **digital-logic-design** (the CS shelf's Mano
  arc already absorbed Digital Electronics + Boolean Algebra — one arc, one
  home).
- *Microprocessors & Microcontrollers* (ECE) → **assembly-and-microprocessors**
  (the CS shelf's book already carries the 8085/8086, interfacing 8259/8255 and
  the 8051 microcontroller-era chapters — the full ECE arc).
- *Circuit Theory* + *Network Analysis* (Electrical) → merged into ONE book,
  **circuit-theory-and-network-analysis** (one Van Valkenburg arc, honestly
  merged — two names for one subject).

**One line is ADDED beyond the backlog by the syllabus audit** (the
QA-creation precedent of 2026-11-10, honoured): *Electromagnetic Fields and
Waves* — the GATE 2026 EE Section 3 and EC Section 8 registers (Coulomb to
waveguides) had no home on the backlog's ECE list; the audit created the
book rather than leaving the register homeless.

The per-branch census:

`engineering-mechanics` (10 ch, mech-) · `strength-of-materials` (9, som-) ·
`theory-of-machines` (10, tom-) · `machine-design` (9, md-) ·
`thermodynamics` (11, therm-) · `fluid-mechanics` (10, fluid-) ·
`heat-transfer` (9, ht-) · `manufacturing-processes` (11, mfg-) ·
`industrial-engineering` (8, ie-) · `robotics-and-automation` (8, robot-) ·
`cad-cam` (8, cad-) · `materials-science` (10, mats-) ‖
`circuit-theory-and-network-analysis` (10, ckt-) · `electrical-machines` (8,
emach-) · `power-systems` (10, ps-) · `control-systems` (10, ctrl-) ·
`power-electronics` (8, pe-) · `electrical-measurements` (9, meas-) ·
`high-voltage-engineering` (8, hv-) · `renewable-energy` (7, ren-) ‖
`electromagnetic-fields-and-waves` (10, emf-) ·
`electronic-devices-and-circuits` (9, edc-) · `analog-electronics` (9, ae-) ·
`signals-and-systems` (9, sig-) · `analog-and-digital-communication` (10,
comm-) · `vlsi-design` (10, vlsi-) · `embedded-systems` (8, emb-) ·
`antennas-and-wave-propagation` (8, ant-) · `digital-signal-processing` (8,
dsp-) ‖ `structural-engineering` (10, str-) · `surveying-and-geomatics` (8,
surv-) · `building-materials` (8, bmat-) · `geotechnical-engineering` (10,
soil-) · `transportation-engineering` (8, trans-) ·
`environmental-engineering` (8, env-) · `hydraulics` (9, hyd-) ·
`water-resources-engineering` (9, wr-) · `construction-management` (8, cm-).

All 38 lesson-id prefixes verified unused across the 144 written lesson ids
AND distinct from every Mathematics and CS shelf prefix (gate section E).

# The syllabus anchors, extracted this pass

## GATE 2026 ME — Mechanical Engineering (ME_2026_Syllabus.pdf)

Four sections, extracted in full (the register drives the twelve mechanical
books + cross-references):
- **Section 1 Engineering Mathematics** — linear algebra, calculus,
differential equations, complex variables, probability and statistics,
numerical methods. ROUTED: the Mathematics shelf owns every line
(Mathematical Methods for Engineering, Linear Algebra, Probability Theory,
Statistics, Numerical Analysis — cross-references in each engineering book's
positioning).
- **Section 2 Applied Mechanics and Design** — Engineering Mechanics
(free-body diagrams and equilibrium; friction and its applications including
rolling friction, belt-pulley, brakes, clutches, screw jack, wedge,
vehicles; trusses and frames; virtual work; kinematics and dynamics of rigid
bodies in plane motion; impulse and momentum (linear and angular) and energy
formulations; Lagrange's equation) → **engineering-mechanics** chs 1-10.
Mechanics of Materials (stress and strain, elastic constants, Poisson's
ratio; Mohr's circle for plane stress and plane strain; thin cylinders; shear
force and bending moment diagrams; bending and shear stresses; concept of
shear centre; deflection of beams; torsion of circular shafts; Euler's theory
of columns; energy methods; thermal stresses; strain gauges and rosettes;
testing of materials with universal testing machine; testing of hardness and
impact strength) → **strength-of-materials** chs 1-9. Theory of Machines
(displacement, velocity and acceleration analysis of plane mechanisms;
dynamic analysis of linkages; cams; gears and gear trains; flywheels and
governors; balancing of reciprocating and rotating masses; gyroscope) →
**theory-of-machines** chs 1-9. Vibrations (free and forced vibration of
single degree of freedom systems, effect of damping; vibration isolation;
resonance; critical speeds of shafts) → **theory-of-machines** ch 10.
Machine Design (design for static and dynamic loading; failure theories;
fatigue strength and the S-N diagram; principles of the design of machine
elements such as bolted, riveted and welded joints; shafts, gears, rolling
and sliding contact bearings, brakes and clutches, springs) →
**machine-design** chs 1-9.
- **Section 3 Fluid Mechanics and Thermal Sciences** — Fluid Mechanics
(fluid properties; fluid statics, forces on submerged bodies, stability of
floating bodies; control-volume analysis of mass, momentum and energy; fluid
acceleration; differential equations of continuity and momentum; Bernoulli's
equation; dimensional analysis; viscous flow of incompressible fluids,
boundary layer, elementary turbulent flow, flow through pipes, head losses
in pipes, bends and fittings; basics of compressible fluid flow) →
**fluid-mechanics** chs 1-9. Heat Transfer (modes; one dimensional heat
conduction, resistance concept and electrical analogy, fins; unsteady heat
conduction, lumped parameter system, Heisler's charts; thermal boundary
layer, dimensionless parameters in free and forced convective heat
transfer, correlations for flat plates and pipes, effect of turbulence; heat
exchanger performance, LMTD and NTU; radiation, Stefan-Boltzmann, Wien,
black and grey surfaces, view factors, radiation network analysis) →
**heat-transfer** chs 1-9. Thermodynamics (systems and processes; pure
substances; ideal and real gases; zeroth and first laws; second law;
property charts and tables; availability and irreversibility;
thermodynamic relations) + Applications (power engineering: compressors;
vapour and gas power cycles with regeneration and reheat; I.C. Engines:
air-standard Otto, Diesel and dual; refrigeration and air-conditioning:
vapour and gas cycles, heat pumps, moist air, psychrometric chart; basic
psychrometric processes; turbomachinery: impulse and reaction principles,
velocity diagrams, Pelton-wheel, Francis and Kaplan turbines; steam and gas
turbines) → **thermodynamics** chs 1-11 (the hydraulic-turbine lines
cross-referenced to hydraulics' machines chapters).
- **Section 4 Materials, Manufacturing and Industrial Engineering** —
Engineering Materials (structure and properties; phase diagrams; heat
treatment; stress-strain diagrams) → **materials-science** chs 1-10. Casting,
Forming and Joining (castings, patterns, moulds and cores, solidification,
riser and gating design; plastic deformation and yield criteria; hot and cold
working; bulk and sheet processes; powder metallurgy; welding, brazing,
soldering, adhesive bonding) → **manufacturing-processes** chs 2-9.
Machining and Machine Tool Operations (mechanics of machining; basic machine
tools; tool geometry and materials, tool life and wear; economics of
machining; non-traditional machining; work holding, jigs and fixtures;
abrasive machining; NC/CNC machines and programming) → **manufacturing-
processes** chs 6-11. Metrology and Inspection (limits, fits and tolerances;
linear and angular measurements; comparators; interferometry; form and
finish; alignment and testing; tolerance analysis; CMM) → **manufacturing-
processes** ch 10. Computer Integrated Manufacturing (basic concepts of
CAD/CAM and their integration tools; additive manufacturing) → **cad-cam**
chs 1-8. Production Planning and Control (forecasting models, aggregate
production planning, scheduling, materials requirement planning; lean
manufacturing) + Inventory Control (deterministic models; safety stock) +
Operations Research (linear programming, simplex, transportation,
assignment, network flow models, simple queuing models, PERT and CPM) →
**industrial-engineering** chs 3-7 (with the OR theory cross-referenced to
the Mathematics shelf's optimization-and-operations-research, and PERT/CPM
at construction depth to construction-management).

## GATE 2026 CE — Civil Engineering (CE_2026_Syllabus.pdf)

Seven sections, extracted in full:
- **Section 1 Engineering Mathematics** → the Mathematics shelf (as above).
- **Section 2 Structural Engineering** — Engineering Mechanics (system of
forces, free-body diagrams, equilibrium equations; internal forces in
structures; frictions; centre of mass; free vibrations of undamped SDOF) →
routed to **engineering-mechanics** (mechanical) + theory-of-machines ch 10,
cross-referenced. Solid Mechanics (bending moment and shear force in
statically determinate beams; simple stress and strain; simple bending
theory, flexural and shear stresses, shear centre; uniform torsion,
transformation of stress; buckling of column, combined and direct bending) →
**strength-of-materials**, cross-referenced. Structural Analysis (determinate
and indeterminate by force/energy methods; superposition; trusses, arches,
beams, cables and frames; slope deflection and moment distribution;
influence lines; stiffness and flexibility methods) → **structural-
engineering** chs 5-7. Construction Materials and Management (structural
steel composition, properties and behaviour; concrete constituents, mix
design, short-term and long-term properties; types of construction projects;
PERT and CPM; cost estimation) → **building-materials** + **construction-
management**. Concrete Structures (working stress and limit state design;
beams, slabs, columns; bond and development length; prestressed beams) and
Steel Structures (design of tension/compression members, beams and
beam-columns, column bases; connections simple and eccentric; plate girders
and trusses; plastic analysis concept) → **structural-engineering** chs 8-9.
- **Section 3 Geotechnical Engineering** — Soil Mechanics (three-phase
system and phase relationships; index properties; classification;
permeability, one-dimensional flow; seepage through soils, two-dimensional
flow, flow nets, uplift pressure, piping, capillarity, seepage force;
effective stress and quicksand; compaction; one-dimensional consolidation,
time rate; shear strength, Mohr's circle, effective and total parameters,
stress-strain of clays and sand; stress paths) + Foundation Engineering
(sub-surface investigations: drilling, sampling, plate load test, SPT and
CPT; earth pressure theories Rankine and Coulomb; slope stability, finite
and infinite, Bishop's method; stress distribution Boussinesq; pressure
bulbs; shallow foundations Terzaghi and Meyerhoff bearing capacity, water
table; combined footing and raft; contact pressure; settlement analysis;
deep foundations: dynamic and static formulae, axial load capacity of piles,
pile load test, lateral loading, pile group efficiency, negative skin
friction) → **geotechnical-engineering** chs 1-10 (the whole section).
- **Section 4 Water Resources Engineering** — Fluid Mechanics (properties,
statics; continuity, momentum and energy equations; potential flow, laminar
and turbulent flow; flow in pipes, pipe networks; boundary layer concept;
lift and drag concept) → **fluid-mechanics** (mechanical), cross-referenced.
Hydraulics (forces on immersed bodies; flow measurement in channels and
pipes; dimensional analysis and hydraulic similitude; channel hydraulics —
energy-depth relationships, specific energy, critical flow, hydraulic jump,
uniform flow, gradually varied flow and water surface profiles) →
**hydraulics** chs 2-7. Hydrology (hydrologic cycle, precipitation,
evaporation, evapo-transpiration, watershed, infiltration, unit hydrographs,
hydrograph analysis, reservoir capacity, flood estimation and routing,
surface run-off models, ground water hydrology — steady state well
hydraulics and aquifers; Darcy's Law) + Irrigation (types of systems and
methods; crop water requirements — duty, delta, evapo-transpiration;
gravity dams and spillways; lined and unlined canals; design of weirs on
permeable foundation; cross drainage structures) → **water-resources-
engineering** chs 1-8.
- **Section 5 Environmental Engineering** — Water and Waste Water Quality
and Treatment (basics of water quality standards — physical, chemical,
biological; water quality index; unit processes and operations; water
requirement; water distribution system; drinking water treatment; sewerage
system design, quantity of domestic wastewater, primary and secondary
treatment; effluent discharge standards; sludge disposal; reuse) + Air
Pollution (types of pollutants, sources and impacts, control, standards, AQI
and limits) + Municipal Solid Wastes (characteristics, generation,
collection and transportation; engineered systems: reuse/recycle, energy
recovery, treatment and disposal) → **environmental-engineering** chs 1-8.
- **Section 6 Transportation Engineering** — Transportation Infrastructure
(highway geometric design: cross-sectional elements, sight distances,
horizontal and vertical alignments; railway track: speed and cant; runway
length concept, calculations and corrections; taxiway and exit taxiway
design) + Highway Pavements (highway materials — desirable properties and
tests; bituminous paving mixes; design factors for flexible and rigid
pavements; design using IRC codes) + Traffic Engineering (traffic studies
on flow and speed, peak hour factor, accident study, statistical analysis;
microscopic and macroscopic parameters, fundamental relationships; traffic
signs; signal design by Webster's method; intersections; highway capacity)
→ **transportation-engineering** chs 1-8.
- **Section 7 Geomatics Engineering** — Principles of surveying; errors
and their adjustment; maps — scale, coordinate system; distance and angle
measurement — levelling and trigonometric levelling; traversing and
triangulation; total station; horizontal and vertical curves;
photogrammetry and remote sensing — scale, flying height; basics of remote
sensing and GIS → **surveying-and-geomatics** chs 1-7 (the whole section).

## GATE 2026 EE — Electrical Engineering (EE_2026_Syllabus.pdf)

Ten sections, extracted in full:
- **S1 Engineering Mathematics** → the Mathematics shelf (cross-referenced).
- **S2 Electric Circuits** — network elements, dependent sources; KCL/KVL,
node and mesh; Thevenin, Norton, superposition, maximum power transfer;
transient response of DC and AC networks; sinusoidal steady-state analysis,
resonance; two-port networks; balanced three-phase; star-delta; complex
power and power factor → **circuit-theory-and-network-analysis** chs 1-9.
- **S3 Electromagnetic Fields** — Coulomb's Law, field intensity, flux
density, Gauss's law, divergence; field and potential from point/line/
plane/spherical charges; dielectric medium; capacitance of simple
configurations; Biot-Savart, Ampere, curl, Faraday, Lorentz force;
inductance, MMF, reluctance, magnetic circuits, self and mutual inductance
→ **electromagnetic-fields-and-waves** chs 2-5 (the syllabus-audit book).
- **S4 Signals and Systems** — representation of continuous and discrete
time signals, shifting and scaling; LTI and causal; Fourier series of
continuous and discrete periodic signals; sampling theorem; Fourier
transform applications; Laplace and Z transforms; RMS and average value
for general periodic waveforms → **signals-and-systems** chs 1-9.
- **S5 Electrical Machines** — single-phase transformer (equivalent circuit,
phasor diagram, OC and SC tests, regulation, efficiency); three-phase
transformers (connections, vector groups, parallel operation);
auto-transformer; electromechanical energy conversion; DC machines
(separately excited, series, shunt; motoring and generating; speed control);
three-phase induction (principle, types, performance, torque-speed, no-load
and blocked-rotor tests, equivalent circuit, starting and speed control);
single-phase induction motors; synchronous machines (cylindrical and salient
pole; performance; regulation; parallel operation of generators; starting of
synchronous motors); losses and efficiency → **electrical-machines** chs 1-8.
- **S6 Power Systems** — generation concepts, AC and DC transmission
concepts; models and performance of transmission lines and cables;
economic load dispatch with and without losses; series and shunt
compensation; electric field distribution and insulators; distribution
systems; per-unit; bus admittance matrix; Gauss-Seidel and Newton-Raphson
load flow; voltage and frequency control; power factor correction;
symmetrical components; symmetrical and unsymmetrical faults; over-current,
differential, directional and distance protection; circuit breakers;
stability concepts; equal area criterion → **power-systems** chs 1-10.
- **S7 Control Systems** — modelling and representation; feedback
principle; transfer function; block diagrams and signal flow graphs;
transient and steady-state analysis; Routh-Hurwitz and Nyquist; Bode plots;
root loci; lag, lead and lag-lead compensators; P, PI and PID controllers;
state space model and solution of state equations → **control-systems**
chs 1-10.
- **S8 Electrical and Electronic Measurements** — bridges and
potentiometers; measurement of voltage, current, power, energy and power
factor; instrument transformers; digital voltmeters and multimeters;
phase, time and frequency measurement; oscilloscopes; error analysis →
**electrical-measurements** chs 1-9.
- **S9 Analog and Digital Electronics** — diode circuits (clipping,
clamping, rectifiers); amplifiers (biasing, equivalent circuit, frequency
response); oscillators and feedback amplifiers; op-amps (characteristics
and applications); active filters (Sallen Key, Butterworth); VCOs and timers;
combinational and sequential logic; multiplexers/demultiplexers; Schmitt
triggers; sample and hold; A/D and D/A → split honestly: the diode/
amplifier/op-amp/filter/VCO/ADC lines → **analog-electronics** chs 2-9 +
**electronic-devices-and-circuits** ch 4 (diodes); the combinational/
sequential/MUX lines → the CS shelf's **digital-logic-design** (one Mano
arc, cross-referenced).
- **S10 Power Electronics** — static V-I characteristics and firing/gating
circuits for thyristor, MOSFET, IGBT; buck, boost, buck-boost; single and
three-phase uncontrolled rectifiers; voltage and current commutated
thyristor converters; bidirectional AC-DC voltage source converters;
magnitude and phase of line current harmonics; power factor and distortion
factor; single and three-phase voltage and current source inverters;
sinusoidal PWM → **power-electronics** chs 1-9 (the whole section).

## GATE 2026 EC — Electronics and Communication (EC_2026_Syllabus.pdf)

Eight sections, extracted in full:
- **S1 Engineering Mathematics** → the Mathematics shelf (cross-referenced).
- **S2 Networks, Signals and Systems** — Circuit Analysis (node and mesh;
superposition, Thevenin, Norton, reciprocity; phasors, complex power,
maximum power transfer; time and frequency domain analysis of RL/RC/RLC;
Laplace solution of network equations; linear 2-port parameters; wye-delta)
→ **circuit-theory-and-network-analysis**. Continuous-time Signals (Fourier
series and transform; sampling theorem and applications) and Discrete-time
Signals (DTFT, DFT, z-transform; discrete-time processing of continuous-time
signals) and LTI systems (definition and properties; causality, stability,
impulse response, convolution, poles and zeroes, frequency response, group
delay, phase delay) → **signals-and-systems** chs 4-9 + **digital-signal-
processing** chs 2-3 (the DFT line's algorithmic depth).
- **S3 Electronic Devices** — energy bands in intrinsic and extrinsic
semiconductors, equilibrium carrier concentration, direct and indirect
band-gap; carrier transport (diffusion, drift, mobility, resistivity,
generation and recombination, Poisson and continuity equations); PN junction,
Zener, BJT, MOS capacitor, MOSFET, LED, photo diode and solar cell →
**electronic-devices-and-circuits** chs 1-8 (the whole section).
- **S4 Analog Circuits** — diode circuits (clipping, clamping, rectifiers);
BJT and MOSFET amplifiers (biasing, AC coupling, small-signal analysis,
frequency response); current mirrors and differential amplifiers; op-amp
circuits (amplifiers, summers, differentiators, integrators, active
filters, Schmitt triggers, oscillators) → **analog-electronics** chs 2-7 +
electronic-devices-and-circuits chs 4-6 (the device-level halves).
- **S5 Digital Circuits** — number representations (binary, integer and
floating-point); combinational (Boolean algebra, minimisation by identities
and K-map, logic gates and their static CMOS implementations, arithmetic
circuits, code converters, multiplexers, decoders); sequential (latches and
flip-flops, counters, shift registers, FSMs, propagation delay, setup and
hold time); data converters (sample and hold, ADCs and DACs); semiconductor
memories (ROM, SRAM, DRAM); computer organization (machine instructions,
addressing, ALU, data-path and control, pipelining) → the CS shelf's
**digital-logic-design** (the Mano arc; one home for the digital register)
with the static-CMOS silicon depth cross-referenced from **vlsi-design**
chs 5-6, the converters hosted in **analog-electronics** ch 9, and the
computer-organization lines cross-referenced to the CS shelf's COA.
- **S6 Control Systems** — the identical EE register (one book,
**control-systems**, both papers).
- **S7 Communications** — Random Processes (autocorrelation and PSD; white
noise; filtering of random signals through LTI); Analog Communications
(AM and demodulation; angle modulation and demodulation; spectra of AM and
FM; superheterodyne receivers); Information Theory (entropy, mutual
information, channel capacity theorem); Digital Communications (PCM, DPCM;
ASK, PSK, FSK, QAM; bandwidth; inter-symbol interference; MAP, ML
detection; matched filter; SNR and BER; error correction, Hamming codes,
CRC) → **analog-and-digital-communication** chs 1-10 (the whole section).
- **S8 Electromagnetics** — Maxwell's equations (differential and integral
forms, interpretation, boundary conditions, wave equation, Poynting
vector); plane waves (reflection and refraction, polarisation, phase and
group velocity, propagation through media, skin depth); transmission lines
(equations, characteristic impedance, matching, transformation,
S-parameters, Smith chart); rectangular and circular waveguides; light
propagation in optical fibres; dipole and monopole antennas; linear
antenna arrays → **electromagnetic-fields-and-waves** chs 6-9 (the
Maxwell/waves/lines/guides lines) + **antennas-and-wave-propagation** chs
2-3 (the dipole/monopole/array lines).

# The web-researched canonical arcs, book by book

Every source below was searched and its TOC/structure actually read during
this pass. URLs are recorded here and in SOURCE_LOG.md.

## Mechanical branch

- **Engineering Mechanics** — Hibbeler, *Engineering Mechanics: Statics* SI
  edition (the Pearson TOC PDF read this pass: force vectors, equilibrium of
  a particle, force system resultants, rigid-body equilibrium, structural
  analysis, friction, centres of gravity and centroids, moments of inertia,
  virtual work, plus the dynamics halves' kinematics/kinetics arcs) —
  pearson.de muster TOC; Beer & Johnston, *Vector Mechanics for Engineers*
  (both halves) web-checked as the second pole; Timoshenko & Young named.
  Web-checked 2026-11-16.
- **Strength of Materials** — Beer, Johnston & DeWolf, *Mechanics of
  Materials* (the FULL Library of Congress catdir TOC read this pass —
  concept of stress; stress and strain under axial loading; torsion; pure
  bending; analysis and design of beams for bending; shearing stresses in
  beams; transformations of stress and strain; principal stresses;
  deflection of beams; columns; energy methods) — catdir.loc.gov
  ecip0811/2008007412. Gere & Goodno web-checked as the second pole;
  Timoshenko named.
- **Theory of Machines** — Khurmi & Gupta, *Theory of Machines* (the Google
  Books contents read this pass: kinematics of motion; kinetics of motion;
  simple harmonic motion; simple mechanisms; velocity in mechanisms by
  instantaneous centres; cams; toothed gearing; gear trains; gyroscopic
  couple; inertia forces; turning moment diagrams and flywheels;
  governors; brakes and dynamometers) plus Rattan's *Theory of Machines*
  named as the second pole. Web-checked 2026-11-16.
- **Machine Design** — Shigley's *Mechanical Engineering Design* (Budynas &
  Nisbett — the Parts I-IV arc read this pass via the publisher TOC page:
  Introduction; Materials; Load and Stress Analysis; Deflection and
  Stiffness; Failures from Static Loading; Fatigue Failure from Variable
  Loading; then the elements — shafts, fasteners, welding, springs,
  bearings, gears, clutches and brakes) + Khurmi's *Machine Design* (the
  Indian pole, 30+ element chapters confirmed via the open PDF contents
  read this pass). Web-checked 2026-11-16.
- **Thermodynamics** — Cengel & Boles, *Thermodynamics: An Engineering
  Approach* 10e (the FULL 18-chapter TOC read this pass from the
  McGraw-Hill feature page: Introduction and Basic Concepts; Energy,
  Energy Transfer; Properties of Pure Substances; Energy Analysis of
  Closed Systems; Control Volumes; The Second Law; Entropy; Entropy
  Analysis; Exergy; Gas Power Cycles; Vapour and Combined Power Cycles;
  Refrigeration Cycles; Thermodynamic Property Relations; Gas Mixtures;
  Gas-Vapour Mixtures and Air-Conditioning; Chemical Reactions; Chemical
  and Phase Equilibrium; Compressible Flow) — mheducation.co.uk.
  Sonntag & Borgnakke named as the second pole. Web-checked 2026-11-16.
- **Fluid Mechanics** — Cengel & Cimbala, *Fluid Mechanics: Fundamentals and
  Applications* (the chapter arc read this pass from the open TOC:
  Introduction and Basic Concepts; Properties of Fluids; Pressure and Fluid
  Statics; Fluid Kinematics; Bernoulli and Energy Equations; Momentum
  Analysis; Dimensional Analysis; Internal Flow; Differential Analysis;
  Approximate Solutions; External Flow; Compressible Flow; Open-Channel
  Flow noted as the civil handoff) + Modi & Sethi, *Hydraulics, Fluid
  Mechanics and Hydraulic Machines* (the 21st-edition contents read this
  pass — Properties of Fluids; Fluid Pressure and Its Measurement; the
  29-chapter organisation across Fluid Mechanics, Hydraulics and Hydraulic
  Machines) + Bansal named. Web-checked 2026-11-16.
- **Heat Transfer** — Incropera, DeWitt, Bergman & Lavine, *Fundamentals of
  Heat and Mass Transfer* 8e (the Wiley TOC page read this pass — the
  conduction chapters 2-5, convection foundations, boiling and condensation,
  heat exchangers, radiation exchange, diffusion mass transfer) + Cengel's
  *Heat and Mass Transfer* named as the second pole; Holman named.
  Web-checked 2026-11-16.
- **Manufacturing Processes** — Kalpakjian & Schmid, *Manufacturing
  Engineering and Technology* 7e (the Pearson TOC tab read this pass:
  The Structure of Metals; Mechanical Behavior, Testing, and Manufacturing
  Properties; Fundamentals of Metal Casting; casting technology; the bulk
  forming family; sheet forming; machining; abrasive; non-traditional;
  joining) + Groover, *Fundamentals of Modern Manufacturing* named as the
  second pole. Web-checked 2026-11-16.
- **Industrial Engineering** — Kanishka Bedi, *Production and Operations
  Management* (the second-edition TOC web-checked this pass) and Martand
  Telsang, *Industrial Engineering and Production Management* named as the
  Indian canonical pair; O.P. Khanna named. The OR theory cross-referenced
  through the Mathematics shelf's Hillier/Taha arcs (no duplication).
  Web-checked 2026-11-16.
- **Robotics and Automation** — Craig, *Introduction to Robotics: Mechanics
  and Control* 4e (the Pearson TOC read this pass: Introduction; Spatial
  Transformations; Forward Kinematics; Inverse Kinematics; Velocities,
  Static Forces, and Manipulator Jacobians; Dynamics; Trajectory
  Generation; the control chapters) + Groover, *Automation, Production
  Systems, and CIM* (the Pearson TOC tab read this pass — the automation
  and control-technologies parts) + Spong named as the second pole.
  Web-checked 2026-11-16.
- **CAD/CAM** — Groover, *Automation, Production Systems, and Computer-
  Integrated Manufacturing* (the CAD/CAM chapters inside the automation
  parts; numerical control; additive manufacturing named in the modern
  editions) + Zeid, *CAD/CAM Handbook* named as the depth pole; the NURBS
  arc cross-checked against the Mathematics shelf's coordinate-geometry
  spline lessons. Web-checked 2026-11-16.
- **Materials Science** — Callister & Rethwisch, *Materials Science and
  Engineering: An Introduction* 10e (the chapter arc read this pass via the
  publisher TOC listing: Introduction; Atomic Structure and Interatomic
  Bonding; The Structure of Crystalline Solids; Imperfections; Diffusion;
  Mechanical Properties; Dislocations and Strengthening; Failure; Phase
  Diagrams; Phase Transformations; Applications of Iron-Carbon alloys;
  Corrosion; the materials families) + Raghavan named as the Indian pole.
  Web-checked 2026-11-16.

## Electrical branch

- **Circuit Theory and Network Analysis** — Van Valkenburg, *Network
  Analysis* (the classic arc web-checked this pass — Development of the
  Circuit Concept; Conventions for Describing Networks; the theorem and
  Laplace/K-transform chapters; two-ports; the synthesis chapters named as
  the deeper tail) via Google Books and the open listings; Chakrabarti's
  *Circuit Theory* named as the Indian pole; Hayt & Kemmerly's
  *Engineering Circuit Analysis* named as the third pole. Web-checked
  2026-11-16.
- **Electrical Machines** — P.S. Bimbhra, *Electrical Machinery* (the Indian
  canonical arc web-checked this pass — the transformers + DC + synchronous
  + induction organisation confirmed; the seventh-edition scope read via the
  open listings) + Nagrath & Kothari, *Electric Machines* named as the
  second pole; Fitzgerald, Kingsley & Umans named as the depth pole.
  Web-checked 2026-11-16.
- **Power Systems** — Stevenson & Grainger, *Power System Analysis* (the
  FULL 16-chapter TOC read this pass from the Library of Congress catdir
  record: Basic Concepts; Transformers; The Synchronous Machine; Series
  Impedance of Transmission Lines; Capacitance of Transmission Lines;
  Current and Voltage Relations on a Transmission Line; The Admittance
  Model and Network Calculations; The Impedance Model and Network
  Calculations; Power Flow Solutions; Symmetrical Faults; Symmetrical
  Components and Sequence Networks; Unsymmetrical Faults; Economic
  Operation of Power Systems; Zbus Methods in Contingency Analysis; State
  Estimation; Power System Stability) — catdir.loc.gov mh022/93039219 +
  Wadhwa named as the Indian pole; Glover & Sarma named. Web-checked
  2026-11-16.
- **Control Systems** — Ogata, *Modern Control Engineering* (the chapter
  arc web-checked this pass via the Pearson TOC and the open preface PDFs:
  Introduction to Control Systems; Mathematical Modeling; Transient-Response
  Analysis; Root-Locus Analysis; Frequency-Response Analysis; Control
  Systems Design; the PID chapters; Control Systems Analysis in State
  Space) + Nagrath & Gopal named as the Indian pole; Nise named.
  Web-checked 2026-11-16.
- **Power Electronics** — Rashid, *Power Electronics: Circuits, Devices
  and Applications* (the chapter arc web-checked this pass — the device
  chapters, rectifiers, choppers, inverters, the application chapters) +
  Bimbhra, *Power Electronics* named as the Indian pole; Mohan, Undeland &
  Robbins named as the depth pole. Web-checked 2026-11-16.
- **Electrical Measurements** — A.K. Sawhney, *A Course in Electrical and
  Electronic Measurements and Instrumentation* (the Indian canonical arc
  web-checked this pass — the measurement-systems, bridges, potentiometers
  and CRO organisation confirmed through the open listings) + S.K.
  Bhattacharya's edition named as the second pole; Golding & Widdis named
  as the classic pole. Web-checked 2026-11-16.
- **High Voltage Engineering** — Naidu & Kamaraju, *High Voltage
  Engineering* (the arc web-checked this pass — Conduction and Breakdown in
  Gases; Liquid Dielectrics; Solid Dielectrics; Applications of Insulating
  Materials; Generation of High Voltages and Currents; Measurement of High
  Voltages; the testing and overvoltage chapters confirmed through the
  Scribd/open listings) + Kuffel, Zaengl & Kuffel named as the depth pole.
  Web-checked 2026-11-16.
- **Renewable Energy** — Boyle, *Renewable Energy: Physics, Engineering,
  Environmental Impacts, Economics & Planning* (the fourth-edition front
  matter and Google Books structure read this pass — Part I the basic
  scientific principles; the solar/wind/bioenergy/hydro chapters; the
  integration and planning parts) + Tiwari named as the Indian pole.
  Web-checked 2026-11-16.

## Electronics & Communication branch

- **Electromagnetic Fields and Waves** (the syllabus-audit book) — Hayt &
  Buck, *Engineering Electromagnetics* (the chapter arc web-checked this
  pass: Vector Analysis; Coulomb's Law and Electric Field Intensity; Gauss's
  Law and the Divergence; Energy and Potential; Conductors and Dielectrics;
  Capacitance; The Steady Magnetic Field; Magnetic Forces and Materials;
  Time-Varying Fields and Maxwell's Equations; the transmission-line
  chapters; the plane-wave chapters; waveguides and the antennas chapter
  noted) + Sadiku named as the second pole; Jordan & Balmain named for
  waves. Web-checked 2026-11-16.
- **Electronic Devices and Circuits** — Boylestad & Nashelsky, *Electronic
  Devices and Circuit Theory* 11e (the TOC read this pass from the
  open-PDF contents: Semiconductor Diodes; Diode Applications; Bipolar
  Junction Transistors; DC Biasing; Field-Effect Transistors; FET Biasing;
  BJT and FET Amplifiers; the op-amp chapters noted as the analog route) +
  Millman & Halkias named as the classic pole; Sedha and Salivahanan named
  as the Indian poles. Web-checked 2026-11-16.
- **Analog Electronics** — the Indian canonical arcs web-checked (Sedha's
  *Analog Electronics*; Millman & Halkias' *Integrated Electronics*; Boylestad's
  op-amp chapters read in its open TOC) + Razavi, *Design of Analog CMOS
  Integrated Circuits* named as the depth pole. Web-checked 2026-11-16.
- **Signals and Systems** — Oppenheim, Willsky & Nawab, *Signals and
  Systems* 2e (the TOC read this pass from the Pearson page: Signals and
  Systems; LTI Systems; Fourier Series; the continuous-time and
  discrete-time Fourier transforms; Sampling; the Laplace and z transforms;
  the communication and control applications chapters noted) + Haykin
  named as the second pole; Lathi named. Web-checked 2026-11-16.
- **Analog and Digital Communication** — Haykin & Moher, *Communication
  Systems* 5e (the TOC read this pass from the Wiley page and the open
  Indian-adaptation contents: Introduction; Representation of Signals and
  Systems; Amplitude Modulation; Angle Modulation; the sampling and pulse
  chapters; digital band-pass modulation; fundamental limits in
  information theory; error-control coding) + Proakis & Salehi named as the
  second pole; Lathi and Taub & Schilling named. Web-checked 2026-11-16.
- **VLSI Design** — Weste & Harris, *CMOS VLSI Design: A Circuits and
  Systems Perspective* 4e (the chapter arc web-checked this pass from the
  publisher page and the open front-matter PDF: Introduction; MOS Transistor
  Theory; CMOS Processing Technology; the four new chapters Delay, Power,
  Interconnect and Robustness confirmed as 4-7; the combinational and
  sequential design chapters; Datapath and Array Subsystems; Design
  Methodology and Tools) + Kang & Leblebici named as the Indian-course
  pole; Rabaey named. Web-checked 2026-11-16.
- **Embedded Systems** — Raj Kamal, *Embedded Systems: Architecture,
  Programming and Design* (the arc web-checked this pass — the 8051 and
  processor chapters, the RTOS chapters 8-12, the design chapters 6/13/14
  confirmed via the open-PDF contents and Google Books) + Barr named as the
  practice pole. Web-checked 2026-11-16.
- **Antennas and Wave Propagation** — Balanis, *Antenna Theory: Analysis
  and Design* 4e (the TOC web-checked this pass: Antennas; Fundamental
  Parameters; Radiation Integrals; the linear wire family; loops; arrays;
  aperture; horns and reflectors; microstrip; the smart-antenna chapter;
  measurements) + K.D. Prasad, *Antenna and Wave Propagation* named as the
  Indian pole (the propagation chapters' home in the Indian canon) +
  Jordan & Balmain named. Web-checked 2026-11-16.
- **Digital Signal Processing** — Proakis & Manolakis, *Digital Signal
  Processing* (the TOC read this pass from the open-PDF contents:
  Introduction; Discrete-Time Signals and Systems; the z-transform; the
  frequency-domain chapters; the DFT and its efficient computation; the
  FIR and IIR design chapters; filter structures; sampling and
  reconstruction; multirate) + Oppenheim & Schafer named as the depth
  pole; Salivahanan named as the Indian pole. Web-checked 2026-11-16.

## Civil branch

- **Structural Engineering** — Hibbeler, *Structural Analysis* (the TOC
  web-checked this pass from the Pearson page: types of structures and
  loads; determinacy and stability; analysis of statically determinate
  structures; deflections; influence lines; the force and displacement
  methods; the stiffness-matrix chapters) + Vazirani & Ratwani and
  Ramamrutham named as the Indian poles; the IS 456 and IS 800 design
  arcs named for the design half (Punmia's RCC Design named).
  Web-checked 2026-11-16.
- **Surveying and Geomatics** — Punmia's *Surveying* Vol. I (the arc
  web-checked this pass — the 24-chapter organisation confirmed through
  Google Books and the open listings; the tacheometric chapter confirmed) +
  Bannister named as the second pole; K.R. Arora and Chandra's Higher
  Surveying named. Web-checked 2026-11-16.
- **Building Materials** — Punmia's Building Construction materials arc +
  S.K. Duggal, *Building Materials* (the Indian canonical arcs web-checked
  this pass — the stones/bricks/cement/timber/paints organisation
  confirmed through the open listings) + P.C. Varghese named; M.S. Shetty,
  *Concrete Technology* named as the concrete pole. Web-checked 2026-11-16.
- **Geotechnical Engineering** — V.N.S. Murthy, *Geotechnical Engineering*
  + Gopal Ranjan & A.S.R. Rao, *Basic and Applied Soil Mechanics* (the
  Indian canonical arcs web-checked this pass) + B.M. Das named as the
  standard pole; Terzaghi, Peck & Mesri named as the classic.
  Web-checked 2026-11-16.
- **Transportation Engineering** — Khanna & Justo, *Highway Engineering*
  (the Indian canonical arc web-checked this pass) + Kadiyali named as the
  second pole; the IRC census (IRC 37, 58, 73 named) noted for authoring
  time; the railway and airport chapters served by their standard Indian
  arcs (Saxena & Arora named). Web-checked 2026-11-16.
- **Environmental Engineering** — S.K. Garg, *Water Supply Engineering*
  and *Sewage Disposal and Air Pollution Engineering* (the volume
  organisation web-checked this pass through the open listings) + Davis &
  Cornwell, *Introduction to Environmental Engineering* named as the
  standard pole; Metcalf & Eddy named as the depth pole; Peavy named.
  Web-checked 2026-11-16.
- **Hydraulics** — Modi & Sethi, *Hydraulics, Fluid Mechanics and Hydraulic
  Machines* (the 21st-edition contents read this pass — the machine
  chapters routed here, the fundamentals to fluid-mechanics) + Bansal named
  as the second pole; Chow's *Open-Channel Hydraulics* named as the depth
  pole. Web-checked 2026-11-16.
- **Water Resources Engineering** — K. Subramanya, *Engineering Hydrology*
  (the Indian canonical arc web-checked this pass) + S.K. Garg,
  *Irrigation Engineering and Hydraulic Structures* named as the
  structures pole + Linsley named as the standard pole; Punmia's
  *Irrigation* named. Web-checked 2026-11-16.
- **Construction Management** — Chitkara, *Construction Project
  Management* (the Indian canonical arc web-checked this pass) + Punmia,
  *Project Planning and Control with PERT and CPM* named as the network
  pole + Peurifoy named as the international pole; Harris named.
  Web-checked 2026-11-16.

# Cross-shelf routing notes (the honest contracts)

1. **Engineering Mathematics** (every GATE paper's Section 1) is wholly owned
   by the Mathematics shelf — `mathematical-methods-for-engineering`,
   `linear-algebra`, `probability-theory`, `statistics`,
   `numerical-analysis` — cross-referenced in each engineering book's
   positioning; ZERO duplication.
2. **Digital Electronics / Digital Circuits** lines (GATE EE S9 + EC S5) are
   owned by the CS shelf's `digital-logic-design` (one Mano arc) — the ECE
   backlog line folds there; VLSI Design grows the static-CMOS silicon depth.
3. **Microprocessors & Microcontrollers** (ECE) is owned by the CS shelf's
   `assembly-and-microprocessors` (the 8085/8086, 8259/8255 interfacing and
   the 8051/microcontroller chapters verified in its plan this pass); the
   ECE line folds there; `embedded-systems` owns the systems view.
4. **Circuit Theory + Network Analysis** merge into one book (one Van
   Valkenburg arc — the fold recorded in SUBJECT_BACKLOG.md).
5. **Hydraulic machines / turbomachinery**: the GATE ME 'Turbomachinery'
   line (Pelton, Francis, Kaplan; steam and gas turbines) is served jointly
   — hydraulic turbines in `hydraulics` (the civil shelf, the Modi-Sethi
   home), steam/gas turbines in `thermodynamics`' applications chapters,
   with the velocity-triangle craft cross-referenced from
   `fluid-mechanics` ch 10.
6. **Fluid Mechanics fundamentals vs Hydraulics**: the mechanical shelf's
   `fluid-mechanics` owns the fundamentals (statics, kinematics, control
   volume, viscous flow, boundary layer, compressible); the civil
   `hydraulics` owns measurement, similitude at civil scale, open-channel
   flow and the machines — the contract stated in both headers.
7. **PERT/CPM**: the network theory routes to the Mathematics shelf's
   `optimization-and-operations-research` (Hillier/Taha); the construction
   idiom lives in `construction-management`; the production idiom in
   `industrial-engineering` — three honest layers, no duplication.
8. **Materials Science (mechanical) vs Building Materials (civil)**: the
   former owns the structure-property story for engineering materials; the
   latter owns the construction census (stone, brick, cement, timber,
   bitumen) — the contract stated in both headers. The future Chemistry
   shelf's 'Materials' backlog line will route here (cross-reference when
   planned).
9. **The future Physics shelf** (backlog lines: Mechanics, Heat and
   Thermodynamics, Fluid Mechanics, Solid-State...) will need its own
   no-duplication audit when planned — this pass names the tension
   honestly (engineering owns the engineering-application canon; the physics
   books will own the physics depth; FIRST-SHIPPED-STANDS applies).
10. **The 'Also investigate' engineering lines** (aerospace, chemical,
    biomedical, automobile, mining, agricultural, nuclear) remain honestly
    unplanned — future passes by directive, exactly as the backlog states.

# The exam-topic ledger note

The GATE 2026 ME/CE/EE/EC syllabi above are transcribed in full in this
survey and every topic line routes to an owning book — the planning-level
guarantee. The formal **exam-topic ledger gate** (the CS pass's
`verify-cs-exam-coverage.ts` pattern — a registry-keyed topic ledger with
coverage maps) is recorded as the natural NEXT directive: adding
GATE ME/CE/EE/EC entries to EXAM_REGISTRY.json with researched sections is
its own pass (the CS planning pass → CS exam-coverage pass precedent of
2026-11-15). EXAM_REGISTRY.json's note field records this honestly; the
registry entries are unchanged this pass.

**Lesson-level census: 38 books / 342 chapters / 1,268 planned lessons, zero
written. The gate: `scripts/verify-engineering-shelf-planning.ts`.**
