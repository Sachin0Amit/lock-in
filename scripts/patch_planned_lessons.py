#!/usr/bin/env python3
"""
patch_planned_lessons.py — the TOC-as-lessons plan upgrade (2026-11-11).

Inserts new planned lessons into the shelf books' plannedLessons arrays so
that every surveyed TOC topic that deserves its own titled lesson HAS one.
Only plans are touched — zero lesson content is written (owner directive:
plans only; the authoring cadence is untouched, run 90 still opens AA 1.1
+ 1.2).

Each entry: (book_dir, chapter_slug, [titles], insert_index_or_None).
insert_index None = append at the end of the array.
Idempotence: a title already present in the target array is skipped.
"""
import re, sys

ROOT = '/home/z/my-project/src/data/library/books/mathematics'

ADDS = [
    # ---- Advanced Algebra (book #4; 36 -> 47 planned) ----
    ('advanced-algebra', 'functions-as-objects', [
        'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog',
        'Even and Odd Functions and Their Extensions',
        'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph',
        'The Period Census: Periods of Transformed and Composite Functions',
    ], None),
    ('advanced-algebra', 'complex-numbers', [
        'The Argand Plane: Polar Form and the Argument',
        'De Moivre, Roots of Unity and the Complex Loci',
    ], None),
    ('advanced-algebra', 'sequences-and-series', [
        'Sigma Notation and the Classical Power Sums',
    ], None),
    ('advanced-algebra', 'counting-permutations-combinations', [
        'Factorials and the Counting Toolkit',
        'Circular and Restricted Permutations',
    ], 0),
    ('advanced-algebra', 'exponentials-and-logarithms', [
        'The Laws of Logarithms and the Change of Base',
    ], 2),
    ('advanced-algebra', 'the-synthesis-and-the-doorstep', [
        'Functional Equations: Building Functions from Rules',
    ], 1),
    # ---- Linear Algebra (28 -> 33 planned) ----
    ('linear-algebra', 'linear-transformations', [
        'The Dual Space and the Dual Map',
    ], None),
    ('linear-algebra', 'eigenvalues-and-eigenvectors', [
        'Invariant Subspaces and the Minimal Polynomial',
        'Generalized Eigenvectors, Nilpotent Operators and Jordan Form',
    ], 2),
    ('linear-algebra', 'orthogonality-and-least-squares', [
        'Inner Products and Norms: the Geometry Defined',
    ], 0),
    # ---- Trigonometry (31 -> 33 planned) ----
    ('trigonometry', 'properties-of-triangles', [
        'The Orthocentre, Centroid and the Pedal Triangle',
        'The Excircles: Excentres, Exradii and Their Distances',
    ], 5),
    # ---- Coordinate Geometry (38 -> 39 planned) ----
    ('coordinate-geometry', 'the-conic-family-unified', [
        'The Director Circle: One Idea across the Conics',
    ], None),
    # ---- Multivariable Calculus (19 -> 20 planned) ----
    ('multivariable-calculus', 'vector-calculus', [
        'Motion in Space: Velocity, Acceleration and Curvature',
    ], 0),
    # ---- Mathematical Methods for Engineering (28 -> 30 planned) ----
    ('mathematical-methods-for-engineering', 'the-engineers-landscape', [
        'Hyperbolic Functions: cosh, sinh and the Catenary',
    ], None),
    ('mathematical-methods-for-engineering', 'odes-for-engineers', [
        'Sturm\u2013Liouville Problems: Eigenfunctions and Orthogonality',
    ], None),
    # ---- Real Analysis (32 -> 33 planned) ----
    ('real-analysis', 'the-synthesis-and-the-doorstep', [
        'The Lebesgue Doorstep: Measure, Measurable Functions and Simple Functions',
    ], None),
]

def find_chapter_span(text, slug):
    """Return (start_of_object, end_of_object) for the chapter with this slug."""
    m = re.search(r"\n\s*\{\s*\n\s*number:\s*\d+,\s*\n\s*slug:\s*'" + re.escape(slug) + r"'", text)
    if not m:
        return None
    start = m.start() + 1
    # walk to the matching closing brace of the chapter object
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

def patch(book_dir, slug, titles, idx):
    path = f'{ROOT}/{book_dir}/book.ts'
    with open(path) as f:
        text = f.read()
    span = find_chapter_span(text, slug)
    if not span:
        print(f'  SKIP {book_dir}/{slug}: chapter not found')
        return 0
    start, end = span
    block = text[start:end]
    m = re.search(r'plannedLessons:\s*\[', block)
    if not m:
        print(f'  SKIP {book_dir}/{slug}: no plannedLessons array')
        return 0
    arr_open = m.end()  # just after '['
    close = block.index(']', arr_open)
    inner = block[arr_open:close]
    existing = re.findall(r"'((?:\\.|[^'\\])*)'", inner)
    added = 0
    new_items = []
    for t in titles:
        if any(e.replace("\\'", "'").replace('\\u2019', '\u2019') == t for e in existing):
            print(f'  = {book_dir}/{slug}: already present: {t}')
            continue
        esc = t.replace('\\', '\\\\').replace("'", "\\'")
        new_items.append(f"      '{esc}',")
        added += 1
    if not new_items:
        return 0
    lines = [l for l in inner.split('\n') if l.strip()]
    if idx is None:
        at = len(lines)
    else:
        at = min(idx, len(lines))
    lines = lines[:at] + new_items + lines[at:]
    inner_new = '\n' + '\n'.join(lines) + '\n    '
    block_new = block[:arr_open] + inner_new + block[close:]
    text = text[:start] + block_new + text[end:]
    with open(path, 'w') as f:
        f.write(text)
    print(f'  + {book_dir}/{slug}: {added} lesson(s) at index {at}')
    return added

total = 0
for book_dir, slug, titles, idx in ADDS:
    total += patch(book_dir, slug, titles, idx)
print(f'TOTAL planned lessons added: {total}')
sys.exit(0)
