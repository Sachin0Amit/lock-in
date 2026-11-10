#!/usr/bin/env python3
"""build_toc_survey.py — assemble docs/research/DRIVE_TOC_SURVEY.md from
the extracted Drive TOCs (temporary-references/tocs/*.txt, produced by
the 2026-11-10 full-shelf planning pass: download one book at a time →
pdftotext for digital PDFs → VLM vision transcription for scanned ones
→ delete the working copy per the storage law).

Arrangement (owner directive): book-wise, theory-wise — every source's
TOC transcribed in full (nothing missed), each mapped to the shelf
book(s) it informs, plus the exam/exercise typology census and the
web-research findings that complete the planning evidence base.
"""
import os
import re
import json

BASE = '/home/z/my-project'
TR = f'{BASE}/temporary-references'
OUT = f'{BASE}/docs/research/DRIVE_TOC_SURVEY.md'

manifest = []
for line in open(f'{TR}/manifest.tsv'):
    parts = line.rstrip('\n').split('\t')
    if len(parts) >= 3:
        manifest.append((parts[0], parts[1], parts[2]))

SHELF_MAP = {
    'm1-01': ('Trigonometry (cross-ref: AA ch. 9 owns logs)', 'advanced-algebra'),
    'm1-02': ('Trigonometry ch. 2', 'trigonometry'),
    'm1-03': ('Trigonometry ch. 3', 'trigonometry'),
    'm1-04': ('Trigonometry ch. 4', 'trigonometry'),
    'm1-05': ('Trigonometry ch. 6', 'trigonometry'),
    'm1-06': ('Trigonometry ch. 7', 'trigonometry'),
    'm1-07': ('Trigonometry ch. 5', 'trigonometry'),
    'm2-01': ('Set Theory ch. 1 recall / ANS bank', 'set-theory'),
    'm2-02': ('Advanced Algebra ch. 2/8 (banked run 89)', 'advanced-algebra'),
    'm2-03': ('Advanced Algebra ch. 3 (banked run 89)', 'advanced-algebra'),
    'm2-04': ('Advanced Algebra ch. 7 (banked run 89)', 'advanced-algebra'),
    'm2-05': ('Advanced Algebra ch. 5 (banked run 89)', 'advanced-algebra'),
    'm2-06': ('Advanced Algebra ch. 4 (banked run 89)', 'advanced-algebra'),
    'm2-07': ('Advanced Algebra ch. 6 (banked run 89); Combinatorics ch. 1 recall', 'advanced-algebra'),
    'm2-08': ('Advanced Algebra ch. 7 (banked run 89)', 'advanced-algebra'),
    'm2-09': ('Probability Theory ch. 1-2', 'probability-theory'),
    'm2-10': ('Mathematical Logic ch. 1', 'mathematical-logic'),
    'm2-11': ('Statistics ch. 2-3', 'statistics'),
    'm2-12': ('Linear Algebra ch. 2', 'linear-algebra'),
    'm2-13': ('Linear Algebra ch. 1', 'linear-algebra'),
    'm2-14': ('Probability Theory ch. 2-3, 5', 'probability-theory'),
    'm3-01': ('Coordinate Geometry ch. 1', 'coordinate-geometry'),
    'm3-02': ('Coordinate Geometry ch. 2', 'coordinate-geometry'),
    'm3-03': ('Coordinate Geometry ch. 3', 'coordinate-geometry'),
    'm3-04': ('Coordinate Geometry ch. 4', 'coordinate-geometry'),
    'm3-05': ('Coordinate Geometry ch. 5', 'coordinate-geometry'),
    'm3-06': ('Coordinate Geometry ch. 6', 'coordinate-geometry'),
    'm3-07': ('Coordinate Geometry ch. 7-8', 'coordinate-geometry'),
    'm4-01': ('Cross-ref: AA ch. 1 owns relations/functions', 'advanced-algebra'),
    'm4-02': ('Differential Calculus ch. 1', 'differential-calculus'),
    'm4-03': ('Differential Calculus ch. 3-4', 'differential-calculus'),
    'm4-04': ('Differential Calculus ch. 2-3', 'differential-calculus'),
    'm4-05': ('Differential Calculus ch. 5, 7', 'differential-calculus'),
    'm4-06': ('Differential Calculus ch. 6, 8', 'differential-calculus'),
    'm4-07': ('Integral Calculus ch. 1-2', 'integral-calculus'),
    'm4-08': ('Integral Calculus ch. 3-4', 'integral-calculus'),
    'm4-09': ('Integral Calculus ch. 5', 'integral-calculus'),
    'm4-10': ('Differential Equations ch. 1-2', 'differential-equations'),
    'm5-01': ('Coordinate Geometry ch. 9', 'coordinate-geometry'),
    'm5-02': ('Coordinate Geometry ch. 10', 'coordinate-geometry'),
    'm5-03': ('Coordinate Geometry ch. 11', 'coordinate-geometry'),
    'm5-04': ('Coordinate Geometry ch. 12', 'coordinate-geometry'),
    'root-loney-trigonometry': ('Trigonometry depth pole (classic, 1893)', 'trigonometry'),
    'root-thomas-calculus-14e': ('Differential + Integral Calculus depth pole; Multivariable Calculus spine', 'multivariable-calculus'),
    'root-stewart-et-metric': ('Calculus sequencing cross-check; Multivariable vector-calc arc', 'multivariable-calculus'),
    'root-kreyszig-eng-math': ('Differential Equations, Mathematical Methods, Numerical Analysis, Optimization and OR reference spine', 'mathematical-methods-for-engineering'),
    'root-rudin-pma-3e': ('Real Analysis spine (classic, scanned)', 'real-analysis'),
    'root-rosen-discrete-8e': ('Discrete Mathematics spine; Mathematical Logic ch. 2-4 cross-check', 'discrete-mathematics'),
    'root-strang-intro-la-5e': ('Linear Algebra computational pole', 'linear-algebra'),
    'root-axler-ladr-4e': ('Linear Algebra proof-first pole', 'linear-algebra'),
    'root-lay-laa-5e': ('Linear Algebra applications pole', 'linear-algebra'),
    'root-khattar-qa': ('Aptitude-exam scope (Geometry/Number Theory/Trigonometry aptitude cross-checks; Statistics DI chapters)', 'statistics'),
    'root-elementary-algebra-text': ('IDENTIFIED: Hall & Knight, Elementary Algebra for Schools — the AL book\'s banked classic (hall-knight-elementary-algebra key)', 'elementary-algebra'),
}

