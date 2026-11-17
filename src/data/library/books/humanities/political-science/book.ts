import type { Book, Chapter } from '../../../types'

/**
 * Political Science — the first book of the Polity & Governance branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 10 chapters /
 * 50 planned lessons, zero written. Lesson ids will use the `pol-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Political Science owns the theory-and-polity register. International Relations owns the inter-state order (Heywood’s world-order chapters are named here, priced there); Public Administration owns the administrative machinery (the Wilson-to-New-Public-Management arc); Law and Legal Studies owns the constitutional-law depth (this book’s constitutional chapters are the political reading of the same text — cross-referenced both ways); Ethics owns the public-values register; the Mathematics shelf’s statistics book owns the psephology’s statistical craft (cross-referenced).
 *
 * RESEARCH PHASE (2026-11-16):
 * - Heywood, Politics (the FULL contents read this pass from the Bloomsbury page — 20 chapters: What is Politics?; Political Ideas and Ideologies; Politics and the State; Democracy and Legitimacy; Regimes and Political Systems; Nations and Nationalism; Political Economy and Globalization; Politics Society and Identity; Political Culture and the Media; Representation Elections and Voting; Parties and Party Systems; Groups Interests and Movements; Constitutions Law and Judges; Political Executives and Leadership; Legislatures; Public Policy and Bureaucracy; Multilevel Politics; International and Domestic Security; World Order and Global Governance) — bloomsbury.com/us/politics-9781350356849.
 * - NCERT Political Theory class 11 (the chapter list read this pass — Political Theory: An Introduction; Freedom; Equality; Social Justice; Rights; Citizenship; Nationalism; Secularism) — drishtiias.com PDF.
 * - NCERT Indian Constitution at Work class 11 (the chapter list read this pass — Constitution: Why and How; Rights; Election and Representation; Executive; Legislature; Judiciary; Federalism; Local Governments) — ncert.nic.in keps2ps.pdf.
 * - M. Laxmikanth, Indian Polity (the chapter list read this pass — Historical Background; Making of the Constitution; Salient Features; Preamble; Union and Its Territory; Fundamental Rights; Directive Principles; the organs and the bodies) — the scribd chapter list.
 * - D.D. Basu, Introduction to the Constitution of India 28e (the LexisNexis page read this pass — the constitution under logical chapters, the history since the 1858 act) — store.lexisnexis.com.
 * - UPSC CSE GS Paper II (read in full this pass — lines 1-16 route here); the PSIR optional Paper I register (read this pass — nextias.com/sleepyclasses PDFs); UGC NET Political Science units 1-4 (the unit register checked this pass); AP United States Government and Politics (the five-unit register read this pass — the comparative glance).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'what-is-politics',
    title: 'What Is Politics?',
    summary:
      'The discipline\u2019s first question answered four ways: politics as the exercise of power (the faces-of-power debate — the second and third faces priced), as the machinery of government, as the public sphere\u2019s deliberation, as the allocation of values (Easton); authority\u2019s types and legitimacy\u2019s claim; the state\u2019s definition and its sovereignty; and the approaches\u2019 census — normative against empirical, behavioural, institutional, the political-economy lens — with the science\u2019s method honestly cross-referenced to the Mathematics shelf\u2019s statistics book.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Power and Its Faces',
      'Authority and Legitimacy',
      'The State and Sovereignty',
      'The Approaches\u2019 Census',
    
      'Paper-I 4. Political Organization and Social Control (band, tribe, chiefdom, kingdom and state; power, authority and legitimacy; law and justice in simple societies)',
      'Unit 2: Research Methodology and Methods'
    ],
  },
  {
    number: 2,
    slug: 'the-concepts-of-theory',
    title: 'The Concepts of Political Theory',
    summary:
      'The theory core as contested concepts (the NCERT arc): freedom\u2019s negative and positive readings (Berlin\u2019s two concepts, Gandhi\u2019s freedom as swaraj); equality\u2019s kinds — formal, substantive, of opportunity against outcome; social justice from Rawls\u2019s veil to Ambedkar\u2019s annihilation; rights\u2019 classifications and the rights-duties dialectic; citizenship from the polis to the diaspora; secularism\u2019s western and Indian models; nationalism from Herder to the anti-colonial register — every concept taught as a live argument.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Freedom: Negative and Positive',
      'Equality and Social Justice',
      'Rights and Citizenship',
      'Secularism and Nationalism',
    ],
  },
  {
    number: 3,
    slug: 'ideologies-and-the-economy',
    title: 'Ideologies and the Political Economy',
    summary:
      'The ideologies\u2019 register: liberalism\u2019s classical and social-democratic wings; conservatism\u2019s disposition; socialism from Marx through the social democrats to the actually-existing question; nationalism\u2019s political work; feminism\u2019s waves and the political; ecologism\u2019s deep and shallow greens; the political economy — capitalism\u2019s variants, the globalisation debate (the GS register\u2019s effects-on-society lines cross-referenced to Sociology), the welfare state\u2019s rise and crisis.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Liberalism and Conservatism',
      'Socialism and Its Variants',
      'Feminism, Ecologism, the Newer Currents',
      'The Political Economy and Globalisation',
    ],
  },
  {
    number: 4,
    slug: 'democracy-and-representation',
    title: 'Democracy and Representation',
    summary:
      'Democracy\u2019s models — direct, representative, participatory, deliberative — with legitimacy\u2019s performance crisis; the regime census (democratic, authoritarian, hybrid — the third-wave and its reversals); elections and representation\u2019s theories (the trustee against the delegate, the mandate theory); voting behaviour\u2019s sociological and economic models; parties and party systems (the Sartori census; India\u2019s party system\u2019s evolution from the Congress system to coalition to the present); and the pressure groups, movements and interests — Heywood\u2019s register carried whole.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Democracy\u2019s Models and Legitimacy',
      'Regimes: The Census',
      'Voting, Parties and Party Systems',
      'Groups, Interests and Movements',
      'Civil Liberties, Civil Rights and American Political Culture',
    ],
  },
  {
    number: 5,
    slug: 'constitutions-and-institutions',
    title: 'Constitutions and Institutions',
    summary:
      'The institutional core: constitutions as higher law (codified against uncodified — the Westminster against the US model), the rule of law and judicial review, judges\u2019 role and the appointment debates; executives — presidential against parliamentary, the leadership question; legislatures\u2019 structure, functioning, powers and privileges; the separation of powers and its checks; the comparison of the Indian constitutional scheme with other countries (the GS2 line) — the Westminster inheritance, the US bill of rights, the French laicite as three reference points.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Constitutions and the Rule of Law',
      'Executives and Leadership',
      'Legislatures and the Judiciary',
      'The Comparative Constitutional Glance',
      'Foundations of American Democracy and the Branches of Government',
    ],
  },
  {
    number: 6,
    slug: 'the-indian-constitution',
    title: 'The Indian Constitution',
    summary:
      'The Indian text as politics: the historical underpinnings and evolution (the 1858-1947 acts compressed — the analytical register owned by Law and Legal Studies), the making (the Assembly\u2019s craft), the salient features; the preamble\u2019s keywords argued; the fundamental rights and duties with the DPSP\u2019s balance; the basic-structure doctrine earned from Kesavananda; the amendments\u2019 census; and the working of the rights in the courts — the Laxmikanth-Basu arc with the NCERT Constitution-at-Work pedagogy.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Making and the Salient Features',
      'Rights, Duties and the Directive Principles',
      'The Basic Structure Earned',
      'The Amendments\u2019 Census',
    
      'Unit 7: Pedagogy, Andragogy and Assessment'
    ],
  },
  {
    number: 7,
    slug: 'the-indian-state-working',
    title: 'The Indian State at Work',
    summary:
      'The machinery in action: the union and the states\u2019 functions and responsibilities, the federal structure\u2019s issues and challenges (the GS2 line — fiscal federalism\u2019s devolution priced), the panchayati and municipal devolution; the parliament and state legislatures\u2019 conduct of business; the executive and the judiciary\u2019s structure and functioning; the Representation of People\u2019s Act\u2019s salient features; the constitutional posts and the statutory, regulatory and quasi-judicial bodies\u2019 census.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Federal Structure\u2019s Challenges',
      'The Organs at Work',
      'The RPA and the Elections',
      'The Bodies\u2019 Census',
      'The Union Executive: President, Prime Minister and Council of Ministers',
      'Parliament: Lok Sabha, Rajya Sabha and Committees',
      'The Judiciary and Judicial Review',
      'Federalism, State Governments and Local Bodies',
      'The Election Commission and Electoral Reforms',
      'Constitutional and Statutory Bodies: CAG to UPSC',
    
      'Theories of the State - liberal, neo-liberal, Marxist, pluralist, post-colonial and feminist'
    ],
  },
  {
    number: 8,
    slug: 'identity-politics-india',
    title: 'Identity Politics in India',
    summary:
      'The political culture and the identity register: the political culture-media-identity triangle (Heywood\u2019s chapter priced for India); the caste\u2019s political career from Mandal to the present; the communalism and secularism\u2019s political register (cross-referenced to Sociology\u2019s society chapters); the regionalism and the sons-of-soil; the women\u2019s political representation and the quota debate; and the political socialisation — how Indians become political animals.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Caste\u2019s Political Career',
      'Communalism and Secularism in Politics',
      'Regionalism and the Language Question',
      'Representation and the Quota Debate',
    
      'Paper-II 9. History of Administration of Tribal Areas, Tribal Policies and Programmes of Tribal Development (concept of PTGs; role of NGOs; role of anthropology in tribal and rural development; contributions to the understanding of regionalism, communalism and ethnic and political movements)'
    ],
  },
  {
    number: 9,
    slug: 'indian-political-thought',
    title: 'Indian Political Thought',
    summary:
      'The thought register the UPSC PSIR paper prices: Kautilya\u2019s Arthashastra as statecraft (the mandala theory, the spy system, the danda); the Dharmashastras\u2019 political ideas priced carefully; Gandhi\u2019s swaraj, satyagraha and the oceanic circles; Ambedkar\u2019s annihilation argument, the constitutional morality and the Buddha\u2019s dhamma; Aurobindo\u2019s integral freedom; Vivekananda, Tagore and Savarkar as the modern debate\u2019s poles; and the Western canon\u2019s Indian dialogues — the comparative thought register.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Kautilya and the Arthashastra',
      'Gandhi\u2019s Swaraj and Satyagraha',
      'Ambedkar\u2019s Argument',
      'The Modern Debate\u2019s Poles',
    
      'Indian Political Thought - Dharamshastra, Arthashastra and Buddhist traditions; Sir Syed Ahmed Khan, Sri Aurobindo, M. K. Gandhi, B. R. Ambedkar, M. N. Roy'
    ],
  },
  {
    number: 10,
    slug: 'world-order-and-doorstep',
    title: 'The World Order and the Doorstep',
    summary:
      'The global register named and handed off: multilevel politics (the EU as the case), security\u2019s domestic-international blur, world order and global governance — Heywood\u2019s final chapters are the POINTER (the depth is International Relations\u2019 whole book); the public policy and bureaucracy chapter as the POINTER to Public Administration; and the doorstep — to the comparative politics\u2019 world (the AP US Government units as one reference), to International Relations for the inter-state order, and to the reader\u2019s own political judgement.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Multilevel Politics and Security',
      'The Global Governance Pointer',
      'The Public Policy Pointer',
      'The Doorstep: Judging Politics',
    
      'Unit 9: Globalization',
      'Unit 1: Thinking Geographically',
      'Unit 2: Cognition',
      'Current Affairs, including General Knowledge (national and international current affairs; political events; global environment; sports; awards and personalities; technology and science; cultural events; Indian business environment)'
    ],
  },
]

export const politicalScience: Book = {
  id: 'political-science',
  title: 'Political Science',
  subtitle: 'Power, ideas and the state — from political theory to the working of the Indian Constitution',
  discipline: 'humanities',
  level: 'Secondary school civics → university political science + UPSC/state-PSC/UGC-NET readiness',
  description: 'The discipline in one arc. What politics is (power, authority, legitimacy, the state\u2019s definitions) and the approaches; the political theory core — freedom, equality, social justice, rights, citizenship, secularism, nationalism as CONTESTED concepts each with their thinkers; the ideologies — liberalism, conservatism, socialism, nationalism, feminism, ecologism, with political economy and globalisation; democracy\u2019s models and legitimacy, elections, representation, voting behaviour; constitutions, the rule of law, executives, legislatures, judiciaries and the separation of powers; then the Indian spine: the Constitution\u2019s making, salient features, fundamental rights and duties, the federal structure, parliament, the executive and the judiciary, elections and the RPA, constitutional bodies; parties, pressure groups, political culture and identity politics; Indian political thought (Kautilya, Gandhi, Ambedkar, Aurobindo); the comparative glance; and the world-order pointer. Cross-references International Relations (the world-order depth), Public Administration (the governance machinery) and Law and Legal Studies (the constitutional-law depth) and hands off to the Humanities shelf\u2019s Ethics for public-values register.',
  status: 'planned',
  accent: ['#0e7490', '#155e75'],
  chapters,
}
