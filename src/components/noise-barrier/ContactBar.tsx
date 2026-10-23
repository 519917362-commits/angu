'use client';
import { IconWhatsApp, IconZalo, IconLINE, IconFacebook, IconEmail, IconPhone, IconQr } from '../icons';

import { useState } from 'react';

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  zalo: string;
  lineId: string;
  locale: string;
}


const brandColors: Record<string, string> = {
  whatsapp: '#25D366',
  zalo: '#0068FF',
  line: '#06C755',
  facebook: '#1877F2',
  email: '#6B7280',
  phone: '#6B7280',
};

interface ChannelDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  hasQr: boolean;
  href: (info: ContactInfo) => string;
  display: (info: ContactInfo) => string;
  qrData: (info: ContactInfo) => string;
  external: boolean;
}

function buildChannels(locale: string): ChannelDef[] {
  const channels: ChannelDef[] = [
    { key: 'whatsapp', label: 'WhatsApp', icon: <IconWhatsApp />, color: brandColors.whatsapp, hasQr: true,
      href: (i) => `https://wa.me/${i.whatsapp.replace(/[^0-9]/g, '')}`,
      display: (i) => i.whatsapp,
      qrData: (i) => `https://wa.me/${i.whatsapp.replace(/[^0-9]/g, '')}`,
      external: true },
    { key: 'zalo', label: 'Zalo', icon: <IconZalo />, color: brandColors.zalo, hasQr: true,
      href: (i) => `https://zalo.me/${i.zalo.replace(/[^0-9]/g, '')}`,
      display: (i) => i.zalo,
      qrData: (i) => `https://zalo.me/${i.zalo.replace(/[^0-9]/g, '')}`,
      external: true },
    { key: 'line', label: 'LINE', icon: <IconLINE />, color: brandColors.line, hasQr: true,
      href: (i) => `https://line.me/ti/p/~${i.lineId}`,
      display: (i) => i.lineId,
      qrData: (i) => `https://line.me/ti/p/~${i.lineId}`,
      external: true },
    { key: 'facebook', label: 'Facebook', icon: <IconFacebook />, color: brandColors.facebook, hasQr: true,
      href: (i) => i.facebook,
      display: () => 'Angu Wire Mesh',
      qrData: (i) => i.facebook,
      external: true },
    { key: 'email', label: 'Email', icon: <IconEmail />, color: brandColors.email, hasQr: false,
      href: (i) => `mailto:${i.email}`,
      display: (i) => i.email,
      qrData: () => '',
      external: false },
    { key: 'phone', label: locale === 'zh' ? '电话' : locale === 'vi' ? 'Điện thoại' : locale === 'th' ? 'โทร' : 'Phone',
      icon: <IconPhone />, color: brandColors.phone, hasQr: false,
      href: (i) => `tel:${i.phone.replace(/[^0-9+]/g, '')}`,
      display: (i) => i.phone,
      qrData: () => '',
      external: false },
  ];

  const order: Record<string, string[]> = {
    vi: ['zalo', 'whatsapp', 'line', 'facebook', 'email', 'phone'],
    th: ['line', 'whatsapp', 'facebook', 'zalo', 'email', 'phone'],
    en: ['whatsapp', 'email', 'phone', 'zalo', 'line', 'facebook'],
    zh: ['whatsapp', 'email', 'phone', 'zalo', 'line', 'facebook'],
  };
  const ord = order[locale] || order.en;
  return ord.map(k => channels.find(c => c.key === k)!).filter(Boolean);
}

const uiText: Record<string, { title: string; subtitle: string; scanTip: string; chatNow: string }> = {
  vi: { title: 'Liên Hệ Trực Tiếp', subtitle: 'Chọn kênh phù hợp nhất với bạn', scanTip: 'Quét mã QR', chatNow: 'Chat ngay' },
  th: { title: 'ติดต่อโดยตรง', subtitle: 'เลือกช่องทางที่สะดวก', scanTip: 'สแกน QR', chatNow: 'แชทเลย' },
  en: { title: 'Direct Contact', subtitle: 'Choose your preferred channel', scanTip: 'Scan QR Code', chatNow: 'Chat Now' },
  zh: { title: '直接联系我们', subtitle: '选择您方便的联系方式', scanTip: '扫码联系', chatNow: '立即沟通' },
};

export function ContactBar({ info }: { info: ContactInfo }) {
  const [expandedQr, setExpandedQr] = useState<string | null>(null);
  const channels = buildChannels(info.locale);
  const t = uiText[info.locale] || uiText.en;
  const qrChannels = channels.filter(c => c.hasQr);
  const linkChannels = channels.filter(c => !c.hasQr);

  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">{t.title}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{t.subtitle}</p>
        </div>

        {/* Social channels with QR — grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {qrChannels.map((ch) => {
            const isExpanded = expandedQr === ch.key;
            return (
              <div key={ch.key}
                className={`relative bg-white/5 border border-white/10 rounded-xl p-3 transition-all cursor-pointer hover:bg-white/10 ${isExpanded ? 'ring-2 ring-blue-400' : ''}`}
                onClick={() => setExpandedQr(isExpanded ? null : ch.key)}
              >
                {/* Top: icon + name */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex-shrink-0" style={{ color: ch.color }}>{ch.icon}</span>
                  <span className="text-sm font-semibold text-white">{ch.label}</span>
                </div>
                {/* Account */}
                <div className="text-xs text-slate-400 truncate mb-2">{ch.display(info)}</div>

                {!isExpanded ? (
                  /* Collapsed: small QR thumbnail */
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <img
                      src={`https://quickchart.io/qr?size=80&margin=1&dark=${ch.color.replace('#', '')}&light=ffffff&text=${encodeURIComponent(ch.qrData(info))}`}
                      alt={`${ch.label} QR`}
                      width={20}
                      height={20}
                      loading="lazy"
                      decoding="async"
                      className="rounded opacity-60"
                    />
                    <IconQr className="w-3 h-3" />
                    <span>{t.scanTip}</span>
                  </div>
                ) : (
                  /* Expanded: large QR + button */
                  <div className="space-y-2">
                    <div className="flex justify-center bg-white rounded-lg p-2">
                      <img
                        src={`https://quickchart.io/qr?size=160&margin=2&dark=${ch.color.replace('#', '')}&light=ffffff&text=${encodeURIComponent(ch.qrData(info))}`}
                        alt={`${ch.label} QR Code`}
                        width={140}
                        height={140}
                        loading="lazy"
                        decoding="async"
                        className="rounded"
                      />
                    </div>
                    <a
                      href={ch.href(info)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
                      style={{ backgroundColor: ch.color }}
                    >
                      {ch.icon}
                      {t.chatNow} →
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Email + Phone — simple links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 border-t border-white/10">
          {linkChannels.map((ch) => (
            <a
              key={ch.key}
              href={ch.href(info)}
              target={ch.external ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-200 hover:text-white transition-colors group"
            >
              <span className="flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: ch.color }}>
                {ch.icon}
              </span>
              <span className="font-medium">{ch.label}:</span>
              <span className="text-slate-300 group-hover:text-white">{ch.display(info)}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Backdrop when QR expanded */}
      {expandedQr && (
        <div className="fixed inset-0 z-40" onClick={() => setExpandedQr(null)} />
      )}
    </section>
  );
}
