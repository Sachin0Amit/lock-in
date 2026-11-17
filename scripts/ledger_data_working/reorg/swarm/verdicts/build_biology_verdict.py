#!/usr/bin/env python3
# Build the biology discipline verdict file (SWARM-BIO).
# Titles are pulled byte-exact from the plan/brief JSONs so the executor can match them.
import json, os, sys

BASE = "/home/z/my-project/scripts/ledger_data_working/reorg/swarm"
plan = json.load(open(os.path.join(BASE, "biology-plan.json"), encoding="utf-8"))
bio = json.load(open(os.path.join(BASE, "biology.json"), encoding="utf-8"))

# ---------- lookup helpers ----------
def find_mis(book, chapter, sub):
    hits = [it for it in plan["misAdjudicate"]
            if it["book"] == book and it["chapter"] == chapter and sub in it["title"]]
    if not hits:
        raise KeyError(("misAdjudicate", book, chapter, sub))
    if len(hits) > 1:
        print("WARN multi-match mis:", book, chapter, sub, [h["title"] for h in hits], file=sys.stderr)
    return hits[0]["title"]

def find_auto(book, chapter, sub):
    hits = [it for it in plan["autoActions"]
            if it["book"] == book and it["chapter"] == chapter and sub in it.get("title", "")]
    if not hits:
        raise KeyError(("autoActions", book, chapter, sub))
    if len(hits) > 1:
        print("WARN multi-match auto:", book, chapter, sub, [h["title"] for h in hits], file=sys.stderr)
    return hits[0]["title"]

def lesson(book, chapter, idx):
    for b in bio["books"]:
        if b["id"] == book:
            for c in b["chapters"]:
                if c["number"] == chapter:
                    t = c["planned"][idx]
                    return t if isinstance(t, str) else t.get("title", "")
    raise KeyError(("lesson", book, chapter, idx))

