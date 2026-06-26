'use client';

import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

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
            <img src="/pershare_logo.svg" alt="PerShare" style={{ width: '40px', height: '40px' }} />
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

          {/* Right: Wallet + mobile menu toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="wallet-wrapper">
              <CustomConnectButton />
            </div>
            <button
              className="mobile-nav-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'transparent', border: '1px solid #2a344a', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid #1a233a', background: 'rgba(10, 15, 28, 0.98)', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link href="/how-pools-work" onClick={() => setMenuOpen(false)} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: 500, padding: '12px 8px' }}>How it works</Link>
            <a href="/#why" onClick={() => setMenuOpen(false)} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: 500, padding: '12px 8px' }}>Why PerShare</a>
            <Link href="/security" onClick={() => setMenuOpen(false)} style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '15px', fontWeight: 500, padding: '12px 8px' }}>Security</Link>
            <Link href="/app" onClick={() => setMenuOpen(false)} style={{ marginTop: '8px', textAlign: 'center', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '12px', fontSize: '15px', fontWeight: 'bold' }}>Launch App</Link>
          </div>
        )}

        {/* Responsive styles */}
        <style dangerouslySetInnerHTML={{__html: `
          .mobile-nav-toggle { display: none; }
          @media (max-width: 768px) {
            .desktop-nav { display: none !important; }
            .mobile-nav-toggle { display: flex !important; }
            .wallet-wrapper { transform: scale(0.9); }
          }
        `}} />
      </header>
    </>
  );
}
