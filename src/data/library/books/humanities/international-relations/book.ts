import type { Book, Chapter } from '../../../types'

/**
 * International Relations — the second book of the Polity & Governance branch.
 *
 * STATUS: PLANNED (Humanities & Social Sciences full-shelf planning pass, 2026-11-16) — 9 chapters /
 * 43 planned lessons, zero written. Lesson ids will use the `intl-` prefix
 * (verified unused across all existing lesson ids).
 *
 * POSITIONING (no-duplication contract): International Relations owns the inter-state register. Political Science owns the domestic theory (the two books cross-reference at the world-order chapters — Heywood’s pointer chapters live there, the depth lives here); World History owns the 1919-1991 narrative register (the cold-war history is priced there, the cold-war THEORY here); the Economics shelf’s future books will own the economic theory this book’s IPE chapters only apply; the Sociology book’s globalisation chapter is the social reading, this book the political.
 *
 * RESEARCH PHASE (2026-11-16):
 * - Baylis, Smith & Owens, The Globalization of World Politics 9e (the chapter register read this pass — learninglink.oup.com's chapter list + the Library of Congress catdir TOC record catdir.loc.gov/catdir/toc/ecip082/2007040813.html) — the OUP arc as the first pole.
 * - NCERT Contemporary World Politics class 12 (the drishtiias PDF opened this pass — The Cold War Era; The End of Bipolarity; US Hegemony; Alternative Centres of Power; Contemporary South Asia; International Organisations; Security in the Contemporary World; Environment and Natural Resources; Globalisation) as the Indian school pole.
 * - UPSC CSE GS Paper II lines 17-20 (read in full this pass — India and its neighbourhood; bilateral regional and global groupings; the policies and politics of developed and developing countries on India; the Indian diaspora; the international institutions' structure and mandate) as the applied spine.
 * - The PSIR optional Paper II register (read this pass — the nextias.com/sleepyclasses.com PDFs: comparative political analysis, international politics, India and the world).
 */
