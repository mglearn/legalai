---
name: webdeck
description: Build self-contained HTML slide decks in the blue-and-silver editorial "TCDLAi" style — a fixed 1280x720 canvas, teleprompter speaker notes, a two-monitor presenter view (press V), keyboard navigation, and PDF export. Use when creating or editing presentation slide decks, or when reusing this deck look-and-feel in a new project.
---

# Web Deck System

Self-contained HTML slide decks: no build step, no framework, no dependencies beyond Google Fonts. They present fullscreen, carry teleprompter **speaker notes**, support a **two-monitor presenter view**, and export to **PDF**. Two shared files power everything; each deck is one HTML file that links them.

- `assets/deck-framework.css` — design system, slide layout, presenter-view styles.
- `assets/deck-framework.js` — navigation, notes panel, presenter window, cross-window sync, print.

When reusing in a new project, copy those two files and one deck as a template. A companion long-form guide lives at the project root as `WEBDECK-GUIDE.md`.

## Aesthetic: blue-and-silver, editorial / legal-luxe

Typography is the hero; generous whitespace; precise hairlines and brushed-silver accents.

Palette (`:root` CSS vars — names are historical, values are blue/silver):
`--navy #102A54`, `--navy-dk #0B1D33`, `--navy-md`/steel `#2F5F8F`, `--gold`(steel accent) `#6F8FAF`, `--gold-lt`(silver) `#C8D2DC`, `--lgray #F5F8FC`, `--mgray #D8DEE6`, `--slate #4F6072`, `--text #1C2B44`. Do/do-not columns use steel (do) vs navy (do-not), not green/red. `--metal` is a silver gradient for accent strips and the progress bar; `--paper` is a subtle content-slide gradient; a faint SVG grain sits on every slide.

Fonts (one Google Fonts link per deck head): **Fraunces** display (`--font-display`), **Libre Franklin** body (`--font-body`), **IBM Plex Mono** prompts (`--font-mono`).

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Libre+Franklin:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Type scale on the 1280px canvas: title ~41px Fraunces; kicker 13px tracked caps (diamond marker + hairline); lead 22px; bullets 23px; card heading 20px; card body 18px. Keep content text at or above ~18px for projector legibility. One staggered entrance animation per slide; respects `prefers-reduced-motion`.

## Slide canvas and skeleton

Fixed 1280×720 (16:9), scaled to the viewport by JS. First slide gets `current`.

```html
<div class="deck">
  <section class="slide cover current">
    <div class="slide-body"> ...content... </div>
    <div class="slide-footer">
      <span class="brand"><span class="star">✦</span> TCDLAi</span>
      <span class="fac">Facilitator: Name</span>
      <span class="url">example.org</span>
    </div>
    <div class="notes"><p>...teleprompter text...</p></div>
  </section>
  <!-- more <section class="slide">... -->
</div>
<script src="../assets/deck-framework.js"></script>
```

## Slide types

- **Cover** `class="slide cover"`: `.cover-eyebrow`, `<h1>`, `.subtitle`, `.meta`.
- **Divider** `class="slide divider"`: `.seg-num` (oversized ghost numeral), `.divider-eyebrow`, `<h1>`, `.subtitle`.
- **Content**: `.slide-kicker` + `<h2 class="slide-title">` + optional `<p class="lead">`, then blocks.

## Content blocks (drop into `.slide-body`)

- `<ul class="bullets"><li>…</li></ul>` — 3–5 diamond bullets, short phrases, `<strong>` for emphasis.
- `<div class="grid cols-3">`/`cols-2` of `<div class="card">` (add `gold`); card = `<h3><span class="ico">⚖️</span>Title</h3><p>…</p>`.
- `<div class="steps">` of `<div class="step"><div class="n">1</div><h4>…</h4><p>…</p></div>`.
- `<div class="guardrail">` + `<div class="guardrail-col will"><h4>Do</h4><ul>…</ul></div>` and `…willnot` `<h4>Do not</h4>` — ✓/✕ columns.
- `<div class="compare">` + two `<div class="compare-col">` (second `alt`).
- `<div class="callout"><span class="label">LABEL</span><p>…</p></div>` (add `light`).
- `<div class="reflect"><span>💬</span><p><strong>Lead.</strong> italic prompt</p></div>`.
- `<div class="prompt">…</div>` — dark mono block for prompt/citation text.
- `<div class="stat-row">` of `<div class="stat"><div class="num">Word</div><div class="lbl">…</div></div>`.
- `<span class="pill time">about 20 min</span>` / `pill tag`.
- `<div class="scenario"><div class="scenario-label">Your task</div><p>…</p></div>`.
- Next-step link: `<div class="next-step no-advance"><span class="ns-label">Do this next</span><a href="../activities/x.html" target="_blank" rel="noopener">Open it <span class="arrow">↗</span></a></div>`. Use `no-advance` and `target="_blank"`.
- Corner icon: `<img class="slide-ico" src="../assets/x-icon.png" alt="">` as the first child of `.slide-body`; only on slides whose top-right is empty.

Deck-specific one-offs go in a small `<style>` in that deck's head, reusing the palette vars.

## Speaker notes and presenter view

Every slide carries `<div class="notes"><p>…</p></div>` (hidden on the slide). Surface it two ways:
- **Current screen:** press **S**/**N** to toggle a notes panel.
- **Second monitor:** press **V** (or 🖥) to open a presenter window with the current slide, next slide, large notes, an elapsed timer (click to pause; Reset button), and a clock. Put the deck window on the projector, press **F** fullscreen. Windows sync via BroadcastChannel + localStorage (same-origin).

Write notes as teleprompter text: first person, ~90–130 words, what to say + what to watch for + the transition. No em dashes, no stage directions ("say this"), no assumptions about audience feelings.

Keyboard: →/Space/PgDn next, ←/PgUp prev, Home/End first/last, **S** notes, **V** presenter, **F** fullscreen, **P** print/PDF, **?** help. Click left third = back, rest = forward (links/buttons ignored). Keep the shortcut list off public pages; it is on the in-deck **?** overlay.

## Print / PDF

Press **P**. The print CSS stacks slides one-per-page at 1280×720, forces `print-color-adjust: exact`, resets JS transforms, and hides chrome.

## Build checklist

1. Copy a deck's head (fonts link + `deck-framework.css`).
2. `<div class="deck">`; one `<section class="slide …">` per slide; first gets `current`.
3. Cover first, `divider` between segments, `content` between.
4. Every slide: `.slide-footer` + `.notes`.
5. 3–5 short bullets or one main block per slide; full sentences go in notes.
6. End body with `<script src="../assets/deck-framework.js"></script>`.
7. Write teleprompter notes on every slide.

On-slide writing style: second person, Oxford comma, spell out one–ten, no em dashes, no ampersands, no colons in titles; avoid hype words (empower, journey, embark, delve, unlock, elevate, discover, master).

## Optional: resource pages + language switcher

Reader pages (hub, activities, handouts) use `assets/pages.css` (same palette/fonts), `.tile`/`.tile-ico`/`.hdr-ico`. A small i18n engine (`assets/i18n.js`) adds a switcher: `data-i18n="key"` on chrome, a `<span data-i18n-picker>` for the auto `<select>`, and `BreakoutI18n.register('name', { en:{…}, es:{…}, … })` per page (handles `?lang=`/localStorage and RTL for Arabic/Urdu). Translate chrome; keep substantive legal content in English.
