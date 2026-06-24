import React from 'react';

export function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#0a0f1c', // Very dark blue/black
      padding: '60px 24px', 
      borderTop: '1px solid #1a233a',
      fontFamily: 'var(--font-body)',
      color: '#fff'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
        
        {/* Left Column: Logo, Desc, Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/pershare_logo.png" alt="PerShare Logo" style={{ width: '32px', height: '32px', borderRadius: '4px' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0, fontWeight: 'bold' }}>
              Per<span style={{ color: 'var(--purple)' }}>Share</span>
            </h2>
          </div>
          <p style={{ color: '#8892b0', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Automated group pooling protocol on BNB Chain. Pool, send, and share automatically.
          </p>
          {/* Trust Badges */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
              Audited
            </div>
          </div>
        </div>
        
        {/* Middle Column: Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: '#fff', fontSize: '18px', margin: 0, fontWeight: 'bold' }}>Quick Links</h4>
          <a href="/app" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Launch App</a>
          <a href="/whitepaper" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Whitepaper</a>
          <a href="/roadmap" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Roadmap</a>
          <a href="/faq" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>FAQ</a>
        </div>

        {/* Right Column: Smart Contracts & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', margin: 0, fontWeight: 'bold' }}>Smart Contracts</h4>
            <a href="https://bscscan.com/address/0x35B4BAf4Af02151A76e4e00eA3411EDe495f463a" target="_blank" rel="noreferrer" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              PerShare Contract (Standard)
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '14px', marginTop: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
              Deployed on BNB Chain
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ color: '#fff', fontSize: '18px', margin: 0, fontWeight: 'bold' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://x.com/pershare_org" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#1a233a', color: '#8892b0', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me/pershare_org" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#1a233a', color: '#8892b0', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="mailto:support@pershare.org" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#1a233a', color: '#8892b0', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>
      
      <div style={{ maxWidth: '1000px', margin: '40px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid #1a233a', paddingTop: '24px', gap: '16px' }}>
        <p style={{ color: '#8892b0', fontSize: '14px', margin: 0 }}>&copy; {new Date().getFullYear()} PerShare. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/terms" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px' }}>Terms of Use</a>
          <a href="/privacy" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