# ---------- autoReview: (book, chapter, title-substring, verdict, action, targetBook, targetChapter, reason) ----------
AR = [
 ("manufacturing-processes",1,"Logic pathology","veto","remove","",None,"Mangled fragment with no honest home; plant-anatomy ch3 (The Root) has zero affinity - the token score is noise."),
 ("cad-cam",2,"Transformations by Matrices","amend","move","linear-algebra",5,"Matrix transformations are linear algebra's own register (Linear Transformations chapter); microbiology ch3 is a token-score artifact."),
 ("antennas-and-wave-propagation",1,"This publication is in copyright","veto","remove","",None,"Publisher boilerplate junk; foundation-biology ch4 is not a home for a copyright notice."),
 ("world-history",2,"Agriculture - major crops","amend","move","development-economics",6,"The agriculture-and-rural-transformation register owns crops/irrigation/PDS/food security; biotechnology ch5 (Sequencing) is absurd."),
 ("law-and-legal-studies",1,"Paper-II 4. Emergence","amend","move","anthropology",9,"An anthropology-of-India syllabus line; cell-biology ch7 (The Cell Cycle and Mitosis) is a homonym artifact."),
 ("anthropology",1,"Paper-I 12. Applications of Anthropology","amend","move","anthropology",8,"The applied register owns applications-of-anthropology; biotechnology ch3 (PCR) is absurd."),
 ("cultural-studies",5,"Science and Technology - developments","veto","remove","",None,"General-studies syllabus line with no honest single home; genetics ch9 is absurd."),
 ("philosophy",1,"Unit 9: Logic","amend","move","philosophy",2,"Logic belongs to philosophy's own Logic Base chapter (and mathematical-logic); genetics ch3 (The Chromosome Theory) is absurd."),
 ("geography",11,"Indian Economy and Economic Development","veto","keep","",None,"The line already sits in geography ch11 (India: The Human and Economic Register) - its honest chapter; cell-biology ch3 is noise."),
 ("geography",11,"Paper-II 6. Tribal Situation","amend","move","anthropology",9,"The tribal-studies register belongs to anthropology's India chapter; foundation-biology ch1 (What Life Is) is absurd."),
 ("environmental-studies",2,"Social Justice","amend","move","public-administration",8,"The policy-and-implementation register owns development-policy lines; molecular-biology ch8 is absurd."),
 ("mechanics",1,"Combined Rotation and Translation","veto","keep","",None,"Rigid-body mechanics stays in mechanics; molecular-biology ch4 (Translation - the Code Read) is a word-confusion artifact."),
 ("atomic-physics",2,"Atoms and Nuclei","veto","keep","",None,"Nuclear/atomic physics stays in atomic-physics; cell-biology ch7 (The Cell Cycle and Mitosis) is a 'nucleus' homonym artifact."),
 ("solid-state-physics",1,"BIO Using Crystals","amend","move","biochemistry",2,"Protein crystallography is the protein-structure chapter's method; foundation-biology ch3 is only the chemistry preview."),
 ("particle-physics",1,"Note: The remaining pages","veto","remove","",None,"Publisher's note junk; biotechnology ch3 is absurd."),
 ("experimental-physics",1,"Experimental Skills","veto","keep","",None,"The physics practical register's own syllabus line; foundation-biology ch8 already carries its own Practical skills lesson."),
 ("business-studies",1,"Nature and Purpose of Business","veto","keep","",None,"Business-studies ch1's own register; foundation-biology ch2 is a score artifact."),
 ("accounting",1,"Key Concept","veto","remove","",None,"Generic textbook furniture fragment; plant-pathology ch1 is a 'concepts' homonym artifact."),
 ("foundation-chemistry",1,"Medicinal chemistry","amend","move","pharmacy",3,"MedChem belongs to pharmacy's Pharmacognosy-and-MedChem register; economic-botany ch5 owns medicinal plants, not medicinal chemistry."),
 ("foundation-chemistry",1,"Neurotransmitters","amend","move","animal-physiology",1,"Synaptic neurotransmission is the excitable register's subject; plant-physiology ch1 (Water Relations) is absurd."),
 ("foundation-chemistry",1,"Antibiotics","amend","move","microbiology",8,"The control-and-resistance register owns antibiotics; evolution ch2 is the resistance-evolution confusion."),
 ("foundation-chemistry",2,"Calculation of the Density of a Metal","amend","move","physical-chemistry",7,"Unit-cell density arithmetic is the Solid State chapter's own; foundation-biology ch4 is a cell/unit-cell homonym artifact."),
 ("foundation-chemistry",2,"Figure 2A.1","veto","remove","",None,"Figure-caption fragment; thermodynamic systems are the thermodynamics registers' own content."),
 ("foundation-chemistry",2,"With its surroundings","veto","remove","",None,"Figure-caption continuation; microbiology ch3 is absurd."),
 ("foundation-chemistry",7,"Combined State","amend","move","inorganic-chemistry",9,"Free-vs-combined occurrence of metals is the metallurgical register's opening; plant-physiology ch1 is absurd."),
 ("foundation-chemistry",8,"Explosion Temperature","amend","move","industrial-chemistry",7,"Combustion/explosion energetics belongs with fuels and energy; plant-pathology ch4 (Epidemiology) is absurd."),
 ("organic-chemistry",1,"Structure-Reactivity Correlations","veto","keep","",None,"Core organic-chemistry register; microbiology ch5 (The Viral Register) is absurd."),
 ("organic-chemistry",11,"Chemistry in Everyday Life","veto","keep","",None,"Organic-chemistry ch11's own everyday-life register; foundation-biology ch1 (What Life Is) is absurd."),
 ("inorganic-chemistry",2,"The Molecular-Structure Register","veto","keep","",None,"The inorganic bonding register; molecular-biology ch1 is a 'molecular' homonym artifact."),
 ("inorganic-chemistry",3,"Water, Heavy Water","veto","keep","",None,"Hydrogen chemistry's own register; foundation-biology ch3 is only the general water preview."),
 ("environmental-chemistry",4,"Determination of Alkalinity","veto","keep","",None,"The water-analysis register's own lab lesson; foundation-biology ch2 is absurd."),
 ("environmental-chemistry",4,"Down sea water process","veto","keep","",None,"The Dow seawater process is water chemistry's own; foundation-biology ch3 is absurd."),
 ("biochemistry",1,"The Cellular pH","veto","keep","",None,"Biochemistry ch1 (Water, pH and the Living Buffer) owns cellular pH; cell-biology ch1 is the theory-and-tools chapter."),
 ("biochemistry",2,"Energy and Respiration","amend","move","biochemistry",8,"Respiration and energy metabolism belong to the Carbohydrate Metabolism chapter (within-book misfile); ecology ch4 is an energy-word artifact."),
 ("biochemistry",2,"Food Proteins","veto","keep","",None,"Food-protein biochemistry is biochemistry's own register; foundation-biology ch3 is a preview shelf."),
 ("biochemistry",3,"The Biochemical Separation Techniques","veto","keep","",None,"Biochemistry's own methods register; microbiology ch1 (The Discovery Register) is wrong."),
 ("biochemistry",4,"Enzyme Types","veto","keep","",None,"The Enzyme Machinery's own register; cell-biology ch9 (Cell Communication) is absurd."),
 ("biochemistry",4,"Enzymes as Drug Targets","veto","keep","",None,"Enzyme chemistry stays in the Enzyme Machinery; cell-biology ch9 is absurd."),
 ("biochemistry",4,"Catalytic Action of Enzymes","veto","keep","",None,"The Enzyme Machinery's own register; cell-biology ch9 is absurd."),
 ("biochemistry",4,"Chemical Connections Enzymes","veto","keep","",None,"The Enzyme Machinery's own boxed register; cell-biology ch6 is absurd."),
 ("biochemistry",5,"Biological Molecules: The Census","veto","remove","",None,"Umbrella duplicating biochemistry's own ch2/ch5/ch7 registers and foundation-biology ch3's Four Biomolecule Families preview."),
 ("biochemistry",7,"Molecular Biology and the Biomolecules","veto","keep","",None,"The nucleic-acid register's bridge lesson; foundation-biology ch3 is a preview shelf."),
 ("quantum-chemistry",6,"MO against VB","veto","keep","",None,"The molecular-orbital machinery's own register; immunology ch2 is absurd."),
 ("industrial-chemistry",6,"The Food-Products Technology Register","veto","keep","",None,"Industrial food-products technology; economic-botany owns plant products, not food processing technology."),
 ("foundation-biology",1,"S, p and d Block Elements","amend","remove","",None,"Chemistry-shelf topic covered by foundation-chemistry ch4 and inorganic-chemistry's registers; manufacturing-processes ch9 is absurd."),
 ("foundation-biology",1,"Cytoskeleton and Is Highly Dynamic","veto","remove","",None,"Mangled Lehninger TOC run; mechanics ch7 is absurd."),
 ("foundation-biology",2,"Inquiry 1:","veto","keep","",None,"The biology inquiry-craft lessons belong in How Biologists Know; industrial-chemistry is absurd."),
 ("foundation-biology",2,"Inquiry 2:","veto","keep","",None,"Biology's own data-craft lesson; industrial-chemistry ch5 is absurd."),
 ("foundation-biology",2,"Inquiry 3:","veto","keep","",None,"Biology's own evaluation-craft lesson; industrial-chemistry is absurd."),
 ("foundation-biology",3,"Robert J. Warburton","veto","remove","",None,"Mangled reviewer-TOC line; the carbohydrate register lives in biochemistry ch5 and organic-chemistry ch10."),
 ("foundation-biology",3,"In the Department of Biochemistry","veto","remove","",None,"Mangled acknowledgments mash; the urea cycle is covered by biochemistry ch9 and medical-biochemistry ch5's own registers."),
 ("foundation-biology",8,"Tool 3: Mathematics","veto","keep","",None,"The biologist's-craft mathematics tool; construction-management ch2 is absurd."),
 ("foundation-biology",9,"Adolescence, Drug and Alcohol Abuse","veto","keep","",None,"The NEET-register health line in the Doorstep chapter (which names the NEET register); foundation-chemistry ch6 is absurd."),
 ("cell-biology",1,"Structure and Bonding","amend","move","foundation-chemistry",5,"Chemical bonding at first pass; manufacturing-processes ch1 is a materials-word artifact."),
 ("cell-biology",1,"Jamie Towle-Weicksel","veto","remove","",None,"Mangled reviewer-TOC line; structure-and-catalysis is biochemistry's register."),
 ("cell-biology",1,"Three-Dimensional Structure Is Described","veto","remove","",None,"Mashed Lehninger TOC lines."),
 ("cell-biology",4,"Membrane Assembly and Protein Targeting","veto","keep","",None,"The endomembrane system's own register; molecular-biology ch4 is a partial-subject artifact."),
 ("molecular-biology",1,"Nucleic Acids: DNA and RNA","veto","keep","",None,"The DNA-structure chapter's own register; medical-microbiology ch1 is absurd."),
 ("molecular-biology",1,"The Molecular Basis of Inheritance","veto","keep","",None,"The DNA-structure chapter's NEET-register opener; cell-biology ch5 is an mtDNA-word artifact."),
 ("molecular-biology",1,"Vishwa D. Trivedi","veto","remove","",None,"Mangled reviewer-TOC line; amino acids and proteins are biochemistry ch2/ch3's register."),
 ("molecular-biology",1,"Todd M. Weaver","veto","remove","",None,"Mangled reviewer-TOC line; nucleotide chemistry is biochemistry ch7 and molecular-biology ch1's own opener."),
 ("molecular-biology",1,"The Cytoplasm Is Organized","veto","remove","",None,"Mashed TOC lines; anatomy ch3 is absurd."),
 ("molecular-biology",1,"From Their Surroundings","veto","remove","",None,"Mangled Lehninger TOC run; the acid-base register is physical-chemistry's own."),
 ("molecular-biology",1,"Entropy: Things Fall Apart","veto","remove","",None,"Mangled Lehninger TOC run; thermodynamics is physical-chemistry's register."),
 ("molecular-biology",4,"Lori Wallrath","veto","remove","",None,"Mangled reviewer-TOC line; protein function is biochemistry ch3's register."),
 ("molecular-biology",7,"Chemical Equilibria","amend","move","physical-chemistry",3,"Chemical equilibrium belongs to its exact chapter, not ch1 (Chemical Thermodynamics)."),
 ("genetics",2,"Meiosis and Genetic Diversity","amend","remove","",None,"Covered by cell-biology ch8's meiosis register (Crossing Over and Assortment; The Four Distinct Gametes); foundation-biology ch5 is only the preview."),
 ("genetics",2,"Genetic Continuity","veto","remove","",None,"Mashed Lehninger TOC lines."),
 ("evolution",1,"Cellular Dimensions","veto","remove","",None,"Mashed TOC lines; foundation-biology ch2 is noise."),
 ("evolution",1,"Of Energy and Biosynthetic","veto","remove","",None,"Mashed Lehninger TOC lines."),
 ("evolution",2,"Natural Selection and Its Types","amend","remove","",None,"Duplicates evolution ch2's own Three Modes' Curves and genetics ch7's Selection's Three Modes; the proposed move would create a second in-book dup."),
 ("evolution",2,"And present research groups","veto","remove","",None,"Acknowledgments fragment; foundation-chemistry ch4 is absurd."),
 ("biotechnology",1,"The Principles and Processes of Biotechnology","veto","keep","",None,"The toolbox chapter's NEET-register umbrella; foundation-biology ch9 is the shelf doorway, not a processes lesson."),
 ("biotechnology",1,"The Tools of rDNA Technology","veto","keep","",None,"The Natural Toolbox chapter's own subject; biochemistry ch7 is the nucleic-acid register, not rDNA tools."),
 ("biotechnology",9,"Abbreviated Solutions","veto","remove","",None,"Back-matter furniture; foundation-chemistry ch8 is absurd."),
 ("microbiology",2,"The Prokaryotic Cell: Structure and Function","veto","remove","",None,"NEET umbrella duplicating microbiology ch2's authored register (wall/morphology/biofilm/spore) and foundation-biology ch4's prokaryote preview."),
 ("microbiology",2,"Living Organisms Exist","veto","remove","",None,"Mangled Lehninger TOC run."),
 ("microbiology",3,"Redox Reactions, Electron Transport","veto","keep","",None,"Bacterial respiratory chains are the metabolic-diversity register's subject; the mammalian pathway version is biochemistry's."),
 ("microbiology",3,"Photosynthesis and the Calvin Cycle in Microbes","veto","keep","",None,"Microbial photosynthesis is metabolic diversity; plant-physiology owns the plant photosynthesis registers."),
 ("microbiology",3,"Growth and Death Kinetics","veto","keep","",None,"Growth kinetics is the growth chapter's own arithmetic; foundation-chemistry ch7 is absurd."),
 ("microbiology",5,"Viruses, Viroids and the Subviral Agents","veto","keep","",None,"The viral register owns viruses and subviral agents; foundation-biology ch1 (What Life Is) is absurd."),
 ("microbiology",9,"Microbes in Human Welfare","veto","keep","",None,"The applied register's own lesson; molecular-biology ch8 is absurd."),
 ("immunology",3,"Antibody Structure, Function and Diversity","veto","remove","",None,"Umbrella duplicating immunology ch3's own Antibody's Anatomy and Classes and Affinity-Maturation Engine; foundation-biology ch3 is absurd."),
 ("plant-physiology",1,"Hydrogen Bonding Gives Water","veto","remove","",None,"Truncated Lehninger TOC line; water chemistry is foundation-biology ch3 and biochemistry ch1's register."),
 ("plant-physiology",1,"Louis Pasteur and Optical Activity","veto","remove","",None,"Mangled Lehninger TOC run."),
 ("plant-physiology",1,"The Ionization of Water","veto","remove","",None,"Truncated Lehninger TOC line; biochemistry ch1 owns water ionization."),
 ("plant-physiology",3,"Criticism; and to the many","veto","remove","",None,"Mashed acknowledgments-TOC line."),
 ("plant-physiology",7,"Sexual Reproduction in Flowering Plants","veto","remove","",None,"Duplicates plant-anatomy ch7's flower-and-fruit register (pollination, double fertilization, post-fertilization, apomixis); plant-taxonomy ch2 is classification history."),
 ("plant-physiology",7,"Growth, Development and Reproduction in Ferns","amend","move","plant-taxonomy",5,"The bryophyte-and-pteridophyte register owns fern and moss reproduction; foundation-biology ch1 is absurd."),
 ("plant-taxonomy",5,"The Water","veto","keep","",None,"An honest bryophyte water-constraint lesson in its correct chapter; the stated reason (covered in animal-diversity) is nonsense."),
 ("economic-botany",1,"Interactions among Molecules","veto","remove","",None,"Mangled Lehninger TOC run; medical-biochemistry ch2 is not a home for a mash."),
 ("animal-diversity",1,"Distribution, Systematics","veto","remove","",None,"Umbrella duplicating animal-diversity ch1's own systematics lessons; microbiology ch5 is absurd."),
 ("animal-diversity",1,"The Diversity of Organisms","amend","remove","",None,"Duplicates foundation-biology ch6's classification preview (Biological Classification, The Binomial Craft) and animal-diversity ch1's own systematics lessons."),
 ("animal-diversity",1,"Structure, Function and Evolutionary Relationships","veto","keep","",None,"The body-plan chapter's integrative theme; foundation-biology ch3 is absurd."),
 ("animal-physiology",3,"Hormone Action and Its Disorders","amend","move","medical-physiology",7,"Endocrine disorders are the clinical endocrine register's subject; biochemistry ch10 is the bioenergetics doorway."),
 ("animal-physiology",5,"Body Fluids: Blood and Lymph","veto","keep","",None,"The circulatory chapter's fluid register; foundation-physics ch4 (Force and Newton's Laws) is absurd."),
 ("animal-physiology",7,"Homeostasis and Its Mechanisms","veto","remove","",None,"Duplicates animal-physiology ch8's Internal Milieu Held as the Founding Gift and medical-physiology ch1's own milieu lesson; the move would create an in-target dup."),
 ("developmental-biology",1,"Reproductive Health: Contraception","veto","remove","",None,"Near-dup of the fuller reproductive-health lesson (moved to obgyn ch4) and the ART lesson (moved to obgyn ch5); foundation-biology ch1 is absurd."),
 ("medical-microbiology",1,"Human Diseases Caused by Viruses","amend","remove","",None,"Book-level umbrella duplicating the book's own pathogen registers (ch2-ch3, ch5, ch6); immunology ch8 is absurd."),
 ("medical-microbiology",7,"Emerging Infectious Diseases","veto","keep","",None,"The infection-control-and-public register's own subject; microbiology ch1 is the discovery register, the wrong framing."),
 ("community-medicine",6,"Social and Preventive Medicine","veto","remove","",None,"Self-referential syllabus line; economic-botany ch1 (The Plant-Gift Census) is absurd."),
 ("dentistry",2,"General Human Physiology","veto","remove","",None,"BDS syllabus furniture; the subjects live in their own books; plant-pathology ch1 is absurd."),
 ("dentistry",3,"General Pathology and Microbiology","veto","remove","",None,"BDS syllabus furniture; foundation-biology ch9 is absurd."),
 ("nursing",4,"Applied Anatomy and Applied Physiology","veto","remove","",None,"Nursing syllabus furniture; plant-anatomy ch5 (The Leaf) is absurd."),
 ("pharmacy",1,"Anatomy, Physiology and Pathophysiology","veto","remove","",None,"Pharmacy syllabus furniture; plant-anatomy ch5 is absurd."),
 ("veterinary-medicine",2,"Animal Genetics and Breeding","veto","keep","",None,"The husbandry register owns livestock breeding; genetics ch4 (The Chromosome Errors) is the wrong chapter."),
 ("veterinary-medicine",2,"Livestock Products Technology","veto","keep","",None,"The husbandry register's own subject; biotechnology ch7 is absurd."),
 ("music-composition",2,"(prabandh,","veto","keep","",None,"Hindustani small-forms register; foundation-biology ch2 is absurd."),
 ("music-composition",2,"(prabandha,","veto","keep","",None,"Carnatic small-forms register; foundation-biology ch2 is absurd."),
 ("painting",2,"Painting practical Class XII","veto","keep","",None,"The CBSE practical register's own chapter; foundation-biology ch3 is absurd."),
 ("economic-botany",7,"The 2050 Challenge Held","veto","keep","",None,"The authored closer of the Future Register; the junk-certain numeric-run heuristic misfired on 2050."),
 # --- move-chapter autoActions (all score-driven misfires) ---
 ("foundation-biology",3,"The Handoff Map","veto","keep","",None,"move-chapter veto: the chemistry preview's closing handoff map belongs in ch3; the ch1 fit-score is noise."),
 ("molecular-biology",2,"The Two Strands","veto","keep","",None,"move-chapter veto: the leading/lagging crafts belong in the Replication Factory chapter."),
 ("genetics",1,"Heredity and Variation","veto","keep","",None,"move-chapter veto: the Mendel-chapter opener stays; ch5 (Extranuclear Inheritance) is wrong."),
 ("biotechnology",4,"The Clone Verified","veto","keep","",None,"move-chapter veto: clone verification is the Libraries-and-Screening chapter's own lesson."),
 ("plant-anatomy",3,"The Modified-Root Census","veto","keep","",None,"move-chapter veto: each organ chapter owns its own modifications census; ch1 only previews them."),
 ("plant-anatomy",4,"The Modified-Stem Census","veto","keep","",None,"move-chapter veto: the stem chapter owns its own modifications census."),
 ("plant-taxonomy",4,"The Three-Coloured Census","veto","keep","",None,"move-chapter veto: the algal colour census belongs to the Algal Line chapter."),
 ("animal-diversity",3,"The Nematode Register Held","veto","keep","",None,"move-chapter veto: the roundworm register belongs in the Flatworms-and-Roundworms chapter."),
 ("animal-anatomy",6,"The Two Fertilisation Registers","veto","keep","",None,"move-chapter veto: internal/external fertilisation belongs with the reproductive anatomy."),
 ("animal-physiology",4,"The Route Register Held","veto","keep","",None,"move-chapter veto: the digestive route belongs in the Digestion-and-Absorption chapter."),
]

