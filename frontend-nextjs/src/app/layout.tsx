import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false });
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';


const inter = Inter({ subsets: ['latin'], variable: '--font-display' });
const interBody = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pershare.org'),
  title: 'PerShare — Group Pooling on BNB Chain. Pool, Send & Share Automatically',
  description: 'Every member receives their share. Automatically. Onchain.',
  keywords: ['pershare', 'bnb chain', 'group pooling', 'presale', 'group buy', 'tontine'],
  icons: { icon: '/pershare_logo.svg', shortcut: '/pershare_logo.svg' },
  openGraph: {
    title: 'PerShare — Group Pooling on BNB Chain. Pool, Send & Share Automatically',
    description: 'Every member receives their share. Automatically. Onchain.',
    url: 'https://www.pershare.org',
    siteName: 'PerShare',
    images: ['/pershare_banner.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerShare — Group Pooling on BNB Chain. Pool, Send & Share Automatically',
    description: 'Group pooling, conditional transfers, group buys. BNB Chain.',
    images: ['/pershare_banner.png'],
  },
};

import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interBody.variable}`}>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
          <CookieConsent />
          <Toaster theme="dark" position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
