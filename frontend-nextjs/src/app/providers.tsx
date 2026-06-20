'use client';

// PerShare — Providers
// RainbowKit + wagmi + React Query

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { WagmiProvider, http } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

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

const config = getDefaultConfig({
  appName: 'PerShare',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'a0485249623e9a167f133146abc2eb4e',
  chains: [BSC_TESTNET, BSC_MAINNET],
  ssr: false,
  transports: {
    [BSC_TESTNET.id]: http(),
    [BSC_MAINNET.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en" theme={darkTheme({ accentColor: '#06b6d4', borderRadius: 'medium' })}>
          {mounted ? children : null}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
