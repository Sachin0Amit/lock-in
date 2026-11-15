import type { Book, Chapter } from '../../../types'

/**
 * Cryptography — the twenty-seventh book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 9 chapters /
 * 28 planned lessons, zero written. Lesson ids will use the `crypt-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Theory of Computation owns the
 * complexity theory the hardness assumptions stand on (cross-referenced);
 * the Mathematics shelf's Number Theory owns the modular arithmetic
 * machine (used fluently, re-taught never); Cybersecurity owns the
 * applied-defense census; Blockchain owns the ledger application.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): Stallings\u2019 'Cryptography
 *   and Network Security' is on the Drive\u2019s root census (recorded in
 *   the math shelf\u2019s era) — not re-downloaded for this planning pass;
 *   the applied spine here is Paar/Pelzl.
 * - Web-checked 2026-11-15: Paar & Pelzl, 'Understanding Cryptography'
 *   (Springer TOC — stream ciphers, DES, AES, block-cipher operation
 *   modes, public-key intro, RSA, Diffie-Hellman/ElGamal, elliptic
 *   curves, digital signatures, hashes and message authentication, the
 *   implementation chapter) + Katz & Lindell named for the theory pole.
 * - Exam types: worked computations (RSA keygen/encrypt, ECC point
 *   arithmetic) + protocol-tracing questions.
 * - EXAM-TOPIC COVERAGE PASS (2026-11-15, owner directive: "make sure
 *   those exams topics are to be covered in the books see if any topics
 *   is missing in cs books"): the UGC NET CS&A Unit 9 security line audited — steganography named and the two-worlds lesson renamed to secret-key/public-key. The routing/verdict record is
 *   docs/research/CS_EXAM_TOPIC_LEDGER.md; the standing gate is
 *   scripts/verify-cs-exam-coverage.ts.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-cryptographic-contract',
    title: 'The Cryptographic Contract',
    summary:
      'The field\u2019s honest rules: symmetric versus asymmetric as the two worlds (secret-key and public-key as the syllabi name them), steganography named as the third road — hiding rather than encrypting (with the watermarking echo), Kerckhoffs\u2019 principle priced (the system\u2019s secrecy lives only in the key), the key-space arithmetic (the numbers made real), and the attack taxonomy (brute force, analytical, the side-channel echo named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Worlds: Secret-Key and Public-Key',
      'Steganography: Hiding rather than Encrypting',
      'Kerckhoffs Priced',
      'The Key-Space Arithmetic',
    ],
  },
  {
    number: 2,
    slug: 'stream-ciphers-and-randomness',
    title: 'Stream Ciphers and Randomness',
    summary:
      'The one-time pad\u2019s perfection and its impracticality (the key-distribution honesty), the pseudorandom generator\u2019s discipline (the keystream contract — the LFSR census priced on its predictability disease), stream ciphers in practice (the design lessons), and the true-randomness question honestly separated.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The One-Time Pad\u2019s Perfection and Price',
      'The Keystream Contract',
      'The LFSR Predictability Disease',
    ],
  },
  {
    number: 3,
    slug: 'the-des-story-and-aes',
    title: 'The DES Story and AES',
    summary:
      'The block-cipher craft from history\u2019s best case study: DES\u2019s architecture traced (Feistel\u2019s network, the rounds\u2019 confusion/diffusion discipline, the S-box craft), its key-length death priced on real cryptanalysis, and AES as the modern answer traced whole (the substitution/permutation layers, the state machine, the rounds census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'DES Traced: the Feistel Discipline',
      'The Key-Length Death',
      'AES Traced Whole',
    ],
  },
  {
    number: 4,
    slug: 'modes-and-integrity',
    title: 'Modes and Integrity',
    summary:
      'Blocks into messages: the operation-mode census (ECB\u2019s pattern disease demonstrated on real data — the penguin picture\u2019s lesson; CBC, CTR priced on parallelism and error behaviour, GCM named), the padding question\u2019s honesty (the oracle disease named), and the block length\u2019s birthday arithmetic.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'ECB\u2019s Pattern Disease Demonstrated',
      'CBC, CTR and GCM Priced',
      'The Padding Oracle, Named',
    ],
  },
  {
    number: 5,
    slug: 'hashes-and-macs',
    title: 'Hashes and MACs',
    summary:
      'The integrity engines: the hash contract (one-way, collision-resistant — the avalanche discipline), Merkle-Damlård\u2019s construction and the SHA family census, the birthday attack\u2019s arithmetic derived (the 2^(n/2) surprise), MACs as keyed integrity (HMAC traced), and the collision world\u2019s honest history (the broken-family census).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Hash Contract',
      'The Birthday Arithmetic Derived',
      'HMAC Traced',
    ],
  },
  {
    number: 6,
    slug: 'the-public-key-revolution',
    title: 'The Public-Key Revolution',
    summary:
      'The trapdoor idea: one-way functions\u2019 connection to the complexity theory (Theory of Computation cross-referenced), the Diffie-Hellman key exchange traced (the discrete-logarithm trapdoor — the mathematics used fluently, Number Theory cross-referenced), and ElGamal\u2019s census named with its randomness discipline.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Trapdoor Idea',
      'Diffie-Hellman Traced',
      'ElGamal\u2019s Randomness Discipline',
    ],
  },
  {
    number: 7,
    slug: 'rsa-and-elliptic-curves',
    title: 'RSA and Elliptic Curves',
    summary:
      'The two workhorses: RSA traced whole (key generation, encryption, decryption — a worked example computed honestly at small numbers, the factoring assumption priced), the implementation diseases (the timing and padding lessons named), and elliptic-curve cryptography\u2019s bet (the group law traced on points, the smaller-key advantage priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'RSA Computed Honestly',
      'The Implementation Diseases',
      'The Elliptic-Curve Bet',
    ],
  },
  {
    number: 8,
    slug: 'signatures-and-protocols',
    title: 'Signatures and Protocols',
    summary:
      'Non-repudiation and conversation: the digital-signature contract (the RSA and DSA/ECDSA census), certificates and the PKI discipline (the trust-chain architecture — the CA question priced honestly), the protocol census (the TLS handshake traced at concept level), and the key-establishment family census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Signature Contract',
      'The PKI Trust Chain',
      'TLS\u2019s Handshake Traced — the network-security protocol priced',
    ],
  },
  {
    number: 9,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The field on one page (secrecy and integrity\u2019s engines with the trapdoors beneath them), the craft census (RSA/ECC worked computations, protocol-tracing questions at exam level), and the doorsteps — Theory of Computation\u2019s hardness register, Quantum\u2019s named threat (the post-quantum census named honestly), and Blockchain\u2019s ledger application.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Field on One Page',
      'The Craft Census',
      'The Doorsteps: Hardness, the Quantum Threat, the Ledger',
    ],
  },
]

export const cryptography: Book = {
  id: 'cryptography',
  title: 'Cryptography',
  subtitle: 'The mathematics of trust — from the one-time pad\u2019s perfection to the elliptic bet',
  discipline: 'computer-science',
  level: 'First cryptography course → the protocol and post-quantum doorstep',
  description:
    'The cipher-mathematics home on the Paar-Pelzl arc. The cryptographic contract (Kerckhoffs priced, the key-space arithmetic made real); stream ciphers and randomness — the one-time pad\u2019s perfection and price, the LFSR predictability disease; the DES story and AES traced whole (Feistel\u2019s discipline, the key-length death, AES\u2019s layers); modes and integrity — ECB\u2019s pattern disease demonstrated, CBC/CTR/GCM priced, the padding oracle named; hashes and MACs with the birthday arithmetic derived and HMAC traced; the public-key revolution — the trapdoor idea, Diffie-Hellman traced; RSA computed honestly with the implementation diseases named and the elliptic-curve bet priced; signatures, PKI\u2019s trust chain and TLS\u2019s handshake traced; and the field map with the post-quantum census named. Cross-references Number Theory, Theory of Computation and Cybersecurity; hands off to Blockchain.',
  status: 'planned',
  accent: ['#7f1d1d', '#57534e'],
  chapters,
}
