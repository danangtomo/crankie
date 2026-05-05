// Direction 2: EDITORIAL GRID
// Cream + ink + rust. Serif display + mono captions. Magazine-feature feel.
// Asymmetric grid. Pull-quotes. Footnoted services. Index-style nav.

const T2 = {};

// Custom cursor: a tiny crosshair with a hovering caption
T2.Cursor = function Cursor() {
  const [pos, setPos] = React.useState({ x: -100, y: -100 });
  const [label, setLabel] = React.useState("");
  React.useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target.closest("[data-cursor]");
      setLabel(el ? el.getAttribute("data-cursor") : "");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div className="t2-cur" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} />
      {label && (
        <div className="t2-cur-lbl" style={{ transform: `translate(${pos.x + 18}px, ${pos.y + 18}px)` }}>
          ↳ {label}
        </div>
      )}
    </>
  );
};

// HERO — magazine cover
T2.Hero = function Hero() {
  return (
    <section className="t2-hero" id="hero">
      <div className="t2-hero-top">
        <div className="t2-hero-issue">VOL. 07 · ISSUE 02 · MAY 2026</div>
        <div className="t2-hero-sec">— a portfolio of working software</div>
      </div>

      <div className="t2-hero-grid">
        <div className="t2-hero-fig" data-cursor="">
          <div className="t2-fig-frame">
            <div className="t2-fig-inner">
              <svg viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="t2grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(28,25,23,0.12)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="200" height="280" fill="#e9e1d3"/>
                <rect width="200" height="280" fill="url(#t2grid)"/>
                <circle cx="100" cy="140" r="78" fill="#bf4625"/>
                <circle cx="100" cy="140" r="78" fill="#1a1714" mask="url(#m1)"/>
                <mask id="m1">
                  <rect width="200" height="280" fill="white"/>
                  <circle cx="130" cy="120" r="78" fill="black"/>
                </mask>
                <text x="14" y="22" fontFamily="ui-monospace" fontSize="8" fill="#1a1714">FIG. 01</text>
                <text x="14" y="270" fontFamily="ui-monospace" fontSize="7" fill="#1a1714">A SINGLE UMBRELLA · MANY DISCIPLINES</text>
              </svg>
            </div>
          </div>
          <div className="t2-fig-cap">
            <span>FIG. 01</span> The crankie principle: one team, one budget, one neck to wring.
          </div>
        </div>

        <div className="t2-hero-text">
          <h1 className="t2-h1">
            We make the <em>software</em><br/>
            you couldn't <span className="t2-h1-rust">find</span><br/>
            off the shelf.
          </h1>
          <div className="t2-hero-by">By the team at <b>Crankie</b> · Tangerang</div>
          <p className="t2-deck">
            Crankie is a small studio that builds web, mobile, desktop, and the quiet
            automations between them — for founders, mid-market ops teams, and enterprises
            tired of paying three vendors to do one job.
          </p>
          <div className="t2-hero-cta">
            <a className="t2-btn" data-cursor="WRITE" href="#contact">Start a discovery sprint</a>
            <a className="t2-btn t2-btn-ghost" data-cursor="READ" href="#work">Read the case files</a>
          </div>
        </div>
      </div>

      <div className="t2-hero-foot">
        <div>↓ CONTINUE READING</div>
        <div>FILED UNDER: WEB · MOBILE · DESKTOP · AUTOMATION · AI · ERP · API · DESIGN</div>
        <div>03·MIN READ</div>
      </div>
    </section>
  );
};

