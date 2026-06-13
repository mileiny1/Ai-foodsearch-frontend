import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroImage from "./assets/menu.jpg";

/* ─── data ─────────────────────────────────── */
const FEATURES = [
  {
    icon: "◎",
    label: "Smart Search",
    body: "Find any meal by restaurant, address, or phone — results appear instantly as you type.",
  },
  {
    icon: "✦",
    label: "Personalised",
    body: "AI-driven recommendations shaped around your taste, location, and past choices.",
  },
  {
    icon: "◈",
    label: "Rich Listings",
    body: "Interactive food cards with filters, ratings, and live availability — far beyond basic search.",
  },
];

const STATS = [
  { value: "10k+", label: "Restaurants" },
  { value: "50k+", label: "Dishes listed" },
  { value: "4.9★", label: "Avg. rating" },
];

/* ─── styles ───────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500&display=swap');

  :root {
    --ink:   #160e04;
    --ember: #c96a1a;
    --gold:  #e89d4a;
    --sand:  #faf3e8;
    --parch: #f0e4cc;
    --mist:  #7a6245;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans:  'Outfit', system-ui, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .fs-page { font-family: var(--sans); background: var(--sand); color: var(--ink); overflow-x: hidden; }

  /* Hero */
  .fs-hero { position: relative; height: 100vh; min-height: 580px; display: flex; align-items: center; justify-content: center; }
  .fs-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
  .fs-hero-overlay { position: absolute; inset: 0; background: linear-gradient(170deg, rgba(22,14,4,.3) 0%, rgba(22,14,4,.65) 50%, rgba(22,14,4,.95) 100%); }

  /* Nav */
  .fs-nav { position: absolute; top: 0; left: 0; right: 0; z-index: 20; display: flex; align-items: center; justify-content: space-between; padding: 1.6rem 3rem; transition: background .35s, backdrop-filter .35s; }
  .fs-nav.scrolled { background: rgba(22,14,4,.85); backdrop-filter: blur(10px); }
  .fs-brand { font-family: var(--serif); font-size: 1.35rem; color: #fff; letter-spacing: .03em; text-decoration: none; }
  .fs-nav-links { display: flex; gap: .65rem; }
  .fs-btn-ghost { padding: .4rem 1.2rem; border: 1px solid rgba(255,255,255,.45); color: #fff; border-radius: 100px; font-family: var(--sans); font-size: .8rem; text-decoration: none; transition: border-color .2s, background .2s; }
  .fs-btn-ghost:hover { border-color: rgba(255,255,255,.85); background: rgba(255,255,255,.08); color: #fff; }
  .fs-btn-amber { padding: .4rem 1.2rem; background: var(--ember); color: #fff; border: 1px solid transparent; border-radius: 100px; font-family: var(--sans); font-size: .8rem; font-weight: 500; text-decoration: none; transition: background .2s; }
  .fs-btn-amber:hover { background: var(--gold); color: #fff; }

  /* Hero body */
  .fs-hero-body { position: relative; z-index: 10; padding: 0 3rem; max-width: 780px; text-align: center; display: flex; flex-direction: column; align-items: center; animation: fadeUp .9s ease both; }
  .fs-eyebrow { font-size: .68rem; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); margin-bottom: 1rem; }
  .fs-h1 { font-family: var(--serif); font-size: clamp(3rem, 6.5vw, 5.5rem); font-weight: 400; color: #fff; line-height: 1.05; margin-bottom: 1.25rem; }
  .fs-h1 em { font-style: italic; color: var(--gold); }
  .fs-lead { font-size: 1.05rem; font-weight: 300; color: rgba(255,255,255,.7); margin-bottom: 2rem; max-width: 460px; line-height: 1.75; }
  .fs-hero-cta { display: inline-flex; align-items: center; gap: .5rem; padding: .8rem 2.2rem; background: var(--ember); color: #fff; border-radius: 100px; font-size: .95rem; font-weight: 500; text-decoration: none; transition: background .2s, transform .15s; }
  .fs-hero-cta:hover { background: var(--gold); transform: translateY(-2px); color: #fff; }

  /* Stats bar */
  .fs-stats-bar { position: absolute; bottom: 0; right: 0; z-index: 10; display: flex; }
  .fs-stat { padding: 1.1rem 2rem; background: rgba(22,14,4,.78); backdrop-filter: blur(6px); text-align: center; border-left: 1px solid rgba(255,255,255,.08); }
  .fs-stat-val { font-family: var(--serif); font-size: 1.5rem; color: var(--gold); display: block; line-height: 1; margin-bottom: .25rem; }
  .fs-stat-lbl { font-size: .65rem; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.4); }

  /* Strip */
  .fs-strip { background: var(--ink); padding: .8rem 3rem; display: flex; align-items: center; justify-content: center; gap: .4rem; }
  .fs-strip-text { font-size: .68rem; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.35); }
  .fs-strip-tag { color: var(--gold); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; }

  /* About */
  .fs-about { padding: 7rem 3rem; max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: auto 1fr; gap: 5rem; align-items: start; }
  .fs-section-tag { writing-mode: vertical-rl; font-size: .65rem; letter-spacing: .22em; text-transform: uppercase; color: var(--ember); padding-top: .25rem; user-select: none; }
  .fs-about-label { font-size: .68rem; letter-spacing: .2em; text-transform: uppercase; color: var(--mist); margin-bottom: 1.5rem; }
  .fs-h2 { font-family: var(--serif); font-size: clamp(2.2rem, 4vw, 3.5rem); font-weight: 400; color: var(--ink); line-height: 1.15; margin-bottom: 2rem; }
  .fs-h2 em { font-style: italic; color: var(--ember); }
  .fs-body-p { font-size: .98rem; font-weight: 300; line-height: 1.85; color: var(--mist); margin-bottom: 1.25rem; max-width: 560px; }
  .fs-divider { width: 3rem; height: 1px; background: var(--ember); margin: 2.5rem 0; opacity: .5; }

  /* Features */
  .fs-features { background: var(--parch); padding: 5rem 3rem; }
  .fs-features-inner { max-width: 1160px; margin: 0 auto; }
  .fs-features-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
  .fs-h3 { font-family: var(--serif); font-size: 2rem; font-weight: 400; color: var(--ink); }
  .fs-features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .fs-card { background: var(--sand); border: 1px solid rgba(100,70,30,.12); border-radius: 16px; padding: 2.5rem 2rem; transition: transform .25s, box-shadow .25s; position: relative; overflow: hidden; }
  .fs-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--ember), var(--gold)); opacity: 0; transition: opacity .25s; }
  .fs-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(100,70,20,.12); }
  .fs-card:hover::before { opacity: 1; }
  .fs-card-icon { font-size: 1.5rem; color: var(--ember); margin-bottom: 1.25rem; display: block; }
  .fs-card-title { font-family: var(--serif); font-size: 1.35rem; font-weight: 600; color: var(--ink); margin-bottom: .7rem; }
  .fs-card-body { font-size: .88rem; font-weight: 300; line-height: 1.8; color: var(--mist); }

  /* CTA */
  .fs-cta { background: var(--ink); padding: 7rem 3rem; text-align: center; position: relative; overflow: hidden; }
  .fs-cta::before { content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(201,106,26,.18) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
  .fs-cta-h { font-family: var(--serif); font-size: clamp(2.2rem, 4.5vw, 3.75rem); font-weight: 400; color: #fff; margin-bottom: 1rem; position: relative; }
  .fs-cta-h em { font-style: italic; color: var(--gold); }
  .fs-cta-sub { font-size: 1rem; font-weight: 300; color: rgba(255,255,255,.5); margin-bottom: 2.5rem; position: relative; }
  .fs-cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; }
  .fs-btn-primary { padding: .85rem 2.5rem; background: var(--ember); color: #fff; border-radius: 100px; font-size: .95rem; font-weight: 500; text-decoration: none; transition: background .2s, transform .15s; display: inline-block; }
  .fs-btn-primary:hover { background: var(--gold); transform: translateY(-2px); color: #fff; }
  .fs-btn-outline { padding: .85rem 2.5rem; border: 1px solid rgba(255,255,255,.3); color: rgba(255,255,255,.75); border-radius: 100px; font-size: .95rem; font-weight: 400; text-decoration: none; transition: border-color .2s, color .2s; display: inline-block; }
  .fs-btn-outline:hover { border-color: rgba(255,255,255,.7); color: #fff; }

  /* Footer */
  .fs-footer { background: #100a03; padding: 4.5rem 3rem 2rem; }
  .fs-footer-inner { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 3rem; padding-bottom: 3rem; border-bottom: 1px solid rgba(255,255,255,.07); }
  .fs-footer-logo { font-family: var(--serif); font-size: 1.3rem; color: #fff; display: block; margin-bottom: .8rem; }
  .fs-footer-tag { font-size: .85rem; font-weight: 300; color: rgba(255,255,255,.38); line-height: 1.75; max-width: 260px; }
  .fs-footer-col-label { font-size: .65rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: .9rem; display: block; }
  .fs-footer-col p { font-size: .85rem; font-weight: 300; color: rgba(255,255,255,.5); margin-bottom: .4rem; line-height: 1.6; }
  .fs-footer-col a { color: rgba(255,255,255,.5); text-decoration: none; transition: color .2s; }
  .fs-footer-col a:hover { color: var(--gold); }
  .fs-footer-bottom { max-width: 1160px; margin: 2rem auto 0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
  .fs-footer-copy { font-size: .75rem; color: rgba(255,255,255,.22); }
  .fs-footer-links { display: flex; gap: 1.5rem; }
  .fs-footer-links a { font-size: .75rem; color: rgba(255,255,255,.28); text-decoration: none; transition: color .2s; }
  .fs-footer-links a:hover { color: var(--gold); }

  @media (max-width: 860px) {
    .fs-features-grid { grid-template-columns: 1fr; }
    .fs-about { grid-template-columns: 1fr; gap: 2rem; padding: 4rem 1.5rem; }
    .fs-section-tag { writing-mode: horizontal-tb; }
    .fs-footer-inner { grid-template-columns: 1fr; gap: 2rem; }
    .fs-nav { padding: 1.2rem 1.5rem; }
    .fs-hero-body { padding: 0 1.5rem; }
    .fs-features { padding: 3.5rem 1.5rem; }
    .fs-cta { padding: 4.5rem 1.5rem; }
    .fs-footer { padding: 3rem 1.5rem 1.5rem; }
    .fs-stats-bar { display: none; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ─── component ─────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div className="fs-page">

        {/* HERO */}
        <section className="fs-hero">
          <img src={heroImage} alt="Curated dishes" className="fs-hero-bg" />
          <div className="fs-hero-overlay" />

          <nav className={`fs-nav${scrolled ? " scrolled" : ""}`}>
            <span className="fs-brand">🍽 FoodSearch</span>
            <div className="fs-nav-links">
              <Link to="/signup" className="fs-btn-ghost">Sign Up</Link>
              <Link to="/login"  className="fs-btn-amber">Sign In</Link>
            </div>
          </nav>

          <div className="fs-hero-body">
            <p className="fs-eyebrow">Discover · Explore · Taste</p>
            <h1 className="fs-h1">
              Find your next<br /><em>favourite meal</em>
            </h1>
            <p className="fs-lead">
              Search restaurants, dishes, and neighbourhoods — personalised results in seconds.
            </p>
            <Link to="/login" className="fs-hero-cta">Start Exploring →</Link>
          </div>

          <div className="fs-stats-bar">
            {STATS.map((s) => (
              <div key={s.label} className="fs-stat">
                <span className="fs-stat-val">{s.value}</span>
                <span className="fs-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STRIP */}
        <div className="fs-strip">
          <span className="fs-strip-text">Built with</span>
          {["Django", "PostgreSQL", "React"].map((t, i, arr) => (
            <span key={t}>
              <span className="fs-strip-tag">{t}</span>
              {i < arr.length - 1 && <span className="fs-strip-text"> · </span>}
            </span>
          ))}
        </div>

        {/* ABOUT */}
        <section className="fs-about">
          <span className="fs-section-tag">About</span>
          <div>
            <p className="fs-about-label">What we built</p>
            <h2 className="fs-h2">A smarter way to<br /><em>search for food</em></h2>
            <p className="fs-body-p">
            
            </p>
            <p className="fs-body-p">
            
            </p>
            <div className="fs-divider" />
            <Link to="/signup" className="fs-btn-primary">Create an account →</Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="fs-features">
          <div className="fs-features-inner">
            <div className="fs-features-header">
              <h2 className="fs-h3">What makes us different</h2>
              <span style={{ fontSize: ".75rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--mist)" }}>
                Three pillars
              </span>
            </div>
            <div className="fs-features-grid">
              {FEATURES.map((f) => (
                <div key={f.label} className="fs-card">
                  <span className="fs-card-icon">{f.icon}</span>
                  <p className="fs-card-title">{f.label}</p>
                  <p className="fs-card-body">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="fs-cta">
          <h2 className="fs-cta-h">Ready to <em>explore?</em></h2>
          <p className="fs-cta-sub">Join thousands discovering great meals near them every day.</p>
          <div className="fs-cta-actions">
            <Link to="/signup" className="fs-btn-primary">Create a free account</Link>
            <Link to="/login"  className="fs-btn-outline">Sign in</Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="fs-footer">
          <div className="fs-footer-inner">
            <div>
              <span className="fs-footer-logo">🍽 FoodSearch</span>
              <p className="fs-footer-tag">
                Discover the best meals near you with curated, personalised recommendations.
              </p>
            </div>
            <div className="fs-footer-col">
              <span className="fs-footer-col-label">Navigate</span>
              <p><Link to="/">Home</Link></p>
              <p><Link to="/signup">Sign Up</Link></p>
              <p><Link to="/login">Sign In</Link></p>
            </div>
            <div className="fs-footer-col">
              <span className="fs-footer-col-label">Contact</span>
              <p>support@foodsearch.com</p>
              <p>(347) 123-4567</p>
            </div>
          </div>
          <div className="fs-footer-bottom">
            <p className="fs-footer-copy">© {new Date().getFullYear()} Mileiny Nolasco. All rights reserved.</p>
            <div className="fs-footer-links">
              
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
