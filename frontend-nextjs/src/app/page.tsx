'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PERSHARE_CONTRACTS } from '@/lib/contract';

// ── Data ──────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    id: 'social',
    label: 'Social',
    fee: '0.5%',
    bps: 50,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.3)',
    description: 'Charitable & community pools. Maximum accessibility.',
    address: PERSHARE_CONTRACTS.social,
    useCases: ['Charitable fundraising', 'Hackathon prize split', 'Community grant'],
    icon: '🤝',
  },
  {
    id: 'standard',
    label: 'Standard',
    fee: '1%',
    bps: 100,
    color: '#00D2FF',
    glow: 'rgba(0,210,255,0.15)',
    border: 'rgba(0,210,255,0.3)',
    description: 'The core product. Group buys, presales & community pools.',
    address: PERSHARE_CONTRACTS.standard,
    useCases: ['Presale syndicate', 'OTC group buy', 'Node purchase', 'Gaming guild'],
    icon: '🌊',
    popular: true,
  },
  {
    id: 'premium',
    label: 'Premium',
    fee: '2%',
    bps: 200,
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.15)',
    border: 'rgba(167,139,250,0.3)',
    description: 'High-value group operations: large co-purchases & shared assets.',
    address: PERSHARE_CONTRACTS.premium,
    useCases: ['Project treasury', 'Co-owned assets', 'Infra cost-sharing', 'Group co-purchase'],
    icon: '🚀',
  },
];

const USE_CASES = [
  { icon: '💸', tag: 'Standard', title: 'Presale Syndicate', desc: 'Minimum ticket too high? Pool with up to 50 wallets, reach any presale threshold. Tokens auto-distributed proportionally.' },
  { icon: '🪙', tag: 'Standard', title: 'OTC Group Buy', desc: 'Buy large token lots at discount directly from a whale or DAO — bypassing public markets entirely.' },
  { icon: '🌊', tag: 'Standard', title: 'Community Tontine', desc: "The digital ROSCA. Transparent, onchain, automatic. Each member's share is enforced by code — not a treasurer." },
  { icon: '🤝', tag: 'Social', title: 'Charity Pool', desc: 'Launch a GoFundMe-equivalent on BNB Chain. 100% transparent. Automatic refund if target is missed.' },
  { icon: '🏢', tag: 'Premium', title: 'Co-Owned Assets', desc: 'A group pools to co-acquire a tokenized asset together, then splits the resulting asset tokens proportionally to each contribution.' },
  { icon: '⛏️', tag: 'Premium', title: 'Infra Cost-Sharing', desc: 'Split the cost of shared infrastructure (e.g. ASIC miners) across a group, and distribute the outputs proportionally.' },
  { icon: '🎮', tag: 'Standard', title: 'Gaming Guild', desc: 'Fund expensive in-game assets together. Play-to-Earn revenues flow back to contributors via PerShare.' },
  { icon: '🚀', tag: 'Premium', title: 'Project Treasury Pool', desc: "A project's core contributors pool capital toward a shared on-chain goal. Funds release only when the group validates the threshold." },
  { icon: '🏆', tag: 'Social', title: 'Hackathon Prize', desc: 'Win a bounty as a team and split it instantly and proportionally, no bank required.' },
];

const HOW_STEPS = [
  { n: '1', title: 'Create the SHARE', desc: 'Name, members (up to 50), stablecoin, destination, target amount, deadline, and validation threshold.' },
  { n: '2', title: 'Members contribute', desc: 'Each member sends their share in USDT from their own wallet. Multiple contributions allowed.' },
  { n: '3', title: 'Collective validation', desc: 'Once the target is reached, members validate. The threshold is configurable — majority or unanimity.' },
  { n: '4', title: 'Automatic send', desc: 'The contract sends to the destination. If the deadline expires without send — automatic full refund.' },
];

