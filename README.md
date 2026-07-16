# AI for the Defense

**Ethical Use, Accuracy, and Attorney Responsibility** — session resources for the **Texas Criminal Defense Lawyers Association** (TCDLA), July 2026.

Live site: **https://mglearn.github.io/legalai**

This is a modular, hands-on session on responsible generative AI use in criminal defense practice. It leads with ethics, spends most of its time on problem-based practice in free AI chatbots, and sends attorneys home with a framework, a checklist, a prompt library, and a bot they can build.

## What is here

### Presentations (`decks/`)
Self-contained HTML slide decks. Arrow keys to navigate, **S** for speaker notes, **P** to print or export to PDF.

- `0-overview.html` — title, description, learning objectives, agenda
- `1-ethical-foundations.html` — duties, hallucinated citations, confidentiality, judgment
- `2-risk-reducing-tcdlai.html` — structured prompting, the TCDLAi framework, grounding, verification
- `3-guardrails-takeaways.html` — ethics checklist, do-and-do-not, documentation

Editable **PowerPoint** versions of all four decks (with the same speaker notes on every slide) are in `pptx/`. They are generated from `build-pptx/` with PptxGenJS (`cd build-pptx && npm install && node gen.js`).

### Activities (`activities/`)
- `fluency-self-assessment.html` — a five-question AI fluency self-check for legal practice
- `pbl-scenario-lab.html` — three fictional fact patterns worked through TCDLAi, good to best

### Handouts (`handouts/`)
- `tcdlai-guide.html` — the TCDLAi Prompt Design Guide
- `guardrail-checklist.html` — the ethical guardrail checklist
- `prompt-library.html` — a legal prompt library, sorted by type and task

### BoodleBox Bot LegalAI (`BoodleBox Bot LegalAI/`)
Custom instructions and knowledge files to build a defense-focused AI bot in BoodleBox, a Claude Project, a Custom GPT, or a Mistral agent. See that folder's `README.md`.

## The TCDLAi framework

A six-move structure for defense prompts. The five uppercase letters build the draft; the lowercase **i** is where the lawyer stays a lawyer.

- **T** — Target the legal issue
- **C** — Compile relevant facts and evidence
- **D** — Define applicable laws and precedents
- **L** — List potential defense strategies
- **A** — Analyze and articulate arguments
- **i** — inspect and improve the AI's results

## Safe practice

Every scenario here is fictional. Never put confidential, privileged, or client-identifying facts into a consumer chatbot. Every AI-assisted output is a draft for attorney review, and every citation the model gives you is a lead to verify, not an authority to cite.

## Reuse

Session prompts and materials are shared for the TCDLA community. Nothing here is legal advice. Rule references are illustrative; confirm the current Texas Disciplinary Rules of Professional Conduct before relying on them.

---

Facilitator: **Miguel Guhlin**, TCEA · [mguhlin.org](https://mguhlin.org)
