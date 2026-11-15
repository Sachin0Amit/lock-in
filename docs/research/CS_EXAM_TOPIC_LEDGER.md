# CS EXAM TOPIC LEDGER — the Computer Science shelf's exam-coverage record

> Built by the **CS exam-topic coverage pass** of 2026-11-15 (owner directive:
> "make sure those exams topics are to be covered in the books see if any
> topics is missing in cs books"). The Mathematics shelf already carries two
> exam-coverage gates (verify-exam-coverage.ts for the Practice-hub presets,
> verify_topic_coverage.ts for the Drive TOC survey); this pass runs the same
> method for the **Computer Science shelf**: every topic line of every
> registry examination with a researched CS section is transcribed/condensed
> from its OFFICIAL syllabus, routed to the shelf book whose plan should carry
> it (the routing table is the "arrange accordingly" artifact), and
> token-matched against that book's plan blob (description + chapter
> titles/summaries + plannedLessons — the same evidence class as the maths
> pass). **Census: 251 topic lines across seven exams — 251 direct, zero hard
> gaps, zero crosses.** The standing gate is
> `scripts/verify-cs-exam-coverage.ts` (Section II re-runs this audit on every
> pass; the routing table below is its canonical form).

## Method

1. **Official sources only, downloaded 2026-11-15** (nothing from memory):
   GATE 2026 CSE syllabus PDF (gate2026.iitg.ac.in), UGC NET CS&A code-87
   syllabus PDF (ugcnetonline.in), IOI Syllabus 2024
   (ioinformatics.org/files/ioi-syllabus-2024.pdf), CUET(UG) 308 CS/IP
   syllabus PDF (the NTA 2025 file via cdnbbsr.s3waas.gov.in), Cambridge 9618
   2026 syllabus PDF (cambridgeinternational.org), AP CS A course units
   (apcentral.collegeboard.org), IB DP CS (the 2027-course themes via the
   computersciencewiki.org mirror of the guide + ibo.org; the legacy guide's
   options recorded for the exams that still run them). Working copies lived
   in /tmp only; no past-paper content was taken — syllabus topic lists only.
