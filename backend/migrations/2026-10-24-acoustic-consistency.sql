-- 声学指标口径统一（2026-10-24）
--
-- 背景：SEO 专家诊断报告指出「同一页面并存 STC>38dB / STC 38dB / 25-35dB / 32–34 dB / NRC 0.85–0.95
--       等多组互斥数值」，属对外技术声明的可信度问题（GEO/AI 摘要会直接引用这些数字）。
--
-- 全站唯一基准口径（代码侧已是这个值，见 src/components/noise-barrier/TechSpecSection.tsx 与 HeroSection.tsx）：
--       隔声量  STC 32–34 dB
--       吸声系数 NRC 0.85
--       插入损失 IL 10–15 dB(A)（屏障后受声点实测）
--
-- 说明：noise_barrier_projects 其余 5 条案例属不同板型（透明亚克力 / 镀锌钢 / 复合吸声板等），
--       其 dB 值互不相同属正常产品差异，本迁移不改动，仅统一与本产品同源的 id=1。
--
-- 幂等：可重复执行。

BEGIN;

-- 1) 落地页 meta description —— 后台可编辑值优先于代码兜底，是线上实际生效的那份。
--    旧迁移（2026-10-23-entity-consistency.sql 第 98 行）写的是 'STC >38dB'（带空格），
--    与库里实际值 'STC>38dB'（无空格）不匹配，所以一直没生效，这里一并兼容两种写法。
UPDATE site_config SET
  value_en = REPLACE(REPLACE(REPLACE(REPLACE(value_en, 'STC>38dB', 'STC 32–34 dB'), 'STC >38dB', 'STC 32–34 dB'), 'STC>38 dB', 'STC 32–34 dB'), 'NRC 0.85–0.95', 'NRC 0.85'),
  value_zh = REPLACE(REPLACE(REPLACE(REPLACE(value_zh, 'STC>38dB', 'STC 32–34 dB'), 'STC >38dB', 'STC 32–34 dB'), 'STC>38 dB', 'STC 32–34 dB'), 'NRC 0.85–0.95', 'NRC 0.85'),
  value_vi = REPLACE(REPLACE(REPLACE(REPLACE(value_vi, 'STC>38dB', 'STC 32–34 dB'), 'STC >38dB', 'STC 32–34 dB'), 'STC>38 dB', 'STC 32–34 dB'), 'NRC 0.85–0.95', 'NRC 0.85'),
  value_th = REPLACE(REPLACE(REPLACE(REPLACE(value_th, 'STC>38dB', 'STC 32–34 dB'), 'STC >38dB', 'STC 32–34 dB'), 'STC>38 dB', 'STC 32–34 dB'), 'NRC 0.85–0.95', 'NRC 0.85'),
  updated_at = CURRENT_TIMESTAMP
WHERE key = 'noise_barrier_seo_description';

-- 兼容连字符写法（0.85-0.95）与全角波浪号
UPDATE site_config SET
  value_en = REPLACE(REPLACE(value_en, 'NRC 0.85-0.95', 'NRC 0.85'), 'NRC 0.85~0.95', 'NRC 0.85'),
  value_zh = REPLACE(REPLACE(value_zh, 'NRC 0.85-0.95', 'NRC 0.85'), 'NRC 0.85~0.95', 'NRC 0.85'),
  value_vi = REPLACE(REPLACE(value_vi, 'NRC 0.85-0.95', 'NRC 0.85'), 'NRC 0.85~0.95', 'NRC 0.85'),
  value_th = REPLACE(REPLACE(value_th, 'NRC 0.85-0.95', 'NRC 0.85'), 'NRC 0.85~0.95', 'NRC 0.85'),
  updated_at = CURRENT_TIMESTAMP
WHERE key = 'noise_barrier_seo_description';

-- 2) 落地页 meta keywords —— 尾部的 'STC 38dB' 与首屏 STC 32–34 dB 直接冲突
UPDATE site_config SET
  value_en = REPLACE(REPLACE(value_en, 'STC 38dB', 'STC 32–34 dB'), 'STC38dB', 'STC 32–34 dB'),
  value_zh = REPLACE(REPLACE(value_zh, 'STC 38dB', 'STC 32–34 dB'), 'STC38dB', 'STC 32–34 dB'),
  value_vi = REPLACE(REPLACE(value_vi, 'STC 38dB', 'STC 32–34 dB'), 'STC38dB', 'STC 32–34 dB'),
  value_th = REPLACE(REPLACE(value_th, 'STC 38dB', 'STC 32–34 dB'), 'STC38dB', 'STC 32–34 dB'),
  updated_at = CURRENT_TIMESTAMP
