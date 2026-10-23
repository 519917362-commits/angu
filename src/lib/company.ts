/**
 * 企业事实单一来源（Single Source of Truth）
 *
 * 全部字段来自工商登记（国家企业信用信息公示系统 / 企查查 / 爱企查 / 水滴信用一致）：
 *   企业名称：安平县安固金属丝网制品有限公司
 *   英文名：Anping County Angu Metal Wire Mesh Products Co., Ltd.
 *   统一社会信用代码：91131125308273603F
 *   成立日期：2014-08-15
 *   注册地址：河北省衡水市安平县南王庄镇后赵疃村西北 1000 米处（邮编 053600）
 *
 * 规则：
 * 1. 官网、结构化数据、llms.txt、B2B 平台必须引用同一组值，不得各写一套。
 * 2. 公司年限一律由 foundedYear 计算，禁止再手写 "15 years" 之类固定数字。
 * 3. 产品寿命（镀锌 15+ 年、设计寿命 20-30 年）是产品属性，不是公司年限，勿混用。
 */

export const COMPANY = {
  legalNameEn: 'Anping County Angu Metal Wire Mesh Products Co., Ltd.',
  legalNameZh: '安平县安固金属丝网制品有限公司',
  brandEn: 'Angu Wire Mesh',
  brandZh: '安固丝网',
  creditCode: '91131125308273603F',
  foundedISO: '2014-08-15',
  foundedYear: 2014,
  /** 工商注册地址（英文） */
  streetAddress: '1,000 m Northwest of Houzhaotuan Village, Nanwangzhuang Town',
  streetAddressZh: '河北省衡水市安平县南王庄镇后赵疃村西北1000米处',
  addressLocality: 'Anping County',
  addressRegion: 'Hebei',
  postalCode: '053600',
  addressCountry: 'CN',
  siteUrl: 'https://www.angumesh.com',
  /** 对外统一收件邮箱（客户确认的唯一在用企业邮箱，网易企业邮） */
  email: 'annie@angumesh.com',
  /** 自有中文站披露为“近万平标准化生产车间”，取 10,000 m² 保守口径 */
  factoryAreaM2: 10000,
  /** 官网与 2023 年历程节点一致：年产能 5,000 吨 */
  annualCapacityTons: 5000,
  exportCountries: '30+',
} as const;

/** 已成立年数（按周年计算，避免跨年后仍显示旧数字） */
export const YEARS_IN_BUSINESS = (() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const anniversaryPassed =
    month > 8 || (month === 8 && day >= 15);
  return year - COMPANY.foundedYear - (anniversaryPassed ? 0 : 1);
})();

/** 用于统计数字展示，例如 "12+" */
export const YEARS_LABEL = `${YEARS_IN_BUSINESS}+`;

/** 免责声明：报价有效期口径，价格页与结构化数据共用 */
export const QUOTE_VALID_DAYS = 30;

export const QUOTE_NOTE_EN = `FOB Tianjin. Indicative price for reference only; final quotation valid ${QUOTE_VALID_DAYS} days from issue.`;
export const QUOTE_NOTE_ZH = `天津港 FOB 参考价，最终报价自出具之日起 ${QUOTE_VALID_DAYS} 天内有效。`;

export const LEAD_TIME_NOTE_EN =
  'Standard specifications: 15–25 working days; custom/OEM: 20–30 working days, counted from order confirmation and deposit receipt.';
export const LEAD_TIME_NOTE_ZH =
  '标准规格 15–25 个工作日；定制/OEM 20–30 个工作日，自订单确认并收到定金之日起计算。';

export const MOQ_NOTE_EN =
  'Trial orders from 50 m²; standard MOQ per specification is shown in the table below.';
export const MOQ_NOTE_ZH =
  '试单 50 m² 起；常规起订量见下方规格表。';
