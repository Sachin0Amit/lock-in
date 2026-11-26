/* part-cf5R - lesson 5.R 'Unit 5 Completion Review' (the chapter-closing review).
   Harvest numbers carried VERBATIM from the three content seats (5.1-5.3);
   the review invents no numbers, it restates the chapter at bench speed.
   Helpers prefixed cf5R so the four chapter parts never collide. */
import type { Lesson } from '../../../src/data/library/types'

/* palette (vivid set; never blue/indigo) */
const c5R = {
  struct: '#16a34a', ink: '#166534', mid: '#65a30d', teal: '#0d9488',
  tealInk: '#0f766e', conn: '#d97706', accent: '#ea580c', warn: '#dc2626',
  panelA: '#ffedd5', panelB: '#fef3c7', faint: '#5eead4', white: '#ffffff',
  paper: '#fffdf5',
}
const f5R = 'ui-sans-serif, system-ui, sans-serif'

export const lesson5R: Lesson = {
  id: 'cf-unit-5-completion-review',
  number: '5.R',
  title: 'Unit 5 Completion Review',
  concepts: [
    'the chapter in one map: the two-family tree - system side and application side joined by the craft bridge',
    'the 24-entry catalogue: 5 OS jobs, 6 utilities, 7 worker families, 6 licence kinds',
    'the cross-lesson threads: one program\'s journey, the classify-12 roster, the boot-to-login walk',
    'the honest re-checks: time-slicing at 0.005%, the 2,600-cell grid, 20.3125 KiB, 25 years to parity, the EOL spans',
    'the formula and vocabulary harvest of the chapter',
    'the mixed bench: fifteen exam-style questions across all three lessons',
    'the doorsteps recap: what chapter 5 deliberately left closed',
  ],
  objectives: [
    'By the end of this lesson you can redraw the chapter\'s one map - the two families joined by the craft bridge, 24 catalogued entries placed - from memory.',
    'By the end of this lesson you can restate the chapter\'s engine-pinned censuses cold: the four-layer stack, the five jobs, the six utilities, the seven families, the six licences.',
    'By the end of this lesson you can chain the lessons in one move - a licence choice to an install census to a semver walk - without putting the pencil down.',
    'By the end of this lesson you can re-derive the chapter\'s arithmetic witnesses: 120 orderings, 0.005% overhead, 2,600 cells, 20.3125 KiB, 25 years to parity.',
    'By the end of this lesson you can sit the mixed bench: fifteen questions across all three lessons, at least three of them honest exam-style asks.',
  ],
  prerequisites: [
    'cf-system-software-the-manager-layer',
    'cf-application-software-the-worker-families',
    'cf-installing-updating-and-licensing-honestly',
  ],
  sources: ['cs-cf-web-ground-ch05'],
  blocks: [
    // ---------- the opening ----------
    { kind: 'para', text: 'Three lessons ago this chapter owned nothing but a working machine and a question: what actually RUNS on it, and on what terms does the running become yours? Lesson 5.1, \'System Software: The Manager Layer\', answered from the platform side - the four-layer stack, the operating system\'s five visible jobs, the six utilities, the drivers, the firmware, and the five-stage boot chain that hands a dead machine its manager. Lesson 5.2, \'Application Software: The Worker Families\', answered from the work side - seven families of workers, three uniforms for the same worker, and the spreadsheet studied close enough to count its cells. Lesson 5.3, \'Installing, Updating and Licensing Honestly\', answered from the craft side - the five-step install census, the three ways to bring software home, semantic versioning, the six licence families and the four freedoms. Three lessons plus this review: the chapter ships as $3 + 1 = 4$ seats. This review\'s job is the unit\'s oldest ritual: first put the whole chapter back together in ONE map you can redraw from memory, and then make you USE it on a mixed bench of fifteen questions - because a chapter that cannot be used was never learned. Every number below was engine-pinned before this prose was written; the review invents nothing, it restates the chapter at bench speed.' },
    { kind: 'para', text: 'A review, the earlier unit reviews taught, is not a summary but a REHEARSAL: the map first, then the census, then the recaps, then the threads that chain the lessons together, then the bench. This chapter opened with hardware nobody had hired and closes with a machine you can staff, license and keep honest; what follows walks it three times - once per lesson - with every number the seats pinned, and then hands you the bench that makes the chapter answer for itself.' },

    // ================================================================
    // 1. THE CHAPTER MAP
    // ================================================================
    { kind: 'heading', text: 'The Chapter in One Map' },
    { kind: 'para', text: 'Read the map the way it is drawn. On the **system side** (5.1) stands the manager: the operating system with its five jobs (process, memory, file system, device input/output, the user interface), its six utilities (antivirus, backup, disk cleanup and defragmenter, compression, uninstaller, task manager), its drivers - one translator per device - and its firmware, the software living on the chip; beneath the whole side runs the four-layer stack, and into it leads the five-stage boot chain. On the **application side** (5.2) stand the workers: seven families from productivity to games, each wearable in three uniforms (desktop, web, mobile), bundled or single. Joining the two runs the **craft bridge** (5.3): the five-step install census, the three ways to bring software home, semantic versioning, the six licence families and the four freedoms. Count the catalogue and the chapter\'s shape appears: $5 + 6 + 7 + 6 = 24$ catalogued entries.' },
    { kind: 'figure', caption: 'The chapter in one map (F1): the two-family tree. The system side of 5.1 (the OS with five jobs, six utilities, drivers, firmware, the 4-layer stack, the 5-stage boot chain) and the application side of 5.2 (seven worker families, three uniforms, suites) joined by the craft bridge of 5.3 (install census of 5, three ways to install, semver, six licence families, four freedoms). Twenty-four catalogued entries in all - 5 + 6 + 7 + 6. If you can redraw this from memory, you hold the chapter.', svg: cf5RMapSvg() },
    { kind: 'callout', tone: 'definition', title: 'The two-family census, defined once', text: 'The chapter\'s ground is said to be this: **software** - the set of instructions, and the data they work on, that tells the hardware what to do - splits into two families by one test, *whose job does a program do?* **System software** runs the machine and provides the platform others stand on: the operating system, the utilities, the drivers, the firmware. **Application software** does the user\'s own task, standing on that platform, in seven worker families. The **craft bridge** joins the families: installing, updating and licensing - because software is bought as well as built. Symbolically: the chapter catalogues $5 + 6 + 7 + 6 = 24$ entries, and every program you will ever meet sits somewhere on that tree.' },
    { kind: 'para', text: 'The map earns its keep by CHAINING: any two lessons compose into one move. The manager\'s file-system job is the shelf the installer writes to; the workers\' file formats are the contracts the associations point at; the licence you hold decides which uniform of the worker you may run. Hold the two families and the bridge between them, and every isolated fact in the recaps below snaps back onto its home rail.' },
    { kind: 'para', text: 'Seven witnesses carry the whole chapter on one strip, and the recaps below will keep quoting them. The stack has **4 layers**. The boot chain has **5 stages** - and $5! = 120$ possible orderings of which exactly **one** is honest. The multitasking illusion runs on **50 switches a second** costing **0.005%** of the wall clock. The spreadsheet grid holds **2,600 cells**, which store honestly as **20.3125 KiB**. The subscription arithmetic gives **25 years** to parity. The two famous EOL spans are **13 years** and **10 years**. And the counter-intuition every examination loves: $1.9.9$ plus a feature walks to **1.10.0**, never to 2.0.0. Meet them once here; the bench will expect them on demand.' },

    // ================================================================
    // 2. THE CHAPTER CENSUS
    // ================================================================
    { kind: 'heading', text: 'The Chapter Census, Checked Cold' },
    { kind: 'para', text: 'The chapter\'s catalogue re-composed by seat, the way the orchestrator re-checks it: lesson 5.1 owns the manager\'s ground - $5$ OS jobs plus $6$ utilities, so $11$ entries; lesson 5.2 owns the work side - $7$ worker families; lesson 5.3 owns the craft - $6$ licence kinds. And the two roads close on the same total: $11 + 7 + 6 = 24$, matching $5 + 6 + 7 + 6 = 24$ by kind. A census that closes two ways is a census you can quote in an examination hall without holding your breath.' },
    { kind: 'table', caption: 'The chapter census table: each seat\'s ground, its catalogued entries, and the witnesses its recap keeps quoting. Counts read from this review\'s own part; the orchestrator re-checks the assembled chapter.', head: ['The seat', 'What it owns', 'Catalogued entries', 'The witnesses to quote'], rows: [
      ['5.1 System Software: The Manager Layer', 'the platform the workers stand on', '5 OS jobs + 6 utilities = 11', '4-layer stack; boot chain of 5 stages (120 orderings); 50 switches at 0.005%'],
      ['5.2 Application Software: The Worker Families', 'the workers and their uniforms', '7 worker families', '26 x 100 = 2,600 cells; 99 additions; 20.3125 KiB honest'],
      ['5.3 Installing, Updating and Licensing Honestly', 'the craft of ownership', '6 licence kinds', 'install census of 5; 3 ways to install; 25 years to parity; XP 13 / Win10 10'],
      ['5.R Unit 5 Completion Review', 'the re-ownership: map, threads, bench', 'the 24 re-checked, plus the classify-12 roster', '5 + 7 = 12 sorted; 1.10.0; this bench of 15 questions'],
    ] },
    { kind: 'figure', caption: 'The census dashboard (F3): every pinned count of the chapter as one labelled panel - the 4-layer stack, the 5-stage boot chain with its 120 orderings, the 50 switches a second at 0.005%, the classify-12 roster of 5 + 7, the 2,600-cell grid with its 99 additions, the 20.3125 KiB of storage honesty, the 25-years-to-parity licence arithmetic, and the 13-and-10-year EOL spans. One glance, one revision card.', svg: cf5RDashboardSvg() },
    { kind: 'para', text: 'Use the dashboard as the chapter\'s index card. Each panel is one lesson\'s harvest compressed to a count you can check by hand: the stack counts its layers, the chain counts its stages and multiplies out its orderings, the grid multiplies its edges, the storage divides by $1{,}024$, the licence arithmetic divides the two prices, the EOL spans subtract their years. Eight panels, eight one-line derivations - rebuild each number and you own the chapter.' },
    { kind: 'example', title: 'Recap Illustration: the census recall run - all 24 entries, cold.', steps: [
      'Take the system side first: the OS keeps five jobs - process, memory, file system, device input/output, the shell - and the utility staff numbers six: antivirus, backup, disk cleanup/defragmenter, compression, uninstaller, task manager.',
      'So the system seat catalogues $5 + 6 = 11$ entries.',
      'Now, the application side: seven worker families - productivity, creative and media, browsers and content access, communication, education and reference, developer tools, games and simulation.',
      'Thus the workers catalogue $7$ entries.',
      'And the craft bridge: six licence kinds - proprietary/commercial, freeware, shareware, free and open source, public domain, subscription/SaaS.',
      'Hence the chapter total: $11 + 7 + 6 = 24$ catalogued entries, every one placed on the map above.',
    ], answer: '5 + 6 = 11 on the system side, 7 worker families, 6 licence kinds - 24 catalogued entries in all' },

    // ================================================================
    // 3. THE THREE PER-LESSON RECAPS (the siblings' pinned numbers,
    //    carried verbatim - the review invents no numbers)
    // ================================================================
    { kind: 'heading', text: 'Lesson 5.1 Recap: System Software - The Manager Layer' },
    { kind: 'para', text: 'Lesson 5.1 built the platform. The **four-layer stack** runs user, application software, system software, hardware - each layer talking only to its neighbours, the manager hiding the hardware\'s dialect from the workers, and firmware straddling the bottom two because the stack is a model, not a fence. The **operating system** keeps five visible jobs: (i) process management - who runs next; (ii) memory management - who owns which addresses; (iii) the file system - names on the storage shelf; (iv) device input/output through drivers; (v) the user interface, the shell, drawn as windows or typed as a command line. The **kernel** is the core that does the first four; the **shell** is the face that does the fifth. Around the OS works the specialist staff of **six utilities** - antivirus, backup, disk cleanup/defragmenter, compression, uninstaller, task manager - each one housekeeping task for the machine rather than a whole platform. The **drivers** translate: the OS speaks one standard dialect, each device its own, so seven devices need seven drivers. The **firmware** is software stored permanently on a chip inside the device, and the **boot chain** hands the machine over in five stages: power on, firmware POST (the inventory check), bootloader, OS kernel, login prompt.' },
    { kind: 'para', text: 'The lesson\'s deepest claim was the **multitasking** illusion: many programs seem to run at once because the manager rapidly switches one core between them. The pinned arithmetic: slices of $10\\text{ ms}$ shared between 2 processes give each process 50 turns a second - **50 switches** a second - and each switch costs about a microsecond, so $50\\text{ }\\mu\\text{s}$ of every second is spent switching, which is **0.005%** of the wall clock. The full re-derivation waits in the honest re-checks below; the number to carry cold is the percentage.' },
    { kind: 'callout', tone: 'insight', title: 'Why the stack hides the dialect', text: 'The stack\'s whole point is translation by layers. A word processor asks the manager for a file; the manager asks a driver for sectors; the driver speaks the device\'s private commands. No worker ever learns the hardware\'s dialect, and no device ever hears the workers\' requests - four layers, three neighbour joints, and the manager is the only bilingual party on the platform. That is why changing the hardware beneath does not rewrite every program above: the stack is a treaty, and the manager keeps the translations.' },
    { kind: 'callout', tone: 'warn', title: 'The multitasking illusion, stated honestly', text: 'Multitasking does NOT mean programs run at the same time. On one core it means the manager switches - $50$ switches a second in the pinned run - and the switching costs $50\\text{ }\\mu\\text{s}$, just $0.005\\%$ of the wall clock. The illusion is cheap enough that you never feel the seams, and expensive enough that a program that assumes it owns the core is already wrong. Say it the honest way: many programs *appear* to run at once because one core is switched between them very fast.' },
    { kind: 'callout', tone: 'historical', title: 'The manager\'s dated beats', text: 'Our own retelling, dates pinned. The first operating system is usually credited to **GM-NAA I/O, 1956**, written for the IBM 704 by its own users to automate the card-and-tape handling nobody wanted to do by hand - the manager was born as a servant, from the workers\' own exhaustion. **UNIX** followed in **1969** at Bell Labs (Thompson and Ritchie) - the small, tool-writing system whose descendants run most phones and servers today, thirteen years after GM-NAA I/O. And the graphical face arrived in two steps: the **Xerox Alto, 1973**, then the **Apple Macintosh, 1984** - eleven years between them, and fifteen after UNIX.' },

    { kind: 'heading', text: 'Lesson 5.2 Recap: Application Software - The Worker Families' },
    { kind: 'para', text: 'Lesson 5.2 stood the workers on the platform. The sorting test is the mirror of 5.1\'s: application software does the user\'s own task. The census of **seven worker families**: (i) productivity - the word processor, the spreadsheet, the presentation, the email client, four core kinds carrying three verbs: compose, compute, narrate; (ii) creative and media - photo, video, audio, desktop publishing; (iii) browsers and content access - the Web door, named but not opened; (iv) communication - chat and video calls; (v) education and reference - encyclopedias and tutors, a family this library honestly names itself into; (vi) developer tools - editors, IDEs, compilers, the bit-craft\'s workbench; (vii) games and simulation. Each family answers with its verb - compose, compute, narrate, reach, converse, learn, build, play.' },
    { kind: 'para', text: 'One family was studied close so the census would not be a list: the **spreadsheet**. Its grid runs 26 columns, A to Z, against 100 rows - $26 \\times 100 = 2{,}600$ cells - and a formula is a RECIPE the machine re-cooks whenever an ingredient changes: one SUM down a full column performs $100 - 1 = 99$ additions, every time, without complaint. The same grid prices the storage honestly: at 8 bytes a cell, $2{,}600 \\times 8 = 20{,}800$ bytes, and $20{,}800 \\div 1{,}024 = 20.3125$ KiB - the binary figure the re-checks below re-derive. The workers also come in **three uniforms** - desktop installable, web app, mobile app - the same worker changing where it lives, who updates it, and when it needs the network. And the economics of **suites**: a four-app suite at one licence against four singles at four licences - three licences saved when the spare apps are the point, dead weight when they are not. Choosing honestly closed the lesson: file formats are contracts, export before you commit, and ask the lock-in question - can your work leave?' },
    { kind: 'callout', tone: 'historical', title: 'VisiCalc and Photoshop', text: 'Two dated beats, honestly told. **VisiCalc, 1979**, on the Apple II, was the first spreadsheet - and the program that sold the machine: the \'killer app\' idea was born the day buyers chose hardware to reach one worker. **Photoshop, 1990**, by the Knoll brothers, became the creative family\'s household name - eleven years after VisiCalc. Between them they frame the chapter\'s economics: a worker family grows powerful enough that the platform is bought just to hire it.' },

    { kind: 'heading', text: 'Lesson 5.3 Recap: Installing, Updating and Licensing Honestly' },
    { kind: 'para', text: 'Lesson 5.3 taught the craft of ownership. **Installing** is more than copying files: the census runs to five steps - (i) copy the files to their home; (ii) register with the OS, the shortcuts and menu entries; (iii) claim the file associations, which program opens which kind; (iv) write the settings; (v) sometimes add a driver or background service. There are **three ways** to bring software home: the installer wizard, the store or package manager (one catalogue, one update pipe), and portable software that runs from its folder and registers nothing - no shortcuts, no associations, and therefore no leftovers. **Updating** has three honest reasons - bugs (mis-made instructions), security (plugged holes), features - and version numbers read by **semantic versioning**: MAJOR.MINOR.PATCH, where a bug fix bumps the patch ($2.4.1 \\to 2.4.2$), a new feature bumps the minor ($2.4.1 \\to 2.5.0$), and a breaking change bumps the major ($2.4.1 \\to 3.0.0$). An **update** stays on the same version line and is free; an **upgrade** crosses to a new MAJOR and may cost. And support ends even for famous software: Windows XP\'s support ended **8 April 2014** - **13 years**; Windows 10\'s ended **14 October 2025** - **10 years**.' },
    { kind: 'para', text: 'The lesson\'s honest centre was the licence: buying media or a key buys **permission**, not the program. The **six licence kinds**: proprietary/commercial (pay for permission, source closed); freeware (free of charge, source still closed, permission still limited); shareware (try free - the 30-day trial - then pay); free and open source, carrying the **four freedoms** - run for any purpose, study and modify (the source comes with it), redistribute copies, distribute your modified versions; public domain (no rights reserved, rare); and subscription/SaaS - renting the worker, pinned at 120 a year against a 3,000 perpetual licence, which is **25 years** to parity. **Uninstalling** has its own leftovers census of three - settings, caches, file associations - which is why the store route uninstalls cleanest: the registry that installed, uninstalls. The **EULA** is the long agreement you click, with its per-seat limits - one licence on three machines is two beyond the grant - and the honest reading habit is to scroll straight to the limits and the data clauses.' },
    { kind: 'callout', tone: 'historical', title: 'GNU, the FSF and Linux', text: 'The free-software movement\'s start, dated and pinned: the **GNU Project** was announced in **1983**, the **Free Software Foundation** founded in **1985**, and **Linux** was announced in **1991** - eight years after GNU - as the kernel the movement had been waiting for. Our own retelling: the four freedoms were argued into existence a decade before the system that popularised them finished booting, which is the honest way round for a principle - the licence was ready when the kernel arrived.' },
    { kind: 'example', title: 'Recap Illustration: the licence-scenario sort - six scenarios to six families.', steps: [
      'Take the six scenarios one at a time and ask what the permission actually grants.',
      'So \'pay 3,000 once, the source stays closed\' is proprietary; \'free of charge, the source still closed\' is freeware; \'try it 30 days, day 31 needs payment\' is shareware.',
      'Now, \'the four freedoms, the source comes along\' is free and open source; \'no rights reserved at all\' is public domain; \'rent it at 120 a year\' is subscription/SaaS.',
      'Check the arithmetic hiding in the last pair: $3{,}000 \\div 120 = 25$ years to parity with the perpetual price.',
      'Hence six scenarios, six families, one question behind them all: what exactly did the money buy?',
    ], answer: 'proprietary; freeware; shareware; free and open source; public domain; subscription/SaaS - the six sorted' },
    { kind: 'callout', tone: 'warn', title: 'The anti-decimal trap', text: 'Version fields are not decimals. $1.9.9$ plus one new feature bumps the MINOR field: $9 + 1 = 10$, so the honest next version is $1.10.0$ - NOT $2.0.0$, which is reserved for a breaking change. Each field counts separately; there is no carry. And $1.10.0$ IS newer than $1.9.9$: compare field by field, and $10 > 9$. This is the single most-loved semver trap in every examination style this chapter serves.' },
    { kind: 'example', title: 'Recap Illustration: semver run I - the three standard bumps from 2.4.1.', steps: [
      'Take the base version $2.4.1$ and read it as MAJOR.MINOR.PATCH.',
      'So a bug fix bumps PATCH: $2.4.1 \\to 2.4.2$ - mis-made instructions repaired, nothing else moved.',
      'Now, a new feature bumps MINOR and resets PATCH: $2.4.1 \\to 2.5.0$.',
      'Thus a breaking change bumps MAJOR and resets both: $2.4.1 \\to 3.0.0$.',
      'Hence the reading habit: the reason names the field, and the field names the bump - and an update stays inside the line while an upgrade crosses it.',
    ], answer: '2.4.2 (bug fix), 2.5.0 (feature), 3.0.0 (breaking change) - the reason names the field' },
    { kind: 'example', title: 'Recap Illustration: semver run II - the 1.9.9 branch, against the decimal instinct.', steps: [
      'Take $1.9.9$ and add exactly one new feature.',
      'So the MINOR field bumps: $9 + 1 = 10$, and the version is $1.10.0$.',
      'Now, check the trap: a decimal reading carries and offers $2.0.0$ - but $2.0.0$ is reserved for a breaking change that has not happened.',
      'Thus $1.10.0$ IS the newer version: compare field by field, and $10 > 9$.',
      'Hence the law in one line: the three fields count separately; there is no carry, and never a decimal.',
    ], answer: '1.9.9 + one new feature = 1.10.0 (never 2.0.0); and 1.10.0 is newer than 1.9.9, field by field' },

    // ================================================================
    // 4. THE CROSS-LESSON THREADS (the review's real work)
    // ================================================================
    { kind: 'heading', text: 'The Cross-Lesson Threads' },
    { kind: 'para', text: 'The recaps above keep the lessons apart; the review\'s real work is to chain them. Three threads follow, each crossing all three seats: one program\'s whole journey (a worker of 5.2, licensed by 5.3, registered by 5.1\'s OS), the classify-12 roster (5.1\'s families against 5.2\'s), and the boot-to-login walk (5.1\'s chain with 5.1\'s jobs firing in order - and 5.3\'s updating craft waiting at the end of it).' },
    { kind: 'para', text: '**Thread A: one program\'s journey.** Follow a video editor - 5.2\'s creative and media family - from first meeting to final removal. It is met as **shareware**: a 30-day trial, and on day 31 the honest fork is pay or stop; our user pays, and now holds it under a proprietary licence. The **install** runs the census of five: files copied, the program registered with the OS, associations claimed, settings written, no driver needed. The **updates** walk the version line - a bug fix takes $2.4.1 \\to 2.4.2$, a new feature takes it on to $2.5.0$, both free updates inside the line. The **uninstall**, two years on, is where honesty pays: the leftovers census of three (settings, caches, associations) is the checklist, and the store route - had it been used - would have uninstalled cleanest. One program, three lessons, zero numbers invented.' },
    { kind: 'figure', caption: 'The journey timeline (F2): one honest program\'s crossing of the whole chapter - licensed under shareware (day 31: pay or stop), installed by the five-step census, updated along the semver line 2.4.1 -> 2.4.2 -> 2.5.0, and uninstalled against the leftovers census of three. The manager of 5.1 is present at every station: it registers, associates, updates and uninstalls.', svg: cf5RJourneySvg() },
    { kind: 'example', title: 'Recap Illustration: one honest program\'s journey - a video editor from trial to uninstall.', steps: [
      'Take the worker: a video editor, a member of 5.2\'s creative and media family, first met as shareware - a 30-day trial.',
      'So day 31 arrives: the honest move is to pay for the licence or stop using it; our user pays, and the program is now held by purchase.',
      'Now, the install, by the wizard: files copied to their home; the program registered with the OS (shortcuts, menu entries); file associations claimed; settings written; no driver or service needed.',
      'Then the updates: a bug fix walks $2.4.1 \\to 2.4.2$ (a PATCH bump, free); a new feature walks $2.4.2 \\to 2.5.0$ (a MINOR bump).',
      'Check the counter-case: had the trial shipped as $1.9.9$, the feature release would be $1.10.0$ - never $2.0.0$.',
      'Thus the uninstall, two years on: the store route would remove it cleanest, and the leftovers census warns - settings, caches, file associations can outlive the program.',
    ], answer: 'shareware trial -> paid; installed by the 5-step census; 2.4.1 -> 2.4.2 -> 2.5.0; uninstalled against the 3-part leftovers census' },
    { kind: 'para', text: '**Thread B: the classify-12 roster.** Take twelve named programs and sort them with the chapter\'s one test. The system side holds five: the operating system itself, the shell (the OS\'s own face), an antivirus utility, a printer driver, the SSD\'s firmware. The application side holds seven, one per worker family: a word processor, a photo editor, a browser, a chat client, an encyclopedia, an IDE, a game. The count is pinned - $5 + 7 = 12$ - and the application side mirrors the seven families one for one, which is the whole trick of remembering it: the roster is the census, wearing names.' },
    { kind: 'callout', tone: 'theorem', title: 'The sorting test', text: 'A program is said to be **system software** if it does the machine\'s job - running the platform, keeping the house, translating for a device, living on the chip - and **application software** if it does the user\'s own task on top of that platform. Symbolically: for any program $p$, ask whose job $p$ does; the answer is one of the two families, and no third answer exists. The test needs no brand names, no prices and no versions - which is exactly why examinations set it as a scenario and why the classify-12 roster above answers it twelve times without hesitating.' },
    { kind: 'example', title: 'Recap Illustration: the classify-12 run - twelve programs sorted with reasons.', steps: [
      'Take the test that sorts ANY program: whose job does it do - the machine\'s or yours?',
      'So the system side holds five: the OS (runs the machine itself), the shell (the OS\'s own face), an antivirus (one housekeeping task), a printer driver (translates OS calls for one device), the SSD\'s firmware (software stored on the chip).',
      'Now, the application side holds seven, one per family: a word processor (productivity), a photo editor (creative and media), a browser (content access), a chat client (communication), an encyclopedia (education and reference), an IDE (developer tools), a game (games and simulation).',
      'Check the count: $5 + 7 = 12$, and the seven mirror the seven families one for one.',
      'Hence the board: 5 system-side, 7 application-side - sorted without a single brand name.',
    ], answer: '5 system-side (OS, shell, antivirus, driver, firmware) + 7 application-side (one per family) = 12' },
    { kind: 'para', text: '**Thread C: the boot-to-login walk.** Run the five-stage chain and ask which of the manager\'s five jobs is firing at each stage. At power on, none - it is the hardware\'s own beat. The firmware POST is the inventory check: it names the devices, and so names the desks the drivers will serve. The bootloader reads the shelf - the file system\'s job already at work - and loads the kernel. The kernel taking charge is four jobs coming alive at once: process, memory, file system, device input/output. And the login prompt is the fifth job firing at last: the user interface, the shell, opening the door. Five stages, five jobs, one walk - and the updating craft of 5.3 is waiting on the far side of the door, because the first thing a modern manager does after login is check for patches.' },
    { kind: 'example', title: 'Recap Illustration: the boot-to-login walk - which of the five jobs fires when.', steps: [
      'Take the chain in its one honest order: power on, firmware POST, bootloader, OS kernel, login prompt.',
      'So at power on no job fires - the hardware\'s own beat; the POST is the firmware\'s inventory check, naming the devices the drivers will serve.',
      'Now, the bootloader reads the shelf - the file system job already at work - and loads the kernel.',
      'Then the kernel takes charge: process management, memory management, the file system and device I/O all come alive at once.',
      'Thus the login prompt is the fifth job firing: the user interface, the shell, opening the door.',
      'Hence the count: $5! = 120$ orderings of the stages exist, and this is the one that boots - the other 119 ask the kernel to load before the firmware has even found the disk.',
    ], answer: 'power on -> POST -> bootloader -> kernel -> login; the shell\'s job fires last, at the door' },

    // ================================================================
    // 5. THE HONEST RE-CHECKS (re-derived, not just quoted)
    // ================================================================
    { kind: 'heading', text: 'The Honest Re-Checks' },
    { kind: 'para', text: 'A number quoted is a rumour; a number re-derived is a possession. Five of the chapter\'s witnesses are rebuilt here from their pinned inputs - the time-slicing overhead, the 2,600-cell grid, the 20.3125 KiB of storage honesty, the 25-years-to-parity arithmetic, and the two EOL spans. Each rebuild is short enough to run in an examination margin.' },
    { kind: 'derivation', title: 'The time-slicing overhead, re-derived', statement: 'The chapter pinned the multitasking illusion at 50 switches a second costing 0.005% of the wall clock. The derivation rebuilds that figure from the two pinned inputs: slices of 10 ms shared between 2 processes, and a context switch costing about 1 microsecond.', steps: [
      { label: 'Count the slice slots', formula: '1000\\text{ ms} \\div 10\\text{ ms} = 100\\text{ slots per second}', explanation: 'One second holds one thousand milliseconds; slices of ten milliseconds each give one hundred slice slots a second.' },
      { label: 'Share them between the processes', formula: '100 \\div 2 = 50\\text{ turns each}', explanation: 'Two processes alternating fill the slots between them, so each is re-entered fifty times a second - the pinned switch rate.' },
      { label: 'Price one switch', formula: '1\\text{ switch} \\approx 1\\ \\mu\\text{s}', explanation: 'The manager saves one program\'s registers and loads the other\'s; on a modern core that bookkeeping costs about a microsecond.' },
      { label: 'Total the overhead', formula: '50 \\times 1\\ \\mu\\text{s} = 50\\ \\mu\\text{s per second}', explanation: 'Fifty switches at a microsecond each spend fifty microseconds of every second on pure administration.' },
      { label: 'Convert to a percentage', formula: '50\\ \\mu\\text{s} \\div 1\\text{ s} = 0.00005 = 0.005\\%', explanation: 'Fifty microseconds is five parts in a hundred thousand of the wall clock - half of one hundredth of one percent.' },
    ], result: 'So the multitasking illusion runs on $50 \\times 1\\ \\mu\\text{s} = 50\\ \\mu\\text{s}$ a second, which is $0.005\\%$ of the wall clock - and each process waits only $20\\text{ ms}$ between its own turns.' },
    { kind: 'para', text: 'The **grid** next. The spreadsheet census multiplies its edges: 26 columns from A to Z against 100 rows is $26 \\times 100 = 2{,}600$ cells, and a SUM down one full column performs $100 - 1 = 99$ additions because the first cell opens the total and each of the other ninety-nine extends it. Fill one cell a second and the grid would take 2,600 seconds - 43 minutes and 20 seconds - which is the honest scale of the machine\'s patience next to yours.' },
    { kind: 'para', text: 'The **storage honesty** follows the grid directly. At 8 bytes a cell, the whole grid weighs $2{,}600 \\times 8 = 20{,}800$ bytes. Divide by the binary unit: $20{,}800 \\div 1{,}024 = 20.3125$ KiB, exactly. The decimal label on the box would read 20.8 kB, and $20.8 \\div 20.3125 = 1.024$ exactly - the label oversells the honest size by 2.4%, the same habit chapter 4 taught you at the gigabyte scale. A clean 20 KiB is 20,480 bytes, so this file carries 320 bytes - 0.3125 KiB - over the clean mark; that is where the fraction in 20.3125 comes from.' },
    { kind: 'para', text: 'The **licence arithmetic**. The pinned pair: a perpetual licence at 3,000 against a subscription at 120 a year. Parity comes at $3{,}000 \\div 120 = 25$ years, and the road closes both ways because $25 \\times 120 = 3{,}000$. Year 26 has the subscriber at 3,120 - into the red by 120; year 30 at 3,600; year 50 at 6,000, the perpetual price doubled. Half of parity is honest too: 12.5 years costs 1,500, exactly half. The lesson\'s economics in one line: renting is cheaper for the first quarter-century and dearer after it - and almost nobody keeps a worker that long.' },
    { kind: 'para', text: 'The **EOL spans**. Windows XP: released 2001, support ended 8 April 2014 - $2014 - 2001 = 13$ years. Windows 10: released 2015, support ended 14 October 2025 - $2025 - 2015 = 10$ years. XP outlived Win10\'s entire span by three years, and the two spans sum to twenty-three. The arithmetic is trivial; the meaning is not.' },
    { kind: 'callout', tone: 'warn', title: 'The unpatched door', text: 'End of life means the maker stops knocking: no more bug fixes, no more security plugs - and the famous name on the box does not extend the permission. An unpatched machine past EOL is a door left unlocked in a street where lock designs are public. The honest arithmetic: XP spent 13 years earning its patches, Windows 10 spent 10 - and after the last patch, the counting stops but the doors do not.' },

    // ================================================================
    // 6. THE MIXED BENCH (15 questions, L1-L3)
    // ================================================================
    { kind: 'heading', text: 'The Mixed Bench: Fifteen Questions Across the Chapter' },
    { kind: 'para', text: 'The bench is the method under examination conditions: each question is one seat\'s ground, or two seats chained. Answer with the same ritual the recaps used - name the pinned values, derive, check by a second road, then state the answer in its honest unit. The seven witnesses are fair game in every seat; quote them cold. Five of the solutions carry their own diagrams, because for those five the diagram IS the method.' },
    { kind: 'para', text: 'Score yourself honestly: an answer with the right method and a slipped digit is half marks; a remembered number with no derivation is none - the chapter priced honesty, and the bench prices derivations. At least three questions are labelled exam-style in the honest sense: phrased in our own words in the style banking, SSC, school-board and Cambridge 9618-style papers use, claiming to quote no real paper.' },
    { kind: 'exercises', title: 'Exercises 5.R - the mixed bench across the chapter', sets: [
      { level: 'L1', questions: [
        { q: 'Order the four-layer stack from top to bottom; name the layer that sits DIRECTLY above the hardware; and say which two layers firmware straddles.', solution: [
          'Take the stack as 5.1 pinned it, top to bottom: user, application software, system software, hardware.',
          'So the layer directly above the hardware is system software - the manager layer itself.',
          'Thus firmware is the honest footnote: software stored on a chip inside the device, straddling the bottom two layers - the stack is a model, not a fence.',
          'Check with the joints: four layers give three neighbour joints, and each layer talks only to its neighbours.',
        ], answer: 'user -> application -> system -> hardware; system software sits directly above the hardware; firmware straddles system and hardware' },
        { q: 'Name the operating system\'s five visible jobs, one line each, and say which of the five the shell is.', solution: [
          'Take the manager\'s duty list: process management (who runs next), memory management (who owns which addresses), the file system (names on the storage shelf), device input/output through drivers, and the user interface.',
          'So the shell IS the fifth job - the user interface, whether drawn as windows or typed as a command line.',
          'Check the split: the kernel is the core that does the first four; the shell is the face that does the fifth.',
        ], answer: 'process, memory, file system, device I/O, user interface - and the shell is job (v), the face' },
        { q: 'A spreadsheet grid has 26 columns (A to Z) and 100 rows. How many cells does it hold, and how many additions does one SUM over a full column perform?', solution: [
          'Take the grid as pinned: 26 columns against 100 rows.',
          'So the cell count is $26 \\times 100 = 2{,}600$ cells.',
          'Now, the SUM: adding 100 numbers performs $100 - 1 = 99$ additions - the first cell opens the total, each of the other ninety-nine extends it.',
          'Hence the recipe reading: change one ingredient and the machine re-cooks all 99 additions without complaint.',
        ], answer: '26 x 100 = 2,600 cells; one full-column SUM performs 99 additions' },
        { q: 'Sort the classify-12 roster with one-line reasons: the operating system, the shell, an antivirus, a printer driver, the SSD\'s firmware, a word processor, a photo editor, a browser, a chat client, an encyclopedia, an IDE, a game.', solution: [
          'Take the test: whose job does it do - the machine\'s or yours?',
          'So the system side: the OS (runs the machine), the shell (the OS\'s own face), antivirus (one housekeeping task), the printer driver (translates for one device), the SSD\'s firmware (lives on the chip).',
          'Now, the application side, one per family: word processor, photo editor, browser, chat client, encyclopedia, IDE, game.',
          'Check the count: $5 + 7 = 12$, the pinned split.',
        ], answer: '5 system-side + 7 application-side = 12 - the board drawn in the figure', figures: [{ caption: 'The classify-12 board: twelve named programs sorted by the one test - whose job does it do? Five land system-side (the OS, the shell, an antivirus, a printer driver, the SSD\'s firmware); seven land application-side, one per worker family. The count 5 + 7 = 12 is pinned.', svg: cf5RSolClassifySvg() }] },
      ] },
      { level: 'L2', questions: [
        { q: 'List the five stages of the boot chain in order. How many orderings of the five stages exist, how many are wrong, and what is the chance of guessing the honest one?', solution: [
          'Take the five stages: power on, firmware POST, bootloader, OS kernel, login prompt.',
          'So the count of orderings is $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$.',
          'Now, exactly one ordering is honest, so 119 are wrong - and a blind guess succeeds $1 \\div 120 \\approx 0.8333\\%$ of the time.',
          'Thus the scaffold\'s logic: each station\'s duty names why it cannot move - the kernel cannot load before the firmware has found the disk.',
        ], answer: 'power on -> POST -> bootloader -> kernel -> login; 5! = 120 orderings, 1 honest, 119 wrong - a 1-in-120 guess', figures: [{ caption: 'The boot chain re-order scaffold: the five stations in the one honest order of the 120 - power on, firmware POST, bootloader, OS kernel, login prompt - each with its one-word duty and the manager\'s job that fires there. The other 119 orderings ask the impossible.', svg: cf5RSolBootSvg() }] },
        { q: 'From version 2.4.1, give the next version after (i) a bug fix, (ii) a new feature, (iii) a breaking change. Then the branch: 1.9.9 gains one new feature - what is the honest next version, and why not the decimal answer?', solution: [
          'Take 2.4.1 and read MAJOR.MINOR.PATCH.',
          'So (i) a bug fix bumps PATCH: 2.4.2; (ii) a new feature bumps MINOR and resets PATCH: 2.5.0; (iii) a breaking change bumps MAJOR and resets both: 3.0.0.',
          'Now, the branch: 1.9.9 plus a feature bumps the MINOR field to $9 + 1 = 10$, giving 1.10.0 - not 2.0.0, which is reserved for breaking changes.',
          'Check the ordering: 1.10.0 is newer than 1.9.9, field by field, because $10 > 9$.',
        ], answer: '2.4.2; 2.5.0; 3.0.0; and 1.9.9 + feature = 1.10.0 (never 2.0.0 - no carry, no decimal)', figures: [{ caption: 'The version ladder with the anti-decimal branch: the three standard bumps 2.4.1 -> 2.4.2 -> 2.5.0 -> 3.0.0, each tagged with its reason; below, 1.9.9 -> 1.10.0 with the struck-through 2.0.0 marked as the decimal-carry trap. Fields count separately.', svg: cf5RSolSemverSvg() }] },
        { q: 'Time-slicing: slices of 10 ms shared between 2 processes, each switch costing about 1 microsecond. How many switches a second? What is the overhead per second, as a percentage? What is the overhead across a full hour, and how long does each process wait between its own turns?', solution: [
          'Take the inputs: 10 ms slices, 2 processes, about $1\\ \\mu\\text{s}$ a switch.',
          'So one second holds $1000 \\div 10 = 100$ slice slots, and each process is re-entered $100 \\div 2 = 50$ times - 50 switches a second.',
          'Now, the overhead: $50 \\times 1\\ \\mu\\text{s} = 50\\ \\mu\\text{s}$ of every second, which is $0.005\\%$ of the wall clock.',
          'Thus per hour: $50 \\times 3{,}600 = 180{,}000$ switches costing $0.18$ s - still $0.005\\%$.',
          'Hence the waiting: each process waits only $10 + 10 = 20$ ms between its own turns - the illusion is cheap and quick.',
        ], answer: '50 switches/s; 50 microseconds per second = 0.005%; per hour 180,000 switches and 0.18 s; 20 ms between turns' },
        { q: 'A spreadsheet holds 2,600 cells at 8 bytes each. Give the total in bytes, the honest size in KiB, the ratio by which the decimal label oversells it, and the bytes over a clean 20 KiB.', solution: [
          'Take the grid: $2{,}600$ cells at 8 bytes each.',
          'So the total is $2{,}600 \\times 8 = 20{,}800$ bytes.',
          'Now, the honest binary size: $20{,}800 \\div 1{,}024 = 20.3125$ KiB, exactly.',
          'Thus the decimal label reads 20.8 kB, and $20.8 \\div 20.3125 = 1.024$ - the label oversells the honest size by $2.4\\%$.',
          'Check the clean mark: 20 KiB is 20,480 bytes, so the file carries 320 bytes $= 0.3125$ KiB over it.',
        ], answer: '20,800 bytes = 20.3125 KiB; the decimal 20.8 kB is 1.024x - a 2.4% oversell; 320 bytes over the clean 20 KiB', figures: [{ caption: 'The storage-honesty strip: 2,600 cells at 8 bytes each total 20,800 bytes; dividing by 1,024 gives the honest 20.3125 KiB, while the decimal label 20.8 kB runs 1.024x long - a 2.4% oversell. The 320 bytes over a clean 20 KiB are the fraction in 20.3125.', svg: cf5RSolStorageSvg() }] },
        { q: 'Name the six licence kinds with a one-line marker each. Which family carries the four freedoms - and what does day 31 of a 30-day shareware trial demand?', solution: [
          'Take the census: proprietary/commercial, freeware, shareware, free and open source, public domain, subscription/SaaS.',
          'So the markers: pay for permission with the source closed; free of charge with the source still closed; try then pay; the four freedoms with the source included; no rights reserved at all; rent by the year.',
          'Now, the four freedoms belong to free and open source alone: run for any purpose, study and modify, redistribute copies, distribute modified versions.',
          'Thus day 31 of a 30-day trial: pay for the licence or stop using it - the permission was for thirty days.',
        ], answer: 'six kinds named; the four freedoms belong to free and open source alone; day 31 demands pay-or-stop' },
      ] },
      { level: 'L3', questions: [
        { q: 'Sort six licence scenarios to their families: (a) pay 3,000 once, the source stays closed; (b) free of charge, the source still closed; (c) try it 30 days, day 31 needs payment; (d) the four freedoms, the source comes along; (e) no rights reserved at all; (f) rent it at 120 a year, stop when you stop paying.', solution: [
          'Take each scenario and ask what the money - or the lack of it - actually bought.',
          'So (a) is proprietary; (b) is freeware; (c) is shareware.',
          'Now, (d) is free and open source; (e) is public domain; (f) is subscription/SaaS.',
          'Check the board: six scenarios, six families, none left over - and the arithmetic hiding in (a) against (f) is the 25-years-to-parity run.',
        ], answer: 'proprietary; freeware; shareware; free and open source; public domain; subscription/SaaS - as the board arrows it', figures: [{ caption: 'The licence-scenario sort board: six scenarios on the left arrowed to their six families on the right - proprietary, freeware, shareware, free and open source, public domain, subscription/SaaS. The four freedoms belong to one family alone, and day 31 belongs to shareware.', svg: cf5RSolLicenceSvg() }] },
        { q: 'A perpetual licence costs 3,000; the subscription costs 120 a year. When does parity arrive? What has the subscriber paid by year 26, by year 30, and in which year does the subscription double the perpetual price? What does half of parity cost?', solution: [
          'Take the pinned pair: 3,000 once against 120 a year.',
          'So parity comes at $3{,}000 \\div 120 = 25$ years - and the road closes both ways, since $25 \\times 120 = 3{,}000$.',
          'Now, year 26: the subscriber has paid $26 \\times 120 = 3{,}120$, into the red by 120.',
          'Thus year 30 totals 3,600 (600 over), and the subscription doubles the perpetual price at year 50: $50 \\times 120 = 6{,}000$.',
          'Hence half of parity: 12.5 years costs 1,500, exactly half of 3,000.',
        ], answer: 'parity at 25 years; year 26 = 3,120 (+120); year 30 = 3,600; doubled at year 50; half-parity 12.5 years = 1,500' },
        { q: 'Windows XP\'s support ended 8 April 2014; Windows 10\'s ended 14 October 2025. State both spans in years, their difference, their sum - and the caution the chapter attaches to a machine past EOL.', solution: [
          'Take the spans as pinned: XP ran from 2001 to 2014, Windows 10 from 2015 to 2025.',
          'So XP enjoyed $2014 - 2001 = 13$ years of support, and Windows 10 enjoyed $2025 - 2015 = 10$ years.',
          'Now, the comparison: XP outlived Win10\'s whole span by 3 years, and the two spans sum to 23.',
          'Thus the caution: EOL means the maker stops the knocks - no bug fixes, no security plugs - so an unpatched machine is a door left unlocked.',
        ], answer: 'XP 13 years (to 8 April 2014); Win10 10 years (to 14 October 2025); difference 3, sum 23 - and an unpatched machine is an unlocked door' },
        { q: '(Exam-style.) A friend tries a shareware video editor for 30 days, pays on day 31, installs it from the downloaded wizard, updates it twice (first a bug fix from 2.4.1, then a new feature), and uninstalls it two years later. Name the family and the licence at each stage, the five install steps, both version numbers after the updates, and the three leftovers to check.', solution: [
          'Take the family: a video editor sits in 5.2\'s creative and media family.',
          'So the licence story: shareware through day 30; on day 31 the honest fork is pay or stop - the friend pays, holding it by purchase.',
          'Now, the install census of five: files copied to their home; registered with the OS (shortcuts, menu entries); file associations claimed; settings written; a driver or background service only sometimes - here, none.',
          'Thus the versions: the bug fix walks $2.4.1 \\to 2.4.2$ (PATCH); the new feature walks $2.4.2 \\to 2.5.0$ (MINOR).',
          'Hence the uninstall: check the leftovers census of three - settings, caches, file associations.',
        ], answer: 'creative and media; shareware -> paid; the 5-step install census; 2.4.2 then 2.5.0; leftovers: settings, caches, associations' },
        { q: '(Exam-style.) Recompose the chapter census two ways - by kind ($5 + 6 + 7 + 6$) and by seat ($11 + 7 + 6$) - and explain why the classify-12 roster counts $5 + 7$ instead of either.', solution: [
          'Take the kinds: 5 OS jobs, 6 utilities, 7 worker families, 6 licence kinds - $5 + 6 + 7 + 6 = 24$ catalogued entries.',
          'So by seat: 5.1 owns the jobs and the utilities, $5 + 6 = 11$; 5.2 owns the 7 families; 5.3 owns the 6 licence kinds; and $11 + 7 + 6 = 24$ closes both roads.',
          'Now, the classify-12 roster is a different census: it sorts twelve NAMED programs, not entry kinds - 5 system-side items against 7 application-side items, one per family.',
          'Thus the two counts measure different things: 24 catalogues what the chapter NAMES; 12 sorts what a bench question LISTS.',
        ], answer: '24 both roads (5+6+7+6 and 11+7+6); classify-12 = 5 + 7 named programs - kinds versus items' },
        { q: '(Exam-style, two parts.) (i) In one sentence each: which layer sits directly above the hardware, and what does a device driver translate between? (ii) Version 1.9.9 gains one new feature and ships; then it gains a second new feature and ships again. Give both version numbers.', solution: [
          'Take (i): the layer directly above the hardware is system software - the manager layer; and a driver translates between the operating system\'s standard calls and one device\'s private commands.',
          'So (ii), first feature: the MINOR field bumps, $9 + 1 = 10$, and the version is 1.10.0 - never 2.0.0.',
          'Now, the second feature: the MINOR field bumps again, $10 + 1 = 11$, and the version is 1.11.0.',
          'Check the ladder: $1.9.9 \\to 1.10.0 \\to 1.11.0$ - each field counts separately, no carry, no decimal.',
        ], answer: '(i) system software; a driver translates OS standard calls into one device\'s private commands; (ii) 1.10.0, then 1.11.0' },
      ] },
    ] },

    // ================================================================
    // 7. THE DOORSTEPS RECAP
    // ================================================================
    { kind: 'heading', text: 'The Doorsteps Recap' },
    { kind: 'para', text: 'Chapter 5 kept the visible census and deliberately left three doors closed - each with a doorstep book on this shelf that owns what is behind it. **\'Operating Systems\'** owns the theory this chapter refused to teach: the scheduling algorithms behind \'who runs next\', paging and virtual memory behind \'who owns which addresses\', deadlocks, and the internals of package management. **\'Computer Networks\'** owns the browser\'s plumbing - everything that happens after \'reach\' leaves the family tree. **\'Computer Organization and Architecture\'** owns the hardware door the manager stands on: privilege levels and interrupts, the mechanism by which one core is actually handed between programs. This chapter named those doors; it did not open them.' },
    { kind: 'callout', tone: 'insight', title: 'What to carry through the doors', text: 'Carry the method, not the menagerie: ask whose job a program does, then count the price. When \'Operating Systems\' teaches you the scheduler, you will already know the illusion it serves costs $0.005\\%$. When \'Computer Networks\' opens the browser\'s pipes, you will already know which family is knocking. When \'Computer Organization and Architecture\' shows you the interrupt, you will recognise the switch you priced at a microsecond. The census was the entry ticket; the theory is the show.' },

    // ================================================================
    // 8. EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Exam Corner: the Chapter as a Checklist' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner - what this chapter answers, honestly labelled', text: 'Banking and SSC computer-awareness papers, school and board computer-science examinations, and Cambridge 9618-style papers all draw on the software-families ground - classification, OS functions, utilities, drivers, boot order, version numbers and licence types. The asks below are the stable ones, phrased in OUR OWN words in the style such papers use; nothing here claims to quote a real paper. Each row carries the engine-pinned witness to quote in the margin - the fastest honest marks in the hall.' },
    { kind: 'para', text: 'The table below is the revision sheet the chapter has been building towards: seven stable asks, the seat that answers each, and the witness that earns the mark. Revise by covering the right column and reproducing it from the ask alone - the examination\'s habit is to name the ask and wait to see whether you carry the number.' },
    { kind: 'table', caption: 'The chapter\'s examination checklist: every stable ask, the lesson that answers it, and the pinned witness to quote.', head: ['The examination ask', 'The seat', 'The witness to quote'], rows: [
      ['Classify the given software (system vs application)', '5.1 + 5.2', 'the sorting test; classify-12 = 5 system-side + 7 application-side'],
      ['Order the boot sequence', '5.1', 'power on -> POST -> bootloader -> kernel -> login; 5 stages, 5! = 120 orderings, 1 honest'],
      ['Name OS functions and utility examples', '5.1', 'five jobs (process, memory, file system, device I/O, UI); six utilities'],
      ['Say what a device driver is', '5.1', 'translates the OS\'s standard calls into one device\'s private commands'],
      ['Give the next version number (semver)', '5.3', '2.4.1 -> 2.4.2 / 2.5.0 / 3.0.0; and 1.9.9 + feature -> 1.10.0, never 2.0.0'],
      ['Match licence types to scenarios', '5.3', 'six kinds; the four freedoms; day 31 of a 30-day trial = pay or stop'],
      ['Census recalls: cells, storage, parity, EOL', '5.2 + 5.3', '2,600 cells; 20.3125 KiB; 3,000 vs 120/year = 25 years; XP 13 / Win10 10 years'],
    ] },

    // ================================================================
    // 9. THE FORMULA HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Formula Harvest' },
    { kind: 'para', text: 'Seven cards carry the chapter\'s structure - the two stacks and the census counts the bench will demand cold. Each card is a MOVE, not a string: order the layers, order the chain, name the field the reason bumps, count the freedoms, the licences, the install steps, and price the illusion before you trust it.' },
    { kind: 'formula', name: 'The layer stack', latex: '\\text{user} \\to \\text{application software} \\to \\text{system software} \\to \\text{hardware}', note: 'Four layers, three neighbour joints; system software sits directly above the hardware, and firmware straddles the bottom two - a model, not a fence.' },
    { kind: 'formula', name: 'The boot chain', latex: '\\text{power on} \\to \\text{firmware POST} \\to \\text{bootloader} \\to \\text{OS kernel} \\to \\text{login prompt}', note: 'Five stages; 5! = 120 orderings of which exactly one is honest - the other 119 load the kernel before the firmware finds the disk.' },
    { kind: 'formula', name: 'The semver bump rules', latex: '\\text{MAJOR.MINOR.PATCH}: \\text{ fix} \\to \\text{PATCH}, \\ \\text{feature} \\to \\text{MINOR}, \\ \\text{breaking} \\to \\text{MAJOR}', note: '2.4.1 -> 2.4.2 (fix), 2.5.0 (feature), 3.0.0 (breaking); the branch: 1.9.9 + feature = 1.10.0, never 2.0.0 - no carry, no decimal.' },
    { kind: 'formula', name: 'The four freedoms', latex: '(\\text{run}) \\ (\\text{study and modify}) \\ (\\text{redistribute}) \\ (\\text{distribute modified})', note: 'Four numbered freedoms of the free-and-open family: run for any purpose; study and modify with the source; redistribute copies; distribute your modified versions.' },
    { kind: 'formula', name: 'The licence six', latex: '(\\text{proprietary}, \\text{freeware}, \\text{shareware}, \\text{free and open}, \\text{public domain}, \\text{subscription/SaaS})', note: 'Six kinds; the parity arithmetic inside the last: 3,000 once against 120 a year = 25 years; day 31 of a 30-day trial belongs to shareware.' },
    { kind: 'formula', name: 'The install five', latex: '(\\text{copy}, \\text{register}, \\text{associate}, \\text{settings}, \\text{driver/service})', note: 'The install census: copy files to their home; register with the OS; claim file associations; write settings; sometimes add a driver or background service. Three ways to bring software home: wizard, store/package manager, portable.' },
    { kind: 'formula', name: 'The time-slicing overhead', latex: '\\text{overhead} = \\text{switches per second} \\times \\text{cost per switch}', note: '50 switches/s x about 1 microsecond = 50 microseconds per second = 0.005% of the wall clock; each of 2 processes waits 20 ms between turns.' },

    // ================================================================
    // 10. THE VOCABULARY HARVEST
    // ================================================================
    { kind: 'heading', text: 'The Vocabulary Harvest' },
    { kind: 'para', text: 'Sixteen terms, the whole chapter in defensible lines - the two families, the manager\'s parts, the workers\' ground, and the craft of ownership. The glossary takes these whole; the bench takes them as shorthand. If any definition still needs its recap to make sense, that recap is your next five minutes.' },
    { kind: 'terms', items: [
      { term: 'Software', def: 'The set of instructions, and the data they work on, that tells the hardware what to do - the chapter\'s opening definition, sorted into two families by one test: whose job does a program do?' },
      { term: 'System software', def: 'The family that runs the machine and provides the platform others stand on: the operating system with its five jobs, the six utilities, the drivers, the firmware.' },
      { term: 'Application software', def: 'The family that does the user\'s own task, standing on the platform - seven worker families from productivity to games and simulation.' },
      { term: 'Operating system', def: 'The manager layer: five visible jobs - process management, memory management, the file system, device input/output through drivers, and the user interface.' },
      { term: 'Kernel', def: 'The OS\'s core, where the first four jobs live; it takes charge at the fourth stage of the boot chain, when the login prompt is still one stage away.' },
      { term: 'Shell', def: 'The OS\'s face - job (v), the user interface, drawn as windows (GUI) or typed as a command line; it fires last in the boot walk, at the door.' },
      { term: 'Multitasking', def: 'The illusion that many programs run at once, kept by rapidly switching one core between them - 50 switches a second at about a microsecond each, 0.005% of the wall clock.' },
      { term: 'Utility software', def: 'System software that performs one housekeeping task for the machine rather than running the whole platform - six of them: antivirus, backup, disk cleanup/defragmenter, compression, uninstaller, task manager.' },
      { term: 'Device driver', def: 'The program that translates between the operating system\'s standard calls and one device\'s private commands - one driver per device, so seven devices need seven drivers.' },
      { term: 'Firmware', def: 'Software stored permanently on a chip inside the device; it runs the POST inventory check, the second stage of the boot chain, and straddles the stack\'s bottom two layers.' },
      { term: 'Installing', def: 'The act of registering a program with the operating system so it can be found, launched and entrusted with file types - the census of five: copy, register, associate, settings, driver/service.' },
      { term: 'Update vs upgrade', def: 'An update stays on the same version line and is free (2.4.1 to 2.4.2); an upgrade crosses to a new MAJOR and may cost (2.4.1 to 3.0.0).' },
      { term: 'End of life (EOL)', def: 'The date the maker stops supporting a product - Windows XP after 13 years (8 April 2014), Windows 10 after 10 years (14 October 2025); past it, an unpatched machine is a door left unlocked.' },
      { term: 'Software licence', def: 'The maker\'s grant of permission to use the software under stated conditions; buying media or a key buys the permission, not the program. Six kinds, from proprietary to subscription/SaaS.' },
      { term: 'EULA', def: 'The end-user licence agreement - the long contract behind the click, with per-seat limits (one licence on three machines is two beyond the grant) and the data clauses worth scrolling for.' },
      { term: 'SaaS', def: 'Software as a Service - the subscription uniform: the worker is rented (120 a year against a 3,000 perpetual licence is 25 years to parity), stops when you stop paying, and lives on someone else\'s platform.' },
    ] },

    // ================================================================
    // 11. CHECK YOURSELF (quiz, key pinned [3, 1, 2, 0, 1])
    // ================================================================
    { kind: 'heading', text: 'Check Yourself' },
    { kind: 'para', text: 'Five questions, one from each ridge of the review: the stack, the driver, the version branch, the freedoms and the trial. Choose before you read on - each explanation says not only why the keyed answer is right but why every other option fails.' },
    { kind: 'quiz', items: [
      { q: 'In the four-layer stack, the layer DIRECTLY above the hardware is -', options: [
        'the user',
        'application software',
        'firmware',
        'system software - the manager layer',
      ], answer: 3, explain: 'The stack runs user, application software, system software, hardware - so the layer directly above the hardware is system software, the manager that hides the hardware\'s dialect from the workers. Option (a), the user, sits at the very TOP of the stack, three joints away. Option (b), application software, sits above system software, not below it - the workers stand ON the manager, never under it. Option (c) tempts with the lesson\'s honest footnote: firmware straddles the bottom two layers because it is software stored on a chip, but the stack\'s named layer above the hardware is still system software - the model is not a fence, but the census of layers is exact. Only (d) names the layer as pinned.' },
      { q: 'A device driver translates between -', options: [
        'two application programs exchanging a file',
        'the operating system\'s standard calls and one device\'s private commands',
        'the user and the shell',
        'RAM and the SSD',
      ], answer: 1, explain: 'The driver is the translator: the OS speaks one standard dialect, each device speaks its own, and the driver converts between them - which is why one driver serves one device and seven devices need seven drivers. Option (a) describes nothing in the chapter\'s chain: two workers never translate through a driver; they exchange files through the file system. Option (c) names the shell\'s relationship, not the driver\'s: the shell is the OS\'s face to the user - job (v) - and does no device translation. Option (d) names two pieces of hardware; a driver translates between SOFTWARE calls and hardware commands, not between two memories. Only (b) states the definition as 5.1 pinned it.' },
      { q: 'Version 1.9.9 gains exactly one new feature. The honest next version is -', options: [
        '2.0.0',
        '1.9.10',
        '1.10.0',
        '1.9.9.1',
      ], answer: 2, explain: 'A new feature bumps the MINOR field: $9 + 1 = 10$, patch resets to 0, and the version is 1.10.0 - which IS newer than 1.9.9, field by field, since 10 > 9. Option (a), 2.0.0, is the decimal-carry trap the chapter warns about loudest: 2.0.0 is reserved for a BREAKING change, and no carry moves from MINOR to MAJOR. Option (b), 1.9.10, is what a bug fix would give - a PATCH bump - but a feature is not a fix. Option (d), 1.9.9.1, invents a fourth field: semver counts exactly three. Only (c) bumps the field the reason names.' },
      { q: 'The free-and-open-source licence family carries how many numbered freedoms?', options: [
        'four',
        'three',
        'six',
        'two',
      ], answer: 0, explain: 'The four freedoms, numbered in the chapter\'s own phrasing: run the program for any purpose; study and modify it (the source comes with it); redistribute copies; distribute your modified versions. Option (b), three, is the count that always misses one - usually redistribution - but the list closes at four, as GNU announced in 1983 and the FSF framed in 1985. Option (c), six, confuses the freedoms with the SIX licence kinds of the whole census - proprietary through subscription/SaaS. Option (d), two, matches the two software families, not the freedoms inside one family. Only (a) counts them as pinned.' },
      { q: 'Shareware on a 30-day trial reaches day 31. The honest position is -', options: [
        'it keeps working free forever, like freeware',
        'pay for the licence or stop using it',
        'the maker must extend the trial another 30 days',
        'the program automatically becomes public domain',
      ], answer: 1, explain: 'Shareware is permission for a trial, and the permission was for thirty days: on day 31 you pay for the licence or you stop using it - that is the whole meaning of \'try free, then pay\'. Option (a) confuses the families: freeware is free of charge with the source still closed; shareware\'s free period ends. Option (c) invents an obligation no licence in the census carries - the maker sets the trial, not the calendar. Option (d) mistakes the rarest family for an automatic exit: public domain means no rights reserved at all, and nothing lapses into it by timeout. Only (b) states the fork the chapter pins.' },
    ] },
    { kind: 'para', text: 'The chapter closes as it opened: a machine, now managed; a platform, now staffed; workers, now hired under licences you can read; a bench, now sat. Three lessons and a review: 3 + 1 = 4 seats, 24 catalogued entries, and one habit - ask whose job it does, then count the price. Next door, the network. Walk through it holding the map.' },
  ],
}

