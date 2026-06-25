import React from 'react';

export default function Security() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>Security & Trust</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          Code is law. How PerShare protects your funds.
        </p>

        <div style={{ display: 'grid', gap: '32px' }}>
          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#10B981', marginBottom: '12px' }}>100% Non-Custodial</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              PerShare is entirely non-custodial. The development team has no access to your funds. All deposits, consensus validations, and fractional distributions are governed entirely by immutable smart contracts on the BNB Chain.
            </p>
          </div>

          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '12px' }}>Audited by SpyWolf</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              Our smart contracts have undergone rigorous security audits by industry-leading firms, including SpyWolf. No critical vulnerabilities were found. You can view the full audit report using the link in the footer.
            </p>
          </div>

          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#a78bfa', marginBottom: '12px' }}>Guaranteed Refunds</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              If a pool fails to reach its target amount before the deadline, the contract automatically enters a refund state. Members can withdraw 100% of their deposited USDT. The protocol takes zero fees on failed or expired pools.
            </p>
          </div>
          
          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b', marginBottom: '12px' }}>Hermetic Token Registry</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              To prevent any overlap or "cross-pool" theft, once an expected token is assigned to a pool for distribution, it is permanently locked to that pool in the `expectedToken` registry. No other pool can claim or distribute those tokens.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
