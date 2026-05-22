'use client';

import {useState} from 'react';
import {MessageCircle} from 'lucide-react';
import {InquiryModal} from './InquiryModal';

interface InquiryButtonLargeProps {
  productName?: string;
  productSlug?: string;
  categorySlug?: string;
  locale: string;
}

export function InquiryButtonLarge({productName, productSlug, categorySlug, locale}: InquiryButtonLargeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isZh = locale === 'zh';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
      >
        <MessageCircle className="w-5 h-5" />
        {isZh ? '立即发送询盘' : 'Send Inquiry Now'}
      </button>
      <InquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productName={productName}
        productSlug={productSlug}
        categorySlug={categorySlug}
        locale={locale}
      />
    </>
  );
}
