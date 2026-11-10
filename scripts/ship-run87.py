#!/usr/bin/env python3
"""ship-run87.py — one-shot memory ship for run 87 (2026-11-10): update
PROGRESS.json + RESUME_POINTER.json for the ch. 11 opening. Historical
record; the numbers are taken from the verifier's own outputs (684 checks,
word counts 4,612 / 4,128, book 36 lessons / 164,937 words, library 119
lessons)."""

import json

PHASE = (
    "PLATFORM 2026-11-10 (cron cadence v4 hybrid: night hourly 23:50-04:50 IST + day every-3h). "
    "BOOK #3 Elementary Algebra ch. 11 'The Toolbox and the Doorstep' OPENED 2/3 at run 87 (2026-11-10): "
    "11.1 'Word Problems: the Toolkit at Work' (al-word-problems-the-toolkit-at-work, 4,612 words, quiz keys "
    "2/3/1/0/2 - run 87) + 11.2 'Competition Algebra: Identities and Substitutions' "
    "(al-competition-algebra-identities-and-substitutions, 4,128 words, quiz keys 1/2/0/3/1 - run 87). "
    "11.1: the five-station pipeline READ -> NAME -> RELATE -> SOLVE -> CHECK priced end-to-end with exact "
    "arithmetic across the canon's five families - mixture (the value balance 40x + 70*30 = 55(x+30) -> x = 30, "
    "both sides 3300; the alligation cross DERIVED from it and priced 1:1 and 3:2 on the two designs; the acid "
    "blend 27/2 = 27/2 and the dilution with the acid carried invariant), motion (the 360-km train's fractional "
    "equation cleared to v^2 + 5v - 1800 = 0, delta = 7225 = 85^2, doors 40 and -45 with the habitat refusing "
    "-45 and 9 - 8 = 1 exact; the 15-km boat 2b^2 - 15b - 8 = 0 with delta = 289 = 17^2, b = 8; the flat/uphill "
    "elimination pair f = 3/2, u = 1/2), work-rate (8.3's debt paid: 1/10 + 1/15 = 1/6, the template "
    "t = ab/(a+b) = 6 with the always-pair check; the 5-days-longer hunt x^2 - 7x - 30 = 0, doors 10 and -3; "
    "the drain subtracting 1/12 - 1/18 = 1/36; the three-pipe cistern 5/24 -> 24/5 h = 4 h 48 min), age (the "
    "father 3x the son, twice in 12 years: 48 = 2*24 exact), money (the 5,000-rupee split 5x + 8(5000-x) = "
    "31000 -> x = 3000 with 150 + 160 = 310; the mark-up-then-discount 225/2 with profit 1/8 = 12.5%), and the "
    "fence engine (7.2's fences: (272 + s)/5 >= 70 -> s >= 78 with the cap-100 legal band and the honest "
    "impossible design s >= 102 refused). 11.2: the identity bank - fourteen identities certified by symbolic "
    "polynomial expansion (coefficient-exact, zero coefficients stripped after cancellation) AND designed "
    "substitution including negatives and fractions: (a +- b)^2, (a+b)(a-b), (a +- b)^3, a^3 +- b^3 via their "
    "three-term factorizations, the bridge (a+b)^2 - (a-b)^2 = 4ab, (a+b+c)^2, the competition staple "
    "(x+y+z)(x^2+y^2+z^2-xy-yz-zx) = x^3+y^3+z^3-3xyz with the sum-zero verdict priced on {1, 2, -3} "
    "(-18 = -18) and the sum-zero square identity 14 = -2*(-7) on two triples, the Brahmagupta-Fibonacci "
    "two-squares identity with 65 = 1^2 + 8^2 = 4^2 + 7^2 explained by the two matchings, and the cube twins "
    "(m+h)^3 +- (m-h)^3 = 2m(m^2 + 3h^2) / 2h(3m^2 + h^2) priced at (100, 1) and (100, 3); the speed reads "
    "(101x99 = 9999, 51x49, 998x1002, 97x103, 102^2, 98^2, 205^2, 195^2, 999^2, 105^2-95^2 = 2000, "
    "205^2-195^2 = 4000, 1002^2-998^2 = 8000, 101^3+99^3 = 2,000,600, 103^3-97^3 = 180,054 - both sides "
    "computed independently in BigInt); the symmetric reads (9.4's craft at speed: the x + 1/x ladder "
    "23/110/527/2525 for 5, each rung surd-certified at x = (5+sqrt(21))/2 AND ladder-certified; the = 3 "
    "ladder 7/18/123 with the two-step s5 = s2*s3 - s1; = 7 (47, 322); = 4 (14, 52, 194); the pair families "
    "x+y = 7, xy = 6 -> 37/217/25 with the roots {6, 1} priced, and x+y = 12, xy = 27 -> 90/756 with the roots "
    "{9, 3}); and the clever substitution (the warm-up (2x+1)^2 - 5(2x+1) + 6 = 0 -> x = 1/2, 1; the quartic "
    "(x^2-3x+3)^2 - 3(x^2-3x+3) + 2 = 0 collapsed by t = x^2-3x+3 to FOUR real roots 1, 2, (3 +- sqrt(5))/2 "
    "with the surd doors certified by exact surd arithmetic reading t = 2; the sibling (x^2-5x+5)^2 - "
    "(x^2-5x+5) - 2 = 0 -> 2, 3, (5 +- sqrt(13))/2). E2E e2e-al-111 + e2e-al-112: 45/45 x3 viewports each; "
    "SVG audits 0/0 x4 (two top-edge label grazes fixed - the labels moved inside, clear of the header "
    "bands); verify-book3-ch11.ts 684 checks A-F ALL GREEN (237 pre-write at the gate). The book stands at "
    "36 lessons / 164,937 words with 10 complete chapters of 11 and the eleventh open 2/3; library 119 "
    "lessons. NEXT: run 88 = 11.3 'The Function Idea: the Doorstep' + the unit-11 completion review + the "
    "BOOK CLOSE."
)

