'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ShareCard } from '../../components/ShareCard';
import { CreateShareModal } from '../../components/CreateShareModal';
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

function ShareListItem({ id, userAddress, showOnlyMyShares }: { id: bigint, userAddress: string, showOnlyMyShares: boolean }) {
  const { data: share } = useShare(id);
  if (!share) return null;
  const isMember = userAddress && share.members.map((m: string) => m.toLowerCase()).includes(userAddress.toLowerCase());
  if (showOnlyMyShares && !isMember) return null;
  return <ShareCard id={id} share={share} userAddress={userAddress} />;
}

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'myShares'>('dashboard');
  
  const { data: shareCount } = useShareCount();
  const count = shareCount ? Number(shareCount) : 0;
  
  // Pagination : only fetch the latest 12 shares to prevent RPC rate limits
  const maxToFetch = Math.min(count, 12);
  const shareIds = Array.from({ length: maxToFetch }, (_, i) => BigInt(count - i - 1));

  if (!isConnected) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '24px' }}>Connection Required</h1>
        {/* @ts-ignore */}
        <appkit-button />
      </div>
    );
  }

  return (
    <main style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button 
          onClick={() => setShowCreate(true)}
          style={{ 
            background: 'linear-gradient(135deg, #06b6d4, #0284c7)', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 24px', 
            borderRadius: '24px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)'
          }}
        >
          + New SHARE
        </button>
      </header>

      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            background: 'none', border: 'none', padding: '12px 0', fontSize: '18px', cursor: 'pointer',
            color: activeTab === 'dashboard' ? '#fff' : 'var(--muted)',
            borderBottom: activeTab === 'dashboard' ? '2px solid var(--purple2)' : '2px solid transparent',
            fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal',
            transition: 'color 0.2s'
          }}
        >
          Latest Pools
        </button>
        <button
          onClick={() => setActiveTab('myShares')}
          style={{
            background: 'none', border: 'none', padding: '12px 0', fontSize: '18px', cursor: 'pointer',
            color: activeTab === 'myShares' ? '#fff' : 'var(--muted)',
            borderBottom: activeTab === 'myShares' ? '2px solid var(--purple2)' : '2px solid transparent',
            fontWeight: activeTab === 'myShares' ? 'bold' : 'normal',
            transition: 'color 0.2s'
          }}
        >
          My SHAREs
        </button>
      </div>

      {activeTab === 'myShares' && count > 0 && address && (
        <TotalContributionsBadge shareIds={shareIds} userAddress={address as string} />
      )}

      {count === 0 ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', background: 'var(--surface)', borderRadius: '16px', border: '1px dashed var(--border)' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--text)' }}>Welcome to PerShare!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
            There are no pools on the platform yet. Be the first to create a secure group buy on the BNB Chain.
          </p>
          <button 
            onClick={() => setShowCreate(true)}
            style={{ 
              background: 'var(--purple)', 
              color: '#fff', 
              border: 'none', 
              padding: '12px 32px', 
              borderRadius: '24px', 
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Create your first SHARE
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {shareIds.map((id) => (
              <ShareListItem key={id.toString()} id={id} userAddress={address as string} showOnlyMyShares={activeTab === 'myShares'} />
            ))}
          </div>
          {activeTab === 'dashboard' && count > 12 && (
             <div style={{ textAlign: 'center', marginTop: '32px' }}>
               <p style={{ color: 'var(--muted)' }}>Showing the 12 most recent pools. Older pools are archived.</p>
             </div>
          )}
        </>
      )}

      {showCreate && <CreateShareModal onClose={() => setShowCreate(false)} />}
    </main>
  );
}
