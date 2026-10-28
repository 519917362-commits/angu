'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { submitInquiryLead } from '@/lib/inquiry';

interface FormContent {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  companyLabel: string;
  countryLabel: string;
  qtyLabel: string;
  msgLabel: string;
  submitBtn: string;
  successMsg: string;
  privacyNote: string;
}

const formContent: Record<string, FormContent> = {
  vi: {
    title: 'Nhận Báo Giá Trong 24 Giờ',
    subtitle: 'FOB/CIF · Miễn phí bản vẽ kỹ thuật',
    nameLabel: 'Họ và Tên *',
    emailLabel: 'Email *',
    phoneLabel: 'Zalo / WhatsApp',
    companyLabel: 'Công ty',
    countryLabel: 'Quốc gia / Khu vực *',
    qtyLabel: 'Số lượng (m / m²)',
    msgLabel: 'Yêu cầu dự án...',
    submitBtn: 'Gửi Yêu Cầu Báo Giá',
    successMsg: '✓ Đã gửi! Chúng tôi sẽ phản hồi trong 24 giờ.',
    privacyNote: 'Bằng việc gửi form, bạn đồng ý với chính sách bảo mật.',
  },
  th: {
    title: 'รับใบเสนอราคาใน 24 ชั่วโมง',
    subtitle: 'FOB/CIF · แบบวิศวกรรมฟรี',
    nameLabel: 'ชื่อ-นามสกุล *',
    emailLabel: 'อีเมล *',
    phoneLabel: 'LINE / WhatsApp',
    companyLabel: 'บริษัท',
    countryLabel: 'ประเทศ / ภูมิภาค *',
    qtyLabel: 'จำนวน (ม. / ตร.ม.)',
    msgLabel: 'รายละเอียดโครงการ...',
    submitBtn: 'ส่งคำขอใบเสนอราคา',
    successMsg: '✓ ส่งแล้ว! เราจะตอบกลับภายใน 24 ชั่วโมง',
    privacyNote: 'การส่งฟอร์มถือว่าท่านยอมรับนโยบายความเป็นส่วนตัว',
  },
  en: {
    title: 'Get a Quote Within 24 Hours',
    subtitle: 'FOB/CIF · Free engineering drawings',
    nameLabel: 'Name *',
    emailLabel: 'Email *',
    phoneLabel: 'WhatsApp / Phone',
    companyLabel: 'Company',
    countryLabel: 'Country / Region *',
    qtyLabel: 'Quantity (m / m²)',
    msgLabel: 'Project requirements...',
    submitBtn: 'Request Quotation',
    successMsg: '✓ Sent! We will respond within 24 hours.',
    privacyNote: 'By submitting, you agree to our privacy policy.',
  },
  zh: {
    title: '24 小时内获取报价',
    subtitle: 'FOB/CIF · 免费工程图纸',
    nameLabel: '姓名 *',
    emailLabel: '邮箱 *',
    phoneLabel: 'WhatsApp / 电话',
    companyLabel: '公司名称',
    countryLabel: '国家 / 地区 *',
    qtyLabel: '数量 (米 / 平方米)',
    msgLabel: '项目需求...',
    submitBtn: '提交询价',
    successMsg: '✓ 已提交！我们将在 24 小时内回复。',
    privacyNote: '提交即表示您同意我们的隐私政策。',
  },
  ms: {
    title: 'Dapatkan Sebut Harga Dalam 24 Jam',
    subtitle: 'FOB/CIF · Lukisan kejuruteraan percuma',
    nameLabel: 'Nama *',
    emailLabel: 'E-mel *',
    phoneLabel: 'WhatsApp / Telefon',
    companyLabel: 'Syarikat',
    countryLabel: 'Negara / Wilayah *',
    qtyLabel: 'Kuantiti (m / m²)',
    msgLabel: 'Keperluan projek...',
    submitBtn: 'Minta Sebut Harga',
    successMsg: '✓ Dihantar! Kami akan membalas dalam masa 24 jam.',
    privacyNote: 'Dengan menghantar borang ini, anda bersetuju dengan dasar privasi kami.',
  },
  ar: {
    title: 'احصل على عرض سعر خلال 24 ساعة',
    subtitle: 'FOB/CIF · رسومات هندسية مجانية',
    nameLabel: 'الاسم *',
    emailLabel: 'البريد الإلكتروني *',
    phoneLabel: 'واتساب / هاتف',
    companyLabel: 'الشركة',
    countryLabel: 'الدولة / المنطقة *',
    qtyLabel: 'الكمية (م / م²)',
    msgLabel: 'متطلبات المشروع...',
    submitBtn: 'اطلب عرض السعر',
    successMsg: '✓ تم الإرسال! سنرد خلال 24 ساعة.',
    privacyNote: 'بإرسال هذا النموذج فإنك توافق على سياسة الخصوصية.',
  },
};

