# SPEC geo101 — lesson 1.1 "The Undefined Words and the Defined Ones" (run 124, GEOMETRY ch.1)

You are authoring agent geo101 for the LockIn Library. Your ONLY deliverables:
1. `temporary-references/v-geo101.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `temporary-references/part-geo101.ts` — the lesson object, ≥6,000 words
Report (final message): file paths, engine score X/X GREEN, word count, quiz key, figure counts.

## READ FIRST (in this order, before any writing)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md` — the authoring contract (blocks, Cengage voice, vivid palette table, raw-TeX rules)
- `/home/z/my-project/src/data/library/types.ts` — the Lesson/Block type (interface Lesson at line 93)
- `/home/z/my-project/docs/research/GEO_CH01_MASTER_PLAN.md` — the chapter plan + verified ground (your facts come from here; do not invent)
- `/home/z/my-project/docs/research/aa-ch10-wip/part-aa101.ts.txt` — the STYLE exemplar (part file: palette consts C/FONT, SVG helper, blocks)
- `/home/z/my-project/docs/research/aa-ch10-wip/v-aa101.ts.txt` — the ENGINE exemplar (structure of engine+pin harness)
- `/home/z/my-project/temporary-references/pin_check_geo124.py` — the pre-flight pins already run GREEN (your engine may reuse its computed witnesses)

