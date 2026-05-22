import {notFound} from 'next/navigation';
import {routing} from '@/lib/routing';
import {I18nProvider} from '@/lib/i18n-context';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {InquiryButton} from '@/components/layout/InquiryButton';
import {BackToTop} from '@/components/layout/BackToTop';
import {RTLProvider} from '@/components/layout/RTLProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  return (
    <I18nProvider locale={locale}>
      <RTLProvider locale={locale}>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <InquiryButton />
        <BackToTop />
      </RTLProvider>
    </I18nProvider>
  );
}
