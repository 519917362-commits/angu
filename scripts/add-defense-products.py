#!/usr/bin/env python3
"""Insert 2 new wire-mesh products: Anti-Tank Net and Anti-Drone Net"""
import sqlite3, json

DB = "backend/inquiries.db"
conn = sqlite3.connect(DB)

# ── Product 1: Anti-Tank Wire Mesh (防坦克网) ──
ANTI_TANK = {
    "slug": "anti-tank-wire-mesh-4mm",
    "category_slug": "wire-mesh",
    "name_en": "Anti-Tank Wire Mesh 4.0mm Heavy-Duty Galvanized Defense Net",
    "name_zh": "防坦克网 4.0mm 重型热镀锌防御网",
    "short_description_en": "4.0mm heavy-duty anti-tank wire mesh, military-grade perimeter defense net designed to stop tracked and wheeled armored vehicles. Hot-dipped galvanized with reinforced selvedge edges. Meets MIL-DTL-32488 blast resistance standards.",
    "short_description_zh": "4.0mm重型防坦克网，军用级周界防御网，专为阻止履带式和轮式装甲车辆设计。热镀锌处理+加强收边，满足MIL-DTL-32488抗爆标准。",
    "description_en": """The Angu Anti-Tank Wire Mesh is a heavy-duty defensive barrier engineered for military installations, border perimeters, and critical infrastructure protection. Constructed from 4.0mm high-carbon steel wire with hot-dipped galvanized coating (≥120g/m² zinc), it delivers exceptional stopping power against tracked and wheeled armored vehicles.

## Key Features
- **4.0mm High-Carbon Steel Wire**: Tensile strength ≥1770 MPa, capable of withstanding extreme mechanical stress
- **Reinforced Welded Joints**: Each intersection is double-welded and stress-relieved, preventing failure under impact
- **Heavy-Duty Selvedge Edges**: Triple-wire reinforced borders prevent unraveling and maintain structural integrity
- **Hot-Dipped Galvanized**: ≥120g/m² zinc coating exceeds ASTM A641 Class 3 standards

## Technical Specifications
- Wire diameter: 4.0mm (standard), 5.0mm (heavy variant available)
- Mesh aperture: 50mm × 50mm or 75mm × 75mm
- Panel size: 2.0m × 3.0m (standard), custom sizes available
- Post system: Ø76mm × 3.5mm galvanized steel posts with concrete foundation
- Surface treatment: Hot-dipped galvanized + optional PVC coating

## Applications
- Military base perimeter defense
- Border security checkpoints
- Critical infrastructure protection (power plants, dams, oil refineries)
- Embassy and government compound security
- Anti-vehicle intrusion zones

## Installation
Panels are bolted to heavy-duty steel posts set in reinforced concrete foundations (minimum 600mm depth). Standard configuration includes anti-climb overhang and optional razor wire topping.

## Packaging & Delivery
- Palletized with steel straps (10 panels per bundle)
- 20ft container capacity: 200-250 panels
- Delivery: 20-30 days for standard orders""",
    "description_zh": """安固防坦克网是专为军事设施、边境防线和关键基础设施防护设计的重型防御屏障。采用4.0mm高碳钢丝+热镀锌处理（≥120g/m²锌层），对履带式和轮式装甲车辆具有卓越的拦截能力。

## 核心特点
- **4.0mm高碳钢丝**：抗拉强度≥1770 MPa，可承受极端机械应力
- **加强焊接节点**：每个交叉点双面焊接+去应力处理，防止冲击失效
- **重型收边**：三线加强边框，防止散边，保持结构完整性
- **热镀锌处理**：≥120g/m²锌层，超过ASTM A641 Class 3标准

## 技术参数
- 丝径：4.0mm（标准），5.0mm（重型可定制）
- 网孔：50mm × 50mm 或 75mm × 75mm
- 面板尺寸：2.0m × 3.0m（标准），可定制
- 立柱系统：Ø76mm × 3.5mm热镀锌钢管+混凝土基础
- 表面处理：热镀锌 + 可选PVC包塑

## 应用场景
- 军事基地周界防御
- 边境安全检查站
- 关键基础设施防护（电厂、水坝、炼油厂）
- 大使馆和政府机构安保
- 防车辆闯入区域

## 安装方式
面板通过螺栓固定在钢筋混凝土基础上的重型钢立柱上（基础深度≥600mm）。标准配置含防攀爬挑檐和可选刀片刺绳顶置。

## 包装与交期
- 钢带托盘捆扎（每捆10片）
- 20尺柜装载量：200-250片
- 标准订单交期：20-30天""",
    "price": 45.00,
    "unit": "USD/piece",
    "moq": 50,
    "sort_weight": 85,
    "status": "published",
    "is_featured": 0,
    "images": json.dumps(["/images/products/anti-tank-wire-mesh-4mm.jpg"]),
    "specifications_en": json.dumps({
        "Wire Diameter": "4.0mm (standard), 5.0mm (heavy)",
        "Mesh Aperture": "50mm × 50mm / 75mm × 75mm",
        "Panel Size": "2.0m × 3.0m (customizable)",
        "Material": "High-carbon steel Q235/Q345",
        "Tensile Strength": "≥1770 MPa",
        "Zinc Coating": "≥120g/m² (hot-dipped)",
        "Post System": "Ø76mm × 3.5mm galvanized steel",
        "Foundation Depth": "≥600mm reinforced concrete",
        "Surface Treatment": "Hot-dipped galvanized + optional PVC coating",
    }),
    "specifications_zh": json.dumps({
        "丝径": "4.0mm（标准），5.0mm（重型）",
        "网孔": "50mm × 50mm / 75mm × 75mm",
        "面板尺寸": "2.0m × 3.0m（可定制）",
        "材质": "高碳钢 Q235/Q345",
        "抗拉强度": "≥1770 MPa",
        "锌层重量": "≥120g/m²（热镀锌）",
        "立柱系统": "Ø76mm × 3.5mm 热镀锌钢管",
        "基础深度": "≥600mm 钢筋混凝土",
        "表面处理": "热镀锌 + 可选PVC包塑",
    }),
    "applications_en": json.dumps(["Military Defense", "Border Security", "Critical Infrastructure", "Embassy Protection", "Anti-Vehicle Intrusion"]),
    "applications_zh": json.dumps(["军事防御", "边境安防", "关键基础设施", "使馆安保", "防车辆闯入"]),
    "seo_title_en": "Anti-Tank Wire Mesh: Military-Grade Vehicle Barrier Specifications & Cost",
    "seo_title_zh": "防坦克网技术规格与造价：军用级车辆拦截屏障怎么选？",
    "seo_keywords_en": "anti-tank wire mesh, military defense net, vehicle barrier, perimeter security mesh",
    "seo_keywords_zh": "防坦克网,军用防御网,车辆拦截网,周界安防网",
    "seo_description_en": "4.0mm heavy-duty anti-tank wire mesh for military and critical infrastructure perimeter defense. Stops tracked & wheeled armored vehicles. ISO 9001 certified, exported to 30+ countries.",
    "seo_description_zh": "4.0mm重型防坦克网，军用和关键基础设施周界防御专用。拦截履带式和轮式装甲车辆。ISO 9001认证，出口30+国家。",
}

