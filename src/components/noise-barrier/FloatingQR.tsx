'use client';
import { IconWhatsApp, IconZalo, IconLINE, IconFacebook, IconEmail, IconClose, IconChat } from '../icons';

import { useState, useEffect } from 'react';
import { whatsappNumber, zaloId, lineId, facebookUrl } from '@/lib/channels';

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


const brandColors: Record<string, string> = {
  whatsapp: '#25D366',
  email: '#1e40af',
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
  /** 有没有真实账号 —— 没有就整个渠道不渲染，避免点开是死链 */
  available: (info: ContactInfo) => boolean;
  /**
   * 点击直接跳转，不展开二维码面板。
   * 只有「扫到手机上有意义」的渠道才需要二维码（WhatsApp：PC 上看页、手机上聊）。
   * 邮箱是 mailto、Facebook 是网页主页，弹一张二维码出来纯属多一步。
   */
  direct?: boolean;
}

function buildChannels(locale: string, info: ContactInfo): ChannelDef[] {
  const channels: ChannelDef[] = [
    { key: 'whatsapp', label: 'WhatsApp', shortLabel: 'WhatsApp', icon: <IconWhatsApp />, color: brandColors.whatsapp,
      href: (i) => `https://wa.me/${i.whatsapp.replace(/[^0-9]/g, '')}`,
      display: (i) => i.whatsapp,
      qrUrl: (i) => i.qrWhatsApp || '',
      available: (i) => whatsappNumber(i.whatsapp) !== '' },
    { key: 'email', label: 'Email', shortLabel: 'Email', icon: <IconEmail />, color: brandColors.email,
      href: (i) => `mailto:${i.email}`,
      display: (i) => i.email,
      qrUrl: () => '',
      available: (i) => /.+@.+\..+/.test(i.email || ''),
      direct: true },
    { key: 'zalo', label: 'Zalo', shortLabel: 'Zalo', icon: <IconZalo />, color: brandColors.zalo,
      href: (i) => `https://zalo.me/${i.zalo.replace(/[^0-9]/g, '')}`,
      display: (i) => i.zalo,
      qrUrl: (i) => i.qrZalo || '',
      available: (i) => zaloId(i.zalo) !== '' },
    { key: 'line', label: 'LINE', shortLabel: 'LINE', icon: <IconLINE />, color: brandColors.line,
      href: (i) => `https://line.me/ti/p/~${i.lineId}`,
      display: (i) => i.lineId,
      qrUrl: (i) => i.qrLine || '',
      available: (i) => lineId(i.lineId) !== '' },
    { key: 'facebook', label: 'Facebook', shortLabel: 'Facebook', icon: <IconFacebook />, color: brandColors.facebook,
      href: (i) => i.facebook,
      display: () => 'Angu Wire Mesh',
      qrUrl: (i) => i.qrFacebook || '',
      available: (i) => facebookUrl(i.facebook) !== '',
      direct: true },
  ];

  // Locale priority order —— WhatsApp 与邮箱是当前真实可用的主渠道，
  // Zalo / LINE 尚未注册，排在后面（没有账号时会被 available() 过滤掉）。
  const order: Record<string, string[]> = {
    vi: ['whatsapp', 'email', 'zalo', 'line', 'facebook'],
    th: ['whatsapp', 'email', 'line', 'zalo', 'facebook'],
    en: ['whatsapp', 'email', 'facebook', 'zalo', 'line'],
    zh: ['whatsapp', 'email', 'zalo', 'line', 'facebook'],
    ms: ['whatsapp', 'email', 'facebook', 'zalo', 'line'],
    ar: ['whatsapp', 'email', 'facebook', 'zalo', 'line'],
  };
  const ord = order[locale] || order.en;
  return ord
    .map(k => channels.find(c => c.key === k))
    .filter((c): c is ChannelDef => Boolean(c) && Boolean(c!.available(info)));
}

const uiText: Record<string, { title: string; scanTip: string; chatNow: string; chatLabel: string }> = {
  vi: { title: 'Chat Với Chúng Tôi', scanTip: 'Quét mã QR', chatNow: 'Chat Ngay', chatLabel: 'Chat' },
  th: { title: 'แชทกับเรา', scanTip: 'สแกน QR', chatNow: 'แชทเลย', chatLabel: 'แชท' },
  en: { title: 'Chat With Us', scanTip: 'Scan QR', chatNow: 'Chat Now', chatLabel: 'Chat' },
  zh: { title: '在线咨询', scanTip: '扫码沟通', chatNow: '立即沟通', chatLabel: '咨询' },
  ms: { title: 'Sembang Dengan Kami', scanTip: 'Imbas QR', chatNow: 'Sembang Sekarang', chatLabel: 'Sembang' },
  ar: { title: 'تحدّث معنا', scanTip: 'امسح رمز QR', chatNow: 'تحدّث الآن', chatLabel: 'محادثة' },
};

export function FloatingQR({ locale, contactInfo }: { locale: string; contactInfo: ContactInfo }) {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');

  const channels = buildChannels(locale, contactInfo);
  const t = uiText[locale] || uiText.en;

  // Set default tab based on locale priority
  // 默认展开第一个「可扫码」渠道：Email / Facebook 是直接跳转型，展开它们没有意义
  useEffect(() => {
    if (!activeTab && channels.length > 0) {
      const firstQr = channels.find((c) => !c.direct) || channels[0];
      setActiveTab(firstQr.key);
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

  const activeChannel =
    channels.find((c) => c.key === activeTab && !c.direct) || channels.find((c) => !c.direct);

  // 没有任何可用渠道（后台全没配）就不显示悬浮按钮，免得点开是个空面板
  if (!visible || !activeChannel) return null;

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

              // 直接跳转型渠道（Email / Facebook）：点一下就出去，不展开二维码
              if (ch.direct) {
                const isMail = ch.key === 'email';
                return (
                  <a
                    key={ch.key}
                    href={ch.href(contactInfo)}
                    {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors border-l-4 border-l-transparent"
                  >
                    <span style={{ color: ch.color }}>{ch.icon}</span>
                    <span className="flex-1 text-start">{ch.shortLabel}</span>
                    <svg className="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </a>
                );
              }

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
                    <span className="flex-1 text-start">{ch.shortLabel}</span>
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
                            loading="lazy"
                            decoding="async"
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

      {/* Floating button — 移动端由底部常驻联系条（MobileContactBar）承担：
          两者都固定在底部会叠在一起，而且手机上没人会扫自己屏幕上的二维码 */}
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="hidden sm:flex fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl px-5 py-3.5 transition-all hover:scale-105"
          aria-label={t.chatNow}
        >
          <IconChat className="w-5 h-5" />
          <span className="text-sm font-semibold">{t.chatLabel}</span>
        </button>
      )}
    </>
  );
}
