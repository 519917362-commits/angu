-- 企业事实一致性迁移（2026-10-23）
-- 依据：统一社会信用代码 91131125308273603F / 成立日期 2014-08-15
-- 目标：官网(site_config) 与代码、llms.txt 口径统一；可重复执行（幂等）
BEGIN;

-- 1) 文本类：全语言列统一替换
UPDATE site_config SET value_en = REPLACE(value_en, 'Hebei Angu Wire Mesh Products Co., Ltd.', 'Anping County Angu Metal Wire Mesh Products Co., Ltd.'), value_zh = REPLACE(value_zh, 'Hebei Angu Wire Mesh Products Co., Ltd.', 'Anping County Angu Metal Wire Mesh Products Co., Ltd.'), value_vi = REPLACE(value_vi, 'Hebei Angu Wire Mesh Products Co., Ltd.', 'Anping County Angu Metal Wire Mesh Products Co., Ltd.'), value_th = REPLACE(value_th, 'Hebei Angu Wire Mesh Products Co., Ltd.', 'Anping County Angu Metal Wire Mesh Products Co., Ltd.') WHERE value_en LIKE '%Hebei Angu Wire Mesh Products Co., Ltd.%' OR value_zh LIKE '%Hebei Angu Wire Mesh Products Co., Ltd.%' OR value_vi LIKE '%Hebei Angu Wire Mesh Products Co., Ltd.%' OR value_th LIKE '%Hebei Angu Wire Mesh Products Co., Ltd.%';
UPDATE site_config SET value_en = REPLACE(value_en, '河北安固丝网制品有限公司', '安平县安固金属丝网制品有限公司'), value_zh = REPLACE(value_zh, '河北安固丝网制品有限公司', '安平县安固金属丝网制品有限公司'), value_vi = REPLACE(value_vi, '河北安固丝网制品有限公司', '安平县安固金属丝网制品有限公司'), value_th = REPLACE(value_th, '河北安固丝网制品有限公司', '安平县安固金属丝网制品有限公司') WHERE value_en LIKE '%河北安固丝网制品有限公司%' OR value_zh LIKE '%河北安固丝网制品有限公司%' OR value_vi LIKE '%河北安固丝网制品有限公司%' OR value_th LIKE '%河北安固丝网制品有限公司%';
UPDATE site_config SET value_en = REPLACE(value_en, 'Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu', 'Công ty TNHH Sản Phẩm Lưới Thép Kim Loại Angu (huyện An Bình)'), value_zh = REPLACE(value_zh, 'Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu', 'Công ty TNHH Sản Phẩm Lưới Thép Kim Loại Angu (huyện An Bình)'), value_vi = REPLACE(value_vi, 'Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu', 'Công ty TNHH Sản Phẩm Lưới Thép Kim Loại Angu (huyện An Bình)'), value_th = REPLACE(value_th, 'Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu', 'Công ty TNHH Sản Phẩm Lưới Thép Kim Loại Angu (huyện An Bình)') WHERE value_en LIKE '%Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu%' OR value_zh LIKE '%Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu%' OR value_vi LIKE '%Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu%' OR value_th LIKE '%Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu%';
UPDATE site_config SET value_en = REPLACE(value_en, '15+ years experience', 'manufacturing since 2014'), value_zh = REPLACE(value_zh, '15+ years experience', 'manufacturing since 2014'), value_vi = REPLACE(value_vi, '15+ years experience', 'manufacturing since 2014'), value_th = REPLACE(value_th, '15+ years experience', 'manufacturing since 2014') WHERE value_en LIKE '%15+ years experience%' OR value_zh LIKE '%15+ years experience%' OR value_vi LIKE '%15+ years experience%' OR value_th LIKE '%15+ years experience%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 years experience', 'manufacturing since 2014'), value_zh = REPLACE(value_zh, '15 years experience', 'manufacturing since 2014'), value_vi = REPLACE(value_vi, '15 years experience', 'manufacturing since 2014'), value_th = REPLACE(value_th, '15 years experience', 'manufacturing since 2014') WHERE value_en LIKE '%15 years experience%' OR value_zh LIKE '%15 years experience%' OR value_vi LIKE '%15 years experience%' OR value_th LIKE '%15 years experience%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 years of export expertise', 'export expertise since 2014'), value_zh = REPLACE(value_zh, '15 years of export expertise', 'export expertise since 2014'), value_vi = REPLACE(value_vi, '15 years of export expertise', 'export expertise since 2014'), value_th = REPLACE(value_th, '15 years of export expertise', 'export expertise since 2014') WHERE value_en LIKE '%15 years of export expertise%' OR value_zh LIKE '%15 years of export expertise%' OR value_vi LIKE '%15 years of export expertise%' OR value_th LIKE '%15 years of export expertise%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 years of wire mesh manufacturing', 'wire mesh manufacturing since 2014'), value_zh = REPLACE(value_zh, '15 years of wire mesh manufacturing', 'wire mesh manufacturing since 2014'), value_vi = REPLACE(value_vi, '15 years of wire mesh manufacturing', 'wire mesh manufacturing since 2014'), value_th = REPLACE(value_th, '15 years of wire mesh manufacturing', 'wire mesh manufacturing since 2014') WHERE value_en LIKE '%15 years of wire mesh manufacturing%' OR value_zh LIKE '%15 years of wire mesh manufacturing%' OR value_vi LIKE '%15 years of wire mesh manufacturing%' OR value_th LIKE '%15 years of wire mesh manufacturing%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 Years of Noise Barrier Manufacturing', 'Noise Barrier Manufacturing Since 2014'), value_zh = REPLACE(value_zh, '15 Years of Noise Barrier Manufacturing', 'Noise Barrier Manufacturing Since 2014'), value_vi = REPLACE(value_vi, '15 Years of Noise Barrier Manufacturing', 'Noise Barrier Manufacturing Since 2014'), value_th = REPLACE(value_th, '15 Years of Noise Barrier Manufacturing', 'Noise Barrier Manufacturing Since 2014') WHERE value_en LIKE '%15 Years of Noise Barrier Manufacturing%' OR value_zh LIKE '%15 Years of Noise Barrier Manufacturing%' OR value_vi LIKE '%15 Years of Noise Barrier Manufacturing%' OR value_th LIKE '%15 Years of Noise Barrier Manufacturing%';
UPDATE site_config SET value_en = REPLACE(value_en, '15+年经验', '12+年经验'), value_zh = REPLACE(value_zh, '15+年经验', '12+年经验'), value_vi = REPLACE(value_vi, '15+年经验', '12+年经验'), value_th = REPLACE(value_th, '15+年经验', '12+年经验') WHERE value_en LIKE '%15+年经验%' OR value_zh LIKE '%15+年经验%' OR value_vi LIKE '%15+年经验%' OR value_th LIKE '%15+年经验%';
UPDATE site_config SET value_en = REPLACE(value_en, '15年丝网制造经验', '12年丝网制造经验'), value_zh = REPLACE(value_zh, '15年丝网制造经验', '12年丝网制造经验'), value_vi = REPLACE(value_vi, '15年丝网制造经验', '12年丝网制造经验'), value_th = REPLACE(value_th, '15年丝网制造经验', '12年丝网制造经验') WHERE value_en LIKE '%15年丝网制造经验%' OR value_zh LIKE '%15年丝网制造经验%' OR value_vi LIKE '%15年丝网制造经验%' OR value_th LIKE '%15年丝网制造经验%';
UPDATE site_config SET value_en = REPLACE(value_en, '15年专注声屏障制造', '12年专注声屏障制造'), value_zh = REPLACE(value_zh, '15年专注声屏障制造', '12年专注声屏障制造'), value_vi = REPLACE(value_vi, '15年专注声屏障制造', '12年专注声屏障制造'), value_th = REPLACE(value_th, '15年专注声屏障制造', '12年专注声屏障制造') WHERE value_en LIKE '%15年专注声屏障制造%' OR value_zh LIKE '%15年专注声屏障制造%' OR value_vi LIKE '%15年专注声屏障制造%' OR value_th LIKE '%15年专注声屏障制造%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 tahun', '12 tahun'), value_zh = REPLACE(value_zh, '15 tahun', '12 tahun'), value_vi = REPLACE(value_vi, '15 tahun', '12 tahun'), value_th = REPLACE(value_th, '15 tahun', '12 tahun') WHERE value_en LIKE '%15 tahun%' OR value_zh LIKE '%15 tahun%' OR value_vi LIKE '%15 tahun%' OR value_th LIKE '%15 tahun%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 Năm Sản Xuất Tấm Chắn Ồn', 'Sản Xuất Tấm Chắn Ồn Từ Năm 2014'), value_zh = REPLACE(value_zh, '15 Năm Sản Xuất Tấm Chắn Ồn', 'Sản Xuất Tấm Chắn Ồn Từ Năm 2014'), value_vi = REPLACE(value_vi, '15 Năm Sản Xuất Tấm Chắn Ồn', 'Sản Xuất Tấm Chắn Ồn Từ Năm 2014'), value_th = REPLACE(value_th, '15 Năm Sản Xuất Tấm Chắn Ồn', 'Sản Xuất Tấm Chắn Ồn Từ Năm 2014') WHERE value_en LIKE '%15 Năm Sản Xuất Tấm Chắn Ồn%' OR value_zh LIKE '%15 Năm Sản Xuất Tấm Chắn Ồn%' OR value_vi LIKE '%15 Năm Sản Xuất Tấm Chắn Ồn%' OR value_th LIKE '%15 Năm Sản Xuất Tấm Chắn Ồn%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 năm kinh nghiệm', '12 năm kinh nghiệm'), value_zh = REPLACE(value_zh, '15 năm kinh nghiệm', '12 năm kinh nghiệm'), value_vi = REPLACE(value_vi, '15 năm kinh nghiệm', '12 năm kinh nghiệm'), value_th = REPLACE(value_th, '15 năm kinh nghiệm', '12 năm kinh nghiệm') WHERE value_en LIKE '%15 năm kinh nghiệm%' OR value_zh LIKE '%15 năm kinh nghiệm%' OR value_vi LIKE '%15 năm kinh nghiệm%' OR value_th LIKE '%15 năm kinh nghiệm%';
UPDATE site_config SET value_en = REPLACE(value_en, 'ประสบการณ์การผลิตลวดตาข่าย 15 ปี', 'ประสบการณ์การผลิตลวดตาข่าย 12 ปี'), value_zh = REPLACE(value_zh, 'ประสบการณ์การผลิตลวดตาข่าย 15 ปี', 'ประสบการณ์การผลิตลวดตาข่าย 12 ปี'), value_vi = REPLACE(value_vi, 'ประสบการณ์การผลิตลวดตาข่าย 15 ปี', 'ประสบการณ์การผลิตลวดตาข่าย 12 ปี'), value_th = REPLACE(value_th, 'ประสบการณ์การผลิตลวดตาข่าย 15 ปี', 'ประสบการณ์การผลิตลวดตาข่าย 12 ปี') WHERE value_en LIKE '%ประสบการณ์การผลิตลวดตาข่าย 15 ปี%' OR value_zh LIKE '%ประสบการณ์การผลิตลวดตาข่าย 15 ปี%' OR value_vi LIKE '%ประสบการณ์การผลิตลวดตาข่าย 15 ปี%' OR value_th LIKE '%ประสบการณ์การผลิตลวดตาข่าย 15 ปี%';
UPDATE site_config SET value_en = REPLACE(value_en, '15 ปีแห่งการผลิตแผงกั้นเสียง', 'การผลิตแผงกั้นเสียงตั้งแต่ปี 2014'), value_zh = REPLACE(value_zh, '15 ปีแห่งการผลิตแผงกั้นเสียง', 'การผลิตแผงกั้นเสียงตั้งแต่ปี 2014'), value_vi = REPLACE(value_vi, '15 ปีแห่งการผลิตแผงกั้นเสียง', 'การผลิตแผงกั้นเสียงตั้งแต่ปี 2014'), value_th = REPLACE(value_th, '15 ปีแห่งการผลิตแผงกั้นเสียง', 'การผลิตแผงกั้นเสียงตั้งแต่ปี 2014') WHERE value_en LIKE '%15 ปีแห่งการผลิตแผงกั้นเสียง%' OR value_zh LIKE '%15 ปีแห่งการผลิตแผงกั้นเสียง%' OR value_vi LIKE '%15 ปีแห่งการผลิตแผงกั้นเสียง%' OR value_th LIKE '%15 ปีแห่งการผลิตแผงกั้นเสียง%';
UPDATE site_config SET value_en = REPLACE(value_en, 'ประสบการณ์ 15 ปี', 'ประสบการณ์ 12 ปี'), value_zh = REPLACE(value_zh, 'ประสบการณ์ 15 ปี', 'ประสบการณ์ 12 ปี'), value_vi = REPLACE(value_vi, 'ประสบการณ์ 15 ปี', 'ประสบการณ์ 12 ปี'), value_th = REPLACE(value_th, 'ประสบการณ์ 15 ปี', 'ประสบการณ์ 12 ปี') WHERE value_en LIKE '%ประสบการณ์ 15 ปี%' OR value_zh LIKE '%ประสบการณ์ 15 ปี%' OR value_vi LIKE '%ประสบการณ์ 15 ปี%' OR value_th LIKE '%ประสบการณ์ 15 ปี%';
UPDATE site_config SET value_en = REPLACE(value_en, '15+ ปี', '12+ ปี'), value_zh = REPLACE(value_zh, '15+ ปี', '12+ ปี'), value_vi = REPLACE(value_vi, '15+ ปี', '12+ ปี'), value_th = REPLACE(value_th, '15+ ปี', '12+ ปี') WHERE value_en LIKE '%15+ ปี%' OR value_zh LIKE '%15+ ปี%' OR value_vi LIKE '%15+ ปี%' OR value_th LIKE '%15+ ปี%';
UPDATE site_config SET value_en = REPLACE(value_en, '500+ engineering projects', 'engineering projects'), value_zh = REPLACE(value_zh, '500+ engineering projects', 'engineering projects'), value_vi = REPLACE(value_vi, '500+ engineering projects', 'engineering projects'), value_th = REPLACE(value_th, '500+ engineering projects', 'engineering projects') WHERE value_en LIKE '%500+ engineering projects%' OR value_zh LIKE '%500+ engineering projects%' OR value_vi LIKE '%500+ engineering projects%' OR value_th LIKE '%500+ engineering projects%';
UPDATE site_config SET value_en = REPLACE(value_en, '500+ dự án kỹ thuật', 'các dự án kỹ thuật'), value_zh = REPLACE(value_zh, '500+ dự án kỹ thuật', 'các dự án kỹ thuật'), value_vi = REPLACE(value_vi, '500+ dự án kỹ thuật', 'các dự án kỹ thuật'), value_th = REPLACE(value_th, '500+ dự án kỹ thuật', 'các dự án kỹ thuật') WHERE value_en LIKE '%500+ dự án kỹ thuật%' OR value_zh LIKE '%500+ dự án kỹ thuật%' OR value_vi LIKE '%500+ dự án kỹ thuật%' OR value_th LIKE '%500+ dự án kỹ thuật%';
UPDATE site_config SET value_en = REPLACE(value_en, '500+ โครงการวิศวกรรม', 'โครงการวิศวกรรม'), value_zh = REPLACE(value_zh, '500+ โครงการวิศวกรรม', 'โครงการวิศวกรรม'), value_vi = REPLACE(value_vi, '500+ โครงการวิศวกรรม', 'โครงการวิศวกรรม'), value_th = REPLACE(value_th, '500+ โครงการวิศวกรรม', 'โครงการวิศวกรรม') WHERE value_en LIKE '%500+ โครงการวิศวกรรม%' OR value_zh LIKE '%500+ โครงการวิศวกรรม%' OR value_vi LIKE '%500+ โครงการวิศวกรรม%' OR value_th LIKE '%500+ โครงการวิศวกรรม%';
UPDATE site_config SET value_en = REPLACE(value_en, '500个工程项目', '工程项目'), value_zh = REPLACE(value_zh, '500个工程项目', '工程项目'), value_vi = REPLACE(value_vi, '500个工程项目', '工程项目'), value_th = REPLACE(value_th, '500个工程项目', '工程项目') WHERE value_en LIKE '%500个工程项目%' OR value_zh LIKE '%500个工程项目%' OR value_vi LIKE '%500个工程项目%' OR value_th LIKE '%500个工程项目%';
UPDATE site_config SET value_en = REPLACE(value_en, '15,000㎡', '10,000㎡'), value_zh = REPLACE(value_zh, '15,000㎡', '10,000㎡'), value_vi = REPLACE(value_vi, '15,000㎡', '10,000㎡'), value_th = REPLACE(value_th, '15,000㎡', '10,000㎡') WHERE value_en LIKE '%15,000㎡%' OR value_zh LIKE '%15,000㎡%' OR value_vi LIKE '%15,000㎡%' OR value_th LIKE '%15,000㎡%';
UPDATE site_config SET value_en = REPLACE(value_en, '15,000m²', '10,000m²'), value_zh = REPLACE(value_zh, '15,000m²', '10,000m²'), value_vi = REPLACE(value_vi, '15,000m²', '10,000m²'), value_th = REPLACE(value_th, '15,000m²', '10,000m²') WHERE value_en LIKE '%15,000m²%' OR value_zh LIKE '%15,000m²%' OR value_vi LIKE '%15,000m²%' OR value_th LIKE '%15,000m²%';
UPDATE site_config SET value_en = REPLACE(value_en, '15.000m²', '10.000m²'), value_zh = REPLACE(value_zh, '15.000m²', '10.000m²'), value_vi = REPLACE(value_vi, '15.000m²', '10.000m²'), value_th = REPLACE(value_th, '15.000m²', '10.000m²') WHERE value_en LIKE '%15.000m²%' OR value_zh LIKE '%15.000m²%' OR value_vi LIKE '%15.000m²%' OR value_th LIKE '%15.000m²%';
UPDATE site_config SET value_en = REPLACE(value_en, '15,000 ตร.ม.', '10,000 ตร.ม.'), value_zh = REPLACE(value_zh, '15,000 ตร.ม.', '10,000 ตร.ม.'), value_vi = REPLACE(value_vi, '15,000 ตร.ม.', '10,000 ตร.ม.'), value_th = REPLACE(value_th, '15,000 ตร.ม.', '10,000 ตร.ม.') WHERE value_en LIKE '%15,000 ตร.ม.%' OR value_zh LIKE '%15,000 ตร.ม.%' OR value_vi LIKE '%15,000 ตร.ม.%' OR value_th LIKE '%15,000 ตร.ม.%';
UPDATE site_config SET value_en = REPLACE(value_en, '15,000 m²', '10,000 m²'), value_zh = REPLACE(value_zh, '15,000 m²', '10,000 m²'), value_vi = REPLACE(value_vi, '15,000 m²', '10,000 m²'), value_th = REPLACE(value_th, '15,000 m²', '10,000 m²') WHERE value_en LIKE '%15,000 m²%' OR value_zh LIKE '%15,000 m²%' OR value_vi LIKE '%15,000 m²%' OR value_th LIKE '%15,000 m²%';
UPDATE site_config SET value_en = REPLACE(value_en, '5,000+ tons', '5,000 tons'), value_zh = REPLACE(value_zh, '5,000+ tons', '5,000 tons'), value_vi = REPLACE(value_vi, '5,000+ tons', '5,000 tons'), value_th = REPLACE(value_th, '5,000+ tons', '5,000 tons') WHERE value_en LIKE '%5,000+ tons%' OR value_zh LIKE '%5,000+ tons%' OR value_vi LIKE '%5,000+ tons%' OR value_th LIKE '%5,000+ tons%';
UPDATE site_config SET value_en = REPLACE(value_en, '5,000+吨', '5,000吨'), value_zh = REPLACE(value_zh, '5,000+吨', '5,000吨'), value_vi = REPLACE(value_vi, '5,000+吨', '5,000吨'), value_th = REPLACE(value_th, '5,000+吨', '5,000吨') WHERE value_en LIKE '%5,000+吨%' OR value_zh LIKE '%5,000+吨%' OR value_vi LIKE '%5,000+吨%' OR value_th LIKE '%5,000+吨%';
UPDATE site_config SET value_en = REPLACE(value_en, '5.000+ tấn', '5.000 tấn'), value_zh = REPLACE(value_zh, '5.000+ tấn', '5.000 tấn'), value_vi = REPLACE(value_vi, '5.000+ tấn', '5.000 tấn'), value_th = REPLACE(value_th, '5.000+ tấn', '5.000 tấn') WHERE value_en LIKE '%5.000+ tấn%' OR value_zh LIKE '%5.000+ tấn%' OR value_vi LIKE '%5.000+ tấn%' OR value_th LIKE '%5.000+ tấn%';
UPDATE site_config SET value_en = REPLACE(value_en, '5,000+ ตัน', '5,000 ตัน'), value_zh = REPLACE(value_zh, '5,000+ ตัน', '5,000 ตัน'), value_vi = REPLACE(value_vi, '5,000+ ตัน', '5,000 ตัน'), value_th = REPLACE(value_th, '5,000+ ตัน', '5,000 ตัน') WHERE value_en LIKE '%5,000+ ตัน%' OR value_zh LIKE '%5,000+ ตัน%' OR value_vi LIKE '%5,000+ ตัน%' OR value_th LIKE '%5,000+ ตัน%';
UPDATE site_config SET value_en = REPLACE(value_en, '60+ countries', '30+ countries'), value_zh = REPLACE(value_zh, '60+ countries', '30+ countries'), value_vi = REPLACE(value_vi, '60+ countries', '30+ countries'), value_th = REPLACE(value_th, '60+ countries', '30+ countries') WHERE value_en LIKE '%60+ countries%' OR value_zh LIKE '%60+ countries%' OR value_vi LIKE '%60+ countries%' OR value_th LIKE '%60+ countries%';

