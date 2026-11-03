import Link from 'next/link';
import {Download, Mail, FileText} from 'lucide-react';
import type {Metadata} from 'next';
import {generatePageMeta} from '@/lib/seo-utils';
import { tLabel } from '@/lib/i18n';

// ISR 缓存窗口（显式覆盖 Next 默认的一年）。
// 之前只有 fetch 级 revalidate=300，页面级 expireTime 用默认值 1 年，
// 响应头就成了 `s-maxage=300, stale-while-revalidate=31535700` —— 改完文案
// 最长一年都可能继续吐旧 HTML。投放期每次改文案都会被误判成"没生效"。
// 压到 1 天后最多 24 小时自动收敛；要立刻生效走 /api/revalidate。
export const revalidate = 300;
export const expireTime = 86400;


/**
 * 下载中心。
 *
 * ⚠️ 这一页曾经列出 8 份文件、标注了体积（12.4 MB / 8.7 MB …），
 * 但按钮是 <button>，没有 href、没有 onclick、点了没有任何请求 ——
 * 而站上唯一真实存在的 PDF 只有 ISO 三体系证书。
 *
 * 该页在 sitemap 里、且全站页脚「Downloads」都指向它，买家点两次
 * 就会判定这是模板站。现在的规则只有一条：
 * **只有真实存在、点了真的能下的文件，才允许出现在「Download」区。**
 * 其余一律标为「on request」，并给出真实可达的索取入口（邮件 / 联系页）。
 */

const CERT_PDF = '/downloads/angu-iso-three-system-certificates.pdf';
const CONTACT_EMAIL = 'annie@angumesh.com';

type RequestDoc = { title: string; desc: string; icon: string; category: string };

const content: Record<
  string,
  {
    readyTitle: string;
    readyDesc: string;
    readyName: string;
    readyMeta: string;
    downloadBtn: string;
    requestTitle: string;
    requestDesc: string;
    requestBtn: string;
    docs: RequestDoc[];
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
    mailSubject: string;
  }
