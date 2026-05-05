// Direction 1: BRUTALIST TERMINAL
// Black canvas, acid lime accent, monospace everywhere.
// The hero IS a working terminal. Custom cursor. Glitchy reveals. Anti-corporate.

const T1 = {};

// ---------------------- Custom Cursor ----------------------
T1.Cursor = function Cursor() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [hot, setHot] = React.useState(false);
  const [label, setLabel] = React.useState("");

  React.useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setHot(true);
        setLabel(el.getAttribute("data-cursor") || "");
      } else {
        setHot(false);
        setLabel("");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="t1-cursor"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        width: hot ? 64 : 14,
        height: hot ? 64 : 14,
      }}
    >
      {hot && <span className="t1-cursor-label">{label || "CLICK"}</span>}
    </div>
  );
};

// ---------------------- Hero Terminal ----------------------
const HERO_BOOT = [
  { t: "$ ", c: "crankie --init --client=visitor", delay: 350 },
  { t: "» ", c: "spinning up environment...", delay: 600, dim: true },
  { t: "» ", c: "loading 47 services × 9 industries", delay: 700, dim: true },
  { t: "✓ ", c: "ready. ask anything.", delay: 500, ok: true },
];

const SUGGESTIONS = [
  "build me an app",
  "automate my warehouse",
  "what's your stack",
  "case studies",
  "pricing",
  "who are you",
];

const RESPONSES = {
  "build me an app": [
    "» scoping...",
    "we ship web, iOS, android, desktop. one team, one codebase where it makes sense.",
    "typical timeline: 6-14 weeks to v1. fixed-price or t&m.",
    "next: tell us the problem, not the solution. → hello@crankie.dev",
  ],
  "automate my warehouse": [
    "» reviewing automation playbook...",
    "we've automated picking, invoicing, compliance reporting, and CRM-ERP sync.",
    "median ROI: 4.2× in year one.",
    "scroll ↓ to /process — that's how we'd run yours.",
  ],
  "what's your stack": [
    "frontend ............... typescript / react / svelte / swift / kotlin",
    "backend ................ go / node / python / rust",
    "infra .................. aws / gcp / fly / bare-metal where it pays",
    "ai ..................... openai, anthropic, local llama, custom RAG",
  ],
  "case studies": [
    "» 4 featured below.",
    "scroll to /work or run: ls work/",
    "we'll happily share NDAs ones over a call.",
  ],
  pricing: [
    "discovery sprint ........ $8k / 2 weeks / fixed",
    "build ................... $35k–$220k / fixed-bid",
    "retainer ................ $9k+ / month / capped hours",
    "equity-stake .......... case-by-case for early stage",
  ],
  "who are you": [
    "crankie. a small in-house team. no subcontractors.",
    "based in tangerang, indonesia. remote-friendly. GMT+7.",
    "you'll talk to who's building.",
  ],
};

