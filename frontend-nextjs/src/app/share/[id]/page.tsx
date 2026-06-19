'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useEffect } from 'react';
import { 
  useShare, useApprove, useContribute, useValidate, useRefund, 
  useSetExpectedToken, useValidateDistribution, getShareStatus, formatUSDT,
  useHasValidated, useHasValidatedDist
} from '../../../hooks/useShare';

function MemberItem({ member, shareId, currentUser, activeTab }: { member: string, shareId: bigint, currentUser?: string, activeTab: 'collecte'|'envoi'|'distribution' }) {
  const { data: hasValidatedP1 } = useHasValidated(shareId, member as `0x${string}`);
  const { data: hasValidatedP2 } = useHasValidatedDist(shareId, member as `0x${string}`);
  
  const hasValidated = activeTab === 'envoi' ? hasValidatedP1 : activeTab === 'distribution' ? hasValidatedP2 : false;
  const isMe = member.toLowerCase() === currentUser?.toLowerCase();
  
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
      <span style={{ fontFamily: 'monospace', color: isMe ? 'var(--purple)' : 'var(--text)' }}>
        {member.slice(0, 8)}...{member.slice(-6)} {isMe && '(You)'}
      </span>
      {hasValidated && (
        <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ✓ Validated
        </span>
      )}
    </div>
  );
}
import { ADDRESSES } from '../../../lib/contract';

