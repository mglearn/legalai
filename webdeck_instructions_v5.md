# Web Deck Instructions — v5

*Specification for the self-contained "TCDLAi" HTML slide-deck system.*
*Project: `mglearn.github.io/legalai` — "AI for the Defense," TCDLA. Last revised 2026-07-17.*

This is the single source of truth for the deck system. It replaces the former `WEBDECK-GUIDE.md` (now removed); the `webdeck` skill defers to this file. It folds in everything added since the first build: the **exit-to-hub icon**, the **image and photo layout patterns**, the **accessibility layer** (reflow mode, visible focus, a slide-change live region — §7), the **headless-Chrome verification workflow**, and the **two-account deploy flow**.

---

## 0. What this system is

Self-contained HTML slide decks. **No build step, no bundler, no framework, no runtime dependency beyond Google Fonts.** Each deck is a single HTML file that presents fullscreen, carries teleprompter **speaker notes**, drives a **two-monitor presenter view**, exports to **PDF**, and scales to any screen.

Everything is powered by two shared files, plus one HTML file per deck:

| File | Role |
|---|---|
| `assets/deck-framework.css` | Design system, slide layout, navigation chrome, presenter-view styles, print rules. ~380 lines. |
| `assets/deck-framework.js` | Slide navigation, notes panel, presenter window, cross-window sync, exit icon, print. ~290 lines. IIFE, no dependencies. |
| `decks/<n>-<name>.html` | One deck. Links the two shared files + fonts; contains only its slides and any deck-local `<style>`. |

To reuse in a new project: copy those two `assets/` files and one deck as a template, then swap the slides.

---

## 1. Aesthetic — blue-and-silver, editorial / legal-luxe

Distinguished legal brief meets modern editorial. **Typography is the hero.** Whitespace is generous. Accents are precise hairlines and brushed silver — never bright color.

### Palette (`:root` CSS custom properties)

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#102A54` | titles, footer bar, primary accent |
| `--navy-dk` | `#0B1D33` | cover / divider backgrounds |
| `--navy-md` / steel | `#2F5F8F` | secondary emphasis, "do" column, kicker text |
| `--gold` (steel accent) | `#6F8FAF` | bullets, bars, borders — a steel-blue, **not** gold |
| `--gold-lt` (silver) | `#C8D2DC` | subtitles, light strips on dark, hover highlight |
| `--lgray` | `#F5F8FC` | card fills |
| `--mgray` | `#D8DEE6` | hairline borders |
| `--slate` | `#4F6072` | captions |
| `--text` | `#1C2B44` | body text |
| `--metal` | silver gradient | accent strips, footer rule, progress bar |
| `--paper` | subtle gradient | content-slide background |

> **The `--gold*` names are historical; the values are blue/silver.** Do not introduce real gold, green, or red. Do/do-not columns use **steel (do) vs navy (do-not)**, staying monochrome. A faint SVG grain overlay sits on every slide. On hover, interactive chrome brightens toward `--gold-lt` — which is pale **silver**, so hovers read as silver, not gold (this is intentional and consistent).

### Fonts — one Google Fonts link per deck `<head>`

- Display / headings: **Fraunces** (`--font-display`) — characterful editorial serif.
- Body: **Libre Franklin** (`--font-body`) — Franklin-Gothic lineage.
- Mono / prompts: **IBM Plex Mono** (`--font-mono`).

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Libre+Franklin:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type scale (on the 1280-px canvas)

Slide title Fraunces ~41 px · kicker 13 px tracked caps in steel (diamond marker + hairline rule) · lead 22 px · bullets 23 px · card heading 20 px · card body 18 px. **Keep on-slide text ≥ 18 px** for projector legibility.

**Motion:** one orchestrated entrance per slide — children of `.slide-body` rise-and-fade in sequence (softer blur-glide on covers/dividers). Respects `prefers-reduced-motion`.

---

## 2. The slide canvas

Every slide is a fixed **1280 × 720** (16:9) canvas. The JS scales it to the viewport, so you author at a constant size and it fits any screen. The scale is recomputed on resize. Below ~800 px wide, or at high browser zoom, the framework switches to a **reflow mode** (§7) so the deck stays readable on phones and meets WCAG reflow; on laptops and projectors it scales as one unit exactly as before.

