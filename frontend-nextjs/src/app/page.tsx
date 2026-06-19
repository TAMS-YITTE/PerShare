'use client';

// Page principale — redirige vers /app si wallet connecte
// sinon affiche la landing page

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) router.push('/app');
  }, [isConnected, router]);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center' }}>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 700, letterSpacing: '-2px', marginBottom: '16px' }}>
        Per<span style={{ color: 'var(--purple)' }}>Share</span>
      </h1>

      <p style={{ fontSize: '13px', color: 'var(--muted)', letterSpacing: '0.1em', marginBottom: '8px' }}>SHARE</p>

      <p style={{ fontSize: '20px', color: 'var(--muted)', maxWidth: '480px', lineHeight: 1.6, marginBottom: '40px' }}>
        Chaque membre reçoit sa part.<br />Automatiquement. Onchain.
      </p>

      <ConnectButton label="Connecter mon wallet" />

      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '24px' }}>
        BNB Chain · Non-custodial · Audit en cours
      </p>
    </main>
  );
}
