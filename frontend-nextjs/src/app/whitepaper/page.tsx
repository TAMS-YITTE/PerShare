import React from 'react';

export default function Whitepaper() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>PerShare Whitepaper</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          Version 1.0 — The Onchain Group Buy Protocol
        </p>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#00D2FF' }}>1. Introduction</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            PerShare is a decentralized, self-custodial smart contract protocol built on the BNB Chain. It enables communities, DAOs, and investors to safely pool capital for group purchases (such as OTC deals or presales) and automates the fractional distribution of the acquired assets.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Traditional group buys require trusting a central administrator to hold funds, send them to the seller, and manually distribute the tokens back to contributors. PerShare eliminates this counterparty risk through a dual-phase cryptographic architecture.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#10B981' }}>2. Phase 1: Capital Collection & Consensus</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            In the first phase, a Pool Creator initiates a SHARE with a specific USDT target, a deadline, and a designated destination address. Members deposit USDT directly into the tamper-proof contract.
          </p>
          <ul style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Target Reached:</strong> If the pool hits its target, a predefined threshold of members must validate the transfer. Once consensus is reached, the funds are sent to the destination.</li>
            <li><strong>Target Missed:</strong> If the deadline passes without the target being met, the pool automatically switches to refund mode. Members withdraw 100% of their initial deposit. No fees are taken.</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#a78bfa' }}>3. Phase 2: Token Reception & Auto-Distribution</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            The core innovation of PerShare lies in Phase 2. Once the OTC seller receives the USDT, they send the agreed-upon tokens (e.g., presale tokens) back to the PerShare contract.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            The protocol employs a perfectly pro-rata fractionalization engine. The math is simple and immutable:
          </p>
          <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '8px', color: '#fff', fontSize: '14px', marginBottom: '16px', overflowX: 'auto' }}>
            <code>totalOwed = (totalTokensReceived * userContribution) / poolTotal</code>
          </pre>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            Members simply call the `claimDistribution` function to pull their exact share of the tokens. Late token tranches (vesting) are fully supported.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px', color: '#f59e0b' }}>4. Security & Edge Cases</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '16px' }}>
            <strong>Hermetic Token Registry:</strong> To prevent cross-pool token contamination, a token contract can only be bound to a single SHARE in its lifetime via the `expectedToken` immutable registry.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
            <strong>Dust Sweeping:</strong> Division rounding in Solidity can leave microscopic token fractions (dust) in the contract. PerShare allows the creator to sweep this dust, defined strictly as `totalTokens - sum(theoreticalClaims)`.
          </p>
        </div>
      </div>
    </main>
  );
}
