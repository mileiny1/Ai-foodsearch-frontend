

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const G   = "#C9A96E";
const CR  = "#F5EFE3";
const CH  = "#16120D";
const DK  = "#1E1910";
const MD  = "#2C2418";
const MT  = "#7A6B5A";

const HERO_IMG    = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80";
const STRIP_IMGS  = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
];

const STATS = [
  { num: "10K+", label: "Restaurants" },
  { num: "50K+", label: "Happy Diners" },
  { num: "200+", label: "Cuisines" },
  { num: "4.9★", label: "Avg. Rating" },
];

const VALUES = [
  { icon: "◈", title: "Discovery",    text: "Finding incredible food should be as delightful as eating it. Our AI surfaces hidden gems tailored to your palate." },
  { icon: "◉", title: "Authenticity", text: "Real restaurants, genuine reviews, honest data. We believe radical transparency builds lasting trust." },
  { icon: "◎", title: "Community",    text: "Food is best shared. We connect food lovers to create meaningful culinary memories together." },
];

const NAV_LINKS  = [
  { label: "Home", to: "/" },
  { label: "Search Food", to: "/search" },
  { label: "Profile", to: "/profile" },
];
const SOCIAL     = []; // intentionally left blank for now, but could easily add links to socials here];
const LEGAL      = ["Privacy Policy", "Terms of Service"];

