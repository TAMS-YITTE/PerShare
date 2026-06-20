import React, { useState } from 'react';

export function ComparisonModal({ onClose }: { onClose: () => void }) {
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');

  const content = {
    EN: {
      title: 'Why PerShare?',
      subtitle: 'Stop paying abusive fees and juggling multiple dApps. PerShare unifies pooling, escrow, and presales on the BNB Chain.',
      tabWeb3: 'Vs Web3 (DeFi)',
      tabWeb2: 'Vs TradFi (Web2)',
      disclaimer: '*Comparison up to date as of June 20, 2026. Based on public features.*',
      tableWeb3: {
        headers: ['Feature', 'PerShare', 'Party Protocol', '0xSplits', 'Safe', 'HaloFi'],
        rows: [
          { label: 'Average Fees', values: [<strong key={0} style={{color: 'var(--success)'}}>1%</strong>, '0-2.5%', '0%', 'Gas', <span key={4} style={{color: 'var(--muted)'}}>Legacy</span>] },
          { label: 'Group Buy / Syndicates', values: ['✅', '✅', '❌', '❌', '❌'] },
          { label: 'Proportional Auto-Distribute', values: ['✅', '🟡', '✅', '❌', '❌'] },
          { label: 'Auto-Refund (Deadline)', values: ['✅', '🟡', '❌', '❌', '🟡'] },
          { label: '2-Phase Presale Logic', values: ['✅', '❌', '❌', '❌', '❌'] },
          { label: 'Simple for Non-Experts', values: ['✅', '❌', '❌', '🟡', '❌'] },
          { label: 'Native BNB Chain', values: ['✅', '❌', '❌', '✅', '❌'] },
          { label: 'All-in-One Contract', values: ['✅', '❌', '❌', '❌', '❌'] },
        ]
      },
      tableWeb2: {
        headers: ['Feature', 'PerShare', 'Fiverr / Upwork', 'GoFundMe', 'PayPal'],
        rows: [
          { label: 'Average Global Fees', values: [<strong key={0} style={{color: 'var(--success)', fontSize: '1.2em'}}>1%</strong>, <strong key={1} style={{color: 'var(--error)', fontSize: '1.2em'}}>20-30%</strong>, '3-5%', '3-6%'] },
          { label: 'Funds Custodian', values: [<strong key={0}>Smart Contract</strong>, 'Company', 'Company', 'Company'] },
          { label: 'Abusive Account Freezing', values: [<span key={0} style={{color: 'var(--success)'}}>❌ Impossible</span>, '✅ Yes', '✅ Yes', '✅ Yes'] },
          { label: 'Bank Account Required', values: [<span key={0} style={{color: 'var(--success)'}}>❌ No</span>, '✅ Yes', '✅ Yes', '✅ Yes'] },
          { label: 'Instant Global Payment', values: ['✅', '❌ (Days)', '❌ (Days)', '🟡 (FX Fees)'] },
          { label: 'Escrow Feature', values: ['✅', '✅', '❌', '🟡 (Complex)'] },
        ]
      }
    },
    FR: {
      title: 'Pourquoi PerShare ?',
      subtitle: 'Arrêtez de payer des frais abusifs et de jongler entre plusieurs dApps. PerShare unifie cagnotte, séquestre et presale sur la BNB Chain.',
      tabWeb3: 'Vs Web3 (DeFi)',
      tabWeb2: 'Vs TradFi (Web2)',
      disclaimer: '*Comparatif à jour au 20 Juin 2026. Basé sur les fonctionnalités publiques.*',
      tableWeb3: {
        headers: ['Fonctionnalité', 'PerShare', 'Party Protocol', '0xSplits', 'Safe', 'HaloFi'],
        rows: [
          { label: 'Frais Moyens', values: [<strong key={0} style={{color: 'var(--success)'}}>1%</strong>, '0-2.5%', '0%', 'Gas', <span key={4} style={{color: 'var(--muted)'}}>Legacy</span>] },
          { label: 'Achat Groupé', values: ['✅', '✅', '❌', '❌', '❌'] },
          { label: 'Distribution Proportionnelle', values: ['✅', '🟡', '✅', '❌', '❌'] },
          { label: 'Remboursement Auto', values: ['✅', '🟡', '❌', '❌', '🟡'] },
          { label: 'Presale en 2 Phases', values: ['✅', '❌', '❌', '❌', '❌'] },
          { label: 'Simple pour Débutants', values: ['✅', '❌', '❌', '🟡', '❌'] },
          { label: 'BNB Chain Natif', values: ['✅', '❌', '❌', '✅', '❌'] },
          { label: 'Un Seul Contrat (All-in-One)', values: ['✅', '❌', '❌', '❌', '❌'] },
        ]
      },
      tableWeb2: {
        headers: ['Fonctionnalité', 'PerShare', 'Fiverr / Upwork', 'Leetchi', 'PayPal'],
        rows: [
          { label: 'Frais Globaux Moyens', values: [<strong key={0} style={{color: 'var(--success)', fontSize: '1.2em'}}>1%</strong>, <strong key={1} style={{color: 'var(--error)', fontSize: '1.2em'}}>20-30%</strong>, '3-5%', '3-6%'] },
          { label: 'Dépositaire des Fonds', values: [<strong key={0}>Smart Contract</strong>, 'Entreprise', 'Entreprise', 'Entreprise'] },
          { label: 'Blocage Abusif', values: [<span key={0} style={{color: 'var(--success)'}}>❌ Impossible</span>, '✅ Oui', '✅ Oui', '✅ Oui'] },
          { label: 'Compte Bancaire Requis', values: [<span key={0} style={{color: 'var(--success)'}}>❌ Non</span>, '✅ Oui', '✅ Oui', '✅ Oui'] },
          { label: 'Paiement Int. Instantané', values: ['✅', '❌ (Jours)', '❌ (Jours)', '🟡 (Frais change)'] },
          { label: 'Fonction Séquestre', values: ['✅', '✅', '❌', '🟡 (Complexe)'] },
        ]
      }
    }
  };

  const t = content[lang];
  const [activeTab, setActiveTab] = useState<'Web2' | 'Web3'>('Web2');

  const activeTable = activeTab === 'Web2' ? t.tableWeb2 : t.tableWeb3;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '24px'
    }}>
      <div style={{
        background: 'var(--surface)', padding: '32px', borderRadius: '16px',
        width: '100%', maxWidth: '900px', border: '1px solid var(--border)',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: 0, color: 'var(--purple)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {t.title}
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: '8px', maxWidth: '600px' }}>{t.subtitle}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', background: 'var(--bg)', borderRadius: '8px', padding: '4px' }}>
              <button onClick={() => setLang('EN')} style={{ background: lang === 'EN' ? 'var(--purple)' : 'transparent', color: lang === 'EN' ? '#fff' : 'var(--muted)', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>EN</button>
              <button onClick={() => setLang('FR')} style={{ background: lang === 'FR' ? 'var(--purple)' : 'transparent', color: lang === 'FR' ? '#fff' : 'var(--muted)', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>FR</button>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '28px' }}>&times;</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('Web2')} 
            style={{ background: activeTab === 'Web2' ? 'var(--purple)' : 'var(--bg)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t.tabWeb2}
          </button>
          <button 
            onClick={() => setActiveTab('Web3')} 
            style={{ background: activeTab === 'Web3' ? 'var(--purple)' : 'var(--bg)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t.tabWeb3}
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto', background: 'var(--bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--border)' }}>
                {activeTable.headers.map((header, idx) => (
                  <th key={idx} style={{ padding: '16px', color: '#E2E8F0', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activeTable.rows.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px', color: 'var(--text)', fontWeight: 'bold' }}>{row.label}</td>
                  {row.values.map((val, cIdx) => (
                    <td key={cIdx} style={{ padding: '16px', color: 'var(--muted)', textAlign: cIdx > 0 ? 'center' : 'left' }}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right', marginTop: '16px' }}>{t.disclaimer}</p>
      </div>
    </div>
  );
}