```html
<div class="deck">
  <section class="slide cover current"> … </section>   <!-- first slide gets `current` -->
  <section class="slide"> … </section>
  …
</div>
<script src="../assets/deck-framework.js"></script>
```

Each slide has three parts — **body, footer, notes**:

```html
<section class="slide">
  <div class="slide-body"> …visible content… </div>
  <div class="slide-footer">
    <span class="brand"><span class="star">✦</span> TCDLAi</span>
    <span class="fac">Facilitator: Miguel Guhlin</span>
    <span class="url">mglearn.github.io/legalai</span>
  </div>
  <div class="notes"><p>…teleprompter text…</p></div>   <!-- never rendered on the slide -->
</section>
```

The framework reads `location.hash` on load, so `deck.html#4` opens on slide 4 — used for deep links **and** for screenshot verification (see §10).

---

## 3. Slide types

- **Cover** — `class="slide cover"`: navy gradient, silver left rule, inset hairline frame.
  ```html
  <div class="slide-body">
    <div class="cover-eyebrow">Event name</div>
    <h1>Big Title</h1>
    <div class="subtitle">Italic silver subtitle</div>
    <div class="meta"><strong>Facilitator:</strong> Name<br>url</div>
  </div>
  ```
- **Divider** — `class="slide divider"`: cover-like, with an oversized ghosted `.seg-num` numeral. Some decks open on a `divider` instead of a `cover`; either counts as the **title slide** (see §6 exit-icon rule).
  ```html
  <div class="slide-body">
    <div class="seg-num">1</div>
    <div class="divider-eyebrow">Segment One · about 20 minutes</div>
    <h1>Section Title</h1>
    <div class="subtitle">One-line summary</div>
  </div>
  ```
- **Content** — the standard slide: kicker + title, then blocks.
  ```html
  <div class="slide-body">
    <div class="slide-kicker">Small tracked label</div>
    <h2 class="slide-title">The headline</h2>
    <p class="lead">Optional lead sentence.</p>
    <!-- blocks below -->
  </div>
  ```

---

## 4. Content blocks (drop into `.slide-body`)

- **Bullets** — `<ul class="bullets"><li>…</li></ul>`, 3–5 diamond bullets, short phrases; `<strong>` for emphasis.
- **Cards** — `<div class="grid cols-3">` (or `cols-2`) of `<div class="card">` (add `gold` for a steel top-tab). Card = `<h3><span class="ico">⚖️</span>Title</h3><p>…</p>`.
- **Steps** — `<div class="steps">` of `<div class="step"><div class="n">1</div><h4>…</h4><p>…</p></div>` — numbered process.
- **Guardrail (do / do-not)** — `<div class="guardrail">` with `<div class="guardrail-col will"><h4>Do</h4><ul>…</ul></div>` and `<div class="guardrail-col willnot"><h4>Do not</h4><ul>…</ul></div>`. Steel vs navy, not green/red. **Keep to ~3 items per column** — this block overflows the canvas easily; trim lead + bullets if it does.
- **Compare** — `<div class="compare">` with two `<div class="compare-col">` (second one `alt` for the steel accent).
- **Callout** — `<div class="callout"><span class="label">LABEL</span><p>Big statement</p></div>`; add `light` for a silver-on-pale version.
- **Reflect** — `<div class="reflect"><span>💬</span><p><strong>Lead.</strong> Italic prompt</p></div>` — navy reflection strip.
- **Prompt** — `<div class="prompt">…</div>` — dark mono block for prompt/citation text.
- **Stats** — `<div class="stat-row">` of `<div class="stat"><div class="num">Word</div><div class="lbl">…</div></div>`.
- **Pill** — `<span class="pill time">about 20 min</span>` or `pill tag`.
- **Scenario** — `<div class="scenario"><div class="scenario-label">Your task</div><p>…</p></div>` — activity card.
- **Next-step link** — points at an activity or the next deck:
  ```html
  <div class="next-step no-advance">
    <span class="ns-label">Do this next</span>
    <a href="../activities/x.html" target="_blank" rel="noopener">Open it <span class="arrow">↗</span></a>
  </div>
  ```
  Always give it `no-advance` (so the click does not flip the slide) and `target="_blank"` (so the projector stays put).

