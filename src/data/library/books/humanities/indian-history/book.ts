import type { Book, Chapter } from '../../../types'

/**
 * Indian History — the second book of the History branch (absorbs the backlog’s Ancient, Medieval and Modern lines — three period names, one national arc).
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 12 chapters /
 * 53 planned lessons, zero written. Lesson ids will use the `ih-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): Indian History owns the national register — ancient, medieval and modern as ONE arc (the three folded backlog lines). World History owns the world register (the colonial/imperial bridge cross-referenced both ways); Art History owns the artistic object register and Archaeology the material record; the Constitution’s own history belongs to Political Science with the 1858-1947 acts cross-referenced there; post-independence polity is Political Science’s ch 7 register with this book carrying the narrative.
 *
 * RESEARCH PHASE (2026-11-16):
 * - UPSC CSE GS Paper I (read in full this pass): the Modern Indian History, Freedom Struggle and Post-independence Consolidation and Reorganization lines are this book's modern register; the Indian Culture line routes to Art History with this book's culture thread pointing there.
 * - UPSC History optional register (read this pass — selfstudyhistory.com + byjus.com): Paper I Ancient India (sources, Palaeolithic-Harappan-Vedic, the Mahajanapadas, Mauryas, Guptas) + Paper II Medieval and Modern (the Sultanate, the Mughals, the British conquest, the national movement, partition) — the whole register is this book's spine.
 * - R.S. Sharma, India's Ancient Past (OUP India — the product page read this pass; the arc from the beginning to the 7th century) — india.oup.com.
 * - Satish Chandra, History of Medieval India 800-1700 (the contents read this pass — India and the World; the Age of the Three Empires; the Delhi Sultanate; the Mughals' establishment, consolidation, climax and disintegration) — the crpmahavidyalaya.in PDF contents.
 * - Bipan Chandra, History of Modern India (the contents read this pass from the archive.org text — the Decline of the Mughal Empire through the National Movement and independence) — archive.org.
 * - NCERT Themes in Indian History class 12 Parts I-III (the theme register read this pass via the drishtiias/insightsonindia PDFs: Bricks Beads and Bones; Kings Farmers and Towns; Kinship and Caste; Thinkers Beliefs and Buildings; Bhakti-Sufi Traditions; An Imperial Capital; Colonialism and the Countryside; Rebels and the Raj; Mahatma Gandhi and the National Movement; Understanding Partition; Framing the Constitution).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-sources-and-periodisation',
    title: 'The Sources and the Periodisation',
    summary:
      'India\u2019s history\u2019s evidence: the archaeological register (sites, inscriptions, coins, monuments), the literary register (the Vedas to the medieval chronicles, their dating problems), the foreign accounts (Megasthenes, Fa-Hien, Hiuen Tsang, Al-Biruni and the Europeans); the periodisation debate — the ancient/medieval/modern triad as a colonial-era convention interrogated honestly against the indigenist alternatives; and the map of this book\u2019s twelve-chapter arc.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Three Registers of Evidence',
      'The Foreign Accounts',
      'The Periodisation Debate',
      'Chapter III. Three Doctors of the Church',
      'Chapter V. The Fifth and Sixth Centuries'
    ],
  },
  {
    number: 2,
    slug: 'prehistoric-and-harappan',
    title: 'Prehistoric and Harappan India',
    summary:
      'The Palaeolithic stations of the subcontinent (the Sohan and Madras industries), the Mesolithic microliths and the Neolithic-chalcolithic villages of the Deccan and the Ganga valley; the Harappan civilisation in full — town planning (the grid, the great bath, the drainage), society and economy (the seals, the weights, the trade with Mesopotamia), the major sites\u2019 census, the script\u2019s undeciphered honesty, and the decline\u2019s competing theories (climate, the river\u2019s shift, the \u2019Aryan\u2019 question retired carefully).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Stone-Age Sequence',
      'The Harappan Town and Its Craft',
      'The Sites and the Script',
      'The Decline Question',
    
      'Paper-II 1. Evolution of the Indian Culture and Civilization (prehistoric and protohistoric cultures; pre-Harappan, Harappan and post-Harappan; palaeo-anthropological evidences from India; ethno-archaeology in India)'
    ],
  },
  {
    number: 3,
    slug: 'vedic-and-the-second-urbanisation',
    title: 'The Vedic World and the Second Urbanisation',
    summary:
      'The Vedic corpus as social evidence — the Rigveda\u2019s pastoral world, the later Vedic\u2019s agrarian turn, the varna system\u2019s elaboration, the Upanishadic turn of thought; the sixth-century BCE\u2019s second urbanisation (the Ganga cities, iron, coinage) and its two great dissents — Mahavira\u2019s Jainism and the Buddha\u2019s path with their sanghas and the Pali canon; and the sixteen Mahajanapadas\u2019 politics ending at the Nandas.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Vedic Corpus as Evidence',
      'Buddhism and Jainism',
      'The Mahajanapadas and the Nandas',
      'Sixth Edition',
      'Preface to the Sixth Edition (continued — signed M. Laxmikanth)'
    ],
  },
  {
    number: 4,
    slug: 'from-mauryas-to-guptas',
    title: 'From the Mauryas to the Guptas',
    summary:
      'The Mauryan empire: Chandragupta and Kautilya\u2019s Arthashastra, Ashoka\u2019s inscriptions and dhamma, the administration-economy-art census and Megasthenes\u2019 account; the post-Mauryan arrivals — the Indo-Greeks, the Shakas, the Kushanas and the Satavahanas with the three art schools (Gandhara, Mathura, Amaravati); the imperial Guptas\u2019 golden-age question priced honestly (administration, the sciences, the arts); and Harsha\u2019s Kanauj as the ancient arc\u2019s close.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Mauryan State and Ashoka\u2019s Dhamma',
      'The Post-Mauryan World and the Art Schools',
      'The Guptas and the Golden-Age Question',
      'Harsha and the Arc\u2019s Close',
    ],
  },
  {
    number: 5,
    slug: 'the-early-medieval-south',
    title: 'The Early Medieval South',
    summary:
      'The peninsular powers the northern chronicles skip: the Age of the Three Empires (800-1000) — the Rashtrakutas, the Pratiharas and the Palas in their tripartite struggle; the Cholas\u2019 state (the village assemblies\u2019 uttaramerur evidence, the navy, the Rajendra raids), the temple as the era\u2019s economic and cultural engine; the southeast-Asian cultural reach (the Pallava-Chola hands in the Khmer and Srivijaya worlds); and the regional kingdoms\u2019 census across the peninsula.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Tripartite Struggle',
      'The Chola State and Its Assemblies',
      'The Temple as Engine',
      'The Southeast-Asian Reach',
    ],
  },
  {
    number: 6,
    slug: 'the-delhi-sultanate',
    title: 'The Delhi Sultanate',
    summary:
      'The five dynasties — the Mamluks, the Khaljis, the Tughlaqs, the Sayyids and the Lodis — with their character (the market reforms and the capital experiments priced as both bold and failed); the Sultanate\u2019s administration (iqta, the ministries), its economy and its society; the Mongol containment; the Sultanate\u2019s architecture (the arch and the dome arrive — the Qutb, the Lodi tombs); and the peninsular answer — Vijayanagar and the Bahmanis\u2019 long duel.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Five Dynasties',
      'Administration, Economy and Society',
      'The Sultanate\u2019s Architecture',
      'Vijayanagar and the Bahmanis',
    ],
  },
  {
    number: 7,
    slug: 'the-mughal-empire',
    title: 'The Mughal Empire',
    summary:
      'Babur to Aurangzeb as one arc: the establishment (Panipat, the Humayun interregnum, Sher Shah\u2019s administration), Akbar\u2019s synthesis (the sulah-i-kul, the mansabdari engine, the Rajput alliance), Jahangir and Shah Jahan\u2019s culture, Aurangzeb\u2019s expansion and its costs; the empire\u2019s institutions priced (the jagir crisis honestly); the art-and-architecture register (the Fatehpur Sikri, the Taj, the atelier) with the depth handed to Art History; the Rajputs and the Marathas\u2019 rise (Shivaji\u2019s swarajya); and the decline\u2019s historiography.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Establishment and Akbar\u2019s Synthesis',
      'The Mansabdari Engine',
      'The Culture Register',
      'The Marathas and the Decline\u2019s Historiography',
    ],
  },
  {
    number: 8,
    slug: 'the-eighteenth-century',
    title: 'The Eighteenth Century',
    summary:
      'The post-Mughal regional order — the successor states (Bengal, Awadh, Hyderabad, the Sikhs, the Jats, the Rohillas) and the eighteenth-century debate (was it a \u2019dark age\u2019? no — priced against the scholarship); the European companies\u2019 arrival as traders; the Carnatic wars; Plassey and Buxar as the conquest\u2019s hinge; the British consolidation\u2019s policies and their economic, administrative and socio-cultural impact (the drain priced honestly) — the bridge where this book and World History\u2019s imperial arc meet.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Successor States',
      'The Carnatic Wars and the Companies',
      'Plassey and Buxar',
      'The Impact of the Conquest',
    ],
  },
  {
    number: 9,
    slug: 'colonial-rule-and-response',
    title: 'Colonial Rule and the Response',
    summary:
      'The colonial state\u2019s construction: the acts from 1773 to 1858 and the Crown\u2019s Raj (the Political Science book owns the constitutional history\u2019s analytical register); the socio-religious reform movements (Raja Rammohan Roy, the Brahmo Samaj, the Arya Samaj, the Aligarh movement, the Singh Sabha — the reform-and-revival distinction); the deindustrialisation and the railways\u2019 double face; and the 1857 revolt in full — causes, leaders, nature, suppression, consequences (the GS1 line carried verbatim in spirit).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Acts and the Raj\u2019s Construction',
      'The Reform and the Revival Movements',
      'The 1857 Revolt and Its Consequences',
      'The Rise of Indian Nationalism and the Moderates',
      'The Gandhian Phase and Mass Movements',
      'The Constitution, Partition and Integration of States',
      'Pages 3–32: body text of that same history book (Chapter 1: The Revolt of 1857 — Economic Causes, Political Causes, Administrative Causes, Socio-Religious Causes, Influence of Outside Events, Discontent Among Sepoys, Beginning and Spread, Storm Centres and Leaders of the Revolt, Suppression of'
    ],
  },
  {
    number: 10,
    slug: 'the-freedom-struggle',
    title: 'The Freedom Struggle',
    summary:
      'The national movement\u2019s whole arc as the GS1 register demands: the growth of nationalism (the unification\u2019s engines — railways, press, education), the Moderates\u2019 era, the Swadeshi and the Surat split, the revolutionary activities, Gandhi\u2019s arrival and the Rowlatt-Jallianwala hinge, Non-Cooperation, the Swarajists and No-Changers, the Civil Disobedience and the Salt March, the Round Tables and the Act of 1935, the provincial ministries, the Left (the CSP, the trade unions), the INA and Subhas Bose, the Quit India and the Cabinet Mission, and partition with independence — the contributors from every part of the country priced.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Nationalism\u2019s Engines and the Moderates',
      'Gandhi\u2019s Arrival and the Mass Movements',
      'The Left, the Revolutionaries and the INA',
      'Towards Freedom and Partition',
      'The Contributors From Every Region',
      'Modern Indian History: The Significant Events, Personalities and Issues',
    
      'Unit 4: Teacher Education'
    ],
  },
  {
    number: 11,
    slug: 'post-independence-india',
    title: 'Post-Independence India',
    summary:
      'The republic\u2019s narrative decades (the analytical polity belongs to Political Science; the story lives here): partition\u2019s aftermath and the princely states\u2019 integration (Patel and Menon\u2019s craft), the linguistic reorganisation, the official-language question, the Constitution\u2019s framing and framing moments (cross-referenced), the planned economy and the Green Revolution, the wars with China and Pakistan and the nuclear turn, the non-aligned foreign policy (cross-referenced to International Relations), the Emergency, the coalition era and the LPG reforms — the GS1 \u2019post-independence consolidation and reorganisation\u2019 line carried in full.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Integration and Reorganisation',
      'The Planned Economy and the Green Revolution',
      'The Wars and the Foreign-Policy Arc',
      'The Emergency, Coalitions and the Reforms',
    ],
  },
  {
    number: 12,
    slug: 'culture-thread-and-doorstep',
    title: 'The Culture Thread and the Doorstep',
    summary:
      'The long thread that ran through every chapter — the art forms, literature and architecture from the Bhakti-Sufi worlds to the modern renaissance — gathered as one register and handed to Art History for the object-level depth and to Cultural Studies for the contemporary; the synthesis map of the whole chronicle; and the doorstep — to Political Science (the Constitution), to World History (the imperial arc this story was embedded in), and to the reader\u2019s own family as the arc\u2019s living continuation.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Long Culture Thread',
      'The Synthesis: One Chronicle',
      'The Doorstep: the Republic and Beyond',
      'Part I. From the Renaissance to Hume'
    ],
  },
]

export const indianHistory: Book = {
  id: 'indian-history',
  title: 'Indian History',
  subtitle: 'The subcontinent\u2019s whole arc — stone age to republic — in one connected chronicle',
  discipline: 'humanities',
  level: 'Secondary school Indian history → university survey + UPSC/state-PSC exam readiness',
  description: 'India\u2019s past as one national chronicle across the folded three periods. The sources\u2019 craft first (archaeological, literary and foreign accounts, the periodisation debate); the prehistoric and Harappan foundations; the Vedic world and the second urbanisation with Buddhism and Jainism; the Mahajanapadas to the Mauryan empire (Ashoka\u2019s dhamma, the Arthashastra, Megasthenes) and the post-Mauryan worlds through the Guptas and Harsha; the early-medieval south (the Chola triad\u2019s age, the southeast-Asian reach); the Delhi Sultanate\u2019s five dynasties with the Vijayanagar-Bahmani south; the Mughal empire\u2019s establishment, administration and culture and its decline; the eighteenth century\u2019s regional powers and the European penetration (Plassey and Buxar); colonial rule, the reform movements and the 1857 revolt; the freedom struggle\u2019s full arc from the Moderates to Gandhi\u2019s mass movements, the revolutionaries and the INA, partition and independence; post-independence consolidation, reorganisation and the republic\u2019s decades; and the art-and-culture thread that runs the whole length. Cross-references World History (the imperial bridge) and hands off to Art History (the object register), Archaeology (the material record) and Political Science (the Constitution\u2019s history).',
  status: 'planned',
  accent: ['#be123c', '#881337'],
  chapters,
}