-- 2) 精确行：统计数字、版权、注册地址
UPDATE site_config SET value_en='12', value_zh='12', value_vi='12', value_th='12' WHERE key='stats_years';
UPDATE site_config SET value_en='36', value_zh='36', value_vi='36', value_th='36' WHERE key='stats_products';
UPDATE site_config SET value_en='© 2026 Anping County Angu Metal Wire Mesh Products Co., Ltd. All rights reserved.', value_zh='© 2026 安平县安固金属丝网制品有限公司 版权所有', value_vi='© 2026 Anping County Angu Metal Wire Mesh Products Co., Ltd.', value_th='© 2026 Anping County Angu Metal Wire Mesh Products Co., Ltd.' WHERE key='copyright';
UPDATE site_config SET value_en='1,000 m Northwest of Houzhaotuan Village, Nanwangzhuang Town, Anping County, Hengshui, Hebei 053600, China', value_zh='河北省衡水市安平县南王庄镇后赵疃村西北1000米处（邮编 053600）', value_vi='1,000 m Northwest of Houzhaotuan Village, Nanwangzhuang Town, Anping County, Hengshui, Hebei 053600, China', value_th='1,000 m Northwest of Houzhaotuan Village, Nanwangzhuang Town, Anping County, Hengshui, Hebei 053600, China' WHERE key='address';

