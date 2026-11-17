#!/usr/bin/env python3
"""Assembles verdicts/engineering-a.json from adjudication decisions."""
import json

eng = json.load(open('engineering.json'))
MY = ['engineering-mechanics','strength-of-materials','theory-of-machines','machine-design','thermodynamics','fluid-mechanics','heat-transfer','manufacturing-processes','industrial-engineering','robotics-and-automation','cad-cam','materials-science','circuit-theory-and-network-analysis','electrical-machines','power-systems','control-systems']
books = {b['id']: b for b in eng['books'] if b['id'] in MY}
title_of = {}
for bid in MY:
    for ch in books[bid]['chapters']:
        for i, t in enumerate(ch['planned']):
            title_of[(bid, ch['number'], i)] = t

misplaced = json.load(open('work/misplaced.json'))
covered_titles = {(m['book'], m['chapter'], m['title']) for m in misplaced}

# ---------------- autoReview ----------------
def veto(book, chapter, title, reason):
    return {"book": book, "chapter": chapter, "title": title, "verdict": "veto", "action": "",
            "targetBook": "", "targetChapter": None, "newTitle": "", "reason": reason}
def amend(book, chapter, title, reason):
    return {"book": book, "chapter": chapter, "title": title, "verdict": "amend", "action": "remove",
            "targetBook": "", "targetChapter": None, "newTitle": "", "reason": reason}

