#!/usr/bin/env python3
"""ship-run88.py — update PROGRESS.json + RESUME_POINTER.json for run 88
(the Elementary Algebra BOOK CLOSE). Idempotent; run from /home/z/my-project."""
import json

ROOT = '/home/z/my-project'

# ---- PROGRESS.json ----
with open(f'{ROOT}/docs/project/PROGRESS.json') as f:
    prog = json.load(f)

prog['updated'] = '2026-11-10'

new_phase_head = (
    "PLATFORM 2026-11-10 (cron cadence v4 hybrid: night hourly 23:50-04:50 IST + day every-3h). "
    "BOOK #3 Elementary Algebra IS COMPLETE (run 88, 2026-11-10): ch. 11 'The Toolbox and the "
    "Doorstep' CLOSED 3/3 with 11.3 'The Function Idea: the Doorstep' (al-the-function-idea-the-"
    "doorstep, 6,523 words, quiz keys 2/0/3/1/2, 14 exercises, two figures — the function machine "
    "+ the probe verdicts strip) + the unit-11 completion review PASSED + THE BOOK CLOSE (the "
    "status flipped to 'complete': 11/11 chapters, 37 lessons, 171,460 words; the handoff note "
    "names Advanced Algebra / Coordinate Geometry / Trigonometry / Calculus; the library stands at "
    "120 lessons / 583,505 words / 3 complete books). 11.3: the input-output machine priced on "
    "10.3's workhorse at nine inputs (the zeros ARE 10.3's doors), the notation f(x) read honestly "
    "(the slot discipline: f(x+1) = 2x^2 - 3x - 2 by symbolic expansion, cross-checked at x = 2 "
    "against f(3) = 0; the mirror twins f(7/4 +/- 1/4) carried by the notation), the domain as "
    "8.3's two filters (the four-machine census: 1/(x-2) refusing 2, sqrt(x-3) accepting exactly "
    "x >= 3 with boundary reads 0/1/2/4 at 3/4/7/19, the HOLE (x^2-9)/(x-3) = x + 3 keeping its "
    "refusal at (3, 6) through every cancellation, the two-bill cousin 1/(x^2-1) refusing +/-1 "
    "with the even read k(-2) = k(2) = 1/3; both filters at once on sqrt(5-x)/(x-2) with x = 2 "
    "dying on the bill alone), the vertical-probe test DERIVED from 5.3's verdict machine (freeze "
    "the probe -> one equation in y -> one door = one meet; the line priced at h = -1, 0, 2, the "
    "bowl degree-one in y, the circle y^2 = 25 - h^2 growing two doors for |h| < 5), the branch "
    "fix (each half of the sideways bowl is a function; the radical sign is itself a function "
    "definition), the linear function as 10.2's rate machine (F(d) = 50 + 12d with the constant "
    "climb F(d+1) - F(d) = 12 at d = 0, 2, 5; the Fahrenheit machine F(C) = (9/5)C + 32 with "
    "F(37) = 98.6, the reverse read F(C) = 86 -> C = 30, and the -40 meeting), the quadratic "
    "function with the range read straight off the fold (the gap equation f(x) - (-Delta/4a) = "
    "a(x + b/2a)^2; the workhorse [-25/8, inf) certified by Delta_k = 25 + 8k reading 25/0/-7/65 "
    "at k = 0/-25/8/-4/5, the down companion (-inf, 9], the floating bowl [1, inf) with Delta = "
    "-4 and no zeros yet h(0) = 1 legal), and the composition doorstep (11.2's camera NAMED: the "
    "quartic is (f o g)(x) with g = x^2 - 3x + 3, f = t^2 - 3t + 2, expanding to x^4 - 6x^3 + "
    "12x^2 - 9x + 2 with the four doors 1, 2, (3 +/- sqrt(5))/2 recovered through the lens; order "
    "matters priced 16 vs 10 with the composites x^2 + 2x + 1 vs x^2 + 1 certified; the inner-"
    "domain honesty sqrt(x^2) = |x| reading 5 at x = -5 while (sqrt(x))^2 = x refuses -5). "
    "Verify-book3-ch11.ts 903 checks A-H + F ALL GREEN (the rewritten closing battery: pre-write "
    "326 checks via the PREWRITE=1 gate BEFORE any 11.3 prose; authored H census + 14 exercise "
    "anchors re-priced; the closing F with the unit-11 review and the BOOK CLOSE); E2E e2e-al-113 "
    "45/45 x3 viewports (quiz 5/5 live, KaTeX 422 nodes 0 errors, 0 console errors); SVG audits "
    "0/0 x2 (8 grazes fixed — the verdict strip re-geometrised so the 3:4:5 probe meets land on "
    "integer pixels); lint 0; tsc clean; one new key banked (ncert-math11-ch2-functions, "
    "web-checked at ncert.nic.in); zero downloads. Historical notes web-checked: Leibniz 1673, "
    "Euler 1734/1748, Dirichlet 1837, the Babylonian proto-function tables. RUN 89 = the "
    "research/promotion run for book #4 'Advanced Algebra' (its own run with its own research "
    "phase; chapter 1 opens at run 90 per the two-lessons-per-run cadence)."
)

