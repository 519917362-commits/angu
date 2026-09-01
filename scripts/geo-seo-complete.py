#!/usr/bin/env python3
"""Batch update all 30 products with GEO-optimized SEO titles (question-style) and short descriptions."""

import sqlite3, json

DB = "backend/inquiries.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row

ALL = {}

# ── Wire Mesh (丝网类) ──
ALL["welded-wire-mesh-50mm"] = {
    "seo_title_en": "What Size Welded Wire Mesh Panel Is Best for Construction Reinforcement?",
    "seo_title_zh": "建筑混凝土加固用焊接网片选多大孔径最合适？",
    "short_desc_en": "Welded wire mesh panels with 50mm×50mm aperture, ideal for concrete reinforcement and construction fencing. Hot-dipped galvanized finish for long-term corrosion resistance (200+ hrs salt spray).",
    "short_desc_zh": "50mm×50mm孔径焊接网片，混凝土加固与建筑围栏的理想选择。热镀锌处理，盐雾测试200+小时，长期防腐耐用。",
}
ALL["crimped-wire-mesh-10mm"] = {
    "seo_title_en": "Crimped Wire Mesh vs Welded Mesh: Which Is Better for Mining Screens?",
    "seo_title_zh": "矿山筛网用轧花网还是焊接网？10mm孔径怎么选？",
    "short_desc_en": "10mm aperture crimped wire mesh in SS304/SS316, the preferred screening media for mining, quarry, and aggregate processing. Lock-crimped construction prevents wire shifting under vibration.",
    "short_desc_zh": "10mm孔径轧花网，SS304/SS316不锈钢材质，矿山筛分和骨料加工首选。锁弯式结构防止振动环境下钢丝移位。",
}
ALL["cattle-fence-150mm"] = {
    "seo_title_en": "Cattle Fence (Field Fence) Buying Guide: What Gauge and Height for Ranch Use?",
    "seo_title_zh": "牛栏网（草原网）怎么选？牧场围栏规格和安装指南",
    "short_desc_en": "Graduated hinge-joint cattle fence with 150mm×150mm bottom apertures, designed for containing cattle, sheep, and other livestock. Hot-dipped galvanized, available in 0.9m–2.0m heights.",
    "short_desc_zh": "渐变铰链结牛栏网，底部网孔150mm×150mm，适用于牛、羊等牲畜圈养。热镀锌处理，可选0.9m–2.0m高度。",
}
ALL["holland-wire-mesh-50mm"] = {
    "seo_title_en": "Holland Wire Mesh (Euro Fence) vs Chain Link: Which Perimeter Fence Is Better?",
    "seo_title_zh": "荷兰网（欧式围栏）和勾花网哪个好？选购对比指南",
    "short_desc_en": "Holland wire mesh (Euro fence) with 50mm×50mm aperture and PVC coating, the modern perimeter fencing solution for residential compounds, schools, and industrial sites. Available in green, black, and white PVC finishes.",
    "short_desc_zh": "荷兰网（欧式围栏）50mm×50mm网孔+PVC包塑，住宅小区、学校、工业厂区的现代周界围栏方案。可选绿、黑、白色PVC涂层。",
}
ALL["razor-barbed-wire-bto22"] = {
    "seo_title_en": "Razor Barbed Wire BTO-22 vs BTO-30: Which Coil Is Best for High-Security Fencing?",
    "seo_title_zh": "刀片刺绳BTO-22和BTO-30哪个防盗效果更好？选购指南",
    "short_desc_en": "BTO-22 concertina razor barbed wire, the global standard for prison, military, and high-security perimeter fencing. Hot-dipped galvanized with razor-sharp blades every 35mm. Compliant with ASTM A764.",
    "short_desc_zh": "BTO-22螺旋刀片刺绳，监狱、军事和高安防周界的全球标准。热镀锌处理，刀片间距35mm，符合ASTM A764标准。",
}
ALL["steel-barbed-wire-12x14"] = {
    "seo_title_en": "Galvanized Barbed Wire 12-Gauge: Farm Fence Installation Tips & Cost Analysis",
    "seo_title_zh": "12号镀锌刺绳农场围栏怎么装？安装方法和成本分析",
    "short_desc_en": "Double-strand galvanized barbed wire, 12×14 gauge, the time-tested perimeter security solution for farms, ranches, and industrial sites. Zinc coating ≥80g/m² for extended outdoor service life.",
    "short_desc_zh": "双股镀锌刺绳，12×14号，农场、牧场和工业场地的经典周界安防方案。锌层≥80g/m²，户外使用寿命长。",
}
ALL["hexagonal-wire-mesh-25mm"] = {
    "seo_title_en": "How to Choose Hexagonal Chicken Wire Mesh for Poultry Farms? 25mm vs 13mm Comparison",
    "seo_title_zh": "养殖场六角鸡网选25mm还是13mm？孔径对比选购指南",
    "short_desc_en": "25mm (1-inch) hexagonal double-twist wire mesh, versatile for poultry fencing, small animal enclosures, and gabion filling. Galvanized or PVC-coated options for different service environments.",
    "short_desc_zh": "25mm（1英寸）六角双绞网，通用型家禽围栏、小动物圈养和石笼填充材料。可选镀锌或PVC包塑，适应不同使用环境。",
}
ALL["chain-link-fence-50mm"] = {
    "seo_title_en": "Chain Link Fence 50mm Mesh: Installation Guide & Cost per Meter Breakdown",
    "seo_title_zh": "勾花网围栏50mm网孔安装指南：每米造价与施工步骤",
    "short_desc_en": "50mm×50mm chain link fence with 2.5mm wire diameter, the most popular diamond mesh for security perimeter fencing. Hot-dipped galvanized with post-and-rail system included.",
    "short_desc_zh": "50mm×50mm勾花网围栏，2.5mm丝径，最受欢迎的菱形安防围栏。热镀锌处理，标配立柱横杆系统。",
}