autoReview = [
 veto("machine-design",1,"From Stress to Dimension","Veto the ch1->ch2 move: this is the design discipline's charter (stress turned into dimensions), the thesis lesson of ch1 The Design Discipline; it is not a static-loading lesson."),
 veto("thermodynamics",1,"Processes and Cycles","Veto the ch1->ch5 move: thermodynamic process/cycle vocabulary is ch1 The Energy Worldview fundamental content; the Second Law chapter is not its home."),
 veto("thermodynamics",8,"The Cycle Comparison Census","Veto the ch8->ch1 move: the comparative census of gas cycles caps the cycles arc in ch8; the worldview chapter is not its home."),
 veto("thermodynamics",9,"Reheat and Regeneration","Veto the ch9->ch8 move: reheat and regeneration are Rankine (vapour-power) improvements — ch9 content; gas-cycle improvements already have their own ch8 lesson (Regeneration, Reheat, Intercooling). Genuinely different cycle families."),
 veto("robotics-and-automation",6,"The Lagrangian Route for Arms","Veto the ch6->ch4 move: Lagrangian dynamics of arms is ch6 Dynamics and Trajectory Generation content, not inverse kinematics."),
 veto("circuit-theory-and-network-analysis",4,"Impedance Arithmetic","Veto the ch4->ch5 move: phasor-domain impedance arithmetic is the core of ch4 Sinusoidal Steady State."),
 veto("circuit-theory-and-network-analysis",5,"RLC Circuits and Natural, Forced and Complete Responses","Veto the ch5->ch8 move: the RLC response taxonomy grounds the resonance chapter (with ch5 'Damped Oscillation and the Quality Factor'); Network Functions is not its home — if anywhere it leans toward ch7 Transients."),
 veto("electrical-machines",2,"The Equivalent Circuit Earned","Veto the ch2->ch5 move: the transformer equivalent circuit is ch2 The Single-Phase Transformer core; ch5 has its own authored induction-machine lesson ('The Equivalent Circuit Identified') — distinct treatments."),
 veto("strength-of-materials",7,"Mohr\u2019s Circle for Plane Stress","Veto the removal: there is no ch1 copy ('Stress on the Oblique Plane' is the precursor concept, not a duplicate). Mohr's circle for plane stress is the anchor lesson of ch7 Transformation of Stress and Strain."),
 veto("electrical-machines",7,"Power-Angle and Parallel Operation","Veto the removal: not a duplicate of ch3 'Parallel Operation\u2019s Conditions' (transformer paralleling). Synchronous-machine power-angle and paralleling is distinct ch7 content."),
 veto("cad-cam",2,"Transformations by Matrices","Veto the move to microbiology: matrix transformations of geometry are core CAD content of ch2 Geometric Modelling; microbiology is a token-score artifact."),
 veto("fluid-mechanics",1,"Surface Tension and Capillarity","Veto the removal: fluid properties own the engineering treatment (capillarity/cavitation as fluid properties in ch1 The Fluid Idea); properties-of-matter owns the physics-side molecular treatment — genuinely different syllabus treatments, keep-both."),
 veto("circuit-theory-and-network-analysis",9,"Conversions and Equivalent Circuits","Veto the removal: two-port parameter conversions (z/y/h/g/ABCD) and their equivalent circuits is core ch9 Two-Port Networks content; it is not covered in electrical-machines."),
 amend("engineering-mechanics",1,"Identities","Amend move->remove: junk AoE appendix fragment; ear-training is an absurd target."),
 amend("engineering-mechanics",1,"Introductory","Amend move->remove: junk fragment; microeconomics is an absurd target."),
 amend("engineering-mechanics",3,"Cambridge University Press has no responsibility for the persistence or accuracy of URLs for external or third-party Internet websites referred to in this publication and does not guarantee that any content on such websites is, or will remain, accurate or appropriate","Amend move->remove: publisher disclaimer boilerplate; probability-theory is an absurd target."),
 amend("strength-of-materials",5,"Input Common-Mode Range and Functions","Amend move->remove: op-amp TOC stray; heat-and-thermodynamics is an absurd target."),
 amend("strength-of-materials",5,"The NAND function","Amend move->remove: digital-logic stray covered by digital-logic-design ch2; nursing is an absurd target."),
 amend("strength-of-materials",6,"A Common-Base (CB)","Amend move->remove: electronics TOC fragment; physical-chemistry is an absurd target."),
 amend("theory-of-machines",1,"Maintenance \u2014 failure concepts and characteristics, reliability, failure analysis; machine vibration, data acquisition, fault detection, vibration monitoring; field balancing of rotors; noise monitoring; wear and debris analysis; signature analysis; NDT techniques in condition monitoring","Amend move->remove: concatenated ESE-syllabus dump, covered piecemeal by ToM ch8 (balancing) and ch10 (vibrations); physical-chemistry is an absurd target."),
 amend("theory-of-machines",2,"Using the General Solution Method to Find an 9.3 Translating a Sine Expression to a Cosine","Amend move->remove: concatenated circuits-book junk; foundation-chemistry is an absurd target."),
 amend("manufacturing-processes",1,"Logic pathology","Amend move->remove: digital-electronics junk; plant-anatomy is an absurd target."),
 amend("industrial-engineering",1,"It furthers the University's mission by disseminating knowledge in the pursuit of education, learning, and research at the highest international levels of excellence","Amend move->remove: publisher boilerplate; sociology is an absurd target."),
 amend("materials-science",1,"Using Phasor Diagrams to Analyze Capacitive Improper Rational Function","Amend move->remove: concatenated junk line; heat-and-thermodynamics is an absurd target."),
 amend("circuit-theory-and-network-analysis",1,"An Alternative Two-Integrator-Loop 15.4.8 Generation of Sine Waves","Amend move->remove: concatenated analog-electronics junk; foundation-physics is an absurd target."),
 amend("circuit-theory-and-network-analysis",1,"Adding a Resistive Load to a Voltage 4.19 Finding the Th\u00e9venin Equivalent of a Circuit","Amend move->remove: concatenated junk; Th\u00e9venin is covered by circuit-theory ch3 The Theorem Census."),
 amend("circuit-theory-and-network-analysis",4,"Determining the Step Response of a Circuit with 9.5 Adding Cosines Using Phasors","Amend move->remove: concatenated junk; foundation-physics is an absurd target."),
 amend("circuit-theory-and-network-analysis",5,"Basic Electrical Engineering \u2014 DC circuits: Ohm's and Kirchhoff's laws, mesh and nodal analysis, circuit theorems; electromagnetism, Faraday's and Lenz's laws, induced EMF and its uses; single-phase AC circuits; transformers, efficiency; basics of DC machines, induction machines and synchronous","Amend move->remove: syllabus dump covered across circuit-theory ch1-2, electrical-machines and electricity-and-magnetism; engineering-mechanics is an absurd target."),
 amend("circuit-theory-and-network-analysis",9,"Communication networks \u2014 principles/practices/technologies/uses; OSI model/security; basic packet multiplexed streams/scheduling; cellular networks: types, analysis; protocols (TCP/TCPIP)","Amend move->remove: syllabus dump covered by computer-networks; physical-chemistry is an absurd target."),
 amend("control-systems",10,"Mechatronics \u2014 microprocessors and microcontrollers: architecture, programming, I/O, computer interfacing; programmable logic controller; sensors and actuators (piezoelectric accelerometer, Hall effect sensor, optical encoder, resolver, inductosyn, pneumatic and hydraulic actuators, stepper motor);","Amend move->remove: syllabus dump covered by robotics-and-automation ch7-8 (sensors/actuators, automation) and embedded-systems; industrial-engineering is not its home."),
 amend("engineering-mechanics",4,"Gates 1167 Summary","Amend salvage->remove: junk page-run; a bare 'Gates' lesson in the friction chapter is noise, not a salvage."),
 amend("strength-of-materials",3,"Summary 476 Problems","Amend salvage->remove: junk page-run; a bare 'Problems' lesson is noise."),
 amend("fluid-mechanics",1,"Introduction 1192 Index IN-1","Amend salvage->remove: junk page-run; a bare 'Introduction' lesson is noise."),
 amend("fluid-mechanics",7,"Summary 117 Region","Amend salvage->remove: junk page-run; a bare 'Region' lesson is noise."),
 amend("fluid-mechanics",8,"Terminals 151 4.7.3 Varactors","Amend salvage->remove: junk page-run; a bare 'Terminals' lesson is noise."),
 amend("circuit-theory-and-network-analysis",1,"Circuit 276 15.1 Normalized (so that \u03c9 c = 1 rad s)","Amend salvage->remove: junk page-run; a bare 'Circuit' lesson is noise."),
]

