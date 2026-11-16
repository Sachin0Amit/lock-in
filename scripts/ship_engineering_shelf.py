#!/usr/bin/env python3
"""ship_engineering_shelf.py — the memory shipper for the Engineering
full-shelf planning pass (2026-11-16, owner directive: "creat all things how
like other subjects like maths and cs create it for engineering with books
topic same way as like other subject"). Updates PROGRESS.json,
RESUME_POINTER.json, WORKLOG.md, SOURCE_LOG.md, DETAILED_LOG.md,
SUBJECT_BACKLOG.md, MASTER_PLAN.md and EXAM_REGISTRY.json. No lesson
authoring happened; the authoring cadence is unchanged (run 108 opens
AA 3.4 first, exactly as the standing pointer records).
"""
import json
from datetime import date

TODAY = "2026-11-16"

ENG_BOOKS = [
    # (id, title, chapters, plannedLessons, prefix, spine)
    ("engineering-mechanics", "Engineering Mechanics", 10, 34, "mech-", "Hibbeler + Beer/Johnston arcs + GATE ME S2 line (web)"),
    ("strength-of-materials", "Strength of Materials", 9, 32, "som-", "Beer catdir full TOC + GATE Mechanics of Materials line (web)"),
    ("theory-of-machines", "Theory of Machines", 10, 34, "tom-", "Khurmi Google Books TOC + GATE ToM+Vibrations lines (web)"),
    ("machine-design", "Machine Design", 9, 30, "md-", "Shigley Parts I-IV + Khurmi (web)"),
    ("thermodynamics", "Thermodynamics", 11, 39, "therm-", "Cengel & Boles 10e full 18-ch TOC + GATE S3 (web)"),
    ("fluid-mechanics", "Fluid Mechanics", 10, 39, "fluid-", "Cengel & Cimbala open TOC + Modi & Sethi (web)"),
    ("heat-transfer", "Heat Transfer", 9, 31, "ht-", "Incropera 8e Wiley TOC + GATE Heat Transfer line (web)"),
    ("manufacturing-processes", "Manufacturing Processes", 11, 42, "mfg-", "Kalpakjian 7e Pearson TOC tab + GATE S4 lines (web)"),
    ("industrial-engineering", "Industrial Engineering", 8, 28, "ie-", "Bedi/Telsang + GATE PPC/Inventory/OR lines (web)"),
    ("robotics-and-automation", "Robotics and Automation", 8, 27, "robot-", "Craig 4e Pearson TOC + Groover automation parts (web)"),
    ("cad-cam", "CAD/CAM", 8, 30, "cad-", "Groover CIM TOC tab + GATE CIM/additive line (web)"),
    ("materials-science", "Materials Science", 10, 34, "mats-", "Callister 10e TOC + GATE Engineering Materials line (web)"),
    ("circuit-theory-and-network-analysis", "Circuit Theory and Network Analysis", 10, 40, "ckt-", "Van Valkenburg arc + Chakrabarti (web); absorbs the backlog's two lines"),
    ("electrical-machines", "Electrical Machines", 8, 32, "emach-", "Bimbhra + Nagrath/Kothari (web); GATE EE S5 in full"),
    ("power-systems", "Power Systems", 10, 39, "ps-", "Stevenson & Grainger catdir full 16-ch TOC (web); GATE EE S6 in full"),
    ("control-systems", "Control Systems", 10, 34, "ctrl-", "Ogata arc (web); GATE EE S7 + EC S6 in full"),
    ("power-electronics", "Power Electronics", 8, 30, "pe-", "Rashid + Bimbhra (web); GATE EE S10 in full"),
    ("electrical-measurements", "Electrical Measurements", 9, 34, "meas-", "Sawhney arc (web); GATE EE S8 in full"),
    ("high-voltage-engineering", "High Voltage Engineering", 8, 30, "hv-", "Naidu & Kamaraju arc (web); university/elective pole"),
    ("renewable-energy", "Renewable Energy", 7, 28, "ren-", "Boyle 4e front matter + structure (web)"),
    ("electromagnetic-fields-and-waves", "Electromagnetic Fields and Waves", 10, 38, "emf-", "Hayt & Buck arc (web); ADDED by the GATE EE S3 + EC S8 audit"),
    ("electronic-devices-and-circuits", "Electronic Devices and Circuits", 9, 34, "edc-", "Boylestad 11e open TOC (web); GATE EC S3 in full"),
    ("analog-electronics", "Analog Electronics", 9, 34, "ae-", "Millman/Sedha arcs + Boylestad op-amp chapters (web); GATE EE S9 analog half"),
    ("signals-and-systems", "Signals and Systems", 9, 35, "sig-", "Oppenheim 2e Pearson TOC (web); GATE EE S4 + EC S2 signals"),
    ("analog-and-digital-communication", "Analog and Digital Communication", 10, 37, "comm-", "Haykin 5e Wiley TOC + Indian adaptation (web); GATE EC S7 in full"),
    ("vlsi-design", "VLSI Design", 10, 40, "vlsi-", "Weste & Harris 4e publisher page + open fm PDF (web)"),
    ("embedded-systems", "Embedded Systems", 8, 29, "emb-", "Raj Kamal open PDF + Google Books (web)"),
    ("antennas-and-wave-propagation", "Antennas and Wave Propagation", 8, 31, "ant-", "Balanis 4e Wiley TOC + K.D. Prasad named (web); GATE EC S8 antenna lines"),
    ("digital-signal-processing", "Digital Signal Processing", 8, 31, "dsp-", "Proakis & Manolakis open TOC (web); GATE EC S2 DFT line"),
    ("structural-engineering", "Structural Engineering", 10, 34, "str-", "Hibbeler Structural Analysis TOC + IS 456/800 arcs (web); GATE CE S2 analysis/design"),
    ("surveying-and-geomatics", "Surveying and Geomatics", 8, 28, "surv-", "Punmia Vol I 24-ch arc + Bannister (web); GATE CE S7 in full"),
    ("building-materials", "Building Materials", 8, 28, "bmat-", "Punmia/Duggal/Varghese arcs + Shetty concrete pole (web); GATE CE S2 materials line"),
    ("geotechnical-engineering", "Geotechnical Engineering", 10, 39, "soil-", "Murthy + Gopal Ranjan + Das named (web); GATE CE S3 in full"),
    ("transportation-engineering", "Transportation Engineering", 8, 31, "trans-", "Khanna & Justo + Kadiyali + IRC census (web); GATE CE S6 in full"),
    ("environmental-engineering", "Environmental Engineering", 8, 30, "env-", "Garg volumes + Davis & Cornwell + Metcalf & Eddy named (web); GATE CE S5 in full"),
    ("hydraulics", "Hydraulics", 9, 35, "hyd-", "Modi & Sethi 21e contents read (web); GATE CE S4 Hydraulics + ME turbomachinery hydraulic half"),
    ("water-resources-engineering", "Water Resources Engineering", 9, 35, "wr-", "Subramanya + Garg irrigation + Linsley named (web); GATE CE S4 Hydrology+Irrigation"),
    ("construction-management", "Construction Management", 8, 32, "cm-", "Chitkara + Punmia PERT/CPM + Peurifoy named (web); GATE CE S2 management line"),
]
TOTAL_CH = sum(b[2] for b in ENG_BOOKS)
TOTAL_LES = sum(b[3] for b in ENG_BOOKS)

