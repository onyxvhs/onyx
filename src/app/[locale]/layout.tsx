import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { routing } from '@/i18n/routing';
import { getMessages, getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
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

function safeJsonLd(data: any): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
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
  const hreflang = locale === 'ua' ? 'uk' : 'en';
  const siteUrl = 'https://www.onyx-wave.com';

  return {
    title: tMeta('title'),
    description: tMeta('description'),

    icons: {
      // Favicons
      icon: [
        { url: '/icon.png', sizes: '96x96', type: 'image/png' },
        { url: '/favicon.ico', type: 'image/x-icon' },
        { url: '/icon-svg.svg', sizes: '244x88', type: 'image/svg+xml' },
      ],
      // Apple touch icon (iOS)
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
      // Other icons (Android, Manifest, etc.)
      other: [
        {
          rel: 'icon',
          url: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          rel: 'icon',
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
      locale: hreflang,
      url: siteUrl,
      siteName: 'ONYX',
      alternateLocale: ['en_US', 'uk_UA'],
      images: [
        {
          url: '/og-image.png',
          alt: 'ONYX',
          width: 1200,
          height: 630,
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
          width: 1200,
          height: 630,
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
        en: `${siteUrl}/en`,
        'uk-UA': `${siteUrl}/ua`,
        uk: `${siteUrl}/ua`,
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
  const tMeta = await getTranslations({ locale, namespace: 'Meta' });
  const hreflang = locale === 'ua' ? 'uk' : 'en';
  const basePath = locale === 'en' ? 'en' : 'ua';

  const messages = await getMessages();

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enhanced JSON-LD schemas with more specific data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.onyx-wave.com/#organization',
    name: 'ONYX',
    url: 'https://www.onyx-wave.com',
    description: tMeta('description'),
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.onyx-wave.com/icon-svg.svg',
      width: 244,
      height: 88,
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.onyx-wave.com/og-image.png',
      width: 1200,
      height: 630,
    },
    sameAs: [
      'https://tiktok.com/@onyx_ua',
      'https://instagram.com/onyx_ua',
      'https://t.me/get_onyx',
      'https://t.me/onyxua_bot',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.onyx-wave.com/#website',
    name: 'ONYX',
    url: 'https://www.onyx-wave.com',
    description: tMeta('description'),
    publisher: { '@id': 'https://www.onyx-wave.com/#organization' },
    inLanguage: [hreflang === 'uk' ? 'uk-UA' : 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://www.onyx-wave.com/${basePath}?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Add a LocalBusiness schema if applicable (this might show in Rich Results)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.onyx-wave.com/#localbusiness',
    name: 'ONYX',
    url: 'https://www.onyx-wave.com',
    description: tMeta('description'),
    logo: 'https://www.onyx-wave.com/icon-svg.svg',
    image: 'https://www.onyx-wave.com/og-image.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'UA',
      addressRegion: 'Kiev',
    },
    telephone: '+380777000775',
    sameAs: [
      'https://tiktok.com/@onyx_ua',
      'https://instagram.com/onyx_ua',
      'https://t.me/get_onyx',
      'https://t.me/onyxua_bot',
    ],
  };

  return (
    <html lang={hreflang}>
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
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(localBusinessSchema),
          }}
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
