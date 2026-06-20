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
            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong>1. Private Presale / ICO (Web3 Syndicate)</strong><br/>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Pool funds to reach a minimum investment ticket. Phase 3 redistributes the received tokens mathematically in a single drop.</span>
              <ul style={{ fontSize: '13px', color: 'var(--text)', marginTop: '8px', paddingLeft: '20px' }}>
                <li><strong>Automatic Presale Push ⭐</strong>: destination = presale contract. PerShare sends USDT, presale automatically sends tokens back (works ONLY IF the presale does a return `transfer()`).</li>
                <li><strong>Request a Push from seller ⭐</strong>: "Send the tokens to our contract address". Seller does a manual `transfer()` (trivial for them, zero risk for you).</li>
                <li><strong>Personal EOA Wallet</strong>: destination = your wallet. You receive USDT, buy/claim yourself, and send tokens back to PerShare.</li>
              </ul>
            </div>

            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong>2. Crowdfunding / Kickstarter</strong><br/>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Fund a creative project. If the target isn't met before the deadline, the contract refunds everyone. If successful, Phase 3 can be used (optional) to airdrop a reward token!</span>
            </div>

            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong>3. Shared Money Pool (Friends & Family)</strong><br/>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>Pay for a vacation rental or a shared gift in stablecoin without fronting the cost. The Destination is the organizer. Phase 3 is simply ignored.</span>
            </div>

            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong>4. Trading Pool (Ephemeral Hedge Fund)</strong><br/>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>A trusted trader raises funds (Phase 1), executes trades over a cycle, then converts all profits into a single token sent back for distribution via Phase 3.</span>
            </div>

            <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <strong>5. Personal Vault (Multisig Auto-Safe)</strong><br/>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>A user creates a Share using their own wallets (e.g. PC, Mobile, Spouse) with a threshold of 2 or 3. Funds are locked securely. To unlock, they must validate with multiple devices, replacing a hardware wallet!</span>
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
