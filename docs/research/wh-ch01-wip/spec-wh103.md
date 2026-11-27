# SPEC wh103 — seat 1.3 of HSS RUN 1: world-history lesson 1.3 'Time, Periodisation and the Calendar'

You are agent wh103 (Task ID 3-c). Your deliverable is ONE lesson as a TypeScript
part file + its verify harness. You see no other repo context; this spec is
self-contained. Repo root: /home/z/my-project/lock-in (bun runtime).

## Outputs (write-early-often — save each stage as it completes)

1. `/home/z/my-project/lock-in/docs/research/wh-ch01-wip/part-wh103.ts` — the lesson
   (first line EXACTLY: `import type { Lesson } from '../../../src/data/library/types'`;
   ends with `export const lessonWh103: Lesson = {...}`).
2. `/home/z/my-project/lock-in/docs/research/wh-ch01-wip/v-wh103.ts` — the verify harness.
3. Run `cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh103.ts`
   until ALL GREEN. Do not declare the lesson done while any check fails.

STAGED SAVES (mandatory): (stage 1) skeleton + palette/helpers + lesson shell —
save; (stage 2) body prose first half — save; (stage 3) body second half + quiz —
save; (stage 4) exercises + solutions — save; (stage 5) v-wh103.ts + run green.

## The lesson (identity fields EXACT)

- id: `wh-time-periodisation-and-the-calendar` (kebab, globally unique)
- number: `'1.3'`; title: `Time, Periodisation and the Calendar`
- concepts: 'BCE and CE', 'no year zero', 'the Gregorian reform', 'leap years',
  'Saka era', 'Vikrama Samvat', 'Hijri calendar', 'periodisation'
- objectives: 4-6 lines (compute spans across the era line; apply the leap rule;
  convert Saka/Vikram/Hijri to CE; explain periodisation as convention)
- prerequisites: `['wh-how-history-is-written', 'wh-sources-literary-and-archaeological']`
- sources: `['wh-web-calendars', 'wh-ncert-canon', 'wh-survey-ground']`

## VERIFY-BEFORE-WRITING (web duty)

Verify with WebSearch/WebFetch before use (phrase with 'c.' or drop the precise
year if a fetch fails twice — never invent): Dionysius Exiguus devised the AD
era in 525 CE (Easter table), Bede popularized it (8th century, 731); Britain's
Calendar (New Style) Act 1750, Wed 2 Sep -> Thu 14 Sep 1752 (11 dates), year
begins 1 Jan from 1752, 'give us our eleven days'; Saka era epoch 78 CE and the
Indian national calendar adopted 1957 (Saha committee); Vikrama Samvat epoch 57
BCE; Hijri epoch 622 CE; Julius Caesar's Julian reform (46 BCE 'year of
confusion', effective 1 Jan 45 BCE); James Mill's periodisation already
verified (below). Already verified verbatim: Gregorian reform 1582 (Thu 4 Oct ->
Fri 15 Oct, 10 dates skipped; leap rule; 365.2425 vs 365.2422; Greece last
European adopter 1923).

## The pinned facts (engine 69/69 GREEN — use THESE numbers verbatim)

- The AD/CE system: devised by Dionysius Exiguus in 525 CE for his Easter
  table; popularized by Bede in the 8th century (Ecclesiastical History, 731);
  counting starts at year 1 — NO YEAR ZERO: 1 BCE is followed directly by 1 CE.
- The span rule: years from A BCE to B CE = A + B - 1. Witnesses: 1 BCE -> 1 CE
  = 1 year; Caesar's death 44 BCE -> Augustus's death 14 CE = 57 years; the
  Rosetta decree 196 BCE -> its rediscovery 1799 = 1994 years; Megasthenes's
  embassy c. 302 BCE -> Fa-Hien's arrival 399 = 700 years; the medieval start
  476 CE -> 2026 = 1550 years.
- Centuries and millennia: the 1st century CE = 1-100; the 21st century =
  2001-2100 (2026 sits in it and in the 3rd millennium CE); the 3rd century BCE
  = 300-201 BCE; the 2nd millennium BCE = 2000-1001 BCE; Herodotus c. 484 BCE
  = a 5th-century-BCE date.
- The Julian reform: Julius Caesar, 46 BCE the 'year of confusion' (with its
  intercalations), effective 1 January 45 BCE; average year 365.25 days (every
  4th year a leap year — 100 leap days per 400 years).
- The Gregorian reform: Pope Gregory XIII, bull Inter gravissimas, 1582;
  Thursday 4 October 1582 (Julian) followed by Friday 15 October 1582
  (Gregorian) — 10 dates skipped; leap rule: divisible by 4, EXCEPT century
  years unless divisible by 400 (1600 and 2000 leap; 1700, 1800, 1900 not);
  average year 365 + 97/400 = 365.2425 days against the tropical year ~365.2422
  (error ~0.0003 d/yr, ~1 day in ~3,333 years); the Julian error 0.0078 d/yr,
  ~1 day in ~128 years; from the 325-CE Council of Nicaea to 1582 = 1257 years
  ~ 9.8 accumulated days = the 10-day correction; Greece the last European
  adopter, 1923.
