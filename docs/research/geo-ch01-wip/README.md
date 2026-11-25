# geo-ch01-wip — RUN 124 preservation (GEOMETRY ch.1, opened 2026-11-25)

STATUS: chapter 1 CLOSED COMPLETE by run 125 — all four lessons delivered
whole, gated, pushed (1.3 + 1.4 by the run-125 two-round swarm at 109/109
and 101/101 green; the chapter-wide VLM figure sweep landed with fixes in
all four lessons). This directory is now the tracked provenance record.

## What ships (already in ch-01.ts + verify-book5-ch01.ts)
- lesson 1.1 geo-the-undefined-words-and-the-defined-ones — v-geo101 100/100, 7,532 words, quiz key [0,1,2,3,2], 3 body + 3 solution figures
- lesson 1.2 geo-euclids-five-postulates-the-rules-of-the-game — v-geo102 86/86, 8,524 words, quiz key [2,1,3,0,1], 3 body + 3 solution figures
- orchestrator seam fixes recorded: geo102's cool-tone palette remapped onto the vivid table (15 hex reads); the four single-backslash \alpha/\beta JS-escapes doubled (the KaTeX-error E2E catch); E2E 33/33 + 33/33 across 3 viewports; lib:pack v4 204 lessons / 1,194,880 words.

## What run 125 resumes (whole-chapter close)
1. Read RUN_PROTOCOL.md + RESUME_POINTER.json (they name this directory).
2. Author 1.3 from spec-geo103.md (agents geo103) and 1.4 from spec-geo104.md
   (agent geo104) — both specs are self-contained; the pre-flight pin checker
   pin_check_geo124.py is ALL GREEN (its witnesses feed both engines).
3. Assemble with scripts/assemble_run124.py EXTENDED (or a run-125 assembler):
   ch-01.ts grows lessonGeo103 + lessonGeo104, the chapter flips COMPLETE
   (plannedLessons []), verify-book5-ch01.ts grows sections geo103/geo104 +
   section Z flips to the closed-chapter census (4 lessons, ids in order,
   floors >= 6000).
4. Gates: verifier, tsc, lint, lib:pack+check (expect 206 lessons), standing
   gates (topic 667, toc 4023, math-shelf — the census counts data-dependently),
   E2E per lesson x3 viewports (scripts/e2e-geo13.sh + e2e-geo14.sh to create
   from the geo11/geo12 pairs; quiz keys from the agents' reports), VLM figure
   audit (light+dark) for the new figures.
5. Ledgers, commit, PAT push, ls-remote verify.