# ---------------- extra (free-scan) ----------------
EX = {}
def ex(book, chapter, idx, reason, action="remove"):
    EX[(book, chapter, idx)] = (action, reason)

# engineering-mechanics ch1 (AoE/Sedra/Hughes pollution the detectors missed)
for idx, why in [
 (3,"Front-matter junk ('Appendices A-L')."), (11,"Front-matter junk ('Appendices')."),
 (13,"Publisher URL junk (Sedra-Smith companion site)."), (15,"Conference-code junk ('(ISSCC)')."),
 (16,"AoE section fragment ('Fundamentalist')."), (17,"AoE biographical sidebar (David Fullagar, op-amp creator)."),
 (20,"Publisher URL junk."), (22,"British Library catalog boilerplate (junkSuspect)."),
 (25,"AoE stray ('Connectors')."), (26,"AoE stray ('Transconductance')."),
 (32,"AoE DMM stray (34420A)."), (34,"AoE switching-supply stray."),
 (36,"AoE stray ('Synchronizer')."), (40,"AoE optoelectronics stray ('Photomultipliers')."),
 (41,"AoE stray ('TOSLINK')."), (42,"AoE stray ('Versatile Link')."),
 (44,"AoE stray ('Wrapup')."), (47,"AoE stray (touchscreen digitizer IC)."),
 (48,"Circuits-book fragment ('More on Deriving the Th\u00e9venin')."), (49,"AoE stray ('Radiators')."),
 (52,"Appendix-run junk."), (55,"Textbook-example fragment ('Flashlight')."),
 (56,"Figure-code junk (Fig. 1.5)."), (57,"Figure-code junk (Fig. 1.7)."),
 (59,"AoE stray ('Fibreoptics')."), (69,"Publisher URL junk (Hughes)."),
]: ex('engineering-mechanics',1,idx,why)
ex('engineering-mechanics',3,3,"ESE general-aptitude syllabus line; no home in a mechanics book.")
ex('engineering-mechanics',3,10,"Page-run junk ('Electrical Engineering: An Overview 4 Realistic Resistors').")
for idx, why in [
 (4,"Electronics cut-off fragment ('(Emitter) Resistance')."),
 (6,"Electronics cut-off fragment ('An Emitter Resistance Re')."),
 (7,"Concatenated electronics junk."),
 (12,"Digital-logic stray ('Gate standardization')."),
 (13,"Cut-off fragment; rotor-resistance control is electrical-machines ch5 material."),
]: ex('engineering-mechanics',4,idx,why)
ex('engineering-mechanics',5,7,"Circuits stray; covered by circuit-theory ch3 The Theorem Census.")
ex('engineering-mechanics',7,3,"Electronics stray (PLL components).")
ex('engineering-mechanics',7,4,"E&M stray; relative permittivity owned by electricity-and-magnetism ch4 Capacitors and Dielectrics.")
ex('engineering-mechanics',8,5,"Concatenated junk line (junkSuspect).")

