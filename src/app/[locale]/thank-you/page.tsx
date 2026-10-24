import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {CheckCircle2, Mail, MessageCircle, FileText, Clock} from 'lucide-react';
import {routing} from '@/lib/routing';
import {COMPANY} from '@/lib/company';

/**
 * 询盘提交后的确认页。
 *
 * 为什么需要独立页面（而不是只在表单弹一个「已发送」）：
 * 1. Ads / GA4 需要一个稳定的、可标记的到达地址，用于出价目标与归因核对；
 * 2. 用户关闭标签页后再回来、或从邮件/聊天记录点回来时有一个可访问的落地页；
 * 3. 表单内联成功态无法被分享，也无法承载「下一步会发生什么」的说明。
 *
 * 索引策略：noindex（感谢页对自然搜索无价值，且会造成重复内容），但 follow 保留，
 * 让爬虫仍能沿站内链接继续抓取。canonical 指向自身语种版本，避免四语互相稀释。
 */

const content = {
  en: {
    title: 'Thank You — Inquiry Received',
    description:
      'Your inquiry has been received. Our engineering sales team replies within 24 hours with specifications, FOB Tianjin pricing and lead time.',
    eyebrow: 'Inquiry received',
    heading: 'Thank you — we have your inquiry',
    intro:
      'A copy of your message is already in our sales inbox. No further action is needed on your side.',
    stepsTitle: 'What happens next',
    steps: [
      {
        title: 'Within 24 hours (Mon–Sat)',
        body: 'A sales engineer reads your specifications and confirms the details we need — mesh size, wire diameter, coating, quantity and destination port.',
      },
      {
        title: 'Quotation with real numbers',
        body: 'You receive a line-item quotation: FOB Tianjin unit price, MOQ per specification, production lead time and estimated ocean transit days.',
      },
      {
        title: 'Documents on request',
        body: 'Test reports, ISO 9001 / 14001 / 45001 certificates, mill certificates and installation drawings are sent free of charge for your project file.',
      },
    ],
    urgentTitle: 'Need an answer today?',
    urgentBody:
      'WhatsApp and phone reach a human during working hours (Mon–Fri 8:30–18:00, Sat 9:00–13:00 UTC+8). Quote your company name so we can find your inquiry.',
    whatsapp: 'Chat on WhatsApp',
    email: 'Email us',
    catalog: 'Browse product catalog',
    home: 'Back to homepage',
    note: 'Sent by mistake? Reply to the confirmation email and we will delete your data.',
  },
  zh: {
    title: '感谢您的询盘 — 安固丝网',
    description:
      '我们已收到您的询盘，工程销售团队将在 24 小时内回复规格确认、天津港 FOB 报价与生产周期。',
    eyebrow: '询盘已收到',
    heading: '感谢您，询盘已收到',
    intro: '您的留言已进入我们的销售邮箱，您这边无需再做任何操作。',
    stepsTitle: '接下来的流程',
    steps: [
      {
        title: '24 小时内（周一至周六）',
        body: '销售工程师会阅读您的规格要求，并与您确认网孔、丝径、表面处理、数量与目的港等细节。',
      },
      {
        title: '带具体数字的报价',
        body: '您会收到分项报价：天津港 FOB 单价、各规格起订量、生产周期与预估海运天数。',
      },
      {
        title: '资料按需提供',
        body: '检测报告、ISO 9001 / 14001 / 45001 证书、材质单与安装图纸，均可免费提供用于项目归档。',
      },
    ],
    urgentTitle: '今天就要答复？',
    urgentBody:
      '工作时间内（周一至周五 8:30–18:00，周六 9:00–13:00，UTC+8）WhatsApp 与电话均可直连业务人员。请告知公司名称，方便我们定位您的询盘。',
    whatsapp: 'WhatsApp 咨询',
    email: '发邮件',
    catalog: '浏览产品目录',
    home: '返回首页',
    note: '如果是误提交，请直接回复确认邮件，我们会删除您的资料。',
  },
  vi: {
    title: 'Cảm ơn bạn — Đã nhận yêu cầu báo giá',
    description:
      'Chúng tôi đã nhận được yêu cầu của bạn. Đội ngũ kinh doanh kỹ thuật sẽ phản hồi trong 24 giờ với thông số, giá FOB Thiên Tân và thời gian sản xuất.',
    eyebrow: 'Đã nhận yêu cầu',
    heading: 'Cảm ơn bạn — yêu cầu đã được ghi nhận',
    intro:
      'Nội dung bạn gửi đã vào hộp thư kinh doanh của chúng tôi. Bạn không cần làm thêm bước nào.',
    stepsTitle: 'Các bước tiếp theo',
    steps: [
      {
        title: 'Trong vòng 24 giờ (T2–T7)',
        body: 'Kỹ sư kinh doanh sẽ đọc thông số của bạn và xác nhận các chi tiết cần thiết — kích thước mắt lưới, đường kính dây, lớp phủ, số lượng và cảng đích.',
      },
      {
        title: 'Báo giá với số liệu cụ thể',
        body: 'Bạn nhận được báo giá chi tiết: đơn giá FOB Thiên Tân, số lượng đặt tối thiểu theo từng quy cách, thời gian sản xuất và số ngày vận chuyển dự kiến.',
      },
      {
        title: 'Tài liệu theo yêu cầu',
        body: 'Báo cáo thử nghiệm, chứng nhận ISO 9001 / 14001 / 45001, chứng chỉ vật liệu và bản vẽ lắp đặt được gửi miễn phí cho hồ sơ dự án của bạn.',
      },
    ],
    urgentTitle: 'Cần trả lời ngay hôm nay?',
    urgentBody:
      'WhatsApp và điện thoại gặp trực tiếp nhân viên trong giờ làm việc (T2–T6 8:30–18:00, T7 9:00–13:00, UTC+8). Vui lòng cho biết tên công ty để chúng tôi tra cứu yêu cầu của bạn.',
    whatsapp: 'Trò chuyện trên WhatsApp',
    email: 'Gửi email',
    catalog: 'Xem danh mục sản phẩm',
    home: 'Về trang chủ',
    note: 'Nếu gửi nhầm, hãy trả lời email xác nhận và chúng tôi sẽ xóa dữ liệu của bạn.',
  },
  th: {
    title: 'ขอบคุณ — เราได้รับคำขอใบเสนอราคาแล้ว',
    description:
      'เราได้รับคำขอของคุณแล้ว ทีมขายด้านเทคนิคจะตอบกลับภายใน 24 ชั่วโมง พร้อมข้อมูลจำเพาะ ราคา FOB เทียนจิน และระยะเวลาผลิต',
    eyebrow: 'ได้รับคำขอแล้ว',
    heading: 'ขอบคุณ — เราได้รับคำขอของคุณแล้ว',
    intro: 'ข้อความของคุณเข้าสู่กล่องจดหมายฝ่ายขายของเราแล้ว คุณไม่ต้องดำเนินการใด ๆ เพิ่มเติม',
    stepsTitle: 'ขั้นตอนถัดไป',
    steps: [
      {
        title: 'ภายใน 24 ชั่วโมง (จ.–ส.)',
        body: 'วิศวกรฝ่ายขายจะอ่านข้อกำหนดของคุณ และยืนยันรายละเอียดที่จำเป็น — ขนาดตาข่าย เส้นผ่านศูนย์กลางลวด การเคลือบ จำนวน และท่าเรือปลายทาง',
      },
      {
        title: 'ใบเสนอราคาที่มีตัวเลขจริง',
        body: 'คุณจะได้รับใบเสนอราคาแยกรายการ: ราคาต่อหน่วย FOB เทียนจิน ปริมาณสั่งขั้นต่ำตามข้อกำหนด ระยะเวลาผลิต และจำนวนวันขนส่งทางทะเลโดยประมาณ',
      },
      {
        title: 'เอกสารตามคำขอ',
        body: 'รายงานผลทดสอบ ใบรับรอง ISO 9001 / 14001 / 45001 ใบรับรองวัสดุ และแบบติดตั้ง จัดส่งให้ฟรีสำหรับแฟ้มโครงการของคุณ',
      },
    ],
    urgentTitle: 'ต้องการคำตอบวันนี้?',
    urgentBody:
      'WhatsApp และโทรศัพท์ติดต่อเจ้าหน้าที่ได้ในเวลาทำการ (จ.–ศ. 8:30–18:00, ส. 9:00–13:00 UTC+8) โปรดแจ้งชื่อบริษัทเพื่อให้เราค้นหาคำขอของคุณ',
    whatsapp: 'แชทบน WhatsApp',
    email: 'ส่งอีเมล',
    catalog: 'ดูแคตตาล็อกสินค้า',
    home: 'กลับหน้าแรก',
    note: 'หากส่งโดยไม่ตั้งใจ เพียงตอบกลับอีเมลยืนยัน แล้วเราจะลบข้อมูลของคุณ',
  },
} as const;