> = {
  en: {
    readyTitle: 'Available for immediate download',
    readyDesc: 'No form, no email required — click and the file opens in a new tab.',
    readyName: 'ISO Certificates — Quality, Environment & Safety',
    readyMeta: 'ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018',
    downloadBtn: 'Download PDF',
    requestTitle: 'Sent on request',
    requestDesc:
      'These are prepared per enquiry so we can include the edition that matches your standard (EN 1793, GB/T 19884, ASTM). Tell us which one you need and our engineer emails it within 24 hours.',
    requestBtn: 'Request by email',
    docs: [
      {
        title: 'Noise Barrier Panel Data Sheet',
        desc: 'Panel types, STC / insertion-loss values, post spacing, wind-load capacity and fixing details.',
        icon: '🔇',
        category: 'Noise barrier',
      },
      {
        title: 'Gabion Box Specification Sheet',
        desc: 'Standard and custom box sizes, wire diameters, mesh tolerances and coating options.',
        icon: '📋',
        category: 'Gabion',
      },
      {
        title: 'Rockfall Protection Net Technical Manual',
        desc: 'Active and passive system design, anchor layout, installation sequence and load-test data.',
        icon: '🔧',
        category: 'Rockfall',
      },
      {
        title: 'Reno Mattress Installation Guide',
        desc: 'Step-by-step installation with diagrams for riverbank and erosion-control works.',
        icon: '🏗️',
        category: 'Gabion',
      },
      {
        title: 'Company Profile & Factory Audit Pack',
        desc: 'Company introduction, production lines, QC process and reference project list.',
        icon: '🏢',
        category: 'Company',
      },
      {
        title: 'PVC Coated Gabion Colour Chart',
        desc: 'Available colours with RAL codes and UV-stabilisation data.',
        icon: '🎨',
        category: 'Gabion',
      },
    ],
    ctaTitle: 'Need a document that is not listed?',
    ctaDesc:
      'Send us the drawing list, the standard your client requires, or a sample page — we will match the format.',
    ctaBtn: 'Contact our engineers',
    mailSubject: 'Document request',
  },
  zh: {
    readyTitle: '可直接下载',
    readyDesc: '无需填表、无需留邮箱，点击即在新标签页打开。',
    readyName: 'ISO 三体系认证证书',
    readyMeta: 'ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018',
    downloadBtn: '下载 PDF',
    requestTitle: '按需发送',
    requestDesc:
      '这些资料按询盘定制版本（EN 1793 / GB/T 19884 / ASTM 各不相同），告诉我们您需要哪一份，工程师 24 小时内发到邮箱。',
    requestBtn: '邮件索取',
    docs: [
      {
        title: '声屏障面板规格书',
        desc: '面板类型、STC / 插入损失数值、立柱间距、抗风荷载与连接节点详图。',
        icon: '🔇',
        category: '声屏障',
      },
      {
        title: '石笼网箱规格表',
        desc: '标准与定制箱体尺寸、丝径、网孔公差与镀层选项。',
        icon: '📋',
        category: '石笼',
      },
      {
        title: '落石防护网技术手册',
        desc: '主动/被动系统设计、锚固布置、安装顺序与荷载试验数据。',
        icon: '🔧',
        category: '防护网',
      },
      {
        title: '雷诺护垫安装指南',
        desc: '河岸防护与防冲蚀工程的图解式分步安装指南。',
        icon: '🏗️',
        category: '石笼',
      },
      {
        title: '公司简介与验厂资料包',
        desc: '公司介绍、产线、质检流程与已交付项目清单。',
        icon: '🏢',
        category: '公司',
      },
      {
        title: 'PVC 包塑石笼色卡',
        desc: '可选颜色、对应 RAL 色号与抗紫外线数据。',
        icon: '🎨',
        category: '石笼',
      },
    ],
    ctaTitle: '没有找到需要的文件？',
    ctaDesc: '把图纸清单、业主指定的标准号或样张发给我们，我们按对应格式整理。',
    ctaBtn: '联系工程师',
    mailSubject: '资料索取',
  },
  vi: {
    readyTitle: 'Tải trực tiếp',
    readyDesc: 'Không cần điền form, không cần email — bấm là mở file ở tab mới.',
    readyName: 'Chứng nhận ISO — Chất lượng, Môi trường & An toàn',
    readyMeta: 'ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018',
    downloadBtn: 'Tải PDF',
    requestTitle: 'Gửi theo yêu cầu',
    requestDesc:
      'Các tài liệu này được chuẩn bị theo từng yêu cầu để khớp tiêu chuẩn của bạn (EN 1793, GB/T 19884, ASTM). Cho chúng tôi biết bạn cần bản nào, kỹ sư sẽ gửi qua email trong 24 giờ.',
    requestBtn: 'Yêu cầu qua email',
    docs: [
      {
        title: 'Bảng thông số tấm chắn âm',
        desc: 'Loại tấm, giá trị STC / suy giảm âm, khoảng cách trụ, khả năng chịu tải gió và chi tiết liên kết.',
        icon: '🔇',
        category: 'Tấm cách âm',
      },
      {
        title: 'Bảng thông số rọ đá',
        desc: 'Kích thước hộp tiêu chuẩn và tùy chỉnh, đường kính dây, dung sai mắt lưới và tùy chọn phủ.',
        icon: '📋',
        category: 'Rọ đá',
      },
      {
        title: 'Sổ tay kỹ thuật lưới chống rơi đá',
        desc: 'Thiết kế hệ thống chủ động/bị động, bố trí neo, trình tự lắp đặt và dữ liệu kiểm tải.',
        icon: '🔧',
        category: 'Chống rơi đá',
      },
      {
        title: 'Hướng dẫn lắp đặt đệm Reno',
        desc: 'Hướng dẫn từng bước kèm hình minh họa cho bảo vệ bờ sông và kiểm soát xói mòn.',
        icon: '🏗️',
        category: 'Rọ đá',
      },
      {
        title: 'Hồ sơ công ty & tài liệu đánh giá nhà máy',
        desc: 'Giới thiệu công ty, dây chuyền sản xuất, quy trình QC và danh sách dự án tham chiếu.',
        icon: '🏢',
        category: 'Công ty',
      },
      {
        title: 'Bảng màu rọ đá phủ PVC',
        desc: 'Màu sẵn có kèm mã RAL và dữ liệu ổn định UV.',
        icon: '🎨',
        category: 'Rọ đá',
      },
    ],
    ctaTitle: 'Không thấy tài liệu bạn cần?',
    ctaDesc: 'Gửi danh mục bản vẽ, tiêu chuẩn chủ đầu tư yêu cầu hoặc trang mẫu — chúng tôi sẽ trình bày đúng định dạng.',
    ctaBtn: 'Liên hệ kỹ sư',
    mailSubject: 'Yêu cầu tài liệu',
  },
  th: {
    readyTitle: 'ดาวน์โหลดได้ทันที',
    readyDesc: 'ไม่ต้องกรอกฟอร์ม ไม่ต้องใช้อีเมล — คลิกแล้วเปิดไฟล์ในแท็บใหม่',
    readyName: 'ใบรับรอง ISO — คุณภาพ สิ่งแวดล้อม และความปลอดภัย',
    readyMeta: 'ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018',
    downloadBtn: 'ดาวน์โหลด PDF',
    requestTitle: 'ส่งตามคำขอ',
    requestDesc:
      'เอกสารเหล่านี้จัดทำตามแต่ละคำขอเพื่อให้ตรงมาตรฐานของคุณ (EN 1793, GB/T 19884, ASTM) แจ้งว่าต้องการฉบับใด วิศวกรจะส่งทางอีเมลภายใน 24 ชั่วโมง',
    requestBtn: 'ขอทางอีเมล',
    docs: [
      {
        title: 'ตารางสเปคแผงกั้นเสียง',
        desc: 'ประเภทแผง ค่า STC / การสูญเสียการแทรก ระยะห่างเสา ความสามารถรับแรงลม และรายละเอียดจุดยึด',
        icon: '🔇',
        category: 'แผงกั้นเสียง',
      },
      {
        title: 'ตารางข้อมูลจำเพาะกล่องเกเบี้ยน',
        desc: 'ขนาดกล่องมาตรฐานและสั่งทำ เส้นผ่านศูนย์กลางลวด ค่าเผื่อตาข่าย และตัวเลือกการเคลือบ',
        icon: '📋',
        category: 'เกเบี้ยน',
      },
      {
        title: 'คู่มือเทคนิคตะแกรงป้องกันหินตก',
        desc: 'การออกแบบระบบแอคทีฟ/แพสซีฟ การจัดวางสมอยึด ลำดับการติดตั้ง และข้อมูลทดสอบภาระ',
        icon: '🔧',
        category: 'ป้องกันหินตก',
      },
      {
        title: 'คู่มือติดตั้งฟูก Reno',
        desc: 'คู่มือติดตั้งทีละขั้นตอนพร้อมแผนภาพสำหรับงานป้องกันตลิ่งและควบคุมการพังทลาย',
        icon: '🏗️',
        category: 'เกเบี้ยน',
      },
      {
        title: 'ประวัติบริษัทและชุดเอกสารตรวจโรงงาน',
        desc: 'บทนำบริษัท สายการผลิต กระบวนการ QC และรายชื่อโครงการอ้างอิง',
        icon: '🏢',
        category: 'บริษัท',
      },
      {
        title: 'แผนภูมิสีเกเบี้ยนเคลือบ PVC',
        desc: 'สีที่มีให้พร้อมรหัส RAL และข้อมูลความเสถียรต่อ UV',
        icon: '🎨',
        category: 'เกเบี้ยน',
      },
    ],
    ctaTitle: 'ไม่พบเอกสารที่ต้องการ?',
    ctaDesc: 'ส่งรายการแบบ มาตรฐานที่ผู้ว่าจ้างกำหนด หรือหน้าตัวอย่างมาให้เรา เราจะจัดรูปแบบให้ตรง',
    ctaBtn: 'ติดต่อวิศวกร',
    mailSubject: 'ขอเอกสาร',
  },
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMeta('download', locale, `/${locale}/download`);
}

