#!/usr/bin/env python3
"""engineering-a verdict generator: builds verdicts/engineering-a.json"""
import json, os

mis = json.load(open('work/mine_misadjudicate.json'))
mis.sort(key=lambda m: (m['book'], m['chapter'], m['idx']))

# ---------------- misAdjudicate verdicts ----------------
KEEP = {
 ('engineering-mechanics',8,2): "Authored kinetics lesson: angular momentum is the rigid-body kinetic relation (ch8), and 'the Gyroscopic Glimpse' is this book's deliberate doorstep toward theory-of-machines ch9; token score is an artifact.",
 ('machine-design',1,2): "Authored: the design discipline's charter (stress analysis turned into dimensions) — the thesis of ch1 The Design Discipline, not strength-of-materials content.",
 ('thermodynamics',8,3): "Authored: comparative census capping the gas-power-cycles arc of ch8; not worldview (ch1) or second-law content.",
 ('fluid-mechanics',10,3): "Authored doorstep section of ch10 The Turbomachinery Principle and the Doorstep (machines elsewhere, transport rates above); fits its chapter.",
 ('heat-transfer',9,2): "Authored doorstep section of ch9 The Synthesis and the Doorstep (solar radiation, exchanger grids, silicon cooling); fits its chapter.",
 ('manufacturing-processes',5,1): "Authored machining lesson: tool geometry in the ASA and orthogonal rake systems — core of ch5 Machining Mechanics.",
 ('industrial-engineering',1,2): "Authored: productivity is the production-system chapter's core metric; operations-management is the business-side treatment (keep-both across disciplines).",
 ('industrial-engineering',4,2): "Authored: lean is named in the ch4 chapter title (Scheduling, MRP and Lean) — exact fit.",
 ('industrial-engineering',6,3): "Authored: queueing is the operations-research application layer (ch6); the embedded-systems score is a token artifact.",
 ('industrial-engineering',7,3): "Authored: Six Sigma is quality-control (ch7) content; operations-management's register is the business-side treatment.",
 ('robotics-and-automation',2,0): "Authored: rotation matrices are the core of ch2 Spatial Descriptions and Transformations; the computer-graphics score is spurious.",
 ('robotics-and-automation',6,2): "Authored: trajectory blends and time-scaling are ch6 Dynamics and Trajectory Generation core; the cad-cam score is spurious.",
 ('cad-cam',8,2): "Authored: operational-technology security is an Industry 4.0 (ch8) topic; internet-of-things is the computer-science-side treatment.",
 ('materials-science',2,0): "Authored: the four bond families (ionic, covalent, metallic, van der Waals) are ch2 Atomic Structure and Interatomic Bonding core.",
 ('electrical-machines',8,1): "Authored: indirect efficiency testing (summation of losses) is exactly ch8 Losses, Efficiency and the Doorstep content.",
 ('control-systems',5,0): "Authored: the stability statement opens ch5 Stability and Routh-Hurwitz; the DSP/fluids scores are artifacts.",
}

REMV = {}
def rm(book, chapter, idx, reason):
    REMV[(book, chapter, idx)] = reason

