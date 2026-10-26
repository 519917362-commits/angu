import { submitInquiry } from './api';
import { trackLead } from './analytics';

/**
 * 全站询盘提交的唯一入口。
 *
 * 之前产品弹窗 / 落地页报价单 / 联系页 / 退出挽留各自实现一套
 * （各自的 fetch、蜜罐校验、来源标记、转化埋点），改动要同步 4 处、
 * 极易漏掉某个入口。现在表单只负责 UI 与字段收集，提交相关的
 * 公共逻辑全部集中在这里。
 */

export type InquiryLeadSource =
  | 'product_modal'
  | 'product_page'
  | 'contact_page'
  | 'exit_popup'
  | 'google_ads_noise_barrier';

interface SubmitOptions {
  /** 入口来源：进入后台线索数据 + Google Ads 转化分析 */
  source: InquiryLeadSource;
  /** 默认意向产品/品类，表单未显式提供时使用 */
  productInterest?: string;
  locale?: string;
}

/**
 * @param form 表单字段集合；其中的 `website` 字段为蜜罐，永不提交
 */
export async function submitInquiryLead(
  form: Record<string, unknown>,
  { source, productInterest, locale }: SubmitOptions
): Promise<{ success: boolean }> {
  const { website, ...data } = form;

  // 蜜罐命中：伪装成功，不触网、不上报转化
  if (website) return { success: true };

  const result = await submitInquiry({
    ...data,
    source,
    product_interest: data.product_interest || productInterest,
    locale,
  });

  if (result.success) {
    trackLead({ source, productInterest, method: 'form' });
  }

  return result;
}
