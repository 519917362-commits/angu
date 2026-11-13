/**
 * 品类支柱页的内容源。
 *
 * 这四个品类此前只存在于 /products?category=xx 这种带参数的筛选页里，
 * 没有独立的可收录落地页——而它们正是「gabion box manufacturer」这类
 * 商业搜索词最该命中的地方。noise-barrier 已有独立定制页，不在此列。
 *
 * 2026-11-13 起品类改为两级：
 * - 一级：noise-barrier（独立页）/ natural-disaster-protection / fence / wire-mesh
 * - 二级：natural-disaster-protection 下的 slope-protection 与 gabion
 * 一级的 natural-disaster-protection 是枢纽页，只列子品类，不直接挂产品。
 */

import {localeHref} from '@/lib/routing';
import type {Category} from '@/types/product';

export const PILLAR_SLUGS = [
  'natural-disaster-protection',
  'slope-protection',
  'gabion',
  'fence',
  'wire-mesh',
] as const;
export type PillarSlug = (typeof PILLAR_SLUGS)[number];

/**
 * 品类层级表。键是子品类，值是其父品类。
 * 一级品类不出现在这里——判断一级用 `!CATEGORY_PARENT[slug]`。
 */
export const CATEGORY_PARENT: Record<string, string> = {
  'slope-protection': 'natural-disaster-protection',
  gabion: 'natural-disaster-protection',
};

/** 反向表：父品类 → 有序子品类。顺序即页面与导航里的展示顺序。 */
export const CATEGORY_CHILDREN: Record<string, string[]> = {
  'natural-disaster-protection': ['slope-protection', 'gabion'],
};

/** 顶部导航与「其他产品线」只列一级品类，避免同一分类在两个层级重复出现。 */
export const TOP_LEVEL_PILLAR_SLUGS = PILLAR_SLUGS.filter((s) => !CATEGORY_PARENT[s]);

export function isParentCategory(slug: string): boolean {
  return Boolean(CATEGORY_CHILDREN[slug]?.length);
}

/**
 * 把 /api/catalog 返回的一级品类树摊平成一张 slug → 品类 的映射。
 *
 * 后端为了不让前端重复渲染，categories 只返回一级品类，二级在 children 里。
 * 但产品详情页按 product.categorySlug 反查品类名时必须能查到二级，
 * 否则石笼网与边坡防护的产品页会丢掉面包屑上一级。
 */
export function categoryMap(categories: Category[]): Record<string, Category> {
  const map: Record<string, Category> = {};
  for (const cat of categories) {
    map[cat.slug] = cat;
    for (const kid of cat.children || []) map[kid.slug] = kid;
  }
  return map;
}

/**
 * 品类落地页路径表。
 *
 * 后端 products.category_slug 一共 5 个取值，全部已有独立落地页：
 * 4 个走 app/[locale]/[category]，noise-barrier 走 app/[locale]/noise-barrier。
 *
 * 站内所有「按品类浏览」的链接都必须走这里，指向静态落地页而不是
 * /products?category=xx —— 参数页的 canonical 只能指向 /products，
 * 自己拿不到排名，等于把品类词全部让掉。
 */
export const CATEGORY_LANDING = {
  'natural-disaster-protection': 'natural-disaster-protection',
  'slope-protection': 'slope-protection',
  gabion: 'gabion',
  fence: 'fence',
  'wire-mesh': 'wire-mesh',
  'noise-barrier': 'noise-barrier',
} as const;

/** 品类链接：有落地页走落地页，没有则回落参数页（后端新增品类时不会 404）。 */
export function categoryHref(locale: string, slug: string): string {
  const landing = (CATEGORY_LANDING as Record<string, string>)[slug];
  // 统一走 localeHref：partialLocales（ms/ar）不能拿到的路径直接落 /en，
  // 避免 /ms/fence 这类地址被 proxy 308 弹一次
  return landing
    ? localeHref(locale, `/${landing}`)
    : localeHref(locale, `/products?category=${slug}`);
}

export interface PillarCopy {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  bullets: string[];
  faq: { q: string; a: string }[];
}

/**
 * 分类落地页的分享图（与语种无关，所以单独一张表，不在 4 个语种的 copy 里重复）。
 * 这四个页面是品类词的主要着陆点，此前 og:image 完全缺失，
 * 在 LinkedIn / WhatsApp 里转发只有纯文字，没有缩略图。
 */
export const PILLAR_OG_IMAGE: Record<PillarSlug, string> = {
  'natural-disaster-protection': '/images/products/protection-net.jpg',
  'slope-protection': '/images/products/protection-net.jpg',
  gabion: '/images/products/gabion-box.jpg',
  fence: '/images/products/chain-link.jpg',
  'wire-mesh': '/images/products/welded-wire-mesh.jpg',
};