LAST_COMPLETED = {
    "run": 87,
    "date": "2026-11-10",
    "what": "AL ch. 11 OPENED 2/3: 11.1 'Word Problems: the Toolkit at Work' (4,612 words, quiz 2/3/1/0/2, "
            "14 exercises, two figures - the pipeline map + the motion timeline) + 11.2 'Competition Algebra: "
            "Identities and Substitutions' (4,128 words, quiz 1/2/0/3/1, 14 exercises, two figures - the "
            "(a+b)^2 area proof + the difference-of-squares strip); verify-book3-ch11.ts 684 checks ALL GREEN "
            "(237 pre-write); E2E 45/45 x3 each; SVG audits 0/0 x4; book 36 lessons / 164,937 words, 10 "
            "complete chapters of 11, the eleventh open; run 88 = 11.3 + the unit-11 review + the BOOK CLOSE",
}

RUN87_EXTRAS = (
    "Run 87 (2026-11-10, day window, job 516929's v4 hybrid cadence, delivered on a continuation turn of trace "
    "cron-agent-loop-202611101447): AL ch. 11 'The Toolbox and the Doorstep' OPENS 2/3 - 11.1 'Word Problems: "
    "the Toolkit at Work' (al-word-problems-the-toolkit-at-work, 4,612 words, quiz keys 2/3/1/0/2, 14 "
    "exercises, two figures - the pipeline map (five station chips READ/NAME/RELATE/SOLVE/CHECK with the "
    "360-km train threading worked panels and the two-filters note band) + the motion timeline (the 9-hour "
    "40-km/h bar with its orange ninth hour against the 8-hour 45-km/h bar with the dashed ghost hour, both "
    "carrying the same 360 km), the five-station pipeline as an algorithm block, the five-family census table, "
    "the value balance + the alligation cross DERIVED in a four-step derivation, the train as fractional-"
    "equation-grown-quadratic, 8.3's work-rate debt paid with the always-pair check, the age bookkeeping, the "
    "money split with the mark-up-then-discount 12.5%-not-15% read, 7.2's fence engine with the honest "
    "impossible design) + 11.2 'Competition Algebra: Identities and Substitutions' "
    "(al-competition-algebra-identities-and-substitutions, 4,128 words, quiz keys 1/2/0/3/1, 14 exercises, two "
    "figures - the (a+b)^2 area proof (a = 160 px, b = 100 px, the middle term 2ab as the two amber panels, "
    "the identity band color-coded) + the difference-of-squares strip (a = 210, b = 60 drawn to scale, the L "
    "cut into a x (a-b) and (a-b) x b with the block ROTATED to the strip's end, the b^2 corner struck out in "
    "red)), the identity bank table (seven rows, certificate column + speed-use column), the identity-vs-"
    "equation distinction para, the cube-of-a-sum derivation from the certified square, the speed reads with "
    "anchor choice, the cube twins, the symmetric quartet + the x + 1/x ladder with the two-step ladder, the "
    "sum-zero staple and the sum-zero square identity, the clever substitution retiring a quartic with four "
    "real roots (surd doors certified), the Brahmagupta-Fibonacci two-squares identity with 65's two reads. "
    "verify-book3-ch11.ts 684 checks A-F ALL GREEN: sections A-C pre-write 237 checks BEFORE any prose (the "
    "pipeline engines across five families, the identity-bank engines with symbolic expansion + substitution "
    "certificates, the surd arithmetic for the ladders and the quartic's doors, the four figure plans pinned "
    "rect-exact), authored batteries D/E (structure censuses, quiz keys vs pinned, all 28 exercise anchors "
    "re-priced, figure geometry rect-exact vs plans, citation keys, word floors, hygiene scans) and F (the "
    "OPENING state: ch. 11 in-progress with exactly two lessons, 'The Function Idea: the Doorstep' still "
    "planned, the book never closed, 36 lessons / 164,937 words, library 119 lessons, ids unique). "
    "Pre-writing catches: the sum-zero triple {1, 2, -3} prices x^3+y^3+z^3 - 3xyz = 0 (the cubes EQUAL 3xyz, "
    "both -18 - the difference is zero, which is the staple's whole content); quadRoots returns its doors "
    "largest-first so the door checks read the pair unordered; the polynomial engine must STRIP zero "
    "coefficients after cancellation or the expansion certificates mis-count their terms. Authoring catches: "
    "the example block type takes no answer field (the final Hence-line carries it); the Python expander "
    "dropped one escaping level on \\\\frac/\\\\cdot/\\\\{ (six odd backslash runs, caught by the hygiene scan "
    "and doubled); 5.2 and 9.1 had to be named verbatim in the SOLVE station for the cross-reference arcs; "
    "11.2's first draft sat at 3,604 words - below the 4,000 floor - and was expanded with verified content "
    "(the identity-vs-equation para, the symmetric-quartet example, the sum-zero square identity - its checks "
    "added to the engine BEFORE the prose, the verify-first discipline held) to 4,128. E2E e2e-al-111 + "
    "e2e-al-112: 45/45 x3 viewports each (quiz 5/5 live on intended keys, KaTeX 148/335 nodes 0 errors, 0 "
    "console errors, no overflow, prereq chips 5/4, Sol. pills 17/18); SVG audits 0/0 x4 (two grazes fixed: "
    "the (a+b)^2 figure's top 'b' label and the L's top 'a' label sat across the header band's bottom border - "
    "both moved inside the figures, clear of every border). Historical notes web-checked: Ahmes and the Rhind "
    "papyrus (c. 1550 BCE, the aha problems 24-34), Euclid Book II geometric algebra (Proposition II.4), "
    "Brahmagupta-Fibonacci (628 CE / Liber Quadratorum 1225). Zero downloads (banked keys carried the run: "
    "hall-knight-elementary-algebra, ncert-math8-ch2-linear-equations, euclid-elements-ii4, khattar-qa-4e, "
    "cengage-jee-style); chapter 11 NOT closed; run 88 = 11.3 + the unit-11 review + the BOOK CLOSE."
)

