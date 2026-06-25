import React from 'react';

export default function HowPoolsWork() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>How Pools Work</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          Understanding the lifecycle of a PerShare pool.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '12px' }}>1. Creation</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>The Pool Creator defines the target amount, the deadline, the destination address (e.g., an OTC seller), and whitelists the wallet addresses of the members.</p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#10B981', marginBottom: '12px' }}>2. Deposit & Consensus</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Whitelisted members deposit USDT directly into the smart contract. Once the target is reached, members must validate the transfer. If the target is missed before the deadline, everyone can claim a 100% refund.</p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#a78bfa', marginBottom: '12px' }}>3. Group Buy Execution</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Upon consensus, the smart contract automatically transfers the pooled USDT to the destination address. The pool enters Phase 2.</p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0, 210, 255, 0.3)', boxShadow: '0 0 20px rgba(0, 210, 255, 0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '12px' }}>4. Automatic Redistribution</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>The seller sends the purchased tokens (or assets) back to the PerShare contract. The contract automatically calculates each member's exact fractional share based on their initial deposit, allowing them to claim their tokens instantly.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