export const PILLARS: Record<PillarSlug, Record<string, PillarCopy>> = {
  gabion: {
    en: {
      metaTitle: 'Gabion Box Manufacturer — Galvanized & PVC Coated | Angu',
      metaDesc:
        'Factory-direct gabion boxes, reno mattresses and gabion retaining walls. Hot-dip galvanized wire 2.7–4.0 mm, zinc 240–275 g/m², mesh 80×100 mm. ISO 9001.',
      h1: 'Gabion Boxes & Reno Mattresses',
      intro:
        'Gabion structures are the cheapest way to build a retaining wall, protect a river bank or stabilise a slope. We weave the hexagonal mesh in-house, hot-dip galvanize to 240–275 g/m² and assemble the boxes in our Anping plant — so you buy from the loom, not from a trading company.',
      bullets: [
        'Mesh 80×100 mm standard; 60×80 and 100×120 mm on request',
        'Wire 2.7–4.0 mm, zinc coating 240–275 g/m² (ASTM A975 / EN 10223-3)',
        'PVC coated option with UV-stable class 2 coating for coastal sites',
        'Reno mattresses 6×2×0.3 m and custom sizes, flat-packed for container loading',
      ],
      faq: [
        {
          q: 'What is the difference between a gabion box and a reno mattress?',
          a: 'A gabion box is 1–2 m high and carries the retaining load; a reno mattress is only 0.2–0.3 m thick and lines river beds and slopes, where flexibility matters more than mass.',
        },
        {
          q: 'Which zinc coating should I specify?',
          a: '240 g/m² covers normal inland exposure. For coastal or industrial atmospheres specify 275 g/m², or switch to PVC coated mesh.',
        },
        {
          q: 'What are the MOQ and lead time?',
          a: 'MOQ is 100 m² for standard sizes. Lead time depends on specification — the exact figure is shown on each product page, counted from the date the deposit is received, plus sea freight.',
        },
      ],
    },
    zh: {
      metaTitle: '石笼网箱生产厂家 — 热镀锌 / PVC 覆塑 | 安固丝网',
      metaDesc:
        '工厂直供石笼网箱、雷诺护垫与石笼挡墙。热镀锌钢丝 2.7–4.0 mm，锌层 240–275 g/m²，网孔 80×100 mm。ISO 9001 认证。',
      h1: '石笼网箱与雷诺护垫',
      intro:
        '石笼结构是挡墙、河道护岸与边坡防护里性价比最高的做法。我们从拉丝、织网到镀锌全部在安平工厂内完成，锌层稳定在 240–275 g/m²，箱子出厂前组装成型——你拿到的是出厂价，不是贸易商的转手价。',
      bullets: [
        '标准网孔 80×100 mm，可定制 60×80 / 100×120 mm',
        '钢丝 2.7–4.0 mm，锌层 240–275 g/m²（ASTM A975 / EN 10223-3）',
        '沿海或盐雾环境可选 PVC 覆塑，抗 UV 等级 2 级',
        '雷诺护垫 6×2×0.3 m 及定制尺寸，压扁打包便于装柜',
      ],
      faq: [
        {
          q: '石笼网箱和雷诺护垫有什么区别？',
          a: '网箱高度 1–2 m，承担挡土受力；雷诺护垫只有 0.2–0.3 m 厚，用于河床与坡面护砌，靠柔性适应变形而不是靠自重。',
        },
        {
          q: '锌层该选多少？',
          a: '内陆常规环境 240 g/m² 足够；沿海或工业腐蚀环境建议 275 g/m²，或直接选 PVC 覆塑。',
        },
        {
          q: '起订量和交期？',
          a: '常规规格 100 平方米起订。交期按规格不同，具体天数见各产品页，自定金到账之日起算，另加海运时间。',
        },
        // 港台与海外华语买家搜的是繁体写法（石籠、擋土牆、石籠牆），
        // GSC 里这几个词已能排到 8 名上下，但页面正文一次都没出现过，
        // 靠的只是语义匹配。写进 FAQ 是为了让词面真正对上，顺带进 FAQPage 结构化数据。
        {
          q: '「石籠」「擋土牆」和石笼网箱是一回事吗？',
          a: '是一回事。港澳台与海外华语客户常写作「石籠」「石籠擋土牆」或「石籠牆」，英文对应 gabion box 与 gabion wall；简体写作「石笼」「石笼挡墙」。三种写法指同一套结构，规格、锌层与验收标准完全一致，按同一份图纸生产。',
        },
      ],
    },
    vi: {
      metaTitle: 'Nhà sản xuất hộp gabion — Mạ kẽm nhúng nóng & phủ PVC | Angu',
      metaDesc:
        'Hộp gabion, nệm reno và tường chắn gabion giá xuất xưởng. Dây mạ kẽm nhúng nóng 2,7–4,0 mm, lớp kẽm 240–275 g/m², lưới 80×100 mm. ISO 9001.',
      h1: 'Hộp gabion và nệm reno',
      intro:
        'Kết cấu gabion là giải pháp rẻ nhất để làm tường chắn, bảo vệ bờ sông hoặc ổn định mái dốc. Chúng tôi tự đan lưới lục giác, mạ kẽm nhúng nóng 240–275 g/m² và lắp hộp ngay tại nhà máy An Bình — bạn mua trực tiếp từ xưởng, không qua trung gian.',
      bullets: [
        'Lưới tiêu chuẩn 80×100 mm; 60×80 và 100×120 mm theo yêu cầu',
        'Dây 2,7–4,0 mm, lớp kẽm 240–275 g/m² (ASTM A975 / EN 10223-3)',
        'Tùy chọn phủ PVC chống UV cấp 2 cho khu vực ven biển',
        'Nệm reno 6×2×0,3 m và kích thước đặt riêng, ép phẳng để đóng container',
      ],
      faq: [
        {
          q: 'Hộp gabion và nệm reno khác nhau thế nào?',
          a: 'Hộp gabion cao 1–2 m và chịu lực chắn đất; nệm reno chỉ dày 0,2–0,3 m, dùng lát đáy sông và mái dốc, nơi độ mềm dẻo quan trọng hơn khối lượng.',
        },
        {
          q: 'Nên chọn lớp kẽm bao nhiêu?',
          a: '240 g/m² đủ cho môi trường nội địa. Vùng ven biển hoặc công nghiệp nên dùng 275 g/m², hoặc chuyển sang lưới phủ PVC.',
        },
        {
          q: 'Số lượng tối thiểu và thời gian giao hàng?',
          a: 'MOQ 100 m² cho kích thước tiêu chuẩn. Thời gian sản xuất tùy quy cách — số ngày cụ thể ghi trên từng trang sản phẩm, tính từ ngày nhận tiền đặt cọc, chưa gồm vận chuyển biển.',
        },
      ],
    },
    th: {
      metaTitle: 'ผู้ผลิตกล่อง Gabion — ชุบกัลวาไนซ์ร้อน & เคลือบ PVC | Angu',
      metaDesc:
        'กล่อง Gabion เบาะreno และกำแพงกันดิน Gabion ราคาโรงงาน ลวดชุบกัลวาไนซ์ร้อน 2.7–4.0 มม. ชั้นสังกะสี 240–275 g/m² ตาข่าย 80×100 มม. ISO 9001',
      h1: 'กล่อง Gabion และเบาะ Reno',
      intro:
        'โครงสร้าง Gabion เป็นวิธีที่ประหยัดที่สุดสำหรับกำแพงกันดิน ป้องกันตลิ่ง และ stabilise ลาดชัน เราถักตาข่ายหกเหลี่ยมเอง ชุบกัลวาไนซ์ร้อน 240–275 g/m² และประกอบกล่องที่โรงงานอันผิง — ซื้อจากโรงงานโดยตรง',
      bullets: [
        'ตาข่ายมาตรฐาน 80×100 มม. สั่งทำ 60×80 และ 100×120 มม. ได้',
        'ลวด 2.7–4.0 มม. ชั้นสังกะสี 240–275 g/m² (ASTM A975 / EN 10223-3)',
        'ตัวเลือกเคลือบ PVC กัน UV สำหรับพื้นที่ชายฝั่ง',
        'เบาะ Reno 6×2×0.3 ม. และขนาดพิเศษ อัดแบนเพื่อบรรจุตู้คอนเทนเนอร์',
      ],
      faq: [
        {
          q: 'กล่อง Gabion กับเบาะ Reno ต่างกันอย่างไร',
          a: 'กล่อง Gabion สูง 1–2 ม. รับแรงกันดิน ส่วนเบาะ Reno หนาเพียง 0.2–0.3 ม. ใช้ปูท้องน้ำและลาดชัน ซึ่งต้องการความยืดหยุ่นมากกว่าน้ำหนัก',
        },
        {
          q: 'ควรเลือกชั้นสังกะสีเท่าไร',
          a: '240 g/m² เพียงพอสำหรับพื้นที่ภายในประเทศ พื้นที่ชายฝั่งหรือโรงงานแนะนำ 275 g/m² หรือเปลี่ยนเป็นตาข่ายเคลือบ PVC',
        },
        {
          q: 'ยอดสั่งขั้นต่ำและระยะเวลาผลิต',
          a: 'MOQ 100 ตร.ม. สำหรับขนาดมาตรฐาน ระยะเวลาส่งมอบขึ้นอยู่กับข้อกำหนด — ระบุเป็นวันแน่นอนในแต่ละหน้าสินค้า นับจากวันที่ได้รับเงินมัดจำ ยังไม่รวมเวลาขนส่งทางเรือ',
        },
      ],
    },
  },

  fence: {
    en: {
      metaTitle: 'Fencing Manufacturer — Chain Link, 358 & Temporary | Angu',
      metaDesc:
        'Factory-direct fencing: chain link, 358 anti-climb, 868 double wire, temporary fence, crowd barriers and airport perimeter. ISO 9001, MOQ from 50 m².',
      h1: 'Fencing for Farms, Stadiums and Industry',
      intro:
        'One factory for chain link, 358 anti-climb and 868 double-wire panels, temporary fencing, crowd barriers and airport perimeter systems — we draw the wire and weld the panels ourselves. That means one specification standard across the whole project, instead of five suppliers with five different tolerances.',
      bullets: [
        'Chain link 50×50 mm, wire 2.0–4.0 mm, heights 1.0–4.0 m',
        '358 anti-climb 76.2×12.7 mm and 868 double-wire 50×200 mm panels',
        'Temporary fence in 6×10 ft North American and 2100×2400 mm AS 4687 sizes',
        'Airport, prison and border perimeter on Y-posts, 3.0–4.2 m with barbed wire',
        'Cattle panels 4-gauge wire, 150×200 mm openings, tested against 2000 kg impact',
        'Hot-dip galvanized 240 g/m², PVC or polyester coated in any RAL colour',
      ],
      faq: [
        {
          q: 'Can you match a fence that is already on site?',
          a: 'Yes. Send photos plus a tape measurement of post spacing, mesh opening and wire diameter, and we reproduce the section with the same coating colour.',
        },
        {
          q: 'Do you supply posts, clamps and gates?',
          a: 'Yes — H-posts, T-posts, tension bars, clamps and gates ship together with the mesh as one set, so nothing is missing on site.',
        },
        {
          q: 'What are the MOQ and lead time?',
          a: 'MOQ is 50 m² for trial orders and 500 m² for custom coating colours. Lead time depends on specification — see each product page; counted from the date the deposit is received.',
        },
      ],
    },
    zh: {
      metaTitle: '围栏生产厂家 — 358 防攀爬 / 临时护栏 / 护栏网 | 安固丝网',
      metaDesc:
        '工厂直供围栏：护栏网、358 防攀爬、868 双丝、临时护栏、隔离护栏与人群围栏。热镀锌或 PVC 覆塑，ISO 9001，50 平方米起订。',
      h1: '牧场、场馆与工业围栏',
      intro:
        '护栏网、358 防攀爬与 868 双丝网片、临时护栏、人群隔离栏、机场周界系统，全部在同一家工厂完成拉丝与焊接。整项目只用一套规格标准，而不是五家供应商五种公差——这是围栏工程最容易出问题的地方。',
      bullets: [
        '护栏网 50×50 mm，丝径 2.0–4.0 mm，高度 1.0–4.0 m',
        '358 防攀爬 76.2×12.7 mm 与 868 双丝 50×200 mm 网片',
        '临时护栏：北美 6′×10′ 与澳洲 2100×2400 mm（AS 4687）',
        '机场、监狱、边境隔离护栏，Y 型柱带刺绳，总高 3.0–4.2 m',
        '牛栏网 4 号丝，网孔 150×200 mm，通过 2000 kg 冲击测试',
        '热镀锌 240 g/m²，可按任意 RAL 色号 PVC 或聚酯覆塑',
      ],
      faq: [
        {
          q: '能按现场已有的围栏配货吗？',
          a: '可以。提供现场照片和立柱间距、网孔、丝径的实测尺寸，我们按同样规格和涂层颜色复刻。',
        },
        {
          q: '立柱、卡扣、大门一起供吗？',
          a: '一起供。H 型柱、T 型柱、张紧杆、卡扣与大门随网体配套发运，避免现场缺件。',
        },
        {
          q: '起订量与交期？',
          a: '试单 50 平方米起，定制覆塑颜色 500 平方米起；交期按规格不同，见各产品页，自定金到账之日起算。',
        },
      ],
    },
    vi: {
      metaTitle: 'Nhà sản xuất hàng rào — lưới B40, 358, sân vận động | Angu',
      metaDesc:
        'Hàng rào giá xuất xưởng: lưới mắt cáo, chống leo 358, lưới đôi 868, hàng rào tạm, rào chắn đám đông và vành đai sân bay. ISO 9001, MOQ từ 50 m².',
      h1: 'Hàng rào cho nông trại, sân vận động và công nghiệp',
      intro:
        'Một nhà máy duy nhất cho lưới mắt cáo, tấm chống leo 358 và lưới đôi 868, hàng rào tạm, rào chắn đám đông và hệ thống vành đai sân bay — chúng tôi tự kéo dây và hàn tấm. Cả dự án dùng một tiêu chuẩn kỹ thuật, thay vì năm nhà cung cấp với năm dung sai khác nhau.',
      bullets: [
        'Lưới mắt cáo 50×50 mm, dây 2,0–4,0 mm, cao 1,0–4,0 m',
        'Chống leo 358 (76,2×12,7 mm) và lưới đôi 868 (50×200 mm)',
        'Hàng rào tạm cỡ Bắc Mỹ 6×10 ft và cỡ Úc 2100×2400 mm (AS 4687)',
        'Vành đai sân bay, nhà tù, biên giới trên cột chữ Y, cao 3,0–4,2 m có dây gai',
        'Tấm chuồng bò dây cỡ 4, ô 150×200 mm, chịu va đập 2000 kg',
        'Mạ kẽm nhúng nóng 240 g/m², phủ PVC hoặc polyester theo mọi mã RAL',
      ],
      faq: [
        {
          q: 'Có làm theo hàng rào đang có tại công trình không?',
          a: 'Có. Gửi ảnh và số đo khoảng cách cột, ô lưới, đường kính dây; chúng tôi làm đúng chủng loại và màu phủ tương ứng.',
        },
        {
          q: 'Có cung cấp cột, kẹp và cổng không?',
          a: 'Có — cột H, cột T, thanh căng, kẹp và cổng đi kèm lưới thành một bộ, tránh thiếu vật tư tại công trường.',
        },
        {
          q: 'MOQ và thời gian sản xuất?',
          a: 'MOQ 50 m² cho đơn thử, 500 m² cho màu phủ tùy chỉnh. Thời gian sản xuất tùy quy cách, xem từng trang sản phẩm, tính từ ngày nhận tiền đặt cọc.',
        },
      ],
    },
    th: {
      metaTitle: 'ผู้ผลิตวัสดุกั้น — ลวดตาข่าย 358 รั้วชั่วคราว | Angu',
      metaDesc:
        'รั้วราคาโรงงาน: ลวดตาข่าย รั้วกันปีน 358 ลวดคู่ 868 รั้วชั่วคราว แผงกั้นฝูงชน และแนวเขตสนามบิน ISO 9001 สั่งขั้นต่ำ 50 ตร.ม.',
      h1: 'รั้วสำหรับฟาร์ม สนามกีฬา และอุตสาหกรรม',
      intro:
        'โรงงานเดียวสำหรับลวดตาข่าย แผงกันปีน 358 และลวดคู่ 868 รั้วชั่วคราว แผงกั้นฝูงชน และระบบแนวเขตสนามบิน — เราดึงลวดและเชื่อมแผงเอง ทั้งโครงการใช้มาตรฐานเดียว ไม่ใช่ห้าผู้ขายกับห้าค่าเผื่อที่ต่างกัน',
      bullets: [
        'ลวดตาข่าย 50×50 มม. ลวด 2.0–4.0 มม. สูง 1.0–4.0 ม.',
        'แผงกันปีน 358 (76.2×12.7 มม.) และลวดคู่ 868 (50×200 มม.)',
        'รั้วชั่วคราวขนาดอเมริกาเหนือ 6×10 ฟุต และออสเตรเลีย 2100×2400 มม. (AS 4687)',
        'แนวเขตสนามบิน เรือนจำ ชายแดน บนเสาตัว Y สูง 3.0–4.2 ม. พร้อมลวดหนาม',
        'แผงคอกวัว ลวดเบอร์ 4 ช่อง 150×200 มม. ทดสอบรับแรงกระแทก 2000 กก.',
        'ชุบกัลวาไนซ์ร้อน 240 g/m² เคลือบ PVC หรือโพลีเอสเตอร์ตามรหัส RAL',
      ],
      faq: [
        {
          q: 'ทำตามรั้วที่มีอยู่หน้างานได้ไหม',
          a: 'ได้ ส่งรูปและวัดระยะเสา ช่องตาข่าย และขนาดลวดมา เราผลิตให้ตรงรุ่นและสีเคลือบเดียวกัน',
        },
        {
          q: 'มีเสา ตัวล็อก และประตูให้ด้วยไหม',
          a: 'มี — เสา H เสา T แท่งดึง ตัวล็อก และประตู จัดส่งพร้อมตาข่ายเป็นชุดเดียว ไม่ขาดของหน้างาน',
        },
        {
          q: 'MOQ และระยะเวลาผลิต',
          a: 'MOQ 50 ตร.ม. สำหรับออร์เดอร์ทดลอง และ 500 ตร.ม. สำหรับสีเคลือบพิเศษ ระยะเวลาส่งมอบขึ้นอยู่กับข้อกำหนด ดูแต่ละหน้าสินค้า นับจากวันที่ได้รับเงินมัดจำ',
        },
      ],
    },
  },

  'wire-mesh': {
    en: {
      metaTitle: 'Wire Mesh Manufacturer — Welded, Crimped, Hexagonal | Angu',
      metaDesc:
        'Wire mesh direct from the mill: welded mesh, crimped mesh, hexagonal netting, holland mesh and barbed wire. Wire 0.5–12 mm, galvanized or stainless. ISO 9001.',
      h1: 'Wire Mesh — Welded, Crimped, Hexagonal, Barbed',
      intro:
        'Twelve mesh families under one roof, from 0.5 mm decorative crimped mesh to 12 mm barbed wire. Because we draw and weave in the same plant, mesh opening, wire diameter and coating stay consistent across repeat orders — the usual failure point when buying through traders.',
      bullets: [
        'Welded mesh 50×50 to 100×100 mm, wire 2.5–6.0 mm',
        'Crimped and decorative mesh for facades and screens, 10–25 mm openings',
        'Hexagonal netting 25 mm for poultry, 50–75 mm for gabion and fencing',
        'Galvanized, stainless 304/316 and PVC coated options',
      ],
      faq: [
        {
          q: 'Can you supply cut-to-size panels?',
          a: 'Yes. We cut and edge-fold to your drawing, with ±3 mm tolerance on panel dimensions.',
        },
        {
          q: 'Which stainless grade for a coastal project?',
          a: '316L for salt spray exposure; 304 is sufficient for inland industrial use. We can quote both so you can compare.',
        },
        {
          q: 'What are the MOQ and lead time?',
          a: 'MOQ is 100 m² per specification. Different specifications can be consolidated into one container. Lead time depends on specification — see each product page; counted from the date the deposit is received.',
        },
      ],
    },
    zh: {
      metaTitle: '丝网生产厂家 — 焊接网 / 轧花网 / 六角网 / 刺绳 | 安固丝网',
      metaDesc:
        '工厂直供丝网：焊接网、轧花网、六角网、荷兰网与刺绳。丝径 0.5–12 mm，可镀锌或不锈钢。ISO 9001 认证。',
      h1: '焊接网、轧花网、六角网与刺绳',
      intro:
        '从 0.5 mm 装饰轧花网到 12 mm 刺绳，十二个网类在同一厂区完成。拉丝与织网在同一车间，网孔、丝径与镀层在返单之间保持一致——这恰恰是通过贸易商采购时最容易出问题的地方。',
      bullets: [
        '焊接网 50×50 至 100×100 mm，丝径 2.5–6.0 mm',
        '轧花网与装饰网用于幕墙、屏风，网孔 10–25 mm',
        '六角网 25 mm 用于家禽，50–75 mm 用于石笼与围栏',
        '可选镀锌、304/316 不锈钢与 PVC 覆塑',
      ],
      faq: [
        {
          q: '能按图纸裁切成型吗？',
          a: '可以。按图裁切并折边，板材尺寸公差 ±3 mm。',
        },
        {
          q: '沿海项目用哪种不锈钢？',
          a: '盐雾环境选 316L；内陆工业环境 304 足够。两种都可以同时报价供你比较。',
        },
        {
          q: '起订量与交期？',
          a: '每个规格 100 平方米起，不同规格可拼柜；交期按规格不同，见各产品页，自定金到账之日起算。',
        },
      ],
    },
    vi: {
      metaTitle: 'Nhà sản xuất lưới thép — hàn, lục giác, dây gai | Angu',
      metaDesc:
        'Lưới thép trực tiếp từ xưởng: lưới hàn, lưới dập, lưới lục giác, lưới holland và dây gai. Dây 0,5–12 mm, mạ kẽm hoặc inox. ISO 9001.',
      h1: 'Lưới thép — hàn, dập nổi, lục giác, dây gai',
      intro:
        'Mười hai dòng lưới trong cùng một nhà máy, từ lưới dập trang trí 0,5 mm đến dây gai 12 mm. Vì kéo dây và đan lưới cùng một xưởng, ô lưới, đường kính dây và lớp mạ giữ nguyên qua các đơn hàng lặp lại — điểm hay sai nhất khi mua qua trung gian.',
      bullets: [
        'Lưới hàn 50×50 đến 100×100 mm, dây 2,5–6,0 mm',
        'Lưới dập và lưới trang trí cho mặt dựng, vách ngăn, ô 10–25 mm',
        'Lưới lục giác 25 mm cho gia cầm, 50–75 mm cho gabion và hàng rào',
        'Tùy chọn mạ kẽm, inox 304/316 và phủ PVC',
      ],
      faq: [
        {
          q: 'Có cắt tấm theo bản vẽ không?',
          a: 'Có. Chúng tôi cắt và gấp mép theo bản vẽ, dung sai kích thước tấm ±3 mm.',
        },
        {
          q: 'Công trình ven biển dùng inox loại nào?',
          a: '316L cho môi trường muối biển; 304 đủ cho công nghiệp nội địa. Có thể báo giá cả hai để so sánh.',
        },
        {
          q: 'MOQ và thời gian sản xuất?',
          a: 'MOQ 100 m² mỗi quy cách; nhiều quy cách có thể ghép chung container. Thời gian sản xuất tùy quy cách, xem từng trang sản phẩm, tính từ ngày nhận tiền đặt cọc.',
        },
      ],
    },
    th: {
      metaTitle: 'ผู้ผลิตลวดตาข่าย — เชื่อม ถัก ลายหกเหลี่ยม ลวดหนาม | Angu',
      metaDesc:
        'ลวดตาข่ายจากโรงงานโดยตรง: ตาข่ายเชื่อม ตาข่ายถัก ตาข่ายหกเหลี่ยม ตาข่ายฮอลแลนด์ และลวดหนาม ลวด 0.5–12 มม. ชุบกัลวาไนซ์หรือสแตนเลส ISO 9001',
      h1: 'ลวดตาข่าย — เชื่อม ถัก หกเหลี่ยม ลวดหนาม',
      intro:
        'สิบสองตระกูลตาข่ายในโรงงานเดียว ตั้งแต่ตาข่ายถักตกแต่ง 0.5 มม. ถึงลวดหนาม 12 มม. เพราะเราดึงลวดและถักในโรงงานเดียวกัน ขนาดช่อง ขนาดลวด และชั้นเคลือบจึงคงที่ทุกออร์เดอร์ — จุดที่มักผิดพลาดเมื่อซื้อผ่านคนกลาง',
      bullets: [
        'ตาข่ายเชื่อม 50×50 ถึง 100×100 มม. ลวด 2.5–6.0 มม.',
        'ตาข่ายถักและตกแต่งสำหรับ façade และฉากกั้น ช่อง 10–25 มม.',
        'ตาข่ายหกเหลี่ยม 25 มม. สำหรับสัตว์ปีก 50–75 มม. สำหรับ gabion และรั้ว',
        'ตัวเลือกชุบกัลวาไนซ์ สแตนเลส 304/316 และเคลือบ PVC',
      ],
      faq: [
        {
          q: 'ตัดแผงตามแบบได้ไหม',
          a: 'ได้ เราตัดและพับขอบตามแบบ ดุลยภาพขนาดแผง ±3 มม.',
        },
        {
          q: 'โครงการชายฝั่งใช้สแตนเลสเกรดไหน',
          a: '316L สำหรับไอเค็ม 304 เพียงพอสำหรับอุตสาหกรรมภายในประเทศ เสนอราคาทั้งสองแบบให้เปรียบเทียบได้',
        },
        {
          q: 'MOQ และระยะเวลาผลิต',
          a: 'MOQ 100 ตร.ม. ต่อสเปก รวมหลายสเปกในตู้เดียวได้ ระยะเวลาส่งมอบขึ้นอยู่กับข้อกำหนด ดูแต่ละหน้าสินค้า นับจากวันที่ได้รับเงินมัดจำ',
        },
      ],
    },
  },

  // 一级枢纽品类：自然灾害防护网。自身不挂产品，只承载两个子品类，
  // 所以 H1/正文写的是「两类系统怎么配合」，不是单个 SKU 的卖点。
  'natural-disaster-protection': {
    en: {
      metaTitle: 'Natural Disaster Protection Net Systems — Slope & Gabion | Angu',
      metaDesc:
        'One supplier for two engineered lines: rockfall and slope protection nets up to 3000 kJ, and gabion boxes for bank and toe erosion. Factory-direct, ISO 9001.',
      h1: 'Natural Disaster Protection Net Systems',
      intro:
        'Landslides, rockfall, flash flooding and bank erosion are the same problem in different clothes — water and gravity moving ground that people have built next to. We supply the two systems that hold it back: flexible slope protection nets that pin the surface, and gabion structures that weigh the toe down while letting water pass. Both are drawn, woven and galvanized in the same plant, so anchorage, wire diameter and coating class stay consistent across the whole scheme instead of being reconciled between two suppliers on site.',
      bullets: [
        'Slope protection: active drapery nets and passive rockfall barriers, 500–3000 kJ',
        'Gabion: boxes, reno mattresses and reinforced walls for bank and toe protection',
        'Hot-dip galvanized 240–275 g/m² to EN 10244-2 class A, 15+ year service life',
        'Anchors, lacing rope and connection details sized to the same load case',
      ],
      faq: [
        {
          q: 'Which of the two systems does my site need?',
          a: 'If the slope face is still intact and only shedding surface material, an active net pins it. If blocks are already falling, you need a passive barrier. If the failure is at the toe — undercut by a river or wave action — gabion is the cheaper fix. Most mountain roads end up using all three in different sections.',
        },
        {
          q: 'Can both lines ship together?',
          a: 'Yes, and it is usually cheaper. Nets and gabion share the same container, the same galvanizing batch and one set of export documents.',
        },
        {
          q: 'Do you provide design support?',
          a: 'Send slope height, angle, expected block size and design flood level. We return an anchorage layout for the nets and a gabion wall section with a stability check.',
        },
      ],
    },
    zh: {
      metaTitle: '自然灾害防护网 — 边坡防护 + 石笼网 | 安固丝网',
      metaDesc:
        '一个供应商覆盖两类系统：边坡防护网与落石拦截（500–3000 kJ）、石笼网箱护坡护岸。热镀锌 240–275 g/m²，ISO 9001，工厂直供。',
      h1: '自然灾害防护网',
      intro:
        '滑坡、落石、山洪与河岸冲刷，本质上是同一个问题：水和重力在搬动人的地基。我们供应两类把地面按住的东西——柔性边坡防护网贴住坡面，石笼结构压住坡脚同时让水通过。两条线在同一间厂里拉丝、织网、镀锌，锚固、丝径与镀层等级按同一套标准配套，而不是到工地再在两家供应商之间找平。',
      bullets: [
        '边坡防护：主动防护网与被动落石拦截，500–3000 kJ',
        '石笼网：网箱、雷诺护垫与加筋挡墙，用于护坡护岸与坡脚防护',
        '热镀锌 240–275 g/m²，符合 EN 10244-2 A 级，防腐 15 年以上',
        '锚杆、缝合绳与连接件按同一受力工况配套',
      ],
      faq: [
        {
          q: '我的项目该用哪一类？',
          a: '坡面还完整、只是表层掉渣，用主动网贴住；已经有岩块下落，用被动拦截；如果坡脚被河水或浪掏空，石笼更省钱。山区公路多数是三段路用三种做法，不是二选一。',
        },
        {
          q: '两类能一起下单吗？',
          a: '能，而且通常更便宜。网和石笼同柜、同批镀锌、一套出口单证。',
        },
        {
          q: '能提供设计支持吗？',
          a: '把坡高、坡角、预估落石块径和设计洪水位发来，我们返回锚杆布置图和带稳定验算的石笼墙断面。',
        },
      ],
    },
    vi: {
      metaTitle: 'Hệ thống lưới phòng chống thiên tai — mái dốc & rọ đá | Angu',
      metaDesc:
        'Một nhà cung cấp cho hai dòng hệ thống: lưới bảo vệ mái dốc và chắn đá rơi tới 3000 kJ, rọ đá chống xói lở bờ và chân dốc. ISO 9001, giá xuất xưởng.',
      h1: 'Hệ thống lưới phòng chống thiên tai',
      intro:
        'Sạt lở, đá rơi, lũ quét và xói lở bờ sông là cùng một vấn đề: nước và trọng lực đang dịch chuyển nền đất mà con người đã xây cạnh đó. Chúng tôi cung cấp hai hệ giữ lại — lưới bảo vệ mái dốc mềm ghim bề mặt, và kết cấu rọ đá đè chân dốc trong khi vẫn để nước thoát. Cả hai được kéo dây, dệt và mạ kẽm trong cùng một nhà máy, nên neo, đường kính dây và cấp mạ khớp nhau trong toàn bộ phương án thay vì phải cân lại giữa hai nhà cung cấp tại công trường.',
      bullets: [
        'Bảo vệ mái dốc: lưới chủ động và hàng rào chắn đá bị động, 500–3000 kJ',
        'Rọ đá: hộp, nệm đá và tường chắn gia cường cho bờ sông và chân dốc',
        'Mạ kẽm nhúng nóng 240–275 g/m² theo EN 10244-2 cấp A, tuổi thọ 15+ năm',
        'Neo, dây khâu và chi tiết liên kết tính theo cùng một tổ hợp tải trọng',
      ],
      faq: [
        {
          q: 'Công trình của tôi cần hệ nào trong hai hệ?',
          a: 'Mái dốc còn nguyên, chỉ bong tróc bề mặt thì dùng lưới chủ động. Đá đã rơi thì cần hệ bị động. Nếu chân dốc bị nước xói rỗng thì rọ đá rẻ hơn. Đường núi phần lớn dùng cả ba ở các đoạn khác nhau.',
        },
        {
          q: 'Có đặt hai dòng cùng một đơn không?',
          a: 'Được, và thường rẻ hơn. Lưới và rọ đá chung container, chung lô mạ kẽm, một bộ chứng từ xuất khẩu.',
        },
        {
          q: 'Có hỗ trợ thiết kế không?',
          a: 'Có. Gửi chiều cao dốc, góc dốc, kích thước khối đá dự kiến và mực nước lũ thiết kế, chúng tôi trả về sơ đồ bố trí neo và mặt cắt tường rọ đá kèm kiểm tra ổn định.',
        },
      ],
    },
    th: {
      metaTitle: 'ระบบตาข่ายป้องกันภัยพิบัติ — ลาดชันและเกเบี้ยน | Angu',
      metaDesc:
        'ผู้ผลิตรายเดียวครอบสองระบบ: ตาข่ายป้องกันลาดชันและแผงกันหินตกถึง 3000 kJ กับเกเบี้ยนกันการกัดเซาะตลิ่ง ISO 9001 ราคาโรงงาน',
      h1: 'ระบบตาข่ายป้องกันภัยพิบัติ',
      intro:
        'ดินถล่ม หินตก น้ำป่าไหลหลาก และการกัดเซาะตลิ่ง ล้วนเป็นปัญหาเดียวกัน: น้ำและแรงโน้มถ่วงกำลังเคลื่อนพื้นดินที่คนไปสร้างอาคารชิดไว้ เราเสนอสองระบบที่ยึดไว้ — ตาข่ายป้องกันลาดชันแบบยืดหยุ่นที่ตรึงผิวลาด และโครงสร้างเกเบี้ยนที่ถ่วงเชิงลาดไว้แต่น้ำยังระบายผ่านได้ ทั้งสองดึงลวด ทอ และชุบกัลวาไนซ์ในโรงงานเดียวกัน สมอ ลวดเย็บ และชั้นเคลือบจึงเข้าชุดกันทั้งโครงการ ไม่ต้องไปเทียบกันหน้างานระหว่างผู้ขายสองราย',
      bullets: [
        'ป้องกันลาดชัน: ตาข่ายเชิงรุกและแผงกันหินตกเชิงรับ 500–3000 kJ',
        'เกเบี้ยน: กล่อง เรโนแมทเทรส และกำแพงกันดินเสริม สำหรับตลิ่งและเชิงลาด',
        'ชุบกัลวาไนซ์ร้อน 240–275 กรัม/ตร.ม. ตาม EN 10244-2 คลาส A อายุ 15+ ปี',
        'สมอ ลวดเย็บ และจุดเชื่อมต่อ คำนวณตามแรงชุดเดียวกัน',
      ],
      faq: [
        {
          q: 'โครงการของผมควรใช้ระบบไหน',
          a: 'ถ้าผิวลาดยังอยู่ครบ แค่ลอกหลุด ใช้ตาข่ายเชิงรุก ถ้ามีก้อนหินตกลงมาแล้ว ต้องใช้ระบบเชิงรับ ถ้าเชิงลาดถูกน้ำกัดเป็นโพรง เกเบี้ยนประหยัดกว่า ทางภูเขาส่วนใหญ่ใช้ทั้งสามแบบในคนละช่วง',
        },
        {
          q: 'สั่งสองสายรวมกันได้ไหม',
          a: 'ได้ และมักถูกกว่า ตาข่ายกับเกเบี้ยนลงตู้เดียวกัน ชุบชุดเดียวกัน เอกสารส่งออกชุดเดียว',
        },
        {
          q: 'ให้การสนับสนุนด้านออกแบบไหม',
          a: 'ให้ แจ้งความสูงลาด มุมลาด ขนาดก้อนหินที่คาด และระดับน้ำหลากออกแบบ เราจะส่งผังสมอและหน้าตัดกำแพงเกเบี้ยนพร้อมการตรวจสอบเสถียรภาพกลับไป',
        },
      ],
    },
  },

  // 边坡防护：原 protection-net 品类，2026-11-13 拆分后归入自然灾害防护网。
  // 文案与 H1 保持「落石 + 边坡防护网」的原主词，/protection-net 301 过来时语义连续。
  'slope-protection': {
    en: {
      metaTitle: 'Rockfall & Slope Protection Net Manufacturer | Angu',
      metaDesc:
        'Slope protection, rockfall and blast-mitigation nets. Galvanized steel wire rope, energy class 500–3000 kJ, ISO 9001; CE (ETAG 027) for rockfall nets.',
      h1: 'Rockfall and Slope Protection Nets',
      intro:
        'A protection net is safety equipment, not fencing — the anchorage and energy absorption decide whether the system works. We supply ring nets, steel wire rope nets and drapery mesh together with anchors and lacing sized to the same load case, so the net is never the weak link.',
      bullets: [
        'Active slope net DNS50 / GL100 with anchor plates and cable lacing',
        'Passive rockfall barriers in energy classes 500–3000 kJ',
        'Steel wire rope net, 2–3 mm rope, 60–100 mm aperture',
        'Hot-dip galvanized to EN 10244-2 class A',
      ],
      faq: [
        {
          q: 'Do I need an active or a passive system?',
          a: 'An active (drapery) net holds the slope surface and stops further loosening; a passive barrier intercepts blocks that already fall. Most road cuts need both, in different sections.',
        },
        {
          q: 'Do you provide load calculations?',
          a: 'Yes. Give us slope height, angle and expected block size, and we return an anchorage layout with the shop drawings.',
        },
        {
          q: 'What are the MOQ and lead time?',
          a: 'Projects from 200 m²; small repairs can ship as partial container loads. Production 20–30 working days for anchored systems.',
        },
      ],
    },
    zh: {
      metaTitle: '边坡防护网 / 落石防护网生产厂家 | 安固丝网',
      metaDesc:
        '边坡防护网、落石拦截网与防爆网。热镀锌钢丝绳网，防护能级 500–3000 kJ，ISO 9001 认证，落石网另持 CE 认证（ETAG 027）。',
      h1: '落石与边坡防护网',
      intro:
        '防护网是安全设施，不是围栏——锚固与吸能设计决定系统是否真的管用。我们供应环形网、钢丝绳网与主动防护网，锚杆与缝合绳按同一受力工况配套，避免网体成为整条链路里最弱的一环。',
      bullets: [
        '主动防护网 DNS50 / GL100，配套锚垫板与缝合绳',
        '被动防护网（落石拦截）500–3000 kJ 能级',
        '钢丝绳网，绳径 2–3 mm，网孔 60–100 mm',
        '热镀锌符合 EN 10244-2 A 级',
      ],
      faq: [
        {
          q: '该选主动还是被动防护？',
          a: '主动网贴坡面，抑制表层松动；被动网拦截已经下落的岩块。多数公路边坡是分段搭配使用，不是二选一。',
        },
        {
          q: '能提供受力计算吗？',
          a: '能。提供坡高、坡角与预估落石块径，我们随施工图返回锚杆布置方案。',
        },
        {
          q: '起订量与交期？',
          a: '项目从 200 平方米起，小面积修补可拼柜；带锚固系统生产 20–30 个工作日。',
        },
      ],
    },
    vi: {
      metaTitle: 'Nhà sản xuất lưới chống đá rơi và bảo vệ mái dốc | Angu',
      metaDesc:
        'Bảo vệ mái dốc, lưới chắn đá rơi và lưới chống nổ. Cáp thép mạ kẽm nhúng nóng, cấp năng lượng 500–3000 kJ, ISO 9001, CE (ETAG 027) cho lưới chắn đá rơi.',
      h1: 'Lưới chống đá rơi và bảo vệ mái dốc',
      intro:
        'Lưới bảo vệ là thiết bị an toàn, không phải hàng rào — neo và khả năng hấp thụ năng lượng quyết định hệ có hiệu quả hay không. Chúng tôi cung cấp lưới vòng, lưới cáp thép và lưới phủ mái dốc kèm neo, dây khâu theo cùng một tổ hợp tải trọng.',
      bullets: [
        'Lưới chủ động DNS50 / GL100 kèm bản neo và dây khâu',
        'Hàng rào chắn đá bị động cấp năng lượng 500–3000 kJ',
        'Lưới cáp thép, cáp 2–3 mm, mắt lưới 60–100 mm',
        'Mạ kẽm nhúng nóng theo EN 10244-2 cấp A',
      ],
      faq: [
        {
          q: 'Nên dùng hệ chủ động hay bị động?',
          a: 'Lưới chủ động phủ lên mặt dốc, hạn chế đá bong tróc; hệ bị động chặn khối đá đã rơi. Phần lớn ta-luy đường dùng cả hai ở các đoạn khác nhau.',
        },
        {
          q: 'Có tính toán chịu lực không?',
          a: 'Có. Cung cấp chiều cao dốc, góc dốc và kích thước khối đá dự kiến, chúng tôi trả về sơ đồ bố trí neo kèm bản vẽ thi công.',
        },
        {
          q: 'MOQ và thời gian sản xuất?',
          a: 'Dự án từ 200 m²; sửa chữa nhỏ có thể ghép container. Hệ có neo sản xuất 20–30 ngày làm việc.',
        },
      ],
    },
    th: {
      metaTitle: 'ผู้ผลิตตาข่ายกันหินตกและป้องกันลาดชัน | Angu',
      metaDesc:
        'ตาข่ายป้องกันลาดชัน แผงกันหินตก และตาข่ายกันระเบิด ตาข่ายสลิงเหล็กชุบกัลวาไนซ์ร้อน ระดับพลังงาน 500–3000 kJ ISO 9001 และ CE (ETAG 027) สำหรับแผงกันหินตก',
      h1: 'ตาข่ายกันหินตกและป้องกันลาดชัน',
      intro:
        'ตาข่ายป้องกันเป็นอุปกรณ์ความปลอดภัย ไม่ใช่รั้ว — สมอยึดและความสามารถดูดซับพลังงานเป็นตัวตัดสินว่าระบบได้ผลหรือไม่ เราจัดส่งตาข่ายวงแหวน ตาข่ายสลิงเหล็ก และตาข่ายคลุมลาดชัน พร้อมสมอและลวดเย็บที่คำนวณร่วมกัน',
      bullets: [
        'ตาข่ายเชิงรุก DNS50 / GL100 พร้อมแผ่นสมอและลวดเย็บ',
        'แผงกันหินตกเชิงรับ ระดับพลังงาน 500–3000 kJ',
        'ตาข่ายสลิงเหล็ก สลิง 2–3 มม. ช่อง 60–100 มม.',
        'ชุบกัลวาไนซ์ร้อนตาม EN 10244-2 คลาส A',
      ],
      faq: [
        {
          q: 'ควรใช้ระบบเชิงรุกหรือเชิงรับ',
          a: 'ตาข่ายเชิงรุกคลุมผิวลาดชันลดการหลุดร่อน ระบบเชิงรับดักก้อนหินที่ตกลงมาแล้ว งานตัดถนนส่วนใหญ่ใช้ทั้งสองแบบในคนละช่วง',
        },
        {
          q: 'มีการคำนวณแรงให้ไหม',
          a: 'มี แจ้งความสูงลาดชัน มุมลาด และขนาดก้อนหินที่คาดไว้ เราจะส่งผังสมอพร้อมแบบก่อสร้างกลับไป',
        },
        {
          q: 'MOQ และระยะเวลาผลิต',
          a: 'โครงการตั้งแต่ 200 ตร.ม. งานซ่อมเล็กสามารถรวมตู้ได้ ระบบพร้อมสมอผลิต 20–30 วันทำการ',
        },
      ],
    },
  },
};
