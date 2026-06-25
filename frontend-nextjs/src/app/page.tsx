'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [calcAmount, setCalcAmount] = useState('1000');
  const [calcTier, setCalcTier] = useState<0.005 | 0.01 | 0.02>(0.01);

  const amount = parseFloat(calcAmount) || 0;
  const feeAmount = amount * calcTier;
  const receiveAmount = amount - feeAmount;

  return (
    <>
      <style>{`
        .glass-panel {
          background: rgba(20, 28, 47, 0.4);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
        }
        .text-gradient {
          background: linear-gradient(135deg, #00D2FF, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-primary {
          background: linear-gradient(135deg, #00D2FF, #0284c7);
          color: #000;
          font-weight: 700;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-primary:hover {
          box-shadow: 0 8px 32px rgba(0, 210, 255, 0.3);
        }
        .btn-outline {
          background: transparent;
          color: var(--text);
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .why-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,210,255,0.08), transparent)', pointerEvents: 'none' }} />
        
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px' }}>
          The Onchain <span className="text-gradient">Group Buy</span> Protocol.
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', maxWidth: '600px', lineHeight: 1.6, marginBottom: '48px' }}>
          Pool USDT securely, acquire assets together, and let the smart contract automatically distribute the tokens pro-rata.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
          <Link href="/app" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Launch App
          </Link>
          <a href="#how" className="btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            How it works
          </a>
        </div>

        {/* Compact Audit Banner */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '20px 40px', zIndex: 10 }}>
          <svg width="24" height="24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#fff' }}>Smart Contract Audited</h3>
          <a href="https://spywolf.co/audits/PerShare_Audit.pdf" target="_blank" rel="noreferrer" style={{ color: '#10B981', fontSize: '15px', textDecoration: 'none', fontWeight: 500, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = '0.8'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            View the full report →
          </a>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 24px' }}>
          <div className="glass-panel" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Refund Guarantee</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>100% on failure</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Max Pool Members</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>Up to 50</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Success Fee</span>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text)' }}>0.5% – 2.0%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO WAYS TO USE ───────────────────────────────────────────────── */}
      <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#00D2FF', textTransform: 'uppercase', letterSpacing: '0.12em' }}>One contract, two flows</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '12px 0 16px' }}>Two ways to use PerShare</h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
            Whatever the group is paying for, funds stay locked in the contract until the members approve the transfer — or are refunded at the deadline.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Branch A */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🪙</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#a78bfa', marginBottom: '8px' }}>POOL &amp; DISTRIBUTE · TOKENS &amp; ASSETS</div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Buy together, split automatically</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '15px', marginBottom: '16px' }}>
              A group acquires tokens or assets together. The seller returns them to the contract, which splits them pro-rata to every member — automatically.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Presale syndicate', 'OTC group buy', 'NFT (soon)'].map(x => (
                <span key={x} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 10px', color: 'var(--muted)' }}>{x}</span>
              ))}
            </div>
          </div>
          {/* Branch B */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛒</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', marginBottom: '8px' }}>POOL &amp; PAY · GOODS &amp; SERVICES</div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Fund a purchase together</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '15px', marginBottom: '16px' }}>
              A group funds a single purchase or service and pays one vendor together. No tokens to split — just a transparent collective payment, released only on the group&apos;s approval.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Bulk B2B order', 'Shared equipment', 'Group booking', 'Hire a contractor'].map(x => (
                <span key={x} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 10px', color: 'var(--muted)' }}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how" style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, textAlign: 'center', marginBottom: '64px' }}>How it works?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {/* Step 1 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,210,255,0.1)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>1. Pool Funds</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '14px' }}>Members deposit USDT. If the target isn't reached, everyone gets a 100% refund.</p>
          </div>
          {/* Step 2 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>2. Approve &amp; Send</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '14px' }}>Once the target is met, the group validates and USDT is released to the destination — a token seller, or a vendor for goods &amp; services.</p>
          </div>
          {/* Step 3 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(167,139,250,0.1)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '6px', padding: '2px 8px', marginBottom: '10px', letterSpacing: '0.04em' }}>TOKEN POOLS</span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>3. Receive Tokens</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '14px' }}>The seller deposits the acquired tokens back into the PerShare smart contract.</p>
          </div>
          {/* Step 4 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', border: '1px solid rgba(0,210,255,0.4)', boxShadow: '0 0 20px rgba(0, 210, 255, 0.1)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,210,255,0.1)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, color: '#a78bfa', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '6px', padding: '2px 8px', marginBottom: '10px', letterSpacing: '0.04em' }}>TOKEN POOLS</span>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>4. Auto-Distribute</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '14px' }}>Tokens are automatically fractionalized and distributed to each member, perfectly pro-rata. <span style={{ color: '#10B981' }}>Goods &amp; services pools finish at step 2.</span></p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <Link href="/how-pools-work" className="text-gradient" style={{ fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>
            See the full walkthrough →
          </Link>
        </div>
      </section>

      {/* ── AUTOMATIC DISTRIBUTION (DEEP DIVE) ────────────────────────────── */}
      <section style={{ background: 'rgba(167,139,250,0.03)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Collective pooling, settled by code</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '12px 0 16px' }}>
              Everyone receives their <span className="text-gradient">exact share</span>.
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto' }}>
              The hardest part of investing as a group has always been splitting the result fairly. PerShare records every member&apos;s deposit on-chain and computes their fraction automatically — so each person claims exactly what they are owed. No treasurer, no spreadsheet, no trust.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
            {/* Left: formula + properties */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>The on-chain formula</span>
                <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '10px', color: '#fff', fontSize: '13px', marginTop: '10px', overflowX: 'auto', lineHeight: 1.5 }}>
<code>yourTokens = totalReceived
             × yourDeposit
             ÷ poolTotal</code>
                </pre>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#10B981', marginBottom: '4px', fontSize: '15px' }}>Pull pattern</div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>Each member claims their own tokens directly. No one can ever claim your share, and the team can&apos;t touch it.</p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#00D2FF', marginBottom: '4px', fontSize: '15px' }}>Vesting-ready</div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>When later token tranches arrive, the same math tops up everyone&apos;s claim automatically — pro-rata, every time.</p>
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#a78bfa', marginBottom: '4px', fontSize: '15px' }}>Dust-safe</div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>Rounding remainders are swept cleanly by the pool creator, never left stuck in the contract.</p>
                </div>
              </div>
            </div>

            {/* Right: worked example */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#a78bfa', marginBottom: '4px' }}>WORKED EXAMPLE · Presale syndicate</div>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
                3 members pool <strong style={{ color: '#fff' }}>10,000 USDT</strong> to buy a presale ticket. The seller returns <strong style={{ color: '#fff' }}>1,000,000 ABC</strong> into the contract.
              </p>
              {[
                { name: 'Alice', dep: '5,000', pct: '50%', tok: '500,000', color: '#00D2FF' },
                { name: 'Bob', dep: '3,000', pct: '30%', tok: '300,000', color: '#10B981' },
                { name: 'Carol', dep: '2,000', pct: '20%', tok: '200,000', color: '#a78bfa' },
              ].map(m => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.color }} />
                    <span style={{ fontWeight: 600, fontSize: '14px' }}>{m.name}</span>
                    <span style={{ color: 'var(--muted)', fontSize: '12px' }}>{m.dep} USDT · {m.pct}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '14px', color: m.color }}>{m.tok} ABC</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', fontSize: '13px', color: 'var(--muted)' }}>
                <span>Auto-distributed pro-rata</span>
                <span style={{ color: '#10B981', fontWeight: 700 }}>1,000,000 ABC total ✓</span>
              </div>
              <Link href="/how-pools-work" className="text-gradient" style={{ fontWeight: 600, textDecoration: 'none', fontSize: '14px', marginTop: '24px' }}>
                See the full mechanics →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PERSHARE ──────────────────────────────────────────────────── */}
      <section id="why" style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Why PerShare</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '12px 0 16px' }}>Group payments without the middleman tax</h2>
          <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
            Pooling money usually means trusting a platform that holds your funds and takes a heavy cut. PerShare replaces that intermediary with audited code on BNB Chain.
          </p>
        </div>

        <div className="why-grid">
          {/* Left: comparison table */}
          <div className="glass-panel" style={{ padding: '8px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '520px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  {['', 'PerShare', 'Freelance platforms', 'Crowdfunding', 'PayPal'].map((h, i) => (
                    <th key={i} style={{ padding: '14px', fontSize: '13px', color: i === 1 ? '#00D2FF' : 'var(--muted)', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Average fees', '0.5% – 2%', '20% – 30%', '3% – 5%', '3% – 6%'],
                  ['Funds held by', 'Smart-contract code', 'The company', 'The company', 'The company'],
                  ['Bank account required', 'No', 'Yes', 'Yes', 'Yes'],
                  ['Instant global payout', 'Yes', 'No (days)', 'No (days)', 'Partial (FX)'],
                  ['Automatic pro-rata split', 'Yes', 'No', 'No', 'No'],
                ].map((row, r) => (
                  <tr key={r} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {row.map((cell, c) => (
                      <td key={c} style={{ padding: '14px', fontSize: '14px', fontWeight: c === 1 ? 700 : 400, color: c === 0 ? 'var(--text)' : c === 1 ? '#10B981' : 'var(--muted)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: slim fee calculator */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#00D2FF', letterSpacing: '0.04em' }}>FEE CALCULATOR</div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>Pool amount (USDT)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--muted)', fontWeight: 700 }}>$</span>
                <input
                  type="number"
                  value={calcAmount}
                  onChange={e => setCalcAmount(e.target.value)}
                  style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '12px 14px 12px 32px', color: '#fff', fontSize: '18px', fontWeight: 700, outline: 'none' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: '6px' }}>Tier</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { val: 0.005, label: 'Social', sub: '0.5%' },
                  { val: 0.01, label: 'Standard', sub: '1%' },
                  { val: 0.02, label: 'Premium', sub: '2%' },
                ].map(t => (
                  <button
                    key={t.val}
                    onClick={() => setCalcTier(t.val as any)}
                    style={{ flex: 1, padding: '8px 4px', background: calcTier === t.val ? 'rgba(0,210,255,0.15)' : 'rgba(0,0,0,0.3)', border: calcTier === t.val ? '1px solid #00D2FF' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: calcTier === t.val ? '#00D2FF' : 'var(--muted)', fontSize: '12px', fontWeight: calcTier === t.val ? 700 : 500, cursor: 'pointer', lineHeight: 1.3 }}
                  >
                    {t.label}<br /><span style={{ fontSize: '10px', opacity: 0.8 }}>{t.sub}</span>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#a78bfa' }}>
              <span>PerShare fee</span>
              <span style={{ fontWeight: 700 }}>-{feeAmount.toFixed(2)} USDT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px' }}>
              <span style={{ color: '#10B981', fontWeight: 700, fontSize: '13px' }}>Destination gets</span>
              <span style={{ color: '#10B981', fontWeight: 800, fontSize: '18px' }}>{receiveAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '24px' }}>
          Indicative public fees, June 2026. Fee is deducted from the destination payout on success only — 100% refund if the pool is cancelled or expires. PerShare is non-custodial infrastructure; an admin pause exists for emergencies (see <a href="/risks" className="text-gradient" style={{ textDecoration: 'none' }}>Risks &amp; Disclaimers</a>).
        </p>
      </section>

      {/* (Fee calculator moved into the Why PerShare section) */}
          
    </>
  );
}
