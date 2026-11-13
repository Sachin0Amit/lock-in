#!/usr/bin/env python3
"""sync-docs-run96.py — run-96 ship-step docs sync: PROGRESS, RESUME_POINTER,
WORKLOG, SOURCE_LOG, DETAILED_LOG. Count edits only; prose verified by hand."""

# --- PROGRESS.json ---
p = 'docs/project/PROGRESS.json'
src = open(p, encoding='utf-8').read()
src = src.replace(
    '"awaiting": "run 95 opens the AL gap queue (the prewritten-books audit\'s three AL gaps): AL 4.5 \'HCF and LCM of Expressions\' (grow scripts/verify-book3-ch04.ts pre-writing sections first) + AL 6.4 \'One Linear, One Quadratic\' (grow verify-book3-ch06.ts) - then the new AL ch. 12 \'Ratio, Proportion and Variation\' (12.1 \'Ratio Laws and the Componendo Family\' -> 12.2 \'Variation: the Algebra of Constants\' -> 12.3 \'Continued Proportion, Mean Proportionals and Applications\'; new verify-book3-ch12.ts) before AA ch. 2 opens. Research ground: H&K Elementary Algebra (Drive id 13p83Jss_D7bSgAXh1juKHKI69oKpBxWL - chapters XII \'HCF/LCM of Simple Expressions\', XIX, XXVI \'One Linear, One Quadratic\') + Khattar QA 4e (id 12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi, ch. 26) + docs/research/PREWRITTEN_BOOKS_AUDIT.md (the gap record). Every fire also runs the FIGURE_VERIFICATION_PROTOCOL section 4 pipeline on touched lessons and clears the section 6 sweep quota.",',
    '"awaiting": "run 97 opens the new AL ch. 12 \'Ratio, Proportion and Variation\' (the prewritten-books audit gap C: 12.1 \'Ratio Laws and the Componendo Family\' (H&K XXXII + Khattar 7) STRICTLY FIRST, then 12.2 \'Variation: the Algebra of Constants\' — a NEW scripts/verify-book3-ch12.ts carries the pre-writing sections per the audit doc) before AA ch. 2 opens. Run 96 shipped the gap queue\'s last two members: 4.5 (run 95) and 6.4 \'One Linear, One Quadratic\' (run 96 — 5,345 words, quiz keys 1/2/1/0/1, 14 exercises, 2 figures, verify-book3-ch06.ts sections L+M, AL ch. 6 re-CLOSED 4/4, the AL book at 39 lessons). Research ground: H&K Elementary Algebra (Drive id 13p83Jss_D7bSgAXh1juKHKI69oKpBxWL - ch. XXXII \'Ratio and Proportion\' ground for 12.1; XXVI was this run\'s ground, re-downloaded + pdftotext-extracted) + Khattar QA 4e (id 12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi, ch. 7) + docs/research/PREWRITTEN_BOOKS_AUDIT.md (the gap record). Every fire also runs the FIGURE_VERIFICATION_PROTOCOL section 4 pipeline on touched lessons and clears the section 6 sweep quota.",')
src = src.replace('"lessonsWritten": 38,', '"lessonsWritten": 39,')
src = src.replace('"termsAvailableForFlashcards": 279,', '"termsAvailableForFlashcards": 288,')
src = src.replace(
    '"notes": "IN-PROGRESS (run 95, 2026-11-13) — the prewritten-books audit gap queue is closing: 4.5 \'HCF and LCM of Expressions\' shipped (38 lessons, 176,085 words; 4.5 = 4,443 words, verifier sections L+M 576/0); 6.4 \'One Linear, One Quadratic\' deferred to the next fire by the time rule; then the new ch. 12 \'Ratio, Proportion and Variation\' (3 lessons) closes the queue. Ground truth: WORK_INVENTORY.json (rebuild deferred — Drive survey chain reset with the sandbox)."',
    '"notes": "IN-PROGRESS (run 96, 2026-11-13) — the prewritten-books audit gap queue has TWO of three members paid: 4.5 (run 95) and 6.4 \'One Linear, One Quadratic\' (run 96: the substitution pipeline, the three verdicts, the tangent condition k² = (1+m²)r², the symmetric identity bank, the extraneous-pair discipline; 39 lessons, ~181,430 words; 6.4 = 5,345 words, verifier sections L+M green, AL ch. 6 re-CLOSED 4/4); only the new ch. 12 \'Ratio, Proportion and Variation\' (3 lessons) remains before the book closes. Ground truth: WORK_INVENTORY.json (rebuild deferred again — Drive survey chain reset with the sandbox; run-95/fire-1/fire-2 precedent)."')