# strength-of-materials
ex('strength-of-materials',5,6,"Electronics stray ('FET types').")
ex('strength-of-materials',5,10,"Publisher boilerplate ('Support the use of this textbook...').")
ex('strength-of-materials',9,5,"Electronics stray ('The MOSFET Case').")
ex('strength-of-materials',9,6,"Electronics stray ('The BJT Case').")

# theory-of-machines
ex('theory-of-machines',2,3,"ESE turbomachinery syllabus dump; the engineering treatment of turbomachines is owned by fluid-mechanics ch10 The Turbomachinery Principle and the Doorstep.")
ex('theory-of-machines',2,5,"Digital-electronics stray ('Step-triggered pulses').")
for idx in (3,4,7,8,9,10):
    ex('theory-of-machines',4,idx,"AoE stray (emitter/source follower TOC run) in the Cams and Followers chapter.")
ex('theory-of-machines',5,4,"Cut-off fragment (junkSuspect); gear efficiency covered by ch5-6.")
ex('theory-of-machines',10,5,"Electronics filter fragment ('Determining the 3-dB Frequency').")

# machine-design
ex('machine-design',1,5,"AoE junk ('Designs by the masters: Agilent's accurate DMMs') — the ch2 twin was auto-removed; this copy fell through.")
ex('machine-design',1,7,"Computer stray ('Memory wrapup').")
ex('machine-design',6,6,"Circuits stray; covered by circuit-theory ch3 The Theorem Census.")
ex('machine-design',9,7,"AoE example stray ('Example: sensitive millivoltmeter').")
ex('machine-design',9,11,"AoE example stray (lightning-detector preamp).")

# thermodynamics
ex('thermodynamics',1,4,"Concatenated junk line (junkSuspect).")
ex('thermodynamics',3,3,"Front-matter junk ('Tables xiv').")
ex('thermodynamics',8,4,"AoE stray ('VII: ac-input optocouplers').")
ex('thermodynamics',8,5,"Two-port cut-off fragment ('Finding the a Parameters from'); covered by circuit-theory ch9.")

# fluid-mechanics
ex('fluid-mechanics',1,7,"AoE stray ('Surface-mount technology: the joy and the pain').")
ex('fluid-mechanics',5,4,"Stray fragment ('Electrostatic terms').")
ex('fluid-mechanics',7,5,"TOC boilerplate stray ('Summary of important formulae').")
ex('fluid-mechanics',10,4,"AoE stray (VCO implementation).")

