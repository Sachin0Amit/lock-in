import type { Book, Chapter } from '../../../types'

/**
 * Public Administration — the third book of the Polity & Governance branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 36 planned lessons, zero written. Lesson ids will use the `padm-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Public Administration owns the administrative machinery register. Political Science owns the constitutional organs’ political reading (the two cross-reference — the ministries and the parliament have both a political and an administrative reading); Ethics owns the GS4 probity-and-values register (this book’s accountability chapters cross-reference it); the Economics shelf’s future public-economics book will own the fiscal theory this book’s budget chapter applies; Nicholas Henry’s paradigms are this book’s frame.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Nicholas Henry, Public Administration and Public Affairs (the chapter arc read this pass via the google-preview contents — Big Democracy Big Bureaucracy; the Paradigms; the Threads and Fabric of Organizations; the Public's Information Resource; the accountability and productivity arcs) — the 13e google-preview PDF.
 * - The UPSC Public Administration optional register (read this pass — lukmaanias.net + drishtiias.com: Paper I Administrative Theory — Kautilya, Wilson, Weber, Taylor, Fayol, Hawthorne, Simon, the administrative behaviour, accountability and control, administrative law, comparative and development administration, the financial administration, the policy arcs; Paper II the Indian administration's whole register).
 * - UGC NET Public Administration (code 14 — the updated-syllabus list read this pass at ugcnetonline.in; the adda247/testbook unit guides checked this pass — Unit II the administrative thought and behaviour register).
 * - The UPSC CSE GS Paper II lines 10-16 (read in full this pass — the government policies and interventions, the development industry, the welfare schemes, the social sector, the governance-transparency-accountability-e-governance, the citizens' charters, the role of civil services in a democracy) as the applied spine.
 * - The Indian poles named: Laxmikanth's Public Administration and the Sharma-Sadana arc (the MoS-based university registers).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-discipline-pa',
    title: 'The Discipline of Public Administration',
    summary:
      'The field\u2019s own questions: administration\u2019s meaning and scope (the POSDCORB census as the classic answer); the art-or-science debate priced; the public-private divide (the publicness criterion — what makes an organisation public); the development administration concept (the Riggsian ecology and the prismatic society named); Wilson\u2019s 1887 essay as the field\u2019s founding shot (the politics-administration dichotomy he proposed and later thinkers dismantled); and Nicholas Henry\u2019s five paradigms as the field\u2019s self-understanding — where the discipline has been and what it lost on the way.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Meaning and the POSDCORB Census',
      'The Publicness Criterion',
      'Wilson\u2019s Essay and the Dichotomy',
      'The Five Paradigms',
    ],
  },
  {
    number: 2,
    slug: 'the-administrative-thought',
    title: 'The Administrative Thought',
    summary:
      'The thinkers\u2019 full register: Kautilya\u2019s Arthashastra as the first administrative text (the saptanga theory, the machinery of the spy state — priced as administration not just statecraft); Weber\u2019s bureaucracy as the ideal type (the hierarchy, the files, the merit, the iron cage critique); Taylor\u2019s scientific management and Fayol\u2019s fourteen (the classical school); the Hawthorne studies and the human relations turn (Mayo, Maslow\u2019s hierarchy, McGregor\u2019s X-Y, Herzberg\u2019s two factors); Simon\u2019s bounded rationality and the decision school; and the later — Dror\u2019s planning, Riggs\u2019 ecology, the New Public Administration\u2019s equity turn.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Kautilya\u2019s Machine',
      'Weber\u2019s Ideal Type',
      'The Classical School and the Human Relations Turn',
      'Simon and the Later Thinkers',
    ],
  },
  {
    number: 3,
    slug: 'administrative-behaviour',
    title: 'Administrative Behaviour',
    summary:
      'The office\u2019s psychology and flow: motivation\u2019s theories applied to the public service (the pecuniary and the purposive); leadership\u2019s styles in the administrative setting (the transformational against the transactional); the communication\u2019s web (the formal and the grapevine, the barriers, the e-office\u2019s effect); morale and its measurement; the decision-making craft — the rational model\u2019s limits, the incremental (muddling through), the mixed scanning; and the group dynamics in committees (the groupthink trap priced).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Motivation in the Public Service',
      'Leadership and Communication',
      'The Decision Craft',
      'Morale and the Committee\u2019s Groupthink',
    ],
  },
  {
    number: 4,
    slug: 'the-organisation-theories',
    title: 'The Organisation Theories',
    summary:
      'The organisation\u2019s census: the classical (Weber, Taylor, Fayol as the machine); the neoclassical (the human relations as the correction); the systems theory (the organisation as an open adaptive system — the inputs-throughputs-outputs model); the contingency theory (no one best way — the structure follows the task); the post-modern and the critical turn (the Osborne-Gaebler reinvention named); and the public organisation\u2019s own peculiarities — the multiple conflicting objectives, the measurement problem, the sovereignty\u2019s shadow.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Machine and Its Correction',
      'The Systems View',
      'The Contingency Turn',
      'The Public Organisation\u2019s Own Peculiarity',
    ],
  },
  {
    number: 5,
    slug: 'accountability-and-control',
    title: 'Accountability and Control',
    summary:
      'The leash\u2019s register: the legislative control (the question hour, the committees — the estimates and the public accounts, the CAG\u2019s audit as the legislature\u2019s eye); the judicial review\u2019s administrative reach (cross-referenced to Law and Legal Studies); the executive\u2019s internal control (the vigilance, the hierarchy); the ombudsman\u2019s idea and the Indian variants (the Lokpal and the Lokayuktas priced); the citizens\u2019 participation and the transparency revolution — the RTI\u2019s architecture and its use; and the e-governance accountability (the digital trail) — the GS2 \u2019important aspects of governance, transparency and accountability\u2019 line carried in full.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Legislative Control and the CAG',
      'The Internal and Judicial Leash',
      'The Ombudsman\u2019s Idea and the Lokpal',
      'The RTI and the Transparency Revolution',
    ],
  },
  {
    number: 6,
    slug: 'the-indian-administration',
    title: 'The Indian Administration',
    summary:
      'The Indian machine\u2019s own anatomy: the constitutional framework\u2019s administration (the All-India Services\u2019 constitutional home); the PMO and the Cabinet Secretariat as the apex; the ministries and departments\u2019 anatomy (the secretariat pattern, the attached and subordinate offices); the civil services\u2019 craft (the steel frame\u2019s history, the recruitment, the training, the conduct rules and the AIS acts); the state administration; the district collector\u2019s office as the field\u2019s apex; and the local government after the 73rd-74th amendments (the three-tier panchayat, the municipal finance\u2019s problem — the devolution\u2019s actual record priced honestly).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Apex: PMO and Cabinet Secretariat',
      'The Ministries and the Departments',
      'The Civil Services\u2019 Craft',
      'The Collector and the Local Government',
    ],
  },
  {
    number: 7,
    slug: 'planning-and-financial-administration',
    title: 'Planning and Financial Administration',
    summary:
      'The money\u2019s machinery: the planning\u2019s evolution (the Commission era, the NITI\u2019s cooperative federalism turn); the budget\u2019s craft — the stages (formulation, enactment, execution), the types (line-item against performance and zero-based), the Indian budget\u2019s anatomy, the deficit vocabulary; the financial administration\u2019s control system (the CAG\u2019s audit types, the public accounts committee\u2019s follow-through); the public debt and the FRBM\u2019s discipline; and the government accounting\u2019s cash-and-accrual debate priced at survey depth.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Planning\u2019s Evolution',
      'The Budget\u2019s Craft',
      'The CAG and the PAC\u2019s Follow-Through',
      'The Debt and the Fiscal Discipline',
    ],
  },
  {
    number: 8,
    slug: 'policy-and-implementation',
    title: 'Policy and Implementation',
    summary:
      'The policy\u2019s life: the cycle (the agenda setting, the formulation, the legitimation, the implementation, the evaluation — the model\u2019s limits priced); the implementation science (the street-level bureaucrat\u2019s discretion, the principal-agent chains, the last-mile problem with Indian case studies — the MGNREGA\u2019s and the DBT\u2019s registers); the policy analysis\u2019 tools (the cost-benefit, the stakeholder mapping); the e-governance\u2019s models (the G2C, G2B, G2G census with the successes, the limitations and the potential — the GS2 line); the citizens\u2019 charters and the service delivery\u2019s quality (the Sevottam\u2019s arc); and the reforms — the New Public Management and the good-governance agenda.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Policy Cycle and Its Limits',
      'The Implementation Science',
      'The e-Governance Models',
      'The Charters and the Reforms',
    ],
  },
  {
    number: 9,
    slug: 'personnel-ethics-and-doorstep',
    title: 'The Personnel, the Ethics Handshake and the Doorstep',
    summary:
      'The people\u2019s register and the close: the personnel administration (the recruitment\u2019s merit methods, the training\u2019s arc, the performance appraisal\u2019s problem, the promotion and the seniority-merit debate, the conduct and the disciplinary machinery); the ethics handshake — the integrity\u2019s institutionalisation (the vigilance\u2019s architecture, the CVC and the Lokpal named) with the VALUES register handed to Ethics (the GS4 book) and the administrative accountability staying here; the future — the administrative culture\u2019s change, the AI in government (the CS shelf\u2019s books cross-referenced); and the doorstep — to the reader\u2019s own city office, the eye that now knows what the file on the counter actually is.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Personnel Administration',
      'The Integrity Institutionalised',
      'The Administrative Culture\u2019s Change',
      'The Doorstep: The Reader\u2019s Own Office',
    ],
  },
]

export const publicAdministration: Book = {
  id: 'public-administration',
  title: 'Public Administration',
  subtitle: 'The machinery of government — from Kautilya and Wilson to the e-office and the citizen\u2019s charter',
  discipline: 'humanities',
  level: 'Secondary school civics → university public administration + UPSC (PubAd optional, GS-II) readiness',
  description: 'The governance machinery as its own discipline. The field\u2019s meaning, scope and significance (the art-science debate, the public-private divide, the development-administration concept); the administrative thought\u2019s full register — Kautilya\u2019s Arthashastra, Woodrow Wilson\u2019s essay, Weber\u2019s bureaucracy, Taylor and Fayol\u2019s management, the Hawthorne turn, Simon\u2019s decisionism, the later thinkers; administrative behaviour (motivation, leadership, communication, morale, the decision craft); the organisation theories\u2019 census; accountability and control (the legislative, judicial and executive tools, the ombudsman, the RTI); the Indian administration\u2019s spine (the constitutional framework, the PMO and ministries, the civil services, the state-district administration, the local government after the 73rd/74th amendments); planning, the budget\u2019s craft and financial administration; the policy cycle and implementation science; e-governance and the service delivery\u2019s reform; and the public personnel and ethics handshake. Cross-references Political Science (the constitutional organs\u2019 political reading) and hands off to Ethics (the probity register) and to the reader\u2019s own city office.',
  status: 'planned',
  accent: ['#475569', '#1e293b'],
  chapters,
}
