# SEAT SPEC — cf53 (lesson 5.3 'Installing, Updating and Licensing Honestly')

Read `docs/research/cf-ch05-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf53.ts` + `v-cf53.ts` (tag `53`; helpers `cf53…`;
  export `export const lesson53`).
- id: `cf-installing-updating-and-licensing-honestly`; number `'5.3'`;
  title `'Installing, Updating and Licensing Honestly'` (verbatim).
- prerequisites: `['cf-application-software-the-worker-families']`
  (5.2 named the workers; this lesson brings one home and keeps it).
- sources: `['cs-cf-web-ground-ch05']`; quiz key `[0, 2, 1, 3, 2]`.

## The arc (the LIBRARY lesson — the craft of software ownership told honestly; NOT a legal treatise)
1. **What installing actually IS** (demystified): copying program
   files is only step one. The install census (5, engine-pinned):
   (i) copy files to their home; (ii) register with the OS —
   shortcuts and menu entries; (iii) file associations (which program
   opens which kind); (iv) settings written; (v) sometimes a driver
   or background service. Definition callout: *installing is said to
   be the act of registering a program with the operating system so
   it can be found, launched and entrusted with file types.*
2. **Three ways to bring software home** (census of 3 + figure):
   (i) the installer wizard (a setup program that runs the census
   above for you); (ii) the store/package manager — the curated
   shelf (one catalogue, one update pipe; name apt / phone stores
   generically); (iii) portable software — runs from its folder, no
   registration (the honest trade: no shortcuts, no associations,
   no leftovers).
3. **Updating: why the maker keeps knocking** (the three honest
   reasons): bugs (mis-made instructions), SECURITY (plugged holes —
   one sober paragraph, no fear-mongering), features. **Version
   numbers read honestly** (semantic versioning, engine-pinned):
   MAJOR.MINOR.PATCH — 2.4.1 + bug fix → 2.4.2; + new feature →
   2.5.0; + breaking change → 3.0.0. THE COUNTER-INTUITION (teach
   it): 1.9.9 + feature → 1.10.0, NOT 2.0.0 — each field counts
   separately, they are not decimals. Update (same version line,
   free) vs upgrade (new MAJOR, may cost). End-of-life named
   honestly: support ends even for famous software — Windows XP
   support ended 8 April 2014 (13 years); Windows 10 ended
   14 October 2025 (10 years). The EOL caution: an unpatched
   machine is a door left unlocked.
4. **Uninstalling honestly** (the leftovers census, 3): settings,
   caches, file associations can outlive the program — why the
   store/package route uninstalls cleanest (the registry that
   installed, uninstalls).
5. **Licensing: you never bought the software** (the honest centre
   of the lesson): what a licence IS — *a software licence is said
   to be the maker's grant of permission to use the software under
   stated conditions; buying media or a key buys the permission,
   not the program.* THE SIX FAMILIES (census table + figure):
   (i) proprietary/commercial — pay for permission, source closed;
   (ii) freeware — free of charge, source still closed, permission
   still limited; (iii) shareware — try free, then pay (the 30-day
   trial: day 31 needs the licence); (iv) free and open source —
   THE FOUR FREEDOMS (numbered, our own phrasing): run for any
   purpose; study and modify (the source comes with it);
   redistribute copies; distribute your modified versions. Name the
   GNU Project (announced 1983) and the Free Software Foundation
   (1985) as the movement's honest start; Linux announced 1991, 8
   years after GNU; (v) public domain — no rights reserved (rare,
   honest note); (vi) subscription/SaaS — renting the worker by the
   month (the 120/year vs 3,000 perpetual = 25-years-to-parity
   arithmetic, engine-pinned).
6. **The EULA, read honestly** (one calm callout): the long
   agreement you click; per-seat and per-device limits (1 licence,
   3 machines = 2 beyond the grant); the honest reading habit —
   scroll to the limits and the data clauses.
7. **Piracy: the honest line** (short, moral, unpreachy): copying
   beyond the licence takes a permission nobody granted; the
   free-and-open world is the legal answer to 'software should be
   shareable', not the pirated copy.
8. **Doorsteps**: 'Operating Systems' owns package-management
   internals; the law of licences is a profession — this lesson
   teaches reader-level literacy, not legal advice (say so).
9. Exam corner: 'licence types', 'semver next version', 'install
   vs portable', 'update vs upgrade', 'EOL meaning', 'four
   freedoms'.

## Figures (≥3 body + ≥4 solution)
- F1 the install census (5 steps as a contract signed between the
  program and the OS).
- F2 the six licence families on one street of doors (computed
  layout, labelled, palette varied per family).
- F3 the version ladder (2.4.1 → 2.4.2 → 2.5.0 → 3.0.0 with the
  reason tagged at each rung; include the 1.9.9 → 1.10.0 branch as
  the anti-decimal warning).
- Solution figures (≥4): the boot-to-update timeline for an EOL
  walk; the 25-years-to-parity subscription chart; the uninstall
  leftovers map; the licence-family sort board for scenarios.

## Illustrations (8–12, Cengage style)
Semver runs (the 3 standard bumps + the 1.9.9 counter-example);
the patch ladder 2.4.1..2.4.5 (4 releases); the 25-year parity
run; the trial-expiry run (day 31); the per-seat overrun run
(1 licence, 3 machines → 2 beyond); an install-order walk (the
5-step census in action); a licence-scenario sort (6 scenarios →
6 families); an EOL arithmetic run (XP 13 years, Win10 10 years).

## Quiz (5 items, key [0, 2, 1, 3, 2])
Q1 buying a licence buys → answer 0 (permission to use, not the
program). Q2 2.4.1 + bug fix → answer 2 (2.4.2). Q3 freeware
means → answer 1 (free of charge, source closed). Q4 the four
freedoms belong to → answer 3 (free and open source). Q5 a
30-day trial on day 31 → answer 2 (needs the licence to keep
using). `explain` must say why EACH wrong option fails.

## Exercises (15 total, graded L1..L3+, ≥4 with solution figures)
Mirror the Illustration plans; at least 2 exam-style items labelled
honestly.
