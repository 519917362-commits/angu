#!/usr/bin/env node
/**
 * mig-date-data.js — 从静态产品数据同步到 SQLite 数据库
 * 
 * 做什么：
 * 1. 修复 schema：UNIQUE 约束从 (slug) 改为 (slug, locale)
 * 2. 更新现有 en locale products 行：specs/apps/seo/images/descriptions
 * 3. 插入 zh locale products 行（28条）
 * 4. 插入 zh locale categories 行（9条）
 */

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, 'inquiries.db');

// ══════════════════════════════════════════════
// 静态数据：基于 src/lib/data/products.ts v1690
// ══════════════════════════════════════════════

const categoryNamesZH = {
  'wire-mesh': '丝网类',
  'fence': '护栏网类',
  'barbed-wire': '刺绳',
  'slope-protection': '边坡防护网',
  'blast-wall': '防爆石笼网/防爆墙',
  'gabion': '石笼网',
  'stainless-rope-net': '不锈钢绳网',
  'crowd-barrier': '防爆护栏/演唱会护栏',
  'noise-barrier': '声屏障',
};

// 产品静态数据：slug → { names, shortDesc, fullDesc, specs, apps, images }
const productsStatic = [
  {
    slug: 'welded-wire-mesh-50mm',
    categorySlug: 'wire-mesh',
    nameEn: 'Welded Wire Mesh 50mm × 2.0mm Galvanized',
    nameZh: '电焊网 50mm × 2.0mm 镀锌',
    shortDescEn: 'Hot-dipped galvanized welded wire mesh with 50mm square opening and 2.0mm wire. Ideal for construction reinforcement and fencing.',
    shortDescZh: '热镀锌电焊网，50mm方孔，2.0mm丝径。适用于建筑加固和围栏。',
    fullDescEn: 'Our welded wire mesh is manufactured from high-quality low carbon steel wires, welded at every intersection to create a strong, uniform grid. Hot-dipped galvanization ensures long-term corrosion resistance.\n\n**Specifications:**\n- Mesh Opening: 50mm × 50mm\n- Wire Diameter: 2.0mm (1.5-3.0mm available)\n- Width: 1.0m / 1.2m / 1.5m / 2.0m\n- Length: 30m standard roll\n- Surface: Hot-dipped galvanized (≥80g/m²)\n- Tensile Strength: ≥380 N/mm²\n\n**Applications:**\n- Construction reinforcement (concrete slab, wall)\n- Animal enclosures and cages\n- Garden fencing\n- Industrial machine guards',
    fullDescZh: '我们的电焊网采用优质低碳钢丝制造，每个交点均焊接形成坚固均匀的网格。热镀锌处理确保长期耐腐蚀。\n\n**规格参数：**\n- 网孔：50mm × 50mm\n- 丝径：2.0mm（1.5-3.0mm 可选）\n- 宽度：1.0m / 1.2m / 1.5m / 2.0m\n- 长度：30m 标准卷\n- 表面：热镀锌（≥80g/m²）\n- 抗拉强度：≥380 N/mm²\n\n**应用场景：**\n- 建筑加固（混凝土板、墙体）\n- 动物圈舍和笼具\n- 花园围栏\n- 工业机器防护罩',
    specs: { meshAperture: '50mm × 50mm', wireDiameter: '2.0mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)', material: 'Low Carbon Steel Wire', width: '1.0m / 1.2m / 1.5m / 2.0m', length: '30m standard roll', tensileStrength: '≥380 N/mm²' },
    apps: ['Construction reinforcement', 'Animal cages', 'Garden fencing', 'Machine guards'],
    images: ['/images/products/welded-wire-mesh.jpg'],
    priceUsd: 28, unit: 'FOB Tianjin, per roll', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Welded Wire Mesh 50mm Galvanized | Angu Wire Mesh', keywords: 'welded wire mesh, galvanized wire mesh, construction mesh, 50mm mesh', description: 'Premium hot-dipped galvanized welded wire mesh, 50mm×50mm opening, 2.0mm wire. Ideal for construction reinforcement, animal enclosures, and fencing.' },
  },
  {
    slug: 'chain-link-fence-50mm',
    categorySlug: 'wire-mesh',
    nameEn: 'Chain Link Fence 50mm × 2.5mm Galvanized',
    nameZh: '勾花网 50mm × 2.5mm 镀锌',
    shortDescEn: 'Diamond-pattern chain link fence with 50mm mesh and 2.5mm wire. Heavy-duty galvanized for security and boundary applications.',
    shortDescZh: '菱形勾花网，50mm网孔，2.5mm丝径。重型镀锌，用于安全和边界围栏。',
    fullDescEn: 'Our chain link fences feature a classic diamond pattern that provides both visibility and security. Manufactured from hot-dipped galvanized steel wire for maximum durability.\n\n**Specifications:**\n- Mesh Size: 50mm × 50mm (2" × 2")\n- Wire Diameter: 2.5mm\n- Height: 1.0m to 4.0m available\n- Roll Length: 10m / 15m / 20m\n- Surface: Hot-dipped galvanized (≥60g/m²)\n- Selvage: Knuckled or twisted\n\n**Applications:**\n- Sports field fencing\n- Construction site boundaries\n- Industrial perimeter security\n- Residential property boundaries',
    fullDescZh: '我们的勾花网采用经典菱形图案，兼顾通透性和安全性。热镀锌钢丝制造，耐用性极佳。\n\n**规格参数：**\n- 网孔：50mm × 50mm（2" × 2"）\n- 丝径：2.5mm\n- 高度：1.0m 至 4.0m 可选\n- 卷长：10m / 15m / 20m\n- 表面：热镀锌（≥60g/m²）\n- 锁边：翻转式或绞扭式\n\n**应用场景：**\n- 运动场地围栏\n- 工地边界\n- 工业周界安防\n- 住宅地产边界',
    specs: { meshAperture: '50mm × 50mm', wireDiameter: '2.5mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥60g/m²)', material: 'Low Carbon Steel Wire', height: '1.0m - 4.0m', rollLength: '10m / 15m / 20m' },
    apps: ['Sports fields', 'Construction sites', 'Industrial security', 'Residential'],
    images: ['/images/products/chain-link.jpg'],
    priceUsd: 25, unit: 'FOB Tianjin, per roll', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Chain Link Fence 50mm Galvanized | Angu Wire Mesh', keywords: 'chain link fence, diamond mesh, galvanized fence, security fence', description: 'Durable diamond-pattern chain link fence, 50mm mesh, 2.5mm wire. Hot-dipped galvanized for sports fields, construction sites, and perimeter security.' },
  },
  {
    slug: 'hexagonal-wire-mesh-25mm',
    categorySlug: 'wire-mesh',
    nameEn: 'Hexagonal Wire Mesh 25mm (1") Galvanized',
    nameZh: '六角网 25mm (1英寸) 镀锌',
    shortDescEn: 'Double-twist hexagonal wire mesh with 25mm opening. Used for gabion baskets, chicken wire, and general protection.',
    shortDescZh: '双绞六角网，25mm网孔。用于石笼篮、养鸡网和一般防护。',
    fullDescEn: 'Our hexagonal wire mesh is woven using the double-twist technique, providing excellent flexibility and structural integrity. Available in various mesh sizes for diverse applications.\n\n**Specifications:**\n- Mesh Type: Double twist hexagonal\n- Mesh Size: 25mm (1")\n- Wire Diameter: 0.8mm (0.5-1.2mm available)\n- Width: 1.0m / 1.2m / 1.5m / 2.0m\n- Length: 30m standard roll\n- Surface: Hot-dipped galvanized (≥80g/m²)\n\n**Applications:**\n- Small gabion baskets\n- Poultry and animal enclosures\n- Garden fencing\n- Tree guards',
    fullDescZh: '我们的六角网采用双绞编织工艺，提供优异的柔韧性和结构完整性。多种网孔规格满足不同应用需求。\n\n**规格参数：**\n- 网型：双绞六角形\n- 网孔：25mm（1"）\n- 丝径：0.8mm（0.5-1.2mm 可选）\n- 宽度：1.0m / 1.2m / 1.5m / 2.0m\n- 长度：30m 标准卷\n- 表面：热镀锌（≥80g/m²）\n\n**应用场景：**\n- 小型石笼篮\n- 家禽和动物围栏\n- 花园围栏\n- 树木防护',
    specs: { meshAperture: '25mm (1")', wireDiameter: '0.8mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)', material: 'Low Carbon Steel Wire', width: '1.0m / 1.2m / 1.5m / 2.0m', length: '30m standard roll' },
    apps: ['Gabion baskets', 'Poultry enclosures', 'Garden fencing', 'Tree guards'],
    images: ['/images/products/hexagonal-mesh.jpg'],
    priceUsd: 22, unit: 'FOB Tianjin, per roll', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Hexagonal Wire Mesh 25mm Galvanized | Angu Wire Mesh', keywords: 'hexagonal wire mesh, chicken wire, gabion mesh, double twist mesh', description: 'Double-twist hexagonal wire mesh with 25mm opening. Hot-dipped galvanized for gabion baskets, poultry enclosures, and garden fencing.' },
  },
  {
    slug: 'holland-wire-mesh-50mm',
    categorySlug: 'wire-mesh',
    nameEn: 'Holland Wire Mesh (Euro Fence) 50mm × 2.0mm',
    nameZh: '荷兰网（欧式围栏）50mm × 2.0mm',
    shortDescEn: 'PVC coated Holland wire mesh (Euro fence) with wave-shaped horizontal wire. Aesthetic and durable for residential and commercial fencing.',
    shortDescZh: 'PVC包塑荷兰网（欧式围栏），波浪形横丝。美观耐用，适用于住宅和商业围栏。',
    fullDescEn: 'Holland wire mesh, also known as Euro fence, features a distinctive wave-shaped horizontal wire that adds both strength and aesthetic appeal. The PVC coating provides excellent weather resistance.\n\n**Specifications:**\n- Mesh Size: 50mm × 50mm / 50mm × 100mm\n- Wire Diameter: 2.0mm core + 0.5mm PVC\n- Post: 48mm round tube with plastic cap\n- Height: 1.0m / 1.2m / 1.5m / 1.8m / 2.0m\n- Colors: Green, Black, White\n- Surface: PVC coated over galvanized wire\n\n**Applications:**\n- Residential gardens\n- Parks and green spaces\n- Highway green belts\n- Farm boundaries',
    fullDescZh: '荷兰网又称欧式围栏，采用独特的波浪形横丝设计，兼顾强度与美观。PVC涂层提供优异的耐候性。\n\n**规格参数：**\n- 网孔：50mm × 50mm / 50mm × 100mm\n- 丝径：2.0mm 芯线 + 0.5mm PVC\n- 立柱：48mm 圆管配塑料帽\n- 高度：1.0m / 1.2m / 1.5m / 1.8m / 2.0m\n- 颜色：绿色、黑色、白色\n- 表面：镀锌后PVC包塑\n\n**应用场景：**\n- 住宅花园\n- 公园绿地\n- 公路绿化带\n- 农场边界',
    specs: { meshAperture: '50mm × 50mm / 50mm × 100mm', wireDiameter: '2.0mm core + 0.5mm PVC', surfaceTreatment: 'PVC Coated (over galvanized)', material: 'Low Carbon Steel + PVC', height: '1.0m - 2.0m', colors: 'Green, Black, White' },
    apps: ['Residential gardens', 'Parks', 'Highway green belts', 'Farm boundaries'],
    images: ['/images/products/holland-mesh.jpg'],
    priceUsd: 35, unit: 'FOB Tianjin, per roll', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Holland Wire Mesh Euro Fence PVC Coated | Angu Wire Mesh', keywords: 'holland wire mesh, euro fence, PVC coated fence, garden fencing', description: 'Premium PVC coated Holland wire mesh (Euro fence), 50mm×50mm, 2.0mm wire. Aesthetic and weather-resistant for residential gardens and parks.' },
  },
  {
    slug: 'crimped-wire-mesh-10mm',
    categorySlug: 'wire-mesh',
    nameEn: 'Crimped Wire Mesh 10mm × 2.0mm Stainless Steel',
    nameZh: '轧花网 10mm × 2.0mm 不锈钢',
    shortDescEn: 'Stainless steel crimped wire mesh with 10mm square opening. Pre-crimped wires for high-tension screening and filtering applications.',
    shortDescZh: '不锈钢轧花网，10mm方孔。预弯成型，用于高张力筛分和过滤。',
    fullDescEn: 'Our crimped wire mesh is made by pre-crimping wires before weaving, creating a rigid mesh structure that maintains its shape under tension. Stainless steel option offers superior corrosion resistance.\n\n**Specifications:**\n- Mesh Opening: 10mm × 10mm (2-50mm available)\n- Wire Diameter: 2.0mm (1.0-5.0mm available)\n- Material: 304/316 Stainless Steel\n- Width: 1.0m / 1.5m\n- Length: Custom\n- Weave Type: Pre-crimped / lock crimped\n\n**Applications:**\n- Mining and quarry screening\n- Food processing filters\n- Chemical industry sieving\n- Architectural decoration',
    fullDescZh: '我们的轧花网采用预弯丝编织工艺，形成刚性网格结构，在拉伸条件下保持形状。不锈钢材质提供卓越的耐腐蚀性能。\n\n**规格参数：**\n- 网孔：10mm × 10mm（2-50mm 可选）\n- 丝径：2.0mm（1.0-5.0mm 可选）\n- 材质：304/316 不锈钢\n- 宽度：1.0m / 1.5m\n- 长度：定制\n- 编织方式：预弯式 / 锁弯式\n\n**应用场景：**\n- 矿山采石筛分\n- 食品加工过滤\n- 化工行业筛分\n- 建筑装饰',
    specs: { meshAperture: '10mm × 10mm', wireDiameter: '2.0mm', surfaceTreatment: 'Stainless Steel (304/316)', material: 'Stainless Steel Wire', width: '1.0m / 1.5m', weaveType: 'Pre-crimped / Lock crimped' },
    apps: ['Mining screening', 'Food filters', 'Chemical sieving', 'Architecture'],
    images: ['/images/products/crimped-mesh.jpg'],
    priceUsd: 85, unit: 'FOB Tianjin, per m²', moq: 10, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Crimped Wire Mesh 10mm Stainless Steel | Angu Wire Mesh', keywords: 'crimped wire mesh, stainless steel mesh, screening mesh, filter mesh', description: 'Stainless steel 304/316 crimped wire mesh, 10mm×10mm opening, 2.0mm wire. Pre-crimped for high-tension screening and industrial filtration.' },
  },
  {
    slug: 'cattle-fence-150mm',
    categorySlug: 'wire-mesh',
    nameEn: 'Cattle Fence (Field Fence) 150mm × 2.5mm',
    nameZh: '牛栏网（草原网）150mm × 2.5mm',
    shortDescEn: 'Heavy-duty field fence with graduated mesh spacing. Top wires closer, bottom wider. For cattle, horses, and livestock containment.',
    shortDescZh: '重型草原网，渐变网孔间距。上部密下部宽，用于牛羊马等牲畜围栏。',
    fullDescEn: 'Our cattle fence (field fence) features a graduated mesh design with smaller openings at the bottom to prevent small animals from passing through, and larger openings at the top for cost efficiency.\n\n**Specifications:**\n- Top Mesh: 150mm / 200mm / 300mm\n- Bottom Mesh: 100mm / 150mm\n- Wire Diameter: 2.5mm top / 2.0mm bottom\n- Height: 1.2m / 1.5m / 1.8m / 2.0m\n- Roll Length: 50m / 100m\n- Surface: Hot-dipped galvanized (≥120g/m²)\n- Knot Type: Hinge joint knot\n\n**Applications:**\n- Cattle and horse pastures\n- Sheep and goat enclosures\n- Wildlife reserves\n- Farm boundary fencing',
    fullDescZh: '我们的牛栏网（草原网）采用渐变网格设计，底部网孔较小防止小动物通过，顶部网孔较大以控制成本。\n\n**规格参数：**\n- 上部网孔：150mm / 200mm / 300mm\n- 下部网孔：100mm / 150mm\n- 丝径：项线2.5mm / 底线2.0mm\n- 高度：1.2m / 1.5m / 1.8m / 2.0m\n- 卷长：50m / 100m\n- 表面：热镀锌（≥120g/m²）\n- 结点类型：铰链结\n\n**应用场景：**\n- 牛马牧场\n- 羊群围栏\n- 野生动物保护区\n- 农场边界围栏',
    specs: { meshAperture: 'Graduated: 100-300mm', wireDiameter: '2.0-2.5mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥120g/m²)', material: 'High Tensile Steel Wire', height: '1.2m - 2.0m', rollLength: '50m / 100m', knotType: 'Hinge joint' },
    apps: ['Cattle pastures', 'Horse enclosures', 'Wildlife reserves', 'Farm boundaries'],
    images: ['/images/products/cattle-fence.jpg'],
    priceUsd: 45, unit: 'FOB Tianjin, per roll', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Cattle Fence Field Fence 150mm Galvanized | Angu Wire Mesh', keywords: 'cattle fence, field fence, livestock fence, hinge joint fence', description: 'Heavy-duty field fence with graduated mesh, 150mm top opening, 2.5mm wire. Hot-dipped galvanized for cattle, horses, and livestock containment.' },
  },
  {
    slug: 'stadium-fence-50mm',
    categorySlug: 'fence',
    nameEn: 'Stadium Fence (Sports Field Fence) 50mm × 3.0mm',
    nameZh: '球场围网 50mm × 3.0mm',
    shortDescEn: 'Heavy-duty stadium fence with 50mm mesh and 3.0mm wire. PVC coated green, with posts and accessories. For football, basketball, tennis courts.',
    shortDescZh: '重型球场围网，50mm网孔，3.0mm丝径。PVC包塑绿色，含立柱配件。用于足球、篮球、网球场。',
    fullDescEn: 'Our stadium fences are designed for high-impact sports applications. The heavy-gauge wire and tight mesh spacing prevent ball penetration while maintaining visibility.\n\n**Specifications:**\n- Mesh Size: 50mm × 50mm\n- Wire Diameter: 3.0mm core + 0.8mm PVC\n- Height: 3.0m / 4.0m / 6.0m\n- Post: 60mm × 60mm × 2.5mm square tube\n- Color: Green (RAL 6005) / Blue\n- Surface: PVC coated over hot-dipped galvanized\n- Accessories: Post caps, tension wires, clips\n\n**Applications:**\n- Football/soccer fields\n- Basketball courts\n- Tennis courts\n- Baseball diamonds',
    fullDescZh: '我们的球场围网专为高强度运动应用设计。重型丝径和紧密网孔防止球体穿透，同时保持通透视野。\n\n**规格参数：**\n- 网孔：50mm × 50mm\n- 丝径：3.0mm 芯线 + 0.8mm PVC\n- 高度：3.0m / 4.0m / 6.0m\n- 立柱：60mm × 60mm × 2.5mm 方管\n- 颜色：绿色（RAL 6005）/ 蓝色\n- 表面：热镀锌后PVC包塑\n- 配件：柱帽、张紧线、卡扣\n\n**应用场景：**\n- 足球场\n- 篮球场\n- 网球场\n- 棒球场',
    specs: { meshAperture: '50mm × 50mm', wireDiameter: '3.0mm core + 0.8mm PVC', surfaceTreatment: 'PVC Coated (over galvanized)', material: 'Low Carbon Steel + PVC', height: '3.0m / 4.0m / 6.0m', post: '60×60×2.5mm square tube', colors: 'Green (RAL 6005) / Blue' },
    apps: ['Football fields', 'Basketball courts', 'Tennis courts', 'Baseball fields'],
    images: ['/images/products/stadium-fence.jpg'],
    priceUsd: 35, unit: 'FOB Tianjin, per m²', moq: 200, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Stadium Fence Sports Field Fence 50mm | Angu Wire Mesh', keywords: 'stadium fence, sports field fence, tennis court fence, PVC coated fence', description: 'Heavy-duty stadium fence, 50mm mesh, 3.0mm wire, PVC coated. For football pitches, basketball courts, tennis courts, and baseball fields.' },
  },
  {
    slug: 'isolation-fence-50mm',
    categorySlug: 'fence',
    nameEn: 'Isolation Fence (Temporary Fence) 50mm × 2.5mm',
    nameZh: '隔离围网（临时围栏）50mm × 2.5mm',
    shortDescEn: 'Modular isolation fence panels with 50mm mesh. Hot-dipped galvanized, easy to install and relocate. For construction sites and events.',
    shortDescZh: '模块化隔离围网，50mm网孔。热镀锌，易安装搬迁。用于工地和活动场所。',
    fullDescEn: 'Our isolation fence panels are designed for quick deployment and relocation. The modular design allows flexible configuration for any site layout.\n\n**Specifications:**\n- Panel Size: 2.0m × 3.0m standard\n- Mesh Size: 50mm × 50mm / 50mm × 100mm\n- Wire Diameter: 2.5mm\n- Frame: 25mm × 25mm × 1.5mm square tube\n- Surface: Hot-dipped galvanized (≥80g/m²)\n- Base: Concrete-filled plastic base or steel base\n- Connection: Clips or bolts\n\n**Applications:**\n- Construction site isolation\n- Event crowd control\n- Road maintenance zones\n- Emergency response areas',
    fullDescZh: '我们的隔离围网设计用于快速部署和搬迁。模块化设计允许灵活配置以适应任何场地布局。\n\n**规格参数：**\n- 面板尺寸：2.0m × 3.0m 标准\n- 网孔：50mm × 50mm / 50mm × 100mm\n- 丝径：2.5mm\n- 框架：25mm × 25mm × 1.5mm 方管\n- 表面：热镀锌（≥80g/m²）\n- 底座：混凝土填充塑料底座或钢底座\n- 连接：卡扣或螺栓\n\n**应用场景：**\n- 工地隔离\n- 活动人群控制\n- 道路维修区域\n- 应急响应区域',
    specs: { meshAperture: '50mm × 50mm / 50mm × 100mm', wireDiameter: '2.5mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)', material: 'Low Carbon Steel Wire', panelSize: '2.0m × 3.0m', frame: '25×25×1.5mm square tube' },
    apps: ['Construction sites', 'Events', 'Road maintenance', 'Emergency areas'],
    images: ['/images/products/isolation-fence.jpg'],
    priceUsd: 55, unit: 'FOB Tianjin, per panel', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Isolation Fence Temporary Fence Panel | Angu Wire Mesh', keywords: 'isolation fence, temporary fence, construction fence, modular fence', description: 'Modular isolation fence panels, 50mm mesh, 2.5mm wire. Hot-dipped galvanized for construction site isolation and event crowd control.' },
  },
  {
    slug: 'highway-guardrail-w-beam',
    categorySlug: 'fence',
    nameEn: 'Highway Guardrail W-Beam Galvanized',
    nameZh: '公路护栏网 W型波形板',
    shortDescEn: 'Standard W-beam highway guardrail, hot-dipped galvanized. AASHTO M180 standard, for road safety and vehicle impact protection.',
    shortDescZh: '标准W型波形公路护栏，热镀锌。符合AASHTO M180标准，用于道路安全和车辆碰撞防护。',
    fullDescEn: 'Our W-beam highway guardrails comply with AASHTO M180 and EN 1317 standards. The wave-shaped design absorbs impact energy and redirects vehicles back to the roadway.\n\n**Specifications:**\n- Rail Type: W-beam (two-wave / three-wave)\n- Rail Size: 310mm × 85mm × 3.0mm / 4.0mm\n- Post: 114mm × 4.5mm round post / 130mm × 130mm × 6mm square post\n- Length: 4.32m standard (custom available)\n- Surface: Hot-dipped galvanized (≥550g/m²)\n- Standard: AASHTO M180 / EN 1317\n- Accessories: Post caps, bolts, reflectors\n\n**Applications:**\n- Highway median barriers\n- Roadside protection\n- Bridge approach guards\n- Mountain road safety',
    fullDescZh: '我们的W型波形公路护栏符合AASHTO M180和EN 1317标准。波形设计吸收碰撞能量，将车辆引导回道路。\n\n**规格参数：**\n- 护栏类型：W型（双波 / 三波）\n- 护栏尺寸：310mm × 85mm × 3.0mm / 4.0mm\n- 立柱：114mm × 4.5mm 圆管 / 130mm × 130mm × 6mm 方管\n- 长度：4.32m 标准（可定制）\n- 表面：热镀锌（≥550g/m²）\n- 标准：AASHTO M180 / EN 1317\n- 配件：柱帽、螺栓、反光片\n\n**应用场景：**\n- 公路中央隔离带\n- 路侧防护\n- 桥梁引道护栏\n- 山区道路安全',
    specs: { railType: 'W-beam (two-wave / three-wave)', railSize: '310×85×3.0/4.0mm', post: '114×4.5mm round / 130×130×6mm square', surfaceTreatment: 'Hot-Dipped Galvanized (≥550g/m²)', material: 'Q235/Q345 Steel', length: '4.32m standard', standard: 'AASHTO M180 / EN 1317' },
    apps: ['Highways', 'Roadside protection', 'Bridge approaches', 'Mountain roads'],
    images: ['/images/products/guardrail.jpg'],
    priceUsd: 45, unit: 'FOB Tianjin, per meter', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Highway Guardrail W-Beam Galvanized AASHTO | Angu Wire Mesh', keywords: 'highway guardrail, W-beam, road safety barrier, galvanized guardrail', description: 'Standard W-beam highway guardrail per AASHTO M180. Hot-dipped galvanized 550g/m². For highway median barriers and roadside protection.' },
  },
  {
    slug: 'explosion-proof-guardrail',
    categorySlug: 'fence',
    nameEn: 'Explosion-Proof Guardrail 2.0m Height',
    nameZh: '防爆护栏 2.0m高',
    shortDescEn: 'Heavy-duty explosion-proof guardrail with reinforced steel posts and mesh. For military bases, power plants, and high-security zones.',
    shortDescZh: '重型防爆护栏，加强钢立柱和网片。用于军事基地、电厂和高安全区域。',
    fullDescEn: 'Our explosion-proof guardrails are engineered to withstand high-impact forces and blast pressures. Reinforced construction with heavy-gauge materials ensures maximum protection.\n\n**Specifications:**\n- Height: 2.0m / 2.5m / 3.0m\n- Mesh: 50mm × 50mm × 4.0mm wire\n- Post: 80mm × 80mm × 3.0mm square tube\n- Surface: Hot-dipped galvanized + powder coating\n- Foundation: Concrete base with anchor bolts\n- Anti-climb: Barbed wire or razor wire optional\n- Impact Resistance: ≥50kJ\n\n**Applications:**\n- Military installations\n- Power plants and substations\n- Oil and gas facilities\n- Government buildings',
    fullDescZh: '我们的防爆护栏设计用于承受高冲击力和爆炸压力。重型材料加强结构确保最大防护。\n\n**规格参数：**\n- 高度：2.0m / 2.5m / 3.0m\n- 网孔：50mm × 50mm × 4.0mm 丝径\n- 立柱：80mm × 80mm × 3.0mm 方管\n- 表面：热镀锌 + 粉末喷涂\n- 基础：混凝土底座配锚栓\n- 防攀爬：刺绳或刀片刺绳可选\n- 抗冲击：≥50kJ\n\n**应用场景：**\n- 军事设施\n- 电厂和变电站\n- 油气设施\n- 政府建筑',
    specs: { meshAperture: '50mm × 50mm', wireDiameter: '4.0mm', surfaceTreatment: 'Galvanized + Powder Coating', material: 'Q345 High-Strength Steel', height: '2.0m / 2.5m / 3.0m', post: '80×80×3.0mm square tube', impactResistance: '≥50kJ' },
    apps: ['Military bases', 'Power plants', 'Oil/gas facilities', 'Government buildings'],
    images: ['/images/products/blast-guardrail.jpg'],
    priceUsd: 120, unit: 'FOB Tianjin, per meter', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Explosion-Proof Guardrail 2.0m Heavy Duty | Angu Wire Mesh', keywords: 'explosion-proof guardrail, blast barrier, security fencing, military fence', description: 'Heavy-duty explosion-proof guardrail, 2.0m height, 4.0mm wire mesh. Reinforced steel for military bases, power plants, and high-security zones.' },
  },
  {
    slug: 'concert-crowd-barrier',
    categorySlug: 'fence',
    nameEn: 'Concert Crowd Control Barrier 1.1m × 2.0m',
    nameZh: '演唱会护栏（人群控制栏）1.1m × 2.0m',
    shortDescEn: 'Galvanized steel crowd control barrier for concerts and events. Interlocking design, flat feet for stability. 1.1m height, 2.0m length.',
    shortDescZh: '镀锌钢演唱会护栏，用于音乐会和活动。互锁设计，平底脚稳定。高1.1m，长2.0m。',
    fullDescEn: 'Our concert crowd control barriers are designed for safe and efficient crowd management at large events. The interlocking system allows quick setup and flexible configurations.\n\n**Specifications:**\n- Panel Size: 1.1m × 2.0m\n- Frame: 25mm × 25mm × 1.5mm square tube\n- Infill: 20mm × 20mm × 1.2mm vertical bars\n- Feet: Flat steel feet (removable)\n- Surface: Hot-dipped galvanized\n- Connection: Hook and eyelet interlock\n- Weight: Approx. 18kg per panel\n\n**Applications:**\n- Concerts and music festivals\n- Sports events\n- Public gatherings\n- Queue management',
    fullDescZh: '我们的演唱会护栏专为大型活动的安全高效人群管理而设计。互锁系统允许快速搭建和灵活配置。\n\n**规格参数：**\n- 面板尺寸：1.1m × 2.0m\n- 框架：25mm × 25mm × 1.5mm 方管\n- 填充：20mm × 20mm × 1.2mm 竖杆\n- 底座：平钢板脚（可拆卸）\n- 表面：热镀锌\n- 连接：钩环互锁\n- 重量：约18kg/块\n\n**应用场景：**\n- 音乐会和音乐节\n- 体育赛事\n- 公众集会\n- 排队管理',
    specs: { panelSize: '1.1m × 2.0m', frame: '25×25×1.5mm square tube', infill: '20×20×1.2mm vertical bars', surfaceTreatment: 'Hot-Dipped Galvanized', material: 'Low Carbon Steel', weight: 'Approx. 18kg per panel', connection: 'Hook and eyelet interlock' },
    apps: ['Concerts', 'Sports events', 'Public gatherings', 'Queue management'],
    images: ['/images/products/crowd-barrier.jpg'],
    priceUsd: 35, unit: 'FOB Tianjin, per panel', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Concert Crowd Control Barrier 1.1m | Angu Wire Mesh', keywords: 'concert barrier, crowd control barrier, event fence, galvanized barrier', description: 'Galvanized steel concert crowd control barrier, 1.1m×2.0m panel. Interlocking design for concerts, festivals, and event crowd management.' },
  },
  {
    slug: 'razor-barbed-wire-bto22',
    categorySlug: 'barbed-wire',
    nameEn: 'Razor Barbed Wire BTO-22 Concertina',
    nameZh: '刀片刺绳 BTO-22 螺旋型',
    shortDescEn: 'High-security razor barbed wire BTO-22 concertina coil. Hot-dipped galvanized, 450mm coil diameter. For perimeter security fencing.',
    shortDescZh: '高安全等级刀片刺绳 BTO-22 螺旋型。热镀锌，450mm卷径。用于周界安全围栏。',
    fullDescEn: 'Our razor barbed wire provides superior perimeter security with its sharp blade design. The concertina coil format creates an effective physical barrier that is difficult to breach.\n\n**Specifications:**\n- Blade Type: BTO-22 (BTO-10, BTO-15, CBT-60, CBT-65 available)\n- Blade Thickness: 0.5mm\n- Core Wire: 2.5mm high-tensile steel\n- Coil Diameter: 450mm (300-980mm available)\n- Loops per Coil: 33-55\n- Surface: Hot-dipped galvanized (≥80g/m²)\n- Stainless Steel: 304/430 option available\n\n**Applications:**\n- Military installations\n- Prisons and detention centers\n- Airport perimeters\n- Industrial facilities',
    fullDescZh: '我们的刀片刺绳以锋利的刀片设计提供卓越的周界安防。螺旋卷曲形式形成难以突破的有效物理屏障。\n\n**规格参数：**\n- 刀片型号：BTO-22（BTO-10、BTO-15、CBT-60、CBT-65 可选）\n- 刀片厚度：0.5mm\n- 芯线：2.5mm 高强度钢丝\n- 卷径：450mm（300-980mm 可选）\n- 每卷圈数：33-55\n- 表面：热镀锌（≥80g/m²）\n- 不锈钢：304/430 可选\n\n**应用场景：**\n- 军事设施\n- 监狱和看守所\n- 机场周界\n- 工业设施',
    specs: { bladeType: 'BTO-22', bladeThickness: '0.5mm', wireDiameter: '2.5mm core', coilDiameter: '450mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)', material: 'High-Tensile Steel', loopsPerCoil: '33-55' },
    apps: ['Military', 'Prisons', 'Airports', 'Industrial facilities'],
    images: ['/images/products/razor-wire.jpg'],
    priceUsd: 18, unit: 'FOB Tianjin, per coil', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Razor Barbed Wire BTO-22 Concertina | Angu Wire Mesh', keywords: 'razor barbed wire, BTO-22, concertina wire, security fence, perimeter security', description: 'High-security razor barbed wire BTO-22 concertina coil. Hot-dipped galvanized, 450mm coil diameter. For military, prison, and airport perimeters.' },
  },
  {
    slug: 'steel-barbed-wire-12x14',
    categorySlug: 'barbed-wire',
    nameEn: 'Steel Barbed Wire 12×14 Gauge Galvanized',
    nameZh: '钢丝刺绳 12×14号 镀锌',
    shortDescEn: 'Traditional twisted steel barbed wire, 12×14 gauge, hot-dipped galvanized. For agricultural fencing and property boundaries.',
    shortDescZh: '传统双绞钢丝刺绳，12×14号，热镀锌。用于农业围栏和地产边界。',
    fullDescEn: 'Our traditional steel barbed wire is a cost-effective solution for perimeter security and livestock containment. The twisted design with sharp barbs deters unauthorized entry.\n\n**Specifications:**\n- Wire Gauge: 12×14 (12.5×14.5, 14×16 available)\n- Barb Spacing: 75mm / 100mm / 125mm\n- Barb Length: 15-20mm\n- Tensile Strength: ≥1150 N/mm²\n- Surface: Hot-dipped galvanized (≥40g/m²)\n- Roll Length: 100m / 250m / 500m\n- Roll Weight: 10-25kg\n\n**Applications:**\n- Agricultural fencing\n- Property boundaries\n- Pasture enclosures\n- Security perimeters',
    fullDescZh: '我们的传统钢丝刺绳是周界安防和牲畜围栏的经济高效解决方案。双绞设计配合锋利刺钉有效阻止非法进入。\n\n**规格参数：**\n- 线号：12×14（12.5×14.5、14×16 可选）\n- 刺距：75mm / 100mm / 125mm\n- 刺长：15-20mm\n- 抗拉强度：≥1150 N/mm²\n- 表面：热镀锌（≥40g/m²）\n- 卷长：100m / 250m / 500m\n- 卷重：10-25kg\n\n**应用场景：**\n- 农业围栏\n- 地产边界\n- 牧场围栏\n- 安防周界',
    specs: { wireGauge: '12×14', barbSpacing: '75mm / 100mm / 125mm', barbLength: '15-20mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥40g/m²)', material: 'High-Tensile Steel', tensileStrength: '≥1150 N/mm²', rollLength: '100m / 250m / 500m' },
    apps: ['Agricultural fencing', 'Property boundaries', 'Pastures', 'Security'],
    images: ['/images/products/barbed-wire.jpg'],
    priceUsd: 12, unit: 'FOB Tianjin, per roll', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Steel Barbed Wire 12×14 Gauge Galvanized | Angu Wire Mesh', keywords: 'barbed wire, steel barbed wire, agricultural fencing, galvanized barbed wire', description: 'Traditional twisted steel barbed wire, 12×14 gauge, hot-dipped galvanized. For agricultural fencing, livestock, and property boundaries.' },
  },
  {
    slug: 'active-slope-protection-net-dns50',
    categorySlug: 'slope-protection',
    nameEn: 'Active Slope Protection Net DNS-50 (50kJ)',
    nameZh: '主动边坡防护网 DNS-50 (50kJ)',
    shortDescEn: 'High-tensile active slope protection net with 50kJ energy absorption. Anchored to slope surface for rockfall and landslide prevention.',
    shortDescZh: '高强度主动边坡防护网，50kJ能量吸收。锚固于坡面，用于落石和滑坡预防。',
    fullDescEn: 'Our active slope protection systems are anchored directly to the slope surface to prevent rock detachment and stabilize loose material. The high-tensile steel wire mesh absorbs impact energy through deformation.\n\n**Specifications:**\n- Model: DNS-50 (50kJ energy absorption)\n- Mesh Type: Diamond high-tensile steel wire mesh\n- Wire Diameter: 3.0mm\n- Mesh Size: 300×300mm\n- Rope: 8mm high-tensile steel rope\n- Anchor: Φ25mm rock bolts, 2-4m length\n- Corrosion Protection: Hot-dipped galvanized + polymer coating\n- Tensile Strength: 1770 N/mm²\n\n**Certifications:**\n- CE certified\n- ETAG 027 tested\n- ISO 9001:2015\n\n**Applications:**\n- Mountain highways\n- Open-pit mines\n- Railway cuttings\n- Steep terrain',
    fullDescZh: '我们的主动边坡防护系统直接锚固于坡面，防止岩石脱落并稳定松散物质。高强度钢丝网通过变形吸收冲击能量。\n\n**规格参数：**\n- 型号：DNS-50（50kJ能量吸收）\n- 网型：菱形高强度钢丝网\n- 丝径：3.0mm\n- 网孔：300×300mm\n- 绳索：8mm高强度钢丝绳\n- 锚杆：Φ25mm岩石锚杆，2-4m长度\n- 防腐：热镀锌 + 聚合物涂层\n- 抗拉强度：1770 N/mm²\n\n**认证：**\n- CE认证\n- ETAG 027检测\n- ISO 9001:2015\n\n**应用场景：**\n- 山区公路\n- 露天矿山\n- 铁路路堑\n- 陡峭地形',
    specs: { model: 'DNS-50 (50kJ)', meshAperture: '300×300mm', wireDiameter: '3.0mm', surfaceTreatment: 'Galvanized + Polymer Coating', material: 'High-Tensile Steel (1770 N/mm²)', rope: '8mm high-tensile steel rope', anchor: 'Φ25mm rock bolts', tensileStrength: '1770 N/mm²' },
    apps: ['Mountain highways', 'Open-pit mines', 'Railway cuttings', 'Steep terrain'],
    images: ['/images/products/active-slope-net.jpg'],
    priceUsd: 85, unit: 'FOB Tianjin, per m²', moq: 500, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Active Slope Protection Net DNS-50 50kJ | Angu Wire Mesh', keywords: 'active slope protection, rockfall net, landslide prevention, slope netting', description: 'High-tensile active slope protection net, DNS-50 model, 50kJ energy absorption. CE certified for highway, mining, and railway slope stabilization.' },
  },
  {
    slug: 'passive-slope-protection-barrier-gl100',
    categorySlug: 'slope-protection',
    nameEn: 'Passive Slope Protection Barrier GL-100 (100kJ)',
    nameZh: '被动边坡防护栏 GL-100 (100kJ)',
    shortDescEn: 'Flexible passive rockfall barrier with 100kJ energy rating. Posts + steel rope + ring net. For highways and railways at slope foot.',
    shortDescZh: '柔性被动落石防护栏，100kJ能量等级。立柱+钢丝绳+环形网。用于坡脚公路和铁路。',
    fullDescEn: 'Our passive slope protection barriers are installed at the foot of slopes to intercept falling rocks. The energy-absorbing brake elements allow controlled deformation upon impact.\n\n**Specifications:**\n- Model: GL-100 (100kJ energy absorption)\n- Height: 2.0m / 2.5m / 3.0m / 4.0m / 5.0m\n- Net: High-tensile steel ring net (R7/3/300)\n- Posts: HEA200 / HEB220 steel posts\n- Braking Element: Telescopic friction brake\n- Anchor: Ground anchors per design\n- Surface: Hot-dipped galvanized\n- Tensile Strength: 1770 N/mm²\n\n**Certifications:**\n- CE certified\n- ETAG 027 tested\n- FHWA approved\n\n**Applications:**\n- Highway catch fences\n- Railway protection\n- Industrial site boundaries\n- Residential area protection',
    fullDescZh: '我们的被动边坡防护栏安装在坡脚处，用于拦截落石。能量吸收制动元件允许在撞击时受控变形。\n\n**规格参数：**\n- 型号：GL-100（100kJ能量吸收）\n- 高度：2.0m / 2.5m / 3.0m / 4.0m / 5.0m\n- 网体：高强度钢环形网（R7/3/300）\n- 立柱：HEA200 / HEB220 钢柱\n- 制动元件：伸缩式摩擦制动器\n- 锚固：按设计地面锚固\n- 表面：热镀锌\n- 抗拉强度：1770 N/mm²\n\n**认证：**\n- CE认证\n- ETAG 027检测\n- FHWA批准\n\n**应用场景：**\n- 公路拦截网\n- 铁路防护\n- 工业场地边界\n- 居民区防护',
    specs: { model: 'GL-100 (100kJ)', height: '2.0m - 5.0m', net: 'High-tensile steel ring net (R7/3/300)', post: 'HEA200 / HEB220 steel posts', surfaceTreatment: 'Hot-Dipped Galvanized', material: 'High-Tensile Steel (1770 N/mm²)', brakingElement: 'Telescopic friction brake', tensileStrength: '1770 N/mm²' },
    apps: ['Highways', 'Railways', 'Industrial sites', 'Residential areas'],
    images: ['/images/products/passive-barrier.jpg'],
    priceUsd: 120, unit: 'FOB Tianjin, per linear meter', moq: 200, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Passive Slope Protection Barrier GL-100 100kJ | Angu Wire Mesh', keywords: 'passive slope protection, rockfall barrier, catch fence, slope barrier', description: 'Flexible passive rockfall barrier GL-100 with 100kJ energy rating. CE certified, ETAG 027 tested. For highway and railway slope protection.' },
  },
  {
    slug: 'hesco-bastion-blast-wall-1x1x1m',
    categorySlug: 'blast-wall',
    nameEn: 'Hesco Bastion Blast Wall 1×1×1m Galvanized',
    nameZh: '防爆石笼网（Hesco堡垒墙）1×1×1m 镀锌',
    shortDescEn: 'Military-grade Hesco bastion blast wall, 1×1×1m unit. Galvanized welded mesh lined with geotextile. Filled with sand/earth for blast protection.',
    shortDescZh: '军用级Hesco防爆石笼网，1×1×1m单元。镀锌焊网内衬土工布。填充沙土用于防爆防护。',
    fullDescEn: 'Hesco bastions are modern gabion-like structures used for military fortification and blast protection. The welded mesh cage lined with non-woven geotextile can be rapidly deployed and filled with local materials.\n\n**Specifications:**\n- Unit Size: 1.0m × 1.0m × 1.0m (custom sizes available)\n- Mesh: 75mm × 75mm welded mesh\n- Wire Diameter: 4.0mm / 5.0mm\n- Geotextile: 300g/m² non-woven PP\n- Surface: Hot-dipped galvanized (≥240g/m²)\n- Connection: Spiral wire or C-rings\n- Fill Material: Sand, earth, gravel\n- Blast Resistance: ≥20 PSI overpressure\n\n**Applications:**\n- Military forward operating bases\n- Perimeter security walls\n- Blast mitigation barriers\n- Flood control emergency walls',
    fullDescZh: 'Hesco堡垒墙是现代石笼式结构，用于军事防御和防爆保护。焊网笼内衬无纺土工布，可快速部署并就地填充。\n\n**规格参数：**\n- 单元尺寸：1.0m × 1.0m × 1.0m（可定制）\n- 网孔：75mm × 75mm 焊网\n- 丝径：4.0mm / 5.0mm\n- 土工布：300g/m² 无纺PP\n- 表面：热镀锌（≥240g/m²）\n- 连接方式：螺旋丝或C型环\n- 填充材料：沙、土、碎石\n- 防爆等级：≥20 PSI超压\n\n**应用场景：**\n- 军事前进作战基地\n- 周界安防墙\n- 防爆缓冲屏障\n- 防洪应急墙',
    specs: { unitSize: '1.0m × 1.0m × 1.0m', meshAperture: '75mm × 75mm', wireDiameter: '4.0mm / 5.0mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥240g/m²)', material: 'Low Carbon Steel Wire', geotextile: '300g/m² non-woven PP', blastResistance: '≥20 PSI overpressure' },
    apps: ['Military bases', 'Perimeter security', 'Blast mitigation', 'Flood control'],
    images: ['/images/products/hesco-bastion.jpg'],
    priceUsd: 45, unit: 'FOB Tianjin, per unit', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Hesco Bastion Blast Wall 1×1×1m | Angu Wire Mesh', keywords: 'hesco bastion, blast wall, military barrier, hesco barrier, flood wall', description: 'Military-grade Hesco bastion blast wall, 1×1×1m galvanized. Geotextile-lined welded mesh for military, blast mitigation, and flood control barriers.' },
  },
  {
    slug: 'blast-wall-panel-2x1x1m',
    categorySlug: 'blast-wall',
    nameEn: 'Blast Wall Panel 2×1×1m Reinforced',
    nameZh: '防爆墙板 2×1×1m 加强型',
    shortDescEn: 'Reinforced blast wall panel, 2×1×1m. Double-layer welded mesh with internal bracing. For high-threat security zones and explosive storage.',
    shortDescZh: '加强型防爆墙板，2×1×1m。双层焊网加内部支撑。用于高威胁安全区和爆炸品储存。',
    fullDescEn: 'Our reinforced blast wall panels provide superior protection against explosive blasts and ballistic threats. The double-layer construction with internal bracing withstands extreme pressures.\n\n**Specifications:**\n- Panel Size: 2.0m × 1.0m × 1.0m\n- Outer Mesh: 50mm × 50mm × 4.0mm welded mesh\n- Inner Mesh: 25mm × 25mm × 3.0mm welded mesh\n- Bracing: Internal steel angle supports\n- Surface: Hot-dipped galvanized + anti-spall coating\n- Connection: Bolted flange connections\n- Blast Resistance: ≥50 PSI overpressure\n- Ballistic: NIJ Level III equivalent\n\n**Applications:**\n- Explosive storage facilities\n- Ammunition depots\n- High-security government zones\n- Embassy protection',
    fullDescZh: '我们的加强型防爆墙板提供卓越的爆炸和弹道防护。双层结构和内部支撑能够承受极端压力。\n\n**规格参数：**\n- 面板尺寸：2.0m × 1.0m × 1.0m\n- 外层网：50mm × 50mm × 4.0mm 焊网\n- 内层网：25mm × 25mm × 3.0mm 焊网\n- 支撑：内部钢角撑\n- 表面：热镀锌 + 防碎片涂层\n- 连接方式：螺栓法兰连接\n- 防爆等级：≥50 PSI超压\n- 防弹：NIJ III级等效\n\n**应用场景：**\n- 爆炸品储存设施\n- 弹药库\n- 高安全政府区域\n- 大使馆防护',
    specs: { panelSize: '2.0m × 1.0m × 1.0m', outerMesh: '50×50×4.0mm welded mesh', innerMesh: '25×25×3.0mm welded mesh', surfaceTreatment: 'Galvanized + Anti-spall coating', material: 'Q345 High-Strength Steel', blastResistance: '≥50 PSI overpressure', ballistic: 'NIJ Level III equivalent' },
    apps: ['Explosive storage', 'Ammunition depots', 'Government zones', 'Embassy protection'],
    images: ['/images/products/blast-wall.jpg'],
    priceUsd: 180, unit: 'FOB Tianjin, per panel', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Blast Wall Panel 2×1×1m Reinforced | Angu Wire Mesh', keywords: 'blast wall, explosion-proof wall, military barrier, reinforced blast panel', description: 'Reinforced blast wall panel 2×1×1m, double-layer welded mesh. NIJ Level III ballistic, ≥50 PSI blast resistance for explosive storage and embassy protection.' },
  },
  {
    slug: 'galvanized-gabion-box-2x1x1m',
    categorySlug: 'gabion',
    nameEn: 'Hot-Dipped Galvanized Gabion Box 2×1×1m',
    nameZh: '热镀锌石笼网箱 2×1×1m',
    shortDescEn: '2m × 1m × 1m hot-dipped galvanized gabion box, mesh 80×100mm, wire 2.5mm. For river protection and slope stabilization.',
    shortDescZh: '2m×1m×1m热镀锌石笼网箱，网孔80×100mm，丝径2.5mm。用于河道防护和边坡稳定。',
    fullDescEn: 'Our hot-dipped galvanized gabion boxes are manufactured from high-quality steel wire with superior corrosion resistance. The flexible structure adapts to ground movement without losing integrity.\n\n**Specifications:**\n- Dimensions: 2m × 1m × 1m (customizable)\n- Wire Diameter: 2.5mm (2.0-4.0mm available)\n- Mesh Aperture: 80×100mm (60×80mm, 100×120mm options)\n- Surface: Hot-dipped galvanized (≥250g/m²)\n- Material: Low Carbon Steel Wire\n- Tensile Strength: 370-540 N/mm²\n- Diaphragms: Internal diaphragms every 1m\n\n**Applications:**\n- Riverbank protection\n- Slope stabilization\n- Retaining walls\n- Erosion control',
    fullDescZh: '我们的热镀锌石笼网箱采用优质钢丝制造，具有卓越的耐腐蚀性能。柔性结构能适应地面位移而不丧失完整性。\n\n**规格参数：**\n- 尺寸：2m × 1m × 1m（可定制）\n- 丝径：2.5mm（2.0-4.0mm 可选）\n- 网孔：80×100mm（60×80mm、100×120mm 可选）\n- 表面：热镀锌（≥250g/m²）\n- 材质：低碳钢丝\n- 抗拉强度：370-540 N/mm²\n- 隔板：每1m内置隔板\n\n**应用场景：**\n- 河道护岸\n- 边坡稳定\n- 挡土墙\n- 侵蚀控制',
    specs: { dimensions: '2m × 1m × 1m', wireDiameter: '2.5mm', meshAperture: '80×100mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥250g/m²)', material: 'Low Carbon Steel Wire', tensileStrength: '370-540 N/mm²' },
    apps: ['Riverbank protection', 'Slope stabilization', 'Retaining walls', 'Erosion control'],
    images: ['/images/products/gabion-box.jpg'],
    priceUsd: 45, unit: 'FOB Tianjin, per unit', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Galvanized Gabion Box 2×1×1m | Angu Wire Mesh', keywords: 'gabion box, gabion basket, river protection, retaining wall, erosion control', description: 'Hot-dipped galvanized gabion box 2×1×1m, 80×100mm mesh, 2.5mm wire. For riverbank protection, slope stabilization, and retaining walls.' },
  },
  {
    slug: 'reno-mattress-6x2x0.3m',
    categorySlug: 'gabion',
    nameEn: 'Reno Mattress 6×2×0.3m Galvanized',
    nameZh: '雷诺护垫 6×2×0.3m 镀锌',
    shortDescEn: 'Low-profile Reno mattress 6×2×0.3m for riverbed slope protection and channel lining. Flexible and permeable.',
    shortDescZh: '低矮型雷诺护垫 6×2×0.3m，用于河床边坡防护和渠道衬砌。柔性好，透水性强。',
    fullDescEn: 'Reno mattresses are low-profile gabion structures ideal for riverbed and channel lining. Their thin cross-section provides scour protection while allowing water flow.\n\n**Specifications:**\n- Dimensions: 6m × 2m × 0.3m\n- Wire Diameter: 2.0mm / 2.4mm\n- Mesh Aperture: 60×80mm\n- Surface: Hot-dipped galvanized (≥220g/m²)\n- Material: Low Carbon Steel Wire\n- Diaphragms: Every 1m\n\n**Applications:**\n- Riverbed lining\n- Channel slope protection\n- Scour protection\n- Drainage channels',
    fullDescZh: '雷诺护垫是低矮型石笼结构，非常适合河床和渠道衬砌。其薄截面在防止冲刷的同时保持水流通过。\n\n**规格参数：**\n- 尺寸：6m × 2m × 0.3m\n- 丝径：2.0mm / 2.4mm\n- 网孔：60×80mm\n- 表面：热镀锌（≥220g/m²）\n- 材质：低碳钢丝\n- 隔板：每1m\n\n**应用场景：**\n- 河床衬砌\n- 渠道边坡防护\n- 防冲刷保护\n- 排水渠道',
    specs: { dimensions: '6m × 2m × 0.3m', wireDiameter: '2.0-2.4mm', meshAperture: '60×80mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥220g/m²)', material: 'Low Carbon Steel Wire' },
    apps: ['Riverbed lining', 'Channel protection', 'Scour protection', 'Drainage'],
    images: ['/images/products/reno-mattress.jpg'],
    priceUsd: 55, unit: 'FOB Tianjin, per unit', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Reno Mattress 6×2×0.3m Galvanized | Angu Wire Mesh', keywords: 'reno mattress, riverbed lining, channel protection, scour protection, gabion mattress', description: 'Low-profile Reno mattress 6×2×0.3m, hot-dipped galvanized. For riverbed lining, channel slope protection, and scour control in hydraulic engineering.' },
  },
  {
    slug: 'pvc-coated-gabion-box-2x1x1m',
    categorySlug: 'gabion',
    nameEn: 'PVC Coated Gabion Box 2×1×1m',
    nameZh: 'PVC包塑石笼网箱 2×1×1m',
    shortDescEn: 'PVC coated gabion box with superior corrosion resistance for marine environments and harsh chemical conditions. Green or black color.',
    shortDescZh: 'PVC包塑石笼网箱，耐腐蚀性优异。适用于海洋环境和恶劣化学条件。绿色或黑色。',
    fullDescEn: 'Our PVC coated gabion boxes offer exceptional durability in corrosive environments. The PVC coating provides an additional protective layer over the galvanized wire.\n\n**Specifications:**\n- Dimensions: 2m × 1m × 1m\n- Core Wire: 2.5mm galvanized steel\n- PVC Coating: 0.5mm thickness\n- Mesh Aperture: 60×80mm / 80×100mm\n- Colors: Green, Black\n- Salt Spray Test: ≥2000 hours\n\n**Applications:**\n- Marine protection\n- Chemical environments\n- Landscaping\n- Coastal engineering',
    fullDescZh: '我们的PVC包塑石笼网箱在腐蚀性环境中具有卓越的耐久性。PVC涂层在镀锌钢丝上增加了额外的保护层。\n\n**规格参数：**\n- 尺寸：2m × 1m × 1m\n- 芯线：2.5mm 镀锌钢丝\n- PVC涂层：厚度0.5mm\n- 网孔：60×80mm / 80×100mm\n- 颜色：绿色、黑色\n- 盐雾试验：≥2000小时\n\n**应用场景：**\n- 海洋防护\n- 化工环境\n- 景观工程\n- 海岸工程',
    specs: { dimensions: '2m × 1m × 1m', wireDiameter: '2.5mm core + 0.5mm PVC', meshAperture: '60×80mm / 80×100mm', surfaceTreatment: 'PVC Coated (over galvanized)', material: 'Low Carbon Steel + PVC', colors: 'Green, Black' },
    apps: ['Marine protection', 'Chemical environments', 'Landscaping', 'Coastal engineering'],
    images: ['/images/products/gabion-pvc.jpg'],
    priceUsd: 65, unit: 'FOB Tianjin, per unit', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'PVC Coated Gabion Box 2×1×1m | Angu Wire Mesh', keywords: 'PVC coated gabion, gabion box, marine gabion, coastal protection', description: 'PVC coated gabion box 2×1×1m, superior corrosion resistance. 2000+ hour salt spray tested. For marine, chemical, and coastal engineering applications.' },
  },
  {
    slug: 'reinforced-gabion-box-2x1x1m',
    categorySlug: 'gabion',
    nameEn: 'Reinforced Gabion Box 2×1×1m with Geogrid',
    nameZh: '加筋石笼网箱 2×1×1m 带土工格栅',
    shortDescEn: 'Reinforced gabion box with internal geogrid reinforcement. For high-load retaining walls and steep slope applications.',
    shortDescZh: '加筋石笼网箱，内置土工格栅加强。用于高荷载挡土墙和陡坡工程。',
    fullDescEn: 'Our reinforced gabion boxes incorporate internal geogrid reinforcement to increase load-bearing capacity. Ideal for high retaining walls and challenging slope conditions.\n\n**Specifications:**\n- Dimensions: 2m × 1m × 1m\n- Wire Diameter: 2.7mm\n- Mesh Aperture: 80×100mm\n- Geogrid: PP biaxial geogrid, 30kN/m\n- Surface: Hot-dipped galvanized (≥260g/m²)\n- Connection: Lacing wire or C-rings\n\n**Applications:**\n- High retaining walls\n- Steep slope stabilization\n- Bridge abutments\n- Heavy load structures',
    fullDescZh: '我们的加筋石笼网箱内置土工格栅增强承载能力，是高挡土墙和复杂边坡条件的理想选择。\n\n**规格参数：**\n- 尺寸：2m × 1m × 1m\n- 丝径：2.7mm\n- 网孔：80×100mm\n- 土工格栅：PP双向格栅，30kN/m\n- 表面：热镀锌（≥260g/m²）\n- 连接方式：绑扎丝或C型环\n\n**应用场景：**\n- 高挡土墙\n- 陡坡稳定\n- 桥台\n- 重荷载结构',
    specs: { dimensions: '2m × 1m × 1m', wireDiameter: '2.7mm', meshAperture: '80×100mm', surfaceTreatment: 'Hot-Dipped Galvanized (≥260g/m²)', material: 'Low Carbon Steel Wire', geogrid: 'PP biaxial, 30kN/m' },
    apps: ['High retaining walls', 'Steep slopes', 'Bridge abutments', 'Heavy loads'],
    images: ['/images/products/gabion-reinforced.jpg'],
    priceUsd: 58, unit: 'FOB Tianjin, per unit', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Reinforced Gabion Box 2×1×1m Geogrid | Angu Wire Mesh', keywords: 'reinforced gabion, geogrid gabion, retaining wall, slope stabilization', description: 'Reinforced gabion box 2×1×1m with PP geogrid. Hot-dipped galvanized ≥260g/m². For high retaining walls, steep slopes, and bridge abutments.' },
  },
  {
    slug: 'stainless-steel-rope-net-2mm-60mm',
    categorySlug: 'stainless-rope-net',
    nameEn: 'Stainless Steel Wire Rope Net 2.0mm × 60mm Mesh',
    nameZh: '不锈钢绳网 2.0mm × 60mm网孔',
    shortDescEn: 'High-grade 304/316 stainless steel wire rope net, 2.0mm wire, 60mm mesh. For architectural, zoo, and safety applications.',
    shortDescZh: '高等级304/316不锈钢丝绳网，2.0mm绳径，60mm网孔。用于建筑、动物园和安全防护。',
    fullDescEn: 'Our stainless steel rope nets are hand-woven from high-grade 304 or 316 stainless steel wire ropes. The flexible mesh structure provides both safety and aesthetic appeal.\n\n**Specifications:**\n- Wire Rope Diameter: 2.0mm (1.5-4.0mm available)\n- Mesh Size: 60mm × 60mm (20-200mm available)\n- Material: 304 / 316 Stainless Steel\n- Structure: Hand-woven ferrule or knot type\n- Breaking Strength: ≥2.0kN per rope\n- Corrosion Resistance: Excellent in marine environments\n- Lifespan: 30+ years\n\n**Applications:**\n- Zoo enclosures (aviaries, monkey cages)\n- Architectural fall protection\n- Staircase and balcony safety\n- Green wall support systems',
    fullDescZh: '我们的不锈钢绳网采用优质304或316不锈钢丝绳手工编织而成。柔性网格结构兼顾安全与美观。\n\n**规格参数：**\n- 绳径：2.0mm（1.5-4.0mm 可选）\n- 网孔：60mm × 60mm（20-200mm 可选）\n- 材质：304 / 316 不锈钢\n- 结构：手工编织套圈式或打结式\n- 断裂强度：≥2.0kN/绳\n- 耐腐蚀性：海洋环境优异\n- 使用寿命：30年以上\n\n**应用场景：**\n- 动物园围网（鸟园、猴笼）\n- 建筑防坠网\n- 楼梯阳台安全网\n- 绿墙支撑系统',
    specs: { wireDiameter: '2.0mm', meshAperture: '60mm × 60mm', surfaceTreatment: '304/316 Stainless Steel', material: 'Stainless Steel Wire Rope', structure: 'Hand-woven ferrule or knot', breakingStrength: '≥2.0kN per rope', lifespan: '30+ years' },
    apps: ['Zoo enclosures', 'Architectural safety', 'Staircase protection', 'Green walls'],
    images: ['/images/products/stainless-rope-net.jpg'],
    priceUsd: 120, unit: 'FOB Tianjin, per m²', moq: 10, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Stainless Steel Wire Rope Net 2mm 60mm Mesh | Angu Wire Mesh', keywords: 'stainless steel rope net, wire rope mesh, zoo netting, architectural net', description: 'High-grade 304/316 stainless steel wire rope net, 2.0mm wire, 60mm mesh. Hand-woven for zoo enclosures, architectural safety, and green walls. 30+ year lifespan.' },
  },
  {
    slug: 'zoo-stainless-rope-net-3mm-100mm',
    categorySlug: 'stainless-rope-net',
    nameEn: 'Zoo Stainless Steel Rope Net 3.0mm × 100mm',
    nameZh: '动物园专用不锈钢绳网 3.0mm × 100mm',
    shortDescEn: 'Heavy-duty zoo enclosure rope net, 3.0mm wire, 100mm mesh. 316 stainless steel for large animal enclosures and aviaries.',
    shortDescZh: '重型动物园围网，3.0mm绳径，100mm网孔。316不锈钢，用于大型动物笼舍和鸟园。',
    fullDescEn: 'Our zoo-grade stainless steel rope nets are designed for large animal enclosures and aviaries. The heavy-gauge wire and large mesh provide strength while maintaining visibility.\n\n**Specifications:**\n- Wire Rope Diameter: 3.0mm\n- Mesh Size: 100mm × 100mm\n- Material: 316 Stainless Steel\n- Structure: Hand-woven knot type\n- Breaking Strength: ≥4.5kN per rope\n- UV Resistance: Excellent\n- Lifespan: 30+ years\n\n**Applications:**\n- Large mammal enclosures (tigers, lions, bears)\n- Aviaries and bird parks\n- Primate enclosures\n- Aquarium shark tanks',
    fullDescZh: '我们的动物园级不锈钢绳网专为大型动物笼舍和鸟园而设计。重型丝径和大网孔在保证强度的同时保持通透视野。\n\n**规格参数：**\n- 绳径：3.0mm\n- 网孔：100mm × 100mm\n- 材质：316 不锈钢\n- 结构：手工编织打结式\n- 断裂强度：≥4.5kN/绳\n- 抗紫外线：优异\n- 使用寿命：30年以上\n\n**应用场景：**\n- 大型哺乳动物笼舍（虎、狮、熊）\n- 鸟园和鸟类公园\n- 灵长类动物围栏\n- 水族馆鲨鱼池',
    specs: { wireDiameter: '3.0mm', meshAperture: '100mm × 100mm', surfaceTreatment: '316 Stainless Steel', material: 'Stainless Steel Wire Rope', structure: 'Hand-woven knot type', breakingStrength: '≥4.5kN per rope', lifespan: '30+ years' },
    apps: ['Large mammals', 'Aviaries', 'Primates', 'Aquariums'],
    images: ['/images/products/zoo-rope-net.jpg'],
    priceUsd: 180, unit: 'FOB Tianjin, per m²', moq: 10, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Zoo Stainless Steel Rope Net 3mm 100mm | Angu Wire Mesh', keywords: 'zoo rope net, animal enclosure net, aviary net, stainless steel net', description: 'Heavy-duty zoo stainless steel rope net, 3.0mm wire, 100mm mesh. 316 stainless for large mammal enclosures, aviaries, and primate habitats.' },
  },
  {
    slug: 'heavy-duty-blast-barrier-2.5m',
    categorySlug: 'crowd-barrier',
    nameEn: 'Heavy-Duty Blast Barrier 2.5m Height',
    nameZh: '重型防爆护栏 2.5m高',
    shortDescEn: 'Heavy-duty blast barrier with reinforced steel frame and anti-ram design. For high-threat security zones and vehicle impact protection.',
    shortDescZh: '重型防爆护栏，加强钢框架，防撞击设计。用于高威胁安全区和车辆碰撞防护。',
    fullDescEn: 'Our heavy-duty blast barriers are engineered to stop vehicle-borne threats and withstand explosive blasts. The anti-ram design features reinforced posts and deep foundations.\n\n**Specifications:**\n- Height: 2.5m / 3.0m\n- Frame: 100mm × 50mm × 4.0mm rectangular tube\n- Mesh: 50mm × 50mm × 4.0mm welded mesh\n- Post Spacing: 2.0m\n- Foundation: Concrete footing 1.0m deep\n- Surface: Hot-dipped galvanized + powder coating\n- Anti-Ram: K12 rating (15,000 lbs at 50 mph)\n- Blast: ≥100 PSI overpressure\n\n**Applications:**\n- Embassy perimeters\n- Government buildings\n- Military checkpoints\n- Critical infrastructure',
    fullDescZh: '我们的重型防爆护栏专为阻止车辆威胁和承受爆炸冲击而设计。防撞击设计配有加强立柱和深基础。\n\n**规格参数：**\n- 高度：2.5m / 3.0m\n- 框架：100mm × 50mm × 4.0mm 矩形管\n- 网孔：50mm × 50mm × 4.0mm 焊网\n- 立柱间距：2.0m\n- 基础：混凝土基础 深1.0m\n- 表面：热镀锌 + 粉末喷涂\n- 防撞击：K12级别（15,000磅50mph）\n- 防爆：≥100 PSI超压\n\n**应用场景：**\n- 大使馆周界\n- 政府建筑\n- 军事检查站\n- 关键基础设施',
    specs: { height: '2.5m / 3.0m', frame: '100×50×4.0mm rectangular tube', meshAperture: '50mm × 50mm', wireDiameter: '4.0mm', surfaceTreatment: 'Galvanized + Powder Coating', material: 'Q345 High-Strength Steel', antiRam: 'K12 rating', blastResistance: '≥100 PSI' },
    apps: ['Embassies', 'Government buildings', 'Military checkpoints', 'Infrastructure'],
    images: ['/images/products/blast-barrier.jpg'],
    priceUsd: 280, unit: 'FOB Tianjin, per meter', moq: 20, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Heavy-Duty Blast Barrier 2.5m Anti-Ram K12 | Angu Wire Mesh', keywords: 'blast barrier, anti-ram barrier, K12 barrier, security barrier', description: 'Heavy-duty blast barrier 2.5m height, K12 anti-ram rated. Galvanized + powder coated. For embassies, government buildings, and military checkpoints.' },
  },
  {
    slug: 'stage-barrier-1.2m-aluminum',
    categorySlug: 'crowd-barrier',
    nameEn: 'Stage Barrier 1.2m Aluminum Alloy',
    nameZh: '舞台护栏 1.2m 铝合金',
    shortDescEn: 'Lightweight aluminum alloy stage barrier, 1.2m height. For concerts, festivals, and event crowd control. Easy to transport and install.',
    shortDescZh: '轻量化铝合金舞台护栏，1.2m高。用于音乐会、节庆和活动人群控制。易运输安装。',
    fullDescEn: 'Our aluminum stage barriers offer a lightweight yet sturdy solution for event crowd management. The corrosion-resistant aluminum construction is ideal for both indoor and outdoor events.\n\n**Specifications:**\n- Panel Size: 1.2m × 1.0m\n- Frame: 38mm × 25mm × 2.0mm aluminum tube\n- Infill: 25mm × 25mm × 1.5mm aluminum bars\n- Feet: Removable flat feet with rubber pads\n- Surface: Anodized aluminum finish\n- Weight: Approx. 12kg per panel\n- Connection: Hook and loop interlock\n\n**Applications:**\n- Concert front-of-stage\n- Festival crowd control\n- Exhibition queue management\n- VIP area separation',
    fullDescZh: '我们的铝合金舞台护栏为活动人群管理提供轻量化且坚固的解决方案。耐腐蚀铝合金结构适用于室内外活动。\n\n**规格参数：**\n- 面板尺寸：1.2m × 1.0m\n- 框架：38mm × 25mm × 2.0mm 铝管\n- 填充：25mm × 25mm × 1.5mm 铝杆\n- 底座：可拆卸平脚配橡胶垫\n- 表面：阳极氧化铝处理\n- 重量：约12kg/块\n- 连接方式：钩环互锁\n\n**应用场景：**\n- 音乐会台前区\n- 节庆人群控制\n- 展览排队管理\n- VIP区域分隔',
    specs: { panelSize: '1.2m × 1.0m', frame: '38×25×2.0mm aluminum tube', infill: '25×25×1.5mm aluminum bars', surfaceTreatment: 'Anodized Aluminum', material: '6063-T5 Aluminum Alloy', weight: 'Approx. 12kg per panel', connection: 'Hook and loop interlock' },
    apps: ['Concerts', 'Festivals', 'Exhibitions', 'VIP areas'],
    images: ['/images/products/stage-barrier.jpg'],
    priceUsd: 65, unit: 'FOB Tianjin, per panel', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Stage Barrier 1.2m Aluminum Alloy | Angu Wire Mesh', keywords: 'stage barrier, crowd barrier, aluminum barrier, concert barrier', description: 'Lightweight aluminum alloy stage barrier 1.2m height. Anodized finish. For concerts, festivals, exhibitions, and event crowd management.' },
  },
  {
    slug: 'highway-noise-barrier-3m',
    categorySlug: 'noise-barrier',
    nameEn: 'Highway Noise Barrier 3.0m Height',
    nameZh: '公路声屏障 3.0m高',
    shortDescEn: 'Highway noise barrier panel, 3.0m height, composite sound-absorbing design. Noise reduction 15-25dB. For road and railway noise control.',
    shortDescZh: '公路声屏障板，3.0m高，复合吸声设计。降噪15-25dB。用于道路和铁路噪声控制。',
    fullDescEn: 'Our highway noise barriers combine sound-absorbing and sound-insulating materials to effectively reduce traffic noise. The modular design allows easy installation and maintenance.\n\n**Specifications:**\n- Panel Height: 3.0m (2.0-5.0m available)\n- Panel Width: 0.5m / 1.0m / 2.0m\n- Structure: Galvanized steel frame\n- Sound-Absorbing: Rock wool or glass wool, 80kg/m³\n- Face Plate: 1.0mm galvanized perforated steel\n- Back Plate: 1.2mm galvanized steel\n- Noise Reduction: 15-25dB (ASTM E413)\n- Wind Load: Designed per local standards\n- Lifespan: 15-20 years\n\n**Applications:**\n- Highway noise reduction\n- Railway noise control\n- Urban road soundproofing\n- Industrial noise barriers',
    fullDescZh: '我们的公路声屏障结合吸声和隔声材料，有效降低交通噪声。模块化设计便于安装和维护。\n\n**规格参数：**\n- 面板高度：3.0m（2.0-5.0m 可选）\n- 面板宽度：0.5m / 1.0m / 2.0m\n- 结构：镀锌钢框架\n- 吸声材料：岩棉或玻璃棉，80kg/m³\n- 面板：1.0mm 镀锌冲孔钢板\n- 背板：1.2mm 镀锌钢板\n- 降噪：15-25dB（ASTM E413）\n- 风荷载：按当地标准设计\n- 使用寿命：15-20年\n\n**应用场景：**\n- 公路降噪\n- 铁路噪声控制\n- 城市道路隔音\n- 工业噪声屏障',
    specs: { panelHeight: '3.0m', panelWidth: '0.5m / 1.0m / 2.0m', structure: 'Galvanized steel frame', soundAbsorbing: 'Rock wool 80kg/m³', facePlate: '1.0mm galvanized perforated steel', noiseReduction: '15-25dB (ASTM E413)', lifespan: '15-20 years' },
    apps: ['Highways', 'Railways', 'Urban roads', 'Industrial noise'],
    images: ['/images/products/highway-noise-barrier.jpg'],
    priceUsd: 85, unit: 'FOB Tianjin, per m²', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Highway Noise Barrier 3.0m Sound-Absorbing | Angu Wire Mesh', keywords: 'noise barrier, highway sound barrier, acoustic barrier, traffic noise control', description: 'Highway noise barrier 3.0m height, composite sound-absorbing design. 15-25dB noise reduction. For road and railway noise control.' },
  },
  {
    slug: 'equipment-noise-barrier-2.5m',
    categorySlug: 'noise-barrier',
    nameEn: 'Equipment Noise Barrier 2.5m Height',
    nameZh: '设备声屏障 2.5m高',
    shortDescEn: 'Equipment noise barrier for industrial machinery, generators, and compressors. Modular design, easy to install around equipment.',
    shortDescZh: '设备声屏障，用于工业机械、发电机和压缩机。模块化设计，易于围绕设备安装。',
    fullDescEn: 'Our equipment noise barriers are designed for targeted noise control around specific machinery. The compact modular panels can be configured to fit any equipment layout.\n\n**Specifications:**\n- Panel Height: 2.5m (1.5-4.0m available)\n- Panel Width: 0.5m / 1.0m\n- Frame: 50mm × 50mm × 2.0mm galvanized steel\n- Sound-Absorbing: 50mm thick acoustic foam + rock wool\n- Face: 0.8mm perforated aluminum\n- Noise Reduction: 20-30dB\n- Fire Rating: Class A (non-combustible)\n- Weather Resistance: IP55\n\n**Applications:**\n- Generator enclosures\n- Compressor noise control\n- HVAC equipment\n- Factory machinery',
    fullDescZh: '我们的设备声屏障专为特定机械的定向噪声控制而设计。紧凑的模块化面板可配置以适应任何设备布局。\n\n**规格参数：**\n- 面板高度：2.5m（1.5-4.0m 可选）\n- 面板宽度：0.5m / 1.0m\n- 框架：50mm × 50mm × 2.0mm 镀锌钢\n- 吸声材料：50mm厚吸音棉 + 岩棉\n- 面板：0.8mm 冲孔铝板\n- 降噪：20-30dB\n- 防火等级：A级（不燃）\n- 防候等级：IP55\n\n**应用场景：**\n- 发电机隔音罩\n- 压缩机噪声控制\n- HVAC设备\n- 工厂机械',
    specs: { panelHeight: '2.5m', panelWidth: '0.5m / 1.0m', frame: '50×50×2.0mm galvanized steel', soundAbsorbing: '50mm acoustic foam + rock wool', face: '0.8mm perforated aluminum', noiseReduction: '20-30dB', fireRating: 'Class A' },
    apps: ['Generators', 'Compressors', 'HVAC', 'Factory machinery'],
    images: ['/images/products/equipment-noise-barrier.jpg'],
    priceUsd: 120, unit: 'FOB Tianjin, per m²', moq: 50, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Equipment Noise Barrier 2.5m Industrial | Angu Wire Mesh', keywords: 'equipment noise barrier, industrial soundproofing, generator enclosure, machinery noise', description: 'Industrial equipment noise barrier 2.5m height. 20-30dB noise reduction. Modular design for generators, compressors, HVAC, and factory machinery.' },
  },
  {
    slug: 'factory-noise-barrier-4m',
    categorySlug: 'noise-barrier',
    nameEn: 'Factory Noise Barrier Wall 4.0m Height',
    nameZh: '工厂声屏障墙 4.0m高',
    shortDescEn: 'High factory noise barrier wall, 4.0m height. Heavy-duty construction for industrial plant perimeter noise control.',
    shortDescZh: '高工厂声屏障墙，4.0m高。重型结构，用于工业厂区周界噪声控制。',
    fullDescEn: 'Our factory noise barrier walls are designed for maximum noise reduction around industrial facilities. The heavy-duty construction withstands harsh industrial environments.\n\n**Specifications:**\n- Wall Height: 4.0m (3.0-6.0m available)\n- Panel Width: 1.0m / 2.0m\n- Structure: H-beam steel posts + barrier panels\n- Post: H200 × 200 × 8 × 12mm\n- Sound-Absorbing: 100mm rock wool, 100kg/m³\n- Face: 1.2mm galvanized perforated steel\n- Noise Reduction: 25-35dB\n- Wind Load: 0.75 kN/m²\n- Foundation: Concrete pile foundation\n\n**Applications:**\n- Factory perimeter walls\n- Power plant noise control\n- Steel mill soundproofing\n- Cement plant noise barriers',
    fullDescZh: '我们的工厂声屏障墙专为工业设施周边最大降噪而设计。重型结构适应恶劣的工业环境。\n\n**规格参数：**\n- 墙体高度：4.0m（3.0-6.0m 可选）\n- 面板宽度：1.0m / 2.0m\n- 结构：H型钢立柱 + 屏障板\n- 立柱：H200 × 200 × 8 × 12mm\n- 吸声材料：100mm岩棉，100kg/m³\n- 面板：1.2mm 镀锌冲孔钢板\n- 降噪：25-35dB\n- 风荷载：0.75 kN/m²\n- 基础：混凝土桩基础\n\n**应用场景：**\n- 工厂围墙\n- 电厂噪声控制\n- 钢厂隔音\n- 水泥厂声屏障',
    specs: { wallHeight: '4.0m', panelWidth: '1.0m / 2.0m', post: 'H200×200×8×12mm H-beam', soundAbsorbing: '100mm rock wool 100kg/m³', face: '1.2mm galvanized perforated steel', noiseReduction: '25-35dB', windLoad: '0.75 kN/m²' },
    apps: ['Factory perimeters', 'Power plants', 'Steel mills', 'Cement plants'],
    images: ['/images/products/factory-noise-barrier.jpg'],
    priceUsd: 150, unit: 'FOB Tianjin, per m²', moq: 100, isFeatured: 0, sortWeight: 0,
    seo: { title: 'Factory Noise Barrier Wall 4.0m Heavy-Duty | Angu Wire Mesh', keywords: 'factory noise barrier, industrial soundproof wall, plant perimeter wall, noise control', description: 'Heavy-duty factory noise barrier wall 4.0m height. 25-35dB noise reduction. For factory perimeters, power plants, steel mills, and cement plants.' },
  },
];

