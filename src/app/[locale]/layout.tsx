import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import '../globals.css';
import {GoogleAnalytics} from '../GoogleAnalytics';
import {AttributionCapture} from '@/components/AttributionCapture';
import {routing} from '@/lib/routing';
import {I18nProvider} from '@/lib/i18n-context';
import {REVALIDATE_SECONDS, SITE_DATA_TAG} from '@/lib/api';
import {COMPANY} from '@/lib/company';
import {certificationLd} from '@/lib/certifications';
import {Header} from '@/components/layout/Header';
import {Footer} from '@/components/layout/Footer';
import {InquiryButton} from '@/components/layout/InquiryButton';
import {MobileContactBar} from '@/components/layout/MobileContactBar';
import {BackToTop} from '@/components/layout/BackToTop';

/**
 * 本文件是 /{locale}/* 分支的「根 layout」——`app/layout.tsx` 已删除，
 * 因此 <html>/<body> 在这里渲染，才能给每个语种输出正确的 lang 属性。
 *
 * 为什么必须这样做：
 * 1. 之前 <html> 写在 app/layout.tsx（全局唯一根 layout）里，那里拿不到 locale
 *    （params 只存在于 page 和其下的 layout），所以 <html> 只能不带 lang；
 * 2. 缺 lang 会让读原始 HTML 的抓取器（Bing / Yandex / GPTBot、ClaudeBot 等 AI 爬虫）
 *    无法判断页面语言，也影响屏幕阅读器选音；
 * 3. 客户端 useEffect 补 lang 只能治渲染后，抓原始 HTML 依旧拿不到，所以必须在服务端输出。
 *
 * 代价：app/page.tsx 与 app/admin 不再是这里的子节点，二者各自需要根 layout，
 * 根路径重定向改由 next.config.ts 的 redirects() 承担（仍是 308）。
 */

/** locale → BCP-47 语言标签（zh 需带地区码，否则部分抓取器按"未指定"处理） */
const HTML_LANG: Record<string, string> = {
  en: 'en',
  zh: 'zh-CN',
  vi: 'vi',
  th: 'th',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.angumesh.com'),
  title: {
    default: 'Angu Wire Mesh — Factory-Direct Gabion Boxes & Rockfall Protection Nets | ISO 9001',
    template: '%s',
  },
  description:
    'Leading Chinese manufacturer of gabion boxes, PVC gabion, Reno mattress, active/passive rockfall protection nets. Factory direct, OEM available. ISO certified, 30+ countries exported.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  // 站点所有权验证：码值由环境变量注入，换验证方式时不必改代码。
  // GSC 的 HTML 标签验证只覆盖「网址前缀」属性；「域名」属性需 DNS TXT，
  // 覆盖 www / 非 www / http / https 全部变体，建议最终切到 DNS 验证。
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION
      || 'EHjXUQbEQyBPYcUv9s7FJ7zQB7n6Y7Z42fztR4k4MRY',
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } }
      : {}),
  },
};


export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

async function fetchSiteConfig(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${baseUrl}/api/site-config`, {
      // ISR：后台定期再生；管理后台保存后由 /api/revalidate 主动失效
      next: { revalidate: REVALIDATE_SECONDS, tags: [SITE_DATA_TAG] },
    });
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
    // 注意：schema.org 没有 Manufacturer 这个类型（只有 manufacturer 属性），
    // 之前写成 ["Organization","Manufacturer",...] 属无效类型，会让整段 JSON-LD 校验失败。
    '@type': ['Organization', 'HomeAndConstructionBusiness'],
    name: 'Angu Wire Mesh',
    legalName: COMPANY.legalNameEn,
    alternateName: ['Angu Wire Mesh', '安固丝网', COMPANY.legalNameEn, COMPANY.legalNameZh],
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'UnifiedSocialCreditCode',
      value: COMPANY.creditCode,
    },
    url: 'https://www.angumesh.com',
    logo: 'https://www.angumesh.com/images/logo.png',
    image: 'https://www.angumesh.com/og-image.jpg',
    description: 'ISO 9001 / 14001 / 45001 certified manufacturer of gabion boxes, rockfall protection nets, hexagonal wire mesh, chain link fence, and wire mesh products. Factory-direct pricing from Anping, China.',
    foundingDate: COMPANY.foundedISO,
    foundingLocation: {
      '@type': 'Place',
      name: 'Anping County, Hebei, China',
      geo: {'@type': 'GeoCoordinates', latitude: 38.235, longitude: 115.520},
    },
    telephone: '+86-188-0318-9797',
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.addressLocality,
      addressRegion: COMPANY.addressRegion,
      addressCountry: COMPANY.addressCountry,
      postalCode: COMPANY.postalCode,
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
      email: COMPANY.email,
      availableLanguage: ['English', 'Chinese', 'Vietnamese', 'Thai'],
    },
    hasCertification: [
      ...certificationLd(),
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
    <html lang={HTML_LANG[locale] ?? 'en'} suppressHydrationWarning>
      {/* pb-16/sm:pb-0 给移动端底部常驻联系条留出高度，否则会盖住页脚最后一行 */}
      <body className="pb-16 sm:pb-0">
        <GoogleAnalytics />
        <AttributionCapture />
        <I18nProvider locale={locale}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd)}}
          />
          <Header locale={locale} logoUrl={logoUrl} />
          <main>{children}</main>
          <Footer locale={locale} logoUrl={logoUrl} />
          <InquiryButton />
          <MobileContactBar locale={locale} />
          <BackToTop />
        </I18nProvider>
      </body>
    </html>
  );
}