# ---- engineering-mechanics (42) ----
rm('engineering-mechanics',1,4,"Front-matter contents-header junk (AoE TOC run).")
rm('engineering-mechanics',1,5,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,6,"AoE TOC cut-off fragment; no engineering-mechanics home.")
rm('engineering-mechanics',1,9,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,14,"AoE optoelectronics section fragment ('from indication to illumination' = LEDs/displays); no authored home.")
rm('engineering-mechanics',1,18,"Imprint junk.")
rm('engineering-mechanics',1,21,"Edition-statement junk.")
rm('engineering-mechanics',1,27,"AoE circuit-technique stray (bootstrapping); covered by analog-electronics.")
rm('engineering-mechanics',1,29,"AoE section fragment junk.")
rm('engineering-mechanics',1,30,"AoE section fragment junk.")
rm('engineering-mechanics',1,31,"AoE DMM front-end stray.")
rm('engineering-mechanics',1,33,"AoE fragment junk.")
rm('engineering-mechanics',1,35,"AoE voltage-reference stray.")
rm('engineering-mechanics',1,37,"Programmable-logic stray; covered by digital-logic-design ch9 Programmable and Modern Logic.")
rm('engineering-mechanics',1,38,"Programmable-logic stray; covered by digital-logic-design ch9.")
rm('engineering-mechanics',1,39,"Junk fragment.")
rm('engineering-mechanics',1,45,"Junk fragment.")
rm('engineering-mechanics',1,46,"AoE delta-sigma stray ('idle tones').")
rm('engineering-mechanics',1,54,"Appendix-code junk.")
rm('engineering-mechanics',1,58,"Junk fragment.")
rm('engineering-mechanics',1,60,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,63,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,64,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,65,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,67,"Front-matter contents-header junk.")
rm('engineering-mechanics',1,68,"Front-matter junk.")
rm('engineering-mechanics',2,3,"AoE electronics stray.")
rm('engineering-mechanics',3,5,"Digital-logic stray (fan-in/fan-out); covered by digital-logic-design.")
rm('engineering-mechanics',3,7,"Junk fragment.")
rm('engineering-mechanics',3,8,"Back-matter junk.")
rm('engineering-mechanics',3,9,"Back-matter junk.")
rm('engineering-mechanics',4,5,"Electronics TOC cut-off fragment.")
rm('engineering-mechanics',4,9,"Digital-logic stray.")
rm('engineering-mechanics',4,10,"Digital-electronics TOC stray; covered by digital-logic-design ch7 Registers, Counters and the Memory Unit.")
rm('engineering-mechanics',5,5,"Circuits-book TOC stray; covered by circuit-theory-and-network-analysis ch3 The Theorem Census.")
rm('engineering-mechanics',5,6,"Computer-hardware stray; covered by computer-organization-architecture.")
rm('engineering-mechanics',8,3,"Edition-statement junk.")
rm('engineering-mechanics',10,4,"Digital-logic stray; covered by digital-logic-design ch3 Simplification of Boolean Functions.")
rm('engineering-mechanics',10,5,"AoE ADC stray.")
rm('engineering-mechanics',10,6,"Junk fragment.")
rm('engineering-mechanics',10,7,"Digital-logic stray; covered by digital-logic-design ch3.")

# ---- strength-of-materials (10) ----
rm('strength-of-materials',1,3,"Junk cut-off fragment.")
rm('strength-of-materials',1,4,"AoE junk ('how to make pseudorandom bytes').")
rm('strength-of-materials',2,3,"Concatenated Irwin/Hughes TOC run; strain gauges are properly owned by SoM ch7 Strain Gauges and Rosettes.")
rm('strength-of-materials',3,6,"Page-run junk.")
rm('strength-of-materials',3,9,"Back-matter junk.")
rm('strength-of-materials',5,7,"Electronics stray (differential output).")
rm('strength-of-materials',5,8,"Hughes circuits TOC stray; complex notation for AC is owned by circuit-theory ch4 Sinusoidal Steady State.")
rm('strength-of-materials',6,5,"Electronics TOC cut-off fragment.")
rm('strength-of-materials',6,6,"Electronics TOC cut-off fragment.")
rm('strength-of-materials',6,9,"Electronics stray (CMRR); covered by analog-electronics.")

# ---- theory-of-machines (10) ----
rm('theory-of-machines',1,5,"Electronics stray (transistor emitter characteristics).")
rm('theory-of-machines',1,6,"AoE measurement stray (lock-in detection).")
rm('theory-of-machines',1,7,"AoE stray (battery characteristics).")
rm('theory-of-machines',1,8,"Computer-hardware stray; covered by computer-organization-architecture ch9 Input/Output.")
rm('theory-of-machines',1,12,"Electrical stray (B/H determination); magnetic materials owned by electricity-and-magnetism ch8 Magnetic Materials and the Earth.")
rm('theory-of-machines',2,4,"Digital-electronics stray.")
rm('theory-of-machines',2,6,"Digital-electronics stray.")
rm('theory-of-machines',5,5,"Cut-off fragment; gear efficiency is covered by ToM ch5-6 gearing lessons.")
rm('theory-of-machines',10,6,"Electronics stray (1/f noise corner).")
rm('theory-of-machines',10,7,"Electronics cut-off fragment.")

