#!/usr/bin/env python3
"""closeout_cs11.py — CS RUN 11 ledger close-out: SOURCE_LOG block,
WORKLOG entry, DETAILED_LOG row, PROGRESS block, CS pointer re-point."""
import json
from pathlib import Path

ROOT = Path('/home/z/my-project')

# --- SOURCE_LOG ---
src_log = ROOT / 'docs/project/SOURCE_LOG.md'
src_log.open('a').write("""
## RUN 11 (2026-11-28, cs lane) — computer-fundamentals ch.6 'Connecting Computers'

Reference-scan-first per v9.2 amendment 9 (books AND internet; >= 2 independent sources, real books included), key `cs-cf-web-ground-ch06` (the CS11-RES harvest seat, 22 pages opened):
1. **NCERT Computer Science class XII** (real book — ncert.nic.in textbook PDFs lecs1ps.pdf + lecs110/111/112.pdf): ch 10 Computer Networks (evolution, types, devices, topologies, MAC/IP, Internet-Web, DNS, the domain->IP census table), ch 11 Data Communication (the five components, bandwidth/data-transfer-rate with the 2^10..2^40 ladder and Mbps-vs-MBps, switching, media, protocol), ch 12 Security Aspects (HTTP vs HTTPS, firewall, cookies).
2. **NCERT Informatics Practices class XII ch 5 'Internet and Web'** (real book — leip1ps.pdf + leip105.pdf): the single-chapter first-meeting arc (networks -> types -> devices -> topologies -> Internet -> WWW -> website/webpage/server/hosting/browser/cookies) with the LAN 1 km / MAN 30-40 km / 'the Internet is the largest WAN' pins and the n(n-1)/2 mesh formula.
3. **Kurose & Ross, Computer Networking: A Top-Down Approach** (the Drive's university pole, id 1LncL8Sv-s8alUnX0eOWgalZTgk3f6E5Q in CS_TOC_SURVEY) + the authors' site (gaia.cs.umass.edu/kurose_ross) — the top-down arc grounding the lesson ORDER (idea -> Internet -> browsing); TOC-level only, no content reproduced. Tanenbaum 5e (Drive id 11rja9sExr60YF0HTLQaus_cyJFPf03Op) the bottom-up counterweight.
4. **MDN Web Docs** (developer.mozilla.org): 'How does the Internet work?' (the 45-vs-10 switch arithmetic), 'What is a URL?' (the 5-part anatomy + ports 80/443), 'An overview of HTTP' (client-server, requests/responses, stateless), 'Using HTTP cookies', 'Phishing' (the lookalike-domain definition).
5. **Cloudflare Learning** (cloudflare.com/learning): 'What is DNS?' (the 8-step / 4-server lookup ladder + the library analogy), 'What is HTTPS?' (HTTP over TLS), the IP-address glossary (IPv4 2^32 ~ 4.3 billion, IPv6 2^128, house-address analogy).
6. **Internet Society** (internetsociety.org): 'A Brief History of the Internet' (Leiner/Cerf/Kahn et al.) — the NCP->TCP/IP flag-day 1 Jan 1983 wording, four hosts by end of 1969, NSFNET 6 nodes 56 kbps -> 21 nodes 45 Mbps.
7. **Wikipedia**: ARPANET (29 Oct 1969 'lo', the four nodes, flag day), Domain Name System (Mockapetris Nov 1983, RFC 882/883, port 53), World Wide Web (Mar 1989 proposal, end-1990 working system, 6 Aug 1991 first site, Apr 1993 public domain), Internet in India (ERNET 1986; VSNL GIAS 15 Aug 1995 at 9.6 kbit/s, 5,200 rupees/250 h), Latency, Bandwidth (computing), Hop (networking).
8. **CBSE Computer Applications (165) IX-X curriculum 2025-26** (cbseacademic.nic.in PDF): the PAN/LAN/MAN/WAN + wired/wireless census (IX) and the dedicated class-X Networking unit (browsers, TCP/IP, HTTP(S), search engines, cookies).
9. **Sibling books (internal)**: CF ch.4 (buses/ports as the in-the-box network), ch.5 (the uniforms' 'needs the net' lines, the dated-beats table motif, the census-table register), the exam-topic ledgers (UGC NET U9 'bandwidth, throughput and latency; topologies; URL, DNS'; CUET A/B1/B2 'evolution of networking, devices, topologies, MAC and IP, difference between Internet and Web, cookies, http vs https'; GATE S10; Cambridge 9618 AS).
STUDY-NEVER-REPRODUCE absolute: every roster, figure, Illustration, quiz item and exercise shipped is OUR OWN. Working copies: none kept (all references consumed as spec ground extracts; nothing to delete at unit completion).
""")

