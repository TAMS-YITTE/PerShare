import React from 'react';

export default function Terms() {
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: '#fff' }}>Terms of Use</h1>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Last updated: June 24, 2026</p>
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

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>5. Eligibility &amp; Restricted Jurisdictions</h2>
        <p>
          You represent that you are at least 18 years old and have the legal capacity to accept these Terms. PerShare is not
          offered to, and may not be used by, any person or entity that resides in, is located in, is incorporated in, or has a
          registered office in any jurisdiction where use of the protocol would be unlawful, nor by any person or entity subject
          to applicable sanctions. By using PerShare, you represent that you are not such a restricted person and are not acting on
          behalf of one.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>6. Not a Custodian, Broker, or Financial Intermediary</h2>
        <p>
          PerShare is not a bank, custodian, broker, dealer, exchange, payment institution, money services business, or investment
          adviser, and does not hold, manage, or control user funds on a discretionary basis. The protocol is a set of autonomous
          smart contracts: PerShare does not take possession of your assets, does not execute investments on your behalf, and does
          not guarantee the outcome of any pool. Any protocol fee is a software usage fee, not compensation for financial
          intermediation.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>7. Compliance &amp; Taxes</h2>
        <p>
          You are solely responsible for determining whether, and to what extent, your use of PerShare is lawful in your
          jurisdiction, and for complying with all applicable laws — including securities, anti-money-laundering, sanctions, and tax
          obligations. You are responsible for reporting and paying any taxes arising from your activity. PerShare does not provide
          tax or legal advice.
        </p>
      </section>

      <section style={{ marginBottom: '32px', color: 'var(--muted)' }}>
        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>8. Protocol Availability, Upgrades &amp; Pause</h2>
        <p>
          To protect users, the smart contracts include an administrative pause (&quot;kill-switch&quot;) that may temporarily halt
          transactions if a vulnerability, exploit, or other risk is identified. While paused, deposits, validations, sends, and
          refunds may be delayed. This mechanism cannot redirect or seize your funds. PerShare may also deploy new contract
          versions; use of any version is at your discretion. The service may be modified, suspended, or discontinued at any time
          without notice.
        </p>
      </section>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
