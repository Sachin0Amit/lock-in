#!/usr/bin/env python3
"""finalize_fold_ledger.py — the last fold-ledger reconciliation for the
2026-11-17 swarm reorg: patches the 3 startswith-missed hosts and creates
the 14 Axler LADR fold entries whose tier-1 witness lesson titles were
deliberately shortened (title hygiene) — the folds now point at the retitled
hosts that carry the same content."""
import json

ROOT = '/home/z/my-project'
path = f'{ROOT}/docs/project/TOC_FOLD_LEDGER.json'
ledger = json.load(open(path))

# 1. the three stragglers (topic startswith match)
HOST_FIX = [
    ('differential-equations', 'Modeling of Free Oscillations of a Mass', 'Forcing and Resonance'),
    ('multivariable-calculus', 'Applications to Physics and Engineering', 'The Double Integral and Iteration'),
    ('multivariable-calculus', 'Applications to Economics and Biology', 'The Double Integral and Iteration'),
]
for e in ledger:
    for book, topic_prefix, new_host in HOST_FIX:
        if e['book'] == book and e['topic'].startswith(topic_prefix) and e['host'] != new_host:
            e['host'] = new_host
            e['note'] = (e.get('note') or '') + \
                ' [host re-adjudicated 2026-11-17 swarm reorg: the old host was consolidated; the fold rides the surviving lesson of the same chapter]'

# 2. the 14 Axler tier-1 titles that the retitles folded into subsections
AXLER_FOLDS = [
    ('Digression on Fields', 'R\u207f and Subspaces'),
    ('Sums of Subspaces', 'R\u207f and Subspaces'),
    ('Range and Surjectivity', 'Kernel, Range and Rank-Nullity'),
    ('Invertibility and Isomorphisms', 'Composition and Change of Basis'),
    ('Diagonalizable Operators', 'Diagonalization and Cayley\u2013Hamilton'),
    ('Conditions for Diagonalizability', 'Diagonalization and Cayley\u2013Hamilton'),
    ('Commuting Operators', 'Diagonalization and Cayley\u2013Hamilton'),
    ('Polar Decomposition', 'The Symmetric Promise: Self-Adjoint, Normal and Unitary Operators'),
    ('Operators Applied to Ellipsoids and Parallelepipeds', 'Quadratic Forms and the Conics Re-read'),
    ('Bilinear Forms and Quadratic Forms', 'Quadratic Forms and the Conics Re-read'),
    ('Symmetric Bilinear Forms', 'Quadratic Forms and the Conics Re-read'),
    ('Alternating Multilinear Forms', 'Quadratic Forms and the Conics Re-read'),
    ('Multilinear Forms', 'Quadratic Forms and the Conics Re-read'),
    ('Defining the Determinant', 'Quadratic Forms and the Conics Re-read'),
]
existing = {(e['source'], e['topic']) for e in ledger}
added = 0
for topic, host in AXLER_FOLDS:
    if ('root-axler-ladr-4e', topic) in existing:
        continue
    ledger.append({
        'source': 'root-axler-ladr-4e',
        'topic': topic,
        'book': 'linear-algebra',
        'host': host,
        'mode': 'subsection',
        'note': ('Axler LADR 4e surveyed line, previously carried by the long '
                 'lesson title the 2026-11-17 swarm reorg shortened (title '
                 'hygiene); now folded as a named subsection of the retitled '
                 'host that carries the same content.'),
    })
    added += 1

json.dump(ledger, open(path, 'w'), indent=1, ensure_ascii=False)
print(f'hosts patched, {added} Axler fold entries added; ledger now {len(ledger)} entries')
