'use client';

// PerShare — Providers
// Reown AppKit + wagmi + React Query

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { WagmiProvider, http, fallback } from 'wagmi';
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

// Public production stays mainnet-only. Set NEXT_PUBLIC_ENABLE_TESTNET=true
// (e.g. in local/preview) to expose BSC Testnet in the wallet network switcher.
const ENABLE_TESTNET = process.env.NEXT_PUBLIC_ENABLE_TESTNET === 'true';
const APP_NETWORKS: any = ENABLE_TESTNET ? [BSC_MAINNET, BSC_TESTNET] : [BSC_MAINNET];

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: APP_NETWORKS,
  transports: {
    [BSC_TESTNET.id]: http('https://data-seed-prebsc-1-s1.binance.org:8545/'),
    [BSC_MAINNET.id]: fallback([
      http('https://bnb-mainnet.g.alchemy.com/v2/1Y-44TqaZ_50x3sgRaNbw'),
      http('https://bsc-dataseed.binance.org/'),
      http('https://bsc-dataseed1.defibit.io/')
    ]),
  },
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: APP_NETWORKS,
  projectId,
  metadata: {
    name: 'PerShare',
    description: 'Group pooling on BNB Chain — pool, send & distribute automatically',
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
