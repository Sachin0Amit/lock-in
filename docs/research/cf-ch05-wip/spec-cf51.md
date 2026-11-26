# SEAT SPEC — cf51 (lesson 5.1 'System Software: the Manager Layer')

Read `docs/research/cf-ch05-wip/SPEC_CORE.md` FIRST — it is part of this
spec. This file pins YOUR seat only.

## Your lesson (the pinned identity)
- Files: `part-cf51.ts` + `v-cf51.ts` (tag `51`; helpers `cf51…`;
  export `export const lesson51`).
- id: `cf-system-software-the-manager-layer`; number `'5.1'`; title
  `'System Software: the Manager Layer'` (verbatim).
- prerequisites: `['cf-unit-4-completion-review']` (ch.4 closed the box;
  this chapter opens what RUNS on it).
- sources: `['cs-cf-web-ground-ch05']`; quiz key `[1, 0, 3, 2, 1]`.

## The arc (the LIBRARY lesson — software named as instructions for the box; NOT OS theory)
1. **From box to programs** (the bridge): ch.4 gave you the city —
   motherboard, processor, memory, buses. Dead city. *Software is said
   to be the set of instructions, and the data they work on, that tells
   the hardware what to do.* The two-family census (definition
   callout): SYSTEM software runs the machine and provides the platform
   others stand on; APPLICATION software does the user's own job.
   Everything in ch.5 sorts into these two families.
2. **The four-layer stack** (THE map figure): user → application
   software → system software → hardware. Each layer only talks to its
   neighbours; the manager layer HIDES the hardware's dialect from the
   workers. One honest note: the stack is a model, not a fence
   (firmware straddles the bottom two).
3. **The operating system: five visible jobs** (the manager's duty
   list — census table + one figure): (i) process management — who runs
   next; (ii) memory management — who owns which addresses; (iii) the
   file system — names on the storage shelf (ch.7 doorstep); (iv)
   device input/output through drivers; (v) the user interface — the
   shell (GUI or command line). Multitasking named honestly:
   *multitasking is said to be the illusion that many programs run at
   once, kept by rapidly switching one (or few) core(s) between them.*
   THE TIME-SLICING ILLUSTRATION (engine-pinned): 10 ms slices, 2
   processes → 50 switches/s; each switch ≈ 1 μs → 50 μs of overhead
   per second = 0.005% of the wall clock — the illusion is cheap.
   Kernel vs shell (the core vs the face). Popular systems named
   without tribalism (Windows, macOS, Linux, Android, iOS).
4. **Utilities: the specialist staff** (census of 6 with one-line
   jobs): antivirus, backup, disk cleanup/defragmenter, compression
   (cross-reference ch.3's lossless/lossy lesson — the utility is the
   SAME craft), uninstaller, task manager/monitor. Definition: *utility
   software is said to be system software that performs one housekeeping
   task for the machine rather than running the whole platform.*
5. **Device drivers: the translators** (the honest metaphor): the OS
   speaks one standard dialect; each device speaks its own. *A device
   driver is said to be the program that translates between the
   operating system's standard calls and one device's private
   commands.* One driver per device (7 devices → 7 drivers). What
   plug-and-play actually is: the OS probes the device's identity and
   loads the matching driver. The caution: a wrong/aged driver is the
   classic cause of 'the machine sees the device but the device
   misbehaves'.
6. **Firmware: software living on the hardware** (close the loop to
   4.1's BIOS/UEFI chip): *firmware is said to be software stored
   permanently on a chip inside the device.* The boot handoff census
   (figure): power on → firmware POST (the inventory check) →
   bootloader → OS kernel → login prompt (5 stages). One dated beat:
   BIOS to UEFI as the honest modern successor.
7. **Two dated beats, honestly told (OUR OWN retelling)**: the first
   operating system — GM-NAA I/O, 1956, for the IBM 704, built by its
   users to automate the card-and-tape handling nobody wanted to do by
   hand. UNIX, 1969, Bell Labs (Thompson and Ritchie) — the small,
   tool-writing system whose descendants run most phones and servers
   today. GUI lineage: Xerox Alto 1973, Apple Macintosh 1984 (11 years
   between; 15 after UNIX).
8. **Doorsteps**: 'Operating Systems' (this shelf, planned) owns the
   theory — scheduling algorithms, paging, deadlocks; this lesson keeps
   the visible census. 'Computer Organization and Architecture' owns
   privilege levels/interrupts at the hardware door.
9. Exam corner: 'system vs application software', 'OS functions',
   'utility examples', 'what is a device driver', 'firmware vs
   software', 'boot sequence order', 'kernel vs shell'.

## Figures (≥3 body + ≥4 solution)
- F1 the four-layer stack (user/application/system/hardware; arrows
  only between neighbours; palette struct/teal).
- F2 the OS's five jobs as a manager's desk (five labelled panels
  around one desk motif — computed layout, no overlap).
- F3 the boot handoff chain (5 stages left-to-right, each a station
  with a one-word duty).
- F4 the time-slicing ribbon (one core, two processes, alternating
  10 ms blocks; mark the switch ticks) — good body OR solution figure.
- Solution figures (≥4 across exercises): the driver-translation
  two-panel (OS side / device side); the utility family wheel; the
  boot-chain re-order scaffold for the ordering exercise; the
  layer-straddling firmware diagram.

## Illustrations (8–12, Cengage style)
Time-slicing arithmetic (the 0.005% illusion); a context-switch cost
re-run at 5 μs; the 4-jobs-on-1-core waiting-time run (each waits
30 ms between turns); a 7-device driver census; a utilities-match
run (task → utility); a boot-order puzzle solved; a classify-12
starter run (system vs application — 5 system-side, shared with 5.R);
a kernel/shell command walk.

## Quiz (5 items, key [1, 0, 3, 2, 1])
Q1 which is system software (options: word processor / OS / game /
browser) → answer 1. Q2 the layer directly under applications →
answer 0 (system software). Q3 multitasking is kept by → answer 3
(rapid switching). Q4 a driver translates between → answer 2 (OS
calls and device commands). Q5 firmware lives → answer 1 (on a chip
in the device). `explain` must say why EACH wrong option fails.

## Exercises (15 total, graded L1..L3+, ≥4 with solution figures)
Mirror the Illustration plans; include at least 2 exam-style items
labelled honestly.
