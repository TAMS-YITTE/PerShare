'use client';

// Page principale — redirige vers /app si wallet connecte
// sinon affiche la landing page

import { useAccount } from 'wagmi';
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
        Automated trustless pooling protocol on BNB Chain.<br />Pool, pay, and share automatically.
      </p>

      {/* @ts-ignore */}
      <appkit-button label="Connect Wallet" />

      <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '24px' }}>
        BNB Chain · Non-custodial · Audit in progress<br/>
        <a href="mailto:support@pershare.org" style={{ color: 'var(--purple)', textDecoration: 'none', marginTop: '8px', display: 'inline-block' }}>support@pershare.org</a>
      </p>
    </main>
  );
}
