-- 关于页 / FAQ页 / 下载页 SEO 精细化配置（声屏障优先定位，四语对齐）
-- 修复 value_en 列 JSON 污染 + 重写 vi/th 半翻译垃圾

-- ============ 关于页 ============
UPDATE site_config SET
  value_en = 'About Angu — Professional Noise Barrier Manufacturer | ISO 9001 Certified',
  value_zh = '关于安固 — 专业声屏障制造商 | ISO 9001认证',
  value_vi = 'Về Angu — Nhà Sản Xuất Tấm Chắn Ồn Chuyên Nghiệp | ISO 9001',
  value_th = 'เกี่ยวกับ Angu — ผู้ผลิตแผงกั้นเสียงมืออาชีพ | รับรอง ISO 9001'
WHERE key = 'seo.about.title_en';

UPDATE site_config SET
  value_en = 'Angu Wire Mesh is a professional noise barrier manufacturer in Anping, China. ISO 9001 & CE certified, 15+ years experience, exporting to 30+ countries.',
  value_zh = '安固丝网是位于中国安平的专业声屏障制造商。ISO 9001与CE认证，15+年经验，出口30+国家。',
  value_vi = 'Angu Wire Mesh là nhà sản xuất tấm chắn ồn chuyên nghiệp tại Anping, Trung Quốc. Chứng nhận ISO 9001 & CE, 15+ năm kinh nghiệm, xuất khẩu đến 30+ quốc gia.',
  value_th = 'Angu Wire Mesh เป็นผู้ผลิตแผงกั้นเสียงมืออาชีพในอันผิง ประเทศจีน ได้รับการรับรอง ISO 9001 & CE มีประสบการณ์ 15+ ปี ส่งออกไปยัง 30+ ประเทศ'
WHERE key = 'seo.about.description_en';

UPDATE site_config SET
  value_en = 'noise barrier manufacturer, sound barrier factory, Anping factory, ISO 9001, CE certified, about Angu',
  value_zh = '声屏障厂家, 隔音屏障工厂, 安平工厂, ISO 9001认证, CE认证, 关于安固',
  value_vi = 'nhà sản xuất tấm chắn ồn, nhà máy vách cách âm, nhà máy Anping, ISO 9001, CE, về Angu',
  value_th = 'ผู้ผลิตแผงกั้นเสียง, โรงงานแผงกันเสียง, โรงงานอันผิง, ISO 9001, CE, เกี่ยวกับ Angu'
WHERE key = 'seo.about.keywords_en';

-- about 页内半翻译标题修复
UPDATE site_config SET
  value_en = '15 Years of Noise Barrier Manufacturing, Serving 30+ Countries',
  value_zh = '15年专注声屏障制造，服务全球30+国家',
  value_vi = '15 Năm Sản Xuất Tấm Chắn Ồn, Phục Vụ 30+ Quốc Gia',
  value_th = '15 ปีแห่งการผลิตแผงกั้นเสียง ให้บริการ 30+ ประเทศ'
WHERE key = 'about_title_en';

UPDATE site_config SET
  value_en = 'About Angu Wire Mesh — ISO/CE Certified Noise Barrier Manufacturer from China',
  value_zh = '关于安固丝网 —— ISO/CE认证的中国声屏障制造商',
  value_vi = 'Về Angu Wire Mesh — Nhà Sản Xuất Tấm Chắn Ồn Chứng Nhận ISO/CE Từ Trung Quốc',
  value_th = 'เกี่ยวกับ Angu Wire Mesh — ผู้ผลิตแผงกั้นเสียงรับรอง ISO/CE จากจีน'
WHERE key = 'about_seo_title_en';

-- ============ FAQ 页 ============
UPDATE site_config SET
  value_en = 'Noise Barrier FAQ — Answers on Products, Shipping & MOQ | Angu',
  value_zh = '声屏障常见问答 — 产品、运输与起订量解答 | 安固丝网',
  value_vi = 'FAQ Tấm Chắn Ồn — Giải Đáp Sản Phẩm, Vận Chuyển & MOQ | Angu',
  value_th = 'คำถามที่พบบ่อยแผงกั้นเสียง — สินค้า ขนส่ง & MOQ | Angu'
