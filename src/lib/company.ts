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
  'Lead time counts from the date the deposit is received. Custom specifications are quoted individually.';
export const LEAD_TIME_NOTE_ZH =
  '交期自定金到账之日起算，定制规格单独报价。';

export const MOQ_NOTE_EN =
  'MOQ is stated per specification in the table above.';
export const MOQ_NOTE_ZH =
  '起订量见上方规格表，按规格分档。';

/** 试单口径只适用于声屏障板（9 款 MOQ 为 50 / 80 / 100 / 200 m²，最低 50）。
 *  以前写成「试单 50 m² 起」全站通用，导致石笼网箱（按只计）、护栏网（1000 m² 起）
 *  页面也显示 50 m²，与规格表自相矛盾。 */
export const MOQ_TRIAL_NOTE_EN =
  'Trial orders of 50 m² are accepted for noise barrier panels.';
export const MOQ_TRIAL_NOTE_ZH =
  '声屏障板可接受 50 平方米试单。';

/** 质保：业务确认真实提供 5 年镀锌层质保，但截至 2026-11-04 仍无书面条款。
 *  按 T/CGCC 119—2026 §5.2.3「对外承诺须有依据」，条款成文前统一追加限定语，
 *  成文后改为链向 /warranty 政策页，不要在没有条款的情况下裸承诺。 */
export const WARRANTY_YEARS = 5;
export const WARRANTY_QUALIFIER_EN =
  'subject to the written warranty terms in the sales contract';
export const WARRANTY_QUALIFIER_ZH =
  '具体条款以销售合同书面约定为准';

/** 声屏障 9 款均有第三方检测报告（声学 / 力学），编号不对外公开，
 *  由销售经理按询盘提供。禁止写成「证书编号可在线核验」这类可验证承诺。 */
export const TEST_REPORT_NOTE_EN =
  'Test reports available on request from our sales manager.';
export const TEST_REPORT_NOTE_ZH =
  '检测报告可向销售经理索取。';
