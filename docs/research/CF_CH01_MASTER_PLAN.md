# CF_CH01_MASTER_PLAN — Computer Fundamentals, chapter 1 'The Computing Machine'

CS RUN 1 — the cs job's FIRST honored fire (2026-11-21, hourly :20 IST lane; v9.0 swarm
protocol). Two lessons this run: **1.1 'The Basic Structure and Operation of the
Computer'** + **1.2 'A Census of Hardware: Desktops to Embedded Chips'**. Lesson 1.3
'Software: the Invisible Half of the Machine' rides the NEXT fire; 1.R closes the
chapter after it. One book at a time; the chapter stays in-progress.

## Provenance (the sanctioned internet fallback — no Drive source exists)

`docs/research/CS_TOC_SURVEY.md` records honestly that the Drive holds NO Computer
Fundamentals source. Ground = the planning-pass web research banked in the book's
`book.ts` research comment (Peter Norton 'Introduction to Computers' arc; CBSE/beginner
arcs; banking/SSC computer-awareness exam types) + THIS run's web verification
(2026-11-21, URLs logged in SOURCE_LOG.md under `cs-cf-web-ground`):

- ENIAC announced 1946-02-14; 17,468 vacuum tubes; ~30 tons (some sources 27);
  ~150 kW; 5,000 additions per second.
- UNIVAC I accepted 1951-03-31 by the US Census Bureau (dedicated 1951-06-14); ~5,000
  vacuum tubes; 16,000 pounds; first commercial computer.
- von Neumann 'First Draft of a Report on the EDVAC' 1945 — the stored-program idea;
  five parts (central arithmetic, central control, memory, input, output).
- Transistor: Bell Labs December 1947 (Bardeen, Brattain, Shockley).
- Integrated circuit: Kilby demo 1958-09-12 (TI); Noyce's planar patent 1959.
- IBM System/360 announced 1964-04-07 (the third-generation flagship family).
- Intel 4004 released 1971-11-15; 2,300 transistors; 4-bit; US$60.
- Altair 8800 introduced 1974, famous January 1975 Popular Electronics cover; first
  commercially successful personal computer (sold as a kit).
- Apple II on sale 1977-06-10; 6502 at 1.023 MHz; 4 KB RAM; $1,298 base.
- IBM PC 5150 debuted 1981-08-12; Intel 8088 at 4.77 MHz; 16 KB RAM; $1,565.
- Macintosh 1984. iPhone announced 2007-01-09 (on sale June 2007; $499/$599).
- Raspberry Pi Model B launched 2012-02-29 at $35. Arduino born 2005 (Ivrea, Italy).
- Moore's law: 1965 observation (doubling every year), revised 1975 to doubling every
  TWO years (CAGR ≈ 41%); an observation, not a law of nature.
- Modern car ECU census: typical 50–100 ECUs; some premium vehicles up to ~150.

STUDY-NEVER-REPRODUCE absolute: arcs and method shapes only; every roster, number
frame, figure, Illustration, quiz item and exercise is OUR OWN, engine-pinned.

## Lesson 1.1 — 'The Basic Structure and Operation of the Computer'
id `cf-the-basic-structure-and-operation-of-the-computer`, number '1.1'.

