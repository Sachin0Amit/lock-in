#!/usr/bin/env python3
"""Dup-cluster adjudication for engineering-a (clusters touching my 16 books)."""
import json

dup = json.load(open('work/mine_dup.json'))

D = []

# keep-both list (cluster index -> reason)
KB = {
 3: "Protects the authored thermodynamics lesson 'Specific Heats and Enthalpy': the engineering-thermo treatment of specific heats is genuinely different from chemistry/physics-side specific-heat and experimental-skills lessons; all other members are junk removed individually.",
 4: "Protects three authored titles — 'Conversions and Equivalent Circuits' (circuit-theory ch9, two-port parameter conversions), 'The Equivalent Circuit Earned' (electrical-machines ch2, transformer) and 'The Equivalent Circuit Identified' (electrical-machines ch5, induction machine): genuinely different equivalent-circuit treatments; remaining members are concatenated junk removed individually.",
 5: "Protects the authored statics lesson 'Moments of Inertia and the Parallel-Axis Theorem' (area moments for centroids/inertia); the physics 'Guided Practice' page-run members are junk removed by their own agents.",
 8: "Protects 'The Ideal Gas and Its Honest Limits' (engineering thermodynamics ch3); deviation-from-ideality is separately owned by the chemistry/physics-side books — genuinely different syllabus treatments.",
 9: "Spurious match: 'Simple and Compound Trains' (theory-of-machines ch6 gearing) has nothing to do with quantitative-aptitude/chemistry syllabus lines. Keep the authored gear-train lesson; junk members removed individually.",
 11: "Spurious phrase match on 'degrees of freedom': robotics anatomy, Gruebler mechanism DoF and analytical-mechanics action-angle variables are three genuinely different treatments. All authored members stand.",
 16: "Protects 'Conservative Forces and Energy Bookkeeping' (engineering-mechanics ch9): the engineering work-energy treatment is genuinely different from the physics conservative-forces treatment.",
 19: "Protects two authored kinetics lessons ('Angular Momentum and the Gyroscopic Glimpse', 'Linear and Angular Impulse-Momentum') — engineering kinetics treatments distinct from the physics angular-momentum lesson.",
 26: "Book-specific synthesis lessons ('The Synthesis and Doorsteps' in power-systems, geotechnical, building-materials, transportation) are each book's own capstone — genuinely different content, keep-both.",
 27: "Spurious match on 'Distances': 'Distance Protection in the R-X Plane' is power-systems protection content, unrelated to coordinate geometry.",
 28: "Protects 'Damped Oscillation and the Quality Factor' (circuit-theory ch5): the circuit-resonance Q treatment is genuinely different from the physics damped-oscillation and differential-equations treatments.",
 29: "Protects both authored titles: 'Regulation and All-Day Efficiency' (transformer, electrical-machines ch2) and 'Regulation and Efficiency' (transmission line, power-systems ch4) — genuinely different regulation treatments.",
 31: "Protects two distinct intra-book lessons ('The Free-Body Diagram...' and 'The Kinetic Diagram Beside the Free-Body'); the physics 'Free-Body Ledger' is the physics-side treatment.",
 33: "Protects 'Rotation About a Fixed Axis' (engineering plane kinematics); the physics rotation-dynamics treatment is genuinely different.",
 34: "Protects 'Plane Motion of Rigid Bodies' and 'Impact of Rigid Bodies' — distinct kinetics lessons within engineering-mechanics.",
 36: "Spurious match: 'The Stress-Strain Diagram, Read Honestly' (strength-of-materials) is unrelated to the physics momentum/collisions page-run.",
 37: "Protects 'The Relative-Velocity Method' (mechanism velocity analysis); the physics relative-velocity treatment is genuinely different.",
 39: "Protects the authored Rankine/Brayton improvement lessons ('Regeneration, Reheat, Intercooling', 'Reheat and Regeneration') — the thermodynamics specialist owns the power-plant cycle treatment; the structural-engineering syllabus dump is junk to remove.",
 40: "Book-specific doorstep lessons ('The Doorsteps: Grid, Drive, Renewables' in electrical-machines, 'The Doorsteps: Solar, Grids, Silicon' in heat-transfer) are each book's own synthesis — genuinely different content.",
 42: "Protects 'Euler Angles and Their Singularity' (robotics spatial descriptions); the mechanics-book appendix on alternate conventions is the analytical-mechanics treatment — genuinely different.",
 43: "Two authored 'The Applications Census' lessons (cad-cam ch6 additive manufacturing; circuit-theory ch9 two-port applications) are genuinely different content.",
 44: "Protects 'Sources, Ideal and Dependent' (circuit-theory ch1); the materials-science member is a junk line removed individually.",
 45: "Protects 'The Passive Sign Convention as Law' (circuit-theory ch1); optics/particle-physics sign conventions are different topics matched only on words.",
 47: "Protects 'Series and Shunt Compensation' (power-systems ch4): transmission compensation is unrelated to the wideband-amplifier junk members, which are removed individually.",
 48: "Spurious match: 'The Moment-Area Theorems' (beam deflection) is unrelated to the vector cross-product lesson.",
 50: "Protects 'Newton-Raphson and the Jacobian' (power-systems load flow); the numerical-analysis Newton-Raphson lesson is the pure-math treatment — genuinely different syllabus treatments.",
 51: "Protects 'Base Conversion Worked' (per-unit base conversion, power-systems ch2); number-base conversion in digital-logic/arithmetic is a different topic matched only on words.",
 52: "Spurious match: 'Vector Groups by the Clock' (transformer vector groups) vs distributed-systems 'Vector Clocks' — different topics sharing two words.",
 57: "Protects 'Equilibrium of the Rigid Body' (engineering statics); the physics torque-balance lesson is the physics-side treatment.",
 58: "Protects 'Belt-Pulley Systems and Brake/Clutch Friction' (engineering friction applications); the physics pulley lesson is a different treatment.",
 60: "Protects 'Generalised Coordinates and Constraints' (engineering-mechanics ch10 Lagrange); the physics analytical-mechanics copy is the theory-side treatment — genuinely different syllabus treatments.",
 61: "Two authored stress-concentration lessons: 'Stress Concentration in Design' (machine-design ch2) and 'Saint-Venant, Stress Concentrations, Multiaxial Loading' (strength-of-materials ch3) — the design-scoped and materials-scoped treatments are genuinely different.",
 63: "'The Standards Census' in machine-design (design codes/standards) vs environmental-chemistry (environmental standards) are different topics matched on words.",
 68: "Spurious match: Heisler charts (unsteady conduction, heat-transfer ch4) vs psychrometric chart (thermodynamics ch10) are different chart-craft lessons.",
 69: "Protects 'The Process Census' (psychrometric processes, thermodynamics ch10); the operations-management process census is the business-side treatment.",
 70: "Both authored nozzle lessons stand: fluid-mechanics ch9 owns the compressible-flow treatment (area-Mach, shocks) and thermodynamics ch11 owns the steady-flow-device/property-relations treatment — genuinely different syllabus treatments, both books own a chapter for it in the legend.",
 71: "Protects 'Viscosity: Newton's Law and Its Census' (fluid-mechanics ch1 fluid property); the physics 'Newton's Viscosity Law' is the properties-of-matter treatment — genuinely different.",
 82: "'Six Sigma Named Honestly' (industrial-engineering ch7 quality-control statistics) and the operations-management register are the engineering-statistical and business-management treatments of Six Sigma — genuinely different syllabus treatments; keep-both.",
 84: "'Density Arithmetic' in materials-science (unit-cell/theoretical density from crystallography) vs building-materials (bulk density of construction materials) are genuinely different calculations.",
 85: "'Arrhenius and Activation Energy' (materials-science ch5 diffusion) vs the physical-chemistry kinetics Arrhenius lesson are genuinely different treatments.",
 86: "'The Hardness Census' in materials-science (indentation hardness testing) vs industrial-chemistry (water hardness) are different topics sharing a word; keep-both.",
 87: "Spurious match: 'Steels and Cast Irons' (materials-science ch9) vs the inorganic-chemistry metallurgy survey page-run.",
 88: "'Corrosion Forms and Prevention' (materials-science ch10) is the corrosion-engineering treatment; the physical-chemistry 'Prevention of Corrosion' lesson is the electrochemistry-side treatment — genuinely different syllabus treatments.",
 89: "Protects 'The Mesh-Current Engine' (circuit-theory ch2); the embedded-systems member is a concatenated junk line removed by its agent.",
 92: "Protects 'The Ideal Transformer at Circuit Level' (circuit-theory ch5 coupled-circuits treatment); the electrical-machines member is a junk page-run removed individually.",
 95: "'The Component Census' (control-systems ch1) and the statistics-for-economics component census are different topics matched on words.",
}