# ── Fence (护栏网) ──
ALL["stadium-fence-50mm"] = {
    "seo_title_en": "Sports Court Fencing Specifications: What Height and Mesh for Tennis & Basketball?",
    "seo_title_zh": "运动场围网规格怎么定？篮球场网球场护栏高度和网孔标准",
    "short_desc_en": "Sports court chain link fence, 50mm×50mm mesh with 3.0mm heavy-duty wire, designed for tennis courts, basketball courts, football fields, and multi-purpose sports venues. Galvanized with optional PVC coating.",
    "short_desc_zh": "运动场勾花围网，50mm×50mm网孔+3.0mm重型钢丝，适用于网球场、篮球场、足球场及综合运动场馆。镀锌处理，可选PVC包塑。",
}
ALL["isolation-fence-50mm"] = {
    "seo_title_en": "Temporary Construction Site Fencing: Panel Type vs Mesh Roll — Which to Choose?",
    "seo_title_zh": "工地临时围挡用面板式还是网卷式？50mm隔离围栏怎么选",
    "short_desc_en": "Temporary isolation fence panels, 50mm×50mm mesh with 2.5mm wire, quick-deploy solution for construction sites, event venues, and crowd control. Interlocking panel design for fast setup.",
    "short_desc_zh": "临时隔离围栏面板，50mm×50mm网孔+2.5mm丝径，工地、活动场馆和人群管控的快速部署方案。互锁面板设计，安装便捷。",
}
ALL["highway-guardrail-w-beam"] = {
    "seo_title_en": "W-Beam vs Thrie-Beam Highway Guardrail: Crash Rating & Cost Comparison",
    "seo_title_zh": "公路波形梁护栏W梁和Thrie梁哪个好？防撞等级与造价对比",
    "short_desc_en": "Highway W-beam and Thrie-beam galvanized guardrail systems, meeting MASH TL-3 crash test requirements. Complete with posts, spacers, and end terminals. Suitable for expressways and national highways.",
    "short_desc_zh": "公路波形梁W梁和Thrie梁热镀锌护栏系统，满足MASH TL-3碰撞测试要求。标配立柱、防阻块和端头。适用于高速公路和国道。",
}
ALL["explosion-proof-guardrail"] = {
    "seo_title_en": "Anti-Blast Guardrail: Specifications for Petrochemical & Military Facility Protection",
    "seo_title_zh": "防爆护栏技术规格：石化厂和军事设施防护怎么设计？",
    "short_desc_en": "2.0m high anti-blast steel guardrail, engineered for petrochemical plants, military bases, and critical infrastructure protection. Reinforced steel construction with blast-resistant design.",
    "short_desc_zh": "2.0m高防爆钢制护栏，专为石化工厂、军事基地和关键基础设施防护设计。加强型钢结构，抗爆设计。",
}
ALL["concert-crowd-barrier"] = {
    "seo_title_en": "Concert Crowd Control Barriers: 1.1m vs 1.2m Height — Event Safety Guide",
    "seo_title_zh": "演唱会人墙护栏选1.1米还是1.2米？大型活动安防指南",
    "short_desc_en": "1.1m×2.0m steel crowd control barriers, standard equipment for concerts, festivals, marathons, and public events. Interlocking hooks for secure connections; hot-dipped galvanized for outdoor durability.",
    "short_desc_zh": "1.1m×2.0m钢制人群控制栏，演唱会、音乐节、马拉松和大型公共活动的标准装备。互锁挂钩确保连接稳固，热镀锌处理户外耐用。",
}
ALL["heavy-duty-blast-barrier-2.5m"] = {
    "seo_title_en": "Maximum Security Blast Barrier 2.5m: Military-Grade Perimeter Protection",
    "seo_title_zh": "最高安全级防爆护栏2.5米：军用级周界防护方案",
    "short_desc_en": "2.5m heavy-duty anti-blast barrier, the highest security grade for military installations, embassies, and critical national infrastructure. Multi-layer steel reinforcement with anti-ram capability.",
    "short_desc_zh": "2.5m重型防爆护栏，军事设施、大使馆和关键国家基础设施的最高安全级防护。多层钢结构加固，具备防冲撞能力。",
}
ALL["stage-barrier-1.2m-aluminum"] = {
    "seo_title_en": "Aluminum Stage Barrier 1.2m: Lightweight Event Fencing vs Steel Comparison",
    "seo_title_zh": "铝合金舞台护栏1.2米：轻量化活动围栏和钢制护栏哪个好？",
    "short_desc_en": "1.2m aluminum stage barrier, lightweight yet strong event fencing for indoor exhibitions, trade shows, and corporate events. Easy to transport and assemble; corrosion-resistant finish.",
    "short_desc_zh": "1.2m铝合金舞台护栏，轻盈坚固的活动围栏，适用于室内展览、展销会和企业活动。便于运输和组装，耐腐蚀表面处理。",
}

