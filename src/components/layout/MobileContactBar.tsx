'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {MessageCircle, FileText} from 'lucide-react';
import {WHATSAPP_NUMBER} from '@/lib/contact';

const T: Record<string, {whatsapp: string; quote: string}> = {
  en: {whatsapp: 'WhatsApp', quote: 'Get a Quote'},
  zh: {whatsapp: 'WhatsApp', quote: '获取报价'},
  vi: {whatsapp: 'WhatsApp', quote: 'Nhận báo giá'},
  th: {whatsapp: 'WhatsApp', quote: 'ขอใบเสนอราคา'},
  ms: {whatsapp: 'WhatsApp', quote: 'Minta Sebut Harga'},
  ar: {whatsapp: 'واتساب', quote: 'اطلب عرض سعر'},
};

/**
 * 移动端底部常驻联系条。
 * 桌面端已有右下角悬浮按钮（InquiryButton），两者互斥：
 * 这个只在 <sm 显示，InquiryButton 在移动端隐藏。
 * 底部安全区用 env(safe-area-inset-bottom) 处理，避免 iPhone 手势条遮挡。
 */
export function MobileContactBar({locale}: {locale: string}) {
  const t = T[locale] || T.en;
  const pathname = usePathname();
  // 营销页自己就有表单，直接滚到表单比跳去 /contact 少一步（少一步就少一次流失）
  const isLanding = pathname?.includes('/noise-barrier');
  const quoteHref = isLanding ? '#quote-form' : `/${locale}/contact`;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2 gap-2 px-2 py-2">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I'd like a quotation for your wire mesh products.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-[#25D366] active:bg-[#1eb958] text-white font-medium text-sm"
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" />
          {t.whatsapp}
        </a>
        <Link
          href={quoteHref}
          className="flex items-center justify-center gap-1.5 h-11 rounded-lg bg-blue-600 active:bg-blue-700 text-white font-medium text-sm"
        >
          <FileText className="w-4 h-4 flex-shrink-0" />
          {t.quote}
        </Link>
      </div>
    </div>
  );
}
