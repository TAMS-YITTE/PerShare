import React from 'react';

export default function Whitepaper() {
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: '#fff' }}>Whitepaper</h1>
        <p style={{ color: 'var(--purple)', fontSize: '18px' }}>PerShare: Trustless Collective Pooling Protocol</p>
      </header>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', color: '#fff', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Abstract</h2>
        <p style={{ color: 'var(--muted)', marginTop: '16px' }}>
          PerShare is a decentralized, trustless, and automated collective pooling protocol deployed on the BNB Smart Chain (BSC). 
          It bridges the gap between fragmented Web3 payment tools and expensive Web2 escrow services by providing an all-in-one 
          smart contract architecture for group buying, presale allocations, and conditional payouts.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', color: '#fff', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>1. The Problem</h2>
        <p style={{ color: 'var(--muted)', marginTop: '16px' }}>
          Traditional group investments and OTC (Over The Counter) deals suffer from a fundamental trust issue. One individual must 
          act as the custodian of funds, creating a single point of failure and a massive counterparty risk. Existing solutions are either:
        </p>
        <ul style={{ color: 'var(--muted)', marginTop: '8px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Web2 (TradFi):</strong> Expensive (up to 30% fees), slow, and heavily censored.</li>
          <li style={{ marginBottom: '8px' }}><strong>Web3 (DeFi):</strong> Overly complex, requiring deep technical knowledge, or heavily fragmented across multiple Ethereum L2s.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', color: '#fff', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>2. The PerShare Solution</h2>
        <p style={{ color: 'var(--muted)', marginTop: '16px' }}>
          PerShare solves this by utilizing a trustless smart contract that acts as an immutable escrow. A "SHARE" is created by an initiator, 
          defining the members, the target stablecoin amount, and the destination address.
        </p>
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', marginTop: '16px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: 'var(--purple)', fontSize: '18px', marginBottom: '12px' }}>The 2-Phase Lifecycle</h3>
          <ol style={{ color: 'var(--muted)', paddingLeft: '20px', margin: 0 }}>
            <li style={{ marginBottom: '12px' }}><strong>Phase 1 (Collection):</strong> Members deposit stablecoins into the SHARE. Once the target is met and consensus is reached, the funds are automatically sent to the destination (e.g., a Presale wallet).</li>
            <li><strong>Phase 2 (Distribution):</strong> The destination wallet sends the purchased BEP-20 tokens back to the SHARE. Upon member consensus, the tokens are distributed proportionally to each member based on their initial contribution. Zero rounding errors, zero manual work.</li>
          </ol>
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '24px', color: '#fff', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>3. Architecture & Security</h2>
        <p style={{ color: 'var(--muted)', marginTop: '16px' }}>
          Security is the core pillar of PerShare. The protocol is built with the following immutable rules:
        </p>
        <ul style={{ color: 'var(--muted)', marginTop: '8px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Immutability:</strong> Once a SHARE is deployed, its rules (members, destination, target) cannot be altered by anyone, not even the creator.</li>
          <li style={{ marginBottom: '8px' }}><strong>Consensus Mechanism:</strong> Funds and tokens cannot move without meeting the predefined validation threshold from the members.</li>
          <li style={{ marginBottom: '8px' }}><strong>Reentrancy Protection:</strong> Fully guarded against reentrancy attacks using OpenZeppelin standards.</li>
        </ul>
      </section>
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
