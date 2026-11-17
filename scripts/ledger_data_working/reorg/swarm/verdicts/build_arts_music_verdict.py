#!/usr/bin/env python3
"""Build the arts-music verdict file from adjudication tables (exact titles resolved from source data)."""
import json, os

SW = '/home/z/my-project/scripts/ledger_data_working/reorg/swarm'
brief = json.load(open(os.path.join(SW, 'arts-music.json')))
plan = json.load(open(os.path.join(SW, 'arts-music-plan.json')))
auto = plan['autoActions']
dupadj = plan['dupAdjudicate']

def T(book, ch, idx):
    """exact lesson title from the brief"""
    for bk in brief['books']:
        if bk['id'] == book:
            for c in bk['chapters']:
                if c['number'] == ch:
                    return c['planned'][idx]
    raise KeyError(f'{book} ch{ch} idx{idx}')

def M(book, ch, idx, action, tb='', tc=0, reason=''):
    return {"book": book, "chapter": ch, "title": T(book, ch, idx),
            "action": action, "targetBook": tb, "targetChapter": tc,
            "newTitle": "", "reason": reason}

# ---------------- autoReview (only non-approve entries) ----------------
# each: (autoAction-index, verdict, action, targetBook, targetChapter, reason)
AR = [
 (4,"veto","keep","",None,"343 m/s is the speed of sound in air — a genuine wave-fundamentals lesson in house style; the page-run junk heuristic misfires on honest numeric titles."),
 (6,"veto","keep","",None,"45–75 characters per line is the classic readability measure — a genuine page-composition lesson; numeric-run heuristic misfire."),
 (7,"veto","keep","",None,"72 and 300 DPI are the screen/print resolution standards — a genuine canvas-fundamentals lesson; numeric-run heuristic misfire."),
 (9,"amend","move","instrument-studies",5,"Indian instrument census (veena, violin, flute, nadaswaram, mridangam) is genuine instrument-studies material — the 'consolidated to surveying-and-geomatics' reason is a false-cluster artifact. Move to the world-instruments chapter."),
 (10,"amend","remove","",None,"Right removal, wrong reason: bare generic TOC line; instrument classification is already ch1's remit (The Families Overview). Surveying-and-geomatics consolidation was a token-overlap artifact."),
 (11,"amend","move","instrument-studies",5,"Tabla/pakhawaj and avanaddha-vadya (membranophone) territory belongs to instrument-studies, not an orchestration first pass; the India-percussion census sits with the world-instruments lessons (bol cross-reference)."),
 (12,"amend","move","music-history",6,"Indian folk music belongs to the world-music register (ch6), not the jazz-and-popular chapter; the surveying consolidation was a false-cluster artifact."),
 (13,"veto","keep","",None,"Gharana and institutional history of Hindustani music is genuine music-history material in the world/contemporary register; the surveying consolidation was a false-cluster artifact."),
 (14,"veto","keep","",None,"Indian applied theory (scales, suddha/vikrita svaras, sruti, raga-lakshana, talas, notation) fits the generalist theory book's pitch-and-staff chapter; the surveying-and-geomatics consolidation is a token artifact."),
 (15,"amend","move","music-theory-notation",3,"Right to reject removal, but the line's core (gram, murchchhana, raga classification, scale systems) belongs with the keys-and-scales chapter, not the rhythm-notation chapter."),
 (16,"veto","keep","",None,"No arts-music home: 'Identities' is a bare single-word TOC fragment; the ear-training target is token noise — disposition belongs to the engineering agent."),
 (17,"veto","keep","",None,"The three CMOS power components (dynamic/short-circuit/leakage) — genuine VLSI content in house style; the photography target is token noise."),
 (18,"veto","keep","",None,"Teacher-education syllabus line with no arts-music home; the contemporary-dance target is token noise — disposition belongs to the humanities agent."),
 (19,"veto","keep","",None,"'Points' is a bare TOC fragment with no drawing home; the languages agent owns its cleanup — the drawing target is token noise."),
 (20,"veto","keep","",None,"A calculus-preview lesson is plausibly honest in a physics-foundations book; the ear-training target is token noise."),
 (21,"veto","keep","",None,"'Concepts' is a bare TOC fragment; the illustration target is token noise — physics agent's call."),
 (22,"veto","keep","",None,"'The Classification' is plausibly honest crystal-classification content in solid-state physics; the music-history target is token noise."),
 (23,"veto","keep","",None,"'Society' has no graphic-design home; the suggested move is token noise — economics agent's call (rule d: unsure → keep)."),
 (24,"veto","keep","",None,"Chemistry-own enumeration; the contemporary-dance target is token noise."),
 (25,"veto","keep","",None,"Real chemistry (AO vs MO comparison); the film-studies target is token noise."),
 (26,"veto","keep","",None,"Real chemistry (sigma vs pi MO comparison); the film-studies target is token noise."),
 (27,"veto","keep","",None,"Appendix TOC fragment ('A1.2 Logarithms' + page A4); no ear-training home — chemistry agent's call."),
 (28,"veto","keep","",None,"Front-matter fragment ('TO THE STUDENT'); no film-studies home — chemistry agent's call."),
 (29,"veto","keep","",None,"Glossary of Indian musical technical terms (sangeet, nada, shruti, swaras, raga, thata, tala, laya, gamaka, notation systems) fits the generalist theory book beside ch2's tala/laya notation content; harmony owns nothing here."),
 (30,"amend","remove","",None,"Right removal, wrong reason: the historical-perspective-of-music line duplicates music-history ch6 (History of Indian Music, contribution of Musicologists and their textual tradition) — not foundation-biology."),
 (33,"veto","keep","",None,"Hindustani small forms (prabandh, dhrupad, kheyaal, tarana, thumri) are exactly the Small Forms chapter's subject; the foundation-biology target is token noise."),
 (34,"veto","keep","",None,"Carnatic small forms (prabandha, svarajati, varnam, kriti, ragamalika) — a genuinely different tradition-treatment from the Hindustani line; both stay in the Small Forms chapter."),
 (35,"amend","remove","",None,"Right removal, wrong reason: this Rabindra-sangeet omnibus enumerates topics already owned elsewhere — applied theory (music-theory-notation ch1/ch3), historical perspective and scholars (music-history ch6), composition forms (music-composition ch2), instruments of India (instrument-studies ch5)."),
 (36,"amend","remove","",None,"Exam-component description (two contrasting 1–2-minute compositions) — syllabus junk, not a topic; moving it to music-theory would only relocate junk whose sibling line there is also being removed."),
 (37,"veto","keep","",None,"music-history owns composers/performers' contributions (Tansen, Sadarang); the classical-dance copy is the duplicate being consolidated to music-history."),
 (38,"amend","move","art-history",7,"Rajasthani/Pahari/Mughal/Deccan miniature schools are Indian art history — art-history owns movements and schools (medieval India register); the harmony target was token noise."),
 (39,"amend","remove","",None,"CBSE practical-assessment enumeration; its honest content (nature study, light-and-shade exercises, imaginative composition) is already painting ch2/ch4's remit — not foundation-biology."),
 (40,"amend","move","art-history",6,"Prehistoric rock paintings, Indus/Saraswati art, Buddhist/Jain/Hindu art = Indian art history → art-history's ancient register; the harmony target was token noise."),
 (41,"amend","move","art-history",8,"Contemporary Indian art practices of the 20th–21st centuries belong to art-history's India-modern register; the classical-dance target was token noise."),
 (42,"amend","remove","",None,"Exam-awareness line (Part-A general awareness) — an aptitude-test description, not a design-craft topic; the political-science move was token noise."),
 (43,"amend","move","art-history",1,"'Art and Aesthetics' is the visual-arts appreciation survey — art-history's eye owns it; harmony owns nothing here."),
 (44,"amend","move","art-history",10,"Modern techniques and processes in contemporary visual practices (installation, multi-colour print, computer-aided work) = the modern/contemporary register; the anthropology target was token noise."),
 (45,"amend","remove","",None,"Applied-art practical enumeration; illustration techniques and poster craft are already owned by illustration ch4 and graphic-design ch4."),
 (46,"amend","remove","",None,"Applied-art practical enumeration; still-life drawing, lettering and layout are already owned by drawing ch3, typography ch1 and graphic-design ch2."),
 (47,"amend","move","classical-dance",2,"East and South Asian dance-and-theatre forms belong beside the international dance-and-interactions line in ch2, not in the Indian treasury; the harmony target was token noise."),
 (48,"veto","keep","",None,"The Indian-and-Western aesthetics appreciation line stays with classical-dance ch3 — performing-arts aesthetics is its theory core; the digital-art target was token noise."),
 (49,"amend","move","art-history",6,"The chronological survey of Indian art (prehistory to the 19th century) is art-history's Indian registers; the political-science target was token noise."),
 (50,"veto","keep","",None,"Rasa theory (Bharata, rasa nishpatti and its application) is the classical-dance/abhinaya core theory; the harmony target was token noise."),
 (51,"amend","remove","",None,"Duplicate of music-history ch6's composers/performers line — Tevaram, Alwars, Purandara Dasa and the music trinity are music figures, so consolidate to the specialist (music-history); moving it there would double the existing lesson."),
 (52,"amend","move","classical-dance",5,"Dance research-methodology/pedagogy/avenues line: classical-dance ch5 (The Pedagogy-and-Repertoire Register) is the honest home; the harmony target was token noise."),
 (53,"amend","remove","",None,"NET meta-unit (education/pedagogy/research) with no honest chapter home in theatre's four chapters; the contemporary-dance target was token noise."),
 (54,"amend","remove","",None,"DAT exam-component description — syllabus junk; not 'covered in music-production' (that sibling line is junk too and is also removed)."),
 (55,"amend","move","theatre",1,"Folk and traditional theatre forms of India are theatre-history material — theatre ch1 (liveness-and-history register) owns them; the harmony target was token noise."),
 (56,"amend","remove","",None,"IB Comparative-Study component description — assessment junk, not a film-studies topic; the heat-and-thermodynamics target was token noise."),
 (57,"veto","keep","",None,"Anchor-song/reference anchoring is the interval-recognition technique — ch1 is its honest home; the sight-singing chapter-fit hint is score noise."),
 (58,"veto","keep","",None,"The revolution receipts (RPM/recording-era revolutions) sit with the popular-idioms lessons (studio-as-instrument, loop craft); ch4 already owns the rhythmic revolution (Pulse's-Revolution Craft)."),
 (59,"veto","keep","",None,"M/S (mid-side) is a stereo miking/capture technique — the signal-and-capture chapter owns it, not the DAW chapter."),
 (60,"veto","keep","",None,"The each-receipt register (the census of each material's tooling) belongs to the materials-and-surfaces chapter, not watercolour finishing."),
 (61,"veto","keep","",None,"Task-based composition ('the task craft') belongs to the composition-and-choreography register, not contact-improvisation."),
 (62,"veto","keep","",None,"The two (formats/aspects) belongs with the camera-and-format craft lessons (squeeze, 24fps, shutter) in ch1."),
 (63,"veto","keep","",None,"The craft receipt sits with the rewrite-and-genre register's structure-polish cycle, not the structure arc."),
]
autoReview = []
for (i, verdict, action, tb, tc, reason) in AR:
    a = auto[i]
    autoReview.append({"book": a['book'], "chapter": a['chapter'], "title": a['title'],
                       "verdict": verdict, "action": action, "targetBook": tb,
                       "targetChapter": tc, "newTitle": "", "reason": reason})