**Deck-local one-offs** (letter grids, tier cards, approach panels, image layouts) live in a small `<style>` block in that deck's `<head>`. Always reuse the palette variables so they stay on-brand.

---

## 5. Images and photos

Images are the most common deck-local addition. Author them at the fixed 1280×720 scale and place with absolute positioning so text and image never collide.

### 5.1 Optimize first — always WebP

Convert every source PNG/JPG to WebP before adding it. Targets: **≤ ~160 KB**, longest edge ~1100–1200 px, quality 82–88.

```bash
magick source.png -resize 1160x -quality 86 assets/name.webp
# crop a region first if the source has framing you don't want:
magick source.png -crop 1400x600+0+120 +repage -resize 1160x -quality 86 assets/name.webp
```

### 5.2 Placement patterns (proven on this project)

- **Corner icon** — `<img class="slide-ico" src="../assets/x-icon.png" alt="">` as the **first child** of `.slide-body`. Floats top-right (~108 px). Only on slides whose top-right is empty (it overlaps two-column content otherwise).
- **Right hero with fade** — a large image bled off the right edge, masked so it dissolves into the slide:
  ```css
  .cover-visual{position:absolute;right:0;top:0;height:100%;width:52%;object-fit:cover;z-index:0;
    -webkit-mask-image:linear-gradient(to right, transparent 0, #000 18%);
            mask-image:linear-gradient(to right, transparent 0, #000 18%);}
  ```
  Constrain the text column (`max-width`) so it stays clear of the image.
- **Divider photo** — a rounded, shadowed card floated right of divider text:
  ```css
  .divider .slide-body{max-width:560px;}
  .divider-photo{position:absolute;top:50%;right:54px;transform:translateY(-50%);width:600px;
    border-radius:14px;box-shadow:0 16px 44px rgba(0,0,0,0.38);z-index:1;}
  ```
- **Image-left / words-right (or the reverse)** — a two-column grid for variety. Use a CSS grid inside `.slide-body`; put the `<img>` in one column and the text blocks in the other.
- **Circular clip** — for portrait-ish images that suit a medallion: `border-radius:50%` on a fixed square (e.g. 450 px). Judge case-by-case — rectangular is often better for composed infographics; don't force a circle onto content that reads left-to-right.
- **Bio / "meet the facilitator" grid** — intro paragraph + `.role-chip` row + a navy `.bio-now` strip with links, photo on one side. Built to fill white space rather than leave a lonely portrait.

**Rule of thumb:** if an image leaves an empty band, either enlarge it, add a companion element (chips, links, a caption), or switch to a two-column grid. Don't ship a slide that's half whitespace.

---

## 6. Navigation chrome

Injected once by the JS, fixed to the viewport (outside the scaled canvas):

- **`#progress`** — 3 px silver bar at the very top; width tracks position.
- **`#controls`** — top-right cluster (~50 % opacity, 100 % on hover): `‹` prev · counter · `›` next · 🗒 notes · 🖥 presenter · ⛶ fullscreen · ? help.
- **`#exitDeck`** — top-**left** exit-to-hub icon (a `log-out` SVG glyph in a navy rounded square). ~62 % idle opacity (raised for non-text contrast, 1.4.11), brightens on hover and on keyboard focus. Links to `../index.html`. **Hidden on the title slide** (`idx === 0`) and in print. It appears on every other slide of every deck automatically, because it lives in the shared framework — do not add it per-deck.

All of the above are hidden by the print stylesheet.

---

## 7. Accessibility (WCAG 2.1 AA)

The framework targets WCAG 2.1 Level A/AA. The shared `deck-framework.css` / `deck-framework.js` handle most of it automatically; deck authors only need to follow the content rules at the end.

**Built into the framework (automatic):**