EXTRAS = {
    "run": "owner-directed planning turn (not a numbered LOCKIN RUN; zero lesson authoring)",
    "directive": ("owner instruction 2026-11-16: 'creat all things how like other subjects "
                  "like maths and cs create it for engineering with books topic same way "
                  "as like other subject' — the same method as the 2026-11-10 Mathematics "
                  "pass and the 2026-11-15 Computer Science pass: research every subject, "
                  "promote complete researched plans (books + topics), zero content"),
    "syllabi": ("the four GATE 2026 branch syllabi downloaded and extracted in full this "
                "pass (ME/CE/EE/EC from gate2026.iitg.ac.in, pdftotext; every topic line "
                "routed to an owning book — the registers transcribed in the survey)"),
    "evidence": ("docs/research/ENGINEERING_TOC_SURVEY.md (47.8 KB — the Drive census note "
                 "(0 engineering sources; web-research method), the four syllabus registers, "
                 "the canonical-arc records with URLs, the folds and cross-shelf contracts)"),
    "books": [f"{b[0]} ({b[2]} ch / {b[3]} lessons, {b[4]} prefix, {b[5]})" for b in ENG_BOOKS],
    "totals": (f"38 books promoted to status 'planned': {TOTAL_CH} chapters / {TOTAL_LES} "
               "planned lessons across Mechanical (12) / Electrical (8) / ECE (9) / Civil (9); "
               "the library is now 110 books (28 math + 44 CS + 38 engineering)"),
    "folds": ("three backlog lines folded honestly: Digital Electronics -> the CS shelf's "
              "digital-logic-design (one Mano arc); Microprocessors & Microcontrollers -> "
              "assembly-and-microprocessors (8085/8086/8051 + interfacing already planned "
              "there); Circuit Theory + Network Analysis merged into ONE book "
              "circuit-theory-and-network-analysis (one Van Valkenburg arc). One line ADDED "
              "by the GATE syllabus audit: Electromagnetic Fields and Waves (EE S3 + EC S8 "
              "had no home; the QA-creation precedent honoured)"),
    "covers": ("38/38 AI cover art generated text-free (864x1152, motif per subject, palette "
               "per accent pair) — scripts/gen_covers.py roster grown 72 -> 110; VLM sweep: "
               "one baked-text catch (building-materials) force-regenerated clean and "
               "re-verified 'no'; wired via src/data/library/covers.ts"),
    "generator": ("scripts/gen_engineering_shelf.py — the pass's durable generator: the 38 "
                  "authored book plans live in it and the book.ts files are its idempotent "
                  "output (regenerating reproduces them deterministically)"),
    "verifier": ("scripts/verify-engineering-shelf-planning.ts — 2,257/2,257 GREEN (shelf "
                 "load, pinned census 342/1,268, chapter hygiene, 38-prefix reservation "
                 "against the 144 written ids + distinctness from math/CS rosters, "
                 "cross-reference language, survey evidence, planning-only guarantee, "
                 "cover assets)"),
    "gates": ("verify-cs-shelf-planning 2,348/2,348 (amended honestly: allBooks 72 -> 110); "
              "verify-math-shelf-planning 1,240/1,240 (amended honestly: allBooks 72 -> 110); "
              "verify_topic_coverage 667/667; verify_toc_as_lessons 3,883/3,883; "
              "verify-cs-exam-coverage 696/696; verify-exam-coverage 2,433/2,433; lint 0 "
              "errors (5 pre-existing warnings); tsc pre-existing-only (app-shell TS2322 x3, "
              "zero errors in the pass's files)"),
    "authoring_unchanged": ("run 108 opens AA 3.4 'The Argand Plane: Polar Form and the "
                            "Argument' first, exactly as the standing pointer records; "
                            "engineering authoring opens by owner promotion (backlog order)"),
}