const chapters: Chapter[] = [
  {
    number: 1,
    slug: 'the-discipline-ir',
    title: 'The Discipline of IR',
    summary:
      'The field\u2019s own story: international relations born as a discipline from the First World War\u2019s rubble (the 1919 Aberystwyth chair, the idealist-first age priced honestly); the core problem — anarchy (no world government, the self-help world) with the Westphalian myth interrogated (1648\u2019s treaty read against its historiography); sovereignty\u2019s meanings; and the levels of analysis (the individual, the state, the system — Waltz\u2019s three images) as the book\u2019s analytic spine.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Birth From the Great War',
      'Anarchy and the Self-Help World',
      'The Westphalian Myth Interrogated',
      'The Levels of Analysis',
    
      'Federalism - constitutional provisions; changing nature of centre-state relations; integrationist tendencies and regional aspirations; inter-state disputes',
      'Approaches to the Study of International Relations - idealist, realist, Marxist, functionalist and systems theory',
      'Regionalisation of World Politics - EU, ASEAN, APEC, SAARC, NAFTA'
    ],
  },
  {
    number: 2,
    slug: 'the-theories',
    title: 'The Theories of IR',
    summary:
      'The theoretical register in full: realism from Thucydides and Machiavelli through Morgenthau to neo-realism (Waltz\u2019s structure) and the offensive-defensive debate; liberalism — the Kantian tripod, interdependence, the democratic peace; the English School\u2019s international society; constructivism\u2019s Wendtian turn (anarchy is what states make of it); the radical family — Marxism, dependency, world-systems; feminism and gender in IR; the post-positivist and critical turn — every theory taught with its counter.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Classical and Neo-Realism',
      'Liberalism and the Democratic Peace',
      'The English School and Constructivism',
      'The Radical Family and the Critical Turn',
    ],
  },
  {
    number: 3,
    slug: 'war-and-security',
    title: 'War and Security',
    summary:
      'Security\u2019s register: war\u2019s causes priced (the levels applied — Thucydides\u2019 fear-honour-interest to the bargaining model); the security dilemma and the offence-defence balance; deterrence\u2019s logic and its nuclear age (the stability-instability paradox named); terrorism and the WMD proliferation; collective security\u2019s idea and its record (the League\u2019s failure priced); and the changing security concept — the Buzan widening from state to human (the NCERT security chapter\u2019s arc).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'War\u2019s Causes Priced',
      'Deterrence and the Nuclear Logic',
      'Terrorism, Proliferation, Collective Security',
      'The Widening of Security',
    ],
  },
  {
    number: 4,
    slug: 'the-international-history',
    title: 'The International History Register',
    summary:
      'The order\u2019s past told as IR (the narrative depth owned by World History, the interstate logic here): the modern international order\u2019s rise from the European concert; the thirty-years crisis 1919-1949 (Versailles, the League, the appeasement); the cold war\u2019s structure (the containment, the crises, the détente and the ending — the NCERT cold-war chapters as the spine); the post-cold-war unipolar moment; and the present multipolar question — each era read through the theories of chapter two.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Concert to the Thirty-Years Crisis',
      'The Cold War\u2019s Structure',
      'The Unipolar Moment',
      'The Multipolar Question',
    ],
  },
  {
    number: 5,
    slug: 'international-law-and-organisation',
    title: 'International Law and Organisation',
    summary:
      'The legal-institutional register: international law\u2019s sources and its enforcement problem (the anarchy\u2019s law); the treaties\u2019 life and the states\u2019 consent; the UN system in full — the Charter\u2019s structure, the Security Council\u2019s arithmetic and the veto, the Assembly, the Secretary-General\u2019s political role, the peacekeeping\u2019s record, the reform debate; the special agencies\u2019 census (the WHO, the ILO, the UNICEF family); the regional organisations (the EU\u2019s sui generis, the ASEAN, the African Union); and the NGOs and the global civil society — the GS2 \u2019international institutions, agencies and fora — their structure and mandate\u2019 line carried in full.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'International Law in an Anarchy',
      'The UN System',
      'The Regional Bodies\u2019 Census',
      'The NGOs and the Global Civil Society',
    
      'Security - linkages between development and spread of extremism; role of external state and non-state actors in internal security challenges; communication networks, media and social networking sites in internal security, basics of cyber security; money-laundering and its prevention; border',
      'United Nations - envisaged role and actual record; specialised UN agencies; need for UN reforms'
    ],
  },
  {
    number: 6,
    slug: 'the-global-economy',
    title: 'The Global Political Economy',
    summary:
      'IPE\u2019s register: trade\u2019s regimes from the GATT to the WTO (the dispute settlement priced); finance\u2019s order — the Bretton Woods system, its collapse, the IMF and the World Bank\u2019s roles and their critiques; the global production\u2019s chains and the South\u2019s development question (the dependency register revisited); the sanctions\u2019 weapon; and the economic statecraft\u2019s present (the weaponised interdependence named) — the economic THEORY is cross-referenced to the Economics shelf\u2019s future books, this book owns the political reading.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'Trade: From GATT to the WTO',
      'The Bretton Woods Family',
      'Development\u2019s Political Economy',
      'The Sanctions and the Weaponised Interdependence',
    
      'Evolution of the International Economic System - from Brettonwoods to WTO; socialist economies and the CMEA; Third World demand for a new international economic order',
      'India and the Global South - relations with Africa and Latin America; leadership role in NIEO and WTO negotiations'
    ],
  },
  {
    number: 7,
    slug: 'environment-and-human-security',
    title: 'The Environment and Human Security',
    summary:
      'The agenda\u2019s widening: the climate regime\u2019s history (the IPCC, the UNFCCC, the Paris architecture and its loss-and-damage debate); the environmental negotiations\u2019 North-South structure; the migration and refugee regime (the 1951 convention\u2019s limits); the health security register (the pandemic as the security event); the human security doctrine\u2019s rise and its critique; and the resources — water, energy, the rare earths as the geopolitical stakes.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Climate Regime\u2019s Architecture',
      'The Migration and Refugee Regime',
      'Health and Human Security',
      'Resources as Stakes',
    ],
  },
  {
    number: 8,
    slug: 'india-and-the-world',
    title: 'India and the World',
    summary:
      'The applied register (GS2 lines 17-20 in full): India\u2019s foreign policy evolution — the Nehruvian non-alignment and Panchsheel, the 1962-1971 wars\u2019 lessons, the nuclear turn, the post-cold-war reorientation, the present multi-alignment; India and its neighbourhood — the Pakistan, China, Nepal, Bangladesh, Sri Lanka, Maldives, Myanmar, Afghanistan relations priced as a set; the diaspora\u2019s policy (the GS2 line); and the groupings — from the BRICS and SCO to the Quad and the I2U2 with the multilateral ledger (the NSG bid, the G20 host\u2019s arc).',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Foreign Policy\u2019s Evolution',
      'The Neighbourhood as a Set',
      'The Diaspora\u2019s Policy',
      'The Groupings and the Multilateral Ledger',
    ],
  },
  {
    number: 9,
    slug: 'world-order-and-doorstep',
    title: 'The World Order and the Doorstep',
    summary:
      'The changing order\u2019s synthesis: the rise of China as the system\u2019s biggest question (the Thucydides trap\u2019s framing priced honestly); the Russia-West rupture and the Ukraine war\u2019s order effects; the global South\u2019s claim; the technology and the order (the chips, the AI — the CS shelf\u2019s books cross-referenced for the tech); globalisation\u2019s political future; and the doorstep — to Political Science for the domestic twin, to World History for the past, to the reader\u2019s own newsfeed as the living text this whole book was written to help read.',
    status: 'planned',
    lessons: [],
    plannedLessons: [
      'The Rise of China and the Order',
      'The Ruptures and the Global South',
      'Technology and the Order',
      'The Doorstep: Reading the Newsfeed',
    ],
  },
]

export const internationalRelations: Book = {
  id: 'international-relations',
  title: 'International Relations',
  subtitle: 'Anarchy and its institutions — the theory and practice of the inter-state world',
  discipline: 'humanities',
  level: 'Secondary school civics → university IR + UPSC (PSIR paper 2, GS-II lines) readiness',
  description: 'The inter-state world as its own discipline. The field\u2019s birth (the Great War\u2019s shock, the 1919 chairs) and its levels of analysis; the theories in full — realism classical and neo-, liberalism and the democratic peace, the English School, constructivism, Marxism and the critical theories, feminism, the post-positivist turn; war and security (the causes of war, the security dilemma, terrorism and WMD, collective security); the international history register (the modern order\u2019s rise, the thirty-years crisis, the cold war — the NCERT Contemporary World Politics arc); international law and organisation (the UN system, the special agencies, the regional bodies, the NGOs); the global political economy (trade, finance, the WTO-IMF-World Bank trio, development\u2019s regime); the environment and the human-security agenda; India and the world (the foreign policy\u2019s evolution, the neighbourhood, the groupings, the diaspora — the GS2 lines 17-20 in full); the world order\u2019s change; and the doorstep. Cross-references Political Science (the theory\u2019s domestic twin) and World History (the order\u2019s past) and hands off to the reader\u2019s newsfeed.',
  status: 'planned',
  accent: ['#2563eb', '#1e40af'],
  chapters,
}