type PageContent = (typeof content)[keyof typeof content];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const c: PageContent = content[locale as keyof typeof content] ?? content.en;
  const base = COMPANY.siteUrl;

  return {
    title: c.title,
    description: c.description,
    robots: {index: false, follow: true},
    alternates: {
      canonical: `${base}/${locale}/thank-you`,
      languages: {
        'x-default': `${base}/en/thank-you`,
        en: `${base}/en/thank-you`,
        zh: `${base}/zh/thank-you`,
        vi: `${base}/vi/thank-you`,
        th: `${base}/th/thank-you`,
      },
    },
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  const c: PageContent = content[locale as keyof typeof content] ?? content.en;
  const phone = '+86 188 0318 9797';
  const whatsappDigits = phone.replace(/[^0-9]/g, '');

  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold tracking-wide uppercase mb-6">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            {c.eyebrow}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
            {c.heading}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">{c.intro}</p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              {c.whatsapp}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-xl transition-colors"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              {c.email}
            </a>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6">{c.stepsTitle}</h2>
        <ol className="space-y-4">
          {c.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Urgent */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
        <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="font-semibold text-slate-900 mb-1.5">{c.urgentTitle}</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{c.urgentBody}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-blue-700 font-medium hover:underline">
                  {phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="text-blue-700 font-medium hover:underline">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-sm">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-1.5 text-blue-700 font-medium hover:underline"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            {c.catalog}
          </Link>
          <Link href={`/${locale}`} className="text-slate-500 hover:text-slate-700 hover:underline">
            {c.home}
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">{c.note}</p>
      </section>
    </div>
  );
}
