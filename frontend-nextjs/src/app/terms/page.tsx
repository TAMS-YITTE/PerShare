import React from 'react';

export default function Terms() {
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: '#fff' }}>Terms of Use</h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Last updated: June 20, 2026</p>
      </header>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the PerShare website and smart contracts, you agree to be bound by these Terms of Use. 
          If you do not agree to these terms, please do not use the service.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>2. Decentralized Protocol ("As Is")</h2>
        <p>
          PerShare provides a user interface to interact with decentralized smart contracts on the BNB Smart Chain. 
          The protocol is provided "as is" and "as available" without any warranties of any kind. 
          You acknowledge that blockchain technology involves inherent risks, including bugs, hacks, and regulatory changes.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>3. No Financial Advice</h2>
        <p>
          PerShare is a software tool for coordinating collective transactions. We do not provide financial, investment, 
          or legal advice. Using PerShare to pool funds for presales or OTC deals is done entirely at your own risk. 
          We are not responsible for the success or failure of any external investments made through the protocol.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>4. User Responsibilities</h2>
        <p>
          You are solely responsible for the security of your cryptographic wallets and private keys. 
          If you lose access to your wallet, PerShare cannot recover your funds or allocations.
        </p>
      </section>
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
