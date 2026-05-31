import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "rgba(10, 10, 10, 0.92)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "'DM Sans', sans-serif",
    transition: "box-shadow 0.3s ease",
  },
  navScrolled: {
    boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    flexShrink: 0,
  },
  brandIcon: {
    width: "32px",
    height: "32px",
    background: "linear-gradient(135deg, #FF6B35, #FF9F1C)",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },
  brandText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    letterSpacing: "-0.01em",
    lineHeight: 1,
  },
  brandAccent: {
    color: "#FF6B35",
  },
  centerLinks: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "450",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    transition: "color 0.2s ease, background 0.2s ease",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
  },
  navLinkActive: {
    color: "#ffffff",
    background: "rgba(255,255,255,0.08)",
  },
  navLinkHover: {
    color: "#ffffff",
    background: "rgba(255,255,255,0.06)",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexShrink: 0,
  },
  loginLink: {
    padding: "7px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    transition: "color 0.2s ease",
    whiteSpace: "nowrap",
  },
  signupBtn: {
    padding: "7px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
    background: "#FF6B35",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s ease, transform 0.15s ease",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
  },
  logoutBtn: {
    padding: "7px 18px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(255,255,255,0.55)",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.12)",
    cursor: "pointer",
    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
    whiteSpace: "nowrap",
    letterSpacing: "0.01em",
    fontFamily: "'DM Sans', sans-serif",
  },
  menuBtn: {
    display: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "rgba(255,255,255,0.7)",
    padding: "6px",
    borderRadius: "6px",
    flexShrink: 0,
  },
  mobileMenu: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "0.75rem 1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  mobileDivider: {
    height: "1px",
    background: "rgba(255,255,255,0.06)",
    margin: "0.5rem 0",
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "450",
    color: "rgba(255,255,255,0.65)",
    textDecoration: "none",
    transition: "color 0.2s ease, background 0.2s ease",
  },
  mobileLinkActive: {
    color: "#ffffff",
    background: "rgba(255,255,255,0.07)",
  },
  mobileSignupBtn: {
    padding: "9px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
    background: "#FF6B35",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    marginTop: "0.25rem",
  },
  mobileLogoutBtn: {
    padding: "9px 12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "450",
    color: "rgba(255, 100, 80, 0.8)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    transition: "color 0.2s ease, background 0.2s ease",
    marginTop: "0.25rem",
  },
};

const NAV_ICONS = {
  home: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  about: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  search: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  profile: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

function NavLinkItem({ to, children, icon, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        ...styles.navLink,
        ...(isActive ? styles.navLinkActive : {}),
        ...(hovered && !isActive ? styles.navLinkHover : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileLinkItem({ to, children, icon, onClick }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={to}
      onClick={onClick}
      style={{
        ...styles.mobileLink,
        ...(isActive || hovered ? styles.mobileLinkActive : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      {children}
    </Link>
  );
}

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);
  const [signupHovered, setSignupHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');
      @media (max-width: 768px) {
        .navbar-center-links { display: none !important; }
        .navbar-right-group { display: none !important; }
        .navbar-menu-btn { display: flex !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleLogout = () => {
    onLogout();
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
      {/* Main bar */}
      <div style={styles.container}>
        {/* Brand */}
        <Link to="/home" style={styles.brand}>
          <div style={styles.brandIcon}>🍽️</div>
          <span style={styles.brandText}>
            AI<span style={styles.brandAccent}>Food</span>
          </span>
        </Link>

        {/* Center nav links */}
        <div className="navbar-center-links" style={styles.centerLinks}>
          <NavLinkItem to="/home" icon={NAV_ICONS.home}>Home</NavLinkItem>
          <NavLinkItem to="/about" icon={NAV_ICONS.about}>About</NavLinkItem>
          {isLoggedIn && <NavLinkItem to="/search" icon={NAV_ICONS.search}>Search Food</NavLinkItem>}
          {isLoggedIn && <NavLinkItem to="/profile" icon={NAV_ICONS.profile}>Profile</NavLinkItem>}
        </div>

        {/* Right group */}
        <div className="navbar-right-group" style={styles.rightGroup}>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                style={{
                  ...styles.loginLink,
                  color: loginHovered ? "#ffffff" : "rgba(255,255,255,0.7)",
                }}
                onMouseEnter={() => setLoginHovered(true)}
                onMouseLeave={() => setLoginHovered(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                style={{
                  ...styles.signupBtn,
                  background: signupHovered ? "#e55a28" : "#FF6B35",
                  transform: signupHovered ? "translateY(-1px)" : "none",
                }}
                onMouseEnter={() => setSignupHovered(true)}
                onMouseLeave={() => setSignupHovered(false)}
              >
                Sign up free
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                ...styles.logoutBtn,
                color: logoutHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                borderColor: logoutHovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
                background: logoutHovered ? "rgba(255,255,255,0.06)" : "transparent",
              }}
              onMouseEnter={() => setLogoutHovered(true)}
              onMouseLeave={() => setLogoutHovered(false)}
            >
              Log out
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar-menu-btn"
          style={styles.menuBtn}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <MobileLinkItem to="/home" icon={NAV_ICONS.home} onClick={() => setMenuOpen(false)}>Home</MobileLinkItem>
          <MobileLinkItem to="/about" icon={NAV_ICONS.about} onClick={() => setMenuOpen(false)}>About</MobileLinkItem>
          {isLoggedIn && <MobileLinkItem to="/search" icon={NAV_ICONS.search} onClick={() => setMenuOpen(false)}>Search Food</MobileLinkItem>}
          {isLoggedIn && <MobileLinkItem to="/profile" icon={NAV_ICONS.profile} onClick={() => setMenuOpen(false)}>Profile</MobileLinkItem>}

          <div style={styles.mobileDivider} />

          {!isLoggedIn ? (
            <>
              <Link to="/login" style={{ ...styles.mobileLink, fontWeight: "500" }} onClick={() => setMenuOpen(false)}>Log in</Link>
              <Link to="/signup" style={styles.mobileSignupBtn} onClick={() => setMenuOpen(false)}>Sign up free →</Link>
            </>
          ) : (
            <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
              Log out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;