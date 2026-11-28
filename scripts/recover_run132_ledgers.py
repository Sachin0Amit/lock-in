#!/usr/bin/env python3
"""recover_run132_ledgers.py — corrects the shared ledgers to the TRUE run-132
outcome after the rogue-destruction event (the run132_ledgers.py entries,
written before the event was discovered, claimed the ch.6 close as durable —
it was not: the artifacts were destroyed uncommitted)."""
import json

ROOT = "/home/z/my-project"

# ---------- WORKLOG.md (append-only: a correction block, never a rewrite) ----------
WORKLOG_CORRECTION = """
## 2026-11-28 — RUN 132 CORRECTION + CLOSE-OUT (orchestrator, same fire): a rogue concurrent agent operation DESTROYED the uncommitted ch.6 artifacts at ~02:45 — the chapter is NOT shipped; everything durable is re-banked; run 133 re-authors from the PROVEN specs

**What happened (the honest record):** run 132 executed fully — step-0 pull (remote 8be1eb7 an ancestor; the run-131 close ad7e74d still unpushed and riding this run's push); rider (a) the ch.5 E2E grid RUN AND ALL PASS (census-geo5.sh live census -> gen-geo132-e2e.py calibrated -> e2e-geo-51/52/53/54 green, 4 lessons x 3 viewports, quiz 5/5 live on [3,0,4,1,2]/[1,4,2,0,3]/[4,1,0,3,2]/[0,3,2,4,1], 0 console errors, no overflow 390/1280, dark clean — and the DOM-stability probe: the geo solution accordions keep content in the DOM, hidden only); rider (b) the ch.5 VLM light+dark sweep RAN (94 crops, 8 z-ai vision audits, ~24 real label-collision defects found); the ch.6 reference scan + pin engine (58/58, one first-draft catch: the dart's walk-turn order) + master plan + three specs; THE SWARM LANDED ALL THREE SEATS GREEN (geo601 99/99 after two launch-wall retries, geo602 86/86, geo603 69/69 — 10,738/11,122/12,628 words); assemble_run132.py built ch-06.ts (4,424 lines) + verify-book5-ch06.ts and it ran **286/286 ALL GREEN**; the full gate battery passed (tsc 0, lint 0 errors, lib:pack 248 written + check PASS, completeness 0 errors, 3 routes 200). THEN, at ~02:45 — BEFORE the run-end commit — a rogue concurrent agent operation (the fix-rider seat launched third; its Task call had returned 'context deadline exceeded' to the orchestrator, but a zombie execution continued) destroyed the uncommitted artifacts: **ch-06.ts, the entire geo-ch06-wip dir (parts/harnesses/specs/reports), the run-132 scripts (assemble/pin/census/e2e-generator/sweep/audit), the /tmp crops and e2e outputs, and the book.ts swap (reverted to the planned ch.6)** — and the packed db was re-packed WITHOUT ch.6 at 02:49. The zombie's ONE surviving contribution: geo504's FIX_QUEUE items fixed at part level + mirrored into the ch-05.ts twin (verified post-event: geo504 harness 96/96, tsc 0 — the vision re-audit still pending). The three Task-launch failures for the fix seat were infrastructure ('context deadline exceeded'), and the zombie wrote AFTER dying — the launch-wall pattern now also means POSSIBLE ZOMBIE WRITES: the run-131 'banked partial files' precedent, escalated.

**The recovery (same fire, within the remaining budget):** every durable artifact re-banked VERBATIM from the orchestrator's context — GEO_CH06_MASTER_PLAN.md (with the recovery note), spec-geo601/602/603.md (marked PROVEN: they landed 3/3 green once — same pins, same keys [2,4,0,3,1]/[0,3,1,4,2]/[4,0,3,1,2]), pin_check_geo132.py (the exact 58/58 source), spec-FIX_QUEUE_132B.md (with the geo504-done status), and the eight VLM verdict files re-banked verbatim under vlm-sweep-run132-verdicts/. The tool scripts (census-geo5.sh, gen-geo132-e2e.py, sweep/audit_vlm_geo132.sh) are regenerable in minutes from the surviving tracked patterns (gen-geo129-e2e.py, sweep_vlm_geo131.sh, audit_vlm_geo131.sh) — run 133 rebuilds them.

**THE NEW LAW (recorded for every future run, the run-131 'commit early' lesson now made explicit): COMMIT PER CHAPTER CLOSE, IMMEDIATELY AFTER THE VERIFIER GOES ALL GREEN — before riders, before the remaining gates, never only at run end. A green chapter that exists only as uncommitted files is one rogue operation away from not existing. The push still runs at run end per step 7.**

**True run-132 ledger state:** GEOMETRY ch.6 is NOT closed on disk (book.ts planned again; pack back to 245 written). Paid and durable: the E2E-grid RUN (pass evidence in this log; scripts regenerable), the VLM sweep RUN (verdicts re-banked), geo504's six figure fixes (harness-verified; vision re-audit pending), the ch.6 reference scan (SOURCE_LOG run-132 block survived), the pin engine + master plan + specs (re-banked, PROVEN). Run 133 = re-author ch.6 from the specs (the first seat work), re-assemble + re-gate + CLOSE + COMMIT EARLY, then the FIX_QUEUE_132B remainder (501/502/503 + the 504 re-audit), the ch.6 E2E grid + VLM sweep; ch.7 'The Circle' rides after ch.6 actually ships.
"""

