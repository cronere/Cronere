'use client'

const LINKEDIN = 'https://www.linkedin.com/in/jacobmerkley/'
const CALENDLY = 'https://calendly.com/jacobmerkley'

const LogoMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#5B9BFF" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#lg2)" />
    <path d="M138 154 L90 256 L138 358" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    <path d="M374 154 L422 256 L374 358" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
    <path d="M168 256 L210 256 L234 192 L278 320 L302 256 L344 256" stroke="white" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Confirmed() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0b0f1a;
          --bg-2: #0f1524;
          --bg-card: #131b2e;
          --border: rgba(255,255,255,0.07);
          --border-h: rgba(255,255,255,0.13);
          --gold: #F5A623;
          --gold-dim: rgba(245,166,35,0.12);
          --gold-bdr: rgba(245,166,35,0.3);
          --blue: #4F8EF7;
          --text: #e4e8f0;
          --text-mid: #8a9ab5;
          --text-dim: #4f5f74;
          --green: #34d399;
          --green-dim: rgba(52,211,153,0.1);
          --green-bdr: rgba(52,211,153,0.25);
          --mono: 'IBM Plex Mono', monospace;
        }
        html { scroll-behavior: smooth; }
        body {
          font-family: system-ui, -apple-system, 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          line-height: 1.65;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }

        /* NAV */
        .nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2rem; height: 64px;
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-wordmark { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: var(--text); }
        .nav-wordmark span { color: var(--blue); }
        .nav-back {
          font-size: 13px; color: var(--text-mid);
          display: flex; align-items: center; gap: 5px;
          transition: color 0.15s;
        }
        .nav-back:hover { color: var(--text); }

        /* PAGE */
        .page {
          max-width: 640px;
          margin: 0 auto;
          padding: 4rem 1.5rem 6rem;
        }

        /* CONFIRMATION BADGE */
        .confirm-badge {
          display: flex; align-items: center; justify-content: center;
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--green-dim);
          border: 1.5px solid var(--green-bdr);
          color: var(--green);
          margin: 0 auto 2rem;
        }

        /* HEADER */
        .confirm-header { text-align: center; margin-bottom: 3rem; }
        .confirm-eyebrow {
          font-family: var(--mono);
          font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--green);
          display: block; margin-bottom: 0.75rem;
        }
        .confirm-h1 {
          font-size: clamp(26px, 4vw, 36px);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 0.75rem;
        }
        .confirm-sub {
          font-size: 16px;
          color: var(--text-mid);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* DIVIDER */
        .divider {
          height: 1px; background: var(--border);
          margin: 2.5rem 0;
        }

        /* WHAT TO EXPECT */
        .section-label {
          font-family: var(--mono);
          font-size: 10px; letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-dim);
          margin-bottom: 1.25rem;
          display: block;
        }
        .expect-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 0; }
        .expect-item {
          display: flex; gap: 14px; align-items: flex-start;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.1rem 1.25rem;
        }
        .expect-num {
          font-family: var(--mono);
          font-size: 11px; color: var(--gold);
          font-weight: 500; flex-shrink: 0;
          margin-top: 2px;
          min-width: 24px;
        }
        .expect-title { font-size: 14px; font-weight: 600; margin-bottom: 3px; }
        .expect-desc { font-size: 13px; color: var(--text-mid); line-height: 1.55; }

        /* PREP BOX */
        .prep-box {
          background: var(--gold-dim);
          border: 1px solid var(--gold-bdr);
          border-radius: 10px;
          padding: 1.5rem 1.75rem;
          margin-bottom: 0;
        }
        .prep-box .section-label { color: var(--gold); margin-bottom: 1rem; }
        .prep-box p {
          font-size: 14px; color: var(--text-mid);
          margin-bottom: 1rem; line-height: 1.65;
        }
        .prep-questions { display: flex; flex-direction: column; gap: 0.6rem; }
        .prep-q {
          display: flex; gap: 10px; align-items: flex-start;
          font-size: 14px; color: var(--text);
        }
        .prep-q::before {
          content: '·';
          color: var(--gold);
          font-size: 18px;
          line-height: 1.2;
          flex-shrink: 0;
        }

        /* JACOB CARD */
        .jacob-card {
          background: var(--bg-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 1.5rem 1.75rem;
          display: flex; gap: 1.25rem; align-items: flex-start;
        }
        .jacob-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          background: linear-gradient(135deg, #1e3a5f 0%, #0b0f1a 100%);
          border: 1.5px solid var(--border-h);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 20px; font-weight: 700; color: var(--blue);
          letter-spacing: -0.5px;
        }
        .jacob-name { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
        .jacob-title { font-size: 13px; color: var(--text-mid); margin-bottom: 0.75rem; }
        .jacob-note { font-size: 13px; color: var(--text-mid); line-height: 1.6; margin-bottom: 0.85rem; }
        .jacob-li {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--text-mid);
          border: 1px solid var(--border);
          border-radius: 6px; padding: 5px 10px;
          transition: border-color 0.15s, color 0.15s;
        }
        .jacob-li:hover { border-color: var(--border-h); color: var(--text); }

        /* RESCHEDULE */
        .reschedule-note {
          text-align: center;
          font-size: 13px; color: var(--text-dim);
          line-height: 1.6;
        }
        .reschedule-note a { color: var(--text-mid); text-decoration: underline; text-underline-offset: 3px; }
        .reschedule-note a:hover { color: var(--text); }

        /* FOOTER */
        .footer {
          border-top: 1px solid var(--border);
          padding: 1.5rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-logo { display: flex; align-items: center; gap: 8px; }
        .footer-wordmark { font-size: 16px; font-weight: 700; color: var(--text-mid); }
        .footer-wordmark span { color: var(--blue); }
        .footer-right { font-size: 12px; color: var(--text-dim); }

        @media (max-width: 600px) {
          .nav { padding: 0 1.25rem; }
          .page { padding: 3rem 1.25rem 5rem; }
          .jacob-card { flex-direction: column; gap: 1rem; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          <LogoMark size={28} />
          <span className="nav-wordmark">cron<span>e</span>re</span>
        </div>
        <a href="/" className="nav-back">← Back to cronere.com</a>
      </nav>

      {/* PAGE */}
      <main className="page">

        {/* CONFIRMATION BADGE */}
        <div className="confirm-badge">
          <CheckIcon />
        </div>

        {/* HEADER */}
        <div className="confirm-header">
          <span className="confirm-eyebrow">You&apos;re on the calendar</span>
          <h1 className="confirm-h1">Your discovery call is booked.</h1>
          <p className="confirm-sub">
            A confirmation email is on its way. In the meantime, here&apos;s what to expect and how to make the most of the 30 minutes.
          </p>
        </div>

        <div className="divider" />

        {/* WHAT TO EXPECT */}
        <span className="section-label">What to expect on the call</span>
        <div className="expect-list">
          {[
            {
              n: '01',
              t: 'We map your firm\'s current workflow',
              d: 'A few questions about how your team operates today — what software you use, where time is being lost, what\'s handled manually that probably shouldn\'t be.'
            },
            {
              n: '02',
              t: 'I identify the highest-impact starting points',
              d: 'Based on what you share, I\'ll call out the 2–3 workflows that would reclaim the most time for your firm with the least disruption to implement.'
            },
            {
              n: '03',
              t: 'You get a clear next step — no pressure',
              d: 'If it makes sense to move forward, I\'ll outline exactly what that looks like. If it\'s not the right fit, I\'ll tell you that too. No hard close, no follow-up sequence.'
            },
          ].map(e => (
            <div key={e.n} className="expect-item">
              <div className="expect-num">{e.n}</div>
              <div>
                <div className="expect-title">{e.t}</div>
                <div className="expect-desc">{e.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* PREP */}
        <div className="prep-box">
          <span className="section-label">Optional prep — takes 2 minutes</span>
          <p>
            You don&apos;t need to prepare anything. But if you want to hit the ground running, it helps to have a rough sense of:
          </p>
          <div className="prep-questions">
            {[
              'What practice management software your firm currently uses (TaxDome, Karbon, Canopy, Practice CS, or other)',
              'Which manual task eats the most time during tax season',
              'Roughly how many people are on your team',
            ].map(q => (
              <div key={q} className="prep-q">{q}</div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* JACOB CARD */}
        <div className="jacob-card">
          <div className="jacob-avatar">JM</div>
          <div>
            <div className="jacob-name">Jacob Merkley</div>
            <div className="jacob-title">Founder, Cronere &nbsp;·&nbsp; cronere.com</div>
            <p className="jacob-note">
              MBA, Bachelor&apos;s in Accounting, 15 years in accounting, recruiting, and business operations. I&apos;ve worked alongside CPA firms long enough to know exactly where the time goes — and how to get it back.
            </p>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="jacob-li">
              <LinkedInIcon /> Connect on LinkedIn
            </a>
          </div>
        </div>

        <div className="divider" />

        {/* RESCHEDULE */}
        <p className="reschedule-note">
          Need to reschedule? Use the link in your confirmation email.<br />
          Questions before the call? Reach out at{' '}
          <a href="mailto:jacob@cronere.com">jacob@cronere.com</a>
        </p>

      </main>

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
