# Web Deck System — Build Guide

How the HTML slide decks in this project work, so you (or Claude) can build more in the same look and feel. These are **self-contained HTML decks**: no build step, no framework, no dependencies beyond Google Fonts. They present fullscreen, carry teleprompter **speaker notes**, support a **two-monitor presenter view**, and export to **PDF**.

The whole system lives in two shared files:

- `assets/deck-framework.css` — the design system, the slide layout, and the presenter-view styles.
- `assets/deck-framework.js` — navigation, the notes panel, the presenter window, cross-window sync, and print.

Each deck is one HTML file in `decks/` that links those two files plus the fonts, and contains only its slides.

---

## 1. Aesthetic: blue-and-silver, editorial / legal-luxe

Think distinguished legal brief meets modern editorial. Typography is the hero; whitespace is generous; accents are precise hairlines and brushed silver.

**Palette** (CSS custom properties in `:root`):

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#102A54` | titles, footer bar |
| `--navy-dk` | `#0B1D33` | cover / divider backgrounds |
| `--navy-md` / steel | `#2F5F8F` | secondary, "do" column, emphasis text |
| `--gold` (accent) | `#6F8FAF` | steel-blue accent (bullets, bars, borders) |
| `--gold-lt` (silver) | `#C8D2DC` | silver: subtitles, light strips on dark |
| `--lgray` | `#F5F8FC` | card fills |
| `--mgray` | `#D8DEE6` | hairline borders |
| `--slate` | `#4F6072` | body captions |
| `--text` | `#1C2B44` | body text |

The names `--gold*` are historical; the values are blue/silver. Do/do-not columns use steel (do) vs navy (do-not) instead of green/red, to stay in the monochrome palette. `--metal` is a brushed-silver gradient used for accent strips, the footer rule, and the progress bar. `--paper` is a subtle gradient for content-slide backgrounds. A faint SVG grain overlay sits on every slide.

