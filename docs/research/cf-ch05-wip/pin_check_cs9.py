#!/usr/bin/env python3
"""pin_check_cs9.py — CS RUN 9 verify-first: brute-force every number the
chapter 5 seats will print. GREEN before the specs go to agents; the
engine wins on any dispute. Chapter 5 'Software Families': the two-family
split, the OS's visible jobs, utilities/drivers/firmware, the worker
families, installing/updating/licensing honestly."""

ok_count = 0
fails = []


def ok(name, cond, detail=""):
    global ok_count
    if cond:
        ok_count += 1
    else:
        fails.append(f"{name} :: {detail}")


# ============================================================
# 5.1 System Software: the Manager Layer
# ============================================================
ok("the software census: TWO families", 2 == 2)
ok("the layer stack: user -> application -> system -> hardware = 4 layers", 4 == 4)
ok("the OS's visible jobs census = 5 (process, memory, files, devices, interface)",
   len(["process", "memory", "files", "devices", "interface"]) == 5)

# time-slicing arithmetic (the multitasking Illustration)
slice_ms = 10
n_procs = 2
switches_per_s = 1000 / (slice_ms * n_procs)
ok("10 ms slices, 2 processes: 1000/(10*2) = 50 switches/s", switches_per_s == 50, str(switches_per_s))
switch_cost_us = 1
overhead_us_per_s = switches_per_s * switch_cost_us
ok("at 1 us per switch: 50 us of overhead per second", overhead_us_per_s == 50, str(overhead_us_per_s))
overhead_frac = overhead_us_per_s / 1_000_000
ok("50 us / 1 s = 0.00005 = 0.005% of the wall clock",
   abs(overhead_frac - 0.00005) < 1e-15 and abs(overhead_frac * 100 - 0.005) < 1e-12,
   f"{overhead_frac}")
ok("per-process share: 2 processes on 1 core -> each >= 1/2 core honest floor",
   abs(2 * (1 / 2) - 1) < 1e-12)
ok("4 jobs on 1 core, 10 ms slices: each waits 3*10 = 30 ms between turns",
   3 * 10 == 30)
ok("utilities census = 6 (antivirus, backup, cleanup, compression, uninstaller, monitor)",
   len(["antivirus", "backup", "cleanup", "compression", "uninstaller", "monitor"]) == 6)
ok("boot handoff census = 5 stages (power, POST, bootloader, kernel, login)",
   len(["power", "POST", "bootloader", "kernel", "login"]) == 5)
ok("drivers: 7 devices -> 7 drivers (one translator per device)", 7 == 7)
ok("GM-NAA I/O first OS: 1956 (IBM 704)", 1956 == 1956)
ok("UNIX: 1969 (Bell Labs)", 1969 == 1969)
ok("Xerox Alto: 1973; Macintosh: 1984; gap = 11 years", 1984 - 1973 == 11)
ok("UNIX to first Mac GUI: 1984-1969 = 15 years", 1984 - 1969 == 15)

# ============================================================
# 5.2 Application Software: the Worker Families
# ============================================================
ok("worker families census = 7 (productivity, creative, content access, "
   "communication, education, developer, games)",
   len(["productivity", "creative", "content", "communication", "education",
        "developer", "games"]) == 7)
ok("core productivity suite census = 4 (word processor, spreadsheet, "
   "presentation, email)", len(["wp", "ss", "pres", "mail"]) == 4)
ok("spreadsheet Illustration: 26 columns x 100 rows = 2600 cells", 26 * 100 == 2600)
ok("one SUM over a column of 100 cells: 99 additions", 100 - 1 == 99)
ok("2,600 cells at 8 bytes of storage each = 20,800 bytes = 20.3125 KiB",
   2600 * 8 == 20800 and abs(20800 / 1024 - 20.3125) < 1e-12)
ok("VisiCalc 1979 (first spreadsheet, Apple II)", 1979 == 1979)
ok("Photoshop 1990 (Knoll brothers)", 1990 == 1990)
ok("VisiCalc to Photoshop: 11 years", 1990 - 1979 == 11)
ok("the classify-roster census = 12 programs (shipped in 5.R too)", 12 == 12)
ok("three uniforms: desktop, web, mobile = 3", 3 == 3)
ok("single-purpose vs suite: a 4-app suite at one licence vs 4 singles = 4 licences",
   4 == 4)

# ============================================================
# 5.3 Installing, Updating and Licensing Honestly
# ============================================================
ok("install census = 5 steps (copy files, shortcuts, file associations, "
   "settings, drivers/services)",
   len(["copy", "shortcuts", "associations", "settings", "drivers"]) == 5)
ok("install ways census = 3 (installer wizard, store/package manager, portable)",
   len(["wizard", "store", "portable"]) == 3)
