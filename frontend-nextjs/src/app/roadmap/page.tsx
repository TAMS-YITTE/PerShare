import React from 'react';

export default function Roadmap() {
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: '#fff' }}>Roadmap</h1>
        <p style={{ color: 'var(--purple)', fontSize: '18px' }}>The future of PerShare</p>
      </header>

      <div style={{ position: 'relative', borderLeft: '2px solid var(--purple)', paddingLeft: '24px', marginLeft: '12px' }}>
        
        {/* V1 */}
        <div style={{ marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-33px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--purple)', border: '4px solid var(--bg)' }}></div>
          <h2 style={{ fontSize: '24px', color: '#fff', marginTop: '-4px' }}>V1: The Foundation <span style={{ fontSize: '14px', background: 'var(--purple)', padding: '2px 8px', borderRadius: '12px', marginLeft: '12px', verticalAlign: 'middle' }}>Live</span></h2>
          <ul style={{ color: 'var(--muted)', marginTop: '16px', paddingLeft: '20px' }}>
            <li>Smart Contract deployed on BNB Smart Chain.</li>
            <li>Trustless Escrow for Stablecoins (USDT/USDC).</li>
            <li>Proportional Distribution of BEP-20 Tokens.</li>
            <li>Multi-signature consensus for funds movement.</li>
            <li>Security Audit (In Progress).</li>
          </ul>
        </div>

        {/* V2 */}
        <div style={{ marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-33px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--border)', border: '4px solid var(--bg)' }}></div>
          <h2 style={{ fontSize: '24px', color: '#fff', marginTop: '-4px' }}>V2: Advanced Tokenomics <span style={{ fontSize: '14px', color: 'var(--muted)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '12px', marginLeft: '12px', verticalAlign: 'middle' }}>Upcoming</span></h2>
          <ul style={{ color: 'var(--muted)', marginTop: '16px', paddingLeft: '20px' }}>
            <li><strong>Onchain Vesting:</strong> Automatic time-locked distributions for presale tokens (Cliff + Linear vesting support).</li>
            <li><strong>Internal Swaps:</strong> Integration with PancakeSwap to allow members to swap their share of tokens immediately upon receipt.</li>
            <li><strong>Fiat On-Ramp:</strong> Buy stablecoins directly via credit card on the PerShare Dashboard.</li>
          </ul>
        </div>

        {/* V3 */}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '-33px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--border)', border: '4px solid var(--bg)' }}></div>
          <h2 style={{ fontSize: '24px', color: '#fff', marginTop: '-4px' }}>V3: The Omnichain Protocol <span style={{ fontSize: '14px', color: 'var(--muted)', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: '12px', marginLeft: '12px', verticalAlign: 'middle' }}>Future</span></h2>
          <ul style={{ color: 'var(--muted)', marginTop: '16px', paddingLeft: '20px' }}>
            <li><strong>Cross-chain Pooling:</strong> Create a SHARE on BSC, buy tokens on Ethereum, and distribute on Arbitrum.</li>
            <li><strong>NFT Group Buying:</strong> Pool funds to acquire high-value ERC-721 NFTs and fractionalize ownership among members.</li>
            <li><strong>DAO Integration:</strong> Allow DAOs to use PerShare as their primary treasury diversification tool.</li>
          </ul>
        </div>

      </div>
      
      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Home</a>
      </div>
    </main>
  );
}
