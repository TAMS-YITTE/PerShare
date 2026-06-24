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
            Your funds are not held by us — they are locked in the smart contract and can only move to the destination once your SHARE reaches its
            validation threshold, or back to you as a refund after the deadline. We cannot redirect or withdraw your funds to ourselves. For security,
            the contract does include an owner-controlled pause (kill-switch) that can temporarily halt transactions if a vulnerability is detected — it
            cannot divert funds, but it can delay their movement while active.
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
            PerShare applies a protocol fee on the stablecoin payout only — 0.5% (Social), 1% (Standard) or 2% (Premium), depending on which contract you use.
            The fee is charged only when a pool succeeds: there are NO fees on refunds and NO fees during the token distribution phase. You only pay the standard BNB Chain network gas fees.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>Can someone kick me out of a SHARE?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            No. Once a SHARE is created, its member list is fixed onchain and cannot be edited. Nobody — not other members, not the team —
            can remove you or reassign your allocation.
          </p>
        </div>

        <div style={{ background: 'var(--surface)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>What are the main use cases for PerShare?</h3>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            PerShare is incredibly versatile. The most common use cases include: <br/><br/>
            • <b>Group Buys & Presales:</b> Pooling with your group to reach a high minimum ticket together.<br/>
            • <b>OTC Group Purchases:</b> Buying a large token lot together directly from a counterparty.<br/>
            • <b>NFT Fractionalization:</b> Pooling to co-acquire an expensive NFT (coming in V2).<br/>
            • <b>Web3 Tontines:</b> Transparent savings pools among friends or community members.
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