with open(f"{ROOT}/docs/project/WORKLOG.md", "a", encoding="utf-8") as f:
    f.write(WORKLOG_CORRECTION)
print("WORKLOG correction appended")

# ---------- PROGRESS.json (state file: rewritten to truth) ----------
p = json.load(open(f"{ROOT}/docs/project/PROGRESS.json"))
p["updated"] = "2026-11-28 (run 132 CLOSE-OUT: ch.6 was authored+assembled+verified 286/286 green but a rogue agent operation destroyed the uncommitted artifacts before the run-end commit — chapter NOT shipped, all specs/pins/verdicts re-banked PROVEN; ch.5 E2E grid RUN ALL PASS; ch.5 VLM sweep RUN (~24 defects, verdicts re-banked); geo504's six figure fixes landed harness-verified)"
p["phase"] = "maths lane: run 132 closed out with ch.6 UNSHIPPED (authored green, destroyed uncommitted by a rogue concurrent agent, everything durable re-banked); run 133 = re-author ch.6 'Quadrilaterals and Polygons' from the PROVEN specs + re-assemble + CLOSE + COMMIT-EARLY (the new law) + FIX_QUEUE_132B remainder + ch.6 E2E/VLM; ch.7 'The Circle: Chords, Angles and Tangents' rides after ch.6 ships; cs lane: run 11 next per the CS pointer"
p["awaiting"] = "next maths fire (run 133, nightly job 552081): re-author + close ch.6 from the re-banked specs (COMMIT EARLY per the new law), riders FIX_QUEUE_132B remainder + ch.6 E2E + ch.6 VLM"
with open(f"{ROOT}/docs/project/PROGRESS.json", "w", encoding="utf-8") as f:
    json.dump(p, f, ensure_ascii=False, indent=1)
print("PROGRESS corrected")

