# SPEC wh103-CONT — continuation seat 1.3 (smaller spec, fast relaunch)

Agent wh103-cont. Repo: /home/z/my-project/lock-in (bun). You have ~50 minutes.
HARD LAW: touch NO repo file except the two outputs named below; do NOT read any
repo file — everything you need is in THIS spec. Skip web verification entirely
(the orchestrator verified the anchors; every number below is engine-pinned).
Write files EARLY and OFTEN: skeleton first, then append section by section
(Write for the first chunk, then Edit to append — one Edit per section).

## Output 1 — /home/z/my-project/lock-in/docs/research/wh-ch01-wip/part-wh103.ts

First line EXACTLY:
import type { Lesson } from '../../../src/data/library/types'

Then the SAME palette/helper block as spec-wh101-cont but with:
- palette const named c13 (same 14 values: ink '#166534', mid '#65a30d', teal '#0d9488', tealInk '#0f766e', amber '#d97706', orange '#ea580c', red '#dc2626', green '#16a34a', panel '#fef3c7', panel2 '#ffedd5', sep '#fcd34d', faint '#5eead4', white '#ffffff', paper '#fffdf5')
- font const f13 = same string
- helper prefix wh1C (wh1CSvg, wh1CTxt, wh1CLine, wh1CBox, wh1CDot, wh1CArrow) — copy the six helper definitions verbatim from spec-wh101-cont, renaming c11->c13, f11->f13, wh1A->wh1C.

SVG LAW: text PLAIN (no $, no backslash, no '-' directly before a digit — ALL
negative years/numbers use U+2212 −); font sizes 11-14.5; strokes >= 1.2; only
the 14 palette hexes; labels >= 7 px inside the viewBox.

THE LESSON OBJECT (ends the file): `export const lessonWh103: Lesson = { ... }`
with id 'wh-time-periodisation-and-the-calendar', number '1.3', title 'Time,
Periodisation and the Calendar', concepts 6-8 of: BCE and CE / no year zero /
the Gregorian reform / leap years / Saka era / Vikrama Samvat / Hijri calendar /
periodisation; objectives 5 lines; prerequisites:
['wh-how-history-is-written', 'wh-sources-literary-and-archaeological'];
sources: ['wh-web-calendars', 'wh-ncert-canon', 'wh-survey-ground'].
countLessonWords >= 6000 (aim 6500-7500).

SHAPE (append one section per Edit):
1. heading 'Time as convention' + 4 paras (the counting systems, the calendars,
   the divisions — all human conventions; what the historian inherits).
2. heading 'Counting the years: BCE and CE' + definition callouts (BC/BCE; AD/CE)
   + paras: the AD era devised by Dionysius Exiguus in 525 CE for his Easter
   table, popularized by Bede in the 8th century (Ecclesiastical History, 731);
   counting starts at year 1 — NO YEAR ZERO; + derivation 'The span rule across
   the era line' (steps: from A BCE to 1 BCE is A - 1 years; the joint 1 BCE ->
   1 CE adds 1; then to B CE adds B - 1; total A + B - 1; result) + witness
   table (head: From | To | Span; rows: 1 BCE -> 1 CE = 1; Caesar 44 BCE ->
   Augustus 14 CE = 57; Rosetta 196 BCE -> 1799 = 1994; Megasthenes 302 BCE ->
   Fa-Hien 399 = 700; 476 CE -> 2026 = 1550).
3. figure BODY A — wh1CF1(): the BCE/CE number line with the no-year-zero
   magnifier (a horizontal line, ticks 200, 100, 1 BCE | 1 CE, 100, 200 CE;
   a magnifier circle on the joint with 'no year 0' inside; amber accent).
4. heading 'Centuries and millennia' + paras (century N = years (N-1)00 + 1
   through N00; BCE counts BACKWARDS: the 3rd century BCE = 300-201 BCE) +
   list marker 'roman' of witnesses (2026 -> the 21st century, 2001-2100, and
   the 3rd millennium; Herodotus c. 484 BCE -> the 5th century BCE; the 2nd
   millennium BCE = 2000-1001 BCE).
5. heading 'The calendar reforms' + Julian paras (Julius Caesar; 46 BCE the
   'year of confusion'; effective 1 January 45 BCE; average 365.25 days) +
   Gregorian paras (Pope Gregory XIII, bull Inter gravissimas, 1582; Thursday 4
   October 1582 followed by Friday 15 October — 10 dates skipped; leap rule
   divisible by 4 except centuries unless divisible by 400: 1600 and 2000 leap,
   1700/1800/1900 not; average 365 + 97/400 = 365.2425 days vs tropical ~365.2422;
   the Julian error ~1 day in ~128 years; from the Council of Nicaea 325 CE to
   1582 = 1257 years ~ 9.8 days = the 10-day correction; Greece the last
   European adopter 1923) + Britain paras (Calendar (New Style) Act 1750;
   Wednesday 2 September 1752 followed by Thursday 14 September — 11 dates
   skipped: 1582's 10 + 1 extra drift day from 1700, the century year leap in
   Julian but not in Gregorian; the year began 1 January from 1752, previously
   25 March Lady Day; the cry 'give us our eleven days') + insight callout
   (the weekly cycle never broke) + leap census paras (1901-2000 has 25 leap
   years: 24 ordinary + the quadricentennial 2000; 2001-2100 has 24, 2100 not
   leap).
6. derivation 'The leap-year census' (steps: 400 years give 100 quarter-leaps;
   the century years 100, 200, 300 are not divisible by 400 — minus 3; result
   97 leap days per 400 years -> 365 + 97/400 = 365.2425) + figure BODY B —
   wh1CF2(): the reform-jump panel (two mini-calendars: October 1582 with 4 ->
   15 and '10 dates' marked; September 1752 with 2 -> 14 and '11 dates' marked;
   the 1700 explanation box).
