# PHYSICS_TOC_SURVEY — the Physics full-shelf planning pass evidence base

Pass date: 2026-11-16. Owner directive: *"create a researched books with
chapter and topics for sections like finance, physics etc all the listed
in docs which can be authored later."* Same method as the Mathematics
(2026-11-10), CS (2026-11-15), Engineering / Humanities / Languages
(2026-11-16) passes: every book's research phase done BEFORE promotion —
exam/syllabus registers actually read, canonical textbook arcs named and
priced honestly, and every planned chapter/lesson laid out in
`src/data/library/books/physics/<slug>/book.ts` with status `'planned'`.

## The shelf census (19 books; the backlog's 20 lines → 19 books)

| # | book id | ch | planned lessons | lesson-id prefix |
|---|---------|----|-----------------|------------------|
| 1 | foundation-physics | 10 | 40 | `pf-` |
| 2 | mechanics | 12 | 48 | `pmech-` |
| 3 | properties-of-matter | 8 | 32 | `prop-` |
| 4 | waves-and-oscillations | 9 | 36 | `wav-` |
| 5 | heat-and-thermodynamics | 10 | 40 | `heat-` |
| 6 | electricity-and-magnetism | 11 | 44 | `emag-` |
| 7 | electromagnetic-theory | 10 | 40 | `emt-` |
| 8 | optics | 10 | 40 | `opt-` |
| 9 | modern-physics | 8 | 32 | `mod-` |
| 10 | quantum-mechanics | 9 | 36 | `qm-` |
| 11 | atomic-physics | 8 | 32 | `atom-` |
| 12 | nuclear-physics | 9 | 36 | `nuc-` |
| 13 | solid-state-physics | 9 | 36 | `ssp-` |
| 14 | statistical-mechanics | 8 | 32 | `statm-` |
| 15 | relativity | 8 | 32 | `rel-` |
| 16 | astrophysics | 8 | 32 | `astro-` |
| 17 | particle-physics | 8 | 32 | `part-` |
| 18 | mathematical-physics | 9 | 36 | `mph-` |
| 19 | experimental-physics | 8 | 32 | `exp-` |
| | **TOTAL** | **172** | **688** | |

### The honest fold (1)

- **Fluid Mechanics → mechanics.** The backlog's Fluid Mechanics line
  folds into the mechanics book as two explicit chapters (fluid-statics,
  fluid-dynamics) with cross-references to properties-of-matter (the
  matter-side: viscosity, surface tension) and to the engineering
  shelf's `fluid-mechanics` book (the Cengel-Cimbala thermo-fluids
  applied register). The physics register (buoyancy, continuity,
  Bernoulli, Torricelli) lives inside the classical mechanics canon
  (Halliday Part 3; the school mechanics units) — the Circuit-Theory
  fold precedent of the engineering pass.

### The no-duplication contract (cross-references, not folds)

- **mathematical-physics** vs the mathematics shelf's own
  `mathematical-methods-for-engineering` (`em-`), `linear-algebra`,
  `differential-equations`, `complex-analysis`, `numerical-analysis`:
  different registers — the physicist's craft vs the pure side — each
  book's positioning names the boundary.
- **heat-and-thermodynamics** vs engineering `thermodynamics` (Cengel &
  Boles applied register): physics-side laws vs engineering-side cycles;
  cross-referenced both ways.
- **solid-state-physics** vs engineering `materials-science` /
  `electronics` registers: the physics register (Kittel arc) owns the
  theory; the engineering books own the applied materials and device
  registers.
- **experimental-physics**'s electronics chapter vs CS
  `digital-logic-design`: the physicist's instrument-side taster
  cross-references the CS shelf's deep Mano arc.

## The registers read this pass (with URLs)

The syllabus/exam anchors — each opened during the pass's web research:

1. **JEE Main 2026 syllabus** (official NTA page + the s3waas PDF):
   https://jeemain.nta.nic.in/document/syllabus-2026 and
   https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2025/10/202510311323551056.pdf
   — the 19-unit physics register (Physics and Measurement, Kinematics,
   Laws of Motion, Work Power Energy, Rotational Motion, Gravitation,
   Properties of Solids and Liquids, Thermodynamics, Kinetic Theory,
   Oscillations and Waves, Electrostatics, Current Electricity, Magnetic
   Effects, EMI, AC, EM Waves, Optics, Dual Nature, Atoms and Nuclei,
   Electronic Devices) — pins books 1-9's school-competitive spine.
