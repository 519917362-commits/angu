'use client';

import Link from 'next/link';
import {Mail, Phone, MapPin} from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({locale}: FooterProps) {
  const isZh = locale === 'zh';

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PQ</span>
              </div>
              <div>
                <div className="font-bold text-white leading-tight">Paiqi Wire Mesh</div>
                <div className="text-xs text-slate-500 leading-tight">Gabion & Protection Net</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              {isZh
                ? '河北派琦丝网制品有限公司是一家专业制造商，专注于石笼网箱、防护网、六角网和勾花网围栏产品。'
                : 'Hebei Paiqi Wire Mesh Products Co., Ltd. is a professional manufacturer specializing in gabion boxes, protection nets, hexagonal mesh, and chain link fence products.'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Anping County, Hengshui, Hebei, China</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="tel:+8613812345678" className="hover:text-white transition-colors">+86 138-1234-5678</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a href="mailto:sales@paiqiwiremesh.com" className="hover:text-white transition-colors">sales@paiqiwiremesh.com</a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-5">{isZh ? '产品' : 'Products'}</h3>
            <ul className="space-y-3 text-sm">
              {[
                {label: isZh ? '石笼网箱' : 'Gabion Box', href: `/${locale}/products?category=gabion-mesh`},
                {label: isZh ? '防护网' : 'Protection Net', href: `/${locale}/products?category=protection-net`},
                {label: isZh ? '六角网' : 'Hexagonal Mesh', href: `/${locale}/products?category=hexagonal-mesh`},
                {label: isZh ? '勾花网围栏' : 'Chain Link Fence', href: `/${locale}/products?category=chain-link-fence`},
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-5">{isZh ? '公司' : 'Company'}</h3>
            <ul className="space-y-3 text-sm">
              {[
                {label: isZh ? '关于我们' : 'About Us', href: `/${locale}/about`},
                {label: isZh ? '服务' : 'Services', href: `/${locale}/service`},
                {label: isZh ? '博客' : 'Blog', href: `/${locale}/blog`},
                {label: isZh ? '联系我们' : 'Contact Us', href: `/${locale}/contact`},
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-white font-semibold mb-5">{isZh ? '认证' : 'Certifications'}</h3>
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
          <p className="text-sm text-slate-500">
            © 2025 Hebei Paiqi Wire Mesh Products Co., Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <Link href={`/${locale}/download`} className="hover:text-white transition-colors">{isZh ? '下载中心' : 'Downloads'}</Link>
            <span>|</span>
            <Link href={`/${locale}/service/faq`} className="hover:text-white transition-colors">{isZh ? '常见问题' : 'FAQ'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
