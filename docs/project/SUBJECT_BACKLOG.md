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

## Physics (20)
Foundation · Mechanics · Properties of Matter · Waves and Oscillations ·
Heat and Thermodynamics · Fluid Mechanics · Electricity and Magnetism ·
Electromagnetic Theory · Optics · Modern Physics · Quantum Mechanics ·
Atomic Physics · Nuclear Physics · Solid-State Physics · Statistical
Mechanics · Relativity · Astrophysics · Particle Physics · Mathematical
Physics · Experimental Physics

## Chemistry (15)
Foundation · General · Physical · Organic · Inorganic · Analytical ·
Environmental · Biochemistry · Electrochemistry · Chemical Kinetics ·
Quantum Chemistry · Computational · Industrial · Materials · Advanced
Chemical Thermodynamics

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

## Economics, Commerce & Finance (23)
Foundation Economics · Micro · Macro · International · Development ·
Public · Monetary · Econometrics · Behavioural · Financial Economics ·
Business Studies · Accounting · Cost Accounting · Financial Management ·
Corporate Finance · Banking · Investment Analysis · Statistics for
Economics · Business Mathematics · Entrepreneurship · Marketing · HR ·
Operations · International Business

## Humanities & Social Sciences (21+)
World History · Indian History · Ancient · Medieval · Modern · Political
Science · International Relations · Sociology · Psychology · Philosophy ·
Ethics · Anthropology · Geography · Human Geography · Physical Geography ·
Environmental Studies · Archaeology · Public Administration · Cultural
Studies · Law & Legal Studies · Art History · Heritage Studies

## Languages (13)
English · Hindi · Sanskrit · Japanese · German · French · Spanish ·
Mandarin · Korean · Arabic · Russian · Portuguese · Italian — each with
script → phonetics → vocabulary → grammar → literacy → fluency →
exam-prep (JLPT/Goethe/DELF-DALF/DELE/HSK/TOPIK/IELTS/TOEFL where relevant)

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