export default function About() {
  const [imgHovered, setImgHovered] = useState(null);

  return (
    <>
      {/* ── FONTS & KEYFRAMES ───────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lineGrow {
          from { width: 0; opacity: 0; }
          to   { width: 56px; opacity: 1; }
        }
        @keyframes scrollPulse {
          0%,100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(8px); opacity: 1; }
        }

        .fu-1 { animation: fadeUp .85s ease both .15s; }
        .fu-2 { animation: fadeUp .85s ease both .38s; }
        .fu-3 { animation: fadeUp .85s ease both .60s; }
        .fu-4 { animation: fadeUp .85s ease both .82s; }

        .line-grow { display: inline-block; height: 1px; background: ${G}; vertical-align: middle; margin-right: 14px; animation: lineGrow .7s ease both .5s; }

        .hero-cta {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
          color: ${G}; border: 1px solid rgba(201,169,110,.55);
          padding: 14px 38px; cursor: pointer; background: transparent;
          transition: background .3s, color .3s, border-color .3s;
        }
        .hero-cta:hover { background: ${G}; color: ${CH}; border-color: ${G}; }

        .val-card {
          padding: 44px 36px;
          border: 1px solid rgba(201,169,110,.15);
          background: ${DK};
          transition: border-color .35s, transform .35s;
          cursor: default;
        }
        .val-card:hover { border-color: ${G}; transform: translateY(-6px); }

        .footer-a {
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          color: ${MT}; text-decoration: none;
          transition: color .2s;
        }
        .footer-a:hover { color: ${G}; }

        .strip-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .65s ease;
        }

        .scroll-arrow {
          width: 20px; height: 20px; border-right: 1px solid ${G}; border-bottom: 1px solid ${G};
          transform: rotate(45deg); margin: 0 auto;
          animation: scrollPulse 2s ease infinite;
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", background: CH, overflow: "hidden" }}>
        <img src={HERO_IMG} alt="" aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .55 }} />

        {/* gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${CH}EE 0%, ${CH}88 55%, ${CH}BB 100%)` }} />

        {/* right-side vertical text */}
        <p style={{
          position: "absolute", right: 48, top: "50%", transform: "rotate(90deg) translateX(-50%)",
          fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase",
          color: "rgba(245,239,227,.3)", userSelect: "none",
        }}>AI FoodSearch — New York</p>

        {/* content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1240, margin: "0 auto", padding: "140px 64px 100px" }}>
          <p className="fu-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: G, marginBottom: 36 }}>
            <span className="line-grow" style={{ width: 56 }} />Our Story
          </p>

          <h1 className="fu-2" style={{
            fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
            fontSize: "clamp(52px, 8.5vw, 116px)", lineHeight: 1.02,
            color: CR, letterSpacing: "-.015em", marginBottom: 36,
          }}>
            Where Food<br />Meets{" "}
            <em style={{ color: G, fontStyle: "italic" }}>Discovery</em>
          </h1>

          <p className="fu-3" style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 300,
            color: "rgba(245,239,227,.7)", maxWidth: 440, lineHeight: 1.85, marginBottom: 52,
          }}>
            
          </p>

          <div className="fu-4">
            
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: ".25em", color: MT, textTransform: "uppercase", marginBottom: 14 }}>Scroll</p>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section style={{ background: DK, padding: "120px 64px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.45fr", gap: 88, alignItems: "start" }}>

          {/* left */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: G, marginBottom: 28 }}>About Us</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.15, color: CR, marginBottom: 48 }}>
              Passionate<br />about food.<br /><em style={{ color: G, fontStyle: "italic" }}>Obsessed</em><br />with quality.
            </h2>
            <div style={{ width: 52, height: 1, background: G, marginBottom: 52 }} />

            {/* stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px 48px" }}>
              {STATS.map(({ num, label }) => (
                <div key={num}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 46, fontWeight: 300, color: G, lineHeight: 1 }}>{num}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: MT, marginTop: 6, letterSpacing: ".07em", textTransform: "uppercase" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right */}
          <div style={{ paddingTop: 16, display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { text: "Welcome to AI FoodSearch — a platform born from a simple belief: finding incredible food should be as delightful as eating it.", accent: true },
              { text: "Our team is dedicated to building an innovative experience that goes beyond traditional food search. We understand that everyone has unique tastes, dietary needs, and dining preferences.", accent: false },
              { text: "Whether you're seeking hidden gems around the corner, specific dishes, or dietary-conscious options, our AI-powered platform helps you find exactly what you're craving — instantly.", accent: false },
              { text: "Thank you for choosing us. We look forward to helping you discover extraordinary meals tailored to your unique palate.", accent: false },
            ].map(({ text, accent }, i) => (
              <p key={i} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 300,
                color: accent ? "rgba(245,239,227,.88)" : MT, lineHeight: 1.85,
                borderLeft: accent ? `2px solid ${G}` : "none",
                paddingLeft: accent ? 24 : 0,
              }}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE STRIP ──────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", height: 400 }}>
        {STRIP_IMGS.map((src, i) => (
          <div key={i} style={{ overflow: "hidden", position: "relative" }}
            onMouseEnter={() => setImgHovered(i)}
            onMouseLeave={() => setImgHovered(null)}>
            <img src={src} alt="" className="strip-img"
              style={{ transform: imgHovered === i ? "scale(1.06)" : "scale(1)" }} />
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to top, ${CH}BB, transparent)`,
              opacity: imgHovered === i ? 1 : 0,
              transition: "opacity .4s",
            }} />
          </div>
        ))}
      </div>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section style={{ background: CH, padding: "120px 64px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: G, marginBottom: 20 }}>What Drives Us</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(32px, 4vw, 52px)", color: CR }}>
              Our Core <em style={{ color: G, fontStyle: "italic" }}>Values</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {VALUES.map(({ icon, title, text }) => (
              <div key={title} className="val-card">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, color: G, marginBottom: 28 }}>{icon}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: CR, marginBottom: 18 }}>{title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300, color: MT, lineHeight: 1.82 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: "#0D0A07", padding: "88px 64px 44px" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>

          {/* top grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 64, marginBottom: 88 }}>

            {/* brand */}
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: CR, marginBottom: 20 }}>
                🍽&nbsp;<span style={{ color: G }}>AI</span> FoodSearch
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: MT, lineHeight: 1.82, maxWidth: 280, marginBottom: 36 }}>
                Discover the best meals near you with intelligent recommendations built around your taste.
              </p>
              <div style={{ display: "flex", gap: 24 }}>
                {SOCIAL.map(s => (
                  <a key={s} href="#" className="footer-a" style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase" }}>{s}</a>
                ))}
              </div>
            </div>

            {/* nav */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: G, marginBottom: 28 }}>Navigation</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {NAV_LINKS.map(({ label, to }) => <Link key={label} to={to} className="footer-a">{label}</Link>)}
              </div>
            </div>

            {/* contact */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: G, marginBottom: 28 }}>Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "📧  support@foodsearch.com",
                  "📞  (347) 123-4567",
                  "📍  New York, NY",
                ].map(t => (
                  <p key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 300, color: MT }}>{t}</p>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div style={{ borderTop: "1px solid rgba(201,169,110,.14)", paddingTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: MT }}>
              &copy; {new Date().getFullYear()} Mileiny Nolasco. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 32 }}>
              {LEGAL.map(t => <a key={t} href="#" className="footer-a" style={{ fontSize: 12 }}>{t}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}



