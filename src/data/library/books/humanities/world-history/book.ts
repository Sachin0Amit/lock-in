import type { Book, Chapter } from '../../../types'

/**
 * World History — the first book of the Humanities & Social Sciences shelf (History branch).
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 11 chapters /
 * 47 planned lessons, zero written. Lesson ids will use the `wh-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): World History owns the world register — every region, every era, at survey depth. Indian History owns the national register (the two cross-reference at the colonial bridge); International Relations owns the post-1945 order’s political science; the Anthropology book owns the deep human past below writing. The political philosophies (communism, capitalism, socialism) are priced here as history’s engines and cross-referenced to Political Science and Philosophy for their theory.
 *
 * RESEARCH PHASE (2026-11-16):
 * - UPSC CSE GS Paper I (read in full this pass, drishtiias.com/mains/mains-syllabus/general-studies-paper-1): the 'History of the World will include events from 18th century such as Industrial Revolution, world wars, Redrawal of National Boundaries, Colonization, Decolonization, political philosophies like Communism, Capitalism, Socialism etc. — their forms and effect on the society' line is this book's register.
 * - Strayer & Nelson, Ways of the World: A Brief Global History with Sources (the Macmillan/Bedford TOC structure read this pass — the 23-chapter combined-volume arc, Vol 1 chs 1-12, Vol 2 chs 12-23) — store.macmillanlearning.com.
 * - Arjun Dev's NCERT Story of Civilization pair (the old-NCERT world-history arc — the reprint PDF read this pass: the Renaissance through the world wars, the UN, decolonisation) — insightsonindia.com.
 * - Norman Lowe, Mastering Modern World History (Macmillan Master Series — the UPSC-tuned pole, checked this pass via the amazon.com record).
 * - AP World History: Modern (apstudents.collegeboard.org — the nine-unit register read this pass: The Global Tapestry; Networks of Exchange; Land-Based Empires; Transoceanic Interconnections; Revolutions; Consequences of Industrialization; Global Conflict; Cold War and Decolonization; Globalization) supplies the modern spine.
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-historian-s-craft',
    title: 'The Historian\u2019s Craft',
    summary:
      'How history is actually written: primary against secondary sources, the literary against the archaeological register, external and internal criticism of a document, the archaeologist\u2019s sherd against the court chronicle; periodisation as a CONVENTION (the ancient/medieval/modern triad interrogated, not assumed) and the BC/BCE-CE dating census; and the map of this book\u2019s arc stated honestly — why world history is taught as one story and what that choice costs.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'How History Is Written',
      'Sources: Literary and Archaeological',
      'Time, Periodisation and the Calendar',
    ],
  },
  {
    number: 2,
    slug: 'before-1200',
    title: 'The World Before 1200',
    summary:
      'The long runway: the Palaeolithic scatter and the Neolithic revolution (agriculture as the first technology of consequence); the first cities — Mesopotamia, Egypt, the Indus civilisation, Shang China; the classical age of Greece and Rome with its political inventions; the great empires of land and their collapse; the Silk Roads and the Buddhist-Christian-Islamic travels of religion; the world as the 1200 starting line found it — Song China, the Abbasid twilight, feudal Europe, the African kingdoms and the Americas apart.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The First Farmers and Cities',
      'The Classical World: Greece and Rome',
      'The Silk Roads and the Medieval World',
      'The World in 1200: the Starting Line',
    
      'Agriculture - major crops and cropping patterns, irrigation systems, storage, transport and marketing of agricultural produce, e-technology in the aid of farmers; direct and indirect farm subsidies and minimum support prices; Public Distribution System and food security; food processing and related',
      'Unit 6: Consequences of Industrialization'
    ],
  },
  {
    number: 3,
    slug: 'land-based-empires',
    title: 'Land-Based Empires',
    summary:
      'The early-modern land powers: the Ottoman, Safavid and Mughal gunpowder empires with their legitimation craft (the devshirme, the Safavid Shi\u2019a state, Mughal syncretism); Ming-Qing China\u2019s tribute system and the examination state; the Aztec and Inca empires of the Americas; the pastoral-nomadic and forest frontiers; and the fiscal-military logic that let these empires rule vast agrarian interiors before oceanic power rearranged the world.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Gunpowder Empires',
      'Ming-Qing China and the Tribute World',
      'The Aztec and Inca States',
      'Empire\u2019s Legitimation Craft',
    ],
  },
  {
    number: 4,
    slug: 'networks-of-exchange',
    title: 'Networks of Exchange',
    summary:
      'The connective tissue of the pre-1500 world: the Indian Ocean monsoon system with its Gujarati and Swahili merchants; the trans-Saharan caravan routes and Mansa Musa\u2019s gold; the Silk Roads\u2019 goods, technologies and diseases; the diasporas of traders and the spread of religion along the routes; and the growing comparison — the land routes against the sea routes that were about to win.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Indian Ocean World',
      'The Trans-Saharan Caravans',
      'Goods, Technologies, Religions in Motion',
      'The Land and Sea Route Comparison',
    ],
  },
  {
    number: 5,
    slug: 'transoceanic-interconnections',
    title: 'Transoceanic Interconnections',
    summary:
      'The European voyages: the Portuguese around Africa, Columbus west, Magellan\u2019s circumnavigation, the trading-post empire that followed; the Columbian exchange as the world\u2019s biggest biological event (crops, animals, diseases and their demographic earthquakes); the Atlantic system\u2019s beginning with the plantation complex and the rise of the slave trade; and the first global silver economy threading Mexico to Ming China.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Voyages and Their Instruments',
      'The Columbian Exchange',
      'The Atlantic System Begins',
      'The First Global Silver Economy',
    
      'Biological Basis of Behavior'
    ],
  },
  {
    number: 6,
    slug: 'the-atlantic-revolutions',
    title: 'The Atlantic Revolutions',
    summary:
      'The Enlightenment\u2019s ideas and their combustions: the American revolution and its constitutional invention; the French Revolution from the Estates to the Terror, Napoleon and its impact; the Haitian revolution as the only successful slave revolt; the Latin American independence wars under Bolivar and San Martin; the abolition movement\u2019s first wave; and the revolutions\u2019 global echoes — the idea that sovereignty lives in the people crosses the world.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Enlightenment and Its Ideas',
      'America and France',
      'Haiti and Latin America',
      'The Abolition Wave and the Echoes',
    ],
  },
  {
    number: 7,
    slug: 'industry-and-capital',
    title: 'Industry and Capital',
    summary:
      'The industrial revolution: why Britain first (coal, colonies, capital, the patent culture), the factory system, the steam and steel engines, the railway and telegraph shrinking distance; capitalism\u2019s forms and the workers\u2019 world it made (the condition-of-England question, the new cities, the public-health disasters and reforms); socialism as the century\u2019s answer; and the industrial-military engine that armed the coming imperial scramble — the GS1 register\u2019s political-philosophies line begins here.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Why Britain First: the Engines',
      'The Factory World and Its Cities',
      'Capitalism, Socialism and the Century\u2019s Debate',
      'The Industrial-Military Engine',
    ],
  },
  {
    number: 8,
    slug: 'nationalism-and-imperialism',
    title: 'Nationalism and Imperialism',
    summary:
      'The nation-state system: nationalism\u2019s theory and its engines (print, schools, language standardisation), the unifications of Italy and Germany, the multi-national empires\u2019 dilemma; the age of imperialism 1870-1914 — the Scramble for Africa at Berlin\u2019s table, the Raj\u2019s consolidation, China\u2019s century of humiliation, Japan\u2019s Meiji exception; the colonised world\u2019s responses from the Brahmo to the Boxer; and the system\u2019s tension accumulating toward 1914.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Nation-State and Its Engines',
      'Unifications: Italy and Germany',
      'The Scramble and the Age of Imperialism',
      'The Colonised World Responds',
    
      'Globalisation - responses from developed and developing societies'
    ],
  },
  {
    number: 9,
    slug: 'the-world-wars',
    title: 'The World Wars',
    summary:
      'The thirty years\u2019 crisis: the Great War\u2019s causes, course and peace treaties with Wilson\u2019s hope against the mandates; the Russian Revolution from February to October, the civil war and the Soviet experiment; the interwar world — the Depression, fascism and Nazism explained honestly, the League\u2019s failure; the Second World War\u2019s theatres, the Holocaust as its own chapter of grief, the resistance movements, and the war\u2019s end at Hiroshima — the UPSC register\u2019s \u2019world wars\u2019 line carried in full.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Great War and Its Peace',
      'The Russian Revolution',
      'Fascism, Nazism and the Interwar World',
      'The Second World War: Theatres and the Holocaust',
    ],
  },
  {
    number: 10,
    slug: 'cold-war-and-decolonisation',
    title: 'The Cold War and Decolonisation',
    summary:
      'The post-1945 order: the UN\u2019s founding and the Security Council\u2019s arithmetic; the Cold War\u2019s logic, its crises (Berlin, Korea, Cuba, Vietnam) and its arms race; decolonisation across Asia and Africa with the partition\u2019s price, the Bandung spirit and the non-aligned; the redrawal of national boundaries as empires dissolved; the Middle East\u2019s wars and oil; and the Soviet collapse ending the bipolar era — GS1\u2019s decolonisation register in full.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The UN and the Postwar Order',
      'The Cold War\u2019s Crises and Races',
      'Decolonisation and the New Boundaries',
      'The Soviet Collapse',
      'Global Conflict, the Cold War and Decolonization',
    ],
  },
  {
    number: 11,
    slug: 'globalisation-and-doorstep',
    title: 'Globalisation and the Doorstep',
    summary:
      'The world since 1991: globalisation\u2019s dimensions (trade, capital, people, data) and its discontents; the political philosophies\u2019 final accounting — communism\u2019s variants, capitalism\u2019s forms, social democracy\u2019s third way, their forms and effects on society (the GS1 line closed); the climate agenda and the global institutions; the multipolar present with its rising powers; and the doorstep — to Indian History\u2019s post-independence arc (the two books meet at 1947\u2019s bridge), and to International Relations and Political Science for the order\u2019s theory.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Globalisation and Its Discontents',
      'The Political Philosophies Accounted',
      'The Multipolar Present',
      'The Doorstep: India\u2019s Arc and the Order\u2019s Theory',
    ],
  },
]

export const worldHistory: Book = {
  id: 'world-history',
  title: 'World History',
  subtitle: 'From the first farmers to the global age — the human story taught as one connected arc',
  discipline: 'humanities',
  level: 'Secondary school world history → university survey + UPSC/AP exam readiness',
  description: 'The world\u2019s story told as one arc rather than a parade of nations. The historian\u2019s craft first — sources, periodisation, the BC/CE convention, the difference between a document and a ruin; then the pre-1200 world (the Neolithic revolution, the first cities of Mesopotamia, Egypt, the Indus and China, the classical Mediterranean, the Silk Roads); the early-modern crossings (the Ottoman-Safavid-Mughal-Ming-Qing land empires, the Indian Ocean and trans-Saharan exchange networks, the European voyages and the Columbian exchange); the Atlantic revolutions (the Enlightenment, America, France, Haiti, Latin America); the industrial revolution and capitalism\u2019s forms; nationalism and the age of imperialism 1870-1914; the world wars with the Russian Revolution, fascism and the Holocaust; the Cold War, decolonisation and the redrawal of national boundaries; and globalisation with the political philosophies — communism, capitalism, socialism — the UPSC register prices. Cross-references Indian History (the colonial and imperial bridge where the two arcs meet) and hands off to Political Science (the nation-state\u2019s ideas) and to the reader\u2019s own present.',
  status: 'planned',
  accent: ['#b45309', '#78350f'],
  chapters,
}