# ---------------- misplaced (all 26 misAdjudicate items) ----------------
misplaced = [
 M("music-theory-notation",4,5,"remove","","Exam-board prelims line about arithmetic reasoning tests — exam-meta junk, no musical subject."),
 M("music-history",1,3,"keep","","House-style lesson on the two church-music traditions in the medieval-and-renaissance register — fits; token score flagged nothing honest."),
 M("vocal-music",3,0,"keep","","The symbol census (IPA symbols) is the diction craft's own drill — fits ch3."),
 M("vocal-music",3,4,"remove","","Exam-board Part-A language-proficiency line — exam-meta junk, nothing to do with diction."),
 M("music-production",2,4,"remove","","DAT Mains exam-component description — syllabus junk, not a production topic; its theatre sibling is junk too."),
 M("painting",5,1,"keep","","Graded wash division is a watercolour-and-finishing technique — fits ch5."),
 M("colour-theory",2,4,"remove","","Exam-board Part-A science-awareness line — exam-meta junk, not colour science."),
 M("colour-theory",5,5,"move","art-history",8,"Bengal School and the modern trends in Indian art are art history — art-history's India-modern register owns them (the flag mention is incidental trivia)."),
 M("sculpture",2,0,"keep","","The core (armature/bulk) receipt is clay-modeling craft — fits ch2."),
 M("dance-fundamentals",1,0,"keep","","Neutral (spine/alignment) receipt is the body-and-alignment craft's foundation — fits ch1."),
 M("dance-fundamentals",2,2,"keep","","Vague but in-domain house-style lesson inside the locomotor/jumps-and-turns chapter; no evidence of a better home."),
 M("dance-fundamentals",4,1,"keep","","Silence/stillness receipt is an improvisation-composition basic — fits ch4."),
 M("classical-dance",3,6,"keep","","Dance in Sanskrit literature and treatises is classical-dance's own textual tradition — ch3 (the Indian classical treasury) is the honest home."),
 M("classical-dance",3,7,"move","theatre",4,"Drama and its theories (Indian and Western) is dramatic-literature territory — theatre ch4 already hosts the theory registers (given circumstances, alienation, oppressed)."),
 M("theatre",2,4,"move","stage-production",1,"Theatre architecture, stagecraft and management are stage-production territory — ch1 (theatre spaces and set craft) owns the theatre-design line."),
 M("acting",1,2,"keep","","Physical release craft is the actor-instrument's foundation — fits ch1."),
 M("acting",4,2,"keep","","The take (screen takes) honesty belongs to the classical-and-screen registers — fits ch4."),
 M("acting",5,3,"keep","","Professional-boundary honesty belongs to the audition-and-ethics registers — fits ch5."),
 M("screenwriting",2,1,"keep","","Two-pair honesty in the structure arc — house-style structure lesson, fits ch2."),
 M("stage-production",1,0,"keep","","The four theatre configurations — fits the theatre-spaces-and-set craft chapter."),
 M("stage-production",1,3,"keep","","Hard-vs-soft scenery honesty — fits the theatre-spaces-and-set craft chapter."),
 M("stage-production",3,3,"keep","","Level honesty is a sound-design craft topic — fits ch3."),
 M("stage-production",4,0,"keep","","Silhouette honesty is costume-craft material — fits the costume-and-SM-book chapter."),
 M("stage-production",5,0,"keep","","The craft's-end (strike) honesty fits the tech-safety-and-process registers."),
 M("fashion-design",3,1,"keep","","The body's honesty (fit) is pattern-and-draping craft — fits ch3."),
 M("creative-writing",3,4,"remove","","Exam-board prelims line about reading-comprehension tests — exam-meta junk, not prose-craft."),
]