WHERE key = 'noise_barrier_seo_keywords';

-- 3) 产品 52「3.0m 公路吸隔声屏障」短描述 —— 与本品详情页自述的 IL 10–15 dB(A) 冲突
--    原文把「降噪 25–35dB」当卖点，实为板件隔声量量级，改用 STC/NRC 指标表述。
UPDATE products SET
  short_description_en = REPLACE(short_description_en, '25-35dB reduction', 'STC 32–34 dB / NRC 0.85'),
  short_description_zh = REPLACE(short_description_zh, '降噪25-35dB', '隔声量 STC 32–34 dB、NRC 0.85'),
  short_description_vi = REPLACE(short_description_vi, 'giảm ồn 25-35dB', 'STC 32–34 dB / NRC 0.85'),
  short_description_th = REPLACE(short_description_th, 'ลดเสียงได้ 25-35dB', 'STC 32–34 dB / NRC 0.85')
WHERE id = 52;

-- 3b) 修掉替换后残留的“…, achieving STC 32–34 dB” / “đạt mức STC …” 语病
UPDATE products SET
  short_description_en = REPLACE(short_description_en, 'barrier, achieving STC', 'barrier, rated STC'),
  short_description_vi = REPLACE(short_description_vi, 'đạt mức STC', 'đạt STC')
WHERE id = 52;

-- 3b) 兼容 en dash 写法（25–35dB）
UPDATE products SET
  short_description_en = REPLACE(short_description_en, '25–35dB reduction', 'STC 32–34 dB / NRC 0.85'),
  short_description_zh = REPLACE(short_description_zh, '降噪25–35dB', '隔声量 STC 32–34 dB、NRC 0.85'),
  short_description_vi = REPLACE(short_description_vi, 'giảm ồn 25–35dB', 'STC 32–34 dB / NRC 0.85'),
  short_description_th = REPLACE(short_description_th, 'ลดเสียงได้ 25–35dB', 'STC 32–34 dB / NRC 0.85')
WHERE id = 52;

-- 3c) 修掉替换后残留的“…, achieving STC 32–34 dB” / “đạt mức STC …” 语病
--     （必须放在 3a/3b 之后，否则 en dash 分支又会生成一遍）
UPDATE products SET
  short_description_en = REPLACE(short_description_en, 'barrier, achieving STC', 'barrier, rated STC'),
  short_description_vi = REPLACE(short_description_vi, 'đạt mức STC', 'đạt STC')
WHERE id = 52;

-- 4) 案例库 id=1「3.0m 穿孔钢板+岩棉」—— 与产品 52 同一板型，规格值同步
UPDATE noise_barrier_projects SET
  spec_en = REPLACE(REPLACE(spec_en, '25–35dB reduction', 'STC 32–34 dB / NRC 0.85'), '25-35dB reduction', 'STC 32–34 dB / NRC 0.85'),
  spec_zh = REPLACE(REPLACE(spec_zh, '降噪25–35dB', '隔声量 STC 32–34 dB、NRC 0.85'), '降噪25-35dB', '隔声量 STC 32–34 dB、NRC 0.85'),
  spec_vi = REPLACE(REPLACE(spec_vi, 'giảm 25–35dB', 'STC 32–34 dB / NRC 0.85'), 'giảm 25-35dB', 'STC 32–34 dB / NRC 0.85'),
  spec_th = REPLACE(REPLACE(spec_th, 'ลดเสียง 25–35dB', 'STC 32–34 dB / NRC 0.85'), 'ลดเสียง 25-35dB', 'STC 32–34 dB / NRC 0.85')
WHERE id = 1;

COMMIT;

-- 验收：以下查询均应返回 0 行
-- SELECT key FROM site_config WHERE value_en LIKE '%38dB%' OR value_zh LIKE '%38dB%' OR value_en LIKE '%0.85–0.95%';
-- SELECT id FROM products WHERE short_description_en LIKE '%25-35dB%' OR short_description_en LIKE '%25–35dB%';
-- SELECT id FROM noise_barrier_projects WHERE spec_en LIKE '%25–35dB%' OR spec_zh LIKE '%25–35dB%';
