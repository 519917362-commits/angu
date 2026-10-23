-- 博客页 SEO 精细化配置（声屏障优先定位，四语对齐）
-- 修复 value_en 列 JSON 污染 + 重写 vi/th 半翻译垃圾

UPDATE site_config SET
  value_en = 'Noise Barrier & Wire Mesh Blog — Guides, Cases & News | Angu',
  value_zh = '声屏障与丝网行业博客 — 指南、案例与新闻 | 安固丝网',
  value_vi = 'Blog Tấm Chắn Ồn & Lưới Thép — Hướng Dẫn, Dự Án & Tin Tức | Angu',
  value_th = 'บล็อกแผงกั้นเสียง & ลวดตาข่าย — คู่มือ โครงการ & ข่าวสาร | Angu'
WHERE key = 'seo.blog.title_en';

UPDATE site_config SET
  value_en = 'Expert guides on noise barrier design, acoustic standards and wire mesh selection. Engineering insights for contractors and buyers.',
  value_zh = '声屏障设计、声学标准与丝网选型的专业指南。面向工程承包商与采购的行业洞察。',
  value_vi = 'Hướng dẫn chuyên sâu về thiết kế tấm chắn ồn, tiêu chuẩn âm học và lựa chọn lưới thép. Kiến thức kỹ thuật dành cho nhà thầu và người mua hàng.',
  value_th = 'คู่มือผู้เชี่ยวชาญด้านการออกแบบแผงกั้นเสียง มาตรฐานเสียง และการเลือกใช้ลวดตาข่าย ข้อมูลทางเทคนิคสำหรับผู้รับเหมาและผู้จัดซื้อ'
WHERE key = 'seo.blog.description_en';

UPDATE site_config SET
  value_en = 'noise barrier design, acoustic standards, sound barrier guide, wire mesh blog, gabion guide, procurement guide',
  value_zh = '声屏障设计, 声学标准, 隔音屏障指南, 丝网博客, 石笼网指南, 采购指南',
  value_vi = 'thiết kế tấm chắn ồn, tiêu chuẩn âm học, hướng dẫn vách cách âm, blog lưới thép, hướng dẫn rọ đá, hướng dẫn mua hàng',
  value_th = 'การออกแบบแผงกั้นเสียง, มาตรฐานเสียง, คู่มือแผงกันเสียง, บล็อกลวดตาข่าย, คู่มือเกเบี้ยน, คู่มือจัดซื้อ'
WHERE key = 'seo.blog.keywords_en';

UPDATE site_config SET
  value_en = 'Noise Barrier & Wire Mesh Blog',
  value_zh = '声屏障与丝网行业博客',
  value_vi = 'Blog Tấm Chắn Ồn & Lưới Thép',
  value_th = 'บล็อกแผงกั้นเสียง & ลวดตาข่าย'
WHERE key = 'blog_header_title';

UPDATE site_config SET
  value_en = 'Guides, case studies, and industry insights on noise barriers, gabion, fencing, and protection nets.',
  value_zh = '声屏障、石笼网、护栏网与防护网的行业指南、案例与洞察。',
  value_vi = 'Hướng dẫn, nghiên cứu điển hình và thông tin ngành về tấm chắn ồn, rọ đá, hàng rào và lưới bảo vệ.',
  value_th = 'คู่มือ กรณีศึกษา และข้อมูลเชิงลึกในอุตสาหกรรมเกี่ยวกับแผงกั้นเสียง เกเบี้ยน รั้ว และตาข่ายป้องกัน'
WHERE key = 'blog_header_subtitle';

UPDATE site_config SET
  value_en = 'The Angu Wire Mesh blog covers noise barrier design and acoustic standards, gabion retaining walls, rockfall protection design, chain link fence selection, and procurement guides for international buyers.',
  value_zh = '安固丝网博客涵盖声屏障设计与声学标准、石笼挡土墙、边坡防护设计、勾花网围栏选型，以及国际买家采购指南。',
  value_vi = 'Blog của Angu Wire Mesh bao gồm thiết kế tấm chắn ồn và tiêu chuẩn âm học, tường chắn rọ đá, thiết kế chống đá rơi, lựa chọn hàng rào mắt cáo và hướng dẫn mua hàng cho khách quốc tế.',
  value_th = 'บล็อกของ Angu Wire Mesh ครอบคลุมการออกแบบแผงกั้นเสียงและมาตรฐานเสียง กำแพงกันดินเกเบี้ยน การออกแบบป้องกันหินร่วง การเลือกรั้วโซ่ และคู่มือจัดซื้อสำหรับผู้ซื้อต่างประเทศ'
WHERE key = 'blog_seo_intro';
