'use client';

import {useState, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {X, MessageCircle} from 'lucide-react';
import {cn} from '@/lib/utils';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productSlug?: string;
  categorySlug?: string;
  locale: string;
}

export function InquiryModal({isOpen, onClose, productName, productSlug, categorySlug, locale}: InquiryModalProps) {
  const isZh = locale === 'zh';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    quantity: '',
    message: productName
      ? (isZh
          ? `我对以下产品感兴趣，请提供报价：\n产品名称：${productName}\n产品型号：${productSlug || '-'}\n\n请提供详细规格、价格、交货期等信息。`
          : `I am interested in the following product. Please provide a quotation:\nProduct Name: ${productName}\nProduct SKU: ${productSlug || '-'}\n\nPlease provide detailed specifications, pricing, and delivery time.`)
      : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Create portal container on mount (render to <body> to escape stacking context)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const el = document.createElement('div');
      el.setAttribute('data-inquiry-portal', '');
      document.body.appendChild(el);
      portalRef.current = el;
    }
    return () => {
      if (portalRef.current) {
        portalRef.current.remove();
        portalRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...formData, productSlug, categorySlug, locale}),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(onClose, 3000);
      } else {
        const data = await res.json();
        setError(data.error || (isZh ? '提交失败，请重试。' : 'Submission failed. Please try again.'));
      }
    } catch {
      setError(isZh ? '网络错误。请重试或直接联系我们。' : 'Network error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen || !portalRef.current) return null;

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const t = {
    quickInquiry: isZh ? '快速询盘' : 'Quick Inquiry',
    productInfo: isZh ? '询盘产品' : 'Product of Interest',
    yourName: isZh ? '您的姓名' : 'Your Name',
    yourEmail: isZh ? '电子邮箱' : 'Email Address',
    phoneWhatsApp: isZh ? '电话 / WhatsApp' : 'Phone / WhatsApp',
    country: isZh ? '国家' : 'Country',
    company: isZh ? '公司名称' : 'Company Name',
    quantity: isZh ? '需求量' : 'Quantity Needed',
    message: isZh ? '询盘内容' : 'Inquiry Details',
    messagePlaceholder: isZh ? '请描述您的项目需求、规格要求或问题...' : 'Please describe your project requirements, specifications, or questions...',
    submitNow: isZh ? '立即提交' : 'Submit Inquiry',
    submitSuccess: isZh ? '提交成功！' : 'Submitted Successfully!',
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-[10000]" onClick={stopPropagation}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl" style={{zIndex: 10}}>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{t.quickInquiry}</h2>
            {productName && <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{productName}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-lg font-semibold text-slate-900 mb-2">{t.submitSuccess}</p>
              <p className="text-sm text-slate-500">{isZh ? '我们将在24小时内回复。' : 'We will respond within 24 hours.'}</p>
            </div>
          ) : (
            <>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t.yourName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={isZh ? '张三' : 'John Smith'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t.yourEmail} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={isZh ? 'zhangsan@company.com' : 'john@company.com'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t.phoneWhatsApp}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={isZh ? '+86 138 1234 5678' : '+1 234 567 8900'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {t.country}
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={isZh ? '中国' : 'United States'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.company}
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={isZh ? '某某建设有限公司' : 'ABC Construction Ltd.'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.quantity}
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder={isZh ? '例如：500件，2000平方米' : 'e.g. 500 pieces, 2000 m²'}
                />
              </div>

              {productName && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    {t.productInfo}
                  </label>
                  <div className="text-sm text-blue-900 font-medium">{productName}</div>
                  {productSlug && <div className="text-xs text-blue-600 mt-0.5">SKU: {productSlug}</div>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2',
                  isSubmitting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    {isZh ? '提交中...' : 'Submitting...'}
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    {t.submitNow}
                  </>
                )}
              </button>

              <p className="text-xs text-slate-400 text-center">
                {isZh ? '我们通常在24小时内回复。紧急询盘请通过WhatsApp联系我们。' : 'We typically respond within 24 hours. For urgent inquiries, please contact us via WhatsApp.'}
              </p>
            </>
          )}
        </form>
      </div>
    </div>,
    portalRef.current
  );
}
