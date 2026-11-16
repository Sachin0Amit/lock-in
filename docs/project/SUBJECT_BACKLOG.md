# SUBJECT BACKLOG — the full library plan

Book queues per discipline, from the master instruction §4. Promotion rule:
a book moves from backlog to `src/data/library/books/` only when its
research phase (reference survey + syllabus audit) is done. Never create
empty shells just to inflate the shelf.

Order of work: research-first, one book at a time (default: Mathematics
shelf top-to-bottom, since its first book is already in progress).

## Mathematics (28 books) — THE FULL SHELF IS PLANNED (audited)
1. Foundation Mathematics ← **COMPLETE (11/11 chapters, 48 lessons — closed by run 47, 2026-11-05)**
2. Arithmetic and Number Systems ← **COMPLETE (run 65, 2026-11-07: 10/10 chapters, 34 lessons, 184,361 words — the book closed with 10.3 'The Toolkit Synthesis' + the unit-10 review + the book flip)**
3. Elementary Algebra ← **COMPLETE (run 88, 2026-11-10: 11/11 chapters, 37 lessons, 171,460 words — the book closed with 11.3 'The Function Idea: the Doorstep' + the unit-11 review + the BOOK CLOSE flip; run 89 opens book #4's research phase)**
4. Advanced Algebra ← **PROMOTED (run 89, 2026-11-10: research phase complete — reference survey + syllabus audit + the 10-chapter/36-lesson plan; `src/data/library/books/mathematics/advanced-algebra/` status 'planned'; authoring opens run 90 with 1.1 + 1.2; the 36th lesson (ch. 9 log tables) added by the topic-inclusion guarantee pass, 2026-11-10; +11 lessons by the TOC-as-lessons pass and +10 by the internet-research gap pass (Hall & Knight Higher Algebra TOC) → 57 planned, 2026-11-11)**
5–27. The remaining twenty-three books ← **PLANNED (full-shelf planning pass, 2026-11-10, owner directive — every book's research phase executed in one pass: the Drive's mathematics collection downloaded book-by-book, ALL 53 tables of contents extracted (vision-model transcription for the 44 scanned sources), web syllabus audits (NCERT class 9–12 lists, JEE Main 2026 units incl. the 2024 removals, classic university arcs), each book promoted to `src/data/library/books/mathematics/<slug>/book.ts` with its complete researched chapter/lesson layout, status 'planned'; the evidence base is `docs/research/DRIVE_TOC_SURVEY.md`)**:
   5. Geometry (12 ch / 50 lessons, `geo-` — +the transformations/symmetry chapter, the cevian/Stewart/Ptolemy/power-of-a-point/nine-point lessons from the internet-research pass)
   6. Coordinate Geometry (13 / 52, `cg-` — M3 + M5 modules; +Loney's rotation/invariants, coaxal circles, diameters, pole-polar, confocal lessons)
   7. Trigonometry (8 / 35, `tr-` — M1 module + Loney; +summation of series, small angles/dip of horizon)
   8. Differential Calculus (9 / 38, `dc-` — M4 ch. 2–6 + Thomas/Stewart; +hyperbolic calculus, d/dx of one function w.r.t. another)
   9. Integral Calculus (6 / 24, `ic-` — M4 ch. 7–9 + Thomas; +piecewise/GIF integrands, ln-as-integral, polar areas, hyperbolic integrals)
   10. Multivariable Calculus (6 / 23, `mc-` — Thomas/Stewart multivariable; +Jacobians, surface integrals, two-variable Taylor)
   11. Differential Equations (7 / 29, `de-` — M4 ch. 10 + Kreyszig; +the systems/phase-plane chapter from the audit pass; +Clairaut/Lagrange higher-degree, higher-order, Cauchy-Euler)
   12. Linear Algebra (8 / 34, `la-` — M2 ch. 12–13 + Strang/Axler/Lay; +SVD/PCA and positive-definite lessons)
   13. Discrete Mathematics (10 / 35, `dm-` — Rosen 8e; +bipartite matching/Hall and topological sorting)
   14. Number Theory (10 / 34, `nt-` — Burton arc; +sums of two squares, FLT story, Pell)
   15. Set Theory (8 / 29, `st-` — Halmos arc; +Schröder-Bernstein, partial orders/chains)
   16. Mathematical Logic (7 / 25, `ml-` — M2 ch. 10 + Rosen ch. 1; +structures/models, recursive functions)
   17. Combinatorics (6 / 22, `co-` — +Hall/SDR and block designs/Steiner/Latin squares)
   18. Probability Theory (8 / 29, `pr-` — M2 ch. 09/14 + Ross; +the jointly-distributed chapter: convolution, covariance, MGF, order statistics; +Poisson process)
   19. Statistics (8 / 31, `stat-` — M2 ch. 11 + OpenStax; +nonparametric tests)
   20. Real Analysis (9 / 38, `ra-` — Rudin; +Riemann-Stieltjes, inverse/implicit function theorems, Arzelà-Ascoli/Stone-Weierstrass)
   21. Complex Analysis (7 / 26, `ca-` — Churchill arc + Kreyszig; +argument principle/Rouché, Schwarz-Christoffel, harmonic/Dirichlet)
   22. Abstract Algebra (8 / 31, `ab-` — Gallian arc; +Sylow, class equation, finite abelian classification, prime/maximal ideals, ED/PID/UFD hierarchy)
   23. Topology (8 / 27, `top-` — Munkres arc; +Baire category)
   24. Numerical Analysis (7 / 28, `na-` — Burden & Faires + Kreyszig; +Hermite, Chebyshev economization, multistep/Adams, Householder/QR eigen)
   25. Mathematical Methods for Engineering (8 / 32, `em-` — Kreyszig + Boas; +gamma/beta/error functions, calculus of variations)
   26. Optimization and Operations Research (8 / 29, `or-` — Hillier + Taha; +game theory, decision analysis)
   27. Advanced Mathematical Foundations (7 / 25, `af-` — the capstone; +Polya's method, TeX typesetting)
28. Quantitative Aptitude ← **PLANNED (topic-inclusion guarantee pass, 2026-11-10, owner directive: 'make sure that all the topics or TOC of research drive survey must be included in their respective books... cover all the top exams of the world to maximum level') — the Khattar aptitude census's commercial family (profit and loss, discounts, interest, stocks/shares, partnership, alligation, ages, time-and-work, pipes and cisterns, time-speed-distance with trains/boats/races, clocks and calendars, number series, weighted averages, mensuration at exam speed, data sufficiency) had NO home on the shelf; book #28 created (12 ch / 44 planned lessons after the internet-research pass added ch. 11 'Modern Maths at Aptitude Speed' — Venn diagrams, P&C/probability/functions/logarithms/heights-and-distances at exam speed, per the Aggarwal + Arun Sharma censuses, `qa-` prefix reserved, status 'planned') with the no-duplication contract in its header (FM/ANS/AA/Geometry/Statistics/Logic cross-referenced); the world-exam register for CAT/SSC CGL/IBPS/SBI/CSAT/CA Foundation/GMAT/SAT/GRE quant — see docs/project/EXAM_REGISTRY.json)** — and the TOC-as-lessons pass (2026-11-11) plus the internet-research gap pass (2026-11-11, owner directive: 'use internet research for each book and think of your own if any lesson is missing add it') grew the
   whole shelf to 210 ch / 827 planned lessons (91 new planned lessons + 3 new
   chapters — geometry transformations, probability joint distributions, QA
   modern maths; every addition source-backed, see SOURCE_LOG's
   internet-research-gap section) with 379 surveyed topics folded
   into host lessons per docs/project/TOC_LESSON_GUIDE.md; lesson-level
   census 1,861 topics — 1,113 lessons + 379 folds + 369 cross-refs, 0 gaps**

**Authoring order is unchanged** (the planning and audit passes wrote zero
lessons): one book at a time — Advanced Algebra authoring opens run 90; the
24 planned books follow in backlog order as each predecessor completes.
Lesson-id prefixes for all 24 verified unused against the 120 written lesson
ids. **The topic-inclusion guarantee (2026-11-10): `scripts/verify_topic_coverage.ts`
audits all 1,876 topic entries of the Drive survey against the shelf — zero
missing topics; the same gate re-checks EXAM_REGISTRY.json (56 exams, researched
with coverage maps).**

## Physics (20 backlog lines → 19 books + 1 honest fold) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Physics full-shelf planning pass (2026-11-16, owner
directive: "create a researched books with chapter and topics for
sections like finance, physics etc all the listed in docs which can be
authored later"): the exam anchors read in full (the JEE Main 2026 +
NEET 2026 syllabus PDFs from the NTA, the GATE PH 2026 syllabus PDF from
IIT Guwahati, the CSIR NET Physical Sciences proposed-syllabus PDF), the
canonical arcs priced honestly (Halliday-Resnick-Walker's contents read
this pass; Taylor, French, Crawford, Zemansky, Griffiths ×3, Hecht,
Beiser/Krane, Eisberg-Resnick, Foot, Krane, Kittel/Ashcroft-Mermin,
Schroeder/Pathria, Taylor-Wheeler/Carroll, Carroll-Ostlie, Boas/Arfken,
Squires/Melissinos named as the poles), and all 19 books promoted to
`src/data/library/books/physics/<slug>/book.ts` with status 'planned' —
**172 chapters / 688 planned lessons, zero written** (the
one-unit-at-a-time authoring cadence unchanged). Evidence base:
`docs/research/PHYSICS_TOC_SURVEY.md`; durable generator:
`scripts/gen_physics_shelf.py` (plan data in
`scripts/shelf_data/physics_books_[abcd].py`); gate:
`scripts/verify-physics-shelf-planning.ts` (1317/1317); covers
registered in the `scripts/gen_covers.py` roster (139 → 181; art
generates idempotently).

The honest fold (no-duplication contract): *Fluid Mechanics* folds into
**mechanics** (fluid-statics + fluid-dynamics chapters — the physics
register's buoyancy, continuity and Bernoulli; the engineering shelf's
fluid-mechanics owns the thermo-fluids applied side, cross-referenced
both ways; properties-of-matter owns the matter-side: viscosity, surface
tension).

1. Foundation Physics (10 ch / 40 lessons, `pf-`, NCERT 9-10 register + JEE/NEET Unit 1, web)
2. Mechanics (12 / 48, `pmech-`, Halliday Parts 1-3 + Taylor + the fluid fold, web)
3. Properties of Matter (8 / 32, `prop-`, NCERT 11 mechanical properties + JEE, web)
4. Waves and Oscillations (9 / 36, `wav-`, JEE/NEET Oscillations-and-Waves + French/Crawford, web)
5. Heat and Thermodynamics (10 / 40, `heat-`, JEE/NEET KTG+Thermo + GATE PH + Zemansky, web)
6. Electricity and Magnetism (11 / 44, `emag-`, the class 11-12 E&M units + boards practicals, web)
7. Electromagnetic Theory (10 / 40, `emt-`, GATE PH EM Theory section + Griffiths, web)
8. Optics (10 / 40, `opt-`, JEE/NEET Ray+Wave Optics + Hecht, web)
9. Modern Physics (8 / 32, `mod-`, JEE/NEET Dual Nature+Atoms+Nuclei+Devices + Beiser/Krane, web)
10. Quantum Mechanics (9 / 36, `qm-`, GATE PH/CSIR NET QM section + Griffiths/Zettili, web)
11. Atomic Physics (8 / 32, `atom-`, GATE PH Atomic & Molecular + Eisberg-Resnick/Foot, web)
12. Nuclear Physics (9 / 36, `nuc-`, GATE PH Nuclear + Krane + NEET deepening, web)
13. Solid-State Physics (9 / 36, `ssp-`, GATE PH Condensed Matter + Kittel, web)
14. Statistical Mechanics (8 / 32, `statm-`, GATE PH/CSIR NET + Schroeder/Pathria, web)
15. Relativity (8 / 32, `rel-`, Taylor-Wheeler + Carroll named, web)
16. Astrophysics (8 / 32, `astro-`, Carroll-Ostlie named, web)
17. Particle Physics (8 / 32, `part-`, Griffiths Particles + CSIR NET, web)
18. Mathematical Physics (9 / 36, `mph-`, GATE PH Mathematical Physics section + Boas/Arfken, web)
19. Experimental Physics (8 / 32, `exp-`, boards practicals + GATE PH electronics + Squires, web)

**Authoring order**: unchanged — the Mathematics boat continues (AA in
progress) one book at a time per the standing pointer; the physics
shelf's 19 books follow in backlog order when the owner promotes them
(the same promotion rule as every planned shelf). Lesson-id prefixes for
all 19 verified unused against the 145 written lesson ids and distinct
from every mathematics/CS/engineering/humanities/languages prefix
(verify-physics-shelf-planning section E).

## Chemistry (15 backlog lines → 10 books + 5 honest folds) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Chemistry full-shelf planning pass (2026-11-16, the same
owner directive as the Physics + ECF passes, the same turn): the exam
anchors read in full (the GATE CY 2026 syllabus PDF from IIT Guwahati,
the CSIR NET Chemical Sciences syllabus PDF from csirhrdg.res.in, the
NEET 2026 syllabus PDF — the same NTA file the Physics pass read — and
the JEE Main 2026 syllabus), the canonical arcs priced honestly (the
(the Atkins Focus structure, the Clayden organic contents and the J.D. Lee
concise-inorganic contents read this pass via the publisher and LoC
catalog pages; Morrison & Boyd, Solomons, Vogel, Skoog, Lehninger,
Levine, Jensen, Shreve named as the poles), and all 10 books promoted to
`src/data/library/books/chemistry/<slug>/book.ts` with status 'planned'
— **91 chapters / 364 planned lessons, zero written**. Evidence base:
`docs/research/CHEMISTRY_TOC_SURVEY.md`; durable generator:
`scripts/gen_chemistry_shelf.py` (plan data in
`scripts/shelf_data/chemistry_books_[ab].py`); gate:
`scripts/verify-chemistry-shelf-planning.ts` (804/804); covers
registered in the `scripts/gen_covers.py` roster (181 → 191; art
generates idempotently).

The five honest folds (no-duplication contract): *General Chemistry*
folds into **foundation-chemistry** (the survey register is the school
ladder's own name); *Electrochemistry*, *Chemical Kinetics* and
*Advanced Chemical Thermodynamics* fold into **physical-chemistry** as
full chapter sets (the standard Atkins Focus arcs); *Materials* folds
OUT of the shelf to the engineering shelf's **materials-science** book
(the Callister register — cross-referenced, no new book).

1. Foundation Chemistry (10 ch / 40 lessons, `fchem-`, NCERT + Atkins-Jones Chemical Principles, web)
2. Physical Chemistry (12 / 48, `pchem-`, Atkins Focus structure + GATE CY + THE THREE FOLDS, web)
3. Organic Chemistry (11 / 44, `org-`, Clayden contents read + Morrison/Boyd + JEE/NEET, web)
4. Inorganic Chemistry (10 / 40, `inorg-`, J.D. Lee contents read + GATE CY bioinorganic, web)
5. Analytical Chemistry (8 / 32, `anal-`, Vogel + Skoog + CSIR NET register, web)
6. Environmental Chemistry (7 / 28, `envchem-`, NCERT environmental + the chemistry-side register, web)
7. Biochemistry (10 / 40, `biochem-`, Lehninger + NEET biomolecules, web)
8. Quantum Chemistry (8 / 32, `qchem-`, GATE CY quantum register + Levine, web)
9. Computational Chemistry (7 / 28, `cchem-`, Jensen + CSIR interdisciplinary, web)
10. Industrial Chemistry (8 / 32, `indchem-`, Shreve + NCERT everyday-life register, web)

**Authoring order**: unchanged — the Mathematics boat continues (AA in
progress) one book at a time per the standing pointer; the chemistry
shelf's 10 books follow in backlog order when the owner promotes them.
Lesson-id prefixes for all 10 verified unused against the 145 written
lesson ids and distinct from every other shelf's reserved prefix
(the near-miss avoided: `org-` vs math's `or-` — distinct strings).

## Computer Science & IT (49 backlog lines → 44 books + 5 honest folds) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the CS full-shelf planning pass (2026-11-15, owner directive: "as
all things are planned for mathematics do for computer science — same
method, same detail style depth"): the Drive's CS collection downloaded one
file at a time (27 TOC extractions — Sipser vision-transcribed in two
batches), every non-Drive book researched against its canonical sources on
the open web (TOCs actually opened, URLs in SOURCE_LOG.md), and all 44
books promoted to `src/data/library/books/computer-science/<slug>/book.ts`
with status 'planned' — 363 chapters / 1,146 planned lessons at the planning
pass; **grown by the CS exam-topic coverage pass (2026-11-15, owner
directive: "make sure those exams topics are to be covered in the books
see if any topics is missing in cs books") to 364 chapters / 1,218 planned
lessons, still zero written** (the one-unit-at-a-time authoring cadence
unchanged — the growth is planning-level: ~70 lessons added or renamed
across the shelf to carry the official exam vocabulary; Cybersecurity
gained the societal-layer chapter). Evidence base:
`docs/research/CS_TOC_SURVEY.md` + the exam-topic ledger
`docs/research/CS_EXAM_TOPIC_LEDGER.md` (251 official-syllabus topic lines
across GATE CSE / UGC NET CS&A / IOI / CUET UG 308 / IB DP CS / Cambridge
9618 / AP CS A — 251/251 direct, the seven registry entries carry
csUnits); gates: `scripts/verify-cs-shelf-planning.ts` (2,348/2,348) +
`scripts/verify-cs-exam-coverage.ts` (696/696) + covers 44/44
(`scripts/gen_covers.py`, VLM text-free sweep — one baked-text catch
regenerated clean).

The five honest folds (no-duplication contract): *Digital Electronics* and
*Boolean Algebra and Logic Gates* fold into **digital-logic-design** (one
Mano arc, Drive-extracted); *Automata* and *Formal Languages & Grammars*
fold into **theory-of-computation** (one Sipser arc, Drive-extracted);
*Discrete Maths for CS* is satisfied by the Mathematics shelf's existing
`discrete-mathematics` book (Rosen 8e — the CS standard; cross-reference).

1. Computer Fundamentals (8 ch / 25 lessons, `cf-`, Peter Norton 6e arc, web)
2. Digital Logic Design (10 / 37, `dld-`, Mano, Drive cs-14)
3. Computer Organization and Architecture (11 / 40, `coa-`, Stallings 11e + CS:APP 3e, Drive cs-08/cs-09)
4. Assembly and Microprocessors (9 / 29, `asm-`, CS:APP ch. 3 + the 8085/8086 arcs)
5. Data Structures (9 / 29, `ds-`, CLRS ch. 10-14 + Sedgewick + Skiena ch. 3)
6. Algorithms (10 / 38, `alg-`, CLRS 4e + Skiena 3e + Sedgewick 4e + Grokking — four poles)
7. Theory of Computation (10 / 33, `toc-`, Sipser 3e, Drive cs-23 VLM ×2)
8. Compiler Design (9 / 31, `cd-`, the dragon book, Drive cs-03)
9. Operating Systems (10 / 33, `os-`, Silberschatz OSC 10e + How Linux Works + TLPI)
10. Database Management Systems (10 / 33, `db-`, Silberschatz/Korth 7e, Drive cs-11)
11. Computer Networks (9 / 29, `net-`, Kurose 8e + Tanenbaum 5e)
12. Computer Graphics (9 / 27, `gfx-`, Hearn & Baker + Shirley/Marschner FoCG)
13. Software Engineering (9 / 29, `swe-`, Sommerville 10e + the GoF/HFDP extractions)
14. Object-Oriented Programming (9 / 29, `oop-`, GoF + Head-First DP + Core Java ch. 4-6)
15. Programming Languages and Paradigms (8 / 24, `plp-`, Sebesta 12e)
16. C Programming (8 / 25, `cprog-`, K&R 2e)
17. C++ Programming (8 / 25, `cpp-`, C++ Primer 5e + A Tour of C++ 2e)
18. Java Programming (9 / 28, `jav-`, Core Java 12e + TiJ 4e + Effective Java 3e + JCiP)
19. Python Programming (8 / 24, `py-`, Python Crash Course 2e)
20. JavaScript and Web Technologies (8 / 24, `js-`, JavaScript: The Definitive Guide 7e)
21. Frontend Engineering (8 / 24, `fed-`, roadmap.sh frontend + the framework docs)
22. Backend Engineering (8 / 26, `bed-`, Spring in Action 6e + roadmap.sh backend)
23. Full-Stack Web Development (7 / 20, `fsw-`, the Rheinwerk guide — the web family's capstone)
24. Distributed Systems (8 / 24, `dist-`, Coulouris 5e)
25. Cloud Computing (7 / 21, `cloud-`, the standard IaaS/PaaS/SaaS + provider-doc arcs)
26. Cybersecurity (8 / 26, `sec-`, Stallings & Brown 4e)
27. Cryptography (9 / 27, `crypt-`, Paar & Pelzl + Katz-Lindell named)
28. Artificial Intelligence (9 / 27, `ai-`, Russell & Norvig AIMA 4e)
29. Machine Learning (9 / 27, `mln-`, Bishop PRML + Goodfellow Part I)
30. Deep Learning (8 / 27, `dl-`, Goodfellow, Drive cs-12)
31. Natural Language Processing (8 / 24, `nlp-`, Jurafsky & Martin SLP 3e draft)
32. Computer Vision (8 / 24, `vis-`, Szeliski 2e)
33. Generative AI and LLMs (8 / 24, `genai-`, Stanford CS336 arc)
34. Reinforcement Learning (7 / 20, `rl-`, Sutton & Barto 2e)
35. Data Science (7 / 22, `dsci-`, Grus 2e)
36. Big Data Engineering (7 / 21, `bde-`, Hadoop: The Definitive Guide 4e + the streaming era)
37. Data Mining (7 / 21, `mine-`, Tan/Steinbach/Karpatne/Kumar 2e)
38. Information Retrieval (7 / 21, `ir-`, Manning/Raghavan/Schütze)
39. Blockchain (7 / 21, `bchain-`, Antonopoulos 2e)
40. Internet of Things (7 / 21, `iot-`, the standard IoT arcs)
41. Mobile App Development (7 / 21, `mob-`, Google's Android Developer Fundamentals)
42. Human-Computer Interaction (7 / 21, `hci-`, Shneiderman 6e)
43. Parallel Computing (7 / 21, `par-`, Grama 2e)
44. Advanced Computer Science (7 / 21, `acs-`, the capstone — the research doorstep)

**Authoring order**: unchanged — the Mathematics boat continues (AA in
progress) one book at a time per the standing pointer; the CS shelf's
44 books follow in backlog order when the owner promotes them (the same
promotion rule as Mathematics: research phase done → book lives planned;
authoring opens by directive). Lesson-id prefixes for all 44 verified
unused against the 143 written lesson ids (verify-cs-shelf-planning
section E).

## Engineering (40 backlog lines → 38 books + 3 honest folds) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Engineering full-shelf planning pass (2026-11-16, owner
directive: "creat all things how like other subjects like maths and cs create
it for engineering with books topic same way as like other subject"): the four
GATE 2026 branch syllabi (ME/CE/EE/EC from gate2026.iitg.ac.in) downloaded and
extracted in full, every book web-researched against its canonical sources
(the Drive holds 0 engineering sources — honest note; the PHYSICS subfolder
is banked for the future Physics pass), and all 38 books promoted to
`src/data/library/books/engineering/<slug>/book.ts` with status 'planned' —
**342 chapters / 1268 planned lessons, zero written** (the
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
mining · agricultural · nuclear engineering.

## Biology (9)
Foundation · Cell Biology · Molecular Biology · Genetics · Evolutionary ·
Ecology · Biotechnology · Microbiology · Immunology

## Botany (7) / Zoology (8)
Plant Anatomy · Physiology · Taxonomy · Ecology · Genetics · Pathology ·
Economic Botany ‖ Animal Diversity · Anatomy · Physiology · Developmental ·
Behaviour · Evolution · Entomology · Parasitology

## Medical Sciences (14+)
Anatomy · Physiology · Biochemistry · Histology · Pathology · Pharmacology ·
Microbiology · Immunology · Forensic Medicine · Community Medicine ·
Medicine · Surgery · Obstetrics & Gynaecology · Pediatrics + specialties;
also dentistry, nursing, pharmacy, veterinary, physiotherapy

## Economics, Commerce & Finance (24 backlog lines → 23 books + 1 honest fold) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Economics, Commerce & Finance full-shelf planning pass
(2026-11-16, the same owner directive as the Physics pass, the same
turn): the exam anchors read in full (the UGC NET subject-code register
at ugcnetonline.in — Economics 01, Commerce 08, Management 17, HRM 55 —
plus the unit lists corroborated at the syllabus mirrors; the Mankiw
Principles chapter list and the Brealey-Myers-Allen evergreen apparatus
+ the LoC catalog TOC), every book web-researched against its canonical
sources (Varian, Blanchard, Krugman-Obstfeld-Melitz, Todaro-Smith,
Rosen-Gayer, Mishkin, Wooldridge, Kahneman/Thaler, Bodie-Kane-Marcus,
Hull, Khan-Jain, T.S. Grewal, Horngren, Kotler-Armstrong, Dessler,
Heizer-Render, Hill, Hisrich, Goon-Gupta-Dasgupta named as the poles),
and all 23 books promoted to
`src/data/library/books/economics-commerce/<slug>/book.ts` with status
'planned' — **195 chapters / 780 planned lessons, zero written**. The
economics ladder owns the theory register (UGC NET Economics units 1-4
priced), the commerce-and-management lines own the professional register
(UGC NET Commerce + Management + code 55). Evidence base:
`docs/research/ECF_TOC_SURVEY.md`; durable generator:
`scripts/gen_economics_finance_shelf.py` (plan data in
`scripts/shelf_data/ecf_books_[abcd].py`); gate:
`scripts/verify-ecf-shelf-planning.ts` (1482/1482); covers registered
in the `scripts/gen_covers.py` roster (139 → 181; art generates
idempotently).

The honest fold (no-duplication contract): *Financial Management* +
*Corporate Finance* merge into ONE book
**financial-management-and-corporate-finance** (the Khan & Jain Indian
MBA register and the Brealey-Myers-Allen canonical arc are the two
spines of one field — the Circuit-Theory fold precedent).

1. Foundation Economics (10 ch / 40 lessons, `fecon-`, NCERT + Mankiw principles, web)
2. Microeconomics (11 / 44, `micro-`, UGC NET unit 1 + Varian/Nicholson-Snyder, web)
3. Macroeconomics (10 / 40, `macro-`, UGC NET unit 2 + Mankiw/Blanchard, web)
4. International Economics (9 / 36, `ieco-`, Krugman-Obstfeld-Melitz + Salvatore, web)
5. Development Economics (8 / 32, `deveco-`, Todaro-Smith + Thirlwall + Sen, web)
6. Public Economics (9 / 36, `pubeco-`, Rosen-Gayer + Musgrave + the Indian budget register, web)
7. Monetary Economics (8 / 32, `moneco-`, Mishkin + the RBI register, web)
8. Econometrics (9 / 36, `econ-`, UGC NET unit 3 + Wooldridge/Gujarati, web)
9. Behavioural Economics (7 / 28, `behav-`, Kahneman + Thaler, web — the frontier register)
10. Financial Economics (8 / 32, `fineco-`, the theory side: Markowitz/CAPM/Black-Scholes named, web)
11. Business Studies (8 / 32, `bus-`, NCERT 11-12 + Fayol/Taylor, web)
12. Accounting (8 / 32, `acct-`, NCERT 11-12 + T.S. Grewal + CA Foundation first pass, web)
13. Cost Accounting (8 / 32, `cost-`, Horngren + the ICAI register, web)
14. Financial Management & Corporate Finance (11 / 44, `corpfin-`, THE FOLD: Brealey-Myers-Allen + Khan & Jain, web)
15. Banking (8 / 32, `bank-`, UGC NET Commerce banking unit + the Indian system register, web)
16. Investment Analysis (8 / 32, `invest-`, Bodie-Kane-Marcus + Reilly-Brown + the Indian market register, web)
17. Statistics for Economics (7 / 28, `stateco-`, UGC NET unit 3 statistics half + Goon-Gupta-Dasgupta, web)
18. Business Mathematics (8 / 32, `busmath-`, CA Foundation quantitative + BCom arc, web)
19. Entrepreneurship (8 / 32, `entrep-`, NCERT 11-12 + Hisrich + the Startup-India register, web)
20. Marketing (8 / 32, `mktg-`, Kotler-Armstrong + UGC NET Commerce/Management units, web)
21. Human Resource Management (8 / 32, `hrm-`, Dessler + UGC NET Management 17 / HRM 55, web)
22. Operations Management (8 / 32, `ops-`, Heizer-Render + Mahadevan, web)
23. International Business (8 / 32, `intbus-`, Hill + UGC NET Commerce unit 1, web)

**Authoring order**: unchanged — the Mathematics boat continues (AA in
progress) one book at a time per the standing pointer; the ECF shelf's
23 books follow in backlog order when the owner promotes them. Lesson-id
prefixes for all 23 verified unused against the 145 written lesson ids
and distinct from every mathematics/CS/engineering/humanities/languages/
physics prefix (verify-ecf-shelf-planning section E).

## Humanities & Social Sciences (21+ backlog lines → 16 books + honest folds) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Humanities & Social Sciences full-shelf planning pass
(2026-11-16, owner directive: "create all things like you did for engineering
do it for humanities and social science and languages section"): the exam
anchors read in full (the UPSC CSE Main GS-I/II/IV registers + the nine
relevant optional-subject registers + the UGC NET subject list + the College
Board AP units + the CLAT register), every book web-researched against its
canonical sources (the Drive holds 0 humanities sources — honest census), and
all 16 books promoted to `src/data/library/books/humanities/<slug>/book.ts`
with status 'planned' — **157 chapters / 620 planned lessons, zero written**
(the one-unit-at-a-time authoring cadence unchanged). Evidence base:
`docs/research/HUMANITIES_TOC_SURVEY.md`; durable generator:
`scripts/gen_humanities_shelf.py`; gates:
`scripts/verify-humanities-shelf-planning.ts` (1,121/1,121) + covers 16/16
(`scripts/gen_covers.py` roster 110 → 139-book roster; VLM text-free sweep).

The honest folds (no-duplication contract): *Ancient*, *Medieval* and *Modern*
(history) merge into ONE 12-chapter book **indian-history** (the three period
names for one national arc; the engineering Circuit-Theory fold precedent);
*Human Geography* + *Physical Geography* into **geography** (the Goh Cheng
Leong Certificate arc is exactly this pair in one volume); *Heritage Studies*
into **archaeology-and-heritage-studies**; *Art History* owned HERE as
**art-history** (the academic discipline; the future Arts shelf cross-references
it for the practice-side crafts — no duplication).

1. World History (11 ch / 43 lessons, `wh-`, Strayer Ways of the World + Arjun Dev NCERT pair + Norman Lowe + AP World History units, web)
2. Indian History (12 / 45, `ih-`, Ancient+Medieval+Modern folded: Sharma/Chandra/Bipan Chandra + NCERT Themes + UPSC History optional, web)
3. Political Science (10 / 40, `pol-`, Heywood Politics 10e full TOC + NCERT 12 + UPSC PSIR optional, web)
4. International Relations (9 / 36, `intl-`, Baylis/Smith/Owens GWP 9e + UPSC GS-II, web)
5. Public Administration (9 / 36, `padm-`, Nicholas Henry arc + UPSC PubAd optional + UGC NET 14, web)
6. Law and Legal Studies (10 / 40, `law-`, UGC NET Law units + CLAT register + the Constitution arc, web)
7. Sociology (10 / 39, `soc-`, Giddens & Sutton 10e + NCERT 11/12 pair + UPSC Sociology optional, web)
8. Anthropology (10 / 39, `anth-`, Ember & Ember 16e full 26-ch TOC + UPSC Anthropology optional, web)
9. Cultural Studies (8 / 31, `cult-`, Barker & Jane 5e + the media register, web)
10. Psychology (10 / 40, `psy-`, NCERT class 12 + the AP Psychology CED + UPSC Psychology optional, web)
11. Philosophy (10 / 40, `phil-`, UPSC Philosophy optional register — the Indian darshanas + the Western arc, web)
12. Ethics (9 / 36, `eth-`, UPSC GS-IV full register + the moral-theory arc, web)
13. Geography (12 / 48, `geog-`, Goh Cheng Leong Certificate + NCERT 11/12 + AP Human Geography, web)
14. Environmental Studies (8 / 32, `evs-`, Bharucha AEERS textbook + UGC NET 89, web)
15. Archaeology and Heritage Studies (9 / 35, `arch-`, Renfrew & Bahn + UGC NET Museology/Archaeology, web)
16. Art History (10 / 40, `arth-`, Gardner's Global History 16e + NCERT Indian Art, web)

**Authoring order**: unchanged — the Mathematics boat continues (AA in
progress) one book at a time per the standing pointer; the humanities
shelf's 16 books follow in backlog order when the owner promotes them (the
same promotion rule as Mathematics, CS and Engineering). Lesson-id prefixes
verified unused across all written lesson ids and distinct from every
mathematics/CS/engineering prefix (verify-humanities-shelf-planning section E;
the near-misses avoided: `intl-` because CS reserves `ir-`, `geog-` because
mathematics reserves `geo-`, `evs-` because engineering reserves `env-`).

## Languages (13) — **THE FULL SHELF IS PLANNED (audited)**
Planned by the Languages full-shelf planning pass (2026-11-16, the same owner
directive as the Humanities pass): the CEFR framework page + every official
exam register (JLPT, Goethe-Zertifikat, DELF-DALF, DELE, HSK, TOPIK, IELTS,
TOEFL, CLEP) read in full, every book web-researched against its canonical
course arcs, and all 13 books promoted to
`src/data/library/books/languages/<slug>/book.ts` with status 'planned' —
**122 chapters / 488 planned lessons, zero written**. The 13 backlog lines map
one-to-one (no folds); each book follows the backlog's own template: script →
phonetics → vocabulary → grammar → literacy → fluency → exam-prep. Evidence
base: `docs/research/LANGUAGES_TOC_SURVEY.md`; durable generator:
`scripts/gen_languages_shelf.py`; gate:
`scripts/verify-languages-shelf-planning.ts` (923/923) + covers 13/13.

1. English (10 ch / 40 lessons, `eng-`, Murphy English Grammar in Use + the IELTS/TOEFL registers, web)
2. Hindi (9 / 36, `hin-`, Agnihotri Hindi: An Essential Grammar + the NCERT register, web)
3. Sanskrit (10 / 40, `sansk-`, Coulson Teach Yourself Sanskrit + the sandhi arc, web)
4. Japanese (10 / 40, `jpn-`, GENKI 3e (23 lessons) + the JLPT N5-N4 register, web)
5. German (10 / 40, `ger-`, Menschen + Hammer's + the Goethe A1-B1 ladder, web)
6. French (9 / 36, `fr-`, Valette & Valette Contacts + DELF A1-B1, web)
7. Spanish (9 / 36, `spa-`, Madrigal's Magic Key + the cognate engine + DELE A1-B1, web)
8. Mandarin (9 / 36, `mand-`, Integrated Chinese + HSK 1-4 register, web)
9. Korean (9 / 36, `kor-`, Integrated Korean + TOPIK I register, web)
10. Arabic (10 / 40, `arab-`, Al-Kitaab + Alif Baa + the MSA registers, web)
11. Russian (9 / 36, `rus-`, Golosa: A Basic Course in Russian + the case engine, web)
12. Portuguese (9 / 36, `port-`, Whitlam Modern Brazilian Portuguese Grammar + the map, web)
13. Italian (9 / 36, `ita-`, Practice Makes Perfect Complete Italian Grammar + the registers, web)

**Authoring order**: unchanged — same promotion rule as every planned shelf.
Lesson-id prefixes verified unused across all written lesson ids and distinct
from every mathematics/CS/engineering/humanities prefix
(verify-languages-shelf-planning section E; the noted near-miss: `eng-` for
ENGLISH while the Engineering shelf reserves no `eng-` — it uses
mech-/som-/etc. — no string collision).

## Arts, Music & Creation
**Music (13):** Theory · Notation · Rhythm & Meter · Harmony ·
Counterpoint · Ear Training · Composition · History · Acoustics ·
Instrument Studies · Vocal · Production · DAWs
**Visual Arts (13):** Drawing · Painting · Colour Theory · Perspective ·
Illustration · Sculpture · Art History · Graphic Design · Typography ·
Photography · Digital Art · Animation · 3D Modelling
**Performing Arts (9):** Dance Fundamentals · Classical Dance ·
Contemporary Dance · Theatre · Acting · Film Studies · Cinematography ·
Screenwriting · Stage Production
**Also:** architecture · interior design · fashion design · creative
writing · literature
