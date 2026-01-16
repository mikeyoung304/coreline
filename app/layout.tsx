import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Coreline Partners | Investment Management',
  description: 'Sophisticated investment strategies for discerning families and institutions.',
  metadataBase: new URL('https://corelinepartners.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Coreline Partners',
    title: 'Coreline Partners | Investment Management',
    description: 'Sophisticated investment strategies for discerning families and institutions.',
  },
  twitter: {
    card: 'summary',
    title: 'Coreline Partners | Investment Management',
    description: 'Sophisticated investment strategies for discerning families and institutions.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a1628',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