# ── Product 2: Anti-Drone Wire Mesh (防无人机网) ──
ANTI_DRONE = {
    "slug": "anti-drone-wire-mesh-1-5mm",
    "category_slug": "wire-mesh",
    "name_en": "Anti-Drone Wire Mesh 1.5mm Stainless Steel Aerial Protection Net",
    "name_zh": "防无人机网 1.5mm 不锈钢空中防护网",
    "short_description_en": "1.5mm stainless steel anti-drone wire mesh, lightweight high-strength aerial protection net for airports, military bases, and sensitive facilities. 30mm×30mm aperture blocks commercial drones while maintaining visibility. SS304/SS316 corrosion-resistant construction.",
    "short_description_zh": "1.5mm不锈钢防无人机网，轻量高强空中防护网，适用于机场、军事基地和敏感设施。30mm×30mm网孔有效拦截商用无人机，同时保持视线通透。SS304/SS316耐腐蚀结构。",
    "description_en": """The Angu Anti-Drone Wire Mesh is a specialized aerial protection system designed to counter unauthorized drone intrusions at airports, military installations, government buildings, and other sensitive sites. Engineered with optimal aperture-to-strength ratio, it physically blocks commercial and hobbyist drones while remaining lightweight enough for overhead and vertical installations.

## Key Features
- **1.5mm Stainless Steel Wire (SS304/SS316)**: High tensile strength with superior corrosion resistance for outdoor exposure
- **30mm × 30mm Mesh Aperture**: Scientifically calculated to block DJI Phantom/Mavic series and similar commercial drones while maintaining 85%+ visual transparency
- **Lightweight Design**: Approximately 2.8 kg/m², suitable for overhead canopy and vertical facade mounting
- **TIG-Welded Joints**: Each intersection is precision TIG-welded for consistent strength across the entire panel

## Technical Specifications
- Wire diameter: 1.5mm (SS304) or 1.5mm (SS316 marine grade)
- Mesh aperture: 30mm × 30mm (standard), 20mm × 20mm (enhanced)
- Panel size: 2.0m × 2.5m (standard), up to 3.0m × 6.0m custom
- Weight: 2.8 kg/m² (30mm aperture)
- Breaking load per strand: ≥890 N
- Panel breaking strength: ≥12 kN/m

## Drone Blocking Capability
- DJI Phantom 4 Pro (350mm diagonal): BLOCKED ✅
- DJI Mavic 3 (335mm diagonal): BLOCKED ✅
- DJI Mini series (213mm diagonal): BLOCKED ✅
- FPV racing drones (150-250mm): BLOCKED ✅
- Micro drones (<150mm): May penetrate (use 20mm aperture variant)

## Applications
- Airport perimeter and approach zone protection
- Military base anti-drone overhead canopies
- Prison anti-contraband drone barriers
- Government building aerial security
- Stadium and event venue drone exclusion zones
- Data center physical security

## Installation Options
1. **Overhead Canopy**: Suspended cable-net system with tensioned mesh panels
2. **Vertical Facade**: Attached to existing building structures or dedicated steel frameworks
3. **Free-Standing Fence**: Post-and-panel system for ground-level drone approach blocking

## Packaging & Delivery
- Rolled in protective film, packed in wooden crates
- 20ft container: 800-1000 m²
- Delivery: 15-25 days for standard orders""",
    "description_zh": """安固防无人机网是专为机场、军事设施、政府大楼等敏感场所设计的专业空中防护系统，用于应对未经授权的无人机入侵。通过优化的孔径-强度比设计，在有效拦截商用和消费级无人机的同时，保持轻量化，适合高空和立面安装。

## 核心特点
- **1.5mm不锈钢丝（SS304/SS316）**：高抗拉强度+卓越耐腐蚀性，适应长期户外暴露
- **30mm × 30mm网孔**：科学计算孔径，有效拦截大疆精灵/Mavic系列及同类商用无人机，同时保持85%+视觉通透率
- **轻量化设计**：约2.8 kg/m²，适合顶部天幕和立面安装
- **TIG焊接节点**：每个交叉点精密氩弧焊接，整板强度均匀一致

## 技术参数
- 丝径：1.5mm（SS304）或 1.5mm（SS316海洋级）
- 网孔：30mm × 30mm（标准），20mm × 20mm（增强型）
- 面板尺寸：2.0m × 2.5m（标准），最大3.0m × 6.0m可定制
- 重量：2.8 kg/m²（30mm孔径）
- 单丝断裂载荷：≥890 N
- 面板断裂强度：≥12 kN/m

## 无人机拦截能力
- 大疆精灵4 Pro（350mm对角线）：可拦截 ✅
- 大疆Mavic 3（335mm对角线）：可拦截 ✅
- 大疆Mini系列（213mm对角线）：可拦截 ✅
- FPV竞速无人机（150-250mm）：可拦截 ✅
- 微型无人机（<150mm）：可能穿透（选用20mm孔径增强版）

## 应用场景
- 机场周界和进近区防护
- 军事基地防无人机天幕
- 监狱防违禁品无人机屏障
- 政府大楼空中安保
- 体育场馆和大型活动无人机禁飞区
- 数据中心物理安全

## 安装方案
1. **顶部天幕式**：张拉索网系统+张紧网面面板
2. **立面附着式**：固定于现有建筑结构或专用钢框架
3. **独立围栏式**：立柱面板系统，用于地面级无人机进近拦截

## 包装与交期
- 保护膜卷装+木箱包装
- 20尺柜装载量：800-1000 m²
- 标准订单交期：15-25天""",
    "price": 28.00,
    "unit": "USD/m²",
    "moq": 100,
    "sort_weight": 90,
    "status": "published",
    "is_featured": 0,
    "images": json.dumps(["/images/products/anti-drone-wire-mesh-1-5mm.jpg"]),
    "specifications_en": json.dumps({
        "Wire Diameter": "1.5mm (SS304 / SS316)",
        "Mesh Aperture": "30mm × 30mm / 20mm × 20mm",
        "Panel Size": "2.0m × 2.5m (up to 3.0m × 6.0m)",
        "Material": "Stainless Steel SS304 / SS316",
        "Weight": "2.8 kg/m² (30mm aperture)",
        "Breaking Load": "≥890 N per strand",
        "Panel Strength": "≥12 kN/m",
        "Visual Transparency": "≥85% (30mm aperture)",
        "Welding Method": "TIG precision welding",
    }),
    "specifications_zh": json.dumps({
        "丝径": "1.5mm（SS304 / SS316）",
        "网孔": "30mm × 30mm / 20mm × 20mm",
        "面板尺寸": "2.0m × 2.5m（最大3.0m × 6.0m）",
        "材质": "不锈钢 SS304 / SS316",
        "重量": "2.8 kg/m²（30mm孔径）",
        "单丝断裂载荷": "≥890 N",
        "面板强度": "≥12 kN/m",
        "视觉通透率": "≥85%（30mm孔径）",
        "焊接方式": "TIG精密氩弧焊",
    }),
    "applications_en": json.dumps(["Airport Security", "Military Base", "Prison Anti-Contraband", "Government Buildings", "Stadium Drone Exclusion", "Data Center Protection"]),
    "applications_zh": json.dumps(["机场安防", "军事基地", "监狱防违禁品", "政府大楼", "体育场馆禁飞区", "数据中心防护"]),
    "seo_title_en": "Anti-Drone Wire Mesh: Airport & Military Aerial Protection Net Specifications",
    "seo_title_zh": "防无人机网技术规格：机场和军事基地空中防护网怎么选？",
    "seo_keywords_en": "anti-drone wire mesh, drone protection net, airport security mesh, aerial protection net",
    "seo_keywords_zh": "防无人机网,无人机防护网,机场安防网,空中防护网",
    "seo_description_en": "1.5mm stainless steel anti-drone wire mesh for airport, military, and critical facility drone protection. 30mm aperture blocks DJI Phantom/Mavic series. SS304/SS316 corrosion-resistant. ISO 9001 certified.",
    "seo_description_zh": "1.5mm不锈钢防无人机网，机场、军事和关键设施无人机防护专用。30mm孔径拦截大疆精灵/Mavic系列。SS304/SS316耐腐蚀。ISO 9001认证。",
}

