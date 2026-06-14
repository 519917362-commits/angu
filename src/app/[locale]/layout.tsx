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

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Angu Wire Mesh',
    alternateName: 'Angu (formerly Paiqi Wire Mesh)',
    url: 'https://www.anguwiremesh.com',
    logo: 'https://www.anguwiremesh.com/images/logo.png',
    description: 'ISO 9001 certified manufacturer of gabion boxes, rockfall protection nets, hexagonal wire mesh, chain link fence, and wire mesh products. Factory-direct pricing from Anping, China.',
    foundingDate: '2015',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Anping County',
      addressRegion: 'Hebei',
      addressCountry: 'CN',
      postalCode: '053600',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+86-138-1234-5678',
      email: 'sales@anguwiremesh.com',
      availableLanguage: ['English', 'Chinese', 'Arabic', 'Japanese', 'Korean', 'Indonesian', 'Vietnamese', 'Spanish', 'French', 'German', 'Portuguese', 'Thai'],
    },
    sameAs: [
      'https://www.linkedin.com/company/anguwiremesh',
      'https://www.facebook.com/anguwiremesh',
    ],
    knowsAbout: [
      'Gabion Box',
      'Rockfall Protection Net',
      'Hexagonal Wire Mesh',
      'Chain Link Fence',
      'Welded Wire Mesh',
      'Barbed Wire',
      'Slope Protection',
      'Noise Barrier',
      'Stainless Steel Rope Net',
      'Crowd Barrier',
    ],
  };

  return (
    <I18nProvider locale={locale}>
      <RTLProvider locale={locale}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd)}}
        />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <InquiryButton />
        <BackToTop />
      </RTLProvider>
    </I18nProvider>
  );
}