**Fonts** (load via one Google Fonts link in each deck's `<head>`):

- Display / headings: **Fraunces** (`--font-display`) — characterful editorial serif.
- Body: **Libre Franklin** (`--font-body`) — Franklin-Gothic lineage, editorial/legal.
- Mono / prompts: **IBM Plex Mono** (`--font-mono`).

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Libre+Franklin:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Type scale** (on the 1280-px canvas): slide title Fraunces ~41 px; kicker 13 px tracked caps in steel, preceded by a small diamond and followed by a hairline rule; lead 22 px; bullets 23 px; card headings 20 px; card body 18 px. Keep content text at or above ~18 px so it reads on a projector.

**Motion**: one orchestrated entrance per slide — children of `.slide-body` rise-and-fade in sequence (a softer blur-glide on covers/dividers). Respects `prefers-reduced-motion`.

---

## 2. The slide canvas

Every slide is a fixed **1280 × 720** (16:9) canvas. The JS scales it to fit the viewport, so you author at a constant size and it looks right on any screen.

```html
<div class="deck">
  <section class="slide cover current"> ... </section>   <!-- first slide gets `current` -->
  <section class="slide"> ... </section>
  ...
</div>
<script src="../assets/deck-framework.js"></script>
```

Each `<section class="slide">` contains three parts:

```html
<section class="slide">
  <div class="slide-body"> ...visible content... </div>
  <div class="slide-footer">
    <span class="brand"><span class="star">✦</span> TCDLAi</span>
    <span class="fac">Facilitator: Miguel Guhlin</span>
    <span class="url">mglearn.github.io/legalai</span>
  </div>
  <div class="notes"><p>...teleprompter text...</p></div>   <!-- never rendered on the slide -->
</section>
```

---

## 3. Slide types and components

**Cover** — `class="slide cover"`: navy gradient, silver left rule, inset hairline frame.
```html
<div class="slide-body">
  <div class="cover-eyebrow">Event · Date</div>
  <h1>Big Title</h1>
  <div class="subtitle">Italic silver subtitle</div>
  <div class="meta"><strong>Facilitator:</strong> Name<br>url</div>
</div>
```

**Divider** — `class="slide divider"`: like the cover, with an oversized **ghosted section numeral**.
```html
<div class="slide-body">
  <div class="seg-num">1</div>
  <div class="divider-eyebrow">Segment One · about 20 minutes</div>
  <h1>Section Title</h1>
  <div class="subtitle">One-line summary</div>
</div>
```

**Content** — the standard slide. Masthead = kicker + title, then one or more blocks:
```html
<div class="slide-body">
  <div class="slide-kicker">Small tracked label</div>
  <h2 class="slide-title">The headline</h2>
  <p class="lead">Optional lead sentence.</p>
  <!-- then any blocks below -->
</div>
```

**Blocks you can drop into `.slide-body`:**

- `<ul class="bullets"><li>…</li></ul>` — 3 to 5 diamond bullets, short phrases. `<strong>` for emphasis.
- `<div class="grid cols-3">` (or `cols-2`) of `<div class="card">` (add `gold` for a steel top-tab). Card = `<h3><span class="ico">⚖️</span>Title</h3><p>…</p>`.
- `<div class="steps">` of `<div class="step"><div class="n">1</div><h4>…</h4><p>…</p></div>` — numbered process.
- `<div class="guardrail">` with `<div class="guardrail-col will"><h4>Do</h4><ul>…</ul></div>` and `<div class="guardrail-col willnot"><h4>Do not</h4><ul>…</ul></div>` — the ✓ / ✕ columns.
- `<div class="compare">` with two `<div class="compare-col">` (second one `alt` for the steel accent).
- `<div class="callout"><span class="label">LABEL</span><p>Big statement</p></div>` — navy strip; add `light` for a silver version.
- `<div class="reflect"><span>💬</span><p><strong>Lead.</strong> Italic prompt</p></div>` — a navy reflection strip.
- `<div class="prompt">…</div>` — dark mono block for prompt/citation text.
- `<div class="stat-row">` of `<div class="stat"><div class="num">Word</div><div class="lbl">…</div></div>`.
- `<span class="pill time">about 20 min</span>` or `pill tag`.
- `<div class="scenario"><div class="scenario-label">Your task</div><p>…</p></div>` — activity card.
- **Next-step link** (points to an activity, the next deck, etc.):
  ```html
  <div class="next-step no-advance">
    <span class="ns-label">Do this next</span>
    <a href="../activities/x.html" target="_blank" rel="noopener">Open it <span class="arrow">↗</span></a>
  </div>
  ```
  Use `no-advance` so clicking the link does not also flip the slide, and `target="_blank"` so the projector stays put.
- **Corner icon** — `<img class="slide-ico" src="../assets/x-icon.png" alt="">` as the first child of `.slide-body`. It floats top-right (108 px). Only use it on slides whose top-right is empty (it will overlap two-column content otherwise).

Deck-specific one-offs (letter grids, tier cards, approach panels) live in a small `<style>` block in that deck's `<head>`; reuse the palette variables so they stay on-brand.

---

## 4. Speaker notes and the presenter view

**Notes.** Every slide carries `<div class="notes"><p>…</p></div>`. It is hidden on the slide and surfaced two ways:

- **On the current screen:** press **S** (or **N**) to slide up a notes panel.
- **On a second monitor:** press **V** (or the 🖥 button) to open a **presenter window**. It shows the **current slide**, the **next slide**, the **notes in large type**, an **elapsed timer** (click it to pause; a Reset button too), and a **clock**. Put the main deck window on the projector and press **F** for fullscreen. The two windows stay in sync — advancing in either moves both — via `BroadcastChannel` plus a `localStorage` fallback (same-origin, so it works on the hosted site).

**Writing the notes** — teleprompter text, not stage directions:
- First person, conversational, the way you would actually say it out loud.
- ~90 to 130 words per slide.
- Cover what to say, what to watch for in the room, and the transition to the next slide.
- No em dashes. No meta-remarks ("say this", "I want to name something"). No assumptions about how the audience feels.

**Keyboard:** → / Space / PgDn next · ← / PgUp previous · Home / End first / last · **S** notes · **V** presenter view · **F** fullscreen · **P** print/PDF · **?** help. Clicking the left third of a slide goes back, the rest advances (links and buttons are ignored).

**Facilitator tips stay out of participant view** — do not print the shortcut list on a public page. It already lives on the in-deck **?** overlay.

---

## 5. Print / PDF export

Press **P** in any deck. The print stylesheet stacks every slide one-per-page at 1280 × 720, forces `print-color-adjust: exact` so the navy and silver survive, resets the JS scaling transforms, and hides the chrome. "Save as PDF" gives a clean handout.

---

## 6. Build a new deck (checklist)

1. Copy an existing deck's `<head>` (the Google Fonts link + `<link rel="stylesheet" href="../assets/deck-framework.css">`).
2. Open `<div class="deck">`. Add one `<section class="slide …">` per slide; give the **first** one `current`.
3. Start with a `cover`, use `divider` slides between segments, and `content` slides in between.
4. On every slide include the `.slide-footer` (brand · facilitator · url) and a `.notes` block.
5. Keep slides to 3–5 short bullets or one main block; push full sentences into the notes.
6. End the body with `<script src="../assets/deck-framework.js"></script>`.
7. Write the teleprompter notes for every slide before you call it done.

**Writing style for on-slide text:** second person, Oxford comma, spell out numbers one through ten, no em dashes, no ampersands (use "and"), no colons in titles, and avoid the hype words (empower, journey, embark, delve, unlock, elevate, discover, master).

---

## 7. Optional: resource pages and the language switcher

Reader pages (a hub, activities, handouts) use `assets/pages.css` instead of the deck framework, with the same palette and fonts. Cards use `.tile` (+ `.tile-ico` for a corner image); page headers can carry a `.hdr-ico` badge.

A lightweight i18n engine (`assets/i18n.js`, ported from the TCEA breakouts engine) adds a language switcher: mark chrome with `data-i18n="key"`, drop a `<span data-i18n-picker>` for the auto-built `<select>`, and register a flat dictionary per page (`BreakoutI18n.register('name', { en:{…}, es:{…}, … })`). It handles `?lang=`/localStorage persistence and RTL for Arabic and Urdu. Translate page chrome; keep substantive legal content in English.

---

*This project: `mglearn.github.io/legalai` — "AI for the Defense," TCDLA.*
