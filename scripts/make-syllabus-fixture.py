#!/usr/bin/env python3
"""Regenerate the 1-page syllabus PDF fixture used by
scripts/verify-custom-book-builder.ts (section G).

Layout contract with the extractor:
  - largest-font first line  -> document title (root name)
  - "Unit N: ..." lines      -> structural headings
  - "N. Topic" lines         -> numbered topics
"""
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

OUT = "tool-results/syllabus.pdf"

lines = [
    ("JEE Main Mathematics Syllabus", 20),   # title (largest font)
    ("", 11),
    ("Unit 1: Number Systems", 13),
    ("1. Number Systems", 11),
    ("2. Sets and Functions", 11),
    ("3. Complex Numbers", 11),
    ("4. Quadratic Equations", 11),
    ("5. Sequences and Series", 11),
    ("6. Permutations and Combinations", 11),
    ("Unit 2: Algebra and Calculus", 13),
    ("7. Matrices and Determinants", 11),
    ("8. Polynomials", 11),
    ("9. Limits and Continuity", 11),
    ("10. Integration", 11),
    ("11. Differential Equations", 11),
]

c = canvas.Canvas(OUT, pagesize=A4)
w, h = A4
y = h - 60
for text, size in lines:
    c.setFont("Helvetica-Bold" if size >= 13 else "Helvetica", size)
    if text:
        c.drawString(50, y, text)
    y -= size + 8
c.showPage()
c.save()
print(f"wrote {OUT}")