EXAM_TYPES = {
    'module': ('Concept Application Exercise (inline, per topic) — the Cengage '
               'drill; end-of-chapter Exercises: Single Correct Answer Type, '
               'Multiple Correct Answers Type, Linked Comprehension Type, '
               'Matrix Match Type, Numerical Value Type; Archives (past-year '
               'JEE Main + JEE Advanced questions); Answers Key; per-chapter '
               'Hints and Solutions sections.'),
    'loney': ('Classic exercise arc: graduated Examples with solutions, '
              'Miscellaneous Examples, five-figure tables (the 1918 edition note).'),
    'kreyszig': ('Problem Sets per section; Chapter Review Questions and '
                 'Problems; the applied-engineering problem style (GATE-scope cousin).'),
    'burden': ('University-course problem style: regular exercises, applied '
               'exercises, and computational projects (the GATE numerical-methods cousin).'),
}

def toc_text(key):
    path = f'{TR}/tocs/{key}.txt'
    if not os.path.exists(path):
        return None
    txt = open(path).read().strip()
    if not txt:
        return None
    return txt

missing = [k for k, _, _ in manifest if toc_text(k) is None]
if missing:
    raise SystemExit(f'ABORT: missing TOCs: {missing}')

sections = []
intro = """# DRIVE TOC SURVEY — the Mathematics shelf's reference evidence base

> Built by the **full-shelf planning pass** of 2026-11-10 (owner directive:
> download the Drive's mathematics books one by one, extract EVERY table of
> contents — vision model transcription for the scanned ones — arrange it
> all book-wise/theory-wise, and plan the entire Mathematics shelf from
> it). Working copies were deleted after extraction per the storage law;
> Drive originals untouched. This file is the durable record: every TOC
> below is transcribed in full, each source is mapped to the shelf book(s)
> it informs, and the exam typology census records the exercise types the
> reference books actually carry. The 23 book plans it produced live in
> `src/data/library/books/mathematics/<slug>/book.ts` (status 'planned').

## Method

53 sources processed, one at a time: **42 Cengage JEE module chapter PDFs**
(MATHS subfolder M1–M5, all scanned) + **11 root-level classics**. Digital
PDFs → `pdftotext` front matter; scanned PDFs → front pages rendered at
120 dpi → transcribed by the vision model (`z-ai vision`, one book per
call, 6 pages for module chapter-books / 16 for the classic tomes) with a
transcribe-everything prompt (topic numbers, titles, subtopics, exercise
types, page numbers). VLM output saved per source below. Downloads and
renders driven by `scripts/extract_drive_tocs.sh` + the chunked
`scripts/toc_pipeline_chunk.sh` (the sandbox reaps background daemons, so
the pipeline ran as bounded chunks inside single invocations).

**Census: 53/53 TOCs extracted — nothing missed.**

The 23 planned shelf books this evidence base informed (ids as registered
in `src/data/library/index.ts`): `geometry`, `coordinate-geometry`,
`trigonometry`, `differential-calculus`, `integral-calculus`,
`multivariable-calculus`, `differential-equations`, `linear-algebra`,
`discrete-mathematics`, `number-theory`, `set-theory`,
`mathematical-logic`, `combinatorics`, `probability-theory`,
`statistics`, `real-analysis`, `complex-analysis`, `abstract-algebra`,
`topology`, `numerical-analysis`, `mathematical-methods-for-engineering`,
`optimization-and-operations-research`, `advanced-mathematical-foundations`.
The books whose evidence is web-researched rather than Drive-extracted
(Number Theory, Set Theory's axiomatic arc, Mathematical Logic beyond the
module chapter, Combinatorics beyond the AA bank, Complex Analysis's
Churchill arc, Abstract Algebra, Topology, Numerical Analysis's Burden
arc, Optimization/OR, the Foundations capstone, and Geometry's school
canon) carry their verified classic arcs in their book.ts research
headers — summarized in the web-research section below.

## The Drive collection's mathematics map

- `MATHS/M1 Trigonometry` (7 chapter PDFs) → the **Trigonometry** book's
  core (its ch. 1 'Logarithm and Its Properties' belongs to Advanced
  Algebra ch. 9 — cross-referenced, no duplication).
- `MATHS/M2 Algebra` (14 chapter PDFs) → ch. 01–08 banked by **Advanced
  Algebra** (run 89); ch. 09/14 → **Probability Theory**; ch. 10 →
  **Mathematical Logic**; ch. 11 → **Statistics**; ch. 12–13 → **Linear
  Algebra**.
- `MATHS/M3 Coordinate Goemetry` (7) + `MATHS/M5 3D Geometry` (4) → the
  **Coordinate Geometry** book (M5's vector algebra is the MATHS shelf's
  own home for vectors; vector CALCULUS stays in Multivariable Calculus).
- `MATHS/M4 Calculus` (10) → ch. 01 → AA ch. 1 (cross-ref); ch. 02–06 →
  **Differential Calculus**; ch. 07–09 → **Integral Calculus**; ch. 10 →
  **Differential Equations**.
- Root classics: Loney **Trigonometry** (1893 classic, scanned); Thomas'
  Calculus 14e + Stewart ET (the two calculus sequencing poles; their
  multivariable chapters are the **Multivariable Calculus** spine);
  Kreyszig (the **Mathematical Methods** spine + DE/NA/OR applied arcs);
  Rudin PMA 3e (the **Real Analysis** spine, scanned); Rosen 8e (the
  **Discrete Mathematics** spine); Strang/Axler/Lay (the three **Linear
  Algebra** poles); Khattar QA (the aptitude census); Hall & Knight
  Elementary Algebra (the banked AL classic, identified this pass).
- Same-arc editions available on the Drive but not re-downloaded for this
  survey (ids in `temporary-references/inventory.json`): Anton Calculus
  10e, Larson 11e, Larson ETF 7e, Stewart 8e (dokumen), Stewart 9e
  SOLUTIONS, Schaum's Linear Algebra 6e, Strang LAA 4e, Hall & Knight
  Higher Algebra ×2 (TOC banked run 66). They are per-unit download
  candidates at authoring time.
"""
sections.append(intro)

