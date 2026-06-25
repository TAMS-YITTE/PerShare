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
        <a href="/faq" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>FAQ</a>
        <a href="/how-disputes-work" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>How Pools Work</a>
        <a href="/security" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Security &amp; Trust</a>
        <a href="/risks" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Risks &amp; Disclaimers</a>
        <a href="/PerShare_Audit_R2.pdf" target="_blank" rel="noreferrer" style={{ color: '#8892b0', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s' }}>Audit Report</a>
      </div>
      <p style={{ color: '#8892b0', fontSize: '14px', margin: 0 }}>
        &copy; {new Date().getFullYear()} PerShare. All rights reserved.
      </p>
    </footer>
  );
}
