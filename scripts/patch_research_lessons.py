#!/usr/bin/env python3
"""
patch_research_lessons.py — the internet-research gap pass (2026-11-11).

Owner directive: "use internet research for each book and think of your own
if any lesson is missing add it". For every one of the 25 planned math books
the canonical TOCs were researched on the internet (Hall & Knight Higher
Algebra, Loney Part I/II, NCERT + Common Core geometry, ctpcm, Arihant/
Cengage JEE calculus, Thomas/OpenStax, Raisinghania, Boyce/DiPrima, Strang
6e, Rudin PMA, Brown & Churchill, Gallian/Dummit-Foote, Burton, Halmos,
Brualdi, Rosen 7/8e, Ross, Triola, Burden & Faires, Boas, Taha/Hillier,
Aggarwal/Arun Sharma, Munkres, Polya — every addition below is source-backed,
see docs/project/SOURCE_LOG.md 'Internet-research gap pass' section).

What this script does (PLANS ONLY — zero lesson content is written):
  - inserts 87 new planned-lesson titles into their chapters, at
    pedagogically chosen positions;
  - inserts 3 NEW chapters where a whole unit family was missing
    (Geometry: Transformations and Symmetry; Probability: Jointly
    Distributed Random Variables; QA: Modern Maths at Aptitude Speed),
    each with a substantial (>200 char) house-style summary;
  - renumbers the chapters of the three books that gained a chapter;
  - updates every patched book's header STATUS census honestly.

Idempotence: a title already present in the target array is skipped; a
chapter whose slug already exists is skipped.
"""
import re, sys

ROOT = '/home/z/my-project/src/data/library/books/mathematics'

# ---------------------------------------------------------------- utilities

def esc(s: str) -> str:
    """Escape a title/summary fragment to the house TS source style:
    non-ASCII -> \\uXXXX escapes, backslash and single quote escaped."""
    out = []
    for ch in s:
        o = ord(ch)
        if o > 127:
            out.append('\\u%04x' % o)
        elif ch == '\\':
            out.append('\\\\')
        elif ch == "'":
            out.append("\\'")
        else:
            out.append(ch)
    return ''.join(out)

def array_end(s, open_idx):
    """Index of the ']' closing the array whose '[' is at open_idx,
    skipping quoted strings (titles may contain ']')."""
    i = open_idx + 1
    in_str = False
    while i < len(s):
        c = s[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == "'":
                in_str = False
        else:
            if c == "'":
                in_str = True
            elif c == ']':
                return i
        i += 1
    return -1

def find_chapter_span(text, slug):
    """(start, end) span of the chapter object carrying this slug."""
    m = re.search(r"\n\s*\{\s*\n\s*number:\s*\d+,\s*\n\s*slug:\s*'" + re.escape(slug) + "'", text)
    if not m:
        return None
    start = m.start() + 1
    depth = 0
    i = text.index('{', start)
    in_str = False
    quote = ''
    while i < len(text):
        c = text[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == quote:
                in_str = False
        else:
            if c in ("'", '"'):
                in_str = True
                quote = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return (start, i + 1)
        i += 1
    return None

def unesc(s: str) -> str:
    """Decode \\uXXXX and \\' inside a TS string literal body (for idempotence
    comparison against existing titles)."""
    return re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), s).replace("\\'", "'")