# ---- machine-design (22) ----
rm('machine-design',1,6,"Computer stray; nonvolatile memory covered by computer-organization-architecture ch6/ch8.")
rm('machine-design',2,3,"AoE biographical sidebar (Hans Camenzind).")
rm('machine-design',2,4,"Imprint junk.")
rm('machine-design',2,6,"AoE stray; data conversion owned by analog-electronics ch9 Data Conversion and the Doorstep.")
rm('machine-design',3,3,"AoE op-amp 'golden rules' stray.")
rm('machine-design',6,3,"AoE stray ('number per package').")
rm('machine-design',6,7,"Digital stray; hexadecimal covered by digital-logic-design ch1 Binary Systems.")
rm('machine-design',9,4,"ESE syllabus dump; covered by database-management-systems and programming-languages-paradigms.")
rm('machine-design',9,5,"Electronics cut-off fragment (filter realisation); covered by analog-electronics ch5 Active Filters.")
rm('machine-design',9,6,"AoE example stray.")
rm('machine-design',9,8,"AoE example stray.")
rm('machine-design',9,9,"Front-matter contents junk.")
rm('machine-design',9,10,"AoE example stray.")
rm('machine-design',9,12,"AoE example stray.")
rm('machine-design',9,13,"Front-matter contents junk.")
rm('machine-design',9,14,"Front-matter contents junk.")
rm('machine-design',9,15,"Front-matter list junk.")
rm('machine-design',9,16,"Front-matter list junk.")
rm('machine-design',9,17,"Front-matter list junk.")
rm('machine-design',9,18,"Front-matter list junk.")
rm('machine-design',9,19,"Front-matter list junk.")

# ---- thermodynamics (9) ----
rm('thermodynamics',3,4,"Front-matter list junk.")
rm('thermodynamics',3,5,"Front-matter list junk.")
rm('thermodynamics',3,7,"Front-matter list junk.")
rm('thermodynamics',3,10,"Front-matter list junk.")
rm('thermodynamics',3,11,"Front-matter list junk.")
rm('thermodynamics',4,4,"Computer stray; covered by assembly-and-microprocessors / computer-organization-architecture.")
rm('thermodynamics',8,6,"Two-port stray; covered by circuit-theory-and-network-analysis ch9 Two-Port Networks.")
rm('thermodynamics',9,4,"Irwin TOC cut-off stray (resistive heating); thermodynamics owns cycles, not circuit-level heating examples.")

# ---- fluid-mechanics (1) ----
# (the only item is the keep above)

# ---- heat-transfer (6) ----
rm('heat-transfer',1,4,"Electronics stray (transistor active mode).")
rm('heat-transfer',1,6,"Op-amp TOC cut-off stray.")
rm('heat-transfer',8,5,"AoE stray (switching supplies).")
rm('heat-transfer',8,7,"Irwin TOC stray; household distribution is circuit-theory ch6 three-phase treatment.")
rm('heat-transfer',8,8,"Irwin TOC stray.")
# ---- heat-transfer (6) ----
rm('industrial-engineering',1,4,"ESE general-studies syllabus dump; no engineering home.")
rm('industrial-engineering',1,12,"Electrical cut-off fragment; rotating field owned by electrical-machines ch5 The Rotating Field Earned.")
rm('industrial-engineering',6,6,"Cut-off fragment.")
rm('industrial-engineering',6,8,"AoE stray (DAC applications).")
rm('industrial-engineering',6,9,"AoE stray (delta-sigma DAQ).")

# ---- robotics-and-automation (6) ----
rm('robotics-and-automation',1,5,"Junk fragment (bare 'a brief history').")
rm('robotics-and-automation',2,5,"Circuits stray (source transformation).")
rm('robotics-and-automation',5,3,"Concatenated electronics junk.")
rm('robotics-and-automation',8,4,"Digital-electronics stray (logic-family chronology).")

# ---- cad-cam (2) ----
rm('cad-cam',1,4,"Electronics stray (multiplexed LED display).")

# ---- materials-science (7) ----
rm('materials-science',1,8,"Concatenated circuits junk line.")
rm('materials-science',2,3,"Front-matter junk ('short contents').")
rm('materials-science',8,4,"Electronics stray (phase splitter).")
rm('materials-science',8,6,"Signals cut-off stray; spectra owned by signals-and-systems ch5 The Fourier Transform.")
rm('materials-science',8,8,"Digital stray; covered by digital-logic-design ch1 Binary Systems.")
rm('materials-science',8,9,"Digital stray; covered by digital-logic-design ch1.")

