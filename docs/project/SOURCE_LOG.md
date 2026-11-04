# SOURCE LOG — Google Drive reference-book ledger

Storage law: ~9 GB total; download only the current unit's books into
`temporary-references/` (gitignored); delete local copies when the unit is
verified; **never** touch Drive originals. Internet research is the
sanctioned fallback/supplement when the Drive lacks a topic (MASTER_PLAN §2
step 6).

## Drive collection

- **Link:** https://drive.google.com/drive/folders/1NI-VN0d6bUt_wciV6k0UCLN8qiqoCRO1 (owner-supplied 2026-11-03, link-shared)
- **Survey status:** complete (2026-11-03). Folder "books": 89 root items
  (reference library: calculus, linear algebra, physics, chemistry, CS,
  economics, languages…) + 4 subfolders — MATHS (M1 Trigonometry, M2 Algebra,
  M3 Coordinate Geometry, M4 Calculus, M5 3D Geometry — JEE module PDFs),
  CHEMISTRY, PHYSICS, _DPPs (practice sheets). Full machine-readable listing:
  `temporary-references/inventory.json` (gitignored). Re-confirmed 2026-11-03
  after a sandbox recycle wiped the gitignored listing — embeddedfolderview
  re-pull, same 89 entries, file ids intact. The MATHS subfolder was itself
  surveyed 2026-11-03 (run 14, owner style directive): 5 module folders,
  42 chapter PDFs total — per-module machine listings persisted at
  `temporary-references/maths-*.json` (gitignored; rebuild with
  `scripts/list_drive_folder.ts <folderId>`; module ids live in
  maths-inventory.json).
- Note: the Drive is exam/higher-ed oriented; school-level foundation topics
  rely on the internet fallback (NCERT-class curricula) plus the Khattar
  aptitude book for exam-style coverage. Re-downloaded again 2026-11-03
  (hourly run 8, after the fourth recycle wiped the gitignored survey —
  rebuilt in one command via `scripts/rebuild_drive_survey.ts`; PDF 33.9 MB
  via the persisted file id) for FM ch. 3 lesson 3.2; ch. 1 prime material
  studied (prime = "divisible by 1 and itself only", composite = "greater
  than 1 and not prime", the four notes incl. 1-is-neither and 2-only-even
  prime, the 25-primes-below-100 list, co-primes with the 16 & 17 example);
  working copies deleted after the lesson's E2E. Exposition original.

## Style references (presentation, not content)

