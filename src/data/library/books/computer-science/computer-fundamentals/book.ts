import type { Book, Chapter } from '../../../types'
import { chapter01 } from './ch-01'

/**
 * Computer Fundamentals — the first book of the Computer Science shelf
 * (the shelf's own 'Foundation Mathematics').
 *
 * STATUS: IN-PROGRESS — chapter 1 COMPLETE (4 written lessons: 1.1 +
 * 1.2 by the CS RUN 1 SWARM, 1.3 + the 1.R unit completion review by
 * the CS RUN 2 SWARM — the cs cron job's first two honored fires,
 * 2026-11-21, two parallel authoring agents per fire), chapters 2–8
 * planned (the remaining 24 planned lessons), authoring on the
 * one-chapter-at-a-time cadence (CS RUN 3 opens chapter 2
 * 'Interacting with Your Computer'). Lesson ids use the `cf-` prefix
 * (verified unused across all existing lesson ids at the planning
 * pass; globally unique, stable forever).
 *
 * POSITIONING (no-duplication contract): the binary/codes chapter defers
 * the full number-systems theory to Arithmetic and Number Systems and the
 * gate-level view to Digital Logic Design (both named as doorsteps); this
 * book keeps only the first-meeting treatment. The network chapter hands
 * off to Computer Networks; the security chapter to Cybersecurity. It
 * cross-references the whole CS shelf as the zero-rung entry.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no dedicated fundamentals
 *   reference on the Drive (honest note) — web-researched.
 * - Web-checked 2026-11-15: Peter Norton, 'Introduction to Computers' 6e
 *   (ch. 1 Introducing Computer Systems; 2 Interacting with Your
 *   Computer; the software/storage/networks/security arcs) — the classic
 *   fundamentals arc.
 * - Syllabus audit: the CBSE/beginner computer-science arcs and the GATE
 *   CSE register's expectation of machine literacy before the core.
 * - Exam types: school/board descriptive + the aptitude-style reasoning
 *   found in banking/SSC computer-awareness papers.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the Cambridge 9618 + IOI lines audited — the numbering-systems and compression lessons added. The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  chapter01,
  {
    number: 2,
    slug: 'interacting-with-your-computer',
    title: 'Interacting with Your Computer',
    summary:
      'The human side of the machine: input devices (keyboards, pointing devices, scanners, cameras, microphones) and output devices (monitors and their panels, printers, speakers) with how each actually works, plus the first usability instincts — the chapter hands off to Human-Computer Interaction later on the shelf.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Input Devices: the Human Handshake',
      'Output Devices: Screens, Printers and Sound',
      'Interacting Well: the First Usability Instincts',
    ],
  },
  {
    number: 3,
    slug: 'data-representation-first-meeting',
    title: 'Data Representation: a First Meeting',
    summary:
      'Bits, the binary language, and why two symbols carry everything: the numbering systems census (binary, octal and hexadecimal with the conversion craft), codes (ASCII and its characters, BCD), measuring information (bit, byte, KB to the honest SI ladder), text, images and sound as bits (the multimedia ground), and compression as the packing question (lossless versus lossy — what images and audio actually give up). The full theory hands off to Arithmetic and Number Systems and Digital Logic Design.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bits: Why Two Symbols Carry Everything',
      'The Numbering Systems: Binary, Octal, Hexadecimal',
      'Codes: ASCII, Unicode and BCD',
      'Text, Images and Sound as Bits',
      'Compression: Lossless and Lossy',
      'Decimal to Binary Conversion',
      'Binary to Decimal Conversion',
      'Decimal and Binary Number System',
    ],
  },
  {
    number: 4,
    slug: 'inside-the-box',
    title: 'Inside the Box',
    summary:
      'The motherboard as a city plan, the processor named honestly (cores, clock, cache — the vocabulary without the architecture theory), the first memory hierarchy (RAM, ROM, the storage ladder from registers to the cloud), and how the pieces talk: buses and ports at the first-meeting level; Computer Organization and Architecture takes the theory door.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Motherboard: the City Plan',
      'The Processor Named Honestly',
      'The First Memory Hierarchy',
      'Buses and Ports: How the Pieces Talk',
    ],
  },
  {
    number: 5,
    slug: 'software-families',
    title: 'Software Families',
    summary:
      'System software versus application software priced on the reader\u2019s own machine: what an operating system visibly does (the manager layer — the full story is Operating Systems\u2019), utilities, productivity and creative families, and the practical craft of installing, updating and licensing software honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'System Software: the Manager Layer',
      'Application Software: the Worker Families',
      'Installing, Updating and Licensing Honestly',
    ],
  },
  {
    number: 6,
    slug: 'connecting-computers',
    title: 'Connecting Computers',
    summary:
      'The network idea at first-meeting level: why two machines want to talk, LANs and WANs, the Internet as a network of networks, the Web as one application riding it, and the vocabulary (IP, DNS, browsers) a citizen of the field must own — the theory hands off to Computer Networks.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Network Idea',
      'The Internet: a Network of Networks',
      'Browsing the Web: the Citizen\u2019s Vocabulary',
    ],
  },
  {
    number: 7,
    slug: 'files-and-your-digital-space',
    title: 'Files and Your Digital Space',
    summary:
      'The file abstraction: folders and the desktop metaphor, file formats and extensions as honest contracts, managing a digital workspace (naming, backup, versioning instincts), and compression as the everyday magic — with the deep file-system machinery handed off to Operating Systems and Databases.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'File Management: Files, Folders and the Desktop Metaphor',
      'File Formats: the Extension Contracts',
      'Managing and Protecting Your Digital Space',
    ],
  },
  {
    number: 8,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The closing synthesis: security basics every user must own (threats, passwords, backups — the theory lives in Cybersecurity), the computer in society (work, privacy, AI named honestly as the doorstep of the AI family), the whole-machine map from cycle to cloud, and the shelf\u2019s roadmap — which door opens next for this reader.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Security Basics for Every User',
      'The Computer in Society: an Honest Look',
      'The Whole-Machine Map and the Shelf Doorstep',
    ],
  },
]

export const computerFundamentals: Book = {
  id: 'computer-fundamentals',
  title: 'Computer Fundamentals',
  subtitle: 'The machine from zero — hardware, software and the vocabulary of computing',
  discipline: 'computer-science',
  level: 'Absolute beginner → comfortable computer literacy',
  description:
    'The zero-rung entry to the Computer Science shelf (its Foundation Mathematics). The information processing cycle priced on real machines; a census of hardware from desktops to embedded chips; interacting with computers — input and output devices and the first usability instincts; data representation as a first meeting (bits, codes, text/image/sound) that hands its theory to Arithmetic and Number Systems and Digital Logic Design; inside the box — motherboard, processor named honestly, the first memory hierarchy; the software families and the manager layer that Operating Systems will theorize; the network idea that Computer Networks takes over; files and digital space; and the synthesis with user-level security. Cross-references every core CS book as its doorstep; no prior knowledge assumed.',
  status: 'in-progress',
  accent: ['#0f766e', '#115e59'],
  chapters,
}
