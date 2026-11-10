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
4. Advanced Algebra ← **PROMOTED (run 89, 2026-11-10: research phase complete — reference survey + syllabus audit + the 10-chapter/36-lesson plan; `src/data/library/books/mathematics/advanced-algebra/` status 'planned'; authoring opens run 90 with 1.1 + 1.2; the 36th lesson (ch. 9 log tables) added by the topic-inclusion guarantee pass, 2026-11-10)**
5–27. The remaining twenty-three books ← **PLANNED (full-shelf planning pass, 2026-11-10, owner directive — every book's research phase executed in one pass: the Drive's mathematics collection downloaded book-by-book, ALL 53 tables of contents extracted (vision-model transcription for the 44 scanned sources), web syllabus audits (NCERT class 9–12 lists, JEE Main 2026 units incl. the 2024 removals, classic university arcs), each book promoted to `src/data/library/books/mathematics/<slug>/book.ts` with its complete researched chapter/lesson layout, status 'planned'; the evidence base is `docs/research/DRIVE_TOC_SURVEY.md`)**:
   5. Geometry (11 ch / 38 lessons, `geo-`)
   6. Coordinate Geometry (13 / 46, `cg-` — M3 + M5 modules)
   7. Trigonometry (8 / 31, `tr-` — M1 module + Loney; +the quadrilaterals/regular-polygons lesson from the audit pass)
   8. Differential Calculus (9 / 32, `dc-` — M4 ch. 2–6 + Thomas/Stewart)
   9. Integral Calculus (6 / 22, `ic-` — M4 ch. 7–9 + Thomas)
   10. Multivariable Calculus (6 / 20, `mc-` — Thomas/Stewart multivariable)
   11. Differential Equations (7 / 26, `de-` — M4 ch. 10 + Kreyszig; +the systems/phase-plane chapter from the audit pass)
   12. Linear Algebra (8 / 28, `la-` — M2 ch. 12–13 + Strang/Axler/Lay)
   13. Discrete Mathematics (9 / 30, `dm-` — Rosen 8e)
   14. Number Theory (10 / 34, `nt-` — Burton arc, web-researched)
   15. Set Theory (8 / 26, `st-` — Halmos arc)
   16. Mathematical Logic (7 / 23, `ml-` — M2 ch. 10 + Rosen ch. 1)
   17. Combinatorics (6 / 21, `co-`)
   18. Probability Theory (7 / 24, `pr-` — M2 ch. 09/14)
   19. Statistics (8 / 27, `stat-` — M2 ch. 11 + OpenStax)
   20. Real Analysis (9 / 30, `ra-` — Rudin, Drive scan)
   21. Complex Analysis (7 / 23, `ca-` — Churchill arc + Kreyszig)
   22. Abstract Algebra (8 / 27, `ab-` — Gallian arc)
   23. Topology (8 / 25, `top-` — Munkres arc)
   24. Numerical Analysis (7 / 23, `na-` — Burden & Faires + Kreyszig)
   25. Mathematical Methods for Engineering (8 / 26, `em-` — Kreyszig)
   26. Optimization and Operations Research (8 / 26, `or-` — Hillier)
   27. Advanced Mathematical Foundations (7 / 22, `af-` — the capstone)
28. Quantitative Aptitude ← **PLANNED (topic-inclusion guarantee pass, 2026-11-10, owner directive: 'make sure that all the topics or TOC of research drive survey must be included in their respective books... cover all the top exams of the world to maximum level') — the Khattar aptitude census's commercial family (profit and loss, discounts, interest, stocks/shares, partnership, alligation, ages, time-and-work, pipes and cisterns, time-speed-distance with trains/boats/races, clocks and calendars, number series, weighted averages, mensuration at exam speed, data sufficiency) had NO home on the shelf; book #28 created (11 ch / 39 planned lessons, `qa-` prefix reserved, status 'planned') with the no-duplication contract in its header (FM/ANS/AA/Geometry/Statistics/Logic cross-referenced); the world-exam register for CAT/SSC CGL/IBPS/SBI/CSAT/CA Foundation/GMAT/SAT/GRE quant — see docs/project/EXAM_REGISTRY.json)** — and the TOC-as-lessons pass (2026-11-11) grew the
   whole shelf to 207 ch / 736 planned lessons (25 new planned lessons +
   DM's 'Models of Computation' chapter) with 403 surveyed topics folded
   into host lessons per docs/project/TOC_LESSON_GUIDE.md; lesson-level
   census 1,861 topics — 1,068 lessons + 403 folds + 390 cross-refs, 0 gaps**

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

## Computer Science & IT (49)
Computer Fundamentals · Digital Logic Design · Digital Electronics ·
Boolean Algebra and Logic Gates · COA · Assembly & Microprocessors ·
Data Structures · Algorithms · Discrete Maths for CS · Theory of
Computation · Automata · Formal Languages & Grammars · Compiler Design ·
Operating Systems · DBMS · Computer Networks · Computer Graphics ·
Software Engineering · OOP · Programming Languages & Paradigms · C · C++ ·
Java · Python · JavaScript & Web Technologies · Frontend · Backend ·
Full-Stack · Distributed Systems · Cloud Computing · Cybersecurity ·
Cryptography · AI · ML · Deep Learning · NLP · Computer Vision · GenAI &
LLMs · Reinforcement Learning · Data Science · Big Data Engineering ·
Data Mining · Information Retrieval · Blockchain · IoT · Mobile App Dev ·
HCI · Parallel & Distributed Computing · Advanced CS Research

## Engineering
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
mining · agricultural · nuclear engineering

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
