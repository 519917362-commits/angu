export const locales = ['en', 'zh', 'ar', 'ja', 'ko', 'id', 'vi', 'es', 'fr', 'de', 'pt', 'th'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'always' as const
};
