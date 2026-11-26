#!/usr/bin/env python3
"""run9_cf53_complete.py — splice the licensing completion into part-cf53.ts
at the __CF53_APPEND__ marker. The completion writes sections 7-9 (licensing,
EULA, piracy), doorsteps, exam corner, terms, formula cards, quiz (key
[0,2,1,3,2]), and the 15-question exercises wiring the agent's pre-built
solution-figure SVG helpers."""

COMPLETION = r"""
    // ================================================================
    // 7. LICENSING: YOU NEVER BOUGHT THE SOFTWARE
    // ================================================================
    { kind: 'heading', text: 'Licensing: You Never Bought the Software' },
    { kind: 'para', text: 'Everything this lesson has walked so far - the arrival, the upkeep, the exit - has quietly assumed you may run the program at all. That permission has a name, and it is the part of the deal most often misunderstood. When you hand over money for software, you receive a box, a download, perhaps a card with a key on it - but what you have bought is not the program. The program remains the maker\u2019s property, protected like any published work; what you buy is a grant of permission to use it under stated conditions.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — software licence', text: 'A software licence is said to be the maker\u2019s grant of permission to use the software under stated conditions. Buying media or a key buys the permission, not the program: the copy you run is yours to run, not yours to own, and the conditions - who may use it, on how many machines, for how long, with what freedoms - are the terms of the grant.' },
    { kind: 'para', text: 'Read that back slowly, because two honest consequences follow. First, the price of software is the price of a permission, which is why the same program can carry a student rate, a home rate and a business rate: the software is identical; what differs is the breadth of the grant. Second, the conditions can be generous or stingy, and the whole variety of software economics - free tools, trials, subscriptions, the enormous public commons - is not a difference in generosity of makers but a difference in what the licence grants. Six families of grant cover almost every program you will meet.' },
    { kind: 'figure', caption: 'The six licence families as one street of doors. (i) Proprietary: you pay for permission and the source stays closed. (ii) Freeware: free of charge, but the source is still closed and the permission still limited. (iii) Shareware: try free, then pay - day 31 of a 30-day trial needs the licence. (iv) Free and open source: the four freedoms, and the source comes along. (v) Public domain: no rights reserved - rare, and honestly so. (vi) Subscription: rent by the month; stop paying, stop using. The census strip beneath: what you pay, whether the source opens, what you may do.', svg: cf53StreetSvg() },
    { kind: 'para', text: 'Walk the street door by door, priced honestly:' },
    { kind: 'list', marker: 'roman', items: [
      'proprietary (commercial) software - you pay for the permission, the source code stays closed, and the grant typically limits machines, users and transfers. The familiar shrink-wrapped world: polished, supported, and closed;',
      'freeware - free of charge, yet not free in the deeper sense: the source stays closed and the maker\u2019s conditions still bind. A free-of-charge antivirus or a no-cost media player is freeware: a gift with the wrapping left on;',
      'shareware - try first, pay if you keep it: the honest trial. The classic shape is the 30-day trial; on day 31 the grant expires and the honest walk is pay or stop;',
      'free and open-source software - the one family that grants the four freedoms outright (the numbered list just below). Free here means freedom, not price: some open-source products are sold, and the freedom travels with the copy;',
      'public domain - no rights reserved at all: use, modify, sell, anything. Rare, because modern copyright switches on automatically and rarely switches off; most \u201cpublic domain\u201d claims are really one of the other five doors mislabelled;',
      'subscription and software as a service - the worker rented by the month: you hold a current permission only while the payments do. Stop paying and the software stops - the opposite pole from the perpetual licence.',
    ] },
    { kind: 'para', text: 'The fourth door needs its own walk, because its grant is numbered and famous. Free and open-source software rests on four freedoms:' },
    { kind: 'list', marker: 'roman', items: [
      'freedom 0 - run the program as you wish, for any purpose, without asking;',
      'freedom 1 - study how the program works, and change it, which requires that the source code comes along with the copy;',
      'freedom 2 - redistribute copies: give the program away, exactly as you received it;',
      'freedom 3 - distribute your modified versions, so the improvements you build on freedom 1 can reach others.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — GNU, the FSF, and Linux', text: 'The four freedoms were not discovered; they were declared. In September 1983 Richard Stallman announced the GNU Project - a plan to build a complete operating system whose every part granted them. The Free Software Foundation followed in October 1985, two years later, to hold the movement\u2019s legal and organisational ground. The kernel GNU awaited arrived from elsewhere: in August 1991 Linus Torvalds announced the Linux kernel - 8 years after GNU began - and the GNU tools with the Linux kernel became the free systems that today run most phones (through Android) and most servers on the Internet. The licences that carry these freedoms, like the MIT and GPL families, are themselves famous legal craft - but the law of licences is a profession, and this lesson teaches reader-level literacy, not legal advice.' },
    { kind: 'para', text: 'The subscription door also carries arithmetic worth doing once, honestly, because \u201crent is cheaper\u201d is a claim with a time attached. Suppose a worker you need is sold two ways: a perpetual licence at 3,000 (currency irrelevant to the arithmetic), and a subscription at 120 per year for the same software. The subscription looks wildly cheaper - and for the first years it is. But the perpetual grant never expires, while the rent never stops. The break-even is a plain division, and it deserves the derivation treatment below.' },
    { kind: 'derivation', title: 'The years-to-parity of a subscription', statement: 'A perpetual licence costs 3,000 once; a subscription costs 120 per year, forever. After how many years do the two costs meet?', steps: [
      { label: 'Set the two accumulations equal', formula: '3000 = 120 \\times t', explanation: 'Let t be the number of years of rent. The perpetual cost is fixed at 3,000; the rented cost grows linearly at 120 each year.' },
      { label: 'Divide through by the yearly rent', formula: 't = \\frac{3000}{120}', explanation: 'The fixed grant divided by the yearly rate gives the years the rent needs to reach it.' },
      { label: 'Compute the quotient', formula: 't = 25', explanation: 'Three thousand divided by one hundred and twenty is exactly twenty-five: after 25 years of rent you have paid the perpetual price - and the rent continues while the perpetual licence would still run.' },
      { label: 'Read the result honestly', explanation: 'Twenty-five years is far beyond a typical machine\u2019s life, so for most readers the subscription stays cheaper in fact; the parity point simply names the crossover the marketing never mentions.' },
    ], result: 'The subscription reaches parity with the perpetual licence at $t = 25$ years - $25 years$ of rent equals one $3,000$ grant - and the honest comparison is the crossover, not the headline price.' },
    { kind: 'callout', tone: 'theorem', title: 'The parity law of renting software', text: 'Let a perpetual licence cost P and an equivalent subscription cost r per year. Then the rented cost equals the granted cost after P/r years, and exceeds it forever after. The law says nothing about which is better: it only fixes the one number - the crossover year - that any honest comparison must name.' },
    { kind: 'equation', latex: 't_{\\text{parity}} = \\frac{P}{r} \\tag{2}', note: 'The years-to-parity of a subscription: the perpetual price divided by the yearly rent. With P = 3,000 and r = 120 per year, the parity time is exactly 25 years.' },
    { kind: 'equation', latex: '\\text{grant overage} = m - s \\tag{3}', note: 'The per-seat overage: with m machines running and s seats granted, the machines beyond the grant number m - s. One licence on three machines leaves 2 beyond the grant.' },
    { kind: 'para', text: 'The app-store era added a sixth door\u2019s modern dress rather than a seventh family: the store-curated subscription and the 99-cent proprietary app are doors (vi) and (i) with a shelf in front of them. When Apple\u2019s App Store opened in July 2008 it carried about 500 apps; the shelves since have grown a thousandfold, but every item on them still sells one of the six permissions. The reader who can name the door can predict the terms before reading them.' },

    // ================================================================
    // 8. THE EULA, READ HONESTLY
    // ================================================================
    { kind: 'heading', text: 'The EULA, Read Honestly' },
    { kind: 'para', text: 'The end-user licence agreement is the long contract under the button marked agree - the document almost nobody reads and everybody signs. The honest position is between the two caricatures: it is not a trap waiting for exactly you, and it is not decoration. It is the licence\u2019s fine print, and three clauses live there that a reader-level literacy should always scroll for.' },
    { kind: 'list', marker: 'roman', items: [
      'the seat count - how many machines or users the grant covers. One licence carried onto three machines is not three purchases; it is one grant running 2 beyond the grant - a quiet breach of the terms most users never knew they made;',
      'the transfer and resale terms - whether the permission may move with the machine when you sell it, lend it, or give it away;',
      'the data clauses - what the software may collect, where it may send it, and what happens when you stop paying. The subscription door makes this clause worth reading twice: software that stops when you stop paying should also say what happens to your work when it stops.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — the day-31 habits', text: 'Two calendar facts decide most accidental breaches: the trial that ends (day 31 of a 30-day shareware trial - pay or stop, and the honest stop includes uninstalling), and the seat count (the second machine is the usual trespass). Neither is piracy in the dramatic sense; both are permissions exceeded. The cure is the same as for any contract: know the number, count the machines, and let the count agree with the grant.' },

    // ================================================================
    // 9. PIRACY: THE HONEST LINE
    // ================================================================
    { kind: 'heading', text: 'Piracy: The Honest Line' },
    { kind: 'para', text: 'One paragraph, no sermon. Copying software beyond its licence takes a permission nobody granted. It is not theft of a rival\u2019s copy - the maker loses no physical thing - but it is theft of the permission itself: the maker sells exactly one product, the grant, and the unlicensed copy takes it without paying. The honest reader holds two truths at once: the wrong is real, and the legal answer to \u201csoftware should be shareable\u201d already exists - it is door four, the free and open-source world, where the sharing is the point and the four freedoms travel with every copy. If the price of a tool is beyond you, the open shelf is the honest road, not the pirated one.' },

    // ================================================================
    // 10. DOORSTEPS AND THE EXAM CORNER
    // ================================================================
    { kind: 'heading', text: 'Where This Lesson Stops, and the Exam Corner' },
    { kind: 'para', text: 'The doorsteps, named as promised. Package-management internals - repositories, signatures, dependency resolution - are the operating system\u2019s craft, and this library\u2019s Operating Systems book owns that ground whole. The law of software licences is a profession of its own: this lesson teaches the literacy to read a grant, not legal advice, and any real dispute wants a lawyer, not a textbook. What this lesson keeps is the reader-level craft: bring software home by a chosen route, read a version number as a census of changes, hear an end-of-life date as arithmetic, and name a licence family on sight.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — what examinations ask of this ground', text: 'Examinations (banking and SSC computer-awareness papers, school boards, and Cambridge 9618-style syllabi) ask this lesson\u2019s ground in five shapes, all exam-style wording, never a quoted paper: (1) classify a licence - given a one-line description, name the family (freeware versus free and open-source is the favourite trap: free of charge is not free of freedom); (2) the next version - given 2.4.1 and a change type, produce the bumped number, with 1.9.9 to 1.10.0 as the anti-decimal trap; (3) update versus upgrade, and what end of life switches off; (4) the install census in order - files, registration, associations, settings, services; (5) the boot-to-update walk - why the maker keeps knocking, answered in the three honest reasons. Practise the shapes, not the wording.' },
    { kind: 'formula', name: 'The install census (five marks)', latex: '\\text{files} \\to \\text{registration} \\to \\text{associations} \\to \\text{settings} \\to \\text{service}', note: 'Installing is registering with the OS, and the five marks are the registration. Uninstalling walks them backwards; the leftover census of three (settings, caches, associations) is what an unwind can miss.' },
    { kind: 'formula', name: 'The semver bump law', latex: '\\text{MAJOR}.\\text{MINOR}.\\text{PATCH}', note: 'Bug fix: PATCH + 1 (2.4.1 to 2.4.2). New feature: MINOR + 1, PATCH reset (to 2.5.0). Breaking change: MAJOR + 1, both reset (to 3.0.0). The fields count separately: 1.9.9 plus a feature is 1.10.0, never 2.0.0.' },
    { kind: 'formula', name: 'The years-to-parity law', latex: 't_{\\text{parity}} = P / r', note: 'A perpetual licence at P against a subscription at r per year meet after P/r years - 3,000 against 120 per year meets at 25 years - and the rent continues after parity while the grant runs on.' },
    { kind: 'formula', name: 'The licence families (six doors)', latex: '\\{\\text{prop}, \\text{freeware}, \\text{shareware}, \\text{FOSS}, \\text{public domain}, \\text{SaaS}\\}', note: 'What you pay, whether the source opens, what you may do. Only door four grants the four freedoms; freeware is free of charge with the source still closed; day 31 ends the shareware trial; the seat count m against s seats leaves m - s beyond the grant.' },
    { kind: 'terms', items: [
      ['software licence', 'the maker\u2019s grant of permission to use software under stated conditions; buying media or a key buys the permission, not the program'],
      ['proprietary software', 'software whose licence charges for use and keeps the source code closed'],
      ['freeware', 'software licensed free of charge with the source still closed and conditions still binding'],
      ['shareware', 'software licensed on an honest trial: try free, then pay to keep using'],
      ['free and open-source software', 'software whose licence grants the four freedoms: run, study and modify, redistribute, and distribute modifications'],
      ['public domain', 'software with no rights reserved: free for any use, modification and redistribution'],
      ['subscription (SaaS)', 'software rented by the period: the permission lasts exactly as long as the payments'],
      ['end-user licence agreement (EULA)', 'the contract carrying the licence\u2019s fine print: seat counts, transfer terms, data clauses'],
      ['end of life (EOL)', 'the maker\u2019s announced date after which no fixes arrive for that version'],
      ['semantic versioning', 'the MAJOR.MINOR.PATCH convention that encodes the kind of change in the number itself'],
      ['per-seat overage', 'machines running beyond the seats granted: m machines on s seats leave m - s beyond the grant'],
      ['parity time', 'the years a subscription needs to cost as much as the perpetual licence it replaces: P divided by r'],
    ] },

    // ================================================================
    // CHECK YOURSELF (quiz, key [0, 2, 1, 3, 2])
    // ================================================================
    { kind: 'quiz', items: [
      { q: 'When you pay for a piece of proprietary software, what have you bought?',
        options: ['The permission to use it under stated conditions - not the program itself',
                  'The program itself, as you would buy a chair',
                  'The source code and the right to change it',
                  'A share of the maker\u2019s company and its future versions'],
        answer: 0,
        explain: 'Option A is the licence\u2019s whole idea: the grant is the product (option A). Option B is the common misconception - the copy is yours to run, not to own. Option C describes what only the free and open-source door grants; proprietary means the source stays closed. Option D confuses a purchase with an investment; no software licence sells equity.' },
      { q: 'A program reports version 2.4.1. The maker fixes one bug and ships the corrected release. Its version number is:',
        options: ['2.5.0', '3.0.0', '2.4.2', '2.4.1 again, since nothing was added'],
        answer: 2,
        explain: 'A bug fix bumps PATCH by one: 2.4.1 becomes 2.4.2 (option C). Option A (2.5.0) is the bump for a new feature - MINOR + 1 with PATCH reset. Option B (3.0.0) is the breaking-change bump. Option D is wrong because the number\u2019s entire job is to make even the smallest change visible.' },
      { q: 'Freeware is best described as:',
        options: ['Software whose source is open for anyone to modify',
                  'Software you may use only after paying a trial fee',
                  'Software licensed free of charge while the source stays closed',
                  'Software with no rights reserved at all'],
        answer: 2,
        explain: 'Freeware is free of charge, not free of freedom: the source stays closed and conditions still bind (option C). Option A is the free and open-source family. Option B inverts shareware, which is try-then-pay. Option D is the public domain - rare, and a different door entirely.' },
      { q: 'The four freedoms - run, study and modify, redistribute, distribute modifications - belong to which licence family?',
        options: ['Every family that charges no money', 'Shareware after the trial is paid', 'Proprietary software bought at full price', 'Free and open-source software'],
        answer: 3,
        explain: 'The four freedoms are the definition of the free and open-source grant (option D). Option A is the classic trap: freeware charges nothing yet grants none of the four. Option B is shareware - paying ends the trial but the source stays closed. Option C is proprietary: full price buys breadth of use, never the freedoms.' },
      { q: 'A 30-day shareware trial is on its 31st day, and you still want to use the program. The honest walk is:',
        options: ['Keep using it - trials are advisory', 'Reinstall it to restart the clock', 'Pay for the licence or stop using (and uninstall) it', 'Copy it to a second machine, which the trial permits'],
        answer: 2,
        explain: 'On day 31 the grant has expired: pay or stop, and an honest stop includes uninstalling (option C). Option A misreads a contract as a suggestion. Option B games the clock - the restart trick breaches the spirit and usually the letter. Option D compounds the error with a seat-count breach; trials rarely cover a second machine at all.' },
    ] },

    // ================================================================
    // EXERCISES (15, graded; >= 4 with solution figures)
    // ================================================================
    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Name the five marks of the install census, in order, and say in one line what each mark does.',
          solution: ['Recall the census as the contract the installer signs on the program\u2019s behalf.', 'Mark one, files: the program\u2019s code is copied to its permanent home on the storage shelf.', 'Mark two, registration: the OS gains the shortcut and the menu entry that make the program findable and launchable.', 'Mark three, associations: the system\u2019s table learns which file kinds this program answers for.', 'Mark four, settings: the program\u2019s preferences are written so it starts configured.', 'Mark five, service: occasionally a driver or background helper is added so the hardware and the OS can host the program.', 'Hence the five marks are files, registration, associations, settings and the occasional service.'],
          answer: 'The install census: files, registration, associations, settings, and the occasional driver or service.' },
        { q: 'A program is described as free of charge, its source stays closed, and its conditions still bind. Name the licence family, and name the family it is most often confused with.',
          solution: ['Read the three clauses against the six doors.', 'Free of charge closes the proprietary door; source closed closes the open-source door.', 'Conditions still binding confirms this is a grant, not a rights-free zone.', 'The family is freeware.', 'The confusion is with free and open-source software, whose free means the four freedoms, not the price.', 'Hence the family is freeware, most often confused with free and open-source software.'],
          answer: 'Freeware; most often confused with free and open-source software.' },
        { q: 'State the three honest reasons a maker keeps issuing updates.',
          solution: ['Recall the knocking at the door.', 'Reason one, bugs: instructions that were mis-made are repaired.', 'Reason two, security: holes that were found are plugged before they are walked through.', 'Reason three, features: work the program could not do is added.', 'Hence updates arrive to fix bugs, plug security holes, and add features.'],
          answer: 'Bugs repaired, security holes plugged, features added.' },
        { q: 'exam-style: What does end of life (EOL) mean for a version of software, and what does it NOT switch off?',
          solution: ['Take the definition apart.', 'EOL is the maker\u2019s announced date after which no fixes arrive for that version - no bug repairs and no security plugs.', 'What it does not switch off: the software itself, which keeps running exactly as installed.', 'The machine does not stop; the support does.', 'Hence EOL ends the arrivals, not the running - the version works on, unpatched.'],
          answer: 'EOL ends the arrival of fixes, not the running of the software.' },
        { q: 'A licence grants one seat. You run the software on three machines. How many machines stand beyond the grant, and what is the honest cure?',
          solution: ['Apply the overage arithmetic: machines beyond the grant are m minus s.', 'Here m is 3 machines and s is 1 seat.', 'So the overage is 3 minus 1, which is 2.', 'Two machines stand beyond the grant - a quiet breach of the terms.', 'The honest cure is to buy the seats you run (two more) or to retire the extra machines.', 'Hence the overage is 2, cured by buying up or thinning down.'],
          answer: '2 machines beyond the grant; buy two more seats or run fewer machines.', figures: [{ caption: 'The seat-count walk: one granted seat against three running machines. The granted machine stands inside the permission frame; the second and third stand beyond it, and the overage is the plain difference m - s = 3 - 1 = 2. The honest exits are drawn beneath: buy the seats you run, or thin the fleet to the grant.', svg: cf53SolSeatSvg() }] },
      ] },
      { level: 'L2', questions: [
        { q: 'From version 2.4.1, give the next version number for each change, with the reason: (a) one bug fixed; (b) one new feature; (c) a change that breaks old saved files.',
          solution: ['Read the kind of change, then apply the semver bump law.', '(a) A bug fix bumps PATCH by one: 2.4.1 becomes 2.4.2.', '(b) A new feature bumps MINOR by one and resets PATCH: 2.4.1 becomes 2.5.0.', '(c) A breaking change bumps MAJOR by one and resets both others: 2.4.1 becomes 3.0.0.', 'Each kind of change names itself in the number - that is the convention\u2019s entire point.', 'Hence the three successors are 2.4.2, 2.5.0 and 3.0.0.'],
          answer: '2.4.2 (bug fix), 2.5.0 (feature), 3.0.0 (breaking change).', figures: [{ caption: 'The bump ladder from 2.4.1: the bug-fix rung to 2.4.2 (PATCH + 1), the feature rung to 2.5.0 (MINOR + 1, PATCH reset) and the breaking rung to 3.0.0 (MAJOR + 1, both reset). Each rung carries its reason tag, so the number reads as a census of the change.', svg: cf53SolBumpSvg() }] },
        { q: 'A colleague says: from 1.9.9, one new feature makes the version 2.0.0, because 9.9 rounds up. Correct the claim and give the true successor.',
          solution: ['Spot the decimal illusion.', 'Version fields are counters, not decimals: they carry no place value and never round.', 'A new feature bumps MINOR by one and resets PATCH, leaving MAJOR untouched.', 'So MINOR 9 goes to 10, PATCH 9 resets to 0, and MAJOR stays 1.', 'The true successor is 1.10.0.', 'Hence the claim is wrong: the successor is 1.10.0, and 2.0.0 would announce a breaking change that never happened.'],
          answer: 'The successor is 1.10.0; 2.0.0 would falsely announce a breaking change.' },
        { q: 'How many releases lie on the patch ladder from 2.4.1 to 2.4.5 inclusive, and how many steps is that? Show the count.',
          solution: ['List the ladder: 2.4.1, 2.4.2, 2.4.3, 2.4.4, 2.4.5.', 'Counting the rungs gives 5 releases.', 'The steps between them are the differences: 5 minus 1, which is 4.', 'Each step is one bug fix under the bump law.', 'Hence the ladder holds 5 releases across 4 fixing steps - four releases after the first.'],
          answer: '5 releases, 4 steps (four releases after 2.4.1).' },
        { q: 'exam-style: A word processor is offered as a perpetual licence at 3,000, or a subscription at 120 per year. Compute the years to parity and state, in one honest sentence, what parity does and does not tell you.',
          solution: ['Set the two accumulations equal: 3,000 = 120 times t.', 'Divide by the yearly rent: t = 3000/120.', 'Compute: t = 25, so the rented cost meets the granted cost after 25 years.', 'What parity tells you: the crossover year the headline price never mentions.', 'What it does not tell you: which side is better - most machines retire long before 25 years, and the subscription usually bundles updates the perpetual licence sells separately.', 'Hence parity sits at 25 years, and it fixes the crossover, not the verdict.'],
          answer: 'Parity at 25 years; it names the crossover, not the better deal.', figures: [{ caption: 'The years-to-parity chart: the flat perpetual line at 3,000 against the rising rent line at 120 per year. The rent line crosses the grant line at exactly t = 25 years; before the crossing the rent is cheaper, after it the rent exceeds the grant - and continues rising while the grant runs on.', svg: cf53SolParitySvg() }] },
        { q: 'Classify each of these six grants by family: (a) try free for 30 days, then pay; (b) source open, four freedoms travel with the copy; (c) pay once, source closed, one machine; (d) no rights reserved at all; (e) 120 per year, stops when payments stop; (f) free of charge, source closed.',
          solution: ['Match each grant to its door on the street.', '(a) The trial shape is shareware.', '(b) The four freedoms with the source name free and open-source software.', '(c) Pay once, closed source, seat-limited is proprietary.', '(d) No rights reserved is the public domain.', '(e) Rent by the period is the subscription (SaaS).', '(f) Free of charge with the source closed is freeware.', 'Hence the six are: shareware, free and open-source, proprietary, public domain, subscription, freeware.'],
          answer: 'shareware, free and open-source, proprietary, public domain, subscription, freeware.', figures: [{ caption: 'The licence sort board: six scenario cards, each matched to its door on the street - the trial to shareware, the four freedoms to free and open-source, the paid closed grant to proprietary, the rights-free claim to the public domain, the monthly rent to the subscription, and the free-of-charge closed gift to freeware.', svg: cf53SolSortSvg() }] },
      ] },
      { level: 'L3', questions: [
        { q: 'A user uninstalls a program properly (through its uninstaller) yet later finds three kinds of traces. Name them, explain why each survives a proper uninstall, and say which uninstall route leaves the fewest.',
          solution: ['Recall the leftover census of three.', 'Settings survive because the uninstaller keeps them deliberately: a reinstall should find your preferences waiting.', 'Caches survive by bookkeeping: they scatter into folders whose names vary by system, and no uninstaller chases every one.', 'File associations survive by ghost-keeping: the claim can be edited, inherited or doubled, leaving a stale row that outlives its claimant.', 'The store route leaves the fewest: the catalogue that wrote the marks unwrites them from its own single ledger.', 'Hence the three are settings, caches and associations, and the shelf\u2019s own route uninstalls cleanest.'],
          answer: 'Settings, caches, file associations; the store/package route leaves the fewest.', figures: [{ caption: 'The uninstall leftovers map: the program\u2019s five install marks struck through, with the three survivors marked in place - the settings home kept for a possible return, the caches scattered in unowned folders, and the stale association row still naming the departed program. The legend carries the cure: the store route unwinds from one ledger.', svg: cf53SolLeftoverSvg() }] },
        { q: 'Windows XP drew support from October 2001 to 8 April 2014; Windows 10 from July 2015 to 14 October 2025. Compute both spans in years, the difference between them, and the gap between the two end dates in days (about 11.5 years). Then state what every reader should do with an EOL date.',
          solution: ['Take the spans first: 2014 minus 2001 gives 13 years for XP.', 'Then 2025 minus 2015 gives 10 years for Windows 10.', 'The difference: 13 minus 10, so XP drew 3 years more support.', 'The gap between ends: from 8 April 2014 to 14 October 2025 is 4,207 days - about 11.5 years.', 'The reader\u2019s walk: plan the migration before the end date, and never trust an unpatched machine with anything that matters.', 'Hence XP 13 years, Windows 10 10 years, the ends 4,207 days apart.'],
          answer: 'XP 13 years, Windows 10 10 years (3 apart), ends 4,207 days apart.', figures: [{ caption: 'The EOL timeline: XP\u2019s support bar running October 2001 to 8 April 2014 (13 years) and Windows 10\u2019s running July 2015 to 14 October 2025 (10 years), with the 4,207-day gap between the two end dates marked - about 11.5 years. The reader\u2019s duty rides beneath: plan the migration before the end, not after.', svg: cf53SolEolSvg() }] },
        { q: 'One program\u2019s whole journey, told in contracts: it arrives as a 30-day trial; on day 31 you pay; the installer walks its five marks; a year later you see 2.4.1 become 2.5.0; finally you uninstall and one kind of trace survives. Name each contract event (family, marks, bump, leftover) in order.',
          solution: ['Walk the journey stage by stage.', 'Arrival as a 30-day trial: the shareware family\u2019s honest trial.', 'Payment on day 31: the grant converts from trial to paid permission.', 'The installer\u2019s work: the five marks - files, registration, associations, settings, and the occasional service.', 'The version move 2.4.1 to 2.5.0: a MINOR bump, announcing one new feature with PATCH reset.', 'One surviving trace on uninstall: most commonly the settings, kept deliberately for a possible return.', 'Hence the journey reads: shareware trial, paid grant, the five-mark install, the feature bump, the settings leftover.'],
          answer: 'Shareware trial; paid grant; the five-mark install; the 2.5.0 feature bump; the settings leftover.' },
        { q: 'exam-style: A school lab runs one proprietary licence of a design tool on three machines, has let its antivirus (freeware) trial-expire into year two unpaid, and is considering moving both tools to free and open-source alternatives. Audit the current position against the licence law of this lesson, and name what the move would change.',
          solution: ['Audit the design tool first: one seat on three machines leaves 3 minus 1, so 2 machines beyond the grant.', 'Audit the antivirus: a trial used past its end is shareware beyond day 31 - a permission expired, so pay or stop applies.', 'The current position: two quiet breaches, both of permission rather than of dramatic piracy.', 'The move to free and open-source alternatives: the seat question dissolves (freedom 0 runs anywhere), the trial question dissolves (no expiry), and the four freedoms travel with every copy.', 'What the move would not change: the craft of installing, updating and uninstalling - the census and the semver law still govern the housekeeping.', 'Hence the audit finds 2 machines and one expired trial beyond their grants, and the move converts both questions from terms to freedoms.'],
          answer: 'Two machines beyond the grant and one expired trial; the move dissolves both into the four freedoms.' },
        { q: 'The complete door census. For each of the six licence families, state in one line: what you pay, whether the source opens, and the one term that most often surprises a new reader.',
          solution: ['Door (i), proprietary: you pay for permission; source closed; the surprise is the seat count - machines beyond the grant are breaches.', 'Door (ii), freeware: free of charge; source still closed; the surprise is that conditions bind even at zero price.', 'Door (iii), shareware: try free, then pay; source closed; the surprise is day 31 - the trial\u2019s end is contractual, not advisory.', 'Door (iv), free and open-source: free as in freedom, price optional; source open; the surprise is that the freedoms travel with copies - even sold ones.', 'Door (v), public domain: nothing paid, nothing reserved; nothing to open since nothing is held; the surprise is its rarity - most claims to it are mislabels.', 'Door (vi), subscription: rent by the period; source closed (typically); the surprise is the stop - the software goes when the payments do, so your work\u2019s exit plan matters.', 'Hence the six doors read: pay-closed-seats, free-closed-conditions, trial-closed-day-31, freedom-open-copies, nothing-nothing-rarity, rent-closed-stop.'],
          answer: 'The six doors: pay/seats; free/conditions; trial/day 31; freedom/copies; rarity/nothing; rent/the stop.' },
      ] },
    ] },
"""

