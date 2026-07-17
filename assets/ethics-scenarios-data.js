/*
 * Legal Ethics Scenario Randomizer — discussion cards for the TCDLA audience.
 * Adapted for criminal defense practice from "Tabletop Situations for Gen AI Ethics"
 * (Miguel Guhlin, CC BY-SA), itself inspired by the OECD "Ethics of AI Classroom
 * Discussion Flashcards" (2025). Reframed around the Texas Disciplinary Rules of
 * Professional Conduct. Every situation is fictional and for discussion only.
 * Rule numbers reflect the Texas framework as of drafting; verify the current text.
 */
window.ETHICS_CATS = {
  "COMP": {label:"Competence & tech fluency", rule:"Rule 1.01"},
  "CONF": {label:"Confidentiality & client data", rule:"Rule 1.05"},
  "SUP":  {label:"Supervision & responsibility", rule:"Rules 5.01–5.03"},
  "CAND": {label:"Candor & accuracy", rule:"Rule 3.03"},
  "COMM": {label:"Communication & fees", rule:"Rules 1.03–1.04"},
  "FAIR": {label:"Fairness, bias & access", rule:"Rule 1.01"}
};

window.ETHICS_SCENARIOS = [
  /* ---------- COMPETENCE & TECH FLUENCY · Rule 1.01 ---------- */
  {
    n:1, cat:"COMP", rule:"Rule 1.01 · Competence", title:"The Tool You Don't Understand",
    situation:"A solo practitioner starts using a new AI legal-research tool a colleague swears by. It saves her hours a week. She cannot explain how it decides which cases to surface, whether it invents citations, or what it does with the queries she types in — but the answers look right.",
    big:"Does competent representation require understanding how your AI tool works before you rely on it in a client's matter?",
    guiding:[
      "What is the minimum a lawyer must understand about a tool's failure modes to use it responsibly?",
      "At what point does “I don't know how it works” become a competence problem under Rule 1.01?",
      "Is saving time a defense if the output turns out to be wrong?",
      "When is the competent choice to decline the tool or get help?"
    ]
  },
  {
    n:2, cat:"COMP", rule:"Rule 1.01 · Competence", title:"The Learning Curve on the Clock",
    situation:"Two weeks before a contested suppression hearing, an attorney decides to speed up his briefing with an AI tool he has never used for legal work. He plans to learn it as he goes, on this case.",
    big:"Is it ethical to learn a new AI tool for the first time on a live, high-stakes matter?",
    guiding:[
      "What is the minimum practice or training before using AI on a real client's case?",
      "Should a lawyer's first attempts happen on fictional facts or a closed file instead?",
      "Who absorbs the risk if the learning curve produces an error in the brief?",
      "Where is the line between reasonable diligence and experimenting on a client?"
    ]
  },
  {
    n:3, cat:"COMP", rule:"Rule 1.01 · Competence", title:"The Deskilling Drift",
    situation:"A third-year associate has used AI to draft nearly every motion for the past year. Asked to outline a novel argument from scratch, with no tool, she realizes she is not sure she can anymore.",
    big:"When does leaning on AI stop building competence and start quietly eroding it?",
    guiding:[
      "Which core skills must a defense lawyer keep sharp no matter how good the tools get?",
      "How do you tell the difference between AI augmenting judgment and AI replacing it?",
      "What does a firm owe younger lawyers whose skills are forming around these tools?",
      "Is decreased confidence a temporary adjustment or a real professional risk?"
    ]
  },
  {
    n:4, cat:"COMP", rule:"Rule 1.01 · Competence", title:"The Policy on the Shelf",
    situation:"A firm spent a month last year writing a careful AI-use policy. Since then, three major models have shipped with new capabilities and new risks, and most of the staff admit they haven't opened the policy since the day it was published.",
    big:"How do you keep AI guidelines a living document instead of an artifact that ages out the moment the tools change?",
    guiding:[
      "What does a realistic review cycle look like for a small or solo practice?",
      "Whose job is it to champion and update the policy?",
      "How can ongoing training reinforce principles even as the specific tools change?",
      "What is the one standard that should hold no matter which model you use?"
    ]
  },
  {
    n:5, cat:"COMP", rule:"Rule 1.01 · Competence", title:"The Moving Goalpost",
    situation:"What felt like responsible AI use a year ago — pasting a redacted report into a free chatbot, trusting a clean-looking summary — now feels careless as your understanding has deepened. Some of your past work relied on those habits.",
    big:"How do you build a practice that updates as the ethics of AI use mature, without paralyzing yourself over yesterday's choices?",
    guiding:[
      "Do you hold yourself to today's understanding or the understanding you had at the time?",
      "Who decides when the standard of reasonable practice has actually moved?",
      "How do you stay humble about what you'll think of today's habits a year from now?",
      "What is one practice you would change starting this week?"
    ]
  },

  /* ---------- CONFIDENTIALITY & CLIENT DATA · Rule 1.05 ---------- */
  {
    n:6, cat:"CONF", rule:"Rule 1.05 · Confidentiality", title:"The Paste",
    situation:"Rushing before a hearing, an attorney copies an entire offense report — client's full name, date of birth, and address included — into a free consumer chatbot and asks for a one-paragraph summary. It comes back instantly and it is excellent.",
    big:"Has confidentiality already been compromised the moment those facts left the lawyer's control?",
    guiding:[
      "What is the difference between a free consumer tool and an enterprise tool with no-training terms?",
      "Which details in that report are enough to identify the client and the matter?",
      "Does “it was only a summary” change the analysis under Rule 1.05?",
      "If this already happened, what is the honest next step — and the fix going forward?"
    ]
  },
  {
    n:7, cat:"CONF", rule:"Rule 1.05 · Confidentiality", title:"The Anonymization Illusion",
    situation:"A careful lawyer strips the client's name before using AI, but leaves the unusual fact pattern, the county, the charge, and the arrest date. A board-certified colleague points out the case is still instantly identifiable to anyone who reads the local docket.",
    big:"In the age of AI, is true anonymization even possible when the facts alone can identify a client?",
    guiding:[
      "How much de-identification is enough for a given tool and a given matter?",
      "Who decides whether a fictional stand-in is truly unidentifiable?",
      "Should the client be told the limits of anonymization before you use these tools?",
      "When is the safer answer to keep the matter out of the tool entirely?"
    ]
  },
  {
    n:8, cat:"CONF", rule:"Rule 1.05 · Confidentiality", title:"The Third Party",
    situation:"To move faster through discovery, an attorney feeds a cooperating witness's recorded statement into an AI tool for summarizing. The witness never consented to having their words processed by an outside system.",
    big:"Does your confidentiality duty reach third parties whose information passes through your AI tools?",
    guiding:[
      "Whose data is protected here — only the client's, or everyone's in the file?",
      "Where does your responsibility for third-party information begin and end?",
      "How does feeding this to a vendor interact with work-product protection?",
      "What “we will not…” rule would you adopt for third-party material?"
    ]
  },
  {
    n:9, cat:"CONF", rule:"Rule 1.05 · Confidentiality", title:"The Vendor's Fine Print",
    situation:"Your AI vendor's terms of service permit it to retain your inputs, use them to improve its models, and store backups in a jurisdiction with weak data-protection law. The tool is already woven into your daily workflow.",
    big:"How far does your Rule 1.05 duty reach into a vendor's infrastructure and data practices?",
    guiding:[
      "What contract terms are non-negotiable before privileged material touches a tool?",
      "Who bears responsibility to the client if the vendor suffers a breach?",
      "How often should a small practice audit the tools it already relies on?",
      "What do you do about a tool you've been using that fails this test?"
    ]
  },
  {
    n:10, cat:"CONF", rule:"Rule 1.05 · Confidentiality", title:"The Jail-Call Transcript",
    situation:"An attorney drops an hour of recorded jail-call audio between the lawyer and the client into a free online transcription site to save a paralegal the work. No one has read the site's data practices.",
    big:"What must you know about a tool before privileged communications ever touch it?",
    guiding:[
      "Would you email this material unencrypted to a stranger? If not, why paste it here?",
      "When is a local or on-device tool the responsible choice over a cloud service?",
      "What exposure has already been created that cannot be undone?",
      "What is the standard your whole team should follow for recordings and transcripts?"
    ]
  },

  /* ---------- SUPERVISION & RESPONSIBILITY · Rules 5.01–5.03 ---------- */
  {
    n:11, cat:"SUP", rule:"Rules 5.01–5.03 · Supervision", title:"The Nonlawyer Assistant",
    situation:"Treating AI as a nonlawyer assistant, an attorney has it draft a motion, gives it a quick read for tone and typos, and files it. It reads clean and professional.",
    big:"Is a quick proofread meaningful supervision, or supervision in name only?",
    guiding:[
      "What does real review of an AI draft actually require — line by line, cite by cite?",
      "Where is the line between using AI for efficiency and abdicating your judgment?",
      "What exactly are you certifying about this document when you sign and file it?",
      "Would you accept this level of review from a first-year associate's draft?"
    ]
  },
  {
    n:12, cat:"SUP", rule:"Rules 5.01–5.03 · Supervision", title:"The Power User",
    situation:"One enthusiastic paralegal has started using AI for everything — drafting client emails, researching Texas law, summarizing medical records — including tasks no one approved. Two other staff use no AI at all.",
    big:"What supervision does a lawyer owe over how staff use AI in a client's matter?",
    guiding:[
      "Should the office limit AI to a list of approved uses, and who writes that list?",
      "How would an error from a paralegal's AI use even surface before it reached a filing?",
      "Who answers to the client and the court for a nonlawyer's AI mistake?",
      "How do you encourage useful adoption without inviting overuse?"
    ]
  },
  {
    n:13, cat:"SUP", rule:"Rules 5.01–5.03 · Supervision", title:"The Override",
    situation:"An attorney's instinct says the AI's recommended plea analysis is missing crucial mitigating context about the client's history. She cannot fully articulate why — the tool's reasoning looks thorough and the recommendation is confident.",
    big:"When should human judgment override the AI, and how do you honor the discomfort you can't yet explain?",
    guiding:[
      "Should a lawyer be required to document why she overrode an AI recommendation?",
      "Is that unease bias to be corrected, or expertise that hasn't found words yet?",
      "What happens to your judgment if overriding the tool starts to feel routine — or unthinkable?",
      "Who owns the final call, and can that ever be delegated?"
    ]
  },
  {
    n:14, cat:"SUP", rule:"Rules 5.01–5.03 · Supervision", title:"The Accountability Assignment",
    situation:"A harmful error slips into a filing. The associate blames the AI, the AI vendor blames its training data, and the client just wants to know who is responsible for what happened to their case.",
    big:"Who is ultimately responsible when an AI-assisted decision goes wrong?",
    guiding:[
      "Can responsibility be split in percentages between a lawyer and a tool?",
      "Why does accountability to the client and the court rest with the human, always?",
      "How do you build a clear chain of responsibility before something goes wrong?",
      "What does the client deserve to hear about how the error happened?"
    ]
  },
  {
    n:15, cat:"SUP", rule:"Rules 5.01–5.03 · Supervision", title:"The Update You Didn't Ask For",
    situation:"Mid-representation, your AI tool silently updates to a new model. It now analyzes your suppression issue differently than it did last month, and you only notice because two answers don't match.",
    big:"What oversight do you owe over tools that change under you, without notice, during a live case?",
    guiding:[
      "How would you even know a model changed, and should you track versions?",
      "Do you owe the client a re-check of work the old version helped produce?",
      "How do you keep an analysis consistent across a case when the tool won't sit still?",
      "When does an unannounced change justify pausing use of the tool?"
    ]
  },
  {
    n:16, cat:"SUP", rule:"Rules 5.01–5.03 · Supervision", title:"The Investigator's Tool",
    situation:"Your investigator — not your employee, retained for this case — uses his own AI tool to scrape and summarize a witness's social media, feeding in case facts you provided. You never vetted his tool.",
    big:"Do your confidentiality and supervision duties follow the work you delegate to outside professionals using AI?",
    guiding:[
      "How much control do you have, or need, over a vendor's choice of tools?",
      "What should your engagement terms require about AI use and data handling?",
      "If the investigator's tool leaks case facts, whose duty was breached?",
      "What do you need to ask before delegating sensitive work to anyone using AI?"
    ]
  },

  /* ---------- CANDOR & ACCURACY · Rule 3.03 ---------- */
  {
    n:17, cat:"CAND", rule:"Rule 3.03 · Candor", title:"The Fabricated Case",
    situation:"Under a filing deadline, an attorney drops three AI-provided citations into a brief without pulling the opinions. Opposing counsel's response notes that one of the three cases does not exist.",
    big:"What did the duty of candor require of the lawyer before that brief was ever filed?",
    guiding:[
      "Why is every AI citation a lead to verify rather than an authority to cite?",
      "What does real verification look like — and how long does it actually take?",
      "What must the lawyer now say to the court and to the client?",
      "How do courts around the country treat this exact failure?"
    ]
  },
  {
    n:18, cat:"CAND", rule:"Rule 3.03 · Candor", title:"The Phantom Detail",
    situation:"An AI summary of a 200-page medical record includes a diagnosis that does not appear anywhere in the actual file. A reviewer happens to catch it before it lands in a sentencing memorandum.",
    big:"How do you keep AI-invented facts out of the record — and what is your obligation when one gets through?",
    guiding:[
      "Does every AI summary of a record require line-by-line verification to be trusted?",
      "How do you train yourself and your staff to spot a plausible hallucination?",
      "What is your ethical obligation the moment you discover an invented fact?",
      "What would have happened here if the reviewer had not caught it?"
    ]
  },
  {
    n:19, cat:"CAND", rule:"Rule 3.03 · Candor", title:"The Miss You Find Later",
    situation:"Weeks after a client pleads, the lawyer realizes an AI summary he relied on skipped an exculpatory line buried in discovery — a line he never read himself because the summary looked complete.",
    big:"What do you owe the client and the court when you discover an AI-driven miss after the decision is made?",
    guiding:[
      "What is your duty to correct the record and to advise the client now?",
      "Where does trusting a summary cross the line into failing to review the file?",
      "How do you weigh the duty of candor against the finality of a plea?",
      "What practice would have caught this before the plea?"
    ]
  },
  {
    n:20, cat:"CAND", rule:"Rule 3.03 · Candor", title:"The Confident, Outdated Answer",
    situation:"AI drafts a beautifully reasoned argument on a point of Texas criminal procedure. It reads as authoritative — but it rests on a rule the Court of Criminal Appeals modified in a recent opinion the model never saw.",
    big:"How do you guard against analysis that is fluent, confident, and wrong?",
    guiding:[
      "Why is the tool's confidence the most dangerous part of the output?",
      "What is your process for checking AI analysis against current, controlling law?",
      "How does fluent writing lower a reader's guard, including your own?",
      "What are you certifying about the law when you put your name on this brief?"
    ]
  },
  {
    n:21, cat:"CAND", rule:"Rule 3.03 · Candor", title:"The Detector's Accusation",
    situation:"Opposing counsel challenges your client's written statement as “AI-generated,” relying on a detection tool that advertises 95% accuracy — which means a 5% false-positive rate that could be flagging a real person's authentic writing.",
    big:"How should the system treat AI-detection claims that are confidently made but demonstrably wrong a meaningful share of the time?",
    guiding:[
      "Who bears the burden when a detector, not a witness, makes the accusation?",
      "What happens to the client whose genuine writing trips a false positive?",
      "Does a formal style or a second-language writer face higher risk here?",
      "What does fairness require before an AI detector's output affects a case?"
    ]
  },

  /* ---------- COMMUNICATION & FEES · Rules 1.03–1.04 ---------- */
  {
    n:22, cat:"COMM", rule:"Rules 1.03–1.04 · Communication", title:"The Transparency Trap",
    situation:"A lawyer tells her client, candidly, that she uses AI to help prepare parts of the defense. The client is alarmed: “So a robot is handling my case?” The honesty seems to have cost her the client's trust.",
    big:"How do you disclose AI use in a way that informs and reassures rather than frightens?",
    guiding:[
      "Is disclosure of AI use required, advisable, or situational under the communication duty?",
      "How much technical detail does a client actually need to make an informed choice?",
      "Can a client decline AI-assisted work, and how would you honor that?",
      "What framing is both honest and steadying — without overselling the tool?"
    ]
  },
  {
    n:23, cat:"COMM", rule:"Rules 1.03–1.05 · Communication", title:"The Consent Conundrum",
    situation:"A retainer agreement includes a line consenting to “AI-assisted processing” of the client's information. An attentive client asks exactly what that means and where, precisely, his information will go.",
    big:"What makes a client's consent to AI use meaningful rather than boilerplate?",
    guiding:[
      "What must a client genuinely understand for consent to be informed?",
      "How do you handle a client who wants to opt out of AI processing?",
      "What do you owe a client who cannot realistically evaluate the technology?",
      "Does a signature on a form equal real consent to how their data is handled?"
    ]
  },
  {
    n:24, cat:"COMM", rule:"Rule 1.04 · Fees", title:"The Efficiency Bill",
    situation:"AI cut a research task from six billable hours to one. The lawyer bills hourly on this matter and now faces a choice: bill the hour actually spent, bill the value delivered, or fill the saved hours with more work on the same file.",
    big:"How should AI-driven efficiency show up in what a client is charged?",
    guiding:[
      "Is it ever defensible to bill for time the AI, not the lawyer, spent?",
      "Should the savings from AI flow to the client, the lawyer, or be shared?",
      "If AI improves consistency but not speed, is that value the client should pay for?",
      "What fee practice around AI could you defend to a client face to face?"
    ]
  },
  {
    n:25, cat:"COMM", rule:"Rule 1.04 · Communication", title:"The Automated Letter",
    situation:"A busy office uses AI to draft all of its client-facing letters — case updates, “we can't take your matter” declines, sentencing outcomes — from an approved template. A staff member proofreads each before it goes out.",
    big:"What is lost when client communication is automated, and is a proofread enough to preserve it?",
    guiding:[
      "Which client messages must be personally written, not merely reviewed?",
      "Where is the line between efficient communication and losing the human relationship?",
      "What is the difference, to the client, between a human writing and a human editing?",
      "What “we will not automate…” line would you add to the office's practice?"
    ]
  },
  {
    n:26, cat:"COMM", rule:"Rules 1.02–1.04 · Communication", title:"The Client Who Brings AI",
    situation:"A client arrives with a pro se motion he wrote using a free chatbot. It cites cases you don't recognize and it reads confidently. He insists you file it as written.",
    big:"What do you owe a client who shows up with AI-generated legal work and wants it used?",
    guiding:[
      "How do you manage the client's expectations about what the tool produced?",
      "Whose name and license are on the line if it gets filed?",
      "Is your role here to teach, to refuse, to rewrite — or some of each?",
      "How do you respect the client's initiative without adopting its errors?"
    ]
  },

  /* ---------- FAIRNESS, BIAS & ACCESS · Rule 1.01 ---------- */
  {
    n:27, cat:"FAIR", rule:"Rule 1.01 · Competence", title:"The Risk-Score Shortcut",
    situation:"An AI tool built to suggest sentencing-mitigation themes quietly leans on patterns tied to a client's zip code and prior police contacts — patterns that reflect decades of over-policing. The output is “accurate” to the historical data.",
    big:"When AI surfaces patterns that reflect systemic bias, do you use them, ignore them, or actively work against them?",
    guiding:[
      "How do you separate a correlation the data shows from a cause worth arguing?",
      "What is your responsibility when a tool launders bias into a clean-looking recommendation?",
      "Can the same tool be turned to argue against the bias it reflects?",
      "What do you refuse to put in front of a court, even if the data “supports” it?"
    ]
  },
  {
    n:28, cat:"FAIR", rule:"Rule 1.01 · Competence", title:"The Access Argument",
    situation:"A public defender points out that AI — for all the harms baked into how it was built — may be the only way an overloaded office can give every client real research and a fighting brief. The alternative is that under-resourced clients get less.",
    big:"Can a tool built on ethically compromised foundations still be the right choice for under-resourced defense?",
    guiding:[
      "Does honest acknowledgment of the harms feel more responsible, or just more paralyzing?",
      "What does “using it effectively while acknowledging the harms” look like in practice?",
      "Does the duty to give every client competent defense change the calculus?",
      "Where would you personally draw the line, and why?"
    ]
  },
  {
    n:29, cat:"FAIR", rule:"Rule 1.01 · Competence", title:"The Translation Trap",
    situation:"An attorney uses AI to communicate with a limited-English-proficient client and to render a plea offer in the client's language. The output is fluent and confident — but subtly wrong on the single most important term of the offer.",
    big:"What duty of care applies when AI mediates communication with a vulnerable client on a life-altering decision?",
    guiding:[
      "Where is the verification step when you cannot read the language yourself?",
      "Who is accountable if the client accepts an offer he was shown wrong?",
      "When is a qualified human interpreter non-negotiable, AI or not?",
      "How does the stakes of the decision change the standard of care?"
    ]
  },
  {
    n:30, cat:"FAIR", rule:"Rule 1.01 · Competence", title:"The Two-Tier Defense",
    situation:"To manage a crushing caseload, an office decides to use fast AI-assisted workups on “routine” cases and reserve hand-built defense for the “serious” ones. The triage happens quietly, at intake.",
    big:"Is it fair for clients to receive a different quality of process depending on how their case gets triaged?",
    guiding:[
      "Who decides what counts as “routine,” and how could that judgment go wrong?",
      "Does differential treatment risk creating a two-tier system of defense?",
      "What is the floor of attention and effort every client is owed, regardless?",
      "How would you explain the triage to the client on the “routine” side of it?"
    ]
  }
];