# ---------- PROGRESS.json ----------
p_path = "docs/project/PROGRESS.json"
p = json.load(open(p_path))
p["updated"] = TODAY
p["phase"] = (
    "ENGINEERING SHELF PLANNED (owner-directed pass, 2026-11-16): the four GATE 2026 branch "
    "syllabi (ME/CE/EE/EC) downloaded and extracted, every subject web-researched against "
    f"its canonical sources, and 38 books promoted to complete researched plans (status "
    f"'planned') — Mechanical 12 / Electrical 8 / ECE 9 / Civil 9, {TOTAL_CH} chapters / "
    f"{TOTAL_LES} planned lessons. Zero lessons written; the one-book-at-a-time authoring "
    "cadence is unchanged (run 108 opens AA 3.4). Evidence: "
    "docs/research/ENGINEERING_TOC_SURVEY.md. The library is now 110 books."
)
p["engineeringShelfPlanning20261116"] = EXTRAS
json.dump(p, open(p_path, "w"), indent=1, ensure_ascii=False)
print(f"PROGRESS.json updated: {len(p['library']['books'])} library books listed (+{TODAY} key)")

# ---------- RESUME_POINTER.json ----------
r_path = "docs/project/RESUME_POINTER.json"
r = json.load(open(r_path))
r["updated"] = TODAY
r["notes"] = [
    ("NOTE (Engineering full-shelf planning pass, 2026-11-16, owner directive — zero "
     "lessons written): 'creat all things how like other subjects like maths and cs create "
     "it for engineering with books topic same way as like other subject' — the ENTIRE "
     "Engineering shelf is now planned (38 books: Mechanical 12, Electrical 8, ECE 9, Civil "
     f"9 — {TOTAL_CH} ch / {TOTAL_LES} researched planned lessons, status 'planned'; three "
     "backlog lines folded onto existing homes and one book added by the GATE syllabus "
     "audit; the evidence base is docs/research/ENGINEERING_TOC_SURVEY.md and the durable "
     "generator is scripts/gen_engineering_shelf.py). The authoring order is UNCHANGED: "
     "run 108 opens AA 3.4 first exactly as the standing pointer records; engineering "
     "authoring opens by owner promotion (backlog order). The standing gate is "
     "scripts/verify-engineering-shelf-planning.ts (2,257/2,257). Covers 38/38 generated "
     "text-free and VLM-verified (one catch regenerated clean). Exam-registry note: the "
     "GATE ME/CE/EE/EC ledger entries are the natural next directive (the CS pass "
     "precedent: planning pass -> exam-topic coverage pass)."),
] + r.get("notes", [])
json.dump(r, open(r_path, "w"), indent=1, ensure_ascii=False)
print("RESUME_POINTER.json updated (note prepended; nextAction untouched)")

