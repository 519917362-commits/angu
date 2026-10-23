-- 联系页 SEO 精细化配置（声屏障优先定位，四语对齐）
-- 修复 value_en 列 JSON 污染 + 重写 vi/th 半翻译垃圾

UPDATE site_config SET
  value_en = 'Contact Us — Free Noise Barrier Quote | Angu',
  value_zh = '联系我们 — 免费声屏障报价 | 安固丝网',
  value_vi = 'Liên Hệ — Nhận Báo Giá Tấm Chắn Ồn Miễn Phí | Angu',
  value_th = 'ติดต่อเรา — ขอใบเสนอราคาแผงกั้นเสียงฟรี | Angu'
WHERE key = 'seo.contact.title_en';

UPDATE site_config SET
  value_en = 'Get a factory-direct quote for noise barriers, gabion boxes and wire mesh. ISO 9001 & CE certified. Response within 24 hours.',
  value_zh = '工厂直供声屏障、石笼网箱与丝网报价。ISO 9001与CE认证，24小时内回复。',
  value_vi = 'Nhận báo giá trực tiếp từ nhà máy cho tấm chắn ồn, rọ đá và lưới thép. Chứng nhận ISO 9001 & CE. Phản hồi trong 24 giờ.',
  value_th = 'ขอใบเสนอราคาโรงงานโดยตรงสำหรับแผงกั้นเสียง กล่องเกเบี้ยน และลวดตาข่าย รับรอง ISO 9001 & CE ตอบกลับภายใน 24 ชั่วโมง'
WHERE key = 'seo.contact.description_en';

UPDATE site_config SET
  value_en = 'noise barrier quote, sound barrier price, contact noise barrier manufacturer, wire mesh quote, factory direct price',
  value_zh = '声屏障报价, 隔音屏障价格, 联系声屏障厂家, 丝网报价, 工厂直供价格',
  value_vi = 'báo giá tấm chắn ồn, giá vách cách âm, liên hệ nhà sản xuất tấm chắn ồn, báo giá lưới thép, giá nhà máy trực tiếp',
  value_th = 'ใบเสนอราคาแผงกั้นเสียง, ราคาแผงกันเสียง, ติดต่อผู้ผลิตแผงกั้นเสียง, ใบเสนอราคาลวดตาข่าย, ราคาโรงงานโดยตรง'
WHERE key = 'seo.contact.keywords_en';

UPDATE site_config SET
  value_en = 'Contact Us',
  value_zh = '联系我们',
  value_vi = 'Liên Hệ Với Chúng Tôi',
  value_th = 'ติดต่อเรา'
WHERE key = 'contact_header_title';

UPDATE site_config SET
  value_en = 'Get a free noise barrier quote, request samples, or ask any questions. We respond within 24 hours.',
  value_zh = '免费获取声屏障报价、申请样品或咨询任何问题。24小时内回复。',
  value_vi = 'Nhận báo giá tấm chắn ồn miễn phí, yêu cầu mẫu hoặc đặt câu hỏi. Chúng tôi phản hồi trong 24 giờ.',
  value_th = 'ขอใบเสนอราคาแผงกั้นเสียงฟรี ขอตัวอย่าง หรือสอบถามข้อมูล เราตอบกลับภายใน 24 ชั่วโมง'
WHERE key = 'contact_header_subtitle';

UPDATE site_config SET
  value_en = 'Angu Wire Mesh is a professional noise barrier manufacturer based in Anping — China Wire Mesh Capital. Our product range covers highway, industrial, rail and bridge noise barriers, plus gabion boxes, chain link fence, welded wire mesh, and protection nets. ISO 9001 & CE certified, exported to 30+ countries, factory-direct pricing.',
  value_zh = '安固丝网是位于中国丝网之都安平的专业声屏障制造商，产品涵盖公路、工业、轨交、桥梁声屏障，以及石笼网箱、勾花网围栏、电焊网、防护网等。ISO 9001与CE认证，出口30+国家，工厂直供。',
  value_vi = 'Angu Wire Mesh là nhà sản xuất tấm chắn ồn chuyên nghiệp tại Anping — Thủ đô lưới thép Trung Quốc. Sản phẩm bao gồm tấm chắn ồn đường cao tốc, công nghiệp, đường sắt và cầu, cùng rọ đá, hàng rào mắt cáo, lưới thép hàn và lưới bảo vệ. Chứng nhận ISO 9001 & CE, xuất khẩu 30+ quốc gia, giá trực tiếp từ nhà máy.',
  value_th = 'Angu Wire Mesh เป็นผู้ผลิตแผงกั้นเสียงมืออาชีพในอันผิง — เมืองหลวงลวดตาข่ายของจีน สินค้าครอบคลุมแผงกั้นเสียงทางหลวง อุตสาหกรรม ระบบราง และสะพาน รวมถึงกล่องเกเบี้ยน รั้วโซ่ ตาข่ายลวดเชื่อม และตาข่ายป้องกัน ได้รับการรับรอง ISO 9001 & CE ส่งออก 30+ ประเทศ ราคาโรงงานโดยตรง'
WHERE key = 'contact_seo_intro';
