module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 256,
    height: 256
};
}),
"[project]/src/lib/data/index.ts [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
;
;
}),
"[project]/src/lib/data/products.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categories",
    ()=>categories,
    "products",
    ()=>products
]);
const categories = [
    {
        id: 'cat-1',
        slug: 'gabion-mesh',
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
            th: 'ตะแกรงกล่องหิน'
        },
        descriptions: {
            en: 'High-quality gabion mesh products for erosion control and retaining walls.',
            zh: '用于侵蚀控制和挡土墙的高品质石笼网产品。',
            ja: '浸食制御と擁壁用の高品質な石籠金網製品。',
            ko: '침식 방지 및 옹벽용 고품질 가비언 메시 제품.'
        },
        image: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=galvanized%20gabion%20box%20wire%20mesh%20cage%20industrial%20product%20photo%20white%20background&image_size=square_hd',
        productCount: 8
    },
    {
        id: 'cat-2',
        slug: 'protection-net',
        names: {
            en: 'Protection Net',
            zh: '防护网',
            ar: 'شبكة الحماية',
            ja: '防護網',
            ko: '방호망',
            id: 'Jaring Perlindungan',
            vi: 'Lưới Bảo Vệ',
            es: 'Malla de Protección',
            fr: 'Maille de Protection',
            de: 'Schutznetz',
            pt: 'Malha de Proteção',
            th: 'ตะแกรงป้องกัน'
        },
        descriptions: {
            en: 'Active and passive rockfall protection systems for mines and slopes.',
            zh: '用于矿山和边坡的主动和被动落石防护系统。',
            ja: '鉱山や斜面のための能動・受動落石防護システム。',
            ko: '광산 및 사면용 능동/수동 낙石 방지 시스템.'
        },
        image: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=rockfall%20protection%20net%20steel%20wire%20mesh%20barrier%20industrial%20product%20photo&image_size=square_hd',
        productCount: 6
    },
    {
        id: 'cat-3',
        slug: 'hexagonal-mesh',
        names: {
            en: 'Hexagonal Wire Mesh',
            zh: '六角网',
            ar: 'شبكة سلكية سداسية',
            ja: '六角金網',
            ko: '육각 철망',
            id: 'Kawat Harmonika',
            vi: 'Lưới Lục Giác',
            es: 'Malla Hexagonal',
            fr: 'Grillage Hexagonal',
            de: 'Sechseckdrahtgeflecht',
            pt: 'Malha Hexagonal',
            th: 'ลวดตาข่ายหกเหลี่ยม'
        },
        descriptions: {
            en: 'Standard hexagonal wire mesh for fencing, decoration and protection.',
            zh: '用于围栏、装饰和防护的标准六角网。'
        },
        image: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=hexagonal%20wire%20mesh%20chicken%20wire%20fencing%20industrial%20product%20photo%20white%20background&image_size=square_hd',
        productCount: 4
    },
    {
        id: 'cat-4',
        slug: 'chain-link-fence',
        names: {
            en: 'Chain Link Fence',
            zh: '勾花网围栏',
            ar: 'سياج链接链网',
            ja: 'リンクチェーンフェンス',
            ko: '체인 링크 펜스',
            id: 'Pagar Rantai',
            vi: 'Hàng Rào Chain Link',
            es: 'Cerco de Cadena',
            fr: 'Clôture à Chaîne',
            de: 'Kettenzaun',
            pt: 'Cerca de Cadeia',
            th: 'รั้วโซ่'
        },
        descriptions: {
            en: 'Heavy duty chain link fence mesh for security and boundary applications.',
            zh: '用于安全和边界应用的重型勾花网围栏。'
        },
        image: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=chain%20link%20fence%20wire%20mesh%20roll%20industrial%20product%20photo%20white%20background&image_size=square_hd',
        productCount: 3
    }
];
const products = [
    // ─── Gabion Products ───
    {
        id: 'prod-1',
        sku: 'GB-2X1X1M-G',
        slug: 'galvanized-gabion-box-2x1x1m',
        categorySlug: 'gabion-mesh',
        names: {
            en: 'Hot-Dipped Galvanized Gabion Box 2×1×1m',
            zh: '热镀锌石笼网箱 2×1×1m',
            ar: 'صندوق جابيون مجلفن بالغمس الساخن 2×1×1 متر',
            ja: '溶融亜鉛めっき石籠ボックス 2×1×1m',
            ko: '핫디핑 갈바나이즈드 가비언 박스 2×1×1m',
            id: 'Kotak Gabion Galvanis Celup Panas 2×1×1m',
            vi: 'Hộp Gabion Mạ Kẽm Nhúng Nóng 2×1×1m'
        },
        shortDescriptions: {
            en: '2m × 1m × 1m hot-dipped galvanized gabion box, mesh 80×100mm, wire 2.5mm. Ideal for river protection and slope stabilization.',
            zh: '2m×1m×1m热镀锌石笼网箱，网孔80×100mm，丝径2.5mm。适用于河道防护和边坡稳定。',
            ja: '2m×1m×1mの溶融亜鉛めっき石籠ボックス、メッシュ80×100mm、ワイヤー2.5mm。河川保護と法面安定に最適。'
        },
        fullDescriptions: {
            en: `Our hot-dipped galvanized gabion boxes are manufactured from high-quality steel wire that undergoes a rigorous hot-dip galvanization process, ensuring superior corrosion resistance and long service life even in the most demanding environments.

**Product Features:**
- Dimensions: 2m × 1m × 1m (customizable sizes available)
- Wire Diameter: 2.5mm (2.0mm-4.0mm available)
- Mesh Aperture: 80×100mm (60×80mm, 100×120mm options)
- Surface Treatment: Hot-dipped galvanization (zinc coating ≥ 250g/m²)
- Material: Low Carbon Steel Wire
- Tensile Strength: ≥370-540 N/mm²

**Applications:**
- Riverbank and canal protection
- Slope and retaining wall construction
- Erosion control systems
- Coastal protection
- Landscaping and architectural features`
        },
        specifications: {
            dimensions: '2m × 1m × 1m (customizable)',
            wireDiameter: '2.5mm',
            meshAperture: '80×100mm',
            surfaceTreatment: 'Hot-Dipped Galvanized (≥250g/m² zinc)',
            material: 'Low Carbon Steel Wire',
            tensileStrength: '370-540 N/mm²',
            weight: 'Approx. 25 kg/unit'
        },
        applications: [
            'River protection',
            'Slope stabilization',
            'Erosion control',
            'Coastal protection'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=hot%20dipped%20galvanized%20gabion%20box%202x1x1m%20industrial%20product%20photo%20white%20background&image_size=landscape_16_9',
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=galvanized%20gabion%20wire%20mesh%20cage%20construction%20material&image_size=landscape_16_9',
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=stone%20filled%20gabion%20box%20retaining%20wall%20application&image_size=landscape_16_9'
        ],
        moq: 100,
        priceUsd: 45,
        priceUnit: '套',
        priceRemark: 'FOB Tianjin',
        isFeatured: true,
        createdAt: '2025-01-01'
    },
    {
        id: 'prod-2',
        sku: 'GB-3X1X1M-G',
        slug: 'galvanized-gabion-box-3x1x1m',
        categorySlug: 'gabion-mesh',
        names: {
            en: 'Hot-Dipped Galvanized Gabion Box 3×1×1m',
            zh: '热镀锌石笼网箱 3×1×1m',
            ja: '溶融亜鉛めっき石籠ボックス 3×1×1m'
        },
        shortDescriptions: {
            en: '3m × 1m × 1m hot-dipped galvanized gabion box for large-scale erosion control and retaining wall projects.',
            zh: '3m×1m×1m热镀锌石笼网箱，适用于大规模侵蚀控制和挡土墙工程。'
        },
        fullDescriptions: {
            en: `Our 3×1×1m hot-dipped galvanized gabion boxes are widely used in large-scale hydraulic engineering projects. The larger dimension provides greater stability for high retaining walls and major riverbank protection works.

**Product Features:**
- Dimensions: 3m × 1m × 1m
- Wire Diameter: 2.7mm (2.5-4.0mm available)
- Mesh Aperture: 80×100mm
- Surface Treatment: Hot-dipped galvanization (zinc coating ≥ 260g/m²)
- Material: Low Carbon Steel Wire

**Applications:**
- Large-scale retaining walls
- Major riverbank protection
- Breakwater construction
- Bridge abutment protection`
        },
        specifications: {
            dimensions: '3m × 1m × 1m',
            wireDiameter: '2.7mm',
            meshAperture: '80×100mm',
            surfaceTreatment: 'Hot-Dipped Galvanized (≥260g/m² zinc)',
            material: 'Low Carbon Steel Wire',
            tensileStrength: '380-540 N/mm²'
        },
        applications: [
            'Retaining walls',
            'Breakwater',
            'Bridge protection',
            'Large-scale erosion control'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=large%20hot%20dipped%20galvanized%20gabion%20box%203x1x1m%20industrial%20product&image_size=landscape_16_9',
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=galvanized%20gabion%20wire%20mesh%20cage%20industrial&image_size=landscape_16_9'
        ],
        moq: 100,
        priceUsd: 58,
        priceUnit: '套',
        priceRemark: 'FOB Tianjin',
        isFeatured: true,
        createdAt: '2025-01-01'
    },
    {
        id: 'prod-3',
        sku: 'GB-2X1X1M-PVC',
        slug: 'pvc-coated-gabion-box',
        categorySlug: 'gabion-mesh',
        names: {
            en: 'PVC Coated Gabion Box 2×1×1m',
            zh: 'PVC包塑石笼网箱 2×1×1m',
            ar: 'صندوق جابيون مطلي بـ PVC 2×1×1 متر',
            ja: 'PVC coating石籠ボックス 2×1×1m'
        },
        shortDescriptions: {
            en: 'PVC coated gabion box with superior corrosion resistance for marine environments and harsh chemical conditions.',
            zh: 'PVC包塑石笼网箱，具有卓越的耐腐蚀性，适用于海洋环境和恶劣化学条件。'
        },
        fullDescriptions: {
            en: `Our PVC coated gabion boxes offer exceptional durability in corrosive environments. The PVC coating provides an additional protective layer over the hot-dipped galvanized wire, making these boxes ideal for marine applications, acidic soils, and areas with high chemical exposure.

**Product Features:**
- Dimensions: 2m × 1m × 1m (customizable)
- Core Wire: 2.5mm galvanized steel
- PVC Coating: 0.5mm thickness, green/black color
- Mesh Aperture: 60×80mm or 80×100mm
- Coating Color: Green (#2D5A27) or Black
- Salt Spray Test: ≥2000 hours

**Applications:**
- Marine and coastal protection
- Acidic soil environments
- Chemical plant perimeter
- Landscaping with aesthetic requirements`
        },
        specifications: {
            dimensions: '2m × 1m × 1m',
            wireDiameter: '2.5mm core + 0.5mm PVC',
            meshAperture: '60×80mm / 80×100mm',
            surfaceTreatment: 'PVC Coated (over hot-dipped galvanized)',
            material: 'Low Carbon Steel + PVC',
            coating: 'Green or Black PVC, 0.5mm thickness'
        },
        applications: [
            'Marine protection',
            'Chemical environments',
            'Landscaping',
            'Coastal engineering'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=green%20PVC%20coated%20gabion%20box%202x1x1m%20industrial%20product%20white%20background&image_size=landscape_16_9',
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=PVC%20coated%20wire%20mesh%20gabion%20cage&image_size=landscape_16_9'
        ],
        moq: 100,
        priceUsd: 65,
        priceUnit: '套',
        priceRemark: 'FOB Tianjin',
        isFeatured: true,
        createdAt: '2025-01-02'
    },
    {
        id: 'prod-4',
        sku: 'RM-6X2X0.3-G',
        slug: 'reno-mattress-6x2x0.3m',
        categorySlug: 'gabion-mesh',
        names: {
            en: 'Reno Mattress 6×2×0.3m Galvanized',
            zh: '雷诺护垫 6×2×0.3m 镀锌',
            ar: 'مرتبة رينو 6×2×0.3 متر مجلفنة',
            ja: 'リノマトラス 6×2×0.3m 亜鉛めっき'
        },
        shortDescriptions: {
            en: 'Low-profile Reno mattress (gabion mattress) 6×2×0.3m for riverbed slope protection and channel lining.',
            zh: '低矮型雷诺护垫（石笼护垫）6×2×0.3m，用于河床边坡防护和渠道衬砌。'
        },
        fullDescriptions: {
            en: `Reno mattresses are low-profile gabion structures used primarily for riverbed and channel lining, slope protection, and erosion control. Their relatively thin cross-section makes them ideal for applications where space is limited but flexibility is required.

**Product Features:**
- Dimensions: 6m × 2m × 0.3m
- Wire Diameter: 2.0mm / 2.4mm options
- Mesh Aperture: 60×80mm
- Surface Treatment: Hot-dipped galvanized (≥220g/m²)
- Diaphragms: Internal diaphragms every 1m for structural integrity

**Applications:**
- Riverbed lining
- Channel slope protection
- Scour protection around bridge piers
- Bottom protection of drainage channels`
        },
        specifications: {
            dimensions: '6m × 2m × 0.3m',
            wireDiameter: '2.0-2.4mm',
            meshAperture: '60×80mm',
            surfaceTreatment: 'Hot-Dipped Galvanized (≥220g/m²)',
            material: 'Low Carbon Steel Wire'
        },
        applications: [
            'Riverbed lining',
            'Channel protection',
            'Scour protection',
            'Drainage'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=reno%20mattress%20gabion%20mat%206x2x0.3m%20industrial%20product&image_size=landscape_16_9'
        ],
        moq: 50,
        priceUsd: 55,
        priceUnit: '套',
        priceRemark: 'FOB Tianjin',
        isFeatured: false,
        createdAt: '2025-01-03'
    },
    // ─── Protection Net Products ───
    {
        id: 'prod-5',
        sku: 'APS-ROFN-50',
        slug: 'active-rockfall-protection-net',
        categorySlug: 'protection-net',
        names: {
            en: 'Active Rockfall Protection Net System (DNS50)',
            zh: '主动落石防护网系统 (DNS50)',
            ar: 'نظام الحماية النشط من تساقط الصخور (DNS50)',
            ja: '能動落石防護網システム (DNS50)'
        },
        shortDescriptions: {
            en: 'High-tensile active rockfall protection net with 50kJ energy absorption capacity. CE certified, widely used in mines and mountain slopes.',
            zh: '高强度主动落石防护网，具有50kJ能量吸收能力。CE认证，广泛用于矿山和山体边坡。'
        },
        fullDescriptions: {
            en: `Our DNS series active rockfall protection net systems are designed to intercept and retain falling rocks on slopes. These systems are anchored to the slope surface and absorb impact energy through rope dissipation and mesh deformation.

**Product Features:**
- Model: DNS50 (50kJ energy absorption)
- Mesh Type: Diamond high-tensile steel wire mesh
- Wire Diameter: 3.0mm
- Mesh Size: 300×300mm
- Rope: 8mm high-tensile steel rope
- Anchor: Φ25mm rock bolts
- Corrosion Protection: Hot-dipped galvanized + polymer coating

**Certifications:**
- CE certified
- Tested per ETAG 027
- ISO 9001:2015 quality system

**Applications:**
- Mountain highway slopes
- Open-pit mines
- Railway cuttings
- Steep terrain protection`
        },
        specifications: {
            dimensions: 'Custom (project-based)',
            wireDiameter: '3.0mm',
            meshAperture: '300×300mm',
            surfaceTreatment: 'Galvanized + Polymer Coating',
            material: 'High-Tensile Steel Wire (1770 N/mm²)',
            tensileStrength: '1770 N/mm²'
        },
        applications: [
            'Mountain highways',
            'Open-pit mines',
            'Railway protection',
            'Steep slopes'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=active%20rockfall%20protection%20net%20system%20steel%20wire%20mesh%20slope&image_size=landscape_16_9'
        ],
        moq: 500,
        priceUsd: 85,
        priceUnit: '㎡',
        priceRemark: 'FOB Tianjin',
        isFeatured: true,
        createdAt: '2025-01-04'
    },
    {
        id: 'prod-6',
        sku: 'PPS-GLX-100',
        slug: 'passive-rockfall-protection-barrier',
        categorySlug: 'protection-net',
        names: {
            en: 'Passive Rockfall Protection Barrier GL-100 (100kJ)',
            zh: '被动落石防护栏 GL-100 (100kJ)',
            ar: 'حاجز الحماية السلبي من تساقط الصخور GL-100 (100 كيلو جول)',
            ja: '受動落石防護柵 GL-100 (100kJ)'
        },
        shortDescriptions: {
            en: 'Flexible passive rockfall barrier with 100kJ energy rating. Posts + steel rope + high-tensile net. CE certified, for highways and railways.',
            zh: '柔性被动落石防护栏，100kJ能量等级。立柱+钢丝绳+高强度网。CE认证，适用于公路和铁路。'
        },
        fullDescriptions: {
            en: `Our GL series passive rockfall barriers are designed to intercept falling rocks at the foot of slopes or in catch ditches. The system uses energy-absorbing brake elements that allow controlled deformation upon impact.

**Product Features:**
- Model: GL-100 (100kJ energy absorption)
- Height: 2.0m / 2.5m / 3.0m options
- Net: High-tensile steel ring net
- Posts: HEA200 steel posts
- Braking Element: Telescopic friction brake
- Anchor: Ground anchors per design

**Certifications:**
- CE certified
- Tested to ETAG 027
- FHWA approved

**Applications:**
- Highway catch fences
- Railway protection
- Industrial site boundaries
- Residential area protection`
        },
        specifications: {
            dimensions: 'Custom length × 2.0-3.0m height',
            wireDiameter: '3.0mm ring net',
            meshAperture: '300×300mm or 250×250mm',
            surfaceTreatment: 'Hot-dipped galvanized',
            material: 'High-Tensile Steel (1770 N/mm²)',
            tensileStrength: '1770 N/mm²'
        },
        applications: [
            'Highway protection',
            'Railway protection',
            'Industrial sites',
            'Residential areas'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=passive%20rockfall%20protection%20barrier%20GL-100%20steel%20wire%20mesh&image_size=landscape_16_9'
        ],
        moq: 200,
        priceUsd: 120,
        priceUnit: 'm',
        priceRemark: 'FOB Tianjin, per linear meter',
        isFeatured: true,
        createdAt: '2025-01-05'
    },
    // ─── Hexagonal Mesh Products ───
    {
        id: 'prod-7',
        sku: 'HWM-13X16-G',
        slug: 'hexagonal-wire-mesh-13mm',
        categorySlug: 'hexagonal-mesh',
        names: {
            en: 'Hexagonal Wire Mesh 13mm (1/2")',
            zh: '六角网 13mm (1/2英寸)',
            ja: '六角金網 13mm (1/2インチ)'
        },
        shortDescriptions: {
            en: 'Standard hexagonal wire mesh 13mm aperture, galvanized. Used for plastering, animal cages, and decoration.',
            zh: '标准六角网，13mm网孔，镀锌。用于抹灰、动物笼和装饰。'
        },
        fullDescriptions: {
            en: `Our hexagonal wire mesh is manufactured using high-quality low carbon steel wires woven into a hexagonal pattern. Available in various mesh sizes and wire gauges for different applications.

**Product Features:**
- Mesh Type: Triple twist hexagonal mesh
- Mesh Size: 13mm (1/2")
- Wire Diameter: 0.5-0.9mm
- Width: 1.0m / 1.2m / 1.5m
- Length: 30m standard roll
- Surface: Electro galvanized or hot-dipped galvanized

**Applications:**
- Plastering mesh (rendering reinforcement)
- Animal enclosures and cages
- Decoration and crafts
- Gardening and landscaping
- Insulation wrapping`
        },
        specifications: {
            meshAperture: '13mm (1/2")',
            wireDiameter: '0.5-0.9mm',
            surfaceTreatment: 'Electro galvanized or Hot-dipped galvanized',
            material: 'Low Carbon Steel Wire',
            width: '1.0m / 1.2m / 1.5m',
            length: '30m standard roll'
        },
        applications: [
            'Plastering reinforcement',
            'Animal cages',
            'Decoration',
            'Gardening'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=hexagonal%20wire%20mesh%2013mm%20chicken%20wire%20roll%20industrial&image_size=landscape_16_9'
        ],
        moq: 50,
        priceUsd: 35,
        priceUnit: '卷',
        priceRemark: 'FOB Tianjin, per roll',
        isFeatured: false,
        createdAt: '2025-01-06'
    },
    {
        id: 'prod-8',
        sku: 'HWM-25X30-G',
        slug: 'hexagonal-wire-mesh-25mm',
        categorySlug: 'hexagonal-mesh',
        names: {
            en: 'Hexagonal Wire Mesh 25mm (1")',
            zh: '六角网 25mm (1英寸)'
        },
        shortDescriptions: {
            en: 'Heavy-duty hexagonal mesh 25mm aperture, 0.7-1.0mm wire. Used for gabion baskets, fencing, and protection.',
            zh: '重型六角网，25mm网孔，0.7-1.0mm丝径。用于石笼篮、围栏和防护。'
        },
        fullDescriptions: {
            en: `Our 25mm hexagonal wire mesh is one of the most popular sizes for gabion manufacturing and general protection applications. The larger mesh opening reduces material usage while maintaining structural integrity.

**Product Features:**
- Mesh Type: Double twist hexagonal mesh
- Mesh Size: 25mm (1")
- Wire Diameter: 0.7-1.0mm
- Width: 1.0m-2.0m options
- Length: 30m standard roll
- Surface: Hot-dipped galvanized (≥80g/m²)

**Applications:**
- Small gabion baskets
- Fencing and boundaries
- Agricultural enclosures
- Storm drain protection`
        },
        specifications: {
            meshAperture: '25mm (1")',
            wireDiameter: '0.7-1.0mm',
            surfaceTreatment: 'Hot-Dipped Galvanized (≥80g/m²)',
            material: 'Low Carbon Steel Wire',
            width: '1.0m / 1.5m / 2.0m',
            length: '30m standard roll'
        },
        applications: [
            'Small gabion baskets',
            'Fencing',
            'Agricultural enclosures',
            'Drainage'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=hexagonal%20wire%20mesh%2025mm%20heavy%20duty%20wire%20mesh%20roll&image_size=landscape_16_9'
        ],
        moq: 50,
        priceUsd: 45,
        priceUnit: '卷',
        priceRemark: 'FOB Tianjin, per roll',
        isFeatured: false,
        createdAt: '2025-01-07'
    },
    // ─── Chain Link Fence Products ───
    {
        id: 'prod-9',
        sku: 'CLF-50-2.5',
        slug: 'chain-link-fence-50mm-2.5mm',
        categorySlug: 'chain-link-fence',
        names: {
            en: 'Chain Link Fence 50mm × 2.5mm Galvanized',
            zh: '勾花网围栏 50mm × 2.5mm 镀锌'
        },
        shortDescriptions: {
            en: 'Standard chain link fence with 50mm mesh and 2.5mm wire. Heavy-duty galvanized steel for security and boundary fencing.',
            zh: '标准勾花网围栏，50mm网孔，2.5mm丝径。重型镀锌钢，用于安全和边界围栏。'
        },
        fullDescriptions: {
            en: `Our chain link fences are manufactured from high-quality hot-dipped galvanized steel wires, providing excellent durability and security. The diamond-pattern mesh offers visibility while maintaining strong barrier protection.

**Product Features:**
- Mesh Size: 50mm × 50mm (2" × 2")
- Wire Diameter: 2.5mm
- Height: 1.0m to 4.0m available
- Roll Length: 10m standard
- Surface: Hot-dipped galvanized (≥60g/m²)
- Selvage: Knuckled top/bottom or twisted top/bottom

**Applications:**
- Sports field fencing
- Construction site boundaries
- Industrial perimeter security
- Residential property boundaries`
        },
        specifications: {
            meshAperture: '50mm × 50mm',
            wireDiameter: '2.5mm',
            surfaceTreatment: 'Hot-Dipped Galvanized (≥60g/m²)',
            material: 'Low Carbon Steel Wire',
            height: '1.0m - 4.0m',
            rollLength: '10m standard'
        },
        applications: [
            'Sports fields',
            'Construction sites',
            'Industrial security',
            'Property boundaries'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=chain%20link%20fence%2050mm%20galvanized%20wire%20mesh%20roll%20industrial&image_size=landscape_16_9'
        ],
        moq: 50,
        priceUsd: 25,
        priceUnit: '卷',
        priceRemark: 'FOB Tianjin, per roll',
        isFeatured: false,
        createdAt: '2025-01-08'
    },
    {
        id: 'prod-10',
        sku: 'CLF-50-PVC',
        slug: 'pvc-chain-link-fence-50mm',
        categorySlug: 'chain-link-fence',
        names: {
            en: 'PVC Coated Chain Link Fence 50mm',
            zh: 'PVC包塑勾花网围栏 50mm'
        },
        shortDescriptions: {
            en: 'PVC coated chain link fence in green or black. Combines the strength of steel with aesthetic appeal for landscaping and residential use.',
            zh: '绿色或黑色PVC包塑勾花网围栏。兼具钢材强度与美观，适用于园林景观和住宅。'
        },
        fullDescriptions: {
            en: `Our PVC coated chain link fences offer superior aesthetics while maintaining excellent durability. The PVC coating protects against UV rays, moisture, and corrosion, extending the fence's service life significantly.

**Product Features:**
- Mesh Size: 50mm × 50mm
- Core Wire: 2.5mm galvanized steel
- PVC Coating: 0.5mm thickness
- Colors: Green (#2D5A27), Black, White available
- Height: 1.0m to 3.0m
- Roll Length: 10m standard

**Applications:**
- Residential landscaping
- Garden boundaries
- Playgrounds
- Decorative fencing`
        },
        specifications: {
            meshAperture: '50mm × 50mm',
            wireDiameter: '2.5mm core + 0.5mm PVC',
            surfaceTreatment: 'PVC Coated (over galvanized)',
            material: 'Low Carbon Steel + PVC',
            coating: 'Green or Black PVC',
            height: '1.0m - 3.0m'
        },
        applications: [
            'Residential',
            'Gardens',
            'Playgrounds',
            'Landscaping'
        ],
        images: [
            'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=green%20PVC%20coated%20chain%20link%20fence%2050mm%20wire%20mesh&image_size=landscape_16_9'
        ],
        moq: 50,
        priceUsd: 38,
        priceUnit: '卷',
        priceRemark: 'FOB Tianjin, per roll',
        isFeatured: true,
        createdAt: '2025-01-09'
    }
];
}),
"[project]/src/lib/data/banners.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "banners",
    ()=>banners
]);
const banners = [
    {
        id: 'banner-1',
        images: {
            en: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view%20aerial%20photography&image_size=landscape_16_9',
            ar: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            ja: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            ko: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            id: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            vi: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            es: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            fr: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            de: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            pt: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9',
            th: 'https://paiqi-copilot.bytedance.net/api/text_to_image?prompt=modern%20wire%20mesh%20factory%20industrial%20building%20panoramic%20view&image_size=landscape_16_9'
        },
        titles: {
            en: 'Professional Gabion Box & Rockfall Protection Net Manufacturer',
            zh: '专业石笼网箱与防护网制造商',
            ar: 'شركة مصنعة محترفة لصناديق الجابيون وشبكات الحماية من تساقط الصخور',
            ja: '石籠ボックス・落石防護網の専門メーカー',
            ko: '가비언 박스·낙石防護網 전문 제조사',
            id: 'Produsen Kotak Gabion & Jaring Perlindungan Batu Longsor Profesional',
            vi: 'Nhà sản xuất Hộp Gabion & Lưới Bảo Vệ Đá Rơi Chuyên Nghiệp',
            es: 'Fabricante Profesional de Cajas Gabión y Mallas de Protección contra Caída de Rocas',
            fr: 'Fabricant Professionnel de Boîtes Gabions et de Filets de Protection contre les Chutes de Pierres',
            de: 'Professioneller Hersteller von Gabionenkörben und Steinschlagschutznetzen',
            pt: 'Fabricante Profissional de Caixas Gabião e Redes de Proteção contra Queda de Pedras',
            th: 'ผู้ผลิตกล่องหินและตะแกรงป้องกันหินร่วงระดับมืออาชีพ'
        },
        subtitles: {
            en: 'From Anping, China — Trusted by 500+ clients across 30+ countries since 2015',
            zh: '来自中国安平 — 自2015年以来，深受30多个国家500多位客户的信赖',
            ar: 'من أنبينغ، الصين — موثوق بها من قبل أكثر من 500 عميل في أكثر من 30 دولة منذ 2015',
            ja: '中国安平より — 2015年以来30カ国以上の500社以上のクライアントに信頼されています',
            ko: '중국 안핑에서 — 2015년 이후 30개국 500개 이상의 고객이 신뢰',
            id: 'Dari Anping, Tiongkok — Dipercaya oleh 500+ klien di 30+ negara sejak 2015',
            vi: 'Từ Anping, Trung Quốc — Được tin tưởng bởi 500+ khách hàng tại 30+ quốc gia từ năm 2015',
            es: 'Desde Anping, China — Confiado por más de 500 clientes en más de 30 países desde 2015',
            fr: "D'Anping, Chine — Approuvé par plus de 500 clients dans plus de 30 pays depuis 2015",
            de: 'Aus Anping, China — Vertraut von über 500 Kunden in über 30 Ländern seit 2015',
            pt: 'De Anping, China — Confiado por 500+ clientes em mais de 30 países desde 2015',
            th: 'จากอันผิง ประเทศจีน — ไว้วางใจโดยลูกค้ากว่า 500 รายในกว่า 30 ประเทศตั้งแต่ปี 2015'
        },
        ctaText: {
            en: 'Get a Free Quote',
            zh: '免费获取报价',
            ar: 'احصل على عرض سعر مجاني',
            ja: '無料見積もりを依頼',
            ko: '무료 견적 받기',
            id: 'Dapatkan Penawaran Gratis',
            vi: 'Nhận Báo Giá Miễn Phí',
            es: 'Obtener una Cotización Gratis',
            fr: "Obtenir un Devis Gratuit",
            de: 'Kostenloses Angebot anfordern',
            pt: 'Obter Cotação Gratuita',
            th: 'ขอใบเสนอราคาฟรี'
        },
        ctaLink: '/contact'
    },
    {
        id: 'banner-2',
        images: {
            en: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920',
            ja: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920'
        },
        titles: {
            en: 'ISO 9001 Certified — Premium Quality Rockfall Protection Systems',
            ja: 'ISO 9001認証 — 高品質落石防護システム'
        },
        subtitles: {
            en: 'CE certified products with full traceability. Tested to ETAG 027 standards.',
            ja: '完全なトレーサビリティを備えたCE認証製品。ETAG 027規格で試験済み。'
        },
        ctaText: {
            en: 'View Certifications',
            ja: '認証を見る'
        },
        ctaLink: '/about'
    },
    {
        id: 'banner-3',
        images: {
            en: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920',
            ja: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920'
        },
        titles: {
            en: 'Factory Direct Pricing — Low MOQ, Fast Delivery Worldwide',
            ja: '工場直送価格 — 低MOQ、世界中への迅速な配送'
        },
        subtitles: {
            en: 'Minimum order quantity from 50 pieces. Door-to-door shipping available.',
            ja: '最小注文数量50個から。世界中へのドアツードア配送対応。'
        },
        ctaText: {
            en: 'Contact Us',
            ja: 'お問い合わせ'
        },
        ctaLink: '/contact'
    }
];
}),
"[project]/src/lib/data/whyChooseUs.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "whyChooseUs",
    ()=>whyChooseUs
]);
const whyChooseUs = [
    {
        icon: 'Factory',
        titles: {
            en: 'Factory Direct',
            zh: '工厂直销',
            ar: 'مباشرة من المصنع',
            ja: '工場直送',
            ko: '공장 직송',
            id: 'Langsung dari Pabrik',
            vi: 'Trực Tiếp Từ Nhà Máy',
            es: 'Directo de Fábrica',
            fr: 'Direct Usine',
            de: 'Direkt ab Werk',
            pt: 'Direto da Fábrica',
            th: 'จากโรงงานโดยตรง'
        },
        descriptions: {
            en: '15+ years manufacturing experience in Anping, the Wire Mesh Capital of China.',
            zh: '在中国丝网之都安平拥有15年以上的制造经验。',
            ar: 'خبرة تصنيع 15+ عامًا في أنبينغ، عاصمة شبكات الأسلاك في الصين.',
            ja: '中国の発展した金網之都で15年以上の製造経験。',
            ko: '중국 와이어메쉬 수도에서 15년 이상의 제조 경험.',
            id: '15+ tahun pengalaman manufaktur di Anping, Ibu Kota Kawat Jaring Tiongkok.',
            vi: '15+ năm kinh nghiệm sản xuất tại Anping, Thủ đô Lưới thép của Trung Quốc.',
            es: '15+ años de experiencia en fabricación en Anping, la Capital del Malla de Alambre de China.',
            fr: "15+ ans d'expérience de fabrication à Anping, la capitale du grillage métallique en Chine.",
            de: '15+ Jahre Fertigungserfahrung in Anping, der Drahtgitter-Hauptstadt Chinas.',
            pt: '15+ anos de experiência em fabricação em Anping, a Capital da Tela de Arame da China.',
            th: 'ประสบการณ์การผลิต 15+ ปีในอันผิง เมืองหลวงของลวดตาข่ายจีน'
        }
    },
    {
        icon: 'ShieldCheck',
        titles: {
            en: 'ISO Certified Quality',
            zh: 'ISO认证品质',
            ar: 'جودة معتمدة من ISO',
            ja: 'ISO認定品質',
            ko: 'ISO 인증 품질',
            id: 'Kualitas Bersertifikat ISO',
            vi: 'Chất Lượng Được Chứng Nhận ISO',
            es: 'Calidad Certificada ISO',
            fr: 'Qualité Certifiée ISO',
            de: 'ISO-zertifizierte Qualität',
            pt: 'Qualidade Certificada ISO',
            th: 'คุณภาพที่ได้รับการรับรอง ISO'
        },
        descriptions: {
            en: 'ISO 9001:2015 certified manufacturing with strict QC at every stage.',
            zh: 'ISO 9001:2015认证制造，每个阶段都有严格的质量控制。',
            ar: 'تصنيع معتمد من ISO 9001:2015 مع رقابة جودة صارمة في كل مرحلة.',
            ja: '各工程で厳格な品質管理を行うISO 9001:2015認証製造。',
            ko: '모든 단계에서 엄격한 품질 관리를 받는 ISO 9001:2015 인증 제조.',
            id: 'Manufaktur bersertifikat ISO 9001:2015 dengan QC ketat di setiap tahap.',
            vi: 'Sản xuất được chứng nhận ISO 9001:2015 với QC nghiêm ngặt ở mọi giai đoạn.',
            es: 'Fabricación certificada ISO 9001:2015 con control de calidad estricto en cada etapa.',
            fr: "Fabrication certifiée ISO 9001:2015 avec contrôle qualité strict à chaque étape.",
            de: 'ISO 9001:2015-zertifizierte Fertigung mit strenger QC in jeder Phase.',
            pt: 'Fabricação certificada ISO 9001:2015 com controle de qualidade rigoroso em cada etapa.',
            th: 'การผลิตที่ได้รับการรับรอง ISO 9001:2015 พร้อม QC ที่เข้มงวดในทุกขั้นตอน'
        }
    },
    {
        icon: 'Globe',
        titles: {
            en: 'Global Delivery',
            zh: '全球配送',
            ar: 'توصيل عالمي',
            ja: '世界配送',
            ko: '글로벌 배송',
            id: 'Pengiriman Global',
            vi: 'Giao Hàng Toàn Cầu',
            es: 'Entrega Global',
            fr: 'Livraison Mondiale',
            de: 'Globale Lieferung',
            pt: 'Entrega Global',
            th: 'จัดส่งทั่วโลก'
        },
        descriptions: {
            en: 'Exported to 30+ countries. Reliable logistics via DHL, FedEx, sea freight.',
            zh: '出口到30多个国家。通过DHL、FedEx、海运提供可靠的物流服务。',
            ar: 'تم التصدير إلى أكثر من 30 دولة. لوجستيات موثوقة عبر DHL وFedEx والشحن البحري.',
            ja: '30カ国以上に輸出。DHL、FedEx、海上貨物による信頼性の高い物流。',
            ko: '30개국 이상 수출. DHL, FedEx, 해상 화물을 통한 신뢰할 수 있는 물류.',
            id: 'Diekspor ke 30+ negara. Logistik andal melalui DHL, FedEx, pengiriman laut.',
            vi: 'Đã xuất khẩu đến 30+ quốc gia. Hậu cần đáng tin cậy qua DHL, FedEx, vận tải biển.',
            es: 'Exportado a más de 30 países. Logística confiable a través de DHL, FedEx, flete marítimo.',
            fr: "Exporté vers plus de 30 pays. Logistique fiable via DHL, FedEx, fret maritime.",
            de: 'Export in über 30 Länder. Zuverlässige Logistik über DHL, FedEx, Seefracht.',
            pt: 'Exportado para mais de 30 países. Logística confiável via DHL, FedEx, frete marítimo.',
            th: 'ส่งออกไปกว่า 30 ประเทศ ขนส่งที่เชื่อถือได้ผ่าน DHL, FedEx, การขนส่งทางเรือ'
        }
    },
    {
        icon: 'Users',
        titles: {
            en: 'Flexible MOQ & OEM',
            zh: '灵活起订量与OEM',
            ar: 'حد أدنى مرن للطلب وتصنيع المعدات الأصلية',
            ja: '柔軟なMOQとOEM',
            ko: '유연한 MOQ 및 OEM',
            id: 'MOQ Fleksibel & OEM',
            vi: 'MOQ Linh Hoạt & OEM',
            es: 'MOQ Flexible y OEM',
            fr: "MOQ Flexible & OEM",
            de: 'Flexible MOQ & OEM',
            pt: 'MOQ Flexível & OEM',
            th: 'MOQ ยืดหยุ่นและ OEM'
        },
        descriptions: {
            en: 'Low MOQ from 50 pcs, full OEM/ODM capabilities for custom specifications.',
            zh: '最低50件起订，具备完整的OEM/ODM定制能力。',
            ar: 'حد أدنى منخفض من 50 قطعة، قدرات كاملة لتصنيع المعدات الأصلية/التصميم الأصلي للمواصفات المخصصة.',
            ja: '50個からの低MOQ、カスタム仕様に対する完全なOEM/ODM対応。',
            ko: '50개부터 낮은 MOQ, 맞춤 사양을 위한 완전한 OEM/ODM 능력.',
            id: 'MOQ rendah dari 50 pcs, kemampuan OEM/ODM penuh untuk spesifikasi khusus.',
            vi: 'MOQ thấp từ 50 cái, khả năng OEM/ODM đầy đủ cho thông số tùy chỉnh.',
            es: 'MOQ bajo desde 50 pcs, capacidades completas de OEM/ODM para especificaciones personalizadas.',
            fr: "MOQ bas à partir de 50 pcs, capacités OEM/ODM complètes pour les spécifications personnalisées.",
            de: 'Niedrige MOQ ab 50 Stück, vollständige OEM/ODM-Fähigkeiten für kundenspezifische Spezifikationen.',
            pt: 'MOQ baixo a partir de 50 peças, capacidades OEM/ODM completas para especificações personalizadas.',
            th: 'MOQ ต่ำสุด 50 ชิ้น ความสามารถ OEM/ODM เต็มรูปแบบสำหรับข้อกำหนดที่กำหนดเอง'
        }
    }
];
}),
"[project]/src/components/products/ProductCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
;
;
function ProductCard({ product, locale }) {
    const name = product.names[locale] || product.names.en || '';
    const shortDesc = product.shortDescriptions[locale] || product.shortDescriptions.en || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        href: `/${locale}/products/${product.slug}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 h-full flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: product.images[0],
                            alt: name,
                            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                            loading: "lazy"
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/ProductCard.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        product.moq && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-3 start-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md",
                            children: [
                                "MOQ: ",
                                product.moq
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/products/ProductCard.tsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this),
                        product.isFeatured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-3 end-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md",
                            children: "★ Featured"
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/ProductCard.tsx",
                            lineNumber: 29,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/products/ProductCard.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4 flex flex-col flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors",
                            children: name
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/ProductCard.tsx",
                            lineNumber: 35,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-slate-600 line-clamp-2 mb-3 flex-1",
                            children: shortDesc
                        }, void 0, false, {
                            fileName: "[project]/src/components/products/ProductCard.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between mt-auto pt-2 border-t border-slate-50",
                            children: [
                                product.priceUsd ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-blue-600 font-bold text-sm",
                                    children: [
                                        "$",
                                        product.priceUsd,
                                        " / ",
                                        product.priceUnit || 'unit'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/products/ProductCard.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-400 text-xs",
                                    children: "Price on request"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/ProductCard.tsx",
                                    lineNumber: 43,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium",
                                    children: "Details →"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/products/ProductCard.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/products/ProductCard.tsx",
                            lineNumber: 39,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/products/ProductCard.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/products/ProductCard.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/products/ProductCard.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/[locale]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/data/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$banners$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/banners.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$whyChooseUs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/whyChooseUs.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/products/ProductCard.tsx [app-rsc] (ecmascript)");
;
;
;
;
async function HomePage({ params }) {
    const { locale } = await params;
    // Static import of messages for static export compatibility
    const messages = (await __turbopack_context__.f({
        "../../messages/ar.json": {
            id: ()=>"[project]/src/messages/ar.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/ar.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/de.json": {
            id: ()=>"[project]/src/messages/de.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/de.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/en.json": {
            id: ()=>"[project]/src/messages/en.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/en.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/es.json": {
            id: ()=>"[project]/src/messages/es.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/es.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/fr.json": {
            id: ()=>"[project]/src/messages/fr.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/fr.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/id.json": {
            id: ()=>"[project]/src/messages/id.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/id.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/ja.json": {
            id: ()=>"[project]/src/messages/ja.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/ja.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/ko.json": {
            id: ()=>"[project]/src/messages/ko.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/ko.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/pt.json": {
            id: ()=>"[project]/src/messages/pt.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/pt.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/th.json": {
            id: ()=>"[project]/src/messages/th.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/th.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/vi.json": {
            id: ()=>"[project]/src/messages/vi.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/vi.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        },
        "../../messages/zh.json": {
            id: ()=>"[project]/src/messages/zh.json.[json].cjs [app-rsc] (ecmascript, async loader)",
            module: ()=>__turbopack_context__.A("[project]/src/messages/zh.json.[json].cjs [app-rsc] (ecmascript, async loader)")
        }
    }).import(`../../messages/${locale}.json`)).default;
    const t = (key)=>messages.home?.[key] || key;
    const tCommon = (key)=>messages.common?.[key] || key;
    const tNav = (key)=>messages.nav?.[key] || key;
    const featuredProducts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].filter((p)=>p.isFeatured).slice(0, 8);
    const activeBanner = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$banners$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["banners"][0];
    const bannerTitle = activeBanner.titles[locale] || activeBanner.titles.en || '';
    const bannerSubtitle = activeBanner.subtitles[locale] || activeBanner.subtitles.en || '';
    const bannerCta = activeBanner.ctaText[locale] || activeBanner.ctaText.en || 'Get a Quote';
    const bannerImage = activeBanner.images[locale] || activeBanner.images.en || '';
    const applicationFields = [
        {
            icon: '🌉',
            label: 'Bridge Protection',
            color: 'bg-blue-50'
        },
        {
            icon: '🏗️',
            label: 'Construction',
            color: 'bg-slate-50'
        },
        {
            icon: '🌊',
            label: 'Water Conservancy',
            color: 'bg-blue-50'
        },
        {
            icon: '⛰️',
            label: 'Mining Safety',
            color: 'bg-slate-50'
        },
        {
            icon: '🛤️',
            label: 'Railway',
            color: 'bg-blue-50'
        },
        {
            icon: '🛣️',
            label: 'Highway',
            color: 'bg-slate-50'
        },
        {
            icon: '🏖️',
            label: 'Coastal Defense',
            color: 'bg-blue-50'
        },
        {
            icon: '🏡',
            label: 'Landscaping',
            color: 'bg-slate-50'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative h-[580px] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-900/40 z-10"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: bannerImage,
                        alt: "Gabion wire mesh products",
                        className: "absolute inset-0 w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-20 flex items-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-2 bg-blue-600/80 text-white text-xs px-3 py-1.5 rounded-full mb-6 backdrop-blur-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 45,
                                            columnNumber: 15
                                        }, this),
                                        locale === 'zh' ? 'ISO 9001 认证制造商' : locale === 'ja' ? 'ISO 9001 認証メーカー' : locale === 'ar' ? 'مصنع معتمد من ISO 9001' : 'ISO 9001 Certified Manufacturer'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6",
                                    children: bannerTitle
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 48,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg md:text-xl text-white/90 mb-10 leading-relaxed",
                                    children: bannerSubtitle
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 51,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${locale}/contact`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                                                children: bannerCta
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/page.tsx",
                                                lineNumber: 56,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 55,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/${locale}/products`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-base backdrop-blur-sm transition-all hover:-translate-y-0.5",
                                                children: t('viewProducts')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center",
                                children: [
                                    {
                                        num: '11+',
                                        label: 'Years Experience'
                                    },
                                    {
                                        num: '30+',
                                        label: 'Countries Exported'
                                    },
                                    {
                                        num: '500+',
                                        label: 'Happy Clients'
                                    },
                                    {
                                        num: '50+',
                                        label: 'Product Types'
                                    }
                                ].map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-2xl md:text-3xl font-bold text-blue-600",
                                                children: stat.num
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/page.tsx",
                                                lineNumber: 80,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500 mt-0.5",
                                                children: stat.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/page.tsx",
                                                lineNumber: 81,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, stat.label, true, {
                                        fileName: "[project]/src/app/[locale]/page.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-14",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-bold text-slate-900 mb-4",
                                children: t('featuredProducts')
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-1 bg-blue-600 mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-500 max-w-xl mx-auto",
                                children: locale === 'zh' ? '探索我们最受欢迎的石笼网和防护网产品，深受全球客户信赖。' : locale === 'ja' ? '世界中のクライアントに信頼されている、当社の人気石籠・防護網製品をご覧ください。' : locale === 'ar' ? 'اكتشف منتجات الجابيون وشبكات الحماية الأكثر شعبية، موثوقة من قبل العملاء حول العالم.' : 'Discover our most popular gabion and protection net products, trusted by clients worldwide.'
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 94,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                        children: featuredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$products$2f$ProductCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProductCard"], {
                                product: product,
                                locale: locale
                            }, product.id, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mt-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/${locale}/products`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all",
                                children: locale === 'zh' ? '查看全部产品 →' : locale === 'ja' ? 'すべての製品を見る →' : locale === 'ar' ? 'عرض جميع المنتجات →' : 'View All Products →'
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/page.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 bg-slate-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-14",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold text-slate-900 mb-4",
                                    children: t('whyChooseUs')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-1 bg-blue-600 mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$whyChooseUs$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["whyChooseUs"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl",
                                                children: index === 0 ? '🏭' : index === 1 ? '🛡️' : index === 2 ? '🌍' : '🤝'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-bold text-slate-900 mb-3",
                                            children: item.titles[locale] || item.titles.en
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-slate-600 leading-relaxed",
                                            children: item.descriptions[locale] || item.descriptions.en
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[locale]/page.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center mb-14",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-bold text-slate-900 mb-4",
                                children: locale === 'zh' ? '产品分类' : locale === 'ja' ? '製品カテゴリー' : locale === 'ar' ? 'فئات المنتجات' : 'Product Categories'
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-1 bg-blue-600 mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-500 max-w-xl mx-auto",
                                children: locale === 'zh' ? '浏览我们全面的金属丝网和防护产品系列。' : locale === 'ja' ? '包括的な金網・防護製品ラインナップをご覧ください。' : locale === 'ar' ? 'تصفح مجموعتنا الشاملة من منتجات شبكات الأسلاك والحماية.' : 'Browse our comprehensive range of wire mesh and protection products.'
                            }, void 0, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["categories"].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: `/${locale}/products?category=${cat.slug}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "aspect-[4/3] overflow-hidden bg-slate-100",
                                            children: cat.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: cat.image,
                                                alt: cat.names[locale] || cat.names.en || '',
                                                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/[locale]/page.tsx",
                                                lineNumber: 159,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 157,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-slate-900 group-hover:text-blue-600 transition-colors",
                                                    children: cat.names[locale] || cat.names.en
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 19
                                                }, this),
                                                cat.productCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400 mt-1",
                                                    children: [
                                                        cat.productCount,
                                                        " ",
                                                        locale === 'zh' ? '款产品' : locale === 'ja' ? '製品' : locale === 'ar' ? 'منتجات' : 'products'
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 15
                                }, this)
                            }, cat.id, false, {
                                fileName: "[project]/src/app/[locale]/page.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/[locale]/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/[locale]/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 bg-slate-900 text-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-14",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-bold mb-4",
                                    children: t('applicationFields')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-1 bg-blue-500 mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400 max-w-xl mx-auto mt-4",
                                    children: locale === 'zh' ? '我们的石笼网和防护网产品广泛应用于以下领域：' : locale === 'ja' ? '当社の石籠・防護網製品は以下の分野で広く使用されています：' : locale === 'ar' ? 'يتم استخدام منتجات الجابيون وشبكات الحماية لدينا على نطاق واسع في المجالات التالية:' : 'Our gabion and protection net products are widely used in the following fields:'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4",
                            children: applicationFields.map((field, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border border-slate-700 rounded-xl text-center hover:border-blue-500 hover:bg-slate-800 transition-all cursor-pointer group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-3xl mb-2",
                                            children: field.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs font-medium text-slate-300 group-hover:text-white transition-colors",
                                            children: locale === 'zh' ? field.label === 'Bridge Protection' ? '桥梁防护' : field.label === 'Construction' ? '建筑施工' : field.label === 'Water Conservancy' ? '水利工程' : field.label === 'Mining Safety' ? '矿山安全' : field.label === 'Railway' ? '铁路工程' : field.label === 'Highway' ? '公路工程' : field.label === 'Coastal Defense' ? '海岸防护' : field.label === 'Landscaping' ? '园林景观' : field.label : field.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/[locale]/page.tsx",
                                            lineNumber: 199,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[locale]/page.tsx",
                    lineNumber: 184,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/page.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-20 bg-gradient-to-r from-blue-600 to-blue-700",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-3xl md:text-4xl font-bold text-white mb-6",
                            children: locale === 'zh' ? '准备好获取免费报价了吗？' : locale === 'ja' ? '無料見積もりをご用意できますか？' : locale === 'ar' ? 'هل أنت مستعد للحصول على عرض سعر مجاني؟' : 'Ready to Get Your Free Quote?'
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 221,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-blue-100 text-lg mb-10 max-w-2xl mx-auto",
                            children: locale === 'zh' ? '发送您的规格要求，我们将在24小时内提供详细报价。无义务，工厂直销价格。' : locale === 'ja' ? '仕様をお送りいただければ、24時間以内に詳細な見積もりをご提供します。無義務、工場直送価格。' : locale === 'ar' ? 'أرسل لنا مواصفاتك وسنقدم لك عرض سعر مفصل في غضون 24 ساعة. بدون التزام، أسعار مباشرة من المصنع.' : "Send us your specifications and we'll provide a detailed quotation within 24 hours. No obligation, factory direct pricing."
                        }, void 0, false, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/${locale}/contact`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5",
                                        children: locale === 'zh' ? '免费获取报价' : locale === 'ja' ? '無料見積もり' : locale === 'ar' ? 'احصل على عرض سعر مجاني' : 'Get Free Quote'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/[locale]/page.tsx",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://wa.me/8613812345678",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2",
                                        children: [
                                            "💬 ",
                                            locale === 'zh' ? 'WhatsApp咨询' : locale === 'ja' ? 'WhatsAppで相談' : locale === 'ar' ? 'دردشة على واتساب' : 'Chat on WhatsApp'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/[locale]/page.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/[locale]/page.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/[locale]/page.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/[locale]/page.tsx",
                    lineNumber: 220,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/[locale]/page.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/app/[locale]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/[locale]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0rrhilg._.js.map