def patch_titles(book_dir, slug, titles, idx):
    path = f'{ROOT}/{book_dir}/book.ts'
    text = open(path).read()
    span = find_chapter_span(text, slug)
    if not span:
        print(f'  SKIP {book_dir}/{slug}: chapter not found'); return 0
    start, end = span
    block = text[start:end]
    m = re.search(r'plannedLessons:\s*\[', block)
    if not m:
        print(f'  SKIP {book_dir}/{slug}: no plannedLessons array'); return 0
    arr_open = m.end()
    close = array_end(block, arr_open - 1)
    if close < 0:
        print(f'  SKIP {book_dir}/{slug}: unterminated plannedLessons array'); return 0
    inner = block[arr_open:close]
    existing = [unesc(e) for e in re.findall(r"'((?:\\.|[^'\\])*)'", inner)]
    added = 0
    new_items = []
    for t in titles:
        if t in existing:
            print(f'  = {book_dir}/{slug}: already present: {t}'); continue
        new_items.append("      '" + esc(t) + "',")
        added += 1
    if not new_items:
        return 0
    lines = [l for l in inner.split('\n') if l.strip()]
    at = len(lines) if idx is None else min(idx, len(lines))
    lines = lines[:at] + new_items + lines[at:]
    inner_new = '\n' + '\n'.join(lines) + '\n    '
    block_new = block[:arr_open] + inner_new + block[close:]
    open(path, 'w').write(text[:start] + block_new + text[end:])
    print(f'  + {book_dir}/{slug}: {added} lesson(s) at index {at}')
    return added

def chapter_object(slug, title, summary, lessons):
    lines = ['  {',
             '    number: 0,',
             f"    slug: '{esc(slug)}',",
             f"    title: '{esc(title)}',",
             '    summary:',
             f"      '{esc(summary)}',",
             "    status: 'planned',",
             '    lessons: [],',
             '    plannedLessons: [']
    for l in lessons:
        lines.append("      '" + esc(l) + "',")
    lines.append('    ],')
    lines.append('  },')
    return '\n'.join(lines)

def insert_chapter(book_dir, after_slug, slug, title, summary, lessons):
    path = f'{ROOT}/{book_dir}/book.ts'
    text = open(path).read()
    if find_chapter_span(text, slug):
        print(f'  = {book_dir}: chapter {slug} already exists'); return False
    span = find_chapter_span(text, after_slug)
    if not span:
        print(f'  SKIP {book_dir}: anchor chapter {after_slug} not found'); return False
    _, end = span
    # skip past the anchor chapter's trailing comma (the span ends right
    # after the object's closing '}'), so the new chapter is a clean sibling
    i = end
    while i < len(text) and text[i] in ' \t':
        i += 1
    if i < len(text) and text[i] == ',':
        i += 1
    obj = chapter_object(slug, title, summary, lessons)
    text = text[:i] + '\n' + obj + text[i:]
    open(path, 'w').write(text)
    print(f'  + {book_dir}: new chapter "{title}" ({len(lessons)} planned lessons) after {after_slug}')
    return True

def renumber(book_dir):
    path = f'{ROOT}/{book_dir}/book.ts'
    text = open(path).read()
    count = [0]
    def repl(m):
        count[0] += 1
        return f'number: {count[0]},'
    text = re.sub(r'number: \d+,', repl, text)
    open(path, 'w').write(text)
    return count[0]

def update_header(book_dir):
    """Rewrite the header STATUS census line with the file's real counts."""
    path = f'{ROOT}/{book_dir}/book.ts'
    text = open(path).read()
    nch = len(re.findall(r'number: \d+,', text))
    npl = 0
    for m2 in re.finditer(r'plannedLessons:\s*\[', text):
        end = array_end(text, m2.end() - 1)
        if end < 0:
            continue
        npl += len(re.findall(r"'(?:\\.|[^'\\])*'", text[m2.end():end]))
    m = re.search(r'(\d+)[\s*]*chapters[\s*]*/[\s*]*(\d+)[\s*]*planned[\s*]*lessons', text)
    if not m:
        print(f'  ! {book_dir}: header census line not found (chapters={nch}, planned={npl})')
        return
    new = text[:m.start(1)] + str(nch) + text[m.end(1):m.start(2)] + str(npl) + text[m.end(2):]
    open(path, 'w').write(new)
    print(f'  # {book_dir}: header census -> {nch} chapters / {npl} planned lessons')

# ---------------------------------------------------------------- the adds

