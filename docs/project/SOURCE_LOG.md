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

## Book research phases

- **Book #2 — Arithmetic and Number Systems (Mathematics shelf, promoted
  2026-11-05, run 48):** research phase COMPLETE — reference survey +
  syllabus audit + full chapter plan (10 chapters / 34 planned lessons),
  and the book promoted to `src/data/library/books/mathematics/arithmetic-
  number-systems/` with `status: 'planned'`. No downloads (survey-only):
  the relevant Drive references were already identified and persisted —
  Khattar QA 4e ch. 1 "Numbers" (file id in the survey since run 6) for
  the competitive-exam arithmetic scope, and the Cengage M2/01 "Set Theory
  and the Real Number System" module (already style-studied run 14) for
  the number-systems bridge. Syllabus audit via the sanctioned internet
  fallback: (a) competitive-exam number-system scope (CAT/IPMAT-level
  syllabi — divisibility, HCF×LCM product relation, remainders, unit-digit
  cyclicity, factorial trailing zeros, base conversion + arithmetic in
  other bases); (b) university proof-transition scope (Beck & Geoghegan,
  *The Art of Proof*: ℕ with induction/recursion → ℤ → ℚ → ℝ as "our
  subject is number systems"); (c) historical numeration (OpenStax
  *Contemporary Mathematics* §4.2 — Babylonian/Mayan/Roman → Hindu–Arabic);
  (d) machine representation (Cambridge IGCSE CS 0478 §1.1 — binary/hex/
  two's complement; deep coverage left to the CS shelf); (e) the school
  canon (NCERT class 6 ch. 1 + class 8 ch. 16 "Playing with Numbers").
  Per-chapter mapping in the book file header. Authoring starts at ch. 1
  (run 49; two lessons per run, owner directive 2026-11-05).

## Citation keys (used by lesson `sources` fields)

- `ncert-math6-ch11` — NCERT Class 6 Mathematics, ch. 11 "Algebra".
  Used for: FM ch. 11 lessons 11.2/11.3 — the matchstick-patterns charter
  mirrored (Ex. 11.1's "find the rule which gives the number of matchsticks"
  family, the letter-number dress of a pattern's rule, variables as the
  generalisation of patterns), web-checked 2026-11-05 (run 47): chapter
  number, title and the matchstick-pattern exercises verified against the
  published chapter listings and solution guides; no content reproduced.

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
- `ncert-math7-ch4` — NCERT Class 7 Mathematics, ch. 4 "Simple Equations".
  Used for: FM ch. 11 lesson 11.3 — the balance-method charter mirrored
  (Ex. 4.2's discipline of performing the same operation on both sides, the
  equation-as-sentence reading, the word-problem translation dress),
  web-checked 2026-11-05 (run 47): chapter identity and the balancing-method
  exercise verified against published listings and solution guides; no
  content reproduced.

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

- `ncert-math7-gp-ch4` — NCERT Ganita Prakash Class 7 Mathematics, ch. 4
  "Expressions using Letter-Numbers" (gegp104). Used for: FM ch. 11 lesson
  11.2 — the letter-number charter mirrored (the notion of letter-numbers,
  the matchstick L-patterns, expressions and formulas, substitution into
  expressions), web-checked 2026-11-05 (run 47): chapter number, title and
  content span verified against the published gegp104 PDF listing and
  solution-guide summaries; no content reproduced.

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
- `ncert-math6-gp-ch6` — NCERT Ganita Prakash Class 6 Mathematics, ch. 6
  "Perimeter and Area" (fegp106). Used for: FM ch. 8 lesson 8.5 — the
  canonical perimeter/area charter mirrored (the perimeter of a polygon as
  the sum of its sides; square 4 × side, rectangle 2(l + b); area by tiling
  with unit squares, area of a rectangle = l × b), web-checked 2026-11-05
  (run 41): chapter number, title and content span verified against the
  published NCERT listing (evidyarthi mirror of the Ganit Prakash ch. 6 PDF
  + Vedantu/odinnclasses solution-guide summaries); the lesson's derivations
  (the walk factorisation, the tile rows × columns), its figures and every
  number are the book's own work; no textbook question reproduced.
- `ncert-math7-ch11` — NCERT Class 7 Mathematics, ch. 11 "Perimeter and
  Area". Used for: FM ch. 8 lesson 8.5 — the mensuration sequel mirrored
  (triangles as parts of rectangles → area = ½ × base × height; squares and
  rectangles; the circumference of a circle with π the constant C/d ratio;
  the area of a circle πr²; 1 hectare = 10,000 m²), web-checked 2026-11-05
  (run 41): chapter number, title, four-exercise structure and formula set
  verified against the published chapter listing and the class-7 NCERT
  Exemplar chapter "Perimeter and Area" (gemp109: "Perimeter of a regular
  polygon = number of sides × length of one side", "Perimeter of a
  rectangle = 2(l + b)", the π = C/d constancy and πr²); the two-copy
  triangle derivation, the altitude-split cancellation, the sector
  rearrangement, all sweeps and all three figures are the book's own;
  no textbook question reproduced.
- `ncert-sci6-curiosity-ch5` — NCERT "Curiosity" Class 6 Science, ch. 5
  "Measurement of Length and Motion" (fecu105). Used for: FM ch. 9 lesson
  9.1 — the canonical non-standard-units charter mirrored (handspan,
  cubit, foot as body units that differ person to person, so different
  measurers get different counts for the same object; the need for
  standard units; the shopkeeper's metal measuring rod vs the tailor's
  flexible tape; the metre as the SI unit of length), web-checked
  2026-11-05 (run 42): chapter number, title and content span verified
  against the published NCERT PDF listing (fecu105) plus published
  solution-guide summaries; the lesson's swap-law derivation, its
  figures (the desk in three handspans; the one-ribbon-three-sticks)
  and every number are the book's own work; no textbook question or
  activity reproduced.
- `ncert-phys11-ch2` — NCERT Class 11 Physics, ch. 2 "Units and
  Measurements". Used for: FM ch. 9 lesson 9.1 — the SI grounding
  mirrored at school level (the seven base units — metre, kilogram,
  second, ampere, kelvin, mole, candela — and derived units built from
  them), web-checked 2026-11-05 (run 42): chapter identity verified
  against the published NCERT class-11 physics listing (keph10x series)
  and standard chapter listings; the lesson's base/derived table, its
  treaty history (Metre Convention 1875, SI named 1960) and all
  instances are the book's own; the full unit machinery (dimensional
  analysis, significant figures, error propagation) is explicitly OUT of
  9.1's scope (9.4 owns precision/accuracy); no content reproduced.

- `wikipedia-metre-history` — Wikipedia, "Metre" + "Arc measurement of Delambre and
  Méchain". Used for: FM ch. 9 lesson 9.2 — the metre's three bodies (the 1791
  Earth-quadrant definition setting the quadrant at 10,000 km by definition; the
  Borda/Lagrange/Laplace/Monge/Condorcet commission; the 1792–1798 Dunkirk–Barcelona
  survey — Delambre north, Méchain south, the Melun–Lieusaint ~10 km baseline, the
  reunion in Paris November 1798; the mètre des Archives platinum bar and the 1889
  platinum-iridium international prototype with its distributed copies; the 1960
  krypton-86 definition; the 1983 speed-of-light definition fixing c =
  299,792,458 m/s, reworded 2019), web-checked 2026-11-05 (run 43).
- `usma-1795-decree` — US Metric Association, "Decimal Nature of the Metric System"
  (the 1795–1995 bicentenary note). Used for: FM ch. 9 lesson 9.2 — the law of
  7 April 1795 (the National Convention's Republican Measures: the metre, the gram,
  the litre legal, with the prefixes centi/deci/deca/hecto/kilo), web-checked
  2026-11-05 (run 43). The decimal-time colour (the 10-hour day of 100-minute
  hours, 1793–1795, abandoned) per the North Coast Journal account
  (`ncj-measuring-the-meter`).
- `sizes-litre-1964` — Sizes.com, "liter (litre)" (anchored to the BIPM 12th CGPM
  Resolution 6 of 1964). Used for: FM ch. 9 lesson 9.2 — the litre bridge history
  (the 1901 3rd CGPM kilogram-of-water definition, the 1.000028 dm³ drift, the 1964
  restoration to exactly the cubic decimetre, 1 mL = 1 cm³), web-checked
  2026-11-05 (run 43).
- `ncj-measuring-the-meter` — North Coast Journal, "Measuring the Meter" (Barry
  Evans, 2019). Used for: FM ch. 9 lesson 9.2 — the honest 0.02% caveat (the bar
  about 0.2 mm short of the Earth-quadrant intent — one part in 5,000) and the
  decimal-day colour, web-checked 2026-11-05 (run 43).
- `ncert-math6-ch1` — NCERT Class 6 Mathematics, ch. 1 "Knowing Our Numbers",
  §1.3 "Estimation" (old-edition canon; public curriculum). Used for: FM
  ch. 9 lesson 9.4 — the rounding charter mirrored (estimating to the
  nearest ten/hundred/thousand by rounding off; the round-down/round-up
  digit rule; round-first-then-add estimation as the exam staple),
  web-checked 2026-11-05 (run 44); the half-up convention, the
  round-once-from-the-original discipline, the interval law, the GPE and
  the significant-figure counts are the book's own expositions and
  derivations (the accuracy/precision dress carried on the existing
  `ncert-phys11-ch2` key).
- `ncert-ganita-prakash6-ch1` — NCERT Ganita Prakash Class 6 Mathematics,
  ch. 1 "Patterns in Mathematics" (fegp101, 2024 edition; public
  curriculum). Used for: FM ch. 11 lesson 11.1 — the patterns charter
  mirrored (number sequences and their rules; the what-comes-next
  discipline; triangular and square numbers; the Virahāṅka numbers and
  their add-the-two-neighbours rule; pictorial grows-the-square
  reasoning), web-checked 2026-11-05 (run 46) via the published chapter
  PDF and the chapter's published solutions listings; the two
  term-to-term tests, the jump law, the gnomon law, the circle-game
  trap and every figure are the book's own expositions.
- `ncert-ganita-prakash6-ch4` — NCERT Ganita Prakash Class 6 Mathematics,
  ch. 4 "Data Handling and Presentation" (fegp104, 2024 edition; public
  curriculum). Used for: FM ch. 10 lesson 10.1 — the data-handling charter
  mirrored (data organised in tabular form using tally marks; frequencies
  read from a frequency distribution table; the most/least-often
  questions), web-checked 2026-11-05 (run 44) via the published chapter
  PDF; the raw-list trap, the tally pass, the five-bar gate, the check-sum
  law Σf = N (derived from the partition), the category-design rules, the
  relative frequencies and both datasets are the book's own expositions.
  The Ishango bone and the Exchequer tally sticks (Wikipedia; both told
  with hedges) ground the historical callout; Khattar supplies the
  exam-corner table shapes.
