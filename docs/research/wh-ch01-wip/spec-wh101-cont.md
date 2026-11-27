# SPEC wh101-CONT — continuation seat 1.1 (smaller spec, fast relaunch)

Agent wh101-cont. Repo: /home/z/my-project/lock-in (bun). You have ~50 minutes.
HARD LAW: touch NO repo file except the two outputs named below; do NOT read any
repo file (no types.ts, no BOOK_FORMAT.md, no other lessons) — everything you
need is in THIS spec. Skip web verification entirely (the orchestrator already
verified the anchors; every number below is engine-pinned). Write files EARLY and
OFTEN: skeleton first, then append section by section (use Write for the first
chunk, then Edit to append — one Edit per section).

## Output 1 — /home/z/my-project/lock-in/docs/research/wh-ch01-wip/part-wh101.ts

First line EXACTLY:
import type { Lesson } from '../../../src/data/library/types'

Then (copy verbatim, only the helper prefix wh1A):
const c11 = { ink: '#166534', mid: '#65a30d', teal: '#0d9488', tealInk: '#0f766e', amber: '#d97706', orange: '#ea580c', red: '#dc2626', green: '#16a34a', panel: '#fef3c7', panel2: '#ffedd5', sep: '#fcd34d', faint: '#5eead4', white: '#ffffff', paper: '#fffdf5' }
const f11 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

const wh1ASvg = (w: number, h: number, label: string, body: string | string[]): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${Array.isArray(body) ? body.join('') : body}</svg>`
const wh1ATxt = (x: number, y: number, s: string, size = 13, color = c11.ink, anchor = 'middle', weight = '600'): string =>
  `<text x="${x}" y="${y}" font-family="${f11}" font-size="${size}" fill="${color}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
const wh1ALine = (x1: number, y1: number, x2: number, y2: number, color = c11.ink, w = 2.5, dash = ''): string =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
const wh1ABox = (x: number, y: number, w: number, h: number, fill: string, stroke: string, r = 8): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`
const wh1ADot = (x: number, y: number, color = c11.ink, r = 4): string =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`
const wh1AArrow = (x1: number, y1: number, x2: number, y2: number, color = c11.amber, w = 2): string => {
  const a = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  const rad = (a * Math.PI) / 180
  const hx = x2 - 9 * Math.cos(rad), hy = y2 - 9 * Math.sin(rad)
  const v: [number, number] = [-Math.sin(rad), Math.cos(rad)]
  const p1 = `${hx + v[0] * 6},${hy + v[1] * 6}`
  const p2 = `${hx - v[0] * 6},${hy - v[1] * 6}`
  return `<line x1="${x1}" y1="${y1}" x2="${hx}" y2="${hy}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${p1} ${p2}" fill="${color}"/>`
}

SVG LAW: text inside wh1ATxt is PLAIN (no $, no backslash, no '-' directly
before a digit — negative numbers use U+2212 −); font sizes 11-14.5; strokes
>= 1.2; only the 14 palette hexes; labels stay >= 7 px inside the viewBox
(estimate 0.62 x font-size per character).

THE LESSON OBJECT (ends the file): `export const lessonWh101: Lesson = { ... }`
with id 'wh-how-history-is-written', number '1.1', title 'How History Is
Written', concepts 6-8 of: historiography / primary source / secondary source /
external criticism / internal criticism / corroboration / historia / the Annales
school; objectives 5 lines; sources: ['wh-survey-ground', 'wh-web-historians'];
blocks per the shape below. countLessonWords must reach >= 6000 (aim 6500-7500).

SHAPE (write in this order; append one section per Edit):
1. heading 'The craft, not the list' + 4 paras (history is a METHOD: question,
   hunt, criticism, synthesis, narrative; the reader's own paper trail; why
   dates alone are not history).
2. heading 'Historiography: the inquiry defined' + definition callout (tone
   'definition', title 'Historiography', historia = inquiry) + 2 paras + list
   marker 'roman' of 6 method stages.
3. figure BODY A — wh1AF1(): the craft cycle (6 boxes in a circle: Question,
   Source hunt, Criticism, Synthesis, Narrative, New questions; amber arrows;
   620x420 viewBox; caption references the cycle).
