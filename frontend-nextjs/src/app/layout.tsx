import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false });
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const spaceGroteskBody = Space_Grotesk({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'PerShare — Group Pooling on BNB Chain. Pool, Send & Share Automatically',
  description: 'Chaque membre reçoit sa part. Automatiquement. Onchain.',
  keywords: ['pershare', 'bnb chain', 'pool collective', 'presale', 'group buy', 'tontine'],
  openGraph: {
    title: 'PerShare — Group Pooling on BNB Chain. Pool, Send & Share Automatically',
    description: 'Chaque membre reçoit sa part. Automatiquement. Onchain.',
    url: 'https://pershare.org',
    siteName: 'PerShare',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerShare — Group Pooling on BNB Chain. Pool, Send & Share Automatically',
    description: 'Pool collective, transfert conditionnel, group buy presale. BNB Chain.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${spaceGroteskBody.variable}`}>
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
