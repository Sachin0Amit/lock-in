# geo-ch02-wip — RUN 126 (GEOMETRY ch.2, opened-and-closed whole, 2026-11-26)

STATUS: chapter 2 'Angles, Parallel Lines and the Transversal' authored WHOLE
by the run-126 swarm (four seats, one agent per lesson, v9.1 staged specs).

## Seats
- 2.1 geo-angles-types-pairs-and-measures — spec-geo201.md / part-geo201.ts / v-geo201.ts
- 2.2 geo-parallel-lines-and-the-fifth-postulate — spec-geo202.md / part-geo202.ts / v-geo202.ts
- 2.3 geo-the-transversal-the-eight-angle-census — spec-geo203.md / part-geo203.ts / v-geo203.ts
- 2.4 geo-angle-sum-of-a-triangle-and-its-consequences — spec-geo204.md / part-geo204.ts / v-geo204.ts

## The order of the run
1. pin_check_geo126.py 104/104 GREEN (pre-flight, before any spec went out).
2. Four agents, one per seat, launched in ONE parallel message (never two
   writers on the same file); engine-first, write-early-often, ~30-minute
   hard working windows.
3. Assemble with scripts/assemble_run126.py (the assemble_run125.py pattern):
   ch-02.ts from the four parts; scripts/verify-book5-ch02.ts (the four
   v-files wrapped as async sections with the part imports redirected to the
   SHIPPED chapter + the Z closed-chapter census); book.ts swap (chapter2
   imported, planned object replaced, STATUS refreshed).
4. Gates: verifier ALL GREEN; tsc 0; lint 0 errors; lib:pack+check (expect
   219 written lessons); standing gates (topic 667, toc 4023, math-shelf
   data-dependent); E2E per lesson x3 viewports; VLM figure audit light+dark
   (whatever the clock allows rides the close; the rest defer honestly).
5. Ledgers, commit, PAT push, anonymous ls-remote verify.
