'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  
  const navLinks = [
    { name: 'App', href: '/app' },
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(10, 15, 28, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #1a233a',
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

      {/* Center: Navigation (Hidden on very small screens) */}
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
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

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {pathname !== '/app' && (
          <Link href="/app" style={{
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)',
            transition: 'transform 0.2s',
          }}>
            LAUNCH APP
          </Link>
        )}
        <div className="wallet-wrapper">
          {/* @ts-ignore */}
          <w3m-button balance="hide" />
        </div>
      </div>
      
      {/* Basic responsive styles injected inline for simplicity */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .wallet-wrapper { transform: scale(0.9); }
        }
      `}} />
    </header>
  );
}
