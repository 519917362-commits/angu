'use client';

import { useState, useEffect } from 'react';

interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  zalo: string;
  lineId: string;
  locale: string;
  qrWhatsApp?: string;
  qrZalo?: string;
  qrLine?: string;
  qrFacebook?: string;
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
function IconClose({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function IconChat({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

const brandColors: Record<string, string> = {
  whatsapp: '#25D366',
  zalo: '#0068FF',
  line: '#06C755',
  facebook: '#1877F2',
};

interface ChannelDef {
  key: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;
  href: (info: ContactInfo) => string;
  display: (info: ContactInfo) => string;
  qrUrl: (info: ContactInfo) => string;
}

function buildChannels(locale: string): ChannelDef[] {
  const channels: ChannelDef[] = [
    { key: 'whatsapp', label: 'WhatsApp', shortLabel: 'WhatsApp', icon: <IconWhatsApp />, color: brandColors.whatsapp,
      href: (i) => `https://wa.me/${i.whatsapp.replace(/[^0-9]/g, '')}`,
      display: (i) => i.whatsapp,
      qrUrl: (i) => i.qrWhatsApp || '' },
    { key: 'zalo', label: 'Zalo', shortLabel: 'Zalo', icon: <IconZalo />, color: brandColors.zalo,
      href: (i) => `https://zalo.me/${i.zalo.replace(/[^0-9]/g, '')}`,
      display: (i) => i.zalo,
      qrUrl: (i) => i.qrZalo || '' },
    { key: 'line', label: 'LINE', shortLabel: 'LINE', icon: <IconLINE />, color: brandColors.line,
      href: (i) => `https://line.me/ti/p/~${i.lineId}`,
      display: (i) => i.lineId,
      qrUrl: (i) => i.qrLine || '' },
    { key: 'facebook', label: 'Facebook', shortLabel: 'Facebook', icon: <IconFacebook />, color: brandColors.facebook,
      href: (i) => i.facebook,
      display: () => 'Angu Wire Mesh',
      qrUrl: (i) => i.qrFacebook || '' },
  ];

  // Locale priority order
  const order: Record<string, string[]> = {
    vi: ['zalo', 'whatsapp', 'line', 'facebook'],
    th: ['line', 'whatsapp', 'facebook', 'zalo'],
    en: ['whatsapp', 'facebook', 'zalo', 'line'],
    zh: ['whatsapp', 'zalo', 'line', 'facebook'],
  };
  const ord = order[locale] || order.en;
  return ord.map(k => channels.find(c => c.key === k)!).filter(Boolean);
}

const uiText: Record<string, { title: string; scanTip: string; chatNow: string; chatLabel: string }> = {
  vi: { title: 'Chat Với Chúng Tôi', scanTip: 'Quét mã QR', chatNow: 'Chat Ngay', chatLabel: 'Chat' },
  th: { title: 'แชทกับเรา', scanTip: 'สแกน QR', chatNow: 'แชทเลย', chatLabel: 'แชท' },
  en: { title: 'Chat With Us', scanTip: 'Scan QR', chatNow: 'Chat Now', chatLabel: 'Chat' },
  zh: { title: '在线咨询', scanTip: '扫码沟通', chatNow: '立即沟通', chatLabel: '咨询' },
};

export function FloatingQR({ locale, contactInfo }: { locale: string; contactInfo: ContactInfo }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');

  const channels = buildChannels(locale);
  const t = uiText[locale] || uiText.en;

  // Set default tab based on locale priority
  useEffect(() => {
    if (!activeTab && channels.length > 0) {
      setActiveTab(channels[0].key);
    }
  }, [locale]);

  // Show floating button after scrolling 300px
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeChannel = channels.find(c => c.key === activeTab) || channels[0];

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      {expanded && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setExpanded(false)} />
      )}

      {/* Popup panel */}
      {expanded && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[300px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-slate-900 to-blue-950 text-white">
            <h4 className="text-sm font-bold">{t.title}</h4>
            <button
              onClick={() => setExpanded(false)}
              className="p-1 rounded-full hover:bg-white/15 transition-colors text-white/70 hover:text-white"
              aria-label="Close"
            >
              <IconClose className="w-4 h-4" />
            </button>
          </div>

          {/* Channel list with accordion expand */}
          <div className="py-1.5">
            {channels.map((ch) => {
              const isActive = activeTab === ch.key;
              return (
                <div key={ch.key}>
                  <button
                    onClick={() => setActiveTab(isActive ? '' : ch.key)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors border-l-4 ${
                      isActive
                        ? 'bg-slate-50 text-slate-800'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                    style={isActive ? { borderColor: ch.color } : { borderColor: 'transparent' }}
                  >
                    <span style={{ color: ch.color }}>{ch.icon}</span>
                    <span className="flex-1 text-left">{ch.shortLabel}</span>
                    <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  {/* Accordion content — QR expands below the menu item */}
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${isActive ? 'max-h-[400px]' : 'max-h-0'}`}>
                    {isActive && (
                      <div className="flex flex-col items-center px-5 py-4 bg-slate-50/50">
                        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm mb-3">
                          <img
                            src={activeChannel.qrUrl(contactInfo) || `https://quickchart.io/qr?size=200&margin=2&dark=${activeChannel.color.replace('#', '')}&light=ffffff&text=${encodeURIComponent(activeChannel.href(contactInfo))}`}
                            alt={`${activeChannel.label} QR Code`}
                            width={170}
                            height={170}
                            className="rounded-lg"
                          />
                        </div>
                        <p className="text-xs text-slate-400 mb-1">{t.scanTip}</p>
                        <p className="text-sm text-slate-600 font-medium mb-4 truncate max-w-full">
                          {ch.display(contactInfo)}
                        </p>
                        <a
                          href={ch.href(contactInfo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-colors hover:opacity-90"
                          style={{ backgroundColor: ch.color }}
                        >
                          {ch.icon}
                          {t.chatNow} →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating button */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl px-5 py-3.5 transition-all hover:scale-105"
          aria-label={t.chatNow}
        >
          <IconChat className="w-5 h-5" />
          <span className="text-sm font-semibold">{t.chatLabel}</span>
        </button>
      )}
    </>
  );
}
