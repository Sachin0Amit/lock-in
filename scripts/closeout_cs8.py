#!/usr/bin/env python3
"""closeout_cs8.py — CS RUN 8 ledger appends (WORKLOG / PROGRESS / SOURCE_LOG /
DETAILED_LOG / CS_AUTHORING_POINTER). Append-only on the shared ledgers."""

import json

ROOT = "/home/z/my-project"

WORKLOG = f"{ROOT}/docs/project/WORKLOG.md"
PROGRESS = f"{ROOT}/docs/project/PROGRESS.json"
SOURCELOG = f"{ROOT}/docs/project/SOURCE_LOG.md"
DETAILED = f"{ROOT}/docs/project/DETAILED_LOG.md"
POINTER = f"{ROOT}/docs/project/CS_AUTHORING_POINTER.json"

WORKLOG_ENTRY = """
## 2026-11-26 — CS RUN 8 (the cs job's eighth honored fire): computer-fundamentals chapter 4 'Inside the Box' CLOSED COMPLETE

**The fire:** triggered 22:20 IST 2026-11-25; the session rolled over context mid-run and continued with the owner live in-channel (the 2026-11-26 directive *"do as you please but don't compromise quality and quantity"* — codified this fire as RUN_PROTOCOL v9.1: staged seats, debt-first riders, ledger economy, next-chapter-on-clean-close). Step-0: tree clean, local one bookkeeping commit ahead of remote (`4848202`, the RUN 7 push record — case (ii); it rides this fire's push).

**The swarm (the v9.1 staged tactics' first full trial):** four agents in ONE parallel launch — seat cf41 (FULL WRITE with a staged spec: hard ~35-minute working window, engine-first, write-early-often), seat cf42 (prose-owed against its landed 46/47 engine) and the two riders (the ch.4 e2e pairs; the ch.3 VLM light+dark sweep). Both content seats landed WHOLE on the FIRST try — against RUN 7's three rounds and 4.1's double empty death:
- **4.1 'The Motherboard: the City Plan'** (cf-the-motherboard-the-city-plan): **v-cf41 117/117 GREEN** (61 engine checks + 56 pin re-reads), 10,458 words, quiz [2,0,3,1,3], 4 body + 5 solution figures, 8 Illustrations, 15 exercises L1-L4. The city plan priced: ATX 1995 Intel 305x244 = 74,420 mm2; microATX EXACTLY 0.800000 of ATX; Mini-ITX VIA 2001 = 28,900 mm2 = 0.388336 of ATX = 0.485421 of microATX; DIMM 288 pins; CR2032 3 V; 24-pin + 8-pin; Nehalem 2008 folded the memory controller; IBM PC August 1981 planar board; layers honestly hedged 'commonly 6-10'.
- **4.2 'The Processor Named Honestly'** (cf-the-processor-named-honestly): **v-cf42 83/83 GREEN** (the landed 46/47 engine completed by its part — P0 was only the missing file), 9,955 words, quiz [3,0,1,2,1], 4 body + 5 solution figures, 9 Illustrations, 15 exercises L1-L4. The honest naming: fetch-decode-execute-writeback; 1 GHz = 10^9; the 0.2 ns beat; 6756.7568 and 1351.3514; AMD 6 March 2000 first to 1 GHz, Intel two days later; the May 2005 dual-core month; Moore 19 April 1965 revised 1975; 2,300 x 2^26 = 154,350,387,200 vs M2 Ultra 134 billion = 1.151869 (15.186856% over); SRAM 6T vs DRAM 1T+1C; the von Neumann bottleneck via Backus 1977; SMT named honestly not-a-second-core.
- Both rider agents hit the platform's subagent-deadline wall (the sweep's FOURTH deferral) — the tiering held exactly as designed: the critical path shipped; the debt is scheduled riders-first for RUN 9 with SPLIT specs (generate-vs-run, capture-vs-fix).

**Integration (scripts/assemble_cs8.py, five jobs):** ch-04.ts rebuilt from all five parts in teaching order (palette C/FONT renamed per tag; 4,185 lines); verify-cs-book2-ch04.ts rebuilt to FIVE sections + the CLOSED Z census; book.ts STATUS refreshed (chapter 4 COMPLETE, chapters 5-8 planned); shelf gate csWritten 20 -> 22; exam-coverage pin held. **totPl correction, honestly logged:** the RUN 7 pointer predicted 1226 -> 1227, but closing ch.4 nets ZERO (2 planned slots become 2 written lessons; the 4.R review was already counted in RUN 7) — both gates pin the TRUE 1226 and the pointer's slip is corrected there. Two integration lessons for the record: (1) the wrapped v-cf42 redirect needed the ALIASED chapter import — its local `let lesson42: Lesson | null = null` shadows the module binding, so `Promise.resolve({ lesson42 })` bound the null local and skipped the pin block (fixed by importing `lesson42 as shippedLesson42` and binding the alias); (2) same-second mtime rewrites of ch-04.ts/the verifier served bun/tsc STALE transpiles twice (a phantom 46/47 and three phantom TS2345s, all vanishing on the fresh re-run) — the touch-then-rerun discipline is now protocol amendment 7.

**Gates at close:** verify-cs-book2-ch04 **542/542 ALL GREEN** (cf41 117 + cf42 83 + cf43 128 + cf44 83 + cf4R 84 engines+pins re-reading the SHIPPED chapter; Z 47 — the CLOSED census: five lessons, plannedLessons [], ids/numbers/titles verbatim, word floors 10,458/9,955/9,592/8,259/8,472, the full prereq chain, chapter 46,736 words, book in-progress with chapters 5-8 planned, shelf census 22) · tsc 0 project-wide · lint 0 errors (5 pre-existing warnings, all in pre-existing files) · lib:pack + lib:check PASS (269 books / **220 written lessons** / 9,683 planned — +2 written / +0 planned, the exact net-zero deltas) · standing gates: topic-coverage 667/667, toc-as-lessons 4023/4023, math-shelf-planning 1176/1176, cs-shelf-planning 2350/2350 (csWritten 22), cs-exam-coverage 696/696 (totPl 1226) · all five ch.4 lesson routes 200 on the dev server (cold Turbopack compiles of the 4,185-line chapter ran 57-120 s — the curl timeouts were the box thrashing, not defects; the server's own GET logs are the 200 evidence) · **the e2e pairs + the ch.3 VLM sweep deferred a FOURTH time** — RUN 9 opens RIDERS-FIRST per amendment 6.

**Bookkeeping:** this WORKLOG entry + PROGRESS re-phased + CS_AUTHORING_POINTER (lastCompleted -> CS RUN 8; nextAction -> CS RUN 9 riders-first then ch.5 'Software Families' WHOLE) + RUN_PROTOCOL v9.1 (the owner's 2026-11-26 speed directive codified as amendments 5-8; snapshot refreshed) + SOURCE_LOG (carry-over entry, no new sources) + DETAILED_LOG row + WORK_INVENTORY regenerated. The full wip persists TRACKED in docs/research/cf-ch04-wip/ (all five parts + engines + specs + SPEC_CORE + the pin checker — runnable, recycle-proof).
"""

