/* ============================================================
   TCDLAi Slide Framework  —  navigation, presenter notes, scaling
   No dependencies. Include once per deck, after the slides.
   ============================================================ */
(function () {
  'use strict';

  var deck = document.querySelector('.deck');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!deck || !slides.length) return;

  var SLIDE_W = 1280, SLIDE_H = 720;
  var idx = 0;

  // ── Build chrome ────────────────────────────────────────
  var progress = el('div', { id: 'progress' });
  var counter = el('span', { id: 'counter' });
  var controls = el('div', { id: 'controls' });
  controls.appendChild(btn('‹', 'Previous slide', prev));
  controls.appendChild(counter);
  controls.appendChild(btn('›', 'Next slide', next));
  controls.appendChild(btn('🗒', 'Toggle presenter notes (S)', toggleNotes));
  controls.appendChild(btn('⛶', 'Fullscreen (F)', toggleFull));
  controls.appendChild(btn('?', 'Keyboard help', toggleHelp));

  var notesPanel = el('div', { id: 'notesPanel' });
  var npHead = el('div', { class: 'np-head' });
  var npTitle = document.createElement('span'); npTitle.textContent = 'Speaker Notes';
  var npSlide = el('span', { class: 'np-slide' });
  npHead.appendChild(npTitle); npHead.appendChild(npSlide);
  var npBody = el('div', { class: 'np-body' });
  notesPanel.appendChild(npHead); notesPanel.appendChild(npBody);

  var help = el('div', { id: 'help' });
  help.innerHTML = '<div class="help-card"><h3>Keyboard shortcuts</h3>' +
    '<table>' +
    '<tr><td><kbd>→</kbd> <kbd>Space</kbd> <kbd>PgDn</kbd></td><td>Next slide</td></tr>' +
    '<tr><td><kbd>←</kbd> <kbd>PgUp</kbd></td><td>Previous slide</td></tr>' +
    '<tr><td><kbd>Home</kbd> / <kbd>End</kbd></td><td>First / last slide</td></tr>' +
    '<tr><td><kbd>S</kbd> or <kbd>N</kbd></td><td>Toggle speaker notes</td></tr>' +
    '<tr><td><kbd>F</kbd></td><td>Fullscreen</td></tr>' +
    '<tr><td><kbd>P</kbd></td><td>Print / export to PDF</td></tr>' +
    '<tr><td><kbd>?</kbd></td><td>This help</td></tr>' +
    '</table><div class="close-hint">Press any key or click to close</div></div>';

  document.body.appendChild(progress);
  document.body.appendChild(controls);
  document.body.appendChild(notesPanel);
  document.body.appendChild(help);

  // ── Scaling: fit the 1280x720 canvas into the viewport ──
  function fit() {
    var pad = 24;
    var scale = Math.min(
      (window.innerWidth - pad) / SLIDE_W,
      (window.innerHeight - pad) / SLIDE_H
    );
    scale = Math.max(0.2, scale);
    slides.forEach(function (s) {
      s.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
      s.style.left = '50%';
      s.style.top = '50%';
    });
  }
  window.addEventListener('resize', fit);

  // ── Show a slide ────────────────────────────────────────
  function show(n) {
    idx = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, i) { s.classList.toggle('current', i === idx); });
    counter.textContent = (idx + 1) + ' / ' + slides.length;
    progress.style.width = ((idx + 1) / slides.length * 100) + '%';
    updateNotes();
    if (history.replaceState) history.replaceState(null, '', '#' + (idx + 1));
  }
  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }

  function updateNotes() {
    var src = slides[idx].querySelector('.notes');
    npSlide.textContent = 'Slide ' + (idx + 1) + ' of ' + slides.length;
    npBody.innerHTML = src ? src.innerHTML : '<p class="muted">No notes for this slide.</p>';
  }

  // ── Toggles ─────────────────────────────────────────────
  function toggleNotes() { notesPanel.classList.toggle('open'); }
  function toggleHelp() { help.classList.toggle('open'); }
  function toggleFull() {
    if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function(){})(); }
    else if (document.exitFullscreen) { document.exitFullscreen(); }
  }

  // ── Keyboard ────────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if (help.classList.contains('open')) { help.classList.remove('open'); return; }
    switch (e.key) {
      case 'ArrowRight': case ' ': case 'PageDown': next(); e.preventDefault(); break;
      case 'ArrowLeft': case 'PageUp': prev(); e.preventDefault(); break;
      case 'Home': show(0); break;
      case 'End': show(slides.length - 1); break;
      case 's': case 'S': case 'n': case 'N': toggleNotes(); break;
      case 'f': case 'F': toggleFull(); break;
      case 'p': case 'P': window.print(); break;
      case '?': toggleHelp(); break;
    }
  });

  // Click zones (ignore clicks on interactive elements)
  deck.addEventListener('click', function (e) {
    if (e.target.closest('a, button, input, textarea, select, .no-advance')) return;
    if (e.clientX < window.innerWidth * 0.32) prev(); else next();
  });
  help.addEventListener('click', function () { help.classList.remove('open'); });

  // ── Helpers ─────────────────────────────────────────────
  function el(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function btn(label, title, fn) {
    var b = el('button', { title: title, 'aria-label': title });
    b.textContent = label;
    b.addEventListener('click', function (ev) { ev.stopPropagation(); fn(); });
    return b;
  }

  // ── Init ────────────────────────────────────────────────
  fit();
  var start = parseInt((location.hash || '').replace('#', ''), 10);
  show(isNaN(start) ? 0 : start - 1);

  // Expose for embedded activity buttons if needed
  window.__deck = { show: show, next: next, prev: prev };
})();

/* Copy-to-clipboard used by prompt blocks across decks and pages */
function copyText(btn, ev) {
  if (ev) ev.stopPropagation();
  var target = btn.getAttribute('data-target');
  var text = target ? (document.getElementById(target) || {}).innerText
                    : (btn.parentElement.querySelector('.prompt, .copytext') || {}).innerText;
  if (!text) return;
  navigator.clipboard.writeText(text.trim()).then(function () {
    var old = btn.textContent;
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(function () { btn.textContent = old; btn.classList.remove('copied'); }, 1600);
  });
}
