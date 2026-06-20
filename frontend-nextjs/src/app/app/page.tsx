'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
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
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0 }}>
          Per<span style={{ color: 'var(--purple)' }}>Share</span> App
        </h1>
        <button 
          onClick={() => setShowCreate(true)}
          style={{ 
            background: 'linear-gradient(135deg, #06b6d4, #0284c7)', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 24px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)'
          }}
        >
          + New SHARE
        </button>
      </header>

      {count > 0 && address && <TotalContributionsBadge shareIds={shareIds} userAddress={address as string} />}

      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #1a233a', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            background: 'none', border: 'none', padding: '12px 0', fontSize: '18px', cursor: 'pointer',
            color: activeTab === 'dashboard' ? '#fff' : '#8892b0',
            borderBottom: activeTab === 'dashboard' ? '2px solid #06b6d4' : '2px solid transparent',
            fontWeight: activeTab === 'dashboard' ? 'bold' : 'normal',
            transition: 'color 0.2s'
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('myShares')}
          style={{
            background: 'none', border: 'none', padding: '12px 0', fontSize: '18px', cursor: 'pointer',
            color: activeTab === 'myShares' ? '#fff' : '#8892b0',
            borderBottom: activeTab === 'myShares' ? '2px solid #06b6d4' : '2px solid transparent',
            fontWeight: activeTab === 'myShares' ? 'bold' : 'normal',
            transition: 'color 0.2s'
          }}
        >
          My SHAREs
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {count === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', background: 'var(--surface)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
            <p style={{ color: 'var(--muted)' }}>No SHARE found on the platform.</p>
          </div>
        )}
        {shareIds.map((id) => (
          <ShareListItem key={id.toString()} id={id} userAddress={address as string} showOnlyMyShares={activeTab === 'myShares'} />
        ))}
      </div>

      {showCreate && <CreateShareModal onClose={() => setShowCreate(false)} />}
    </main>
  );
}