APOS = '\u2019'  # typographic apostrophe, house style in titles

ADDS = [
    # ---- Advanced Algebra (47 -> 57 planned) — Hall & Knight Higher Algebra
    #      (fresh archive.org TOC) + Brilliant/Wikipedia inequality canon ----
    ('advanced-algebra', 'classical-inequalities', ['The Weighted AM-GM and Its Consequences'], 1),
    ('advanced-algebra', 'classical-inequalities', ['The Rearrangement and Chebyshev Inequalities'], 3),
    ('advanced-algebra', 'classical-inequalities', ['Jensen' + APOS + 's Inequality and Convexity'], 4),
    ('advanced-algebra', 'sequences-and-series', ['Recurring Series and the Scale of Relation'], None),
    ('advanced-algebra', 'induction-and-binomial-theorem', ['The Binomial Theorem for Any Index', 'The Multinomial Theorem'], 2),
    ('advanced-algebra', 'theory-of-equations', ['Descartes' + APOS + ' Rule of Signs'], 1),
    ('advanced-algebra', 'theory-of-equations', ['Cardan and Ferrari: the Cubic and Quartic, Solved'], 3),
    ('advanced-algebra', 'theory-of-equations', ['Reciprocal Equations'], 5),
    ('advanced-algebra', 'exponentials-and-logarithms', ['Exponential and Logarithmic Series'], 4),
    # ---- Geometry (38 -> 50; NEW ch 5) — NCERT + Common Core + ctpcm ----
    ('geometry', 'triangles-congruence-and-proof', ['The Cevian Theorems: Ceva and Menelaus', 'Stewart' + APOS + 's Theorem and the Median Relation'], None),
    ('geometry', 'the-circle', ['Power of a Point', 'Ptolemy' + APOS + 's Theorem', 'Common Tangents and Centres of Similitude', 'The Nine-Point Circle and Euler' + APOS + 's Line'], None),
    ('geometry', 'ruler-and-compass-constructions', ['Inscribed, Circumscribed and the Regular Polygons'], None),
    ('geometry', 'solids-and-volumes', ['Cross-Sections and Solids of Revolution'], 0),
    # ---- Coordinate Geometry (45 -> 52) — Loney's own deeper chapters ----
    ('coordinate-geometry', 'straight-lines', ['Rotation of Axes and the Invariants'], None),
    ('coordinate-geometry', 'the-circle', ['Orthogonal and Coaxal Systems of Circles'], None),
    ('coordinate-geometry', 'the-ellipse', ['Diameters, Conjugate Diameters and the Auxiliary Circle'], None),
    ('coordinate-geometry', 'the-conic-family-unified', ['The Normals from a Point: Three and Four', 'Pole and Polar, Unified', 'The Conic in Polar Form', 'Confocal Conics and Families of Conics'], None),
    # ---- Trigonometry (33 -> 35) — Loney Part I ch XVII/XIX ----
    ('trigonometry', 'transformation-formulas', ['Summation of Trigonometric Series'], None),
    ('trigonometry', 'heights-and-distances', ['Ratios of Small Angles and the Dip of the Horizon'], None),
    # ---- Differential Calculus (36 -> 38) — Thomas 7.3 + Arihant DC ----
    ('differential-calculus', 'the-derivative', ['The Hyperbolic Family Differentiated'], None),
    ('differential-calculus', 'the-craft-of-differentiation', ['Differentiation of One Function with Respect to Another'], None),
    # ---- Integral Calculus (20 -> 24) — Arihant IC + Thomas 7.1/11.5 ----
    ('integral-calculus', 'the-indefinite-integral', ['Hyperbolic Integrals and Inverse Substitutions'], None),
    ('integral-calculus', 'the-definite-integral', ['The Logarithm Defined as an Integral'], None),
    ('integral-calculus', 'properties-and-the-leibniz-rule', ['Piecewise Integrands: Modulus, GIF and Signum'], None),
    ('integral-calculus', 'areas-and-applications', ['Areas and Lengths in Polar Coordinates'], 1),
    # ---- Multivariable Calculus (20 -> 23) — Thomas 14.9/15.8/16.6-16.7 ----
    ('multivariable-calculus', 'partial-derivatives-and-the-gradient', ['Taylor' + APOS + 's Formula for Two Variables'], None),
    ('multivariable-calculus', 'multiple-integrals', ['Jacobians and the Change of Variables'], None),
    ('multivariable-calculus', 'vector-calculus', ['Surfaces, Area and Flux: the Surface Integral'], 2),
    # ---- Differential Equations (26 -> 29) — Raisinghania + Boyce/Kreyszig ----
    ('differential-equations', 'first-order-equations', ['First Order, Higher Degree: Solvable for p, Clairaut and Lagrange'], None),
    ('differential-equations', 'second-order-linear-equations', ['Higher-Order Linear Equations', 'The Cauchy-Euler Equation'], None),
    # ---- Linear Algebra (32 -> 34) — Strang 6e ch 6-7 ----
    ('linear-algebra', 'eigenvalues-and-eigenvectors', ['The Singular Value Decomposition: Image Processing and PCA'], None),
    ('linear-algebra', 'orthogonality-and-least-squares', ['Positive Definite Matrices: the Energy Test'], None),
    # ---- Real Analysis (35 -> 38) — Rudin ch 6/7/9 ----
    ('real-analysis', 'differentiation', ['The Inverse and Implicit Function Theorems'], None),
    ('real-analysis', 'the-riemann-integral', ['The Riemann-Stieltjes Integral'], None),
    ('real-analysis', 'sequences-of-functions', ['Equicontinuity, Arzel\u00e0-Ascoli and Stone-Weierstrass'], 2),
    # ---- Complex Analysis (23 -> 26) — Brown & Churchill ch 7/10-11 ----
    ('complex-analysis', 'series-and-residues', ['The Argument Principle and Rouch\u00e9' + APOS + 's Theorem'], None),
    ('complex-analysis', 'conformal-mapping', ['The Schwarz-Christoffel Transformation, Named', 'Harmonic Functions and the Dirichlet Problem'], None),
    # ---- Abstract Algebra (26 -> 31) — Gallian ch 11/24 + D&F ----
    ('abstract-algebra', 'groups', ['Conjugacy Classes and the Class Equation'], None),
    ('abstract-algebra', 'lagrange-and-cosets', ['The Sylow Theorems'], None),
    ('abstract-algebra', 'normality-and-homomorphisms', ['Direct Products and the Finite Abelian Classification'], None),
    ('abstract-algebra', 'rings-and-ideals', ['Prime and Maximal Ideals'], None),
    ('abstract-algebra', 'polynomial-rings-and-factorization', ['The Hierarchy: Euclidean, Principal, Unique'], None),
    # ---- Topology (26 -> 27) — Munkres ch 8 ----
    ('topology', 'metric-spaces', ['The Baire Category Theorem'], None),
    # ---- Number Theory (31 -> 34) — Burton ch 11/12 + H&K Pell ----
    ('number-theory', 'quadratic-residues-and-reciprocity', ['Sums of Two Squares and Pythagorean Triples', 'Fermat' + APOS + 's Last Theorem: the Honest Story'], None),
    ('number-theory', 'continued-fractions', ['Pell' + APOS + 's Equation'], None),
    # ---- Set Theory (27 -> 29) — Halmos 14/22 ----
    ('set-theory', 'counting-the-infinite', ['The Schr\u00f6der-Bernstein Theorem'], 3),
    ('set-theory', 'well-ordering-and-ordinals', ['Partial Orders, Chains and Bounds'], 0),
    # ---- Mathematical Logic (23 -> 25) — Enderton ch 2 + Mendelson ----
    ('mathematical-logic', 'formal-theories-and-validity', ['Structures, Satisfaction and Models'], 0),
    ('mathematical-logic', 'computability-and-godel', ['Recursive Functions and Church' + APOS + 's Thesis'], 0),
    # ---- Combinatorics (20 -> 22) — Brualdi ch 9-10 ----
    ('combinatorics', 'partitions-and-symmetric-counting', ['Transversals and Matching: Hall' + APOS + 's Marriage Theorem', 'Combinatorial Designs: Block Designs, Steiner Systems and Latin Squares'], 1),
    # ---- Discrete Mathematics (33 -> 35) — Rosen 7e/8e ----
    ('discrete-mathematics', 'graphs', ['Bipartite Graphs, Matchings and Hall' + APOS + 's Theorem'], 2),
    ('discrete-mathematics', 'relations-order-and-equivalence', ['Topological Sorting: Order for the Algorithm'], None),
    # ---- Probability (22 -> 29; NEW ch 7) — Ross ch 5/6/7 ----
    ('probability-theory', 'continuous-random-variables', ['The Poisson Process: the Exponential' + APOS + 's Clock'], None),
    # ---- Statistics (30 -> 31) — Triola ch 13 ----
    ('statistics', 'hypothesis-testing', ['Nonparametric Tests: Sign, Wilcoxon and Rank-Sum'], None),
    # ---- Numerical Analysis (24 -> 28) — Burden & Faires 3.3/5.6/8.3/9 ----
    ('numerical-analysis', 'interpolation-and-approximation', ['Hermite Interpolation and Osculating Forms'], 1),
    ('numerical-analysis', 'interpolation-and-approximation', ['Chebyshev Approximation and Economization'], None),
    ('numerical-analysis', 'linear-systems-numerically', ['Eigenvalues by Similarity: Householder and the QR Iteration'], None),
    ('numerical-analysis', 'odes-numerically', ['Multistep Methods: the Adams Family'], None),
    # ---- Mathematical Methods for Engineering (30 -> 32) — Boas ----
    ('mathematical-methods-for-engineering', 'odes-for-engineers', ['Gamma, Beta and the Error Functions'], None),
    ('mathematical-methods-for-engineering', 'numerical-craft-for-engineers', ['Calculus of Variations: the Euler-Lagrange Engine'], None),
    # ---- Optimization and OR (27 -> 29) — Taha ch 13 + Hillier ch 14/15 ----
    ('optimization-and-operations-research', 'the-modeling-discipline', ['Decision Analysis: Trees, Payoffs and the Value of Information'], None),
    ('optimization-and-operations-research', 'stochastic-models', ['Game Theory: the Two-Person Zero-Sum Duel'], None),
    # ---- Advanced Mathematical Foundations (23 -> 25) — Polya + writing canon ----
    ('advanced-mathematical-foundations', 'problem-solving-at-the-frontier', ['Polya' + APOS + 's Method: Understand, Plan, Execute, Look Back'], 0),
    ('advanced-mathematical-foundations', 'reading-and-writing-research', ['Typesetting Mathematics: TeX and the Written Look'], 2),
]