export function QuoteForm({ locale }: { locale: string }) {
  const c = formContent[locale] || formContent.en;
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <section id="quote-form" className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white scroll-mt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold">{c.title}</h2>
          <p className="mt-3 text-slate-300">{c.subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900">
          <form
            action="/api/inquiry"
            method="POST"
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus('loading');
              const form = e.currentTarget;
              const data = new FormData(form);
              // 蜜罐字段被填 → 后端静默返回成功（不写库、不发邮件、不报转化）。
              // 这里同样不跳确认页：否则机器人的提交会落到 /thank-you 上，
              // 一旦账户里再配了"页面加载"型转化，就变成一条假转化。
              const honeypotHit = String(data.get('website') || '').trim() !== '';
              try {
                const result = await submitInquiryLead(Object.fromEntries(data.entries()), {
                  source: 'google_ads_noise_barrier',
                  productInterest: 'Noise Barrier',
                  locale,
                });
                setStatus(result.success ? 'success' : 'error');
                if (result.success && !honeypotHit) {
                  // 停顿 700ms 让用户看到 ✓，再进独立确认页。
                  // ⚠️ 转化已经由 submitInquiryLead 以 conversion 事件上报过了，
                  //    不要再把 /thank-you 配成"页面加载"型转化动作，否则一条询盘记两次。
                  window.setTimeout(() => router.push(`/${locale}/thank-you`), 700);
                }
              } catch {
                setStatus('error');
              }
            }}
          >
            <input type="text" name="website" autoComplete="off" tabIndex={-1}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />

            <input type="text" name="name" required autoComplete="name"
              placeholder={c.nameLabel}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="email" name="email" required
                placeholder={c.emailLabel}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
              <input type="text" name="phone"
                placeholder={c.phoneLabel}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" name="company" autoComplete="organization"
                placeholder={c.companyLabel}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
              {/* 国家是外贸报价的前置信息（运费/关税/标准都按国别定），
                  用 datalist 给常用市场做提示，同时允许手填任何国家 */}
              <input type="text" name="country" required autoComplete="country-name"
                list="angu-country-options"
                placeholder={c.countryLabel}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
              <datalist id="angu-country-options">
                {['Vietnam', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines', 'Singapore',
                  'Cambodia', 'Myanmar', 'Laos', 'India', 'Bangladesh', 'Sri Lanka',
                  'Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
                  'Australia', 'New Zealand', 'United States', 'Mexico', 'Brazil',
                  'Chile', 'Peru', 'Nigeria', 'Kenya', 'South Africa', 'Egypt',
                  'Turkey', 'Poland', 'Germany', 'United Kingdom', 'Spain', 'Italy',
                  'Russia', 'Kazakhstan', 'Japan', 'South Korea'].map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </div>

            <input type="text" name="quantity"
              placeholder={c.qtyLabel}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />

            <textarea name="message" rows={3}
              placeholder={c.msgLabel}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none" />

            <input type="hidden" name="source" value="google_ads_noise_barrier" />
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="product_interest" value="Noise Barrier" />

            {status === 'success' ? (
              <div className="w-full py-3.5 bg-green-50 border border-green-200 text-green-700 font-semibold rounded-lg text-center text-sm">
                {c.successMsg}
              </div>
            ) : (
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide">
                {status === 'loading' ? '...' : c.submitBtn} →
              </button>
            )}
            <p className="text-xs text-slate-400 text-center"><Link href={`/${locale}/privacy`} className="text-blue-600 hover:underline">{c.privacyNote}</Link></p>
          </form>
        </div>
      </div>
    </section>
  );
}