# consolidate with a real specialist winner (cluster index -> (winner, reason))
CS = {
 2: ("analog-electronics","Emitter-follower/amplifier TOC-run copies across my books are junk removed individually; the amplifiers treatment is owned by analog-electronics (ch2 Differential and Multistage Amplifiers)."),
 7: ("analog-electronics","Current-mirror copies in my books are junk strays; current mirrors are owned by analog-electronics ch2."),
 12: ("electricity-and-magnetism","Magnetic-field calculation lines are E&M content; the power-systems member is a stray page-run removed individually."),
 17: ("digital-logic-design","Flip-flop triggering is owned by digital-logic-design ch6 Sequential Logic; the power-systems member ('Single-pulse generation with flip-flops and counters') is junk removed individually."),
 22: ("fluid-mechanics","The impulse-vs-reaction turbine principle is owned by fluid-mechanics ch10 The Turbomachinery Principle and the Doorstep; the theory-of-machines 'Turbo Machinery' member is an ESE syllabus dump removed individually. The hydraulics copy belongs to engineering-b's scope but the specialist winner is fluid-mechanics."),
 24: ("thermodynamics","Refrigeration and air-conditioning are the engineering-thermodynamics applied-cycles treatment (ch9 Vapour-Compression Refrigeration, ch10 Air-Conditioning Priced); the industrial-engineering copy is an ESE syllabus dump removed individually. manufacturing-processes 'Beam and Jet Processes' is an unrelated non-traditional-machining lesson and stands."),
 30: ("computer-organization-architecture","The computer-organization syllabus dump is covered by the specialist book; the industrial-engineering copy is removed individually."),
 41: ("analog-electronics","Transimpedance-amplifier bandwidth is analog-electronics territory; the manufacturing-processes member ('Limiting the bandwidth') is a stray removed individually."),
 46: ("circuit-theory-and-network-analysis","Phasor addition/subtraction is ch4 Sinusoidal Steady State's own authored treatment ('Phasors: the Coordinate Change'); the two Hughes TOC fragments in my book are junk removed individually."),
 49: ("digital-logic-design","Karnaugh-map minimization is owned by digital-logic-design ch3; the engineering-mechanics copy is junk removed individually. The discrete-mathematics copy is the math-side treatment for those agents to settle."),
 53: ("cad-cam","The digital twin belongs with the digital thread as the Industry 4.0 product-lifecycle capstone (cad-cam ch8 'Industry 4.0 and the Synthesis'); the internet-of-things copy (ch4 The Edge and Cloud Partnership) re-teaches the same concept on the cloud side and should reference rather than duplicate. IoT is engineering-b/CS territory, but the specialist winner is cad-cam."),
 73: ("fluid-mechanics","Specific speed (the turbomachine-selection compass) is the core of fluid-mechanics ch10 The Turbomachinery Principle and the Doorstep; the hydraulics copy (engineering-b's book) duplicates it."),
 75: ("electronic-devices-and-circuits","Semiconductor diffusion current is EDC ch2 Carrier Transport content; the heat-transfer member is a junk line removed individually."),
 77: ("electronic-devices-and-circuits","Optocouplers are optoelectronic devices owned by EDC (diode/optoelectronic chapters); both my members ('I: Phototransistor output optocouplers', 'II: Logic-output optocouplers') are AoE strays removed individually."),
 78: ("analog-electronics","Output stages (Class A/AB) are owned by analog-electronics ch2; the industrial-engineering member is a page-run junk removed individually."),
 80: ("industrial-engineering","The lean-waste census is the engineering-side treatment in industrial-engineering ch4 'Scheduling, MRP and Lean'; the operations-management copy (economics-commerce discipline) is the business-side duplicate for that agent to drop or differentiate."),
 81: ("analog-electronics","Linear regulator circuits (317-style) are analog-electronics power-supply territory; the industrial-engineering member is junk removed individually."),
 83: ("analog-electronics","Flash-ADC copies in control-systems and robotics are AoE strays removed individually; data conversion is owned by analog-electronics ch9 'Data Conversion and the Doorstep'."),
 91: ("analog-electronics","Active filter design is owned by analog-electronics ch5 Active Filters; the circuit-theory member is a concatenated junk line removed individually."),
}