export default async function DownloadPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const c = content[locale] || content.en;

  // ── JSON-LD: BreadcrumbList ──
  // 不再输出 ItemList：之前它把 8 份「不存在的文件」当成资源列表提交给搜索引擎，
  // 与页面上的死按钮是同一个问题。等 PDF 真的齐了再恢复。
  const breadcrumbLD = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: tLabel('首页', 'Home', locale), item: `https://www.angumesh.com/${locale}`},
      {'@type': 'ListItem', position: 2, name: tLabel('下载页标题', 'Downloads', locale), item: `https://www.angumesh.com/${locale}/download`},
    ],
  };

  const mailto = (doc: string) =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${c.mailSubject}: ${doc}`)}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbLD)}} />

      {/* Header */}
      <div className="bg-blue-900 text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {tLabel('下载与资源', 'Downloads & Resources', locale)}
          </h1>
          <nav className="text-sm text-blue-200">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              {tLabel('首页', 'Home', locale)}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{tLabel('下载页标题', 'Downloads', locale)}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 真实可下载区 */}
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-4">{c.readyTitle}</h2>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 mb-14">
          <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg">{c.readyName}</h3>
            <p className="text-sm text-slate-500 mt-1">{c.readyMeta}</p>
            <p className="text-xs text-slate-400 mt-2">{c.readyDesc}</p>
          </div>
          <a
            href={CERT_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex-shrink-0"
          >
            <Download className="w-4 h-4" /> {c.downloadBtn}
          </a>
        </div>

        {/* 按需索取区 */}
        <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase mb-2">{c.requestTitle}</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-3xl leading-relaxed">{c.requestDesc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {c.docs.map((doc) => (
            <div
              key={doc.title}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-200 transition-colors flex items-start gap-4"
            >
              <div className="w-11 h-11 bg-slate-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0" aria-hidden="true">
                {doc.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug">{doc.title}</h3>
                  <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded flex-shrink-0">{doc.category}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{doc.desc}</p>
                <a
                  href={mailto(doc.title)}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:text-blue-700 mt-3"
                >
                  <Mail className="w-3.5 h-3.5" /> {c.requestBtn}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center bg-white rounded-xl p-10 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">{c.ctaTitle}</h2>
          <p className="text-slate-500 mb-6 max-w-lg mx-auto leading-relaxed">{c.ctaDesc}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              {c.ctaBtn}
            </Link>
            <a
              href="https://wa.me/8618803189797"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
