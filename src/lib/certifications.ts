/**
 * ISO 三体系认证证书 —— 唯一事实来源
 *
 * 数据来自证书原件（2026-07 出具的换证版本，含中英文各一页）：
 *   /public/downloads/angu-iso-three-system-certificates.pdf
 *
 * 规则：
 * 1. 证书编号、范围、有效期一律按原件照抄，不得改写或"美化"。
 * 2. 页面、结构化数据、llms.txt 必须引用本文件，禁止各处手写编号。
 * 3. 证书到期前（2027-07-15）需换证；换证后只改这里。
 */

export type CertLocale = 'en' | 'zh' | 'vi' | 'th';

export interface Certificate {
  /** 锚点 / key */
  id: 'iso9001' | 'iso14001' | 'iso45001';
  /** 简称，用于徽标 */
  short: string;
  /** 完整标准编号，用于徽标与结构化数据 */
  label: string;
  /** 标准号（原件写法，含国标） */
  standard: string;
  /** 体系类别 */
  system: Record<CertLocale, string>;
  /** 证书名称 */
  name: Record<CertLocale, string>;
  /** 注册号 */
  number: string;
  /** 认证范围（原件写法） */
  scope: Record<CertLocale, string>;
  /** 初次发证 */
  initialIssue: string;
  /** 本次发证 */
  issued: string;
  /** 换证日期 */
  changeDate: string;
  /** 证书有效期截止 */
  validUntil: string;
  /** 预览图 */
  image: string;
}

/** 认证机构（中英文原件一致） */
export const CERT_ISSUER = {
  zh: '北京恒标质量认证有限公司',
  en: 'Beijing Hengbiao Quality Certification Co., Ltd.',
  url: 'http://www.hbqc.com.cn',
  /** 认可标识 */
  accreditation: 'CNAS / IAF',
} as const;

/** 证书查询入口（国家认监委） */
export const CERT_VERIFY_URL = 'https://www.cnca.gov.cn';

/** 中英文对照完整版 PDF（6 页：3 张中文 + 3 张英文） */
export const CERT_PDF = '/downloads/angu-iso-three-system-certificates.pdf';

const COMMON = {
  initialIssue: '2021-07-16',
  issued: '2024-08-07',
  changeDate: '2026-07-17',
  validUntil: '2027-07-15',
} as const;

