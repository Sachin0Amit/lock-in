# GEO CH.1 MASTER PLAN — "Points, Lines and Planes: the Axiomatic Idea"

Run 124 (2026-11-25), the maths lane, whole-chapter cadence. Four lessons, one
agent each, chapter closed COMPLETE in this run. Book: geometry (book #5 of the
mathematics shelf; verifier `scripts/verify-book5-ch01.ts`; ids carry the `geo-`
prefix — verified unused by run-124 pre-flight grep and by the shelf gate's
reservation list).

## The chapter's job (from book.ts summary)

Geometry restarts from zero — not from shapes but from RULES. The undefined
words, the definitions that ride on them, Euclid's five postulates as the rules
of the game, and the axiomatic method itself: a statement is believed only when
proved. FM 8's shape vocabulary is the intuition this structure formalises.

## Lesson map (one agent per seat)

| Seat | Number | Title | id (pinned) |
|---|---|---|---|
| geo101 | 1.1 | The Undefined Words and the Defined Ones | `geo-the-undefined-words-and-the-defined-ones` |
| geo102 | 1.2 | Euclid's Five Postulates: the Rules of the Game | `geo-euclids-five-postulates-the-rules-of-the-game` |
| geo103 | 1.3 | Axioms, Theorems and the Shape of a Proof | `geo-axioms-theorems-and-the-shape-of-a-proof` |
| geo104 | 1.4 | Incidence: how Points, Lines and Planes Interlock | `geo-incidence-how-points-lines-and-planes-interlock` |

No 1.R review exists in the chapter plan (the book's plannedLessons array for
ch.1 carries exactly the four titles above) — the chapter closes at 1.4.

## Verified ground (web-checked this run; SOURCE_LOG carries URLs)

- Euclid, *Elements*, c. 300 BC, 13 books. Book I structure: **23 definitions,
  5 postulates, 5 common notions, 48 propositions** (Joyce's online edition,
  clarku.edu — read this run). Definition 1: "A point is that which has no
  part"; Def 2: "A line is breadthless length"; Def 4: straight line "lies
  evenly with the points on itself"; Def 7: plane surface; Def 23: parallel
  lines (same plane, never meet either direction). Postulate 1: draw a straight
  line from any point to any point; P2: produce a finite straight line
  continuously; P3: describe a circle with any centre and radius; P4: all
  right angles are equal; P5: the two-right-angles meeting clause (the
  transversal configuration with interior angles on one side summing to less
  than two right angles forces a meeting on that side).
- Hilbert, *Grundlagen der Geometrie* (1899): three primitive words
  (point, line, plane) + three primitive relations (incidence, betweenness,
  congruence); five axiom groups — incidence (I.1–I.8), betweenness
  (II.1–II.4, Pasch as II.4), congruence (III.1–III.6), parallels (IV.1,
  Playfair's form), continuity (V.1–V.2, Archimedean + completeness). The
  original 1899 edition carried a 21st axiom (old II.4, Pasch's theorem),
  proved redundant by E. H. Moore (1902). The full rulebook is ch.11's
  lesson; ch.1 prints the three PLANAR incidence axioms only and never a bare
  grand total. Ch.1 also records: deleting the five essentially-spatial axioms
  (I.4–I.8) and rewording III.4/IV.1 planar yields plane geometry.
- Playfair's axiom: John Playfair, *Elements of Geometry* (Edinburgh, 1795) —
  through a point not on a line there is at most one parallel to it (Hilbert's
  IV.1 is this form; verified on the Hilbert-axioms listing).
- Chronology (each date web-verified): Euclid c. 300 BC; Proclus's commentary
  on Book I (5th century AD) already records controversy over the fifth;
  Saccheri's *Euclides ab omni naevo vindicatus* 1733 (the honest reductio that
  nearly discovered non-Euclidean geometry); Playfair 1795; Lobachevsky's "On
  the Principles of Geometry" 1829 (Kazan Messenger — first published
  non-Euclidean geometry); Bólyai's Appendix 1832 (in his father Farkas
  Bólyai's *Tentamen*); Hilbert 1899; E. H. Moore's redundancy proof 1902.
  Beltrami/Riemann chronology rides ch.11, not this chapter.
