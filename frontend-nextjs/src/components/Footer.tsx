import React from 'react';

export function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--border)', 
      padding: '40px 24px', 
      marginTop: '80px',
      background: 'var(--surface)'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0 }}>
              Per<span style={{ color: 'var(--purple)' }}>Share</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '8px' }}>Trustless Pool, Pay & Share.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#fff', fontSize: '14px', margin: 0 }}>Protocol</h4>
              <a href="/whitepaper" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Whitepaper</a>
              <a href="/roadmap" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Roadmap</a>
              <a href="/faq" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>FAQ</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#fff', fontSize: '14px', margin: 0 }}>Legal</h4>
              <a href="/terms" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Terms of Use</a>
              <a href="/privacy" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
              <a href="mailto:support@pershare.org" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Contact</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ color: '#fff', fontSize: '14px', margin: 0 }}>Follow Us</h4>
              <a href="https://x.com/pershare_org" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter (X)
              </a>
              <a href="https://t.me/pershare_org" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'center', color: 'var(--muted)', fontSize: '12px' }}>
          &copy; {new Date().getFullYear()} PerShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