// Build slug → data map
const productMap = {};
productsStatic.forEach(p => { productMap[p.slug] = p; });

// ══════════════════════════════════════════════
// Helpers
// ══════════════════════════════════════════════

function openDb() {
  return new sqlite3.Database(DB_PATH);
}

function run(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function get(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(db, sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function exec(db, sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function jsonStr(val) {
  return JSON.stringify(val);
}

function isEmptyJson(str) {
  if (!str) return true;
  try {
    const v = JSON.parse(str);
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === 'object') return Object.keys(v).length === 0;
    return false;
  } catch { return false; }
}

function hasUploadImages(imagesStr) {
  if (!imagesStr) return false;
  try {
    const arr = JSON.parse(imagesStr);
    return Array.isArray(arr) && arr.some(img => img.includes('/uploads/'));
  } catch { return false; }
}

// ══════════════════════════════════════════════
// Main Migration
// ══════════════════════════════════════════════

async function migrate() {
  const db = openDb();

  try {
    console.log('=== 步骤 1: 备份数据库 ===');
    await exec(db, 'PRAGMA foreign_keys=OFF;');

    // ── 1a. Migrate products table: UNIQUE(slug) → UNIQUE(slug, locale) ──
    console.log('\n=== 步骤 2: 修复 products 表唯一约束 (slug → slug+locale) ===');
    
    // Check if the unique constraint has already been changed
    const hasZhProduct = await get(db, "SELECT COUNT(*) as cnt FROM products WHERE locale='zh'");
    const needSchemaFix = hasZhProduct.cnt === 0;
    
    if (needSchemaFix) {
      console.log('  重命名 products → products_old');
      await exec(db, 'ALTER TABLE products RENAME TO products_old;');
      
      console.log('  创建新 products 表 (UNIQUE(slug, locale))');
      await exec(db, `
        CREATE TABLE products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slug TEXT NOT NULL,
          category_slug TEXT NOT NULL,
          name TEXT NOT NULL,
          short_description TEXT,
          description TEXT,
          price REAL,
          unit TEXT,
          moq INTEGER,
          sort_weight INTEGER DEFAULT 0,
          status TEXT DEFAULT 'draft',
          is_featured INTEGER DEFAULT 0,
          images TEXT,
          specifications TEXT,
          applications TEXT,
          seo_title TEXT,
          seo_keywords TEXT,
          seo_description TEXT,
          locale TEXT DEFAULT 'en',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(slug, locale)
        );
      `);
      
      console.log('  复制数据到新表');
      await exec(db, 'INSERT INTO products SELECT * FROM products_old;');
      
      console.log('  删除旧表');
      await exec(db, 'DROP TABLE products_old;');
      console.log('  ✓ products 表迁移完成');
    } else {
      console.log('  ✓ 跳过 — 已存在 zh locale 行');
    }

    // ── 1b. Migrate product_categories table ──
    console.log('\n=== 步骤 3: 修复 product_categories 表唯一约束 (slug → slug+locale) ===');
    
    const hasZhCat = await get(db, "SELECT COUNT(*) as cnt FROM product_categories WHERE locale='zh'");
    const needCatSchemaFix = hasZhCat.cnt === 0;
    
    if (needCatSchemaFix) {
      console.log('  重命名 product_categories → product_categories_old');
      await exec(db, 'ALTER TABLE product_categories RENAME TO product_categories_old;');
      
      console.log('  创建新 product_categories 表 (UNIQUE(slug, locale))');
      await exec(db, `
        CREATE TABLE product_categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slug TEXT NOT NULL,
          name TEXT NOT NULL,
          thumbnail TEXT,
          sort_weight INTEGER DEFAULT 0,
          status TEXT DEFAULT 'published',
          locale TEXT DEFAULT 'en',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(slug, locale)
        );
      `);
      
      console.log('  复制数据到新表');
      await exec(db, 'INSERT INTO product_categories SELECT * FROM product_categories_old;');
      
      console.log('  删除旧表');
      await exec(db, 'DROP TABLE product_categories_old;');
      console.log('  ✓ product_categories 表迁移完成');
    } else {
      console.log('  ✓ 跳过 — 已存在 zh locale 行');
    }

    // ── 2. Update existing en locale products ──
    console.log('\n=== 步骤 4: 更新现有 en locale 产品数据 ===');
    
    const enProducts = await all(db, "SELECT id, slug, images FROM products WHERE locale='en'");
    let updatedCount = 0;
    
    for (const row of enProducts) {
      const staticData = productMap[row.slug];
      if (!staticData) {
        console.log(`  ⚠ 静态数据中未找到 slug: ${row.slug}`);
        continue;
      }
      
      // Determine images: keep /uploads/ if present, else use static
      let imagesJson = row.images;
      if (!hasUploadImages(row.images)) {
        imagesJson = jsonStr(staticData.images);
      }
      
      const specsJson = jsonStr(staticData.specs);
      const appsJson = jsonStr(staticData.apps);
      
      await run(db,
        `UPDATE products SET
          specifications = ?,
          applications = ?,
          images = ?,
          short_description = ?,
          description = ?,
          seo_title = ?,
          seo_keywords = ?,
          seo_description = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND locale = 'en'`,
        [
          specsJson,
          appsJson,
          imagesJson,
          staticData.shortDescEn,
          staticData.fullDescEn,
          staticData.seo.title,
          staticData.seo.keywords,
          staticData.seo.description,
          row.id,
        ]
      );
      updatedCount++;
    }
    console.log(`  ✓ 更新了 ${updatedCount} 个 en 产品`);

    // ── 3. Insert zh locale products ──
    console.log('\n=== 步骤 5: 插入 zh locale 产品行 ===');
    
    let zhInserted = 0;
    let zhSkipped = 0;
    
    for (const [slug, staticData] of Object.entries(productMap)) {
      // Check if zh row already exists
      const existingZh = await get(db, "SELECT id FROM products WHERE slug=? AND locale='zh'", [slug]);
      if (existingZh) {
        zhSkipped++;
        continue;
      }
      
      // Get en row for this product to copy shared fields
      const enRow = await get(db, "SELECT * FROM products WHERE slug=? AND locale='en'", [slug]);
      if (!enRow) {
        console.log(`  ⚠ DB 中未找到 en 产品: ${slug}`);
        continue;
      }
      
      // Determine images: use en row's images (which we just updated above)
      const imagesJson = enRow.images;
      const specsJson = jsonStr(staticData.specs);
      const appsJson = jsonStr(staticData.apps);
      
      await run(db,
        `INSERT INTO products (
          slug, category_slug, name, short_description, description,
          price, unit, moq, sort_weight, status, is_featured,
          images, specifications, applications,
          seo_title, seo_keywords, seo_description,
          locale
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'zh')`,
        [
          slug,
          enRow.category_slug,
          staticData.nameZh,
          staticData.shortDescZh,
          staticData.fullDescZh,
          enRow.price,
          enRow.unit,
          enRow.moq,
          enRow.sort_weight || 0,
          enRow.status || 'published',
          enRow.is_featured || 0,
          imagesJson,
          specsJson,
          appsJson,
          staticData.seo.title,
          staticData.seo.keywords,
          staticData.seo.description,
        ]
      );
      zhInserted++;
    }
    console.log(`  ✓ 插入 ${zhInserted} 个 zh 产品，跳过 ${zhSkipped} 个已存在`);

    // ── 4. Insert zh locale product_categories ──
    console.log('\n=== 步骤 6: 插入 zh locale 分类行 ===');
    
    let catZhInserted = 0;
    let catZhSkipped = 0;
    
    for (const [slug, zhName] of Object.entries(categoryNamesZH)) {
      const existingZh = await get(db, "SELECT id FROM product_categories WHERE slug=? AND locale='zh'", [slug]);
      if (existingZh) {
        catZhSkipped++;
        continue;
      }
      
      // Get en row to copy shared fields
      const enCat = await get(db, "SELECT * FROM product_categories WHERE slug=? AND locale='en'", [slug]);
      if (!enCat) {
        console.log(`  ⚠ DB 中未找到 en 分类: ${slug}`);
        continue;
      }
      
      await run(db,
        `INSERT INTO product_categories (slug, name, thumbnail, sort_weight, status, locale)
         VALUES (?, ?, ?, ?, ?, 'zh')`,
        [slug, zhName, enCat.thumbnail, enCat.sort_weight || 0, enCat.status || 'published']
      );
      catZhInserted++;
    }
    console.log(`  ✓ 插入 ${catZhInserted} 个 zh 分类，跳过 ${catZhSkipped} 个已存在`);

    console.log('\n=== 迁移完成 ===');
  } catch (err) {
    console.error('迁移失败:', err);
    process.exit(1);
  } finally {
    db.close();
  }
}

migrate();