# ── Gabion (石笼网) ──
ALL["galvanized-gabion-box-2x1x1m"] = {
    "seo_title_en": "Gabion Basket 2m×1m×1m: Retaining Wall Design & Installation Guide",
    "seo_title_zh": "石笼网箱2m×1m×1m挡土墙怎么设计和安装？完整指南",
    "short_desc_en": "Hot-dipped galvanized gabion box 2m×1m×1m, the standard size for retaining walls and slope stabilization. Double-twist hexagonal mesh with selvedge wire reinforcement. CE certified EN 10223-3.",
    "short_desc_zh": "热镀锌石笼网箱2m×1m×1m，挡土墙和边坡稳定的标准尺寸。双绞六角网+收边钢丝加固，CE认证EN 10223-3。",
}
ALL["hesco-bastion-blast-wall-1x1x1m"] = {
    "seo_title_en": "Hesco Bastion Blast Wall: Military Flood Control & Force Protection Explained",
    "seo_title_zh": "Hesco防爆石笼堡垒墙：军用防洪和部队防护怎么用？",
    "short_desc_en": "Hesco bastion blast wall 1m×1m×1m, military-grade defense barrier for flood control, force protection, and perimeter security. Collapsible wire mesh with polypropylene liner; rapid deployment under 10 minutes per unit.",
    "short_desc_zh": "Hesco防爆石笼堡垒墙1m×1m×1m，军用级防御屏障，用于防洪、部队防护和周界安防。折叠式金属网+聚丙烯内衬，每单元10分钟内快速部署。",
}
ALL["blast-wall-panel-2x1x1m"] = {
    "seo_title_en": "Reinforced Blast Wall Panel 2m×1m: Heavy-Duty Defense Specifications",
    "seo_title_zh": "加强型防爆墙板2m×1m：重型防御技术规格详解",
    "short_desc_en": "Reinforced blast wall panel 2m×1m×1m, heavy-duty defense construction for military and critical infrastructure. Welded mesh with additional bracing; blast-tested to withstand high-pressure shockwaves.",
    "short_desc_zh": "加强型防爆墙板2m×1m×1m，军事和关键基础设施的重型防御结构。焊接网+额外支撑，经爆炸测试可承受高压冲击波。",
}
ALL["reno-mattress-6x2x0.3m"] = {
    "seo_title_en": "Reno Mattress 6m×2m: River Bank & Scour Protection Engineering Guide",
    "seo_title_zh": "雷诺护垫6m×2m河岸防护工程指南：设计和施工要点",
    "short_desc_en": "Reno mattress 6m×2m×0.3m, hydraulic engineering solution for riverbank protection, scour prevention, and channel lining. Double-twist galvanized mesh with partitions every 1m for structural integrity.",
    "short_desc_zh": "雷诺护垫6m×2m×0.3m，河岸防护、防冲刷和渠道衬砌的水利工程方案。双绞镀锌网+每1m隔板，保证结构完整性。",
}
ALL["pvc-coated-gabion-box-2x1x1m"] = {
    "seo_title_en": "PVC Coated Gabion Box: Marine & Coastal Retaining Wall Solution",
    "seo_title_zh": "PVC包塑石笼网箱：海洋和沿海挡土墙防腐方案",
    "short_desc_en": "PVC coated gabion box 2m×1m×1m, designed for marine and coastal environments where salt spray resistance is critical. 0.5mm PVC layer over galvanized core wire; available in green and grey.",
    "short_desc_zh": "PVC包塑石笼网箱2m×1m×1m，专为海洋和沿海高盐雾环境设计。0.5mm PVC层覆盖镀锌芯线，可选绿色和灰色。",
}
ALL["reinforced-gabion-box-2x1x1m"] = {
    "seo_title_en": "Reinforced Gabion Box with Geogrid: High Retaining Wall Engineering Solution",
    "seo_title_zh": "加筋石笼网箱+土工格栅：高挡土墙工程怎么设计？",
    "short_desc_en": "Reinforced gabion box 2m×1m×1m with biaxial geogrid, engineered for high retaining walls (>6m) and heavy-load slope stabilization. Geogrid reinforcement increases tensile capacity by 300%.",
    "short_desc_zh": "加筋石笼网箱2m×1m×1m+双向土工格栅，专为高挡土墙（>6m）和重载边坡稳定设计。土工格栅加筋将抗拉能力提升300%。",
}

