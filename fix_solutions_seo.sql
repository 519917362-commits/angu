-- 方案页 SEO 精细化配置（声屏障优先定位，四语对齐）
-- 修复 value_en 列 JSON 污染 + 重写 vi/th 半翻译垃圾

UPDATE site_config SET
  value_en = 'Noise Barrier & Wire Mesh Solutions by Industry | Angu',
  value_zh = '声屏障与丝网工程解决方案 | 安固丝网',
  value_vi = 'Giải Pháp Tấm Chắn Ồn & Lưới Thép Theo Ngành | Angu',
  value_th = 'โซลูชันแผงกั้นเสียง & ลวดตาข่ายตามอุตสาหกรรม | Angu'
WHERE key = 'seo.solutions.title_en';

UPDATE site_config SET
  value_en = 'Industry-specific noise barrier and wire mesh solutions for highway, railway, industrial, and bridge projects. ISO 9001 & CE certified, 15 years experience.',
  value_zh = '面向公路、铁路、工业、桥梁项目的声屏障与丝网定制方案。ISO 9001与CE认证，15年经验。',
  value_vi = 'Giải pháp tấm chắn ồn và lưới thép theo ngành cho dự án đường cao tốc, đường sắt, công nghiệp và cầu. Chứng nhận ISO 9001 & CE, 15 năm kinh nghiệm.',
  value_th = 'โซลูชันแผงกั้นเสียงและลวดตาข่ายเฉพาะอุตสาหกรรมสำหรับโครงการทางหลวง ระบบราง อุตสาหกรรม และสะพาน รับรอง ISO 9001 & CE ประสบการณ์ 15 ปี'
WHERE key = 'seo.solutions.description_en';

UPDATE site_config SET
  value_en = 'noise barrier solution, highway noise barrier, acoustic barrier, wire mesh solution, industrial soundproofing, factory direct',
  value_zh = '声屏障方案, 公路声屏障, 隔音屏障, 丝网方案, 工业降噪, 工厂直供',
  value_vi = 'giải pháp tấm chắn ồn, tấm chắn ồn đường cao tốc, vách cách âm, giải pháp lưới thép, cách âm công nghiệp, nhà máy trực tiếp',
  value_th = 'โซลูชันแผงกั้นเสียง, แผงกั้นเสียงทางหลวง, แผงกันเสียง, โซลูชันลวดตาข่าย, กันเสียงอุตสาหกรรม, โรงงานโดยตรง'
WHERE key = 'seo.solutions.keywords_en';

UPDATE site_config SET
  value_en = 'Engineering Solutions',
  value_zh = '工程解决方案',
  value_vi = 'Giải Pháp Ngành',
  value_th = 'โซลูชันอุตสาหกรรม'
WHERE key = 'solutions_header_title';

UPDATE site_config SET
  value_en = 'Noise barriers and wire mesh solutions for highway, railway, industrial, bridge, and construction projects.',
  value_zh = '面向公路、铁路、工业、桥梁与建筑工程的声屏障及丝网解决方案。',
  value_vi = 'Tấm chắn ồn và giải pháp lưới thép cho dự án đường cao tốc, đường sắt, công nghiệp, cầu và xây dựng.',
  value_th = 'แผงกั้นเสียงและโซลูชันลวดตาข่ายสำหรับโครงการทางหลวง ระบบราง อุตสาหกรรม สะพาน และก่อสร้าง'
WHERE key = 'solutions_header_subtitle';

UPDATE site_config SET
  value_en = 'Angu Wire Mesh designs and supplies custom noise barrier and wire mesh solutions for highway, railway, industrial, bridge, mining, and construction projects. Acoustic barriers, gabion retaining walls, rockfall barriers and fencing — engineered to EN, ASTM, and JT standards, ISO 9001 & CE certified.',
  value_zh = '安固丝网设计和供应面向公路、铁路、工业、桥梁、矿山与建筑工程的声屏障及丝网定制方案。隔音屏障、石笼挡土墙、边坡防护屏障、护栏网 — 按EN、ASTM和JT标准设计，ISO 9001与CE认证。',
  value_vi = 'Angu Wire Mesh thiết kế và cung cấp giải pháp tấm chắn ồn và lưới thép theo yêu cầu cho dự án đường cao tốc, đường sắt, công nghiệp, cầu, khai thác mỏ và xây dựng. Vách cách âm, tường chắn rọ đá, lưới chống đá rơi và hàng rào — thiết kế theo tiêu chuẩn EN, ASTM và JT, chứng nhận ISO 9001 & CE.',
  value_th = 'Angu Wire Mesh ออกแบบและจัดหาโซลูชันแผงกั้นเสียงและลวดตาข่ายตามสั่งสำหรับโครงการทางหลวง ระบบราง อุตสาหกรรม สะพาน เหมืองแร่ และก่อสร้าง แผงกันเสียง กำแพงกันดินเกเบี้ยน ตาข่ายกันหินร่วง และรั้ว — ออกแบบตามมาตรฐาน EN ASTM และ JT รับรอง ISO 9001 & CE'
WHERE key = 'solutions_seo_intro';
