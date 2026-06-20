import React from 'react';

export default function FAQ() {
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: '#fff' }}>FAQ</h1>
        <p style={{ color: 'var(--purple)', fontSize: '18px' }}>Frequently Asked Questions</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>Is my money safe?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            Yes. PerShare is a non-custodial smart contract. We never hold your funds. The funds are locked in the blockchain 
            and can only move if the majority of the members in your SHARE validate the transaction. Even the developers of PerShare cannot access your money.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>What happens if a member doesn't pay?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            If the target amount is not reached before the deadline, the SHARE expires. All members who have contributed can then 
            withdraw their funds automatically. No money is sent to the destination unless the pool is 100% complete.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>What are the fees?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            PerShare takes a small protocol fee (currently set to 0% during the launch phase) on the stablecoin deposits. 
            There are NO fees on the token distribution phase. You only pay the standard BNB Chain network gas fees.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>Can someone kick me out of a SHARE?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            No. Immutability is our core feature. Once a SHARE is deployed, its members are written into the blockchain permanently. 
            Nobody can kick you out or steal your allocation.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>Which blockchains are supported?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            Currently, PerShare operates exclusively on the BNB Smart Chain (BSC) to ensure ultra-low transaction fees and fast execution.
          </p>
        </div>

      </div>
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
