import {Product, Category} from '@/types/product';

// ═══════════════════════════════════════════════════════════
// 九大类目结构
// ═══════════════════════════════════════════════════════════

export const categories: Category[] = [
  // 一、丝网类
  {
    id: 'cat-wire-mesh',
    slug: 'wire-mesh',
    names: {
      en: 'Wire Mesh',
      zh: '丝网类',
      ar: 'شبكة سلكية',
      ja: '金網類',
      ko: '철망류',
      id: 'Kawat Mesh',
      vi: 'Lưới Dây',
      es: 'Malla de Alambre',
      fr: 'Treillis Métallique',
      de: 'Drahtgeflecht',
      pt: 'Malha de Arame',
      th: 'ตะแกรงลวด',
    },
    descriptions: {
      en: 'Welded wire mesh, chain link fence, hexagonal mesh, holland mesh, crimped mesh, and cattle fence.',
      zh: '电焊网、勾花网、六角网、荷兰网、轧花网、牛栏网等丝网产品。',
    },
    image: '/images/products/welded-wire-mesh.jpg',
    productCount: 6,
  },
  // 二、护栏网类
  {
    id: 'cat-fence',
    slug: 'fence',
    names: {
      en: 'Fence & Barrier',
      zh: '护栏网类',
      ar: 'السياج والحواجز',
      ja: 'フェンス類',
      ko: '울타리류',
      id: 'Pagar & Pembatas',
      vi: 'Hàng Rào & Rào Chắn',
      es: 'Cercas y Barreras',
      fr: 'Clôtures et Barrières',
      de: 'Zäune und Barrieren',
      pt: 'Cercas e Barreiras',
      th: 'รั้วและสิ่งกีดขวาง',
    },
    descriptions: {
      en: 'Stadium fence, isolation fence, highway guardrail, and crowd control barriers.',
      zh: '球场围网、隔离围网、护栏网、防爆护栏、演唱会护栏等。',
    },
    image: '/images/products/stadium-fence.jpg',
    productCount: 5,
  },
  // 三、刺绳
  {
    id: 'cat-barbed-wire',
    slug: 'barbed-wire',
    names: {
      en: 'Barbed Wire',
      zh: '刺绳',
      ar: 'الأسلاك الشائكة',
      ja: '有刺鉄線',
      ko: '가시철선',
      id: 'Kawat Berduri',
      vi: 'Dây Thép Gai',
      es: 'Alambre de Púas',
      fr: 'Fil Barbelé',
      de: 'Stacheldraht',
      pt: 'Arame Farpado',
      th: 'ลวดหนาม',
    },
    descriptions: {
      en: 'Razor blade barbed wire and steel barbed wire for high-security perimeter protection.',
      zh: '刀片刺绳、钢丝刺绳，用于高安全等级周界防护。',
    },
    image: '/images/products/razor-wire.jpg',
    productCount: 2,
  },
  // 四、边坡防护网
  {
    id: 'cat-slope-protection',
    slug: 'slope-protection',
    names: {
      en: 'Slope Protection Net',
      zh: '边坡防护网',
      ar: 'شبكة حماية المنحدرات',
      ja: '法面防護網',
      ko: '사면 보호망',
      id: 'Jaring Perlindungan Lereng',
      vi: 'Lưới Bảo Vệ Mái Dốc',
      es: 'Red de Protección de Taludes',
      fr: 'Filet de Protection de Pente',
      de: 'Hanggleitnetz',
      pt: 'Rede de Proteção de Talude',
      th: 'ตะแกรงป้องกันลาดชัน',
    },
    descriptions: {
      en: 'Active and passive slope protection nets for landslide prevention and rockfall control.',
      zh: '主动边坡防护网、被动边坡防护网，用于滑坡预防和落石控制。',
    },
    image: '/images/products/slope-protection.jpg',
    productCount: 2,
  },
  // 五、防爆石笼网/防爆墙
  {
    id: 'cat-blast-wall',
    slug: 'blast-wall',
    names: {
      en: 'Blast Wall & Hesco',
      zh: '防爆石笼网/防爆墙',
      ar: 'جدار الانفجار',
      ja: '防爆壁・ヘスコ',
      ko: '방폭벽/헤스코',
      id: 'Dinding Ledakan',
      vi: 'Tường Chống Cháy Nổ',
      es: 'Muro Antiblástico',
      fr: 'Mur Anti-Explosion',
      de: 'Explosionsschutzwand',
      pt: 'Muro Anti-Explosão',
      th: 'กำแพงกันระเบิด',
    },
    descriptions: {
      en: 'Hesco bastion blast walls and explosion-proof gabion systems for military and security applications.',
      zh: '防爆石笼网、防爆墙（Hesco堡垒墙），用于军事和安全防护。',
    },
    image: '/images/products/blast-wall.jpg',
    productCount: 2,
  },
  // 六、石笼网
  {
    id: 'cat-gabion',
    slug: 'gabion',
    names: {
      en: 'Gabion Mesh',
      zh: '石笼网',
      ar: 'شبكة الجابيون',
      ja: '石籠金網',
      ko: '가비언 메쉬',
      id: 'Jaring Gabion',
      vi: 'Lưới Gabion',
      es: 'Malla Gabión',
      fr: 'Maille Gabion',
      de: 'Gabion Drahtgeflecht',
      pt: 'Malha Gabião',
      th: 'ตะแกรงกล่องหิน',
    },
    descriptions: {
      en: 'Gabion boxes, Reno mattresses, and gabion baskets for erosion control and hydraulic engineering.',
      zh: '石笼网箱、雷诺护垫、石笼篮，用于侵蚀控制和水工工程。',
    },
    image: '/images/products/gabion-box.jpg',
    productCount: 4,
  },
  // 七、不锈钢绳网
  {
    id: 'cat-stainless-rope-net',
    slug: 'stainless-rope-net',
    names: {
      en: 'Stainless Steel Rope Net',
      zh: '不锈钢绳网',
      ar: 'شبكة حبال الفولاذ المقاوم للصدأ',
      ja: 'ステンレスロープネット',
      ko: '스테인리스 로프망',
      id: 'Jaring Tali Stainless',
      vi: 'Lưới Dây Thép Không Gỉ',
      es: 'Red de Cables de Acero Inoxidable',
      fr: 'Filet de Câbles Inox',
      de: 'Edelstahlseilnetz',
      pt: 'Rede de Cabos de Aço Inoxidável',
      th: 'ตาข่ายเชือกสแตนเลส',
    },
    descriptions: {
      en: 'High-grade stainless steel wire rope mesh for architectural, zoo, and safety applications.',
      zh: '高等级不锈钢丝绳网，用于建筑、动物园和安全防护。',
    },
    image: '/images/products/stainless-rope-net.jpg',
    productCount: 2,
  },
  // 八、防爆护栏/演唱会护栏
  {
    id: 'cat-crowd-barrier',
    slug: 'crowd-barrier',
    names: {
      en: 'Crowd Control Barrier',
      zh: '防爆护栏/演唱会护栏',
      ar: 'حواجز التحكم في الحشود',
      ja: '群衆整理バリア',
      ko: '인파 통제 울타리',
      id: 'Penghalang Kerumunan',
      vi: 'Rào Chắn Kiểm Soát Đám Đông',
      es: 'Barrera de Control de Multitudes',
      fr: 'Barrière de Foule',
      de: 'Menschenmengen-Barriere',
      pt: 'Barreira de Controle de Multidão',
      th: 'แผงกั้นควบคุมฝูงชน',
    },
    descriptions: {
      en: 'Heavy-duty crowd control barriers and explosion-proof guardrails for events and security zones.',
      zh: '重型防爆护栏、演唱会护栏，用于活动安保和安全区域隔离。',
    },
    image: '/images/products/crowd-barrier.jpg',
    productCount: 2,
  },
  // 九、声屏障
  {
    id: 'cat-noise-barrier',
    slug: 'noise-barrier',
    names: {
      en: 'Noise Barrier',
      zh: '声屏障',
      ar: 'حاجز الصوت',
      ja: '防音壁',
      ko: '소음 방지벽',
      id: 'Penghalang Bising',
      vi: 'Hàng Rào Chống Ồn',
      es: 'Barrera Acústica',
      fr: 'Barrière Antibruit',
      de: 'Lärmschutzwand',
      pt: 'Barreira de Ruído',
      th: 'แผงกั้นเสียง',
    },
    descriptions: {
      en: 'Highway noise barriers, equipment noise barriers, and factory sound insulation walls.',
      zh: '公路声屏障、设备声屏障、工厂声屏障，用于交通和工业降噪。',
    },
    image: '/images/products/noise-barrier.jpg',
    productCount: 3,
  },
];

// ═══════════════════════════════════════════════════════════
// 产品数据
// ═══════════════════════════════════════════════════════════

