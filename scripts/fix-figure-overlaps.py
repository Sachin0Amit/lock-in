#!/usr/bin/env python3
"""
fix-figure-overlaps.py — patch the six figures flagged by the SVG overlap audit
(2026-11-03). Every replacement is asserted to appear EXACTLY ONCE before the
file is written; any mismatch aborts without writing.

Fixes:
  ch-02 addition carry fig   : "each carry = 1" label left-aligned clear of the
                               third carry pill; dashed connector extended to
                               touch the pill it annotates.
  ch-02 multiplication NL    : panel labels no longer collide with jump arcs /
                               +6/+4 labels (top label -> y15; bottom panel
                               pushed down, viewBox 258->300); arcs re-anchored
                               to the exact tick positions (50/206/.../674).
  ch-02 multiplication col   : "36 = 30 + 6" moved off the multiplier digit 6
                               into the left label column; x-sign moved next to
                               the multiplier (x520), textbook position.
  ch-02 division NL          : same relayout family (viewBox 258->310, bottom
                               line y222, notes re-spaced).
  ch-01 comparing fig        : clipped bottom annotation centered (x425).
  ch-03 factor tree          : connector lines trimmed to stop 6px clear of the
                               6/10/4/15 digit glyphs they were crossing.
"""
import sys

CH01 = 'src/data/library/books/mathematics/foundation-mathematics/ch-01.ts'
CH02 = 'src/data/library/books/mathematics/foundation-mathematics/ch-02.ts'
CH03 = 'src/data/library/books/mathematics/foundation-mathematics/ch-03.ts'

NL = '\n'

ch02_patches = [
    # --- A. addition carry figure ---------------------------------------
    # (already applied via an earlier partial MultiEdit: label start-anchored
    #  at x655, connector extended to x632 — verified in git diff, skipped here)
    # --- B. multiplication number line ----------------------------------
    (
        'viewBox="0 0 760 258" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 4 times 6',
        'viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 4 times 6',
    ),
    (
        '<text x="30" y="40" opacity="0.75" text-anchor="start">4 x 6: four jumps of 6</text>',
        '<text x="30" y="15" opacity="0.75" text-anchor="start">4 x 6: four jumps of 6</text>',
    ),
    (
        'M ${56 + j * 156} 62 Q ${128 + j * 156} 18 ${200 + j * 156} 62',
        'M ${50 + j * 156} 62 Q ${128 + j * 156} 18 ${206 + j * 156} 62',
    ),
    (
        '<text x="700" y="164" opacity="0.75" text-anchor="end">6 x 4: six jumps of 4</text>',
        '<text x="700" y="140" opacity="0.75" text-anchor="end">6 x 4: six jumps of 4</text>',
    ),
    (
        '    <line x1="40" y1="200" x2="700" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>' + NL +
        '    <g text-anchor="middle">' + NL +
        '      ${Array.from({ length: 25 }, (_, n) => `<line x1="${50 + n * 26}" y1="194" x2="${50 + n * 26}" y2="206" stroke="currentColor" stroke-width="${n % 4 === 0 ? 1.5 : 1}"',
        '    <line x1="40" y1="230" x2="700" y2="230" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>' + NL +
        '    <g text-anchor="middle">' + NL +
        '      ${Array.from({ length: 25 }, (_, n) => `<line x1="${50 + n * 26}" y1="224" x2="${50 + n * 26}" y2="236" stroke="currentColor" stroke-width="${n % 4 === 0 ? 1.5 : 1}"',
    ),
    (
        'n % 4 === 0 ? `<text x="${50 + n * 26}" y="226"',
        'n % 4 === 0 ? `<text x="${50 + n * 26}" y="256"',
    ),
    (
        'M ${56 + j * 104} 174 Q ${102 + j * 104} 136 ${148 + j * 104} 174',
        'M ${50 + j * 104} 204 Q ${102 + j * 104} 160 ${154 + j * 104} 204',
    ),
    (
        '<text x="${102 + j * 104}" y="146" text-anchor="middle" font-weight="700" fill="#ea580c">+4',
        '<text x="${102 + j * 104}" y="174" text-anchor="middle" font-weight="700" fill="#ea580c">+4',
    ),
    (
        '<circle cx="50" cy="200" r="5" fill="currentColor" opacity="0.85"/>',
        '<circle cx="50" cy="230" r="5" fill="currentColor" opacity="0.85"/>',
    ),
    (
        '<circle cx="674" cy="200" r="7" fill="#ea580c"/>',
        '<circle cx="674" cy="230" r="7" fill="#ea580c"/>',
    ),
    (
        '<text x="380" y="250" text-anchor="middle" font-size="11.5" opacity="0.7">unequal rhythms',
        '<text x="380" y="284" text-anchor="middle" font-size="11.5" opacity="0.7">unequal rhythms',
    ),
    # --- C. multiplication column figure --------------------------------
    (
        '    <text x="200" y="172" font-size="22" font-weight="700" text-anchor="middle">x</text>' + NL +
        '    <text x="740" y="172" font-size="12" opacity="0.75" text-anchor="end">36 = 30 + 6</text>',
        '    <text x="520" y="172" font-size="22" font-weight="700" text-anchor="middle">x</text>' + NL +
        '    <text x="150" y="172" font-size="12" opacity="0.75" text-anchor="start">36 = 30 + 6</text>',
    ),
    # --- D. division number line -----------------------------------------
    (
        'viewBox="0 0 760 258" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 24 divided by 6',
        'viewBox="0 0 760 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line showing 24 divided by 6',
    ),
    (
        '<text x="30" y="40" opacity="0.75" text-anchor="start">24 ÷ 6: four jumps of 6 backward</text>',
        '<text x="30" y="15" opacity="0.75" text-anchor="start">24 ÷ 6: four jumps of 6 backward</text>',
    ),
    (
        '<text x="700" y="164" opacity="0.75" text-anchor="end">25 ÷ 6: four jumps of 6, one left over</text>',
        '<text x="700" y="140" opacity="0.75" text-anchor="end">25 ÷ 6: four jumps of 6, one left over</text>',
    ),
    (
        '    <line x1="40" y1="200" x2="700" y2="200" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>' + NL +
        '    <g text-anchor="middle">' + NL +
        '      ${Array.from({ length: 26 }, (_, n) => `<line x1="${50 + n * 26}" y1="194" x2="${50 + n * 26}" y2="206" stroke="currentColor" stroke-width="${n % 6 === 0 || n === 25 ? 1.5 : 1}"',
        '    <line x1="40" y1="222" x2="700" y2="222" stroke="currentColor" stroke-width="1.5" opacity="0.55"/>' + NL +
        '    <g text-anchor="middle">' + NL +
        '      ${Array.from({ length: 26 }, (_, n) => `<line x1="${50 + n * 26}" y1="216" x2="${50 + n * 26}" y2="228" stroke="currentColor" stroke-width="${n % 6 === 0 || n === 25 ? 1.5 : 1}"',
    ),
    (
        'n % 6 === 0 || n === 25 ? `<text x="${50 + n * 26}" y="226"',
        'n % 6 === 0 || n === 25 ? `<text x="${50 + n * 26}" y="248"',
    ),
    (
        'M ${700 - j * 156} 174 Q ${622 - j * 156} 136 ${544 - j * 156} 174',
        'M ${700 - j * 156} 196 Q ${622 - j * 156} 152 ${544 - j * 156} 196',
    ),
    (
        'y="146" text-anchor="middle" font-weight="700" fill="#ea580c">-6',
        'y="166" text-anchor="middle" font-weight="700" fill="#ea580c">-6',
    ),
    (
        '<circle cx="700" cy="200" r="5" fill="currentColor" opacity="0.85"/>',
        '<circle cx="700" cy="222" r="5" fill="currentColor" opacity="0.85"/>',
    ),
    (
        '<circle cx="76" cy="200" r="7" fill="#ea580c"/>',
        '<circle cx="76" cy="222" r="7" fill="#ea580c"/>',
    ),
    (
        '<text x="76" y="240" text-anchor="middle" font-size="11.5" fill="#ea580c">lands on 1',
        '<text x="76" y="272" text-anchor="middle" font-size="11.5" fill="#ea580c">lands on 1',
    ),
    (
        '<text x="400" y="252" text-anchor="middle" font-size="11.5" opacity="0.7">equal jumps',
        '<text x="400" y="292" text-anchor="middle" font-size="11.5" opacity="0.7">equal jumps',
    ),
]