// STATS — index page
T2.Stats = function Stats() {
  const stats = [
    { n: "47", l: "projects shipped", note: "since 2019" },
    { n: "9", l: "industries served", note: "ag · fintech · health · climate · …" },
    { n: "4.2×", l: "median ROI year one", note: "client-reported, FY24" },
    { n: "12", l: "humans on payroll", note: "no subcontractors" },
    { n: "99.97%", l: "uptime, all clients", note: "rolling 12-mo" },
    { n: "0", l: "missed deadlines, FY25", note: "we'd rather under-promise" },
  ];
  return (
    <section className="t2-stats">
      <div className="t2-rule"><span>§ AT A GLANCE</span></div>
      <div className="t2-stats-grid">
        {stats.map((s) => (
          <div key={s.l} className="t2-stat">
            <div className="t2-stat-n">{s.n}</div>
            <div className="t2-stat-l">{s.l}</div>
            <div className="t2-stat-note">{s.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// SERVICES — footnoted essay
const T2_SERVICES = [
  { num: "I", name: "Web", body: "Marketing sites, web apps, SaaS dashboards. We default to TypeScript + React + a Postgres. We pick boring tools because they ship.", n: "01" },
  { num: "II", name: "Mobile", body: "iOS and Android, native when it matters, cross-platform when it doesn't. Swift, Kotlin, React Native, Flutter — the tool serves the project, not the résumé.", n: "02" },
  { num: "III", name: "Desktop", body: "macOS, Windows, Linux. Native (Swift, C#) or web-shell (Tauri, Electron) depending on what you actually need.", n: "03" },
  { num: "IV", name: "Automation", body: "The boring repetitive stuff that bleeds margin. Picking, invoicing, compliance, CRM-ERP sync. We've reclaimed 412 hrs/mo for one client.", n: "04" },
  { num: "V", name: "AI / ML", body: "RAG pipelines, agent workflows, custom fine-tunes. We pair LLMs with deterministic tools — chat alone is rarely the answer.", n: "05" },
  { num: "VI", name: "API & Integrations", body: "Stitching your stack so data moves itself. REST, GraphQL, gRPC, webhooks, Kafka. We document everything; future-you will thank us.", n: "06" },
  { num: "VII", name: "UI / UX", body: "User research, wireframes, hi-fi, design systems. Everything we ship is opinionated and accessible by default.", n: "07" },
  { num: "VIII", name: "Custom ERP", body: "The dashboards SAP couldn't bend to fit. Postgres, Retool, Refine, or fully custom — and we won't lock you into any of them.", n: "08" },
];

T2.Services = function Services() {
  return (
    <section className="t2-services" id="services">
      <div className="t2-rule"><span>§ THE EIGHT DISCIPLINES</span></div>
      <div className="t2-svc-intro">
        <div className="t2-dropcap">A</div>
        <p>
          gencies tend to specialize in one thing and outsource the rest. We don't. Below: the eight
          disciplines we keep in-house, why each one matters, and the receipts to back it up. Most
          projects use two or three at once — that's the whole point.
        </p>
      </div>
      <div className="t2-svc-grid">
        {T2_SERVICES.map((s) => (
          <article key={s.num} className="t2-svc">
            <div className="t2-svc-meta">
              <span>FIG. {s.n}</span>
              <span>{s.num}</span>
            </div>
            <h3 className="t2-svc-name">{s.name}</h3>
            <p className="t2-svc-body">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

// PROCESS — timeline
T2.Process = function Process() {
  const steps = [
    { n: "I", name: "Signal", t: "30 min, free. Tell us the problem in plain language." },
    { n: "II", name: "Discovery", t: "Two weeks. Specs, wireframes, fixed-price quote." },
    { n: "III", name: "Build", t: "Six to fourteen weeks. Weekly demos. Shared Linear board." },
    { n: "IV", name: "Ship", t: "Production deploy, monitoring, handoff or hand-hold." },
    { n: "V", name: "Compound", t: "Optional retainer. We keep building or we step back." },
  ];
  return (
    <section className="t2-process" id="process">
      <div className="t2-rule"><span>§ HOW WE WORK</span></div>
      <div className="t2-proc-head">
        <h2 className="t2-h2">Five acts. No waterfall, no surprises.</h2>
      </div>
      <ol className="t2-proc-list">
        {steps.map((s) => (
          <li key={s.n} className="t2-proc-step">
            <div className="t2-proc-rom">{s.n}</div>
            <div>
              <div className="t2-proc-name">{s.name}</div>
              <div className="t2-proc-t">{s.t}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

// WORK — case-file index
const T2_WORK = [
  { id: "047", client: "Hectare.co", year: "2025", what: "Field-ops platform for 1,400 farms", scope: ["Web", "Mobile", "Automation"], result: "+38% picker throughput" },
  { id: "046", client: "Mercato Bank", year: "2025", what: "Internal compliance ERP", scope: ["ERP", "API", "AI"], result: "412 hrs/mo reclaimed" },
  { id: "044", client: "Lemma Health", year: "2024", what: "Patient intake + triage app", scope: ["Mobile", "AI/ML"], result: "9-min average intake" },
  { id: "041", client: "Forge Carbon", year: "2024", what: "Carbon-credit issuance desktop", scope: ["Desktop", "Automation"], result: "$1.4M MRR unlocked" },
];

T2.Work = function Work() {
  return (
    <section className="t2-work" id="work">
      <div className="t2-rule"><span>§ CASE FILES</span></div>
      <div className="t2-work-table">
        <div className="t2-work-head">
          <span>NO.</span><span>CLIENT</span><span>BRIEF</span><span>SCOPE</span><span>OUTCOME</span><span>YR</span>
        </div>
        {T2_WORK.map((w) => (
          <a key={w.id} className="t2-work-row" data-cursor="OPEN FILE">
            <span className="t2-work-id">{w.id}</span>
            <span className="t2-work-client">{w.client}</span>
            <span className="t2-work-what">{w.what}</span>
            <span className="t2-work-scope">{w.scope.join(" · ")}</span>
            <span className="t2-work-res">{w.result}</span>
            <span className="t2-work-yr">{w.year}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

// STACK — masthead style
T2.Stack = function Stack() {
  const groups = [
    { cat: "Frontend", items: "TypeScript · React · Svelte · Next.js · Tailwind · Three.js" },
    { cat: "Mobile", items: "Swift · Kotlin · React Native · Flutter" },
    { cat: "Backend", items: "Go · Node · Python · Rust · Postgres · Redis" },
    { cat: "Infra", items: "AWS · GCP · Fly.io · Cloudflare · Docker · Terraform" },
    { cat: "AI / ML", items: "OpenAI · Anthropic · Llama · Pinecone · LangChain" },
    { cat: "Tooling", items: "Linear · Figma · GitHub · Sentry · Datadog" },
  ];
  return (
    <section className="t2-stack" id="stack">
      <div className="t2-rule"><span>§ TOOLS OF THE TRADE</span></div>
      <div className="t2-stack-list">
        {groups.map((g) => (
          <div key={g.cat} className="t2-stack-row">
            <div className="t2-stack-cat">{g.cat}</div>
            <div className="t2-stack-items">{g.items}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// TEAM — masthead
T2.Team = function Team() {
  const team = [
    { name: "Vacant", role: "Founder, Engineering", note: "—" },
    { name: "Vacant", role: "Design Lead", note: "—" },
    { name: "Vacant", role: "Mobile Lead", note: "—" },
    { name: "Vacant", role: "Infra / SRE", note: "—" },
    { name: "Vacant", role: "AI / ML", note: "—" },
    { name: "Vacant", role: "Operator / PM", note: "—" },
    { name: "Vacant", role: "Backend", note: "—" },
    { name: "Vacant", role: "iOS", note: "—" },
    { name: "Vacant", role: "Android", note: "—" },
  ];
  return (
    <section className="t2-team" id="team">
      <div className="t2-rule"><span>§ MASTHEAD</span></div>
      <div className="t2-team-list">
        {team.map((p) => (
          <div key={p.name} className="t2-team-row" data-cursor="">
            <span className="t2-team-name">{p.name}</span>
            <span className="t2-team-dots" />
            <span className="t2-team-role">{p.role}</span>
            <span className="t2-team-note">{p.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// TESTIMONIALS — pull-quote spread
T2.Testimonials = function Testimonials() {
  const quotes = [
    { q: "Crankie shipped what our previous agency promised in 18 months — in 11 weeks.", who: "Lina Cortez", role: "COO, Hectare" },
    { q: "They told us not to build half the thing. That conversation alone saved us $400k.", who: "Dev Patel", role: "CTO, Mercato Bank" },
    { q: "We ran a bake-off against three agencies. Crankie's weekly Loom demos won it.", who: "Aoife Nolan", role: "Founder, Lemma Health" },
  ];
  return (
    <section className="t2-test" id="testimonials">
      <div className="t2-rule"><span>§ ON THE RECORD</span></div>
      <div className="t2-test-grid">
        {quotes.map((q, i) => (
          <figure key={i} className="t2-test-fig">
            <div className="t2-test-mark">"</div>
            <blockquote>{q.q}</blockquote>
            <figcaption>
              <span>{q.who}</span>
              <span>{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

// PRICING — rate card
T2.Pricing = function Pricing() {
  const plans = [
    { name: "Discovery", price: "$8,000", per: "fixed · 2 weeks", inc: ["Specs + wireframes", "Fixed-bid build quote", "Zero commitment", "Credited if you build with us"] },
    { name: "Build", price: "$35K – $220K", per: "fixed-bid", inc: ["Weekly demos", "Shared Linear board", "Production deploy", "1mo post-launch support"] },
    { name: "Retainer", price: "$9,000+", per: "/ month · capped hours", inc: ["Dedicated team", "Sprint cadence", "Priority response", "No minimum term"] },
    { name: "Equity", price: "Case-by-case", per: "early-stage", inc: ["Cash + equity blend", "Founder-aligned", "Selective", "Ask us"] },
  ];
  return (
    <section className="t2-pricing" id="pricing">
      <div className="t2-rule"><span>§ RATE CARD</span></div>
      <div className="t2-price-grid">
        {plans.map((p) => (
          <div key={p.name} className="t2-price">
            <div className="t2-price-h">{p.name}</div>
            <div className="t2-price-p">{p.price}</div>
            <div className="t2-price-per">{p.per}</div>
            <ul>{p.inc.map((i) => <li key={i}>{i}</li>)}</ul>
            <a className="t2-btn t2-btn-sm" data-cursor="START" href="#contact">Inquire →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

// FAQ
T2.FAQ = function FAQSection() {
  const [open, setOpen] = React.useState(0);
  const faq = [
    { q: "How small is too small?", a: "Discovery sprints start at $8k. Below that, we'll happily refer you to a freelancer who can help." },
    { q: "Do you sign NDAs?", a: "Yes. Mutual NDA, sent within 24 hours of your first message." },
    { q: "Where are you based?", a: "Distributed. HQ in Tangerang, Indonesia. Team spans GMT+7." },
    { q: "Do you subcontract?", a: "No. The people on your kickoff call are the people writing your code. If we don't have a skill in-house, we'll tell you and recommend someone else." },
    { q: "Who owns the IP?", a: "You do. Always. Code lives in a private GitHub org you own from day one." },
    { q: "What if it isn't working?", a: "Discovery is decoupled from build. After two weeks you have specs and a quote — and you're free to walk." },
  ];
  return (
    <section className="t2-faq" id="faq">
      <div className="t2-rule"><span>§ COMMON QUESTIONS</span></div>
      <div className="t2-faq-grid">
        <div className="t2-faq-side">
          <h2 className="t2-h2">Things people ask, with honest answers.</h2>
        </div>
        <div className="t2-faq-list">
          {faq.map((f, i) => (
            <div key={i} className={`t2-faq-row ${open === i ? "on" : ""}`}>
              <button data-cursor="" onClick={() => setOpen(open === i ? -1 : i)} className="t2-faq-q">
                <span>{String(i + 1).padStart(2, "0")} — {f.q}</span>
                <span>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="t2-faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CONTACT — letter
T2.Contact = function Contact() {
  const [msg, setMsg] = React.useState("");
  const [sent, setSent] = React.useState(false);
  return (
    <section className="t2-contact" id="contact">
      <div className="t2-rule"><span>§ CORRESPONDENCE</span></div>
      <div className="t2-cont-grid">
        <div className="t2-cont-left">
          <h2 className="t2-h1">
            Tell us the <em>problem.</em><br/>
            Not the solution.
          </h2>
          <p className="t2-cont-p">
            The best briefs are short. Describe the situation in plain language —
            what's broken, who it's hurting, what good looks like. We'll reply
            within four working hours.
          </p>
          <div className="t2-cont-meta">
            <div><span>Email</span><b>hello@crankie.dev</b></div>
            <div><span>Signal</span><b>+351 21 555 0140</b></div>
            <div><span>HQ</span><b>Jl. Sudirman No. 8, Tangerang</b></div>
          </div>
        </div>
        <div className="t2-cont-right">
          <div className="t2-cont-letter">
            <div className="t2-cont-letter-head">
              <div>From: <span>visitor@crankie.dev</span></div>
              <div>To: <span>hello@crankie.dev</span></div>
              <div>Date: <span>{new Date().toDateString()}</span></div>
            </div>
            <textarea
              data-cursor=""
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Dear Crankie,&#10;&#10;We're trying to..."
            />
            <button
              className="t2-btn t2-btn-block"
              data-cursor="SEND"
              onClick={() => { if (msg.trim()) { setSent(true); setMsg(""); } }}
            >
              {sent ? "✓ Letter sent — reply within 4 hrs" : "Send letter →"}
            </button>
          </div>
        </div>
      </div>
      <footer className="t2-foot">
        <div>© MMXXVI · CRANKIE · TANGERANG</div>
        <div>SET IN GT SECTRA & GT AMERICA MONO</div>
        <div>BUILT IN-HOUSE · NO SUBCONTRACTORS</div>
      </footer>
    </section>
  );
};

// NAV
T2.Nav = function Nav() {
  return (
    <nav className="t2-nav">
      <div className="t2-nav-l">
        <span className="t2-nav-logo">Crankie</span>
        <span className="t2-nav-tag">— a software studio</span>
      </div>
      <div className="t2-nav-r">
        <a href="#services" data-cursor="">Services</a>
        <a href="#process" data-cursor="">Process</a>
        <a href="#work" data-cursor="">Work</a>
        <a href="#pricing" data-cursor="">Rates</a>
        <a href="#contact" data-cursor="" className="t2-nav-cta">Write to us →</a>
      </div>
    </nav>
  );
};

// ROOT
T2.App = function T2App() {
  return (
    <div className="t2-root">
      <T2.Cursor />
      <T2.Nav />
      <T2.Hero />
      <T2.Stats />
      <T2.Services />
      <T2.Process />
      <T2.Work />
      <T2.Stack />
      <T2.Team />
      <T2.Testimonials />
      <T2.Pricing />
      <T2.FAQ />
      <T2.Contact />
    </div>
  );
};

window.T2 = T2;
