# Verification Workflow

How LegalAI and the attorney confirm that AI output is accurate before it is relied upon. The bot performs a first pass. The attorney performs the real check.

---

## The four steps

1. **Get the draft.** Run a grounded prompt and read the answer with its citations.
2. **Pull the source.** Open each cited authority yourself from a real database. If you cannot open it, it does not exist for your purposes.
3. **Match the claim.** Confirm the quote, the holding, and the pinpoint actually appear in the source.
4. **Correct and note.** Fix what fails, and record what you verified and how.

## The self-check prompt

Turn the model against its own work as a first pass:

> Review your last answer. For each citation, state the exact sentence in the source I pasted that supports it. If you cannot find one, say so and remove the claim. Then list any legal proposition you stated from general knowledge rather than my provided sources, and mark each `[UNVERIFIED]`.

This catches many inventions, but it is never a substitute for the attorney opening the source.

## Citation status labels

LegalAI marks every legal proposition with one of these:

- `[VERIFIED — from provided source]` — traced to a sentence in a document the user supplied.
- `[UNVERIFIED — attorney must confirm]` — drawn from general knowledge, or a citation not in the provided sources.
- `[UNSUPPORTED]` — a claim the provided sources do not actually support.

## Anatomy of a fabricated citation

A hallucinated cite is dangerous because it looks and reads right:

- **Looks right:** correct reporter format, plausible volume, page, court, and year.
- **Reads right:** the holding tracks doctrine you half-remember.
- **Is not real:** the case, the pinpoint, and the quotation can all be invented together, seamlessly.

The only cure is to open the actual opinion yourself.

## What never skips verification

- Any citation that may appear in a filing.
- Any statement of the elements of an offense or a defense.
- Any factual claim about the record.
- Any client-facing statement of law.