open(p, 'w', encoding='utf-8').write(src)
print('PROGRESS.json synced')

# --- RESUME_POINTER.json ---
p = 'docs/project/RESUME_POINTER.json'
src = open(p, encoding='utf-8').read()
old_na = src[src.index('"nextAction": "') + len('"nextAction": "'):]
old_na = old_na[: old_na.index('",')]
new_na = ("NEXT RUN 97 (next fire, 02:50 IST): the AL gap queue reaches its last member — the NEW chapter AL 12 "
 "'Ratio, Proportion and Variation' OPENS with 12.1 'Ratio Laws and the Componendo Family' (id ratio-laws-and-the-componendo-family per the audit doc — "
 "H&K XXXII + Khattar ch. 7 ground: duplicate/triplicate/sub-duplicate ratios, the componendo-dividendo family, cross-multiplication as the ratio licence) "
 "STRICTLY FIRST, then if the window allows 12.2 'Variation: the Algebra of Constants' (direct/inverse/joint variation as constant-products — the algebraic layer FM 6.1–6.5 does not carry). "
 "VERIFY-FIRST: create scripts/verify-book3-ch12.ts with the 12.1 pre-writing sections (the ratio-law engines: every componendo/dividendo identity swept exactly over integer-pair grids; the ratio-of-ratios equivalences; the continued-proportion a:b:c means; quiz + exercise keys pinned) BEFORE prose; then author per BOOK_FORMAT (formal ratio definitions + Thus restatements, For example roman runs, Illustrations with Cengage chains, L1–L6 ladder with full worked solutions, 2+ figures in the vivid palette, formula cards, exam corner). "
 "GATES as standing (lint, tsc, the new verifier, routes 200, e2e with a new e2e-al-121.sh/.page.js carrying the intended quiz keys, DOM overlap audit, domvalues, VLM per protocol §4 light+dark). "
 "NOTE: run 96 (2026-11-13, 18:50 IST fire) shipped AL 6.4 'One Linear, One Quadratic' (al-one-linear-one-quadratic, 5,345 words, quiz keys 1/2/1/0/1, 14 exercises, 2 figures — the three-verdict panel + the tangent strip; verify-book3-ch06.ts grew sections L (pre-writing: 19,656 mixed-system substitution-bijection sweep, 117 line-vs-parabola verdicts, 1,785 tangent-condition combos with 16 feet verified exactly, the symmetric engine with all exhibits pinned) + M (authored audit) — 13,875,967/0 ALL GREEN, count-aware re-pins in F/K; AL ch. 6 re-CLOSED 4/4; the AL book stands 39 lessons; 12.1 deferred from run 96 by the time rule — 6.4 filled the window). "
 "The figure-audit+enrichment job (527779) takes 6.4 into its queue at its next fire (06:40 IST) — the full-figure VLM for its two figures lands there per protocol §10 (run-96 evidence: layer-1 overlap 0/2 after the five tick/label collisions were fixed, domvalues CLEAN, fig1 + both page views VLM PASS light+dark; one fig2 scroll-screenshot claim dismissed on DOM evidence). "
 "4.5 + 6.4 both shipped: after ch. 12's three lessons the AL gap queue is spent and the book closes; AA ch. 2 follows.")
src = src.replace(old_na, new_na)
src = src.replace('"updated": "2026-11-13"', '"updated": "2026-11-13"')  # date unchanged (same day)
open(p, 'w', encoding='utf-8').write(src)
print('RESUME_POINTER.json synced')