# heat-transfer
ex('heat-transfer',2,3,"Magnetic-hysteresis stray; iron losses are owned by electrical-machines ch8 The Loss Census Across Families.")
ex('heat-transfer',4,3,"AoE stray ('When operating current is not your choice').")
ex('heat-transfer',5,4,"Electronics stray ('Transconductance versus drain current').")
ex('heat-transfer',8,6,"Irwin TOC stray ('Practical Perspective: Resistive Touch').")
ex('heat-transfer',8,9,"Irwin TOC cut-off stray.")
ex('heat-transfer',9,5,"BJT stray ('Dependence of ic on the Collector').")
ex('heat-transfer',9,8,"Stray fragment ('Find an Unknown Current').")
ex('heat-transfer',9,10,"Circuits stray; current magnification is the parallel-resonance topic of circuit-theory ch5.")

# manufacturing-processes
ex('manufacturing-processes',4,4,"Electronics stray ('Limiting the bandwidth').")
ex('manufacturing-processes',6,4,"Imprint junk ('UNIVERSITY PRESS').")
ex('manufacturing-processes',6,5,"Publisher boilerplate (junkSuspect).")
ex('manufacturing-processes',6,7,"AoE stray ('Switchers: basic operation').")
ex('manufacturing-processes',9,3,"AoE stray ('Test fixture for compensation and calibration').")
ex('manufacturing-processes',10,5,"AoE stray ('The lessons: error budget, unspecified parameters').")

# industrial-engineering
ex('industrial-engineering',1,6,"Concatenated junk line (junkSuspect).")
ex('industrial-engineering',1,10,"Electronics stray (monostable application).")
ex('industrial-engineering',1,11,"AoE stray ('I: Phototransistor output optocouplers').")
ex('industrial-engineering',1,13,"Stray TOC line; generating plant is owned by power-systems ch1 The Generation Census.")
ex('industrial-engineering',3,3,"AoE stray (suntan-monitor delta-sigma).")
ex('industrial-engineering',7,4,"AoE stray ('FETs as variable resistors').")
ex('industrial-engineering',7,5,"AoE stray ('Six DACs').")

# robotics-and-automation
ex('robotics-and-automation',6,3,"Filter-design stray (Butterworth polynomials); active filters owned by analog-electronics ch5.")
ex('robotics-and-automation',7,3,"Electronics stray ('Modified flash encoders').")

# cad-cam
ex('cad-cam',1,5,"AoE stray ('On-board interconnections').")
ex('cad-cam',1,6,"Electronics stray (R-2R ladder DACs); data conversion owned by analog-electronics ch9.")
ex('cad-cam',4,3,"Math fragment ('Step 3: getting to e_n').")
ex('cad-cam',4,4,"Appendix fragment ('A.1 Preliminary Steps').")

# materials-science
ex('materials-science',1,3,"ESE materials syllabus dump; every named topic is already owned by this book's own planned chapters (ch2-ch10).")
ex('materials-science',9,4,"AoE stray ('Some representative JFETs: a brief tour').")