export default function SharePage({ params }: { params: { id: string } }) {
  const { address } = useAccount();
  const shareId = BigInt(params.id);
  const { data: share, refetch } = useShare(shareId);

  const [contributeAmount, setContributeAmount] = useState('');
  const [expectedToken, setExpectedTokenInput] = useState('');
  const [activeTab, setActiveTab] = useState<'collecte'|'envoi'|'distribution'>('collecte');

  const { approve, isPending: isApprovePending, isConfirming: isApproveConfirming, isSuccess: isApproveSuccess } = useApprove();
  const { contribute, isPending: isContributePending, isConfirming: isContributeConfirming, isSuccess: isContributeSuccess } = useContribute();
  const { validate, isPending: isValidatePending, isConfirming: isValidateConfirming, isSuccess: isValidateSuccess } = useValidate();
  const { refund, isPending: isRefundPending, isConfirming: isRefundConfirming, isSuccess: isRefundSuccess } = useRefund();
  const { setExpectedToken, isPending: isSetTokenPending, isConfirming: isSetTokenConfirming, isSuccess: isSetTokenSuccess } = useSetExpectedToken();
  const { validateDistribution, isPending: isDistPending, isConfirming: isDistConfirming, isSuccess: isDistSuccess } = useValidateDistribution();

  useEffect(() => {
    if (isApproveSuccess && contributeAmount) {
      contribute(shareId, contributeAmount);
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isContributeSuccess || isValidateSuccess || isRefundSuccess || isSetTokenSuccess || isDistSuccess) {
      refetch();
    }
  }, [isContributeSuccess, isValidateSuccess, isRefundSuccess, isSetTokenSuccess, isDistSuccess, refetch]);

  if (!share) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const status = getShareStatus(share);
  const isCreator = address && share.creator.toLowerCase() === address.toLowerCase();
  const isMember = address && share.members.map((m: string) => m.toLowerCase()).includes(address.toLowerCase());
  const progress = share.targetAmount === 0n ? 0 : Number((share.totalReceived * 100n) / share.targetAmount);
  const isTargetReached = share.totalReceived >= share.targetAmount;
  
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/app" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '24px' }}>←</Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0 }}>
            Project <span style={{ color: 'var(--purple)' }}>#{params.id}</span>
          </h1>
        </div>
        <ConnectButton />
      </header>

      {/* En-tête (Statut & Jauge) */}
      <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', margin: '0 0 8px 0' }}>{share.name}</h2>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Destination : {share.destination}</p>
          </div>
          <span style={{ 
            padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px',
            background: status === 'active' ? 'var(--purpleDark)' : 'var(--surface2)',
            color: status === 'active' ? '#E2E8F0' : 'var(--muted)'
          }}>
            {status.toUpperCase()}
          </span>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', marginBottom: '12px' }}>
            <span><strong style={{ fontSize: '24px' }}>{formatUSDT(share.totalReceived)}</strong> <span style={{ color: 'var(--muted)' }}>USDT collected</span></span>
            <span style={{ color: 'var(--muted)' }}>Target: <strong>{formatUSDT(share.targetAmount)}</strong> USDT</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: 'var(--surface2)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', width: `${Math.min(progress, 100)}%`, 
              background: isTargetReached ? '#10B981' : 'var(--purple)',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      </div>
      {/* Onglets */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('collecte')}
          style={{ padding: '8px 16px', background: activeTab === 'collecte' ? 'var(--purple)' : 'transparent', color: activeTab === 'collecte' ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Phase 1: Collection
        </button>
        <button 
          onClick={() => setActiveTab('envoi')}
          style={{ padding: '8px 16px', background: activeTab === 'envoi' ? 'var(--purple)' : 'transparent', color: activeTab === 'envoi' ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Phase 2: Sending
        </button>
        <button 
          onClick={() => setActiveTab('distribution')}
          style={{ padding: '8px 16px', background: activeTab === 'distribution' ? 'var(--purple)' : 'transparent', color: activeTab === 'distribution' ? '#fff' : 'var(--muted)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Phase 3: Distribution
        </button>
      </div>

      {/* Zone d'Action Utilisateur (Phase 1) */}
      {activeTab === 'collecte' && (
        <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Phase 1: Fund Collection</h3>
          
          {status !== 'active' ? (
            <p style={{ color: 'var(--muted)' }}>The collection phase is over ({status}).</p>
          ) : isMember ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Contribuer */}
              {!isTargetReached && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  <input 
                    type="number" value={contributeAmount} onChange={e => setContributeAmount(e.target.value)}
                    placeholder="Amount in USDT"
                    style={{ flex: 1, padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                  />
                  <button 
                    onClick={() => approve(share.stablecoin, contributeAmount)}
                    disabled={isApprovePending || isApproveConfirming || isContributePending || isContributeConfirming || !contributeAmount}
                    style={{ padding: '12px 24px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {isApprovePending || isApproveConfirming ? 'Approving...' : isContributePending || isContributeConfirming ? 'Transacting...' : 'Contribute'}
                  </button>
                </div>
              )}

              {/* Rembourser */}
              {!isTargetReached && BigInt(Math.floor(Date.now() / 1000)) > share.deadline && (
                <button 
                  onClick={() => refund(shareId)}
                  disabled={isRefundPending || isRefundConfirming}
                  style={{ width: '100%', padding: '16px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
                >
                  {isRefundPending ? 'Refunding...' : 'Request Refund (Deadline expired)'}
                </button>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)' }}>You are not a member of this Share.</p>
          )}
        </div>
      )}

      {/* Zone Phase 2: Envoi */}
      {activeTab === 'envoi' && (
        <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Phase 2: Sending to Destination</h3>
          
          {status === 'sent' || status === 'refunded' ? (
            <p style={{ color: 'var(--muted)' }}>This phase is over ({status}).</p>
          ) : isMember ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {!isTargetReached ? (
                <p style={{ color: 'var(--muted)' }}>Waiting for the collection target to be reached.</p>
              ) : (
                <button 
                  onClick={() => validate(shareId)}
                  disabled={isValidatePending || isValidateConfirming}
                  style={{ width: '100%', padding: '16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
                >
                  {isValidatePending ? 'Validating...' : 'Validate Fund Transfer'}
                </button>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--muted)' }}>You are not a member of this Share.</p>
          )}
        </div>
      )}

      {/* Zone Phase 3 */}
      {activeTab === 'distribution' && (
        <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--purpleDark)', marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '20px', color: 'var(--purple)' }}>Phase 3: Token Redistribution</h3>
          
          {share.tokensDistributed ? (
            <p style={{ color: 'var(--muted)' }}>Tokens have been successfully distributed to all members.</p>
          ) : (
            <>
              {share.expectedToken === '0x0000000000000000000000000000000000000000' ? (
                isCreator ? (
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <input 
                      value={expectedToken} onChange={e => setExpectedTokenInput(e.target.value)}
                      placeholder="Expected Token Address (0x...)"
                      style={{ flex: 1, padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                    />
                    <button 
                      onClick={() => setExpectedToken(shareId, expectedToken as `0x${string}`)}
                      disabled={isSetTokenPending || isSetTokenConfirming || !expectedToken}
                      style={{ padding: '12px 24px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Set Token
                    </button>
                  </div>
                ) : (
                  <p style={{ color: 'var(--muted)' }}>Waiting for the creator to set the expected token for distribution.</p>
                )
              ) : (
                <div>
                  <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>Expected token: <strong style={{color: 'var(--text)'}}>{share.expectedToken}</strong></p>
                  
                  {!share.sent && (
                    <p style={{ color: '#EF4444', marginBottom: '16px', fontSize: '14px' }}>
                      ⚠️ Fund transfer (Phase 2) is not yet complete. Distribution is blocked.
                    </p>
                  )}
                  
                  <button 
                    onClick={() => validateDistribution(shareId, share.expectedToken)}
                    disabled={isDistPending || isDistConfirming || !share.sent}
                    style={{ width: '100%', padding: '16px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: !share.sent ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: !share.sent ? 0.5 : 1 }}
                  >
                    {isDistPending ? 'Validating...' : 'Validate my Address to Receive my Tokens'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Liste des Membres */}
      <div style={{ background: 'var(--surface)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '20px' }}>Share Members ({share.members.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {share.members.map((member: string, index: number) => (
            <MemberItem key={index} member={member} shareId={shareId} currentUser={address as string} activeTab={activeTab} />
          ))}
        </div>
      </div>
    </main>
  );
}
