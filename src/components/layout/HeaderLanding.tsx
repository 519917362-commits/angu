'use client';
import { IconEmail, IconPhone } from '../icons';

import { useState } from 'react';
import Link from 'next/link';

interface SocialChannel {
  key: string;
  label: string;
  color: string;
  href: string;
  qrImg: string;
  icon: React.ReactNode;
}

interface Props {
  locale: string;
  logoUrl: string;
  email: string;
  phone: string;
  ctaText: string;
  socials: SocialChannel[];
}

export function HeaderLanding({ locale, logoUrl, email, phone, ctaText, socials }: Props) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const tel = phone.replace(/[^0-9+]/g, '');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 gap-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt="Angu Wire Mesh" className="h-9 w-auto" />
            ) : (
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
            )}
            <div className="hidden sm:block">
              <div className="font-bold text-base text-slate-900 leading-tight">Angu Wire Mesh</div>
              <div className="text-[11px] text-slate-400 leading-tight">
                {locale === 'ms' ? 'Penghadang Bunyi Terus Kilang' : locale === 'ar' ? 'حواجز صوتية مباشرة من المصنع' : 'Factory-Direct Noise Barriers'}
              </div>
            </div>
          </Link>

          {/* Center: email + phone */}
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-600">
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <IconEmail className="w-3.5 h-3.5" />
              <span>{email}</span>
            </a>
            <span className="text-slate-300">|</span>
            <a href={`tel:${tel}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <IconPhone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>
          </div>

          {/* Right: socials with hover QR + CTA */}
          <div className="flex items-center gap-1.5">
            {/* Social icons — 后台没配真实账号时 socials 为空，整块不渲染 */}
            <div className="hidden sm:flex items-center gap-0.5">
              {socials.map((s) => (
                <div
                  key={s.key}
                  className="relative"
                  onMouseEnter={() => setHoveredKey(s.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
                    style={{ color: s.color }}
                    title={s.label}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>

                  {/* QR popover */}
                  {hoveredKey === s.key && (
                    <div className="absolute top-full right-0 mt-1 z-50 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 w-[180px]">
                      <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                        <span style={{ color: s.color }}>{s.icon}</span>
                        {s.label}
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={s.qrImg || `https://quickchart.io/qr?size=140&margin=1&dark=${s.color.replace('#', '')}&light=ffffff&text=${encodeURIComponent(s.href)}`}
                          alt={`${s.label} QR Code`}
                          width={140}
                          height={140}
                          loading="lazy"
                          decoding="async"
                          className="rounded-lg"
                        />
                      </div>
                      <div className="text-[10px] text-slate-400 text-center mt-1.5">
                        {locale === 'vi' ? 'Quét mã để liên hệ' : locale === 'th' ? 'สแกนเพื่อติดต่อ' : locale === 'ms' ? 'Imbas untuk hubungi' : locale === 'ar' ? 'امسح للتواصل' : locale === 'zh' ? '扫码联系' : 'Scan to contact'}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="#quote-form"
               className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
