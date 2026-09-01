-- 服务页 SEO 精细化配置（声屏障优先定位，四语对齐）
-- 修复 value_en 列 JSON 污染 + 重写 vi/th 半翻译垃圾

UPDATE site_config SET
  value_en = 'Noise Barrier OEM & Export Services — Custom Manufacturing | Angu',
  value_zh = '声屏障定制与出口服务 — OEM代工 | 安固丝网',
  value_vi = 'Dịch Vụ OEM & Xuất Khẩu Tấm Chắn Ồn — Sản Xuất Theo Yêu Cầu | Angu',
  value_th = 'บริการ OEM & ส่งออกแผงกั้นเสียง — ผลิตตามสั่ง | Angu'
WHERE key = 'seo.service.title_en';

UPDATE site_config SET
  value_en = 'Custom noise barrier manufacturing, OEM/ODM, quality inspection and export logistics. ISO 9001 certified, factory-direct from Anping, China.',
  value_zh = '声屏障定制生产、OEM/ODM代工、质量检测与出口物流。ISO 9001认证，中国安平工厂直供。',
  value_vi = 'Sản xuất tấm chắn ồn theo yêu cầu, OEM/ODM, kiểm tra chất lượng và logistics xuất khẩu. Chứng nhận ISO 9001, trực tiếp từ nhà máy Anping, Trung Quốc.',
  value_th = 'ผลิตแผงกั้นเสียงตามสั่ง บริการ OEM/ODM ตรวจสอบคุณภาพ และโลจิสติกส์ส่งออก รับรอง ISO 9001 จากโรงงานอันผิง จีนโดยตรง'
WHERE key = 'seo.service.description_en';

UPDATE site_config SET
  value_en = 'noise barrier OEM, custom noise barrier, acoustic barrier manufacturing, export service, factory direct',
  value_zh = '声屏障定制, 声屏障OEM, 隔音屏障生产, 出口服务, 工厂直供',
  value_vi = 'OEM tấm chắn ồn, tấm chắn ồn theo yêu cầu, sản xuất vách cách âm, dịch vụ xuất khẩu, nhà máy trực tiếp',
  value_th = 'OEM แผงกั้นเสียง, แผงกั้นเสียงตามสั่ง, ผลิตแผงกันเสียง, บริการส่งออก, โรงงานโดยตรง'
WHERE key = 'seo.service.keywords_en';

UPDATE site_config SET
  value_en = 'Our Services',
  value_zh = '我们的服务',
  value_vi = 'Dịch Vụ Của Chúng Tôi',
  value_th = 'บริการของเรา'
WHERE key = 'service_header_title';

UPDATE site_config SET
  value_en = 'Noise barrier custom manufacturing, OEM, quality inspection and one-stop export service.',
  value_zh = '声屏障定制生产、OEM代工、质量检测与一站式出口服务。',
  value_vi = 'Sản xuất tấm chắn ồn theo yêu cầu, OEM, kiểm tra chất lượng và dịch vụ xuất khẩu trọn gói.',
  value_th = 'ผลิตแผงกั้นเสียงตามสั่ง OEM ตรวจสอบคุณภาพ และบริการส่งออกครบวงจร'
WHERE key = 'service_header_subtitle';

UPDATE site_config SET
  value_en = 'Angu Wire Mesh provides full-cycle, one-stop export services for noise barriers and wire mesh products — from inquiry to delivery. 15 years of export expertise, 500+ engineering projects across 30+ countries. Custom production, OEM, export logistics, documentation, third-party inspection, and 24/7 support.',
  value_zh = '安固丝网为声屏障及丝网产品提供从询盘到交货的全流程一站式出口服务。15年外贸经验，累计服务30+国家超过500个工程项目。定制生产、OEM代工、出口物流、全套单证、第三方验货以及7×24小时客服支持。',
  value_vi = 'Angu Wire Mesh cung cấp dịch vụ xuất khẩu trọn gói cho tấm chắn ồn và sản phẩm lưới thép — từ yêu cầu báo giá đến giao hàng. 15 năm kinh nghiệm xuất khẩu, 500+ dự án kỹ thuật tại hơn 30 quốc gia. Sản xuất theo yêu cầu, OEM, logistics xuất khẩu, chứng từ, kiểm tra bên thứ ba và hỗ trợ 24/7.',
  value_th = 'Angu Wire Mesh ให้บริการส่งออกครบวงจรสำหรับแผงกั้นเสียงและผลิตภัณฑ์ลวดตาข่าย — ตั้งแต่สอบถามจนถึงส่งมอบ ประสบการณ์ส่งออก 15 ปี 500+ โครงการวิศวกรรมในกว่า 30 ประเทศ ผลิตตามสั่ง OEM โลจิสติกส์ส่งออก เอกสาร ตรวจสอบโดยบุคคลที่สาม และบริการสนับสนุน 24/7'
WHERE key = 'service_seo_intro';
