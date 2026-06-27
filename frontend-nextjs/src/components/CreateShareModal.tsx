import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useCreateShare } from '../hooks/useShare';
import { ADDRESSES, PERSHARE_CONTRACTS, PerShareTier } from '../lib/contract';
import { toast } from 'sonner';

// Liste des adresses autorisées à créer un pool "Social" (en minuscules)
const VIP_WALLETS = [
  '0xVotreAdresseAdminIci'
].map(a => a.toLowerCase());

export function CreateShareModal({ onClose }: { onClose: () => void }) {
  const { address } = useAccount();
  const isVIP = address ? VIP_WALLETS.includes(address.toLowerCase()) : false;
  
  const { createShare, isPending, isConfirming, isSuccess } = useCreateShare();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('1000');
  const [threshold, setThreshold] = useState('2');
  const [members, setMembers] = useState<string[]>(['']);
  const [destination, setDestination] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7); // Default: 7 days
    return d.toISOString().slice(0, 16);
  });
  const [tier, setTier] = useState<PerShareTier>('standard');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success('SHARE successfully created!');
      onClose();
    }
  }, [isSuccess, onClose]);

  const addMemberField = () => setMembers([...members, '']);
  const updateMember = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value.trim();
    setMembers(newMembers);
  };
  const removeMemberField = (index: number) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const addresses = content.split(/[\n,;]+/).map(a => a.trim()).filter(a => a.startsWith('0x'));
      if (addresses.length > 0) {
        setMembers(addresses);
        toast.success(`${addresses.length} addresses imported from CSV!`);
      } else {
        toast.error('No valid 0x addresses found in the file.');
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifications des Tiers
    if (tier === 'social' && !isVIP) {
      toast.error("The Social tier is strictly reserved for verified partners.");
      return;
    }
    
    // Cleanup empty fields
    const cleanedMembers = members.filter(m => m !== '');

    // Validation des adresses
    const isValidAddress = (a: string) => /^0x[0-9a-fA-F]{40}$/.test(a);
    if (!cleanedMembers.every(isValidAddress)) {
      toast.error("One or more member addresses are invalid. Make sure they start with 0x and are 42 characters long.");
      return;
    }
    if (cleanedMembers.length === 0) {
      toast.error("Please add at least one member address.");
      return;
    }
    if (!isValidAddress(destination)) {
      toast.error("The destination address is invalid.");
      return;
    }

    // Calculate deadline from ISO string
    const deadline = Math.floor(new Date(deadlineDate).getTime() / 1000);
    if (deadline <= Math.floor(Date.now() / 1000)) {
      toast.error("The expiration date must be in the future.");
      return;
    }
    
    const usdtAddress = ADDRESSES.bsc.usdt; 
    const contractAddress = PERSHARE_CONTRACTS[tier];
    
    createShare(
      contractAddress,
      name,
      cleanedMembers as `0x${string}`[],
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
        width: '100%', maxWidth: '550px', border: '1px solid var(--border)',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: '24px' }}>Create a SHARE</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Select Tier</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['social', 'standard', 'premium'] as PerShareTier[]).map(t => {
                const isLocked = t === 'social' || t === 'premium'; // Temporarily locked for Option B go-live
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      if (isLocked) {
                        toast.error(t === 'social' ? "Social tier is reserved. Contact admin." : "Premium tier is coming soon!");
                        return;
                      }
                      setTier(t);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: tier === t ? '1px solid var(--purple2)' : '1px solid var(--border)',
                      background: tier === t ? 'rgba(0, 210, 255, 0.1)' : 'var(--bg)',
                      color: tier === t ? 'var(--purple2)' : 'var(--muted)',
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      fontWeight: tier === t ? 'bold' : 'normal',
                      textTransform: 'capitalize',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {t}
                    {isLocked && <span style={{ fontSize: '10px', color: 'var(--muted)' }}>Coming soon</span>}
                  </button>
                );
              })}
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
            <label htmlFor="deadline-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Expiration Date & Time (Deadline)</label>
            <input 
              id="deadline-input"
              required type="datetime-local" value={deadlineDate} onChange={e => setDeadlineDate(e.target.value)}
              style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', colorScheme: 'dark' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', color: 'var(--muted)' }}>Member Addresses ({members.length})</label>
              <div>
                <input type="file" id="csv-upload" accept=".csv,.txt" style={{ display: 'none' }} onChange={handleFileUpload} />
                <label htmlFor="csv-upload" style={{ fontSize: '12px', background: 'rgba(0, 210, 255, 0.1)', padding: '4px 8px', borderRadius: '4px', color: 'var(--purple2)', cursor: 'pointer', fontWeight: 'bold' }}>📁 Import CSV</label>
              </div>
            </div>

            {/* Pre-SHARE Tip */}
            <div style={{ background: 'var(--surface2)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: 'var(--muted)', borderLeft: '3px solid var(--purple)' }}>
              <strong>💡 Pre-SHARE Phase:</strong> Building a large pool? Collect your community's wallet addresses beforehand (via Google Forms, Telegram, etc.), save them in a .csv or .txt file, and upload them all at once using the import button above.
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '150px', overflowY: 'auto', paddingRight: '8px' }}>
              {members.map((member, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder="0x..."
                    style={{ flex: 1, padding: '10px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)' }}
                  />
                  {members.length > 1 && (
                    <button type="button" onClick={() => removeMemberField(index)} style={{ padding: '0 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addMemberField} style={{ marginTop: '8px', width: '100%', padding: '10px', background: 'var(--bg)', color: 'var(--muted)', border: '1px dashed var(--border)', borderRadius: '8px', cursor: 'pointer' }}>
              + Add Member
            </button>
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

          <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
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

          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text)', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={isPending || isConfirming || !termsAccepted} style={{ flex: 1, padding: '12px', background: 'var(--purple)', border: 'none', borderRadius: '8px', color: '#fff', cursor: (!termsAccepted || isPending || isConfirming) ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: (!termsAccepted || isPending || isConfirming) ? 0.5 : 1 }}>
              {isPending ? 'Signing...' : isConfirming ? 'Creating...' : 'Create SHARE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
