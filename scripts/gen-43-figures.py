"""Generate the two SVG figures for FM lesson 4.3 (Comparing Fractions).

Fig A: 7/12 vs 5/8 on their own rulers + both raised to the 24-ruler
       (14/24 vs 15/24, one extra cell highlighted).
Fig B: number line [1/2, 1] with the banked exam trio 7/11, 2/3, 4/5.

All geometry matches scripts/verify-unit-4.ts sections Z1-Z7.
Prints the SVG strings ready to paste into ch-04.ts.
"""

BAR_X0, BAR_X1 = 70, 690
BAR_W = BAR_X1 - BAR_X0  # 620


def f2(x: float) -> str:
    s = f"{x:.2f}".rstrip("0").rstrip(".")
    return s if s else "0"


def bar(y: int, n_cells: int, shaded: int, label: str, right: str, label_y: int,
        tint_opacity: str = "0.15"):
    """Emit one ruler bar: label, outer rect, shaded cells, interior lines."""
    cw = BAR_W / n_cells
    out = []
    out.append(f'    <text x="{BAR_X0}" y="{label_y}">{label}</text>')
    out.append(f'    <rect x="{BAR_X0}" y="{y}" width="{BAR_W}" height="44" fill="none" stroke="currentColor" stroke-width="1.5"/>')
    out.append(f'    <g fill="#ea580c" opacity="{tint_opacity}">')
    for i in range(shaded):
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
a.append('<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two bars showing 7/12 and 5/8, then both re-measured on 24-cell rulers as 14/24 and 15/24 with one extra cell highlighted">')
a.append('  <g font-size="13" fill="currentColor">')
a.append(bar(44, 12, 7, "cut into 12 equal pieces — 7 shaded: 7/12", "7/12", 34))
a.append(bar(132, 8, 5, "cut into 8 equal pieces — 5 shaded: 5/8", "5/8", 122))
a.append(bar(220, 24, 14, "raised to the 24-ruler: 7/12 = 14/24", "14/24", 210))
a.append(bar(308, 24, 15, "raised to the 24-ruler: 5/8 = 15/24", "15/24", 298))
# dashed boundaries of the two shading stops across the two 24-rulers
stop_lo = BAR_X0 + 14 * (BAR_W / 24)  # 361.67
stop_hi = BAR_X0 + 15 * (BAR_W / 24)  # 387.5
a.append(f'  <line x1="{f2(stop_lo)}" y1="214" x2="{f2(stop_lo)}" y2="358" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>')
a.append(f'  <line x1="{f2(stop_hi)}" y1="214" x2="{f2(stop_hi)}" y2="358" stroke="#ea580c" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.6"/>')
# highlight the one extra cell on the bottom bar
a.append(f'  <rect x="{f2(stop_lo)}" y="308" width="{f2(stop_hi - stop_lo)}" height="44" fill="#ea580c" opacity="0.45"/>')
a.append('  <text x="380" y="385" text-anchor="middle" font-weight="700">the single extra twenty-fourth decides: 5/8 &gt; 7/12</text>')
a.append("  </g>")
a.append("</svg>")
fig_a = "\n".join(a)

# ---------------- Figure B ----------------
PXU = 1240.0  # px per unit: 620 px per half unit
def lx(frac: float) -> float:
    return BAR_X0 + (frac - 0.5) * PXU

marks = [
    (1 / 2, "1/2", "below"),
    (7 / 11, "7/11", "above"),
    (2 / 3, "2/3", "below"),
    (4 / 5, "4/5", "above"),
    (1.0, "1", "below"),
]
b = []
b.append('<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 1/2 to 1 with 7/11 just above the half, 2/3 a shade further right and 4/5 well clear">')
b.append('  <g font-size="13" fill="currentColor">')
b.append(f'  <line x1="40" y1="130" x2="720" y2="130" stroke="currentColor" stroke-width="1.5"/>')
b.append(f'  <path d="M 720 130 l -9 -4 v 8 z" fill="currentColor"/>')
for frac, name, pos in marks:
    x = lx(frac)
    b.append(f'  <line x1="{f2(x)}" y1="122" x2="{f2(x)}" y2="138" stroke="currentColor" stroke-width="1.5"/>')
    if pos == "above":
        b.append(f'  <text x="{f2(x)}" y="104" text-anchor="middle" font-weight="700">{name}</text>')
    else:
        b.append(f'  <text x="{f2(x)}" y="162" text-anchor="middle" font-weight="700">{name}</text>')
b.append('  <text x="380" y="190" text-anchor="middle" font-weight="700">between the half and the whole: 7/11 &lt; 2/3 &lt; 4/5</text>')
b.append("  </g>")
b.append("</svg>")
fig_b = "\n".join(b)

print("=== FIG A ===")
print(fig_a)
print()
print("=== FIG B ===")
print(fig_b)
print()
# sanity
print("check stops:", f2(stop_lo), f2(stop_hi), "cell:", f2(BAR_W / 24))
print("check marks:", [f2(lx(f)) for f, _, _ in marks])
