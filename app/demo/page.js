'use client'

const CALENDLY = 'https://calendly.com/jacob-merkley'
const LINKEDIN = 'https://www.linkedin.com/in/jacobmerkley/'

const LogoMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5B9BFF" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#lg3)" />
    <path d="M138 154 L90 256 L138 358" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    <path d="M374 154 L422 256 L374 358" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    <path d="M168 256 L210 256 L234 192 L278 320 L302 256 L344 256" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const videos = [
  {
    id: 'engagement-letter',
    num: '01',
    title: 'Engagement Letter Auto-Generation',
    duration: '~4 min',
    pain: 'Most firms spend 20–30 minutes drafting each engagement letter manually — then chase the client for a signature.',
    outcome: 'A staff intake form triggers AI to generate a complete, professional letter tailored by service type. A data filter strips PII before anything reaches AI. The letter lands in Google Docs and goes to the client for e-signature automatically.',
    stat: 'Saves 40–100 hrs/year for most firms',
    loomId: 'tJ0jdDvp7a8',
    tags: ['Make.com', 'Claude AI', 'Google Docs', 'Adobe Sign / DocuSign', 'Section 7216 Compliant'],
  },
  {
    id: 'client-onboarding',
    num: '02',
    title: 'New Client Onboarding Sequence',
    duration: '~3 min',
    pain: 'Onboarding is handled differently every time depending on who picks it up — inconsistent experience, missed steps, no paper trail.',
    outcome: 'The moment an engagement letter is signed, a welcome email, service-specific document checklist, and staff notification fire automatically. Every client gets the same excellent experience every time.',
    stat: 'Consistent onboarding, every client, every time',
    loomId: 'eh-txp8SQW8',
    tags: ['Make.com', 'Gmail / Outlook', 'Adobe Sign / DocuSign', 'Google Sheets'],
  },
  {
    id: 'document-reminders',
    num: '03',
    title: 'Document Collection & Intake Sequence',
    duration: '~4 min',
    pain: 'Manually chasing clients for documents eats 5–8 hours a month during tax season — and clients who already submitted still get reminded.',
    outcome: 'Documents are automatically downloaded, split, and categorized. AI reviews completeness against the prior year return. If documents are complete, staff is notified. If not, an escalating reminder sequence fires at 14, 7, 3, and 1 day out — automatically.',
    stat: 'Saves 5–8 hrs/month during tax season',
    loomId: 'EQl2YaqC170',
    tags: ['Make.com', 'PDF.co', 'Claude AI', 'SmartVault / TaxDome API', 'Section 7216 Compliant'],
  },
]

