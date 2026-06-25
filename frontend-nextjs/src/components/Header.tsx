'use client';

import React from 'react';
import Link from 'next/link';
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';

function CustomConnectButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <button onClick={() => open()} style={{
        background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
        color: '#fff',
        border: 'none',
        padding: '8px 18px',
        borderRadius: '24px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.2s',
      }}>
        Connect Wallet
      </button>
    );
  }

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button onClick={() => open()} style={{
        background: '#1c2333',
        border: '1px solid #2a344a',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.2s',
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
        {shortAddress}
      </button>
      
      <button onClick={() => disconnect()} style={{
        background: '#1c2333',
        border: '1px solid #2a344a',
        color: '#ef4444',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }} title="Disconnect">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
      </button>
    </div>
  );
}

export function Header() {


  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 15, 28, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #1a233a',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-body)'
        }}>
          {/* Left: Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <img src="/pershare_logo.png" alt="PerShare" style={{ width: '36px', height: '36px', borderRadius: '6px' }} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: 0, fontWeight: 'bold', color: '#fff' }}>
              Per<span style={{ color: 'var(--purple)' }}>Share</span>
            </h1>
          </Link>

          {/* Center: Navigation */}
          <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/how-pools-work" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>How it works</Link>
            <a href="/#why" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Why PerShare</a>
            <Link href="/security" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Security</Link>
            <Link href="/app" style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 18px',
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)',
              transition: 'transform 0.2s',
            }}>
              Launch App
            </Link>
          </nav>

          {/* Right: Reown Wallet Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="wallet-wrapper">
              <CustomConnectButton />
            </div>
          </div>
        </div>
        
        {/* Responsive styles */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .wallet-wrapper { transform: scale(0.9); }
          }
        `}} />
      </header>
    </>
  );
}