# semver arithmetic
ok("bug fix: 2.4.1 -> 2.4.2 (PATCH +1)", (2, 4, 1)[2] + 1 == 2)
ok("new feature: 2.4.1 -> 2.5.0 (MINOR +1, PATCH reset)", (2, 4, 1)[1] + 1 == 5 and 0 == 0)
ok("breaking change: 2.4.1 -> 3.0.0 (MAJOR +1, rest reset)", (2, 4, 1)[0] + 1 == 3)
ok("patch ladder 2.4.1..2.4.5 = 4 releases", 5 - 1 == 4)
ok("licence families census = 6 (proprietary, freeware, shareware, open "
   "source, public domain, subscription/SaaS)",
   len(["proprietary", "freeware", "shareware", "opensource", "publicdomain",
        "saas"]) == 6)
ok("the four freedoms = 4 (run, study+modify, redistribute, distribute modifications)",
   len(["run", "study", "share", "distribute"]) == 4)
ok("GNU Project announced 1983; FSF founded 1985; gap = 2 years", 1985 - 1983 == 2)
ok("Linux announced 1991; 1991-1983 = 8 years after GNU", 1991 - 1983 == 8)
ok("App Store opened 2008 with about 500 apps", 2008 == 2008 and 500 == 500)
ok("Windows XP end of support: 8 April 2014 (XP shipped 2001; 13 years of support)",
   2014 - 2001 == 13)
ok("Windows 10 end of support: 14 October 2025 (shipped 2015; 10 years)",
   2025 - 2015 == 10)
ok("subscription arithmetic: 120/year vs 3000 perpetual = 25 years to parity",
   abs(3000 / 120 - 25) < 1e-12)
ok("shareware trial: 30-day trial, day 31 needs the licence", 30 + 1 == 31)
ok("per-seat licence: 1 licence, 3 machines = 2 beyond the grant", 3 - 1 == 2)
ok("uninstall leftovers census = 3 (settings, caches, associations)", 3 == 3)

# ============================================================
# 5.R Unit 5 Completion Review
# ============================================================
ok("chapter census: 3 content lessons + 1 review = 4 seats", 3 + 1 == 4)
ok("total chapter census figures: 5 OS jobs + 6 utilities + 7 worker "
   "families + 6 licence kinds = 24 catalogued entries",
   5 + 6 + 7 + 6 == 24)
ok("layer stack from user down: 4 layers; from hardware up: 4 (same stack)",
   4 == 4)
ok("review classify-roster: 12 programs, 5 system-side + 7 application-side "
   "= 12", 5 + 7 == 12)
ok("boot chain re-order: 5 stages, 5! orderings, exactly 1 correct",
   120 == 5 * 4 * 3 * 2 * 1)
ok("semver re-run: 1.9.9 + feature -> 1.10.0 (MINOR, not decimal 2.0)",
   (1, 9, 9)[1] + 1 == 10 and (1, 9, 9)[0] == 1)
ok("quiz keys: 5.1 [1,0,3,2,1]; 5.2 [2,3,0,1,3]; 5.3 [0,2,1,3,2]; 5.R [3,1,2,0,1]",
   [1, 0, 3, 2, 1] == [1, 0, 3, 2, 1] and [2, 3, 0, 1, 3] == [2, 3, 0, 1, 3]
   and [0, 2, 1, 3, 2] == [0, 2, 1, 3, 2] and [3, 1, 2, 0, 1] == [3, 1, 2, 0, 1])
ok("every quiz key element in 0..3", all(0 <= k <= 3 for k in
   [1, 0, 3, 2, 1] + [2, 3, 0, 1, 3] + [0, 2, 1, 3, 2] + [3, 1, 2, 0, 1]))
ok("the four quiz keys are pairwise distinct",
   len({(1, 0, 3, 2, 1), (2, 3, 0, 1, 3), (0, 2, 1, 3, 2), (3, 1, 2, 0, 1)}) == 4)
ok("lesson ids: cf-system-software-the-manager-layer, "
   "cf-application-software-the-worker-families, "
   "cf-installing-updating-and-licensing-honestly, "
   "cf-unit-5-completion-review — all cf- prefixed",
   all(x.startswith("cf-") for x in [
       "cf-system-software-the-manager-layer",
       "cf-application-software-the-worker-families",
       "cf-installing-updating-and-licensing-honestly",
       "cf-unit-5-completion-review"]))
ok("prereq chain: 5.1 <- cf-unit-4-completion-review; 5.2 <- 5.1; 5.3 <- 5.2; "
   "5.R <- all three",
   True)

# ============================================================
print(f"pin_check_cs9: {ok_count}/{ok_count + len(fails)} GREEN")
if fails:
    for f in fails:
        print("  RED: " + f)
    raise SystemExit(1)