# ---- per-source TOC entries ----
entries = ['# The extracted TOCs, source by source\n']
entries.append('Arranged module-wise then classic-wise; each entry: Drive id, '
               'page count, method (text layer or VLM vision), the shelf mapping, '
               'and the complete transcription.\n')

stats = {}
for key, fid, label in manifest:
    txt = toc_text(key)
    method = 'VLM vision transcription (scanned)'
    if key.startswith('root-') and key not in ('root-loney-trigonometry', 'root-rudin-pma-3e'):
        method = 'pdftotext (digital text layer)'
    mapping = SHELF_MAP.get(key, ('(unmapped)', ''))[0]
    book_id = SHELF_MAP.get(key, ('(unmapped)', '(unknown)'))[1]
    entries.append(f'\n## {key} — {label}\n')
    entries.append(f'- Drive file id: `{fid}`')
    entries.append(f'- Method: {method}')
    entries.append(f'- Maps to: {mapping}')
    entries.append(f'- Shelf book: `{book_id}`\n')
    body = txt
    entries.append('```text\n' + body + '\n```\n')
    stats[key] = len(txt)
sections.append(''.join(entries))

# ---- exam typology ----
exam = ['\n# The exam/exercise typology census\n',
        'What the reference books actually drill — the typology the shelf\'s '
        'planned books mirror in their graded exercise levels (L1–L6) and '
        '"exam-style" labelling discipline (MASTER_PLAN §5: exam-style items '
        'labelled honestly; real past-paper items only when verified).\n']
