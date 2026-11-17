import type { Book, Chapter } from '../../../types'

/**
 * Operations Management — the twenty-second book of the Economics, Commerce & Finance shelf.
 *
 * STATUS: PLANNED (Economics, Commerce & Finance full-shelf planning pass, 2026-11-16) — 8 chapters /
 * 35 planned lessons, zero written. Lesson ids will use the `ops-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Operations Management owns the operations register (the UGC NET Management unit read this pass). The engineering shelf’s industrial-engineering book owns the engineering-and-OR side of production; the mathematics shelf’s OR book owns the pure optimisation side; construction-management owns the project side’s engineering register — all cross-referenced honestly.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Heizer & Render's Operations Management (the canonical arc named) as the spine; Mahadevan's Indian text named as the national pole.
 * - The UGC NET Management syllabus (read this pass — the operations unit) cross-referenced as the register served.
 * - The mathematics shelf's optimization-and-operations-research book cross-referenced as the pure side of the inventory-and-project arithmetic.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'operations-foundations',
    title: 'Operations Foundations',
    summary:
      'The operations idea told — the transformation craft for goods-and-services; the productivity arithmetic; the operations-strategy register — the competitive priorities priced; and the mass-and-lean history told briefly with the service-ops distinction carried.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Transformation Craft',
      'The Productivity Arithmetic',
      'The Strategy Register',
      'The History Told',
    ],
  },
  {
    number: 2,
    slug: 'process-and-capacity',
    title: 'Process and Capacity',
    summary:
      'The process census — the project, job, batch, mass-and-continuous registers read; the capacity arithmetic — the utilisation-and-efficiency registers computed; the bottlenecks-and-constraints craft told; and the facility-and-layout register priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Process Census',
      'The Capacity Arithmetic',
      'The Bottleneck Craft',
      'The Layout Register',
    ],
  },
  {
    number: 3,
    slug: 'forecasting-for-operations',
    title: 'Forecasting for Operations',
    summary:
      'The forecast craft\u2019s census — the qualitative-and-quantitative registers told; the time-series registers previewed (the statistics-for-economics book\u2019s deep side cross-referenced); the exponential-smoothing arithmetic worked; the accuracy registers — MAD-and-MSE computed; and the forecasting-honesty told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Forecast Census',
      'The Smoothing Arithmetic',
      'The Accuracy Registers',
      'The Honesty Told',
    ],
  },
  {
    number: 4,
    slug: 'inventory-management',
    title: 'Inventory Management',
    summary:
      'The inventory craft told as the buffers-and-cost trade; the EOQ arithmetic worked properly (the mathematics OR book cross-referenced as the pure side); the ABC register computed; the safety-and-reorder-point craft; the JIT door previewed; and the perishable-and-single-period register priced briefly.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Trade Told',
      'The EOQ Worked',
      'The ABC Register',
      'The Safety Craft',
    ],
  },
  {
    number: 5,
    slug: 'scheduling-and-project',
    title: 'Scheduling and the Project Craft',
    summary:
      'The scheduling census — the flow-and-job-shop registers told briefly; the sequencing registers priced; the project craft — PERT-and-CPM worked properly with the crash arithmetic (the engineering construction-management book\u2019s deep side cross-referenced); and the agile register named.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Scheduling Census',
      'The Sequencing Registers',
      'PERT-CPM Worked',
      'The Agile Register',
    ],
  },
  {
    number: 6,
    slug: 'quality-management',
    title: 'Quality Management',
    summary:
      'The quality idea — the fitness-and-TQM registers told; the gurus census named; the statistical craft — the control-chart register computed (the mathematics statistics book cross-referenced); the process-capability arithmetic; and the Six-Sigma register priced with the DMAIC craft told.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The TQM Register',
      'The Gurus Named',
      'The Control-Craft Arithmetic',
      'The Six-Sigma Register',
    ],
  },
  {
    number: 7,
    slug: 'lean-and-supply-chain',
    title: 'Lean and the Supply Chain',
    summary:
      'The lean craft — the waste census-and-pull machinery told; the JIT register priced properly; the supply-chain craft — the bullwhip honesty named; the logistics register told briefly; the sustainability register priced; and the global chain\u2019s doorway to the international-business book marked.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Waste Census',
      'The JIT Register',
      'The Bullwhip Honesty',
      'The Global Doorway',
    ],
  },
  {
    number: 8,
    slug: 'doorway',
    title: 'The Operations Doorway',
    summary:
      'The service-ops register told properly — the waiting-line arithmetic with the queue registers (the mathematics probability book cross-referenced for the pure side); the Industry-4.0 census named honestly; and the professional-and-research doorway marked with the career map drawn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Service Register',
      'The Queue Arithmetic',
      'The Industry-4.0 Census',
      'The Career Map',
    ],
  },
]

export const operationsManagement: Book = {
  id: 'operations-management',
  title: 'Operations Management',
  subtitle: 'The production-and-delivery discipline: process, capacity, inventory, quality and the lean-and-supply registers',
  discipline: 'economics-commerce',
  level: 'University/MBA + UGC NET Management + professional',
  description: 'The operations register: the input-process-output foundations, the process-and-capacity craft, the forecasting register for operations, the inventory machinery with its EOQ-and-ABC arithmetic, the scheduling-and-project craft with PERT-CPM, the quality discipline with the control-chart register, and the lean-and-supply-chain doorway.',
  status: 'planned',
  accent: ['#0ea5e9', '#0c4a6e'],
  chapters,
}
