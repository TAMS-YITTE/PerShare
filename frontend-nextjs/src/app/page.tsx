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
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,210,255,0.08), transparent)', pointerEvents: 'none' }} />
        
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px' }}>
          Secure every pool. <br/>Pay only on <span className="text-gradient">success</span>.
        </h1>
        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', maxWidth: '600px', lineHeight: 1.6, marginBottom: '48px' }}>
          The universal decentralized pooling platform for communities, DAOs, and group buys. Self-custodial deposits, automatic refunds.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/app" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            Launch App
          </Link>
          <a href="#how" className="btn-outline" style={{ padding: '14px 32px', fontSize: '1.1rem' }}>
            How it works
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

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how" style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, textAlign: 'center', marginBottom: '64px' }}>How it works?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {/* Step 1 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,210,255,0.1)', color: '#00D2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>1. Secure Deposit</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Members deposit USDT into a tamper-proof smart contract. Funds are locked safely onchain.</p>
          </div>
          {/* Step 2 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>2. Collective Target</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>The pool remains open until the deadline. Everyone tracks progress on BscScan transparently.</p>
          </div>
          {/* Step 3 */}
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(167,139,250,0.1)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>3. Release or Refund</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>If the target is validated, funds are transferred. If missed by the deadline, automatic refund.</p>
          </div>
        </div>

        {/* Audit Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', background: 'rgba(0, 210, 255, 0.05)', border: '1px solid rgba(0, 210, 255, 0.2)', borderRadius: '16px', padding: '24px', flexWrap: 'wrap' }}>
          <svg width="32" height="32" fill="none" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Smart Contract Audited</h3>
          <a href="/PerShare_Audit_R2.pdf" target="_blank" className="text-gradient" style={{ fontWeight: 600, textDecoration: 'none', marginLeft: 'auto' }}>
            View the full report →
          </a>
        </div>
      </section>

      {/* ── TRANSPARENT FEES (CALCULATOR) ─────────────────────────────────── */}
      <section style={{ background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '100px 24px' }}>
        <div className="glass-panel" style={{ maxWidth: '500px', margin: '0 auto', padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Transparent Fees</h3>
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Calculate exactly what you pool and what reaches the destination.</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>Pool Amount (USDT)</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--muted)', fontWeight: 700 }}>$</span>
              <input 
                type="number" 
                value={calcAmount}
                onChange={e => setCalcAmount(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 16px 14px 36px', color: '#fff', fontSize: '20px', fontWeight: 700, outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>Select Tier</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { val: 0.005, label: 'Social (0.5%)' },
                { val: 0.01, label: 'Standard (1%)' },
                { val: 0.02, label: 'Premium (2%)' }
              ].map(t => (
                <button
                  key={t.val}
                  onClick={() => setCalcTier(t.val as any)}
                  style={{ flex: 1, padding: '10px 4px', background: calcTier === t.val ? 'rgba(0,210,255,0.15)' : 'rgba(0,0,0,0.3)', border: calcTier === t.val ? '1px solid #00D2FF' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: calcTier === t.val ? '#00D2FF' : 'var(--muted)', fontSize: '12px', fontWeight: calcTier === t.val ? 700 : 500, cursor: 'pointer' }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px' }}>
              <span style={{ color: 'var(--muted)' }}>Members deposit:</span>
              <span style={{ fontWeight: 700 }}>{amount.toFixed(2)} USDT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.2)', borderRadius: '12px' }}>
              <span style={{ color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                PerShare Fee
              </span>
              <span style={{ color: '#a78bfa', fontWeight: 700 }}>-{feeAmount.toFixed(2)} USDT</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px' }}>
              <span style={{ color: '#10B981', fontWeight: 700 }}>Destination receives:</span>
              <span style={{ color: '#10B981', fontWeight: 800, fontSize: '20px' }}>{receiveAmount.toFixed(2)} USDT</span>
            </div>
          </div>
          
          <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center', marginTop: '24px', lineHeight: 1.5 }}>
            The fee is only deducted from the destination payout upon successful validation. 100% refund to contributors if the pool is cancelled or expires.
          </p>
        </div>
      </section>


    </>
  );
}