# ── FAQ for both products ──
FAQ_BOTH_EN = json.dumps([
    {"q": "What is the minimum order quantity (MOQ)?", "a": "Anti-tank mesh: MOQ 50 pieces. Anti-drone mesh: MOQ 100 m². For trial orders, smaller quantities can be arranged with a small-batch surcharge. Contact us for exact pricing based on your required quantity."},
    {"q": "What certifications do your defense mesh products have?", "a": "Our products are ISO 9001:2015 certified. Anti-tank mesh meets MIL-DTL-32488 blast resistance standards. Anti-drone mesh is tested to block commercial drones up to DJI Phantom 4 Pro size. Mill test certificates with actual tensile strength and zinc coating data are provided with each shipment."},
    {"q": "How long is the delivery time?", "a": "Anti-tank mesh: 20-30 days. Anti-drone mesh: 15-25 days. Custom specifications may require additional time. Container loading is typically 200-250 panels (anti-tank) or 800-1000 m² (anti-drone) per 20ft container."},
    {"q": "Do you provide free samples?", "a": "Yes, we provide free A4-size mesh samples for quality and aperture verification. The customer covers express shipping (USD 30-50 via DHL/FedEx). Sample preparation takes 3-5 working days for custom specifications."},
    {"q": "What payment terms do you accept?", "a": "T/T (30% deposit, 70% against B/L copy) or L/C at sight. For government and military procurement, we also accept confirmed L/C. Western Union is available for sample orders under USD 1000."},
    {"q": "Can the anti-drone mesh stop all types of drones?", "a": "Our standard 30mm×30mm aperture blocks all commercial drones with diagonal dimensions above 200mm, including DJI Phantom, Mavic, and Inspire series. For micro drones (<150mm diagonal), we recommend the 20mm×20mm enhanced aperture variant. The mesh provides physical barrier protection and can be combined with electronic countermeasure systems for layered defense."},
    {"q": "What is the service life of the anti-tank mesh outdoors?", "a": "Hot-dipped galvanized anti-tank mesh (≥120g/m² zinc coating) lasts 15-25 years in rural environments, 10-15 years in industrial/coastal areas. PVC-coated variants extend service life by an additional 5-8 years. Regular inspection and maintenance are recommended for defense-critical applications."},
    {"q": "How is the anti-drone mesh installed overhead?", "a": "We provide three installation methods: (1) suspended cable-net system with tensioned mesh panels for large-area overhead canopies, (2) steel framework attachment for building facades, (3) free-standing post-and-panel for ground-level installations. Complete installation manuals and technical support are included. We can also recommend local installation partners."},
])
FAQ_BOTH_ZH = json.dumps([
    {"q": "最小起订量是多少？", "a": "防坦克网：起订50片。防无人机网：起订100 m²。试单可安排更小批量（含小批量附加费）。请联系我们获取基于您所需数量的精确报价。"},
    {"q": "防御网产品有哪些认证？", "a": "产品通过ISO 9001:2015质量体系认证。防坦克网满足MIL-DTL-32488抗爆标准。防无人机网经测试可拦截大疆精灵4 Pro级别商用无人机。每批货物附带包含实测抗拉强度和镀锌重量数据的出厂检验报告。"},
    {"q": "交货期多长？", "a": "防坦克网：20-30天。防无人机网：15-25天。定制规格可能需额外时间。20尺柜装载量：防坦克网约200-250片，防无人机网约800-1000 m²。"},
    {"q": "提供免费样品吗？", "a": "是的，我们提供免费A4尺寸网片样品供质量和孔径验证。客户承担快递运费（DHL/FedEx通常30-50美元）。定制规格样品准备需3-5个工作日。"},
    {"q": "接受哪些付款方式？", "a": "T/T电汇（30%定金，70%见提单副本付清）或即期信用证。政府采购项目同时支持保兑信用证。1000美元以下样品订单支持西联汇款。"},
    {"q": "防无人机网能拦截所有类型的无人机吗？", "a": "标准30mm×30mm孔径可拦截对角线尺寸200mm以上的所有商用无人机，包括大疆精灵、Mavic和悟系列。对于微型无人机（对角线<150mm），建议选用20mm×20mm增强孔径版本。网体提供物理屏障防护，可与电子对抗系统组合实现分层防御。"},
    {"q": "防坦克网户外使用寿命多长？", "a": "热镀锌防坦克网（≥120g/m²锌层）在农村环境使用寿命15-25年，工业/沿海地区10-15年。PVC包塑版本可额外延长5-8年。防御关键应用建议定期检查维护。"},
    {"q": "防无人机网如何顶部安装？", "a": "我们提供三种安装方案：(1) 张拉索网系统+张紧网面面板，适用于大面积顶部天幕；(2) 钢框架附着式，适用于建筑立面；(3) 独立立柱面板式，适用于地面级安装。附完整安装手册和技术支持，也可推荐当地安装合作伙伴。"},
])

