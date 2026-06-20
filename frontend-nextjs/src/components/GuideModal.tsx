import React, { useState } from 'react';

const content = {
  EN: {
    title: "How it works?",
    intro: "PerShare is a decentralized platform (Smart Contract) allowing a group of investors to pool their funds (USDT) trustlessly to participate in OTC investments or presales (ICO).",
    subtitle: "PerShare Use Cases",
    intro2: "The \"Secure Collection → Validated Sending → Automatic Redistribution\" mechanism adapts to many needs:",
    cases: [
      {
        icon: "🔒",
        title: "Secure a transaction (Escrow)",
        bullets: [
          "<strong style=\"color: var(--text)\">Beat Fiverr/Upwork ⭐:</strong> Stop paying 30% in fees. Client & Freelancer create a Share. Client deposits, delivery triggers cross-validation. <strong>Total cost: 1% max.</strong>",
          "<strong style=\"color: var(--text)\">Instant P2P Escrow:</strong> Buyer deposits, seller ships the item, cross-validation releases funds.",
          "<strong style=\"color: var(--text)\">Personal Vault:</strong> Multisig Auto-Safe for your own wallets."
        ],
        highlight: true
      },
      {
        icon: "🚀",
        title: "Invest together (Presale / Group Buy)",
        desc: "The pool collects USDT and sends a single ticket to the presale. Safety net: money is locked until majority validates. 100% refund at deadline if aborted.",
        bullets: [
          "<strong>Automatic Push ⭐:</strong> Destination = presale contract. Presale automatically sends tokens back.",
          "<strong>Seller Push ⭐:</strong> Seller does a manual `transfer()` back to the contract. Zero risk for you.",
          "<strong>Claim Mode ⚠️:</strong> Destination = your wallet. You claim tokens manually, then send them to PerShare for Phase 3."
        ]
      },
      {
        icon: "👥",
        title: "Pool money (Money Pool / Tontine)",
        bullets: [
          "<strong style=\"color: var(--text)\">Joint account without a bank:</strong> Pay for a shared vacation rental or Kickstarter. Collective validation.",
          "<strong style=\"color: var(--text)\">Trustless Crypto Tontine:</strong> Collective pool among crypto members. Code holds the money securely."
        ]
      },
      {
        icon: "💰",
        title: "Distribute gains (Proportional)",
        bullets: [
          "<strong style=\"color: var(--text)\">Dispute-free Revenue Sharing:</strong> Native proportional distribution for one-off revenues among creators.",
          "<strong style=\"color: var(--text)\">Hackathon Prize Pool:</strong> Distribute winnings automatically between team members.",
          "<strong style=\"color: var(--text)\">Trading Pool:</strong> Distribute hedge fund trading profits."
        ]
      }
    ],
    whyTitle: "Why use PerShare?",
    whyDesc: "Forget blind trust. With PerShare, <strong>code is law</strong>: the collection is refundable (Deadline), sending requires majority agreement (Threshold), and redistribution is flawless.",
    btn: "Got it!"
  },
  FR: {
    title: "Comment ça marche ?",
    intro: "PerShare est une plateforme décentralisée (Smart Contract) permettant à un groupe d'investisseurs de mettre leurs fonds (USDT) en commun sans confiance requise, pour participer à des investissements OTC ou préventes (ICO).",
    subtitle: "Cas d'usage PerShare",
    intro2: "Le mécanisme \"Collecte sécurisée → Envoi validé → Redistribution automatique\" s'adapte à de nombreux besoins :",
    cases: [
      {
        icon: "🔒",
        title: "Sécuriser une transaction (Escrow)",
        bullets: [
          "<strong style=\"color: var(--text)\">Remplace Fiverr/Upwork ⭐:</strong> Arrêtez de payer 30% de frais. Le client dépose, la livraison déclenche la validation croisée. <strong>Coût total : 1% max.</strong>",
          "<strong style=\"color: var(--text)\">Escrow P2P instantané :</strong> L'acheteur dépose, le vendeur expédie, la validation mutuelle libère les fonds.",
          "<strong style=\"color: var(--text)\">Coffre-fort personnel :</strong> Multisig Auto-Safe pour vos propres portefeuilles."
        ],
        highlight: true
      },
      {
        icon: "🚀",
        title: "Investir à plusieurs (Prévente / Achat groupé)",
        desc: "Le pool collecte les USDT et envoie un ticket unique à la prévente. Filet de sécurité : l'argent est bloqué jusqu'à la validation majoritaire. Remboursement 100% à la deadline en cas d'annulation.",
        bullets: [
          "<strong>Envoi Automatique ⭐:</strong> Destination = contrat de la prévente. La prévente renvoie les tokens automatiquement.",
          "<strong>Envoi Vendeur ⭐:</strong> Le vendeur fait un `transfer()` manuel vers le contrat. Zéro risque pour vous.",
          "<strong>Mode Réclamation ⚠️:</strong> Destination = votre wallet. Vous réclamez les tokens manuellement, puis les envoyez à PerShare pour la Phase 3."
        ]
      },
      {
        icon: "👥",
        title: "Mettre de l'argent en commun (Cagnotte / Tontine)",
        bullets: [
          "<strong style=\"color: var(--text)\">Compte joint sans banque :</strong> Payez une location de vacances ou un Kickstarter. Validation collective.",
          "<strong style=\"color: var(--text)\">Tontine Crypto sécurisée :</strong> Cagnotte collective entre membres cryptos. Le code détient l'argent."
        ]
      },
      {
        icon: "💰",
        title: "Distribuer des gains (Proportionnel)",
        bullets: [
          "<strong style=\"color: var(--text)\">Partage de revenus sans dispute :</strong> Distribution proportionnelle native pour les revenus ponctuels entre créateurs.",
          "<strong style=\"color: var(--text)\">Cagnotte Hackathon :</strong> Distribuez les gains automatiquement entre les membres de l'équipe.",
          "<strong style=\"color: var(--text)\">Trading Pool :</strong> Distribuez les profits de trading de manière transparente."
        ]
      }
    ],
    whyTitle: "Pourquoi utiliser PerShare ?",
    whyDesc: "Oubliez la confiance aveugle. Avec PerShare, <strong>le code fait loi</strong> : la collecte est remboursable (Deadline), l'envoi nécessite un accord majoritaire (Seuil), et la redistribution est infaillible.",
    btn: "J'ai compris !"
  }
};

