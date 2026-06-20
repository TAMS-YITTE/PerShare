'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ShareCard } from '../../components/ShareCard';
import { CreateShareModal } from '../../components/CreateShareModal';
import { GuideModal } from '../../components/GuideModal';
import { ComparisonModal } from '../../components/ComparisonModal';
import { useShareCount, useShare, useUserTotalContribution, formatUSDT } from '../../hooks/useShare';

function TotalContributionsBadge({ shareIds, userAddress }: { shareIds: bigint[], userAddress: string }) {
  const result = useUserTotalContribution(shareIds, userAddress as `0x${string}`);
  
  if (!result.data) return null;
  
  const total = result.data.reduce((acc, curr) => {
    if (curr.result) {
      return acc + (curr.result as bigint);
    }
    return acc;
  }, BigInt(0));

  if (total === BigInt(0)) return null;

  return (
    <div style={{ background: 'var(--purpleDark)', padding: '16px 24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ margin: 0, color: '#E2E8F0', fontSize: '18px' }}>My Total Investment</h3>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
        {formatUSDT(total)} <span style={{ fontSize: '16px', color: 'var(--muted)' }}>USDT</span>
      </div>
    </div>
  );
}

function ShareListItem({ id, userAddress }: { id: bigint, userAddress: string }) {
  const { data: share } = useShare(id);
  if (!share) return null;
  const isMember = share.members.map((m: string) => m.toLowerCase()).includes(userAddress.toLowerCase());
  if (!isMember) return null;
  return <ShareCard id={id} share={share} userAddress={userAddress} />;
}

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [showCreate, setShowCreate] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const { data: shareCount } = useShareCount();
  const count = shareCount ? Number(shareCount) : 0;
  const shareIds = Array.from({ length: count }, (_, i) => BigInt(i));

  if (!isConnected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '24px' }}>Connection Required</h1>
        <ConnectButton />
      </div>
    );
  }

  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px' }}>
          Per<span style={{ color: 'var(--purple)' }}>Share</span> Dashboard
        </h1>
        <ConnectButton />
      </header>

      {count > 0 && address && <TotalContributionsBadge shareIds={shareIds} userAddress={address as string} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          My SHAREs
          <button 
            onClick={() => setShowComparison(true)}
            style={{ background: 'transparent', border: '1px solid var(--purple)', color: 'var(--purple)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Why PerShare?
          </button>
          <button 
            onClick={() => setShowGuide(true)}
            style={{ background: 'transparent', border: '1px solid var(--purple)', color: 'var(--purple)', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            How it works?
          </button>
        </h2>
        <button 
          onClick={() => setShowCreate(true)}
          style={{ 
            background: 'var(--purple)', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          + New SHARE
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {count === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', background: 'var(--surface)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
            <p style={{ color: 'var(--muted)' }}>No SHARE found on the platform.</p>
          </div>
        )}
        {shareIds.map((id) => (
          <ShareListItem key={id.toString()} id={id} userAddress={address as string} />
        ))}
      </div>

      {showCreate && <CreateShareModal onClose={() => setShowCreate(false)} />}
      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      {showComparison && <ComparisonModal onClose={() => setShowComparison(false)} />}

      <footer style={{ marginTop: '64px', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
        <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0 }}>
          Besoin d'aide ? Contactez-nous : <br/>
          <a href="mailto:support@pershare.org" style={{ color: 'var(--purple)', textDecoration: 'none', fontWeight: 'bold' }}>support@pershare.org</a>
        </p>
      </footer>
    </main>
  );
}
