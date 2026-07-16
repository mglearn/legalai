/* Deck content + verbatim speaker notes for the PPTX generator. */
const URL="mglearn.github.io/legalai";

module.exports = [

/* ═══════════════ DECK 0 — OVERVIEW ═══════════════ */
{ file:"0-overview.pptx", title:"AI for the Defense — Overview", slides:[
  { kind:"cover", eyebrow:"Texas Criminal Defense Lawyers Association · July 2026",
    title:"AI for the Defense", subtitle:"Ethical Use, Accuracy, and Attorney Responsibility",
    meta:"Facilitator: Miguel Guhlin, TCEA\nSession resources: "+URL+"\nNo AI subscription required to attend. A laptop or device with a keyboard is recommended.",
    notes:"Welcome. My name is Miguel Guhlin, and over the next hour we are going to look closely at how generative AI fits into criminal defense work, where it helps, and where it puts your license at risk.\n\nI want to set the tone right away. This is not a sales pitch for any tool, and it is not a warning to stay away. It is a working session. You will read short fact patterns, run real prompts in a free chatbot, and see for yourself where the output is useful and where it quietly goes wrong.\n\nYou do not need a paid account to take part. Everything is at the short address on the screen. Take a moment to open it now, and we will get started." },

  { kind:"content", kicker:"The session in one breath", title:"A working hour on responsible AI in defense practice",
    lead:"You will learn where AI tools help legal work, where they create ethical risk, and how you stay fully accountable for every AI-assisted output.",
    blocks:[{t:"cards",cols:3,items:[
      {ico:"⚖️",h:"Ethics first",p:"Competence, confidentiality, supervision, and candor to the court frame everything we do today."},
      {ico:"🛠️",h:"Hands-on",accent:"steel",p:"You work in a free AI chatbot on realistic, fictional defense scenarios. Most of our time is spent doing, not watching."},
      {ico:"✅",h:"Verification",p:"You leave with structured prompting and source-grounded habits that reduce error before it reaches a filing."}]}],
    notes:"Here is the shape of our time together. Three ideas hold the whole session up.\n\nFirst, ethics leads. Every technique I show you sits on top of your existing duties, so we start there and keep coming back to it.\n\nSecond, this is hands-on. You will spend more time working in a chatbot than listening to me. The scenarios are fictional, but they are built to feel like Monday morning.\n\nThird, verification is the throughline. The goal is not to prompt faster. The goal is to catch the error before it reaches a judge. If you leave with one habit, I want it to be that one." },

  { kind:"content", kicker:"What we will cover", title:"Where AI helps, where it hurts, and who answers for it",
    blocks:[{t:"bullets",items:[
      "Common AI failures, including **hallucinated case law** and fabricated citations",
      "Confidentiality and client data risk in consumer chatbots",
      "Structured prompting and few-shot examples as safeguards",
      "Retrieval-augmented generation to hold AI to **trusted sources**",
      "Human oversight, verification, and ethical decision-making throughout"]}],
    notes:"These are the threads we will pull on. You have all seen the headlines about lawyers sanctioned for citing cases that never existed, so we look hard at hallucinated case law and how it happens.\n\nWe look at confidentiality, because pasting a client fact into the wrong tool can be its own problem before a single word is filed.\n\nThen we turn to the fixes. Structured prompting gives the model guardrails. Retrieval-augmented generation, which I will just call grounding, keeps the model tied to sources you trust instead of its own memory.\n\nAnd underneath all of it sits your judgment. Keep that in mind as we go, and we will move to what you will actually be able to do by the end." },

  { kind:"content", kicker:"Learning objectives", title:"By the end you will be able to",
    blocks:[{t:"bullets",items:[
      "Identify ethical risks tied to AI use in legal practice",
      "Explain why you remain responsible for AI-assisted work product",
      "Recognize when AI use implicates confidentiality or competence",
      "Apply guardrails and verification to reduce AI-related errors",
      "Use structured prompting and source-grounded workflows for accuracy"]}],
    notes:"These are our objectives, and they are ethics-focused on purpose. Notice that not one of them is about becoming a faster typist.\n\nYou will be able to spot where AI creates risk, explain to a colleague or a bar committee why the responsibility stays with you, and recognize the moments where confidentiality and competence are in play.\n\nThen the practical half. You will apply concrete guardrails, and you will use structured, source-grounded prompting to raise the accuracy of what you get back.\n\nIf you can do these five things on Monday, this hour was worth your time. Let me show you how we are going to spend it." },

  { kind:"content", kicker:"Our plan for the hour", title:"Three segments, built to flex from sixty to ninety minutes",
    blocks:[{t:"steps",items:[
      {h:"Ethical Foundations",p:"Competence and supervision, hallucinated citations, confidentiality, and why AI never replaces judgment. About 20 min."},
      {h:"Risk-Reducing Practices",p:"Structured and few-shot prompting, the TCDLAi framework, grounding, and a live verification. About 25 min."},
      {h:"Guardrails and Takeaways",p:"An ethics checklist, clear do-and-do-not guidance, and what to document, review, and verify. About 15 min."}]},
      {t:"callout",light:true,label:"Format",text:"Short set-up, then you work. Hands-on activity blocks are marked, so we can add a second round when time allows or trim to the core sixty."}],
    notes:"Here is the road map. We move in three segments. First, ethical foundations, where we name the duties and the failures. Second, the risk-reducing practices, which is where you do most of the hands-on work using a framework I call TCDLAi. Third, guardrails and takeaways, so you walk out with a checklist and clear rules.\n\nThe times on screen are targets, not promises. Each activity block is marked as core or optional. If we have the full ninety minutes, we run a second scenario. If we have sixty, we keep the core and still get you working. Either way, you leave having tried this yourself.\n\nNext, the tools you will use, and the one rule that matters most before you type anything." },

  { kind:"content", kicker:"What you will use today", title:"Free chatbots, and a shared option if you have none",
    blocks:[{t:"cards",cols:3,items:[
      {h:"Bring your own",p:"Claude, ChatGPT, Z.ai, or Mistral. The free tier of any one of these works for every activity today."},
      {h:"Shared option",accent:"steel",p:"A BoodleBox license code is provided so you can take part even if you have nothing else set up."},
      {h:"Claude for Legal",p:"We look at practice-area tooling built for lawyers as an example of purpose-built, review-gated AI."}]},
      {t:"callout",label:"The one rule before you type",text:"Never put confidential, privileged, or client-identifying facts into a consumer chatbot. Today's scenarios are fictional for exactly this reason."}],
    notes:"Let me get you set up. You do not need anything fancy. Pick one free chatbot. Claude, ChatGPT, Z.ai, and Mistral all have free tiers that will carry you through everything today.\n\nIf you did not set one up, do not worry. I am handing out a BoodleBox code so you can work alongside everyone else. And later we will glance at Claude for Legal as an example of tooling built specifically for our work, with attorney review built into it.\n\nNow the rule in the box, and it is the most important sentence on this slide. Do not put confidential, privileged, or client-identifying information into a consumer chatbot. That is why every scenario I hand you today is invented. We practice safely first, then you carry the habit back to real matters." },

  { kind:"content", kicker:"How the hands-on work runs", title:"We start from the problem, not the tool",
    blocks:[{t:"compare",cols:[
      {h:"Problem-based learning",items:["Start with a real defense problem you recognize","Decide what a good outcome looks like first","Use AI as one tool toward that outcome","Judge the result against the problem, not the novelty"]},
      {h:"Tool-first browsing",items:["Start with a feature and look for a use","Impressive demos, unclear payoff","Easy to adopt a tool that solves nothing","Hard to measure whether it helped"]}]},
      {t:"reflect",text:"**Today's stance.** Every activity begins with a problem worth solving and ends by asking whether the AI actually solved it."}],
    notes:"One word about method, because it shapes everything we do. We are working problem-first, not tool-first.\n\nTool-first is the trap. You see a slick demo, you get excited, and you go looking for a reason to use it. That is how firms end up paying for software that solves nothing.\n\nProblem-first flips it. We start with a defense task you already know is hard. We decide what a good result would look like. Then we point AI at it and, at the end, we ask the honest question, did this actually help. That last question is the whole game, and you will hear me ask it after every activity." },

  { kind:"content", kicker:"What you leave with", title:"Three takeaways, all on the resources page",
    blocks:[{t:"cards",cols:3,items:[
      {h:"TCDLAi Prompt Design Guide",accent:"steel",p:"A six-part framework for structuring defense prompts so the output is focused, grounded, and checkable."},
      {h:"Ethical guardrail checklist",p:"A short, printable checklist you run before any AI-assisted work leaves your desk."},
      {h:"Sample prompt library",p:"Legal prompts organized by type and task, each built to emphasize verification and accountability."}]},
      {t:"callout",light:true,label:"Optional starter opener",text:"Before we dig in, you can take a two-minute AI fluency self-check on the resources page to see where you stand today."}],
    notes:"Before we start segment one, here is what you take home. Three things, all waiting on the resources page, so you do not have to write anything down.\n\nThe first is the TCDLAi Prompt Design Guide, a six-part structure built for defense work. The second is a one-page ethical guardrail checklist you run before anything leaves your desk. The third is a library of legal prompts, sorted by type and task, each one written to push you toward verification.\n\nIf you want a quick gut check on where you stand with AI right now, there is a two-minute self-assessment on that same page. It is optional, and it makes a nice warm-up. Now let us start where we should, with ethics." },
]},

/* ═══════════════ DECK 1 — ETHICAL FOUNDATIONS ═══════════════ */
{ file:"1-ethical-foundations.pptx", title:"Ethical Foundations", slides:[
  { kind:"divider", segNum:1, dividerEyebrow:"Segment One · about 20 minutes",
    title:"Ethical Foundations", subtitle:"The duties that govern AI use, and the failures that put a license at risk.",
    notes:"We start with ethics because everything else stands on it. Before a single prompt, the question is not what the tool can do. The question is what your duties require.\n\nIn the next twenty minutes we cover four things. The duties that already govern this, the way AI fabricates case law, the confidentiality trap in consumer tools, and why the output never replaces your judgment.\n\nKeep your own hardest matter in the back of your mind as we go. You will see where each of these lands for real work." },

  { kind:"content", kicker:"Start here", title:"Your existing duties already govern AI use",
    lead:"No new rulebook is required. The Texas Disciplinary Rules of Professional Conduct reach AI-assisted work the same way they reach a junior associate's draft.",
    blocks:[{t:"cards",cols:2,items:[
      {h:"Competence and diligence",p:"Rule 1.01. You must understand the tool well enough to use it responsibly, or not use it."},
      {h:"Confidentiality",p:"Rule 1.05. Client information stays protected, including from the tools you type it into."},
      {h:"Supervision",accent:"steel",p:"Rules 5.01 and 5.03. AI is a nonlawyer assistant. You supervise its work and own the result."},
      {h:"Candor to the tribunal",accent:"steel",p:"Rule 3.03. What you file must be true, and you are the one who verified it."}]}],
    notes:"Here is the reassuring part and the sobering part at once. You do not need a new rulebook. The duties you already carry reach this technology cleanly.\n\nCompetence and diligence under Rule 1.01 means you understand the tool well enough to use it, or you leave it alone. Confidentiality under Rule 1.05 follows the client information right into whatever box you type it into. Supervision under Rules 5.01 and 5.03 is the key mental model. Treat AI as a nonlawyer assistant whose work you must check. And candor under Rule 3.03 means what you file is true because you confirmed it, not because the machine sounded sure.\n\nRule numbers here are the Texas framework as of today. Always check the current text before you rely on it. Now let us look at the failure that has cost lawyers the most." },

  { kind:"content", kicker:"Competence, expanded", title:"Competence now includes the tools you choose to use",
    blocks:[{t:"callout",label:"The shift",text:"Knowing the law is no longer enough on its own. Knowing the benefits and risks of the technology you use is now part of competent practice."},
      {t:"bullets",items:[
      "You do not need to be an engineer, you need to know the failure modes",
      "Understand what the tool keeps, trains on, and exposes",
      "Know when a task is a poor fit for a general chatbot",
      "Ask for help or decline the tool when it exceeds your understanding"]}],
    notes:"Competence has quietly grown. For years it meant knowing the law and the procedure. Guidance on technology competence now folds in a second duty. You are expected to understand the benefits and the risks of the tools you use.\n\nThat does not mean you need to build the model. It means you need to know how it fails, what it does with your input, and when a task simply does not belong in a general chatbot. Those three things are within reach for every person in this room.\n\nAnd there is an honest exit. If a tool is beyond your understanding for a given task, competent practice can mean getting help or setting the tool down. Saying no is a professional answer. Next, the failure that makes headlines." },

  { kind:"content", kicker:"Failure one", title:"Hallucinated case law is a feature of how models work",
    blocks:[{t:"compare",cols:[
      {h:"What a chatbot does",items:["Predicts the next likely words from patterns","Produces text that reads like real citations","Has no built-in check that a case exists","States confident answers either way"]},
      {h:"What that looks like",items:["A plausible style, a fabricated reporter cite","Real parties attached to a holding they never made","Quotations that appear nowhere in the opinion","A brief that collapses under a judge's search"]}]},
      {t:"reflect",text:"**The pattern is documented.** Courts across the country have sanctioned lawyers who filed briefs built on citations the AI invented."}],
    notes:"Let us name the failure precisely. A hallucination is not a glitch that better software will soon remove. It is a direct result of how these models work. They predict the next likely words. They are built to produce fluent text, not to confirm that a case exists.\n\nSo you get output that reads exactly like a citation, with a real reporter format and confident language, attached to a holding no court ever issued. The style is perfect. The substance is invented.\n\nThis is not hypothetical. Courts around the country have sanctioned lawyers who filed briefs resting on cases the AI made up. The lesson is not to fear the tool. The lesson is that every citation it gives you is a lead to verify, never an authority to cite." },

  { kind:"content", kicker:"Look closely", title:"Anatomy of a fabricated citation",
    blocks:[{t:"prompt",text:"State v. Harrelson, 482 S.W.3d 917 (Tex. Crim. App. 2016)\n\"A warrantless blood draw following a routine traffic stop\n violates the Fourth Amendment absent exigent circumstances.\""},
      {t:"reflect",text:"**Verification rule.** It looks right and reads right, which is exactly why it is dangerous. If you cannot pull the opinion yourself from a real database, you do not have a citation. You have a hypothesis."}],
    notes:"Look at this example on the screen. It is invented, and I built it to be convincing. The reporter is right. The volume and page look normal. The court and year are plausible. The quoted holding tracks doctrine you half remember about warrantless blood draws, so it slips past your guard.\n\nThat is the danger. It looks right and it reads right, which is exactly why it is dangerous. The case, the pinpoint page, and the quotation can all be fabricated together, and they will match each other perfectly.\n\nSo here is the rule I want you to carry. If you cannot pull the opinion yourself from a real database, you do not have a citation. You have a hypothesis that still needs proof. Now the risk that shows up before you ever file anything." },

  { kind:"content", kicker:"Failure two", title:"Client data can leak the moment you paste it",
    blocks:[{t:"guardrail",
      wont:{h:"Where the risk lives",items:["Free and consumer tools may train on what you type","Inputs can be retained, logged, and reviewed by humans","Client names and facts can identify a matter instantly","A convenience login is not a client data agreement"]},
      will:{h:"How to work safely",items:["Strip identifying details, or use a fictional stand-in","Choose tools with enterprise terms and no training on your data","Keep privileged facts out of general chatbots entirely","Assume anything typed could be seen, then act accordingly"]}}],
    notes:"The second failure happens before anything reaches a court. It happens the moment you paste a client fact into the wrong tool.\n\nFree and consumer tiers often reserve the right to train on your inputs. Those inputs can be stored, logged, and in some cases read by a human reviewer. A client name plus two facts can identify a matter to anyone who sees it. And clicking accept on a sign-up screen is not the same as a data protection agreement.\n\nThe safe habits are on the right, and they are simple. Strip the identifiers or use a fictional stand-in. Prefer tools with enterprise terms that promise not to train on your data. Keep truly privileged material out of general chatbots. And work as though anything you type could be seen, because sometimes it can." },

  { kind:"content", kicker:"The bottom line", title:"AI output is never a substitute for legal judgment",
    blocks:[{t:"callout",light:true,label:"Hold this",text:"The tool can draft, summarize, and suggest. It cannot be responsible. Responsibility has your name on it, every time."},
      {t:"steps",items:[
      {h:"It drafts",p:"You decide whether the draft is right, complete, and fit for this client."},
      {h:"It suggests",p:"You choose the strategy, weigh the risk, and answer to the client and court."},
      {h:"You sign",p:"Your signature certifies the work. The AI cannot stand behind it, so you must."}]}],
    notes:"This is the sentence I most want you to keep. AI output is never a substitute for legal judgment.\n\nThe tool can draft, it can summarize, it can suggest three defense angles in seconds. What it cannot do is be responsible. It has no license, no duty to the client, and no standing before the court.\n\nSo the division of labor is clear. It drafts, you decide. It suggests, you choose and weigh the risk. And when you sign, your signature certifies the work as yours. The machine cannot stand behind a filing, which is exactly why you have to. Let us put this to work with a short activity." },

  { kind:"content", kicker:"Activity · core · about 6 minutes", title:"Find the fabrication",
    blocks:[{t:"callout",light:true,label:"Your task",text:"Open a free chatbot. Ask it for three Texas cases on a suppression issue of your choice, with citations and one-line holdings. Then try to verify each one in a real source. Mark which you can confirm, which you cannot, and how confident the tool sounded either way."},
      {t:"cards",cols:3,items:[
      {ico:"💬",h:"Prompt",p:"\"Give me three Texas cases on [issue], with full citations and a one-sentence holding for each.\""},
      {ico:"🔎",h:"Verify",accent:"steel",p:"Search each citation. Can you open the actual opinion and find that language?"},
      {ico:"📝",h:"Record",p:"Confirmed, unconfirmed, or invented. Note the tool's confidence level."}]}],
    notes:"Time to see this yourself. Open whichever free chatbot you set up. Ask it for three Texas cases on any suppression issue you like, with full citations and a one-line holding for each. Then do the part most people skip. Try to verify each one in a real source.\n\nGive it about five minutes. Mark each result as confirmed, unconfirmed, or clearly invented, and pay attention to how sure the tool sounded in every case. That confidence is the trap.\n\nWatch for the person who finds a clean-looking cite that does not exist, because it happens fast in a room this size. When we come back, I will ask how many held up and what would have happened if this had gone into a filing unread. Go ahead and start." },

  { kind:"content", kicker:"Segment one recap", title:"What holds true before any prompt",
    blocks:[{t:"bullets",items:[
      "Your existing duties already reach AI-assisted work",
      "Competence now includes the tools you choose to use",
      "Every AI citation is a lead to verify, not an authority",
      "Keep client data out of tools that may retain or train on it",
      "Responsibility stays with you and only you"]},
      {t:"reflect",text:"**Bridge.** If AI is this prone to error, why use it at all. Because with structure and grounding, you can cut the risk sharply. That is segment two."}],
    notes:"Let us gather the segment. Five things hold true before you type a single prompt. Your duties already reach this work. Competence now includes the tools. Every citation is a lead, not an authority. Client data stays out of tools that may keep it. And responsibility is yours alone.\n\nThat might sound like a case for avoiding AI entirely. It is not. Here is the honest bridge. If the tool is this prone to error when used carelessly, the answer is to stop using it carelessly. With structure and with grounding in real sources, you can cut the risk sharply and still get real value.\n\nThat is exactly what we build next, starting with a framework made for this audience." },
]},

/* ═══════════════ DECK 2 — RISK-REDUCING / TCDLAi ═══════════════ */
{ file:"2-risk-reducing-tcdlai.pptx", title:"Risk-Reducing Practices and TCDLAi", slides:[
  { kind:"divider", segNum:2, dividerEyebrow:"Segment Two · about 25 minutes",
    title:"Risk-Reducing AI Practices", subtitle:"Structure, grounding, and verification. The techniques that turn a risky tool into a checkable one.",
    notes:"We just spent twenty minutes on why AI is risky. Now we spend twenty-five on how to make it far less so. This is the working heart of the session, and it is where you will do the most typing.\n\nThree moves do most of the work. Give the model structure so it cannot wander. Ground it in sources you trust instead of its own memory. And verify what comes back before you rely on it.\n\nWe will build all three around a framework made for this audience, called TCDLAi. Let us start with why the way most people prompt makes things worse." },

  { kind:"content", kicker:"Two ways to bring AI into your practice", title:"Problem-based versus use-case AI",
    blocks:[{t:"approach",items:[
      {bar:"🎯 Problem-based model",start:"Start with **why**. Solve real pain points.",focus:"Deep practice challenges with real stakes, where getting it right matters and the payoff is measurable.",ex:"**Defense example.** Suppression motions eat hours each week, and a bad citation risks sanctions. Structure and grounding cut both the time and the error rate."},
      {bar:"⚡ Use-case model",start:"Start with **what**. Bank quick wins.",focus:"Specific tasks that are repetitive, data-heavy, or generative, where a fast first draft saves minutes.",ex:"**Defense examples.** Summarize a transcript (repetitive), compare two plea offers (data-driven), draft a client update (generative)."}]},
      {t:"reflect",text:"**Today leans problem-based.** We start from a defense problem worth solving, use AI toward it, and judge the result against the problem."}],
    notes:"Before we touch a prompt, one choice shapes everything. There are two ways to bring AI into a practice, and they lead to very different results.\n\nThe use-case model, on the right, starts with what. You look for specific tasks that are repetitive, data-heavy, or generative, and you bank quick wins. Summarize a transcript, compare two plea offers, draft a client update. Useful, and a fine place to start.\n\nThe problem-based model, on the left, starts with why. You name a real pain point with real stakes, like the hours suppression motions eat and the sanctions a bad citation invites, and you aim AI at that. Bigger payoff, and it forces you to measure whether the tool actually helped.\n\nToday we lean problem-based. We start from a defense problem worth solving, then judge the AI against it. Which brings us to why vague prompting is the enemy." },

  { kind:"content", kicker:"The root problem", title:"Vague prompts raise ethical risk, not just poor quality",
    blocks:[{t:"compare",cols:[
      {h:"Unstructured prompt",items:["\"Write me a motion to suppress\"","No issue, no facts, no jurisdiction, no sources","Model fills the gaps by inventing","Confident, generic, and often wrong"]},
      {h:"Structured prompt",items:["Names the issue, facts, court, and required sources","Tells the model what it may not assume","Asks for gaps and uncertainty to be flagged","Produces a checkable draft, not a guess"]}]},
      {t:"reflect",text:"**The link to ethics.** The less you specify, the more the model invents. Structure is not about polish. It is about shrinking the room for fabrication."}],
    notes:"Start with the root problem. Most people type something like write me a motion to suppress and hit enter. That single line has no issue, no facts, no court, and no sources. So the model does what it always does with a gap. It fills it, by inventing.\n\nHere is the connection I want you to hold. The less you specify, the more the model has to make up. Vague prompting is not just a quality problem, it is an ethics problem, because invention is exactly the failure we are trying to avoid.\n\nThe fix on the right is not fancy. Name the issue, the facts, the jurisdiction, and the sources it must use. Tell it what it may not assume. Structure shrinks the room for fabrication, and that is why we lead with it." },

  { kind:"content", kicker:"The foundation", title:"Four parts every serious prompt should carry",
    blocks:[{t:"cards",cols:2,items:[
      {h:"Role",p:"Tell the model who to be. \"Act as a Texas criminal defense attorney preparing for a suppression hearing.\""},
      {h:"Context",p:"Give the facts, the jurisdiction, and the constraints. The fictional stand-in facts go here."},
      {h:"Task",accent:"steel",p:"State exactly what you want produced, and how long or detailed it should be."},
      {h:"Format and limits",accent:"steel",p:"Set the output shape, and add the guardrail. Cite only sources I provide. Flag anything you are unsure of."}]}],
    notes:"Here is the foundation you can teach anyone in your office in five minutes. Four parts. Role, context, task, and format with limits.\n\nRole tells the model who to be, which shapes its tone and focus. Context is where the facts, the jurisdiction, and the constraints live, and where your fictional stand-in facts go. Task states exactly what you want and how much of it. Format and limits set the shape and, most importantly, add the guardrail sentence. Cite only what I give you, and flag anything you are unsure about.\n\nOne more lever. Add a short example or two of the output you want. We call that few-shot prompting, and examples steer the model harder than instructions alone. Now let me show you how the same task improves across three tiers." },

  { kind:"content", kicker:"Good, better, best", title:"Watch one task climb three tiers",
    lead:"Task: identify defenses for a fictional driving-while-intoxicated stop.",
    blocks:[{t:"tiers",items:[
      {label:"Good · fast draft",text:"\"What are some defenses to a DWI?\""},
      {label:"Better · structured",text:"\"Act as a Texas criminal defense attorney. For a first DWI stop with a refused breath test, list five defense angles with the legal basis for each. Texas law only.\""},
      {label:"Best · grounded, checked",text:"\"...Using only the statutes and cases I paste below, list five defense angles, each with its basis and the fact that supports it. Flag any angle the sources do not support. Do not cite outside sources.\""}]}],
    notes:"Let us make this concrete with one task climbing three tiers. The task is finding defenses for a fictional driving-while-intoxicated stop.\n\nThe good version is what most people type. What are some defenses to a DWI. You will get a generic list that may or may not fit Texas. The better version adds a role, the specific facts, a number, and a jurisdiction limit. Already much stronger. The best version adds the two moves that matter most for us. It grounds the model in sources you paste, and it tells the model to flag any angle those sources do not support.\n\nNotice the climb. Role, then structure, then grounding plus a verification flag. Risk drops at every step. This progression is the spine of the framework we turn to now." },

  { kind:"content", kicker:"A framework for this room", title:"The TCDLAi Prompt Design Guide",
    blocks:[{t:"cards",cols:3,items:[
      {h:"T · Target the issue",p:"Frame the precise legal question, charge, and jurisdiction for the model."},
      {h:"C · Compile facts",accent:"steel",p:"Give the model the facts and evidence to organize and prioritize."},
      {h:"D · Define the law",p:"Point it to the statutes and precedents it must work from, not its memory."},
      {h:"L · List strategies",accent:"steel",p:"Ask for defense approaches, each tied to a fact and a basis."},
      {h:"A · Analyze arguments",p:"Have it stress-test strategies and anticipate the prosecution."},
      {h:"i · inspect results",accent:"steel",p:"Critically review, hunt bias and gaps, and refine. This step is yours."}]}],
    notes:"This is the TCDLAi Prompt Design Guide, and the name is the method. Six moves, one per letter, that walk a defense task from the raw legal issue all the way to a result you have checked.\n\nTarget the legal issue. Compile the relevant facts and evidence. Define the applicable laws and precedents. List potential defense strategies. Analyze and articulate the arguments. And the small i, which is the one people skip and the one that saves you, inspect and improve the AI's results.\n\nThe five uppercase letters make the draft. The lowercase i is where the lawyer stays a lawyer. Skip it and you are just forwarding a machine's guess. Run it and the tool becomes an assistant you supervise. Let us look at the two moves that matter most, grounding and inspecting." },

  { kind:"content", kicker:"Grounding · the D in practice", title:"Hold the AI to sources you trust",
    lead:"Retrieval-augmented generation, or grounding, means the model answers from documents you provide instead of its training memory. For defense work, that is the difference between a guess and a citation.",
    blocks:[{t:"cards",cols:2,items:[
      {h:"Without grounding",p:"The model recalls a blurry average of everything it read. Citations may be invented, and Texas specifics blur into general law."},
      {h:"With grounding",accent:"steel",p:"You paste or upload the statute, the opinion, or your own brief bank. The model quotes and cites from that, and you can check every line against the source."}]}],
    notes:"Now the technique that does the most to fight hallucination. It has a clumsy name, retrieval-augmented generation, so I just call it grounding. The idea is simple. Instead of letting the model answer from its blurry memory of everything it ever read, you give it the actual documents and tell it to answer from those.\n\nWithout grounding, the model recalls an average of the whole internet, and Texas specifics blur into general law. With grounding, you paste the statute, the opinion, or your own brief bank, and it quotes and cites from that. Now you can check every line against a source that is sitting right there.\n\nDo it safely. In a consumer tool, ground with public authorities and fictional facts. Save real client material for tools with enterprise terms. This is the D in TCDLAi doing real work." },

  { kind:"content", kicker:"Demonstration · the i in practice", title:"Verify the output against the authority",
    blocks:[{t:"steps",items:[
      {h:"Get the draft",p:"Run a grounded prompt and read the answer with its citations."},
      {h:"Pull the source",p:"Open each cited authority yourself from a real database."},
      {h:"Match the claim",p:"Confirm the quote, the holding, and the pinpoint actually appear."},
      {h:"Correct and note",p:"Fix what fails, and record what you verified and how."}]},
      {t:"prompt",text:"Inspect prompt: \"Review your last answer. For each citation, state the exact\nsentence in the source I pasted that supports it. If you cannot find one,\nsay so and remove the claim.\""}],
    notes:"Let me show you the inspect step as a habit you can run every time. Four steps. Get the draft and read it. Pull each cited source yourself from a real database. Match the claim, confirming the quote and the holding and the pinpoint actually appear. Then correct what fails and note what you verified.\n\nThere is a nice trick on the screen. You can turn the model against its own work. Ask it to point to the exact sentence in your pasted source that supports each citation, and to remove any claim it cannot support. It will often catch its own inventions when you make it show its evidence.\n\nThat is not a substitute for your check. It is a first pass that makes your check faster. You still open the source. Now it is your turn to work." },

  { kind:"content", kicker:"Activity · core · about 12 minutes", title:"Run a fact pattern through TCDLAi",
    blocks:[{t:"callout",light:true,label:"On the resources page · PBL Scenario Lab",text:"Choose one of three fictional fact patterns, a DWI stop, a drug-possession search, or a disputed assault. Work it from the good prompt to the best. Copy the ready-made prompts, run them, and inspect what comes back."},
      {t:"cards",cols:3,items:[
      {ico:"1",h:"Target and Compile",p:"Name the issue and paste the fictional facts. No real client details."},
      {ico:"2",h:"Define and List",accent:"steel",p:"Paste the provided statute excerpt. Ask for grounded strategies."},
      {ico:"3",h:"Analyze and inspect",p:"Stress-test one strategy, then run the inspect prompt to check it."}]}],
    notes:"This is the main hands-on block, so let us give it room. Go to the resources page and open the PBL Scenario Lab. Pick one of three fictional fact patterns, a DWI stop, a drug-possession search, or a disputed assault. Choose the one closest to your practice.\n\nWork it through the framework. Start with the good prompt, then climb to the best. The prompts are ready to copy, so you spend your time reading output, not typing. Paste the provided statute excerpt when you reach the define step, and finish by running the inspect prompt on one strategy.\n\nTake about twelve minutes. When we regroup, rate the best-tier output zero to ten, and tell me what the inspect step caught that you would have missed. That last part is usually the moment it clicks. Go ahead." },

  { kind:"content", kicker:"Activity · optional · add for ninety minutes", title:"Break a grounded answer on purpose",
    lead:"Take your best grounded answer and try to make it fail. Ask a question the pasted statute does not cover, and watch whether the model admits the gap or invents a bridge. Then tighten your prompt until it stops guessing.",
    blocks:[{t:"guardrail",
      will:{h:"You will see",items:["Good prompts make the model say the source is silent","Naming a source limit stops most invented answers","The inspect prompt exposes the weak link fast"]},
      wont:{h:"You will avoid",items:["Trusting fluent answers to out-of-scope questions","Assuming grounding alone removes all risk","Skipping the check because the format looked clean"]}}],
    notes:"If we have the full ninety minutes, this optional round is worth it, because it teaches the limit of grounding. Take your best grounded answer and try to break it. Ask something the pasted statute does not actually cover, and watch closely. Does the model admit the source is silent, or does it quietly build a bridge and invent.\n\nThen tighten your prompt until it stops guessing. A single line, only answer from the source and say if it is silent, changes the behavior dramatically.\n\nThe lesson is on the right. Grounding cuts risk sharply, but it does not remove it. A clean format is not proof. The inspect step is still yours to run. If we are tight on time, we skip this and go straight to takeaways." },

  { kind:"content", kicker:"Segment two recap", title:"Three habits that shrink AI risk",
    blocks:[{t:"stats",items:[
      {num:"Structure",lbl:"Role, context, task, limits. Less room to invent."},
      {num:"Grounding",lbl:"Answers from sources you trust, not memory."},
      {num:"Inspect",lbl:"You verify every claim against a real authority."}]},
      {t:"callout",label:"Bridge",text:"You now have the moves. Segment three turns them into a checklist and a set of clear rules you can post by your desk."}],
    notes:"Let us lock in the segment. Three habits shrink AI risk, and you just practiced all three. Structure, so the model has less room to invent. Grounding, so it answers from sources you trust instead of memory. And inspect, so every claim is checked against a real authority before you rely on it.\n\nThose three, run together through TCDLAi, are most of what responsible AI use looks like day to day.\n\nIn the last segment we turn these habits into something you can actually keep. A short checklist, clear do-and-do-not rules, and guidance on what to document. That is what makes this stick after you leave the room." },
]},

/* ═══════════════ DECK 3 — GUARDRAILS AND TAKEAWAYS ═══════════════ */
{ file:"3-guardrails-takeaways.pptx", title:"Practical Guardrails and Takeaways", slides:[
  { kind:"divider", segNum:3, dividerEyebrow:"Segment Three · about 15 minutes",
    title:"Practical Guardrails and Takeaways", subtitle:"A checklist, clear rules, and the record that protects you. What to keep after today.",
    notes:"Last stretch. We have covered the duties and we have practiced the techniques. Now we make it portable, so it survives the drive home and shows up in your actual work.\n\nThree things in fifteen minutes. A short checklist you run before AI-assisted work leaves your desk. A clear set of do-and-do-not rules. And a simple record that protects you if anyone ever asks how the work was done.\n\nNone of this is heavy. It is meant to fit on one page and to become automatic." },

  { kind:"content", kicker:"Run this before you rely on any output", title:"The ethical guardrail checklist",
    blocks:[{t:"checklist",items:[
      "**Confidentiality.** Did I keep client-identifying facts out of the tool",
      "**Competence.** Do I understand this tool's limits for this task",
      "**Grounding.** Did the model work from sources I trust",
      "**Verification.** Did I open and confirm every citation myself",
      "**Judgment.** Did I make the strategic calls, not the model",
      "**Candor.** Is everything I will file actually true",
      "**Supervision.** Did I review this like a new associate's draft",
      "**Record.** Can I explain later how this work was produced"]},
      {t:"reflect",text:"**One page, every time.** If any box is unchecked, the work is not ready to leave your desk."}],
    notes:"This is the checklist, and it is the single most useful thing you can take from today. Eight questions, and you can run them in under a minute.\n\nDid I keep client-identifying facts out of the tool. Do I understand this tool's limits for the task. Did the model work from sources I trust. Did I open and confirm every citation myself. Did I make the strategic calls. Is everything I will file true. Did I review this like a new associate's draft. And can I explain later how the work was produced.\n\nThe rule is simple. If any box is unchecked, the work is not ready to leave your desk. It is printed on the resources page, so take it and tape it up." },

  { kind:"content", kicker:"Clear rules", title:"Do and do not",
    blocks:[{t:"guardrail",
      will:{h:"Do",items:["Use AI to draft, summarize, outline, and brainstorm angles","Ground it in statutes, opinions, and your own materials","Verify every citation in a real database before you cite it","Use fictional or de-identified facts in consumer tools","Keep the final judgment, and the signature, yours"]},
      wont:{h:"Do not",items:["File anything with a citation you have not personally read","Paste privileged or client-identifying facts into consumer tools","Treat a confident answer as a verified one","Let the model choose strategy or make the call for a client","Assume grounding or a clean format removes your duty to check"]}}],
    notes:"If the checklist is the process, these are the bright lines. On the do side, use AI for what it is good at. Drafting, summarizing, outlining, and surfacing angles you can then evaluate. Ground it in real authority. Verify every citation. Use fictional facts in consumer tools. And keep the judgment and the signature yours.\n\nOn the do-not side, the rules that keep people out of trouble. Never file a citation you have not read. Never paste privileged facts into a consumer tool. Never treat confidence as verification. Never let the model make the call for a client. And never assume that grounding or a tidy format lets you skip the check.\n\nRead these two lists back to yourself once a week for a month and they become instinct." },

  { kind:"content", kicker:"The record that protects you", title:"What to document, review, and verify",
    blocks:[{t:"cards",cols:3,items:[
      {ico:"📝",h:"Document",p:"Which tool, for which task, on what facts. A one-line note in the file is enough for most work."},
      {ico:"👁️",h:"Review",accent:"steel",p:"Read the full output as the responsible attorney. Edit for accuracy, tone, and fit to this client."},
      {ico:"🔎",h:"Verify",p:"Confirm every legal authority and factual claim against a real source before it goes anywhere."}]},
      {t:"callout",light:true,label:"Why bother",text:"A short record turns a hard question into an easy answer. You used a tool, you supervised it, and you verified the result."}],
    notes:"Now the part that quietly protects you. Three verbs. Document, review, verify.\n\nDocument is lighter than it sounds. A single line in the file noting which tool you used, for which task, on what facts. Review means you read the whole output as the responsible attorney and edit it for accuracy and fit. Verify means you confirm every authority and factual claim against a real source.\n\nHere is why it is worth the small effort. If a court or a client or a bar committee ever asks how the work was done, a short record turns a hard question into an easy answer. You used a tool, you supervised it, and you verified the result. That sentence is a good place to stand." },

  { kind:"content", kicker:"Fit test", title:"A quick test for whether AI belongs on a task",
    blocks:[{t:"compare",cols:[
      {h:"Good fit",items:["First drafts you will heavily edit","Summaries of documents you can check","Brainstorming defenses and counterarguments","Reworking tone, length, and clarity","Organizing facts you provide"]},
      {h:"Poor fit",items:["Final legal authority without verification","Privileged facts in a consumer tool","Strategic decisions that belong to you and the client","Tasks you cannot evaluate for correctness","Client-facing output sent without review"]}]},
      {t:"reflect",text:"**The test.** If you can supervise it and verify it, it may be a fit. If you cannot, it is not."}],
    notes:"People often ask where the line is. Here is a test you can apply in seconds. AI is a good fit for first drafts you will edit hard, for summaries you can check, for brainstorming defenses, for reworking tone and clarity, and for organizing facts you provide.\n\nIt is a poor fit for final legal authority without verification, for anything that would require privileged facts in a consumer tool, for the strategic calls that belong to you and your client, for tasks you cannot evaluate for correctness, and for client-facing output sent without review.\n\nBoil it down to one question. Can I supervise this and verify it. If yes, it may belong. If no, it does not. That single question resolves most of the hard cases." },

  { kind:"content", kicker:"Beyond the chatbot", title:"Purpose-built tooling and your own bot",
    blocks:[{t:"cards",cols:2,items:[
      {h:"Claude for Legal",p:"Practice-area tooling that treats every output as a draft for attorney review, flags unverified citations, and gates irreversible steps. A model for how legal AI should behave."},
      {h:"Your BoodleBox LegalAI bot",accent:"steel",p:"The resources page includes knowledge files and custom instructions to build a defense-focused bot that carries the TCDLAi framework and the guardrails by default."}]},
      {t:"callout",label:"The through-line",text:"Whether the tool is general or built for law, the standard does not move. It drafts, you verify, you decide, you sign."}],
    notes:"Two quick pointers for after today. First, purpose-built tooling. Claude for Legal is an example worth knowing, because of how it behaves. It treats every output as a draft for your review, it flags citations it cannot verify, and it stops before anything irreversible. That is the posture we want from legal AI.\n\nSecond, you can build your own. On the resources page I have put a set of knowledge files and custom instructions for a BoodleBox bot I am calling LegalAI. Upload those and the bot carries the TCDLAi framework and today's guardrails by default, so the good habits are baked in.\n\nEither way, the through-line holds. General tool or legal tool, it drafts, you verify, you decide, and you sign." },

  { kind:"content", kicker:"Take these with you", title:"Everything is on the resources page",
    blocks:[{t:"cards",cols:2,items:[
      {h:"TCDLAi Prompt Design Guide",accent:"steel",p:"The six-move framework, with example defense prompts for each letter."},
      {h:"Ethical guardrail checklist",p:"The eight-point, one-page check you run before relying on any output."},
      {h:"Legal prompt library",p:"Prompts sorted by type and task, each written to push toward verification."},
      {h:"BoodleBox LegalAI bot files",accent:"steel",p:"Custom instructions and knowledge files, ready to upload and build."}]}],
    notes:"Here is everything you are taking home, and it is all in one place. The TCDLAi Prompt Design Guide with example prompts for every letter. The eight-point ethical checklist on a single page. The legal prompt library sorted by type and task. And the files to build your own BoodleBox LegalAI bot.\n\nYou do not need to copy any of this down. It lives at mglearn.github.io/legalai. Bookmark that one address before you leave and you have the whole session in your pocket.\n\nLet me close with the one habit I hope sticks." },

  { kind:"cover", eyebrow:"Thank you",
    title:"Draft with the tool. Decide as the lawyer.",
    subtitle:"If you keep one habit, open the source and verify the citation, every time.",
    meta:"Miguel Guhlin · TCEA\nResources, prompts, checklist, and bot files: "+URL+"\nQuestions welcome. Use the tools well, and stay accountable.",
    notes:"I will leave you with one sentence. Draft with the tool, and decide as the lawyer. The machine can produce a lot of words quickly. Your value is knowing which of them are true, which serve this client, and which to strike.\n\nAnd if you keep only one habit from this hour, make it this. Open the source and verify the citation, every single time. That habit alone would have saved every lawyer you have read about in the news.\n\nEverything is on the resources page, and I am glad to take questions. Thank you for spending this hour on doing it right." },
]},

];
