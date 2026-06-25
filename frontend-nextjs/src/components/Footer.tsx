import React from 'react';

export function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#000', 
      padding: '40px 24px', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      fontFamily: 'var(--font-body)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
        <a href="/whitepaper" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Whitepaper</a>
        <a href="/roadmap" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Roadmap</a>
        <a href="/faq" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>FAQ</a>
        <a href="/how-pools-work" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>How Pools Work</a>
        <a href="/security" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Security &amp; Trust</a>
        <a href="/risks" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Risks &amp; Disclaimers</a>
        <a href="https://spywolf.co/audits/PerShare_Audit.pdf" target="_blank" rel="noreferrer" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Audit Report</a>
      </div>
      
      {/* Social Icons */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginTop: '16px' }}>
        <a href="https://t.me/perShare_Official" target="_blank" rel="noreferrer" style={{ color: '#8892b0', transition: 'color 0.2s' }} aria-label="Telegram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 5-10 5 3.5 1 1.5 6 2-3 3 2.5 3-12-3-1.5z"></path>
          </svg>
        </a>
        <a href="https://x.com/perShare_Official" target="_blank" rel="noreferrer" style={{ color: '#8892b0', transition: 'color 0.2s' }} aria-label="X (Twitter)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="mailto:contact@pershare.org" style={{ color: '#8892b0', transition: 'color 0.2s' }} aria-label="Email">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </div>

      <p style={{ color: '#8892b0', fontSize: '14px', margin: 0, marginTop: '16px' }}>
        &copy; {new Date().getFullYear()} PerShare. All rights reserved.
      </p>
    </footer>
  );
}
