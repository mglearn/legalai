/* Per-page pull-quote from a named lawyer or jurist on AI in legal practice.
   Each quote is real and sourced; the link goes to the original.
   Inserted at the end of <main>. Decks are excluded (they are not in MAP).
   The walkthrough page carries its own quotes and is intentionally omitted. */
(function () {
  var Q = [
    { // 0
      t: "Technology doesn’t replace the judgment of an experienced criminal defense lawyer — it sharpens it.",
      a: "Benson Varghese",
      r: "Criminal defense attorney · Varghese Summersett, Fort Worth, Texas",
      u: "https://www.digitaljournal.com/pr/news/winston-news-wire/algorithm-accused-technology-reshaping-criminal-1804507851.html",
      s: "Digital Journal"
    },
    { // 1
      t: "AI can do many things, but until it develops a heart and a soul, criminal defense lawyers will thrive.",
      a: "Christopher A. Wellborn",
      r: "Criminal defense attorney · then NACDL President, Rock Hill, South Carolina",
      u: "https://www.nacdl.org/Article/June2025-FromthePresidentAICannotDoEverythingWeDo",
      s: "NACDL, June 2025"
    },
    { // 2
      t: "An algorithm cannot create trust, understand social cues, or provide the empathy and compassion needed to help clients through their hardest times.",
      a: "Christopher A. Wellborn",
      r: "Criminal defense attorney · then NACDL President",
      u: "https://www.nacdl.org/Article/June2025-FromthePresidentAICannotDoEverythingWeDo",
      s: "NACDL, June 2025"
    },
    { // 3
      t: "We must embrace tools that can enhance our advocacy while resisting those that threaten due process, privacy, and the presumption of innocence.",
      a: "Andrew S. Birrell",
      r: "Criminal defense attorney · NACDL President",
      u: "https://www.nacdl.org/Article/JanFeb2026-FromthePresidentNavigatingtheEthicalEdg",
      s: "NACDL, 2026"
    },
    { // 4
      t: "Criminal defense practitioners must be aware of its impact from law enforcement’s use of ChatGPT in police report writing to the courts’ use of risk assessment programs in determining bail amounts and conditions of release.",
      a: "Michael P. Heiskell",
      r: "Criminal defense attorney · then NACDL President, Fort Worth, Texas",
      u: "https://www.nacdl.org/Article/June2024-FromthePresidentGenerativeAIforCriminalDe",
      s: "NACDL, June 2024"
    },
    { // 5
      t: "There is high turnover in public defense, and when you have ways to use technology to cut out hours spent doing the analytical work in a case, you are going to be able to go home and spend time with family.",
      a: "Tatum Goetz-Isaacs",
      r: "Directing Trial Attorney · Kentucky Department of Public Advocacy",
      u: "https://www.govtech.com/public-safety/some-kentucky-public-defenders-say-ai-can-help-defendants",
      s: "Government Technology"
    },
    { // 6
      t: "All we can do is have this as a limited resource that helps us to meet a constitutional obligation to the client and keep our head above water.",
      a: "Damon Preston",
      r: "Kentucky Public Advocate",
      u: "https://www.govtech.com/public-safety/some-kentucky-public-defenders-say-ai-can-help-defendants",
      s: "Government Technology"
    },
    { // 7
      t: "Most importantly, lawyers must remember that ethical responsibility cannot be delegated to software.",
      a: "Michael J. Epstein",
      r: "Trial lawyer · The Epstein Law Firm, New Jersey",
      u: "https://abovethelaw.com/2026/07/lawyers-do-not-need-an-ai-ban-they-need-an-ai-duty-of-care/",
      s: "Above the Law"
    },
    { // 8
      t: "You bear responsibility for the finished work product, and AI has not changed that fact.",
      a: "Nicole Black",
      r: "Attorney and legal technology writer",
      u: "https://abovethelaw.com/2026/02/ai-tools-are-a-starting-point-not-a-substitute-for-legal-research/",
      s: "Above the Law"
    },
    { // 9
      t: "AI cannot replicate the essential role of a lawyer who advocates in court, negotiates deals face-to-face, and counsels clients through crises where experience, human insight and empathy are indispensable.",
      a: "Annabel V. Teiling",
      r: "Attorney · New York State Bar Association",
      u: "https://nysba.org/will-ai-render-lawyers-obsolete/",
      s: "NYSBA"
    }
  ];

  // Page (filename without .html) -> quote index. Pages not listed get no quote.
  var MAP = {
    "index": 0, "": 0,
    "about": 1,
    "presentations": 9,
    "fluency-self-assessment": 2,
    "ai-fluency-levels": 5,
    "two-approaches": 6,
    "ethics-scenario-randomizer": 3,
    "legal-ai-news": 4,
    "pbl-scenario-lab": 8,
    "scenario-bank": 0,
    "claude-project-tutorial": 7,
    "tcdlai-guide": 8,
    "guardrail-checklist": 7,
    "prompt-library": 0
  };

  function build() {
    var key = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "");
    if (!(key in MAP)) return;
    var q = Q[MAP[key]];
    if (!q) return;

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

    var main = document.querySelector("main");
    if (main) { main.appendChild(fig); return; }
    var footer = document.querySelector("footer.page") || document.querySelector("footer");
    if (footer && footer.parentNode) { footer.parentNode.insertBefore(fig, footer); }
    else { document.body.appendChild(fig); }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();
