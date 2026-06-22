'use client';

// PerShare — Providers
// Reown AppKit + wagmi + React Query

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { WagmiProvider, http } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const BSC_TESTNET = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: { default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] } },
  blockExplorers: { default: { name: 'BscScan', url: 'https://testnet.bscscan.com' } },
  testnet: true,
} as const;

const BSC_MAINNET = {
  id: 56,
  name: 'BNB Smart Chain',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: { default: { http: ['https://bsc-dataseed.binance.org/'] } },
  blockExplorers: { default: { name: 'BscScan', url: 'https://bscscan.com' } },
} as const;

const projectId = 'a0485249623e9a167f133146abc2eb4e';

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [BSC_TESTNET, BSC_MAINNET],
  transports: {
    [BSC_TESTNET.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545/'),
    [BSC_MAINNET.id]: http('https://bsc-dataseed.binance.org/'),
  },
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [BSC_TESTNET, BSC_MAINNET],
  projectId,
  metadata: {
    name: 'PerShare',
    description: 'Trustless Pool, Pay, Invest & Share Automatically',
    url: 'https://pershare.org',
    icons: ['/pershare_logo.png']
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#06b6d4',
    '--w3m-border-radius-master': '2px',
  },
  features: {
    analytics: false,
    email: false,
    socials: false,
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {mounted ? children : null}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