old_phase = prog['phase']
# replace everything up to the first double period boundary is too fragile;
# run 87's phase string is replaced wholesale with the new head (the old
# chapter narrative lives on in WORKLOG/DETAILED_LOG, per house practice).
prog['phase'] = new_phase_head

lib = prog.get('library', {})
lib['lessonsWritten'] = 120
lib['wordsAuthored'] = 583505
lib['chaptersWritten'] = 32
lib['chaptersInProgress'] = 0
lib['asOf'] = 'run 88 (2026-11-10)'
if isinstance(lib.get('totals'), dict):
    lib['totals']['lessonsWritten'] = 120
    lib['totals']['words'] = 583505
    lib['totals']['wordsAuthored'] = 583505
    lib['totals']['terms'] = 906
    lib['totals']['termsDefined'] = 906
    lib['totals']['quizItems'] = 600
    lib['totals']['exerciseQuestions'] = 1541
    lib['totals']['booksLive'] = 3
    lib['totals']['chaptersWritten'] = 32
    lib['totals']['chaptersInProgress'] = 0
    lib['totals']['plannedLessons'] = 0
    lib['totals']['note'] = (
        'library-wide ground truth, mirrors libraryStats() and WORK_INVENTORY.json '
        '(never hand-typed) — refreshed at the run-88 BOOK CLOSE ship'
    )