7. heading 'India's era systems' + paras (Saka epoch 78 CE — Saka = CE - 78;
   the Indian national calendar adopted 1957, Saha committee; Vikrama Samvat
   epoch 57 BCE — VS = CE + 57; Hijri epoch 622 CE, lunar years ~354 days,
   drift ~11 days/yr, 32 solar ~ 33 lunar years — 11687.75 vs 11694.11 days;
   2026 -> Hijri ~1447/1448) + example block (>= 4 steps) 'Convert 2026 CE to
   Saka, Vikram Samvat and Hijri' (2026 - 78 = 1948; 2026 + 57 = 2083; (2026 -
   622) x 365.2422/354.367 ~ 1447.6).
8. heading 'Periodisation is a convention' + paras (James Mill, The History of
   British India, 1817, the Hindu/Muslim/British register by the rulers'
   religion; he never visited India; the NCERT class-8 critique — religion is
   not the clock of history; 1817 -> 2026 = 209 years of influence) + triad
   paras (ancient | 476 CE Romulus Augustulus deposed by Odoacer | medieval |
   1453 fall of Constantinople | modern; the medieval band = 977 years; the AP
   World c. 1200 baseline — this book's ch.2 is 'The World Before 1200') + warn
   callout (never present a period name as if nature made it) + figure BODY C —
   wh1CF3(): the periodisation convention timeline (Ancient | 476 | Medieval |
   1453 | Modern bands; the 977-year medieval width labelled; the AP c. 1200
   tick).
9. exam callout (tone 'exam', title 'Where this is examined'): UPSC prelims
   chronology + GS-I register + UGC NET History + AP World periodization.
10. terms block >= 8 items (BCE, CE, no year zero, leap year, tropical year,
    Julian calendar, Gregorian calendar, Saka era, Vikrama Samvat, Hijri
    calendar, periodisation).
11. formula cards >= 4: 'The span rule' latex 'A + B - 1' note 'no year zero';
    'The Gregorian average year' latex '365 + \\frac{97}{400} = 365.2425'; 'The
    Saka conversion' latex 'Saka = CE - 78' note '2026 -> 1948'; 'The Vikrama
    conversion' latex 'VS = CE + 57' note '2026 -> 2083'; 'The Hijri drift'
    latex '365 - 354 = 11' note 'days per year; 32 solar ~ 33 lunar'.
12. quiz (title 'Self-check quiz'): EXACTLY 5 items, 4 options each, answers
    EXACTLY [0, 2, 3, 1, 0]; correct option of item i contains token from:
    ['no year zero', '365.2425', '1752', '1948', 'convention']; explains >= 60
    chars. Items: (1) between 1 BCE and 1 CE there is; (2) the Gregorian
    average year length in days; (3) the year Britain skipped 11 dates;
    (4) 2026 CE converts to which Saka year; (5) ancient/medieval/modern is
    best described as.
13. exercises: EXACTLY 15 questions spanning L1..L6 (3/3/3/3/2/1), every one a
    steps-array solution >= 3 lines + answer, engine-checkable (spans 57, 1994,
    700, 1550, 1; leap classification 2000 yes / 1900 no / 2100 no; leap census
    25 and 24; era conversions 2026-78 = 1948 and 2026+57 = 2083; medieval band
    977 = 1453-476; century placements 2026 -> 21st, 484 BCE -> 5th BCE; Mill
    209). >= 3 carry figures: (a) wh1CF4() the era-conversion chart (rows CE
    2026 / Saka 1948 / VS 2083 / Hijri ~1447); (b) wh1CF5() the
    century-numbering ladder (1st = 1-100, 2nd = 101-200, ..., 21st = 2001-2100;
    3rd BCE = 300-201); (c) wh1CF6() the calendar-reform timeline (45 BCE Julian
    -> 1582 Gregorian -> 1752 Britain -> 1923 Greece, gaps labelled in years).

## Output 2 — /home/z/my-project/lock-in/docs/research/wh-ch01-wip/v-wh103.ts

Same contract as spec-wh101-cont's Output 2 with these swaps: lesson name
lessonWh103; loader line `mod = await import('./part-wh103')`; quiz keys
JSON === [0,2,3,1,0]; token list ['no year zero','365.2425','1752','1948',
'convention']; ENGINE checks recompute IN CODE with a brute-force isLeap
(y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)): leap counts 1901-2000 = 25
and 2001-2100 = 24; 97 leap days 2001-2400; 365 + 97/400 = 365.2425; tropical
365.2422; Julian drift 365.25 - 365.2422 = 0.0078 -> 1/0.0078 ~ 128 years;
1257 * 0.0078 ~ 9.8; spans 1/57/1994/700/1550; era 2026-78 = 1948, 2026+57 =
2083, hijri (2026-622)*365.2422/354.367 ~ 1447.6; 32*365.2422 = 11687.75 vs
33*354.367 = 11694.11; medieval 1453-476 = 977; 2026-1817 = 209; century checks
(2001 <= 2026 <= 2100; 400 <= 484 <= 499). P04d caption regexes: /number line|no year zero|era line/ AND /periodisation|medieval|476/ AND /reform|1582|1752/. P06
formula names include 'span', 'Gregorian', 'Saka', 'Vikrama'/'Hijri'. Report
labels 'wh103-engine' / 'wh103-pins'; final line `wh103 TOTAL: ${e.pass + p.pass}
pass, ${fail} fail`.

## Iterate

Run `cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh103.ts`
until `wh103 TOTAL: N pass, 0 fail`. Fix prose to the engine, never the reverse.

REPORT: the two paths + word count + final verdict + a 5-line section summary.
