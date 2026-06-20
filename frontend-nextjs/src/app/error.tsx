'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("FATAL REACT ERROR CAUGHT:", error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px', textAlign: 'center', background: '#0a0f1c', color: '#fff' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#ef4444' }}>Something went wrong!</h2>
      <p style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '16px', borderRadius: '8px', maxWidth: '600px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '14px', marginBottom: '24px' }}>
        {error.message || JSON.stringify(error)}
      </p>
      <button
        onClick={() => reset()}
        style={{
          background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Try again
      </button>
    </div>
  );
}
