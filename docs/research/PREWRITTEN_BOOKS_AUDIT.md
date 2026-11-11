# PREWRITTEN BOOKS AUDIT — the AA-style research pass over the three complete books

> **Directive (owner, 2026-11-11):** "how you did for advanced algebra do it for
> pre written 3 books which are already written do all the process and see it
> neet more topics or any changes if so do so" — the run-90 protocol
> (download the Drive books → extract text or vision-scan → internet
> research → master plan → audit → implement) applied not to a new chapter
> but to the three **already-written** books, auditing each against its
> sources for missing topics and needed changes, then implementing them.

**Books audited:** Foundation Mathematics (FM, #1, 44 lessons, 11 ch),
Arithmetic and Number Systems (ANS, #2, 35 lessons, 10 ch),
Elementary Algebra (AL, #3, 35 lessons, 11 ch).
**Date:** 2026-11-11 (manual audit turn, between run 90 and run 91).
**Outcome:** FM HEALTHY (no changes). ANS + AL carry **4 genuine topic gaps**
= 6 queued lessons + 1 authored this turn (ANS 8.5). One QA plan enrichment.
One survey repair (the H&K contents transcription gap).

---

## 1. The research protocol this audit executed

- **Drive downloads for the subjects** (both digital, text layers present —
  the direct-extraction branch of the protocol, no vision needed):
  - `hk-elementary-algebra.pdf` (23 MB, 572 pp.) — Hall & Knight, *Elementary
    Algebra for Schools*, Drive id `13p83Jss_D7bSgAXh1juKHKI69oKpBxWL` — the
    AL book's banked classic (research header, run 66).
  - `khattar-qa-4e.pdf` (33 MB, 1049 pp.) — Khattar, *Quantitative Aptitude
    for Competitive Examinations* 4e, Drive id `12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi`
    — the reference for the FM/ANS/AL competitive scope (chapters 1–7, 22,
    25–28 route to the three books; the commercial family routes to QA).
- **Direct text extraction** (pdftotext): full TOCs, the full body text of
  both books to `temporary-references/hk-ea-full.txt` (786 KB) and
  `khattar-full.txt` (2.5 MB); chapter-section structure recovered by
  `scripts/extract_khattar_sections.ts` (small-caps heading detector) and
  by hand-reading the H&K contents pages.
- **Internet research** (2026-11-11): NCERT class 6/7/8 chapter lists
  (byjus/cbseacademic/geeksforgeeks checks) — the school canon FM/ANS/AL
  claim to cover; H&K *Elementary Algebra for Schools* contents confirmed
  against Google Books (chapters XXXII "Ratio Proportion and Variation" and
  XII "Highest Common Factor Lowest Common Multiple of Simple Expressions"
  both verified); CBSE class-8 "Squares and Square Roots / Cubes and Cube
  Roots" standard scope confirmed (the long-division square-root method is
  NCERT-8 fare, not optional).
- **Study-never-reproduce:** every exhibit in the queued/authored lessons
  below is OUR OWN; the sources only inform scope and verify concepts.

## 2. What the sources carry vs what the three books teach

### 2.1 Foundation Mathematics — HEALTHY, no changes

FM's ground is the school canon, not a single Drive book. Audited against:
NCERT class 6 (knowing our numbers, playing with numbers, whole numbers,
negative numbers, fractions, decimals, data handling, mensuration, basic
geometry, ratio/proportion, symmetry → Geometry book), class 7 (integers,
fractions/decimals, comparing quantities = percentage/interest, rational
numbers, exponents → AL 2, algebra → AL, symmetry → Geometry), class 8
(rational numbers → ANS 7, linear equations → AL 5, quadrilaterals →
Geometry, **squares/square roots + cubes/cube roots → the ANS gap §2.2**,
comparing quantities ✓ FM 5.5, algebraic expressions/identities → AL 3,
mensuration ✓ FM 8.5/9, exponents ✓ AL 2, direct/inverse proportion ✓
FM 6.4, factorisation ✓ AL 4, graphs ✓ FM 10 + AL 10, playing with numbers
✓ ANS 5.2) — and the Khattar concept chapters routed to FM:
ch. 4 Simplification (BODMAS ✓ FM 2.5; approximation ✓ FM 1.3; the
exam-speed craft → QA ch. 1 planned), ch. 5 Percentage (concept ✓ FM 5.4;
change/discount/SI ✓ FM 5.5 with the factor + round-trip laws; successive
transactions and the commercial family → QA ch. 2 planned), ch. 6 Average
(✓ FM 10.4; the aptitude drill family → QA ch. 7 planned), ch. 7 Ratio and
Proportion (✓ FM 6.1–6.5; exam-speed → QA ch. 4 planned).
**Verdict: every FM obligation is covered inside FM or legitimately
cross-referenced.** The one adjacent finding (price-consumption/population
percentage family) is an *aptitude*-side topic → the QA plan change §3.4.

### 2.2 Arithmetic and Number Systems — ONE genuine gap

ANS's sources: Khattar ch. 1 "Numbers" ✓ (classification → ch. 6–8;
divisibility ✓ 5.2; remainders ✓ 5.1/5.4; unit digit ✓ 5.3; factorials and
trailing zeros ✓ 4.3–4.4 with `highest power` engines; HCF/LCM ✓ 2.1–2.3),
ch. 22 Binary ✓ (3.4 binary-hex-machine), and the proof-transition arc
(Beck & Geoghegan) ✓ throughout.
**The gap: Khattar ch. 3 "Square Root and Cube Root" (3.1–3.18) — and its
school-canon twin NCERT-8 "Squares and Square Roots" + "Cubes and Cube
Roots" — is carried NOWHERE on the shelf.** Verified shelf-wide: the
factor method, the **long-division square-root method**, square roots of
fractions/decimals, cube roots by prime factorisation and estimation, the
odd-number-sum property of squares — no lesson in any of the 28 books
teaches the extraction crafts (ANS 8.2/8.3 prove √n irrationality and surd
*arithmetic*, never *extraction*; FM 3 carries Euclid's long division for
HCF, unrelated). This is a standard-curriculum topic (NCERT-8) + a full
Khattar aptitude chapter.
**Change: new lesson ANS 8.5** (authored this turn — §4) — the
computational coda of the irrationals chapter: after 8.4 completes the
line, the crafts that *compute* the roots the line was completed for.

### 2.3 Elementary Algebra — THREE genuine gaps

AL's spine (H&K I–XXI) audits clean: I Definitions/Substitutions → 1.1/1.3;
II–V negative quantities/brackets/addition/subtraction → 1.2 + FM 7;
VI–VII multiplication/division → 3.2/3.4; VIII brackets → 1.2;
IX simple equations → ch. 5; X symbolical expression → 1.4;
XI problems → 5/11; XIII elementary fractions + XX Fractions + XXI
addition/subtraction of fractions + XXII misc. fractions → ch. 8;
XIV–XV simultaneous equations and problems → ch. 6/11; XVI involution →
3.3; XVIII resolution into factors → ch. 4; XXX theory of indices → ch. 2;
XXV quadratics → ch. 9; XXVIII harder factors → 4.4; XXXVI theory of
quadratic equations → 9.4 (Viète); XL scales of notation → ANS 3;
XXXIX logarithms / XXXIII–XXXV progressions / XXXVII P&C / XXXVIII binomial
→ AA planned (ch. 9/5/6/7); XLIV graphs → 10 + AA ch. 1.

**Gap A — H&K XII+XIX / Khattar ch. 26: HCF and LCM of algebraic
expressions.** The craft (HCF = common factors at *lowest* powers, LCM at
*highest*, the product law `hcf(a,b) · lcm(a,b) = |a·b|` for expressions,
Euclid's algorithm run on polynomials) is taught nowhere: AL 4.1 extracts
common factors as a *factoring technique* but never names or proves the
HCF/LCM-of-expressions theory; the `LCM` strings in AL 5/6 are fraction-
clearing, not the topic. Khattar 26 is routed to AL per the survey.
**Change: new lesson AL 4.5 "HCF and LCM of Expressions" (queued).**

**Gap B — H&K XXVI: Simultaneous Quadratic Equations.** One linear + one
quadratic (the substitution pipeline) and the symmetric two-quadratic art
(x+y, xy substitutions) — searched shelf-wide: nothing (the only
"nonlinear system" hits are university DE/NA numerics). Standard CAT/JEE
foundation scope; Khattar 28's word problems lean on it.
**Change: new lesson AL 6.4 "One Linear, One Quadratic" (queued).**

**Gap C — H&K XXXII / Khattar ch. 7: Ratio, Proportion and Variation at
algebra level.** FM 6.1–6.5 owns the school foundation (ratio as
comparison, cross-multiplication, direct/inverse variation, scaling), but
the classic *algebraic* layer — duplicate/triplicate/sub-duplicate ratios,
continued proportion and the mean proportional, the componendo–dividendo
theorem family, joint and combined variation, the k-method of variation
constants — is on no shelf (componendo shelf-wide: 0 hits). H&K gives it a
full chapter; Khattar 7 shortcuts are built on it; CAT treats it as core.
**Change: new AL chapter 12 "Ratio, Proportion and Variation" (3 lessons,
queued) + FM 6 keeps its foundation arc (cross-referenced, not duplicated).**

## 3. The changes this audit makes (the "if so do so")

1. **ANS 8.5 authored this turn** — see §4 for the full authoring record.
2. **ANS ch. 8 plannedLessons emptied** as 8.5 ships; **ANS book status**
   stays `complete` — the gap is closed *this turn*, the book re-completes.
3. **AL gap lessons queued** (statuses: AL → `in-progress` until the three
   gaps close; lessons registered as plannedLessons):
   - ch. 4: `4.5 HCF and LCM of Expressions` (H&K XII/XIX + Khattar 26)
   - ch. 6: `6.4 One Linear, One Quadratic` (H&K XXVI)
   - new ch. 12 `ratio-proportion-variation`: `12.1 Ratio Laws and the
     Componendo Family`, `12.2 Variation: the Algebra of Constants`,
     `12.3 Continued Proportion, Mean Proportionals and Applications`
   - authoring order: 4.5 → 6.4 → 12.1 → 12.2 → 12.3 (extend
     `verify-book3-ch04/06` per pair; new `verify-book3-ch12`; e2e per
     `e2e-aa-1x.sh` pattern).
4. **QA plan enrichment** (planned book, plan-level change): ch. 2 gains
   the planned lesson `Price, Consumption, Population and the Inverse
   Percentage Family` — the Khattar ch. 5 aptitude subtopics (price rise ↔
   consumption cut, population growth/decline, exam pass-fail splits)
   that no shelf book names explicitly.
5. **Survey repair**: `DRIVE_TOC_SURVEY.md`'s `root-elementary-algebra`
   transcription had skipped the first contents page (pages 2–7 were
   misjudged "not contents"); the recovered H&K chapters I–XXI are now
   appended there so the evidence base is complete for the queued AL work.
6. **Working copies kept** (per-unit deletion law — the UNIT is the gap
   closure, still open): `hk-elementary-algebra.pdf` + `khattar-qa-4e.pdf`
   + the extracted text stay in `temporary-references/` for authoring
   AL 4.5/6.4/12.x (H&K chapters XXVI/XXXII and Khattar 26/7/3 sections
   will be consulted at authoring time), recorded in SOURCE_LOG.md.

## 4. ANS 8.5 — authored this turn (the record)

**Lesson:** `ans-square-and-cube-root-crafts` — "Square and Cube Roots: the
Extraction Crafts" — the computational coda of ch. 8: after completeness
pinned the roots, the crafts that compute them digit by digit.
**Scope (grounded in Khattar 3.1–3.18 + NCERT-8 ch. 6/7, our own exhibits):**
the squares census (odd-number sums, the (n+1)²−n² gap law), pythagorean
triplets (cross-ref Geometry), square roots by the factor method, **the
long-division square-root method derived from (10a+b)² = 100a² + (20a+b)b**
(why each step works — the ANS signature: prove the craft), square roots of
fractions/decimals, estimation/squeeze from 8.1, cube roots by prime
factorisation + the digit-group shortcut derived from 10³ ≡ 0 (mod cubes
of 10) + estimation, and the exam corner (Khattar-style speed items
labelled honestly).
**Verify-first:** `verify-book2-ch08.ts` extended with sections J (squares
census laws brute-swept, the odd-sum telescoping Σ(2k−1) = n², triplet
generator a=(m²−n²), b=2mn, c=m²+n² verified for m,n ≤ 12 with per-side
checks) and K (the division-method walks pinned digit-by-digit for √2,
√3, √5.29, √7 up to 4–6 digits, every (20a+b)b product and comparison
recomputed; cube-root group checks; estimation bounds re-proved; quiz +
exercise keys) — green BEFORE prose.
**Gates:** tsc clean; eslint 0 errors; verifier green; e2e on the lesson
route (KaTeX renders, quiz 5/5 on intended keys, solutions expand, figures
render, 0 console errors, 390px + 1280px + dark); VLM screenshot check.

## 5. Standing rules for the queued gap lessons

Same as the house protocol: verify-first (extend the book's chapter
verifier with the pair's sections BEFORE prose, pin every number, brute-
force the small cases); Cengage house style per BOOK_FORMAT.md; original
exhibits only; lesson ids stable forever; one unit at a time; the
gap-closure queue runs AFTER the current AA ch. 1 unit completes (the
RESUME_POINTER carries the interleave note), then AA resumes.
