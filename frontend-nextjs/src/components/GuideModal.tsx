import React from 'react';

export function GuideModal({ onClose }: { onClose: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '24px'
    }}>
      <div style={{
        background: 'var(--surface)', padding: '32px', borderRadius: '16px',
        width: '100%', maxWidth: '700px', border: '1px solid var(--border)',
        maxHeight: '85vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: 'var(--purple)' }}>How it works?</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '24px' }}>&times;</button>
        </div>
        
        <div style={{ lineHeight: '1.6', color: 'var(--text)' }}>
          <p><strong>PerShare</strong> is a decentralized platform (Smart Contract) allowing a group of investors to pool their funds (USDT) trustlessly to participate in OTC investments or presales (ICO).</p>
          
          <h3 style={{ marginTop: '24px', color: '#E2E8F0', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>PerShare Use Cases</h3>
          <p style={{ marginBottom: '16px' }}>The "Secure Collection → Validated Sending → Automatic Redistribution" mechanism adapts to many needs:</p>
          
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr' }}>
            {/* Category 1 */}
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: '4px solid var(--purple)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#E2E8F0' }}>🔒 Secure a transaction (Escrow)</h4>
              <ul style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong style={{ color: 'var(--text)' }}>Beat Fiverr/Upwork ⭐:</strong> Stop paying 30% in fees. Client & Freelancer create a Share. Client deposits, delivery triggers cross-validation. <strong>Total cost: 1% max.</strong></li>
                <li><strong style={{ color: 'var(--text)' }}>Instant P2P Escrow:</strong> Buyer deposits, seller ships the item, cross-validation releases funds.</li>
                <li><strong style={{ color: 'var(--text)' }}>Personal Vault:</strong> Multisig Auto-Safe for your own wallets.</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#E2E8F0' }}>🚀 Invest together (Presale / Group Buy)</h4>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 12px 0' }}>The pool collects USDT and sends a single ticket to the presale. Safety net: money is locked until majority validates. 100% refund at deadline if aborted.</p>
              <ul style={{ fontSize: '13px', color: 'var(--text)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Automatic Push ⭐:</strong> Destination = presale contract. Presale automatically sends tokens back.</li>
                <li><strong>Seller Push ⭐:</strong> Seller does a manual `transfer()` back to the contract. Zero risk for you.</li>
                <li><strong>Claim Mode ⚠️:</strong> Destination = your wallet. You claim tokens manually, then send them to PerShare for Phase 3.</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#E2E8F0' }}>👥 Pool money (Money Pool / Tontine)</h4>
              <ul style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong style={{ color: 'var(--text)' }}>Joint account without a bank:</strong> Pay for a shared vacation rental or Kickstarter. Collective validation.</li>
                <li><strong style={{ color: 'var(--text)' }}>Trustless Crypto Tontine:</strong> Collective pool among crypto members. Code holds the money securely.</li>
              </ul>
            </div>

            {/* Category 4 */}
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#E2E8F0' }}>💰 Distribute gains (Proportional)</h4>
              <ul style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong style={{ color: 'var(--text)' }}>Dispute-free Revenue Sharing:</strong> Native proportional distribution for one-off revenues among creators.</li>
                <li><strong style={{ color: 'var(--text)' }}>Hackathon Prize Pool:</strong> Distribute winnings automatically between team members.</li>
                <li><strong style={{ color: 'var(--text)' }}>Trading Pool:</strong> Distribute hedge fund trading profits.</li>
              </ul>
            </div>
          </div>

          <h3 style={{ marginTop: '32px', color: '#E2E8F0' }}>Why use PerShare?</h3>
          <p>
            Forget blind trust. With PerShare, <strong>code is law</strong>: the collection is refundable (Deadline), sending requires majority agreement (Threshold), and redistribution is flawless.
          </p>

          <button onClick={onClose} style={{ width: '100%', marginTop: '32px', padding: '16px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
