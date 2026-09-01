'use client';

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
              <div className="text-[11px] text-slate-400 leading-tight">Factory-Direct Noise Barriers</div>
            </div>
          </Link>

          {/* Center: email + phone */}
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-600">
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{email}</span>
            </a>
            <span className="text-slate-300">|</span>
            <a href={`tel:${tel}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{phone}</span>
            </a>
          </div>

          {/* Right: socials with hover QR + CTA */}
          <div className="flex items-center gap-1.5">
            {/* Social icons */}
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
                          className="rounded-lg"
                        />
                      </div>
                      <div className="text-[10px] text-slate-400 text-center mt-1.5">
                        {locale === 'vi' ? 'Quét mã để liên hệ' : locale === 'th' ? 'สแกนเพื่อติดต่อ' : locale === 'zh' ? '扫码联系' : 'Scan to contact'}
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
