'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown, Mail, MessageCircle } from 'lucide-react';
import { submitInquiryLead } from '@/lib/inquiry';
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from '@/lib/contact';

/**
 * 落地页报价单。
 *
 * 字段策略（2026-11-03 调整）：
 * 首屏接触只显 4 个 —— 姓名 / 邮箱 / 国家 / 需求，其余（WhatsApp、公司、数量）
 * 收进「补充项目信息（可选）」折叠区。
 *
 * 依据：B2B 首次接触 4–5 个字段的提交率普遍高于 7 个；而 phone/company/quantity
 * 对报价并非前置必需（有邮箱就能回、有需求就能报）。折叠区不是删字段，
 * 愿意填的人照样填，只是不再用视觉成本劝退所有人。
 *
 * 折叠区用 CSS hidden 而不是条件渲染：收起时输入框仍在 DOM 里，
 * 用户填了一半又收起不会丢值。
 */

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
  moreToggle: string;
  optional: string;
  /** 表单下方的低摩擦出口文案（WhatsApp / 邮箱） */
  directLabel: string;
}

const formContent: Record<string, FormContent> = {
  vi: {
    title: 'Nhận Báo Giá Trong 24 Giờ',
    subtitle: 'FOB/CIF · Miễn phí bản vẽ kỹ thuật',
    nameLabel: 'Họ và Tên *',
    emailLabel: 'Email *',
    phoneLabel: 'WhatsApp / Điện thoại',
    companyLabel: 'Công ty',
    countryLabel: 'Quốc gia / Khu vực *',
    qtyLabel: 'Số lượng (m / m²)',
    msgLabel: 'Yêu cầu dự án...',
    submitBtn: 'Gửi Yêu Cầu Báo Giá',
    successMsg: '✓ Đã gửi! Chúng tôi sẽ phản hồi trong 24 giờ.',
    privacyNote: 'Bằng việc gửi form, bạn đồng ý với chính sách bảo mật.',
    moreToggle: 'Thêm thông tin dự án',
    optional: '(không bắt buộc)',
    directLabel: 'Không muốn điền form? Liên hệ trực tiếp:',
  },
  th: {
    title: 'รับใบเสนอราคาใน 24 ชั่วโมง',
    subtitle: 'FOB/CIF · แบบวิศวกรรมฟรี',
    nameLabel: 'ชื่อ-นามสกุล *',
    emailLabel: 'อีเมล *',
    phoneLabel: 'WhatsApp / โทรศัพท์',
    companyLabel: 'บริษัท',
    countryLabel: 'ประเทศ / ภูมิภาค *',
    qtyLabel: 'จำนวน (ม. / ตร.ม.)',
    msgLabel: 'รายละเอียดโครงการ...',
    submitBtn: 'ส่งคำขอใบเสนอราคา',
    successMsg: '✓ ส่งแล้ว! เราจะตอบกลับภายใน 24 ชั่วโมง',
    privacyNote: 'การส่งฟอร์มถือว่าท่านยอมรับนโยบายความเป็นส่วนตัว',
    moreToggle: 'เพิ่มข้อมูลโครงการ',
    optional: '(ไม่บังคับ)',
    directLabel: 'ไม่สะดวกกรอกแบบฟอร์ม? ติดต่อเราโดยตรง:',
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
    moreToggle: 'Add project details',
    optional: '(optional)',
    directLabel: 'Prefer not to fill a form? Message us directly:',
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
    moreToggle: '补充项目信息',
    optional: '（可选）',
    directLabel: '不想填表？直接联系我们：',
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
    moreToggle: 'Tambah butiran projek',
    optional: '(pilihan)',
    directLabel: 'Tidak mahu isi borang? Hubungi kami terus:',
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
    moreToggle: 'أضف تفاصيل المشروع',
    optional: '(اختياري)',
    directLabel: 'لا ترغب في تعبئة النموذج؟ تواصل معنا مباشرة:',
  },
};

const COUNTRIES = [
  'Vietnam', 'Thailand', 'Malaysia', 'Indonesia', 'Philippines', 'Singapore',
  'Cambodia', 'Myanmar', 'Laos', 'India', 'Bangladesh', 'Sri Lanka',
  'Pakistan', 'United Arab Emirates', 'Saudi Arabia', 'Qatar',
  'Australia', 'New Zealand', 'United States', 'Mexico', 'Brazil',
  'Chile', 'Peru', 'Nigeria', 'Kenya', 'South Africa', 'Egypt',
  'Turkey', 'Poland', 'Germany', 'United Kingdom', 'Spain', 'Italy',
  'Russia', 'Kazakhstan', 'Japan', 'South Korea',
];

const fieldCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm';

export function QuoteForm({
  locale,
  whatsapp = WHATSAPP_NUMBER,
  email = CONTACT_EMAIL,
}: {
  locale: string;
  whatsapp?: string;
  email?: string;
}) {
  const c = formContent[locale] || formContent.en;
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showMore, setShowMore] = useState(false);

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
              placeholder={c.nameLabel} className={fieldCls} />

            <input type="email" name="email" required autoComplete="email"
              placeholder={c.emailLabel} className={fieldCls} />

            {/* 国家是外贸报价的前置信息（运费/关税/标准都按国别定），
                用 datalist 给常用市场做提示，同时允许手填任何国家 */}
            <input type="text" name="country" required autoComplete="country-name"
              list="angu-country-options"
              placeholder={c.countryLabel} className={fieldCls} />
            <datalist id="angu-country-options">
              {COUNTRIES.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>

            <textarea name="message" rows={3}
              placeholder={c.msgLabel} className={`${fieldCls} resize-none`} />

            {/* 可选区：默认收起，只留一行提示 */}
            <div>
              <button
                type="button"
                onClick={() => setShowMore((v) => !v)}
                aria-expanded={showMore}
                aria-controls="angu-optional-fields"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                {c.moreToggle} <span className="text-slate-400">{c.optional}</span>
              </button>

              <div id="angu-optional-fields" className={`mt-3 space-y-3 ${showMore ? '' : 'hidden'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" name="phone" autoComplete="tel"
                    placeholder={c.phoneLabel} className={fieldCls} />
                  <input type="text" name="company" autoComplete="organization"
                    placeholder={c.companyLabel} className={fieldCls} />
                </div>
                <input type="text" name="quantity"
                  placeholder={c.qtyLabel} className={fieldCls} />
              </div>
            </div>

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
            {status === 'error' && (
              <p className="text-xs text-red-600 text-center" role="alert">
                {locale === 'zh' ? '提交未成功，请稍后重试，或直接发邮件至 ' : 'Could not send. Please try again or email '}
                <a href={`mailto:${email}`} className="underline">{email}</a>
              </p>
            )}

            {/* 低摩擦出口：不愿意填表的人，直接 WhatsApp / 邮件走。
                Zalo / LINE 尚未注册，暂不作为主渠道（见 src/lib/channels.ts）。 */}
            <div className="pt-2 text-center border-t border-slate-100">
              <p className="text-xs text-slate-500 mt-3">{c.directLabel}</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                <a
                  href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello, I would like a quotation for noise barriers.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-[#128C7E] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 font-medium text-blue-700 hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  {email}
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
              <Link href={`/${locale}/privacy`} className="text-blue-600 hover:underline">{c.privacyNote}</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
