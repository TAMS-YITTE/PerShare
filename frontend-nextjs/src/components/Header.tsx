'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GuideModal } from './GuideModal';
import { ComparisonModal } from './ComparisonModal';

export function Header() {
  const pathname = usePathname();
  const [showGuide, setShowGuide] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  
  const navLinks = [
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'FAQ', href: '/faq' },
  ];

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
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
            <Link href="/app" style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              color: '#fff',
              textDecoration: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)',
              transition: 'transform 0.2s',
            }}>
              LAUNCH APP
            </Link>

            <button
              onClick={() => setShowComparison(true)}
              style={{ background: 'transparent', border: '1px solid #06b6d4', color: '#06b6d4', padding: '6px 14px', borderRadius: '24px', fontSize: '13px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
            >
              Why PerShare?
            </button>
            <button
              onClick={() => setShowGuide(true)}
              style={{ background: 'transparent', border: '1px solid #06b6d4', color: '#06b6d4', padding: '6px 14px', borderRadius: '24px', fontSize: '13px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
            >
              How it works?
            </button>
            
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  style={{
                    color: isActive ? '#fff' : '#8892b0',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: isActive ? '600' : '400',
                    transition: 'color 0.2s'
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Wallet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="wallet-wrapper">
              <ConnectButton showBalance={false} />
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

      {showGuide && <GuideModal onClose={() => setShowGuide(false)} />}
      {showComparison && <ComparisonModal onClose={() => setShowComparison(false)} />}
    </>
  );
}