export function GuideModal({ onClose }: { onClose: () => void }) {
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');
  const t = content[lang];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: '24px'
    }}>
      <div style={{
        background: 'var(--surface)', padding: '32px', borderRadius: '16px',
        width: '100%', maxWidth: '700px', border: '1px solid var(--border)',
        maxHeight: '85vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: 'var(--purple)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {t.title}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', background: 'var(--bg)', borderRadius: '8px', padding: '4px' }}>
              <button onClick={() => setLang('EN')} style={{ background: lang === 'EN' ? 'var(--purple)' : 'transparent', color: lang === 'EN' ? '#fff' : 'var(--muted)', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>EN</button>
              <button onClick={() => setLang('FR')} style={{ background: lang === 'FR' ? 'var(--purple)' : 'transparent', color: lang === 'FR' ? '#fff' : 'var(--muted)', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>FR</button>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '28px' }}>&times;</button>
          </div>
        </div>
        
        <div style={{ lineHeight: '1.6', color: 'var(--text)' }}>
          <p>{t.intro}</p>
          
          <h3 style={{ marginTop: '24px', color: '#E2E8F0', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>{t.subtitle}</h3>
          <p style={{ marginBottom: '16px' }}>{t.intro2}</p>
          
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr' }}>
            {t.cases.map((c, i) => (
              <div key={i} style={{ background: 'var(--bg)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)', borderLeft: c.highlight ? '4px solid var(--purple)' : '' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#E2E8F0' }}>{c.icon} {c.title}</h4>
                {c.desc && <p style={{ fontSize: '14px', color: 'var(--muted)', margin: '0 0 12px 0' }}>{c.desc}</p>}
                <ul style={{ fontSize: '14px', color: 'var(--muted)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {c.bullets.map((b, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: b }}></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '32px', color: '#E2E8F0' }}>{t.whyTitle}</h3>
          <p dangerouslySetInnerHTML={{ __html: t.whyDesc }}></p>

          <button onClick={onClose} style={{ width: '100%', marginTop: '32px', padding: '16px', background: 'var(--purple)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t.btn}
          </button>
        </div>
      </div>
    </div>
  );
}
