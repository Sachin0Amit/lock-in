# AA Chapter 3 — "Complex Numbers: the New Rung" authoring master plan

> Written 2026-11-15 (run 105 opening). Follows the run-90 protocol:
> Drive download → vision transcription → internet research → master plan →
> verify-first → author. This file is the chapter's standing reference for
> every run until chapter 3 completes. The chapter OPENS in run 105 with
> lesson 3.1 (never a new chapter in the same run as a close — AA ch. 2
> closed complete in run 104).

## 1. The research protocol this chapter follows (run 105 record)

1. **Drive download for the unit** — `M2 Algebra :: 03. Complex Numbers`
   (Drive id `16g5wQMSErdcQYqZYabVIIEkA5wcNiYoh`, 59 MB scanned PDF) →
   `temporary-references/m2-03-complex-numbers.pdf`. Page-offset
   calibration: printed page `3.N` = PDF page `N + 2` (VLM-verified:
   PDF 3 shows the printed header "3.1" opening the chapter — the same
   +2 offset the m2-02 module carried).
2. **Text extraction attempted first** — `pdftotext` yields 4 chars on
   the opening pages: a pure scan (as the Drive survey records), so the
   vision model is mandatory. Vision transcription (one 4-page batch at
   100 DPI) of the ground for lesson 3.1: printed pp. 3.1–3.4 →
   `temporary-references/m2scan/tr-3.1-3.4.txt` (~12.0K chars):
   Introduction, Imaginary Number (incl. the two-negative-surds caution),
   Integral Powers of Iota + CAE 3.1 with answers, Complex Number +
   Representation/Argand plane + the multiplication-by-i rotation note,
   Algebraic Operations on Complex Numbers + Illustrations 3.7–3.9,
   Illustrations 3.10–3.13, Conjugate of Complex Number + the properties
   list. Later lessons re-download and transcribe their own pages per the
   SOURCE_LOG ledger (unit-mid-flight retention law).
3. **Internet research** (2026-11-15): NCERT Class 11 ch. 4 "Complex
   Numbers and Quadratic Equations" (the rationalized-book numbering; the
   canonical arc — 5.1 introduction, the imaginary unit, a + ib algebra,
   equality, the conjugate) and OpenStax *College Algebra 2e* §2.4
   "Complex Numbers" (web-checked: learning objectives add/subtract,
   multiply/divide, simplify powers of i; the standard form a + bi; the
   conjugate; division by conjugating) — the school-canon and modern
   cross-checks. JEE Main 2026 unit 2 pins "complex numbers and quadratic
   equations with modulus, Argand diagram, triangle inequality".
4. **Study-never-reproduce rule**: the module informs and verifies
   concepts; every roster, number, figure and exercise in our lessons is
   OUR OWN and recomputed by the verifier before any prose exists. The
   module's Illustration numbers (3.1–3.13) are studied shapes, never
   copied.

Companion sources (banked earlier): Hall & Knight *Higher Algebra* (Drive,
banked run 66), Khattar QA 4e (aptitude side), the ANS extension-ladder
chapters 6–8 (the closure-failure discipline this chapter climbs), AL 9.3
(the discriminant whose third case we now repair), AA 2.R (the chapter whose
exit hands us the D < 0 doors).

## 2. Chapter map — module sections → our five lessons

book.ts pins (correction recorded run 104: the run-103 pointer line naming
ch. 3 "Sequences and Series" was a slip — ch. 3 IS Complex Numbers; ch. 4
Classical Inequalities carries 2.1's AM–GM forward pointer; ch. 5 is
Sequences):