SEAT_SVG = r"""
/* ================================================================== */
/* SOLUTION FIGURE — the seat-count walk: 1 granted seat, 3 machines  */
/* ================================================================== */
function cf53SolSeatSvg(): string {
  const W = 760
  const H = 300
  const s: string[] = []
  s.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" font-family="${f53}" role="img" aria-label="The seat-count walk: one granted seat shown as a permission frame around the first of three running machines, with the second and third machines standing beyond the frame and the overage counted as three minus one equals two. Beneath, the two honest exits: buy the seats you run, or thin the fleet to the grant.">`)
  s.push(cf53T(W / 2, 26, 12, c53.teal, 'middle', 'ONE SEAT, THREE MACHINES - THE OVERAGE WALK', true))
  // the permission frame around machine 1
  s.push(`<rect x="60" y="56" width="200" height="140" rx="10" fill="${c53.panelA}" stroke="${c53.struct}" stroke-width="2.4"/>`)
  s.push(cf53T(160, 78, 10.5, c53.ink, 'middle', 'the granted seat (s = 1)', true))
  // machine 1 inside
  s.push(`<rect x="100" y="100" width="120" height="64" rx="6" fill="${c53.white}" stroke="${c53.teal}" stroke-width="2"/>`)
  s.push(cf53T(160, 126, 10, c53.tealInk, 'middle', 'machine 1', true))
  s.push(cf53T(160, 144, 9, c53.tealInk, 'middle', 'inside the grant'))
  // machines 2 and 3 beyond
  s.push(`<rect x="300" y="100" width="120" height="64" rx="6" fill="${c53.white}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T(360, 126, 10, c53.warn, 'middle', 'machine 2', true))
  s.push(cf53T(360, 144, 9, c53.warn, 'middle', 'beyond the grant'))
  s.push(`<rect x="450" y="100" width="120" height="64" rx="6" fill="${c53.white}" stroke="${c53.warn}" stroke-width="2"/>`)
  s.push(cf53T(510, 126, 10, c53.warn, 'middle', 'machine 3', true))
  s.push(cf53T(510, 144, 9, c53.warn, 'middle', 'beyond the grant'))
  // the overage equation
  s.push(cf53T(640, 120, 11, c53.ink, 'middle', 'm - s', true))
  s.push(cf53T(640, 138, 11, c53.ink, 'middle', '= 3 - 1'))
  s.push(cf53T(640, 158, 13, c53.accent, 'middle', '= 2', true))
  s.push(cf53T(640, 176, 9, c53.tealInk, 'middle', 'beyond the grant'))
  // the honest exits panel
  s.push(`<rect x="16" y="216" width="${W - 32}" height="66" rx="8" fill="${c53.panelB}" stroke="${c53.conn}" stroke-width="2"/>`)
  s.push(cf53T(W / 2, 240, 10, c53.ink, 'middle', 'the honest exits', true))
  s.push(cf53T(W / 2, 258, 9.5, c53.tealInk, 'middle', 'buy the seats you run (two more) - or thin the fleet to the grant (one machine)'))
  s.push(cf53T(W / 2, 274, 9.5, c53.tealInk, 'middle', 'the overage is arithmetic, not drama: make the count agree with the grant'))
  s.push('</svg>')
  return s.join('')
}

"""

src = open('part-cf53.ts').read()
# insert the seat helper right before the lesson export (after the last helper)
anchor = '/* ================================================================== */\n/* BODY FIGURE 1'
assert anchor in src, 'body figure 1 anchor missing'
src = src.replace(anchor, SEAT_SVG + anchor, 1)
open('part-cf53.ts', 'w').write(src)
print('seat helper inserted')

src = open('part-cf53.ts').read()
assert '__CF53_APPEND__' in src, 'append marker missing'
src = src.replace('/* __CF53_APPEND__ */', COMPLETION)
open('part-cf53.ts', 'w').write(src)
print('spliced; new size', len(src))