# ── Protection Net (边坡防护网) ──
ALL["active-slope-protection-net-dns50"] = {
    "seo_title_en": "Active Slope Protection Net DNS-50 (50kJ): Mountain Road Safety System Guide",
    "seo_title_zh": "主动边坡防护网DNS-50（50kJ）：山区公路安全系统怎么施工？",
    "short_desc_en": "DNS-50 active slope protection system with 50kJ energy absorption capacity, designed for mountain highways and railway slopes. Tecco high-tensile steel wire mesh with spike plates and anchor ropes.",
    "short_desc_zh": "DNS-50主动边坡防护系统，50kJ吸能能力，专为山区公路和铁路边坡设计。Tecco高强钢丝格栅+锚杆+支撑绳一体化系统。",
}
ALL["passive-slope-protection-barrier-gl100"] = {
    "seo_title_en": "Passive Rockfall Barrier GL-100 (100kJ): When Do You Need High-Energy Protection?",
    "seo_title_zh": "被动落石防护栏GL-100（100kJ）：什么场景需要高能级防护？",
    "short_desc_en": "GL-100 passive rockfall barrier with 100kJ impact capacity, designed for high-energy rockfall zones along railways and mountain roads. Ring net system with energy-dissipating brake elements.",
    "short_desc_zh": "GL-100被动落石防护栏，100kJ冲击能力，专为铁路和山区公路高能落石区设计。环形网+耗能刹车元件系统。",
}

# ── Stainless Steel Rope Mesh (不锈钢绳网) ──
ALL["stainless-steel-rope-net-2mm-60mm"] = {
    "seo_title_en": "Stainless Steel Rope Mesh 2mm vs 3mm: Zoo & Green Wall Installation Guide",
    "seo_title_zh": "不锈钢绳网2mm和3mm怎么选？动物园和绿墙安装指南",
    "short_desc_en": "SS316 stainless steel rope mesh, 2.0mm×60mm ferrule type, premium aviary and zoo enclosure netting. Corrosion-resistant, flexible, and visually transparent. Custom dimensions up to 6m wide panels.",
    "short_desc_zh": "SS316不锈钢绳网，2.0mm×60mm钢扣式，高端鸟舍和动物园围网。耐腐蚀、柔韧、视觉通透。支持定制尺寸，面板最大宽度6m。",
}
ALL["zoo-stainless-rope-net-3mm-100mm"] = {
    "seo_title_en": "Heavy-Duty Zoo Stainless Rope Mesh 3mm: Large Animal Enclosure Engineering",
    "seo_title_zh": "重型动物园不锈钢绳网3mm：大型动物围栏工程设计",
    "short_desc_en": "3.0mm×100mm SS316 heavy-duty stainless steel rope mesh, engineered for large animal enclosures (big cats, primates, elephants). High breaking load; UV and weather resistant.",
    "short_desc_zh": "3.0mm×100mm SS316重型不锈钢绳网，专为大型动物围栏设计（大型猫科、灵长类、大象）。高断裂载荷，抗紫外线和耐候。",
}

