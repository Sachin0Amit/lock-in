# SPEC geo202-S1 — PROSE SEAT, lesson 2.2 "Parallel Lines and the Fifth Postulate" (run 127 salvage, GEOMETRY ch.2)

You are authoring agent geo202-s1 (Task ID 127-a) for the LockIn Library. Your ONLY
deliverable is the file `docs/research/geo-ch02-wip/part-geo202.ts`, grown IN PLACE from
its current state (outline items 1-2 already written, ~1,100 words, full geo22 helper
suite already defined at the top). You complete the PROSE HALF: outline items 3-8 below,
plus the terms block, the formula cards, two example blocks and the three body figures.
Another agent owns the quiz + exercises + coda — do NOT write them. Leave the
`/* === END OF BLOCKS ... === */` marker as the last thing inside the blocks array.

Report (final message): file path, added word count and total word count, the engine
pin lines that flipped green, figure/example/derivation/formula/terms counts.

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~30 minutes from now. APPEND SECTION BY SECTION — after each
  outline item, SAVE the file (it must stay valid TypeScript at every save). Never one
  giant write at the end. If time runs short, SAVE WHAT EXISTS on disk.
- After each append, run: `cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo202.ts`
  and watch the PINS section: your work flips P04a (>=3 body figures), P05 (terms >=6),
  P06 (>=3 formula cards), P07 (word count — you are aiming the TOTAL >= 6,000; add
  >= 5,200 words), P16 (>=2 examples with >=4 steps), P17 (>=2 derivations), P18 (exam
  callout) to green. P02a/P03a/P09a (quiz/exercises/5th SVG) STAY RED — the back half
  is another seat's deliverable. ENGINE (30 checks) must stay green — it already is.

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH02_MASTER_PLAN.md` (chapter arc + BINDING label convention + ground-truth register)
- `/home/z/my-project/docs/research/geo-ch02-wip/spec-geo202.md` (the base spec — your items 3-8 are its items 3-8)
- `/home/z/my-project/docs/research/geo-ch02-wip/v-geo202.ts` (the engine — the pinned witnesses E1-E30 and the pin contract)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo202.ts` (YOUR file — items 1-2 written, helpers ready)
- `/home/z/my-project/docs/research/geo-ch01-wip/part-geo103.ts.txt` (exemplar — same book, house voice)

## CONTENT TO WRITE (pinned — items 3-8 of the base spec)
3. **The fifth postulate, restated in our own words** (a `derivation`-flavored reading
   of Euclid's statement): two lines cut by a transversal whose same-side interior
   angles sum to less than 180 degrees meet on that side; summing to exactly 180 on
   both sides is the parallel case. The side-logic arithmetic (PINNED, engine E-witnesses):
   the two same-side sums add to 360 (two linear pairs along the transversal — licensed
   from 2.1); sweep values 170/190, 118.25/241.75, 90/270; sum 170 ⟹ meet on the 170
   side; 180/180 ⟹ parallel. Body figure F1: the two lines, the transversal, the
   same-side interior angles shaded on the light side, the meeting side marked.
4. **The historical unease** (ground register in the master plan): Proclus (c. 450 CE)
   argued the postulate "ought even to be struck out of the Postulates altogether; for
   it is a theorem involving many difficulties" — quote it exactly; the two-millennium
   proof hunt; Saccheri 1733 (his almost-discovery, banked by 1.2); the denouement named
   (Lobachevsky 1829, Bolyai 1832 — the full door belongs to ch.11). Year ladder PINNED:
   450 -> 1733 (1283 years) -> 1795 (62) -> 1829 (34) -> 1832 (3).
5. **Playfair's axiom (1795)**: through a point P not on a line l there is EXACTLY ONE
   line parallel to l. The existence half and the uniqueness half — the "there is
   exactly one" quantifier from lesson 1.3 doing real work. The EQUIVALENCE with the
   fifth postulate: one direction PROVED as a worked `derivation` block (fifth ⟹
   Playfair: given the interior-angle condition, the line through P making same-side
   sums 180 exists and is unique among parallels — sketch each license honestly); the
   converse direction honestly SKETCHED (flagged as a sketch, not a proof — ch.11
   machinery). Body figure F2: P above l, the unique parallel through P drawn bold,
   the near-miss lines through P (they tilt toward l and must meet — meeting points
   marked), and one greyed "never meets" line labeled as the hyperbolic tease.
6. **The parallel census across the three geometries** (trichotomy table, PINNED):
   Euclidean — exactly 1 parallel through P; spherical — 0 (any two distinct great
   circles meet in exactly 2 antipodal points; the flight-path aside: airplane routes
   as great circles); hyperbolic — infinitely many. A `table` block, honestly labeled
   as the ch.11 preview.
7. **Distance between parallels**: the common perpendicular; in Euclidean geometry
   every perpendicular segment between two parallels is EQUAL (the equidistant
   character); the honest note that this is itself equivalent to the fifth postulate —
   in hyperbolic geometry non-meeting lines are NOT equidistant (the gap grows). Body
   figure F3: the strip of equal perpendiculars between two parallels, beside a circle
   with its non-parallel "latitude" chords as the counter-picture.
8. **Exam callout** (a `callout` block, tone 'exam'): identifying WHICH form of the
   postulate a statement uses; the "exactly one" quantifier trap (zero? one? many?);
   same-side interior sums and the meet-side verdict.
- **Examples (>= 2, each a `example` block with >= 4 numbered steps)**: (a) from a
  same-side sum, the meet-side verdict with reasons; (b) the Playfair uniqueness walk —
  eliminate the tilting lines one by one.
- **Terms block** (>= 6 items) and **formula cards** (>= 3, e.g. same-side sums add to
  360; sum < 180 ⟹ meet that side; Playfair's "exactly one"), placed like the banked
  2.4 does: formula cards interleaved in the prose where earned, the terms block at the
  very end of your prose (the quiz/exercises/coda splice in after it).

## FORMAT LAW (binding — identical to the base spec)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` inside `$...$`; no `$$`;
SVG text PLAIN (minus is U+2212, never a hyphen directly before a digit); vivid palette
ONLY (the c22 hexes already defined — no new hex values outside the engine's allowed
set); aria-label on every SVG root; stroke-width >= 1.2; font-size 11-14.5; no label
clipping the viewBox (estimate 0.62em per char). Use the existing geo22 helpers; keep
`const c22` / `const f22` as the only palette/font. Do not add a `words` field. Every
figure needs an accurate `caption` and must be referenced by the surrounding prose.