4. heading 'Primary against secondary' + definition callouts (primary = evidence
   from the period itself; secondary = a later account built FROM primaries) +
   2 paras + table (head: Event | Primary witness | Secondary account; 4 rows:
   the Greco-Persian Wars -> an eyewitness letter -> a modern survey; Ashoka's
   reign -> the Major Rock Edicts -> a textbook chapter; Chandragupta Maurya's
   court -> Megasthenes's Indica fragments -> later reconstructions; 1857 ->
   a rebel proclamation -> the historian's monograph).
5. figure BODY B — wh1AF2(): the source ladder (event -> primary artifact ->
   secondary account, time arrow down, teal boxes).
6. heading 'The two criticisms' + 2 paras + derivation #1 'External criticism as
   a protocol' (statement + 4 steps: material check, script/language check,
   anachronism check, provenance check; result one line) + 1 para + figure BODY
   C — wh1AF3(): the external-vs-internal panel (two columns, genuine? vs
   credible?, 4 questions each).
7. heading 'Bias and corroboration' + 2 paras + derivation #2 'Why one source
   settles nothing' (steps: independence multiplies error chances; dependence
   defeats the multiplication; hence corroborate with INDEPENDENT sources;
   result) + insight callout.
8. heading 'The lineage' + 3 paras + historical callout (tone 'historical') on
   Herodotus + 1 para each for Thucydides, Sima Qian, Ibn Khaldun, Ranke, Bloch
   and Carr + lineage table (head: Historian | Dates | Work | The move; 7 rows:
   Herodotus c. 484-c. 425 BCE | The Histories | inquiry + wide reading;
   Thucydides c. 460-c. 400 BCE | History of the Peloponnesian War | eyewitness
   autopsy; Sima Qian c. 145-c. 86 BCE | Shiji (130 chapters) | the official
   model; Ibn Khaldun 1332-1406 | Muqaddimah (1377) | social laws + bias check;
   Ranke 1795-1886 | the 1824 histories | archival primaries; Bloch 1886-1944 |
   Annales 1929 + the craft | structures over events; Carr 1892-1982 | What Is
   History? 1961 | dialogue with the past).
9. 3 example blocks (title = crisp problem, steps >= 4 lines each, Cengage
   connectives): (i) 'Date a manuscript by its anachronism' (a 'medieval'
   manuscript mentioning gunpowder armies -> external criticism -> fabricated or
   misdated); (ii) 'Cross-check Megasthenes against the fragments' (what the
   ambassador reports vs the later quotations -> internal criticism);
   (iii) 'Read a court chronicle for bias' (the patron problem).
10. exam callout (tone 'exam', title 'Where this is examined'): UPSC GS-I world
    register + UGC NET History + AP World historical-reasoning skill.
11. terms block: >= 8 items (historiography, primary source, secondary source,
    external criticism, internal criticism, corroboration, anachronism,
    provenance, asabiyyah, Whig history).
12. formula cards >= 4: 'The span rule across the era line' latex 'A + B - 1'
    note 'years from A BCE to B CE; no year zero'; 'The Shiji census' latex
    '12 + 10 + 8 + 30 + 70 = 130'; 'The coeval window' latex '425 - 460 = -35'
    hmm use latex '460 - 425 = 35' note 'Herodotus and Thucydides overlap 35
    years'; 'Ranke in numbers' latex '1886 - 1795 = 91'.
13. quiz (title 'Self-check quiz'): EXACTLY 5 items, 4 options each, answers
    EXACTLY [1, 0, 2, 3, 1]; correct option of item i contains token from:
    ['primary source', 'external criticism', 'Sima Qian', 'corroborat',
    'Annales']; every explain >= 60 chars auditing each wrong option. Items:
    (1) which is a primary source for Ashoka's reign (the Major Rock Edicts vs
    a modern survey vs a textbook vs a 1990s novel); (2) checking a manuscript's
    paper and script is which criticism (external vs internal vs corroboration
    vs periodisation); (3) who completed the Shiji's 130 chapters around 94 BCE;
    (4) two independent chronicles agreeing is called; (5) the journal Bloch and
    Febvre founded in 1929 launched which school.