ch01_patches = [
    (
        '<text x="380" y="232" font-size="12" opacity="0.8" text-anchor="start">first difference',
        '<text x="425" y="232" font-size="12" opacity="0.8">first difference',
    ),
]

ch03_patches = [
    # level-1 -> level-2 connectors: end 6px above the 6/10/4/15 glyph tops
    ('<line x1="182" y1="42" x2="128" y2="102"/>', '<line x1="182" y1="42" x2="128" y2="94"/>'),
    ('<line x1="198" y1="42" x2="252" y2="102"/>', '<line x1="198" y1="42" x2="252" y2="94"/>'),
    ('<line x1="562" y1="42" x2="508" y2="102"/>', '<line x1="562" y1="42" x2="508" y2="94"/>'),
    ('<line x1="578" y1="42" x2="632" y2="102"/>', '<line x1="578" y1="42" x2="632" y2="94"/>'),
    # level-2 -> level-3 connectors: start below the glyphs, end above the leaves
    ('<line x1="120" y1="116" x2="90" y2="182"/>',  '<line x1="120" y1="122" x2="90" y2="180"/>'),
    ('<line x1="130" y1="116" x2="160" y2="182"/>', '<line x1="130" y1="122" x2="160" y2="180"/>'),
    ('<line x1="248" y1="116" x2="222" y2="182"/>', '<line x1="248" y1="122" x2="222" y2="180"/>'),
    ('<line x1="258" y1="116" x2="292" y2="182"/>', '<line x1="258" y1="122" x2="292" y2="180"/>'),
    ('<line x1="500" y1="116" x2="470" y2="182"/>', '<line x1="500" y1="122" x2="470" y2="180"/>'),
    ('<line x1="510" y1="116" x2="540" y2="182"/>', '<line x1="510" y1="122" x2="540" y2="180"/>'),
    ('<line x1="628" y1="116" x2="606" y2="182"/>', '<line x1="628" y1="122" x2="606" y2="180"/>'),
    ('<line x1="638" y1="116" x2="672" y2="182"/>', '<line x1="638" y1="122" x2="672" y2="180"/>'),
]


def patch(path, pairs):
    with open(path, encoding='utf-8') as f:
        s = f.read()
    for i, (old, new) in enumerate(pairs):
        c = s.count(old)
        if c != 1:
            print(f'ABORT — {path} patch #{i}: {c} occurrences (expected 1) of:')
            print('   ', old[:110].replace('\n', '⏎'))
            sys.exit(1)
        s = s.replace(old, new, 1)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(s)
    print(f'OK — {path}: {len(pairs)} patches applied')


if __name__ == '__main__':
    patch(CH02, ch02_patches)
    patch(CH01, ch01_patches)
    patch(CH03, ch03_patches)
    print('ALL PATCHES APPLIED')
