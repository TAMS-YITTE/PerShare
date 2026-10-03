import React from 'react';

// Jalons sans date : chaque etape sort quand elle est prete (et auditee si besoin).
type Milestone = { title: string; status?: 'done' | 'now' | 'next'; text: React.ReactNode };

const MILESTONES: Milestone[] = [
  {
    title: 'Mainnet & audit',
    status: 'done',
    text: 'PerShare V1 live on BNB Chain with three fee tiers (0.5%, 1%, 2%), owned by a multisig and audited by SpyWolf.',
  },
  {
    title: 'Advanced proof of concept',
    status: 'now',
    text: 'Group purchases, shared budgets and collective pools in production: collective validation, automatic refund if the goal is missed, pro-rata distribution of the tokens received.',
  },
  {
    title: 'Joob ecosystem: one token',
    status: 'next',
    text: (
      <>
        From the JOOB TGE, PerShare uses JOOB, the single token of the{' '}
        <a href="https://www.joobescrow.com" target="_blank" rel="noreferrer" style={{ color: '#00D2FF' }}>Joob ecosystem</a>:
        JOOB holders above a threshold pay 0% fees on PerShare, and JOOB governance extends to PerShare parameters.
      </>
    ),
  },
  {
    title: 'PerShare V2: co-funded escrow',
    text: 'Several sponsors pool funds and the pool opens one JoobEscrow escrow, paid only on delivery; if the deal is cancelled or disputed, each member is refunded pro-rata in the same currency. Comes after JoobEscrow V5 and is audited before launch. Also: full automation for claim-mode token sales.',
  },
  {
    title: 'NFT group purchases',
    text: 'Extending the distribution logic to ERC-721 and ERC-1155, so a group can buy an NFT together and each member automatically receives their pro-rata part.',
  },
  {
    title: 'Cross-chain expansion',
    text: 'PerShare contracts on other EVM networks such as Arbitrum, Base and Polygon, to lower fees and reach more communities.',
  },
];

const STATUS_LABEL = { done: 'Done', now: 'In progress', next: 'Next' } as const;
const STATUS_COLOR = { done: '#10B981', now: '#00D2FF', next: '#f59e0b' } as const;

export default function Roadmap() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '120px 24px', fontFamily: 'var(--font-body)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: '24px' }}>Roadmap</h1>
        <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: 1.6, marginBottom: '48px' }}>
          The future of decentralized group pooling. No dates: each milestone ships when it is ready, and audited where needed.
        </p>

        <div style={{ position: 'relative', paddingLeft: '32px', borderLeft: '2px solid rgba(0, 210, 255, 0.2)' }}>
          {MILESTONES.map((m, i) => {
            const color = m.status ? STATUS_COLOR[m.status] : 'rgba(255,255,255,0.2)';
            return (
              <div key={m.title} style={{ position: 'relative', marginBottom: i === MILESTONES.length - 1 ? 0 : '48px' }}>
                <div style={{ position: 'absolute', left: '-41px', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: color, border: '4px solid var(--bg)' }}></div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: m.status ? color : '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  {m.title}
                  {m.status && (
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '999px', border: `1px solid ${color}`, color }}>
                      {STATUS_LABEL[m.status]}
                    </span>
                  )}
                </h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{m.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
