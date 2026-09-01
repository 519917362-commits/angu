'use client';

import {useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Mail, Phone, MapPin} from 'lucide-react';
import {useCategories, useSiteConfig, cfgVal} from '@/lib/hooks';
import { tLabel } from '@/lib/i18n';

interface FooterProps {
  locale: string;
  logoUrl?: string;
}

export function Footer({locale, logoUrl: serverLogoUrl = ''}: FooterProps) {
  const pathname = usePathname();
  const isLanding = pathname?.includes('/noise-barrier');
  const isZh = locale === 'zh';
  const categories = useCategories();
  const siteConfig = useSiteConfig();
  const [logoError, setLogoError] = useState(false);
  const phone = cfgVal(siteConfig, 'phone', locale, '+86 188 0318 9797');
  const email = cfgVal(siteConfig, 'email', locale, 'anguwiremesh@gmail.com');
  const address = cfgVal(siteConfig, 'address', locale, 'Anping County, Hengshui, Hebei, China');
  const copyright = cfgVal(siteConfig, 'copyright', locale, `© ${new Date().getFullYear()} Hebei Angu Wire Mesh Products Co., Ltd.`);
  const clientLogoUrl = cfgVal(siteConfig, 'logo_url', locale, '');
  const logoUrl = serverLogoUrl || clientLogoUrl;

  if (isLanding) {
    return (
      <footer className="bg-slate-900 text-slate-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm mb-4">
            <span>Angu Wire Mesh</span>
            <span className="text-slate-700">|</span>
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
            <span className="text-slate-700">|</span>
            <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
          </div>
          <p className="text-xs text-slate-500">{copyright}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              {logoUrl && !logoError ? (
                <div className="h-8 w-8 bg-white rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={logoUrl}
                    alt="Angu Wire Mesh"
                    className="h-6 w-auto object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
              )}
              <div>
                <div className="font-bold text-white leading-tight">{cfgVal(siteConfig, 'company_name_en', locale, 'Angu Wire Mesh')}</div>
                <div className="text-xs text-slate-500 leading-tight">{tLabel('丝网类 · 护栏网 · 石笼网 · 防护网 · 声屏障', 'Wire Mesh · Fencing · Gabion · Protection · Noise Barrier', locale)}</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              {cfgVal(siteConfig, 'company_short_intro_en', locale, isZh
                ? '安固丝网是一家专业制造商，主营电焊网、护栏网、石笼网、边坡防护网、声屏障等金属丝网产品，出口30多个国家和地区。'
                : 'Hebei Angu Wire Mesh Products Co., Ltd. is a professional manufacturer of welded wire mesh, chain link fence, gabion boxes, slope protection nets, noise barriers and more — exported to 30+ countries.')}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-5">{tLabel('产品分类', 'Products', locale)}</h3>
            <ul className="space-y-3 text-sm">
              {categories.length > 0 ? categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${locale}/products?category=${cat.slug}`} className="text-slate-400 hover:text-white transition-colors">
                    {cat.names[locale as 'en'|'zh'] || cat.names.en}
                  </Link>
                </li>
              )) : null}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5">{tLabel('公司', 'Company', locale)}</h3>
            <ul className="space-y-3 text-sm">
              {[
                {label: tLabel('关于我们', 'About Us', locale), href: `/${locale}/about`},
                {label: tLabel('解决方案', 'Solutions', locale), href: `/${locale}/solutions`},
                {label: tLabel('服务', 'Services', locale), href: `/${locale}/service`},
                {label: tLabel('博客', 'Blog', locale), href: `/${locale}/blog`},
                {label: tLabel('联系我们', 'Contact Us', locale), href: `/${locale}/contact`},
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-white font-semibold mb-5">{tLabel('认证', 'Certifications', locale)}</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>CE Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>ETAG 027</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">✓</span>
                <span>SGS / BV Inspection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">{copyright}</p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <Link href={`/${locale}/download`} className="hover:text-white transition-colors">{tLabel('下载中心', 'Downloads', locale)}</Link>
            <span>|</span>
            <Link href={`/${locale}/service/faq`} className="hover:text-white transition-colors">{tLabel('常见问题', 'FAQ', locale)}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
