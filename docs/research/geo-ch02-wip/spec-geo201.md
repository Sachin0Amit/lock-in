# SPEC geo201 — lesson 2.1 "Angles: Types, Pairs and Measures" (run 126, GEOMETRY ch.2)

You are authoring agent geo201 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch02-wip/v-geo201.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch02-wip/part-geo201.ts` — the lesson object, >= 6,000 words (target 8,500+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~30 minutes from now. ENGINE FIRST: write `v-geo201.ts`, run it, get the ENGINE section ALL GREEN **before any prose**. Then write `part-geo201.ts` SECTION BY SECTION (Write the skeleton with the opening blocks first, then append each section as you draft it) — never one giant write at the end. If time runs short, SAVE WHAT EXISTS on disk; a partial part file beats an empty death. The orchestrator can salvage from disk; nothing can be salvaged from a dead channel.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo201.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH02_MASTER_PLAN.md` (the chapter arc + the BINDING label convention + the ground-truth register)
- `/home/z/my-project/docs/research/geo-ch01-wip/part-geo103.ts.txt` + `v-geo103.ts.txt` (exemplars — same book, house voice, exact harness contract)
- `/home/z/my-project/docs/research/geo-ch02-wip/pin_check_geo126.py` (104/104 GREEN — your ENGINE must re-derive its 2.1 witnesses in TypeScript)

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-angles-types-pairs-and-measures'`, `number: '2.1'`, `title: 'Angles: Types, Pairs and Measures'`
- `concepts`: 5-8 from {angle, vertex, degree, angle bisector, complementary angles, supplementary angles, linear pair, vertically opposite angles, reflex angle}
- `prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock']` (ch.1's 1.4)
- `sources: ['geo-euclid-elements', 'geo-ch02-web-ground']`

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: chapter 1 built the rules of the game; this chapter measures. Two rays from a common endpoint; interior vs exterior of an angle; the notation ∠ABC with the vertex letter in the middle (convention named and kept all lesson).
2. **The degree**: 1/360 of a full turn. The honest history — Babylonian base-60 (60 divisible by 2, 3, 4, 5, 6), the year's roughly 360 days, the sexagesimal legacy in minutes and seconds (1° = 60′, 1′ = 60″; 1° = 3600″); the Greeks standardized the measured angle (ground register, GEO_CH02_MASTER_PLAN.md). The protractor: how it works, the two-scale trap.
3. **The type census** (table + body figure F1): degenerate 0, acute (0°, 90°), right 90°, obtuse (90°, 180°), straight 180°, reflex (180°, 360°), complete 360°. Boundaries stated honestly: 90° is RIGHT, not acute; 89.9° acute, 90.1° obtuse (pinned witnesses).
4. **Angle addition and the bisector**: adjacent angles add (the protractor's law); the bisector splits into two equal halves; the construction itself rides ch.8 (named).
5. **The pairs — the heart of the lesson**: complementary (sum 90°, "complement" as completion, the 90° completion picture), supplementary (sum 180°), adjacent vs non-adjacent (the honest note: supplementary NEED NOT be adjacent — two separate angles of 72° and 108° are still supplementary), the **linear pair** (adjacent + non-common arms opposite ⟹ ALWAYS supplementary — the 1.2 postulate ground doing the work), and **vertically opposite angles** (two straight lines crossing: the X). THE THEOREM (a `derivation` block, the chapter's first proved result): vertically opposite angles are equal — via linear pairs a+b = 180 and b+c = 180 ⟹ a = c (subtract; Euclid's CN-style common notions licensed from 1.2). Pinned witness: one of the four is 118° ⟹ the others are 118°, 62°, 62°.
6. **Ratio families and the algebra of the unknown**: two supplementary angles in ratio 2:3 ⟹ 72° and 108°; complementary 4:5 ⟹ 40° and 50°; an angle equal to its own supplement is 90°; to its own complement is 45°; an angle whose supplement is triple its complement is 45° (solve 180−x = 3(90−x); uniqueness engine-swept); the complement of the supplement of 152° is 62°.
7. **Bisectors of a linear pair are perpendicular** (derivation): x/2 + (180−x)/2 = 90° for EVERY x (engine sweep 10…170). Pinned.
8. **Clock angles — the applied reading** (rays in motion): the minute hand 6°/min, the hour hand 0.5°/min, 30° per hour; pinned witnesses 3:00 ⟹ 90°, 3:40 ⟹ 130° (|90 + 20 − 240|), 2:20 ⟹ 50°, 6:00 ⟹ 180°. One solution figure shows the 3:40 face with the computed angle marked.
9. **Exam callout** (tone 'exam'): the complement-OF vs pair-WITH trap; reflex angles have no complement/supplement; identifying linear pairs vs verticals in a diagram by the ARMS not the picture.
10. **Illustrations** (>= 2 full Cengage-style example chains, >= 4 steps each): (a) classify six given measures into the census with reasons; (b) the vertical-angle algebra chain — given one angle, find all four with reasons at each step.
11. **Figures**: >= 3 body (F1 the type-census strip — six angles drawn to scale with degree arcs; F2 the two-line X with the vertical-angle theorem's equality arrows and the linear-pair arcs; F3 the linear pair + perpendicular bisectors) and >= 3 solution figures inside exercise solutions (e.g. the 3:40 clock face; the 72/108 ratio bar; the bisector split) — solution figures are REQUIRED wherever they aid understanding (v9.0 law). All figures computed SVG: every geometry constant derived in code, never eyeballed; vivid palette only (warm hues; NEVER blue/indigo); aria-label or title/desc on every figure.
12. **Quiz** (5 items, why-they-fail explains, indices at intended options) + **Exercises** (15, house levels L1-L6, full step-by-step solutions with figures where they aid).

## FORMAT LAW (binding — identical to the ch.1 specs)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` inside `$...$`; SVG text PLAIN (U+2212 minus sign, no TeX in SVG, no `$` in SVG); vivid palette only; aria-labels; `terms` block (the concept words); `formula` cards (e.g. complement x ⟹ 90−x; supplement x ⟹ 180−x; vertically opposite equal); >= 2 example blocks; >= 6,000 words (target 8,500+); palette `const c21 = {...}` + `const f21 = '...'`; helpers prefixed `geo21`; export `export const lessonGeo201: Lesson`. Import line EXACT: `import type { Lesson } from '../../../src/data/library/types'` (the assembler strips it).

## ENGINE LAW (verify-first — the harness contract the assembler depends on)
`v-geo201.ts` starts with EXACTLY these import lines:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, the `Chk` type + `engine`/`pins` arrays + `ok/near/round*` helpers (copy the exemplar v-geo103.ts.txt), then the ENGINE section (NO part import): re-derive in TypeScript every pinned witness above (complement/supplement arithmetic incl. the five named identities; the type census boundaries; the vertical/linear algebra at 118°; the bisector sweep; both ratio families; all four clock witnesses; the uniqueness sweep for supp=3·comp over the integers 0..180). Then `async function runPins()` with `let mod: any; try { mod = await import('./part-geo201') } catch ...` (copy the exemplar's shape) auditing: word floor >= 6,000 (countLessonWords), quiz key self-check (5 items, indices valid, explains present), 15 exercises with solutions, >= 3 body + >= 3 solution figures, terms + formula blocks, hygiene scans (no `\qquad` in `$...$`, no `$$`, no raw TeX outside math, headings plain, no `words` field on the lesson), identity fields exact (id/number/title/prereqs/sources), concepts 5-8 + objectives 4-6, >= 2 examples with >= 4 steps, >= 3 derivation blocks. End the file with EXACTLY this marker block (the assembler cuts here):
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
followed by the report/exit harness copied from v-geo103.ts.txt. ENGINE wins over every other source: where engine and prose disagree, fix the prose.
