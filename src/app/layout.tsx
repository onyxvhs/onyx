import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'ONYX - Кіберспорт та Розваги',
  description:
    'Інтернет-магазин товарів для повнолітніх. Кіберспорт, ігри та розваги.',
  openGraph: {
    title: '',
    description: '',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