- `huff-1954-lie-with-statistics` — Darrell Huff, *How to Lie with
  Statistics* (1954; the critical-reading classic, never out of print).
  Used for: FM ch. 10 lesson 10.3 — the critical-reading tradition
  mirrored (the truncated bar, the question-the-source habit, "ask who
  says so, how he knows, and what's missing" paraphrased), web-checked
  2026-11-05 (run 45); the exaggeration law, the scale-invariance law,
  the mismatch gallery and the five-question checklist are the book's
  own derivations. No content reproduced.

## Citation keys reserved by the book-#2 research phase (run 48)

- `beck-geoghegan-art-of-proof` — Matthias Beck & Ross Geoghegan, *The
  Art of Proof: Basic Training for Deeper Mathematics*, Springer
  (Undergraduate Texts in Mathematics; 2010, corrected 2018). Reserved
  for: ANS ch. 1/6/7/8 — the university number-systems bridge whose
  stated subject is exactly this book's ("our subject is number systems:
  the integers and the natural numbers… the real numbers and the rational
  numbers… emphasis on induction, recursion, and convergence"), web-checked
  2026-11-05 (run 48) via the publisher/abstract listings. Exposition
  original; the book's own induction/well-ordering/construction treatments.

- `openstax-contemporary-math` — OpenStax, *Contemporary Mathematics*
  (open textbook, 2023), §4.2 "Early Numeration Systems" (+ the
  LibreTexts *Mathematics in Context* ch. 1 "Number Representation in
  Different Bases and Cryptography" mirror). Reserved for: ANS ch. 9 —
  the historical-numeration charter (Babylonian base-60, Mayan base-20,
  Roman additive → Hindu–Arabic place-value conversions), web-checked
  2026-11-05 (run 48). Exposition and all figures original.

- `cambridge-igcse-cs-0478` — Cambridge IGCSE Computer Science 0478
  syllabus §1.1 "Data Representation" (binary/denary/hexadecimal
  conversions, binary addition + overflow, two's complement, the
  hex-nibble shortcut). Reserved for: ANS ch. 3 lesson 3.4 — the machine
  connection cross-reference (deep coverage belongs to the CS shelf:
  Digital Logic Design, COA), web-checked 2026-11-05 (run 48).

- `ncert-math8-ch16` — NCERT Class 8 Mathematics, ch. 16 "Playing with
  Numbers" (old-edition canon; public curriculum). Reserved for: ANS
  ch. 5 lesson 5.2 — the class-8 canon whose tests of divisibility by 3/9
  and "numbers in general form" this book re-derives from congruences;
  web-checked 2026-11-05 (run 48) against the published chapter listings
  (topics: numbers in general form, games with numbers, letters for
  digits, the 3/9 tests). Exposition original.

## Citation keys added by ANS chapter 1 authoring (run 49)

- `peano-1889-arithmetices` — Richard Dedekind, *Was sind und was sollen
  die Zahlen?* (1888) + Giuseppe Peano, *Arithmetices principia, nova
  methodo exposita* (1889), with the Grassmann (1860s) and Peirce (1881)
  pre-history. Used for: ANS 1.1 — the Dedekind–Peano axiom walk and the
  historical callout. Web-checked 2026-11-05 (run 49) via the Wikipedia
  "Peano axioms" article and the academic listings of the two booklets
  (Ferreiós; Lolli/Springer). Exposition original; no content reproduced.

- `induction-name-history` — the induction-history thread: Francesco
  Maurolico, *Arithmeticorum libri duo* (written 1557, published 1575
  with the *Opuscula Mathematica*; the first published use of induction,
  per MacTutor and the Sophia Rare Books collation); Augustus De Morgan
  fixing the name "mathematical induction" (Penny Cyclopaedia, 1838, per
  the Cajori lineage); Leonhard Euler's prime-generating polynomial
  $n^2 + n + 41$ (1772; prime for $n = 0..39$, $f(40) = 1681 = 41^2$, per
  Wolfram MathWorld). Used for: ANS 1.2 — the historical callout and the
  discipline-of-doubt section; every number re-verified by
  scripts/verify-book2-ch01.ts section U. Exposition original.

## Citation keys added by ANS chapter 1 completion (run 50)

- `cantor-1883-grundlagen` — Georg Cantor, *Grundlagen einer allgemeinen
  Mannigfaltigkeitslehre* (1883): the coinage of "well-ordered"
  (*wohlgeordnet*) and the treatment of the ordering principle as a "law
  of thought". Used for: ANS 1.3 — the historical callout and the
  well-ordered term entry. Web-checked 2026-11-05 (run 50) via the
  Wikipedia Cantor biography ("In 1883, Cantor also introduced the
  well-ordering principle … and called it a 'law of thought'") and the
  MacTutor set-theory history. Exposition original; no content reproduced.

- `fibonacci-1202-liber-abaci` — Leonardo of Pisa (Fibonacci), *Liber
  Abaci* (1202), the rabbit problem: newborn pair, one-month maturity,
  one new pair per mature pair per month, no deaths; the ledger 1, 1, 2,
  3, 5, 8, …, 144 by month twelve, with Fibonacci's own year-end total
  377 pairs (the 144 newborns of the last month added to the 233
  survivors). Used for: ANS 1.3 — the Fibonacci-ledger section, the
  twelve-month table, and the formula card. Web-checked 2026-11-05
  (run 50) via the ETH Library Fibonacci exhibition page ("there will be
  377 pairs at the end") and the Bayreuth Fibonacci project's problem
  statement. Exposition original; no content reproduced.

## Citation keys added by ANS chapter 2 opening (run 51)

- `euclid-elements-book-vii` — Euclid, *Elements*, Book VII (the first book
  of his number theory): Definitions 3–5 (a lesser number "measures" a
  greater when the greater is a multiple of it — the divides/measure
  charter), the antenaresis (reciprocal-subtraction) machinery of
  Propositions VII.1–2, and the modern guide's observation that Euclid
  supplies **no postulates for numbers** yet leans in VII.2's proof on a
  decreasing-sequence-must-stop principle — the well-ordering engine
  Lesson 1.3 made explicit. Used for: ANS 2.1 — the historical callout
  ("a theorem wearing an algorithm's name") and the descent-proof
  framing; ANS 2.2 — the definition callout's "measures" dress and the
  historical note. Web-checked 2026-11-05 (run 51) via David Joyce's
  Clark University edition of Book VII (the same edition cited in runs
  37–39) — definitions and proposition statements read from the edition;
  the missing-postulate observation quoted from Joyce's Book VII guide.
  Exposition original; no content reproduced.

- `landau-1927-elementare` — Edmund Landau, *Elementary Number Theory*
  (1927; *Elementare Zahlentheorie*? — the MacTutor record: "In 1927
  Edmund Landau used a|b in Elementary Number Theory [Tattersall]"): the
  first **in-print** use of the vertical-bar divides notation a|b; the
  earlier echo is Hardy's **unpublished** 1925 number-theory seminar
  notes (used a|b several times in reference to Pólya's work). Used for:
  ANS 2.2 — the historical callout ("the bar, the word, and the later
  generalization"). Web-checked 2026-11-05 (run 51) via MacTutor's
  "Earliest Uses of Symbols of Number Theory" page (mathshistory.st-
andrews.ac.uk/Miller/mathsym/nth/), which also grounds the Gauss ≡
  Disquisitiones (1801, art. 2) sentence carried for the ch. 5 doorway.
  Exposition original; no content reproduced.

## Citation keys added by ANS chapter 2 closing (run 52)

- `lame-1844-note` — Gabriel Lamé's 1844 worst-case result for the Euclidean
  algorithm: the number of division steps never exceeds 5 × the number of
  decimal digits of the smaller number, with the consecutive Fibonacci pairs
  the slowest case (every quotient 1 until the last). Used for: ANS 2.3 —
  the historical callout "The worst case — Lamé, 1844", Exercise 10 (the
  (6,765, 4,181) run: 18 divisions, 17 ones then a 2, bound 18 ≤ 5·4) and
  Exercise 12. Web-checked 2026-11-05 (run 52) via Cut-the-Knot's Lamé's
  Theorem page and Wikipedia's Lamé's theorem article (statement + the
  Fibonacci minimality). Exposition original; no content reproduced.

- `bezout-1779-theorie` — Étienne Bézout (1730–1783) proved the identity for
  **polynomials** in his *Théorie générale des équations algébriques*
  (1779); the integer statement is older. Used for: ANS 2.3 — the Bézout
  identity derivation's naming note. Web-checked 2026-11-05 (run 52) via
  Wikipedia's Bézout's identity article ("named after Étienne Bézout who
  proved it for polynomials"). Exposition original; no content reproduced.

- `bachet-1624-problemes` — Claude-Gaspard Bachet de Méziriac (1581–1638),
  *Problèmes plaisants & délectables qui se font par les nombres* (first
  1612, expanded 1624): the integer ancestor of Bézout's identity and the
  two-weights problem that is the linear Diophantine equation in costume;
  his 1621 Greek-Latin edition of Diophantus' *Arithmetica* is the copy in
  whose margins Fermat later wrote his famous note. Used for: ANS 2.3 — the
  historical chain around Bézout's naming; ANS 2.4 — the Diophantus
  historical callout's Europe route. Web-checked 2026-11-05 (run 52) via
  Wikipedia's Bézout's identity History section. Exposition original; no
  content reproduced.

- `diophantus-arithmetica` — Diophantus of Alexandria (c. 250 AD), the
  *Arithmetica*: ~290 algebraic problems in thirteen books, ten extant,
  asking for whole-number (rational) answers — the ask that names
  "Diophantine equations"; "father of algebra" per the St Andrews
  biography. Used for: ANS 2.4 — the definition callout's name note and the
  historical callout. Web-checked 2026-11-05 (run 52) via Wikipedia's
  Diophantus article and the MacTutor Diophantus biography. Exposition
  original; no content reproduced.

- `sylvester-1884-frobenius` — James Joseph Sylvester's 1884–85
  *Educational Times* result (the two-denomination Frobenius answer): for
  coprime a, b the largest unmakeable amount is ab − a − b and exactly
  (a − 1)(b − 1)/2 amounts are unmakeable; the general problem carries
  Frobenius' name. Used for: ANS 2.4 — the theorem callout "The
  two-denomination Frobenius answer" and Exercises 8/10/11 (the (4, 9) → 23
  with twelve gaps and (4, 7) → 17 with nine gaps sweeps). Web-checked
  2026-11-05 (run 52) via Cut-the-Knot's Sylvester's Problem page (the 1884
  Educational Times 5-and-17 stamps problem, the answer 63 = 85 − 5 − 17)
  and Wikipedia's Coin problem article. Exposition original; no content
  reproduced.

## Citation keys added by ANS chapter 3 opening (run 53)

- `knuth-taocp-v2` — Donald E. Knuth, *The Art of Computer Programming,
  Volume 2: Seminumerical Algorithms* (Addison-Wesley; 1st ed. 1969,
  2nd ed. 1981), §4.1 "Positional Number Systems" — the scholarly charter
  for the notation this chapter formalises (bases as a parameter, the
  digit alphabet including the A–F letter convention, the historical
  notes on early positional systems). Used for: ANS 3.1 + 3.2 — the
  notation charter named in prose (the "fixed convention" the letter
  charter cites) and the lesson `sources` footers. Web-checked 2026-11-05
  (run 53) via the published §4.1 excerpt (InformIT) and the volume
  listings (Wikipedia's TAOCP article). Exposition original; no content
  reproduced.

- `hindu-arabic-positional-history` — the Hindu–Arabic positional
  system's history thread: the positional scheme maturing in Indian
  mathematics with the dedicated zero; al-Khwārizmī's c. 825 book on
  reckoning with Hindu numerals, surviving only through a twelfth-century
  Latin translation (likely Adelard of Bath's), titled *Algoritmi de
  numero Indorum* by Boncompagni's nineteenth-century printed edition —
  the Latinized *Algoritmi* giving the word **algorithm**; Laplace's
  tribute "It is India that gave us the ingenious method of expressing
  all numbers by means of ten symbols, each symbol receiving a value of
  position as well as an absolute value … it escaped the genius of
  Archimedes and Apollonius." Used for: ANS 3.1 — the historical callout
  "India's ten symbols, and the clerk of Baghdad". Web-checked 2026-11-05
  (run 53) via the MacTutor (St Andrews) Laplace quotations page (quoted
  from H. Eves, *Return to Mathematical Circles*, Boston 1988), Keith
  Devlin's al-Khwārizmī essay and Wikipedia's al-Khwārizmī article.
  Exposition original; no content reproduced.

- `leibniz-1703-binary` — Gottfried Wilhelm Leibniz's binary arithmetic:
  the 1679 manuscript *De Progressione Dyadica* (addition, subtraction,
  multiplication and division in base two), the 1697 letter spreading the
  idea, the Bouvet correspondence (the Jesuit Joachim Bouvet's letter of
  4 November 1701, received April 1703, enclosing the Fu Xi arrangement
  of the I Ching's sixty-four hexagrams — reading lines as bits counts
  exactly 0–63), and "Explication de l'Arithmétique Binaire" (Mémoires
  de l'Académie Royale des Sciences, Paris, 1703). With the modern
  hedges: the hexagram ordering is Shao Yong's eleventh-century
  arrangement, no ancient Chinese text treats it as a counting system,
  and Leibniz's arithmetic predates the correspondence — he recognized
  his system in the diagram, he did not borrow it. Used for: ANS 3.2 —
  the historical callout "Leibniz's binary, 1679–1703". Web-checked
  2026-11-05 (run 53) via the Leibniz–I Ching chronology pages (the
  Bouvet letter dates, the 1703 Mémoires publication) and the modern
  scholarly caution recorded there. Exposition original; no content
  reproduced.

- `shannon-1938-switching` — Claude E. Shannon, *A Symbolic Analysis of
  Relay and Switching Circuits*, MIT master's thesis (written 1937,
  published 1938 in *Transactions of the American Institute of Electrical
  Engineers*; the MIT DSpace record holds the deposited thesis). Used
  for: ANS 3.4 — the historical callout "From Leibniz's dyadics to
  Shannon's switches": the proof that Boolean algebra could be computed
  by arrangements of switches, the founding document of digital circuit
  design. Web-checked 2026-11-05 (run 54) via Wikipedia's thesis article
  (dates, the AIEE publication, Goldstine's and Gardner's assessments)
  and the MIT DSpace metadata. Exposition original; no content reproduced.

- `shannon-1948-bit` — the word **bit**: coined by John W. Tukey,
  statistician at Bell Labs, in the latter half of the 1940s as a
  contraction of *binary digit* (he reportedly considered and rejected
  "bigit"/"binit"); first used in an influential publication by Claude
  E. Shannon's *A Mathematical Theory of Communication* (1948), the
  founding paper of information theory. Used for: ANS 3.4 — the "Bit"
  terms entry and the historical callout. Web-checked 2026-11-05
  (run 54) via the Linux Information Project's bit definition page
  (linfo.org) and Wikipedia's Bit article. Exposition original; no
  content reproduced.

- `iec-60027-2-binary-prefixes` — the IEC binary prefixes: kibi (Ki)
  for 2^10, mebi (Mi) for 2^20, gibi (Gi) for 2^30, tebi (Ti) for 2^40,
  pebi/exbi upward — approved by the IEC in December 1998 and published
  January 1999 as Amendment 2 to IEC 60027-2 (Letter symbols to be used
  in electrical technology, Part 2), reaffirming that SI prefixes denote
  powers of ten only. 1 KiB = 1,024 bytes vs 1 kB = 1,000 bytes; at giga
  scale the gap is 7.4%. Used for: ANS 3.4 — the insight callout "1024,
  not 1000 — the honest twins" and the L4 exercise on the kibi/kilo law.
  Web-checked 2026-11-05 (run 54) via NIST's "Prefixes for binary
  multiples" page (physics.nist.gov/cuu/Units/binary.html) and
  Wikipedia's Binary prefix article (the IUPAC 1995 proposal → IEEE/ISO/
  IEC 1996–1999 chain). Exposition original; no content reproduced.

- `ascii-table-a65` — the ASCII code anchors: the character "A" at 65
  decimal = 0x41; "a" at 97 = 0x61; the uppercase block 65–90
  (0x41–0x5A); the lowercase block 97–122 (0x61–0x7A); the digit
  characters "0"–"9" at 48–57 (0x30–0x39); the case flip = +0x20
  (one seat, bit five). Used for: ANS 3.4 — the byte-reading instance,
  the case-flip illustration, the register/Z exercise and the exam
  corner. Web-checked 2026-11-05 (run 54) via the Villanova CSC ASCII
  table (Char/Dec/Oct/Hex listing) and the schoolcoders ASCII page
  (block boundaries, the +0x20 case law). Exposition original; no
  content reproduced.

## Citation keys added by ANS chapter 4 opening (run 55)

- `euclid-elements-book-ix` — Euclid, *Elements*, Book IX, Proposition 20:
  "Prime numbers are more than any assigned multitude of prime numbers" —
  the construction takes the least number measured by the assigned primes
  (their lcm, which for a prime list is the product), adds the unit, and
  finds a fresh prime by VII.31; the descendant remark (Joyce) that the
  proposition is never used again in the Elements; Book IX Proposition 14
  (the least common multiple of primes is measured by no other prime —
  uniqueness in embryo) is carried here too. Used for: ANS 4.1 — the
  IX.20 statement callout, the historical callout, the proof's shape
  (least multiple + unit), and the lesson `sources` footer; ANS 4.2 —
  the IX.14 brick in the genealogy callout. Web-checked 2026-11-05
  (run 55) via D. E. Joyce's Clark University edition of Book IX
  (aleph0.clarku.edu/~djoyce/elements/bookIX/propIX20.html) and its
  proof outline. Exposition original; no content reproduced.

- `eratosthenes-sieve-nicomachus` — the sieve's attribution thread:
  Eratosthenes of Cyrene (c. 276–194 BC) described the method but the
  description is lost; the surviving account is Nicomachus of Gerasa's
  *Introduction to Arithmetic*, Book I, chapter 13 (c. AD 100), which
  preserves both the method and the sieve name; the manuscript trail
  runs through Arabic translations of Nicomachus (e.g. British Library
  Add MS 7473 per the MathWorld note), not through Eratosthenes. Used
  for: ANS 4.1 — the historical callout "A sieve with no surviving
  manual" and the sieve section's framing. Web-checked 2026-11-05
  (run 55) via the Wolfram MathWorld sieve entry (the Nicomachus
  preservation note) and the Greek-manuscript search record
  (pappubahry) confirming the attribution route. Exposition original;
  no content reproduced.

- `al-farisi-fta-existence` — Kamāl al-Dīn al-Fārisī (13th–14th century,
  Baghdad/Damascus), the first full proof of the FTA's existence half,
  in his commentary paper on the theorem of Ibn Qurra (the
  friendly-number work); per Ağargün & Özkan (2001, p. 209): "Euclid
  takes the first step on the way to the existence of prime
  factorization, and al-Farisi takes the final step by actually proving
  the existence of a finite prime factorization in his first
  proposition"; per Rashed (2002, p. 385): the paper "led him to state
  for the first time the fundamental theorem of arithmetic." Used for:
  ANS 4.2 — the genealogy callout "Twenty-three centuries to name a
  theorem". Web-checked 2026-11-05 (run 55) via the Wikipedia
  fundamental-theorem-of-arithmetic history section (citing Ağargün &
  Özkan 2001 and Rashed 2002). Exposition original; no content
  reproduced.

- `gauss-1801-disquisitiones` — Carl Friedrich Gauss,
  *Disquisitiones Arithmeticae* (1801), article 16: the first printed
  proof of the uniqueness half of the fundamental theorem, immediately
  spent on the law of quadratic reciprocity; the "fundamental theorem
  of arithmetic" name as a nineteenth-century courtesy title (also
  called the unique-factorisation / prime-factorisation theorem). Used
  for: ANS 4.2 — the genealogy callout and the theorem statement's
  framing. Web-checked 2026-11-05 (run 55) via the Wikipedia
  fundamental-theorem-of-arithmetic article (the Gauss 1801 section)
  and the Disquisitiones listings. Exposition original; no content
  reproduced.

## Citation keys added by ANS chapter 4 closing (run 56)

- `euclid-ix-36-perfect-numbers` — Euclid, *Elements*, Book IX, Proposition 36:
  "If as many numbers as we please beginning from a unit are set out
  continuously in double proportion until the sum of all becomes prime, and if
  the sum multiplied into the last produces some number, the product is
  perfect" — the even-perfect construction in ancient dress (modern form:
  $2^{p-1}(2^p - 1)$ is perfect whenever $2^p - 1$ is prime; instances
  6, 28, 496, 8128 for p = 2, 3, 5, 7). Used for: ANS 4.3 — the
  Nicomachus/Euclid historical callout and the perfect-number definition's
  framing. Web-checked 2026-11-06 (run 56) via D. E. Joyce's Clark
  University edition of Book IX, propIX36.html (full text retrieved), the
  Clay Mathematics Institute translation, and the Wikipedia perfect-number
  article. Exposition original; no content reproduced.

- `nicomachus-perfect-abundant-deficient` — Nicomachus of Gerasa,
  *Introduction to Arithmetic*, Book I (c. AD 100): the three-way
  classification of the even numbers into perfect, superabundant (abundant)
  and deficient, with the even-perfect list 6, 28, 496, 8128 before him, and
  the two claims that fail (one perfect per digit-length; the 6/8 ending
  rhythm — broken by the fifth perfect 33,550,336). Used for: ANS 4.3 — the
  historical callout "Nicomachus sorts the even numbers". Web-checked
  2026-11-06 (run 56) via the Wikipedia perfect-number article and the
  Nicomachus Introduction-to-Arithmetic study texts (the
  superabundant/deficient/perfect chapter). Exposition original; no content
  reproduced.

- `amicable-pythagoreans-thabit-al-farisi` — the amicable pair (220, 284):
  known to the Pythagoreans (the smallest pair, the only one known in
  antiquity, read as a symbol of friendship); the general generating rule of
  Thābit ibn Qurra of Baghdad (c. AD 850), rediscovered by Fermat and
  Descartes and extended by Euler; the thirteenth-century al-Fārisī (the
  FTA's first full existence proof, run 55's key) worked the same
  amicable-number machinery. Used for: ANS 4.3 — the amicable Illustration,
  the historical callout "A friendship two thousand years deep", and the
  Amicable pair term. Web-checked 2026-11-06 (run 56) via the Wikipedia
  amicable-numbers article (Pythagoreans, Thābit ibn Qurra 826–901,
  al-Majriti/al-Baghdadi/al-Fārisī line) and Britannica's amicable-numbers
  entry. Exposition original; no content reproduced.

- `bertrand-postulate-1845-chebyshev` — Bertrand's postulate: conjectured
  1845 by Joseph Bertrand (verified in the tables of his day, which ran to
  three million), first proved 1850 by Pafnuty Chebyshev (analytic), the
  elementary binomial-coefficient proof found 1932 by the teenage Paul
  Erdős; the statement: for every n ≥ 1 a prime sits in (n, 2n], strictly
  inside for n ≥ 2. Used for: ANS 4.4 — the theorem callout, the history
  paragraph, and the nextPrime algorithm's termination note. Web-checked
  2026-11-06 (run 56) via the Wolfram MathWorld Bertrand's-postulate entry
  and the cut-the-knot history note (Bertrand 1845 / Chebyshev 1850 /
  Erdős 1932). Proof cited, not reproduced; statement swept n ≤ 2000 by
  the verify script. Exposition original; no content reproduced.

- `euler-1737-reciprocal-primes` — Leonhard Euler, "Variae observationes
  circa series infinitas" (presented to the St. Petersburg Academy 1737,
  published 1744; E72, Theorema 19): the sum of the reciprocals of the
  primes diverges — the harmonic series' divergence (Oresme, 14th century)
  surviving the thinning to primes — via the Euler product
  Σ 1/n = ∏(1 − 1/p)^−1 (the fundamental theorem of arithmetic made
  analytic), logarithms, and convergent remainders; the zeta product at
  s = 2 with the Basel value 6/π² is the same machinery converging. Used
  for: ANS 4.4 — the divergence theorem callout, the slow-dive paragraph,
  and the Euler-product Illustration. Web-checked 2026-11-06 (run 56) via
  the Wikipedia divergence-of-the-sum-of-the-reciprocals-of-the-primes
  article (Euler 1737, the partial-sum growth Σ 1/p ≈ log log n, the > 3
  crossing at 5,195,977) and the arXiv Euler-PNT retrospective (E72,
  Theorema 19, presented 1737/published 1744). Numerics computed fresh by
  the verify script (1.8028/2.1981/2.8873; crossing certified at
  5,195,977). Exposition original; no content reproduced.

- `hadamard-vallee-poussin-pnt-1896` — the prime number theorem: π(n) is
  asymptotic to n/ln n; conjectured by Gauss on table evidence; proved
  1896, independently, by Jacques Hadamard and Charles-Jean de la Vallée
  Poussin, riding Bernhard Riemann's 1859 zeta-function ideas. Used for:
  ANS 4.4 — the π-table framing and the PNT paragraph (stated, cited,
  never claimed). Web-checked 2026-11-06 (run 56) via the Wikipedia
  prime-number-theorem article (Hadamard and de la Vallée Poussin, 1896,
  using Riemann's ideas) and the de la Vallée Poussin biography (the
  independent proofs of the same year). Exposition original; no content
  reproduced.

- `zhang-2013-bounded-gaps` — the bounded-gaps breakthrough: Yitang Zhang
  (April 2013) proved H₁ ≤ 70,000,000 — infinitely many prime pairs no
  farther apart than seventy million — the first finite bound on any fixed
  gap after de Polignac's 1849 conjecture; the Polymath8 online
  collaboration improved it to 4680; James Maynard's simpler sieve gave
  600 (and the first proof that H_m is finite for all m); Polymath8b with
  Maynard reached the standing record 246. The twin prime conjecture
  (H₁ = 2) remains open. Used for: ANS 4.4 — the twin-conjecture
  historical callout and the Twin primes term. Web-checked 2026-11-06
  (run 56) via the Polymath-project retrospective abstract (arXiv
  1409.8361: Zhang 70,000,000 → Polymath 4680 → Maynard 600 → Polymath
  246) and the Quanta/HKF coverage of the April 2013 announcement.
  Exposition original; no content reproduced.

## Citation keys added by ANS chapter 5 (run 57)

- `sunzi-suanjing-crt` — the *Sunzi Suanjing* ("Master Sun's Mathematical
  Manual", 3rd–5th century CE): the oldest known statement of a
  simultaneous-congruence problem — "There are certain things whose number
  is unknown. When counted by threes, 2 remain; by fives, 3 remain; by
  sevens, 2 remain. How many things are there?" (answer 23, given without a
  general method). The algorithmic lineage: Āryabhaṭa's *Āryabhaṭīya*
  (499 CE, the kuṭṭaka/"pulveriser" for systematic congruence solving),
  Brahmagupta's seventh-century special cases, Qin Jiushao's 1247 complete
  general method (the Da-yan-shu), and Gauss's 1801 modern statement and
  proof in the Disquisitiones (illustrated on a calendar problem). Used
  for: ANS 5.4 — the CRT theorem callout, Sunzi's problem as the worked
  ladder illustration, and the historical callout. Web-checked 2026-11-06
  (run 57) via the Wikipedia Chinese-remainder-theorem history section and
  the standard histories it cites. Exposition original; the problem
  statement is paraphrased in the lesson's own words, no content
  reproduced.

- `fermat-1640-little-theorem` — Pierre de Fermat's little theorem: stated
  in his letter of 18 October 1640 to Bernard Frénicle de Bessy ("every
  prime number measures one of the powers minus one of any progression
  whatever…"), equivalent to a^(p−1) ≡ 1 (mod p) for prime p not dividing
  a. First published proof: Euler 1736 ("Theorematum Quorundam ad Numeros
  Primos Spectantium Demonstratio", St. Petersburg proceedings); Leibniz
  had an essentially identical proof in an unpublished manuscript before
  1683. The every-a form a^p ≡ a (mod p) includes the multiples of p.
  Used for: ANS 5.4 — the theorem callout (stated, numerically swept for
  every prime ≤ 50, used for exponent reduction — never claimed as proved
  here; the proof belongs to the Number Theory book) and the historical
  framing with the "little vs last" distinction (the 1637 margin note that
  waited 350 years). Web-checked 2026-11-06 (run 57) via the Wikipedia
  Fermat's-little-theorem history section. Exposition original; no content
  reproduced.

- carried keys EXTENDED this run: `gauss-1801-disquisitiones` — from
  article 16 (chapter 4's uniqueness proof) to article 1, the printed
  birth certificate of congruence: "si numerus a numerorum b, c
  differentiam metitur, b, c secundum modulum a vocantur congruentes" —
  if a number a measures the difference of b and c, then b and c are
  called congruent modulo a — together with the ≡ notation designed to
  invite equation-style manipulation (used across 5.1–5.4); and
  `fibonacci-1202-liber-abaci` — extended from the rabbit problem
  (chapter 1) to the casting-out-nines check Fibonacci described for
  merchant arithmetic, with the earlier thread: Hippolytus (c. AD 200) and
  Iamblichus on digital roots, Āryabhaṭa II's *Mahāsiddhānta* (c. 950,
  the earliest known arithmetic-check use) and Ibn Sīnā's "Hindu method"
  (c. 1020) — used for 5.2's historical callout on the check and its
  transposition blind spot. The reserved key `ncert-math8-ch16` (class-8
  "Playing with Numbers": general form 10a + b, letters for digits, the
  3/9 tests) was cashed for 5.2 exactly as the run-48 research phase
  planned — this book re-derives the school canon from congruences rather
  than repeating it. Web-checked 2026-11-06 (run 57) via the Wikipedia
  casting-out-nines history and the Disquisitiones listings. Exposition
  original throughout.

## Citation keys added by ANS chapter 7 (run 59)

- `rhind-papyrus-fractions` — the Rhind Mathematical Papyrus (Ahmes, c.
  1650–1550 BCE, Second Intermediate Period; aspects copied from an
  unknown c. 1850 BCE text). Used for: ANS ch. 7 lesson 7.1 — the
  historical charter for fractions-as-named-quantities: the papyrus's
  opening 2/n table (odd n, 3 through 101) expressing every entry as a sum
  of distinct unit fractions (2/3 = 1/2 + 1/6; 2/7 = 1/4 + 1/28; 2/15 =
  1/10 + 1/30), Egyptian unit-fraction arithmetic as the pre-symbolic
  state that the pair construction replaces with single named objects,
  web-checked 2026-11-06 (run 59) against the published table listings;
  the table's date, authorship and sample entries verified. Exposition
  and all figures original; no table content reproduced beyond the three
  cited identities.

- `stevin-1585-thiende` — Simon Stevin, *De Thiende* (Dutch, 1585; French
  version *La Disme* the same year). Used for: ANS ch. 7 lesson 7.3 — the
  decimal-mirror historical charter: the first treatise deliberately
  devoted to decimal fractions, extending positional notation past the
  units place, the circled-exponent notation (7^(0)3^(1)4^(2)...), the
  advocacy of decimal coinage and measures ("astrologers, surveyors,
  measurers of tapestries" on the cover), with the honest precedence note
  (al-Uqlidisi tenth-century; Rudolff 1530), web-checked 2026-11-06 (run
  59) against encyclopaedic listings. Exposition original.

- `dedekind-1871-korper` — Richard Dedekind, the supplements (XI) to his
  edition of P. G. L. Dirichlet, *Vorlesungen über Zahlentheorie* (2nd
  ed., 1871), where *Körper* ("field") was introduced for number systems
  closed under the four operations with every nonzero element invertible.
  Used for: ANS ch. 7 lesson 7.2 — the naming of ℚ's structure (the
  reader's first field met as a building) and the ℤ/p finite-field bridge
  to 5.4, web-checked 2026-11-06 (run 59). Exposition original.

## Citation keys added by ANS chapter 8 (run 60)

- `baudhayana-sulbasutras` — the Baudhāyana Śulbasūtra (c. 800–500 BCE, one of the Śulba Sūtra ritual-geometry
  manuals; aspects arguably older). Used for: ANS ch. 8 lesson 8.1 — the historical charter for the measured
  diagonal before the irrationality crisis: the verse giving the diagonal of a square as "increase the side by
  a third, that third by its own fourth, diminish that by its own thirty-fourth" — 1 + 1/3 + 1/12 − 1/408 =
  577/408 ≈ 1.4142157, correct to five decimal places, closing with *saviśeṣaḥ* ("with a remainder" — honest
  inexactness); the run-60 verifier confirmed 577² − 2·408² = 1 (so the approximation squares to 2 + 1/408²,
  overshooting by one part in 166,464) and 577/408's repeating decimal (pre-period 3, period 16),
  web-checked 2026-11-06 (run 60) against published verse translations and secondary listings. Exposition
  original; no verse text reproduced beyond the four-term identity.

- `hippasus-irrationality-tradition` — the Hippasus of Metapontum tradition (late antique sources, c. 450 BCE
  figure). Used for: ANS ch. 8 lesson 8.1 — the crisis narrative, presented AS tradition: sometimes credited
  with the discovery that some lengths admit no ratio of integers (specifically √2 or the pentagon/decagon
  depending on the source), the drowning legend, and the honest caveat that the surviving accounts are
  centuries later and mutually conflicting, web-checked 2026-11-06 (run 60) against encyclopaedic listings.
  Exposition original.

- `plato-theaetetus-theodorus` — Plato, *Theaetetus* (c. 369 BCE), 147d: Theodorus of Cyrene proved case by
  case that the square roots of the non-square integers from 3 up to 17 feet are irrational, and his student
  Theaetetus generalized to the full theorem (the 8.1 wall). Used for: ANS ch. 8 lesson 8.2 — the family-
  portrait historical charter (the census was climbed rung by rung before the general proof; Knorr's
  reconstruction of why the odd–even techniques fail first at 17 = 8·2 + 1), web-checked 2026-11-06 (run 60)
  against the Stephanus-reference listings and secondary literature. Exposition original.

- `cantor-1874-algebraic-numbers` — Georg Cantor, "Über eine Eigenschaft des Inbegriffes aller reellen
  algebraischen Zahlen" ("On a Property of the Class of All Real Algebraic Numbers"), *Journal für die reine
  und angewandte Mathematik* (Crelle's Journal), vol. 77 (1874), pp. 258–262. Used for: ANS ch. 8 lesson 8.2 —
  the countability charter stated in honest scope: (i) the real algebraic numbers can be listed; (ii) the real
  numbers cannot (by the interval argument — NOT the 1891 diagonal method, which is a later, separate paper);
  together they make the irrationals the unlistable majority, web-checked 2026-11-06 (run 60) against the
  journal listings and the English translations. Exposition original.

## Citation keys added by ANS chapter 8 (run 60)

- `baudhayana-sulbasutras` — the Baudhāyana Śulbasūtra (c. 800–500 BCE, one of the Śulba Sūtra ritual-geometry
  manuals; aspects arguably older). Used for: ANS ch. 8 lesson 8.1 — the historical charter for the measured
  diagonal before the irrationality crisis: the verse giving the diagonal of a square as "increase the side by
  a third, that third by its own fourth, diminish that by its own thirty-fourth" — 1 + 1/3 + 1/12 − 1/408 =
  577/408 ≈ 1.4142157, correct to five decimal places, closing with *saviśeṣaḥ* ("with a remainder" — honest
  inexactness); the run-60 verifier confirmed 577² − 2·408² = 1 (so the approximation squares to 2 + 1/408²,
  overshooting by one part in 166,464) and 577/408's repeating decimal (pre-period 3, period 16),
  web-checked 2026-11-06 (run 60) against published verse translations and secondary listings. Exposition
  original; no verse text reproduced beyond the four-term identity.

- `hippasus-irrationality-tradition` — the Hippasus of Metapontum tradition (late antique sources, c. 450 BCE
  figure). Used for: ANS ch. 8 lesson 8.1 — the crisis narrative, presented AS tradition: sometimes credited
  with the discovery that some lengths admit no ratio of integers (specifically √2 or the pentagon/decagon
  depending on the source), the drowning legend, and the honest caveat that the surviving accounts are
  centuries later and mutually conflicting, web-checked 2026-11-06 (run 60) against encyclopaedic listings.
  Exposition original.

- `plato-theaetetus-theodorus` — Plato, *Theaetetus* (c. 369 BCE), 147d: Theodorus of Cyrene proved case by
  case that the square roots of the non-square integers from 3 up to 17 feet are irrational, and his student
  Theaetetus generalized to the full theorem (the 8.1 wall). Used for: ANS ch. 8 lesson 8.2 — the family-
  portrait historical charter (the census was climbed rung by rung before the general proof; Knorr's
  reconstruction of why the odd–even techniques fail first at 17 = 8·2 + 1), web-checked 2026-11-06 (run 60)
  against the Stephanus-reference listings and secondary literature. Exposition original.

- `cantor-1874-algebraic-numbers` — Georg Cantor, "Über eine Eigenschaft des Inbegriffes aller reellen
  algebraischen Zahlen" ("On a Property of the Class of All Real Algebraic Numbers"), *Journal für die reine
  und angewandte Mathematik* (Crelle's Journal), vol. 77 (1874), pp. 258–262. Used for: ANS ch. 8 lesson 8.2 —
  the countability charter stated in honest scope: (i) the real algebraic numbers can be listed; (ii) the real
  numbers cannot (by the interval argument — NOT the 1891 diagonal method, which is a later, separate paper);
  together they make the irrationals the unlistable majority, web-checked 2026-11-06 (run 60) against the
  journal listings and the English translations. Exposition original.

## Citation keys added by ANS chapter 8, run 61 close (8.3 + 8.4)

- `dedekind-1872-stetigkeit` — Richard Dedekind, *Stetigkeit und irrationale Zahlen* ("Continuity and
  Irrational Numbers"), Braunschweig: Friedrich Vieweg, 1872 (first edition; the central idea worked out
  24 October 1858 while Dedekind taught differential calculus at the Zürich Polytechnic; English translation
  by W. W. Beman in *Essays on the Theory of Numbers*, 1901). Used for: ANS ch. 8 lesson 8.4 — the cut
  construction this lesson follows: the partition of ℚ into classes A₁/A₂ with all of A₁ below all of A₂,
  the two knife-face forms of a rational cut, the creation of irrational numbers by unproduced cuts (§ 4),
  the completeness postulate, the "modern Eudoxus" nickname with the honest caveat (the every-cut-existence
  postulate is Dedekind's, not Eudoxus's), and the arithmetization-of-analysis framing, web-checked
  2026-11-06 (run 61) against rare-book listings of the first edition, the Beman translation record and
  encyclopaedic accounts. Exposition original.

- `cantor-1872-fundamental-sequences` — Georg Cantor, "Über die Ausdehnung eines Satzes aus der Theorie der
  trigonometrischen Reihen" ("On the Extension of a Theorem from the Theory of Trigonometric Series"),
  *Mathematische Annalen*, vol. 5 (1872), pp. 123–132. Used for: ANS ch. 8 lesson 8.4 — the same-year
  companion construction of the reals by fundamental (Cauchy) sequences, named in the "1872: three
  constructions, one line" callout with the honest scope that the sequence machinery belongs to the analysis
  shelf, web-checked 2026-11-06 (run 61) against the *Mathematische Annalen* listings and the collected-works
  catalogue. Exposition original.

- `heine-1872-functionenlehre` — Eduard Heine, "Die Elemente der Functionenlehre", *Journal für die reine
  und angewandte Mathematik* (Crelle's Journal), vol. 74 (1872), pp. 172–188. Used for: ANS ch. 8 lesson 8.4 —
  the nested-intervals construction of the reals drawn from Weierstrass's unpublished Berlin lectures, which
  the lesson pairs with the squeeze-ladder reading of completeness (every width-shrinking nested family of
  rational intervals lands on exactly one real), web-checked 2026-11-06 (run 61) against the EUDML record
  and standard histories. Exposition original.

- `meray-1869-limites` — Hugues Charles Robert Méray, "Remarques sur la nature des quantités définies par
  la condition de servir de limites à des variables données" ("Remarks on the Nature of Quantities Defined
  by the Condition of Serving as Limits of Given Variables"), 1869. Used for: ANS ch. 8 lesson 8.4 — the
  quiet French priority footnote: the first published arithmetical theory of irrational numbers, anticipating
  Cantor's 1872 construction "with only minor differences of style" (per the MacTutor/Robinson account),
  unrecognized in France at the time, web-checked 2026-11-06 (run 61) against the MacTutor biography and
  secondary literature. Exposition original.

## Run 61 reference discipline (2026-11-06): zero downloads

Internet research only (the sanctioned fallback — the banked Beck & Geoghegan / Khattar scope carried the
surds spine from runs 55–60). No reference files downloaded, no working copies to delete. New citation keys
above; the four web-checks are logged in the key entries. The gitignored Drive survey was NOT rebuilt this
run (no Drive access needed; WORK_INVENTORY regenerated from the live codebase).

## Per-subject ledger

| Subject | Books identified | Downloaded (MB) | Used for | Local copies deleted | Book status |
|---|---|---|---|---|---|
| mathematics | Khattar QA 4e (+ NCERT web outlines ch. 1 + ch. 2 + ch. 3 + ch. 7 + class-7 ch. 2 + class-6 ch. 8 + class-7 ch. 3 + class-7 ch. 8 §§8.3–8.6 + class-8 ch. 8 §§8.2–8.4 + class-9 ch. 1 + class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2; CBSE-aligned BODMAS web-check) | 33.9 × 7 (units 1–3 re-downloads + run 12 for ch. 4 fraction material) | FM ch. 1 (unit 1): lessons 1.2, 1.3 · FM ch. 2 (unit 2): lessons 2.1–2.5 (2.5 studied Khattar ch. 4 BODMAS) · FM ch. 3 (unit 3): lessons 3.1–3.5 (Khattar ch. 1 divisibility/primes + ch. 2 HCF/LCM incl. Illustration 14) · FM ch. 4 (unit 4): lesson 4.1 (Khattar ch. 1 fraction exam items mined — SSC CGL Tier-II 2018 + SSC MTS 2017 comparisons cited in the exam callout; ch. 2's HCF/LCM-of-fractions rules banked for 4.5), lessons 4.2–4.4 (no downloads; NCERT web checks), lesson 4.5 (no downloads; NCERT class-7 ch. 2 web-checked — new citation key; Khattar's banked fraction rules cashed) · FM ch. 5 (unit 5): lesson 5.1 (no downloads; NCERT class-7 ch. 3 + class-6 ch. 8 web-checked — two new citation keys; Khattar decimal-fraction exam items), lesson 5.2 (no downloads; NCERT class-9 ch. 1 + class-6 ch. 8 web-checked — new citation key ncert-math9-ch1; Khattar recurring-conversion shortcuts and comparison traps), lesson 5.3 (no downloads; NCERT class-6 ch. 8 + class-7 ch. 2 §§2.3–2.4 web-checked; Khattar point-hop family), lesson 5.4 (no downloads; NCERT class-7 ch. 8 §§8.3–8.4 web-checked — new citation key ncert-math7-ch8; Khattar percent conversion items), lesson 5.5 (no downloads; NCERT class-7 ch. 8 §§8.5–8.6 + class-8 ch. 8 §§8.2–8.4 web-checked — new citation key ncert-math8-ch8; Khattar percentage/profit-loss exam staples) · FM ch. 6 (unit 6): lesson 6.1 (no downloads; NCERT class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2 web-checked — new citation key ncert-math6-ch12, ncert-math7-ch8 extended; Khattar ratio exam staples), lesson 6.2 (no downloads; NCERT class-6 ch. 12 Ex. 12.3 — the unitary method — web-checked, key ncert-math6-ch12 extended to Ex. 12.3; NCERT class-7 science "Motion and Time" web-checked — new citation key ncert-sci7-motion; Khattar speed/unitary-method exam staples), lesson 6.3 (no downloads; NCERT class-6 ch. 12 §12.2 "Proportion" + Ex. 12.2 web-checked, key ncert-math6-ch12 extended to §12.2/Ex. 12.2; Khattar ratio-proportion exam staples) · FM ch. 7 (unit 7): lessons 7.1–7.4 (no downloads; NCERT Ganita Prakash class-6 ch. 10 + class-7 part-2 ch. 2 web-checked — new keys ncert-math6-ch10, ncert-math7-p2-ch2; Brahmagupta/Argand/Weierstrass history web-checked; Khattar integer exam staples) · FM ch. 8 (unit 8): lesson 8.1 (no downloads; NCERT class-6 ch. 4 + class-9 ch. 5 web-checked — new keys ncert-math6-ch4, ncert-math9-ch5; Euclid Elements facts web-checked against Joyce's Clark U. edition), lesson 8.2 (no downloads; NCERT Ganita Prakash class-6 ch. 2 "Lines and Angles" web-checked — new key ncert-math6-gp-ch2; key ncert-math6-ch4 extended toward §4.9 angles; Huddart 1801 protractor per Britannica; Khattar clock/angle staples), lesson 8.3 (no downloads; NCERT Ganita Prakash class-7 ch. 5 "Parallel and Intersecting Lines" + class-9 ch. 6 "Lines and Angles" web-checked — new keys ncert-math7-gp-ch5, ncert-math9-ch6; Euclid Postulate 5 + I.27/I.29 re-checked against Joyce's Clark U. edition; Playfair 1795/Ludlam 1785/Proclus + Lobachevsky–Bolyai history web-checked; Khattar transversal/angle-chase staples), lesson 8.4 (no downloads; NCERT class-7 ch. 6 web-checked — new key ncert-math7-ch6; Euclid I.32 + Proclus corollaries + the Gauss legend per Buhler re-checked), lesson 8.5 (no downloads; Ganita Prakash class-6 ch. 6 + class-7 ch. 11 + the class-7 exemplar gemp109 web-checked — new keys ncert-math6-gp-ch6, ncert-math7-ch11; Archimedes' 96-gon bounds, Zu Chongzhi's Milü, Aryabhata's rule, Jones 1706/Euler, Lambert 1761/Lindemann 1882 web-checked; Khattar mensuration exam staples) · FM ch. 9 (unit 9): lesson 9.1 (no downloads; NCERT Curiosity class-6 science ch. 5 + class-11 physics ch. 2 web-checked — new keys ncert-sci6-curiosity-ch5, ncert-phys11-ch2; the cubit/Maya's rod 52.3 cm, the barleycorn inch, the honest Henry-I yard legend, the Metre Convention 1875/BIPM Sèvres, SI 1960, India 1956/1960/2009 web-checked; Khattar unit-identification exam staples), lesson 9.2 (no downloads; the metric history web-checked — new keys wikipedia-metre-history, usma-1795-decree, sizes-litre-1964, ncj-measuring-the-meter: the metre's three bodies, the 1795 decree, the litre's 1901→1964 drift, the 0.02% honest caveat, the decimal day; the prefix ladder and the litre bridge are original exposition on the carried NCERT keys), lesson 9.3 (no downloads; carried keys only — the factor-licence method is original exposition; Khattar conversion exam staples), lesson 9.4 (no downloads; NCERT class-6 ch. 1 §1.3 estimation/rounding web-checked — new key ncert-math6-ch1; the accuracy/precision definitions carried on ncert-phys11-ch2; the Everest 1856 announcement 29,002 ft + the 2020 China–Nepal 8,848.86 m web-checked, the 0.102% relative error recomputed in verify-unit-9.ts; Khattar rounding/estimation exam staples) · FM ch. 10 (unit 10): lesson 10.1 (no downloads; NCERT Ganita Prakash class-6 ch. 4 Data Handling and Presentation web-checked — new key ncert-ganita-prakash6-ch4; the Ishango bone + the Exchequer tally sticks + the 1834 Westminster fire web-checked with hedges; Khattar data-table exam staples), lesson 10.2 (no downloads; the bar/line/pie charter carried on ncert-ganita-prakash6-ch4 + a new key ncert-math8-ch4 — NCERT class-8 ch. 4 Data Handling: the circle graph/pie chart and the central-angle-as-fraction-of-360° canon; Playfair 1786/1801 and Nightingale's 1858 rose diagram web-checked per Wikipedia/IBCS/Bellhouse; Khattar data-interpretation staples), lesson 10.3 (no downloads; new key huff-1954-lie-with-statistics — the critical-reading tradition mirrored; every lying chart drawn from the book's own tiny data, none reproduced; Khattar DI staples) | yes — after each unit's verification (run 12 deleted its working copies after E2E, per the per-lesson pattern) | foundation-mathematics COMPLETE (**11/11 chapters — the book closed by run 47 (2026-11-05): ch. 11 Patterns and the Doorstep of Algebra COMPLETE 3/3 (11.2 From Patterns to Formulas + 11.3 A Letter for the Unknown shipped verify-first; the unit-11 completion review passed; the book stands 48 lessons / 227,569 words / 355 terms / 240 quiz / 534 exercises); the next book (Arithmetic and Number Systems) begins at its research phase**) · arithmetic-and-number-systems IN PROGRESS — ch. 1 The Natural Numbers as a System **COMPLETE 3/3** (runs 49–50, 2026-11-05: lessons 1.1 + 1.2 + 1.3 shipped verify-first, the unit-1 completion review passed; the book stands 3 lessons / 16,921 words / 24 terms / 15 quiz / 36 exercises; chapter 2 opens at run 51). No downloads either run — the reserved key beck-geoghegan-art-of-proof + run 49's two keys (peano-1889-arithmetices, induction-name-history) + run 50's two keys (cantor-1883-grundlagen, fibonacci-1202-liber-abaci) carried the unit; working-copy footprint zero. Ch. 2 The Division Algorithm and the Structure of Divisibility **COMPLETE 4/4** (runs 51–52, 2026-11-05: run 51 shipped lessons 2.1 Division with Rest: The Division Algorithm + 2.2 The Algebra of Divisibility verify-first with verify-book2-ch02.ts 166 checks (two pre-writing defects caught); run 52 extended the script to 407 checks (sections U–AN, seven pre-writing defects caught) and shipped lessons 2.3 The Euclidean Algorithm, Proven — and Bézout's Identity + 2.4 Linear Diophantine Equations, closing the chapter with the unit-2 completion review; the chapter stands 4 lessons / 20,820 words / 32 terms / 20 quiz / 58 exercises). No downloads either run — the reserved key beck-geoghegan-art-of-proof + Khattar's banked ch. 1 scope carried the unit, plus run 51's two keys (euclid-elements-book-vii, landau-1927-elementare) and run 52's five new keys (lame-1844-note, bezout-1779-theorie, bachet-1624-problemes, diophantus-arithmetica, sylvester-1884-frobenius — all web-checked, all no-download); the algorithm-name history (Algoritmi ← al-Khwārizmī) carried on run 47's web-check; working-copy footprint zero. Ch. 3 Positional Systems and Other Bases **IN PROGRESS 2/4** (run 53, 2026-11-05: lessons 3.1 The Representation Theorem: Every Number Has Exactly One Name + 3.2 Converting Between Bases shipped verify-first with verify-book2-ch03.ts 312 checks (six pre-writing defects caught); no downloads — Knuth TAOCP v2 §4.1, Laplace's tribute via MacTutor/Eves 1988, al-Khwārizmī's Algoritmi de numero Indorum, and Leibniz's 1679/1703 binary (with the Shao Yong hedges) all web-checked, three new keys knuth-taocp-v2, hindu-arabic-positional-history, leibniz-1703-binary; working-copy footprint zero; chapter closes at run 54 with 3.3 + 3.4). Ch. 3 Positional Systems and Other Bases **COMPLETE 4/4** (run 54, 2026-11-05: lessons 3.3 Arithmetic in Other Bases + 3.4 Binary, Hexadecimal and the Machine shipped verify-first with verify-book2-ch03.ts extended 312 → 502 checks, sections AD–BA (seven pre-writing defects caught); unit-3 completion review passed — the chapter stands 4 lessons / 19,953 words / 32 terms / 20 quiz / 54 exercises; book stands 13 lessons / 58,079 words / 88 terms / 55 quiz / 175 exercises). No downloads — the machine history (Shannon's 1937/38 switching thesis, Tukey's bit coinage + Shannon's 1948 paper, the IEC 60027-2 binary prefixes of January 1999, the ASCII anchors 'A' = 65 = 0x41 with the +0x20 case law) all web-checked, four new keys shannon-1938-switching, shannon-1948-bit, iec-60027-2-binary-prefixes, ascii-table-a65; carried keys knuth-taocp-v2, khattar-qa-4e, beck-geoghegan-art-of-proof, leibniz-1703-binary, cambridge-igcse-cs-0478; working-copy footprint zero; chapter 4 (Primes and the FTA) opens at run 55 with 4.1 + 4.2. Ch. 4 Primes and the Fundamental Theorem of Arithmetic **IN PROGRESS 2/4** (run 55, 2026-11-05: lessons 4.1 The Primes Never End: Euclid's Proof and the Sieve + 4.2 The Fundamental Theorem of Arithmetic shipped verify-first with verify-book2-ch04.ts 167 checks, sections A-V — one figure-geometry defect caught pre-writing (the figure-2 leaf boxes at 74 px overlapped two pairs; narrowed to 56 px); no downloads — Euclid IX.20 via Joyce's Clark U. edition, the sieve's Nicomachus I.13 attribution route, al-Farisi's existence proof per Ağargün & Özkan/Rashed, and Gauss's Disquisitiones art. 16 all web-checked, four new keys euclid-elements-book-ix, eratosthenes-sieve-nicomachus, al-farisi-fta-existence, gauss-1801-disquisitiones; carried keys euclid-elements-book-vii (VII.30/31/32), beck-geoghegan-art-of-proof, khattar-qa-4e; working-copy footprint zero; chapter closes at run 56 with 4.3 + 4.4 + the unit-4 completion review) |
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
- 2026-11-05 (mathematics, book #2 research phase, run 48): no downloads —
  the research phase is survey-only (the persisted Drive survey + the
  sanctioned internet fallback; four citation keys reserved, none yet
  cited by a written lesson). Zero temporary-references footprint; the
  gitignored survey (inventory.json) was rebuilt after this run's recycle
  via scripts/rebuild_drive_survey.ts — 89 entries intact, file ids
  unchanged — purely so WORK_INVENTORY.json could regenerate.

- 2026-11-05 (mathematics, unit 9, lesson 9.1): no downloads — NCERT
  "Curiosity" class-6 science ch. 5 "Measurement of Length and Motion"
  (fecu105) + class-11 physics ch. 2 "Units and Measurements" web-checked
  (sanctioned fallback; two new citation keys added:
  ncert-sci6-curiosity-ch5, ncert-phys11-ch2); zero temporary-references
  footprint this lesson (the gitignored survey was rebuilt after the
  recycle for the WORK_INVENTORY regeneration — 89 entries intact).

- 2026-11-05 (mathematics, unit 8, lesson 8.5): no downloads — Ganita
  Prakash class-6 ch. 6 "Perimeter and Area" + class-7 ch. 11 "Perimeter
  and Area" + the class-7 exemplar (gemp109) web-checked (sanctioned
  fallback; two new citation keys added: ncert-math6-gp-ch6,
  ncert-math7-ch11); zero temporary-references footprint this lesson.

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

## 2026-11-06 — Run 57 (ANS chapter 5 in full, 5.1 + 5.2 + 5.3 + 5.4 + the unit-5 review — the second one-full-chapter run): zero downloads

Lessons 5.1 "Remainders Become Numbers: Congruence Defined", 5.2 "Why the Divisibility Tests Work",
5.3 "The Unit Digit and Cycles of Powers" and 5.4 "Linear Congruences and a Glimpse of Fermat" were
verified against two NEW citation keys — `sunzi-suanjing-crt` and `fermat-1640-little-theorem` (both
web-checked via the Wikipedia history sections, both logged above with the full lineage) — plus the
extended `gauss-1801-disquisitiones` (art. 1's congruence definition and the ≡ notation) and
`fibonacci-1202-liber-abaci` (the casting-out-nines thread: Hippolytus/Iamblichus digital roots →
Āryabhaṭa II's Mahāsiddhānta c. 950 → Ibn Sīnā c. 1020 → Fibonacci 1202), the cashed reserved key
`ncert-math8-ch16` (the class-8 school canon 5.2 re-derives instead of repeating), and the carried
`khattar-qa-4e` (exam-corner shapes: remainders of huge sums and products, unit digits, digit hunts,
Sunzi/CRT word problems, Fermat exponent reductions), `euclid-elements-book-vii` (the measures/divides
language behind Gauss's "metitur"), and `beck-geoghegan-art-of-proof` (the proof-transition voice).
History told with hedges, paraphrased, never reproduced. All lesson arithmetic recomputed by
scripts/verify-book2-ch05.ts — created by a parallel instance of the same run with 82 checks (sections
A–I, lesson 5.1) and EXTENDED to 270 checks (sections J–AF) BEFORE any of 5.2–5.4 was written — four
pre-writing defects caught across the extension (a truncation-law sweep that overclaimed equal
remainders where only divisibility transfers; the 8-cycle printed backwards as 8, 6, 2, 4 — it runs
8, 4, 2, 6; a Math.pow precision loss at k = 30 replaced by modular multiplication; a BigInt-literal
tsc target clash replaced by a powmod helper). No reference files downloaded, no working copies to
delete; the gitignored Drive survey was rebuilt (rebuild_drive_survey.ts, 89 entries) after the
sandbox recycle so WORK_INVENTORY could regenerate.

## 2026-11-06 — Run 56 (ANS 4.3 + 4.4, chapter 4 CLOSES — the first one-full-chapter run): zero downloads

Lessons 4.3 "Divisors from DNA: Divisor Counts and Factorial Zeros" and 4.4 "How the Primes Are
Distributed" were verified against seven NEW citation keys — `euclid-ix-36-perfect-numbers` (IX.36's
even-perfect construction, full text retrieved from Joyce's Clark U. edition + the Clay translation),
`nicomachus-perfect-abundant-deficient` (the perfect/superabundant/deficient classification of
Introduction to Arithmetic Book I, with Nicomachus's two failing claims told honestly),
`amicable-pythagoreans-thabit-al-farisi` (the Pythagoreans' pair (220, 284); Thābit ibn Qurra's rule
c. 850; al-Fārisī's amicable workshop — tying 4.2's al-Fārisī key), `bertrand-postulate-1845-chebyshev`
(Bertrand 1845 from the tables, Chebyshev 1850, the teenage Erdős 1932 — proof cited, statement swept
n ≤ 2000), `euler-1737-reciprocal-primes` (Variae observationes/E72 Theorema 19 — Σ 1/p diverges via the
Euler product; the verify script computed the partial sums fresh and certified the > 3 crossing at
5,195,977), `hadamard-vallee-poussin-pnt-1896` (the PNT stated and cited, never claimed), and
`zhang-2013-bounded-gaps` (Zhang's 70,000,000 → Polymath 4680 → Maynard 600 → Polymath 246) — plus the
carried `khattar-qa-4e` (the exam-corner shapes: σ comparisons, abundant/deficient labels, the product
rule, τ-inverted champions, π-differences) and `euclid-elements-book-ix` (IX.36 cross-referenced).
History told with hedges, paraphrased, never reproduced. All lesson arithmetic recomputed by
scripts/verify-book2-ch04.ts (extended 167 → 356 checks, sections W–AQ) BEFORE writing — one wrong
record-gap claim (1129 → 1163 is not a prime gap; the record below 2000 is 34 at 1327 → 1361) and one
wrong memorised partial sum (Σ 1/p ≤ 1000 = 2.198080, not 2.198787) were caught by the script
pre-writing; the figure-text collisions the auditor found were fixed in-SVG and re-audited 0/0. No
reference files downloaded, no working copies to delete.

## 2026-11-05 — Run 55 (ANS 4.1 + 4.2, chapter 4 opens; fired 23:11 IST from job 504365): zero downloads

Lessons 4.1 "The Primes Never End: Euclid's Proof and the Sieve" and 4.2 "The Fundamental Theorem of
Arithmetic" were verified against four NEW citation keys — `euclid-elements-book-ix` (IX.20 via Joyce's
Clark University edition: "Prime numbers are more than any assigned multitude of prime numbers", the
least-measured-multiple + unit construction, and Joyce's note that the proposition is never used again
in the Elements; IX.14 carried as the uniqueness embryo), `eratosthenes-sieve-nicomachus` (Eratosthenes'
lost description; the surviving account = Nicomachus, Introduction to Arithmetic I.13, c. AD 100, per
MathWorld and the Greek-manuscript search record), `al-farisi-fta-existence` (Kamāl al-Dīn al-Fārisī's
first full existence proof, per Ağargün & Özkan 2001 and Rashed 2002 via the Wikipedia FTA history), and
`gauss-1801-disquisitiones` (Disquisitiones Arithmeticae 1801, article 16 — the first printed uniqueness
proof, immediately spent on quadratic reciprocity) — plus the carried `euclid-elements-book-vii`
(VII.30 the lemma, VII.31 every composite has a prime divisor, VII.32), `beck-geoghegan-art-of-proof`
(the proof-transition voice, strong induction) and `khattar-qa-4e` (the exam-corner shapes: trial-band
verdicts, π-table fragments, divisor counts, factorial zeros). History told with hedges, paraphrased,
never reproduced. All lesson arithmetic recomputed by scripts/verify-book2-ch04.ts (167 checks, sections
A–V) BEFORE writing. No reference files downloaded, no working copies to delete; the gitignored Drive
survey was rebuilt after the sandbox recycle for the WORK_INVENTORY regeneration (89 entries intact).

## 2026-11-05 — Run 46 (FM 10.4 + chapter 10 close + FM 11.1, job 504365's first fully-executed fire): zero downloads

Lesson 10.4 "Mean, Median and Mode" was verified against one NEW citation key — `ncert-math7-ch3` (NCERT class-7 mathematics ch. 3 "Data Handling": the arithmetic mean as the equal-share summary, the mode as the most frequent observation, the median of an ordered list, the range — web-checked via published chapter/notes listings, run 46) — plus the carried `ncert-ganita-prakash6-ch4` (the shoe and travel datasets re-cashed) and `khattar-qa-4e` (exam-corner shapes: missing-value means, combined means, even-N medians). History grounded by web-check: the word *average* traced from Arabic ʿawārīyah (damage) through Old French *avarie* (damage to ship/cargo) into the maritime general-average doctrine and the equal-share arithmetic (standard dictionaries; told with hedges), and the astronomers' practice of averaging repeated observations — paraphrased, never reproduced. Lesson 11.1 "Patterns and Rules" was verified against one NEW citation key — `ncert-ganita-prakash6-ch1` (Ganita Prakash class-6 ch. 1 "Patterns in Mathematics", fegp101: number sequences, what-comes-next discipline, triangular/square numbers, the Virahāṅka numbers — web-checked via the published chapter PDF and its solutions listings) — plus the carried `khattar-qa-4e` (exam series shapes). History grounded by web-check: Pingala's *Chandahśāstra* (c. 3rd–2nd century BCE, the mātrāmeru), Virahanka c. 700 CE, Gopala c. 1135 and Hemachandra c. 1150 — the Indian pedigree of the add-the-two-neighbours sequence roughly fifty years before Fibonacci's *Liber Abaci* (1202) — told with hedges per the standard sources. Moser's circle problem (1, 2, 4, 8, 16, 31) computed in verify-unit-11.ts from C(n,2) + C(n,4) + 1, cited as a trap not a lesson. No reference files downloaded, no working copies to delete.

## 2026-11-05 — Run 45 (FM 10.2 + FM 10.3, fired from the re-enabled job 498279): zero downloads

Lessons 10.2 "Bar Charts, Line Graphs and Pie Charts" and 10.3 "Reading Graphs Critically" were verified against one NEW citation key each — `ncert-math8-ch4` (NCERT class-8 mathematics ch. 4 "Data Handling", hemh104: "a circle graph is also called a pie chart; the total angle at the centre of a circle is 360°; the central angle of the sectors will be a fraction of 360°" — web-checked via the published NCERT chapter PDF, run 45) and `huff-1954-lie-with-statistics` (Darrell Huff's *How to Lie with Statistics*, 1954: the truncated-bar tradition and the question-the-source habit, paraphrased never reproduced) — plus the carried `ncert-ganita-prakash6-ch4` (bar graphs/pictographs) and `khattar-qa-4e`. History grounded by web-check: William Playfair's *Commercial and Political Atlas* (1786 — the line/area/bar chart) and *Statistical Breviary* (1801 — the pie chart) per the IBCS/Sachs/Bellhouse treatments; Florence Nightingale's polar-area "rose" diagram, *Diagram of the Causes of Mortality in the Army in the East*, sent to Queen Victoria 1858 (Wikipedia/Lehigh/historyofinformation) — paraphrased in the historical callouts, never reproduced. Exam-corner shapes (bar/pie reading, totals/differences/shares, which-graph-suits-which-data, "which chart is misleading" items) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete.

## 2026-11-05 — Run 44 (FM 9.4 + chapter 9 close + FM 10.1, the first two-chapter run): zero downloads

Lesson 9.4 "Precision, Accuracy and Rounding in Measurement" was verified against one NEW citation key — `ncert-math6-ch1` (class-6 ch. 1 "Knowing Our Numbers" §1.3 Estimation: the round-off charter to nearest ten/hundred/thousand, the round-first-then-add exam staple — web-checked via published chapter/notes listings) — plus the carried `ncert-phys11-ch2` (accuracy as closeness to the true value, precision as the fineness/repeatability axis — the two-axes independence argued from Q = n × u, not reproduced) and `ncert-sci6-curiosity-ch5` + `khattar-qa-4e`. History grounded by web-check: the 1856 Great Trigonometrical Survey announcement of Peak XV at 29,002 ft (encyclopedia/survey sources; the "computed 29,000, two feet added for believability" padding told as hedged lore, exactly the Henry-I yard pattern); the 2020 China–Nepal joint survey 8,848.86 m; the audit arithmetic (29,002 ft = 8,839.81 m; error 9.05 m = 29.7 ft ≈ 0.102%) recomputed inside verify-unit-9.ts (AH/AO). The Everest colour and the rounding canon are paraphrased, never reproduced. Lesson 10.1 "Collecting and Tallying Data" was verified against one NEW citation key — `ncert-ganita-prakash6-ch4` (Ganita Prakash class-6 ch. 4 "Data Handling and Presentation", fegp104: data in tabular form using tally marks, frequency distribution tables — web-checked via the published NCERT chapter PDF) — plus the carried `khattar-qa-4e`. History grounded by web-check: the Ishango bone (Wikipedia; the tally interpretation honestly disputed) and the English Exchequer tally sticks (split-hazelwood receipts; the 1834 Treasury stove fire that helped destroy the Palace of Westminster) — told with hedges, paraphrased, never reproduced. Exam-corner shapes (frequency-table totals/differences/percents in SSC CGL/CHSL, RRB NTPC and banking prelims; tally-pedagogy items in CTET/state TETs) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete; the gitignored Drive survey was rebuilt after the sandbox recycle for the WORK_INVENTORY regeneration (89 entries intact).

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

## 2026-11-05 — Run 42 (FM 9.1, chapter 9 opens): zero downloads

Lesson 9.1 "Units as Agreements" was verified against two NEW citation keys added this run — `ncert-sci6-curiosity-ch5` (NCERT "Curiosity" class-6 science ch. 5 "Measurement of Length and Motion", fecu105: the canonical non-standard-units charter — handspan/cubit/foot differ person to person, the shopkeeper's metal rod vs the tailor's flexible tape, the metre as SI length — web-checked via the published NCERT PDF listing + solution-guide summaries) and `ncert-phys11-ch2` (class-11 physics ch. 2 "Units and Measurements": the SI's 7 base units and derived-unit charter — web-checked via published listings) — plus the carried `khattar-qa-4e` (unit-identification exam staples). The chapter identities were web-checked (sanctioned fallback); no content reproduced. History grounded by web-check: the cubit (Wikipedia; the Liverpool World Museum rod of Maya, 52.3 cm, 1336–1327 BC, Eighteenth Dynasty; royal cubit 7 palms × 4 digits = 28 digits; attested range 44.4–52.92 cm); the barleycorn inch ("three grains of barley, dry and round" — English statute language repeated in the 1824 Weights and Measures Act, the notion older); the yard's origin uncertain (William of Malmesbury's arm-of-Henry-I account, the nose-bounding explicitly a folktale); the Metre Convention (BIPM — signed Paris 20 May 1875 by 17 states, amended 1921, BIPM at Sèvres; the system named SI at the 11th CGPM 1960; the 2019 constant-based redefinitions as one-sentence forward colour); India's metrology timeline (OIML bulletin, the Indian perspective — Standards of Weights and Measures Act 1956, metric weights compulsory in notified areas from 1 October 1960, gaz/bigha → hectare, the Legal Metrology Act 2009) — all paraphrased in the historical callout and prose, never reproduced. Exam-corner shapes (SI-unit identification, quantity-to-unit pairing, number × unit readings, small k = 10/100/1000 conversions, "why standard units" reasoning in SSC CHSL/MTS, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete; the gitignored Drive survey was rebuilt after the sandbox recycle for the WORK_INVENTORY regeneration (metadata only, 89 entries intact).

## 2026-11-05 — Run 41 (FM 8.5 + chapter close + voice polish 4.1): zero downloads

Lesson 8.5 "Perimeter and Area of Rectangles, Triangles and Circles" was verified against two NEW citation keys added this run — `ncert-math6-gp-ch6` (Ganita Prakash class-6 ch. 6 "Perimeter and Area": perimeter of polygons as the sum of sides, 4 × side and 2(l + b); area by tiling with unit squares, l × b — web-checked via the published Ganit Prakash chapter PDF listing and solution-guide summaries) and `ncert-math7-ch11` (class-7 ch. 11 "Perimeter and Area": triangles as parts of rectangles → ½ × base × height, circumference with π = C/d, area πr², 1 hectare = 10,000 m² — web-checked via the published chapter listing + the NCERT class-7 Exemplar chapter gemp109, which states the same formula set verbatim as school canon) — plus the carried `khattar-qa-4e` (fence-cost, tiling, fixed-perimeter-optimal and circle round-trip exam staples). The chapter identities were web-checked (sanctioned fallback); no content reproduced. History grounded by web-check: Archimedes' *Measurement of a Circle* — the inscribed/circumscribed 96-gon squeeze (hexagon doubled four times) giving 3 10/71 < π < 3 1/7, both bounds recomputed inside verify-unit-8.ts (AZ1) against Math.PI; Zu Chongzhi's Milü 355/113 (Wikipedia: best rational approximation with a denominator of four digits or fewer, six-decimal agreement — recomputed in AZ2); Aryabhata's Āryabhaṭīya rule (add 4 to 100, multiply by 8, add 62,000, divide by 20,000 = 3.1416 — recomputed in AZ3); William Jones's 1706 *Synopsis Palmariorum Matheseos* first use of the symbol π and Euler's popularisation (History Today "The Man Who Invented Pi"; the Exploratorium's history of π — adoption 1737); Lambert's 1761 irrationality and Lindemann's 1882 transcendence (standard sources, stated not proved). Exam-corner shapes (fence/carpet cost, fixed-perimeter optimals, C↔r↔A round-trips with 22/7, hectare and m²/cm² rescalings in SSC CGL/CHSL, RRB NTPC and banking clerical banks) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete. Voice polish 4.1 reused only lesson 4.1's own furniture (n, d, 0, the five-sixths phrase — zero new numerals) and repaired a latent katex-error (\tfrac{\text{Rs } 20} → the plain Rs dress) found during its live verification.

## 2026-11-05 — Run 40 (FM 8.4 + voice polish 3.5): zero downloads

Lesson 8.4 "Triangles and the Angle Sum" was verified against one NEW citation key added this run — `ncert-math7-ch6` (class-7 ch. 6 "The Triangle and Its Properties": the exterior-angle property and the angle-sum property sections; web-checked via published chapter/notes listings) — plus the carried `ncert-math6-ch4` (§4.11 "Triangles": the three-sided charter, sides/vertices/angles, interior-exterior) and `khattar-qa-4e` (angle-chase staples). The chapter identity was web-checked (sanctioned fallback); no content reproduced. History grounded by web-check: David Joyce's Clark University edition of Euclid's Elements Book I — Proposition I.32's full two-part statement ("the exterior angle equals the sum of the two interior and opposite angles, and the sum of the three interior angles … equals two right angles") and its proof machinery (I.31 the parallel through a point — drawn through C in Euclid's picture, through A in ours; I.29 the equal alternates; I.13 the two-right-angles-on-a-line) — the same edition cited in runs 37–39; Proclus's two corollaries to I.32 (the (n−2)×180° interior sum of a convex rectilinear figure; the exterior angles totalling four right angles); the pons asinorum nickname for I.5. The Gauss mountain-triangle story web-checked and told honestly: the Brocken–Hohehagen–Inselsberg triangle was measured in the Hanover survey (1818–1832), but Buhler's Gauss biography concludes the space-testing motive is "as far as we know, a myth" (mathpages' summary of Buhler; Breitenberger 1984, "Gauss's Geodesy and the Axiom of Parallels", the scholarly treatment; Miller 1972 / Goe 1974 the earlier debate) — paraphrased in the historical callout, never reproduced. The spherical octant triangle (three right angles, 270° > 180°) was computed on the unit sphere by tangent projection inside verify-unit-8.ts (AN5); the hyperbolic defect stated qualitatively. Exam-corner shapes (third-angle-in-5-seconds, ratio-of-angles parts engines, isosceles apex/base swaps, exterior-angle chases, right-triangle complements, largest-side existence checks in SSC CGL/CHSL, RRB NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete. Voice polish 3.5 reused only lesson 3.5's own numbers (12, 18, 6, 36, 216, 48, 1,440, 69,120, 96, 720 — all already in the polished callout; zero new numerals).

## 2026-11-05 — Run 47 (FM 11.2 + FM 11.3 + the unit-11 completion review — THE BOOK CLOSES): zero downloads

Lesson 11.2 "From Patterns to Formulas" was verified against two NEW citation keys added this run — `ncert-math7-gp-ch4` (Ganita Prakash class-7 ch. 4 "Expressions using Letter-Numbers", gegp104: letter-numbers, matchstick formulas, substitution — web-checked via the published PDF listing + solution-guide summaries) and `ncert-math6-ch11` (class-6 ch. 11 "Algebra": the matchstick-patterns charter, Ex. 11.1) — plus the carried `ncert-ganita-prakash6-ch1` and `khattar-qa-4e`. History grounded by web-check: the Gauss schoolboy anecdote told with hedges (first printed in Sartorius von Waltershausen's 1856 memorial biography; details vary across tellings — the pairing argument itself the point). Lesson 11.3 "A Letter for the Unknown" was verified against one NEW citation key — `ncert-math7-ch4` (class-7 ch. 4 "Simple Equations": the balance-method charter, Ex. 4.2's same-operation-on-both-sides discipline) — plus the carried keys. History grounded by web-check: the Rhind Mathematical Papyrus's aha problems (problems 24–34 linear equations; the quantity-plus-its-quarter-makes-15 instance solved by the scribe's take-4 scaling, answer 12) and al-Khwarizmi's Al-Jabr (Baghdad c. 820; al-jabr = restoring/reunion of broken parts → the word algebra; Algoritmi → algorithm). Exam-corner shapes (n-th-term formulas, the Tₙ vs N(N−1)/2 off-by-one, simple equations in age/ribbon/perimeter narrations, CTET balance-model pedagogy) web-checked — shapes cited, no question reproduced. No reference files downloaded, no working copies to delete.

## Citation keys added by ANS chapter 6 (run 58)

- `hankel-1867-permanence` — Hermann Hankel, *Theorie der complexen
  Zahlensysteme* (Leipzig: Leopold Voss, 1867): the **principle of the
  permanence of formal laws** — when a number system is extended, the
  old formal laws remain valid "soweit als möglich" (as far as
  possible; Hankel 1867, p. 102). Hankel (1839–1873) studied under
  Möbius, Riemann, Weierstrass and Kronecker and taught at
  Erlangen–Nuremberg and Tübingen. Web-checked 2026-11-06 (run 58) via
  the Toader 2021 *Historia Mathematica* study "Permanence as a
  principle of practice" and the 2026 arXiv analysis of Hankel's
  principle (which quotes the 1867 title page and the "soweit als
  möglich" formulation); paraphrased in 6.1's historical callout and
  6.2's charter callout, never reproduced. Lesson 6.1's repair
  criterion is the working form of this principle.
- `peacock-1833-permanence` — George Peacock's **principle of the
  permanence of equivalent forms** (*Treatise on Algebra* 1830 and its
  symbolic successor of 1833; also his 1842/1845 works): the original
  statement that extending the reading of algebra's symbols must keep
  the old truths of the old readings true — the ancestor Hankel
  recast. Web-checked 2026-11-06 via the same two historical studies
  (which list Peacock 1830/1833/1842/1845 and note Hankel's deliberate
  narrowing from theorems to laws); paraphrased in 6.1's historical
  callout, never reproduced.
- `brahmagupta-628-brahmasphutasiddhanta` — Brahmagupta,
  *Brahmasphutasiddhanta* ("The Opening of the Universe", 628 CE): the
  earliest surviving text treating zero and negative numbers as full
  citizens of arithmetic, with the rules phrased as **fortunes and
  debts** (fortune with fortune is fortune; fortune with debt follows
  the bigger; debt with debt is fortune; the zero rules — a debt minus
  zero is a debt, zero minus zero is zero, a fortune subtracted from
  zero is a debt). Reached Europe through Colebrooke's 1817 English
  translation of the algebra chapters. Web-checked 2026-11-06 via
  MacTutor's Brahmagupta biography (the fortunes/debts wording); the
  verses are paraphrased in 6.2's historical callout and tabled as
  theorems at 6.3 (each verse paired with a verified pair
  computation), never reproduced. FM 7.1–7.3 banked the rules
  operationally; chapter 6 derives them.

## Run 58 reference discipline (2026-11-06): zero downloads

Chapter 6 was verified against the carried citation set
(`beck-geoghegan-art-of-proof` — the ℕ → ℤ bridge syllabus spine;
`ncert-math6-ch10` and `ncert-math7-p2-ch2` carried; `khattar-qa-4e`
carried) via web-check only — no new reference files downloaded, no
working copies to delete. History grounded by web-check: Hankel's 1867
permanence principle and Peacock's 1833 ancestor (Toader 2021 +
arXiv 2607.08413 — the title, publisher, "soweit als möglich" page
reference and the Peacock lineage all confirmed), and Brahmagupta's
628 CE fortunes/debts rules (MacTutor). Exam-corner shapes (ℕ-vs-ℤ
solve-and-system pairings, signed-order narrations, sign-rule products,
distributive factoring, smallest-integer items in SSC CHSL/MTS, RRB
NTPC CBT-I and banking clerical banks) web-checked — shapes cited, no
question reproduced. The gitignored Drive survey was rebuilt after the
sandbox recycle for the WORK_INVENTORY regeneration (metadata only,
89 entries intact).

## 2026-11-06 — Run 59 (ANS chapter 7 in full, 7.1 + 7.2 + 7.3 + the unit-7 review — the fourth one-full-chapter run): zero downloads

- Reference discipline: the chapter's spine came from the persisted Drive
  research (Beck–Geoghegan art-of-proof rationals charter) and the banked
  permanence + FTA + division-algorithm lessons of earlier chapters; three
  new citation keys (rhind-papyrus-fractions, stevin-1585-thiende,
  dedekind-1871-korper) were web-checked inline (no downloads; facts
  verified against encyclopaedic listings, all three recorded above).
- Zero reference files downloaded this run; nothing to delete (the
  standing rule "delete downloaded reference working copies after the
  unit verifies" has nothing pending). Drive survey rebuilt post-recycle:
  89 entries intact.


## Citation keys added by ANS chapter 9 opening (run 62)

- `egyptian-hieroglyphic-numerals` — the Egyptian additive numeral system (c. 3000 BCE onward): seven
  hieroglyph classes for 1, 10, 100, 1,000, 10,000, 100,000 and 1,000,000 (stroke, cattle-hobble/heel
  bone, coil of rope, lotus flower, pointed finger, tadpole, the god Heh), each repeated per digit in any
  order. Used for: ANS ch. 9 lesson 9.1 — the additive-system definition's canonical case, the digit-sum
  symbol-count law, the regrouping-addition exhibit and the compression-ladder figure, web-checked
  2026-11-07 (run 62) against encyclopaedic and survey accounts. Exposition original.

- `ishango-bone` — the Ishango bone (Royal Belgian Institute of Natural Sciences, Brussels): a ~10 cm
  baboon fibula with a quartz point, excavated 1950 at Ishango near Lake Edward (DRC) by Jean de
  Heinzelin, dated to roughly 20,000 years ago (a dating that has shifted with the region's volcanically
  disturbed carbon record); 168 notches in three columns counted 11,13,17,19 / 3,6,4,8,10,5,5,7 /
  11,19,21,9 (column sums 60/48/60). Used for: ANS ch. 9 lesson 9.1 — the tally-mind historical callout
  with HONEST HEDGES (the prime-column and lunar readings are disputed; Rudman's objection that primes
  were not named until the Greeks is recorded; the artifact certifies notation, not theory), web-checked
  2026-11-07 (run 62) against the Wikipedia article and the 2025 arXiv re-analysis. Exposition original.

- `roman-numerals` — the Roman numeral system: seven letters I/V/X/L/C/D/M in a five–ten pattern,
  additive in origin (IIII surviving on clock dials), with the six-pair subtractive rule (IV, IX, XL, XC,
  CD, CM) as a late local compression; the classical ceiling MMMCMXCIX = 3,999 with M-repetition and the
  vinculum beyond. Used for: ANS ch. 9 lesson 9.1 — the local-rule-vs-place-value contrast, 1888 =
  MDCCCLXXXVIII as the longest year numeral (verified by sweep), and the additive-regrouping addition,
  web-checked 2026-11-07 (run 62). Exposition original.

- `babylonian-sexagesimal-numerals` — the Old Babylonian base-sixty positional system (from c. 2050 BCE,
  Ur III): two wedge forms (vertical = 1, corner = 10) building digit groups 0–59, places worth 60^k;
  no zero for most of its history (gaps between groups; a two-slanted-wedge placeholder appears c. 300
  BCE, internal only, never trailing), so a zeroless string names a whole geometric family of values.
  Used for: ANS ch. 9 lesson 9.2 — the conversion exhibits, the ambiguity theorem's historical case, and
  the igi-gub-ba reciprocal-table engine behind base sixty's divisor richness, web-checked 2026-11-07
  (run 62). Exposition original.

- `ybc-7289` — the Old Babylonian clay tablet YBC 7289 (Yale Babylonian Collection, c. 1800–1600 BCE): a
  square with both diagonals, side 30, diagonal 42;25,35, and the scale-free diagonal ratio 1;24,51,10 =
  305,470/216,000 = 1.41421296296… — √2 accurate to about one part in two million (error ≈ 5.9934×10⁻⁷).
  Used for: ANS ch. 9 lesson 9.2 — the exact-fraction verification 30 × 1;24,51,10 = 42;25,35, the
  stylized reconstruction figure, and the "position without zero still computed" argument, web-checked
  2026-11-07 (run 62) against the Yale/encyclopaedic records. Exposition original.

- `plimpton-322` — the Old Babylonian tablet Plimpton 322 (from Larsa, c. 1800 BCE): fifteen rows of
  short-side/diagonal integer pairs (e.g. 119,120,169) with a broken first column whose heading most
  plausibly records a "taking-away of 1" from a squared diagonal. Used for: ANS ch. 9 lesson 9.2 — the
  historical callout with the honest dispute (the scribal-exercise reading per Robson 2001 is the leading
  account; the 2017 "first trig table" proposal is rejected by most historians of the corpus; the numbers
  are beyond dispute, the intent is not), web-checked 2026-11-07 (run 62) against the Wikipedia article
  and the arXiv literature survey. Exposition original.

- `maya-numerals-long-count` — the Mayan vigesimal system (dots = 1, bars = 5, shell glyph = 0; places
  stacked vertically) and the Long Count calendar ladder kin/uinal/tun/katun/baktun = 1/20/18×20 =
  360/7,200/144,000 days (the 18-kink making the tun a year-like unit; 13 baktun = 1,872,000 days; the
  creation base 13.0.0.0.0 placed in August 3114 BCE by the most-cited GMT correlation). Used for: ANS
  ch. 9 lesson 9.2 — the pure-vs-calendar double readings (⟨8,0,16⟩ = 3,216 vs 2,896; 9.9.16.0.0 =
  1,366,560 vs 1,518,400), the mod-20/mod-18 inverse algorithm, and the visible-zero-vs-zero-as-number
  distinction reserved for 9.3, web-checked 2026-11-07 (run 62) against the Wikipedia/web-exhibits
  accounts. Exposition original.

### Run 62 reference-notes
- Zero reference files downloaded this run; nothing to delete (the standing rule "delete downloaded
  reference working copies after the unit verifies" has nothing pending). The Drive survey was rebuilt
  after a sandbox recycle wiped the gitignored listing (`scripts/rebuild_drive_survey.ts`, 89 entries
  intact) so `build_work_inventory.ts` could regenerate. All seven keys above are internet-researched
  (the sanctioned fallback for the early-numeration topic; the Drive is exam-oriented and holds no
  numeration-history text).

## Citation keys added by ANS chapter 9 close (run 63)

- `lokavibhaga-458` — the Lokavibhāga ("parts of the universe"), a Jain cosmological text composed in
  Sanskrit in 458 CE by Siṃhasūri: the earliest unambiguous written appearance of zero inside a
  positional number — vast cosmic time spans computed on a decimal place-value system with śūnya
  ("void") and synonyms written in the empty places. Used for: ANS ch. 9 lesson 9.3 — the opening of
  the written trail ("the word" stage of zero), web-checked 2026-11-07 (run 63) against the Wikipedia
  article and the ScienceDirect Arabic-numerals overview. Exposition original.

- `aryabhata-499-aryabhatiya` — Āryabhaṭa's Āryabhaṭīya (499 CE), verse II.2: *sthānāt sthānaṁ
  daśaguṇaṁ syāt* — "from place to place each is ten times the preceding": place value stated as
  explicit doctrine. Used for: ANS ch. 9 lesson 9.3 — the rule-of-ten milestone with the honest hedge
  (Clark's translation note: *kha* means "space/place"; whether a zero SYMBOL existed in
  Āryabhaṭa's day is disputed — computations may have run on a ruled board with blank columns),
  web-checked 2026-11-07 (run 63) against the Wikisource Clark translation and its commentary.
  Exposition original.

- `bakhshali-manuscript` — the Bakhshālī birch-bark manuscript (found 1881 in a field near the village
  of Bakhshālī, close to Mardan, Khyber Pakhtunkhwa, Pakistan; ~70 leaves in Śāradā script; a practical
  compendium — fractions, square roots, progressions, equations to the quadratic): the śūnya-bindu dot
  holding empty places. The 2017 Bodleian radiocarbon ranges (folio 16: 224–383 CE, folio 17: 680–779,
  folio 33: 885–993), the scholarly pushback (non-academic publication; Houben's calibration objections;
  the copy-vs-original question), and Oxford's own October 2024 revision to 799–1102 CE. Used for: ANS
  ch. 9 lesson 9.3 — the "mark" stage of zero with the full dating debate told honestly, web-checked
  2026-11-07 (run 63) against the Wikipedia article. Exposition original.

- `al-uqlidisi-952-fusul` — Abu'l-Hasan al-Uqlīdisī's Kitāb al-Fuṣūl fī al-Ḥisāb al-Hindī (composed
  Damascus 952–53; surviving copy 1157; Saidan's English translation): the earliest surviving book
  teaching Hindu reckoning in Arabic; moved every algorithm from the dust board to pen and paper; the
  earliest known direct treatment of decimal fractions with a separating sign, five centuries before
  Stevin and before al-Kāshī. Used for: ANS ch. 9 lesson 9.3 — the machine-at-work section with the
  honest Saidan-vs-Rashed disagreement on how complete the decimal-fraction idea was, web-checked
  2026-11-07 (run 63) against the MacTutor (St Andrews) biography. Exposition original.

- `gwalior-inscription-876` — the Chaturbhuj temple inscription at Gwalior Fort (876 CE): the oldest
  clearly DATED zero — a small round circle holding the empty places in the recorded numbers 270 and
  50 (a garden grant and a daily allowance). Used for: ANS ch. 9 lesson 9.3 — the dated floor beneath
  the Bakhshālī debate, web-checked 2026-11-07 (run 63) against the Wikipedia/web-exhibits accounts
  (incl. William Dalrymple's 2021 note distinguishing the dated Gwalior zero from the contested
  Bakhshālī dot and the Cambodia dot inscription). Exposition original.

- `fibonacci-1202-liber-abaci` — extended again (run 63): now covers the Liber Abaci's OPENING —
  "These are the nine figures of the Indians: 9 8 7 6 5 4 3 2 1. With these nine figures, and with
  this sign 0, which in Arabic is called zephirum, any number can be written…" — the decisive European
  landing of the Hindu–Arabic numerals, alongside the banked rabbit problem (ANS 1.3) and the
  casting-out-nines description (ANS 5.2). Web-checked 2026-11-07 (run 63).

- `hindu-arabic-positional-history` — carried to ANS 9.3 (run 63): al-Khwārizmī's c. 825 textbook as
  the hinge of the transmission (the word algorithm from his Latinized name), the two numeral-shape
  traditions (eastern from India, western ghubar "dust" numerals named for the dust board), Laplace's
  tribute quoted, and the word-chain śūnya → ṣifr → {zephirum → zero; cifra → cipher} + algorithm.
  No new web-checks needed — carried on the run-53 verification.

### Run 63 reference-notes
- Zero downloads this run (all eight keys internet-researched or carried; the Drive holds no
  numeration-history text — exam-oriented, per the run-62 survey). Working-copy footprint zero.
- The arithmetic reviewer grew to 280 checks (sections O/P/Q + review-phase Q-8/Q-9 regression guards);
  the unit-9 completion review caught three authored defects (a ⟨7,16,7⟩ = 2,847 Mayan miscount of
  2,807; a 9⁴ − 9 = 6,480 mis-arithmetic — true value 6,552; a dominance bound stated as b−2 instead
  of b−1), all fixed pre-commit and pinned by the new checks.

### Run 64 additions (2026-11-07, ANS ch. 10 opens — 10.1 + 10.2)

- `hamming-1950-error-detecting` — Richard W. Hamming, "Error Detecting and Error Correcting Codes", Bell System Technical Journal
  29(2), April 1950, pp. 147–160: the paper that framed error detection/correction as a quantitative subject (redundancy in a
  designed pattern, measured against error classes) and founded coding theory. Used for: ANS ch. 10 lesson 10.2 — the framing
  callout (detection vs correction; the ISBN-loop anecdote: the standard textbook example is Hamming's own Coding and Information
  Theory, ISBN 0-13-139139-9, weighted sum 143 = 13 × 11) and the L6-1 hand-off to the correction program (2^r ≥ k + r + 1, the
  (7,4) code). Web-checked 2026-11-07 (run 64) against the BSTJ archive listing and the Wiley DOI record. Exposition original.

- `isbn-check-digit-schemes` — the ISBN-10 (mod 11, weights 10..1, X = 10, in use 1970–2007) and ISBN-13/EAN-13 (mod 10, weights
  1,3 alternating, 2007–) check-digit specifications, with the worked exhibits 0-13-139139-9 (sum 143 = 13·11), 0-393-09670-X
  (sum 220 = 20·11) and 978-0-393-09670-5 (sum 110); the real reference volume Khattar QA 4e ISBN 978-93-5343-955-2 verified
  (sum 150 ≡ 0 mod 10). Used for: ANS ch. 10 lesson 10.2 — the ISBN-10 engine figure, the check-digit derivations, and the
  composite-modulus cost (transpositions of differ-by-5 pairs slip: 80/90 ordered). Web-checked 2026-11-07 (run 64) against the
  UNB ECE error-detection teaching page and current ISBN references. Exposition original; every number re-verified by
  scripts/verify-book2-ch10.ts (sections F–G).

- `luhn-algorithm-iso7812` — Hans Peter Luhn's mod-10 check (IBM, 1954; ISO/IEC 7812-1; public domain): double every second digit
  from the right, subtract 9 when ≥ 10, total ≡ 0 (mod 10); the doubling map [0,2,4,6,8,1,3,5,7,9] is a bijection; the canonical
  exhibit 79927398713 (total 70). Used for: ANS ch. 10 lesson 10.2 — the Luhn engine, the injectivity proof, the single 0↔9
  transposition blind spot (g(0) = g(9) = 0, 89/90 ordered), and the honesty note (designed against accidents, not attacks).
  Web-checked 2026-11-07 (run 64) against the Wikipedia Luhn article and ISO/IEC 7812 references. Exposition original; sweep-verified
  in scripts/verify-book2-ch10.ts (section H).

- `fibonacci-1202-liber-abaci` — extended again (run 64): the Liber Abaci's casting-out-nines check now also anchors ANS 10.2's
  historical opening (the medieval probatio novena; the mod-9 residue wheel). No new web-checks needed — carried on the run-63
  verification.

- `gauss-1801-disquisitiones` — carried to ANS 10.2 (run 64): the Disquisitiones congruence notation underwrites the checksum
  equations Σ w_i d_i ≡ 0 (mod m). No new web-checks needed.

### Run 64 reference-notes
- Zero downloads this run (all three new keys internet-researched or carried; the Drive holds no error-detection/checksum text —
  exam-oriented, per the run-48/62 surveys). Working-copy footprint zero. Drive survey rebuilt post-recycle via
  rebuild_drive_survey.ts (89 entries intact) before build_work_inventory.ts regenerated WORK_INVENTORY.json.
- The arithmetic verifier opened at 87 checks (sections A–I pre-writing) and closed at 174 (sections J/K/L/M quiz+exercise keys,
  N/O figure geometry), ALL GREEN; the first pass caught TEN defects in the verifier's own census loops (no-op substitutions and
  equal-digit transpositions counted as errors; a Luhn check-digit parity bug; ⌊60/10⌋ hand-typed 5 for 6; a phantom
  "original digit" sweep; a wrong normalized residue −4 ≡ 6; three badly-written assertions) — the script, not memory, is the
  source of truth, the run-60 lesson holding again. Two authoring-time prose defects fixed pre-commit (the 89 ≡ 8 (mod 9)
  residue-diff arithmetic; a garbled weighted-term string in the Khattar exhibit) plus the Hamming-bound restatement
  (2^r ≥ k + r + 1). The SVG overlap audit forced a mid-run redesign of the 10.1 repair map (gate text sat inside the bands;
  the rotated left-rail note clipped the viewBox and read as pre-transform in the audit — replaced with straight footer lines)
  and removed the wheel's step labels (a +2 label collided with station 0).

### Run 65 — ANS 10.3 'The Toolkit Synthesis' + the BOOK CLOSE (2026-11-07)

- `legendre-1808-essai` — Adrien-Marie Legendre, *Essai sur la théorie des nombres*, 2nd edition (Paris, 1808): the
  exponent-of-a-prime-in-n! floor-sum formula (v_p(n!) = Σ ⌊n/p^k⌋) appears in this edition; the formula is also known as
  de Polignac's formula after Alphonse de Polignac's independent 1849 statement. Web-checked this run (publisher listings +
  the formula's reference pages); the digit-sum equivalent v_p(n!) = (n − s_p(n))/(p − 1) is presented in ANS 10.3 as a
  derivation proved there, not a attributed quote. Anchors the lesson's factorial engine (trailing zeros, the 5-chain,
  the base-5 digit-sum identity). No downloads — internet research only (the Drive holds no Legendre text).
- `khattar-qa-4e` — carried to ANS 10.3 (run 65): the competitive-exam scope banked since run 6 (unit digits, cyclicity,
  factorial trailing zeros, base systems, remainders) is exactly the lesson's four lanes; cited in the exam corner,
  never reproduced.
- `sunzi-suanjing-crt` — carried to ANS 10.3 (run 65): the CRT remainder-vector reading of the double-remainder hunts.
- `gauss-1801-disquisitiones` — carried to ANS 10.3 (run 65): the congruence laws as the engine's reduction licence.

#### Run 65 reference-notes
- Zero downloads (all four keys banked or internet-researched; the Drive collection is exam-oriented and holds no
  Legendre/number-theory-primary text — per the run-48 survey). Working-copy footprint zero; nothing to delete.
- Drive survey rebuilt post-recycle via rebuild_drive_survey.ts (89 entries intact) before build_work_inventory.ts
  regenerated WORK_INVENTORY.json with the run-65 ground truth (83 lessons / 412,045 words / 21 chapters written /
  0 in progress / ANS complete).
- The arithmetic verifier grew 174 → 288 checks (sections P–V added pre-writing; T/U quiz+exercise keys pinned; V figure
  geometry), ALL GREEN before a word was written; the first pass caught FOUR defects: a helper-name shadow (the new 2-arg
  digitSum silenced the run-64 1-arg digitSum until renamed digitSumB — sections E/L went red then green), the author's
  hand-typed binary of 2024 (true 11111101000₂, padded 011111101000₂, nibbles 0111 1110 1000 → 7 E 8), two floor-division
  chain assertions (8/5 = 1.6, Math.floor missing), and a sweep range that missed the ladder classic's second hit 721 —
  all corrected and pinned as regression guards. Two authoring-time defects caught by the browser gates: a callout title
  carrying raw $v_p$ (callout titles are not KaTeX-processed — reworded) and example blocks carrying an unsupported
  'answer' field (folded into final 'Hence' steps per the Cengage chain contract).

### Run 66 — BOOK #3 PROMOTED: Elementary Algebra (2026-11-07)

- `jacobs-elementary-algebra` — Harold R. Jacobs, *Elementary Algebra* (the Drive `Elementary-Algebra_text.pdf`; the
  Algebra-1-equivalent classic). Web-checked 2026-11-07 (publisher/course listings): its chapter arc — fundamental
  operations → functions and graphs → integers → rational numbers → equations in one and two variables → simultaneous
  equations → exponents → polynomials → factoring → fractions → square roots → quadratic equations → real numbers →
  fractional equations → inequalities and number sentences — is the course spine of the promoted plan. Used to inform
  sequencing only; exposition original.
- `hall-knight-higher-algebra` — H. S. Hall & S. R. Knight, *Higher Algebra* (the Drive copies
  `Higher Algebra - Hall _ Knight.pdf` + `HigherAlgebra_10021865.pdf`): the classic British text for the stretch
  material — remainder and factor theorems, cubic factoring, roots-and-coefficients relations — mapped to the ends of
  AL chapters 3, 4, 9 and the handoff.
- `openstax-elementary-algebra` — OpenStax, *Elementary Algebra 2e* (web-checked 2026-11-07): the modern open-textbook
  sequencing cross-check (expressions → linear equations and inequalities → graphing → systems → polynomials →
  factoring → rational expressions → quadratics). License forbids ingestion; structure reference only.
- `ncert-math8-ch2-linear-equations` — NCERT Class 8 Mathematics ch. 2 "Linear Equations in One Variable" (rationalized
  2023 contents web-checked 2026-11-07).
- `ncert-math8-ch10-exponents` — NCERT Class 8 Mathematics ch. 10 "Exponents and Powers" (contents page hemh1ps
  web-checked 2026-11-07).
- `ncert-math8-ch12-factorisation` — NCERT Class 8 Mathematics ch. 12 "Factorisation" (contents page hemh1ps
  web-checked 2026-11-07).
- `ncert-math9-ch2-polynomials` — NCERT Class 9 Mathematics ch. 2 "Polynomials" (web-checked 2026-11-07).
- `ncert-math10-ch3-pair-linear` — NCERT Class 10 Mathematics ch. 3 "Pair of Linear Equations in Two Variables"
  (jemh103 web-checked 2026-11-07).
- `ncert-math10-ch4-quadratic` — NCERT Class 10 Mathematics ch. 4 "Quadratic Equations" (jemh104 web-checked
  2026-11-07).
- `khattar-qa-4e` — carried (banked since run 6): the competitive-exam algebra scope (identities, factorization,
  linear/quadratic speed work, roots-and-coefficients) → AL chapters 3, 4, 9, 11.
- `cengage-jee-style` — carried: the Cengage `MATHS` M2 module is the Algebra volume of the JEE series (the M2/01 unit
  was the style reference of runs 14/16); presentation contract only.

#### Run 66 reference-notes
- Zero downloads (the promotion phase needs survey + audit only; per-unit downloads follow at authoring time — the
  three Drive references are direct: Jacobs' Elementary Algebra, the two Hall & Knight copies, and the M2 module).
- Drive survey rebuilt post-recycle via rebuild_drive_survey.ts (89 entries intact) before WORK_INVENTORY.json was
  regenerated (booksLive 3).
- Research facts web-checked this run: the NCERT algebra arc's chapter numbers (class 8 ch. 2/10/12; class 9 ch. 2;
  class 10 ch. 3/4), Jacobs' Elementary Algebra chapter arc, OpenStax Elementary Algebra 2e's structure. Nine citation
  keys reserved; none consumed yet.