- Britain: the Calendar (New Style) Act 1750; Wednesday 2 September 1752
  followed by Thursday 14 September 1752 — 11 dates skipped (1582's 10 + 1
  extra drift day from 1700, the century year that is leap in Julian but not in
  Gregorian); the year also began 1 January from 1752 (previously 25 March,
  Lady Day); the cry 'give us our eleven days'. Leap census: 1901-2000 has 25
  leap years (24 ordinary quarter-leaps + the quadricentennial 2000); 2001-2100
  has 24 (2100 is not leap).
- Era systems: Saka era epoch 78 CE — Saka = CE - 78 (2026 -> Saka 1948; Saka
  1948 + 78 = 2026; the Indian national calendar, adopted 1957 with the Saha
  committee, uses it); Vikrama Samvat epoch 57 BCE — VS = CE + 57 (spring 2026
  -> VS 2083); Hijri epoch 622 CE — lunar years of ~354 days drift ~11 days/yr
  against the solar year; 32 solar years ~ 33 lunar years (11687.75 vs 11694.11
  days); 2026 -> Hijri ~1447/1448.
- Periodisation as convention: James Mill, 'The History of British India'
  (1817), divided Indian history into Hindu/Muslim/British periods by the
  religion of the rulers; he never visited India; the NCERT class-8 register
  'How, When and Where' carries the standing critique (religion is not the
  clock of history; the register also ignores the many faiths coexisting in
  every period). 1817 -> 2026 = 209 years of that register's influence.
- The ancient/medieval/modern triad: for Europe the conventional walls are 476
  CE (Romulus Augustulus deposed by Odoacer — the conventional fall of the
  Western Roman Empire) and 1453 (the fall of Constantinople); the medieval
  band spans 977 years (1453 - 476); the triad is a CONVENTION, inherited and
  interrogated, not a fact; the AP World c. 1200 baseline (this book's ch.2 is
  'The World Before 1200') is another, newer convention.

## Lesson shape (Cengage house voice — every requirement pinned by the v-file)

Blocks in this order (body >= 10 blocks):
1. heading + 3-4 opening paras (time is the historian's stage: the counting
   systems, the calendars, and the divisions — all HUMAN conventions).
2. heading 'Counting the years: BCE and CE' + definition callouts (BC/BCE, AD/CE)
   + the no-year-zero paras + derivation 1 'The span rule across the era line'
   (why span = A + B - 1; steps: count from A BCE to 1 BCE, add the one year at
   the joint, add B - 1 more; result) + BODY FIGURE A: the number line with the
   no-year-zero magnifier on the 1 BCE / 1 CE joint + the witness table
   (from | to | span: 1 BCE->1 CE = 1; 44->14 = 57; 196->1799 = 1994; 302->399
   = 700).
3. heading 'Centuries and millennia' + the century rule paras (century N =
   years (N-1)00 + 1 through N00; BCE counts backwards) + roman list of
   witnesses (2026 -> 21st century; 484 BCE -> 5th century BCE; 3rd century BCE
   = 300-201 BCE; 2nd millennium BCE = 2000-1001 BCE).
4. BODY FIGURE B: the periodisation convention timeline (Ancient | 476 |
   Medieval | 1453 | Modern, the 977-year band marked, the AP c. 1200 baseline
   ticked).
5. heading 'The calendar reforms' + Julian paras (46 BCE confusion, 45 BCE
   effective, 365.25) + Gregorian paras (1582, Inter gravissimas, Thu 4 -> Fri
   15 Oct, leap rule, 365.2425 vs 365.2422, the Nicaea 1257-year ~9.8-day
   account) + derivation 2 'The leap-year census' (97 leap days per 400
   Gregorian years -> 365.2425; steps: 100 quarter-leaps minus the 3
   non-quadricentennial centuries) + the Britain 1752 paras (2 -> 14 Sep, 11
   dates = 10 + 1 from 1700; 1 January; 'give us our eleven days'; Greece 1923)
   + BODY FIGURE C: the reform-jump panel (1582's 10 dates vs 1752's 11 with
   the 1700 explanation) + insight callout (the weekly cycle never broke —
   Thursday 4 Oct was followed by Friday 15 Oct).
6. heading 'India's era systems' + Saka/Vikram/Hijri paras (epochs 78 / 57 BCE
   / 622; the conversions Saka = CE - 78, VS = CE + 57; the Hijri lunar drift
   11 d/yr, 32 solar ~ 33 lunar) + example Illustration (>= 4 steps): 'Convert
   2026 CE to Saka, Vikram Samvat and Hijri' (1948; 2083; ~1447/1448).
7. heading 'Periodisation is a convention' + the Mill paras (1817, the
   Hindu/Muslim/British register, never visited, the critique) + the triad
   paras (476/1453, the 977-year band, AP 1200) + warn callout (never present a
   period name as if nature made it) + exam callout (tone 'exam': UPSC prelims
   chronology + GS-I register + NET History + AP World periodization skill).
