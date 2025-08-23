import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { routing } from '@/i18n/routing';
import { getMessages, getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { defineCurrentLocale } from '@/utils/defineCurrentLocale';
import { NextIntlClientProvider } from 'next-intl';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const currentLocale = defineCurrentLocale(locale as Locale);
  const siteUrl = 'https://www.onyx-wave.com';

  return {
    title: tMeta('title'),
    description: tMeta('description'),
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
      title: tMeta('title'),
      description: tMeta('description'),
      type: 'website',
      locale: currentLocale,
      url: siteUrl,
      alternateLocale: ['en_US', 'uk_UA'],
      images: [
        {
          url: '/og-image.png',
          alt: 'ONYX',
          width: 1102,
          height: 406,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tMeta('title'),
      description: tMeta('description'),
      site: siteUrl,
      images: [
        {
          url: '/og-image.png',
          alt: 'ONYX',
          width: 1102,
          height: 406,
          type: 'image/png',
        },
      ],
    },
    robots: 'index, follow',
    metadataBase: new URL('https://www.onyx-wave.com'),
    alternates: {
      canonical: siteUrl,
      languages: {
        'en-US': `${siteUrl}/en`,
        'uk-UA': `${siteUrl}/ua`,
        'x-default': `${siteUrl}/ua`,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const currentLocale = defineCurrentLocale(locale as Locale);
  const messages = await getMessages();

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.onyx-wave.com#website',
    url: 'https://www.onyx-wave.com',
    inLanguage: 'en-US',
    name: 'ONYX',
    description:
      'ONYX creates a next-generation atmosphere: nicotine-free hookah products based on hibiscus with natural flavors. Pure taste, vibrant vibe, and an entirely new style of relaxation.',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.onyx-wave.com#person',
      name: 'ONYX',
      sameAs: ['https://t.me/get_onyx'],
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.onyx-wave.com/web-app-manifest-512x512.png',
        width: 512,
        height: 512,
      },
    },
  };

  return (
    <html lang={currentLocale}>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-black text-white overflow-x-clip scroll-smooth`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