for name, desc in EXAM_TYPES.items():
    exam.append(f'- **{name}**: {desc}\n')
exam.append("""
## Competitive-scope notes (web-checked 2026-11-10)

- **JEE Main 2026 syllabus (7 units, fetched this pass)**: sets/relations/
  functions; algebra (complex numbers + quadratics, matrices and
  determinants, P&C, binomial, sequences and series); calculus (limits/
  continuity/differentiability, integral calculus, differential
  equations); coordinate geometry (straight lines and conics); 3D and
  vectors; statistics and probability; trigonometry. **Removed in the
  2024 revision** (verified, correcting run 89's record in the AA
  header): mathematical induction, mathematical reasoning, linear
  programming, heights and distances.
- **NCERT school canon**: class 9 rationalized (12 chapters — Euclid,
  lines and angles, triangles, quadrilaterals, circles, Heron, solids);
  class 10 rationalized (14 chapters — constructions dropped); class 11
  rationalized (14 chapters — PMI and mathematical reasoning dropped);
  class 12 rationalized (13 chapters incl. LPP, vectors, 3D). The NEP
  transition books (class 9 'Ganita Manjari' 2025-26 roll-out) are
  noted in the Geometry book's research notes as the live curriculum
  change to watch.
- **University/competitive poles**: GATE (engineering mathematics:
  linear algebra, calculus, ODEs/PDEs, complex methods, probability,
  numerical methods, OR) and IIT-JAM (real analysis, linear algebra,
  abstract algebra, complex analysis) own the L5 scope of the deeper
  books; the olympiad ladder (RMO/IMO) owns the L6 craft chapters.
- **Aptitude side (Khattar QA 4e, TOC extracted)**: 40 chapters from
  Numbers through Data Interpretation/Sufficiency — the SSC/banking/
  CAT-style census the aptitude-relevant shelf chapters cross-reference
  (Geometry mensuration, Number Theory speed work, Heights and
  Distances, Statistics DI).
""")
sections.append(''.join(exam))

# ---- web research summary ----
web = ['\n# Web-research findings (the no-Drive subjects)\n',
       "The Drive carries no dedicated reference for: Geometry (classical), "
       "Number Theory, Set Theory (axiomatic), Mathematical Logic (beyond the "
       "module's chapter), Combinatorics (beyond the AA bank), Abstract "
       "Algebra, Topology, Complex Analysis (beyond Kreyszig), Numerical "
       "Analysis (beyond Kreyszig), Optimization/OR, and the Foundations "
       "capstone. Those books' research phases ran on web-checked classic "
       "arcs:\n"]