export const CERTIFICATIONS: Certificate[] = [
  {
    id: 'iso9001',
    short: 'ISO 9001',
    label: 'ISO 9001:2015',
    standard: 'GB/T 19001-2016 / ISO 9001:2015',
    system: {
      en: 'Quality Management',
      zh: '质量管理体系',
      vi: 'Quản lý chất lượng',
      th: 'การจัดการคุณภาพ',
    },
    name: {
      en: 'Quality Management System Certificate',
      zh: '质量管理体系认证证书',
      vi: 'Chứng nhận Hệ thống Quản lý Chất lượng',
      th: 'ใบรับรองระบบการจัดการคุณภาพ',
    },
    number: '06724Q20693R1S',
    scope: {
      en: 'Production of sound barriers and sales of screen mesh products',
      zh: '声屏障的生产、丝网制品的销售',
      vi: 'Sản xuất tấm chắn âm thanh và kinh doanh sản phẩm lưới thép',
      th: 'การผลิตแผงกั้นเสียงและการจำหน่ายผลิตภัณฑ์ตาข่ายเหล็ก',
    },
    image: '/images/certificates/iso9001.jpg',
    ...COMMON,
  },
  {
    id: 'iso14001',
    short: 'ISO 14001',
    label: 'ISO 14001:2015',
    standard: 'GB/T 24001-2016 / ISO 14001:2015',
    system: {
      en: 'Environmental Management',
      zh: '环境管理体系',
      vi: 'Quản lý môi trường',
      th: 'การจัดการสิ่งแวดล้อม',
    },
    name: {
      en: 'Environmental Management System Certificate',
      zh: '环境管理体系认证证书',
      vi: 'Chứng nhận Hệ thống Quản lý Môi trường',
      th: 'ใบรับรองระบบการจัดการสิ่งแวดล้อม',
    },
    number: '06724E20351R1S',
    scope: {
      en: 'Production of sound barriers, sales of screen mesh products, and related environmental management activities',
      zh: '声屏障的生产、丝网制品的销售及其相关的环境管理活动',
      vi: 'Sản xuất tấm chắn âm thanh, kinh doanh sản phẩm lưới thép và các hoạt động quản lý môi trường liên quan',
      th: 'การผลิตแผงกั้นเสียง การจำหน่ายผลิตภัณฑ์ตาข่ายเหล็ก และกิจกรรมการจัดการสิ่งแวดล้อมที่เกี่ยวข้อง',
    },
    image: '/images/certificates/iso14001.jpg',
    ...COMMON,
  },
  {
    id: 'iso45001',
    short: 'ISO 45001',
    label: 'ISO 45001:2018',
    standard: 'GB/T 45001-2020 / ISO 45001:2018',
    system: {
      en: 'Occupational Health & Safety',
      zh: '职业健康安全管理体系',
      vi: 'An toàn & Sức khỏe nghề nghiệp',
      th: 'อาชีวอนามัยและความปลอดภัย',
    },
    name: {
      en: 'Occupational Health and Safety Management System Certificate',
      zh: '职业健康安全管理体系认证证书',
      vi: 'Chứng nhận Hệ thống Quản lý An toàn và Sức khỏe Nghề nghiệp',
      th: 'ใบรับรองระบบการจัดการอาชีวอนามัยและความปลอดภัย',
    },
    number: '06724S30308R1S',
    scope: {
      en: 'Production of sound barriers, sales of screen mesh products, and related occupational health and safety management activities',
      zh: '声屏障的生产、丝网制品的销售及其相关的职业健康安全管理活动',
      vi: 'Sản xuất tấm chắn âm thanh, kinh doanh sản phẩm lưới thép và các hoạt động quản lý an toàn, sức khỏe nghề nghiệp liên quan',
      th: 'การผลิตแผงกั้นเสียง การจำหน่ายผลิตภัณฑ์ตาข่ายเหล็ก และกิจกรรมการจัดการอาชีวอนามัยและความปลอดภัยที่เกี่ยวข้อง',
    },
    image: '/images/certificates/iso45001.jpg',
    ...COMMON,
  },
];

/** 三体系一行式摘要，用于描述、llms.txt、FAQ 等 */
export const CERT_SUMMARY_EN = `ISO 9001:2015 (${CERTIFICATIONS[0].number}), ISO 14001:2015 (${CERTIFICATIONS[1].number}) and ISO 45001:2018 (${CERTIFICATIONS[2].number}) certified by ${CERT_ISSUER.en}, valid until 15 July 2027`;

export const CERT_SUMMARY_ZH = `已通过 ISO 9001:2015（${CERTIFICATIONS[0].number}）、ISO 14001:2015（${CERTIFICATIONS[1].number}）、ISO 45001:2018（${CERTIFICATIONS[2].number}）三体系认证，由${CERT_ISSUER.zh}颁发，有效期至 2027 年 7 月 15 日`;

/** schema.org Certification 节点（供 Organization.hasCertification 使用） */
export function certificationLd() {
  return CERTIFICATIONS.map((c) => ({
    '@type': 'Certification' as const,
    name: c.label,
    certificationIdentification: c.number,
    description: `${c.system.en} system certification, scope: ${c.scope.en}`,
    about: c.standard,
    dateCreated: c.issued,
    expires: c.validUntil,
    recognizedBy: {
      '@type': 'Organization' as const,
      name: CERT_ISSUER.en,
      url: CERT_ISSUER.url,
    },
  }));
}
