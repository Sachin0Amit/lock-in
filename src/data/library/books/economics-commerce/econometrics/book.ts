import type { Book, Chapter } from '../../../types'

/**
 * Econometrics — the eighth book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 39 planned lessons, zero written. Lesson ids will use the `econ-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Econometrics owns the empirical register (UGC NET Economics unit 3 read this pass — Statistics and Econometrics). Statistics-for-economics owns the descriptive-and-inference first side; the mathematics shelf’s statistics and probability books own the pure-theory side; data-science (CS shelf) owns the computational machinery — cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - The UGC NET Economics syllabus (read this pass — Unit 3 Statistics and Econometrics: probability, sampling, estimation, regression) as the spine.
 * - Wooldridge, Introductory Econometrics: A Modern Approach (the canonical arc named — the cross-section-first structure this plan follows) and Gujarati named as the classic pole.
 * - The mathematics shelf's statistics and probability-theory books cross-referenced as the theory-side owners.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'idea-and-foundations',
    title: 'The Idea of Econometrics',
    summary:
      'Causation against correlation told as the founding honesty; the experiment-and-observation register; data types census — cross-section, time series, panel; the model-and-noise grammar stated; and the econometric workflow mapped end-to-end.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Founding Honesty',
      'The Experiment Register',
      'The Data Census',
      'The Workflow Mapped',
    ],
  },
  {
    number: 2,
    slug: 'simple-regression',
    title: 'Simple Regression and OLS',
    summary:
      'The OLS fit derived by the least-squares arithmetic; the fitted-value-and-residual grammar; R-squared read with its honesty; the Gauss-Markov conditions stated as the BLUE guarantee; and the simple-inference registers — t and F told at the two-variable depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Least-Squares Fit',
      'The Residual Grammar',
      'The BLUE Guarantee',
      'The First Inference Registers',
    ],
  },
  {
    number: 3,
    slug: 'multiple-regression',
    title: 'Multiple Regression',
    summary:
      'The multiple-regression machinery with the partial-effect grammar; omitted-variable bias told as the central danger; the inference register deepened — the F-test family; the adjusted-R honesty; the beta-versus-standardised-beta distinction; and the multicollinearity diagnosis priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Partial Grammar',
      'The OVB Danger',
      'The F Family',
      'The Multicollinearity Diagnosis',
    ],
  },
  {
    number: 4,
    slug: 'specification-craft',
    title: 'Specification Craft',
    summary:
      'Functional-form registers — log, quadratic, interaction told with their coefficient readings; the dummy-variable craft — intercept shifts and slope dummies; the Chow test named for the structural-break register; the proxy-and-ladder honesty told; and the specification-error census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Form Registers',
      'The Dummy Craft',
      'The Chow Register',
      'The Error Census',
    ],
  },
  {
    number: 5,
    slug: 'heteroskedasticity-and-autocorrelation',
    title: 'Heteroskedasticity and Autocorrelation',
    summary:
      'The two diagnosis registers told honestly; the White-and-Breusch-Pagan names with the LM craft; the robust-standard-error remedy priced; autocorrelation\u2019s Durbin-Watson register with the Cochrane-Orcutt remedy named; and the GLS frame told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Two Diagnoses',
      'The Robust Remedy',
      'The DW Register',
      'The GLS Frame',
    ],
  },
  {
    number: 6,
    slug: 'endogeneity-and-iv',
    title: 'Endogeneity and Instruments',
    summary:
      'Endogeneity told as the causality crisis — the three sources census; the instrumental-variable idea with the relevance-and-exogeneity two conditions; two-stage least squares worked; the weak-instrument honesty named; the difference-in-differences craft priced; and the natural-experiment register told honestly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Crisis Told',
      'The Two Conditions',
      'The 2SLS Worked',
      'The Natural-Experiment Register',
    ],
  },
  {
    number: 7,
    slug: 'panel-and-timeseries',
    title: 'Panel and Time-Series Registers',
    summary:
      'The panel census — fixed against random effects with the Hausman name; the time-series register — stationarity and the unit-root honesty with the Dickey-Fuller name; the ARIMA frame told; the cointegration idea named; and the spurious-regression warning told plainly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Panel Census',
      'The Unit-Root Honesty',
      'The ARIMA Frame',
      'The Spurious Warning',
    ],
  },
  {
    number: 8,
    slug: 'limited-and-categorical',
    title: 'Limited and Categorical Outcomes',
    summary:
      'The linear-probability model and its honesty limits; the logit craft solved — odds, logit and the marginal-effect arithmetic; the probit named as the sibling; the tobit register for censored outcomes told briefly; and the multinomial register named for the choice census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The LPM Honesty',
      'The Logit Craft',
      'The Probit Sibling',
      'The Censored Registers',
    ],
  },
  {
    number: 9,
    slug: 'applied-projects-and-doorway',
    title: 'Applied Projects and the Doorway',
    summary:
      'The applied craft consolidated: the replication-and-ethics register told; the software practice named honestly — R and Stata as the standard tools; the research-paper read as a document; the pre-registration honesty priced; and the doorway to the research register marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Replication Ethics',
      'The Tools Named',
      'The Paper Read',
      'The Research Doorway',
      'Project Work',
    ],
  },
]

export const econometrics: Book = {
  id: 'econometrics',
  title: 'Econometrics',
  subtitle: 'The empirical engine: regression, inference and the identification craft of economic measurement',
  discipline: 'economics-commerce',
  level: 'University + UGC NET unit 3 + professional register',
  description: 'The econometrics register: the causality-and-data foundations, the OLS machinery with its Gauss-Markov guarantees and inference arithmetic, the specification craft with functional forms and dummy registers, the diagnostics-and-remedy machinery for heteroskedasticity and autocorrelation, the endogeneity-and-instruments craft, the panel-and-time-series registers, and the applied-project doorway with its ethics. Cross-references statistics-for-economics (the inference base) and mathematical-methods-for-engineering; hands off honestly.',
  status: 'planned',
  accent: ['#84cc16', '#365314'],
  chapters,
}
