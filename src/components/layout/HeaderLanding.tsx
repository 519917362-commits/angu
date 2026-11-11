'use client';
import { IconEmail, IconPhone } from '../icons';
import {localeHref} from '@/lib/routing';

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
        <div className="flex items-center justify-between py-2 sm:py-2.5 gap-3 sm:gap-4">
          {/* Logo + 品牌信息（移动端补公司名与联系方式，原手机端这块是空的） */}
          <div className="flex items-center gap-2 min-w-0 md:shrink-0">
            <Link href={localeHref(locale, '')} className="flex-shrink-0" aria-label="Angu Wire Mesh">
              {logoUrl ? (
                <img src={logoUrl} alt="Angu Wire Mesh" width={80} height={80} className="h-9 w-auto" />
              ) : (
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
              )}
            </Link>
            <div className="min-w-0">
              <Link
                href={localeHref(locale, '')}
                className="block font-bold text-[13px] leading-[1.15] sm:text-base sm:leading-tight text-slate-900 truncate"
              >
                Angu Wire Mesh
              </Link>
              <div className="hidden sm:block text-[11px] text-slate-400 leading-tight truncate">
                {locale === 'ms' ? 'Penghadang Bunyi Terus Kilang' : locale === 'ar' ? 'حواجز صوتية مباشرة من المصنع' : 'Factory-Direct Noise Barriers'}
              </div>
              {/* 移动端联系方式 */}
              <div className="sm:hidden mt-[3px] space-y-[1px]">
                <a
                  href={`tel:${tel}`}
                  className="flex items-center gap-1 py-0.5 -my-px text-[11px] leading-[1.3] text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <IconPhone className="w-3 h-3 flex-shrink-0 text-blue-600" />
                  <span className="truncate">{phone}</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-1 py-0.5 -my-px text-[11px] leading-[1.3] text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <IconEmail className="w-3 h-3 flex-shrink-0 text-blue-600" />
                  <span className="truncate">{email}</span>
                </a>
              </div>
            </div>
          </div>

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
            {/* Social icons — 后台没配真实账号时 socials 为空，整块不渲染
                Facebook 是网页主页，点击直接跳转；只有需要「扫到手机上」的
                聊天类渠道才在 hover 时弹二维码。 */}
            <div className="hidden sm:flex items-center gap-0.5">
              {socials.map((s) => {
                const showQr = s.key !== 'facebook';
                return (
                <div
                  key={s.key}
                  className="relative"
                  onMouseEnter={() => showQr && setHoveredKey(s.key)}
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
                  {showQr && hoveredKey === s.key && (
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
                );
              })}
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
