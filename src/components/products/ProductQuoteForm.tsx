'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {submitInquiryLead} from '@/lib/inquiry';

/**
 * 产品详情页底部的页内询价表单。
 *
 * 原来产品页只有一个「立即发送询盘」按钮，点开才出弹窗（InquiryModal）。
 * 从 Google 落地到产品页的访客，很多不会去点按钮，直接滚到底就走了。
 * 这里补一个常驻表单，产品名自动预填进需求描述，提交后进确认页。
 */

interface Copy {
  title: string;
  subtitle: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  qty: string;
  msg: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  points: string[];
}

const COPY: Record<string, Copy> = {
  en: {
    title: 'Request a Quote for This Product',
    subtitle: 'Factory-direct price · FOB / CIF · Reply within 24 hours',
    name: 'Your Name *',
    email: 'Email *',
    phone: 'Phone / WhatsApp',
    country: 'Country / Region *',
    qty: 'Quantity (m / m²)',
    msg: 'Requirements, standards, delivery port…',
    submit: 'Send Inquiry',
    sending: 'Sending…',
    success: 'Sent! Redirecting…',
    error: 'Submission failed. Please retry or email us directly.',
    points: ['Free CAD drawings & load calculation', 'MOQ from 50 m² for trial orders', '5-year warranty on hot-dip galvanizing'],
  },
  zh: {
    title: '获取此产品报价',
    subtitle: '工厂直供价 · FOB / CIF · 24 小时内回复',
    name: '您的姓名 *',
    email: '电子邮箱 *',
    phone: '电话 / WhatsApp',
    country: '国家 / 地区 *',
    qty: '数量（米 / 平方米）',
    msg: '需求描述、执行标准、交货港口…',
    submit: '提交询价',
    sending: '提交中…',
    success: '已提交，正在跳转…',
    error: '提交失败，请重试或直接发邮件给我们。',
    points: ['免费提供 CAD 图纸与荷载计算', '试单 50 平方米起', '热镀锌层 5 年质保'],
  },
  vi: {
    title: 'Nhận báo giá cho sản phẩm này',
    subtitle: 'Giá xuất xưởng · FOB / CIF · Phản hồi trong 24 giờ',
    name: 'Họ và Tên *',
    email: 'Email *',
    phone: 'Zalo / WhatsApp',
    country: 'Quốc gia / Khu vực *',
    qty: 'Số lượng (m / m²)',
    msg: 'Yêu cầu kỹ thuật, tiêu chuẩn, cảng giao hàng…',
    submit: 'Gửi yêu cầu báo giá',
    sending: 'Đang gửi…',
    success: 'Đã gửi! Đang chuyển trang…',
    error: 'Gửi thất bại. Vui lòng thử lại hoặc gửi email cho chúng tôi.',
    points: ['Miễn phí bản vẽ CAD và tính toán tải trọng', 'MOQ từ 50 m² cho đơn thử', 'Bảo hành 5 năm cho lớp mạ kẽm nhúng nóng'],
  },
  th: {
    title: 'ขอใบเสนอราคาสำหรับสินค้านี้',
    subtitle: 'ราคาโรงงาน · FOB / CIF · ตอบกลับภายใน 24 ชั่วโมง',
    name: 'ชื่อ-นามสกุล *',
    email: 'อีเมล *',
    phone: 'LINE / WhatsApp',
    country: 'ประเทศ / ภูมิภาค *',
    qty: 'จำนวน (ม. / ตร.ม.)',
    msg: 'ข้อกำหนดทางเทคนิค มาตรฐาน ท่าเรือปลายทาง…',
    submit: 'ส่งคำขอใบเสนอราคา',
    sending: 'กำลังส่ง…',
    success: 'ส่งแล้ว! กำลังเปลี่ยนหน้า…',
    error: 'ส่งไม่สำเร็จ กรุณาลองใหม่หรืออีเมลหาเราโดยตรง',
    points: ['แบบ CAD และการคำนวณน้ำหนักฟรี', 'สั่งขั้นต่ำ 50 ตร.ม. สำหรับทดลอง', 'รับประกัน 5 ปีสำหรับการชุบกัลวาไนซ์ร้อน'],
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

const inputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm';

export function ProductQuoteForm({
  productName,
  productSlug,
  categorySlug,
  locale,
}: {
  productName: string;
  productSlug: string;
  categorySlug?: string;
  locale: string;
}) {
  const c = COPY[locale] || COPY.en;
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  return (
    <section id="product-quote" className="mt-16 scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900">{c.title}</h2>
          <p className="mt-2 text-sm text-slate-500">{c.subtitle}</p>
          <ul className="mt-5 space-y-2.5">
            {c.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-green-600 mt-0.5" aria-hidden="true">✓</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <form
            action="/api/inquiry"
            method="POST"
            className="space-y-3"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus('loading');
              const data = new FormData(e.currentTarget);
              try {
                const result = await submitInquiryLead(Object.fromEntries(data.entries()), {
                  source: 'product_page',
                  productInterest: productName,
                  locale,
                });
                if (result.success) {
                  setStatus('success');
                  window.setTimeout(() => router.push(`/${locale}/thank-you`), 700);
                } else {
                  setStatus('error');
                }
              } catch {
                setStatus('error');
              }
            }}
          >
            {/* 蜜罐：真实访客看不见，机器人会填 */}
            <input type="text" name="website" autoComplete="off" tabIndex={-1}
              style={{position: 'absolute', opacity: 0, pointerEvents: 'none'}} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" name="name" required autoComplete="name" placeholder={c.name} className={inputCls} />
              <input type="email" name="email" required autoComplete="email" placeholder={c.email} className={inputCls} />
              <input type="text" name="phone" autoComplete="tel" placeholder={c.phone} className={inputCls} />
              <input type="text" name="country" required autoComplete="country-name"
                list="product-quote-countries" placeholder={c.country} className={inputCls} />
              <datalist id="product-quote-countries">
                {COUNTRIES.map((n) => <option key={n} value={n} />)}
              </datalist>
              <input type="text" name="quantity" placeholder={c.qty} className="sm:col-span-2 w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-sm" />
            </div>

            <textarea name="message" rows={3} placeholder={c.msg} defaultValue={productName}
              className={`${inputCls} bg-white resize-none`} />

            <input type="hidden" name="productSlug" value={productSlug} />
            <input type="hidden" name="categorySlug" value={categorySlug || ''} />
            <input type="hidden" name="product_interest" value={productName} />
            <input type="hidden" name="locale" value={locale} />

            {status === 'error' && (
              <p className="text-sm text-red-600">{c.error}</p>
            )}

            <button type="submit" disabled={status === 'loading' || status === 'success'}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors text-sm tracking-wide">
              {status === 'loading' ? c.sending : status === 'success' ? c.success : `${c.submit} →`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
