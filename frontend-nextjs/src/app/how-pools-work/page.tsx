import React from 'react';

export default function HowPoolsWork() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>How Pools Work</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          Understanding the lifecycle of a PerShare pool.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '12px' }}>1. Creation</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>The Pool Creator defines the target amount, the deadline, the destination address (e.g., an OTC seller), and whitelists the wallet addresses of the members.</p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#10B981', marginBottom: '12px' }}>2. Deposit & Consensus</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Whitelisted members deposit USDT directly into the smart contract. Once the target is reached, members must validate the transfer. If the target is missed before the deadline, everyone can claim a 100% refund.</p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#a78bfa', marginBottom: '12px' }}>3. Group Buy Execution</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Upon consensus, the smart contract automatically transfers the pooled USDT to the destination address. The pool enters Phase 2.</p>
          </div>

          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0, 210, 255, 0.3)', boxShadow: '0 0 20px rgba(0, 210, 255, 0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '12px' }}>4. Automatic Redistribution</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>The seller sends the purchased tokens (or assets) back to the PerShare contract. The contract automatically calculates each member's exact fractional share based on their initial deposit, allowing them to claim their tokens instantly.</p>
          </div>
        </div>

        {/* ── POOL & PAY (GOODS & SERVICES) ───────────────────────────── */}
        <div style={{ marginTop: '64px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', padding: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 800, marginBottom: '12px' }}>
            Not buying tokens? <span style={{ color: '#10B981' }}>Pool &amp; Pay</span> for goods &amp; services
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '16px' }}>
            The same pool works when a group simply needs to pay one vendor together — a bulk order, shared equipment, a group booking, or hiring a contractor. The flow stops at step 2: the USDT is released to the vendor on the group&apos;s approval, and there are no tokens to redistribute (no Phase 2).
          </p>
          <ul style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.7, paddingLeft: '20px', margin: 0 }}>
            <li><strong style={{ color: '#fff' }}>Same safety net:</strong> if the group doesn&apos;t approve before the deadline, everyone is refunded 100%.</li>
            <li><strong style={{ color: '#fff' }}>One destination:</strong> the vendor receives a single, transparent on-chain payment — no bank, no 20–30% platform cut.</li>
            <li><strong style={{ color: '#fff' }}>Delivery stays off-chain:</strong> PerShare guarantees the payment logic, not the delivery. Choose a vendor you trust — see <a href="/risks" style={{ color: '#10B981' }}>Risks &amp; Disclaimers</a>.</li>
          </ul>
        </div>

        {/* ── WORKED EXAMPLE ──────────────────────────────────────────── */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, marginTop: '72px', marginBottom: '16px' }}>A worked example <span style={{ fontSize: '15px', color: 'var(--muted)', fontWeight: 500 }}>· Pool &amp; Distribute</span></h2>
        <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
          Three members pool <strong style={{ color: '#fff' }}>10,000 USDT</strong> to enter a presale together. The seller returns <strong style={{ color: '#fff' }}>1,000,000 ABC</strong> into the contract. Each member&apos;s share is computed directly from their own deposit:
        </p>
        <pre style={{ background: 'rgba(0,0,0,0.5)', padding: '16px', borderRadius: '10px', color: '#fff', fontSize: '14px', marginBottom: '24px', overflowX: 'auto' }}>
          <code>yourTokens = totalTokensReceived × yourDeposit ÷ poolTotal</code>
        </pre>
        <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
          {[
            { name: 'Alice', dep: '5,000', pct: '50%', tok: '500,000', color: '#00D2FF' },
            { name: 'Bob', dep: '3,000', pct: '30%', tok: '300,000', color: '#10B981' },
            { name: 'Carol', dep: '2,000', pct: '20%', tok: '200,000', color: '#a78bfa' },
          ].map(m => (
            <div key={m.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.color }} />
                <span style={{ fontWeight: 600 }}>{m.name}</span>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>{m.dep} USDT · {m.pct}</span>
              </div>
              <span style={{ fontWeight: 700, color: m.color }}>{m.tok} ABC</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', color: 'var(--muted)', fontSize: '14px' }}>
            <span>Auto-distributed pro-rata</span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>1,000,000 ABC total ✓</span>
          </div>
        </div>

        {/* ── EXTRA MECHANICS ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '48px' }}>
          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#00D2FF', marginBottom: '12px' }}>Vesting &amp; late tranches</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Many presales release tokens over time. When a later tranche arrives, anyone can deposit it into the same pool — the contract increases the total received and every member can claim their additional pro-rata amount. The split stays correct across unlimited tranches.</p>
          </div>
          <div className="glass-panel" style={{ background: 'rgba(20, 28, 47, 0.4)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#a78bfa', marginBottom: '12px' }}>Pull pattern &amp; dust</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Each member pulls their own tokens — no batch payout that could fail or be front-run. Integer division can leave microscopic remainders (&quot;dust&quot;); the pool creator can sweep this dust, defined strictly as the total minus the sum of every member&apos;s theoretical claim, so nothing stays locked.</p>
          </div>
          <div className="glass-panel" style={{ background: 'rgba(16, 185, 129, 0.06)', padding: '32px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#10B981', marginBottom: '12px' }}>Built-in safety net</h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Until the group validates the transfer, the USDT stays locked in the contract. Any doubt before the deadline? Don&apos;t validate — and every member is refunded 100% once the deadline passes. The protocol takes no fee on refunds. Please review the <a href="/risks" style={{ color: '#10B981' }}>Risks &amp; Disclaimers</a> before participating.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
