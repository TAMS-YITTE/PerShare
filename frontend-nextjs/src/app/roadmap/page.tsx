import React from 'react';

export default function Roadmap() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>Roadmap</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          The future of decentralized group pooling.
        </p>

        <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: '2px solid rgba(0, 210, 255, 0.2)' }}>
          
          <div style={{ position: 'relative', marginBottom: '48px' }}>
            <div style={{ position: 'absolute', left: '-41px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: '#00D2FF', border: '4px solid var(--bg)' }}></div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '8px' }}>Q2 2026 - Mainnet Launch (Current)</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Deployment of PerShare V1 on BNB Chain. Launch of the App UI for OTC deals and automated fractional distribution.</p>
          </div>

          <div style={{ position: 'relative', marginBottom: '48px' }}>
            <div style={{ position: 'absolute', left: '-41px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '4px solid var(--bg)' }}></div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Q4 2026 - NFT Fractionalization</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Extending Phase 2 logic to support ERC-721 and ERC-1155. Groups will be able to pool funds to acquire high-value NFTs and automatically receive fractionalized shares.</p>
          </div>

          <div style={{ position: 'relative', marginBottom: '48px' }}>
            <div style={{ position: 'absolute', left: '-41px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '4px solid var(--bg)' }}></div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Q1 2027 - Cross-Chain Expansion</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Deploying PerShare smart contracts on Arbitrum, Base, and Polygon to reduce fees and capture cross-chain communities.</p>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-41px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '4px solid var(--bg)' }}></div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Q2 2027 - Decentralized Governance</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Introduction of the SHARE token for platform governance, fee redistribution, and premium pool features.</p>
          </div>

        </div>
      </div>
    </main>
  );
}