autoReview = []
for (book, chapter, sub, verdict, action, tb, tc, reason) in AR:
    title = find_auto(book, chapter, sub)
    autoReview.append({
        "book": book, "chapter": chapter, "title": title, "verdict": verdict,
        "action": action, "targetBook": tb, "targetChapter": tc, "newTitle": "",
        "reason": reason,
    })

# ---------- misplaced: all 71 misAdjudicate items ----------
MP = [
 ("foundation-biology",1,"The Living World","remove","","",0,"NEET umbrella duplicating ch1's own register: The Properties of Life, The Organisation Ladder and The Three-Domain Preview already carry the living-world content."),
 ("foundation-biology",1,"David L. Nelson","remove","","",0,"Author-name junk from the scraped acknowledgments."),
 ("foundation-biology",1,"Attractions","remove","","",0,"Truncated TOC fragment - the continuation of the 'Weak Interactions ... attractions' junk line."),
 ("foundation-biology",1,"Physical Foundations 19","remove","","",0,"Mangled Lehninger TOC run; intermolecular-force chemistry is the chemistry shelf's register."),
 ("foundation-biology",3,"The Handoff Map","keep","","",0,"The chemistry preview's closing map to the molecular books - an authored lesson in its correct chapter."),
 ("foundation-biology",4,"(Don't Try This at Home!)","remove","","",0,"Scraped box-title fragment with no honest lesson home."),
 ("foundation-biology",5,"The Two Engines Meet","keep","","",0,"The Two Engines Previewed chapter's centerpiece lesson."),
 ("foundation-biology",6,"The Monera, Protista and Fungi","keep","","",0,"The foundation book's kingdom-survey preview; the specialist registers live in microbiology ch2/ch6/ch7 - the length heuristic misfired."),
 ("foundation-biology",6,"Lichens, Viruses and Viroids","keep","","",0,"The five-kingdoms edge preview belongs in the diversity chapter; microbiology ch5 owns the specialist register."),
 ("foundation-biology",6,"Biological Classification","keep","","",0,"The classification preview in the Unity-and-Diversity chapter - complements The Binomial Craft (naming) with the kingdoms scheme."),
 ("cell-biology",1,"The Doctrine","keep","","",0,"The cell-theory opener of the Theory-and-Tools chapter."),
 ("cell-biology",5,"The Maternal Lineage","keep","","",0,"Mitochondrial/plastid maternal inheritance belongs with the energy organelles."),
 ("cell-biology",5,"Brief Contents","remove","","",0,"Publisher furniture scraped from the TOC."),
 ("molecular-biology",1,"The Packing Ladder","keep","","",0,"Nucleosome packing belongs in the DNA-structure chapter."),
 ("molecular-biology",5,"D12 Stability","remove","","",0,"Coded junk fragment; operon-regulation stability is covered by ch5's own lessons."),
 ("molecular-biology",8,"The Two Phage Cycles","keep","","",0,"Lytic/lysogenic cycles fit the mobile-elements-and-viruses chapter; microbiology ch5's viral register is a genuinely different organism-level treatment."),
 ("molecular-biology",9,"The Doorstep Drawn","keep","","",0,"The Genomes-and-Doorway chapter's closer."),
 ("genetics",1,"Heredity and Variation","keep","","",0,"The chapter-opening definition of the subject; ch5 (Extranuclear) is the wrong target."),
 ("genetics",1,"Variation: The Raw Material","keep","","",0,"The variation-concept opener framing Mendel's populations; evolution ch2 owns the sources-of-variation depth."),
 ("genetics",2,"Dominance","keep","","",0,"Complete/incomplete/codominance hierarchy - the Extensions chapter's opener."),
 ("genetics",3,"Linkage and Its Breaking","keep","","",0,"Linkage and recombination - the Chromosome Theory chapter's core."),
 ("genetics",4,"The Aneuploid Census","keep","","",0,"Aneuploidy belongs in the Chromosome Errors chapter."),
 ("genetics",6,"The Pedigree","keep","","",0,"Pedigree complications belong in the counselling-craft chapter."),
 ("genetics",7,"Selection","keep","","",0,"Selection modes in the population-genetics register; evolution ch2's modes-curves is a genuinely different treatment."),
 ("genetics",8,"The Twin Studies","keep","","",0,"Twin-study heritability belongs in the quantitative chapter."),
 ("evolution",2,"Darwin","keep","","",0,"Darwin's contribution and the modern synthesis are the selection chapter's historical frame - not covered elsewhere in the book."),
 ("evolution",2,"Chemotherapy/Antibiotics","remove","","",0,"Antibiotics consolidate to microbiology ch8's control-and-resistance register (dup cluster); the evolution angle (resistance) is already covered there by The Resistance Era Honestly Told."),
 ("evolution",2,"Titration Curves","move","physical-chemistry",4,"Analytical acid-base titration chemistry - belongs to Ionic Equilibria, not Variation and Selection."),
 ("ecology",3,"Are Stereospecific 18","remove","","",0,"Mangled Lehninger TOC run."),
 ("ecology",8,"The Doorway Drawn","keep","","",0,"The Applied-Craft chapter's closer."),
 ("microbiology",1,"The Microscopy Register","keep","","",0,"The discovery-tools register; cell-biology ch1's resolution-theory treatment is genuinely different."),
 ("microbiology",8,"Disinfection and Sterilization","remove","","",0,"NEET umbrella duplicating ch8's own The Sterilisation Census and Its Arithmetic."),
 ("microbiology",9,"Fermented Foods and Beverages","keep","","",0,"The food-products register - genuinely distinct from ch9's industrial fermentation census."),
 ("microbiology",9,"Aerobic and Anaerobic Respiration","remove","","",0,"Duplicates ch3's metabolic-diversity register (Entner-Doudoroff, Glyoxylate and Chemolithotrophy lesson)."),
 ("immunology",7,"The Vaccines","keep","","",0,"The vaccine census and mRNA story belong in the Vaccines' Craft chapter."),
 ("plant-anatomy",1,"The Angiosperm Life Cycle","move","plant-anatomy",7,"The life-cycle and gametophyte register belongs to the Flower-and-Fruit chapter (the reproductive arc), not the body-organisation opener."),
 ("plant-anatomy",8,"The Doorway Drawn","keep","","",0,"The Adaptive-Anomalous-Doorway chapter's closer."),
 ("plant-physiology",4,"Plant Secondary Metabolites","remove","","",0,"Consolidated to economic-botany ch5's The Secondary-Metabolite Honesty (dup cluster); also misfiled in the Calvin-cycle chapter."),
 ("plant-physiology",6,"Does not work","remove","","",0,"Scraped prose fragment."),
 ("plant-physiology",9,"Embryogenesis and the Apical Meristems","move","plant-anatomy",2,"Where the apical meristems come from (embryogenesis) is the Meristems-and-Tissues chapter's opener."),
 ("plant-ecology",2,"The Stage-Classified Arithmetic","keep","","",0,"Stage-classified demography belongs in the Plant Populations chapter."),
 ("plant-ecology",6,"Vegetation Types of the World","keep","","",0,"World vegetation types and Indian biogeographical zones belong in the Global Register; the length heuristic misfired."),
 ("plant-genetics",6,"Gene Silencing","move","molecular-biology",6,"The miRNA/siRNA silencing machinery is the eukaryotic-regulation register's subject; the mutation-and-tissue-culture chapter is the wrong home."),
 ("plant-pathology",1,"The Three Dinner Registers","keep","","",0,"Biotroph/necrotroph/hemibiotroph lifestyles - the founding-concepts register."),
 ("plant-pathology",1,"The Mechanisms of Pathogenesis","keep","","",0,"Pathogenesis mechanisms belong in the Founding Concepts chapter."),
 ("plant-pathology",6,"The Chemical Honesty","keep","","",0,"Fungicide modes of action belong in the Management Craft chapter."),
 ("economic-botany",2,"The Economic Importance of Algae and Fungi","remove","","",0,"Covered by the specialists: plant-taxonomy ch4's The Economic Extracts (algae) and microbiology ch6's The Economic Registers (fungi)."),
 ("economic-botany",6,"The Seed-and-Label Craft","keep","","",0,"Seed testing and labelling belong in the Horticulture Register."),
 ("animal-diversity",1,"Phylogenetic Relationships","move","evolution",5,"Phylogenetic methodology (classical and molecular tools) is the Tree-Building Craft chapter's subject."),
 ("animal-anatomy",2,"Joints and the Musculoskeletal","keep","","",0,"Joints belong in the Integument-and-Skeleton chapter; its disorders register stays here as the comparative census."),
 ("animal-physiology",1,"The Human Nervous System","remove","","",0,"The nerve impulse is covered by ch1's own lessons; the human neuroanatomy side is anatomy ch6's register."),
 ("animal-physiology",1,"Neural Control and Coordination","remove","","",0,"NEET umbrella duplicating the whole Excitable Register."),
 ("animal-physiology",2,"B8 Muscle","remove","","",0,"Coded junk fragment; muscle and motility are covered by ch2's own lessons."),
 ("animal-physiology",3,"Chemical Coordination and Integration","remove","","",0,"NEET umbrella duplicating the Endocrine Register's own lessons."),
 ("animal-physiology",4,"Digestion and Nutrition","remove","","",0,"NEET umbrella duplicating the Digestion-and-Absorption Register's own lessons; clinical nutrition lives on the medical shelf."),
 ("animal-physiology",5,"The Circulatory Disorders Register","move","internal-medicine",2,"Human-clinical circulatory disorders (hypertension to heart failure) are the Cardiovascular Medicine register's subject."),
 ("animal-physiology",5,"Respiratory Volumes and Capacities","keep","","",0,"Spirometry belongs in the Gas-Transport chapter."),
 ("animal-physiology",5,"Coronary Artery Disease","remove","","",0,"Subset of the circulatory-disorders register moved to internal-medicine ch2 - keeping both would duplicate it."),
 ("animal-physiology",5,"Chemical and Neural Signalling","remove","","",0,"Umbrella: neural signalling is ch1's excitable register, chemical signalling is ch3's endocrine register."),
 ("animal-physiology",5,"Breathing and Respiration in Animals","remove","","",0,"NEET umbrella duplicating the Gas-Transport chapter's own lessons."),
 ("animal-physiology",6,"The Human Excretory System","move","medical-physiology",6,"The human renal register belongs to the Renal System chapter; animal-physiology keeps the comparative osmoregulation."),
 ("animal-physiology",6,"Excretory Products and Their Elimination","remove","","",0,"NEET umbrella duplicating ch6's own lessons (nitrogen census, ammonotelism/ureotelism/uricotelism)."),
 ("developmental-biology",1,"The Acrosome","keep","","",0,"The fertilisation opener; the plant-pathology cluster member (Flor lock-and-key) is a fuzzy-match artifact - different subject."),
 ("developmental-biology",1,"The Human Reproductive Systems","keep","","",0,"The gamete context for fertilisation - ch1's own register."),
 ("developmental-biology",1,"The Menstrual Cycle","move","obstetrics-gynaecology",1,"The cycle-pregnancy-parturition-lactation arc is the Pregnancy-and-ANC register's subject, not the fertilisation-cleavage register."),
 ("developmental-biology",1,"Reproductive Health: STDs","move","obstetrics-gynaecology",4,"Contraception/MTP reproductive health is the Puerperium-Lactation-and-Contraception register's subject."),
 ("developmental-biology",1,"Birth Control","remove","","",0,"Contraception dup - covered by the fuller reproductive-health lesson moved to obgyn ch4."),
 ("developmental-biology",1,"Pregnancy and the Placenta","remove","","",0,"Pregnancy is covered by the menstrual-cycle/pregnancy lesson moved to obgyn ch1; the placenta is that register's own content."),
 ("developmental-biology",7,"The Integration Named as the Crown","keep","","",0,"The Evo-Devo Crown chapter's closer."),
 ("animal-behaviour",4,"Communication and Pheromones","keep","","",0,"Signal communication and pheromones fit the Evolution register (honest-cost signalling); the mechanism side stays in ch1."),
 ("entomology",2,"The Moult Engine","keep","","",0,"The moult engine and juvenile-hormone dial belong in Insect Physiology."),
]

