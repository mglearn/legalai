/* Real, sourced pull-quotes from named lawyers and jurists on AI in legal
   practice. Each is verbatim and links to its origin. window.SITE_QUOTES is
   exposed so the collection page (quotes.html) can list them all.
   A per-page MAP places one unique quote at the end of each page's <main>.
   Decks and the walkthrough (which carries its own quotes) are excluded. */
(function () {
  var Q = [
    { // 0
      t: "Technology doesn’t replace the judgment of an experienced criminal defense lawyer — it sharpens it.",
      a: "Benson Varghese",
      r: "Criminal defense attorney · Varghese Summersett, Fort Worth, Texas",
      u: "https://www.digitaljournal.com/pr/news/winston-news-wire/algorithm-accused-technology-reshaping-criminal-1804507851.html",
      s: "Digital Journal"
    },
    { // 1  (walkthrough top — listed on collection page)
      t: "The future belongs to a seamless and sustainable co-existence between lawyers and GenAI: the inimitable human intelligence, cognition and reasoning, combined with the speed of AI, can hammer out an unprecedented human-machine synergy for a more efficient legal system.",
      a: "Michael P. Heiskell",
      r: "Criminal defense attorney · then NACDL President, Fort Worth, Texas",
      u: "https://www.nacdl.org/Article/June2024-FromthePresidentGenerativeAIforCriminalDe",
      s: "NACDL, June 2024"
    },
    { // 2
      t: "Criminal defense practitioners must be aware of its impact from law enforcement’s use of ChatGPT in police report writing to the courts’ use of risk assessment programs in determining bail amounts and conditions of release.",
      a: "Michael P. Heiskell",
      r: "Criminal defense attorney · then NACDL President, Fort Worth, Texas",
      u: "https://www.nacdl.org/Article/June2024-FromthePresidentGenerativeAIforCriminalDe",
      s: "NACDL, June 2024"
    },
    { // 3
      t: "I must confess that when the topic of GenAI using mysterious Large Language Models (LLM) emerged, I was fearful that robots were coming to replace us.",
      a: "Michael P. Heiskell",
      r: "Criminal defense attorney · then NACDL President, Fort Worth, Texas",
      u: "https://www.nacdl.org/Article/June2024-FromthePresidentGenerativeAIforCriminalDe",
      s: "NACDL, June 2024"
    },
    { // 4
      t: "AI can do many things, but until it develops a heart and a soul, criminal defense lawyers will thrive.",
      a: "Christopher A. Wellborn",
      r: "Criminal defense attorney · then NACDL President, Rock Hill, South Carolina",
      u: "https://www.nacdl.org/Article/June2025-FromthePresidentAICannotDoEverythingWeDo",
      s: "NACDL, June 2025"
    },
    { // 5
      t: "An algorithm cannot create trust, understand social cues, or provide the empathy and compassion needed to help clients through their hardest times.",
      a: "Christopher A. Wellborn",
      r: "Criminal defense attorney · then NACDL President, Rock Hill, South Carolina",
      u: "https://www.nacdl.org/Article/June2025-FromthePresidentAICannotDoEverythingWeDo",
      s: "NACDL, June 2025"
    },
    { // 6
      t: "We must embrace tools that can enhance our advocacy while resisting those that threaten due process, privacy, and the presumption of innocence.",
      a: "Andrew S. Birrell",
      r: "Criminal defense attorney · NACDL President",
      u: "https://www.nacdl.org/Article/JanFeb2026-FromthePresidentNavigatingtheEthicalEdg",
      s: "NACDL, 2026"
    },
    { // 7
      t: "The ultimate decisions — what argument to raise, what strategic path to pursue, what risks to take — belong solely to us.",
      a: "Andrew S. Birrell",
      r: "Criminal defense attorney · NACDL President",
      u: "https://www.nacdl.org/Article/JanFeb2026-FromthePresidentNavigatingtheEthicalEdg",
      s: "NACDL, 2026"
    },
    { // 8
      t: "AI may help us work smarter, but it cannot help clients feel safer, nor can it persuade a jury with empathy or tell a story with moral truth.",
      a: "Andrew S. Birrell",
      r: "Criminal defense attorney · NACDL President",
      u: "https://www.nacdl.org/Article/JanFeb2026-FromthePresidentNavigatingtheEthicalEdg",
      s: "NACDL, 2026"
    },
    { // 9
      t: "There is high turnover in public defense, and when you have ways to use technology to cut out hours spent doing the analytical work in a case, you are going to be able to go home and spend time with family.",
      a: "Tatum Goetz-Isaacs",
      r: "Directing Trial Attorney · Kentucky Department of Public Advocacy",
      u: "https://www.govtech.com/public-safety/some-kentucky-public-defenders-say-ai-can-help-defendants",
      s: "Government Technology"
    },
    { // 10
      t: "All we can do is have this as a limited resource that helps us to meet a constitutional obligation to the client and keep our head above water.",
      a: "Damon Preston",
      r: "Kentucky Public Advocate",
      u: "https://www.govtech.com/public-safety/some-kentucky-public-defenders-say-ai-can-help-defendants",
      s: "Government Technology"
    },
    { // 11
      t: "This helps you zero in on what may actually be helpful and useful.",
      a: "Chris Tracy",
      r: "Regional Manager · Kentucky Department of Public Advocacy",
      u: "https://www.govtech.com/public-safety/some-kentucky-public-defenders-say-ai-can-help-defendants",
      s: "Government Technology"
    },
    { // 12
      t: "Most importantly, lawyers must remember that ethical responsibility cannot be delegated to software.",
      a: "Michael J. Epstein",
      r: "Trial lawyer · The Epstein Law Firm, New Jersey",
      u: "https://abovethelaw.com/2026/07/lawyers-do-not-need-an-ai-ban-they-need-an-ai-duty-of-care/",
      s: "Above the Law"
    },
    { // 13
      t: "You bear responsibility for the finished work product, and AI has not changed that fact.",
      a: "Nicole Black",
      r: "Attorney and legal technology writer",
      u: "https://abovethelaw.com/2026/02/ai-tools-are-a-starting-point-not-a-substitute-for-legal-research/",
      s: "Above the Law"
    },
    { // 14
      t: "AI cannot replicate the essential role of a lawyer who advocates in court, negotiates deals face-to-face, and counsels clients through crises where experience, human insight and empathy are indispensable.",
      a: "Annabel V. Teiling",
      r: "Attorney · New York State Bar Association",
      u: "https://nysba.org/will-ai-render-lawyers-obsolete/",
      s: "NYSBA"
    },
    { // 15  (walkthrough foot — listed on collection page)
      t: "Any use of AI requires caution and humility.",
      a: "Chief Justice John G. Roberts Jr.",
      r: "Supreme Court of the United States",
      u: "https://www.supremecourt.gov/publicinfo/year-end/2023year-endreport.pdf",
      s: "2023 Year-End Report on the Federal Judiciary"
    }
  ];
  window.SITE_QUOTES = Q;

  // Page (filename without .html) -> quote index. One unique quote per page.
  var MAP = {
    "index": 0, "": 0,
    "about": 4,
    "presentations": 14,
    "fluency-self-assessment": 3,
    "ai-fluency-levels": 5,
    "two-approaches": 9,
    "ethics-scenario-randomizer": 6,
    "legal-ai-news": 2,
    "pbl-scenario-lab": 7,
    "scenario-bank": 11,
    "claude-project-tutorial": 10,
    "tcdlai-guide": 13,
    "guardrail-checklist": 12,
    "prompt-library": 8
  };

  function block(q) {
    var fig = document.createElement("figure");
    fig.className = "sitequote";
    var bq = document.createElement("blockquote");
    bq.textContent = "“" + q.t + "”";
    var cap = document.createElement("figcaption");
    var strong = document.createElement("strong");
    strong.textContent = q.a;
    cap.appendChild(strong);
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(q.r + " · "));
    var a = document.createElement("a");
    a.href = q.u; a.target = "_blank"; a.rel = "noopener";
    a.textContent = q.s;
    span.appendChild(a);
    cap.appendChild(span);
    fig.appendChild(bq);
    fig.appendChild(cap);
    return fig;
  }
  window.SITE_QUOTE_BLOCK = block;

  function build() {
    var key = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "");
    if (!(key in MAP)) return;
    var q = Q[MAP[key]];
    if (!q) return;
    var fig = block(q);
    var main = document.querySelector("main");
    if (main) { main.appendChild(fig); return; }
    var footer = document.querySelector("footer.page") || document.querySelector("footer");
    if (footer && footer.parentNode) { footer.parentNode.insertBefore(fig, footer); }
    else { document.body.appendChild(fig); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
