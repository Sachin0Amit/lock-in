# SPEC wh102-CONT — continuation seat 1.2 (smaller spec, fast relaunch)

Agent wh102-cont. Repo: /home/z/my-project/lock-in (bun). You have ~50 minutes.
HARD LAW: touch NO repo file except the two outputs named below; do NOT read any
repo file — everything you need is in THIS spec. Skip web verification entirely
(the orchestrator verified the anchors; every number below is engine-pinned).
Write files EARLY and OFTEN: skeleton first, then append section by section
(Write for the first chunk, then Edit to append — one Edit per section).

## Output 1 — /home/z/my-project/lock-in/docs/research/wh-ch01-wip/part-wh102.ts

First line EXACTLY:
import type { Lesson } from '../../../src/data/library/types'

Then the SAME palette/helper block as spec-wh101-cont but with:
- palette const named c12 (same 14 values: ink '#166534', mid '#65a30d', teal '#0d9488', tealInk '#0f766e', amber '#d97706', orange '#ea580c', red '#dc2626', green '#16a34a', panel '#fef3c7', panel2 '#ffedd5', sep '#fcd34d', faint '#5eead4', white '#ffffff', paper '#fffdf5')
- font const f12 = same string
- helper prefix wh1B (wh1BSvg, wh1BTxt, wh1BLine, wh1BBox, wh1BDot, wh1BArrow) — copy the six helper definitions verbatim from spec-wh101-cont, renaming c11->c12, f11->f12, wh1A->wh1B.

SVG LAW: text PLAIN (no $, no backslash, no '-' directly before a digit — use
U+2212 − for negatives); font sizes 11-14.5; strokes >= 1.2; only the 14 palette
hexes; labels >= 7 px inside the viewBox (0.62 x font-size per char).

THE LESSON OBJECT (ends the file): `export const lessonWh102: Lesson = { ... }`
with id 'wh-sources-literary-and-archaeological', number '1.2', title 'Sources:
Literary and Archaeological', concepts 6-8 of: literary sources / archaeological
sources / epigraphy / numismatics / stratigraphy / radiocarbon dating / the
three-age system / foreign accounts; objectives 5 lines; prerequisites:
['wh-how-history-is-written']; sources: ['wh-ncert-canon', 'wh-web-sources',
'wh-survey-ground']. countLessonWords >= 6000 (aim 6500-7500).

SHAPE (append one section per Edit):
1. heading 'Two great registers' + 4 paras (evidence = the historian's raw
   material; what writing preserves and what only earth preserves).
2. heading 'The literary register' + definition callout + 2 paras + list marker
   'roman' (religious literature; secular literature; foreign accounts) + para
   on the Rigveda census (1028 hymns = 1017 + 11 valakhilya, 10 mandalas, oral
   transmission before writing) + para on the foreign accounts (Megasthenes c.
   302 BCE, ambassador of Seleucus I to Chandragupta Maurya, Indica surviving
   in fragments; Fa-Hien 399-414; Xuanzang 630-645; Al-Biruni 973-1048,
   Kitab-ul-Hind early 11th century).
3. figure BODY A — wh1BF1(): the source taxonomy tree (root 'History's
   evidence' -> 'Literary' [Religious | Secular | Foreign accounts] +
   'Archaeological' [Epigraphy | Numismatics | Monuments | Material culture];
   green boxes, amber arrows, 640x460).
4. heading 'The archaeological register' + definition callouts (epigraphy;
   numismatics) + 2 paras on Ashoka's edicts (30+ inscriptions; 14 Major Rock
   Edicts + 7 Major Pillar Edicts; monolithic polished sandstone pillars 12-15
   m, up to 50 tonnes; Brahmi deciphered by James Prinsep 1836-1838, published
   March 1838; Devanampriya Piyadasi identified with Ashoka via George
   Turnour's Pali records; Kharoshthi in the northwest; a Greek-Aramaic
   bilingual at Kandahar) + 2 paras on the Rosetta Stone (Memphis decree of
   Ptolemy V, 27 March 196 BCE; found July 1799 by Pierre-Francois Bouchard at
   Rashid during Fort Julien repairs; hieroglyphic 14 + Demotic 32 + Greek 54
   = 100 surviving lines; Champollion announced 1822, 23 years after the find;
   British Museum since 1802, 3 years after; 196 BCE -> 1799 = 1994 years in
   the ground) + example block (>= 4 steps) 'How the Rosetta registers lock
   together'.
5. figure BODY B — wh1BF2(): the stratigraphy cross-section (3 strata; older
   below younger; a sherd in the middle layer; the law of superposition
   labelled; 620x400).
