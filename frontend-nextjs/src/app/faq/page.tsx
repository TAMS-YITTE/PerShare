import React from 'react';

export default function FAQ() {
  return (
    <main style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#fff' }}>Frequently Asked Questions</h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', fontWeight: 700 }}>Is my money safe?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            Your funds are locked in a self-custodial smart contract deployed on BNB Chain. The contract ensures that funds can only be released to the predefined destination upon group approval, or fully refunded if the deadline passes. The contract is admin-pausable purely for emergency security.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', fontWeight: 700 }}>Who controls the funds?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            No single person. The pool requires collective validation from its members to authorize the final transfer. If the group does not reach consensus before the expiration date, every member can autonomously withdraw their exact contribution.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', fontWeight: 700 }}>What fees do I pay?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            You pay absolutely nothing to create a pool or to deposit funds. The protocol only deducts a success fee (0.5% to 2% depending on the tier chosen) from the final destination payout. If the pool fails, 100% of your deposit is refunded with zero fees.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', fontWeight: 700 }}>Can someone kick me out of a SHARE?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            No. Once a SHARE is created, its member list is fixed onchain and cannot be edited. Nobody — not other members, not the team — can remove you or reassign your allocation.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '12px', fontWeight: 700 }}>What are the main use cases for PerShare?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            PerShare is incredibly versatile. The most common use cases include: <br/><br/>
            • <b>Group Buys &amp; Shared Acquisitions:</b> Pooling with your group to reach a high minimum ticket together.<br/>
            • <b>OTC Group Purchases:</b> Buying a large token lot together directly from a counterparty.<br/>
            • <b>Web3 Tontines:</b> Transparent savings pools among friends or community members.
          </p>
        </div>

      </div>
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#00D2FF', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