- The Hilbert "tables, chairs, beer mugs" remark on undefined terms: reported
  by his student Otto Blumenthal (recorded in Blumenthal's biographical note;
  standard citation: Constance Reid, *Hilbert*). Lesson 1.1 attributes it
  honestly as "recalled by his student Otto Blumenthal".
- Fano plane: named for Gino Fano (first written down 1892); the smallest
  finite projective plane — 7 points, 7 lines, 3 points on every line, 3 lines
  through every point, every two points on exactly one line, every two lines
  meeting in exactly one point (Wikipedia, Fano plane). Used in 1.4 as the
  model showing incidence alone does not force parallels.
- The four-point affine plane (built, not cited): 4 points, the 6 pair-lines,
  2 points per line, 3 lines through each point, 3 parallel classes of 2 lines
  — all computed brute-force in the pin checker.
- de Bruijn–Erdős (1948): every n points, not all collinear, determine at
  least n distinct lines (N. G. de Bruijn & P. Erdős, "On a combinatorial
  problem", Indagationes Mathematicae 10, 1948). Pinned as a named theorem in
  1.4; the exact boundary cases (n−1 collinear + 1 off ⇒ exactly n) computed.
- NCERT class 9 (rationalized): "Introduction to Euclid's Geometry" is the
  school-canon chapter this book's ch.1 modernises (web-checked 2026-11-10 per
  book.ts research notes — the repo's own record; not re-verified this run).

## What each lesson must carry (the anatomy bar + house voice)

Every lesson: opening motivation (no definition first), `definition` callouts
for every named object, at least one `derivation` where a proof can be owned,
≥2 `example` blocks (Illustrations) with full Cengage-chain solutions (the
second exam-shaped), ≥3 body `figure`s (inline SVG, vivid palette, computed
coordinates, aria-labels), a `table` for any census, `terms` block, `formula`
cards where identities exist, a 5-item `quiz` (wrong options carry why-they-
fail explains), an `exercises` block of **15 graded questions L1–L6 with full
worked solutions as steps arrays**, **3–4 solution figures** across those
solutions, exam callout mapping to real examinations, ≥6,000 words. No
`\qquad` inside any `$...$` span (the run-123 law). SVG text stays PLAIN (no
TeX/$; U+2212 minus). Result boxes carry `$...$` clause-wise.

## Verify-first census (pin_check_geo124.py, run green BEFORE specs)

Brute-forced this run and pinned into the four engines: the C(n,2) line-count
table (3→3 … 8→28); the four-point affine plane (6 lines, parallel classes,
3-through-each); the Fano plane (7 triples, pair-incidence 1, line-pair meets
1, 3+3 census); the non-models (a uniqueness-violating config; a one-point
line config); truth-table identities (P⇒Q ≡ ¬P∨Q; contrapositive equivalence;
converse NOT equivalent — with the worked counterexample P false); the
extendability no-last-point argument; C(n,2) = n(n−1)/2 values; the "n−1
collinear + 1 off" exact-n census; the max-collinear sweep; quiz keys
(agents' own keys, engine-checked against intended options before ship).

## Ship shape

- `src/data/library/books/mathematics/geometry/ch-01.ts` — four lessons +
  `chapter1` export; book.ts chapter 1 flips to `complete` (import swap),
  book status `in-progress`.
- `scripts/verify-book5-ch01.ts` — five sections (geo101..geo104 engines+pins
  re-reading the shipped chapter, via the assemble script's import redirect)
  + section Z closed-chapter census (4 lessons, 0 planned, status complete).
- Standing gates re-pinned honestly: math shelf A (4 complete + 1 in-progress
  geometry + 23 planned), E (geo- prefix moves to the in-use list).
- lib:pack + lib:check; topic-coverage; toc-as-lessons; E2E ×4 lessons ×3
  viewports; VLM light+dark; ledgers; commit; PAT push; ls-remote verify.