-- 3) 发展历程：成立年份 2015 -> 2014（工商登记 2014-08-15）
UPDATE about_timeline SET year=2014 WHERE title_en='Company Founded' AND year=2015;
UPDATE about_timeline SET desc_en=REPLACE(desc_en,'15,000','10,000'), desc_zh=REPLACE(desc_zh,'15,000','10,000') WHERE year=2021;

-- 4) 选择我们的理由：去掉无出处的 50+ 工人
UPDATE why_choose_us SET description_en='Manufacturing in Anping, China''s Wire Mesh Capital since 2014. 5,000 tons annual output.', description_zh='中国丝网之都安平，2014年建厂，年产5,000吨。' WHERE description_en LIKE '15+ years%' OR description_en LIKE '%50+ skilled%';

-- 5) 补漏：中文/泰语剩余写法 + 历程中的旧法定名
UPDATE site_config SET value_zh=REPLACE(value_zh,'15年制造经验','12年制造经验'), value_en=REPLACE(value_en,'15年制造经验','12年制造经验'), value_vi=REPLACE(value_vi,'15年制造经验','12年制造经验'), value_th=REPLACE(value_th,'15年制造经验','12年制造经验') WHERE value_zh LIKE '%15年制造经验%';
UPDATE site_config SET value_zh=REPLACE(value_zh,'15年经验','12年经验'), value_en=REPLACE(value_en,'15年经验','12年经验'), value_vi=REPLACE(value_vi,'15年经验','12年经验'), value_th=REPLACE(value_th,'15年经验','12年经验') WHERE value_zh LIKE '%15年经验%';
UPDATE site_config SET value_zh='安固丝网为声屏障及丝网产品提供从询盘到交货的全流程一站式出口服务。服务30+国家的工程项目，涵盖定制生产、OEM代工、出口物流、全套单证、第三方验货以及7×24小时客服支持。' WHERE key='service_seo_intro';
UPDATE site_config SET value_th=REPLACE(value_th,'ประสบการณ์ส่งออก 15 ปี','ประสบการณ์ส่งออกตั้งแต่ปี 2014') WHERE key='service_seo_intro';
UPDATE about_timeline SET desc_en=REPLACE(desc_en,'Hebei Angu Wire Mesh Products Co., Ltd.','Anping County Angu Metal Wire Mesh Products Co., Ltd.'), desc_zh=REPLACE(desc_zh,'河北安固丝网制品有限公司','安平县安固金属丝网制品有限公司');

