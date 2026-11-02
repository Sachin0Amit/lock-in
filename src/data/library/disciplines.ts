import type { Discipline } from './types'

/**
 * The library's top-level shelves. Mirrors the master plan's discipline
 * organisation (docs/project/MASTER_PLAN.md §4). A discipline gains books
 * over time; the shelf itself is permanent.
 */
export const disciplines: Discipline[] = [
  {
    id: 'mathematics',
    title: 'Mathematics',
    blurb:
      'From counting and place value through algebra, geometry, calculus, analysis and abstract algebra — the full ladder, one rigorous rung at a time.',
    icon: 'Sigma',
  },
  {
    id: 'physics',
    title: 'Physics',
    blurb:
      'Mechanics to quantum theory: derivations, physical intuition, experiments and problem-solving at every level.',
    icon: 'Atom',
  },
  {
    id: 'chemistry',
    title: 'Chemistry',
    blurb:
      'Physical, organic, inorganic and analytical chemistry built from first principles with mechanisms and worked numericals.',
    icon: 'FlaskConical',
  },
  {
    id: 'computer-science',
    title: 'Computer Science',
    blurb:
      'From logic gates and first programs to operating systems, algorithms, AI and research-level computing.',
    icon: 'Cpu',
  },
  {
    id: 'engineering',
    title: 'Engineering',
    blurb:
      'Mechanical, electrical, electronics, civil and specialised branches — theory, design and practice.',
    icon: 'Wrench',
  },
  {
    id: 'medical-sciences',
    title: 'Medical Sciences',
    blurb:
      'Anatomy, physiology, biochemistry, pathology, pharmacology and clinical specialties for medical and allied health study.',
    icon: 'Stethoscope',
  },
  {
    id: 'biology',
    title: 'Biology',
    blurb:
      'Cell and molecular biology, genetics, evolution, ecology, botany and zoology in one connected tree of life.',
    icon: 'Dna',
  },
  {
    id: 'economics-commerce',
    title: 'Economics, Commerce & Finance',
    blurb:
      'Micro and macroeconomics, accounting, finance, banking, management and business mathematics.',
    icon: 'TrendingUp',
  },
  {
    id: 'humanities',
    title: 'Humanities & Social Sciences',
    blurb:
      'History, political science, sociology, psychology, philosophy, geography, law and public administration.',
    icon: 'Globe2',
  },
  {
    id: 'languages',
    title: 'Languages',
    blurb:
      'Complete language courses — English, Hindi, Sanskrit, Japanese, German, French, Spanish, Mandarin and more — from first script to fluency.',
    icon: 'Languages',
  },
  {
    id: 'arts-music',
    title: 'Arts, Music & Creation',
    blurb:
      'Music theory and production, drawing and painting, dance, theatre, film and the creative crafts.',
    icon: 'Palette',
  },
]
