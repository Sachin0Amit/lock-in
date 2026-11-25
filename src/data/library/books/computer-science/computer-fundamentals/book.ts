import type { Book, Chapter } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter3 } from './ch-03'
import { chapter4 } from './ch-04'

/**
 * Computer Fundamentals — the first book of the Computer Science shelf
 * (the shelf's own 'Foundation Mathematics').
 *
 * STATUS: IN-PROGRESS — chapter 1 COMPLETE (4 written lessons: 1.1 +
 * 1.2 by the CS RUN 1 SWARM, 1.3 + the 1.R unit completion review by
 * the CS RUN 2 SWARM), chapter 2 COMPLETE (2.1 'Input Devices: the
 * Human Handshake' + 2.2 'Output Devices: Screens, Printers and
 * Sound' by the CS RUN 3 SWARM, 2026-11-23; 2.3 'Interacting Well:
 * the First Usability Instincts' + the 2.R 'Unit 2 Completion Review'
 * by the CS RUN 4 SWARM, 2026-11-24 — the whole-chapter cadence, the
 * chapter closed COMPLETE in one fire), chapter 3 COMPLETE (3.2 +
 * 3.6 + 3.7 by the CS RUN 5 SWARM, 3.1 + 3.3 + 3.4 + 3.5 + 3.8 + the
 * 3.R review by the CS RUN 6 SWARM, 2026-11-25 — engines green before
 * prose in every seat), chapter 4 OPENED IN-PROGRESS (CS RUN 7,
 * 2026-11-25: 4.3 'The First Memory Hierarchy' + 4.4 'Buses and
 * Ports: How the Pieces Talk' + the 4.R review shipped whole by the
 * swarm under the time-budget law; 4.1 'The Motherboard: the City
 * Plan' and 4.2 'The Processor Named Honestly' deferred to CS RUN 8
 * with their wip preserved TRACKED in docs/research/cf-ch04-wip/),
 * chapters 5–8 planned (the remaining 15 planned lessons + the two
 * deferred ch.4 titles). */
const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter3,
  chapter4,
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
