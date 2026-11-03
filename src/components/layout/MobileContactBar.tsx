'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {MessageCircle, Mail, FileText} from 'lucide-react';
import {WHATSAPP_NUMBER, CONTACT_EMAIL} from '@/lib/contact';

const T: Record<string, {whatsapp: string; email: string; quote: string}> = {
  en: {whatsapp: 'WhatsApp', email: 'Email', quote: 'Get a Quote'},
  zh: {whatsapp: 'WhatsApp', email: '邮箱', quote: '获取报价'},
  vi: {whatsapp: 'WhatsApp', email: 'Email', quote: 'Nhận báo giá'},
  th: {whatsapp: 'WhatsApp', email: 'อีเมล', quote: 'ขอใบเสนอราคา'},
  ms: {whatsapp: 'WhatsApp', email: 'E-mel', quote: 'Minta Sebut Harga'},
  ar: {whatsapp: 'واتساب', email: 'البريد', quote: 'اطلب عرض سعر'},
};

/**
 * 移动端底部常驻联系条。
 * 桌面端已有右下角悬浮按钮（InquiryButton），两者互斥：
 * 这个只在 <sm 显示，InquiryButton 在移动端隐藏。
 * 底部安全区用 env(safe-area-inset-bottom) 处理，避免 iPhone 手势条遮挡。
 *
 * 三格：WhatsApp / 邮箱 / 报价。
 * Zalo（越南）、LINE（泰国）尚未注册，不作为主渠道（见 src/lib/channels.ts）——
 * 这里固定给 WhatsApp 与邮箱，避免移动端出现空渠道或死链。
 */
export function MobileContactBar({locale}: {locale: string}) {
  const t = T[locale] || T.en;
  const pathname = usePathname();
  // 营销页自己就有表单，直接滚到表单比跳去 /contact 少一步（少一步就少一次流失）
  const isLanding = pathname?.includes('/noise-barrier');
  const quoteHref = isLanding ? '#quote-form' : `/${locale}/contact`;
  const waText = isLanding
    ? 'Hello, I would like a quotation for noise barriers.'
    : 'Hello, I would like a quotation for your wire mesh products.';

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-3 gap-1.5 px-2 py-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 h-11 rounded-lg bg-[#25D366] active:bg-[#1eb958] text-white font-medium text-xs"
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          {t.whatsapp}
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(isLanding ? 'Noise barrier quotation request' : 'Quotation request')}`}
          className="flex items-center justify-center gap-1 h-11 rounded-lg bg-slate-100 active:bg-slate-200 text-slate-800 font-medium text-xs border border-slate-200"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          {t.email}
        </a>
        <Link
          href={quoteHref}
          className="flex items-center justify-center gap-1 h-11 rounded-lg bg-blue-600 active:bg-blue-700 text-white font-medium text-xs"
        >
          <FileText className="w-4 h-4 flex-shrink-0" />
          {t.quote}
        </Link>
      </div>
    </div>
  );
}
