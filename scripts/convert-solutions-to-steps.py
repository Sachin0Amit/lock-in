#!/usr/bin/env python3
"""
convert-solutions-to-steps.py — one-shot content migration (2026-11-03).

Owner directive: exercise solutions must render like handwritten worked
solutions — one short step per line, words + math — not a single prose
paragraph. This script rewrites every legacy `solution: '...'` string in
the FM chapter files into `solution: [ 'step', 'step', … ]` (+ optional
boxed `answer:`), preserving the text exactly (token-multiset assertion).

Split rules (never inside $…$ math or parentheticals):
  1. sentence ends:  ". " followed by A-Z ( $ *   and  "? " / "! "
  2. enumeration:    ", then "     ("then…" starts the next step)
  3. semicolons:     "; " — only when the remainder of the sentence is a
     real sub-step (contains math or runs ≥ 12 words); keeps prose
     semicolons ("…; the numeral cannot.") glued to their clause.

Usage:
  python3 scripts/convert-solutions-to-steps.py --dry   # report only
  python3 scripts/convert-solutions-to-steps.py         # rewrite files
"""
import re
import sys
from collections import Counter

FILES = [
    '/home/z/my-project/src/data/library/books/mathematics/foundation-mathematics/ch-01.ts',
    '/home/z/my-project/src/data/library/books/mathematics/foundation-mathematics/ch-02.ts',
    '/home/z/my-project/src/data/library/books/mathematics/foundation-mathematics/ch-03.ts',
    '/home/z/my-project/src/data/library/books/mathematics/foundation-mathematics/ch-04.ts',
]

SOLUTION_RE = re.compile(r"(\n[ ]*)solution:(?:[ ]|\n[ ]*)*'((?:\\.|[^'\\])*)'(,?)")

ANSWER_PREFIX = re.compile(
    r'^(So |Hence |Thus |Therefore |Factors: |The factors |Required |'
    r'The required |Answer: |The other member is |The missing member is )'
)


def protected_spans(text):
    """Char-index ranges inside $…$ math (never split there)."""
    return [(m.start(), m.end()) for m in re.finditer(r'\$[^$]*\$', text)]


def paren_depths(text, spans):
    """Per-char parenthesis depth, ignoring protected (math) spans."""
    depths = [0] * len(text)
    d = 0
    protected = set()
    for a, b in spans:
        protected.update(range(a, b))
    for i, ch in enumerate(text):
        if i in protected:
            depths[i] = d
            continue
        if ch == '(':
            d += 1
        elif ch == ')':
            d = max(0, d - 1)
        depths[i] = d
    return depths


def split_steps(raw):
    """Split an escaped solution string into worked steps."""
    spans = protected_spans(raw)
    depths = paren_depths(raw, spans)

    def ok(i):
        """Position i may host a cut: outside math and parens."""
        for a, b in spans:
            if a <= i < b:
                return False
        return depths[i] == 0

    cuts = []  # (start, end) of the separator to consume

    # pass 1 — sentence ends and enumerations
    for i in range(len(raw) - 1):
        if raw[i] in '.?!' and raw[i + 1] == ' ' and ok(i):
            nxt = raw[i + 2] if i + 2 < len(raw) else ''
            if raw[i] in '?!' or (nxt and (nxt.isupper() or nxt in '($*')):
                cuts.append((i + 1, i + 2))
    for m in re.finditer(r', then ', raw):
        if ok(m.start()):
            # consume only the space after the comma; "then…" opens the next step
            cuts.append((m.start() + 1, m.start() + 2))

    # pass 2 — semicolons, gated on the remainder being a genuine sub-step
    sorted_cuts = sorted(cuts)
    for m in re.finditer(r'; ', raw):
        p = m.start()
        if not ok(p):
            continue
        nxt_cut = next((c[0] for c in sorted_cuts if c[0] > p), len(raw))
        segment = raw[p + 2 : nxt_cut]
        words = len(segment.split())
        has_math = '$' in segment
        if has_math or words >= 12:
            cuts.append((p, p + 1))  # drop the ';' char only

    steps = []
    pos = 0
    for a, b in sorted(cuts):
        seg = raw[pos:a].strip()
        if seg:
            steps.append(seg)
        pos = b
    tail = raw[pos:].strip()
    if tail:
        steps.append(tail)
    return steps


def tokens(s):
    return Counter(re.findall(r'\w+', s))


def convert(raw):
    """Return (steps, answer) or None if the solution should stay a string."""
    steps = split_steps(raw)
    if len(steps) <= 1:
        return None
    answer = None
    if ANSWER_PREFIX.match(steps[-1]):
        answer = steps.pop()
        if not steps:
            return None
    joined = ' '.join(steps) + (' ' + answer if answer else '')
    assert tokens(joined) == tokens(raw), 'token mismatch:\nORIG: %s\nNEW: %s' % (
        raw[:200],
        joined[:200],
    )
    return steps, answer


def main():
    dry = '--dry' in sys.argv
    total = converted = answers = unchanged = 0
    samples = []
    short_steps = []

    for path in FILES:
        with open(path, encoding='utf-8') as f:
            src = f.read()

        def repl(m):
            nonlocal converted, answers, unchanged, total
            nl, raw = m.group(1), m.group(2)
            indent = nl[1:]  # spaces only, newline handled explicitly
            total += 1
            res = convert(raw)
            if res is None:
                unchanged += 1
                return m.group(0)
            steps, answer = res
            converted += 1
            if answer:
                answers += 1
            for s in steps:
                if len(s.split()) <= 3 and len(short_steps) < 25:
                    short_steps.append('%s | %s' % (path.split('/')[-1], s[:70]))
            lines = [nl + 'solution: [']
            for s in steps:
                lines.append(indent + "  '" + s + "',")
            lines.append(indent + '],')
            if answer:
                lines.append(indent + "answer: '" + answer + "',")
            out = '\n'.join(lines)
            if len(samples) < 4:
                samples.append('--- %s ---\n%s' % (path.split('/')[-1], out[:700]))
            return out

        new_src = SOLUTION_RE.sub(repl, src)
        if not dry and new_src != src:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_src)
            print('rewrote %s' % path.split('/')[-1])

    print('\n===== SUMMARY =====')
    print('solutions seen: %d | converted: %d | boxed answers: %d | left as string: %d'
          % (total, converted, answers, unchanged))
    print('\n===== SHORT STEPS (<=3 words, quality watch) =====')
    for s in short_steps:
        print(s)
    print('\n===== SAMPLES =====')
    for s in samples:
        print(s)


if __name__ == '__main__':
    main()