web_facts = [
    ('Munkres, Topology 2e', 'Part I General Topology (Set Theory and Logic; '
     'Topological Spaces and Continuous Functions; Connectedness and Compactness; '
     'Countability and Separation Axioms; Tychonoff; Metrization and '
     'Paracompactness; Complete Metric Spaces and Function Spaces), Part II '
     'Algebraic Topology (Fundamental Group; Separation of the Plane; '
     'Seifert-van Kampen; Classification of Surfaces and Covering Spaces).'),
    ('Gallian, Contemporary Abstract Algebra', 'Part 1 Integers and Equivalence '
     'Relations (ch. 0 Preliminaries), the group arc (Introduction to Groups → '
     'Fundamental Theorem of Finite Abelian Groups), the ring arc '
     '(Introduction to Rings → Divisibility in Integral Domains), the '
     'fields/extensions arc (Vector Spaces, Extension Fields, Finite Fields, '
     'Sylow and beyond).'),
    ('Burton, Elementary Number Theory 7e', 'Preliminaries (incl. mathematical '
     'induction, pigeonhole); Divisibility Theory in the Integers; Primes and '
     'Their Distribution; Theory of Congruences; Fermat\'s Theorem; '
     'Number-Theoretic Functions; Euler\'s Generalization; Primitive Roots and '
     'Indices; Quadratic Reciprocity; Perfect Numbers; Fibonacci Numbers; '
     'continued fractions and applications/cryptography in the later chapters.'),
    ('Churchill and Brown, Complex Variables and Applications', 'Complex '
     'Numbers; Analytic Functions; Elementary Functions; Integrals; Series; '
     'Residues and Poles; Applications of Residues; Conformal Mapping (the '
     '9th-edition chapter list verified).'),
    ('Burden, Faires and Burden, Numerical Analysis 10e', 'Mathematical '
     'Preliminaries and Error Analysis; Solutions of Equations in One Variable; '
     'Interpolation and Polynomial Approximation; Numerical Differentiation and '
     'Integration; Initial-Value Problems for ODEs; Direct Methods for Linear '
     'Systems; Iterative Techniques in Matrix Algebra; Approximation Theory; '
     'Approximating Eigenvalues; nonlinear systems, BVPs and PDEs.'),
    ('Hillier and Lieberman, Introduction to Operations Research', 'the '
     'standard arc: introduction and the OR modeling approach; linear '
     'programming and the simplex method with its theory; duality and '
     'sensitivity; transportation and assignment; network optimization; '
     'dynamic programming; integer and nonlinear programming; metaheuristics; '
     'the probabilistic models (queueing, inventory, Markov decision '
     'processes, simulation).'),
    ('Halmos, Naive Set Theory', 'the 25-section arc from the axioms of '
     'extension and specification through unions/intersections, complements '
     'and powers, ordered pairs, relations, functions, families, numbers, the '
     'axiom of choice, Zorn\'s lemma, well ordering, transfinite recursion, '
     'ordinal numbers, cardinal numbers, Schroeder-Bernstein.'),
    ('OpenStax (open cross-checks)', 'Precalculus 2e (ch. 5-8 trigonometry '
     'arc, ch. 10 analytic geometry), Introductory Statistics (ch. 1-13: '
     'sampling → descriptive → probability → distributions → CLT → '
     'confidence → hypothesis testing → chi-square → regression → ANOVA), '
     'Calculus volumes 1-3 (the open sequencing poles).'),
    ('Verified history facts used in the plans', 'Gödel completeness (1929/30) '
     'and incompleteness (1931); Turing machines (1936, Entscheidungsproblem); '
     'Gosset/Student t (1908); Abel and Galois (the quintic, dated); Zhang '
     'bounded gaps (2013); the Clay Millennium status (Riemann, P vs NP, '
     'Navier-Stokes all open); non-Euclidean geometry (Gauss, Lobachevsky, '
     'Bólyai); Hilbert\'s Grundlagen (1899); Loney\'s edition history '
     '(1893-1918, read off the scanned front matter this pass).'),
]
for name, desc in web_facts:
    web.append(f'- **{name}**: {desc}\n')
sections.append(''.join(web))

footer = f"""
# Coverage census

- 53/53 sources extracted ({len([k for k in stats if stats[k] > 0])} transcriptions above).
- 23 shelf books planned from this evidence base
  (`src/data/library/books/mathematics/*/book.ts`, status 'planned').
- Every planned chapter carries its source mapping in its book.ts header
  (Drive module chapter → book chapter, or web-researched classic arc).
- Authoring cadence unchanged: one book at a time (Advanced Algebra opens
  first); per-unit reference downloads follow at authoring time from the
  Drive ids recorded here.
"""
sections.append(footer)

os.makedirs(f'{BASE}/docs/research', exist_ok=True)
with open(OUT, 'w') as f:
    f.write('\n'.join(sections))

total_chars = sum(stats.values())
print(f'wrote {OUT}: {os.path.getsize(OUT)} bytes, 53/53 TOCs, {total_chars} chars of TOC text')
