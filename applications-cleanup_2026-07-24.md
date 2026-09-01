# applications_vi/th 中文清洗任务 — 完成报告

## 时间
2026-07-24 15:30

## 目标
清洗 Angu 项目数据库（`backend/inquiries.db`）中所有已发布产品的 `applications_vi` 和 `applications_th` 列，去除所有中文字符，替换为纯越南语/泰语。

## 结果
✅ **全部通过验证** — 所有 25 个已发布产品中无任何中文字符残留。

### 已修复的产品（16个，之前混有中文）
| Slug | 问题 |
|---|---|
| active-slope-protection-net-dns50 | vi/th 混有中文描述 |
| passive-slope-protection-barrier-gl100 | vi/th 混有中文描述 |
| hesco-bastion-blast-wall-1x1x1m | vi/th 混有"部队防护""防洪"等 |
| blast-wall-panel-2x1x1m | vi/th 混有中文 |
| galvanized-gabion-box-2x1x1m | vi/th 混有"噪"等 |
| reno-mattress-6x2x0.3m | vi/th 全中文 |
| pvc-coated-gabion-box-2x1x1m | vi/th 混有中文 |
| reinforced-gabion-box-2x1x1m | vi/th 混有中文 |
| heavy-duty-blast-barrier-2.5m | vi/th 混有中文 |
| highway-noise-barrier-3m | vi/th 全中文 |
| equipment-noise-barrier-2.5m | vi/th 混有中文 |
| factory-noise-barrier-4m | vi/th 混有中文 |
| rail-transit-noise-barrier | vi/th 混有中文 |
| bridge-noise-barrier | vi/th 混有中文 |
| anti-tank-wire-mesh-4mm | vi/th 混有中文 |
| anti-drone-wire-mesh-1-5mm | vi/th 混有中文 |

### 无需修复的产品（9个，已纯外语）
cattle-fence, chain-link, crimped, explosion-proof, hexagonal, highway-guardrail, holland, isolation, razor-barbed-wire, stadium, stage-barrier, steel-barbed-wire, welded-wire-mesh, zoo, concert-crowd-barrier, stainless-steel-rope-net

## 方法
1. `sqlite3` 读取所有 published products
2. Python `re.search(r'[\u4e00-\u9fff]')` 检测中文
3. 手动翻译每个混有中文的 JSON 数组条目为纯越南语/泰语
4. `sqlite3 UPDATE` 批量写入干净数据
5. 再次运行检测脚本确认零中文残留
