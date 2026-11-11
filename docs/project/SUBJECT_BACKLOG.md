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
