// Direction 3: MAXIMALIST LAB
// Deep aubergine + electric coral + chartreuse. Draggable service cards. Kinetic + layered.

const T3 = {};

T3.Cursor = function Cursor() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [hot, setHot] = React.useState(false);
  React.useEffect(() => {
    const m = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHot(!!e.target.closest("[data-cursor]"));
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, []);
  return (
    <>
      <div className="t3-cur" style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${hot ? 2.2 : 1})` }} />
      <div className="t3-cur-ring" style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${hot ? 1.6 : 1})` }} />
    </>
  );
};

T3.Nav = function Nav() {
  return (
    <nav className="t3-nav">
      <div className="t3-nav-l">
        <span className="t3-logo">
          <span className="t3-logo-mark">
            <span /><span /><span /><span />
          </span>
          Crankie
        </span>
      </div>
      <div className="t3-nav-r">
        <a href="#services" data-cursor>services</a>
        <a href="#process" data-cursor>process</a>
        <a href="#work" data-cursor>work</a>
        <a href="#pricing" data-cursor>pricing</a>
        <a href="#contact" data-cursor className="t3-nav-cta">
          <span>Start a sprint</span>
          <span>↗</span>
        </a>
      </div>
    </nav>
  );
};

T3.Hero = function Hero() {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const ref = React.useRef();
  React.useEffect(() => {
    const move = (e) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="t3-hero" id="hero" ref={ref}>
      {/* Background grid */}
      <div className="t3-hero-grid-bg" />

      {/* Floating shapes */}
      <div className="t3-shape t3-shape-1" style={{ transform: `translate(${tilt.x * 30}px, ${tilt.y * 30}px) rotate(${tilt.x * 8}deg)` }} />
      <div className="t3-shape t3-shape-2" style={{ transform: `translate(${tilt.x * -20}px, ${tilt.y * -20}px)` }} />
      <div className="t3-shape t3-shape-3" style={{ transform: `translate(${tilt.x * 14}px, ${tilt.y * 14}px) rotate(${tilt.x * -10}deg)` }} />

      <div className="t3-hero-inner">
        <div className="t3-hero-tag">
          <span className="t3-pulse" />
          <span>OPERATING SINCE 2019 · TANGERANG · IN-HOUSE · NO SUBCONTRACTORS</span>
        </div>
        <h1 className="t3-h1">
          <span className="t3-h1-l">we build</span>
          <span className="t3-h1-l t3-h1-curl">
            soft<span className="t3-h1-coral">·</span>ware
          </span>
          <span className="t3-h1-l t3-h1-l-italic">that compounds.</span>
        </h1>
        <div className="t3-hero-meta">
          <p>
            Crankie is an IT studio for the things shelf software can't do —
            <em> custom web, mobile, desktop, automation, ERP, AI</em> — built by one
            in-house team that ships in weeks, not quarters.
          </p>
          <div className="t3-hero-cta">
            <a href="#contact" className="t3-btn t3-btn-coral" data-cursor>
              <span>Start a sprint</span>
              <span className="t3-btn-arrow">→</span>
            </a>
            <a href="#work" className="t3-btn t3-btn-ghost" data-cursor>
              <span>See the work</span>
            </a>
          </div>
        </div>
      </div>

      <div className="t3-hero-strip">
        <div className="t3-strip-track">
          {Array.from({ length: 3 }).map((_, k) => (
            <span key={k}>
              ✺ WEB ✺ MOBILE ✺ DESKTOP ✺ AUTOMATION ✺ AI/ML ✺ ERP ✺ API ✺ DESIGN ✺{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// SERVICES — draggable cards on a board
const T3_SERVICES = [
  { id: "web", name: "Web", color: "#ff6a4d", x: 4, y: 6, rot: -3, body: "marketing sites, web apps, SaaS dashboards. typescript + react + postgres by default." },
  { id: "mobile", name: "Mobile", color: "#d8ff5c", x: 28, y: 14, rot: 4, body: "iOS, Android. native when it matters, cross-platform when it doesn't." },
  { id: "desktop", name: "Desktop", color: "#a48bff", x: 52, y: 4, rot: -2, body: "macOS, Windows, Linux. native or web-shell — whichever serves the user." },
  { id: "automation", name: "Automation", color: "#ff6a4d", x: 76, y: 12, rot: 5, body: "the boring repetitive stuff that bleeds margin. picking, invoicing, sync." },
  { id: "ai", name: "AI / ML", color: "#76e3c4", x: 8, y: 50, rot: 2, body: "RAG pipelines, agent workflows, custom fine-tunes. paired with deterministic tools." },
  { id: "api", name: "API & Integrations", color: "#ffd166", x: 32, y: 56, rot: -4, body: "REST, GraphQL, gRPC, webhooks, kafka. we document everything." },
  { id: "uiux", name: "UI / UX", color: "#a48bff", x: 56, y: 50, rot: 3, body: "research, wireframes, hi-fi, design systems. opinionated and accessible." },
  { id: "erp", name: "Custom ERP", color: "#76e3c4", x: 78, y: 58, rot: -5, body: "the dashboards SAP couldn't bend to fit. postgres, retool, refine, or fully custom." },
];

T3.Services = function Services() {
  const [cards, setCards] = React.useState(T3_SERVICES);
  const [drag, setDrag] = React.useState(null);
  const boardRef = React.useRef();

  const onDown = (e, id) => {
    const r = boardRef.current.getBoundingClientRect();
    const c = cards.find((x) => x.id === id);
    setDrag({ id, dx: e.clientX - r.left - (c.x / 100) * r.width, dy: e.clientY - r.top - (c.y / 100) * r.height });
    setCards((cs) => [...cs.filter((c) => c.id !== id), cs.find((c) => c.id === id)]);
  };

  React.useEffect(() => {
    if (!drag) return;
    const move = (e) => {
      const r = boardRef.current.getBoundingClientRect();
      const nx = ((e.clientX - r.left - drag.dx) / r.width) * 100;
      const ny = ((e.clientY - r.top - drag.dy) / r.height) * 100;
      setCards((cs) => cs.map((c) => c.id === drag.id ? { ...c, x: Math.max(-2, Math.min(85, nx)), y: Math.max(-2, Math.min(85, ny)) } : c));
    };
    const up = () => setDrag(null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
  }, [drag]);

  return (
    <section className="t3-services" id="services">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">02 / SERVICES</div>
        <h2 className="t3-h2">
          eight things, all <em>in-house.</em>
        </h2>
        <div className="t3-sec-note">↳ drag a card. the layout is yours.</div>
      </div>
      <div className="t3-board" ref={boardRef}>
        <div className="t3-board-paper" />
        {cards.map((c) => (
          <div
            key={c.id}
            className={`t3-svc-card ${drag?.id === c.id ? "drag" : ""}`}
            style={{
              left: `${c.x}%`, top: `${c.y}%`,
              background: c.color,
              transform: `rotate(${c.rot}deg)`,
            }}
            onMouseDown={(e) => onDown(e, c.id)}
            data-cursor
          >
            <div className="t3-svc-pin" />
            <div className="t3-svc-title">{c.name}</div>
            <div className="t3-svc-body">{c.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// PROCESS — vertical kinetic
T3.Process = function Process() {
  const steps = [
    { n: "00", name: "Signal", t: "30 min, free. you tell us the problem. plain language. no templates." },
    { n: "01", name: "Discovery", t: "two weeks. specs, wireframes, fixed-price quote. you own them either way." },
    { n: "02", name: "Build", t: "six to fourteen weeks. weekly demos. shared linear board. zero surprises." },
    { n: "03", name: "Ship", t: "production deploy, monitoring, handoff or hand-hold." },
    { n: "04", name: "Compound", t: "monthly retainer if you want us to keep building. or we step back. your call." },
  ];
  return (
    <section className="t3-process" id="process">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">03 / PROCESS</div>
        <h2 className="t3-h2">
          five acts. <em>no waterfall.</em>
        </h2>
      </div>
      <div className="t3-proc">
        {steps.map((s, i) => (
          <div key={s.n} className="t3-proc-row" data-cursor>
            <div className="t3-proc-n">{s.n}</div>
            <div className="t3-proc-name">{s.name}</div>
            <div className="t3-proc-t">{s.t}</div>
            <div className="t3-proc-arrow">{i === 4 ? "✺" : "↓"}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// STATS
T3.Stats = function Stats() {
  const stats = [
    { n: "47", l: "shipped" },
    { n: "9", l: "industries" },
    { n: "4.2×", l: "median ROI yr1" },
    { n: "99.97%", l: "uptime, FY24" },
  ];
  return (
    <section className="t3-stats">
      <div className="t3-stats-grid">
        {stats.map((s) => (
          <div key={s.l} className="t3-stat">
            <div className="t3-stat-n">{s.n}</div>
            <div className="t3-stat-l">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// WORK
const T3_WORK = [
  { client: "Hectare.co", year: "2025", what: "Field-ops platform for 1,400 farms", scope: "Web · Mobile · Automation", n: "+38%", note: "picker throughput", color: "#ff6a4d" },
  { client: "Mercato Bank", year: "2025", what: "Internal compliance ERP", scope: "ERP · API · AI", n: "412", note: "hrs/mo reclaimed", color: "#d8ff5c" },
  { client: "Lemma Health", year: "2024", what: "Patient intake + triage app", scope: "Mobile · AI/ML", n: "9 min", note: "avg intake", color: "#76e3c4" },
  { client: "Forge Carbon", year: "2024", what: "Carbon-credit issuance desktop", scope: "Desktop · Automation", n: "$1.4M", note: "MRR unlocked", color: "#a48bff" },
];

T3.Work = function Work() {
  return (
    <section className="t3-work" id="work">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">04 / WORK</div>
        <h2 className="t3-h2">
          four files. <em>forty-three behind NDA.</em>
        </h2>
      </div>
      <div className="t3-work-grid">
        {T3_WORK.map((w, i) => (
          <a key={w.client} className="t3-work-card" data-cursor>
            <div className="t3-work-num" style={{ color: w.color }}>{String(i + 1).padStart(2, "0")}</div>
            <div className="t3-work-meta">{w.year} — {w.scope}</div>
            <div className="t3-work-client">{w.client}</div>
            <div className="t3-work-what">{w.what}</div>
            <div className="t3-work-stat" style={{ background: w.color }}>
              <div className="t3-work-n">{w.n}</div>
              <div className="t3-work-note">{w.note}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

// STACK
T3.Stack = function Stack() {
  const groups = [
    { cat: "Frontend", items: ["TypeScript", "React", "Svelte", "Next.js", "Tailwind", "Three.js"] },
    { cat: "Mobile", items: ["Swift", "Kotlin", "React Native", "Flutter"] },
    { cat: "Backend", items: ["Go", "Node", "Python", "Rust", "Postgres", "Redis"] },
    { cat: "Infra", items: ["AWS", "GCP", "Fly.io", "Cloudflare", "Docker", "Terraform"] },
    { cat: "AI / ML", items: ["OpenAI", "Anthropic", "Llama", "Pinecone", "LangChain"] },
    { cat: "Tools", items: ["Linear", "Figma", "GitHub", "Sentry", "Datadog"] },
  ];
  return (
    <section className="t3-stack" id="stack">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">05 / TOOLS</div>
        <h2 className="t3-h2">
          we pick boring tools <em>that ship.</em>
        </h2>
      </div>
      <div className="t3-stack-grid">
        {groups.map((g) => (
          <div key={g.cat} className="t3-stack-group">
            <div className="t3-stack-cat">{g.cat}</div>
            <div className="t3-stack-tags">
              {g.items.map((it) => (
                <span key={it} className="t3-tag" data-cursor>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// TEAM
T3.Team = function Team() {
  const team = [
    { name: "Vacant", role: "Founder", initials: "—" },
    { name: "Vacant", role: "Design Lead", initials: "—" },
    { name: "Vacant", role: "Mobile Lead", initials: "—" },
    { name: "Vacant", role: "Infra / SRE", initials: "—" },
    { name: "Vacant", role: "AI / ML", initials: "—" },
    { name: "Vacant", role: "Operator", initials: "—" },
  ];
  const colors = ["#ff6a4d", "#d8ff5c", "#a48bff", "#76e3c4", "#ffd166", "#ff9ec7"];
  return (
    <section className="t3-team" id="team">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">06 / TEAM</div>
        <h2 className="t3-h2">
          the team. <em>you'll know them by name.</em>
        </h2>
      </div>
      <div className="t3-team-grid">
        {team.map((p, i) => (
          <div key={p.name} className="t3-team-card" data-cursor>
            <div className="t3-team-av" style={{ background: colors[i] }}>{p.initials}</div>
            <div className="t3-team-name">{p.name}</div>
            <div className="t3-team-role">{p.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// TESTIMONIALS — sticky-note wall
const T3_QUOTES = [
  { q: "Crankie shipped what our previous agency promised in 18 months. They did it in 11 weeks.", who: "Lina Cortez", role: "COO, Hectare", color: "#d8ff5c", rot: -2 },
  { q: "They told us not to build half the thing. That conversation alone saved us $400k.", who: "Dev Patel", role: "CTO, Mercato Bank", color: "#ff9ec7", rot: 3 },
  { q: "We ran a bake-off against three agencies. Crankie's weekly Loom demos won it.", who: "Aoife Nolan", role: "Founder, Lemma Health", color: "#a48bff", rot: -1 },
];

T3.Testimonials = function Testimonials() {
  return (
    <section className="t3-test" id="testimonials">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">07 / RECEIPTS</div>
        <h2 className="t3-h2">
          unpaid <em>endorsements.</em>
        </h2>
      </div>
      <div className="t3-test-wall">
        {T3_QUOTES.map((q, i) => (
          <div key={i} className="t3-quote" style={{ background: q.color, transform: `rotate(${q.rot}deg)` }}>
            <div className="t3-quote-mark">"</div>
            <blockquote>{q.q}</blockquote>
            <figcaption>
              <b>{q.who}</b><br/>{q.role}
            </figcaption>
          </div>
        ))}
      </div>
    </section>
  );
};

// PRICING
T3.Pricing = function Pricing() {
  const plans = [
    { name: "Discovery", price: "$8k", per: "fixed · 2 wk", color: "#d8ff5c", inc: ["Specs + wireframes", "Fixed quote", "Zero commitment"] },
    { name: "Build", price: "$35–220k", per: "fixed-bid", color: "#ff6a4d", inc: ["Weekly demos", "Linear board", "Production deploy"], featured: true },
    { name: "Retainer", price: "$9k+", per: "/ month", color: "#a48bff", inc: ["Dedicated team", "Sprint cadence", "Priority response"] },
    { name: "Equity", price: "case · by · case", per: "early-stage", color: "#76e3c4", inc: ["Cash + equity", "Founder-aligned", "Selective"] },
  ];
  return (
    <section className="t3-pricing" id="pricing">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">08 / RATES</div>
        <h2 className="t3-h2">
          four ways <em>to start.</em>
        </h2>
      </div>
      <div className="t3-price-grid">
        {plans.map((p) => (
          <div key={p.name} className={`t3-price ${p.featured ? "featured" : ""}`} data-cursor>
            <div className="t3-price-stripe" style={{ background: p.color }} />
            <div className="t3-price-name">{p.name}</div>
            <div className="t3-price-amt">{p.price}</div>
            <div className="t3-price-per">{p.per}</div>
            <ul>{p.inc.map((i) => <li key={i}>● {i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
};

// FAQ
T3.FAQ = function FAQSection() {
  const [open, setOpen] = React.useState(0);
  const faq = [
    { q: "How small is too small?", a: "Discovery sprints start at $8k. Below that, we'll refer you to a freelancer who can help." },
    { q: "Do you sign NDAs?", a: "Yes — mutual NDA, sent within 24 hours of your first message." },
    { q: "Where are you based?", a: "Distributed. HQ in Tangerang, Indonesia. Team spans GMT+7." },
    { q: "Do you subcontract?", a: "No. The people on your kickoff are the people writing your code." },
    { q: "Who owns the IP?", a: "You do — always. Code lives in a private GitHub org you own from day one." },
  ];
  return (
    <section className="t3-faq" id="faq">
      <div className="t3-sec-head">
        <div className="t3-sec-tag">09 / FAQ</div>
        <h2 className="t3-h2">
          things people <em>actually ask.</em>
        </h2>
      </div>
      <div className="t3-faq-list">
        {faq.map((f, i) => (
          <div key={i} className={`t3-faq-row ${open === i ? "on" : ""}`}>
            <button className="t3-faq-q" data-cursor onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="t3-faq-icon">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="t3-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
};

// CONTACT
T3.Contact = function Contact() {
  const [msg, setMsg] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <section className="t3-contact" id="contact">
      <div className="t3-cta-bg" />
      <div className="t3-cta-inner">
        <div className="t3-sec-tag">10 / CORRESPONDENCE</div>
        <h2 className="t3-cta-h">
          tell us the <em>problem.</em><br/>
          <span className="t3-cta-coral">not</span> the solution.
        </h2>
        <div className="t3-cta-grid">
          <div className="t3-cta-form">
            <textarea
              data-cursor
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="// what's broken? who is it hurting? what does good look like?"
            />
            <button
              className="t3-btn t3-btn-coral t3-btn-block"
              data-cursor
              onClick={() => { if (msg.trim()) { setSent(true); setMsg(""); } }}
            >
              <span>{sent ? "✓ message queued — reply within 4hr" : "transmit"}</span>
              <span className="t3-btn-arrow">{sent ? "" : "→"}</span>
            </button>
          </div>
          <div className="t3-cta-side">
            <div><span>email</span><b>hello@crankie.dev</b></div>
            <div><span>signal</span><b>+351 21 555 0140</b></div>
            <div><span>HQ</span><b>Jl. Sudirman No. 8<br/>Tangerang 15119</b></div>
            <div><span>response</span><b>~ 4 hrs · business days</b></div>
          </div>
        </div>
        <footer className="t3-foot">
          <span>© 2026 CRANKIE LDA</span>
          <span>BUILT IN-HOUSE · NO SUBCONTRACTORS</span>
          <span>TANGERANG ↔ EVERYWHERE</span>
        </footer>
      </div>
    </section>
  );
};

T3.App = function T3App() {
  return (
    <div className="t3-root">
      <T3.Cursor />
      <T3.Nav />
      <T3.Hero />
      <T3.Stats />
      <T3.Services />
      <T3.Process />
      <T3.Work />
      <T3.Stack />
      <T3.Team />
      <T3.Testimonials />
      <T3.Pricing />
      <T3.FAQ />
      <T3.Contact />
    </div>
  );
};

window.T3 = T3;