- `cengage-jee-style` — the Drive `MATHS` M1–M5 modules are the Cengage JEE
  mathematics series (per-chapter PDFs). Studied 2026-11-03 (run 14, owner
  directive "i want my book to look like in cengage book"): M2/01 "Set Theory
  and The Real Number System" (file id persisted in
  `temporary-references/maths-M2.json`; 24 MB, 35 pp) downloaded via
  `scripts/download_drive_file.sh` and examined with OCR + vision analysis
  on rendered pages. Used ONLY as the **presentation style reference** for
  the reader reskin and the BOOK_FORMAT theory-voice contract: ALL-CAPS
  ink-green section heads over rules, definitions in running prose with
  symbolic "Thus," restatements, "For example," runs as (i)(ii)(iii)
  enumerated items, ILLUSTRATION pills + sage problem bands + "Sol."
  solutions, green exercise banner bars, sage table headers. Re-studied
  the same file 2026-11-03 (run 16, owner directive "the solution should
  also be in cengage style") with the analysis focused on the **solution
  pages** (1.9/1.22 illustrations, S.6 solutions): "Sol." pill inline at
  the start of the first solution line, hanging-indent chains with a
  fixed left connective tag column (∴/or/Now,/So,), Case (i):/Alternative
  Method: bold leads, prose lines full width, terminal ∴ or Hence line as
  the answer — no boxed Answer rows, no step numbers. **No text,
  examples, exercises or figures reproduced** — all LockIn content remains
  original. Working copy (PDF + page renders) deleted after the run's E2E
  verification, per the storage law.

## Citation keys (used by lesson `sources` fields)

- `ncert-math6-ch12` — NCERT Class 6 Mathematics, ch. 12 "Ratio and
  Proportion" (old-edition canon; public curriculum). Used for: FM ch. 6
  lesson 6.1 — the canonical ratio charter mirrored (§12.1 "Ratio" —
  comparison by division, same-kind/same-unit terms, ratios in simplest
  form by the common factor), web-checked 2026-11-04; lesson 6.2 —
  Exercise 12.3 (the unitary method) extended 2026-11-04 (run 27); lesson
  6.3 — §12.2 "Proportion" + Exercise 12.2 extended 2026-11-04 (run 29):
  the definition of proportion as an equality of two ratios, the
  `a : b :: c : d` notation read "a is to b as c is to d", the extremes/
  means vocabulary and the product-of-extremes = product-of-means law,
  and the missing-term shape (second/third/fourth given, find the first)
  — the canon confirms the topic sequence and vocabulary; the ::-notation
  provenance note, the four-seats figure, the two-direction cross-law
  derivation, the alternendo/invertendo theorems, the mean/third
  proportional cards and the line-of-agreement figure are the book's own
  expositions and derivations. The chapter's 12.3 "Unitary Method" section
  was banked in lesson 6.2; exposition original throughout.
- `khattar-qa-4e` — Dinesh Khattar, *Quantitative Aptitude for Competitive
  Examinations*, 4th ed., Pearson (2019), ISBN 9789353439552. Drive file
  `Quantitative-Aptitude-Competitive-Examinations-Khattar.pdf` (32.4 MB;
  file id persisted in the survey since run 6). Used for: ch. 1 "Numbers" —
  place-value/face-value definitions, Indian system naming, exam-style digit
  problems, and (unit 3) the "Tests of Divisibility" list + prime/composite/
  co-prime definitions for FM ch. 3 lesson 3.1; ch. 4 "Simplification" — the
  BODMAS material for FM ch. 2 lesson 2.5 (bracket ladder bar → ( ) → { } →
  [ ], the "of" rank above ÷/×, nested-illustration style — exposition
  original, no text reproduced).
- `ncert-math6-ch1` — NCERT Class 6 Mathematics, ch. 1 "Knowing Our Numbers"
  (public curriculum). Used for: canonical school-level topic coverage
  (comparing numbers, ascending/descending, forming greatest/smallest,
  estimation). Coverage cross-checked via published syllabus outlines;
  exposition original.
- `ncert-math6-ch2` — NCERT Class 6 Mathematics, ch. 2 "Whole Numbers"
  (public curriculum). Used for: FM ch. 2 lessons 2.1–2.5 — canonical
  school-level treatment of the four operations on the number line and the
  properties of whole numbers under each operation (closure,
  commutativity, associativity, identity, distributivity — and their
  failures for subtraction; decomposition/regrouping; division algorithm
  a = q·b + r with 0 ≤ r < b; ÷0 undefined). Lesson 2.5's
  order-of-operations coverage additionally web-checked against
  CBSE-aligned BODMAS references plus historical sources (Cajori's
  notation history; Lennes 1917, *American Mathematical Monthly*)
  (searches 2026-11-03); exposition original.
- `ncert-math6-ch3` — NCERT Class 6 Mathematics, ch. 3 "Playing with
  Numbers" (public curriculum). Used for: FM ch. 3 lessons 3.1 and 3.2 —
  canonical
  school-level framing of factors and multiples ("a factor is an exact
  divisor"), prime/composite vocabulary, the Eratosthenes sieve as the
  syllabus method for finding primes, and the divisibility tests for
  2/3/4/5/6/8/9/10(/11) as syllabus items; the reasons behind the tests
  (tail theorem, mod-9 digit-sum, alternating ±1, coprime splits, the
  7-gadget, Pascal's 1654 criterion) and the uniqueness-of-factorisation
  treatment (crossroads lemma, 1-exclusion argument) are the book's own
  derivations (web-checked 2026-11-03); exposition original.
- `ncert-math6-ch7` — NCERT Class 6 Mathematics, ch. 7 "Fractions"
  (public curriculum). Used for: FM ch. 4 lesson 4.1 — canonical
  school-level sequence mirrored (a fraction as part of a whole, fraction
  on the number line, proper / improper and mixed fractions), with
  equivalence, simplest form and comparison left scheduled for lessons
  4.2–4.3 exactly as the NCERT chapter orders them after the basics;
  lesson 4.4 — canonical addition/subtraction sequence mirrored (like
  denominators added by counting equal pieces, unlike denominators via a
  common denominator / the LCM, mixed numbers via the two storeys and
  improper conversion), web-checked against the current Ganita Prakash
  edition's exercise sequence (7.1–7.9) and published syllabus outlines
  (search 2026-11-04); coverage cross-checked via published syllabus
  outlines (searches 2026-11-03); exposition original — the mediant
  theorem and its density consequence, the division-algorithm reading of
  improper↔mixed, the Egyptian unit-fraction material, the greedy-split
  procedure and the straight-across fraud theorem are the book's own
  additions (Rhind-papyrus facts web-verified 2026-11-03: Ahmes ~1650 BCE
  copy of an Amenemhat-III-era text, Rhind's 1858 Luxor purchase, British
  Museum since 1865, unit fractions with 2/3 the lone exception, 2/n
  table for odd n from 3 to 101).
- `ncert-math7-ch2` — NCERT Class 7 Mathematics, ch. 2 "Fractions and
  Decimals" (public curriculum). Used for: FM ch. 4 lesson 4.5 — the
  canonical school sequence mirrored (multiplication of fractions as
  'of'/area reading, the reciprocal of a fraction and its product-gives-1
  property, division of fractions as multiply-by-the-reciprocal),
  web-checked 2026-11-04 (search: class-7 ch. 2 section sequence 2.1
  Multiplication of Fractions / 2.2 Division of Fractions; confirmed the
  class-6 Ganita Prakash fraction chapter stops at addition/subtraction,
  so × ÷ of fractions is class-7 material); exposition original — the
  re-cutting ruler proof of the multiplying rule, the bd-ruler measuring
  proof of the division theorem, the scaling/two-frauds cautions, the
  cross-cancellation licence and the HCF/LCM-of-fractions measuring
  treatment are the book's own derivations (the shortcut formulas were
  banked from Khattar ch. 2's rules, re-derived and verified here). Re-used for FM ch. 5 lesson 5.3 (run 23): §2.3 "Multiplication of
  Decimal Numbers" + §2.4 "Division of Decimal Numbers" (by 10/100/1000,
  by a whole number, by another decimal) — section sequence web-checked
  2026-11-04 (Khan Academy's NCERT-class-7 skill map confirmed 2.3
  multiplication incl. × 10/100/1000 and the standard-algorithm items,
  2.4 division incl. hundredths); exposition original — the fraction
  reading proof of the places-add law, the point-hops ladder, the
  quotient-point-rides-the-dividend convention and the clearing law are
  the book's own derivations.
- `ncert-math6-ch8` — NCERT Class 6 Mathematics, ch. 8 "Decimals"
  (old-edition canon; public curriculum). Used for: FM ch. 5 lesson 5.1 —
  the canonical school-level sequence mirrored (tenths, hundredths,
  thousandths as successive ten-fold re-cuts; the place-value table
  extended right of the ones; representing decimals; comparing decimals),
  web-checked 2026-11-04 (published chapter outlines confirm the section
  order and the money/length/mass application set); exposition original —
  the place-value mirror framing, the atom test, the trailing-zero
  licence and the comparison decoys are the book's own derivations.
- `ncert-math7-ch3` — NCERT Class 7 Mathematics (Ganita Prakash), ch. 3
  "A Peek Beyond the Point" (public curriculum). Used for: FM ch. 5
  lesson 5.1 — the current-edition canonical sequence mirrored and
  web-checked 2026-11-04 (3.1 The Need for Smaller Units → 3.2 A Tenth
  Part → 3.3 A Hundredth Part → 3.4 Decimal Place Value → 3.5 Units of
  Measurement → 3.6 Locating and Comparing Decimals → 3.7 Addition and
  Subtraction of Decimals; 5.1 covers the front half and leaves 3.7 for
  lesson 5.3); exposition original — the screw/workshop opening scene,
  the mirror symmetry, the zoom figure and the atom test are the book's
  own derivations.
- `ncert-math7-ch8` — NCERT Class 7 Mathematics, ch. 8 "Comparing
  Quantities" (old-edition canon; public curriculum). Used for: FM ch. 5
  lesson 5.4 — the canonical percent introduction mirrored (percent as
  "another way of comparing quantities" with denominator fixed at 100;
  interpreting percentages; converting fractions/decimals to percentages
  and back; using percentages in word problems), web-checked 2026-11-04
  (published chapter outlines confirm §8.3 "Percentage — Another Way of
  Comparing Quantities" (8.3.1 meaning of percentage) and §8.4 "Use of
  Percentages" as the percent-teaching sections); exposition original —
  the 100-square figure, the two-hop law derivation, the benchmark ladder
  and the halving chain, the commutativity gem and the unitary-method
  return are the book's own derivations. FM ch. 6 lesson 6.1 extends this
  key: §§8.1–8.2 ("Introduction" — the ratio between quantities in the
  same units; "Equivalent Ratios" — same value of the ratio checked by
  reducing both) web-checked 2026-11-04 as the canonical ratio/equivalent-
  ratio sequence the chapter opens from.
- `ncert-math8-ch8` — NCERT Class 8 Mathematics, ch. 8 "Comparing
  Quantities" (old-edition canon; public curriculum). Used for: FM ch. 5
  lesson 5.5 — the canonical change/discount/interest canon mirrored
  (§8.2 "Finding the Increase or Decrease Per cent" — the change judged
  on the original; §8.3 "Finding Discounts" — the discount as a
  reduction on the marked price; §8.4 "Prices Related to Buying and
  Selling (Profit and Loss)" — profit/loss percent on the cost price),
  web-checked 2026-11-04 (published chapter outlines confirm the section
  sequence 8.1 Recalling Ratios and Percentages → 8.2 Increase/Decrease
  Per cent → 8.3 Finding Discounts (8.3.1 Estimation in Percentages) →
  8.4 Prices Related to Buying and Selling); exposition original — the
  factor law derivation, the round-trip r²/100 % law, the multiplier
  law (1.40 × 0.80 = 1.12) and the two-lane figure are the book's own
  derivations.
- `ncert-math9-ch1` — NCERT Class 9 Mathematics, ch. 1 "Number Systems"
  (public curriculum). Used for: FM ch. 5 lesson 5.2 — the canonical
  classification of rational decimal expansions as terminating or
  non-terminating recurring (web-checked 2026-11-04), the long-division
  construction of decimal expansions, and the recurring-to-fraction
  conversion; the atom-test criterion (terminating iff the denominator in
  lowest terms is 2^m × 5^n) is the same theorem in its class-9 dress;
  exposition original — the step machine, the remainder carousel, the
  dresses theorem and the head-length theorem are the book's own
  derivations.

- `ncert-math6-ch4` — NCERT Class 6 Mathematics, ch. 4 "Basic Geometrical
  Ideas" (public curriculum). Used for: FM ch. 8 lesson 8.1 — the
  canonical point/line-segment/line/ray charter mirrored (the ideal
  objects, naming by capital letters, the segment as the measurable
  piece, the ray's one endpoint, parallel lines as the never-meeting
  pair), web-checked 2026-11-05 (run 37): chapter number, title and
  section span (point, line segment, line, ray, intersecting and
  parallel lines) verified against published chapter listings; the
  two-point rule, the at-most-one-common-point cap, the counting law
  n(n−1)/2 and every figure are the book's own derivations; no textbook
  question reproduced.
- `ncert-math6-gp-ch2` — NCERT Ganita Prakash Class 6 Mathematics, ch. 2
  "Lines and Angles" (fegp102). Used for: FM ch. 8 lesson 8.2 — the
  canonical angle charter mirrored (the angle as two rays with a common
  endpoint, vertex and arms, measuring in degrees, the protractor and
  its two scales, the acute/right/obtuse/straight/reflex families),
  web-checked 2026-11-05 (run 38): chapter number, title and section
  span (points/lines/rays/segments, angles, types of angles, measuring
  with a protractor) verified against the published NCERT PDF listing
  (fegp102.pdf); the degree ledger, the supp − comp identity, the clock
  speeds and every figure are the book's own derivations; no textbook
  question reproduced.
- `ncert-math9-ch5` — NCERT Class 9 Mathematics, ch. 5 "Introduction to
  Euclid's Geometry" (public curriculum). Used for: FM ch. 8 lesson 8.1
  — the Euclid grounding mirrored (the Elements' definitions as the
  origin of the point/line/plane vocabulary, the postulates as the
  standing assumptions, postulate 1 as the two-point rule's birth
  dress), web-checked 2026-11-05 (run 37): chapter number and title
  verified against the NCERT chapter listing and exemplar PDF; the
  Elements facts (13 books, 465 propositions, Book I's 23 definitions +
  5 postulates + 5 common notions) verified against David Joyce's Clark
  University edition of Book I and the standard Elements overview; the
  historical callout paraphrases, never reproduces.

- `ncert-math6-ch10` — NCERT Ganita Prakash Class 6 Mathematics, ch. 10
  "The Other Side of Zero" (fegp110). Used for: FM ch. 7 lesson 7.1 —
  the canonical negative-numbers charter mirrored (the other side of
  the number line, lift/floor and temperature readings as signed
  quantities), web-checked 2026-11-04 (run 33): chapter number and
  title verified against the NCERT PDF listing and solution guides; the
  lesson's own instances (Vostok, Everest/Dead Sea, the lift, the
  underground mall, the Delhi–New York clocks) are original — no
  textbook question reproduced.
- `ncert-math7-p2-ch2` — NCERT Ganita Prakash Class 7 Mathematics,
  part 2, ch. 2 "Operations with Integers" (gegp202). Used for: FM ch. 7
  as the operations sequel for lessons 7.2–7.3, web-checked 2026-11-04
  (run 33) against the class-7 Ganita Prakash chapter list (part 1
  chs. 1–8; part 2 opens with Geometric Twins, Operations with Integers
  second); cited in 7.1's sources as the promised continuation. Run 34
  (2026-11-04, lesson 7.2) used it as the primary reference: the
  chapter's movement/token model ("final position = first movement +
  second movement") is the lesson's walk model retold in its own words —
  no content reproduced. Run 35 (2026-11-04, lesson 7.3) used it as the
  primary reference again: the chapter's token-model products, sign
  rules and the three laws (commutative, associative, distributive) are
  re-derived in the lesson's own repeated-walk/staircase presentation —
  no content reproduced.

- `ncert-math7-gp-ch5` — NCERT Ganita Prakash Class 7 Mathematics, ch. 5
  "Parallel and Intersecting Lines" (gegp105). Used for: FM ch. 8 lesson
  8.3 — the canonical transversal charter mirrored (the transversal
  crossing two lines at distinct points, the eight angles formed, the
  corresponding/alternate/co-interior pair families, the parallel tests,
  "corresponding angles formed by a transversal intersecting a pair of
  parallel lines are always equal"), web-checked 2026-11-05 (run 39):
  chapter number, title and content span verified against the published
  NCERT PDF listing (gegp105.pdf) and solution-guide summaries; the
  derivations (linear pair, vertically opposite, the test chains), the
  pair census and both figures are the book's own work; no textbook
  question reproduced.
- `ncert-math9-ch6` — NCERT Class 9 Mathematics, ch. 6 "Lines and Angles"
  (public curriculum). Used for: FM ch. 8 lesson 8.3 — the axiom-style
  treatment mirrored (the linear-pair axiom; the corresponding-angles
  axiom "if two parallel lines are cut by a transversal, each pair of
  corresponding angles is equal" and its converse as the standing
  assumptions from which alternate/co-interior facts are derived),
  web-checked 2026-11-05 (run 39): chapter number, title and the
  axiom-sequence shape verified against published chapter listings and
  notes; the lesson's derivations, sweeps and figures are the book's
  own; no textbook question reproduced.

## Per-subject ledger

| Subject | Books identified | Downloaded (MB) | Used for | Local copies deleted | Book status |
|---|---|---|---|---|---|
| mathematics | Khattar QA 4e (+ NCERT web outlines ch. 1 + ch. 2 + ch. 3 + ch. 7 + class-7 ch. 2 + class-6 ch. 8 + class-7 ch. 3 + class-7 ch. 8 §§8.3–8.6 + class-8 ch. 8 §§8.2–8.4 + class-9 ch. 1 + class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2; CBSE-aligned BODMAS web-check) | 33.9 × 7 (units 1–3 re-downloads + run 12 for ch. 4 fraction material) | FM ch. 1 (unit 1): lessons 1.2, 1.3 · FM ch. 2 (unit 2): lessons 2.1–2.5 (2.5 studied Khattar ch. 4 BODMAS) · FM ch. 3 (unit 3): lessons 3.1–3.5 (Khattar ch. 1 divisibility/primes + ch. 2 HCF/LCM incl. Illustration 14) · FM ch. 4 (unit 4): lesson 4.1 (Khattar ch. 1 fraction exam items mined — SSC CGL Tier-II 2018 + SSC MTS 2017 comparisons cited in the exam callout; ch. 2's HCF/LCM-of-fractions rules banked for 4.5), lessons 4.2–4.4 (no downloads; NCERT web checks), lesson 4.5 (no downloads; NCERT class-7 ch. 2 web-checked — new citation key; Khattar's banked fraction rules cashed) · FM ch. 5 (unit 5): lesson 5.1 (no downloads; NCERT class-7 ch. 3 + class-6 ch. 8 web-checked — two new citation keys; Khattar decimal-fraction exam items), lesson 5.2 (no downloads; NCERT class-9 ch. 1 + class-6 ch. 8 web-checked — new citation key ncert-math9-ch1; Khattar recurring-conversion shortcuts and comparison traps), lesson 5.3 (no downloads; NCERT class-6 ch. 8 + class-7 ch. 2 §§2.3–2.4 web-checked; Khattar point-hop family), lesson 5.4 (no downloads; NCERT class-7 ch. 8 §§8.3–8.4 web-checked — new citation key ncert-math7-ch8; Khattar percent conversion items), lesson 5.5 (no downloads; NCERT class-7 ch. 8 §§8.5–8.6 + class-8 ch. 8 §§8.2–8.4 web-checked — new citation key ncert-math8-ch8; Khattar percentage/profit-loss exam staples) · FM ch. 6 (unit 6): lesson 6.1 (no downloads; NCERT class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2 web-checked — new citation key ncert-math6-ch12, ncert-math7-ch8 extended; Khattar ratio exam staples), lesson 6.2 (no downloads; NCERT class-6 ch. 12 Ex. 12.3 — the unitary method — web-checked, key ncert-math6-ch12 extended to Ex. 12.3; NCERT class-7 science "Motion and Time" web-checked — new citation key ncert-sci7-motion; Khattar speed/unitary-method exam staples), lesson 6.3 (no downloads; NCERT class-6 ch. 12 §12.2 "Proportion" + Ex. 12.2 web-checked, key ncert-math6-ch12 extended to §12.2/Ex. 12.2; Khattar ratio-proportion exam staples) · FM ch. 7 (unit 7): lessons 7.1–7.4 (no downloads; NCERT Ganita Prakash class-6 ch. 10 + class-7 part-2 ch. 2 web-checked — new keys ncert-math6-ch10, ncert-math7-p2-ch2; Brahmagupta/Argand/Weierstrass history web-checked; Khattar integer exam staples) · FM ch. 8 (unit 8): lesson 8.1 (no downloads; NCERT class-6 ch. 4 + class-9 ch. 5 web-checked — new keys ncert-math6-ch4, ncert-math9-ch5; Euclid Elements facts web-checked against Joyce's Clark U. edition), lesson 8.2 (no downloads; NCERT Ganita Prakash class-6 ch. 2 "Lines and Angles" web-checked — new key ncert-math6-gp-ch2; key ncert-math6-ch4 extended toward §4.9 angles; Huddart 1801 protractor per Britannica; Khattar clock/angle staples), lesson 8.3 (no downloads; NCERT Ganita Prakash class-7 ch. 5 "Parallel and Intersecting Lines" + class-9 ch. 6 "Lines and Angles" web-checked — new keys ncert-math7-gp-ch5, ncert-math9-ch6; Euclid Postulate 5 + I.27/I.29 re-checked against Joyce's Clark U. edition; Playfair 1795/Ludlam 1785/Proclus + Lobachevsky–Bolyai history web-checked; Khattar transversal/angle-chase staples) | yes — after each unit's verification (run 12 deleted its working copies after E2E, per the per-lesson pattern) | foundation-mathematics in-progress (**7/11 chapters complete; ch. 8 open 3/5 at 8.3, run 39**) |
| physics | surveyed (Halliday/Resnick, Young, Feynman, Griffiths…) | 0 | — | — | not started |
| chemistry | surveyed (Atkins, Zumdahl, Clayden, JD Lee…) | 0 | — | — | not started |
| computer-science | surveyed (CLRS, Sedgewick, OS Concepts, CS:APP…) | 0 | — | — | not started |
| engineering | surveyed (Goldstein, Mano, Sedra, Microelectronic Circuits…) | 0 | — | — | not started |
| medical-sciences | none in collection | 0 | — | — | not started |
| biology | surveyed (Campbell, Lehninger…) | 0 | — | — | not started |
| economics-commerce | surveyed (Mankiw…) | 0 | — | — | not started |
| humanities | surveyed (Spectrum Modern India, Laxmikanth, Russell…) | 0 | — | — | not started |
| languages | surveyed (Murphy, Genki, Hammer's German…) | 0 | — | — | not started |
| arts-music | none in collection | 0 | — | — | not started |

## Free-space checkpoint

- 2026-11-04 (mathematics, unit 5, lesson 5.4): no downloads — NCERT
  class-7 ch. 8 "Comparing Quantities" §§8.3–8.4 percent coverage
  web-checked (sanctioned fallback; one new citation key added:
  ncert-math7-ch8); zero temporary-references footprint this lesson.
- 2026-11-04 (mathematics, unit 5, lesson 5.3): no downloads — NCERT
  class-6 ch. 8 addition/subtraction-by-alignment exercises and class-7
  ch. 2 §§2.3–2.4 multiplication/division-of-decimals section sequences
  web-checked (sanctioned fallback; both keys already in the ledger —
  ncert-math6-ch8, ncert-math7-ch2 extended, no new keys); zero
  temporary-references footprint this lesson (the gitignored survey was
  rebuilt once after the recycle solely to regenerate
  WORK_INVENTORY.json — content unchanged, 89 entries).
- 2026-11-04 (mathematics, unit 5, lesson 5.2): no downloads — NCERT
  class-9 ch. 1 classification of decimal expansions, class-6 ch. 8
  "Fractions as decimals" long-division coverage and Khattar's
  decimal-fraction exam patterns web-checked (sanctioned fallback); zero
  temporary-references footprint this lesson; one citation key added
  (ncert-math9-ch1).
- 2026-11-04 (mathematics, unit 5, lesson 5.1): no downloads — NCERT
  class-7 Ganita Prakash ch. 3 section sequence and old class-6 ch. 8
  coverage web-checked (sanctioned fallback); zero temporary-references
  footprint this lesson; two citation keys added (ncert-math7-ch3,
  ncert-math6-ch8).
- Working storage total: ~9.9 GB
- 2026-11-03 (mathematics, unit 1): `df -h /` → 46% used, project footprint
  `du -sh /home/z/my-project` → ~1.2 GB incl. node_modules; Khattar PDF
  (33.9 MB) downloaded to temporary-references/, chapter dumped to text for
  study, both deleted after unit verification (inventory.json retained as
  survey metadata).
- 2026-11-03 (mathematics, unit 2, lesson 2.1): sandbox recycle wiped the
  gitignored listing and working copies; re-downloaded Khattar (33.9 MB),
  dumped ch. 4 text for study, deleted after E2E verification. Only
  inventory.json retained.
- 2026-11-03 (mathematics, unit 2, lesson 2.2): no new downloads — the
  unit's Khattar ch. 4 was already surveyed in run 2 (BODMAS reserved for
  lesson 2.5) and NCERT class-6 subtraction coverage was web-checked
  (sanctioned fallback); zero temporary-references footprint this lesson.
- 2026-11-03 (mathematics, unit 2, lesson 2.3): no new downloads — same
  basis as 2.2; NCERT class-6 multiplication coverage (number-line jumps,
  property set incl. distributivity) web-checked.
- 2026-11-03 (mathematics, unit 2, lesson 2.4): no new downloads — same
  basis as 2.2/2.3 (Khattar ch. 4 already surveyed; BODMAS reserved for
  2.5); NCERT class-6 division coverage (equal sharing vs grouping,
  dividend–divisor–quotient–remainder vocabulary, the division algorithm
  a = q·b + r with 0 ≤ r < b, why division by zero is undefined)
  web-checked. The gitignored Drive survey was re-pulled after the second
  sandbox recycle via the new scripts/rebuild_drive_survey.ts (89 entries,
  4 folders, Khattar id intact — matches the original survey).
- 2026-11-03 (mathematics, unit 2, lesson 2.5): Khattar QA 4e
  re-downloaded (33.9 MB) — ch. 4 "Simplification" BODMAS section studied
  (bracket ladder, "of" rank, nested illustrations); CBSE-aligned BODMAS
  coverage + historical grounding web-checked (sanctioned fallback). The
  survey script was upgraded to persist per-file Drive ids, so this is the
  last time a re-download needed an id hunt. Working copies (PDF + text
  dump) deleted after unit-2 verification; only inventory.json retained.
- 2026-11-03 (mathematics, unit 3, lesson 3.1): third sandbox recycle
  wiped the gitignored survey; rebuilt in one step via the id-persisting
  scripts/rebuild_drive_survey.ts (89 entries, Khattar id intact).
  Khattar QA 4e re-downloaded via the persisted id (33.9 MB, 1,049 pp) —
  ch. 1 "Numbers" divisibility-test list and prime/composite/co-prime
  definitions studied; NCERT class-6 ch. 3 "Playing with Numbers"
  coverage web-checked (sanctioned fallback). Working copies (PDF + text
  dumps) deleted after the lesson's E2E verification; inventory.json
  retained.
- 2026-11-03 (mathematics, unit 3, lesson 3.3): fifth sandbox recycle wiped
  the gitignored survey; rebuilt in one step via scripts/rebuild_drive_survey.ts
  (89 entries, Khattar id intact). Khattar QA 4e re-downloaded via the
  persisted id (33.9 MB) — ch. 2 "H.C.F. and L.C.M. of Numbers" studied for
  the HCF lesson: the prime-factorisation method (common factors with lowest
  powers; illustrations 70/90 → 10, 3332/3724/4508 → 196), the division
  method (successive division ladder; 3556/3444 → 28; three-number folding
  13915/9499/2553 → 23), the HCF/GCD/GCM naming, the greatest-number
  patterns (exact division; equal remainder r known → HCF of x−r; unknown →
  HCF of pairwise differences; illustrations 148/246/623 → 12, 772/2778 →
  59, 152/277/427), co-prime pairs with a given sum (sum 8 → (1,7),(3,5)),
  and the HCF×LCM product rule noted as Lesson 3.5 material. NCERT class-6
  ch. 3 §3.8 "Highest Common Factor" coverage web-checked (sanctioned
  fallback; Exercise 3.6 uses the prime-factorisation route throughout).
  All lesson arithmetic re-verified by script (40 new checks in sections
  V–Y of scripts/verify-unit-3.ts, 192 total) BEFORE writing; exposition
  original — no Khattar text reproduced, instances recomposed. Working
  copies (PDF + text dumps) deleted after the lesson's E2E verification;
  only inventory.json retained.

- 2026-11-03 (mathematics, run 14, style study): Cengage M2/01 Set Theory
  and The Real Number System re-downloaded from the MATHS subfolder
  (persisted id; 24 MB) and OCR/vision-studied as the presentation style
  reference for the Cengage book-style reader reskin — no content reproduced;
  MATHS subfolder surveyed into temporary-references/maths-*.json. Working
  copies (PDF + page renders) deleted after verification; survey metadata
  retained.
- 2026-11-03 (mathematics, run 16, style study, owner directive "the
  solution should also be in cengage style"): the same Cengage M2/01
  re-downloaded (24 MB; MATHS root + M2 subfolder surveys rebuilt first via
  `rebuild_drive_survey.ts` + `list_drive_folder.ts` after a sandbox
  recycle) and the solution pages studied with OCR + vision: illustrations
  1.14/1.15/1.65-1.70 ("Sol." pill inline with the first line, ⇒/or/∴/
  Now,/So, tag-column chains, Case (i):/Alternative Method: bold leads,
  "Thus/Hence" plain-text conclusions) and the S.6 solutions section
  (bold question number + bold option index, hanging-indent equation
  chains, "From (1) and (2)" references, terminal ⇒/∴ answer lines, no
  boxes). Used ONLY as the presentation reference for the Cengage solution
  chain renderer — no content reproduced. Working copy (PDF + page renders)
  deleted after verification; survey metadata retained.
- 2026-11-03 (mathematics, unit 3, lesson 3.5): Khattar QA 4e re-downloaded
  via the persisted id (33.9 MB) — ch. 2 "H.C.F. and L.C.M. of Numbers"
  product-rule section studied for the unit closer: "Product of two numbers
  = L.C.M. of the numbers × H.C.F. of the numbers" with Illustration 14's
  reconstruction (HCF 63, LCM 1,260, one number 315 → other 252); the
  HCF/LCM-of-fractions shortcuts noted and deliberately left out of scope.
  NCERT class-6 ch. 3 Exercise 3.7 feasibility genre web-checked (sanctioned
  fallback; "Can two numbers have 24 as their HCF and 200 as their LCM?" —
  no, since the HCF must divide the LCM and 24 does not divide 200). All
  lesson arithmetic re-verified by script (33 new checks in section AA of
  scripts/verify-unit-3.ts, 260 total) BEFORE writing; exposition original —
  no Khattar text reproduced, instances recomposed or canon forms
  re-derived. Working copies (PDF + text dump) deleted after the lesson's
  E2E verification; only inventory.json retained.
- 2026-11-04 (mathematics, unit 4, lesson 4.4, run 19): no new downloads —
  zero temporary-references footprint. NCERT class-6 ch. 7
  addition/subtraction coverage (like denominators by counting, unlike via
  common denominators/LCM, mixed numbers) web-checked against the current
  Ganita Prakash exercise sequence and syllabus outlines (sanctioned
  fallback); the `ncert-math6-ch7` citation extended. All lesson arithmetic
  re-verified by script (62 new checks in sections AA–AH of
  scripts/verify-unit-4.ts, 261 total) BEFORE writing; exposition original —
  the greedy-split procedure and the straight-across fraud theorem are the
  book's own derivations, instances recomposed.
- 2026-11-04 (mathematics, unit 4, lesson 4.5, run 20): no new downloads —
  zero temporary-references footprint. NCERT class-7 ch. 2 multiplication/
  division-of-fractions coverage (multiplication as 'of', the reciprocal,
  division via the reciprocal) web-checked as the canonical school
  sequence (sanctioned fallback); new `ncert-math7-ch2` citation key added.
  Khattar ch. 2's HCF/LCM-of-fractions rules (banked since run 12) cashed —
  formulas re-derived from the measuring definition and script-verified
  (maximality/minimality sweeps + the product-rule check); no Khattar text
  reproduced. All lesson arithmetic re-verified by script (69 new checks in
  sections AI–AN of scripts/verify-unit-4.ts, 330 total) BEFORE writing;
  exposition original — the re-cutting ruler proof, the bd-ruler measuring
  proof, the scaling/two-frauds cautions and the cross-cancellation licence
  are the book's own derivations, instances recomposed.
**Run 25 (2026-11-04) — FM lesson 5.5 "Percentage Change, Discounts and
Simple Interest" (unit 5 closes):** web-checked only, zero downloads.
NCERT class-7 ch. 8 §§8.5–8.6 ("Prices Related to an Item or Buying and
Selling — Profit or Loss", "Charge Given on Borrowed Money or Simple
Interest") + NCERT class-8 ch. 8 §§8.2–8.4 ("Finding the Increase or
Decrease Per cent", "Finding Discounts", "Prices Related to Buying and
Selling (Profit and Loss)") — the canonical change/discount/interest
sequence (sanctioned fallback); new `ncert-math8-ch8` citation key added;
Khattar percentage/profit-loss exam staples mined for the exam corner
(no text reproduced). All lesson arithmetic re-verified by script (61 new
checks in sections BT–CC of scripts/verify-unit-5.ts, 455 total) BEFORE
writing; exposition original — the factor-law derivation, the
round-trip r²/100 % law, the multiplier law and the two-lane figure are
the book's own derivations.

## 2026-11-04 — Run 34 (FM 7.2 + voice polish 2.2): zero downloads

Lesson 7.2 "Adding and Subtracting Integers" was verified against the already-persisted citation set (`ncert-math7-p2-ch2` primary — the movement model; `ncert-math6-ch10` and `khattar-qa-4e` carried) via web-check only — no new reference files downloaded, no working copies to delete. History grounded by web-check: MacTutor's Brahmagupta biography (the *Brahmasphutasiddhanta*'s 628 CE subtraction verses — a debt minus zero is a debt; a debt subtracted from zero is a fortune; a fortune subtracted from zero is a debt — paraphrased in the historical callout, derived on the line in the lesson's own L6 exercise; the Chinese rod board's colour-swap subtraction). Exam-corner shapes (signed chains, subtract-a-negative, missing addend, successor/predecessor, temperature/balance narrations in SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. The gitignored Drive survey was rebuilt after the sandbox recycle for the WORK_INVENTORY regeneration (metadata only). Voice polish 2.2 reused only that lesson's own numbers (7, 3, 4; the inverse sentence generically).

## 2026-11-04 — Run 32 (FM 6.5 + push debt): zero downloads

Lesson 6.5 "Scaling: Maps, Models and Recipes" was verified against the already-persisted citation set via web-check only: ncert-math8-ch13 extended to **Example 1 (the Rashmi road map, 1 cm : 18 km)** and the chapter's own scale-dress statement (1 cm : 8 km = 1 : 8,00,000) — the lesson cites the dress (its atlas wears 1 cm : 18 km) but reproduces no question, and the lesson's numbers are its own divisions (72/18, 90/18, 45/18); ncert-math6-ch12, ncert-math7-ch8 and khattar-qa-4e carried. Exam-corner appearances grounded by web-check: RRB NTPC CBT-I 2021 (1 cm : 9 km item) and MP Police Constable 2025 (1 cm : 5 km item) — shapes cited, no question reproduced. No new reference files downloaded, no working copies to delete. The push-debt clearing (five commits) and the ship commit pushed in the same run; remote verified.

## 2026-11-04 — Run 30 (FM 6.4): zero downloads

Lesson 6.4 was verified against the already-persisted citation set (ncert-math8-ch13 §§13.1–13.2 + Ex. 13.1/13.2, ncert-math6-ch12, ncert-math7-ch8, khattar-qa-4e) via web-check only — no new reference files downloaded, no working copies to delete. The gitignored Drive survey (temporary-references/inventory.json, 89 entries) was rebuilt after the sandbox recycle for the WORK_INVENTORY regeneration — survey metadata only, not a content download.

## 2026-11-04 — Run 33 (FM 7.1): zero downloads

Lesson 7.1 "Negative Numbers and Why They Exist" was verified against two NEW citation keys added this run — `ncert-math6-ch10` (Ganita Prakash class-6 ch. 10 "The Other Side of Zero", the canonical negative-number charter) and `ncert-math7-p2-ch2` (Ganita Prakash class-7 part-2 ch. 2 "Operations with Integers", the operations sequel cited as the promised continuation) — plus the carried `khattar-qa-4e`. Both chapter identities web-checked (sanctioned fallback; fegp110/gegp202 PDF listings + solution-guide listings); no content reproduced. History grounded by web-check: NRICH "The History of Negative Numbers" (Chinese red/black counting rods ~200 BCE; Maseres 1758 "darken the very whole doctrines of the equations"; 19th-century acceptance via De Morgan/Peacock), MacTutor's Brahmagupta biography (Brahmasphutasiddhanta 628 CE, fortunes/debts). Figures grounded: Everest 8848.86 m (2020 Nepal–China joint survey), the Dead Sea surface 439.78 m below sea level as of 2025 (falling ~1 m/yr), Vostok −89.2 °C (21 July 1983), Phalodi 51.0 °C (19 May 2016). Exam-corner shapes grounded by web-check: sign-fill items (−40 □ +4) in SSC CHSL / RRB NTPC CBT-I banks, greatest-negative-integer and additive-inverse match-the-column items — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete.

## 2026-11-04 — Run 35 (FM 7.3 + voice polish 2.3): zero downloads

Lesson 7.3 "Multiplying Integers and the Sign Rules" was verified against the already-persisted citation set (`ncert-math7-p2-ch2` primary — the sign rules and the three laws; `ncert-math6-ch10` and `khattar-qa-4e` carried) via web-check only — no new reference files downloaded, no working copies to delete. Web-checks: the class-7 Ganita Prakash part-2 ch. 2 identity re-confirmed (gegp202; the chapter teaches multiplication before division via the token/repeated-addition model with the sign rules and the commutative/associative/distributive properties — the lesson derives the same rules from its own walk model and staircase, no content reproduced). History grounded by web-check: Brahmagupta's *Brahmasphutasiddhanta* 628 CE multiplication verses (fortune × fortune = fortune; fortune × debt = debt; debt × debt = fortune — surviving through Colebrooke's 1817 Sanscrit translation, verified against the archive.org/hist-math text listings; paraphrased in the historical callout, derived twice in the lesson's own staircase and distributive arguments). Exam-corner shapes (straight products, three-factor parity chains, distributive simplifications like (−6)×47 + (−6)×53, waived-fine narrations in SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. Voice polish 2.3 reused only that lesson's own numbers (4, 6, 24; the definition sentence generic in $a$ and $b$).

## 2026-11-05 — Run 39 (FM 8.3 + voice polish 3.4): zero downloads

Lesson 8.3 "Parallel Lines and Transversals" was verified against two NEW citation keys added this run — `ncert-math7-gp-ch5` (Ganita Prakash class-7 ch. 5 "Parallel and Intersecting Lines", gegp105: the canonical transversal/eight-angle/pair-families charter) and `ncert-math9-ch6` (class-9 ch. 6 "Lines and Angles": the linear-pair + corresponding-angles axiom treatment) — plus the carried `ncert-math6-ch4` (parallel dress from 8.1) and `khattar-qa-4e`. Both chapter identities web-checked (sanctioned fallback; the NCERT PDF listing + published chapter listings/notes); no content reproduced. History grounded by web-check: David Joyce's Clark University edition of Euclid's Elements Book I (Postulate 5's full interior-angles dress quoted; Proposition I.27 proved without the postulate; I.29 the first use of Postulate 5 — the same edition cited in runs 37/38); Proclus's statement of the Playfair form in his commentary on I.31 (c. 450 AD); William Ludlam 1785; John Playfair's 1795 Elements of Geometry; Lobachevsky's 1826 Kazan lecture and 1829–30 publication, Bolyai's 1832 appendix, Gauss's unpublished exploration — all paraphrased in the historical callout and the Playfair Note, never reproduced. Exam-corner shapes (read-all-eight from one number, find-x co-interior algebra, corresponding-pair parallel verdicts, co-interior ratio items, three-line census counts in SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. Voice polish 3.4 reused only lesson 3.4's own numbers (12, 18, 36, 96, 48, 1 — all already in the polished callout; zero new numerals).

## 2026-11-05 — Run 38 (FM 8.2 + voice polish 3.3): zero downloads

Lesson 8.2 "Angles and Their Measurement" was verified against one NEW citation key added this run — `ncert-math6-gp-ch2` (Ganita Prakash class-6 ch. 2 "Lines and Angles", fegp102: the canonical angle/protractor/types charter) — plus the carried `ncert-math6-ch4` (§4.9 angles, extended) and `khattar-qa-4e`. The chapter identity was web-checked (sanctioned fallback; the NCERT PDF listing); no content reproduced. History grounded by web-check: David Joyce's Clark University edition of Euclid's Elements Book I (Definition 8 the inclination dress; Definition 10 the right angle built from equal adjacent angles; Definitions 11–12 obtuse/acute comparatively; Postulate 4 all right angles equal) — the same edition already cited in run 37; the Babylonian base-60 degree with the honestly-unsettled ≈365-day/1°-per-day story (multiple sources agree the exact reason is not known); Joseph Huddart's 1801 advanced protractor for plotting a ship's position on navigational charts (Britannica); the sexagesimal minutes/seconds of arc. Exam-corner shapes (five-way classification items, complement/supplement subtractions, one-linear-equation narrations, clock-angle items at whole and half hours, ray-census counts in SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. Voice polish 3.3 reused only lesson 3.3's own numbers (48, 60, 12, 1 — all already in the polished callout; zero new numerals).

## 2026-11-05 — Run 37 (FM 8.1 + voice polish 3.2): zero downloads

Lesson 8.1 "Points, Lines and Planes" was verified against two NEW citation keys added this run — `ncert-math6-ch4` (class-6 ch. 4 "Basic Geometrical Ideas", the canonical point/segment/line/ray/parallel charter) and `ncert-math9-ch5` (class-9 ch. 5 "Introduction to Euclid's Geometry", the Euclid grounding for the historical callout) — plus the carried `khattar-qa-4e`. Both chapter identities web-checked (sanctioned fallback; published chapter listings + the NCERT exemplar PDF for class-9 ch. 5); no content reproduced. History grounded by web-check: David Joyce's Clark University edition of Euclid's Elements Book I (23 definitions incl. "a point is that which has no part" and "a line is breadthless length", Definition 23's parallel dress, Postulate 1 "to draw a straight line from any point to any point", Postulate 2 the endless production) and the standard Elements overview (13 books, c. 300 BCE; the per-book proposition counts 48+14+37+16+25+33+39+27+36+115+39+18+18 summing to 465, script-verified); Hilbert's 1899 *Grundlagen der Geometrie* (incidence axioms stated outright) — all paraphrased in the historical callout, never reproduced. Exam-corner shapes (count segments/lines among n points with and without a collinearity promise, naming/notation items, intersecting-parallel-concurrent classification, shortest-path reasoning in SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. Voice polish 3.2 reused only lesson 3.2's own numbers (47, 48, 4, 1, 2 — all already in the polished callout; zero new numerals).

## 2026-11-05 — Run 36 (FM 7.4 + voice polish 3.1): zero downloads

Lesson 7.4 "Absolute Value as Distance" was verified against the already-persisted citation set (`ncert-math7-p2-ch2`, `ncert-math6-ch10`, `khattar-qa-4e` carried from 7.1–7.3) via web-check only — no new reference files downloaded, no working copies to delete. History grounded by web-check: Jean-Robert Argand's 1806 naming of the *modulus* (magnitude of a complex number, direction discarded) and Karl Weierstrass's first use of the two-bar notation $|x|$ in his 1841 essay *Zur Theorie der Potenzreihen* — both recorded in MacTutor's "Earliest Uses of Various Mathematical Symbols" index (functionality/abs page), paraphrased in the historical callout, never reproduced. Exam-corner shapes (straight evaluations and bars-versus-minus contrasts in SSC CHSL/MTS banks; two-answer equations $|x| = k$ in RRB NTPC CBT-I and banking clerical banks; gap narrations — temperature swings, storey counts, elevation differences — as the distance formula in disguise) web-checked against the banks' published patterns; no question reproduced. Voice polish 3.1 reused only lesson 3.1's own numbers (6, 48, 8, the ten factors of 48; the definition sentence generic in $n$ and $d$).

## 2026-11-05 — Run 40 (FM 8.4 + voice polish 3.5): zero downloads

Lesson 8.4 "Triangles and the Angle Sum" was verified against one NEW citation key added this run — `ncert-math7-ch6` (class-7 ch. 6 "The Triangle and Its Properties": the exterior-angle property and the angle-sum property sections; web-checked via published chapter/notes listings) — plus the carried `ncert-math6-ch4` (§4.11 "Triangles": the three-sided charter, sides/vertices/angles, interior-exterior) and `khattar-qa-4e` (angle-chase staples). The chapter identity was web-checked (sanctioned fallback); no content reproduced. History grounded by web-check: David Joyce's Clark University edition of Euclid's Elements Book I — Proposition I.32's full two-part statement ("the exterior angle equals the sum of the two interior and opposite angles, and the sum of the three interior angles … equals two right angles") and its proof machinery (I.31 the parallel through a point — drawn through C in Euclid's picture, through A in ours; I.29 the equal alternates; I.13 the two-right-angles-on-a-line) — the same edition cited in runs 37–39; Proclus's two corollaries to I.32 (the (n−2)×180° interior sum of a convex rectilinear figure; the exterior angles totalling four right angles); the pons asinorum nickname for I.5. The Gauss mountain-triangle story web-checked and told honestly: the Brocken–Hohehagen–Inselsberg triangle was measured in the Hanover survey (1818–1832), but Buhler's Gauss biography concludes the space-testing motive is "as far as we know, a myth" (mathpages' summary of Buhler; Breitenberger 1984, "Gauss's Geodesy and the Axiom of Parallels", the scholarly treatment; Miller 1972 / Goe 1974 the earlier debate) — paraphrased in the historical callout, never reproduced. The spherical octant triangle (three right angles, 270° > 180°) was computed on the unit sphere by tangent projection inside verify-unit-8.ts (AN5); the hyperbolic defect stated qualitatively. Exam-corner shapes (third-angle-in-5-seconds, ratio-of-angles parts engines, isosceles apex/base swaps, exterior-angle chases, right-triangle complements, largest-side existence checks in SSC CGL/CHSL, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete. Voice polish 3.5 reused only lesson 3.5's own numbers (12, 18, 6, 36, 216, 48, 1,440, 69,120, 96, 720 — all already in the polished callout; zero new numerals).