# circuit-theory-and-network-analysis
ex('circuit-theory-and-network-analysis',1,4,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',1,17,"Page-run junk (junkSuspect).")
ex('circuit-theory-and-network-analysis',1,18,"Page-run junk (junkSuspect).")
ex('circuit-theory-and-network-analysis',2,4,"AoE troubleshooting stray ('Stuck-node tracer').")
ex('circuit-theory-and-network-analysis',2,5,"AoE stray ('Choosing a battery').")
ex('circuit-theory-and-network-analysis',2,6,"AoE stray ('Choosing a DAC').")
ex('circuit-theory-and-network-analysis',2,9,"Cut-off fragment ('A Special Case in the Mesh-Current').")
ex('circuit-theory-and-network-analysis',2,11,"Concatenated junk line (junkSuspect); permeability is owned by electricity-and-magnetism ch8.")
ex('circuit-theory-and-network-analysis',3,4,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',4,4,"Page-run junk (junkSuspect).")
ex('circuit-theory-and-network-analysis',4,8,"Stray TOC line; the delta-to-wye transform is covered by ch2 systematic methods and ch6 line-versus-phase arithmetic.")
ex('circuit-theory-and-network-analysis',4,11,"Concatenated junk; active filter design owned by analog-electronics ch5.")
ex('circuit-theory-and-network-analysis',5,7,"Generic aggregate TOC line duplicating the authored ch5 lessons 'Mutual Inductance and the Dot Convention' and 'The Ideal Transformer at Circuit Level'.")
ex('circuit-theory-and-network-analysis',5,10,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',5,13,"Amplifier-topic stray ('Bandwidth Extension'); covered by analog-electronics frequency-response treatment.")
ex('circuit-theory-and-network-analysis',5,16,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',5,18,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',6,4,"Transistor-configuration stray; Darlington covered by electronic-devices-and-circuits.")
ex('circuit-theory-and-network-analysis',6,6,"AoE stray ('Interboard connections').")
ex('circuit-theory-and-network-analysis',7,11,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',8,5,"Sedra-Smith stray ('Increasing /^ by Eliminating the Miller Poles'); amplifier bandwidth owned by analog-electronics.")
ex('circuit-theory-and-network-analysis',9,7,"Concatenated junk line (junkSuspect).")
ex('circuit-theory-and-network-analysis',9,8,"Textbook example stray ('Analyzing Two Cascaded Integrating Amplifiers').")
ex('circuit-theory-and-network-analysis',10,4,"AoE stray ('Driving Cables'); transmission lines owned by electromagnetic-fields-and-waves / analog-and-digital-communication.")

ex('circuit-theory-and-network-analysis',4,5,"Irwin TOC stray ('Practical Perspective: Capacitive Touch 9.3 The Phasor').")
ex('circuit-theory-and-network-analysis',7,8,"Irwin TOC stray ('Practical Perspective: Transmission and Practical Perspective: Pushbutton Telephone').")

# electrical-machines
ex('electrical-machines',3,4,"Filter stray ('Poles' and decibels per octave).")
ex('electrical-machines',4,9,"Amplifier stray ('Obtaining Wideband (Shunt-Series)').")
ex('electrical-machines',4,11,"Stray; stator windings are covered by ch7 EMF and Winding Factors.")
ex('electrical-machines',4,12,"Stray; stator-winding EMF is covered by ch7 EMF and Winding Factors.")
ex('electrical-machines',4,13,"Page-run junk (junkSuspect); motor testing covered by ch2 OC/SC tests and ch8 indirect efficiency.")

# power-systems
ex('power-systems',1,10,"AoE stray (pseudorandom bit sequences).")
ex('power-systems',1,15,"Concatenated junk line (junkSuspect).")
ex('power-systems',1,16,"Irwin TOC stray ('Practical Perspective: Characterizing').")
ex('power-systems',1,18,"Irwin cut-off fragment; household power calculus belongs to circuit-theory ch4.")
ex('power-systems',5,4,"Stray; coax is communication-transmission media, covered by analog-and-digital-communication / electromagnetic fields.")
ex('power-systems',5,5,"AoE stray (resistor-string DACs).")
ex('power-systems',9,4,"AoE stray (gain-setting resistors).")
ex('power-systems',9,5,"AoE stray (optocouplers and relays).")
ex('power-systems',10,5,"Oscillator stray (TCXO/OCXO stability).")

# control-systems
ex('control-systems',4,5,"Concatenated junk line (junkSuspect).")
ex('control-systems',5,3,"Concatenated junk line (junkSuspect).")
ex('control-systems',10,6,"AoE biographical junk (Federico Faggin).")
ex('control-systems',10,9,"AoE stray (NMOS LSI interfacing).")

extra = []
for (book, chapter, idx), (action, reason) in sorted(EX.items()):
    t = title_of.get((book, chapter, idx))
    assert t is not None, (book, chapter, idx)
    assert (book, chapter, t) not in covered_titles, ("dup with misplaced!", book, chapter, t)
    extra.append({"book": book, "chapter": chapter, "title": t, "action": action,
                  "targetBook": "", "targetChapter": 0, "newTitle": "", "reason": reason})

json.dump({"autoReview": autoReview, "extra": extra}, open('work/auto_extra.json','w'), indent=1)
print("autoReview:", len(autoReview), "| extra:", len(extra))
PYEOF_END = None