T1.Hero = function Hero() {
  const [lines, setLines] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [booted, setBooted] = React.useState(false);
  const inputRef = React.useRef();
  const scrollRef = React.useRef();

  React.useEffect(() => {
    let i = 0;
    const tick = () => {
      if (i >= HERO_BOOT.length) {
        setBooted(true);
        return;
      }
      const item = HERO_BOOT[i];
      setLines((prev) => [...prev, item]);
      i++;
      setTimeout(tick, item.delay);
    };
    setTimeout(tick, 400);
  }, []);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const submit = (raw) => {
    const cmd = (raw || input).trim().toLowerCase();
    if (!cmd) return;
    setLines((prev) => [...prev, { t: "$ ", c: cmd, you: true }]);
    setInput("");
    const res = RESPONSES[cmd] || [
      `command not recognized: "${cmd}"`,
      "try: build me an app · automate my warehouse · pricing · case studies",
    ];
    res.forEach((r, idx) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { t: "  ", c: r, dim: idx === 0 }]);
      }, 220 * (idx + 1));
    });
  };

  return (
    <section className="t1-hero" id="hero">
      <div className="t1-hero-grid">
        {/* LEFT: massive type */}
        <div className="t1-hero-left">
          <div className="t1-eyebrow">
            <span className="t1-blink">●</span> CRANKIE / IT SOLUTIONS / EST. 2019
          </div>
          <h1 className="t1-display">
            <span className="t1-display-line">SOFTWARE</span>
            <span className="t1-display-line t1-strike">THAT WORKS</span>
            <span className="t1-display-line t1-accent">WHILE YOU<br/>SLEEP.</span>
          </h1>
          <p className="t1-lede">
            We build web, mobile, desktop, and the quiet automations that compound —
            for founders who'd rather ship than meet.
          </p>
          <div className="t1-hero-meta">
            <div><b>47°</b> projects shipped</div>
            <div><b>9</b> industries served</div>
            <div><b>04:32:17</b> avg response</div>
          </div>
        </div>

        {/* RIGHT: terminal */}
        <div className="t1-term" data-cursor="">
          <div className="t1-term-bar">
            <span className="t1-term-dot" />
            <span className="t1-term-dot" />
            <span className="t1-term-dot" />
            <span className="t1-term-title">crankie@visitor:~ — interactive</span>
          </div>
          <div className="t1-term-body" ref={scrollRef} onClick={() => inputRef.current?.focus()}>
            {lines.map((l, i) => (
              <div key={i} className={`t1-line ${l.dim ? "dim" : ""} ${l.ok ? "ok" : ""} ${l.you ? "you" : ""}`}>
                <span className="t1-line-prefix">{l.t}</span>
                <span className="t1-line-c">{l.c}</span>
              </div>
            ))}
            {booted && (
              <div className="t1-line t1-input-line">
                <span className="t1-line-prefix">$ </span>
                <input
                  ref={inputRef}
                  className="t1-input"
                  value={input}
                  autoFocus
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="type a command or pick one below"
                />
                <span className="t1-caret">▍</span>
              </div>
            )}
          </div>
          {booted && (
            <div className="t1-term-suggest">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="t1-chip"
                  data-cursor="RUN"
                  onClick={() => submit(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marquee */}
      <div className="t1-marquee" aria-hidden="true">
        <div className="t1-marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i}>
              WEB · MOBILE · DESKTOP · AUTOMATION · AI/ML · CUSTOM ERP · API · UI/UX ·{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------------- Services ----------------------
const SERVICES = [
  { code: "01", name: "Web Development", note: "marketing sites, web apps, SaaS dashboards", stack: "TS · React · Svelte · Go · Rust" },
  { code: "02", name: "Mobile Apps", note: "iOS, Android, cross-platform when it makes sense", stack: "Swift · Kotlin · React Native · Flutter" },
  { code: "03", name: "Desktop Apps", note: "macOS, Windows, Linux. Native or Electron.", stack: "Swift · C# · Tauri · Electron" },
  { code: "04", name: "Process Automation", note: "the boring repetitive stuff that bleeds margin", stack: "n8n · Zapier · custom Python · RPA" },
  { code: "05", name: "AI / ML Integrations", note: "RAG pipelines, agents, custom fine-tunes", stack: "OpenAI · Anthropic · Llama · Pinecone" },
  { code: "06", name: "API & Integrations", note: "stitching your stack so data moves itself", stack: "REST · GraphQL · gRPC · Kafka" },
  { code: "07", name: "UI/UX Design", note: "research, wireframes, hi-fi, design systems", stack: "Figma · Linear · Loom" },
  { code: "08", name: "Custom ERP / Internal Tools", note: "the dashboards SAP couldn't bend to fit", stack: "Postgres · Retool · Refine · custom" },
];

T1.Services = function Services() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="t1-services" id="services">
      <div className="t1-section-head">
        <div className="t1-section-num">/02</div>
        <h2 className="t1-section-title">SERVICES_</h2>
        <div className="t1-section-meta">8 things, done seriously.</div>
      </div>
      <div className="t1-svc-list">
        {SERVICES.map((s, i) => (
          <button
            key={s.code}
            className={`t1-svc-row ${open === i ? "open" : ""}`}
            data-cursor={open === i ? "CLOSE" : "OPEN"}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <div className="t1-svc-row-main">
              <span className="t1-svc-code">{s.code}</span>
              <span className="t1-svc-name">{s.name}</span>
              <span className="t1-svc-arrow">{open === i ? "—" : "+"}</span>
            </div>
            {open === i && (
              <div className="t1-svc-detail">
                <div className="t1-svc-note">{s.note}</div>
                <div className="t1-svc-stack">↳ {s.stack}</div>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Process ----------------------
const PROCESS = [
  { n: "00", name: "Signal", t: "you tell us the problem. not the solution. 30 min, free.", d: "30 min" },
  { n: "01", name: "Discovery Sprint", t: "two weeks. specs, wireframes, fixed-price quote.", d: "2 wk" },
  { n: "02", name: "Build", t: "weekly demos. shared linear board. no surprises.", d: "6–14 wk" },
  { n: "03", name: "Ship", t: "production deploy. monitoring. handoff or hand-hold.", d: "1 wk" },
  { n: "04", name: "Compound", t: "monthly retainer if you want us to keep building.", d: "ongoing" },
];

T1.Process = function Process() {
  return (
    <section className="t1-process" id="process">
      <div className="t1-section-head">
        <div className="t1-section-num">/03</div>
        <h2 className="t1-section-title">HOW_WE_WORK</h2>
        <div className="t1-section-meta">five steps. no waterfall.</div>
      </div>
      <div className="t1-proc-grid">
        {PROCESS.map((p) => (
          <div key={p.n} className="t1-proc-step" data-cursor="">
            <div className="t1-proc-num">{p.n}</div>
            <div className="t1-proc-name">{p.name}</div>
            <div className="t1-proc-t">{p.t}</div>
            <div className="t1-proc-d">{p.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Work ----------------------
const WORK = [
  { client: "Hectare.co", year: "2025", what: "Field-ops platform for 1,400 farms", scope: "Web · Mobile · Automation", n: "+38% picker throughput", img: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)" },
  { client: "Mercato Bank", year: "2025", what: "Internal compliance ERP", scope: "ERP · API · AI", n: "412 hrs/mo saved", img: "linear-gradient(135deg, #2a1a0a 0%, #0a0a0a 100%)" },
  { client: "Lemma Health", year: "2024", what: "Patient intake + triage app", scope: "Mobile · AI/ML", n: "9-min avg intake", img: "linear-gradient(135deg, #0a1a1a 0%, #0a0a0a 100%)" },
  { client: "Forge Carbon", year: "2024", what: "Carbon-credit issuance desktop", scope: "Desktop · Automation", n: "$1.4M MRR unlocked", img: "linear-gradient(135deg, #1a0a1a 0%, #0a0a0a 100%)" },
];

T1.Work = function Work() {
  return (
    <section className="t1-work" id="work">
      <div className="t1-section-head">
        <div className="t1-section-num">/04</div>
        <h2 className="t1-section-title">WORK_</h2>
        <div className="t1-section-meta">4 of 47. NDAs on the rest.</div>
      </div>
      <div className="t1-work-grid">
        {WORK.map((w, i) => (
          <a key={w.client} className="t1-work-card" data-cursor="VIEW" style={{ background: w.img }}>
            <div className="t1-work-meta">
              <span>{String(i + 1).padStart(2, "0")} / 04</span>
              <span>{w.year}</span>
            </div>
            <div className="t1-work-body">
              <div className="t1-work-client">{w.client}</div>
              <div className="t1-work-what">{w.what}</div>
            </div>
            <div className="t1-work-foot">
              <div className="t1-work-scope">{w.scope}</div>
              <div className="t1-work-stat">{w.n}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Stack ----------------------
const STACK = {
  Frontend: ["TypeScript", "React", "Svelte", "Next.js", "Tailwind", "Three.js"],
  Mobile: ["Swift", "Kotlin", "React Native", "Flutter"],
  Backend: ["Go", "Node", "Python", "Rust", "Postgres", "Redis"],
  Infra: ["AWS", "GCP", "Fly.io", "Cloudflare", "Docker", "Terraform"],
  "AI/ML": ["OpenAI", "Anthropic", "Llama", "Pinecone", "LangChain"],
  Tooling: ["Linear", "Figma", "GitHub", "Sentry", "Datadog"],
};

T1.Stack = function Stack() {
  return (
    <section className="t1-stack" id="stack">
      <div className="t1-section-head">
        <div className="t1-section-num">/05</div>
        <h2 className="t1-section-title">STACK_</h2>
        <div className="t1-section-meta">we pick boring tools that ship.</div>
      </div>
      <div className="t1-stack-grid">
        {Object.entries(STACK).map(([cat, items]) => (
          <div key={cat} className="t1-stack-col">
            <div className="t1-stack-cat">{cat}</div>
            <ul>
              {items.map((it) => (
                <li key={it} data-cursor="">
                  <span>{it}</span>
                  <span className="t1-stack-dot">●</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Stats ----------------------
const STATS = [
  { n: 47, suffix: "", label: "projects shipped" },
  { n: 9, suffix: "", label: "industries served" },
  { n: 99.97, suffix: "%", label: "uptime, FY24 avg" },
  { n: 12, suffix: "", label: "humans on the team" },
  { n: 4.2, suffix: "×", label: "median ROI, yr 1" },
  { n: 0, suffix: "", label: "subcontractors used" },
];

T1.Stats = function Stats() {
  return (
    <section className="t1-stats" id="stats">
      <div className="t1-stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="t1-stat">
            <div className="t1-stat-n">{s.n}{s.suffix}</div>
            <div className="t1-stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Team ----------------------
const TEAM = [
  { name: "Vacant", role: "Founder / Engineering", initials: "—", note: "—" },
  { name: "Vacant", role: "Design Lead", initials: "—", note: "—" },
  { name: "Vacant", role: "Mobile Lead", initials: "—", note: "—" },
  { name: "Vacant", role: "Infra / SRE", initials: "—", note: "—" },
  { name: "Vacant", role: "AI/ML", initials: "—", note: "—" },
  { name: "Vacant", role: "Operator / PM", initials: "—", note: "—" },
];

T1.Team = function Team() {
  return (
    <section className="t1-team" id="team">
      <div className="t1-section-head">
        <div className="t1-section-num">/06</div>
        <h2 className="t1-section-title">TEAM_</h2>
        <div className="t1-section-meta">you'll meet whoever's building.</div>
      </div>
      <div className="t1-team-grid">
        {TEAM.map((p) => (
          <div key={p.name} className="t1-team-card" data-cursor="">
            <div className="t1-team-avatar">{p.initials}</div>
            <div>
              <div className="t1-team-name">{p.name}</div>
              <div className="t1-team-role">{p.role}</div>
              <div className="t1-team-note">{p.note}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Testimonials ----------------------
const QUOTES = [
  { q: "Crankie shipped what our previous agency promised in 18 months. They did it in 11 weeks.", who: "Lina Cortez, COO at Hectare" },
  { q: "They told us not to build half the thing. That single conversation saved us $400k.", who: "Dev Patel, CTO at Mercato" },
  { q: "We ran a bake-off against three agencies. Crankie's Loom-based weekly demos won it.", who: "Aoife Nolan, Founder at Lemma" },
];

T1.Testimonials = function Testimonials() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="t1-test" id="testimonials">
      <div className="t1-section-head">
        <div className="t1-section-num">/07</div>
        <h2 className="t1-section-title">RECEIPTS_</h2>
        <div className="t1-section-meta">we don't pay for these.</div>
      </div>
      <div className="t1-test-stage">
        <div className="t1-test-mark">"</div>
        <blockquote className="t1-test-q" key={i}>
          {QUOTES[i].q}
        </blockquote>
        <div className="t1-test-who">— {QUOTES[i].who}</div>
        <div className="t1-test-dots">
          {QUOTES.map((_, idx) => (
            <button key={idx} className={idx === i ? "on" : ""} onClick={() => setI(idx)} data-cursor="" />
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------------------- Pricing ----------------------
const PRICING = [
  { name: "DISCOVERY", price: "$8k", per: "/ 2 weeks / fixed", inc: ["specs + wireframes", "fixed-bid quote", "0% commitment to build", "credited if you continue"] },
  { name: "BUILD", price: "$35k–$220k", per: "/ fixed-bid", inc: ["weekly demos", "shared Linear board", "production deploy", "1 month post-launch support"] },
  { name: "RETAINER", price: "$9k+", per: "/ month / capped hrs", inc: ["dedicated team", "sprint cadence", "priority response", "no minimum commitment"] },
  { name: "EQUITY", price: "case-by-case", per: "early stage only", inc: ["partial cash + equity", "founder-aligned", "we pick our spots", "ask us"] },
];

T1.Pricing = function Pricing() {
  return (
    <section className="t1-pricing" id="pricing">
      <div className="t1-section-head">
        <div className="t1-section-num">/08</div>
        <h2 className="t1-section-title">ENGAGEMENT_</h2>
        <div className="t1-section-meta">four ways to start.</div>
      </div>
      <div className="t1-price-grid">
        {PRICING.map((p) => (
          <div key={p.name} className="t1-price-card" data-cursor="PICK">
            <div className="t1-price-head">
              <span>{p.name}</span>
              <span className="t1-price-arrow">↗</span>
            </div>
            <div className="t1-price-amt">{p.price}</div>
            <div className="t1-price-per">{p.per}</div>
            <ul>
              {p.inc.map((i) => <li key={i}>— {i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------------------- FAQ ----------------------
const FAQS = [
  { q: "How small is too small?", a: "Discovery sprints start at $8k. If a project is below that, we'll point you to someone who can help." },
  { q: "Do you sign NDAs?", a: "Yes. Mutual NDA, sent in 24h." },
  { q: "Where are you based?", a: "Distributed. HQ in Tangerang, Indonesia. Team spans GMT+7." },
  { q: "Do you subcontract?", a: "No. The people on your kickoff call are the people writing your code." },
  { q: "Can we own the IP?", a: "Always. You own everything we build. Code is yours from day one in a private GitHub org." },
  { q: "What if we hate it?", a: "Discovery is decoupled. After 2 weeks you have specs and a quote. You can walk." },
];

T1.FAQ = function FAQSection() {
  const [open, setOpen] = React.useState(-1);
  return (
    <section className="t1-faq" id="faq">
      <div className="t1-section-head">
        <div className="t1-section-num">/09</div>
        <h2 className="t1-section-title">FAQ_</h2>
        <div className="t1-section-meta">things people actually ask.</div>
      </div>
      <div className="t1-faq-list">
        {FAQS.map((f, i) => (
          <div key={i} className={`t1-faq-row ${open === i ? "on" : ""}`}>
            <button className="t1-faq-q" data-cursor="" onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span>{open === i ? "—" : "+"}</span>
            </button>
            {open === i && <div className="t1-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

// ---------------------- Contact ----------------------
T1.Contact = function Contact() {
  const [msg, setMsg] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <section className="t1-contact" id="contact">
      <div className="t1-contact-head">
        <div className="t1-section-num">/10</div>
        <h2 className="t1-contact-title">
          TELL US<br />
          THE <span className="t1-accent">PROBLEM.</span><br />
          NOT THE SOLUTION.
        </h2>
      </div>
      <div className="t1-contact-grid">
        <div className="t1-contact-form">
          <textarea
            placeholder="// describe the problem in plain language. we'll reply within 4 hours during business days."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            data-cursor=""
          />
          <button
            className="t1-contact-btn"
            data-cursor="SEND"
            onClick={() => { if (msg.trim()) { setSent(true); setMsg(""); } }}
          >
            {sent ? "✓ MESSAGE QUEUED" : "TRANSMIT →"}
          </button>
        </div>
        <div className="t1-contact-side">
          <div className="t1-contact-row">
            <div className="t1-contact-k">EMAIL</div>
            <div className="t1-contact-v">hello@crankie.dev</div>
          </div>
          <div className="t1-contact-row">
            <div className="t1-contact-k">SIGNAL</div>
            <div className="t1-contact-v">+351 21 555 0140</div>
          </div>
          <div className="t1-contact-row">
            <div className="t1-contact-k">HQ</div>
            <div className="t1-contact-v">Jl. Sudirman No. 8, Tangerang 15119</div>
          </div>
          <div className="t1-contact-row">
            <div className="t1-contact-k">RESPONSE</div>
            <div className="t1-contact-v">~ 4 hrs (business days)</div>
          </div>
        </div>
      </div>
      <footer className="t1-foot">
        <div>© 2026 CRANKIE · TANGERANG · ESTABLISHED 2019</div>
        <div>BUILT IN-HOUSE · NO SUBCONTRACTORS · NO BS</div>
      </footer>
    </section>
  );
};

// ---------------------- Root ----------------------
T1.App = function T1App() {
  return (
    <div className="t1-root">
      <T1.Cursor />
      <nav className="t1-nav">
        <div className="t1-logo">◣ CRANKIE</div>
        <div className="t1-nav-links">
          <a href="#services" data-cursor="">services</a>
          <a href="#process" data-cursor="">process</a>
          <a href="#work" data-cursor="">work</a>
          <a href="#pricing" data-cursor="">pricing</a>
          <a href="#contact" data-cursor="" className="t1-nav-cta">start_ →</a>
        </div>
      </nav>
      <T1.Hero />
      <T1.Stats />
      <T1.Services />
      <T1.Process />
      <T1.Work />
      <T1.Stack />
      <T1.Team />
      <T1.Testimonials />
      <T1.Pricing />
      <T1.FAQ />
      <T1.Contact />
    </div>
  );
};

window.T1 = T1;