-- 6) 首页横幅、优势表、产品页中的公司年限与夸大数字
UPDATE banners SET
  subtitle_en='From Anping, China — manufacturing since 2014, shipping to 30+ countries',
  subtitle_zh='来自中国安平 — 自2014年建厂，产品出口30多个国家和地区',
  subtitle_vi='Từ Anping, Trung Quốc — sản xuất từ năm 2014, xuất khẩu đến hơn 30 quốc gia',
  subtitle_th='จากอันผิง ประเทศจีน — ผลิตตั้งแต่ปี 2014 ส่งออกไปกว่า 30 ประเทศ'
WHERE subtitle_en LIKE '%since 2015%' OR subtitle_zh LIKE '%2015%';

UPDATE why_choose_us SET
  description_vi='Sản xuất tại Anping, thủ đô lưới thép của Trung Quốc từ năm 2014. Sản lượng 5.000 tấn/năm.',
  description_th='ผลิตในอันผิง เมืองหลวงตะแกรงลวดของจีนตั้งแต่ปี 2014 กำลังผลิต 5,000 ตัน/ปี'
WHERE id=1;

UPDATE site_config SET
  value_vi='Giới thiệu về Angu Wire Mesh: sản xuất lưới thép từ năm 2014, chứng nhận ISO 9001 & CE, xuất khẩu rọ đá, hàng rào và lưới chống đá rơi đến hơn 30 quốc gia từ Anping, Trung Quốc.',
  value_th='เกี่ยวกับ Angu Wire Mesh: ผลิตตะแกรงลวดตั้งแต่ปี 2014 ได้รับการรับรอง ISO 9001 & CE ส่งออกกล่องเกเบี้ยน รั้ว และตาข่ายป้องกันหินร่วงไปกว่า 30 ประเทศจากอันผิง ประเทศจีน'
