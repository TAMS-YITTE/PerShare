import { useState, useEffect } from 'react';
import { useCreateShare } from '../hooks/useShare';
import { ADDRESSES, PERSHARE_CONTRACTS, PerShareTier } from '../lib/contract';

export function CreateShareModal({ onClose }: { onClose: () => void }) {
  const { createShare, isPending, isConfirming, isSuccess } = useCreateShare();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('1000');
  const [threshold, setThreshold] = useState('2');
  const [members, setMembers] = useState<string>('');
  const [destination, setDestination] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7); // Default: 7 days
    return d.toISOString().slice(0, 16);
  });
  const [tier, setTier] = useState<PerShareTier>('standard');

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const memberArray = members.split(',').map(m => m.trim() as `0x${string}`);
    
    // Validation des adresses
    const isValidAddress = (a: string) => /^0x[0-9a-fA-F]{40}$/.test(a);
    if (!memberArray.every(isValidAddress)) {
      alert("One or more member addresses are invalid. Make sure they start with 0x and are 42 characters long.");
      return;
    }
    if (!isValidAddress(destination)) {
      alert("The destination address is invalid.");
      return;
    }

    // Calculate deadline from ISO string
    const deadline = Math.floor(new Date(deadlineDate).getTime() / 1000);
    if (deadline <= Math.floor(Date.now() / 1000)) {
      alert("The expiration date must be in the future.");
      return;
    }
    
    const usdtAddress = ADDRESSES.bscTestnet.usdt || '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd'; 
    const contractAddress = PERSHARE_CONTRACTS[tier];
    
    createShare(
      contractAddress,
      name,
      memberArray,
      usdtAddress as `0x${string}`,
      destination as `0x${string}`,
      targetAmount,
      deadline,
      parseInt(threshold)
    );
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100
    }}>
      <div style={{
        background: 'var(--surface)', padding: '32px', borderRadius: '16px',
        width: '100%', maxWidth: '500px', border: '1px solid var(--border)'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Create a SHARE</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Select Tier</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['social', 'standard', 'premium'] as PerShareTier[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '8px',
                    border: tier === t ? '1px solid var(--purple2)' : '1px solid var(--border)',
                    background: tier === t ? 'rgba(0, 210, 255, 0.1)' : 'var(--bg)',
                    color: tier === t ? 'var(--purple2)' : 'var(--muted)',
                    cursor: 'pointer',
                    fontWeight: tier === t ? 'bold' : 'normal',
                    textTransform: 'capitalize'
                  }}
                >
                  {t}
                  <div style={{ fontSize: '11px', marginTop: '4px', color: 'var(--muted)', fontWeight: 'normal' }}>
                    {t === 'social' ? '0.5%' : t === 'standard' ? '1%' : '2%'} fee
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="name-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>SHARE Name</label>
            <input 
              id="name-input"
              required value={name} onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} 
              placeholder="e.g. Lisbon Trip"
            />
          </div>
          
          <div>
            <label htmlFor="target-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Target Amount (USDT)</label>
            <input 
              id="target-input"
              required type="number" value={targetAmount} onChange={e => setTargetAmount(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} 
            />
          </div>

          <div>
            <label htmlFor="members-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Member Addresses (comma separated)</label>
            <textarea 
              id="members-input"
              required value={members} onChange={e => setMembers(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', minHeight: '80px' }} 
              placeholder="0x123..., 0x456..."
            />
          </div>

          <div>
            <label htmlFor="dest-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Destination (Presale wallet or third party)</label>
            <input 
              id="dest-input"
              required value={destination} onChange={e => setDestination(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} 
              placeholder="0x..."
            />
          </div>

          <div>
            <label htmlFor="threshold-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Validation Threshold</label>
            <input 
              id="threshold-input"
              required type="number" min="1" value={threshold} onChange={e => setThreshold(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }} 
            />
          </div>

          <div>
            <label htmlFor="deadline-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Expiration Date & Time (Deadline)</label>
            <input 
              id="deadline-input"
              required type="datetime-local" value={deadlineDate} onChange={e => setDeadlineDate(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', colorScheme: 'dark' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={isPending || isConfirming} style={{ flex: 1, padding: '12px', background: 'var(--purple)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
              {isPending ? 'Signing...' : isConfirming ? 'Creating...' : 'Create SHARE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