# ── Noise Barrier (声屏障) ──
ALL["highway-noise-barrier-3m"] = {
    "seo_title_en": "3m Highway Noise Barrier: How Much dB Reduction Can You Expect? (Test Data)",
    "seo_title_zh": "3米公路声屏障能降多少分贝？实测数据与选购指南",
    "short_desc_en": "3.0m highway sound-absorbing noise barrier, achieving 25-35dB reduction for residential community protection. Perforated steel panel with mineral wool core; meets GB/T 19884 and EN 1793 standards.",
    "short_desc_zh": "3.0m公路吸隔声屏障，降噪25-35dB，住宅区噪声防护方案。穿孔钢板+岩棉芯材，满足GB/T 19884和EN 1793标准。",
}
ALL["equipment-noise-barrier-2.5m"] = {
    "seo_title_en": "2.5m Industrial Equipment Sound Barrier: Factory Noise Compliance Solution",
    "seo_title_zh": "2.5m工业设备隔音屏障：工厂噪声排放达标怎么选？",
    "short_desc_en": "2.5m equipment acoustic barrier, designed to enclose industrial machinery and meet environmental noise emission limits. Modular panel system for flexible configuration around generators, compressors, and production lines.",
    "short_desc_zh": "2.5m设备隔音屏障，用于包裹工业机械设备，满足环境噪声排放限值。模块化面板系统，可灵活配置包围发电机、空压机和生产线。",
}
ALL["factory-noise-barrier-4m"] = {
    "seo_title_en": "4m Industrial Factory Noise Wall: Complete Plant Perimeter Acoustic Solution",
    "seo_title_zh": "4米工厂声屏障墙：全厂区周界降噪完整方案",
    "short_desc_en": "4.0m industrial factory noise barrier wall, designed for full plant perimeter acoustic treatment. Heavy-duty steel construction with high-density sound absorption; suitable for steel mills, power plants, and manufacturing facilities.",
    "short_desc_zh": "4.0m工业工厂声屏障墙，全厂区周界降噪处理方案。重型钢结构+高密度吸声芯材，适用于钢厂、电厂和制造工厂。",
}
ALL["rail-transit-noise-barrier"] = {
    "seo_title_en": "Rail Transit & Metro Noise Barrier: Urban Rail Acoustic Standards Explained",
    "seo_title_zh": "轨道交通声屏障：地铁轻轨沿线降噪标准和方案详解",
    "short_desc_en": "Rail transit acoustic barrier for metro and light rail systems, engineered for low-frequency train noise attenuation. Withstands aerodynamic pressure pulses from passing trains. Compliant with railway-specific acoustic standards.",
    "short_desc_zh": "轨道交通声屏障，地铁和轻轨系统专用，针对低频列车噪声衰减设计。承受列车通过时的气动压力脉冲。符合铁路专用声学标准。",
}
ALL["bridge-noise-barrier"] = {
    "seo_title_en": "Bridge & Viaduct Transparent Noise Barrier: Aesthetic Acoustic Solution",
    "seo_title_zh": "桥梁高架桥透明声屏障：不影响景观的降噪方案",
    "short_desc_en": "Bridge and viaduct transparent noise barrier with acoustic panels, combining noise reduction with visual transparency for urban aesthetic requirements. Lightweight aluminum frame with tempered glass or polycarbonate panels; wind-load optimized.",
    "short_desc_zh": "桥梁高架桥透明隔音板声屏障，降噪与景观通透兼顾，满足城市美观要求。轻质铝合金框架+钢化玻璃或聚碳酸酯面板，风荷载优化。",
}

# ── Apply ──
for slug, data in ALL.items():
    updates = {}
    if "seo_title_en" in data:
        updates["seo_title_en"] = data["seo_title_en"]
        updates["seo_title_zh"] = data["seo_title_zh"]
    if "short_desc_en" in data:
        updates["short_description_en"] = data["short_desc_en"]
        updates["short_description_zh"] = data["short_desc_zh"]

    sets = ", ".join(f"{k} = ?" for k in updates)
    vals = list(updates.values()) + [slug]
    try:
        conn.execute(f"UPDATE products SET {sets} WHERE slug = ?", vals)
        print(f"  ✅ {slug}: {', '.join(updates.keys())}")
    except Exception as e:
        print(f"  ❌ {slug}: {e}")

conn.commit()
conn.close()
print(f"\nDone. Updated {len(ALL)} products in local database.")
