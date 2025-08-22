import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
});

const webTitle = 'ONYX — це вайб';
const webDescription =
  'Новий стиль атмосфери. Ми не стоїмо на місці — і ти теж.';

export const metadata: Metadata = {
  title: webTitle,
  description: webDescription,
  icons: {
    // Favicons
    icon: [
      { url: '/icon1.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon0.svg', sizes: '244x88', type: 'image/svg+xml' },
    ],
    // Apple touch icon (iOS)
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    // Other icons (Android, Manifest, etc.)
    other: [
      {
        rel: 'android-chrome',
        url: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome',
        url: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: webTitle,
    description: webDescription,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: webTitle,
    description: webDescription,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-black text-white overflow-x-clip scroll-smooth`}
      >
        {children}
      </body>
      <Analytics />
    </html>
  );
}