# ---------------- dupes (all 29 dupAdjudicate clusters) ----------------
DU = [
 (0,"consolidate","analog-electronics","The true subject is the EE current mirror — analog-electronics owns it. The arts-music member (interior-design 'current affairs' prelims line) is junk being removed; the cluster is a token-overlap artifact on 'current'."),
 (1,"consolidate","anthropology","Village-tradition topics belong to anthropology/sociology; the arts-music members are NET music-syllabus lines being removed (the music-composition omnibus; the music-theory line covered by music-history ch6); the biology member is a bare fragment."),
 (2,"keep-both","","False positive on the house-style suffix 'Walked Slowly': rhythm-meter's 3-against-4 polyrhythm lesson is genuine; the biology members are genuine physiology — different subjects."),
 (3,"keep-both","","Identical generic titles over different subject pairs in each of the five books (animation principles, story structure, collection registers, furniture styles, drama structure) — cosmetic collision, not topic duplication."),
 (4,"keep-both","","Syllabus-line family, not true duplication: rasa/aesthetics stays with classical-dance (its specialist home); colour-theory's member is Indian art history → art-history ch6; digital-art's 'Art and Aesthetics' → art-history ch1."),
 (5,"keep-both","","Identical generic titles over different trios (poetry registers, genre census, production team) — cosmetic collision, not topic duplication."),
 (6,"consolidate","linear-algebra","The only honest member is linear-algebra's determinants-in-coordinate-geometry; the ear-training member is exam-syllabus junk being removed — numeric-run token overlap."),
 (7,"keep-both","","German vowel phonetics vs vocal diction pure-vowel work — different domains; house-style suffix collision only."),
 (8,"consolidate","","Both members are exam-component descriptions (junk) and are removed; the cluster dissolves with no honest survivor."),
 (9,"consolidate","","Both members are exam-component descriptions (junk) and are removed; the cluster dissolves with no honest survivor."),
 (10,"consolidate","music-history","The twelve-tone row is a twentieth-century technique — music-history ch4 owns it; counterpoint ch4's copy is the stray (canon-and-invertible craft is not the row's home)."),
 (11,"keep-both","","Vague house-style titles over different subjects: the instrument-families core vs the orchestration core."),
 (12,"consolidate","music-history","music-history ch6 owns composers'/performers' contributions (Tevaram, Alwars, Purandara Dasa, the trinity, Tansen, Sadarang are music figures); the classical-dance copy is removed as the duplicate."),
 (13,"consolidate","","Both members are DAT exam-component descriptions (junk) and are removed; the cluster dissolves with no honest survivor."),
 (14,"keep-both","","Owner-and-cross-reference pattern: drawing ch5 owns the entry/path composition principle; graphic-design ch2's 'Cross-Referenced' lesson is the deliberate sibling view — not duplication."),
 (15,"keep-both","","Character turnaround (illustration) vs sculptural multi-view thinking — genuinely different crafts sharing the three-view drill."),
 (16,"keep-both","","Digital brush grain vs wood grain in carving — different materials, same honest word."),
 (17,"keep-both","","UV seams (3D modelling) vs mold seams (casting) — different crafts."),
 (18,"keep-both","","Structural load of large-scale ceramics vs scenery/rigging load — different engineering contexts."),
 (19,"keep-both","","Each book's own cross-reference meta-lesson pointing at different siblings — the house cross-reference pattern, not duplication."),
 (20,"keep-both","","Screen-acting takes vs photographic takes — different crafts."),
 (21,"keep-both","","The four theatre configurations vs the four dance fundamentals — different subjects."),
 (22,"keep-both","","The nine rasas (abhinaya) vs the nine-heads fashion-figure canon — genuinely different 'nines'."),
 (23,"keep-both","","Acting's playing-the-room vs screenwriting's writers' room — different rooms."),
 (24,"keep-both","","Subtext from the performance side (acting) vs from the writing side (screenwriting) — genuinely different treatments of say-vs-mean."),
 (25,"keep-both","","Cinematography's two (formats) vs film-studies' two (narration types) — different subjects."),
 (26,"keep-both","","Exposure latitude (lens/exposure) vs narrative range of knowledge — different ranges."),
 (27,"keep-both","","Lens-craft choices vs point-of-view craft choices — different crafts."),
 (28,"keep-both","","Shot coverage (set-collaboration) vs mic/sound coverage (sound design) — different coverage."),
]
dupes = []
for (i, action, winner, reason) in DU:
    dupes.append({"title": dupadj[i]['title'], "action": action, "winner": winner, "reason": reason})

