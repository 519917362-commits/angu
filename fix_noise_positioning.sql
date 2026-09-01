-- 全站主营方向调整：丝网/石笼网 → 声屏障产品（四语）

-- 1. Hero 副标题
UPDATE site_config SET
  value_en = 'Highway · Industrial · Bridge Noise Barriers — Factory-Direct from Anping, China',
  value_zh = '公路 · 工业 · 桥梁声屏障 — 中国安平工厂直供',
  value_vi = 'Tấm chắn ồn đường cao tốc · công nghiệp · cầu — Trực tiếp từ nhà máy An Bình, Trung Quốc',
  value_th = 'แผงกั้นเสียงทางหลวง · อุตสาหกรรม · สะพาน — จำหน่ายตรงจากโรงงานอันผิง จีน'
WHERE key = 'hero_subtitle_en';

-- 2. 公司标签
UPDATE site_config SET
  value_en = 'Noise Barrier · Gabion · Fencing · Protection',
  value_zh = '声屏障 · 石笼网 · 护栏网 · 防护网',
  value_vi = 'Tấm Chắn Ồn · Rọ Đá · Hàng Rào · Bảo Vệ',
  value_th = 'แผงกั้นเสียง · เกเบี้ยน · รั้ว · การป้องกัน'
WHERE key = 'company_tagline';

-- 3. 公司简介（短）
UPDATE site_config SET
  value_en = 'Hebei Angu Wire Mesh Products Co., Ltd. is a professional manufacturer of highway, industrial, rail transit and bridge noise barriers — plus gabion boxes, fencing and protection nets — exported to 30+ countries.',
  value_zh = '安固丝网是一家专业制造商，主营公路、工业、轨道交通、桥梁声屏障，以及石笼网、护栏网、防护网等金属丝网产品，出口30多个国家和地区。',
  value_vi = 'Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu là nhà sản xuất chuyên nghiệp về tấm chắn ồn đường cao tốc, công nghiệp, đường sắt và cầu — cùng rọ đá, hàng rào và lưới bảo vệ — xuất khẩu đến hơn 30 quốc gia.',
  value_th = 'Hebei Angu Wire Mesh Products Co., Ltd. เป็นผู้ผลิตมืออาชีพด้านแผงกั้นเสียงทางหลวง อุตสาหกรรม ระบบราง และสะพาน — รวมถึงกล่องเกเบี้ยน รั้ว และตาข่ายป้องกัน — ส่งออกไปยังกว่า 30 ประเทศ'
WHERE key = 'company_short_intro_en';

UPDATE site_config SET
  value_zh = '安固丝网是一家专业制造商，主营公路、工业、轨道交通、桥梁声屏障，以及石笼网、护栏网、防护网等金属丝网产品，出口30多个国家和地区。'
WHERE key = 'company_short_intro_zh';

-- 4. 首页公司标题
UPDATE site_config SET
  value_en = 'Angu Wire Mesh — Professional Noise Barrier Manufacturer',
  value_zh = '安固丝网 — 专业声屏障制造商',
  value_vi = 'Về Angu Wire Mesh — Nhà Sản Xuất Tấm Chắn Ồn Chuyên Nghiệp',
  value_th = 'เกี่ยวกับ Angu Wire Mesh — ผู้ผลิตแผงกั้นเสียงมืออาชีพ'
WHERE key = 'home_company_title';