8. terms block (>= 8: BCE, CE, no year zero, leap year, tropical year, Julian
   calendar, Gregorian calendar, Saka era, Vikrama Samvat, Hijri calendar,
   periodisation).
9. formula cards (>= 4): 'The span rule' (span = A + B - 1); 'The Gregorian
   average year' (365 + 97/400 = 365.2425 d); 'The Saka conversion' (Saka =
   CE - 78); 'The Vikrama conversion' (VS = CE + 57); 'The Hijri drift' (11
   days/year; 32 solar ~ 33 lunar) — at least 4.
10. quiz block title 'Self-check quiz' with EXACTLY 5 items, 4 options each,
    intended keys [0, 2, 3, 1, 0] and the correct option MUST contain the
    pinned token: (1) 'no year zero', (2) '365.2425', (3) '1752', (4) '1948',
    (5) 'convention'. Every explain >= 60 chars auditing each wrong option.
11. exercises block with EXACTLY 15 questions spanning L1..L6, full
    steps-array solutions + terminal answers. >= 3 carry solution figures:
    (a) the era-conversion chart (CE 2026 vs Saka 1948 / VS 2083 / Hijri ~1447
    rows); (b) the century-numbering ladder (1st = 1-100 ... 21st = 2001-2100;
    3rd BCE = 300-201); (c) the calendar-reform timeline (45 BCE Julian ->
    1582 Gregorian -> 1752 Britain -> 1923 Greece). All 15 answers
    engine-verifiable: span arithmetic (44->14 = 57; 196->1799 = 1994; 302->399
    = 700), leap classification (2000/1900/2100), century placement, era
    conversions (2026-78 = 1948; 2026+57 = 2083), the 25/24 leap census,
    medieval band 977.

## SVG law (BINDING — the v-file asserts every clause)

- Palette const c13 (EXACT same 14 values): ink '#166534', mid '#65a30d', teal
  '#0d9488', tealInk '#0f766e', amber '#d97706', orange '#ea580c', red '#dc2626',
  green '#16a34a', panel '#fef3c7', panel2 '#ffedd5', sep '#fcd34d', faint
  '#5eead4', white '#ffffff', paper '#fffdf5'. NO OTHER HEX.
- Font const f13 = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif".
- Helper prefix wh1C (wh1CTxt, wh1CLine, wh1CDot, wh1CBox, wh1CArrow, wh1CRect...);
  wh1CSvg(w,h,label,parts) wrapper with role="img" + aria-label + viewBox.
- SVG <text> PLAIN: no '$', no backslash; NEGATIVE YEARS AND NUMBERS USE U+2212
  (−) — NEVER '-' immediately before a digit; years plain; font-size 11-14.5;
  strokes >= 1.2; 0.62 em/char clip estimate, 7 px margins.
- Every figure referenced by the prose.

## Math-span law

$...$ inline only; never '$$'; no '\qquad' in inline spans; derivation titles/
labels PLAIN. Arithmetic in math spans uses the ASCII '-' INSIDE $...$ (KaTeX
renders it); the U+2212 law is for SVG TEXT ONLY.

## v-wh103.ts contract (mirror of the geo v-file pattern)

Same structure as the other seats' v-files: header comment; imports
(countLessonWords + Lesson type); `export {}`; Chk/pcheck/check helpers; ENGINE
SECTION recomputing EVERY pinned number in code (spans 1/57/1994/700/1550;
leap census 25 and 24 via a brute-force isLeap; 97/400 = 365.2425; tropical
365.2422; Julian drift 0.0078 ~ 1/128 yr; Nicaea 1257 x 0.0078 ~ 9.8; the
reform skips 10/11 via a dates-strictly-between count; Saka 1948; VS 2083;
Hijri (2026-622) x 365.2422/354.367 ~ 1447.6; 32x365.2422 ~ 11687.75 vs
33x354.367 ~ 11694.11; medieval band 977; Mill 209; century placements; quiz
key; exercise witnesses) with check() calls; then
`async function runPins(): Promise<void>` with P01..P10 (P01 part loads +
export lessonWh103; P02 quiz keys [0,2,3,1,0] + 4 options + tokens + explains
>= 60; P03 15 exercises L1-L6 spanned + steps >= 3 + answers + P08 numeric
containment; P04a body figures >= 3 + P04d named trio (number line/
periodisation/reform-jump); P04b-c solution figures >= 3; P05 terms >= 6;
P06 >= 4 formula cards; P07 countLessonWords >= 6000; P09a-h full SVG law with
the 14-color allow-list; P10 math-span laws). END with the EXACT bottom harness
section (the assembler cuts at the marker) — same text as the other seats but
labels 'wh103-engine' / 'wh103-pins' and `if (fail > 0) process.exit(1)`.

## Quality bar

- countLessonWords(lessonWh103) >= 6000 (target 8,000-10,000).
- All figures referenced in prose; no decoration-only.
- STUDY-NEVER-REPRODUCE: all wording OUR OWN.
- Report back: the two file paths + word count + `wh103 TOTAL: N pass, 0 fail` +
  any fact you could NOT verify.
