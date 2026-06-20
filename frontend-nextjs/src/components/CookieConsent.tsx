'use client';

import React, { useState, useEffect } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pershare_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('pershare_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('pershare_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      right: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      zIndex: 9999
    }}>
      <div>
        <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>We value your privacy</h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
          We use strictly necessary cookies and local storage to keep you connected and save your preferences. 
          We do not use tracking or advertising cookies. By continuing to use PerShare, you agree to our 
          <a href="/privacy" style={{ color: 'var(--purple)', marginLeft: '4px', textDecoration: 'none' }}>Privacy Policy</a>.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleDecline}
          style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Decline
        </button>
        <button 
          onClick={handleAccept}
          style={{ background: 'var(--purple)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