WHERE key='about_seo_desc_en';

UPDATE about_timeline SET desc_th=REPLACE(desc_th,'15,000','10,000') WHERE year=2021;

UPDATE products SET
  description_en=REPLACE(description_en,'<strong>15+ years</strong> manufacturing experience','<strong>Manufacturing since 2014</strong>'),
  description_zh=REPLACE(description_zh,'<strong>15+ years</strong> manufacturing experience','<strong>Manufacturing since 2014</strong>'),
  description_vi=REPLACE(description_vi,'15 năm kinh nghiệm sản xuất','sản xuất từ năm 2014'),
  description_th=REPLACE(description_th,'15 ปีประสบการณ์การผลิต','ผลิตตั้งแต่ปี 2014');

UPDATE products SET description_en=REPLACE(description_en,'15+ years manufacturing experience','manufacturing since 2014') WHERE description_en LIKE '%15+ years manufacturing experience%';
UPDATE products SET description_en=REPLACE(description_en,'15 years manufacturing experience','manufacturing since 2014') WHERE description_en LIKE '%15 years manufacturing experience%';

UPDATE about_timeline SET desc_vi=REPLACE(desc_vi,'15.000','10.000') WHERE year=2021;

-- 7) 企业邮箱统一为 annie@angumesh.com（客户确认的唯一在用企业邮箱）
UPDATE site_config SET value_en='annie@angumesh.com', value_zh='annie@angumesh.com', value_vi='annie@angumesh.com', value_th='annie@angumesh.com' WHERE key='email';
UPDATE site_config SET value_en=REPLACE(value_en,'anguwiremesh@gmail.com','annie@angumesh.com'), value_zh=REPLACE(value_zh,'anguwiremesh@gmail.com','annie@angumesh.com'), value_vi=REPLACE(value_vi,'anguwiremesh@gmail.com','annie@angumesh.com'), value_th=REPLACE(value_th,'anguwiremesh@gmail.com','annie@angumesh.com');
UPDATE site_config SET value_en=REPLACE(value_en,'@anguwiremesh.com','@angumesh.com'), value_zh=REPLACE(value_zh,'@anguwiremesh.com','@angumesh.com'), value_vi=REPLACE(value_vi,'@anguwiremesh.com','@angumesh.com'), value_th=REPLACE(value_th,'@anguwiremesh.com','@angumesh.com');
UPDATE about_team SET email='annie@angumesh.com' WHERE email LIKE '%gmail.com' OR email LIKE '%@anguwiremesh.com';
UPDATE about_team SET email='annie@angumesh.com' WHERE email IS NULL OR email='';
UPDATE site_config SET value_en=REPLACE(value_en,'5,000+ tons','5,000 tons'), value_zh=REPLACE(value_zh,'5,000+吨','5,000吨');
UPDATE site_config SET value_en=REPLACE(value_en,'STC >38dB','STC 32-34 dB'), value_en=REPLACE(value_en,'NRC 0.85-0.95','NRC 0.85');

