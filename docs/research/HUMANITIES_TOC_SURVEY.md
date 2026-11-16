# HUMANITIES TOC SURVEY — the Humanities & Social Sciences shelf's reference evidence base

> Built by the **Humanities & Social Sciences full-shelf planning pass** of
> 2026-11-16 (owner directive: "create all things like you did for engineering
> do it for humanities and social science and languages section"). Same
> machinery as the Mathematics pass (2026-11-10), the Computer Science pass
> (2026-11-15) and the Engineering pass (2026-11-16): the exam anchors read in
> full, every book web-researched against its canonical sources, each subject
> promoted to a complete researched plan (`status: 'planned'` in
> `src/data/library/books/humanities/<slug>/book.ts`). This file is the durable
> record. **Zero lessons were written — planning only.** The book-plans
> themselves are authored in and emitted by
> `scripts/gen_humanities_shelf.py` (the pass's durable generator).

## Method

The Drive holds **no humanities collection** — its subject subfolders are
MATHS, PHYSICS, CHEMISTRY and _DPPs, with the root fully censused by the CS
pass (27 CS sources) and the maths pass (53 sources). Honest census:
**0 humanities sources on the Drive**. Therefore every book in this pass is
**web-researched** (the internet-research method of the 2026-11-11 math gap
pass, the same method the Engineering pass used): every source below was
searched this pass and its TOC/structure actually read — publisher contents
pages opened in full, NCERT textbook PDFs opened at ncert.nic.in, syllabus
pages transcribed verbatim; no TOC line was taken from memory. URLs recorded
below and in `docs/project/SOURCE_LOG.md`.

**The exam anchors.** The Indian anchor is the **UPSC Civil Services (Main)
Examination** register — General Studies Paper I (Indian Heritage and Culture,
History and Geography of the World and Society), Paper II (Governance,
Constitution, Polity, Social Justice and International Relations) and Paper
IV (Ethics, Integrity and Aptitude) read in full from the topic-wise syllabus
pages, plus the optional-subject registers (History, Political Science &
International Relations, Sociology, Psychology, Philosophy, Anthropology,
Public Administration, Geography, Law — every one of the shelf's subjects is a
listed UPSC optional). The NET anchor is the **UGC NET subject register**
(ugcnetonline.in's updated-syllabus list — codes 02 Political Science, 03
Philosophy, 04 Psychology, 05 Sociology, 06 History, 07 Anthropology, 14
Public Administration, 58 Law, 66 Museology & Conservation, 67 Archaeology, 80
Geography, 89 Environmental Sciences, 92 Human Rights and Duties). The
world-exam anchors are the **College Board AP courses** — AP World History:
Modern (nine units), AP Human Geography (seven units), AP Psychology (course
and exam description), AP United States Government and Politics (five units) —
and the **CLAT** undergraduate register (English, current affairs including
general knowledge, legal reasoning with constitutional law and jurisprudence,
logical reasoning, quantitative techniques).

Recording discipline: the records below carry each source's **complete
chapter-level arc** as read this pass, plus the syllabus-audit verdicts. The
plans authored from them are original syntheses in the house manner
(positioning + no-duplication contract + chapters with substantial summaries +
plannedLessons); no publisher or syllabus text is reproduced beyond the
topic-register quotes needed for routing.

## The shelf this evidence base planned

**16 books promoted** to `src/data/library/books/humanities/<slug>/book.ts`,
status 'planned', zero lessons written. The census (pinned by
`scripts/verify-humanities-shelf-planning.ts`): **157 chapters / 620 planned
lessons** across six branches — History (2 books), Polity & Governance (4),
Society (3), Mind (3), Earth (2), Culture & Past (2).

**Six backlog lines fold honestly onto shelf homes** (recorded in
SUBJECT_BACKLOG.md, the engineering pass's fold precedent):
- *Ancient*, *Medieval* and *Modern* (history) → merged into ONE book,
  **indian-history** — the three period names for one national arc (Sharma's
  ancient, Satish Chandra's medieval, Bipan Chandra's modern; the same fold
  pattern as engineering's Circuit Theory + Network Analysis).
- *Human Geography* and *Physical Geography* → merged into ONE book,
  **geography** (the Goh Cheng Leong Certificate arc is exactly this pair in
  one volume; the NCERT class 11/12 pair mirrors it).
- *Heritage Studies* → merged into **archaeology-and-heritage-studies**
  (Renfrew & Bahn's book plus the UGC NET Museology & Conservation register —
  one conservation arc).
- *Art History* (also listed on the future Arts shelf's Visual Arts block) →
  owned here as **art-history** (the academic discipline; the Arts shelf's
  future pass will cross-reference it rather than duplicate).

The per-branch census:

`world-history` (11 ch, wh-) · `indian-history` (12, ih-) ‖
`political-science` (10, pol-) · `international-relations` (9, intl-) ·
`public-administration` (9, padm-) · `law-and-legal-studies` (10, law-) ‖
`sociology` (10, soc-) · `anthropology` (10, anth-) ·
`cultural-studies` (8, cult-) ‖ `psychology` (10, psy-) ·
`philosophy` (10, phil-) · `ethics` (9, eth-) ‖ `geography` (12, geog-) ·
`environmental-studies` (8, evs-) ‖ `archaeology-and-heritage-studies`
(9, arch-) · `art-history` (10, arth-).

All 16 lesson-id prefixes verified unused across every written lesson id AND
distinct from every Mathematics, CS and Engineering shelf prefix (gate
section E — note the near-misses deliberately avoided: the shelf uses `intl-`
because the CS shelf reserves `ir-` for information-retrieval, `geog-`
because the Mathematics shelf reserves `geo-` for its Geometry book, and
`evs-` for environmental STUDIES against the Engineering shelf's `env-`
environmental-engineering).

# The syllabus anchors, read this pass

## UPSC CSE (Main) General Studies Paper I — Indian Heritage and Culture, History and Geography of the World and Society

The full register read from the topic-wise syllabus page
(drishtiias.com/mains/mains-syllabus/general-studies-paper-1, fetched in full
this pass). The syllabus lines, with their routing:

- **Indian Culture — salient aspects of Art Forms, Literature and Architecture
  from ancient to modern times** → **art-history** (paintings, dances, music,
  puppetry, pottery, theatre, martial arts, sculpture, architecture: Harappan
  through Mauryan/Gupta/temple styles/Indo-Islamic/colonial/modern) and
  **indian-history** chs on the Bhakti/Sufi and literature periods.
- **Modern Indian History from about the middle of the eighteenth century
  until the present — significant events, personalities, issues; The Freedom
  Struggle — its various stages and important contributors/contributions from
  different parts of the country; Post-independence Consolidation and
  Reorganization within the country** → **indian-history** chs 7–12 (the whole
  register).
- **History of the World will include events from the 18th century such as
  Industrial Revolution, world wars, Redrawal of National Boundaries,
  Colonization, Decolonization, political philosophies like Communism,
  Capitalism, Socialism — their forms and effect on society** →
  **world-history** chs 5–11 (the whole register).
- **Salient features of Indian Society, Diversity of India; Role of Women and
  Women's Organizations, Population and Associated Issues, Poverty and
  Developmental Issues, Urbanization, their problems and their remedies;
  Effects of Globalization on Indian society; Social Empowerment, Communalism,
  Regionalism & Secularism** → **sociology** chs 8–10 (the Indian-society
  register) with **anthropology** cross-referenced for the human-variation
  depth.
- **Salient features of World's Physical Geography; Distribution of Key
  Natural Resources across the world (including South Asia and the Indian
  sub-continent); factors responsible for the location of primary, secondary
  and tertiary sector industries; Important Geophysical Phenomena such as
  earthquakes, Tsunami, Volcanic activity, cyclone — geographical features
  and their location, changes in critical geographical features (including
  water-bodies and ice-caps) and in flora and fauna and the effects of such
  changes** → **geography** chs 1–12 (the whole register).

## UPSC CSE (Main) General Studies Paper II — Governance, Constitution, Polity, Social Justice and International Relations

The full 20-line register read this pass
(drishtiias.com/mains/mains-syllabus/general-studies-paper-2). Routing:
- Lines 1–9 (Constitution — historical underpinnings, evolution, features,
  amendments, basic structure; Union and States, federal structure, devolution;
  separation of powers; comparison with other countries; Parliament and State
  Legislatures; Executive and Judiciary; Representation of People's Act;
  constitutional posts and bodies; statutory, regulatory and quasi-judicial
  bodies) → **political-science** chs 4–7 + **law-and-legal-studies** chs 3–5
  (the constitutional-law depth).
- Lines 10–16 (Government policies and interventions; development processes
  and the development industry — NGOs, SHGs; welfare schemes; social
  sector/services; poverty and hunger; governance, transparency and
  accountability, e-governance, citizens' charters; role of civil services in
  a democracy) → **public-administration** chs 5–9.
- Lines 17–20 (India and its neighbourhood — relations; bilateral, regional
  and global groupings and agreements involving India; effect of policies and
  politics of developed and developing countries on India's interests, Indian
  diaspora; important international institutions, agencies and fora — their
  structure, mandate) → **international-relations** chs 7–9.

## UPSC CSE (Main) General Studies Paper IV — Ethics, Integrity and Aptitude

The full register read this pass
(drishtiias.com/mains/mains-syllabus/general-studies-paper-4):
- **Ethics and Human Interface** (essence, determinants and consequences of
  ethics in human actions; dimensions of ethics; ethics in private and public
  relationships; human values — lessons from the lives and teachings of great
  leaders, reformers and administrators; role of family, society and
  educational institutions in inculcating values) → **ethics** chs 1–2.
- **Attitude** (content, structure, function; influence and relation with
  thought and behaviour; moral and political attitudes; social influence and
  persuasion) → **ethics** ch 5 (with **psychology** ch 8 cross-referenced for
  the attitude-and-social-influence science).
- **Aptitude and foundational values for civil service — integrity,
  impartiality and non-partisanship, objectivity, dedication to public
  service, empathy, tolerance and compassion towards the weaker sections;
  Emotional intelligence — concepts and their utilities and application in
  administration and governance** → **ethics** chs 4–6.
- **Contributions of moral thinkers and philosophers from India and the
  world** → **ethics** ch 3 (with **philosophy** chs 5–6 cross-referenced —
  the thinkers live there at depth).
- **Public/civil service values and ethics in public administration; probity
  in governance — concept of public service, philosophical basis of governance
  and probity, information sharing and transparency, RTI, codes of ethics and
  conduct, citizens' charters, work culture, quality of service delivery,
  utilization of public funds, challenges of corruption; case studies** →
  **ethics** chs 7–9 (with **public-administration** ch 9 cross-referenced).

## The UPSC optional-subject registers

Every subject of this shelf is a listed UPSC optional (the 48-subject list
checked this pass — History, Law, Philosophy, PSIR, Psychology, Public
Administration, Sociology, Anthropology, Geography all present). The
registers read this pass:
- **History** (selfstudyhistory.com / byjus.com): Paper I — Ancient India
  (sources: archaeological — exploration, excavation, epigraphy, numismatics,
  monuments; literary; the Palaeolithic-Mesolithic-Neolithic survey; Harappan;
  Vedic; the Mahajanapadas to the Mauryas; the Guptas; regional powers); Paper
  II — Medieval and Modern (the Delhi Sultanate, Mughals, Marathas; European
  penetration, the British conquest, the 1857 revolt, the freedom struggle,
  partition) — the register **indian-history** carries in full; Paper II also
  carries world history (Renaissance, Enlightenment, the world wars) →
  cross-referenced to **world-history**.
- **Political Science & International Relations** (nextias.com PDF +
  sleepyclasses PDF read this pass): Paper I — Political Theory and Indian
  Politics (political theory: meaning and approaches; theories of state;
  justice, equality, rights, democracy; political ideologies; Indian
  political thought; Indian government and politics — the Constitution,
  organs, federalism, parties, elections) → **political-science** chs 1–8;
  Paper II — Comparative Political Analysis, International Politics (theories
  of IR), India and the World (foreign policy, neighbourhood, institutions)
  → **international-relations** chs 1–9.
- **Sociology** (upscprep.com): Paper I — Fundamentals of Sociology (the
  discipline — modernity and social changes in Europe and emergence of
  sociology; sociology as a science; research methods and analysis;
  sociological thinkers — Marx, Durkheim, Weber, Parsons, Mead; stratification;
  works; change) → **sociology** chs 1–7; Paper II — Indian Society: Structure
  and Change (perspectives on Indian society, caste, class, kinship, religion,
  demographic structure, change — Sanskritisation, westernisation,
  secularisation, voters and parties, movements) → **sociology** chs 8–10.
- **Psychology** (vajiramandravi.com): Paper I — Foundations of Psychology
  (methods, biological bases, sensation/perception, learning, memory,
  cognition, motivation and emotion, intelligence, personality, attitudes,
  development) → **psychology** chs 1–8; Paper II — Psychology: Issues and
  Applications (psychological measurement, community, environment, IT and
  media, psychology in economic development, work, education, rehabilitation,
  the disadvantaged, integration) → **psychology** chs 9–10.
- **Philosophy** (vajiramandravi.com + testbook PDF): Paper I — History and
  Problems of Philosophy (Indian — the six darshanas, Buddhist and Jain
  philosophy, the Carvaka; Western — Plato, Aristotle, Aquinas, Descartes,
  Spinoza, Leibniz, Locke, Berkeley, Hume, Kant, Hegel, dialectical
  materialism, logical positivism, phenomenology, existentialism) →
  **philosophy** chs 4–7; Paper II — Socio-Political Philosophy and Philosophy
  of Religion (equality, justice, liberty, sovereignty; crime and punishment,
  Danda; gender equality; danda; the nation-state; democracy; socialism;
  secularism; humanism; Gandhi, Ambedkar, Aurobindo; religion — the nature of
  religious experience, proofs for God, evil) → **philosophy** chs 8–9 with
  **ethics** cross-referenced.
- **Anthropology** (drishtiias.com): Paper I — 1.1 Meaning, scope and
  development of anthropology; 1.2 relationships with other disciplines; the
  main branches; evolution; the fossil record; primates; race; marriage;
  kinship; economic and political anthropology; religion; culture and
  personality → **anthropology** chs 1–8; Paper II — Indian anthropology
  (evolution of the Indian culture and civilization; linguistic and
  ethnic stock; caste; tribes; village studies) → **anthropology** chs 9–10.
- **Public Administration** (lukmaanias.net + drishtiias.com): Paper I —
  Administration Theory (introduction: meaning, scope and significance;
  administrative thought — Kautilya, Woodrow Wilson, Weber, Taylor, Fayol,
  Hawthorne, Simon; administrative behaviour — motivation, leadership,
  communication, morale; organizations; accountability and control;
  administrative law; comparative and development administration; planning
  and resource management; policy; financial administration; techniques) →
  **public-administration** chs 1–8; Paper II — Indian administration (the
  Constitution's framework, the PMO and ministries, departments, the civil
  services, state and district administration, local government,
  public-sector reform) → **public-administration** chs 4–9 interleaved.
- **Geography** (drishtiias.com): Paper I — Principles of Geography
  (Geomorphology — factors controlling landform development, endogenetic and
  exogenetic forces; climatology; oceanography; soils; biogeography; the
  perspective in human geography; economic geography; regional planning) →
  **geography** chs 2–10; Paper II — Geography of India (physical aspects,
  resources, agriculture, industry, transport, trade, cultural settings,
  settlements, regional development) → **geography** chs 10–12.
- **Law** (drishtiias.com): Paper I — Constitutional and Administrative Law +
  International Law; Paper II — Law of Crimes (mens rea and actus reus, the
  IPC general principles), Law of Torts, Contract, Commercial Law, and
  contemporary legal developments → **law-and-legal-studies** chs 4–9 (with
  the jurisprudence base in chs 2–3).

## UGC NET — the subject register and the paper-2 units

The updated-syllabus list read at ugcnetonline.in/syllabus-new.php (codes as
above). Unit structures actually read this pass: **Law** — Unit 1 Jurisprudence
(nature and sources of law, schools of jurisprudence), Unit 2 Constitutional
and Administrative Law, the contract/tort/crime/international units (byjus.com
+ ipleaders.in unit-wise pages read); **History** — the ten paper-2 units
(adda247.com: Unit 2 From State to Empire, the dissolution and emergence
lines); **Public Administration** — Unit II Administrative … (adda247.com +
testbook.com); **Sociology** — sociological theories, research methods,
Indian society, stratification, globalisation (testbook.com); **Political
Science** — Unit 1 Political Theory, Unit 2 Political Thought, Unit 3 Indian
Political Thought, Unit 4 Comparative Political Analysis (institutional,
political culture, political economy and new institutionalism; comparative
methods — the unit register checked this pass). The register routes every
subject to its owning book exactly as the UPSC optionals do.

## The world-exam anchors — the College Board AP courses and CLAT

- **AP World History: Modern** (apstudents.collegeboard.org — the nine-unit
  register read this pass): Unit 1 The Global Tapestry (c. 1200–1450), Unit 2
  Networks of Exchange, Unit 3 Land-Based Empires, Unit 4 Transoceanic
  Interconnections, Unit 5 Revolutions, Unit 6 Consequences of
  Industrialization, Unit 7 Global Conflict, Unit 8 Cold War and
  Decolonization, Unit 9 Globalization — the modern-arc spine of
  **world-history** chs 5–11.
- **AP Human Geography** (apstudents.collegeboard.org — seven units read this
  pass): Thinking Geographically; Population and Migration Patterns and
  Processes; Cultural Patterns and Processes; Political Patterns and
  Processes; Agriculture and Rural Land-Use; Cities and Urban Land-Use;
  Industrial and Economic Development — the human-geography half of
  **geography** chs 7–9.
- **AP Psychology** (apcentral.collegeboard.org CED, 186 pages — the college-
  equivalent introduction register): the biological bases, cognition, the
  developmental/social/clinical arc → **psychology** chs 2–8 cross-register.
- **AP United States Government and Politics** (apstudents.collegeboard.org):
  Foundations of American Democracy; Interactions Among Branches of
  Government; Civil Liberties and Civil Rights; American Political Culture;
  Participation — comparative content for **political-science** ch 8.
- **CLAT (UG)** (toprankers.com + law.careers360.com — the five-section
  register read this pass): English (comprehension, grammar, vocabulary),
  current affairs including general knowledge, **legal reasoning** —
  fact-situations requiring the application of legal principles, including
  constitutional law and jurisprudence, logical reasoning (analogies,
  syllogisms), quantitative techniques → **law-and-legal-studies** chs 1–3
  (the reasoning register) with the **languages** shelf's `english` book
  owning the English-comprehension prep (cross-referenced, no duplication).

# The canonical arcs — per-book records

## History branch

- **World History** — Strayer & Nelson, *Ways of the World: A Brief Global
  History with Sources* (the Macmillan/Bedford TOC structure read this pass —
  the combined volume's 23 chapters, Volume 1 chs 1–12 and Volume 2 chs
  12–23: the big-picture arcs — first farmers, the classical age, the Silk
  Roads, the worlds of Christendom and Islam, the early-modern crossings, the
  Atlantic revolutions, industry and empire, the world at war,
  1945 to the present) — store.macmillanlearning.com. Arjun Dev's NCERT
  *The Story of Civilization* pair (the old-NCERT world-history arc —
  insightsonindia.com's reprint PDF read this pass: the Renaissance and
  Reformation through the world wars, the UN, decolonisation) as the Indian
  pole; Norman Lowe, *Mastering Modern World History* (Macmillan Master
  Series, 5e — amazon.com checked this pass) as the UPSC-tuned pole. The AP
  World History: Modern nine-unit register supplies the modern spine. Web-
  checked 2026-11-16.
- **Indian History** (absorbs the backlog's Ancient + Medieval + Modern
  lines — one national arc, three periods) — R.S. Sharma, *India's Ancient
  Past* (the OUP India product page read this pass: frameworks of writing
  history from the beginning to the 7th century — the Palaeolithic–Neolithic
  sequence, the Harappan civilisation, Vedic society, the Mahajanapadas,
  the Mauryas, the Guptas, Harsha) — india.oup.com + the vec.ac.in PDF;
  Satish Chandra, *History of Medieval India 800–1700* (the contents read
  this pass: India and the world; Northern India — age of the three empires
  800–1000; the Cholas; the Delhi Sultanate; the Vijayanagar and Bahmani
  kingdoms; the Mughals — establishment, consolidation, the climax and
  disintegration) — the crpmahavidyalaya.in PDF contents; Bipan Chandra,
  *History of Modern India* (the contents read this pass from the
  archive.org text: The Decline of the Mughal Empire; Indian States and
  Society in the Eighteenth Century; the Beginnings of European Settlements
  … through the National Movement, partition and independence) —
  archive.org. The NCERT *Themes in Indian History* (class 12, Parts I–III —
  the theme-based register: Bricks, Beads and Bones — the Harappan
  civilisation; Kings, Farmers and Towns; Kinship and caste; Thinkers,
  Beliefs and Buildings; Through the Eyes of Travellers; Bhakti-Sufi
  traditions; An Imperial Capital; Colonialism and the countryside; Rebels
  and the Raj; Mahatma Gandhi and the National Movement; Understanding
  Partition; Framing the Constitution) read via the drishtiias +
  insightsonindia PDFs this pass. Web-checked 2026-11-16.

## Polity & Governance branch

- **Political Science** — Heywood, *Politics* (the FULL contents read this
  pass from the Bloomsbury page: What is Politics?; Political Ideas and
  Ideologies; Politics and the State; Democracy and Legitimacy; Regimes and
  Political Systems; Nations and Nationalism; Political Economy and
  Globalization; Politics, Society and Identity; Political Culture and the
  Media; Representation, Elections and Voting; Parties and Party Systems;
  Groups, Interests and Movements; Constitutions, Law and Judges; Political
  Executives and Leadership; Legislatures; Public Policy and Bureaucracy;
  Multilevel Politics; International and Domestic Security; World Order and
  Global Governance) — bloomsbury.com. The Indian poles: the NCERT *Political
  Theory* (class 11 — Political Theory: An Introduction; Freedom; Equality;
  Social Justice; Rights; Citizenship; Nationalism; Secularism … read from
  the drishtiias PDF this pass) + *Indian Constitution at Work* (class 11 —
  Constitution: Why and How; Rights; Election and Representation;
  Executive; Legislature; Judiciary; Federalism; Local Governments …
  ncert.nic.in keps2ps.pdf opened this pass) + M. Laxmikanth's *Indian Polity*
  (the chapter list read this pass: Historical Background; Making of the
  Constitution; Salient Features; Preamble; Union and Its Territory …
  — scribd chapter list) + D.D. Basu's *Introduction to the Constitution of
  India* (the 28e LexisNexis page read this pass — the constitution under
  logical chapters, constitutional history since the Government of India Act
  1858). Web-checked 2026-11-16.
- **International Relations** — Baylis, Smith & Owens, *The Globalization of
  World Politics: An Introduction to International Relations* (the 9e
  chapter register read this pass from learninglink.oup.com — Introduction;
  Globalization and global politics; the rise of the modern international
  order; the international history of the twentieth century; the cold war;
  international law; the UN; the changing world order; the global economy;
  the environment; terrorism; religion; the contested world) + the Library of
  Congress catdir TOC record (catdir.loc.gov) — the OUP arc as the first
  pole. The Indian pole: the NCERT *Contemporary World Politics* (class 12 —
  The Cold War Era; The End of Bipolarity; US Hegemony in World Politics;
  Alternative Centres of Power; Contemporary South Asia; International
  Organisations; Security in the Contemporary World; Environment and Natural
  Resources; Globalisation — the drishtiias PDF opened this pass). The UPSC
  PSIR Paper II + GS2 lines 17–20 register (India and its neighbourhood,
  groupings, diaspora, institutions) as the applied spine. Web-checked
  2026-11-16.
- **Public Administration** — Nicholas Henry, *Public Administration and
  Public Affairs* (the chapter arc read this pass via the google-preview
  contents: Big Democracy, Big Bureaucracy; Paradigms of Public
  Administration — the five-paradigm story; the threads and fabric of
  organizations; the theories of organization; people in organizations;
  the public's information resource; budgets; productivity; the future of
  public administration) + the Indian pole (MoS-based: Laxmikanth's *Public
  Administration* and Sharma & Sadana's arc named) + the UPSC PubAd Paper I
  register (Kautilya to the modern thinkers — Wilson, Weber, Taylor, Fayol,
  Simon — administrative behaviour, accountability and control, the
  development-administration and policy arcs). Web-checked 2026-11-16.
- **Law and Legal Studies** — the jurisprudence pole read via the UGC NET Law
  unit register (Unit 1 Jurisprudence — nature and sources of law, schools of
  jurisprudence) with Salmond's classic named; the constitutional pole —
  D.D. Basu's *Introduction to the Constitution of India* (LexisNexis, 28e —
  the page read this pass) + the UPSC Law optional register (Paper I
  Constitutional and Administrative Law + International Law; Paper II —
  Law of Crimes with mens rea and actus reus, the IPC general principles,
  torts, contract, commercial law); the CLAT UG register (legal reasoning on
  fact-situations, constitutional law and jurisprudence principles — the
  toprankers/careers360 pages read this pass). Web-checked 2026-11-16.

## Society branch

- **Sociology** — Giddens & Sutton, *Sociology* (the 10e contents read this
  pass from politybooks.com: Introduction; What is Sociology?; Studying Social
  Life; Theories and Perspectives; Global Connections; The Environment;
  Cities and Urban Life; … the family, stratification, gender, race,
  education, religion, the media, politics, work, crime — the full
  introductory register; the 9e gs9 page also opened) + the Indian poles:
  the NCERT class 11 *Introducing Sociology* (kesy1ps.pdf opened at
  ncert.nic.in this pass — Sociology and Society; Terms and Concepts; …) and
  class 12 pair *Indian Society* + *Social Change and Development in India*
  (lesy1ps/lesy2ps opened — Introducing Indian Society; Demography; the
  structural-change/cultural-change/The Constitution and Social Change
  chapters read this pass) + the UPSC Sociology optional register
  (Fundamentals + Indian Society: Structure and Change — the
  thinkers-and-concepts spine). Haralambos & Holborn named as the second
  global pole. Web-checked 2026-11-16.
- **Anthropology** — Ember & Ember, *Anthropology* (the FULL 26-chapter
  16e TOC read this pass from the Pearson page: What Is Anthropology?;
  Research Methods; Genetics and Evolution; Human Variation and Adaptation;
  Primates; The First Hominins; Origins of Culture and the Emergence of
  Homo; Homo sapiens; The Upper Paleolithic; Origins of Food Production and
  Settled Life; Origins of Cities and States; Culture and Culture Change;
  Culture and the Individual; Communication and Language; Getting Food;
  Economic Systems; Social Stratification; Sex and Gender; Marriage and the
  Family; Marital Residence and Kinship; Associations; Political Life;
  Religion and Magic; The Arts; Health and Illness; Practicing and Applying
  Anthropology) — pearson.com + the UPSC Anthropology optional register
  (1.1 meaning, scope and development; the branches; the fossil record;
  race; kinship; the Indian-anthropology paper) as the applied spine.
  Haviland named as the second pole. Web-checked 2026-11-16.
- **Cultural Studies** — Barker & Jane, *Cultural Studies: Theory and
  Practice* (the 5e Sage record opened this pass — sk.sagepub.com/book/mono/
  cultural-studies-5e; the part structure read via the google-books contents:
  Part One — An Introduction to Cultural Studies; the linguistic turn;
  culture and ideology; semiotics; Marxism; the subject of culture; the
  culturalist turn; the whole apparatus — audience, identity, ethnicity,
  gender, globalisation, media) + the Indian cross-register (Ambedkarite,
  subaltern and dalit studies named as future depth poles). Web-checked
  2026-11-16.

## Mind branch

- **Psychology** — the NCERT *Psychology* class 12 textbook (lepy1ps.pdf
  opened at ncert.nic.in this pass — seven chapters: Variations in
  Psychological Attributes; Self and Personality; Meeting Life Challenges;
  Psychological Disorders; Therapeutic Approaches; Attitude and Social
  Cognition; Social Influence — plus the class 11 book What is Psychology?,
  methods, sensation, learning, memory, cognition, motivation) + the AP
  Psychology course-and-exam description (apcentral.collegeboard.org — the
  186-page CED register read this pass: the biological bases, sensation and
  perception, cognition — memory, language, thinking; development; social;
  personality; clinical) + the UPSC Psychology optional register (Paper I
  Foundations — methods, biological bases, learning, memory, cognition,
  motivation, intelligence, personality; Paper II Issues and Applications)
  as the applied spine. Myers' *Psychology* (McGraw-Hill editions, 13e named
  via the mheducation search register this pass) as the American pole;
  Baron's *Psychology* named as the Indian-course pole. Web-checked
  2026-11-16.
- **Philosophy** — the Western arc: Russell's *A History of Western
  Philosophy* named as the survey pole (the classic chapters); the UPSC
  Philosophy optional register read this pass (Paper I — the Indian systems:
  the six darshanas, the Carvaka, Buddhist and Jain philosophy, Saivism;
  Western philosophy from Plato and Aristotle through Descartes, Spinoza,
  Leibniz, Locke, Berkeley, Hume, Kant, Hegel, dialectical materialism,
  logical positivism, phenomenology, existentialism; Paper II —
  socio-political philosophy and philosophy of religion). The Indian pole —
  Chatterjee & Datta, *An Introduction to Indian Philosophy* (the Google
  Books record read this pass — the general principles and the
  brief-sketch-of-each-system structure). Web-checked 2026-11-16.
- **Ethics** — Rachels & Rachels, *The Elements of Moral Philosophy* (the
  McGraw-Hill product page read this pass — the TOC: What is Morality?; The
  Challenge of Cultural Relativism; Subjectivism in Ethics; Does Religion
  Define Morality?; … the utilitarian, Kantian and virtue-ethics arcs; the
  applied chapters) — mheducation.com + the UPSC GS4 register (above) as the
  applied spine + Lexicon's *Ethics, Integrity and Aptitude* named as the
  UPSC-tuned Indian pole. No-duplication contract: the philosophy book owns
  the history of moral theory at survey depth; this book owns moral
  philosophy's applied register (the GS4 vocabulary — integrity, probity,
  empathy, EI, case-study craft). Web-checked 2026-11-16.

## Earth branch

- **Geography** (absorbs the backlog's Physical Geography + Human Geography
  lines — the Goh Cheng Leong Certificate pair) — Goh Cheng Leong,
  *Certificate Physical and Human Geography* (the FULL OUP India contents
  read this pass: PART 1 PHYSICAL GEOGRAPHY — The Earth and the Universe; The
  Earth's Crust; Volcanism and Earthquakes; Weathering, Mass Movement and
  Erosion; … the climatology, oceanography and biogeography chapters; PART 2
  — WEATHER, CLIMATE AND VEGETATION; PART 3 — HUMAN GEOGRAPHY — population,
  settlements, economic activities; the 25-chapter/7-part structure) —
  india.oup.com/product/certificate-physical-and-human-geography-9789354975660
  + the NCERT pair: *Fundamentals of Physical Geography* (class 11 —
  Geography as a Discipline; The Origin and Evolution of the Earth; Interior
  of the Earth; Distribution of Oceans and Continents; Geomorphic Processes;
  Landforms and their Evolution; Composition and Structure of the
  Atmosphere; Water in the Atmosphere; World Climate and Climate Change;
  Water Oceans; Movements of Ocean Water; … the kegy2ps.pdf and jagranjosh
  chapter list read this pass) + *India Physical Environment* (class 11,
  kegy1ps.pdf opened) + *Fundamentals of Human Geography* (class 12 — Human
  Geography: Nature and Scope; The World Population; Human Development;
  Primary/Secondary/Tertiary activities; Transport and Communication;
  International Trade — legy101.pdf + the hitbullseye chapter list read this
  pass). The UPSC Geography optional Paper I (Geomorphology — factors
  controlling landform development, endogenetic and exogenetic forces; …)
  and the AP Human Geography seven-unit register as the two exam spines.
  Web-checked 2026-11-16.
- **Environmental Studies** — Erach Bharucha, *Textbook of Environmental
  Studies for Undergraduate Courses* (the UGC/AICTE AEERS textbook — the
  unit structure read this pass: Unit 1 The Multidisciplinary Nature of
  Environmental Studies; Unit 2 Natural Resources — forests, water, mineral,
  food, land and energy resources; Unit 3 Ecosystems; Unit 4 Biodiversity;
  Unit 5 Pollution; Unit 6 Social Issues and the Environment; Unit 7 Human
  Population and the Environment; Unit 8 Field Work — the eight-unit/50-
  lecture structure from the bgc.ac.in PDF + books.google record; the
  universitiespress.com 2025 edition listing read this pass) + the UGC NET
  Environmental Sciences register (code 89) + the UPSC GS register
  (conservation, environmental impact assessment) as the applied spine.
  No-duplication contract: the Engineering shelf's
  **environmental-engineering** owns the treatment-plant engineering (water
  and wastewater quality and treatment, air-pollution control equipment);
  this book owns the environmental-studies curriculum (ecology, resources,
  biodiversity, the social dimension). The future Physics/Biology shelves'
  ecology chapters cross-reference here. Web-checked 2026-11-16.

## Culture & Past branch

- **Archaeology and Heritage Studies** (absorbs the backlog's Heritage
  Studies line) — Renfrew & Bahn, *Archaeology: Theories, Methods and
  Practice* (the chapter arc read this pass via the library-catalogue
  record: The Searches — the history of archaeology; What Is Left? — the
  variety of the evidence; Where? — survey and excavation of sites and
  features; When? — dating methods and chronology; … the social,
  environmental and cognitive archaeologies; the explanation-of-change
  chapters) — the discovered.ed.ac.uk record + the Thames & Hudson editions
  register (amazon/jstor records read this pass) + the UGC NET Archaeology
  (code 67) and Museology & Conservation (code 66) registers as the Indian
  applied spine (the ASI structure, museum studies, conservation science —
  the INTACH/ASI arc named). Web-checked 2026-11-16.
- **Art History** — Gardner's *Art Through the Ages: A Global History* (the
  16e TOC read this pass from the Cengage faculty page: Art in the Stone
  Age; Ancient Mesopotamia and Persia; Egypt from Narmer to Cleopatra; The
  Prehistoric Aegean; Ancient Greece; … the Roman, medieval, Islamic,
  Renaissance, Baroque, the Americas, Asia, the modern and contemporary
  chapters) — faculty.cengage.com/works/9781337630702 + the Indian pole: the
  NCERT *An Introduction to Indian Art Part 1* (class 11 — the drishtiias
  PDF read this pass: the cave-painting tradition from Bhimbetka, the Indus
  seals, the Mauryan Yakshis, the Bharhut/Sanchi/Amaravati reliefs, the
  Gandhara-Mathura-Amravati schools, the Gupta temple styles, the Ajanta
  murals, medieval sculpture schools) + the UPSC GS1 art-and-architecture
  register (Nagara/Dravida/Vesara styles, Indo-Islamic architecture, the
  colonial and modern arcs) as the Indian spine. The future Arts shelf's
  Art-History line folds here (cross-reference, no duplication).
  Web-checked 2026-11-16.

## Routing notes (the cross-shelf contracts)

1. `ir-` is reserved by the CS shelf (information-retrieval) — this shelf's
   International Relations book uses the `intl-` prefix.
2. `geo-` is reserved by the Mathematics shelf (geometry) — this shelf's
   Geography book uses the `geog-` prefix.
3. `env-` is reserved by the Engineering shelf (environmental-engineering) —
   this shelf's Environmental Studies book uses the `evs-` prefix and owns
   the AEERS curriculum; the engineering book owns the treatment engineering.
4. The Mathematics shelf's `statistics` book owns the statistical-science
   method (sampling, hypothesis testing) — the sociology and psychology
   books' research-methods chapters cross-reference it rather than re-teach.
5. The CS shelf's `human-computer-interaction` and the psychology book's
   cognition chapters cross-reference (cognitive science is a border town).
6. The Languages shelf's `english` book owns English-language exam prep
   (IELTS/TOEFL/CLEP-style comprehension) — the law book's CLAT-English lines
   cross-reference it.
7. The future Biology shelf will own organismal ecology; this shelf's
   environmental-studies owns the human-dimension curriculum — the contract
   mirrors engineering's renewable-energy/environmental-engineering split.
8. World-history owns the world register; indian-history owns the national
   register (three folded period lines); the two cross-reference at the
   colonial/imperial bridge.
9. Ethics owns the GS4 applied register; philosophy owns the history of
   philosophy incl. moral theory at survey depth (the PSIR-adjacent
   political-philosophy register lives in philosophy ch 8 with political
   science cross-referenced).
10. Art-history owns the academic discipline (world + India); the Arts,
    Music & Creation shelf's future pass cross-references it for the
    practice-side crafts (drawing, painting technique).