/* ================================================================
   FIGURE HELPERS (function declarations hoist)
   ================================================================ */
function cf5RT(x: number, y: number, s: string, size = 11, fill = c5R.ink, anchor = 'middle', weight = 'normal'): string {
  return `<text x="${x}" y="${y}" font-family="${f5R}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${s}</text>`
}
function cf5RBox(x: number, y: number, w: number, h: number, fill: string, stroke: string, rx = 7): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`
}
function cf5RArrowH(x1: number, x2: number, y: number, color: string): string {
  const d = x2 > x1 ? 1 : -1
  return `<line x1="${x1}" y1="${y}" x2="${x2 - 7 * d}" y2="${y}" stroke="${color}" stroke-width="2"/><polygon points="${x2},${y} ${x2 - 8 * d},${y - 4.5} ${x2 - 8 * d},${y + 4.5}" fill="${color}"/>`
}
function cf5RArrow(x1: number, y1: number, x2: number, y2: number, color: string): string {
  const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy)
  const ux = dx / len, uy = dy / len
  const ex = x2 - 7 * ux, ey = y2 - 7 * uy
  const px = -uy, py = ux
  return `<line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="${color}" stroke-width="1.8"/><polygon points="${x2},${y2} ${ex + 4.5 * px},${ey + 4.5 * py} ${ex - 4.5 * px},${ey - 4.5 * py}" fill="${color}"/>`
}

/* F1 - the chapter in one map: the two-family tree, 24 entries placed */
function cf5RMapSvg(): string {
  const W = 760, H = 448
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The chapter in one map: the two-family tree. The system side of lesson 5.1 holds the operating system with five jobs - process, memory, file system, device input and output, the user interface - six utilities from antivirus to task manager, device drivers one per device, firmware on the chip, the 4-layer stack and the 5-stage boot chain. The application side of lesson 5.2 holds the seven worker families from productivity to games, three uniforms, and suites. The craft bridge of lesson 5.3 joins them: the install census of 5, three ways to install, semver, six licence families, four freedoms. Total: 24 catalogued entries - 5 plus 6 plus 7 plus 6.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE TWO-FAMILY TREE - ONE CHAPTER, 24 CATALOGUED ENTRIES', 13, c5R.ink, 'middle', 'bold'))
  /* left panel: system side */
  s.push(cf5RBox(18, 40, 264, 310, c5R.panelA, c5R.struct))
  s.push(cf5RT(150, 60, 'SYSTEM SIDE - LESSON 5.1', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RBox(26, 70, 248, 116, c5R.white, c5R.struct))
  s.push(cf5RT(150, 86, 'THE OPERATING SYSTEM - FIVE JOBS', 10, c5R.tealInk, 'middle', 'bold'))
  const jobs = ['(i) process - who runs next', '(ii) memory - who owns which addresses', '(iii) file system - names on the shelf', '(iv) device I/O - through drivers', '(v) user interface - the shell']
  jobs.forEach((j, i) => s.push(cf5RT(150, 102 + i * 14, j, 9.5, c5R.ink)))
  s.push(cf5RBox(26, 194, 248, 56, c5R.white, c5R.teal))
  s.push(cf5RT(150, 210, 'SIX UTILITIES', 10, c5R.tealInk, 'middle', 'bold'))
  s.push(cf5RT(150, 225, 'antivirus, backup, cleanup/defrag,', 9.5, c5R.ink))
  s.push(cf5RT(150, 239, 'compression, uninstaller, task manager', 9.5, c5R.ink))
  s.push(cf5RT(32, 266, 'DEVICE DRIVERS - one per device (7 -> 7)', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(32, 282, 'FIRMWARE - software living on the chip', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(32, 298, 'THE 4-LAYER STACK - user to hardware', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(32, 314, 'BOOT CHAIN - 5 stages to login', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(150, 340, '11 catalogued entries: 5 jobs + 6 utilities', 9.5, c5R.warn, 'middle', 'bold'))
  /* right panel: application side */
  s.push(cf5RBox(478, 40, 264, 310, c5R.panelB, c5R.conn))
  s.push(cf5RT(610, 60, 'APPLICATION SIDE - LESSON 5.2', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RBox(486, 70, 248, 140, c5R.white, c5R.conn))
  s.push(cf5RT(610, 86, 'THE SEVEN WORKER FAMILIES', 10, c5R.conn, 'middle', 'bold'))
  const fams = ['(i) productivity - compose, compute, narrate', '(ii) creative and media - photo, video, audio', '(iii) browsers and content access - reach', '(iv) communication - converse', '(v) education and reference - learn', '(vi) developer tools - build', '(vii) games and simulation - play']
  fams.forEach((f, i) => s.push(cf5RT(610, 102 + i * 14, f, 9.5, c5R.ink)))
  s.push(cf5RT(492, 228, 'THREE UNIFORMS - desktop, web app, mobile app', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(492, 244, 'SUITES - 4 workers, 1 licence vs 4 singles', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(492, 260, 'FORMATS ARE CONTRACTS - export first', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(492, 276, 'VisiCalc 1979 - the first spreadsheet', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(610, 340, '7 catalogued entries: the families', 9.5, c5R.warn, 'middle', 'bold'))
  /* the craft bridge */
  s.push(cf5RBox(296, 40, 168, 310, c5R.white, c5R.accent))
  s.push(cf5RT(380, 60, 'THE CRAFT BRIDGE', 11, c5R.accent, 'middle', 'bold'))
  s.push(cf5RT(380, 74, 'LESSON 5.3', 9.5, c5R.accent))
  const bridge = ['install census: 5 steps', 'ways to install: 3', 'semver: 1.9.9 -> 1.10.0', 'licence families: 6', 'four freedoms: 4', 'update reasons: 3', 'leftovers census: 3', 'EOL: XP 13 yr, Win10 10 yr']
  bridge.forEach((b, i) => s.push(cf5RT(380, 100 + i * 26, b, 9.5, c5R.ink)))
  s.push(cf5RT(380, 340, '6 catalogued entries', 9.5, c5R.warn, 'middle', 'bold'))
  s.push(cf5RArrowH(284, 294, 195, c5R.mid))
  s.push(cf5RArrowH(466, 476, 195, c5R.mid))
  /* the census strip */
  s.push(cf5RBox(18, 366, 724, 66, c5R.white, c5R.accent))
  s.push(cf5RT(380, 388, 'THE CHAPTER CENSUS: 24 CATALOGUED ENTRIES', 12, c5R.accent, 'middle', 'bold'))
  s.push(cf5RT(380, 406, '5 OS jobs + 6 utilities + 7 worker families + 6 licence kinds = 24', 10.5, c5R.ink))
  s.push(cf5RT(380, 422, 'by seat: 11 + 7 + 6 = 24 - three lessons plus this review (3 + 1 = 4 seats)', 10, c5R.warn))
  s.push('</svg>')
  return s.join('')
}

/* F2 - the journey timeline: licence -> install -> update -> uninstall */
function cf5RJourneySvg(): string {
  const W = 760, H = 232
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="One program's journey across the chapter: a video editor of the creative and media family moves through four stations. Licence, lesson 5.3: shareware, a 30-day trial, and day 31 means pay or stop. Install, lesson 5.3: the census of five - copy, register, associate, settings, driver or service. Update, lesson 5.3: 2.4.1 to 2.4.2 for a bug fix, then to 2.5.0 for a feature; an update is free, an upgrade crosses to a new major. Uninstall, lesson 5.3: the leftovers census of three - settings, caches, file associations - and the store route uninstalls cleanest.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'ONE PROGRAM\'S JOURNEY - THE CROSS-LESSON THREAD', 12.5, c5R.ink, 'middle', 'bold'))
  s.push(cf5RT(380, 40, 'the worker: a video editor - lesson 5.2\'s creative and media family', 10, c5R.tealInk))
  const stations: [string, string, string, string, string, string][] = [
    ['LICENCE - 5.3', 'shareware: the 30-day trial', 'day 31: pay or stop', 'the family: shareware', 'then held by purchase', c5R.struct],
    ['INSTALL - 5.3', 'the census of five:', 'copy, register, associate,', 'settings, driver/service', 'via the installer wizard', c5R.teal],
    ['UPDATE - 5.3', '2.4.1 -> 2.4.2 (bug fix)', '2.4.2 -> 2.5.0 (feature)', 'update: free, same line', 'upgrade: new MAJOR, may cost', c5R.conn],
    ['UNINSTALL - 5.3', 'the leftovers census of 3:', 'settings, caches,', 'file associations', 'the store route is cleanest', c5R.accent],
  ]
  stations.forEach((st, i) => {
    const x = 16 + i * 182
    s.push(cf5RBox(x, 56, 166, 104, i % 2 === 0 ? c5R.panelA : c5R.panelB, st[5]))
    s.push(cf5RT(x + 83, 76, st[0], 11, st[5], 'middle', 'bold'))
    s.push(cf5RT(x + 83, 96, st[1], 9.5, c5R.ink))
    s.push(cf5RT(x + 83, 110, st[2], 9.5, c5R.ink))
    s.push(cf5RT(x + 83, 124, st[3], 9.5, c5R.ink))
    s.push(cf5RT(x + 83, 138, st[4], 9.5, c5R.ink))
    if (i < 3) s.push(cf5RArrowH(x + 168, x + 180, 108, c5R.mid))
  })
  s.push(cf5RT(380, 186, 'the version line walks 2.4.1 -> 2.4.2 -> 2.5.0; started at 1.9.9 it would walk to 1.10.0 - never to 2.0.0', 10, c5R.warn))
  s.push(cf5RT(380, 206, 'and at every station the manager of 5.1 is already there: the OS registers, associates, updates, uninstalls', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}

/* F3 - the census dashboard */
function cf5RDashboardSvg(): string {
  const W = 760, H = 336
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The chapter's census dashboard: eight panels of pinned counts. The stack: 4 layers, user to hardware, system directly above hardware. The boot chain: 5 stages, 120 orderings, exactly 1 correct, 119 wrong. Time-slicing: 50 switches a second on 10-millisecond slices over 2 processes, about 1 microsecond a switch, 50 microseconds per second, 0.005 percent overhead. Classify-12: 5 system-side plus 7 application-side equals 12. The grid: 2,600 cells, 26 columns by 100 rows, a column SUM is 99 additions. Storage honesty: 2,600 cells at 8 bytes is 20,800 bytes = 20.3125 KiB; the decimal label 20.8 kB is 1.024 times - a 2.4 percent oversell. Licence arithmetic: 3,000 once against 120 a year, parity at 25 years, year 26 pays 3,120, year 50 pays 6,000. EOL spans: XP 13 years to 8 April 2014, Windows 10 10 years to 14 October 2025.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE CHAPTER\'S CENSUS DASHBOARD - EVERY PINNED COUNT AT ONCE', 12.5, c5R.ink, 'middle', 'bold'))
  const panels: [string, string, string, string, string, string, string][] = [
    ['THE STACK', '4 layers', 'user -> application', 'system -> hardware', 'system sits directly', 'above the hardware', c5R.struct],
    ['THE BOOT CHAIN', '5 stages', '5! = 120 orderings', 'exactly 1 correct', '119 wrong orderings', 'a blind guess: 1 in 120', c5R.teal],
    ['TIME-SLICING', '50 switches/s', '10 ms slices, 2 processes', 'about 1 microsecond each', '50 microseconds a second', '= 0.005% overhead', c5R.mid],
    ['CLASSIFY-12', '5 + 7 = 12', '5 system-side items', '7 application-side items', 'one test: whose job', 'the machine\'s or yours?', c5R.conn],
    ['THE GRID', '2,600 cells', '26 columns (A..Z)', 'x 100 rows', 'SUM one full column:', '99 additions', c5R.tealInk],
    ['STORAGE HONESTY', '20.3125 KiB', '2,600 cells x 8 bytes', '= 20,800 bytes', 'decimal label 20.8 kB', '= 1.024x - a 2.4% oversell', c5R.accent],
    ['LICENCE ARITHMETIC', '25 years', '3,000 once vs 120 a year', 'parity at year 25', 'year 26: 3,120 paid', 'year 50: 6,000 - doubled', c5R.warn],
    ['EOL SPANS', '13 and 10', 'XP: 13 years of support', '(to 8 April 2014)', 'Win10: 10 years', '(to 14 October 2025)', c5R.ink],
  ]
  panels.forEach((p, i) => {
    const x = 12 + (i % 4) * 186
    const y = 40 + Math.floor(i / 4) * 120
    s.push(cf5RBox(x, y, 178, 112, i % 2 === 0 ? c5R.panelA : c5R.panelB, p[6]))
    s.push(cf5RT(x + 89, y + 18, p[0], 10, p[6], 'middle', 'bold'))
    s.push(cf5RT(x + 89, y + 40, p[1], 13, c5R.ink, 'middle', 'bold'))
    s.push(cf5RT(x + 89, y + 58, p[2], 9, c5R.ink))
    s.push(cf5RT(x + 89, y + 71, p[3], 9, c5R.ink))
    s.push(cf5RT(x + 89, y + 84, p[4], 9, c5R.ink))
    s.push(cf5RT(x + 89, y + 97, p[5], 9, c5R.ink))
  })
  s.push(cf5RT(380, 300, 'and the chapter\'s counter-intuition: 1.9.9 + one new feature -> 1.10.0, never 2.0.0', 11, c5R.warn, 'middle', 'bold'))
  s.push(cf5RT(380, 318, 'three lessons plus this review: 3 + 1 = 4 seats, 24 catalogued entries, 7 witnesses', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}

/* S1 - the classify-12 board (solution figure) */
function cf5RSolClassifySvg(): string {
  const W = 760, H = 368
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The classify-12 board. Left column, system side, five items: the operating system - runs the machine itself; the shell - the operating system's own face, graphical or command line; antivirus - one housekeeping task for the machine; the printer driver - translates operating-system calls for one device; the SSD's firmware - software stored on the chip. Right column, application side, seven items: word processor - productivity; photo editor - creative and media; browser - content access; chat client - communication; encyclopedia - education and reference; IDE - developer tools; a game - games and simulation. One test sorts all twelve: whose job does it do?">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE CLASSIFY-12 BOARD - 5 SYSTEM-SIDE, 7 APPLICATION-SIDE', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RBox(20, 44, 340, 292, c5R.panelA, c5R.struct))
  s.push(cf5RT(190, 64, 'SYSTEM SIDE - 5 ITEMS', 11, c5R.ink, 'middle', 'bold'))
  const sys = ['the operating system - runs the machine itself', 'the shell - the OS\'s own face (GUI or command line)', 'antivirus - one housekeeping task for the machine', 'printer driver - translates OS calls for one device', 'SSD firmware - software stored on the chip']
  sys.forEach((it, i) => {
    const y = 78 + i * 46
    s.push(cf5RBox(32, y, 316, 26, c5R.white, c5R.struct, 5))
    s.push(cf5RT(40, y + 17, it, 9.5, c5R.ink, 'start'))
  })
  s.push(cf5RBox(400, 44, 340, 292, c5R.panelB, c5R.conn))
  s.push(cf5RT(570, 64, 'APPLICATION SIDE - 7 ITEMS', 11, c5R.ink, 'middle', 'bold'))
  const app = ['word processor - productivity (compose)', 'photo editor - creative and media', 'browser - content access (reach)', 'chat client - communication (converse)', 'encyclopedia - education and reference (learn)', 'IDE - developer tools (build)', 'a game - games and simulation (play)']
  app.forEach((it, i) => {
    const y = 78 + i * 34
    s.push(cf5RBox(412, y, 316, 22, c5R.white, c5R.conn, 5))
    s.push(cf5RT(420, y + 15, it, 9.5, c5R.ink, 'start'))
  })
  s.push(cf5RT(380, 356, 'one test sorts all twelve: whose job does it do - the machine\'s or yours?', 10.5, c5R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* S2 - the boot chain re-order scaffold (solution figure) */
function cf5RSolBootSvg(): string {
  const W = 760, H = 208
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The boot chain re-order scaffold: the one honest line of the 120 possible orderings. Station one, power on - duty: wake the machine; no operating-system job fires yet, it is the hardware's own beat. Station two, firmware POST - duty: the inventory check; the device census that tells the drivers whom to serve. Station three, bootloader - duty: choose and load; it reads the file system, so job three is already working. Station four, OS kernel - duty: take charge; jobs one to four come alive: process, memory, file, device. Station five, login prompt - duty: open the door; job five fires - the shell, the user interface. The other 119 orderings are wrong: the kernel cannot load before the firmware finds the disk.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE BOOT CHAIN RE-ORDERED - THE ONE HONEST LINE OF 120', 12, c5R.ink, 'middle', 'bold'))
  const st: [string, string, string, string, string][] = [
    ['POWER ON', 'duty: wake the machine', 'no OS job fires yet -', 'the hardware\'s own beat', ''],
    ['FIRMWARE POST', 'duty: the inventory check', 'the device census that', 'tells drivers whom to serve', ''],
    ['BOOTLOADER', 'duty: choose and load', 'reads the file system -', 'job (iii) already working', ''],
    ['OS KERNEL', 'duty: take charge', 'jobs (i)-(iv) alive:', 'process, memory, file,', 'device I/O'],
    ['LOGIN PROMPT', 'duty: open the door', 'job (v) fires: the shell', 'the user interface', 'waits for you'],
  ]
  st.forEach((k, i) => {
    const x = 14 + i * 150
    s.push(cf5RBox(x, 44, 134, 104, i % 2 === 0 ? c5R.panelA : c5R.panelB, c5R.teal))
    s.push(cf5RT(x + 67, 64, k[0], 10.5, c5R.tealInk, 'middle', 'bold'))
    s.push(cf5RT(x + 67, 82, k[1], 9, c5R.ink))
    s.push(cf5RT(x + 67, 98, k[2], 9, c5R.ink))
    s.push(cf5RT(x + 67, 111, k[3], 9, c5R.ink))
    if (k[4]) s.push(cf5RT(x + 67, 124, k[4], 9, c5R.ink))
    if (i < 4) s.push(cf5RArrowH(x + 136, x + 148, 96, c5R.accent))
  })
  s.push(cf5RT(380, 172, 'the other 119 orderings are wrong: the kernel cannot load before the firmware has found the disk', 10, c5R.ink))
  s.push(cf5RT(380, 190, '5 stages -> 5! = 120 orderings -> exactly 1 honest line', 10.5, c5R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* S3 - the semver ladder with the anti-decimal branch (solution figure) */
function cf5RSolSemverSvg(): string {
  const W = 760, H = 264
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The version ladder and the anti-decimal branch. Top row: 2.4.1 gains a bug fix and becomes 2.4.2; gains a new feature and becomes 2.5.0; gains a breaking change and becomes 3.0.0. An update stays inside the line and is free; an upgrade crosses to a new major and may cost. Bottom row: 1.9.9 gains one new feature and becomes 1.10.0, because the minor field counts 9 plus 1 equals 10. The struck-through 2.0.0 is the decimal-carry trap: each field counts separately, there is no carry into major, and 1.10.0 is newer than 1.9.9 field by field.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE VERSION LADDER - AND THE ANTI-DECIMAL BRANCH', 12, c5R.ink, 'middle', 'bold'))
  const ladder: [string, string][] = [['2.4.1', ''], ['2.4.2', '+ bug fix'], ['2.5.0', '+ new feature'], ['3.0.0', '+ breaking change']]
  ladder.forEach((v, i) => {
    const x = 24 + i * 128
    s.push(cf5RBox(x, 52, 96, 36, c5R.panelA, c5R.struct))
    s.push(cf5RT(x + 48, 75, v[0], 12, c5R.ink, 'middle', 'bold'))
    if (i < 3) {
      s.push(cf5RArrowH(x + 98, x + 126, 70, c5R.mid))
      s.push(cf5RT(x + 112, 44, v[1], 9, c5R.mid))
    }
  })
  s.push(cf5RT(540, 62, 'the three standard bumps:', 10, c5R.tealInk, 'start', 'bold'))
  s.push(cf5RT(540, 78, 'PATCH for fixes, MINOR for features,', 9.5, c5R.ink, 'start'))
  s.push(cf5RT(540, 92, 'MAJOR for breaking changes', 9.5, c5R.ink, 'start'))
  /* the 1.9.9 branch */
  s.push(cf5RBox(24, 150, 96, 36, c5R.panelB, c5R.conn))
  s.push(cf5RT(72, 173, '1.9.9', 12, c5R.ink, 'middle', 'bold'))
  s.push(cf5RArrowH(122, 150, 168, c5R.mid))
  s.push(cf5RT(136, 142, '+ new feature', 9, c5R.mid))
  s.push(cf5RBox(152, 150, 110, 36, c5R.panelB, c5R.struct))
  s.push(cf5RT(207, 173, '1.10.0', 13, c5R.struct, 'middle', 'bold'))
  s.push(cf5RT(207, 204, 'the MINOR field: 9 + 1 = 10', 9.5, c5R.tealInk))
  /* the crossed red branch to 2.0.0 */
  s.push(`<line x1="122" y1="192" x2="298" y2="192" stroke="${c5R.warn}" stroke-width="2" stroke-dasharray="5,4"/>`)
  s.push(`<polygon points="306,192 297,187.5 297,196.5" fill="${c5R.warn}"/>`)
  s.push(cf5RBox(310, 174, 96, 36, c5R.white, c5R.warn))
  s.push(cf5RT(358, 197, '2.0.0', 12, c5R.warn, 'middle', 'bold'))
  s.push(`<line x1="314" y1="192" x2="402" y2="192" stroke="${c5R.warn}" stroke-width="2.5"/>`)
  s.push(cf5RT(358, 226, 'the decimal-carry trap', 9.5, c5R.warn, 'middle', 'bold'))
  s.push(cf5RT(440, 160, 'each field counts separately:', 10, c5R.ink, 'start', 'bold'))
  s.push(cf5RT(440, 176, 'there is no carry into MAJOR', 10, c5R.ink, 'start'))
  s.push(cf5RT(440, 192, 'and 1.10.0 > 1.9.9 field by field', 10, c5R.ink, 'start'))
  s.push(cf5RT(380, 250, 'update = same line, free (2.4.2) - upgrade = new MAJOR, may cost (3.0.0)', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}

/* S4 - the licence-scenario sort board (solution figure) */
function cf5RSolLicenceSvg(): string {
  const W = 760, H = 336
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The licence-scenario sort board: six scenarios on the left arrowed to their six families on the right. Pay 3,000 once with the source closed goes to proprietary. Free of charge with the source still closed goes to freeware. A 30-day trial with day 31 needing payment goes to shareware. The four freedoms with the source included goes to free and open source. No rights reserved at all goes to public domain. Renting at 120 a year goes to subscription and SaaS. The four freedoms belong to free and open source alone, and day 31 belongs to shareware.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE LICENCE-SCENARIO SORT - SIX SCENARIOS, SIX FAMILIES', 12, c5R.ink, 'middle', 'bold'))
  const chips = ['pay 3,000 once; the source stays closed', 'free of charge; the source still closed', 'try it 30 days; day 31 needs payment', 'four freedoms; the source comes along', 'no rights reserved at all (rare)', 'rent it: 120 a year, stop when you stop']
  const fams = ['FREWARE - free of charge, source closed', 'SUBSCRIPTION / SaaS - rented by the year', 'PUBLIC DOMAIN - no rights reserved', 'PROPRIETARY - pay for permission', 'SHAREWARE - trial, then pay', 'FREE AND OPEN SOURCE - the four freedoms']
  /* mapping: chip i -> family row */
  const map = [3, 0, 4, 5, 2, 1]
  chips.forEach((c, i) => {
    const y = 44 + i * 40
    s.push(cf5RBox(20, y, 300, 32, c5R.panelA, c5R.struct, 5))
    s.push(cf5RT(32, y + 20, c, 9.5, c5R.ink, 'start'))
  })
  fams.forEach((f, i) => {
    const y = 44 + i * 40
    s.push(cf5RBox(440, y, 300, 32, c5R.panelB, c5R.conn, 5))
    s.push(cf5RT(452, y + 20, f, 9.5, c5R.ink, 'start'))
  })
  map.forEach((row, i) => {
    const y1 = 44 + i * 40 + 16
    const y2 = 44 + row * 40 + 16
    s.push(cf5RArrow(322, y1, 436, y2, c5R.teal))
  })
  s.push(cf5RT(380, 306, 'the four freedoms belong to free and open source alone; day 31 of a trial belongs to shareware', 10, c5R.ink))
  s.push(cf5RT(380, 324, 'and the parity arithmetic: 3,000 once against 120 a year = 25 years to parity', 10, c5R.warn, 'middle', 'bold'))
  s.push('</svg>')
  return s.join('')
}

/* S5 - the storage-honesty strip (solution figure) */
function cf5RSolStorageSvg(): string {
  const W = 760, H = 244
  const s: string[] = []
  const SCALE = 17
  const wBin = 20.3125 * SCALE
  const wDec = 20.8 * SCALE
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f5R}" role="img" aria-label="The storage honesty strip: 2,600 cells at 8 bytes each total 20,800 bytes; dividing by 1,024 gives the honest 20.3125 KiB. Two bars compare: the honest binary bar at 20.3125 KiB and the decimal label bar at 20.8 kB, which is 1.024 times as long - a 2.4 percent oversell. A clean 20 KiB is 20,480 bytes, so the file carries 320 bytes over, which is the 0.3125 in 20.3125.">`)
  s.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="${c5R.paper}"/>`)
  s.push(cf5RT(380, 22, 'THE STORAGE HONESTY - FROM 2,600 CELLS TO 20.3125 KiB', 12, c5R.ink, 'middle', 'bold'))
  const chain: [string, string][] = [
    ['2,600 CELLS', '26 columns x 100 rows'],
    ['EACH CELL', '8 bytes'],
    ['TOTAL', '20,800 bytes'],
    ['HONEST DIVIDE', 'by 1,024'],
    ['HONEST SIZE', '20.3125 KiB'],
  ]
  chain.forEach((c, i) => {
    const x = 12 + i * 153
    s.push(cf5RBox(x, 42, 124, 54, i % 2 === 0 ? c5R.panelA : c5R.panelB, i === 4 ? c5R.struct : c5R.teal))
    s.push(cf5RT(x + 62, 63, c[0], 10.5, i === 4 ? c5R.struct : c5R.tealInk, 'middle', 'bold'))
    s.push(cf5RT(x + 62, 82, c[1], 10, c5R.ink, 'middle', i === 4 ? 'bold' : 'normal'))
    if (i < 4) s.push(cf5RArrowH(x + 126, x + 151, 69, c5R.mid))
  })
  s.push(cf5RT(140, 135, 'binary, honest:', 9.5, c5R.tealInk, 'end'))
  s.push(`<rect x="150" y="120" width="${wBin}" height="22" rx="4" fill="${c5R.teal}"/>`)
  s.push(cf5RT(150 + wBin + 8, 135, '20.3125 KiB', 10, c5R.tealInk, 'start', 'bold'))
  s.push(cf5RT(140, 167, 'decimal, on the box:', 9.5, c5R.conn, 'end'))
  s.push(`<rect x="150" y="152" width="${wDec}" height="22" rx="4" fill="${c5R.conn}"/>`)
  s.push(cf5RT(150 + wDec + 8, 167, '20.8 kB = 1.024x', 10, c5R.conn, 'start', 'bold'))
  s.push(cf5RT(380, 208, 'the decimal label oversells the honest size by exactly 1.024x - a 2.4% boast', 10, c5R.warn, 'middle', 'bold'))
  s.push(cf5RT(380, 228, 'a clean 20 KiB is 20,480 bytes; the file carries 320 bytes = 0.3125 KiB over the clean mark', 10, c5R.ink))
  s.push('</svg>')
  return s.join('')
}
