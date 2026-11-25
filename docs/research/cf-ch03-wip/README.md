# cf-ch03-wip — the CS RUN 5 preservation directory (TRACKED, recycle-proof)

Computer Fundamentals chapter 3 'Data Representation: a First Meeting'
— the CS RUN 5 ship (2026-11-25) and the CS RUN 6 resumption kit.

## Status after CS RUN 5
- SHIPPED (assembled into `src/data/library/books/computer-science/
  computer-fundamentals/ch-03.ts`, verified by `scripts/verify-cs-book2-ch03.ts`
  424/424): **3.2, 3.6, 3.7** — parts `part-cf32/36/37.ts` +
  engines `v-cf32/36/37.ts` (134/134, 121/121, 131/131).
- DEFERRED to CS RUN 6 (per the time-budget law; the run cap arrived
  after two swarm rounds against the platform's subagent-deadline
  wall): **3.1** (spec only, no engine), **3.3, 3.4, 3.5, 3.8, 3.R**
  (specs + ENGINES LANDED GREEN: `v-cf33.ts`, `v-cf34.ts`, `v-cf35.ts`,
  `v-cf38.ts`, `v-cf3R.ts` — each expects a `part-cf<NN>.ts` that
  satisfies its pin block; three tiny stub parts exist for 34/35/38
  and should be overwritten).
- The orchestrator's pre-flight pin checker `pin_check_cs5.py`
  (112/112 GREEN) carries EVERY number the chapter will print, per
  seat. The quiz keys: 31 [1,2,0,3,1] · 32 [2,0,3,1,2] · 33
  [0,3,1,2,3] · 34 [3,1,2,0,1] · 35 [2,3,0,1,0] · 36 [1,0,3,2,2] ·
  37 [3,2,1,0,3] · 38 [0,2,1,3,0] · 3R [2,1,0,3,1].

## The CS RUN 6 resume path (README for the next fire)
1. Step-0 pull-first; re-read `docs/project/CS_AUTHORING_POINTER.json`
   (it names this directory).
2. Launch the six seats' agents (3.1 needs an engine first; the other
   five are prose-only — their engines are DONE and their specs are
   banked as `spec-cf<NN>.md`; read `SPEC_CORE.md` as part of each
   spec). Continuation pattern: verify the engine still runs green,
   write the part, re-run green.
3. Grow `scripts/assemble_cs5.py` to six parts (the PARTS list + the
   chapter tail's lessons/plannedLessons + the Z census re-pins: 9
   lessons, plannedLessons [], status 'complete').
4. Amend the shelf gates: csWritten 11 → 17, totPl 1224 → 1225 (the
   3.R review is the +1); re-pair the e2e set (three pairs exist for
   3.2/3.6/3.7; add six via `scripts/gen-cs5-e2e.py`'s pattern).
5. Close the chapter; the next fire opens ch.4 'Inside the Box'.
6. The VLM light+dark figure sweep for 3.2/3.6/3.7 rides the CS RUN 6
   opening (the honest run-5 deferral — the e2e mechanical figure
   gates were all green).

## Provenance
Ground: the sanctioned internet fallback, citation key
`cs-cf-web-ground` (docs/project/SOURCE_LOG.md, the 2026-11-25 entry
carries every URL). STUDY-NEVER-REPRODUCE absolute.
