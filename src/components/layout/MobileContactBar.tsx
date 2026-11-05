'use client';

import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {FileText} from 'lucide-react';
import {IconWhatsApp, IconZalo, IconWeChat} from '@/components/icons';
import {InquiryModal} from '@/components/inquiry/InquiryModal';
import {WHATSAPP_NUMBER, ZALO_URL, WECHAT_ID, WECHAT_DISPLAY} from '@/lib/contact';
import {trackLead} from '@/lib/analytics';

type Copy = {
  whatsapp: string;
  zalo: string;
  wechat: string;
  quote: string;
  /** 复制成功后的提示 */
  wechatHint: string;
  /** 剪贴板不可用时的兜底提示（把号码直接摆出来让人长按复制） */
  wechatManual: string;
};

const T: Record<string, Copy> = {
  en: {
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    wechat: 'WeChat',
    quote: 'Quote',
    wechatHint: `WeChat ID ${WECHAT_DISPLAY} copied — open WeChat and search it to add us.`,
    wechatManual: `WeChat ID: ${WECHAT_DISPLAY} — long-press to copy, then search in WeChat.`,
  },
  zh: {
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    wechat: '微信',
    quote: '报价',
    wechatHint: `微信号 ${WECHAT_DISPLAY} 已复制，打开微信搜索即可添加。`,
    wechatManual: `微信号：${WECHAT_DISPLAY}，长按复制后在微信中搜索添加。`,
  },
  vi: {
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    wechat: 'WeChat',
    quote: 'Báo giá',
    wechatHint: `Đã sao chép WeChat ${WECHAT_DISPLAY} — mở WeChat và tìm số này để kết bạn.`,
    wechatManual: `WeChat: ${WECHAT_DISPLAY} — nhấn giữ để sao chép rồi tìm trong WeChat.`,
  },
  th: {
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    wechat: 'WeChat',
    quote: 'ราคา',
    wechatHint: `คัดลอก WeChat ${WECHAT_DISPLAY} แล้ว — เปิด WeChat แล้วค้นหาเพื่อเพิ่มเพื่อน`,
    wechatManual: `WeChat: ${WECHAT_DISPLAY} — กดค้างเพื่อคัดลอก แล้วค้นหาใน WeChat`,
  },
  ms: {
    whatsapp: 'WhatsApp',
    zalo: 'Zalo',
    wechat: 'WeChat',
    quote: 'Harga',
    wechatHint: `ID WeChat ${WECHAT_DISPLAY} disalin — buka WeChat dan cari untuk menambah.`,
    wechatManual: `ID WeChat: ${WECHAT_DISPLAY} — tekan lama untuk salin, kemudian cari dalam WeChat.`,
  },
  ar: {
    whatsapp: 'واتساب',
    zalo: 'Zalo',
    wechat: 'WeChat',
    quote: 'سعر',
    wechatHint: `تم نسخ معرّف WeChat ‎${WECHAT_DISPLAY}‎ — افتح WeChat وابحث عنه للإضافة.`,
    wechatManual: `معرّف WeChat: ‎${WECHAT_DISPLAY}‎ — اضغط مطولاً للنسخ ثم ابحث في WeChat.`,
  },
};

/**
 * 复制文本。移动端 Safari 对 clipboard API 有额外限制（必须用户手势 + 安全上下文），
 * 所以保留 textarea + execCommand 的兜底路径，失败时返回 false 由调用方降级。
 */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* 继续走兜底 */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * 移动端底部常驻联系条（<sm 显示；桌面端由右下角 InquiryButton 承担）。
 *
 * 四格：WhatsApp / Zalo / WeChat / 报价。
 * - Zalo：越南客户装机率最高，直接开名片短链（ZALO_URL）。
 * - WeChat：**没法用链接定位到人**，weixin:// 只能唤起 App 不能加好友，
 *   所以点击是「复制号码 + 提示去微信搜索」，比跳一个空白页有用。
 * - 报价：在本页打开询盘弹窗，不跳转也不锚点。落地页的表单在第 12 屏，
 *   锚过去等于让刚进来的访客凭空丢掉十几屏；/contact 又多一次页面跳转。
 * - 邮箱从这一行撤掉了：手机上 mailto 转化极低，四格里优先给能即时对话的渠道。
 *   邮箱仍在页脚和 /contact 页。
 *
 * 底部安全区用 env(safe-area-inset-bottom) 处理，避免 iPhone 手势条遮挡；
 * body 的 pb-16 是为这条 bar 预留的高度，改高度要同步改 layout.tsx。
 */
export function MobileContactBar({locale}: {locale: string}) {
  const t = T[locale] || T.en;
  const pathname = usePathname();
  const [toast, setToast] = useState('');
  const [quoteOpen, setQuoteOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 4000);
  };

  const onWeChat = async () => {
    // 微信是 <button> 不是 <a>，接不到 initContactTracking 的委托，这里单独报一次
    trackLead({source: 'contact_click', method: 'wechat'});
    const ok = await copyText(WECHAT_ID);
    showToast(ok ? t.wechatHint : t.wechatManual);
  };

  // 营销页自己就有表单，直接滚到表单比跳去 /contact 少一步（少一步就少一次流失）
  const isLanding = pathname?.includes('/noise-barrier');
  const waText = isLanding
    ? 'Hello, I would like a quotation for noise barriers.'
    : 'Hello, I would like a quotation for your wire mesh products.';

  // 报价格直接开弹窗，不再跳转。
  // 落地页的表单在 y≈10000（第 12 屏），锚点跳过去等于让用户凭空消失十几屏；
  // /contact 则要多一次页面跳转。弹窗是当前页面内的最短路径。
  const onQuote = () => {
    trackLead({source: 'contact_click', method: 'mobile_bar_quote'});
    setQuoteOpen(true);
  };
  const quoteSource = isLanding ? 'google_ads_noise_barrier' : 'mobile_contact_bar';

  const cell =
    'flex flex-col items-center justify-center gap-0.5 h-11 rounded-lg font-medium text-[11px] leading-none whitespace-nowrap';

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="absolute bottom-full inset-x-2 mb-2 rounded-lg bg-slate-900/95 px-3 py-2 text-[12px] leading-snug text-white shadow-lg"
        >
          {toast}
        </div>
      )}

      <div className="grid grid-cols-4 gap-1.5 px-2 py-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cell} bg-[#25D366]/10 text-[#0B7A3E] active:bg-[#25D366]/20`}
        >
          <IconWhatsApp className="w-[18px] h-[18px] flex-shrink-0" />
          {t.whatsapp}
        </a>

        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cell} bg-[#0068FF]/10 text-[#0055D4] active:bg-[#0068FF]/20`}
        >
          <IconZalo className="w-[18px] h-[18px] flex-shrink-0" />
          {t.zalo}
        </a>

        <button
          type="button"
          onClick={onWeChat}
          aria-label={t.wechatHint}
          className={`${cell} bg-[#07C160]/10 text-[#07864A] active:bg-[#07C160]/20`}
        >
          <IconWeChat className="w-[18px] h-[18px] flex-shrink-0" />
          {t.wechat}
        </button>

        <button
          type="button"
          onClick={onQuote}
          className={`${cell} bg-blue-600 text-white active:bg-blue-700`}
        >
          <FileText className="w-[18px] h-[18px] flex-shrink-0" />
          {t.quote}
        </button>
      </div>

      <InquiryModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        locale={locale}
        source={quoteSource}
        categorySlug={isLanding ? 'noise-barrier' : undefined}
      />
    </div>
  );
}
