'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { 
  useShare, useApprove, useContribute, useValidate, useMarkRefunded, useClaimRefund, useDepositTokens,
  useSetExpectedToken, useValidateDistribution, useClaimDistribution,
  getShareStatus, formatUSDT, useHasValidated, useHasValidatedDist
} from '../../hooks/useShare';
import { toast } from 'sonner';

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

function ClaimableBlock({ shareId, member }: { shareId: bigint, member: string }) {
  const { claimDistribution, isPending, isConfirming, isSuccess } = useClaimDistribution();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Tokens successfully claimed!');
    }
  }, [isSuccess]);

  return (
    <div style={{ background: 'var(--bg)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', marginTop: '24px' }}>
      <h4 style={{ marginBottom: '8px', fontSize: '16px', color: 'var(--muted)' }}>Your Claimable Tokens</h4>
      <div style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--muted)' }}>
        Click below to claim your pro-rata share of the deposited tokens.
      </div>
      
      <button 
        onClick={() => claimDistribution(shareId)}
        disabled={isPending || isConfirming}
        style={{ width: '100%', padding: '16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
      >
        {isPending || isConfirming ? 'Claiming...' : 'Claim My Tokens'}
      </button>
    </div>
  );
}

function SharePageContent() {
  const { address } = useAccount();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const shareId = idParam ? BigInt(idParam) : BigInt(0);
  const { data: share, refetch } = useShare(shareId);

  const [contributeAmount, setContributeAmount] = useState('');
  const [expectedToken, setExpectedTokenInput] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'collecte'|'envoi'|'distribution'>('collecte');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { approve, isPending: isApprovePending, isConfirming: isApproveConfirming, isSuccess: isApproveSuccess } = useApprove();
  const { contribute, isPending: isContributePending, isConfirming: isContributeConfirming, isSuccess: isContributeSuccess } = useContribute();
  const { validate, isPending: isValidatePending, isConfirming: isValidateConfirming, isSuccess: isValidateSuccess } = useValidate();
  const { markRefunded, isPending: isMarkPending, isConfirming: isMarkConfirming, isSuccess: isMarkSuccess } = useMarkRefunded();
  const { claimRefund, isPending: isClaimPending, isConfirming: isClaimConfirming, isSuccess: isClaimSuccess } = useClaimRefund();
  const { setExpectedToken, isPending: isSetTokenPending, isConfirming: isSetTokenConfirming, isSuccess: isSetTokenSuccess } = useSetExpectedToken();
  const { validateDistribution, isPending: isDistPending, isConfirming: isDistConfirming, isSuccess: isDistSuccess } = useValidateDistribution();
  const { approve: approveDeposit, isPending: isApproveDepPending, isConfirming: isApproveDepConfirming, isSuccess: isApproveDepSuccess } = useApprove();
  const { depositTokens, isPending: isDepPending, isConfirming: isDepConfirming, isSuccess: isDepSuccess } = useDepositTokens();

  useEffect(() => {
    if (isApproveSuccess && contributeAmount) {
      toast.success('USDT Approved. Proceeding to contribute...');
      contribute(shareId, contributeAmount);
    }
  }, [isApproveSuccess]);

  useEffect(() => {
    if (isApproveDepSuccess && depositAmount) {
      toast.success('Tokens Approved. Proceeding to deposit...');
      depositTokens(shareId, depositAmount);
    }
  }, [isApproveDepSuccess]);

  useEffect(() => {
    if (isContributeSuccess) toast.success('Successfully contributed to the SHARE!');
    if (isValidateSuccess) toast.success('Transfer validated!');
    if (isMarkSuccess) toast.success('Share marked as refunded! You can now claim your refund.');
    if (isClaimSuccess) toast.success('Refund claimed successfully!');
    if (isSetTokenSuccess) toast.success('Expected token set!');
    if (isDistSuccess) toast.success('Address validated for distribution!');
    if (isDepSuccess) toast.success('Tokens deposited successfully!');

    if (isContributeSuccess || isValidateSuccess || isMarkSuccess || isClaimSuccess || isSetTokenSuccess || isDistSuccess || isDepSuccess) {
      refetch();
    }
  }, [isContributeSuccess, isValidateSuccess, isMarkSuccess, isClaimSuccess, isSetTokenSuccess, isDistSuccess, isDepSuccess, refetch]);

  if (!idParam) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Share ID not found in URL</div>;
  }

  if (!share) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  }

  const status = getShareStatus(share);
  const isCreator = address && share.creator.toLowerCase() === address.toLowerCase();
  const isMember = address && share.members.map((m: string) => m.toLowerCase()).includes(address.toLowerCase());
  const progress = share.targetAmount === BigInt(0) ? 0 : Number((share.totalReceived * BigInt(100)) / share.targetAmount);
  const isTargetReached = share.totalReceived >= share.targetAmount;
  
  return (
    <main style={{ padding: '40px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/app" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '24px' }}>←</Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: 0 }}>
            Project <span style={{ color: 'var(--purple)' }}>#{idParam}</span>
          </h1>
        </div>
        {/* @ts-ignore */}
        <appkit-button />
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={termsAccepted} 
                        onChange={e => setTermsAccepted(e.target.checked)} 
                        style={{ marginTop: '4px', accentColor: 'var(--purple)' }} 
                      />
                      <span style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                        I understand that PerShare is a non-custodial software, that I am solely responsible for my legal/tax compliance, that I can lose my funds, and I accept the <a href="/terms" target="_blank" style={{ color: 'var(--purple)' }}>Terms</a> &amp; <a href="/risks" target="_blank" style={{ color: 'var(--purple)' }}>Risks</a>.
                      </span>
                    </label>
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <input 
                      type="number" value={contributeAmount} onChange={e => setContributeAmount(e.target.value)}
                      placeholder="Amount in USDT"
                      style={{ flex: 1, padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                    />
                    <button 
                      onClick={() => approve(share.stablecoin, contributeAmount)}
                      disabled={isApprovePending || isApproveConfirming || isContributePending || isContributeConfirming || !contributeAmount || !termsAccepted}
                      style={{ padding: '12px 24px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: (!termsAccepted || isApprovePending || isApproveConfirming || isContributePending || isContributeConfirming || !contributeAmount) ? 'not-allowed' : 'pointer', opacity: (!termsAccepted || isApprovePending || isApproveConfirming || isContributePending || isContributeConfirming || !contributeAmount) ? 0.5 : 1 }}
                    >
                      {isApprovePending || isApproveConfirming ? 'Approving...' : isContributePending || isContributeConfirming ? 'Transacting...' : 'Contribute'}
                    </button>
                  </div>
                </div>
              )}

              {/* Rembourser */}
              {!isTargetReached && BigInt(Math.floor(Date.now() / 1000)) > share.deadline && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {!share.refunded && (
                    <button 
                      onClick={() => markRefunded(shareId)}
                      disabled={isMarkPending || isMarkConfirming}
                      style={{ width: '100%', padding: '16px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
                    >
                      {isMarkPending || isMarkConfirming ? 'Marking...' : '1. Mark Share as Refunded (Deadline expired)'}
                    </button>
                  )}
                  {share.refunded && (
                    <button 
                      onClick={() => claimRefund(shareId)}
                      disabled={isClaimPending || isClaimConfirming}
                      style={{ width: '100%', padding: '16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}
                    >
                      {isClaimPending || isClaimConfirming ? 'Claiming...' : '2. Claim My Refund'}
                    </button>
                  )}
                </div>
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
              
              {isCreator && share.sent && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--muted)' }}>Deposit Tokens (Creator only):</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <input 
                      type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)}
                      placeholder="Amount to deposit"
                      style={{ flex: 1, padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                    />
                    <button 
                      onClick={() => approveDeposit(share.expectedToken, depositAmount)}
                      disabled={isApproveDepPending || isApproveDepConfirming || isDepPending || isDepConfirming || !depositAmount}
                      style={{ padding: '12px 24px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: !depositAmount ? 'not-allowed' : 'pointer', opacity: !depositAmount ? 0.5 : 1 }}
                    >
                      {isApproveDepPending || isApproveDepConfirming ? 'Approving...' : isDepPending || isDepConfirming ? 'Depositing...' : 'Approve & Deposit'}
                    </button>
                  </div>
                </div>
              )}

              {share.tokensDistributed ? (
                <div style={{ marginBottom: '24px', color: '#10B981', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid #10B981' }}>
                  Tokens have been successfully distributed to all members.
                </div>
              ) : (
                <button 
                  onClick={() => validateDistribution(shareId, share.expectedToken)}
                  disabled={isDistPending || isDistConfirming || !share.sent}
                  style={{ width: '100%', padding: '16px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: !share.sent ? 'not-allowed' : 'pointer', fontSize: '16px', opacity: !share.sent ? 0.5 : 1, marginBottom: '24px' }}
                >
                  {isDistPending ? 'Validating...' : 'Validate my Address to Receive my Tokens'}
                </button>
              )}
              
              {isMember && address && share.tokensDistributed && (
                <ClaimableBlock shareId={shareId} member={address} />
              )}
            </div>
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

export default function SharePage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <SharePageContent />
    </Suspense>
  );
}
