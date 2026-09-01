-- 首页 SEO 精细化配置（声屏障定位，四语对齐）
UPDATE site_config SET
  value_en = 'Noise Barrier Manufacturer — Highway & Industrial | Angu',
  value_zh = '声屏障厂家 — 公路·工业隔音屏障 | 安固丝网',
  value_vi = 'Nhà Sản Xuất Tấm Chắn Ồn — Đường Cao Tốc & Công Nghiệp | Angu',
  value_th = 'ผู้ผลิตแผงกั้นเสียง — ทางหลวง & อุตสาหกรรม | Angu'
WHERE key = 'seo.home.title_en';

UPDATE site_config SET
  value_en = 'Factory-direct noise barriers for highways, industry, rail and bridges. ISO 9001 & CE certified, 15 years experience, shipped to 30+ countries.',
  value_zh = '工厂直供公路、工业、轨道交通、桥梁声屏障。ISO 9001与CE认证，15年制造经验，出口30+国家。',
  value_vi = 'Tấm chắn ồn trực tiếp từ nhà máy cho đường cao tốc, công nghiệp, đường sắt và cầu. Chứng nhận ISO 9001 & CE, 15 năm kinh nghiệm, xuất khẩu 30+ quốc gia.',
  value_th = 'แผงกั้นเสียงจากโรงงานโดยตรงสำหรับทางหลวง อุตสาหกรรม ระบบราง และสะพาน รับรอง ISO 9001 & CE ประสบการณ์ 15 ปี ส่งออก 30+ ประเทศ'
WHERE key = 'seo.home.description_en';

UPDATE site_config SET
  value_en = 'noise barrier, sound barrier, highway noise barrier, acoustic barrier, noise barrier manufacturer, factory direct',
  value_zh = '声屏障, 隔音屏障, 公路声屏障, 工业降噪, 声屏障厂家, 工厂直供',
  value_vi = 'tấm chắn ồn, vách cách âm, tấm chắn ồn đường cao tốc, nhà sản xuất tấm chắn ồn, nhà máy trực tiếp',
  value_th = 'แผงกั้นเสียง, แผงกันเสียง, แผงกั้นเสียงทางหลวง, ผู้ผลิตแผงกั้นเสียง, โรงงานโดยตรง'
WHERE key = 'seo.home.keywords_en';
