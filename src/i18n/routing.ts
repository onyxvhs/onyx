import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ua'] as const,

  // Used when no locale matches
  defaultLocale: 'ua',
  localeDetection: true,
  localePrefix: 'always',
});