# ---------- WORKLOG.md ----------
wl_path = "docs/project/WORKLOG.md"
wl = open(wl_path).read()
entry = f"""## {TODAY} — OWNER-DIRECTED ENGINEERING FULL-SHELF PLANNING PASS (not a numbered LOCKIN RUN): **THE ENTIRE ENGINEERING SHELF IS PLANNED** — 38 books promoted to status 'planned' with complete researched chapter/lesson layouts ({TOTAL_CH} chapters / {TOTAL_LES} planned lessons) across Mechanical (12) / Electrical (8) / ECE (9) / Civil (9); the four GATE 2026 branch syllabi (ME/CE/EE/EC) downloaded from gate2026.iitg.ac.in and extracted in full; every book web-researched against its canonical sources (the Drive holds 0 engineering sources — honest note; the PHYSICS subfolder is banked for the future Physics pass); ZERO lesson authoring (the one-book-at-a-time cadence is unchanged — run 108 opens AA 3.4 exactly as the run-107 pointer set)

**The owner's directive (this turn):** "creat all things how like other subjects like maths and cs create it for engineering with books topic same way as like other subject" — the same method as the 2026-11-10 Mathematics pass and the 2026-11-15 Computer Science pass: plans only, no content.

**Execution:** (1) The syllabus anchors: GATE 2026 ME/CE/EE/EC syllabus PDFs downloaded and pdftotext-extracted; every topic line of every section routed to an owning book (the registers transcribed in the survey). The audit caught a genuine hole — the EE S3 + EC S8 electromagnetic register had NO home on the backlog's ECE list — and created 'Electromagnetic Fields and Waves' (the QA-creation precedent). Three lines folded honestly: Digital Electronics -> digital-logic-design (CS), Microprocessors & Microcontrollers -> assembly-and-microprocessors (CS), Circuit Theory + Network Analysis -> one merged book. (2) Web research: ~35 canonical textbook TOCs actually read via publisher TOC pages (Pearson tabs, McGraw-Hill feature pages, Wiley pages), Library of Congress catdir records (Beer, Shigley, Stevenson full TOCs), Google Books contents (Khurmi, Punmia, Van Valkenburg, Bimbhra) and open PDFs (Cengel-Cimbala, Boylestad, Proakis, Raj Kamal, Modi-Sethi) — URLs in the survey and SOURCE_LOG. (3) The 38 book.ts plans authored in the house manner (positioning + no-duplication contract + research notes + chapters with substantial summaries + plannedLessons) via scripts/gen_engineering_shelf.py — the durable generator whose idempotent output the 38 files are; registered in index.ts; accents in the house palette. (4) Covers: the gen_covers.py roster grown 72 -> 110; 38 AI covers generated (all attempt-1 except one) and VLM-swept — one baked-text catch (building-materials) force-regenerated clean and re-verified; wired via covers.ts. (5) The gate: scripts/verify-engineering-shelf-planning.ts — 2,257/2,257.

**Gates:** verify-engineering-shelf-planning **2,257/2,257 GREEN**; verify-cs-shelf-planning **2,348/2,348** (amended honestly: allBooks 72 -> 110); verify-math-shelf-planning **1,240/1,240** (amended honestly: allBooks 72 -> 110); verify_topic_coverage **667/667** (untouched — the Drive survey is this pass's input-free sibling); verify_toc_as_lessons **3,883/3,883**; verify-cs-exam-coverage **696/696**; verify-exam-coverage **2,433/2,433**; lint 0 errors (5 pre-existing warnings); tsc pre-existing-only (app-shell TS2322 x3 on HEAD; zero errors in the pass's files); e2e-engineering-shelf.sh + run-eng-e2e-phase.sh — home 110 books + 38/38 engineering titles + math/CS intact + 0 console errors; sampled planned books render full TOC plans; spot-checks 4/4 + 4/4; cover art rendered; empty states + 404 integrity; mobile 390 no overflow; pixel checks non-blank/no blue cast.

**Deliverables:** 38 x src/data/library/books/engineering/&lt;slug&gt;/book.ts (from scripts/gen_engineering_shelf.py); docs/research/ENGINEERING_TOC_SURVEY.md (47.8 KB); src/data/library/index.ts + covers.ts wired; 38 x public/covers/&lt;slug&gt;.webp; scripts/verify-engineering-shelf-planning.ts + e2e-engineering-shelf.sh + run-eng-e2e-phase.sh (all whitelisted); SUBJECT_BACKLOG.md rewritten for the planned shelf; the six-file memory set updated.

**Zero lessons written. Authoring unchanged: run 108 opens AA 3.4 first.**

**Git:** ship commit follows this entry; **push PENDING** — no PAT in this turn's payload (the owner chat directive carried no fire payload), so per the standing push protocol the commit stays local and the next scheduled fire (whose payload re-embeds the PAT) or the owner pushes it; logged here without any token value, as always.

---

"""
open(wl_path, "w").write(entry + wl)
print("WORKLOG.md entry prepended")