export const products: Product[] = [
  // ═══ 一、丝网类 ═══
  // 1.1 电焊网
  {
    id: 'prod-wm-001',
    sku: 'WM-WELD-50-2.0',
    slug: 'welded-wire-mesh-50mm',
    categorySlug: 'wire-mesh',
    names: {
      en: 'Welded Wire Mesh 50mm × 2.0mm Galvanized',
      zh: '电焊网 50mm × 2.0mm 镀锌',
      ja: '溶接金網 50mm × 2.0mm 亜鉛めっき',
      ko: '용접 철망 50mm × 2.0mm 아연도금',
    },
    shortDescriptions: {
      en: 'Hot-dipped galvanized welded wire mesh with 50mm square opening and 2.0mm wire. Ideal for construction reinforcement and fencing.',
      zh: '热镀锌电焊网，50mm方孔，2.0mm丝径。适用于建筑加固和围栏。',
    },
    fullDescriptions: {
      en: `Our welded wire mesh is manufactured from high-quality low carbon steel wires, welded at every intersection to create a strong, uniform grid. Hot-dipped galvanization ensures long-term corrosion resistance.

**Specifications:**
- Mesh Opening: 50mm × 50mm
- Wire Diameter: 2.0mm (1.5-3.0mm available)
- Width: 1.0m / 1.2m / 1.5m / 2.0m
- Length: 30m standard roll
- Surface: Hot-dipped galvanized (≥80g/m²)
- Tensile Strength: ≥380 N/mm²

**Applications:**
- Construction reinforcement (concrete slab, wall)
- Animal enclosures and cages
- Garden fencing
- Industrial machine guards`,
    },
    specifications: {
      meshAperture: '50mm × 50mm',
      wireDiameter: '2.0mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)',
      material: 'Low Carbon Steel Wire',
      width: '1.0m / 1.2m / 1.5m / 2.0m',
      length: '30m standard roll',
      tensileStrength: '≥380 N/mm²',
    },
    applications: ['Construction reinforcement', 'Animal cages', 'Garden fencing', 'Machine guards'],
    images: ['/images/products/welded-wire-mesh.jpg'],
    moq: 50,
    priceUsd: 28,
    priceRemark: 'FOB Tianjin, per roll',
    isFeatured: true,
    createdAt: '2025-01-01',
  },
  // 1.2 勾花网
  {
    id: 'prod-wm-002',
    sku: 'WM-CHAIN-50-2.5',
    slug: 'chain-link-fence-50mm',
    categorySlug: 'wire-mesh',
    names: {
      en: 'Chain Link Fence 50mm × 2.5mm Galvanized',
      zh: '勾花网 50mm × 2.5mm 镀锌',
      ja: 'チェーンリンクフェンス 50mm × 2.5mm',
      ko: '체인 링크 펜스 50mm × 2.5mm',
    },
    shortDescriptions: {
      en: 'Diamond-pattern chain link fence with 50mm mesh and 2.5mm wire. Heavy-duty galvanized for security and boundary applications.',
      zh: '菱形勾花网，50mm网孔，2.5mm丝径。重型镀锌，用于安全和边界围栏。',
    },
    fullDescriptions: {
      en: `Our chain link fences feature a classic diamond pattern that provides both visibility and security. Manufactured from hot-dipped galvanized steel wire for maximum durability.

**Specifications:**
- Mesh Size: 50mm × 50mm (2" × 2")
- Wire Diameter: 2.5mm
- Height: 1.0m to 4.0m available
- Roll Length: 10m / 15m / 20m
- Surface: Hot-dipped galvanized (≥60g/m²)
- Selvage: Knuckled or twisted

**Applications:**
- Sports field fencing
- Construction site boundaries
- Industrial perimeter security
- Residential property boundaries`,
    },
    specifications: {
      meshAperture: '50mm × 50mm',
      wireDiameter: '2.5mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥60g/m²)',
      material: 'Low Carbon Steel Wire',
      height: '1.0m - 4.0m',
      rollLength: '10m / 15m / 20m',
    },
    applications: ['Sports fields', 'Construction sites', 'Industrial security', 'Residential'],
    images: ['/images/products/chain-link.jpg'],
    moq: 50,
    priceUsd: 25,
    priceRemark: 'FOB Tianjin, per roll',
    isFeatured: true,
    createdAt: '2025-01-02',
  },
  // 1.3 六角网
  {
    id: 'prod-wm-003',
    sku: 'WM-HEX-25-0.8',
    slug: 'hexagonal-wire-mesh-25mm',
    categorySlug: 'wire-mesh',
    names: {
      en: 'Hexagonal Wire Mesh 25mm (1") Galvanized',
      zh: '六角网 25mm (1英寸) 镀锌',
      ja: '六角金網 25mm (1インチ) 亜鉛めっき',
      ko: '육각 철망 25mm (1인치) 아연도금',
    },
    shortDescriptions: {
      en: 'Double-twist hexagonal wire mesh with 25mm opening. Used for gabion baskets, chicken wire, and general protection.',
      zh: '双绞六角网，25mm网孔。用于石笼篮、养鸡网和一般防护。',
    },
    fullDescriptions: {
      en: `Our hexagonal wire mesh is woven using the double-twist technique, providing excellent flexibility and structural integrity. Available in various mesh sizes for diverse applications.

**Specifications:**
- Mesh Type: Double twist hexagonal
- Mesh Size: 25mm (1")
- Wire Diameter: 0.8mm (0.5-1.2mm available)
- Width: 1.0m / 1.2m / 1.5m / 2.0m
- Length: 30m standard roll
- Surface: Hot-dipped galvanized (≥80g/m²)

**Applications:**
- Small gabion baskets
- Poultry and animal enclosures
- Garden fencing
- Tree guards`,
    },
    specifications: {
      meshAperture: '25mm (1")',
      wireDiameter: '0.8mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)',
      material: 'Low Carbon Steel Wire',
      width: '1.0m / 1.2m / 1.5m / 2.0m',
      length: '30m standard roll',
    },
    applications: ['Gabion baskets', 'Poultry enclosures', 'Garden fencing', 'Tree guards'],
    images: ['/images/products/hexagonal-mesh.jpg'],
    moq: 50,
    priceUsd: 22,
    priceRemark: 'FOB Tianjin, per roll',
    isFeatured: true,
    createdAt: '2025-01-03',
  },
  // 1.4 荷兰网
  {
    id: 'prod-wm-004',
    sku: 'WM-HOLL-50-2.0',
    slug: 'holland-wire-mesh-50mm',
    categorySlug: 'wire-mesh',
    names: {
      en: 'Holland Wire Mesh (Euro Fence) 50mm × 2.0mm',
      zh: '荷兰网（欧式围栏）50mm × 2.0mm',
      ja: 'オランダ金網（ユーロフェンス）50mm × 2.0mm',
      ko: '네덜란드 철망 (유로 펜스) 50mm × 2.0mm',
    },
    shortDescriptions: {
      en: 'PVC coated Holland wire mesh (Euro fence) with wave-shaped horizontal wire. Aesthetic and durable for residential and commercial fencing.',
      zh: 'PVC包塑荷兰网（欧式围栏），波浪形横丝。美观耐用，适用于住宅和商业围栏。',
    },
    fullDescriptions: {
      en: `Holland wire mesh, also known as Euro fence, features a distinctive wave-shaped horizontal wire that adds both strength and aesthetic appeal. The PVC coating provides excellent weather resistance.

**Specifications:**
- Mesh Size: 50mm × 50mm / 50mm × 100mm
- Wire Diameter: 2.0mm core + 0.5mm PVC
- Post: 48mm round tube with plastic cap
- Height: 1.0m / 1.2m / 1.5m / 1.8m / 2.0m
- Colors: Green, Black, White
- Surface: PVC coated over galvanized wire

**Applications:**
- Residential gardens
- Parks and green spaces
- Highway green belts
- Farm boundaries`,
    },
    specifications: {
      meshAperture: '50mm × 50mm / 50mm × 100mm',
      wireDiameter: '2.0mm core + 0.5mm PVC',
      surfaceTreatment: 'PVC Coated (over galvanized)',
      material: 'Low Carbon Steel + PVC',
      height: '1.0m - 2.0m',
      colors: 'Green, Black, White',
    },
    applications: ['Residential gardens', 'Parks', 'Highway green belts', 'Farm boundaries'],
    images: ['/images/products/holland-mesh.jpg'],
    moq: 50,
    priceUsd: 35,
    priceRemark: 'FOB Tianjin, per roll',
    isFeatured: false,
    createdAt: '2025-01-04',
  },
  // 1.5 轧花网
  {
    id: 'prod-wm-005',
    sku: 'WM-CRIMP-10-2.0',
    slug: 'crimped-wire-mesh-10mm',
    categorySlug: 'wire-mesh',
    names: {
      en: 'Crimped Wire Mesh 10mm × 2.0mm Stainless Steel',
      zh: '轧花网 10mm × 2.0mm 不锈钢',
      ja: 'クリンプ金網 10mm × 2.0mm ステンレス',
      ko: '주름 철망 10mm × 2.0mm 스테인리스',
    },
    shortDescriptions: {
      en: 'Stainless steel crimped wire mesh with 10mm square opening. Pre-crimped wires for high-tension screening and filtering applications.',
      zh: '不锈钢轧花网，10mm方孔。预弯成型，用于高张力筛分和过滤。',
    },
    fullDescriptions: {
      en: `Our crimped wire mesh is made by pre-crimping wires before weaving, creating a rigid mesh structure that maintains its shape under tension. Stainless steel option offers superior corrosion resistance.

**Specifications:**
- Mesh Opening: 10mm × 10mm (2-50mm available)
- Wire Diameter: 2.0mm (1.0-5.0mm available)
- Material: 304/316 Stainless Steel
- Width: 1.0m / 1.5m
- Length: Custom
- Weave Type: Pre-crimped / lock crimped

**Applications:**
- Mining and quarry screening
- Food processing filters
- Chemical industry sieving
- Architectural decoration`,
    },
    specifications: {
      meshAperture: '10mm × 10mm',
      wireDiameter: '2.0mm',
      surfaceTreatment: 'Stainless Steel (304/316)',
      material: 'Stainless Steel Wire',
      width: '1.0m / 1.5m',
      weaveType: 'Pre-crimped / Lock crimped',
    },
    applications: ['Mining screening', 'Food filters', 'Chemical sieving', 'Architecture'],
    images: ['/images/products/crimped-mesh.jpg'],
    moq: 10,
    priceUsd: 85,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-05',
  },
  // 1.6 牛栏网
  {
    id: 'prod-wm-006',
    sku: 'WM-CATTLE-150-2.5',
    slug: 'cattle-fence-150mm',
    categorySlug: 'wire-mesh',
    names: {
      en: 'Cattle Fence (Field Fence) 150mm × 2.5mm',
      zh: '牛栏网（草原网）150mm × 2.5mm',
      ja: '牧場フェンス 150mm × 2.5mm',
      ko: '소 울타리 (목장 울타리) 150mm × 2.5mm',
    },
    shortDescriptions: {
      en: 'Heavy-duty field fence with graduated mesh spacing. Top wires closer, bottom wider. For cattle, horses, and livestock containment.',
      zh: '重型草原网，渐变网孔间距。上部密下部宽，用于牛羊马等牲畜围栏。',
    },
    fullDescriptions: {
      en: `Our cattle fence (field fence) features a graduated mesh design with smaller openings at the bottom to prevent small animals from passing through, and larger openings at the top for cost efficiency.

**Specifications:**
- Top Mesh: 150mm / 200mm / 300mm
- Bottom Mesh: 100mm / 150mm
- Wire Diameter: 2.5mm top / 2.0mm bottom
- Height: 1.2m / 1.5m / 1.8m / 2.0m
- Roll Length: 50m / 100m
- Surface: Hot-dipped galvanized (≥120g/m²)
- Knot Type: Hinge joint knot

**Applications:**
- Cattle and horse pastures
- Sheep and goat enclosures
- Wildlife reserves
- Farm boundary fencing`,
    },
    specifications: {
      meshAperture: 'Graduated: 100-300mm',
      wireDiameter: '2.0-2.5mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥120g/m²)',
      material: 'High Tensile Steel Wire',
      height: '1.2m - 2.0m',
      rollLength: '50m / 100m',
      knotType: 'Hinge joint',
    },
    applications: ['Cattle pastures', 'Horse enclosures', 'Wildlife reserves', 'Farm boundaries'],
    images: ['/images/products/cattle-fence.jpg'],
    moq: 50,
    priceUsd: 45,
    priceRemark: 'FOB Tianjin, per roll',
    isFeatured: false,
    createdAt: '2025-01-06',
  },

  // ═══ 二、护栏网类 ═══
  // 2.1 球场围网
  {
    id: 'prod-fc-001',
    sku: 'FC-STAD-50-3.0',
    slug: 'stadium-fence-50mm',
    categorySlug: 'fence',
    names: {
      en: 'Stadium Fence (Sports Field Fence) 50mm × 3.0mm',
      zh: '球场围网 50mm × 3.0mm',
      ja: '競技場フェンス 50mm × 3.0mm',
      ko: '경기장 울타리 50mm × 3.0mm',
    },
    shortDescriptions: {
      en: 'Heavy-duty stadium fence with 50mm mesh and 3.0mm wire. PVC coated green, with posts and accessories. For football, basketball, tennis courts.',
      zh: '重型球场围网，50mm网孔，3.0mm丝径。PVC包塑绿色，含立柱配件。用于足球、篮球、网球场。',
    },
    fullDescriptions: {
      en: `Our stadium fences are designed for high-impact sports applications. The heavy-gauge wire and tight mesh spacing prevent ball penetration while maintaining visibility.

**Specifications:**
- Mesh Size: 50mm × 50mm
- Wire Diameter: 3.0mm core + 0.8mm PVC
- Height: 3.0m / 4.0m / 6.0m
- Post: 60mm × 60mm × 2.5mm square tube
- Color: Green (RAL 6005) / Blue
- Surface: PVC coated over hot-dipped galvanized
- Accessories: Post caps, tension wires, clips

**Applications:**
- Football/soccer fields
- Basketball courts
- Tennis courts
- Baseball diamonds`,
    },
    specifications: {
      meshAperture: '50mm × 50mm',
      wireDiameter: '3.0mm core + 0.8mm PVC',
      surfaceTreatment: 'PVC Coated (over galvanized)',
      material: 'Low Carbon Steel + PVC',
      height: '3.0m / 4.0m / 6.0m',
      post: '60×60×2.5mm square tube',
      colors: 'Green (RAL 6005) / Blue',
    },
    applications: ['Football fields', 'Basketball courts', 'Tennis courts', 'Baseball fields'],
    images: ['/images/products/stadium-fence.jpg'],
    moq: 200,
    priceUsd: 35,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-07',
  },
  // 2.2 隔离围网
  {
    id: 'prod-fc-002',
    sku: 'FC-ISOL-50-2.5',
    slug: 'isolation-fence-50mm',
    categorySlug: 'fence',
    names: {
      en: 'Isolation Fence (Temporary Fence) 50mm × 2.5mm',
      zh: '隔离围网（临时围栏）50mm × 2.5mm',
      ja: '隔離フェンス（仮設フェンス）50mm × 2.5mm',
      ko: '격리 울타리 (임시 울타리) 50mm × 2.5mm',
    },
    shortDescriptions: {
      en: 'Modular isolation fence panels with 50mm mesh. Hot-dipped galvanized, easy to install and relocate. For construction sites and events.',
      zh: '模块化隔离围网，50mm网孔。热镀锌，易安装搬迁。用于工地和活动场所。',
    },
    fullDescriptions: {
      en: `Our isolation fence panels are designed for quick deployment and relocation. The modular design allows flexible configuration for any site layout.

**Specifications:**
- Panel Size: 2.0m × 3.0m standard
- Mesh Size: 50mm × 50mm / 50mm × 100mm
- Wire Diameter: 2.5mm
- Frame: 25mm × 25mm × 1.5mm square tube
- Surface: Hot-dipped galvanized (≥80g/m²)
- Base: Concrete-filled plastic base or steel base
- Connection: Clips or bolts

**Applications:**
- Construction site isolation
- Event crowd control
- Road maintenance zones
- Emergency response areas`,
    },
    specifications: {
      meshAperture: '50mm × 50mm / 50mm × 100mm',
      wireDiameter: '2.5mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)',
      material: 'Low Carbon Steel Wire',
      panelSize: '2.0m × 3.0m',
      frame: '25×25×1.5mm square tube',
    },
    applications: ['Construction sites', 'Events', 'Road maintenance', 'Emergency areas'],
    images: ['/images/products/isolation-fence.jpg'],
    moq: 50,
    priceUsd: 55,
    priceRemark: 'FOB Tianjin, per panel',
    isFeatured: false,
    createdAt: '2025-01-08',
  },
  // 2.3 护栏网
  {
    id: 'prod-fc-003',
    sku: 'FC-GUARD-W-BEAM',
    slug: 'highway-guardrail-w-beam',
    categorySlug: 'fence',
    names: {
      en: 'Highway Guardrail W-Beam Galvanized',
      zh: '公路护栏网 W型波形板',
      ja: '高速道路ガードレール Wビーム',
      ko: '고속도로 가드레일 W빔',
    },
    shortDescriptions: {
      en: 'Standard W-beam highway guardrail, hot-dipped galvanized. AASHTO M180 standard, for road safety and vehicle impact protection.',
      zh: '标准W型波形公路护栏，热镀锌。符合AASHTO M180标准，用于道路安全和车辆碰撞防护。',
    },
    fullDescriptions: {
      en: `Our W-beam highway guardrails comply with AASHTO M180 and EN 1317 standards. The wave-shaped design absorbs impact energy and redirects vehicles back to the roadway.

**Specifications:**
- Rail Type: W-beam (two-wave / three-wave)
- Rail Size: 310mm × 85mm × 3.0mm / 4.0mm
- Post: 114mm × 4.5mm round post / 130mm × 130mm × 6mm square post
- Length: 4.32m standard (custom available)
- Surface: Hot-dipped galvanized (≥550g/m²)
- Standard: AASHTO M180 / EN 1317
- Accessories: Post caps, bolts, reflectors

**Applications:**
- Highway median barriers
- Roadside protection
- Bridge approach guards
- Mountain road safety`,
    },
    specifications: {
      railType: 'W-beam (two-wave / three-wave)',
      railSize: '310×85×3.0/4.0mm',
      post: '114×4.5mm round / 130×130×6mm square',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥550g/m²)',
      material: 'Q235/Q345 Steel',
      length: '4.32m standard',
      standard: 'AASHTO M180 / EN 1317',
    },
    applications: ['Highways', 'Roadside protection', 'Bridge approaches', 'Mountain roads'],
    images: ['/images/products/guardrail.jpg'],
    moq: 100,
    priceUsd: 45,
    priceRemark: 'FOB Tianjin, per meter',
    isFeatured: false,
    createdAt: '2025-01-09',
  },
  // 2.4 防爆护栏
  {
    id: 'prod-fc-004',
    sku: 'FC-BLAST-2.0',
    slug: 'explosion-proof-guardrail',
    categorySlug: 'fence',
    names: {
      en: 'Explosion-Proof Guardrail 2.0m Height',
      zh: '防爆护栏 2.0m高',
      ja: '防爆ガードレール 2.0m高',
      ko: '방폭 가드레일 2.0m 높이',
    },
    shortDescriptions: {
      en: 'Heavy-duty explosion-proof guardrail with reinforced steel posts and mesh. For military bases, power plants, and high-security zones.',
      zh: '重型防爆护栏，加强钢立柱和网片。用于军事基地、电厂和高安全区域。',
    },
    fullDescriptions: {
      en: `Our explosion-proof guardrails are engineered to withstand high-impact forces and blast pressures. Reinforced construction with heavy-gauge materials ensures maximum protection.

**Specifications:**
- Height: 2.0m / 2.5m / 3.0m
- Mesh: 50mm × 50mm × 4.0mm wire
- Post: 80mm × 80mm × 3.0mm square tube
- Surface: Hot-dipped galvanized + powder coating
- Foundation: Concrete base with anchor bolts
- Anti-climb: Barbed wire or razor wire optional
- Impact Resistance: ≥50kJ

**Applications:**
- Military installations
- Power plants and substations
- Oil and gas facilities
- Government buildings`,
    },
    specifications: {
      meshAperture: '50mm × 50mm',
      wireDiameter: '4.0mm',
      surfaceTreatment: 'Galvanized + Powder Coating',
      material: 'Q345 High-Strength Steel',
      height: '2.0m / 2.5m / 3.0m',
      post: '80×80×3.0mm square tube',
      impactResistance: '≥50kJ',
    },
    applications: ['Military bases', 'Power plants', 'Oil/gas facilities', 'Government buildings'],
    images: ['/images/products/blast-guardrail.jpg'],
    moq: 50,
    priceUsd: 120,
    priceRemark: 'FOB Tianjin, per meter',
    isFeatured: false,
    createdAt: '2025-01-10',
  },
  // 2.5 演唱会护栏
  {
    id: 'prod-fc-005',
    sku: 'FC-CONCERT-1.1',
    slug: 'concert-crowd-barrier',
    categorySlug: 'fence',
    names: {
      en: 'Concert Crowd Control Barrier 1.1m × 2.0m',
      zh: '演唱会护栏（人群控制栏）1.1m × 2.0m',
      ja: 'コンサート群衆整理バリア 1.1m × 2.0m',
      ko: '콘서트 인파 통제 울타리 1.1m × 2.0m',
    },
    shortDescriptions: {
      en: 'Galvanized steel crowd control barrier for concerts and events. Interlocking design, flat feet for stability. 1.1m height, 2.0m length.',
      zh: '镀锌钢演唱会护栏，用于音乐会和活动。互锁设计，平底脚稳定。高1.1m，长2.0m。',
    },
    fullDescriptions: {
      en: `Our concert crowd control barriers are designed for safe and efficient crowd management at large events. The interlocking system allows quick setup and flexible configurations.

**Specifications:**
- Panel Size: 1.1m × 2.0m
- Frame: 25mm × 25mm × 1.5mm square tube
- Infill: 20mm × 20mm × 1.2mm vertical bars
- Feet: Flat steel feet (removable)
- Surface: Hot-dipped galvanized
- Connection: Hook and eyelet interlock
- Weight: Approx. 18kg per panel

**Applications:**
- Concerts and music festivals
- Sports events
- Public gatherings
- Queue management`,
    },
    specifications: {
      panelSize: '1.1m × 2.0m',
      frame: '25×25×1.5mm square tube',
      infill: '20×20×1.2mm vertical bars',
      surfaceTreatment: 'Hot-Dipped Galvanized',
      material: 'Low Carbon Steel',
      weight: 'Approx. 18kg per panel',
      connection: 'Hook and eyelet interlock',
    },
    applications: ['Concerts', 'Sports events', 'Public gatherings', 'Queue management'],
    images: ['/images/products/crowd-barrier.jpg'],
    moq: 50,
    priceUsd: 35,
    priceRemark: 'FOB Tianjin, per panel',
    isFeatured: false,
    createdAt: '2025-01-11',
  },

  // ═══ 三、刺绳 ═══
  // 3.1 刀片刺绳
  {
    id: 'prod-bw-001',
    sku: 'BW-RAZOR-BTO22',
    slug: 'razor-barbed-wire-bto22',
    categorySlug: 'barbed-wire',
    names: {
      en: 'Razor Barbed Wire BTO-22 Concertina',
      zh: '刀片刺绳 BTO-22 螺旋型',
      ja: 'カミソリ有刺鉄線 BTO-22 コンサータイナ',
      ko: '면도칼 가시철선 BTO-22 콘서티나',
    },
    shortDescriptions: {
      en: 'High-security razor barbed wire BTO-22 concertina coil. Hot-dipped galvanized, 450mm coil diameter. For perimeter security fencing.',
      zh: '高安全等级刀片刺绳 BTO-22 螺旋型。热镀锌，450mm卷径。用于周界安全围栏。',
    },
    fullDescriptions: {
      en: `Our razor barbed wire provides superior perimeter security with its sharp blade design. The concertina coil format creates an effective physical barrier that is difficult to breach.

**Specifications:**
- Blade Type: BTO-22 (BTO-10, BTO-15, CBT-60, CBT-65 available)
- Blade Thickness: 0.5mm
- Core Wire: 2.5mm high-tensile steel
- Coil Diameter: 450mm (300-980mm available)
- Loops per Coil: 33-55
- Surface: Hot-dipped galvanized (≥80g/m²)
- Stainless Steel: 304/430 option available

**Applications:**
- Military installations
- Prisons and detention centers
- Airport perimeters
- Industrial facilities`,
    },
    specifications: {
      bladeType: 'BTO-22',
      bladeThickness: '0.5mm',
      wireDiameter: '2.5mm core',
      coilDiameter: '450mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)',
      material: 'High-Tensile Steel',
      loopsPerCoil: '33-55',
    },
    applications: ['Military', 'Prisons', 'Airports', 'Industrial facilities'],
    images: ['/images/products/razor-wire.jpg'],
    moq: 50,
    priceUsd: 18,
    priceRemark: 'FOB Tianjin, per coil',
    isFeatured: false,
    createdAt: '2025-01-12',
  },
  // 3.2 钢丝刺绳
  {
    id: 'prod-bw-002',
    sku: 'BW-STEEL-12X14',
    slug: 'steel-barbed-wire-12x14',
    categorySlug: 'barbed-wire',
    names: {
      en: 'Steel Barbed Wire 12×14 Gauge Galvanized',
      zh: '钢丝刺绳 12×14号 镀锌',
      ja: '鋼線有刺鉄線 12×14ゲージ 亜鉛めっき',
      ko: '강선 가시철선 12×14 게이지 아연도금',
    },
    shortDescriptions: {
      en: 'Traditional twisted steel barbed wire, 12×14 gauge, hot-dipped galvanized. For agricultural fencing and property boundaries.',
      zh: '传统双绞钢丝刺绳，12×14号，热镀锌。用于农业围栏和地产边界。',
    },
    fullDescriptions: {
      en: `Our traditional steel barbed wire is a cost-effective solution for perimeter security and livestock containment. The twisted design with sharp barbs deters unauthorized entry.

**Specifications:**
- Wire Gauge: 12×14 (12.5×14.5, 14×16 available)
- Barb Spacing: 75mm / 100mm / 125mm
- Barb Length: 15-20mm
- Tensile Strength: ≥1150 N/mm²
- Surface: Hot-dipped galvanized (≥40g/m²)
- Roll Length: 100m / 250m / 500m
- Roll Weight: 10-25kg

**Applications:**
- Agricultural fencing
- Property boundaries
- Pasture enclosures
- Security perimeters`,
    },
    specifications: {
      wireGauge: '12×14',
      barbSpacing: '75mm / 100mm / 125mm',
      barbLength: '15-20mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥40g/m²)',
      material: 'High-Tensile Steel',
      tensileStrength: '≥1150 N/mm²',
      rollLength: '100m / 250m / 500m',
    },
    applications: ['Agricultural fencing', 'Property boundaries', 'Pastures', 'Security'],
    images: ['/images/products/barbed-wire.jpg'],
    moq: 50,
    priceUsd: 12,
    priceRemark: 'FOB Tianjin, per roll',
    isFeatured: false,
    createdAt: '2025-01-13',
  },

  // ═══ 四、边坡防护网 ═══
  // 4.1 主动边坡防护网
  {
    id: 'prod-sp-001',
    sku: 'SP-ACT-DNS50',
    slug: 'active-slope-protection-net-dns50',
    categorySlug: 'slope-protection',
    names: {
      en: 'Active Slope Protection Net DNS-50 (50kJ)',
      zh: '主动边坡防护网 DNS-50 (50kJ)',
      ja: '能動法面防護網 DNS-50 (50kJ)',
      ko: '능동 사면 보호망 DNS-50 (50kJ)',
    },
    shortDescriptions: {
      en: 'High-tensile active slope protection net with 50kJ energy absorption. Anchored to slope surface for rockfall and landslide prevention.',
      zh: '高强度主动边坡防护网，50kJ能量吸收。锚固于坡面，用于落石和滑坡预防。',
    },
    fullDescriptions: {
      en: `Our active slope protection systems are anchored directly to the slope surface to prevent rock detachment and stabilize loose material. The high-tensile steel wire mesh absorbs impact energy through deformation.

**Specifications:**
- Model: DNS-50 (50kJ energy absorption)
- Mesh Type: Diamond high-tensile steel wire mesh
- Wire Diameter: 3.0mm
- Mesh Size: 300×300mm
- Rope: 8mm high-tensile steel rope
- Anchor: Φ25mm rock bolts, 2-4m length
- Corrosion Protection: Hot-dipped galvanized + polymer coating
- Tensile Strength: 1770 N/mm²

**Certifications:**
- CE certified
- ETAG 027 tested
- ISO 9001:2015

**Applications:**
- Mountain highways
- Open-pit mines
- Railway cuttings
- Steep terrain`,
    },
    specifications: {
      model: 'DNS-50 (50kJ)',
      meshAperture: '300×300mm',
      wireDiameter: '3.0mm',
      surfaceTreatment: 'Galvanized + Polymer Coating',
      material: 'High-Tensile Steel (1770 N/mm²)',
      rope: '8mm high-tensile steel rope',
      anchor: 'Φ25mm rock bolts',
      tensileStrength: '1770 N/mm²',
    },
    applications: ['Mountain highways', 'Open-pit mines', 'Railway cuttings', 'Steep terrain'],
    images: ['/images/products/active-slope-net.jpg'],
    moq: 500,
    priceUsd: 85,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-14',
  },
  // 4.2 被动边坡防护网
  {
    id: 'prod-sp-002',
    sku: 'SP-PAS-GL100',
    slug: 'passive-slope-protection-barrier-gl100',
    categorySlug: 'slope-protection',
    names: {
      en: 'Passive Slope Protection Barrier GL-100 (100kJ)',
      zh: '被动边坡防护栏 GL-100 (100kJ)',
      ja: '受動法面防護柵 GL-100 (100kJ)',
      ko: '수동 사면 보호 울타리 GL-100 (100kJ)',
    },
    shortDescriptions: {
      en: 'Flexible passive rockfall barrier with 100kJ energy rating. Posts + steel rope + ring net. For highways and railways at slope foot.',
      zh: '柔性被动落石防护栏，100kJ能量等级。立柱+钢丝绳+环形网。用于坡脚公路和铁路。',
    },
    fullDescriptions: {
      en: `Our passive slope protection barriers are installed at the foot of slopes to intercept falling rocks. The energy-absorbing brake elements allow controlled deformation upon impact.

**Specifications:**
- Model: GL-100 (100kJ energy absorption)
- Height: 2.0m / 2.5m / 3.0m / 4.0m / 5.0m
- Net: High-tensile steel ring net (R7/3/300)
- Posts: HEA200 / HEB220 steel posts
- Braking Element: Telescopic friction brake
- Anchor: Ground anchors per design
- Surface: Hot-dipped galvanized
- Tensile Strength: 1770 N/mm²

**Certifications:**
- CE certified
- ETAG 027 tested
- FHWA approved

**Applications:**
- Highway catch fences
- Railway protection
- Industrial site boundaries
- Residential area protection`,
    },
    specifications: {
      model: 'GL-100 (100kJ)',
      height: '2.0m - 5.0m',
      net: 'High-tensile steel ring net (R7/3/300)',
      post: 'HEA200 / HEB220 steel posts',
      surfaceTreatment: 'Hot-Dipped Galvanized',
      material: 'High-Tensile Steel (1770 N/mm²)',
      brakingElement: 'Telescopic friction brake',
      tensileStrength: '1770 N/mm²',
    },
    applications: ['Highways', 'Railways', 'Industrial sites', 'Residential areas'],
    images: ['/images/products/passive-barrier.jpg'],
    moq: 200,
    priceUsd: 120,
    priceRemark: 'FOB Tianjin, per linear meter',
    isFeatured: false,
    createdAt: '2025-01-15',
  },

  // ═══ 五、防爆石笼网/防爆墙 ═══
  // 5.1 防爆石笼网
  {
    id: 'prod-bw-003',
    sku: 'BW-HESCO-1X1X1',
    slug: 'hesco-bastion-blast-wall-1x1x1m',
    categorySlug: 'blast-wall',
    names: {
      en: 'Hesco Bastion Blast Wall 1×1×1m Galvanized',
      zh: '防爆石笼网（Hesco堡垒墙）1×1×1m 镀锌',
      ja: 'ヘスコ要塞防爆壁 1×1×1m 亜鉛めっき',
      ko: '헤스코 요새 방폭벽 1×1×1m 아연도금',
    },
    shortDescriptions: {
      en: 'Military-grade Hesco bastion blast wall, 1×1×1m unit. Galvanized welded mesh lined with geotextile. Filled with sand/earth for blast protection.',
      zh: '军用级Hesco防爆石笼网，1×1×1m单元。镀锌焊网内衬土工布。填充沙土用于防爆防护。',
    },
    fullDescriptions: {
      en: `Hesco bastions are modern gabion-like structures used for military fortification and blast protection. The welded mesh cage lined with non-woven geotextile can be rapidly deployed and filled with local materials.

**Specifications:**
- Unit Size: 1.0m × 1.0m × 1.0m (custom sizes available)
- Mesh: 75mm × 75mm welded mesh
- Wire Diameter: 4.0mm / 5.0mm
- Geotextile: 300g/m² non-woven PP
- Surface: Hot-dipped galvanized (≥240g/m²)
- Connection: Spiral wire or C-rings
- Fill Material: Sand, earth, gravel
- Blast Resistance: ≥20 PSI overpressure

**Applications:**
- Military forward operating bases
- Perimeter security walls
- Blast mitigation barriers
- Flood control emergency walls`,
    },
    specifications: {
      unitSize: '1.0m × 1.0m × 1.0m',
      meshAperture: '75mm × 75mm',
      wireDiameter: '4.0mm / 5.0mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥240g/m²)',
      material: 'Low Carbon Steel Wire',
      geotextile: '300g/m² non-woven PP',
      blastResistance: '≥20 PSI overpressure',
    },
    applications: ['Military bases', 'Perimeter security', 'Blast mitigation', 'Flood control'],
    images: ['/images/products/hesco-bastion.jpg'],
    moq: 100,
    priceUsd: 45,
    priceRemark: 'FOB Tianjin, per unit',
    isFeatured: false,
    createdAt: '2025-01-16',
  },
  // 5.2 防爆墙
  {
    id: 'prod-bw-004',
    sku: 'BW-WALL-2X1X1',
    slug: 'blast-wall-panel-2x1x1m',
    categorySlug: 'blast-wall',
    names: {
      en: 'Blast Wall Panel 2×1×1m Reinforced',
      zh: '防爆墙板 2×1×1m 加强型',
      ja: '防爆壁パネル 2×1×1m 補強型',
      ko: '방폭벽 패널 2×1×1m 강화형',
    },
    shortDescriptions: {
      en: 'Reinforced blast wall panel, 2×1×1m. Double-layer welded mesh with internal bracing. For high-threat security zones and explosive storage.',
      zh: '加强型防爆墙板，2×1×1m。双层焊网加内部支撑。用于高威胁安全区和爆炸品储存。',
    },
    fullDescriptions: {
      en: `Our reinforced blast wall panels provide superior protection against explosive blasts and ballistic threats. The double-layer construction with internal bracing withstands extreme pressures.

**Specifications:**
- Panel Size: 2.0m × 1.0m × 1.0m
- Outer Mesh: 50mm × 50mm × 4.0mm welded mesh
- Inner Mesh: 25mm × 25mm × 3.0mm welded mesh
- Bracing: Internal steel angle supports
- Surface: Hot-dipped galvanized + anti-spall coating
- Connection: Bolted flange connections
- Blast Resistance: ≥50 PSI overpressure
- Ballistic: NIJ Level III equivalent

**Applications:**
- Explosive storage facilities
- Ammunition depots
- High-security government zones
- Embassy protection`,
    },
    specifications: {
      panelSize: '2.0m × 1.0m × 1.0m',
      outerMesh: '50×50×4.0mm welded mesh',
      innerMesh: '25×25×3.0mm welded mesh',
      surfaceTreatment: 'Galvanized + Anti-spall coating',
      material: 'Q345 High-Strength Steel',
      blastResistance: '≥50 PSI overpressure',
      ballistic: 'NIJ Level III equivalent',
    },
    applications: ['Explosive storage', 'Ammunition depots', 'Government zones', 'Embassy protection'],
    images: ['/images/products/blast-wall.jpg'],
    moq: 50,
    priceUsd: 180,
    priceRemark: 'FOB Tianjin, per panel',
    isFeatured: false,
    createdAt: '2025-01-17',
  },

  // ═══ 六、石笼网 ═══
  // 6.1 石笼网箱
  {
    id: 'prod-gb-001',
    sku: 'GB-2X1X1-G',
    slug: 'galvanized-gabion-box-2x1x1m',
    categorySlug: 'gabion',
    names: {
      en: 'Hot-Dipped Galvanized Gabion Box 2×1×1m',
      zh: '热镀锌石笼网箱 2×1×1m',
      ja: '溶融亜鉛めっき石籠ボックス 2×1×1m',
      ko: '핫디핑 갈바나이즈드 가비언 박스 2×1×1m',
    },
    shortDescriptions: {
      en: '2m × 1m × 1m hot-dipped galvanized gabion box, mesh 80×100mm, wire 2.5mm. For river protection and slope stabilization.',
      zh: '2m×1m×1m热镀锌石笼网箱，网孔80×100mm，丝径2.5mm。用于河道防护和边坡稳定。',
    },
    fullDescriptions: {
      en: `Our hot-dipped galvanized gabion boxes are manufactured from high-quality steel wire with superior corrosion resistance. The flexible structure adapts to ground movement without losing integrity.

**Specifications:**
- Dimensions: 2m × 1m × 1m (customizable)
- Wire Diameter: 2.5mm (2.0-4.0mm available)
- Mesh Aperture: 80×100mm (60×80mm, 100×120mm options)
- Surface: Hot-dipped galvanized (≥250g/m²)
- Material: Low Carbon Steel Wire
- Tensile Strength: 370-540 N/mm²
- Diaphragms: Internal diaphragms every 1m

**Applications:**
- Riverbank protection
- Slope stabilization
- Retaining walls
- Erosion control`,
    },
    specifications: {
      dimensions: '2m × 1m × 1m',
      wireDiameter: '2.5mm',
      meshAperture: '80×100mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥250g/m²)',
      material: 'Low Carbon Steel Wire',
      tensileStrength: '370-540 N/mm²',
    },
    applications: ['Riverbank protection', 'Slope stabilization', 'Retaining walls', 'Erosion control'],
    images: ['/images/products/gabion-box.jpg'],
    moq: 100,
    priceUsd: 45,
    priceRemark: 'FOB Tianjin, per unit',
    isFeatured: true,
    createdAt: '2025-01-18',
  },
  // 6.2 雷诺护垫
  {
    id: 'prod-gb-002',
    sku: 'GB-RM-6X2X0.3',
    slug: 'reno-mattress-6x2x0.3m',
    categorySlug: 'gabion',
    names: {
      en: 'Reno Mattress 6×2×0.3m Galvanized',
      zh: '雷诺护垫 6×2×0.3m 镀锌',
      ja: 'リノマトラス 6×2×0.3m 亜鉛めっき',
      ko: '리노 매트리스 6×2×0.3m 아연도금',
    },
    shortDescriptions: {
      en: 'Low-profile Reno mattress 6×2×0.3m for riverbed slope protection and channel lining. Flexible and permeable.',
      zh: '低矮型雷诺护垫 6×2×0.3m，用于河床边坡防护和渠道衬砌。柔性好，透水性强。',
    },
    fullDescriptions: {
      en: `Reno mattresses are low-profile gabion structures ideal for riverbed and channel lining. Their thin cross-section provides scour protection while allowing water flow.

**Specifications:**
- Dimensions: 6m × 2m × 0.3m
- Wire Diameter: 2.0mm / 2.4mm
- Mesh Aperture: 60×80mm
- Surface: Hot-dipped galvanized (≥220g/m²)
- Material: Low Carbon Steel Wire
- Diaphragms: Every 1m

**Applications:**
- Riverbed lining
- Channel slope protection
- Scour protection
- Drainage channels`,
    },
    specifications: {
      dimensions: '6m × 2m × 0.3m',
      wireDiameter: '2.0-2.4mm',
      meshAperture: '60×80mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥220g/m²)',
      material: 'Low Carbon Steel Wire',
    },
    applications: ['Riverbed lining', 'Channel protection', 'Scour protection', 'Drainage'],
    images: ['/images/products/reno-mattress.jpg'],
    moq: 50,
    priceUsd: 55,
    priceRemark: 'FOB Tianjin, per unit',
    isFeatured: false,
    createdAt: '2025-01-19',
  },
  // 6.3 PVC包塑石笼网
  {
    id: 'prod-gb-003',
    sku: 'GB-2X1X1-PVC',
    slug: 'pvc-coated-gabion-box-2x1x1m',
    categorySlug: 'gabion',
    names: {
      en: 'PVC Coated Gabion Box 2×1×1m',
      zh: 'PVC包塑石笼网箱 2×1×1m',
      ja: 'PVCコーティング石籠ボックス 2×1×1m',
      ko: 'PVC 코팅 가비언 박스 2×1×1m',
    },
    shortDescriptions: {
      en: 'PVC coated gabion box with superior corrosion resistance for marine environments and harsh chemical conditions. Green or black color.',
      zh: 'PVC包塑石笼网箱，耐腐蚀性优异。适用于海洋环境和恶劣化学条件。绿色或黑色。',
    },
    fullDescriptions: {
      en: `Our PVC coated gabion boxes offer exceptional durability in corrosive environments. The PVC coating provides an additional protective layer over the galvanized wire.

**Specifications:**
- Dimensions: 2m × 1m × 1m
- Core Wire: 2.5mm galvanized steel
- PVC Coating: 0.5mm thickness
- Mesh Aperture: 60×80mm / 80×100mm
- Colors: Green, Black
- Salt Spray Test: ≥2000 hours

**Applications:**
- Marine protection
- Chemical environments
- Landscaping
- Coastal engineering`,
    },
    specifications: {
      dimensions: '2m × 1m × 1m',
      wireDiameter: '2.5mm core + 0.5mm PVC',
      meshAperture: '60×80mm / 80×100mm',
      surfaceTreatment: 'PVC Coated (over galvanized)',
      material: 'Low Carbon Steel + PVC',
      colors: 'Green, Black',
    },
    applications: ['Marine protection', 'Chemical environments', 'Landscaping', 'Coastal engineering'],
    images: ['/images/products/gabion-pvc.jpg'],
    moq: 100,
    priceUsd: 65,
    priceRemark: 'FOB Tianjin, per unit',
    isFeatured: false,
    createdAt: '2025-01-20',
  },
  // 6.4 加筋石笼网
  {
    id: 'prod-gb-004',
    sku: 'GB-REINF-2X1X1',
    slug: 'reinforced-gabion-box-2x1x1m',
    categorySlug: 'gabion',
    names: {
      en: 'Reinforced Gabion Box 2×1×1m with Geogrid',
      zh: '加筋石笼网箱 2×1×1m 带土工格栅',
      ja: '補強石籠ボックス 2×1×1m ジオグリッド付き',
      ko: '보강 가비언 박스 2×1×1m 지오그리드 포함',
    },
    shortDescriptions: {
      en: 'Reinforced gabion box with internal geogrid reinforcement. For high-load retaining walls and steep slope applications.',
      zh: '加筋石笼网箱，内置土工格栅加强。用于高荷载挡土墙和陡坡工程。',
    },
    fullDescriptions: {
      en: `Our reinforced gabion boxes incorporate internal geogrid reinforcement to increase load-bearing capacity. Ideal for high retaining walls and challenging slope conditions.

**Specifications:**
- Dimensions: 2m × 1m × 1m
- Wire Diameter: 2.7mm
- Mesh Aperture: 80×100mm
- Geogrid: PP biaxial geogrid, 30kN/m
- Surface: Hot-dipped galvanized (≥260g/m²)
- Connection: Lacing wire or C-rings

**Applications:**
- High retaining walls
- Steep slope stabilization
- Bridge abutments
- Heavy load structures`,
    },
    specifications: {
      dimensions: '2m × 1m × 1m',
      wireDiameter: '2.7mm',
      meshAperture: '80×100mm',
      surfaceTreatment: 'Hot-Dipped Galvanized (≥260g/m²)',
      material: 'Low Carbon Steel Wire',
      geogrid: 'PP biaxial, 30kN/m',
    },
    applications: ['High retaining walls', 'Steep slopes', 'Bridge abutments', 'Heavy loads'],
    images: ['/images/products/gabion-reinforced.jpg'],
    moq: 100,
    priceUsd: 58,
    priceRemark: 'FOB Tianjin, per unit',
    isFeatured: false,
    createdAt: '2025-01-21',
  },

  // ═══ 七、不锈钢绳网 ═══
  // 7.1 不锈钢绳网
  {
    id: 'prod-ss-001',
    sku: 'SS-ROPE-2.0-60',
    slug: 'stainless-steel-rope-net-2mm-60mm',
    categorySlug: 'stainless-rope-net',
    names: {
      en: 'Stainless Steel Wire Rope Net 2.0mm × 60mm Mesh',
      zh: '不锈钢绳网 2.0mm × 60mm网孔',
      ja: 'ステンレス鋼ロープネット 2.0mm × 60mmメッシュ',
      ko: '스테인리스 스틸 로프망 2.0mm × 60mm 메쉬',
    },
    shortDescriptions: {
      en: 'High-grade 304/316 stainless steel wire rope net, 2.0mm wire, 60mm mesh. For architectural, zoo, and safety applications.',
      zh: '高等级304/316不锈钢丝绳网，2.0mm绳径，60mm网孔。用于建筑、动物园和安全防护。',
    },
    fullDescriptions: {
      en: `Our stainless steel rope nets are hand-woven from high-grade 304 or 316 stainless steel wire ropes. The flexible mesh structure provides both safety and aesthetic appeal.

**Specifications:**
- Wire Rope Diameter: 2.0mm (1.5-4.0mm available)
- Mesh Size: 60mm × 60mm (20-200mm available)
- Material: 304 / 316 Stainless Steel
- Structure: Hand-woven ferrule or knot type
- Breaking Strength: ≥2.0kN per rope
- Corrosion Resistance: Excellent in marine environments
- Lifespan: 30+ years

**Applications:**
- Zoo enclosures (aviaries, monkey cages)
- Architectural fall protection
- Staircase and balcony safety
- Green wall support systems`,
    },
    specifications: {
      wireDiameter: '2.0mm',
      meshAperture: '60mm × 60mm',
      surfaceTreatment: '304/316 Stainless Steel',
      material: 'Stainless Steel Wire Rope',
      structure: 'Hand-woven ferrule or knot',
      breakingStrength: '≥2.0kN per rope',
      lifespan: '30+ years',
    },
    applications: ['Zoo enclosures', 'Architectural safety', 'Staircase protection', 'Green walls'],
    images: ['/images/products/stainless-rope-net.jpg'],
    moq: 10,
    priceUsd: 120,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-22',
  },
  // 7.2 不锈钢绳网（动物园专用）
  {
    id: 'prod-ss-002',
    sku: 'SS-ZOO-3.0-100',
    slug: 'zoo-stainless-rope-net-3mm-100mm',
    categorySlug: 'stainless-rope-net',
    names: {
      en: 'Zoo Stainless Steel Rope Net 3.0mm × 100mm',
      zh: '动物园专用不锈钢绳网 3.0mm × 100mm',
      ja: '動物園用ステンレスロープネット 3.0mm × 100mm',
      ko: '동물원용 스테인리스 로프망 3.0mm × 100mm',
    },
    shortDescriptions: {
      en: 'Heavy-duty zoo enclosure rope net, 3.0mm wire, 100mm mesh. 316 stainless steel for large animal enclosures and aviaries.',
      zh: '重型动物园围网，3.0mm绳径，100mm网孔。316不锈钢，用于大型动物笼舍和鸟园。',
    },
    fullDescriptions: {
      en: `Our zoo-grade stainless steel rope nets are designed for large animal enclosures and aviaries. The heavy-gauge wire and large mesh provide strength while maintaining visibility.

**Specifications:**
- Wire Rope Diameter: 3.0mm
- Mesh Size: 100mm × 100mm
- Material: 316 Stainless Steel
- Structure: Hand-woven knot type
- Breaking Strength: ≥4.5kN per rope
- UV Resistance: Excellent
- Lifespan: 30+ years

**Applications:**
- Large mammal enclosures (tigers, lions, bears)
- Aviaries and bird parks
- Primate enclosures
- Aquarium shark tanks`,
    },
    specifications: {
      wireDiameter: '3.0mm',
      meshAperture: '100mm × 100mm',
      surfaceTreatment: '316 Stainless Steel',
      material: 'Stainless Steel Wire Rope',
      structure: 'Hand-woven knot type',
      breakingStrength: '≥4.5kN per rope',
      lifespan: '30+ years',
    },
    applications: ['Large mammals', 'Aviaries', 'Primates', 'Aquariums'],
    images: ['/images/products/zoo-rope-net.jpg'],
    moq: 10,
    priceUsd: 180,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-23',
  },

  // ═══ 八、防爆护栏/演唱会护栏 ═══
  // 8.1 防爆护栏（已在护栏网类中，此处补充更多规格）
  {
    id: 'prod-cb-001',
    sku: 'CB-BLAST-2.5',
    slug: 'heavy-duty-blast-barrier-2.5m',
    categorySlug: 'crowd-barrier',
    names: {
      en: 'Heavy-Duty Blast Barrier 2.5m Height',
      zh: '重型防爆护栏 2.5m高',
      ja: '重型防爆バリア 2.5m高',
      ko: '중형 방폭 울타리 2.5m 높이',
    },
    shortDescriptions: {
      en: 'Heavy-duty blast barrier with reinforced steel frame and anti-ram design. For high-threat security zones and vehicle impact protection.',
      zh: '重型防爆护栏，加强钢框架，防撞击设计。用于高威胁安全区和车辆碰撞防护。',
    },
    fullDescriptions: {
      en: `Our heavy-duty blast barriers are engineered to stop vehicle-borne threats and withstand explosive blasts. The anti-ram design features reinforced posts and deep foundations.

**Specifications:**
- Height: 2.5m / 3.0m
- Frame: 100mm × 50mm × 4.0mm rectangular tube
- Mesh: 50mm × 50mm × 4.0mm welded mesh
- Post Spacing: 2.0m
- Foundation: Concrete footing 1.0m deep
- Surface: Hot-dipped galvanized + powder coating
- Anti-Ram: K12 rating (15,000 lbs at 50 mph)
- Blast: ≥100 PSI overpressure

**Applications:**
- Embassy perimeters
- Government buildings
- Military checkpoints
- Critical infrastructure`,
    },
    specifications: {
      height: '2.5m / 3.0m',
      frame: '100×50×4.0mm rectangular tube',
      meshAperture: '50mm × 50mm',
      wireDiameter: '4.0mm',
      surfaceTreatment: 'Galvanized + Powder Coating',
      material: 'Q345 High-Strength Steel',
      antiRam: 'K12 rating',
      blastResistance: '≥100 PSI',
    },
    applications: ['Embassies', 'Government buildings', 'Military checkpoints', 'Infrastructure'],
    images: ['/images/products/blast-barrier.jpg'],
    moq: 20,
    priceUsd: 280,
    priceRemark: 'FOB Tianjin, per meter',
    isFeatured: false,
    createdAt: '2025-01-24',
  },
  // 8.2 演唱会护栏（已在护栏网类中）
  {
    id: 'prod-cb-002',
    sku: 'CB-STAGE-1.2',
    slug: 'stage-barrier-1.2m-aluminum',
    categorySlug: 'crowd-barrier',
    names: {
      en: 'Stage Barrier 1.2m Aluminum Alloy',
      zh: '舞台护栏 1.2m 铝合金',
      ja: 'ステージバリア 1.2m アルミ合金',
      ko: '무대 울타리 1.2m 알루미늄 합금',
    },
    shortDescriptions: {
      en: 'Lightweight aluminum alloy stage barrier, 1.2m height. For concerts, festivals, and event crowd control. Easy to transport and install.',
      zh: '轻量化铝合金舞台护栏，1.2m高。用于音乐会、节庆和活动人群控制。易运输安装。',
    },
    fullDescriptions: {
      en: `Our aluminum stage barriers offer a lightweight yet sturdy solution for event crowd management. The corrosion-resistant aluminum construction is ideal for both indoor and outdoor events.

**Specifications:**
- Panel Size: 1.2m × 1.0m
- Frame: 38mm × 25mm × 2.0mm aluminum tube
- Infill: 25mm × 25mm × 1.5mm aluminum bars
- Feet: Removable flat feet with rubber pads
- Surface: Anodized aluminum finish
- Weight: Approx. 12kg per panel
- Connection: Hook and loop interlock

**Applications:**
- Concert front-of-stage
- Festival crowd control
- Exhibition queue management
- VIP area separation`,
    },
    specifications: {
      panelSize: '1.2m × 1.0m',
      frame: '38×25×2.0mm aluminum tube',
      infill: '25×25×1.5mm aluminum bars',
      surfaceTreatment: 'Anodized Aluminum',
      material: '6063-T5 Aluminum Alloy',
      weight: 'Approx. 12kg per panel',
      connection: 'Hook and loop interlock',
    },
    applications: ['Concerts', 'Festivals', 'Exhibitions', 'VIP areas'],
    images: ['/images/products/stage-barrier.jpg'],
    moq: 50,
    priceUsd: 65,
    priceRemark: 'FOB Tianjin, per panel',
    isFeatured: false,
    createdAt: '2025-01-25',
  },

  // ═══ 九、声屏障 ═══
  // 9.1 公路声屏障
  {
    id: 'prod-nb-001',
    sku: 'NB-HIGHWAY-3.0',
    slug: 'highway-noise-barrier-3m',
    categorySlug: 'noise-barrier',
    names: {
      en: 'Highway Noise Barrier 3.0m Height',
      zh: '公路声屏障 3.0m高',
      ja: '高速道路防音壁 3.0m高',
      ko: '고속도로 소음 방지벽 3.0m 높이',
    },
    shortDescriptions: {
      en: 'Highway noise barrier panel, 3.0m height, composite sound-absorbing design. Noise reduction 15-25dB. For road and railway noise control.',
      zh: '公路声屏障板，3.0m高，复合吸声设计。降噪15-25dB。用于道路和铁路噪声控制。',
    },
    fullDescriptions: {
      en: `Our highway noise barriers combine sound-absorbing and sound-insulating materials to effectively reduce traffic noise. The modular design allows easy installation and maintenance.

**Specifications:**
- Panel Height: 3.0m (2.0-5.0m available)
- Panel Width: 0.5m / 1.0m / 2.0m
- Structure: Galvanized steel frame
- Sound-Absorbing: Rock wool or glass wool, 80kg/m³
- Face Plate: 1.0mm galvanized perforated steel
- Back Plate: 1.2mm galvanized steel
- Noise Reduction: 15-25dB (ASTM E413)
- Wind Load: Designed per local standards
- Lifespan: 15-20 years

**Applications:**
- Highway noise reduction
- Railway noise control
- Urban road soundproofing
- Industrial noise barriers`,
    },
    specifications: {
      panelHeight: '3.0m',
      panelWidth: '0.5m / 1.0m / 2.0m',
      structure: 'Galvanized steel frame',
      soundAbsorbing: 'Rock wool 80kg/m³',
      facePlate: '1.0mm galvanized perforated steel',
      noiseReduction: '15-25dB (ASTM E413)',
      lifespan: '15-20 years',
    },
    applications: ['Highways', 'Railways', 'Urban roads', 'Industrial noise'],
    images: ['/images/products/highway-noise-barrier.jpg'],
    moq: 100,
    priceUsd: 85,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-26',
  },
  // 9.2 设备声屏障
  {
    id: 'prod-nb-002',
    sku: 'NB-EQUIP-2.5',
    slug: 'equipment-noise-barrier-2.5m',
    categorySlug: 'noise-barrier',
    names: {
      en: 'Equipment Noise Barrier 2.5m Height',
      zh: '设备声屏障 2.5m高',
      ja: '設備防音壁 2.5m高',
      ko: '장비 소음 방지벽 2.5m 높이',
    },
    shortDescriptions: {
      en: 'Equipment noise barrier for industrial machinery, generators, and compressors. Modular design, easy to install around equipment.',
      zh: '设备声屏障，用于工业机械、发电机和压缩机。模块化设计，易于围绕设备安装。',
    },
    fullDescriptions: {
      en: `Our equipment noise barriers are designed for targeted noise control around specific machinery. The compact modular panels can be configured to fit any equipment layout.

**Specifications:**
- Panel Height: 2.5m (1.5-4.0m available)
- Panel Width: 0.5m / 1.0m
- Frame: 50mm × 50mm × 2.0mm galvanized steel
- Sound-Absorbing: 50mm thick acoustic foam + rock wool
- Face: 0.8mm perforated aluminum
- Noise Reduction: 20-30dB
- Fire Rating: Class A (non-combustible)
- Weather Resistance: IP55

**Applications:**
- Generator enclosures
- Compressor noise control
- HVAC equipment
- Factory machinery`,
    },
    specifications: {
      panelHeight: '2.5m',
      panelWidth: '0.5m / 1.0m',
      frame: '50×50×2.0mm galvanized steel',
      soundAbsorbing: '50mm acoustic foam + rock wool',
      face: '0.8mm perforated aluminum',
      noiseReduction: '20-30dB',
      fireRating: 'Class A',
    },
    applications: ['Generators', 'Compressors', 'HVAC', 'Factory machinery'],
    images: ['/images/products/equipment-noise-barrier.jpg'],
    moq: 50,
    priceUsd: 120,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-27',
  },
  // 9.3 工厂声屏障
  {
    id: 'prod-nb-003',
    sku: 'NB-FACTORY-4.0',
    slug: 'factory-noise-barrier-4m',
    categorySlug: 'noise-barrier',
    names: {
      en: 'Factory Noise Barrier Wall 4.0m Height',
      zh: '工厂声屏障墙 4.0m高',
      ja: '工場防音壁 4.0m高',
      ko: '공장 소음 방지벽 4.0m 높이',
    },
    shortDescriptions: {
      en: 'High factory noise barrier wall, 4.0m height. Heavy-duty construction for industrial plant perimeter noise control.',
      zh: '高工厂声屏障墙，4.0m高。重型结构，用于工业厂区周界噪声控制。',
    },
    fullDescriptions: {
      en: `Our factory noise barrier walls are designed for maximum noise reduction around industrial facilities. The heavy-duty construction withstands harsh industrial environments.

**Specifications:**
- Wall Height: 4.0m (3.0-6.0m available)
- Panel Width: 1.0m / 2.0m
- Structure: H-beam steel posts + barrier panels
- Post: H200 × 200 × 8 × 12mm
- Sound-Absorbing: 100mm rock wool, 100kg/m³
- Face: 1.2mm galvanized perforated steel
- Noise Reduction: 25-35dB
- Wind Load: 0.75 kN/m²
- Foundation: Concrete pile foundation

**Applications:**
- Factory perimeter walls
- Power plant noise control
- Steel mill soundproofing
- Cement plant noise barriers`,
    },
    specifications: {
      wallHeight: '4.0m',
      panelWidth: '1.0m / 2.0m',
      post: 'H200×200×8×12mm H-beam',
      soundAbsorbing: '100mm rock wool 100kg/m³',
      face: '1.2mm galvanized perforated steel',
      noiseReduction: '25-35dB',
      windLoad: '0.75 kN/m²',
    },
    applications: ['Factory perimeters', 'Power plants', 'Steel mills', 'Cement plants'],
    images: ['/images/products/factory-noise-barrier.jpg'],
    moq: 100,
    priceUsd: 150,
    priceRemark: 'FOB Tianjin, per m²',
    isFeatured: false,
    createdAt: '2025-01-28',
  },
];