# ---- circuit-theory-and-network-analysis (14) ----
rm('circuit-theory-and-network-analysis',1,10,"Digital stray; covered by digital-logic-design ch2 Boolean Algebra and Logic Gates.")
rm('circuit-theory-and-network-analysis',1,11,"Digital stray; covered by digital-logic-design ch2.")
rm('circuit-theory-and-network-analysis',1,12,"Junk fragment.")
rm('circuit-theory-and-network-analysis',2,8,"Cut-off fragment; essential nodes/branches are part of ch2's systematic methods already.")
rm('circuit-theory-and-network-analysis',4,13,"Hughes TOC fragment; sinusoid addition is owned by ch4 Phasors: the Coordinate Change.")
rm('circuit-theory-and-network-analysis',4,15,"Hughes TOC fragment; phasor arithmetic is owned by ch4.")
rm('circuit-theory-and-network-analysis',5,9,"Electronics stray (MOSFET graphical analysis).")
rm('circuit-theory-and-network-analysis',5,12,"Electronics stray (substrate body effect).")
rm('circuit-theory-and-network-analysis',5,15,"Cut-off fragment.")
rm('circuit-theory-and-network-analysis',5,24,"Cut-off fragment; resultant rotating flux is owned by electrical-machines ch5.")
rm('circuit-theory-and-network-analysis',6,5,"AoE stray (op-amp creation).")
rm('circuit-theory-and-network-analysis',7,6,"Junk fragment.")
rm('circuit-theory-and-network-analysis',7,7,"Stray TOC line; sequential-switching transients fold into ch7 first-order treatment.")
rm('circuit-theory-and-network-analysis',9,6,"Stray; data conversion owned by analog-electronics ch9 Data Conversion and the Doorstep.")

# ---- electrical-machines (4) ----
rm('electrical-machines',2,4,"AoE stray (RFID).")
rm('electrical-machines',2,7,"Concatenated circuits junk line.")
rm('electrical-machines',7,5,"AoE stray (bus interfacing).")

# ---- power-systems (9) ----
rm('power-systems',1,6,"AoE stray (unity-gain buffers).")
rm('power-systems',1,7,"AoE stray (supply modules).")
rm('power-systems',1,8,"Digital stray; flip-flops/counters covered by digital-logic-design ch6-7.")
rm('power-systems',1,9,"AoE stray (metering IC).")
rm('power-systems',1,11,"Irwin TOC page-run stray.")
rm('power-systems',1,14,"Irwin TOC stray; standby 'vampire' power is not a grid-systems topic.")
rm('power-systems',1,20,"Cut-off fragment; household power calculus belongs to circuit-theory ch4 power treatment.")
rm('power-systems',1,22,"Cut-off fragment; distributed generation is covered by ch1 The Generation Census and ch10 economic operation.")
rm('power-systems',7,4,"AoE stray (input protection).")

# ---- control-systems (8) ----
rm('control-systems',1,5,"Concatenated junk line.")
rm('control-systems',1,7,"Digital stray; feedback shift-register sequences covered by digital-logic-design ch6 Sequential Logic.")
rm('control-systems',3,4,"AoE stray; data conversion owned by analog-electronics ch9.")
rm('control-systems',4,7,"AoE stray (active peak detector).")
rm('control-systems',5,4,"AoE stray (logic inputs).")
rm('control-systems',10,7,"Digital stray; HDL entry covered by digital-logic-design ch9 Programmable and Modern Logic.")
rm('control-systems',10,8,"AoE stray; microcontroller implementation covered by embedded-systems.")

# fix the accidental placeholder line
if None in REMV: del REMV[None]

misplaced = []
for m in mis:
    key = (m['book'], m['chapter'], m['idx'])
    if key in KEEP:
        misplaced.append({"book": m['book'], "chapter": m['chapter'], "title": m['title'],
                          "action": "keep", "targetBook": "", "targetChapter": 0, "newTitle": "",
                          "reason": KEEP[key]})
    else:
        reason = REMV.get(key, "Junk / stray auto-appended TOC line with no correct home in this book.")
        misplaced.append({"book": m['book'], "chapter": m['chapter'], "title": m['title'],
                          "action": "remove", "targetBook": "", "targetChapter": 0, "newTitle": "",
                          "reason": reason})

missing = [k for k in REMV if k not in {(m['book'],m['chapter'],m['idx']) for m in mis}]
extra_mis = [k for k in KEEP if k not in {(m['book'],m['chapter'],m['idx']) for m in mis}]
assert not missing and not extra_mis, (missing, extra_mis)
assert len(misplaced) == 165, len(misplaced)

json.dump(misplaced, open('work/misplaced.json','w'), indent=1)
print("misplaced entries:", len(misplaced), "| keeps:", sum(1 for x in misplaced if x['action']=='keep'))
PYEOF_MARKER = None