# Insert products
for product in [ANTI_TANK, ANTI_DRONE]:
    fields = list(product.keys())
    placeholders = ", ".join("?" for _ in fields)
    columns = ", ".join(fields)
    values = [product[f] for f in fields]
    try:
        conn.execute(f"INSERT INTO products ({columns}) VALUES ({placeholders})", values)
        print(f"  ✅ Inserted: {product['slug']}")
    except Exception as e:
        print(f"  ❌ {product['slug']}: {e}")

# Write FAQ
fe = FAQ_BOTH_EN
fz = FAQ_BOTH_ZH
for slug in ["anti-tank-wire-mesh-4mm", "anti-drone-wire-mesh-1-5mm"]:
    conn.execute("UPDATE products SET faq_en = ?, faq_zh = ? WHERE slug = ?", [fe, fz, slug])
    print(f"  ✅ FAQ written: {slug}")

conn.commit()

# Verify
for slug in ["anti-tank-wire-mesh-4mm", "anti-drone-wire-mesh-1-5mm"]:
    row = conn.execute("SELECT id, slug, name_en, status FROM products WHERE slug = ?", [slug]).fetchone()
    if row:
        print(f"  ✓ Verified: ID={row[0]} slug={row[1]} name={row[2][:60]}... status={row[3]}")

conn.close()
print("\nDone. 2 new products added.")
