import type { Book, Chapter } from '../../../types'

/**
 * Operating Systems — the ninth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 10 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `os-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): COA owns the machine; this book
 * owns the machine's manager. The Java-side of concurrency (JCiP) belongs
 * to Java Programming (cross-reference); distributed coordination belongs
 * to Distributed Systems; Linux systems-programming craft is this book's
 * practice pole (TLPI) with its own arc inside.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Silberschatz OSC 10e (cs-02 —
 *   the 21-chapter roster from the extracted preface map), How Linux
 *   Works 3e (cs-21 — the superuser tour, publisher TOC web-checked
 *   against the extraction), TLPI (cs-28 — the 65-chapter systems
 *   programming catalog).
 * - Web-checked 2026-11-15: GATE CSE Section 8 — processes, threads,
 *   CPU scheduling, synchronization, deadlock, memory management (paging
 *   and virtual memory), file systems — the chapters 2-7 roster exactly.
 * - Exam types: GATE numerical + MCQ (scheduling tables, banker's
 *   algorithm, page-fault arithmetic, fork counting) + OSC problem sets.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 5 lines audited — the system-call lesson renamed to carry the name, thread libraries/implicit threading added, and the Windows practice pole added. The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-an-operating-system-is',
    title: 'What an Operating System Is',
    summary:
      'The manager layer priced honestly: what it does for programs (the illusion of exclusive machine, files, endless memory), the system-call interface (kernel versus user mode as the boundary of trust — traps and the syscall census, what the shell actually does), the structures census (monolithic, micro, modular, hybrid) and the Linux tour — the system that boots, from firmware to init, as the live example.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Manager Layer and Its Illusions',
      'System Calls: Kernel versus User',
      'The Structures Census',
      'A Linux Boots: the Live Tour',
    ],
  },
  {
    number: 2,
    slug: 'processes-and-threads',
    title: 'Processes and Threads',
    summary:
      'The program in motion: the process concept and its PCB, states and transitions (the diagram priced on real traces), the fork/exec discipline of creation, threads as address-space sharing (their own stacks and registers — multicore programming priced, the multithreading models with thread libraries and implicit threading named, interprocess communication\u2019s census — pipes, shared memory, signals; Java\u2019s concurrency craft cross-referenced), and the practical census — TLPI\u2019s processes and Linux\u2019s /proc window.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Process Concept and Its State Diagram',
      'Fork and Exec: Creation the Unix Way',
      'Threads: Sharing the Address Space',
      'Thread Libraries, Implicit Threading and IPC',
    ],
  },
  {
    number: 3,
    slug: 'cpu-scheduling',
    title: 'CPU Scheduling',
    summary:
      'The queue discipline: scheduling criteria (turnaround, waiting, response — defined honestly), the algorithm census (FCFS, SJF, priority, round-robin with their Gantt-trace arithmetic), the preemptive question, multilevel queues and feedback, and the real-time echo with Linux\u2019s actual scheduler named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Criteria, Defined Honestly',
      'The Algorithm Census with Gantt Arithmetic',
      'Multilevel Feedback and the Linux Reality',
    ],
  },
  {
    number: 4,
    slug: 'synchronization',
    title: 'Synchronization',
    summary:
      'The race problem priced on a real counter (the interleaving census computed), the critical-section requirement (mutual exclusion, progress, bounded waiting), locks and semaphores (their waits traced), monitors and condition variables as the structured discipline, and the classic problems solved honestly — producer-consumer, readers-writers, the dining philosophers.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Race Problem, Computed',
      'Semaphores and Locks Traced',
      'Monitors: the Structured Discipline',
      'The Classic Problems, Solved Honestly',
    ],
  },
  {
    number: 5,
    slug: 'deadlocks',
    title: 'Deadlocks',
    summary:
      'The system that stops: the four conditions derived (why each is necessary), the resource-allocation graph as the diagnostic picture, prevention and avoidance (the Banker\u2019s algorithm worked honestly through its tables), detection and recovery, and starvation\u2019s separate disease named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Four Conditions, Derived',
      'The Banker\u2019s Algorithm, Worked',
      'Detection and Recovery',
    ],
  },
  {
    number: 6,
    slug: 'memory-management',
    title: 'Memory Management',
    summary:
      'The illusion of endless memory: contiguous allocation and its fragmentation disease, paging (the address translation walked through the MMU, TLB as the cache of translations), segmentation named, and virtual memory — demand paging, page-replacement census (FIFO, LRU, clock with fault-rate arithmetic), thrashing and working sets.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Contiguous Allocation and Its Disease',
      'Paging: the Translation Walked',
      'Virtual Memory and the Replacement Census',
      'Thrashing and Working Sets',
    ],
  },
  {
    number: 7,
    slug: 'file-systems-and-io',
    title: 'File Systems and I/O',
    summary:
      'The durable half of the manager: files and their metadata (the inode census), directory structures, allocation methods (contiguous, linked, indexed — the FAT/ext echo), the page cache and the write path, disk scheduling\u2019s small census, and the file-system implementation trilogy journaling pays for.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Files, Metadata and the Inode Census',
      'Allocation Methods and Directories',
      'The Write Path and Disk Scheduling',
    ],
  },
  {
    number: 8,
    slug: 'the-linux-practice-pole',
    title: 'The Linux Practice Pole',
    summary:
      'The manager touched by hand (the How-Linux-Works/TLPI arc): the command line and the directory hierarchy, devices as files, the signals discipline and IPC census (pipes, FIFOs, sockets — the local family), the shell as the user\u2019s lever into the kernel\u2019s services, and the other pole the syllabi name — Windows\u2019s design principles and system components (the registry, NTFS, terminal services and fast user switching, its networking stack) priced as the same discipline in a different dress.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hierarchy and the Shell Lever',
      'Devices as Files',
      'Signals and the Local IPC Census',
      'The Windows Pole: Registry, NTFS, Terminal Services',
    ],
  },
  {
    number: 9,
    slug: 'protection-security-and-vms',
    title: 'Protection, Security and Virtual Machines',
    summary:
      'The manager as guard: protection domains and access matrices, the security mechanism census (the Cybersecurity cross-reference declared), and virtual machines as the manager managed (hypervisors and the container census — the modern deployment echo handed to Cloud Computing).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Protection Domains and Access Matrices',
      'The Security Mechanism Census',
      'Virtual Machines: the Manager Managed',
    ],
  },
  {
    number: 10,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The manager on one page (from boot to file with the mechanisms beside), the craft census (Gantt traces, banker\u2019s tables, fault arithmetic at gate-exam level), and the doorsteps — Distributed Systems networks the managers, Cloud Computing rents them at scale, and the case studies (Linux itself, named) continue on the Drive.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Manager on One Page',
      'The Craft Census',
      'The Doorsteps: Distributed and Cloud',
    ],
  },
]

export const operatingSystems: Book = {
  id: 'operating-systems',
  title: 'Operating Systems',
  subtitle: 'The manager layer — processes, memory, files and the machine\u2019s illusions',
  discipline: 'computer-science',
  level: 'First OS course → the systems-programmer doorstep',
  description:
    'The CS shelf\u2019s manager-theory home on three poles (Silberschatz theory, How Linux Works practice, TLPI systems programming). What an OS is and its trust boundary; processes and threads with fork/exec; CPU scheduling with Gantt arithmetic and multilevel feedback; synchronization — races computed, semaphores traced, monitors and the classic problems solved; deadlocks with the Banker\u2019s algorithm worked; memory from contiguous allocation through paging to virtual memory and the replacement census with thrashing; file systems and I/O with the inode and write paths; the Linux practice pole — hierarchy, devices, signals and IPC; protection, security and virtual machines; and the synthesis map. Cross-references Computer Organization and Architecture (the machine beneath) and Java Programming\u2019s concurrency craft; hands off to Distributed Systems and Cloud Computing.',
  status: 'planned',
  accent: ['#0369a1', '#075985'],
  chapters,
}
