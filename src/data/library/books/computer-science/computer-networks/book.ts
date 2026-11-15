import type { Book, Chapter } from '../../../types'

/**
 * Computer Networks — the eleventh book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 30 planned lessons, zero written. Lesson ids will use the `net-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): the physical-layer physics
 * (Fourier, bandwidth) is priced here only as needed — the Mathematics
 * shelf owns the Fourier theory (cross-reference). Cybersecurity owns the
 * attack/defense arc; Cryptography owns the ciphers; Distributed Systems
 * owns the agreement problem above the transport layer.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Kurose & Ross 8e (cs-06 —
 *   the top-down arc, ch. 1 extracted in full) + Tanenbaum 5e (cs-07 —
 *   the bottom-up arc, 323 section-level lines extracted). Two poles,
 *   one book.
 * - Web-checked 2026-11-15: GATE CSE Section 10 — the layered
 *   architecture, TCP/UDP, the IP and routing census, application
 *   protocols — the chapters 3-6 roster exactly.
 * - Exam types: GATE numerical + MCQ (throughput/delay window arithmetic,
 *   subnetting, congestion windows) + socket programming sets.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-network-and-the-internet',
    title: 'The Network and the Internet',
    summary:
      'What the Internet is two ways — the nuts-and-bolts census (hosts, routers, links, ISPs) and the services description (applications riding the plumbing), protocols as the contracts, the edge (access networks, physical media), the core (packet versus circuit switching priced), and delay/loss/throughput as the honest arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Internet Two Ways',
      'The Edge, the Core and the Switching Trade',
      'Delay, Loss and Throughput: the Arithmetic',
    ],
  },
  {
    number: 2,
    slug: 'layered-architectures',
    title: 'Layered Architectures',
    summary:
      'Why layers win (the encapsulation discipline — each layer\u2019s contract priced on a real packet\u2019s journey), the OSI and TCP/IP reference models compared honestly (the critiques included), the service/protocol distinction defined, and the application layer\u2019s census — HTTP, email, DNS and the CDN/video echo.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Layers Win: Encapsulation',
      'OSI versus TCP/IP, Honestly',
      'The Application Census: HTTP, DNS, Email',
    ],
  },
  {
    number: 3,
    slug: 'transport-tcp-and-udp',
    title: 'Transport: TCP and UDP',
    summary:
      'The end-to-end contracts: multiplexing and ports, UDP\u2019s honest minimalism (when it is right), the principles of reliable data transfer derived from scratch (ACKs, timeouts, windows — rdt built up layer by layer), TCP itself (connection setup, the sliding-window discipline, congestion control\u2019s AIMD arithmetic traced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'UDP\u2019s Honest Minimalism',
      'Reliable Transfer Derived from Scratch',
      'TCP: Connection, Windows, Congestion',
    ],
  },
  {
    number: 4,
    slug: 'the-network-layer',
    title: 'The Network Layer',
    summary:
      'The datagram\u2019s world: the data plane (routers\u2019 forwarding versus the control plane\u2019s routing), IP addressing with subnetting as the arithmetic discipline, DHCP/NAT/ICMP\u2019s census, the routing algorithms (link-state and distance-vector derived with their convergence honesty), and the BGP/SDP echo — BGP and SDN named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Forwarding versus Routing',
      'IP Addressing and Subnetting Arithmetic',
      'Routing Algorithms Derived',
      'BGP and SDN, Named',
    ],
  },
  {
    number: 5,
    slug: 'the-link-layer',
    title: 'The Link Layer',
    summary:
      'The local hop: the services census (framing, error detection with CRC\u2019s arithmetic, MAC), the multiple-access discipline (CSMA and collision handling), Ethernet and its switched world (the ARP bridge), VLANs, and the datacenter echo where the modern switch census lives.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Services Census and CRC',
      'Multiple Access: CSMA Discipline',
      'Ethernet, Switches and ARP',
    ],
  },
  {
    number: 6,
    slug: 'wireless-and-mobile',
    title: 'Wireless and Mobile',
    summary:
      'The airwaves\u2019 discipline: the wireless propagation problem (attenuation, interference — honest physics), the WiFi family (802.11\u2019s MAC and its collision-avoidance difference), the cellular census (the generations honestly), and the mobility question — handover and the routing echo.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Propagation Problem',
      'The WiFi Family',
      'The Cellular Census',
      'Mobility: Handover Named',
    ],
  },
  {
    number: 7,
    slug: 'sockets-and-programming',
    title: 'Sockets and Programming',
    summary:
      'The hands-on half: the socket abstraction (TCP and UDP variants), client-server craft written honestly, and the measurement discipline — wireshark-style tracing as the reader\u2019s microscope (the protocol stack observed, not just believed).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Socket Abstraction',
      'Client-Server Craft',
      'The Trace Discipline: Observing the Stack',
    ],
  },
  {
    number: 8,
    slug: 'the-physical-foundations',
    title: 'The Physical Foundations',
    summary:
      'The bottom of the stack: bandwidth-limited signals (Fourier named with the Mathematics cross-reference), the channel-capacity question (Nyquist and Shannon\u2019s law priced), guided media (twisted pair, coax, fiber), wireless\u2019 spectrum, and modulation/multiplexing as the census (FDM/TDM/CDM).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Bandwidth-Limited Signals',
      'Nyquist and Shannon Priced',
      'The Media Census and Multiplexing',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The stack on one page (from bit to browser with the contracts beside), the craft census (delay/window arithmetic, subnetting, CSMA questions at gate-exam level), and the doorsteps — Cybersecurity and Cryptography take the attacks, Distributed Systems takes the agreement above the transport, Computer Networks\u2019 own frontier (QoS, the modern datacenter fabric) named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stack on One Page',
      'The Craft Census',
      'The Doorsteps: Attacks, Agreement, the Fabric',
    ],
  },
]

export const computerNetworks: Book = {
  id: 'computer-networks',
  title: 'Computer Networks',
  subtitle: 'From bit to browser — the layered contracts that carry the world',
  discipline: 'computer-science',
  level: 'First networking course → the datacenter-fabric doorstep',
  description:
    'The two-pole networks home (Kurose top-down, Tanenbaum bottom-up). The Internet two ways with the switching trade and delay/loss/throughput arithmetic; layered architectures with the honest OSI/TCP-IP comparison and the application census (HTTP, DNS, email); transport — UDP\u2019s minimalism, reliable transfer derived from scratch, TCP\u2019s windows and AIMD congestion traced; the network layer — forwarding versus routing, subnetting arithmetic, link-state/distance-vector derived, BGP and SDN named; the link layer — CRC, CSMA, Ethernet, switches and ARP; wireless and mobile with the cellular census; sockets and the trace discipline; and the physical foundations (Nyquist and Shannon priced, the media census). Cross-references the Mathematics shelf\u2019s Fourier theory; hands off to Cybersecurity, Cryptography and Distributed Systems.',
  status: 'planned',
  accent: ['#0891b2', '#0e7490'],
  chapters,
}