const TAG_COLORS: Record<string, string> = {
  Social: '#10B981',
  Standard: '#00D2FF',
  Premium: '#a78bfa',
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [activeTier, setActiveTier] = useState(1);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Radial glow bg */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,210,255,0.08), transparent)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 80% 80%, rgba(167,139,250,0.06), transparent)', pointerEvents: 'none' }} />

        {/* Live badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '20px', padding: '6px 16px', fontSize: '13px', color: '#10B981', marginBottom: '32px', fontWeight: 600 }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite' }} />
          Live on BSC Mainnet · Audited by SpyWolf
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.02, marginBottom: '24px', maxWidth: '900px' }}>
          Every member receives<br />their{' '}
          <span style={{ background: 'linear-gradient(135deg, #00D2FF, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            fair share
          </span>.
          <span style={{ WebkitTextFillColor: 'unset', color: 'inherit' }} />
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.65, marginBottom: '48px' }}>
          Group pooling on BNB Chain. Pool funds, send collectively, and distribute tokens — automatically. Deposits stay locked in the audited contract until the group validates — or are fully refunded at the deadline.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '72px' }}>
          <Link href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #00D2FF, #0284c7)', color: '#000', padding: '14px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,210,255,0.3)', transition: 'all 0.2s' }}>
            Launch App →
          </Link>
          <a href="#how" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text)', padding: '14px 28px', borderRadius: '12px', fontWeight: 600, fontSize: '16px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s' }}>
            How it works
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { val: '0.5–2%', label: 'Fee on success only' },
            { val: '100%', label: 'Refund if target missed' },
            { val: '50', label: 'Max members per pool' },
            { val: 'Onchain', label: 'Verifiable on BscScan' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-1px' }}>{s.val}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEE TIERS ─────────────────────────────────────────────────────── */}
      <section id="tiers" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Pricing</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px' }}>One contract. Three tiers.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
            Three independent deployments of the same audited contract — each optimised for a use case.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {TIERS.map((tier, i) => (
            <div
              key={tier.id}
              onClick={() => setActiveTier(i)}
              style={{
                background: activeTier === i ? `linear-gradient(145deg, ${tier.glow}, rgba(20,28,47,0.8))` : 'var(--surface)',
                border: `1px solid ${activeTier === i ? tier.border : 'rgba(255,255,255,0.08)'}`,
                borderRadius: '20px',
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                transform: activeTier === i ? 'translateY(-4px)' : 'none',
                boxShadow: activeTier === i ? `0 20px 60px ${tier.glow}` : 'none',
              }}
            >
              {tier.popular && (
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #00D2FF, #0284c7)', color: '#000', fontSize: '11px', fontWeight: 800, padding: '4px 14px', borderRadius: '20px', whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
                  MOST POPULAR
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px' }}>{tier.icon}</div>
                <div style={{ background: `${tier.glow}`, border: `1px solid ${tier.border}`, color: tier.color, fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.05em' }}>
                  {tier.label.toUpperCase()}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 800, color: tier.color, lineHeight: 1, marginBottom: '8px', letterSpacing: '-2px' }}>{tier.fee}</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>fee on success only</div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '20px' }}>{tier.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {tier.useCases.map(uc => (
                  <span key={uc} style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 8px', color: 'var(--muted)' }}>{uc}</span>
                ))}
              </div>
              <a
                href={`https://bscscan.com/address/${tier.address}`}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', flexShrink: 0 }} />
                {tier.address.slice(0, 10)}...{tier.address.slice(-6)} ↗
              </a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--muted)', marginTop: '24px' }}>
          ✓ Fee on payout only &nbsp;·&nbsp; ✓ Zero fee on refunds &nbsp;·&nbsp; ✓ Zero subscription &nbsp;·&nbsp; ✓ Verifiable onchain
        </p>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────────────── */}
      <section id="usages" style={{ padding: '100px 24px', background: 'rgba(0,210,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Use Cases</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px' }}>Built for every collective.</h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
              One contract. Infinite use cases. Any group, any goal, any token.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {USE_CASES.map(uc => (
              <div key={uc.title} style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '28px', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${TAG_COLORS[uc.tag]}44`; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>{uc.icon}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: `${TAG_COLORS[uc.tag]}18`, color: TAG_COLORS[uc.tag], letterSpacing: '0.05em' }}>{uc.tag.toUpperCase()}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{uc.title}</div>
                <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how" style={{ padding: '100px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>How It Works</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px' }}>30 seconds to launch a SHARE.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {HOW_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #00D2FF, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 800, color: '#000', flexShrink: 0 }}>{step.n}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{step.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Live visual */}
          <div style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple2)', marginBottom: '20px', letterSpacing: '0.06em' }}>SHARE · Presale Round A 🚀</div>
            {[
              { dot: '#00D2FF', text: 'Pool created · 4 members', sub: 'Target 10,000 USDT · 14 days', active: true },
              { dot: '#10B981', text: '7,500 USDT collected', sub: 'alice.eth 2500 · bob.eth 2500 · 2 others...', active: true },
              { dot: '#F59E0B', text: 'Target reached · Validation', sub: '3/4 validations required', active: true },
              { dot: '#a78bfa', text: '9,900 USDT → PresaleContract.eth', sub: '100 USDT commission PerShare (1%)', active: false },
            ].map((item, i) => (
              <div key={i}>
                {i > 0 && <div style={{ textAlign: 'center', color: 'var(--purple2)', fontSize: '18px', padding: '4px 0', opacity: 0.5 }}>↓</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: item.active ? 'rgba(0,210,255,0.06)' : 'transparent', border: item.active ? '1px solid rgba(0,210,255,0.15)' : '1px solid transparent' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.text}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{item.sub}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              Every step verifiable on BscScan
            </div>
          </div>
        </div>
      </section>

      {/* ── GETTING STARTED ───────────────────────────────────────────────── */}
      <section id="global" style={{ padding: '100px 24px', background: 'rgba(167,139,250,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>Getting Started</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-2px', marginBottom: '16px' }}>All you need is USDT on BNB Chain.</h2>
          <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '12px' }}>
            PerShare works with any wallet holding USDT on BNB Chain. Already have funds in your wallet? Connect and launch a SHARE in seconds.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.6 }}>
            Need USDT first? Use any exchange or on-ramp of your choice and withdraw to your wallet. PerShare does not handle on-ramps, fiat conversion, or custody.
          </p>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,210,255,0.06), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-2.5px', marginBottom: '20px', lineHeight: 1.05 }}>
            Ready to create your first SHARE?
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '48px', lineHeight: 1.6 }}>
            PerShare is live on BSC Mainnet. Connect your wallet and launch your first pool in 30 seconds.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/app" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #00D2FF, #0284c7)', color: '#000', padding: '16px 36px', borderRadius: '14px', fontWeight: 800, fontSize: '17px', textDecoration: 'none', boxShadow: '0 12px 40px rgba(0,210,255,0.35)', letterSpacing: '-0.3px' }}>
              Launch App →
            </Link>
            <a href="https://t.me/pershare_org" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text)', padding: '16px 36px', borderRadius: '14px', fontWeight: 600, fontSize: '17px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              Join Telegram
            </a>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '24px' }}>
            Audited by SpyWolf · Automatic refunds · Live on BNB Chain
          </p>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (max-width: 768px) {
          #how > div > div:last-child > div:last-child { display: none; }
        }
      `}</style>
    </>
  );
}