# --- WORKLOG ---
wl = ROOT / 'WORKLOG.md'
wl.open('a').write("""
## 2026-11-28 — RUN 11 (cs lane, the 01:05 IST nightly fire, job 552080) — RIDERS PAID + CF ch.6 'Connecting Computers' CLOSED COMPLETE 4/4 in ONE first-wave swarm

**Step-0 pull:** SSH fetch failed (no ssh client in the recycled sandbox — the standing condition) -> the ONE-TIME PAT-URL fetch per the payload rules succeeded; local main == FETCH_HEAD (10b21cb, the maths RUN 132 bookkeeping push record) — already up to date, tree clean.

**Rider (a) PAID — the ch.5 chapter-wide VLM light+dark sweep (the deferred RUN 10 rider):** sweep_vlm_cs11c.sh built on the geo131 pattern with TWO honest corrections found in-run: (1) the site's 'Show solution' button label does NOT toggle, so the geo131 re-query-until-none loop actively RE-COLLAPSED the solutions — the correct pass clicks ONCE after a reload + katex-stability wait, which renders all body + solution figures inside <figure> (9/8/9/8 figure svgs across the four lessons); (2) the sandbox z-ai vision endpoint 404s and the SDK chat route 409s ('no active turn') — the sanctioned fallback was a subagent vision swarm (one seat per lesson; lesson 5.3's seat hit the context wall and was retried SPLIT on the fast tier per amendment 5, light 9/9 + dark 9/9). Verdicts (68 crops banked at docs/research/cf-ch05-wip/vlm-sweep-run11-verdicts/): 5.1 18/18 PASS, 5.3 18/18 PASS, 5.R 16/16 PASS; 5.2 FAIL with 2 real theme-independent defects in cf52UniformsSvg (the mobile caption 'a worker in your pocket' overflowing the 60px phone body ~25px each side with both strokes crossing the words; the desktop caption 'a window of your own' filling the 100px screen edge-to-edge and touching the right border stroke).

**Rider (b) PAID — the 5.2 figure fixes:** desktop monitor screen widened 100->120px (+ the stand base rebalanced 70->90px), phone widened 60->84px with the caption split to two 9.5px lines ('a worker in' / 'your pocket'); applied at part level (docs/research/cf-ch05-wip/part-cf52.ts) AND mirrored into the ch-05.ts twin (no assembler survived the sandbox recycle — the RUN 131 fix-at-both-levels precedent); DOM-measured clearances: desktop caption 8.1px each side, mobile lines 9.6/7.7px inside the 72px inner screen; v-cf52 re-green 111/111; the fixed figure re-shot and re-audited PASS in both themes (the CS11-RIDER-B seat). tsc 0 errors repo-wide; pack verify PASS.

**Ch.6 whole-chapter open + close (the main deliverable):** reference-scan-first held — the CS11-RES harvest seat opened 22 pages (NCERT XII CS ch 10-12 + XII IP ch 5 real books from ncert.nic.in, Kurose & Ross + Tanenbaum Drive arcs, MDN, Cloudflare Learning, Internet Society, Wikipedia ARPANET/DNS/WWW/Internet-in-India, CBSE IX-X CA 165), banked under cs-cf-web-ground-ch06 with every date verified against an opened page. VERIFY-FIRST: scripts/pin_check_cs11.py 64/64 GREEN before any spec. CF_CH06_MASTER_PLAN + SPEC_CORE + four self-contained specs banked.

**THE SWARM — all four seats landed WHOLE in one first-wave launch (no wall, no relaunch):** cf61 'The Network Idea' V-CF61 132/132 (10,918 words; 4 body + 4 solution figures; key [3,0,2,4,1]); cf62 'The Internet: a Network of Networks' V-CF62 122/122 (11,513 words; 4 + 7; key [1,4,2,0,3]); cf63 'Browsing the Web: the Citizen's Vocabulary' V-CF63 98/98 (13,307 words; 4 + 5; key [2,1,4,3,0]); cf6R the Unit 6 Completion Review V-CF6R 155/155 (10,154 words; 3 + 5; key [0,3,1,4,2]). Chapter total 45,892 words; keys 30241|14203|21430|03142 pairwise distinct.

**Assembly + gates:** scripts/assemble_cs11.py rebuilt (the RUN 10 assemble_cs9.py died with the sandbox — no ch.5 assembler on disk): ch-06.ts 3,780 lines from the four self-namespaced seats (zero name collisions, engine-verified); book.ts chapter-6 entry swapped to the assembled chapter6 (status complete, plannedLessons emptied) with the RUN 131 terminator lesson encoded — the STATUS block replaced by exact index bounds and its closing */ re-emitted exactly once (count 1 asserted); scripts/verify-cs-book2-ch06.ts Z census **41/41 ALL GREEN** (ids/numbers/titles verbatim, word floors 10,918/11,513/13,307/10,154, quiz keys live, body figures >= 3, solution figures >= 4, sources pinned, pairwise-distinct keys, chapter total 45,892 >= 40,000). tsc **0 errors repo-wide**; lint 0 errors (5 standing warnings); lib:pack v4 **249 written / 9,681 planned** + verify PASS (+4 written = the ch.6 close); all four ch.6 routes 200. **COMMITTED IMMEDIATELY on ALL GREEN per the run-132 law** — the chapter close commit landed before this bookkeeping entry.

**Deferred (debt-first riders for run 12, per amendment 6 — never silent):** the ch.6 E2E grid (4 lessons x 3 viewports, the gen-cs10-e2e.py live-DOM-calibrated pattern — regenerate on the ch.6 census) · the ch.6 VLM light+dark sweep (the sweep_vlm_cs11c.sh pattern on the new chapter). The clock stood at the cap's last stretch after the gate battery; both ride run 12 FIRST.

**Bookkeeping:** CS_AUTHORING_POINTER re-pointed (run 12 = riders-first then ch.7 'Files and Your Digital Space' whole); SOURCE_LOG run-11 block; DETAILED_LOG row; PROGRESS csRun11 block; WORK_INVENTORY regenerated. The ch-06 wip stays banked in docs/research/cf-ch06-wip/.
""")