2. **NEET (UG) 2026 syllabus PDF** (NTA notice):
   https://nta.ac.in/Download/Notice/Notice_20260108180635.pdf
   — the medical register (Units: Physics and Measurement, Kinematics,
   Laws of Motion, ..., Electronic Devices) — pins the school side and
   the nuclear/semiconductor chapters' medical registers.
3. **GATE PH (Physics) 2026 syllabus PDF** (IIT Guwahati):
   https://gate2026.iitg.ac.in/doc/GATE2026_Syllabus/PH_2026_Syllabus.pdf
   — the MSc-level register: Mathematical Physics, Classical Mechanics
   (incl. Lagrangian/Hamiltonian formulations), Electromagnetic Theory,
   Quantum Mechanics, Thermodynamics & Statistical Physics, Atomic &
   Molecular Physics, Nuclear Physics, Solid State / Condensed Matter,
   Electronics & Instrumentation — pins books 10-19's university spine
   (the search snippet at pravegaa.com section-listing corroborates the
   nine-section structure).
4. **CSIR UGC NET Physical Sciences syllabus** (proposed-syllabus PDF
   mirror): https://www.careerpower.in/blog/wp-content/uploads/2024/11/27180243/PROPOSED-SYLLABUS-FOR-%E2%80%98PHYSICAL-SCIENCES.pdf
   — the research-side register (Mathematical Methods of Physics,
   Classical Mechanics, Electromagnetic Theory, Quantum Mechanics,
   Thermodynamic & Statistical Physics, Atomic & Molecular, Nuclear &
   Particle, Condensed Matter) — pins the PG/research expectation of the
   deep books.
5. **Halliday, Resnick & Walker — Fundamentals of Physics contents**
   (Stanford SearchWorks catalog listing + the 10e extended PDF):
   https://searchworks.stanford.edu/view/7108617 — Part 1 Measurement →
   Motion → Vectors → Two/Three-dimensional motion ... through fluids,
   electromagnetism, optics, modern physics — the shelf's main
   university arc (the 12e is the current edition; the 10e PDF
   corroborates the part structure).

## The canonical arcs named (not re-opened this pass — priced honestly)

Each deep book's research notes name its canonical pole; these were
NOT opened this pass (no TOC extraction), and the book.ts files say so:

- Taylor, *Classical Mechanics* (mechanics' analytical chapters)
- Griffiths, *Introduction to Electrodynamics* / *Quantum Mechanics* /
  *Introduction to Elementary Particles* (books 7, 10, 17)
- Hecht, *Optics* (book 8); Beiser & Krane, *Modern Physics* (book 9)
- Eisberg & Resnick, *Quantum Physics of Atoms...*; Foot, *Atomic
  Physics* (book 11)
- Krane, *Introductory Nuclear Physics* (book 12)
- Kittel, *Introduction to Solid State Physics*; Ashcroft & Mermin
  (book 13)
- Schroeder, *An Introduction to Thermal Physics*; Pathria (book 14)
- Taylor & Wheeler, *Spacetime Physics*; Carroll, *Spacetime and
  Geometry* (book 15)
- Carroll & Ostlie, *An Introduction to Modern Astrophysics* (book 16)
- Boas, *Mathematical Methods in the Physical Sciences*; Arfken, Weber
  & Harris (book 18)
- Squires, *Practical Physics*; Melissinos (book 19)
- French, *Vibrations and Waves*; Crawford, *Waves* (book 4)
- Zemansky, *Heat and Thermodynamics* (book 5)

## Gates

- `scripts/verify-physics-shelf-planning.ts` — the shelf gate (section
  A-I mirroring the languages/engineering gates; cover art is registered
  in the gen_covers.py roster 139 → 181 and generates idempotently via
  `python3 scripts/gen_covers.py gen`).
- Durable generator: `scripts/gen_physics_shelf.py` + the four plan-data
  modules under `scripts/shelf_data/physics_books_[abcd].py`.

## PLANNING-ONLY guarantee

Zero lessons written in the whole shelf. The one-unit-at-a-time
authoring cadence is unchanged — the Mathematics boat (Advanced Algebra
in progress) continues per the standing pointer; the Physics shelf's 19
books follow in backlog order when the owner promotes them.
