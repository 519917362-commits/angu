#!/usr/bin/env python3
"""Rewrite 22 product SEO titles to pure question format for GEO/AI Overviews optimization."""
import sqlite3

DB = "backend/inquiries.db"

UPDATES = [
    ("highway-guardrail-w-beam",           "What Crash Rating Difference Between W-Beam and Thrie-Beam Highway Guardrail?", "W型梁和Thrie型梁公路护栏的碰撞等级有什么区别？如何选择？"),
    ("explosion-proof-guardrail",          "What Blast Resistance Rating Is Required for Petrochemical Facility Perimeter Fencing?", "石化设施周界围栏需要什么防爆等级？技术参数怎么选？"),
    ("concert-crowd-barrier",              "What Height Crowd Control Barrier Is Required for Outdoor Concert Event Safety?", "户外演唱会安保需要多高的人群控制护栏？1.1m还是1.2m？"),
    ("steel-barbed-wire-12x14",           "How Much Does Galvanized Barbed Wire Fence Cost Per Meter for Farm Use?", "农场镀锌刺绳围栏每米造价多少？安装有什么注意事项？"),
    ("active-slope-protection-net-dns50",  "Which Active Slope Protection Net System Stops 50kJ Rockfall on Mountain Roads?", "哪种主动边坡防护网系统能拦截50kJ山区公路落石？"),
    ("hesco-bastion-blast-wall-1x1x1m",   "How Do Hesco Bastion Blast Walls Work for Military Flood Control and Force Protection?", "Hesco防爆石笼网墙如何用于军事防洪和部队防护？"),
    ("blast-wall-panel-2x1x1m",           "What Size Reinforced Blast Wall Panel Is Required for Heavy-Duty Defense Applications?", "重型防御应用需要多大尺寸的加强防爆墙面板？"),
    ("galvanized-gabion-box-2x1x1m",      "What Size Gabion Basket Should I Choose for a 3m Retaining Wall Design?", "3米挡土墙该选多大石笼网箱？2m×1m×1m够用吗？"),
    ("reno-mattress-6x2x0.3m",            "How to Properly Install Reno Mattress for River Bank Scour Protection?", "雷诺护垫如何正确铺设才能有效防止河岸冲刷？"),
    ("pvc-coated-gabion-box-2x1x1m",      "Do PVC Coated Gabion Boxes Really Last Longer in Marine and Coastal Environments?", "PVC包塑石笼网箱在海洋和沿海环境真的更耐用吗？"),
    ("reinforced-gabion-box-2x1x1m",      "When Do You Need Geogrid-Reinforced Gabion Boxes for High Retaining Walls?", "高挡墙什么时候需要用土工格栅加强石笼网箱？"),
    ("stainless-steel-rope-net-2mm-60mm", "2mm vs 3mm Stainless Steel Rope Mesh: Which Gauge Is Best for Zoo Enclosures?", "2mm还是3mm不锈钢绳网？动物园围栏该选哪个规格？"),
    ("zoo-stainless-rope-net-3mm-100mm",  "What Mesh Aperture Stops Large Animals? Heavy-Duty Zoo Stainless Rope Net Guide", "多大网孔能拦住大型动物？重型动物园不锈钢绳网怎么选？"),
    ("heavy-duty-blast-barrier-2.5m",     "What Is the Maximum Blast Load a 2.5m Military-Grade Perimeter Barrier Can Withstand?", "2.5m军用级周界防爆屏障能承受多大的爆炸荷载？"),
    ("stage-barrier-1.2m-aluminum",       "Aluminum vs Steel Stage Barrier: Which Material Is Better for Lightweight Event Fencing?", "铝合金还是钢制舞台护栏？哪种更适合轻量化活动围挡？"),
    ("equipment-noise-barrier-2.5m",      "How Many Decibels Does a 2.5m Industrial Equipment Sound Barrier Actually Reduce?", "2.5m工业设备声屏障实际能降多少分贝？"),
    ("factory-noise-barrier-4m",          "What Height Factory Noise Wall Is Required for Complete Plant Perimeter Sound Reduction?", "工厂周界全面降噪需要多高的隔音墙？4m够吗？"),
    ("chain-link-fence-50mm",             "How Much Does Chain Link Fence Installation Cost Per Meter in 2026?", "2026年勾花网围栏安装每米造价多少？完整价格分析"),
    ("rail-transit-noise-barrier",        "What Noise Reduction Standards Apply to Rail Transit and Metro Acoustic Barriers?", "轨道交通和地铁声屏障适用哪些降噪标准？"),
    ("bridge-noise-barrier",              "Are Transparent Bridge Noise Barriers Actually Effective for Aesthetic Acoustic Protection?", "透明桥梁声屏障真的既美观又有效吗？降噪实测数据"),
    ("anti-tank-wire-mesh-4mm",           "What Wire Diameter and Mesh Aperture Do Military Anti-Tank Nets Require for Vehicle Stopping?", "军用防坦克网需要多粗的丝径和多大的网孔才能拦截装甲车辆？"),
    ("anti-drone-wire-mesh-1-5mm",        "How Does Stainless Steel Anti-Drone Mesh Protect Airports and Military Bases from Aerial Threats?", "不锈钢防无人机网如何保护机场和军事基地免受空中威胁？"),
]

conn = sqlite3.connect(DB)
for slug, en_title, zh_title in UPDATES:
    conn.execute(
        "UPDATE products SET seo_title_en = ?, seo_title_zh = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?",
        [en_title, zh_title, slug]
    )
    print(f"  ✅ {slug}")

conn.commit()

# Verify: all 32 have question marks now
total, with_q = conn.execute(
    "SELECT COUNT(*), SUM(CASE WHEN seo_title_en LIKE '%?%' THEN 1 ELSE 0 END) FROM products"
).fetchone()
print(f"\nTotal: {total}, Question titles: {with_q}/{total}")

# Show any still missing
missing = conn.execute(
    "SELECT slug, seo_title_en FROM products WHERE seo_title_en NOT LIKE '%?%'"
).fetchall()
if missing:
    print(f"\n⚠️  Still non-question ({len(missing)}):")
    for s, t in missing:
        print(f"  {s}: {t}")
else:
    print("✅ All 32 titles are now question-style.")

conn.close()
