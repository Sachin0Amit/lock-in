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

## Per-subject ledger

| Subject | Books identified | Downloaded (MB) | Used for | Local copies deleted | Book status |
|---|---|---|---|---|---|
| mathematics | Khattar QA 4e (+ NCERT web outlines ch. 1 + ch. 2 + ch. 3 + ch. 7 + class-7 ch. 2 + class-6 ch. 8 + class-7 ch. 3 + class-7 ch. 8 §§8.3–8.6 + class-8 ch. 8 §§8.2–8.4 + class-9 ch. 1 + class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2; CBSE-aligned BODMAS web-check) | 33.9 × 7 (units 1–3 re-downloads + run 12 for ch. 4 fraction material) | FM ch. 1 (unit 1): lessons 1.2, 1.3 · FM ch. 2 (unit 2): lessons 2.1–2.5 (2.5 studied Khattar ch. 4 BODMAS) · FM ch. 3 (unit 3): lessons 3.1–3.5 (Khattar ch. 1 divisibility/primes + ch. 2 HCF/LCM incl. Illustration 14) · FM ch. 4 (unit 4): lesson 4.1 (Khattar ch. 1 fraction exam items mined — SSC CGL Tier-II 2018 + SSC MTS 2017 comparisons cited in the exam callout; ch. 2's HCF/LCM-of-fractions rules banked for 4.5), lessons 4.2–4.4 (no downloads; NCERT web checks), lesson 4.5 (no downloads; NCERT class-7 ch. 2 web-checked — new citation key; Khattar's banked fraction rules cashed) · FM ch. 5 (unit 5): lesson 5.1 (no downloads; NCERT class-7 ch. 3 + class-6 ch. 8 web-checked — two new citation keys; Khattar decimal-fraction exam items), lesson 5.2 (no downloads; NCERT class-9 ch. 1 + class-6 ch. 8 web-checked — new citation key ncert-math9-ch1; Khattar recurring-conversion shortcuts and comparison traps), lesson 5.3 (no downloads; NCERT class-6 ch. 8 + class-7 ch. 2 §§2.3–2.4 web-checked; Khattar point-hop family), lesson 5.4 (no downloads; NCERT class-7 ch. 8 §§8.3–8.4 web-checked — new citation key ncert-math7-ch8; Khattar percent conversion items), lesson 5.5 (no downloads; NCERT class-7 ch. 8 §§8.5–8.6 + class-8 ch. 8 §§8.2–8.4 web-checked — new citation key ncert-math8-ch8; Khattar percentage/profit-loss exam staples) · FM ch. 6 (unit 6): lesson 6.1 (no downloads; NCERT class-6 ch. 12 §12.1 + class-7 ch. 8 §§8.1–8.2 web-checked — new citation key ncert-math6-ch12, ncert-math7-ch8 extended; Khattar ratio exam staples), lesson 6.2 (no downloads; NCERT class-6 ch. 12 Ex. 12.3 — the unitary method — web-checked, key ncert-math6-ch12 extended to Ex. 12.3; NCERT class-7 science "Motion and Time" web-checked — new citation key ncert-sci7-motion; Khattar speed/unitary-method exam staples), lesson 6.3 (no downloads; NCERT class-6 ch. 12 §12.2 "Proportion" + Ex. 12.2 web-checked, key ncert-math6-ch12 extended to §12.2/Ex. 12.2; Khattar ratio-proportion exam staples) | yes — after each unit's verification (run 12 deleted its working copies after E2E, per the per-lesson pattern) | foundation-mathematics in-progress (**5/11 chapters complete; ch. 6 open 3/5 at 6.3, run 29**) |
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
