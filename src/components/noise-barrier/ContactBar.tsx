'use client';

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

// ── Brand SVG icons ──

function IconWhatsApp({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconZalo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 5.94 2 10.5c0 2.5 1.4 4.74 3.6 6.21-.16.86-.58 2.13-1.51 3.27-.26.32-.02.8.39.74 1.92-.27 3.36-1.01 4.3-1.64.94.21 1.92.32 2.92.32 5.523 0 10-3.94 10-8.5S17.523 2 12 2zm-3.8 9.5c0 .28-.22.5-.5.5H6.2v1.5c0 .28-.22.5-.5.5h-.4c-.28 0-.5-.22-.5-.5V12H3.3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5H4.8V9.1c0-.28.22-.5.5-.5h.4c.28 0 .5.22.5.5v1.5h1.5c.28 0 .5.22.5.5v.4zm5.1 1.8c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v.4zm0-2.4c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v.4zm0-2.4c0 .28-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5v-.4c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5v.4zm4.6 2.4c0 .28-.22.5-.5.5h-1.7l1.55 1.55c.2.2.2.52 0 .72-.1.1-.23.15-.36.15s-.26-.05-.36-.15L14.5 10.8c-.2-.2-.2-.52 0-.72s.52-.2.72 0L16.77 11.6c.2.2.2.52 0 .72-.1.1-.23.15-.36.15h.69c.28 0 .5.22.5.5v.4z"/>
    </svg>
  );
}

function IconLINE({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );
}

function IconFacebook({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073"/>
    </svg>
  );
}

function IconEmail({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function IconPhone({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function IconQr({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h2.5m.5 0H4m0 0V9.5M4 12v2.5m12-8H8m8 0V4M8 4v2.5M8 4H4" />
    </svg>
  );
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
