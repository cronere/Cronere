'use client'
import { useState } from 'react'

const CALENDLY = 'https://calendly.com/jacobmerkley'
const LINKEDIN = 'https://www.linkedin.com/in/jacobmerkley/'

const LogoMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5B9BFF" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#logoGrad)" />
    <path d="M138 154 L90 256 L138 358" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    <path d="M374 154 L422 256 L374 358" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    <path d="M168 256 L210 256 L234 192 L278 320 L302 256 L344 256" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return (
    <>
      <style>{`
        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem; height: 68px;
          background: rgba(11,15,26,0.88);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-wordmark { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; color: var(--text); }
        .nav-wordmark span { color: var(--blue); }
        .nav-links { display: flex; align-items: center; gap: 2rem; }
        .nav-links a { font-size: 15px; color: var(--text-mid); transition: color 0.15s; }
        .nav-links a:hover { color: var(--text); }
        .nav-cta {
          background: var(--gold) !important;
          color: #0b0f1a !important;
          font-weight: 600 !important;
          padding: 9px 20px;
          border-radius: 7px;
          font-size: 14px !important;
          transition: opacity 0.15s !important;
        }
        .nav-cta:hover { opacity: 0.85 !important; }

        /* ── LAYOUT ── */
        .section { padding: 6rem 2rem; }
        .section-alt { background: var(--bg-2); }
        .section-white {
          background: #ffffff;
        }
        .section-white .eyebrow { color: #b87d0e; }
        .section-white .section-title { color: #0b0f1a; }
        .section-white .section-sub { color: #374151; font-size: 18px; }
        .section-white .workflow-cat { color: #6b7280; font-size: 11px; }
        .section-white .workflow-card {
          background: #f8fafc;
          border-color: #e2e8f0;
        }
        .section-white .workflow-card:hover { border-color: #cbd5e1; }
        .section-white .workflow-card h4 { color: #0b0f1a; }
        .section-white .workflow-card p { color: #374151; }
        .section-white .workflow-save { color: #2563EB; }
        .section-white .about-text h2 { color: #0b0f1a; }
        .section-white .about-text p { color: #374151; }
        .section-white .about-link { color: #b87d0e; }
        .section-white .cred {
          background: #ffffff;
          border: 1.5px solid #d1d5db;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .section-white .cred:hover { border-color: #9ca3af; box-shadow: 0 2px 8px rgba(0,0,0,0.09); }
        .section-white .cred-icon { filter: grayscale(0.3); }
        .section-white .cred-title { color: #111827; font-size: 15px; }
        .section-white .cred-desc { color: #4b5563; font-size: 14px; }
        .container { max-width: 980px; margin: 0 auto; }
        .eyebrow {
          display: block;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        .section-title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }
        .section-sub {
          font-size: 17px;
          color: var(--text-mid);
          max-width: 540px;
          line-height: 1.7;
        }
        .section-header { margin-bottom: 3rem; }

        /* ── HERO ── */
        .hero {
          padding-top: 9rem; padding-bottom: 6rem;
          padding-left: 2rem; padding-right: 2rem;
          position: relative; overflow: hidden;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }
        .hero-glow {
          position: absolute; width: 700px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(245,166,35,0.07) 0%, transparent 70%);
          top: -80px; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }
        .hero-inner { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; text-align: center; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--gold-dim);
          border: 1px solid var(--gold-bdr);
          border-radius: 100px;
          padding: 6px 16px 6px 12px;
          margin-bottom: 2rem;
        }
        .hero-badge-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold); }
        .hero-badge span { font-size: 13px; color: var(--gold); font-weight: 500; }
        .hero-h1 {
          font-size: clamp(38px, 6vw, 66px);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
        }
        .hero-h1 em { font-style: normal; color: var(--gold); }
        .hero-sub {
          font-size: 19px;
          color: var(--text-mid);
          max-width: 560px;
          line-height: 1.7;
          margin: 0 auto 2.5rem;
        }
        .hero-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 3.5rem; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--gold); color: #0b0f1a;
          font-weight: 700; font-size: 15px;
          padding: 14px 26px; border-radius: 8px;
          transition: opacity 0.15s, transform 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--text-mid); font-size: 15px;
          transition: color 0.15s;
        }
        .btn-ghost:hover { color: var(--text); }
        .hero-stats {
          display: flex; gap: 3rem; flex-wrap: wrap; justify-content: center;
          padding-top: 2.5rem;
          border-top: 1px solid var(--border);
        }
        .stat-num { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; color: var(--text); line-height: 1; margin-bottom: 0.35rem; }
        .stat-num span { color: var(--gold); }
        .stat-label { font-size: 14px; color: var(--text-mid); }

        /* ── HOW IT WORKS ── */
        .how-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1px; background: var(--border);
          border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
        }
        .how-step { background: var(--bg-card); padding: 2rem 1.75rem; }
        .how-step-num { font-family: var(--mono); font-size: 11px; color: var(--gold); margin-bottom: 0.75rem; letter-spacing: 0.08em; }
        .how-step h3 { font-size: 17px; font-weight: 600; margin-bottom: 0.6rem; }
        .how-step p { font-size: 14px; color: var(--text-mid); line-height: 1.65; }

        /* ── WORKFLOWS ── */
        .workflow-cat {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--text-dim); margin: 2.5rem 0 1rem;
        }
        .workflow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1rem; }
        .workflow-card {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 10px; padding: 1.5rem;
          transition: border-color 0.2s;
        }
        .workflow-card:hover { border-color: var(--border-h); }
        .workflow-card h4 { font-size: 16px; font-weight: 600; margin-bottom: 0.5rem; }
        .workflow-card p { font-size: 15px; color: var(--text-mid); line-height: 1.6; }
        .workflow-save { font-family: var(--mono); font-size: 13px; color: var(--green); margin-top: 0.75rem; }

        /* ── PRICING TABLES ── */
        .pricing-tables { display: flex; flex-direction: column; gap: 0; }
        .price-table-wrap {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 10px; overflow: hidden;
        }
        .price-table-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
          flex-wrap: wrap; gap: 0.5rem;
        }
        .price-table-eye {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 4px;
        }
        .price-table-title { font-size: 17px; font-weight: 600; color: var(--text); }
        .price-table-note { font-size: 14px; color: var(--text-mid); font-family: var(--mono); }
        .price-table { width: 100%; border-collapse: collapse; }
        .price-table th {
          text-align: left; padding: 10px 16px;
          font-size: 12px; color: var(--text-mid); font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: var(--bg-2); border-bottom: 1px solid var(--border);
        }
        .price-table td { padding: 14px 16px; border-bottom: 1px solid var(--border); font-size: 16px; }
        .price-table tr:last-child td { border-bottom: none; }
        .price-table tr.row-highlight { background: var(--gold-dim); }
        .td-main { color: var(--text); font-weight: 500; }
        .td-price { color: var(--text); font-weight: 700; font-size: 17px; }
        .td-mid { color: var(--text-mid); font-size: 16px; }
        .td-save { color: var(--green); font-size: 14px; font-family: var(--mono); }
        .pricing-note {
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 10px; padding: 1.5rem 1.75rem;
          font-size: 15px; color: var(--text-mid); line-height: 1.7;
        }
        .pricing-note strong { color: var(--text); }

        /* ── ABOUT ── */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .about-text h2 { font-size: clamp(26px, 3.5vw, 36px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 1.25rem; }
        .about-text p { font-size: 15px; color: var(--text-mid); line-height: 1.75; margin-bottom: 1rem; }
        .about-text p:last-child { margin-bottom: 0; }
        .about-link { display: inline-flex; align-items: center; gap: 7px; color: var(--gold); font-size: 14px; font-weight: 500; transition: opacity 0.15s; }
        .about-link:hover { opacity: 0.8; }
        .creds { display: flex; flex-direction: column; gap: 0.85rem; }
        .cred {
          display: flex; align-items: flex-start; gap: 14px;
          background: var(--bg-card); border: 1px solid var(--border);
          border-radius: 9px; padding: 1.1rem 1.25rem;
        }
        .cred-icon {
          font-size: 18px; flex-shrink: 0; margin-top: 1px;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: #f1f5f9;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        .cred-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
        .cred-desc { font-size: 13px; color: var(--text-mid); line-height: 1.55; }

        /* ── WHY CRONERE ── */
        .why-cronere {
          background: var(--bg);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .why-inner {
          display: flex; gap: 4rem; align-items: center;
        }
        .why-text { flex: 1; }
        .why-text h2 { font-size: clamp(24px, 3vw, 34px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 1rem; }
        .why-text p { font-size: 15px; color: var(--text-mid); line-height: 1.75; margin-bottom: 1rem; }
        .why-text p:last-child { margin-bottom: 0; }
        .why-text em { font-style: normal; color: var(--gold); }
        .why-code {
          flex-shrink: 0;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.75rem 2rem;
          min-width: 260px;
        }
        .why-code-label {
          font-family: var(--mono);
          font-size: 9px; letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 1rem;
          display: block;
        }
        .why-code pre {
          font-family: var(--mono);
          font-size: 13px;
          color: var(--text-mid);
          line-height: 1.8;
          white-space: pre;
        }
        .why-code pre .kw { color: var(--blue); }
        .why-code pre .val { color: var(--gold); }
        .why-code pre .cm { color: var(--text-dim); }
        @media (max-width: 720px) {
          .why-inner { flex-direction: column; gap: 2rem; }
          .why-code { min-width: unset; width: 100%; }
        }

        /* ── FAQ ── */
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .faq-item { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 1.75rem; }
        .faq-item h4 { font-size: 15px; font-weight: 600; margin-bottom: 0.75rem; line-height: 1.4; }
        .faq-item p { font-size: 14px; color: var(--text-mid); line-height: 1.7; }

        /* ── CONTACT ── */
        .contact-inner { text-align: center; max-width: 560px; margin: 0 auto; }
        .contact-inner h2 { font-size: clamp(28px, 4vw, 44px); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 1rem; }
        .contact-inner h2 em { font-style: normal; color: var(--gold); }
        .contact-inner p { font-size: 17px; color: var(--text-mid); margin-bottom: 2.5rem; line-height: 1.7; }
        .contact-actions { display: flex; flex-direction: column; align-items: center; gap: 1.25rem; }
        .btn-large {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #0b0f1a;
          font-weight: 700; font-size: 16px;
          padding: 16px 34px; border-radius: 9px;
          transition: opacity 0.15s, transform 0.15s;
        }
        .btn-large:hover { opacity: 0.88; transform: translateY(-1px); }
        .contact-li { display: inline-flex; align-items: center; gap: 8px; color: var(--text-mid); font-size: 15px; transition: color 0.15s; }
        .contact-li:hover { color: var(--text); }

        /* ── DEMO BANNER ── */
        .demo-banner {
          margin-top: 3rem;
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.75rem 2rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 1.5rem;
          flex-wrap: wrap;
        }
        .demo-banner-text h3 { font-size: 17px; font-weight: 700; margin-bottom: 0.3rem; }
        .demo-banner-text p { font-size: 14px; color: var(--text-mid); }
        .btn-demo {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          background: transparent; color: var(--gold);
          border: 1.5px solid var(--gold-bdr);
          font-weight: 600; font-size: 14px;
          padding: 11px 22px; border-radius: 8px;
          transition: background 0.15s; white-space: nowrap;
        }
        .btn-demo:hover { background: var(--gold-dim); }

        /* ── PRICING CTA ── */
        .pricing-cta {
          margin-top: 2rem;
          background: var(--gold-dim);
          border: 1px solid var(--gold-bdr);
          border-radius: 10px;
          padding: 1.75rem 2rem;
        }
        .pricing-cta-inner {
          display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
        }
        .pricing-cta-text h3 { font-size: 18px; font-weight: 700; margin-bottom: 0.3rem; }
        .pricing-cta-text p { font-size: 14px; color: var(--text-mid); }
        .btn-cta-mid {
          display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          background: var(--gold); color: #0b0f1a;
          font-weight: 700; font-size: 14px;
          padding: 12px 22px; border-radius: 8px;
          transition: opacity 0.15s, transform 0.15s; white-space: nowrap;
        }
        .btn-cta-mid:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── FOOTER ── */
        .footer {
          border-top: 1px solid var(--border);
          padding: 1.75rem 2rem;
          background: var(--bg);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-logo { display: flex; align-items: center; gap: 9px; }
        .footer-wordmark { font-size: 17px; font-weight: 700; color: var(--text-mid); }
        .footer-wordmark span { color: var(--blue); }
        .footer-right { font-size: 13px; color: var(--text-dim); }

        /* ── RESPONSIVE ── */
        @media (max-width: 720px) {
          .nav-links { display: none; }
          .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .faq-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 2rem; }
          .section { padding: 4rem 1.25rem; }
          .hero { padding-top: 7.5rem; padding-left: 1.25rem; padding-right: 1.25rem; }
          .nav { padding: 0 1.25rem; }
          .hamburger { display: flex; }
          .pricing-cta-inner { flex-direction: column; text-align: center; }
          .price-table th:nth-child(3), .price-table td:nth-child(3) { display: none; }
          .price-table-header { flex-direction: column; align-items: flex-start; }
        }
        @media (min-width: 721px) {
          .hamburger { display: none; }
          .mobile-drawer { display: none !important; }
        }

        /* ── HAMBURGER ── */
        .hamburger {
          flex-direction: column; justify-content: center; align-items: center;
          gap: 5px; width: 40px; height: 40px;
          background: none; border: none; cursor: pointer; padding: 4px;
          border-radius: 6px; transition: background 0.15s;
        }
        .hamburger:hover { background: rgba(255,255,255,0.07); }
        .hamburger span {
          display: block; width: 22px; height: 2px;
          background: var(--text); border-radius: 2px;
          transition: transform 0.2s, opacity 0.2s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE DRAWER ── */
        .mobile-drawer {
          position: fixed; top: 68px; left: 0; right: 0; z-index: 99;
          background: rgba(11,15,26,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 1.5rem 1.25rem 2rem;
          display: flex; flex-direction: column; gap: 0;
          transform: translateY(-110%);
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .mobile-drawer.open { transform: translateY(0); }
        .mobile-drawer a {
          font-size: 17px; color: var(--text-mid);
          padding: 0.9rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.15s;
        }
        .mobile-drawer a:hover { color: var(--text); }
        .mobile-drawer a:last-child { border-bottom: none; }
        .mobile-drawer .drawer-cta {
          margin-top: 1.25rem;
          background: var(--gold); color: #0b0f1a;
          font-weight: 700; font-size: 15px;
          padding: 13px 20px; border-radius: 8px;
          text-align: center; border-bottom: none !important;
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <LogoMark size={32} />
          <span className="nav-wordmark">cron<span>e</span>re</span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#workflows">Workflows</a>
          <a href="/demo">See demos</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="nav-cta">Book a call →</a>
        </div>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`}>
        <a href="#how" onClick={closeMenu}>How it works</a>
        <a href="#workflows" onClick={closeMenu}>Workflows</a>
        <a href="/demo" onClick={closeMenu}>See demos</a>
        <a href="#pricing" onClick={closeMenu}>Pricing</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#faq" onClick={closeMenu}>FAQ</a>
        <a href={CALENDLY} target="_blank" rel="noreferrer" className="drawer-cta" onClick={closeMenu}>Book a free discovery call →</a>
      </div>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            <span>Built for CPA &amp; Accounting Firms</span>
          </div>
          <h1 className="hero-h1">
            Your firm runs on time.<br />
            Stop wasting it on <em>manual work.</em>
          </h1>
          <p className="hero-sub">
            Cronere builds and manages AI-powered workflows that eliminate the repetitive back-office tasks eating your team's hours — so you focus on clients, not administrivia.
          </p>
          <div className="hero-actions">
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-primary">
              Book a free discovery call →
            </a>
            <a href="#workflows" className="btn-ghost">See what gets automated ↓</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-num">10–20<span> hrs</span></div>
              <div className="stat-label">reclaimed per workflow / month</div>
            </div>
            <div>
              <div className="stat-num">3<span> mo</span></div>
              <div className="stat-label">to build, test &amp; fully optimize</div>
            </div>
            <div>
              <div className="stat-num">$0</div>
              <div className="stat-label">dev team required</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-alt" id="how">
        <div className="container">
          <span className="eyebrow">Process</span>
          <div className="section-header">
            <h2 className="section-title">From audit call to running on autopilot.</h2>
            <p className="section-sub">Four stages. No dev team. No disruption to your existing tools.</p>
          </div>
          <div className="how-steps">
            {[
              { n: '01 · DISCOVER', t: 'Audit call', d: 'We map your current manual processes and identify the highest-impact automation opportunities for your firm.' },
              { n: '02 · BUILD', t: 'Custom build', d: 'Each workflow is built specifically for your firm — your clients, your naming conventions, your existing tools. We build around the software you already use: TaxDome, Karbon, Canopy, Practice CS, and others.' },
              { n: '03 · BUILD', t: 'Custom build', d: 'Your workflow is built, connected to your existing tools, and tested with real data. Delivered in 1–2 weeks depending on complexity.' },
              { n: '04 · SUSTAIN', t: 'Ongoing maintenance', d: 'A flat monthly retainer per workflow keeps everything monitored, updated, and running. Cancel anytime with 30 days notice.' },
            ].map(s => (
              <div className="how-step" key={s.n}>
                <div className="how-step-num">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section className="section section-white" id="workflows">
        <div className="container">
          <span className="eyebrow">What gets automated</span>
          <div className="section-header">
            <h2 className="section-title">The work that runs your firm in the background.</h2>
            <p className="section-sub">These are the workflows most CPA and accounting firms start with — highest time savings, least disruption.</p>
          </div>

          <div className="workflow-cat">Client Onboarding &amp; Intake</div>
          <div className="workflow-grid">
            {[
              { t: 'New Client Onboarding Sequence', d: 'Triggered when a new engagement is signed. Sends welcome email, document checklist, portal access, and meeting link — automatically.', s: '↳ Saves ~3–4 hrs per new client' },
              { t: 'Engagement Letter Generation', d: 'Auto-generates a pre-filled engagement letter from a form submission — client name, services, fees — ready for e-signature without manual drafting.', s: '↳ Saves ~1–2 hrs per client per year' },
              { t: 'Document Collection & Follow-Up', d: "Automatically follows up with clients who haven't submitted required documents by a deadline. Escalates reminders without staff involvement.", s: '↳ Saves ~5–8 hrs/month during tax season' },
            ].map(w => (
              <div className="workflow-card" key={w.t}>
                <h4>{w.t}</h4>
                <p>{w.d}</p>
                <div className="workflow-save">{w.s}</div>
              </div>
            ))}
          </div>

          <div className="workflow-cat">Deadline &amp; Calendar Management</div>
          <div className="workflow-grid">
            {[
              { t: 'Tax Deadline Reminder System', d: 'Tracks filing deadlines per client, sends automated reminders at 30/14/7/1 day intervals. Your staff only sees exceptions, not the routine.', s: '↳ Saves ~4–6 hrs/month' },
              { t: 'Extension Filing Tracker', d: 'When an extension is filed, automatically updates the client record, notifies the client, and resets deadline reminders to the extended date.', s: '↳ Saves ~2–3 hrs/month during extension season' },
            ].map(w => (
              <div className="workflow-card" key={w.t}>
                <h4>{w.t}</h4>
                <p>{w.d}</p>
                <div className="workflow-save">{w.s}</div>
              </div>
            ))}
          </div>

          <div className="workflow-cat">Client Communication</div>
          <div className="workflow-grid">
            {[
              { t: 'Return Completion Notification', d: 'When a return is marked complete, the client automatically receives a notification with review instructions and next steps — no staff touchpoint needed.', s: '↳ Saves ~2 hrs/month' },
              { t: 'Referral Thank-You Sequence', d: 'When a new client indicates a referral source, the referring client automatically receives a personalized thank-you — strengthening your referral culture passively.', s: '↳ Drives referrals + zero staff effort' },
              { t: 'Annual Review Re-engagement', d: "Automatically contacts clients in the off-season to schedule annual planning meetings — so you're proactive about recurring revenue, not reactive.", s: '↳ Drives retention + upsell revenue' },
            ].map(w => (
              <div className="workflow-card" key={w.t}>
                <h4>{w.t}</h4>
                <p>{w.d}</p>
                <div className="workflow-save">{w.s}</div>
              </div>
            ))}
          </div>

          <div className="workflow-cat">Internal Operations</div>
          <div className="workflow-grid">
            {[
              { t: 'Invoice & A/R Follow-Up', d: 'Automatically sends polite payment reminders for unpaid invoices at set intervals — persistent without staff having to make awkward calls.', s: '↳ Saves ~3–5 hrs/month + improves cash flow' },
              { t: 'New Staff Onboarding Checklist', d: 'When a new hire is added, automatically triggers system access requests, training delivery, and 30/60/90 day check-ins.', s: '↳ Saves ~4–6 hrs per new hire' },
            ].map(w => (
              <div className="workflow-card" key={w.t}>
                <h4>{w.t}</h4>
                <p>{w.d}</p>
                <div className="workflow-save">{w.s}</div>
              </div>
            ))}
          </div>
          <div className="demo-banner">
            <div className="demo-banner-text">
              <h3>Want to see these workflows running live?</h3>
              <p>Three short video demos — real Make.com automations built for CPA firms, running with live dummy data.</p>
            </div>
            <a href="/demo" className="btn-demo">Watch the demos →</a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section section-alt" id="pricing">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <div className="section-header">
            <h2 className="section-title">Simple, transparent pricing.<br />The more you build, the better the value.</h2>
            <p className="section-sub">Per-workflow pricing with no long-term contracts. 50% upfront to begin, 50% plus first month maintenance at delivery.</p>
          </div>

          <div className="pricing-tables">

            {/* BUILD FEE SCHEDULE */}
            <div className="price-table-wrap">
              <div className="price-table-header">
                <div>
                  <div className="price-table-eye">Build Fee Schedule</div>
                  <div className="price-table-title">One-time fee per workflow</div>
                </div>
                <div className="price-table-note">50% upfront · 50% at delivery</div>
              </div>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Workflow</th>
                    <th>Build fee</th>
                    <th>Cumulative total</th>
                    <th>Savings vs first</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { wf: '1st workflow', fee: '$2,500', total: '$2,500', save: '—', highlight: false },
                    { wf: '2nd workflow', fee: '$2,000', total: '$4,500', save: 'Save $500', highlight: false },
                    { wf: '3rd workflow', fee: '$1,500', total: '$6,000', save: 'Save $1,000', highlight: false },
                    { wf: '4th+ workflow', fee: '$1,000 each', total: '—', save: 'Save $1,500 each', highlight: true },
                  ].map(r => (
                    <tr key={r.wf} className={r.highlight ? 'row-highlight' : ''}>
                      <td className="td-main">{r.wf}</td>
                      <td className="td-price">{r.fee}</td>
                      <td className="td-mid">{r.total}</td>
                      <td className="td-save">{r.save}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MAINTENANCE FEE SCHEDULE */}
            <div className="price-table-wrap" style={{marginTop: '1.5rem'}}>
              <div className="price-table-header">
                <div>
                  <div className="price-table-eye">Maintenance Fee Schedule</div>
                  <div className="price-table-title">Monthly, charged in advance at delivery</div>
                </div>
                <div className="price-table-note">Cancel anytime · 30 days notice</div>
              </div>
              <table className="price-table">
                <thead>
                  <tr>
                    <th>Workflows maintained</th>
                    <th>Monthly fee</th>
                    <th>Added this workflow</th>
                    <th>Avg per workflow</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { wf: '1 workflow', monthly: '$250/mo', added: '+$250', avg: '$250', highlight: false },
                    { wf: '2 workflows', monthly: '$450/mo', added: '+$200', avg: '$225', highlight: false },
                    { wf: '3 workflows', monthly: '$625/mo', added: '+$175', avg: '$208', highlight: false },
                    { wf: '4th+ workflow', monthly: '$775/mo +$150 each', added: '+$150 each', avg: 'from $194', highlight: true },
                  ].map(r => (
                    <tr key={r.wf} className={r.highlight ? 'row-highlight' : ''}>
                      <td className="td-main">{r.wf}</td>
                      <td className="td-price">{r.monthly}</td>
                      <td className="td-mid">{r.added}</td>
                      <td className="td-save">{r.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="pricing-note" style={{marginTop: '1.5rem'}}>
            <strong>What maintenance covers:</strong> Monitoring all workflows for errors, adjusting workflows for best practices amid an ever-changing AI landscape, minor tweaks when your firm&apos;s processes evolve, and priority support when something needs attention. Your workflows keep running cleanly without you thinking about them.
          </div>

          <div className="pricing-cta">
            <div className="pricing-cta-inner">
              <div className="pricing-cta-text">
                <h3>Not sure which workflow to start with?</h3>
                <p>Book a free 30-minute call — we&apos;ll identify the two or three automations that would have the biggest immediate impact on your firm.</p>
              </div>
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-cta-mid">
                Book a discovery call →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section-white" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <span className="eyebrow">About</span>
              <h2>Built by someone who understands your world.</h2>
              <p>Jacob Merkley has a Bachelor's in Accounting, an MBA, and 15 years of hybrid accounting, recruiting, and business operations experience. He has also participated in several startups and grew to love building AI automations to save time and money.</p>
              <p>Cronere was started to get your time back — so you can focus on the parts of your business that truly matter.</p>
              <p style={{marginTop: '1.5rem'}}>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="about-link">
                  <LinkedInIcon /> Connect with Jacob on LinkedIn →
                </a>
              </p>
            </div>
            <div className="creds">
              {[
                { icon: '🎓', title: 'MBA + Bachelor\'s in Accounting', desc: 'Deep fluency in how CPA firms operate, think, and bill — not just how to automate them.' },
                { icon: '🏢', title: '15 Years in Accounting & Operations', desc: 'Recruiting and working alongside finance and accounting teams at hundreds of firms.' },
                { icon: '⚙️', title: 'Full-Stack AI Builder', desc: 'Make.com, Supabase, Claude API, Next.js — the tools that actually get workflows into production.' },
                { icon: '📋', title: 'Simple Ongoing Retainer', desc: 'After your engagement closes, a flat monthly retainer keeps everything monitored, updated, and running. No surprises.' },
              ].map(c => (
                <div key={c.title} className="cred">
                  <div className="cred-icon">{c.icon}</div>
                  <div>
                    <div className="cred-title">{c.title}</div>
                    <div className="cred-desc">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CRONERE */}
      <section className="section why-cronere">
        <div className="container">
          <div className="why-inner">
            <div className="why-text">
              <span className="eyebrow">Why Cronere?</span>
              <h2>Named after the technology that runs things <em>automatically.</em></h2>
              <p>In software development, a <strong style={{color: 'var(--text)'}}>cron job</strong> is a task scheduled to run silently in the background — no manual trigger, no human involvement, just reliable execution on a defined schedule. It&apos;s the backbone of how modern software keeps things running without anyone thinking about it.</p>
              <p>That&apos;s exactly what Cronere does for your firm. The manual work doesn&apos;t disappear — it just stops requiring your attention. Engagement letters, document reminders, client follow-ups, deadline tracking. Running quietly. Correctly. Every time.</p>
              <p>The name is a reminder of what the goal actually is: not automation for its own sake, but work that runs itself so you don&apos;t have to.</p>
            </div>
            <div className="why-code">
              <span className="why-code-label">A cron job — the inspiration</span>
              <pre>
                <span dangerouslySetInnerHTML={{__html:
`<span class="cm"># Every weekday at 8am:</span>
<span class="kw">0 8</span> * * <span class="val">1-5</span> send_reminders

<span class="cm"># On the 1st of each month:</span>
<span class="kw">0 9</span> <span class="val">1</span> * * generate_invoices

<span class="cm"># 30 days before deadline:</span>
<span class="kw">0 10</span> * * * check_deadlines`
                }} />
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt" id="faq">
        <div className="container">
          <span className="eyebrow">FAQ</span>
          <div className="section-header">
            <h2 className="section-title">Common questions.</h2>
          </div>
          <div className="faq-grid">
            {[
              { q: 'Do I need to change the software my firm already uses?', a: "No. We build around the tools you're already paying for — TaxDome, Karbon, Canopy, Practice CS, and others. Nothing gets ripped out. In most cases we're making your existing software work the way you originally hoped it would." },
              { q: 'How quickly are workflows delivered?', a: "Most single workflows are delivered within 1–2 weeks of kickoff. Larger engagements with multiple workflows are delivered sequentially — typically one every 1–2 weeks. You start seeing results quickly rather than waiting months." },
              { q: 'What happens if I want to stop the maintenance?', a: "Cancel anytime with 30 days notice. Everything built is yours — fully documented so you or anyone else can maintain it. There's no lock-in." },
              { q: 'How long does it take to see results?', a: "Most firms see time savings from the first workflow within 2–3 weeks of it going live. Document collection and deadline reminders produce the fastest, most visible results." },
              { q: "What's a \"workflow\" exactly?", a: "A workflow is a defined, automated process — for example: when a new engagement letter is signed, automatically send the client a welcome packet and document checklist. One trigger, one outcome, running without staff involvement." },
              { q: 'Is this right for a solo practitioner or only larger firms?', a: "Both. Solo and small firms (2–15 staff) often benefit the most because the time savings hit harder when there are fewer people absorbing the manual load. Starting with a single workflow at $2,500 is a low-risk way to see real results before expanding." },
            ].map(f => (
              <div key={f.q} className="faq-item">
                <h4>{f.q}</h4>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-inner">
            <span className="eyebrow">Get started</span>
            <h2>Ready to get <em>hours back</em> every month?</h2>
            <p>Book a free 30-minute discovery call. We&apos;ll map out the two or three workflows that would have the biggest immediate impact on your firm — no commitment required.</p>
            <div className="contact-actions">
              <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-large">
                Book a discovery call →
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-li">
                <LinkedInIcon /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="#hero" className="footer-logo">
          <LogoMark size={22} />
          <span className="footer-wordmark">cron<span>e</span>re</span>
        </a>
        <div className="footer-right">© 2026 Inboxx Digital, LLC dba Cronere · cronere.com</div>
      </footer>
    </>
  )
}
