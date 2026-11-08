/**
 * Custom Book Builder — examination scope maps.
 *
 * An examination name is only a *selection rule*: it decides which existing
 * Main Library content should be searched for. These curated maps carry
 * topic NAMES ONLY (public curriculum structure) — no academic content is
 * generated here, and whatever the library does not contain is reported as
 * "Not Available in Main Library" by the matching engine.
 */
import type { TopicNode } from './types'

export interface ExamTemplate {
  key: string
  label: string
  note: string
  /** lowercase substring tests against the user's examination input */
  aliases: string[]
  nodes: TopicNode[]
}

const n = (topic: string, children?: string[]): TopicNode => ({
  topic,
  ...(children && children.length ? { children: children.map((c) => ({ topic: c })) } : {}),
})

export const EXAM_TEMPLATES: ExamTemplate[] = [
  {
    key: 'gate-cse',
    label: 'GATE CSE (Computer Science & Information Technology)',
    note: 'Approximate topic scope of the GATE CSE paper — used only to select library content.',
    aliases: ['gate cse', 'gate cs', 'gate computer science', 'gate information technology'],
    nodes: [
      n('Engineering Mathematics', ['Discrete Mathematics', 'Linear Algebra', 'Calculus', 'Probability and Statistics']),
      n('Digital Logic'),
      n('Computer Organization and Architecture'),
      n('Programming and Data Structures', ['Programming in C', 'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs']),
      n('Algorithms', ['Searching', 'Sorting', 'Hashing', 'Dynamic Programming', 'Greedy Algorithms', 'Time Complexity']),
      n('Theory of Computation'),
      n('Compiler Design'),
      n('Operating System', [
        'Introduction to Operating Systems',
        'Process Management',
        'Process States',
        'Process Scheduling',
        'Threads',
        'Synchronization',
        'Deadlocks',
        'Memory Management',
        'Virtual Memory',
        'File Systems',
        'Input Output Management',
      ]),
      n('Databases', ['ER Model', 'Relational Model', 'SQL', 'Normalization', 'Transactions']),
      n('Computer Networks', ['OSI Model', 'TCP IP', 'IP Addressing', 'Routing']),
    ],
  },
  {
    key: 'jee-main',
    label: 'JEE Main',
    note: 'Approximate topic scope of the JEE Main papers — used only to select library content.',
    aliases: ['jee main', 'iit jee main', 'jee mains'],
    nodes: [
      n('Mathematics', [
        'Number Systems',
        'Sets and Functions',
        'Complex Numbers',
        'Quadratic Equations',
        'Polynomials',
        'Matrices and Determinants',
        'Permutations and Combinations',
        'Binomial Theorem',
        'Sequences and Series',
        'Arithmetic Progressions',
        'Limits and Continuity',
        'Differentiation',
        'Applications of Derivatives',
        'Integration',
        'Differential Equations',
        'Straight Lines',
        'Circles',
        'Conic Sections',
        'Vector Algebra',
        'Three Dimensional Geometry',
        'Statistics',
        'Probability',
        'Trigonometry',
        'Mathematical Reasoning',
      ]),
      n('Physics', [
        'Units and Measurement',
        'Kinematics',
        'Laws of Motion',
        'Work Energy and Power',
        'Rotational Motion',
        'Gravitation',
        'Thermodynamics',
        'Waves',
        'Electrostatics',
        'Current Electricity',
        'Magnetism',
        'Optics',
        'Modern Physics',
      ]),
      n('Chemistry', [
        'Some Basic Concepts of Chemistry',
        'Atomic Structure',
        'Chemical Bonding',
        'Thermodynamics',
        'Equilibrium',
        'Redox Reactions',
        'Solutions',
        'Electrochemistry',
        'Chemical Kinetics',
        'Periodic Table',
        'Coordination Compounds',
        'Basic Organic Chemistry',
        'Hydrocarbons',
      ]),
    ],
  },
  {
    key: 'jee-advanced',
    label: 'JEE Advanced',
    note: 'Approximate topic scope of the JEE Advanced papers — used only to select library content.',
    aliases: ['jee advanced', 'iit jee advanced'],
    nodes: [
      n('Mathematics', [
        'Number Systems',
        'Algebraic Expressions',
        'Quadratic Equations',
        'Polynomials',
        'Sequences and Series',
        'Permutations and Combinations',
        'Binomial Theorem',
        'Matrices and Determinants',
        'Probability',
        'Trigonometry',
        'Straight Lines',
        'Circles',
        'Conic Sections',
        'Limits',
        'Differentiation',
        'Integration',
        'Differential Equations',
        'Vectors',
      ]),
      n('Physics', ['Mechanics', 'Thermal Physics', 'Electricity and Magnetism', 'Optics', 'Modern Physics']),
      n('Chemistry', ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry']),
    ],
  },
  {
    key: 'upsc-cse',
    label: 'UPSC CSE (Civil Services Examination)',
    note: 'Approximate topic scope of the UPSC CSE papers — used only to select library content.',
    aliases: ['upsc cse', 'upsc civil services', 'upsc', 'civil services examination'],
    nodes: [
      n('History of India'),
      n('Indian National Movement'),
      n('Indian and World Geography'),
      n('Indian Polity and Governance'),
      n('Economic Development'),
      n('Environment and Ecology'),
      n('General Science', ['Physics', 'Chemistry', 'Biology']),
      n('Current Affairs'),
      n('Logical Reasoning and Analytical Ability'),
      n('Data Interpretation'),
      n('Class Ten Level Mathematics', ['Number Systems', 'Percentages', 'Ratio and Proportion', 'Averages', 'Basic Algebra']),
    ],
  },
  {
    key: 'cuet-ug',
    label: 'CUET UG (Common University Entrance Test)',
    note: 'Approximate topic scope of CUET UG — used only to select library content.',
    aliases: ['cuet ug', 'cuet'],
    nodes: [
      n('English'),
      n('Mathematics', ['Number Systems', 'Algebra', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Coordinate Geometry', 'Calculus', 'Statistics', 'Probability', 'Trigonometry']),
      n('Physics'),
      n('Chemistry'),
      n('Biology'),
      n('History'),
      n('Geography'),
      n('Political Science'),
      n('Economics'),
      n('Business Studies'),
      n('Accountancy'),
      n('Psychology'),
      n('Sociology'),
      n('Computer Science'),
      n('General Test', ['Quantitative Reasoning', 'Logical Reasoning', 'Data Interpretation', 'Current Affairs', 'General Knowledge']),
    ],
  },
  {
    key: 'neet-ug',
    label: 'NEET UG (National Eligibility cum Entrance Test)',
    note: 'Approximate topic scope of NEET UG — used only to select library content.',
    aliases: ['neet ug', 'neet'],
    nodes: [
      n('Physics', ['Units and Measurement', 'Kinematics', 'Laws of Motion', 'Work Energy and Power', 'Rotational Motion', 'Gravitation', 'Thermodynamics', 'Oscillations and Waves', 'Electrostatics', 'Current Electricity', 'Magnetism', 'Optics', 'Modern Physics']),
      n('Chemistry', ['Basic Concepts of Chemistry', 'Atomic Structure', 'Chemical Bonding', 'Solutions', 'Equilibrium', 'Redox Reactions', 'Chemical Kinetics', 'Periodic Table', 'Coordination Compounds', 'Organic Chemistry Basics', 'Hydrocarbons', 'Biomolecules']),
      n('Biology', ['Cell Structure', 'Biomolecules', 'Plant Physiology', 'Human Physiology', 'Genetics', 'Evolution', 'Ecology', 'Reproduction', 'Biotechnology']),
    ],
  },
  {
    key: 'cat',
    label: 'CAT (Common Admission Test)',
    note: 'Approximate topic scope of CAT — used only to select library content.',
    aliases: ['cat', 'common admission test', 'cat exam'],
    nodes: [
      n('Quantitative Aptitude', [
        'Number Systems',
        'Percentages',
        'Ratio and Proportion',
        'Profit and Loss',
        'Simple and Compound Interest',
        'Time and Work',
        'Time Speed and Distance',
        'Averages',
        'Mixtures and Alligations',
        'Linear Equations',
        'Quadratic Equations',
        'Polynomials',
        'Inequalities',
        'Logarithms',
        'Sequences and Series',
        'Geometry',
        'Mensuration',
        'Probability',
        'Permutations and Combinations',
        'Set Theory',
        'Functions',
      ]),
      n('Data Interpretation', ['Tables', 'Bar Charts', 'Pie Charts', 'Line Graphs', 'Caselets']),
      n('Logical Reasoning', ['Seating Arrangement', 'Puzzles', 'Blood Relations', 'Syllogisms', 'Venn Diagrams']),
      n('Verbal Ability', ['Reading Comprehension', 'Para Jumbles', 'Grammar', 'Vocabulary']),
    ],
  },
]

/** Find the template matching a user-entered examination name. */
export function matchExamTemplate(name: string): ExamTemplate | null {
  const q = name.trim().toLowerCase()
  if (!q) return null
  for (const t of EXAM_TEMPLATES) {
    for (const alias of t.aliases) {
      if (q.includes(alias) || alias.includes(q)) return t
    }
  }
  return null
}
