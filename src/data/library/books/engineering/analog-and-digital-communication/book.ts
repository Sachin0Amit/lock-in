import type { Book, Chapter } from '../../../types'

/**
 * Analog and Digital Communication — the twenty-fifth book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 37 planned lessons, zero written. Lesson ids will use the `comm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Analog and Digital Communication owns the physical-layer story (GATE EC S7). Signals and Systems owns the transform machinery; Antennas and Wave Propagation owns the radiated channel; the CS shelf’s Computer Networks owns the higher layers; the Mathematics shelf’s Probability Theory owns the random-variable foundations; Cryptography owns the security layer (a different problem, honestly noted).
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EC Section 7 'Communications' (EC_2026_Syllabus.pdf, extracted
 *   this pass): 'Random Processes: Auto correlation and power spectral density,
 *   properties of white noise, filtering of random signals through LTI systems.
 *   Analog Communications: Amplitude modulation and demodulation, angle modulation
 *   and demodulation, spectra of AM and FM, super heterodyne receivers. Information
 *   Theory: Entropy, mutual information and channel capacity theorem. Digital
 *   Communications: PCM, DPCM, digital modulation schemes (ASK, PSK, FSK, QAM),
 *   bandwidth, inter-symbol interference, MAP, ML detection, matched filter
 *   receiver, SNR and BER. Fundamentals of error correction, Hamming codes, CRC' —
 *   the entire section is this book's register.
 * - Haykin & Moher, Communication Systems 5e — the TOC read this pass from the
 *   Wiley page and the open Indian-adaptation contents (Introduction; Representation
 *   of Signals and Systems; Amplitude Modulation; Angle Modulation; Sampling and
 *   Pulse Modulation; Baseband Pulse Transmission; Digital Band-Pass Modulation;
 *   Spread-Spectrum; Fundamental Limits; Error-Control Coding); Proakis & Salehi
 *   named as the second pole; Lathi's Modern Digital named; Taub & Schilling named
 *   as the classic pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-communication-worldview',
    title: 'The Communication Worldview',
    summary:
      'The communication chain drawn end-to-end (source, coder, modulator, channel, the honest taxes priced — noise, bandwidth, power); the analog-versus- digital census priced honestly; the frequency-domain view as the book\u2019s native language (Signals and Systems cross-referenced); and the layered honest note (the CS shelf\u2019s network stack owns the layers above this book).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Chain and Its Taxes',
      'Analog versus Digital, Priced',
      'The Frequency Domain as Language',
    ],
  },
  {
    number: 2,
    slug: 'random-processes',
    title: 'Random Processes for Communication',
    summary:
      'The random process as the honest model of noise (the Mathematics shelf\u2019s probability cross-referenced); ensemble statistics and stationarity; autocorrelation and its properties; the power spectral density earned (the Wiener-Khinchin craft); white noise and its bandwidth honest note; filtering of random signals through LTI systems — the PSD transformation; and the Gaussian channel model stated honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Process as Honest Noise',
      'The PSD Earned',
      'White Noise and Its Note',
      'Filtering Random Signals',
    ],
  },
  {
    number: 3,
    slug: 'amplitude-modulation',
    title: 'Amplitude Modulation',
    summary:
      'Why modulate (the antenna and sharing honest notes); AM DSB-FC with its spectrum and power census; DSB-SC and its coherent detection (the Costas loop named); SSB and VSB with their honest trades; modulators and demodulators priced (the switching and envelope crafts); and the AM applications census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Modulate',
      'The DSB Family Priced',
      'SSB and VSB\u2019s Honest Trades',
      'Detection Crafts',
    ],
  },
  {
    number: 4,
    slug: 'angle-modulation',
    title: 'Angle Modulation',
    summary:
      'FM and PM defined (the instantaneous-frequency craft); the narrowband honest note; the spectrum of FM (the Bessel honest note) and the bandwidth rule (Carson); direct and indirect generation (Armstrong named); demodulation — the discriminators and the PLL (Analog Electronics cross-referenced); the noise-immunity honest note priced; and the pre/de-emphasis craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Instantaneous-Frequency Craft',
      'Bessel and Carson Priced',
      'Generation and Detection',
      'The Noise-Immunity Note',
    ],
  },
  {
    number: 5,
    slug: 'receivers',
    title: 'Receivers',
    summary:
      'The receiver census from TRF to the superheterodyne (earned as the frequency-conversion craft — the image-frequency honest note and its tracking fix); IF selection; sensitivity and selectivity defined and priced; AM and FM receiver blocks drawn; and the SDR honest note (the modern doorway named).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Superheterodyne Earned',
      'The Image Note and Its Fix',
      'Sensitivity and Selectivity',
      'The SDR Doorway',
    ],
  },
  {
    number: 6,
    slug: 'information-theory',
    title: 'Information Theory',
    summary:
      'Information measured honestly (the surprise craft — the logarithm earned); entropy computed for the source census; the source-coding theorem stated honestly with prefix codes (Huffman named); mutual information and the channel capacity theorem earned (the Gaussian channel\u2019s Shannon formula priced on real bandwidths and SNRs); and the theory\u2019s honest use as the engineer\u2019s compass.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Entropy Earned from Surprise',
      'Prefix Codes and Huffman',
      'The Capacity Theorem Earned',
      'Shannon as Compass',
    ],
  },
  {
    number: 7,
    slug: 'pulse-and-source-coding',
    title: 'Pulse and Source Coding',
    summary:
      'Sampling for transmission (the theorem cross-referenced and its taxes priced); quantisation — uniform and non-uniform (the companding craft); PCM with its bandwidth and SNR arithmetic; DPCM and DM with their honest trades; and the source-coding census that pairs with the theory chapter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Quantisation and Companding',
      'PCM\u2019s Arithmetic Priced',
      'DPCM and DM\u2019s Honest Trades',
    ],
  },
  {
    number: 8,
    slug: 'digital-modulation',
    title: 'Digital Modulation',
    summary:
      'The constellation idea (the signal-space craft stated); ASK, PSK (BPSK, QPSK) and FSK with their spectra and bandwidth; QAM earned as the bandwidth-efficient compromise; inter-symbol interference and the pulse-shaping craft (the raised-cosine honest note); the coherent-detection census; and the BER arithmetic worked for the standard schemes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Constellations Earned',
      'The Scheme Census',
      'ISI and Raised-Cosine',
      'BER Arithmetic Worked',
    ],
  },
  {
    number: 9,
    slug: 'detection-and-error-control',
    title: 'Detection, Noise and Error Control',
    summary:
      'The detection problem stated honestly (the a-posteriori craft); MAP and ML detection earned; the matched filter earned (the SNR-maximising craft); the correlator as its twin; SNR and BER for the Gaussian channel priced end-to-end; error control — parity and the Hamming code worked (its syndrome craft); CRC priced at the register level; and the modern coding doorstep named (convolutional and turbo codes glanced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'MAP and ML Earned',
      'The Matched Filter Earned',
      'Hamming\u2019s Syndrome Craft',
      'CRC and the Modern Doorstep',
    ],
  },
  {
    number: 10,
    slug: 'synthesis-and-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The link-budget craft worked on a real link (the chain\u2019s every honest tax summed); the analog and digital stories synthesised on one page; the channel physics routed to Antennas and Wave Propagation and Electromagnetic Fields and Waves; the higher layers routed to the CS shelf\u2019s Computer Networks; and the modern doorstep — the wireless and satellite censuses named for future books.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'A Link Budget Worked',
      'The Synthesis Page',
      'The Doorsteps: Physics, Layers, Wireless',
    ],
  },
]

export const analogAndDigitalCommunication: Book = {
  id: 'analog-and-digital-communication',
  title: 'Analog and Digital Communication',
  subtitle: 'Modulation, noise and information — how signals carry messages honestly',
  discipline: 'engineering',
  level: 'First communication course → modern digital-links readiness',
  description: 'The communication discipline: the worldview (the channel\u2019s honest taxes — noise, bandwidth, power; analog versus digital priced); the random-process engine — autocorrelation, power spectral density, white noise and filtering of random signals through LTI systems (the Mathematics shelf\u2019s probability cross-referenced); amplitude modulation and demodulation (DSB-SC, SSB, VSB with their spectra and detectors); angle modulation (FM and PM, spectra and bandwidth, the demodulation craft); the superheterodyne receiver; information theory — entropy, mutual information and the channel capacity theorem earned honestly; source and pulse coding — sampling (Signals and Systems cross-referenced), PCM and DPCM with quantisation noise; digital modulation — ASK, PSK, FSK and QAM with constellations, bandwidth and inter-symbol interference; detection — the matched filter, MAP and ML detection, SNR and BER arithmetic; error control — Hamming codes and CRC; and the synthesis with the modern links doorstep (the CS shelf\u2019s network stack cross-referenced). Cross-references Signals and Systems, Electromagnetic Fields and Waves (the channel physics), the Mathematics shelf\u2019s probability and information arcs.',
  status: 'planned',
  accent: ['#0369a1', '#0c4a6e'],
  chapters,
}