NEW_CHAPTERS = [
    # ---- Geometry: NEW ch 5 'Transformations and Symmetry' ----
    ('geometry', 'similarity-and-proportion', 'transformations-and-symmetry',
     'Transformations and Symmetry: the Rigid-Motion Idea',
     'Congruence and similarity earn their machine definitions: translations, reflections and rotations written as functions of the plane \u2014 the rigid motions \u2014 their compositions read as the isometry idea, line and rotational symmetry found as the fixed sets of those motions, and dilations as the scale engines that re-derive similarity. The Common Core\u2019s transformation-first route and NCERT\u2019s symmetry chapters are both honoured: SAS/ASA/SSS are re-read as invariances under motion, and the ground is laid for the homothety reading of centres of similitude in the circle chapter and for the shifting of axes in Coordinate Geometry.',
     ['The Rigid Motions: Slides, Flips and Turns',
      'Composing Transformations and the Isometry Idea',
      'Line and Rotational Symmetry',
      'Dilations, Scale Factors and Similarity Re-Read']),
    # ---- Probability: NEW ch 7 'Jointly Distributed Random Variables' ----
    ('probability-theory', 'continuous-random-variables', 'jointly-distributed-random-variables',
     'Jointly Distributed Random Variables',
     'Ross\u2019s chapter 6\u20137 arc earned in full: joint distributions discrete and continuous (tables and density patches), marginals and conditional distributions, independence of random variables, sums of random variables via the convolution engine, conditional expectation and prediction, covariance and correlation with the Cauchy\u2013Schwarz link and its null cases, moment generating functions as transform identities, and order statistics \u2014 the sample minimum, maximum and range. This is the layer the limit theorems actually need, and the hinge Statistics leans on when the sample begins to speak.',
     ['Joint Distributions: Discrete and Continuous',
      'Independence of Random Variables and Sums: the Convolution',
      'Conditional Distributions and Conditional Expectation',
      'Covariance and Correlation',
      'Moment Generating Functions',
      'Order Statistics and the Sample Extremes']),
    # ---- Quantitative Aptitude: NEW ch 11 'Modern Maths at Aptitude Speed' ----
    ('quantitative-aptitude', 'data-sufficiency', 'modern-maths-at-aptitude-speed',
     'Modern Maths at Aptitude Speed',
     'The CAT/SSC \u2018modern maths\u2019 block as its own exam-speed layer, cross-referencing the shelf\u2019s full treatments: set-theory word models and the two- and three-set Venn counting craft every aptitude paper leans on (the theory lives in Set Theory); functions, logarithms and inequalities at solving speed (Advanced Algebra\u2019s chapters own the depth); permutations, combinations and probability compressed into the exam\u2019s sixty-second patterns (Advanced Algebra\u2019s counting chapter and Probability Theory own the proofs); and heights and distances at the right-triangle gallop (Trigonometry\u2019s chapter owns the full discipline). Aggarwal\u2019s and Arun Sharma\u2019s unit censuses are the source of the block\u2019s existence; no duplication \u2014 the shelf books are cited at every turn.',
     ['Set Theory and Venn Diagrams: the Counting Craft',
      'Functions, Logarithms and Inequalities at Exam Speed',
      'Permutations and Combinations at Exam Speed',
      'Probability at Exam Speed',
      'Heights and Distances at Exam Speed']),
]

