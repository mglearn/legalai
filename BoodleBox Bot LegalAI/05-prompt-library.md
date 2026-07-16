# Starter Prompt Library for LegalAI

Copy-ready prompts organized by task. Each is written to keep the model grounded and to push toward verification. Replace bracketed fields, and paste your fictional or de-identified facts and any source text where indicated.

---

## Case analysis and strategy

**Issue spot (T + C)**
> Act as a Texas criminal defense assistant. Here are the facts: [paste fictional facts]. Identify the top legal issues, the likely charges, and the constitutional questions raised. Do not add facts. Mark anything you are unsure about.

**Grounded defense strategies (D + L)**
> Using ONLY the statute text I paste below, list five defense strategies for these facts. For each: the strategy, the single supporting fact, and the legal basis. Flag any strategy the source does not support. Paste: [facts] / [statute text].

**Stress-test a theory (A)**
> Here is my defense theory: [theory]. Anticipate the three strongest prosecution responses, and for each, suggest how I might answer. Note any weakness that could sink the theory.

## Legal writing and drafting

**Motion outline (draft for review)**
> Draft an outline for a motion to suppress based only on these facts and this excerpt: [facts] / [excerpt]. Structure: introduction, statement of facts, legal standard, argument, conclusion. Leave every citation as `[UNVERIFIED — insert]`. This is a draft for attorney review.

**Plain-language client letter**
> Rewrite this update for a client at an eighth-grade reading level, warm and clear, no legalese, under 200 words. Keep every factual detail unchanged. Do not add promises about outcomes. [paste draft].

## Client communication

**Explain a charge simply**
> Explain what [charge] means under Texas law in plain language for a nervous client. Cover what the State must prove and what happens next, at a high level. Note that specifics depend on the facts and the attorney's advice.

## Verification and cite-checking

**Self-check (i)**
> Review your last answer. For each citation and legal proposition, quote the exact sentence in my provided sources that supports it, or mark it `[UNVERIFIED]` or `[UNSUPPORTED]`. Remove anything you cannot support.

**Compare to source**
> I am pasting a case excerpt and a summary you wrote. Identify every place the summary states something the excerpt does not support. [excerpt] / [summary].

## Investigation and preparation

**Witness inconsistencies**
> From these witness statements, build a table of factual claims and flag every inconsistency and every point only one witness asserts. Do not resolve them. [paste statements].

**Cross-examination sets**
> Based only on these facts, draft three cross-examination question sets for [witness], each aimed at a specific weakness. Keep questions short and leading. [facts].

## Prompt engineering

**Role, Context, Task, Format**
> Act as [role]. Context: [facts and jurisdiction]. Task: [what you want]. Format: [shape and length]. Rules: cite only sources I provide, and flag anything you are unsure of.

**Add a few-shot example**
> Here is one example of the output I want: [example]. Now produce the same for: [new input]. Match the structure exactly.

---

*Every output is a draft for attorney review. Verify all authority against a real database.*
