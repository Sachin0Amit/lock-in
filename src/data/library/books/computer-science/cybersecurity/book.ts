import type { Book, Chapter } from '../../../types'

/**
 * Cybersecurity — the twenty-sixth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 31 planned lessons, zero written. Lesson ids will use the `sec-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Cryptography owns the cipher
 * mathematics; Computer Networks owns the protocols being attacked;
 * Operating Systems owns the protection mechanisms — this book owns the
 * security discipline that composes them (threat → mechanism → assurance).
 * Blockchain owns the trust application; the cloud chapter hands back.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Stallings security text on
 *   the Drive (honest note — the Drive\u2019s Stallings titles are COA and
 *   Cryptography and Network Security).
 * - Web-checked 2026-11-15: Stallings & Brown, 'Computer Security:
 *   Principles and Practice' 4e (Pearson\u2019s TOC — the overview, the
 *   cryptographic-tools chapter\u2019s application view, user authentication,
 *   OS/DB/cloud security, network security, the assessment/models family,
 *   administration/incident response, legal/ethics).
 * - Syllabus audit: the standard university security course registers.
 * - Exam types: scenario analysis (choose the control) + threat-model
 *   questions.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the CUET 308 B1/B2 + A-Level/AP ethics lines audited — the societal layer added as chapter 8 (digital footprint, IPR/FOSS, cybercrime laws and the Indian IT Act, e-waste) with the perimeter and named-attack lessons grown into chapter 5. The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-security-discipline',
    title: 'The Security Discipline',
    summary:
      'The CIA triad priced honestly (confidentiality, integrity, availability — plus authenticity/accountability named), the threat/attack/vulnerability vocabulary made precise, risk as the measuring discipline (impact × likelihood, priced on a real asset census), and the security strategy\u2019s layers (prevention, detection, recovery — never one wall).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The CIA Triad Priced',
      'Risk as the Measuring Discipline',
      'The Layered Strategy',
    ],
  },
  {
    number: 2,
    slug: 'cryptographic-tools-in-service',
    title: 'Cryptographic Tools in Service',
    summary:
      'The application view of the ciphers (Cryptography\u2019s mathematics cross-referenced): symmetric and public-key encryption as controls, the hash/MAC family as integrity\u2019s guarantee, the key-management discipline (the lifecycle honest census), and the digital-signature contract — each priced on the attack it stops.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Encryption as a Control',
      'The Hash/MAC Guarantee',
      'Key Management\u2019s Lifecycle',
    ],
  },
  {
    number: 3,
    slug: 'authentication-and-access-control',
    title: 'Authentication and Access Control',
    summary:
      'Who may enter and what they may do: the authentication census (something you know/have/are — passwords\u2019 storage discipline hashed and salted, tokens, biometrics priced honestly), authorization\u2019s models (DAC, MAC, RBAC — the lattice echo), and the classic model questions priced on a real system\u2019s matrix.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Authentication Census',
      'The Authorization Models',
      'The Access Matrix Priced',
    ],
  },
  {
    number: 4,
    slug: 'software-and-web-attacks',
    title: 'Software and Web Attacks',
    summary:
      'The application layer\u2019s disease census: injection\u2019s family (SQL and command injection traced to the unvalidated boundary), XSS\u2019s three faces priced on payload delivery, CSRF\u2019s confused-deputy mechanism, the memory-safety census (buffer overflows\u2019 control-flow hijack — the C cross-reference), and the mitigation discipline (validation, parameterization, the same-site contract).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Injection\u2019s Family Traced',
      'XSS\u2019s Three Faces',
      'CSRF\u2019s Confused Deputy',
      'The Mitigation Discipline',
    ],
  },
  {
    number: 5,
    slug: 'network-and-system-attacks',
    title: 'Network and System Attacks',
    summary:
      'The infrastructure\u2019s census: the reconnaissance-to-exploit kill chain traced, the network attacks family (denial of service and its distributed amplification priced, snooping and eavesdropping, the intrusion question, the ARP/DNS spoofing census, the spam/adware nuisance roster — Computer Networks cross-referenced), malware\u2019s census (the propagation and payload taxonomy: viruses, worms, trojan horses and ransomware named), social engineering\u2019s discipline (phishing priced as the human channel), and the perimeter\u2019s honest answer (firewalls, antivirus and the VPN tunnel — the classic controls priced with their limits).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Kill Chain Traced',
      'The Network Attack Census: DoS, Snooping, Eavesdropping',
      'Malware\u2019s Taxonomy: Viruses, Worms, Trojans',
      'Phishing: the Human Channel',
      'The Perimeter: Firewalls, Antivirus and VPNs',
    ],
  },
  {
    number: 6,
    slug: 'operating-system-and-database-security',
    title: 'OS, Database and Cloud Security',
    summary:
      'The platforms\u2019 own guards: OS security\u2019s mechanisms (the memory-isolation census, the trusted-computing echo — Operating Systems cross-referenced), database security\u2019s discipline (inference named, the access-control and audit craft), and the cloud\u2019s shared-responsibility audit (the tenant\u2019s side priced on real misconfiguration cases).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The OS Mechanisms Census',
      'Database Inference, Named',
      'The Tenant\u2019s Audit',
    ],
  },
  {
    number: 7,
    slug: 'assurance-and-incident-response',
    title: 'Assurance and Incident Response',
    summary:
      'Proving and recovering: the audit-log discipline (evidence engineering), penetration testing\u2019s craft (the scoped engagement, the report that names fixes), the incident-response lifecycle (the phases traced through a real breach case), and the digital-forensics echo named with the chain-of-custody discipline.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Audit-Log Discipline',
      'The Incident Lifecycle Traced',
      'The Forensics Echo',
    ],
  },
  {
    number: 8,
    slug: 'the-societal-layer',
    title: 'The Societal Layer',
    summary:
      'The citizen\u2019s half of the discipline (the CUET/A-Level/AP ethics census): the digital footprint and etiquette question (net-surfing and social-media conduct, cyberbullying and its response), intellectual property (ownership, plagiarism, licensing and copyright, FOSS and the creative commons), cybercrime and the laws that answer it (hacking, phishing and the Indian IT Act\u2019s register), digital ethics and responsible use, and the physical estate\u2019s cost (e-waste hazards and management, the health and ergonomic questions of technology use).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Digital Footprint: Etiquette and Cyberbullying',
      'Intellectual Property: Ownership, Licensing, FOSS, Creative Commons',
      'Cybercrime and the Laws: the Indian IT Act',
      'E-Waste, Health and Digital Ethics',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The discipline on one page (triad → controls → attacks → platforms → assurance with the layers beside), the craft census (choose-the-control scenarios, threat-model questions at exam level), and the doorsteps — Cryptography\u2019s mathematics, Blockchain\u2019s trust ledger, and the security research frontier named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Discipline on One Page',
      'The Craft Census',
      'The Doorsteps: Mathematics and Trust',
    ],
  },
]

export const cybersecurity: Book = {
  id: 'cybersecurity',
  title: 'Cybersecurity',
  subtitle: 'Threat, mechanism and assurance — the defense discipline priced on real attacks',
  discipline: 'computer-science',
  level: 'First security course → the security-engineering doorstep',
  description:
    'The defense home on the Stallings-Brown arc. The CIA triad priced and risk as the measuring discipline; cryptographic tools in service (the application view of the ciphers with key management\u2019s lifecycle); authentication\u2019s census and the authorization models priced on a real access matrix; software and web attacks — injection traced, XSS\u2019s three faces, CSRF\u2019s confused deputy, the mitigation discipline; the network/system census — kill chain traced, DoS priced on amplification, malware\u2019s taxonomy, phishing as the human channel; OS/database/cloud security; assurance — audit logs, penetration testing\u2019s craft, the incident lifecycle traced through a real breach; and the discipline map. Cross-references Cryptography (the mathematics), Computer Networks, Operating Systems and Cloud Computing; hands off to Blockchain\u2019s trust ledger.',
  status: 'planned',
  accent: ['#dc2626', '#991b1b'],
  chapters,
}
