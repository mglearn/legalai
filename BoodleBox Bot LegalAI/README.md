# BoodleBox Bot — LegalAI Defense Assistant

Everything you need to build a defense-focused AI bot that carries the TCDLAi framework and the ethical guardrails by default. Built for the TCDLA session **AI for the Defense**.

> **Practice safely.** This bot is for drafting, analysis, and issue-spotting. Every output is a draft for attorney review. Use fictional or de-identified facts in consumer tools. Verify all authority in a real database.

---

## What is in this folder

| File | What it is | Where it goes |
|---|---|---|
| `00-custom-instructions.txt` | The bot's persona and rules | Paste into the custom-instructions / system-prompt field |
| `01-tcdlai-prompt-design-guide.txt` | The six-move prompting framework | Upload as knowledge |
| `02-ethics-guardrail-checklist.txt` | Duties, do-and-do-not, checklist | Upload as knowledge |
| `03-verification-workflow.txt` | How to confirm output and cite-check | Upload as knowledge |
| `04-fact-patterns.txt` | Three fictional practice scenarios | Upload as knowledge |
| `05-prompt-library.txt` | Copy-ready starter prompts | Upload as knowledge |
| `06-claude-for-legal-practices.txt` | Element chart, chronology, and matter workspace (adapted from Claude for Legal) | Upload as knowledge |

**Prefer one download?** Grab `LegalAI-BoodleBox-Bot.zip` (all files, contents are markdown with a `.txt` extension), unzip it, and upload the pieces.

## Build it in BoodleBox

1. Sign in to BoodleBox. If you have a license code from the session, redeem it first.
2. Create a new bot. Name it **LegalAI** and give it a short description, for example: *Drafting and analysis assistant for Texas criminal defense. Every output is a draft for attorney review.* Set its picture using `bot_icon.png` (an example avatar is included in this folder).
3. Open the custom-instructions field. Copy the full contents of `00-custom-instructions.txt` and paste it in.
4. Add knowledge files. Upload the six numbered knowledge files (`01` through `06`).
5. Save, then test with a fictional fact pattern from `04-fact-patterns.txt`.

## Build it somewhere else

The same files work in other tools.

- **Claude Project:** create a Project, paste `00` into the project instructions, and add the numbered files to Project knowledge.
- **Custom GPT:** paste `00` into Instructions, and upload the numbered files under Knowledge.
- **Mistral or other agent builders:** paste `00` as the system prompt, and attach the numbered files as context or a knowledge source.

## Test prompts

Try these after you build it. Each should trigger the bot's grounding and verification behavior.

- "Use fact pattern one. Give me five suppression angles, grounded only in the excerpt, and flag anything unsupported."
- "Draft a plain-language client letter explaining a DWI charge. Keep the facts unchanged and add no promises."
- "Here is a case summary you wrote and the source excerpt. Show me every claim the source does not support."

A well-built bot will restate the issue, tie claims to provided facts, mark unverified citations, and remind you that the output is a draft for attorney review.

## If it misbehaves

- **It invents citations.** Re-paste `00` into the instructions field and confirm the knowledge files uploaded. Add: "Cite only sources I provide in this chat."
- **It gives final-sounding answers.** Remind it: "Every output is a draft for attorney review. Flag what I must verify."
- **It asks for client details.** Good. Give it fictional stand-ins, not real identifying facts.

---

*Facilitator: Miguel Guhlin · Session resources at mglearn.github.io/legalai*