## LESSON OBJECT (pinned)
- `id: 'geo-the-undefined-words-and-the-defined-ones'`, `number: '1.1'`, `title: 'The Undefined Words and the Defined Ones'`
- `concepts`: 5–8 phrases (undefined terms, point, line, plane, incidence, defined terms, dimension)
- `prerequisites: []` (this is the book's first lesson; mention FM 8 in prose as recalled intuition, but no chip)
- `sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen']`
- `objectives`: 4–6 "by the end you will be able to…" items

## CONTENT OUTLINE (the title is a promise; the blocks keep it)
1. **Opening motivation** (no definition first): every subject must start somewhere; mathematics starts by CHOOSING what it will not define. The child's "what is a point?" meets a professional silence — and that silence is the most powerful move in mathematics.
2. **Euclid's attempt** (c. 300 BC, *Elements* Book I, 13 books total): his Definitions 1, 2, 4, 7 quoted-in-paraphrase (a point is that which has no part; a line is breadthless length; a straight line lies evenly with the points on itself; a plane surface lies evenly with the straight lines on itself) — and WHY they fail as definitions: each leans on words more primitive than the word defined ("part", "breadth", "length", "lies evenly"). A definition chain must end; Euclid's chain ends in descriptions of the undefined.
3. **The three undefined words + the hidden fourth**: point, line, plane — and the primitive RELATIONS (lies on / contains / betweenness / congruence): the axioms of ch.1 speak only through them. Hilbert's 1899 *Grundlagen der Geometrie* made this explicit: three primitive words, three primitive relations (incidence, betweenness, congruence). The beer-mug remark: as Hilbert put it (recalled by his student Otto Blumenthal), one must always be able to say "tables, chairs, beer mugs" instead of "points, lines, planes" — the WORDS carry no meaning; the AXIOMS carry everything. (Study-never-reproduce: all phrasing ours.)
4. **The defined ones** — built upward from the primitives: segment (two points + the betweenness territory), ray, collinear/non-collinear, intersect, parallel (Euclid Def 23 paraphrase: same plane, never meet either direction), the dimensional ladder point=0 / line=1 / plane=2 / space=3. Each new word defined ONLY from undefined words + earlier defined words (the no-circularity law). Language discipline: "lies on" synonyms (contains, passes through, incident with) and the pin: a segment has 2 endpoints, a ray has 0 endpoints in its far direction + 1 origin, dimension tuple (0,1,2,3) — all pinned by the engine.
5. **Why not define them anyway?** The regress argument (each definition needs more primitive words — infinite regress or circularity); the model argument (many interpretations satisfy the same axioms — the words are labels, the STRUCTURE is the subject).
6. **A table**: the census of words — three undefined words, the primitive relations, the defined words built this lesson (with the "built from" column).
7. **Illustrations** (example blocks, Cengage chain): (a) classify a list of candidate words (point, segment, breadthless, line, plane, betweenness…) as undefined/defined with reasons; (b) exam-shaped: build the definition of "ray" and "segment" from primitives and detect the circular definition planted in a candidate list (a definition that uses the word being defined or an undefined-backward chain).
8. **Exam callout**: the axiomatic-foundations angle appears in olympiad logic/proof questions and in university bridge courses; school exams ask the classification (which words are assumed).
9. **Figures** (≥3 body, computed SVG): (F1) the word-tower — undefined base (point/line/plane) with defined words stacked above, arrows "defined from"; (F2) the dimensional ladder 0/1/2/3 with a point, line, plane, space panel each; (F3) the incidence picture — a point lying on a line, a line lying in a plane (labels match prose terms exactly). Solution figures: ≥2 inside exercise solutions (e.g. the classification answer as a sorted diagram; the circularity trap drawn as a loop).
10. **Quiz**: 5 MCQs, wrong options carry why-they-fail explains. Report your key (e.g. [1,0,3,2,0]).
11. **Exercises**: 15 questions, levels L1–L6 spread, EVERY question a full worked solution as a steps array (Cengage chain: first line sets up, one move per line, Hence/∴ terminal answer), 2+ solution figures, every printed number engine-verified.

## FORMAT LAW (binding; violations = failed run)
- Blocks per BOOK_FORMAT.md; Cengage voice: definitions open "X is said to be … if …" + symbolic restatement; example runs use list marker 'roman' (i)(ii)(iii); "Properties of …" plain bullets.
- Result boxes: math inside `$...$` clause-wise; derivation titles and step labels PLAIN words. NO `\qquad` inside any `$...$` span. No raw TeX outside $...$. No `$` inside SVG text; SVG text PLAIN, minus as U+2212 (−).
- Figures: inline SVG, viewBox, aria-label, vivid palette hexes ONLY from BOOK_FORMAT table (#16a34a #166534 #65a30d #0d9488 #0f766e #d97706 #ea580c #dc2626 #fef3c7 #ffedd5 #fcd34d #5eead4 #ffffff + currentColor), strokes ≥1.2, text-anchor managed, no text clipping at 780px width — labels short, font sizes 11–14.5.
- Quiz/exercise answer indices MUST point at intended options.
- Word floor: `countLessonWords` ≥ 6,000 (the engine checks; prose-first — write fully, never thin).
- File shape: `import type { Lesson } from '../src/data/library/types'` then `const C = {...}` + `const FONT = '...'` + SVG helpers (prefix every helper name with `geo11`) + `export const lessonGeo101: Lesson = {...}`.

## ENGINE LAW (verify-first)
Write `temporary-references/v-geo101.ts` FIRST with: an **ENGINE section** (pure arithmetic/logic, NO repo imports) recomputing every witness you will print: the dimension tuple, endpoint counts, the regress/circularity case checks (a chain checker: given a definition graph, detect cycles), the Euclid census (Book I: 23 definitions/5 postulates/5 common notions/48 propositions — asserted pins), the quiz key self-check, the exercise-witness numbers. Run `cd /home/z/my-project && bun run temporary-references/v-geo101.ts` — engine ALL GREEN. THEN write the prose part file. THEN extend the v-file with a **PIN section** that `import { lessonGeo101 } from './part-geo101'` + `countLessonWords` and audits: word count ≥6000, quiz key == intended options, 15 exercises each with a steps-array solution, ≥3 body figures + ≥2 solution figures, `terms` present, no `\qquad` inside `$...$` spans (regex over the JSON dump), no `$` inside any `<text>`, lesson id/number/title exact, sources exact. Run again — ALL GREEN. The engine wins over the prose: any disagreement, fix the prose.