# ---------- SOURCE_LOG.md ----------
sl_path = "docs/project/SOURCE_LOG.md"
sl = open(sl_path).read()
sl_entry = f"""## Engineering full-shelf planning pass ({TODAY}) — the syllabus anchors + web-researched canonical arcs (owner directive: same way as the other subjects)

- **The four GATE 2026 branch syllabus PDFs downloaded this pass** (into
  temporary-references/gate2026/, deleted after extraction per the storage
  law — the durable register is docs/research/ENGINEERING_TOC_SURVEY.md):
  ME_2026_Syllabus.pdf, CE_2026_Syllabus.pdf, EE_2026_Syllabus.pdf,
  EC_2026_Syllabus.pdf — gate2026.iitg.ac.in/doc/GATE2026_Syllabus/ — the
  shelf's exam anchor (every topic line routed to an owning book).
- **The Drive honest census**: 0 engineering sources on the Drive (the
  subject subfolders are MATHS/PHYSICS/CHEMISTRY/_DPPs; the root was fully
  censused by the CS pass). Every engineering book is web-researched; the
  PHYSICS subfolder is banked for the future Physics shelf's own pass.
- **Canonical arcs read this pass** (TOCs/structures actually opened; no TOC
  line taken from memory; the full records with routing verdicts are in
  docs/research/ENGINEERING_TOC_SURVEY.md): Hibbeler Statics SI TOC PDF
  (pearson.de muster); Beer Mechanics of Materials full catdir TOC
  (catdir.loc.gov/ecip0811/2008007412); Cengel & Boles Thermo 10e full TOC
  (mheducation.co.uk feature page); Cengel & Cimbala Fluid Mechanics open
  TOC (lunyax PDF listing); Incropera 8e Wiley TOC page; Kalpakjian 7e
  Pearson TOC tab; Khurmi Theory of Machines Google Books contents; Shigley
  catdir record + publisher TOC; Craig Robotics 4e Pearson TOC; Callister
  10e publisher TOC listing; Van Valkenburg Google Books/open listings;
  Bimbhra Electrical Machinery open listings; Stevenson & Grainger FULL
  catdir TOC (catdir.loc.gov/mh022/93039219); Ogata open preface PDFs +
  Pearson TOC; Rashid open PDF listing; Sawhney open listings; Naidu &
  Kamaraju open listings; Boyle 4e front matter (booksite.elsevier.com);
  Hayt & Buck publisher page + dokumen listing; Boylestad & Nashelsky 11e
  open-PDF contents; Oppenheim 2e Pearson TOC; Haykin 5e Wiley TOC + Indian
  adaptation contents; Weste & Harris 4e publisher page + hmc.edu front
  matter; Raj Kamal open PDF; Balanis 4e Wiley TOC; Proakis & Manolakis
  open-PDF contents; Hibbeler Structural Analysis Pearson page; Punmia
  Surveying Google Books; Murthy/Gopal Ranjan open listings; Khanna & Justo
  open listings; Garg volumes open listings; Modi & Sethi 21e contents
  (dokumen.pub listing); Subramanya arcs; Chitkara open listings; Groover
  Pearson TOC tab + open PDF; Bedi TOC web-check.

"""
open(sl_path, "w").write(sl.replace("# SOURCE LOG — Google Drive reference-book ledger\n\nStorage law: ~9 GB total; download only the current unit's books into\n`temporary-references/` (gitignored); delete local copies when the unit is\nverified; **never** touch Drive originals. Internet research is the\nsanctioned fallback/supplement when the Drive lacks a topic (MASTER_PLAN §2\nstep 6).\n\n",
                                    "# SOURCE LOG — Google Drive reference-book ledger\n\nStorage law: ~9 GB total; download only the current unit's books into\n`temporary-references/` (gitignored); delete local copies when the unit is\nverified; **never** touch Drive originals. Internet research is the\nsanctioned fallback/supplement when the Drive lacks a topic (MASTER_PLAN §2\nstep 6).\n\n" + sl_entry, 1))