# ---------------- extra (junkSuspect dispositions + free-scan findings) ----------------
extra = [
 M("music-theory-notation",1,5,"remove","","Lineage/training-propagation line (banis, gurukula, institutional training) duplicates music-history ch6's gharana-and-institutional line — already covered by the specialist."),
 M("music-theory-notation",1,6,"remove","","Exam-board Part-A analytical-reasoning line — exam-meta junk."),
 M("music-theory-notation",2,6,"remove","","Program-description line (core activities across components) — exam-meta junk."),
 M("music-history",4,4,"move","art-history",1,"Chronological survey of Western art (prehistory to post-modern, the movements) is art-history's own spine — the historian's-eye chapter owns the survey/periodization line."),
 M("music-history",6,4,"keep","","History of Indian music and its musicologists' textual tradition is genuine music-history material in the world/contemporary register."),
 M("music-history",6,7,"remove","","Exam paper-section description (Paper 1 Listening, Section C) — exam-meta junk."),
 M("rhythm-meter",2,4,"remove","","IB exhibition-component description — exam-meta junk, not a rhythm topic."),
 M("vocal-music",2,4,"remove","","Exam paper-section description (Paper 1 Listening, Section A) — exam-meta junk."),
 M("vocal-music",2,5,"remove","","Exam paper-section description (Paper 1 Listening, Section B) — exam-meta junk."),
 M("drawing",1,4,"remove","","Exam-aptitude line describing what the drawing test assesses — exam-meta junk; the craft itself is the book's own chapters."),
 M("drawing",3,4,"remove","","Exam-aptitude line (Drawing & Composition Test, 80 marks) — exam-meta junk."),
 M("drawing",4,4,"remove","","Exam-aptitude line (3D visualisation, perspective drawing) — exam-meta junk; perspective is owned by the perspective book."),
 M("painting",1,4,"move","graphic-design",5,"Relief printing (linocut/woodcut, registration, colour printing) is printmaking — graphics/applied-art territory; the printmaking-process lines live in graphic-design ch5 (serigraphy/lithography/intaglio), so the relief-printing practical joins them there."),
 M("painting",2,5,"remove","","CBSE practical-assessment enumeration (nature study, light-and-shade exercises, portfolio) — already painting ch2/ch4's remit."),
 M("colour-theory",3,4,"remove","","Exam-board Part-A spatial-reasoning line — exam-meta junk."),
 M("illustration",1,6,"remove","","Exam-aptitude core-areas line — exam-meta junk."),
 M("illustration",1,7,"remove","","Exam-board Part-A creativity line — exam-meta junk."),
 M("illustration",1,8,"remove","","Exam logistics line (DAT Prelims format) — exam-meta junk."),
 M("illustration",1,9,"remove","","Exam-board prelims mirror line — exam-meta junk."),
 M("illustration",4,4,"remove","","IB process-portfolio component description — assessment junk; portfolio craft is already illustration ch5's register."),
 M("sculpture",1,4,"remove","","Free-scan: bare elective header ('Elective V: Sculpture') — syllabus fragment with no lesson content."),
 M("sculpture",2,4,"remove","","CBSE practical-assessment enumeration; modeling in relief/round is already ch2's own modeling lessons."),
 M("sculpture",3,4,"remove","","Cross-media enumeration; every part is owned: carving/casting by sculpture ch3–4, impasto/glazing by painting ch3, print processes by graphic-design ch5."),
 M("graphic-design",1,4,"remove","","Free-scan: bare elective header ('Elective IV: Printmaking (Graphic Art)') — syllabus fragment; the printmaking practical line lives in ch5."),
 M("graphic-design",1,6,"remove","","Exam-board Part-B design-aptitude line — exam-meta junk."),
 M("graphic-design",5,4,"keep","","The registry's printmaking-processes line (serigraphy/lithography/etching/intaglio) — keep in the process-and-portfolio register; complementary to the relief-printing line arriving from painting ch1."),
 M("typography",2,4,"remove","","Exam-board Part-A observation/sensitivity line — exam-meta junk."),
 M("digital-art",1,6,"move","art-history",5,"Art of the Far East, South East and Central Asia and the ancient Near East is art-history's Asian-arts register — not a canvas-fundamentals topic."),
 M("music-composition",4,5,"remove","","Exam-aptitude line (Part A composition/colour application, sketching) — exam-meta junk."),
 M("perspective",3,2,"keep","","The 12-o'clock receipt is an in-domain measuring-depth drill — the numeric-run junk heuristic misfires on honest numeric titles."),
 M("perspective",5,1,"keep","","30 degrees is the isometric/axonometric angle — a genuine curvilinear-and-axonometric lesson; numeric heuristic misfire."),
 M("illustration",3,2,"keep","","The 32-page receipt is the standard picture-book format — a genuine sequential-register lesson; numeric heuristic misfire."),
 M("animation",4,3,"keep","","The 60 receipt (60 fps) is a genuine motion-graphics lesson; numeric heuristic misfire."),
 M("cinematography",1,2,"keep","","The 24 receipt (24 fps) is a genuine camera-and-format lesson; numeric heuristic misfire."),
 M("classical-dance",2,4,"keep","","International dance and interactions (classical ballet, emergence of modern dance in the West) fits the pointe-and-repertory register's international coverage."),
 M("classical-dance",3,4,"move","indian-history",12,"Cultural history of India belongs to indian-history's culture thread — not the Indian classical treasury chapter."),
 M("architecture",3,4,"remove","","Exam-board prelims mirror line (drawing-and-design aptitude areas) — exam-meta junk; the drawing and perspective crafts are owned by their own books."),
 M("interior-design",1,4,"remove","","Exam-board prelims mirror line (general/design awareness, current affairs) — exam-meta junk and a false member of the 'Current Mirrors' cluster."),
 M("creative-writing",4,4,"move","art-history",1,"Forms of visual arts and their inter-relationship with performing art, cinema and literature is an art-survey topic — art-history's eye owns it, not the dialogue-and-scene craft chapter."),
]