misplaced = []
covered = set()
def norm7or8(tup):
    """Tuples were written inconsistently: 8-slot form (…, action, tb, "", tc, reason) for
    remove/keep rows and 7-slot form (…, action, tb, tc, reason) for move rows."""
    if len(tup) == 8:
        return tup[4], tup[6], tup[7]
    if len(tup) == 7:
        return tup[4], tup[5], tup[6]
    raise ValueError(tup)
for tup in MP:
    book, chapter, sub, action = tup[0], tup[1], tup[2], tup[3]
    tb, tc, reason = norm7or8(tup)
    title = find_mis(book, chapter, sub)
    misplaced.append({
        "book": book, "chapter": chapter, "title": title, "action": action,
        "targetBook": tb, "targetChapter": tc, "newTitle": "", "reason": reason,
    })
    for i, it in enumerate(plan["misAdjudicate"]):
        if it["book"] == book and it["chapter"] == chapter and title == it["title"]:
            covered.add(i)
missing = [i for i in range(len(plan["misAdjudicate"])) if i not in covered]
if missing:
    print("MISSING misAdjudicate coverage:", missing,
          [plan["misAdjudicate"][i]["title"] for i in missing], file=sys.stderr)
    sys.exit(1)

# ---------- dupes: 41 clusters in plan order ----------
DUP = [
 ("keep-both","","Fuzzy-match artifact: heterogeneous electronics/chemistry/junk lines; the biology-side members are mangled TOC runs removed individually - no genuine duplication."),
 ("keep-both","","Each discipline keeps its own lab-skills register; the biotechnology member is the Taq-polymerase lesson - a fuzzy match, not a dup."),
 ("keep-both","","Fuzzy-match artifact: the immunology/medical-microbiology members are health-science lessons; no genuine duplication among them."),
 ("keep-both","","The animal-phyla survey (animal-diversity ch1) and the plant-group salient-features registers (plant-taxonomy ch4, foundation-biology ch6) are different kingdoms' surveys."),
 ("keep-both","","The biology, physics and chemistry inquiry lessons are discipline-specific variants - genuinely different treatments."),
 ("consolidate","","All members are OCR-mangled Lehninger TOC runs; every copy is removed by its own agent - no honest lesson to keep."),
 ("consolidate","anthropology","The cultural register belongs to anthropology; the foundation-biology member is a vague misfiled fragment removed separately."),
 ("keep-both","","Fuzzy artifact on the 'Walked Slowly' idiom: animal-physiology's calcium-trigger lesson, biotechnology's clone lesson and molecular-biology's ribosome-site lesson are different subjects."),
 ("consolidate","animal-physiology","The Endocrine Register's authored lessons own chemical coordination; the NEET-umbrella copy is removed as an in-book dup; the CS/physical-chemistry members are misfiles for their agents."),
 ("keep-both","","The breeding-science (plant-genetics ch5), economics, geography and history framings are genuinely different treatments."),
 ("keep-both","","Fuzzy artifact: plant-physiology's water-potential engine lesson is a different subject."),
 ("consolidate","organic-chemistry","Nomenclature is organic-chemistry's own register; the plant-genetics member is the junk functional-groups line removed."),
 ("consolidate","biochemistry","The Carbohydrate Metabolism chapter owns the pentose-phosphate pathway and gluconeogenesis; the molecular-biology and microbiology members are mangled TOC runs removed."),
 ("consolidate","microbiology","The Control Craft and Resistance Era chapter owns antibiotics and resistance; evolution's copy is removed here; the medical-shelf copies are the medical agent's call."),
 ("keep-both","","Fuzzy artifact on 'Walked Once': anatomy's brachial-plexus lesson and animal-anatomy's systems-arc survey are different subjects."),
 ("keep-both","","Fuzzy artifact on 'Dynamic': the foundation-biology member is the junk cytoskeleton TOC run removed separately; the CS members are the CS agent's call."),
 ("keep-both","","The optics polarisation-phenomenon treatment and the organic-chemistry chirality treatment are genuinely different; the plant-physiology member is junk removed."),
 ("keep-both","","Each discipline's career map (foundation-biology ch8's biologist career map vs banking/operations) is its own lesson."),
 ("consolidate","","All three members are publisher TOC furniture - removed everywhere; no honest lesson to keep."),
 ("keep-both","","Foundation-chemistry's first-pass and inorganic-chemistry's depth treatments are genuinely different; the foundation-biology stray is a misfile removed via autoReview."),
 ("consolidate","biochemistry","The Enzyme Machinery owns enzymes; all three members are mangled reviewer-TOC runs removed by their agents."),
 ("keep-both","","Ecology's, immunology's and plant-anatomy's doorway closers are each book's own synthesis - different subjects sharing a closer idiom."),
 ("keep-both","","Biology-lab safety and high-voltage-lab safety are different registers."),
 ("keep-both","","Immunology's peripheral-tolerance census and embedded-systems' peripherals register are different subjects."),
 ("keep-both","","Microbiology's Golden-Age (of discovery) arc and indian-history's Gupta question are different subjects."),
 ("keep-both","","Biotechnology's environmental applications and philosophy's environmental-ethics register are different subjects."),
 ("keep-both","","Microbiology's environmental microbiology and archaeology's heritage craft are different subjects."),
 ("consolidate","","Both members are mangled Lehninger TOC runs - removed; no honest lesson to keep."),
 ("consolidate","foundation-biology","The Two Engines Previewed chapter owns the genetic-code preview; the foundation-chemistry member is a misfile for the chemistry agent."),
 ("consolidate","organic-chemistry","Isomerism is organic-chemistry ch1's own; the plant-physiology member is the junk configuration/conformation line removed."),
 ("keep-both","","Foundation-biology's population-growth preview and ecology's population-arithmetic depth are the foundation-vs-specialist pattern."),
 ("consolidate","microbiology","The Bacterial Architecture chapter owns the Gram-and-wall difference; cell-biology ch2's copy is removed via extra - its chapter keeps nucleoid/attachment/plasmid."),
 ("keep-both","","Ecology's interaction-census mutualism and microbiology's fungal mutualisms (lichen/mycorrhiza) are genuinely different scopes."),
 ("keep-both","","Immunology's techniques register and microbiology's diagnostic-detection application are genuinely different treatments."),
 ("consolidate","economic-botany","The Medicinal Register owns the plant secondary-metabolite census; plant-physiology's copy is removed - also misfiled in the Calvin-cycle chapter."),
 ("keep-both","","Plant-ecology's and plant-taxonomy's closing syntheses are book-specific capstones - same title idiom, different subjects."),
 ("consolidate","plant-genetics","The Genetic Resources register owns the Vavilov centres as the germplasm-origin concept; economic-botany's copy is removed - its Domestication Syndrome lesson keeps the origin story."),
 ("keep-both","","Fuzzy artifact on the 'Lock-and-Key Receipt' idiom: developmental-biology's acrosome lesson and plant-pathology's Flor gene-for-gene lesson are different subjects."),
 ("keep-both","","Animal-physiology's comparative glucose regulation and medical-physiology's human-clinical treatment are genuinely different."),
 ("keep-both","","Animal-physiology's comparative capstone and medical-physiology's human homeostasis founding are genuinely different."),
 ("consolidate","medical-microbiology","The clinical infection register owns STDs; developmental-biology's copy is removed here; the medical-physiology copy is misfiled in its blood chapter for the medical agent."),
]
dupes = []
for i, (action, winner, reason) in enumerate(DUP):
    dupes.append({"title": plan["dupAdjudicate"][i]["title"], "action": action,
                  "winner": winner, "reason": reason})