print("SOURCE_LOG.md entry prepended")

# ---------- DETAILED_LOG.md ----------
dl_path = "docs/project/DETAILED_LOG.md"
dl = open(dl_path).read()
dl_entry = f"""## {TODAY} — ENGINEERING FULL-SHELF PLANNING PASS (owner-directed): 38 books planned, the four GATE 2026 branch syllabi extracted, zero lessons written

- **Books promoted to 'planned'** (id — chapters / planned lessons / prefix / spine): """ + "; ".join(f"{b[0]} — {b[2]}/{b[3]}/{b[4]}/{b[5]}" for b in ENG_BOOKS) + f""".
- **Library state:** 110 books — 28 mathematics (3 complete, AA in-progress, 24 planned), 44 computer-science (planned), 38 engineering (planned, {TOTAL_CH} ch / {TOTAL_LES} planned lessons).
- **Folds and additions:** Digital Electronics + Microprocessors & Microcontrollers fold onto the CS shelf's digital-logic-design and assembly-and-microprocessors (verified in their plans this pass); Circuit Theory + Network Analysis merged into one book; Electromagnetic Fields and Waves ADDED by the GATE EE S3 + EC S8 audit (the QA-creation precedent).
- **Evidence base:** docs/research/ENGINEERING_TOC_SURVEY.md — the four GATE 2026 branch registers transcribed in full, the Drive census note (0 engineering sources), the canonical-arc records with URLs, the cross-shelf routing contracts (10 numbered notes).
- **Gates:** verify-engineering-shelf-planning 2,257/2,257; verify-cs-shelf-planning 2,348/2,348 (allBooks amended 72->110); verify-math-shelf-planning 1,240/1,240 (allBooks amended 72->110); verify_topic_coverage 667/667; verify_toc_as_lessons 3,883/3,883; verify-cs-exam-coverage 696/696; verify-exam-coverage 2,433/2,433; lint 0 errors; tsc pre-existing-only; e2e-engineering-shelf green; VLM covers sweep (one catch regenerated clean).
- **Zero lesson authoring.** Run 108 opens AA 3.4 per the unchanged cadence.

"""
open(dl_path, "w").write(dl_entry + dl)
print("DETAILED_LOG.md entry prepended")

