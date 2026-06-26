import React from 'react';

export default function Risks() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>Risks & Disclaimers</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          Please read this carefully before participating in any pool.
        </p>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>No Offer / No Advice</h2>
          <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            PerShare does not offer, endorse, verify, or guarantee any token, asset, or pool. You are solely responsible for your decisions, your legal and tax compliance, and the evaluation of any counterparty.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '32px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ef4444', marginBottom: '12px' }}>1. Counterparty Risk (OTC & Group Buys)</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              PerShare guarantees the safe pooling of funds and the automatic distribution of tokens <strong>IF</strong> the tokens are deposited into the contract. However, PerShare cannot force an external, off-chain entity (like an OTC seller) to send the tokens. If the group validates the transfer and sends the USDT to a malicious seller, the funds may be lost. You must trust the destination address you are sending funds to.
            </p>
          </div>

          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>2. Smart Contract Risk</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              While the PerShare smart contracts have been thoroughly audited by SpyWolf, interacting with any smart contract carries inherent risks, including undiscovered bugs or vulnerabilities. You use the protocol at your own risk.
            </p>
          </div>

          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>3. Token Volatility Risk</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              The value of the tokens you acquire through a group buy can fluctuate wildly. PerShare is merely a decentralized infrastructure protocol for pooling and distribution; it does not endorse, vet, or guarantee the value of any asset acquired through its pools.
            </p>
          </div>
          
          <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>4. Protocol Pause (Emergency)</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
              In the event of a critical vulnerability, the PerShare contract admin has the ability to pause the protocol to prevent further deposits or transfers. This is a security measure designed to protect user funds, but it may temporarily lock assets.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
