import type { Book, Chapter } from '../../../types'

/**
 * Human Resource Management — the twenty-first book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `hrm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Human Resource Management owns the people register (the UGC NET Management-and-code-55 HRM units read this pass). Business-studies owns the school first-pass of directing-and-staffing; the labour-law register is cross-referenced to the humanities shelf’s law-and-legal-studies book; organisational-behaviour’s psychology side to the psychology book — honestly told.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Dessler's Human Resource Management (the canonical arc named) as the spine; the Indian register (the Labour Code apparatus) priced for the employee-relations chapters.
 * - The UGC NET Management (code 17) and the Labour Welfare/HRM (code 55) syllabi (ugcnetonline.in read this pass) cross-referenced as the registers served.
 * - The NCERT staffing-and-directing first passes priced as the school ladder beneath.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'hrm-foundations',
    title: 'HRM Foundations',
    summary:
      'The personnel-to-HRB transition told as the field\u2019s history; the line-and-staff distinction priced; the HR\u2019s strategic craft — the alignment-and-agenda registers told; the HR\u2019s metrics census named; and the Indian register — the profession\u2019s bodies told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transition Told',
      'The Line-and-Staff Craft',
      'The Strategic Register',
      'The Metrics Census',
      'Nature and Significance of Management',
      '11-3b Some Important Common Resources'
    ],
  },
  {
    number: 2,
    slug: 'planning-and-job-craft',
    title: 'Planning and the Job Craft',
    summary:
      'The HR-plan arithmetic — demand-and-supply forecasting with the gap ledger; the job-analysis discipline — the description-and-specification documents; the job-design register — the enrichment-and-enlargement pair; and the competency register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Plan Arithmetic',
      'The Analysis Discipline',
      'The Design Pair',
      'The Competency Register',
    ],
  },
  {
    number: 3,
    slug: 'recruitment-and-selection',
    title: 'Recruitment and Selection',
    summary:
      'The recruitment census — the internal-and-external registers told; the selection machinery — the screening-to-decision funnel; the test-and-interview craft — validity-and-reliability honesty priced; the reference-and-medical registers; and the offer-and-onboarding craft told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census Told',
      'The Selection Funnel',
      'The Validity Honesty',
      'The Onboarding Craft',
    ],
  },
  {
    number: 4,
    slug: 'training-and-development',
    title: 'Training and Development',
    summary:
      'The training-need craft — the analysis register; the method census — the on-and-off registers with the case-and-role crafts priced; the ADDIE discipline named; the evaluation register — Kirkpatrick\u2019s four levels worked; and the executive-and-career development registers told briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Need Craft',
      'The Method Census',
      'The ADDIE Discipline',
      'The Kirkpatrick Levels',
    ],
  },
  {
    number: 5,
    slug: 'performance-management',
    title: 'Performance Management',
    summary:
      'The appraisal census — the trait, behavioural-and-result registers read; the MBO craft worked; the 360-degree register priced; the feedback-and-counseling discipline told; the potential-and-nine-box craft named briefly; and the appraisal-honesty register — the bias census told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Census Read',
      'The MBO Craft',
      'The 360 Register',
      'The Bias Census',
    ],
  },
  {
    number: 6,
    slug: 'compensation-and-benefits',
    title: 'Compensation and Benefits',
    summary:
      'The compensation craft — the base-and-variable registers; the pay-structure arithmetic — the job-evaluation-and-survey machinery; the benefits census — the statutory-and-voluntary registers priced with the Indian acts named; the perquisites-and-flex register; and the equity honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Base-and-Variable Craft',
      'The Structure Arithmetic',
      'The Benefits Census',
      'The Equity Honesty',
    ],
  },
  {
    number: 7,
    slug: 'employee-relations',
    title: 'Employee Relations and the Labour Register',
    summary:
      'The industrial-relations register — the actors-and-machinery told; the Indian Labour-Code census named with the codification honesty told; the union-and-collective-bargaining craft priced; the grievance-and-discipline machinery; and the works-council register told briefly (the law book\u2019s deep side cross-referenced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The IR Register',
      'The Code Census',
      'The Bargaining Craft',
      'The Grievance Machinery',
    ],
  },
  {
    number: 8,
    slug: 'contemporary-and-doorway',
    title: 'Contemporary HR and the Doorway',
    summary:
      'The contemporary register — the engagement-and-wellbeing crafts, the analytics-and-people-data census, the gig-and-flexible honesty told; the OB doorway — the motivation-and-leadership registers previewed (the psychology book cross-referenced); and the professional doorway marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Engagement Craft',
      'The Analytics Census',
      'The Gig Honesty',
      'The Professional Doorway',
      '1-2 How People Interact 8 Key Concepts',
      '17-2e Why People Sometimes Cooperate'
    ],
  },
]

export const humanResourceManagement: Book = {
  id: 'human-resource-management',
  title: 'Human Resource Management',
  subtitle: 'The people-side discipline: planning, staffing, developing and the employment-relations register',
  discipline: 'economics-commerce',
  level: 'University/MBA + UGC NET Management & code 55 + professional',
  description: 'The HRM register: the foundations-and-planning craft, the recruitment-and-selection machinery, the training-and-development discipline, the performance-management register, compensation-and-benefits, the employee-relations-and-labour-law register, the contemporary-HR crafts, and the organisational-behaviour doorway.',
  status: 'planned',
  accent: ['#db2777', '#831843'],
  chapters,
}
