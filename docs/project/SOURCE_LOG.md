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

## Per-subject ledger

| Subject | Books identified | Downloaded (MB) | Used for | Local copies deleted | Book status |
|---|---|---|---|---|---|
| mathematics | Khattar QA 4e (+ NCERT web outlines ch. 1 + ch. 2 + ch. 3 + ch. 7 + class-7 ch. 2 + class-6 ch. 8 + class-7 ch. 3 + class-7 ch. 8 §§8.3–8.6 + class-8 ch. 8 §§8.2–8.4 + class-9 ch. 1 + class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2; CBSE-aligned BODMAS web-check) | 33.9 × 7 (units 1–3 re-downloads + run 12 for ch. 4 fraction material) | FM ch. 1 (unit 1): lessons 1.2, 1.3 · FM ch. 2 (unit 2): lessons 2.1–2.5 (2.5 studied Khattar ch. 4 BODMAS) · FM ch. 3 (unit 3): lessons 3.1–3.5 (Khattar ch. 1 divisibility/primes + ch. 2 HCF/LCM incl. Illustration 14) · FM ch. 4 (unit 4): lesson 4.1 (Khattar ch. 1 fraction exam items mined — SSC CGL Tier-II 2018 + SSC MTS 2017 comparisons cited in the exam callout; ch. 2's HCF/LCM-of-fractions rules banked for 4.5), lessons 4.2–4.4 (no downloads; NCERT web checks), lesson 4.5 (no downloads; NCERT class-7 ch. 2 web-checked — new citation key; Khattar's banked fraction rules cashed) · FM ch. 5 (unit 5): lesson 5.1 (no downloads; NCERT class-7 ch. 3 + class-6 ch. 8 web-checked — two new citation keys; Khattar decimal-fraction exam items), lesson 5.2 (no downloads; NCERT class-9 ch. 1 + class-6 ch. 8 web-checked — new citation key ncert-math9-ch1; Khattar recurring-conversion shortcuts and comparison traps), lesson 5.3 (no downloads; NCERT class-6 ch. 8 + class-7 ch. 2 §§2.3–2.4 web-checked; Khattar point-hop family), lesson 5.4 (no downloads; NCERT class-7 ch. 8 §§8.3–8.4 web-checked — new citation key ncert-math7-ch8; Khattar percent conversion items), lesson 5.5 (no downloads; NCERT class-7 ch. 8 §§8.5–8.6 + class-8 ch. 8 §§8.2–8.4 web-checked — new citation key ncert-math8-ch8; Khattar percentage/profit-loss exam staples) · FM ch. 6 (unit 6): lesson 6.1 (no downloads; NCERT class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2 web-checked — new citation key ncert-math6-ch12, ncert-math7-ch8 extended; Khattar ratio exam staples), lesson 6.2 (no downloads; NCERT class-6 ch. 12 Ex. 12.3 — the unitary method — web-checked, key ncert-math6-ch12 extended to Ex. 12.3; NCERT class-7 science "Motion and Time" web-checked — new citation key ncert-sci7-motion; Khattar speed/unitary-method exam staples), lesson 6.3 (no downloads; NCERT class-6 ch. 12 §12.2 "Proportion" + Ex. 12.2 web-checked, key ncert-math6-ch12 extended to §12.2/Ex. 12.2; Khattar ratio-proportion exam staples) · FM ch. 7 (unit 7): lessons 7.1–7.4 (no downloads; NCERT Ganita Prakash class-6 ch. 10 + class-7 part-2 ch. 2 web-checked — new keys ncert-math6-ch10, ncert-math7-p2-ch2; Brahmagupta/Argand/Weierstrass history web-checked; Khattar integer exam staples) · FM ch. 8 (unit 8): lesson 8.1 (no downloads; NCERT class-6 ch. 4 + class-9 ch. 5 web-checked — new keys ncert-math6-ch4, ncert-math9-ch5; Euclid Elements facts web-checked against Joyce's Clark U. edition), lesson 8.2 (no downloads; NCERT Ganita Prakash class-6 ch. 2 "Lines and Angles" web-checked — new key ncert-math6-gp-ch2; key ncert-math6-ch4 extended toward §4.9 angles; Huddart 1801 protractor per Britannica; Khattar clock/angle staples), lesson 8.3 (no downloads; NCERT Ganita Prakash class-7 ch. 5 "Parallel and Intersecting Lines" + class-9 ch. 6 "Lines and Angles" web-checked — new keys ncert-math7-gp-ch5, ncert-math9-ch6; Euclid Postulate 5 + I.27/I.29 re-checked against Joyce's Clark U. edition; Playfair 1795/Ludlam 1785/Proclus + Lobachevsky–Bolyai history web-checked; Khattar transversal/angle-chase staples), lesson 8.4 (no downloads; NCERT class-7 ch. 6 web-checked — new key ncert-math7-ch6; Euclid I.32 + Proclus corollaries + the Gauss legend per Buhler re-checked), lesson 8.5 (no downloads; Ganita Prakash class-6 ch. 6 + class-7 ch. 11 + the class-7 exemplar gemp109 web-checked — new keys ncert-math6-gp-ch6, ncert-math7-ch11; Archimedes' 96-gon bounds, Zu Chongzhi's Milü, Aryabhata's rule, Jones 1706/Euler, Lambert 1761/Lindemann 1882 web-checked; Khattar mensuration exam staples) · FM ch. 9 (unit 9): lesson 9.1 (no downloads; NCERT Curiosity class-6 science ch. 5 + class-11 physics ch. 2 web-checked — new keys ncert-sci6-curiosity-ch5, ncert-phys11-ch2; the cubit/Maya's rod 52.3 cm, the barleycorn inch, the honest Henry-I yard legend, the Metre Convention 1875/BIPM Sèvres, SI 1960, India 1956/1960/2009 web-checked; Khattar unit-identification exam staples), lesson 9.2 (no downloads; the metric history web-checked — new keys wikipedia-metre-history, usma-1795-decree, sizes-litre-1964, ncj-measuring-the-meter: the metre's three bodies, the 1795 decree, the litre's 1901→1964 drift, the 0.02% honest caveat, the decimal day; the prefix ladder and the litre bridge are original exposition on the carried NCERT keys), lesson 9.3 (no downloads; carried keys only — the factor-licence method is original exposition; Khattar conversion exam staples), lesson 9.4 (no downloads; NCERT class-6 ch. 1 §1.3 estimation/rounding web-checked — new key ncert-math6-ch1; the accuracy/precision definitions carried on ncert-phys11-ch2; the Everest 1856 announcement 29,002 ft + the 2020 China–Nepal 8,848.86 m web-checked, the 0.102% relative error recomputed in verify-unit-9.ts; Khattar rounding/estimation exam staples) · FM ch. 10 (unit 10): lesson 10.1 (no downloads; NCERT Ganita Prakash class-6 ch. 4 Data Handling and Presentation web-checked — new key ncert-ganita-prakash6-ch4; the Ishango bone + the Exchequer tally sticks + the 1834 Westminster fire web-checked with hedges; Khattar data-table exam staples), lesson 10.2 (no downloads; the bar/line/pie charter carried on ncert-ganita-prakash6-ch4 + a new key ncert-math8-ch4 — NCERT class-8 ch. 4 Data Handling: the circle graph/pie chart and the central-angle-as-fraction-of-360° canon; Playfair 1786/1801 and Nightingale's 1858 rose diagram web-checked per Wikipedia/IBCS/Bellhouse; Khattar data-interpretation staples), lesson 10.3 (no downloads; new key huff-1954-lie-with-statistics — the critical-reading tradition mirrored; every lying chart drawn from the book's own tiny data, none reproduced; Khattar DI staples) | yes — after each unit's verification (run 12 deleted its working copies after E2E, per the per-lesson pattern) | foundation-mathematics COMPLETE (**11/11 chapters — the book closed by run 47 (2026-11-05): ch. 11 Patterns and the Doorstep of Algebra COMPLETE 3/3 (11.2 From Patterns to Formulas + 11.3 A Letter for the Unknown shipped verify-first; the unit-11 completion review passed; the book stands 48 lessons / 227,569 words / 355 terms / 240 quiz / 534 exercises); the next book (Arithmetic and Number Systems) begins at its research phase**) · arithmetic-and-number-systems IN PROGRESS — ch. 1 The Natural Numbers as a System **COMPLETE 3/3** (runs 49–50, 2026-11-05: lessons 1.1 + 1.2 + 1.3 shipped verify-first, the unit-1 completion review passed; the book stands 3 lessons / 16,921 words / 24 terms / 15 quiz / 36 exercises; chapter 2 opens at run 51). No downloads either run — the reserved key beck-geoghegan-art-of-proof + run 49's two keys (peano-1889-arithmetices, induction-name-history) + run 50's two keys (cantor-1883-grundlagen, fibonacci-1202-liber-abaci) carried the unit; working-copy footprint zero. Ch. 2 The Division Algorithm and the Structure of Divisibility **IN-PROGRESS 2/4** (run 51, 2026-11-05: lessons 2.1 Division with Rest: The Division Algorithm + 2.2 The Algebra of Divisibility shipped verify-first, verify-book2-ch02.ts 166 checks with two pre-writing defects caught; 2.3 + 2.4 close the chapter at run 52). No downloads — the reserved key beck-geoghegan-art-of-proof + Khattar's banked ch. 1 scope carried the unit, plus run 51's two new keys (euclid-elements-book-vii web-checked via Joyce's Clark U. Book VII edition; landau-1927-elementare web-checked via MacTutor's number-theory-symbols page, Hardy's unpublished 1925 seminar notes the earlier echo); the algorithm-name history (Algoritmi ← al-Khwārizmī) carried on run 47's web-check; working-copy footprint zero |
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