2. **Topic ledger**: 251 lines transcribed/condensed from the syllabi (long
   unit sublists split across their honest homes so each line routes to ONE
   book — e.g. UGC NET U1's group theory routes to the Mathematics shelf's
   Abstract Algebra, IOI's school-arithmetic lines to the mathematics books).
3. **Matching**: token-level on normalized text (the verify_topic_coverage.ts
   standard — case/punctuation folded, stop-words dropped, a curated ALIAS
   table of genuine synonyms: BNF, GSM/CDMA, SVM, asymptotic notation,
   secret-key/symmetric, LIFO/PUSH/POP …), a topic COVERED when >= 60% of its
   significant tokens appear in the routed book's blob.
4. **First-run verdict (the honest audit)**: 240 lines — 162 direct, 39 hard
   gaps, 39 crosses. Every hard gap was then **fixed by CONTENT** (planned
   lessons added to the owning book, planning-level only — zero lesson
   authoring) or routed honestly cross-shelf where the Mathematics shelf
   already owns the ground (group theory, Bayes, Russell's paradox).
   Final run: **251/251 direct.**

## The seven CS-bearing registry exams

| registry id | CS section researched | topic lines | all direct |
| --- | --- | --- | --- |
| gate | GATE CS paper, 10 sections | 52 | 52 |
| ugc-net | Paper 2 CS&A code 87, 10 units | 94 | 94 |
| ioi | IOI syllabus ✓-census | 31 | 31 |
| cuet-ug | CUET UG 308 CS/IP | 19 | 19 |
| ib | DP CS (2027 themes + legacy options) | 22 | 22 |
| a-levels | Cambridge 9618, 20 sections | 28 | 28 |
| ap | AP CS A, 4 units | 5 | 5 |

The registry entries now carry `csUnits` (the section census above) and
CS-extended `coverageMap`s; no other registry examination claims a CS
section (the languages/aptitude/olympiad-maths families have none — the
gate's Section I enforces the census).

## The topic ledger (per exam: line → routed book → tokens hit)


### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S1 Engineering Mathematics | Propositional and first order logic | `discrete-mathematics` |
| S1 Engineering Mathematics | Sets, relations, functions, partial orders and lattices | `discrete-mathematics` |
| S1 Engineering Mathematics | Monoids, Groups | `abstract-algebra` |
| S1 Engineering Mathematics | Graphs: connectivity, matching, colouring | `discrete-mathematics` |
| S1 Engineering Mathematics | Combinatorics: counting, recurrence relations, generating functions | `discrete-mathematics` |
| S1 Engineering Mathematics | Linear Algebra: matrices, determinants, system of linear equations, eigenvalues and eigenvectors, LU decomposition | `linear-algebra` |
| S1 Engineering Mathematics | Calculus: limits, continuity and differentiability, maxima and minima, mean value theorem, integration | `differential-calculus` |
| S1 Engineering Mathematics | Probability and Statistics: random variables, uniform, normal, exponential, Poisson and binomial distributions, mean, median, mode and standard deviation, conditional probability and Bayes theorem | `probability-theory` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S2 Digital Logic | Boolean algebra | `digital-logic-design` |
| S2 Digital Logic | Combinational and sequential circuits | `digital-logic-design` |
| S2 Digital Logic | Minimization | `digital-logic-design` |
| S2 Digital Logic | Number representations and computer arithmetic (fixed and floating point) | `digital-logic-design` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S3 Computer Organization and Architecture | Machine instructions and addressing modes | `computer-organization-architecture` |
| S3 Computer Organization and Architecture | ALU, data-path and control unit | `computer-organization-architecture` |
| S3 Computer Organization and Architecture | Instruction pipelining, pipeline hazards | `computer-organization-architecture` |
| S3 Computer Organization and Architecture | Memory hierarchy: cache, main memory and secondary storage | `computer-organization-architecture` |
| S3 Computer Organization and Architecture | I/O interface (interrupt and DMA mode) | `computer-organization-architecture` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S4 Programming and Data Structures | Programming in C | `c-programming` |
| S4 Programming and Data Structures | Recursion | `c-programming` |
| S4 Programming and Data Structures | Arrays, stacks, queues, linked lists, trees, binary search trees, binary heaps, graphs | `data-structures` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S5 Algorithms | Searching, sorting, hashing | `algorithms` |
| S5 Algorithms | Asymptotic worst case time and space complexity | `algorithms` |
| S5 Algorithms | Algorithm design techniques: greedy, dynamic programming and divide-and-conquer | `algorithms` |
| S5 Algorithms | Graph traversals, minimum spanning trees, shortest paths | `algorithms` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S6 Theory of Computation | Regular expressions and finite automata | `theory-of-computation` |
| S6 Theory of Computation | Context-free grammars and push-down automata | `theory-of-computation` |
| S6 Theory of Computation | Regular and context-free languages, pumping lemma | `theory-of-computation` |
| S6 Theory of Computation | Turing machines and undecidability | `theory-of-computation` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S7 Compiler Design | Lexical analysis, parsing, syntax-directed translation | `compiler-design` |
| S7 Compiler Design | Runtime environments | `compiler-design` |
| S7 Compiler Design | Intermediate code generation | `compiler-design` |
| S7 Compiler Design | Local optimisation | `compiler-design` |
| S7 Compiler Design | Data flow analyses: constant propagation, liveness analysis, common subexpression elimination | `compiler-design` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S8 Operating System | System calls, processes, threads, inter-process communication, concurrency and synchronization | `operating-systems` |
| S8 Operating System | Deadlock | `operating-systems` |
| S8 Operating System | CPU and I/O scheduling | `operating-systems` |
| S8 Operating System | Memory management and virtual memory | `operating-systems` |
| S8 Operating System | File systems | `operating-systems` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S9 Databases | ER-model | `database-management-systems` |
| S9 Databases | Relational model: relational algebra, tuple calculus, SQL | `database-management-systems` |
| S9 Databases | Integrity constraints, normal forms | `database-management-systems` |
| S9 Databases | File organization, indexing (B and B+ trees) | `database-management-systems` |
| S9 Databases | Transactions and concurrency control | `database-management-systems` |

### GATE CSE 2026 (gate2026.iitg.ac.in — CS_2026_Syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| S10 Computer Networks | Concept of layering: OSI and TCP/IP protocol stacks | `computer-networks` |
| S10 Computer Networks | Basics of packet, circuit and virtual circuit switching | `computer-networks` |
| S10 Computer Networks | Data link layer: framing, error detection, medium access control, Ethernet bridging | `computer-networks` |
| S10 Computer Networks | Routing protocols: shortest path, flooding, distance vector and link state routing | `computer-networks` |
| S10 Computer Networks | Fragmentation and IP addressing, IPv4, CIDR notation | `computer-networks` |
| S10 Computer Networks | Basics of IP support protocols (ARP, DHCP, ICMP) | `computer-networks` |
| S10 Computer Networks | Network Address Translation (NAT) | `computer-networks` |
| S10 Computer Networks | Transport layer: flow control and congestion control, UDP, TCP, sockets | `computer-networks` |
| S10 Computer Networks | Application layer protocols: DNS, SMTP, HTTP, FTP, Email | `computer-networks` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U1 Discrete Structures and Optimization | Mathematical Logic: propositional and predicate logic, normal forms, quantifiers, rules of inference | `mathematical-logic` |
| U1 Discrete Structures and Optimization | Sets and Relations: set operations, properties of relations, equivalence relations, partially ordering | `discrete-mathematics` |
| U1 Discrete Structures and Optimization | Counting and mathematical induction: pigeonhole principle, permutations and combinations, inclusion-exclusion | `discrete-mathematics` |
| U1 Discrete Structures and Optimization | Discrete probability: Bayes theorem and conditional probability | `probability-theory` |
| U1 Discrete Structures and Optimization | Group Theory: groups, subgroups, semigroups, isomorphism, homomorphism, rings, integral domains, fields | `abstract-algebra` |
| U1 Discrete Structures and Optimization | Graph Theory: simple graph, multigraph, weighted graph, paths and circuits, shortest paths, Eulerian and Hamiltonian paths, planar graph, graph colouring, bipartite graphs, trees and rooted trees, prefix codes, tree traversals, spanning trees and cut-sets | `discrete-mathematics` |
| U1 Discrete Structures and Optimization | Boolean Algebra: Boolean functions and representation, simplification | `digital-logic-design` |
| U1 Discrete Structures and Optimization | Optimization: linear programming, graphical solution, simplex and dual simplex, sensitivity analysis, integer programming, transportation and assignment models, PERT-CPM, critical path | `optimization-and-operations-research` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U2 Computer System Architecture | Digital logic circuits and components: logic gates, Boolean algebra, map simplification, combinational circuits, flip-flops, sequential circuits, decoders, multiplexers, registers and counters, memory unit | `digital-logic-design` |
| U2 Computer System Architecture | Data representation: number systems and conversion, complements, fixed point representation, floating point representation, error detection codes, computer arithmetic addition subtraction multiplication division algorithms | `digital-logic-design` |
| U2 Computer System Architecture | Register transfer language, bus and memory transfers, arithmetic, logic and shift microoperations | `computer-organization-architecture` |
| U2 Computer System Architecture | Basic computer organization and design: stored program organization, instruction codes, computer registers, timing and control, instruction cycle, interrupt | `computer-organization-architecture` |
| U2 Computer System Architecture | Programming the basic computer: machine language, assembly language, assembler, program loops, subroutines, input-output programming | `assembly-and-microprocessors` |
| U2 Computer System Architecture | Microprogrammed control: control memory, address sequencing, design of control unit | `computer-organization-architecture` |
| U2 Computer System Architecture | Central processing unit: general register organization, stack organization, instruction formats, addressing modes, RISC, CISC | `computer-organization-architecture` |
| U2 Computer System Architecture | Pipeline and vector processing: parallel processing, pipelining, arithmetic pipeline, instruction pipeline, vector processing, array processors | `computer-organization-architecture` |
| U2 Computer System Architecture | Input-output organization: peripheral devices, I/O interface, asynchronous data transfer, modes of transfer, priority interrupt, DMA, serial communication | `computer-organization-architecture` |
| U2 Computer System Architecture | Memory hierarchy: main memory, auxiliary memory, associative memory, cache memory, virtual memory, memory management hardware | `computer-organization-architecture` |
| U2 Computer System Architecture | Multiprocessors: interconnection structures, interprocessor arbitration, communication and synchronization, cache coherence, multicore processors | `computer-organization-architecture` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U3 Programming Languages and Computer Graphics | Language design and translation issues: programming language concepts, paradigms, programming environments, binding times, programming language syntax, stages in translation, formal translation models | `programming-languages-paradigms` |
| U3 Programming Languages and Computer Graphics | Elementary data types: scalar and composite data types | `programming-languages-paradigms` |
| U3 Programming Languages and Computer Graphics | Programming in C: tokens, identifiers, data types, sequence control, subprogram control, arrays, structures, union, string, pointers, functions, file handling, command line arguments, preprocessors | `c-programming` |
| U3 Programming Languages and Computer Graphics | Object oriented programming: class, object, instantiation, inheritance, encapsulation, abstract class, polymorphism | `object-oriented-programming` |
| U3 Programming Languages and Computer Graphics | Programming in C++: virtual functions, constructors and destructors, overloading, inheritance, templates, exception and event handling, streams and files, multifile programs | `cpp-programming` |
| U3 Programming Languages and Computer Graphics | Web programming: HTML, DHTML, XML, scripting | `javascript-and-web-technologies` |
| U3 Programming Languages and Computer Graphics | Java applets and servlets: the web programming family | `java-programming` |
| U3 Programming Languages and Computer Graphics | Computer graphics: video display devices, raster-scan and random-scan systems, graphics monitors, input devices, line drawing algorithms, mid-point circle and ellipse algorithms, scan-line polygon fill, boundary-fill and flood-fill | `computer-graphics` |
| U3 Programming Languages and Computer Graphics | 2D geometrical transforms and viewing: translation, scaling, rotation, reflection and shear, matrix representations and homogeneous coordinates, composite transforms, viewing pipeline, window to viewport transformation, line and polygon clipping | `computer-graphics` |
| U3 Programming Languages and Computer Graphics | 3D object representation: polygon surfaces, quadric surfaces, spline representation, Bezier and B-spline curves and surfaces, illumination models, polygon rendering methods, projection transforms, viewing pipeline | `computer-graphics` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U4 Database Management Systems | Database system concepts and architecture: data models, schemas and instances, three-schema architecture, data independence, database languages, centralized and client-server architectures | `database-management-systems` |
| U4 Database Management Systems | Data modeling: entity-relationship diagram, relational model constraints, relational algebra and relational calculus, Codd rules | `database-management-systems` |
| U4 Database Management Systems | SQL: data definition, constraints, queries, insert, delete, update, views, stored procedures and functions, database triggers, SQL injection | `database-management-systems` |
| U4 Database Management Systems | Normalization: functional dependencies, normal forms, query processing and optimization, transaction processing, concurrency control, database recovery, object-relational databases, database security and authorization | `database-management-systems` |
| U4 Database Management Systems | Enhanced data models: temporal, multimedia, deductive, XML and internet databases, mobile databases, geographic information systems, genome data management, distributed databases | `database-management-systems` |
| U4 Database Management Systems | Data warehousing and data mining: OLAP and OLTP, association rules, classification, clustering, regression, support vector machine, K-nearest neighbour, hidden Markov model, social network analysis | `data-mining` |
| U4 Database Management Systems | Big data systems: characteristics, types, architecture, Map-Reduce, Hadoop, distributed file system, HDFS | `big-data-engineering` |
| U4 Database Management Systems | NOSQL: NoSQL products, querying and managing NoSQL, indexing and ordering data sets, NoSQL in cloud | `big-data-engineering` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U5 System Software and Operating System | System software: compilers and interpreters, machine and assembly languages | `compiler-design` |
| U5 System Software and Operating System | Loading, linking, relocation, macros, debuggers and the programming environment | `assembly-and-microprocessors` |
| U5 System Software and Operating System | Basics of operating systems: structure, operations and services, system calls, system boot | `operating-systems` |
| U5 System Software and Operating System | Process management: process scheduling, interprocess communication, process synchronization, critical-section problem, Peterson solution, semaphores | `operating-systems` |
| U5 System Software and Operating System | Threads: multicore programming, multithreading models, thread libraries, implicit threading | `operating-systems` |
| U5 System Software and Operating System | CPU scheduling: criteria and algorithms, thread scheduling, multiprocessor scheduling, real-time CPU scheduling | `operating-systems` |
| U5 System Software and Operating System | Deadlocks: characterization, prevention, avoidance and detection, recovery from deadlock | `operating-systems` |
| U5 System Software and Operating System | Memory management: contiguous allocation, swapping, paging, segmentation, demand paging, page replacement, thrashing, memory-mapped files | `operating-systems` |
| U5 System Software and Operating System | Storage management: mass-storage structure, disk scheduling, RAID structure | `operating-systems` |
| U5 System Software and Operating System | File and input-output systems: access methods, directory structure, file-system implementation, allocation methods, free-space management | `operating-systems` |
| U5 System Software and Operating System | Security: protection, access matrix, program threats, system and network threats, cryptography, user authentication | `operating-systems` |
| U5 System Software and Operating System | Virtual machines: types and implementations, virtualization | `operating-systems` |
| U5 System Software and Operating System | Linux operating systems: design principles, kernel modules, process management, scheduling, memory management, file systems, interprocess communication | `operating-systems` |
| U5 System Software and Operating System | Windows operating systems: design principles, system components, file system, networking | `operating-systems` |
| U5 System Software and Operating System | Distributed systems: network operating systems, communication structure and protocols, distributed file systems | `distributed-systems` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U6 Software Engineering | Software process models: prescriptive process models, agile process models, Extreme Programming, Scrum, component based development, formal methods, web engineering | `software-engineering` |
| U6 Software Engineering | Software requirements: functional and non-functional requirements, use cases, software requirement specification | `software-engineering` |
| U6 Software Engineering | Software design: abstraction, architecture, patterns, modularity, information hiding, cohesion and coupling, object-oriented design, user interface design | `software-engineering` |
| U6 Software Engineering | Software quality: McCall and ISO 9126 quality factors, quality control and assurance, risk management, software reliability | `software-engineering` |
| U6 Software Engineering | Estimation and scheduling: software sizing, LOC and FP based estimation, COCOMO, project scheduling and staffing, timeline charts | `software-engineering` |
| U6 Software Engineering | Software testing: verification and validation, white-box and black-box testing, basis path testing, regression testing, stress testing | `software-engineering` |
| U6 Software Engineering | Software configuration management: change control, version control, software reuse, reverse engineering | `software-engineering` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U7 Data Structures and Algorithms | Data structures: arrays, sparse matrix, stacks, queues, priority queues, linked lists, trees, threaded binary tree, binary search tree, AVL tree, B tree, B+ tree, graphs, hashing | `data-structures` |
| U7 Data Structures and Algorithms | Performance analysis of algorithms: time and space complexity, asymptotic notation, recurrence relations | `algorithms` |
| U7 Data Structures and Algorithms | Design techniques: divide and conquer, dynamic programming, greedy algorithms, backtracking, branch and bound | `algorithms` |
| U7 Data Structures and Algorithms | Lower bound theory: comparison trees, lower bounds through reductions | `algorithms` |
| U7 Data Structures and Algorithms | Graph algorithms: breadth-first search, depth-first search, shortest paths, maximum flow, minimum spanning trees | `algorithms` |
| U7 Data Structures and Algorithms | Complexity theory: P and NP class problems, NP-completeness and reducibility | `theory-of-computation` |
| U7 Data Structures and Algorithms | Selected topics: number theoretic algorithms, polynomial arithmetic, fast Fourier transform, string matching algorithms | `algorithms` |
| U7 Data Structures and Algorithms | Advanced algorithms: parallel algorithms for sorting, searching and merging, approximation algorithms, randomized algorithms | `algorithms` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U8 Theory of Computation and Compilers | Theory of computation: formal language, non-computational problems, diagonal argument, Russell paradox | `theory-of-computation` |
| U8 Theory of Computation and Compilers | Regular language models: DFA, NDFA, equivalence of DFA and NDFA, regular languages, regular grammars, regular expressions, pumping lemma, non-regular languages, lexical analysis | `theory-of-computation` |
| U8 Theory of Computation and Compilers | Context free language: pushdown automaton, context free grammar, Chomsky normal form, Greibach normal form, ambiguity, parse tree, equivalence of PDA and CFG, properties of context free languages | `theory-of-computation` |
| U8 Theory of Computation and Compilers | Turing machines: standard and variations, universal Turing machines, Church-Turing thesis, recursive and recursively-enumerable languages, context-sensitive languages, unrestricted grammars, Chomsky hierarchy | `theory-of-computation` |
| U8 Theory of Computation and Compilers | Unsolvable problems and computational complexity: halting problem, Post correspondence problem, tractable and intractable problems | `theory-of-computation` |
| U8 Theory of Computation and Compilers | Syntax analysis: top down parsing, recursive descent, LL(1) parsing, bottom up parsing, LR parser, LALR(1) parser, associativity, precedence, grammar transformations | `compiler-design` |
| U8 Theory of Computation and Compilers | Semantic analysis: attribute grammar, syntax directed definitions, inherited and synthesized attributes, dependency graph, type checking | `compiler-design` |
| U8 Theory of Computation and Compilers | Run time system: storage organization, activation record, stack allocation, parameter passing mechanisms, symbol table | `compiler-design` |
| U8 Theory of Computation and Compilers | Intermediate code generation: intermediate representations, translation of declarations, assignments, control flow, boolean expressions | `compiler-design` |
| U8 Theory of Computation and Compilers | Code generation and optimization: control-flow and data-flow analysis, local and global optimization, loop optimization, peephole optimization, instruction scheduling | `compiler-design` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U9 Data Communication and Computer Networks | Data communication: simplex, half-duplex and duplex modes, analog and digital signals, bandwidth, throughput and latency, encoding and modulation, multiplexing, transmission media, transmission errors | `computer-networks` |
| U9 Data Communication and Computer Networks | Computer networks: network topologies, LAN, MAN, WAN, wireless networks, Internet | `computer-networks` |
| U9 Data Communication and Computer Networks | Network models: layered architecture, OSI reference model, TCP/IP protocol suite, switching techniques | `computer-networks` |
| U9 Data Communication and Computer Networks | Functions of OSI and TCP/IP layers: framing, error detection and correction, flow and error control, sliding window protocol, HDLC, CSMA/CD, CSMA/CA, token passing, VLAN | `computer-networks` |
| U9 Data Communication and Computer Networks | IPv4 and IPv6: classful and classless addressing, fragmentation and checksum, ARP, routing algorithms, TCP, UDP and SCTP, flow control, congestion control | `computer-networks` |
| U9 Data Communication and Computer Networks | World wide web: URL, domain name service, resolution, electronic mail, SMTP, POP and IMAP, TELNET, FTP | `computer-networks` |
| U9 Data Communication and Computer Networks | Network security: malwares, cryptography and steganography, secret-key and public-key algorithms, digital signature, VPN, firewalls | `cryptography` |
| U9 Data Communication and Computer Networks | Mobile technology: GSM and CDMA, services and architecture, mobile computing, mobile IP, communication satellites, wireless LANs, cellular topology, mobile adhoc networks, geolocation, GPRS and SMS | `computer-networks` |
| U9 Data Communication and Computer Networks | Cloud computing and IoT: SaaS, PaaS, IaaS, public and private cloud, virtualization, virtual server, cloud storage, resource management, service level agreement, basics of IoT | `cloud-computing` |

### UGC NET Computer Science and Applications, code 87 (ugcnetonline.in — official NTA/NET Bureau PDF)

| section | topic line | routed book |
| --- | --- | --- |
| U10 Artificial Intelligence | Approaches to AI: Turing test, rational agents, state space representation, heuristic search techniques, game playing, min-max search, alpha beta cutoff | `artificial-intelligence` |
| U10 Artificial Intelligence | Knowledge representation: logic, semantic networks, frames, rules, scripts, conceptual dependency, ontologies, expert systems, handling uncertainty | `artificial-intelligence` |
| U10 Artificial Intelligence | Planning: components of a planning system, linear and non-linear planning, goal stack, hierarchical planning, STRIPS, partial order planning | `artificial-intelligence` |
| U10 Artificial Intelligence | Natural language processing: grammar and language, parsing techniques, semantic analysis, pragmatics | `natural-language-processing` |
| U10 Artificial Intelligence | Multi agent systems: agents and objects, agents and expert systems, semantic web, agent communication, knowledge sharing using ontologies | `artificial-intelligence` |
| U10 Artificial Intelligence | Fuzzy sets: fuzziness, membership functions, fuzzification and defuzzification, fuzzy relations, fuzzy rules and inference, fuzzy control systems | `artificial-intelligence` |
| U10 Artificial Intelligence | Genetic algorithms: encoding strategies, genetic operators, fitness functions, GA cycle | `artificial-intelligence` |
| U10 Artificial Intelligence | Artificial neural networks: supervised, unsupervised and reinforcement learning, perceptron, multi-layer perceptron, self-organizing maps, Hopfield network | `machine-learning` |

### IOI Syllabus 2024 (ioinformatics.org/files/ioi-syllabus-2024.pdf — the ✓-category census)

| section | topic line | routed book |
| --- | --- | --- |
| Mathematics (5.1) | Integers, operations, comparison | `arithmetic-and-number-systems` |
| Mathematics (5.1) | Basic properties of integers: parity, divisibility | `number-theory` |
| Mathematics (5.1) | Basic modular arithmetic | `number-theory` |
| Mathematics (5.1) | Prime numbers | `number-theory` |
| Mathematics (5.1) | Fractions and percentages | `elementary-algebra` |
| Mathematics (5.1) | Point, vector, coordinates in the plane | `geometry` |
| Mathematics (5.1) | Polygon: vertex, side, convex, inside, area | `geometry` |
| Mathematics (5.1) | Euclidean distances, Pythagorean theorem | `geometry` |

### IOI Syllabus 2024 (ioinformatics.org/files/ioi-syllabus-2024.pdf — the ✓-category census)

| section | topic line | routed book |
| --- | --- | --- |
| Mathematics (5.2 Discrete Structures) | Functions: surjections, injections, inverses, composition | `discrete-mathematics` |
| Mathematics (5.2 Discrete Structures) | Relations: reflexivity, symmetry, transitivity, equivalence relations, order relations, lexicographic order | `discrete-mathematics` |
| Mathematics (5.2 Discrete Structures) | Sets: inclusion-exclusion, complements, Cartesian products, power sets | `discrete-mathematics` |
| Mathematics (5.2 Discrete Structures) | Basic logic: first-order logic, logical connectives, truth tables, universal and existential quantification, modus ponens | `mathematical-logic` |
| Mathematics (5.2 Discrete Structures) | Proof techniques: implication, contrapositive, contradiction, mathematical induction, strong induction | `discrete-mathematics` |
| Mathematics (5.2 Discrete Structures) | Basics of counting: sum and product rule, Fibonacci numbers, permutations and combinations, binomial coefficients, inclusion-exclusion principle, pigeonhole principle, Pascal identity, binomial theorem | `discrete-mathematics` |
| Mathematics (5.2 Discrete Structures) | Graphs and trees: undirected graphs, directed graphs, paths, reachability, trees, rooted trees, spanning trees, traversal strategies, bipartite graphs, directed acyclic graphs, planar graphs | `discrete-mathematics` |

### IOI Syllabus 2024 (ioinformatics.org/files/ioi-syllabus-2024.pdf — the ✓-category census)

| section | topic line | routed book |
| --- | --- | --- |
| Computing Science (6.1 PF) | Fundamental programming constructs: variables, types, expressions, assignment, input output, conditional and iterative control structures, functions and parameter passing | `c-programming` |
| Computing Science (6.1 PF) | The concept and properties of algorithms: correctness and efficiency | `algorithms` |
| Computing Science (6.1 PF) | Problem-solving and implementation strategies for algorithms | `algorithms` |
| Computing Science (6.1 PF) | Debugging strategies and the discipline of the defect hunt | `software-engineering` |
| Computing Science (6.1 PF) | Fundamental data structures: primitive types, arrays, strings and string processing, linked structures, implementation strategies for graphs and trees, pointers and references, floating point representation | `data-structures` |
| Computing Science (6.1 PF) | Recursion: recursive mathematical functions, simple recursive procedures, mutual recursion, divide-and-conquer, recursive backtracking | `algorithms` |

### IOI Syllabus 2024 (ioinformatics.org/files/ioi-syllabus-2024.pdf — the ✓-category census)

| section | topic line | routed book |
| --- | --- | --- |
| Computing Science (6.2 AL) | Basic algorithmic analysis: correctness, invariants, asymptotic analysis, big O notation, complexity classes, time and space tradeoffs | `algorithms` |
| Computing Science (6.2 AL) | Algorithmic strategies: brute force, greedy, divide and conquer, backtracking, branch and bound, dynamic programming | `algorithms` |
| Computing Science (6.2 AL) | Algorithms: Euclid algorithm, sieve of Eratosthenes, factorization, efficient exponentiation, arbitrary precision integers, array manipulation, prefix sums, sorting quicksort merge sort, binary search, tree traversals, topological ordering, connected components, shortest paths Dijkstra Bellman-Ford Floyd-Warshall, minimum spanning tree, bipartite matching, biconnectivity, strongly connected components, minimax game playing | `algorithms` |
| Computing Science (6.2 AL) | Data structures: stacks and queues, adjacency lists and matrix, binary heap, union-find, balanced and augmented binary search trees, Fenwick and segment trees, lowest common ancestor, heavy-light decomposition, persistent data structures, tries | `data-structures` |
| Computing Science (6.2 AL) | Amortized analysis | `algorithms` |
| Computing Science (6.2 AL) | Geometric algorithms: points, vectors, lines, collinear points, cross products, polygon area, convex hull, sweeping line, coordinate compression | `algorithms` |
| Computing Science (6.2 AL) | Understanding a simple grammar in Backus-Naur form | `theory-of-computation` |

### IOI Syllabus 2024 (ioinformatics.org/files/ioi-syllabus-2024.pdf — the ✓-category census)

| section | topic line | routed book |
| --- | --- | --- |
| Software Engineering (7 SE) | Software design: fundamental design concepts and principles, design patterns, structured design | `software-engineering` |
| Software Engineering (7 SE) | Using APIs: application programming interface programming and libraries | `python-programming` |

### IOI Syllabus 2024 (ioinformatics.org/files/ioi-syllabus-2024.pdf — the ✓-category census)

| section | topic line | routed book |
| --- | --- | --- |
| Computer Literacy (8 CL) | Computer literacy: basic structure and operation of a computer (CPU, memory, I/O), operating system, program development tools, file management | `computer-fundamentals` |

### CUET(UG) 308 Computer Science / Informatics Practices (cuet.nta.nic.in — the NTA 2025 PDF)

| section | topic line | routed book |
| --- | --- | --- |
| A Common | Database concepts: domain, tuple, relation, candidate key, primary key, alternate key, foreign key, relational algebra selection projection union set difference cartesian product | `database-management-systems` |
| A Common | Structured Query Language: DDL, DQL, DML, MySQL, data types, CREATE TABLE, DROP TABLE, ALTER TABLE, SELECT, FROM, WHERE, INSERT, UPDATE, DELETE | `database-management-systems` |
| A Common | SQL functions: math functions, text functions, date functions, aggregate functions MAX MIN AVG SUM COUNT, group by, having, order by, union, intersection, cartesian product, join | `database-management-systems` |
| A Common | Computer networks: evolution of networking, LAN, WAN, MAN, network devices modem, ethernet card, repeater, hub, switch, router, gateway, network topologies mesh ring bus star tree, MAC and IP address, difference between Internet and web | `computer-networks` |

### CUET(UG) 308 Computer Science / Informatics Practices (cuet.nta.nic.in — the NTA 2025 PDF)

| section | topic line | routed book |
| --- | --- | --- |
| B1 Computer Science | Exception handling in Python: syntax errors, exceptions, user-defined exceptions, raising and catching exceptions, try except else finally clause, built-in exception classes | `python-programming` |
| B1 Computer Science | File handling in Python: text file and binary file, open and close, reading and writing text files, pickle module, file access modes | `python-programming` |
| B1 Computer Science | Stack: LIFO operations, PUSH and POP, implementation in Python, prefix infix postfix notations, evaluating arithmetic expressions using stack, conversion of infix to postfix | `data-structures` |
| B1 Computer Science | Queue: FIFO, INSERT and DELETE operations, implementation in Python, deque | `data-structures` |
| B1 Computer Science | Searching: sequential search, binary search, best worst average cases | `algorithms` |
| B1 Computer Science | Sorting: bubble sort, selection sort, insertion sort, best worst average cases | `algorithms` |
| B1 Computer Science | Hashing: hash functions, collision resolution | `data-structures` |
| B1 Computer Science | Understanding data: collection and organization, statistical methods mean, median, standard deviation, variance, data interpretation | `statistics` |
| B1 Computer Science | Data communication: types of data communication, switching techniques, communication media twisted pair, co-axial, optical fibre, wireless technologies bluetooth, WLAN, infrared, microwave, mobile telecommunication, network protocol HTTP, FTP, IP, PPP, electronic mail protocol, bandwidth, data transfer rate | `computer-networks` |
| B1 Computer Science | Security aspects: viruses, worms, trojan horse, spam, cookies, adware, firewall, http vs https, network security, antivirus, denial of service, intrusion, snooping, eavesdropping | `cybersecurity` |

### CUET(UG) 308 Computer Science / Informatics Practices (cuet.nta.nic.in — the NTA 2025 PDF)

| section | topic line | routed book |
| --- | --- | --- |
| B2 Informatics Practices | Data handling using Pandas: Series and DataFrames, creation, mathematical operations, indexing and slicing, Boolean indexing, joining merging and concatenation, importing exporting CSV | `data-science` |
| B2 Informatics Practices | Descriptive statistics with Pandas: max, min, count, sum, mean, median, mode, quartile, standard deviation, aggregation, group by, sorting, handling missing values | `data-science` |
| B2 Informatics Practices | Plotting data using Matplotlib: line plot, bar graph, histogram, pie chart, scatter plot, customizing plots, label, title, legend | `data-science` |
| B2 Informatics Practices | Societal impacts: digital footprint, intellectual property rights, plagiarism, licensing and copyrights, FOSS, creative commons, cybercrime and cyber laws, hacking, phishing, cyberbullying, Indian IT Act, e-waste management | `cybersecurity` |
| B2 Informatics Practices | Website: introduction, website vs webpage, static vs dynamic webpage, web server and hosting, web browsers, add-ons and plug-ins, cookies | `frontend-engineering` |

### IB DP Computer Science (the 2027 course themes via computersciencewiki.org + ibo.org; the legacy guide options through 2026)

| section | topic line | routed book |
| --- | --- | --- |
| Theme A Concepts | Computer hardware and operation | `computer-fundamentals` |
| Theme A Concepts | Data representation and computer logic | `computer-fundamentals` |
| Theme A Concepts | Operating systems and control systems | `operating-systems` |
| Theme A Concepts | Translation: language translators (HL) | `compiler-design` |
| Theme A Concepts | Network fundamentals, network architecture, data transmissions, network security | `computer-networks` |
| Theme A Concepts | Database fundamentals, database design, database programming | `database-management-systems` |
| Theme A Concepts | Alternative databases and data warehouses (HL) | `big-data-engineering` |
| Theme A Concepts | Machine learning fundamentals, data preprocessing (HL), machine learning approaches (HL), ethical considerations | `machine-learning` |

### IB DP Computer Science (the 2027 course themes via computersciencewiki.org + ibo.org; the legacy guide options through 2026)

| section | topic line | routed book |
| --- | --- | --- |
| Theme B Computational thinking | Approaches to computational thinking | `algorithms` |
| Theme B Computational thinking | Programming fundamentals and constructs: sequence, selection, iteration | `python-programming` |
| Theme B Computational thinking | Data structures (programming) | `data-structures` |
| Theme B Computational thinking | Programming algorithms and file processing | `python-programming` |
| Theme B Computational thinking | Object oriented programming: fundamentals for a single class, multiple classes (HL) | `object-oriented-programming` |
| Theme B Computational thinking | Abstract data types: fundamentals | `data-structures` |

### IB DP Computer Science (the 2027 course themes via computersciencewiki.org + ibo.org; the legacy guide options through 2026)

| section | topic line | routed book |
| --- | --- | --- |
| Legacy guide options (through 2026) | System fundamentals: systems planning, system design, human interaction with systems, data migration, implementation and testing | `computer-fundamentals` |
| Legacy guide options (through 2026) | Computer organization: hardware, secondary storage, operating system and peripherals, high and low level languages | `computer-organization-architecture` |
| Legacy guide options (through 2026) | Networks: data transmission, protocols, security, topologies | `computer-networks` |
| Legacy guide options (through 2026) | Abstract data structures (HL): stacks, queues, linked lists, trees, applications | `data-structures` |
| Legacy guide options (through 2026) | The databases option: database design, querying, data warehousing | `database-management-systems` |
| Legacy guide options (through 2026) | Option modelling and simulation | `optimization-and-operations-research` |
| Legacy guide options (through 2026) | Web science: the web technologies (HTTP, HTML, CSS, search) | `javascript-and-web-technologies` |
| Legacy guide options (through 2026) | Option object oriented programming | `object-oriented-programming` |

### Cambridge International AS & A Level Computer Science 9618, 2026 syllabus (cambridgeinternational.org/Images/697372-2026-syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| AS core | Data representation: number systems, binary, binary coded decimal, hexadecimal, character sets, images, sound | `computer-fundamentals` |
| AS core | Multimedia: graphics and sound as bits | `computer-fundamentals` |
| AS core | Compression | `computer-fundamentals` |
| AS core | Communication: networks including the internet, client-server, packet switching, IP addresses, DNS, URLs, protocols | `computer-networks` |
| AS core | Hardware: computers and their components, input and output devices, logic gates and logic circuits | `computer-organization-architecture` |
| AS core | Processor fundamentals: CPU architecture, registers, buses, assembly language, instruction set, addressing modes, interrupts, bit manipulation | `computer-organization-architecture` |
| AS core | System software: the operating systems layer | `operating-systems` |
| AS core | Language translators: assembler, compiler, interpreter | `compiler-design` |
| AS core | Security, privacy and data integrity: data security, data integrity, security threats, encryption | `cybersecurity` |
| AS core | Ethics and ownership | `cybersecurity` |
| AS core | Databases: concepts, database management systems, data definition language and data manipulation language, SQL | `database-management-systems` |
| AS core | Algorithm design and problem-solving: computational thinking skills, identifiers, assignment, constants, variables, data types, pseudocode, flowcharts, trace tables | `algorithms` |

### Cambridge International AS & A Level Computer Science 9618, 2026 syllabus (cambridgeinternational.org/Images/697372-2026-syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| AS programming | Data types and structures: data types and records, arrays, files, introduction to abstract data types | `data-structures` |
| AS programming | Programming: programming basics, constructs, structured programming | `programming-languages-paradigms` |
| AS programming | Software development: program development life cycle, program design, program testing and maintenance, debugging | `software-engineering` |

### Cambridge International AS & A Level Computer Science 9618, 2026 syllabus (cambridgeinternational.org/Images/697372-2026-syllabus.pdf)

| section | topic line | routed book |
| --- | --- | --- |
| A2 core | User-defined data types: records, unions, enumerations | `programming-languages-paradigms` |
| A2 core | File organisation and access methods | `operating-systems` |
| A2 core | Floating-point numbers: representation and manipulation | `digital-logic-design` |
| A2 core | Communication and internet technologies: protocols, circuit switching, packet switching | `computer-networks` |
| A2 core | Hardware and virtual machines: processors, parallel processing and virtual machines | `computer-organization-architecture` |
| A2 core | Boolean algebra and logic circuits | `digital-logic-design` |
| A2 core | The purposes of an operating system | `operating-systems` |
| A2 core | Translation software: assembler, compiler, interpreter | `compiler-design` |
| A2 core | Security: encryption, encryption protocols and digital certificates | `cryptography` |
| A2 core | Artificial intelligence | `artificial-intelligence` |
| A2 core | Computational thinking and problem-solving: algorithms, recursion | `algorithms` |
| A2 core | Further programming: programming paradigms | `programming-languages-paradigms` |
| A2 core | File processing and exception handling | `python-programming` |

### AP Computer Science A (apcentral.collegeboard.org — the four-unit CED)

| section | topic line | routed book |
| --- | --- | --- |
| Units | Using objects and methods: objects, classes, methods, strings, boolean expressions | `java-programming` |
| Units | Selection and iteration: if statements, loops, iteration | `java-programming` |
| Units | Class creation: writing classes, constructors, methods, static, encapsulation, inheritance, polymorphism | `java-programming` |
| Units | Data collections: arrays, ArrayList, 2D arrays, searching and sorting algorithms, algorithm analysis, recursion | `java-programming` |
| Units | Use computers responsibly: ethical and social implications | `cybersecurity` |

## What the pass shipped (the honest fix log)

**Planning-level growth only — zero lesson authoring.** The CS shelf moved
from 363 chapters / 1,146 planned lessons to **364 / 1,218** (Cybersecurity
gained a chapter — the societal layer; ~70 planned lessons added or renamed
across 26 books; the Mathematics shelf's Abstract Algebra and Number Theory
gained one lesson/one rename for the GATE/UGC/IOI algebra-and-parity lines).
Per book:

- **algorithms** (+5): computational thinking, pseudocode/flowcharts/trace
  tables, the number-theoretic toolkit (Euclid, sieve, fast exponentiation),
  polynomial arithmetic + FFT, geometric algorithms (convex hull, sweep,
  cross products); the Big-Oh lesson renamed to asymptotic notation.
- **computer-graphics** (+4): the display-hardware census (raster/random
  scan, monitors, input devices), line drawing (DDA, Bresenham), midpoint
  circle/ellipse, region fill (scan-line, boundary, flood).
- **computer-networks** (+4 + 2 renames): the topology/device census
  (LAN/MAN/WAN, modem to gateway), the mail and name census (SMTP, POP, IMAP,
  FTP, TELNET, URL, DNS resolution), the wireless-beyond-WiFi census
  (Bluetooth, satellites, ad hoc, geolocation), transmission modes and
  encoding; cellular → GSM/CDMA, media census named by medium.
- **artificial-intelligence** (+7): the Turing test, many agents (semantic
  web, ontology sharing), the genetic-algorithm cycle (encoding, operators,
  fitness), the GOFAI census (semantic networks, frames, scripts),
  expert systems, the planning zoo (goal stack, hierarchical, partial order),
  fuzzy sets (membership, fuzzification, inference).
- **database-management-systems** (+7): the three-schema architecture and
  data independence, the enhanced-model census (temporal, deductive,
  spatial), relational calculus (tuple and domain), Codd's twelve rules,
  DDL/DML by name, the MySQL function census, stored procedures/triggers/
  SQL injection.
- **computer-organization-architecture** (+5): IEEE 754 floating-point
  arithmetic, associative memory, the levels census (main/auxiliary/cache/
  virtual), asynchronous and serial data transfer, vector and array
  processors (with arbitration and multicore).
- **operating-systems** (+3): the system-call lesson named, thread
  libraries/implicit threading + IPC, the Windows practice pole (registry,
  NTFS, terminal services).
- **software-engineering** (+6): McCall/ISO 9126 quality models, the named
  testing families (basis path, regression, stress, alpha/beta), the
  debugging craft, estimation at depth (LOC, FP, COCOMO), scheduling/
  staffing/timeline charts, the risk census (RMMM).
- **cybersecurity** (new chapter 8 "The Societal Layer", +6 in ch. 5): digital
  footprint and cyberbullying, intellectual property (ownership, licensing,
  FOSS, creative commons), cybercrime and the Indian IT Act, e-waste and
  digital ethics; the attack census named (DoS, snooping, eavesdropping,
  spam/adware), the malware taxonomy named (viruses, worms, trojans), the
  perimeter (firewalls, antivirus, VPNs).
- **python-programming** (+4): the exception family (try/except/else/finally,
  raising, user-defined classes), files (text, binary, pickle), stacks and
  queues the Python way.
- **data-science** (+3): the tooling census (NumPy, pandas Series/DataFrames,
  Jupyter), Matplotlib at work (line/bar/histogram/pie/scatter), the
  descriptive census (mean, median, spread, quartiles).
- **theory-of-computation** (+3): grammars in BNF, Post's Correspondence +
  Rice's theorem, the diagonal argument (Cantor, Russell).
- **digital-logic-design** (+3): floating-point representation, error
  detection and correction (parity, Hamming), multiplication and division
  (shift-and-add, Booth).
- **data-structures** (+2 + 3 renames): the threaded binary tree, external
  B/B+/B* balance; the stack/queue lessons renamed to carry
  LIFO/PUSH/POP, FIFO/deque and infix/prefix/postfix.
- **data-mining** (+3): the OLAP/OLTP warehouse register, the named
  alternatives census (SVM, K-nearest neighbour, regression), link/
  sequencing/social-network analysis.
- **java-programming** (+3): selection and iteration, 2D arrays, searching/
  sorting/recursion in Java (the AP CS A units).
- and one-to-three-lesson growth in: compiler-design (language translators),
  assembly-and-microprocessors (linking/loading/relocation), programming-
  languages-paradigms (user-defined types, structured programming),
  frontend-engineering (websites/webpages/hosting/browsers/cookies),
  big-data-engineering (the NoSQL census), parallel-computing (parallel
  merge/search), object-oriented-programming (single/multiple inheritance),
  cryptography (steganography; secret-key/public-key named), cloud-computing
  (resource management and the SLA), computer-fundamentals (numbering
  systems, multimedia compression), and the Mathematics shelf's
  abstract-algebra (monoids and semigroups) + number-theory (parity named).

**Curatorial notes (honesty ledger)**: the matcher's ALIAS table is curated
genuine synonyms only (asymptotic ↔ Big-Oh, secret-key ↔ symmetric,
GSM/CDMA ↔ the cellular census, ArrayList ↔ the collections census,
BNF ↔ grammar notation, LIFO → PUSH/POP …); the routing table records
the cross-shelf homes honestly (GATE's monoids/groups → Abstract Algebra,
UGC's Bayes line → Probability Theory, IOI's school-arithmetic lines →
the mathematics shelf, A-Level's floating-point representation → Digital
Logic Design with its arithmetic in COA). Every topic line above ends the
pass COVERED in its routed book — the numbers are re-computed by
`scripts/verify-cs-exam-coverage.ts` on every run.

## Standing obligations re-verified

- `verify-cs-shelf-planning.ts` re-pins the shelf census at 364 chapters /
  1,218 planned lessons (grown from 363/1,146 by this pass).
- The IOI ✓/✘ category census is recorded honestly: the IOI syllabus's
  explicitly EXCLUDED topics (NP-hardness proofs, suffix data structures,
  FFT beyond polynomial arithmetic, 3-D geometry …) are not claimed as
  shelf coverage; the ledger routes only the ✓-category lines.
- The IB legacy-vs-2027 duality is recorded honestly (both the new themes
  and the legacy options are routed; the shelf serves both).
- This pass planned NOTHING into lesson content: the authoring cadence is
  unchanged (run 107 still opens AA 3.3 per the standing pointer).