- **Reflow mode — resolves reflow (1.4.10), resize (1.4.4), and text-spacing (1.4.12).** A fixed 1280×720 transform-scaled canvas does not reflow, so `fit()` toggles a `.reflow` class on `.deck` when the viewport is narrow (`innerWidth < 800`) or high zoom shrinks the fit below `0.55×`. In reflow mode slides drop the transform and become a normal-flow, single-column, scrollable layout with **relative** type; the desktop/projector view is unchanged. Absolutely-positioned decorative art (`.cover-visual`, `.divider-photo`, `.desc-photo`, `.obj-photo`, `.recap-emblem`) is neutralized so it can't overlap text. **When you add a new deck-local absolute-positioned image, add its selector to the `.deck.reflow` neutralize rule** (and its heading/lead to the relative-type overrides) so it stacks cleanly on phones.
- **Visible focus (2.4.7).** `:focus-visible` outlines on every control and link; light outlines on dark surfaces; the controls toolbar and exit icon jump to full opacity on focus.
- **Slide-change announcements (4.1.3).** A visually-hidden `#slideLive` `aria-live="polite"` region announces "Slide X of Y: {title}" on each move (reads `.slide-title`/`h1`/`h2`).
- **Reduced motion (2.3.3).** `prefers-reduced-motion` disables the entrance animation **and** the notes-panel, progress-bar, and control transitions.
- **Non-text contrast (1.4.11).** Idle `#controls` and `#exitDeck` sit at ~0.62 opacity (raised from 0.5/0.35) so they stay perceptible; the exit link carries an `aria-label`.

**Author rules (your job, per slide):**

- Use **real text**, never images of text (1.4.5) — the whole design is live HTML; keep it that way.
- Give every content image accurate `alt`; decorative images get `alt=""` (1.1.1).
- Keep slide text contrast ≥ 4.5:1 on its background (1.4.3) — the navy/silver palette passes; verify any custom colors.
- Don't encode meaning in color alone (1.4.1).
- Give every slide a real heading (`<h1>` or `.slide-title`) so the live region and heading navigation work.

**Not automatic — still needs a human:** screen-reader passes (NVDA/JAWS/VoiceOver/TalkBack), and for RTL languages marking English runs with `lang="en"`. These stay open until tested; do not claim conformance without them.

---

## 8. Speaker notes and the presenter view

**Notes.** Every slide carries `<div class="notes"><p>…</p></div>`. Hidden on the slide; surfaced two ways:

- **On the current screen** — press **S** (or **N**) to slide up a notes panel.
- **On a second monitor** — press **V** (or 🖥) to open a **presenter window**: current slide, next slide, notes in large type, an elapsed **timer** (click to pause; Reset button), and a clock. Put the main window on the projector, press **F** for fullscreen. The two windows stay in sync (advancing either moves both) via `BroadcastChannel` + a `localStorage` fallback — same-origin, so it works on the hosted site.

**Writing the notes — teleprompter text, not stage directions:**
- First person, conversational, the way you'd actually say it aloud.
- ~90–130 words per slide.
- Cover what to say, what to watch for in the room, and the transition to the next slide.
- No em dashes. No meta-remarks ("say this," "I want to name that…"). No assumptions about how the audience feels.

**Keyboard:** → / Space / PgDn next · ← / PgUp prev · Home / End first / last · **S** notes · **V** presenter · **F** fullscreen · **P** print/PDF · **?** help. Clicking the **left third** of a slide goes back, the rest advances (links, buttons, and `.no-advance` are ignored). Keep the shortcut list off public-facing pages — it already lives on the in-deck **?** overlay.

---

## 9. Print / PDF export

Press **P** in any deck. The print stylesheet stacks every slide one-per-page at 1280 × 720, forces `print-color-adjust: exact` so navy and silver survive, resets the JS scaling transforms, and hides all chrome (`#controls`, `#progress`, `#notesPanel`, `#help`, `#exitDeck`, `.back-bar`). "Save as PDF" gives a clean handout.

---

## 10. Verify before you ship — headless Chrome

Never trust an edit to a fixed-canvas slide by eye alone. Render it:

```bash
# whole slide at native size; use the URL hash to pick the slide
google-chrome-stable --headless --disable-gpu --hide-scrollbars \
  --window-size=1280,720 --virtual-time-budget=4000 \
  --screenshot=/tmp/slide.png "file://$PWD/decks/0-overview.html#4"
```

