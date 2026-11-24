# SPEC geo102 — lesson 1.2 "Euclid's Five Postulates: the Rules of the Game" (run 124, GEOMETRY ch.1)

You are authoring agent geo102 for the LockIn Library. Your ONLY deliverables:
1. `temporary-references/v-geo102.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `temporary-references/part-geo102.ts` — the lesson object, ≥6,000 words
Report (final message): file paths, engine score X/X GREEN, word count, quiz key, figure counts.

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH01_MASTER_PLAN.md` — the verified ground (Euclid census, the five postulates' content, Playfair 1795, the chronology; your facts come from here — do not invent)
- `/home/z/my-project/docs/research/aa-ch10-wip/part-aa101.ts.txt` (style exemplar) + `/home/z/my-project/docs/research/aa-ch10-wip/v-aa101.ts.txt` (engine exemplar)
- `/home/z/my-project/temporary-references/pin_check_geo124.py` (pre-flight pins GREEN; reuse its witnesses)

## LESSON OBJECT (pinned)
- `id: 'geo-euclids-five-postulates-the-rules-of-the-game'`, `number: '1.2'`, `title: 'Euclid\u2019s Five Postulates: the Rules of the Game'`
- `concepts`: 5–8 (postulate, common notion, straightedge, compass, parallel postulate, two right angles, construction, extendable line)
- `prerequisites: ['geo-the-undefined-words-and-the-defined-ones']`
- `sources: ['geo-euclid-elements', 'geo-playfair-1795', 'geo-non-euclid-chronology']`

## CONTENT OUTLINE
1. **Opening motivation**: 23 definitions described the vocabulary, but geometry needs PERMISSION — statements that say what may be DONE and what may be ASSUMED. Euclid's move: keep the list as short as five. Why five?
2. **The two lists**: postulates (geometry-specific assumptions) vs common notions (general truths about equality). Euclid Book I's census: 23 definitions + 5 postulates + 5 common notions feeding 48 propositions. The five common notions paraphrased in OUR words (CN1 equals-to-the-same; CN2 add-equals-to-equals; CN3 subtract-equals-from-equals; CN4 coinciding-implies-equal; CN5 whole-greater-than-part).
3. **The five postulates, one by one** (paraphrase, study-never-reproduce; Joyce's translation consulted, our words):
   - P1 (the joiner): a straight line can be drawn joining any point to any point. Buys: lines exist on demand.
   - P2 (the extender): any finite straight line can be extended continuously in a straight line. Buys: no last point; a line is an operation, not an object of fixed length. NOTE the subtlety: extending ≠ re-drawing at will.
   - P3 (the circler): a circle can be drawn with any centre and any radius. Buys: the compass is licensed — together with P1/P2 this is the ruler-and-compass charter (straightedge + compass; what each tool does).
   - P4 (the uniform ruler): all right angles are equal to one another. Buys: an absolute measure — any right angle anywhere is the same angle; the grid of the plane is uniform.
   - P5 (the parallel clause): if a line crossing two lines makes the interior angles on one side sum to less than two right angles ($180°$), the two lines extended far enough MEET on that side. The odd one out: longest, constructive-negative, about the unobservable far-away. The $180°$ arithmetic pinned: $90°+90°$ boundary, shortfall examples ($170°$ short of $180°$ by $10°$; $110°$ short by $70°$).
4. **What the rules buy together**: Book I's 48 propositions built from these + the definitions + common notions; I.1 (equilateral triangle on a given segment) as the opening proposition the two tools can build; the shape of the game — prove everything else.
5. **The fifth postulate's two-thousand-year trial**: Proclus's commentary (5th c.) already records the doubters; the honest reductio of Saccheri (1733) that nearly built a non-Euclidean geometry; the resolution: the fifth is INDEPENDENT — Lobachevsky (1829, Kazan Messenger, first published non-Euclidean geometry) and Bólyai (1832, the Appendix) published geometries where it FAILS; Playfair (1795) gave the through-a-point-at-most-one-parallel form the modern texts use (ch.2 will adopt Playfair's form; ch.11 owns the full equivalents + the non-Euclidean door). Hilbert (1899) rebuilt the rules cleanly. History verified, not folklore.
6. **Exam callout**: postulate-vs-common-notion classification and "which postulate licenses this step?" are the classic assessment shapes.
7. **Illustrations** (Cengage chain): (a) classify five statements as postulate/common notion/definition with reasons; (b) exam-shaped: given four constructions ("join A to B", "extend AB beyond B to C", "draw the circle centred at A through B", "drop the perpendicular"), name the postulate licensing each.
8. **Figures** (≥3 body): (F1) the five-postulate gallery — five mini-panels, one line/arc each, computed coordinates; (F2) the fifth-postulate configuration — transversal r crossing lines m, n, interior angles $α, β$ marked on one side with $α+β<180°$, arrows to the meeting point X on that side (true-to-scale drawing: choose $α=100°$, $β=70°$ shortfall $10°$ — the drawing recomputes the geometry from those angles); (F3) the Book-I pyramid — 23+5+5 at the base, 48 propositions above, the 13-book Elements at the cap. Solution figures ≥2 (e.g. the classification flowchart; the construction-licence arrows).
9. **Quiz**: 5 MCQs with why-they-fail explains; report the key.
10. **Exercises**: 15 questions L1–L6 with full steps-array solutions; witnesses: the $180°$ shortfall arithmetic; P1–P5 identification; CN1–CN5 application micro-checks (e.g. CN2 on concrete equal segments; CN5 "whole greater than part" census); the circle-construction record (centre, radius, radius equality checks) — every printed number engine-verified.

## FORMAT LAW (binding — see spec-geo101.md if unsure; identical rules)
Cengage voice; result math inside `$...$` clause-wise; no `\qquad` in `$...$`; SVG text PLAIN (no $, U+2212 minus); vivid palette hexes only; aria-labels; quiz/exercise indices point at intended options; ≥2 `example` blocks (second exam-shaped); `terms` block; `formula` cards for the two-right-angles identity ($α+β<180°$ ⟺ meet on that side) and the shortfall identity ($180°-(α+β)$); ≥6,000 words; `const C` + `const FONT` + helpers prefixed `geo12` + `export const lessonGeo102: Lesson`.

## ENGINE LAW (verify-first — identical to spec-geo101)
`temporary-references/v-geo102.ts`: ENGINE section first (pure logic/arithmetic, no repo imports): the $180°$ shortfall table, the five-postulate identification checker (each construction mapped to its postulate — assert the mapping you will print), the CN application witnesses, the chronology tuple (1733, 1795, 1829, 1832, 1899), the Euclid census pins, quiz-key self-check, exercise witnesses. Engine ALL GREEN → prose → PIN section importing `./part-geo102` auditing: word count ≥6000, quiz key, 15 exercises with steps solutions, ≥3 body + ≥2 solution figures, terms present, no-\qquad-in-math scan, no-$-in-SVG-text scan, id/number/title/sources exact. ALL GREEN. Engine wins; fix prose to engine values.