assert len(DUP) == len(plan["dupAdjudicate"]), (len(DUP), len(plan["dupAdjudicate"]))

# ---------- extras: free-scan findings (book, chapter, lesson-idx, action, targetBook, targetChapter, reason) ----------
EX = [
 # foundation-biology
 ("foundation-biology",1,7,"remove","","",0,"In-book dup of The Organisation Ladder."),
 ("foundation-biology",1,8,"move","microbiology",3,"Microbial metabolism is the metabolic-diversity register's subject."),
 ("foundation-biology",1,9,"remove","","",0,"Coded junk fragment; the organelle preview is ch4's own register (Prokaryote against Eukaryote)."),
 ("foundation-biology",1,10,"remove","","",0,"Coded junk fragment; homeostasis is covered by The Properties of Life."),
 ("foundation-biology",1,11,"move","animal-behaviour",1,"Ethology is the animal-behaviour register's own subject."),
 ("foundation-biology",1,12,"remove","","",0,"Reviewer-name fragment from the scraped preface."),
 ("foundation-biology",1,13,"remove","","",0,"Reviewer-affiliation fragment."),
 ("foundation-biology",1,14,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,15,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,16,"remove","","",0,"Reviewer-name fragment (junkSuspect)."),
 ("foundation-biology",1,17,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,18,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,19,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,20,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,21,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,22,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,23,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,24,"remove","","",0,"Mangled acknowledgments-TOC mash (junkSuspect)."),
 ("foundation-biology",1,26,"remove","","",0,"Reviewer-name fragment."),
 ("foundation-biology",1,27,"remove","","",0,"Location fragment from the acknowledgments."),
 ("foundation-biology",1,29,"remove","","",0,"Mashed Lehninger TOC lines (junkSuspect)."),
 ("foundation-biology",1,33,"remove","","",0,"Truncated Lehninger TOC fragment."),
 ("foundation-biology",1,35,"remove","","",0,"Truncated Lehninger TOC fragment (spontaneity/free energy is physical-chemistry's register)."),
 ("foundation-biology",1,36,"remove","","",0,"Truncated Lehninger TOC fragment."),
 ("foundation-biology",1,38,"move","foundation-biology",5,"The metabolism preview belongs with the energy-engine preview; the mangled ch5 copy is auto-removed, so this clean copy lands in ch5."),
 ("foundation-biology",2,7,"remove","","",0,"Edition boilerplate (junkSuspect)."),
 ("foundation-biology",2,8,"remove","","",0,"URL junk."),
 ("foundation-biology",3,5,"remove","","",0,"Mangled reviewer-TOC line; lipids are biochemistry ch5 and foundation-biology ch3's biomolecule register."),
 ("foundation-biology",3,7,"remove","","",0,"Mangled Lehninger part-heading mash."),
 ("foundation-biology",3,8,"remove","","",0,"Mashed Lehninger TOC lines (junkSuspect)."),
 ("foundation-biology",4,4,"remove","","",0,"Vague scraped fragment; the cell-theory history is ch4's own The Cell Theory's Arc."),
 ("foundation-biology",4,5,"remove","","",0,"Acknowledgments fragment."),
 ("foundation-biology",4,8,"remove","","",0,"Publisher furniture (dup-cluster member)."),
 ("foundation-biology",5,5,"remove","","",0,"Mangled fragment."),
 ("foundation-biology",6,7,"remove","","",0,"Mangled Lehninger TOC run (dup-cluster member)."),
 ("foundation-biology",7,4,"remove","","",0,"Acknowledgments fragment."),
 # cell-biology
 ("cell-biology",1,4,"remove","","",0,"Umbrella covered by biochemistry's Enzyme Machinery (ch4) and Carbohydrate Metabolism (ch8) registers; the tools chapter is the wrong home."),
 ("cell-biology",1,9,"remove","","",0,"Mashed Lehninger TOC lines (junkSuspect)."),
 ("cell-biology",1,10,"remove","","",0,"Mashed Lehninger TOC lines (junkSuspect)."),
 ("cell-biology",2,1,"remove","","",0,"Consolidated to microbiology ch2's The Gram Craft and the Wall Difference (dup cluster); the prokaryotic-architecture chapter keeps nucleoid/attachment/plasmid."),
 ("cell-biology",6,5,"remove","","",0,"Mashed Lehninger TOC lines (junkSuspect)."),
 # molecular-biology
 ("molecular-biology",1,8,"remove","","",0,"Mangled reviewer-TOC line; the pentose-phosphate register is biochemistry ch8's (dup-cluster member)."),
 ("molecular-biology",3,4,"remove","","",0,"URL junk."),
 ("molecular-biology",6,4,"remove","","",0,"Reviewer-name fragment."),
 ("molecular-biology",6,5,"remove","","",0,"Campbell TOC line; neural signalling is animal-physiology ch1's excitable register (medical-physiology ch2 owns the clinical version)."),
 # genetics
 ("genetics",5,4,"move","immunology",3,"Monoclonal antibodies and the hybridoma door are the B-Cell-and-Antibody-Craft register's subject."),
 ("genetics",7,4,"remove","","",0,"Coded junk fragment."),
 ("genetics",7,5,"remove","","",0,"Mangled Lehninger TOC run (junkSuspect)."),
 ("genetics",8,4,"remove","","",0,"Mangled Lehninger TOC run (junkSuspect)."),
 # evolution
 ("evolution",2,9,"remove","","",0,"Pipeline artifact, not a lesson title (junkSuspect)."),
 ("evolution",7,4,"remove","","",0,"Mangled Lehninger TOC run."),
 # ecology
 ("ecology",5,1,"keep","","",0,"Genuine authored lesson (the trophic 10% energy-transfer honesty); the junk heuristic misfired on the numeral."),
 # biotechnology
 ("biotechnology",3,4,"remove","","",0,"Pipeline artifact (junkSuspect)."),
 ("biotechnology",4,4,"remove","","",0,"OCR-log fragment."),
 ("biotechnology",6,4,"remove","","",0,"Acknowledgments fragment."),
 ("biotechnology",8,4,"remove","","",0,"NEET umbrella dup of ch8's own lessons (The Insulin Receipt, The Vaccines and the Therapy Arc, The Agricultural Registers Told Straight)."),
 ("biotechnology",9,4,"remove","","",0,"Mangled acknowledgments-TOC line (junkSuspect)."),
 ("biotechnology",9,5,"remove","","",0,"Acknowledgments fragment."),
 ("biotechnology",9,6,"remove","","",0,"Mangled acknowledgments-TOC line (junkSuspect)."),
 # microbiology
 ("microbiology",2,5,"remove","","",0,"In-book dup of The Morphological Census."),
 ("microbiology",3,9,"remove","","",0,"Mashed acknowledgments-TOC line (junkSuspect)."),
 ("microbiology",3,10,"remove","","",0,"Mangled acknowledgments-TOC line; oxidative phosphorylation is covered by ch3's own redox/ETC lesson (junkSuspect)."),
 ("microbiology",9,11,"remove","","",0,"Mangled acknowledgments-TOC line (junkSuspect)."),
 # immunology
 ("immunology",1,4,"remove","","",0,"NEET umbrella duplicating ch1's own innate register (barriers, inflammation, phagocytes, complement)."),
 ("immunology",1,6,"remove","","",0,"Book-level umbrella dup of the whole immunology register."),
 ("immunology",1,7,"remove","","",0,"Umbrella duplicating ch3 (B cell) and ch4 (T cell) registers."),
 ("immunology",6,5,"remove","","",0,"Scraped glossary fragment; MHC is ch2's identity-cards register."),
 ("immunology",6,6,"remove","","",0,"Mangled Lehninger TOC run (junkSuspect)."),
 # plant books
 ("plant-anatomy",1,6,"move","biochemistry",9,"Nitrogen-containing-compound metabolism is the chemistry-shelf biochemistry register."),
 ("plant-physiology",3,4,"keep","","",0,"Genuine NEET-register lesson in the light-reactions chapter; the junk heuristic misfired on length."),
 ("plant-physiology",5,4,"keep","","",0,"Genuine lesson; the ATP-ledger/amphibolic census is distinct enough from ch5's RQ craft."),
 ("plant-physiology",6,4,"remove","","",0,"Animal chemical-coordination fragment; covered by animal-physiology ch1/ch3's registers; the plant growth-regulator chapter is the wrong home."),
 ("plant-taxonomy",7,4,"keep","","",0,"Genuine key-families lesson; the junk heuristic misfired on length."),
 ("plant-taxonomy",7,5,"remove","","",0,"Acknowledgments-TOC mash (junkSuspect)."),
 ("economic-botany",1,2,"remove","","",0,"Consolidated to plant-genetics ch8's The Vavilov's Centres Priced (dup cluster); ch1's Domestication Syndrome lesson keeps the origin story."),
 ("economic-botany",7,4,"remove","","",0,"Covered by biotechnology ch8's agricultural registers; economic-botany's future register keeps the economics frame."),
 # animal books
 ("animal-diversity",1,4,"keep","","",0,"Genuine phyla-survey opener of the body-plan chapter; the junk heuristic misfired."),
 ("animal-diversity",3,4,"remove","","",0,"Mangled Campbell box-title fragment."),
 ("animal-diversity",5,4,"remove","","",0,"Mangled acknowledgments-TOC line (junkSuspect)."),
 ("animal-physiology",3,6,"move","animal-diversity",1,"An introduction to invertebrates is the animal-diversity body-plan chapter's opener, not an endocrine-register lesson."),
 ("animal-physiology",6,6,"move","internal-medicine",5,"Clinical renal disorders are the nephrology register's subject; animal-physiology keeps the comparative nephron engine."),
 ("animal-anatomy",2,5,"remove","","",0,"In-book dup of the Joints-and-Musculoskeletal-Disorders register kept in ch2; clinical depth is internal-medicine ch7's own register."),
 ("animal-behaviour",1,4,"remove","","",0,"Mangled acknowledgments-TOC run (junkSuspect)."),
 ("entomology",3,4,"remove","","",0,"Scraped prose fragment."),
 ("parasitology",2,4,"remove","","",0,"Umbrella dup: protistan parasites are ch2's own lessons; helminths are ch3/ch4's registers."),
 ("developmental-biology",1,10,"move","obstetrics-gynaecology",5,"Infertility and ART (IVF/ZIFT/GIFT) are the gynaecology register's subject, not the fertilisation-cleavage register (junkSuspect adjudicated as genuine but misfiled)."),
]
extra = []
for tup in EX:
    book, chapter, idx, action = tup[0], tup[1], tup[2], tup[3]
    tb, tc, reason = norm7or8(tup)
    title = lesson(book, chapter, idx)
    extra.append({
        "book": book, "chapter": chapter, "title": title, "action": action,
        "targetBook": tb, "targetChapter": tc, "newTitle": "", "reason": reason,
    })

