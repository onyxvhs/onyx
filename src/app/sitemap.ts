import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.onyx-wave.com';

const pathsByLocale: Record<string, string> = {
  uk: '/ua', // Ukrainian content path, hreflang=uk
  en: '/en',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const alternates: NonNullable<MetadataRoute.Sitemap[number]['alternates']> = {
    languages: {
      en: `${siteUrl}${pathsByLocale.en}`,
      uk: `${siteUrl}${pathsByLocale.uk}`,
      'x-default': `${siteUrl}/`,
    },
  };

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates,
    },
    {
      url: `${siteUrl}${pathsByLocale.uk}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
      alternates,
    },
    {
      url: `${siteUrl}${pathsByLocale.en}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates,
    },
  ];
}
