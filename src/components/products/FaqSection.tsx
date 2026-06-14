'use client';

import {useState} from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  locale: string;
  productName: string;
}

export function FaqSection({faqs, locale, productName}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isZh = locale === 'zh';

  if (faqs.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold text-slate-900">
          {isZh ? `${productName} — 采购常见问题` : `${productName} — Purchasing FAQ`}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {isZh
            ? '以下是海外采购商和工程师最常关心的技术问题及解答'
            : 'Technical questions frequently asked by overseas buyers and engineers'}
        </p>
      </div>

      {/* FAQ Items */}
      <div className="px-6 pb-6 divide-y divide-slate-100">
        {faqs.map((faq, i) => (
          <div key={i} className="py-1">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left py-3 flex items-start justify-between gap-4 group"
            >
              <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors pr-4">
                {faq.q}
              </span>
              <svg
                className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5 transition-transform ${
                  openIndex === i ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="pb-3 text-sm text-slate-600 leading-relaxed pl-0 pr-8">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