6. heading 'The dating sciences' + derivation 'The radiocarbon law' (statement +
   steps: decay is exponential; one half-life 5730 yr halves the count; N =
   N0(1/2)^(t/5730); at 50,000 years 0.236 percent remains — the practical
   edge; result) + figure BODY C — wh1BF3(): the radiocarbon decay curve
   (computed points 1, 1/2, 1/4, 1/8 at 5730/11460/17190; the 50,000 edge
   marked '0.236%'; 620x420) + paras (Libby mid-1940s University of Chicago,
   Nobel 1960; dendrochronology tree rings; thermoluminescence; typology
   seriation; the three-age system Stone -> Bronze -> Iron, C.J. Thomsen 1836,
   Copenhagen).
7. heading 'Coins and inscriptions as witnesses' + 2 paras (punch-marked coins
   from c. 6th century BCE; Gupta gold dinars; coins carry kings, deities,
   dates, scripts; the Prayagraj Pillar inscription of Samudragupta composed by
   Harisena) + 2 example blocks (>= 4 steps each): 'Date a coin layer by
   typology'; 'The Prinsep identification chain' (Devanampriya Piyadasi ->
   Turnour's Pali -> Ashoka).
8. exam callout (tone 'exam', title 'Where this is examined'): UPSC GS-I/optionals
   source questions + UGC NET History epigraphy/numismatics + the NCERT Themes
   register.
9. terms block >= 8 items (epigraphy, numismatics, stratigraphy, law of
   superposition, typology, radiocarbon dating, half-life, dendrochronology,
   thermoluminescence, three-age system).
10. formula cards >= 4: 'The radiocarbon law' latex 'N = N_0\\,(1/2)^{t/5730}'
    note 't in years'; 'The half-life ladder' latex '(1/2)^1 = 0.5,\\ (1/2)^2 = 0.25,\\ (1/2)^3 = 0.125' note 'at 5730, 11460, 17190 years'; 'The travellers gap'
    latex '302 + 399 - 1 = 700' note 'Megasthenes c. 302 BCE to Fa-Hien 399 CE;
    no year zero'; 'The Rosetta register census' latex '14 + 32 + 54 = 100'.
11. quiz (title 'Self-check quiz'): EXACTLY 5 items, 4 options each, answers
    EXACTLY [2, 3, 1, 0, 2]; correct option of item i contains token from:
    ['superposition', '5730', 'Rosetta', 'Prinsep', 'numismatics']; explains
    >= 60 chars auditing each wrong option. Items: (1) older layers lie below
    younger is the law of; (2) the carbon-14 half-life in years; (3) the stone
    whose three registers unlocked hieroglyphs; (4) who deciphered Brahmi
    (1836-1838); (5) the study of coins is called.
12. exercises: EXACTLY 15 questions spanning L1..L6 (3/3/3/3/2/1), every one a
    steps-array solution >= 3 lines + answer, engine-checkable numbers (700 =
    302+399-1; 216 = 630-414; 15-year journeys; 1028 = 1017+11; 14+7 = 21; 14 +
    32 + 54 = 100; 1994 = 196+1799-1; 23 years find->decipher; 3 years
    find->museum; 1/2, 1/4, 1/8 at 5730/11460/17190; 0.236% at 50000;
    classification items). >= 3 carry figures: (a) wh1BF4() the travellers'
    timeline (Megasthenes c. 302 BCE -> Fa-Hien 399-414 -> Xuanzang 630-645 ->
    Al-Biruni 973-1048; the 700-year and 216-year gaps labelled); (b) wh1BF5()
    the Rosetta three-register panel (14/32/54); (c) wh1BF6() the Ashokan
    pillar schematic (monolith 12-15 m band, up to 50 t, 14+7 edict census).

## Output 2 — /home/z/my-project/lock-in/docs/research/wh-ch01-wip/v-wh102.ts

Same contract as spec-wh101-cont's Output 2 with these swaps: lesson name
lessonWh102; loader line `mod = await import('./part-wh102')`; quiz keys
JSON === [2,3,1,0,2]; token list ['superposition','5730','Rosetta','Prinsep',
'numismatics']; P04d caption regexes /taxonomy|stratigraph/ AND /radiocarbon|decay|carbon/ AND /traveller|timeline|rosetta/ — actually set P04d to check:
/taxonomy|tree/ AND /stratigraph|superposition/ AND /radiocarbon|decay/;
P06 formula names must include 'radiocarbon', 'half-life' (ladder), 'travellers',
'Rosetta'; engine checks recompute: 700, 216, 15+15, 1028, 21, 100, 1994, 23, 3,
the three half-life fractions, 0.236 at 50000 (compute (1/2)**(50000/5730)*100 to
2 decimals), quiz key; report labels 'wh102-engine' / 'wh102-pins'; final line
`wh102 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`.

## Iterate

Run `cd /home/z/my-project/lock-in && bun run docs/research/wh-ch01-wip/v-wh102.ts`
until `wh102 TOTAL: N pass, 0 fail`. Fix prose to the engine, never the reverse.

REPORT: the two paths + word count + final verdict + a 5-line section summary.
