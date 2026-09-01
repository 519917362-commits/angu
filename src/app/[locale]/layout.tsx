import {notFound} from 'next/navigation';
import {routing} from '@/lib/routing';
import {I18nProvider} from '@/lib/i18n-context';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {InquiryButton} from '@/components/layout/InquiryButton';
import {BackToTop} from '@/components/layout/BackToTop';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

async function fetchSiteConfig(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/api/site-config`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
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

  const siteConfig = await fetchSiteConfig(locale);
  const logoUrl = siteConfig?.config?.logo_url?.[locale] || '';

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@id': 'https://www.angumesh.com/#organization',
    '@type': ['Organization', 'Manufacturer', 'HomeAndConstructionBusiness'],
    name: 'Angu Wire Mesh',
    alternateName: ['Angu Wire Mesh', 'Hebei Angu Wire Mesh Products Co., Ltd.', '安固丝网'],
    url: 'https://www.angumesh.com',
    logo: 'https://www.angumesh.com/images/logo.png',
    image: 'https://www.angumesh.com/og-image.png',
    description: 'ISO 9001 certified manufacturer of gabion boxes, rockfall protection nets, hexagonal wire mesh, chain link fence, and wire mesh products. Factory-direct pricing from Anping, China.',
    foundingDate: '2015',
    foundingLocation: {
      '@type': 'Place',
      name: 'Anping County, Hebei, China',
      geo: {'@type': 'GeoCoordinates', latitude: 38.235, longitude: 115.520},
    },
    telephone: '+86-188-0318-9797',
    email: 'anguwiremesh@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Anping County',
      addressRegion: 'Hebei',
      addressCountry: 'CN',
      postalCode: '053600',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.235,
      longitude: 115.520,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+86-188-0318-9797',
      email: 'anguwiremesh@gmail.com',
      availableLanguage: ['English', 'Chinese'],
    },
    hasCertification: [
      {'@type': 'Certification', name: 'ISO 9001:2015', certificationIdentification: 'ISO 9001:2015'},
      {'@type': 'Certification', name: 'CE Marking', certificationIdentification: 'CE'},
    ],
    naics: '332618',
    areaServed: [
      {'@type': 'Continent', name: 'Asia'},
      {'@type': 'Continent', name: 'Europe'},
      {'@type': 'Continent', name: 'Africa'},
      {'@type': 'Continent', name: 'South America'},
      {'@type': 'Continent', name: 'North America'},
    ],
    sameAs: [],
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
    // Organization-level return policy (white paper §MerchantReturnPolicy)
    // B2B custom-manufactured industrial goods — returns not accepted.
    // Per spec: product-level policies override this; only add per-product
    // overrides when a subset of products differ from this global policy.
    hasMerchantReturnPolicy: [
      {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
      {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
      {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AE',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
      {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AU',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
    ],
    // Organization-level shipping settings (white paper §OfferShippingDetails)
    // FOB Tianjin: seller covers production → delivery to port.
    // Ocean freight is arranged by buyer; handling time is shown here.
    shippingDetails: [
      {
        '@type': 'OfferShippingDetails',
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 15, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 15, maxValue: 40, unitCode: 'DAY' },
        },
      },
    ],
  };

  return (
    <I18nProvider locale={locale}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd)}}
        />
        <Header locale={locale} logoUrl={logoUrl} />
        <main>{children}</main>
        <Footer locale={locale} logoUrl={logoUrl} />
        <InquiryButton />
        <BackToTop />
    </I18nProvider>
  );
}
