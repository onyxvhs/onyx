import { Locale } from '@/i18n/navigation';

export function defineCurrentLocale(locale: Locale): string {
  switch (locale) {
    case 'ua':
      return 'uk-UA';
    case 'en':
      return 'en-US';
    default:
      return 'uk-UA';
  }
}
