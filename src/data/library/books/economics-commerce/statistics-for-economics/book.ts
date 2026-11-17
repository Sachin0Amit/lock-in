import type { Book, Chapter } from '../../../types'

/**
 * Statistics for Economics — the seventeenth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 7 chapters /
 * 29 planned lessons, zero written. Lesson ids will use the `stateco-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Statistics for Economics owns the economic-statistics register (UGC NET unit 3’s statistics half read this pass). The mathematics shelf’s statistics-and-probability books own the pure-theory side; econometrics owns the regression-and-causal side; the index-and-time-series registers are priced here as the economics applications.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — Unit 3's statistics registers: descriptive statistics, index numbers, sampling) as the spine.
 * - Goon, Gupta & Dasgupta's Fundamentals of Statistics (the classic Indian economics-statistics arc, named) as the teaching pole.
 * - The mathematics shelf's statistics and probability-theory books cross-referenced as the pure side; the MoSPI register priced for the official-data chapter.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'data-and-description',
    title: 'Data and the Descriptive Craft',
    summary:
      'The data census — qualitative, quantitative, cross-section-and-time told; the presentation register — tables, bar, pie, histogram priced; the central-tendency census — mean, median, mode with their choice honesty; and the dispersion register — range, quartile, SD computed.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Data Census',
      'The Presentation Register',
      'The Central Census',
      'The Dispersion Register',
      'Collection of Data',
      'Organisation and Presentation of Data',
      'The Statistical Tools in Use',
    ],
  },
  {
    number: 2,
    slug: 'correlation-and-regression-first-pass',
    title: 'Correlation and Regression First Pass',
    summary:
      'The scatter craft read; the correlation registers — Karl Pearson\u2019s coefficient computed with the Spearman complement; the regression line fitted by the least-squares first pass; the interpretation honesty — correlation-vs-causation told; and the econometrics book\u2019s doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Scatter Craft',
      'Pearson and Spearman',
      'The First Regression Line',
      'The Causation Honesty',
    ],
  },
  {
    number: 3,
    slug: 'index-numbers',
    title: 'Index Numbers',
    summary:
      'The index problem stated — the price-relative craft; the unweighted register; the weighted pair — Laspeyres-and-Paasche computed with the Fisher ideal named; the CPI-WPI registers priced with the Indian case; the deflating craft told; and the limitations honesty carried.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Price-Relative Craft',
      'The Weighted Pair',
      'The CPI-WPI Registers',
      'The Deflating Craft',
    ],
  },
  {
    number: 4,
    slug: 'time-series',
    title: 'The Time-Series Craft',
    summary:
      'The components census — trend, seasonal, cyclical, irregular read; the moving-average register; the trend-fitting craft — the linear-and-parabolic passes; the seasonal-index arithmetic with the ratio-to-moving-average method; and the forecasting honesty told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Component Census',
      'The Moving Register',
      'The Trend Craft',
      'The Seasonal Index',
    ],
  },
  {
    number: 5,
    slug: 'probability-and-sampling',
    title: 'Probability and Sampling for Economists',
    summary:
      'The probability foundations told at the economics depth (the mathematics shelf\u2019s probability book cross-referenced for the pure side); the distribution census — the normal-and-t registers read; the sampling-craft census — SRS, stratified, systematic priced; the standard-error honesty; and the NSSO register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Foundations Told',
      'The Distribution Census',
      'The Sampling Craft',
      'The NSSO Register',
    ],
  },
  {
    number: 6,
    slug: 'official-data-system',
    title: 'The Official Data System',
    summary:
      'The Indian statistical system mapped — MoSPI, CSO, NSO told; the national-account registers read honestly; the PLFS-and-ASESO registers named; the data-quality honesty told; and the doorway — the econometrics book\u2019s empirical register marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The System Mapped',
      'The National Registers',
      'The Labour Registers',
      'The Quality Honesty',
    ],
  },
  {
    number: 7,
    slug: 'survey-and-doorway',
    title: 'The Survey Craft and the Doorway',
    summary:
      'The survey machinery — design, schedule-and-questionnaire, field craft priced; the NSS round register told briefly; the census-and-administrative registers read; and the book\u2019s doorway — the applied-economics register marked honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Survey Machinery',
      'The Round Register',
      'The Census Registers',
      'The Applied Doorway',
    ],
  },
]

export const statisticsForEconomics: Book = {
  id: 'statistics-for-economics',
  title: 'Statistics for Economics',
  subtitle: 'The economist\u2019s data craft: description, index numbers, time series and the survey machinery',
  discipline: 'economics-commerce',
  level: 'University + UGC NET unit 3 first half + professional',
  description: 'The economic-statistics register: the descriptive craft — tables, central tendency and dispersion, correlation-and-regression\u2019s first pass, the index-number machinery with its price-and-inflation registers, the time-series decomposition craft, the probability-and-sampling foundations for economists, and the official-data system\u2019s map.',
  status: 'planned',
  accent: ['#475569', '#1e293b'],
  chapters,
}
