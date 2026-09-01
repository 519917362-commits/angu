-- 产品列表页 SEO 精细化配置（声屏障优先定位，四语对齐）
-- 修复 value_en 列 JSON 污染 + 重写 vi/th 半翻译垃圾

UPDATE site_config SET
  value_en = 'Noise Barriers & Wire Mesh Products — Factory Direct | Angu',
  value_zh = '声屏障与丝网产品 — 工厂直供 | 安固丝网',
  value_vi = 'Tấm Chắn Ồn & Sản Phẩm Lưới Thép — Nhà Máy Trực Tiếp | Angu',
  value_th = 'แผงกั้นเสียง & ผลิตภัณฑ์ลวดตาข่าย — โรงงานโดยตรง | Angu'
WHERE key = 'seo.products.title_en';

UPDATE site_config SET
  value_en = 'Factory-direct noise barriers, gabion boxes, fencing and protection nets. ISO 9001 & CE certified, 9 product lines, low MOQ.',
  value_zh = '工厂直供声屏障、石笼网箱、护栏网与防护网。ISO 9001与CE认证，9大品类，低起订量。',
  value_vi = 'Tấm chắn ồn, rọ đá, hàng rào và lưới bảo vệ trực tiếp từ nhà máy. Chứng nhận ISO 9001 & CE, 9 dòng sản phẩm, MOQ thấp.',
  value_th = 'แผงกั้นเสียง กล่องเกเบี้ยน รั้ว และตาข่ายป้องกันจากโรงงานโดยตรง รับรอง ISO 9001 & CE 9 กลุ่มผลิตภัณฑ์ MOQ ต่ำ'
WHERE key = 'seo.products.description_en';

UPDATE site_config SET
  value_en = 'noise barrier, sound barrier, gabion box, chain link fence, wire mesh manufacturer, factory direct',
  value_zh = '声屏障, 隔音屏障, 石笼网箱, 护栏网, 丝网厂家, 工厂直供',
  value_vi = 'tấm chắn ồn, vách cách âm, rọ đá, hàng rào mắt cáo, nhà sản xuất lưới thép, nhà máy trực tiếp',
  value_th = 'แผงกั้นเสียง, แผงกันเสียง, กล่องเกเบี้ยน, รั้วโซ่, ผู้ผลิตลวดตาข่าย, โรงงานโดยตรง'
WHERE key = 'seo.products.keywords_en';

UPDATE site_config SET
  value_en = 'Noise Barriers & Wire Mesh Products',
  value_zh = '声屏障与丝网产品',
  value_vi = 'Tấm Chắn Ồn & Sản Phẩm Lưới Thép',
  value_th = 'แผงกั้นเสียง & ผลิตภัณฑ์ลวดตาข่าย'
WHERE key = 'products_header_title';

UPDATE site_config SET
  value_en = 'Highway, industrial, rail & bridge noise barriers — plus gabion boxes, fencing and protection nets. ISO/CE certified, factory-direct.',
  value_zh = '公路、工业、轨交、桥梁声屏障 — 以及石笼网箱、护栏网、防护网。ISO/CE认证，工厂直供。',
  value_vi = 'Tấm chắn ồn đường cao tốc, công nghiệp, đường sắt & cầu — cùng rọ đá, hàng rào và lưới bảo vệ. Chứng nhận ISO/CE, nhà máy trực tiếp.',
  value_th = 'แผงกั้นเสียงทางหลวง อุตสาหกรรม ระบบราง & สะพาน — รวมถึงกล่องเกเบี้ยน รั้ว และตาข่ายป้องกัน รับรอง ISO/CE โรงงานโดยตรง'
WHERE key = 'products_header_subtitle';

UPDATE site_config SET
  value_en = 'Angu Wire Mesh is a professional noise barrier manufacturer in Anping, China. Our product range spans 9 lines: highway, industrial, rail and bridge noise barriers, gabion boxes, chain link fence, welded wire mesh, and protection nets. ISO 9001:2015 and CE certified, factory-direct.',
  value_zh = '安固丝网是位于中国安平的专业声屏障制造商，产品覆盖9大品类：公路、工业、轨交、桥梁声屏障，以及石笼网箱、勾花网围栏、电焊网、防护网等。ISO 9001:2015与CE认证，工厂直供。',
  value_vi = 'Angu Wire Mesh là nhà sản xuất tấm chắn ồn chuyên nghiệp tại Anping, Trung Quốc. Sản phẩm trải rộng 9 dòng: tấm chắn ồn đường cao tốc, công nghiệp, đường sắt và cầu, cùng rọ đá, hàng rào mắt cáo, lưới thép hàn và lưới bảo vệ. Chứng nhận ISO 9001:2015 và CE, trực tiếp từ nhà máy.',
  value_th = 'Angu Wire Mesh เป็นผู้ผลิตแผงกั้นเสียงมืออาชีพในอันผิง ประเทศจีน สินค้าครอบคลุม 9 กลุ่ม: แผงกั้นเสียงทางหลวง อุตสาหกรรม ระบบราง และสะพาน รวมถึงกล่องเกเบี้ยน รั้วโซ่ ตาข่ายลวดเชื่อม และตาข่ายป้องกัน ได้รับการรับรอง ISO 9001:2015 และ CE จากโรงงานโดยตรง'
WHERE key = 'products_seo_intro';
