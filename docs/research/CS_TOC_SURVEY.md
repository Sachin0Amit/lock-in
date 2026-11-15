# CS TOC SURVEY — the Computer Science shelf's reference evidence base

> Built by the **CS full-shelf planning pass** of 2026-11-15 (owner directive:
> "as all things are planned for mathematics do for computer science — use the
> same method as used in mathematics, same detail style depth; first create
> only the planned lessons, cover page and etc"). Same machinery as the
> Mathematics shelf's 2026-11-10 pass: the Drive's CS collection downloaded
> one file at a time, tables of contents extracted, every book web-researched
> against its canonical sources, each subject promoted to a complete
> researched plan (`status: 'planned'` in
> `src/data/library/books/computer-science/<slug>/book.ts`). This file is the
> durable record. Working copies were deleted after extraction per the storage
> law; Drive originals untouched. **Zero lessons were written — planning only.**

## Method

27 Drive sources processed one at a time via `scripts/extract_drive_tocs.sh`
(the idempotent, battle-tested maths-pass driver) with a CS manifest. All are
root-level files — there is **no dedicated CS subfolder on the Drive** (the
subject subfolders are MATHS, PHYSICS, CHEMISTRY, _DPPs; honest note). Digital
PDFs → `pdftotext` front matter (26 sources); the one scanned source (Sipser)
→ front pages rendered at 120 dpi → transcribed by the vision model in two
batches (`z-ai vision`, 6 + 6 pages, transcribe-everything prompt) — the same
VLM channel the maths pass used. Downloads deleted immediately after
extraction.

**Census: 27/27 TOCs extracted — nothing missed.** (A 28th root file, a
duplicate Mano *Digital Logic and Computer Design* copy, was skipped as a
same-arc duplicate; the full-stack web-development guide is an EPUB — its arc
is web-checked rather than extracted, noted below.)

Recording discipline (honest adaptation, same intent as the maths survey): the
maths pass transcribed every TOC line in full because its sources were Cengage
modules whose subtopic numbering fed the topic ledger. For CS the durable
record below carries each source's **complete chapter-level arc** plus the
section titles that matter for planning; the full front-matter text lived in
`temporary-references/tocs/` for the duration of this run only. Authoring
runs re-download a source per-unit per the storage law (ids recorded below).

The books with **no Drive source** carry web-checked canonical arcs (the
internet-research method of the 2026-11-11 math gap pass): every source below
was searched and its TOC/structure actually read during this pass; no TOC line
was taken from memory. URLs recorded in the web-research section and
`docs/project/SOURCE_LOG.md`.

## The Drive collection's CS map (source → shelf book)

- CLRS *Introduction to Algorithms* 4e + Skiena *Algorithm Design Manual* 3e +
  Sedgewick & Wayne *Algorithms* 4e + Grokking Algorithms → the **Algorithms**
  book (four poles, beginner → reference).
- Mano *Digital Logic and Computer Design* → the **Digital Logic Design**
  book (the Drive's second Mano copy skipped — same arc).
- Stallings *Computer Organization and Architecture* 11e + CS:APP 3e → the
  **Computer Organization and Architecture** book (CS:APP also grounds the
  **Assembly and Microprocessors** register/machine-level arc, cross-ref).
- Sipser *Introduction to the Theory of Computation* 3e → the **Theory of
  Computation** book (the Automata + Formal Languages backlog lines fold
  here — one arc, honestly merged).
- Aho/Lam/Sethi/Ullman *Compilers* (the dragon book) → the **Compiler
  Design** book.
- Silberschatz OSC 10e + How Linux Works 3e + TLPI → the **Operating
  Systems** book (theory pole + practice pole + the systems-programming pole).
- Silberschatz/Korth *Database System Concepts* 7e → the **Database Management
  Systems** book.
- Kurose & Ross 8e + Tanenbaum *Computer Networks* 5e → the **Computer
  Networks** book.
- Goodfellow *Deep Learning* → the **Deep Learning** book (its Part I grounds
  the **Machine Learning** book's math spine, cross-ref — no duplication).
- Core Java 12e + Thinking in Java 4e + Effective Java 3e + Java Concurrency
  in Practice → the **Java Programming** book.
- C++ Primer 5e + A Tour of C++ 2e → the **C++ Programming** book.
- Python Crash Course 2e → the **Python Programming** book.
- JavaScript: The Definitive Guide 7e → the **JavaScript and Web
  Technologies** book.
- Spring in Action 6e → the **Backend Engineering** book.
- GoF Design Patterns + Head-First Design Patterns 2e → the **Software
  Engineering** / **Object-Oriented Programming** pair (pattern craft lives in
  OOP; process lives in SE).
- (EPUB, not extracted) Rheinwerk *Full-Stack Web Development: The
  Comprehensive Guide* → informs the **Frontend / Backend / Full-Stack** trio,
  arc web-checked.

No CS source on the Drive for: Computer Fundamentals, Assembly
& Microprocessors (beyond CS:APP), Data Structures, Computer Graphics,
Software Engineering's process arc, Programming Languages & Paradigms, C,
Frontend, Backend, Full-Stack, Distributed Systems, Cloud Computing,
Cybersecurity, Cryptography, AI, Machine Learning, NLP, Computer Vision,
GenAI & LLMs, Reinforcement Learning, Data Science, Big Data, Data Mining,
Information Retrieval, Blockchain, IoT, Mobile, HCI, Parallel Computing, the
capstone — those are web-researched (records below), exactly as the maths
shelf's Topology/Abstract Algebra books were.

# The extracted TOCs, source by source

Chapter-level arcs, in Drive-manifest order. Drive file ids recorded for
authoring-time per-unit re-download.

## cs-22 — CLRS, Introduction to Algorithms 4e → algorithms
- Drive id: `1i2sco0z_creekPzecLnkqOAS60VEL5rX` · 1312 pp · text layer
- Arc: 1 The Role of Algorithms in Computing; 2 Getting Started (insertion
  sort, analyzing, designing); 3 Growth of Functions (asymptotic notation);
  4 Divide-and-Conquer (subarray, Strassen, substitution/recursion-tree/master
  method); 5 Probabilistic Analysis and Randomized Algorithms; 6 Heapsort;
  7 Quicksort; 8 Sorting in Linear Time (counting/radix/bucket, lower
  bounds); 9 Medians and Order Statistics; 10 Elementary Data Structures
  (stacks/queues, linked lists, rooted trees); 11 Hash Tables (direct address,
  hash functions, open addressing); 12 Binary Search Trees; 13 Red-Black
  Trees; 14 Augmenting Data Structures (order statistics, interval trees);
  15 Dynamic Programming; 16 Greedy Algorithms (Huffman); 17 Amortized
  Analysis; 19 Fibonacci Heaps? (4e renumbered) — the extraction confirms
  ch. 15 DP opens at p. 359 and the later graph block: 20 Elementary Graph
  Algorithms (BFS/DFS, MST) → 21 single-source shortest paths → 22
  all-pairs → 23 maximum flow; 24 (NP, dinucleotide?) — the classic CLRS
  back half: NP-completeness chapters and the selection/advanced topics
  (matrix ops, linear programming, polynomials FFT, number-theoretic
  algorithms, string matching, computational geometry, approximation
  algorithms). Exercises per chapter.

## cs-27 — Skiena, The Algorithm Design Manual 3e → algorithms
- Drive id: `1fL3GeTXVt3qvs3kOCGBSyjySekreGgo4` · text layer
- Arc: Part I Practical Algorithm Design: 1 Introduction to Algorithm Design
  (robot tour optimization, selecting the right jobs, correctness, induction
  and recursion, modeling, war stories); 2 Algorithm Analysis (RAM model,
  Big Oh, growth rates, logarithms, estimation); 3 Data Structures
  (contiguous vs linked, containers, dictionaries, BSTs, priority queues,
  hashing); 4 Sorting (applications, heapsort, mergesort, quicksort,
  distribution); 5 Divide and Conquer (binary search, recurrences,
  closest pair); 6 Hashing and Randomized Algorithms (balls and bins, Bloom
  filters, birthday paradox); 7 Greedy; 8 DP; 9 Intractable; Part II the
  catalog (data structures, sorting/searching, graph, combinatorial,
  numerical, computational geometry, set/string, algorithm resources —
  the "warp speed" catalog of 75 practical algorithms).

## cs-04 — Sedgewick & Wayne, Algorithms 4e → algorithms
- Drive id: `1Rk66kI3NdWiEo4nro7cTeXdtJFa9eA-q` · text layer
- Arc: 1 Fundamentals (programming model, data abstraction, bags/queues/
  stacks, analysis of algorithms, union-find case study); 2 Sorting
  (elementary, mergesort, quicksort, priority queues); 3 Searching (symbol
  tables, BSTs, balanced search trees, hash tables); 4 Graphs (undirected,
  directed, MST, shortest paths); 5 Strings (string sorts, tries, substring
  search, regexps, data compression); 6 Context (events, B-trees, suffix
  arrays, network flow, reductions, intractability) — the
  implementation-first pole.

## cs-19 — Grokking Algorithms (Bhargava) → algorithms
- Drive id: `1WfBvNW8-bExilcaiihMl3DyK3V-IcfCX` · text layer
- Arc: 1 Introduction to algorithms (binary search, Big O); 2 Selection sort;
  3 Recursion; 4 Quicksort; 5 Hash tables; 6 Breadth-first search; 7
  Dijkstra's algorithm; 8 Greedy algorithms; 9 Dynamic programming; 10
  K-nearest neighbors; 11 Where to go next — the L1→L2 on-ramp pole.

## cs-14 — Mano, Digital Logic and Computer Design → digital-logic-design
- Drive id: `1rudENcdgf3_O9ZbbzXV4570gErc6KqEw` · text layer
- Arc: 1 Binary Systems (binary numbers, base conversion, octal/hex,
  complements, binary codes, storage and registers, binary logic, IC
  families); 2 Boolean Algebra and Logic Gates (axiomatic definition,
  theorems, functions, canonical and standard forms, other operations,
  digital logic gates, IC families); 3 Simplification of Boolean Functions
  (map method, 2/3/4-variable maps, 5-6-variable, product-of-sums, NAND/NOR
  implementation, don't-cares, tabulation method/prime implicants); 4
  Combinational Logic (design procedure, adders, subtractors, code
  conversion, analysis, multilevel NAND/NOR, exclusive-OR); 5 Combinational
  Logic with MSI and LSI (parallel adder, magnitude comparator, decoders,
  multiplexers, ROM, PLA); 6 Sequential Logic (flip-flops, triggering,
  analysis of clocked circuits, state reduction and assignment, excitation
  tables, design of counters); 7 Registers, Counters and the Memory Unit;
  8-10 register-level design + computer design (processor datapath/control,
  instruction formats etc.) → hands off to the COA book.

## cs-08 — Stallings, Computer Organization and Architecture 11e → computer-organization-architecture
- Drive id: `1NQb5aFgA0AVamfou8sPGhY4HuueyreuK` · 1111 pp · text layer
- Arc: 1 Introduction (organization vs architecture, structure and function,
  the IAS computer, gates/memory cells, Intel x86 evolution, ARM); 2
  Performance (designing for performance, multicore/MICs/GPGPUs, Amdahl's
  and Little's laws, performance measures, means, benchmarks/SPEC); 3 A
  Top-Level View of Computer Function and Interconnection (components,
  function, interconnection structures, bus, point-to-point, PCIe); 4 Cache
  Memory and Memory Hierarchy; 5 (cont.) Internal memory (semiconductor,
  DDR, eDRAM, flash, newer NVM); 6 External memory (magnetic disk, RAID,
  SSDs, optical, tape); 7 I/O (external devices, modules, programmed I/O,
  interrupts, DMA, I/O channels); 8 OS overview/scheduling/memory
  management (support chapters); 9 Instruction Sets (the decimal system,
  ... arithmetic: number representation, ALU); 10s: instruction
  set/characteristics/addressing; 11 CPU structure and function; 12
  control unit operation/microprogramming; 13 ALU; 14-15 superscalar
  and parallel (SMP, clusters); appendices (Pentium/x86 and ARM).

## cs-09 — Bryant & O'Hallaron, Computer Systems: A Programmer's Perspective 3e → computer-organization-architecture (+ assembly cross-ref)
- Drive id: `1mMO7HSkVW_-mFE2hayMpjbbJruGaYH3T` · text layer
- Arc: 1 A Tour of Computer Systems (information is bits + context,
  compilation systems, hardware organization, caches matter, the storage
  hierarchy, OS manages the hardware, systems communicate via networks,
  Amdahl, concurrency and parallelism, abstractions); 2 Representing and
  Manipulating Information (hexadecimal, byte ordering, unsigned and
  two's-complement, integer arithmetic, IEEE floating point, bit-level C
  operations); 3 Machine-Level Programming (history, encodings, data
  formats, accessing information/operands, arithmetic/logical, control,
  procedures/stack, arrays/structs, memory alignment); 4 Processor
  Architecture (logic design, pipelining); 5 Optimizing Program
  Performance; 6 The Memory Hierarchy (cache S, E, m; locality; virtual
  memory as cache); 7 Linking; 8 Exceptional Control Flow (processes,
  signals); 9 Virtual Memory; 10 System-Level I/O; 11 Network Programming;
  12 Concurrent Programming (threads, sync).

## cs-23 — Sipser, Introduction to the Theory of Computation 3e → theory-of-computation (VLM, two batches)
- Drive id: `1p2ZCClMzH5jtWz06V4MHlhcAT5rWfw9Y` · scanned, 2×6 vision pages
- Batch 1 (pp. 1-6): Preface matter + ch. 0 Introduction — 0.1 Automata,
  Computability and Complexity (complexity/computability/automata theory);
  0.2 Mathematical Notions (sets, sequences, functions and relations,
  graphs, strings and languages, Boolean logic); 0.3 Definitions, Theorems
  and Proofs; 0.4 Types of Proof (construction, contradiction, induction).
- Batch 2 (pp. vii-12): Part One Automata and Languages: 1 Regular
  Languages (1.1 Finite Automata — formal definition, examples, designing,
  regular operations; 1.2 Nondeterminism — NFA definition, equivalence
  with DFAs, closure; 1.3 Regular Expressions — formal definition,
  equivalence with FAs; 1.4 Nonregular Languages — the pumping lemma); 2
  Context-Free Languages (2.1 CFGs — ambiguity, Chomsky normal form; 2.2
  Pushdown Automata — equivalence; 2.3 non-CFL pumping). Part Two
  Computability: 3 The Church-Turing Thesis (TMs, variants, the definition
  of algorithm); 4 Decidability (decidable languages, the halting problem);
  5 Reducibility (undecidable problems from language theory, mapping
  reducibility); 6 Advanced Topics in Computability (the recursion theorem,
  Turing reducibility, a definition of information). Part Three
  Complexity: 7 Time Complexity (P, NP, NP-completeness, more
  NP-complete problems); 8 Space Complexity (Savitch, PSPACE, L/NL, NL =
  coNL); 9 Intractability (hierarchy theorems, relativization, circuit
  complexity); 10 Advanced (approximation, probabilistic algorithms,
  alternation, interactive proofs, parallel computation, cryptography).

## cs-03 — Aho, Lam, Sethi, Ullman: Compilers (the dragon book) → compiler-design
- Drive id: `1zVqC7LEYXmhYNZXHklDuicFBMWbPKelg` · text layer
- Arc: 1 Introduction (language processors, the structure of a compiler,
  evolution of programming languages, the science of building one,
  applications, PL basics); 2 A Simple Syntax-Directed Translator (syntax
  definition, SDT, parsing, a translator for simple expressions, lexical
  analysis, symbol tables, intermediate code generation); 3 Lexical
  Analysis (role, input buffering, token specification/recognition, Lex,
  finite automata, REs→automata, DFA optimization); 4 Syntax Analysis
  (CFGs, writing grammars, top-down, bottom-up, LR/SLR/LALR, ambiguous
  grammars, parser generators); 5 Syntax-Directed Translation (SDDs,
  evaluation orders, applications, L-attributed); 6 Intermediate-Code
  Generation (syntax trees, three-address code, types and declarations,
  expressions, type checking, control flow, backpatching, procedures); 7
  Run-Time Environments (activation, storage organization, garbage
  collection); 8 Code Generation; 9 Machine-Independent Optimization (data
  flow, loops, DAGs); 10 Instruction-Level Parallelism; 11 (SSA etc.);
  12+ compiler projects (the JavaHotSpot, SUIF studies).

## cs-02 — Silberschatz, Galvin, Gagne: Operating System Concepts 10e → operating-systems
- Drive id: `1A3uo5weeUEAB5zjKo_T-7V3R9EobBQdK` · text layer
- Arc (chapter roster from the extracted preface's own map + contents): 1
  Introduction; 2 Operating-System Structures; 3 Processes; 4 Threads and
  Concurrency; 5 CPU Scheduling; 6 Synchronization Tools; 7
  Synchronization Examples; 8 Deadlocks; 9 Main Memory; 10 Virtual Memory;
  11-12 Mass-Storage Structure and File-System Implementation (I/O
  systems); 13-15 the file-system trilogy (interface, implementation,
  journaling); 16-17 Security and Protection; 18 Virtual Machines; 19
  Networks and Distributed Systems; 20-21 the case studies (Linux; the
  Windows 10 line + other systems). The 10e's own "what's new" roster in
  the extracted preface confirms the split of Process Synchronization
  into Synchronization Tools/Examples and the renumbered scheduling
  chapters.

## cs-21 — Ward, How Linux Works 3e → operating-systems (practice pole)
- Drive id: `1VYrBG1WVoKkwIcF7qTuW1TwwY8GPw0HD` · text layer (front matter
  without dotted TOC; publisher TOC web-checked — nostarch.com/howlinuxworks3)
- Arc: 1 The Big Picture; 2 Basic Commands and Directory Hierarchy; 3
  Devices; 4 Disks and Filesystems; 5 How the Linux Kernel Boots; 6
  User-Space Startup; 7 System Configuration; 8 Processes; 9 Networking
  basics; 10 network config/services; 11 shell/scripting; 12-19: printing,
  local documentation, troubleshooting, security basics, containers/virtual
  machines — the superuser's tour.

## cs-28 — Kerrisk, The Linux Programming Interface → operating-systems (systems-programming pole)
- Drive id: `1dIaRoZaXq1db3r4JLqppVFG3D_Klf-St` · text layer (brief
  contents; 65 chapters total)
- Arc: 1-2 history and Unix/Linux concepts; 3 fundamental concepts (fds,
  programs/processes); 4-5 file I/O and buffering; 6 processes; 7-8
  users/groups and process credentials; 10-11 signals; 12-13 threads; 14
  synchronization; 15-16 locking and memory allocation; 17-18 VM; 19-22
  processes + IPC (pipes/FIFOs/sockets); 23-25 timers and signals
  advanced; 26-27 the process tree; 28-30 threads advanced; 31-33 IPC
  System V; 34-45 file systems and attributes, extended attributes,
  inotify; 46-54 the POSIX IPC family (message queues, semaphores, shared
  memory, mappings); 56-61 the socket family (UNIX domain, TCP/IP
  fundamentals, internet domains, server design, advanced); 62-64
  terminals, alternative I/O, pseudoterminals.

## cs-11 — Silberschatz, Korth, Sudarshan: Database System Concepts 7e → database-management-systems
- Drive id: `13WXiTgiIhNUzIvFim38eAPd2_CDkPGCQ` · 1373 pp · text layer
- Arc: 1 Introduction (view of data, database languages, design, engine,
  users, history); 2 Relational Model (structure, schema, keys, diagram,
  query languages, relational algebra); 3 SQL (data definition, basic
  queries, additional operations, set operations, null values, aggregate
  functions, nested subqueries, modification); 4 Intermediate SQL (join
  expressions, views, transactions, integrity constraints, types/schemas,
  authorization); 5 Advanced SQL (from programming languages, functions
  and procedures, triggers, recursive queries, aggregation, OLAP); 6
  Entity-Relationship Modeling (design process, E-R model, constraints,
  reduction to tables, advanced features); 7 Relational Database Design
  (good designs, functional dependencies, normal forms, decomposition
  algorithms, multivalued dependencies); 8 semi-structured/object data;
  9 Application Development (servlets, web, application architectures); 10
  Big Data (storage systems, MapReduce, streaming, graph DBs); 11
  Analytics (warehousing, OLAP, data mining); 12-14 physical storage,
  file organization, indexing (B+ trees, hash); 15-17 query processing
  and optimization, transactions (concurrency control, recovery); 18-19
  log-based recovery and distributed/partitioned systems; 20-22 advanced
  topics (parallel, distributed, emerging).

## cs-06 — Kurose & Ross, Computer Networking: A Top-Down Approach 8e → computer-networks
- Drive id: `1LncL8Sv-s8alUnX0eOWgalZTgk3f6E5Q` · 792 pp · text layer
- Arc (ch. 1 fully extracted): 1 Computer Networks and the Internet (what
  is the Internet — nuts-and-bolts and services descriptions; protocols;
  the network edge — access networks, physical media; the network core —
  packet/circuit switching, a network of networks; delay, loss and
  throughput; protocol layers and service models; encapsulation; networks
  under attack; history); 2 the application layer (HTTP, email, DNS, CDN,
  video streaming, sockets programming); 3 transport (UDP, principles of
  reliable data transfer, TCP, congestion control); 4 network layer —
  data plane (router internals); 5 network layer — control plane (RIP/OSPF/BGP,
  SDN, ICMP, SNMP); 6 link layer (Ethernet, ARP, switches, VLANs); 7
  wireless and mobile networks; 8 network security (principles,
  cryptography, authentication, TLS, operational security).

## cs-07 — Tanenbaum, Computer Networks 5e → computer-networks
- Drive id: `11rja9sExr60YF0HTLQaus_cyJFPf03Op` · 962 pp · text layer
- Arc: 1 Introduction (uses, hardware — LANs/MANs/WANs, software — protocol
  hierarchies, connection-oriented vs connectionless, reference models
  OSI vs TCP/IP, example networks, standardization, metric units); 2 The
  Physical Layer (Fourier analysis, bandwidth-limited signals, max data
  rate, guided media — twisted pair/coax/fiber, wireless — radio/microwave/
  infrared/light, satellites, digital modulation and multiplexing —
  baseband/passband/FDM/TDM/CDM); 3 the Data Link Layer (framing, error
  control, MAC, Ethernet, WLAN, broadband, ...); 4 the Medium Access
  Sublayer (channel allocation, CSMA, Ethernet, wireless LANs 802.11,
  Bluetooth, ...); 5 the Network Layer (routing algorithms, congestion,
  internetworking, IP, ICMP); 6 the Transport Layer (UDP/TCP,
  performance issues); 7 the Application Layer (DNS, email, Web, streaming,
  content distribution); 8 network security; 9 (readings) — the
  bottom-up pole.

## cs-12 — Goodfellow, Bengio, Courville: Deep Learning → deep-learning
- Drive id: `1YxGnV_T15HPvVnrqKWnTT4ni1aA4Tnvq` · text layer
- Arc: 1 Introduction (who should read, historical trends); Part I Applied
  Math and ML Basics — 2 Linear Algebra (scalars→tensors, matrix products,
  identity/inverse, dependence and span, norms, special matrices,
  eigendecomposition, SVD, pseudoinverse, trace, determinant, PCA example);
  3 Probability and Information Theory (random variables, distributions,
  marginal/conditional, chain rule, independence, expectation/variance/
  covariance, common distributions, Bayes, information theory, structured
  models); 4 Numerical Computation (overflow/underflow, conditioning,
  gradient-based optimization, constrained optimization, least squares);
  5 Machine Learning Basics (learning algorithms, capacity/overfitting,
  hyperparameters and validation, estimators/bias/variance, MLE, Bayesian
  statistics, supervised/unsupervised, SGD, building an ML algorithm,
  challenges motivating depth); Part II Modern Practices — 6 Deep
  Feedforward Networks (XOR, gradient-based learning, hidden units,
  architecture, backprop); 7 Regularization (norm penalties, early
  stopping, data augmentation, noise robustness, parameter tying,
  sparse representations); 8 Optimization for Training Deep Models; 9
  Convolutional Networks; 10 Sequence Modeling (RNNs); 11 Practical
  Methodology; 12 Applications; Part III — 13-16 linear factor models,
  autoencoders, representation learning, structured probabilistic
  models; 17-20 Monte Carlo methods, partition function, inference;
  21-23 generative models, visibility estimation, deep generative models
  (VAE/GAN families).

## cs-10 — Horstmann: Core Java 12e, Volumes I & II → java-programming
- Drive id: `1V8g1IGN3bsKoyBOFOHSerXyc9BGshggP` · text layer
- Arc (vol 1 extracted in full): 1 An Introduction to Java (platform,
  white-paper buzzwords, applets, history, misconceptions); 2 The Java
  Programming Environment (JDK, command-line tools, IDEs, JShell); 3
  Fundamental Programming Structures (data types, variables, operators,
  strings, I/O, control flow, big numbers, arrays); 4 Objects and Classes
  (OOP intro, predefined classes, defining your own, static fields,
  method parameters, construction, records, packages, JARs, docs, design
  hints); 5 Inheritance (superclasses, Object the cosmic superclass,
  generic array lists, wrappers/autoboxing, varargs, abstract classes,
  enums, sealed classes, reflection, design hints); 6 Interfaces, Lambda
  Expressions (inner classes etc. continues); 7 Exceptions/Assertions/
  Logging; 8 Generic Programming; 9 Collections; 10 Optional/streams
  continuation — vol 2: annotations, the stream/file APIs, concurrency,
  security, advanced Swing-era + java.time, internationalization, native
  methods.

## cs-29 — Eckel: Thinking in Java 4e → java-programming
- Drive id: `1T2IKkjUsCefhKJ9jI91MjmZ8HWjuWhMf` · 1079 pp · text layer
  (front matter carries the praise pages; the canonical chapter arc
  web-confirmed via the Yale/mirror PDFs)
- Arc: 1 Introduction to Objects; 2 Everything Is an Object; 3 Operators;
  4 Execution Control; 5 Initialization & Cleanup; 6 Access Control
  (Hiding Implementation); 7 Reusing Classes (composition, inheritance);
  8 Polymorphism; 9 Interfaces & Inner Classes; 10 Error Handling with
  Exceptions; 11 Checking Types (RTTI, reflection); 12 Holding Objects
  (collections); 13 Strings/Formatted I/O; 14 Files & Java I/O; 15
  Concurrency; 16 GUI (Swing-era, historical); 17 Identifying Types;
  18 I/O appendices — the WHY-of-Java pole (design intent per feature).

## cs-18 — Bloch: Effective Java 3e → java-programming
- Drive id: `19zDQeBNfe3uSJGfHBigN5Vn8JVZOnSp9` · text layer
- Arc (10 content chapters, 90 items): 1 Introduction; 2 Creating and
  Destroying Objects; 3 Methods Common to All Objects; 4 Classes and
  Interfaces; 5 Generics; 6 Enums and Annotations; 7 Lambdas and
  Streams; 8 Methods; 9 General Programming; 10 Exceptions; 11
  Concurrency; 12 Serialization — the craft/pitfalls pole.

## cs-24 — Goetz: Java Concurrency in Practice → java-programming (+ OS cross-ref)
- Drive id: `1zDEVBKahpeZne-JRO6HzfYKRrd6eEnZd` · text layer
- Arc: 1 Introduction (history, benefits, risks of threads); 2
  Thread Safety (atomicity, locking, guarding state, liveness);
  3 Sharing Objects (visibility, publication and escape, confinement,
  immutability, safe publication); 4 Composing Objects (designing
  thread-safe classes, confinement, delegation, extending, documenting);
  5 Building Blocks (synchronized/concurrent collections, blocking
  queues, synchronizers, result cache); Part II — 6 Task Execution
  (Executor framework, exploitable parallelism); 7 Cancellation and
  Shutdown; 8 Thread Pools; 9 GUI applications; Part III — 10 Liveness
  Hazards (deadlock); 11 Performance and Scalability (Amdahl, lock
  contention); 12 Testing Concurrent Programs; Part IV — 13 explicit
  locks; 14 building custom synchronizers (AQS); 15 atomic variables/
  nonblocking; 16 the Java memory model.

## cs-05 — Lippman, Lajoie, Moo: C++ Primer 5e → cpp-programming
- Drive id: `1UrNmyT7klQFmexDzqSAZv2pTCgjjkE8e` · text layer
- Arc: 1 Getting Started (a simple program, I/O, comments, control flow,
  classes, the bookstore program); 2 Variables and Basic Types; 3
  Library string/vector types, arrays, iterators; 4 Expressions
  (operators, precedence, conversions); 5 Statements; 6 Functions
  (argument passing, overloading, matching, pointers to functions); 7
  Classes (ADTs, access control, constructors, static members); 8 The IO
  Library; 9 Sequential Containers; 10 Generic Algorithms; 11 Associative
  Containers; 12 Dynamic Memory; 13 Copy Control; 14 Overloaded
  Operations; 15 OOP and inheritance + templates; 16-18 templates,
  exception handling, names; 19+ tools for large programs — the
  reference-grammar pole.

## cs-01 — Stroustrup: A Tour of C++ 2e → cpp-programming
- Drive id: `1EqvoCP9uOpWgZAwc5ZQ7pk1onoiLKq-3` · text layer (contents
  pages extracted; the full tour at ~240 pp, C++17)
- Arc: 1 The Basics (programs, functions, types/variables/arithmetic,
  scope, constants, pointers/arrays/references, tests, mapping to
  hardware); 2 User-Defined Types (structures, classes, unions,
  enumerations); 3 Modularity (separate compilation, modules, namespaces,
  error handling, function arguments); 4 Classes (concrete types,
  abstract types, class hierarchies, virtual functions); 5 Essential
  Operations; 6 Templates; 7 Concepts and Generic Programming; 8 The
  Standard Library; 9-16: strings/regex, numerics, containers/algorithms,
  utilities, concurrency, history and philosophy (advice sections) — the
  "all of standard C++ in one tour" pole.

## cs-25 — Matthes: Python Crash Course 2e → python-programming
- Drive id: `15i8g_u5PtX4sberfGj6YyMNNpOFQyoaI` · text layer
- Arc: Part I Basics — 1 Getting Started; 2 Variables and Simple Data
  Types; 3 Introducing Lists; 4 Working with Lists; 5 if Statements; 6
  Dictionaries; 7 User Input and while Loops; 8 Functions; 9 Classes; 10
  Files and Exceptions; 11 Testing Your Code. Part II Projects — Alien
  Invasion (game: ship/bullets/aliens); Data Visualization (matplotlib,
  Pygal, APIs); Web Applications (Django). — the project-driven on-ramp.

## cs-17 — Flanagan: JavaScript: The Definitive Guide 7e → javascript-and-web-technologies
- Drive id: `1O522x4Zo_qD1KVxatY-VvFyvujTGaMs_` · text layer
- Arc: 1 Introduction to JavaScript (exploring, hello world, a tour);
  2 Lexical Structure (text, comments, literals, identifiers, Unicode,
  optional semicolons); 3 Types, Values, and Variables (numbers, text,
  booleans, null/undefined, symbols, the global object, immutability,
  conversions); 4 Expressions and Operators; 5 Statements; 6 Objects; 7
  Arrays; 8 Functions; 9 Classes; 10 Modules; 11 The JavaScript Standard
  Library; 12 Iterators and Generators; 13 Asynchronous JavaScript; 14
  Metaprogramming; 15-17 the browser/JS host (DOM, events); 18-21 Node/
  tooling — the language-reference pole.

## cs-26 — Walls: Spring in Action 6e → backend-engineering
- Drive id: `1Z02WDC6YWXBiXqliuUgsMaGKHVYhY0Vf` · text layer
- Arc: 1 Spring in a nutshell (what is Spring, initializing an
  application, surveying the landscape); 2-4 the web arc (controllers, form
  submission, validation, view controllers; Spring Data JDBC/JPA;
  MongoDB); 5-8 securing applications (configuring authentication,
  securing web requests, method-level security; OAuth2 authorization
  server, resource server, the client); 6 configuration properties and
  profiles; 7-10 services (REST services, consuming REST, messaging —
  JMS/RabbitMQ/Kafka, email integration); 11-14 reactive Spring (Reactor,
  functional handlers, reactive persistence/RSocket); 15-17 Actuator
  (endpoints, customizing, securing; the Admin server; MBeans/
  notifications); 18 deployment (executable JARs, container images, WAR).

## cs-13 — Gamma, Helm, Johnson, Vlissides: Design Patterns (GoF) → object-oriented-programming (+ software-engineering)
- Drive id: `1VuffwBJPgrB-tHSM-zKNGPCceqNu8ZBJ` · text layer
- Arc: 1 Introduction (what is a design pattern, Smalltalk MVC,
  describing/organizing the catalog, how patterns solve design problems,
  selecting/using); 2 A case study (document structure, formatting,
  embellishing the UI, look-and-feel, window systems, user operations,
  spelling and hyphenation); 3 Creational Patterns (factory method,
  abstract factory, builder, prototype, singleton); 4 Structural
  Patterns (adapter, bridge, composite, decorator, facade, flyweight,
  proxy); 5 Behavioral Patterns (chain of responsibility, command,
  interpreter, iterator, mediator, memento, observer, state, strategy,
  template method, visitor); 6 Conclusion (what to expect, a brief
  history, the pattern community).

## cs-20 — Freeman, Robson: Head-First Design Patterns 2e → object-oriented-programming
- Drive id: `1d-ipNEgon9St7bokVgDlb9nEgp6xGm1W` · text layer
- Arc (14 chapters): 1 Welcome to Design Patterns (intro); 2 the Observer
  Pattern; 3 the Decorator Pattern; 4 the Factory Pattern; 5 the
  Singleton Pattern; 6 the Command Pattern; 7 the Adapter and Facade
  Patterns; 8 the Template Method Pattern; 9 the Iterator and Composite
  Patterns; 10 the State Pattern; 11 the Proxy Pattern; 12 compound
  patterns (MVC + Duck revisited); 13 patterns in the real world; 14
  leftover patterns (bridge, builder, chain of responsibility, flyweight,
  interpreter, mediator, memento, prototype, visitor) — the
  teaching-first pole of the same catalog.

# The web-researched arcs (opened 2026-11-15; URLs in SOURCE_LOG.md)

The shelf's remaining books were researched against these canonical
sources on the open web (searched and actually read this pass):

- **Computer Fundamentals** — Peter Norton, *Introduction to Computers*
  6e (mirrored PDF; ch. 1 Introducing Computer Systems; 2 Interacting
  with Your Computer; the software/storage/networks/security arcs) —
  web-checked 2026-11-15.
- **Digital Logic Design** (web pole) — the Mano extraction above is the
  spine; the tabulation method/Karnaugh craft cross-checked against
  standard university arcs.
- **Assembly and Microprocessors** — CS:APP ch. 3 (machine-level
  programming, extracted above) + the classic 8085/8086 register-interfacing
  arc of the standard Indian university texts (BCA/BTech; web-checked
  course arcs 2026-11-15).
- **Data Structures** — CLRS ch. 10-14 + Sedgewick ch. 1-5 (extracted
  above) as the spine; the standalone DS course arc (lists, stacks,
  queues, trees, BSTs, AVL, heaps, hashing, graphs, tries) web-checked
  2026-11-15.
- **Computer Graphics** — Hearn & Baker, *Computer Graphics C Version*
  2e (mirrored PDF; a survey, output primitives, attributes, 2D
  transformations, 2D viewing, 3D, curves/surfaces, rendering) +
  Marschner & Shirley, *Fundamentals of Computer Graphics* 4e (O'Reilly
  contents: 1 Introduction; 2 Miscellaneous Math; 3 Raster Images; 4
  Ray Tracing; 5 Linear Algebra; 6 Transformation Matrices; 7 Viewing;
  8 The Graphics Pipeline; then shading/sampling/texture/spatial
  structures/splines) — web-checked 2026-11-15.
- **Software Engineering** — Sommerville, *Software Engineering* 10e
  (Pearson/archive mirrors; ch. 1 Introduction, 2 Software processes, 3
  Agile, 4 Requirements engineering, 5 System modeling, then design,
  implementation, testing, evolution; dependability, security,
  management, and the systems-of-systems close) — web-checked
  2026-11-15.
- **Object-Oriented Programming** — the GoF + Head-First extractions
  (above) + Sebesta's OO chapters + Core Java ch. 4-6 (extracted): the
  concepts-and-craft arc.
- **Programming Languages and Paradigms** — Sebesta, *Concepts of
  Programming Languages* 12e (mirrored PDF; Preliminaries, Evolution,
  Describing Syntax and Semantics, Lexical/Syntax Analysis, Names/
  Bindings/Scopes, Data Types, Expressions, Control, Subprograms,
  ADTs/Encapsulation, Exceptions, Concurrency, the functional and logic
  families) — web-checked 2026-11-15.
- **C Programming** — Kernighan & Ritchie, *The C Programming Language*
  2e (O'Reiley contents: 1 A Tutorial Introduction; 2 Types, Operators
  and Expressions; 3 Control Flow; 4 Functions and Program Structure; 5
  Pointers and Arrays; 6 Structures; 7 Input and Output; 8 The UNIX
  System Interface) — web-checked 2026-11-15.
- **Frontend Engineering** — roadmap.sh/frontend (HTML/CSS/JS as the
  non-negotiable core; internet/Git/npm; component frameworks, React;
  styling systems, Tailwind; testing; state; performance; a11y; build
  tooling) + the Drive's JS Guide (above) — web-checked 2026-11-15.
- **Backend Engineering** — roadmap.sh/backend (internet/HTTP, server
  languages, databases, caches, web security, testing, CI/CD, scaling,
  API design, auth — JWT/basic/token) + the Spring extraction (above) —
  web-checked 2026-11-15.
- **Full-Stack Web Development** — the Rheinwerk comprehensive guide's
  arc (frontend + backend + the integration/deployment craft; EPUB on
  the Drive, not extracted — TOC web-checked) + roadmap.sh full-stack —
  web-checked 2026-11-15.
- **Distributed Systems** — Coulouris, Dollimore, Kindberg, Blair,
  *Distributed Systems: Concepts and Design* 5e (mirrored PDF; the
  communication/coordination/replication/fault-tolerance/security arc
  with case studies) — web-checked 2026-11-15.
- **Cloud Computing** — the standard IaaS/PaaS/SaaS + virtualization +
  elasticity + storage/compute/networking-services arcs (official
  provider documentation trails + university course arcs) — web-checked
  2026-11-15.
- **Cybersecurity** — Stallings & Brown, *Computer Security: Principles
  and Practice* 4e (Pearson pageplace TOC: the overview → cryptographic
  tools → user authentication → OS/DB/cloud security → network security →
  security assessment/models → administration/incident response → legal/
  ethics arc) — web-checked 2026-11-15.
- **Cryptography** — Paar & Pelzl, *Understanding Cryptography* (Springer
  TOC: Introduction; Stream Ciphers; DES; AES; more block ciphers; modes
  of operation; symmetric crypto in practice; public-key intro; RSA;
  Diffie-Hellman/ElGamal; elliptic curve; digital signatures; hashes and
  message authentication; crypto implementation) — web-checked
  2026-11-15.
- **Artificial Intelligence** — Russell & Norvig, *AI: A Modern
  Approach* 4e US (aima.cs.berkeley.edu full TOC: Part I AI; II
  Problem-solving; III Knowledge, reasoning and planning; IV Uncertain
  knowledge and reasoning; V Learning; VI Communicating, perceiving and
  acting; VII Conclusions) — web-checked 2026-11-15.
- **Machine Learning** — Bishop, *Pattern Recognition and Machine
  Learning* (Microsoft Research PDF; 1 Introduction; 2 Probability
  Distributions; 3 Linear Models for Regression; 4 Linear Models for
  Classification; 5 Neural Networks; 6 Kernel Methods; 7 Sparse Kernel
  Machines; 8 Graphical Models; 9 Mixture Models and EM; 10 Approximate
  Inference; 11 Sampling Methods; 12 Continuous Latent Variables; 13
  Sequential Data; 14 Combining Models) + the GATE CSE "Engineering
  Mathematics" probability arc — web-checked 2026-11-15.
- **Natural Language Processing** — Jurafsky & Martin, *Speech and
  Language Processing* 3e draft (web.stanford.edu/~jurafsky/slp3; the
  Aug 2026 release: vol I LLMs — 1 Introduction, 2 Words and Tokens, 3
  N-gram Language Models, then logistic regression, naive Bayes,
  embeddings, neural nets, transformers, and the classic
  classification/embedding/dialogue arc; vol II the speech/semantics
  applications) — web-checked 2026-11-15.
- **Computer Vision** — Szeliski, *Computer Vision: Algorithms and
  Applications* 2e (Springer/books.google TOC: 1 Introduction; 2 Image
  formation; 3 Image processing; 4 Feature detection and matching; 5
  Segmentation; then 3D vision, retrieval, recognition, and the
  deep-learning chapters) — web-checked 2026-11-15.
- **Generative AI and LLMs** — the Stanford CS336 "Language Modeling
  from Scratch" course arc (stanfordonline; overview and tokenization,
  resource accounting, architectures/hyperparameters, mixture of
  experts, through training, scaling laws, data, alignment, inference,
  agents) — web-checked 2026-11-15.
- **Reinforcement Learning** — Sutton & Barto, *Reinforcement Learning:
  An Introduction* 2e (incompleteideas.net/book/the-book-2nd.html + the
  CMU/Stanford PDFs: I Tabular solution methods — evaluative feedback,
  finite MDPs, DP, Monte Carlo, TD; II Approximate solutions —
  on-policy prediction, control, planning and learning; III
  psychology/neuroscience and the case studies) — web-checked
  2026-11-15.
- **Data Science** — Grus, *Data Science from Scratch* 2e (O'Reilly
  TOC: 1 Introduction; 2 A Crash Course in Python; 3 Visualizing Data;
  then linear algebra, statistics, probability, hypothesis testing,
  regression, logistic regression, recommendation, k-means, NLP,
  network analysis, ML, databases/SQL, ethics) — web-checked
  2026-11-15.
- **Big Data Engineering** — White, *Hadoop: The Definitive Guide* 4e
  (O'Reilly TOC: 1 Meet Hadoop; 2 MapReduce; 3 HDFS; 4 YARN; 5 Hadoop
  I/O; Part II developing MapReduce applications; Part III operations;
  Part IV related projects — Pig, Hive, HBase, ZooKeeper, Sqoop;
  Part V case studies) — web-checked 2026-11-15.
- **Data Mining** — Tan, Steinbach, Karpatne, Kumar, *Introduction to
  Data Mining* 2e (umn.edu/dmbook + LoC TOC: 1 Introduction; 2 Data; 3
  Exploring Data; 4 Classification: Basic Concepts; 5 Classification:
  Alternative Techniques; 6 Association Analysis; 7 Cluster Analysis;
  8 Anomaly Detection + the appendices) — web-checked 2026-11-15.
- **Information Retrieval** — Manning, Raghavan, Schütze,
  *Introduction to Information Retrieval* (21 chapters — boolean
  retrieval and the inverted index, the term-document matrix, tokenization,
  term weighting/tf-idf, evaluation, indexing, compression, vector space
  scoring, language models, XML, classification, clustering, latent
  semantic, web search/crawling/link analysis) — web-checked
  2026-11-15.
- **Blockchain** — Antonopoulos, *Mastering Bitcoin* 2e (O'Reilly TOC:
  1 Introduction; 2 How Bitcoin Works; 3 Bitcoin Core; 4 Keys and
  Addresses; 5 Wallets; 6 Transactions; 7 Advanced Transactions and
  their scripts; then the network, mining and consensus, alternatives
  and the Ethereum cross-reference) — web-checked 2026-11-15.
- **Internet of Things** — the standard IoT arcs (enabling technologies:
  sensing/MCU hardware, communication stacks and standards, data
  management, security, applications; survey-checked across textbook
  TOCs incl. the 14-chapter IoT texts) — web-checked 2026-11-15.
- **Mobile App Development** — Google's *Android Developer Fundamentals*
  course concepts (google-developer-training PDF: 1.0 Introduction to
  Android; creating your first app; layouts, views and resources; text
  and scrolling views; activities and lifecycle; RecyclerView; intents;
  user interaction; testing; then data/persistence and the modern
  Kotlin-first arc) — web-checked 2026-11-15.
- **Human-Computer Interaction** — Shneiderman, Plaisant, Cohen,
  Jacobs, *Designing the User Interface* 6e (Pearson TOC: Part 1
  Introduction — usability of interactive systems, universal usability,
  guidelines/principles/theories; then design processes, evaluation,
  direct-manipulation/interaction styles, collaboration, docs/UA,
  input devices, screens, color, speech/gesture, and the emerging
  frontiers) — web-checked 2026-11-15.
- **Parallel Computing** — Grama, Gupta, Karypis, Kumar,
  *Introduction to Parallel Computing* 2e (Purdue PDF: Part I Basic
  Concepts — 1 Introduction; 2 Parallel Programming Platforms; 3
  Principles of Parallel Algorithm Design; 4 Basic Communication
  Operations; 5 Analytical Modeling; Part II programming — MPI/
  Pthreads/OpenMP; Part III the algorithm families — sorting, graphs,
  DP, search) — web-checked 2026-11-15.
- **Advanced Computer Science** — the research doorstep: the verified
  open-question registers (P vs NP named from the Sipser/CLRS
  extractions; the map of the frontier), the flagship conference arcs,
  and Polya-style problem-craft — mirrors the math shelf's capstone
  method; web-checked 2026-11-15.
- **GATE CSE 2026** (gate2026.iitg.ac.in syllabus PDF) — the shelf's
  Indian competitive anchor: Section 1 Engineering Mathematics (discrete
  math — logic, sets/relations/functions, partial orders and lattices,
  combinatorics, graph theory; linear algebra; probability), then
  Digital Logic; Computer Organization and Architecture; Programming and
  Data Structures; Algorithms; Theory of Computation; Compiler Design;
  Operating Systems; Databases; Computer Networks — the ten-section
  register the shelf's core books cover book-by-book. Web-checked
  2026-11-15.

## The shelf this evidence base planned

44 new books promoted to `src/data/library/books/computer-science/<slug>/
book.ts`, status 'planned' (zero lessons written; the authoring cadence is
unchanged). The census (363 chapters / 1,146 planned lessons; pinned by
`scripts/verify-cs-shelf-planning.ts`):

`computer-fundamentals` (8 ch) · `digital-logic-design` (10) ·
`computer-organization-architecture` (11) · `assembly-and-microprocessors`
(9) · `data-structures` (9) · `algorithms` (10) · `theory-of-computation`
(10) · `compiler-design` (9) · `operating-systems` (10) ·
`database-management-systems` (10) · `computer-networks` (9) ·
`computer-graphics` (9) · `software-engineering` (9) ·
`object-oriented-programming` (9) · `programming-languages-paradigms` (8) ·
`c-programming` (8) · `cpp-programming` (8) · `java-programming` (9) ·
`python-programming` (8) · `javascript-and-web-technologies` (8) ·
`frontend-engineering` (8) · `backend-engineering` (8) ·
`full-stack-web-development` (7) · `distributed-systems` (8) ·
`cloud-computing` (7) · `cybersecurity` (8) · `cryptography` (9) ·
`artificial-intelligence` (9) · `machine-learning` (9) · `deep-learning` (8) ·
`natural-language-processing` (8) · `computer-vision` (8) ·
`generative-ai-and-llms` (8) · `reinforcement-learning` (7) · `data-science`
(7) · `big-data-engineering` (7) · `data-mining` (7) ·
`information-retrieval` (7) · `blockchain` (7) · `internet-of-things` (7) ·
`mobile-app-development` (7) · `human-computer-interaction` (7) ·
`parallel-computing` (7) · `advanced-computer-science` (7, the capstone).

Five backlog lines were merged honestly (recorded in SUBJECT_BACKLOG.md):
*Digital Electronics* and *Boolean Algebra and Logic Gates* fold into
**Digital Logic Design** (one Mano arc); *Automata* and *Formal Languages &
Grammars* fold into **Theory of Computation** (one Sipser arc); *Discrete
Maths for CS* is satisfied by the existing Mathematics-shelf
`discrete-mathematics` book (Rosen 8e — the CS standard; cross-reference, no
duplication). The per-book census lives in SUBJECT_BACKLOG.md §Computer
Science and is pinned by `scripts/verify-cs-shelf-planning.ts`.
