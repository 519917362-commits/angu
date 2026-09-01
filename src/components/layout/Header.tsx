'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {MobileNav} from './MobileNav';
import {HeaderLanding} from './HeaderLanding';
import {MessageCircle} from 'lucide-react';
import {useCategories, useSiteConfig, cfgVal} from '@/lib/hooks';
import { tLabel } from '@/lib/i18n';

interface HeaderProps {
  locale: string;
  logoUrl?: string;
}

export function Header({locale, logoUrl: serverLogoUrl = ''}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const categories = useCategories();
  const siteConfig = useSiteConfig();
  const pathname = usePathname();
  const isLanding = pathname?.includes('/noise-barrier');

  const whatsapp = cfgVal(siteConfig, 'whatsapp', locale, '8618803189797');
  const email = cfgVal(siteConfig, 'email', locale, 'anguwiremesh@gmail.com');
  const phone = cfgVal(siteConfig, 'phone', locale, '+86 188 0318 9797');
  const clientLogoUrl = cfgVal(siteConfig, 'logo_url', locale, '');
  const logoUrl = serverLogoUrl || clientLogoUrl;

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Landing Page: Minimal Header ───
  if (isLanding) {
    const ctaText = locale === 'vi' ? 'Nhận Báo Giá' : locale === 'th' ? 'ขอใบเสนอราคา' : locale === 'zh' ? '获取报价' : 'Get Quote';

    // Social channels for landing header
    const waNum = whatsapp.replace(/[^0-9]/g, '');
    const zaloNum = (cfgVal(siteConfig, 'zalo', locale, phone)).replace(/[^0-9]/g, '');
    const lineId = cfgVal(siteConfig, 'line_id', locale, 'anguwiremesh');
    const fbUrl = cfgVal(siteConfig, 'facebook', locale, 'https://www.facebook.com/anguwiremesh');
    const qrWa = cfgVal(siteConfig, 'qr_whatsapp', locale, '');
    const qrZa = cfgVal(siteConfig, 'qr_zalo', locale, '');
    const qrLi = cfgVal(siteConfig, 'qr_line', locale, '');
    const qrFb = cfgVal(siteConfig, 'qr_facebook', locale, '');

    const socialChannels = [
      { key: 'whatsapp', label: 'WhatsApp', color: '#25D366',
        href: `https://wa.me/${waNum}`,
        qrImg: qrWa,
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg> },
      { key: 'zalo', label: 'Zalo', color: '#0068FF',
        href: `https://zalo.me/${zaloNum}`,
        qrImg: qrZa,
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 5.94 2 10.5c0 2.5 1.4 4.74 3.6 6.21-.16.86-.58 2.13-1.51 3.27-.26.32-.02.8.39.74 1.92-.27 3.36-1.01 4.3-1.64.94.21 1.92.32 2.92.32 5.523 0 10-3.94 10-8.5S17.523 2 12 2zm-3.8 9.5c0 .28-.22.5-.5.5H6.2v1.5c0 .28-.22.5-.5.5h-.4c-.28 0-.5-.22-.5-.5V12H3.3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5H4.8V9.1c0-.28.22-.5.5-.5h.4c.28 0 .5.22.5.5v1.5h1.5c.28 0 .5.22.5.5v.4zm5.1 1.8c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v.4zm0-2.4c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v.4zm0-2.4c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v.4zm4.6 2.4c0 .28-.22.5-.5.5h-1.7l1.55 1.55c.2.2.2.52 0 .72-.1.1-.23.15-.36.15s-.26-.05-.36-.15L14.5 10.8c-.2-.2-.2-.52 0-.72s.52-.2.72 0L16.77 11.6c.2.2.2.52 0 .72-.1.1-.23.15-.36.15h.69c.28 0 .5.22.5.5v.4z"/></svg> },
      { key: 'line', label: 'LINE', color: '#06C755',
        href: `https://line.me/ti/p/~${lineId}`,
        qrImg: qrLi,
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg> },
      { key: 'facebook', label: 'Facebook', color: '#1877F2',
        href: fbUrl,
        qrImg: qrFb,
        icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/></svg> },
    ];

    // Locale-based order: first one is most prominent
    const localeOrder: Record<string, string[]> = {
      vi: ['zalo', 'whatsapp', 'line', 'facebook'],
      th: ['line', 'whatsapp', 'facebook', 'zalo'],
      en: ['whatsapp', 'facebook', 'zalo', 'line'],
      zh: ['whatsapp', 'zalo', 'line', 'facebook'],
    };
    const orderedKeys = localeOrder[locale] || localeOrder.en;
    const orderedSocials = orderedKeys.map(k => socialChannels.find(s => s.key === k)!).filter(Boolean);

    return (
      <HeaderLanding locale={locale} logoUrl={logoUrl} email={email} phone={phone} ctaText={ctaText} socials={orderedSocials} />
    );
  }

  return (
    <>
      {/* Top contact bar */}
      <div className="hidden lg:block bg-blue-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end gap-6 py-1.5">
          <a href={`mailto:${email}`} className="hover:text-blue-200 transition-colors flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {email}
          </a>
          <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-200 transition-colors flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {phone}
          </a>
        </div>
      </div>
    <header
      className={`sticky top-0 z-40 transition-all duration-300 py-3 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 flex-shrink-0"
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Angu Wire Mesh" className="h-10 w-auto" />
            ) : (
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            )}
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-slate-900 leading-tight">Angu Wire Mesh</div>
              <div className="text-xs text-slate-500 leading-tight">{cfgVal(siteConfig, 'company_tagline', locale, tLabel('丝网类 · 护栏网 · 石笼网 · 防护网 · 声屏障', 'Wire Mesh · Gabion · Fencing · Protection · Noise Barrier', locale))}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <Link
              href={`/${locale}`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === `/${locale}` || pathname === `/${locale}/`
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {tLabel('首页', 'Home', locale)}
            </Link>

            {/* Products with dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <Link
                href={`/${locale}/products`}
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname?.includes('/products')
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {tLabel('产品', 'Products', locale)}
                <svg className={`w-4 h-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {isProductsOpen && (
                <div className="absolute top-full start-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden max-h-[70vh] overflow-y-auto">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/${locale}/products?category=${cat.slug}`}
                      className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0"
                    >
                      {cat.names[locale] || cat.names.en}
                    </Link>
                  ))}
                  <Link
                    href={`/${locale}/products`}
                    className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 transition-colors text-center"
                  >
                    {tLabel('查看全部产品 →', 'View All Products →', locale)}
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions */}
            <Link
              href={`/${locale}/solutions`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/solutions')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {tLabel('解决方案', 'Solutions', locale)}
            </Link>

            {/* About Us */}
            <Link
              href={`/${locale}/about`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/about')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {tLabel('关于我们', 'About Us', locale)}
            </Link>

            {/* Services */}
            <Link
              href={`/${locale}/service`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/service')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {tLabel('服务', 'Services', locale)}
            </Link>

            {/* Blog */}
            <Link
              href={`/${locale}/blog`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/blog')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {tLabel('博客', 'Blog', locale)}
            </Link>

            {/* Contact Us */}
            <Link
              href={`/${locale}/contact`}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname?.includes('/contact')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {tLabel('联系我们', 'Contact Us', locale)}
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(locale === 'zh' ? '您好，我对贵司产品很感兴趣。' : "Hello, I'm interested in your products.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Nav */}
            <MobileNav locale={locale} whatsapp={whatsapp} />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