SOURCELOG_ENTRY = """
### 2026-11-26 (CS RUN 8 — the cs job's eighth honored fire) — chapter 4 CLOSE, no NEW sources (carry-over record)
- The two RUN 8 seats (4.1 'The Motherboard: the City Plan', 4.2 'The Processor Named Honestly') wrote against the `cs-cf-web-ground-ch04` key banked 2026-11-25 (the entry above): every date and number they carry comes from that web-verified pin list (ATX Intel 1995 305x244; microATX <= 244 square 1996; Mini-ITX VIA 2001 170x170; IBM PC planar August 1981; DIMM 288 pins; CR2032 3 V lithium; 24-pin ATX + 8-pin CPU; Nehalem 2008; 4004 15 November 1971, 740 kHz, 2,300 transistors; Moore 'Cramming more components onto integrated circuits', Electronics, 19 April 1965, revised 1975 to two years; AMD Athlon 1 GHz 6 March 2000, Intel two days later; May 2005 Pentium D + Athlon 64 X2; Apple M2 Ultra 134 billion transistors 2023; SRAM 6 transistors/bit vs DRAM 1 transistor + 1 capacitor; L1/L2/L3 size bands prose-hedged). Engine-pinned in v-cf41 (117/117) and v-cf42 (83/83) and re-pinned against the SHIPPED chapter by scripts/verify-cs-book2-ch04.ts (542/542). The key rides the lesson footers of 4.1 and 4.2. STUDY-NEVER-REPRODUCE absolute: every roster, figure, Illustration, quiz item and exercise is OUR OWN. No book scans; no working copies; this entry is the citation record.
"""