# ---------- SUBJECT_BACKLOG.md ----------
sb_path = "docs/project/SUBJECT_BACKLOG.md"
sb = open(sb_path).read()
old_eng = """## Engineering
**Mechanical (12):** Engineering Mechanics · Strength of Materials · Theory
of Machines · Machine Design · Thermodynamics · Fluid Mechanics · Heat
Transfer · Manufacturing Processes · Industrial Engineering · Robotics &
Automation · CAD/CAM · Materials Science
**Electrical (9):** Circuit Theory · Network Analysis · Electrical Machines ·
Power Systems · Control Systems · Power Electronics · Measurements · High
Voltage · Renewable Energy
**ECE (10):** Electronic Devices & Circuits · Analog Electronics · Digital
Electronics · Signals & Systems · Analog & Digital Communication ·
Microprocessors & Microcontrollers · VLSI · Embedded Systems · Antennas &
Wave Propagation · DSP
**Civil (9):** Structural Engineering · Surveying · Building Materials ·
Geotechnical · Transportation · Environmental · Hydraulics · Water
Resources · Construction Management
**Also investigate:** aerospace · chemical · biomedical · automobile ·
mining · agricultural · nuclear engineering"""
assert old_eng in sb, "SUBJECT_BACKLOG Engineering section anchor not found"
new_eng = f"""## Engineering (40 backlog lines → 38 books + 3 honest folds) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Engineering full-shelf planning pass (2026-11-16, owner
directive: "creat all things how like other subjects like maths and cs create
it for engineering with books topic same way as like other subject"): the four
GATE 2026 branch syllabi (ME/CE/EE/EC from gate2026.iitg.ac.in) downloaded and
extracted in full, every book web-researched against its canonical sources
(the Drive holds 0 engineering sources — honest note; the PHYSICS subfolder
is banked for the future Physics pass), and all 38 books promoted to
`src/data/library/books/engineering/<slug>/book.ts` with status 'planned' —
**{TOTAL_CH} chapters / {TOTAL_LES} planned lessons, zero written** (the
one-unit-at-a-time authoring cadence unchanged). Evidence base:
`docs/research/ENGINEERING_TOC_SURVEY.md`; gates:
`scripts/verify-engineering-shelf-planning.ts` (2,257/2,257) + covers 38/38
(`scripts/gen_covers.py` roster 72 → 110; VLM text-free sweep — one catch
regenerated clean).

The three honest folds (no-duplication contract): *Digital Electronics* (ECE)
folds into the CS shelf's **digital-logic-design** (one Mano arc — the fold
the CS pass already recorded); *Microprocessors & Microcontrollers* (ECE)
folds into the CS shelf's **assembly-and-microprocessors** (its plan already
carries the 8085/8086, 8259/8255 interfacing and the 8051 microcontroller
chapters — verified this pass); *Circuit Theory* + *Network Analysis*
(electrical) merge into ONE book **circuit-theory-and-network-analysis**
(one Van Valkenburg arc). One line ADDED beyond the backlog by the GATE
syllabus audit (the QA-creation precedent of 2026-11-10):
**Electromagnetic Fields and Waves** — the GATE EE S3 + EC S8 registers had
no home on the ECE list.

1. Engineering Mechanics (10 ch / 34 lessons, `mech-`, Hibbeler + Beer/Johnston, web)
2. Strength of Materials (9 / 32, `som-`, Beer catdir full TOC, web)
3. Theory of Machines (10 / 34, `tom-`, Khurmi + Rattan, web — hosts Vibrations per GATE)
4. Machine Design (9 / 30, `md-`, Shigley Parts I-IV + Khurmi, web)
5. Thermodynamics (11 / 39, `therm-`, Cengel & Boles 10e full TOC, web)
6. Fluid Mechanics (10 / 39, `fluid-`, Cengel & Cimbala + Modi & Sethi, web)
7. Heat Transfer (9 / 31, `ht-`, Incropera 8e, web)
8. Manufacturing Processes (11 / 42, `mfg-`, Kalpakjian 7e, web — hosts Metrology per GATE)
9. Industrial Engineering (8 / 28, `ie-`, Bedi/Telsang, web — OR theory cross-refd to math's OR book)
10. Robotics and Automation (8 / 27, `robot-`, Craig 4e + Groover, web)
11. CAD/CAM (8 / 30, `cad-`, Groover CIM + Zeid, web — owns additive manufacturing per GATE)
12. Materials Science (10 / 34, `mats-`, Callister 10e, web)
13. Circuit Theory and Network Analysis (10 / 40, `ckt-`, Van Valkenburg + Chakrabarti, web — absorbs two lines)
14. Electrical Machines (8 / 32, `emach-`, Bimbhra + Nagrath/Kothari, web)
15. Power Systems (10 / 39, `ps-`, Stevenson & Grainger catdir full TOC, web)
16. Control Systems (10 / 34, `ctrl-`, Ogata, web — serves GATE EE S7 + EC S6)
17. Power Electronics (8 / 30, `pe-`, Rashid + Bimbhra, web)
18. Electrical Measurements (9 / 34, `meas-`, Sawhney, web)
19. High Voltage Engineering (8 / 30, `hv-`, Naidu & Kamaraju, web)
20. Renewable Energy (7 / 28, `ren-`, Boyle 4e, web)
21. Electromagnetic Fields and Waves (10 / 38, `emf-`, Hayt & Buck + Sadiku, web — ADDED by the GATE audit)
22. Electronic Devices and Circuits (9 / 34, `edc-`, Boylestad 11e, web)
23. Analog Electronics (9 / 34, `ae-`, Millman/Sedha + Boylestad op-amp, web)
24. Signals and Systems (9 / 35, `sig-`, Oppenheim 2e, web)
25. Analog and Digital Communication (10 / 37, `comm-`, Haykin 5e, web)
26. VLSI Design (10 / 40, `vlsi-`, Weste & Harris 4e, web)
27. Embedded Systems (8 / 29, `emb-`, Raj Kamal, web)
28. Antennas and Wave Propagation (8 / 31, `ant-`, Balanis 4e + K.D. Prasad, web)
29. Digital Signal Processing (8 / 31, `dsp-`, Proakis & Manolakis, web)
30. Structural Engineering (10 / 34, `str-`, Hibbeler Structural Analysis + IS 456/800, web)
31. Surveying and Geomatics (8 / 28, `surv-`, Punmia + Bannister, web — the GATE CE S7 register)
32. Building Materials (8 / 28, `bmat-`, Punmia/Duggal/Varghese + Shetty, web)
33. Geotechnical Engineering (10 / 39, `soil-`, Murthy + Gopal Ranjan + Das, web)
34. Transportation Engineering (8 / 31, `trans-`, Khanna & Justo + IRC census, web)
35. Environmental Engineering (8 / 30, `env-`, Garg + Davis & Cornwell, web)
36. Hydraulics (9 / 35, `hyd-`, Modi & Sethi + Chow, web — measurement/channel/machines; fundamentals cross-refd to Fluid Mechanics)
37. Water Resources Engineering (9 / 35, `wr-`, Subramanya + Garg + Linsley, web)
38. Construction Management (8 / 32, `cm-`, Chitkara + Punmia PERT/CPM + Peurifoy, web)

**Authoring order**: unchanged — the Mathematics boat continues (AA in
progress, run 108 opens AA 3.4) one book at a time per the standing pointer;
the engineering shelf's 38 books follow in backlog order when the owner
promotes them (the same promotion rule as Mathematics and CS). Lesson-id
prefixes for all 38 verified unused against the 144 written lesson ids
(verify-engineering-shelf-planning section E). **Also investigate**
(unchanged, future passes): aerospace · chemical · biomedical · automobile ·
mining · agricultural · nuclear engineering."""
sb = sb.replace(old_eng, new_eng)
open(sb_path, "w").write(sb)
print("SUBJECT_BACKLOG.md Engineering section rewritten")