-- 5. 首页公司描述1
UPDATE site_config SET
  value_en = 'Angu Wire Mesh (Hebei Angu Wire Mesh Products Co., Ltd.) is headquartered in Anping — China''s Wire Mesh Capital. We are an integrated manufacturer specializing in R&D, production, and export of noise barriers (highway, industrial, rail transit, bridge), plus gabion boxes, rockfall protection nets, and fencing across 9 product lines, with an annual capacity exceeding 5,000 tons.',
  value_zh = '安固丝网（河北安固丝网制品有限公司）位于中国丝网之都——安平。我们是一家集研发、生产、销售于一体的金属丝网制造企业，主营声屏障（公路、工业、轨道交通、桥梁），以及石笼网箱、边坡防护网、护栏网等九大品类，年产能超过5,000吨。',
  value_vi = 'Angu Wire Mesh (Công ty TNHH Sản Phẩm Lưới Thép Hà Bắc Angu) có trụ sở tại An Bình — Thủ Đô Lưới Thép Trung Quốc. Chúng tôi là nhà sản xuất tích hợp chuyên R&D, sản xuất và xuất khẩu tấm chắn ồn (đường cao tốc, công nghiệp, đường sắt, cầu), cùng rọ đá, lưới bảo vệ chống đá rơi và hàng rào trên 9 dòng sản phẩm, với công suất hàng năm vượt 5.000 tấn.',
  value_th = 'Angu Wire Mesh (Hebei Angu Wire Mesh Products Co., Ltd.) มีสำนักงานใหญ่ในอันผิง — เมืองหลวงตาข่ายลวดของจีน เราเป็นผู้ผลิตครบวงจรที่เชี่ยวชาญด้าน R&D การผลิต และการส่งออกแผงกั้นเสียง (ทางหลวง อุตสาหกรรม ระบบราง สะพาน) รวมถึงกล่องเกเบี้ยน ตาข่ายป้องกันหินร่วง และรั้ว ครอบคลุม 9 กลุ่มผลิตภัณฑ์ ด้วยกำลังการผลิตต่อปีเกิน 5,000 ตัน'
WHERE key = 'home_company_desc1';

-- 6. 首页 SEO intro
UPDATE site_config SET
  value_en = 'Angu Wire Mesh is a professional noise barrier manufacturer based in Anping, China — the global Wire Mesh Capital. Our core products include highway, industrial, rail transit, and bridge noise barriers, plus gabion boxes, rockfall protection nets, and fencing across 9 product lines. ISO 9001:2015 and CE certified, 15,000m² factory, 5,000+ tons annual capacity, exporting to 30+ countries.',
  value_zh = '安固丝网（Angu Wire Mesh）是位于中国丝网之都安平的专业声屏障制造商，主营公路、工业、轨道交通、桥梁声屏障，以及石笼网箱、边坡防护网、护栏网等9大品类。拥有ISO 9001:2015质量管理体系认证和CE产品认证，15,000㎡工厂面积，年产5,000+吨，产品远销东南亚、中东、非洲、南美等30多个国家和地区。',
  value_vi = 'Angu Wire Mesh — Nhà sản xuất tấm chắn ồn chuyên nghiệp tại An Bình, Trung Quốc — Thủ Đô Lưới Thép toàn cầu. Sản phẩm chủ lực gồm tấm chắn ồn đường cao tốc, công nghiệp, đường sắt và cầu, cùng rọ đá, lưới bảo vệ chống đá rơi và hàng rào trên 9 dòng sản phẩm. Chứng nhận ISO 9001:2015 và CE, nhà máy 15.000m², công suất 5.000+ tấn/năm, xuất khẩu đến hơn 30 quốc gia.',
  value_th = 'Angu Wire Mesh — ผู้ผลิตแผงกั้นเสียงมืออาชีพในอันผิง ประเทศจีน — เมืองหลวงตาข่ายลวดระดับโลก สินค้าหลักได้แก่แผงกั้นเสียงทางหลวง อุตสาหกรรม ระบบราง และสะพาน รวมถึงกล่องเกเบี้ยน ตาข่ายป้องกันหินร่วง และรั้ว ครอบคลุม 9 กลุ่มผลิตภัณฑ์ ได้รับการรับรอง ISO 9001:2015 และ CE โรงงาน 15,000 ตร.ม. กำลังผลิต 5,000+ ตัน/ปี ส่งออกไปยังกว่า 30 ประเทศ'
WHERE key = 'home_seo_intro';
