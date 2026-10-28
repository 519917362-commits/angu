'use client';

import { FloatingQR } from './FloatingQR';
import { ExitIntentPopup } from './ExitIntentPopup';
import { isPartialLocale } from '@/lib/routing';

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

export function NoiseBarrierClient({ locale, contactInfo }: { locale: string; contactInfo: ContactInfo }) {
  return (
    <>
      <FloatingQR locale={locale} contactInfo={contactInfo} />
      {/* 离场弹窗文案尚未做 ms / ar 译文，先不渲染，避免阿语页面弹出英文蒙层 */}
      {!isPartialLocale(locale) && <ExitIntentPopup locale={locale} />}
    </>
  );
}