# ---------- assemble ----------
verdict = {
    "agent": "biology",
    "autoReview": autoReview,
    "misplaced": misplaced,
    "dupes": dupes,
    "thin": [],
    "order": [],
    "extra": extra,
    "notes": ("Reviewed all 141 autoActions (approved the junk-certain removes, the dup-within removes and a handful of honest moves; "
              "121 vetoes/amendments listed - most block word-homonym artifacts like 'translation', 'cell', 'molecular', 'concepts' that would have "
              "scattered non-biology lines into biology books and drained specialist registers). Adjudicated all 71 misAdjudicate items "
              "(37 keep / 25 remove / 9 move), all 41 dup clusters (26 keep-both / 15 consolidate - winners: microbiology x2, biochemistry x2, "
              "organic-chemistry x2, animal-physiology, anthropology, foundation-biology, economic-botany, plant-genetics, medical-microbiology, "
              "3 all-junk clusters), and all 55 junkSuspects (9 kept as heuristic misfires - e.g. The 10-Percent Honesty, The Five Exam Families, "
              "Vegetation Types of the World; 46 removed/moved). Free-scan added 86 extras: 73 OCR-junk/umbrella removals (reviewer names, Lehninger/Campbell "
              "TOC mashes, acknowledgments), 8 honest moves (monoclonal antibodies to immunology, nitrogen metabolism to biochemistry, invertebrate "
              "intro to animal-diversity, ethology to animal-behaviour, renal disorders to internal-medicine, ART to obgyn, microbial metabolism to "
              "microbiology, metabolism preview to ch5) and 5 keep-confirmations. Developmental-biology ch1's injected NCERT human-reproduction block "
              "was routed to the medical shelf (obgyn ch1/ch4/ch5) with the umbrella dups removed; animal-physiology's human-clinical lessons went to "
              "internal-medicine/medical-physiology keeping the book comparative. No thin chapters; no clearly-wrong pedagogical order."),
}

out = os.path.join(BASE, "verdicts", "biology.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(verdict, f, ensure_ascii=False, indent=1)
print("written:", out)
print("autoReview entries:", len(autoReview))
print("misplaced:", len(misplaced), "dupes:", len(dupes), "extra:", len(extra))
from collections import Counter
print("misplaced actions:", Counter(m["action"] for m in misplaced))
print("extra actions:", Counter(e["action"] for e in extra))
print("dupes actions:", Counter(d["action"] for d in dupes))
