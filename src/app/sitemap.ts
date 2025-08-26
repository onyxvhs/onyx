import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.onyx-wave.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          'en-US': `${siteUrl}/en`,
          'uk-UA': `${siteUrl}/ua`,
        },
      },
    },
  ];
}