# --- DETAILED_LOG ---
dl = ROOT / 'docs/project/DETAILED_LOG.md'
dl.open('a').write("""
| 2026-11-28 | RUN 11 | cs | computer-fundamentals ch.6 'Connecting Computers' | CLOSED COMPLETE 4/4 | first-wave swarm (cf61 132/132, cf62 122/122, cf63 98/98, cf6R 155/155), verify-cs-book2-ch06 Z census 41/41, pin_check_cs11 64/64, 45,892 words, 15 body + 21 solution figures, keys 30241|14203|21430|03142; riders: ch.5 VLM sweep PAID (68 crops; 5.1/5.3/5.R ALL PASS; 5.2 uniforms-figure caption overflows fixed at part level + ch-05.ts twin, DOM-verified, v-cf52 111/111 re-green, re-audit PASS both themes) — the show-solution-once and subagent-vision-swarm discoveries; tsc 0, lint 0 (5 standing warnings), pack v4 249 written, 4 routes 200; committed immediately on ALL GREEN per the run-132 law | deferred: ch.6 E2E grid + ch.6 VLM sweep -> run 12 |
""")

# --- PROGRESS.json ---
pg = ROOT / 'docs/project/PROGRESS.json'
d = json.loads(pg.read_text())
d['csRun11'] = {
    "run": "CS RUN 11 (2026-11-28, the cs job's eleventh honored fire)",
    "shipped": "CF ch.6 'Connecting Computers' CLOSED COMPLETE 4/4 in one first-wave swarm (6.1 The Network Idea, 6.2 The Internet: a Network of Networks, 6.3 Browsing the Web: the Citizen's Vocabulary, 6.R review; 45,892 words; 15 body + 21 solution figures; Z census 41/41) + the deferred ch.5 VLM sweep rider paid whole (68 crops, 3 lessons ALL PASS, 5.2's uniforms-figure defects fixed at both levels and re-audited PASS)",
    "gates": "pin_check_cs11 64/64 pre-spec; V-CF61 132/132, V-CF62 122/122, V-CF63 98/98, V-CF6R 155/155; verify-cs-book2-ch06 41/41; tsc 0 repo-wide; lint 0 errors (5 standing warnings); lib:pack v4 249 written + verify PASS; 4 routes 200; chapter close committed immediately on ALL GREEN (the run-132 law)",
    "cadence": "CS RUN 12 opens exactly as the CS pointer sets it: riders-first (ch.6 E2E grid + ch.6 VLM sweep), then ch.7 'Files and Your Digital Space' whole"
}
pg.write_text(json.dumps(d, indent=2, ensure_ascii=False) + '\n')