Arc: opening motivation (a calculator and a computer both add — why is only one of
them a computer? the honest question: how does a box of switches seem thoughtful?)
→ **data vs information** (raw marks → the grade summary; Illustration 1) →
**the information processing cycle** I→P→O→S (Norton's core arc; definition callout +
figure 1: the four-stage circular diagram) → **the five functional units** (von
Neumann 1945, historical callout: ENIAC the rewired giant vs the EDVAC insight;
figure 2: the five-unit block diagram joined by the address/data/control buses) →
**the stored-program concept** (instructions are data in ONE memory; why this makes
the machine general-purpose; the caution: ENIAC was 'programmed' by switches and
cable-patching, which is why the stored program was the breakthrough) →
**the fetch–decode–execute cycle** (ALGORITHM block — the loop; figure 3: the
circular fetch-decode-execute flow with the program counter as the pointer) →
**the measurable machine** (clock Hz, word size, bus width; DERIVATION 1: n address
lines address 2^n locations — computed table 2^16 = 65,536, 2^20 = 1,048,576,
2^24 = 16,777,216, 2^30 ≈ 1.074×10^9, 2^32 ≈ 4.295×10^9; DERIVATION 2: cycle time
= 1/f — 4.77 MHz ≈ 209.6 ns, 1 GHz = 1 ns, 3 GHz ≈ 0.333 ns; Illustrations:
address-space ladder; clock arithmetic) → **the hardware/software boundary** (brief;
hands to 1.3 + the Operating Systems doorstep; never re-teach) → **exam corner**
(banking/SSC computer-awareness typology: IPOS ordering, unit identification,
'which unit performs arithmetic', stored-program questions — labelled exam-style)
→ quiz 5 items, pinned keys **[2,0,1,3,1]** → exercises 15 = L1:2, L2:2, L3:3,
L4:3, L5:3, L6:2, every solution a full Cengage steps chain.

Exercise seeds (agents own the exact wording): L1 classify everyday acts on the
I→P→O→S stages; L2 unit-identification (which unit does what); L2/L3 address-line
arithmetic (16 lines → 65,536; 24 lines → 16,777,216; a 64-bit space ≈ 1.8×10^19);
L3 IPOS trace on a payroll/mark-list run (data → information); L3 clock arithmetic
(2 GHz cycle = 0.5 ns; 200 instructions at 2 cycles/instruction at 2 GHz = 200 ns);
L4 exam-style classification chains; L4 a 4 KB memory on a 12-line bus sanity
check (4,096 = 2^12 exactly); L5 word-size reasoning (why a 64-bit machine reads
8-byte words; word count of a 1 KB buffer = 128 words); L6 design reasoning (why
ONE memory for instructions and data — the von Neumann bottleneck honestly named).

Figures: 3 body figures + ≥3 SOLUTION figures (v9.0): an address-space ladder; a
word-on-the-bus diagram; an IPOS trace strip. All SVGs computed (constants at the
top of the builder), vivid palette, aria-labels, no text overlap at 390/1280.

Terms ≥ 12: computer, data, information, information processing cycle, hardware,
software, input device, output device, primary memory, arithmetic logic unit,
control unit, bus, stored-program concept, clock rate, word. Formula cards ≥ 5
(address space 2^n; cycle time 1/f; throughput ≈ f × IPC — first-meeting honesty;
stored-program identity; the IPOS four-stage recap card).

## Lesson 1.2 — 'A Census of Hardware: Desktops to Embedded Chips'
id `cf-a-census-of-hardware-desktops-to-embedded-chips`, number '1.2'.

