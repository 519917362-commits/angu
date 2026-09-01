interface SpecContent {
  header: Record<string, string>;
  subheader: Record<string, string>;
  rows: Array<{ param: Record<string, string>; value: Record<string, string> }>;
}

const specContent: Record<string, SpecContent> = {
  common: {
    header: {
      en: 'Technical Specifications',
      zh: '技术参数',
      vi: 'Thông Số Kỹ Thuật',
      th: 'ข้อมูลทางเทคนิค',
    },
    subheader: {
      en: 'Key engineering parameters for our noise barrier systems. Full data sheets and lab reports available on request.',
      zh: '声屏障系统核心工程参数。完整数据表和实验室报告可应要求提供。',
      vi: 'Các thông số kỹ thuật chính của hệ thống tấm cách âm. Bảng dữ liệu đầy đủ và báo cáo phòng thí nghiệm có sẵn theo yêu cầu.',
      th: 'พารามิเตอร์ทางวิศวกรรมหลักของระบบแผงกั้นเสียง เอกสารข้อมูลฉบับเต็มและรายงานห้องปฏิบัติการพร้อมให้เมื่อขอ',
    },
    rows: [
      { param: { en: 'Panel Type', zh: '面板类型', vi: 'Loại Tấm', th: 'ประเภทแผง' }, value: { en: 'Sound-absorbing (louvered / micro-perforated)', zh: '吸声型（百叶/微孔）', vi: 'Hấp thụ âm (tấm thanh / đục lỗ siêu nhỏ)', th: 'ดูดซับเสียง (เกล็ด / เจาะรูขนาดไมโคร)' } },
      { param: { en: 'Panel Height', zh: '面板高度', vi: 'Chiều Cao Tấm', th: 'ความสูงแผง' }, value: { en: '2.0m / 2.5m / 3.0m / 4.0m (custom)', zh: '2.0m / 2.5m / 3.0m / 4.0m（可定制）', vi: '2.0m / 2.5m / 3.0m / 4.0m (tùy chỉnh)', th: '2.0 / 2.5 / 3.0 / 4.0 ม. (สั่งทำ)' } },
      { param: { en: 'NRC (Noise Reduction Coefficient)', zh: '吸音系数 NRC', vi: 'Hệ Số Giảm Ồn NRC', th: 'ค่าสัมประสิทธิ์ลดเสียง NRC' }, value: { en: '0.85 – 0.95', zh: '0.85 – 0.95', vi: '0.85 – 0.95', th: '0.85 – 0.95' } },
      { param: { en: 'STC Rating', zh: '隔声等级 STC', vi: 'Cấp Cách Âm STC', th: 'ระดับกันเสียง STC' }, value: { en: '> 38 dB', zh: '> 38 dB', vi: '> 38 dB', th: '> 38 dB' } },
      { param: { en: 'Insertion Loss', zh: '插入损失', vi: 'Suy Giảm Tiếng Ồn', th: 'การสูญเสียการแทรก' }, value: { en: '10 – 15 dB(A)', zh: '10 – 15 dB(A)', vi: '10 – 15 dB(A)', th: '10 – 15 dB(A)' } },
      { param: { en: 'Outer Skin', zh: '外面板', vi: 'Vỏ Ngoài', th: 'ผิวด้านนอก' }, value: { en: '0.8mm perforated galvanized steel', zh: '0.8mm 穿孔镀锌钢板', vi: 'Thép mạ kẽm đục lỗ 0.8mm', th: 'เหล็กชุบกัลวาไนซ์เจาะรู 0.8 มม.' } },
      { param: { en: 'Sound Core', zh: '吸音芯材', vi: 'Lõi Tiêu Âm', th: 'แกนดูดซับเสียง' }, value: { en: '50–80mm mineral wool, 80 kg/m³', zh: '50–80mm 矿棉, 80 kg/m³', vi: 'Bông khoáng 50–80mm, 80 kg/m³', th: 'ใยหิน 50–80 มม., 80 กก./ลบ.ม.' } },
      { param: { en: 'Post Type', zh: '立柱类型', vi: 'Loại Trụ', th: 'ประเภทเสา' }, value: { en: 'H-section 100×100×6×8 or larger', zh: 'H型钢 100×100×6×8 或更大', vi: 'Thép H 100×100×6×8 hoặc lớn hơn', th: 'เหล็ก H 100×100×6×8 หรือใหญ่กว่า' } },
      { param: { en: 'Post Spacing', zh: '立柱间距', vi: 'Khoảng Cách Trụ', th: 'ระยะห่างเสา' }, value: { en: '2.0m standard', zh: '标准 2.0m', vi: 'Tiêu chuẩn 2.0m', th: 'มาตรฐาน 2.0 ม.' } },
      { param: { en: 'Surface Treatment', zh: '表面处理', vi: 'Xử Lý Bề Mặt', th: 'การเคลือบผิว' }, value: { en: 'Hot-dip galvanized ≥150g/m² (panel) / ≥275g/m² (post)', zh: '热镀锌 ≥150g/m²（面板）/ ≥275g/m²（立柱）', vi: 'Mạ kẽm nhúng nóng ≥150g/m² (tấm) / ≥275g/m² (trụ)', th: 'ชุบกัลวาไนซ์ร้อน ≥150ก./ตร.ม. (แผง) / ≥275ก./ตร.ม. (เสา)' } },
      { param: { en: 'Powder Coating (Optional)', zh: '粉末喷涂（可选）', vi: 'Sơn Tĩnh Điện (Tùy Chọn)', th: 'เคลือบสีฝุ่น (เสริม)' }, value: { en: 'Polyester / PVDF, RAL color options', zh: '聚酯/氟碳，可选RAL色卡', vi: 'Polyester / PVDF, tùy chọn màu RAL', th: 'โพลีเอสเตอร์ / PVDF, เลือกสี RAL' } },
      { param: { en: 'Fire Rating', zh: '防火等级', vi: 'Cấp Chống Cháy', th: 'ระดับการทนไฟ' }, value: { en: 'A1 (non-combustible)', zh: 'A1 (不燃)', vi: 'A1 (không cháy)', th: 'A1 (ไม่ติดไฟ)' } },
      { param: { en: 'Wind Load', zh: '抗风荷载', vi: 'Tải Trọng Gió', th: 'แรงลม' }, value: { en: '≥ 0.8 kPa standard, up to 2.0 kPa custom', zh: '标准 ≥ 0.8 kPa，可定制至 2.0 kPa', vi: 'Tiêu chuẩn ≥ 0.8 kPa, tùy chỉnh đến 2.0 kPa', th: 'มาตรฐาน ≥ 0.8 kPa, สั่งทำถึง 2.0 kPa' } },
      { param: { en: 'Standards', zh: '适用标准', vi: 'Tiêu Chuẩn Áp Dụng', th: 'มาตรฐาน' }, value: { en: 'EN 1793, GB/T 19884, ISO 10140', zh: 'EN 1793, GB/T 19884, ISO 10140', vi: 'EN 1793, GB/T 19884, ISO 10140', th: 'EN 1793, GB/T 19884, ISO 10140' } },
    ],
  },
};