Then Read the PNG. To inspect a detail (e.g. the exit icon), crop it: `magick /tmp/slide.png -crop 120x70+0+0 +repage /tmp/corner.png`.

Notes: the framework honors `#N` on load, so no script injection is needed to reach a slide. Give animations time — `--virtual-time-budget=4000` is enough for the entrance. Check both a **content slide** (element present) and the **title slide** (exit icon absent) when touching shared chrome. Also test **reflow**: render a deck at phone width (`--window-size=380,820`) and confirm the slide stacks into a readable single column (§7).

---

## 11. Build a new deck — checklist

1. Copy an existing deck's `<head>` (Google Fonts link + `<link rel="stylesheet" href="../assets/deck-framework.css">`).
2. Open `<div class="deck">`. Add one `<section class="slide …">` per slide; give the **first** one `current`.
3. Start with a `cover`, use `divider` slides between segments, `content` slides between.
4. On every slide include the `.slide-footer` (brand · facilitator · url) and a `.notes` block.
5. Keep slides to 3–5 short bullets or one main block; push full sentences into the notes.
6. Optimize any images to WebP (§5.1) and place them with absolute positioning (§5.2).
7. End the body with `<script src="../assets/deck-framework.js"></script>`.
8. Write teleprompter notes for **every** slide before calling it done.
9. Render each new/edited slide headless (§10) and eyeball it — at 1280×720 **and** at phone width to confirm reflow (§7).
10. If you added an absolutely-positioned deck-local image, register its selector in the `.deck.reflow` neutralize rule so it doesn't overlap text on phones (§7).

### On-slide writing style

Second person · Oxford comma · spell out numbers one through ten · **no em dashes** · **no ampersands** (use "and") · **no colons in titles** · avoid hype words (empower, journey, embark, delve, unlock, elevate, discover, master).

---

## 12. Resource pages and the language switcher

Reader pages (the hub, activities, handouts) use **`assets/pages.css`** instead of the deck framework, with the same palette and fonts. Cards use `.tile` (+ `.tile-ico` for a corner image); page headers carry a `.hdr-ico` badge; a `.back-bar` at top links home.

A lightweight i18n engine (`assets/i18n.js`, ported from the TCEA breakouts engine) adds a language switcher:

- Mark chrome with `data-i18n="key"` (sets `textContent`) or `data-i18n-html="key"` (sets `innerHTML`).
- Drop a `<span data-i18n-picker>` for the auto-built `<select>`.
- Register a flat dictionary per page: `BreakoutI18n.register('name', { en:{…}, es:{…}, … })`. One registered widget dict per page — `hub` for the index (via `hub-i18n.js`), `pages` for everything else (via `pages-i18n.js`).
- It persists via `?lang=` + localStorage (`tcdlai.lang`), fires a `breakout-i18n:changed` event you can re-render on, and flips to RTL for Arabic and Urdu.

**Localization policy:** translate UI/chrome across all seven languages (en, es, vi, ar, hi, ur, zh); keep substantive legal content in English. For dynamic pages, hold content in a structured data object (e.g. `window.FLUENCY[lang]`) and render from it, preserving user answers on language switch. When forcing English text inside an RTL layout, pin it with `direction:ltr;text-align:left;`.

---

## 13. Deploy workflow (this project)

Two GitHub accounts via `gh`: **mguhlin** (read-only, the default active account) and **mglearn** (has push to `mglearn/legalai`). The site auto-builds on push to `main` (GitHub Pages).

```bash
# 1. commit as normal (Miguel Guhlin is the git author)
git add <files> && git commit -m "…"

# 2. switch the active gh account to the one that can push, push, switch back
gh auth switch --user mglearn && git push origin main && gh auth switch --user mguhlin

# 3. confirm the Pages build reached "built" for your commit
gh auth switch --user mglearn >/dev/null
gh api repos/mglearn/legalai/pages/builds/latest --jq '.status + " " + .commit'
gh auth switch --user mguhlin >/dev/null
```

Always restore **mguhlin** as the active account when done. Commit and push **only when the user asks**; never commit to `main` without confirmation.

---

*End of v5. If you change the framework's public behavior (a new keyboard binding, a new chrome element, a new content block), update this file in the same change.*