| # | Our lesson (plannedLessons title) | Module ground (printed pp.) |
|---|---|---|
| 3.1 | The Closure Failure That Forces i | 3.1–3.4 (Introduction → Imaginary Number → Integral Powers of Iota → Complex Number → Representation → Algebraic Operations → Conjugate seeds) |
| 3.2 | Conjugate and Modulus | 3.4–3.6 + 3.11 (Conjugate properties → Equality → CAE 3.2; Modulus 3.11) |
| 3.3 | Negative Discriminants: the Doors Turn Complex | 3.6–3.9 (Equality → Square Root of Complex Number → CAE 3.3; the conjugate-pair law for real coefficients is OUR synthesis) |
| 3.4 | The Argand Plane: Polar Form and the Argument | 3.11–3.18 (Polar form → Modulus → Argument → Euler's form → Logarithm → Multiplication/Division in polar form; Section Formula 3.5, Angle/Ray/Line 3.27–3.31) |
| 3.5 | De Moivre, Roots of Unity and the Complex Loci | 3.9–3.11 + 3.19–3.34 (Cube Roots of Unity + properties → De Moivre → Important Properties of Modulus → Locus Based on Distance Formula → Rotation Formula → Equilateral/Circle/Arc/Concyclic) |

Hosted folds from TOC_FOLD_LEDGER.json binding this chapter's lessons:
- 3.1 hosts (m2-03): "Complex Numbers" + "Complex Number" (chapter-umbrella
  — the arc itself), "Imaginary Number" (glossary — terms entry + prose
  use), "Equality of Complex Numbers" (glossary — terms entry + prose
  use), "Algebraic Operations on Complex Numbers" (section — named
  subsection + formal definition + worked example).
- 3.4 hosts: "Section Formula in Complex Numbers" (example-family),
  "Angle between Two Rays" (section), "Equation of Ray" (section).
- 3.5 hosts: "Square Root of Complex Number" (example-family),
  "Properties of Cube Roots of Unity" (section),
  "Condition for Three Points to Represent Equilateral Triangle"
  (example-family), "Equation of Circle whose Diametric End Points are
  Given" (example-family), "Properties of nth Roots of Unity" (section).

## 3. The five arcs in one line each (the writing spine)

- **3.1** — the honest birth: ℝ's closure failure (x² + 1 = 0), the ladder
  N ⊂ Z ⊂ Q ⊂ R ⊂ C (ANS 7.2/8.1 banked), the pair construction that makes
  equality componentwise and i² = −1 a theorem, the iota cycle, the four
  operations with the field-law survival census, the conjugate seeds
  (z + z̄ = 2a, zz̄ = a² + b²), the Argand plane + the quarter-turn note.
  The quadratic formula's D < 0 case is NAMED as this chapter's promise
  (cashed in 3.3), never cashed here.
- **3.2** — the conjugate and modulus as bookkeeping machinery: the
  properties list proved, division fully conjugated, |z| as distance,
  the triangle inequality's first read (the deep geometry waits).
- **3.3** — the payoff: D < 0 doors computed honestly (√(negative
  discriminant) = i√|D|), the conjugate-pair law for real coefficients
  PROVED from 3.1/3.2 algebra, sum/product of complex doors.
- **3.4** — the plane read algebraically: polar form, argument,
  multiplication as rotation-and-scaling, Euler's form; the section
  formula, rays, lines.
- **3.5** — De Moivre, the unit circle's equal spokes (cube roots of
  unity first — the module's own order), the loci (circle, arc, ellipse),
  the rotation formula, concyclic/equilateral conditions.

## 4. Standing obligations for every lesson of this chapter

- Prereq spine: AL 9.3 (discriminant) + ANS 7.2/8.1 (field laws, the
  ladder) for 3.1; each later lesson adds its predecessors.
- The verifier `scripts/verify-book4-ch03.ts` grows one engine section per
  lesson pair BEFORE prose (sections A–F = 3.1's engines, created run 105)
  — every number pinned, small cases brute-forced, sweeps exact-integer.
- Figures: the vivid palette only; the extension ladder (fig 1) and the
  Argand quarter-turn orbit (fig 2) are 3.1's own.
- Exam callouts label exam-style items honestly (JEE Main unit 2 names
  complex numbers + modulus + Argand diagram).
- Prose cross-references: AA 2.R's exit (the D < 0 doors), ANS's ladder,
  AL 9.3's third case — cite, never re-teach.
