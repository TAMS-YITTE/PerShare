import React from 'react';

export default function Privacy() {
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: '#fff' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Last updated: June 20, 2026</p>
      </header>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>1. Data We Collect</h2>
        <p>
          As a Web3 protocol, PerShare values your privacy. We do not require you to create an account, provide your name, 
          or supply an email address to use our smart contracts. The only data associated with your usage is your public 
          blockchain address, which is inherently public on the BNB Smart Chain.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>2. Cookies and Local Storage</h2>
        <p>
          Our website uses minimal cookies and local storage strictly to save your UI preferences (like hiding the introductory guide) 
          and to maintain your connection to WalletConnect/RainbowKit. We do not use third-party tracking cookies or sell your data to advertisers.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>3. Public Blockchain Data</h2>
        <p>
          Please be aware that any transactions made through PerShare are broadcasted to the public BNB Smart Chain. 
          Information such as your wallet address, transaction amounts, and timestamps are permanently visible on block explorers 
          (e.g., BscScan) and cannot be deleted by us.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>4. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@pershare.org" style={{ color: 'var(--purple)' }}>support@pershare.org</a>.
        </p>
      </section>
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