with open(f'{ROOT}/docs/project/PROGRESS.json', 'w') as f:
    json.dump(prog, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('PROGRESS.json updated (phase rewritten, library stats -> run-88 close snapshot)')

# ---- RESUME_POINTER.json ----
with open(f'{ROOT}/docs/project/RESUME_POINTER.json') as f:
    ptr = json.load(f)

ptr['updated'] = '2026-11-10'

ptr['nextAction'] = (
    "NEXT RUN 89: RESEARCH + PROMOTION RUN FOR BOOK #4 'ADVANCED ALGEBRA' (Mathematics shelf, "
    "the queue's next book after Elementary Algebra closed at run 88) — the run-66 precedent "
    "followed exactly: (1) reference survey of the Drive collection's MATHS folder for the "
    "advanced-algebra ground (Hall & Knight Higher Algebra is already banked as the classic; "
    "look for polynomial-theory, inequalities-at-depth, and JEE-mains-level algebra texts; "
    "internet research is the sanctioned fallback); (2) syllabus audit, web-checked — NCERT "
    "class 11 ch. 2 'Relations and Functions' is already banked (ncert-math11-ch2-functions); "
    "map the class 11-12 arc (functions in depth, quadratic-theory revisit, sequences and "
    "series, binomial theorem, permutations/combinations, complex numbers' algebraic side, "
    "inequalities, logs/exponents) against the competitive scope (Khattar QA, JEE foundation) "
    "and the classic stretch (Hall & Knight Higher Algebra); (3) write the researched full TOC "
    "(chapters + lesson titles) into a new book.ts skeleton with status 'in-progress' ONLY "
    "after the research phase is complete (never create empty shells — SUBJECT_BACKLOG "
    "promotion rule); (4) register the book in src/data/library/index.ts; (5) bank the "
    "citation keys in SOURCE_LOG.md; (6) update the memory files (PROGRESS phase, "
    "SUBJECT_BACKLOG promotion line, this pointer's nextAction for run 90 = ch. 1 opens with "
    "1.1 + 1.2); (7) gate: lint + tsc + routes 200 + a browser E2E of the book page (the TOC "
    "renders, no console errors); (8) ship + log + commit + push per the standing protocol. "
    "NO LESSON CONTENT in run 89 — the research phase is the run; authoring opens at run 90 "
    "with verify-book4-ch01.ts written FIRST (the verify-first discipline). NEVER open a new "
    "book in a closing run — run 88 closed Elementary Algebra; this is the separation rule in "
    "action. NOTE: 11.3's composition doorstep deliberately labels the next book's opening "
    "territory (composites, inverses, domains of composites) — the researched TOC should "
    "honour that handoff."
)

ptr['lessonScope'] = {
    'currentChapter': 'BOOK CLOSE — Elementary Algebra ch. 11 complete 3/3 (run 88)',
    'written': [
        '11.1 Word Problems: the Toolkit at Work (run 87)',
        '11.2 Competition Algebra: Identities and Substitutions (run 87)',
        '11.3 The Function Idea: the Doorstep + the unit-11 completion review + THE BOOK CLOSE (run 88)',
    ],
    'remaining': [
        'NONE in book 3 — Elementary Algebra is COMPLETE (11/11 chapters, 37 lessons, 171,460 words)',
        'run 89 = the research/promotion run for book #4 Advanced Algebra; run 90 opens its chapter 1 (1.1 + 1.2)',
    ],
}

ptr['run88Extras'] = (
    "Run 88 (2026-11-10, day window of job 516929's v4 hybrid cadence, delivered on a "
    "continuation turn carrying the full LOCKIN RUN payload with the PAT re-embedded): AL ch. "
    "11 'The Toolbox and the Doorstep' CLOSES 3/3 + the unit-11 completion review PASSED + THE "
    "BOOK CLOSE — BOOK #3 ELEMENTARY ALGEBRA IS COMPLETE (11/11 chapters, 37 lessons, 171,460 "
    "words; library 120 lessons / 583,505 words / 3 complete books). 11.3 'The Function Idea: "
    "the Doorstep' (al-the-function-idea-the-doorstep, 6,523 words, quiz keys 2/0/3/1/2, 14 "
    "exercises, two figures — the function machine + the probe verdicts strip). Verify-first "
    "held to the last paragraph: verify-book3-ch11.ts gained section G (the function engines: "
    "the machine at nine inputs, the notation engine with f(x+1) certified symbolically, the "
    "domain engines with both refusal guards fired by the engine itself, the vertical-probe "
    "engines, the linear/range engines, the composition engine with the quartic certified as "
    "f o g and sqrt(x^2) = |x|) + two figure plans + the PREWRITE=1 gate, and the pre-write "
    "battery ran 326 checks green BEFORE any prose. The full run: 903 checks A-H + F ALL GREEN "
    "(H = the authored census 16 paras/6 headings/1 table/1 derivation/2 equations/2 figures/4 "
    "callouts/4 examples/1 terms/1 list/4 formulas, quiz keys [2,0,3,1,2] vs pinned, all 14 "
    "exercise anchors re-priced, citations 4/4 including the NEW ncert-math11-ch2-functions; F "
    "= the REWRITTEN closing state: chapter 11 complete with no planned lessons, every one of "
    "the 11 chapters complete, the book status 'complete', the unit-11 review — word floors "
    "4,612/4,128/6,523, quiz keys vs pinned 3/3, 42 exercises chained 14+14+14, six figures "
    "palette-audited, the arcs closed (11.1's 8.3 debt + 5.2/6.2 + 7.2 + 9.1; 11.2's "
    "3.3/4.3/9.4 + 9.3 surd doors; 11.3 growing 10.1's probes + 10.2's slope + 10.3's parabola "
    "into the function idea, with 11.2's camera named as composition), Leibniz/Euler/Dirichlet "
    "web-checked, the handoff note naming the four next books). E2E e2e-al-113 45/45 x3 "
    "viewports (quiz 5/5 live on intended keys, KaTeX 422 nodes 0 errors, 0 console errors, no "
    "overflow, prereq chips 6, Sol. pills 18); SVG audits 0/0 x2 (8 grazes fixed by "
    "re-geometrising the verdict strip — r = 75 so the 3:4:5 probe meets land on integers "
    "(405, 116) and (405, 236), labels moved clear); lint 0; tsc clean; routes 200; WORKLOG + "
    "PROGRESS + RESUME_POINTER + SOURCE_LOG + WORK_INVENTORY + DETAILED_LOG + SUBJECT_BACKLOG "
    "shipped; e2e-al-113 whitelisted in .gitignore BEFORE the commit; zero downloads (one new "
    "key banked: ncert-math11-ch2-functions, NCERT class 11 ch. 2 'Relations and Functions' "
    "web-checked at ncert.nic.in kemh102.pdf). Pre-writing catches: the figure-centre check was "
    "first mis-summed (125 + 595 = 720, not 730 — the symmetric-arrows claim caught its own "
    "slip); the (g o f) certificate had to be BUILT by increment-after-square, not read off a "
    "bare square. Authoring catches: the verdict strip's first draft grazed its probe lines 8 "
    "times (fixed); one engine check (the reverse Fahrenheit read C = 30) was added BEFORE the "
    "prose quoting it. The push: the PAT was present — run 87's deferred commits (aa2dadd + "
    "3a5aafb) plus run 88's ship were all pushed per the one-time-URL protocol, remote sync "
    "verified by ls-remote (the sha recorded in lastPush and the WORKLOG push-verification "
    "entry). Run 89 = the research/promotion run for book #4 Advanced Algebra."
)

with open(f'{ROOT}/docs/project/RESUME_POINTER.json', 'w') as f:
    json.dump(ptr, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('RESUME_POINTER.json updated (nextAction -> run 89 book-#4 research; run88Extras added; lessonScope closed)')