DETAILED_ROW = "| 2026-11-26 | CS RUN 8 | computer-fundamentals ch.4 'Inside the Box' CLOSED COMPLETE | 4.1 'The Motherboard: the City Plan' (10,458 w, quiz [2,0,3,1,3], 117/117, 4+5 figures) + 4.2 'The Processor Named Honestly' (9,955 w, quiz [3,0,1,2,1], 83/83, 4+5 figures) — five lessons, plannedLessons [], 46,736 chapter words | verify-cs-book2-ch04 542/542; tsc 0; lint 0 err; pack 220 written; standing gates 667+4023+1176+2350+696; routes 200; e2e + VLM deferred (4th) to RUN 9 riders-first |\n"

PHASE = ("chapter 4 'Inside the Box' CLOSED COMPLETE (CS RUN 8, 2026-11-26: 4.1 'The Motherboard: the City Plan' "
         "117/117, 10,458 words + 4.2 'The Processor Named Honestly' 83/83, 9,955 words shipped whole FIRST TRY by "
         "the staged two-seat swarm — chapter five lessons, plannedLessons [], 46,736 words, verifier 542/542 with "
         "the closed census; csWritten 22; totPl 1226 net-zero close, the RUN 7 pointer's 1227 corrected); next: "
         "CS RUN 9 clears the rider debt RIDERS-FIRST (the ch.3 VLM light+dark sweep + the ch.4 e2e pairs, split "
         "specs) then opens ch.5 'Software Families' WHOLE; the maths lane: run 126 opens geometry ch.2 WHOLE per "
         "RESUME_POINTER")

AWAITING = ("CS RUN 9 (the cs job) clears the rider debt first (the ch.3 VLM light+dark figure sweep, four-times "
            "deferred; the browser e2e pairs for all five ch.4 lessons — every route is live), then opens "
            "computer-fundamentals ch.5 'Software Families' WHOLE (5.1 'System Software: the Manager Layer' + "
            "5.2 'Application Software: the Worker Families' + 5.3 'Installing, Updating and Licensing Honestly' "
            "+ the 5.R review) per the whole-chapter cadence and RUN_PROTOCOL v9.1")

