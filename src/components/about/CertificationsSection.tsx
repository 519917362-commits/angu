import { CERTIFICATIONS, CERT_ISSUER, CERT_PDF, CERT_VERIFY_URL, type CertLocale } from '@/lib/certifications';

const COPY = {
  subtitle: {
    en: 'Three management systems certified by an accredited third-party body. Certificate numbers can be verified on China\'s CNCA platform.',
    zh: '三个管理体系均由具备 CNAS/IAF 认可资质的第三方机构认证，证书编号可在国家认监委平台核验。',
    vi: 'Ba hệ thống quản lý được chứng nhận bởi tổ chức đánh giá độc lập có công nhận CNAS/IAF. Số chứng nhận có thể tra cứu trên cổng thông tin CNCA Trung Quốc.',
    th: 'ทั้งสามระบบได้รับการรับรองโดยหน่วยรับรองอิสระที่ได้รับการรับรอง CNAS/IAF หมายเลขใบรับรองสามารถตรวจสอบได้บนแพลตฟอร์ม CNCA ของจีน',
  },
  number: { en: 'Certificate No.', zh: '证书编号', vi: 'Số chứng nhận', th: 'เลขที่ใบรับรอง' },
  scope: { en: 'Certified scope', zh: '认证范围', vi: 'Phạm vi chứng nhận', th: 'ขอบเขตการรับรอง' },
  valid: { en: 'Valid until', zh: '有效期至', vi: 'Có hiệu lực đến', th: 'ใช้ได้ถึง' },
  issued: { en: 'Issued by', zh: '发证机构', vi: 'Cấp bởi', th: 'ออกโดย' },
  download: { en: 'Download certificates (CN + EN, 6 pages)', zh: '下载证书原件（中英文 6 页）', vi: 'Tải chứng nhận gốc (Trung + Anh, 6 trang)', th: 'ดาวน์โหลดใบรับรอง (จีน + อังกฤษ 6 หน้า)' },
  verify: { en: 'Verify on CNCA', zh: '国家认监委核验', vi: 'Tra cứu trên CNCA', th: 'ตรวจสอบที่ CNCA' },
  view: { en: 'View certificate', zh: '查看证书', vi: 'Xem chứng nhận', th: 'ดูใบรับรอง' },
  note: {
    en: 'Certificate holder: Anping County Angu Metal Wire Mesh Products Co., Ltd. (USCC 91131125308273603F)',
    zh: '证书持有者：安平县安固金属丝网制品有限公司（统一社会信用代码 91131125308273603F）',
    vi: 'Chủ sở hữu: Công ty TNHH Sản phẩm Lưới kim loại An Cố huyện An Bình (MST 91131125308273603F)',
    th: 'ผู้ถือใบรับรอง: บริษัท ผลิตภัณฑ์ตะแกรงโลหะอันกู่ อำเภออันผิง จำกัด (เลขทะเบียน 91131125308273603F)',
  },
} as const;

function pick<T extends Record<CertLocale, string>>(obj: T, lang: CertLocale): string {
  return obj[lang];
}

export function CertificationsSection({ locale, title }: { locale: string; title: string }) {
  const lang = (['en', 'zh', 'vi', 'th'].includes(locale) ? locale : 'en') as CertLocale;

  return (
    <section id="certifications" className="mb-12 scroll-mt-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
        <div className="w-16 h-1 bg-blue-600 mx-auto mb-4" />
        <p className="text-sm text-slate-500 max-w-3xl mx-auto leading-relaxed">{pick(COPY.subtitle, lang)}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CERTIFICATIONS.map((cert) => (
          <article
            key={cert.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:border-blue-200 hover:shadow-md transition-all"
          >
            <a
              href={CERT_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-100 border-b border-slate-100"
              title={pick(COPY.view, lang)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={`${cert.name[lang]} — ${cert.standard} (${cert.number})`}
                width={900}
                height={1156}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-top"
              />
            </a>

            <div className="p-5 flex-1 flex flex-col">
              <span className="inline-flex self-start items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 mb-3">
                {cert.label}
              </span>
              <h3 className="font-bold text-slate-900 text-base leading-snug mb-1">{cert.name[lang]}</h3>
              <p className="text-xs text-slate-400 mb-4">{cert.standard}</p>

              <dl className="text-xs text-slate-600 space-y-2.5">
                <div>
                  <dt className="text-slate-400 mb-0.5">{pick(COPY.number, lang)}</dt>
                  <dd className="font-mono font-semibold text-slate-800 tracking-tight">{cert.number}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 mb-0.5">{pick(COPY.scope, lang)}</dt>
                  <dd className="leading-relaxed">{cert.scope[lang]}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 mb-0.5">{pick(COPY.valid, lang)}</dt>
                  <dd>{cert.validUntil.replace(/-/g, '.')}</dd>
                </div>
              </dl>

              <p className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
                {pick(COPY.issued, lang)}: {CERT_ISSUER[lang === 'zh' ? 'zh' : 'en']} · {CERT_ISSUER.accreditation}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={CERT_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M4 4h16v16H4z" />
          </svg>
          {pick(COPY.download, lang)}
        </a>
        <a
          href={CERT_VERIFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:border-slate-300 hover:bg-slate-50 transition-colors"
        >
          {pick(COPY.verify, lang)}
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
      <p className="mt-4 text-center text-[11px] text-slate-400">{pick(COPY.note, lang)}</p>
    </section>
  );
}