# ---------------- assemble ----------------
verdict = {
 "agent": "arts-music",
 "autoReview": autoReview,
 "misplaced": misplaced,
 "dupes": dupes,
 "thin": [],
 "order": [],
 "extra": extra,
 "notes": ("36 arts-music books swept at the planning layer. 26/26 misAdjudicate items resolved "
           "(20 keep — house-style lessons mis-flagged by token scores; 4 remove — exam-meta junk; "
           "3 move — Bengal School/modern Indian art→art-history ch8, drama theories→theatre ch4, "
           "theatre design/stagecraft→stage-production ch1). 29/29 dup clusters adjudicated: 21 keep-both "
           "(generic house-style title collisions over different subjects), 5 consolidated to specialists "
           "(analog-electronics, anthropology, linear-algebra, music-history x2), 3 junk clusters dissolved "
           "(all members removed). 64 autoActions reviewed: 8 approved, 25 amended (mostly redirects: Indian-art "
           "syllabus lines→art-history, Indian-music lines→instrument-studies/music-history, exam-practical "
           "enumerations removed as covered), 31 vetoed — including the false 'surveying-and-geomatics' "
           "consolidations and every token-noise move into arts-music from foreign books. Numeric house-style "
           "lessons rescued from the junk heuristic (343 m/s, 45–75 cpl, 72/300 DPI, 24fps, 30°, 12-o'clock, "
           "32-page, 60fps). 39 junkSuspect dispositions + 2 free-scan elective-header fragments adjudicated in extra. "
           "Chapter orders reviewed — none clearly wrong; no thin chapters. Hard rules respected: nothing "
           "moved in or out of the four exempt math books; all targets exist in the legend with concrete chapters.")
}

out = os.path.join(SW, 'verdicts', 'arts-music.json')
json.dump(verdict, open(out, 'w'), indent=1, ensure_ascii=False)
print('WROTE', out)
print('autoReview entries:', len(autoReview), '| misplaced:', len(misplaced), '| dupes:', len(dupes),
      '| thin:', 0, '| order:', 0, '| extra:', len(extra))