export function TechSpecSection({ locale }: { locale: string }) {
  const s = specContent.common;

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {s.header[locale] || s.header.en}
          </h2>
          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            {s.subheader[locale] || s.subheader.en}
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-6 py-4 font-semibold w-2/5">
                  {locale === 'vi' ? 'Thông Số' : locale === 'th' ? 'พารามิเตอร์' : locale === 'zh' ? '参数' : 'Parameter'}
                </th>
                <th className="text-left px-6 py-4 font-semibold w-3/5">
                  {locale === 'vi' ? 'Giá Trị' : locale === 'th' ? 'ค่า' : locale === 'zh' ? '规格' : 'Specification'}
                </th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, i) => (
                <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                  <td className="px-6 py-3.5 font-medium text-slate-700">{row.param[locale] || row.param.en}</td>
                  <td className="px-6 py-3.5 text-slate-600">{row.value[locale] || row.value.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download CTA */}
        <div className="mt-10 text-center p-8 bg-blue-50 rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {locale === 'vi' ? 'Tải Bảng Dữ Liệu & Báo Cáo Phòng Thí Nghiệm'
             : locale === 'th' ? 'ดาวน์โหลดเอกสารข้อมูลและรายงานห้องปฏิบัติการ'
             : locale === 'zh' ? '下载完整数据表和实验室报告'
             : 'Download Full Data Sheets & Lab Reports'}
          </h3>
          <p className="text-sm text-slate-600 mb-5">
            {locale === 'vi'
              ? 'Bao gồm: kết quả kiểm tra âm học, báo cáo phun muối, chứng chỉ nguyên vật liệu. Gửi ngay sau khi nhận yêu cầu.'
              : locale === 'th'
              ? 'รวม: ผลทดสอบเสียง, รายงานพ่นเกลือ, ใบรับรองวัสดุ จัดส่งทันทีเมื่อขอ'
              : locale === 'zh'
              ? '包含：声学测试结果、盐雾报告、材料证书。收到请求后立即发送。'
              : 'Includes: acoustic test results, salt-spray reports, material certificates. Sent immediately upon request.'}
          </p>
          <a href="#quote-form"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            {locale === 'vi' ? 'Yêu Cầu Tài Liệu Kỹ Thuật →' : locale === 'th' ? 'ขอเอกสารทางเทคนิค →' : locale === 'zh' ? '申请技术文件 →' : 'Request Technical Documents →'}
          </a>
        </div>
      </div>
    </section>
  );
}
