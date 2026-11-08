"""Generate the two SVG figures for FM lesson 4.4 (Adding and Subtracting
Fractions).

Fig A: 1/4 + 1/6 — the two unlike rulers, then both raised to the
       twelve-ruler, then the sum bar: 3/12 + 2/12 = 5/12 with the two
       contributions stacked (boundary dashed after the third cell).
Fig B: subtraction as gap-naming on the number line — ticks 0, 7/12, 5/8, 1
       with the arc naming the gap 1/24 (Lesson 4.3's pair, now arithmetic).

All geometry matches scripts/verify-unit-4.ts sections AH1-AH7.
Prints the SVG strings ready to paste into ch-04.ts.
"""

BAR_X0, BAR_X1 = 70, 690
BAR_W = BAR_X1 - BAR_X0  # 620


def f2(x: float) -> str:
    s = f"{x:.2f}".rstrip("0").rstrip(".")
    return s if s else "0"


def bar(y: int, n_cells: int, shaded_from: int, shaded_to: int, label: str,
        right: str, label_y: int, tint_opacity: str = "0.15"):
    """Emit one ruler bar with cells [shaded_from, shaded_to) tinted."""
    cw = BAR_W / n_cells
    out = []
    out.append(f'    <text x="{BAR_X0}" y="{label_y}">{label}</text>')
    out.append(f'    <rect x="{BAR_X0}" y="{y}" width="{BAR_W}" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>')
    out.append(f'    <g fill="#ea580c" opacity="{tint_opacity}">')
    for i in range(shaded_from, shaded_to):
        out.append(f'      <rect x="{f2(BAR_X0 + i * cw)}" y="{y}" width="{f2(cw)}" height="44"/>')
    out.append("    </g>")
    op = "0.5" if n_cells > 12 else "0.7"
    out.append(f'    <g stroke="currentColor" stroke-width="1" opacity="{op}">')
    for i in range(1, n_cells):
        x = f2(BAR_X0 + i * cw)
        out.append(f'      <line x1="{x}" y1="{y}" x2="{x}" y2="{y + 44}"/>')
    out.append("    </g>")
    out.append(f'    <text x="706" y="{y + 27}" font-weight="700">{right}</text>')
    return "\n".join(out)


# ---------------- Figure A ----------------
a = []
a.append('<svg viewBox="0 0 760 490" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bars showing 1/4 and 1/6 on their own rulers, both re-measured in twelfths as 3/12 and 2/12, and the sum bar 5/12 with the two contributions stacked">')
a.append('  <g font-size="13" fill="currentColor">')
a.append(bar(44, 4, 0, 1, "cut into 4 equal pieces — 1 shaded: 1/4", "1/4", 34))
a.append(bar(132, 6, 0, 1, "cut into 6 equal pieces — 1 shaded: 1/6", "1/6", 122))
a.append(bar(220, 12, 0, 3, "raised to the 12-ruler: 1/4 = 3/12", "3/12", 210))
a.append(bar(308, 12, 0, 2, "raised to the 12-ruler: 1/6 = 2/12", "2/12", 298))
# the sum bar: 3/12 (from the fourth) + 2/12 (from the sixth), darker tint
a.append(bar(396, 12, 0, 5, "the sum on one ruler: 3 + 2 = 5 twelfths", "5/12", 386, "0.3"))
# dashed boundary between the two contributions on the sum bar
bd = BAR_X0 + 3 * (BAR_W / 12)  # 225
a.append(f'  <line x1="{f2(bd)}" y1="390" x2="{f2(bd)}" y2="446" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>')
a.append('  <text x="380" y="473" text-anchor="middle" font-weight="700">the contributions stack on one ruler: 1/4 + 1/6 = 3/12 + 2/12 = 5/12</text>')
a.append("  </g>")
a.append("</svg>")
fig_a = "\n".join(a)

# ---------------- Figure B ----------------
X0, X1 = 40.0, 720.0  # 0 and 1 on the line
UNIT = X1 - X0        # 680 px per unit


def lx(frac: float) -> float:
    return X0 + frac * UNIT


b = []
b.append('<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1 with ticks at 7/12 and 5/8 and an arc naming the gap between them as 1/24">')
b.append('  <g font-size="13" fill="currentColor">')
b.append(f'  <line x1="{f2(X0)}" y1="170" x2="{f2(X1)}" y2="170" stroke="currentColor" stroke-width="1.5"/>')
b.append(f'  <path d="M {f2(X1)} 170 l -9 -4 v 8 z" fill="currentColor"/>')
for frac, name in [(0.0, "0"), (7 / 12, "7/12"), (5 / 8, "5/8"), (1.0, "1")]:
    x = lx(frac)
    b.append(f'  <line x1="{f2(x)}" y1="162" x2="{f2(x)}" y2="178" stroke="currentColor" stroke-width="1.5"/>')
    b.append(f'  <text x="{f2(x)}" y="198" text-anchor="middle" font-weight="700">{name}</text>')
# the gap arc between the two points
gx1, gx2 = lx(7 / 12), lx(5 / 8)
b.append(f'  <path d="M {f2(gx1)} 170 A {f2((gx2 - gx1) / 2)} 26 0 0 1 {f2(gx2)} 170" fill="none" stroke="#ea580c" stroke-width="1.5"/>')
b.append(f'  <text x="{f2((gx1 + gx2) / 2)}" y="134" text-anchor="middle" font-weight="700">1/24</text>')
b.append('  <text x="380" y="232" text-anchor="middle" font-weight="700">subtraction names the gap between the points: 5/8 − 7/12 = 1/24</text>')
b.append("  </g>")
b.append("</svg>")
fig_b = "\n".join(b)

print("=== FIG A ===")
print(fig_a)
print()
print("=== FIG B ===")
print(fig_b)
print()
# geometry echoes for the verify sections
cw4, cw6, cw12 = BAR_W / 4, BAR_W / 6, BAR_W / 12
print("check fig A: cw4 =", f2(cw4), "| 1/4 shading =", f2(cw4),
      "| 3 twelfths =", f2(3 * cw12), "| 1/6 shading =", f2(cw6),
      "| 2 twelfths =", f2(2 * cw12), "| 5 twelfths =", f2(5 * cw12))
print("check fig A boundary x =", f2(bd))
print("check fig B: x(7/12) =", f2(lx(7 / 12)), "x(5/8) =", f2(lx(5 / 8)),
      "gap px =", f2(gx2 - gx1), "= unit/24 =", f2(UNIT / 24))
