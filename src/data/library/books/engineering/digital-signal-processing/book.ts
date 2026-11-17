import type { Book, Chapter } from '../../../types'

/**
 * Digital Signal Processing — the twenty-ninth book of the Engineering shelf (Electronics & Communication branch).
 *
 * STATUS: PLANNED (Engineering full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 33 planned lessons, zero written. Lesson ids will use the `dsp-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Digital Signal Processing owns the computed-signal craft (GATE EC S2’s DFT line: ’DTFT, DFT, z-transform, discrete-time processing of continuous-time signals’ — the DFT’s algorithmic and design depth lives here). Signals and Systems owns the transform foundations; Analog Electronics owns the converters; the CS shelf’s NLP and Computer Vision own the application domains above.
 *
 * RESEARCH PHASE (2026-11-16):
 * - GATE 2026 EC Section 2's discrete lines (EC_2026_Syllabus.pdf, extracted
 *   this pass): 'DTFT, DFT, z-transform, discrete-time processing of continuous-
 *   time signals' — the DFT and filtering depth is this book's register.
 * - Proakis & Manolakis, Digital Signal Processing — the TOC read this pass from
 *   the open-PDF contents (Introduction; Discrete-Time Signals and Systems; the
 *   z-transform; the frequency-domain chapters; the DFT and its efficient
 *   computation; the FIR and IIR design chapters; filter structures; sampling
 *   and reconstruction; multirate); Oppenheim & Schafer named as the depth pole;
 *   Salivahanan named as the Indian pole.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-dsp-worldview',
    title: 'The DSP Worldview',
    summary:
      'Why compute signals (the programmability and repeatability honest notes against the analog circuit\u2019s drift); the chain drawn — anti-alias, sample, quantise, compute, reconstruct — with every block\u2019s honest tax (Analog Electronics cross-referenced); the quantisation noise arithmetic priced; and the application census that motivates the craft.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Compute Signals',
      'The Chain and Its Honest Taxes',
      'Quantisation Noise Priced',
      'The Application Census',
      'Summary of PC104/ISA 8-bit bus signals'
    ],
  },
  {
    number: 2,
    slug: 'the-dft',
    title: 'The DFT',
    summary:
      'The DFT earned from the DTFT\u2019s sampled honest note (and its periodic mirror); the DFT\u2019s properties as working engines (circular shift and the twiddle census); circular convolution and the linear-by-circular craft; the spectral-analysis honesty — leakage, scalloping, the window census and the resolution trade; and the spectral-estimation honest note that bounds what a finite record can honestly say.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The DFT Earned from Sampling',
      'Circular Convolution Crafted',
      'Leakage and the Window Census',
      'The Resolution Trade Priced',
    ],
  },
  {
    number: 3,
    slug: 'the-fft',
    title: 'The FFT',
    summary:
      'Why the DFT\u2019s honest cost invites the algorithm (the O(N log N) arithmetic); radix-2 decimation-in-time developed and its butterfly drawn; decimation-in-frequency priced; computational counts worked; the bit-reversal honest note; and the FFT\u2019s consequences priced — real-time spectra, the filtering-by-FFT craft and its circular honest caveat.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Butterfly Earned',
      'DIF Priced Against DIT',
      'Bit-Reversal Noted Honestly',
      'Filtering by the FFT',
    ],
  },
  {
    number: 4,
    slug: 'fir-filter-design',
    title: 'FIR Filter Design',
    summary:
      'Why linear phase matters (the constant-delay honest note) and which symmetries earn it; design by the window route (the ideal prototypes and the window census priced); design by frequency sampling; the equiripple honest glance (Parks-McClellan named); and the FIR-versus-IIR census priced by the order honest note.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Linear Phase Earned',
      'The Window Route Worked',
      'The Frequency-Sampling Route',
      'FIR versus IIR Priced',
    ],
  },
  {
    number: 5,
    slug: 'iir-filter-design',
    title: 'IIR Filter Design',
    summary:
      'The analog-prototype route stated (the design inheritance from analog filters); Butterworth and Chebyshev prototypes with their honest trades; the transformation engines — impulse invariance with its aliasing honest note, the bilinear transform with its frequency-warped honesty and the prewarping craft; the cascade-of-biquads realisation; and the stability discipline (the quantised-pole honest note).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Prototype Inheritance',
      'Impulse Invariance and Its Aliasing',
      'The Bilinear Transform and Prewarping',
      'Biquads and the Stability Discipline',
    ],
  },
  {
    number: 6,
    slug: 'structures-and-word-length',
    title: 'Filter Structures and Finite Word Length',
    summary:
      'The realisation census — direct forms I and II, the cascade and parallel routes, the lattice honest glance; coefficient quantisation and the pole-migration craft; overflow and the scaling honest note; rounding noise priced (the roundoff-noise census); and the fixed-versus-floating honest map for real hardware.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Realisation Census',
      'Poles Under Quantisation',
      'Overflow and Scaling',
      'The Roundoff Census',
      'Designing a Parallel RLC Bandpass Filter 555 16.6 Estimating the rms Value of a Periodic'
    ],
  },
  {
    number: 7,
    slug: 'multirate-and-applications',
    title: 'Multirate Processing and the Applications Census',
    summary:
      'Sampling-rate change (decimation and interpolation with their anti-alias disciplines); the polyphase honest note; the applications census — audio processing priced (the EQ and effects craft), speech routed to the CS shelf\u2019s NLP, the adaptive-filter glimpse (the LMS engine named), images routed to Computer Vision; and the SDR doorstep named with the radio\u2019s honest map.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Rate Change and Its Disciplines',
      'The Audio Census Priced',
      'The Adaptive Glimpse',
      'The SDR Doorstep',
    ],
  },
  {
    number: 8,
    slug: 'synthesis-and-doorstep',
    title: 'The Synthesis and the Doorstep',
    summary:
      'The synthesis map — one page from the sample to the shaped spectrum; the design-project census priced end-to-end (a speech-band filter, a spectral analyser); the tools census (the MATLAB/Python honest note); and the doorsteps — Analog and Digital Communication\u2019s modems, the CS shelf\u2019s audio and vision books, the embedded-DSP hardware (Embedded Systems cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Map: Sample to Spectrum',
      'Two Designs Priced End-to-End',
      'The Doorsteps Named',
    ],
  },
]

export const digitalSignalProcessing: Book = {
  id: 'digital-signal-processing',
  title: 'Digital Signal Processing',
  subtitle: 'Signals computed — the DFT, FFT and the digital filters that shape the modern world',
  discipline: 'engineering',
  level: 'First DSP course → audio, speech and SDR readiness',
  description: 'The computed signal: the DSP worldview (the analog-digital-analog chain, quantisation priced honestly — Analog Electronics\u2019 converter chapters cross-referenced); the discrete-time recap (Signals and Systems owns the foundations, cross-referenced honestly — LTI, convolution, z); the DFT earned — its definition, properties and the circular-convolution craft, with the spectral-analysis honesty (leakage, windowing and the resolution trade); the FFT — radix-2 decimation-in-time and decimation-in-frequency priced with their arithmetic honest note; the filter-design arc — FIR by windows and frequency sampling with linear phase earned; IIR by the analog-prototype route — impulse invariance and the bilinear transform with Butterworth and Chebyshev prototypes (the Mathematics shelf\u2019s approximation honest note); filter structures (direct, cascade, lattice) and the finite-word-length honesty (quantisation, overflow and the rounding noise census); multirate processing (decimation, interpolation, the polyphase honest note) glanced at depth; the applications census — audio and speech, the adaptive filter glimpse, images routed to the CS shelf\u2019s Computer Vision; and the SDR doorstep. Cross-references Signals and Systems, Analog Electronics, Analog and Digital Communication and hands off to the CS shelf\u2019s audio and vision books.',
  status: 'planned',
  accent: ['#831843', '#500724'],
  chapters,
}