# --- WORKLOG.md ---
p = 'docs/project/WORKLOG.md'
entry = """
## 2026-11-13 — run 96 (18:50 IST fire) — AL 6.4 'One Linear, One Quadratic' ships; the gap queue's second member paid; ch. 6 re-CLOSED; 12.1 deferred by the time rule

- The gap lesson the 2026-11-11 prewritten-books audit queued from H&K ch. XXVI 'Simultaneous Quadratic Equations' (Gap B): authored al-one-linear-one-quadratic (5,345 words) — the substitution pipeline (solve the LINEAR, feed the quadratic) with its loses-nothing bijection theorem; the three verdicts (secant/tangent/outsider) read off the reduced discriminant, with the c-slider panel figure; the circle tangent condition k² = (1+m²)r² DERIVED (Δ/4 identity + the foot-of-perpendicular reading) with the 3-4-5 tangent strip figure; the symmetric identity bank (S/P/Q/D conversions + the Viète landing) and the ± census (four-pair systems); the extraneous-pair discipline (the mirror branch vs the court of originals); the degenerate-dress honesty note (xy=P against y=k). 7 illustrations, 2 derivations, 2 tables (verdict table + identity bank), 9 terms, 5 formula cards, quiz keys [1,2,1,0,1], 14 exercises L1–L6 with full Cengage chains.
- VERIFY-FIRST honoured: verify-book3-ch06.ts grew section L BEFORE any prose — the substitution engine (19,656 mixed systems across circle/parabola/product families: every rational-rooted pair verified in BOTH originals, the window bijection held everywhere, the degenerate roads catalogued), the verdict engine (117 (m,c) systems: 72/5/40 with the five tangent posts pinned), the circle tangent-condition engine (1,785 combos — Δ/4 = (1+m²)r² − k² as an exact identity, 16 tangent feet verified ON circle and line, the distance reading agrees everywhere), the symmetric engine (identity bank 361×4; the (S,P) grid 1,525 systems window-bijection-verified), all exhibits + quiz + the 14 exercise keys pinned, and both figure plans (rect-exact + disjoint). Engine catches pre-prose: the reduced 25x²−120x+144 miscopy (it's 25x²−120x=0 — the constant cancels), the tangent-dress slope sign, the px(3)=610 pin. Then section M audited the authored lesson (block census, quiz keys, exercise anchors, figure rects vs plans, hygiene scans, the chapter re-close). Final: 13,875,967/0 ALL GREEN. Count-aware re-pins with reasons in-file: F (3-lesson/in-progress/plannedLessons pins → the re-closed state), K (quiz table + 6.4 row, checklist-2 phrases, checklist-7 complete/4, chapter floor 13,500→17,900, book 38→39 lessons, book words floor 176,000→181,000).
- Authoring repairs caught by the gates: the escape-eaten class AGAIN (30 single-backslash LaTeX tokens from mixed typing — the fire-3 scanner caught them, doubled mechanically; 20 escape-apostrophes → typographic ’ per house style), the example-block answer-field shape (run-87 catch, answers folded into Hence lines), formula latex field name, table head field, derivation {label, formula, explanation} steps.
- Gates: lint 0 errors (5 pre-existing warnings) · tsc clean · verify-book3-ch06 13,875,967/0 · audit-content-completeness PASS (0 errors / 10 pre-existing warnings) · verify_toc_as_lessons 3,883/0 · verify-math-shelf-planning 1,240/0 · route 200 · e2e-al-64.sh 45/45 × desktop 1280 + mobile 390 + dark (quiz 5/5 live on intended keys [1,2,1,0,1], 397 KaTeX nodes 0 errors, 2 figures, 2 tables, 21 Sol. pills, 0 console errors, no overflow at both widths) · layer-1 overlap: 0 issues on both figures after the five tick/label collisions were fixed (the '(1,1)' label vs its own dot + the four ±5 tick labels riding the circle arc — the circle's r=5 sits exactly on the ±5 posts) · domvalues CLEAN · VLM: fig1 PASS, lesson views light+dark PASS; one fig2 'clipped top' scroll-screenshot claim dismissed on DOM evidence (svg1 issues=0, all three verdict chips present in domvalues tokens); the full-figure VLM for 6.4 lands at the figure-audit job's next fire (it takes 6.4 into its rebuilt queue) — run-95 precedent.
- Research: the H&K Elementary Algebra PDF re-downloaded after the sandbox recycle (22.5 MB, Drive id 13p83Jss_D7bSgAXh1juKHKI69oKpBxWL), ch. XXVI extracted by pdftotext (pp. 216–240 band) and studied — Art. 204 (the symmetric x+y/xy objective), Art. 205–206 (the m-family + homogeneous y=mx art — scope-guarded to later books), Art. 207 (the substitution pipeline — the lesson's headline), Art. 208 (artifices). Study-never-reproduce honoured; every witness system in the lesson is our own. Download ledger in SOURCE_LOG.
- Docs: PROGRESS (AL 39 lessons / 288 terms / notes; awaiting → run 97 opens ch. 12), RESUME_POINTER (run 97 plan — 12.1 strictly first, 12.2 if window allows), SOURCE_LOG (H&K re-download ledger), DETAILED_LOG. WORK_INVENTORY rebuild DEFERRED again (sandbox-reset Drive chain — run-95/fire-1/fire-2 precedent recorded; rebuild_drive_survey.ts runs first at the next ship).
- Commit: this one — pushed with the payload PAT via the one-time HTTPS URL (redaction protocol); all unpushed local commits (the two figure-job fires + the sync records + this run) ride the same push.
"""
src = open(p, encoding='utf-8').read()
open(p, 'w', encoding='utf-8').write(src + entry)
print('WORKLOG.md appended')