Arc: opening motivation (one word 'computer' now stretches from a warehouse of racks
to a chip inside a washing machine — the taxonomist's census) → **the census axes**
(form factor, performance, power budget, general-purpose vs dedicated; figure 1:
the trade-off triangle) → **the families census** (TABLE: desktop tower/all-in-one,
laptop, tablet, smartphone, workstation, server, mainframe, supercomputer, games
console, embedded microcontroller, single-board computer — each with role, form
factor, honest ballpark bands: desktop CPU ~65–125 W, laptop ~15–45 W, phone SoC
~3–8 W, MCU ~mW–W; labelled 'honest ballparks, bands not promises') → **Moore's
law** (historical callout: 1965, revised 1975 to doubling every two years, CAGR ≈ 41%;
DERIVATION 1: the doubling arithmetic — 2,300 transistors (4004, 1971-11-15) with
40 years = 20 doublings gives 2,300 × 2^20 ≈ 2.41×10^9; the honest caution: an
observation, not a law of nature) → **the five generations table** (1st 1946–1956
vacuum tubes: ENIAC/UNIVAC I; 2nd ~1956–1964 transistors: Bell Labs Dec 1947, FORTRAN
1957; 3rd 1964–1971 integrated circuits: Kilby 1958, System/360 1964; 4th
1971–present microprocessors: 4004, IBM PC 1981; 5th the HONEST label — Japan's
1982 FGCS branding + today's AI-era usage, fuzzy edges stated as such; figure 2:
the generations timeline with machines on computed positions) → **the
personal-computing arc** (Altair 1975 kit → Apple II 1977 → IBM PC 1981 → clones →
laptops → the 2007 smartphone; the pocket-computer era) → **the embedded census**
(microcontroller vs microprocessor vs SoC; Arduino 2005 / Raspberry Pi 2012-02-29 at
$35; a modern car carries 50–100+ ECUs, premium up to ~150; the household census:
washing machine, microwave, TV remote; IoT doorstep) → **choosing honestly**
(Illustration: match the family to the job — school lab, kiosk, car, data center)
→ **exam corner** (SSC/banking 'types of computers' classification + generation
matching, honestly exam-style) → quiz 5, pinned keys **[1,2,2,0,3]** → exercises 15
= L1:2, L2:2, L3:3, L4:3, L5:3, L6:2.

Exercise seeds: L1 family classification; L2 generation matching + count Moore
doublings (1971→2011 = 20 doublings, factor 2^20 = 1,048,576 ≈ 10^6); L3 census
reasoning (why a phone is not a mainframe — the census axes applied); ECU arithmetic
(a 120-ECU car at ~0.5 W each → ~60 W on control alone; ballpark labelled); L4
exam-style classification chains (supercomputer vs mainframe; embedded vs general);
L4 Moore growth-factor computation (2,300 → ≈2.4 billion transistors over 40 years);
L5 power-budget arithmetic (a phone drawing 5 W for 8 h needs 40 Wh — battery-life
≈ capacity/draw); L6 the taxonomy essay (justify the census axes; argue where a
games console sits and why the honest answer is 'it depends on the axis').

Figures: 3 body figures + ≥3 SOLUTION figures: a generations strip; a
Moore-doubling staircase (2^k vs k); a power-budget bar strip. Terms ≥ 12: desktop,
laptop, tablet, smartphone, workstation, server, mainframe, supercomputer, embedded
system, microcontroller, microprocessor, system on a chip, Moore's law, computer
generation, electronic control unit. Formula cards ≥ 4 (N(t) = N₀·2^{Δt/2};
battery life ≈ Wh/W; the census-axes card; the growth-factor card 2^k).

## Fold obligations (the pre-flight)

`TOC_FOLD_LEDGER.json` hosts NO folds on either lesson (checked 2026-11-21 — the CS
sources routed their topics to the specialist books; the exam-topic ledger routes
U2 computer-architecture units to `computer-organization-architecture` etc.). The
no-duplication contract from `book.ts`: the gate-level view → Digital Logic Design;
the memory hierarchy → chapter 4 + COA; the OS story → Operating Systems;
networks → chapter 6 + Computer Networks. Both lessons cross-reference doorsteps,
never re-teach.

## The swarm shape (this run)

TWO agents in ONE message (the run-118 two-lesson shape): agent 1 owns 1.1
(part-cf11.ts + v-cf11.ts + e2e-cf-11 pair), agent 2 owns 1.2 (part-cf12.ts +
v-cf12.ts + e2e-cf-12 pair). NEVER two writers on the same file. Each: verify-first
(engines green BEFORE prose, self-run `bun` green), ≥ 6,000 words/lesson
(countLessonWords), quiz 5 + 15 exercises 2/2/3/3/3/2, ≥ 8 Illustrations, ≥ 3 body
figures + ≥ 3 solution figures, algorithm block in 1.1 (fetch–decode–execute), ≥ 12
terms, ≥ 4 formula cards, exam callouts, historical callouts, KaTeX-carrying math
throughout. The orchestrator (this session) assembles ch-01.ts +
verify-cs-book1-ch01.ts (sections A/B/C/D + census Z), registers the chapter in
book.ts, runs every gate, updates the shared ledgers + CS_AUTHORING_POINTER, commits
and pushes per the PAT protocol.

## Gates

bun run lint · bunx tsc --noEmit · verify-cs-book1-ch01 green · verify-cs-exam-coverage
green (the CS planning gate) · the three standing gates · lib:pack + lib:check ·
E2E ×2 lessons ×3 viewports · VLM strict figure audit (light + dark crops).