14. exercises (title 'Exercises'): EXACTLY 15 questions in sets spanning L1, L2,
    L3, L4, L5, L6 (e.g. 3/3/3/3/2/1). Every question: full steps-array
    solution (>= 3 lines, connectives Now,/So,/or/Hence) + terminal answer
    field whose numbers appear in the solution. Exercises must be
    engine-checkable (span arithmetic 44+14-1 = 57, 425+145-1 = 569, 484+1377-1
    = 1860, the 130-census, 35-year overlap, 91-year Ranke, classification
    items with the answer named in words). >= 3 questions carry figures:
    (a) wh1AF4() the historians' timeline (scaled 500 BCE-2000 CE axis:
    Herodotus 484-425 BCE, Thucydides 460-400 BCE, Sima Qian 145-86 BCE, Ibn
    Khaldun 1332-1406, Ranke 1795-1886, Bloch 1886-1944, Carr 1892-1982; the
    569-year and 1860-year gaps labelled); (b) wh1AF5() the Shiji census bar
    (12+10+8+30+70 = 130); (c) wh1AF6() the corroboration diagram (one source
    vs three converging).

## Output 2 — /home/z/my-project/lock-in/docs/research/wh-ch01-wip/v-wh101.ts

A bun script (top-level await OK). Structure:
- header comment; `import { countLessonWords } from '../../../src/data/library/types'`; `import type { Lesson } from '../../../src/data/library/types'`; `export {}`.
- harness: `type Chk = { name: string; ok: boolean; detail: string }`; `const engine: Chk[] = []`; `const pins: Chk[] = []`; `check(name, ok, detail='')` pushes to engine; `pcheck(...)` pushes to pins.
- ENGINE SECTION (~15 checks): recompute in code — 425+145-1 = 569; 484+1377-1 = 1860; 12+10+8+30+70 = 130; 460-425 = 35; 1886-1795 = 91; 1961-1892 = 69; 1949-1944 = 5 and 1944-1929 = 15; 1 BCE->1 CE span rule a+b-1 with (1,1)->1 and (44,14)->57.
- `async function runPins(): Promise<void>` — INSIDE it FIRST the loader line (EXACT, the assembler rewrites it):
  `let mod: { lessonWh101?: Lesson } | null = null`
  `try { mod = await import('./part-wh101'); pcheck('P01 part file loads and exports lessonWh101', !!mod?.lessonWh101, '') } catch (e) { pcheck('P01 part file loads and exports lessonWh101', false, String(e)) }`
  `const lesson = mod?.lessonWh101; if (!lesson) return`
  Then P02..P10 with pcheck(): P02 quiz block exists; keys JSON === [1,0,2,3,1]; every item 4 options; token list ['primary source','external criticism','Sima Qian','corroborat','Annales'] each in the correct option; explains >= 60 chars. P03 exercises block: sets span L1..L6; 15 questions total; every solution an array >= 3 non-empty lines + answer non-empty; P08 numeric-containment (every digit-token of the answer appears in the joined solution); solution-figure count >= 3. P04a body-figure count >= 3; P04c example+exercise solution figures >= 3; P04d captions (lowercased join) match /timeline|lineage|chronolog/ AND /census|130|shiji/ AND /corroborat/. P05 one terms block with >= 6 items. P06 >= 4 formula cards. P07 countLessonWords(lesson) >= 6000. P09 collect every svg string (figures + example figures + exercise figures): >= 6; every root has role="img" + aria-label + viewBox; collect all <text> contents: no '$', no '\\\\', no /-\s?\d/; palette allow-list = the 14 c11 hexes (regex all 6-hex codes; fail on any other); strokes all >= 1.2; font sizes 11-14.5. P10 math spans: collect $...$ spans from every string field (text/title/statement/result/note/caption/name/q/answer + quiz/terms/derivation/example/lists/table cells): no span contains '$$'; no span contains '\\qquad'; derivation titles + step labels contain no '$'.
- END the file EXACTLY with (the assembler cuts at the marker):
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
function report(label: string, list: Chk[]): { pass: number; fail: number } {
  const pass = list.filter((c) => c.ok).length
  const fail = list.length - pass
  for (const c of list) if (!c.ok) console.log(`  FAIL ${c.name} — ${c.detail}`)
  console.log(`${label}: ${pass} pass, ${fail} fail`)
  return { pass, fail }
}
console.log('=== ENGINE (recompute everything) ===')
const e = report('wh101-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('wh101-pins', pins)
const fail = e.fail + p.fail
console.log(`wh101 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)

## Iterate

Run `cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh101.ts`
until `wh101 TOTAL: N pass, 0 fail`. Fix prose to the engine, never the reverse.

REPORT: the two paths + word count + final verdict + a 5-line section summary.
