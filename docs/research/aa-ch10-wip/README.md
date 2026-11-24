# AA ch.10 WIP — run 122 preservation record (2026-11-24)

Run 122 (the maths lane, job 545445, the whole-chapter cadence) targeted the WHOLE
chapter 10 'The Synthesis and the Doorstep' (10.1 + 10.2 + 10.3 + 10.4 + 10.R,
five agents). The platform's subagent runtime killed the authoring agents
mid-work across three launch rounds (the "context deadline exceeded" /
"empty response" pattern — NOT the run-121 pattern where files landed complete);
the run hit the ~2h cap with the chapter NOT closed. Per the RUN_PROTOCOL time
budget the run ends clean and defers; this directory preserves every landed
deliverable against the sandbox recycle (temporary-references/ is wiped between
runs — the run-121 lesson).

## Status at the run-122 close (honest)

- `pin_check_122.py` — the orchestrator's pre-flight pins: **117/117 GREEN**
  (every canonical witness for all five lessons, brute-forced; the 8 spec-drift
  constants were resolved IN FAVOUR OF THE ENGINE and corrected).
- `spec-aa101..10R.md` — the five self-contained agent specs (final versions).
- Lesson 10.1 — `part-aa101.ts.txt` (60 KB draft) + `v-aa101.ts.txt` (35 KB):
  **engines 110/110 GREEN**; prose INCOMPLETE at the kill: 4,663 words
  (floor 6,000), NO exercises block yet, quiz key slot 3 wrong
  (keys read [2,0,3,3,1], want [2,0,1,3,1]), one `\qquad` inline violation.
  RESUME: finish the exercises block (L1×3/L2×3/L3×3/L4×3/L5×2/L6×2 ≥16,
  ≥3 solution figures), fix the quiz item 3 key, strip the `\qquad`, extend
  the prose to ≥6,000 words, re-run v-aa101.ts until 0 fail.
- Lesson 10.2 — NOT STARTED (three launch attempts all died empty).
  The spec is complete; author from it fresh.
- Lesson 10.3 — `part-aa103.ts.txt` (69 KB) + `v-aa103.ts.txt`: **COMPLETE,
  203/203 GREEN** (150 engine + 53 pin), 6,030 words. One engine-win recorded:
  log₁₀C(50,25) = 14.1018 at 4 dp (spec carried a truncation).
- Lesson 10.4 — `part-aa104.ts.txt` (69 KB) + `v-aa104.ts.txt`: **COMPLETE,
  213/213 GREEN** (122 engine + 91 pin), 7,264 words. Three engine-wins
  recorded: S₁₀ = 5.8618940; the ε-promise's two reads (term read n = 22/66 vs
  tail read N = 43/87 — prose prices both); √x is a HALF-wall (the conjugate
  identity is exact school algebra).
- Lesson 10.R — `v-aa10R.ts.txt` (engine section built, pin section a
  placeholder); the prose was NEVER authored (three attempts died).

## The resume path (next fire, run 123)

1. Restore these files into temporary-references/ (strip the .txt suffix).
2. Finish 10.1 (per the status above) and author 10.2 + 10.R per their specs
   (agents or orchestrator, as the budget allows).
3. Assemble ch-10.ts from the five parts; build scripts/verify-book4-ch10.ts
   from the five v-files (wrap each as one section) + the Z closed-chapter +
   closed-BOOK census; book.ts: import + chapters array + status 'complete'
   + the TEN-chapters STATUS comment.
4. Gate everything (verifier, tsc, lint, pack+check, standing gates, E2E ×5 ×3
   viewports, VLM audit light+dark), update the six ledgers, ship.
5. The book then closes at 67 written lessons (62 banked + 5) — the honest
   census (PROGRESS's "57" and the pointer's "60" were stale arithmetic).
