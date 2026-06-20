import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false });
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });
const outfitBody = Outfit({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'PerShare — Trustless Pool, Pay, Invest & Share Automatically',
  description: 'Chaque membre reçoit sa part. Automatiquement. Onchain.',
  keywords: ['pershare', 'bnb chain', 'pool collective', 'presale', 'group buy', 'tontine'],
  openGraph: {
    title: 'PerShare — Trustless Pool, Pay, Invest & Share Automatically',
    description: 'Chaque membre reçoit sa part. Automatiquement. Onchain.',
    url: 'https://pershare.io',
    siteName: 'PerShare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerShare — Trustless Pool, Pay, Invest & Share Automatically',
    description: 'Pool collective, transfert conditionnel, group buy presale. BNB Chain.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${outfit.variable} ${outfitBody.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