# --- CS pointer ---
ptr = ROOT / 'docs/project/CS_AUTHORING_POINTER.json'
p = json.loads(ptr.read_text())
p['updated'] = '2026-11-28'
p['nextAction'] = ("CS RUN 12 (the next honored :05 IST fire, as a swarm per docs/project/RUN_PROTOCOL.md v9.2): "
 "RIDERS-FIRST per amendment 6, FOREGROUND: (a) the ch.6 E2E grid — regenerate gen-cs12-e2e.py on the gen-cs10-e2e.py live-DOM-calibrated pattern, pins from a live ch.6 census (census on the sweep_vlm_cs11c.sh lesson-open discipline: reload + katex-stability + show-solution buttons clicked ONCE — the label does not toggle, a re-query loop re-collapses), 4 lessons x 3 viewports, quiz 5/5 live on [3,0,2,4,1]/[1,4,2,0,3]/[2,1,4,3,0]/[0,3,1,4,2]. "
 "(b) the ch.6 VLM light+dark sweep on the sweep_vlm_cs11c.sh pattern (all figure svgs incl. solution figures), verdicts by the subagent vision swarm (the sandbox z-ai vision endpoint 404s; 5.3-style split retries on the fast tier), surgical part-level fixes + ch-06.ts twin mirrors if real defects surface, re-verify + repack. "
 "THEN open computer-fundamentals chapter 7 'Files and Your Digital Space' WHOLE (7.1 'File Management: Files, Folders and the Desktop Metaphor', 7.2 'File Formats: the Extension Contracts', 7.3 'Managing and Protecting Your Digital Space' + the 7.R review) — research per step 2 (internet fallback if the Drive holds nothing: log SOURCE_LOG with the cs-cf-web-ground-ch07 key), pin checker in docs/research/cf-ch07-wip/ before prose, staged specs, one agent per seat, whole-chapter cadence, closed COMPLETE, COMMIT IMMEDIATELY on ALL GREEN (the run-132 law). "
 "OPERATIONAL (the standing laws): repack after pull before believing any route (lib:pack after ANY content fix before E2E is honest); the dev server does not survive between tool calls — every server-needing call restarts it in-call and warm-curls first; show-solution expansion = click ONCE (never a re-query loop); expand/click by re-query-per-click ONLY for non-toggling controls; touch generated files before gating (amendment 7 phantom stale-transpiles — fresh re-run before believing a fail).")
p['lastCompleted'] = ("CS RUN 11 (2026-11-28, the cs job's eleventh honored fire): rider (a)+(b) PAID — the deferred ch.5 VLM light+dark sweep ran for real "
 "(sweep_vlm_cs11c.sh, 68 crops across the four lessons incl. all solution figures; the show-solution-once discovery and the subagent vision swarm fallback after the sandbox vision endpoint 404'd; 5.1 18/18, 5.3 18/18 after a split fast-tier retry, 5.R 16/16 ALL PASS) and 5.2's two real uniforms-figure defects were fixed at part level + ch-05.ts twin (desktop screen 100->120px, phone 60->84px with a two-line caption; DOM-verified clearances >= 7.7px; v-cf52 111/111 re-green; re-audit PASS both themes). "
 "Chapter 6 'Connecting Computers' ASSEMBLED + CLOSED COMPLETE 4/4 in ONE first-wave swarm: cf61 132/132 (10,918 words), cf62 122/122 (11,513), cf63 98/98 (13,307), cf6R 155/155 (10,154); assemble_cs11.py rebuilt with the terminator-safe STATUS swap; verify-cs-book2-ch06 Z census 41/41 ALL GREEN (45,892 words; 15 body + 21 solution figures; keys 30241|14203|21430|03142 pairwise distinct); pin_check_cs11 64/64 pre-spec; reference-scan-first with real books (NCERT XII CS ch 10-12 + XII IP ch 5 + Kurose/Tanenbaum arcs + MDN + Cloudflare + ISOC + Wikipedia + CBSE 165, key cs-cf-web-ground-ch06); tsc 0 repo-wide, lint 0 err, pack v4 249 written + verify PASS, 4 routes 200; the chapter close committed IMMEDIATELY on ALL GREEN per the run-132 law. Deferred per amendment 6: the ch.6 E2E grid + the ch.6 VLM sweep ONLY — RUN 12 riders-first.")
ptr.write_text(json.dumps(p, indent=2, ensure_ascii=False) + '\n')
print('closeout_cs11: all five ledgers written')
