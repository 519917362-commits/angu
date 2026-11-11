'use client';

import { FloatingQR } from './FloatingQR';
import { ExitIntentPopup } from './ExitIntentPopup';

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
      <ExitIntentPopup locale={locale} />
    </>
  );
}
