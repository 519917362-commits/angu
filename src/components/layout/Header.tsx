'use client';
import { IconWhatsApp, IconZalo, IconLINE, IconFacebook } from '../icons';

import { categoryHref } from '@/lib/pillars';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {MobileNav} from './MobileNav';
import {HeaderLanding} from './HeaderLanding';
import {MessageCircle} from 'lucide-react';
import {useCategories, useSiteConfig, cfgVal} from '@/lib/hooks';
import { tLabel } from '@/lib/i18n';
import { whatsappNumber, zaloId, lineId, facebookUrl } from '@/lib/channels';

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
  // 配置里的号码是给人看的（+86 188 0318 9797，带空格和加号），
  // 但 wa.me 只吃纯数字。不转换的话，客户端拿到配置后链接会变成
  // https://wa.me/+86 188 0318 9797 —— 直接失效。
  const waDigits = whatsappNumber(whatsapp);
  const email = cfgVal(siteConfig, 'email', locale, 'annie@angumesh.com');
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

    // Social channels for landing header.
    // 每个渠道都先过 src/lib/channels.ts 的判定：没有真实账号就不渲染，
    // 避免越南语页面出现 zalo.me/<+86 手机号> 这种点开找不到人的死链。
    const waNum = waDigits;
    const zaloNum = zaloId(cfgVal(siteConfig, 'zalo', locale, ''));
    const liId = lineId(cfgVal(siteConfig, 'line_id', locale, ''));
    const fbUrl = facebookUrl(cfgVal(siteConfig, 'facebook', locale, ''));
    const qrWa = cfgVal(siteConfig, 'qr_whatsapp', locale, '');
    const qrZa = cfgVal(siteConfig, 'qr_zalo', locale, '');
    const qrLi = cfgVal(siteConfig, 'qr_line', locale, '');
    const qrFb = cfgVal(siteConfig, 'qr_facebook', locale, '');

    const socialChannels: {
      key: string; label: string; color: string; href: string; qrImg: string; icon: React.ReactNode;
    }[] = [];
    if (waNum) socialChannels.push({ key: 'whatsapp', label: 'WhatsApp', color: '#25D366',
      href: `https://wa.me/${waNum}`, qrImg: qrWa, icon: <IconWhatsApp className="w-5 h-5" /> });
    if (zaloNum) socialChannels.push({ key: 'zalo', label: 'Zalo', color: '#0068FF',
      href: `https://zalo.me/${zaloNum}`, qrImg: qrZa, icon: <IconZalo className="w-5 h-5" /> });
    if (liId) socialChannels.push({ key: 'line', label: 'LINE', color: '#06C755',
      href: `https://line.me/ti/p/~${liId}`, qrImg: qrLi, icon: <IconLINE className="w-5 h-5" /> });
    if (fbUrl) socialChannels.push({ key: 'facebook', label: 'Facebook', color: '#1877F2',
      href: fbUrl, qrImg: qrFb, icon: <IconFacebook className="w-5 h-5" /> });

    // Locale-based order: first one is most prominent（缺渠道时自动跳过）
    const localeOrder: Record<string, string[]> = {
      vi: ['zalo', 'whatsapp', 'line', 'facebook'],
      th: ['line', 'whatsapp', 'facebook', 'zalo'],
      en: ['whatsapp', 'facebook', 'zalo', 'line'],
      zh: ['whatsapp', 'zalo', 'line', 'facebook'],
    };
    const orderedKeys = localeOrder[locale] || localeOrder.en;
    const orderedSocials = orderedKeys
      .map(k => socialChannels.find(s => s.key === k))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));

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
                      href={categoryHref(locale, cat.slug)}
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
              href={`https://wa.me/${waDigits}?text=${encodeURIComponent(locale === 'zh' ? '您好，我对贵司产品很感兴趣。' : "Hello, I'm interested in your products.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Nav */}
            <MobileNav locale={locale} whatsapp={waDigits} />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
