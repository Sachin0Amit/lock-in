import type { Book, Chapter } from '../../../types'

/**
 * Blockchain — the thirty-ninth book of the Computer Science shelf.
 *
 * STATUS: PLANNED (CS full-shelf planning pass, 2026-11-15) — 7 chapters /
 * 22 planned lessons, zero written. Lesson ids will use the `bchain-`
 * prefix (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Cryptography owns the hash and
 * signature mathematics (cross-referenced, used fluently); Distributed
 * Systems owns the consensus theory (BFT named there) — this book owns
 * the ledger application that composes them; Computer Networks owns the
 * peer-to-peer substrate\u2019s theory.
 *
 * RESEARCH PHASE (2026-11-15):
 * - Drive (docs/research/CS_TOC_SURVEY.md): no Antonopoulos on the Drive
 *   (honest note).
 * - Web-checked 2026-11-15: Antonopoulos, 'Mastering Bitcoin' 2e (the
 *   O'Reilly TOC — 1 Introduction; 2 How Bitcoin Works; 3 Bitcoin
 *   Core; 4 Keys and Addresses; 5 Wallets; 6 Transactions; 7 Advanced
 *   Transactions and Scripts; then the network, mining and consensus,
 *   the alternatives) + the standard university blockchain arcs for
 *   the smart-contract layer.
 * - Exam types: worked computations (script traces, Merkle proofs) +
 *   protocol-tracing questions.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-trust-question',
    title: 'The Trust Question',
    summary:
      'Why a ledger might exist without a keeper: the double-spend problem priced on the classical answers (the trusted-third-party census), the decentralized bet stated honestly (what it buys — censorship-resistance, neutrality — and what it costs), and the systems that failed before the hash-and-work combination succeeded.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Double-Spend Problem Priced',
      'The Decentralized Bet, Stated Honestly',
      'The Failures Before the Answer',
    ],
  },
  {
    number: 2,
    slug: 'keys-addresses-wallets',
    title: 'Keys, Addresses and Wallets',
    summary:
      'The ownership layer (Cryptography cross-referenced for the mathematics): the keypair\u2019s ownership contract, addresses derived (the hash pipeline traced — from public key to the encoding discipline), the wallet census (the custody spectrum priced — custodial versus self, the seed\u2019s BIP-39 discipline), and the UTXO echo named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Ownership Contract',
      'The Address Pipeline Traced',
      'The Custody Spectrum Priced',
    ],
  },
  {
    number: 3,
    slug: 'transactions',
    title: 'Transactions',
    summary:
      'The ledger\u2019s atoms: the transaction\u2019s anatomy traced (inputs, outputs, the lock/unlock script discipline — a worked script\u2019s execution traced), the signature\u2019s verification (the sighash census priced on what it commits), the fee market\u2019s economics, and the change discipline computed on a worked spend.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Anatomy Traced',
      'A Script Execution Traced',
      'The Fee Market\u2019s Economics',
    ],
  },
  {
    number: 4,
    slug: 'the-block-and-the-chain',
    title: 'The Block and the Chain',
    summary:
      'The structure that makes history hard to rewrite: the block\u2019s anatomy (the header census — the Merkle root derived and its proof-of-inclusion computed on a small tree), the chain\u2019s linking discipline (the hash-pointer ladder), and the immutability honesty — rewriting costs quantified.',
    status: 'planned',
    lessons: [
    ],
    plannedLessons: [
      'The Merkle Proof Computed',
      'The Hash-Pointer Ladder',
      'Rewriting Costs Quantified',
    ],
  },
  {
    number: 5,
    slug: 'consensus-and-mining',
    title: 'Consensus and Mining',
    summary:
      'The decentralized clock: proof of work priced honestly (the lottery\u2019s arithmetic computed — the difficulty discipline), the longest-chain rule\u2019s settlement honesty (the confirmation discipline, the reorganization disease priced), the mining economics census (the hardware eras, the pool question), and the BFT alternative\u2019s census named (Distributed Systems cross-referenced — the staking era).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Lottery\u2019s Arithmetic Computed',
      'The Reorganisation Disease',
      'The Staking Era, Named',
    ],
  },
  {
    number: 6,
    slug: 'the-network-and-the-smart-contract-era',
    title: 'The Network and the Smart-Contract Era',
    summary:
      'The system\u2019s body and its second act: the peer-to-peer network\u2019s discipline (the gossip propagation census, the node census — full versus light), the smart-contract idea priced honestly (the program-as-ledger-entry, its determinism contract, the gas economics), the failure census priced on real incidents, and the ecosystem\u2019s layer questions named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gossip Census',
      'The Program-as-Ledger-Entry',
      'The Failure Census, Priced on Real Incidents',
    ],
  },
  {
    number: 7,
    slug: 'the-synthesis-and-the-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The system on one page (keys → transactions → blocks → consensus → network → contracts with the trust claims beside), the craft census (script traces, Merkle proofs, difficulty arithmetic at exam level), and the doorsteps — Cryptography\u2019s post-quantum horizon, Distributed Systems\u2019 frontier, the honest limitations register (the energy question, the scaling settlements) named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The System on One Page',
      'The Craft Census',
      'The Doorsteps and the Honest Limitations',
    ],
  },
]

export const blockchain: Book = {
  id: 'blockchain',
  title: 'Blockchain',
  subtitle: 'The trustless ledger — keys, scripts, consensus and the honest costs',
  discipline: 'computer-science',
  level: 'First blockchain course → the smart-contract era doorstep',
  description:
    'The ledger home on the Antonopoulos arc. The trust question — the double-spend priced and the decentralized bet stated honestly; keys, addresses and wallets — the ownership contract with the address pipeline traced and the custody spectrum priced; transactions — the anatomy traced with a script execution and the fee market\u2019s economics; the block and the chain — the Merkle proof computed and rewriting costs quantified; consensus and mining — the lottery\u2019s arithmetic, the reorganization disease, the staking era named; the network and the smart-contract era with its failure census priced on real incidents; and the system map with its honest limitations. Cross-references Cryptography and Distributed Systems for the theory it composes; hands off to their frontiers.',
  status: 'planned',
  accent: ['#b7791f', '#713f12'],
  chapters,
}
