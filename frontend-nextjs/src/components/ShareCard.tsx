import Link from 'next/link';
import { getShareProgress, getShareStatus, formatUSDT, useContribution } from '../hooks/useShare';

export function ShareCard({ id, share, userAddress }: { id: bigint; share: any; userAddress?: string }) {
  if (!share) return null;

  const status = getShareStatus(share);
  const progress = getShareProgress(share);
  const { data: myContribution } = useContribution(id, (userAddress as `0x${string}`) || '0x0000000000000000000000000000000000000000');

  return (
    <Link href={`/share?id=${id.toString()}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '18px' }}>{share.name}</h3>
        <span style={{ 
          fontSize: '12px', 
          padding: '4px 8px', 
          borderRadius: '4px',
          background: status === 'active' ? 'var(--purpleDark)' : 'var(--surface2)',
          color: status === 'active' ? '#E2E8F0' : 'var(--muted)',
          fontWeight: 'bold'
        }}>
          {status.toUpperCase()}
        </span>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>
          <span>{formatUSDT(share.totalReceived)} USDT collected</span>
          <span>Target: {formatUSDT(share.targetAmount)} USDT</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${Math.min(progress, 100)}%`, 
            background: 'var(--purple)',
            borderRadius: '3px'
          }} />
        </div>
      </div>

      <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--surface2)' }}>
        <div>
          <span>Members:</span> <span style={{ color: 'var(--text)' }}>{share.members.length}</span>
        </div>
        <div>
          <span>Phase 2 Validations:</span> <span style={{ color: 'var(--text)' }}>{Number(share.currentValidations)} / {Number(share.threshold)}</span>
        </div>
        {userAddress && (
          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)', padding: '8px 12px', borderRadius: '6px', marginTop: '4px' }}>
            <span>My Contribution:</span> 
            <span style={{ color: 'var(--purple)', fontWeight: 'bold', fontSize: '14px' }}>{formatUSDT(myContribution || BigInt(0))} USDT</span>
          </div>
        )}
      </div>
      </div>
    </Link>
  );
}