# --- SOURCE_LOG.md ---
p = 'docs/project/SOURCE_LOG.md'
ledger = """
### 2026-11-13 — run 96 (AL 6.4 ground re-fetch)
- Hall & Knight, Elementary Algebra for Schools — PDF re-downloaded after the sandbox recycle (22.5 MB; Drive id `13p83Jss_D7bSgAXh1juKHKI69oKpBxWL`; scripts/download_drive_file.sh). Chapter XXVI 'Simultaneous Quadratic Equations' (pp. 220–226) extracted by pdftotext (digital text layer, pages 216–240 band) and studied for the AL 6.4 lesson ground: Art. 204 (symmetric x+y / xy objective), Art. 205–206 (m-family + homogeneous y=mx — scope-guarded), Art. 207 (the one-linear-one-quadratic substitution pipeline — the lesson's headline), Art. 208 (artifices). STUDY-NEVER-REPRODUCE: no exercise, witness or prose reproduced — every system in the lesson is our own (verified by the L/M engines). Working extract deleted after study per the storage law; the banked citation key `hall-knight-elementary-algebra` carries the lesson footer.
"""
src = open(p, encoding='utf-8').read()
open(p, 'w', encoding='utf-8').write(src + ledger)
print('SOURCE_LOG.md appended')

# --- DETAILED_LOG.md ---
p = 'docs/project/DETAILED_LOG.md'
line = "\n- 2026-11-13 run 96: AL 6.4 'One Linear, One Quadratic' (al-one-linear-one-quadratic) — 5,345 words, 7 illustrations, 2 derivations, 2 figures (three-verdict panel + tangent strip), 2 tables, 9 terms, 5 formula cards, quiz 1/2/1/0/1, 14 exercises; verify-book3-ch06 L+M (13,875,967/0); ch. 6 re-CLOSED 4/4; AL stands 39 lessons; e2e 45/45 x3 viewports; overlap 0/2; VLM light+dark page+fig1 PASS; 12.1 deferred by the time rule → run 97 opens AL ch. 12.\n"
src = open(p, encoding='utf-8').read()
open(p, 'w', encoding='utf-8').write(src + line)
print('DETAILED_LOG.md appended')
