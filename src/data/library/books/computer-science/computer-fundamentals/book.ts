import type { Book, Chapter } from '../../../types'
import { chapter01 } from './ch-01'
import { chapter02 } from './ch-02'
import { chapter3 } from './ch-03'
import { chapter4 } from './ch-04'
import { chapter5 } from './ch-05'
import { chapter6 } from './ch-06'

/**
 * Computer Fundamentals — the first book of the Computer Science shelf
 * (the shelf's own 'Foundation Mathematics').
 *
 * STATUS: chapters 1-6 COMPLETE (26 written lessons: ch.1 4 lessons, ch.2 4,
 * ch.3 8, ch.4 5, ch.5 4 by CS RUN 10, ch.6 4 by CS RUN 11 — 6.1 'The
 * Network Idea', 6.2 'The Internet: a Network of Networks', 6.3 'Browsing
 * the Web: the Citizen's Vocabulary' + the 6.R review, the whole-chapter
 * cadence honored in ONE first-wave swarm, 2026-11-28), chapters 7-8
 * planned (6 planned body lessons + their unit reviews). */
const chapters: Chapter[] = [
  chapter01,
  chapter02,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
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