-- 8) 修复 OG 默认图：旧域名 anguwiremesh.com + 不存在的 .png → 站点自有 1200x630 JPEG
UPDATE site_config SET
  value_en='https://www.angumesh.com/og-image.jpg',
  value_zh='https://www.angumesh.com/og-image.jpg',
  value_vi='https://www.angumesh.com/og-image.jpg',
  value_th='https://www.angumesh.com/og-image.jpg'
WHERE key='seo_default_image';

-- 9) 团队副标题去掉具体人数（在册团队 2 人，原文写 4 位）
UPDATE site_config SET
  value_en='Regional managers covering major global markets. Your dedicated contact for localized service.',
  value_zh='区域业务经理覆盖全球主要市场，为您提供本地化专业服务。',
  value_vi='Quản lý khu vực phụ trách các thị trường toàn cầu chính. Đầu mối liên hệ tận tâm của bạn.',
  value_th='ผู้จัดการภูมิภาคดูแลตลาดหลักทั่วโลก ผู้ประสานงานที่ทุ่มเทเพื่อคุณ'
WHERE key='about_team_subtitle_en';

COMMIT;

-- 验收：以下查询应返回 0 行
-- SELECT key FROM site_config WHERE value_en LIKE '%15 years%' OR value_en LIKE '%15,000%' OR value_zh LIKE '%15年%' OR value_en LIKE '%500+%';
-- SELECT id, year, title_en FROM about_timeline WHERE year=2015;