POINTER_OBJ = {
    "updated": "2026-11-26",
    "lane": "COMPUTER SCIENCE shelf authoring (the cs cron job; created by owner directive 2026-11-21 'every thing same but do authoring for computer science book create a corn job keep the old one and create new one just for cs')",
    "nextAction": ("CS RUN 9 (the next honored :20 IST fire, as a swarm per docs/project/RUN_PROTOCOL.md v9.1): "
                   "RIDERS-FIRST per amendment 6 — clear the compounding debt with SPLIT specs on the fast tier: "
                   "(a) the ch.3 VLM light+dark figure sweep over the shipped ch-03.ts lesson pages (three-plus "
                   "times deferred; capture-vs-fix split; safe atomic text-level fixes only, geometry redesigns "
                   "deferred), and (b) the browser e2e pairs for all five ch.4 lessons on the gen-cs6-e2e.py "
                   "pattern, generate-vs-run split (keys [2,0,3,1,3] cf-the-motherboard-the-city-plan / "
                   "[3,0,1,2,1] cf-the-processor-named-honestly / [1,3,0,2,2] cf-the-first-memory-hierarchy / "
                   "[2,1,3,0,0] cf-buses-and-ports-how-the-pieces-talk / [3,1,0,1,2] cf-unit-4-completion-review; "
                   "routes live at /book/computer-fundamentals/lesson/<id>; dev server may need the one-invocation "
                   "restart discipline — the sandbox reaps background processes between calls). THEN, with >=45 min "
                   "left per amendment 8: OPEN computer-fundamentals chapter 5 'Software Families' WHOLE per the "
                   "whole-chapter cadence — 5.1 'System Software: the Manager Layer', 5.2 'Application Software: "
                   "the Worker Families', 5.3 'Installing, Updating and Licensing Honestly' + the 5.R 'Unit 5 "
                   "Completion Review' — one agent per seat, engine-first, staged specs with hard working windows, "
                   "research per step 2 (the Drive holds no CF source — the sanctioned internet fallback, logged "
                   "in SOURCE_LOG.md), pin checker banked in docs/research/cf-ch05-wip/ before prose, assembly on "
                   "the assemble_cs8.py pattern (NOTE the two RUN 8 lessons: alias the chapter import for engines "
                   "that pre-declare a local lesson binding; touch generated files before gating)."),
    "fallback": ("If the Drive holds no matching source for a CS chapter (the survey records which sources exist), "
                 "the sanctioned fallback = internet research on canonical TOCs (OpenStax/CMU/NPTEL-style syllabi; "
                 "Rosen for discrete topics), logged in SOURCE_LOG.md with URLs. The CS shelf's 44 planned books "
                 "are ALL 'planned' — author them in registry order (computer-fundamentals first, then "
                 "digital-logic-design, computer-organization-architecture, ...), one book at a time, chapter by "
                 "chapter, exactly like the maths lane's one-unit-at-a-time cadence."),
    "sharedLedgers": ("WORKLOG.md / PROGRESS.json / SOURCE_LOG.md / DETAILED_LOG.md / WORK_INVENTORY.json remain "
                      "the SHARED ledgers — append CS-run entries to them (do not fork them); this pointer file "
                      "carries ONLY the CS lane's WHAT-is-next. RESUME_POINTER.json stays the MATHS lane's pointer "
                      "(the 540785/545445 job reads it; this file serves the cs job)."),
    "lastCompleted": ("CS RUN 8 (2026-11-26, the cs job's eighth honored fire, continued past a context rollover "
                      "with the owner in-channel): computer-fundamentals chapter 4 'Inside the Box' CLOSED "
                      "COMPLETE — 4.1 'The Motherboard: the City Plan' (cf-the-motherboard-the-city-plan, 10,458 "
                      "words, quiz [2,0,3,1,3], 4 body + 5 solution figures, 8 Illustrations, engine 117/117 "
                      "FIRST TRY under the staged spec) + 4.2 'The Processor Named Honestly' "
                      "(cf-the-processor-named-honestly, 9,955 words, quiz [3,0,1,2,1], 4 + 5, 9 Illustrations, "
                      "engine 83/83 — the landed 46/47 completed by its part) — five lessons, plannedLessons [], "
                      "46,736 chapter words; assembled by scripts/assemble_cs8.py; verify-cs-book2-ch04 542/542 "
                      "with the CLOSED Z census; tsc 0; lint 0 err; pack 220 written / 9,683 planned (+2/+0, the "
                      "net-zero close); standing gates 667 + 4023 + 1176 + 2350 (csWritten 22) + 696 (totPl 1226 "
                      "— the RUN 7 pointer's 1227 prediction was an arithmetic slip, corrected); all five lesson "
                      "routes 200; the two rider agents (e2e pairs + the ch.3 VLM sweep) hit the subagent "
                      "deadline wall — a FOURTH deferral, scheduled riders-first for RUN 9 with split specs; the "
                      "owner's 2026-11-26 speed directive ('do as you please but don't compromise quality and "
                      "quantity') codified as RUN_PROTOCOL v9.1 amendments 5-8."),
}


def main() -> None:
    with open(WORKLOG, "a", encoding="utf-8") as f:
        f.write(WORKLOG_ENTRY)
    print("WORKLOG appended")

    with open(SOURCELOG, "a", encoding="utf-8") as f:
        f.write(SOURCELOG_ENTRY)
    print("SOURCE_LOG appended")

    with open(DETAILED, "a", encoding="utf-8") as f:
        f.write(DETAILED_ROW)
    print("DETAILED_LOG appended")

    with open(PROGRESS, encoding="utf-8") as f:
        prog = json.load(f)
    prog["updated"] = "2026-11-26"
    prog["phase"] = PHASE
    prog["awaiting"] = AWAITING
    with open(PROGRESS, "w", encoding="utf-8") as f:
        json.dump(prog, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print("PROGRESS re-phased")

    with open(POINTER, "w", encoding="utf-8") as f:
        json.dump(POINTER_OBJ, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print("CS_AUTHORING_POINTER rewritten (RUN 9)")


if __name__ == "__main__":
    main()
