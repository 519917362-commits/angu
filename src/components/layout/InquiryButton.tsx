'use client';

import {usePathname} from 'next/navigation';
import {MessageCircle} from 'lucide-react';
import {WHATSAPP_NUMBER} from '@/lib/contact';

export function InquiryButton() {
  const pathname = usePathname();
  const isLanding = pathname?.includes('/noise-barrier');

  if (isLanding) return null;

  // 移动端由 MobileContactBar（底部通栏）承担，这里只在 >=sm 显示，避免两个入口叠在一起
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I'm interested in your gabion box and protection net products.")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium text-sm">Chat on WhatsApp</span>
    </a>
  );
}