export default function Demo() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg:       #0b0f1a;
          --bg-2:     #0f1524;
          --bg-card:  #131b2e;
          --border:   rgba(255,255,255,0.07);
          --border-h: rgba(255,255,255,0.13);
          --gold:     #F5A623;
          --gold-dim: rgba(245,166,35,0.12);
          --gold-bdr: rgba(245,166,35,0.3);
          --blue:     #4F8EF7;
          --blue-dim: rgba(79,142,247,0.1);
          --text:     #e4e8f0;
          --text-mid: #8a9ab5;
          --text-dim: #4f5f74;
          --green:    #34d399;
          --mono:     'IBM Plex Mono', monospace;
        }
        html { scroll-behavior: smooth; }
        body {
          font-family: system-ui, -apple-system, 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.65;
          -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }

        /* NAV */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem; height: 64px;
          border-bottom: 1px solid var(--border);
          background: rgba(11,15,26,0.95);
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(12px);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-wordmark { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
        .nav-wordmark span { color: var(--blue); }
        .nav-right { display: flex; align-items: center; gap: 1rem; }
        .nav-back { font-size: 14px; color: var(--text-mid); transition: color 0.15s; }
        .nav-back:hover { color: var(--text); }
        .nav-book {
          background: var(--gold); color: #0b0f1a;
          font-size: 14px; font-weight: 600;
          padding: 9px 18px; border-radius: 6px;
          transition: opacity 0.15s;
        }
        .nav-book:hover { opacity: 0.88; }

        /* HERO */
        .hero {
          text-align: center;
          padding: 4rem 1.5rem 3rem;
          border-bottom: 1px solid var(--border);
          position: relative; overflow: hidden;
        }
        .hero-glow {
          position: absolute; width: 600px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(245,166,35,0.06) 0%, transparent 70%);
          top: -50px; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }
        .hero-inner { position: relative; z-index: 1; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--gold-dim); border: 1px solid var(--gold-bdr);
          border-radius: 100px; padding: 5px 14px 5px 10px;
          margin-bottom: 1.5rem;
        }
        .hero-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); }
        .hero-eyebrow span { font-size: 14px; color: var(--gold); font-weight: 500; }
        .hero h1 {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800; letter-spacing: -0.02em; line-height: 1.1;
          margin-bottom: 1rem;
        }
        .hero h1 em { font-style: normal; color: var(--gold); }
        .hero p {
          font-size: 17px; color: var(--text-mid);
          max-width: 520px; margin: 0 auto 2rem; line-height: 1.7;
        }
        .hero-stats {
          display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;
          padding-top: 2rem; border-top: 1px solid var(--border);
          max-width: 600px; margin: 0 auto;
        }
        .stat-num { font-size: 28px; font-weight: 800; color: var(--text); line-height: 1; margin-bottom: 3px; }
        .stat-num span { color: var(--gold); }
        .stat-label { font-size: 15px; color: var(--text-mid); }

        /* VIDEOS */
        .videos { max-width: 860px; margin: 0 auto; padding: 3rem 1.5rem; }

        .video-block {
          margin-bottom: 4rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid var(--border);
        }
        .video-block:last-child { border-bottom: none; margin-bottom: 0; }

        .video-meta {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;
        }
        .video-num {
          font-family: var(--mono); font-size: 12px;
          color: var(--gold); letter-spacing: 0.1em;
          margin-bottom: 0.4rem; display: block;
        }
        .video-title {
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 700; letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }
        .video-duration {
          font-size: 14px; color: var(--text-dim);
          font-family: var(--mono);
        }
        .video-stat {
          background: var(--green); color: #0b0f1a;
          font-size: 13px; font-weight: 600;
          padding: 7px 16px; border-radius: 100px;
          white-space: nowrap; flex-shrink: 0;
          align-self: flex-start; margin-top: 4px;
        }

        .video-summary {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--border);
          border: 1px solid var(--border);
          border-radius: 8px; overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .summary-cell { background: var(--bg-card); padding: 1.25rem 1.5rem; }
        .summary-label {
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-dim); margin-bottom: 0.6rem; display: block;
        }
        .summary-cell p { font-size: 15px; color: var(--text-mid); line-height: 1.6; }
        .summary-cell.outcome p { color: var(--text); }

        .video-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
        .tag {
          font-size: 13px; color: var(--blue);
          background: var(--blue-dim);
          border: 1px solid rgba(79,142,247,0.2);
          border-radius: 4px; padding: 4px 12px;
        }

        /* LOOM EMBED */
        .loom-wrapper {
          position: relative; width: 100%;
          padding-bottom: 56.25%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px; overflow: hidden;
        }
        .loom-wrapper iframe {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%; border: none;
        }
        .loom-placeholder {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 1rem; background: var(--bg-card);
        }
        .loom-placeholder-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: var(--gold-dim); border: 1.5px solid var(--gold-bdr);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold);
        }
        .loom-placeholder p {
          font-size: 15px; color: var(--text-dim); text-align: center;
        }
        .loom-placeholder strong { color: var(--text-mid); display: block; margin-bottom: 4px; font-size: 16px; }

        /* CTA SECTION */
        .cta-section {
          border-top: 1px solid var(--border);
          padding: 4rem 1.5rem;
          text-align: center;
          background: var(--bg-2);
        }
        .cta-inner { max-width: 540px; margin: 0 auto; }
        .cta-eyebrow {
          font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--gold); display: block; margin-bottom: 1rem;
        }
        .cta-inner h2 {
          font-size: clamp(24px, 3.5vw, 36px);
          font-weight: 800; letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }
        .cta-inner h2 em { font-style: normal; color: var(--gold); }
        .cta-inner p { font-size: 16px; color: var(--text-mid); line-height: 1.7; margin-bottom: 2rem; }
        .btn-large {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: #0b0f1a;
          font-weight: 700; font-size: 15px;
          padding: 15px 30px; border-radius: 8px;
          transition: opacity 0.15s, transform 0.15s;
          margin-bottom: 1rem;
        }
        .btn-large:hover { opacity: 0.88; transform: translateY(-1px); }
        .cta-note { font-size: 13px; color: var(--text-dim); }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 1.5rem 2rem;
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
          background: var(--bg);
        }
        .footer-logo { display: flex; align-items: center; gap: 8px; }
        .footer-wordmark { font-size: 16px; font-weight: 700; color: var(--text-mid); }
        .footer-wordmark span { color: var(--blue); }
        .footer-right { font-size: 12px; color: var(--text-dim); }

        @media (max-width: 600px) {
          .nav { padding: 0 1.25rem; }
          .video-summary { grid-template-columns: 1fr; }
          .hero-stats { gap: 1.5rem; }
          .video-meta { flex-direction: column; }
          .video-stat { align-self: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          <LogoMark size={28} />
          <span className="nav-wordmark">cron<span>e</span>re</span>
        </a>
        <div className="nav-right">
          <a href="/" className="nav-back">← Back to cronere.com</a>
          <a href={CALENDLY} target="_blank" rel="noreferrer" className="nav-book">Book a call →</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-glow" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="hero-dot" />
            <span>Live workflow demos — CPA &amp; Accounting Firms</span>
          </div>
          <h1>See it working.<br />Three workflows, <em>eleven minutes.</em></h1>
          <p>Three live Make.com automations built specifically for CPA and accounting firms. Watch them run — then book a call to see what we&apos;d build for yours.</p>
          <div className="hero-stats">
            <div>
              <div className="stat-num">3</div>
              <div className="stat-label">live workflow demos</div>
            </div>
            <div>
              <div className="stat-num">~11<span>min</span></div>
              <div className="stat-label">total watch time</div>
            </div>
            <div>
              <div className="stat-num">$0</div>
              <div className="stat-label">to book a discovery call</div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPLIANCE BADGE */}
      <div style={{textAlign: 'center', padding: '0 1.5rem 2rem'}}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)',
          borderRadius: '100px', padding: '8px 18px', fontSize: '13px', color: '#8a9ab5'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F8EF7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>All workflows built to <strong style={{color: '#e4e8f0'}}>Section 7216 compliance standards</strong> — client data never leaves your environment</span>
        </div>
      </div>

      {/* VIDEOS */}
      <div className="videos">
        {videos.map((v) => (
          <div key={v.id} className="video-block" id={v.id}>
            <div className="video-meta">
              <div>
                <span className="video-num">{v.num} of 03</span>
                <div className="video-title">{v.title}</div>
                <span className="video-duration">⏱ {v.duration}</span>
              </div>
              <div className="video-stat">{v.stat}</div>
            </div>

            <div className="video-summary">
              <div className="summary-cell">
                <span className="summary-label">The problem</span>
                <p>{v.pain}</p>
              </div>
              <div className="summary-cell outcome">
                <span className="summary-label">What this workflow does</span>
                <p>{v.outcome}</p>
              </div>
            </div>

            <div className="video-tags">
              {v.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div className="loom-wrapper">
              {v.loomId.startsWith('REPLACE') ? (
                <div className="loom-placeholder">
                  <div className="loom-placeholder-icon">
                    <PlayIcon />
                  </div>
                  <p>
                    <strong>{v.title}</strong>
                    Video coming soon — check back shortly.
                  </p>
                </div>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${v.loomId}?rel=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={v.title}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-inner">
          <span className="cta-eyebrow">Ready to move forward?</span>
          <h2>Want to see what we&apos;d build<br />for <em>your firm?</em></h2>
          <p>Book a free 30-minute discovery call. We&apos;ll map out the two or three workflows that would have the biggest immediate impact — no commitment required.</p>
          <div>
            <a href={CALENDLY} target="_blank" rel="noreferrer" className="btn-large">
              Book a discovery call →
            </a>
          </div>
          <p className="cta-note">Free 30 minutes · No obligation · cronere.com/confirmed after booking</p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">
          <LogoMark size={20} />
          <span className="footer-wordmark">cron<span>e</span>re</span>
        </div>
        <div className="footer-right">© 2026 Inboxx Digital, LLC dba Cronere · cronere.com</div>
      </footer>
    </>
  )
}