PATCHED_BOOKS = [
    'advanced-algebra', 'geometry', 'coordinate-geometry', 'trigonometry',
    'differential-calculus', 'integral-calculus', 'multivariable-calculus',
    'differential-equations', 'linear-algebra', 'real-analysis',
    'complex-analysis', 'abstract-algebra', 'topology', 'number-theory',
    'set-theory', 'mathematical-logic', 'combinatorics', 'discrete-mathematics',
    'probability-theory', 'statistics', 'numerical-analysis',
    'mathematical-methods-for-engineering', 'optimization-and-operations-research',
    'quantitative-aptitude', 'advanced-mathematical-foundations',
]

total = 0
print('== title insertions ==')
for book_dir, slug, titles, idx in ADDS:
    total += patch_titles(book_dir, slug, titles, idx)

print('== new chapters ==')
for book_dir, after_slug, slug, title, summary, lessons in NEW_CHAPTERS:
    if insert_chapter(book_dir, after_slug, slug, title, summary, lessons):
        total += len(lessons)

print('== renumbering (books that gained a chapter) ==')
for book_dir, *_ in NEW_CHAPTERS:
    n = renumber(book_dir)
    print(f'  # {book_dir}: {n} chapters renumbered 1..{n}')

print('== header census updates ==')
for book_dir in PATCHED_BOOKS:
    update_header(book_dir)

print(f'TOTAL new planned lessons: {total}')
sys.exit(0)