WHERE key = 'seo.faq.title_en';

UPDATE site_config SET
  value_en = 'Answers on noise barriers, gabion boxes and wire mesh products. Shipping, MOQ, payment terms, customization and technical specifications explained.',
  value_zh = '声屏障、石笼网箱与丝网产品常见问题解答。涵盖运输、起订量、付款方式、定制服务及技术规格。',
  value_vi = 'Giải đáp về tấm chắn ồn, rọ đá và sản phẩm lưới thép. Vận chuyển, MOQ, điều khoản thanh toán, tùy chỉnh và thông số kỹ thuật.',
  value_th = 'คำตอบเกี่ยวกับแผงกั้นเสียง กล่องเกเบี้ยน และผลิตภัณฑ์ลวดตาข่าย การขนส่ง MOQ เงื่อนไขการชำระเงิน การปรับแต่ง และข้อกำหนดทางเทคนิค'
WHERE key = 'seo.faq.description_en';

UPDATE site_config SET
  value_en = 'noise barrier FAQ, sound barrier questions, MOQ, shipping terms, payment, technical specs',
  value_zh = '声屏障FAQ, 隔音屏障问题, 起订量, 运输, 付款方式, 技术规格',
  value_vi = 'FAQ tấm chắn ồn, câu hỏi vách cách âm, MOQ, điều khoản vận chuyển, thanh toán, thông số kỹ thuật',
  value_th = 'FAQ แผงกั้นเสียง, คำถามแผงกันเสียง, MOQ, เงื่อนไขการขนส่ง, การชำระเงิน, ข้อมูลทางเทคนิค'
WHERE key = 'seo.faq.keywords_en';

-- ============ 下载页 ============
UPDATE site_config SET
  value_en = 'Noise Barrier Downloads — Catalog & Technical Sheets | Angu',
  value_zh = '声屏障下载中心 — 产品目录与技术资料 | 安固丝网',
  value_vi = 'Tải Xuống Tấm Chắn Ồn — Catalog & Tài Liệu Kỹ Thuật | Angu',
  value_th = 'ดาวน์โหลดแผงกั้นเสียง — แคตตาล็อก & เอกสารทางเทคนิค | Angu'
WHERE key = 'seo.download.title_en';

UPDATE site_config SET
  value_en = 'Download noise barrier and wire mesh catalogs, technical data sheets and certifications. PDF for noise barriers, gabion boxes and protection nets.',
  value_zh = '下载声屏障与丝网产品目录、技术参数表与认证文件。声屏障、石笼网箱、防护网PDF资料。',
  value_vi = 'Tải catalog tấm chắn ồn và lưới thép, bảng thông số kỹ thuật và chứng nhận. PDF cho tấm chắn ồn, rọ đá và lưới bảo vệ.',
  value_th = 'ดาวน์โหลดแคตตาล็อกแผงกั้นเสียงและลวดตาข่าย ตารางข้อมูลทางเทคนิค และใบรับรอง เอกสาร PDF สำหรับแผงกั้นเสียง กล่องเกเบี้ยน และตาข่ายป้องกัน'
WHERE key = 'seo.download.description_en';

UPDATE site_config SET
  value_en = 'noise barrier catalog, sound barrier PDF, technical data sheet, product brochure, download',
  value_zh = '声屏障目录, 隔音屏障PDF, 技术参数表, 产品手册, 下载',
  value_vi = 'catalog tấm chắn ồn, PDF vách cách âm, bảng thông số kỹ thuật, brochure sản phẩm, tải xuống',
  value_th = 'แคตตาล็อกแผงกั้นเสียง, PDF แผงกันเสียง, ตารางข้อมูลทางเทคนิค, โบรชัวร์ผลิตภัณฑ์, ดาวน์โหลด'
WHERE key = 'seo.download.keywords_en';