# ---------- MASTER_PLAN.md ----------
mp_path = "docs/project/MASTER_PLAN.md"
mp = open(mp_path).read()
marker = "The owner will supply a Google Drive link with a large reference book\ncollection. Workflow per unit:"
addition = f"""**Owner directive (2026-11-16, Engineering full-shelf planning pass):** the
ENTIRE Engineering shelf was planned in one owner-directed pass — the four
GATE 2026 branch syllabi (ME/CE/EE/EC) downloaded and extracted, every
subject web-researched against its canonical sources (the Drive holds no
engineering collection — honest note), and 38 books promoted to complete
researched plans (`status: 'planned'` in
`src/data/library/books/engineering/*/book.ts`; the evidence base is
`docs/research/ENGINEERING_TOC_SURVEY.md`; the durable generator is
`scripts/gen_engineering_shelf.py`). This was a PLANNING pass only: zero
lessons were written and the one-unit-at-a-time AUTHORING cadence above is
unchanged.

The owner will supply a Google Drive link with a large reference book
collection. Workflow per unit:"""
if marker in mp and "Engineering full-shelf planning pass" not in mp:
    mp = mp.replace(marker, addition, 1)
    open(mp_path, "w").write(mp)
    print("MASTER_PLAN.md directive recorded")

# ---------- EXAM_REGISTRY.json ----------
er_path = "docs/project/EXAM_REGISTRY.json"
er = json.load(open(er_path))
er["updated"] = TODAY
er["note"] = (
    "The 2026-11-16 Engineering full-shelf planning pass mapped the GATE 2026 "
    "ME/CE/EE/EC syllabi (downloaded + extracted; every topic line routed to "
    "an owning engineering book — the registers live in "
    "docs/research/ENGINEERING_TOC_SURVEY.md). Per-examination research "
    "(registry entries carrying the branch papers' researched sections + "
    "coverage maps, the CS exam-coverage pass precedent) is still its own "
    "pending workflow — the natural next directive."
)
json.dump(er, open(er_path, "w"), indent=2, ensure_ascii=False)
print("EXAM_REGISTRY.json note updated")