# junk-only clusters -> consolidate with empty winner (nothing worth keeping anywhere)
JO = {
 0: "Junk-only mega-cluster of Irwin/Hughes boilerplate and page-run TOC lines; every member in my books is removed individually (misplaced/extra/auto) and the other books' members are cross-book junk for their own agents. No genuine topic exists to consolidate.",
 1: "Junk-only cluster (review-exercise page runs); my member is back-matter junk removed individually.",
 6: "Junk-only cluster ('A Closer Look' section runs); my robotics member is a concatenated junk line removed individually.",
 10: "Junk-only cluster (growth/decay page runs); RL-RC transient content is covered by circuit-theory ch7 Transients. All my members removed individually.",
 13: "Junk-only cluster (CRO page-run strays); the oscilloscope treatment lives in electrical-measurements ch2 Indicating Instruments, but no member here is a real lesson. All my members removed individually.",
 14: "Junk-only cluster (graphical-representation fragments); my members are cut-off fragments removed individually.",
 15: "Junk-only cluster (appendix page runs); my member removed individually.",
 18: "Junk-only cluster (appendix-table runs); all my members removed individually.",
 20: "Junk-only cluster (AoE example fragments); my members removed individually.",
 21: "Junk-only cluster ('final remark' fragments); my members removed individually.",
 23: "Junk-only cluster; the theory-of-machines member is a concatenated circuits junk line removed individually.",
 25: "Junk-only cluster; the industrial-engineering member ('Some DAC application examples') is AoE junk removed individually.",
 32: "Junk-only cluster (contents-page strays); my members removed individually.",
 35: "Junk-only cluster (appendix runs); complex-number arithmetic is owned by advanced-algebra/complex-analysis — no member is a real lesson.",
 38: "Junk-only cluster; transformer analysis is owned by electrical-machines ch2's authored lessons — every member here is a concatenated junk line removed individually.",
 54: "Junk-only cluster (publisher URL lines); my member removed individually.",
 55: "Junk-only cluster; my member removed individually.",
 56: "Junk-only cluster (contents-page strays).",
 59: "Junk-only cluster; both members (engineering-mechanics, theory-of-machines) are computer-hardware TOC strays removed individually; bus architecture is owned by computer-organization-architecture.",
 62: "Junk-only cluster (fiber-module strays); my theory-of-machines member removed individually; fiber comms owned by analog-and-digital-communication.",
 64: "Junk-only cluster; my member is the 'Databases and languages' syllabus dump removed individually (content owned by database-management-systems).",
 65: "Junk-only cluster (contents-page strays).",
 66: "Junk-only cluster (contents-page strays).",
 67: "Junk-only cluster (filter/z-parameter page runs); filter design owned by analog-electronics ch5, two-ports by circuit-theory ch9 — members removed individually.",
 72: "Junk-only cluster; my member is a page-run removed individually (auto-salvage amended to remove).",
 74: "Junk-only cluster (impedance-angle page runs); both my members removed individually.",
 76: "Junk-only cluster; my member removed individually.",
 79: "Junk-only cluster (AoE suntan-monitor application lines); my member removed individually.",
 90: "Junk-only cluster; my member is a concatenated junk line removed individually; permeability owned by electricity-and-magnetism ch8.",
 93: "Junk-only cluster (ESE 'Basic Electrical Engineering' dumps); content owned by circuit-theory ch1-2, electrical-machines and electricity-and-magnetism; my member removed individually.",
 94: "Junk-only cluster (page-run junk); motor testing is covered by electrical-machines ch2 OC/SC tests and ch8 indirect efficiency.",
 96: "Junk-only cluster; my member removed individually.",
 97: "Junk-only cluster (ESE microwave/satellite dump); communications content owned by the sibling communication books; my member removed individually.",
}

for i, d in enumerate(dup):
    t = d['title']
    if i in KB:
        D.append({"title": t, "action": "keep-both", "winner": "", "reason": KB[i]})
    elif i in CS:
        w, reason = CS[i]
        D.append({"title": t, "action": "consolidate", "winner": w, "reason": reason})
    elif i in JO:
        D.append({"title": t, "action": "consolidate", "winner": "", "reason": JO[i]})
    else:
        raise SystemExit(f"cluster {i} unadjudicated: {t[:60]}")

assert len(D) == 98
json.dump(D, open('work/dupes.json','w'), indent=1)
print("dupes:", len(D), "| keep-both:", sum(1 for x in D if x['action']=='keep-both'),
      "| consolidate:", sum(1 for x in D if x['action']=='consolidate'))