# ---------------- PROGRESS.json ----------------
with open('docs/project/PROGRESS.json') as f:
    prog = json.load(f)
prog['updated'] = '2026-11-10'
prog['phase'] = PHASE
prog['lastCompleted'] = LAST_COMPLETED
prog['run87Extras'] = RUN87_EXTRAS
with open('docs/project/PROGRESS.json', 'w') as f:
    json.dump(prog, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('PROGRESS.json shipped (phase, lastCompleted, run87Extras)')

# ---------------- RESUME_POINTER.json ----------------
with open('docs/project/RESUME_POINTER.json') as f:
    rp = json.load(f)
rp['updated'] = '2026-11-10'
rp['nextAction'] = (
    "NEXT RUN 88: CLOSE BOOK #3 — Elementary Algebra ch. 11 'The Toolbox and the Doorstep' finishes with 11.3 "
    "'The Function Idea: the Doorstep' (input, rule, output; the function notation f(x); why functions "
    "organize everything; the doorstep to Advanced Algebra and Calculus — 10.2's vertical probes and 10.3's "
    "parabolas are already functions wearing plain clothes) + THE UNIT-11 COMPLETION REVIEW + THE BOOK CLOSE "
    "RIDE (the book's final ship: flip the book status to complete, the closing snapshot, the handoff note to "
    "Advanced Algebra / Coordinate Geometry / Trigonometry / Calculus). AUTHOR VERIFY-FIRST: extend "
    "scripts/verify-book3-ch11.ts with the 11.3 engines BEFORE any prose (the input-output machine priced on "
    "designed rules; the notation read; the domain honest where the rule refuses — 8.3's bills again; the "
    "vertical-probe uniqueness of 10.1 read as a function; the parabola of 10.3 as f(x) = ax^2 + bx + c; "
    "linear functions from 10.2's slope-intercept form; the composition doorstep kept honest and labelled for "
    "the next book). Then author per BOOK_FORMAT + the ch-06..11 exemplar, recompute every number with a "
    "script BEFORE writing it, run the full gates (verify sections, bun run lint, tsc --noEmit, dev routes "
    "200 with nohup in the SAME command as the E2E, browser E2E x3 viewports via e2e-al-113.sh/.page.js — "
    "whitelist in .gitignore BEFORE committing, SVG overlap audits). The unit-11 completion review checks: "
    "word floors 4,612/4,128/11.3; quiz keys vs pinned 3/3; 42 exercises chained; figures vivid; arcs closed "
    "(11.1 pays 8.3's debt by name, uses 5.2/6.2's craft and 7.2's fences; 11.2 leans on 3.3/4.3/9.4 and "
    "carries the surd doors of 9.3; 11.3 grows 10.1's probes and 10.2's slope and 10.3's parabola into the "
    "function idea — the book's last arc); then the BOOK CLOSE: chapter 11 status complete, no planned "
    "lessons, the book status 'complete', the final snapshot, and a fresh lastPush record. NEVER open a new "
    "book in run 88 — the next book's opening is its own run with its own research phase. Whitelist "
    "e2e-al-113 in .gitignore BEFORE committing."
)
rp['nextUnit'] = (
    "run 88 = AL ch. 11 'The Toolbox and the Doorstep' CLOSES with 11.3 'The Function Idea: the Doorstep' + "
    "the unit-11 completion review + the BOOK CLOSE (verify-book3-ch11.ts extended FIRST; the book's final "
    "ship); the next book opens in its own run with its own research phase"
)
rp['lastCompleted'] = LAST_COMPLETED
rp['lessonScope'] = {
    "currentChapter": "AL ch. 11 'The Toolbox and the Doorstep'",
    "written": [
        "11.1 Word Problems: the Toolkit at Work (run 87)",
        "11.2 Competition Algebra: Identities and Substitutions (run 87)",
    ],
    "remaining": [
        "11.3 The Function Idea: the Doorstep (+ the unit-11 completion review + the BOOK CLOSE — run 88)",
    ],
}
rp['run87Extras'] = RUN87_EXTRAS
with open('docs/project/RESUME_POINTER.json', 'w') as f:
    json.dump(rp, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('RESUME_POINTER.json shipped (nextAction run 88, lessonScope, run87Extras)')