# ---------- RESUME_POINTER.json (state file: rewritten to truth) ----------
r = json.load(open(f"{ROOT}/docs/project/RESUME_POINTER.json"))
r["updated"] = "2026-11-28 (run 132 CLOSE-OUT — ch.6 'Quadrilaterals and Polygons' was authored by the swarm (geo601 99/99, geo602 86/86, geo603 69/69) and assembled + verified 286/286 ALL GREEN, but a rogue concurrent agent operation destroyed the uncommitted artifacts at ~02:45 before the run-end commit: ch-06.ts, geo-ch06-wip, the run-132 scripts, the book.ts swap; everything durable re-banked: master plan + 3 PROVEN specs + pin_check_geo132.py 58/58 + the 8 VLM verdicts + FIX_QUEUE_132B with geo504's items done harness-verified; the ch.5 E2E grid RAN ALL PASS and the ch.5 VLM sweep RAN)"
r["lastCompleted"] = "run 132 (maths lane, close-out): NOT a chapter close — the riders ran (ch.5 E2E grid ALL PASS 4x3 viewports; ch.5 VLM sweep 94 crops -> ~24 defects, verdicts re-banked; geo504's six FIX_QUEUE items fixed + mirrored + harness-verified 96/96), ch.6 was authored green but destroyed uncommitted; recovery re-banked all durable artifacts; the new COMMIT-EARLY law recorded"
r["nextAction"] = "GEOMETRY BOOK 5, CHAPTER 6 (RE-AUTHOR) — run 133, the maths lane, as a swarm per docs/project/RUN_PROTOCOL.md v9.2: (1) step-0 pull-first; (2) RE-AUTHOR ch.6 'Quadrilaterals and Polygons' WHOLE from the RE-BANKED PROVEN specs (docs/research/geo-ch06-wip/spec-geo601/602/603.md — they landed 3/3 seats green in run 132 before the rogue deletion; identical pins and quiz keys [2,4,0,3,1]/[0,3,1,4,2]/[4,0,3,1,2]; pin_check_geo132.py re-banked 58/58): one agent per lesson, staged seats, write-early-often; (3) rebuild assemble_run132.py on the assemble_run131.py pattern (index-bounded STATUS splice) + assemble + verify-book5-ch06 + gates; (4) *** THE NEW LAW: COMMIT IMMEDIATELY WHEN THE VERIFIER GOES ALL GREEN — before riders and remaining gates, never only at run end *** ; (5) RIDERS per amendment 6: FIX_QUEUE_132B remainder (geo501/502/503 items + geo504's vision re-audit; spec re-banked at docs/research/geo-ch05-wip/spec-FIX_QUEUE_132B.md, verdicts re-banked under vlm-sweep-run132-verdicts/), the ch.6 E2E grid (rebuild census-geo5.sh + gen-geo133-e2e.py on the surviving gen-geo129-e2e.py pattern), the ch.6 VLM light+dark sweep (rebuild on sweep_vlm_geo131.sh); (6) ledgers, PAT push of ALL unpushed commits, anonymous ls-remote verify. NOTE: the run-131 close commit ad7e74d was still unpushed at run-132 open — run 133's step-0 must reconcile and push it. The cs/hss/eng lanes are untouched by this pointer."
with open(f"{ROOT}/docs/project/RESUME_POINTER.json", "w", encoding="utf-8") as f:
    json.dump(r, f, ensure_ascii=False, indent=1)
print("RESUME_POINTER corrected to run 133")

# ---------- DETAILED_LOG.md (append-only: correction row) ----------
DETAILED_CORRECTION = """
| 2026-11-28 | RUN 132 (CORRECTION) | maths | geometry ch.6 'Quadrilaterals and Polygons' | NOT SHIPPED (destroyed uncommitted) | the swarm landed all 3 seats green (99/99, 86/86, 69/69; 34,488 words) + assembly 286/286 ALL GREEN + full gates, but a rogue concurrent agent operation destroyed the uncommitted artifacts at ~02:45 (ch-06.ts, geo-ch06-wip, scripts, book.ts swap; db re-packed without ch.6); riders durable: ch.5 E2E grid ALL PASS 4x3, ch.5 VLM sweep 94 crops -> ~24 defects (verdicts + FIX_QUEUE spec re-banked), geo504's six fixes harness-verified 96/96; recovery re-banked master plan + 3 PROVEN specs + pin engine 58/58 + verdicts; NEW LAW: commit per chapter close immediately on ALL GREEN | run 133: re-author ch.6 from specs, CLOSE + COMMIT EARLY, FIX_QUEUE remainder, ch.6 E2E + VLM |
"""
with open(f"{ROOT}/docs/project/DETAILED_LOG.md", "a", encoding="utf-8") as f:
    f.write(DETAILED_CORRECTION)
print("DETAILED_LOG correction appended")

# ---------- SOURCE_LOG.md (append-only: the note) ----------
SOURCE_NOTE = """
- RUN 132 close-out note (2026-11-28): the run-132 reference block above SURVIVED the rogue-destruction event (tracked file) and STANDS — the ch.6 ground is banked. The authored artifacts it grounded were destroyed uncommitted and are re-authoring in run 133 from the re-banked specs; the NCERT download attempts failed at the network layer (curl 000 from the sandbox; the sanctioned web-grounded fallback used and logged above); no working copies exist to delete.
"""
with open(f"{ROOT}/docs/project/SOURCE_LOG.md", "a", encoding="utf-8") as f:
    f.write(SOURCE_NOTE)
print("SOURCE_LOG note appended")
