export const locales = ['en', 'zh', 'vi', 'th'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = 'en';

export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'always' as const
};
